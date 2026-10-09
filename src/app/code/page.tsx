'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { STORE_PRODUCTS } from '@/lib/store';
import { ProductCard } from '@/components/store/product-card';
import { StoreFaq } from '@/components/store/faq-accordion';
import { useCart } from '@/components/store/cart-context';
import { useLanguage } from '@/context/language-context';

export default function CodeStorePage() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFramework, setSelectedFramework] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const { addToCart } = useCart();

  const categories = [
    { id: 'all', label: language === 'th' ? 'สินค้าทั้งหมด' : 'All Products' },
    { id: 'templates', label: language === 'th' ? 'เทมเพลตเว็บไซต์' : 'Website Templates' },
    { id: 'components', label: language === 'th' ? 'คอมโพเนนต์ UI' : 'UI Components' },
    { id: 'apis', label: 'Node.js APIs' },
    { id: 'ai', label: language === 'th' ? 'โครงงาน AI' : 'AI Projects' },
    { id: 'free', label: language === 'th' ? 'แจกฟรี (Free)' : 'Free Resources' },
  ];

  const frameworks = ['all', 'Next.js', 'Node.js', 'React', 'WebGL'];

  const filteredProducts = useMemo(() => {
    return STORE_PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesFramework = selectedFramework === 'all' || product.framework === selectedFramework;
      const matchesSearch =
        searchQuery === '' ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesFramework && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured
    });
  }, [selectedCategory, selectedFramework, searchQuery, sortBy]);

  const featuredProduct = STORE_PRODUCTS[0]; // AI Chat Starter Kit

  return (
    <div className="w-full flex flex-col gap-10 pb-20 max-w-screen-md mx-auto px-4">
      {/* 1. Hero Section */}
      <section className="pt-6 flex flex-col gap-4 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span className="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-badge text-xs font-bold uppercase tracking-wider">
            ✦ PHISITCODE STORE
          </span>
          <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-badge text-xs font-bold">
            {language === 'th' ? 'ทดสอบบนสภาพแวดล้อมจริง 100%' : '100% Production Tested'}
          </span>
        </div>

        <h1 className="font-display-hero-mobile text-display-hero-mobile text-on-surface tracking-tight leading-tight">
          {language === 'th' ? (
            <>
              โค้ดที่ช่วยให้คุณสร้างงานได้เร็วกว่าเดิม—
              <span className="text-primary underline decoration-secondary-container decoration-4 underline-offset-4">
                และได้เรียนรู้สถาปัตยกรรมจริงไปพร้อมกัน
              </span>
            </>
          ) : (
            <>
              Code that helps you build faster—
              <span className="text-primary underline decoration-secondary-container decoration-4 underline-offset-4">
                and learn along the way.
              </span>
            </>
          )}
        </h1>

        <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
          {language === 'th'
            ? 'คลังรวมชุดเครื่องมือเริ่มต้น (Starter Kits), API สไตล์โมดูลาร์, และ UI คอมโพเนนต์ที่ออกแบบมาเพื่อลดเวลาพัฒนาซ้ำซ้อนหลายสัปดาห์'
            : 'Carefully engineered starter kits, clean modular APIs, shader packs, and tactile UI components designed to skip weeks of repetitive boilerplate.'}
        </p>

        {/* Quick Trust Metric Bar */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-center">
            <span className="font-headline-sm text-base font-bold text-primary">5,400+</span>
            <p className="font-label-code text-[11px] text-tertiary">
              {language === 'th' ? 'นักพัฒนาเลือกใช้' : 'Developers Powered'}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-center">
            <span className="font-headline-sm text-base font-bold text-secondary">4.9 / 5</span>
            <p className="font-label-code text-[11px] text-tertiary">
              {language === 'th' ? 'คะแนนความพึงพอใจ' : 'Customer Rating'}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-center">
            <span className="font-headline-sm text-base font-bold text-on-surface">
              {language === 'th' ? '12 เดือน' : '12 Mos'}
            </span>
            <p className="font-label-code text-[11px] text-tertiary">
              {language === 'th' ? 'อัปเดตฟรีตลอดปี' : 'Free Updates'}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Featured Bundle Spotlight Banner */}
      <section className="p-6 rounded-2xl bg-gradient-to-br from-on-surface via-inverse-surface to-[#1e1435] text-surface-container-lowest shadow-xl flex flex-col gap-4 relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-52 h-52 rounded-full bg-primary/30 blur-3xl pointer-events-none"></div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed animate-pulse"></span>
          <span className="font-label-badge text-xs text-secondary-fixed uppercase tracking-widest font-bold">
            {language === 'th' ? 'แพ็กเกจสุดคุ้ม • ประหยัด 45%' : 'CREATOR BUNDLE • SAVE 45%'}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <h2 className="font-headline-lg-mobile text-xl sm:text-2xl text-surface-container-lowest font-bold">
            {language === 'th' ? 'ชุดรวม Full-Stack AI & Web Architect Bundle' : 'The Full-Stack AI & Web Architect Bundle'}
          </h2>
          <p className="font-body-sm text-xs text-outline-variant leading-relaxed">
            {language === 'th'
              ? 'รับ AI Chat Starter Kit + Bento Portfolio Pro + Production Node.js API รวมครบในไลบรารีเดียว'
              : 'Get the AI Chat Starter Kit + Bento Portfolio Pro + Production Node.js API together in one comprehensive library.'}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex items-baseline gap-2">
            <span className="font-headline-sm text-2xl text-secondary-fixed font-bold">฿1,390</span>
            <span className="text-sm line-through text-outline font-label-code">฿2,470</span>
          </div>
          <button
            type="button"
            onClick={() => addToCart(featuredProduct, 'Commercial')}
            className="px-5 py-2.5 rounded-full bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed font-headline-sm text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
          >
            {language === 'th' ? 'รับข้อเสนอชุดรวม' : 'Claim Bundle Offer'}
          </button>
        </div>
      </section>

      {/* 3. Filter & Search Controls */}
      <section className="flex flex-col gap-4">
        {/* Search Bar */}
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-3.5 text-tertiary text-[20px]">
            search
          </span>
          <input
            type="text"
            placeholder={
              language === 'th'
                ? 'ค้นหาเทมเพลต, คอมโพเนนต์, เชเดอร์, Node.js...'
                : 'Search templates, components, shaders, Node.js...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-11 pr-4 rounded-xl bg-surface-container-lowest border border-outline-variant/40 font-body-sm text-sm text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Category Filter Pills (Horizontal Scrolling) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-headline-sm text-xs whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-xs font-bold'
                    : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container border border-outline-variant/30'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Sub-filter & Sorting Bar */}
        <div className="flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="font-label-code text-tertiary shrink-0">
              {language === 'th' ? 'เฟรมเวิร์ก:' : 'Framework:'}
            </span>
            {frameworks.map((fw) => (
              <button
                key={fw}
                type="button"
                onClick={() => setSelectedFramework(fw)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-label-code transition-colors cursor-pointer ${
                  selectedFramework === fw
                    ? 'bg-on-surface text-surface-container-lowest font-bold'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {fw === 'all' ? (language === 'th' ? 'ทั้งหมด' : 'All') : fw}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <span className="font-label-code text-tertiary">
              {language === 'th' ? 'เรียงตาม:' : 'Sort:'}
            </span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-surface-container-lowest border border-outline-variant/30 rounded-md px-2 py-1 font-label-code text-[11px] text-on-surface outline-none cursor-pointer"
            >
              <option value="featured">{language === 'th' ? 'สินค้าแนะนำ' : 'Featured'}</option>
              <option value="price-asc">{language === 'th' ? 'ราคา: ต่ำไปสูง' : 'Price: Low to High'}</option>
              <option value="price-desc">{language === 'th' ? 'ราคา: สูงไปต่ำ' : 'Price: High to Low'}</option>
              <option value="rating">{language === 'th' ? 'คะแนนรีวิวสูงสุด' : 'Top Rated'}</option>
            </select>
          </div>
        </div>
      </section>

      {/* 4. Products Grid */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-label-code text-xs text-tertiary uppercase tracking-wider font-bold">
            {language === 'th'
              ? `กำลังแสดง ${filteredProducts.length} รายการ`
              : `Showing ${filteredProducts.length} Products`}
          </span>
          {selectedCategory !== 'all' && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedFramework('all');
                setSearchQuery('');
              }}
              className="text-xs text-primary font-bold hover:underline cursor-pointer"
            >
              {language === 'th' ? 'ล้างตัวกรอง' : 'Clear filters'}
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-4xl text-outline-variant">inventory_2</span>
            <p className="font-headline-sm text-base text-on-surface">
              {language === 'th' ? 'ไม่พบสินค้าที่ตรงกับการค้นหา' : 'No matching code products found'}
            </p>
            <p className="font-body-sm text-xs text-on-surface-variant">
              {language === 'th'
                ? 'ลองปรับคำค้นหา หรือเลือกหมวดหมู่อื่นดูนะครับ'
                : 'Try adjusting your search query or switching to another category.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 5. Frequently Asked Questions */}
      <section className="flex flex-col gap-4 pt-6 border-t border-outline-variant/30">
        <div className="flex flex-col gap-1">
          <span className="font-label-badge text-xs text-primary uppercase font-bold tracking-wider">
            {language === 'th' ? 'นโยบายและข้อตกลง' : 'Clear Policies'}
          </span>
          <h2 className="font-headline-lg-mobile text-xl sm:text-2xl text-on-surface font-bold">
            {language === 'th' ? 'คำถามที่พบบ่อย (FAQ)' : 'Frequently Asked Questions'}
          </h2>
          <p className="font-body-sm text-xs text-on-surface-variant">
            {language === 'th'
              ? 'ทุกสิ่งที่คุณควรรู้เกี่ยวกับใบอนุญาตสิทธิ์, การดาวน์โหลด, การอัปเดต และบริการช่วยเหลือ'
              : 'Everything you need to know about licensing, downloads, updates, and support.'}
          </p>
        </div>

        <StoreFaq />
      </section>
    </div>
  );
}
