import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Cpu, ShieldCheck, Lock, ArrowRight, 
  CheckCircle2, Sparkles, Server, Briefcase,
  MessageSquare, Clock, Globe, Target, Terminal
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOMetadata from '../components/atoms/SEOMetadata';
import AEOServiceSchema from '../components/atoms/AEOServiceSchema';

export default function FractionalCtoServicePage() {
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
    <div className="relative w-full flex flex-col bg-[#0b0b0f] text-slate-100 overflow-x-hidden selection:bg-amber-600 selection:text-white font-sans">
      <SEOMetadata
        title="Kemitraan CTO & Penyelamatan Arsitektur (Fractional CTO) | Chestaa"
        description="Vendor lama kabur atau proyek IT mangkrak? Kami ambil alih kepemilikan teknologi, bersihkan spaghetti code, dan pimpin transformasi digital Anda."
        image="https://picsum.photos/seed/fractionalcto/1200/630"
        type="website"
      />
      <AEOServiceSchema
        serviceName="Kemitraan CTO & Penyelamatan Arsitektur (Fractional CTO)"
        serviceDescription="Layanan eksekutif Fractional CTO untuk audit forensik kode, penyelamatan proyek IT mangkrak, dan kepemimpinan teknologi tingkat C."
        serviceUrl="https://chestaa.com/services/konsultasi-cto-eksekutif"
        category="Fractional CTO & Tech Rescue Architecture"
        keyBenefits={["Audit Kode Forensik", "Penyelamatan Proyek Mangkrak", "Kepemimpinan IT Level-C", "Skalabilitas Kode Kustom"]}
        entities={["CHESTAADOTCOM", "Fractional CTO", "Tech Rescue", "Architecture Audit"]}
        mentions={["Next.js 15", "GitHub", "AWS", "Google Cloud"]}
      />

      {/* SECTION 1: THE EXECUTIVE HERO (ATTENTION - THE RESCUE HOOK) */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-6 sm:px-12 py-24 overflow-hidden border-b border-white/10">
        {/* Chaotic Web Aligned into Blue Enterprise Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.08, 1],
              opacity: [0.15, 0.35, 0.15]
            }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-amber-500/20 rounded-full blur-[160px]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:44px_44px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/30 backdrop-blur-md text-amber-400 text-xs font-mono uppercase tracking-wider shadow-lg"
          >
            <Terminal size={13} className="text-amber-400 animate-pulse" />
            <span>FRACTIONAL CTO & TECH RESCUE ARCHITECTURE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.08]"
          >
            Vendor Lama Kabur? Proyek IT Mangkrak? <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-white">Kami Ambil Alih dan Selesaikan.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed"
          >
            Berhenti membuang uang untuk tim IT yang tidak kompeten. Kami masuk sebagai Chief Technology Officer (CTO) eksekutif Anda, membersihkan kode berantakan, dan memimpin transformasi digital bisnis Anda.
          </motion.p>

          {/* 4 Core Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-6"
          >
            {[
              { label: 'Audit Kode', val: 'Forensik Menyeluruh' },
              { label: 'Proyek Mangkrak', val: 'Penyelamatan Total' },
              { label: 'Kepemimpinan IT', val: 'Level-C Eksekutif' },
              { label: 'Skalabilitas', val: 'Arsitektur Kustom' }
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
              className="relative px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-bold text-sm sm:text-base tracking-wide shadow-[0_0_40px_rgba(245,158,11,0.4)] hover:shadow-[0_0_60px_rgba(245,158,11,0.7)] transition-all flex items-center gap-3 cursor-pointer group"
            >
              <span>Audit Kekacauan IT Gue Sekarang</span>
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE BLEEDING REALITY (PAIN - FAILED VENDORS VS ELITE ARCHITECTS) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left Column (Dim Red tone) */}
          <div className="p-10 rounded-3xl bg-red-950/15 border border-red-500/20 backdrop-blur-xl flex flex-col justify-between space-y-6">
            <div className="inline-flex items-center gap-2 text-red-400 text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>Tragedi IT Korporat</span>
            </div>
            <p className="text-xl sm:text-2xl text-red-200/90 font-medium leading-relaxed">
              Tragedi IT Korporat: Vendor lepas tangan setelah dibayar. Kode tidak bisa dibaca (Spaghetti Code). Bug muncul setiap hari, dan manajemen tidak punya sosok pemimpin teknologi untuk mengambil keputusan strategis.
            </p>
            <div className="text-xs text-red-400/70 font-mono">
              [Status: Vendor Kabur & Sistem Mangkrak Total]
            </div>
          </div>

          {/* Right Column (Vibrant Amber/Purple tone) */}
          <div className="p-10 rounded-3xl bg-gradient-to-br from-amber-950/40 to-purple-950/30 border border-amber-500/30 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Intervensi Chestaa</span>
            </div>
            <p className="text-xl sm:text-2xl text-white font-semibold leading-relaxed">
              Intervensi Chestaa: Kami membedah arsitektur lama Anda, membuang kode sampah, dan membangun ulang fondasi dengan standar Silicon Valley. Operasional bisnis Anda kembali bernapas dalam hitungan minggu.
            </p>
            <div className="text-xs text-amber-400 font-mono">
              [Status: Arsitektur Pulih & Kepemimpinan Eksekutif]
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: LOCALIZED MICRO-PORTFOLIO (TRUST BUILDER) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0b0b0f]">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
            <span>Forensik Kode & Ekosistem Skala Besar</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl">
            Pengalaman Menyelamatkan Proyek Korporat Kompleks
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Jujurly, kami sudah terbiasa membereskan kekacauan arsitektur di wilayah Tangerang, BSD, hingga Rumpin. Proyek rumit seperti ekosistem rumah-tropis adalah bukti kendali mutlak kami atas arsitektur data berskala besar.
          </p>
          <div className="p-8 sm:p-12 rounded-3xl bg-amber-950/20 border border-amber-500/30 backdrop-blur-2xl w-full max-w-3xl flex flex-col items-center space-y-4 shadow-2xl">
            <span className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
              100 Persen Diselamatkan
            </span>
            <span className="text-sm sm:text-base text-slate-300 font-medium tracking-wide">
              Berhasil menyelamatkan 100 Persen proyek klien yang sebelumnya divonis gagal total oleh vendor lain.
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE AUTONOMOUS WORKFLOW (WORKFLOW) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto flex flex-col space-y-16">
          <div className="text-center space-y-4">
            <span className="text-amber-400 text-xs font-mono uppercase tracking-wider">Mekanisme Penyelamatan Teknologi</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              The Autonomous Workflow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Forensik & Triage Arsitektur', desc: 'Kami menghentikan pendarahan sistem. Menganalisis source code lama untuk menemukan akar masalah dan lubang keamanan kritis.' },
              { step: '02', title: 'Restrukturisasi Brutal', desc: 'Menulis ulang logika sistem yang cacat dan memigrasikannya ke infrastruktur Next.js 15 berkecepatan tinggi.' },
              { step: '03', title: 'Kepemimpinan Strategis (Fractional CTO)', desc: 'Kami memandu arah teknologi perusahaan Anda, mewawancarai developer baru untuk Anda, dan memastikan roadmap IT sejalan dengan target profit.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col space-y-4 relative"
              >
                <span className="text-4xl font-extrabold text-amber-500/40 font-mono">{item.step}</span>
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
            <span className="text-amber-400 text-xs font-mono uppercase tracking-wider">Presisi Matematis Arsitektur Sistem</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-snug">
              Otak Arsitek Sistem Elit di Sisi Anda
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Anda tidak menyewa programmer biasa. Anda mendapatkan otak arsitek sistem elit yang merancang infrastruktur dengan presisi matematis, memastikan bisnis Anda siap menampung jutaan transaksi.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl flex flex-col items-center justify-center space-y-6 shadow-2xl">
            <div className="flex items-center gap-6">
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-amber-300">Architecture Blueprints</span>
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-yellow-300">GitHub Enterprise</span>
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-white">Next.js 15</span>
            </div>
            <div className="text-xs text-slate-500 font-mono text-center">
              [C-Level Leadership & Clean Code Standards]
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: THE ZERO-HOSTAGE GUARANTEE (SECURITY) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-950/50 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-xl">
            <ShieldCheck size={28} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            The Zero-Hostage Guarantee
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Integritas Eksekutif. Tidak ada lagi kode yang disandera vendor. Kami mendokumentasikan setiap baris kode dan mengembalikan 100 persen hak kepemilikan Intelektual (IP) ke dalam brankas perusahaan Anda.
          </p>
        </div>
      </section>

      {/* SECTION 7: THE COST OF INACTION (URGENCY) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#08080c]">
        <div className="max-w-4xl mx-auto p-10 sm:p-14 rounded-3xl bg-red-950/20 border border-red-500/30 backdrop-blur-2xl text-center space-y-6 shadow-2xl">
          <span className="text-red-400 text-xs font-mono uppercase tracking-widest">[Bom Waktu Kode Cacat]</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white leading-snug">
            Setiap bulan Anda mempertahankan sistem yang cacat, Anda sedang menunggu bom waktu meledak. Proyek mangkrak tidak hanya menguras uang, tapi juga menghancurkan moral tim dan kepercayaan pelanggan.
          </h2>
        </div>
      </section>

      {/* SECTION 8: THE ANTI-SAAS PRICING (VALUE) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0b0b0f]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block text-slate-500 text-lg sm:text-xl font-mono line-through decoration-red-500 decoration-2">
            Gaji CTO Full-Time (Rp 50.000.000/Bulan)
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Kepemimpinan Teknologi Elit Tanpa Gaji Eksekutif Penuh
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Anda tidak perlu menggaji CTO secara penuh waktu. Melalui sistem Fractional CTO Chestaa, Anda mendapatkan kapasitas kepemimpinan teknologi tingkat elit dengan nilai investasi yang sangat masuk akal untuk arus kas korporat.
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
                <p className="text-xs text-amber-400 font-mono">Founder & Principal System Architect</p>
              </div>
            </div>
            <p className="text-base text-slate-300 leading-relaxed italic">
              "Gue paling benci ngeliat pengusaha ditipu sama vendor IT abal-abal. Sini serahin kode lo yang berantakan itu, biar gue dan tim yang beresin sampai tuntas."
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Direct Founder Line • Aktif 24/7</span>
            </div>
          </div>

          {/* Right Column: AI Chat Trigger Area */}
          <div className="p-8 sm:p-10 rounded-3xl bg-amber-950/20 border border-amber-500/30 backdrop-blur-2xl flex flex-col space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-mono">
              <Sparkles size={14} className="text-amber-400 animate-spin" />
              <span>AI Takeover & Sesi Forensik Kode</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Simulasi Jadwal Forensik Kode
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Jujurly, nahan proyek IT yang mangkrak tuh literally bakar duit operasional tiap hari. [SPLIT] Lo mau gue jadwalkan sesi forensik kode rahasia bareng Founder kita sekarang?
            </p>
            <Link
              to="/"
              onClick={() => {
                const chatLauncher = document.querySelector('[aria-label="Konsultasi Arsitektur"]') as HTMLButtonElement;
                if (chatLauncher) chatLauncher.click();
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm transition-all shadow-lg cursor-pointer"
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
