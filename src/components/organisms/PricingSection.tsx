import { motion } from 'motion/react';
import { Check, Star, Globe, MessageCircle } from 'lucide-react';

export default function PricingSection() {
  const handleOpenWhatsApp = () => {
    const text = `Halo Mas Chesta! Saya ingin memesan Paket Promo UMKM Rp540K all-in domain .com. Mohon info langkah pengerjaannya.`;
    window.open(`https://wa.me/6282125447232?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="py-8 sm:py-12 relative overflow-hidden bg-transparent z-10 font-sans" id="pricing">
      <div className="w-full">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 mx-auto text-xs font-mono tracking-wider text-purple-900 uppercase mb-4"
          >
            <Star size={12} className="text-purple-600" />
            <span>Paket Spesial UMKM</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mb-4"
          >
            Satu Harga. <span className="text-purple-900">Full Fasilitas.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-600 font-sans max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed"
          >
            Dapatkan website profesional berkecepatan tinggi dengan biaya transparan tanpa biaya tersembunyi.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-white border border-purple-200 rounded-3xl p-6 sm:p-10 overflow-hidden shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
              <div>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                     <h3 className="text-xl font-display font-bold text-slate-900">Paket UMKM Starter</h3>
                     <span className="bg-purple-900 text-white font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">Promo Spesial</span>
                  </div>
                  <div className="flex flex-col gap-1 items-start">
                    <div className="flex items-baseline gap-2 text-slate-900">
                      <span className="text-4xl sm:text-5xl font-display font-black tracking-tight">Rp 540.000</span>
                      <span className="text-slate-500 font-sans text-xs">all-in</span>
                    </div>
                    <p className="text-slate-400 font-mono text-xs line-through">Harga Normal Rp 650.000</p>
                  </div>
                </div>
                
                <p className="text-slate-600 font-sans leading-relaxed mb-6 text-xs sm:text-sm">
                  Infrastruktur website modern berkecepatan tinggi, dioptimalkan untuk performa cepat di ponsel pintar, SEO Google, dan konversi ke WhatsApp.
                </p>

                <div className="space-y-2.5">
                  <a 
                    href={`https://wa.me/6282125447232?text=${encodeURIComponent('Halo Mas Chesta! Saya ingin memesan Paket Promo UMKM Rp540K all-in domain .com. Mohon info langkah pengerjaannya.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full rounded-2xl bg-purple-900 px-6 py-3.5 font-sans text-xs sm:text-sm font-semibold text-white hover:bg-purple-800 transition-all cursor-pointer shadow-sm shadow-purple-950/20"
                  >
                    <MessageCircle size={16} />
                    <span>Chat with us on WhatsApp</span>
                  </a>

                  <button 
                    onClick={() => window.dispatchEvent(new CustomEvent('open-floating-ai'))}
                    className="flex items-center justify-center gap-2 w-full rounded-2xl bg-purple-50 border border-purple-200 px-6 py-3 font-sans text-xs font-semibold text-purple-950 hover:bg-purple-100 transition-all cursor-pointer"
                  >
                    <Globe size={15} />
                    <span>Tanya Asisten AI Web</span>
                  </button>
                </div>
              </div>

              <div className="lg:border-l lg:border-purple-100 lg:pl-10">
                <ul className="space-y-3">
                  {[
                    { text: "Gratis Domain .COM (1 Tahun Penuh)", highlight: true },
                    { text: "Desain Visual Modern & Bersih (Responsif HP)", highlight: false },
                    { text: "Loading Cepat (PageSpeed 95+)", highlight: true },
                    { text: "Setup SEO Google & Metadata Standar 2026", highlight: false },
                    { text: "Integrasi Tombol WhatsApp Langsung", highlight: false },
                    { text: "Hosting Cloud High-Speed & SSL HTTPS Aman", highlight: false },
                    { text: "100% Hak Milik Tanpa Sewa Terkunci", highlight: true },
                    { text: "Pengerjaan Cepat 1–3 Hari Kerja", highlight: false }
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full ${benefit.highlight ? 'bg-purple-900 text-white' : 'bg-purple-100 text-purple-800'} flex items-center justify-center`}>
                        <Check size={10} />
                      </div>
                      <span className={`${benefit.highlight ? 'text-slate-900 font-semibold' : 'text-slate-600'} font-sans text-xs sm:text-sm`}>
                        {benefit.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
