"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Download, ArrowRight } from 'lucide-react';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';
import { caseStudyDB } from '../lib/caseStudies';
import { useMotionMode, createSectionTimeline } from '../lib/motion';

function CaseCard({ study, index }: { study: typeof caseStudyDB[0]; index: number }) {
  const motionMode = useMotionMode();
  const isFull = motionMode === 'full';

  const generatePDF = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(`Executive Summary: ${study.client}`, 20, 30);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.setTextColor(107, 33, 168); // Purple
    doc.text(study.title, 20, 42);

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(12);
    doc.text("Ringkasan Proyek:", 20, 60);
    doc.setFont("helvetica", "italic");
    doc.text(doc.splitTextToSize(study.desc, 170), 20, 68);

    doc.setFont("helvetica", "bold");
    doc.text("Dampak Performa:", 20, 100);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(16, 185, 129); // Emerald
    doc.text(study.impact, 65, 100);

    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.text("Metrik Bisnis:", 20, 115);
    doc.setFont("helvetica", "normal");
    doc.text(doc.splitTextToSize(study.roi, 170), 20, 123);

    doc.save(`${study.client.replace(/\s+/g, '_')}_Summary.pdf`);
  };

  return (
    <div
      data-case-study="true"
      data-static-metric="true"
      style={{
        '--stack-offset': `${index * 12}px`,
        '--stack-scale': `${1 - index * 0.02}`,
      } as React.CSSProperties}
      className={`relative w-full h-[22rem] rounded-2xl overflow-hidden border border-purple-100 bg-white shadow-sm hover:shadow-lg hover:shadow-purple-950/5 transition-all duration-300 font-sans cursor-pointer group ${
        !isFull ? 'story-stack-card' : ''
      }`}
    >
      {/* Full card clickable link when not hovering overlay */}
      <Link to={`/case-studies/${study.slug}`} className="absolute inset-0 z-10" aria-label={study.title} />

      {/* Base Content */}
      <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-between z-0">
        <div>
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono font-medium tracking-wider uppercase text-purple-900 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
              {study.client}
            </span>
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-purple-700 transition-colors" />
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-semibold mt-4 tracking-tight text-slate-900 group-hover:text-purple-900 transition-colors leading-tight">
            {study.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal leading-relaxed line-clamp-3">
            {study.desc}
          </p>
        </div>

        <div className="pt-4 border-t border-purple-100/60 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-medium">Hasil Pengukuran</p>
            {/* Target metric is static badge, never counted up */}
            <p className="text-base font-semibold text-slate-900 font-display" data-static-metric="true">{study.impact}</p>
          </div>
          <span className="text-xs text-purple-900 font-medium group-hover:translate-x-1 transition-transform">Detail &rarr;</span>
        </div>
      </div>

      {/* Slide-in Overlay (CSS Compositor Only) */}
      <div
        className="absolute inset-0 bg-white/98 p-6 sm:p-7 flex flex-col justify-center text-center backdrop-blur-md z-20 border border-purple-200 transition-all duration-300 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
      >
        <div className="flex-1 flex flex-col justify-center items-center">
          <p className="text-[10px] uppercase tracking-wider font-mono font-medium text-slate-400 mb-1">Hasil Terverifikasi</p>
          <p className="text-purple-900 font-semibold text-3xl font-display mb-2">{study.impact}</p>
          <p className="text-slate-600 font-normal leading-relaxed text-xs max-w-[95%] line-clamp-3">
            {study.roi}
          </p>
        </div>
        <div className="mt-3 flex flex-col gap-2 w-full">
          <Link
            to={`/case-studies/${study.slug}`}
            className="w-full py-2.5 bg-purple-900 text-white rounded-2xl font-sans text-xs font-semibold flex items-center justify-center gap-2 hover:bg-purple-800 transition-all shadow-xs"
          >
            <span>Baca Studi Kasus</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={generatePDF}
            className="w-full py-2 bg-purple-50 text-purple-950 rounded-2xl font-sans text-xs font-semibold flex items-center justify-center gap-2 hover:bg-purple-100 transition-all border border-purple-100 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh Ringkasan PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function FeaturedCaseStudies() {
  const motionMode = useMotionMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState<typeof caseStudyDB>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 2;

  useEffect(() => {
    setDisplayed(caseStudyDB.slice(0, itemsPerPage));
    setIsLoading(false);
  }, []);

  // Desktop Full: pinned story section with ScrollTrigger timeline; Lite/mobile: native CSS sticky stacking
  useEffect(() => {
    if (motionMode !== 'full' || !containerRef.current) return;
    const { kill } = createSectionTimeline(containerRef.current);
    return () => kill();
  }, [motionMode]);

  if (isLoading) {
    return (
      <div className="w-full max-w-5xl mx-auto my-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="w-full h-[22rem] rounded-xl overflow-hidden border border-slate-200 bg-slate-50 animate-pulse flex flex-col justify-between p-6 sm:p-7 shadow-sm">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="h-6 w-24 bg-slate-200 rounded-full" />
                  <div className="w-5 h-5 bg-slate-200 rounded-full" />
                </div>
                <div className="h-8 w-3/4 bg-slate-200 rounded mt-4" />
                <div className="h-8 w-1/2 bg-slate-200 rounded mt-2" />
                <div className="h-4 w-full bg-slate-200 rounded mt-6" />
                <div className="h-4 w-5/6 bg-slate-200 rounded mt-2" />
              </div>
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between mt-auto">
                <div>
                  <div className="h-3 w-20 bg-slate-200 rounded mb-2" />
                  <div className="h-6 w-16 bg-slate-200 rounded" />
                </div>
                <div className="h-4 w-12 bg-slate-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const isFull = motionMode === 'full';

  return (
    <div
      ref={containerRef}
      className={`w-full max-w-5xl mx-auto my-6 px-4 ${
        !isFull ? 'story-stack-container' : ''
      }`}
    >
      <div className={`grid ${isFull ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 md:gap-8`}>
        {displayed.map((study, idx) => (
          <div
            key={study.id}
            className="transition-opacity duration-300 opacity-100"
          >
            <CaseCard study={study} index={idx} />
          </div>
        ))}
      </div>

      {displayed.length < caseStudyDB.length && (
        <div className="w-full flex justify-center mt-8 pb-4">
          <button
            type="button"
            onClick={() => {
              const next = caseStudyDB.slice(0, (page + 1) * itemsPerPage);
              setDisplayed(next);
              setPage((p) => p + 1);
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-purple-50 text-purple-900 border border-purple-200 hover:bg-purple-100 transition-colors cursor-pointer"
          >
            Muat Lebih Banyak
          </button>
        </div>
      )}
    </div>
  );
}

export default FeaturedCaseStudies;
