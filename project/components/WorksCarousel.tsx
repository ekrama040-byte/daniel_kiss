'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface ThemeCard {
  id: string;
  name: string;
  url: string;
  variant:
    | 'kalpita'
    | 'hrasva'
    | 'madhura'
    | 'pluta'
    | 'prakata'
    | 'tripti'
    | 'sugupta'
    | 'kripa'
    | 'ekamrika'
    | 'gamana';
}

const themeCards: ThemeCard[] = [
  { id: '01', name: 'KALPITA', url: 'https://wpkoi.com/', variant: 'kalpita' },
  { id: '02', name: 'HRASVA', url: 'https://wpkoi.com/', variant: 'hrasva' },
  { id: '03', name: 'MADHURA', url: 'https://wpkoi.com/', variant: 'madhura' },
  { id: '04', name: 'PLUTA', url: 'https://wpkoi.com/', variant: 'pluta' },
  { id: '05', name: 'PRAKATA', url: 'https://wpkoi.com/', variant: 'prakata' },
  { id: '06', name: 'TRIPTI', url: 'https://wpkoi.com/', variant: 'tripti' },
  { id: '07', name: 'SUGUPTA', url: 'https://wpkoi.com/', variant: 'sugupta' },
  { id: '08', name: 'KRIPA', url: 'https://wpkoi.com/', variant: 'kripa' },
  { id: '09', name: 'EKAMRIKA', url: 'https://wpkoi.com/', variant: 'ekamrika' },
  { id: '10', name: 'GAMANA', url: 'https://wpkoi.com/', variant: 'gamana' },
];

