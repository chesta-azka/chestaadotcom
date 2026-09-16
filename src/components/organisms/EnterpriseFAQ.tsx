import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

const faqData = [
  {
    question: "Bagaimana alur kerja pengembangan di Chestaa?",
    answer: "Kami menggunakan metodologi Agile yang terbagi dalam 4 fase utama: Discovery & Audit, High-Fidelity Design, Sprint Development (Frontend & Backend), dan Rigorous QA/Testing. Anda akan mendapatkan akses ke dashboard proyek untuk memantau progres secara real-time."
  },
  {
    question: "Berapa lama waktu yang dibutuhkan untuk membangun website?",
    answer: "Project timeline bervariasi tergantung kompleksitas. Website korporat standar biasanya selesai dalam 3-4 minggu, sementara platform SaaS atau E-commerce kompleks dengan integrasi API khusus membutuhkan 8-12 minggu."
  },
  {
    question: "Apakah ada biaya tersembunyi (hidden fees)?",
    answer: "Tidak ada. Semua biaya (development, integrasi pihak ketiga, dan infrastruktur cloud awal) akan dirincikan secara transparan dalam penawaran tertulis sebelum kontrak dimulai."
  },
  {
    question: "Bagaimana dengan dukungan pasca-rilis (Maintenance)?",
    answer: "Setiap proyek mencakup 3 bulan dukungan pemeliharaan kritis gratis. Kami juga menawarkan paket 'Elite Managed Services' untuk optimasi berkala, pembaruan keamanan, dan penambahan fitur baru."
  },
  {
    question: "Bisakah saya mengintegrasikan sistem internal yang sudah ada?",
    answer: "Tentu. Kami memiliki spesialisasi dalam membangun middleware dan API gateway untuk menghubungkan stack teknologi modern dengan sistem legacy (ERP, CRM, atau Database internal) perusahaan Anda."
  }
];

function FAQItem({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) {
  return (
    <div className={`border-b border-slate-100 transition-colors duration-300 ${isOpen ? 'bg-purple-50/30' : ''}`}>
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className={`text-lg font-display font-bold transition-colors duration-300 ${isOpen ? 'text-purple-700' : 'text-slate-900'}`}>
          {question}
        </span>
        <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${isOpen ? 'bg-purple-600 border-purple-600 text-white' : 'border-slate-200 text-slate-400 group-hover:border-purple-300 group-hover:text-purple-500'}`}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-8 pr-12 text-slate-600 font-sans leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function EnterpriseFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="py-24 sm:py-32">
      <div className="grid lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-5">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-[10px] font-bold text-purple-700 tracking-widest uppercase mb-6"
          >
            FAQ & Knowledge Base
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight mb-8"
          >
            Pertanyaan Umum <br /> Mengenai Kerjasama
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 font-sans text-lg leading-relaxed mb-10"
          >
            Kami percaya bahwa transparansi adalah kunci keberhasilan setiap proyek digital. Berikut adalah beberapa hal yang paling sering ditanyakan oleh klien enterprise kami.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-2xl bg-slate-900 text-white relative overflow-hidden"
          >
            <div className="relative z-10">
              <h4 className="text-xl font-display font-bold mb-2">Masih punya pertanyaan?</h4>
              <p className="text-slate-400 text-sm mb-6">Tim konsultan teknis kami siap membantu Anda 24/7.</p>
              <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full text-sm font-bold transition-all duration-300">
                Jadwalkan Konsultasi Gratis
              </button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-3xl -mr-16 -mt-16" />
          </motion.div>
        </div>

        <div className="lg:col-span-7">
          <div className="border-t border-slate-100">
            {faqData.map((item, idx) => (
              <FAQItem
                key={idx}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === idx}
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
