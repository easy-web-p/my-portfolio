'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How do I receive my purchased digital code?',
    answer: 'Stripe must first confirm the payment through a signed webhook. The protected download link then appears on the order confirmation page in the same browser; a browser redirect alone cannot unlock a code package.',
    category: 'Purchases'
  },
  {
    question: 'What is the difference between Personal and Commercial licenses?',
    answer: 'Personal licenses are for solo learning, hobby projects, or personal portfolios. Commercial licenses permit unlimited client deliverables, monetized SaaS platforms, and white-label client applications.',
    category: 'Licenses'
  },
  {
    question: 'Are future product updates included?',
    answer: 'Yes! All commercial purchases include 12 months of free version updates (e.g., Next.js migrations and new model integrations). The entitlement is attached only after payment verification.',
    category: 'Updates'
  },
  {
    question: 'What happens if I exhaust my 5 download allowances?',
    answer: 'Each protected download has an allowance of 5 downloads to prevent automated crawler abuse. If a link expires or you need help with an exhausted allowance, contact support with your payment receipt.',
    category: 'Downloads'
  },
  {
    question: 'Can I request custom AI consulting or tailored engineering?',
    answer: 'สามารถติดต่อ พิสิษฐ์ แก้วกุลพิสิฐ ได้สำหรับการร่วมงานพัฒนาโครงงาน AI, เว็บแอปพลิเคชัน และงานวิจัย โดยสามารถส่งข้อความผ่านหน้า ติดต่อ (Contact) ได้เลยครับ',
    category: 'Studio Services'
  }
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-full bg-background min-h-screen py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-primary font-bold">Frequently Asked Questions</span>
        </div>

        <div className="mb-10">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            Knowledge Base
          </span>
          <h1 className="font-headline-lg text-3xl sm:text-4xl font-bold tracking-tight text-on-surface mt-3">
            Common Questions & Answers
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-on-surface-variant">
            Everything you need to know about our digital templates, licenses, and download vault.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-surface-container-lowest dark:bg-surface rounded-2xl border border-outline-variant/20 overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-surface-container-low/40 transition-colors"
                >
                  <span className="font-bold text-sm text-on-surface">{faq.question}</span>
                  <span className="material-symbols-outlined text-primary text-[20px] shrink-0 transition-transform duration-200">
                    {isOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-surface-container pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-6 rounded-3xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/20 text-center">
          <h3 className="font-bold text-sm text-on-surface">Still have questions?</h3>
          <p className="text-xs text-on-surface-variant mt-1">
            Our team is always happy to guide you on selecting the right architecture or license.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <Link
              href="/contact"
              className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary/90 transition-all"
            >
              Contact Studio
            </Link>
            <Link
              href="/support"
              className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-all"
            >
              Get Product Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
