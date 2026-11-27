'use client';

import { useEffect, useRef, useState, type MutableRefObject } from 'react';

interface CollageTile {
  id: string;
  title: string;
  sub: string;
  bg: string;
  fg: string;
  accent: string;
  image?: string;
  fromX: number;
  fromY: number;
  fromRot: number;
}

const COLLAGE_TILES: CollageTile[] = [
  {
    id: 't1',
    title: 'STEP INTO',
    sub: 'OUR SHOW · 01',
    bg: '#23352D',
    fg: '#E6E2D8',
    accent: '#D8BE3A',
    fromX: -260,
    fromY: -180,
    fromRot: -18,
  },
  {
    id: 't2',
    title: 'APPROACH',
    sub: 'CREATIVE STUDIO',
    bg: '#191919',
    fg: '#EAE6DF',
    accent: '#C8281D',
    fromX: -120,
    fromY: -220,
    fromRot: 12,
  },
  {
    id: 't3',
    title: 'PROGRESS',
    sub: 'BLOCK PATTERNS',
    bg: '#D5D1C8',
    fg: '#141414',
    accent: '#141414',
    fromX: 40,
    fromY: -240,
    fromRot: -10,
  },
  {
    id: 't4',
    title: 'MOMENTUM',
    sub: '51 DESIGNS',
    bg: '#C9C2B2',
    fg: '#141414',
    accent: '#D8BE3A',
    fromX: 160,
    fromY: -210,
    fromRot: 15,
  },
  {
    id: 't5',
    title: 'GREAT SOLUTIONS',
    sub: 'KRIPA / 08',
    bg: '#DFDDD6',
    fg: '#141414',
    accent: '#C8281D',
    fromX: 290,
    fromY: -170,
    fromRot: 20,
  },
  {
    id: 't6',
    title: 'MOTIVATION',
    sub: 'TRIPTI / 06',
    bg: '#ECEAE4',
    fg: '#111111',
    accent: '#141414',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=360&q=75',
    fromX: -320,
    fromY: -40,
    fromRot: -16,
  },
  {
    id: 't7',
    title: 'INSPIRATION',
    sub: 'PLUTA / 04',
    bg: '#DFDDD6',
    fg: '#141414',
    accent: '#141414',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=320&q=75',
    fromX: -170,
    fromY: -90,
    fromRot: 14,
  },
  {
    id: 't8',
    title: 'NEXUS',
    sub: 'HRASVA / 02',
    bg: '#D5D1C8',
    fg: '#C8281D',
    accent: '#C8281D',
    image:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=360&q=75',
    fromX: -40,
    fromY: -140,
    fromRot: -9,
  },
  {
    id: 't9',
    title: 'NEW BRAND',
    sub: 'EKANTIKA / 09',
    bg: '#161616',
    fg: '#EAE6DF',
    accent: '#FF2E17',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=320&q=75',
    fromX: 190,
    fromY: -100,
    fromRot: 13,
  },
  {
    id: 't10',
    title: "LET'S HAVE SOME FUN!",
    sub: 'GUTENBERG READY',
    bg: '#E6E4DE',
    fg: '#141414',
    accent: '#141414',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=75',
    fromX: 330,
    fromY: -30,
    fromRot: 19,
  },
  {
    id: 't11',
    title: 'MAKE NOISE',
    sub: 'PRAKATA / 05',
    bg: '#C9C2B2',
    fg: '#A6241B',
    accent: '#A6241B',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=360&q=75',
    fromX: -310,
    fromY: 160,
    fromRot: -21,
  },
  {
    id: 't12',
    title: 'DIGITAL PARADISE',
    sub: 'GAMANA / 10',
    bg: '#DFB6C4',
    fg: '#141414',
    accent: '#141414',
    image:
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=75',
    fromX: -140,
    fromY: 190,
    fromRot: 11,
  },
  {
    id: 't13',
    title: 'ELECTRO',
    sub: 'KALPITA / 01',
    bg: '#D9D6CE',
    fg: '#A51D24',
    accent: '#A51D24',
    image:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=340&q=75',
    fromX: 20,
    fromY: 220,
    fromRot: -14,
  },
  {
    id: 't14',
    title: 'EUPHORIA',
    sub: 'SUGUPTA / 07',
    bg: '#D8BE3A',
    fg: '#151515',
    accent: '#388C6B',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=320&q=75',
    fromX: 210,
    fromY: 170,
    fromRot: -15,
  },
  {
    id: 't15',
    title: 'PERFECTION',
    sub: 'WPKOI COLLECTION',
    bg: '#C8281D',
    fg: '#F5EFE6',
    accent: '#141414',
    fromX: 320,
    fromY: 180,
    fromRot: 18,
  },
];

