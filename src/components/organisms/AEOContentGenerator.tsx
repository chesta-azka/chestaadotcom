import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PenTool, Sparkles, Copy, CheckCircle2, ChevronDown, AlignLeft, Lightbulb } from 'lucide-react';

export default function AEOContentGenerator() {
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('Web Development');
  const [loading, setLoading] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [copied, setCopied] = useState(false);

  const niches = ['Web Development', 'AI Automation', 'Cloud Architecture', 'Local SEO & AEO', 'Cybersecurity'];

  // 8+ predefined high-value blog ideas
  const blogIdeas = [
    { title: "Cara Membuat Website E-Commerce di BSD City", niche: "Web Development" },
    { title: "Apa itu Arsitektur Agentic AI untuk Bisnis?", niche: "AI Automation" },
    { title: "Berapa Biaya Migrasi Cloud di Tangerang?", niche: "Cloud Architecture" },
    { title: "Bagaimana Cara Kerja RAG (Retrieval-Augmented Generation)?", niche: "AI Automation" },
    { title: "Langkah Optimasi Core Web Vitals Next.js", niche: "Web Development" }
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    
    setLoading(true);
    
    setTimeout(() => {
      // Markdown template generation tailored to AEO Question-Answer-Reasoning
      const template = `
# ${topic}

**Meta Description:** Pelajari secara mendalam mengenai ${topic}. Berikut adalah penjelasan, cara kerja, dan alasan mengapa hal ini penting untuk bisnis Anda.

---

<FAQSchema 
  faqs={[
    {
      question: "${topic}",
      answer: "${topic} adalah solusi strategis dalam ${niche} yang mengacu pada optimalisasi infrastruktur digital. Hal ini krusial untuk skalabilitas perusahaan modern, terutama di area BSD dan sekitarnya."
    }
  ]}
  areasServed={["BSD City", "Cisauk", "Tangerang", "Jakarta"]}
/>

## 1. Apa Jawaban Singkatnya? (Featured Snippet)

**Jawaban:** ${topic} adalah pendekatan komprehensif dalam bidang ${niche} yang mengotomatisasi proses bisnis dan meningkatkan performa sistem. Pendekatan ini terdiri dari tiga langkah utama:
1. Audit arsitektur sistem saat ini.
2. Implementasi teknologi modern (seperti AI atau Cloud).
3. Pemeliharaan dan monitoring metrik performa.

## 2. Bagaimana Cara Kerjanya? (Reasoning & Proses)

Untuk memahami lebih dalam, mari kita pecah proses kerjanya:

- **Fase Analisis:** Tim ahli (seperti CHESTAADOTCOM di BSD City) akan membedah *bottleneck* pada sistem Anda.
- **Fase Implementasi:** Menggunakan *tools* mutakhir untuk membangun arsitektur yang tahan banting (resilient).
- **Fase Optimasi:** Menyelaraskan hasil akhir dengan Core Web Vitals dan matriks SEO lokal.

## 3. Mengapa Ini Penting untuk Bisnis B2B Anda?

Dalam ekosistem kompetitif di Tangerang Selatan dan Jakarta:
- **Reduksi Biaya:** Mengotomatisasi alur kerja mengurangi jam kerja manual.
- **Skalabilitas Cepat:** Sistem cloud atau AI memungkinkan bisnis tumbuh tanpa hambatan teknis.
- **Kenyamanan Pengguna:** Meningkatkan retensi klien dengan UX yang sangat cepat.

### Kesimpulan
Eksekusi yang tepat dari ${topic} dapat memposisikan perusahaan Anda jauh di depan kompetitor.
      `.trim();
      
      setMarkdown(template);
      setLoading(false);
      setCopied(false);
    }, 1200);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
            <PenTool size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">AEO Markdown Blog Generator</h2>
            <p className="text-sm text-slate-500">Auto-generate struktur artikel blog ramah AEO dan SEO Lokal</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x border-b border-slate-100 flex-1">
        <div className="lg:col-span-4 p-6 bg-white flex flex-col gap-6">
          <form onSubmit={handleGenerate} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Topik Artikel / Keyword</label>
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Contoh: Arsitektur Microservices"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 font-sans text-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Tech Niche / Kategori</label>
              <div className="relative">
                <select 
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 font-sans text-sm appearance-none bg-white"
                >
                  {niches.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !topic.trim()}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><Sparkles size={16} /> Generate Markdown</>
              )}
            </button>
          </form>

          {/* Inspiration Section */}
          <div className="mt-4 pt-6 border-t border-slate-100 flex-1">
            <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-3">
              <Lightbulb size={16} className="text-amber-500" />
              Topik Siap Pakai (Klik untuk pilih)
            </h4>
            <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto custom-scrollbar pr-2">
              {blogIdeas.map((idea, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTopic(idea.title);
                    setNiche(idea.niche);
                  }}
                  className="text-left p-3 rounded-lg border border-slate-200 hover:border-purple-400 hover:bg-purple-50/50 transition-colors group flex flex-col gap-1"
                >
                  <span className="text-xs font-bold text-slate-800 group-hover:text-purple-700">{idea.title}</span>
                  <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{idea.niche}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-8 p-0 bg-slate-50 flex flex-col min-h-[500px]">
          {markdown ? (
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-100 border-b border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <AlignLeft size={14} />
                  <span>generated_aeo_article.md</span>
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                >
                  {copied ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  {copied ? 'Tersalin!' : 'Copy Markdown'}
                </button>
              </div>
              <textarea 
                readOnly
                value={markdown}
                className="flex-1 w-full p-6 bg-transparent border-none focus:outline-none font-mono text-sm leading-relaxed text-slate-700 custom-scrollbar resize-none"
              />
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
              <AlignLeft size={48} className="mb-4 opacity-20" />
              <p className="text-sm font-medium">Belum ada markdown yang digenerate.</p>
              <p className="text-xs mt-1">Pilih dari rekomendasi topik atau masukkan topik Anda sendiri.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
