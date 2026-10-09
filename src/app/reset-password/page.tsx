'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return;

    setIsSuccess(true);
    setTimeout(() => {
      router.push('/login');
    }, 1500);
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
            Set New Password
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Choose a strong password with at least 8 characters.
          </p>
        </div>

        <div className="bg-surface-container-lowest dark:bg-surface/80 rounded-3xl p-6 sm:p-8 border border-outline-variant/20 shadow-xl backdrop-blur-xl">
          {isSuccess ? (
            <div className="text-center py-4 space-y-2">
              <span className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto material-symbols-outlined text-2xl">
                check_circle
              </span>
              <h3 className="text-sm font-bold text-on-surface">Password Updated!</h3>
              <p className="text-xs text-on-surface-variant">Redirecting to login page...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                  New Password
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

              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  minLength={8}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/20 focus:outline-none focus:border-primary text-xs font-medium text-on-surface"
                />
                {password && confirmPassword && password !== confirmPassword && (
                  <span className="text-[11px] text-error font-medium mt-1 block">
                    Passwords do not match.
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={password !== confirmPassword || password.length < 8}
                className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-[3px_3px_0px_#141b2b] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#141b2b] transition-all cursor-pointer disabled:opacity-50"
              >
                Update Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
