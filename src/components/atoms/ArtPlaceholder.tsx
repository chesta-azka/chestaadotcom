'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Image as ImageIcon } from 'lucide-react';

interface ArtPlaceholderProps {
  src?: string;
  alt?: string;
  className?: string;
}

export default function ArtPlaceholder({ src, alt = 'Visual Showcase', className = '' }: ArtPlaceholderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // If no src is provided, we simulate a 'loaded' state after a delay or just keep it as a pure placeholder.
  // But to be safe, if there's an src, we rely on onLoad.
  
  return (
    <div className={`w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden relative mb-10 border border-slate-100 bg-slate-50 flex items-center justify-center group ${className}`}>
      
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-10 bg-slate-100 overflow-hidden"
          >
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 z-10 w-[200%]"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
              }}
              animate={{ x: ['-100%', '50%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
            {/* Base pulse for good measure */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-200/50 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actual Image if provided */}
      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100 z-20' : 'opacity-0 z-0'}`}
          referrerPolicy="no-referrer"
        />
      ) : (
        /* Fallback decorative placeholder when no src is provided */
        <>
          <motion.div
            className="absolute inset-0 opacity-20 z-0"
            style={{
              background: 'linear-gradient(120deg, #9333ea 0%, #c084fc 50%, #f3e8ff 100%)',
              backgroundSize: '200% 200%'
            }}
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="relative z-20 flex flex-col items-center text-purple-900 group-hover:scale-105 transition-transform duration-500 font-sans mt-8">
            <div className="w-12 h-12 rounded-2xl bg-white border border-purple-100 flex items-center justify-center mb-3 shadow-xs">
              <Sparkles className="w-5 h-5 text-purple-700" />
            </div>
            <p className="text-xs tracking-wider font-semibold uppercase text-purple-900">
              CHESTADOTCOM &bull; {hasError ? 'Asset Error' : 'Visual Showcase'}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
