import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  ShieldCheck, Lock, ArrowRight, 
  CheckCircle2, TrendingUp, Sparkles, Server,
  Cpu, MessageSquare, Clock, Globe, Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOMetadata from '../components/atoms/SEOMetadata';

export default function CybersecurityServicePage() {
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
    <div className="relative w-full flex flex-col bg-[#0b0b0f] text-slate-100 overflow-x-hidden selection:bg-red-600 selection:text-white font-sans">
      <SEOMetadata
        title="Benteng Keamanan Data Korporat & Enkripsi | Chestaa"
        description="Satu kebocoran data bisa menghancurkan valuasi bisnis Anda. Lakukan penetration test dan enkripsi standar perbankan sekarang."
      />

      {/* SECTION 1: THE EXECUTIVE HERO (ATTENTION - THE FEAR HOOK) */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-6 sm:px-12 py-24 overflow-hidden border-b border-white/10">
        {/* Glowing Impenetrable Digital Shield Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.07, 1],
              opacity: [0.15, 0.35, 0.15]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-red-500/20 rounded-full blur-[160px]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:44px_44px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/80 border border-red-500/30 backdrop-blur-md text-red-500 text-xs font-mono uppercase tracking-wider shadow-lg"
          >
            <Shield size={13} className="text-red-500 animate-pulse" />
            <span>KEAMANAN SIBER & ENKRIPSI KORPORAT</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.08]"
          >
            Satu Kebocoran Data Bisa Menghancurkan Valuasi Bisnis Anda Selamanya. <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-white">Jangan Tunggu Sampai Diretas.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed"
          >
            Kami melakukan simulasi serangan (Penetration Test) dan membangun sistem enkripsi standar perbankan untuk mengunci rapat aset digital perusahaan Anda.
          </motion.p>

          {/* 4 Core Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-6"
          >
            {[
              { label: 'Standar Enkripsi', val: 'Standar Bank' },
              { label: 'Audit Celah', val: '100% Total' },
              { label: 'Blokir Ancaman', val: 'Otonom Milidetik' },
              { label: 'Anti-Ransomware', val: 'Kebal Mutlak' }
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
              className="relative px-8 py-4 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-sm sm:text-base tracking-wide shadow-[0_0_40px_rgba(239,68,68,0.4)] hover:shadow-[0_0_60px_rgba(239,68,68,0.7)] transition-all flex items-center gap-3 cursor-pointer group"
            >
              <span>Audit Celah Keamanan Gue Sekarang</span>
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE BLEEDING REALITY (PAIN - EXPOSED VS SECURED) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left Column (Dim Red tone) */}
          <div className="p-10 rounded-3xl bg-red-950/15 border border-red-500/20 backdrop-blur-xl flex flex-col justify-between space-y-6">
            <div className="inline-flex items-center gap-2 text-red-400 text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>Sistem Rentan (Tanpa Proteksi)</span>
            </div>
            <p className="text-xl sm:text-2xl text-red-200/90 font-medium leading-relaxed">
              Sistem Rentan: Data pelanggan dan arus kas Anda terbuka lebar. Sekali terkena Ransomware, operasional bisnis lumpuh total. Anda menghadapi pemerasan miliaran rupiah dan kehilangan kepercayaan klien.
            </p>
            <div className="text-xs text-red-400/70 font-mono">
              [Status: Target Empuk Peretas & Risiko Hukum]
            </div>
          </div>

          {/* Right Column (Vibrant Emerald/Purple tone) */}
          <div className="p-10 rounded-3xl bg-gradient-to-br from-emerald-950/40 to-purple-950/30 border border-emerald-500/30 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Benteng Chestaa</span>
            </div>
            <p className="text-xl sm:text-2xl text-white font-semibold leading-relaxed">
              Benteng Chestaa: Data dienkripsi secara real-time. Setiap anomali atau percobaan akses ilegal langsung diblokir secara otonom dalam hitungan milidetik. Bisnis Anda kebal dari manipulasi.
            </p>
            <div className="text-xs text-emerald-400 font-mono">
              [Status: Kebal Siber & Enkripsi Standar Bank]
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: LOCALIZED MICRO-PORTFOLIO (TRUST BUILDER) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0b0b0f]">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
            <span>Simulasi Serangan Legal (Ethical Hacking)</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl">
            Kami Menyerang Sistem Anda Sebelum Peretas Asli Menemukannya
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Jujurly, kita nggak cuma pasang sistem terus ditinggal. Kita menyerang sistem Anda duluan secara legal (Ethical Hacking) untuk menemukan titik lemah, sebelum peretas sungguhan menemukannya.
          </p>
          <div className="p-8 sm:p-12 rounded-3xl bg-red-950/20 border border-red-500/30 backdrop-blur-2xl w-full max-w-3xl flex flex-col items-center space-y-4 shadow-2xl">
            <span className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">
              100 Persen Sukses
            </span>
            <span className="text-sm sm:text-base text-slate-300 font-medium tracking-wide">
              100 Persen serangan siber berbahaya berhasil digagalkan sebelum menyentuh lapisan database klien.
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE AUTONOMOUS WORKFLOW (WORKFLOW) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto flex flex-col space-y-16">
          <div className="text-center space-y-4">
            <span className="text-red-500 text-xs font-mono uppercase tracking-wider">Protokol Pertahanan Siber</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              The Autonomous Workflow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Penetration Testing', desc: 'Kami melakukan simulasi serangan brutal untuk membedah setiap celah di aplikasi dan server Anda.' },
              { step: '02', title: 'Patching & Enkripsi AES-256', desc: 'Kami menutup lubang keamanan dan membungkus data Anda dengan protokol enkripsi tingkat militer.' },
              { step: '03', title: 'Monitoring Otonom', desc: 'AI kami berjaga 24/7, mendeteksi dan memblokir ribuan ancaman secara otomatis tanpa perlu Anda pantau.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col space-y-4 relative"
              >
                <span className="text-4xl font-extrabold text-red-500/40 font-mono">{item.step}</span>
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
            <span className="text-red-500 text-xs font-mono uppercase tracking-wider">Lapis Baja Digital Perbankan</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-snug">
              Proteksi Standar Industri Fintech Global
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Sistem Anda dilindungi oleh lapis baja digital. Kami mengonfigurasi Web Application Firewall (WAF) dan otentikasi multi-faktor yang persis digunakan oleh industri perbankan dan fintech global.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl flex flex-col items-center justify-center space-y-6 shadow-2xl">
            <div className="flex items-center gap-6">
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-red-400">Cloudflare WAF</span>
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-rose-300">AWS Shield</span>
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-white">JWT Auth</span>
            </div>
            <div className="text-xs text-slate-500 font-mono text-center">
              [Firewall Tingkat Militer & Enkripsi Total]
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: THE ZERO-HOSTAGE GUARANTEE (SECURITY) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-950/50 border border-red-500/30 flex items-center justify-center text-red-500 shadow-xl">
            <ShieldCheck size={28} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            The Zero-Hostage Guarantee
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Transparansi Mutlak & Kunci Di Tangan Anda. Setelah audit dan penambalan selesai, kami menyerahkan seluruh laporan teknis, arsitektur keamanan, dan kunci enkripsi utama secara eksklusif ke tangan manajemen Anda.
          </p>
        </div>
      </section>

      {/* SECTION 7: THE COST OF INACTION (URGENCY) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#08080c]">
        <div className="max-w-4xl mx-auto p-10 sm:p-14 rounded-3xl bg-red-950/20 border border-red-500/30 backdrop-blur-2xl text-center space-y-6 shadow-2xl">
          <span className="text-red-400 text-xs font-mono uppercase tracking-widest">[Risiko Perjudian Valuasi]</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white leading-snug">
            Hitung risikonya: Membayar tebusan hacker bisa memakan biaya ratusan juta hingga miliaran rupiah, belum termasuk tuntutan hukum dari klien Anda. Menunda audit keamanan adalah perjudian yang terlalu mahal.
          </h2>
        </div>
      </section>

      {/* SECTION 8: THE ANTI-SAAS PRICING (VALUE) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0b0b0f]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block text-slate-500 text-lg sm:text-xl font-mono line-through decoration-red-500 decoration-2">
            Biaya Pemulihan Data / Ransomware (Miliaran Rupiah)
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Mencegah Jauh Lebih Murah Daripada Hancur
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Mencegah jauh lebih murah daripada hancur. Chestaa memberikan investasi satu kali untuk audit dan arsitektur pertahanan yang akan menyelamatkan nyawa bisnis Anda secara permanen.
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
                <p className="text-xs text-red-500 font-mono">Founder & Principal System Architect</p>
              </div>
            </div>
            <p className="text-base text-slate-300 leading-relaxed italic">
              "Gue paling ngeri denger cerita klien yang datanya disandera gara-gara sistemnya rapuh. Sini, biarin tim gue yang ngunci rapat infrastruktur lo."
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>Direct Founder Line • Aktif 24/7</span>
            </div>
          </div>

          {/* Right Column: AI Chat Trigger Area */}
          <div className="p-8 sm:p-10 rounded-3xl bg-red-950/20 border border-red-500/30 backdrop-blur-2xl flex flex-col space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-red-500 text-xs font-mono">
              <Sparkles size={14} className="text-red-500 animate-spin" />
              <span>AI Takeover & Jadwal Audit Celah</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Simulasi & Penjadwalan Audit Pertahanan
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Jujurly, 90 persen website bisnis lokal tuh gampang banget dijebol. [SPLIT] Mau gue bantu jadwalkan audit pertahanan buat sistem lo sebelum keduluan hacker?
            </p>
            <Link
              to="/"
              onClick={() => {
                const chatLauncher = document.querySelector('[aria-label="Konsultasi Arsitektur"]') as HTMLButtonElement;
                if (chatLauncher) chatLauncher.click();
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-all shadow-lg cursor-pointer"
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
