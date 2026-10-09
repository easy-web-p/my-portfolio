'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export const MainContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <main className={isAdmin ? 'flex-1 w-full min-h-screen bg-surface flex flex-col' : 'flex-1 flex flex-col relative w-full pt-20 bg-background min-h-screen'}>
      {children}
    </main>
  );
};
