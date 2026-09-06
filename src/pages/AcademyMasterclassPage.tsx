import { Home, Bookmark, BookmarkCheck, ChevronDown, ChevronRight, ArrowLeft, FileCode, Check, Copy, Share2, Printer, Search, Menu, X, AlignLeft } from 'lucide-react';

import { codeToHtml } from 'shiki';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import { motion, AnimatePresence } from 'motion/react';

import curriculumData from '../data/academy-curriculum.json';
import FooterSection from '../components/organisms/FooterSection.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

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
        if (isMounted) setHtml(`<pre><code>${code}</code></pre>`);
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
        dangerouslySetInnerHTML={{ __html: html || `<pre><code>${code}</code></pre>` }}
      />
    </div>
  );
};


// Markdown styling overrides for optimal readability



// Helper to ensure markdown lists render with correct spacing

// Helper to ensure markdown lines and steps render with distinct paragraph spacing
function formatMarkdownContent(content: string) {
  if (!content) return '';
  // Normalize newlines
  let formatted = content.replace(/\r\n/g, '\n');
  // Replace single newlines with double newlines so markdown-to-jsx creates distinct block paragraphs
  formatted = formatted.replace(/\n+/g, '\n\n');
  return formatted;
}



const markdownOptions = {
  overrides: {
    p: {
      component: (props: any) => <p className="text-base text-slate-700 leading-relaxed mb-8" {...props} />
    },
    ul: {
      component: (props: any) => <ul className="list-disc pl-6 space-y-3 mb-8 text-slate-700 leading-relaxed" {...props} />
    },
    ol: {
      component: (props: any) => <ol className="list-decimal pl-6 space-y-3 mb-8 text-slate-700 leading-relaxed" {...props} />
    },
    li: {
      component: (props: any) => <li className="leading-relaxed mb-2" {...props} />
    },
    h1: {
      component: (props: any) => <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mt-12 mb-6 tracking-tight" {...props} />
    },
    h2: {
      component: (props: any) => <h2 className="text-xl md:text-2xl font-display font-bold text-slate-900 mt-12 mb-6 tracking-tight" {...props} />
    },
    h3: {
      component: (props: any) => <h3 className="text-lg md:text-xl font-display font-semibold text-slate-900 mt-10 mb-6 tracking-tight" {...props} />
    }
  }
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


  const totalSubmodules = modules.reduce((acc, mod) => acc + (mod.submodules?.length || 0), 0);
  const completedCount = Object.values(bookmarks).filter(Boolean).length;
  const progressPercent = totalSubmodules === 0 ? 0 : Math.round((completedCount / totalSubmodules) * 100);

  return (
    <div className="h-screen w-screen max-w-full bg-[#f8f9fa] font-sans text-slate-800 flex flex-col overflow-x-hidden box-border selection:bg-purple-200 selection:text-purple-900">
      {/* Course Sub Bar */}
      <header className="h-16 shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 z-50 shadow-sm relative">
        <div className="flex items-center gap-3 md:gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <Link to="/" className="flex items-center gap-2 group">
             <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md group-hover:bg-purple-900 transition-colors">
               <span className="font-display font-bold text-sm sm:text-base tracking-tighter">Ai</span>
             </div>
          </Link>
          
          <div className="w-px h-6 bg-slate-200 mx-1"></div>

          <Link to="/academy" className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-600 font-medium text-sm">
            <ArrowLeft size={16} />
            Keluar Kelas
          </Link>
          <Link to="/academy" className="sm:hidden flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-100 transition-colors text-slate-600">
            <ArrowLeft size={18} />
          </Link>

          <div className="flex flex-col ml-1 sm:ml-2">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-purple-700">Course Path</span>
            <h1 className="text-xs sm:text-sm font-medium text-slate-900 line-clamp-1 max-w-[120px] sm:max-w-xs">
              {'Music Streaming App'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
            <Printer size={16} />
            <span>Cetak</span>
          </button>
          <button className="flex items-center gap-2 px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium text-white bg-purple-900 rounded-full hover:bg-purple-800 transition-colors shadow-sm">
            <Share2 size={16} />
            <span className="hidden sm:inline">Bagikan</span>
          </button>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Persistent Sidebar */}
        <aside className={`sidebar-wrapper fixed inset-y-0 left-0 top-16 h-[calc(100vh-4rem)] lg:static lg:h-full lg:top-auto bg-white border-r lg:border-r-0 lg:border-l border-slate-200/80 lg:order-2 w-80 max-w-[85vw] flex-shrink-0 flex flex-col box-border transition-transform duration-300 z-50 shadow-2xl lg:shadow-none ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          
          <div className="p-4 border-b border-slate-200/60 shrink-0 bg-white/80 backdrop-blur-md sticky top-0 z-10">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Progress Kursus</span>
                <span className="text-xs font-bold text-purple-700">{progressPercent}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>

            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari di modul..." 
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200/60 rounded-full text-sm focus:ring-2 focus:ring-purple-900 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 custom-scrollbar sidebar-nav-container">
            {modules.map((mod: any) => (
              <div key={mod.id} className="mb-2">
                <button 
                  onClick={() => toggleModule(mod.id)}
                  className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-100/60 transition-colors text-left"
                >
                  <div className="flex flex-col pr-2">
                    <span className="font-semibold text-sm text-slate-900 line-clamp-2">{mod.title}</span>
                    <span className="text-[11px] text-slate-400 font-mono mt-0.5">{mod.submodules?.length || 0} Sub-modul</span>
                  </div>
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
                            <motion.button
                              key={sub.id}
                              onClick={() => handleSidebarClick(sub.id)}
                              whileHover={{ scale: 1.02, x: 4 }}
                              whileTap={{ scale: 0.98 }}
                              transition={{ type: "spring", stiffness: 400, damping: 25 }}
                              className={`
                                text-left px-4 py-2.5 rounded-r-full rounded-l-md text-sm transition-all flex items-center justify-between group
                                ${isActive 
                                  ? 'bg-purple-100/60 text-purple-900 font-bold shadow-[inset_4px_0_0_0_#581c87]' 
                                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'}
                               hover:shadow-sm`}
                            >
                              <span className="line-clamp-2 pr-2 leading-tight">{sub.title}</span>
                              {isBookmarked && (
                                <BookmarkCheck size={14} className={`shrink-0 ${isActive ? 'text-purple-700' : 'text-purple-500'}`} />
                              )}
                            </motion.button>
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
          {/* Breadcrumb Navigation */}
          <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-10 pb-4">
            <motion.nav 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-2 px-3.5 py-1.5 bg-purple-50 border border-purple-100 rounded-full w-max font-sans text-xs"
              aria-label="Breadcrumb"
            >
              <Link to="/" className="text-slate-600 hover:text-purple-900 transition-colors flex items-center gap-1 font-medium shrink-0">
                <Home className="w-3.5 h-3.5" /> Beranda
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <Link to="/academy" className="text-slate-600 hover:text-purple-900 transition-colors font-medium shrink-0">
                Academy & Docs
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <span className="text-purple-900 font-semibold shrink-0 line-clamp-1 max-w-[150px] sm:max-w-[200px]">Music Streaming App</span>
            </motion.nav>
          </div>

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
                      <div className="academy-text-content prose prose-lg prose-slate max-w-none text-slate-600 prose-headings:font-display prose-headings:font-medium prose-strong:text-slate-900 prose-strong:font-bold prose-ul:list-disc prose-p:leading-relaxed prose-a:text-purple-700">
                        <Markdown options={markdownOptions}>{formatMarkdownContent(sub.content)}</Markdown>
                      </div>

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
                        className={`
                          flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all text-sm
                          ${bookmarks[sub.id] 
                            ? 'bg-purple-50 text-purple-900 border border-purple-200 hover:bg-purple-100' 
                            : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:border-slate-400'}
                        `}
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
          <FooterSection />
        </main>
      </div>
    </div>
  );
}
