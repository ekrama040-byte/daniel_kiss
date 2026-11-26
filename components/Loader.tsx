'use client';

import { useEffect, useState } from 'react';

const TARGET_NAME = 'DANIEL KISS';
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const RULER_TICKS = Array.from({ length: 73 });

const STACK_CARDS = [
  {
    threshold: 6,
    rotate: -11,
    dx: 0,
    dy: 0,
    bg: '#FF2E17',
    text: '#141414',
    title: 'ELECTRO',
    sub: 'PORTFOLIO / 01',
    accent: '#EAE6DF',
  },
  {
    threshold: 28,
    rotate: 7,
    dx: -4,
    dy: 2,
    bg: '#E8E4DC',
    text: '#141414',
    title: 'INSPIRATION',
    sub: 'SCROLL FOR MORE',
    accent: '#D8BE3A',
  },
  {
    threshold: 52,
    rotate: -6,
    dx: 3,
    dy: -2,
    bg: '#D8BE3A',
    text: '#151515',
    title: 'EUPHORIA',
    sub: 'STEP INTO',
    accent: '#388C6B',
  },
  {
    threshold: 74,
    rotate: 5,
    dx: -2,
    dy: 1,
    bg: '#C9C2B2',
    text: '#141414',
    title: 'NOISE',
    sub: 'PRAKATA / 05',
    accent: '#A6241B',
  },
  {
    threshold: 92,
    rotate: -2,
    dx: 0,
    dy: 0,
    bg: '#ECEAE4',
    text: '#141414',
    title: "LET'S HAVE FUN!",
    sub: 'GREAT SOLUTIONS',
    accent: '#FF2E17',
  },
];

