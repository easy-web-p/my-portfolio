import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { STORE_PRODUCTS } from '@/lib/store';
import { ProductCard } from '@/components/store/product-card';

const CATEGORY_MAP: Record<string, { label: string; description: string; aliases: string[] }> = {
  'website-templates': {
    label: 'Website Templates',
    description: 'Turnkey, responsive, and performance-tuned web applications and portfolio engines built with Next.js.',
    aliases: ['templates', 'website-templates']
  },
  'ui-components': {
    label: 'UI Components',
    description: 'Tactile, copy-paste React & Tailwind components with fluid physics and keyboard micro-interactions.',
    aliases: ['ui', 'ui-components']
  },
  'nodejs-apis': {
    label: 'Node.js APIs',
    description: 'Clean modular microservices, streaming endpoints, and backend starter kits ready for production.',
    aliases: ['node', 'nodejs', 'nodejs-apis']
  },
  'ai-projects': {
    label: 'AI Projects',
    description: 'LLM agents, vector retrieval pipelines, and edge computer vision templates.',
    aliases: ['ai', 'ai-projects']
  },
  'starter-kits': {
    label: 'Starter Kits & SaaS',
    description: 'End-to-end boilerplate kits with authentication, databases, and billing already wired together.',
    aliases: ['saas', 'starter-kits']
  },
  'free-resources': {
    label: 'Free Resources',
    description: 'Open source boilerplates and experimental utilities free for community commercial use.',
    aliases: ['free', 'free-resources']
  }
};

export function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryInfo = CATEGORY_MAP[slug];

  if (!categoryInfo) {
    notFound();
  }

  const products = STORE_PRODUCTS.filter((p) =>
    categoryInfo.aliases.includes(p.category.toLowerCase())
  );

  return (
    <div className="w-full bg-background min-h-screen py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-container-max mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/code" className="hover:text-primary transition-colors">Code Store</Link>
          <span>/</span>
          <span className="text-primary truncate">{categoryInfo.label}</span>
        </div>

        {/* Category Hero */}
        <div className="pb-8 mb-10 border-b border-surface-container-high flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3 border border-primary/20">
              <span>Category Catalog</span>
            </div>
            <h1 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-on-surface">
              {categoryInfo.label}
            </h1>
            <p className="mt-3 text-base text-on-surface-variant max-w-2xl leading-relaxed">
              {categoryInfo.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/code"
              className="px-4 py-2 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>All Products</span>
            </Link>
          </div>
        </div>

        {/* Category Filter Badges */}
        <div className="flex flex-wrap gap-2 mb-10">
          {Object.entries(CATEGORY_MAP).map(([catSlug, cat]) => (
            <Link
              key={catSlug}
              href={`/code/category/${catSlug}`}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                catSlug === slug
                  ? 'bg-primary text-white shadow-xs font-bold'
                  : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="p-12 text-center bg-surface-container-lowest rounded-2xl border border-outline-variant/20">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">inventory_2</span>
            <p className="text-sm font-semibold text-on-surface">No products currently available in this category.</p>
            <Link href="/code" className="mt-4 inline-block px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold">
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
