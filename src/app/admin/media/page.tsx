'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: string;
  dimensions: string;
  type: 'image' | 'document';
  date: string;
}

const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'med-1',
    name: 'stitch-logo.png',
    url: '/images/stitch-logo.png',
    size: '42 KB',
    dimensions: '512 x 512',
    type: 'image',
    date: 'Feb 2026'
  },
  {
    id: 'med-2',
    name: 'ai-chat-starter-cover.png',
    url: '/images/products/ai-chat.png',
    size: '1.2 MB',
    dimensions: '1920 x 1080',
    type: 'image',
    date: 'Feb 2026'
  },
  {
    id: 'med-3',
    name: 'bento-portfolio-preview.png',
    url: '/images/products/bento-pro.png',
    size: '980 KB',
    dimensions: '1920 x 1080',
    type: 'image',
    date: 'Jan 2026'
  }
];

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>(INITIAL_MEDIA);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (item: MediaItem) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(item.url);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-sm text-2xl font-bold text-on-surface">Public Media Assets</h1>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Manage reusable public images, vectors, and documents. Product source zip files are stored securely in private vaults.
          </p>
        </div>
        <button
          onClick={() => alert('Media upload file picker opened.')}
          className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-[3px_3px_0px_#141b2b] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#141b2b] transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">upload</span>
          <span>Upload Media Asset</span>
        </button>
      </div>

      {/* Grid of Media Assets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.map((item) => (
          <div
            key={item.id}
            className="bg-surface-container-lowest dark:bg-surface/80 rounded-2xl border border-outline-variant/20 overflow-hidden shadow-xs flex flex-col justify-between group"
          >
            <div className="h-40 bg-surface-container-low dark:bg-surface-container-highest/20 relative flex items-center justify-center p-3">
              <div className="relative w-full h-full">
                <Image
                  src={item.url}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="p-4 space-y-2">
              <div className="font-bold text-xs text-on-surface truncate" title={item.name}>
                {item.name}
              </div>
              <div className="flex items-center justify-between text-[10px] text-on-surface-variant font-mono">
                <span>{item.size}</span>
                <span>{item.dimensions}</span>
              </div>

              <div className="pt-2 border-t border-surface-container flex items-center justify-between">
                <button
                  onClick={() => handleCopy(item)}
                  className="text-primary hover:underline text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">link</span>
                  <span>{copiedId === item.id ? 'Copied!' : 'Copy Path'}</span>
                </button>
                <span className="text-[10px] text-on-surface-variant">{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
