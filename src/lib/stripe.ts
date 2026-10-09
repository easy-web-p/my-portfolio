import 'server-only';
import Stripe from 'stripe';

let stripeClient: Stripe | undefined;

export function getStripeClient(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured.');
  }

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (publishableKey) {
    const secretMode = secretKey.match(/^(?:sk|rk)_(live|test)_/)?.[1];
    const publishableMode = publishableKey.match(/^pk_(live|test)_/)?.[1];

    if (!secretMode || !publishableMode || secretMode !== publishableMode) {
      throw new Error('Stripe key modes do not match.');
    }
  }

  if (!stripeClient) {
    stripeClient = new Stripe(secretKey);
  }

  return stripeClient;
}
