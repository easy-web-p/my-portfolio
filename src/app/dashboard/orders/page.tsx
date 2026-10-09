'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface SavedOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  paymentMethod: string;
  status: string;
  total: number;
  items: Array<{
    productId: string;
    productTitle: string;
    license: string;
    price: number;
    quantity: number;
  }>;
  createdAt: string;
}

const DEFAULT_ORDERS: SavedOrder[] = [
  {
    id: 'ORD-849201',
    customerName: 'Alex Developer',
    customerEmail: 'alex@example.com',
    paymentMethod: 'Credit Card',
    status: 'PAID',
    total: 98,
    items: [
      {
        productId: 'prod-ai-chat',
        productTitle: 'AI Chat Starter Kit',
        license: 'Commercial',
        price: 49,
        quantity: 1,
      },
      {
        productId: 'prod-bento-pro',
        productTitle: 'Bento Portfolio Pro Template',
        license: 'Personal',
        price: 49,
        quantity: 1,
      },
    ],
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<SavedOrder[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('playful_orders') || '[]');
      if (stored && stored.length > 0) {
        setOrders([...stored, ...DEFAULT_ORDERS]);
      } else {
        setOrders(DEFAULT_ORDERS);
      }
    } catch {
      setOrders(DEFAULT_ORDERS);
    }
  }, []);

  return (
    <div className="min-h-screen bg-surface py-10 px-4 sm:px-6 max-w-5xl mx-auto pb-28">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant mb-6">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href="/code" className="hover:text-primary transition-colors">Code Store</Link>
        <span>/</span>
        <span className="text-on-surface font-semibold">Order History</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-headline-sm font-bold text-on-surface tracking-tight">
            Order History &amp; Invoices
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Receipts, tax invoices, and software license records.
          </p>
        </div>
        <Link
          href="/dashboard/downloads"
          className="px-4 py-2 rounded-full bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-[16px]">download</span>
          Go to Asset Vault
        </Link>
      </div>

      {/* Orders Table / Cards */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-xs"
          >
            {/* Order Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-outline-variant/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono font-bold text-sm">
                  #
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-on-surface">{order.id}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-success/10 text-success border border-success/30 font-bold">
                      {order.status}
                    </span>
                  </div>
                  <span className="text-xs text-on-surface-variant font-mono">
                    Purchased on {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-xs text-on-surface-variant block">Total</span>
                  <span className="text-base font-mono font-bold text-primary">${order.total}</span>
                </div>
                <button
                  onClick={() => alert(`Downloading official PDF receipt for ${order.id}...`)}
                  className="p-2 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                  title="Download PDF Invoice"
                >
                  <span className="material-symbols-outlined text-[20px]">description</span>
                </button>
              </div>
            </div>

            {/* Items inside this order */}
            <div className="divide-y divide-outline-variant/10 py-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-on-surface">{item.productTitle}</span>
                    <div className="flex items-center gap-2 text-on-surface-variant font-mono text-[11px] mt-0.5">
                      <span className="bg-surface-container px-1.5 py-0.5 rounded">{item.license} License</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <div className="text-right font-mono font-bold text-on-surface">
                    ${item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Action footer */}
            <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs font-mono">
              <span className="text-on-surface-variant">Billed to: {order.customerEmail}</span>
              <Link
                href={`/dashboard/downloads?orderId=${order.id}`}
                className="text-primary hover:underline font-bold flex items-center gap-1"
              >
                <span>Access Files</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
