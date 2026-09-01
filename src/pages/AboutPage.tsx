import SEOProvider from '../components/atoms/SEOProvider';
import React, { useEffect, useRef, useState } from 'react';
import { motion, animate, useInView, useScroll, useTransform } from 'motion/react';
import { 
  Layers, 
  Zap, 
  Cpu, 
  Target, 
  Code2, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Fingerprint, 
  Activity, 
  Sparkles, 
  Terminal, 
  Globe, 
  Laptop, 
  Clock, 
  Award,
  ArrowUpRight,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import LocalWeatherWidget from '../components/atoms/LocalWeatherWidget';
import MetaTags from '../components/atoms/MetaTags';
import FaqSection from '../components/organisms/FaqSection';
import { Link } from 'react-router-dom';

import chestaPhoto from '../assets/images/regenerated_image_1787838669318.png';

interface WordProps {
  children: string;
  progress: any;
  range: [number, number];
}

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const blur = useTransform(progress, range, [6, 0]);
  const y = useTransform(progress, range, [4, 0]);
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

const DEFAULT_AVATAR = chestaPhoto;

const strengths = [
  {
    icon: Fingerprint,
    title: "Signature UI/UX Design",
    tag: "ESTETIKA & INTERAKSI",
    desc: "Desain antarmuka kelas dunia yang minimalis, intuitif, dan bebas distorsi visual. Berfokus pada presisi tipografi dan tata letak modern layaknya standar produk teknologi terkemuka."
  },
  {
    icon: Zap,
    title: "Zero-Latency Engineering",
    tag: "KECEPATAN EKSTREM",
    desc: "Arsitektur frontend berkinerja tinggi. Waktu muat instan di bawah 0.8 detik memanfaatkan kompresi aset pintar, caching edge server, dan eliminasi kode mubazir."
  },
  {
    icon: Cpu,
    title: "Agentic AI Integration",
    tag: "OTOMASI CERDAS",
    desc: "Menanamkan kecerdasan buatan otonom untuk melayani konsultasi prospek, otomasi alur kerja Live Chat, dan asisten digital interaktif 24 jam sehari."
  },
  {
    icon: Activity,
    title: "Conversion Architecture",
    tag: "PERTUMBUHAN BISNIS",
    desc: "Struktur semantik SEO terkini yang dioptimalkan untuk algoritma pencarian Google, meningkatkan retensi pengunjung, dan mengonversikan traffic menjadi penjualan nyata."
  }
];

const techStack = [
  { name: "React 19 & TypeScript", category: "Core Frontend" },
  { name: "Tailwind CSS & Motion", category: "Styling & Animation" },
  { name: "Node.js & Express", category: "Backend Architecture" },
  { name: "Google Gemini & AI SDK", category: "Agentic AI & LLMs" },
  { name: "PostgreSQL & Firestore", category: "Cloud Database" },
  { name: "Vercel & Cloud Run", category: "Edge & Container Hosting" },
  { name: "REST & WebSockets", category: "Realtime Protocols" },
  { name: "Vite & SWC", category: "High-Speed Build Tooling" },
];

const stats = [
  { label: "Proyek Selesai", value: 45, suffix: "+" },
  { label: "Kepuasan Klien", value: 100, suffix: "%" },
  { label: "Tahun Pengalaman", value: 5, suffix: "+" },
  { label: "Rata-rata Waktu Muat", value: 0.8, suffix: "s", isDecimal: true }
];

function AnimatedCounter({ to, suffix = "", duration = 2, isDecimal = false }: { to: number, suffix?: string, duration?: number, isDecimal?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(0, to, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (value) => {
          if (ref.current) {
            ref.current.textContent = isDecimal 
              ? value.toFixed(1) + suffix 
              : Math.round(value).toString() + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [to, inView, duration, suffix, isDecimal]);

  return <span ref={ref} className="font-display font-bold">0{suffix}</span>;
}

export default function AboutPage() {
  const manifestoRef = useRef<HTMLDivElement>(null);
  const avatarUrl = chestaPhoto;

  const { scrollYProgress } = useScroll({
    target: manifestoRef,
    offset: ['start 80%', 'end 35%'],
  });

  const manifestoText = 
    "Di CHESTAADOTCOM, kami menolak pendekatan template murahan dan kompromi performa. Kami percaya bahwa setiap produk digital berkualitas harus memiliki pondasi arsitektur yang kokoh, kode yang bersih, dan kecerdasan buatan yang mampu menggerakkan pertumbuhan bisnis secara nyata.";

  const manifestoWords = manifestoText.split(' ');

  const handleContactClick = () => {
    const text = 'Halo Mas Chesta, saya tertarik untuk mendiskusikan visi proyek digital saya lebih lanjut.';
    window.dispatchEvent(new CustomEvent('open-ai-chat'))
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-transparent relative overflow-hidden select-none">
      <SEOProvider 
        title="Tentang Kami & Profil Arsitek | CHESTAADOTCOM"
        description="Mengenal Chesta dan visi CHESTAADOTCOM dalam rekayasa website berkecepatan tinggi, UI/UX modern, dan otomasi Agentic AI."
      />
      <LocalWeatherWidget />
      <MetaTags 
        title="Tentang - Profil & Keahlian Inti | CHESTAADOTCOM"
        description="Pelajari profil, pengalaman 5+ tahun, dan keahlian rekayasa web dan AI dari CHESTAADOTCOM."
      />

      {/* Decorative ambient background glows - simplified for a cleaner white look */}
      <div className="fixed top-20 right-10 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-20 left-10 w-[450px] h-[450px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none z-0" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 md:pt-48 pb-20">
        
        {/* Hero Section Badge & Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50/90 border border-purple-200/90 shadow-2xs mb-6">
            <Sparkles size={13} className="text-purple-600 animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-purple-800">
              ARSITEK & STUDIO INDEPENDEN
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
            Mendefinisikan Ulang <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-600 to-purple-900">
              Standar Rekayasa Digital.
            </span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-slate-600 font-sans tracking-tight max-w-2xl mx-auto font-normal leading-relaxed">
            Keunggulan teknis berpadu dengan estetika modern. Kami membangun arsitektur digital dan solusi AI otonom yang bekerja tanpa cela untuk bisnis Anda.
          </p>
        </motion.div>

        {/* Bento Box Master Grid: Profile + Manifesto + Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 mb-16 sm:mb-24">
          
          {/* Bento Item 1: Lead Architect Card with Photo (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -300px 0px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-xs flex flex-col justify-between"
          >
            <div>
              {/* Profile Photo & Info Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 mb-6">
                {/* Photo Container & Online Status */}
                <div className="relative shrink-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-purple-600 via-purple-600 to-purple-900 p-0.5 shadow-lg shadow-purple-500/10 overflow-hidden">
                    <img 
                      src={avatarUrl} 
                      alt="Foto Chesta - Lead Digital Architect"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top rounded-[14px] transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Online indicator */}
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
                  </span>
                </div>

                <div className="text-center sm:text-left flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                    <h3 className="text-xl font-bold font-display text-slate-900">Chesta Azka Sofyan</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 text-[10px] font-mono font-bold border border-purple-200/70 uppercase">
                      VERIFIED
                    </span>
                  </div>
                  <p className="text-xs font-mono font-bold text-purple-600 uppercase tracking-wider mb-1.5">
                    LEAD DIGITAL ARCHITECT & AI ENGINEER
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-sans text-slate-500 mb-3">
                    <Globe size={12} className="text-slate-400" />
                    Cisauk &bull; BSD City &bull; Tangerang &bull; Worldwide
                  </span>

                  {/* Social Handles */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <a
                      href="https://instagram.com/chestaadotcom"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2.5 py-1 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 transition-colors"
                    >
                      <span>IG: @chestaadotcom</span>
                    </a>
                    <a
                      href="https://tiktok.com/@chesta_azka"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition-colors"
                    >
                      <span>TikTok: @chesta_azka</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5 text-slate-600 text-xs sm:text-sm font-sans leading-relaxed">
                <p>
                  Saya mendirikan <strong className="text-slate-900 font-semibold">CHESTAADOTCOM</strong> dengan misi berani: <span className="text-purple-800 font-medium">menghadirkan website dengan estetika visual mewah kelas Apple namun dengan harga terjangkau yang ramah bagi UMKM</span>.
                </p>
                <p>
                  Banyak programmer hanya fokus membuat kode yang berjalan tapi mengabaikan estetika visual sehingga terlihat kaku dan murahan. Kami menggabungkan seni desain sinematik, optimasi SEO lokal Cisauk/BSD peringkat #1, serta sistem Agentic AI otonom.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700">
                <CheckCircle2 size={15} className="text-purple-600" />
                <span>Bespoke Engineering Only</span>
              </div>
              <span className="text-[11px] font-mono text-purple-800 font-semibold uppercase">5+ Yrs Exp</span>
            </div>
          </motion.div>

          {/* Bento Item 2: Word-by-Word Manifesto (7 cols) */}
          <motion.div 
            ref={manifestoRef}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -300px 0px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 p-6 sm:p-8 md:p-10 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-xs flex flex-col justify-between relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                  FILOSOFI KAMI
                </span>
                <span className="text-xs font-mono text-slate-400">01 / MANIFESTO</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 mb-4">
                Komitmen terhadap Presisi & Kinerja Absolut
              </h3>

              {/* Word-By-Word Scroll Reveal */}
              <div className="relative text-base sm:text-xl md:text-2xl font-display font-medium text-slate-800 leading-[1.65] sm:leading-[1.7] tracking-tight min-h-[140px]">
                {manifestoWords.map((word, i) => {
                  const start = i / manifestoWords.length;
                  const end = start + (1 / manifestoWords.length);
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
            </div>

            {/* Soft White Gradient Finish at bottom */}
            <div className="absolute -bottom-2 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />

            <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 relative z-20">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-sans">
                <ShieldCheck size={16} className="text-emerald-600" />
                <span>100% Bebas Template & Garansi Performa</span>
              </div>
              <a
                href={`https://wa.me/6282125447232?text=${encodeURIComponent('Halo Mas Chesta, saya tertarik untuk mendiskusikan visi proyek digital saya lebih lanjut.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-purple-700 hover:text-purple-900 transition-colors cursor-pointer"
              >
                <span>Chat with us di WhatsApp</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>

        </div>

        {/* Live Metrics Counter Bar */}
        <div className="mb-16 sm:mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -300px 0px" }}
                transition={{ duration: 0.6, delay: 0.1 + (idx * 0.08) }}
                className="flex flex-col items-center justify-center p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-2xs hover:border-purple-200 transition-all text-center"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight mb-2 text-purple-800">
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} isDecimal={stat.isDecimal} />
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-slate-500 font-bold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core Competencies: 4 Bento Cards */}
        <div className="mb-16 sm:mb-24">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-100 mb-3 inline-block">
              CORE COMPETENCIES
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight text-slate-900 mb-3">
              Keahlian Spesifik yang Kami Tawarkan
            </h2>
            <p className="text-slate-500 font-sans text-sm sm:text-base max-w-xl mx-auto">
              Setiap aspek dibangun dengan standar tertinggi demi daya saing digital bisnis Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {strengths.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -300px 0px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 p-6 sm:p-8 md:p-10 transition-all duration-300 hover:border-purple-300 hover:shadow-xs"
                >
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 group-hover:scale-105 transition-transform shadow-2xs">
                      <Icon size={22} />
                    </div>
                    <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                      {item.tag}
                    </span>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-slate-900 mb-3 group-hover:text-purple-800 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Tech Stack Matrix */}
        <div className="mb-16 sm:mb-24 p-6 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-100 mb-2 inline-block">
                STACK & EKOSISTEM
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900">Teknologi Modern Terpilih</h3>
            </div>
            <p className="text-xs text-slate-500 font-sans max-w-sm">
              Hanya menggunakan perkakas rekayasa terbaik untuk stabilitas jangka panjang.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {techStack.map((tech, idx) => (
              <div 
                key={idx} 
                className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:border-purple-300 hover:bg-purple-50/40 transition-all"
              >
                <div className="text-xs font-bold font-display text-slate-900 mb-0.5">{tech.name}</div>
                <div className="text-[10px] font-mono text-purple-600">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Integrated FAQ Section */}
        <div className="mb-16 sm:mb-24">
          <FaqSection />
        </div>

        {/* Premium Philosophy CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -300px 0px" }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100/50 text-slate-900 border border-purple-200 p-8 sm:p-12 md:p-16 text-center shadow-xl max-w-5xl mx-auto"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <Code2 strokeWidth={1.5} className="w-12 h-12 mx-auto text-purple-600 mb-6" />
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight mb-4 leading-tight text-slate-900">
              Siap Mentransformasi Kehadiran Digital Bisnis Anda?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed mb-8">
              Mulai dari website profil perusahaan hingga sistem Agentic AI otomatis — mari rancang solusi yang presisi dan relevan dengan target pertumbuhan Anda.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a 
                href={`https://wa.me/6282125447232?text=${encodeURIComponent('Halo Mas Chesta, saya siap mentransformasi kehadiran digital bisnis saya bersama CHESTAADOTCOM.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-7 py-3.5 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg shadow-purple-600/20 transition-all cursor-pointer"
              >
                <MessageSquare size={16} />
                <span>Chat with us on WhatsApp</span>
              </a>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 bg-white hover:bg-purple-50 border border-purple-200 text-purple-700 px-6 py-3.5 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-2xs"
              >
                <span>Lihat Portofolio</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
