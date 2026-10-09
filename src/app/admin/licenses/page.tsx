'use client';

import React, { useState } from 'react';

interface LicenseTier {
  id: string;
  name: string;
  slug: string;
  priceMultiplier: number;
  appsAllowed: string;
  supportMonths: number;
  updateMonths: number;
  activeCount: number;
  rights: string[];
}

const INITIAL_LICENSES: LicenseTier[] = [
  {
    id: 'lic-personal',
    name: 'Personal / Indie License',
    slug: 'personal',
    priceMultiplier: 1.0,
    appsAllowed: '1 Personal Project',
    supportMonths: 3,
    updateMonths: 6,
    activeCount: 184,
    rights: [
      'Single personal, non-commercial web project or portfolio',
      'Full TypeScript & Next.js source code access',
      'Private GitHub repository usage',
      'No client handoff or monetization'
    ]
  },
  {
    id: 'lic-commercial',
    name: 'Commercial Standard License',
    slug: 'commercial',
    priceMultiplier: 1.8,
    appsAllowed: 'Unlimited Client & Commercial Projects',
    supportMonths: 12,
    updateMonths: 12,
    activeCount: 102,
    rights: [
      'Unlimited client deliverables and commercial SaaS applications',
      'Charge end-users or deploy behind subscription paywalls',
      'Priority email & Discord direct support',
      '12 months of free version releases'
    ]
  },
  {
    id: 'lic-extended',
    name: 'Extended Enterprise / Team License',
    slug: 'extended',
    priceMultiplier: 3.5,
    appsAllowed: 'Unlimited Team & Redistributable Integrations',
    supportMonths: 24,
    updateMonths: 24,
    activeCount: 38,
    rights: [
      'Full team usage across unlimited developers in an organization',
      'White-label redistribution inside proprietary client toolkits',
      'Direct architecture consultation (1 hour kickoff call)',
      '24 months of major version updates & security audits'
    ]
  }
];

export default function AdminLicensesPage() {
  const [licenses, setLicenses] = useState<LicenseTier[]>(INITIAL_LICENSES);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-sm text-2xl font-bold text-on-surface">Digital Product Licenses</h1>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Configure licensing tiers, pricing multipliers, commercial rights, and update eligibility windows.
          </p>
        </div>
        <button
          onClick={() => alert('Add License Tier modal opened.')}
          className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-[3px_3px_0px_#141b2b] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#141b2b] transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>New License Tier</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {licenses.map((lic) => (
          <div
            key={lic.id}
            className="bg-surface-container-lowest dark:bg-surface/80 rounded-3xl p-6 border border-outline-variant/20 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-surface-container">
                <span className="text-[11px] font-bold text-primary font-mono uppercase">Tier Multiplier: {lic.priceMultiplier}x</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                  {lic.activeCount} Active
                </span>
              </div>

              <h2 className="font-headline-sm text-lg font-bold text-on-surface">{lic.name}</h2>
              <p className="text-xs font-semibold text-on-surface-variant mt-1">{lic.appsAllowed}</p>

              <div className="mt-4 p-3 rounded-xl bg-surface-container-low dark:bg-surface-container-highest/20 border border-outline-variant/15 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Update Window:</span>
                  <span className="font-mono font-bold text-on-surface">{lic.updateMonths} Months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Support SLA:</span>
                  <span className="font-mono font-bold text-on-surface">{lic.supportMonths} Months</span>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">Permitted Usage Rights:</span>
                {lic.rights.map((r, i) => (
                  <div key={i} className="text-xs text-on-surface-variant flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-surface-container flex items-center justify-between">
              <span className="text-xs text-on-surface-variant font-mono">id: {lic.slug}</span>
              <button
                onClick={() => alert(`Editing license: ${lic.name}`)}
                className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface transition-colors cursor-pointer"
              >
                Edit Rules
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
