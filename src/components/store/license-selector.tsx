'use client';

import React from 'react';
import { LICENSE_OPTIONS, LicenseType, StoreProduct } from '@/types/store';
import { calculateProductPrice } from '@/lib/store';

interface LicenseSelectorProps {
  product: StoreProduct;
  selectedLicense: LicenseType;
  onSelectLicense: (license: LicenseType) => void;
}

export const LicenseSelector: React.FC<LicenseSelectorProps> = ({
  product,
  selectedLicense,
  onSelectLicense,
}) => {
  const availableOptions =
    product.price === 0
      ? LICENSE_OPTIONS.filter((l) => l.id === 'Open Source')
      : LICENSE_OPTIONS.filter((l) => l.id !== 'Open Source');

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="font-label-code text-xs text-on-surface uppercase font-bold tracking-wider">
          Select License Tier
        </label>
        <span className="font-label-code text-[11px] text-tertiary">
          Royalty-free &amp; commercial rights
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {availableOptions.map((option) => {
          const isSelected = selectedLicense === option.id;
          const tierPrice = calculateProductPrice(product.price, option.id);

          return (
            <div
              key={option.id}
              onClick={() => onSelectLicense(option.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                isSelected
                  ? 'bg-primary-fixed/30 border-primary ring-1 ring-primary shadow-xs'
                  : 'bg-surface-container-low border-outline-variant/30 hover:border-outline-variant/60'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-primary bg-primary' : 'border-outline'
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest" />}
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-sm text-on-surface font-bold">
                      {option.name}
                    </span>
                    {option.id === 'Commercial' && (
                      <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-badge text-[10px] font-bold">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    {option.description}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="font-headline-sm text-base font-bold text-on-surface">
                  {tierPrice === 0 ? 'FREE' : `฿${tierPrice.toLocaleString()}`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
