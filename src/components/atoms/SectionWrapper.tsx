import { motion } from 'motion/react';
import { ReactNode } from 'react';
import SectionBackground from './SectionBackground';

interface SectionWrapperProps {
  children: ReactNode;
  backgroundType?: 'grid' | 'blob' | 'none';
  divider?: boolean;
}

export default function SectionWrapper({ children, backgroundType = 'none', divider = false }: SectionWrapperProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05 
      }}
    >
      {divider && (
        <motion.div 
          className="absolute top-0 left-0 right-0 h-[1px] bg-slate-200"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      )}
      <SectionBackground type={backgroundType} />
      {children}
    </motion.div>
  );
}
