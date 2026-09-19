import { useEffect } from 'react';
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';

export default function WebVitalsTracker() {
  useEffect(() => {
    onCLS(console.log);
    onINP(console.log);
    onLCP(console.log);
    onFCP(console.log);
    onTTFB(console.log);
  }, []);

  return null;
}