const loopedCards = [...themeCards, ...themeCards];
const CHAR_TILTS = [-14, 10, -8, 12, -11, 7, -13, 9, -7, 13, -6, 8, -12, 7, -9, 11];

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));
const seg = (p: number, start: number, end: number) => clamp((p - start) / (end - start));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function ThemeCardArtwork({ variant }: { variant: ThemeCard['variant'] }) {
  switch (variant) {
    case 'kalpita':
      return (
        <div className="relative w-full h-full bg-[#D9D6CE] text-[#141414] overflow-hidden pt-7 px-3 pb-2.5 flex flex-col justify-between">
          <div className="font-display uppercase text-4xl leading-[0.82] tracking-tight text-[#A51D24]">
            ELECTRO
          </div>
          <div className="relative flex-1 my-1 overflow-hidden border border-black/25">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=360&q=75"
              alt="Kalpita theme"
              className="w-full h-full object-cover object-top grayscale contrast-125"
            />
          </div>
          <div className="bg-[#141414] text-[#EAE6DF] text-[6px] font-mono uppercase tracking-widest px-2 py-0.5 flex justify-between">
            <span>++ VOL 01</span>
            <span>EDITION 24</span>
          </div>
        </div>
      );

    case 'hrasva':
      return (
        <div className="relative w-full h-full bg-[#D5D1C8] text-[#141414] overflow-hidden pt-7 px-3 pb-2.5 flex flex-col justify-between">
          <div className="font-display uppercase text-4xl leading-[0.82] tracking-tight text-[#C8281D]">
            NEXUS
          </div>
          <div className="grid grid-cols-[1.3fr_0.8fr] gap-2 flex-1 my-1 min-h-0">
            <div className="overflow-hidden border border-black/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=360&q=75"
                alt="Hrasva theme"
                className="w-full h-full object-cover contrast-115"
              />
            </div>
            <div className="text-[6px] font-mono uppercase leading-tight flex flex-col justify-between opacity-75">
              <span className="text-[#C8281D] font-bold">(START THE STORY)</span>
              <span>MINIMAL BLOCK THEME · TOTD</span>
            </div>
          </div>
        </div>
      );

    case 'madhura':
      return (
        <div className="relative w-full h-full bg-[#DCE619] text-[#151515] overflow-hidden pt-8 px-3 pb-2.5 flex flex-col justify-between">
          <div className="grid grid-cols-[1fr_1.05fr] gap-2 flex-1 min-h-0 items-center">
            <div className="font-display uppercase text-xl leading-[0.86] tracking-tight">
              <div>HAVE FUN!</div>
              <div className="opacity-65">HAVE FUN!</div>
              <div className="text-[#D91E63]">HAVE FUN!</div>
            </div>
            <div className="h-full border-2 border-[#151515] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=360&q=75"
                alt="Madhura theme"
                className="w-full h-full object-cover saturate-150 contrast-125"
              />
            </div>
          </div>
          <div className="mt-1 bg-[#151515] text-[#DCE619] text-[6px] font-mono uppercase px-2 py-0.5 flex justify-between">
            <span>EXPERIMENTAL</span>
            <span>50% OFF</span>
          </div>
        </div>
      );

    case 'pluta':
      return (
        <div className="relative w-full h-full bg-[#DFDDD6] text-[#141414] overflow-hidden pt-7 px-3 pb-2 flex flex-col justify-between">
          <div className="font-display uppercase text-3xl leading-[0.82] tracking-tight text-center border-b border-black/30 pb-1">
            INSPIRATION
          </div>
          <div className="grid grid-cols-[1fr_1fr] gap-2 flex-1 my-1 min-h-0">
            <div className="text-[6px] font-mono leading-tight flex flex-col justify-between">
              <div className="font-bold uppercase">GET READY FOR THE REVOLUTION!</div>
              <div>
                1. Preparation
                <br />
                2. Design
                <br />
                3. Implementation
              </div>
            </div>
            <div className="overflow-hidden border border-black/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=320&q=75"
                alt="Pluta theme"
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </div>
          </div>
          <div className="bg-[#141414] text-[#EAE6DF] text-[5.5px] font-mono uppercase text-center py-0.5 tracking-wider">
            SCROLL DOWN FOR MORE! SCROLL
          </div>
        </div>
      );

    case 'prakata':
      return (
        <div className="relative w-full h-full bg-[#C9C2B2] text-[#141414] overflow-hidden pt-8 px-3 pb-2.5 flex flex-col justify-between">
          <div className="relative flex-1 flex items-center justify-between my-0.5">
            <div className="z-10 leading-[0.86] font-display uppercase text-2xl sm:text-[26px] tracking-tight">
              <div className="text-[#181818]">MAKE</div>
              <div className="line-through decoration-[#D92B1C] decoration-[3px] text-[#2A2A2A]">
                SENSE
              </div>
              <div className="text-[#D92B1C]">NOISE</div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=360&q=75"
              alt="Prakata theme"
              className="w-[54%] h-[92%] object-cover object-top contrast-125 saturate-90 border border-black/20"
            />
          </div>
          <div className="bg-[#A6241B] text-[#F2ECE1] text-[6px] font-mono px-2 py-0.5 uppercase truncate">
            Our process is built on observation and refinement.
          </div>
        </div>
      );

    case 'tripti':
      return (
        <div className="relative w-full h-full bg-[#ECEAE4] text-[#111111] overflow-hidden flex flex-col">
          <div className="px-3 pt-8 pb-1.5">
            <div className="font-display uppercase text-3xl leading-[0.84] tracking-[-0.03em] text-center">
              MOTIVATION
            </div>
          </div>
          <div className="relative flex-1 bg-[#141414] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=75"
              alt="Tripti theme"
              className="w-full h-full object-cover object-center grayscale contrast-125 brightness-75"
            />
          </div>
        </div>
      );

    case 'sugupta':
      return (
        <div className="relative w-full h-full bg-[#D8BE3A] text-[#151515] overflow-hidden pt-8 px-3 pb-2.5 flex flex-col justify-between border-[3px] border-[#388C6B]">
          <div className="font-display uppercase text-3xl leading-[0.84] tracking-tight text-center">
            EUPHORIA
          </div>
          <div className="grid grid-cols-[1fr_1.15fr] gap-2 items-center my-1 flex-1 min-h-0">
            <div className="text-[6.5px] font-mono leading-tight space-y-1">
              <p className="font-bold">What you get by achieving your goals.</p>
              <span className="inline-block bg-[#151515] text-[#D8BE3A] px-1.5 py-0.5 text-[6px] uppercase">
                GET READY
              </span>
            </div>
            <div className="h-full max-h-[86px] bg-[#6E472B] p-1 rounded-sm border border-black/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=320&q=75"
                alt="Sugupta theme"
                className="w-full h-full object-cover contrast-110"
              />
            </div>
          </div>
          <div className="bg-[#388C6B] text-[#111] font-display text-xs tracking-wider uppercase px-2 py-0.5 text-right">
            STEP INTO
          </div>
        </div>
      );

    case 'kripa':
      return (
        <div className="relative w-full h-full bg-[#DFDDD7] text-[#141414] overflow-hidden pt-8 px-3 pb-2 flex flex-col justify-between">
          <div className="grid grid-cols-[1.2fr_1fr] gap-2 flex-1 min-h-0">
            <div className="flex flex-col justify-center">
              <div className="font-display uppercase text-lg leading-[0.9] tracking-tight">
                LET&apos;S HAVE
                <br />
                SOME FUN!
              </div>
              <p className="mt-1 text-[5.5px] font-mono leading-tight opacity-70">
                Modular Gutenberg layouts for creative studios.
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=75"
              alt="Kripa theme"
              className="w-full h-full max-h-[92px] object-cover object-top grayscale contrast-110"
            />
          </div>
          <div className="mt-1 pt-1 border-t border-black/25">
            <div className="font-display text-[10px] uppercase tracking-tight mb-0.5">
              GREAT SOLUTIONS
            </div>
            <div className="grid grid-cols-3 gap-1 text-[5px] font-mono uppercase">
              <div className="border border-black/25 p-0.5">FIRST</div>
              <div className="border border-black/25 p-0.5">SECOND</div>
              <div className="border border-black/25 p-0.5">THIRD</div>
            </div>
          </div>
        </div>
      );

    case 'ekamrika':
      return (
        <div className="relative w-full h-full bg-[#141414] text-[#EAE6DF] overflow-hidden pt-8 px-3 pb-2.5 flex flex-col justify-between">
          <div className="font-display uppercase text-2xl leading-[0.86] text-center">
            NEW BRAND
          </div>
          <div className="grid grid-cols-2 gap-1.5 flex-1 my-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=75"
              alt="Ekamrika left"
              className="w-full h-full object-cover grayscale contrast-125"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=240&q=75"
              alt="Ekamrika right"
              className="w-full h-full object-cover contrast-110"
            />
          </div>
          <div className="bg-[#FF2E17] text-white text-[5.5px] font-mono uppercase px-2 py-0.5 text-center">
            CREATIVE AGENCY · ELEMENTOR
          </div>
        </div>
      );

    default:
      return (
        <div className="relative w-full h-full bg-[#E6C5D0] text-[#141414] overflow-hidden pt-8 px-3 pb-2.5 flex flex-col justify-between">
          <div className="font-display uppercase text-2xl leading-[0.86] text-center tracking-tight">
            PARADISE
          </div>
          <div className="grid grid-cols-[1.1fr_0.9fr] gap-2 flex-1 my-1 min-h-0">
            <div className="text-[6px] font-mono leading-tight flex flex-col justify-center font-bold uppercase">
              BELIEVE YOU CAN AND YOU&apos;RE HALFWAY THERE.
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=280&q=75"
              alt="Gamana theme"
              className="w-full h-full object-cover contrast-110 border border-black/25"
            />
          </div>
          <div className="bg-[#141414] text-[#E6C5D0] text-[5.5px] font-mono uppercase px-2 py-0.5 flex justify-between">
            <span>GAMANA / 10</span>
            <span>WPKOI BLOCKS</span>
          </div>
        </div>
      );
  }
}

