import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { Terminal, ArrowRight, Sparkles, BookOpen, ShieldCheck, CheckCircle2 } from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import GlossarySchema from '../components/atoms/GlossarySchema';
import { getGlossaryTerm } from '../utils/glossaryUtils';

export default function GlossaryTermPage() {
  const { term = 'machine-learning' } = useParams<{ term?: string }>();
  const glossaryItem = getGlossaryTerm(term);
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
        title={`${glossaryItem.term} - Definisi & Penerapan Bisnis | Kamus AI Chestaa`}
        description={`Ketahui definisi teknis ${glossaryItem.term} dan bagaimana Chestaa menerapkannya untuk efisiensi korporat dan pelipatgandaan ROAS.`}
        currentRoute={`/kamus-ai-teknologi/${glossaryItem.slug}`}
      />
      <GlossarySchema item={glossaryItem} />

      {/* SECTION 1: APPLE-GRADE MINIMALISM DEFINITION HERO */}
      <section className="relative min-h-[85vh] flex flex-col justify-center items-center px-6 sm:px-12 py-24 overflow-hidden border-b border-white/10">
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

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/35 backdrop-blur-md text-indigo-400 text-xs font-mono uppercase tracking-wider shadow-lg"
          >
            <BookOpen size={13} className="text-indigo-400 animate-pulse" />
            <span>KAMUS AI & TEKNOLOGI • {glossaryItem.category.toUpperCase()}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-3xl leading-[1.08]"
          >
            {glossaryItem.term}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl max-w-2xl text-left shadow-2xl space-y-4"
          >
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">[ Definisi Resmi ]</span>
            <p className="text-lg sm:text-xl text-slate-200 font-normal leading-relaxed">
              {glossaryItem.definition}
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE JAKSEL B2B PIVOT (PENERAPAN DI DUNIA NYATA) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-400 text-xs font-mono">
            <span>Penerapan di Dunia Nyata</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Eksekusi Bisnis Jauh Lebih Penting Daripada Teori
          </h2>
          <div className="p-10 rounded-3xl bg-gradient-to-br from-indigo-950/40 to-purple-950/30 border border-indigo-500/30 backdrop-blur-2xl text-left space-y-6 shadow-2xl">
            <p className="text-xl sm:text-2xl text-white font-medium leading-relaxed italic">
              "Jujurly, paham teori {glossaryItem.term} itu bagus, tapi eksekusi di bisnis itu beda cerita. Daripada lo pusing mikirin teknisnya, tim arsitek Chestaa bisa ngebangun infrastruktur {glossaryItem.term} ini langsung ke dalam ekosistem perusahaan lo dalam hitungan minggu."
            </p>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
              <span className="text-xs text-slate-400 font-mono">[ Integrasi Langsung Ke Layanan Korporat ]</span>
              <Link
                to={glossaryItem.serviceLink}
                className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-bold text-sm transition-colors group"
              >
                <span>Pelajari Solusi {glossaryItem.serviceName}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: AGGRESSIVE B2B CTA & FOUNDER VIP LINE */}
      <section id="founder-vip-section" ref={aiSectionRef} className="py-32 px-6 sm:px-12 bg-[#0b0b0f]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl flex flex-col space-y-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center text-slate-400 font-bold text-xl grayscale">
                CA
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Chesta Azka</h3>
                <p className="text-xs text-indigo-400 font-mono">Founder & Principal System Architect</p>
              </div>
            </div>
            <p className="text-base text-slate-300 leading-relaxed italic">
              "Paham konsep {glossaryItem.term} adalah langkah awal. Biar tim kami yang mengeksekusinya menjadi mesin pencetak profit otonom di perusahaan Anda."
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              <span>Direct Founder Line • Aktif 24/7</span>
            </div>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-indigo-950/20 border border-indigo-500/30 backdrop-blur-2xl flex flex-col space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-mono">
              <Sparkles size={14} className="text-indigo-400 animate-spin" />
              <span>AI Takeover & Implementasi {glossaryItem.term}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Konsultasi Integrasi {glossaryItem.term}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Jujurly, mengintegrasikan {glossaryItem.term} ke sistem lama butuh arsitek yang tepat. [SPLIT] Mau saya bantu rancang implementasinya untuk bisnis Anda sekarang?
            </p>
            <Link
              to="/"
              onClick={() => {
                const chatLauncher = document.querySelector('[aria-label="Konsultasi Arsitektur"]') as HTMLButtonElement;
                if (chatLauncher) chatLauncher.click();
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-lg cursor-pointer"
            >
              <span>Mulai Simulasi Chat</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
