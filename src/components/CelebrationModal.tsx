import React, { useEffect, useState } from 'react';
import { Crown, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({ isOpen, onClose }) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; size: number; delay: number }>>([]);

  useEffect(() => {
    if (isOpen) {
      // Generate 40 celebratory confetti particles
      const colors = ['#6366f1', '#a855f7', '#f59e0b', '#10b981', '#ec4899', '#3b82f6'];
      const newParticles = Array.from({ length: 45 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // percentage
        y: Math.random() * 40,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.floor(Math.random() * 8) + 6,
        delay: Math.random() * 0.5,
      }));
      setParticles(newParticles);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      {/* Falling Confetti Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full animate-bounce opacity-80"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              animationDuration: `${1.5 + Math.random()}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-8 shadow-2xl relative text-center overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Glow halo */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/20 blur-3xl rounded-full pointer-events-none" />

        {/* Crown with pulse animation */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 shadow-xl shadow-amber-500/30 mb-5 animate-pulse">
          <Crown className="w-10 h-10" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Lifetime Access Activated</span>
        </div>

        <h2 className="text-2xl font-black text-white tracking-tight mb-2">
          You&apos;re Officially <span className="text-amber-400">PRO</span>!
        </h2>
        
        <p className="text-xs text-slate-300 mb-6 leading-relaxed">
          Your lifetime license key has been verified and permanently attached to this browser. All limits have been removed.
        </p>

        {/* Unlocked checklist */}
        <div className="space-y-2.5 text-left bg-slate-950/80 p-4 rounded-2xl border border-slate-800 mb-6 text-xs text-slate-300">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>Unlimited Multi-Document Stack</strong> (Merge 10+ pages)</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>All 12+ Pro AI Prompt Presets</strong> Unlocked</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>Zero-Noise Cleaner & Token Estimator</strong> Active</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition transform active:scale-98"
        >
          <span>Start Using Pro Features</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
