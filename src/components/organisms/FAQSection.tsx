'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  category?: string;
}

const categoryFaqsMap: Record<string, FAQItem[]> = {
  "AI Automation": [
    {
      question: "Bagaimana Karyawan Digital AI menghemat biaya operasional?",
      answer: "Karyawan Digital AI bekerja 24/7 tanpa cuti, merespons chat prospek dalam milidetik, dan mengeliminasi kebutuhan rekrutmen admin manual hingga 100 percent."
    },
    {
      question: "Apakah AI ini bisa terintegrasi dengan WhatsApp Business korporat?",
      answer: "Ya, kami menginjeksi LLM kustom langsung ke API WhatsApp Business resmi milik perusahaan Anda dengan standar keamanan tingkat bank."
    },
    {
      question: "Berapa lama waktu implementasi sistem AI Automation di Chestaa?",
      answer: "Arsitektur otonom siap di-deploy dalam waktu 5 hingga 10 hari kerja setelah audit infrastruktur selesai."
    }
  ],
  "Performance Web": [
    {
      question: "Kenapa website lambat bisa membunuh hasil iklan Meta & Google saya?",
      answer: "Setiap penundaan 1 detik pada loading website menurunkan konversi hingga 20 percent. Arsitektur Next.js 15 Chestaa menjamin kecepatan sub-detik untuk menyelamatkan ROAS Anda."
    },
    {
      question: "Apa bedanya website buatan Chestaa dibanding WordPress biasa?",
      answer: "Kami tidak menggunakan plugin menumpuk yang memperlambat sistem. Kami merakit infrastruktur dari nol menggunakan Edge Caching dan SSR."
    },
    {
      question: "Bagaimana cara kerja kalkulator keborosan profit di website?",
      answer: "Kalkulator kami menghitung secara matematis jumlah anggaran iklan yang terbuang sia-sia berdasarkan kecepatan muat halaman Anda saat ini."
    }
  ],
  "Enterprise System": [
    {
      question: "Apa itu layanan Fractional CTO dari Chestaa?",
      answer: "Layanan di mana Principal Architect kami masuk untuk membedah sistem perusahaan, membereskan spaghetti code, dan merancang infrastruktur terpusat."
    },
    {
      question: "Bagaimana cara menangani vendor IT lama yang kabur?",
      answer: "Kami melakukan proses Tech Rescue dengan mengaudit kode sumber yang ada, menyelamatkan data penting, dan membangun ulang fondasi keamanan sistem."
    },
    {
      question: "Apakah data korporat kami dijamin aman?",
      answer: "Sistem yang kami bangun dilengkapi enkripsi end-to-end dan arsitektur Secure Cloud Data Vault untuk mencegah kebocoran data."
    }
  ],
  "SEO & AEO": [
    {
      question: "Apa bedanya SEO tradisional dengan Answer Engine Optimization (AEO)?",
      answer: "SEO tradisional fokus mengejar keyword teks di Google, sedangkan AEO mengoptimalkan struktur data JSON-LD agar bisnis Anda direkomendasikan langsung oleh AI seperti ChatGPT dan Gemini."
    },
    {
      question: "Kenapa ranking 1 Google saja tidak cukup untuk closing klien B2B?",
      answer: "Karena sebagian besar pencari keyword receh adalah non-pembeli. AEO menyasar eksekutif dan pembuat keputusan yang mencari solusi bisnis berbiaya tinggi."
    },
    {
      question: "Bagaimana cara Chestaa mendominasi pencarian eksekutif?",
      answer: "Melalui kombinasi Programmatic SEO (PSEO) nasional dan injeksi skema terstruktur tingkat lanjut yang membuat AI mengenali otoritas korporat Anda."
    }
  ]
};

const defaultFaqs: FAQItem[] = [
  {
    question: "Kenapa website lambat bisa membunuh hasil iklan Meta saya?",
    answer: "Website dengan loading di atas 3 detik menyebabkan 50 percent bounce rate. Chestaa menggunakan arsitektur Next.js untuk mencapai kecepatan sub-detik, menyelamatkan budget iklan Anda."
  },
  {
    question: "Bagaimana cara memangkas biaya admin operasional?",
    answer: "Chestaa membangun Karyawan Digital AI yang beroperasi 24/7 tanpa henti, memangkas biaya gaji admin manual hingga 100 percent."
  },
  {
    question: "Apakah Chestaa bisa memperbaiki proyek IT yang mangkrak dari vendor lama?",
    answer: "Ya, layanan Fractional CTO kami fokus melakukan tech rescue, membersihkan spaghetti code, dan menata ulang infrastruktur data perusahaan Anda."
  }
];

export default function FAQSection({ category = 'AI Automation' }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = categoryFaqsMap[category] || defaultFaqs;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-950/30 via-[#0d0d12] to-purple-950/30 border border-indigo-500/30 backdrop-blur-2xl shadow-2xl space-y-8 w-full">
        <div className="space-y-3 text-center sm:text-left">
          <span className="text-xs font-mono font-medium tracking-[0.2em] text-slate-400 uppercase block">
            08. Tanya Jawab Eksekutif · {category}
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-white">
            Pertanyaan Sering Diajukan (FAQ)
          </h2>
          <p className="text-sm text-slate-400">
            Jawaban langsung untuk para eksekutif dan pembuat keputusan korporat.
          </p>
        </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-indigo-500/40"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 flex items-center justify-between text-left font-bold text-white text-base sm:text-lg cursor-pointer gap-4 focus:outline-none"
              >
                <span className="flex items-center gap-3">
                  <span className="text-indigo-400 text-sm font-mono">0{index + 1}.</span>
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 shrink-0"
                >
                  <ChevronDown size={16} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-white/10 text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
    </div>
  );
}
