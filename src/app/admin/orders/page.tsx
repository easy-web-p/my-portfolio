'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface AdminOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  productTitle: string;
  license: string;
  total: number;
  paymentMethod: string;
  paymentRef: string;
  status: 'PAID' | 'PENDING' | 'REFUNDED';
  date: string;
  downloadCount: number;
  downloadLimit: number;
}

const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: 'ORD-982103',
    customerName: 'Marcus Vance',
    customerEmail: 'marcus@synthlab.io',
    productTitle: 'AI Chat Starter Kit',
    license: 'Commercial',
    total: 99,
    paymentMethod: 'Stripe 256-bit',
    paymentRef: 'pi_3MtwL24x78G9s01',
    status: 'PAID',
    date: '2026-03-01',
    downloadCount: 1,
    downloadLimit: 5,
  },
  {
    id: 'ORD-849201',
    customerName: 'Alex Developer',
    customerEmail: 'alex@example.com',
    productTitle: 'Bento Portfolio Pro Template',
    license: 'Personal',
    total: 49,
    paymentMethod: 'PayPal Express',
    paymentRef: 'PAYID-MTW849201',
    status: 'PAID',
    date: '2026-02-28',
    downloadCount: 0,
    downloadLimit: 5,
  },
  {
    id: 'ORD-729110',
    customerName: 'Elena Rostova',
    customerEmail: 'elena@creativepulse.design',
    productTitle: 'WebGPU Shader Micro-Interactions',
    license: 'Extended',
    total: 149,
    paymentMethod: 'Stripe 256-bit',
    paymentRef: 'pi_3MtwK99x12G8v44',
    status: 'PAID',
    date: '2026-02-26',
    downloadCount: 3,
    downloadLimit: 5,
  },
  {
    id: 'ORD-601928',
    customerName: 'David Chen',
    customerEmail: 'david@nextwave.tech',
    productTitle: 'Production Node.js REST API Starter',
    license: 'Commercial',
    total: 79,
    paymentMethod: 'PromptPay QR',
    paymentRef: 'PP-601928-TX',
    status: 'PAID',
    date: '2026-02-25',
    downloadCount: 2,
    downloadLimit: 5,
  },
  {
    id: 'ORD-519203',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah@hyperdrive.co',
    productTitle: 'Tactile Haptic Component Pack',
    license: 'Extended',
    total: 129,
    paymentMethod: 'Stripe 256-bit',
    paymentRef: 'pi_3MtwA77x99G1k33',
    status: 'PENDING',
    date: '2026-03-02',
    downloadCount: 0,
    downloadLimit: 5,
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);
  const [filter, setFilter] = useState<'ALL' | 'PAID' | 'PENDING' | 'REFUNDED'>('ALL');
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  const totalGross = orders.reduce((sum, o) => (o.status === 'PAID' ? sum + o.total : sum), 0);

  const handleRefund = (id: string) => {
    if (confirm(`Revoke license and issue full refund for order ${id}?`)) {
      setOrders(orders.map((o) => (o.id === id ? { ...o, status: 'REFUNDED' } : o)));
      if (selectedOrder?.id === id) {
        setSelectedOrder({ ...selectedOrder, status: 'REFUNDED' });
      }
    }
  };

  const handleReissueToken = (id: string) => {
    alert(`Fresh download token generated and dispatched to ${selectedOrder?.customerEmail}`);
    setOrders(orders.map((o) => (o.id === id ? { ...o, downloadCount: 0 } : o)));
    if (selectedOrder?.id === id) {
      setSelectedOrder({ ...selectedOrder, downloadCount: 0 });
    }
  };

  const filteredOrders = filter === 'ALL' ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-success" />
            <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider">
              FINANCIAL LEDGER
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-headline-sm font-bold text-on-surface mt-1">
            Orders &amp; License Fulfillment
          </h1>
          <p className="text-xs text-on-surface-variant font-mono mt-0.5">
            Webhook verified transactions, payment timelines, token re-issuance, and refund management.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/orders"
            target="_blank"
            className="px-4 py-2 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface text-xs font-mono font-bold transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">receipt</span>
            Customer View
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Settled Revenue', val: `$${totalGross.toLocaleString()}`, icon: 'payments' },
          { label: 'Completed Orders', val: orders.filter((o) => o.status === 'PAID').length, icon: 'check_circle' },
          { label: 'Pending Gateways', val: orders.filter((o) => o.status === 'PENDING').length, icon: 'hourglass_empty' },
          { label: 'Refund Rate', val: '0.0%', icon: 'verified_user' },
        ].map((m) => (
          <div key={m.label} className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
            <span className="material-symbols-outlined text-primary text-[20px] mb-1">{m.icon}</span>
            <div className="text-xl font-mono font-bold text-on-surface">{m.val}</div>
            <div className="text-xs text-on-surface-variant font-mono">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {(['ALL', 'PAID', 'PENDING', 'REFUNDED'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
              filter === f
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {f} ({f === 'ALL' ? orders.length : orders.filter((o) => o.status === f).length})
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low border-b border-outline-variant/20 font-mono text-on-surface-variant">
              <tr>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-3">Customer</th>
                <th className="py-3.5 px-3">Product &amp; License</th>
                <th className="py-3.5 px-3">Gateway</th>
                <th className="py-3.5 px-3">Amount</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-3">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 font-mono">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-primary">
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="hover:underline cursor-pointer"
                    >
                      {ord.id}
                    </button>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-on-surface">{ord.customerName}</div>
                    <div className="text-[10px] text-on-surface-variant">{ord.customerEmail}</div>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-on-surface">{ord.productTitle}</div>
                    <div className="text-[10px] text-primary">{ord.license} License</div>
                  </td>
                  <td className="py-3.5 px-3 text-on-surface-variant text-[11px]">{ord.paymentMethod}</td>
                  <td className="py-3.5 px-3 font-bold text-on-surface">${ord.total}</td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                        ord.status === 'PAID'
                          ? 'bg-success/10 text-success border-success/30'
                          : ord.status === 'PENDING'
                          ? 'bg-secondary-container text-on-secondary-container'
                          : 'bg-error/10 text-error border-error/30'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-on-surface-variant">{ord.date}</td>
                  <td className="py-3.5 px-4 text-right space-x-1">
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="p-1.5 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-primary inline-block cursor-pointer"
                      title="Inspect Order Details"
                    >
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                    </button>
                    {ord.status === 'PAID' && (
                      <button
                        onClick={() => handleRefund(ord.id)}
                        className="p-1.5 rounded-lg hover:bg-error/10 text-outline hover:text-error inline-block cursor-pointer"
                        title="Issue Refund"
                      >
                        <span className="material-symbols-outlined text-[16px]">undo</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Slide-Over Drawer */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setSelectedOrder(null)} />
          <div className="relative w-full max-w-md bg-surface-container-lowest h-full shadow-2xl p-6 flex flex-col z-10 animate-in slide-in-from-right duration-200 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
              <div>
                <h3 className="text-base font-headline-sm font-bold text-on-surface">
                  Order Details: {selectedOrder.id}
                </h3>
                <span className="text-[10px] font-mono text-outline">
                  Ref: {selectedOrder.paymentRef}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-outline hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Customer Info */}
            <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 space-y-2 text-xs">
              <div className="font-mono text-outline uppercase text-[10px]">Customer Information</div>
              <div className="font-bold text-on-surface">{selectedOrder.customerName}</div>
              <div className="text-on-surface-variant font-mono">{selectedOrder.customerEmail}</div>
            </div>

            {/* Order Items */}
            <div className="space-y-2 text-xs">
              <div className="font-mono text-outline uppercase text-[10px]">Purchased License</div>
              <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 flex items-center justify-between">
                <div>
                  <div className="font-bold text-on-surface">{selectedOrder.productTitle}</div>
                  <div className="text-[11px] font-mono text-primary">{selectedOrder.license} License</div>
                </div>
                <div className="font-mono font-bold text-sm text-on-surface">${selectedOrder.total}</div>
              </div>
            </div>

            {/* Payment Timeline */}
            <div className="space-y-2 text-xs">
              <div className="font-mono text-outline uppercase text-[10px]">Payment Lifecycle</div>
              <div className="space-y-2 border-l-2 border-primary/30 pl-4 py-1 text-xs">
                <div className="space-y-0.5">
                  <div className="font-bold text-on-surface">Order Checkout Initiated</div>
                  <div className="text-[10px] font-mono text-outline">{selectedOrder.date} 09:22 UTC</div>
                </div>
                <div className="space-y-0.5">
                  <div className="font-bold text-success">Webhook Verified (PAID)</div>
                  <div className="text-[10px] font-mono text-outline">{selectedOrder.paymentMethod} verified</div>
                </div>
                <div className="space-y-0.5">
                  <div className="font-bold text-primary">Token Dispatched to Email</div>
                  <div className="text-[10px] font-mono text-outline">Download token active (7d expiry)</div>
                </div>
              </div>
            </div>

            {/* Download Status & Actions */}
            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-3 text-xs">
              <div className="flex items-center justify-between font-mono">
                <span>Download Usage:</span>
                <span className="font-bold text-primary">
                  {selectedOrder.downloadCount} / {selectedOrder.downloadLimit} downloads used
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleReissueToken(selectedOrder.id)}
                  className="flex-1 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">refresh</span>
                  Reset / Re-issue Token
                </button>
                {selectedOrder.status === 'PAID' && (
                  <button
                    type="button"
                    onClick={() => handleRefund(selectedOrder.id)}
                    className="py-2 px-3 rounded-xl bg-error/10 hover:bg-error/20 text-error font-bold text-xs transition-colors cursor-pointer"
                  >
                    Refund Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
