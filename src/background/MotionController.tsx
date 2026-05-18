import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import usePerformanceMonitor from '../hooks/usePerformanceMonitor';
import useReducedMotion from '../hooks/useReducedMotion';
import { MotionContextType } from './types';

const MotionContext = createContext<MotionContextType | undefined>(undefined);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const { isLowEnd, isLazyLoaded } = usePerformanceMonitor();
  const prefersReduced = useReducedMotion();

  const [gyroEnabled, setGyroEnabled] = useState(false);
  const [gyroOffset, setGyroOffset] = useState({ x: 0, y: 0 });
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  const targetGyro = useRef({ x: 0, y: 0 });
  const currentGyro = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  // Centralized RAF Loop for Lerped Motion
  useEffect(() => {
    if (prefersReduced || isLowEnd || !isLazyLoaded) return;

    const updateLoop = () => {
      // Lerp mouse (Apple TV smooth damping)
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.05;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.05;

      // Lerp gyro
      currentGyro.current.x += (targetGyro.current.x - currentGyro.current.x) * 0.08;
      currentGyro.current.y += (targetGyro.current.y - currentGyro.current.y) * 0.08;

      setMouseOffset({ x: Number(currentMouse.current.x.toFixed(2)), y: Number(currentMouse.current.y.toFixed(2)) });
      setGyroOffset({ x: Number(currentGyro.current.x.toFixed(2)), y: Number(currentGyro.current.y.toFixed(2)) });

      rafId.current = requestAnimationFrame(updateLoop);
    };

    rafId.current = requestAnimationFrame(updateLoop);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [prefersReduced, isLowEnd, isLazyLoaded]);

  // Mouse Listener
  useEffect(() => {
    if (prefersReduced || isLowEnd || !isLazyLoaded) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40; // Max 20px shift
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      targetMouse.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReduced, isLowEnd, isLazyLoaded]);

  // Gyroscope Permission & Listener
  const enableMotion = async () => {
    if (prefersReduced || isLowEnd) return;

    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          setGyroEnabled(true);
        }
      } catch (err) {
        console.warn('Gyroscope permission request failed:', err);
      }
    } else {
      setGyroEnabled(true);
    }
  };

  useEffect(() => {
    if (!gyroEnabled || prefersReduced || isLowEnd) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ? Math.max(-30, Math.min(30, e.gamma)) : 0; // -30 to 30
      const beta = e.beta ? Math.max(-30, Math.min(30, e.beta - 45)) : 0; // Relative to tilt

      // Keep mobile movement subtle: 2-5px max
      targetGyro.current = {
        x: (gamma / 30) * 5,
        y: (beta / 30) * 5,
      };
    };

    window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [gyroEnabled, prefersReduced, isLowEnd]);

  return (
    <MotionContext.Provider value={{
      isLowEnd,
      isLazyLoaded,
      prefersReduced,
      gyroEnabled,
      gyroOffset,
      mouseOffset,
      enableMotion,
    }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error('useMotion must be used within a MotionProvider');
  }
  return context;
}
