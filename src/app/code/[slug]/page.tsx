'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { getStoreProductBySlug, STORE_PRODUCTS, calculateProductPrice } from '@/lib/store';
import { LicenseType } from '@/types/store';
import { LicenseSelector } from '@/components/store/license-selector';
import { ProductCard } from '@/components/store/product-card';
import { useCart } from '@/components/store/cart-context';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = getStoreProductBySlug(slug);

  const [selectedLicense, setSelectedLicense] = useState<LicenseType>(
    product?.price === 0 ? 'Open Source' : 'Personal'
  );
  const [activeTab, setActiveTab] = useState<'features' | 'included' | 'install' | 'changelog'>('features');
  const { addToCart } = useCart();

  if (!product) {
    return notFound();
  }

  const finalPrice = calculateProductPrice(product.price, selectedLicense);
  const relatedProducts = STORE_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 2);

  return (
    <div className="w-full flex flex-col gap-8 pb-24 max-w-screen-md mx-auto px-4">
      {/* Breadcrumb Navigation */}
      <nav className="pt-4 flex items-center gap-2 text-xs font-label-code text-on-surface-variant">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href="/code" className="hover:text-primary transition-colors">Code Store</Link>
        <span>/</span>
        <span className="text-on-surface font-bold truncate">{product.title}</span>
      </nav>

      {/* 1. Hero Product Summary Box */}
      <div className="rounded-2xl bg-surface-container-lowest p-5 sm:p-6 shadow-sm border border-outline-variant/30 flex flex-col gap-6">
        {/* Visual Preview */}
        <div className="w-full h-56 sm:h-72 rounded-xl bg-gradient-to-br from-primary-fixed/40 via-surface-container-low to-secondary-fixed/20 flex flex-col items-center justify-center p-6 border border-outline-variant/20 relative overflow-hidden">
          {product.badge && (
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-badge text-xs font-bold shadow-xs">
              {product.badge}
            </div>
          )}

          <div className="w-16 h-16 rounded-2xl bg-surface-container-lowest flex items-center justify-center text-primary shadow-md mb-2">
            <span className="material-symbols-outlined text-3xl">terminal</span>
          </div>
          <span className="font-headline-sm text-lg font-bold text-on-surface text-center">
            {product.title}
          </span>
          <span className="font-label-code text-xs text-on-surface-variant font-medium">
            Version {product.version} • {product.fileSize}
          </span>
        </div>

        {/* Title, Rating & Description */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h1 className="font-headline-lg-mobile text-2xl text-on-surface font-bold">
              {product.title}
            </h1>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-xs">
              <span className="text-amber-500 font-bold">★</span>
              <span className="font-label-code font-bold text-on-surface">{product.rating}</span>
              <span className="text-outline text-[11px]">({product.reviewCount} reviews)</span>
            </div>
          </div>

          <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
            {product.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {product.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-full bg-surface-container font-label-badge text-[11px] text-on-surface"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Interactive License Selector */}
        <div className="pt-2 border-t border-outline-variant/20">
          <LicenseSelector
            product={product}
            selectedLicense={selectedLicense}
            onSelectLicense={setSelectedLicense}
          />
        </div>

        {/* Purchase & Action Controls */}
        <div className="flex flex-col gap-3 pt-2">
          <div className="flex items-baseline justify-between">
            <span className="font-label-code text-xs text-tertiary">Selected License Price:</span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-headline-sm text-2xl font-bold text-primary">
                {finalPrice === 0 ? 'FREE' : `฿${finalPrice.toLocaleString()}`}
              </span>
              <span className="font-label-code text-xs text-outline">THB</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {product.demoUrl && (
              <a
                href={product.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="h-12 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-headline-sm text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                <span>Open Live Demo</span>
              </a>
            )}

            <button
              type="button"
              onClick={() => addToCart(product, selectedLicense)}
              className="h-12 rounded-full bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed font-headline-sm text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer col-span-1"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>
              <span>{finalPrice === 0 ? 'Download Free Resource' : 'Add to Cart / Buy Now'}</span>
            </button>
          </div>

          <p className="text-[11px] text-center text-outline font-label-code">
            ⚡ Instant zip package delivered via email + dashboard access. 60-day support included.
          </p>
        </div>
      </div>

      {/* 2. Deep Dive Content Tabs */}
      <div className="rounded-2xl bg-surface-container-lowest p-5 sm:p-6 shadow-sm border border-outline-variant/30 flex flex-col gap-5">
        {/* Tab Headers */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-outline-variant/20 no-scrollbar">
          {(['features', 'included', 'install', 'changelog'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full font-headline-sm text-xs whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-on-surface text-surface-container-lowest font-bold'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab === 'features' && 'Key Features'}
              {tab === 'included' && "What's Included"}
              {tab === 'install' && 'Installation'}
              {tab === 'changelog' && `Changelog (v${product.version})`}
            </button>
          ))}
        </div>

        {/* Tab 1: Key Features */}
        {activeTab === 'features' && (
          <div className="flex flex-col gap-3">
            <h3 className="font-headline-sm text-base text-on-surface font-semibold">
              Engineered for Production Performance
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-low">
                  <span className="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span className="font-body-sm text-xs text-on-surface leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-outline-variant/20 flex flex-col gap-2">
              <h4 className="font-headline-sm text-xs font-bold text-on-surface uppercase">Who is this for?</h4>
              <ul className="list-disc pl-5 font-body-sm text-xs text-on-surface-variant space-y-1">
                {product.targetAudience.map((aud, i) => (
                  <li key={i}>{aud}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: What's Included */}
        {activeTab === 'included' && (
          <div className="flex flex-col gap-3">
            <h3 className="font-headline-sm text-base text-on-surface font-semibold">
              Package Deliverables ({product.fileSize})
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              {product.included.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-low">
                  <span className="material-symbols-outlined text-[18px] text-primary shrink-0">
                    folder_zip
                  </span>
                  <span className="font-body-sm text-xs text-on-surface">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Installation */}
        {activeTab === 'install' && (
          <div className="flex flex-col gap-3">
            <h3 className="font-headline-sm text-base text-on-surface font-semibold">
              Quickstart Terminal Steps
            </h3>
            <div className="rounded-xl bg-inverse-surface p-4 font-mono text-xs text-inverse-on-surface flex flex-col gap-2">
              {product.installation.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-secondary-fixed">$</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Changelog */}
        {activeTab === 'changelog' && (
          <div className="flex flex-col gap-3">
            <h3 className="font-headline-sm text-base text-on-surface font-semibold">
              Version History
            </h3>
            <div className="flex flex-col gap-3">
              {product.changelog.map((entry, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-code text-xs font-bold text-primary">v{entry.version}</span>
                    <span className="font-label-code text-[11px] text-tertiary">{entry.date}</span>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    {entry.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. Related Products Slider */}
      {relatedProducts.length > 0 && (
        <div className="flex flex-col gap-4 pt-4 border-t border-outline-variant/30">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-lg text-on-surface font-bold">
              Related Starter Kits
            </h2>
            <Link href="/code" className="text-xs text-primary font-bold hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
