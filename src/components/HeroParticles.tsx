"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export function HeroParticles() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 800 });

  useEffect(() => {
    setIsMounted(true);
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => {
      const size = Math.random() * 4 + 1;
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        opacity: Math.random() * 0.5 + 0.1,
        parallaxSpeed: Math.random() * 0.05 + 0.01,
      };
    });
  }, []);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Subtle glowing orbs */}
      <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-purple-500/10 dark:bg-purple-600/5 rounded-full blur-[100px]" />
      
      {/* Interactive particles */}
      {particles.map((p) => {
        // Calculate offset based on mouse position and particle's parallax speed
        const mouseOffsetX = (mousePos.x - windowSize.width / 2) * p.parallaxSpeed;
        const mouseOffsetY = (mousePos.y - windowSize.height / 2) * p.parallaxSpeed;
        
        return (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: p.opacity,
              x: mouseOffsetX,
              y: mouseOffsetY
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="absolute rounded-full bg-slate-400 dark:bg-slate-300"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
          />
        );
      })}
    </div>
  );
}
