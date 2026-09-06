const fs = require('fs');

let content = fs.readFileSync('src/app/academy/[slug]/page.tsx', 'utf-8');

// 1. Remove the old QuizWidget definition
const quizWidgetMatch = content.match(/const QuizWidget = \(\{ moduleId \}: \{ moduleId: string \}\) => \{[\s\S]*?(?=const ProgressRing =)/);
if (quizWidgetMatch) {
  content = content.replace(quizWidgetMatch[0], '');
}
const quizDataMatch = content.match(/const MODULE_QUIZZES: Record<string, \{question: string, options: string\[\], answer: number\}> = \{[\s\S]*?(?=const QuizWidget)/);
if (quizDataMatch) {
  content = content.replace(quizDataMatch[0], '');
}

// 2. Change <QuizWidget moduleId={mod.id} /> to a button that navigates to the Quiz page
const newQuizLink = `
                <div className="my-10 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm no-print text-center">
                  <div className="flex items-center justify-center gap-2 text-purple-600 font-bold mb-4">
                    <Sparkles size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-2">Siap untuk Uji Pemahaman?</h4>
                  <p className="text-slate-600 mb-6">Uji pengetahuan Anda tentang {mod.title.replace(/Modul \\d+: /, '')} dengan kuis interaktif.</p>
                  <a href={\`/academy/quiz/\${mod.id}\`} className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-xl text-sm hover:bg-slate-800 transition-colors shadow-lg">
                    Mulai Kuis <Play size={16} className="ml-1" fill="currentColor" />
                  </a>
                </div>
`;
content = content.replace(/<QuizWidget moduleId=\{mod.id\} \/>/g, newQuizLink);

fs.writeFileSync('src/app/academy/[slug]/page.tsx', content);

