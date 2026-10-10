'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ListTree } from 'lucide-react';

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

interface BlogTableOfContentsProps {
  headings: TocHeading[];
  variant?: 'mobile' | 'desktop';
}

export default function BlogTableOfContents({ headings, variant = 'desktop' }: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const yOffset = -120;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(y, { duration: 1 });
      } else {
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      window.history.pushState(null, '', `#${id}`);
      setActiveId(id);
    }
  };

  if (headings.length === 0) return null;

  if (variant === 'mobile') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="lg:hidden p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-left"
        aria-label="Daftar Isi Artikel Mobile"
      >
        <div className="flex items-center gap-2 pb-3 border-b border-slate-200/80 text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
          <ListTree size={16} className="text-purple-600" />
          <span>Daftar Isi Artikel</span>
        </div>
        <nav aria-label="Mobile Table of Contents" className="space-y-1.5">
          {headings.map((h, i) => {
            const isActive = activeId === h.id;
            return (
              <a
                key={i}
                href={`#${h.id}`}
                onClick={(e) => scrollToHeading(e, h.id)}
                className={`block py-1 transition-colors leading-snug ${
                  h.level === 3
                    ? `pl-4 text-xs ${isActive ? 'text-purple-700 font-semibold' : 'text-slate-500 hover:text-purple-700'}`
                    : `text-xs sm:text-sm font-semibold ${isActive ? 'text-purple-700' : 'text-slate-800 hover:text-purple-700'}`
                }`}
              >
                {h.text}
              </a>
            );
          })}
        </nav>
      </motion.div>
    );
  }

  // Desktop sticky sidebar with subtle Framer Motion entrance animation
  return (
    <motion.aside
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      aria-label="Sidebar Table of contents"
      className="hidden lg:block w-72 shrink-0 sticky top-36 self-start max-h-[calc(100vh-10rem)] overflow-y-auto overscroll-contain pr-1"
    >
      <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-left">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-200/80 text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
          <ListTree size={16} className="text-purple-600" />
          <span>Daftar Isi</span>
        </div>
        <nav aria-label="Table of contents navigation" className="space-y-1">
          {headings.map((h, i) => {
            const isActive = activeId === h.id;
            return (
              <a
                key={i}
                href={`#${h.id}`}
                onClick={(e) => scrollToHeading(e, h.id)}
                className={`block py-1.5 px-2.5 rounded-lg transition-all duration-200 leading-snug ${
                  isActive
                    ? 'bg-purple-50 text-purple-800 font-semibold border-l-2 border-purple-600'
                    : 'hover:bg-purple-50/60 hover:text-purple-800 text-slate-700'
                } ${
                  h.level === 3
                    ? 'ml-3 text-xs font-normal text-slate-500'
                    : 'text-xs sm:text-sm font-medium'
                }`}
              >
                {h.text}
              </a>
            );
          })}
        </nav>
      </div>
    </motion.aside>
  );
}
