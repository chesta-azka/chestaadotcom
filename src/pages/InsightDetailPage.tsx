import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Sparkles, Clock, Calendar, ShieldCheck } from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
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

  return (
    <div className="relative w-full flex flex-col bg-[#0b0b0f] text-slate-100 overflow-x-hidden selection:bg-indigo-600 selection:text-white font-sans">
      <SEOMetadata
        title={`${article.title} | Executive Insights Chestaa`}
        description={article.seoDescription}
        currentRoute={`/insights/${article.slug}`}
        type="article"
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

          <div className="pt-4 border-t border-white/10 text-xs text-indigo-400 font-mono">
            [ Penulis: {article.author} ]
          </div>
        </div>
      </section>

      {/* ARTICLE BODY & STICKY SIDEBAR CTA */}
      <section className="py-24 px-6 sm:px-12 bg-[#0d0d12]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Main Reading Content (Medium / HBR Typography layout) */}
          <article 
            className="lg:col-span-2 text-lg sm:text-xl text-slate-200 leading-[1.8] font-normal space-y-8 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mt-12 [&_h1]:mb-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:mb-6 bg-white/[0.015] p-8 sm:p-12 rounded-3xl border border-white/5 backdrop-blur-md"
            dangerouslySetInnerHTML={{ __html: article.content }}
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
          </aside>
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
