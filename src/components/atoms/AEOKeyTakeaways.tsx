import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface AEOKeyTakeawaysProps {
  title?: string;
  takeaways: string[];
  className?: string;
}

export default function AEOKeyTakeaways({ 
  title = "TL;DR / Key Takeaways", 
  takeaways,
  className = ""
}: AEOKeyTakeawaysProps) {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": title,
    "itemListElement": takeaways.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item
    }))
  };

  return (
    <motion.aside 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 my-8 shadow-sm ${className}`}
    >
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Sparkles className="text-purple-700 w-5 h-5" />
        </div>
        <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 m-0">
          {title}
        </h3>
      </div>
      
      <ul className="space-y-4" id="aeo-speakable-takeaways">
        {takeaways.map((item, index) => (
          <li 
            key={index} 
            className="flex items-start gap-3"
          >
            <CheckCircle2 className="text-emerald-500 w-5 h-5 mt-0.5 shrink-0" />
            <span className="text-slate-700 font-sans leading-relaxed text-sm sm:text-base">
              {item}
            </span>
          </li>
        ))}
      </ul>
      
      {/* Hidden SEO Text for context */}
      <div className="sr-only">
        These are the key summary points and answers provided by CHESTAADOTCOM.
      </div>
    </motion.aside>
  );
}
