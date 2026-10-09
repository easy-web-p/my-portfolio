'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getAllExperiments, Experiment } from '@/lib/experiments';

export default function AdminExperimentsPage() {
  const [experiments, setExperiments] = useState<Experiment[]>(getAllExperiments());
  const [search, setSearch] = useState('');

  const filtered = experiments.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.topic.toLowerCase().includes(search.toLowerCase()) ||
    e.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-sm text-2xl font-bold text-on-surface">AI Lab Research Studies</h1>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Manage experimental studies, micro-prototypes, neural datasets, and research question benchmarks.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/ai-lab"
            target="_blank"
            className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            <span>View Public /ai-lab</span>
          </Link>
          <button
            onClick={() => alert('Add experiment modal/form opened.')}
            className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-hard-3 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-hard-4 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>New AI Experiment</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-surface-container-lowest dark:bg-surface/50 border border-outline-variant/20 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
        <span className="material-symbols-outlined text-on-surface-variant text-[20px]">search</span>
        <input
          type="text"
          placeholder="Filter studies by topic, model, or research question..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent border-none text-xs text-on-surface focus:outline-none font-medium placeholder:text-on-surface-variant/60"
        />
        <span className="text-xs font-mono text-on-surface-variant">{filtered.length} studies</span>
      </div>

      {/* Experiments Table */}
      <div className="bg-surface-container-lowest dark:bg-surface/80 rounded-3xl border border-outline-variant/20 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-surface-container text-on-surface-variant uppercase tracking-wider font-bold bg-surface-container-low/40">
              <th className="py-3 px-5">Study Title</th>
              <th className="py-3 px-4">Topic / Domain</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Model & Pipeline</th>
              <th className="py-3 px-4">Primary Metric</th>
              <th className="py-3 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {filtered.map((exp) => (
              <tr key={exp.id} className="hover:bg-surface-container-low/50 transition-colors">
                <td className="py-4 px-5">
                  <div className="font-bold text-sm text-on-surface">{exp.title}</div>
                  <div className="text-[10px] text-primary font-mono mt-0.5">/ai-lab/{exp.slug}</div>
                </td>
                <td className="py-4 px-4 font-medium">{exp.topic}</td>
                <td className="py-4 px-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${exp.badgeColor}`}>
                    {exp.status}
                  </span>
                </td>
                <td className="py-4 px-4 font-mono text-on-surface-variant max-w-xs truncate">
                  {exp.model}
                </td>
                <td className="py-4 px-4">
                  <span className="font-mono font-bold text-primary">{exp.results[0]?.value}</span>
                  <span className="text-[10px] text-on-surface-variant block">{exp.results[0]?.metric}</span>
                </td>
                <td className="py-4 px-5 text-right space-x-2">
                  <Link
                    href={`/ai-lab/${exp.slug}`}
                    target="_blank"
                    className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors inline-block"
                    title="View study detail"
                  >
                    <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
