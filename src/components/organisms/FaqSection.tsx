import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'Berapa lama waktu pengerjaan?', a: 'Biasanya 3-5 hari kerja untuk website standar, tergantung kompleksitas fitur yang diinginkan.' },
  { q: 'Apakah harga sudah termasuk domain dan hosting?', a: 'Kami dapat memberikan rekomendasi, namun biaya domain dan hosting biasanya dipisahkan agar Anda memiliki kontrol penuh atas aset digital Anda.' },
  { q: 'Apakah bisa melakukan revisi setelah desain selesai?', a: 'Tentu, paket kami sudah mencakup hingga 2x sesi revisi minor untuk memastikan hasil akhir sesuai dengan ekspektasi Anda.' },
  { q: 'Bagaimana cara pembayarannya?', a: 'Untuk menjaga komitmen kedua belah pihak, kami menerapkan sistem DP 50% di awal, dan pelunasan sisanya setelah website sudah live dan Anda terima.' },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-transparent border-t border-white/5">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
           initial={{ opacity: 0, scale: 0.8, y: 30 }}
           whileInView={{ opacity: 1, scale: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.6, ease: "easeOut" }}
           className="mb-16 text-center"
        >
          <span className="text-[#D4FF00] font-sans font-medium text-sm uppercase tracking-widest block mb-4">
            07 — F.A.Q
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-white animate-fade-in">
            Pertanyaan Umum
          </h2>
        </motion.div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border border-white/10 bg-[#131825] rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between py-5 px-6 text-left transition-colors hover:bg-white/5"
              >
                <span className="text-lg font-medium text-white">{faq.q}</span>
                <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }}>
                  <ChevronDown className="text-gray-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-gray-400 leading-relaxed font-sans">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
