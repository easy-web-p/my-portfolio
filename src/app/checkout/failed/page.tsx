'use client';

import Link from 'next/link';

export default function CheckoutFailedPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background px-4 py-16">
      <section className="w-full max-w-lg rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-8 text-center shadow-xl sm:p-10">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-error-container text-error">
          <span className="material-symbols-outlined text-4xl">cancel</span>
        </div>

        <span className="rounded-full bg-error-container px-3 py-1 text-xs font-bold uppercase tracking-wider text-error">
          Payment not completed
        </span>

        <h1 className="mt-3 text-2xl font-bold text-on-surface sm:text-3xl">
          Your payment wasn&apos;t completed
        </h1>

        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-on-surface-variant">
          No download access has been released. You can try again with the payment methods currently available in Stripe&apos;s secure form.
        </p>

        <div className="my-6 rounded-2xl border border-outline-variant/15 bg-surface-container-low p-4 text-left text-xs leading-relaxed text-on-surface-variant">
          <p className="font-bold text-on-surface">Before trying again</p>
          <p className="mt-1">Confirm your payment details and any bank verification request. If the issue continues, contact your bank or our support team.</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/checkout"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-on-primary shadow-sm transition-colors hover:bg-primary/90 sm:w-auto"
          >
            <span className="material-symbols-outlined text-[18px]">replay</span>
            Try payment again
          </Link>
          <Link
            href="/cart"
            className="w-full rounded-xl bg-surface-container px-4 py-2.5 text-xs font-bold text-on-surface transition-colors hover:bg-surface-container-high sm:w-auto"
          >
            Return to cart
          </Link>
        </div>
      </section>
    </main>
  );
}