const CHAR_TILTS = [-14, 10, -8, 12, -11, 7, -13, 9, -7, 13, -6, 8, -12, 7, -9, 11];
const EMAIL_ADDRESS = 'info@danielkiss.hu';

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));
const seg = (p: number, start: number, end: number) => clamp((p - start) / (end - start));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function ContactSection({
  sidebarDismissRef,
}: {
  sidebarDismissRef?: MutableRefObject<number>;
}) {
  const introZoneRef = useRef<HTMLDivElement>(null);
  const introCharRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const finaleZoneRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bugCharRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const bugBrushRef = useRef<SVGSVGElement>(null);
  const emailWrapRef = useRef<HTMLDivElement>(null);
  const bottomCuesRef = useRef<HTMLDivElement>(null);

  // Per-tile drag offsets so users can grab and toss any background poster card
  const dragOffsetsRef = useRef<{ x: number; y: number; rot: number; z: number }[]>(
    COLLAGE_TILES.map(() => ({ x: 0, y: 0, rot: 0, z: 1 }))
  );
  const topZRef = useRef(5);
  const activeDragRef = useRef<{
    idx: number;
    startX: number;
    startY: number;
    baseX: number;
    baseY: number;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  // Global pointer drag handlers for the draggable poster cards
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      const drag = activeDragRef.current;
      if (!drag) return;
      const dx = e.clientX - drag.startX;
      const dy = e.clientY - drag.startY;
      dragOffsetsRef.current[drag.idx].x = drag.baseX + dx;
      dragOffsetsRef.current[drag.idx].y = drag.baseY + dy;
      dragOffsetsRef.current[drag.idx].rot = clamp(dx * 0.04, -14, 14);
    };

    const onPointerUp = () => {
      activeDragRef.current = null;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  // 60fps scroll choreography: Intro reveal -> Upward sidebar dismissal -> Poster wall snap -> BUG ME finale
  useEffect(() => {
    let smoothIntro = 0;
    let smoothDismiss = 0;
    let smoothFinale = 0;
    let rafId = 0;

    const tick = () => {
      const vh = window.innerHeight || 1;
      const introEl = introZoneRef.current;
      const finaleEl = finaleZoneRef.current;

      // 1. Intro headline progress + staggered upward sidebar dismissal
      if (introEl) {
        const rect = introEl.getBoundingClientRect();
        const rawIntro = clamp((vh * 0.92 - rect.top) / (vh * 0.52), 0, 1);
        smoothIntro += (rawIntro - smoothIntro) * 0.16;

        // Reaches 1.0 well before the full-width poster wall locks at top: 0
        const rawDismiss = clamp((vh * 0.5 - rect.top) / (vh * 0.6), 0, 1);
        smoothDismiss += (rawDismiss - smoothDismiss) * 0.16;
        if (Math.abs(rawDismiss - smoothDismiss) < 0.0004) smoothDismiss = rawDismiss;

        if (sidebarDismissRef) {
          sidebarDismissRef.current = smoothDismiss;
        }
      }

      const totalIntro = introCharRefs.current.length;
      introCharRefs.current.forEach((el, idx) => {
        if (!el) return;
        const start = (idx / Math.max(totalIntro, 1)) * 0.45;
        const t = easeOutCubic(seg(smoothIntro, start, start + 0.35));
        const tilt = CHAR_TILTS[idx % CHAR_TILTS.length] * (1 - t);
        const dy = (idx % 2 === 0 ? -1 : 1) * 18 * (1 - t);
        el.style.opacity = String(t);
        el.style.transform = `translate3d(0, ${dy}px, 0) rotate(${tilt}deg) scale(${
          1 + 0.12 * (1 - t)
        })`;
      });

      // 2. Finale zone progress (poster collage flies in & snaps straight -> BUG ME WITH YOUR IDEA)
      if (finaleEl) {
        const rect = finaleEl.getBoundingClientRect();
        const span = Math.max(finaleEl.offsetHeight - vh, 1);
        const rawFinale = clamp((vh * 0.45 - rect.top) / (span + vh * 0.45), 0, 1);
        smoothFinale += (rawFinale - smoothFinale) * 0.14;
        if (Math.abs(rawFinale - smoothFinale) < 0.0004) smoothFinale = rawFinale;
      }

      const f = smoothFinale;

      // Animate all 15 background collage tiles flying in from scattered edges + user drag offset
      tileRefs.current.forEach((tileEl, idx) => {
        if (!tileEl) return;
        const tile = COLLAGE_TILES[idx];
        const stagger = (idx % 5) * 0.035 + Math.floor(idx / 5) * 0.03;
        const settleT = easeOutCubic(seg(f, 0.02 + stagger, 0.48 + stagger));
        const drag = dragOffsetsRef.current[idx];

        const tx = tile.fromX * (1 - settleT) + drag.x;
        const ty = tile.fromY * (1 - settleT) + drag.y;
        const rot = tile.fromRot * (1 - settleT) + drag.rot;
        const scale = 0.86 + 0.14 * settleT;

        tileEl.style.opacity = String(clamp(settleT * 0.88, 0, 0.88));
        tileEl.style.zIndex = String(drag.z);
        tileEl.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${rot}deg) scale(${scale})`;
      });

      // Assemble centered "BUG ME WITH YOUR IDEA" letter-by-letter
      const totalBug = bugCharRefs.current.length;
      bugCharRefs.current.forEach((el, idx) => {
        if (!el) return;
        const start = 0.42 + (idx / Math.max(totalBug, 1)) * 0.24;
        const t = easeOutCubic(seg(f, start, start + 0.16));
        const tilt = CHAR_TILTS[(idx + 2) % CHAR_TILTS.length] * (1 - t);
        const dy = (idx % 2 === 0 ? 1 : -1) * 18 * (1 - t);
        el.style.opacity = String(t);
        el.style.transform = `translate3d(0, ${dy}px, 0) rotate(${tilt}deg) scale(${
          1 + 0.14 * (1 - t)
        })`;
      });

      if (bugBrushRef.current) {
        const bt = easeOutCubic(seg(f, 0.62, 0.76));
        bugBrushRef.current.style.opacity = String(bt);
        bugBrushRef.current.style.clipPath = `inset(0 ${(1 - bt) * 100}% 0 0)`;
      }

      if (emailWrapRef.current) {
        const et = easeOutCubic(seg(f, 0.66, 0.82));
        emailWrapRef.current.style.opacity = String(et);
        emailWrapRef.current.style.transform = `translate3d(0, ${(1 - et) * 20}px, 0)`;
      }

      if (bottomCuesRef.current) {
        const ct = easeOutCubic(seg(f, 0.72, 0.88));
        bottomCuesRef.current.style.opacity = String(ct);
        bottomCuesRef.current.style.transform = `translate3d(0, ${(1 - ct) * 14}px, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      if (sidebarDismissRef) sidebarDismissRef.current = 0;
    };
  }, [sidebarDismissRef]);

  const handleTilePointerDown = (idx: number, e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    topZRef.current += 1;
    dragOffsetsRef.current[idx].z = topZRef.current;
    activeDragRef.current = {
      idx,
      startX: e.clientX,
      startY: e.clientY,
      baseX: dragOffsetsRef.current[idx].x,
      baseY: dragOffsetsRef.current[idx].y,
    };
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = EMAIL_ADDRESS;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  introCharRefs.current = [];
  bugCharRefs.current = [];
  let introIdx = 0;
  let bugIdx = 0;

  const line1Intro = 'SO... WOULD YOU MAKE'.split('');
  const line2Intro = 'SOMETHING WEIRD TOGETHER?'.split('');
  const bugMeChars = 'BUG ME'.split('');
  const withIdeaChars = 'WITH YOUR IDEA'.split('');

  return (
    <section
      id="contact"
      className="relative z-20 w-full select-none"
      data-section-name="Contact"
    >
      {/* ===================================================================== */}
      {/* PART 1: "SO... WOULD YOU MAKE SOMETHING WEIRD TOGETHER?"              */}
      {/* Right-padded while the docked sidebar peels upward off-screen         */}
      {/* ===================================================================== */}
      <div
        ref={introZoneRef}
        className="relative min-h-[75vh] flex flex-col justify-center px-8 sm:px-14 py-20 lg:pr-[390px] xl:pr-[420px]"
      >
        <h2 className="boil-subtle font-display uppercase text-[9.5vw] sm:text-[6.8vw] lg:text-[4.9vw] xl:text-[4.6vw] leading-[0.9] tracking-[-0.02em]">
          <span className="block">
            {line1Intro.map((ch, i) => {
              if (ch === ' ') {
                return (
                  <span key={`i1-${i}`} className="inline-block w-[0.24em]">
                    &nbsp;
                  </span>
                );
              }
              const refIdx = introIdx++;
              return (
                <span
                  key={`i1-${i}`}
                  ref={(el) => {
                    introCharRefs.current[refIdx] = el;
                  }}
                  style={{ opacity: 0 }}
                  className="inline-block text-[#EAE6DF] drop-shadow-[0_0_20px_rgba(234,230,223,0.18)] will-change-transform"
                >
                  {ch}
                </span>
              );
            })}
          </span>

          <span className="block pl-6 sm:pl-14 lg:pl-20 mt-1">
            {line2Intro.map((ch, i) => {
              if (ch === ' ') {
                return (
                  <span key={`i2-${i}`} className="inline-block w-[0.24em]">
                    &nbsp;
                  </span>
                );
              }
              const refIdx = introIdx++;
              return (
                <span
                  key={`i2-${i}`}
                  ref={(el) => {
                    introCharRefs.current[refIdx] = el;
                  }}
                  style={{ opacity: 0 }}
                  className="inline-block text-[#FF2E17] drop-shadow-[0_0_24px_rgba(255,46,23,0.38)] will-change-transform"
                >
                  {ch}
                </span>
              );
            })}
          </span>
        </h2>
      </div>

      {/* ===================================================================== */}
      {/* PART 2: FULL-SCREEN DRAGGABLE POSTER WALL + "BUG ME WITH YOUR IDEA"   */}
      {/* ===================================================================== */}
      <div ref={finaleZoneRef} className="relative h-[220vh] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Draggable 5x3 Full-Bleed Poster Wall */}
          <div className="absolute inset-0 z-10 p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 grid-rows-3 gap-3 sm:gap-4">
            {COLLAGE_TILES.map((tile, idx) => (
              <div
                key={tile.id}
                ref={(el) => {
                  tileRefs.current[idx] = el;
                }}
                onPointerDown={(e) => handleTilePointerDown(idx, e)}
                style={{
                  backgroundColor: tile.bg,
                  color: tile.fg,
                  opacity: 0,
                }}
                className="group relative w-full h-full overflow-hidden border border-white/15 shadow-[0_18px_40px_rgba(0,0,0,0.65)] cursor-grab active:cursor-grabbing touch-none will-change-transform select-none"
              >
                <div className="w-full h-full p-2.5 sm:p-3 flex flex-col justify-between pointer-events-none">
                  <div className="flex items-center justify-between text-[6px] sm:text-[7px] font-mono uppercase tracking-widest opacity-65">
                    <span>WPKOI</span>
                    <span className="truncate ml-1">{tile.sub}</span>
                  </div>

                  {tile.image ? (
                    <div className="relative flex-1 my-1.5 overflow-hidden border border-black/20">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={tile.image}
                        alt={tile.title}
                        draggable={false}
                        className="w-full h-full object-cover object-top grayscale-[25%] contrast-115"
                      />
                    </div>
                  ) : (
                    <div
                      style={{ backgroundColor: tile.accent }}
                      className="flex-1 my-1.5 opacity-80 border border-black/15"
                    />
                  )}

                  <div className="font-display uppercase text-lg sm:text-2xl leading-[0.86] tracking-tight truncate">
                    {tile.title}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Radial Center Vignette so BUG ME WITH YOUR IDEA pops cleanly */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20"
            style={{
              background:
                'radial-gradient(ellipse 56% 52% at 50% 50%, rgba(12,12,12,0.96) 0%, rgba(12,12,12,0.88) 42%, rgba(12,12,12,0.48) 78%, rgba(12,12,12,0.28) 100%)',
            }}
          />

          {/* Centered Contact CTA */}
          <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center">
            <h3 className="boil-subtle font-display uppercase text-[10vw] sm:text-[6.8vw] lg:text-[5.2vw] leading-[0.88] tracking-[-0.02em] flex flex-wrap items-start justify-center gap-x-3 sm:gap-x-5">
              {/* BUG ME + Hand-Drawn White Brush Underline */}
              <span className="inline-flex flex-col">
                <span className="kinetic-blink inline-flex">
                  {bugMeChars.map((ch, i) => {
                    if (ch === ' ') {
                      return (
                        <span key={`bm-${i}`} className="inline-block w-[0.24em]">
                          &nbsp;
                        </span>
                      );
                    }
                    const refIdx = bugIdx++;
                    return (
                      <span
                        key={`bm-${i}`}
                        ref={(el) => {
                          bugCharRefs.current[refIdx] = el;
                        }}
                        style={{ opacity: 0 }}
                        className="inline-block text-[#FF2E17] drop-shadow-[0_0_24px_rgba(255,46,23,0.42)] will-change-transform"
                      >
                        {ch}
                      </span>
                    );
                  })}
                </span>

                <svg
                  ref={bugBrushRef}
                  style={{ opacity: 0 }}
                  viewBox="0 0 260 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="boil-fast w-full h-2.5 sm:h-3 mt-1 text-[#EAE6DF]/90"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 11C75 7 185 5 257 8C198 11 90 12 12 14"
                    stroke="currentColor"
                    strokeWidth="5.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>

              {/* WITH YOUR IDEA */}
              <span className="inline-flex">
                {withIdeaChars.map((ch, i) => {
                  if (ch === ' ') {
                    return (
                      <span key={`wi-${i}`} className="inline-block w-[0.24em]">
                        &nbsp;
                      </span>
                    );
                  }
                  const refIdx = bugIdx++;
                  return (
                    <span
                      key={`wi-${i}`}
                      ref={(el) => {
                        bugCharRefs.current[refIdx] = el;
                      }}
                      style={{ opacity: 0 }}
                      className="inline-block text-[#EAE6DF] drop-shadow-[0_0_20px_rgba(234,230,223,0.2)] will-change-transform"
                    >
                      {ch}
                    </span>
                  );
                })}
              </span>
            </h3>

            {/* Interactive Click-to-Copy Email Button */}
            <div
              ref={emailWrapRef}
              style={{ opacity: 0 }}
              className="pointer-events-auto mt-7 sm:mt-8 flex flex-col items-center will-change-transform"
            >
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`min-w-[225px] sm:min-w-[250px] h-[52px] sm:h-[56px] px-7 border transition-all duration-200 cursor-pointer flex items-center justify-center ${
                  copied
                    ? 'bg-[#FF2E17] border-[#FF2E17] text-[#EAE6DF] font-display text-lg sm:text-xl tracking-[0.14em] uppercase shadow-[0_0_28px_rgba(255,46,23,0.45)]'
                    : 'bg-[#121212]/85 border-white/25 hover:border-[#FF2E17] text-[#EAE6DF] font-mono text-xs sm:text-sm tracking-[0.06em]'
                }`}
              >
                {copied ? 'COPIED' : EMAIL_ADDRESS}
              </button>

              <p className="mt-4 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#8A8A8A]">
                AVAILABLE FOR SELECTED PROJECTS
              </p>
            </div>
          </div>

          {/* Bottom Corners: DRAG ME ↗ (Left) & SCROLL TO TOP (Right) */}
          <div
            ref={bottomCuesRef}
            style={{ opacity: 0 }}
            className="pointer-events-none absolute inset-x-0 bottom-7 sm:bottom-9 z-30 px-8 sm:px-12 flex items-end justify-between will-change-transform"
          >
            <div className="boil-fast font-marker text-2xl sm:text-3xl text-[#EAE6DF] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] inline-flex items-center gap-2 -rotate-2">
              <span>DRAG ME</span>
              <svg
                viewBox="0 0 38 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 sm:w-8 h-5 sm:h-6 text-[#EAE6DF]"
              >
                <path
                  d="M3 24C13 19 23 13 33 5M19 4C25 4 30 4 35 4C33 10 31 15 29 20"
                  stroke="currentColor"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <button
              type="button"
              onClick={handleScrollToTop}
              className="pointer-events-auto boil-fast font-marker text-2xl sm:text-3xl text-[#EAE6DF] hover:text-[#FF2E17] transition-colors drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] cursor-pointer rotate-1"
            >
              SCROLL TO TOP
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}