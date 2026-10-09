'use client';

import React from 'react';
import Link from 'next/link';
import { getAdminMetrics } from '@/lib/admin';

export default function AdminAnalyticsPage() {
  const metrics = getAdminMetrics();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider">
              GROWTH TELEMETRY
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-headline-sm font-bold text-on-surface mt-1">
            Revenue &amp; Conversion Analytics
          </h1>
          <p className="text-xs text-on-surface-variant font-mono mt-0.5">
            License tier distribution, reader-to-buyer conversion funnel, and referral source metrics.
          </p>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Settled Gross', val: `$${metrics.totalRevenue.toLocaleString()}`, change: '+24.5%', icon: 'payments' },
          { label: 'Conversion Funnel', val: metrics.conversionRate, change: 'Top 5% peer benchmark', icon: 'trending_up' },
          { label: 'Avg Order Value', val: '฿84.20', change: '+12% vs Q4', icon: 'shopping_bag' },
          { label: 'Monthly Readers', val: metrics.blogViewsCount, change: '6.8 min duration', icon: 'visibility' },
        ].map((m) => (
          <div key={m.label} className="p-4 sm:p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-on-surface-variant">{m.label}</span>
              <span className="material-symbols-outlined text-primary text-[20px]">{m.icon}</span>
            </div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-on-surface">{m.val}</div>
            <div className="text-[10px] font-mono text-success mt-1">{m.change}</div>
          </div>
        ))}
      </div>

      {/* Grid: License Breakdown & Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue by License Tier (6 cols) */}
        <div className="lg:col-span-6 bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div>
              <h3 className="text-base font-headline-sm font-bold text-on-surface">
                Revenue by License Tier
              </h3>
              <p className="text-xs text-on-surface-variant font-mono">
                Commercial and Extended licenses drive 70% of gross sales
              </p>
            </div>
            <span className="material-symbols-outlined text-primary text-[22px]">pie_chart</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { name: 'Commercial Developer License (1.8x)', pct: 52, val: '฿9,578', color: 'bg-primary' },
              { name: 'Personal / Educational License (1.0x)', pct: 30, val: '฿5,526', color: 'bg-secondary' },
              { name: 'Extended / Agency SaaS License (3.5x)', pct: 18, val: '฿3,316', color: 'bg-tertiary' },
            ].map((tier) => (
              <div key={tier.name} className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-on-surface">{tier.name}</span>
                  <span className="font-mono font-bold text-on-surface">{tier.val} ({tier.pct}%)</span>
                </div>
                <div className="h-2 rounded-full bg-surface-container-low overflow-hidden">
                  <div style={{ width: `${tier.pct}%` }} className={`h-full ${tier.color} rounded-full`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reader to Customer Funnel (6 cols) */}
        <div className="lg:col-span-6 bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div>
              <h3 className="text-base font-headline-sm font-bold text-on-surface">
                Knowledge Hub to Store Funnel
              </h3>
              <p className="text-xs text-on-surface-variant font-mono">
                How technical blog readers convert to Code Store customers
              </p>
            </div>
            <span className="material-symbols-outlined text-success text-[22px]">filter_alt</span>
          </div>

          <div className="space-y-3 pt-2 text-xs font-mono">
            {[
              { stage: '1. Blog Readers', val: '14,200', pct: '100%', sub: 'Organic search & dev communities' },
              { stage: '2. Visited Code Store', val: '3,120', pct: '22.0%', sub: 'Clicked embedded article CTA boxes' },
              { stage: '3. Cart Additions', val: '312', pct: '2.2%', sub: 'Selected license tiers' },
              { stage: '4. Completed Orders', val: '142', pct: '4.8% of Store', sub: 'Verified payments' },
            ].map((step, idx) => (
              <div key={step.stage} className="p-3 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 flex items-center justify-between">
                <div>
                  <div className="font-bold text-on-surface">{step.stage}</div>
                  <div className="text-[10px] text-on-surface-variant">{step.sub}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">{step.val}</div>
                  <div className="text-[10px] text-success font-bold">{step.pct}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Referral Sources & Category Sales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-xs space-y-3 text-xs">
          <h4 className="font-headline-sm font-bold text-on-surface text-sm">
            Top Referral Channels
          </h4>
          <div className="space-y-2 font-mono">
            {[
              { source: 'GitHub Repos & Gists', share: '42%', val: '฿7,736' },
              { source: 'Twitter / X Dev Community', share: '28%', val: '฿5,157' },
              { source: 'Discord & Reddit', share: '18%', val: '฿3,315' },
              { source: 'Direct & Bookmarks', share: '12%', val: '฿2,212' },
            ].map((ref) => (
              <div key={ref.source} className="flex justify-between py-1.5 border-b border-outline-variant/10">
                <span className="text-on-surface">{ref.source}</span>
                <span className="font-bold text-primary">{ref.val} ({ref.share})</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-xs space-y-3 text-xs">
          <h4 className="font-headline-sm font-bold text-on-surface text-sm">
            Sales by Category
          </h4>
          <div className="space-y-2 font-mono">
            {[
              { cat: 'Website Templates', share: '38%', val: '฿6,999' },
              { cat: 'AI Projects & Starters', share: '32%', val: '฿5,894' },
              { cat: 'Node.js REST APIs', share: '18%', val: '฿3,315' },
              { cat: 'UI Components', share: '12%', val: '฿2,212' },
            ].map((c) => (
              <div key={c.cat} className="flex justify-between py-1.5 border-b border-outline-variant/10">
                <span className="text-on-surface">{c.cat}</span>
                <span className="font-bold text-secondary">{c.val} ({c.share})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
