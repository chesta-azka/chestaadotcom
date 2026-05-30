import { motion } from 'motion/react';

interface TextRevealSmoothProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClass?: string;
  wordClassName?: string;
  once?: boolean;
}

export default function TextRevealSmooth({ 
  text, 
  className = '',
  highlightWords = [],
  highlightClass = "text-transparent bg-clip-text bg-gradient-to-r from-[#D4FF00] to-green-400 font-serif italic",
  wordClassName = "",
  once = true
}: TextRevealSmoothProps) {
  const words = text.split(" ");

  // Simple, clean stagger wrapper
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04, // Snappier, standard delay
        delayChildren: 0.05,
      }
    }
  };

  // Simple static fade-in transition with a gentle y-axis shift
  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 6 // Gentle 6px translation
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4, // Fast, normal transition
        ease: "easeOut" as const // Standard industrial ease interface
      }
    }
  };

  return (
    <motion.span 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once : once, margin: "-60px" }}
      className={`inline-flex flex-wrap items-center gap-x-[0.22em] gap-y-[0.05em] leading-[1.1] ${className}`}
    >
      {words.map((word, idx) => {
        // Find if this word matches any highlight word (strip punctuation)
        const cleanWord = word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        const isHighlight = highlightWords.some(hw => cleanWord === hw.toLowerCase());
        const wordColorClass = isHighlight ? highlightClass : "text-white";

        return (
          <motion.span
            key={idx}
            variants={wordVariants}
            className={`inline-block ${wordClassName}`}
          >
            <span className={`${wordColorClass} select-none`}>
              {word}
            </span>
          </motion.span>
        );
      })}
    </motion.span>
  );
}
