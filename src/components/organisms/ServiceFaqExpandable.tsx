'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FaqItem {
  q: string;
  a: string;
}

interface ServiceFaqExpandableProps {
  faqs: FaqItem[];
}

export default function ServiceFaqExpandable({ faqs }: ServiceFaqExpandableProps) {
  // Track open/expanded state for each FAQ individually
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});

  const toggleItem = (idx: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const PREVIEW_LENGTH = 110;

  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => {
        const isExpanded = !!expandedItems[idx];
        const isLongAnswer = faq.a.length > PREVIEW_LENGTH;
        const previewText = isLongAnswer
          ? `${faq.a.substring(0, PREVIEW_LENGTH).trim()}...`
          : faq.a;

        return (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs transition-all hover:border-purple-200"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {faq.q}
              </h3>
            </div>

            <div className="pt-3">
              <AnimatePresence initial={false} mode="wait">
                {isExpanded ? (
                  <motion.div
                    key="full"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                      {faq.a}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {previewText}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {isLongAnswer && (
                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => toggleItem(idx)}
                    aria-expanded={isExpanded}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-purple-700 hover:text-purple-900 transition-colors cursor-pointer py-1"
                  >
                    <span>{isExpanded ? 'Tampilkan Lebih Sedikit' : 'Lihat Selengkapnya (Show More)'}</span>
                    {isExpanded ? (
                      <ChevronUp size={14} className="shrink-0" />
                    ) : (
                      <ChevronDown size={14} className="shrink-0" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
