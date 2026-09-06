const fs = require('fs');

const quizzes = `{
  'module-1': {
    id: 'module-1',
    moduleId: 'module-1',
    title: 'Kuis Modul 1: Setup & Konfigurasi Awal',
    description: 'Uji pemahaman Anda tentang fondasi Next.js, manajemen state, dan pengelolaan rahasia.',
    questions: [
      {
        question: 'Mengapa Anda dilarang keras menyimpan kunci rahasia seperti Firebase Admin Private Key dengan awalan NEXT_PUBLIC_ di dalam file .env?',
        options: [
          'Karena hal tersebut akan memicu error "Cannot read properties of undefined" di Vercel',
          'Karena variabel yang diawali NEXT_PUBLIC_ akan dibundel ke dalam file JavaScript statis (Client-side) yang dikirim ke browser, sehingga rahasia tersebut bocor dan dapat dibaca siapa pun lewat DevTools browser',
          'Karena Firebase Admin SDK mewajibkan semua private key disimpan dalam format file binary khusus',
          'Karena Next.js hanya mengizinkan prefix publik untuk file gambar dan stylesheet statis'
        ],
        answer: 1,
        explanation: 'Variabel lingkungan dengan prefix NEXT_PUBLIC_ dikompilasi langsung ke dalam kode JavaScript statis yang diunduh peramban pengguna. Menyimpan rahasia server dengan prefix ini akan membocorkan akses root ke publik!'
      }
    ]
  },
  'module-2': {
    id: 'module-2',
    moduleId: 'module-2',
    title: 'Kuis Modul 2: Arsitektur Backend & Otentikasi',
    description: 'Uji pemahaman Anda tentang arsitektur autentikasi hybrid, Firebase Auth, dan manajemen session cookie.',
    questions: [
      {
        question: 'Dalam arsitektur otentikasi hybrid (Client + Server), apa tujuan utama menukarkan Firebase ID Token menjadi Session Cookie di backend?',
        options: [
          'Menghindari verifikasi token berulang-ulang di setiap operasi database',
          'Memungkinkan proteksi rute di Middleware dan Server-Side Rendering (SSR) secara aman menggunakan cookie HttpOnly yang kebal terhadap serangan XSS',
          'Mempercepat proses komputasi hashing password di peramban klien sebelum dikirim ke API',
          'Menonaktifkan batasan CORS untuk semua API route eksternal'
        ],
        answer: 1,
        explanation: 'Cookie sesi berbendera HttpOnly melindungi token dari serangan XSS karena tidak dapat diakses oleh skrip berbahaya lewat document.cookie. Middleware server dapat membaca status autentikasi sebelum HTML di-render ke pengguna.'
      }
    ]
  },
  'module-3': {
    id: 'module-3',
    moduleId: 'module-3',
    title: 'Kuis Modul 3: Database & State Management',
    description: 'Uji pemahaman Anda tentang desain skema Cloud Firestore dan implementasi Optimistic UI.',
    questions: [
      {
        question: 'Apa keunggulan utama pola "Optimistic UI" saat memperbarui status data atau penyelesaian materi di Cloud Firestore?',
        options: [
          'Mengurangi konsumsi bandwidth jaringan hingga 90%',
          'Antarmuka langsung merespons tindakan pengguna secara instan (0ms latency) tanpa menunggu respon jaringan server, lalu otomatis rollback jika terjadi kegagalan',
          'Menghapus kebutuhan aturan validasi keamanan di Firestore Security Rules',
          'Menjamin semua dokumen selalu tersimpan secara permanen di cache memori server'
        ],
        answer: 1,
        explanation: 'Optimistic UI memperbarui state visual seketika saat tombol ditekan demi sensasi antarmuka yang ultra-responsif (0ms lag). Jika server menolak operasi, state antarmuka akan di-rollback ke kondisi semula secara elegan.'
      }
    ]
  },
  'module-4': {
    id: 'module-4',
    moduleId: 'module-4',
    title: 'Kuis Modul 4: Deployment & Optimasi SEO',
    description: 'Uji pemahaman Anda tentang strategi rendering SSR/SSG dan optimasi Core Web Vitals.',
    questions: [
      {
        question: 'Mengapa Server-Side Rendering (SSR) atau Server Components lebih unggul dibanding Client-Side Rendering murni (CSR) dalam hal SEO dan Core Web Vitals?',
        options: [
          'Karena CSR tidak mendukung penggunaan utilitas CSS seperti Tailwind',
          'Karena SSR mengirimkan dokumen HTML yang sudah terisi konten penuh (pre-rendered), sehingga bot pencari dapat langsung mengindeks konten dan metrik FCP/LCP menjadi optimal',
          'Karena SSR secara otomatis mengompresi gambar tanpa memerlukan komponen gambar',
          'Karena browser memblokir semua request fetch yang dilakukan oleh komponen CSR'
        ],
        answer: 1,
        explanation: 'Search engine crawler (seperti Googlebot) dapat langsung mengindeks konten HTML lengkap saat pertama kali merespons dokumen tanpa menunggu proses eksekusi JavaScript yang lambat.'
      }
    ]
  }
};`;

