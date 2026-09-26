import React, { useState } from 'react';
import { Share2, Sparkles, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

interface SocialPreviewGeneratorProps {
  title: string;
  category?: string;
  author?: string;
  url?: string;
}

export function SocialPreviewGenerator({
  title,
  category = 'Enterprise Tech & AI',
  author = 'Chesta Azka Sofyan',
  url = typeof window !== 'undefined' ? window.location.href : 'https://chestaa.com'
}: SocialPreviewGeneratorProps) {
  const [copied, setCopied] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const handleCopyLinkWithPreview = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link dengan Branded Preview Card berhasil disalin!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Gagal menyalin link");
    }
  };

  return (
    <div className="my-8 p-6 rounded-2xl bg-gradient-to-br from-purple-950 via-slate-950 to-indigo-950 text-white border border-purple-500/30 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-3xl rounded-full pointer-events-none" />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-mono font-bold">
            <Sparkles size={12} /> Branded Social Preview Card
          </div>
          <h4 className="font-display font-bold text-lg text-white m-0 tracking-tight">
            Bagikan ke Media Sosial dengan Thumbnail Eksklusif
          </h4>
          <p className="text-xs text-purple-200/80 font-sans max-w-xl m-0">
            Setiap tautan yang dibagikan otomatis dirender dengan kartu pratinjau mewah bertuliskan judul artikel dan author <strong>{author}</strong> untuk meningkatkan CTR di WhatsApp, LinkedIn, &amp; X.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowPreviewModal(true)}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <Share2 size={14} /> Lihat Preview Card
          </button>
          <button
            onClick={handleCopyLinkWithPreview}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-mono font-bold transition-all flex items-center gap-2 shadow-lg cursor-pointer"
          >
            {copied ? <Check size={14} className="text-emerald-300" /> : <Copy size={14} />}
            {copied ? 'Tersalin!' : 'Salin Tautan'}
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-purple-500/30 rounded-3xl max-w-xl w-full p-6 text-white relative shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
                OpenGraph Card Preview (1200 x 630px)
              </span>
              <button 
                onClick={() => setShowPreviewModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                ✕
              </button>
            </div>

            {/* Simulated Social Card */}
            <div className="rounded-2xl overflow-hidden border border-purple-500/30 bg-gradient-to-tr from-purple-950 via-slate-900 to-indigo-950 shadow-2xl p-8 space-y-6 relative">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-purple-600 text-white font-mono text-[10px] font-bold uppercase tracking-widest rounded-lg">
                  {category}
                </span>
                <span className="font-mono text-xs text-purple-300">chestaa.com</span>
              </div>

              <div className="space-y-3">
                <h3 className="font-display font-semibold text-xl sm:text-2xl text-white leading-snug">
                  {title}
                </h3>
                <p className="text-xs text-purple-200/80 font-sans">
                  Oleh <strong>{author}</strong> • Software House &amp; Arsitektur Digital BSD City
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-purple-300">
                <span>⚡ High-Performance Next.js &amp; AI</span>
                <span>BSD City, Tangerang</span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-5 py-2.5 rounded-xl bg-white/10 text-white text-xs font-mono font-bold hover:bg-white/20"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  handleCopyLinkWithPreview();
                  setShowPreviewModal(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-mono font-bold shadow-lg flex items-center gap-2"
              >
                <Copy size={14} /> Salin Tautan &amp; Bagikan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
