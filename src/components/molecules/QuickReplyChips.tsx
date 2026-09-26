import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, MessageSquare, Calendar, ExternalLink, Zap } from 'lucide-react';
import { ParsedOption } from '../../utils/aiResponseParser';

interface QuickReplyChipsProps {
  options: ParsedOption[];
  onSelectOption: (option: ParsedOption) => void;
  disabled?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05
    }
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } }
};

const chipVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.92 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 380, damping: 24 }
  },
  exit: { opacity: 0, scale: 0.9, y: -5, transition: { duration: 0.1 } }
};

export default function QuickReplyChips({ options, onSelectOption, disabled = false }: QuickReplyChipsProps) {
  const [activeOptions, setActiveOptions] = useState<ParsedOption[]>(options);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  if (!activeOptions || activeOptions.length === 0) return null;

  const handleChipClick = (opt: ParsedOption) => {
    if (disabled) return;
    setSelectedLabel(opt.label);

    // Adaptive Next-Step Logic
    if (opt.nextStep === 'whatsapp' || opt.action?.toLowerCase().includes('whatsapp')) {
      // Transition to next follow-up state or execute
      setTimeout(() => {
        onSelectOption(opt);
      }, 150);
    } else if (opt.nextStep === 'schedule') {
      setTimeout(() => {
        onSelectOption(opt);
      }, 150);
    } else {
      // Dynamic adaptive follow-up options transition
      const followUps: ParsedOption[] = [
        { label: '💬 Lanjut ke WhatsApp', action: 'WhatsApp', nextStep: 'whatsapp', isUrgent: false },
        { label: '📅 Pilih Jadwal Konsultasi', action: 'Jadwal', nextStep: 'schedule', isUrgent: false },
        { label: '🔄 Kembali ke Menu Utama', action: 'Menu', nextStep: 'default', isUrgent: false }
      ];
      setActiveOptions(followUps);
      onSelectOption(opt);
    }
  };

  const getIcon = (opt: ParsedOption) => {
    if (opt.isUrgent) {
      return <Zap size={13} className="shrink-0 text-amber-500 group-hover:text-white transition-colors animate-bounce" />;
    }
    if (opt.nextStep === 'schedule' || opt.label.toLowerCase().includes('jadwal')) {
      return <Calendar size={13} className="shrink-0 text-purple-500 group-hover:text-white transition-colors" />;
    }
    if (opt.nextStep === 'whatsapp' || opt.label.toLowerCase().includes('whatsapp')) {
      return <MessageSquare size={13} className="shrink-0 text-emerald-500 group-hover:text-white transition-colors" />;
    }
    return <ArrowRight size={13} className="shrink-0 text-purple-400 group-hover:text-white transition-colors" />;
  };

  // Helper to strip or format markdown bolding inside chip labels for clean rendering
  const renderCleanLabel = (label: string) => {
    // If contains **...**, split and highlight
    const parts = label.split(/\*\*(.*?)\*\*/g);
    if (parts.length <= 1) return label;

    return (
      <span className="inline-flex items-center gap-1">
        {parts.map((part, i) => 
          i % 2 === 1 ? (
            <strong key={i} className="font-bold underline decoration-purple-400/60 decoration-2">{part}</strong>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeOptions.map(o => o.label).join('-')}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className="flex flex-wrap gap-2 mt-3 pt-1"
      >
        {activeOptions.map((opt, index) => {
          const isSelected = selectedLabel === opt.label;
          return (
            <motion.button
              key={`${opt.label}-${index}`}
              variants={chipVariants}
              whileHover={{ scale: disabled ? 1 : 1.03 }}
              whileTap={{ scale: disabled ? 1 : 0.97 }}
              disabled={disabled}
              onClick={() => handleChipClick(opt)}
              className={`group flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                disabled
                  ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  : opt.isUrgent
                  ? 'bg-purple-50 border border-purple-300 text-purple-900 hover:bg-purple-600 hover:text-white hover:border-purple-600 shadow-sm shadow-purple-500/20 font-semibold'
                  : isSelected
                  ? 'bg-purple-600 text-white border border-purple-600 shadow-sm'
                  : 'bg-white border border-purple-200 text-purple-700 hover:bg-purple-600 hover:text-white hover:border-purple-600 shadow-xs hover:shadow-sm hover:shadow-purple-600/20'
              }`}
            >
              {getIcon(opt)}
              <span className="whitespace-nowrap tracking-tight">{renderCleanLabel(opt.label)}</span>
            </motion.button>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}

