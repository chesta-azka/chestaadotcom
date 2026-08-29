import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import { useEffect } from 'react';

export default function InteractiveBackground() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Global Blur Elements */}
      <div className="fixed -top-[20%] left-1/4 w-[800px] h-[800px] bg-black/[0.02] rounded-full blur-[150px] pointer-events-none z-[0]" />
      <div className="fixed top-[20%] right-0 w-[600px] h-[600px] bg-black/[0.02] rounded-full blur-[150px] pointer-events-none z-[0]" />

      {/* Interactive Purple Glow */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[0] mix-blend-multiply opacity-50"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(107, 33, 168, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Subtle Noise Texture */}
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Base Architectural Grid Lines */}
      <div 
        className="fixed inset-0 pointer-events-none z-[2] opacity-[0.6]"
        style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(107, 33, 168, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(107, 33, 168, 0.05) 1px, transparent 1px)', 
          backgroundSize: '60px 60px' 
        }}
      />

      {/* Interactive Illuminated Grid Lines */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-[2] opacity-[0.8]"
        style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(107, 33, 168, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(107, 33, 168, 0.15) 1px, transparent 1px)', 
          backgroundSize: '60px 60px',
          maskImage: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              black,
              transparent 80%
            )
          `,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              black,
              transparent 80%
            )
          `
        }}
      />

      {/* Interactive Grid Intersections (Glow Dots) */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-[3] opacity-100"
        style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(107, 33, 168, 0.8) 1.5px, transparent 0)', 
          backgroundSize: '60px 60px',
          backgroundPosition: '-1px -1px',
          maskImage: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              black,
              transparent 70%
            )
          `,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              black,
              transparent 70%
            )
          `
        }}
      />
    </>
  );
}
