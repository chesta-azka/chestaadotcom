import { motion } from 'motion/react';
import { useState } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#06080F]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      onAnimationComplete={() => setVisible(false)}
    >
      <motion.h1
        className="text-[#D4FF00] text-3xl font-display font-bold tracking-tighter"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2 }}
      >
        CHESTA.
      </motion.h1>
      <motion.div
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#06080F] z-50 pointer-events-none"
        initial={{ y: 0 }}
        animate={{ y: '-100%' }}
        transition={{ delay: 1.5, duration: 0.8, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#06080F] z-50 pointer-events-none"
        initial={{ y: 0 }}
        animate={{ y: '100%' }}
        transition={{ delay: 1.5, duration: 0.8, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
