'use client';

import { useEffect, useRef, useState } from 'react';

const wpkoiShowcaseSlides = [
  { num: '01', videoSrc: '/showcase-01.mp4', variant: 'trending' as const },
  { num: '02', videoSrc: '/showcase-02.mp4', variant: 'catalog' as const },
  { num: '03', videoSrc: '/showcase-01.mp4', variant: 'toolkit' as const },
  { num: '04', videoSrc: '/showcase-01.mp4', variant: 'color' as const },
  { num: '05', videoSrc: '/showcase-02.mp4', variant: 'dark' as const },
];

const experienceItems = [
  { period: '2022 → NOW', title: 'WWWOWS.COM', desc: 'WORDPRESS BLOCK THEME DEVELOPER' },
  { period: '2015 → 2017', title: 'WEBZAKT', desc: 'WORDPRESS THEME DEVELOPER' },
  { period: '2012 → 2019', title: 'FREELANCE WORKS', desc: 'WEB DEVELOPMENT & CLIENT PROJECTS' },
  { period: '2009 → 2012', title: 'FILMMAKER', desc: 'VIDEO EDITING' },
];

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));
const seg = (p: number, start: number, end: number) => clamp((p - start) / (end - start));

function WpkoiShowcaseArtwork({
  variant,
}: {
  variant: (typeof wpkoiShowcaseSlides)[number]['variant'];
}) {
  switch (variant) {
    case 'trending':
      return (
        <div className="relative w-full h-full bg-[#111111] text-[#EAE6DF] overflow-hidden flex flex-col justify-between">
          <div className="relative flex-1 p-5 flex flex-col justify-between bg-gradient-to-br from-[#1E1A18] via-[#141414] to-[#1B1715]">
            <div className="pointer-events-none absolute inset-0 opacity-20 grid grid-cols-3 gap-2 p-2">
              <div className="bg-[#C8281D]/40" />
              <div className="bg-[#EAE6DF]/20" />
              <div className="bg-[#D8BE3A]/30" />
            </div>

            <div className="relative z-10 text-[8px] font-mono uppercase tracking-[0.2em] text-white/65 leading-tight pt-4">
              <span className="inline-block w-1.5 h-1.5 bg-[#FF2E17] mr-1.5 align-middle" />
              WEBGL EFFECTS.
              <br />
              WITHOUT CODE.
            </div>

            <div className="relative z-10 font-display uppercase text-4xl sm:text-5xl leading-[0.84] tracking-tight">
              <span className="text-[#FF2E17]">WPKOI.</span>
              <span className="text-[#EAE6DF]">THEMES</span>
            </div>
          </div>

          <div className="bg-[#D9C826] text-[#111] font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-3 py-1 truncate">
            Premium versions come with lifetime updates! Don&apos;t miss! · Check our discounted bundles
          </div>

          <div className="bg-[#0E0E0E] px-5 py-4 flex items-baseline justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#FF2E17] inline-block" />
              <span className="font-display uppercase text-3xl sm:text-4xl tracking-tight text-[#EAE6DF]">
                TRENDING
              </span>
            </div>
            <span className="font-mono text-[7.5px] text-white/45 uppercase">
              #181THEMES · #1M+DOWNLOADS
            </span>
          </div>
        </div>
      );

    case 'catalog':
      return (
        <div className="relative w-full h-full bg-[#131313] text-[#EAE6DF] p-3 grid grid-cols-3 grid-rows-2 gap-2.5 overflow-hidden">
          {[
            { name: 'ARTANDA', price: '59$', bg: '#D8BE3A', fg: '#141414', sub: 'STUDIO GRID' },
            { name: 'LALITA', price: '59$', bg: '#D9D6CE', fg: '#141414', sub: '51 DESIGNS' },
            { name: 'PRAKATA', price: '59$', bg: '#C9C2B2', fg: '#A6241B', sub: 'MAKE NOISE' },
            { name: 'ARVA', price: '49$', bg: '#ECEAE4', fg: '#C8281D', sub: 'NEXUS' },
            { name: 'ABHEDA', price: '49$', bg: '#DFDDD6', fg: '#141414', sub: 'MOMENTUM' },
            { name: 'EKANTIKA', price: '59$', bg: '#1D1D1D', fg: '#EAE6DF', sub: 'NEW BRAND' },
          ].map((tile) => (
            <div
              key={tile.name}
              style={{ backgroundColor: tile.bg, color: tile.fg }}
              className="p-2 flex flex-col justify-between border border-white/10"
            >
              <div className="flex items-center justify-between font-mono text-[6px] uppercase opacity-75">
                <span>{tile.name}</span>
                <span>{tile.price}</span>
              </div>
              <span className="font-display uppercase text-sm sm:text-base leading-none">
                {tile.sub}
              </span>
            </div>
          ))}
        </div>
      );

    case 'toolkit':
      return (
        <div className="relative w-full h-full bg-[#ECEAE4] text-[#141414] p-4 flex flex-col justify-between overflow-hidden">
          <div className="grid grid-cols-3 gap-2 flex-1 min-h-0">
            <div className="bg-[#141414] text-[#EAE6DF] p-2 flex flex-col justify-between">
              <span className="font-mono text-[6px] opacity-70">ABHASA</span>
              <span className="font-display text-sm uppercase text-[#D8BE3A]">MOMENTUM</span>
            </div>
            <div className="bg-[#C8281D] text-white p-2 flex flex-col justify-between">
              <span className="font-mono text-[6px] opacity-80">SATTVA</span>
              <span className="font-display text-sm uppercase">IMAGINATION</span>
            </div>
            <div className="bg-[#1A1A1A] text-[#EAE6DF] p-2 flex flex-col justify-between">
              <span className="font-mono text-[6px] text-[#FF2E17]">500+ TEMPLATES</span>
              <span className="font-display text-xs uppercase">ELEMENTOR</span>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-black/20 flex items-baseline justify-between">
            <div className="font-display uppercase text-xl sm:text-2xl leading-none">
              181 THEMES &amp; PLUGINS FOR <span className="text-[#FF2E17]">149$!</span>
            </div>
            <span className="font-mono text-[7px] uppercase opacity-70">ONE TIME</span>
          </div>
        </div>
      );

    case 'color':
      return (
        <div className="relative w-full h-full bg-[#161616] text-[#EAE6DF] p-5 flex flex-col justify-between overflow-hidden">
          <div>
            <div className="font-display uppercase text-3xl sm:text-4xl leading-[0.86] text-center">
              THEMES BY
            </div>
            <div className="font-mono text-[8px] text-center text-white/50 mt-1">
              Browse the themes by categories
            </div>
          </div>
          <div className="my-3 grid grid-cols-[1.55fr_0.5fr] gap-2.5 flex-1">
            <div className="bg-[#1C1C1C] border border-white/15 p-3 flex flex-col justify-between">
              <span className="font-mono text-[9px] text-white/60">001</span>
              <div className="bg-[#D5D1C8] text-[#C8281D] font-display text-3xl text-center py-3 uppercase">
                NEXUS
              </div>
              <span className="font-display text-3xl tracking-tight uppercase">COLOR</span>
            </div>
            <div className="bg-[#ECEAE4] text-[#141414] p-2 flex flex-col justify-between">
              <span className="font-mono text-[8px]">002</span>
              <span className="font-display text-sm uppercase">DARK</span>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="relative w-full h-full bg-[#141414] text-[#EAE6DF] p-5 flex flex-col justify-between overflow-hidden">
          <div>
            <div className="font-display uppercase text-3xl sm:text-4xl leading-[0.86] text-center">
              THEMES BY
            </div>
            <div className="font-mono text-[8px] text-center text-white/50 mt-1">
              Browse the themes by categories
            </div>
          </div>
          <div className="my-3 grid grid-cols-2 gap-2.5 flex-1">
            <div className="bg-[#1B1B1B] border border-white/15 p-3 flex flex-col justify-between">
              <div className="bg-[#D5D1C8] text-[#C8281D] font-display text-2xl text-center py-3 uppercase">
                NEXUS
              </div>
              <span className="font-display text-2xl uppercase">COLOR</span>
            </div>
            <div className="bg-[#EAE6DF] text-[#141414] p-3 flex flex-col justify-between">
              <span className="font-mono text-[8px]">002</span>
              <div className="bg-[#191919] text-[#EAE6DF] p-2 font-mono text-[7px] uppercase">
                don&apos;t limit yourself
              </div>
              <span className="font-display text-2xl uppercase">DARK</span>
            </div>
          </div>
        </div>
      );
  }
}

