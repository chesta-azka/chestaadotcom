import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Code2, Cpu, ArrowUpRight, Zap, ShieldCheck, CheckCircle2, User, Award, Layers, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import chestaPhoto from '../../assets/images/regenerated_image_1787838669318.png';

interface WordProps {
  children: string;
  progress: any;
  range: [number, number];
}

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const blur = useTransform(progress, range, [8, 0]);
  const y = useTransform(progress, range, [6, 0]);
  const color = useTransform(progress, range, ['#94a3b8', '#0f172a']);

  return (
    <span className="relative inline-block mr-[0.24em] my-[0.06em]">
      <motion.span
        style={{
          opacity,
          filter: useTransform(blur, (v) => `blur(${v}px)`),
          y,
          color,
        }}
        className="inline-block transition-all duration-150"
      >
        {children}
      </motion.span>
    </span>
  );
};

export default function AboutMeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const avatarUrl = chestaPhoto;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 30%'],
  });

  const narrativeText = 
    "Halo, saya Chesta — Lead Digital Architect & AI Engineer di balik CHESTAADOTCOM. Saya mengkhususkan diri dalam merancang arsitektur website berperforma tinggi serta mengintegrasikan sistem AI otonom yang menyederhanakan operasional bisnis. Menggabungkan estetika antarmuka modern dengan rekayasa kode presisi, kami mengubah ide menjadi aset digital yang skalabel, elegan, dan berdampak langsung pada pertumbuhan usaha Anda.";

  const words = narrativeText.split(' ');

  const bentoCards = [
    {
      icon: Cpu,
      title: "Agentic AI & Otomasi Cerdas",
      desc: "Integrasi LLM, chatbot AI pintar untuk Live Chat & Web, dan alur kerja otonom 24/7.",
      tag: "KAPABILITAS AI",
      metric: "24/7",
      metricSub: "Otomasi Respons"
    },
    {
      icon: Zap,
      title: "Zero-Latency Performance",
      desc: "Website ultra-cepat dengan arsitektur modern (React, TypeScript, Edge APIs) & skor Lighthouse 99+.",
      tag: "PERFORMA",
      metric: "< 0.8s",
      metricSub: "Waktu Muat Rata-rata"
    },
    {
      icon: Code2,
      title: "Rekayasa Kustom (No Template)",
      desc: "Setiap baris kode dibangun secara bespoke sesuai kebutuhan unik bisnis Anda tanpa bloatware.",
      tag: "KODE BESPOKE",
      metric: "100%",
      metricSub: "Full Customization"
    }
  ];

  return (
    <div 
      ref={containerRef}
      className="relative w-full py-4 sm:py-6 md:py-8 text-slate-900 select-none overflow-hidden"
    >
      {/* Header Tag & Section Title */}
      <div className="flex flex-col items-center text-center mb-6 sm:mb-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -300px 0px" }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50/90 border border-purple-200/90 shadow-2xs mb-3.5"
        >
          <Sparkles size={13} className="text-purple-600 animate-pulse" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-purple-800">
            TENTANG ARSITEK & STUDIO
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -300px 0px" }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-slate-900"
        >
          Mengenal <span className="bg-gradient-to-r from-purple-800 via-purple-600 to-purple-900 bg-clip-text text-transparent">CHESTAADOTCOM</span>
        </motion.h2>
      </div>

      {/* Main Bento Layout: Profile Bio + Word-by-Word Scroll Reveal */}
      <div className="relative max-w-5xl mx-auto px-2 sm:px-4">
        
        {/* Top Profile Summary Card */}
        <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white/40 backdrop-blur-2xl border border-white/60 shadow-xl shadow-purple-900/5 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6 pb-6 border-b border-slate-100">
            {/* Avatar & Online status */}
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-purple-600 to-purple-600 p-0.5 shadow-md overflow-hidden">
                <img 
                  src={avatarUrl} 
                  alt="Chesta - Lead Digital Architect"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top rounded-[14px]"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
              </span>
            </div>

            {/* Profile Info */}
            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900">Chesta Azka Sofyan</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 text-[10px] font-mono font-bold border border-purple-200/70 uppercase">
                  Lead Digital Architect & Founder
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed mb-3">
                Spesialis Rekayasa Frontend, Cloud Native & Integrasi Agentic AI. Dikenal dengan prinsip: arsitektur visual mewah kelas Apple dengan harga terjangkau dan ramah untuk UMKM.
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <a
                  href="https://instagram.com/chestaadotcom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-700 font-mono text-[10px] font-semibold transition-colors"
                >
                  <span>@chestaadotcom</span>
                </a>
                <a
                  href="https://tiktok.com/@chesta_azka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-mono text-[10px] font-semibold transition-colors"
                >
                  <span>@chesta_azka</span>
                </a>
              </div>
            </div>

            {/* Quick Experience Badge */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200/80 shrink-0">
              <Terminal size={18} className="text-purple-600 shrink-0" />
              <div className="text-left">
                <div className="text-xs font-bold font-mono text-slate-900">5+ Tahun</div>
                <div className="text-[10px] text-slate-500 font-sans">Pengalaman Rekayasa</div>
              </div>
            </div>
          </div>

          {/* Word-By-Word Scroll Reveal Statement */}
          <div className="relative">
            <div className="text-purple-200/60 font-serif text-5xl sm:text-7xl leading-none absolute -top-6 -left-2 pointer-events-none select-none">
              “
            </div>

            <div className="relative z-10 text-base sm:text-xl md:text-2xl font-display font-medium text-slate-800 leading-[1.65] sm:leading-[1.7] tracking-tight pl-3 sm:pl-6 min-h-[140px] sm:min-h-[120px]">
              {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);
                return (
                  <Word 
                    key={i} 
                    progress={scrollYProgress} 
                    range={[start, end]}
                  >
                    {word}
                  </Word>
                );
              })}
            </div>

            {/* Soft White Gradient Overlay at Bottom of Narrative as requested */}
            <div className="absolute -bottom-4 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-20" />
          </div>
        </div>

        {/* 3-Column Bento Grid Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
          {bentoCards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -300px 0px" }}
                transition={{ delay: 0.1 + idx * 0.1 }}
                className="p-5 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl shadow-purple-900/5 hover:border-purple-300 hover:bg-white/60 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 group-hover:scale-105 transition-transform">
                      <Icon size={18} />
                    </div>
                    <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                      {item.tag}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm sm:text-base text-slate-900 mb-1.5 group-hover:text-purple-800 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-base sm:text-lg font-bold font-display text-purple-800">{item.metric}</span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">{item.metricSub}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Interactive Navigation & Action Bar */}
        <div className="mt-6 sm:mt-8 p-4 rounded-2xl bg-gradient-to-r from-purple-50/70 via-purple-50/50 to-slate-50 border border-purple-100/90 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Award size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Ingin membaca profil lengkap & metodologi?</p>
              <p className="text-[11px] text-slate-500">Jelajahi filosofi desain dan rekayasa kode kami di halaman Tentang.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-purple-200 text-purple-800 hover:bg-purple-50 text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-2xs cursor-pointer group"
            >
              <span>Buka Halaman Tentang</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <a
              href={`https://wa.me/6282125447232?text=${encodeURIComponent('Halo Mas Chesta, saya ingin konsultasi proyek pembuatan website bersama CHESTAADOTCOM.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-2xs cursor-pointer group"
            >
              <span>Chat with us on WhatsApp</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
