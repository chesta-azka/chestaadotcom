import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight, Sparkles, Monitor, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import SocialProofCarousel from './SocialProofCarousel.tsx';

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
            ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(99, 102, 241, 0.05), transparent 80%)`
          ),
        }}
      />

      {/* 2. Visual Grid lines (Flashlight Effect) */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden select-none bg-white">
        <motion.div 
          className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:64px_64px]"
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] to-transparent pointer-events-none" />
      </div>

      {/* Main Content Blueprint Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-5xl mx-auto px-6 text-center space-y-10 sm:space-y-12 z-10"
      >
        
        {/* Dynamic Trust Stack (Text + Icon Edition as explicitly requested by user) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-full bg-black/[0.02] border border-gray-200 backdrop-blur-md shadow-sm mx-auto text-[10px] sm:text-xs font-mono tracking-widest text-[#4f46e5] uppercase transition-all duration-300 hover:border-indigo-200 hover:bg-white"
        >
          <div className="flex items-center gap-1.5 font-bold tracking-wider text-gray-800">
            <Sparkles size={11} className="text-indigo-500 animate-pulse" />
            <span>CHESTADOTCOM</span>
          </div>
          <span className="text-gray-700 select-none">|</span>
          <div className="flex items-center gap-1 shrink-0 text-gray-800 font-bold flex items-center">
            {[...Array(5)].map((_, idx) => (
              <Star key={idx} size={11} className="fill-indigo-500 text-indigo-500 inline-block" />
            ))}
            <span className="font-mono text-[9px] text-[#4f46e5] font-bold ml-1">100+ KLIEN PUAS</span>
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
            className="text-[2.2rem] sm:text-[4rem] lg:text-[5rem] font-display font-medium tracking-tight leading-[1.08] text-gray-900"
          >
            Website Premium untuk UMKM yang Ingin Terlihat Lebih Serius.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-sm sm:text-base md:text-lg text-gray-600 font-sans max-w-2xl leading-relaxed mx-auto"
          >
            Clean, cepat (0.8s), SEO-optimized, dan terintegrasi langsung ke WhatsApp bisnis Anda.
          </motion.p>
        </motion.div>

        {/* Gorgeous Dual CTA Pill Buttons & Pricing rates indicator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="space-y-6 max-w-3xl mx-auto flex flex-col items-center"
        >
          {/* Action buttons (Precisely mimicking Let's Work Together style and color flow) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 sm:px-0">
            {/* Primary Chat Trigger Button */}
            <div className="relative">
              <motion.button
                ref={ctaRef}
                style={{ x: springX, y: springY }}
                onMouseMove={handleMouseMove}
                onMouseLeave={ctaMouseLeave}
                onClick={handleChatClick}
                className="group relative w-full sm:w-auto flex items-center justify-center gap-3.5 rounded-full bg-[#4f46e5] px-8 py-4.5 font-mono text-xs font-black uppercase tracking-widest text-white transition-all duration-300 hover:bg-indigo-500 hover:shadow-[0_15px_35px_rgba(99,102,241,0.35)] hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
              >
                <span>Mulai Kolaborasi</span>
                <ArrowRight size={13} className="stroke-[3px] transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
            
            {/* Secondary Violet Showcase Button */}
            <Link
              to="/projects"
              id="hero-showcase-btn"
              className="w-full sm:w-auto flex items-center justify-center rounded-full bg-white border border-gray-200 px-8 py-4.5 font-mono text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 hover:scale-[1.03]"
            >
              Lihat Portofolio
            </Link>

            {/* Rates tag indicator */}
            <div className="flex flex-col flex-wrap sm:flex-nowrap items-start gap-1.5 border-l border-gray-200 pl-5 sm:pl-8 py-0.5 sm:flex text-left select-none">
              <span className="text-xs sm:text-sm font-mono text-gray-600 line-through decoration-red-500/80 uppercase tracking-widest block whitespace-nowrap">Rp 1.250.000</span>
              <span className="text-[14px] sm:text-[15px] font-mono font-black text-white bg-[#4f46e5] px-3.5 py-1.5 rounded-md border border-indigo-500 tracking-widest shadow-[0_0_25px_rgba(99,102,241,0.2)] whitespace-nowrap">START 550K + FREE .COM</span>
            </div>
          </div>
        </motion.div>

        {/* Social Proof Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <SocialProofCarousel />
        </motion.div>

        {/* 3. Single Visual Feature Mockup (Rumah Tropis Spotlight) */}
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="pt-12 w-full max-w-2xl relative mx-auto flex items-center justify-center pointer-events-auto"
        >
          <motion.div 
            whileHover={{ y: -10, scale: 1.01 }}
            className="w-full bg-white border-2 border-gray-100 rounded-2xl overflow-hidden shadow-2xl aspect-[16/10] select-none text-left flex flex-col z-20"
          >
            {/* Interactive Chrome Top Bar */}
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="bg-white px-12 py-1 rounded text-[9px] font-mono text-gray-500 tracking-wider shadow-sm border border-gray-100">
                chestadotcom.com/showcase
              </div>
              <div className="flex items-center text-gray-600">
                <Monitor size={10} />
              </div>
            </div>

            {/* Earth Feature Image */}
            <div className="flex-1 relative overflow-hidden bg-gray-50">
               <img src="/src/assets/images/futuristic_digital_earth_1780384278097.png" alt="Futuristic Earth" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
               <div className="absolute bottom-8 left-8">
                  <h4 className="text-2xl font-serif italic text-gray-900 leading-tight">Digital Earth Architecture</h4>
                  <p className="text-[#4f46e5] text-xs font-mono tracking-widest mt-1">GLOBAL DIGITAL BRANDING</p>
               </div>
            </div>
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
}
