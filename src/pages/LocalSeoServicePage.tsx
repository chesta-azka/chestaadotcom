import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  MapPin, Zap, ShieldCheck, Lock, ArrowRight, 
  CheckCircle2, TrendingUp, Sparkles, Building2, Server,
  ChevronRight, Users, MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOMetadata from '../components/atoms/SEOMetadata';
import AEOServiceSchema from '../components/atoms/AEOServiceSchema';

export default function LocalSeoServicePage() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const aiSectionRef = useRef<HTMLDivElement>(null);
  const isAiSectionInView = useInView(aiSectionRef, { once: true, amount: 0.4 });

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
    <div className="relative w-full flex flex-col bg-[#0b0b0f] text-slate-100 overflow-x-hidden selection:bg-purple-600 selection:text-white font-sans">
      <SEOMetadata
        title="Jasa Pembuatan Website & SEO Lokal BSD Cisauk | Chestaa"
        description="Dominasi market BSD dan Cisauk dengan infrastruktur web kustom berkecepatan sub-detik yang merajai Google Maps."
      />
      <AEOServiceSchema
        serviceName="Jasa Pembuatan Website & SEO Lokal BSD Cisauk"
        serviceDescription="Dominasi market BSD dan Cisauk dengan infrastruktur web kustom berkecepatan sub-detik yang merajai Google Maps."
        serviceUrl="https://chestaa.com/services/jasa-pembuatan-website-bsd-cisauk"
        category="SEO Lokal & Website Kustom"
        keyBenefits={["Ranking 1 Area Lokal", "Load Speed < 0.8 Detik", "Integrasi Google Bisnis", "Trafik Organik Harian"]}
        faqs={[
          { q: "Kenapa harus fokus di BSD City?", a: "BSD itu rame banget bisnisnya. Kalo Anda ga muncul di Google, calon pelanggan yang punya uang bakal lari ke bisnis lain yang lebih kelihatan di internet." },
          { q: "Berapa lama sampe bisnis saya muncul di atas?", a: "Websitenya kita buat supaya Google cepet nangkep. Biasanya dalam 2-4 minggu Anda udah mulai liat bisnis Anda naik di hasil pencarian." }
        ]}
      />

      {/* SECTION 1: THE EXECUTIVE HERO (ATTENTION) */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-6 sm:px-12 py-24 overflow-hidden border-b border-white/10">
        {/* Animated Topographical Digital Map Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <motion.div 
            animate={{ 
              backgroundPosition: ['0px 0px', '100px 100px'],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-[radial-gradient(#9333ea_1px,transparent_1px)] [background-size:32px_32px]"
          />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-900/30 rounded-full blur-[140px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 backdrop-blur-md text-purple-400 text-xs font-mono uppercase tracking-wider shadow-lg"
          >
            <MapPin size={13} className="text-purple-400 animate-pulse" />
            <span>SEO LOKAL & WEBSITE KUSTOM • BSD & TANGERANG RAYA</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.08]"
          >
            Dominasi Market BSD & Cisauk. <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-white">Jangan Biarkan Kompetitor Mencuri Klien Lokal Anda.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed"
          >
            Infrastruktur web kustom berkecepatan sub-detik yang dirancang spesifik untuk menduduki peringkat nomor 1 Google Maps dan pencarian lokal.
          </motion.p>

          {/* 4 Core Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-6"
          >
            {[
              { label: 'Ranking 1 Area Lokal', val: 'Top #1 Maps' },
              { label: 'Load Speed', val: '< 0.8 Detik' },
              { label: 'Integrasi Google Bisnis', val: '100% Verified' },
              { label: 'Trafik Organik Harian', val: 'High-Intent' }
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
              className="relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm sm:text-base tracking-wide shadow-[0_0_40px_rgba(147,51,234,0.4)] hover:shadow-[0_0_60px_rgba(147,51,234,0.7)] transition-all flex items-center gap-3 cursor-pointer group"
            >
              <span>Cek Potensi Market Bisnis Gue</span>
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE BLEEDING REALITY (PAIN) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left Column (Dim Red tone) */}
          <div className="p-10 rounded-3xl bg-red-950/15 border border-red-500/20 backdrop-blur-xl flex flex-col justify-between space-y-6">
            <div className="inline-flex items-center gap-2 text-red-400 text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>Kenyataan Pahit Bisnis Lokal</span>
            </div>
            <p className="text-xl sm:text-2xl text-red-200/90 font-medium leading-relaxed">
              Klien di sebelah kantor Anda malah belanja ke kompetitor karena bisnis Anda tidak ditemukan di halaman pertama Google.
            </p>
            <div className="text-xs text-red-400/70 font-mono">
              [Status: Kehilangan 70% pangsa pasar lokal setiap hari]
            </div>
          </div>

          {/* Right Column (Vibrant Purple/Green tone) */}
          <div className="p-10 rounded-3xl bg-gradient-to-br from-purple-950/40 to-emerald-950/30 border border-purple-500/30 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-purple-400 text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Solusi Otonom Chestaa</span>
            </div>
            <p className="text-xl sm:text-2xl text-white font-semibold leading-relaxed">
              Sistem otonom kami mengunci nama bisnis Anda di puncak pencarian. Siapapun yang mencari jasa di BSD, Rumpin, dan Cisauk, nama Anda yang pertama kali muncul.
            </p>
            <div className="text-xs text-emerald-400 font-mono">
              [Status: Dominasi Mutlak Algoritma Google Lokal]
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: LOCALIZED MICRO-PORTFOLIO (TRUST BUILDER - DATA) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0b0b0f]">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
            <span>Studi Kasus & Ekosistem Lokal</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl">
            Arsitektur Rumah-Tropis & Ekosistem TanyaSeo
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Jujurly, kita bukan agensi luar kota yang nebak-nebak pasar. Kita paham algoritma pencarian warga BSD, Cisauk, Rumpin, dan Tangerang Raya.
          </p>
          <div className="p-8 sm:p-12 rounded-3xl bg-purple-950/20 border border-purple-500/30 backdrop-blur-2xl w-full max-w-3xl flex flex-col items-center space-y-4 shadow-2xl">
            <span className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">
              +300 Persen
            </span>
            <span className="text-sm sm:text-base text-slate-300 font-medium tracking-wide">
              Konversi prospek lokal naik 300 persen setelah mendominasi kata kunci wilayah.
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE LOCAL SEO ENGINE (WORKFLOW) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto flex flex-col space-y-16">
          <div className="text-center space-y-4">
            <span className="text-purple-400 text-xs font-mono uppercase tracking-wider">Alur Kerja Otonom</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              The Local SEO Engine
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Pemetaan Kata Kunci', desc: 'Riset mendalam area spesifik BSD, Cisauk, dan Serpong.' },
              { step: '02', title: 'Injeksi Vektor SEO', desc: 'Penanaman data ke dalam infrastruktur web berkecepatan tinggi.' },
              { step: '03', title: 'AI & Mesin Pencari', desc: 'Sistem otomatis mengarahkan klien langsung ke WhatsApp Anda 24/7.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col space-y-4 relative"
              >
                <span className="text-4xl font-extrabold text-purple-500/40 font-mono">{item.step}</span>
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
            <span className="text-purple-400 text-xs font-mono uppercase tracking-wider">Standar Perusahaan Unicorn</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-snug">
              Infrastruktur Kelas Dunia untuk Bisnis Lokal Anda
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Website lokal kompetitor Anda masih menggunakan template pasaran yang lambat. Kami membangun aset Anda menggunakan standar teknologi yang dipakai startup Unicorn. Loading instan, klien tidak akan lari.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl flex flex-col items-center justify-center space-y-6 shadow-2xl">
            <div className="flex items-center gap-6">
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-purple-300">Next.js 15</span>
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-indigo-300">Vercel Edge</span>
            </div>
            <div className="text-xs text-slate-500 font-mono text-center">
              [Penyimpanan Vektor AI & Enkripsi Standar Bank]
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: THE ZERO-HOSTAGE GUARANTEE (SECURITY) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-950/50 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-xl">
            <Lock size={28} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            The Zero-Hostage Guarantee
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            100 Persen Kepemilikan Aset Digital. Tidak ada biaya langganan bulanan pihak ketiga yang mencekik. Website, domain, dan seluruh database mutlak menjadi milik Anda sejak hari pertama serah terima.
          </p>
        </div>
      </section>

      {/* SECTION 7: THE COST OF INACTION (URGENCY) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#08080c]">
        <div className="max-w-4xl mx-auto p-10 sm:p-14 rounded-3xl bg-red-950/20 border border-red-500/30 backdrop-blur-2xl text-center space-y-6 shadow-2xl">
          <span className="text-red-400 text-xs font-mono uppercase tracking-widest">[Peringatan Kehilangan Pendapatan]</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white leading-snug">
            Setiap hari Anda menunda, ribuan pencarian lokal lari ke kompetitor. Anda secara harfiah membiarkan puluhan juta rupiah dari pasar Tangerang lewat begitu saja di depan mata.
          </h2>
        </div>
      </section>

      {/* SECTION 8: THE ANTI-SAAS PRICING (VALUE) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0b0b0f]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block text-slate-500 text-lg sm:text-xl font-mono line-through decoration-red-500 decoration-2">
            Sewa Agensi SEO Bulanan
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Investasi Satu Kali (One-Time Investment)
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Chestaa adalah investasi satu kali. Kami membangun arsitektur digital kustom yang akan terus menarik klien lokal selama bertahun-tahun tanpa biaya siluman.
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
                <p className="text-xs text-purple-400 font-mono">Founder & Principal System Architect</p>
              </div>
            </div>
            <p className="text-base text-slate-300 leading-relaxed italic">
              "Gue ngebangun ekosistem digital ini khusus buat lo yang mau merajai market Tangerang. Mari bahas strateginya sekarang."
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Direct Founder Line • Aktif 24/7</span>
            </div>
          </div>

          {/* Right Column: AI Chat Trigger Area */}
          <div className="p-8 sm:p-10 rounded-3xl bg-purple-950/20 border border-purple-500/30 backdrop-blur-2xl flex flex-col space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-purple-400 text-xs font-mono">
              <Sparkles size={14} className="text-purple-400 animate-spin" />
              <span>AI Takeover & Simulasi Pasar</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Cek Prospek Wilayah BSD & Rumpin
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Jujurly, market BSD dan Rumpin lagi gede banget nih. Mau gue hitungin estimasi prospek yang bisa lo dapetin bulan ini?
            </p>
            <Link
              to="/"
              onClick={() => {
                // Open global chat widget if present
                const chatLauncher = document.querySelector('[aria-label="Konsultasi Arsitektur"]') as HTMLButtonElement;
                if (chatLauncher) chatLauncher.click();
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition-all shadow-lg cursor-pointer"
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
