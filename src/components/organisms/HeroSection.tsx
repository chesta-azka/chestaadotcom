import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, Variants } from 'motion/react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
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

  const whatsappUrl = "https://wa.me/6282125447232?text=Halo%20CHESTADOTCOM%2C%20saya%20tertarik%20untuk%20konsultasi%20pembuatan%20website%20%26%20solusi%20AI.";

  // Staggered Motion Sequence Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const fadeInUpVariants: Variants = {
    hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const ctaGroupVariants: Variants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.1,
      },
    },
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[80vh] sm:min-h-[85vh] pt-40 md:pt-48 pb-20 md:pb-28 overflow-hidden flex flex-col items-center justify-center text-center select-none"
    >
      {/* Enhanced Ambient Lighting & Atmosphere */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden bg-slate-50/50">
        {/* Central Violet Glow Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] md:w-[1300px] h-[500px] sm:h-[700px] bg-gradient-to-b from-purple-800/15 via-purple-600/8 to-transparent blur-[130px] rounded-full" />
        
        {/* Top-Right Soft Violet Ambient Sphere */}
        <div className="absolute -top-32 right-1/4 w-[550px] h-[400px] bg-purple-900/12 blur-[120px] rounded-full" />
        
        {/* Top-Left Indigo Accent */}
        <div className="absolute -top-28 left-1/4 w-[500px] h-[350px] bg-indigo-900/10 blur-[110px] rounded-full" />

        {/* Minimal Geometric Mask Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#581c8708_1px,transparent_1px),linear-gradient(to_bottom,#581c8708_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,#000_65%,transparent_100%)]" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center z-10"
      >
        {/* Trust & Status Pill */}
        <motion.div 
          variants={fadeInUpVariants}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-purple-200/70 shadow-xs mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-purple-900">
            Jasa Website & AI solusi Cisauk BSD
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          id="hero-headline"
          variants={fadeInUpVariants}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight leading-[1.08] text-slate-900 max-w-5xl text-balance"
        >
          Arsitektur Enterprise & <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-950 via-purple-800 to-indigo-950">
            Optimasi Konversi Digital.
          </span>
        </motion.h1>

        {/* Sub-Headline / Description */}
        <motion.p 
          id="hero-description"
          variants={fadeInUpVariants}
          className="mt-6 sm:mt-8 md:mt-10 text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 font-sans max-w-2xl sm:max-w-3xl leading-relaxed text-balance font-normal"
        >
          Kami merancang infrastruktur web berkinerja tinggi, sistem cloud andal, dan strategi optimasi konversi terukur untuk mentransformasi prospek menjadi transaksi bernilai tinggi bagi bisnis skala enterprise Anda.
        </motion.p>

        {/* Call-To-Action Group */}
        <motion.div
          id="hero-cta-group"
          variants={ctaGroupVariants}
          className="mt-8 sm:mt-10 md:mt-12 flex flex-col items-center justify-center gap-4 w-full"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <motion.a
              id="hero-cta-whatsapp"
              ref={ctaRef}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={isMobile ? {} : { x: springX, y: springY }}
              onMouseMove={handleMouseMove}
              onMouseLeave={ctaMouseLeave}
              whileHover={isMobile ? {} : { scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 hover:from-purple-900 hover:to-purple-950 text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg shadow-purple-950/20 hover:shadow-purple-950/35 transition-all cursor-pointer border border-purple-700/30 w-full sm:w-auto"
            >
              <MessageCircle size={17} className="text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Konsultasi via WhatsApp</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </motion.a>
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/80 hover:bg-white text-slate-700 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider border border-slate-200 shadow-xs hover:border-purple-300 transition-all cursor-pointer w-full sm:w-auto"
            >
              <span>Lihat Portofolio</span>
            </Link>
          </div>

          {/* Direct Consultation Link */}
          <div className="mt-2 flex items-center justify-center gap-2">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-floating-ai'))}
              className="inline-flex items-center gap-1.5 text-xs text-purple-900 hover:text-purple-700 transition-colors font-sans font-medium hover:underline cursor-pointer"
            >
              <span>Butuh estimasi kilat? Tanya <strong>Assistant AI Web</strong> di sini</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
