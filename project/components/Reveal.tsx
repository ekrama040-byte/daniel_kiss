'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: keyof JSX.IntrinsicElements;
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 40,
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [delay, y]);

  const Component = Tag as any;
  return (
    <Component ref={ref as any} className={className} style={{ opacity: 0 }}>
      {children}
    </Component>
  );
}
