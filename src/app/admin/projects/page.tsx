'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  client: string;
  year: string;
  featured: boolean;
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  views: number;
}

const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'prj-1',
    slug: 'synapse-notes',
    title: 'Synapse Notes: Spatial Knowledge Canvas',
    category: 'Spatial UI & AI',
    client: 'Open Source',
    year: '2026',
    featured: true,
    status: 'PUBLISHED',
    views: 14200,
  },
  {
    id: 'prj-2',
    slug: 'komorebi-health',
    title: 'Komorebi Health: Cardiovascular Shaders',
    category: 'WebGL Telemetry',
    client: 'Komorebi Health Inc.',
    year: '2025',
    featured: true,
    status: 'PUBLISHED',
    views: 18900,
  },
  {
    id: 'prj-3',
    slug: 'latent-canvas',
    title: 'LatentCanvas: Generative Fluid Sandbox',
    category: 'WebGPU & Audio DSP',
    client: 'Tokyo Media Lab',
    year: '2025',
    featured: false,
    status: 'PUBLISHED',
    views: 9400,
  },
];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [search, setSearch] = useState('');

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFeatured = (id: string) => {
    setProjects(projects.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)));
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-sm text-2xl font-bold text-on-surface">Portfolio Case Studies</h1>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Manage your public project portfolio, client deliverables, and live demos.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/work"
            target="_blank"
            className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            <span>View Public /work</span>
          </Link>
          <Link
            href="/admin/projects/new"
            className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-[3px_3px_0px_#141b2b] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#141b2b] transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>New Case Study</span>
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-surface-container-lowest dark:bg-surface/50 border border-outline-variant/20 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
        <span className="material-symbols-outlined text-on-surface-variant text-[20px]">search</span>
        <input
          type="text"
          placeholder="Filter projects by title, category, or client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent border-none text-xs text-on-surface focus:outline-none font-medium placeholder:text-on-surface-variant/60"
        />
        <span className="text-xs font-mono text-on-surface-variant">{filtered.length} projects</span>
      </div>

      {/* Projects Table */}
      <div className="bg-surface-container-lowest dark:bg-surface/80 rounded-3xl border border-outline-variant/20 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-surface-container text-on-surface-variant uppercase tracking-wider font-bold bg-surface-container-low/40">
              <th className="py-3 px-5">Project Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Client / Year</th>
              <th className="py-3 px-4 text-center">Featured</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-right">Views</th>
              <th className="py-3 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {filtered.map((project) => (
              <tr key={project.id} className="hover:bg-surface-container-low/50 transition-colors">
                <td className="py-4 px-5">
                  <div className="font-bold text-sm text-on-surface">{project.title}</div>
                  <div className="text-[10px] text-primary font-mono mt-0.5">/work/{project.slug}</div>
                </td>
                <td className="py-4 px-4 font-medium">{project.category}</td>
                <td className="py-4 px-4 text-on-surface-variant">
                  {project.client} ({project.year})
                </td>
                <td className="py-4 px-4 text-center">
                  <button
                    onClick={() => toggleFeatured(project.id)}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                      project.featured
                        ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                        : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {project.featured ? '✦ FEATURED' : 'Standard'}
                  </button>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase">
                    {project.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-right font-mono font-semibold">
                  {project.views.toLocaleString()}
                </td>
                <td className="py-4 px-5 text-right space-x-2">
                  <Link
                    href={`/work/${project.slug}`}
                    target="_blank"
                    className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors inline-block"
                    title="View live"
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
