import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { ListTree, ArrowUp, ChevronRight, Hash, Sparkles, X, MessageSquare } from 'lucide-react';

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [readingPercent, setReadingPercent] = useState(0);
  const tocListRef = useRef<HTMLUListElement>(null);
  
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setReadingPercent(Math.round(latest * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Observer to track which heading is currently in viewport
  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const headingElements = headings
        .map((h) => ({ id: h.id, element: document.getElementById(h.id) }))
        .filter((h): h is { id: string; element: HTMLElement } => h.element !== null);

      if (headingElements.length === 0) return;

      const scrollPosition = window.scrollY + 160;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const { id, element } = headingElements[i];
        if (element.offsetTop <= scrollPosition) {
          setActiveId(id);
          return;
        }
      }

      // If above the first heading
      if (headingElements[0]) {
        setActiveId(headingElements[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  // Auto-scroll TOC list when active item changes
  useEffect(() => {
    if (activeId && tocListRef.current) {
      const activeEl = tocListRef.current.querySelector(`[data-id="${activeId}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [activeId]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
      setActiveId(id);
    }
    setIsMobileOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (headings.length === 0) return null;

  return (
    <>
      {/* Desktop Floating Sticky Sidebar */}
      <aside className="hidden lg:block sticky top-28 w-80 shrink-0">
        <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl shadow-purple-950/5 p-6 relative overflow-hidden transition-all duration-300 hover:border-purple-300/80">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-2xl rounded-full pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 text-purple-900">
              <div className="p-1.5 rounded-lg bg-purple-100/80 text-purple-700">
                <ListTree size={16} />
              </div>
              <span className="font-display font-bold text-sm tracking-tight text-slate-900">
                Daftar Isi
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
              {readingPercent}% Selesai
            </span>
          </div>

          {/* Progress Bar inside TOC */}
          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mb-5">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
              style={{ width: `${Math.min(readingPercent, 100)}%` }}
            />
          </div>

          {/* Scrollable List with Max Height */}
          <div className="relative pl-3 max-h-[calc(100vh-22rem)] overflow-y-auto pr-2 custom-scrollbar">
            {/* Continuous Track Line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-slate-100 rounded-full" />
            
            {/* Animated Progress Spine */}
            <motion.div 
              className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-purple-600 origin-top rounded-full"
              style={{ scaleY }}
            />

            <ul ref={tocListRef} className="space-y-2.5 relative z-10 m-0 p-0 list-none">
              {headings.map((heading) => {
                const isActive = activeId === heading.id;
                const isH3 = heading.level === 3;
                
                return (
                  <li 
                    key={heading.id} 
                    data-id={heading.id}
                    className={`relative transition-all duration-200 ${isH3 ? 'pl-5' : 'pl-4'}`}
                  >
                    {/* Active Bullet Indicator */}
                    <div 
                      className={`absolute top-2.5 -left-[1px] w-2 h-2 rounded-full transition-all duration-300 ${
                        isActive 
                          ? 'bg-purple-600 ring-4 ring-purple-600/20 scale-110' 
                          : 'bg-slate-300 scale-75'
                      }`} 
                    />
                    
                    <button
                      type="button"
                      onClick={() => scrollToHeading(heading.id)}
                      className={`w-full text-left transition-all duration-200 rounded-xl py-1.5 px-2.5 cursor-pointer flex items-start gap-1.5 ${
                        isH3 ? 'text-xs' : 'text-sm font-semibold'
                      } ${
                        isActive 
                          ? 'text-purple-950 font-bold bg-purple-50/90 shadow-2xs border border-purple-200/60 translate-x-1' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:translate-x-0.5'
                      }`}
                    >
                      <span className={`mt-0.5 shrink-0 ${isActive ? 'text-purple-600' : 'text-slate-400'}`}>
                        {isH3 ? <ChevronRight size={13} /> : <Hash size={13} />}
                      </span>
                      <span className="leading-snug line-clamp-2">
                        {heading.text}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-purple-700 transition-colors py-1 px-2 rounded-lg hover:bg-purple-50 cursor-pointer"
            >
              <ArrowUp size={14} /> Ke Atas
            </button>
            <a
              href="https://wa.me/6282125447232?text=Halo%20CHESTA%2C%20saya%20tertarik%20dengan%20arsitektur%20website%20Next.js%20B2B."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-2.5 py-1 rounded-full transition-colors"
            >
              <MessageSquare size={12} /> Konsultasi
            </a>
          </div>
        </div>
      </aside>

      {/* Mobile Floating Quick-Nav Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-900 to-indigo-900 text-white px-4 py-3 rounded-full shadow-2xl border border-purple-400/30 text-xs font-bold uppercase tracking-wider backdrop-blur-md cursor-pointer"
        >
          <ListTree size={16} className="text-purple-300" />
          <span>Daftar Isi</span>
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-mono">
            {readingPercent}%
          </span>
        </motion.button>
      </div>

      {/* Mobile Table of Contents Bottom Sheet / Modal */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex items-end justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
            />

            {/* Bottom Sheet Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg bg-white rounded-t-3xl p-6 shadow-2xl border-t border-slate-200 max-h-[80vh] flex flex-col z-10"
            >
              {/* Drawer Handle */}
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />

              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
                    <ListTree size={16} />
                  </div>
                  <h4 className="font-display font-bold text-base text-slate-900 m-0">
                    Navigasi Artikel
                  </h4>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Mobile Scrollable TOC List */}
              <div className="overflow-y-auto flex-1 pr-1 space-y-2 py-2">
                {headings.map((heading) => {
                  const isActive = activeId === heading.id;
                  const isH3 = heading.level === 3;

                  return (
                    <button
                      key={heading.id}
                      type="button"
                      onClick={() => scrollToHeading(heading.id)}
                      className={`w-full text-left py-2.5 px-3.5 rounded-xl transition-all flex items-start gap-2.5 ${
                        isH3 ? 'pl-7 text-xs' : 'text-sm font-bold'
                      } ${
                        isActive
                          ? 'bg-purple-50 text-purple-900 border border-purple-200 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className={`mt-0.5 shrink-0 ${isActive ? 'text-purple-600' : 'text-slate-400'}`}>
                        {isH3 ? <ChevronRight size={13} /> : <Hash size={14} />}
                      </span>
                      <span className="leading-snug">{heading.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Drawer Footer */}
              <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    scrollToTop();
                    setIsMobileOpen(false);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-purple-700 py-1.5 px-3 rounded-lg hover:bg-purple-50"
                >
                  <ArrowUp size={14} /> Ke Bagian Paling Atas
                </button>
                <span className="text-xs font-mono font-bold text-purple-700">
                  {readingPercent}% Dibaca
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

