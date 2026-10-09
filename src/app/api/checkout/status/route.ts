import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  checkoutAccessCookieName,
  getAuthorizedOrderByPaymentIntent,
  getCheckoutDownloads,
} from '@/lib/checkout-orders';

export const dynamic = 'force-dynamic';

const paymentIntentQuery = z.string().trim().regex(/^pi_[A-Za-z0-9_]+$/).max(255);

export async function GET(request: Request) {
  const paymentIntentId = paymentIntentQuery.safeParse(
    new URL(request.url).searchParams.get('payment_intent'),
  );

  if (!paymentIntentId.success) {
    return NextResponse.json({ message: 'Invalid payment reference.' }, { status: 400 });
  }

  try {
    const cookieStore = await cookies();
    const order = await getAuthorizedOrderByPaymentIntent(
      paymentIntentId.data,
      (reference) => cookieStore.get(checkoutAccessCookieName(reference))?.value,
    );

    if (!order) {
      // Do not disclose whether a payment reference exists to a browser that
      // did not create the checkout session.
      return NextResponse.json(
        { message: 'This checkout is not available in the current browser.' },
        { status: 404 },
      );
    }

    if (order.status !== 'PAID') {
      return NextResponse.json({ status: order.status.toLowerCase(), downloads: [] });
    }

    const downloads = await getCheckoutDownloads(order.reference);

    return NextResponse.json({
      status: 'paid',
      downloads: downloads.map((download) => ({
        productTitle: download.productTitle,
        productSlug: download.productSlug,
        version: download.version,
        fileSize: download.fileSize,
        license: download.license,
        remainingDownloads: Math.max(0, download.downloadLimit - download.downloadCount),
        downloadUrl: `/api/downloads?order=${encodeURIComponent(order.reference)}&token=${encodeURIComponent(download.token)}`,
      })),
    });
  } catch {
    return NextResponse.json(
      { message: 'Unable to check the payment status right now.' },
      { status: 503 },
    );
  }
}
