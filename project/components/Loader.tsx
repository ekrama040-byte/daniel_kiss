'use client';

import { useEffect, useState, useRef } from 'react';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const increment = Math.random() * 8 + 2;
      current = Math.min(100, current + increment);
      setCount(Math.floor(current));

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setExiting(true);
          setTimeout(onComplete, 800);
        }, 300);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center transition-transform duration-700 ${
        exiting ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)' }}
    >
      <div className="noise-overlay absolute inset-0 opacity-[0.03] pointer-events-none" />

      {/* Counter */}
      <div
        ref={counterRef}
        className="relative text-[20vw] sm:text-[16vw] md:text-[14vw] font-bold leading-none tracking-tighter tabular-nums"
      >
        <span className="text-foreground">{String(count).padStart(3, '0')}</span>
      </div>

      {/* Loading bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-muted/30">
        <div
          className="h-full bg-foreground transition-[width] duration-100 ease-linear"
          style={{ width: `${count}%` }}
        />
      </div>

      {/* Corner labels */}
      <div className="absolute top-6 left-6 text-xs text-muted-foreground tracking-widest uppercase">
        Daniel Kiss
      </div>
      <div className="absolute top-6 right-6 text-xs text-muted-foreground tracking-widest uppercase animate-spin spin-slow">
        ▲
      </div>
    </div>
  );
}
