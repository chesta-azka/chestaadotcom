import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckSquare, ArrowRight, ShieldCheck, Zap, Trophy, Medal, BookOpen, Clock, Award, Terminal, Cpu } from 'lucide-react';

const ASSESSMENT_MODULES = [
  {
    id: 'assessment',
    title: 'Full-Stack AI & Next.js Comprehensive Assessment',
    description: 'Evaluasi lengkap 20 pertanyaan mencakup arsitektur Next.js 15, SSR, manajemen state, dan integrasi AI.',
    category: 'Masterclass',
    questionsCount: 20,
    passingScore: 80,
    duration: '10 Menit',
    icon: Terminal,
    color: 'from-purple-600 to-indigo-900',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200'
  },
  {
    id: 'ai-engineering',
    title: 'Agentic AI & LLM Integration Module',
    description: 'Uji keahlian Anda dalam merancang prompt, function calling, streaming API, dan manajemen konteks.',
    category: 'AI Engineering',
    questionsCount: 15,
    passingScore: 75,
    duration: '8 Menit',
    icon: Cpu,
    color: 'from-cyan-600 to-blue-900',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200'
  },
  {
    id: 'cloud-security',
    title: 'Cloud Firestore & Security Rules Masterclass',
    description: 'Validasi pemahaman rule-based security, RBAC, indeks kueri, dan transaksi aman.',
    category: 'Cloud & Database',
    questionsCount: 15,
    passingScore: 80,
    duration: '8 Menit',
    icon: ShieldCheck,
    color: 'from-emerald-600 to-teal-900',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  }
];

export default function QuizIndexPage() {
  const [completed, setCompleted] = useState<boolean>(false);
  const [highScore, setHighScore] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'Masterclass' | 'AI Engineering' | 'Cloud & Database'>('all');

  useEffect(() => {
    const savedScore = localStorage.getItem('academy_assessment_score');
    if (savedScore) {
      setCompleted(true);
      setHighScore(parseInt(savedScore, 10));
    }
    window.scrollTo(0, 0);
  }, []);

  const filteredModules = selectedDifficulty === 'all' 
    ? ASSESSMENT_MODULES 
    : ASSESSMENT_MODULES.filter(m => m.category === selectedDifficulty);

  return (
    <div className="min-h-screen bg-[#fbfbfd] pt-32 pb-24 font-sans relative selection:bg-purple-200 selection:text-purple-950 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-purple-50/60 rounded-[100%] blur-[140px] -z-10 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-900 text-xs font-mono font-bold mb-6 border border-purple-200 shadow-sm"
          >
            <CheckSquare size={14} className="text-purple-700" />
            <span>Sertifikasi Kompetensi &amp; Evaluasi Interaktif</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-slate-900 mb-6 tracking-tight leading-tight"
          >
            Uji Pemahaman &amp; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-900 via-indigo-800 to-purple-950">
              Sertifikasi Keahlian IT
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            Pilih modul asesmen yang sesuai dengan spesialisasi Anda. Buktikan penguasaan arsitektur modern, rekayasa AI, dan keamanan cloud bersertifikat.
          </motion.p>
        </div>

        {/* Global Stats & Personal Best Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 border border-purple-100">
              <BookOpen size={24} />
            </div>
            <div>
              <span className="text-xs font-mono text-slate-400 block uppercase tracking-wider">Modul Tersedia</span>
              <span className="text-2xl font-bold font-display text-slate-900">3 Modul Spesifik</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
              <Clock size={24} />
            </div>
            <div>
              <span className="text-xs font-mono text-slate-400 block uppercase tracking-wider">Rata-Rata Waktu</span>
              <span className="text-2xl font-bold font-display text-slate-900">8 - 10 Menit</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                <Trophy size={24} />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400 block uppercase tracking-wider">Skor Tertinggi Anda</span>
                <span className="text-2xl font-bold font-display text-slate-900">
                  {highScore !== null ? `${highScore}%` : 'Belum Ada'}
                </span>
              </div>
            </div>
            {completed && (
              <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full uppercase tracking-widest">
                Lulus
              </span>
            )}
          </div>
        </motion.div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {(['all', 'Masterclass', 'AI Engineering', 'Cloud & Database'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedDifficulty(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                selectedDifficulty === cat
                  ? 'bg-purple-950 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat === 'all' ? 'Semua Modul' : cat}
            </button>
          ))}
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredModules.map((mod, index) => {
            const IconComp = mod.icon;
            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${mod.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                      <IconComp size={28} />
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${mod.badgeColor}`}>
                      {mod.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-slate-900 mb-3 group-hover:text-purple-900 transition-colors">
                    {mod.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {mod.description}
                  </p>

                  <div className="space-y-2 mb-8 text-xs font-mono text-slate-500 border-t border-slate-100 pt-4">
                    <div className="flex justify-between">
                      <span>Jumlah Soal:</span>
                      <span className="font-bold text-slate-800">{mod.questionsCount} Pertanyaan</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Passing Grade:</span>
                      <span className="font-bold text-slate-800">{mod.passingScore}% Min. Skor</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimasi Waktu:</span>
                      <span className="font-bold text-slate-800">{mod.duration}</span>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/quiz/${mod.id}`}
                  className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-purple-900 text-white font-sans text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md group-hover:shadow-lg cursor-pointer"
                >
                  <span>Mulai Asesmen</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
