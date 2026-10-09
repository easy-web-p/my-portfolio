import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjects } from '@/lib/projects';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Code2, CheckCircle2, Layers } from 'lucide-react';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.title} // Case Study`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="py-24 px-4 sm:px-6 max-w-5xl mx-auto w-full flex flex-col gap-12">
      {/* Back Navigation */}
      <div>
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-display font-bold text-on-surface-variant hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Work</span>
        </Link>
      </div>

      {/* Case Study Header */}
      <div className="flex flex-col gap-6 border-b border-outline-variant/40 pb-10">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">{project.category}</Badge>
          <Badge variant="neutral">{project.year}</Badge>
          <Badge variant="tactile">{project.role}</Badge>
        </div>

        <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-on-surface tracking-tight leading-tight">
          {project.title}
        </h1>

        <p className="text-on-surface-variant text-base sm:text-xl leading-relaxed max-w-3xl">
          {project.description}
        </p>

        {/* Project Links */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full bg-[#111827] text-white font-display font-bold text-xs shadow-tactile flex items-center gap-2 hover:bg-primary transition-all"
            >
              <span>Live Demonstration</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full bg-surface-container-lowest border border-outline-variant text-on-surface font-display font-bold text-xs shadow-sm flex items-center gap-2 hover:border-primary hover:text-primary transition-all"
            >
              <Code2 className="w-4 h-4" />
              <span>Source Repository</span>
            </a>
          )}
        </div>
      </div>

      {/* Hero Showcase Image */}
      <div className="relative w-full h-80 sm:h-[480px] rounded-3xl overflow-hidden border-2 border-[#1a1c1a] shadow-tactile-lg bg-surface-container-low">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Metrics Row (if available) */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {project.metrics.map((m, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-ambient flex flex-col gap-1 text-center"
            >
              <span className="font-display font-black text-3xl sm:text-4xl text-primary">
                {m.value}
              </span>
              <span className="text-xs text-on-surface-variant font-medium">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Structured Problem & Solution Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {project.problem && (
          <div className="p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm flex flex-col gap-3">
            <span className="font-display font-bold text-xs uppercase tracking-wider text-red-600">
              The Problem
            </span>
            <h3 className="font-display font-bold text-xl text-on-surface">
              Friction in the Existing Paradigm
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {project.problem}
            </p>
          </div>
        )}

        {project.solution && (
          <div className="p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm flex flex-col gap-3">
            <span className="font-display font-bold text-xs uppercase tracking-wider text-emerald-600">
              The Solution
            </span>
            <h3 className="font-display font-bold text-xl text-on-surface">
              Tactile Engineering Approach
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {project.solution}
            </p>
          </div>
        )}
      </div>

      {/* Key Results */}
      {project.results && project.results.length > 0 && (
        <div className="p-8 rounded-3xl bg-surface-container-low border border-outline-variant/50 flex flex-col gap-4">
          <h3 className="font-display font-bold text-lg text-on-surface">
            Measurable Outcomes &amp; Impact
          </h3>
          <ul className="flex flex-col gap-2.5">
            {project.results.map((res, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-on-surface">
                <CheckCircle2 className="w-5 h-5 text-secondary-fixed shrink-0 mt-0.5" />
                <span>{res}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tech Stack Pills */}
      <div className="flex flex-col gap-3 pt-6 border-t border-outline-variant/30">
        <h4 className="font-display font-bold text-xs uppercase tracking-wider text-on-surface-variant">
          Technologies Employed
        </h4>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="px-3.5 py-1.5 rounded-full bg-surface-container font-display text-xs font-bold text-on-surface"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-outline-variant/40">
        <Link
          href="/work"
          className="text-xs font-display font-bold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-full bg-[#111827] text-white font-display font-bold text-xs shadow-tactile hover:bg-primary transition-all"
        >
          Discuss a Similar Build
        </Link>
      </div>
    </article>
  );
}
