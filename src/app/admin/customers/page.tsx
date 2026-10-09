'use client';

import React, { useState } from 'react';
import { INITIAL_CUSTOMERS, CustomerProfile } from '@/lib/admin';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerProfile[]>(INITIAL_CUSTOMERS);
  const [search, setSearch] = useState('');
  const [selectedCust, setSelectedCust] = useState<CustomerProfile | null>(null);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id: string) => {
    setCustomers(
      customers.map((c) =>
        c.id === id
          ? { ...c, status: c.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' }
          : c
      )
    );
    if (selectedCust?.id === id) {
      setSelectedCust({
        ...selectedCust,
        status: selectedCust.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE',
      });
    }
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['ID,Name,Email,Orders,TotalSpend,Status,JoinedAt']
        .concat(
          customers.map(
            (c) =>
              `${c.id},"${c.name}",${c.email},${c.totalOrders},${c.totalSpend},${c.status},${c.joinedAt}`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `playful-customers-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider">
              CLIENT RELATIONSHIPS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-headline-sm font-bold text-on-surface mt-1">
            Customer Directory
          </h1>
          <p className="text-xs text-on-surface-variant font-mono mt-0.5">
            Developer accounts, lifetime spend, active digital licenses, and account controls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface text-xs font-mono font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            Export CSV
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Registered Creators', val: customers.length, icon: 'group' },
          { label: 'Active Licenses', val: '12 licenses', icon: 'verified' },
          { label: 'Avg Customer Spend', val: `$${Math.round(customers.reduce((s, c) => s + c.totalSpend, 0) / customers.length)}`, icon: 'trending_up' },
          { label: 'Retention Rate', val: '94.2%', icon: 'loyalty' },
        ].map((m) => (
          <div key={m.label} className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
            <span className="material-symbols-outlined text-primary text-[20px] mb-1">{m.icon}</span>
            <div className="text-xl font-mono font-bold text-on-surface">{m.val}</div>
            <div className="text-xs text-on-surface-variant font-mono">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative max-w-sm">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
          search
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customer by name or email..."
          className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface placeholder:text-outline"
        />
      </div>

      {/* Customers Table */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low border-b border-outline-variant/20 font-mono text-on-surface-variant">
              <tr>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-3">Orders</th>
                <th className="py-3.5 px-3">Lifetime Spend</th>
                <th className="py-3.5 px-3">Held Licenses</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-3">Member Since</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => setSelectedCust(c)}
                      className="font-bold text-on-surface hover:text-primary transition-colors cursor-pointer text-left block"
                    >
                      {c.name}
                    </button>
                    <div className="text-[10px] font-mono text-on-surface-variant">{c.email}</div>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-on-surface">{c.totalOrders}</td>
                  <td className="py-3.5 px-3 font-mono font-bold text-primary">${c.totalSpend}</td>
                  <td className="py-3.5 px-3 font-mono">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {c.activeLicenses.map((lic, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-1.5 py-0.2 rounded bg-surface-container text-on-surface font-semibold"
                        >
                          {lic}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border ${
                        c.status === 'ACTIVE'
                          ? 'bg-success/10 text-success border-success/30'
                          : 'bg-error/10 text-error border-error/30'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-outline">{c.joinedAt}</td>
                  <td className="py-3.5 px-4 text-right space-x-1">
                    <button
                      onClick={() => setSelectedCust(c)}
                      className="p-1.5 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-primary inline-block cursor-pointer"
                      title="View Profile"
                    >
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                    </button>
                    <button
                      onClick={() => toggleStatus(c.id)}
                      className={`p-1.5 rounded-lg inline-block cursor-pointer ${
                        c.status === 'ACTIVE'
                          ? 'hover:bg-error/10 text-outline hover:text-error'
                          : 'hover:bg-success/10 text-outline hover:text-success'
                      }`}
                      title={c.status === 'ACTIVE' ? 'Suspend Account' : 'Reactivate Account'}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {c.status === 'ACTIVE' ? 'block' : 'check_circle'}
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Drawer */}
      {selectedCust && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setSelectedCust(null)} />
          <div className="relative w-full max-w-md bg-surface-container-lowest h-full shadow-2xl p-6 flex flex-col z-10 animate-in slide-in-from-right duration-200 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
              <div>
                <h3 className="text-base font-headline-sm font-bold text-on-surface">
                  Customer Profile
                </h3>
                <span className="text-[10px] font-mono text-outline">ID: {selectedCust.id}</span>
              </div>
              <button
                onClick={() => setSelectedCust(null)}
                className="text-outline hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 space-y-2 text-xs">
              <div className="font-bold text-sm text-on-surface">{selectedCust.name}</div>
              <div className="text-on-surface-variant font-mono">{selectedCust.email}</div>
              <div className="pt-2 flex items-center justify-between font-mono">
                <span>Lifetime Value:</span>
                <span className="font-bold text-primary text-sm">${selectedCust.totalSpend}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-mono text-outline uppercase text-[10px]">Active Licensed Products</div>
              <div className="space-y-1.5">
                {selectedCust.activeLicenses.map((lic, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between"
                  >
                    <span className="font-bold text-on-surface">{lic}</span>
                    <span className="text-success text-[10px] font-mono font-bold">ACTIVE</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant/20 flex gap-2">
              <button
                type="button"
                onClick={() => toggleStatus(selectedCust.id)}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                  selectedCust.status === 'ACTIVE'
                    ? 'bg-error/10 text-error hover:bg-error/20'
                    : 'bg-success/10 text-success hover:bg-success/20'
                }`}
              >
                {selectedCust.status === 'ACTIVE' ? 'Suspend Customer Account' : 'Re-Activate Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
