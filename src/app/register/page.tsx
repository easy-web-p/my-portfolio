'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 600);
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

            <button
              type="submit"
              disabled={isLoading || !agreed}
              className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-[3px_3px_0px_#141b2b] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#141b2b] active:translate-x-0 active:translate-y-0 active:shadow-[1px_1px_0px_#141b2b] transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
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
