import React, { createContext, useContext, useState, useEffect } from 'react';

interface PerformanceContextType {
  performanceMode: boolean;
  togglePerformanceMode: () => void;
}

const PerformanceContext = createContext<PerformanceContextType>({
  performanceMode: false,
  togglePerformanceMode: () => {},
});

export const usePerformance = () => useContext(PerformanceContext);

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const [performanceMode, setPerformanceMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('performanceMode');
    if (saved === 'true') {
      setPerformanceMode(true);
    }
  }, []);

  const togglePerformanceMode = () => {
    setPerformanceMode(prev => {
      const next = !prev;
      localStorage.setItem('performanceMode', next.toString());
      return next;
    });
  };

  return (
    <PerformanceContext.Provider value={{ performanceMode, togglePerformanceMode }}>
      {children}
    </PerformanceContext.Provider>
  );
}
