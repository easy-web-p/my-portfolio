import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  checkoutAccessCookieName,
  consumeDownloadEntitlement,
  getAuthorizedCheckoutOrder,
  getCheckoutDownload,
} from '@/lib/checkout-orders';
import { getPrivateProductBucket, productObjectPath } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

const downloadQuery = z.object({
  order: z.string().uuid(),
  token: z.string().min(32).max(128).regex(/^[A-Za-z0-9_-]+$/),
});

export async function GET(request: Request) {
  const query = downloadQuery.safeParse({
    order: new URL(request.url).searchParams.get('order'),
    token: new URL(request.url).searchParams.get('token'),
  });

  if (!query.success) {
    return NextResponse.json(
      { error: 'Invalid download link.' },
      { status: 400 }
    );
  }

  try {
    const cookieStore = await cookies();
    const order = await getAuthorizedCheckoutOrder(
      query.data.order,
      cookieStore.get(checkoutAccessCookieName(query.data.order))?.value,
    );

    if (!order || order.status !== 'PAID') {
      return NextResponse.json(
        { error: 'Payment verification is required before downloading.' },
        { status: 403 },
      );
    }

    const download = await getCheckoutDownload(order.reference, query.data.token);
    if (!download) {
      return NextResponse.json({ error: 'Invalid download link.' }, { status: 404 });
    }

    const file = getPrivateProductBucket().file(productObjectPath(download.fileKey));
    const [exists] = await file.exists();

    if (!exists) {
      return NextResponse.json(
        { error: 'The paid asset is being prepared. Please contact support if this continues.' },
        { status: 503 },
      );
    }

    // Keep the object private: the server proxies the package only after the
    // entitlement check instead of exposing a long-lived public URL.
    const [packageContents] = await file.download();

    const entitlement = await consumeDownloadEntitlement(order.reference, query.data.token);
    if (!entitlement.valid) {
      return NextResponse.json({ error: entitlement.reason }, { status: 403 });
    }

    const fileName = `${download.productSlug}-v${download.version}.zip`;
    const responseBody = new Uint8Array(packageContents).buffer;

    return new NextResponse(responseBody, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': String(packageContents.length),
        'X-Download-Remaining': String(
          entitlement.download.downloadLimit - entitlement.download.downloadCount - 1,
        ),
        'Cache-Control': 'private, no-store',
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Secure download delivery is temporarily unavailable.' },
      { status: 503 },
    );
  }
}
