'use client';

import { useEffect, useRef, useState } from 'react';

interface AwardItem {
  id: string;
  label: string;
  url: string;
  column: 1 | 2;
  variant:
    | 'awwwards'
    | 'cssda-kudos'
    | 'cssda-innovation'
    | 'cssda-ui'
    | 'cssda-ux'
    | 'csswinner-sotd'
    | 'csswinner-star'
    | 'dn-sotd'
    | 'dn-hrasva'
    | 'dn-lovebird'
    | 'cssnectar';
}

const awardsList: AwardItem[] = [
  {
    id: 'awwwards',
    label: 'AWWWARDS HONORABLE MENTION (DANIELKISS.HU)',
    url: 'https://www.awwwards.com/',
    column: 1,
    variant: 'awwwards',
  },
  {
    id: 'cssda-kudos',
    label: 'CSSDA SPECIAL KUDOS (WPKOI)',
    url: 'https://www.cssdesignawards.com/sites/wpkoi-wordpress-themes/49813/',
    column: 1,
    variant: 'cssda-kudos',
  },
  {
    id: 'cssda-innovation',
    label: 'CSSDA INNOVATION PUBLIC AWARD (WPKOI)',
    url: 'https://www.cssdesignawards.com/sites/wpkoi-wordpress-themes/49813/',
    column: 1,
    variant: 'cssda-innovation',
  },
  {
    id: 'cssda-ui',
    label: 'CSSDA UI PUBLIC AWARD (WPKOI)',
    url: 'https://www.cssdesignawards.com/sites/wpkoi-wordpress-themes/49813/',
    column: 1,
    variant: 'cssda-ui',
  },
  {
    id: 'cssda-ux',
    label: 'CSSDA UX PUBLIC AWARD (WPKOI)',
    url: 'https://www.cssdesignawards.com/sites/wpkoi-wordpress-themes/49813/',
    column: 1,
    variant: 'cssda-ux',
  },
  {
    id: 'csswinner-sotd',
    label: 'CSSWINNER SOTD (DANIELKISS.HU)',
    url: 'https://www.csswinner.com/details/daniel-kiss-creative-development/19398',
    column: 1,
    variant: 'csswinner-sotd',
  },
  {
    id: 'csswinner-star',
    label: 'CSSWINNER STAR (TIRALECHAT.HU)',
    url: 'https://www.csswinner.com/details/tira-le-chat/19455',
    column: 2,
    variant: 'csswinner-star',
  },
  {
    id: 'dn-sotd',
    label: 'DESIGN NOMINEES SOTD (DANIELKISS.HU)',
    url: 'https://www.designnominees.com/sites/daniel-kiss-creative-web-development',
    column: 2,
    variant: 'dn-sotd',
  },
  {
    id: 'dn-hrasva',
    label: 'DESIGN NOMINEES TOTD (HRASVA)',
    url: 'https://www.designnominees.com/themes/hrasva-wpkoi-wordpress-theme',
    column: 2,
    variant: 'dn-hrasva',
  },
  {
    id: 'dn-lovebird',
    label: 'DESIGN NOMINEES TOTD (LOVEBIRD)',
    url: 'https://www.designnominees.com/themes/lovebird',
    column: 2,
    variant: 'dn-lovebird',
  },
  {
    id: 'cssnectar',
    label: 'CSS NECTAR SOTD (WPKOI)',
    url: 'https://cssnectar.com/css-gallery-inspiration/wpkoi-wordpress-themes/',
    column: 2,
    variant: 'cssnectar',
  },
];

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));

