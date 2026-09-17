import React, { useState } from 'react';
import { Crown, Sparkles, Check, X, Key, CreditCard, ExternalLink, ShieldCheck } from 'lucide-react';
import { activateLicense, PAYMENT_LINKS } from '../lib/license';

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLicenseUpdated: () => void;
  onOpenLegal: (tab: 'terms' | 'privacy') => void;
  onActivationSuccess?: () => void;
  isPro: boolean;
}

export const ProModal: React.FC<ProModalProps> = ({
  isOpen,
  onClose,
  onLicenseUpdated,
  onOpenLegal,
  onActivationSuccess,
  isPro,
}) => {
  const [keyInput, setKeyInput] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyInput.trim()) return;

    const res = activateLicense(keyInput);
    if (res.success) {
      setMessage({ text: res.message, isError: false });
      onLicenseUpdated();
      setTimeout(() => {
        onClose();
        if (onActivationSuccess) {
          onActivationSuccess();
        }
      }, 500);
    } else {
      setMessage({ text: res.message, isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 mb-3 shadow-lg shadow-amber-500/10">
            <Crown className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            ContextClip <span className="text-amber-400">Pro</span> Lifetime Pass
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Supercharge your LLM workflow with unlimited multi-doc stacks and premium presets.
          </p>
        </div>

        {/* Pricing badge */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-3xl font-extrabold text-white">$12</span>
          <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            One-Time / Forever
          </span>
        </div>

        {/* Feature List */}
        <div className="space-y-2.5 mb-6 text-xs text-slate-300">
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3" />
            </div>
            <span><strong>Unlimited Multi-Document Stacker</strong> (Merge 10+ docs into 1 prompt)</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3" />
            </div>
            <span><strong>All 12+ Pro Prompt Presets</strong> (Security Audits, Architecture, Bug Analysis)</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3" />
            </div>
            <span><strong>Chrome Extension Package</strong> (Instant 1-click browser clipping)</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3" />
            </div>
            <span><strong>Save 30%–60% on API Token Bills</strong> with intelligent noise stripping</span>
          </div>
        </div>

        {/* Pre-Payment Terms Checkbox */}
        <div className="mb-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800">
          <label className="flex items-start gap-2.5 text-[11px] text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => {
                setAgreedToTerms(e.target.checked);
                if (e.target.checked) setTermsError(false);
              }}
              className="mt-0.5 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0 w-4 h-4 shrink-0"
            />
            <span>
              I have read and agree to the{' '}
              <button
                type="button"
                onClick={() => onOpenLegal('terms')}
                className="text-indigo-400 underline hover:text-indigo-300 font-medium"
              >
                Terms of Service
              </button>{' '}
              and{' '}
              <button
                type="button"
                onClick={() => onOpenLegal('privacy')}
                className="text-indigo-400 underline hover:text-indigo-300 font-medium"
              >
                Privacy Policy
              </button>
              . I understand this is an immediate digital software license provided as-is.
            </span>
          </label>
          {termsError && (
            <p className="text-[11px] text-red-400 mt-2 font-medium">
              ⚠️ Please check the box above to accept the terms before proceeding to checkout.
            </p>
          )}
        </div>

        {/* Buy Buttons */}
        <div className="space-y-2.5 mb-6">
          <button
            type="button"
            onClick={() => {
              if (!agreedToTerms) {
                setTermsError(true);
                return;
              }
              window.open(PAYMENT_LINKS.paypal, '_blank', 'noopener,noreferrer');
            }}
            className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition transform active:scale-98 ${
              agreedToTerms
                ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 shadow-amber-500/25 cursor-pointer'
                : 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed opacity-80'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay $12 with PayPal / Cards</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Official PayPal Checkout (PayPal Balance, Visa, Mastercard, Amex)</span>
          </div>
        </div>

        {/* License Activation Form */}
        <form onSubmit={handleActivate} className="border-t border-slate-800 pt-5">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-indigo-400" />
              <span>License Key Activation:</span>
            </label>
            <button
              type="button"
              onClick={() => setKeyInput('PRO-LIFETIME-ACCESS')}
              className="text-[10px] text-amber-400 hover:text-amber-300 font-mono underline"
            >
              Fill: PRO-LIFETIME-ACCESS
            </button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="e.g. PRO-LIFETIME-ACCESS"
              className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 uppercase font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md transition"
            >
              Activate
            </button>
          </div>

          {message && (
            <p className={`mt-2 text-xs ${message.isError ? 'text-red-400' : 'text-emerald-400'}`}>
              {message.text}
            </p>
          )}

          <p className="mt-2 text-[10px] text-slate-400 text-center">
            After completing your PayPal checkout, enter <code className="text-amber-300 font-mono font-semibold">PRO-LIFETIME-ACCESS</code> above to unlock Pro.
          </p>
        </form>
      </div>
    </div>
  );
};
