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
    return Array.from({ length: 30 }).map((_, i) => {
      const size = Math.random() * 3.5 + 1.5;
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        opacity: Math.random() * 0.4 + 0.1,
        parallaxSpeed: Math.random() * 0.04 + 0.01,
      };
    });
  }, []);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute top-[10%] left-[20%] w-[350px] h-[350px] bg-purple-100/40 rounded-full blur-[100px]" />
      <div className="absolute bottom-[20%] right-[10%] w-[250px] h-[250px] bg-purple-200/30 rounded-full blur-[90px]" />
      
      {particles.map((p) => {
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
            className="absolute rounded-full bg-purple-300"
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
