'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/components/store/cart-context';
import { useLanguage } from '@/context/language-context';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { language } = useLanguage();
  return (
    <div className="min-h-screen bg-surface py-10 px-4 sm:px-6 max-w-5xl mx-auto pb-28">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          {language === 'th' ? 'หน้าแรก' : 'Home'}
        </Link>
        <span>/</span>
        <Link href="/code" className="hover:text-primary transition-colors">
          {language === 'th' ? 'คลังโค้ด' : 'Code Store'}
        </Link>
        <span>/</span>
        <span className="text-on-surface font-semibold">
          {language === 'th' ? 'ตะกร้าสินค้า' : 'Cart'}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-headline-sm font-bold text-on-surface tracking-tight">
            {language === 'th' ? 'ตะกร้าสินค้าของคุณ' : 'Shopping Cart'}
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            {language === 'th'
              ? 'ตรวจสอบรายการดิจิทัลโปรดักต์ เทมเพลต และประเภทใบอนุญาตก่อนชำระเงิน'
              : 'Review your digital assets, templates, and license tiers before checkout.'}
          </p>
        </div>
        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-mono text-outline hover:text-error transition-colors flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
            {language === 'th' ? 'ล้างตะกร้า' : 'Clear All'}
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-12 text-center max-w-xl mx-auto my-8 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-[32px]">shopping_bag</span>
          </div>
          <h2 className="text-xl font-headline-sm font-bold text-on-surface mb-2">
            {language === 'th' ? 'ไม่มีสินค้าในตะกร้าของคุณ' : 'Your cart is currently empty'}
          </h2>
          <p className="text-on-surface-variant text-sm mb-6 max-w-md mx-auto">
            {language === 'th'
              ? 'สำรวจคลังเครื่องมือเริ่มต้นคุณภาพสูง เชเดอร์ WebGPU และเทมเพลตซอฟต์แวร์เต็มรูปแบบ'
              : 'Explore our curated selection of production starter kits, WebGPU shader interactions, and full-stack templates.'}
          </p>
          <Link
            href="/code"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-on-primary font-label-badge text-sm font-bold shadow-md hover:bg-primary/90 transition-all cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">terminal</span>
            {language === 'th' ? 'ไปยังคลังโค้ด (Code Store)' : 'Explore Code Store'}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.license}`}
                className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:items-center justify-between hover:border-outline-variant/60 transition-colors shadow-xs"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-surface-container-low shrink-0 border border-outline-variant/20">
                    <Image
                      src={item.product.thumbnail || item.product.image || '/images/products/ai-starter.png'}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={`/code/${item.product.slug}`}
                      className="text-base font-headline-sm font-bold text-on-surface hover:text-primary transition-colors line-clamp-1"
                    >
                      {item.product.title}
                    </Link>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded-md bg-secondary-container text-on-secondary-container font-semibold">
                        {item.license} {language === 'th' ? 'ใบอนุญาต' : 'License'}
                      </span>
                      <span className="text-xs text-on-surface-variant">
                        v{item.product.version}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-primary font-bold mt-1">
                      ฿{item.price.toLocaleString()} {language === 'th' ? '/ ชิ้น' : 'each'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-outline-variant/20">
                  {/* Quantity controls */}
                  <div className="flex items-center border border-outline-variant/40 rounded-lg overflow-hidden bg-surface-container-low">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.license, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-high transition-colors text-on-surface cursor-pointer active:scale-95"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-mono font-bold text-on-surface">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.license, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-high transition-colors text-on-surface cursor-pointer active:scale-95"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right min-w-[70px]">
                    <span className="text-base font-mono font-bold text-on-surface">
                      ฿{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>

                  {/* Delete button */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id, item.license)}
                    className="w-8 h-8 flex items-center justify-center text-outline hover:text-error hover:bg-error/10 rounded-full transition-colors cursor-pointer"
                    aria-label="Remove item"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Guarantee Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {[
                {
                  icon: 'download',
                  title: language === 'th' ? 'ดาวน์โหลดทันที' : 'Instant Access',
                  desc: language === 'th' ? 'รับไฟล์ zip ทันที' : 'Direct zip download',
                },
                {
                  icon: 'sync',
                  title: language === 'th' ? 'อัปเดตฟรี' : 'Free Updates',
                  desc: language === 'th' ? 'รับแพตช์ตลอดการใช้งาน' : 'Lifetime patches',
                },
                {
                  icon: 'verified',
                  title: 'TypeScript',
                  desc: language === 'th' ? 'พิมพ์แบบสตรอง 100%' : '100% Strict Typed',
                },
                {
                  icon: 'lock',
                  title: language === 'th' ? 'ชำระเงินปลอดภัย' : 'Secure Pay',
                  desc: language === 'th' ? 'ระบบเข้ารหัสปลอดภัย' : 'Encrypted Checkout',
                },
              ].map((b) => (
                <div key={b.title} className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 text-center">
                  <span className="material-symbols-outlined text-primary text-[20px] mb-1">{b.icon}</span>
                  <div className="text-xs font-bold text-on-surface">{b.title}</div>
                  <div className="text-[10px] text-on-surface-variant font-mono">{b.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-1">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 sticky top-24 shadow-sm">
              <h2 className="text-lg font-headline-sm font-bold text-on-surface mb-4">
                {language === 'th' ? 'สรุปรายการสั่งซื้อ' : 'Order Summary'}
              </h2>

              {/* Price Calculation */}
              <div className="space-y-3 py-4 border-t border-b border-outline-variant/20 text-xs font-mono">
                <div className="flex justify-between text-on-surface-variant">
                  <span>{language === 'th' ? 'ยอดรวมย่อย' : 'Subtotal'}</span>
                  <span className="font-bold text-on-surface">฿{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>{language === 'th' ? 'ภาษีโดยประมาณ' : 'Estimated Tax'}</span>
                  <span>฿0.00</span>
                </div>
                <div className="flex justify-between text-sm text-on-surface pt-2 font-bold font-headline-sm">
                  <span>{language === 'th' ? 'ยอดชำระสุทธิ' : 'Total'}</span>
                  <span className="text-xl font-mono text-primary font-bold">฿{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="mt-6 space-y-3">
                <Link
                  href="/checkout"
                  className="w-full py-3.5 rounded-full bg-primary text-on-primary font-label-badge text-sm font-bold text-center block shadow-md hover:bg-primary/90 transition-all cursor-pointer active:scale-98"
                >
                  {language === 'th'
                    ? `ดำเนินการชำระเงิน (฿${totalPrice.toLocaleString()})`
                    : `Proceed to Checkout (฿${totalPrice.toLocaleString()})`}
                </Link>
                <Link
                  href="/code"
                  className="w-full py-2.5 text-center text-xs font-mono text-on-surface-variant hover:text-primary transition-colors block"
                >
                  {language === 'th' ? '← เลือกดูสินค้าอื่นเพิ่มเติม' : '← Continue Shopping'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
