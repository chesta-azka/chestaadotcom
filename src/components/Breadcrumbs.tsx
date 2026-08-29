"use client";
import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export function Breadcrumbs() {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center gap-2 px-4 py-2.5 mb-8 backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-white/10 rounded-2xl shadow-sm w-max"
      aria-label="Breadcrumb"
    >
      <Link href="/" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors flex items-center gap-1.5 text-sm font-medium">
        <Home className="w-4 h-4" /> Home
      </Link>
      <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600" />
      <span className="text-slate-900 dark:text-white text-sm font-semibold tracking-tight">Case Studies</span>
    </motion.nav>
  );
}
