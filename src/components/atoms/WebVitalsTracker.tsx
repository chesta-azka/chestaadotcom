import { useEffect } from 'react';
import { onCLS, onINP, onLCP, onFCP, onTTFB, Metric } from 'web-vitals';

export default function WebVitalsTracker() {
  useEffect(() => {
    const logAndStore = (metric: Metric) => {
      console.log(metric);
      try {
        const stored = JSON.parse(localStorage.getItem('web-vitals-data') || '{}');
        const thresholds = {
          LCP: 2500,
          CLS: 0.1,
          INP: 200,
          FCP: 1800,
          TTFB: 800
        };
        const isPoor = metric.value > (thresholds[metric.name as keyof typeof thresholds] || Infinity);
        stored[metric.name] = {
          value: metric.value,
          rating: metric.rating,
          isPoor,
          timestamp: Date.now()
        };
        localStorage.setItem('web-vitals-data', JSON.stringify(stored));
      } catch (e) {}
    };

    onCLS(logAndStore);
    onINP(logAndStore);
    onLCP(logAndStore);
    onFCP(logAndStore);
    onTTFB(logAndStore);
  }, []);
  return null;
}
