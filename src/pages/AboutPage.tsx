import SEOProvider from '../components/atoms/SEOProvider';
import React, { useEffect, useRef } from 'react';
import { motion, animate, useInView } from 'motion/react';
import { Layers, Zap, Cpu, Target, Code2, ArrowRight, CheckCircle2, ShieldCheck, Fingerprint, Activity } from 'lucide-react';
import LocalWeatherWidget from '../components/atoms/LocalWeatherWidget';
import MetaTags from '../components/atoms/MetaTags';
import FaqSection from '../components/organisms/FaqSection';

const strengths = [
  {
    icon: <Fingerprint strokeWidth={1} className="w-8 h-8 text-slate-800" />,
    title: "Signature UI/UX Design",
    desc: "Desain antarmuka kelas dunia yang minimalis, intuitif, dan bebas gangguan. Berfokus pada presisi piksel layaknya ekosistem Apple."
  },
  {
    icon: <Zap strokeWidth={1} className="w-8 h-8 text-slate-800" />,
    title: "Zero-Latency Engineering",
    desc: "Arsitektur frontend berkinerja ekstrim. Waktu muat instan di bawah 1 detik menggunakan teknologi modern dan edge computing."
  },
  {
    icon: <Cpu strokeWidth={1} className="w-8 h-8 text-slate-800" />,
    title: "Agentic AI Integration",
    desc: "Menanamkan kecerdasan buatan otonom untuk melayani klien Anda 24/7. Lebih cerdas dari sekadar website statis konvensional."
  },
  {
    icon: <Activity strokeWidth={1} className="w-8 h-8 text-slate-800" />,
    title: "Growth & Conversion",
    desc: "Struktur data SEO yang disukai Google. Mendominasi pencarian organik lokal sekaligus mengonversi pengunjung menjadi klien."
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
      return () =>
       controls.stop();
    }
  }, [to, inView, duration, suffix]);

  return <span ref={ref} className="font-display font-medium">0{suffix}</span>;
}

export default function AboutPage() {
  const handleContactClick = () => {
    const text = 'Halo Mas Chesta, saya tertarik untuk mendiskusikan visi proyek digital saya lebih lanjut.';
    window.open(`https://wa.me/6282125447232?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50 relative">
      <SEOProvider 
        title="About Us | CHESTADOTCOM"
        description="Learn about our engineering culture and the people building the future of enterprise software."
      />
      <LocalWeatherWidget />
      <MetaTags 
        title="Tentang - Profil & Core Competencies | CHESTADOTCOM"
        description="Pelajari profil, pengalaman, dan keahlian inti (Core Competencies) dari arsitek digital Anda."
      />

      {/* Decorative ambient background */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-br from-slate-50 via-white to-slate-100/50 z-0" />
      <div className="fixed top-1/4 right-0 w-[500px] h-[500px] bg-indigo-50/40 rounded-full blur-[100px] pointer-events-none z-0" />
      
      <div className="relative z-10">
        {/* Hero Apple-style */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24 mt-20 md:mt-32 px-6"
        >
          <h1 className="text-5xl md:text-7xl font-display font-semibold tracking-tighter text-slate-900 mb-6 leading-tight max-w-4xl mx-auto">
            Mendefinisikan ulang <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-900">
              standar digital.
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-500 font-sans tracking-tight max-w-2xl mx-auto font-medium">
            Keunggulan teknis berpadu dengan estetika minimalis. 
            Saya membangun arsitektur digital yang tidak hanya terlihat indah, namun bekerja tanpa cela.
          </p>
        </motion.div>

        {/* Profile & Portrait Section with Glassmorphism Soft Focus Frame */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24 max-w-6xl mx-auto px-6">
          {/* Portrait Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-5/12"
          >
            {/* Soft Focus Glass Frame */}
            <div className="relative p-3 rounded-[3rem] bg-white/20 backdrop-blur-xl border border-white/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" 
                  alt="Founder of CHESTADOTCOM" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-out scale-105 hover:scale-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80 pointer-events-none"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="font-display text-2xl font-semibold tracking-tight mb-1">Chesta</h3>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <p className="font-mono text-[10px] text-slate-200 uppercase tracking-widest font-bold">LEAD ARCHITECT</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio Column */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-slate-900 mb-6 leading-snug">
                Sebuah studio independen yang didedikasikan untuk presisi absolut.
              </h2>
              <div className="space-y-4 text-slate-600 font-sans text-lg leading-relaxed mb-12">
                <p>
                  Visi saya sederhana: menyingkirkan kebisingan visual dan kerumitan teknis dalam pembuatan produk digital. Terlalu banyak agensi yang fokus pada fitur berlebihan dengan performa yang mengecewakan.
                </p>
                <p>
                  Saya mengambil pendekatan fundamental. Setiap baris kode yang ditulis, setiap ruang kosong yang disisakan, memiliki tujuan eksponensial terhadap konversi klien Anda.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Apple-style Glassmorphism Stats Grid */}
        <div className="max-w-6xl mx-auto px-6 mb-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: 0.2 + (idx * 0.1), ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/70 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] hover:bg-white/60 transition-colors"
              >
                <div className="text-4xl md:text-5xl font-display font-semibold text-slate-900 tracking-tighter mb-3">
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[10px] font-mono tracking-widest uppercase text-slate-500 font-bold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core Competencies: Interactive Grid with Hover Reveal */}
        <div className="max-w-6xl mx-auto px-6 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-slate-900 mb-4">Core Competencies</h2>
            <p className="text-slate-500 font-sans text-lg">Keunggulan spesifik dan arsitektur yang dirancang secara khusus.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {strengths.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-[2rem] bg-slate-100/50 border border-slate-200/50 p-10 md:p-12 transition-all duration-700 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]"
              >
                {/* Hover-activated Glassmorphism Reveal Layer */}
                <div className="absolute inset-0 bg-white/60 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>
                
                {/* Subtle colored glow reveal */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#4f46e5]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>

                <div className="relative z-10 mb-8 transform group-hover:-translate-y-1 transition-transform duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:border-indigo-100 group-hover:shadow-indigo-100/50 transition-all duration-500">
                    {item.icon}
                  </div>
                </div>
                
                <h3 className="relative z-10 text-2xl font-display font-semibold tracking-tight text-slate-900 mb-4 transform group-hover:translate-x-1 transition-transform duration-500">
                  {item.title}
                </h3>
                
                <p className="relative z-10 text-slate-600 font-sans text-[15px] leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section Included Here */}
        <div className="mb-32">
          <FaqSection />
        </div>

        {/* Premium Philosophy Section */}
        <div className="px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative rounded-[3rem] overflow-hidden bg-slate-900 text-white p-12 md:p-24 text-center mb-24 shadow-2xl max-w-6xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950"></div>
            {/* Subtle mesh/glow effect in background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4f46e5]/10 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <Code2 strokeWidth={1} className="w-16 h-16 mx-auto text-slate-400 mb-8 opacity-50" />
              <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight mb-8 leading-tight">
                Desain itu bukan sekadar rupa, <br/> melainkan bagaimana ia bekerja.
              </h2>
              <p className="text-xl text-slate-400 font-sans leading-relaxed mb-12">
                Setiap baris kode dan setiap piksel di layar dirancang dengan satu tujuan konversi. 
                Meniadakan yang tidak perlu, menyisakan yang esensial. Itulah fondasi standar CHESTADOTCOM.
              </p>
              <button 
                onClick={handleContactClick}
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-sans font-semibold tracking-wide hover:scale-105 active:scale-95 transition-transform"
              >
                Konsultasi Eksklusif
                <ArrowRight strokeWidth={1.5} size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
