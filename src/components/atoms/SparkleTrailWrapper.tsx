import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export default function SparkleTrailWrapper({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refined tech/magic colors: purple, emerald, blue, pink, amber
  const colors = ['#a855f7', '#34d399', '#60a5fa', '#ec4899', '#fbbf24'];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    // Spawn rate control (spawn roughly 60% of the time mouse moves)
    if (Math.random() > 0.6) return; 

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newSparkle = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: Math.random() * 5 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
    };

    setSparkles(prev => [...prev.slice(-12), newSparkle]);
  };

  useEffect(() => {
    if (sparkles.length > 0) {
      const timeout = setTimeout(() => {
        setSparkles(prev => prev.filter(s => Date.now() - s.id < 600));
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [sparkles]);

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className={`relative inline-flex ${className}`}
    >
      {children}
      <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden rounded-full">
        <AnimatePresence>
          {sparkles.map((sparkle) => (
            <motion.div
              key={sparkle.id}
              initial={{ opacity: 1, scale: 0, x: sparkle.x, y: sparkle.y }}
              animate={{ 
                opacity: 0, 
                scale: 1.5, 
                y: sparkle.y - (Math.random() * 30 + 15), 
                x: sparkle.x + (Math.random() * 30 - 15) 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute rounded-full"
              style={{
                width: sparkle.size,
                height: sparkle.size,
                backgroundColor: sparkle.color,
                boxShadow: `0 0 ${sparkle.size * 1.5}px ${sparkle.color}`,
                left: 0,
                top: 0,
                marginLeft: -sparkle.size / 2,
                marginTop: -sparkle.size / 2,
              }}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
