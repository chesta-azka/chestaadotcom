const fs = require('fs');

const content = `
import { codeToHtml } from 'shiki';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bookmark, BookmarkCheck, ChevronDown, ChevronRight, 
  ArrowLeft, FileCode, Check, Copy, Share2, Printer, Search, Menu, X, AlignLeft
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
  const [activeSubmoduleId, setActiveSubmoduleId] = useState<string>('');
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

  // Intersection Observer for ScrollSpy
  useEffect(() => {
    const container = document.getElementById('academy-content-area');
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSubmoduleId(entry.target.id);
            // Automatically expand the parent module in the sidebar
            const parentMod = modules.find((m: any) => m.submodules?.some((s: any) => s.id === entry.target.id));
            if (parentMod) {
              setExpandedModules(prev => ({ ...prev, [parentMod.id]: true }));
            }
          }
        });
      },
      { 
        root: container, 
        rootMargin: '-10% 0px -80% 0px', // Trigger when element is near the top
        threshold: 0
      }
    );

    modules.forEach((mod: any) => {
      mod.submodules?.forEach((sub: any) => {
        const el = document.getElementById(sub.id);
        if (el) observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, [modules]);

  const toggleBookmark = (subId: string) => {
    const newBookmarks = { ...bookmarks, [subId]: !bookmarks[subId] };
    setBookmarks(newBookmarks);
    localStorage.setItem('academy_bookmarks', JSON.stringify(newBookmarks));
  };

  const toggleModule = (modId: string) => {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  const handleSidebarClick = (subId: string) => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
    const el = document.getElementById(subId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="h-screen w-full bg-[#f8f9fa] font-sans text-slate-800 flex flex-col overflow-hidden selection:bg-purple-200 selection:text-purple-900">
      {/* Top App Bar - Fixed */}
      <header className="h-16 shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 z-50 shadow-sm">
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
          absolute lg:static top-0 left-0 h-full bg-slate-50/50 border-r border-slate-200/80 
          w-72 lg:w-80 flex-shrink-0 flex flex-col transition-transform duration-300 z-40
          \${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        \`}>
          <div className="p-4 border-b border-slate-100 shrink-0 bg-white">
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
            {modules.map((mod: any) => (
              <div key={mod.id} className="mb-2">
                <button 
                  onClick={() => toggleModule(mod.id)}
                  className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-100/60 transition-colors text-left"
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
                      <div className="pl-4 pr-2 py-1 flex flex-col gap-1 border-l-2 border-slate-200/60 ml-4 my-2">
                        {mod.submodules?.map((sub: any) => {
                          const isActive = activeSubmoduleId === sub.id;
                          const isBookmarked = bookmarks[sub.id];
                          return (
                            <button
                              key={sub.id}
                              onClick={() => handleSidebarClick(sub.id)}
                              className={\`
                                text-left px-4 py-2.5 rounded-r-full rounded-l-md text-sm transition-all flex items-center justify-between group
                                \${isActive 
                                  ? 'bg-purple-100/60 text-purple-900 font-bold shadow-[inset_4px_0_0_0_#581c87]' 
                                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'}
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

        {/* Scrollable Content Area - CONTINUOUS SCROLL */}
        <main id="academy-content-area" className="flex-1 h-full overflow-y-auto bg-white custom-scrollbar scroll-smooth">
          <div className="max-w-4xl mx-auto w-full px-5 sm:px-8 lg:px-16 py-10 lg:py-16">
            
            {modules.map((mod: any, modIdx: number) => (
              <div key={mod.id} className="mb-24">
                
                {mod.submodules?.map((sub: any, subIdx: number) => (
                  <div key={sub.id} id={sub.id} className="scroll-mt-24 mb-24 pb-12 border-b border-slate-100 last:border-0 last:mb-0 last:pb-0">
                    
                    {/* Breadcrumb Context for Each Section */}
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-6">
                      <span className="text-purple-900">{mod.title}</span>
                      <ChevronRight size={12} className="text-slate-300" />
                      <span>Bagian {subIdx + 1}</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-slate-900 mb-8 leading-[1.1] tracking-tight">
                      {sub.title}
                    </h2>

                    <div className="prose prose-slate prose-lg max-w-none prose-headings:font-display prose-headings:font-medium prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-purple-700">
                      <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10">
                        {sub.content}
                      </p>

                      {sub.code && (
                        <PremiumCodeBlock 
                          code={sub.code} 
                          language={sub.lang || 'typescript'}
                          filename={sub.filename}
                        />
                      )}
                      
                      {/* Simulated Content Block for visual completeness */}
                      {!sub.code && (
                        <div className="bg-slate-50/50 rounded-3xl p-8 border border-slate-200 my-10 shadow-sm">
                          <div className="flex items-center gap-3 text-purple-900 font-medium mb-4">
                            <div className="p-2 bg-purple-100 rounded-xl">
                              <AlignLeft size={20} />
                            </div>
                            <h3 className="text-lg m-0 font-bold">Catatan Konsep</h3>
                          </div>
                          <p className="text-slate-600 leading-relaxed m-0 text-base">
                            Ini adalah fondasi arsitektur standar industri. Pastikan Anda memahami dasar teorinya sebelum beralih ke sesi praktikum kode di bawah. Anda dapat menyimpan (bookmark) sub-modul ini untuk ditinjau kembali nanti.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Bookmark Action per section */}
                    <div className="mt-12 pt-6 flex items-center justify-between">
                      <button
                        onClick={() => toggleBookmark(sub.id)}
                        className={\`
                          flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all text-sm
                          \${bookmarks[sub.id] 
                            ? 'bg-purple-50 text-purple-900 border border-purple-200 hover:bg-purple-100' 
                            : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:border-slate-400'}
                        \`}
                      >
                        {bookmarks[sub.id] ? (
                          <>
                            <BookmarkCheck size={18} className="text-purple-600" />
                            Telah Ditandai (Tersimpan)
                          </>
                        ) : (
                          <>
                            <Bookmark size={18} className="text-slate-400" />
                            Tandai Sebagai Selesai
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            ))}

            <div className="py-20 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 border border-emerald-100">
                <Check size={32} className="text-emerald-500" />
              </div>
              <h3 className="text-2xl font-display font-medium text-slate-900 mb-2">Selamat, Anda Telah Mencapai Akhir Modul!</h3>
              <p className="text-slate-500 max-w-md">Anda dapat kembali meninjau materi menggunakan navigasi di sebelah kiri, atau kembali ke beranda.</p>
              
              <Link to="/academy" className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors">
                Kembali ke Dashboard Academy
              </Link>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
`
fs.writeFileSync('src/pages/AcademyMasterclassPage.tsx', content);
console.log('Successfully changed Academy reading layout to single full continuous scroll with scrollspy');
