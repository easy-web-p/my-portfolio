'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/components/store/cart-context';

type CheckoutDownload = {
  productTitle: string;
  productSlug: string;
  version: string;
  fileSize: string;
  license: string;
  remainingDownloads: number;
  downloadUrl: string;
};

type CheckoutStatusResponse = {
  status: 'pending' | 'paid' | 'failed';
  downloads: CheckoutDownload[];
  message?: string;
};

type CheckoutFulfillmentPanelProps = {
  paymentIntentId: string | null;
};

export function CheckoutFulfillmentPanel({ paymentIntentId }: CheckoutFulfillmentPanelProps) {
  const { clearCart } = useCart();
  const [result, setResult] = useState<CheckoutStatusResponse | null>(null);
  const [error, setError] = useState('');
  const cartCleared = useRef(false);

  useEffect(() => {
    if (result?.status === 'paid' && result.downloads.length > 0 && !cartCleared.current) {
      cartCleared.current = true;
      clearCart();
    }
  }, [result, clearCart]);

  useEffect(() => {
    if (!paymentIntentId) {
      setError('Payment reference is missing. Please use the checkout page in the same browser.');
      return;
    }

    const paymentReference = paymentIntentId;
    let cancelled = false;
    let retryTimer: number | undefined;

    async function checkStatus() {
      try {
        const response = await fetch(
          `/api/checkout/status?payment_intent=${encodeURIComponent(paymentReference)}`,
          { cache: 'no-store' },
        );
        const data = await response.json() as CheckoutStatusResponse;

        if (!response.ok) {
          throw new Error(data.message ?? 'Unable to check your payment status.');
        }

        if (cancelled) {
          return;
        }

        setResult(data);
        setError('');

        if (data.status === 'pending') {
          retryTimer = window.setTimeout(checkStatus, 5000);
        }
      } catch (statusError) {
        if (!cancelled) {
          setError(statusError instanceof Error ? statusError.message : 'Unable to check your payment status.');
          retryTimer = window.setTimeout(checkStatus, 10000);
        }
      }
    }

    void checkStatus();

    return () => {
      cancelled = true;
      if (retryTimer) {
        window.clearTimeout(retryTimer);
      }
    };
  }, [paymentIntentId]);

  if (result?.status === 'paid' && result.downloads.length === 0) {
    return (
      <section role="alert" className="mt-6 rounded-2xl border border-error/30 bg-error/10 p-4 text-left">
        <p className="text-sm font-bold text-error">ชำระเงินสำเร็จ แต่ยังไม่พบไฟล์ดาวน์โหลด</p>
        <p className="mt-1 text-xs text-on-surface-variant">กรุณาติดต่อฝ่ายสนับสนุนพร้อมหมายเลขรายการชำระเงินด้านบน</p>
        <Link href="/support" className="mt-3 inline-flex text-xs font-bold text-primary underline">ติดต่อฝ่ายสนับสนุน</Link>
      </section>
    );
  }

  if (result?.status === 'paid') {
    return (
      <section aria-live="polite" className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-left">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined mt-0.5 text-emerald-600 dark:text-emerald-400">lock_open</span>
          <div>
            <h2 className="text-sm font-bold text-on-surface">โค้ดพร้อมดาวน์โหลดแล้ว</h2>
            <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">
              Stripe webhook ยืนยันรายการสำเร็จแล้ว เลือกดาวน์โหลดไฟล์ที่ซื้อได้ด้านล่าง
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {result.downloads.map((download) => (
            <div key={download.downloadUrl} className="rounded-xl border border-emerald-500/20 bg-surface-container-lowest p-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-on-surface">{download.productTitle}</p>
                  <p className="mt-0.5 text-[11px] text-on-surface-variant">
                    {download.license} license · v{download.version} · {download.fileSize} · เหลือ {download.remainingDownloads} ครั้ง
                  </p>
                </div>
                <a
                  href={download.downloadUrl}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-on-primary transition-colors hover:bg-primary/90"
                >
                  <span className="material-symbols-outlined text-[17px]">download</span>
                  ดาวน์โหลดโค้ด
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (result?.status === 'failed') {
    return (
      <section role="alert" className="mt-6 rounded-2xl border border-error/30 bg-error/10 p-4 text-left">
        <p className="text-sm font-bold text-error">การชำระเงินไม่สำเร็จ</p>
        <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">
          ยังไม่มีการปลดล็อกไฟล์ คุณสามารถลองชำระเงินใหม่ได้โดยไม่สูญเสียสิทธิ์ดาวน์โหลด
        </p>
        <Link href="/checkout" className="mt-3 inline-flex rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-on-primary">
          กลับไปชำระเงินใหม่
        </Link>
      </section>
    );
  }

  return (
    <section aria-live="polite" className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-left">
      <div className="flex items-start gap-3">
        <span className="material-symbols-outlined mt-0.5 animate-spin text-amber-600 dark:text-amber-400">progress_activity</span>
        <div>
          <h2 className="text-sm font-bold text-on-surface">กำลังตรวจสอบการชำระเงิน</h2>
          <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">
            {error || 'หากเลือก PromptPay ให้สแกน QR และยืนยันในแอปธนาคารก่อน ระบบจะปลดล็อกโค้ดเมื่อ Stripe webhook ยืนยันรายการ'}
          </p>
        </div>
      </div>
    </section>
  );
}
