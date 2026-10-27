import React, { useRef, useState, useEffect } from 'react';
import { useMotionMode } from '../../lib/motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * TiltCard (Apple-Restrained 3D Perspective Card)
 * - Desktop Full mode: Subtle 3D perspective tilt (max 5 deg) using compositor CSS transforms.
 * - Mobile & Lite mode: Completely inert (zero event listeners, zero tilt).
 * - Reduced motion: Completely inert.
 */
export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const motionMode = useMotionMode();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // In Lite or Reduced mode, do not bind mouse events or compute tilt
  const isInteractive = motionMode === 'full';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isInteractive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    // Cap tilt angle at max 5 degrees for Apple-grade restraint
    setTilt({
      x: -yPct * 6,
      y: xPct * 6,
    });
  };

  const handleMouseEnter = () => {
    if (isInteractive) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (isInteractive) {
      setIsHovered(false);
      setTilt({ x: 0, y: 0 });
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={isInteractive ? handleMouseMove : undefined}
      onMouseEnter={isInteractive ? handleMouseEnter : undefined}
      onMouseLeave={isInteractive ? handleMouseLeave : undefined}
      style={{
        transform: isInteractive && isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transition: 'transform 260ms cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
      }}
      className={`${className} transition-shadow duration-300 ${
        isInteractive && isHovered ? 'shadow-xl shadow-purple-500/10' : ''
      }`}
    >
      <div style={{ transform: isInteractive && isHovered ? 'translateZ(16px)' : 'translateZ(0px)' }} className="h-full w-full">
        {children}
      </div>
    </div>
  );
}
