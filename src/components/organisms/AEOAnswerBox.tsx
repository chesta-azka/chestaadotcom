import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { generateAEOParagraphs, AEOSnippetConfig } from '../../utils/aeoSnippetGenerator';
import { motion } from 'motion/react';

interface AEOAnswerBoxProps {
  config: AEOSnippetConfig;
  className?: string;
}

export default function AEOAnswerBox({ config, className = '' }: AEOAnswerBoxProps) {
  const snippet = generateAEOParagraphs(config);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-indigo-50 border-l-4 border-indigo-600 p-6 md:p-8 rounded-r-2xl shadow-sm ${className}`}
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={18} className="text-indigo-600" />
        <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest font-mono">
          AEO Fast Answer
        </span>
      </div>
      
      <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900 mb-3">
        {snippet.heading}
      </h3>
      
      <p className="text-slate-700 font-sans leading-relaxed text-base md:text-lg mb-6">
        <strong>Ringkasan:</strong> {snippet.whoWhatWhy}
      </p>

      {snippet.listFormatted.length > 0 && (
        <div className="bg-white/60 p-5 rounded-xl border border-indigo-100/50">
          <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">
            {snippet.stepsHeading}
          </h4>
          <ul className="space-y-2">
            {snippet.listFormatted.map((step, idx) => (
              <li key={idx} className="flex gap-3 text-slate-700 text-sm md:text-base">
                <span className="text-indigo-600 font-bold shrink-0 flex items-center justify-center w-5 h-5 rounded bg-indigo-100 text-xs">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
