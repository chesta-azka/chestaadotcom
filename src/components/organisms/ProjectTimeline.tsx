"use client";

import React from 'react';
import { motion } from 'motion/react';
import { SearchCode, ShieldCheck, Activity, LockKeyhole } from 'lucide-react';

const timelineSteps = [
  { id: 1, title: 'Analisis', icon: SearchCode },
  { id: 2, title: 'Desain', icon: ShieldCheck },
  { id: 3, title: 'Perakitan', icon: Activity },
  { id: 4, title: 'Peluncuran', icon: LockKeyhole },
];

export default function ProjectTimeline() {
  return (
    <div className="w-full py-8 mb-6 font-sans">
      <h3 className="text-xs font-semibold tracking-wider uppercase text-slate-400 mb-8 text-center md:text-left">
        Alur Pelaksanaan Proyek
      </h3>
      
      <div className="relative flex justify-between items-center w-full max-w-3xl mx-auto md:mx-0">
        {/* Base Connecting Line */}
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-[2px] bg-purple-100 rounded-full" />
        
        {/* Animated Progress Line */}
        <motion.div 
          className="absolute left-4 top-1/2 -translate-y-1/2 h-[2px] bg-purple-600 rounded-full z-0"
          initial={{ width: 0 }}
          whileInView={{ width: "calc(100% - 2rem)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
        />

        {timelineSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.2, type: "spring", stiffness: 200 }}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-purple-200 flex items-center justify-center shadow-xs relative"
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5 text-purple-900 relative z-10" />
              </motion.div>
              
              <motion.span 
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.2 }}
                className="text-[10px] md:text-xs uppercase tracking-wider font-semibold text-slate-600 absolute top-[3.2rem] md:top-[3.8rem] text-center w-24 -ml-12 left-1/2"
              >
                {step.title}
              </motion.span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
