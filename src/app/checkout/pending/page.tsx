'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { CheckoutFulfillmentPanel } from '@/components/store/checkout-fulfillment-panel';

export default function CheckoutPendingPage() {
  return (
    <Suspense fallback={<CheckoutResultFallback label="Loading payment status…" />}>
      <CheckoutPendingContent />
    </Suspense>
  );
}

function CheckoutPendingContent() {
  const paymentIntentId = useSearchParams().get('payment_intent');

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background px-4 py-16">
      <section aria-live="polite" className="w-full max-w-lg rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-8 text-center shadow-xl sm:p-10">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15 text-amber-500">
          <span className="material-symbols-outlined text-4xl">hourglass_top</span>
        </div>

        <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          Payment processing
        </span>

        <h1 className="mt-3 text-2xl font-bold text-on-surface sm:text-3xl">
          We&apos;re waiting for confirmation
        </h1>

        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-on-surface-variant">
          Your payment provider may need a little more time. We&apos;ll verify the final status securely before making anything available.
        </p>

        {paymentIntentId && (
          <p className="my-6 rounded-2xl border border-outline-variant/15 bg-surface-container-low p-4 text-left text-xs text-on-surface-variant">
            Payment reference: <span className="break-all font-mono font-bold text-on-surface">{paymentIntentId}</span>
          </p>
        )}

        <div className="rounded-2xl border border-outline-variant/15 bg-surface-container-low p-4 text-left text-xs leading-relaxed text-on-surface-variant">
          <p className="font-bold text-on-surface">What happens next</p>
          <p className="mt-1">Keep your payment receipt. For PromptPay, complete the QR scan in your Thai banking app. We&apos;ll unlock the code only after the webhook confirms the final status.</p>
        </div>

        <CheckoutFulfillmentPanel paymentIntentId={paymentIntentId} />

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/code"
            className="w-full rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-on-primary shadow-sm transition-colors hover:bg-primary/90 sm:w-auto"
          >
            Continue browsing
          </Link>
          <Link
            href="/support"
            className="w-full rounded-xl bg-surface-container px-4 py-2.5 text-xs font-bold text-on-surface transition-colors hover:bg-surface-container-high sm:w-auto"
          >
            Contact support
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
