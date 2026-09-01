"use client";
import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export function Breadcrumbs() {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex items-center gap-2 px-3.5 py-1.5 mb-6 bg-purple-50 border border-purple-100 rounded-full w-max font-sans text-xs"
      aria-label="Breadcrumb"
    >
      <Link href="/" className="text-slate-600 hover:text-purple-900 transition-colors flex items-center gap-1 font-medium">
        <Home className="w-3.5 h-3.5" /> Beranda
      </Link>
      <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
      <span className="text-purple-900 font-semibold">Studi Kasus</span>
    </motion.nav>
  );
}
