'use client';

import React, { useState, useEffect } from 'react';
import { Smartphone, Tablet, Monitor, RefreshCw, Sun, Moon } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const [device, setDevice] = useState<'iphone' | 'android' | 'fluid'>('iphone');
  const [currentTime, setCurrentTime] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#f0ede6] dark:bg-[#0d1117] flex flex-col items-center justify-start py-0 sm:py-6 transition-colors selection:bg-secondary-container">
      {/* Desktop Device Toolbar (Visible only on desktop screens) */}
      <aside aria-label="Device Simulator Controls" className="hidden sm:flex items-center justify-between gap-4 w-full max-w-[500px] mb-4 px-4 py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full shadow-sm border border-outline-variant/40 text-xs font-display">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-bold text-on-surface">Mobile Preview</span>
          <span className="text-on-surface-variant font-mono text-[11px]">(430px)</span>
        </div>

        {/* Device Switcher Pills */}
        <div className="flex items-center gap-1 bg-surface-container/80 p-1 rounded-full border border-outline-variant/30">
          <button
            onClick={() => setDevice('iphone')}
            className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
              device === 'iphone'
                ? 'bg-[#111827] text-white shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            iPhone
          </button>
          <button
            onClick={() => setDevice('android')}
            className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
              device === 'android'
                ? 'bg-[#111827] text-white shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Pixel
          </button>
          <button
            onClick={() => setDevice('fluid')}
            className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
              device === 'fluid'
                ? 'bg-[#111827] text-white shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Clean
          </button>
        </div>
      </aside>

      {/* Main Mobile Chassis / Screen Wrapper */}
      <div
        className={`w-full transition-all duration-300 relative ${
          device === 'iphone'
            ? 'sm:max-w-[430px] sm:rounded-[50px] sm:border-[10px] sm:border-[#1e293b] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] sm:ring-1 sm:ring-white/20 overflow-hidden'
            : device === 'android'
            ? 'sm:max-w-[430px] sm:rounded-[40px] sm:border-[8px] sm:border-[#27272a] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden'
            : 'sm:max-w-[448px] sm:rounded-[32px] sm:border sm:border-outline-variant/50 sm:shadow-2xl overflow-hidden'
        } bg-surface min-h-screen sm:min-h-[880px] flex flex-col`}
      >
        {/* Mobile Status Bar (Visible on desktop inside mockup frame) */}
        {device === 'iphone' && (
          <div className="hidden sm:flex items-center justify-between px-7 pt-3 pb-1 text-on-surface z-50 bg-surface/90 backdrop-blur-md select-none">
            <span className="font-display font-black text-xs tracking-tight">{currentTime}</span>

            {/* Dynamic Island Pill */}
            <div className="w-24 h-6 rounded-full bg-black flex items-center justify-end px-2 gap-1.5 shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-primary/40 ring-1 ring-primary/60"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>

            <div className="flex items-center gap-1.5 font-sans text-xs">
              <span className="text-[10px] font-bold">5G</span>
              <div className="w-4 h-2.5 border border-on-surface rounded-xs p-0.5 flex items-center">
                <div className="h-full w-full bg-on-surface rounded-2xs"></div>
              </div>
            </div>
          </div>
        )}

        {device === 'android' && (
          <div className="hidden sm:flex items-center justify-between px-6 pt-2 pb-1 text-on-surface z-50 bg-surface/90 backdrop-blur-md select-none">
            <span className="font-display font-bold text-xs">{currentTime}</span>

            {/* Android Punch Hole Camera */}
            <div className="w-3.5 h-3.5 rounded-full bg-black ring-1 ring-zinc-800"></div>

            <div className="flex items-center gap-2 text-xs">
              <span>LTE</span>
              <span>100%</span>
            </div>
          </div>
        )}

        {/* Scrollable Viewport Container */}
        <div className="flex-1 flex flex-col w-full relative">
          {children}
        </div>

        {/* iPhone Home Indicator Line */}
        {device === 'iphone' && (
          <div className="hidden sm:flex justify-center py-2 bg-surface select-none pointer-events-none">
            <div className="w-32 h-1 bg-on-surface/40 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};
