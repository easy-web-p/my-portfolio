'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS, BLOG_CATEGORIES } from '@/lib/blog';
import { BlogCategorySlug, BlogCategory } from '@/types/blog';
import { useLanguage } from '@/context/language-context';

export default function BlogIndexPage() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const matchQuery =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = BLOG_POSTS[0];

  return (
    <div className="min-h-screen bg-surface py-10 px-4 sm:px-6 max-w-6xl mx-auto pb-28">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant mb-6">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <span className="text-on-surface font-semibold">Knowledge Hub</span>
      </div>

      {/* Header Banner */}
      <div className="mb-10 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold mb-3">
          <span className="material-symbols-outlined text-[16px]">menu_book</span>
          {t('blog.badge')}
        </div>
        <h1 className="text-3xl sm:text-5xl font-headline-sm font-bold text-on-surface tracking-tight">
          {t('blog.title')}
        </h1>
        <p className="text-on-surface-variant text-sm sm:text-base mt-2 max-w-2xl">
          {t('blog.subtitle')}
        </p>
      </div>

      {/* Search & Category Pills */}
      <div className="space-y-4 mb-10">
        {/* Search Input */}
        <div className="relative max-w-md">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('blog.searchPlaceholder')}
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-surface-container-low border border-outline-variant/40 focus:outline-hidden focus:border-primary text-xs sm:text-sm text-on-surface placeholder:text-outline/70"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full font-label-badge text-xs shrink-0 transition-all cursor-pointer active:scale-95 ${
              selectedCategory === 'all'
                ? 'bg-primary text-on-primary font-bold shadow-xs'
                : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant'
            }`}
          >
            All Articles ({BLOG_POSTS.length})
          </button>
          {BLOG_CATEGORIES.map((cat: BlogCategory) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 rounded-full font-label-badge text-xs shrink-0 transition-all cursor-pointer active:scale-95 ${
                selectedCategory === cat.slug
                  ? 'bg-primary text-on-primary font-bold shadow-xs'
                  : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Article (when viewing all without search) */}
      {selectedCategory === 'all' && !searchQuery && featuredPost && (
        <div className="mb-12">
          <div className="text-xs font-mono uppercase text-primary font-bold tracking-wider mb-3 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">stars</span>
            {t('blog.featured')}
          </div>

          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group block bg-surface-container-lowest border border-outline-variant/30 rounded-3xl overflow-hidden hover:border-primary/50 transition-all shadow-xs hover:shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container font-bold">
                      {featuredPost.category}
                    </span>
                    <span className="text-xs font-mono text-on-surface-variant">
                      {featuredPost.readTime}
                    </span>
                    <span className="text-xs font-mono text-outline">
                      • {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-headline-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h2>

                  <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed line-clamp-3">
                    {featuredPost.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {featuredPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container-low text-on-surface-variant"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-outline-variant/20 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-on-surface block">{featuredPost.author.name}</span>
                      <span className="text-[10px] text-on-surface-variant font-mono">{featuredPost.author.role}</span>
                    </div>
                  </div>

                  <span className="text-primary text-xs font-mono font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Article &rarr;
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 relative min-h-[240px] lg:min-h-full bg-surface-container-low">
                <Image
                  src={featuredPost.coverImage || '/images/blog/nodejs-architecture.png'}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-300"
                />
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Article Grid */}
      <div className="mb-14">
        <div className="text-xs font-mono uppercase text-on-surface-variant font-bold tracking-wider mb-4">
          All Publications ({filteredPosts.length})
        </div>

        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center bg-surface-container-lowest rounded-3xl border border-outline-variant/30">
            <span className="material-symbols-outlined text-[36px] text-outline mb-2">article</span>
            <p className="text-sm text-on-surface font-semibold">No articles found matching your filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-mono text-primary hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-surface-container-lowest border border-outline-variant/30 rounded-3xl overflow-hidden hover:border-primary/50 transition-all shadow-xs hover:shadow-lg"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video w-full bg-surface-container-low overflow-hidden">
                  <Image
                    src={post.coverImage || '/images/blog/nodejs-architecture.png'}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-xs font-bold">
                    {post.category}
                  </span>
                </div>

                {/* Card Content */}
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
                    <div className="flex items-center gap-2">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden">
                        <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                      </div>
                      <span className="text-[11px] font-mono text-on-surface">{post.author.name}</span>
                    </div>
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

      {/* Embedded Code Store Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm mb-12">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-[11px] font-mono text-primary font-bold uppercase tracking-wider">
            FROM CONCEPTS TO SHIPPIN&apos; CODE
          </div>
          <h3 className="text-xl sm:text-2xl font-headline-sm font-bold text-on-surface">
            Turn These Architectural Patterns into Production Apps
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl">
            Explore our curated Code Store with pre-configured AI Chat kits, WebGPU shader interactions, and full-stack REST API starters.
          </p>
        </div>
        <Link
          href="/code"
          className="px-6 py-3 rounded-full bg-primary text-on-primary font-label-badge text-xs sm:text-sm font-bold shrink-0 shadow-md hover:bg-primary/90 transition-all cursor-pointer active:scale-95 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">terminal</span>
          Explore Code Store
        </Link>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-8 text-center max-w-xl mx-auto shadow-xs">
        <span className="material-symbols-outlined text-primary text-[32px] mb-2">mark_email_read</span>
        <h3 className="text-xl font-headline-sm font-bold text-on-surface">
          Subscribe to Engineering Briefs
        </h3>
        <p className="text-xs text-on-surface-variant mt-1 mb-5">
          Get notified when new deep dives, starter kits, and open-source packages drop. Zero spam, unsubscribe anytime.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Thank you for subscribing to PhisitCode notes!');
          }}
          className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            placeholder="your.email@company.com"
            className="flex-1 px-4 py-2.5 rounded-full bg-surface-container-low border border-outline-variant/40 focus:outline-hidden focus:border-primary text-xs text-on-surface"
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold font-label-badge hover:bg-primary/90 transition-all cursor-pointer active:scale-95"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
