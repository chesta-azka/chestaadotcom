import fs from 'fs';

const content = `import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, XCircle, ArrowRight, BookOpen, Award, RotateCcw, Clock, Trophy, Medal } from 'lucide-react';
import curriculumData from '../data/academy-curriculum.json';

// --- MOCK DATA KUIS (Expanded for multi-question demonstration) ---
const DEFAULT_QUIZZES: Record<string, any> = {
  'module-1': {
    title: 'Kuis Modul 1: Pengenalan & Persiapan',
    description: 'Uji pemahaman Anda tentang fondasi Next.js App Router dan Firebase.',
    questions: [
      {
        question: 'Manakah dari berikut ini yang merupakan kegunaan utama dari route group (seperti (auth)) di Next.js App Router?',
        options: [
          'Memisahkan rute API dari rute UI',
          'Mengatur rute tanpa mempengaruhi struktur URL',
          'Membuat variabel lingkungan menjadi publik',
          'Menginisialisasi Firebase Admin SDK'
        ],
        answer: 1,
        explanation: 'Route group yang ditandai dengan tanda kurung () memungkinkan Anda mengorganisasi file dan layout di dalam folder tanpa menambahkan folder tersebut ke struktur URL publik.'
      },
      {
        question: 'Di mana sebaiknya Firebase Admin SDK diinisialisasi?',
        options: [
          'Di dalam komponen React klien',
          'Di file .env.local',
          'Di sisi server (seperti Route Handlers atau Server Actions)',
          'Di dalam file globals.css'
        ],
        answer: 2,
        explanation: 'Firebase Admin SDK memiliki hak istimewa tinggi dan memerlukan service account key, sehingga HANYA boleh berjalan di sisi server yang aman.'
      }
    ]
  },
  'module-2': {
    title: 'Kuis Modul 2: Arsitektur Backend',
    description: 'Uji pemahaman Anda tentang Autentikasi dan Serverless Functions.',
    questions: [
      {
        question: 'Mengapa kita perlu mengirimkan ID Token Firebase dari klien ke backend (API)?',
        options: [
          'Agar token bisa disimpan di localStorage',
          'Untuk membuat Session Cookie yang aman dan mendukung Server-Side Rendering (SSR)',
          'Untuk menghemat kuota pembacaan Firestore',
          'Agar password pengguna bisa diverifikasi di server'
        ],
        answer: 1,
        explanation: 'Dengan mengirimkan ID Token ke backend, kita dapat membuat session cookie yang tahan lama. Cookie ini akan otomatis disertakan pada setiap request, sehingga server (SSR) mengetahui status login pengguna sebelum merender halaman.'
      }
    ]
  },
  'module-3': {
    title: 'Kuis Modul 3: Database & State',
    description: 'Evaluasi konsep NoSQL Firestore dan manajemen state di React.',
    questions: [
      {
        question: 'Apa prinsip utama dalam mendesain skema NoSQL di Firestore untuk operasi baca yang efisien?',
        options: [
          'Normalisasi data tingkat tinggi',
          'Menggunakan banyak tabel relasional (JOIN)',
          'Denormalisasi data agar setiap dokumen sebisa mungkin mandiri',
          'Menyimpan semua data aplikasi dalam satu dokumen tunggal'
        ],
        answer: 2,
        explanation: 'Dalam Firestore (NoSQL), operasi baca dioptimalkan dengan cara denormalisasi, yaitu menduplikasi beberapa data agar klien bisa mengambil informasi lengkap hanya dengan satu kueri tanpa perlu melakukan JOIN yang berat.'
      }
    ]
  },
  'module-4': {
    title: 'Kuis Modul 4: Deployment & SEO',
    description: 'Uji wawasan Anda terkait Web Vitals dan optimasi produksi.',
    questions: [
      {
        question: 'Manakah metrik Core Web Vitals yang mengukur stabilitas visual (elemen yang bergeser tiba-tiba) saat halaman dimuat?',
        options: [
          'First Input Delay (FID)',
          'Largest Contentful Paint (LCP)',
          'Time to First Byte (TTFB)',
          'Cumulative Layout Shift (CLS)'
        ],
        answer: 3,
        explanation: 'Cumulative Layout Shift (CLS) mengukur seberapa banyak pergeseran tak terduga pada elemen visual selama halaman dirender. CLS yang rendah berarti stabilitas antarmuka yang baik.'
      }
    ]
  }
};

const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Alex Johnson', score: 100, time: '1m 12s' },
  { rank: 2, name: 'Sarah Wu', score: 100, time: '1m 45s' },
  { rank: 3, name: 'Budi Santoso', score: 90, time: '2m 10s' },
  { rank: 4, name: 'David Kim', score: 85, time: '1m 50s' },
  { rank: 5, name: 'Emma Watson', score: 80, time: '2m 30s' },
];

// Audio helper using Web Audio API to avoid external assets
const playTone = (frequency: number, type: OscillatorType, duration: number, vol: number = 0.1) => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Ignore audio errors if context is restricted
  }
};

const playCorrectSound = () => {
  playTone(600, 'sine', 0.1, 0.1);
  setTimeout(() => playTone(800, 'sine', 0.2, 0.1), 100);
};

const playIncorrectSound = () => {
  playTone(300, 'sawtooth', 0.3, 0.1);
  setTimeout(() => playTone(250, 'sawtooth', 0.4, 0.1), 150);
};

export default function AcademyQuizPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const modId = moduleId || '';
  const quiz = DEFAULT_QUIZZES[modId];

  // State Management
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect' | 'timeout'>('idle');
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds per question
  
  // Track all user answers: { questionIndex: { selectedOption, isCorrect } }
  const [answers, setAnswers] = useState<Record<number, { selectedOption: number | null; isCorrect: boolean }>>({});

  // Local Storage Persistence
  useEffect(() => {
    if (modId) {
      const savedState = localStorage.getItem(\`quiz_progress_\${modId}\`);
      if (savedState) {
        try {
          const parsed = JSON.parse(savedState);
          if (parsed.isCompleted) {
            setIsCompleted(true);
            setAnswers(parsed.answers || {});
          } else {
            setCurrentQIndex(parsed.currentQIndex || 0);
            setAnswers(parsed.answers || {});
            
            if (parsed.answers && parsed.answers[parsed.currentQIndex]) {
              setSelected(parsed.answers[parsed.currentQIndex].selectedOption);
              // Handle restoring state, but be careful with timeout
              if (parsed.answers[parsed.currentQIndex].selectedOption === null) {
                setStatus('timeout');
              } else {
                setStatus(parsed.answers[parsed.currentQIndex].isCorrect ? 'correct' : 'incorrect');
              }
            } else {
              setSelected(null);
              setStatus('idle');
              setTimeLeft(60);
            }
          }
        } catch (e) {
          console.error('Failed to parse quiz progress', e);
        }
      } else {
        // Reset state if no saved progress
        setCurrentQIndex(0);
        setAnswers({});
        setSelected(null);
        setStatus('idle');
        setIsCompleted(false);
        setTimeLeft(60);
      }
      window.scrollTo(0, 0);
    }
  }, [modId]);

  // Save to local storage whenever progress changes
  useEffect(() => {
    if (modId) {
      localStorage.setItem(\`quiz_progress_\${modId}\`, JSON.stringify({
        currentQIndex,
        answers,
        isCompleted
      }));
    }
  }, [currentQIndex, answers, isCompleted, modId]);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isCompleted && status === 'idle' && timeLeft > 0 && quiz) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && status === 'idle') {
      handleTimeout();
    }
    return () => clearInterval(timer);
  }, [timeLeft, status, isCompleted, quiz]);

  const currentQ = quiz?.questions[currentQIndex];

  const handleTimeout = useCallback(() => {
    setStatus('timeout');
    playIncorrectSound();
    setAnswers(prev => ({
      ...prev,
      [currentQIndex]: { selectedOption: null, isCorrect: false }
    }));
  }, [currentQIndex]);

  const handleCheck = useCallback(() => {
    if (selected === null) return;
    
    const isCorrect = selected === currentQ.answer;
    
    if (isCorrect) {
      setStatus('correct');
      playCorrectSound();
    } else {
      setStatus('incorrect');
      playIncorrectSound();
    }

    setAnswers(prev => ({
      ...prev,
      [currentQIndex]: { selectedOption: selected, isCorrect }
    }));
  }, [selected, currentQ, currentQIndex]);

  const handleNextQuestion = useCallback(() => {
    if (currentQIndex < quiz.questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelected(null);
      setStatus('idle');
      setTimeLeft(60); // Reset timer
    } else {
      handleFinishQuiz();
    }
  }, [currentQIndex, quiz]);

  // Keyboard navigation effect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere with form inputs if there were any, though this is a quiz page
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) return;

      if (status === 'idle') {
        const key = e.key.toLowerCase();
        // Number keys 1-4
        if (['1', '2', '3', '4'].includes(key)) {
          const index = parseInt(key) - 1;
          if (index < currentQ?.options.length) {
            setSelected(index);
          }
        }
        // Letter keys a-d
        if (['a', 'b', 'c', 'd'].includes(key)) {
          const index = key.charCodeAt(0) - 97;
          if (index < currentQ?.options.length) {
            setSelected(index);
          }
        }
        
        // Enter to verify
        if (e.key === 'Enter' && selected !== null) {
          handleCheck();
        }
      } else if (status === 'correct') {
        // Enter to next question
        if (e.key === 'Enter') {
          handleNextQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, selected, currentQ, handleCheck, handleNextQuestion]);

  const handleFinishQuiz = () => {
    setIsCompleted(true);
    
    // Mark in global completed array
    const saved = localStorage.getItem('academy_completed_quizzes');
    let completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes(modId)) {
      completed.push(modId);
      localStorage.setItem('academy_completed_quizzes', JSON.stringify(completed));
    }
  };

  const handleRetryFullQuiz = () => {
    setIsCompleted(false);
    setCurrentQIndex(0);
    setAnswers({});
    setSelected(null);
    setStatus('idle');
    setTimeLeft(60);
    localStorage.removeItem(\`quiz_progress_\${modId}\`);
  };

  const handleRetryQuestion = () => {
    setSelected(null);
    setStatus('idle');
    setTimeLeft(60);
    const newAnswers = { ...answers };
    delete newAnswers[currentQIndex];
    setAnswers(newAnswers);
  };

  // To find the next module
  const currentModuleIndex = curriculumData.curriculum.findIndex((m: any) => m.id === modId);
  const nextModule = currentModuleIndex !== -1 && currentModuleIndex < curriculumData.curriculum.length - 1 
    ? curriculumData.curriculum[currentModuleIndex + 1] 
    : null;

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fbfbfd]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Kuis tidak ditemukan</h2>
          <Link to="/quiz" className="text-purple-600 font-medium hover:underline flex items-center gap-2 justify-center">
            <ArrowLeft size={18} /> Kembali ke Daftar Kuis
          </Link>
        </div>
      </div>
    );
  }

  // Completion Summary Component
  if (isCompleted) {
    const totalQuestions = quiz.questions.length;
    const correctAnswers = Object.values(answers).filter(a => a.isCorrect).length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    return (
      <div className="min-h-screen bg-[#fbfbfd] pt-24 pb-20 font-sans relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
          <div className="w-full flex justify-start mb-8">
            <Link 
              to="/quiz" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={16} /> Kembali ke Daftar Kuis
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Score Summary */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-10 text-center relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-100/50 to-transparent pointer-events-none" />
              
              <div className="relative z-10 flex-1">
                <div className="w-20 h-20 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <Award size={40} className="text-purple-600" />
                </div>
                
                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Kuis Selesai!</h2>
                <p className="text-slate-500 mb-8">{quiz.title}</p>
                
                <div className="flex justify-center gap-4 mb-10">
                  <div className="bg-slate-50 p-4 rounded-2xl min-w-[100px] border border-slate-100">
                    <div className="text-3xl font-black text-slate-800">{score}%</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-1">Skor Akhir</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl min-w-[100px] border border-slate-100">
                    <div className="text-3xl font-black text-emerald-600">{correctAnswers}/{totalQuestions}</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-1">Benar</div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleRetryFullQuiz}
                    className="w-full px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={18} /> Ulangi Kuis
                  </button>
                  {nextModule ? (
                    <Link
                      to={\`/quiz/\${nextModule.id}\`}
                      className="w-full px-6 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-sm transition-shadow shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      Kuis Berikutnya <ArrowRight size={18} />
                    </Link>
                  ) : (
                    <Link
                      to="/quiz"
                      className="w-full px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-shadow shadow-md flex items-center justify-center gap-2"
                    >
                      <BookOpen size={18} /> Daftar Kuis
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Mock Leaderboard */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl shadow-md border border-slate-200 p-8 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-600">
                  <Trophy size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">Papan Peringkat Global</h3>
                  <p className="text-xs text-slate-500">100 Peserta Teratas</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 flex-1">
                {/* Current user mock entry if score is high */}
                {score >= 80 && (
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-purple-50 border border-purple-200 shadow-sm relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500" />
                    <div className="flex items-center gap-4 pl-2">
                      <span className="font-bold text-purple-700 w-4 text-center">?</span>
                      <div className="font-bold text-slate-900 text-sm">Anda (Saat Ini)</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-black text-purple-700 text-sm">{score} Poin</span>
                      <span className="text-[10px] text-slate-500 font-medium">Baru saja</span>
                    </div>
                  </div>
                )}
                
                {MOCK_LEADERBOARD.map((user, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-5 flex justify-center">
                        {user.rank === 1 ? <Medal size={18} className="text-amber-500" /> 
                         : user.rank === 2 ? <Medal size={18} className="text-slate-400" /> 
                         : user.rank === 3 ? <Medal size={18} className="text-amber-700" /> 
                         : <span className="font-bold text-slate-400 text-sm">{user.rank}</span>}
                      </div>
                      <div className="font-bold text-slate-800 text-sm">{user.name}</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-black text-slate-900 text-sm">{user.score} Poin</span>
                      <span className="text-[10px] text-slate-400 font-medium">{user.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  const progressPercentage = ((currentQIndex) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#fbfbfd] pt-24 pb-20 font-sans relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <Link 
            to="/quiz" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={16} /> Kembali
          </Link>
          <div className="flex items-center gap-3">
            {/* Timer Badge */}
            <div className={\`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold \${
              timeLeft <= 10 
                ? 'bg-rose-100 text-rose-700 animate-pulse' 
                : 'bg-slate-100 text-slate-600'
            }\`}>
              <Clock size={14} />
              <span className="font-mono">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
            </div>

            <div className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
              Pertanyaan {currentQIndex + 1} dari {quiz.questions.length}
            </div>
          </div>
        </div>

        {/* Quiz Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            {quiz.title}
          </h1>
          <div className="flex items-center gap-2 mt-4">
            <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: \`\${progressPercentage}%\` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        {/* Quiz Box with AnimatePresence for transitions */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-10 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQIndex} // Key ensures React treats each question as a new element for animations
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-6 leading-relaxed">
                {currentQ.question}
              </h2>

              <div className="flex flex-col gap-4 mb-8">
                {currentQ.options.map((optionText: string, idx: number) => {
                  const isSelected = selected === idx;
                  let optionStyle = 'border-slate-200 bg-white text-slate-600 hover:border-purple-400 hover:bg-purple-50 hover:shadow-md hover:text-slate-900';
                  
                  if (isSelected) {
                    if (status === 'correct') {
                      optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold shadow-md ring-4 ring-emerald-500/20';
                    } else if (status === 'incorrect' || status === 'timeout') {
                      optionStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-semibold shadow-md ring-4 ring-rose-500/20';
                    } else {
                      optionStyle = 'border-purple-600 bg-purple-50 text-purple-950 font-semibold shadow-md ring-4 ring-purple-600/20 scale-[1.01]';
                    }
                  } else if (status === 'correct' || status === 'incorrect' || status === 'timeout') { 
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
                          ? status === 'correct' ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30' : (status === 'incorrect' || status === 'timeout') ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30' : 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-purple-100 group-hover:text-purple-700'
                      }\`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-relaxed pt-1 flex-1">
                        {optionText}
                      </span>
                      {status === 'idle' && (
                        <span className="opacity-0 group-hover:opacity-100 text-[10px] text-slate-400 font-mono font-bold bg-slate-100 px-1.5 py-0.5 rounded transition-opacity hidden sm:inline-block">
                          {idx + 1}
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="text-center text-xs text-slate-400 font-medium mb-6 sm:mb-8 flex items-center justify-center gap-2">
                <span>Gunakan keyboard <kbd className="font-mono bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">1</kbd>-<kbd className="font-mono bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">4</kbd> atau <kbd className="font-mono bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">A</kbd>-<kbd className="font-mono bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">D</kbd> untuk memilih. Tekan <kbd className="font-mono bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">Enter</kbd> untuk konfirmasi.</span>
              </div>

              <AnimatePresence mode="wait">
                {status === 'correct' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-8 p-5 sm:p-6 bg-emerald-50 rounded-2xl border border-emerald-200 overflow-hidden"
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
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-8 p-5 sm:p-6 bg-rose-50 rounded-2xl border border-rose-200 overflow-hidden"
                  >
                    <div className="flex items-center gap-3 font-bold text-rose-800 mb-3">
                      <XCircle size={24} className="text-rose-500" />
                      <span className="text-lg">Jawaban Kurang Tepat</span>
                    </div>
                    <p className="text-rose-900 text-sm leading-relaxed mb-4">
                      {currentQ.explanation}
                    </p>
                    <button
                      onClick={handleRetryQuestion}
                      className="px-5 py-2.5 bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold rounded-xl text-sm transition-colors"
                    >
                      Ulangi Pertanyaan Ini
                    </button>
                  </motion.div>
                )}
                {status === 'timeout' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-8 p-5 sm:p-6 bg-amber-50 rounded-2xl border border-amber-200 overflow-hidden"
                  >
                    <div className="flex items-center gap-3 font-bold text-amber-800 mb-3">
                      <Clock size={24} className="text-amber-500" />
                      <span className="text-lg">Waktu Habis!</span>
                    </div>
                    <p className="text-amber-900 text-sm leading-relaxed mb-4">
                      Anda tidak memilih jawaban tepat waktu. 
                    </p>
                    <button
                      onClick={handleRetryQuestion}
                      className="px-5 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold rounded-xl text-sm transition-colors"
                    >
                      Ulangi Pertanyaan Ini
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex justify-end pt-6 border-t border-slate-100 mt-4">
                {status === 'idle' && (
                  <button 
                    onClick={handleCheck}
                    disabled={selected === null}
                    className="px-8 py-3.5 bg-slate-900 hover:bg-purple-700 text-white font-bold rounded-xl text-sm sm:text-base transition-all disabled:opacity-40 disabled:hover:bg-slate-900 shadow-md flex items-center gap-2"
                  >
                    <span>Verifikasi Jawaban</span>
                    <span className="hidden sm:inline-block text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono ml-2">↵</span>
                  </button>
                )}
                {(status === 'correct' || (status === 'incorrect' && selected === null) || (status === 'timeout' && selected === null)) && (
                   // If timeout or incorrect but they didn't choose to retry and want to just next? Wait, they only get a retry button. 
                   // Let's only show Next for correct for now to enforce passing. But wait, if they get it wrong, they MUST retry.
                   status === 'correct' && (
                     <button
                       onClick={handleNextQuestion}
                       className="inline-flex items-center gap-2 px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-sm sm:text-base transition-all shadow-md hover:shadow-lg"
                     >
                       <span>{currentQIndex < quiz.questions.length - 1 ? 'Pertanyaan Berikutnya' : 'Selesaikan Kuis'}</span>
                       <span className="hidden sm:inline-block text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono ml-1">↵</span>
                     </button>
                   )
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/pages/AcademyQuizPage.tsx', content);
console.log('AcademyQuizPage updated with timer, keyboard shortcuts, audio, and leaderboard');
