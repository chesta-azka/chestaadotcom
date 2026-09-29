import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Search, ShieldCheck, Lock, ArrowRight, 
  CheckCircle2, TrendingUp, Sparkles, Server,
  Cpu, MessageSquare, Clock, Globe, Crown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOMetadata from '../components/atoms/SEOMetadata';

export default function SeoAeoServicePage() {
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
    <div className="relative w-full flex flex-col bg-[#0b0b0f] text-slate-100 overflow-x-hidden selection:bg-indigo-600 selection:text-white font-sans">
      <SEOMetadata
        title="Dominasi Mesin Pencari & AI (SEO & AEO) | Chestaa"
        description="Berhenti membakar uang iklan. Kuasai halaman pertama Google dan jadilah jawaban mutlak di ChatGPT atau Gemini."
      />

      {/* SECTION 1: THE EXECUTIVE HERO (ATTENTION - THE FREE TRAFFIC HOOK) */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-6 sm:px-12 py-24 overflow-hidden border-b border-white/10">
        {/* Glowing Search Bar & AI Recommendation Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.07, 1],
              opacity: [0.15, 0.35, 0.15]
            }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-indigo-500/20 rounded-full blur-[160px]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:44px_44px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 backdrop-blur-md text-indigo-400 text-xs font-mono uppercase tracking-wider shadow-lg"
          >
            <Search size={13} className="text-indigo-400 animate-pulse" />
            <span>SEO SEMANTIK & OPTIMASI AI (AEO)</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.08]"
          >
            Berhenti Membakar Uang Iklan. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-white">Biarkan Google & AI Merekomendasikan Bisnis Anda.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed"
          >
            Kuasai halaman pertama Google dan jadilah jawaban mutlak di ChatGPT atau Gemini. Kami membangun infrastruktur SEO & AEO agar prospek datang sendiri tanpa biaya klik.
          </motion.p>

          {/* 4 Core Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-6"
          >
            {[
              { label: 'Ranking Google', val: 'Nomor 1' },
              { label: 'Rekomendasi AI', val: 'ChatGPT / Gemini' },
              { label: 'Trafik Organik', val: '100% Gratis' },
              { label: 'Kualitas Prospek', val: 'Hangat & Siap Beli' }
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
              className="relative px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm sm:text-base tracking-wide shadow-[0_0_40px_rgba(99,102,241,0.4)] hover:shadow-[0_0_60px_rgba(99,102,241,0.7)] transition-all flex items-center gap-3 cursor-pointer group"
            >
              <span>Cek Potensi Organik Bisnis Gue</span>
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE BLEEDING REALITY (PAIN - PAID ADS VS ORGANIC) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left Column (Dim Red tone) */}
          <div className="p-10 rounded-3xl bg-red-950/15 border border-red-500/20 backdrop-blur-xl flex flex-col justify-between space-y-6">
            <div className="inline-flex items-center gap-2 text-red-400 text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>Ketergantungan Iklan Berbayar</span>
            </div>
            <p className="text-xl sm:text-2xl text-red-200/90 font-medium leading-relaxed">
              Ketergantungan Iklan: Biaya per klik (CPC) terus naik. Begitu saldo iklan habis, trafik dan penjualan Anda langsung mati. Anda menyewa perhatian, bukan memilikinya.
            </p>
            <div className="text-xs text-red-400/70 font-mono">
              [Status: Sewa Perhatian Sementara & Biaya CPC Membengkak]
            </div>
          </div>

          {/* Right Column (Vibrant Indigo/Purple tone) */}
          <div className="p-10 rounded-3xl bg-gradient-to-br from-indigo-950/40 to-purple-950/30 border border-indigo-500/30 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span>Dominasi Organik Chestaa</span>
            </div>
            <p className="text-xl sm:text-2xl text-white font-semibold leading-relaxed">
              Dominasi Organik Chestaa: Mesin pencari dan AI mengirimkan ribuan prospek hangat setiap bulan secara gratis. Aset digital Anda bekerja sebagai mesin pencetak uang otonom 24/7.
            </p>
            <div className="text-xs text-indigo-400 font-mono">
              [Status: Trafik Gratis Seumur Hidup & Otoritas Absolut]
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: LOCALIZED MICRO-PORTFOLIO (TRUST BUILDER) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0b0b0f]">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
            <span>Analisis Lonjakan Trafik Organik</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl">
            Dominasi Kata Kunci Tanpa Biaya Klik
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Jujurly, kita sudah meriset pola pencarian dari Google hingga model AI terbaru. Infrastruktur dari ekosistem TanyaSeo adalah bukti nyata bagaimana arsitektur kami mendominasi kata kunci secara instan.
          </p>
          <div className="p-8 sm:p-12 rounded-3xl bg-indigo-950/20 border border-indigo-500/30 backdrop-blur-2xl w-full max-w-3xl flex flex-col items-center space-y-4 shadow-2xl">
            <span className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-300">
              +400 Persen
            </span>
            <span className="text-sm sm:text-base text-slate-300 font-medium tracking-wide">
              Trafik organik tanpa biaya iklan (Zero Ad Spend) meningkat hingga 400 persen dalam satu kuartal.
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE AUTONOMOUS WORKFLOW (WORKFLOW) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto flex flex-col space-y-16">
          <div className="text-center space-y-4">
            <span className="text-indigo-400 text-xs font-mono uppercase tracking-wider">Alur Optimasi Semantik & AI</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              The Autonomous Workflow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Audit & Pemetaan Niat (Intent)', desc: 'Kami membongkar kata kunci rahasia yang paling sering diketik prospek Anda di Google dan di-prompt ke AI.' },
              { step: '02', title: 'Injeksi Semantik & Schema Markup', desc: 'Mengubah bahasa website Anda menjadi kode data murni yang sangat disukai dan mudah dipahami oleh mesin pencari.' },
              { step: '03', title: 'Otoritas AI (AEO)', desc: 'Membangun entitas bisnis Anda agar secara resmi dikutip dan direkomendasikan oleh ChatGPT, Claude, dan Gemini.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col space-y-4 relative"
              >
                <span className="text-4xl font-extrabold text-indigo-500/40 font-mono">{item.step}</span>
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
            <span className="text-indigo-400 text-xs font-mono uppercase tracking-wider">Matematika Server & Algoritma</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-snug">
              Lebih dari Sekadar Artikel Panjang
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              SEO bukan sekadar artikel panjang. Ini adalah matematika server. Kami memadukan Server-Side Rendering (SSR) Next.js dengan arsitektur data terstruktur, memastikan Google langsung memberi skor sempurna untuk website Anda.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl flex flex-col items-center justify-center space-y-6 shadow-2xl">
            <div className="flex items-center gap-6">
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-indigo-300">Search Console</span>
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-purple-300">OpenAI / GPT</span>
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-white">Next.js SSR</span>
            </div>
            <div className="text-xs text-slate-500 font-mono text-center">
              [Skor SEO 100/100 & Schema Terstruktur]
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: THE ZERO-HOSTAGE GUARANTEE (SECURITY) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-950/50 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-xl">
            <Crown size={28} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            The Zero-Hostage Guarantee
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Aset Otoritas Milik Anda Sepenuhnya. Kami menggunakan strategi White-Hat murni. Semua artikel, backlink otoritas tinggi, dan arsitektur SEO mutlak menjadi hak paten bisnis Anda, kebal dari penalti algoritma.
          </p>
        </div>
      </section>

      {/* SECTION 7: THE COST OF INACTION (URGENCY) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#08080c]">
        <div className="max-w-4xl mx-auto p-10 sm:p-14 rounded-3xl bg-red-950/20 border border-red-500/30 backdrop-blur-2xl text-center space-y-6 shadow-2xl">
          <span className="text-red-400 text-xs font-mono uppercase tracking-widest">[Risiko Ketinggalan Era AI]</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white leading-snug">
            Fakta masa depan: Jika ChatGPT tidak merekomendasikan bisnis Anda hari ini, pelanggan akan langsung beralih ke kompetitor Anda. Kehilangan takhta di halaman pertama berarti kehilangan puluhan juta potensi pendapatan setiap hari.
          </h2>
        </div>
      </section>

      {/* SECTION 8: THE ANTI-SAAS PRICING (VALUE) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0b0b0f]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block text-slate-500 text-lg sm:text-xl font-mono line-through decoration-red-500 decoration-2">
            Anggaran Iklan Meta & Google (Ratusan Juta/Tahun)
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Investasi Sekali Untuk Trafik Gratis Seumur Hidup
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Pangkas anggaran iklan berbayar Anda hingga titik terendah. Chestaa memberikan investasi infrastruktur organik jangka panjang. Satu kali pembangunan untuk trafik gratis seumur hidup.
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
                <p className="text-xs text-indigo-400 font-mono">Founder & Principal System Architect</p>
              </div>
            </div>
            <p className="text-base text-slate-300 leading-relaxed italic">
              "Gue paling suka ngeliat klien gue bisa matiin kampanye iklannya karena kewalahan nerima orderan gratis dari Google. Sini gue bedah strategi organik lo."
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              <span>Direct Founder Line • Aktif 24/7</span>
            </div>
          </div>

          {/* Right Column: AI Chat Trigger Area */}
          <div className="p-8 sm:p-10 rounded-3xl bg-indigo-950/20 border border-indigo-500/30 backdrop-blur-2xl flex flex-col space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-mono">
              <Sparkles size={14} className="text-indigo-400 animate-spin" />
              <span>AI Takeover & Simulasi Trafik Organik</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Simulasi Potensi Trafik Organik
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Jujurly, bakar duit buat ads tiap bulan tuh berat banget. [SPLIT] Mau gue simulasiin berapa trafik gratis yang bisa lo dapet kalau website lo direkomendasiin ChatGPT dan Google?
            </p>
            <Link
              to="/"
              onClick={() => {
                const chatLauncher = document.querySelector('[aria-label="Konsultasi Arsitektur"]') as HTMLButtonElement;
                if (chatLauncher) chatLauncher.click();
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-lg cursor-pointer"
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
