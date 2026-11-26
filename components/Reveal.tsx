'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type RevealVariant = 'up' | 'tilt' | 'clip';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // in seconds, e.g. 0.2
  variant?: RevealVariant;
  once?: boolean; // default true so it stays visible after revealing
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  variant = 'up',
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const getHiddenStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'tilt':
        return {
          opacity: 0,
          transform: 'translate3d(0, 32px, 0) rotate(-2.5deg) scale(0.97)',
        };
      case 'clip':
        return {
          opacity: 0,
          clipPath: 'inset(0 100% 0 0)',
          transform: 'translate3d(-12px, 0, 0)',
        };
      case 'up':
      default:
        return {
          opacity: 0,
          transform: 'translate3d(0, 28px, 0)',
        };
    }
  };

  const visibleStyle: React.CSSProperties = {
    opacity: 1,
    transform: 'translate3d(0, 0, 0) rotate(0deg) scale(1)',
    ...(variant === 'clip' ? { clipPath: 'inset(0 0% 0 0)' } : {}),
  };

  return (
    <div
      ref={ref}
      style={{
        transitionProperty: 'opacity, transform, clip-path',
        transitionDuration: '720ms',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        transitionDelay: `${delay}s`,
        ...(isVisible ? visibleStyle : getHiddenStyle()),
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}