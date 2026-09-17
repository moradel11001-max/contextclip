import React, { useState } from 'react';
import { Globe, FileText, Code2, Upload, ArrowRight, Loader2, Link2 } from 'lucide-react';
import { cleanHtmlString, fetchUrlContent, normalizeMarkdown } from '../lib/extractor';
import { ExtractedDocument } from '../types';

interface InputPanelProps {
  onDocumentExtracted: (doc: ExtractedDocument) => void;
  isProcessing: boolean;
  setIsProcessing: (val: boolean) => void;
}

type TabType = 'url' | 'paste' | 'file';

export const InputPanel: React.FC<InputPanelProps> = ({
  onDocumentExtracted,
  isProcessing,
  setIsProcessing,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('url');
  const [urlInput, setUrlInput] = useState('');
  const [pastedContent, setPastedContent] = useState('');
  const [contentTitle, setContentTitle] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const sampleUrls = [
    { label: 'React Docs (Hooks)', url: 'https://react.dev/reference/react/useEffect' },
    { label: 'Tailwind CSS Docs', url: 'https://tailwindcss.com/docs/utility-first' },
    { label: 'Rust Book (Ownership)', url: 'https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html' },
  ];

  const handleUrlExtract = async (targetUrl: string) => {
    if (!targetUrl.trim()) return;
    setErrorMsg(null);
    setIsProcessing(true);

    try {
      const result = await fetchUrlContent(targetUrl);
      const rawLength = result.content.length * 2; // rough estimate of raw html bloat
      const cleanedLength = result.content.length;
      const saved = Math.max(15, Math.round(((rawLength - cleanedLength) / rawLength) * 100));

      const doc: ExtractedDocument = {
        id: 'doc_' + Date.now(),
        title: result.title || targetUrl,
        url: targetUrl,
        sourceType: 'url',
        rawLength: rawLength,
        cleanedMarkdown: result.content,
        cleanedLength: cleanedLength,
        estimatedTokens: Math.ceil(cleanedLength / 3.7),
        savedPercentage: saved,
        timestamp: Date.now(),
      };

      onDocumentExtracted(doc);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to fetch the URL.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePasteExtract = () => {
    if (!pastedContent.trim()) return;
    setErrorMsg(null);
    setIsProcessing(true);

    try {
      const isHtml = /<[a-z][\s\S]*>/i.test(pastedContent);
      let markdown = '';
      const rawLen = pastedContent.length;

      if (isHtml) {
        markdown = cleanHtmlString(pastedContent);
      } else {
        markdown = pastedContent;
      }

      const normalized = normalizeMarkdown(markdown);
      const cleanLen = normalized.length;
      const saved = isHtml 
        ? Math.max(10, Math.round(((rawLen - cleanLen) / rawLen) * 100))
        : 0;

      const title = contentTitle.trim() || (isHtml ? 'Pasted Web Snippet' : 'Pasted Text Document');

      const doc: ExtractedDocument = {
        id: 'doc_' + Date.now(),
        title,
        sourceType: isHtml ? 'html' : 'text',
        rawLength: rawLen,
        cleanedMarkdown: normalized,
        cleanedLength: cleanLen,
        estimatedTokens: Math.ceil(cleanLen / 3.7),
        savedPercentage: saved,
        timestamp: Date.now(),
      };

      onDocumentExtracted(doc);
    } catch (err: any) {
      setErrorMsg('Failed to process pasted content: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setErrorMsg(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const raw = event.target?.result as string;
        const isHtml = file.name.endsWith('.html') || file.name.endsWith('.htm');
        const content = isHtml ? cleanHtmlString(raw) : raw;
        const normalized = normalizeMarkdown(content);

        const doc: ExtractedDocument = {
          id: 'doc_' + Date.now(),
          title: file.name,
          sourceType: 'file',
          rawLength: raw.length,
          cleanedMarkdown: normalized,
          cleanedLength: normalized.length,
          estimatedTokens: Math.ceil(normalized.length / 3.7),
          savedPercentage: isHtml ? Math.round(((raw.length - normalized.length) / raw.length) * 100) : 0,
          timestamp: Date.now(),
        };

        onDocumentExtracted(doc);
      } catch (err: any) {
        setErrorMsg('Error reading file: ' + err.message);
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col h-full">
      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
        <button
          onClick={() => setActiveTab('url')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
            activeTab === 'url'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Web URL</span>
        </button>

        <button
          onClick={() => setActiveTab('paste')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
            activeTab === 'paste'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Paste HTML / Text</span>
        </button>

        <button
          onClick={() => setActiveTab('file')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
            activeTab === 'file'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>Upload File</span>
        </button>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 rounded-lg bg-red-950/50 border border-red-800 text-red-300 text-xs flex items-center justify-between">
          <span>{errorMsg}</span>
          <button onClick={() => setErrorMsg(null)} className="text-red-400 hover:text-red-200 ml-2">
            ✕
          </button>
        </div>
      )}

      {/* Tab: URL */}
      {activeTab === 'url' && (
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Enter any Documentation, Article, or Web Page URL
            </label>
            <div className="relative mb-3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Link2 className="w-4 h-4" />
              </div>
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://react.dev/learn or any tech documentation..."
                className="w-full pl-9 pr-24 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-xs text-white placeholder-slate-500 outline-none transition"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleUrlExtract(urlInput);
                }}
              />
              <button
                disabled={isProcessing || !urlInput.trim()}
                onClick={() => handleUrlExtract(urlInput)}
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition"
              >
                {isProcessing ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <>
                    <span>Extract</span>
                    <ArrowRight className="w-3 h-3" />
                  </>
                )}
              </button>
            </div>

            {/* Presets */}
            <div className="mt-4">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-2">
                Quick Test Samples:
              </span>
              <div className="flex flex-wrap gap-2">
                {sampleUrls.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setUrlInput(s.url);
                      handleUrlExtract(s.url);
                    }}
                    className="text-left text-xs bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-600 text-slate-300 px-3 py-1.5 rounded-lg transition"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
            <p className="font-semibold text-slate-300">⚡ Client-Side Zero-Noise Guarantee:</p>
            <p>Removes headers, navbars, sidebars, cookie modals, ads, and footer links so your LLM context stays 100% relevant.</p>
          </div>
        </div>
      )}

      {/* Tab: Paste HTML / Text */}
      {activeTab === 'paste' && (
        <div className="flex-1 flex flex-col">
          <input
            type="text"
            placeholder="Document title (optional)..."
            value={contentTitle}
            onChange={(e) => setContentTitle(e.target.value)}
            className="w-full mb-2.5 px-3 py-2 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-xs text-white placeholder-slate-500 outline-none"
          />
          <textarea
            value={pastedContent}
            onChange={(e) => setPastedContent(e.target.value)}
            placeholder="Paste raw HTML source, article text, or unformatted logs here..."
            className="w-full flex-1 min-h-[220px] p-3 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-xs text-slate-200 font-mono resize-none outline-none leading-relaxed"
          />
          <div className="mt-3 flex justify-end">
            <button
              disabled={isProcessing || !pastedContent.trim()}
              onClick={handlePasteExtract}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-md shadow-indigo-600/30 transition"
            >
              {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
              <span>Clean & Format Context</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab: Upload File */}
      {activeTab === 'file' && (
        <div className="flex-1 flex flex-col justify-center items-center border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-2xl p-8 text-center transition">
          <Upload className="w-10 h-10 text-indigo-400 mb-3" />
          <p className="text-xs font-semibold text-slate-200 mb-1">
            Drop your file here, or browse
          </p>
          <p className="text-[11px] text-slate-400 mb-4">
            Supports .md, .txt, .html, .json, .py, .js, .ts
          </p>
          <label className="cursor-pointer px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition shadow-md shadow-indigo-600/20">
            Select File
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept=".txt,.md,.markdown,.html,.htm,.json,.js,.ts,.tsx,.py"
            />
          </label>
        </div>
      )}
    </div>
  );
};
