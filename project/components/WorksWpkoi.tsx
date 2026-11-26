'use client';

import { useEffect, useRef, type MutableRefObject } from 'react';

const WPKOI_LETTERS = ['W', 'P', 'K', 'O', 'I'];
const WPKOI_TILTS = [-9, 7, -10, 8, -7];

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));
const seg = (p: number, start: number, end: number) => clamp((p - start) / (end - start));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function WorksWpkoi({
  pinPRef,
}: {
  pinPRef: MutableRefObject<number>;
}) {
  const layerRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);
  const expLineRef = useRef<SVGSVGElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const arrowRef = useRef<HTMLDivElement>(null);
  const brushRef = useRef<HTMLDivElement>(null);
  const seriousRef = useRef<HTMLSpanElement>(null);
  const builtRef = useRef<HTMLSpanElement>(null);
  const metaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const showcaseCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;

    const tick = () => {
      const p = pinPRef.current;
      const isVisible = p > 0.26;

      if (layerRef.current) {
        layerRef.current.style.visibility = isVisible ? 'visible' : 'hidden';
        layerRef.current.style.opacity = isVisible ? '1' : '0';
        layerRef.current.style.pointerEvents = p > 0.36 ? 'auto' : 'none';
      }

      if (isVisible) {
        // 1. Zero-break overlap (0.28 -> 0.36): EXPERIENCE / 2012 -> NOW arrives while 1M+ DOWNLOADS clears
        if (expRef.current) {
          const t = easeOutCubic(seg(p, 0.28, 0.36));
          expRef.current.style.opacity = String(t);
          expRef.current.style.transform = `translate3d(0, ${(1 - t) * 14}px, 0)`;
        }

        if (expLineRef.current) {
          const lt = easeOutCubic(seg(p, 0.32, 0.4));
          expLineRef.current.style.opacity = String(lt);
          expLineRef.current.style.clipPath = `inset(0 ${(1 - lt) * 100}% 0 0)`;
        }

        // 2. Giant crimson W P K O I letters arrive staggered & tilted (0.38 -> 0.54), then snap upright (0.48 -> 0.58)
        letterRefs.current.forEach((el, idx) => {
          if (!el) return;
          const start = 0.38 + idx * 0.025;
          const enterT = easeOutCubic(seg(p, start, start + 0.1));
          const alignT = easeOutCubic(seg(p, 0.48, 0.58));
          const tilt = WPKOI_TILTS[idx % WPKOI_TILTS.length] * (1 - alignT);
          const dy = (idx % 2 === 0 ? -1 : 1) * 18 * (1 - enterT);
          const dx = (idx - 2) * 10 * (1 - alignT);

          el.style.opacity = String(enterT);
          el.style.transform = `translate3d(${dx}px, ${dy}px, 0) rotate(${tilt}deg) scale(${
            0.94 + 0.06 * enterT
          })`;
        });

        // 3. Curved white arrow appears left of WPKOI (0.58 -> 0.65)
        if (arrowRef.current) {
          const t = easeOutCubic(seg(p, 0.58, 0.65));
          arrowRef.current.style.opacity = String(t);
          arrowRef.current.style.transform = `translate3d(${(1 - t) * -22}px, 0, 0)`;
        }

        // 4. Full-width hand-drawn white brush wipes left-to-right (0.61 -> 0.74)
        if (brushRef.current) {
          const t = easeOutCubic(seg(p, 0.61, 0.74));
          brushRef.current.style.opacity = String(t);
          brushRef.current.style.clipPath = `inset(0 ${(1 - t) * 100}% 0 0)`;
        }

        // 5. THIS ONE GOT SERIOUS. (0.74 -> 0.81)
        if (seriousRef.current) {
          const t = easeOutCubic(seg(p, 0.74, 0.81));
          seriousRef.current.style.opacity = String(t);
          seriousRef.current.style.transform = `translate3d(0, ${(1 - t) * 16}px, 0)`;
        }

        // 6. BUILT SOLO. USED WORLDWIDE. (0.79 -> 0.86)
        if (builtRef.current) {
          const t = easeOutCubic(seg(p, 0.79, 0.86));
          builtRef.current.style.opacity = String(t);
          builtRef.current.style.transform = `translate3d(0, ${(1 - t) * 12}px, 0)`;
        }

        // 7. FOUNDED AUG 2018 · CUSTOMERS WORLDWIDE · BUILT FOR WORDPRESS (0.80 -> 0.90)
        metaRefs.current.forEach((el, idx) => {
          if (!el) return;
          const start = 0.8 + idx * 0.025;
          const t = easeOutCubic(seg(p, start, start + 0.07));
          el.style.opacity = String(t);
          el.style.transform = `translate3d(0, ${(1 - t) * 14}px, 0)`;
        });

        // 8. Handwritten SHOWCASE ↓ (0.84 -> 0.92), holds solid through 1.00 to unpin smoothly
        if (showcaseCueRef.current) {
          const t = easeOutCubic(seg(p, 0.84, 0.92));
          showcaseCueRef.current.style.opacity = String(t);
          showcaseCueRef.current.style.transform = `translate3d(0, ${(1 - t) * 14}px, 0) rotate(-2deg)`;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [pinPRef]);

  return (
    <div
      ref={layerRef}
      style={{ opacity: 0, visibility: 'hidden' }}
      className="absolute inset-0 z-20 flex flex-col justify-between px-8 sm:px-14 py-12 sm:py-16 select-none"
    >
      {/* === TOP: EXPERIENCE / 2012 -> NOW === */}
      <div ref={expRef} style={{ opacity: 0 }} className="pt-4 will-change-transform">
        <div className="inline-flex flex-col">
          <div className="flex items-baseline gap-2.5 font-mono text-xs sm:text-sm tracking-[0.18em] uppercase text-[#9A9792]">
            <span>EXPERIENCE / 2012 →</span>
            <span className="boil-fast font-marker text-2xl sm:text-3xl text-[#FF2E17] leading-none">
              NOW
            </span>
          </div>
          <svg
            ref={expLineRef}
            style={{ opacity: 0 }}
            viewBox="0 0 260 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-1 w-full h-1.5 text-[#EAE6DF]/75"
            preserveAspectRatio="none"
          >
            <path
              d="M2 5C78 3 182 3 258 4"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* === CENTER: ARROW + GIANT WPKOI + BRUSH + THIS ONE GOT SERIOUS. === */}
      <div className="my-auto">
        <div className="flex items-center gap-4 sm:gap-6">
          <div
            ref={arrowRef}
            style={{ opacity: 0 }}
            className="boil-fast shrink-0 will-change-transform"
          >
            <svg
              viewBox="0 0 58 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 sm:w-14 h-8 sm:h-11 text-[#EAE6DF]"
            >
              <path
                d="M4 38C18 30 34 21 50 10M30 8C38 8 45 8 52 9C49 16 46 23 44 31"
                stroke="currentColor"
                strokeWidth="4.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="inline-flex flex-col">
            <h3 className="boil-subtle font-display uppercase text-[21vw] sm:text-[16.5vw] lg:text-[13.8vw] leading-[0.8] tracking-[-0.02em] text-[#FF2E17] drop-shadow-[0_0_32px_rgba(255,46,23,0.42)] flex">
              {WPKOI_LETTERS.map((ch, idx) => (
                <span
                  key={ch}
                  ref={(el) => {
                    letterRefs.current[idx] = el;
                  }}
                  style={{ opacity: 0 }}
                  className="inline-block will-change-transform"
                >
                  {ch}
                </span>
              ))}
            </h3>

            <div ref={brushRef} style={{ opacity: 0 }} className="mt-2 sm:mt-3 w-full">
              <svg
                viewBox="0 0 600 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="boil-fast w-full h-3.5 text-[#EAE6DF]/90"
                preserveAspectRatio="none"
              >
                <path
                  d="M4 13C165 8 415 6 596 10C470 14 205 16 14 18"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <span
            ref={seriousRef}
            style={{ opacity: 0 }}
            className="font-display uppercase text-3xl sm:text-5xl tracking-tight text-[#EAE6DF] will-change-transform"
          >
            THIS ONE GOT SERIOUS.
          </span>
          <span
            ref={builtRef}
            style={{ opacity: 0 }}
            className="font-mono text-xs sm:text-sm tracking-[0.16em] uppercase text-[#8A8A8A] will-change-transform"
          >
            BUILT SOLO. USED WORLDWIDE.
          </span>
        </div>
      </div>

      {/* === BOTTOM: FOUNDED / CUSTOMERS / WORDPRESS + SHOWCASE ↓ === */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-wrap items-center gap-6 sm:gap-10 font-mono text-[10px] sm:text-xs tracking-[0.14em] uppercase">
          <div
            ref={(el) => {
              metaRefs.current[0] = el;
            }}
            style={{ opacity: 0 }}
            className="leading-tight will-change-transform"
          >
            <div className="text-[#FF2E17] font-bold">FOUNDED</div>
            <div className="text-[#EAE6DF] mt-0.5">AUG 2018</div>
          </div>

          <div
            ref={(el) => {
              metaRefs.current[1] = el;
            }}
            style={{ opacity: 0 }}
            className="flex items-center gap-2.5 text-[#EAE6DF] will-change-transform"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="w-6 h-6 text-[#EAE6DF]/85 shrink-0"
            >
              <circle cx="12" cy="12" r="9.5" />
              <ellipse cx="12" cy="12" rx="4.5" ry="9.5" />
              <path d="M2.5 12h19M4.5 7.5h15M4.5 16.5h15" />
            </svg>
            <div className="leading-tight">
              <div>CUSTOMERS</div>
              <div className="text-[#9A9792]">WORLDWIDE</div>
            </div>
          </div>

          <div
            ref={(el) => {
              metaRefs.current[2] = el;
            }}
            style={{ opacity: 0 }}
            className="flex items-center gap-2.5 text-[#EAE6DF] will-change-transform"
          >
            <span className="w-6 h-6 rounded-full border-[1.6px] border-[#EAE6DF]/85 flex items-center justify-center font-serif text-xs font-bold shrink-0">
              W
            </span>
            <div className="leading-tight">
              <div>BUILT FOR</div>
              <div className="text-[#9A9792]">WORDPRESS</div>
            </div>
          </div>
        </div>

        <div
          ref={showcaseCueRef}
          style={{ opacity: 0 }}
          className="boil-fast font-marker text-3xl sm:text-4xl lg:text-[42px] text-[#9A9792] flex items-center gap-2.5 will-change-transform"
        >
          <span>SHOWCASE</span>
          <svg
            viewBox="0 0 24 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-7 text-[#9A9792]"
          >
            <path
              d="M12 3C12 12 12 21 12 30M5 22C8 25 10 28 12 31C14 28 16 25 19 22"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}