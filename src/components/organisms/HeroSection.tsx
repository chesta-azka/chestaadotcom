import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, Variants } from 'motion/react';
import { 
  ArrowRight, 
  MessageCircle, 
  BriefcaseBusiness, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Bot, 
  CheckCircle2 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function HeroSection() {
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.innerWidth < 1024 || !ctaRef.current) return;
    const { left, top, width, height } = ctaRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) / 5);
    y.set((e.clientY - centerY) / 5);
  };

  const ctaMouseLeave = () => {
    if (window.innerWidth < 1024) return;
    x.set(0);
    y.set(0);
  };

  const whatsappWebUrl = "https://wa.me/6282125447232?text=Halo%20CHESTADOTCOM%2C%20saya%20tertarik%20untuk%20konsultasi%20pembuatan%20website%20modern%20%2F%20aplikasi%20bisnis.";

  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    toast.success('Membuka WhatsApp untuk diskusi proyek digital...', {
      duration: 3500,
      icon: '💬',
      style: {
        background: '#0f172a',
        color: '#fff',
        fontSize: '14px',
        borderRadius: '12px',
        border: '1px solid rgba(147, 51, 234, 0.3)'
      }
    });
  };

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
    hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[90vh] pt-32 sm:pt-40 md:pt-48 pb-20 md:pb-32 overflow-hidden flex flex-col items-center justify-center text-center select-none"
    >
      {/* Background Subtle Ambient Light */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden bg-white">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[550px] bg-gradient-to-b from-purple-100/60 via-indigo-50/40 to-transparent blur-[120px] rounded-full" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center z-10"
      >
        {/* Studio Status Pill */}
        <motion.div 
          variants={fadeInUpVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 shadow-2xs mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-700">
            CHESTAADOTCOM • BSD City &amp; Tangerang
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-[11px] font-mono font-bold text-purple-700">
            Next.js &amp; Agentic AI
          </span>
        </motion.div>

        {/* Main Display Headline */}
        <motion.h1 
          id="hero-headline"
          variants={fadeInUpVariants}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] font-display font-extrabold tracking-tight leading-[1.15] text-slate-900 max-w-4xl text-balance"
        >
          Arsitektur Website Modern & <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-900 via-indigo-800 to-purple-950">
            Otomasi Bisnis dengan AI.
          </span>
        </motion.h1>

        {/* Sub-Headline / Value Proposition */}
        <motion.p 
          id="hero-description"
          variants={fadeInUpVariants}
          className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 font-sans max-w-2xl sm:max-w-3xl leading-relaxed text-balance"
        >
          Studio rekayasa perangkat lunak profesional oleh <strong>Chesta Azka Sofyan</strong>. Kami merancang website berkinerja tinggi, berkecepatan sub-detik, serta sistem automasi digital yang mendongkrak omset dan kredibilitas korporasi Anda.
        </motion.p>

        {/* Feature Badges */}
        <motion.div 
          variants={fadeInUpVariants} 
          className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200">
            <Zap size={13} className="text-amber-500 fill-amber-500" />
            Performa &lt; 0.5s
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200">
            <ShieldCheck size={13} className="text-purple-600" />
            SEO Google &amp; Enterprise
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200">
            <Bot size={13} className="text-indigo-600" />
            AI &amp; WhatsApp Bot
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200">
            <CheckCircle2 size={13} className="text-emerald-600" />
            100% Hak Milik Klien
          </span>
        </motion.div>

        {/* Call-To-Action Group */}
        <motion.div
          id="hero-cta-group"
          variants={fadeInUpVariants}
          className="mt-10 flex flex-col items-center justify-center gap-5 w-full"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none">
            {/* Primary CTA - WhatsApp Consultation */}
            <motion.a
              id="hero-cta-web-project"
              ref={ctaRef}
              href={whatsappWebUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              style={{ x: springX, y: springY }}
              onMouseMove={handleMouseMove}
              onMouseLeave={ctaMouseLeave}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-purple-900 hover:bg-purple-800 text-white font-sans text-sm sm:text-base font-bold shadow-xl shadow-purple-950/15 transition-all cursor-pointer w-full sm:w-auto overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-700/0 via-white/15 to-purple-700/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <MessageCircle size={18} className="text-emerald-400 fill-emerald-400/20" />
              <span>Konsultasi Proyek di WhatsApp</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </motion.a>

            {/* Secondary CTA - Portfolio */}
            <Link
              to="/portfolio"
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 hover:text-purple-900 font-sans text-sm sm:text-base font-semibold border border-slate-200 transition-all cursor-pointer w-full sm:w-auto"
            >
              <BriefcaseBusiness size={17} className="text-slate-500 group-hover:text-purple-700 transition-colors" />
              <span>Lihat Portofolio</span>
              <ArrowRight size={15} className="text-slate-400 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>

          {/* Quick Helper Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs text-slate-500 mt-2">
            <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Respon Cepat &lt; 15 Menit
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-floating-ai'))}
              className="inline-flex items-center gap-1 text-purple-700 hover:text-purple-900 font-semibold hover:underline cursor-pointer"
            >
              <Sparkles size={12} />
              <span>Tanya Estimasi Budget via AI</span>
            </button>
          </div>
        </motion.div>

        {/* Minimalist Trust & Track Record Bar */}
        <motion.div 
          variants={fadeInUpVariants}
          className="mt-14 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-slate-500 text-xs font-mono"
        >
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 text-sm">50+</span>
            <span>Proyek Sukses</span>
          </div>
          <span className="hidden sm:inline text-slate-300">•</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 text-sm">99.98%</span>
            <span>Cloud Uptime</span>
          </div>
          <span className="hidden sm:inline text-slate-300">•</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 text-sm">100%</span>
            <span>Source Code Klien</span>
          </div>
          <span className="hidden sm:inline text-slate-300">•</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 text-sm">30 Hari</span>
            <span>Garansi Perawatan</span>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
