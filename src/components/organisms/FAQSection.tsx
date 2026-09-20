'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'Berapa lama waktu pengerjaan website?',
    answer: 'Waktu pengerjaan bervariasi tergantung kompleksitas proyek. Untuk Landing Page biasanya 1-2 minggu, sementara Sistem Perusahaan (Enterprise) bisa memakan waktu 8-12 minggu. Kami selalu mengutamakan kualitas dan ketelitian dalam setiap baris kode.'
  },
  {
    question: 'Apakah saya akan mendapatkan source code secara penuh?',
    answer: 'Ya, 100%. Kami percaya pada transparansi dan kebebasan klien. Setelah pelunasan, seluruh source code menjadi milik Anda sepenuhnya tanpa ada biaya lisensi tersembunyi atau vendor lock-in.'
  },
  {
    question: 'Bagaimana dengan keamanan data di sistem yang dibangun?',
    answer: 'Keamanan adalah prioritas utama kami. Kami menerapkan standar enkripsi AES-256, perlindungan terhadap SQL Injection, XSS, dan audit keamanan berlapis untuk memastikan aset digital Anda tetap aman dari ancaman siber.'
  },
  {
    question: 'Apakah ada biaya langganan bulanan?',
    answer: 'Kami tidak membebankan biaya langganan untuk software yang kami bangun. Biaya yang mungkin Anda keluarkan adalah untuk infrastruktur cloud (seperti AWS atau Google Cloud) yang dibayarkan langsung ke penyedia layanan, sehingga Anda memiliki kendali penuh atas pengeluaran Anda.'
  },
  {
    question: 'Bisa bantu pindahkan data dari sistem lama kami?',
    answer: 'Tentu saja. Kami memiliki tim ahli migrasi data yang akan membantu memindahkan data dari sistem lama Anda ke infrastruktur baru yang lebih modern secara aman dan tanpa downtime yang berarti.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Pusat Bantuan (FAQ)
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan yang paling sering diajukan mengenai layanan dan proses kerja kami.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-violet-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left bg-white transition-colors"
              >
                <span className="text-lg font-semibold text-slate-900">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="text-violet-600"
                >
                  <ChevronDown size={24} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
