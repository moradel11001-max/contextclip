import React, { useState } from 'react';
import { ShieldCheck, X, FileText, Lock } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'terms' | 'privacy';
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'terms',
}) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>(defaultTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Legal & Compliance</h2>
            <p className="text-xs text-slate-400">ContextClip Terms of Service & Privacy Policy</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
          <button
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'terms'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Terms of Service</span>
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'privacy'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Privacy Policy</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 text-xs text-slate-300 leading-relaxed font-sans">
          {activeTab === 'terms' ? (
            <>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">1. Acceptance of Terms</h3>
                <p>
                  By accessing or using ContextClip (the &quot;Software&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Software.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-1">2. Description of Service</h3>
                <p>
                  ContextClip is a client-side productivity utility designed to clean web content, code snippets, and documentation into structured Markdown context optimized for AI language models. The Software operates directly within your web browser.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-1">3. Third-Party Trademarks & Independence</h3>
                <p>
                  ContextClip is an independent productivity software tool. It is not affiliated with, endorsed by, sponsored by, or associated with Anthropic PBC (Claude), OpenAI Inc. (ChatGPT), or Google LLC (Gemini). All product names, logos, and brands are property of their respective owners.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-1">4. User Responsibility for Content & Copyright</h3>
                <p>
                  You are solely responsible for any web pages, code snippets, or text you import, extract, or process using ContextClip. You agree not to use the Software to violate the intellectual property rights, terms of service, or copyright of any third-party website or entity.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-1">5. Digital Goods & Lifetime License</h3>
                <p>
                  The ContextClip Pro Lifetime Pass is a digital software license granted for personal or commercial developer use. Upon purchase, buyers receive instant access to Pro capabilities (unlimited context stacking and premium prompt presets). Because this is a digital software tool with immediate access, all sales are considered final unless required by applicable local consumer law.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-1">6. Disclaimer of Warranties (&quot;AS-IS&quot;)</h3>
                <p className="uppercase text-[11px] text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-1">7. Contact & Inquiries</h3>
                <p>
                  For any support, bug reports, or legal inquiries, please contact the developer via the official repository or by emailing <code className="text-indigo-400">moradel11001@gmail.com</code>.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">1. Client-Side Privacy Guarantee</h3>
                <p>
                  ContextClip respects your privacy. All text extraction, noise removal, token estimation, and prompt formatting operations run <strong>100% client-side inside your browser</strong>. We do not transmit, collect, or store your extracted documents, code snippets, or prompts on our servers.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-1">2. Local Storage Usage</h3>
                <p>
                  ContextClip uses your browser&apos;s standard <code className="text-indigo-400">localStorage</code> solely to save your personal preferences (such as your Pro license activation status and legal terms consent). This data remains strictly on your local device.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-1">3. Third-Party Payment Processing</h3>
                <p>
                  Payments for ContextClip Pro are processed securely by PayPal. When you make a purchase, your payment transaction details are handled directly by PayPal in accordance with <a href="https://www.paypal.com/webapps/mpp/ua/privacy-full" target="_blank" rel="noreferrer" className="text-indigo-400 underline">PayPal&apos;s Privacy Statement</a>. ContextClip never sees, handles, or stores your credit card or financial account numbers.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-1">4. Analytics & Cookies</h3>
                <p>
                  ContextClip does not use third-party tracking cookies or advertising pixels. We believe developer tools should be fast, private, and noise-free.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition"
          >
            I Understand & Close
          </button>
        </div>
      </div>
    </div>
  );
};
