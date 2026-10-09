'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { ProjectMeta } from '@/types/project';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/language-context';

interface WorkViewProps {
  projects: ProjectMeta[];
}

export const WorkView: React.FC<WorkViewProps> = ({ projects }) => {
  const { t, language } = useLanguage();

  const githubRepos = [
    {
      name: 'Queue-up',
      url: 'https://github.com/easy-web-p/Queue-up',
      descriptionTh: 'เว็บแอปพลิเคชันระบบบริหารจัดการคิวและคิวอัตโนมัติ พร้อมระบบแจ้งเตือนเสียง (Voice/Audio Notification)',
      descriptionEn: 'Queue management web application with automated queue ticket dispensing and voice/audio notifications.',
      language: 'JavaScript / React',
      badgeTh: 'เว็บแอปใช้งานจริง',
      badgeEn: 'Active Web App',
    },
    {
      name: 'KidGrowth_Calculator',
      url: 'https://github.com/easy-web-p/KidGrowth_Calculator',
      descriptionTh: 'เครื่องมือคำนวณและประเมินเกณฑ์การเจริญเติบโตของเด็กตามมาตรฐานสาธารณสุข (BMI & Growth Metrics)',
      descriptionEn: 'Child growth assessment & health calculator based on public health standards (BMI & percentile metrics).',
      language: 'JavaScript',
      badgeTh: 'Health Tech',
      badgeEn: 'Health Tech',
    },
    {
      name: 'Header-Dynamic-Navigation',
      url: 'https://github.com/easy-web-p/Header-Dynamic-Navigation',
      descriptionTh: 'คอมโพเนนต์แถบเมนูนำทางแบบไดนามิก รองรับการเปลี่ยนสถานะและการเลื่อนหน้าอย่างนุ่มนวล',
      descriptionEn: 'Dynamic navigation header component with smooth state transitions, reactive scroll, and responsive layout.',
      language: 'HTML / CSS / JS',
      badgeTh: 'UI คอมโพเนนต์',
      badgeEn: 'UI Component',
    },
    {
      name: '01Q / -QueueUp01',
      url: 'https://github.com/easy-web-p/01Q',
      descriptionTh: 'ส่วนขยายระบบคิวและโมดูลการเชื่อมต่อระบบจัดการแถวคิวอัตโนมัติสำหรับธุรกิจบริการ',
      descriptionEn: 'Queue extension and API connector module for service hospitality and automated queue management.',
      language: 'JavaScript',
      badgeTh: 'ต้นแบบระบบ',
      badgeEn: 'Prototype',
    },
    {
      name: 'kaset-insert-ai',
      url: 'https://github.com/easy-web-p',
      descriptionTh: 'ระบบ AI วิเคราะห์และแนะนำสัดส่วนปุ๋ยเคมี-อินทรีย์ตามช่วงการเติบโตของข้าว (ชนะเลิศเหรียญทอง ศิลปหัตถกรรม 71)',
      descriptionEn: 'AI crop nutrition optimizer and N-P-K recommendation engine for rice agriculture (Gold Medal, 71st Arts & Crafts).',
      language: 'Python / Flask',
      badgeTh: 'AI & เกษตรอัจฉริยะ',
      badgeEn: 'AI & Smart Agri',
    },
    {
      name: 'lomsak-barber-map',
      url: 'https://github.com/easy-web-p',
      descriptionTh: 'ระบบเว็บแผนที่ออนไลน์รวบรวมพิกัดร้านตัดผมตำบลหล่มสักด้วย Google Maps API และ Web GIS',
      descriptionEn: 'Interactive Web GIS spatial directory for local barbershops in Lom Sak via Google Maps API & geolocation queries.',
      language: 'TypeScript / GIS',
      badgeTh: 'Web GIS',
      badgeEn: 'Web GIS',
    },
  ];

  return (
    <div className="py-24 px-4 sm:px-6 max-w-6xl mx-auto w-full flex flex-col gap-12">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-outline-variant/40 pb-10">
        <Badge variant="secondary" className="self-start">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('work.badge')}</span>
        </Badge>
        <h1 className="font-display font-black text-4xl sm:text-5xl text-on-surface tracking-tight">
          {t('work.title')}
        </h1>
        <p className="text-on-surface-variant text-base sm:text-lg max-w-2xl leading-relaxed">
          {t('work.subtitle')}
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group relative bg-surface-container-lowest rounded-3xl border border-outline-variant/40 overflow-hidden shadow-ambient hover:shadow-[0_24px_48px_-12px_rgba(107,56,212,0.18)] hover:border-primary/50 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative w-full h-64 sm:h-72 bg-surface-container-low overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="primary" className="shadow-sm">
                  {project.category}
                </Badge>
                <span className="px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-[11px] font-display font-bold text-on-surface">
                  {project.year}
                </span>
              </div>
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            <div className="p-6 flex flex-col gap-3">
              <h3 className="font-display font-black text-2xl text-on-surface tracking-tight group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-on-surface-variant text-sm line-clamp-2 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-outline-variant/30">
                {project.technologies.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-lg bg-surface-container text-on-surface-variant font-display text-[11px] font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Live GitHub Repositories Section */}
      <div className="flex flex-col gap-6 pt-10 border-t border-outline-variant/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider">
                {t('work.githubBadge')}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-bold">
                @easy-web-p
              </span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-on-surface">
              {t('work.githubTitle')}
            </h2>
          </div>
          <a
            href="https://github.com/easy-web-p"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline font-mono"
          >
            <span>{t('work.githubViewAll')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {githubRepos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                    {language === 'th' ? repo.badgeTh : repo.badgeEn}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-mono font-bold text-base text-on-surface group-hover:text-primary transition-colors">
                  {repo.name}
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {language === 'th' ? repo.descriptionTh : repo.descriptionEn}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20 text-[11px] font-mono text-on-surface-variant">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                  {repo.language}
                </span>
                <span className="text-primary font-bold">easy-web-p ↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
