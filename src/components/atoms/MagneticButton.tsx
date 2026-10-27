import React, { useRef, useState } from 'react';
import { useMotionMode } from '../../lib/motion';
import { cn } from '../../lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number;
}

/**
 * MagneticButton (Compositor-First Magnetic Pill)
 * - Desktop Full mode: Sets --mag-x and --mag-y CSS variables on pointer move (max 18px pull).
 * - Mobile & Lite mode: Standard interactive button with zero mouse listeners.
 * - Reduced motion: Standard button, no translation.
 */
export default function MagneticButton({
  children,
  className,
  onClick,
  href,
  strength = 18,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const motionMode = useMotionMode();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const isInteractive = motionMode === 'full';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isInteractive || !buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const moveX = (clientX - centerX) * 0.35;
    const moveY = (clientY - centerY) * 0.35;

    setOffset({
      x: Math.max(Math.min(moveX, strength), -strength),
      y: Math.max(Math.min(moveY, strength), -strength),
    });
  };

  const handleMouseLeave = () => {
    if (isInteractive) {
      setOffset({ x: 0, y: 0 });
    }
  };

  const content = (
    <div
      ref={buttonRef}
      onMouseMove={isInteractive ? handleMouseMove : undefined}
      onMouseLeave={isInteractive ? handleMouseLeave : undefined}
      style={{
        transform: isInteractive
          ? `translate3d(${offset.x}px, ${offset.y}px, 0)`
          : 'none',
        transition: 'transform 240ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={cn(
        'relative inline-flex items-center justify-center cursor-pointer group',
        className
      )}
      onClick={onClick}
    >
      <div className="relative z-10 flex items-center gap-2">
        {children}
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  }

  return content;
}
