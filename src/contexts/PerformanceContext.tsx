import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MotionMode,
  detectMotionMode,
  setDocumentMotionMode,
  useMotionMode,
} from '../lib/motion';

interface PerformanceContextType {
  performanceMode: boolean;
  motionMode: MotionMode;
  togglePerformanceMode: () => void;
  setMotionMode: (mode: MotionMode) => void;
}

const PerformanceContext = createContext<PerformanceContextType>({
  performanceMode: false,
  motionMode: 'full',
  togglePerformanceMode: () => {},
  setMotionMode: () => {},
});

export const usePerformance = () => useContext(PerformanceContext);

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const motionMode = useMotionMode();
  const [performanceMode, setPerformanceMode] = useState<boolean>(
    () => detectMotionMode() !== 'full'
  );

  useEffect(() => {
    const saved = localStorage.getItem('performanceMode');
    if (saved === 'true') {
      setPerformanceMode(true);
      setDocumentMotionMode('lite');
    } else {
      setPerformanceMode(motionMode !== 'full');
    }
  }, [motionMode]);

  const setMotionMode = (mode: MotionMode) => {
    setDocumentMotionMode(mode);
    const isLiteOrReduced = mode !== 'full';
    setPerformanceMode(isLiteOrReduced);
    localStorage.setItem('performanceMode', isLiteOrReduced.toString());
  };

  const togglePerformanceMode = () => {
    const nextMode: MotionMode = motionMode === 'full' ? 'lite' : 'full';
    setMotionMode(nextMode);
  };

  return (
    <PerformanceContext.Provider
      value={{ performanceMode, motionMode, togglePerformanceMode, setMotionMode }}
    >
      {children}
    </PerformanceContext.Provider>
  );
}
