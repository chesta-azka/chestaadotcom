import { motion } from 'motion/react';

interface SectionBackgroundProps {
  type: 'grid' | 'blob' | 'none';
}

export default function SectionBackground({ type }: SectionBackgroundProps) {
  if (type === 'none') return null;

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {type === 'grid' && (
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,white_80%,transparent_100%)]">
          <svg
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="grid-pattern"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <path d="M80 0H0V80" fill="none" className="stroke-purple-500/20" strokeWidth="1" />
              </pattern>
              <pattern
                id="grid-pattern-small"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path d="M20 0H0V20" fill="none" className="stroke-purple-500/10" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern-small)" />
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_49%,#7e22ce_49.5%,#7e22ce_50.5%,transparent_51%),linear-gradient(-45deg,transparent_49%,#7e22ce_49.5%,#7e22ce_50.5%,transparent_51%)] bg-[size:160px_160px] opacity-[0.05]" />
        </div>
      )}
      
      {type === 'blob' && (
        <>
          <div 
            className="absolute -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-purple-100/50 blur-[100px]" 
          />
          <div 
            className="absolute -bottom-[20%] -right-[10%] h-[500px] w-[500px] rounded-full bg-purple-100/50 blur-[100px]" 
          />
        </>
      )}
    </div>
  );
}
