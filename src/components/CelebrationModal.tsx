import React, { useEffect, useState } from 'react';
import { Crown, Sparkles, CheckCircle2, ArrowRight, Download, Copy, Check, AlertTriangle } from 'lucide-react';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  licenseKey?: string | null;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({ 
  isOpen, 
  onClose,
  licenseKey = 'PRO-LIFETIME-ACCESS',
}) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; size: number; delay: number }>>([]);
  const [copied, setCopied] = useState(false);

  const activeKey = licenseKey || 'PRO-LIFETIME-ACCESS';

  useEffect(() => {
    if (isOpen) {
      const colors = ['#6366f1', '#a855f7', '#f59e0b', '#10b981', '#ec4899', '#3b82f6'];
      const newParticles = Array.from({ length: 45 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 40,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.floor(Math.random() * 8) + 6,
        delay: Math.random() * 0.5,
      }));
      setParticles(newParticles);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyKey = () => {
    navigator.clipboard.writeText(activeKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadBackup = () => {
    const text = `========================================
ContextClip Pro — License Key Backup
========================================

License Key:     ${activeKey}
Status:          Active (Lifetime License)
Activation Date: ${new Date().toLocaleString()}
Official Site:   https://contextclip.vercel.app/

IMPORTANT INSTRUCTIONS:
- You are responsible for preserving this license key.
- Save this file in your password manager or secure notes.
- To activate on other browsers or devices, open ContextClip, click "Unlock Pro", and enter this key.

LOST KEY RECOVERY:
If you lose this key on a new device, email your PayPal transaction ID to moradel11001@gmail.com and your access will be restored immediately.
`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contextclip_license_backup_${activeKey.slice(0, 8)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

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

      <div className="w-full max-w-lg bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative text-center overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Glow halo */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/20 blur-3xl rounded-full pointer-events-none" />

        {/* Crown with pulse animation */}
        <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 shadow-xl shadow-amber-500/30 mb-4 animate-pulse">
          <Crown className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Lifetime Access Activated</span>
        </div>

        <h2 className="text-2xl font-black text-white tracking-tight mb-2">
          You&apos;re Officially <span className="text-amber-400">PRO</span>!
        </h2>
        
        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          Your license has been permanently activated in this browser. All features and limits are unlocked.
        </p>

        {/* Key Box with Backup Buttons */}
        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 mb-4 text-left">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Your Lifetime License Key:
            </span>
            <span className="text-[10px] text-amber-400 font-medium">Please Save It</span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <code className="flex-1 px-3 py-2 bg-slate-900 rounded-xl text-amber-300 font-mono text-xs font-bold border border-slate-800 select-all">
              {activeKey}
            </code>
            <button
              onClick={handleCopyKey}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 text-xs flex items-center gap-1 transition"
              title="Copy key"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <button
            onClick={handleDownloadBackup}
            className="w-full py-2 px-3 bg-slate-800/80 hover:bg-slate-800 text-indigo-300 hover:text-white rounded-xl text-xs font-medium border border-slate-700 flex items-center justify-center gap-2 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download License Backup (.txt)</span>
          </button>
        </div>

        {/* User Responsibility & Recovery Notice */}
        <div className="bg-amber-950/30 border border-amber-800/50 p-3 rounded-xl mb-5 text-left flex items-start gap-2.5 text-[11px] text-amber-200/90 leading-relaxed">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-300">Your Responsibility: </span>
            Keep this key safe. If you ever switch browsers or clear data, you will need it to re-activate.
            <p className="text-[10px] text-slate-400 mt-1">
              Lost your key? Forward your PayPal receipt to <code className="text-slate-300">moradel11001@gmail.com</code> for a free instant reissue.
            </p>
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
