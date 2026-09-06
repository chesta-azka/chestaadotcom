"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

type RelatedStudy = {
  id: number | string;
  slug: string;
  client: string;
  title: string;
  desc: string;
  impact: string;
};

export default function RelatedCaseStudiesSlider({ relatedStudies }: { relatedStudies: RelatedStudy[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollPosition = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.scrollWidth / relatedStudies.length;
    const newIndex = Math.round(scrollPosition / cardWidth);
    setActiveIndex(newIndex);
  };

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.scrollWidth / relatedStudies.length;
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
  };

  return (
    <div className="mt-8 pt-16 border-t border-slate-200/80 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 fill-mode-both w-full relative">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-display font-bold tracking-tight text-slate-900">Related Implementations</h3>
        <Link to="/case-studies" className="text-xs font-mono font-bold uppercase tracking-wider text-purple-900 hover:text-purple-700 hover:underline">
          Lihat Semua &rarr;
        </Link>
      </div>
      
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {relatedStudies.map((related) => (
          <Link
            key={related.id}
            to={`/case-studies/${related.slug}`}
            className="flex-shrink-0 w-[85%] md:w-[400px] snap-center bg-white/90 backdrop-blur-3xl border border-slate-200/80 rounded-3xl p-8 hover:shadow-xl hover:border-purple-200 hover:-translate-y-1 transition-all duration-300 group relative flex flex-col justify-between h-[18rem]"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <p className="text-xs font-mono font-bold tracking-wider uppercase text-purple-900">{related.client}</p>
                <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 transition-colors" />
              </div>
              <h4 className="text-xl font-display font-bold text-slate-900 mb-3">{related.title}</h4>
              <p className="font-sans text-sm text-slate-600 line-clamp-3 mb-6 leading-relaxed tracking-tight">{related.desc}</p>
            </div>
            <div className="pt-4 border-t border-slate-200/80">
              <p className="text-[10px] text-slate-500 uppercase font-mono tracking-widest font-bold mb-1">Impact</p>
              <p className="text-purple-900 font-display font-bold text-lg">{related.impact}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="flex items-center justify-center gap-2 mt-2 pb-4">
        {relatedStudies.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full h-2 ${
              activeIndex === idx 
                ? 'w-6 bg-purple-900' 
                : 'w-2 bg-slate-300 hover:bg-purple-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
