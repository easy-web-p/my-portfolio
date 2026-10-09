'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { StripePaymentForm } from './stripe-payment-form';

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

type StripePaymentSectionProps = {
  clientSecret: string;
  customerName: string;
  customerEmail: string;
  onBack: () => void;
  onProcessing: (paymentIntentId: string) => void;
  onSucceeded: (paymentIntentId: string) => void;
};

export function StripePaymentSection({
  clientSecret,
  customerName,
  customerEmail,
  onBack,
  onProcessing,
  onSucceeded,
}: StripePaymentSectionProps) {
  if (!stripePromise) {
    return (
      <p role="alert" className="rounded-xl border border-error/30 bg-error/10 p-3 text-sm text-error">
        Stripe is unavailable. Check the publishable-key configuration and restart the app.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-on-surface">เลือกวิธีชำระเงิน</p>
          <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">
            ชำระด้วยบัตรเครดิต/เดบิต หรือสแกน QR PromptPay ในฟอร์มของ Stripe โดยตรง เราไม่เห็นข้อมูลบัตรฉบับเต็มของคุณ
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="shrink-0 rounded-xl border border-outline-variant/40 px-3 py-2 text-xs font-bold text-on-surface transition-colors hover:bg-surface-container"
        >
          แก้ไขข้อมูล
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" aria-label="Available payment methods">
        <div className="flex items-center gap-3 rounded-2xl border border-outline-variant/25 bg-surface-container-low p-3">
          <span className="material-symbols-outlined text-primary">qr_code_2</span>
          <div>
            <p className="text-xs font-bold text-on-surface">PromptPay</p>
            <p className="text-[11px] text-on-surface-variant">สแกน QR ด้วยแอปธนาคารไทย</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-outline-variant/25 bg-surface-container-low p-3">
          <span className="material-symbols-outlined text-primary">credit_card</span>
          <div>
            <p className="text-xs font-bold text-on-surface">Credit / Debit Card</p>
            <p className="text-[11px] text-on-surface-variant">บัตรที่ Stripe รองรับ</p>
          </div>
        </div>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          locale: 'th',
          appearance: { theme: 'stripe' },
        }}
      >
        <StripePaymentForm
          customerEmail={customerEmail}
          customerName={customerName}
          onProcessing={onProcessing}
          onSucceeded={onSucceeded}
        />
      </Elements>

      <p className="text-center text-[11px] leading-relaxed text-on-surface-variant">
        ช่องทางที่แสดงจริงขึ้นกับการเปิดใช้งานใน Stripe Dashboard และความพร้อมของบัญชี Stripe ประเทศไทย
      </p>
    </div>
  );
}
