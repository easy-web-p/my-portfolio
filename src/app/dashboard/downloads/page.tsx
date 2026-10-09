import Link from 'next/link';

export default function DownloadsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl bg-surface px-4 py-12 pb-28 sm:px-6">
      <div className="mb-6 flex items-center gap-2 text-xs font-mono text-on-surface-variant">
        <Link href="/" className="transition-colors hover:text-primary">Home</Link>
        <span>/</span>
        <span className="font-semibold text-on-surface">Digital Asset Vault</span>
      </div>

      <section className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-7 text-center shadow-xs sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <span className="material-symbols-outlined text-[32px]">lock</span>
        </div>
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-on-surface">Secure Download Vault</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-on-surface-variant">
          ไฟล์โค้ดจะปรากฏในหน้าการยืนยันคำสั่งซื้อของเบราว์เซอร์เดิม หลัง Stripe webhook ยืนยันว่าได้รับชำระเงินแล้วเท่านั้น
        </p>

        <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-outline-variant/20 bg-surface-container-low p-4 text-left text-xs leading-relaxed text-on-surface-variant">
          <p className="font-bold text-on-surface">การป้องกันสิทธิ์ดาวน์โหลด</p>
          <p className="mt-1">
            ระบบไม่ใช้ข้อมูลหรือโทเคนตัวอย่างเพื่อปลดล็อกไฟล์ การจ่ายผ่านบัตรหรือ PromptPay ที่สำเร็จและผ่านการตรวจสอบเท่านั้นจึงจะออกลิงก์ดาวน์โหลดได้
          </p>
        </div>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/code"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-bold text-on-primary transition-colors hover:bg-primary/90"
          >
            <span className="material-symbols-outlined text-[18px]">storefront</span>
            เลือกโค้ดที่ต้องการ
          </Link>
          <Link
            href="/support"
            className="inline-flex items-center justify-center rounded-xl bg-surface-container px-5 py-3 text-xs font-bold text-on-surface transition-colors hover:bg-surface-container-high"
          >
            ติดต่อฝ่ายช่วยเหลือ
          </Link>
        </div>
      </section>
    </main>
  );
}
