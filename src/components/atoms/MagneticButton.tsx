'use client';

import React, { useRef, useState, useMemo } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react';
import { cn } from '../../lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number;
}

export default function MagneticButton({ children, className, onClick, href, strength = 25 }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  
  // Motion values for the button container (background)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // High-end spring physics as requested
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Micro-parallax for internal content (text/icon)
  // They pull slightly more than the button background to create 3D depth
  const textX = useTransform(springX, (val) => val * 1.5);
  const textY = useTransform(springY, (val) => val * 1.5);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance and vector
    const moveX = clientX - centerX;
    const moveY = clientY - centerY;
    
    // Cap at a max pixel radius
    const maxMove = strength;
    const magX = Math.max(Math.min(moveX * 0.4, maxMove), -maxMove);
    const magY = Math.max(Math.min(moveY * 0.4, maxMove), -maxMove);
    
    x.set(magX);
    y.set(magY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={cn(
        "relative inline-flex items-center justify-center cursor-pointer group",
        className
      )}
      onClick={onClick}
    >
      <motion.div 
        style={{ x: textX, y: textY }}
        className="relative z-10 flex items-center gap-2"
      >
        {children}
      </motion.div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? "_blank" : undefined} rel={href.startsWith('http') ? "noopener noreferrer" : undefined}>
        {content}
      </a>
    );
  }

  return content;
}
