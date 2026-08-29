import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, Variants } from 'motion/react';
import { ArrowRight, Sparkles, MessageCircle, ExternalLink, Zap, ShieldCheck, Bot, Cpu, CheckCircle2, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  
  const ctaRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isMobile || !ctaRef.current) return;
    const { left, top, width, height } = ctaRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) / 4);
    y.set((e.clientY - centerY) / 4);
  };

  const ctaMouseLeave = () => {
    if (isMobile) return;
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleChatClick = () => {
    const text = 'Halo CHESTAADOTCOM, saya tertarik untuk berkonsultasi mengenai pembuatan website & arsitektur digital untuk bisnis saya.';
    window.open(`https://wa.me/6282125447232?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Sophisticated Staggered Motion Sequence Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const fadeInUpVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.85,
        ease: "easeOut",
      },
    },
  };

  const ctaGroupVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.25, // Deliberate slight delay for CTA button to draw user focus
      },
    },
  };

  const floatingIllustrationVariants: Variants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.4,
      },
    },
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[90svh] pt-32 md:pt-44 pb-16 md:pb-24 overflow-hidden flex flex-col items-center justify-center text-center select-none"
    >
      {/* Background Decor - Focused Purple & Slate Atmosphere */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden bg-slate-50/60">
        {/* Central Purple Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] md:w-[1200px] h-[500px] sm:h-[700px] bg-gradient-to-b from-purple-800/15 via-purple-900/10 to-transparent blur-[100px] sm:blur-[130px] rounded-full" />
        
        {/* Top-Right Soft Violet Ambient Sphere */}
        <div className="absolute -top-24 right-1/4 w-[500px] h-[350px] bg-purple-900/12 blur-[110px] rounded-full" />
        
        {/* Top-Left Indigo Accent */}
        <div className="absolute -top-20 left-1/4 w-[450px] h-[300px] bg-purple-800/10 blur-[100px] rounded-full" />

        {/* Minimal Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#581c870a_1px,transparent_1px),linear-gradient(to_bottom,#581c870a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_45%,#000_70%,transparent_100%)]" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center z-10"
      >
        
        {/* Purple Pill Badge (Indonesian) */}
        <motion.div 
          variants={fadeInUpVariants}
          className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-purple-50/90 backdrop-blur-md border border-purple-200/90 shadow-2xs text-[10px] sm:text-xs font-mono tracking-wider sm:tracking-widest uppercase mb-5 sm:mb-8 text-purple-800 hover:border-purple-300 transition-colors max-w-full"
        >
          <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse shrink-0" />
          <span className="font-bold">CHESTAADOTCOM &bull; ARSITEKTUR DIGITAL & OTOMASI AI</span>
        </motion.div>

        {/* High-Impact Headline (Indonesian) */}
        <motion.h1 
          variants={fadeInUpVariants}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold tracking-tight leading-[1.1] sm:leading-[1.08] text-slate-900 max-w-4xl text-balance break-words"
        >
          Arsitektur Website & <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-900 via-purple-800 to-purple-950">
            Solusi AI Korporat.
          </span>
        </motion.h1>

        {/* Compelling Sub-Headline (Indonesian) */}
        <motion.p 
          variants={fadeInUpVariants}
          className="mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 font-sans max-w-2xl leading-relaxed font-normal text-balance px-2 sm:px-0"
        >
          Membantu bisnis, korporasi, dan UMKM mendominasi pasar digital dengan website berkecepatan tinggi, estetika UI/UX premium, dan sistem Agentic AI cerdas yang mengonversi pengunjung menjadi klien setia.
        </motion.p>

        {/* Staggered Interactive Call-To-Actions (Slightly Delayed) */}
        <motion.div
          variants={ctaGroupVariants}
          className="mt-6 sm:mt-8 md:mt-10 flex flex-wrap sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none"
        >
          {/* Primary Purple Button */}
          <div className="w-full sm:w-auto">
            <motion.button
              ref={ctaRef}
              style={isMobile ? {} : { x: springX, y: springY }}
              onMouseMove={handleMouseMove}
              onMouseLeave={ctaMouseLeave}
              onClick={handleChatClick}
              whileHover={isMobile ? {} : { scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-purple-900 via-purple-800 to-purple-950 hover:from-purple-950 hover:to-purple-900 text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg shadow-purple-900/25 hover:shadow-purple-900/40 transition-all cursor-pointer border border-purple-700/30"
            >
              <span>Konsultasi Proyek</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>
          
          {/* Secondary Outline Button */}
          <div className="w-full sm:w-auto">
            <motion.div
              whileHover={isMobile ? {} : { scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/95 backdrop-blur-md border border-purple-200 hover:border-purple-300 hover:bg-purple-50/60 text-slate-800 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-xs"
              >
                <span>Lihat Portofolio</span>
                <ExternalLink size={15} className="text-purple-800" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Subtle AI-Generated Abstract Geometric & Glass-morphism Illustration */}
        <motion.div
          variants={floatingIllustrationVariants}
          className="mt-8 sm:mt-12 md:mt-14 w-full max-w-3xl px-1 sm:px-0"
        >
          <div className="relative p-1 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-purple-200/60 via-purple-100/30 to-transparent shadow-sm">
            <div className="bg-white/40 backdrop-blur-2xl rounded-[18px] sm:rounded-[22px] border border-white/60 p-3.5 sm:p-6 shadow-xl shadow-purple-900/5">
              
              {/* Top Glass Header Indicator */}
              <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-purple-50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 flex items-center gap-1.5 pl-2 border-l border-slate-200 truncate">
                    <Terminal size={12} className="text-purple-800 shrink-0" />
                    chestaadotcom-core-v2.6.sh
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200/70 text-[9px] sm:text-[10px] font-mono text-purple-800 font-bold uppercase">
                    <Cpu size={12} className="text-purple-800" />
                    Agentic AI Aktif
                  </span>
                </div>
              </div>

              {/* 3 Metric Glass Pills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-left">
                {/* Metric 1 */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-purple-50/40 border border-purple-100/70 hover:border-purple-200 transition-colors">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-purple-800 font-mono text-[11px] sm:text-xs font-bold mb-1">
                    <Zap size={13} className="text-purple-800 shrink-0" />
                    <span>&lt; 0.8s Load Time</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-sans text-slate-500 leading-snug">
                    Arsitektur ringan & lulus uji Core Web Vitals 100%.
                  </p>
                </div>

                {/* Metric 2 */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-purple-50/40 border border-purple-100/70 hover:border-purple-200 transition-colors">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-purple-700 font-mono text-[11px] sm:text-xs font-bold mb-1">
                    <ShieldCheck size={13} className="text-purple-800 shrink-0" />
                    <span>SEO Organik 2026</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-sans text-slate-500 leading-snug">
                    Struktur ramah algoritma Google berbasis Dwell-Time.
                  </p>
                </div>

                {/* Metric 3 */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-purple-50/40 border border-purple-100/70 hover:border-purple-200 transition-colors">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-purple-700 font-mono text-[11px] sm:text-xs font-bold mb-1">
                    <Bot size={13} className="text-purple-800 shrink-0" />
                    <span>Otomasi WhatsApp</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-sans text-slate-500 leading-snug">
                    AI merespon dan memproses prospek 24/7 otomatis.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Subtle Bottom Trust Badges */}
        <motion.div
          variants={fadeInUpVariants}
          className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-10 text-[11px] sm:text-xs font-mono text-slate-500"
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <CheckCircle2 size={13} className="text-purple-800 shrink-0" />
            <span>Kustomisasi Penuh (No Template)</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <CheckCircle2 size={13} className="text-purple-800 shrink-0" />
            <span>Garansi Performa & Support</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <CheckCircle2 size={13} className="text-purple-800 shrink-0" />
            <span>WhatsApp Direct Sync</span>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
