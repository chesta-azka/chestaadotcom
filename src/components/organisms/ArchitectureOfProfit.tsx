'use client';

import React, { useRef } from 'react';
import type { Variants } from 'motion/react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { 
  Zap, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Database
} from 'lucide-react';

// Staggered container for cascading card revelation
const bentoContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.1,
    },
  },
};

const subgridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
    },
  },
};

// Luxury multi-dimensional entrance animation: depth-scale, optical blur-focus, snappy vertical elevation
const bentoCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.94,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

// Interactive Bento Card with targeted 3D hover perspective and sophisticated STATIC bioluminescent glow
function InteractiveBentoCard({
  children,
  className = "",
  variants = bentoCardVariants,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Normalized mouse coordinates between -0.5 and 0.5 for clean 3D perspective tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for buttery smooth 3D tilt
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 200, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 200, mass: 0.5 });

  // 3D rotation angles derived strictly from mouse coordinates
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalized [-0.5, 0.5] for 3D tilt
    mouseX.set((x / rect.width) - 0.5);
    mouseY.set((y / rect.height) - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div 
      variants={variants}
      style={{ perspective: 1200 }} 
      className="w-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`group/card relative rounded-[2.25rem] bg-white border border-slate-200/90 hover:border-purple-300 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-purple-900/10 transition-shadow duration-300 ${className}`}
      >
        {/* Subtle static radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent pointer-events-none rounded-[2.25rem]" />

        {/* Ambient subtle light sheen sweep across the card on entrance */}
        <div className="absolute inset-0 rounded-[2.25rem] overflow-hidden pointer-events-none z-10">
          <motion.div
            initial={{ x: "-120%", opacity: 0 }}
            whileInView={{ x: "120%", opacity: [0, 0.15, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
            className="w-full h-full bg-gradient-to-r from-transparent via-purple-300 to-transparent skew-x-12"
          />
        </div>

        {/* Content container with subtle 3D translation for depth */}
        <div className="relative z-20 h-full flex flex-col justify-between" style={{ transform: "translateZ(20px)" }}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ArchitectureOfProfit() {
  const whatsappUrl = "https://wa.me/6282125447232?text=" + encodeURIComponent("Halo Mas Chesta, saya ingin berdiskusi mengenai arsitektur sistem bisnis otonom dan pilar profitabilitas kami.");

  return (
    <section className="py-16 md:py-24 relative bg-white" id="architecture">
      {/* Background spatial atmospheric glow */}
      <div className="absolute top-1/3 left-1/4 w-[750px] h-[400px] bg-purple-200/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6">
        
        {/* STICKY SPLIT-SCREEN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative">
          
          {/* LEFT COLUMN: Sticky with Main Value Proposition */}
          <motion.div 
            initial={{ opacity: 0, x: -24, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] as const }}
            className="lg:col-span-5 lg:sticky lg:top-28 space-y-4"
          >
            <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase block">
              Pilar Profitabilitas Digital
            </span>

            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-950 tracking-tight leading-[1.12]">
              Sistem Otonom untuk Profit Maksimal.
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal text-balance pt-1">
              Website sub-detik dan asisten cerdas yang menyaring prospek otomatis 24/7 tanpa biaya sewa bulanan.
            </p>

            <div className="pt-2 space-y-3">
              {[
                { title: "Nol Human-Error Admin", desc: "Validasi otomatis mengunci pesanan tanpa salah rekap." },
                { title: "Respon Kilat Sub-Detik (< 0.2s)", desc: "Menutup transaksi sebelum pembeli melirik kompetitor." },
                { title: "100% Hak Milik Mutlak", desc: "Aset mandiri tanpa biaya sewa platform bulanan." }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={13} className="stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="font-medium text-slate-900 block">{item.title}</span>
                    <span className="text-slate-500 text-xs font-normal">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-purple-900 hover:bg-purple-800 text-white rounded-2xl font-medium text-sm shadow-sm hover:shadow transition-all cursor-pointer group border border-purple-800"
              >
                <span>Konsultasi Arsitektur Sistem</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Asymmetrical Bento Grid with Simplified Services */}
          <motion.div 
            variants={bentoContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="lg:col-span-7 space-y-6"
          >
            
            {/* ANCHOR CARD: HIGH-PERFORMANCE WEB */}
            <InteractiveBentoCard className="p-8 sm:p-10">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-[10px] font-mono font-medium uppercase tracking-widest text-purple-700 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200">
                    LAYANAN UTAMA
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-purple-900 text-white flex items-center justify-center shadow-xs border border-purple-800">
                    <Zap size={20} />
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-medium text-slate-900 tracking-tight leading-snug mb-2">
                  High-Performance Web
                </h3>
                
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal mb-6">
                  Kecepatan akses sub-detik (&lt; 0.2s) mengunci konversi iklan seketika tanpa bounce-rate.
                </p>

                {/* Outcome Metrics */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 mb-6">
                  <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-100">
                    <span className="text-xs text-slate-500 block font-normal">Kecepatan Muat</span>
                    <span className="text-lg sm:text-xl font-medium text-purple-700 font-mono">&lt; 0.2 Detik</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-100">
                    <span className="text-xs text-slate-500 block font-normal">Bounce Rate Iklan</span>
                    <span className="text-lg sm:text-xl font-medium text-purple-700 font-mono">Terkikis 0%</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                  Nol Delay Loading
                </span>
                <a
                  href={`https://wa.me/6282125447232?text=${encodeURIComponent("Halo Mas Chesta, saya tertarik dengan layanan High-Performance Web.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-purple-700 hover:text-purple-900 flex items-center gap-1.5 uppercase font-mono tracking-wider group/link cursor-pointer"
                >
                  <span>Pilih Layanan Ini</span>
                  <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </InteractiveBentoCard>

            {/* TWO-COLUMN SECONDARY BENTO CARDS */}
            <motion.div variants={subgridVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* CARD 2: AI AUTONOMOUS AGENT */}
              <InteractiveBentoCard className="p-7">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-medium uppercase tracking-widest text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                      02 • OTONOM
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                      <Cpu size={18} />
                    </div>
                  </div>

                  <h3 className="text-xl font-medium text-slate-900 tracking-tight mb-2">
                    AI Autonomous Agent
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mb-6">
                    Menyaring lead siap bayar 24/7 dan mengantarkan invoice langsung ke WhatsApp sales.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Pangkas Biaya Admin
                  </span>
                  <a
                    href={`https://wa.me/6282125447232?text=${encodeURIComponent("Halo Mas Chesta, saya tertarik dengan layanan AI Autonomous Agent.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-700 hover:text-purple-900 cursor-pointer"
                  >
                    <ArrowRight size={15} />
                  </a>
                </div>
              </InteractiveBentoCard>

              {/* CARD 3: ENTERPRISE DATABASE & SECURITY */}
              <InteractiveBentoCard className="p-7">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-medium uppercase tracking-widest text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                      03 • INTEGRASI
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                      <Database size={18} />
                    </div>
                  </div>

                  <h3 className="text-xl font-medium text-slate-900 tracking-tight mb-2">
                    Enterprise Database
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mb-6">
                    Sinkronisasi transaksi otomatis tanpa salah nominal, salah alamat, atau selisih stok.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-medium text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                    100% Hak Milik Aset
                  </span>
                  <a
                    href={`https://wa.me/6282125447232?text=${encodeURIComponent("Halo Mas Chesta, saya tertarik dengan layanan Enterprise Database.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-700 hover:text-purple-900 cursor-pointer"
                  >
                    <ArrowRight size={15} />
                  </a>
                </div>
              </InteractiveBentoCard>

            </motion.div>

            {/* SECONDARY ROW: CORPORATE AUTOMATION SYSTEM */}
            <InteractiveBentoCard className="p-8 sm:p-9">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-mono font-medium uppercase tracking-widest text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                      04 • EKOSISTEM MANDIRI
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-medium text-slate-900 tracking-tight mb-1">
                    Corporate Automation System
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal max-w-xl leading-relaxed">
                    Ekosistem bisnis otonom 100% hak milik mutlak tanpa biaya sewa platform bulanan.
                  </p>
                </div>

                <a
                  href={`https://wa.me/6282125447232?text=${encodeURIComponent("Halo Mas Chesta, saya ingin konsultasi Corporate Automation System.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-purple-900 hover:bg-purple-800 text-white rounded-xl text-xs font-mono font-medium tracking-wider uppercase flex items-center justify-center gap-2 shrink-0 transition-all cursor-pointer shadow-xs border border-purple-800"
                >
                  <span>Konsultasi</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </InteractiveBentoCard>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
