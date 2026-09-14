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
    <div className="max-w-2xl mx-auto mb-16 text-slate-900">
      <div className="text-center mb-12">
        <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest block mb-2">FAQ Klien</span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
          Pertanyaan yang Sering Diajukan
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openFaq === idx;
          return (
            <div key={idx} className="rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200 overflow-hidden transition-all shadow-xs">
              <button
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left font-display font-bold text-slate-900 text-base sm:text-lg hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className={`w-7 h-7 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-xs transition-transform duration-200 shrink-0 border border-slate-200 ${isOpen ? 'rotate-180 bg-slate-900 text-white border-slate-900' : ''}`}>
                  ↓
                </span>
              </button>
              {isOpen && (
                <div className="px-6 pb-6 text-slate-600 font-sans text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
