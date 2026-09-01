"use client";
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Download, ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import jsPDF from 'jspdf';
import Link from 'next/link';
import { caseStudyDB } from '../lib/caseStudies';

function CaseCard({ study }: { study: typeof caseStudyDB[0] }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full h-[22rem] rounded-3xl overflow-hidden border border-purple-100 bg-white shadow-sm hover:shadow-lg hover:shadow-purple-950/5 transition-all duration-300 font-sans"
    >
      {/* Base Content */}
      <div style={{ transform: "translateZ(20px)" }} className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-between pointer-events-none">
        <div>
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-purple-900 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
              {study.client}
            </span>
            <ArrowUpRight className="w-5 h-5 text-slate-400" />
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold mt-4 tracking-tight text-slate-900 leading-tight">
            {study.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal leading-relaxed">
            {study.desc}
          </p>
        </div>
        
        <div className="pt-4 border-t border-purple-100/60 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold">Hasil Pengukuran</p>
            <p className="text-base font-bold text-slate-900 font-display">{study.impact}</p>
          </div>
          <span className="text-xs text-purple-900 font-semibold">Detail &rarr;</span>
        </div>
      </div>

      {/* Slide-in Overlay */}
      <motion.div
        variants={{
          rest: { y: "100%", opacity: 0 },
          hover: { y: 0, opacity: 1 }
        }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
        style={{ transform: "translateZ(40px)" }}
        className="absolute inset-0 bg-white/98 p-6 sm:p-7 flex flex-col justify-center text-center backdrop-blur-md pointer-events-auto border border-purple-200"
      >
        <div className="flex-1 flex flex-col justify-center items-center">
          <p className="text-[10px] uppercase tracking-wider font-mono font-bold text-slate-400 mb-1">Hasil Terverifikasi</p>
          <p className="text-purple-900 font-bold text-3xl font-display mb-2">{study.impact}</p>
          <p className="text-slate-600 font-normal leading-relaxed text-xs max-w-[95%] line-clamp-3">
            {study.roi}
          </p>
        </div>
        <div className="mt-3 flex flex-col gap-2 w-full">
          <Link
            href={`/case-studies/${study.slug}`}
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
      </motion.div>
    </motion.div>
  );
}

export function FeaturedCaseStudies() {
  const [displayed, setDisplayed] = useState<typeof caseStudyDB>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  useEffect(() => {
    setDisplayed(caseStudyDB.slice(0, itemsPerPage));
  }, []);

  useEffect(() => {
    if (inView && displayed.length < caseStudyDB.length) {
      const timer = setTimeout(() => {
        const nextItems = caseStudyDB.slice(0, (page + 1) * itemsPerPage);
        setDisplayed(nextItems);
        setPage(p => p + 1);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [inView, page, displayed.length]);

  return (
    <div className="w-full max-w-5xl mx-auto my-6 px-4" style={{ perspective: 1500 }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <AnimatePresence>
          {displayed.map((study) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <CaseCard study={study} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {displayed.length < caseStudyDB.length && (
        <div ref={ref} className="w-full flex justify-center mt-8 pb-4">
          <div className="w-6 h-6 rounded-full border-2 border-purple-200 border-t-purple-700 animate-spin" />
        </div>
      )}
    </div>
  );
}
