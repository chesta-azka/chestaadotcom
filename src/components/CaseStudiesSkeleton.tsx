"use client";
import React from 'react';
import { motion } from 'framer-motion';

export function CaseStudiesSkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto my-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="w-full h-[20rem] rounded-3xl p-6 sm:p-8 border border-purple-100 bg-white shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-20 h-4 bg-purple-50 rounded-md" />
                <div className="w-5 h-5 bg-purple-50 rounded-md" />
              </div>
              <div className="w-2/3 h-6 bg-slate-100 rounded-lg mb-3" />
              <div className="w-full h-12 bg-slate-50 rounded-lg mb-4" />
            </div>
            <div className="pt-4 border-t border-slate-100">
              <div className="w-16 h-3 bg-slate-100 rounded-md mb-2" />
              <div className="w-1/3 h-5 bg-purple-100 rounded-md" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
