import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, Brain, Zap, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizEngineProps {
  title: string;
  description: string;
  questions: QuizQuestion[];
  onComplete?: (score: number) => void;
}

export default function QuizEngine({ title, description, questions, onComplete }: QuizEngineProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  // Lead Gen State
  const [email, setEmail] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(index);
    setIsAnswered(true);
    
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
      if (onComplete) onComplete(score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0));
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSubmitted(true);
    // Real implementation would send to Firebase/API
  };

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 max-w-2xl mx-auto w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap size={32} className="text-purple-600" />
          </div>
          <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">Quiz Selesai!</h3>
          <p className="text-slate-600">Anda berhasil menyelesaikan asesmen teknis ini.</p>
        </div>
        
        <div className="bg-slate-50 rounded-xl p-6 mb-8 text-center border border-slate-100">
          <div className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-1">Skor Akhir</div>
          <div className="text-5xl font-display font-black text-purple-700">{percentage}%</div>
          <div className="mt-2 text-sm text-slate-600">
            ({score} dari {questions.length} jawaban benar)
          </div>
        </div>

        {!leadSubmitted ? (
          <form onSubmit={handleLeadSubmit} className="space-y-4">
            <div className="text-center mb-4">
              <h4 className="font-semibold text-slate-900">Dapatkan Analisis Hasil Detail</h4>
              <p className="text-xs text-slate-500 mt-1">Masukkan email untuk mendapatkan roadmap belajar spesifik berdasarkan jawaban Anda.</p>
            </div>
            <div className="flex gap-2">
              <input 
                type="email" 
                required
                placeholder="Email profesional Anda..." 
                className="flex-1 bg-white border border-slate-200 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="bg-purple-900 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-purple-800 transition flex items-center gap-2">
                Kirim <Send size={16} />
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl flex items-start gap-3">
            <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
            <div className="text-sm">
              <strong>Analisis terkirim!</strong> Roadmap belajar telah dikirimkan ke email Anda. Silakan cek kotak masuk Anda beberapa saat lagi.
            </div>
          </div>
        )}
        
        <div className="mt-6 text-center border-t border-slate-100 pt-6">
          <Link to="/academy" className="text-sm font-semibold text-purple-700 hover:underline">
            Kembali ke Academy Hub &rarr;
          </Link>
        </div>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 max-w-2xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <Brain className="text-purple-600" size={24} />
          <h2 className="font-display font-bold text-lg text-slate-900">{title}</h2>
        </div>
        <div className="text-sm font-mono font-medium text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
          Pertanyaan {currentQuestion + 1} / {questions.length}
        </div>
      </div>

      <h3 className="text-xl font-medium text-slate-900 mb-6 leading-relaxed">
        {q.question}
      </h3>

      <div className="space-y-3 mb-8">
        {q.options.map((opt, idx) => {
          let btnClass = "w-full text-left p-4 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center justify-between ";
          
          if (!isAnswered) {
            btnClass += "border-slate-200 hover:border-purple-400 hover:bg-purple-50 text-slate-700";
          } else {
            if (idx === q.correctAnswer) {
              btnClass += "border-green-500 bg-green-50 text-green-900 ring-1 ring-green-500";
            } else if (idx === selectedAnswer) {
              btnClass += "border-red-500 bg-red-50 text-red-900";
            } else {
              btnClass += "border-slate-200 bg-slate-50 text-slate-400 opacity-50";
            }
          }

          return (
            <button 
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={isAnswered}
              className={btnClass}
            >
              <span>{opt}</span>
              {isAnswered && idx === q.correctAnswer && <CheckCircle2 size={18} className="text-green-600" />}
              {isAnswered && idx === selectedAnswer && idx !== q.correctAnswer && <XCircle size={18} className="text-red-600" />}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            className="mb-8 p-4 rounded-xl bg-purple-50 border border-purple-100 text-sm text-purple-900"
          >
            <strong>Penjelasan:</strong> {q.explanation}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end">
        <button 
          onClick={nextQuestion}
          disabled={!isAnswered}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition ${isAnswered ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
        >
          {currentQuestion === questions.length - 1 ? 'Selesaikan Quiz' : 'Pertanyaan Selanjutnya'} 
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
