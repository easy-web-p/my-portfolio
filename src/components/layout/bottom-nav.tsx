'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/language-context';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [activeHash, setActiveHash] = useState('work');

  const navItems = [
    { id: 'work', label: t('nav.work'), icon: 'auto_awesome', href: '/work', isRoute: true },
    { id: 'code', label: t('nav.code'), icon: 'terminal', href: '/code', isRoute: true },
    { id: 'blog', label: t('nav.blog'), icon: 'article', href: '/blog', isRoute: true },
    { id: 'about', label: t('nav.about'), icon: 'person', href: '/about', isRoute: true },
    { id: 'contact', label: t('nav.contact'), icon: 'chat', href: '/contact', isRoute: true },
    { id: 'ai-lab', label: t('nav.aiLab'), icon: 'science', href: '/#ai-lab', isRoute: false },
  ];

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveHash(hash);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (pathname === '/') {
      setActiveHash(id);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', `#${id}`);
      }
    }
  };

  if (pathname.startsWith('/admin')) return null;

  return (
    <nav
      className="lg:hidden fixed bottom-0 w-full z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_16px_rgba(107,56,212,0.08)] border-t border-outline-variant/20"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="flex justify-around items-center h-16 max-w-screen-md mx-auto px-1">
        {navItems.map((item) => {
          const isActive = item.isRoute
            ? pathname.startsWith(item.href)
            : pathname === '/' && activeHash === item.id;

          if (item.isRoute) {
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-0.5 w-12 sm:w-14 h-12 rounded-full transition-all cursor-pointer active:scale-90 touch-manipulation select-none ${
                  isActive
                    ? 'text-primary font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span className="font-label-badge text-[10px] tracking-tight">{item.label}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={(e) => handleHashClick(e, item.id)}
              className={`flex flex-col items-center justify-center gap-0.5 w-12 sm:w-14 h-12 rounded-full transition-all cursor-pointer active:scale-90 touch-manipulation select-none ${
                isActive
                  ? 'text-primary font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="font-label-badge text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

