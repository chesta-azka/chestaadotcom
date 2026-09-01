import { motion } from 'motion/react';
import { ArrowUpRight, MessageCircle, Sparkles, Check } from 'lucide-react';
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
    title: "UMKM Starter",
    price: "Rp540K",
    originalPrice: "Rp650K",
    description: "Solusi digital lengkap untuk UMKM & brand modern. Tampilan elegan, responsif smartphone, dan loading super cepat di bawah 1 detik.",
    features: [
      "Domain Resmi .com (1 Tahun Penuh)",
      "Loading Cepat Skor PageSpeed 95+",
      "Desain Visual Modern & Bersih",
      "Optimasi SEO Google & Meta Tag",
      "Integrasi Tombol WhatsApp Interaktif",
      "100% Hak Milik Tanpa Sewa Terkunci"
    ],
    waMessage: "Halo Mas Chesta! Saya ingin memesan Paket UMKM Starter (Promo Rp540K all-in domain .com). Boleh info langkah pengerjaannya?"
  },
  {
    title: "Bisnis Dominance",
    price: "Rp2.5M",
    originalPrice: "Rp3.5M",
    description: "Website profil bisnis multi-halaman dengan struktur konten komprehensif untuk meningkatkan kredibilitas dan konversi klien B2B.",
    features: [
      "Semua fitur UMKM Starter",
      "Struktur Profil Bisnis Multi-Halaman",
      "Desain UI/UX Eksklusif & Interaktif",
      "Optimasi Performa Web Ekstrim <0.8s",
      "Integrasi Google Maps & Analytics",
      "Setup Metadata SEO Mendalam"
    ],
    waMessage: "Halo Mas Chesta! Saya tertarik dengan Paket Bisnis Dominance Rp2.5M untuk profil bisnis kami. Bisa jelaskan strateginya?"
  },
  {
    title: "Enterprise & AI",
    price: "Rp5.5M+",
    description: "Arsitektur kustom dengan database cloud, integrasi otomatisasi cerdas, dan sistem dashboard web skala besar.",
    features: [
      "Semua fitur Bisnis Dominance",
      "Integrasi Otomatisasi AI Kustom",
      "Cloud Database & Realtime API",
      "Live Deployment & Staging Preview",
      "Garansi Maintenance & Technical Support",
      "Konsultasi Arsitektur Berkelanjutan"
    ],
    waMessage: "Halo Mas Chesta! Saya ingin konsultasi solusi Custom Enterprise & AI untuk perusahaan kami. Mohon info waktu diskusinya."
  }
];

export default function ContactSection() {
  const handleOpenWhatsApp = (msg: string) => {
    window.open(`https://wa.me/6282125447232?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="pricing" className="py-20 md:py-28 relative overflow-hidden bg-white select-none text-slate-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <span className="text-[#6b21a8] font-mono text-[11px] uppercase tracking-wider inline-flex items-center gap-1.5 bg-purple-50 px-3.5 py-1 rounded-full border border-purple-100">
              <Sparkles size={11} className="text-[#6b21a8]" />
              Konsultasi & Harga
            </span>
            <div className="text-fluid-h2 font-display font-bold tracking-tight text-slate-900 px-2">
              <TextRevealSmooth 
                text="Mulai Proyek Website Anda Hari Ini." 
                highlightWords={["Website", "Hari Ini"]}
                highlightClass="text-[#6b21a8]"
              />
            </div>
            <p className="text-xs sm:text-sm font-sans text-slate-600 max-w-xl mx-auto leading-relaxed mt-3">
              Pilih paket yang sesuai dengan kebutuhan Anda atau sesuaikan rencana website di bawah untuk langsung terhubung ke WhatsApp.
            </p>
          </motion.div>
        </div>

        {/* Lead Capture to WhatsApp Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-20"
        >
          <LeadCaptureForm />
        </motion.div>

        <div className="text-center mb-10">
          <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900">
            Pilihan Paket Siap Pakai
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm font-sans mt-1">
            Transparansi penuh tanpa biaya tersembunyi & 100% hak milik.
          </p>
        </div>

        {/* Dynamic Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
          {packagesList.map((pkg, idx) => {
            const isPromo = idx === 0;
            return (
              <motion.div
                key={pkg.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onClick={() => handleOpenWhatsApp(pkg.waMessage)}
                className={`p-6 sm:p-7 rounded-3xl border text-left cursor-pointer transition-all duration-200 group flex flex-col justify-between ${
                  isPromo 
                    ? 'bg-purple-50/40 border-purple-200 shadow-md shadow-purple-950/5 hover:border-purple-300 hover:bg-purple-50/70' 
                    : 'bg-white border-slate-200 hover:border-purple-200 hover:shadow-md hover:shadow-purple-950/5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-slate-500 text-xs font-mono uppercase tracking-wider font-semibold">
                      {pkg.title}
                    </h4>
                    {isPromo && (
                      <span className="bg-purple-900 text-white text-[10px] font-mono uppercase font-bold px-2.5 py-0.5 rounded-full">
                        Promo Spesial
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-0.5 mb-3">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-display font-bold text-slate-900 tracking-tight">{pkg.price}</span>
                      <span className="text-xs text-slate-500 font-sans">all-in</span>
                    </div>
                    {pkg.originalPrice && (
                      <span className="text-xs text-slate-400 font-mono line-through">Normal {pkg.originalPrice}</span>
                    )}
                  </div>

                  <p className="text-xs font-sans text-slate-600 leading-relaxed mb-5">
                    {pkg.description}
                  </p>

                  {/* Bullet features */}
                  <div className="space-y-2 mb-6 border-t border-purple-100/60 pt-4">
                    {pkg.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2">
                        <Check size={13} className="text-purple-600 shrink-0 mt-0.5" />
                        <span className="text-xs font-sans text-slate-700">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action Button to WhatsApp */}
                <div className={`mt-auto w-full py-3 px-4 rounded-2xl font-sans text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  isPromo 
                    ? 'bg-purple-900 text-white hover:bg-purple-800 shadow-xs' 
                    : 'bg-purple-50 text-purple-950 hover:bg-purple-100 border border-purple-200'
                }`}>
                  <MessageCircle size={14} />
                  <span>Pesan via WhatsApp</span>
                  <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Clean Location Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <div className="text-center mb-6">
            <h3 className="text-lg md:text-xl font-display font-bold text-slate-900">
              Jangkauan Layanan
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-sans mt-1">
              Berbasis di BSD & Cisauk (Tangerang), melayani klien Jabodetabek hingga seluruh Indonesia secara online.
            </p>
          </div>
          <div className="w-full h-[280px] sm:h-[340px] rounded-3xl overflow-hidden border border-purple-100 shadow-sm relative bg-slate-50">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126907.03473950672!2d106.56847256673163!3d-6.282928399587445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fb20a9906e13%3A0xf775cbab5e8bb720!2sBSD%20City%2C%20Tangerang%2C%20Banten!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade" 
              className="w-full h-full"
              title="Lokasi Layanan CHESTADOTCOM"
            />
            {/* Clean Light Overlay badge */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-purple-100 text-xs font-sans font-medium text-slate-800 flex items-center gap-2 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
              <span>BSD City &bull; Tangerang, Banten</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
