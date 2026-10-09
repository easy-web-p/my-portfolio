import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getExperimentBySlug, getAllExperiments } from '@/lib/experiments';
import { getBlogPostBySlug } from '@/lib/blog';
import { getStoreProductBySlug } from '@/lib/store';

export function generateStaticParams() {
  const experiments = getAllExperiments();
  return experiments.map((exp) => ({ slug: exp.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ExperimentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const experiment = getExperimentBySlug(slug);

  if (!experiment) {
    notFound();
  }

  const relatedArticle = experiment.relatedArticleSlug ? getBlogPostBySlug(experiment.relatedArticleSlug) : null;
  const relatedProduct = experiment.relatedProductSlug ? getStoreProductBySlug(experiment.relatedProductSlug) : null;

  return (
    <article className="w-full bg-background min-h-screen py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-6">
          <Link href="/ai-lab" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>AI Lab</span>
          </Link>
          <span>/</span>
          <span className="text-primary truncate">{experiment.title}</span>
        </div>

        {/* Experiment Hero Header */}
        <div className={`rounded-3xl bg-gradient-to-r ${experiment.coverGradient} p-6 sm:p-10 text-white relative overflow-hidden mb-10 shadow-lg`}>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
          
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider border border-white/20">
                {experiment.topic}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-wider uppercase border border-white/30">
                ✦ {experiment.status}
              </span>
              <span className="text-xs font-mono text-white/80">{experiment.date}</span>
            </div>

            <h1 className="font-headline-lg text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {experiment.title}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-white/90 leading-relaxed font-light">
              {experiment.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-white/20">
              {experiment.demoUrl && (
                <Link
                  href={experiment.demoUrl}
                  className="px-4 py-2 rounded-xl bg-white text-on-surface text-xs font-bold shadow-md hover:bg-white/90 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">play_circle</span>
                  <span>Launch Interactive Demo</span>
                </Link>
              )}
              {experiment.githubUrl && (
                <a
                  href={experiment.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md text-white hover:bg-white/30 text-xs font-bold border border-white/30 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">code</span>
                  <span>View Source Code</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Core Research Question & Objective */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="p-6 rounded-2xl bg-surface-container-lowest dark:bg-surface border border-primary/30 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[18px]">psychology</span>
              <span>Research Question</span>
            </div>
            <p className="text-base text-on-surface font-semibold italic leading-relaxed">
              &ldquo;{experiment.researchQuestion}&rdquo;
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/20 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[18px]">flag</span>
              <span>Experiment Objective</span>
            </div>
            <p className="text-sm text-on-surface leading-relaxed">
              {experiment.objective}
            </p>
          </div>
        </div>

        {/* Technical Architecture Breakdown */}
        <div className="bg-surface-container-lowest dark:bg-surface rounded-2xl p-6 sm:p-8 border border-outline-variant/20 shadow-xs mb-10">
          <h2 className="font-headline-sm text-xl font-bold text-on-surface tracking-tight mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">memory</span>
            <span>Methodology & Technical Architecture</span>
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface-container-low dark:bg-surface-container-highest/20 border border-outline-variant/15">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Dataset / Telemetry Source</span>
                <p className="mt-1 text-xs sm:text-sm font-medium text-on-surface">{experiment.dataset}</p>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-low dark:bg-surface-container-highest/20 border border-outline-variant/15">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Model / Pipeline Weights</span>
                <p className="mt-1 text-xs sm:text-sm font-medium text-on-surface">{experiment.model}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Methodological Approach</h3>
              <p className="text-sm text-on-surface leading-relaxed bg-surface-container-low/50 dark:bg-surface-container-high/10 p-4 rounded-xl border border-outline-variant/15">
                {experiment.methodology}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Runtime Implementation</h3>
              <p className="text-sm text-on-surface leading-relaxed bg-surface-container-low/50 dark:bg-surface-container-high/10 p-4 rounded-xl border border-outline-variant/15 font-mono text-xs text-primary">
                {experiment.implementation}
              </p>
            </div>
          </div>
        </div>

        {/* Empirical Results */}
        <div className="bg-surface-container-lowest dark:bg-surface rounded-2xl p-6 sm:p-8 border border-outline-variant/20 shadow-xs mb-10">
          <h2 className="font-headline-sm text-xl font-bold text-on-surface tracking-tight mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">analytics</span>
            <span>Empirical Results & Benchmarks</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {experiment.results.map((res, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-surface-container-low/80 dark:bg-surface-container-highest/30 border border-outline-variant/20 text-center">
                <div className="font-mono text-2xl font-bold text-primary">{res.value}</div>
                <div className="text-xs font-bold text-on-surface mt-1">{res.metric}</div>
                <div className="text-[11px] text-on-surface-variant mt-1 leading-normal">{res.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Limitations & Responsible AI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-surface-container-lowest dark:bg-surface rounded-2xl p-6 border border-outline-variant/20 shadow-xs">
            <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider mb-3 flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
              <span className="material-symbols-outlined text-[18px]">warning</span>
              <span>Known Limitations & Edge Cases</span>
            </h3>
            <ul className="space-y-2">
              {experiment.limitations.map((lim, i) => (
                <li key={i} className="text-xs text-on-surface-variant flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{lim}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface-container-lowest dark:bg-surface rounded-2xl p-6 border border-outline-variant/20 shadow-xs">
            <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider mb-3 flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span>Responsible AI & Ethics</span>
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {experiment.responsibleAI}
            </p>
          </div>
        </div>

        {/* Lessons Learned */}
        <div className="bg-surface-container-lowest dark:bg-surface rounded-2xl p-6 sm:p-8 border border-outline-variant/20 shadow-xs mb-10">
          <h2 className="font-headline-sm text-lg font-bold text-on-surface tracking-tight mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">lightbulb</span>
            <span>Key Takeaways & Lessons Learned</span>
          </h2>
          <div className="space-y-3">
            {experiment.lessonsLearned.map((lesson, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-surface-container-low dark:bg-surface-container-high/20 border border-outline-variant/15 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-on-surface font-medium leading-relaxed">
                  {lesson}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Connected Artifacts: Related Article & Related Product */}
        {(relatedArticle || relatedProduct) && (
          <div className="bg-primary/5 rounded-3xl p-6 sm:p-8 border border-primary/20 mb-10">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">link</span>
              <span>Connected Ecosystem Artifacts</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticle && (
                <Link
                  href={`/blog/${relatedArticle.slug}`}
                  className="p-4 rounded-xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/20 hover:border-primary/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Tutorial & Deep Dive</span>
                    <h4 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors mt-1">
                      {relatedArticle.title}
                    </h4>
                    <p className="text-xs text-on-surface-variant line-clamp-2 mt-1">{relatedArticle.description}</p>
                  </div>
                  <div className="mt-3 text-xs font-bold text-primary flex items-center gap-1">
                    <span>Read Article</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </div>
                </Link>
              )}

              {relatedProduct && (
                <Link
                  href={`/code/${relatedProduct.slug}`}
                  className="p-4 rounded-xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/20 hover:border-primary/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Code Store Starter Kit</span>
                    <h4 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors mt-1">
                      {relatedProduct.title}
                    </h4>
                    <p className="text-xs text-on-surface-variant line-clamp-2 mt-1">{relatedProduct.description}</p>
                  </div>
                  <div className="mt-3 text-xs font-bold text-primary flex items-center gap-1">
                    <span>Explore Code Store (฿{relatedProduct.price.toLocaleString()})</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="pt-6 border-t border-surface-container flex items-center justify-between">
          <Link
            href="/ai-lab"
            className="px-4 py-2 rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container-high text-xs font-bold transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>All AI Studies</span>
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary/90 transition-all flex items-center gap-2"
          >
            <span>Discuss This Research</span>
            <span className="material-symbols-outlined text-[16px]">mail</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
