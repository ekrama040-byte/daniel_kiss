'use client';

import { useEffect, useRef } from 'react';

interface SkillRow {
  num: string;
  words: string[];
  tags: string[];
  offsetClass: string;
  sizeClass: string;
  driftDir: 1 | -1;
  callout?: string;
}

const skillRows: SkillRow[] = [
  {
    num: '01',
    words: ['CREATIVE', '&', 'MOTION'],
    tags: ['GSAP', 'THREE.JS', 'WEBGL', 'MOTION', 'HTML', 'CSS'],
    offsetClass: 'ml-0 sm:ml-[2%]',
    sizeClass: 'text-[11vw] sm:text-[8.2vw] lg:text-[6.2vw] xl:text-[5.8vw]',
    driftDir: -1,
  },
  {
    num: '02',
    words: ['WORDPRESS', 'DEVELOPMENT'],
    tags: ['WORDPRESS', 'THEMES', 'PLUGINS', 'ELEMENTOR', 'GUTENBERG', 'WOOCOMMERCE'],
    offsetClass: 'ml-0 sm:ml-[10%] lg:ml-[20%]',
    sizeClass: 'text-[9.2vw] sm:text-[6.6vw] lg:text-[4.6vw] xl:text-[4.4vw]',
    driftDir: 1,
  },
  {
    num: '03',
    words: ['WEB', 'DEVELOPMENT'],
    tags: ['PHP', 'JAVASCRIPT', 'NPM', 'PERFORMANCE', 'RESPONSIVE DESIGN', 'ACCESSIBILITY'],
    offsetClass: 'ml-0 sm:ml-[6%] lg:ml-[9%]',
    sizeClass: 'text-[10.5vw] sm:text-[7.8vw] lg:text-[5.8vw] xl:text-[5.5vw]',
    driftDir: -1,
  },
  {
    num: '04',
    words: ['DESIGN', '&', 'PRODUCT'],
    tags: ['UI / UX', 'WEB DESIGN', 'MOTION', 'PRODUCT DEVELOPMENT'],
    offsetClass: 'ml-0 sm:ml-[4%] lg:ml-[8%]',
    sizeClass: 'text-[10vw] sm:text-[7.4vw] lg:text-[5.2vw] xl:text-[4.9vw]',
    driftDir: 1,
    callout: 'THIS IS THE FUN PART!',
  },
];

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));

export default function SkillsSection() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wordRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const tagsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const calloutRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId = 0;

    const updateRows = () => {
      const vh = window.innerHeight || 1;

      rowRefs.current.forEach((rowEl, rowIdx) => {
        if (!rowEl) return;
        const rect = rowEl.getBoundingClientRect();
        const progress = clamp((vh * 0.92 - rect.top) / (vh * 0.45), 0, 1);

        const row = skillRows[rowIdx];
        const driftX = (1 - progress) * 24 * row.driftDir;
        rowEl.style.transform = `translate3d(${driftX}px, 0, 0)`;

        // Illuminate title words sequentially left-to-right
        const wordCount = row.words.length;
        row.words.forEach((_, wIdx) => {
          const wordEl = wordRefs.current[`${rowIdx}-${wIdx}`];
          if (!wordEl) return;
          const wordStart = (wIdx / Math.max(wordCount, 1)) * 0.35;
          const wordT = clamp((progress - wordStart) / 0.55, 0, 1);
          wordEl.style.opacity = String(0.22 + wordT * 0.78);
        });

        // Illuminate dot-separated sub-skills line
        const tagEl = tagsRefs.current[rowIdx];
        if (tagEl) {
          const tagT = clamp((progress - 0.2) / 0.55, 0, 1);
          tagEl.style.opacity = String(0.18 + tagT * 0.72);
        }

        // Reveal "THIS IS THE FUN PART! ->" beside row 04
        if (row.callout && calloutRef.current) {
          const callT = clamp((progress - 0.1) / 0.5, 0, 1);
          calloutRef.current.style.opacity = String(callT);
          calloutRef.current.style.transform = `translate3d(${(1 - callT) * -18}px, 0, 0) rotate(-2deg)`;
        }
      });

      rafId = requestAnimationFrame(updateRows);
    };

    rafId = requestAnimationFrame(updateRows);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section
      id="skills"
      className="relative py-20 sm:py-28 px-8 sm:px-14 select-none"
      data-section-name="Skills"
    >
      <div className="flex flex-col gap-20 sm:gap-28 lg:gap-32">
        {skillRows.map((row, rowIdx) => (
          <div
            key={row.num}
            ref={(el) => {
              rowRefs.current[rowIdx] = el;
            }}
            className={`group ${row.offsetClass} will-change-transform`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
              {/* Handwritten Callout on Row 04 ("THIS IS THE FUN PART! ->") */}
              {row.callout && (
                <div
                  ref={calloutRef}
                  style={{ opacity: 0 }}
                  className="inline-flex items-center gap-3 font-marker text-base sm:text-xl lg:text-[21px] tracking-wide text-[#EAE6DF] shrink-0 lg:mb-4 will-change-transform"
                >
                  <span>{row.callout}</span>
                  <svg
                    viewBox="0 0 42 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 sm:w-9 h-4 text-[#EAE6DF]"
                  >
                    <path
                      d="M2 10C12 8 25 8 38 9M31 3C34 6 37 8 39 9C36 11 33 13 30 16"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}

              <div>
                {/* Red Baseline Index Number + Giant Condensed Display Title */}
                <div className="flex items-baseline gap-2.5 sm:gap-3.5">
                  <span className="font-display text-lg sm:text-2xl lg:text-[26px] text-[#FF2E17] leading-none shrink-0">
                    {row.num}
                  </span>

                  <h3
                    className={`font-display uppercase ${row.sizeClass} leading-[0.88] tracking-[-0.015em] flex flex-wrap gap-x-[0.22em] text-[#EAE6DF]`}
                  >
                    {row.words.map((word, wIdx) => (
                      <span
                        key={`${row.num}-${word}-${wIdx}`}
                        ref={(el) => {
                          wordRefs.current[`${rowIdx}-${wIdx}`] = el;
                        }}
                        className="inline-block transition-colors duration-300 group-hover:text-white"
                      >
                        {word}
                      </span>
                    ))}
                  </h3>
                </div>

                {/* Dot-Separated Monospace Sub-Skills Line */}
                <div
                  ref={(el) => {
                    tagsRefs.current[rowIdx] = el;
                  }}
                  className="mt-3 sm:mt-4 pl-7 sm:pl-10 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[10px] sm:text-xs lg:text-[13px] tracking-[0.14em] uppercase text-[#9A9792]"
                >
                  {row.tags.map((tag, tIdx) => (
                    <span key={tag} className="inline-flex items-center gap-2.5">
                      <span className="hover:text-[#EAE6DF] transition-colors">{tag}</span>
                      {tIdx < row.tags.length - 1 && (
                        <span className="text-[#6E6E6E]">·</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}