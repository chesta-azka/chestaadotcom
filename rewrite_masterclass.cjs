const fs = require('fs');

const content = `import { codeToHtml } from 'shiki';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bookmark, BookmarkCheck, ChevronDown, ChevronRight, 
  ArrowLeft, Terminal, FileCode, Check, Copy, BookOpen, 
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
    <div className="my-6 rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-200 no-print transition-all hover:shadow-md">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50/80 border-b border-slate-100">
        <div className="flex items-center gap-3">
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
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
        >
          {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div 
        className="p-4 overflow-x-auto text-sm font-mono leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html || \`<pre><code>\${code}</code></pre>\` }}
      />
    </div>
  );
};

export default function AcademyMasterclassPage() {
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
  const currentSubmodule = currentModule?.submodules?.find(s => s.id === activeSubmoduleId) || currentModule?.submodules?.[0];

  const handleSubmoduleClick = (modId: string, subId: string) => {
    setActiveModuleId(modId);
    setActiveSubmoduleId(subId);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Google Design Style: Clean, plenty of whitespace, pill-shaped menus, soft borders
  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-slate-800 flex flex-col">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-6 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <Link to="/academy" className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 transition-colors text-slate-600">
            <ArrowLeft size={20} />
          </Link>
          
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Google Cloud Architecture</span>
            <h1 className="text-sm font-medium text-slate-900 line-clamp-1">Enterprise SaaS Development</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
            <Printer size={16} />
            <span>Cetak PDF</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors shadow-sm">
            <Share2 size={16} />
            <span className="hidden sm:inline">Bagikan</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <aside className={\`
          fixed lg:static top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r border-slate-200 
          w-72 lg:w-80 flex-shrink-0 flex flex-col transition-transform duration-300 z-40
          \${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        \`}>
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari di modul..." 
                className="w-full pl-9 pr-4 py-2.5 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
            {modules.map((mod, modIndex) => (
              <div key={mod.id} className="mb-1">
                <button 
                  onClick={() => toggleModule(mod.id)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors text-left"
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
                      <div className="pl-4 pr-2 py-1 flex flex-col gap-1 border-l-2 border-slate-100 ml-4 my-1">
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
                                  ? 'bg-blue-50/80 text-blue-700 font-medium' 
                                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
                              \`}
                            >
                              <span className="line-clamp-2 pr-2">{sub.title}</span>
                              {isBookmarked && (
                                <BookmarkCheck size={14} className={\`shrink-0 \${isActive ? 'text-blue-600' : 'text-blue-500'}\`} />
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

        {/* Main Content Area */}
        <main className="flex-1 h-[calc(100vh-4rem)] overflow-y-auto bg-white lg:bg-[#f8f9fa] custom-scrollbar">
          <div className="max-w-4xl mx-auto w-full px-4 sm:px-8 lg:px-12 py-8 lg:py-12 bg-white min-h-full lg:my-6 lg:rounded-3xl lg:shadow-sm lg:border lg:border-slate-200">
            
            {/* Breadcrumb & Meta */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-8">
              <span className="hover:text-blue-600 cursor-pointer">{currentModule?.title}</span>
              <ChevronRight size={12} />
              <span className="text-slate-800">{currentSubmodule?.title}</span>
            </div>

            <motion.div 
              key={activeSubmoduleId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl sm:text-4xl font-display font-medium text-slate-900 mb-6 leading-tight tracking-tight">
                {currentSubmodule?.title}
              </h1>

              <div className="prose prose-slate prose-lg max-w-none">
                <p className="text-slate-600 leading-relaxed text-lg mb-8">
                  {currentSubmodule?.content}
                </p>

                {currentSubmodule?.code && (
                  <PremiumCodeBlock 
                    code={currentSubmodule.code} 
                    language={currentSubmodule.lang || 'typescript'}
                    filename={currentSubmodule.filename}
                  />
                )}
                
                {/* Additional simulated long content to show structure if JSON data is short */}
                {!currentSubmodule?.code && (
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 my-8">
                    <div className="flex items-center gap-3 text-blue-700 font-medium mb-3">
                      <AlignLeft size={20} />
                      <h3>Catatan Tambahan</h3>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Lanjutkan eksplorasi modul ini melalui panel di samping. Anda dapat menyimpan (bookmark) status pembelajaran Anda kapan saja menggunakan tombol di bawah agar tidak kehilangan jejak pada kunjungan berikutnya.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Bar / Bookmark section */}
              <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => toggleBookmark(currentSubmodule?.id)}
                  className={\`
                    flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all w-full sm:w-auto
                    \${bookmarks[currentSubmodule?.id] 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:border-slate-400'}
                  \`}
                >
                  {bookmarks[currentSubmodule?.id] ? (
                    <>
                      <BookmarkCheck size={18} />
                      Telah Ditandai (Tersimpan)
                    </>
                  ) : (
                    <>
                      <Bookmark size={18} />
                      Tandai Modul Ini
                    </>
                  )}
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button 
                    onClick={() => {
                      // Navigate to next submodule logic
                      const currentModIdx = modules.findIndex(m => m.id === currentModule.id);
                      const submodules = currentModule.submodules;
                      const currentSubIdx = submodules.findIndex(s => s.id === currentSubmodule.id);
                      
                      if (currentSubIdx < submodules.length - 1) {
                        handleSubmoduleClick(currentModule.id, submodules[currentSubIdx + 1].id);
                      } else if (currentModIdx < modules.length - 1) {
                        const nextMod = modules[currentModIdx + 1];
                        toggleModule(nextMod.id);
                        handleSubmoduleClick(nextMod.id, nextMod.submodules[0].id);
                      }
                    }}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors w-full sm:w-auto shadow-sm"
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
`
fs.writeFileSync('src/pages/AcademyMasterclassPage.tsx', content);
console.log('Successfully rewrote AcademyMasterclassPage.tsx');
