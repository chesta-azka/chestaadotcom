import React, { useState } from 'react';
import { Search, Sparkles, CheckCircle2, AlertTriangle, ChevronRight, Loader2, Target } from 'lucide-react';
import { motion } from 'motion/react';

export default function AEOOptimizer() {
  const [targetKeyword, setTargetKeyword] = useState('');
  const [pageUrl, setPageUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleScan = () => {
    if (!targetKeyword || !pageUrl) return;
    setIsScanning(true);
    // Simulate AI scanning and optimization logic
    setTimeout(() => {
      setResults({
        score: 72,
        suggestions: [
          {
            type: 'warning',
            title: 'Missing Direct Answer Format',
            desc: 'Featured snippets prefer concise paragraph definitions (40-60 words). Your content lacks a direct answer to "What is ' + targetKeyword + '?"'
          },
          {
            type: 'warning',
            title: 'List Formatting Needed',
            desc: 'For "How-to" queries, structure your H3 tags chronologically and use a descriptive introductory sentence.'
          },
          {
            type: 'success',
            title: 'Keyword Density & Semantics',
            desc: 'Great job! Latent Semantic Indexing (LSI) terms like "optimization" and "strategy" are well-represented.'
          },
          {
            type: 'warning',
            title: 'Schema Markup Enhancement',
            desc: 'Inject FAQSchema with 3-4 related questions frequently asked by users to capture "People Also Ask" boxes.'
          }
        ]
      });
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900">AEO / Featured Snippet Optimizer</h2>
          <p className="text-slate-500 font-sans text-sm mt-1">Scan halaman layanan Anda dan optimalkan konten untuk Answer Engine & Featured Snippet.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Target Keyword / Pertanyaan</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                value={targetKeyword}
                onChange={(e) => setTargetKeyword(e.target.value)}
                placeholder="e.g. Apa itu arsitektur Cloud-Native?" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm font-sans focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Target URL (Internal)</label>
            <div className="relative">
              <Target size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                value={pageUrl}
                onChange={(e) => setPageUrl(e.target.value)}
                placeholder="/service/web-development" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm font-sans focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleScan}
          disabled={!targetKeyword || !pageUrl || isScanning}
          className="flex items-center justify-center gap-2 w-full md:w-auto bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-bold font-mono text-sm uppercase transition-colors"
        >
          {isScanning ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
          {isScanning ? 'Menganalisis...' : 'Mulai Scan AEO'}
        </button>
      </div>

      {results && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <h3 className="font-display font-bold text-lg text-slate-900">Hasil Analisis & Saran</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono text-slate-500 uppercase">AEO Score</span>
              <div className="bg-amber-100 text-amber-700 font-bold font-mono px-3 py-1 rounded-lg text-lg">
                {results.score}/100
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {results.suggestions.map((sug: any, idx: number) => (
              <div key={idx} className={`p-4 rounded-xl border ${sug.type === 'success' ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'} flex gap-4`}>
                <div className="mt-0.5 shrink-0">
                  {sug.type === 'success' ? <CheckCircle2 size={18} className="text-emerald-600" /> : <AlertTriangle size={18} className="text-amber-600" />}
                </div>
                <div>
                  <h4 className={`font-bold font-sans text-sm mb-1 ${sug.type === 'success' ? 'text-emerald-900' : 'text-amber-900'}`}>
                    {sug.title}
                  </h4>
                  <p className={`text-sm font-sans ${sug.type === 'success' ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {sug.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
