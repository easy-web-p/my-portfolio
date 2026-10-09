import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getStripeClient } from '@/lib/stripe';
import { calculateProductPrice, STORE_PRODUCTS } from '@/lib/store';
import { getPrivateProductBucket, productObjectPath } from '@/lib/firebase-admin';
import {
  checkoutAccessCookieName,
  createCheckoutAccess,
  createCheckoutOrder,
} from '@/lib/checkout-orders';

const checkoutRequestSchema = z.object({
  customerName: z.string().trim().min(1).max(120),
  customerEmail: z.string().trim().email().max(254),
  company: z.string().trim().max(120).optional().default(''),
  items: z.array(z.object({
    productId: z.string().trim().min(1),
    license: z.enum(['Personal', 'Commercial', 'Extended', 'Open Source']),
    quantity: z.number().int().min(1).max(10),
  })).min(1).max(20),
});

export async function POST(request: Request) {
  try {
    const payload = checkoutRequestSchema.safeParse(await request.json());

    if (!payload.success) {
      return NextResponse.json(
        { message: 'Invalid checkout details.' },
        { status: 400 },
      );
    }

    const lineItems = payload.data.items.map((item) => {
      const product = STORE_PRODUCTS.find((candidate) => candidate.id === item.productId);

      if (!product) {
        throw new Error('One or more products are unavailable.');
      }

      return {
        product,
        license: item.license,
        quantity: item.quantity,
        unitAmount: calculateProductPrice(product.price, item.license),
      };
    });

    // Store prices are Thai baht; Stripe accepts the amount in satang.
    const amount = lineItems.reduce(
      (total, item) => total + item.unitAmount * item.quantity * 100,
      0,
    );

    if (amount <= 0) {
      return NextResponse.json(
        { message: 'Free products need a separate delivery flow and cannot be sent to Stripe.' },
        { status: 400 },
      );
    }

    const stripe = getStripeClient();

    // Never accept money for a source package that cannot be delivered.
    // Check every distinct private object before creating a PaymentIntent.
    const bucket = getPrivateProductBucket();
    const fileKeys = [...new Set(lineItems.map((item) => item.product.fileKey))];
    const assetChecks = await Promise.all(
      fileKeys.map((fileKey) => bucket.file(productObjectPath(fileKey)).exists()),
    );

    if (assetChecks.some(([exists]) => !exists)) {
      return NextResponse.json(
        { message: 'สินค้าบางรายการยังไม่พร้อมดาวน์โหลด จึงยังไม่เปิดให้ชำระเงิน กรุณาติดต่อผู้ขาย' },
        { status: 503 },
      );
    }

    const checkoutAccess = createCheckoutAccess();
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'thb',
      // Stripe Dashboard controls the enabled methods. With Cards and PromptPay
      // enabled there, Payment Element presents both without handling any card
      // or QR data in our app.
      automatic_payment_methods: { enabled: true, allow_redirects: 'always' },
      receipt_email: payload.data.customerEmail,
      description: `phisitcode order ${checkoutAccess.reference}`,
      metadata: {
        checkout_reference: checkoutAccess.reference,
        product_count: String(lineItems.length),
      },
    });

    if (!paymentIntent.client_secret) {
      throw new Error('Stripe did not provide a client secret.');
    }

    await createCheckoutOrder({
      ...checkoutAccess,
      stripePaymentIntentId: paymentIntent.id,
      customerEmail: payload.data.customerEmail,
      customerName: payload.data.customerName,
      amount,
      currency: 'thb',
      lineItems: lineItems.map((item) => ({
        productId: item.product.id,
        productTitle: item.product.title,
        productSlug: item.product.slug,
        fileKey: item.product.fileKey,
        fileSize: item.product.fileSize,
        version: item.product.version,
        license: item.license,
        quantity: item.quantity,
        unitAmount: item.unitAmount,
      })),
    });

    const response = NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });

    // This opaque, HttpOnly cookie proves that the current browser created the
    // order. It is required before we reveal download capabilities.
    response.cookies.set({
      name: checkoutAccessCookieName(checkoutAccess.reference),
      value: checkoutAccess.accessToken,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to initialize checkout.';
    const isConfigurationError = message === 'STRIPE_SECRET_KEY is not configured.'
      || message === 'Stripe key modes do not match.';

    return NextResponse.json(
      {
        message: isConfigurationError
          ? 'Stripe server credentials are missing or do not match the browser key.'
          : 'Unable to prepare checkout. Please try again shortly.',
      },
      { status: isConfigurationError ? 503 : 500 },
    );
  }
}
