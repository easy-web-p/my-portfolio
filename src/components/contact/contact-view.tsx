'use client';

import React from 'react';
import { ContactForm } from '@/components/forms/contact-form';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Mail, MapPin, Phone, ArrowUpRight, FileText } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export const ContactView: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="py-24 px-4 sm:px-6 max-w-6xl mx-auto w-full flex flex-col gap-16">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-outline-variant/40 pb-10">
        <Badge variant="secondary" className="self-start">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('contact.badge')}</span>
        </Badge>
        <h1 className="font-display font-black text-4xl sm:text-5xl text-on-surface tracking-tight">
          {t('contact.title')}
        </h1>
        <p className="text-on-surface-variant text-base sm:text-lg max-w-2xl leading-relaxed">
          {t('contact.subtitle')}
        </p>
      </div>

      {/* Grid: Details on Left, Form on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Col: Contact Information */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="flex flex-col gap-6 p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/50 shadow-ambient">
            <h3 className="font-display font-bold text-lg text-on-surface">
              {t('contact.directTitle')}
            </h3>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-on-surface-variant font-medium">
                  {t('contact.emailLabel')}
                </span>
                <a
                  href="mailto:hi00000087@gmail.com"
                  className="font-display font-bold text-sm text-on-surface hover:text-primary transition-colors"
                >
                  hi00000087@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-on-surface-variant font-medium">
                  {t('contact.phoneLabel')}
                </span>
                <a
                  href="tel:0921975525"
                  className="font-display font-bold text-sm text-on-surface hover:text-primary transition-colors"
                >
                  092-197-5525
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-on-surface-variant font-medium">
                  {t('contact.locationLabel')}
                </span>
                <span className="font-display font-bold text-sm text-on-surface">
                  {t('contact.locationValue')}
                </span>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/50 flex flex-col gap-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-on-surface-variant">
              {t('contact.socialTitle')}
            </h4>
            <div className="flex flex-col gap-2 text-sm font-display font-semibold">
              <a
                href="https://instagram.com/phisit012"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                <span>Instagram // @phisit012</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                <span>Facebook // Phisit kaewkulphisit</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="/documents/portfolio-phisit.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest hover:bg-primary hover:text-white transition-all shadow-sm text-primary"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>
                    {language === 'th'
                      ? 'ดาวน์โหลดเล่มพอร์ตโฟลิโอ (PDF)'
                      : 'Download PDF Portfolio'}
                  </span>
                </span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Col: Contact Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};