function GlitchCardFrame({ children }: { children: ReactNode }) {
  return (
    <div className="glitch-card-inner">
      <div className="w-full h-full">{children}</div>
      <div className="glitch-layer-cyan" aria-hidden="true">
        {children}
      </div>
      <div className="glitch-layer-red" aria-hidden="true">
        {children}
      </div>
      <div className="glitch-layer-yellow" aria-hidden="true" />
    </div>
  );
}

export default function WorksCarousel() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const headWrapRef = useRef<HTMLDivElement>(null);
  const madeCharRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const brokeBrushRef = useRef<SVGSVGElement>(null);

  const carouselWrapRef = useRef<HTMLDivElement>(null);
  const carouselViewportRef = useRef<HTMLDivElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const carouselCardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const isHoveredRef = useRef(false);

  const bottomWrapRef = useRef<HTMLDivElement>(null);
  const wpkoiCalloutRef = useRef<HTMLDivElement>(null);
  const downloadsCharRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const downloadsBrushRef = useRef<SVGSVGElement>(null);
  const designedNoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let smoothEnter = 0;
    let smoothPin = 0;
    let carouselOffset = 0;
    let scrollBoost = 0;
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let rafId = 0;

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastScrollY;
      lastScrollY = y;
      scrollBoost = clamp(scrollBoost + dy * 0.55, -420, 420);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const vh = window.innerHeight || 1;
      const zone = zoneRef.current;

      if (zone) {
        const rect = zone.getBoundingClientRect();
        const rawEnter = clamp((vh * 0.9 - rect.top) / (vh * 0.9), 0, 1);
        const span = Math.max(zone.offsetHeight - vh, 1);
        const rawPin = clamp(-rect.top / span, 0, 1);

        smoothEnter += (rawEnter - smoothEnter) * 0.16;
        smoothPin += (rawPin - smoothPin) * 0.14;
      }

      // Subtle tilt-fade out at the very end of the pin before WorksWpkoi rises
      const exitT = easeOutCubic(seg(smoothPin, 0.72, 1.0));

      if (headWrapRef.current) {
        headWrapRef.current.style.opacity = String(1 - exitT * 0.85);
        headWrapRef.current.style.transform = `translate3d(0, ${-exitT * 32}px, 0) rotate(${
          -exitT * 3.5
        }deg)`;
      }

      // 1. Assemble MADE SOME. BROKE SOME... letter-by-letter while entering
      const totalMade = madeCharRefs.current.length;
      madeCharRefs.current.forEach((el, idx) => {
        if (!el) return;
        const start = 0.04 + (idx / Math.max(totalMade, 1)) * 0.52;
        const t = easeOutCubic(seg(smoothEnter, start, start + 0.28));
        const tilt = CHAR_TILTS[idx % CHAR_TILTS.length] * (1 - t);
        const dy = (idx % 2 === 0 ? -1 : 1) * (14 + (idx % 4) * 4) * (1 - t);
        el.style.opacity = String(t);
        el.style.transform = `translate3d(0, ${dy}px, 0) rotate(${tilt}deg) scale(${
          1 + 0.12 * (1 - t)
        })`;
      });

      if (brokeBrushRef.current) {
        const bt = easeOutCubic(seg(smoothEnter, 0.52, 0.92));
        brokeBrushRef.current.style.opacity = String(bt);
        brokeBrushRef.current.style.clipPath = `inset(0 ${(1 - bt) * 100}% 0 0)`;
      }

      // 2. Reveal & drive continuous inward-curved 3D carousel
      if (carouselWrapRef.current) {
        const cIn = easeOutCubic(seg(smoothEnter, 0.45, 0.95));
        carouselWrapRef.current.style.opacity = String(cIn * (1 - exitT * 0.75));
        carouselWrapRef.current.style.transform = `translate3d(0, ${(1 - cIn) * 24}px, 0) scale(${
          1 - exitT * 0.06
        })`;
      }

      const vp = carouselViewportRef.current;
      const track = carouselTrackRef.current;
      if (vp && track) {
        const halfTrack = track.scrollWidth / 2;
        if (halfTrack > 0) {
          const baseSpeed = isHoveredRef.current ? 16 : 64;
          scrollBoost *= 0.92;
          carouselOffset += (baseSpeed + scrollBoost) * dt;
          if (carouselOffset >= halfTrack) carouselOffset -= halfTrack;
          if (carouselOffset < 0) carouselOffset += halfTrack;

          track.style.transform = `translate3d(${-carouselOffset}px, 0, 0)`;

          const vpRect = vp.getBoundingClientRect();
          const vpCenter = vpRect.left + vpRect.width * 0.5;
          const halfW = Math.max(vpRect.width * 0.5, 1);

          carouselCardRefs.current.forEach((cardEl) => {
            if (!cardEl) return;
            const rect = cardEl.getBoundingClientRect();
            if (rect.right < vpRect.left - 160 || rect.left > vpRect.right + 160) return;

            const cardCenter = rect.left + rect.width * 0.5;
            const norm = clamp((cardCenter - vpCenter) / halfW, -1.35, 1.35);

            // Inward concave cylindrical curve
            const rotateY = -norm * 35;
            const translateZ = norm * norm * 86 - 42;
            const scale = 0.92 + Math.abs(norm) * 0.08;
            const opacity = clamp(1.18 - Math.abs(norm) * 0.44, 0.2, 1);

            cardEl.style.transform = `perspective(680px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
            cardEl.style.opacity = String(opacity);
          });
        }
      }

      // 3. Bottom row: WPKOI ↗ + AND SOMEHOW, 1M+ DOWNLOADS
      if (bottomWrapRef.current) {
        bottomWrapRef.current.style.opacity = String(1 - exitT * 0.85);
        bottomWrapRef.current.style.transform = `translate3d(0, ${exitT * 30}px, 0) rotate(${
          exitT * 2.8
        }deg)`;
      }

      const dlProgress = clamp(smoothEnter * 0.78 + smoothPin * 1.6, 0, 1);
      const totalDl = downloadsCharRefs.current.length;
      downloadsCharRefs.current.forEach((el, idx) => {
        if (!el) return;
        const start = 0.28 + (idx / Math.max(totalDl, 1)) * 0.36;
        const t = easeOutCubic(seg(dlProgress, start, start + 0.24));
        const tilt = CHAR_TILTS[(idx + 3) % CHAR_TILTS.length] * (1 - t);
        const dy = (idx % 2 === 0 ? 1 : -1) * 14 * (1 - t);
        el.style.opacity = String(t);
        el.style.transform = `translate3d(0, ${dy}px, 0) rotate(${tilt}deg)`;
      });

      if (downloadsBrushRef.current) {
        const dbt = easeOutCubic(seg(dlProgress, 0.64, 0.88));
        downloadsBrushRef.current.style.opacity = String(dbt);
        downloadsBrushRef.current.style.clipPath = `inset(0 ${(1 - dbt) * 100}% 0 0)`;
      }

      if (designedNoteRef.current) {
        designedNoteRef.current.style.opacity = String(easeOutCubic(seg(dlProgress, 0.72, 0.94)));
      }

      if (wpkoiCalloutRef.current) {
        const wt = easeOutCubic(seg(dlProgress, 0.62, 0.88));
        wpkoiCalloutRef.current.style.opacity = String(wt);
        wpkoiCalloutRef.current.style.transform = `translate3d(${(1 - wt) * -16}px, 0, 0) rotate(-6deg)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const madeChars = 'MADE SOME.'.split('');
  const brokeChars = 'BROKE SOME...'.split('');
  const somehowChars = 'AND SOMEHOW,'.split('');
  const downloadsChars = '1M+ DOWNLOADS'.split('');

  let madeIdx = 0;
  let dlIdx = 0;

  return (
    <div ref={zoneRef} className="relative h-[185vh] w-full select-none">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-12 sm:py-16 overflow-hidden">
        {/* === TOP HEADLINE: MADE SOME. BROKE SOME... === */}
        <div ref={headWrapRef} className="px-8 sm:px-14 pt-2 will-change-transform">
          <h2 className="boil-subtle font-display uppercase text-[10.5vw] sm:text-[7.2vw] lg:text-[5.4vw] xl:text-[5.1vw] leading-[0.88] tracking-[-0.02em] flex flex-wrap items-baseline gap-x-4 sm:gap-x-6">
            <span className="inline-flex">
              {madeChars.map((ch, i) => {
                if (ch === ' ') {
                  return (
                    <span key={`m-${i}`} className="inline-block w-[0.24em]">
                      &nbsp;
                    </span>
                  );
                }
                const refIdx = madeIdx++;
                return (
                  <span
                    key={`m-${i}`}
                    ref={(el) => {
                      madeCharRefs.current[refIdx] = el;
                    }}
                    style={{ opacity: 0 }}
                    className="inline-block text-[#EAE6DF] drop-shadow-[0_0_20px_rgba(234,230,223,0.18)] will-change-transform"
                  >
                    {ch}
                  </span>
                );
              })}
            </span>

            <span className="inline-flex flex-col">
              <span className="kinetic-blink inline-flex">
                {brokeChars.map((ch, i) => {
                  if (ch === ' ') {
                    return (
                      <span key={`b-${i}`} className="inline-block w-[0.24em]">
                        &nbsp;
                      </span>
                    );
                  }
                  const refIdx = madeIdx++;
                  return (
                    <span
                      key={`b-${i}`}
                      ref={(el) => {
                        madeCharRefs.current[refIdx] = el;
                      }}
                      style={{ opacity: 0 }}
                      className="inline-block text-[#FF2E17] drop-shadow-[0_0_24px_rgba(255,46,23,0.38)] will-change-transform"
                    >
                      {ch}
                    </span>
                  );
                })}
              </span>

              <svg
                ref={brokeBrushRef}
                style={{ opacity: 0 }}
                viewBox="0 0 420 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="boil-fast w-full h-3 sm:h-3.5 mt-1 text-[#EAE6DF]/90"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 13C115 8 285 6 417 9C325 13 145 14 14 16"
                  stroke="currentColor"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
        </div>

        {/* === MIDDLE: INWARD CONCAVE 3D GLITCH CAROUSEL === */}
        <div ref={carouselWrapRef} style={{ opacity: 0 }} className="w-full will-change-transform">
          <div
            ref={carouselViewportRef}
            onMouseEnter={() => {
              isHoveredRef.current = true;
            }}
            onMouseLeave={() => {
              isHoveredRef.current = false;
            }}
            className="relative w-full py-6 overflow-hidden"
            style={{
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
              maskImage:
                'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
            }}
          >
            <div
              ref={carouselTrackRef}
              className="flex items-center gap-6 sm:gap-7 w-max will-change-transform"
            >
              {loopedCards.map((card, idx) => (
                <a
                  key={`${card.id}-${idx}`}
                  ref={(el) => {
                    carouselCardRefs.current[idx] = el;
                  }}
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block shrink-0 w-[225px] sm:w-[245px] xl:w-[265px] aspect-[4/3.1] bg-[#161616] border border-white/15 overflow-hidden shadow-[0_20px_44px_rgba(0,0,0,0.72)] will-change-transform"
                >
                  <div className="absolute top-2 left-2.5 z-30 inline-flex items-center gap-1.5 bg-[#EAE6DF]/92 px-2.5 py-0.5 text-[10px] font-mono tracking-[0.14em] uppercase text-[#141414]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E17] shrink-0" />
                    <span className="font-semibold">
                      {card.name} / {card.id}
                    </span>
                  </div>

                  <GlitchCardFrame>
                    <ThemeCardArtwork variant={card.variant} />
                  </GlitchCardFrame>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* === BOTTOM: HANDWRITTEN WPKOI ↗ + AND SOMEHOW, 1M+ DOWNLOADS === */}
        <div
          ref={bottomWrapRef}
          className="px-8 sm:px-14 pb-2 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 will-change-transform"
        >
          <div
            ref={wpkoiCalloutRef}
            style={{ opacity: 0 }}
            className="boil-fast font-marker text-2xl sm:text-3xl text-[#EAE6DF] inline-flex items-center gap-2 mb-2 will-change-transform"
          >
            <span>WPKOI</span>
            <svg
              viewBox="0 0 42 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-9 h-6 text-[#EAE6DF]"
            >
              <path
                d="M3 23C14 19 25 13 37 5M22 4C28 4 33 4 38 4C36 10 34 15 32 20"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex flex-col items-end text-right ml-auto">
            <div className="boil-subtle font-display uppercase text-[8vw] sm:text-[5vw] lg:text-[3.5vw] leading-[0.9] tracking-[-0.015em] flex flex-wrap justify-end items-baseline gap-x-3 sm:gap-x-4">
              <span className="inline-flex">
                {somehowChars.map((ch, i) => {
                  if (ch === ' ') {
                    return (
                      <span key={`s-${i}`} className="inline-block w-[0.24em]">
                        &nbsp;
                      </span>
                    );
                  }
                  const refIdx = dlIdx++;
                  return (
                    <span
                      key={`s-${i}`}
                      ref={(el) => {
                        downloadsCharRefs.current[refIdx] = el;
                      }}
                      style={{ opacity: 0 }}
                      className="inline-block text-[#EAE6DF] will-change-transform"
                    >
                      {ch}
                    </span>
                  );
                })}
              </span>

              <span className="inline-flex flex-col">
                <span className="kinetic-blink inline-flex">
                  {downloadsChars.map((ch, i) => {
                    if (ch === ' ') {
                      return (
                        <span key={`d-${i}`} className="inline-block w-[0.24em]">
                          &nbsp;
                        </span>
                      );
                    }
                    const refIdx = dlIdx++;
                    return (
                      <span
                        key={`d-${i}`}
                        ref={(el) => {
                          downloadsCharRefs.current[refIdx] = el;
                        }}
                        style={{ opacity: 0 }}
                        className="inline-block text-[#FF2E17] drop-shadow-[0_0_20px_rgba(255,46,23,0.38)] will-change-transform"
                      >
                        {ch}
                      </span>
                    );
                  })}
                </span>

                <svg
                  ref={downloadsBrushRef}
                  style={{ opacity: 0 }}
                  viewBox="0 0 340 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-2.5 sm:h-3 mt-1 text-[#EAE6DF]/90"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 11C95 7 235 5 337 8C260 11 115 12 12 14"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>

            <p
              ref={designedNoteRef}
              style={{ opacity: 0 }}
              className="mt-3.5 font-mono text-[10px] sm:text-xs tracking-[0.18em] uppercase text-[#9A9792]"
            >
              DESIGNED. CODED. SHIPPED. BY ME.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}