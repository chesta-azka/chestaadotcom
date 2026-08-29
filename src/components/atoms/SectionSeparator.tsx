import { motion } from 'motion/react';
import { Diamond, ChevronDown, Sparkles } from 'lucide-react';
import React from 'react';

export type SeparatorVariant = 'wave-1' | 'wave-2' | 'wave-3' | 'blob-1' | 'blob-2' | 'auto';

interface SectionSeparatorProps {
  variant?: SeparatorVariant;
  index?: number;
  label?: string;
  className?: string;
}

export default function SectionSeparator({
  variant = 'auto',
  index = 0,
  label = 'Lanjut',
  className = ''
}: SectionSeparatorProps) {
  // Determine variant automatically if 'auto'
  const variantsPool: SeparatorVariant[] = ['wave-1', 'blob-1', 'wave-2', 'blob-2', 'wave-3'];
  const resolvedVariant = variant === 'auto' 
    ? variantsPool[index % variantsPool.length] 
    : variant;

  const scrollToNext = (e: React.MouseEvent<HTMLDivElement>) => {
    const currentSeparator = (e.target as HTMLElement).closest('.separator-container');
    if (currentSeparator && currentSeparator.nextElementSibling) {
      let nextEl = currentSeparator.nextElementSibling;
      while (nextEl && !nextEl.classList.contains('snap-start')) {
        nextEl = nextEl.nextElementSibling;
      }
      
      if (nextEl) {
        nextEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        currentSeparator.nextElementSibling.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className={`w-full relative py-3 sm:py-5 md:py-6 separator-container overflow-hidden select-none ${className}`}>
      {/* SVG Wave / Blob Graphics spanning 100% full width */}
      <div className="w-full relative flex flex-col items-center justify-center">
        
        {/* Variant 1: Elegant Smooth Sine Wave */}
        {resolvedVariant === 'wave-1' && (
          <div className="w-full h-10 sm:h-14 md:h-16 overflow-hidden relative">
            <svg 
              className="w-full h-full text-purple-600/10" 
              viewBox="0 0 1440 120" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#581c87" stopOpacity="0.03" />
                  <stop offset="50%" stopColor="#6366f1" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#581c87" stopOpacity="0.03" />
                </linearGradient>
              </defs>
              <path 
                d="M0,32L48,48C96,64,192,96,288,96C384,96,480,64,576,48C672,32,768,32,864,48C960,64,1056,96,1152,90.7C1248,85,1344,43,1392,21.3L1440,0L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" 
                fill="url(#waveGrad1)"
              />
              <path 
                d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,42.7C672,32,768,32,864,48C960,64,1056,96,1152,96C1248,96,1344,64,1392,48L1440,32" 
                stroke="#6366f1" 
                strokeOpacity="0.25" 
                strokeWidth="1.5" 
                strokeDasharray="4 4"
              />
            </svg>
          </div>
        )}

        {/* Variant 2: Organic Fluid Blob Contour */}
        {resolvedVariant === 'blob-1' && (
          <div className="w-full h-10 sm:h-14 md:h-16 overflow-hidden relative">
            <svg 
              className="w-full h-full text-purple-600/10" 
              viewBox="0 0 1440 120" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="blobGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.02" />
                  <stop offset="35%" stopColor="#581c87" stopOpacity="0.14" />
                  <stop offset="70%" stopColor="#7e22ce" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <path 
                d="M0,40 C320,110 420,-10 720,50 C1020,110 1180,10 1440,60 L1440,120 L0,120 Z" 
                fill="url(#blobGrad1)"
              />
              <path 
                d="M0,40 C320,110 420,-10 720,50 C1020,110 1180,10 1440,60" 
                stroke="#581c87" 
                strokeOpacity="0.2" 
                strokeWidth="1.5"
              />
            </svg>
          </div>
        )}

        {/* Variant 3: Double Multi-Layer Cresting Wave */}
        {resolvedVariant === 'wave-2' && (
          <div className="w-full h-10 sm:h-14 md:h-16 overflow-hidden relative">
            <svg 
              className="w-full h-full" 
              viewBox="0 0 1440 120" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="waveGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#581c87" stopOpacity="0.04" />
                  <stop offset="50%" stopColor="#6366f1" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.04" />
                </linearGradient>
              </defs>
              {/* Back wave */}
              <path 
                d="M0,70 C240,10 480,100 720,30 C960,-30 1200,80 1440,40 L1440,120 L0,120 Z" 
                fill="url(#waveGrad2)" 
                opacity="0.7"
              />
              {/* Front wave */}
              <path 
                d="M0,30 C300,95 600,0 900,75 C1200,120 1350,30 1440,55 L1440,120 L0,120 Z" 
                fill="url(#waveGrad2)"
              />
              <path 
                d="M0,30 C300,95 600,0 900,75 C1200,120 1350,30 1440,55" 
                stroke="#818cf8" 
                strokeOpacity="0.3" 
                strokeWidth="1.5"
              />
            </svg>
          </div>
        )}

        {/* Variant 4: Asymmetric Dynamic Organic Contour */}
        {resolvedVariant === 'blob-2' && (
          <div className="w-full h-10 sm:h-14 md:h-16 overflow-hidden relative">
            <svg 
              className="w-full h-full" 
              viewBox="0 0 1440 120" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="blobGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity="0.03" />
                  <stop offset="45%" stopColor="#7e22ce" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.03" />
                </linearGradient>
              </defs>
              <path 
                d="M0,80 C180,20 360,110 540,50 C720,-10 900,90 1080,30 C1260,-20 1380,80 1440,50 L1440,120 L0,120 Z" 
                fill="url(#blobGrad2)"
              />
              <path 
                d="M0,80 C180,20 360,110 540,50 C720,-10 900,90 1080,30 C1260,-20 1380,80 1440,50" 
                stroke="#581c87" 
                strokeOpacity="0.25" 
                strokeWidth="1.5" 
                strokeDasharray="6 6"
              />
            </svg>
          </div>
        )}

        {/* Variant 5: Harmonious Ripple Wave */}
        {resolvedVariant === 'wave-3' && (
          <div className="w-full h-10 sm:h-14 md:h-16 overflow-hidden relative">
            <svg 
              className="w-full h-full" 
              viewBox="0 0 1440 120" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="waveGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.04" />
                  <stop offset="50%" stopColor="#581c87" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.04" />
                </linearGradient>
              </defs>
              <path 
                d="M0,50 C200,90 400,20 600,60 C800,100 1000,30 1200,70 C1320,90 1380,40 1440,50 L1440,120 L0,120 Z" 
                fill="url(#waveGrad3)"
              />
              <path 
                d="M0,50 C200,90 400,20 600,60 C800,100 1000,30 1200,70 C1320,90 1380,40 1440,50" 
                stroke="#6366f1" 
                strokeOpacity="0.3" 
                strokeWidth="1.5"
              />
            </svg>
          </div>
        )}

        {/* Center Floating Interactive Pill with Ripple & Glass Accent */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <motion.div 
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="pointer-events-auto px-4 py-2 rounded-full bg-white/90 backdrop-blur-xl border border-purple-200/90 shadow-[0_4px_20px_rgba(88,28,135,0.12)] text-purple-800 cursor-pointer hover:bg-white hover:border-purple-400 transition-all flex items-center gap-2 group select-none ring-2 ring-purple-500/10"
            onClick={scrollToNext}
            title="Gulir ke bagian berikutnya"
          >
            <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-purple-600 to-purple-600 animate-pulse" />
            
            <Diamond size={13} strokeWidth={2.5} className="text-purple-600 group-hover:rotate-45 transition-transform duration-300" />
            
            <span className="text-[11px] font-mono font-bold tracking-widest text-slate-700 group-hover:text-purple-800 uppercase">
              {label}
            </span>
            
            <ChevronDown size={13} className="text-purple-500 group-hover:translate-y-0.5 transition-transform" />
          </motion.div>
        </div>

      </div>
    </div>
  );
}
