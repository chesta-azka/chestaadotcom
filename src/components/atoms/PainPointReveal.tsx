import { motion } from 'motion/react';

interface PainPointRevealProps {
  text?: string;
  className?: string;
  highlightWords?: string[];
  highlightClass?: string;
}

export default function PainPointReveal({ 
  text = "Website lambat dan desain berantakan", 
  className = '',
  highlightWords = ["lambat", "berantakan"],
  highlightClass = "text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-[#D4FF00]"
}: PainPointRevealProps) {
  const words = text.split(" ");

  // Simple, clean stagger wrapper
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04, // Snappier standard delay
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
      viewport={{ once: true, margin: "-80px" }}
      className={`inline-flex flex-wrap items-center gap-x-[0.25em] gap-y-[0.05em] ${className}`}
    >
      {words.map((word, idx) => {
        // Find if the word contains any of the target highlight words (ignoring punctuation if any)
        const cleanWord = word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        const isHighlight = highlightWords.some(hw => cleanWord === hw.toLowerCase());
        const wordColorClass = isHighlight ? highlightClass : "text-white";

        return (
          <motion.span
            key={idx}
            variants={wordVariants}
            className="inline-block"
          >
            <span className={`${wordColorClass} tracking-tight select-none`}>
              {word}
            </span>
          </motion.span>
        );
      })}
    </motion.span>
  );
}


