'use client';

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "motion/react";
import { Zap, ShieldCheck, ArrowRight, Sparkles, Cpu } from "lucide-react";

interface Interactive3DBentoCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glowColor?: string;
}

function Interactive3DBentoCard({
  children,
  className = "",
  maxTilt = 7,
  glowColor = "rgba(168, 85, 247, 0.22)",
}: Interactive3DBentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized mouse coordinates (-0.5 to 0.5)
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  // Absolute pixel mouse coordinates for the dynamic radial bioluminescent glow
  const mousePxX = useMotionValue(0);
  const mousePxY = useMotionValue(0);

  // Elite spring physics for silky-smooth response
  const springConfig = { mass: 0.8, stiffness: 240, damping: 22 };
  const smoothNormX = useSpring(normX, springConfig);
  const smoothNormY = useSpring(normY, springConfig);

  // Transform coordinates to 3D tilt angles
  const rotateX = useTransform(smoothNormY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothNormX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Spring physics for the radial cursor spotlight
  const smoothGlowX = useSpring(mousePxX, { stiffness: 320, damping: 28 });
  const smoothGlowY = useSpring(mousePxY, { stiffness: 320, damping: 28 });

  const radialGlow = useMotionTemplate`radial-gradient(550px circle at ${smoothGlowX}px ${smoothGlowY}px, ${glowColor}, transparent 70%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    mousePxX.set(clientX);
    mousePxY.set(clientY);

    normX.set(clientX / rect.width - 0.5);
    normY.set(clientY / rect.height - 0.5);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    normX.set(0);
    normY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", mass: 0.8, stiffness: 240, damping: 22 }}
      className={`relative overflow-hidden rounded-[2.25rem] bg-white/70 backdrop-blur-xl border border-purple-100/50 shadow-xl shadow-purple-900/5 hover:border-purple-300/80 transition-colors duration-500 group ${className}`}
    >
      {/* Internal Bioluminescent Mouse-Reactive Glow Layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          background: radialGlow,
          opacity: isHovered ? 1 : 0,
        }}
      />
      
      {/* 3D Content Layer with Internal Depth */}
      <div className="relative z-10 h-full flex flex-col justify-between" style={{ transform: "translateZ(25px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const whatsappUrl = "https://wa.me/6282125447232?text=" + encodeURIComponent("Halo Mas Chesta, saya ingin mendiskusikan sistem digital anti-salah input dan aset 100% milik perusahaan kami.");

  return (
    <section className="w-full py-16 md:py-20 relative bg-transparent overflow-hidden" id="why-choose-us" style={{ perspective: 1200 }}>
      {/* Background Spatial Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-purple-200/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header with Extreme Typographic Hierarchy */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 text-xs font-bold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
            <span className="tracking-widest uppercase">KEUNTUNGAN MUTLAK BISNIS ANDA</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 font-display tracking-tight leading-[1.1] text-balance">
            Arsitektur Digital yang Menjamin Profit &amp; Skalabilitas Otonom.
          </h2>
          <p className="text-slate-600 mt-5 text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed text-balance">
            Sistem kami dirancang khusus untuk mengamankan margin profit, memangkas biaya operasional admin secara drastis, dan mengunci perhatian pembeli seketika.
          </p>
        </div>

        {/* Asymmetric Bento Grid: Massive Anchor Card (col-span-7) + Secondary (col-span-5) + Bottom Foundation (col-span-12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Massive Primary Anchor Card (Admin Sanity & Error Guard) */}
          <div className="lg:col-span-7 flex">
            <Interactive3DBentoCard className="w-full p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="h-14 w-14 rounded-2xl bg-purple-900 text-white flex items-center justify-center shadow-xl shadow-purple-900/30 group-hover:scale-105 transition-transform duration-300">
                    <ShieldCheck className="h-7 w-7 text-purple-300" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-purple-800 bg-purple-50 px-4 py-1.5 rounded-full border border-purple-200 shadow-sm">
                    OTOMATISASI TOTAL
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 font-display tracking-tight leading-tight">
                  Tidak Ada Lagi Admin Salah Input Data atau Kerja Dua Kali
                </h3>
                <p className="text-slate-600 mt-5 text-base md:text-lg leading-relaxed font-light">
                  Admin tidak perlu input berulang atau ketik manual ke banyak dokumen. Sekali klik pelanggan, data langsung terverifikasi, tersimpan rapi, dan diteruskan otomatis ke tim sales. Lindungi margin profit perusahaan Anda dari kerugian human-error.
                </p>
              </div>

              {/* Technical Validation Log Visual */}
              <div className="mt-8 rounded-2xl bg-slate-950 border border-slate-800 p-5 shadow-2xl text-xs font-mono text-slate-200">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80 text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[11px] text-slate-500 font-sans tracking-widest uppercase">OTOMATISASI-AKTIF.LOG</span>
                </div>
                <div className="space-y-2">
                  <p className="text-slate-500 font-light">// Verifikasi instan &amp; sinkronisasi pesanan otonom</p>
                  <p className="text-emerald-400 font-bold">✓ Nol Human-Error. Otomatis Terhubung ke WhatsApp Sales.</p>
                  <p className="text-purple-300 font-bold">✓ Sinkronisasi Database Real-time Selesai Sub-Detik.</p>
                </div>
              </div>
            </Interactive3DBentoCard>
          </div>

          {/* Card 2: Secondary Anchor Card (Speed & Instant Lead Scoring) */}
          <div className="lg:col-span-5 flex">
            <Interactive3DBentoCard className="w-full p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="h-14 w-14 rounded-2xl bg-purple-900 text-white flex items-center justify-center shadow-xl shadow-purple-900/30 group-hover:scale-105 transition-transform duration-300">
                    <Zap className="h-7 w-7 text-amber-300" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-purple-800 bg-purple-50 px-4 py-1.5 rounded-full border border-purple-200 shadow-sm">
                    SPEED &amp; LEAD SCORING
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-slate-900 font-display tracking-tight leading-tight">
                  Website Super Cepat &amp; Asisten Pintar
                </h3>
                <p className="text-slate-600 mt-5 text-base md:text-lg leading-relaxed font-light">
                  Website super cepat dipadukan dengan asisten pintar yang otomatis menyaring prospek dan menutup penjualan di detik pertama sebelum calon pembeli lari ke kompetitor.
                </p>
              </div>

              {/* Performance Indicator Card */}
              <div className="mt-8 p-6 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-center justify-between shadow-inner">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">KECEPATAN AKSES</p>
                  <p className="text-sm text-purple-900 font-black mt-1">Sub-Detik Tanpa Menunggu</p>
                  <p className="text-xs text-slate-500 font-light mt-0.5">Optimasi Next.js Edge Caching</p>
                </div>
                <div className="h-14 px-4 rounded-xl bg-purple-900 text-white font-mono font-black text-xl flex items-center justify-center shadow-lg shadow-purple-900/30">
                  &lt; 0.2s
                </div>
              </div>
            </Interactive3DBentoCard>
          </div>

          {/* Card 3: Foundation Anchor (Payroll Savings & 100% Asset Ownership) */}
          <div className="lg:col-span-12 flex">
            <Interactive3DBentoCard className="w-full p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex items-start gap-6 md:gap-8">
                <div className="h-16 w-16 rounded-2xl bg-purple-900 text-white flex items-center justify-center shadow-xl shadow-purple-900/30 shrink-0 mt-1">
                  <Cpu className="h-8 w-8 text-purple-300" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="text-xs font-black uppercase tracking-widest text-purple-800 bg-purple-50 px-4 py-1.5 rounded-full border border-purple-200 shadow-sm">
                      PANGKAS BIAYA PAYROLL
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200 shadow-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                      100% ASET MILIK PERUSAHAAN
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 font-display tracking-tight leading-tight">
                    Sistem cerdas yang melayani ratusan pelanggan bersamaan 24/7 tanpa cuti, memangkas biaya operasional admin secara drastis.
                  </h3>
                  <p className="text-slate-600 mt-4 text-base md:text-lg font-light max-w-4xl leading-relaxed">
                    Aset 100% milik Anda tanpa biaya langganan bulanan atau jebakan ketergantungan agensi. Kode sumber dan seluruh hak cipta diserahkan penuh ke tangan Anda secara transparan.
                  </p>
                </div>
              </div>

              <div className="shrink-0 w-full md:w-auto">
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-purple-900 text-white rounded-2xl font-bold text-base shadow-[0_12px_32px_-8px_rgba(88,28,135,0.4)] hover:bg-purple-800 transition-all border border-purple-800 hover:shadow-lg w-full md:w-auto"
                >
                  <span>Amankan Aset Perusahaan</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Interactive3DBentoCard>
          </div>

        </div>
      </div>
    </section>
  );
}
