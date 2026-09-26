"use client"

import React, { useRef } from "react"
import { ArrowRight, Sparkles, ShieldCheck, Zap, Activity, CheckCircle2 } from "lucide-react"
import { motion, useMotionValue, useTransform, useSpring } from "motion/react"
import MagneticButton from "../atoms/MagneticButton"

interface HeroProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
}

export function HeroPurple({
  eyebrow = "Studio Arsitektur Digital & Sistem Penjualan Otomatis",
  title = "Dominasi Pasar Digital. Amankan Profit Maksimal.",
  subtitle = "Sistem bisnis otonom berkecepatan tinggi. Nol risiko human-error, respon instan seketika, dan 100% hak milik aset mutlak.",
  ctaLabel = "Konsultasi Langsung via WhatsApp",
  ctaHref = "https://wa.me/6282125447232?text=Halo%20Mas%20Chesta,%20saya%20ingin%20berdiskusi%20mengenai%20website%20penjualan%20super%20cepat%20dan%20sistem%20otomasi%20bisnis.",
  secondaryCtaLabel = "Lihat Paket Investasi",
  secondaryCtaHref = "#pricing",
}: HeroProps) {
  // Track mouse position over the hero section strictly for the Hero Asset
  const heroRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Elite spring configuration for natural momentum
  const springConfig = { damping: 25, stiffness: 220, mass: 0.6 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D Spatial rotation for the Hero Asset ONLY
  const rotateX = useTransform(smoothMouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(smoothMouseX, [-300, 300], [-10, 10]);

  // Subtle floating depth translation
  const translateZ = useTransform(smoothMouseY, [-300, 300], [15, -15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Masked blur-cascade split-text words for the headline
  const titleWords = title.split(" ");

  return (
    <section
      ref={heroRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto w-full pt-28 md:pt-36 pb-16 md:pb-20 px-6 text-center md:px-8 
      min-h-[85vh] flex flex-col justify-center items-center bg-gradient-to-b from-white via-slate-50/50 to-white"
    >
      {/* Background Spatial Atmosphere - Minimalist, Understated */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-100/35 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8 relative z-20">
        
        {/* Eyebrow Badge (Lightweight clean entrance) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-purple-900 text-xs font-medium shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-700" />
          <span className="uppercase tracking-widest">{eyebrow}</span>
        </motion.div>

        {/* MASKED BLUR-CASCADE SPLIT-TEXT REVEAL ONLY FOR MAIN HEADLINE */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight text-slate-950 leading-[1.06] text-balance">
          {titleWords.map((word, index) => (
            <span key={index} className="inline-block overflow-hidden mr-[0.25em] align-top py-1">
              <motion.span
                initial={{ y: 30, opacity: 0, filter: "blur(15px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.08 + index * 0.06,
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subtitle with elegant entrance */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="text-slate-600 text-base md:text-lg font-normal max-w-2xl leading-relaxed text-balance"
        >
          {subtitle}
        </motion.p>

        {/* Magnetic CTAs ONLY in Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 pt-2"
        >
          <MagneticButton
            href={ctaHref}
            className="px-8 py-4 bg-purple-900 hover:bg-purple-800 text-white rounded-2xl font-medium text-sm shadow-sm hover:shadow transition-all border border-purple-800 whitespace-nowrap cursor-pointer"
            strength={28}
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>

          <MagneticButton
            href={secondaryCtaHref}
            className="px-6 py-4 bg-white text-slate-800 border border-slate-200/90 hover:border-purple-300 rounded-2xl font-medium text-sm hover:bg-purple-50/40 transition-colors whitespace-nowrap cursor-pointer shadow-xs"
            strength={20}
          >
            {secondaryCtaLabel}
          </MagneticButton>
        </motion.div>

        {/* 3D SPATIAL HOLOGRAPHIC HERO ASSET (Advanced Mouse Parallax Applied ONLY Here) */}
        <div className="w-full max-w-4xl mt-10" style={{ perspective: 1200 }}>
          <motion.div
            style={{
              rotateX,
              rotateY,
              z: translateZ,
              transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-[2.25rem] bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-2xl shadow-slate-200/60 p-6 md:p-8 overflow-hidden text-left"
          >
            {/* Top Bar / Status */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100" style={{ transform: "translateZ(25px)" }}>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="h-4 w-[1px] bg-slate-200 mx-1" />
                <span className="text-xs font-mono font-medium text-purple-950 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-purple-700" />
                  Autonomous Engine v3.2
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200/80">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Otonom 24/7 Aktif</span>
              </div>
            </div>

            {/* Qualitative Outcome Metric Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6" style={{ transform: "translateZ(45px)" }}>
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100/90">
                <div className="flex items-center justify-between text-xs text-purple-950 font-medium mb-2">
                  <span>Kecepatan Respons</span>
                  <Zap className="w-4 h-4 text-purple-700" />
                </div>
                <div className="text-2xl sm:text-3xl font-medium text-purple-950 tracking-tight">&lt; 0.2s</div>
                <p className="text-xs text-slate-500 mt-1 font-normal">Tanpa antrean, instan seketika</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between text-xs text-slate-700 font-medium mb-2">
                  <span>Akurasi Data Pesanan</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-medium text-emerald-700 tracking-tight">Nol Error</div>
                <p className="text-xs text-slate-500 mt-1 font-normal">Nol risiko human-error admin</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between text-xs text-slate-800 font-medium mb-2">
                  <span>Kepemilikan Aset</span>
                  <CheckCircle2 className="w-4 h-4 text-purple-800" />
                </div>
                <div className="text-2xl sm:text-3xl font-medium text-slate-900 tracking-tight">100% Hak Milik</div>
                <p className="text-xs text-slate-500 mt-1 font-normal">Tanpa biaya sewa platform</p>
              </div>
            </div>

            {/* Decorative ambient subtle sweep */}
            <div className="absolute -inset-x-20 -bottom-20 h-40 bg-gradient-to-t from-purple-100/20 to-transparent blur-2xl pointer-events-none" />
          </motion.div>
        </div>

      </div>
    </section>
  )
}
