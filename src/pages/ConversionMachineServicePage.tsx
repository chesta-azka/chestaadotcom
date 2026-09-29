import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Zap, ShieldCheck, Lock, ArrowRight, 
  CheckCircle2, TrendingUp, Sparkles, Server,
  Gauge, Code2, Clock, MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOMetadata from '../components/atoms/SEOMetadata';
import AEOServiceSchema from '../components/atoms/AEOServiceSchema';

export default function ConversionMachineServicePage() {
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
    <div className="relative w-full flex flex-col bg-[#0b0b0f] text-slate-100 overflow-x-hidden selection:bg-emerald-600 selection:text-white font-sans">
      <SEOMetadata
        title="Website Mesin Konversi & Performa Tinggi | Chestaa"
        description="Tinggalkan template pasaran. Infrastruktur web berkecepatan sub-detik yang melipatgandakan konversi penjualan Anda."
      />
      <AEOServiceSchema
        serviceName="Website Mesin Konversi & Performa Tinggi"
        serviceDescription="Tinggalkan template pasaran. Infrastruktur web berkecepatan sub-detik yang melipatgandakan konversi penjualan Anda."
        serviceUrl="https://chestaa.com/services/website-mesin-konversi"
        category="High-Performance Web & Conversion Architecture"
        keyBenefits={["Load Speed < 0.8 Detik", "Skor SEO 100/100", "Anti-Downtime Server", "100% Kode Kustom"]}
      />

      {/* SECTION 1: THE EXECUTIVE HERO (ATTENTION - THE SPEED HOOK) */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-6 sm:px-12 py-24 overflow-hidden border-b border-white/10">
        {/* Animated Wireframe / Glowing Canvas Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.15, 0.3, 0.15]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-[160px]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] [background-size:48px_48px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 backdrop-blur-md text-emerald-400 text-xs font-mono uppercase tracking-wider shadow-lg"
          >
            <Zap size={13} className="text-emerald-400 animate-pulse" />
            <span>MESIN KONVERSI & PERFORMA TINGGI</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.08]"
          >
            Detik Berharga. Lambat Berarti Batal Beli. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-white">Ubah Website Anda Menjadi Mesin Konversi.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed"
          >
            Tinggalkan template pasaran yang berat. Kami merancang infrastruktur digital dengan kecepatan muat di bawah 0.8 detik untuk melipatgandakan konversi penjualan Anda.
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
              { label: 'Skor SEO', val: '100 / 100' },
              { label: 'Anti-Downtime Server', val: '99.99%' },
              { label: 'Kode Kustom', val: '100 Persen' }
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
              className="relative px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-sm sm:text-base tracking-wide shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:shadow-[0_0_60px_rgba(16,185,129,0.7)] transition-all flex items-center gap-3 cursor-pointer group"
            >
              <span>Audit Kecepatan Web Gue Sekarang</span>
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE BLEEDING REALITY (PAIN - TEMPLATE VS CUSTOM) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left Column (Dim Red tone) */}
          <div className="p-10 rounded-3xl bg-red-950/15 border border-red-500/20 backdrop-blur-xl flex flex-col justify-between space-y-6">
            <div className="inline-flex items-center gap-2 text-red-400 text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>Website Lama (Template Pasaran)</span>
            </div>
            <p className="text-xl sm:text-2xl text-red-200/90 font-medium leading-relaxed">
              Website Lama: Menggunakan template murahan. Ditumpuk puluhan plugin. Loading lebih dari 3 detik. Prospek kabur ke kompetitor sebelum halaman Anda terbuka.
            </p>
            <div className="text-xs text-red-400/70 font-mono">
              [Status: Pembakaran Anggaran Iklan & Kehilangan Klien]
            </div>
          </div>

          {/* Right Column (Vibrant Emerald/Purple tone) */}
          <div className="p-10 rounded-3xl bg-gradient-to-br from-emerald-950/40 to-purple-950/30 border border-emerald-500/30 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Mesin Konversi Chestaa</span>
            </div>
            <p className="text-xl sm:text-2xl text-white font-semibold leading-relaxed">
              Mesin Konversi Chestaa: Dibangun dari nol tanpa template. Bersih, brutal secara performa, dan merespons dalam hitungan milidetik. Prospek tidak punya waktu untuk ragu.
            </p>
            <div className="text-xs text-emerald-400 font-mono">
              [Status: Konversi Maksimal & Arus Kas Stabil]
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: LOCALIZED MICRO-PORTFOLIO (TRUST BUILDER) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0b0b0f]">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
            <span>Terminal Performa Real-Time</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl">
            Bukti Kinerja: Arsitektur Rumah-Tropis & TanyaSeo
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Jujurly, kecepatan sub-detik itu bukan teori. Cek langsung arsitektur rumah-tropis atau platform TanyaSeo yang kami bangun. Kita merakit mesin pencetak profit, bukan sekadar brosur digital.
          </p>
          <div className="p-8 sm:p-12 rounded-3xl bg-emerald-950/20 border border-emerald-500/30 backdrop-blur-2xl w-full max-w-3xl flex flex-col items-center space-y-4 shadow-2xl">
            <span className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Turun hingga 70 Persen
            </span>
            <span className="text-sm sm:text-base text-slate-300 font-medium tracking-wide">
              Bounce rate klien turun drastis hingga 70 persen berkat waktu muat instan.
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE AUTONOMOUS WORKFLOW (WORKFLOW) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto flex flex-col space-y-16">
          <div className="text-center space-y-4">
            <span className="text-emerald-400 text-xs font-mono uppercase tracking-wider">Metodologi Eksekusi</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              The Autonomous Workflow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Audit & Pemusnahan Kode', desc: 'Membuang semua sistem lama yang memperlambat arus kas Anda.' },
              { step: '02', title: 'Injeksi Arsitektur Baru', desc: 'Merakit mesin baru dengan teknologi Server-Side Rendering untuk kecepatan absolut.' },
              { step: '03', title: 'Peluncuran Otonom', desc: 'Website langsung aktif, tahan banting meskipun diserbu ribuan klik dari trafik iklan.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col space-y-4 relative"
              >
                <span className="text-4xl font-extrabold text-emerald-500/40 font-mono">{item.step}</span>
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
            <span className="text-emerald-400 text-xs font-mono uppercase tracking-wider">Infrastruktur Miliaran Rupiah</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-snug">
              Teknologi Skala Enterprise di Genggaman Anda
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Infrastruktur tingkat miliaran rupiah kini ada di tangan Anda. Kami menggunakan ekosistem teknologi mutakhir yang sama persis dengan yang dipakai oleh perusahaan Fortune 500 dan startup Unicorn global.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl flex flex-col items-center justify-center space-y-6 shadow-2xl">
            <div className="flex items-center gap-6">
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-emerald-300">Next.js 15</span>
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-teal-300">React Server Components</span>
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-white">Vercel Core</span>
            </div>
            <div className="text-xs text-slate-500 font-mono text-center">
              [Vault Keamanan & Performa Tanpa Kompromi]
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: THE ZERO-HOSTAGE GUARANTEE (SECURITY) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-xl">
            <ShieldCheck size={28} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            The Zero-Hostage Guarantee
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            100 Persen Kepemilikan Source Code. Tidak ada drama vendor lock-in. Setelah proyek selesai, seluruh aset digital, kode sumber, dan infrastruktur mutlak menjadi hak milik perusahaan Anda.
          </p>
        </div>
      </section>

      {/* SECTION 7: THE COST OF INACTION (URGENCY - THE 1-SECOND RULE) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#08080c]">
        <div className="max-w-4xl mx-auto p-10 sm:p-14 rounded-3xl bg-red-950/20 border border-red-500/30 backdrop-blur-2xl text-center space-y-6 shadow-2xl">
          <span className="text-red-400 text-xs font-mono uppercase tracking-widest">[Aturan 1-Detik Bisnis Digital]</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white leading-snug">
            Fakta bisnis: Setiap 1 detik penundaan loading website, Anda kehilangan 20 persen potensi penjualan. Menoleransi website lambat sama dengan membuang anggaran iklan digital Anda ke tempat sampah.
          </h2>
        </div>
      </section>

      {/* SECTION 8: THE ANTI-SAAS PRICING (VALUE) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0b0b0f]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block text-slate-500 text-lg sm:text-xl font-mono line-through decoration-red-500 decoration-2">
            Biaya Bulanan Hosting & Plugin Premium
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Investasi Satu Kali Untuk Profit Seumur Hidup
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Stop membayar sewa bulanan untuk platform yang tidak pernah Anda miliki. Chestaa menawarkan investasi satu kali untuk aset digital bertenaga tinggi yang memompa profit seumur hidup.
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
                <p className="text-xs text-emerald-400 font-mono">Founder & Principal System Architect</p>
              </div>
            </div>
            <p className="text-base text-slate-300 leading-relaxed italic">
              "Gue nggak bikin web sekadar cantik. Gue ngebangun infrastruktur yang secara matematis dirancang buat nyetak duit lebih cepat. Mari kita bedah sistem lo."
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Direct Founder Line • Aktif 24/7</span>
            </div>
          </div>

          {/* Right Column: AI Chat Trigger Area */}
          <div className="p-8 sm:p-10 rounded-3xl bg-emerald-950/20 border border-emerald-500/30 backdrop-blur-2xl flex flex-col space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono">
              <Sparkles size={14} className="text-emerald-400 animate-spin" />
              <span>AI Takeover & Audit Performa</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Simulasi & Audit Kecepatan Instan
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Jujurly, web lelet tuh literally ngebunuh konversi iklan lo. Mau gue bantu audit seberapa banyak duit yang bocor gara-gara web lama lo hari ini?
            </p>
            <Link
              to="/"
              onClick={() => {
                const chatLauncher = document.querySelector('[aria-label="Konsultasi Arsitektur"]') as HTMLButtonElement;
                if (chatLauncher) chatLauncher.click();
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm transition-all shadow-lg cursor-pointer"
            >
              <span>Mulai Audit Chat</span>
              <MessageSquare size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
