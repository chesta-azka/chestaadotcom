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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      {divider && (
        <motion.div 
          className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      )}
      <SectionBackground type={backgroundType} />
      {children}
    </motion.div>
  );
}
