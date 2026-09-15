import { motion } from 'motion/react';
import { ArrowUpRight, Code2, Cpu, Rocket, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AcademyHighlightSection() {
  return (
    <section className="py-24 bg-[#0a0a0c] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-900/20 to-transparent pointer-events-none" />
      <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-purple-600/30 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side: Content */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 w-max mb-6">
            <GraduationCap size={16} className="text-purple-400" />
            <span className="text-xs font-mono font-bold tracking-widest text-purple-300 uppercase">
              CHESTAADOTCOM Academy
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-white mb-6 leading-[1.1]">
            Kuasai <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Teknologi Masa Depan</span> Secara Praktikal.
          </h2>

          <p className="text-slate-300 font-sans text-base sm:text-lg leading-relaxed max-w-lg mb-10">
            Kami tidak hanya membangun sistem—kami melatih talenta elit. Pelajari langsung dari lead engineer kami bagaimana membangun Web App Skala Enterprise, Next.js, dan Automasi AI Agentic yang siap industri.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/academy"
              className="px-8 py-4 rounded-xl bg-purple-600 text-white font-sans font-bold hover:bg-purple-500 transition-colors shadow-[0_0_20px_rgba(147,51,234,0.3)] flex items-center justify-center gap-2"
            >
              <span>Jelajahi Program Premium</span>
              <ArrowUpRight size={18} />
            </Link>
            <a 
              href="https://wa.me/6282125447232?text=Halo%20Admin%20Academy,%20saya%20tertarik%20dengan%20Bootcamp/Mentoring%20IT."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-sans font-bold hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              Konsultasi Karir IT
            </a>
          </div>
        </div>

        {/* Right Side: Feature Grid */}
        <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
          >
            <Code2 size={28} className="text-cyan-400 mb-6" />
            <h3 className="text-xl font-display font-bold text-white mb-3">React & Next.js Elite</h3>
            <p className="text-sm text-slate-400 font-sans leading-relaxed">
              Arsitektur frontend modern, Server-Side Rendering (SSR), dan optimasi performa Lighthouse sub-detik.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
          >
            <Cpu size={28} className="text-purple-400 mb-6" />
            <h3 className="text-xl font-display font-bold text-white mb-3">Agentic AI Mastery</h3>
            <p className="text-sm text-slate-400 font-sans leading-relaxed">
              Integrasi Google Gemini, LLM otonom, dan pembuatan sistem backend pintar untuk korporasi.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors sm:col-span-2"
          >
            <Rocket size={28} className="text-emerald-400 mb-6" />
            <h3 className="text-xl font-display font-bold text-white mb-3">1-on-1 Mentorship & Karir</h3>
            <p className="text-sm text-slate-400 font-sans leading-relaxed">
              Bukan sekadar video tutorial. Dapatkan bimbingan langsung, review kode profesional, dan strategi negosiasi project dari praktisi yang terbukti menghasilkan profit.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
