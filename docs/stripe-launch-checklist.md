# phisitcode Stripe launch checklist

The Stripe implementation planner selected **Elements with Payment Intents** for this
existing, custom multi-step web checkout. The immediate business model is one-time
THB payments for private software ZIPs. Card and PromptPay are enabled in the
live Stripe account's default payment-method configuration.

## Before accepting live payments

1. Obtain the real ZIP for every paid item in `src/lib/store.ts`. Confirm each
   file name matches its `fileKey`, then upload it privately under
   `products/<fileKey>` in the configured Cloud Storage bucket. Do not make
   these objects public. The checkout API refuses to create a PaymentIntent
   when any selected ZIP is missing.
2. Upgrade the Firebase project from Spark to Blaze only after the owner
   approves billing. Create an App Hosting backend for this full-stack Next.js
   app. Static Firebase Hosting cannot run `/api/checkout`, `/api/webhooks`,
   `/api/checkout/status`, or `/api/downloads`.
3. Create a **new live restricted Stripe API key** for this server, scoped to
   the PaymentIntent operations it needs, and a live webhook signing secret.
   Put them in Google Secret Manager as
   `stripe-secret-key` and `stripe-webhook-secret`, then enable the matching
   `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` references in
   `apphosting.yaml`. The environment variable is named `STRIPE_SECRET_KEY`
   but can hold a restricted `rk_live_` key. Never commit secret values to
   source control. The
   live publishable key is already configured for the browser build. In every
   environment, publishable and secret keys must belong to the same Stripe
   account and mode (test with test, live with live).
4. Give the App Hosting service account only the Firestore permissions needed
   for `checkoutOrders` and `stripeWebhookEvents` and private object read
   permission for the product bucket. Verify bucket name and the App Hosting
   production URL.
5. Add a Stripe webhook destination at the **actual App Hosting domain**
   ending in `/api/webhooks`; subscribe to `payment_intent.succeeded`,
   `payment_intent.processing`, and `payment_intent.payment_failed`. There is
   no webhook destination for this app yet. Do not point it at the current
   static site, where the endpoint is 404.
6. Exercise a test-mode checkout and webhook delivery, including a successful
   card payment, card failure, and asynchronous PromptPay. Verify that no
   download appears before the signed success event and that only the
   purchaser's browser can fetch the private ZIP. Repeat a low-value live
   smoke test only with the owner's explicit approval, then monitor Stripe
   event deliveries and server logs.

## Product scope

- **Payments**: Payment Element + Payment Intents are already implemented.
  The server computes amounts from the catalog and the webhook checks the
  paid amount/currency before granting a download.
- **Radar**: review the Stripe account's fraud rules and dispute workflow
  before launch; do not invent a separate client-side card-risk engine.
- **Billing**: add only when there is a real recurring license or subscription.
  Current licenses are one-time purchases.
- **Connect**: add only if third-party creators will receive payouts through
  the platform. phisitcode's own direct sales do not need it.
- **Invoicing**: use Stripe Invoicing for manual or B2B invoice requests; do
  not route the instant-download cart through invoices without a separate
  paid-invoice entitlement flow.

The sandbox secret key previously pasted in chat should be rotated. Do not
copy it into this project, deployment configuration, or documentation.
