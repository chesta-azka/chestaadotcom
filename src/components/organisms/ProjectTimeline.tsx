"use client";

import React from 'react';
import { motion } from 'motion/react';
import { SearchCode, ShieldCheck, Activity, LockKeyhole } from 'lucide-react';

const timelineSteps = [
  { id: 1, title: 'Audit', icon: SearchCode },
  { id: 2, title: 'Provision', icon: ShieldCheck },
  { id: 3, title: 'Engineer', icon: Activity },
  { id: 4, title: 'Handoff', icon: LockKeyhole },
];

export default function ProjectTimeline() {
  return (
    <div className="w-full py-12 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both">
      <h3 className="text-sm font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-12 text-center md:text-left">Project Timeline</h3>
      
      <div className="relative flex justify-between items-center w-full max-w-3xl mx-auto md:mx-0">
        {/* Base Connecting Line */}
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-[2px] bg-slate-200 dark:bg-slate-800 rounded-full" />
        
        {/* Animated Progress Line */}
        <motion.div 
          className="absolute left-4 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full z-0"
          initial={{ width: 0 }}
          whileInView={{ width: "calc(100% - 2rem)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        />

        {timelineSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-4">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.3, type: "spring", stiffness: 200 }}
                className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-lg relative"
              >
                {/* Active glow/border effect */}
                <motion.div 
                  className="absolute inset-[-2px] rounded-full border-2 border-blue-500"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.3, duration: 0.5 }}
                />
                <Icon className="w-4 h-4 md:w-5 md:h-5 text-slate-700 dark:text-slate-300 relative z-10" />
              </motion.div>
              
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.3 }}
                className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400 absolute top-[3.5rem] md:top-[4.5rem] text-center w-24 -ml-12 left-1/2"
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
