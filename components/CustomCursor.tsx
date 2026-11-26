'use client';

import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(1);
  const [section, setSection] = useState('Introduce');
  const [isVisible, setIsVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) return;

    document.documentElement.classList.add('cursor-none-global');
    setIsVisible(true);

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering interactive element
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor], input, textarea, .draggable');
      setHovering(!!interactive);
    };

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 0;
      setScrollProgress(Math.max(1, progress));

      // Determine section
      const sections = document.querySelectorAll('[data-section-name]');
      let current = 'Introduce';
      sections.forEach((s) => {
        const rect = s.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2 && rect.bottom > 0) {
          current = s.getAttribute('data-section-name') || current;
        }
      });
      setSection(current);
    };

    // Smooth ring follow
    let raf: number;
    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      document.documentElement.classList.remove('cursor-none-global');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!isVisible) return null;

  const xStr = String(Math.round(position.x)).padStart(4, '0');
  const yStr = String(Math.round(position.y)).padStart(4, '0');
  const pStr = String(scrollProgress).padStart(3, '0');

  return (
    <>
      {/* Coordinate display - top right */}
      <div className="fixed top-4 right-4 z-[100] text-[10px] sm:text-xs text-muted-foreground font-mono-display pointer-events-none select-none tracking-wider">
        <div className="flex flex-col items-end gap-0.5">
          <span>
            x:{xStr}y:{yStr}
          </span>
          <span>
            p:{pStr}%s:{section}
          </span>
        </div>
      </div>

      {/* Cursor dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[101] pointer-events-none w-1.5 h-1.5 bg-foreground rounded-full"
        style={{ mixBlendMode: 'difference' }}
      />

      {/* Cursor ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[101] pointer-events-none rounded-full border border-foreground/60 transition-[width,height,opacity] duration-200"
        style={{
          width: hovering ? '56px' : '28px',
          height: hovering ? '56px' : '28px',
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
}
