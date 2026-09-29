import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Cloud, ShieldCheck, Lock, ArrowRight, 
  CheckCircle2, TrendingUp, Sparkles, Server,
  Cpu, MessageSquare, Clock, Globe, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOMetadata from '../components/atoms/SEOMetadata';

export default function CloudAntiDownServicePage() {
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
    <div className="relative w-full flex flex-col bg-[#0b0b0f] text-slate-100 overflow-x-hidden selection:bg-teal-600 selection:text-white font-sans">
      <SEOMetadata
        title="Infrastruktur Cloud Anti-Down & Auto-Scaling | Chestaa"
        description="Server down saat banjir orderan? Arsitektur cloud server otonom yang otomatis membesar saat trafik membludak."
      />

      {/* SECTION 1: THE EXECUTIVE HERO (ATTENTION - THE TRAFFIC HOOK) */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-6 sm:px-12 py-24 overflow-hidden border-b border-white/10">
        {/* Glowing Server Nodes Auto-Scaling Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.08, 1],
              opacity: [0.15, 0.35, 0.15]
            }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-teal-500/20 rounded-full blur-[160px]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:44px_44px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-950/80 border border-teal-500/30 backdrop-blur-md text-teal-400 text-xs font-mono uppercase tracking-wider shadow-lg"
          >
            <Cloud size={13} className="text-teal-400 animate-pulse" />
            <span>CLOUD SERVER & UPTIME 99.99%</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.08]"
          >
            Server Down Saat Banjir Orderan? <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-white">Berhenti Membakar Uang Iklan Anda.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed"
          >
            Tinggalkan shared hosting murahan yang sering mati. Kami merancang arsitektur cloud server yang otomatis membesar saat trafik membludak, memastikan website Anda selalu hidup 24/7.
          </motion.p>

          {/* 4 Core Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-6"
          >
            {[
              { label: 'Uptime Sistem', val: '99.99 Persen' },
              { label: 'Auto-Scaling', val: 'Pintar & Cepat' },
              { label: 'Error 502', val: 'Bebas Total' },
              { label: 'Kecepatan', val: 'Konsisten' }
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
              className="relative px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 text-slate-950 font-bold text-sm sm:text-base tracking-wide shadow-[0_0_40px_rgba(20,184,166,0.4)] hover:shadow-[0_0_60px_rgba(20,184,166,0.7)] transition-all flex items-center gap-3 cursor-pointer group"
            >
              <span>Amankan Server Bisnis Gue</span>
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE BLEEDING REALITY (PAIN - SHARED VS CLOUD) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left Column (Dim Red tone) */}
          <div className="p-10 rounded-3xl bg-red-950/15 border border-red-500/20 backdrop-blur-xl flex flex-col justify-between space-y-6">
            <div className="inline-flex items-center gap-2 text-red-400 text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>Hosting Biasa (Murahan)</span>
            </div>
            <p className="text-xl sm:text-2xl text-red-200/90 font-medium leading-relaxed">
              Hosting Biasa: Kapasitas dibatasi. Saat kampanye iklan Anda viral, server langsung lumpuh (Error 502). Ribuan pengunjung gagal membeli, dan anggaran iklan Anda hangus sia-sia.
            </p>
            <div className="text-xs text-red-400/70 font-mono">
              [Status: Lumpuh Total Saat Trafik Puncak]
            </div>
          </div>

          {/* Right Column (Vibrant Teal/Purple tone) */}
          <div className="p-10 rounded-3xl bg-gradient-to-br from-teal-950/40 to-purple-950/30 border border-teal-500/30 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-teal-400 text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span>Cloud Otonom Chestaa</span>
            </div>
            <p className="text-xl sm:text-2xl text-white font-semibold leading-relaxed">
              Cloud Otonom Chestaa: Server membaca lonjakan trafik dan menggandakan kapasitas secara otomatis dalam milidetik. Berapapun pengunjung yang masuk, website tetap secepat kilat.
            </p>
            <div className="text-xs text-teal-400 font-mono">
              [Status: Skala Tanpa Batas & Anti-Down]
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: LOCALIZED MICRO-PORTFOLIO (TRUST BUILDER) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0b0b0f]">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
            <span>Terminal Uptime 99.99%</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl">
            Stabilitas Sempurna Tanpa Kedip
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Jujurly, janji anti-down itu bukan sekadar teori pemasaran. Infrastruktur cloud yang kami rakit di belakang Vercel dan AWS terbukti menangani ribuan klik serentak tanpa jeda waktu muat.
          </p>
          <div className="p-8 sm:p-12 rounded-3xl bg-teal-950/20 border border-teal-500/30 backdrop-blur-2xl w-full max-w-3xl flex flex-col items-center space-y-4 shadow-2xl">
            <span className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
              0 Persen Drop-Off
            </span>
            <span className="text-sm sm:text-base text-slate-300 font-medium tracking-wide">
              Tingkat kegagalan transaksi (Drop-off Rate) turun menjadi 0 persen saat peluncuran kampanye iklan besar.
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE AUTONOMOUS WORKFLOW (WORKFLOW) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto flex flex-col space-y-16">
          <div className="text-center space-y-4">
            <span className="text-teal-400 text-xs font-mono uppercase tracking-wider">Mekanisme Auto-Scaling</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              The Autonomous Workflow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Load Balancing Otonom', desc: 'Membagi ribuan pengunjung ke beberapa jalur server agar tidak ada antrean atau kemacetan.' },
              { step: '02', title: 'Auto-Scaling Up', desc: 'Saat pengunjung membludak, server otomatis menggandakan memori (RAM) seketika.' },
              { step: '03', title: 'Auto-Scaling Down', desc: 'Saat trafik kembali normal, kapasitas diturunkan secara otomatis agar Anda tidak membayar biaya server berlebih.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col space-y-4 relative"
              >
                <span className="text-4xl font-extrabold text-teal-500/40 font-mono">{item.step}</span>
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
            <span className="text-teal-400 text-xs font-mono uppercase tracking-wider">Tulang Punggung Internet Dunia</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-snug">
              Infrastruktur Setara Raksasa Global
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Website Anda akan ditempatkan di atas tulang punggung internet dunia. Kami mengonfigurasi infrastruktur setara militer yang persis digunakan oleh raksasa teknologi global.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl flex flex-col items-center justify-center space-y-6 shadow-2xl">
            <div className="flex items-center gap-6">
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-teal-300">AWS Cloud</span>
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-cyan-300">Google Cloud</span>
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-white">Vercel Edge</span>
            </div>
            <div className="text-xs text-slate-500 font-mono text-center">
              [Uptime 99.99% & Global Edge Network]
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: THE ZERO-HOSTAGE GUARANTEE (SECURITY) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-950/50 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-xl">
            <Lock size={28} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            The Zero-Hostage Guarantee
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Akses Root (Tertinggi) 100 Persen Milik Anda. Kami mengatur arsitektur rumitnya, tetapi kunci brankas mutlak di tangan Anda. Tidak ada monopoli akses oleh agensi.
          </p>
        </div>
      </section>

      {/* SECTION 7: THE COST OF INACTION (URGENCY) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#08080c]">
        <div className="max-w-4xl mx-auto p-10 sm:p-14 rounded-3xl bg-red-950/20 border border-red-500/30 backdrop-blur-2xl text-center space-y-6 shadow-2xl">
          <span className="text-red-400 text-xs font-mono uppercase tracking-widest">[Kerugian Fatal Server Down]</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white leading-snug">
            Hitung kerugian matematisnya: Jika Anda menghabiskan 10 Juta untuk iklan hari ini, dan server mati selama 2 jam di jam sibuk, Anda secara harfiah telah membuang jutaan rupiah langsung ke tempat sampah.
          </h2>
        </div>
      </section>

      {/* SECTION 8: THE ANTI-SAAS PRICING (VALUE) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0b0b0f]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block text-slate-500 text-lg sm:text-xl font-mono line-through decoration-red-500 decoration-2">
            Paket Hosting Bisnis Overprice
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Bayar Sesuai Pemakaian (Pay-As-You-Go) Tanpa Markup
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Berhenti membeli paket hosting tetap yang mahal. Chestaa menerapkan arsitektur Pay-As-You-Go langsung ke penyedia cloud. Anda hanya membayar tarif dasar cloud yang murah, ditambah satu kali biaya setup arsitektur dewa dari kami.
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
                <p className="text-xs text-teal-400 font-mono">Founder & Principal System Architect</p>
              </div>
            </div>
            <p className="text-base text-slate-300 leading-relaxed italic">
              "Gue paling anti ngeliat website klien mati pas lagi panen closingan. Infrastruktur yang gue bangun literally dirancang buat nahan gempuran trafik paling brutal sekalipun."
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
              <span>Direct Founder Line • Aktif 24/7</span>
            </div>
          </div>

          {/* Right Column: AI Chat Trigger Area */}
          <div className="p-8 sm:p-10 rounded-3xl bg-teal-950/20 border border-teal-500/30 backdrop-blur-2xl flex flex-col space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-teal-400 text-xs font-mono">
              <Sparkles size={14} className="text-teal-400 animate-spin" />
              <span>AI Takeover & Tes Ketahanan Server</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Simulasi Uji Ketahanan Server
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Jujurly, website error 502 pas iklan lagi jalan tuh literally mimpi buruk. [SPLIT] Mau gue cek apakah infrastruktur lo sekarang kuat nahan trafik viral?
            </p>
            <Link
              to="/"
              onClick={() => {
                const chatLauncher = document.querySelector('[aria-label="Konsultasi Arsitektur"]') as HTMLButtonElement;
                if (chatLauncher) chatLauncher.click();
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-sm transition-all shadow-lg cursor-pointer"
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
