import { motion } from 'motion/react';
import { ArrowUpRight, MessageSquare, Sparkles, Check, CheckCircle2 } from 'lucide-react';
import TextRevealSmooth from '../atoms/TextRevealSmooth';

interface ChoicePackage {
  title: string;
  price: string;
  description: string;
  features: string[];
  waMessage: string;
}

const packagesList: ChoicePackage[] = [
  {
    title: "Micro Starter",
    price: "Rp350K",
    description: "Launch instan untuk profil digital dasar. Tampil profesional, optimasi Google lokal, dan langsung hadir untuk klien di WhatsApp.",
    features: [
      "Kustom Domain .biz.id (Setahun)",
      "Landing Page Modern & Ringan",
      "Setup Google Maps Local",
      "Integrasi WhatsApp Konsultasi",
      "Optimasi SEO Area Lokal"
    ],
    waMessage: "Halo Mas Chesta! Saya mau ambil Paket Micro Starter Rp350K. Bisa bantu buatkan landing page dasar?"
  },
  {
    title: "UMKM Starter",
    price: "Rp540K",
    description: "Fondasi digital profesional untuk bisnis tumbuh. Visual premium korporat, kecepatan tinggi, memikat calon pelanggan lebih cepat.",
    features: [
      "Kustom Domain .com (Setahun)",
      "Mobile-First & Super Cepat",
      "Desain Visual Premium Korporat",
      "Ready Iklan & SEO Lokal Terintegrasi",
      "Integrasi Tombol WhatsApp Pintar",
      "Optimasi Performa 0.S-1s"
    ],
    waMessage: "Halo Mas Chesta! Saya ingine tingkatkan brand dengan Paket UMKM Starter seharga Rp540K. Boleh info next step-nya?"
  },
  {
    title: "Bisnis Premium",
    price: "Rp2.5M+",
    description: "Solusi profil bisnis lengkap dengan arsitektur konten strategis untuk mengonversi pengunjung menjadi klien setia.",
    features: [
      "Semua fitur Starter",
      "Profil Bisnis Multi-Halaman",
      "Sistem Desain (UI/UX) Eksklusif",
      "Optimasi Performa Web Ekstrim <0.8s",
      "Integrasi Google Analytics & Maps",
      "Strategi & Setup Metadata SEO"
    ],
    waMessage: "Halo Mas Chesta! Saya serius ingin menggunakan Paket Bisnis Premium untuk akselerasi brand saya. Bisa jelaskan strateginya?"
  },
  {
    title: "Custom Performance Hub",
    price: "Bespoke",
    description: "Arsitektur performansi tinggi khusus untuk kebutuhan platform kustom, otomasi alur kerja, dan komputasi digital kompleks.",
    features: [
      "Full-stack Custom Engineering",
      "Integrasi API Pihak Ketiga & Database",
      "Visual Animasi Interaktif Imersif",
      "Audit & Performa Web Enterprise",
      "Konsultasi 1-on-1 Jangka Panjang",
      "Support Teknis Khusus Prioritas"
    ],
    waMessage: "Halo Mas Chesta! Saya memiliki kebutuhan sistem kompleks yang ingin dibangun. Bisa jadwalkan sesi konsultasi strategi?"
  }
];

