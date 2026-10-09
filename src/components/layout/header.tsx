'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '@/components/store/cart-context';
import { useLanguage } from '@/context/language-context';

export const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { language, setLanguage, toggleLanguage, t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setActiveHash(hash);
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  interface NavLinkItem {
    label: string;
    href: string;
    path: string;
    isHash?: boolean;
  }

  const navLinks: NavLinkItem[] = [
    { label: t('nav.work'), href: '/work', path: 'work' },
    { label: t('nav.code'), href: '/code', path: 'code' },
    { label: t('nav.blog'), href: '/blog', path: 'blog' },
    { label: t('nav.aiLab'), href: '/ai-lab', path: 'ai-lab' },
    { label: t('nav.playground'), href: '/playground', path: 'playground' },
    { label: t('nav.about'), href: '/about', path: 'about' },
    { label: t('nav.contact'), href: '/contact', path: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isHash?: boolean) => {
    if (isHash && pathname === '/') {
      const targetId = href.replace('/#', '');
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
        setActiveHash(targetId);
      }
    }
  };

  if (pathname.startsWith('/admin')) return null;

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300 pointer-events-none">
      <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop pt-2 sm:pt-2.5">
        <div className="pointer-events-auto h-14 bg-surface-container-lowest/70 dark:bg-surface/70 backdrop-blur-xl backdrop-saturate-150 rounded-2xl shadow-[0_4px_24px_rgba(20,27,43,0.06)] px-3 sm:px-4 lg:px-5 flex items-center justify-between gap-2 border border-white/70 dark:border-white/10 transition-colors">
          {/* Brand Identity & Summer Projects Badge */}
          <div className="flex items-center gap-space-sm sm:gap-space-md shrink-0">
            <Link href="/" className="flex items-center gap-2 group shrink-0 min-w-0" data-path="work">
              <div className="relative h-8 w-8 sm:h-9 sm:w-9 rounded-xl overflow-hidden border border-outline-variant/40 shrink-0 bg-surface-container">
                <Image
                  src="/images/stitch-logo.png"
                  alt="PhisitCode Logo"
                  fill
                  className="object-contain p-0.5 transition-transform group-hover:scale-105"
                  priority
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-headline-sm text-sm sm:text-base text-on-surface tracking-tight leading-none font-bold truncate">
                  {t('header.name')}
                </span>
                <span className="font-label-sm text-[9px] sm:text-[10px] text-primary tracking-wider uppercase font-semibold leading-none mt-0.5 truncate">
                  {t('header.subtitle')}
                </span>
              </div>
            </Link>

            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed/70 text-on-secondary-fixed border border-secondary-fixed-dim/30 backdrop-blur-xs whitespace-nowrap shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
              <span className="font-label-sm text-[11px] font-semibold">{t('header.badge')}</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-0.5 p-1 rounded-xl bg-surface-container-low/70 dark:bg-surface-container-high/30 backdrop-blur-md border border-outline-variant/20 shrink-0"
            data-active-classes="bg-primary text-on-primary font-label-md rounded-lg"
          >
            {navLinks.map((link) => {
              const isActive = link.isHash
                ? pathname === '/' && activeHash === link.path
                : (link.href === '/' && pathname === '/') ||
                  (link.href !== '/' && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.isHash)}
                  data-path={link.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-1 transition-all duration-150 rounded-lg cursor-pointer whitespace-nowrap text-xs font-semibold ${
                    isActive
                      ? 'bg-primary text-white shadow-xs font-bold'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Controls & Profile Avatar */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Language Switcher Toggle Button */}
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={`Switch language. Current: ${language.toUpperCase()}`}
              className="h-8 px-2 sm:px-2.5 rounded-lg flex items-center gap-1 text-xs font-bold font-mono transition-all duration-150 border border-outline-variant/30 hover:border-primary/50 bg-surface-container-low/70 hover:bg-surface-container text-on-surface cursor-pointer select-none shrink-0"
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

            {/* Theme Toggle */}
            <button
              aria-label="Toggle Theme"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container/60 hover:text-on-surface transition-colors cursor-pointer shrink-0"
              type="button"
              onClick={toggleTheme}
            >
              <span className="material-symbols-outlined text-[18px]">
                {darkMode ? 'dark_mode' : 'light_mode'}
              </span>
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Shopping Cart with ${totalItems} items`}
              className="relative w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container/60 hover:text-on-surface transition-colors cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-50 duration-150">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Let's build something CTA Button */}
            <Link
              className="hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 rounded-xl bg-primary text-on-primary text-xs font-bold whitespace-nowrap shadow-hard-3 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-hard-4 active:translate-x-0 active:translate-y-0 active:shadow-hard-1 transition-all duration-150 cursor-pointer select-none shrink-0"
              data-path="contact"
              href="/contact"
            >
              {t('nav.letsBuild')}
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container/60 hover:text-on-surface transition-colors cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>

            {/* Profile Avatar */}
            <Link
              href="/about"
              aria-label="About Phisit Kaewkulphisit"
              className="hidden sm:block relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden shadow-xs ring-1 ring-white/60 dark:ring-white/20 cursor-pointer shrink-0 hover:ring-primary transition-all"
            >
              <Image
                alt="Phisit Kaewkulphisit"
                className="w-full h-full object-cover"
                src="/images/profile/avatar.png"
                fill
              />
            </Link>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto lg:hidden mt-2 bg-surface-container-lowest/90 dark:bg-surface/90 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-2xl p-3 shadow-xl animate-in slide-in-from-top-2 duration-150">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href, link.isHash);
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-2 rounded-xl bg-surface-container-low/70 text-on-surface font-label-md text-xs font-semibold flex items-center justify-between hover:bg-surface-container-high transition-colors"
                >
                  <span>{link.label}</span>
                </Link>
              ))}
              <Link
                href="/code"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl bg-surface-container-low/70 text-on-surface font-label-md text-xs font-semibold flex items-center justify-between hover:bg-surface-container-high transition-colors"
              >
                <span>{t('nav.code')}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary text-white font-mono font-bold">
                  STORE
                </span>
              </Link>
              <Link
                href="/dashboard/downloads"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl bg-primary/10 text-primary font-label-md text-xs font-bold flex items-center gap-1.5 hover:bg-primary/20 transition-colors col-span-2"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>{t('nav.downloads')}</span>
              </Link>

              {/* Mobile Language Switcher Row */}
              <div className="col-span-2 pt-2 mt-1 border-t border-outline-variant/20 flex items-center justify-between px-1">
                <span className="text-xs text-on-surface-variant font-medium flex items-center gap-1">
                  <span>🌐</span>
                  <span>{language === 'th' ? 'เลือกภาษา / Language' : 'Language / ภาษา'}:</span>
                </span>
                <div className="flex items-center gap-1 bg-surface-container p-0.5 rounded-lg border border-outline-variant/20">
                  <button
                    type="button"
                    onClick={() => setLanguage('th')}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
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
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                      language === 'en'
                        ? 'bg-primary text-white shadow-xs'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
