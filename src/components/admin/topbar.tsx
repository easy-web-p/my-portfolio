'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FUN_STATUS_MESSAGES } from '@/lib/admin';
import { useLanguage } from '@/context/language-context';

interface TopbarProps {
  onOpenCommandPalette: () => void;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}

export const AdminTopbar: React.FC<TopbarProps> = ({
  onOpenCommandPalette,
  collapsed,
  setCollapsed,
}) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [createMenuOpen, setCreateMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);

  const rotateStatus = () => {
    setStatusIndex((prev) => (prev + 1) % FUN_STATUS_MESSAGES.length);
  };

  return (
    <header className="h-16 px-4 sm:px-6 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/15 flex items-center justify-between gap-4 sticky top-0 z-30">
      {/* Left: Mobile sidebar toggle + Command Palette Search Trigger */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="w-9 h-9 rounded-xl hover:bg-surface-container-low text-on-surface-variant flex items-center justify-center transition-colors cursor-pointer"
          title="Toggle Navigation"
        >
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>

        {/* Command Menu Trigger Button */}
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-surface-container-low hover:bg-surface-container-high border border-outline-variant/30 text-on-surface-variant text-xs font-mono transition-all cursor-pointer shadow-2xs group"
        >
          <span className="material-symbols-outlined text-[16px] text-primary group-hover:scale-110 transition-transform">
            search
          </span>
          <span className="hidden sm:inline">{t('admin.topbar.search')}</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-surface-container-lowest text-[10px] font-mono text-outline border border-outline-variant/40 shadow-2xs">
            Ctrl+K
          </kbd>
        </button>

        {/* Fun Status Pill (Requested by User) */}
        <button
          type="button"
          onClick={rotateStatus}
          title="Click to switch status"
          className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 hover:bg-primary/15 border border-primary/25 text-xs font-mono font-bold text-primary transition-all cursor-pointer select-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
          <span>{FUN_STATUS_MESSAGES[statusIndex]}</span>
        </button>
      </div>

      {/* Right: Quick Actions + Notifications + Language Switcher + View Site + Profile */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        {/* + Create Quick Action Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setCreateMenuOpen(!createMenuOpen)}
            className="h-9 px-3 rounded-full bg-primary text-on-primary font-label-badge text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-primary/90 transition-all cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span className="hidden sm:inline">{t('admin.topbar.create')}</span>
          </button>

          {createMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
              <Link
                href="/admin/products/new"
                onClick={() => setCreateMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-on-surface hover:bg-surface-container-low transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">inventory_2</span>
                <span>{t('admin.topbar.newProduct')}</span>
              </Link>
              <Link
                href="/admin/posts/new"
                onClick={() => setCreateMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-on-surface hover:bg-surface-container-low transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] text-secondary">edit_note</span>
                <span>{t('admin.topbar.writeArticle')}</span>
              </Link>
              <Link
                href="/admin/customers"
                onClick={() => setCreateMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-on-surface hover:bg-surface-container-low transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] text-tertiary">person_add</span>
                <span>{t('admin.topbar.addCustomer')}</span>
              </Link>
            </div>
          )}
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            aria-label="View Notifications"
            className="relative w-9 h-9 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">notifications</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-100 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-on-surface pb-1 border-b border-outline-variant/15">
                <span>{t('admin.topbar.alerts')}</span>
                <span className="text-primary text-[10px] cursor-pointer hover:underline">{t('admin.topbar.markRead')}</span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low transition-colors">
                  <div className="font-bold text-on-surface">New Order #ORD-982103</div>
                  <div className="text-[10px] text-on-surface-variant font-mono">Marcus Vance paid $99 for AI Chat</div>
                </div>
                <div className="p-2 rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low transition-colors">
                  <div className="font-bold text-on-surface">Download verified</div>
                  <div className="text-[10px] text-on-surface-variant font-mono">Token dl_ys2pxh8 verified (1/5 used)</div>
                </div>
                <div className="p-2 rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low transition-colors">
                  <div className="font-bold text-on-surface">Prisma SQLite Synced</div>
                  <div className="text-[10px] text-on-surface-variant font-mono">All database models healthy</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Language Switcher Toggle Button */}
        <button
          type="button"
          onClick={toggleLanguage}
          aria-label={`Switch language. Current: ${language.toUpperCase()}`}
          className="h-8 px-2 sm:px-2.5 rounded-lg flex items-center gap-1 text-xs font-bold font-mono transition-all duration-150 border border-outline-variant/30 hover:border-primary/50 bg-surface-container-low hover:bg-surface-container text-on-surface cursor-pointer select-none shrink-0"
          title={language === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
        >
          <span className="text-[13px] sm:text-[14px]">🌐</span>
          <span className={language === 'th' ? 'text-primary font-black' : 'text-on-surface-variant/60 font-medium'}>
            TH
          </span>
          <span className="text-outline-variant/40 text-[10px]">|</span>
          <span className={language === 'en' ? 'text-primary font-black' : 'text-on-surface-variant/60 font-medium'}>
            EN
          </span>
        </button>

        {/* View Site External Link */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface text-xs font-mono transition-colors"
          title="Open live website in new tab"
        >
          <span className="material-symbols-outlined text-[16px]">visibility</span>
          <span>{t('admin.topbar.viewSite')}</span>
        </Link>

        {/* Admin Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-outline-variant/20">
          <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary/30">
            <Image
              src="/images/profile/avatar.png"
              alt="Phisit Kaewkulphisit"
              fill
              className="object-cover"
            />
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-bold text-on-surface leading-tight">Phisit Kaewkulphisit</div>
            <div className="text-[10px] text-primary font-mono font-semibold">Admin Owner</div>
          </div>
        </div>
      </div>
    </header>
  );
};
