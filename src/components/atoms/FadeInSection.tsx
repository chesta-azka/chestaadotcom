import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  scale?: number;
  viewport?: { once?: boolean; amount?: number; margin?: string };
}

export default function FadeInSection({ 
  children, 
  className = '', 
  delay = 0, 
  id,
  direction = 'up',
  scale = 0.98,
  viewport = { once: true, amount: 0.15 }
}: FadeInSectionProps) {
  const getInitialY = () => {
    if (direction === 'up') return 40;
    if (direction === 'down') return -40;
    return 0;
  };

  const getInitialX = () => {
    if (direction === 'left') return 40;
    if (direction === 'right') return -40;
    return 0;
  };

  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{
        hidden: { 
          opacity: 0, 
          y: getInitialY(), 
          x: getInitialX(),
          scale: scale,
          filter: 'blur(4px)' 
        },
        visible: {
          opacity: 1, 
          y: 0, 
          x: 0, 
          scale: 1,
          filter: 'blur(0px)',
          transition: {
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
            delay: delay,
            staggerChildren: 0.12
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
