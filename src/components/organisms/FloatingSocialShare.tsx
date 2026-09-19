'use client';

import React from 'react';
import { motion } from 'motion/react';
import SocialShare from '../molecules/SocialShare';

interface FloatingSocialShareProps {
  title: string;
  description?: string;
}

export default function FloatingSocialShare({ title, description }: FloatingSocialShareProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:block"
    >
      <div className="flex flex-col items-center gap-4 py-6 px-3 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full shadow-2xl shadow-purple-900/5">
        <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-transparent rounded-full mb-2" />
        <SocialShare title={title} description={description} vertical={true} />
        <div className="w-1 h-8 bg-gradient-to-t from-purple-600 to-transparent rounded-full mt-2" />
      </div>
    </motion.div>
  );
}
