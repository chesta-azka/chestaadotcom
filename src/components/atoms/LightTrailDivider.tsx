import React from 'react';
import { motion } from 'motion/react';

export default function LightTrailDivider() {
  return (
    <div className="relative w-full h-px bg-slate-100 overflow-hidden">
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
      />
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-purple-400/10"
      />
    </div>
  );
}
