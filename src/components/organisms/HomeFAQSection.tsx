'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

interface FAQItem {
  number: string;
  question: string;
  answer: string;
}

const HOME_FAQS: FAQItem[] = [
  {
    number: '01',
    question: 'Bagaimana cara menentukan solusi digital yang paling sesuai untuk bisnis kami?',
    answer: 'Kami memulai dari pemahaman alur kerja dan kendala harian tim Anda. Melalui sesi konsultasi awal, kami memetakan prioritas utama, mengidentifikasi proses yang paling membebani, dan merekomendasikan solusi terarah—apakah integrasi ERP, otomatisasi proses, toko online, atau pengembangan web kustom.',
  },
  {
    number: '02',
    question: 'Apakah sistem dapat diterapkan secara bertahap tanpa mengganggu operasional yang berjalan?',
    answer: 'Tentu. Kami menerapkan pendekatan bertahap (phased rollout). Modul-modul dengan dampak tertinggi diimplementasikan lebih dahulu sehingga tim Anda dapat beradaptasi secara mulus tanpa distraksi atau downtime pada operasional sehari-hari.',
  },
  {
    number: '03',
    question: 'Apakah kami mendapatkan kepemilikan penuh atas kode program dan aset sistem?',
    answer: 'Ya, 100%. Kami memberikan hak kepemilikan penuh atas source code, repositori, dan dokumentasi teknis setelah serah terima proyek. Tidak ada biaya sewa lisensi tersembunyi atau penguncian platform (vendor lock-in).',
  },
  {
    number: '04',
    question: 'Berapa lama rata-rata waktu pengerjaan dari tahap pemahaman hingga go-live?',
    answer: 'Waktu implementasi disesuaikan dengan skala dan cakupan yang disepakati bersama. Landing page atau sistem terfokus biasanya rampung dalam 1–2 minggu, sementara implementasi sistem terintegrasi (ERP atau sistem operasional korporat) rata-rata memakan waktu 3–6 minggu.',
  },
  {
    number: '05',
    question: 'Bagaimana dukungan teknis dan pemeliharaan setelah sistem mulai digunakan?',
    answer: 'Setiap penerapan mencakup masa garansi teknis, pemantauan stabilitas sistem, dan pelatihan tim operasional. Kami juga menyediakan opsi pendampingan berkala agar sistem terus berkembang selaras dengan pertumbuhan skala bisnis Anda.',
  },
];

export default function HomeFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      className="py-20 sm:py-28 w-full bg-slate-50/60 text-slate-900 border-t border-slate-200/80 relative overflow-hidden text-left" 
      id="faq"
      aria-label="Pertanyaan yang sering diajukan"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
        
        {/* Section Header: Fully Left-Aligned Editorial Hierarchy */}
        <div className="max-w-4xl space-y-4 mb-14 sm:mb-16 text-left">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-semibold tracking-[0.2em] text-purple-700 uppercase">
              TANYA JAWAB
            </span>
            <span className="w-12 h-px bg-purple-200" aria-hidden="true" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-950 tracking-tight leading-[1.12]">
            Pertanyaan yang sering<br className="hidden sm:inline" /> diajukan.
          </h2>

          <p className="text-base sm:text-lg font-sans text-slate-600 leading-relaxed font-normal pt-1 max-w-3xl">
            Jawaban lugas dan transparan seputar cara kerja, tahapan implementasi, hingga kepemilikan sistem untuk mendukung keputusan bisnis Anda.
          </p>
        </div>

        {/* FAQ Accordion List (Clean Editorial Line-Bordered Style) */}
        <div className="border-t border-slate-200/80 divide-y divide-slate-200/80">
          {HOME_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={faq.number} 
                className="py-6 sm:py-7 transition-colors hover:bg-slate-100/40 rounded-lg px-2 sm:px-4 -mx-2 sm:-mx-4"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-start justify-between gap-6 text-left cursor-pointer focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <span className="font-mono text-xs sm:text-sm font-bold text-purple-700 pt-0.5 shrink-0 block">
                      {faq.number}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight group-hover:text-purple-900 transition-colors">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="shrink-0 pt-0.5">
                    <span className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-purple-700 group-hover:border-purple-300 transition-colors">
                      {isOpen ? (
                        <Minus size={15} strokeWidth={2} />
                      ) : (
                        <Plus size={15} strokeWidth={2} />
                      )}
                    </span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="pl-8 sm:pl-12 pr-4 pt-3 sm:pt-4 text-slate-600 text-sm sm:text-base leading-relaxed font-sans font-normal max-w-3xl">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
