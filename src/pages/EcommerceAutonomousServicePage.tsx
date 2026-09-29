import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  ShoppingBag, ShieldCheck, Lock, ArrowRight, 
  CheckCircle2, TrendingUp, Sparkles, Server,
  CreditCard, MessageSquare, Clock, Database
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOMetadata from '../components/atoms/SEOMetadata';

export default function EcommerceAutonomousServicePage() {
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
    <div className="relative w-full flex flex-col bg-[#0b0b0f] text-slate-100 overflow-x-hidden selection:bg-orange-600 selection:text-white font-sans">
      <SEOMetadata
        title="Toko Online Otonom & Zero Marketplace Fee | Chestaa"
        description="Selamatkan 10-15% margin profit Anda dari potongan platform. Bangun toko online otonom dengan pembayaran QRIS otomatis."
      />

      {/* SECTION 1: THE EXECUTIVE HERO (ATTENTION - THE PROFIT HOOK) */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-6 sm:px-12 py-24 overflow-hidden border-b border-white/10">
        {/* Floating Storefront Dashboard Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.06, 1],
              opacity: [0.15, 0.3, 0.15]
            }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-orange-500/20 rounded-full blur-[160px]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731615_1px,transparent_1px),linear-gradient(to_bottom,#f9731615_1px,transparent_1px)] [background-size:44px_44px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-950/80 border border-orange-500/30 backdrop-blur-md text-orange-400 text-xs font-mono uppercase tracking-wider shadow-lg"
          >
            <ShoppingBag size={13} className="text-orange-400 animate-pulse" />
            <span>SOLUSI E-COMMERCE & PROFIT MAKSIMAL</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.08]"
          >
            Berhenti Membayar Pajak Marketplace. <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-white">Miliki Toko Online Otonom Anda Sendiri.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed"
          >
            Selamatkan 10 hingga 15 persen margin profit Anda dari potongan admin platform. Kami membangun ekosistem e-commerce mandiri dengan pembayaran otomatis dan komisi nol persen.
          </motion.p>

          {/* 4 Core Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-6"
          >
            {[
              { label: 'Komisi Penjualan', val: '0 Persen' },
              { label: 'Pencairan Dana', val: 'Instan' },
              { label: 'QRIS & VA Otomatis', val: 'Real-Time' },
              { label: 'Database Pelanggan', val: '100% Milik Anda' }
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
              className="relative px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-slate-950 font-bold text-sm sm:text-base tracking-wide shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:shadow-[0_0_60px_rgba(249,115,22,0.7)] transition-all flex items-center gap-3 cursor-pointer group"
            >
              <span>Simulasi Penyelamatan Margin Profit</span>
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE BLEEDING REALITY (PAIN - MARKETPLACE VS AUTONOMOUS) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left Column (Dim Red tone) */}
          <div className="p-10 rounded-3xl bg-red-950/15 border border-red-500/20 backdrop-blur-xl flex flex-col justify-between space-y-6">
            <div className="inline-flex items-center gap-2 text-red-400 text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>Jualan di Marketplace</span>
            </div>
            <p className="text-xl sm:text-2xl text-red-200/90 font-medium leading-relaxed">
              Jualan di Marketplace: Margin tipis karena potongan admin 10% lebih. Perang harga tidak sehat. Uang ditahan platform berhari-hari. Anda tidak pernah memiliki data kontak pelanggan Anda.
            </p>
            <div className="text-xs text-red-400/70 font-mono">
              [Status: Profit Tergerus & Ketergantungan Absolut]
            </div>
          </div>

          {/* Right Column (Vibrant Orange/Purple tone) */}
          <div className="p-10 rounded-3xl bg-gradient-to-br from-orange-950/40 to-purple-950/30 border border-orange-500/30 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-orange-400 text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <span>E-Commerce Chestaa</span>
            </div>
            <p className="text-xl sm:text-2xl text-white font-semibold leading-relaxed">
              E-Commerce Chestaa: Margin profit 100% milik Anda. Pembayaran masuk ke rekening detik itu juga. Bebas kendali algoritma. Seluruh data pelanggan menjadi aset eksklusif perusahaan.
            </p>
            <div className="text-xs text-orange-400 font-mono">
              [Status: Kedaulatan Finansial & Zero Commission]
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: LOCALIZED MICRO-PORTFOLIO (TRUST BUILDER) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0b0b0f]">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
            <span>Dashboard Kedaulatan Data</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl">
            Merdeka Finansial Tanpa Potongan Admin
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Jujurly, bergantung penuh sama marketplace itu sama dengan membangun rumah di atas tanah sewaan. Kami membantu brand lokal merdeka secara finansial.
          </p>
          <div className="p-8 sm:p-12 rounded-3xl bg-orange-950/20 border border-orange-500/30 backdrop-blur-2xl w-full max-w-3xl flex flex-col items-center space-y-4 shadow-2xl">
            <span className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              +15 Persen
            </span>
            <span className="text-sm sm:text-base text-slate-300 font-medium tracking-wide">
              Margin profit klien meningkat 15 persen secara instan berkat penghapusan biaya layanan pihak ketiga.
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE AUTONOMOUS WORKFLOW (WORKFLOW) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto flex flex-col space-y-16">
          <div className="text-center space-y-4">
            <span className="text-orange-400 text-xs font-mono uppercase tracking-wider">Alur Transaksi Otonom</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              The Autonomous Workflow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Checkout Tanpa Gesekan', desc: 'Pelanggan memilih produk dan memproses pesanan kurang dari 1 menit.' },
              { step: '02', title: 'Validasi Pembayaran Otonom', desc: 'Sistem mendeteksi transfer QRIS/Virtual Account seketika. Tidak perlu kirim bukti transfer manual.' },
              { step: '03', title: 'Uang Masuk & Resi Tercetak', desc: 'Saldo langsung masuk ke kas perusahaan Anda, sementara sistem mencetak label pengiriman secara otomatis.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col space-y-4 relative"
              >
                <span className="text-4xl font-extrabold text-orange-500/40 font-mono">{item.step}</span>
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
            <span className="text-orange-400 text-xs font-mono uppercase tracking-wider">Gerbang Pembayaran Perbankan</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-snug">
              Infrastruktur Finansial Kelas Perbankan
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Infrastruktur e-commerce ini ditenagai oleh Payment Gateway kelas perbankan dan arsitektur Next.js 15. Tingkat keamanan finansial absolut, dipadukan dengan kecepatan transaksi sub-detik.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl flex flex-col items-center justify-center space-y-6 shadow-2xl">
            <div className="flex items-center gap-6">
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-orange-300">Next.js 15</span>
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-amber-300">Midtrans / Xendit</span>
            </div>
            <div className="text-xs text-slate-500 font-mono text-center">
              [Enkripsi Finansial AES-256 & 0% Komisi]
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: THE ZERO-HOSTAGE GUARANTEE (SECURITY) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-950/50 border border-orange-500/30 flex items-center justify-center text-orange-400 shadow-xl">
            <Database size={28} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            The Zero-Hostage Guarantee
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Hak Milik Penuh Atas Data Pelanggan. Ini adalah tambang emas Anda sesungguhnya. Seluruh nama, email, dan nomor WhatsApp pembeli tersimpan rapi di database rahasia yang hanya bisa diakses oleh Anda.
          </p>
        </div>
      </section>

      {/* SECTION 7: THE COST OF INACTION (URGENCY) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#08080c]">
        <div className="max-w-4xl mx-auto p-10 sm:p-14 rounded-3xl bg-red-950/20 border border-red-500/30 backdrop-blur-2xl text-center space-y-6 shadow-2xl">
          <span className="text-red-400 text-xs font-mono uppercase tracking-widest">[Kebocoran Omzet Bulanan]</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white leading-snug">
            Hitung kerugian Anda: Jika omzet Anda 1 Miliar per bulan, marketplace merampas 100 Juta dari meja Anda setiap bulannya. Terus menunda berarti membiarkan uang tersebut hangus tanpa sisa.
          </h2>
        </div>
      </section>

      {/* SECTION 8: THE ANTI-SAAS PRICING (VALUE) */}
      <section className="py-28 px-6 sm:px-12 border-b border-white/10 bg-[#0b0b0f]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block text-slate-500 text-lg sm:text-xl font-mono line-through decoration-red-500 decoration-2">
            Potongan Komisi Marketplace 10-15%
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Investasi Sekali Untuk Kedaulatan Margin Seumur Hidup
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Cukup satu kali investasi. Chestaa merancang mesin e-commerce yang mengembalikan margin profit utuh kepada Anda, berlaku seumur hidup tanpa potongan per transaksi.
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
                <p className="text-xs text-orange-400 font-mono">Founder & Principal System Architect</p>
              </div>
            </div>
            <p className="text-base text-slate-300 leading-relaxed italic">
              "Gue nggak mau ngeliat pengusaha lokal capek jualan tapi profitnya abis dimakan platform. Waktunya lo bikin ekosistem sendiri."
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
              <span>Direct Founder Line • Aktif 24/7</span>
            </div>
          </div>

          {/* Right Column: AI Chat Trigger Area */}
          <div className="p-8 sm:p-10 rounded-3xl bg-orange-950/20 border border-orange-500/30 backdrop-blur-2xl flex flex-col space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-orange-400 text-xs font-mono">
              <Sparkles size={14} className="text-orange-400 animate-spin" />
              <span>AI Takeover & Simulasi Penyelamatan Omzet</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Simulasi Penyelamatan Margin Profit
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Jujurly, ngasih duit 10 persen ke marketplace tiap ada sales tuh literally bakar duit. Gue hitungin ya berapa ratus juta yang bisa lo selamatkan tahun ini?
            </p>
            <Link
              to="/"
              onClick={() => {
                const chatLauncher = document.querySelector('[aria-label="Konsultasi Arsitektur"]') as HTMLButtonElement;
                if (chatLauncher) chatLauncher.click();
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-sm transition-all shadow-lg cursor-pointer"
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
