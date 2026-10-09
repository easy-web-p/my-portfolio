'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NewProjectPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Spatial UI & AI');
  const [client, setClient] = useState('');
  const [year, setYear] = useState('2026');
  const [overview, setOverview] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const router = useRouter();

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Case study "${title}" saved successfully!`);
    router.push('/admin/projects');
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
            <Link href="/admin/projects" className="hover:text-primary">Projects</Link>
            <span>/</span>
            <span className="text-primary font-bold">New Case Study</span>
          </div>
          <h1 className="font-headline-sm text-2xl font-bold text-on-surface">Create Portfolio Case Study</h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/projects"
            className="px-4 py-2 rounded-xl bg-surface-container text-xs font-bold text-on-surface hover:bg-surface-container-high transition-colors"
          >
            Cancel
          </Link>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-surface-container-lowest dark:bg-surface rounded-3xl p-6 sm:p-8 border border-outline-variant/20 shadow-xs space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-on-surface uppercase tracking-wider mb-1">Project Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Synapse Notes"
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/20 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-on-surface uppercase tracking-wider mb-1">URL Slug</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/20 font-mono text-primary font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-on-surface uppercase tracking-wider mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/20 font-medium"
              >
                <option>Spatial UI & AI</option>
                <option>WebGL Telemetry</option>
                <option>WebGPU & Audio DSP</option>
                <option>Design Tokens & Mobile</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-on-surface uppercase tracking-wider mb-1">Client / Lab</label>
              <input
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="e.g. Open Source / Lab"
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/20 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-on-surface uppercase tracking-wider mb-1">Year</label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/20 font-mono font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-on-surface uppercase tracking-wider mb-1">Executive Summary / Overview</label>
            <textarea
              rows={3}
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              placeholder="High level overview of what this project accomplished..."
              className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/20 font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-on-surface uppercase tracking-wider mb-1">The Challenge / Problem</label>
              <textarea
                rows={3}
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="What was the user or technical bottleneck?"
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/20 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-on-surface uppercase tracking-wider mb-1">The Solution & Impact</label>
              <textarea
                rows={3}
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                placeholder="How was it resolved and what outcomes were achieved?"
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/20 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-on-surface uppercase tracking-wider mb-1">Live Demo Link</label>
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/20 font-mono"
              />
            </div>
            <div>
              <label className="block font-bold text-on-surface uppercase tracking-wider mb-1">GitHub Repository</label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/20 font-mono"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold shadow-[3px_3px_0px_#141b2b] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#141b2b] transition-all cursor-pointer"
            >
              Publish Case Study
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
