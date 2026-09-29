import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Shield, ShieldCheck, Lock, ArrowRight, 
  CheckCircle2, Sparkles, Server, Briefcase,
  Cpu, MessageSquare, Clock, Globe, Target
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOMetadata from '../components/atoms/SEOMetadata';
import AEOServiceSchema from '../components/atoms/AEOServiceSchema';

export default function DigitalAssetProtectionServicePage() {
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
    <div className="relative w-full flex flex-col bg-[#0b0b0f] text-slate-100 overflow-x-hidden selection:bg-slate-600 selection:text-white font-sans">
      <SEOMetadata
        title="Proteksi Aset Digital & SLA VIP (Business Continuity) | Chestaa"
        description="Fokus jalankan bisnis Anda. Kami mengambil alih seluruh beban teknis, keamanan, dan optimasi kecepatan dengan jaminan SLA mutlak."
      />
      <AEOServiceSchema
        serviceName="Proteksi Aset Digital & SLA VIP (Business Continuity)"
        serviceDescription="Layanan proteksi aset digital korporat, pemeliharaan otonom 24/7, dan jaminan SLA VIP untuk kelangsungan operasional bisnis tanpa gangguan teknis."
        serviceUrl="https://chestaa.com/services/proteksi-aset-digital-sla"
        category="SLA Korporat & Business Continuity"
        keyBenefits={["Monitoring Aktif 24/7", "Resolusi Bug Sub-Jam", "Pembaruan Keamanan Harian", "Laporan Eksekutif Bulanan"]}
        entities={["CHESTAADOTCOM", "Business Continuity", "SLA VIP", "Digital Asset Protection"]}
        mentions={["Google Gemini", "ChatGPT", "Next.js 15", "GitHub Actions"]}
      />

      {/* SECTION 1: THE EXECUTIVE HERO (ATTENTION - THE PEACE OF MIND HOOK) */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-6 sm:px-12 py-24 overflow-hidden border-b border-white/10">
        {/* Glowing Radar Sweep Fortress Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.07, 1],
              opacity: [0.15, 0.35, 0.15]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-slate-400/20 rounded-full blur-[160px]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:44px_44px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-500/30 backdrop-blur-md text-slate-300 text-xs font-mono uppercase tracking-wider shadow-lg"
          >
            <Shield size={13} className="text-slate-300 animate-pulse" />
            <span>SLA KORPORAT & TIM IT VIP</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.08]"
          >
            Aset Digital Miliaran Anda Terlalu Berharga Untuk Ditelantarkan. <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-indigo-300 to-white">Jaminan SLA Mutlak.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed"
          >
            Fokus jalankan bisnis Anda. Kami mengambil alih seluruh beban teknis, pembaruan keamanan, dan optimasi kecepatan dengan jaminan Service Level Agreement (SLA) mutlak.
          </motion.p>

          {/* 4 Core Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-6"
          >
            {[
              { label: 'Monitoring Aktif', val: '24/7 Non-Stop' },
              { label: 'Resolusi Bug', val: 'Sub-Jam' },
              { label: 'Pembaruan Keamanan', val: 'Setiap Hari' },
              { label: 'Laporan Eksekutif', val: 'Tiap Bulan' }
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
              className="relative px-8 py-4 rounded-full bg-gradient-to-r from-slate-200 to-indigo-300 text-slate-950 font-bold text-sm sm:text-base tracking-wide shadow-[0_0_40px_rgba(203,213,225,0.4)] hover:shadow-[0_0_60px_rgba(203,213,225,0.7)] transition-all flex items-center gap-3 cursor-pointer group"
            >
              <span>Amankan Aset Bisnis Gue</span>
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE BLEEDING REALITY (PAIN - ABANDONMENT VS VIP CARE) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left Column (Dim Red tone) */}
          <div className="p-10 rounded-3xl bg-red-950/15 border border-red-500/20 backdrop-blur-xl flex flex-col justify-between space-y-6">
            <div className="inline-flex items-center gap-2 text-red-400 text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>Website Ditelantarkan</span>
            </div>
            <p className="text-xl sm:text-2xl text-red-200/90 font-medium leading-relaxed">
              Website Ditelantarkan: Setelah peluncuran, sistem perlahan menumpuk kode sampah (technical debt). Kecepatan menurun, celah keamanan terbuka, dan saat server tumbang, Anda tidak punya siapa-siapa untuk dihubungi.
            </p>
            <div className="text-xs text-red-400/70 font-mono">
              [Status: Kerentanan Akumulatif & Downtime Tanpa Solusi]
            </div>
          </div>

          {/* Right Column (Vibrant Slate/Purple tone) */}
          <div className="p-10 rounded-3xl bg-gradient-to-br from-slate-900/80 to-purple-950/30 border border-slate-500/30 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-slate-300 text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span>Proteksi VIP Chestaa</span>
            </div>
            <p className="text-xl sm:text-2xl text-white font-semibold leading-relaxed">
              Proteksi VIP Chestaa: Sistem Anda diawasi oleh AI dan arsitek elit secara real-time. Kami mendeteksi dan menghancurkan bug atau celah keamanan jauh sebelum Anda dan pelanggan Anda menyadarinya.
            </p>
            <div className="text-xs text-slate-300 font-mono">
              [Status: Pengawasan Elit 24/7 & Zero Downtime]
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: LOCALIZED MICRO-PORTFOLIO (TRUST BUILDER) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0b0b0f]">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
            <span>Timeline Proaktif & Skor 100/100</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl">
            Performa Puncak Sejak Hari Pertama
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Jujurly, infrastruktur sebagus apapun akan hancur tanpa perawatan. Kami memastikan arsitektur klien elit kami selalu berada pada performa puncak, persis seperti di hari pertama peluncuran.
          </p>
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/40 border border-slate-500/30 backdrop-blur-2xl w-full max-w-3xl flex flex-col items-center space-y-4 shadow-2xl">
            <span className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-indigo-300">
              100 Persen Dicegah
            </span>
            <span className="text-sm sm:text-base text-slate-300 font-medium tracking-wide">
              Mencegah 100 Persen potensi downtime sistem pada jam sibuk bisnis klien selama setahun penuh.
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE AUTONOMOUS WORKFLOW (WORKFLOW) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto flex flex-col space-y-16">
          <div className="text-center space-y-4">
            <span className="text-slate-300 text-xs font-mono uppercase tracking-wider">Mekanisme Proteksi Proaktif</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              The Autonomous Workflow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Pemantauan Denyut Nadi (Heartbeat Monitor)', desc: 'AI kami mengecek status server dan aplikasi Anda setiap 60 detik tanpa henti.' },
              { step: '02', title: 'Injeksi Patch Proaktif', desc: 'Memperbarui tumpukan teknologi dan menutup celah keamanan terbaru tanpa mengganggu operasional (Zero Downtime Deployment).' },
              { step: '03', title: 'Audit & Laporan Eksekutif', desc: 'Anda menerima laporan ringkas setiap akhir bulan berisi data performa, ancaman yang diblokir, dan optimasi yang telah kami lakukan.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col space-y-4 relative"
              >
                <span className="text-4xl font-extrabold text-slate-500/40 font-mono">{item.step}</span>
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
            <span className="text-slate-300 text-xs font-mono uppercase tracking-wider">Continuous Integration (CI/CD)</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-snug">
              Validasi Otomatis Sebelum Masuk Server Utama
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Kami tidak memperbaiki masalah setelah terjadi. Kami menggunakan arsitektur Continuous Integration & Deployment (CI/CD) kelas enterprise untuk memvalidasi setiap pembaruan sebelum menyentuh server utama Anda.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl flex flex-col items-center justify-center space-y-6 shadow-2xl">
            <div className="flex items-center gap-6">
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-slate-300">CI/CD Pipelines</span>
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-indigo-300">GitHub Actions</span>
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-white">Uptime AI</span>
            </div>
            <div className="text-xs text-slate-500 font-mono text-center">
              [Zero Downtime Deployments & Auto-Healing]
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: THE ZERO-HOSTAGE GUARANTEE (SECURITY) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-900 border border-slate-500/30 flex items-center justify-center text-slate-300 shadow-xl">
            <ShieldCheck size={28} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            The Zero-Hostage Guarantee
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Transparansi Penuh, Kontrol Tetap di Tangan Anda. Meskipun kami mengurus semuanya, Anda memegang seluruh hak akses Super Admin. Tidak ada penyanderaan teknis. Anda bisa membatalkan kontrak SLA kapan saja.
          </p>
        </div>
      </section>

      {/* SECTION 7: THE COST OF INACTION (URGENCY) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#08080c]">
        <div className="max-w-4xl mx-auto p-10 sm:p-14 rounded-3xl bg-red-950/20 border border-red-500/30 backdrop-blur-2xl text-center space-y-6 shadow-2xl">
          <span className="text-red-400 text-xs font-mono uppercase tracking-widest">[Risiko Kelalaian Teknis]</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white leading-snug">
            Hitung risiko kehancuran Anda: Satu celah keamanan yang dibiarkan terbuka (Zero-Day Exploit) dapat melumpuhkan seluruh basis data Anda. Biaya pemulihan sistem yang hancur puluhan kali lipat lebih mahal daripada biaya proteksi.
          </h2>
        </div>
      </section>

      {/* SECTION 8: THE ANTI-SAAS PRICING (VALUE) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0b0b0f]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block text-slate-500 text-lg sm:text-xl font-mono line-through decoration-red-500 decoration-2">
            Gaji Bulanan Senior IT DevOps (Rp 15.000.000+)
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Tim Arsitek Elit Tanpa Beban Payroll Korporat
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Mengapa membebani payroll perusahaan dengan tim IT internal yang mahal? Chestaa memberikan fasilitas arsitek digital setara tim elit dengan biaya langganan SLA yang sangat rasional dan efisien untuk arus kas Anda.
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
                <p className="text-xs text-slate-300 font-mono">Founder & Principal System Architect</p>
              </div>
            </div>
            <p className="text-base text-slate-300 leading-relaxed italic">
              "Gue pantang ninggalin klien setelah handover proyek. Infrastruktur yang gue bangun adalah tanggung jawab gue buat mastiin sistem itu terus nyetak profit buat lo tanpa hambatan."
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-slate-300 animate-ping" />
              <span>Direct Founder Line • Aktif 24/7</span>
            </div>
          </div>

          {/* Right Column: AI Chat Trigger Area */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/40 border border-slate-500/30 backdrop-blur-2xl flex flex-col space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-slate-300 text-xs font-mono">
              <Sparkles size={14} className="text-slate-300 animate-spin" />
              <span>AI Takeover & Cek Kesehatan Sistem</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Simulasi Cek Kesehatan Infrastruktur
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Jujurly, website korporat tanpa proteksi bulanan tuh ibarat ninggalin Ferrari di pinggir jalan tanpa dikunci. [SPLIT] Mau gue bantu jalankan cek kesehatan (Health Check) gratis buat sistem lo hari ini?
            </p>
            <Link
              to="/"
              onClick={() => {
                const chatLauncher = document.querySelector('[aria-label="Konsultasi Arsitektur"]') as HTMLButtonElement;
                if (chatLauncher) chatLauncher.click();
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-slate-200 hover:bg-white text-slate-950 font-bold text-sm transition-all shadow-lg cursor-pointer"
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
