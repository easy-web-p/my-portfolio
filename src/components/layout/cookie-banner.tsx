'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem('playful_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('playful_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('playful_cookie_consent', 'essential_only');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 animate-in slide-in-from-bottom-5 duration-300 pointer-events-auto">
      <div className="bg-surface-container-lowest/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/70 dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-xl text-on-surface">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-primary text-[24px] shrink-0 mt-0.5">cookie</span>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">
              {language === 'th' ? 'ความเป็นส่วนตัว & การตั้งค่า' : 'Privacy & Tactile Preferences'}
            </h4>
            <p className="mt-1 text-xs text-on-surface-variant leading-relaxed">
              {language === 'th' ? (
                <>
                  เว็บไซต์นี้ใช้ Local Storage เพื่อจดจำธีมและการตั้งค่าภาษา โดยไม่มีการขายหรือติดตามข้อมูลส่วนบุคคลของคุณ{' '}
                  <Link href="/privacy" className="text-primary font-semibold hover:underline">
                    อ่านนโยบายความเป็นส่วนตัว
                  </Link>.
                </>
              ) : (
                <>
                  We use minimal local storage to remember your theme and language preferences without selling or tracking your personal data.{' '}
                  <Link href="/privacy" className="text-primary font-semibold hover:underline">
                    Read Privacy Policy
                  </Link>.
                </>
              )}
            </p>

            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={handleAccept}
                className="px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary/90 transition-colors cursor-pointer"
              >
                {language === 'th' ? 'ยอมรับทั้งหมด' : 'Accept All'}
              </button>
              <button
                onClick={handleDecline}
                className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant text-xs font-medium transition-colors cursor-pointer"
              >
                {language === 'th' ? 'จำเป็นเท่านั้น' : 'Essential Only'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
