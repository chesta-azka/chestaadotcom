import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Calculator } from 'lucide-react';
import QuickQuoteModal from './QuickQuoteModal';

interface FloatingQuoteTriggerProps {
  serviceInterest?: string;
}

export default function FloatingQuoteTrigger({ serviceInterest = '' }: FloatingQuoteTriggerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center gap-3 px-5 py-3.5 bg-slate-900 text-white rounded-full shadow-2xl hover:bg-purple-600 transition-colors group overflow-hidden border border-slate-700/50"
      >
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        
        <Calculator size={20} className="relative z-10" />
        <span className="font-mono text-[10px] font-bold tracking-widest uppercase relative z-10 hidden sm:block">
          Get Started
        </span>
      </motion.button>

      <QuickQuoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        serviceInterest={serviceInterest} 
      />
    </>
  );
}
