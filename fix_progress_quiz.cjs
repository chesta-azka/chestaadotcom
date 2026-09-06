const fs = require('fs');

const QUIZ_WIDGET_CODE = `
import confetti from 'canvas-confetti';

const MODULE_QUIZZES: Record<string, {question: string, options: string[], answer: number}> = {
  'module-1': {
    question: 'File manakah yang tepat untuk menyimpan rahasia sisi server seperti FIREBASE_PRIVATE_KEY?',
    options: ['.env.local', '.env.production', 'next.config.js', 'package.json'],
    answer: 0
  },
  'module-2': {
    question: 'Dalam arsitektur serverless, bagaimana cara menyimpan sesi otentikasi yang aman setelah login?',
    options: ['Menyimpan token di localStorage', 'Membuat session cookie dengan Firebase Admin SDK', 'Menyimpan kredensial di window.sessionStorage', 'Menggunakan state Redux'],
    answer: 1
  },
  'module-3': {
    question: 'Apa tujuan dari pendekatan Optimistic UI saat melakukan mutasi data?',
    options: ['Meningkatkan keamanan data', 'Mengurangi biaya database', 'Memberikan ilusi seketika/zero-latency kepada pengguna', 'Menghindari kebutuhan caching server'],
    answer: 2
  },
  'module-4': {
    question: 'Strategi rendering apa yang direkomendasikan untuk halaman pemasaran (landing page) untuk optimasi SEO yang maksimal?',
    options: ['SSR (Server-Side Rendering)', 'CSR (Client-Side Rendering)', 'SSG (Static Site Generation)', 'ISR (Incremental Static Regeneration)'],
    answer: 2
  }
};

const QuizWidget = ({ moduleId }: { moduleId: string }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle'|'correct'|'incorrect'>('idle');
  const quiz = MODULE_QUIZZES[moduleId];

  if (!quiz) return null;

  const handleCheck = () => {
    if (selected === null) return;
    if (selected === quiz.answer) {
      setStatus('correct');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#3b82f6', '#10b981']
      });
    } else {
      setStatus('incorrect');
    }
  };

  return (
    <div className="my-10 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm no-print">
      <div className="flex items-center gap-2 text-purple-600 font-bold mb-4">
        <Sparkles size={18} />
        <span>Uji Pemahaman Modul</span>
      </div>
      <h4 className="text-lg font-bold text-slate-800 mb-6">{quiz.question}</h4>
      <div className="flex flex-col gap-3 mb-6">
        {quiz.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => { setSelected(idx); setStatus('idle'); }}
            className={\`text-left px-5 py-3 rounded-xl border-2 transition-all font-medium text-sm \${
              selected === idx 
                ? 'border-purple-500 bg-purple-50 text-purple-700' 
                : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200 hover:bg-slate-50'
            }\`}
          >
            {opt}
          </button>
        ))}
      </div>
      {status === 'correct' && (
        <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 flex items-center gap-3 font-semibold text-sm">
           <CheckCircle2 size={18} className="text-emerald-500" /> Jawaban Anda Tepat!
        </div>
      )}
      {status === 'incorrect' && (
        <div className="mb-6 p-4 bg-rose-50 text-rose-700 rounded-xl border border-rose-100 flex items-center gap-3 font-semibold text-sm">
           <X size={18} className="text-rose-500" /> Jawaban kurang tepat, coba lagi.
        </div>
      )}
      <button 
        onClick={handleCheck}
        disabled={selected === null || status === 'correct'}
        className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl text-sm hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Periksa Jawaban
      </button>
    </div>
  );
};
`;

const PROGRESS_RING_CODE = `
const ProgressRing = ({ progress }: { progress: number }) => {
  const radius = 9;
  const stroke = 2.5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-6 h-6 flex-shrink-0">
      <svg height="100%" width="100%" className="transform -rotate-90">
        <circle
          stroke="#f1f5f9"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx="50%"
          cy="50%"
        />
        <circle
          stroke={progress === 100 ? "#10b981" : "#a855f7"}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease 0s' }}
          r={normalizedRadius}
          cx="50%"
          cy="50%"
          strokeLinecap="round"
        />
      </svg>
      {progress === 100 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Check size={8} className="text-emerald-500 font-bold" />
        </div>
      )}
    </div>
  );
};
`;

let content = fs.readFileSync('src/app/academy/[slug]/page.tsx', 'utf-8');

// Insert confetti import if not present
if (!content.includes('import confetti from')) {
    content = content.replace(
        "import curriculumData from '../../../data/academy-curriculum.json';",
        "import curriculumData from '../../../data/academy-curriculum.json';\n" + QUIZ_WIDGET_CODE + "\n" + PROGRESS_RING_CODE
    );
}

// Add completedSteps state to the main component
if (!content.includes('completedSteps')) {
    content = content.replace(
        "const [searchQuery, setSearchQuery] = useState('');",
        "const [searchQuery, setSearchQuery] = useState('');\n  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});"
    );
}

// Update the module button in the sidebar to include the Progress Ring instead of CheckCircle/Circle
content = content.replace(
    /\{isActiveModule \? <CheckCircle2 size=\{16\} className="text-purple-600 flex-shrink-0" \/> : <Circle size=\{16\} className="text-slate-300 flex-shrink-0" \/>\}/g,
    \`(() => {
        const total = mod.submodules.length;
        const completed = mod.submodules.filter((s: any) => completedSteps[s.id]).length;
        const progress = total === 0 ? 0 : (completed / total) * 100;
        return <ProgressRing progress={progress} />;
    })()\`
);

// Add "Mark as read" button at the end of each sub-section
const markReadButton = `
                      <div className="mt-8 mb-12 flex justify-end no-print">
                        <button
                          onClick={() => setCompletedSteps(prev => ({...prev, [sub.id]: true}))}
                          className={\`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all \${
                            completedSteps[sub.id] 
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 cursor-default'
                              : 'bg-white border border-slate-200 text-slate-600 hover:border-purple-300 hover:text-purple-600 shadow-sm hover:shadow'
                          }\`}
                          disabled={completedSteps[sub.id]}
                        >
                          {completedSteps[sub.id] ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                          {completedSteps[sub.id] ? 'Selesai Dibaca' : 'Tandai Selesai Dibaca'}
                        </button>
                      </div>
`;

content = content.replace(
    /\{\/\* Interactive Tips - Hidden on Print \*\/\}/g,
    markReadButton + "\n                      {/* Interactive Tips - Hidden on Print */}"
);

// Add QuizWidget at the end of each module
content = content.replace(
    /<\/div>\s*<\/section>\s*\}\)\}\s*<\/div>/g,
    `</div>\n                <QuizWidget moduleId={mod.id} />\n              </section>\n            ))}\n          </div>`
);


fs.writeFileSync('src/app/academy/[slug]/page.tsx', content);

