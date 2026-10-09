import React from 'react';
import { Quote, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote:
        'พิสิษฐ์มีความกระตือรือร้นในการเรียนรู้สูงมาก สามารถเชื่อมโยงเทคโนโลยี AI และเว็บแอปพลิเคชันเข้าด้วยกันได้อย่างสร้างสรรค์ พร้อมทั้งมีจิตสาธารณะและการทำงานเป็นทีมที่ยอดเยี่ยม',
      author: 'Dr. Sarah Chen',
      role: 'VP of AI Product',
      company: 'Synthetix Systems',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
    {
      quote:
        'Rarely do you find a technologist who writes robust production TypeScript while simultaneously having the visual taste and interaction nuance of a senior art director.',
      author: 'Kenji Sato',
      role: 'Design Director',
      company: 'Kinetic Labs Tokyo',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full flex flex-col gap-10">
      <div className="flex flex-col items-center text-center gap-3">
        <Badge variant="secondary">
          <Star className="w-3.5 h-3.5" />
          <span>Endorsements &amp; Words</span>
        </Badge>
        <h2 className="font-display font-black text-3xl sm:text-4xl text-on-surface tracking-tight">
          What Collaborators Say
        </h2>
        <p className="text-on-surface-variant text-sm sm:text-base max-w-lg">
          Feedback from startup founders, VP of AI engineering, and design studio leads.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/50 shadow-ambient flex flex-col justify-between gap-6 relative"
          >
            <Quote className="w-10 h-10 text-primary-container opacity-40 absolute top-6 right-6" />
            <p className="font-sans text-on-surface text-base sm:text-lg leading-relaxed italic relative z-10">
              &ldquo;{t.quote}&rdquo;
            </p>

            <div className="flex items-center gap-4 pt-4 border-t border-outline-variant/30">
              <img
                src={t.avatar}
                alt={t.author}
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-primary-fixed"
              />
              <div>
                <h4 className="font-display font-bold text-sm text-on-surface">
                  {t.author}
                </h4>
                <p className="text-xs text-on-surface-variant">
                  {t.role} • <span className="font-semibold text-primary">{t.company}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
