import { motion, useScroll, useSpring } from 'motion/react';
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
  if (!isBlog) {
    return null;
  }

  // Detect which article is active via ?read=slug
  const queryParams = new URLSearchParams(location.search);
  const readSlug = queryParams.get('read');
  const activeArticle = ALL_ARTICLES.find(a => a.slug === readSlug);

  if (!activeArticle) {
    // Standard progress bar for blog lists/scroll
    return (
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#D4FF00] origin-left z-[100]"
        style={{ scaleX }}
      />
    );
  }

  const totalMinutes = activeArticle.readTimeMinutes || 5;
  const rawMinutesLeft = (1 - progress) * totalMinutes;
  const minutesLeft = Math.max(1, Math.ceil(rawMinutesLeft));
  const isFinished = progress >= 0.95;

  return (
    <>
      {/* Top scroll progress line with custom color accent */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4FF00] to-green-400 origin-left z-[100] shadow-[0_1px_10px_rgba(212,255,0,0.5)]"
        style={{ scaleX }}
      />

      {/* Elegant Architectural Float Pill */}
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
    </>
  );
}

