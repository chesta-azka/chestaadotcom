import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Target, ShieldCheck, Lock, ArrowRight, 
  CheckCircle2, TrendingUp, Sparkles, Server,
  Zap, MessageSquare, Clock, Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOMetadata from '../components/atoms/SEOMetadata';

export default function LandingPageConversionServicePage() {
  const aiSectionRef = useRef<HTMLDivElement>(null);

  // Magnetic CTA mouse tracking
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x: x * 0.2, y: y * 0.2 });
  };
  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full flex flex-col bg-[#0b0b0f] text-slate-100 overflow-x-hidden selection:bg-rose-600 selection:text-white font-sans">
      <SEOMetadata
        title="Landing Page Konversi Tinggi & ROAS Savior | Chestaa"
        description="Iklan boncos karena landing page lambat? Kami merancang mesin konversi sub-detik yang memaksa prospek membeli."
      />

      {/* SECTION 1: THE EXECUTIVE HERO (ATTENTION - THE AD SPEND HOOK) */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-6 sm:px-12 py-24 overflow-hidden border-b border-white/10">
        {/* Floating Sales Funnel Graphic Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.15, 0.3, 0.15]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-rose-500/20 rounded-full blur-[150px]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/30 backdrop-blur-md text-rose-400 text-xs font-mono uppercase tracking-wider shadow-lg"
          >
            <Target size={13} className="text-rose-400 animate-pulse" />
            <span>OPTIMASI PENJUALAN & ROAS SAVIOR</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.08]"
          >
            Iklan Anda Boncos Karena Landing Page yang Lambat. <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-white">Waktunya Balik Modal.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed"
          >
            Kami tidak sekadar membuat satu halaman. Kami merancang mesin konversi berkecepatan sub-detik dengan copywriting psikologis yang memaksa prospek untuk membeli.
          </motion.p>

          {/* 4 Core Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-6"
          >
            {[
              { label: 'Load Speed', val: '< 0.8 Detik' },
              { label: 'Bounce Rate', val: '< 15 Persen' },
              { label: 'Desain Psikologis', val: 'Conversion-First' },
              { label: 'Penyelamat ROAS', val: 'Maksimal' }
            ].map((metric, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center text-center shadow-xl">
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">{metric.val}</span>
                <span className="text-xs text-slate-400 mt-1 font-mono">{metric.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Magnetic CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-4"
          >
            <motion.button
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ x: mousePos.x, y: mousePos.y }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              onClick={() => {
                const el = document.getElementById('founder-vip-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-sm sm:text-base tracking-wide shadow-[0_0_40px_rgba(244,63,94,0.4)] hover:shadow-[0_0_60px_rgba(244,63,94,0.7)] transition-all flex items-center gap-3 cursor-pointer group"
            >
              <span>Audit Landing Page Saya Sekarang</span>
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE BLEEDING REALITY (PAIN - BOUNCE VS CONVERSION) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left Column (Dim Red tone) */}
          <div className="p-10 rounded-3xl bg-red-950/15 border border-red-500/20 backdrop-blur-xl flex flex-col justify-between space-y-6">
            <div className="inline-flex items-center gap-2 text-red-400 text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>Landing Page Biasa</span>
            </div>
            <p className="text-xl sm:text-2xl text-red-200/90 font-medium leading-relaxed">
              Landing Page Biasa: Memuat lebih dari 3 detik. Copywriting kaku. Tombol pesan tidak jelas. Anda membayar klik iklan mahal hanya untuk melihat prospek langsung menutup tab.
            </p>
            <div className="text-xs text-red-400/70 font-mono">
              [Status: Anggaran Iklan Terbuang & Bounce Rate Tinggi]
            </div>
          </div>

          {/* Right Column (Vibrant Rose/Purple tone) */}
          <div className="p-10 rounded-3xl bg-gradient-to-br from-rose-950/40 to-purple-950/30 border border-rose-500/30 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-rose-400 text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              <span>Mesin Konversi Chestaa</span>
            </div>
            <p className="text-xl sm:text-2xl text-white font-semibold leading-relaxed">
              Mesin Konversi Chestaa: Terbuka instan sebelum otak prospek memproses. Teks memicu rasa butuh yang mendesak. Desain memandu mata langsung ke tombol pembelian.
            </p>
            <div className="text-xs text-rose-400 font-mono">
              [Status: Konversi Maksimal & ROAS Berlipat]
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: LOCALIZED MICRO-PORTFOLIO (TRUST BUILDER) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0b0b0f]">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
            <span>Analisis Perilaku & Heatmap</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl">
            Desain Berbasis Data & Psikologi Pembeli
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Jujurly, desain cantik itu omong kosong kalau nggak menghasilkan duit. Kami merancang tata letak berdasarkan data heatmap dan psikologi perilaku pembeli.
          </p>
          <div className="p-8 sm:p-12 rounded-3xl bg-rose-950/20 border border-rose-500/30 backdrop-blur-2xl w-full max-w-3xl flex flex-col items-center space-y-4 shadow-2xl">
            <span className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-300">
              Hingga 4.5 Persen
            </span>
            <span className="text-sm sm:text-base text-slate-300 font-medium tracking-wide">
              Tingkat konversi (Conversion Rate) melonjak hingga 4.5 persen pada minggu pertama peluncuran.
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE AUTONOMOUS WORKFLOW (WORKFLOW) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto flex flex-col space-y-16">
          <div className="text-center space-y-4">
            <span className="text-rose-400 text-xs font-mono uppercase tracking-wider">Alur Perancangan Konversi</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              The Autonomous Workflow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Suntikan Psikologi Penjualan', desc: 'Meracik copywriting yang menabrakkan rasa sakit prospek dengan solusi instan Anda.' },
              { step: '02', title: 'Injeksi Kecepatan Absolut', desc: 'Menulis kode Next.js murni tanpa builder berat, memastikan skor performa Google 100/100.' },
              { step: '03', title: 'Pelacakan Piksel Presisi', desc: 'Menanamkan Meta Pixel dan Google Analytics secara akurat agar iklan Anda semakin pintar mencari pembeli.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col space-y-4 relative"
              >
                <span className="text-4xl font-extrabold text-rose-500/40 font-mono">{item.step}</span>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: THE ENTERPRISE ENGINE VAULT (AUTHORITY) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0b0b0f]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-rose-400 text-xs font-mono uppercase tracking-wider">Infrastruktur Reaksi Tinggi</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-snug">
              Bebas Dari Beban WordPress & Elementor
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Kami tidak menggunakan WordPress atau Elementor yang berat. Halaman penawaran Anda dibangun di atas infrastruktur bereaksi tinggi, memastikan iklan Anda tidak membuang trafik secara sia-sia.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl flex flex-col items-center justify-center space-y-6 shadow-2xl">
            <div className="flex items-center gap-6">
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-rose-300">Next.js 15</span>
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-pink-300">Meta / Google Pixels</span>
            </div>
            <div className="text-xs text-slate-500 font-mono text-center">
              [Performa Sempurna & Pelacakan Akurat]
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: THE ZERO-HOSTAGE GUARANTEE (SECURITY) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-950/50 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-xl">
            <Target size={28} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            The Zero-Hostage Guarantee
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            100 Persen Aset Milik Anda. Tidak ada langganan landing page builder bulanan. Desain, kode sumber, dan data audiens mutlak menjadi hak kepemilikan bisnis Anda.
          </p>
        </div>
      </section>

      {/* SECTION 7: THE COST OF INACTION (URGENCY) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#08080c]">
        <div className="max-w-4xl mx-auto p-10 sm:p-14 rounded-3xl bg-red-950/20 border border-red-500/30 backdrop-blur-2xl text-center space-y-6 shadow-2xl">
          <span className="text-red-400 text-xs font-mono uppercase tracking-widest">[Pembakaran Anggaran Iklan]</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white leading-snug">
            Setiap hari iklan Anda berjalan dengan landing page yang lambat, Anda secara harfiah sedang membakar anggaran Meta Ads dan Google Ads Anda. Prospek Anda marah, dan kompetitor Anda tersenyum.
          </h2>
        </div>
      </section>

      {/* SECTION 8: THE ANTI-SAAS PRICING (VALUE) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0b0b0f]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block text-slate-500 text-lg sm:text-xl font-mono line-through decoration-red-500 decoration-2">
            Biaya Langganan Landing Page Builder Bulanan
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Investasi Sekali Untuk Aset Iklan Berkinerja Tinggi
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Berhenti menyewa halaman promosi. Chestaa memberikan investasi satu kali untuk aset berkecepatan tinggi yang akan terus memompa profit iklan Anda tanpa biaya siluman.
          </p>
        </div>
      </section>

      {/* SECTION 9: THE FOUNDER VIP LINE & AI TAKEOVER (ACTION) */}
      <section id="founder-vip-section" ref={aiSectionRef} className="py-32 px-6 sm:px-12 bg-[#0d0d12]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Founder Profile */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl flex flex-col space-y-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center text-slate-400 font-bold text-xl grayscale">
                CA
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Chesta Azka</h3>
                <p className="text-xs text-rose-400 font-mono">Founder & Principal System Architect</p>
              </div>
            </div>
            <p className="text-base text-slate-300 leading-relaxed italic">
              "Gue paling benci ngeliat pengusaha buang duit ratusan juta buat iklan tapi bounce rate-nya hancur. Mari kita perbaiki infrastruktur konversi lo sekarang."
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
              <span>Direct Founder Line • Aktif 24/7</span>
            </div>
          </div>

          {/* Right Column: AI Chat Trigger Area */}
          <div className="p-8 sm:p-10 rounded-3xl bg-rose-950/20 border border-rose-500/30 backdrop-blur-2xl flex flex-col space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-rose-400 text-xs font-mono">
              <Sparkles size={14} className="text-rose-400 animate-spin" />
              <span>AI Takeover & Audit Kebocoran Iklan</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Simulasi Audit Kebocoran Anggaran Iklan
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Jujurly, kalau landing page lo butuh waktu 3 detik buat kebuka, lo udah kehilangan 50 persen pembeli. Mau gue hitungin berapa duit iklan lo yang bocor hari ini?
            </p>
            <Link
              to="/"
              onClick={() => {
                const chatLauncher = document.querySelector('[aria-label="Konsultasi Arsitektur"]') as HTMLButtonElement;
                if (chatLauncher) chatLauncher.click();
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm transition-all shadow-lg cursor-pointer"
            >
              <span>Mulai Simulasi Chat</span>
              <MessageSquare size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
