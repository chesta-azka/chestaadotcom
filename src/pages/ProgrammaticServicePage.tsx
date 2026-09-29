import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { Target, ArrowRight, Sparkles, Server, ShieldCheck, MessageSquare, Globe, Cpu } from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import AeoSchema from '../components/atoms/AeoSchema';
import { generateDynamicCopy } from '../utils/pseoUtils';
import RoiCalculator from '../components/organisms/RoiCalculator';

export default function ProgrammaticServicePage() {
  const { industry = 'enterprise', city = 'jakarta' } = useParams<{ industry?: string; city?: string }>();
  const pseo = generateDynamicCopy(industry, city);
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
        title={pseo.title}
        description={pseo.description}
        currentRoute={`/services/${industry}/${city}`}
      />
      <AeoSchema
        serviceName={`Agensi AI & Website B2B untuk ${pseo.industry} di ${pseo.city}`}
        description={pseo.description}
        serviceType="Enterprise Software & AI Architecture"
        city={pseo.city}
        industry={pseo.industry}
        url={`https://chestaa.com/services/${industry}/${city}`}
      />

      {/* SECTION 1: DYNAMIC PROGRAMMATIC HERO */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-6 sm:px-12 py-24 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.15, 0.3, 0.15]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-500/20 rounded-full blur-[150px]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 backdrop-blur-md text-indigo-400 text-xs font-mono uppercase tracking-wider shadow-lg"
          >
            <Globe size={13} className="text-indigo-400 animate-pulse" />
            <span>PSEO NASIONAL • {pseo.industry.toUpperCase()} DI {pseo.city.toUpperCase()}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.08]"
          >
            {pseo.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed"
          >
            {pseo.hook}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-6"
          >
            {[
              { label: 'Target Industri', val: pseo.industry },
              { label: 'Wilayah Layanan', val: pseo.city },
              { label: 'Standar Kecepatan', val: '< 0.8 Detik' },
              { label: 'Otomatisasi AI', val: 'Aktif 24/7' }
            ].map((metric, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center text-center shadow-xl">
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">{metric.val}</span>
                <span className="text-xs text-slate-400 mt-1 font-mono">{metric.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-4"
          >
            <motion.button
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ x: mousePos.x, y: mousePos.y }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              onClick={() => {
                const el = document.getElementById('founder-vip-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm sm:text-base tracking-wide shadow-[0_0_40px_rgba(99,102,241,0.4)] hover:shadow-[0_0_60px_rgba(99,102,241,0.7)] transition-all flex items-center gap-3 cursor-pointer group"
            >
              <span>Konsultasi Arsitektur {pseo.industry} Sekarang</span>
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: DYNAMIC BODY & VALUE PROPOSITION */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-indigo-400 text-xs font-mono uppercase tracking-wider">Transformasi Digital {pseo.industry}</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-snug">
              Solusi Otonom untuk Pasar {pseo.city}
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              {pseo.body}
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-indigo-950/20 border border-indigo-500/30 backdrop-blur-2xl flex flex-col items-center justify-center space-y-6 shadow-2xl">
            <span className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-300">
              {pseo.metric}
            </span>
            <span className="text-sm text-slate-300 text-center font-medium">
              {pseo.metricLabel}
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2.5: ROI CALCULATOR (SXO TRAP) */}
      <section className="px-6 sm:px-12 py-12 bg-[#0b0b0f]">
        <div className="max-w-6xl mx-auto">
          <RoiCalculator />
        </div>
      </section>

      {/* SECTION 3: FOUNDER VIP & AI TAKEOVER */}
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
              "Kami merancang arsitektur khusus untuk industri {pseo.industry} di {pseo.city} agar bisnis Anda mendominasi pencarian organik secara instan."
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              <span>Direct Founder Line • Aktif 24/7</span>
            </div>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-indigo-950/20 border border-indigo-500/30 backdrop-blur-2xl flex flex-col space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-mono">
              <Sparkles size={14} className="text-indigo-400 animate-spin" />
              <span>AI Takeover & PSEO Consultation</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Simulasi Ekspansi {pseo.industry} di {pseo.city}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Jujurly, mendominasi market {pseo.city} untuk sektor {pseo.industry} butuh arsitektur tepat. [SPLIT] Mau saya bantu simulasikan strategi digitalnya sekarang?
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
              <MessageSquare size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
