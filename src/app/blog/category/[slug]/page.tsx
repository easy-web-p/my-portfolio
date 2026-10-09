import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBlogPostsByCategory, getCategoryBySlug } from '@/lib/blog';
import { BLOG_CATEGORIES } from '@/types/blog';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return { title: 'Category Not Found' };

  return {
    title: `${cat.title} บทความ — พิสิษฐ์ แก้วกุลพิสิฐ // Dev Blog`,
    description: cat.description,
  };
}

export async function generateStaticParams() {
  return BLOG_CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const posts = getBlogPostsByCategory(slug as any);

  return (
    <div className="min-h-screen bg-surface py-10 px-4 sm:px-6 max-w-6xl mx-auto pb-28">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant mb-6">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-primary transition-colors">Knowledge Hub</Link>
        <span>/</span>
        <span className="text-on-surface font-semibold">{category.title}</span>
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold mb-3">
          <span className="material-symbols-outlined text-[16px]">folder_open</span>
          CATEGORY ARCHIVE
        </div>
        <h1 className="text-3xl sm:text-4xl font-headline-sm font-bold text-on-surface tracking-tight">
          {category.title}
        </h1>
        <p className="text-on-surface-variant text-sm sm:text-base mt-2 max-w-xl">
          {category.description}
        </p>
      </div>

      {/* Other Categories Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        <Link
          href="/blog"
          className="px-4 py-2 rounded-full font-label-badge text-xs bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant shrink-0"
        >
          All Articles
        </Link>
        {BLOG_CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/blog/category/${cat.slug}`}
            className={`px-4 py-2 rounded-full font-label-badge text-xs shrink-0 transition-all ${
              cat.slug === slug
                ? 'bg-primary text-on-primary font-bold shadow-xs'
                : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant'
            }`}
          >
            {cat.title}
          </Link>
        ))}
      </div>

      {/* Posts List */}
      {posts.length === 0 ? (
        <div className="p-12 text-center bg-surface-container-lowest rounded-3xl border border-outline-variant/30 max-w-md mx-auto">
          <span className="material-symbols-outlined text-[36px] text-outline mb-2">draft</span>
          <h3 className="font-bold text-on-surface text-base">New Articles Coming Soon</h3>
          <p className="text-xs text-on-surface-variant mt-1 mb-4">
            We are currently polishing deep dives for this category. Check back next week!
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-xs font-mono text-primary font-bold hover:underline"
          >
            &larr; Return to Knowledge Hub
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-surface-container-lowest border border-outline-variant/30 rounded-3xl overflow-hidden hover:border-primary/50 transition-all shadow-xs hover:shadow-lg"
            >
              <div className="relative aspect-video w-full bg-surface-container-low overflow-hidden">
                <Image
                  src={post.coverImage || '/images/blog/nodejs-architecture.png'}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-300"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-on-surface-variant">
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>

                  <h3 className="text-base font-headline-sm font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed">
                    {post.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-on-surface">{post.author.name}</span>
                  <span className="text-primary font-mono text-[11px] font-bold group-hover:translate-x-1 transition-transform">
                    Read &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
