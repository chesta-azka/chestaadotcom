import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, XCircle, ArrowRight, BookOpen, Award, RotateCcw, Clock, Trophy, Medal, AlertCircle } from 'lucide-react';
import { QUIZ_BANK, getRandomQuestions } from '../data/quizBank';

const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Alex Johnson', score: 100, time: '3m 12s' },
  { rank: 2, name: 'Sarah Wu', score: 100, time: '3m 45s' },
  { rank: 3, name: 'Budi Santoso', score: 95, time: '4m 10s' },
  { rank: 4, name: 'David Kim', score: 90, time: '3m 50s' },
  { rank: 5, name: 'Emma Watson', score: 85, time: '4m 30s' },
];

// Audio helper
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
    // Ignore audio errors
  }
};

const playClickSound = () => {
  playTone(500, 'sine', 0.08, 0.05);
};

export default function AcademyQuizPage() {
  const navigate = useNavigate();

  // State Management
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({}); // questionIndex -> selectedOptionIndex
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes total or per quiz
  const [scoreAchieved, setScoreAchieved] = useState(0);
  const [reviewMode, setReviewMode] = useState(false);

  // Initialize questions on mount
  useEffect(() => {
    const savedState = localStorage.getItem(`academy_assessment_progress`);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed.isCompleted) {
          setIsCompleted(true);
          setAnswers(parsed.answers || {});
          setQuestions(parsed.questions || []);
          setScoreAchieved(parsed.scoreAchieved || 0);
        } else {
          setQuestions(parsed.questions || getRandomQuestions(20));
          setCurrentQIndex(parsed.currentQIndex || 0);
          setAnswers(parsed.answers || {});
        }
      } catch (e) {
        setQuestions(getRandomQuestions(20));
      }
    } else {
      setQuestions(getRandomQuestions(20));
      setCurrentQIndex(0);
      setAnswers({});
      setIsCompleted(false);
      setTimeLeft(300);
    }
    window.scrollTo(0, 0);
  }, []);

  // Save to local storage whenever progress changes
  useEffect(() => {
    if (questions.length > 0) {
      localStorage.setItem(`academy_assessment_progress`, JSON.stringify({
        questions,
        currentQIndex,
        answers,
        isCompleted,
        scoreAchieved
      }));
    }
  }, [currentQIndex, answers, isCompleted, questions, scoreAchieved]);

  // Overall Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isCompleted && timeLeft > 0 && questions.length > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleFinishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft, isCompleted, questions]);

  const currentQ = questions && questions[currentQIndex] ? questions[currentQIndex] : null;

  const handleSelectOption = useCallback((optionIndex: number) => {
    playClickSound();
    const newAnswers = { ...answers, [currentQIndex]: optionIndex };
    setAnswers(newAnswers);

    // Auto advance immediately without waiting
    if (currentQIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQIndex(prev => prev + 1);
      }, 200);
    } else {
      // Finished all questions
      setTimeout(() => {
        handleFinishQuiz(newAnswers);
      }, 200);
    }
  }, [answers, currentQIndex, questions]);

  const handleFinishQuiz = (finalAnswers = answers) => {
    setIsCompleted(true);
    
    const totalQuestions = questions.length;
    let correctCount = 0;
    
    for (let i = 0; i < totalQuestions; i++) {
      if (finalAnswers[i] !== undefined && finalAnswers[i] === questions[i].answer) {
        correctCount++;
      }
    }

    const finalScore = Math.round((correctCount / totalQuestions) * 100);
    setScoreAchieved(finalScore);

    // Save High Score
    const savedHighScore = localStorage.getItem('academy_assessment_score');
    const previousHigh = savedHighScore ? parseInt(savedHighScore, 10) : 0;
    if (finalScore > previousHigh) {
      localStorage.setItem('academy_assessment_score', finalScore.toString());
    }
  };

  const handleRetryFullQuiz = () => {
    setIsCompleted(false);
    setReviewMode(false);
    setQuestions(getRandomQuestions(20));
    setCurrentQIndex(0);
    setAnswers({});
    setTimeLeft(300);
    setScoreAchieved(0);
    localStorage.removeItem(`academy_assessment_progress`);
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fbfbfd]">
        <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  // Completion Summary Component
  if (isCompleted) {
    const totalQuestions = questions.length;
    let correctAnswers = 0;
    for (let i = 0; i < totalQuestions; i++) {
      if (answers[i] === questions[i].answer) correctAnswers++;
    }
    const score = scoreAchieved;

    return (
      <div className="min-h-screen bg-[#fbfbfd] pt-24 pb-20 font-sans relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-8">
            <Link 
              to="/quiz" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={16} /> Kembali ke Beranda Evaluasi
            </Link>
            <button
              onClick={() => setReviewMode(!reviewMode)}
              className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold rounded-xl text-xs transition-colors border border-purple-200"
            >
              {reviewMode ? 'Sembunyikan Pembahasan' : 'Lihat Pembahasan Soal'}
            </button>
          </div>

          {!reviewMode ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {/* Score Summary */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-10 text-center relative overflow-hidden flex flex-col"
              >
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-100/50 to-transparent pointer-events-none" />
                
                <div className="relative z-10 flex-1">
                  <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${score >= 80 ? 'bg-amber-100' : 'bg-slate-100'}`}>
                    <Award size={40} className={score >= 80 ? 'text-amber-500' : 'text-slate-400'} />
                  </div>
                  
                  <h2 className="text-3xl font-display font-extrabold text-slate-900 mb-2">Evaluasi Selesai!</h2>
                  <p className="text-slate-500 mb-8">{score >= 80 ? 'Luar biasa! Anda menguasai materi dengan sangat baik.' : 'Tetap semangat! Coba pelajari kembali materi dan ulangi evaluasi.'}</p>
                  
                  <div className="flex justify-center gap-4 mb-10">
                    <div className={`p-4 rounded-2xl min-w-[100px] border ${score >= 80 ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200'}`}>
                      <div className={`text-4xl font-black ${score >= 80 ? 'text-amber-600' : 'text-slate-700'}`}>{score}%</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-1">Skor Akhir</div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl min-w-[100px] border border-slate-100">
                      <div className="text-3xl font-black text-emerald-600 mt-1">{correctAnswers}/{totalQuestions}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-2">Benar</div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={handleRetryFullQuiz}
                      className="w-full px-6 py-4 bg-slate-900 hover:bg-purple-700 text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <RotateCcw size={18} /> Ulangi Evaluasi
                    </button>
                    <Link
                      to="/quiz"
                      className="w-full px-6 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold rounded-xl text-sm transition-shadow shadow-sm flex items-center justify-center gap-2"
                    >
                      <BookOpen size={18} /> Kembali ke Menu
                    </Link>
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
                  <div className="p-3 rounded-2xl bg-amber-100 text-amber-600 shadow-inner">
                    <Trophy size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-slate-900 leading-tight">Papan Peringkat</h3>
                    <p className="text-xs font-sans text-slate-500 mt-1">Top Evaluasi Global</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 flex-1">
                  {score >= 80 && (
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-purple-50 border border-purple-200 shadow-sm relative overflow-hidden transform scale-[1.02] z-10">
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-purple-500" />
                      <div className="flex items-center gap-4 pl-3">
                        <span className="font-bold text-purple-700 w-4 text-center">?</span>
                        <div className="font-bold text-slate-900 text-sm">Anda (Baru Saja)</div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-black text-purple-700 text-base">{score} Poin</span>
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
          ) : (
            /* Detailed Review Mode */
            <div className="w-full space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 mb-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">Pembahasan &amp; Kunci Jawaban</h3>
                  <p className="text-xs text-slate-500">Tinjau seluruh pertanyaan dan penjelasan detail.</p>
                </div>
                <button
                  onClick={() => setReviewMode(false)}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
                >
                  Kembali ke Ringkasan
                </button>
              </div>

              {questions.map((q, idx) => {
                const userAns = answers[idx];
                const isCorrect = userAns === q.answer;
                return (
                  <div key={idx} className={`bg-white rounded-2xl p-6 border ${isCorrect ? 'border-emerald-200 bg-emerald-50/20' : 'border-rose-200 bg-rose-50/20'}`}>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                        Soal {idx + 1}
                      </span>
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                          <CheckCircle2 size={14} /> Benar
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-3 py-1 rounded-full">
                          <XCircle size={14} /> Salah / Tidak Terjawab
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-display font-bold text-slate-900 mb-4">
                      {q.question}
                    </h4>

                    <div className="space-y-2 mb-4">
                      {q.options.map((opt: string, optIdx: number) => {
                        const isUserChoice = userAns === optIdx;
                        const isTrueAns = q.answer === optIdx;
                        let optStyle = 'border-slate-200 bg-white text-slate-700';

                        if (isTrueAns) {
                          optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                        } else if (isUserChoice && !isCorrect) {
                          optStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-bold';
                        }

                        return (
                          <div key={optIdx} className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center gap-3 ${optStyle}`}>
                            <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="flex-1">{opt}</span>
                            {isTrueAns && <span className="text-[10px] font-bold text-emerald-700 uppercase bg-emerald-200/60 px-2 py-0.5 rounded">Jawaban Benar</span>}
                            {isUserChoice && !isTrueAns && <span className="text-[10px] font-bold text-rose-700 uppercase bg-rose-200/60 px-2 py-0.5 rounded">Pilihan Anda</span>}
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100 text-xs text-purple-950">
                      <strong>Penjelasan:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!currentQ) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fbfbfd] gap-4">
        <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full" />
        <p className="text-sm font-mono text-slate-500">Memuat soal evaluasi...</p>
        <button
          onClick={handleRetryFullQuiz}
          className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
        >
          Mulai Ulang Kuis
        </button>
      </div>
    );
  }

  const progressPercentage = ((currentQIndex) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#fbfbfd] pt-24 pb-20 font-sans relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-b from-purple-50/50 to-transparent pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Navigation Breadcrumb & Meta */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/quiz" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200"
          >
            <ArrowLeft size={16} /> Batal
          </Link>
          <div className="flex items-center gap-3">
            {/* Timer Badge */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-sm border ${
              timeLeft <= 30 
                ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse' 
                : 'bg-white text-slate-700 border-slate-200'
            }`}>
              <Clock size={16} className={timeLeft <= 30 ? "text-rose-500" : "text-slate-400"} />
              <span className="font-mono w-14 text-center">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-10 bg-white p-4 rounded-3xl shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center gap-4">
           <div className="text-xs font-bold uppercase tracking-widest text-slate-500 whitespace-nowrap">
             Soal {currentQIndex + 1} / {questions.length}
           </div>
           <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden w-full relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
        </div>

        {/* Quiz Box */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-xl border border-white/60 p-6 sm:p-10 min-h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: "anticipate" }}
            >
              <h2 className="text-xl sm:text-2xl font-display font-medium text-slate-900 mb-8 leading-relaxed">
                {currentQ.question}
              </h2>

              <div className="flex flex-col gap-4 mb-8">
                {currentQ.options.map((optionText: string, idx: number) => {
                  const isSelected = answers[currentQIndex] === idx;
                  let optionStyle = 'border-slate-200 bg-white text-slate-600 hover:border-purple-300 hover:bg-purple-50 hover:shadow-md hover:text-slate-900';
                  
                  if (isSelected) {
                    optionStyle = 'border-purple-600 bg-purple-50 text-purple-950 font-semibold shadow-md ring-4 ring-purple-600/20 scale-[1.01]';
                  }

                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.01, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectOption(idx)}
                      className={`text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 text-sm sm:text-base flex items-start gap-4 ${optionStyle} cursor-pointer`}
                    >
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-300 shadow-inner ${
                        isSelected 
                          ? 'bg-purple-600 text-white shadow-purple-600/50'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-purple-100 group-hover:text-purple-700'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-relaxed pt-1 flex-1 font-medium">
                        {optionText}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Navigation Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100/60 mt-4">
                <button
                  onClick={() => {
                    if (currentQIndex > 0) setCurrentQIndex(prev => prev - 1);
                  }}
                  disabled={currentQIndex === 0}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs disabled:opacity-40 hover:bg-slate-50 transition-colors"
                >
                  Sebelumnya
                </button>
                <div className="text-xs font-mono text-slate-400">
                  Pilih opsi untuk lanjut otomatis
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
