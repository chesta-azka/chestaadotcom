import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Clock, BarChart, ArrowRight, Sparkles, Shield, Code, Terminal, ChevronRight, Home } from 'lucide-react';

const COURSES = [
  {
    id: 'fullstack-music-streaming',
    title: 'Full-Stack Music Streaming App Development',
    description: 'Master Web Audio API, Global State Management, and Serverless DB by building a production-ready Spotify clone.',
    category: 'Full-Stack Next.js',
    difficulty: 'Advanced',
    duration: '7 Modul',
    icon: <Terminal size={20} className="text-slate-700" />,
    isNew: true,
  }
];

export default function AcademyPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-purple-100 selection:text-purple-900 pt-24 md:pt-32">
      <main className="max-w-5xl mx-auto px-6 py-12 lg:py-16">
        
        {/* Breadcrumb Navigation */}
        <motion.nav 
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-center gap-2 px-3.5 py-1.5 mb-10 bg-purple-50 border border-purple-100 rounded-full w-max font-sans text-xs"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="text-slate-600 hover:text-purple-900 transition-colors flex items-center gap-1 font-medium">
            <Home className="w-3.5 h-3.5" /> Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-purple-900 font-semibold">Academy & Docs</span>
        </motion.nav>

        {/* Minimalist Hero Section */}
        <div className="flex flex-col items-start mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6 tracking-tight leading-[1.15]">
              Kuasai Arsitektur <br className="hidden md:block" />
              <span className="bg-purple-900 text-white px-3 py-1 rounded-xl shadow-sm inline-flex items-center justify-center w-fit">Teknologi Modern.</span>
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

        
        {/* Quick Link to Resources Checklist */}
        <div className="mb-12">
          <Link 
            to="/academy/resources"
            className="group flex items-center justify-between p-6 bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-3xl shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 group-hover:scale-105 transition-transform">
                <Sparkles size={24} className="text-purple-200" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">Interactive Checklist & Resources</h3>
                <p className="text-sm text-purple-200">Panduan lengkap setup VS Code, Local Env, dan Deploy Vercel dengan checklist interaktif.</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight size={20} className="text-white" />
            </div>
          </Link>
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
                to={`/academy/${course.id}`} 
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