import { motion, useScroll, useSpring } from 'motion/react';
import { useLocation } from 'react-router-dom';

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const location = useLocation();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Only show on individual blog article pages (assuming they will be under /blog/:id)
  // For now, let's just show it on any blog related page if that's what's available
  if (!location.pathname.startsWith('/blog/')) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[#D4FF00] origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}
