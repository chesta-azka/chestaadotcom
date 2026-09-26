'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: 'Apakah saya benar-benar memiliki full source code?',
    a: 'Ya, 100%. Kami memberikan hak akses penuh ke repositori Git dan dokumentasi teknis setelah proyek selesai. Tidak ada biaya lisensi bulanan atau ketergantungan pada platform pihak ketiga kami.',
  },
  {
    q: 'Berapa lama waktu pengerjaan website?',
    a: 'Waktu pengerjaan bervariasi tergantung kompleksitas. Rata-rata Landing Page selesai dalam 7-10 hari kerja, sedangkan website korporasi atau e-commerce memakan waktu 3-6 minggu.',
  },
  {
    q: 'Bagaimana dengan maintenance setelah website live?',
    a: 'Setiap proyek mendapatkan garansi pemeliharaan (security patches & bug fixes). Kami juga menawarkan paket maintenance bulanan untuk update konten rutin dan optimasi performa berkelanjutan.',
  },
  {
    q: 'Apakah website saya akan SEO Friendly?',
    a: 'Setiap baris kode yang kami tulis dioptimalkan untuk mesin pencari. Kami menggunakan arsitektur rendering sisi server berkecepatan tinggi yang memberikan performa indexing superior dibandingkan website SPA biasa.',
  },
  {
    q: 'Berapa biaya untuk integrasi AI?',
    a: 'Integrasi AI (seperti Chatbot atau Otomasi Alur Kerja) bersifat add-on. Biaya bergantung pada model AI yang digunakan dan volume data yang diproses. Kami akan memberikan estimasi terperinci selama fase konsultasi.',
  },
];

export default function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-mono font-medium uppercase tracking-widest text-purple-600"
          >
            Pusat Bantuan
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl md:text-4xl font-display font-semibold text-slate-900 tracking-tight"
          >
            Pertanyaan yang Sering Diajukan
          </motion.h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="border border-slate-100 rounded-lg overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <span className={`text-sm md:text-base font-bold tracking-tight transition-colors ${activeIndex === idx ? 'text-purple-600' : 'text-slate-900'}`}>
                  {faq.q}
                </span>
                <div className={`flex-shrink-0 ml-4 transition-transform duration-300 ${activeIndex === idx ? 'rotate-180' : ''}`}>
                  {activeIndex === idx ? (
                    <Minus size={18} className="text-purple-600" />
                  ) : (
                    <Plus size={18} className="text-slate-400 group-hover:text-purple-600" />
                  )}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-6 pb-6 text-slate-500 text-sm md:text-base leading-relaxed border-t border-slate-50 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-slate-50 border border-slate-100 rounded-lg text-center"
        >
          <p className="text-slate-600 text-sm font-medium">
            Masih memiliki pertanyaan lain yang belum terjawab?
          </p>
          <motion.a
            href="https://wa.me/6282125447232"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-purple-600 font-bold text-sm hover:underline"
          >
            Hubungi Technical Support Kami &rarr;
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
