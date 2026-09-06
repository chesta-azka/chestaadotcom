const fs = require('fs');

// 1. Hide global Header on /academy routes
let headerPath = 'src/components/organisms/Header.tsx';
let headerContent = fs.readFileSync(headerPath, 'utf8');
if (!headerContent.includes("if (location.pathname.startsWith('/academy')) return null;")) {
  headerContent = headerContent.replace(
    /const location = useLocation\(\);/,
    "const location = useLocation();\n  if (location.pathname.startsWith('/academy')) return null;"
  );
  fs.writeFileSync(headerPath, headerContent);
}

// 2. Hide global Footer on /academy routes
let footerPath = 'src/components/organisms/FooterSection.tsx';
if (fs.existsSync(footerPath)) {
  let footerContent = fs.readFileSync(footerPath, 'utf8');
  if (!footerContent.includes("if (location.pathname.startsWith('/academy')) return null;")) {
    footerContent = footerContent.replace(
      /export default function FooterSection\(\) \{/,
      "import { useLocation } from 'react-router-dom';\nexport default function FooterSection() {\n  const location = useLocation();\n  if (location.pathname.startsWith('/academy')) return null;"
    );
    fs.writeFileSync(footerPath, footerContent);
  }
}

// 3. Rebuild AcademyPage.tsx (The Index / Dashboard with Cards)
const academyPageContent = `
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Clock, BarChart, ArrowRight, Sparkles, Shield } from 'lucide-react';

const COURSES = [
  {
    id: 'enterprise-saas',
    title: 'Enterprise SaaS Development',
    description: 'Master the App Router and React Server Components by building a fully serverless, highly scalable SaaS backend.',
    category: 'Next.js',
    difficulty: 'Advanced',
    duration: '12 Modul',
    image: 'bg-gradient-to-br from-purple-900 to-indigo-900',
    icon: <Shield size={24} className="text-white" />,
    isNew: true,
  },
  {
    id: 'ai-integration',
    title: 'AI & Automation Workflow',
    description: 'Integrasi LLM (Gemini) dan otomatisasi bisnis untuk aplikasi skala produksi.',
    category: 'AI',
    difficulty: 'Intermediate',
    duration: '8 Modul',
    image: 'bg-gradient-to-br from-slate-800 to-slate-900',
    icon: <Sparkles size={24} className="text-white" />,
  }
];

export default function AcademyPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans selection:bg-purple-200 selection:text-purple-900">
      {/* Academy Top Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 h-16 flex items-center px-6">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-purple-900 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-purple-800 transition-colors">
              <BookOpen size={16} className="text-white" />
            </div>
            <span className="font-display font-bold tracking-tight text-slate-900 text-lg">
              chestaa<span className="text-purple-600">academy</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
             <Link to="/" className="text-sm font-medium text-slate-600 hover:text-purple-900 transition-colors px-4 py-2 rounded-full hover:bg-slate-100">
               Kembali ke Beranda
             </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-700 bg-purple-100/80 px-4 py-1.5 rounded-full mb-6">
            Platform Pembelajaran Premium
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-slate-900 mb-6 tracking-tight">
            Master Enterprise Architecture
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Tingkatkan keahlian Anda dengan modul pembelajaran intensif standar industri. Dari fundamental hingga integrasi sistem kompleks.
          </p>

          <div className="mt-10 relative max-w-md w-full">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Cari kelas masterclass..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full bg-white border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-900 focus:border-transparent text-slate-800 transition-all"
            />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase())).map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link to={\`/academy/\${course.id}\`} className="group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(88,28,135,0.08)] hover:border-purple-200 transition-all duration-300 h-full">
                
                {/* Card Header / Image */}
                <div className={\`h-48 \${course.image} relative p-6 flex flex-col justify-between overflow-hidden\`}>
                  {/* Abstract shapes */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-10 translate-x-10 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/20 rounded-full blur-xl translate-y-8 -translate-x-4" />
                  
                  <div className="flex justify-between items-start relative z-10">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-sm">
                      {course.icon}
                    </div>
                    {course.isNew && (
                      <span className="bg-white text-purple-900 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                        Baru
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
                      {course.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-display font-bold text-slate-900 mb-3 group-hover:text-purple-900 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-8 flex-1">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <BarChart size={14} className="text-purple-400" />
                        {course.difficulty}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-purple-400" />
                        {course.duration}
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-purple-900 group-hover:text-white transition-colors text-slate-400">
                      <ArrowRight size={16} />
                    </div>
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
fs.writeFileSync('src/pages/AcademyPage.tsx', academyPageContent);

// 4. Rebuild AcademyMasterclassPage.tsx (The Detail Page with Sidebar)
const academyDetailContent = `
import { codeToHtml } from 'shiki';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bookmark, BookmarkCheck, ChevronDown, ChevronRight, 
  ArrowLeft, FileCode, Check, Copy, BookOpen, 
  Share2, Printer, Search, Menu, X, AlignLeft
} from 'lucide-react';
import curriculumData from '../data/academy-curriculum.json';

