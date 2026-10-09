'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BLOG_POSTS, BLOG_CATEGORIES } from '@/lib/blog';
import { BlogPost } from '@/types/blog';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  const handleDelete = (slug: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      setPosts(posts.filter((p) => p.slug !== slug));
    }
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.slug.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCat === 'all' || p.category === selectedCat;
      return matchSearch && matchCat;
    });
  }, [posts, search, selectedCat]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
            <span className="text-xs font-mono font-bold text-secondary uppercase tracking-wider">
              KNOWLEDGE HUB EDITORIAL
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-headline-sm font-bold text-on-surface mt-1">
            Blog Articles &amp; Lab Notes
          </h1>
          <p className="text-xs text-on-surface-variant font-mono mt-0.5">
            Technical deep dives, architectural tutorials, and Code Store product tie-ins.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/blog"
            target="_blank"
            className="px-4 py-2 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface text-xs font-mono font-bold transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            View Hub
          </Link>
          <Link
            href="/admin/posts/new"
            className="px-4 py-2 rounded-full bg-primary text-on-primary text-xs font-bold font-label-badge hover:bg-primary/90 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">edit_note</span>
            Write Article
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Published Articles', val: posts.length, icon: 'article' },
          { label: 'Avg Reading Time', val: '6.8 mins', icon: 'schedule' },
          { label: 'Categories Active', val: 5, icon: 'category' },
          { label: 'Product Tie-Ins', val: posts.filter(p => p.relatedProductSlug).length, icon: 'link' },
        ].map((m) => (
          <div key={m.label} className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
            <span className="material-symbols-outlined text-primary text-[20px] mb-1">{m.icon}</span>
            <div className="text-xl font-mono font-bold text-on-surface">{m.val}</div>
            <div className="text-xs text-on-surface-variant font-mono">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles by title or slug..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface placeholder:text-outline"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer shrink-0 ${
              selectedCat === 'all'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
            }`}
          >
            All ({posts.length})
          </button>
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCat(cat.slug)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer shrink-0 ${
                selectedCat === cat.slug
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low border-b border-outline-variant/20 font-mono text-on-surface-variant">
              <tr>
                <th className="py-3.5 px-4">Article Title</th>
                <th className="py-3.5 px-3">Category</th>
                <th className="py-3.5 px-3">Date</th>
                <th className="py-3.5 px-3">Read Time</th>
                <th className="py-3.5 px-3">Store Product Tie-In</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredPosts.map((post) => (
                <tr key={post.slug} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="py-3.5 px-4 max-w-sm">
                    <Link href={`/blog/${post.slug}`} className="font-bold text-on-surface hover:text-primary transition-colors line-clamp-1">
                      {post.title}
                    </Link>
                    <div className="text-[10px] text-on-surface-variant line-clamp-1">{post.description}</div>
                  </td>
                  <td className="py-3.5 px-3 font-mono uppercase text-[11px]">
                    <span className="px-2 py-0.5 rounded-md bg-secondary-container text-on-secondary-container font-semibold">
                      {post.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-mono">{post.date}</td>
                  <td className="py-3.5 px-3 font-mono">{post.readTime}</td>
                  <td className="py-3.5 px-3 font-mono">
                    {post.relatedProductSlug ? (
                      <Link
                        href={`/code/${post.relatedProductSlug}`}
                        className="text-primary font-bold text-[11px] truncate block max-w-[140px] hover:underline"
                        title="View connected Code Store product"
                      >
                        {post.relatedProductSlug}
                      </Link>
                    ) : (
                      <span className="text-outline">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-success/10 text-success border border-success/30 font-bold">
                      PUBLISHED
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-primary inline-block"
                      title="View Live Article"
                    >
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                    </Link>
                    <Link
                      href="/admin/posts/new"
                      className="p-1.5 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-primary inline-block"
                      title="Edit in Studio"
                    >
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(post.slug)}
                      className="p-1.5 rounded-lg hover:bg-error/10 text-outline hover:text-error inline-block cursor-pointer"
                      title="Delete Article"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
