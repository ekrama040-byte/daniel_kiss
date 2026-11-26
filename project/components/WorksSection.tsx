
'use client';

import { useCallback, useEffect, useRef } from 'react';
import WorksCarousel from '@/components/WorksCarousel';
import WorksWpkoi from '@/components/WorksWpkoi';
import WorksShowcase from '@/components/WorksShowcase';

export default function WorksSection({
  onSidebarPhaseChange,
}: {
  onSidebarPhaseChange?: (phase: 0 | 1 | 2) => void;
}) {
  const wpkoiWrapRef = useRef<HTMLDivElement>(null);
  const showcaseProgressRef = useRef(0);
  const lastPhaseRef = useRef<0 | 1 | 2>(0);

  const syncSidebarPhase = useCallback(() => {
    const wpkoiEl = wpkoiWrapRef.current;
    if (!wpkoiEl) return;

    const wpkoiRect = wpkoiEl.getBoundingClientRect();
    let nextPhase: 0 | 1 | 2 = 0;

    if (showcaseProgressRef.current >= 0.16) {
      // Phase 2: Morph sidebar bio -> LINKEDIN ↗ ... + WPKOI ↗ WWWOWS ↗ at slide 02 / 05
      nextPhase = 2;
    } else if (wpkoiRect.top <= window.innerHeight * 0.55) {
      // Phase 1: Swap PORTRAIT / 01 -> 2x3 WPKoi Grid + USED WORLDWIDE in WorksWpkoi & 01 / 05
      nextPhase = 1;
    }

    if (nextPhase !== lastPhaseRef.current) {
      lastPhaseRef.current = nextPhase;
      onSidebarPhaseChange?.(nextPhase);
    }
  }, [onSidebarPhaseChange]);

  const handleShowcaseProgress = useCallback(
    (progress: number) => {
      showcaseProgressRef.current = progress;
      syncSidebarPhase();
    },
    [syncSidebarPhase]
  );

  useEffect(() => {
    window.addEventListener('scroll', syncSidebarPhase, { passive: true });
    syncSidebarPhase();
    return () => window.removeEventListener('scroll', syncSidebarPhase);
  }, [syncSidebarPhase]);

  return (
    <section id="works" className="relative" data-section-name="Works">
      {/* Part 1: MADE SOME. BROKE SOME... + Inward 3D Glitch Carousel */}
      <WorksCarousel />

      {/* Part 2: EXPERIENCE / 2012 -> NOW + Giant WPKOI + SHOWCASE ↓ */}
      <div ref={wpkoiWrapRef}>
        <WorksWpkoi />
      </div>

      {/* Part 3: IT TOOK MY TIME. + Sticky 01/05 -> 05/05 Showcase + 4-Col Experience Bar */}
      <WorksShowcase onProgressChange={handleShowcaseProgress} />
    </section>
  );
}