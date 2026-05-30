import { motion } from 'motion/react';
import { ReactNode } from 'react';
import SectionBackground from './SectionBackground';

interface SectionWrapperProps {
  children: ReactNode;
  backgroundType?: 'grid' | 'blob' | 'none';
}

export default function SectionWrapper({ children, backgroundType = 'none' }: SectionWrapperProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <SectionBackground type={backgroundType} />
      {children}
    </motion.div>
  );
}
