import { motion } from 'motion/react';
import { ArrowRight, Zap, Sparkles, Monitor, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
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
    <section id="home" className="relative min-h-screen pt-32 lg:pt-36 pb-20 overflow-hidden bg-transparent flex flex-col items-center justify-start select-none">
      
      {/* 1. Dramatic Cosmic Ceiling Spotlight & Ambient Light Rays (Inspired by high-end minimal grid sites) */}
      <div className="absolute top-0 inset-x-0 h-[700px] pointer-events-none overflow-hidden -z-20">
        
        {/* Overhead neon laser beam emitter */}
        <motion.div 
          animate={{
            opacity: [0.7, 0.95, 0.7],
            scaleX: [1, 1.05, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[380px] h-[3px] bg-gradient-to-r from-transparent via-[#D4FF00] to-transparent shadow-[0_0_50px_#D4FF00] opacity-90" 
        />
        
        {/* Glowing spotlight beam cone with pulsing breathing cycle */}
        <motion.div 
          animate={{
            opacity: [0.75, 0.9, 0.75],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-gradient-to-b from-indigo-500/15 via-[#D4FF00]/3 to-transparent filter blur-3xl" 
          style={{
            clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)'
          }}
        />

        {/* Ambient rotating cosmic neon lime-green glow */}
        <motion.div 
          animate={{
            scale: [1, 1.15, 0.95, 1],
            rotate: [0, 10, -10, 0],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-2 left-1/2 -translate-x-1/2 w-[680px] h-[680px] rounded-full bg-[#D4FF00]/6 blur-[150px] mix-blend-screen"
        />

        {/* Dynamic slow floating deep amethyst violet light node */}
        <motion.div 
          animate={{
            scale: [1, 1.1, 0.9, 1],
            x: [-20, 20, -10, 0],
            y: [-10, 15, -5, 0],
            opacity: [0.5, 0.75, 0.5]
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-12 right-[8%] w-[650px] h-[650px] rounded-full bg-indigo-600/12 blur-[170px] mix-blend-screen"
        />

        {/* Animated horizontal cosmic bar sweeping downwards */}
        <motion.div
          animate={{
            y: [-300, 900],
            opacity: [0, 0.45, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4FF00]/30 to-transparent pointer-events-none -z-10"
        />

        {/* Subtle Stardust floating particles for premium digital studio depth */}
        {ambientParticles.map((pt, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0.1, 0.45, 0.1],
              y: [-15, 15, -15],
              x: [-10, 10, -10]
            }}
            transition={{
              duration: pt.duration,
              repeat: Infinity,
              delay: pt.delay,
              ease: "easeInOut"
            }}
            className="absolute rounded-full bg-[#D4FF00]/40 filter blur-[0.5px]"
            style={{
              left: pt.x,
              top: pt.y,
              width: pt.size,
              height: pt.size,
            }}
          />
        ))}
      </div>

      {/* 2. Visual Grid lines (Deep Cosmic High-Fidelity Blueprint System - Dytama Inspired Mixed Grid) */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden select-none">
        {/* Primary architectural indigo grid lines */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.035)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_75%_at_50%_35%,black,transparent)] opacity-95" 
        />
        {/* Secondary micro-mesh overlay for hyper-precise tech feel */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(212,255,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(212,255,0,0.015)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_35%,black,transparent)] opacity-85" 
        />
        {/* Subtle silver dot matrix alignment map */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_40%,black,transparent)]" 
        />
        {/* Linear structural crosshairs for high-end digital agency layout */}
        <div className="absolute top-[32%] left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute top-[68%] left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      {/* Main Content Blueprint Container */}
      <div className="w-full max-w-5xl mx-auto px-6 text-center space-y-12 sm:space-y-14 z-10">
        
        {/* Dynamic Trust Stack (Text + Icon Edition as explicitly requested by user) */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-full bg-white/[0.01] border border-white/5 backdrop-blur-md shadow-2xl mx-auto text-[10px] sm:text-xs font-mono tracking-widest text-[#D4FF00] uppercase transition-all duration-300 hover:border-[#D4FF00]/15 hover:bg-white/[0.03]"
        >
          <div className="flex items-center gap-1.5 font-bold tracking-wider text-gray-200">
            <Sparkles size={11} className="text-[#D4FF00] animate-pulse" />
            <span>CHESTADOTCOM</span>
          </div>
          <span className="text-white/10 select-none">|</span>
          <div className="flex items-center gap-1 shrink-0 text-white font-bold flex items-center">
            {[...Array(5)].map((_, idx) => (
              <Star key={idx} size={11} className="fill-[#D4FF00] text-[#D4FF00] inline-block" />
            ))}
            <span className="font-mono text-[9px] text-[#D4FF00]/90 ml-1">100+ KLIEN PUAS</span>
          </div>
        </motion.div>

        {/* Master Typographic Headline */}
        <div className="space-y-6 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[2.2rem] sm:text-[3.8rem] lg:text-[4.8rem] font-display font-medium tracking-tight leading-[1.08] text-white"
          >
            Website Premium untuk UMKM <br className="hidden sm:inline" />
            yang Ingin <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4FF00] via-[#D4FF50] to-[#10B981] drop-shadow-[0_2px_15px_rgba(212,255,0,0.15)] select-none">Terlihat Lebih Serius.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-sm sm:text-base md:text-lg text-gray-400 font-sans max-w-2xl leading-relaxed mx-auto"
          >
            Clean, cepat, SEO-ready, dan langsung terhubung ke WhatsApp. Jasa pembuatan website berskala dunia demi melipatgandakan kredibilitas bisnis Anda di era digital.
          </motion.p>
        </div>

        {/* Gorgeous Dual CTA Pill Buttons & Pricing rates indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-6 max-w-2xl mx-auto flex flex-col items-center"
        >
          {/* Action buttons (Precisely mimicking Let's Work Together style and color flow) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 sm:px-0">
            {/* Primary Chat Trigger Button */}
            <button
              onClick={handleChatClick}
              className="group relative w-full sm:w-auto flex items-center justify-center gap-3.5 rounded-full bg-[#D4FF00] px-8 py-4.5 font-mono text-xs font-black uppercase tracking-widest text-[#06080F] transition-all duration-300 hover:bg-[#e2ff34] hover:shadow-[0_15px_35px_rgba(212,255,0,0.35)] hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
            >
              <span>Mulai Kolaborasi</span>
              <ArrowRight size={13} className="stroke-[3px] transition-transform group-hover:translate-x-1" />
            </button>
            
            {/* Secondary Violet Showcase Button */}
            <Link
              to="/projects"
              id="hero-showcase-btn"
              className="w-full sm:w-auto flex items-center justify-center rounded-full bg-[#1e1b4b] border border-indigo-500/20 px-8 py-4.5 font-mono text-xs font-bold uppercase tracking-widest text-indigo-200 hover:text-white hover:bg-indigo-900/40 hover:border-indigo-400/30 transition-all duration-300 hover:scale-[1.03]"
            >
              Lihat Portofolio
            </Link>

            {/* Rates tag indicator */}
            <div className="flex items-center gap-2 border-l border-white/10 pl-4 py-2 sm:flex hidden text-left select-none">
              <span className="text-[9px] font-mono font-bold text-[#D4FF00]/80 bg-[#D4FF00]/10 px-2 py-1 rounded inline-block">START RP450K</span>
            </div>
          </div>
        </motion.div>

        {/* 3. Triple Visual Mockup Fan-out layout (Collage representation of design capabilities) */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="pt-10 w-full max-w-4xl relative mx-auto"
        >
          {/* Subtle frame glow under college */}
          <div className="absolute inset-x-20 bottom-10 h-32 bg-indigo-500/10 filter blur-[90px] pointer-events-none -z-10" />

          {/* Collaging Stage Grid */}
          <div className="relative h-[240px] sm:h-[380px] md:h-[430px] w-full flex items-center justify-center overflow-visible">
            
            {/* Back Left Mockup Panel - Angled */}
            <motion.div 
              whileHover={{ y: -8, rotate: -6, zIndex: 30 }}
              className="absolute left-0 bottom-4 w-[45%] md:w-[48%] bg-[#0A0D14] border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] aspect-[16/10] select-none text-left flex flex-col -rotate-[5deg] origin-bottom-left transition-transform z-10"
            >
              {/* Top Chrome border */}
              <div className="bg-[#090D15] px-3 py-2 border-b border-white/5 flex items-center gap-1.5 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                <span className="text-[6px] sm:text-[8px] font-mono text-gray-500 ml-2">architecture // homelyflow.ai</span>
              </div>
              <div className="p-3 sm:p-5 flex-1 bg-[#0D111A] flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-[5px] sm:text-[7px] font-mono text-[#D4FF00] uppercase tracking-wider font-extrabold">CREATIVE INTERIOR STUDIO</span>
                  <h4 className="text-[10px] sm:text-lg font-serif italic text-white leading-tight">Design Your Dream Home with Homelyflow.ai</h4>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full mt-2" />
                <div className="flex justify-between items-center text-[5px] sm:text-[8px] font-mono text-gray-500 pt-2 border-t border-white/5">
                  <span>99% PERFORMANCE SCORE</span>
                  <span className="text-emerald-400 font-bold">SECURE_LINK</span>
                </div>
              </div>
            </motion.div>

            {/* Back Right Mockup Panel - Angled */}
            <motion.div 
              whileHover={{ y: -8, rotate: 6, zIndex: 30 }}
              className="absolute right-0 bottom-4 w-[45%] md:w-[48%] bg-[#0A0D14]/98 border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] aspect-[16/10] select-none text-left flex flex-col rotate-[5deg] origin-bottom-right transition-transform z-10"
            >
              {/* Top Chrome border */}
              <div className="bg-[#090D15] px-3 py-2 border-b border-white/5 flex items-center gap-1.5 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                <span className="text-[6px] sm:text-[8px] font-mono text-gray-500 ml-2">branding // selasar.id</span>
              </div>
              <div className="p-3 sm:p-5 flex-1 bg-[#0B0D13] flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-[5px] sm:text-[7px] font-mono text-teal-400 uppercase tracking-wider font-extrabold">LOCAL FOOD EXPLORER</span>
                  <h4 className="text-[10px] sm:text-lg font-display font-medium text-white leading-snug">Rayakan Keindahan Tradisi Kuliner Nusantara</h4>
                </div>
                <div className="h-2 w-[70%] bg-emerald-500/10 rounded-full mt-2" />
                <div className="flex justify-between items-center text-[5px] sm:text-[8px] font-mono text-teal-400 pt-2 border-t border-white/5">
                  <span>SSL COUTURE ESTABLISHED</span>
                  <span className="text-white font-bold">&bull; LIVE</span>
                </div>
              </div>
            </motion.div>

            {/* PRIME FRONT CENTER Mockup Panel - Bold High-Fidelity Desktop */}
            <motion.div 
              whileHover={{ y: -10, scale: 1.01 }}
              className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[80%] md:w-[75%] bg-[#0D111A] border-2 border-[#D4FF00]/20 rounded-2xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.85)] aspect-[16/10] select-none text-left flex flex-col z-20 pointer-events-auto"
            >
              {/* Interactive Chrome Top Bar */}
              <div className="bg-[#090D15] px-3 sm:px-4 py-2 sm:py-3 border-b border-white/5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <div className="bg-white/5 px-6 sm:px-12 py-1 rounded text-[8px] sm:text-[9px] font-mono text-gray-400 tracking-wider">
                  chestadotcom.io/showcase-applet
                </div>
                <div className="flex items-center text-gray-500">
                  <Monitor size={10} className="sm:inline hidden" />
                </div>
              </div>

              {/* Wireframe Mockup UI content */}
              <div className="p-3 sm:p-5 bg-[#0D111A] flex-1 flex flex-col justify-between overflow-hidden">
                
                {/* Simulated Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded bg-[#D4FF00] flex items-center justify-center text-[9px] text-black font-extrabold font-mono">C</div>
                    <span className="text-[8px] sm:text-[10px] font-mono text-white font-bold uppercase tracking-wider">CHESTADOTCOM</span>
                  </div>
                  <div className="flex gap-2 sm:gap-4 font-mono text-[6px] sm:text-[8px] text-gray-500 uppercase tracking-widest">
                    <span>/ PROJECTS</span>
                    <span className="text-[#D4FF00] font-bold">/ INQUIRE</span>
                  </div>
                </div>

                {/* Simulated Layout Elements block */}
                <div className="grid grid-cols-12 gap-3 sm:gap-4 my-2.5 sm:my-4 flex-1">
                  
                  {/* Left Hero showcase info */}
                  <div className="col-span-12 sm:col-span-7 bg-[#131825]/40 border border-white/5 rounded-xl p-3 sm:p-4 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-[#D4FF00]/5 rounded-full blur-xl pointer-events-none" />
                    <div className="space-y-1.5">
                      <span className="text-[5px] sm:text-[7px] font-mono text-[#D4FF00] uppercase tracking-widest bg-[#D4FF00]/10 px-1.5 py-0.5 rounded border border-[#D4FF00]/20 inline-block font-extrabold">LIVE ARCHITECHTURE 2026</span>
                      <h5 className="font-display font-medium text-white text-[10px] sm:text-base tracking-tight pt-1 leading-snug">
                        Selasar Aesthetic Coffee Brand
                      </h5>
                      <p className="text-gray-500 text-[8px] sm:text-[10px] font-sans leading-normal max-w-sm line-clamp-2">
                        Meningkatkan conversion-rate UMKM lokal hingga 4x lipat menggunakan full-custom single-page layout super cepat.
                      </p>
                    </div>
                    <div className="flex items-center gap-3 border-t border-white/5 pt-2.5 mt-2.5 shrink-0">
                      <span className="text-[6px] sm:text-[9px] font-mono text-[#D4FF00] flex items-center gap-1 font-bold">
                        <Zap size={10} className="animate-pulse text-[#D4FF00]" /> 0.8S AVERAGE LOAD SPEED
                      </span>
                    </div>
                  </div>

                  {/* Right metrics element */}
                  <div className="col-span-12 sm:col-span-5 bg-[#131825]/20 border border-white/5 rounded-xl p-3 sm:p-4 flex flex-col justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[6px] sm:text-[8px] font-mono text-gray-500 uppercase tracking-widest block">AUDIENCE GROWTH</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm sm:text-2xl font-mono font-black text-white">+315%</span>
                        <span className="text-emerald-400 text-[5px] sm:text-[8px] font-mono font-semibold">▲ TRUST</span>
                      </div>
                    </div>
                    
                    {/* Visual Vector Spark Line graph bar */}
                    <div className="h-6 sm:h-12 w-full flex items-end gap-1 px-0.5 pt-2 shrink-0">
                      <div className="w-full bg-white/5 rounded h-[20%]" />
                      <div className="w-full bg-white/5 rounded h-[40%]" />
                      <div className="w-full bg-white/10 rounded h-[35%]" />
                      <div className="w-full bg-[#D4FF00]/20 rounded h-[75%] relative overflow-hidden">
                        <div className="absolute inset-0 bg-[#D4FF00] opacity-40 animate-pulse" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[5px] sm:text-[8px] font-mono text-gray-500 pt-2 border-t border-white/5 mt-2">
                      <span>GOOGLE INDEXED</span>
                      <span className="text-[#D4FF00] font-black">100% OK</span>
                    </div>
                  </div>

                </div>

                {/* Card footer metrics label details */}
                <div className="flex items-center justify-between text-[5px] sm:text-[8px] font-mono text-gray-500 pt-1 border-t border-white/5 shrink-0">
                  <span className="text-[7px] text-gray-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    CHESTADOTCOM BRANDING LAB INDONESIA CORP 2026
                  </span>
                  <span>PREMIUM WEB ENGINE v3.02</span>
                </div>

              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
