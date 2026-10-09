'use client';

import React from 'react';
import Link from 'next/link';
import { STORE_PRODUCTS } from '@/lib/store';

export default function CustomerDashboardPage() {
  const customerName = 'Alex Mercer';
  const customerEmail = 'alex.mercer@example.com';

  const mockPurchasedItems = [
    {
      id: 'ord-101',
      date: 'Feb 24, 2026',
      total: 990,
      product: STORE_PRODUCTS[0], // AI Chat Starter Kit
      license: 'Commercial License',
      version: 'v2.1.0',
      downloadCount: 1,
      maxDownloads: 5
    },
    {
      id: 'ord-102',
      date: 'Jan 15, 2026',
      total: 790,
      product: STORE_PRODUCTS[1], // Bento Portfolio Pro
      license: 'Personal License',
      version: 'v1.4.2',
      downloadCount: 2,
      maxDownloads: 5
    }
  ];

  return (
    <div className="w-full bg-background min-h-screen py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-container-max mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-primary font-bold">Customer Dashboard</span>
        </div>

        {/* Dashboard Profile Welcome Banner */}
        <div className="bg-surface-container-lowest dark:bg-surface/80 rounded-3xl p-6 sm:p-8 border border-outline-variant/20 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-primary-container text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
              AM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-headline-sm text-xl sm:text-2xl font-bold text-on-surface">
                  Welcome back, {customerName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                  Active Customer
                </span>
              </div>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5 font-mono">
                {customerEmail} • Account ID: <span className="text-primary">cst_78201</span>
              </p>
            </div>
          </div>

          {/* Quick Sub-Navigation Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/dashboard/downloads"
              className="px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary/90 transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Downloads Vault</span>
            </Link>
            <Link
              href="/dashboard/orders"
              className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">receipt_long</span>
              <span>Orders & Receipts</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className="px-3.5 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">settings</span>
              <span>Settings</span>
            </Link>
          </div>
        </div>

        {/* 3 Metric Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/20 shadow-xs">
            <div className="flex items-center justify-between text-on-surface-variant mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Digital Assets</span>
              <span className="material-symbols-outlined text-primary text-[20px]">folder_zip</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-on-surface">2 Products</div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
              ✦ Lifetime commercial licenses active
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/20 shadow-xs">
            <div className="flex items-center justify-between text-on-surface-variant mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Completed Orders</span>
              <span className="material-symbols-outlined text-primary text-[20px]">shopping_bag</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-on-surface">2 Invoices</div>
            <p className="text-[11px] text-on-surface-variant mt-1">
              Total Invested: ฿1,780 THB
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/20 shadow-xs">
            <div className="flex items-center justify-between text-on-surface-variant mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Version Updates</span>
              <span className="material-symbols-outlined text-emerald-500 text-[20px]">update</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-400">Up to date</div>
            <p className="text-[11px] text-on-surface-variant mt-1">
              Free updates valid until Dec 2026
            </p>
          </div>
        </div>

        {/* Product Updates & Notice Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-[22px] mt-0.5">celebration</span>
            <div>
              <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
                New Release: AI Chat Starter Kit v2.1.0
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                DeepSeek-R1 reasoning support and WebGPU local fallback now included. Free download ready in your vault.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/downloads"
            className="px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-bold shrink-0 text-center shadow-xs"
          >
            Download v2.1.0
          </Link>
        </div>

        {/* Recent Purchases & Entitlements Table */}
        <div className="bg-surface-container-lowest dark:bg-surface rounded-3xl p-6 sm:p-8 border border-outline-variant/20 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-surface-container">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">inventory_2</span>
              <h2 className="font-headline-sm text-lg font-bold text-on-surface">Your Purchased Products</h2>
            </div>
            <Link
              href="/code"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>Explore Code Store</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>

          <div className="space-y-4">
            {mockPurchasedItems.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl bg-surface-container-low dark:bg-surface-container-high/20 border border-outline-variant/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-mono font-bold">
                      {item.version}
                    </span>
                    <span className="text-xs text-on-surface-variant font-medium">Purchased {item.date}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-on-surface">
                    {item.product.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface-variant mt-1">
                    <span>License: <strong className="text-on-surface">{item.license}</strong></span>
                    <span>•</span>
                    <span>Downloads: <strong className="text-primary">{item.downloadCount}/{item.maxDownloads}</strong></span>
                    <span>•</span>
                    <span>Order: <Link href={`/dashboard/orders/${item.id}`} className="font-mono text-primary hover:underline">#{item.id}</Link></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/dashboard/orders/${item.id}`}
                    className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-colors"
                  >
                    View Invoice
                  </Link>
                  <Link
                    href="/dashboard/downloads"
                    className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary/90 transition-all flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    <span>Download Files</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
