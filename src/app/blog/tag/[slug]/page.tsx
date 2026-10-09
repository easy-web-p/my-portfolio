import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/lib/blog';

export function generateStaticParams() {
  const allTags = new Set<string>();
  BLOG_POSTS.forEach((post) => {
    post.tags.forEach((tag) => {
      allTags.add(tag.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
      allTags.add(tag.toLowerCase().replace(/[^a-z0-9]/g, ''));
    });
  });
  return Array.from(allTags).map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogTagPage({ params }: PageProps) {
  const { slug } = await params;
  const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Match tag slug flexibly (e.g. nodejs matches Node.js)
  const matchedPosts = BLOG_POSTS.filter((post) =>
    post.tags.some(
      (t) =>
        t.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug ||
        t.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanSlug
    )
  );

  if (matchedPosts.length === 0) {
    notFound();
  }

  // Find original display name of the tag from first matched post
  const displayTag =
    matchedPosts[0].tags.find(
      (t) =>
        t.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug ||
        t.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanSlug
    ) || slug;

  return (
    <div className="w-full bg-background min-h-screen py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-container-max mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-primary transition-colors">Knowledge Hub</Link>
          <span>/</span>
          <span className="text-primary truncate">#{displayTag}</span>
        </div>

        {/* Header */}
        <div className="pb-8 mb-10 border-b border-surface-container-high flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3 border border-primary/20">
              <span>Tag Feed</span>
            </div>
            <h1 className="font-headline-lg text-3xl sm:text-4xl font-bold tracking-tight text-on-surface">
              Articles tagged with #{displayTag}
            </h1>
            <p className="mt-2 text-sm text-on-surface-variant">
              Showing {matchedPosts.length} technical guide{matchedPosts.length === 1 ? '' : 's'} and case study breakdown{matchedPosts.length === 1 ? '' : 's'}.
            </p>
          </div>

          <Link
            href="/blog"
            className="px-4 py-2 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>All Articles</span>
          </Link>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchedPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-surface-container-lowest dark:bg-surface/60 rounded-2xl border border-outline-variant/20 hover:border-primary/40 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col group"
            >
              <div className="relative h-48 w-full bg-surface-container-low overflow-hidden">
                <Image
                  src={post.coverImage || '/images/blog/nodejs-architecture.png'}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                  {post.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="font-headline-sm text-base sm:text-lg font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="mt-2 text-xs sm:text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                    {post.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-surface-container flex flex-wrap gap-1.5">
                  {post.tags.map((t) => (
                    <Link
                      key={t}
                      href={`/blog/tag/${t.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                        t.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
                          ? 'bg-primary text-white font-bold'
                          : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      #{t}
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
