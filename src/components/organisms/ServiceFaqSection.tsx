import { motion, AnimatePresence } from 'motion/react';

interface FaqItem {
  q: string;
  a: string;
}

interface ServiceFaqSectionProps {
  faqs: FaqItem[];
  openFaq: number | null;
  setOpenFaq: (idx: number | null) => void;
}

export default function ServiceFaqSection({ faqs, openFaq, setOpenFaq }: ServiceFaqSectionProps) {
  return (
    <div 
      className="max-w-3xl mx-auto mb-16 text-slate-900"
      itemScope 
      itemType="https://schema.org/FAQPage"
    >
      <div className="text-center mb-12">
        <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-widest block mb-2">Pusat Bantuan &amp; FAQ</span>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
          Pertanyaan Seputar Layanan Ini
        </h2>
        <p className="text-slate-600 font-sans text-sm mt-3 max-w-lg mx-auto">
          Jawaban transparan untuk memastikan ekspektasi dan hasil terbaik bagi implementasi bisnis Anda.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openFaq === idx;
          return (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/90 overflow-hidden transition-all shadow-xs hover:border-purple-300"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left font-display font-bold text-slate-900 text-base sm:text-lg hover:bg-purple-50/50 transition-colors cursor-pointer group"
                aria-expanded={isOpen}
              >
                <span className="group-hover:text-purple-950 transition-colors" itemProp="name">
                  {faq.q}
                </span>
                <motion.span 
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs transition-colors shrink-0 border ${
                    isOpen 
                      ? 'bg-purple-900 text-white border-purple-900 shadow-sm' 
                      : 'bg-slate-100 text-slate-700 border-slate-200 group-hover:bg-purple-100 group-hover:text-purple-900'
                  }`}
                >
                  ↓
                </motion.span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <div 
                      className="px-6 pb-6 text-slate-700 font-sans text-sm sm:text-base leading-relaxed border-t border-slate-100/80 pt-4 bg-purple-50/20"
                      itemProp="text"
                    >
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

