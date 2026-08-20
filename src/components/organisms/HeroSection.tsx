import React from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight, Sparkles, Zap, Globe, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  
  const { scrollY } = useScroll();
  const headlineY = useTransform(scrollY, [0, 500], [0, -50]);
  
  const ctaRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ctaRef.current) return;
    const { left, top, width, height } = ctaRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) / 4);
    y.set((e.clientY - centerY) / 4);
  };

  const ctaMouseLeave = () => {
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
    const text = 'Halo CHESTADOTCOM, saya sangat tertarik dengan layanan jasa digital premium Anda. Bisa bantu analisis potensi brand saya untuk pasar lokal?';
    window.open(`https://wa.me/6282125447232?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section 
      id="home" 
      className="relative pt-40 pb-32 overflow-hidden bg-transparent flex flex-col items-center justify-center select-none min-h-[90vh]"
    >
      
      {/* Clean Background with Subtle Grid & Right-Edge Gradient Glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-slate-50 overflow-hidden">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_70%,transparent_100%)]" />
        
        {/* Tasteful Soft Gradient on Right Edge Only */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl rounded-full pointer-events-none" />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center gap-y-10 z-10"
      >
        
        {/* Minimal Pill with Subtle Gradient Accent */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-indigo-100/80 shadow-sm mx-auto text-[10px] sm:text-xs font-mono tracking-widest uppercase"
        >
          <Sparkles size={12} className="text-indigo-500 animate-pulse" />
          <span className="font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Digital Architect 2026</span>
        </motion.div>

        {/* Master Typographic Headline with Staggered Entrance */}
        <motion.div 
          style={{ y: headlineY }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="text-[3.5rem] md:text-[5.5rem] lg:text-[6.5rem] font-display font-medium tracking-tight leading-[1.05] text-slate-900"
          >
            Akselerasi Skala <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600">
              Bisnis Anda.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="text-base md:text-xl text-slate-600 font-sans max-w-2xl leading-relaxed mx-auto font-light"
          >
            Kami merancang ekosistem teknologi berperforma tinggi—memadukan otomatisasi Agentic AI dengan arsitektur web yang mengonversi secara optimal.
          </motion.p>
        </motion.div>

        {/* Value Proposition Icons with Staggered Delay */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.55 }}
          className="flex items-center justify-center gap-6 md:gap-10 pt-2"
        >
          <div className="p-4 rounded-full border border-indigo-100 bg-gradient-to-b from-white to-indigo-50/40 flex items-center justify-center shadow-sm hover:border-indigo-300 transition-colors">
            <Zap size={24} strokeWidth={1.5} className="text-indigo-600" />
          </div>
          <div className="p-4 rounded-full border border-purple-100 bg-gradient-to-b from-white to-purple-50/40 flex items-center justify-center shadow-sm hover:border-purple-300 transition-colors">
            <Globe size={24} strokeWidth={1.5} className="text-purple-600" />
          </div>
          <div className="p-4 rounded-full border border-blue-100 bg-gradient-to-b from-white to-blue-50/40 flex items-center justify-center shadow-sm hover:border-blue-300 transition-colors">
            <ShieldCheck size={24} strokeWidth={1.5} className="text-blue-600" />
          </div>
        </motion.div>

        {/* Minimalist Dual CTA with Staggered Delay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full pt-2"
        >
          <div className="relative group w-full sm:w-auto">
            <motion.button
              ref={ctaRef}
              style={{ x: springX, y: springY }}
              onMouseMove={handleMouseMove}
              onMouseLeave={ctaMouseLeave}
              onClick={handleChatClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-full sm:w-auto flex items-center justify-center gap-3.5 rounded-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-8 py-4.5 font-mono text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:from-indigo-600 hover:via-indigo-500 hover:to-purple-600 shadow-xl cursor-pointer z-10 overflow-hidden"
            >
              <span className="relative z-10">Mulai Kolaborasi</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 relative z-10" />
            </motion.button>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Link
              to="/projects"
              className="w-full sm:w-auto flex items-center justify-center rounded-full bg-white border border-slate-200 px-8 py-4.5 font-mono text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-300 shadow-sm"
            >
              Lihat Portofolio
            </Link>
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
}
