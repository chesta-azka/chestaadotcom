const fs = require('fs');

let code = `import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Clock, BarChart, ArrowRight, Sparkles, Shield, Code, Terminal } from 'lucide-react';

const COURSES = [
  {
    id: 'enterprise-saas',
    title: 'Enterprise SaaS Development',
    description: 'Master the App Router and React Server Components by building a fully serverless, highly scalable SaaS backend.',
    category: 'Next.js',
    difficulty: 'Advanced',
    duration: '12 Modul',
    icon: <Terminal size={20} className="text-slate-700" />,
    isNew: true,
  },
  {
    id: 'ai-integration',
    title: 'AI & Automation Workflow',
    description: 'Integrasi LLM (Gemini) dan otomatisasi bisnis untuk aplikasi skala produksi.',
    category: 'AI',
    difficulty: 'Intermediate',
    duration: '8 Modul',
    icon: <Sparkles size={20} className="text-slate-700" />,
  }
];

export default function AcademyPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-purple-100 selection:text-purple-900 pt-24 md:pt-32">
      <main className="max-w-5xl mx-auto px-6 py-12 lg:py-16">
        
        {/* Minimalist Hero Section */}
        <div className="flex flex-col items-start mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-slate-900 mb-6 tracking-tight">
              Kuasai Arsitektur <br className="hidden md:block" />
              <span className="text-slate-400">Teknologi Modern.</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-xl leading-relaxed mb-10">
              Platform pembelajaran premium dengan kurikulum standar industri. Dirancang untuk developer yang ingin membangun aplikasi berskala produksi.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-md relative group"
          >
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
            <input 
              type="text"
              placeholder="Cari modul masterclass..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-300 text-slate-800 transition-all text-sm"
            />
          </motion.div>
        </div>

        {/* Courses Grid */}
        <div className="flex flex-col gap-6">
          {COURSES.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase())).map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
            >
              <Link 
                to={\`/academy/\${course.id}\`} 
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 shadow-sm hover:shadow-md transition-all duration-300 gap-6"
              >
                <div className="flex items-start gap-6">
                  {/* Minimalist Icon Box */}
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-white group-hover:border-slate-300 transition-all duration-300">
                    {course.icon}
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        {course.category}
                      </span>
                      {course.isNew && (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                          Baru
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-display font-semibold text-slate-900 mb-2 group-hover:text-purple-700 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed max-w-lg">
                      {course.description}
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-4 sm:mt-0 gap-4 sm:gap-2">
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <BarChart size={14} />
                      {course.difficulty}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {course.duration}
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-400 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 transition-all duration-300">
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
`;

fs.writeFileSync('src/pages/AcademyPage.tsx', code);
console.log('Patched AcademyPage.tsx');
