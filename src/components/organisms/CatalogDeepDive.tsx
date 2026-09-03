import React from 'react';
import { motion } from 'motion/react';
import Markdown from 'markdown-to-jsx';
import { CATALOG_CONTENT } from '../../data/catalogContent';

export default function CatalogDeepDive() {
  return (
    <div className="w-full bg-white relative z-10 border-t border-slate-200">
      <div className="max-w-[1000px] mx-auto px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="prose prose-slate prose-lg md:prose-xl max-w-none
                     prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900
                     prose-h1:text-4xl md:prose-h1:text-5xl prose-h1:mb-12 prose-h1:pb-8 prose-h1:border-b prose-h1:border-slate-200
                     prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-purple-900
                     prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
                     prose-h4:text-lg prose-h4:text-purple-700 prose-h4:mt-8
                     prose-p:font-sans prose-p:leading-[1.8] prose-p:tracking-[0.015em] prose-p:text-slate-700 prose-p:mb-8
                     prose-strong:text-slate-900 prose-strong:font-bold
                     prose-li:my-3 prose-li:text-slate-700"
        >
          <Markdown>
            {CATALOG_CONTENT}
          </Markdown>
        </motion.div>
      </div>
    </div>
  );
}
