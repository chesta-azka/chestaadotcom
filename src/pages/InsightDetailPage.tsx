import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Sparkles, Clock, Calendar, ShieldCheck, Layers, Cpu, Zap, Compass } from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import { generateInsightArticleSchema } from '../lib/seo';
import { insightsData } from '../data/insights';

export default function InsightDetailPage() {
  const { slug = 'pangkas-gaji-admin-dengan-karyawan-ai' } = useParams<{ slug?: string }>();
  const article = insightsData.find(i => i.slug === slug) || insightsData[0];
  const aiSectionRef = useRef<HTMLDivElement>(null);

  // Magnetic CTA mouse tracking
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x: x * 0.2, y: y * 0.2 });
  };
  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Semantic hierarchy: guarantee single h1 on page by transforming body h1 to h2
  const normalizedContent = article.content
    ? article.content.replace(/<h1(\b[^>]*)>/gi, '<h2$1>').replace(/<\/h1>/gi, '</h2>')
    : '';

  // Get other insights for cross-linking
  const otherInsights = insightsData.filter(i => i.slug !== article.slug).slice(0, 3);

  return (
    <div className="relative w-full flex flex-col bg-[#0b0b0f] text-slate-100 overflow-x-hidden selection:bg-indigo-600 selection:text-white font-sans">
      <SEOMetadata
        title={`${article.title} | Executive Insights Chestaa`}
        description={article.seoDescription}
        currentRoute={`/insights/${article.slug}`}
        type="article"
        schema={generateInsightArticleSchema(article)}
      />

      {/* ARTICLE HERO & TYPOGRAPHY LAYOUT */}
      <section className="relative min-h-[70vh] flex flex-col justify-center items-center px-6 sm:px-12 py-24 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.06, 1],
              opacity: [0.15, 0.3, 0.15]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-indigo-500/20 rounded-full blur-[160px]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:44px_44px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col space-y-8">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="px-3.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/35 text-indigo-400 text-xs font-mono uppercase tracking-wider">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <Calendar size={13} /> {article.date}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.12]">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
            {article.seoDescription}
          </p>

          <div className="pt-4 border-t border-white/10 text-xs text-indigo-400 font-mono flex items-center justify-between flex-wrap gap-2">
            <span>[ Penulis: {article.author} ]</span>
            <span className="text-slate-400">Arsitektur Digital & Sistem Penjualan Otonom B2B</span>
          </div>
        </div>
      </section>

      {/* ARTICLE BODY & STICKY SIDEBAR CTA */}
      <section className="py-24 px-6 sm:px-12 bg-[#0d0d12]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Main Reading Content (Semantic HBR Typography layout) */}
          <article 
            className="lg:col-span-2 text-lg sm:text-xl text-slate-200 leading-[1.8] font-normal space-y-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-6 bg-white/[0.015] p-8 sm:p-12 rounded-3xl border border-white/5 backdrop-blur-md"
            dangerouslySetInnerHTML={{ __html: normalizedContent }}
          />

          {/* Sticky Sidebar CTA */}
          <aside className="lg:sticky lg:top-28 p-8 rounded-3xl bg-gradient-to-br from-indigo-950/60 to-purple-950/50 border border-indigo-500/40 backdrop-blur-2xl space-y-6 shadow-2xl">
            <span className="text-indigo-400 text-xs font-mono uppercase tracking-widest">[ Konsultasi Eksekutif ]</span>
            <h3 className="text-xl font-bold text-white leading-snug">
              Sistem Lo Masih Berantakan? Mari Bedah Arsitektur Lo Bersama Principal Kami.
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Hentikan pembakaran anggaran operasional. Jadwalkan sesi audit kode dan arsitektur otonom langsung bersama Chesta Azka.
            </p>
            <Link
              to="/"
              onClick={() => {
                const chatLauncher = document.querySelector('[aria-label="Konsultasi Arsitektur"]') as HTMLButtonElement;
                if (chatLauncher) chatLauncher.click();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-lg text-center cursor-pointer"
            >
              <span>Jadwalkan Audit Arsitektur</span>
            </Link>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <span className="text-xs font-mono uppercase text-slate-400">Layanan Relevan:</span>
              <ul className="text-xs space-y-2 text-indigo-300 font-mono">
                <li>
                  <Link to="/services/karyawan-digital-ai" className="hover:underline flex items-center gap-1.5">
                    <ArrowRight size={12} /> Karyawan Digital AI 24/7
                  </Link>
                </li>
                <li>
                  <Link to="/services/website-mesin-konversi" className="hover:underline flex items-center gap-1.5">
                    <ArrowRight size={12} /> Website Mesin Konversi Next.js
                  </Link>
                </li>
                <li>
                  <Link to="/services/dominasi-pencarian-seo-aeo" className="hover:underline flex items-center gap-1.5">
                    <ArrowRight size={12} /> Dominasi Pencarian SEO & AEO
                  </Link>
                </li>
                <li>
                  <Link to="/services/jasa-pembuatan-website-bsd-cisauk" className="hover:underline flex items-center gap-1.5">
                    <ArrowRight size={12} /> Jasa Website BSD City & Cisauk
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* INTERNAL LINKING GRAPH: RELATED ARTICLES & GLOSSARY */}
      <section className="py-20 px-6 sm:px-12 bg-[#09090d] border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase text-indigo-400 tracking-widest">[ Jaringan Pengetahuan ]</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Artikel & Analisis Terkait</h2>
            </div>
            <Link to="/blog" className="text-xs font-mono text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1">
              <span>Buka Semua Jurnal Teknologi</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherInsights.map((item) => (
              <Link
                key={item.slug}
                to={`/insights/${item.slug}`}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/50 hover:bg-white/[0.04] transition-all space-y-4 group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider">{item.category}</span>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {item.seoDescription}
                  </p>
                </div>
                <span className="text-xs font-mono text-indigo-400 inline-flex items-center gap-1 pt-2">
                  <span>Baca Analisis Lengkap</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>

          {/* Quick Glossary Pill Matrix */}
          <div className="p-6 rounded-2xl bg-white/[0.015] border border-white/5 space-y-3">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Glosarium Teknologi Relevan:</span>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <Link to="/kamus-ai-teknologi/nextjs-15" className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-indigo-600 hover:text-white transition-colors text-slate-300 border border-white/10">
                Next.js 15
              </Link>
              <Link to="/kamus-ai-teknologi/machine-learning" className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-indigo-600 hover:text-white transition-colors text-slate-300 border border-white/10">
                Machine Learning
              </Link>
              <Link to="/kamus-ai-teknologi/roas" className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-indigo-600 hover:text-white transition-colors text-slate-300 border border-white/10">
                ROAS Ads
              </Link>
              <Link to="/kamus-ai-teknologi/aeo" className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-indigo-600 hover:text-white transition-colors text-slate-300 border border-white/10">
                AEO (Answer Engine)
              </Link>
              <Link to="/kamus-ai-teknologi/pwa" className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-indigo-600 hover:text-white transition-colors text-slate-300 border border-white/10">
                PWA Super App
              </Link>
              <Link to="/kamus-ai-teknologi/cybersecurity" className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-indigo-600 hover:text-white transition-colors text-slate-300 border border-white/10">
                Cybersecurity
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER VIP LINE */}
      <section id="founder-vip-section" ref={aiSectionRef} className="py-28 px-6 sm:px-12 bg-[#0b0b0f] border-t border-white/10">
        <div className="max-w-4xl mx-auto p-10 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl flex flex-col space-y-6 shadow-2xl text-center">
          <span className="text-indigo-400 text-xs font-mono uppercase tracking-widest">Executive Direct Line</span>
          <h3 className="text-2xl font-bold text-white">Konsultasikan Studi Kasus Perusahaan Anda</h3>
          <p className="text-base text-slate-300 max-w-xl mx-auto">
            "Setiap insight yang kami bagikan adalah hasil praktik langsung dari sistem otonom yang kami bangun untuk klien korporat."
          </p>
          <div className="pt-2">
            <Link
              to="/"
              onClick={() => {
                const chatLauncher = document.querySelector('[aria-label="Konsultasi Arsitektur"]') as HTMLButtonElement;
                if (chatLauncher) chatLauncher.click();
              }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-lg cursor-pointer"
            >
              <span>Mulai Simulasi Chat AI</span>
              <Sparkles size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
