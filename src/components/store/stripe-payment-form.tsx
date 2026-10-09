'use client';

import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';

type StripePaymentFormProps = {
  customerName: string;
  customerEmail: string;
  onProcessing: (paymentIntentId: string) => void;
  onSucceeded: (paymentIntentId: string) => void;
};

export function StripePaymentForm({
  customerName,
  customerEmail,
  onProcessing,
  onSucceeded,
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message ?? 'Please check your payment details.');
      setIsSubmitting(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/pending`,
        payment_method_data: {
          billing_details: {
            name: customerName,
            email: customerEmail,
          },
        },
      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message ?? 'Your payment could not be confirmed.');
      setIsSubmitting(false);
      return;
    }

    if (paymentIntent?.status === 'succeeded') {
      onSucceeded(paymentIntent.id);
      return;
    }

    if (paymentIntent?.status === 'processing') {
      onProcessing(paymentIntent.id);
      return;
    }

    setErrorMessage('Your payment needs another step. Please try again or choose a different method.');
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-busy={isSubmitting}>
      <PaymentElement
        options={{
          layout: { type: 'accordion', defaultCollapsed: false, radios: 'always', spacedAccordionItems: true },
          paymentMethodOrder: ['promptpay', 'card'],
          fields: { billingDetails: { name: 'never', email: 'never' } },
        }}
      />

      {errorMessage && (
        <p role="alert" className="rounded-xl border border-error/30 bg-error/10 p-3 text-sm text-error">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-4 text-sm font-bold text-on-primary shadow-md transition-all hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
            กำลังยืนยันการชำระเงิน…
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-[18px]">lock</span>
            ชำระเงินอย่างปลอดภัยผ่าน Stripe
          </>
        )}
      </button>

      <p className="text-center text-xs leading-relaxed text-on-surface-variant">
        เมื่อยืนยันการชำระเงินแล้ว ระบบจะปลดล็อกไฟล์โค้ดหลัง Stripe webhook ตรวจสอบความสำเร็จเท่านั้น
      </p>
    </form>
  );
}
