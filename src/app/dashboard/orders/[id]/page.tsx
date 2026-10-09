'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = (params?.id as string) || 'ord-101';

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  return (
    <div className="w-full bg-background min-h-screen py-12 md:py-16 px-4 sm:px-6 lg:px-8 print:bg-white print:p-0">
      <div className="max-w-3xl mx-auto">
        {/* Navigation & Print Controls */}
        <div className="flex items-center justify-between gap-4 mb-8 print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
            <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
            <span>/</span>
            <Link href="/dashboard/orders" className="hover:text-primary transition-colors">Orders</Link>
            <span>/</span>
            <span className="text-primary font-mono font-bold">#{orderId}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Print Invoice</span>
            </button>
            <Link
              href="/dashboard/downloads"
              className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary/90 transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Download Files</span>
            </Link>
          </div>
        </div>

        {/* Invoice Receipt Sheet */}
        <div className="bg-surface-container-lowest dark:bg-surface rounded-3xl p-6 sm:p-10 border border-outline-variant/20 shadow-sm print:shadow-none print:border-none print:p-0">
          {/* Invoice Header */}
          <div className="pb-6 mb-6 border-b border-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-xs">
                  ✦
                </span>
                <span className="font-headline-sm text-base font-bold text-on-surface">PhisitCode Studio</span>
              </div>
              <p className="text-xs text-on-surface-variant">Tax ID: TH-0105566012948 • Tokyo & Bangkok</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/25">
                ● PAID & CONFIRMED
              </span>
              <div className="font-mono text-xs text-on-surface-variant mt-1.5">Invoice: #{orderId}</div>
              <div className="text-xs text-on-surface-variant">Date: Feb 24, 2026 14:22 GMT+7</div>
            </div>
          </div>

          {/* Customer & Payment Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-surface-container-low dark:bg-surface-container-highest/20 border border-outline-variant/15 mb-6 text-xs">
            <div>
              <span className="font-bold text-on-surface-variant uppercase tracking-wider block mb-1">Billed To</span>
              <p className="font-bold text-on-surface text-sm">Alex Mercer</p>
              <p className="text-on-surface-variant">alex.mercer@example.com</p>
              <p className="text-on-surface-variant">Bangkok, Thailand</p>
            </div>
            <div>
              <span className="font-bold text-on-surface-variant uppercase tracking-wider block mb-1">Payment Details</span>
              <p className="text-on-surface font-semibold">PromptPay QR & Credit Card Simulator</p>
              <p className="text-on-surface-variant font-mono">Ref: chk_live_9981240182</p>
              <p className="text-emerald-600 dark:text-emerald-400 font-semibold">Webhook verified: 200 OK</p>
            </div>
          </div>

          {/* Order Items Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-surface-container text-on-surface-variant uppercase tracking-wider font-bold">
                  <th className="pb-3">Item & License</th>
                  <th className="pb-3 text-center">Version</th>
                  <th className="pb-3 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container/60">
                <tr>
                  <td className="py-4 pr-4">
                    <div className="font-bold text-sm text-on-surface">AI Chat Starter Kit</div>
                    <div className="text-[11px] text-primary font-semibold mt-0.5">Commercial License (Unlimited Commercial Apps)</div>
                    <div className="text-[10px] text-on-surface-variant font-mono mt-0.5">Token: dl_89f02c1ba7e44</div>
                  </td>
                  <td className="py-4 text-center font-mono font-medium">v2.1.0</td>
                  <td className="py-4 text-right font-mono font-bold text-sm text-on-surface">฿990</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals Summary */}
          <div className="border-t border-surface-container pt-4 space-y-2 max-w-xs ml-auto text-xs">
            <div className="flex justify-between text-on-surface-variant">
              <span>Subtotal:</span>
              <span className="font-mono">฿990</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>Promo Discount:</span>
              <span className="font-mono text-emerald-600">฿0</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>VAT / Tax (0%):</span>
              <span className="font-mono">฿0</span>
            </div>
            <div className="flex justify-between text-base font-bold text-on-surface pt-2 border-t border-surface-container">
              <span>Total Paid:</span>
              <span className="font-mono text-primary">฿990 THB</span>
            </div>
          </div>

          {/* Payment Event Timeline */}
          <div className="mt-8 pt-6 border-t border-surface-container print:hidden">
            <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-3">
              Transaction Event Timeline
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-mono text-on-surface-variant">14:22:04</span>
                <span className="font-medium text-on-surface">Order initiated & payment session opened</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-mono text-on-surface-variant">14:22:31</span>
                <span className="font-medium text-on-surface">Payment authorized via gateway webhook (HTTP 200)</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-mono text-on-surface-variant">14:22:32</span>
                <span className="font-medium text-on-surface">Download entitlement granted & vault token generated</span>
              </div>
            </div>
          </div>

          {/* Support Callout */}
          <div className="mt-8 pt-6 border-t border-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-on-surface-variant print:hidden">
            <span>Need assistance with your license or download?</span>
            <Link href="/support" className="text-primary font-bold hover:underline">
              Contact Product Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
