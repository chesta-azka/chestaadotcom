import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Zap, Smartphone, Rocket } from 'lucide-react';
import TextRevealSmooth from '../atoms/TextRevealSmooth';

export default function HeroSection() {
  const handleChatClick = () => {
    const text = 'Halo CHESTADOTCOM, saya tertarik untuk membuat website. Boleh konsultasi?';
    window.open(`https://wa.me/6282125447232?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="home" className="relative min-h-[100vh] pt-32 lg:pt-48 pb-20 overflow-hidden bg-transparent">
      
      {/* Background Gradients & Grids */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#4F46E5]/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-[#D4FF00]/10 rounded-full blur-[150px] mix-blend-screen" />
        
        {/* Subtle architectural grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,black,transparent)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 w-full relative z-10 flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-sans font-medium text-gray-300 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
          CHESTADOTCOM / DIGITAL ARCHITECT 2026
        </motion.div>
        
        <div className="text-[3rem] sm:text-[4.5rem] lg:text-[5.5rem] font-display font-medium tracking-tight leading-[1.1] text-white max-w-4xl mb-8 flex justify-center">
          <TextRevealSmooth
            text="Website Premium untuk UMKM yang Ingin Terlihat Lebih Serius."
            highlightWords={["Terlihat", "Lebih", "Serius."]}
            highlightClass="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4FF00] to-green-400"
          />
        </div>
        
        <motion.p 
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-400 font-sans max-w-2xl mb-12 leading-relaxed"
        >
          Clean, cepat, SEO-ready, dan langsung terhubung ke WhatsApp. Transformasi digital yang dirancang khusus untuk meningkatkan konversi dan trust brand Anda.
        </motion.p>
        
        <motion.div
           initial={{ opacity: 0, scale: 0.8, y: 20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
           className="w-full max-w-md bg-[#0D111A] border border-white/10 p-2 pl-6 rounded-full flex items-center justify-between shadow-[0_0_40px_rgba(212,255,0,0.1)] gap-4"
        >
           <span className="font-sans text-sm text-gray-400 flex items-center gap-2">
             Mulai Dari <strong className="text-white">Rp 450.000</strong>
           </span>
           <button
             onClick={handleChatClick}
             className="group flex items-center gap-2 rounded-full bg-[#D4FF00] px-6 py-3 font-sans text-sm font-semibold text-[#06080F] transition-all hover:bg-[#c2e600] active:scale-95 shrink-0"
           >
             <span>Konsultasi Gratis</span>
             <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
           </button>
        </motion.div>

        {/* Highlight Stats Below */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9, y: 20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
           className="mt-20 flex gap-8 md:gap-16 justify-center text-left"
        >
           <div className="flex flex-col">
             <span className="text-3xl font-display font-medium text-white mb-1 flex items-center gap-2">
               0.8s
               <Zap className="text-[#D4FF00] w-6 h-6" />
             </span>
             <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Avg Load Time</span>
           </div>
           <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
           <div className="flex flex-col">
             <span className="text-3xl font-display font-medium text-white mb-1 flex items-center gap-2">
               Mobile
               <Smartphone className="text-[#D4FF00] w-6 h-6" />
             </span>
             <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">First Design</span>
           </div>
           <div className="w-px h-12 hidden md:block bg-gradient-to-b from-white/20 to-transparent" />
           <div className="flex flex-col hidden md:flex">
             <span className="text-3xl font-display font-medium text-white mb-1 flex items-center gap-2">
               3 Hari
               <Rocket className="text-[#D4FF00] w-6 h-6" />
             </span>
             <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Waktu Pengerjaan</span>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
