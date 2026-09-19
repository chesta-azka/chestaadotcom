import React, { ReactNode } from 'react';
import { motion, Variants } from 'motion/react';

interface AnimatedHeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  yOffset?: number;
}

const headingVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: 'blur(4px)',
  },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.65,
      delay: customDelay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function AnimatedHeading({
  as: Tag = 'h2',
  children,
  className = '',
  delay = 0,
  id,
  yOffset = 24,
}: AnimatedHeadingProps) {
  const customVariants: Variants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.65,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const Component = motion[Tag];

  return (
    <Component
      id={id}
      variants={customVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {children}
    </Component>
  );
}