export default function ContactSection() {
  const openWhatsApp = (msg: string) => {
    window.open(`https://wa.me/6282125447232?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="pricing" className="py-24 md:py-32 relative overflow-hidden bg-transparent select-none text-gray-900">
      {/* Seamless background blending gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.012] to-transparent pointer-events-none" />
      {/* Absolute lighting visual glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#4f46e5]/2 rounded-full filter blur-[150px] pointer-events-none" />
      
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="text-[#4f46e5] font-mono text-[10px] uppercase tracking-[0.2em] inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
              <Sparkles size={10} className="text-[#4f46e5] animate-pulse" />
              Saling Sapa Tanpa Friksi
            </span>
            <div className="text-3xl sm:text-5xl font-display font-medium tracking-tight leading-tight text-gray-900 px-2">
              <TextRevealSmooth 
                text="Inisiasi Bisnis Anda Baru & Keren." 
                highlightWords={["Indonesia", "Keren."]}
                highlightClass="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#4f46e5] to-teal-300"
              />
            </div>
            <p className="text-xs sm:text-sm font-sans text-gray-600 max-w-xl mx-auto leading-relaxed mt-4">
              Sederhanakan peluncuran web Anda secara transparan. Tidak perlu mengisi formulir panjang yang kaku—cukup pilih paket yang menarik minat Anda untuk langsung terhubung di WhatsApp secara manusiawi.
            </p>
          </motion.div>
        </div>

        {/* Dynamic Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
          {packagesList.map((pkg, idx) => {
            const isMedium = idx === 1; // Highlight the Premium plan nicely but subtly
            return (
              <motion.div
                key={pkg.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => openWhatsApp(pkg.waMessage)}
                className={`p-6 sm:p-8 rounded-3xl border text-left cursor-pointer transition-all duration-300 group relative overflow-hidden flex flex-col justify-between ${
                  isMedium 
                    ? 'bg-[#0f1424]/90 border-[#4f46e5]/30 shadow-[0_15px_40px_rgba(79,70,229,0.04)] hover:border-[#4f46e5]/60' 
                    : 'bg-white/[0.01] border-gray-100 hover:border-white/20 hover:bg-[#0b0e17]'
                }`}
              >
                {/* Subtle highlight label */}
                {isMedium && (
                  <span className="absolute top-4 right-4 bg-[#4f46e5] text-black text-[9px] font-mono uppercase font-extrabold px-2 py-0.5 rounded-full tracking-wider shadow">
                    Paling Diminati
                  </span>
                )}

                <div>
                  <h3 className="text-gray-600 text-xs font-mono uppercase tracking-widest mb-1">{pkg.title}</h3>
                  <div className="flex items-baseline gap-1.5 mb-4">
                    <span className="text-3xl sm:text-4xl font-display font-bold text-gray-900 tracking-tight">{pkg.price}</span>
                    <span className="text-xs text-gray-500 font-sans">investasi</span>
                  </div>
                  <p className="text-xs font-sans text-gray-600 leading-relaxed mb-6 group-hover:text-gray-350 transition-colors">
                    {pkg.description}
                  </p>

                  {/* Bullet features */}
                  <div className="space-y-2.5 mb-8 border-t border-gray-100 pt-6">
                    {pkg.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2">
                        <Check size={12} className="text-[#4f46e5] shrink-0" />
                        <span className="text-[11px] font-sans text-gray-700 tracking-wide">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated Custom Button inside the card to trigger action */}
                <div className={`mt-auto w-full py-3 px-4 rounded-xl font-mono text-[10px] uppercase font-bold tracking-widest flex items-center justify-between transition-all ${
                  isMedium 
                    ? 'bg-[#4f46e5] text-black font-extrabold group-hover:bg-[#c2e600]' 
                    : 'bg-gray-100 text-gray-700 group-hover:bg-[#4f46e5] group-hover:text-black border border-gray-200 group-hover:border-transparent'
                }`}>
                  <span>Klaim Awal Paket Ini</span>
                  <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* General Direct Consultation Zone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto rounded-3xl bg-[#090D18] border border-gray-100 p-6 sm:p-8 text-center relative overflow-hidden"
        >
          {/* Subtle green aesthetic background blur */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 filter blur-2xl rounded-full" />
          
          <h4 className="text-sm font-display font-semibold text-gray-900 mb-2 flex items-center justify-center gap-2">
            <MessageSquare size={14} className="text-[#4f46e5]" />
            Masih Ragu / Mau Tanya-Tanya Dulu?
          </h4>
          <p className="text-xs font-sans text-gray-600 leading-relaxed mb-6">
            Kirimkan coretan sketsa kotor, tautan referensi visual luar negeri, atau bagikan ide bisnis lokal kasar Anda langsung via WhatsApp. Kami berjanji akan memberi tanggapan yang tulus, bernilai tinggi, dan bersahabat tanpa biaya sama sekali.
          </p>

          <button
            onClick={() => openWhatsApp("Halo Mas Chesta! Saya mau konsultasi awal dulu kak untuk ide bisnis saya secara santai. Boleh discuss?")}
            className="inline-flex items-center justify-center gap-2 py-4 px-8 bg-[#4f46e5]/10 text-[#4f46e5] border border-[#4f46e5]/20 font-sans font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#4f46e5] hover:text-black hover:border-transparent transition-all cursor-pointer w-full sm:w-auto"
            id="btn-consultation-direct"
          >
            <span>Obrolan Konsultasi Bebas</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </button>
          
          <div className="mt-4 flex justify-center items-center gap-2 font-mono text-[9px] text-gray-500 uppercase tracking-widest">
            <CheckCircle2 size={10} className="text-emerald-400" />
            <span>KONSULTASI AWAL GRATIS SELAMANYA</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
