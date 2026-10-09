'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/sidebar';
import { AdminTopbar } from '@/components/admin/topbar';
import { CommandPalette } from '@/components/admin/command-palette';

/**
 * เปลือก UI ของหน้าหลังบ้าน — ย้ายมาจาก src/app/admin/layout.tsx ทั้งก้อน
 *
 * ย้ายออกมาเพราะ layout ต้องกลายเป็น server component เพื่อตรวจสิทธิ์
 * (ไฟล์ที่มี 'use client' เรียก cookies() หรือ verify token ไม่ได้)
 * markup และ state ทั้งหมดเหมือนเดิมเป๊ะ ไม่ได้เปลี่ยน UX
 */
export function AdminShell({ children }: { children: React.ReactNode }) {
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
