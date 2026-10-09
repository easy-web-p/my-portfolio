'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getFirebaseAuth } from '@/lib/firebase';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  /**
   * สมัครสมาชิกจริงด้วย Firebase Auth
   *
   * ของเดิมเป็น setTimeout แล้ว router.push('/dashboard') เฉยๆ ไม่ได้สร้างบัญชี
   * ซึ่งพอมี guard ที่ /dashboard แล้วจะกลายเป็นทางตัน: สมัครเสร็จก็ถูกเด้ง
   * กลับไป /login ทันทีเพราะไม่มี session
   *
   * ขั้นตอน: createUserWithEmailAndPassword -> ตั้ง displayName ->
   * แลก ID token เป็น session cookie ที่ /api/auth/session -> เข้า /dashboard
   * ผู้ใช้ใหม่ได้ role CUSTOMER โดยปริยาย (ไม่มี claim role) การเป็น ADMIN
   * ต้องให้สิทธิ์จากฝั่ง server ด้วย scripts/set-admin-claim.mjs เท่านั้น
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;

    setIsLoading(true);
    setMessage('');

    try {
      const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
      const auth = await getFirebaseAuth();
      const credential = await createUserWithEmailAndPassword(auth, email, password);

      const trimmedName = name.trim();
      if (trimmedName) {
        await updateProfile(credential.user, { displayName: trimmedName });
      }

      // ขอ token ใหม่หลังตั้ง displayName เพื่อให้ claim ที่ติดมาเป็นค่าล่าสุด
      const idToken = await credential.user.getIdToken(true);

      const res = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      if (!res.ok) {
        // บัญชีถูกสร้างแล้วแต่ตั้ง session ไม่สำเร็จ — ส่งไปล็อกอินเอง
        setMessage('Account created, but we could not sign you in. Please use the sign-in page.');
        setIsLoading(false);
        return;
      }

      router.push('/dashboard');
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code ?? '';

      if (code === 'auth/email-already-in-use') {
        setMessage('That email already has an account. Try signing in instead.');
      } else if (code === 'auth/weak-password') {
        setMessage('Please choose a stronger password (at least 8 characters).');
      } else if (code === 'auth/invalid-email') {
        setMessage('That email address does not look valid.');
      } else if (code === 'auth/network-request-failed') {
        setMessage('Network error. Check your connection and try again.');
      } else if (code === 'auth/operation-not-allowed') {
        setMessage('Email sign-in is not enabled for this project yet.');
      } else {
        setMessage('Could not create your account. Please try again.');
      }

      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-background min-h-screen py-16 px-4 flex items-center justify-center">
      <div className="w-full max-w-md">
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
            Create Customer Account
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Unlock your private downloads, license keys, and version updates.
          </p>
        </div>

        <div className="bg-surface-container-lowest dark:bg-surface/80 rounded-3xl p-6 sm:p-8 border border-outline-variant/20 shadow-xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Mercer"
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/20 focus:outline-none focus:border-primary text-xs font-medium text-on-surface"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/20 focus:outline-none focus:border-primary text-xs font-medium text-on-surface"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                Create Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                minLength={8}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/20 focus:outline-none focus:border-primary text-xs font-medium text-on-surface"
              />
            </div>

            <div className="flex items-start gap-2 pt-1 text-xs text-on-surface-variant">
              <input
                type="checkbox"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 rounded text-primary focus:ring-0"
              />
              <span>
                I agree to the{' '}
                <Link href="/terms" className="text-primary font-semibold hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-primary font-semibold hover:underline">
                  Privacy Policy
                </Link>.
              </span>
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
              disabled={isLoading || !agreed}
              className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-hard-3 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-hard-4 active:translate-x-0 active:translate-y-0 active:shadow-hard-1 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Register & Go to Dashboard</span>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-on-surface-variant mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
