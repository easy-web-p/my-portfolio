'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { STORE_PRODUCTS } from '@/lib/store';
import { BLOG_CATEGORIES } from '@/lib/blog';
import { BlogPost } from '@/types/blog';

export default function NewBlogPostPage() {
  const router = useRouter();

  // Editor states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState(`## Introduction\n\nExplain the architectural challenge, latency constraints, or problem statement...\n\n\`\`\`typescript\n// Example code snippet\nexport const config = {\n  runtime: 'edge',\n};\n\`\`\`\n\n## Implementation Strategy\n\n1. Establish clear type definitions\n2. Optimize memory layouts and GC pauses\n3. Provide developer feedback with tactile micro-interactions\n`);
  const [viewMode, setViewMode] = useState<'write' | 'preview'>('write');

  // Sidebar settings
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED' | 'SCHEDULED'>('DRAFT');
  const [category, setCategory] = useState<string>('ai-ml');
  const [tags, setTags] = useState('AI, Node.js, WebGPU, TypeScript');
  const [coverImage, setCoverImage] = useState('/images/blog/nodejs-architecture.png');
  const [relatedProductSlug, setRelatedProductSlug] = useState<string>('ai-chat-starter-kit');

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState('Just now');

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
  };

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('markdown-textarea') as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const replacement = `${prefix}${selected || 'text'}${suffix}`;
    setContent(content.substring(0, start) + replacement + content.substring(end));
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + replacement.length - suffix.length);
    }, 0);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const newPost: BlogPost = {
      title,
      slug: slug || 'new-article',
      description: description || 'Technical analysis on modern web architectures.',
      date: new Date().toISOString().split('T')[0],
      category: category as any,
      tags: tags.split(',').map((t) => t.trim()),
      coverImage,
      readTime,
      author: {
        name: 'Phisit Kaewkulphisit',
        role: 'Software Developer & AI Creator',
        avatar: '/images/profile/avatar.png',
      },
      relatedProductSlug: relatedProductSlug || undefined,
      content,
    };

    const saved = JSON.parse(localStorage.getItem('playful_admin_posts') || '[]');
    localStorage.setItem('playful_admin_posts', JSON.stringify([newPost, ...saved]));

    setTimeout(() => {
      setIsSaving(false);
      setLastSaved('Saved 1s ago');
      router.push('/admin/posts');
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      {/* Breadcrumb & Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant">
          <Link href="/admin" className="hover:text-primary transition-colors">Admin</Link>
          <span>/</span>
          <Link href="/admin/posts" className="hover:text-primary transition-colors">Blog Studio</Link>
          <span>/</span>
          <span className="text-on-surface font-semibold">Write Article</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-outline hidden sm:inline">
            Auto-save: <span className="text-success font-bold">{lastSaved}</span>
          </span>

          <Link
            href="/admin/posts"
            className="px-4 py-2 rounded-full bg-surface-container-low text-on-surface text-xs font-bold hover:bg-surface-container-high transition-colors"
          >
            Cancel
          </Link>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || !title}
            className="px-5 py-2 rounded-full bg-primary text-on-primary text-xs font-bold font-label-badge shadow-md hover:bg-primary/90 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">send</span>
                <span>Publish Article</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Title & Markdown Editor */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-xs space-y-4">
            {/* Title & Slug */}
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Article Title (e.g. Zero-Latency SLMs on Mobile WebGPU)"
                className="w-full text-2xl sm:text-3xl font-headline-sm font-bold bg-transparent border-none outline-hidden text-on-surface placeholder:text-outline"
              />
              <div className="flex items-center gap-2 text-xs font-mono text-outline mt-1">
                <span>Slug:</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="article-slug"
                  className="bg-surface-container-low px-2 py-0.5 rounded text-primary text-xs font-mono border border-outline-variant/30 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Subhead / Excerpt */}
            <div>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief excerpt / TL;DR summarizing key insights..."
                className="w-full px-3.5 py-2 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface placeholder:text-outline focus:outline-hidden focus:border-primary"
              />
            </div>
          </div>

          {/* Editor Container with Formatting Toolbar */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl overflow-hidden shadow-xs">
            {/* Toolbar */}
            <div className="p-3 bg-surface-container-low/70 border-b border-outline-variant/20 flex flex-wrap items-center justify-between gap-2">
              {/* Formatting buttons */}
              <div className="flex items-center gap-1">
                {[
                  { label: 'H1', action: () => insertFormatting('# ') },
                  { label: 'H2', action: () => insertFormatting('## ') },
                  { label: 'Bold', action: () => insertFormatting('**', '**') },
                  { label: 'Italic', action: () => insertFormatting('*', '*') },
                  { label: 'Code', action: () => insertFormatting('```typescript\n', '\n```') },
                  { label: 'Quote', action: () => insertFormatting('> ') },
                  { label: 'List', action: () => insertFormatting('- ') },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    type="button"
                    onClick={btn.action}
                    className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-mono font-bold text-on-surface transition-colors cursor-pointer"
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              {/* View mode toggle */}
              <div className="flex items-center p-1 rounded-xl bg-surface-container border border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setViewMode('write')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    viewMode === 'write' ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface-variant'
                  }`}
                >
                  Write
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('preview')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    viewMode === 'preview' ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface-variant'
                  }`}
                >
                  Live Preview
                </button>
              </div>
            </div>

            {/* Editor Textarea vs Live Preview */}
            <div className="p-5">
              {viewMode === 'write' ? (
                <textarea
                  id="markdown-textarea"
                  rows={18}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your article in Markdown..."
                  className="w-full font-mono text-xs text-on-surface bg-transparent border-none outline-hidden resize-y leading-relaxed"
                />
              ) : (
                <div className="prose prose-invert max-w-none text-xs sm:text-sm text-on-surface whitespace-pre-line leading-relaxed min-h-[360px]">
                  {content}
                </div>
              )}
            </div>

            {/* Word & Reading count */}
            <div className="p-3 bg-surface-container-low/40 border-t border-outline-variant/15 flex items-center justify-between text-[11px] font-mono text-outline">
              <div className="flex items-center gap-3">
                <span>Words: {wordCount}</span>
                <span>Reading Time: {readTime}</span>
              </div>
              <span>Markdown Supported</span>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Article Settings Sidebar */}
        <div className="lg:col-span-4 space-y-5">
          {/* Publishing Status */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-mono uppercase text-on-surface-variant font-bold tracking-wider">
              Publication Settings
            </h4>

            <div>
              <label className="block text-xs font-mono text-on-surface-variant mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface"
              >
                <option value="DRAFT">Draft (Unlisted)</option>
                <option value="PUBLISHED">Published (Public)</option>
                <option value="SCHEDULED">Scheduled</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-on-surface-variant mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface"
              >
                {BLOG_CATEGORIES.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-on-surface-variant mb-1">Tags (Comma separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface font-mono"
              />
            </div>
          </div>

          {/* Connected Code Store Product (Requested by User) */}
          <div className="bg-surface-container-lowest border-2 border-primary/30 rounded-3xl p-5 shadow-xs space-y-3 bg-gradient-to-br from-primary/5 to-transparent">
            <div className="flex items-center gap-1.5 text-primary text-xs font-mono font-bold uppercase">
              <span className="material-symbols-outlined text-[16px]">terminal</span>
              Connected Starter Kit
            </div>
            <p className="text-[11px] text-on-surface-variant">
              Embeds a high-converting Code Store product box directly beneath this article.
            </p>

            <select
              value={relatedProductSlug}
              onChange={(e) => setRelatedProductSlug(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-primary/30 text-xs text-on-surface font-semibold"
            >
              <option value="">None (Don&apos;t embed product)</option>
              {STORE_PRODUCTS.map((prod) => (
                <option key={prod.slug} value={prod.slug}>
                  {prod.title} (${prod.price})
                </option>
              ))}
            </select>
          </div>

          {/* Cover Media */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-mono uppercase text-on-surface-variant font-bold tracking-wider">
              Cover Artwork
            </h4>

            <div>
              <label className="block text-xs font-mono text-on-surface-variant mb-1">Cover Image URL</label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface font-mono"
              />
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/20">
              <Image src={coverImage} alt="Cover Preview" fill className="object-cover" />
            </div>
          </div>

          {/* SERP Search Preview */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-5 shadow-xs space-y-2">
            <span className="text-[10px] font-mono text-outline uppercase block">SERP Preview</span>
            <div className="text-primary text-xs font-bold hover:underline cursor-pointer line-clamp-1">
              {title || 'Article Title'} — พิสิษฐ์ แก้วกุลพิสิฐ
            </div>
            <div className="text-[10px] font-mono text-success truncate">
              https://phisitcode.web.app/blog/{slug || 'slug'}
            </div>
            <div className="text-[11px] text-on-surface-variant line-clamp-2">
              {description || 'Article summary will be rendered here for search engines and social bots...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
