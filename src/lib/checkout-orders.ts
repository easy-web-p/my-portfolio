import 'server-only';

import { createHash, randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';
import { FieldValue, Timestamp, type DocumentData } from 'firebase-admin/firestore';
import type Stripe from 'stripe';
import type { LicenseType } from '@/types/store';
import { getAdminFirestore } from './firebase-admin';

const CHECKOUT_ORDERS_COLLECTION = 'checkoutOrders';
const DOWNLOADS_SUBCOLLECTION = 'downloads';
const WEBHOOK_EVENTS_COLLECTION = 'stripeWebhookEvents';
const DOWNLOAD_LIMIT = 5;
const DOWNLOAD_LIFETIME_MS = 7 * 24 * 60 * 60 * 1000;

export type CheckoutLineItem = {
  productId: string;
  productTitle: string;
  productSlug: string;
  fileKey: string;
  fileSize: string;
  version: string;
  license: LicenseType;
  quantity: number;
  unitAmount: number;
};

type CheckoutStatus = 'PENDING' | 'PAID' | 'FAILED';

export type CheckoutOrder = {
  reference: string;
  stripePaymentIntentId: string;
  status: CheckoutStatus;
  amount: number;
  currency: string;
  lineItems: CheckoutLineItem[];
};

export type CheckoutDownload = {
  token: string;
  productId: string;
  productTitle: string;
  productSlug: string;
  version: string;
  fileSize: string;
  fileKey: string;
  license: LicenseType;
  downloadCount: number;
  downloadLimit: number;
  expiresAt: Date;
};

type CheckoutAccess = {
  reference: string;
  accessToken: string;
};

type CreateCheckoutOrderInput = CheckoutAccess & {
  stripePaymentIntentId: string;
  customerEmail: string;
  customerName: string;
  amount: number;
  currency: string;
  lineItems: CheckoutLineItem[];
};

function hashAccessToken(accessToken: string) {
  return createHash('sha256').update(accessToken).digest('hex');
}

function sameAccessToken(candidate: string | undefined, expectedHash: unknown) {
  if (!candidate || typeof expectedHash !== 'string') {
    return false;
  }

  const candidateHash = Buffer.from(hashAccessToken(candidate), 'utf8');
  const storedHash = Buffer.from(expectedHash, 'utf8');

  return candidateHash.length === storedHash.length && timingSafeEqual(candidateHash, storedHash);
}

function asCheckoutOrder(data: DocumentData): CheckoutOrder {
  return {
    reference: String(data.reference),
    stripePaymentIntentId: String(data.stripePaymentIntentId),
    status: data.status === 'PAID' || data.status === 'FAILED' ? data.status : 'PENDING',
    amount: Number(data.amount),
    currency: String(data.currency),
    lineItems: Array.isArray(data.lineItems) ? data.lineItems as CheckoutLineItem[] : [],
  };
}

function asCheckoutDownload(data: DocumentData): CheckoutDownload {
  const expiresAt = data.expiresAt instanceof Timestamp ? data.expiresAt.toDate() : new Date(0);

  return {
    token: String(data.token),
    productId: String(data.productId),
    productTitle: String(data.productTitle),
    productSlug: String(data.productSlug),
    version: String(data.version),
    fileSize: String(data.fileSize),
    fileKey: String(data.fileKey),
    license: data.license as LicenseType,
    downloadCount: Number(data.downloadCount),
    downloadLimit: Number(data.downloadLimit),
    expiresAt,
  };
}

export function createCheckoutAccess(): CheckoutAccess {
  return {
    reference: randomUUID(),
    accessToken: randomBytes(32).toString('base64url'),
  };
}

export function checkoutAccessCookieName(reference: string) {
  return `phisit_checkout_${reference}`;
}

export async function createCheckoutOrder(input: CreateCheckoutOrderInput) {
  const db = getAdminFirestore();

  await db.collection(CHECKOUT_ORDERS_COLLECTION).doc(input.reference).create({
    reference: input.reference,
    accessTokenHash: hashAccessToken(input.accessToken),
    stripePaymentIntentId: input.stripePaymentIntentId,
    customerEmail: input.customerEmail,
    customerName: input.customerName,
    amount: input.amount,
    currency: input.currency,
    status: 'PENDING',
    lineItems: input.lineItems,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
}

export async function getAuthorizedCheckoutOrder(reference: string, accessToken: string | undefined) {
  const snapshot = await getAdminFirestore()
    .collection(CHECKOUT_ORDERS_COLLECTION)
    .doc(reference)
    .get();

  if (!snapshot.exists) {
    return null;
  }

  const data = snapshot.data();
  if (!data || !sameAccessToken(accessToken, data.accessTokenHash)) {
    return null;
  }

  return asCheckoutOrder(data);
}

export async function getAuthorizedOrderByPaymentIntent(
  paymentIntentId: string,
  accessTokenForReference: (reference: string) => string | undefined,
) {
  const snapshot = await getAdminFirestore()
    .collection(CHECKOUT_ORDERS_COLLECTION)
    .where('stripePaymentIntentId', '==', paymentIntentId)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return null;
  }

  const document = snapshot.docs[0];
  const data = document.data();
  const reference = String(data.reference);

  if (!sameAccessToken(accessTokenForReference(reference), data.accessTokenHash)) {
    return null;
  }

  return asCheckoutOrder(data);
}

export async function getCheckoutDownloads(reference: string) {
  const snapshot = await getAdminFirestore()
    .collection(CHECKOUT_ORDERS_COLLECTION)
    .doc(reference)
    .collection(DOWNLOADS_SUBCOLLECTION)
    .get();

  return snapshot.docs.map((document) => asCheckoutDownload(document.data()));
}

export async function getCheckoutDownload(reference: string, token: string) {
  const snapshot = await getAdminFirestore()
    .collection(CHECKOUT_ORDERS_COLLECTION)
    .doc(reference)
    .collection(DOWNLOADS_SUBCOLLECTION)
    .doc(token)
    .get();

  return snapshot.exists ? asCheckoutDownload(snapshot.data()!) : null;
}

export async function consumeDownloadEntitlement(reference: string, token: string) {
  const db = getAdminFirestore();
  const orderReference = db.collection(CHECKOUT_ORDERS_COLLECTION).doc(reference);
  const downloadReference = orderReference.collection(DOWNLOADS_SUBCOLLECTION).doc(token);

  return db.runTransaction(async (transaction) => {
    const [orderSnapshot, downloadSnapshot] = await Promise.all([
      transaction.get(orderReference),
      transaction.get(downloadReference),
    ]);

    if (!orderSnapshot.exists || orderSnapshot.data()?.status !== 'PAID') {
      return { valid: false as const, reason: 'Payment has not been verified yet.' };
    }

    if (!downloadSnapshot.exists) {
      return { valid: false as const, reason: 'Invalid download link.' };
    }

    const download = asCheckoutDownload(downloadSnapshot.data()!);

    if (download.expiresAt.getTime() <= Date.now()) {
      return { valid: false as const, reason: 'This download link has expired.' };
    }

    if (download.downloadCount >= download.downloadLimit) {
      return { valid: false as const, reason: 'Download limit reached.' };
    }

    transaction.update(downloadReference, {
      downloadCount: download.downloadCount + 1,
      lastDownloadedAt: FieldValue.serverTimestamp(),
    });

    return { valid: true as const, download };
  });
}

export async function recordStripePaymentEvent(
  eventId: string,
  eventType: string,
  paymentIntent: Stripe.PaymentIntent,
) {
  const db = getAdminFirestore();
  const checkoutReference = paymentIntent.metadata.checkout_reference;

  return db.runTransaction(async (transaction) => {
    const eventReference = db.collection(WEBHOOK_EVENTS_COLLECTION).doc(eventId);
    const existingEvent = await transaction.get(eventReference);

    if (existingEvent.exists) {
      return { duplicate: true, status: 'duplicate' as const };
    }

    const eventData: Record<string, unknown> = {
      eventType,
      paymentIntentId: paymentIntent.id,
      checkoutReference: checkoutReference ?? null,
      createdAt: FieldValue.serverTimestamp(),
    };

    if (!checkoutReference) {
      transaction.create(eventReference, { ...eventData, status: 'ignored' });
      return { duplicate: false, status: 'ignored' as const };
    }

    const orderReference = db.collection(CHECKOUT_ORDERS_COLLECTION).doc(checkoutReference);
    const orderSnapshot = await transaction.get(orderReference);

    if (!orderSnapshot.exists || orderSnapshot.data()?.stripePaymentIntentId !== paymentIntent.id) {
      transaction.create(eventReference, { ...eventData, status: 'unmatched' });
      return { duplicate: false, status: 'unmatched' as const };
    }

    const order = asCheckoutOrder(orderSnapshot.data()!);

    if (
      paymentIntent.amount !== order.amount
      || paymentIntent.currency.toLowerCase() !== order.currency.toLowerCase()
      || (eventType === 'payment_intent.succeeded'
        && (paymentIntent.status !== 'succeeded' || paymentIntent.amount_received !== order.amount))
    ) {
      transaction.create(eventReference, { ...eventData, status: 'amount_or_status_mismatch' });
      return { duplicate: false, status: 'amount_or_status_mismatch' as const };
    }

    if (eventType === 'payment_intent.succeeded') {
      if (order.status !== 'PAID') {
        for (const item of order.lineItems) {
          const token = randomBytes(32).toString('base64url');
          const downloadReference = orderReference.collection(DOWNLOADS_SUBCOLLECTION).doc(token);

          transaction.create(downloadReference, {
            token,
            productId: item.productId,
            productTitle: item.productTitle,
            productSlug: item.productSlug,
            fileKey: item.fileKey,
            fileSize: item.fileSize,
            version: item.version,
            license: item.license,
            downloadCount: 0,
            downloadLimit: DOWNLOAD_LIMIT,
            expiresAt: Timestamp.fromMillis(Date.now() + DOWNLOAD_LIFETIME_MS),
            createdAt: FieldValue.serverTimestamp(),
          });
        }

        transaction.update(orderReference, {
          status: 'PAID',
          fulfilledAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        });
      }

      transaction.create(eventReference, { ...eventData, status: 'fulfilled' });
      return { duplicate: false, status: 'fulfilled' as const };
    }

    if (eventType === 'payment_intent.payment_failed' && order.status !== 'PAID') {
      transaction.update(orderReference, {
        status: 'FAILED',
        updatedAt: FieldValue.serverTimestamp(),
      });
    }

    transaction.create(eventReference, { ...eventData, status: 'recorded' });
    return { duplicate: false, status: 'recorded' as const };
  });
}
