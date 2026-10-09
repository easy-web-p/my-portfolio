'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { STORE_PRODUCTS } from '@/lib/store';
import { StoreProduct } from '@/types/store';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<StoreProduct[]>(STORE_PRODUCTS);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | 'PUBLISHED' | 'DRAFT' | 'ARCHIVED'>('ALL');
  const [versionModalProd, setVersionModalProd] = useState<StoreProduct | null>(null);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleDuplicate = (prod: StoreProduct) => {
    const clone: StoreProduct = {
      ...prod,
      id: 'prod-' + Math.random().toString(36).substring(2, 7),
      title: `${prod.title} (Copy)`,
      slug: `${prod.slug}-copy`,
      badge: 'NEW DROP',
    };
    setProducts([clone, ...products]);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.slug.toLowerCase().includes(search.toLowerCase()) ||
        p.framework.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCat === 'all' || p.category === selectedCat;
      return matchSearch && matchCat;
    });
  }, [products, search, selectedCat]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider">
              CODE STORE CATALOG
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-headline-sm font-bold text-on-surface mt-1">
            Product Management
          </h1>
          <p className="text-xs text-on-surface-variant font-mono mt-0.5">
            Manage packages, multi-tier licenses, version rollbacks, and file vault keys.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/code"
            target="_blank"
            className="px-4 py-2 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface text-xs font-mono font-bold transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            View Store
          </Link>
          <Link
            href="/admin/products/new"
            className="px-4 py-2 rounded-full bg-primary text-on-primary text-xs font-bold font-label-badge hover:bg-primary/90 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            New Product Drop
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Catalog', val: products.length, icon: 'inventory_2' },
          { label: 'Avg Rating', val: '4.95 ★', icon: 'star' },
          { label: 'Free MIT Tools', val: products.filter(p => p.price === 0).length, icon: 'code' },
          { label: 'Commercial Starters', val: products.filter(p => p.price > 0).length, icon: 'payments' },
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
            placeholder="Search products by title, slug, framework..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface placeholder:text-outline"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {['all', 'templates', 'components', 'apis', 'ai-projects', 'free'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold capitalize transition-colors cursor-pointer shrink-0 ${
                selectedCat === cat
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {cat === 'ai-projects' ? 'AI Projects' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low border-b border-outline-variant/20 font-mono text-on-surface-variant">
              <tr>
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-3">Category</th>
                <th className="py-3.5 px-3">Framework</th>
                <th className="py-3.5 px-3">Version</th>
                <th className="py-3.5 px-3">Price</th>
                <th className="py-3.5 px-3">Sales</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="py-3.5 px-4 flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-surface-container-low shrink-0 border border-outline-variant/20">
                      <Image src={prod.thumbnail || prod.image || '/images/products/ai-starter.png'} alt={prod.title} fill className="object-cover" />
                    </div>
                    <div>
                      <Link href={`/code/${prod.slug}`} className="font-bold text-on-surface hover:text-primary transition-colors">
                        {prod.title}
                      </Link>
                      <div className="text-[10px] font-mono text-on-surface-variant">{prod.slug}</div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-mono capitalize">{prod.category}</td>
                  <td className="py-3.5 px-3 font-mono">{prod.framework}</td>
                  <td className="py-3.5 px-3">
                    <button
                      onClick={() => setVersionModalProd(prod)}
                      className="px-2 py-0.5 rounded-md bg-surface-container hover:bg-surface-container-high font-mono text-xs font-bold text-primary transition-colors cursor-pointer"
                      title="View Version History & Changelog"
                    >
                      v{prod.version} ▾
                    </button>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-primary">
                    {prod.price === 0 ? 'FREE' : `$${prod.price}`}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-on-surface">
                    {Math.floor((prod.reviewCount || 1) * 3.4)}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-success/10 text-success border border-success/30 font-bold">
                      PUBLISHED
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1">
                    <Link
                      href={`/code/${prod.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-primary inline-block"
                      title="View Live Product"
                    >
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                    </Link>
                    <button
                      onClick={() => handleDuplicate(prod)}
                      className="p-1.5 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-primary inline-block cursor-pointer"
                      title="Duplicate Product"
                    >
                      <span className="material-symbols-outlined text-[16px]">content_copy</span>
                    </button>
                    <button
                      onClick={() => handleDelete(prod.id)}
                      className="p-1.5 rounded-lg hover:bg-error/10 text-outline hover:text-error inline-block cursor-pointer"
                      title="Delete Product"
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

      {/* Version History & Rollback Modal */}
      {versionModalProd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
              <div>
                <h3 className="text-base font-headline-sm font-bold text-on-surface">
                  Version History &amp; Changelog
                </h3>
                <p className="text-xs font-mono text-on-surface-variant">
                  {versionModalProd.title}
                </p>
              </div>
              <button
                onClick={() => setVersionModalProd(null)}
                className="text-outline hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {versionModalProd.changelog.map((entry, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-primary">v{entry.version}</span>
                    <span className="text-[10px] font-mono text-outline">{entry.date}</span>
                  </div>
                  <p className="text-xs text-on-surface leading-relaxed">{entry.notes}</p>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-outline-variant/20 flex justify-between items-center text-xs">
              <span className="text-outline font-mono">File: {versionModalProd.fileKey}</span>
              <button
                onClick={() => {
                  alert(`Rollback to previous version initiated for ${versionModalProd.title}`);
                  setVersionModalProd(null);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-surface-container-high hover:bg-primary hover:text-on-primary font-bold transition-all cursor-pointer"
              >
                Rollback Version
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
