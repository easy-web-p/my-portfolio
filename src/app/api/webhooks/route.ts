import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { recordStripePaymentEvent } from '@/lib/checkout-orders';
import { getStripeClient } from '@/lib/stripe';

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: 'Webhook is not configured.' }, { status: 400 });
  }

  let event;

  try {
    const payload = await request.text();
    event = getStripeClient().webhooks.constructEvent(payload, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 400 });
  }

  if (
    event.type !== 'payment_intent.succeeded'
    && event.type !== 'payment_intent.processing'
    && event.type !== 'payment_intent.payment_failed'
  ) {
    return NextResponse.json({ received: true, status: 'unhandled_event' });
  }

  try {
    // Fulfilment is deliberately driven only by a signature-verified webhook.
    // The browser confirmation is never enough to unlock a paid source package.
    const result = await recordStripePaymentEvent(
      event.id,
      event.type,
      event.data.object as Stripe.PaymentIntent,
    );

    return NextResponse.json({ received: true, ...result });
  } catch {
    // Return a retryable status so Stripe can redeliver a verified event if the
    // order store or private asset service is temporarily unavailable.
    return NextResponse.json(
      { received: false, error: 'Unable to record the payment event.' },
      { status: 500 },
    );
  }
}
