'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { CheckoutFulfillmentPanel } from '@/components/store/checkout-fulfillment-panel';

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<CheckoutResultFallback label="Loading payment status…" />}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}

function CheckoutSuccessContent() {
  const paymentIntentId = useSearchParams().get('payment_intent');

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background px-4 py-16">
      <section aria-live="polite" className="w-full max-w-lg rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-8 text-center shadow-xl sm:p-10">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
          <span className="material-symbols-outlined text-4xl">check_circle</span>
        </div>

        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Checking payment
        </span>

        <h1 className="mt-3 text-2xl font-bold text-on-surface sm:text-3xl">
          Thank you for your order
        </h1>

        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-on-surface-variant">
          We&apos;re checking Stripe&apos;s signed payment confirmation. Your source files unlock only after the payment is verified below.
        </p>

        {paymentIntentId && (
          <p className="my-6 rounded-2xl border border-outline-variant/15 bg-surface-container-low p-4 text-left text-xs text-on-surface-variant">
            Payment reference: <span className="break-all font-mono font-bold text-on-surface">{paymentIntentId}</span>
          </p>
        )}

        <CheckoutFulfillmentPanel paymentIntentId={paymentIntentId} />

        <p className="mx-auto mb-6 mt-5 max-w-md text-xs leading-relaxed text-on-surface-variant">
          Do not share the payment reference or this browser session. It is required before the protected download link can be opened.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/code"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-on-primary shadow-sm transition-colors hover:bg-primary/90 sm:w-auto"
          >
            <span className="material-symbols-outlined text-[18px]">storefront</span>
            Continue browsing
          </Link>
          <Link
            href="/support"
            className="w-full rounded-xl bg-surface-container px-4 py-2.5 text-xs font-bold text-on-surface transition-colors hover:bg-surface-container-high sm:w-auto"
          >
            Need help?
          </Link>
        </div>
      </section>
    </main>
  );
}

function CheckoutResultFallback({ label }: { label: string }) {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background px-4 py-16">
      <p className="text-sm text-on-surface-variant">{label}</p>
    </main>
  );
}
