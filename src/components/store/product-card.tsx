'use client';

import React from 'react';
import Link from 'next/link';
import { StoreProduct } from '@/types/store';
import { useCart } from './cart-context';
import { useLanguage } from '@/context/language-context';

interface ProductCardProps {
  product: StoreProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { language } = useLanguage();

  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case 'NEW DROP':
        return 'bg-secondary-container text-on-secondary-container';
      case 'AI POWERED':
        return 'bg-primary-container text-on-primary-container';
      case 'PRO TOOL':
        return 'bg-tertiary-fixed text-on-tertiary-fixed';
      case 'FREE':
        return 'bg-secondary-fixed text-on-secondary-fixed-variant font-bold';
      case 'UPDATED':
        return 'bg-primary-fixed text-on-primary-fixed';
      default:
        return 'bg-surface-container-high text-on-surface';
    }
  };

  const getBadgeLabel = (badge?: string) => {
    if (!badge) return '';
    if (language === 'en') return badge;
    switch (badge) {
      case 'NEW DROP':
        return 'สินค้าใหม่';
      case 'AI POWERED':
        return 'พลัง AI';
      case 'PRO TOOL':
        return 'เครื่องมือโปร';
      case 'FREE':
        return 'ฟรี';
      case 'UPDATED':
        return 'อัปเดตใหม่';
      default:
        return badge;
    }
  };

  return (
    <div className="rounded-2xl bg-surface-container-lowest p-4 sm:p-5 shadow-sm hover:shadow-md transition-all border border-outline-variant/30 flex flex-col justify-between gap-4 group">
      {/* Top Preview Card Area */}
      <div className="flex flex-col gap-3">
        <div className="relative w-full h-44 rounded-xl overflow-hidden bg-surface-container flex items-center justify-center border border-outline-variant/20">
          {/* Badge */}
          {product.badge && (
            <div
              className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full font-label-badge text-[11px] font-bold shadow-xs z-10 ${getBadgeStyle(
                product.badge
              )}`}
            >
              {getBadgeLabel(product.badge)}
            </div>
          )}

          {/* Fallback Graphic / Preview Canvas */}
          <div className="w-full h-full p-4 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary-fixed/30 via-surface-container-low to-secondary-fixed/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 rounded-2xl bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm">
              <span className="material-symbols-outlined text-2xl">
                {product.category === 'ai'
                  ? 'psychology'
                  : product.category === 'templates'
                  ? 'dashboard'
                  : product.category === 'apis'
                  ? 'dns'
                  : product.category === 'components'
                  ? 'widgets'
                  : 'card_giftcard'}
              </span>
            </div>
            <span className="font-label-code text-xs text-on-surface-variant font-bold">
              {product.framework} {language === 'th' ? 'สถาปัตยกรรม' : 'Architecture'}
            </span>
          </div>
        </div>

        {/* Info Area */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-headline-sm text-base text-on-surface font-semibold truncate group-hover:text-primary transition-colors">
              {product.title}
            </h3>
          </div>

          {/* Tech stack line */}
          <p className="font-label-code text-xs text-on-surface-variant flex items-center gap-1.5 truncate">
            {product.techStack.slice(0, 3).join(' • ')}
          </p>

          <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2 mt-0.5 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Pricing, Rating & Actions */}
      <div className="flex flex-col gap-3 pt-3 border-t border-outline-variant/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs">
            <span className="text-amber-500 font-bold">★</span>
            <span className="font-label-code font-bold text-on-surface">{product.rating}</span>
            <span className="text-outline text-[11px]">({product.reviewCount})</span>
          </div>

          <div className="flex items-baseline gap-1">
            {product.price === 0 ? (
              <span className="font-headline-sm text-base text-secondary font-bold">
                {language === 'th' ? 'ฟรี' : 'FREE'}
              </span>
            ) : (
              <>
                <span className="font-label-code text-xs text-tertiary">
                  {language === 'th' ? 'เริ่มต้น' : 'From'}
                </span>
                <span className="font-headline-sm text-lg text-on-surface font-bold">
                  ฿{product.price.toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {product.demoUrl && (
            <a
              href={product.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="h-10 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-headline-sm text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">visibility</span>
              <span>{language === 'th' ? 'ทดลองใช้งาน' : 'Live Demo'}</span>
            </a>
          )}
          <Link
            href={`/code/${product.slug}`}
            className="h-10 rounded-full bg-on-surface text-surface-container-lowest hover:bg-primary font-headline-sm text-xs flex items-center justify-center gap-1 transition-colors col-span-1"
          >
            <span>{language === 'th' ? 'ดูรายละเอียด' : 'View Details'}</span>
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => addToCart(product, 'Personal')}
          className="w-full h-10 rounded-full bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed font-headline-sm text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
          <span>
            {product.price === 0
              ? language === 'th'
                ? 'ดาวน์โหลดฟรี'
                : 'Download Free'
              : language === 'th'
              ? 'เพิ่มลงตะกร้า'
              : 'Add to Cart'}
          </span>
        </button>
      </div>
    </div>
  );
};
