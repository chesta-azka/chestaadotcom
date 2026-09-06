const fs = require('fs');

let content = fs.readFileSync('src/app/academy/[slug]/page.tsx', 'utf-8');

const feedbackWidgetCode = `
const FeedbackWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState<'up'|'down'|null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="fixed bottom-6 right-6 z-50 bg-emerald-50 text-emerald-700 px-6 py-4 rounded-2xl shadow-xl border border-emerald-100 flex items-center gap-3 font-medium no-print">
         <CheckCircle2 size={20} className="text-emerald-500" />
         Terima kasih atas masukannya!
      </div>
    );
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-white border border-slate-200 text-slate-700 px-5 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-purple-200 transition-all font-bold text-sm flex items-center gap-2 no-print group"
      >
        <MessageSquare size={18} className="text-purple-600 group-hover:scale-110 transition-transform" />
        Apakah tutorial ini membantu?
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm no-print"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden border border-slate-100"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="font-bold text-slate-800">Umpan Balik</h3>
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={18} />
                </button>
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-600 mb-4 text-center">Bagaimana kualitas tutorial ini?</p>
                <div className="flex justify-center gap-4 mb-6">
                  <button onClick={() => setRating('up')} className={\`p-4 rounded-xl border-2 transition-colors \${rating === 'up' ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-slate-100 text-slate-400 hover:border-slate-200 hover:bg-slate-50'}\`}>
                     <ThumbsUp size={24} />
                  </button>
                  <button onClick={() => setRating('down')} className={\`p-4 rounded-xl border-2 transition-colors \${rating === 'down' ? 'border-rose-500 bg-rose-50 text-rose-600' : 'border-slate-100 text-slate-400 hover:border-slate-200 hover:bg-slate-50'}\`}>
                     <ThumbsDown size={24} />
                  </button>
                </div>
                <textarea 
                  placeholder="Apa yang bisa kami tingkatkan?"
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 resize-none mb-4"
                  rows={3}
                />
                <button 
                  onClick={() => {
                    setSubmitted(true);
                    setIsOpen(false);
                  }}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors text-sm"
                >
                  Kirim Masukan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
};
`;

if (!content.includes('const FeedbackWidget')) {
  content = content.replace(
    "const ModuleSummary = ({ mod, nextMod }",
    feedbackWidgetCode + "\n\nconst ModuleSummary = ({ mod, nextMod }"
  );
}

fs.writeFileSync('src/app/academy/[slug]/page.tsx', content);

