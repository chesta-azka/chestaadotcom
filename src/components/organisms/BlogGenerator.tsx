import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PenTool, Sparkles, Copy, CheckCircle2, ChevronDown, AlignLeft, Lightbulb } from 'lucide-react';

export default function BlogGenerator() {
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('Web Development');
  const [loading, setLoading] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [copied, setCopied] = useState(false);

  const niches = ['Web Development', 'AI Automation', 'Cloud Architecture', 'Local SEO & AEO', 'Cybersecurity'];

  // 8+ predefined high-value blog ideas
  const blogIdeas = [
    { title: "Migrasi Sistem Monolitik ke Microservices", niche: "Cloud Architecture" },
    { title: "Otomatisasi Workflow Bisnis B2B dengan AI Agent", niche: "AI Automation" },
    { title: "Panduan Optimasi Core Web Vitals untuk E-Commerce", niche: "Web Development" },
    { title: "Strategi Local SEO dan Answer Engine Optimization (AEO)", niche: "Local SEO & AEO" },
    { title: "Menerapkan Arsitektur Zero Trust Security", niche: "Cybersecurity" },
    { title: "Integrasi Payment Gateway Modern (Stripe/Midtrans)", niche: "Web Development" },
    { title: "Membangun Sistem RAG (Retrieval-Augmented Generation) Sendiri", niche: "AI Automation" },
    { title: "Perbandingan Skalabilitas: Serverless AWS vs Google Cloud", niche: "Cloud Architecture" },
    { title: "Dominasi Pasar Lokal BSD City dengan Hyper-Local SEO", niche: "Local SEO & AEO" },
    { title: "Masa Depan React: React Compiler & Next.js 15", niche: "Web Development" }
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    
    setLoading(true);
    
    setTimeout(() => {
      // Markdown template generation tailored to AEO & Local SEO
      const template = `
# ${topic}: Panduan Strategis Eksekusi 2026

**Meta Description:** Pelajari secara mendalam mengenai ${topic} dalam lanskap ${niche}. Strategi implementasi, arsitektur, dan cara memenangkan pasar digital.

---

<FAQSchema 
  faqs={[
    {
      question: "Apa itu ${topic}?",
      answer: "${topic} adalah konsep kunci dalam ${niche} yang mengacu pada optimalisasi infrastruktur dan strategi digital. Hal ini krusial untuk skalabilitas perusahaan modern."
    },
    {
      question: "Bagaimana cara kerja ${topic}?",
      answer: "Penerapannya melibatkan analisis data sistematis, integrasi arsitektur cloud/AI, dan pemeliharaan performa berkelanjutan untuk ROI maksimal."
    }
  ]}
  areasServed={["BSD City", "Cisauk", "Tangerang", "Jakarta"]}
/>

## Apa itu ${topic}?

Secara definitif, ${topic} adalah pondasi utama dalam ekosistem ${niche} modern. Strategi ini sangat krusial karena memberikan skalabilitas operasional dan efisiensi biaya secara eksponensial. Khususnya bagi ekosistem bisnis enterprise, adopsi ini mengakselerasi dominasi pasar secara signifikan.

## Bagaimana Cara Kerja ${topic}?

Implementasi yang solid membutuhkan pendekatan multi-layer:

1. **Audit Infrastruktur Awal:** Menganalisis bottleneck pada sistem eksisting.
2. **Pemilihan Stack Teknologi:** Menentukan framework atau model AI yang relevan dengan objektif B2B.
3. **Deployment Terstruktur:** Meluncurkan pipeline secara bertahap tanpa mengganggu operasional.
4. **Optimasi AEO & SEO:** Menyelaraskan output konten dengan metrik Google SGE.

## Mengapa Bisnis Anda Membutuhkan ${niche}?

Lanskap kompetisi saat ini menuntut kecepatan adaptasi. Tanpa integrasi ${niche} yang komprehensif, perusahaan rentan terhadap disrupsi:
- Pengurangan biaya operasional jangka panjang (hingga 40%).
- Otomatisasi alur kerja (workflow automation) yang presisi.
- Pengalaman pengguna (UX) tanpa friksi yang meningkatkan retensi.

## Studi Kasus: Implementasi di Ekosistem BSD City & Jakarta

Kami di CHESTAADOTCOM telah membantu berbagai startup dan perusahaan enterprise di area Jabodetabek mengintegrasikan arsitektur ini untuk mendorong produktivitas harian. Melalui pendekatan ${niche} yang berbasis data, efisiensi operasional terbukti meningkat signifikan pada kuartal pertama implementasi.

### Kesimpulan

Adopsi ${topic} bukan lagi sekadar tren inovasi, melainkan standar minimum untuk berkompetisi di era digital 2026. Mulai transformasi Anda hari ini dan konsultasikan arsitektur ideal bersama tim expert kami.
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
