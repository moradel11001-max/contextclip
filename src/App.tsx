import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';
import { StackPanel } from './components/StackPanel';
import { ProModal } from './components/ProModal';
import { LegalModal } from './components/LegalModal';
import { ConsentBanner } from './components/ConsentBanner';
import { ExtractedDocument, LicenseState } from './types';
import { getLicenseState } from './lib/license';
import { Sparkles, Terminal, ArrowUpRight, ShieldCheck } from 'lucide-react';

export function App() {
  const [currentDocument, setCurrentDocument] = useState<ExtractedDocument | null>(null);
  const [stack, setStack] = useState<ExtractedDocument[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [isStackOpen, setIsStackOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'terms' | 'privacy'>('terms');
  const [license, setLicense] = useState<LicenseState>({
    isPro: false,
    licenseKey: null,
    activatedAt: null,
  });

  const handleOpenLegal = (tab: 'terms' | 'privacy') => {
    setLegalTab(tab);
    setIsLegalModalOpen(true);
  };

  useEffect(() => {
    setLicense(getLicenseState());
  }, []);

  const handleDocumentExtracted = (doc: ExtractedDocument) => {
    setCurrentDocument(doc);
  };

  const handleAddToStack = (doc: ExtractedDocument) => {
    if (!license.isPro && stack.length >= 2) {
      setIsProModalOpen(true);
      return;
    }

    if (!stack.some(d => d.id === doc.id)) {
      setStack(prev => [...prev, doc]);
    }
  };

  const handleRemoveFromStack = (id: string) => {
    setStack(prev => prev.filter(d => d.id !== id));
  };

  const handleClearStack = () => {
    setStack([]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Value Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-indigo-900/40 text-[11px] text-indigo-300 py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>
          Stop wasting token context on ads, navigation, and bloated HTML. Feed clean, structured context to Claude, ChatGPT & Gemini.
        </span>
      </div>

      {/* Navbar */}
      <Navbar
        license={license}
        onOpenProModal={() => setIsProModalOpen(true)}
        stackCount={stack.length}
        onOpenStack={() => setIsStackOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch">
          {/* Left Column: Extraction & Inputs (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col">
            <InputPanel
              onDocumentExtracted={handleDocumentExtracted}
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
            />
          </div>

          {/* Right Column: Cleaned Context, Presets & Output (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col">
            <OutputPanel
              document={currentDocument}
              onAddToStack={handleAddToStack}
              onOpenProModal={() => setIsProModalOpen(true)}
              isPro={license.isPro}
            />
          </div>
        </div>

        {/* Value Proposition / Social Proof Footer Bar */}
        <div className="border-t border-slate-900 pt-6 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Built for developers & AI power users. 100% Client-Side Privacy.</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <button
              onClick={() => handleOpenLegal('terms')}
              className="hover:text-slate-300 transition underline underline-offset-2"
            >
              Terms of Service
            </button>
            <span>•</span>
            <button
              onClick={() => handleOpenLegal('privacy')}
              className="hover:text-slate-300 transition underline underline-offset-2"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setIsProModalOpen(true)}
              className="text-amber-400 hover:text-amber-300 transition flex items-center gap-1 font-semibold"
            >
              <span>Unlock Pro ($12)</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <p className="text-[10px] text-slate-600 text-center mt-2">
          © 2026 ContextClip. All rights reserved. Independent software utility. Not affiliated with Anthropic, OpenAI, or Google.
        </p>
      </main>

      {/* Modals & Drawers */}
      <StackPanel
        isOpen={isStackOpen}
        onClose={() => setIsStackOpen(false)}
        stack={stack}
        onRemoveFromStack={handleRemoveFromStack}
        onClearStack={handleClearStack}
        onLoadIntoEditor={(doc) => setCurrentDocument(doc)}
      />

      <ProModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
        onLicenseUpdated={() => setLicense(getLicenseState())}
        onOpenLegal={handleOpenLegal}
        isPro={license.isPro}
      />

      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        defaultTab={legalTab}
      />

      <ConsentBanner onOpenLegal={handleOpenLegal} />
    </div>
  );
}

export default App;
