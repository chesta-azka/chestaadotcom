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
  highlightClass = "text-transparent bg-clip-text bg-gradient-to-r from-[#6b21a8] to-green-400 font-serif italic",
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

  // Simple scroll-linked blur-to-clear fade animation
  const wordVariants = {
    hidden: { 
      opacity: 0, 
      filter: "blur(6px)"
    },
    visible: { 
      opacity: 1, 
      filter: "blur(0px)",
      transition: {
        duration: 0.5, // Smooth and fast blur resolution
        ease: "easeOut" as const
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
        const wordColorClass = isHighlight ? highlightClass : "text-slate-900";

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
