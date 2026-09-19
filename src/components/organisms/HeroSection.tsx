import SparkleOverlay from '../atoms/SparkleOverlay';
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, Variants, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  MessageCircle, 
  BriefcaseBusiness, 
  Sparkles,
  Zap,
  Globe,
  Cpu,
  ShieldCheck,
  Code2,
  Terminal,
  Activity,
  Layers,
  Database,
  Bot
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import MagneticButton from '../atoms/MagneticButton';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeConsoleTab, setActiveConsoleTab] = useState<'architecture' | 'vitals' | 'stack'>('architecture');
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Parallax effects for background elements
  const bgMoveX = useTransform(springX, [-100, 100], [20, -20]);
  const bgMoveY = useTransform(springY, [-100, 100], [20, -20]);
  const lightSweepX = useTransform(scrollYProgress, [0, 1], ["-20%", "120%"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleGlobalMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const centerX = innerWidth / 2;
    const centerY = innerHeight / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const whatsappWebUrl = "https://wa.me/6282125447232?text=Halo%20CHESTADOTCOM%2C%20saya%20tertarik%20untuk%20konsultasi%20pembuatan%20website%20modern%20%2F%20aplikasi%20bisnis.";

  const handleWhatsAppClick = () => {
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
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const fadeInUpVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section 
      ref={sectionRef}
      id="home" 
      onMouseMove={handleGlobalMouseMove}
      className="relative min-h-screen pt-28 sm:pt-40 md:pt-48 pb-16 sm:pb-20 md:pb-32 overflow-hidden flex flex-col items-center justify-center select-none"
    >
      {/* 1. ADVANCED BACKGROUND SYSTEM */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-slate-50">
        {/* Dynamic Architectural Grid */}
        <motion.div 
          style={{ 
            x: bgMoveX, 
            y: bgMoveY,
            backgroundImage: `linear-gradient(#000 1.5px, transparent 1.5px), linear-gradient(90deg, #000 1.5px, transparent 1.5px)`,
            backgroundSize: '80px 80px' 
          }}
          className="absolute inset-0 opacity-[0.05]" 
        />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-50/80 to-slate-50" />

        {/* Cinematic Light Rays */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full flex justify-between px-10">
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-purple-300/30 to-transparent blur-[1px]" />
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-indigo-300/30 to-transparent blur-[1px]" />
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-blue-300/30 to-transparent blur-[1px]" />
        </div>

        {/* Floating Ambient Blobs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 30, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-400/20 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -50, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-indigo-400/20 rounded-full blur-[160px]"
        />

        {/* Scroll Light Sweep */}
        <motion.div 
          style={{ x: lightSweepX }}
          className="hidden lg:block absolute top-0 bottom-0 w-[600px] bg-gradient-to-r from-transparent via-white/40 to-transparent blur-[100px] skew-x-12"
        />
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10"
      >
        {/* Left Column: Headline & Messaging */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Status Label */}
          <motion.div 
            variants={fadeInUpVariants}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white shadow-xl shadow-purple-100/50 border border-purple-100 mb-8 group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
            </span>
            <span className="text-[11px] font-mono font-black tracking-widest text-purple-600/80 uppercase">
              Digital Architecture Studio 2025
            </span>
            <Zap size={12} className="text-amber-500 group-hover:scale-125 transition-transform" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            id="hero-headline"
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display tracking-[-0.04em] leading-[1.2] text-slate-900 text-balance"
          >
            <span className="block overflow-hidden h-[1.35em]">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="block font-medium"
              >
                Transformasi Digital.
              </motion.span>
            </span>
            <span className="block overflow-hidden h-[1.35em] -mt-2 sm:-mt-8">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="block font-light text-purple-600/90 italic"
              >
                Solusi B2B Enterprise.
              </motion.span>
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            id="hero-description"
            variants={fadeInUpVariants}
            className="mt-6 text-base sm:text-lg lg:text-xl text-slate-500 font-sans max-w-2xl leading-[1.8] text-balance font-light tracking-wide"
          >
            Elevasi operasional bisnis Anda melalui arsitektur software kelas dunia. Kami menghadirkan <strong className="text-slate-800 font-medium">B2B Digital Transformation</strong> yang memadukan <span className="text-purple-600 font-medium bg-purple-50/50 px-2 py-0.5 rounded-lg border border-purple-100/50">Enterprise Software Solutions</span> dengan inteligensi otonom Agentic AI untuk skalabilitas perusahaan Anda.
          </motion.p>

          {/* Actions */}
          <motion.div
            variants={fadeInUpVariants}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <MagneticButton strength={0.2}>
              <a
                href={whatsappWebUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-slate-900 text-white font-sans text-base font-black shadow-2xl shadow-purple-900/20 hover:bg-slate-800 transition-all overflow-hidden border border-purple-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                <MessageCircle size={20} className="text-emerald-400 fill-emerald-400/20" />
                <span>Mulai Konsultasi</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
            </MagneticButton>

            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-slate-700 font-sans text-base font-bold border border-slate-200 hover:border-purple-300 hover:text-purple-700 transition-all shadow-sm"
            >
              <BriefcaseBusiness size={18} />
              <span>Eksplorasi Karya</span>
            </Link>
          </motion.div>

          {/* Micro-Trusts */}
          <motion.div 
            variants={fadeInUpVariants}
            className="mt-8 flex items-center gap-6"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                    {i}
                  </div>
                ))}
              </div>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-tighter">Dipercaya 50+ Klien</span>
            </div>
            <div className="h-4 w-[1px] bg-slate-200" />
            <div className="flex items-center gap-2 text-emerald-600">
              <Globe size={14} />
              <span className="text-xs font-bold font-mono tracking-tighter">Global Standards</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Architectural Console (Glassmorphism) */}
        <motion.div 
          variants={fadeInUpVariants}
          className="lg:col-span-5 hidden lg:block perspective-[2500px]"
        >
          <motion.div 
            style={{ 
              rotateX: useTransform(springY, [-500, 500], [8, -8]), 
              rotateY: useTransform(springX, [-500, 500], [-8, 8]),
              x: useTransform(springX, [-500, 500], [15, -15]),
              y: useTransform(springY, [-500, 500], [15, -15])
            }}
            className="w-full bg-slate-950 rounded-[2.5rem] p-3 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.4),0_0_50px_-10px_rgba(147,51,234,0.1)] border border-slate-800/50 relative overflow-hidden group/console"
          >
            {/* Interior Glass Screen */}
            <motion.div 
              style={{ 
                x: useTransform(springX, [-500, 500], [-10, 10]),
                y: useTransform(springY, [-500, 500], [-10, 10])
              }}
              className="bg-slate-900/40 backdrop-blur-3xl rounded-[2rem] border border-white/5 overflow-hidden min-h-[440px] flex flex-col relative"
            >
              {/* Subtle Scanning Light Effect */}
              <motion.div
                animate={{
                  y: ["0%", "200%", "0%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none"
              />
              {/* Header */}
              <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-[10px] font-mono font-black text-slate-500 tracking-widest uppercase">system-monitor.log</div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex px-4 py-2 gap-1 bg-slate-950/50">
                {(['architecture', 'vitals', 'stack'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveConsoleTab(tab)}
                    className={`flex-1 py-2 text-[10px] font-mono font-bold uppercase tracking-wider rounded-xl transition-all ${
                      activeConsoleTab === tab ? 'bg-purple-600 text-white' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Dynamic Content */}
              <div className="flex-1 p-6 font-mono overflow-hidden">
                <AnimatePresence mode="wait">
                  {activeConsoleTab === 'architecture' && (
                    <motion.div
                      key="arch"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                          <Layers size={18} />
                        </div>
                        <div>
                          <h4 className="text-white text-xs font-bold">Edge-First Rendering</h4>
                          <p className="text-slate-500 text-[11px] leading-relaxed mt-1">Multi-region deployment with zero cold-starts.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                          <Bot size={18} />
                        </div>
                        <div>
                          <h4 className="text-white text-xs font-bold">Agentic AI Mesh</h4>
                          <p className="text-slate-500 text-[11px] leading-relaxed mt-1">Self-healing autonomous task orchestrators.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                          <Database size={18} />
                        </div>
                        <div>
                          <h4 className="text-white text-xs font-bold">Real-time Data Sync</h4>
                          <p className="text-slate-500 text-[11px] leading-relaxed mt-1">Sub-100ms latency across global clusters.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeConsoleTab === 'vitals' && (
                    <motion.div
                      key="vitals"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      {[
                        { label: 'Performance', value: 100, color: 'bg-emerald-500' },
                        { label: 'Accessibility', value: 100, color: 'bg-emerald-500' },
                        { label: 'Best Practices', value: 100, color: 'bg-emerald-500' },
                        { label: 'SEO Authority', value: 100, color: 'bg-purple-500' },
                      ].map(metric => (
                        <div key={metric.label}>
                          <div className="flex items-center justify-between text-[10px] mb-1.5">
                            <span className="text-slate-400 font-bold uppercase">{metric.label}</span>
                            <span className="text-white font-black">{metric.value}/100</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${metric.value}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className={`h-full ${metric.color}`}
                            />
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeConsoleTab === 'stack' && (
                    <motion.div
                      key="stack"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="text-[11px] leading-relaxed"
                    >
                      <div className="text-purple-400">const enterpriseStack = &#123;</div>
                      <div className="pl-4 text-slate-400">core: <span className="text-emerald-400">&apos;Next.js 15.2&apos;</span>,</div>
                      <div className="pl-4 text-slate-400">runtime: <span className="text-emerald-400">&apos;Bun / Cloud Run&apos;</span>,</div>
                      <div className="pl-4 text-slate-400">ai_mesh: <span className="text-emerald-400">&apos;Gemini Pro 2.5&apos;</span>,</div>
                      <div className="pl-4 text-slate-400">auth: <span className="text-emerald-400">&apos;Firebase Secure Edge&apos;</span>,</div>
                      <div className="pl-4 text-slate-400">analytics: <span className="text-emerald-400">&apos;Custom Telemetry&apos;</span></div>
                      <div className="text-purple-400">&#125;;</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Status Footer */}
              <div className="p-4 bg-slate-950 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity size={12} className="text-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Nodes Healthy: 12/12</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[9px] font-mono text-slate-600">ID-CGK-PROD</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Detail Badge */}
            <motion.div 
              style={{ x: useTransform(springX, [-500, 500], [30, -30]), y: useTransform(springY, [-500, 500], [30, -30]) }}
              className="absolute -bottom-6 -right-6 p-6 rounded-3xl bg-white shadow-2xl border border-slate-100 flex flex-col gap-1 items-center"
            >
              <div className="p-2 rounded-xl bg-purple-100 text-purple-600">
                <Cpu size={20} />
              </div>
              <span className="text-[10px] font-mono font-black text-slate-400 uppercase">Uptime</span>
              <span className="text-xl font-display font-black text-slate-900">99.98%</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 3. SCROLL INDICATOR */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-slate-300 to-transparent" />
      </motion.div>
    </section>
  );
}
