import { motion } from 'motion/react';
import { ArrowUpRight, MessageSquare, Sparkles, Check, CheckCircle2 } from 'lucide-react';
import TextRevealSmooth from '../atoms/TextRevealSmooth';
import LeadCaptureForm from './LeadCaptureForm';

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
      "Optimasi Performa 0.5-1s"
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
  }
];

export default function ContactSection() {
  const openWhatsApp = (msg: string) => {
    window.open(`https://wa.me/6282125447232?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="pricing" className="py-24 md:py-32 relative overflow-hidden bg-transparent select-none text-slate-900">
      {/* Seamless background blending gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.012] to-transparent pointer-events-none" />
      {/* Absolute lighting visual glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#4f46e5]/5 rounded-full filter blur-[150px] pointer-events-none" />
      
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
            <span className="text-[#4f46e5] font-mono text-[10px] uppercase tracking-[0.2em] inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              <Sparkles size={10} className="text-[#4f46e5] animate-pulse" />
              Mulai Inisiatif Anda
            </span>
            <div className="text-fluid-h2 font-display font-medium tracking-tight leading-tight text-slate-900 px-2">
              <TextRevealSmooth 
                text="Inisiasi Kemitraan Digital Strategis." 
                highlightWords={["Kemitraan", "Strategis"]}
                highlightClass="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400"
              />
            </div>
            <p className="text-xs sm:text-sm font-sans text-slate-600 max-w-xl mx-auto leading-relaxed mt-4">
              Transparansi penuh sejak hari pertama. Lengkapi asesmen singkat di bawah untuk mendapatkan estimasi arsitektur proyek, atau pilih langsung model engagement yang sesuai dengan skala bisnis Anda.
            </p>
          </motion.div>
        </div>

        {/* Lead Capture Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-24"
        >
          <LeadCaptureForm />
        </motion.div>

        <div className="text-center mb-12">
           <h3 className="text-2xl md:text-3xl font-display font-medium text-slate-900">
             Pilihan Arsitektur Standar
           </h3>
           <p className="text-slate-500 font-sans mt-2">Atau pilih langsung paket pengembangan yang terukur dan transparan.</p>
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
                    ? 'bg-white border-[#4f46e5]/30 shadow-[0_15px_40px_rgba(79,70,229,0.08)] hover:border-[#4f46e5]/60 hover:-translate-y-1' 
                    : 'bg-slate-50 border-slate-100 hover:border-slate-300 hover:bg-white hover:-translate-y-1'
                }`}
              >
                {/* Subtle highlight label */}
                {isMedium && (
                  <span className="absolute top-4 right-4 bg-indigo-600 text-white text-[9px] font-mono uppercase font-extrabold px-2 py-0.5 rounded-full tracking-wider shadow">
                    Paling Diminati
                  </span>
                )}

                <div>
                  <h3 className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-1">{pkg.title}</h3>
                  <div className="flex items-baseline gap-1.5 mb-4">
                    <span className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">{pkg.price}</span>
                    <span className="text-xs text-slate-500 font-sans">investasi</span>
                  </div>
                  <p className="text-xs font-sans text-slate-600 leading-relaxed mb-6 group-hover:text-gray-800 transition-colors">
                    {pkg.description}
                  </p>

                  {/* Bullet features */}
                  <div className="space-y-2.5 mb-8 border-t border-slate-100 pt-6">
                    {pkg.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2">
                        <Check size={12} className="text-indigo-600 shrink-0" />
                        <span className="text-[11px] font-sans text-gray-700 tracking-wide">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated Custom Button inside the card to trigger action */}
                <div className={`mt-auto w-full py-3 px-4 rounded-xl font-mono text-[10px] uppercase font-bold tracking-widest flex items-center justify-between transition-all ${
                  isMedium 
                    ? 'bg-indigo-600 text-white font-extrabold group-hover:bg-indigo-700' 
                    : 'bg-white text-gray-700 group-hover:bg-slate-900 group-hover:text-white border border-slate-200 group-hover:border-transparent'
                }`}>
                  <span>Pilih Paket Ini</span>
                  <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