function CertificateArtwork({ variant }: { variant: AwardItem['variant'] }) {
  switch (variant) {
    case 'cssda-kudos':
      return (
        <div className="relative w-full h-full bg-[#6B4A3E] text-[#E6DDD6] p-4 flex flex-col justify-between overflow-hidden">
          <div className="text-[7px] font-mono uppercase tracking-[0.2em] opacity-80">
            <div>23 JULY 2026</div>
            <div className="text-[10px] font-display tracking-wider text-white mt-0.5">
              WPKOI WORDPRESS THEMES
            </div>
          </div>
          <div className="my-auto text-center -rotate-6">
            <div className="font-display text-4xl leading-[0.82] tracking-tight text-white/85">
              SPECIAL
              <span className="block">KUDOS</span>
            </div>
            <div className="mt-1 font-mono text-[8px] tracking-[0.28em] uppercase text-white/75">
              CSSDA · AWARD
            </div>
          </div>
          <div className="text-[7px] font-mono uppercase tracking-widest opacity-85">
            <div>AWARDED TO</div>
            <div className="text-white font-semibold">DANIEL KISS</div>
          </div>
        </div>
      );

    case 'cssda-innovation':
      return (
        <div className="relative w-full h-full bg-[#5D7B55] text-[#F1F4EC] p-4 flex flex-col justify-between overflow-hidden">
          <div className="flex justify-between items-start text-[7px] font-mono uppercase tracking-widest">
            <div>
              <div className="opacity-75">23 JULY 2026</div>
              <div className="text-[10px] font-display tracking-wider mt-0.5">
                WPKOI WORDPRESS THEMES
              </div>
            </div>
            <span className="border border-white/40 px-1 py-0.5 text-[6px]">CSSDA</span>
          </div>
          <div className="my-auto font-display text-[40px] leading-[0.78] tracking-tighter text-white/90 text-center">
            <div>INN</div>
            <div>OVATI</div>
            <div>ON</div>
          </div>
          <div className="text-[7px] font-mono uppercase tracking-widest opacity-90">
            <div>AWARDED TO</div>
            <div className="text-white font-semibold">DANIEL KISS</div>
          </div>
        </div>
      );

    case 'cssda-ui':
      return (
        <div className="relative w-full h-full bg-[#4454A6] text-[#EEF1FA] p-4 flex flex-col justify-between overflow-hidden">
          <div>
            <div className="text-[6.5px] font-mono uppercase tracking-widest opacity-75">
              23 JULY 2026
            </div>
            <div className="font-display text-xs tracking-wider uppercase mt-0.5">
              WPKOI WORDPRESS THEMES
            </div>
          </div>
          <div className="relative flex-1 flex items-center justify-center">
            <svg viewBox="0 0 140 160" fill="none" className="w-32 h-36 text-white/95">
              <path
                d="M28 18V92C28 118 48 134 72 134C96 134 114 118 114 92V18"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M104 20V142"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute left-2 font-mono text-[7px] tracking-widest uppercase border border-white/40 px-1.5 py-0.5">
              CSSDA
            </span>
          </div>
          <div className="text-[7px] font-mono uppercase tracking-widest opacity-90">
            <div>AWARDED TO</div>
            <div className="text-white font-semibold">DANIEL KISS</div>
          </div>
        </div>
      );

    case 'cssda-ux':
      return (
        <div className="relative w-full h-full bg-[#CE543E] text-[#FDF2EE] p-4 flex flex-col justify-between overflow-hidden">
          <div>
            <div className="text-[6.5px] font-mono uppercase tracking-widest opacity-75">
              23 JULY 2026
            </div>
            <div className="font-display text-xs tracking-wider uppercase mt-0.5">
              WPKOI WORDPRESS THEMES
            </div>
          </div>
          <div className="relative flex-1 flex items-center justify-center">
            <svg viewBox="0 0 140 160" fill="none" className="w-32 h-36 text-white/95">
              <path
                d="M26 22V86C26 108 42 122 64 122C86 122 102 108 102 86V22"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M34 62L116 142M116 62L34 142"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute right-1 font-mono text-[7px] tracking-widest uppercase border border-white/40 px-1.5 py-0.5">
              CSSDA
            </span>
          </div>
          <div className="text-[7px] font-mono uppercase tracking-widest opacity-90">
            <div>AWARDED TO</div>
            <div className="text-white font-semibold">DANIEL KISS</div>
          </div>
        </div>
      );

    case 'csswinner-sotd':
      return (
        <div className="relative w-full h-full bg-[#ECEAE6] text-[#1A1A1A] p-4 flex flex-col justify-between border-[5px] border-[#DFDCD6] overflow-hidden">
          <div className="flex justify-end font-mono text-[8px] font-bold tracking-wider uppercase">
            CSS<span className="text-[#C72B2B]">WINNER</span>
          </div>
          <div className="relative my-auto flex items-center justify-center py-2">
            <svg viewBox="0 0 180 180" className="w-36 h-36">
              <polygon
                points="90,10 158,132 22,132"
                fill="#C72B2B"
                fillOpacity="0.88"
              />
              <polygon
                points="90,170 22,48 158,48"
                fill="#C72B2B"
                fillOpacity="0.72"
              />
              <circle cx="90" cy="90" r="32" fill="#ECEAE6" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-display text-sm leading-[0.88] text-[#C72B2B] uppercase">
                SITE
                <span className="block text-[9px]">OF THE</span>
                DAY
              </span>
            </div>
            <div className="absolute left-1 top-1/2 -translate-y-1/2 text-[7px] font-mono text-white font-bold leading-tight text-center">
              <div>04</div>
              <div>SEP</div>
              <div>2026</div>
            </div>
          </div>
          <div className="border-t border-black/20 pt-2">
            <div className="font-display text-xs text-[#C72B2B] uppercase leading-tight">
              Daniel Kiss — Creative Development
            </div>
            <div className="text-[6.5px] font-mono text-black/60 mt-0.5">
              SITE OF THE DAY CERTIFICATE
            </div>
          </div>
        </div>
      );

    case 'csswinner-star':
      return (
        <div className="relative w-full h-full bg-[#EBF1EE] text-[#15221D] p-4 flex flex-col justify-between border-[5px] border-[#DAE4DF] overflow-hidden">
          <div className="flex justify-end font-mono text-[8px] font-bold tracking-wider uppercase">
            CSS<span className="text-[#4CA884]">WINNER</span>
          </div>
          <div className="relative my-auto flex items-center justify-center py-2">
            <svg viewBox="0 0 180 180" className="w-36 h-36">
              <polygon
                points="90,10 158,132 22,132"
                fill="#52B68E"
                fillOpacity="0.88"
              />
              <polygon
                points="90,170 22,48 158,48"
                fill="#52B68E"
                fillOpacity="0.72"
              />
              <circle cx="90" cy="90" r="32" fill="#EBF1EE" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-display text-xs leading-[0.95] text-[#2F8463] uppercase">
                CSSW
                <span className="block text-sm">STAR</span>
              </span>
            </div>
            <div className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[7px] font-mono text-white font-bold leading-tight text-center">
              <div>13</div>
              <div>OCT</div>
              <div>2026</div>
            </div>
          </div>
          <div className="border-t border-black/15 pt-2">
            <div className="font-display text-xs text-[#2F8463] uppercase leading-tight">
              Tira Le Chat
            </div>
            <div className="text-[6.5px] font-mono text-black/60 mt-0.5">
              By Daniel Kiss · CSS Winner Star
            </div>
          </div>
        </div>
      );

    case 'dn-sotd':
      return (
        <div className="relative w-full h-full bg-[#2B59D8] text-white p-4 flex flex-col justify-between overflow-hidden">
          <div>
            <div className="font-display text-xl leading-none tracking-tight">DN</div>
            <div className="text-[7px] font-mono opacity-80">Design Nominees</div>
          </div>
          <div className="my-auto text-center">
            <div className="font-display text-4xl leading-[0.86] uppercase tracking-tight">
              SITE
              <span className="block text-xl opacity-85">OF THE</span>
              DAY
            </div>
          </div>
          <div className="text-[8px] font-mono leading-snug">
            <div className="opacity-75 text-[6.5px]">03 SEP 2026</div>
            <div className="font-semibold">Daniel Kiss</div>
            <div className="opacity-80 text-[7px]">WPKoi WordPress Themes</div>
          </div>
        </div>
      );

    case 'dn-hrasva':
      return (
        <div className="relative w-full h-full bg-[#213368] text-white p-4 flex flex-col justify-between overflow-hidden">
          <div>
            <div className="font-display text-xl leading-none tracking-tight">DN</div>
            <div className="text-[7px] font-mono opacity-80">Design Nominees</div>
          </div>
          <div className="my-auto text-center">
            <div className="font-display text-3xl leading-[0.88] uppercase tracking-tight">
              THEME
              <span className="block text-lg opacity-80">OF THE</span>
              DAY
            </div>
          </div>
          <div className="text-[8px] font-mono leading-snug">
            <div className="opacity-75 text-[6.5px]">HRASVA THEME</div>
            <div className="font-semibold">Daniel Kiss</div>
            <div className="opacity-80 text-[7px]">WPKoi Collection</div>
          </div>
        </div>
      );

    case 'dn-lovebird':
      return (
        <div className="relative w-full h-full bg-[#1C284C] text-[#EAEFF9] p-4 flex flex-col justify-between overflow-hidden">
          <div>
            <div className="font-display text-xl leading-none tracking-tight">DN</div>
            <div className="text-[7px] font-mono opacity-80">Design Nominees</div>
          </div>
          <div className="my-auto text-center">
            <div className="font-display text-3xl leading-[0.88] uppercase tracking-tight text-[#8FB1FF]">
              THEME
              <span className="block text-lg text-white/80">OF THE</span>
              DAY
            </div>
          </div>
          <div className="text-[8px] font-mono leading-snug">
            <div className="opacity-75 text-[6.5px]">LOVEBIRD THEME</div>
            <div className="font-semibold">Daniel Kiss</div>
            <div className="opacity-80 text-[7px]">WordPress Block Theme</div>
          </div>
        </div>
      );

    case 'awwwards':
      return (
        <div className="relative w-full h-full bg-[#171717] text-[#EAE6DF] p-4 flex flex-col justify-between border border-white/20 overflow-hidden">
          <div className="flex justify-between items-center">
            <span className="font-display text-xl tracking-tight">W.</span>
            <span className="text-[7px] font-mono uppercase tracking-widest text-white/60">
              AWWWARDS
            </span>
          </div>
          <div className="my-auto">
            <div className="font-display text-3xl leading-[0.88] uppercase">
              HONORABLE
              <span className="block text-[#FF2E17]">MENTION</span>
            </div>
          </div>
          <div className="border-t border-white/15 pt-2 text-[7px] font-mono uppercase tracking-widest text-white/75">
            <div>DANIELKISS.HU</div>
            <div className="text-white/50 mt-0.5">CREATIVE DEVELOPMENT</div>
          </div>
        </div>
      );

    default:
      return (
        <div className="relative w-full h-full bg-[#221F1B] text-[#F2E5C6] p-4 flex flex-col justify-between border border-[#D4A64A]/40 overflow-hidden">
          <div className="text-[7px] font-mono uppercase tracking-[0.2em] text-[#D4A64A]">
            CSS NECTAR
          </div>
          <div className="my-auto text-center">
            <div className="font-display text-3xl leading-[0.88] uppercase text-[#F2E5C6]">
              SITE OF
              <span className="block text-[#D4A64A]">THE DAY</span>
            </div>
          </div>
          <div className="border-t border-[#D4A64A]/30 pt-2 text-[7px] font-mono uppercase tracking-widest">
            <div>WPKOI THEMES</div>
            <div className="opacity-65 mt-0.5">DANIEL KISS</div>
          </div>
        </div>
      );
  }
}

export default function AwardsSection() {
  const arcStageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const isWheelHoveredRef = useRef(false);
  const hoveredListIdxRef = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState<number>(6);
  const [hoveredListIdx, setHoveredListIdx] = useState<number | null>(null);

  useEffect(() => {
    const total = awardsList.length;
    const stepDeg = 21; // Tight fan matching danielkiss.hu (~5 certificates visible side-by-side)
    const spanDeg = total * stepDeg; // 231 deg total loop
    const halfSpan = spanDeg / 2; // Wraps invisibly offscreen at ±115.5 deg

    // Start with CSSWINNER STAR (index 6) centered at 12 o'clock
    let wheelAngle = -6 * stepDeg;
    let scrollMomentum = 0;
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let lastReportedIdx = 6;
    let rafId = 0;

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastScrollY;
      lastScrollY = y;
      scrollMomentum = clamp(scrollMomentum + dy * 0.05, -36, 36);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const stage = arcStageRef.current;
      if (stage) {
        const stageW = stage.clientWidth || 900;
        const radius = Math.max(480, Math.min(640, stageW * 0.66));

        // If hovering an award in the text list, smoothly swing that certificate to top-center
        if (hoveredListIdxRef.current !== null) {
          const targetAngle = -hoveredListIdxRef.current * stepDeg;
          const diff =
            ((((targetAngle - wheelAngle) % spanDeg) + spanDeg + halfSpan) % spanDeg) -
            halfSpan;
          wheelAngle += diff * Math.min(1, dt * 6.5);
          scrollMomentum *= 0.85;
        } else {
          // Continuous autonomous rotation (slows gently while hovering the wheel)
          const baseSpeedDeg = isWheelHoveredRef.current ? 3 : 11;
          scrollMomentum *= 0.92;
          wheelAngle += (baseSpeedDeg + scrollMomentum) * dt;
        }

        let closestIdx = lastReportedIdx;
        let closestDist = 999;

        cardRefs.current.forEach((cardEl, idx) => {
          if (!cardEl) return;

          const rawDeg = idx * stepDeg + wheelAngle;
          const deg =
            ((((rawDeg % spanDeg) + spanDeg + halfSpan) % spanDeg) - halfSpan);
          const absDeg = Math.abs(deg);

          if (absDeg < closestDist) {
            closestDist = absDeg;
            closestIdx = idx;
          }

          if (absDeg > 84) {
            cardEl.style.opacity = '0';
            cardEl.style.visibility = 'hidden';
            return;
          }

          const rad = (deg * Math.PI) / 180;
          const x = Math.sin(rad) * radius;
          const y = (1 - Math.cos(rad)) * radius;
          const opacity = clamp(1.15 - Math.max(0, absDeg - 26) / 52, 0, 1);
          const scale = 1 - (absDeg / 90) * 0.06;
          const zIndex = Math.round(50 - absDeg * 0.4);

          cardEl.style.visibility = 'visible';
          cardEl.style.opacity = String(opacity);
          cardEl.style.zIndex = String(zIndex);
          cardEl.style.transform = `translate3d(calc(-50% + ${x}px), ${y}px, 0) rotate(${deg}deg) scale(${scale})`;
        });

        if (closestIdx !== lastReportedIdx) {
          lastReportedIdx = closestIdx;
          setActiveIndex(closestIdx);
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const col1 = awardsList.filter((a) => a.column === 1);
  const col2 = awardsList.filter((a) => a.column === 2);

  return (
    <section
      id="awards"
      className="relative w-full pt-16 sm:pt-24 pb-8 select-none overflow-hidden"
      data-section-name="Awards"
    >
      {/* === TOP HEADLINE: I WANTED TO KNOW HOW FAR... + WORTH THE TRY === */}
      <div className="px-8 sm:px-14">
        <div className="max-w-5xl">
          <h2 className="font-display uppercase text-[10vw] sm:text-[7.2vw] lg:text-[5.4vw] xl:text-[5vw] leading-[0.88] tracking-[-0.02em] flex flex-wrap items-start gap-x-4 sm:gap-x-5">
            <span className="text-[#EAE6DF] drop-shadow-[0_0_20px_rgba(234,230,223,0.18)]">
              I WANTED TO KNOW
            </span>

            <span className="inline-flex flex-col items-end">
              <span className="text-[#FF2E17] drop-shadow-[0_0_24px_rgba(255,46,23,0.38)]">
                HOW FAR...
              </span>

              {/* Hand-drawn White Brush Underline under HOW FAR... */}
              <svg
                viewBox="0 0 360 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-3 sm:h-3.5 mt-1 text-[#EAE6DF]/90"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 13C100 8 245 6 357 9C280 13 125 14 12 16"
                  stroke="currentColor"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                />
              </svg>

              {/* Handwritten "-> WORTH THE TRY" Callout */}
              <span className="mt-1.5 font-marker text-base sm:text-xl lg:text-2xl tracking-wide text-[#EAE6DF] inline-flex items-center gap-2 -rotate-1">
                <span>→</span>
                <span>WORTH THE TRY</span>
              </span>
            </span>
          </h2>

          {/* === TWO-COLUMN SELECTED RECOGNITIONS LIST === */}
          <div className="mt-8 sm:mt-10">
            <div className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase text-[#EAE6DF] mb-3.5">
              SELECTED RECOGNITIONS
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1.5 max-w-4xl">
              {[col1, col2].map((col, colIdx) => (
                <ul key={colIdx} className="space-y-1">
                  {col.map((award) => {
                    const globalIdx = awardsList.findIndex((a) => a.id === award.id);
                    const isHighlighted =
                      hoveredListIdx === globalIdx || activeIndex === globalIdx;

                    return (
                      <li key={award.id}>
                        <a
                          href={award.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => {
                            hoveredListIdxRef.current = globalIdx;
                            setHoveredListIdx(globalIdx);
                          }}
                          onMouseLeave={() => {
                            hoveredListIdxRef.current = null;
                            setHoveredListIdx(null);
                          }}
                          className={`block font-mono text-[10px] sm:text-[11px] tracking-[0.1em] uppercase transition-colors duration-200 ${
                            isHighlighted
                              ? 'text-[#FF2E17]'
                              : 'text-[#8C8984] hover:text-[#FF2E17]'
                          }`}
                        >
                          {award.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* === ROTATING SEMICIRCULAR CERTIFICATE WHEEL === */}
      <div
        ref={arcStageRef}
        onMouseEnter={() => {
          isWheelHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isWheelHoveredRef.current = false;
        }}
        className="relative mt-6 sm:mt-8 w-full h-[460px] sm:h-[520px] lg:h-[550px] overflow-hidden"
        style={{
          WebkitMaskImage:
            'linear-gradient(to bottom, black 0%, black 78%, transparent 100%)',
          maskImage:
            'linear-gradient(to bottom, black 0%, black 78%, transparent 100%)',
        }}
      >
        {/* Rotating Certificate Posters */}
        {awardsList.map((award, idx) => (
          <a
            key={award.id}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            href={award.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredListIdx(idx)}
            onMouseLeave={() => setHoveredListIdx(null)}
            style={{
              left: '50%',
              top: '14px',
              opacity: 0,
              visibility: 'hidden',
            }}
            className="group absolute w-[185px] sm:w-[215px] xl:w-[232px] aspect-[3/4.1] shadow-[0_22px_50px_rgba(0,0,0,0.75)] will-change-transform cursor-pointer"
          >
            <div className="w-full h-full transition-transform duration-300 group-hover:scale-[1.04]">
              <CertificateArtwork variant={award.variant} />
            </div>
          </a>
        ))}

        {/* Centered Handwritten "AWARDS ↗" Inside the Lower Curve of the Semicircle */}
        <div className="pointer-events-none absolute inset-x-0 bottom-12 sm:bottom-14 z-[60] flex justify-center">
          <div className="font-marker text-3xl sm:text-5xl lg:text-[54px] tracking-wide text-[#EAE6DF] drop-shadow-[0_6px_24px_rgba(0,0,0,0.9)] flex items-center gap-3 -rotate-2">
            <span>AWARDS</span>
            <svg
              viewBox="0 0 42 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 sm:w-11 h-6 sm:h-8 text-[#EAE6DF]"
            >
              <path
                d="M4 24C14 19 25 13 37 6M22 5C28 5 33 5 38 5C36 10 34 15 32 20"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}