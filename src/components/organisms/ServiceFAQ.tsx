import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs, addDoc, orderBy } from 'firebase/firestore';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

const FALLBACK_FAQS: Record<string, Omit<FAQ, 'id'>[]> = {
  'web-development': [
    { question: 'Berapa lama waktu pembuatan website?', answer: 'Waktu pembuatan sangat bergantung pada kompleksitas fitur. Untuk landing page standar (1-3 halaman) biasanya memakan waktu 1-2 minggu. Sementara custom web app atau e-commerce membutuhkan waktu 4-8 minggu.', order: 1 },
    { question: 'Apakah website sudah termasuk hosting dan domain?', answer: 'Ya, seluruh paket pengembangan web kami sudah termasuk layanan cloud hosting premium dan pendaftaran domain (.com/.id) gratis untuk tahun pertama.', order: 2 },
    { question: 'Apakah saya bisa mengubah konten sendiri nantinya?', answer: 'Tentu. Kami akan menyediakan sistem manajemen konten (CMS) yang intuitif serta panduan penggunaan agar Anda dan tim bisa memperbarui teks, gambar, atau artikel blog secara mandiri.', order: 3 }
  ],
  'ai-agents': [
    { question: 'Bagaimana AI Agent bisa membantu bisnis saya?', answer: 'AI Agent dapat bekerja 24/7 mengotomasi dukungan pelanggan (customer support), memproses kualifikasi prospek (leads), dan menjalankan tugas-tugas administratif rutin tanpa lelah, menghemat waktu tim Anda hingga 70%.', order: 1 },
    { question: 'Apakah AI ini menggunakan ChatGPT/Gemini?', answer: 'Ya, kami mengintegrasikan LLM terkemuka (seperti GPT-4 atau Gemini) yang kami latih secara khusus dengan data bisnis Anda agar jawabannya selalu akurat dan sesuai dengan standar operasi (SOP) perusahaan.', order: 2 }
  ]
};

export default function ServiceFAQ({ serviceSlug }: { serviceSlug: string }) {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const q = query(collection(db, 'faqs'), where('serviceSlug', '==', serviceSlug), orderBy('order', 'asc'));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const fetched: FAQ[] = [];
          querySnapshot.forEach(doc => {
            fetched.push({ id: doc.id, ...doc.data() } as FAQ);
          });
          setFaqs(fetched);
        } else {
          // If no FAQs exist in db, try to add fallback ones to db, then display them
          const fallbacks = FALLBACK_FAQS[serviceSlug] || [
             { question: 'Apakah layanan ini bisa disesuaikan dengan kebutuhan spesifik kami?', answer: 'Tentu, semua layanan kami bersifat kustom dan disesuaikan (tailor-made) untuk menyelesaikan tantangan unik bisnis Anda.', order: 1 },
             { question: 'Bagaimana proses konsultasi awalnya?', answer: 'Kami akan memulai dengan sesi penemuan (discovery session) gratis untuk memahami proses bisnis Anda, lalu kami menyusun proposal teknis dan roadmap implementasi.', order: 2 }
          ];
          
          setFaqs(fallbacks.map((f, i) => ({ id: `temp-${i}`, ...f })));
          
          // Background insert (optimistic)
          Promise.all(fallbacks.map(f => addDoc(collection(db, 'faqs'), { ...f, serviceSlug }))).catch(e => console.error("Could not seed FAQs:", e));
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        // Fallback on error
        const fallbacks = FALLBACK_FAQS[serviceSlug] || [
             { question: 'Apakah layanan ini bisa disesuaikan dengan kebutuhan spesifik kami?', answer: 'Tentu, semua layanan kami bersifat kustom dan disesuaikan (tailor-made) untuk menyelesaikan tantangan unik bisnis Anda.', order: 1 }
        ];
        setFaqs(fallbacks.map((f, i) => ({ id: `temp-${i}`, ...f })));
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, [serviceSlug]);

  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto py-16">
        <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-slate-100 animate-pulse rounded-2xl w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (faqs.length === 0) return null;

  return (
    <section className="w-full max-w-3xl mx-auto py-24 px-6 relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-display font-bold text-slate-900">Frequently Asked Questions</h2>
        <p className="text-slate-500 mt-4">Jawaban atas pertanyaan umum seputar layanan ini.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={faq.id}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-purple-300 bg-white/40 backdrop-blur-2xl shadow-xl shadow-purple-900/5' : 'border-white/40 bg-white/20 backdrop-blur-xl hover:bg-white/40 hover:border-white/60 shadow-sm'}`}
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className={`font-medium text-lg \${isOpen ? 'text-purple-600' : 'text-slate-800'}`}>
                  {faq.question}
                </span>
                <ChevronDown 
                  size={20} 
                  className={`text-slate-400 transition-transform duration-300 \${isOpen ? 'rotate-180 text-purple-500' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 pt-2 text-slate-600 leading-relaxed border-t border-slate-100 mt-2">
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
  );
}
