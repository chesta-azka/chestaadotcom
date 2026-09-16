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
    <div className={`w-full ${fluid ? '' : 'container-wide'}`} id={id}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1, y: 0,
            transition: {
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: Math.min(index * 0.05, 0.15),
              staggerChildren: 0.1
            }
          }
        }}
        className={`relative w-full section-padding ${className}`}
      >
        {/* Inner Content with dynamic responsive flow */}
        <div className={`relative z-10 w-full ${fluid ? 'container-wide' : ''}`}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
