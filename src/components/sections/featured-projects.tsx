import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Sparkles, Layers } from 'lucide-react';
import { ProjectMeta } from '@/types/project';
import { Badge } from '@/components/ui/badge';

interface FeaturedProjectsProps {
  projects: ProjectMeta[];
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
  return (
    <section id="work" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full flex flex-col gap-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline-variant/40 pb-6">
        <div>
          <Badge variant="secondary" className="mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Case Studies</span>
          </Badge>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-on-surface tracking-tight">
            Selected Systems &amp; Experiments
          </h2>
          <p className="text-on-surface-variant text-sm sm:text-base mt-1">
            Deep-dive technical case studies across AI tools, design engineering, and spatial interaction.
          </p>
        </div>
        <Link
          href="/work"
          className="inline-flex items-center gap-1.5 font-display font-bold text-sm text-primary hover:underline"
        >
          <span>View All Projects</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Projects Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group relative bg-surface-container-lowest rounded-3xl border border-outline-variant/40 overflow-hidden shadow-ambient hover:shadow-[0_24px_48px_-12px_rgba(107,56,212,0.18)] hover:border-primary/50 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Preview Container */}
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

            {/* Content info */}
            <div className="p-6 flex flex-col gap-3">
              <h3 className="font-display font-black text-2xl text-on-surface tracking-tight group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-on-surface-variant text-sm line-clamp-2 leading-relaxed">
                {project.description}
              </p>

              {/* Technologies row */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-outline-variant/30">
                {project.technologies.map((tech) => (
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
    </section>
  );
};
