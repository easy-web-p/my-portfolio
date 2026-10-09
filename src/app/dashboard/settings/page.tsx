'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { displayNameOf, useDashboardUser } from '@/components/dashboard/session-context';
import { SignOutButton } from '@/components/auth/sign-out-button';

export default function CustomerSettingsPage() {
  // ค่าเริ่มต้นของฟอร์มมาจาก session จริง
  // หมายเหตุ: ปุ่ม Save ยังไม่ได้ต่อ backend — ยังไม่เขียนค่ากลับไปที่ Firebase Auth
  const user = useDashboardUser();
  const [name, setName] = useState(displayNameOf(user));
  const [email, setEmail] = useState(user.email ?? '');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(true);
  const [productUpdatesSubscribed, setProductUpdatesSubscribed] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="w-full bg-background min-h-screen py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-6">
          <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-primary font-bold">Account Settings</span>
        </div>

        <div className="pb-6 mb-8 border-b border-surface-container">
          <h1 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface">
            Customer Settings & Security
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Manage your account credentials, notifications, and security sessions.
          </p>
        </div>

        {savedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-6 flex items-center gap-2 animate-in fade-in duration-200">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>Profile and notification preferences saved successfully!</span>
          </div>
        )}

        <div className="space-y-6">
          {/* Profile Details Form */}
          <div className="bg-surface-container-lowest dark:bg-surface rounded-3xl p-6 sm:p-8 border border-outline-variant/20 shadow-xs">
            <h2 className="text-sm font-bold text-on-surface uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">person</span>
              <span>Personal Information</span>
            </h2>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/20 text-xs font-medium text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/20 text-xs font-medium text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* Email & Release Notifications */}
          <div className="bg-surface-container-lowest dark:bg-surface rounded-3xl p-6 sm:p-8 border border-outline-variant/20 shadow-xs">
            <h2 className="text-sm font-bold text-on-surface uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">notifications</span>
              <span>Notification Preferences</span>
            </h2>

            <div className="space-y-4 text-xs">
              <label className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-low dark:bg-surface-container-highest/20 border border-outline-variant/15 cursor-pointer">
                <div>
                  <span className="font-bold text-on-surface block">Product Version Releases</span>
                  <span className="text-on-surface-variant text-[11px]">
                    Receive instant alerts when eligible updates (e.g. v2.1.0) are available for purchased starter kits.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={productUpdatesSubscribed}
                  onChange={(e) => setProductUpdatesSubscribed(e.target.checked)}
                  className="rounded text-primary focus:ring-0 ml-4"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-low dark:bg-surface-container-highest/20 border border-outline-variant/15 cursor-pointer">
                <div>
                  <span className="font-bold text-on-surface block">Knowledge Hub Digest</span>
                  <span className="text-on-surface-variant text-[11px]">
                    Monthly curated insights on AI architecture, WebGL shaders, and Node.js microservices.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={newsletterSubscribed}
                  onChange={(e) => setNewsletterSubscribed(e.target.checked)}
                  className="rounded text-primary focus:ring-0 ml-4"
                />
              </label>
            </div>
          </div>

          {/* Active Sessions & Security */}
          <div className="bg-surface-container-lowest dark:bg-surface rounded-3xl p-6 sm:p-8 border border-outline-variant/20 shadow-xs">
            <h2 className="text-sm font-bold text-on-surface uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">security</span>
              <span>Active Sessions & Security</span>
            </h2>

            <div className="p-4 rounded-xl bg-surface-container-low dark:bg-surface-container-highest/20 border border-outline-variant/15 flex items-center justify-between text-xs mb-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-500 text-[20px]">laptop_mac</span>
                <div>
                  <span className="font-bold text-on-surface block">macOS Chrome (Current Session)</span>
                  <span className="text-on-surface-variant text-[11px]">IP: 49.229.***.*** • Bangkok, Thailand</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                ACTIVE
              </span>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => alert('Data export archive prepared and emailed.')}
                className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface transition-colors cursor-pointer"
              >
                Export Account Data (JSON)
              </button>
              <button
                type="button"
                onClick={() => alert('Please contact support to complete account deletion.')}
                className="px-3.5 py-2 rounded-xl bg-error-container text-error text-xs font-bold hover:bg-error-container/80 transition-colors cursor-pointer"
              >
                Request Account Deletion
              </button>
              <SignOutButton className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface transition-colors cursor-pointer disabled:opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
