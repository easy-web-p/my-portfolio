'use client';

import React, { useState } from 'react';

export default function AdminSettingsPage() {
  const [currency, setCurrency] = useState('USD');
  const [tokenExpiryDays, setTokenExpiryDays] = useState(7);
  const [downloadLimit, setDownloadLimit] = useState(5);
  const [autoEmailReceipt, setAutoEmailReceipt] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const roleMatrix = [
    { role: 'Owner', perms: 'Full Root Access, Payments, Secrets, Team Management', access: 'All Modules' },
    { role: 'Admin', perms: 'Manage Products, Orders, Blog Notes, and Customer Profiles', access: 'Products, Orders, Blog, Customers' },
    { role: 'Editor', perms: 'Draft, Edit, and Publish Technical Articles and Portfolio Works', access: 'Blog Studio, Portfolio' },
    { role: 'Support', perms: 'Inspect Customer Orders, Re-issue Download Tokens, View Logs', access: 'Orders, Downloads, Customers' },
    { role: 'Analyst', perms: 'View Gross Revenue, Conversion Funnels, and Referral Telemetry', access: 'Dashboard, Analytics' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-outline-variant/20 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
          <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider">
            SYSTEM CONTROL
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-headline-sm font-bold text-on-surface mt-1">
          Platform Settings &amp; Governance
        </h1>
        <p className="text-xs text-on-surface-variant font-mono mt-0.5">
          Store currencies, token vault policies, webhook verification, and role-based permissions.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Store & Settlement Policies */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-headline-sm font-bold text-on-surface border-b border-outline-variant/20 pb-3">
            Store &amp; Settlement Policies
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-on-surface-variant mb-1">
                Primary Store Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface"
              >
                <option value="USD">USD ($) — International Developer Standard</option>
                <option value="THB">THB (฿) — Thai Baht / PromptPay</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-on-surface-variant mb-1">
                Download Token Validity
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={tokenExpiryDays}
                  onChange={(e) => setTokenExpiryDays(Number(e.target.value))}
                  className="w-24 px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 font-mono text-xs text-on-surface"
                />
                <span className="text-xs text-on-surface-variant font-mono">Days before token expiry</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-on-surface-variant mb-1">
                Download Attempts Allowance
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={downloadLimit}
                  onChange={(e) => setDownloadLimit(Number(e.target.value))}
                  className="w-24 px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 font-mono text-xs text-on-surface"
                />
                <span className="text-xs text-on-surface-variant font-mono">Maximum downloads per token</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-on-surface-variant mb-1">
                Automated Transactional Emails
              </label>
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="autoEmail"
                  checked={autoEmailReceipt}
                  onChange={(e) => setAutoEmailReceipt(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer"
                />
                <label htmlFor="autoEmail" className="text-xs text-on-surface cursor-pointer select-none">
                  Instantly email license keys &amp; zip links on order settlement
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Webhook Signatures */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-headline-sm font-bold text-on-surface border-b border-outline-variant/20 pb-3">
            Security &amp; Webhook Signatures
          </h3>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 flex items-center justify-between">
              <div>
                <div className="font-bold text-on-surface">Stripe Webhook Signature</div>
                <div className="text-[10px] text-on-surface-variant">Endpoint: /api/webhooks (Active 256-bit HMAC)</div>
              </div>
              <span className="text-success text-[10px] font-bold px-2 py-0.5 rounded bg-success/10 border border-success/30">
                VERIFIED
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 flex items-center justify-between">
              <div>
                <div className="font-bold text-on-surface">Cloud Firestore</div>
                <div className="text-[10px] text-on-surface-variant font-mono">checkoutOrders · stripeWebhookEvents</div>
              </div>
              <span className="text-success text-[10px] font-bold px-2 py-0.5 rounded bg-success/10 border border-success/30">
                CONNECTED
              </span>
            </div>
          </div>
        </div>

        {/* Role-Based Access Control (RBAC) */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-headline-sm font-bold text-on-surface border-b border-outline-variant/20 pb-3">
            Role-Based Access Control (RBAC)
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low border-b border-outline-variant/20 font-mono text-on-surface-variant">
                <tr>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Key Permissions</th>
                  <th className="py-2.5 px-3">Authorized Modules</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {roleMatrix.map((r) => (
                  <tr key={r.role}>
                    <td className="py-2.5 px-3 font-bold text-primary font-mono">{r.role}</td>
                    <td className="py-2.5 px-3 text-on-surface">{r.perms}</td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-on-surface-variant">{r.access}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Save Controls */}
        <div className="flex items-center justify-between pt-2">
          {isSaved ? (
            <span className="text-xs font-mono text-success font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              Platform settings updated successfully!
            </span>
          ) : (
            <span />
          )}

          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold font-label-badge shadow-md hover:bg-primary/90 transition-all cursor-pointer active:scale-95"
          >
            Save Platform Settings
          </button>
        </div>
      </form>
    </div>
  );
}
