import { useState, useEffect } from 'react';

interface PerformanceMetrics {
  isLowEnd: boolean;
  isLazyLoaded: boolean;
  hardwareConcurrency: number;
}

export default function usePerformanceMonitor(): PerformanceMetrics {
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [isLazyLoaded, setIsLazyLoaded] = useState(false);

  useEffect(() => {
    // 1. Hardware & Connection Check
    let lowEnd = false;
    const concurrency = navigator.hardwareConcurrency || 4;
    if (concurrency <= 4) lowEnd = true;

    // Check for user agent indicators of low-performance mobile devices or webviews
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('samsungbrowser') || ua.includes('android') && concurrency <= 4) {
      lowEnd = true;
    }

    // Check for data saver mode
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (connection && (connection.effectiveType === '2g' || connection.effectiveType === '3g' || connection.saveData)) {
      lowEnd = true;
    }

    setIsLowEnd(lowEnd);

    // 2. Lazy Loading for Heavy Effects (Load after DOMContentLoaded + First Paint)
    const handleLoad = () => {
      requestAnimationFrame(() => {
        setTimeout(() => setIsLazyLoaded(true), 300);
      });
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad, { once: true });
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return {
    isLowEnd,
    isLazyLoaded,
    hardwareConcurrency: navigator.hardwareConcurrency || 4,
  };
}