function scrambleName(progress: number): string {
  // Decode progressively from 12% to 88%
  const revealRatio = Math.max(0, Math.min(1, (progress - 12) / 76));
  const lockedCount = Math.floor(revealRatio * TARGET_NAME.length);

  return TARGET_NAME.split('')
    .map((ch, idx) => {
      if (ch === ' ') return ' ';
      if (idx < lockedCount) return ch;
      if (progress < 10) return '';
      return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    })
    .join('');
}

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [nameText, setNameText] = useState('');
  const [phase, setPhase] = useState<'loading' | 'clearing' | 'lifting'>('loading');

  useEffect(() => {
    // Lock scroll while the curtain is covering the hero
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    let rafId = 0;
    let lastScrambleAt = 0;
    const startTime = performance.now();
    const duration = 2200; // Crisp 2.2s run regardless of network speed

    const timers: number[] = [];

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const rawT = Math.min(1, elapsed / duration);
      // Slight ease-out with authentic stepped feel
      const eased = 1 - Math.pow(1 - rawT, 2.2);
      const nextVal = Math.min(100, Math.round(eased * 100));

      setProgress(nextVal);

      if (now - lastScrambleAt > 55 || nextVal >= 90) {
        lastScrambleAt = now;
        setNameText(nextVal >= 92 ? TARGET_NAME : scrambleName(nextVal));
      }

      if (rawT < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setNameText(TARGET_NAME);

        // Brief hold at 100 -> fade inner HUD -> slide curtain straight up
        timers.push(
          window.setTimeout(() => setPhase('clearing'), 260),
          window.setTimeout(() => setPhase('lifting'), 460),
          window.setTimeout(() => {
            document.body.style.overflow = prevOverflow;
            onComplete();
          }, 1220)
        );
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      timers.forEach((id) => window.clearTimeout(id));
      document.body.style.overflow = prevOverflow;
    };
  }, [onComplete]);

  const paddedCount = String(progress).padStart(3, '0');
  const innerHidden = phase !== 'loading';

  return (
    <div
      aria-label="Loading portfolio"
      style={{
        transform: phase === 'lifting' ? 'translate3d(0, -100%, 0)' : 'translate3d(0, 0, 0)',
        transition: 'transform 740ms cubic-bezier(0.77, 0, 0.175, 1)',
      }}
      className="fixed inset-0 z-[100] bg-[#121212] text-[#EAE6DF] flex flex-col justify-between p-6 sm:p-9 select-none will-change-transform"
    >
      {/* === TOP BAR: Red Square + Scrambling Name (Left) & Stacking Card Deck (Right) === */}
      <div
        style={{
          opacity: innerHidden ? 0 : 1,
          transition: 'opacity 200ms ease',
        }}
        className="flex items-start justify-between gap-6"
      >
        <div className="flex items-center gap-3 pt-1">
          <span className="w-2.5 h-2.5 bg-[#FF2E17] inline-block shrink-0" />
          <span className="font-display text-sm sm:text-base tracking-[0.14em] uppercase text-[#9A9792] min-h-[1.2em]">
            {nameText}
          </span>
        </div>

        {/* Stacking Tilted Mini Theme Cards */}
        <div className="relative w-[132px] sm:w-[156px] h-[156px] sm:h-[184px] mr-1 sm:mr-3">
          {STACK_CARDS.map((card, idx) => {
            const visible = progress >= card.threshold;
            return (
              <div
                key={card.title}
                style={{
                  backgroundColor: card.bg,
                  color: card.text,
                  opacity: visible ? 1 : 0,
                  transform: visible
                    ? `translate3d(${card.dx}px, ${card.dy}px, 0) rotate(${card.rotate}deg) scale(1)`
                    : `translate3d(24px, -24px, 0) rotate(${card.rotate * 1.8}deg) scale(1.12)`,
                  transition:
                    'transform 340ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms ease',
                  zIndex: idx + 1,
                }}
                className="absolute inset-0 p-2.5 sm:p-3 flex flex-col justify-between border border-black/25 shadow-[0_14px_30px_rgba(0,0,0,0.55)] overflow-hidden"
              >
                <div className="flex items-center justify-between text-[6px] font-mono uppercase tracking-wider opacity-70">
                  <span>WPKOI</span>
                  <span>0{idx + 1}</span>
                </div>

                <div className="my-auto">
                  <div className="font-display uppercase text-xl sm:text-2xl leading-[0.86] tracking-tight">
                    {card.title}
                  </div>
                  <div
                    style={{ backgroundColor: card.accent }}
                    className="mt-2 h-10 sm:h-12 w-full opacity-90 border border-black/15"
                  />
                </div>

                <div className="font-mono text-[6px] uppercase tracking-widest opacity-80 truncate">
                  {card.sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* === BOTTOM: Giant 3-Digit Counter + Full-Width Tick Ruler with Red Needle === */}
      <div
        style={{
          opacity: innerHidden ? 0 : 1,
          transition: 'opacity 200ms ease',
        }}
        className="w-full"
      >
        <div
          className={`font-display text-[22vw] sm:text-[15vw] lg:text-[11.5vw] leading-[0.8] tracking-[-0.03em] tabular-nums transition-colors duration-300 ${
            progress >= 100 ? 'text-[#8C8984]' : 'text-[#EAE6DF]'
          }`}
        >
          {paddedCount}
        </div>

        {/* Horizontal Tick Ruler with Live Red Progress Needle */}
        <div className="relative mt-4 sm:mt-6 pt-3 w-full">
          <div className="relative w-full h-5 flex items-end justify-between border-b border-white/15">
            {RULER_TICKS.map((_, idx) => {
              const isMajor = idx % 8 === 0;
              return (
                <span
                  key={idx}
                  className={`w-px ${isMajor ? 'h-3.5 bg-white/30' : 'h-2 bg-white/12'}`}
                />
              );
            })}

            {/* Moving Red Vertical Needle */}
            <span
              style={{ left: `${progress}%` }}
              className="absolute bottom-0 -translate-x-1/2 w-[2px] h-7 bg-[#FF2E17] shadow-[0_0_10px_rgba(255,46,23,0.7)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}