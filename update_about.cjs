const fs = require('fs');

const code = `import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Zap, Cpu, Search, ArrowRight, Layers, Target, Code2 } from 'lucide-react';
import MetaTags from '../components/atoms/MetaTags';

const strengths = [
  {
    icon: <Layers strokeWidth={1.5} className="w-8 h-8 text-slate-800" />,
    title: "Pixel-Perfect UI/UX",
    desc: "Desain antarmuka kelas dunia yang minimalis, intuitif, dan bebas gangguan. Berfokus pada estetika dan fungsi layaknya ekosistem Apple."
  },
  {
    icon: <Zap strokeWidth={1.5} className="w-8 h-8 text-slate-800" />,
    title: "Zero-Latency Engineering",
    desc: "Arsitektur frontend berkinerja ekstrim. Waktu muat instan di bawah 1 detik menggunakan ekosistem React modern dan Edge-network."
  },
  {
    icon: <Cpu strokeWidth={1.5} className="w-8 h-8 text-slate-800" />,
    title: "Agentic AI Integration",
    desc: "Lebih dari sekadar website statis. Saya menanamkan kecerdasan buatan otonom untuk melayani klien Anda 24/7 tanpa henti."
  },
  {
    icon: <Target strokeWidth={1.5} className="w-8 h-8 text-slate-800" />,
    title: "Conversion & SEO",
    desc: "Rancangan struktural yang disukai Google. Mendominasi pencarian organik sekaligus mengonversi pengunjung menjadi pelanggan."
  }
];

export default function AboutPage() {
  const handleContactClick = () => {
    const text = 'Halo chestaadotcom, saya tertarik dengan keahlian Anda. Bisa diskusi lebih lanjut?';
    window.open(\`https://wa.me/6282125447232?text=\${encodeURIComponent(text)}\`, '_blank');
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto bg-[#fafafa] min-h-screen text-slate-900 selection:bg-slate-900 selection:text-white">
      <MetaTags 
        title="Tentang - Keunggulan CHESTADOTCOM"
        description="Pelajari lebih lanjut mengenai filosofi desain dan keunggulan teknis dari CHESTADOTCOM."
      />

      {/* Hero Apple-style */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-32 mt-12"
      >
        <h1 className="text-5xl md:text-7xl font-display font-semibold tracking-tighter text-slate-900 mb-6 leading-tight max-w-4xl mx-auto">
          Mendefinisikan ulang <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-900">
            standar digital.
          </span>
        </h1>
        <p className="text-lg md:text-2xl text-slate-500 font-sans tracking-tight max-w-2xl mx-auto font-medium">
          Keunggulan teknis berpadu dengan estetika minimalis. 
          Saya membangun arsitektur digital yang tidak hanya terlihat luar biasa, namun bekerja tanpa cela.
        </p>
      </motion.div>

      {/* Glassmorphism Strengths Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-32">
        {strengths.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden rounded-[2rem] bg-white/40 backdrop-blur-2xl border border-white/60 p-10 md:p-12 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.05)] hover:bg-white/60 transition-all duration-500 hover:shadow-[0_16px_60px_-12px_rgba(0,0,0,0.1)]"
          >
            {/* Subtle glow behind icon */}
            <div className="absolute top-12 left-12 w-24 h-24 bg-slate-200/50 rounded-full blur-2xl group-hover:bg-slate-300/50 transition-colors duration-500"></div>
            
            <div className="relative z-10 mb-8">
              {item.icon}
            </div>
            
            <h3 className="relative z-10 text-2xl md:text-3xl font-display font-semibold tracking-tight text-slate-900 mb-4">
              {item.title}
            </h3>
            
            <p className="relative z-10 text-slate-600 font-sans text-lg leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Premium Philosophy Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative rounded-[3rem] overflow-hidden bg-slate-900 text-white p-12 md:p-24 text-center mb-32 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950"></div>
        {/* Subtle mesh/glow effect in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <Code2 strokeWidth={1} className="w-16 h-16 mx-auto text-slate-400 mb-8 opacity-50" />
          <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight mb-8 leading-tight">
            Desain itu bukan sekadar rupa, <br/> melainkan bagaimana ia bekerja.
          </h2>
          <p className="text-xl text-slate-400 font-sans leading-relaxed mb-12">
            Setiap baris kode dan setiap piksel di layar dirancang dengan tujuan. 
            Meniadakan yang tidak perlu, menyisakan yang esensial. Itulah fondasi karya saya.
          </p>
          <button 
            onClick={handleContactClick}
            className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-sans font-semibold tracking-wide hover:scale-105 active:scale-95 transition-transform"
          >
            Mulai Proyek Bersama
            <ArrowRight size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
`;

fs.writeFileSync('src/pages/AboutPage.tsx', code);
console.log("Patched AboutPage");
