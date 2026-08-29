"use client";
import React from 'react';
import { motion } from 'framer-motion';

export function CaseStudiesSkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto my-20 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {[1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="w-full h-[22rem] rounded-3xl p-8 border border-slate-200/50 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-24 h-4 bg-slate-200 dark:bg-slate-800/80 rounded-md" />
                <div className="w-6 h-6 bg-slate-200 dark:bg-slate-800/80 rounded-md" />
              </div>
              <div className="w-3/4 h-8 bg-slate-200 dark:bg-slate-800/80 rounded-lg mb-4" />
              <div className="w-full h-16 bg-slate-200 dark:bg-slate-800/80 rounded-lg mb-6" />
            </div>
            <div className="pt-5 border-t border-slate-200 dark:border-slate-800/50">
              <div className="w-20 h-3 bg-slate-200 dark:bg-slate-800/80 rounded-md mb-3" />
              <div className="w-1/3 h-6 bg-slate-200 dark:bg-slate-800/80 rounded-md" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
