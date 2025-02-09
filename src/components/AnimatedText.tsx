'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface AnimatedTextProps {
  children: React.ReactNode;
}

export function AnimatedText({ children }: AnimatedTextProps) {
  const [scale, setScale] = useState(1);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const centerY = windowHeight / 2;
      const elementCenterY = rect.top + rect.height / 2;
      
      // Calculate distance from center (0 when at center, 1 when at edges)
      const distanceFromCenter = Math.abs(centerY - elementCenterY) / (windowHeight / 2);
      
      // Create a smooth scale that peaks at center
      // Max scale is 1.05 (very subtle), min scale is 1
      const newScale = 1 + (0.05 * (1 - Math.pow(distanceFromCenter, 2)));
      
      setScale(newScale);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <span
      ref={elementRef}
      style={{
        display: 'inline-block',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: `scale(${scale})`,
        color: 'var(--accent-9)',
        fontWeight: 'bold'
      }}
    >
      {children}
    </span>
  );
}
