import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Server, ShieldCheck, Lock, ArrowRight, 
  CheckCircle2, TrendingUp, Sparkles, Database,
  Cpu, MessageSquare, Clock, Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOMetadata from '../components/atoms/SEOMetadata';

export default function EnterpriseInfrastructureServicePage() {
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
    <div className="relative w-full flex flex-col bg-[#0b0b0f] text-slate-100 overflow-x-hidden selection:bg-blue-600 selection:text-white font-sans">
      <SEOMetadata
        title="Infrastruktur Digital Terpusat & Enterprise System | Chestaa"
        description="Selamatkan bisnis Anda dari kekacauan data. Satukan seluruh operasional perusahaan dalam satu dasbor aman dan otonom."
      />

      {/* SECTION 1: THE EXECUTIVE HERO (ATTENTION - THE CHAOS HOOK) */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-6 sm:px-12 py-24 overflow-hidden border-b border-white/10">
        {/* Scattered Data Points Pulling Together Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.07, 1],
              opacity: [0.15, 0.35, 0.15]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-blue-500/20 rounded-full blur-[160px]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f615_1px,transparent_1px),linear-gradient(to_bottom,#3b82f615_1px,transparent_1px)] [background-size:48px_48px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 backdrop-blur-md text-blue-400 text-xs font-mono uppercase tracking-wider shadow-lg"
          >
            <Server size={13} className="text-blue-400 animate-pulse" />
            <span>SISTEM KORPORAT & INTEGRASI DATA</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.08]"
          >
            Selamatkan Bisnis Anda dari Kekacauan Data. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-white">Saatnya Beralih ke Sistem Terpusat.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed"
          >
            Berhenti menggunakan puluhan aplikasi yang tidak saling terhubung. Kami membangun infrastruktur digital kustom yang menyatukan seluruh operasional perusahaan Anda dalam satu dasbor aman dan otonom.
          </motion.p>

          {/* 4 Core Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-6"
          >
            {[
              { label: 'Dasbor Manajemen', val: '1 Terpusat' },
              { label: 'Standar Keamanan', val: 'Tingkat Bank' },
              { label: 'Sinkronisasi Data', val: 'Real-Time' },
              { label: 'Efisiensi Biaya', val: 'Hapus SaaS Lain' }
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
              className="relative px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm sm:text-base tracking-wide shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:shadow-[0_0_60px_rgba(59,130,246,0.7)] transition-all flex items-center gap-3 cursor-pointer group"
            >
              <span>Audit Arsitektur Data Gue</span>
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE BLEEDING REALITY (PAIN - SCATTERED VS UNIFIED) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left Column (Dim Red tone) */}
          <div className="p-10 rounded-3xl bg-red-950/15 border border-red-500/20 backdrop-blur-xl flex flex-col justify-between space-y-6">
            <div className="inline-flex items-center gap-2 text-red-400 text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>Operasional Lama (Terpencar)</span>
            </div>
            <p className="text-xl sm:text-2xl text-red-200/90 font-medium leading-relaxed">
              Operasional Lama: Data penjualan di Excel, absensi di mesin fingerprint, laporan di WhatsApp. Sinkronisasi lambat, rentan penipuan internal, dan eksekutif tidak bisa melihat metrik real-time.
            </p>
            <div className="text-xs text-red-400/70 font-mono">
              [Status: Buta Informasi & Risiko Kebocoran Internal]
            </div>
          </div>

          {/* Right Column (Vibrant Blue/Purple tone) */}
          <div className="p-10 rounded-3xl bg-gradient-to-br from-blue-950/40 to-purple-950/30 border border-blue-500/30 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>Infrastruktur Chestaa</span>
            </div>
            <p className="text-xl sm:text-2xl text-white font-semibold leading-relaxed">
              Infrastruktur Chestaa: Semua divisi terhubung seketika. Data mengalir murni tanpa campur tangan manusia. Keputusan bisnis diambil berdasarkan angka yang presisi di detik yang sama.
            </p>
            <div className="text-xs text-blue-400 font-mono">
              [Status: Kendali Penuh & Transparansi Absolut]
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: LOCALIZED MICRO-PORTFOLIO (TRUST BUILDER) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0b0b0f]">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
            <span>Blueprint Ekosistem Manajemen</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl">
            Pensiunkan Google Sheets yang Rawan Manipulasi
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Jujurly, mengelola data perusahaan dengan Google Sheets itu bom waktu. Kami membangun arsitektur data berskala besar seperti yang kami terapkan pada blueprint ekosistem manajemen terpusat.
          </p>
          <div className="p-8 sm:p-12 rounded-3xl bg-blue-950/20 border border-blue-500/30 backdrop-blur-2xl w-full max-w-3xl flex flex-col items-center space-y-4 shadow-2xl">
            <span className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              Hingga 80 Persen
            </span>
            <span className="text-sm sm:text-base text-slate-300 font-medium tracking-wide">
              Efisiensi operasional manajemen meningkat hingga 80 persen setelah migrasi ke dasbor tunggal.
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE AUTONOMOUS WORKFLOW (WORKFLOW) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto flex flex-col space-y-16">
          <div className="text-center space-y-4">
            <span className="text-blue-400 text-xs font-mono uppercase tracking-wider">Alur Integrasi Korporat</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              The Autonomous Workflow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Audit & Ekstraksi Data', desc: 'Kami menarik seluruh data lama Anda dari Excel dan aplikasi pihak ketiga dengan aman.' },
              { step: '02', title: 'Injeksi Microservices', desc: 'Merancang arsitektur event-driven yang menghubungkan divisi HR, Keuangan, dan Penjualan tanpa bentrok.' },
              { step: '03', title: 'Peluncuran Dasbor Eksekutif', desc: 'Anda mendapatkan akses God Mode untuk memantau seluruh detak jantung perusahaan dari satu layar.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col space-y-4 relative"
              >
                <span className="text-4xl font-extrabold text-blue-500/40 font-mono">{item.step}</span>
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
            <span className="text-blue-400 text-xs font-mono uppercase tracking-wider">Standar Keamanan Google Cloud</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-snug">
              Infrastruktur Kebal Manipulasi Internal
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Sistem Anda dilindungi oleh arsitektur server yang sama dengan Google. Kami menerapkan enkripsi end-to-end, memastikan kebocoran data klien atau manipulasi internal tidak mungkin terjadi.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl flex flex-col items-center justify-center space-y-6 shadow-2xl">
            <div className="flex items-center gap-6">
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-blue-300">Google Cloud</span>
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-indigo-300">Firebase Enterprise</span>
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-white">Next.js 15</span>
            </div>
            <div className="text-xs text-slate-500 font-mono text-center">
              [Enkripsi End-to-End & Audit Trail Otomatis]
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: THE ZERO-HOSTAGE GUARANTEE (SECURITY) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-950/50 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-xl">
            <Lock size={28} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            The Zero-Hostage Guarantee
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Kerahasiaan Tingkat Militer & Hak Milik Mutlak. Seluruh data perusahaan, infrastruktur server, dan kode sumber menjadi aset tertutup milik Anda sepenuhnya. Kami membangun, Anda yang mengendalikan.
          </p>
        </div>
      </section>

      {/* SECTION 7: THE COST OF INACTION (URGENCY) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#08080c]">
        <div className="max-w-4xl mx-auto p-10 sm:p-14 rounded-3xl bg-red-950/20 border border-red-500/30 backdrop-blur-2xl text-center space-y-6 shadow-2xl">
          <span className="text-red-400 text-xs font-mono uppercase tracking-widest">[Risiko Kelalaian Manual]</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white leading-snug">
            Setiap hari Anda membiarkan operasional berjalan secara manual, Anda membuka celah untuk manipulasi data, kelalaian karyawan, dan kebocoran arus kas yang tidak terlacak oleh manajemen.
          </h2>
        </div>
      </section>

      {/* SECTION 8: THE ANTI-SAAS PRICING (VALUE) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0b0b0f]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block text-slate-500 text-lg sm:text-xl font-mono line-through decoration-red-500 decoration-2">
            Biaya Langganan Bulanan ERP, CRM, & HRIS
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Investasi Sekali Untuk Konsolidasi Total Seumur Hidup
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Konsolidasikan pengeluaran Anda. Berhenti membayar puluhan biaya langganan aplikasi tiap bulan. Chestaa membangun sistem tunggal kustom dengan investasi satu kali untuk skalabilitas tanpa batas.
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
                <p className="text-xs text-blue-400 font-mono">Founder & Principal System Architect</p>
              </div>
            </div>
            <p className="text-base text-slate-300 leading-relaxed italic">
              "Gue paham banget rasanya pusing ngeliat laporan beda-beda dari tiap divisi. Sini gue rancangin arsitektur pusat biar lo bisa pantau perusahaan sambil ngopi."
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              <span>Direct Founder Line • Aktif 24/7</span>
            </div>
          </div>

          {/* Right Column: AI Chat Trigger Area */}
          <div className="p-8 sm:p-10 rounded-3xl bg-blue-950/20 border border-blue-500/30 backdrop-blur-2xl flex flex-col space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-mono">
              <Sparkles size={14} className="text-blue-400 animate-spin" />
              <span>AI Takeover & Simulasi Konsolidasi</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Simulasi Konsolidasi Dasbor Terpusat
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Jujurly, ngecek laporan dari 5 aplikasi berbeda tiap hari tuh literally ngabisin waktu lo sebagai eksekutif. [SPLIT] Mau gue simulasiin gimana dasbor terpusat kita bisa beresin masalah ini?
            </p>
            <Link
              to="/"
              onClick={() => {
                const chatLauncher = document.querySelector('[aria-label="Konsultasi Arsitektur"]') as HTMLButtonElement;
                if (chatLauncher) chatLauncher.click();
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-lg cursor-pointer"
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
