'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'customer' | 'admin'>('customer');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    setTimeout(() => {
      setIsLoading(false);
      if (role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    }, 600);
  };

  const handleQuickLogin = (selectedRole: 'customer' | 'admin') => {
    setIsLoading(true);
    if (selectedRole === 'admin') {
      setEmail('admin@playful-intelligence.dev');
      setPassword('••••••••••••');
      setTimeout(() => router.push('/admin'), 400);
    } else {
      setEmail('customer@example.com');
      setPassword('••••••••••••');
      setTimeout(() => router.push('/dashboard'), 400);
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
          {/* Role Segmented Selector */}
          <div className="p-1 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/15 flex gap-1 mb-6">
            <button
              type="button"
              onClick={() => setRole('customer')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                role === 'customer'
                  ? 'bg-primary text-white shadow-xs font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Customer Account
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                role === 'admin'
                  ? 'bg-primary text-white shadow-xs font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Admin Console
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'admin' ? 'admin@playful-intelligence.dev' : 'you@example.com'}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/20 focus:outline-none focus:border-primary text-xs font-medium text-on-surface"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
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
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/20 focus:outline-none focus:border-primary text-xs font-medium text-on-surface"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none text-on-surface-variant">
                <input type="checkbox" className="rounded text-primary focus:ring-0" defaultChecked />
                <span>Remember this device</span>
              </label>
            </div>

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
                <span>Sign In as {role === 'admin' ? 'Administrator' : 'Customer'}</span>
              )}
            </button>
          </form>

          {/* Quick Evaluation Logins */}
          <div className="mt-6 pt-5 border-t border-surface-container">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block mb-2 text-center">
              Quick Prototype Sign-in:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('customer')}
                className="py-1.5 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-[11px] font-semibold text-on-surface transition-colors text-center"
              >
                👤 Customer Demo
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="py-1.5 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-[11px] font-semibold text-on-surface transition-colors text-center"
              >
                🛡️ Admin Console
              </button>
            </div>
          </div>
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
