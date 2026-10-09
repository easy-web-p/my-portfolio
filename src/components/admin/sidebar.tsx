'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/language-context';

interface NavItem {
  label: string;
  href: string;
  icon: string;
  exact?: boolean;
  badge?: string;
  external?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}

export const AdminSidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const pathname = usePathname();
  const { language, setLanguage, toggleLanguage, t } = useLanguage();

  const navGroups: NavGroup[] = [
    {
      title: t('admin.group.core'),
      items: [
        { label: t('admin.nav.dashboard'), href: '/admin', icon: 'dashboard', exact: true },
        { label: t('admin.nav.analytics'), href: '/admin/analytics', icon: 'insights' },
      ],
    },
    {
      title: t('admin.group.store'),
      items: [
        { label: t('admin.nav.products'), href: '/admin/products', icon: 'inventory_2' },
        { label: t('admin.nav.orders'), href: '/admin/orders', icon: 'receipt_long', badge: `3 ${t('admin.nav.badge.new')}` },
        { label: t('admin.nav.customers'), href: '/admin/customers', icon: 'group' },
        { label: t('admin.nav.downloads'), href: '/admin/downloads', icon: 'key' },
        { label: t('admin.nav.licenses'), href: '/admin/licenses', icon: 'verified' },
        { label: t('admin.nav.coupons'), href: '/admin/coupons', icon: 'loyalty' },
        { label: t('admin.nav.reviews'), href: '/admin/reviews', icon: 'star' },
      ],
    },
    {
      title: t('admin.group.editorial'),
      items: [
        { label: t('admin.nav.posts'), href: '/admin/posts', icon: 'article', badge: `2 ${t('admin.nav.badge.drafts')}` },
        { label: t('admin.nav.projects'), href: '/admin/projects', icon: 'folder_special' },
        { label: t('admin.nav.experiments'), href: '/admin/experiments', icon: 'science' },
        { label: t('admin.nav.newsletter'), href: '/admin/newsletter', icon: 'campaign' },
        { label: t('admin.nav.media'), href: '/admin/media', icon: 'photo_library' },
      ],
    },
    {
      title: t('admin.group.system'),
      items: [
        { label: t('admin.nav.settings'), href: '/admin/settings', icon: 'tune' },
        { label: t('admin.nav.team'), href: '/admin/team', icon: 'admin_panel_settings' },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-surface-container-lowest border-r border-outline-variant/20 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-18' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-outline-variant/15 shrink-0">
        <Link href="/admin" className="flex items-center gap-2.5 min-w-0 overflow-hidden">
          <div className="relative w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
            <span className="material-symbols-outlined text-primary text-[20px]">terminal</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0 animate-in fade-in duration-200">
              <span className="font-headline-sm text-xs font-bold uppercase tracking-wider text-on-surface truncate">
                {t('admin.title')}
              </span>
              <span className="text-[10px] font-mono text-primary font-semibold truncate">
                {t('admin.subtitle')}
              </span>
            </div>
          )}
        </Link>

        {/* Collapse toggle button */}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="w-8 h-8 rounded-lg hover:bg-surface-container-low text-on-surface-variant hover:text-primary flex items-center justify-center transition-colors cursor-pointer"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          <span className="material-symbols-outlined text-[18px]">
            {collapsed ? 'chevron_right' : 'chevron_left'}
          </span>
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-6 scrollbar-none">
        {navGroups.map((group) => (
          <div key={group.title} className="space-y-1">
            {!collapsed && (
              <div className="px-3 text-[10px] font-mono font-bold tracking-wider text-outline uppercase truncate">
                {group.title}
              </div>
            )}
            {group.items.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-label-badge transition-all cursor-pointer select-none ${
                    isActive
                      ? 'bg-primary text-on-primary font-bold shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                  } ${collapsed ? 'justify-center' : 'justify-between'}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="material-symbols-outlined text-[20px] shrink-0">{item.icon}</span>
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </div>

                  {!collapsed && item.badge && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.2 rounded-full font-bold shrink-0 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-primary-container text-on-primary-container'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer Info & Quick Language Switcher */}
      <div className="p-3 border-t border-outline-variant/15 shrink-0 bg-surface-container-low/40 space-y-2">
        {!collapsed ? (
          <>
            <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant px-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span>{t('admin.status.live')}</span>
              </div>
              <span className="text-outline">628 DLs</span>
            </div>
            {/* Quick Lang Switcher inside sidebar */}
            <div className="pt-2 border-t border-outline-variant/15 flex items-center justify-between px-1">
              <span className="text-[11px] text-on-surface-variant font-medium flex items-center gap-1">
                <span>🌐</span>
                <span>{language === 'th' ? 'ภาษา' : 'Lang'}:</span>
              </span>
              <div className="flex items-center gap-1 bg-surface-container p-0.5 rounded-lg border border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setLanguage('th')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                    language === 'th'
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  ไทย
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                    language === 'en'
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" title={t('admin.status.live')} />
            <button
              type="button"
              onClick={toggleLanguage}
              title={`Switch language (Current: ${language.toUpperCase()})`}
              className="text-[11px] font-mono font-bold text-primary p-1 rounded hover:bg-surface-container transition-colors"
            >
              {language.toUpperCase()}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
