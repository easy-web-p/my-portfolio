'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from './cart-context';
import { useLanguage } from '@/context/language-context';

export const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, isCartOpen, setIsCartOpen } = useCart();
  const { t } = useLanguage();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-surface-container-lowest h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-primary">shopping_bag</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">{t('cart.title')}</h3>
            <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-badge text-xs font-bold">
              {cart.length}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close Cart"
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 gap-3">
              <span className="material-symbols-outlined text-5xl text-outline-variant">shopping_cart</span>
              <p className="font-headline-sm text-base text-on-surface">{t('cart.empty')}</p>
              <p className="font-body-sm text-xs text-on-surface-variant max-w-xs">
                {t('cart.emptyDesc')}
              </p>
              <Link
                href="/code"
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-5 py-2 rounded-full bg-primary text-on-primary font-label-badge text-xs font-bold hover:bg-primary-container transition-all"
              >
                {t('cart.explore')}
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.license}`}
                className="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-2.5 border border-outline-variant/30"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col min-w-0">
                    <h4 className="font-headline-sm text-sm text-on-surface font-semibold truncate">
                      {item.product.title}
                    </h4>
                    <span className="font-label-badge text-[10px] text-primary uppercase">
                      {item.license} {t('cart.license')}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id, item.license)}
                    aria-label={t('cart.remove')}
                    className="text-tertiary hover:text-error transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20">
                  <div className="flex items-center gap-2 bg-surface-container px-2 py-0.5 rounded-full border border-outline-variant/30">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.license, item.quantity - 1)}
                      className="w-5 h-5 flex items-center justify-center font-bold text-xs hover:text-primary cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-label-code text-xs font-bold">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.license, item.quantity + 1)}
                      className="w-5 h-5 flex items-center justify-center font-bold text-xs hover:text-primary cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-headline-sm text-sm text-on-surface font-bold">
                    {item.price === 0 ? t('cart.free') : `฿${(item.price * item.quantity).toLocaleString()}`}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout CTA */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-outline-variant/30 bg-surface-container-lowest flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-label-code text-xs text-on-surface-variant">{t('cart.estimatedTotal')}</span>
              <span className="font-headline-sm text-lg text-primary font-bold">
                ฿{totalPrice.toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/cart"
                onClick={() => setIsCartOpen(false)}
                className="h-11 rounded-full bg-surface-container-high text-on-surface font-headline-sm text-label-code flex items-center justify-center hover:bg-surface-container-highest transition-all"
              >
                {t('cart.viewCart')}
              </Link>
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="h-11 rounded-full bg-secondary-container text-on-secondary-container font-headline-sm text-label-code font-bold flex items-center justify-center hover:bg-secondary-fixed transition-all shadow-sm"
              >
                {t('cart.checkout')}
              </Link>
            </div>
            <p className="text-[10px] text-center text-outline">
              {t('cart.secureNotice')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
