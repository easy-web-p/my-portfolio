'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
            Reset Password
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Enter your email to receive recovery instructions.
          </p>
        </div>

        <div className="bg-surface-container-lowest dark:bg-surface/80 rounded-3xl p-6 sm:p-8 border border-outline-variant/20 shadow-xl backdrop-blur-xl">
          {submitted ? (
            <div className="text-center py-4 space-y-3">
              <span className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto material-symbols-outlined text-2xl">
                mark_email_read
              </span>
              <h3 className="text-sm font-bold text-on-surface">Recovery Email Sent</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                If an account exists for <strong className="text-on-surface">{email}</strong>, you will receive password reset instructions shortly.
              </p>
              <Link
                href="/login"
                className="mt-4 inline-block w-full py-2.5 rounded-xl bg-primary text-white text-xs font-bold"
              >
                Return to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                  Account Email
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

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-[3px_3px_0px_#141b2b] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#141b2b] transition-all cursor-pointer"
              >
                Send Reset Link
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-on-surface-variant mt-6">
          Remembered your password?{' '}
          <Link href="/login" className="text-primary font-bold hover:underline">
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
