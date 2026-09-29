import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Bot, ShieldCheck, Lock, ArrowRight, 
  CheckCircle2, TrendingUp, Sparkles, Server,
  Zap, MessageSquare, Clock, Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOMetadata from '../components/atoms/SEOMetadata';

export default function AiEmployeeServicePage() {
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
    <div className="relative w-full flex flex-col bg-[#0b0b0f] text-slate-100 overflow-x-hidden selection:bg-cyan-600 selection:text-white font-sans">
      <SEOMetadata
        title="Karyawan Digital AI & Otomatisasi Layanan | Chestaa"
        description="Berhenti membakar uang untuk gaji admin. Pekerjakan karyawan digital AI otonom 24/7 tanpa cuti dan tanpa human error."
      />

      {/* SECTION 1: THE EXECUTIVE HERO (ATTENTION - THE PAYROLL HOOK) */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-6 sm:px-12 py-24 overflow-hidden border-b border-white/10">
        {/* Floating AI Neural Network Mesh Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.08, 1],
              opacity: [0.15, 0.35, 0.15]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/20 rounded-full blur-[150px]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 backdrop-blur-md text-cyan-400 text-xs font-mono uppercase tracking-wider shadow-lg"
          >
            <Bot size={13} className="text-cyan-400 animate-pulse" />
            <span>OTOMATISASI AI & EFISIENSI • KARYAWAN DIGITAL</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.08]"
          >
            Berhenti Membakar Uang untuk Gaji Admin. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-white">Pekerjakan AI 24/7.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed"
          >
            Karyawan digital otonom yang merespons prospek Anda dalam milidetik, mengkualifikasi pesanan, dan bekerja tanpa henti. Tanpa cuti, tanpa drama, tanpa human error.
          </motion.p>

          {/* 4 Core Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-6"
          >
            {[
              { label: 'Operasional', val: '24/7 Non-Stop' },
              { label: 'Akurasi Kerja', val: 'Zero Error' },
              { label: 'Waktu Respon', val: '< 1 Detik' },
              { label: 'Penghematan Gaji', val: '100 Persen' }
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
              className="relative px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 text-slate-950 font-bold text-sm sm:text-base tracking-wide shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_60px_rgba(6,182,212,0.7)] transition-all flex items-center gap-3 cursor-pointer group"
            >
              <span>Simulasi Pangkas Biaya Admin</span>
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE BLEEDING REALITY (PAIN - HUMAN VS AI) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left Column (Dim Red tone) */}
          <div className="p-10 rounded-3xl bg-red-950/15 border border-red-500/20 backdrop-blur-xl flex flex-col justify-between space-y-6">
            <div className="inline-flex items-center gap-2 text-red-400 text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>Admin Manusia (Cara Lama)</span>
            </div>
            <p className="text-xl sm:text-2xl text-red-200/90 font-medium leading-relaxed">
              Admin Manusia: Bekerja 8 jam sehari. Sering lambat membalas chat di luar jam kerja. Rentan melakukan kesalahan input data. Biaya gaji dan bonus terus meningkat setiap tahun.
            </p>
            <div className="text-xs text-red-400/70 font-mono">
              [Status: Operasional Terbatas & Biaya Payroll Bengkak]
            </div>
          </div>

          {/* Right Column (Vibrant Cyan/Purple tone) */}
          <div className="p-10 rounded-3xl bg-gradient-to-br from-cyan-950/40 to-purple-950/30 border border-cyan-500/30 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Karyawan AI Chestaa</span>
            </div>
            <p className="text-xl sm:text-2xl text-white font-semibold leading-relaxed">
              Karyawan AI Chestaa: Standby 24 jam sehari, 7 hari seminggu. Membalas ribuan chat secara bersamaan dalam milidetik. Menangkap setiap prospek yang masuk tepat saat mereka siap membeli.
            </p>
            <div className="text-xs text-cyan-400 font-mono">
              [Status: Efisiensi 100% & Zero Human Error]
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: LOCALIZED MICRO-PORTFOLIO (TRUST BUILDER) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0b0b0f]">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
            <span>Bukti Nyata Interaktif</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl">
            Asisten AI Kami Bekerja Untuk Anda Saat Ini
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Jujurly, Anda sedang melihat buktinya sekarang. Asisten AI di pojok kanan bawah layar Anda adalah sistem otonom yang kami bangun. Karyawan digital ini yang akan kami tanam di ekosistem bisnis Anda.
          </p>
          <div className="p-8 sm:p-12 rounded-3xl bg-cyan-950/20 border border-cyan-500/30 backdrop-blur-2xl w-full max-w-3xl flex flex-col items-center space-y-4 shadow-2xl">
            <span className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
              15 Menit ke 0.8 Detik
            </span>
            <span className="text-sm sm:text-base text-slate-300 font-medium tracking-wide">
              Waktu respon rata-rata turun dari 15 menit menjadi 0.8 detik.
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE AUTONOMOUS WORKFLOW (WORKFLOW) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto flex flex-col space-y-16">
          <div className="text-center space-y-4">
            <span className="text-cyan-400 text-xs font-mono uppercase tracking-wider">Alur Kerja Otonom</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              The Autonomous Workflow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Deteksi Prospek', desc: 'Klien mengirim pesan via Website atau WhatsApp di tengah malam.' },
              { step: '02', title: 'Kualifikasi Otonom', desc: 'AI langsung menjawab dengan bahasa natural, memberikan solusi, dan menghitung harga.' },
              { step: '03', title: 'Eskalasi ke Founder', desc: 'Data klien yang sudah matang dan siap transfer langsung dikirim ke WhatsApp pribadi Anda.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col space-y-4 relative"
              >
                <span className="text-4xl font-extrabold text-cyan-500/40 font-mono">{item.step}</span>
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
            <span className="text-cyan-400 text-xs font-mono uppercase tracking-wider">Otak Kecerdasan Kelas Dunia</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-snug">
              Infrastruktur AI Paling Canggih di Pasar
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Kami mengintegrasikan mesin kecerdasan buatan kelas dunia ke dalam jantung bisnis Anda. Ini bukan chatbot murahan, melainkan otak analitis yang memahami seluruh konteks produk dan layanan Anda.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl flex flex-col items-center justify-center space-y-6 shadow-2xl">
            <div className="flex items-center gap-6">
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-cyan-300">Google Gemini</span>
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-teal-300">Firebase Vectors</span>
            </div>
            <div className="text-xs text-slate-500 font-mono text-center">
              [Keamanan Data Enterprise & Grounding Mutlak]
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: THE ZERO-HOSTAGE GUARANTEE (SECURITY) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-xl">
            <Lock size={28} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            The Zero-Hostage Guarantee
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Keamanan Data Absolut & Hak Milik Penuh. Prompt arsitektur AI dan seluruh data percakapan pelanggan mutlak menjadi milik Anda. Kami menjaga privasi operasional Anda dengan standar enkripsi tertinggi.
          </p>
        </div>
      </section>

      {/* SECTION 7: THE COST OF INACTION (URGENCY) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#08080c]">
        <div className="max-w-4xl mx-auto p-10 sm:p-14 rounded-3xl bg-red-950/20 border border-red-500/30 backdrop-blur-2xl text-center space-y-6 shadow-2xl">
          <span className="text-red-400 text-xs font-mono uppercase tracking-widest">[Kerugian Keterlambatan Respon]</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white leading-snug">
            Hitung sendiri: Berapa juta rupiah yang Anda keluarkan setiap bulan hanya untuk membalas pertanyaan berulang? Mempertahankan cara manual berarti Anda membiarkan kompetitor merebut prospek Anda yang tidak sabar menunggu balasan.
          </h2>
        </div>
      </section>

      {/* SECTION 8: THE ANTI-SAAS PRICING (VALUE) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0b0b0f]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block text-slate-500 text-lg sm:text-xl font-mono line-through decoration-red-500 decoration-2">
            Biaya Gaji Admin Tahunan (Rp 60.000.000+)
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Investasi Sekali Untuk Pangkas Gaji Admin Selamanya
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Hapus beban pengeluaran rutin yang membengkak. Sistem Karyawan Digital AI dari Chestaa adalah investasi satu kali yang langsung mengembalikan modal (ROI) di bulan pertama operasional.
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
                <p className="text-xs text-cyan-400 font-mono">Founder & Principal System Architect</p>
              </div>
            </div>
            <p className="text-base text-slate-300 leading-relaxed italic">
              "Gue ngebangun sistem AI ini awalnya buat bisnis gue sendiri karena capek ngurusin admin manual. Hasilnya brutal. Sekarang, gue mau pasang sistem ini di perusahaan lo."
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Direct Founder Line • Aktif 24/7</span>
            </div>
          </div>

          {/* Right Column: AI Chat Trigger Area */}
          <div className="p-8 sm:p-10 rounded-3xl bg-cyan-950/20 border border-cyan-500/30 backdrop-blur-2xl flex flex-col space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono">
              <Sparkles size={14} className="text-cyan-400 animate-spin" />
              <span>AI Takeover & Simulasi Penghematan</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Simulasi Penghematan Gaji Admin
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Jujurly, ngurusin chat manual tuh literally bakar duit. Mau gue hitungin persisnya berapa juta yang bisa lo hemat bulan ini kalau pakai sistem gue?
            </p>
            <Link
              to="/"
              onClick={() => {
                const chatLauncher = document.querySelector('[aria-label="Konsultasi Arsitektur"]') as HTMLButtonElement;
                if (chatLauncher) chatLauncher.click();
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold text-sm transition-all shadow-lg cursor-pointer"
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
