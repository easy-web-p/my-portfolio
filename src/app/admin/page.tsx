'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAdminMetrics, INITIAL_ACTIVITIES, INITIAL_CUSTOMERS } from '@/lib/admin';
import { STORE_PRODUCTS } from '@/lib/store';
import { BLOG_POSTS } from '@/lib/blog';
import { useLanguage } from '@/context/language-context';

export default function AdminDashboardPage() {
  const { language } = useLanguage();
  const metrics = getAdminMetrics();
  const [revenuePeriod, setRevenuePeriod] = useState<'daily' | 'weekly' | 'monthly'>('monthly');

  // Simulated chart data points
  const chartData = {
    daily: [
      { label: 'Mon', val: 420 },
      { label: 'Tue', val: 680 },
      { label: 'Wed', val: 940 },
      { label: 'Thu', val: 510 },
      { label: 'Fri', val: 1240 },
      { label: 'Sat', val: 1890 },
      { label: 'Sun', val: 1420 },
    ],
    weekly: [
      { label: 'W1', val: 3200 },
      { label: 'W2', val: 4800 },
      { label: 'W3', val: 4100 },
      { label: 'W4', val: 6320 },
    ],
    monthly: [
      { label: 'Nov', val: 9200 },
      { label: 'Dec', val: 12400 },
      { label: 'Jan', val: 14800 },
      { label: 'Feb', val: 18420 },
    ],
  }[revenuePeriod];

  const maxVal = Math.max(...chartData.map((d) => d.val));

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary/15 via-secondary/10 to-surface-container-lowest border border-primary/20 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold">
            <span>●</span> {language === 'th' ? 'ระบบควบคุมพร้อมทำงาน' : 'CONTROL PLANE ACTIVE'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-headline-sm font-bold text-on-surface">
            {language === 'th' ? 'ยินดีต้อนรับกลับมา, คุณพิสิษฐ์! 👋' : 'Welcome back, Phisit! 👋'}
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl">
            {language === 'th'
              ? 'ภาพรวมยอดขายเติบโต +24% ในเดือนนี้ มีคำสั่งซื้อดิจิทัลโปรดักต์ใหม่ 3 รายการ'
              : 'Revenue is pacing +24% higher this month. 3 new commercial starter kit orders arrived today.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/products/new"
            className="px-4 py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold font-label-badge shadow-md hover:bg-primary/90 transition-all flex items-center gap-1.5 active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            {language === 'th' ? 'เพิ่มสินค้าใหม่' : 'New Product Drop'}
          </Link>
          <Link
            href="/admin/posts/new"
            className="px-4 py-2.5 rounded-full bg-surface-container-high text-on-surface text-xs font-bold font-label-badge hover:bg-surface-container-highest transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">edit_note</span>
            {language === 'th' ? 'เขียนบทความ' : 'Write Article'}
          </Link>
        </div>
      </div>

      {/* 6 KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          {
            title: 'Total Revenue',
            val: `$${metrics.totalRevenue.toLocaleString()}`,
            change: metrics.revenueGrowth,
            positive: true,
            icon: 'payments',
            color: 'text-primary',
          },
          {
            title: 'Orders',
            val: metrics.ordersCount,
            change: `${metrics.pendingOrdersCount} pending`,
            positive: true,
            icon: 'receipt_long',
            color: 'text-secondary',
          },
          {
            title: 'Downloads',
            val: metrics.downloadsCount,
            change: '98.4% success',
            positive: true,
            icon: 'key',
            color: 'text-tertiary',
          },
          {
            title: 'Customers',
            val: metrics.activeCustomersCount,
            change: '+18 this week',
            positive: true,
            icon: 'group',
            color: 'text-primary',
          },
          {
            title: 'Blog Views',
            val: metrics.blogViewsCount,
            change: '6.8m avg read',
            positive: true,
            icon: 'article',
            color: 'text-secondary',
          },
          {
            title: 'Conversion',
            val: metrics.conversionRate,
            change: '+0.8% vs goal',
            positive: true,
            icon: 'trending_up',
            color: 'text-success',
          },
        ].map((card) => (
          <div
            key={card.title}
            className="p-4 sm:p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs hover:border-outline-variant/60 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-on-surface-variant font-semibold">
                {card.title}
              </span>
              <span className={`material-symbols-outlined ${card.color} text-[20px]`}>
                {card.icon}
              </span>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-on-surface tracking-tight">
                {card.val}
              </div>
              <div className="text-[10px] font-mono font-bold text-success mt-1">
                {card.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Revenue Visualizer & Action Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 cols: Revenue Trend Visualizer */}
        <div className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-headline-sm font-bold text-on-surface">
                  Revenue Trajectory
                </h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-success/10 text-success border border-success/30 font-bold">
                  +24.5% 🚀
                </span>
              </div>
              <p className="text-xs text-on-surface-variant font-mono mt-0.5">
                Stripe &amp; PayPal digital license settlements
              </p>
            </div>

            {/* Time toggle */}
            <div className="flex items-center p-1 rounded-xl bg-surface-container-low border border-outline-variant/30 self-start sm:self-auto">
              {(['daily', 'weekly', 'monthly'] as const).map((period) => (
                <button
                  key={period}
                  type="button"
                  onClick={() => setRevenuePeriod(period)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    revenuePeriod === period
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {period.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Bar Visualizer */}
          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2 border-b border-outline-variant/20 pb-2">
            {chartData.map((bar) => {
              const heightPct = Math.max(15, Math.round((bar.val / maxVal) * 100));
              return (
                <div key={bar.label} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="text-[10px] font-mono font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    ${bar.val}
                  </div>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className="w-full max-w-[48px] rounded-xl bg-primary/20 group-hover:bg-primary transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary rounded-t-xl" />
                  </div>
                  <span className="text-[11px] font-mono text-outline">{bar.label}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant pt-1">
            <span>Average Order: $84</span>
            <span className="text-primary font-bold">Top Performing: AI Chat Starter Kit</span>
          </div>
        </div>

        {/* Right 4 cols: Actions Needed & Pending Drafts */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card: Needs Attention */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-on-surface">
              <span className="flex items-center gap-1.5 text-secondary">
                <span className="material-symbols-outlined text-[18px]">build_circle</span>
                Updates &amp; Reviews
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
                2 Items
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 space-y-1">
                <div className="font-bold text-on-surface">Bento Portfolio Pro</div>
                <div className="text-[11px] text-on-surface-variant">Recommended update: Next.js 15.2 Turbopack fix</div>
                <Link href="/admin/products" className="text-primary text-[10px] font-mono font-bold hover:underline block pt-0.5">
                  Publish v1.4.1 &rarr;
                </Link>
              </div>

              <div className="p-3 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 space-y-1">
                <div className="font-bold text-on-surface">WebGPU Shaders Review</div>
                <div className="text-[11px] text-on-surface-variant">5-star customer review pending moderation</div>
                <button onClick={() => alert('Review approved!')} className="text-secondary text-[10px] font-mono font-bold hover:underline cursor-pointer">
                  Approve Review &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Card: Pending Drafts */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-on-surface">
              <span className="flex items-center gap-1.5 text-primary">
                <span className="material-symbols-outlined text-[18px]">edit_note</span>
                Drafts Waiting
              </span>
              <Link href="/admin/posts" className="text-[10px] font-mono text-primary hover:underline">
                View all
              </Link>
            </div>

            <div className="p-3 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 space-y-1 text-xs">
              <div className="font-bold text-on-surface line-clamp-1">Tactile Web UI &amp; Audio-Haptic Feedback</div>
              <div className="text-[10px] text-on-surface-variant font-mono">Last edited 2 days ago • 850 words</div>
              <Link href="/admin/posts/new" className="text-primary text-[10px] font-mono font-bold hover:underline block pt-0.5">
                Resume Writing &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid: Recent Orders + Activity Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Orders (7 cols) */}
        <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div>
              <h3 className="text-base font-headline-sm font-bold text-on-surface">
                Latest Customer Orders
              </h3>
              <p className="text-xs text-on-surface-variant font-mono">
                Verified digital license settlements
              </p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-mono text-primary font-bold hover:underline"
            >
              All Orders &rarr;
            </Link>
          </div>

          <div className="divide-y divide-outline-variant/10 text-xs">
            {[
              {
                id: 'ORD-982103',
                customer: 'Marcus Vance',
                product: 'AI Chat Starter Kit',
                license: 'Commercial',
                total: 99,
                status: 'PAID',
                time: '45m ago',
              },
              {
                id: 'ORD-849201',
                customer: 'Alex Developer',
                product: 'Bento Portfolio Pro',
                license: 'Personal',
                total: 49,
                status: 'PAID',
                time: '2h ago',
              },
              {
                id: 'ORD-729110',
                customer: 'Elena Rostova',
                product: 'WebGPU Shader Micro-Interactions',
                license: 'Extended',
                total: 149,
                status: 'PAID',
                time: '1d ago',
              },
              {
                id: 'ORD-601928',
                customer: 'David Chen',
                product: 'Production Node.js REST API',
                license: 'Commercial',
                total: 79,
                status: 'PAID',
                time: '2d ago',
              },
            ].map((ord) => (
              <div key={ord.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-on-surface">{ord.id}</span>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-success/10 text-success font-bold">
                      {ord.status}
                    </span>
                  </div>
                  <div className="text-on-surface-variant text-[11px] truncate">
                    {ord.customer} • {ord.product} ({ord.license})
                  </div>
                </div>

                <div className="text-right shrink-0 font-mono">
                  <div className="font-bold text-primary text-sm">${ord.total}</div>
                  <div className="text-[10px] text-outline">{ord.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Audit Trail (5 cols) */}
        <div className="lg:col-span-5 bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div>
              <h3 className="text-base font-headline-sm font-bold text-on-surface">
                Audit Activity Log
              </h3>
              <p className="text-xs text-on-surface-variant font-mono">
                Real-time security &amp; release stream
              </p>
            </div>
            <span className="text-xs font-mono text-outline">Real-time</span>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {INITIAL_ACTIVITIES.map((act) => (
              <div key={act.id} className="flex items-start gap-3 text-xs">
                <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 mt-0.5 border border-outline-variant/30">
                  <Image src={act.avatar} alt={act.user} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-on-surface leading-tight">
                    <span className="font-bold">{act.user}</span> {act.action}{' '}
                    <span className="font-semibold text-primary">{act.target}</span>
                  </p>
                  <span className="text-[10px] font-mono text-outline">{act.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
