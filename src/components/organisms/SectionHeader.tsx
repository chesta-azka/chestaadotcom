import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface SectionHeaderProps {
  metaTag: string;
  title: string | ReactNode;
  description: string | ReactNode;
  align?: 'left' | 'center';
}

export default function SectionHeader({ metaTag, title, description, align = 'left' }: SectionHeaderProps) {
  const isCenter = align === 'center';
  
  return (
    <div className={`mb-12 md:mb-16 max-w-2xl ${isCenter ? 'text-center mx-auto' : 'text-left'}`}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`flex items-center gap-3 mb-4 ${isCenter ? 'justify-center' : ''}`}
      >
        {!isCenter && <span className="w-8 h-[1px] bg-purple-600" />}
        <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-purple-600 uppercase pt-0.5">
          {metaTag}
        </span>
        {!isCenter && <span className="w-8 h-[1px] bg-transparent" /> /* Balance spacing if needed, but usually omitted */}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="text-3xl md:text-4xl font-display font-medium tracking-tight text-slate-900 mb-4 leading-none"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="text-sm md:text-base text-slate-600 font-sans leading-relaxed"
      >
        {description}
      </motion.p>
    </div>
  );
}
