'use client';

import React, { useState } from 'react';

interface Coupon {
  id: string;
  code: string;
  type: 'PERCENTAGE' | 'FIXED';
  value: number;
  minOrder: number;
  usageCount: number;
  usageLimit: number;
  status: 'ACTIVE' | 'EXPIRED' | 'DISABLED';
  expiryDate: string;
}

const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'cpn-1',
    code: 'PLAYFUL20',
    type: 'PERCENTAGE',
    value: 20,
    minOrder: 500,
    usageCount: 42,
    usageLimit: 100,
    status: 'ACTIVE',
    expiryDate: '2026-12-31',
  },
  {
    id: 'cpn-2',
    code: 'COMMUNITY50',
    type: 'FIXED',
    value: 200,
    minOrder: 900,
    usageCount: 18,
    usageLimit: 50,
    status: 'ACTIVE',
    expiryDate: '2026-06-30',
  },
  {
    id: 'cpn-3',
    code: 'LAUNCH10',
    type: 'PERCENTAGE',
    value: 10,
    minOrder: 0,
    usageCount: 100,
    usageLimit: 100,
    status: 'EXPIRED',
    expiryDate: '2026-01-31',
  },
];

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [search, setSearch] = useState('');

  const filtered = coupons.filter((c) => c.code.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-sm text-2xl font-bold text-on-surface">Discount Coupons & Promotions</h1>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Demo data only. These codes do not affect the live Stripe checkout; promotions are disabled until server-side pricing is implemented.
          </p>
        </div>
        <button
          onClick={() => alert('New Coupon modal opened.')}
          className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-[3px_3px_0px_#141b2b] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#141b2b] transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>Create Coupon Code</span>
        </button>
      </div>

      <div className="bg-surface-container-lowest dark:bg-surface/50 border border-outline-variant/20 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
        <span className="material-symbols-outlined text-on-surface-variant text-[20px]">search</span>
        <input
          type="text"
          placeholder="Filter coupon codes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent border-none text-xs text-on-surface focus:outline-none font-medium placeholder:text-on-surface-variant/60"
        />
        <span className="text-xs font-mono text-on-surface-variant">{filtered.length} codes</span>
      </div>

      <div className="bg-surface-container-lowest dark:bg-surface/80 rounded-3xl border border-outline-variant/20 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-surface-container text-on-surface-variant uppercase tracking-wider font-bold bg-surface-container-low/40">
              <th className="py-3 px-5">Coupon Code</th>
              <th className="py-3 px-4">Discount Value</th>
              <th className="py-3 px-4">Min. Order</th>
              <th className="py-3 px-4 text-center">Usage Rate</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4">Expiry Date</th>
              <th className="py-3 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {filtered.map((coupon) => (
              <tr key={coupon.id} className="hover:bg-surface-container-low/50 transition-colors">
                <td className="py-4 px-5">
                  <span className="font-mono font-bold text-sm text-primary bg-primary/10 px-2.5 py-1 rounded-lg border border-primary/20">
                    {coupon.code}
                  </span>
                </td>
                <td className="py-4 px-4 font-bold text-on-surface">
                  {coupon.type === 'PERCENTAGE' ? `${coupon.value}% OFF` : `฿${coupon.value} THB OFF`}
                </td>
                <td className="py-4 px-4 font-mono text-on-surface-variant">
                  {coupon.minOrder > 0 ? `฿${coupon.minOrder}` : 'No minimum'}
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="font-mono font-bold">{coupon.usageCount} / {coupon.usageLimit}</div>
                  <div className="w-20 bg-surface-container h-1.5 rounded-full mx-auto mt-1 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: `${(coupon.usageCount / coupon.usageLimit) * 100}%` }}
                    ></div>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      coupon.status === 'ACTIVE'
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                        : 'bg-error-container text-error'
                    }`}
                  >
                    {coupon.status}
                  </span>
                </td>
                <td className="py-4 px-4 font-mono text-on-surface-variant">{coupon.expiryDate}</td>
                <td className="py-4 px-5 text-right">
                  <button
                    onClick={() => alert(`Toggled status for ${coupon.code}`)}
                    className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface cursor-pointer"
                  >
                    Toggle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
