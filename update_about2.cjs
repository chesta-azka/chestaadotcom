const fs = require('fs');

const code = `import React, { useEffect, useRef } from 'react';
import { motion, animate, useInView } from 'motion/react';
import { Sparkles, Zap, Cpu, ArrowRight, Layers, Target, Code2 } from 'lucide-react';
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

const stats = [
  { label: "Proyek Selesai", value: 45, suffix: "+" },
  { label: "Klien Aktif", value: 20, suffix: "+" },
  { label: "Tahun Pengalaman", value: 5, suffix: "+" },
  { label: "Baris Kode", value: 99, suffix: "k+" }
];

function AnimatedCounter({ to, suffix = "", duration = 2.5 }: { to: number, suffix?: string, duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(0, to, {
        duration,
        ease: [0.16, 1, 0.3, 1], // Apple-like ease
        onUpdate: (value) => {
          if (ref.current) {
            ref.current.textContent = Math.round(value).toString() + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [to, inView, duration, suffix]);

  return <span ref={ref} className="font-display font-medium">0{suffix}</span>;
}

export default function AboutPage() {
  const handleContactClick = () => {
    const text = 'Halo chestaadotcom, saya tertarik dengan profil agensi Anda. Bisa diskusi lebih lanjut?';
    window.open(\`https://wa.me/6282125447232?text=\${encodeURIComponent(text)}\`, '_blank');
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto bg-[#fafafa] min-h-screen text-slate-900 selection:bg-slate-900 selection:text-white">
      <MetaTags 
        title="Tentang - Profil & Keunggulan CHESTADOTCOM"
        description="Pelajari lebih lanjut mengenai profil, statistik, dan keunggulan teknis dari CHESTADOTCOM."
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

      {/* Profile & Stats Section */}
      <div className="flex flex-col lg:flex-row items-center gap-16 mb-32 max-w-5xl mx-auto">
        {/* Photo Column */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-5/12"
        >
          <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-slate-200 border border-slate-200/50 shadow-2xl">
            {/* Elegant grayscale to color transition on hover */}
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" 
              alt="Founder of CHESTADOTCOM" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80 pointer-events-none"></div>
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h3 className="font-display text-2xl font-semibold tracking-tight">Chesta</h3>
              <p className="font-sans text-sm text-slate-300 font-medium tracking-wide">FOUNDER & LEAD ARCHITECT</p>
            </div>
          </div>
        </motion.div>

        {/* Bio & Stats Column */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-slate-900 mb-6 leading-snug">
              Sebuah agensi independen yang didedikasikan untuk performa absolut.
            </h2>
            <div className="space-y-4 text-slate-600 font-sans text-lg leading-relaxed mb-12">
              <p>
                Sebagai founder CHESTADOTCOM, visi saya sederhana: menyingkirkan kerumitan dan kebingungan dalam pembuatan produk digital. Terlalu banyak agensi yang menjual fitur yang tidak Anda butuhkan dengan performa yang mengecewakan.
              </p>
              <p>
                Saya mengambil pendekatan yang berbeda. Setiap baris kode yang ditulis, setiap desain yang disusun, harus memiliki dampak langsung terhadap konversi dan pengalaman pengguna Anda.
              </p>
            </div>
          </motion.div>

          {/* Minimalist Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 border-t border-slate-200 pt-8">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: 0.2 + (idx * 0.1), ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col"
              >
                <div className="text-4xl md:text-5xl font-display font-semibold text-slate-900 tracking-tighter mb-2">
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs font-mono tracking-widest uppercase text-slate-500 font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Glassmorphism Strengths Grid */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-slate-900 mb-4">Keahlian Spesifik Agensi</h2>
        <p className="text-slate-500 font-sans text-lg">Infrastruktur dan desain yang dirancang secara khusus.</p>
      </div>
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
`

fs.writeFileSync('src/pages/AboutPage.tsx', code);
console.log("Patched AboutPage v3");
