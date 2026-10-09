'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getAllExperiments, Experiment } from '@/lib/experiments';

export default function AiLabPage() {
  const experiments = getAllExperiments();
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const topics = ['All', 'Computer Vision', 'Generative Audio', 'Agentic Reasoning', 'Spatial UI'];
  const statuses = ['All', 'SURPRISINGLY WORKS', 'COMPLETED', 'EXPERIMENTAL', 'TRAINING'];

  const filtered = experiments.filter((exp) => {
    const matchesTopic = selectedTopic === 'All' || exp.topic === selectedTopic;
    const matchesStatus = selectedStatus === 'All' || exp.status === selectedStatus;
    const matchesSearch =
      searchQuery === '' ||
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.researchQuestion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTopic && matchesStatus && matchesSearch;
  });

  return (
    <div className="w-full bg-background min-h-screen py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-container-max mx-auto">
        {/* Header Breadcrumb & Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-3">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary font-bold">AI Lab & Experiments</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-surface-container-high">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3 border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span>Active Research Studies & Micro-Prototypes</span>
              </div>
              <h1 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-on-surface">
                AI Lab: PhisitCode Intelligence at the Edge
              </h1>
              <p className="mt-3 text-base sm:text-lg text-on-surface-variant leading-relaxed">
                Empirical experiments across computer vision, generative audio, agentic reasoning, and spatial UX. Bridging theoretical machine learning with delightful tactile interaction.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/#playground"
                className="px-4 py-2.5 rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container-high text-xs font-bold border border-outline-variant/30 transition-all flex items-center gap-2 shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">videogame_asset</span>
                <span>Interactive Playground</span>
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-hard-3 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-hard-4 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">science</span>
                <span>Propose an Experiment</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="bg-surface-container-lowest dark:bg-surface/50 border border-outline-variant/20 rounded-2xl p-4 sm:p-5 mb-10 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search research questions, algorithms, shaders, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs font-medium rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/20 focus:outline-none focus:border-primary text-on-surface placeholder:text-on-surface-variant/60"
              />
            </div>

            {/* Status Filter Indicator */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mr-1">Status:</span>
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    selectedStatus === status
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Topic Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-3 mt-3 border-t border-outline-variant/15">
            <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mr-1">Domain:</span>
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  selectedTopic === topic
                    ? 'bg-primary-container text-on-primary-container shadow-xs font-bold'
                    : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Experiment Cards Grid */}
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-surface-container-lowest rounded-2xl border border-outline-variant/20">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">science_off</span>
            <p className="text-sm font-semibold text-on-surface">No experiments match your search criteria.</p>
            <button
              onClick={() => {
                setSelectedTopic('All');
                setSelectedStatus('All');
                setSearchQuery('');
              }}
              className="mt-3 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((exp) => (
              <div
                key={exp.id}
                className="bg-surface-container-lowest dark:bg-surface/60 rounded-2xl border border-outline-variant/20 hover:border-primary/40 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group"
              >
                {/* Visual Header Banner */}
                <div className={`h-24 bg-gradient-to-r ${exp.coverGradient} p-5 flex items-start justify-between relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  <div className="relative z-10 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                      {exp.topic}
                    </span>
                    <span className="text-[11px] text-white/80 font-mono">{exp.date}</span>
                  </div>
                  <div className="relative z-10">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${exp.badgeColor} bg-white dark:bg-slate-900 shadow-xs`}>
                      ✦ {exp.status}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface tracking-tight group-hover:text-primary transition-colors">
                      <Link href={`/ai-lab/${exp.slug}`}>{exp.title}</Link>
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                      {exp.tagline}
                    </p>

                    {/* Research Question Callout */}
                    <div className="mt-4 p-3 rounded-xl bg-surface-container-low/70 dark:bg-surface border border-outline-variant/15">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase tracking-wider mb-1">
                        <span className="material-symbols-outlined text-[14px]">psychology_alt</span>
                        <span>Research Question</span>
                      </div>
                      <p className="text-xs text-on-surface font-medium italic">
                        &ldquo;{exp.researchQuestion}&rdquo;
                      </p>
                    </div>

                    {/* Results Metrics Snapshot */}
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {exp.results.map((res, i) => (
                        <div key={i} className="p-2 rounded-lg bg-surface-container-lowest dark:bg-surface border border-outline-variant/20 text-center">
                          <div className="font-mono text-sm sm:text-base font-bold text-primary">{res.value}</div>
                          <div className="text-[10px] text-on-surface-variant uppercase tracking-wider truncate font-semibold">{res.metric}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tag Chips */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface text-[10px] font-mono font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="mt-6 pt-4 border-t border-surface-container flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {exp.githubUrl && (
                        <a
                          href={exp.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface hover:text-primary transition-colors cursor-pointer"
                          title="View Repository"
                        >
                          <span className="material-symbols-outlined text-[18px]">code</span>
                        </a>
                      )}
                      {exp.demoUrl && (
                        <Link
                          href={exp.demoUrl}
                          className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface hover:text-primary transition-colors cursor-pointer"
                          title="Run Interactive Demo"
                        >
                          <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                        </Link>
                      )}
                    </div>

                    <Link
                      href={`/ai-lab/${exp.slug}`}
                      className="px-3.5 py-1.5 rounded-xl bg-surface-container text-on-surface group-hover:bg-primary group-hover:text-white transition-all text-xs font-bold flex items-center gap-1.5"
                    >
                      <span>Read Study Report</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
