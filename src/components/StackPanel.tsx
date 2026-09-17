import React, { useState } from 'react';
import { Layers, Trash2, X, Copy, Check, Download, ArrowRight } from 'lucide-react';
import { ExtractedDocument, LLMTarget, PromptPreset } from '../types';
import { formatPromptContext } from '../lib/templates';

interface StackPanelProps {
  isOpen: boolean;
  onClose: () => void;
  stack: ExtractedDocument[];
  onRemoveFromStack: (id: string) => void;
  onClearStack: () => void;
  onLoadIntoEditor: (doc: ExtractedDocument) => void;
}

export const StackPanel: React.FC<StackPanelProps> = ({
  isOpen,
  onClose,
  stack,
  onRemoveFromStack,
  onClearStack,
  onLoadIntoEditor,
}) => {
  const [copied, setCopied] = useState(false);
  const [target, setTarget] = useState<LLMTarget>('claude');
  const [preset, setPreset] = useState<PromptPreset>('none');

  if (!isOpen) return null;

  const combinedPrompt = formatPromptContext(stack, target, preset);

  const handleCopyCombined = () => {
    if (!combinedPrompt) return;
    navigator.clipboard.writeText(combinedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCombined = () => {
    if (!combinedPrompt) return;
    const blob = new Blob([combinedPrompt], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `context_stack_${stack.length}_docs.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const totalTokens = stack.reduce((sum, doc) => sum + doc.estimatedTokens, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h3 className="font-semibold text-sm text-white">Context Stack ({stack.length})</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stack Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {stack.length === 0 ? (
            <div className="text-center py-16 text-slate-500 text-xs">
              <Layers className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-400" />
              <p>Your stack is empty.</p>
              <p className="mt-1">Add documents or web pages to combine them into one prompt.</p>
            </div>
          ) : (
            stack.map((doc, index) => (
              <div
                key={doc.id}
                className="bg-slate-950 border border-slate-800 hover:border-slate-750 p-3 rounded-xl transition flex flex-col gap-1.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-medium text-xs text-white line-clamp-1">
                    {index + 1}. {doc.title}
                  </span>
                  <button
                    onClick={() => onRemoveFromStack(doc.id)}
                    className="text-slate-500 hover:text-red-400 p-0.5 rounded transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>~{doc.estimatedTokens.toLocaleString()} tokens</span>
                  <button
                    onClick={() => {
                      onLoadIntoEditor(doc);
                      onClose();
                    }}
                    className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    <span>View in Editor</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Merge Actions */}
        {stack.length > 0 && (
          <div className="p-4 border-t border-slate-800 bg-slate-950/80 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Total Stack Tokens:</span>
              <span className="font-bold text-indigo-400">~{totalTokens.toLocaleString()}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleDownloadCombined}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-xl text-xs font-medium border border-slate-700 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .md</span>
              </button>

              <button
                onClick={handleCopyCombined}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold shadow-md transition ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Stack!' : 'Copy Stack'}</span>
              </button>
            </div>

            <button
              onClick={onClearStack}
              className="w-full text-center text-xs text-slate-500 hover:text-red-400 transition pt-1"
            >
              Clear Entire Stack
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
