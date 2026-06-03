import { motion } from 'motion/react';
import { Check, ArrowRight, Zap, Target, Star, Globe } from 'lucide-react';

export default function PricingSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-transparent z-10" id="pricing">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4FF00]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-white/[0.03] border border-white/5 mx-auto text-xs font-mono tracking-widest text-[#D4FF00] uppercase mb-6"
          >
            <Star size={12} />
            <span>Investasi Digital</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight mb-6"
          >
            Satu Harga. <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4FF00] to-white">Full Fitur.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 font-sans max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Kami membenci kerumitan paket berjenjang. Anda mendapatkan semua fitur enterprise grade yang Anda butuhkan untuk mendominasi pasar, tanpa biaya tersembunyi.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-[#0D111A]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-2xl"
          >
            {/* Glow accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4FF00]/10 blur-[80px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              <div>
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                     <h3 className="text-2xl font-serif italic text-white">UMKM Dominance</h3>
                     <span className="bg-[#D4FF00] text-[#0A0D14] font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Paling Laris</span>
                  </div>
                  <div className="flex items-end gap-2 text-white">
                    <span className="text-5xl md:text-6xl font-display font-medium tracking-tighter">Rp 550K</span>
                    <span className="text-gray-400 font-mono text-sm mb-2">/ flat</span>
                  </div>
                  <p className="text-red-400/80 font-mono text-xs line-through mt-2 uppercase tracking-wide">Harga Normal Rp 1.250.000</p>
                </div>
                
                <p className="text-gray-300 font-sans leading-relaxed mb-8">
                  Dapatkan arsitektur website premium yang sama dengan klien korporasi kami. Dirancang ekstrem untuk loading cepat, SEO maksimal, dan konversi tinggi.
                </p>

                <button 
                  onClick={() => window.open('https://wa.me/6282125447232?text=Halo%20CHESTADOTCOM,%20saya%20tertarik%20dengan%20paket%20Website%20Premium%20Rp%20550K.', '_blank')}
                  className="group flex items-center justify-center gap-3 w-full rounded-2xl bg-[#D4FF00] px-6 py-5 font-mono text-sm font-bold uppercase tracking-widest text-[#06080F] hover:bg-[#e2ff34] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Globe size={18} />
                  <span>Klaim .COM Gratis Anda</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="lg:border-l lg:border-white/10 lg:pl-12">
                <ul className="space-y-4">
                  {[
                    "Gratis Domain .COM (Tahun Pertama)",
                    "Desain UI/UX Premium Kustom (Bukan Template)",
                    "Performa Ekstrem (Load time < 1 detik)",
                    "SEO Setup Google Standard 2026",
                    "Integrasi Langsung ke WhatsApp Bisnis",
                    "Akses Revisi Desain",
                    "Hosting High-Speed CDN",
                    "Dukungan Teknis Prioritas"
                  ].map((benefit, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#D4FF00]/10 flex items-center justify-center">
                        <Check size={12} className="text-[#D4FF00]" />
                      </div>
                      <span className="text-gray-200 font-sans text-sm md:text-base">{benefit}</span>
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
