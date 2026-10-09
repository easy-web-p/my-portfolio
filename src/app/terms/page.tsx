import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="w-full bg-background min-h-screen py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-primary font-bold">Terms of Service</span>
        </div>

        <div className="bg-surface-container-lowest dark:bg-surface rounded-3xl p-8 sm:p-12 border border-outline-variant/20 shadow-xs space-y-8 text-on-surface">
          <div>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              Legal Agreement
            </span>
            <h1 className="font-headline-lg text-3xl sm:text-4xl font-bold tracking-tight mt-3">
              Terms of Service
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              Effective Date: February 2026 • Version 2.0
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-on-surface-variant">
            <div>
              <h2 className="text-base font-bold text-on-surface mb-2">1. Overview</h2>
              <p>
                By accessing this website, downloading code assets, or purchasing digital templates from PhisitCode (phisitcode.web.app), you agree to be bound by these Terms of Service, all applicable laws and regulations, and our licensing agreements.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-on-surface mb-2">2. Digital Product Licenses</h2>
              <p>
                All source code, templates, and digital toolkits sold through our Code Store are licensed, not sold. Your usage rights are determined by the tier selected at checkout ({' '}
                <Link href="/licenses" className="text-primary font-bold hover:underline">
                  Personal, Commercial, or Extended
                </Link>
                ). You may not re-sell, redistribute, or publicly publish source archives as stand-alone templates.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-on-surface mb-2">3. Download Limits & Token Vault</h2>
              <p>
                Each purchase generates temporary cryptographic download tokens valid for 7 days with a standard allowance of 5 downloads per release. You can regenerate or reset allowances through customer support if files are lost.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-on-surface mb-2">4. Disclaimers & Limitation of Liability</h2>
              <p>
                The digital products and code templates are provided &ldquo;as is&rdquo; without warranty of any kind, express or implied. In no event shall Phisit Kaewkulphisit or affiliates be liable for damages arising out of the use or inability to use the materials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
