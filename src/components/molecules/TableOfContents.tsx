import React, { useState, useEffect } from 'react';
import { List, ChevronDown, Hash, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface TOCItem {
  id: string;
  text: string;
  level: number; // 2 for H2, 3 for H3
}

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
}

export default function TableOfContents({ items, className = '' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!items || items.length === 0) return;

    // Set initial active id
    if (!activeId && items.length > 0) {
      setActiveId(items[0].id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0% -60% 0%',
        threshold: 0.1,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) {
    return null;
  }

  const scrollToHeading = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  return (
    <div 
      className={`bg-white/90 backdrop-blur-md rounded-2xl border border-purple-100/80 shadow-sm p-5 transition-all ${className}`}
    >
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer select-none pb-2"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100/80">
            <List size={15} />
          </div>
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
            Daftar Isi
            <span className="text-[10px] font-sans font-normal px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 border border-purple-100">
              {items.length} Bagian
            </span>
          </h4>
        </div>
        <button 
          className="text-slate-400 hover:text-purple-600 transition-colors p-1 rounded-md"
          aria-label="Toggle Table of Contents"
        >
          <ChevronDown 
            size={16} 
            className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <nav className="mt-3 pt-3 border-t border-purple-50/80 space-y-1">
              {items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => scrollToHeading(item.id, e)}
                    className={`group flex items-start gap-2 py-1.5 px-2.5 rounded-lg text-xs font-sans transition-all leading-snug ${
                      item.level === 3 ? 'ml-4 text-slate-500' : 'text-slate-700 font-medium'
                    } ${
                      isActive 
                        ? 'bg-purple-50/80 text-purple-800 font-semibold border-l-2 border-purple-600 pl-2' 
                        : 'hover:bg-slate-50 hover:text-purple-600'
                    }`}
                  >
                    <Hash 
                      size={12} 
                      className={`mt-0.5 shrink-0 transition-colors ${
                        isActive ? 'text-purple-600' : 'text-slate-300 group-hover:text-purple-400'
                      }`} 
                    />
                    <span className="line-clamp-2">{item.text}</span>
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
