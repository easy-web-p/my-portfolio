'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface TokenLog {
  token: string;
  orderId: string;
  customerEmail: string;
  productTitle: string;
  version: string;
  downloadCount: number;
  downloadLimit: number;
  ipHash: string;
  expiresAt: string;
  status: 'ACTIVE' | 'EXHAUSTED' | 'EXPIRED';
}

const INITIAL_LOGS: TokenLog[] = [
  {
    token: 'dl_ys2pxh8u2e_mtt1xga0',
    orderId: 'ORD-982103',
    customerEmail: 'marcus@synthlab.io',
    productTitle: 'AI Chat Starter Kit',
    version: '2.1.0',
    downloadCount: 1,
    downloadLimit: 5,
    ipHash: 'sha256:8f4c2b9...31a',
    expiresAt: '2026-03-08',
    status: 'ACTIVE',
  },
  {
    token: 'dl_ka92lxm18q_mtt23bb1',
    orderId: 'ORD-849201',
    customerEmail: 'alex@example.com',
    productTitle: 'Bento Portfolio Pro Template',
    version: '1.4.0',
    downloadCount: 0,
    downloadLimit: 5,
    ipHash: 'sha256:4a12ec8...99f',
    expiresAt: '2026-03-07',
    status: 'ACTIVE',
  },
  {
    token: 'dl_zz71xva09k_mtt88cc4',
    orderId: 'ORD-729110',
    customerEmail: 'elena@creativepulse.design',
    productTitle: 'WebGPU Shader Micro-Interactions',
    version: '1.2.0',
    downloadCount: 5,
    downloadLimit: 5,
    ipHash: 'sha256:1b99af2...42c',
    expiresAt: '2026-03-05',
    status: 'EXHAUSTED',
  },
  {
    token: 'dl_pp44qqa21m_mtt55dd8',
    orderId: 'ORD-601928',
    customerEmail: 'david@nextwave.tech',
    productTitle: 'Production Node.js REST API Starter',
    version: '3.0.0',
    downloadCount: 2,
    downloadLimit: 5,
    ipHash: 'sha256:9c77da1...88b',
    expiresAt: '2026-03-04',
    status: 'ACTIVE',
  },
];

export default function AdminDownloadsPage() {
  const [logs, setLogs] = useState<TokenLog[]>(INITIAL_LOGS);
  const [search, setSearch] = useState('');

  const filtered = logs.filter(
    (l) =>
      l.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
      l.productTitle.toLowerCase().includes(search.toLowerCase()) ||
      l.token.toLowerCase().includes(search.toLowerCase())
  );

  const resetDownloadLimit = (token: string) => {
    setLogs(
      logs.map((l) =>
        l.token === token
          ? { ...l, downloadCount: 0, status: 'ACTIVE' }
          : l
      )
    );
    alert(`Download counter for token ${token.substring(0, 12)}... reset to 0/5.`);
  };

  const revokeToken = (token: string) => {
    if (confirm('Revoke access for this token immediately?')) {
      setLogs(
        logs.map((l) =>
          l.token === token ? { ...l, status: 'EXHAUSTED' } : l
        )
      );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary" />
            <span className="text-xs font-mono font-bold text-tertiary uppercase tracking-wider">
              ASSET SECURITY &amp; VAULT
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-headline-sm font-bold text-on-surface mt-1">
            Digital Asset Downloads Vault
          </h1>
          <p className="text-xs text-on-surface-variant font-mono mt-0.5">
            Token verification records, IP telemetry, allowance resets, and file distribution logs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/downloads"
            target="_blank"
            className="px-4 py-2 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface text-xs font-mono font-bold transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            Customer Vault
          </Link>
        </div>
      </div>

      {/* Security Policies Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-surface-container-low/80 border border-outline-variant/30 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-primary text-[20px]">lock</span>
          <div>
            <div className="font-bold text-on-surface">Private File Store</div>
            <div className="text-[11px] text-on-surface-variant">
              Packages are served strictly via tokenized streaming API. Never stored in /public.
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-secondary text-[20px]">timer</span>
          <div>
            <div className="font-bold text-on-surface">7-Day Expiry Window</div>
            <div className="text-[11px] text-on-surface-variant">
              Links automatically expire 7 days after purchase to prevent unauthorized sharing.
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-tertiary text-[20px]">pin</span>
          <div>
            <div className="font-bold text-on-surface">5x Download Allowance</div>
            <div className="text-[11px] text-on-surface-variant">
              Prevents scraping bot abuse while allowing ample device transfers.
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-sm">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
          search
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by customer email, product, token..."
          className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface placeholder:text-outline"
        />
      </div>

      {/* Logs Table */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-surface-container-low border-b border-outline-variant/20 text-on-surface-variant">
              <tr>
                <th className="py-3.5 px-4">Download Token</th>
                <th className="py-3.5 px-3">Order</th>
                <th className="py-3.5 px-3">Customer</th>
                <th className="py-3.5 px-3">Product (Ver)</th>
                <th className="py-3.5 px-3">Usage</th>
                <th className="py-3.5 px-3">IP Hash</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filtered.map((log) => (
                <tr key={log.token} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-primary">
                    <span className="bg-surface-container px-2 py-0.5 rounded text-[11px]">
                      {log.token.substring(0, 14)}...
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-on-surface">{log.orderId}</td>
                  <td className="py-3.5 px-3 text-on-surface-variant">{log.customerEmail}</td>
                  <td className="py-3.5 px-3 text-on-surface font-semibold">
                    {log.productTitle} <span className="text-primary font-bold">v{log.version}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`font-bold ${log.downloadCount >= log.downloadLimit ? 'text-error' : 'text-primary'}`}>
                      {log.downloadCount} / {log.downloadLimit}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-outline text-[10px]">{log.ipHash}</td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                        log.status === 'ACTIVE'
                          ? 'bg-success/10 text-success border-success/30'
                          : 'bg-error/10 text-error border-error/30'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1">
                    <button
                      type="button"
                      onClick={() => resetDownloadLimit(log.token)}
                      className="px-2 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-bold text-[10px] transition-colors cursor-pointer"
                      title="Reset count to 0"
                    >
                      Reset 0/5
                    </button>
                    {log.status === 'ACTIVE' && (
                      <button
                        type="button"
                        onClick={() => revokeToken(log.token)}
                        className="px-2 py-1 rounded-lg bg-error/10 hover:bg-error/20 text-error font-bold text-[10px] transition-colors cursor-pointer"
                        title="Revoke Token"
                      >
                        Revoke
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
