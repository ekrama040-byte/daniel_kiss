'use client';

import { useRef, useEffect } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  radius: number;
}

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    const trail: TrailPoint[] = [];
    let lastX = -1;
    let lastY = -1;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMove = (e: MouseEvent) => {
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }

      const x = e.clientX;
      const y = e.clientY;
      const vx = lastX >= 0 ? (x - lastX) * 0.12 : 0;
      const vy = lastY >= 0 ? (y - lastY) * 0.12 : 0;
      lastX = x;
      lastY = y;

      trail.push({
        x,
        y,
        vx: Math.max(-3, Math.min(3, vx)),
        vy: Math.max(-3, Math.min(3, vy)),
        life: 1.0,
        radius: 175,
      });

      if (trail.length > 52) {
        trail.shift();
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const t = performance.now() * 0.001;

      // 1. Dark distressed base (#0D0D0D)
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#0D0D0D';
      ctx.fillRect(0, 0, w, h);

      // 2. Carve organic windows to reveal the halftone night-street traffic
      ctx.globalCompositeOperation = 'destination-out';

      // Ambient drifting street window so traffic is always visible on load
      const ambX1 = w * (0.35 + Math.sin(t * 0.45) * 0.08);
      const ambY1 = h * (0.58 + Math.cos(t * 0.35) * 0.05);
      const g1 = ctx.createRadialGradient(ambX1, ambY1, 30, ambX1, ambY1, 310);
      g1.addColorStop(0, 'rgba(0, 0, 0, 0.82)');
      g1.addColorStop(0.55, 'rgba(0, 0, 0, 0.45)');
      g1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g1;
      ctx.beginPath();
      ctx.arc(ambX1, ambY1, 310, 0, Math.PI * 2);
      ctx.fill();

      // Cursor fluid trail
      for (let i = trail.length - 1; i >= 0; i--) {
        const pt = trail[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.vx *= 0.94;
        pt.vy *= 0.94;
        pt.life *= 0.97;
        pt.radius += 0.4;

        if (pt.life < 0.02) {
          trail.splice(i, 1);
          continue;
        }

        const grad = ctx.createRadialGradient(pt.x, pt.y, 15, pt.x, pt.y, pt.radius);
        grad.addColorStop(0, `rgba(0, 0, 0, ${0.9 * pt.life})`);
        grad.addColorStop(0.6, `rgba(0, 0, 0, ${0.48 * pt.life})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0D0D0D]">
      <video
        ref={videoRef}
        src="/traffic.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover brightness-100 contrast-125"
      />

      {/* Halftone Dot-Matrix Filter */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(13, 13, 13, 0.92) 1.35px, transparent 1.35px)',
          backgroundSize: '4px 4px',
        }}
      />

      {/* Dark Cover Carved Open by Cursor Trail */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}