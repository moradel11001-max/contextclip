import React, { useState, useMemo } from 'react';
import { 
  Copy, 
  Check, 
  Download, 
  PlusCircle, 
  Sparkles, 
  Cpu, 
  Coins, 
  Layers, 
  FileCode2 
} from 'lucide-react';
import { ExtractedDocument, LLMTarget, PromptPreset } from '../types';
import { calculateTokenMetrics } from '../lib/tokenizer';
import { formatPromptContext, PROMPT_PRESETS } from '../lib/templates';

interface OutputPanelProps {
  document: ExtractedDocument | null;
  onAddToStack: (doc: ExtractedDocument) => void;
  onOpenProModal: () => void;
  isPro: boolean;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({
  document,
  onAddToStack,
  onOpenProModal,
  isPro,
}) => {
  const [target, setTarget] = useState<LLMTarget>('claude');
  const [preset, setPreset] = useState<PromptPreset>('none');
  const [customPrompt, setCustomPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  // Compute formatted prompt
  const formattedPrompt = useMemo(() => {
    if (!document) return '';
    return formatPromptContext([document], target, preset, customPrompt);
  }, [document, target, preset, customPrompt]);

  // Compute metrics
  const metrics = useMemo(() => {
    if (!document) return null;
    return calculateTokenMetrics(
      ' '.repeat(document.rawLength || document.cleanedLength * 2),
      formattedPrompt
    );
  }, [document, formattedPrompt]);

  const handleCopy = () => {
    if (!formattedPrompt) return;
    navigator.clipboard.writeText(formattedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!formattedPrompt || !document) return;
    const blob = new Blob([formattedPrompt], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement('a');
    link.href = url;
    link.download = `${document.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_context.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!document) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[420px]">
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400">
          <FileCode2 className="w-7 h-7" />
        </div>
        <h3 className="text-base font-semibold text-slate-200 mb-1">
          Ready for Extraction
        </h3>
        <p className="text-xs text-slate-400 max-w-sm">
          Enter a web URL or paste HTML/text on the left. ContextClip will strip the junk and generate ready-to-use LLM prompts.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col h-full">
      {/* Target Model Selector & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
        {/* Model Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setTarget('claude')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              target === 'claude'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Claude (XML)
          </button>
          <button
            onClick={() => setTarget('gemini')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              target === 'gemini'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Gemini
          </button>
          <button
            onClick={() => setTarget('openai')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              target === 'openai'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            OpenAI
          </button>
          <button
            onClick={() => setTarget('raw_markdown')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              target === 'raw_markdown'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Raw Markdown
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAddToStack(document)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-medium border border-slate-700 transition"
            title="Add this document to your context stack"
          >
            <PlusCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Add to Stack</span>
          </button>

          <button
            onClick={handleDownload}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 transition"
            title="Download as Markdown"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold shadow-md transition ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Context'}</span>
          </button>
        </div>
      </div>

      {/* Token Metrics Ribbon */}
      {metrics && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          <div className="bg-slate-950 border border-slate-800/80 p-2.5 rounded-xl">
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>Tokens (est.)</span>
            </div>
            <div className="text-sm font-bold text-white mt-1">
              ~{metrics.tokens.claude.toLocaleString()}
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800/80 p-2.5 rounded-xl">
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
              <Coins className="w-3.5 h-3.5 text-emerald-400" />
              <span>Prompt Cost</span>
            </div>
            <div className="text-sm font-bold text-emerald-400 mt-1">
              ${metrics.estimatedCost.claude.toFixed(4)}
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800/80 p-2.5 rounded-xl">
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Noise Stripped</span>
            </div>
            <div className="text-sm font-bold text-amber-400 mt-1">
              ~{document.savedPercentage}% saved
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800/80 p-2.5 rounded-xl">
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
              <Layers className="w-3.5 h-3.5 text-violet-400" />
              <span>Words / Chars</span>
            </div>
            <div className="text-sm font-bold text-white mt-1">
              {metrics.wordCount} / {metrics.charCount}
            </div>
          </div>
        </div>
      )}

      {/* Preset & Custom Prompt Selector */}
      <div className="mb-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300">
            Prompt Framing Preset:
          </label>
          {!isPro && (
            <button
              onClick={onOpenProModal}
              className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium"
            >
              <Sparkles className="w-3 h-3" />
              <span>Unlock all 12+ Pro Templates</span>
            </button>
          )}
        </div>

        <select
          value={preset}
          onChange={(e) => setPreset(e.target.value as PromptPreset)}
          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 outline-none focus:border-indigo-500"
        >
          {Object.entries(PROMPT_PRESETS).map(([key, config]) => (
            <option key={key} value={key}>
              {config.label}
            </option>
          ))}
        </select>
      </div>

      {/* Output Content Preview */}
      <div className="flex-1 min-h-[260px] relative">
        <textarea
          readOnly
          value={formattedPrompt}
          className="w-full h-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 font-mono resize-none outline-none leading-relaxed select-all"
        />
      </div>
    </div>
  );
};
