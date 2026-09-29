import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Smartphone, ShieldCheck, Lock, ArrowRight, 
  CheckCircle2, Sparkles, Server, Briefcase,
  Cpu, MessageSquare, Clock, Globe, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOMetadata from '../components/atoms/SEOMetadata';
import AEOServiceSchema from '../components/atoms/AEOServiceSchema';

export default function SuperAppServicePage() {
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
    <div className="relative w-full flex flex-col bg-[#0b0b0f] text-slate-100 overflow-x-hidden selection:bg-fuchsia-600 selection:text-white font-sans">
      <SEOMetadata
        title="Pembuatan Super App Korporat & Bypass App Store (PWA) | Chestaa"
        description="Bebaskan bisnis Anda dari monopoli App Store. Bangun Super App berbasis PWA dengan instalasi instan dan komisi 0%."
        image="https://picsum.photos/seed/superapp/1200/630"
      />
      <AEOServiceSchema
        serviceName="Pembuatan Super App Korporat (Bypass App Store)"
        serviceDescription="Pengembangan aplikasi korporat berbasis Progressive Web App (PWA) berkecepatan tinggi tanpa potongan pajak App Store/Google Play."
        serviceUrl="https://chestaa.com/services/super-app-korporat-pwa"
        category="Enterprise Super App & PWA Architecture"
        keyBenefits={["Instalasi Instan Bypass Store", "Potongan Pajak 0 Persen", "Akses Mode Offline", "Lintas Perangkat (iOS/Android)"]}
        entities={["CHESTAADOTCOM", "Progressive Web App", "Super App Korporat", "Bypass App Store"]}
        mentions={["Next.js 15", "Web App Manifest", "Firebase", "Vercel"]}
      />

      {/* SECTION 1: THE EXECUTIVE HERO (ATTENTION - THE REBELLION HOOK) */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-6 sm:px-12 py-24 overflow-hidden border-b border-white/10">
        {/* Glowing Smartphone & PWA Installation Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.08, 1],
              opacity: [0.15, 0.35, 0.15]
            }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-fuchsia-500/20 rounded-full blur-[160px]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(#d946ef_1px,transparent_1px)] [background-size:44px_44px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fuchsia-950/80 border border-fuchsia-500/30 backdrop-blur-md text-fuchsia-400 text-xs font-mono uppercase tracking-wider shadow-lg"
          >
            <Smartphone size={13} className="text-fuchsia-400 animate-pulse" />
            <span>SUPER APP & PROGRESSIVE WEB ARCHITECTURE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.08]"
          >
            Bebaskan Bisnis Anda dari Monopoli App Store. <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-300 to-white">Bangun Super App Sendiri.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed"
          >
            Mengapa menyerahkan 30 persen profit Anda kepada Google dan Apple? Kami merancang arsitektur aplikasi berbasis web (PWA) yang bisa diinstal instan tanpa batasan pihak ketiga.
          </motion.p>

          {/* 4 Core Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-6"
          >
            {[
              { label: 'Instalasi Store', val: 'Bypass Instan' },
              { label: 'Komisi Platform', val: '0 Persen' },
              { label: 'Mode Offline', val: '100% Aktif' },
              { label: 'Lintas Perangkat', val: 'iOS / Android' }
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
              className="relative px-8 py-4 rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold text-sm sm:text-base tracking-wide shadow-[0_0_40px_rgba(217,70,239,0.4)] hover:shadow-[0_0_60px_rgba(217,70,239,0.7)] transition-all flex items-center gap-3 cursor-pointer group"
            >
              <span>Rancang Blueprint Aplikasi Gue</span>
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE BLEEDING REALITY (PAIN - NATIVE VS PWA) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left Column (Dim Red tone) */}
          <div className="p-10 rounded-3xl bg-red-950/15 border border-red-500/20 backdrop-blur-xl flex flex-col justify-between space-y-6">
            <div className="inline-flex items-center gap-2 text-red-400 text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>Aplikasi Tradisional (Native)</span>
            </div>
            <p className="text-xl sm:text-2xl text-red-200/90 font-medium leading-relaxed">
              Aplikasi Tradisional (Native): Biaya pengembangan ratusan juta. Harus menunggu berminggu-minggu untuk persetujuan Apple/Google. Setiap transaksi digital dipotong pajak platform hingga 30 persen.
            </p>
            <div className="text-xs text-red-400/70 font-mono">
              [Status: Biaya Mahal & Pajak Platform 30%]
            </div>
          </div>

          {/* Right Column (Vibrant Fuchsia/Purple tone) */}
          <div className="p-10 rounded-3xl bg-gradient-to-br from-fuchsia-950/40 to-purple-950/30 border border-fuchsia-500/30 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-fuchsia-400 text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
              <span>Super App Chestaa</span>
            </div>
            <p className="text-xl sm:text-2xl text-white font-semibold leading-relaxed">
              Super App Chestaa: Diluncurkan seketika. Pelanggan cukup menekan satu tombol di website Anda untuk menginstal aplikasi ke layar HP mereka. Profit 100 persen masuk ke kas Anda.
            </p>
            <div className="text-xs text-fuchsia-400 font-mono">
              [Status: Peluncuran Instan & 100% Profit Milik Anda]
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: LOCALIZED MICRO-PORTFOLIO (TRUST BUILDER) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0b0b0f]">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
            <span>Blueprint Ekosistem Skala Besar</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl">
            Arsitektur Skala Enterprise di Genggaman Pengguna
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Jujurly, kita sudah berpengalaman merancang blueprint ekosistem Super App skala besar untuk institusi lokal di wilayah Tangerang. Arsitektur yang kami bangun dirancang untuk menahan beban ribuan pengguna harian secara serentak.
          </p>
          <div className="p-8 sm:p-12 rounded-3xl bg-fuchsia-950/20 border border-fuchsia-500/30 backdrop-blur-2xl w-full max-w-3xl flex flex-col items-center space-y-4 shadow-2xl">
            <span className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-300">
              Turun Drastis Tanpa Store
            </span>
            <span className="text-sm sm:text-base text-slate-300 font-medium tracking-wide">
              Biaya akuisisi pengguna (User Acquisition Cost) turun drastis karena pelanggan tidak perlu diarahkan ke Play Store.
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE AUTONOMOUS WORKFLOW (WORKFLOW) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto flex flex-col space-y-16">
          <div className="text-center space-y-4">
            <span className="text-fuchsia-400 text-xs font-mono uppercase tracking-wider">Alur Pengembangan Super App</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              The Autonomous Workflow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Desain Antarmuka Mobile-First', desc: 'Kami merancang UI/UX yang memberikan pengalaman aplikasi native yang sangat mulus di ujung jari pelanggan.' },
              { step: '02', title: 'Injeksi Service Worker', desc: 'Menanamkan skrip pekerja latar belakang agar aplikasi Anda tetap bisa diakses dan memuat data meskipun sinyal internet pelanggan sedang putus (Offline Mode).' },
              { step: '03', title: 'Peluncuran Tanpa Hambatan', desc: 'Tidak ada proses review berbelit. Begitu sistem siap, pelanggan langsung bisa mengunduh dan bertransaksi.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col space-y-4 relative"
              >
                <span className="text-4xl font-extrabold text-fuchsia-500/40 font-mono">{item.step}</span>
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
            <span className="text-fuchsia-400 text-xs font-mono uppercase tracking-wider">Standar Teknologi Raksasa Global</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-snug">
              Teknologi Silicon Valley di Genggaman Anda
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Twitter, Starbucks, dan Uber telah beralih menggunakan teknologi PWA untuk aplikasi ringan mereka. Kami membawa arsitektur tingkat raksasa Silicon Valley ini langsung ke dalam genggaman perusahaan Anda.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl flex flex-col items-center justify-center space-y-6 shadow-2xl">
            <div className="flex items-center gap-6">
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-fuchsia-300">Next.js 15</span>
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-purple-300">Web App Manifest</span>
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-white">Firebase</span>
            </div>
            <div className="text-xs text-slate-500 font-mono text-center">
              [PWA Compliance & Offline Capabilities]
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: THE ZERO-HOSTAGE GUARANTEE (SECURITY) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-fuchsia-950/50 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400 shadow-xl">
            <Lock size={28} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            The Zero-Hostage Guarantee
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Kemerdekaan Finansial Absolut. Karena aplikasi Anda berjalan di luar ekosistem App Store, tidak ada entitas raksasa yang bisa membekukan aplikasi Anda secara sepihak atau merampas potongan komisi dari kerja keras Anda.
          </p>
        </div>
      </section>

      {/* SECTION 7: THE COST OF INACTION (URGENCY) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#08080c]">
        <div className="max-w-4xl mx-auto p-10 sm:p-14 rounded-3xl bg-red-950/20 border border-red-500/30 backdrop-blur-2xl text-center space-y-6 shadow-2xl">
          <span className="text-red-400 text-xs font-mono uppercase tracking-widest">[Perampokan Komisi Platform]</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white leading-snug">
            Hitung uang yang dirampas: Jika pelanggan bertransaksi 1 Miliar melalui aplikasi native Anda, Apple dan Google memotong 300 Juta. Membuat aplikasi native di era sekarang adalah bunuh diri finansial.
          </h2>
        </div>
      </section>

      {/* SECTION 8: THE ANTI-SAAS PRICING (VALUE) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0b0b0f]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block text-slate-500 text-lg sm:text-xl font-mono line-through decoration-red-500 decoration-2">
            Biaya Pemeliharaan Dua Tim Developer (iOS & Android)
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Satu Basis Kode Untuk Semua Perangkat
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Berhenti menggaji dua tim berbeda. Chestaa menggunakan basis kode tunggal mutakhir. Satu kali pengembangan, aplikasi Anda berjalan sempurna di iPhone, Android, Tablet, hingga Desktop.
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
                <p className="text-xs text-fuchsia-400 font-mono">Founder & Principal System Architect</p>
              </div>
            </div>
            <p className="text-base text-slate-300 leading-relaxed italic">
              "Gue ngebangun infrastruktur Super App ini supaya pengusaha lokal bisa punya ekosistem mandiri. Lo nggak butuh izin raksasa teknologi buat membesarkan bisnis lo."
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-ping" />
              <span>Direct Founder Line • Aktif 24/7</span>
            </div>
          </div>

          {/* Right Column: AI Chat Trigger Area */}
          <div className="p-8 sm:p-10 rounded-3xl bg-fuchsia-950/20 border border-fuchsia-500/30 backdrop-blur-2xl flex flex-col space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-fuchsia-400 text-xs font-mono">
              <Sparkles size={14} className="text-fuchsia-400 animate-spin" />
              <span>AI Takeover & Rancangan Blueprint App</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Simulasi Arsitektur Super App
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Jujurly, ngasih jatah 30 persen ke App Store tuh literally ngerampok profit bisnis lo. [SPLIT] Mau gue bantu rancang arsitektur aplikasi yang 100 persen profitnya masuk ke kantong lo?
            </p>
            <Link
              to="/"
              onClick={() => {
                const chatLauncher = document.querySelector('[aria-label="Konsultasi Arsitektur"]') as HTMLButtonElement;
                if (chatLauncher) chatLauncher.click();
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold text-sm transition-all shadow-lg cursor-pointer"
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