const template = `import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, BookOpen } from 'lucide-react';
import curriculumData from '../data/academy-curriculum.json';

const DEFAULT_QUIZZES = ${quizzes}

export default function QuizPage() {
  const { moduleId } = useParams();
  const modId = moduleId || 'module-1';
  const quiz = DEFAULT_QUIZZES[modId];
  
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  // To find the next module
  const currentModuleIndex = curriculumData.curriculum.findIndex((m: any) => m.id === modId);
  const nextModule = currentModuleIndex !== -1 && currentModuleIndex < curriculumData.curriculum.length - 1 
    ? curriculumData.curriculum[currentModuleIndex + 1] 
    : null;

  useEffect(() => {
    setCurrentQIndex(0);
    setSelected(null);
    setStatus('idle');
    window.scrollTo(0, 0);
  }, [modId]);

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fbfbfd]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Kuis tidak ditemukan</h2>
          <Link to="/academy/backend-saas" className="text-purple-600 font-medium hover:underline flex items-center gap-2 justify-center">
            <ArrowLeft size={18} /> Kembali ke Akademi
          </Link>
        </div>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQIndex];

  const handleCheck = () => {
    if (selected === null) return;
    if (selected === currentQ.answer) {
      setStatus('correct');
    } else {
      setStatus('incorrect');
    }
  };

  const handleRetry = () => {
    setSelected(null);
    setStatus('idle');
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] pt-24 pb-20 font-sans relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <Link 
          to="/academy/backend-saas" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Kembali ke Materi
        </Link>

        {/* Quiz Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            {quiz.title}
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            {quiz.description}
          </p>
        </div>

        {/* Quiz Box */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-10">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-6 leading-relaxed">
            {currentQ.question}
          </h2>

          <div className="flex flex-col gap-4 mb-8">
            {currentQ.options.map((optionText, idx) => {
              const isSelected = selected === idx;
              let optionStyle = 'border-slate-200 bg-white text-slate-600 hover:border-purple-400 hover:bg-purple-50 hover:shadow-md hover:text-slate-900';
              
              if (isSelected) {
                if (status === 'correct') {
                  optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold shadow-md ring-4 ring-emerald-500/20';
                } else if (status === 'incorrect') {
                  optionStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-semibold shadow-md ring-4 ring-rose-500/20';
                } else {
                  optionStyle = 'border-purple-600 bg-purple-50 text-purple-950 font-semibold shadow-md ring-4 ring-purple-600/20 scale-[1.01]';
                }
              } else if (status === 'correct' || status === 'incorrect') {
                 if (idx === currentQ.answer) {
                   optionStyle = 'border-emerald-400 bg-emerald-50 text-emerald-900 font-semibold shadow-sm ring-2 ring-emerald-400/20';
                 } else {
                   optionStyle = 'border-slate-100 bg-slate-50 text-slate-400 opacity-70';
                 }
              }

              return (
                <motion.button
                  key={idx}
                  whileHover={status === 'idle' ? { scale: 1.01, y: -2 } : {}}
                  whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                  onClick={() => {
                    if (status === 'idle') setSelected(idx);
                  }}
                  disabled={status !== 'idle'}
                  className={\`text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 text-sm sm:text-base flex items-start gap-4 \${optionStyle} \${status === 'idle' ? 'cursor-pointer' : 'cursor-default'}\`}
                >
                  <span className={\`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-300 \${
                    isSelected 
                      ? status === 'correct' ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30' : status === 'incorrect' ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30' : 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-purple-100 group-hover:text-purple-700'
                  }\`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed pt-1 flex-1">{optionText}</span>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {status === 'correct' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-5 sm:p-6 bg-emerald-50 rounded-2xl border border-emerald-200"
              >
                <div className="flex items-center gap-3 font-bold text-emerald-800 mb-3">
                  <CheckCircle2 size={24} className="text-emerald-500" />
                  <span className="text-lg">Jawaban Benar!</span>
                </div>
                <p className="text-emerald-900 text-sm leading-relaxed">
                  {currentQ.explanation}
                </p>
              </motion.div>
            )}

            {status === 'incorrect' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-5 sm:p-6 bg-rose-50 rounded-2xl border border-rose-200"
              >
                <div className="flex items-center gap-3 font-bold text-rose-800 mb-3">
                  <XCircle size={24} className="text-rose-500" />
                  <span className="text-lg">Jawaban Kurang Tepat</span>
                </div>
                <p className="text-rose-900 text-sm leading-relaxed mb-4">
                  {currentQ.explanation}
                </p>
                <button
                  onClick={handleRetry}
                  className="px-5 py-2.5 bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold rounded-xl text-sm transition-colors"
                >
                  Coba Lagi
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex justify-end pt-6 border-t border-slate-100">
            {status === 'idle' && (
              <button 
                onClick={handleCheck}
                disabled={selected === null}
                className="px-8 py-3.5 bg-slate-900 hover:bg-purple-700 text-white font-bold rounded-xl text-sm sm:text-base transition-all disabled:opacity-40 disabled:hover:bg-slate-900 shadow-md"
              >
                Verifikasi Jawaban
              </button>
            )}

            {status === 'correct' && (
              nextModule ? (
                <Link
                  to={\`/academy/quiz/\${nextModule.id}\`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg"
                >
                  Lanjut ke Kuis {nextModule.title} <ArrowRight size={16} />
                </Link>
              ) : (
                <Link
                  to="/academy/backend-saas"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg"
                >
                  <BookOpen size={16} /> Kembali ke Akademi
                </Link>
              )
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/pages/AcademyQuizPage.tsx', template);
