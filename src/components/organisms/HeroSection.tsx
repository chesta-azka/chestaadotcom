import { motion, useAnimation, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight, Zap, Sparkles, Monitor, Star, MousePointer2 } from 'lucide-react';
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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

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

  const ambientParticles = [
    { x: "15%", y: "22%", size: 3, duration: 8, delay: 0 },
    { x: "82%", y: "18%", size: 4, duration: 11, delay: 2 },
    { x: "30%", y: "60%", size: 2, duration: 9, delay: 4 },
    { x: "70%", y: "75%", size: 3.5, duration: 12, delay: 1 },
    { x: "48%", y: "35%", size: 2.5, duration: 10, delay: 3 }
  ];

  return (
    <section 
      id="home" 
      className="relative pt-24 lg:pt-36 pb-0 overflow-hidden bg-transparent flex flex-col items-center justify-start select-none"
      onMouseMove={(e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }}
    >
      
      {/* 1. Spotlight Overlay */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(212, 255, 0, 0.08), transparent 80%)`
          ),
        }}
      />

      {/* 2. Visual Grid lines (Flashlight Effect) */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden select-none bg-[#06080A]">
        <motion.div 
          className="absolute inset-0 bg-[linear-gradient(rgba(212,255,0,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(212,255,0,0.15)_1px,transparent_1px)] bg-[size:64px_64px]"
          style={{
            maskImage: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(450px circle at ${x}px ${y}px, black, transparent 70%)`
            ),
            WebkitMaskImage: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(450px circle at ${x}px ${y}px, black, transparent 70%)`
            )
          }}
        />
        {/* Subtle persistent glow to prevent total darkness when mouse is away */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
      </div>

      {/* Main Content Blueprint Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-5xl mx-auto px-6 text-center space-y-10 sm:space-y-12 z-10"
      >
        
        {/* Dynamic Trust Stack */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
          className="inline-flex items-center gap-3 px-4.5 py-2 rounded-full bg-white/[0.01] border border-white/5 backdrop-blur-md shadow-2xl mx-auto text-[10px] sm:text-xs font-mono tracking-widest text-white uppercase transition-all duration-300 hover:border-[#D4FF00]/15"
        >
          <div className="flex items-center -space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-6 h-6 rounded-full border-2 border-[#06080F] object-cover" alt="Client" />
            ))}
          </div>
          <span className="text-white/10 select-none">|</span>
          <div className="flex items-center gap-1 shrink-0 text-[#D4FF00] font-bold">
            <span className="font-mono text-xs">12+ Proyek Selesai</span>
          </div>
        </motion.div>

        {/* Master Typographic Headline */}
        <motion.div 
          style={{ y: headlineY }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="text-[2.2rem] sm:text-[4rem] lg:text-[5rem] font-display font-medium tracking-tight leading-[1.08] text-white"
          >
            Website Premium untuk UMKM yang Ingin Terlihat Lebih Serius.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-sm sm:text-base md:text-lg text-gray-400 font-sans max-w-2xl leading-relaxed mx-auto"
          >
            Clean, cepat (0.8s), SEO-optimized, dan terintegrasi langsung ke WhatsApp bisnis Anda.
          </motion.p>
        </motion.div>

        {/* Gorgeous Dual CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="space-y-6 max-w-xl mx-auto flex flex-col items-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 sm:px-0">
            {/* Primary Chat Trigger Button */}
            <div className="relative w-full sm:w-auto">
              <motion.button
                ref={ctaRef}
                style={{ x: springX, y: springY }}
                onMouseMove={handleMouseMove}
                onMouseLeave={ctaMouseLeave}
                onClick={handleChatClick}
                className="group relative w-full sm:w-auto flex items-center justify-center gap-3.5 rounded-full bg-[#D4FF00] px-8 py-4.5 font-mono text-xs font-black uppercase tracking-widest text-[#06080F] transition-all duration-300 hover:bg-[#e2ff34] hover:shadow-[0_15px_35px_rgba(212,255,0,0.35)] hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
              >
                <span>Mulai Kolaborasi</span>
                <ArrowRight size={13} className="stroke-[3px] transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
            
            {/* Secondary Violet Portfolio Button */}
            <Link
              to="/projects"
              className="w-full sm:w-auto flex items-center justify-center rounded-full bg-[#1e1b4b] border border-indigo-500/20 px-8 py-4.5 font-mono text-xs font-bold uppercase tracking-widest text-indigo-200 hover:text-white hover:bg-indigo-900/40 hover:border-indigo-400/30 transition-all duration-300 hover:scale-[1.03]"
            >
              Lihat Portofolio
            </Link>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
