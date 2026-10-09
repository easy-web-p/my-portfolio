'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { StoreProduct } from '@/types/store';

type ProductTab = 'basic' | 'media' | 'features' | 'pricing' | 'versions' | 'seo' | 'publish';

export default function NewProductPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ProductTab>('basic');

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'templates' | 'components' | 'apis' | 'ai-projects' | 'free'>('templates');
  const [framework, setFramework] = useState('Next.js');

  const [coverImage, setCoverImage] = useState('/images/products/ai-starter.png');
  const [demoUrl, setDemoUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');

  const [features, setFeatures] = useState('Layered Architecture, Type-Safe Zod, Docker Compose, 60fps animations');
  const [included, setIncluded] = useState('Full Source Code, Setup PDF, 12 Months Updates');
  const [techStack, setTechStack] = useState('Next.js, TypeScript, Tailwind CSS, Prisma');

  const [basePrice, setBasePrice] = useState(79);
  const [badge, setBadge] = useState<'NEW DROP' | 'AI POWERED' | 'PRO TOOL' | 'FREE' | 'UPDATED'>('NEW DROP');

  const [version, setVersion] = useState('1.0.0');
  const [changelog, setChangelog] = useState('Initial production release.');
  const [minNodeVersion, setMinNodeVersion] = useState('>= 20.0.0');
  const [fileKey, setFileKey] = useState('starter-kit-v1.0.0.zip');
  const [fileSize, setFileSize] = useState('15.4 MB');

  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
    if (!metaTitle) setMetaTitle(val);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishing(true);

    const newProd: StoreProduct = {
      id: 'prod-' + Math.random().toString(36).substring(2, 7),
      title,
      slug: slug || 'new-product',
      tagline: tagline || 'High-performance developer asset',
      description,
      price: Number(basePrice),
      category,
      framework,
      rating: 5.0,
      reviewCount: 1,
      badge,
      demoUrl: demoUrl || undefined,
      githubUrl: githubUrl || undefined,
      fileKey,
      fileSize,
      version,
      features: features.split(',').map((f) => f.trim()),
      included: included.split(',').map((i) => i.trim()),
      techStack: techStack.split(',').map((t) => t.trim()),
      targetAudience: ['Developers', 'Engineers', 'Agencies'],
      installation: ['npm install', 'npm run dev'],
      changelog: [{ version, date: 'Just now', notes: changelog }],
      image: coverImage,
      thumbnail: coverImage,
      previewImages: [coverImage],
    };

    // Save to localStorage
    const saved = JSON.parse(localStorage.getItem('playful_admin_products') || '[]');
    localStorage.setItem('playful_admin_products', JSON.stringify([newProd, ...saved]));

    setTimeout(() => {
      setIsPublishing(false);
      router.push('/admin/products');
    }, 600);
  };

  const tabs: { id: ProductTab; label: string; icon: string }[] = [
    { id: 'basic', label: '1. Basic', icon: 'info' },
    { id: 'media', label: '2. Media', icon: 'image' },
    { id: 'features', label: '3. Features', icon: 'verified' },
    { id: 'pricing', label: '4. Pricing', icon: 'payments' },
    { id: 'versions', label: '5. Versions', icon: 'history' },
    { id: 'seo', label: '6. SEO', icon: 'travel_explore' },
    { id: 'publish', label: '7. Publish', icon: 'rocket_launch' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant">
        <Link href="/admin" className="hover:text-primary transition-colors">Admin</Link>
        <span>/</span>
        <Link href="/admin/products" className="hover:text-primary transition-colors">Products</Link>
        <span>/</span>
        <span className="text-on-surface font-semibold">New Product Drop</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-headline-sm font-bold text-on-surface">
            Create New Product Drop
          </h1>
          <p className="text-xs text-on-surface-variant font-mono mt-0.5">
            Configure metadata, multi-tier licenses, file vault storage, and version changelog.
          </p>
        </div>
      </div>

      {/* Tab Selector Header */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-surface-container-low border border-outline-variant/30 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-label-badge font-bold shrink-0 transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Form Content */}
      <form onSubmit={handleSaveProduct} className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* TAB 1: BASIC */}
        {activeTab === 'basic' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <h3 className="text-base font-headline-sm font-bold text-on-surface border-b border-outline-variant/20 pb-3">
              Basic Product Details
            </h3>

            <div>
              <label className="block text-xs font-mono text-on-surface-variant mb-1">Product Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Real-Time SLM Reasoning Agent Starter"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-hidden focus:border-primary text-sm text-on-surface"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-on-surface-variant mb-1">URL Slug</label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="real-time-slm-agent"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 font-mono text-xs text-on-surface"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-on-surface-variant mb-1">Tagline / Subhead</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Sub-20ms first-token streaming with WebGPU"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-sm text-on-surface"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-on-surface-variant mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface"
                >
                  <option value="templates">Website Templates</option>
                  <option value="components">UI Components</option>
                  <option value="apis">Node.js APIs</option>
                  <option value="ai-projects">AI Projects</option>
                  <option value="free">Free Open Source</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-on-surface-variant mb-1">Framework</label>
                <select
                  value={framework}
                  onChange={(e) => setFramework(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface"
                >
                  <option value="Next.js">Next.js</option>
                  <option value="Node.js">Node.js</option>
                  <option value="React">React</option>
                  <option value="PyTorch">PyTorch</option>
                  <option value="WebGL">WebGL / WebGPU</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-on-surface-variant mb-1">Full Description *</label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Comprehensive overview of architecture, latency benchmarks, and integration steps..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface"
              />
            </div>
          </div>
        )}

        {/* TAB 2: MEDIA */}
        {activeTab === 'media' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <h3 className="text-base font-headline-sm font-bold text-on-surface border-b border-outline-variant/20 pb-3">
              Media &amp; Demonstrations
            </h3>

            <div>
              <label className="block text-xs font-mono text-on-surface-variant mb-1">Cover Image URL</label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 font-mono text-xs text-on-surface"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-on-surface-variant mb-1">Live Demo URL</label>
                <input
                  type="url"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="https://demo.phisitcode.web.app/agent"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-on-surface-variant mb-1">GitHub Repo Preview (Optional)</label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/phisit012/agent-starter"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FEATURES */}
        {activeTab === 'features' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <h3 className="text-base font-headline-sm font-bold text-on-surface border-b border-outline-variant/20 pb-3">
              Features &amp; What&apos;s Included
            </h3>

            <div>
              <label className="block text-xs font-mono text-on-surface-variant mb-1">
                Key Features (Comma separated)
              </label>
              <textarea
                rows={3}
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-on-surface-variant mb-1">
                Included in Download Package (Comma separated)
              </label>
              <textarea
                rows={3}
                value={included}
                onChange={(e) => setIncluded(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-on-surface-variant mb-1">
                Tech Stack Tags (Comma separated)
              </label>
              <input
                type="text"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface font-mono"
              />
            </div>
          </div>
        )}

        {/* TAB 4: PRICING & LICENSES */}
        {activeTab === 'pricing' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <h3 className="text-base font-headline-sm font-bold text-on-surface border-b border-outline-variant/20 pb-3">
              Pricing &amp; Multi-Tier Licenses
            </h3>

            <div>
              <label className="block text-xs font-mono text-on-surface-variant mb-1">Base Price (USD) *</label>
              <input
                type="number"
                min="0"
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                className="w-full max-w-xs px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 font-mono text-sm text-on-surface"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {[
                { name: 'Personal (1.0x)', price: basePrice, terms: '1 personal/edu project' },
                { name: 'Commercial (1.8x)', price: Math.round(basePrice * 1.8), terms: '1 commercial client project' },
                { name: 'Extended (3.5x)', price: Math.round(basePrice * 3.5), terms: 'Unlimited client SaaS projects' },
              ].map((tier) => (
                <div key={tier.name} className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-1">
                  <div className="text-xs font-bold text-on-surface">{tier.name}</div>
                  <div className="text-lg font-mono font-bold text-primary">${tier.price}</div>
                  <div className="text-[10px] text-on-surface-variant font-mono">{tier.terms}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: VERSIONS & FILES */}
        {activeTab === 'versions' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <h3 className="text-base font-headline-sm font-bold text-on-surface border-b border-outline-variant/20 pb-3">
              Product Versioning &amp; Vault Files
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-on-surface-variant mb-1">Release Version</label>
                <input
                  type="text"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  placeholder="1.0.0"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 font-mono text-xs text-on-surface"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-on-surface-variant mb-1">Package Size</label>
                <input
                  type="text"
                  value={fileSize}
                  onChange={(e) => setFileSize(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 font-mono text-xs text-on-surface"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-on-surface-variant mb-1">Min Node Version</label>
                <input
                  type="text"
                  value={minNodeVersion}
                  onChange={(e) => setMinNodeVersion(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 font-mono text-xs text-on-surface"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-on-surface-variant mb-1">
                Release Changelog Notes
              </label>
              <textarea
                rows={3}
                value={changelog}
                onChange={(e) => setChangelog(e.target.value)}
                placeholder="What changed in this release..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface"
              />
            </div>
          </div>
        )}

        {/* TAB 6: SEO */}
        {activeTab === 'seo' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <h3 className="text-base font-headline-sm font-bold text-on-surface border-b border-outline-variant/20 pb-3">
              SEO &amp; Open Graph Preview
            </h3>

            <div>
              <label className="block text-xs font-mono text-on-surface-variant mb-1">Meta Title</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-on-surface-variant mb-1">Meta Description</label>
              <textarea
                rows={2}
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                placeholder="Compelling description for search snippets..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface"
              />
            </div>

            {/* Google SERP Preview */}
            <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 space-y-1">
              <span className="text-[10px] font-mono text-outline uppercase block mb-1">Google SERP Preview</span>
              <div className="text-primary text-sm font-semibold hover:underline cursor-pointer">
                {metaTitle || title || 'Product Title'} — พิสิษฐ์ แก้วกุลพิสิฐ // Personal Studio
              </div>
              <div className="text-[11px] font-mono text-success">
                https://phisitcode.web.app/code/{slug || 'product-slug'}
              </div>
              <div className="text-xs text-on-surface-variant line-clamp-2">
                {metaDesc || description || 'Product description will appear in search results...'}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: PUBLISH */}
        {activeTab === 'publish' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <h3 className="text-base font-headline-sm font-bold text-on-surface border-b border-outline-variant/20 pb-3">
              Publishing Options
            </h3>

            <div>
              <label className="block text-xs font-mono text-on-surface-variant mb-1">Featured Badge</label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value as any)}
                className="w-full max-w-xs px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface"
              >
                <option value="NEW DROP">NEW DROP</option>
                <option value="AI POWERED">AI POWERED</option>
                <option value="PRO TOOL">PRO TOOL</option>
                <option value="FREE">FREE</option>
                <option value="UPDATED">UPDATED</option>
              </select>
            </div>

            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
              <div className="text-xs">
                <div className="font-bold text-on-surface">Ready to Ship?</div>
                <div className="text-on-surface-variant">
                  Publishing will immediately index this product on `/code`, generate purchase options, and enable tokenized asset downloads.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {activeTab !== 'basic' && (
              <button
                type="button"
                onClick={() => {
                  const idx = tabs.findIndex((t) => t.id === activeTab);
                  if (idx > 0) setActiveTab(tabs[idx - 1].id);
                }}
                className="px-4 py-2 rounded-xl bg-surface-container-low text-xs font-bold hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                &larr; Previous
              </button>
            )}
            {activeTab !== 'publish' && (
              <button
                type="button"
                onClick={() => {
                  const idx = tabs.findIndex((t) => t.id === activeTab);
                  if (idx < tabs.length - 1) setActiveTab(tabs[idx + 1].id);
                }}
                className="px-4 py-2 rounded-xl bg-surface-container-high text-xs font-bold hover:bg-surface-container-highest transition-colors cursor-pointer"
              >
                Next &rarr;
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/products"
              className="px-4 py-2 rounded-xl bg-surface-container-low text-xs font-bold text-on-surface hover:bg-surface-container-high transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isPublishing || !title}
              className="px-6 py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold font-label-badge shadow-md hover:bg-primary/90 transition-all flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {isPublishing ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
                  <span>Publishing Drop...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
                  <span>Save &amp; Publish Drop</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
