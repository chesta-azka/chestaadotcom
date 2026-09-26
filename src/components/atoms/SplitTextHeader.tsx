'use client';

import React from 'react';
import { motion } from 'motion/react';

interface SplitTextHeaderProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export default function SplitTextHeader({ text, className = "", as = 'h2' }: SplitTextHeaderProps) {
  const words = text.split(' ');
  const Tag = as;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      filter: "blur(12px)",
      scale: 0.9 
    },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      scale: 1,
      transition: {
        type: "spring" as const,
        mass: 0.8,
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <Tag className={`${className} overflow-hidden`}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="inline-block"
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block mr-[0.25em] whitespace-nowrap">
            <motion.span
              variants={wordVariants}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
