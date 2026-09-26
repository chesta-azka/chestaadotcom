import { motion } from 'motion/react';
import { ArrowUpRight, Code2, Bot, Rocket, GraduationCap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

export default function AcademyHighlightSection() {
  return (
    <section className="py-20 sm:py-28 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 sm:mb-18 pb-8 border-b border-slate-800/80">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700/80 text-purple-300 text-xs font-mono font-bold tracking-wider uppercase mb-4">
              <GraduationCap size={15} className="text-purple-400" />
              <span>CHESTAADOTCOM Academy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-white leading-[1.12]">
              Kuasai Rekayasa Perangkat Lunak Modern.
            </h2>
            <p className="mt-4 text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
              Kami tidak hanya membangun sistem—kami melatih talenta elit. Dapatkan bimbingan langsung mengenai rekayasa web produksi berkecepatan tinggi, otomasi Agentic AI, dan strategi delivery berstandar industri.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link 
              to="/academy"
              className="px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-sans font-bold text-xs sm:text-sm tracking-wide transition-colors flex items-center gap-2 shadow-sm"
            >
              <span>Jelajahi Program Premium</span>
              <ArrowUpRight size={16} />
            </Link>
            <Link 
              to="/blog?cat=Digital+Education"
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700/90 border border-slate-700 text-slate-200 font-sans font-bold text-xs sm:text-sm transition-colors flex items-center gap-2"
            >
              <span>Baca Edukasi Bisnis</span>
              <ArrowUpRight size={16} />
            </Link>
            <a 
              href="https://wa.me/6282125447232?text=Halo%20Admin%20Academy,%20saya%20tertarik%20dengan%20Bootcamp/Mentoring%20IT."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-transparent hover:bg-slate-800 text-slate-400 hover:text-white font-sans font-bold text-xs sm:text-sm transition-colors"
            >
              Konsultasi Karir IT
            </a>
          </div>
        </div>

        {/* 3 Masterclass Track Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Track 1 */}
          <motion.div 
            variants={cardVariants}
            className="p-7 sm:p-8 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-purple-500/50 hover:bg-slate-800 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-slate-700/70 border border-slate-600 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-105 transition-transform">
                <Code2 size={22} />
              </div>
              <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold tracking-wider mb-1.5">
                TRACK 01 • FRONTEND ARCHITECTURE
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                Enterprise Web &amp; Production Architecture
              </h3>
              <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
                Belajar Server Components, Server-Side Rendering (SSR), Streaming UI, serta teknik optimasi Core Web Vitals sub-detik untuk produk komersial.
              </p>
            </div>
            
            <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 size={14} /> Kurikulum Teruji
              </span>
              <span className="text-slate-300 font-bold">12 Modul Praktikal</span>
            </div>
          </motion.div>

          {/* Track 2 */}
          <motion.div 
            variants={cardVariants}
            className="p-7 sm:p-8 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-purple-500/50 hover:bg-slate-800 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-slate-700/70 border border-slate-600 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-105 transition-transform">
                <Bot size={22} />
              </div>
              <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold tracking-wider mb-1.5">
                TRACK 02 • AI INTEGRATION
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                Agentic AI &amp; LLM Automation
              </h3>
              <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
                Implementasi Google Gemini API, function/tool calling otonom, integrasi WhatsApp multi-agent, dan pemrosesan data real-time untuk automasi bisnis.
              </p>
            </div>
            
            <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 size={14} /> Full Hands-On
              </span>
              <span className="text-slate-300 font-bold">Live Case Study</span>
            </div>
          </motion.div>

          {/* Track 3 */}
          <motion.div 
            variants={cardVariants}
            className="p-7 sm:p-8 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-purple-500/50 hover:bg-slate-800 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-slate-700/70 border border-slate-600 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-105 transition-transform">
                <Rocket size={22} />
              </div>
              <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold tracking-wider mb-1.5">
                TRACK 03 • 1-ON-1 MENTORSHIP
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                Engineering Mentorship &amp; Karir
              </h3>
              <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
                Bimbingan intensif 1-on-1 bersama Lead Engineer: code review mendalam, persiapan portfolio proyek riil, serta strategi negosiasi project bernilai tinggi.
              </p>
            </div>
            
            <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 size={14} /> Private Session
              </span>
              <span className="text-slate-300 font-bold">Terbatas 5 Slot</span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
