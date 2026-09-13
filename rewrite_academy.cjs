const fs = require('fs');

const code = `import React, { useState, useMemo } from 'react';
import MetaTags from '../components/atoms/MetaTags';
import { generateCourseSchema } from '../lib/seo';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Code, ArrowRight, BrainCircuit, Terminal, Filter, X } from 'lucide-react';
import { ALL_ARTICLES } from '../data/blogData';
import { PROJECTS } from '../data/projects';

type ResourceType = 'all' | 'article' | 'case-study' | 'quiz';

export default function AcademyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<ResourceType>('all');

  const unifiedResources = useMemo(() => {
    const resources = [
      ...ALL_ARTICLES.map(a => ({
        id: a.slug,
        type: 'article' as const,
        title: a.title,
        description: a.desc,
        link: \`/blog/\${a.slug}\`,
        category: a.cat,
        tags: a.tags || [],
        meta: a.date,
        featured: a.featured,
        icon: <BookOpen className="text-slate-900" size={24} />
      })),
      ...PROJECTS.map(p => ({
        id: p.id,
        type: 'case-study' as const,
        title: p.title,
        description: p.shortDesc || p.description,
        link: \`/portfolio/\${p.id}\`,
        category: p.category,
        tags: p.techStack || [],
        meta: p.client || 'Client Case Study',
        featured: false,
        icon: <Terminal className="text-slate-900" size={24} />
      })),
      {
        id: 'tech-quiz-engine',
        type: 'quiz' as const,
        title: 'Interactive Coding Quiz',
        description: 'Evaluasi pemahaman Anda dalam Next.js, Node.js, dan arsitektur AI modern dengan tes interaktif langsung.',
        link: '/academy/quiz',
        category: 'Assessment',
        tags: ['Next.js', 'AI', 'Node.js'],
        meta: 'Tech Engine',
        featured: true,
        icon: <BrainCircuit className="text-slate-900" size={24} />
      }
    ];

    let filtered = resources.filter(r => 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      r.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (activeTab !== 'all') {
      filtered = filtered.filter(r => r.type === activeTab);
    }

    return filtered;
  }, [searchQuery, activeTab]);

  return (
    <div className="min-h-screen bg-[#fbfbfd] pt-32 pb-24 font-sans select-none relative overflow-hidden">
      <MetaTags 
        title="CHESTAADOTCOM Academy | Belajar Web Dev & AI di BSD City & Cisauk"
        description="Tingkatkan skill coding Anda dengan materi eksklusif React, Next.js, dan AI. Tech academy & resource hub terkemuka di BSD City & Cisauk, Tangerang."
        path="/academy"
        breadcrumbs={[{ name: 'Home', item: '/' }, { name: 'Academy', item: '/academy' }]}
        schemaString={JSON.stringify(generateCourseSchema('Full-Stack Web Development & AI', 'Belajar programming modern dan AI integration', 'https://chestaa.com/academy'))}
      />
      
      <main className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-black text-slate-900 mb-6 tracking-tight uppercase"
            style={{ fontFamily: "'Coolvetica', sans-serif" }}
          >
            Resource Hub
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl font-medium"
          >
            Indeks komprehensif untuk artikel teknis, studi kasus enterprise, dan modul quiz interaktif dari engineer terbaik di BSD City.
          </motion.p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 items-start md:items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Cari artikel, studi kasus, teknologi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-900 rounded-none text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 shadow-[4px_4px_0_0_rgba(15,23,42,1)] transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900">
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Resources' },
              { id: 'article', label: 'Articles' },
              { id: 'case-study', label: 'Case Studies' },
              { id: 'quiz', label: 'Quizzes' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ResourceType)}
                className={\`px-6 py-3 border-2 border-slate-900 text-sm font-bold uppercase tracking-wider transition-all \${
                  activeTab === tab.id 
                    ? 'bg-slate-900 text-white shadow-[4px_4px_0_0_rgba(15,23,42,1)] translate-x-[-2px] translate-y-[-2px]' 
                    : 'bg-white text-slate-600 hover:bg-slate-50'
                }\`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {unifiedResources.map((resource, idx) => {
              const isLarge = resource.featured;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={resource.id}
                  className={\`group bg-white border-2 border-slate-900 shadow-[6px_6px_0_0_rgba(15,23,42,1)] hover:shadow-[2px_2px_0_0_rgba(15,23,42,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex flex-col \${isLarge ? 'md:col-span-2 lg:col-span-2' : ''}\`}
                >
                  <div className="p-6 sm:p-8 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-3 bg-slate-100 border-2 border-slate-900 shrink-0">
                        {resource.icon}
                      </div>
                      <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest border-2 border-slate-900">
                        {resource.type}
                      </span>
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900 mb-3 leading-tight" style={{ fontFamily: "'Coolvetica', sans-serif" }}>
                      {resource.title}
                    </h3>
                    
                    <p className="text-sm text-slate-600 mb-6 flex-1 line-clamp-3">
                      {resource.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {resource.tags.slice(0, isLarge ? 5 : 3).map((tag, i) => (
                        <span key={i} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-slate-100 border border-slate-300 text-slate-700">
                          {tag}
                        </span>
                      ))}
                      {resource.tags.length > (isLarge ? 5 : 3) && (
                        <span className="text-[10px] font-bold px-2 py-1 text-slate-500">
                          +{resource.tags.length - (isLarge ? 5 : 3)}
                        </span>
                      )}
                    </div>
                  </div>

                  <Link 
                    to={resource.link}
                    className="border-t-2 border-slate-900 p-4 sm:p-6 bg-slate-50 group-hover:bg-slate-900 group-hover:text-white transition-colors flex items-center justify-between"
                  >
                    <div className="text-xs font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">
                      {resource.meta}
                    </div>
                    <ArrowRight size={20} className="transform group-hover:translate-x-2 transition-transform" />
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        
        {unifiedResources.length === 0 && (
          <div className="py-24 text-center border-2 border-slate-900 bg-white shadow-[6px_6px_0_0_rgba(15,23,42,1)]">
            <h3 className="text-2xl font-display font-black text-slate-900 mb-2" style={{ fontFamily: "'Coolvetica', sans-serif" }}>Tidak ada hasil ditemukan</h3>
            <p className="text-slate-600">Coba ubah kata kunci pencarian Anda.</p>
          </div>
        )}

      </main>
    </div>
  );
}
`;
fs.writeFileSync('src/pages/AcademyPage.tsx', code);
