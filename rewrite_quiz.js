import fs from 'fs';

// 1. Rewrite QuizIndexPage.tsx
const quizIndexContent = `import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CheckSquare, ArrowRight, ShieldCheck, Zap, Lock, Filter } from 'lucide-react';
import curriculumData from '../data/academy-curriculum.json';

const CATEGORIES = ['Semua', 'Konfigurasi & Backend', 'Database', 'Optimasi'];

const getCategoryForModule = (modId: string) => {
  if (modId === 'module-1' || modId === 'module-2') return 'Konfigurasi & Backend';
  if (modId === 'module-3') return 'Database';
  if (modId === 'module-4') return 'Optimasi';
  return 'Lainnya';
};

export default function QuizIndexPage() {
  const [completedQuizzes, setCompletedQuizzes] = React.useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('Semua');

  React.useEffect(() => {
    const saved = localStorage.getItem('academy_completed_quizzes');
    if (saved) {
      setCompletedQuizzes(JSON.parse(saved));
    }
    window.scrollTo(0, 0);
  }, []);

  const filteredModules = curriculumData.curriculum.filter((mod: any) => {
    if (activeCategory === 'Semua') return true;
    return getCategoryForModule(mod.id) === activeCategory;
  });

  return (
    <div className="min-h-screen bg-[#fbfbfd] pt-32 pb-20 font-sans relative">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-6 border border-emerald-200"
          >
            <CheckSquare size={14} />
            <span>Sistem Evaluasi Interaktif</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight"
          >
            Uji Pemahaman <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Materi Anda</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Pilih modul kuis di bawah ini untuk menguji pengetahuan Anda setelah mempelajari materi di Akademi.
          </motion.p>
        </div>

        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          <div className="flex items-center gap-2 mr-2 text-slate-400 text-sm font-semibold">
            <Filter size={16} /> Filter:
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={\`px-4 py-2 rounded-full text-sm font-bold transition-all \${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }\`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Quiz Modules List */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredModules.map((mod: any, index: number) => {
              const isCompleted = completedQuizzes.includes(mod.id);
              // Modul 1 always unlocked. Modul > 1 unlocked if the immediate previous module in the curriculum is completed.
              const modIndexInCurriculum = curriculumData.curriculum.findIndex((m: any) => m.id === mod.id);
              const isLocked = modIndexInCurriculum > 0 && !completedQuizzes.includes(curriculumData.curriculum[modIndexInCurriculum - 1].id);
              const category = getCategoryForModule(mod.id);
              
              return (
                <motion.div
                  layout
                  key={mod.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={\`bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col h-full \${
                    isLocked 
                      ? 'border-slate-200 opacity-60 grayscale' 
                      : isCompleted
                      ? 'border-emerald-200 shadow-lg shadow-emerald-900/5 hover:-translate-y-1'
                      : 'border-purple-200 shadow-md hover:shadow-xl hover:shadow-purple-900/10 hover:-translate-y-1'
                  }\`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={\`w-12 h-12 rounded-2xl flex items-center justify-center \${
                      isLocked ? 'bg-slate-100 text-slate-400' : isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-purple-100 text-purple-600'
                    }\`}>
                      {isCompleted ? <ShieldCheck size={24} /> : isLocked ? <Lock size={24} /> : <Zap size={24} />}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                        {category}
                      </span>
                      {isCompleted && (
                        <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          Selesai
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Kuis: {mod.title}</h3>
                  <p className="text-sm text-slate-500 mb-8 flex-1">
                    Uji kompetensi Anda terkait materi {mod.title}.
                  </p>
                  
                  {isLocked ? (
                    <button disabled className="w-full py-3.5 bg-slate-100 text-slate-400 font-bold rounded-xl text-sm flex items-center justify-center gap-2 cursor-not-allowed">
                      <Lock size={16} /> Terkunci (Selesaikan modul sebelumnya)
                    </button>
                  ) : (
                    <Link
                      to={\`/quiz/\${mod.id}\`}
                      className={\`w-full py-3.5 font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-all \${
                        isCompleted
                          ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
                          : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md'
                      }\`}
                    >
                      {isCompleted ? 'Ulangi Kuis' : 'Mulai Kuis'} <ArrowRight size={16} />
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/pages/QuizIndexPage.tsx', quizIndexContent);
console.log('QuizIndexPage updated');
