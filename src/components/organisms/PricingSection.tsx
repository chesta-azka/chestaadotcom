import { motion } from 'motion/react';
import { Check, ArrowRight, Zap, Target, Star, Globe, Info } from 'lucide-react';
import { useState } from 'react';
import ComparePlansModal from './ComparePlansModal';

export default function PricingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-transparent z-10" id="pricing">
      <ComparePlansModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
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
            className="text-gray-400 font-sans max-w-2xl mx-auto text-lg leading-relaxed mb-8"
          >
            Kami membenci kerumitan paket berjenjang. Anda mendapatkan semua fitur enterprise grade yang Anda butuhkan untuk mendominasi pasar, tanpa biaya tersembunyi.
          </motion.p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-white font-mono text-sm underline transition-colors"
          >
            <Info size={16} />
            Bandingkan dengan layanan lain
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0D111A] border border-white/5 rounded-3xl p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
              <div>
                <h3 className="text-2xl font-display text-white mb-1">UMKM Dominance</h3>
                <span className="text-[#D4FF00] font-mono text-sm">Paket All-In satu harga</span>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-white">Rp 550K</div>
                <div className="text-gray-500 font-mono text-xs line-through">Rp 1.250.000</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <ul className="space-y-3">
                {[ "Gratis Domain .COM", "Desain UI/UX Kustom", "Performa < 1 detik", "SEO Optimized" ].map((item) => (
                   <li key={item} className="flex items-center gap-3 text-gray-300 text-sm">
                      <Check size={16} className="text-[#D4FF00]" /> {item}
                   </li>
                ))}
              </ul>
              <ul className="space-y-3">
                {[ "Integrasi WhatsApp", "Dukungan Prioritas", "Revisi Desain", "Hosting High-Speed" ].map((item) => (
                   <li key={item} className="flex items-center gap-3 text-gray-300 text-sm">
                      <Check size={16} className="text-[#D4FF00]" /> {item}
                   </li>
                ))}
              </ul>
            </div>

            <button 
              onClick={() => window.open('https://wa.me/6282125447232?text=Halo%20CHESTADOTCOM,%20saya%20tertarik%20dengan%20paket%20Website%20Premium%20Rp%20550K.', '_blank')}
              className="w-full py-4 rounded-xl bg-[#D4FF00] text-[#06080F] font-bold uppercase tracking-widest text-sm hover:scale-[1.01] transition-transform"
            >
              Pesan Paket UMKM
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
