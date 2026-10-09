import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/blog';
import { getStoreProductBySlug } from '@/lib/store';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} — พิสิษฐ์ แก้วกุลพิสิฐ // Dev Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.coverImage || '/images/blog/nodejs-architecture.png'],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedProduct = post.relatedProductSlug
    ? getStoreProductBySlug(post.relatedProductSlug)
    : null;

  return (
    <article className="min-h-screen bg-surface py-10 px-4 sm:px-6 max-w-4xl mx-auto pb-28">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant mb-6">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-primary transition-colors">Knowledge Hub</Link>
        <span>/</span>
        <Link href={`/blog/category/${post.category}`} className="hover:text-primary transition-colors uppercase">
          {post.category}
        </Link>
      </div>

      {/* Article Header */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container font-bold">
            {post.category}
          </span>
          <span className="text-xs font-mono text-on-surface-variant">
            {post.readTime}
          </span>
          <span className="text-xs font-mono text-outline">
            • {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-headline-sm font-bold text-on-surface tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
          {post.description}
        </p>

        {/* Author info */}
        <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/20">
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/20">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-sm font-bold text-on-surface">{post.author.name}</div>
            <div className="text-xs text-on-surface-variant font-mono">{post.author.role}</div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-surface-container-low mb-10 shadow-md">
        <Image
          src={post.coverImage || '/images/blog/nodejs-architecture.png'}
          alt={post.title}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Main Content Body */}
      <div className="prose prose-invert max-w-none space-y-6 text-on-surface leading-relaxed text-sm sm:text-base">
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="whitespace-pre-line font-body-md text-on-surface/90 space-y-4">
            {post.content}
          </div>
        </div>
      </div>

      {/* Embedded Code Store CTA Box (Critical Feature Requested by User) */}
      {relatedProduct && (
        <div className="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-primary/15 via-surface-container-low to-secondary-container/20 border-2 border-primary/30 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary text-white text-[10px] font-mono font-bold tracking-wider uppercase">
                <span className="material-symbols-outlined text-[14px]">terminal</span>
                Production Starter Kit Available
              </div>

              <h3 className="text-xl sm:text-2xl font-headline-sm font-bold text-on-surface">
                {relatedProduct.title}
              </h3>

              <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-2">
                {relatedProduct.description}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-mono font-bold text-primary">
                  {relatedProduct.price === 0 ? 'FREE OPEN SOURCE' : `Starting at $${relatedProduct.price}`}
                </span>
                <span className="text-xs font-mono text-on-surface-variant">•</span>
                <span className="text-xs font-mono text-on-surface-variant">v{relatedProduct.version}</span>
                <span className="text-xs font-mono text-on-surface-variant">•</span>
                <span className="text-xs font-mono text-on-surface-variant">{relatedProduct.framework}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
              <Link
                href={`/code/${relatedProduct.slug}`}
                className="px-6 py-3 rounded-full bg-primary text-on-primary font-label-badge text-xs sm:text-sm font-bold shadow-md hover:bg-primary/90 transition-all text-center flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Inspect in Code Store</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Tags & Sharing */}
      <div className="pt-6 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono text-outline mr-2">Tags:</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface-variant"
            >
              #{tag}
            </span>
          ))}
        </div>

        <Link
          href="/blog"
          className="text-xs font-mono text-primary hover:underline flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[14px]">arrow_back</span>
          <span>Back to All Articles</span>
        </Link>
      </div>
    </article>
  );
}
