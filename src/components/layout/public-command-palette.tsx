'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { translateText } from '@/lib/keyboardTranslator';

interface SearchItem {
  id: string;
  title: string;
  category: 'Page' | 'Product' | 'Article' | 'Study';
  url: string;
  icon: string;
}

const SEARCHABLE_ITEMS: SearchItem[] = [
  // Public Pages
  { id: 'p-1', title: 'Home Portfolio', category: 'Page', url: '/', icon: 'home' },
  { id: 'p-2', title: 'Work & Case Studies', category: 'Page', url: '/work', icon: 'folder' },
  { id: 'p-3', title: 'AI Lab & Experiments', category: 'Page', url: '/ai-lab', icon: 'science' },
  { id: 'p-4', title: 'Digital Code Store', category: 'Page', url: '/code', icon: 'shopping_bag' },
  { id: 'p-5', title: 'Knowledge Blog', category: 'Page', url: '/blog', icon: 'menu_book' },
  { id: 'p-6', title: 'Services & Capabilities', category: 'Page', url: '/services', icon: 'design_services' },
  { id: 'p-7', title: 'About Phisit Kaewkulphisit', category: 'Page', url: '/about', icon: 'person' },
  { id: 'p-8', title: 'Interactive Playground', category: 'Page', url: '/playground', icon: 'videogame_asset' },
  { id: 'p-9', title: 'Curriculum Vitae / Resume', category: 'Page', url: '/resume', icon: 'description' },
  { id: 'p-10', title: 'Contact Studio', category: 'Page', url: '/contact', icon: 'mail' },
  { id: 'p-11', title: 'Customer Asset Vault', category: 'Page', url: '/dashboard/downloads', icon: 'download' },

  // Products
  { id: 'pr-1', title: 'AI Chat Starter Kit (Next.js 15 & Local RAG)', category: 'Product', url: '/code/ai-chat-starter-kit', icon: 'smart_toy' },
  { id: 'pr-2', title: 'Bento Portfolio Pro Template', category: 'Product', url: '/code/bento-portfolio-pro', icon: 'web' },
  { id: 'pr-3', title: 'Design Tokens & Theme Studio', category: 'Product', url: '/code/design-tokens-studio', icon: 'palette' },
  { id: 'pr-4', title: 'Production Node.js REST API Starter', category: 'Product', url: '/code/production-nodejs-rest-api-starter', icon: 'dns' },
  { id: 'pr-5', title: 'Agent Orchestrator Micro-Kit', category: 'Product', url: '/code/agent-orchestrator-kit', icon: 'psychology' },

  // Blog Articles
  { id: 'b-1', title: 'Building Production-Grade Node.js APIs with TypeScript & Zod', category: 'Article', url: '/blog/building-nodejs-apis-typescript', icon: 'article' },
  { id: 'b-2', title: 'Zero-Latency Small Language Models on Mobile WebGPU', category: 'Article', url: '/blog/zero-latency-slm-webgpu', icon: 'article' },
  { id: 'b-3', title: 'Crafting Playful AI Interfaces: Beyond Chat Input Boxes', category: 'Article', url: '/blog/crafting-playful-ai-interfaces', icon: 'article' },
  { id: 'b-4', title: 'From Concept to Revenue: Launching Developer Tools', category: 'Article', url: '/blog/ai-agents-micro-saas-guide', icon: 'article' },

  // AI Lab Studies
  { id: 'exp-1', title: 'Thermal Convection Vortexes in First-Crack Roasting', category: 'Study', url: '/ai-lab/thermal-convection-vision', icon: 'biotech' },
  { id: 'exp-2', title: 'Ambient Carbon Micro-Delta Modular Sonification', category: 'Study', url: '/ai-lab/sonified-carbon-synthesizer', icon: 'biotech' },
  { id: 'exp-3', title: 'Harmonic Distortion GLSL Ribbon Assistant', category: 'Study', url: '/ai-lab/analog-patch-cable-agent', icon: 'biotech' },
  { id: 'exp-4', title: 'Gyro-Haptic Celestial Latent Navigator', category: 'Study', url: '/ai-lab/spatial-telescope-hud', icon: 'biotech' },
];

export const PublicCommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const translatedSearch = translateText(search, 'auto');
  const hasTranslation = search.trim().length > 0 && translatedSearch !== search;

  const filtered = SEARCHABLE_ITEMS.filter((item) => {
    const titleLower = item.title.toLowerCase();
    const categoryLower = item.category.toLowerCase();
    const q1 = search.toLowerCase().trim();
    const q2 = translatedSearch.toLowerCase().trim();

    return (
      titleLower.includes(q1) ||
      categoryLower.includes(q1) ||
      (q2 && (titleLower.includes(q2) || categoryLower.includes(q2)))
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const handleSelect = (url: string) => {
    setIsOpen(false);
    setSearch('');
    router.push(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl bg-surface-container-lowest dark:bg-slate-900 border border-white/60 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-surface-container flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-[22px]">search</span>
          <input
            type="text"
            placeholder="Search pages, products, articles, studies... (Esc to close)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent border-none text-sm text-on-surface focus:outline-none placeholder:text-on-surface-variant/60 font-medium"
          />
          <span className="px-2 py-0.5 rounded bg-surface-container text-[10px] font-mono text-on-surface-variant font-bold">
            ESC
          </span>
        </div>

        {/* Background Keystroke Translation Indicator */}
        {hasTranslation && (
          <div className="px-4 py-1.5 bg-primary/5 border-b border-primary/10 text-[11px] text-primary flex items-center justify-between font-mono">
            <span>⌨️ ตรวจพบลืมเปลี่ยนภาษา ค้นหารวม: <strong>&ldquo;{translatedSearch}&rdquo;</strong></span>
            <button
              type="button"
              onClick={() => setSearch(translatedSearch)}
              className="text-[10px] underline cursor-pointer hover:opacity-80 font-sans"
            >
              สลับคำค้น
            </button>
          </div>
        )}

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-surface-container/50">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-on-surface-variant">
              No matching pages or products found for &ldquo;{search}&rdquo;.
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item.url)}
                className={`p-3 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                  idx === selectedIndex
                    ? 'bg-primary text-white'
                    : 'hover:bg-surface-container text-on-surface'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`material-symbols-outlined text-[18px] ${idx === selectedIndex ? 'text-white' : 'text-primary'}`}>
                    {item.icon}
                  </span>
                  <span className="text-xs font-semibold truncate">{item.title}</span>
                </div>
                <span
                  className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full shrink-0 ${
                    idx === selectedIndex
                      ? 'bg-white/20 text-white'
                      : 'bg-surface-container text-on-surface-variant'
                  }`}
                >
                  {item.category}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Footer Hints */}
        <div className="px-4 py-2.5 bg-surface-container-low dark:bg-slate-950/50 border-t border-surface-container flex items-center justify-between text-[10px] text-on-surface-variant">
          <span>Tip: Press <kbd className="font-mono font-bold">Ctrl + K</kbd> anytime</span>
          <span>พิสิษฐ์ แก้วกุลพิสิฐ — Personal Studio &amp; Projects</span>
        </div>
      </div>
    </div>
  );
};
