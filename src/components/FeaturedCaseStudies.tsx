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

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
    doc.setTextColor(59, 130, 246); // Blue
    doc.text(study.title, 20, 42);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text("Project Overview:", 20, 60);
    doc.setFont("helvetica", "italic");
    doc.text(doc.splitTextToSize(study.desc, 170), 20, 68);
    
    doc.setFont("helvetica", "bold");
    doc.text("Architectural Impact:", 20, 100);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(16, 185, 129); // Emerald
    doc.text(study.impact, 65, 100);
    
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text("ROI & Business Metrics:", 20, 115);
    doc.setFont("helvetica", "normal");
    doc.text(doc.splitTextToSize(study.roi, 170), 20, 123);
    
    doc.save(`${study.client.replace(/\s+/g, '_')}_Executive_Summary.pdf`);
  };

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full h-[24rem] rounded-3xl overflow-hidden border border-slate-200/50 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl shadow-sm hover:shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-shadow duration-300"
    >
      {/* Base Content */}
      <div style={{ transform: "translateZ(30px)" }} className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
        <div>
          <div className="flex justify-between items-start">
            <p className="text-sm font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400">{study.client}</p>
            <ArrowUpRight className="w-6 h-6 text-slate-400 dark:text-slate-600" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mt-4 tracking-tight text-slate-900 dark:text-white leading-tight">{study.title}</h3>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-3 font-medium leading-relaxed">{study.desc}</p>
        </div>
        
        <div className="pt-5 border-t border-slate-200 dark:border-slate-800">
           <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Preview Impact</p>
           <p className="text-lg font-bold text-slate-900 dark:text-white">{study.impact}</p>
        </div>
      </div>

      {/* Slide-in Overlay */}
      <motion.div
        variants={{
          rest: { y: "100%", opacity: 0 },
          hover: { y: 0, opacity: 1 }
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        style={{ transform: "translateZ(60px)" }}
        className="absolute inset-0 bg-slate-900/95 dark:bg-slate-950/95 p-8 flex flex-col justify-center text-center backdrop-blur-xl pointer-events-auto"
      >
        <div className="flex-1 flex flex-col justify-center items-center">
          <p className="text-xs uppercase tracking-widest font-semibold text-slate-400 mb-2">ROI Verified</p>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400 font-bold text-4xl mb-4 tracking-tight">{study.impact}</p>
          <p className="text-slate-300 font-medium leading-relaxed text-sm max-w-[95%] line-clamp-3">
            {study.roi}
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-3 w-full">
          <Link
            href={`/case-studies/${study.slug}`}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-500 transition-all hover:scale-[1.02] active:scale-95 shadow-xl"
          >
            Read Case Study <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={generatePDF}
            className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all hover:scale-[1.02] active:scale-95 shadow-xl"
          >
            <Download className="w-4 h-4" />
            Download PDF Summary
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
    <div className="w-full max-w-5xl mx-auto my-20 px-4" style={{ perspective: 1500 }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <AnimatePresence>
          {displayed.map((study) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <CaseCard study={study} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {displayed.length < caseStudyDB.length && (
        <div ref={ref} className="w-full flex justify-center mt-16 pb-8">
          <div className="w-8 h-8 rounded-full border-2 border-slate-300 dark:border-slate-700 border-t-blue-500 dark:border-t-blue-400 animate-spin" />
        </div>
      )}
    </div>
  );
}