// --- Premium Code Block Component ---
const PremiumCodeBlock = ({ code, language, title, filename }: { code: string, language: string, title?: string, filename?: string }) => {
  const [copied, setCopied] = useState(false);
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    const highlight = async () => {
      try {
        const result = await codeToHtml(code, {
          lang: language || 'text',
          theme: 'github-light',
        });
        if (isMounted) setHtml(result);
      } catch (err) {
        if (isMounted) setHtml(\`<pre><code>\${code}</code></pre>\`);
      }
    };
    highlight();
    return () => { isMounted = false; };
  }, [code, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 rounded-2xl overflow-hidden bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-200 transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50/80 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-slate-300"></div>
            <div className="w-3 h-3 rounded-full bg-slate-300"></div>
            <div className="w-3 h-3 rounded-full bg-slate-300"></div>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <FileCode size={14} />
            <span className="text-xs font-mono font-medium">{filename || title || language}</span>
          </div>
        </div>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 hover:text-purple-900 transition-colors"
        >
          {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div 
        className="p-5 overflow-x-auto text-[13px] md:text-sm font-mono leading-relaxed bg-white"
        dangerouslySetInnerHTML={{ __html: html || \`<pre><code>\${code}</code></pre>\` }}
      />
    </div>
  );
};

export default function AcademyMasterclassPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeModuleId, setActiveModuleId] = useState<string>('module-1');
  const [activeSubmoduleId, setActiveSubmoduleId] = useState<string>('sub-1-1');
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'module-1': true
  });

  const modules = curriculumData.tutorialContent || [];

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('academy_bookmarks');
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (e) {}
    }
  }, []);

  const toggleBookmark = (subId: string) => {
    const newBookmarks = { ...bookmarks, [subId]: !bookmarks[subId] };
    setBookmarks(newBookmarks);
    localStorage.setItem('academy_bookmarks', JSON.stringify(newBookmarks));
  };

  const toggleModule = (modId: string) => {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  const currentModule = modules.find(m => m.id === activeModuleId) || modules[0];
  const currentSubmodule = currentModule?.submodules?.find((s: any) => s.id === activeSubmoduleId) || currentModule?.submodules?.[0];

  const handleSubmoduleClick = (modId: string, subId: string) => {
    setActiveModuleId(modId);
    setActiveSubmoduleId(subId);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
    // Scroll content to top
    document.getElementById('academy-content-area')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="h-screen w-full bg-[#f8f9fa] font-sans text-slate-800 flex flex-col overflow-hidden selection:bg-purple-200 selection:text-purple-900">
      {/* Top App Bar - Fixed */}
      <header className="h-16 shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 z-50">
        <div className="flex items-center gap-3 md:gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <Link to="/academy" className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 transition-colors text-slate-600">
            <ArrowLeft size={20} />
          </Link>
          
          <div className="w-px h-6 bg-slate-200 hidden sm:block mx-1"></div>

          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">Course Path</span>
            <h1 className="text-sm font-medium text-slate-900 line-clamp-1">
              {slug === 'ai-integration' ? 'AI & Automation Workflow' : 'Enterprise SaaS Development'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
            <Printer size={16} />
            <span>Cetak</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-purple-900 rounded-full hover:bg-purple-800 transition-colors shadow-sm">
            <Share2 size={16} />
            <span className="hidden sm:inline">Bagikan</span>
          </button>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Persistent Sidebar */}
        <aside className={\`
          absolute lg:static top-0 left-0 h-full bg-white border-r border-slate-200 
          w-72 lg:w-80 flex-shrink-0 flex flex-col transition-transform duration-300 z-40
          \${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        \`}>
          <div className="p-4 border-b border-slate-100 shrink-0">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari di modul..." 
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200/60 rounded-full text-sm focus:ring-2 focus:ring-purple-900 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
            {modules.map((mod: any, modIndex: number) => (
              <div key={mod.id} className="mb-2">
                <button 
                  onClick={() => toggleModule(mod.id)}
                  className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors text-left"
                >
                  <span className="font-semibold text-sm text-slate-800 pr-2 line-clamp-2">
                    {mod.title}
                  </span>
                  {expandedModules[mod.id] ? (
                    <ChevronDown size={16} className="text-slate-400 shrink-0" />
                  ) : (
                    <ChevronRight size={16} className="text-slate-400 shrink-0" />
                  )}
                </button>
                
                <AnimatePresence>
                  {expandedModules[mod.id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pr-2 py-1 flex flex-col gap-1 border-l-2 border-slate-100 ml-4 my-2">
                        {mod.submodules?.map((sub: any) => {
                          const isActive = activeSubmoduleId === sub.id;
                          const isBookmarked = bookmarks[sub.id];
                          return (
                            <button
                              key={sub.id}
                              onClick={() => handleSubmoduleClick(mod.id, sub.id)}
                              className={\`
                                text-left px-4 py-2.5 rounded-r-full rounded-l-md text-sm transition-all flex items-center justify-between group
                                \${isActive 
                                  ? 'bg-purple-100/60 text-purple-900 font-bold shadow-[inset_4px_0_0_0_#581c87]' 
                                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
                              \`}
                            >
                              <span className="line-clamp-2 pr-2 leading-tight">{sub.title}</span>
                              {isBookmarked && (
                                <BookmarkCheck size={14} className={\`shrink-0 \${isActive ? 'text-purple-700' : 'text-purple-500'}\`} />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Scrollable Content Area */}
        <main id="academy-content-area" className="flex-1 h-full overflow-y-auto bg-[#f8f9fa] custom-scrollbar scroll-smooth">
          <div className="max-w-4xl mx-auto w-full px-5 sm:px-8 lg:px-16 py-10 lg:py-16">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-8">
              <span className="hover:text-purple-700 transition-colors cursor-pointer">{currentModule?.title}</span>
              <ChevronRight size={12} className="text-slate-300" />
              <span className="text-purple-900">{currentSubmodule?.title}</span>
            </div>

            <motion.div 
              key={activeSubmoduleId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-slate-900 mb-8 leading-[1.1] tracking-tight">
                {currentSubmodule?.title}
              </h1>

              <div className="prose prose-slate prose-lg max-w-none prose-headings:font-display prose-headings:font-medium prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-purple-700">
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10">
                  {currentSubmodule?.content}
                </p>

                {currentSubmodule?.code && (
                  <PremiumCodeBlock 
                    code={currentSubmodule.code} 
                    language={currentSubmodule.lang || 'typescript'}
                    filename={currentSubmodule.filename}
                  />
                )}
                
                {/* Simulated Content Block for visual completeness */}
                {!currentSubmodule?.code && (
                  <div className="bg-white rounded-3xl p-8 border border-slate-200 my-10 shadow-sm">
                    <div className="flex items-center gap-3 text-purple-900 font-medium mb-4">
                      <div className="p-2 bg-purple-100 rounded-xl">
                        <AlignLeft size={20} />
                      </div>
                      <h3 className="text-lg m-0 font-bold">Catatan Konsep</h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed m-0">
                      Modul ini dirancang dengan standar praktik terbaik (best practices) yang diterapkan di industri. Pastikan Anda memahami dasar teorinya sebelum beralih ke sesi praktikum kode. Anda dapat menyimpan (bookmark) modul ini untuk ditinjau kembali nanti.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Bar / Bookmark section */}
              <div className="mt-20 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                <button
                  onClick={() => toggleBookmark(currentSubmodule?.id)}
                  className={\`
                    flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium transition-all w-full sm:w-auto text-sm
                    \${bookmarks[currentSubmodule?.id] 
                      ? 'bg-purple-50 text-purple-900 border border-purple-200 hover:bg-purple-100' 
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:border-slate-400'}
                  \`}
                >
                  {bookmarks[currentSubmodule?.id] ? (
                    <>
                      <BookmarkCheck size={18} className="text-purple-600" />
                      Telah Ditandai (Tersimpan)
                    </>
                  ) : (
                    <>
                      <Bookmark size={18} className="text-slate-400" />
                      Tandai Modul Ini
                    </>
                  )}
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button 
                    onClick={() => {
                      const currentModIdx = modules.findIndex((m: any) => m.id === currentModule.id);
                      const submodules = currentModule.submodules;
                      const currentSubIdx = submodules.findIndex((s: any) => s.id === currentSubmodule.id);
                      
                      if (currentSubIdx < submodules.length - 1) {
                        handleSubmoduleClick(currentModule.id, submodules[currentSubIdx + 1].id);
                      } else if (currentModIdx < modules.length - 1) {
                        const nextMod = modules[currentModIdx + 1];
                        toggleModule(nextMod.id);
                        handleSubmoduleClick(nextMod.id, nextMod.submodules[0].id);
                      }
                    }}
                    className="flex items-center justify-center gap-2 px-8 py-3.5 bg-purple-900 text-white rounded-full font-medium text-sm hover:bg-purple-800 transition-colors w-full sm:w-auto shadow-sm"
                  >
                    Selanjutnya
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </main>
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/pages/AcademyMasterclassPage.tsx', academyDetailContent);

console.log('Successfully patched Academy Layout');
