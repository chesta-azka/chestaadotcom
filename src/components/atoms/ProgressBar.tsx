import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ALL_ARTICLES } from '../../data/blogData';

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const location = useLocation();
  const [progress, setProgress] = useState(0);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setProgress(latest);
    });
  }, [scrollYProgress]);

  // Determine if we are on the blog route
  const isBlog = location.pathname.startsWith('/blog');
  
  // Detect which article is active via ?read=slug
  const queryParams = new URLSearchParams(location.search);
  const readSlug = queryParams.get('read');
  const activeArticle = isBlog ? ALL_ARTICLES.find(a => a.slug === readSlug) : null;

  // Reading time estimations: 
  // - If it is an active article, use its specified time. 
  // - If it is the homepage, estimate 4 mins (due to dense modules and faq layout).
  // - Otherwise, estimate 2 mins of structural overview reading.
  let totalMinutes = 2;
  if (activeArticle) {
    totalMinutes = activeArticle.readTimeMinutes || 5;
  } else if (location.pathname === '/') {
    totalMinutes = 4;
  }

  const rawMinutesLeft = (1 - progress) * totalMinutes;
  const minutesLeft = Math.max(1, Math.ceil(rawMinutesLeft));
  const isFinished = progress >= 0.96;

  // Horizontal tracking calculations for the tooltip
  // Clamped slightly between 1.5% and 98.5% so the pill never clips against screen edges
  const pct = useTransform(scaleX, [0, 1], [1.5, 98.5]);
  const left = useTransform(pct, (v) => `${v}%`);
  const translateX = useTransform(pct, (v) => `${-v}%`);

  // Build appropriate tooltip content based on current page context
  let tooltipLabel = '';
  if (isFinished) {
    tooltipLabel = 'TAMAT ✓';
  } else if (activeArticle) {
    tooltipLabel = `${minutesLeft}M SISA`;
  } else {
    tooltipLabel = `${Math.round(progress * 100)}% DETIL`;
  }

  return (
    <>
      {/* Top scroll progress line with custom gradient color accent */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4FF00] to-green-400 origin-left z-[100] shadow-[0_1px_10px_rgba(212,255,0,0.5)]"
        style={{ scaleX }}
      />

      {/* Floating horizontal progress tooltip with respiratory animation */}
      <motion.div
        style={{ left, translateX }}
        initial={{ opacity: 0, y: -4, scale: 0.9 }}
        animate={{ 
          opacity: progress > 0.015 ? 1 : 0, 
          y: progress > 0.015 ? [2, -1, 2] : -4, // Floating respiration animation loop
          scale: progress > 0.015 ? 1 : 0.9 
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 2.5,
            ease: 'easeInOut'
          },
          opacity: { duration: 0.18 },
          scale: { duration: 0.18 }
        }}
        className="fixed top-2 z-[101] px-2 py-0.5 rounded-md bg-[#D4FF00] text-[#06080F] font-mono font-extrabold text-[9px] tracking-wider uppercase shadow-[0_4px_16px_rgba(212,255,0,0.35)] flex items-center gap-1 select-none pointer-events-none"
      >
        {/* Pointer Arrow */}
        <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-[#D4FF00]" />
        
        <span className="relative z-10 flex items-center gap-1 px-1">
          <span className={`w-1 h-1 rounded-full ${isFinished ? 'bg-green-700' : 'bg-[#06080F] animate-pulse'}`} />
          <span>{tooltipLabel}</span>
        </span>
      </motion.div>

      {/* Large Sidebar Status Float Pill for Active Blog Articles Only */}
      {activeArticle && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-24 right-6 bg-[#0D111A]/95 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-4 py-2 rounded-full z-[100] flex items-center gap-2 select-none"
        >
          <span className={`w-2 h-2 rounded-full ${isFinished ? 'bg-green-400' : 'bg-[#D4FF00] animate-pulse'}`} />
          <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase">
            {isFinished ? (
              <span className="text-green-400 font-semibold">SELESAI MEMBACA ✓</span>
            ) : (
              <>SISA BACA: <strong className="text-white">{minutesLeft} MENIT</strong></>
            )}
          </span>
        </motion.div>
      )}
    </>
  );
}
