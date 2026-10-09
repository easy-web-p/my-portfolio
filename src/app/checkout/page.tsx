'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/store/cart-context';
import { StripePaymentSection } from '@/components/store/stripe-payment-section';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalPrice } = useCart();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isPreparing, setIsPreparing] = useState(false);

  const isPaymentStep = clientSecret !== null;

  async function handleCheckout() {
    if (!agreeTerms) {
      setErrorMsg('Please agree to the Digital Software License Agreement to proceed.');
      return;
    }
    if (!email.includes('@') || !fullName.trim()) {
      setErrorMsg('Enter your full name and a valid email address to continue.');
      return;
    }

    setErrorMsg('');
    setIsPreparing(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: fullName,
          customerEmail: email,
          company,
          items: cart.map((item) => ({
            productId: item.product.id,
            license: item.license,
            quantity: item.quantity,
          })),
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.clientSecret) {
        throw new Error(result.message ?? 'Unable to prepare secure payment.');
      }

      setClientSecret(result.clientSecret);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : 'Unable to prepare secure payment.');
    } finally {
      setIsPreparing(false);
    }
  }

  function handleEditDetails() {
    setClientSecret(null);
    setErrorMsg('');
  }

  function handlePaymentSucceeded(paymentIntentId: string) {
    router.push(`/checkout/success?payment_intent=${encodeURIComponent(paymentIntentId)}`);
  }

  function handlePaymentProcessing(paymentIntentId: string) {
    router.push(`/checkout/pending?payment_intent=${encodeURIComponent(paymentIntentId)}`);
  }

  if (process.env.NEXT_PUBLIC_CHECKOUT_AVAILABLE === 'false') {
    return (
      <main className="mx-auto max-w-xl px-4 py-20 text-center">
        <span className="material-symbols-outlined text-5xl text-primary">construction</span>
        <h1 className="mt-4 text-2xl font-bold text-on-surface">ระบบชำระเงินยังไม่เปิดให้บริการ</h1>
        <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
          เว็บไซต์นี้ยังใช้โฮสติ้งแบบ static ซึ่งไม่สามารถตรวจสอบการชำระเงินหรือส่งไฟล์โค้ดอย่างปลอดภัยได้
          กรุณาติดต่อผู้ขายก่อนทำรายการ
        </p>
        <Link href="/contact" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-bold text-on-primary">
          ติดต่อผู้ขาย
        </Link>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-surface py-16 px-4 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-[32px]">shopping_bag</span>
        </div>
        <h1 className="text-2xl font-headline-sm font-bold text-on-surface mb-2">No Items to Checkout</h1>
        <p className="text-on-surface-variant text-sm mb-6">
          Your cart is empty. Please add at least one starter kit or template to proceed.
        </p>
        <Link
          href="/code"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-on-primary font-label-badge text-sm font-bold"
        >
          Browse Code Store
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface py-10 px-4 sm:px-6 max-w-5xl mx-auto pb-28">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant mb-6">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href="/code" className="hover:text-primary transition-colors">Code Store</Link>
        <span>/</span>
        <Link href="/cart" className="hover:text-primary transition-colors">Cart</Link>
        <span>/</span>
        <span className="text-on-surface font-semibold">Checkout</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-headline-sm font-bold text-on-surface tracking-tight">
          Secure Digital Checkout
        </h1>
        <p className="text-on-surface-variant text-sm mt-1">
          Complete your details, then pay through Stripe&apos;s secure checkout form.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Details */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-3">
              <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs font-mono font-bold flex items-center justify-center">
                1
              </span>
              <h2 className="text-base font-headline-sm font-bold text-on-surface">
                Delivery Details
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="customer-name" className="block text-xs font-mono text-on-surface-variant mb-1">
                  Full Name *
                </label>
                <input
                  id="customer-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="พิสิษฐ์ แก้วกุลพิสิฐ"
                  disabled={isPaymentStep || isPreparing}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-hidden focus:border-primary text-sm text-on-surface"
                />
              </div>

              <div>
                <label htmlFor="customer-email" className="block text-xs font-mono text-on-surface-variant mb-1">
                  Email Address * (For Payment Receipt)
                </label>
                <input
                  id="customer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="developer@company.com"
                  disabled={isPaymentStep || isPreparing}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-hidden focus:border-primary text-sm text-on-surface"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="customer-company" className="block text-xs font-mono text-on-surface-variant mb-1">
                  Company / Organization (Optional)
                </label>
                <input
                  id="customer-company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Studio Inc."
                  disabled={isPaymentStep || isPreparing}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-hidden focus:border-primary text-sm text-on-surface"
                />
              </div>
            </div>
          </div>

          {/* Stripe payment */}
          <section id="payment-details" className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-3">
              <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs font-mono font-bold flex items-center justify-center">
                2
              </span>
              <h2 className="text-base font-headline-sm font-bold text-on-surface">
                Secure payment
              </h2>
            </div>
            {clientSecret ? (
              <StripePaymentSection
                clientSecret={clientSecret}
                customerName={fullName}
                customerEmail={email}
                onBack={handleEditDetails}
                onProcessing={handlePaymentProcessing}
                onSucceeded={handlePaymentSucceeded}
              />
            ) : (
              <div className="rounded-2xl bg-surface-container-low p-4 text-sm leading-relaxed text-on-surface-variant">
                ตรวจสอบรายการก่อน แล้วเลือกชำระด้วยบัตรเครดิต/เดบิต หรือ PromptPay QR ในฟอร์มปลอดภัยของ Stripe
              </div>
            )}
          </section>

          {/* License Agreement */}
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              disabled={isPaymentStep || isPreparing}
              className="mt-1 w-4 h-4 rounded-sm text-primary focus:ring-primary border-outline-variant cursor-pointer"
            />
            <label htmlFor="terms" className="text-xs text-on-surface-variant leading-relaxed cursor-pointer select-none">
              I understand that I am purchasing a digital software license. After payment is confirmed, protected
              download links will appear in this browser. I agree to the terms of the selected license tier.
            </label>
          </div>

          {errorMsg && (
            <div role="alert" className="p-4 rounded-xl bg-error/10 border border-error/30 text-error text-xs font-mono">
              {errorMsg}
            </div>
          )}
        </div>

        {/* Order Review Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 sticky top-24 shadow-sm space-y-4">
            <h2 className="text-base font-headline-sm font-bold text-on-surface border-b border-outline-variant/20 pb-3">
              Order Summary ({cart.length} items)
            </h2>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.license}`} className="text-xs space-y-1">
                  <div className="flex justify-between font-bold text-on-surface">
                    <span className="line-clamp-1">{item.product.title}</span>
                    <span className="font-mono ml-2">฿{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-on-surface-variant font-mono">
                    <span>{item.license} License &times; {item.quantity}</span>
                    <span className="text-primary font-bold">Selected</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-outline-variant/20 pt-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span className="text-on-surface font-bold">฿{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Digital Delivery</span>
                <span className="text-success font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-on-surface pt-2 border-t border-outline-variant/10 font-headline-sm">
                <span>Total Due</span>
                <span className="text-xl font-mono text-primary font-bold">฿{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {isPaymentStep ? (
              <a
                href="#payment-details"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-5 py-4 text-sm font-bold text-primary transition-colors hover:bg-primary/10"
              >
                <span className="material-symbols-outlined text-[18px]">lock</span>
                Complete secure payment
              </a>
            ) : (
              <button
                type="button"
                onClick={handleCheckout}
                disabled={isPreparing}
                className="w-full py-4 rounded-full bg-primary text-on-primary font-label-badge text-sm font-bold shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:pointer-events-none disabled:opacity-50"
              >
                {isPreparing ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                    <span>Preparing secure payment…</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                    <span>Continue to payment (฿{totalPrice.toLocaleString()})</span>
                  </>
                )}
              </button>
            )}

            <p className="text-[11px] text-center text-on-surface-variant font-mono">
              30-day money-back guarantee if code is defective.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
