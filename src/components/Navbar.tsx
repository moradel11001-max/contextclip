import React from 'react';
import { Sparkles, Crown, Terminal, Layers } from 'lucide-react';
import { LicenseState } from '../types';

interface NavbarProps {
  license: LicenseState;
  onOpenProModal: () => void;
  stackCount: number;
  onOpenStack: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  license,
  onOpenProModal,
  stackCount,
  onOpenStack,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white">ContextClip</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                v1.0
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Zero-Noise Web & Docs to AI Context</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Stack Drawer Button */}
          <button
            onClick={onOpenStack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-750 text-slate-200 text-xs font-medium transition"
          >
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Context Stack</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-indigo-500 text-white">
              {stackCount}
            </span>
          </button>

          {/* Pro Status Button */}
          {license.isPro ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>PRO ACTIVE</span>
            </div>
          ) : (
            <button
              onClick={onOpenProModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-semibold text-xs shadow-md shadow-amber-500/20 transition transform active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Unlock Pro ($12)</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
