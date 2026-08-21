import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight, Sparkles, Zap, Globe, ShieldCheck, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  
  const { scrollY } = useScroll();
  const headlineY = useTransform(scrollY, [0, 500], [0, -30]);
  
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
    const text = 'Halo CHESTADOTCOM, saya sangat tertarik dengan layanan jasa digital premium Anda. Bisa bantu analisis potensi brand saya untuk pasar lokal?';
    window.open(`https://wa.me/6282125447232?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Compact animation offset for mobile to prevent large layout shifts
  const yOffset = isMobile ? 15 : 30;

  return (
    <section 
      id="home" 
      className="relative pt-44 md:pt-56 pb-24 md:pb-32 overflow-hidden bg-transparent flex flex-col items-center justify-center select-none min-h-[100svh]"
    >
      
      {/* Clean Background with Subtle Grid & Right-Edge Gradient Glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-slate-50 overflow-hidden">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_70%,transparent_100%)]" />
        
        {/* Tasteful Soft Gradient on Right Edge Only */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent blur-2xl md:blur-3xl rounded-full pointer-events-none" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10 overflow-hidden lg:overflow-visible">
        
        {/* Left Column - Typography & CTAs */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex flex-col items-start text-left gap-y-6 sm:gap-y-8 max-w-full"
        >
          {/* Minimal Pill with Subtle Gradient Accent */}
          <motion.div 
            initial={{ opacity: 0, y: yOffset }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="inline-flex items-center gap-2 sm:gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-indigo-100/80 shadow-sm text-[9px] sm:text-[10px] lg:text-xs font-mono tracking-widest uppercase shrink-0 max-w-full"
          >
            <Sparkles strokeWidth={1} size={12} className="text-indigo-500 animate-[pulse_3s_ease-in-out_infinite] shrink-0" />
            <span className="font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 truncate">ENTERPRISE DIGITAL ARCHITECT</span>
          </motion.div>

          {/* Master Typographic Headline */}
          <motion.div 
            style={{ y: headlineY }}
            className="space-y-4 sm:space-y-6 w-full"
          >
            <motion.h1 
              initial={{ opacity: 0, y: yOffset }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-[2.25rem] min-[400px]:text-[2.75rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.25rem] xl:text-[6rem] font-display font-medium tracking-tight leading-[1.05] text-slate-900 text-balance break-words"
            >
              Intelligent Digital <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600">
                Transformation.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: yOffset }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 font-sans max-w-xl leading-relaxed font-light"
            >
              Kemitraan strategis untuk korporasi modern. Kami membangun Scalable Cloud Architecture dan menerapkan Agentic AI Integration untuk mengakselerasi ekspansi dan automasi proses bisnis.
            </motion.p>
          </motion.div>

          {/* Minimalist Dual CTA */}
          <motion.div
            initial={{ opacity: 0, y: yOffset }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-start gap-3 sm:gap-4 w-full pt-2"
          >
            <div className="relative group w-full sm:w-auto shrink-0">
              <motion.button
                ref={ctaRef}
                style={isMobile ? {} : { x: springX, y: springY }}
                onMouseMove={handleMouseMove}
                onMouseLeave={ctaMouseLeave}
                onClick={handleChatClick}
                whileHover={isMobile ? {} : { scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-full sm:w-auto flex items-center justify-center gap-3.5 rounded-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-6 sm:px-8 py-3.5 sm:py-4.5 font-mono text-[10px] sm:text-[11px] lg:text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:from-indigo-600 hover:via-indigo-500 hover:to-purple-600 shadow-xl cursor-pointer z-10 overflow-hidden"
              >
                <span className="relative z-10 whitespace-nowrap">Mulai Kolaborasi</span>
                <ArrowRight strokeWidth={1} size={14} className="transition-transform group-hover:translate-x-1 relative z-10 shrink-0" />
              </motion.button>
            </div>
            
            <motion.div
              whileHover={isMobile ? {} : { scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto shrink-0"
            >
              <Link
                to="/projects"
                className="w-full sm:w-auto flex items-center justify-center rounded-full bg-white border border-slate-200 px-6 sm:px-8 py-3.5 sm:py-4.5 font-mono text-[10px] sm:text-[11px] lg:text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-300 shadow-sm whitespace-nowrap"
              >
                Lihat Portofolio
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Column - Architectural Visual Elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="lg:col-span-5 hidden lg:flex relative h-[500px] w-full"
        >
          {/* Glass Card 1 */}
          <motion.div 
            initial={{ opacity: 0, x: 20, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="absolute top-[10%] right-[10%] w-[280px] p-6 rounded-3xl bg-white/60 backdrop-blur-xl border border-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] z-20"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4 text-indigo-600 border border-indigo-100">
              <Cpu strokeWidth={1} size={20} />
            </div>
            <h3 className="font-sans font-bold text-slate-900 text-lg mb-2">Agentic Automation</h3>
            <p className="text-sm text-slate-500 font-sans leading-relaxed">Ekosistem AI cerdas untuk memangkas redundansi operasional.</p>
          </motion.div>

          {/* Glass Card 2 */}
          <motion.div 
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            className="absolute bottom-[10%] left-[5%] w-[280px] p-6 rounded-3xl bg-white/70 backdrop-blur-lg border border-white shadow-[0_15px_40px_rgba(0,0,0,0.06)] z-30"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center mb-4 text-white">
              <ShieldCheck strokeWidth={1} size={20} />
            </div>
            <h3 className="font-sans font-bold text-slate-900 text-lg mb-2">Enterprise Security</h3>
            <p className="text-sm text-slate-500 font-sans leading-relaxed">Arsitektur berlapis memastikan data dan sistem Anda terlindungi maksimal.</p>
          </motion.div>

          {/* Decorative Wireframe Ring */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-slate-200/50 border-dashed z-10"
          />
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full border border-indigo-100 bg-indigo-50/20 z-10"
          />
        </motion.div>

      </div>
    </section>
  );
}

