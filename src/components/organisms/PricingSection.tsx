import { motion } from 'motion/react';
import { Check, ArrowRight, Zap, Target, Star, Globe } from 'lucide-react';

export default function PricingSection() {
  return (
    <section className="py-4 sm:py-8 relative overflow-hidden bg-transparent z-10" id="pricing">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6b21a8]/5 rounded-full blur-[100px]" />
      </div>

      <div className="w-full">
        <div className="text-center mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-white/[0.03] border border-slate-100 mx-auto text-xs font-mono tracking-widest text-[#6b21a8] uppercase mb-6"
          >
            <Star size={12} />
            <span>Investasi Digital</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-fluid-h2 font-display font-medium text-slate-900 tracking-tight mb-6"
          >
            Satu Harga. <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#6b21a8] to-purple-300">Full Fitur.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-600 font-sans max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Kami membenci kerumitan paket berjenjang. Anda mendapatkan semua fitur enterprise grade yang Anda butuhkan untuk mendominasi pasar, tanpa biaya tersembunyi.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-[0_20px_40px_-15px_rgba(107,33,168,0.1)]"
          >
            {/* Glow accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#6b21a8]/10 blur-[80px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              <div>
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                     <h3 className="text-2xl font-serif italic text-slate-900">UMKM Dominance</h3>
                     <span className="bg-[#6b21a8] text-white font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Paling Laris</span>
                  </div>
                  <div className="flex flex-col gap-1 items-start">
                    <div className="flex items-baseline gap-2 text-slate-900">
                      <span className="text-6xl md:text-7xl font-display font-black tracking-tighter">Rp 540K</span>
                      <span className="text-slate-600 font-mono text-sm mb-2">/ flat</span>
                    </div>
                    <p className="text-slate-400 font-mono text-sm line-through uppercase tracking-wide">Harga Normal Rp 650.000</p>
                  </div>
                </div>
                
                <p className="text-gray-700 font-sans leading-relaxed mb-8 text-lg">
                  Dapatkan arsitektur website premium yang sama dengan klien korporasi kami. Dirancang ekstrem untuk loading cepat, SEO maksimal, dan konversi tinggi.
                </p>

                <button 
                  onClick={() => window.open('https://wa.me/6282125447232?text=Halo%20CHESTAADOTCOM,%20saya%20tertarik%20dengan%20paket%20Website%20Premium%20Rp%20540K.', '_blank')}
                  className="group flex flex-col items-center justify-center gap-1 w-full rounded-2xl bg-[#6b21a8] px-6 py-5 font-mono text-sm font-bold uppercase tracking-widest text-white hover:bg-purple-500 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="flex items-center gap-2">
                    <Globe size={18} />
                    Klaim .COM Gratis Sekarang
                  </span>
                  <span className="text-[10px] opacity-70">Terbatas untuk 10 slot pertama</span>
                </button>
              </div>

              <div className="lg:border-l lg:border-slate-200 lg:pl-12">
                <ul className="space-y-4">
                  {[
                    { text: "Gratis Domain .COM (Tahun Pertama)", highlight: true },
                    { text: "Desain UI/UX Premium Kustom (Bukan Template)", highlight: false },
                    { text: "Performa Ekstrem (Load time < 1 detik)", highlight: false },
                    { text: "SEO Setup Google Standard 2026", highlight: false },
                    { text: "Integrasi Langsung ke WhatsApp Bisnis", highlight: false },
                    { text: "Akses Revisi Desain", highlight: false },
                    { text: "Hosting High-Speed CDN", highlight: false },
                    { text: "Dukungan Teknis Prioritas", highlight: false }
                  ].map((benefit, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full ${benefit.highlight ? 'bg-[#6b21a8]' : 'bg-[#6b21a8]/10'} flex items-center justify-center`}>
                        <Check size={12} className={benefit.highlight ? 'text-white' : 'text-[#6b21a8]'} />
                      </div>
                      <span className={`${benefit.highlight ? 'text-slate-900 font-bold' : 'text-slate-600'} font-sans text-sm md:text-base`}>
                        {benefit.text}
                      </span>
                    </motion.li>
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
