'use client';

import { useEffect, useRef, useState } from 'react';

const SIDEBAR_IMAGES = [
  'https://danielkiss.hu/img/sidebar-1.webp',
  'https://danielkiss.hu/img/sidebar-2.webp',
  'https://danielkiss.hu/img/sidebar-3.webp',
  'https://danielkiss.hu/img/sidebar-4.webp',
  'https://danielkiss.hu/img/sidebar-5.webp',
  'https://danielkiss.hu/img/sidebar-6.webp',
];

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const targetsRef = useRef<Set<HTMLElement>>(new Set());

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    // Ensure the video starts playing immediately and stays playing
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const idxAttr = el.dataset.bgVideo;
      if (idxAttr !== undefined) {
        const n = parseInt(idxAttr, 10);
        if (!isNaN(n) && n >= 0 && n < SIDEBAR_IMAGES.length) {
          setActiveImage(n);
        }
      }
      setOpacity(1);
    };

    const onLeave = () => setOpacity(0);

    const attachTo = (el: HTMLElement) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
      targetsRef.current.add(el);
    };

    const detachAll = () => {
      targetsRef.current.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      targetsRef.current.clear();
    };

    const collectAndAttach = () => {
      detachAll();
      document
        .querySelectorAll<HTMLElement>('[data-bg-video], .nav-item-hover')
        .forEach(attachTo);
    };

    collectAndAttach();
    // Re-collect once after mount for dynamically rendered content
    const timer = setTimeout(collectAndAttach, 800);

    return () => {
      clearTimeout(timer);
      detachAll();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[5] pointer-events-none overflow-hidden"
      style={{
        opacity,
        transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      aria-hidden="true"
    >
      {/* Real video element — autoplay, muted, loop. Stays loaded, no reload on hover. */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.25 }}
      >
        <source
          src="https://cdn.coverr.co/videos/coverr-typing-on-a-laptop-2614/1080p.mp4"
          type="video/mp4"
        />
      </video>

      {/* Cross-fading sidebar image layer — changes based on hovered element */}
      {SIDEBAR_IMAGES.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: activeImage === i ? 0.35 : 0 }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background/40" />
    </div>
  );
}
