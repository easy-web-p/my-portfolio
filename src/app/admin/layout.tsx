'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/sidebar';
import { AdminTopbar } from '@/components/admin/topbar';
import { CommandPalette } from '@/components/admin/command-palette';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
  params?: Promise<any>;
  [key: string]: any;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface flex text-on-surface">
      {/* Collapsible Sidebar */}
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Container */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          collapsed ? 'pl-18' : 'pl-64'
        }`}
      >
        {/* Top bar */}
        <AdminTopbar
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        {/* Admin Content Area */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </div>

      {/* Global Command Palette (Ctrl+K / Cmd+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        setIsOpen={setCommandPaletteOpen}
      />
    </div>
  );
}
