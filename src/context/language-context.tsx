'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language, TranslationKey, translations } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'playful_portfolio_lang';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('th');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (savedLang === 'th' || savedLang === 'en') {
        setLanguageState(savedLang);
        document.documentElement.lang = savedLang;
      } else {
        document.documentElement.lang = 'th';
      }
    } catch {
      // Fallback in environments without localStorage
    }
    setIsHydrated(true);
  }, []);

  const setLanguage = useCallback((newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
      document.documentElement.lang = newLang;
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const nextLang: Language = prev === 'th' ? 'en' : 'th';
      try {
        localStorage.setItem(STORAGE_KEY, nextLang);
        document.documentElement.lang = nextLang;
      } catch {
        // Ignore localStorage errors
      }
      return nextLang;
    });
  }, []);

  const t = useCallback(
    (key: TranslationKey, fallback?: string): string => {
      const dict = translations[language];
      if (dict && key in dict) {
        return dict[key];
      }
      // Fallback to Thai or provided fallback
      const thDict = translations.th;
      if (thDict && key in thDict) {
        return thDict[key];
      }
      return fallback || key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback safe context if used outside provider during SSR/testing
    return {
      language: 'th',
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: (key: TranslationKey, fallback?: string) => translations.th[key] || fallback || key,
    };
  }
  return context;
};
