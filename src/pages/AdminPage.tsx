import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Sparkles, Loader2, FileText, CheckCircle2 } from 'lucide-react';
import MetaTags from '../components/atoms/MetaTags';
import ReactMarkdown from 'react-markdown';

export default function AdminPage() {
  const [content, setContent] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsAuditing(true);
    setResult(null);
    try {
      const res = await fetch('/api/ai/seo-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data.auditResult);
      } else {
        setResult("Error: " + data.error);
      }
    } catch (err) {
      setResult("Failed to connect to the SEO Audit API.");
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen pt-32 pb-24 px-6 relative bg-slate-50">
      <MetaTags title="Admin Dashboard | SEO Audit Tool" description="Internal admin tool for SEO optimization." />
      
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <span className="text-[#4f46e5] font-mono text-xs font-bold tracking-widest uppercase mb-2 block">
              Internal Tool
            </span>
            <h1 className="text-3xl font-display font-medium tracking-tight text-slate-900">
              SEO Content Audit
            </h1>
          </div>
          <div className="bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-mono font-bold text-slate-700">Admin Mode</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col h-[500px]"
          >
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
              <FileText size={16} className="text-[#4f46e5]" /> Input Konten
            </h2>
            <form onSubmit={handleAudit} className="flex-1 flex flex-col">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste konten halaman, artikel blog, atau copy landing page di sini..."
                className="flex-1 w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/50 focus:border-[#4f46e5] text-sm font-sans text-slate-700"
                required
              />
              <button
                type="submit"
                disabled={isAuditing || !content.trim()}
                className="mt-4 w-full bg-[#4f46e5] hover:bg-indigo-600 disabled:bg-slate-300 text-white font-mono text-xs font-bold uppercase tracking-widest py-4 rounded-2xl transition-colors flex items-center justify-center gap-2"
              >
                {isAuditing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Menganalisis...
                  </>
                ) : (
                  <>
                    <Search size={16} /> Jalankan Audit SEO
                  </>
                )}
              </button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col h-[500px] overflow-hidden"
          >
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
              <Sparkles size={16} className="text-amber-500" /> Hasil Analisis AI
            </h2>
            <div className="flex-1 overflow-y-auto bg-slate-50 border border-slate-100 rounded-2xl p-6 custom-scrollbar">
              {!result && !isAuditing && (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
                  <CheckCircle2 size={32} className="mb-3 text-slate-300" />
                  <p className="text-sm font-sans">Siap untuk melakukan audit.<br/>Masukkan konten di panel sebelah kiri.</p>
                </div>
              )}
              {isAuditing && (
                <div className="h-full flex flex-col items-center justify-center text-[#4f46e5] text-center space-y-4">
                  <Loader2 size={32} className="animate-spin" />
                  <p className="text-xs font-mono font-bold uppercase tracking-wider animate-pulse">Memproses Data...</p>
                </div>
              )}
              {result && !isAuditing && (
                <div className="prose prose-sm prose-slate max-w-none text-left">
                  <ReactMarkdown>{result}</ReactMarkdown>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
