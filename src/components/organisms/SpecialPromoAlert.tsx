'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { PROMO_CONFIG } from '../../config/promoConfig';

export default function SpecialPromoAlert() {
  const [isVisible, setIsVisible] = useState(true);

  if (!PROMO_CONFIG.active || !PROMO_CONFIG.imageUrl) {
    return null;
  }

  const handleToggleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[90vw] max-w-sm sm:max-w-md rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-purple-500/40 bg-[#581c87]"
        >
          {/* Close Button (X) */}
          <button
            onClick={handleToggleClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/95 flex items-center justify-center text-white transition-colors cursor-pointer z-30 shadow-2xl"
            aria-label="Tutup Promo"
          >
            <X size={20} />
          </button>

          {/* Clickable Image Banner Container */}
          <a
            href={PROMO_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block w-full aspect-square overflow-hidden group select-none"
          >
            <img
              src={PROMO_CONFIG.imageUrl}
              alt="Special Promo Chestaa"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
