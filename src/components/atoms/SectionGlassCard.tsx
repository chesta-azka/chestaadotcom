import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface SectionGlassCardProps {
  children: ReactNode;
  metaLabel: string;
  className?: string;
  index?: number;
  serviceType?: 'ai' | 'software' | null;
  pattern?: 'dots' | 'mesh' | 'grid' | 'auto';
  fluid?: boolean;
  id?: string;
}

export default function SectionGlassCard({ 
  children, 
  className = '', 
  index = 0, 
  fluid = false,
  id
}: SectionGlassCardProps) {
  return (
    <div className={`w-full ${fluid ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10'}`} id={id}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-4%" }}
        variants={{
          hidden: { opacity: 0, y: 25 },
          visible: {
            opacity: 1, y: 0,
            transition: {
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: Math.min(index * 0.05, 0.15),
              staggerChildren: 0.05
            }
          }
        }}
        className={`relative w-full transition-all duration-300 py-16 sm:py-20 lg:py-24 ${className}`}
      >
        {/* Inner Content with dynamic responsive flow */}
        <div className={`relative z-10 w-full ${fluid ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' : ''}`}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