// Plays a clean looping 1-2s video if present in /public, otherwise renders crisp artwork (no glitch/shake)
function ShowcaseCardMedia({
  videoSrc,
  variant,
}: {
  videoSrc: string;
  variant: (typeof wpkoiShowcaseSlides)[number]['variant'];
}) {
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden transition-transform duration-500 ease-out group-hover:scale-[1.02]">
      <WpkoiShowcaseArtwork variant={variant} />

      {!videoFailed && (
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}

export default function WorksShowcase({
  onProgressChange,
}: {
  onProgressChange?: (progress: number) => void;
}) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let smoothP = 0;
    let rafId = 0;

    const tick = () => {
      const zone = zoneRef.current;
      const vp = viewportRef.current;
      const track = trackRef.current;
      const vh = window.innerHeight || 1;

      if (zone) {
        const rect = zone.getBoundingClientRect();
        const span = Math.max(zone.offsetHeight - vh, 1);
        const rawP = clamp(-rect.top / span, 0, 1);

        smoothP += (rawP - smoothP) * 0.14;
        if (Math.abs(rawP - smoothP) < 0.0004) smoothP = rawP;

        onProgressChange?.(rawP);
      }

      const slideProgress = seg(smoothP, 0.04, 0.94);

      if (vp && track) {
        const maxShift = Math.max(track.scrollWidth - vp.clientWidth + 40, 0);
        track.style.transform = `translate3d(${-slideProgress * maxShift}px, 0, 0)`;
      }

      const activeIdx = Math.min(
        wpkoiShowcaseSlides.length - 1,
        Math.max(0, Math.round(slideProgress * (wpkoiShowcaseSlides.length - 1)))
      );

      if (counterRef.current) {
        counterRef.current.textContent = String(activeIdx + 1).padStart(2, '0');
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [onProgressChange]);

  return (
    <div ref={zoneRef} className="relative h-[320vh] w-full select-none">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between px-7 sm:px-10 xl:px-14 py-9 sm:py-11 overflow-hidden">
        {/* === TOP ROW: WPKOI / 2018 -> NOW + IT TOOK MY TIME. + ENTER WPKOI ↗ === */}
        <div className="flex flex-wrap items-start justify-between gap-4 pt-1">
          <div>
            <div className="inline-flex flex-col">
              <div className="flex items-baseline gap-2 font-mono text-xs tracking-[0.16em] uppercase text-[#9A9792]">
                <span>WPKOI / 2018 →</span>
                <span className="font-marker text-xl sm:text-2xl text-[#FF2E17] leading-none">
                  NOW
                </span>
              </div>
              <svg
                viewBox="0 0 210 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mt-0.5 w-full h-1.5 text-[#EAE6DF]/75"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 5C62 3 148 3 208 4"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h3 className="mt-1.5 font-display uppercase text-4xl sm:text-5xl lg:text-[56px] leading-[0.88] tracking-tight">
              <span className="text-[#EAE6DF]">IT TOOK </span>
              <span className="text-[#FF2E17]">MY TIME.</span>
            </h3>
          </div>

          <a
            href="https://wpkoi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-7 py-2.5 font-marker text-lg sm:text-2xl text-[#EAE6DF] hover:text-[#FF2E17] transition-colors -rotate-2"
          >
            <svg
              viewBox="0 0 240 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none absolute inset-0 w-full h-full text-[#EAE6DF]/85"
              preserveAspectRatio="none"
            >
              <path
                d="M14 34C10 14 78 5 138 7C204 9 236 22 228 40C220 56 154 61 92 58C30 55 8 44 18 26"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            </svg>
            <span>ENTER WPKOI</span>
            <span className="text-[#EAE6DF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              ↗
            </span>
          </a>
        </div>

        {/* === MIDDLE ROW: 01 / 05 + SCROLL -> + CLEAN SIDE-BY-SIDE 5-CARD TRACK === */}
        <div className="my-auto grid grid-cols-1 md:grid-cols-[105px_1fr] items-center gap-5 py-3">
          <div className="flex md:flex-col items-center md:items-start justify-between md:h-[245px]">
            <div className="font-display text-2xl sm:text-3xl tracking-wider tabular-nums">
              <span ref={counterRef} className="text-[#FF2E17]">
                01
              </span>
              <span className="text-[#787570]"> / 05</span>
            </div>

            <div className="font-marker text-base sm:text-lg text-[#EAE6DF] -rotate-3">
              SCROLL →
            </div>
          </div>

          <div ref={viewportRef} className="relative w-full overflow-hidden">
            <div
              ref={trackRef}
              className="flex items-center gap-6 pr-12 w-max will-change-transform py-2"
            >
              {wpkoiShowcaseSlides.map((slide) => (
                <a
                  key={slide.num}
                  href="https://wpkoi.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block shrink-0 w-[290px] sm:w-[350px] xl:w-[395px] aspect-[16/11] bg-[#141414] border border-white/15 overflow-hidden shadow-[0_18px_42px_rgba(0,0,0,0.7)]"
                >
                  <div className="absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 bg-[#EAE6DF]/92 px-2 py-0.5 text-[10px] font-mono font-bold text-[#141414]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E17]" />
                    <span>{slide.num}</span>
                  </div>

                  <ShowcaseCardMedia videoSrc={slide.videoSrc} variant={slide.variant} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* === BOTTOM ROW: SINGLE-LINE 4-COLUMN EXPERIENCE BAR + RIGHT-ALIGNED VIEW FULL EXPERIENCE ↗ === */}
        <div className="pt-3 flex flex-col lg:flex-row lg:flex-nowrap items-start lg:items-end justify-between gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 xl:gap-x-5 gap-y-2.5 flex-1 min-w-0">
            {experienceItems.map((exp, idx) => (
              <div
                key={exp.title}
                className={`space-y-0.5 min-w-0 ${
                  idx > 0 ? 'sm:border-l sm:border-white/15 sm:pl-3 xl:pl-4' : ''
                }`}
              >
                <div className="font-mono text-[8.5px] xl:text-[9px] tracking-[0.12em] uppercase text-[#8A8A8A] whitespace-nowrap">
                  {exp.period.split('→')[0]}
                  <span className="text-[#FF2E17] mx-0.5">→</span>
                  {exp.period.split('→')[1]}
                </div>
                <div className="font-display uppercase text-sm xl:text-base tracking-tight text-[#EAE6DF] truncate">
                  {exp.title}
                </div>
                <div className="font-mono text-[7.5px] xl:text-[8.5px] leading-tight uppercase text-[#7C7974]">
                  {exp.desc}
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://www.linkedin.com/in/danielkiss-web-development/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-1.5 px-4 xl:px-6 py-1.5 xl:py-2 font-marker text-sm xl:text-base text-[#EAE6DF] hover:text-[#FF2E17] transition-colors whitespace-nowrap shrink-0"
          >
            <svg
              viewBox="0 0 280 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none absolute inset-0 w-full h-full text-[#EAE6DF]/85"
              preserveAspectRatio="none"
            >
              <path
                d="M12 28C10 11 86 5 152 6C228 8 274 17 268 33C262 47 184 51 112 49C36 47 8 38 16 22"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <span>VIEW FULL EXPERIENCE</span>
            <span className="text-[#EAE6DF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              ↗
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}