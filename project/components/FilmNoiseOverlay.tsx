'use client';

import { useEffect, useRef } from 'react';

export default function FilmNoiseOverlay() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };

    tryPlay();
    window.addEventListener('pointerdown', tryPlay, { once: true, passive: true });
    window.addEventListener('scroll', tryPlay, { once: true, passive: true });

    return () => {
      window.removeEventListener('pointerdown', tryPlay);
      window.removeEventListener('scroll', tryPlay);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[45] overflow-hidden select-none mix-blend-screen"
      style={{
        WebkitMaskImage:
          'linear-gradient(to bottom, black 0%, black 88%, transparent 100%)',
        maskImage:
          'linear-gradient(to bottom, black 0%, black 88%, transparent 100%)',
      }}
    >
      <video
        ref={videoRef}
        src="/noise.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover scale-110 grayscale opacity-[0.2] contrast-[1.6] brightness-75"
      />
    </div>
  );
}