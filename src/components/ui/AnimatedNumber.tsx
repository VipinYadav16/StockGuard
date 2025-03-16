
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
  formatter?: (value: number) => string;
  prefix?: string;
  suffix?: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 1000,
  className,
  formatter = (val) => val.toLocaleString(),
  prefix = '',
  suffix = '',
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const previousValueRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (value === previousValueRef.current) return;
    
    const startValue = previousValueRef.current;
    const endValue = value;
    const startTime = performance.now();
    startTimeRef.current = startTime;
    
    const animateNumber = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsedTime = timestamp - startTimeRef.current;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Use easeOutExpo for smooth deceleration
      const easing = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentValue = startValue + (endValue - startValue) * easing;
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateNumber);
      } else {
        previousValueRef.current = endValue;
        setDisplayValue(endValue);
      }
    };
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    animationRef.current = requestAnimationFrame(animateNumber);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration]);
  
  return (
    <span className={cn("tabular-nums transition-opacity", className)}>
      {prefix}{formatter(displayValue)}{suffix}
    </span>
  );
};

export default AnimatedNumber;
