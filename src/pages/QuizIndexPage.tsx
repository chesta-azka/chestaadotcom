import React from 'react';
import { motion } from 'motion/react';
import { Home, ChevronRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import MetaTags from '../components/atoms/MetaTags';
import QuizEngine, { QuizQuestion } from '../components/organisms/QuizEngine';
import { generateQuizSchema } from '../lib/seo';

const assessmentQuestions: QuizQuestion[] = [
  {
    id: 'a1',
    question: 'Saat menggunakan Next.js App Router, komponen yang di-render di sisi server (Server Components) by default TIDAK BISA menggunakan:',
    options: [
      'Environment Variables',
      'Data Fetching via Fetch API',
      'React Hooks seperti useState dan useEffect',
      'Tailwind CSS classes'
    ],
    correctAnswer: 2,
    explanation: 'Server Components dirender di server dan tidak memiliki akses ke browser API atau interaktivitas React client-side (hooks state/lifecycle). Untuk menggunakannya, komponen harus ditandai dengan "use client".'
  },
  {
    id: 'a2',
    question: 'Keuntungan utama menggunakan Tailwind CSS dibandingkan CSS-in-JS (seperti styled-components) dalam proyek Next.js adalah:',
    options: [
      'Tailwind mengizinkan penulisan CSS murni di dalam file terpisah.',
      'Tailwind secara native mengekstrak CSS statis yang dapat di-cache secara agresif, mengurangi beban eksekusi JS saat runtime.',
      'Tailwind membutuhkan konfigurasi webpack yang lebih kompleks yang disukai Google.',
      'Tailwind secara otomatis mengubah desain website menjadi responsif tanpa perlu class tambahan.'
    ],
    correctAnswer: 1,
    explanation: 'CSS-in-JS seringkali menyuntikkan styles saat runtime melalui JavaScript, yang bisa menambah overhead (terutama di arsitektur Server Components baru yang preferensi zero-runtime CSS). Tailwind mem-build stylesheet statis murni.'
  },
  {
    id: 'a3',
    question: 'Pola "Edge Computing" dalam penyebaran aplikasi modern merujuk pada:',
    options: [
      'Menggunakan teknologi browser lama (seperti Microsoft Edge).',
      'Menjalankan logika aplikasi dan caching sedekat mungkin secara geografis dengan pengguna akhir menggunakan CDN terdistribusi.',
      'Mendesain UI dengan sudut (edges) yang tajam.',
      'Menjalankan database di dalam smartphone pengguna.'
    ],
    correctAnswer: 1,
    explanation: 'Edge computing membawa eksekusi code (seperti Middleware atau serverless functions) ke node CDN terdekat dari lokasi geografis pengunjung, mengurangi latency drastis.'
  }
];

export default function QuizIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-purple-100 selection:text-purple-900 pt-24 md:pt-32 pb-24">
      <MetaTags 
        title="Technical Quiz & Assessment | CHESTAADOTCOM Academy BSD & Cisauk"
        description="Uji kemampuan teknis Anda di bidang modern web architecture dan AI. Dapatkan roadmap belajar khusus dari software house elit di BSD City & Cisauk."
        path="/academy/quiz"
        breadcrumbs={[
          { name: 'Home', item: '/' }, 
          { name: 'Academy', item: '/academy' }, 
          { name: 'Technical Quiz', item: '/academy/quiz' }
        ]}
        schemaString={JSON.stringify(generateQuizSchema('Modern Web Architecture Assessment', 'Uji pemahaman Anda terhadap arsitektur web modern', 'https://chestaa.com/academy/quiz'))}
      />
      
      <div className="max-w-4xl mx-auto px-6">
        <motion.nav 
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center gap-2 px-3.5 py-1.5 mb-10 bg-white border border-slate-200 rounded-full w-max font-sans text-xs"
        >
          <Link to="/" className="text-slate-600 hover:text-purple-900 transition-colors flex items-center gap-1 font-medium">
            <Home className="w-3.5 h-3.5" /> Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <Link to="/academy" className="text-slate-600 hover:text-purple-900 transition-colors font-medium">
            Academy & Docs
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-purple-900 font-semibold">Technical Quiz</span>
        </motion.nav>

        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6 tracking-tight">Technical Assessment</h1>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Ikuti asesmen singkat ini untuk mengevaluasi pemahaman teknis Anda. Berdasarkan skor akhir, kami akan mengirimkan rekomendasi materi spesifik ke email Anda.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <QuizEngine 
            title="General Web Architecture Quiz"
            description="Evaluasi pemahaman dasar Anda tentang arsitektur frontend modern."
            questions={assessmentQuestions}
          />
        </motion.div>
      </div>
    </div>
  );
}
