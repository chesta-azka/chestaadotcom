import { motion } from 'motion/react';
import { ArrowUpRight, MessageSquare, Sparkles, Check, CheckCircle2 } from 'lucide-react';
import TextRevealSmooth from '../atoms/TextRevealSmooth';
import LeadCaptureForm from './LeadCaptureForm';

interface ChoicePackage {
  title: string;
  price: string;
  originalPrice?: string;
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
    originalPrice: "Rp650K",
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#6b21a8]/5 rounded-full filter blur-[150px] pointer-events-none" />
      
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
            <span className="text-[#6b21a8] font-mono text-[10px] uppercase tracking-[0.2em] inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              <Sparkles size={10} className="text-[#6b21a8] animate-pulse" />
              Mulai Inisiatif Anda
            </span>
            <div className="text-fluid-h2 font-display font-medium tracking-tight leading-tight text-slate-900 px-2">
              <TextRevealSmooth 
                text="Inisiasi Kemitraan Digital Strategis." 
                highlightWords={["Kemitraan", "Strategis"]}
                highlightClass="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400"
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
                    ? 'bg-white/40 backdrop-blur-xl border-[#6b21a8]/30 shadow-xl shadow-purple-900/5 hover:border-[#6b21a8]/60 hover:bg-white/60 hover:-translate-y-1' 
                    : 'bg-white/20 backdrop-blur-md border-white/60 hover:border-white hover:bg-white/40 shadow-sm hover:shadow-xl hover:shadow-purple-900/5 hover:-translate-y-1'
                }`}
              >
                {/* Subtle highlight label */}
                {isMedium && (
                  <span className="absolute top-4 right-4 bg-purple-600 text-white text-[9px] font-mono uppercase font-extrabold px-2 py-0.5 rounded-full tracking-wider shadow">
                    Paling Diminati
                  </span>
                )}

                <div>
                  <h3 className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-1">{pkg.title}</h3>
                  <div className="flex flex-col gap-1 mb-4">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">{pkg.price}</span>
                      <span className="text-xs text-slate-500 font-sans">investasi</span>
                    </div>
                    {pkg.originalPrice && (
                      <span className="text-xs text-slate-400 font-mono line-through uppercase tracking-wider">Normal {pkg.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-xs font-sans text-slate-600 leading-relaxed mb-6 group-hover:text-gray-800 transition-colors">
                    {pkg.description}
                  </p>

                  {/* Bullet features */}
                  <div className="space-y-2.5 mb-8 border-t border-slate-100 pt-6">
                    {pkg.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2">
                        <Check size={12} className="text-purple-600 shrink-0" />
                        <span className="text-[11px] font-sans text-gray-700 tracking-wide">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated Custom Button inside the card to trigger action */}
                <div className={`mt-auto w-full py-3 px-4 rounded-xl font-mono text-[10px] uppercase font-bold tracking-widest flex items-center justify-between transition-all ${
                  isMedium 
                    ? 'bg-purple-600 text-white font-extrabold group-hover:bg-purple-700' 
                    : 'bg-white text-gray-700 group-hover:bg-slate-900 group-hover:text-white border border-slate-200 group-hover:border-transparent'
                }`}>
                  <span>Pilih Paket Ini</span>
                  <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>


        {/* Location Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-display font-medium text-slate-900">
              Jangkauan Operasional
            </h3>
            <p className="text-sm text-slate-500 font-sans mt-2">
              Berbasis di BSD & Cisauk, melayani seluruh kawasan Jabodetabek hingga Nasional.
            </p>
          </div>
          <div className="w-full h-[300px] sm:h-[400px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126907.03473950672!2d106.56847256673163!3d-6.282928399587445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fb20a9906e13%3A0xf775cbab5e8bb720!2sBSD%20City%2C%20Tangerang%2C%20Banten!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade" 
              className="absolute inset-0 invert-[.95] hue-rotate-180 brightness-[.85] contrast-[1.1] opacity-90 hover:opacity-100 transition-all duration-700 ease-in-out"
              title="Operational Area Map"
            />
            {/* Overlay hint */}
            <div className="absolute top-4 left-4 bg-[#090D18]/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/10 text-xs font-mono font-bold text-white flex items-center gap-2 pointer-events-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6b21a8] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6b21a8]"></span>
              </span>
              Headquarters Region
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
