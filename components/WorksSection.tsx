'use client';

import { useCallback, useEffect, useRef } from 'react';
import WorksCarousel from '@/components/WorksCarousel';
import WorksWpkoi from '@/components/WorksWpkoi';
import WorksShowcase from '@/components/WorksShowcase';

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));

export default function WorksSection({
  onSidebarPhaseChange,
}: {
  onSidebarPhaseChange?: (phase: 0 | 1 | 2) => void;
}) {
  const sharedStageRef = useRef<HTMLDivElement>(null);

  // Shared 60fps progress refs read by WorksCarousel (Layer 1) and WorksWpkoi (Layer 2)
  const enterPRef = useRef(0);
  const pinPRef = useRef(0);
  const showcaseProgressRef = useRef(0);
  const lastPhaseRef = useRef<0 | 1 | 2>(0);

  const syncSidebarPhase = useCallback(
    (rawPin: number, showcaseP: number) => {
      let nextPhase: 0 | 1 | 2 = 0;

      if (showcaseP >= 0.18) {
        // Phase 2: Morph circular icons + bio -> LINKEDIN ↗ ... + WPKOI ↗ WWWOWS ↗ at slide 02 / 05
        nextPhase = 2;
      } else if (rawPin >= 0.08 || showcaseP > 0) {
        // Phase 1: Swap PORTRAIT / 01 -> 2x3 WPKoi Grid + USED WORLDWIDE while MADE SOME. is still visible
        nextPhase = 1;
      }

      if (nextPhase !== lastPhaseRef.current) {
        lastPhaseRef.current = nextPhase;
        onSidebarPhaseChange?.(nextPhase);
      }
    },
    [onSidebarPhaseChange]
  );

  const handleShowcaseProgress = useCallback(
    (progress: number) => {
      showcaseProgressRef.current = progress;
      syncSidebarPhase(pinPRef.current, progress);
    },
    [syncSidebarPhase]
  );

  useEffect(() => {
    let smoothEnter = 0;
    let smoothPin = 0;
    let rafId = 0;

    const tick = () => {
      const stage = sharedStageRef.current;
      const vh = window.innerHeight || 1;

      if (stage) {
        const rect = stage.getBoundingClientRect();

        // enterP: 0 -> 1 while the stage approaches top: 0 underneath 04 DESIGN & PRODUCT
        const rawEnter = clamp((vh * 0.9 - rect.top) / (vh * 0.9), 0, 1);

        // pinP: 0 -> 1 across the locked 280vh sticky travel (Carousel hold -> In-place morph -> WPKOI build)
        const pinSpan = Math.max(stage.offsetHeight - vh, 1);
        const rawPin = clamp(-rect.top / pinSpan, 0, 1);

        smoothEnter += (rawEnter - smoothEnter) * 0.16;
        if (Math.abs(rawEnter - smoothEnter) < 0.0004) smoothEnter = rawEnter;

        smoothPin += (rawPin - smoothPin) * 0.14;
        if (Math.abs(rawPin - smoothPin) < 0.0004) smoothPin = rawPin;

        enterPRef.current = smoothEnter;
        pinPRef.current = smoothPin;

        syncSidebarPhase(rawPin, showcaseProgressRef.current);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [syncSidebarPhase]);

  return (
    <section id="works" className="relative" data-section-name="Works">
      {/* === SHARED STICKY STAGE: Part 1 (Carousel) cross-morphs IN PLACE into Part 2 (WPKOI) === */}
      <div ref={sharedStageRef} className="relative h-[380vh] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <WorksCarousel enterPRef={enterPRef} pinPRef={pinPRef} />
          <WorksWpkoi pinPRef={pinPRef} />
        </div>
      </div>

      {/* === PART 3: Rises directly beneath WPKOI as the stage unpins, then pins 01/05 -> 05/05 === */}
      <WorksShowcase onProgressChange={handleShowcaseProgress} />
    </section>
  );
}