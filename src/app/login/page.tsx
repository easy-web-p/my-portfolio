'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getFirebaseAuth } from '@/lib/firebase';

/**
 * หน้าเข้าสู่ระบบ — ล็อกอินจริงด้วย Firebase Auth
 *
 * ของเดิมเป็นฟอร์มหลอก: มี dropdown ให้เลือกเองว่าจะเป็น customer หรือ admin
 * แล้ว router.push('/admin') ตรงๆ พร้อมปุ่ม "Quick Prototype Sign-in" ที่เข้า
 * หลังบ้านได้โดยไม่ต้องกรอกอะไรเลย ทั้งสองอย่างถูกตัดออกเพราะเป็นทางเลี่ยง
 * guard โดยตรง และเพราะ role ต้องมาจาก custom claims ฝั่ง server เท่านั้น
 * ผู้ใช้เลือกเองไม่ได้
 *
 * ขั้นตอนหลังกด Sign In:
 *   1. signInWithEmailAndPassword -> ได้ ID token (อยู่ในหน่วยความจำ ไม่เก็บลง storage)
 *   2. POST /api/auth/session -> server ตรวจ token แล้วออก session cookie แบบ httpOnly
 *   3. redirect ตาม role ที่ server ตอบกลับ (ไม่ใช่ที่ client เดา)
 */
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      const auth = await getFirebaseAuth();
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await credential.user.getIdToken();

      const res = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      if (!res.ok) {
        setMessage('Could not start your session. Please try again.');
        setIsLoading(false);
        return;
      }

      const data: { role?: 'ADMIN' | 'CUSTOMER' } = await res.json();

      // อ่าน ?next= จาก URL ตรงๆ แทน useSearchParams() เพื่อไม่ต้องห่อ Suspense
      // (useSearchParams ในหน้าที่ถูก prerender ต้องมี Suspense boundary ไม่งั้น build ไม่ผ่าน)
      const next = new URLSearchParams(window.location.search).get('next');
      const fallback = data.role === 'ADMIN' ? '/admin' : '/dashboard';

      // รับเฉพาะ path ภายในเว็บ กัน open redirect ไปโดเมนอื่น
      const target = next && next.startsWith('/') && !next.startsWith('//') ? next : fallback;

      router.push(target);
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code ?? '';

      // ไม่แยกว่า "ไม่มีอีเมลนี้" กับ "รหัสผิด" เพื่อไม่ให้ใช้หน้านี้ไล่เดาว่า
      // อีเมลไหนมีบัญชีอยู่
      if (
        code === 'auth/invalid-credential' ||
        code === 'auth/wrong-password' ||
        code === 'auth/user-not-found' ||
        code === 'auth/invalid-email'
      ) {
        setMessage('Incorrect email or password.');
      } else if (code === 'auth/too-many-requests') {
        setMessage('Too many attempts. Please wait a moment and try again.');
      } else if (code === 'auth/network-request-failed') {
        setMessage('Network error. Check your connection and try again.');
      } else {
        setMessage('Sign-in failed. Please try again.');
      }

      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-background min-h-screen py-16 px-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Brand Logo & Heading */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md">
              ✦
            </span>
            <span className="font-headline-sm text-lg font-bold text-on-surface">
              PhisitCode
            </span>
          </Link>
          <h1 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Access your code downloads, licenses, and receipts.
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-surface-container-lowest dark:bg-surface/80 rounded-3xl p-6 sm:p-8 border border-outline-variant/20 shadow-xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5"
              >
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/20 focus:outline-none focus:border-primary text-xs font-medium text-on-surface"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="login-password"
                  className="text-xs font-bold text-on-surface uppercase tracking-wider"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="login-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/20 focus:outline-none focus:border-primary text-xs font-medium text-on-surface"
              />
            </div>

            {message && (
              <p
                role="alert"
                className="text-xs font-semibold text-error bg-error-container/60 rounded-xl px-3 py-2"
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-[3px_3px_0px_#141b2b] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#141b2b] active:translate-x-0 active:translate-y-0 active:shadow-[1px_1px_0px_#141b2b] transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                  <span>Verifying Session...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <p className="text-center text-xs text-on-surface-variant mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-primary font-bold hover:underline">
            Create Customer Account
          </Link>
        </p>
      </div>
    </div>
  );
}
