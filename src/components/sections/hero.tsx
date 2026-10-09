'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, Sparkles, Send, Dices } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/language-context';

const skillIdeas = [
  'Spatial soundscapes modulated by realtime hand gestures on low-power web shaders.',
  'Generative vector icon synthesizer with live weight interpolation sliders.',
  'Local Small Language Model prompt tutor running entirely in browser WebAssembly.',
  'Haptic feedback palette generator for neurodivergent accessibility workflows.',
  'Physics-driven node canvas turning multi-modal embeddings into tangible toys.',
];

export const Hero: React.FC = () => {
  const { language, t } = useLanguage();
  const [currentIdeaIndex, setCurrentIdeaIndex] = useState(0);

  const rollNewIdea = () => {
    setCurrentIdeaIndex((prev) => (prev + 1) % skillIdeas.length);
  };

  return (
    <section className="pt-28 pb-16 px-4 sm:px-6 max-w-6xl mx-auto w-full flex flex-col gap-10">
      {/* Top badges row */}
      <div className="flex flex-wrap items-center gap-2.5">
        <Badge variant="neutral" className="py-1.5 px-4 text-xs shadow-sm">
          <span className="text-base">👋</span>
          <span className="font-bold">{t('hero.badge.hello')}</span>
        </Badge>
        <Badge variant="primary" className="py-1.5 px-4 text-xs shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="uppercase tracking-wider">{t('hero.badge.role')}</span>
        </Badge>
        <Badge variant="tactile" className="py-1.5 px-3 text-[11px] rotate-1">
          <span>{t('hero.badge.award')}</span>
        </Badge>
      </div>

      {/* Main Headline & Bio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 flex flex-col gap-5">
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-on-surface tracking-tight leading-[1.1]">
            {language === 'th' ? (
              <>
                มุ่งมั่นสร้างสรรค์นวัตกรรมดิจิทัล &amp;{' '}
                <span className="inline-block text-primary underline decoration-secondary-container decoration-8 underline-offset-6">
                  เทคโนโลยี AI เพื่อสังคม
                </span>
              </>
            ) : (
              <>
                Crafting Digital Innovations &amp;{' '}
                <span className="inline-block text-primary underline decoration-secondary-container decoration-8 underline-offset-6">
                  AI Technologies for Society
                </span>
              </>
            )}
          </h1>
          <p className="text-on-surface-variant text-base sm:text-lg max-w-2xl leading-relaxed">
            {t('hero.bio.short')}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="#work"
              className="inline-flex items-center gap-2 px-7 h-13 rounded-full bg-[#111827] text-white font-display font-bold text-sm shadow-[3px_3px_0px_#8455ef] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#8455ef] active:translate-x-[2px] active:translate-y-[2px] transition-all"
            >
              <span>{t('hero.cta.works')}</span>
              <ArrowDown className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 h-13 rounded-full bg-secondary-container text-on-secondary-container font-display font-bold text-sm shadow-[3px_3px_0px_#1a1c1a] border border-[#1a1c1a] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1a1c1a] active:translate-x-[2px] active:translate-y-[2px] transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{t('hero.cta.contact')}</span>
            </Link>
          </div>
        </div>

        {/* Profile Avatar Card */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl p-3 bg-surface-container-lowest border-2 border-[#1a1c1a] shadow-[6px_6px_0px_#1a1c1a] rotate-1 group">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-primary-container">
              <Image
                src="/images/profile/avatar.png"
                alt="Phisit Kaewkulphisit"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
            <div className="absolute -bottom-3 -left-3 px-3 py-1.5 rounded-xl bg-secondary-fixed text-on-secondary-fixed font-display font-black text-xs shadow-[2px_2px_0px_#1a1c1a] border border-[#1a1c1a] -rotate-3">
              ✦ Personal Studio &amp; Code Base
            </div>
            <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-surface-container-lowest text-primary font-display font-bold text-xs shadow-[2px_2px_0px_#1a1c1a] border border-[#1a1c1a] rotate-2">
              📍 ขอนแก่น / เพชรบูรณ์
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Micro-Lab Widget */}
      <div className="w-full rounded-3xl bg-surface-container-lowest border border-outline-variant/50 p-6 shadow-[0_16px_36px_-12px_rgba(107,56,212,0.12)] flex flex-col gap-4 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-outline-variant/30 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-secondary animate-ping"></span>
            <span className="font-display font-bold text-xs text-primary uppercase tracking-wider">
              LIVE SYNTHESIS LAB // TOY 01
            </span>
          </div>
          <span className="text-xs text-on-surface-variant font-medium">
            Random Creative Idea Engine
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-surface-container/60 border border-outline-variant/30">
          <p className="font-sans text-sm sm:text-base text-on-surface font-medium italic flex-1">
            &ldquo;{skillIdeas[currentIdeaIndex]}&rdquo;
          </p>
          <button
            onClick={rollNewIdea}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white font-display font-bold text-xs shadow-tactile-sm border border-[#1a1c1a] hover:bg-primary-container active:translate-y-[1px] transition-all shrink-0 cursor-pointer"
          >
            <Dices className="w-4 h-4" />
            <span>Shuffle Idea</span>
          </button>
        </div>
      </div>
    </section>
  );
};
