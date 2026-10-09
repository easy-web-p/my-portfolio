'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * ออกจากระบบ
 *
 * ต้องทำสองฝั่งให้ครบ ไม่งั้นออกไม่จริง:
 *   1. DELETE /api/auth/session — ลบ session cookie ฝั่ง server และสั่ง
 *      revokeRefreshTokens ทำให้ session เดิมใช้ต่อไม่ได้แม้มีใครก๊อป cookie ไป
 *   2. signOut() ของ Firebase SDK — เคลียร์ auth state ในเบราว์เซอร์
 *      ถ้าข้ามขั้นนี้ SDK จะยังคิดว่าล็อกอินอยู่และต่อ session ใหม่ให้เงียบๆ
 *
 * เรียก router.refresh() ปิดท้ายเพื่อให้ server component อ่าน cookie ใหม่
 * (ถ้า push เฉยๆ หน้าที่ cache ไว้อาจยังแสดงข้อมูลของ session เดิม)
 */
export function SignOutButton({ className }: { className?: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsLoading(true);

    try {
      await fetch('/api/auth/session', { method: 'DELETE' });
    } catch {
      // ต่อ server ไม่ได้ — ยังต้องเคลียร์ฝั่ง client ต่อให้จบ
    }

    try {
      const { signOut } = await import('firebase/auth');
      const { getFirebaseAuth } = await import('@/lib/firebase');
      await signOut(await getFirebaseAuth());
    } catch {
      // ไม่เป็นไร cookie ถูกลบไปแล้ว guard ฝั่ง server จะกันต่อเอง
    }

    router.push('/login');
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isLoading}
      className={
        className
        ?? 'px-4 py-2 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high text-xs font-bold transition-colors cursor-pointer disabled:opacity-50'
      }
    >
      {isLoading ? 'Signing out…' : 'Sign Out'}
    </button>
  );
}
