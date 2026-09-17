import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface ConsentBannerProps {
  onOpenLegal: (tab: 'terms' | 'privacy') => void;
}

const CONSENT_KEY = 'contextclip_legal_consent';

export const ConsentBanner: React.FC<ConsentBannerProps> = ({ onOpenLegal }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem(CONSENT_KEY);
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, new Date().toISOString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 p-3 sm:p-4 bg-slate-900/95 border-t border-slate-800 backdrop-blur-md shadow-2xl animate-in fade-in slide-in-from-bottom duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3 text-slate-300">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-white">Terms of Service & Privacy Notice</p>
            <p className="text-slate-400 text-[11px]">
              ContextClip processes all web & document context 100% locally in your browser. By using this tool, you agree to our{' '}
              <button
                onClick={() => onOpenLegal('terms')}
                className="text-indigo-400 underline hover:text-indigo-300 font-medium"
              >
                Terms of Service
              </button>{' '}
              and{' '}
              <button
                onClick={() => onOpenLegal('privacy')}
                className="text-indigo-400 underline hover:text-indigo-300 font-medium"
              >
                Privacy Policy
              </button>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
          <button
            onClick={() => onOpenLegal('terms')}
            className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-medium transition"
          >
            Review Terms
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition"
          >
            <span>Accept & Continue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
