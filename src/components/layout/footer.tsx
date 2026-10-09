'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/language-context';

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const { t } = useLanguage();

  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className="w-full bg-surface-container-lowest dark:bg-surface/80 border-t border-outline-variant/20 mt-20 sm:mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-28 lg:pb-12 flex flex-col gap-10 sm:gap-14">
        {/* Top Brand & Bio Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-outline-variant/15">
          <div className="flex flex-col gap-3 max-w-xl">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-2xl overflow-hidden border border-outline-variant/30 shrink-0 bg-surface-container shadow-xs">
                <Image
                  src="/images/stitch-logo.png"
                  alt="PhisitCode Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-headline-sm text-lg sm:text-xl text-on-surface font-bold whitespace-nowrap">
                    {t('footer.name')}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-mono font-bold whitespace-nowrap">
                    {t('footer.badge')}
                  </span>
                </div>
                <span className="text-xs text-primary font-mono font-semibold mt-0.5">
                  {t('footer.role')}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              {t('footer.desc')}
            </p>
          </div>

          {/* Clean Status & Location Pill */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-low border border-outline-variant/20 text-on-surface">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium text-xs">{t('footer.status')}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low border border-outline-variant/20 text-on-surface-variant font-mono text-[11px]">
              <span className="material-symbols-outlined text-[15px] text-primary">location_on</span>
              <span>{t('footer.location')}</span>
            </div>
          </div>
        </div>

        {/* Links Grid: 4 Columns with Generous Spacing */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Platform */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary">
              {t('footer.col.explore')}
            </span>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm">
              <li>
                <Link href="/work" className="text-on-surface-variant hover:text-primary transition-colors">
                  {t('footer.works')}
                </Link>
              </li>
              <li>
                <Link href="/code" className="text-on-surface-variant hover:text-primary transition-colors inline-flex items-center gap-1.5">
                  <span>{t('footer.codeStore')}</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-primary-container text-on-primary-container font-mono font-bold">
                    STORE
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-on-surface-variant hover:text-primary transition-colors">
                  {t('footer.knowledgeHub')}
                </Link>
              </li>
              <li>
                <Link href="/ai-lab" className="text-on-surface-variant hover:text-primary transition-colors">
                  AI Lab
                </Link>
              </li>
              <li>
                <Link href="/playground" className="text-on-surface-variant hover:text-primary transition-colors">
                  Interactive Playground
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Profile & Services */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary">
              {t('footer.col.services')}
            </span>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm">
              <li>
                <Link href="/services" className="text-on-surface-variant hover:text-primary transition-colors">
                  {t('footer.services')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-on-surface-variant hover:text-primary transition-colors">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link href="/resume" className="text-on-surface-variant hover:text-primary transition-colors">
                  {t('footer.resume')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-on-surface-variant hover:text-primary transition-colors">
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <Link href="/documents/portfolio-phisit.pdf" target="_blank" rel="noreferrer" className="text-on-surface-variant hover:text-primary transition-colors inline-flex items-center gap-1">
                  <span>{t('footer.pdf')}</span>
                  <span className="material-symbols-outlined text-[13px]">arrow_outward</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Social & Channels */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary">
              {t('footer.col.contact')}
            </span>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm">
              <li>
                <a
                  href="https://github.com/easy-web-p"
                  target="_blank"
                  rel="noreferrer"
                  className="text-on-surface-variant hover:text-primary transition-colors inline-flex items-center gap-1.5"
                >
                  <span className="font-semibold text-primary">GitHub</span>
                  <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono">@easy-web-p</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/phisit012"
                  target="_blank"
                  rel="noreferrer"
                  className="text-on-surface-variant hover:text-primary transition-colors"
                >
                  Instagram (@phisit012)
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-on-surface-variant hover:text-primary transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="mailto:hi00000087@gmail.com"
                  className="text-on-surface-variant hover:text-primary transition-colors"
                >
                  hi00000087@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:0921975525"
                  className="text-on-surface-variant hover:text-primary transition-colors font-mono"
                >
                  092-197-5525
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Policies */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary">
              {t('footer.col.legal')}
            </span>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm">
              <li>
                <Link href="/privacy" className="text-on-surface-variant hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-on-surface-variant hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/licenses" className="text-on-surface-variant hover:text-primary transition-colors">
                  License Definitions
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-on-surface-variant hover:text-primary transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-on-surface-variant hover:text-primary transition-colors">
                  {t('footer.support')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-6 border-t border-outline-variant/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
          <p className="text-center sm:text-left leading-relaxed">
            {t('footer.copyright')}
          </p>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-on-surface hover:text-primary transition-colors cursor-pointer select-none"
          >
            <span>{t('footer.backToTop')}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
