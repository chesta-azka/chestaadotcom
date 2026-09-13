import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, Variants } from 'motion/react';
import { 
  ArrowRight, 
  MessageCircle, 
  BriefcaseBusiness, 
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const lightSweepX = useTransform(scrollYProgress, [0, 1], ["-20%", "120%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.9, 0.3]);

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
        staggerChildren: 0.05,
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
      ref={sectionRef}
      id="home" 
      className="relative min-h-[90vh] pt-32 sm:pt-40 md:pt-48 pb-20 md:pb-32 overflow-hidden flex flex-col items-center justify-center text-center select-none"
    >
      {/* Background Subtle Ambient Light & Scroll-Triggered Animated Light-Sweep */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden bg-white">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[1000px] h-[450px] sm:h-[600px] bg-gradient-to-b from-purple-100/70 via-indigo-50/50 to-transparent blur-[130px] rounded-full" />
        
        {/* Animated Scroll Light-Sweep focusing on IT Solution messaging */}
        <motion.div 
          style={{ x: lightSweepX, opacity: bgOpacity }}
          className="absolute top-0 bottom-0 w-[450px] bg-gradient-to-r from-transparent via-purple-300/35 to-transparent blur-[90px] pointer-events-none"
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
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
          <span className="text-[12px] font-sans font-semibold text-slate-700">
            CHESTAADOTCOM • BSD City &amp; Tangerang
          </span>
        </motion.div>

        {/* Main Display Headline */}
        <motion.h1 
          id="hero-headline"
          variants={fadeInUpVariants}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] font-display font-black tracking-tight leading-[1.15] text-slate-900 max-w-4xl text-balance"
        >
          Arsitektur Website Modern & <br className="hidden sm:block" />
          <span className="text-purple-700">
            Otomasi Bisnis dengan AI.
          </span>
        </motion.h1>

        {/* Sub-Headline / Value Proposition */}
        <motion.p 
          id="hero-description"
          variants={fadeInUpVariants}
          className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 font-sans max-w-2xl sm:max-w-3xl leading-relaxed text-balance"
        >
          Studio{' '}
          <motion.span 
            initial={{ backgroundColor: 'transparent', color: '#0f172a' }}
            animate={{ backgroundColor: '#9333ea', color: '#ffffff' }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="px-1 py-0.5 font-bold"
          >
            rekayasa perangkat lunak
          </motion.span>{' '}
          profesional oleh <strong>Chesta Azka Sofyan</strong>. Kami merancang website berkinerja tinggi, berkecepatan sub-detik, serta sistem automasi digital dengan{' '}
          <motion.span 
            initial={{ backgroundColor: 'transparent', color: '#0f172a' }}
            animate={{ backgroundColor: '#9333ea', color: '#ffffff' }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            className="px-1 py-0.5 font-bold"
          >
            Agentic AI
          </motion.span>{' '}
          yang mendongkrak omset dan kredibilitas korporasi Anda.
        </motion.p>

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
              <BriefcaseBusiness size={17} className="text-slate-600 group-hover:text-purple-700 transition-colors" />
              <span>Lihat Portofolio</span>
              <ArrowRight size={15} className="text-slate-400 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>

          {/* Quick Helper Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs text-slate-600 mt-2">
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
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.4 } }
          }}
          className="mt-14 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-slate-600 text-xs font-mono"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }} className="flex items-center gap-2">
            <span className="font-bold text-slate-900 text-sm">50+</span>
            <span>Proyek Sukses</span>
          </motion.div>
          <motion.span variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="hidden sm:inline text-slate-300">•</motion.span>
          <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }} className="flex items-center gap-2">
            <span className="font-bold text-slate-900 text-sm">99.98%</span>
            <span>Cloud Uptime</span>
          </motion.div>
          <motion.span variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="hidden sm:inline text-slate-300">•</motion.span>
          <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }} className="flex items-center gap-2">
            <span className="font-bold text-slate-900 text-sm">100%</span>
            <span>Source Code Klien</span>
          </motion.div>
          <motion.span variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="hidden sm:inline text-slate-300">•</motion.span>
          <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }} className="flex items-center gap-2">
            <span className="font-bold text-slate-900 text-sm">30 Hari</span>
            <span>Garansi Perawatan</span>
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
}
