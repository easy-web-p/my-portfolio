'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { translateText } from '@/lib/keyboardTranslator';

interface CommandPaletteProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface CommandItem {
  id: string;
  category: 'Pages' | 'Actions' | 'Products' | 'Articles';
  title: string;
  href: string;
  icon: string;
}

const COMMAND_ITEMS: CommandItem[] = [
  // Pages
  { id: 'p-dash', category: 'Pages', title: 'Dashboard Overview', href: '/admin', icon: 'dashboard' },
  { id: 'p-prod', category: 'Pages', title: 'Manage Store Products', href: '/admin/products', icon: 'inventory_2' },
  { id: 'p-ord', category: 'Pages', title: 'Orders & Financial Ledger', href: '/admin/orders', icon: 'receipt_long' },
  { id: 'p-blog', category: 'Pages', title: 'Blog Editorial Studio', href: '/admin/posts', icon: 'article' },
  { id: 'p-cust', category: 'Pages', title: 'Customers Directory', href: '/admin/customers', icon: 'group' },
  { id: 'p-dl', category: 'Pages', title: 'Digital Asset Downloads Vault', href: '/admin/downloads', icon: 'key' },
  { id: 'p-ana', category: 'Pages', title: 'Revenue & Conversion Analytics', href: '/admin/analytics', icon: 'insights' },
  { id: 'p-set', category: 'Pages', title: 'System Settings & Roles', href: '/admin/settings', icon: 'tune' },

  // Actions
  { id: 'a-new-prod', category: 'Actions', title: 'Create New Product Drop', href: '/admin/products/new', icon: 'add_circle' },
  { id: 'a-new-post', category: 'Actions', title: 'Write New Blog Article', href: '/admin/posts/new', icon: 'edit_note' },
  { id: 'a-live-site', category: 'Actions', title: 'View Customer Site Preview', href: '/', icon: 'open_in_new' },

  // Products
  { id: 'pr-ai-chat', category: 'Products', title: 'AI Chat Starter Kit (v2.1.0)', href: '/code/ai-chat-starter-kit', icon: 'terminal' },
  { id: 'pr-bento-pro', category: 'Products', title: 'Bento Portfolio Pro Template (v1.4.0)', href: '/code/bento-portfolio-pro', icon: 'web' },
  { id: 'pr-node-api', category: 'Products', title: 'Production Node.js REST API Starter (v3.0.0)', href: '/code/production-nodejs-rest-api-starter', icon: 'dns' },
  { id: 'pr-shader', category: 'Products', title: 'WebGPU Shader Micro-Interactions (v1.2.0)', href: '/code/webgpu-shader-interactions', icon: 'gradient' },
];

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  const translatedQuery = translateText(query, 'auto');
  const hasTranslation = query.trim().length > 0 && translatedQuery !== query;

  const filteredItems = COMMAND_ITEMS.filter((item) => {
    const titleLower = item.title.toLowerCase();
    const categoryLower = item.category.toLowerCase();
    const q1 = query.toLowerCase().trim();
    const q2 = translatedQuery.toLowerCase().trim();

    return (
      titleLower.includes(q1) ||
      categoryLower.includes(q1) ||
      (q2 && (titleLower.includes(q2) || categoryLower.includes(q2)))
    );
  });

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setQuery('');
    router.push(href);
  };

  const handleArrowKeys = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex].href);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="fixed inset-0"
        onClick={() => setIsOpen(false)}
      />

      <div className="relative w-full max-w-xl bg-surface-container-lowest border border-outline-variant/30 rounded-3xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-outline-variant/20 gap-3">
          <span className="material-symbols-outlined text-primary text-[22px]">search</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleArrowKeys}
            placeholder="Type a command, product, or jump to page... (Esc to close)"
            className="flex-1 bg-transparent border-none outline-hidden text-sm text-on-surface placeholder:text-outline"
          />
          <kbd className="px-2 py-0.5 rounded bg-surface-container-low text-[10px] font-mono text-outline border border-outline-variant/30">
            ESC
          </kbd>
        </div>

        {/* Background Keystroke Translation Indicator */}
        {hasTranslation && (
          <div className="px-4 py-1.5 bg-primary/5 border-b border-primary/10 text-[11px] text-primary flex items-center justify-between font-mono">
            <span>⌨️ ตรวจพบลืมเปลี่ยนภาษา ค้นหารวม: <strong>&ldquo;{translatedQuery}&rdquo;</strong></span>
            <button
              type="button"
              onClick={() => setQuery(translatedQuery)}
              className="text-[10px] underline cursor-pointer hover:opacity-80"
            >
              สลับคำค้น
            </button>
          </div>
        )}

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-outline">
              No matching commands or products found.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.href)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-primary/10 text-primary font-bold'
                      : 'text-on-surface hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="material-symbols-outlined text-[18px] shrink-0 text-primary">
                      {item.icon}
                    </span>
                    <span className="truncate">{item.title}</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-surface-container text-outline font-semibold">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-surface-container-low/60 border-t border-outline-variant/20 flex items-center justify-between text-[11px] font-mono text-outline">
          <div className="flex items-center gap-3">
            <span>&uarr;&darr; to navigate</span>
            <span>&crarr; to select</span>
          </div>
          <span>Playful Command Palette</span>
        </div>
      </div>
    </div>
  );
};
