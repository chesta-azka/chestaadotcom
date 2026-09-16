import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link2, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface LinkSuggestion {
  original: string;
  url: string;
  anchorText: string;
}

export default function ContextualInternalLinker() {
  const [content, setContent] = useState('');
  const [processedContent, setProcessedContent] = useState('');
  const [suggestions, setSuggestions] = useState<LinkSuggestion[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Link dictionary mapping keywords to high-authority service pages
  const linkDictionary = [
    { pattern: /(jasa )?pembuatan website/gi, url: '/services', targetAnchor: 'pembuatan website' },
    { pattern: /solusi IT/gi, url: '/services', targetAnchor: 'solusi IT' },
    { pattern: /(otomatisasi|agentic) AI/gi, url: '/services', targetAnchor: 'otomatisasi AI' },
    { pattern: /digital marketing/gi, url: '/services', targetAnchor: 'digital marketing' },
    { pattern: /local SEO|optimasi AEO/gi, url: '/services', targetAnchor: 'optimasi SEO lokal' },
    { pattern: /(BSD City|Cisauk|Tangerang)/gi, url: '/area/$1', targetAnchor: '$1', formatUrl: (match: string) => `/area/${match.toLowerCase().replace(/\s+/g, '-')}` }
  ];

  const handleProcess = () => {
    if (!content.trim()) return;
    setIsProcessing(true);

    setTimeout(() => {
      let resultText = content;
      const foundSuggestions: LinkSuggestion[] = [];

      // Protect existing markdown links by temporarily replacing them
      const existingLinks: string[] = [];
      resultText = resultText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match) => {
        existingLinks.push(match);
        return `__EXISTING_LINK_${existingLinks.length - 1}__`;
      });

      linkDictionary.forEach(dict => {
        // Track if we already added a link for this pattern to avoid over-linking (spamming)
        let linkAddedCount = 0;

        resultText = resultText.replace(dict.pattern, (match) => {
          // Max 2 links per term
          if (linkAddedCount >= 2) return match;
          
          linkAddedCount++;
          const finalUrl = dict.formatUrl ? dict.formatUrl(match) : dict.url;
          
          foundSuggestions.push({
            original: match,
            anchorText: dict.targetAnchor.includes('$1') ? match : dict.targetAnchor,
            url: finalUrl
          });

          return `[${match}](${finalUrl})`;
        });
      });

      // Restore existing markdown links
      existingLinks.forEach((link, idx) => {
        resultText = resultText.replace(`__EXISTING_LINK_${idx}__`, link);
      });

      setProcessedContent(resultText);
      setSuggestions(foundSuggestions);
      setIsProcessing(false);
      setCopied(false);
    }, 800);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(processedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
        <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
          <Link2 size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Contextual Internal Linker</h3>
          <p className="text-sm text-slate-500">Inject high-authority service links ke dalam artikel</p>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
          {/* Input Area */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Raw Text / Markdown</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste body paragraf artikel atau case study..."
              className="w-full flex-1 min-h-[200px] p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none font-sans"
            />
          </div>

          {/* Output Area */}
          <div className="flex flex-col gap-2 relative">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Processed Output</label>
              {processedContent && (
                <button 
                  onClick={copyToClipboard}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  {copied ? <CheckCircle2 size={14} /> : <Link2 size={14} />}
                  {copied ? 'Tersalin!' : 'Copy Result'}
                </button>
              )}
            </div>
            
            <textarea
              readOnly
              value={processedContent}
              placeholder="Hasil injeksi link akan muncul di sini..."
              className="w-full flex-1 min-h-[200px] p-4 bg-emerald-50/30 border border-emerald-100 rounded-lg text-sm text-slate-700 focus:outline-none custom-scrollbar resize-none font-mono"
            />

            {isProcessing && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center border border-slate-200 mt-6 z-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                  <span className="text-sm font-bold text-slate-600">Menganalisis Konteks...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleProcess}
          disabled={!content.trim() || isProcessing}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 mt-2"
        >
          <Sparkles size={16} /> Generate Internal Links
        </button>

        {suggestions.length > 0 && (
          <div className="mt-4 border-t border-slate-100 pt-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Links Terinjeksi ({suggestions.length})</h4>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <div key={i} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5">
                  <span className="text-xs font-medium text-slate-600 line-through decoration-slate-300">{s.original}</span>
                  <ArrowRight size={12} className="text-emerald-500" />
                  <a href={s.url} target="_blank" rel="noreferrer" className="text-xs font-bold text-emerald-600 hover:underline">
                    {s.anchorText}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
