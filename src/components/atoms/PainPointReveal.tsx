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
  highlightClass = "text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-[#4f46e5]"
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
      viewport={{ once: true, margin: "-80px" }}
      className={`inline-flex flex-wrap items-center gap-x-[0.25em] gap-y-[0.05em] ${className}`}
    >
      {words.map((word, idx) => {
        // Find if the word contains any of the target highlight words (ignoring punctuation if any)
        const cleanWord = word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        const isHighlight = highlightWords.some(hw => cleanWord === hw.toLowerCase());
        const wordColorClass = isHighlight ? highlightClass : "text-slate-900";

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


