'use client';

import { useEffect, useRef, useState } from 'react';
import Loader from '@/components/Loader';
import FilmNoiseOverlay from '@/components/FilmNoiseOverlay';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import WorksSection from '@/components/WorksSection';
import AwardsSection from '@/components/AwardsSection';
import ContactSection from '@/components/ContactSection';

const trackedSections = [
  { id: 'introduce', name: 'INTRODUCE' },
  { id: 'skills', name: 'SKILLS' },
  { id: 'works', name: 'WORKS' },
  { id: 'awards', name: 'AWARDS' },
  { id: 'contact', name: 'CONTACT' },
];

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const [currentSection, setCurrentSection] = useState('INTRODUCE');
  const [sidebarPhase, setSidebarPhase] = useState<0 | 1 | 2>(0);

  // Shared 0 -> 1 ref so ContactSection dismisses HeroSection's right sidebar at 60fps
  const sidebarDismissRef = useRef(0);

  useEffect(() => {
    const updateActiveSection = () => {
      const triggerY = window.innerHeight * 0.45;
      let active = 'INTRODUCE';

      for (const sec of trackedSections) {
        const el = document.getElementById(sec.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY) {
          active = sec.name;
        }
      }

      setCurrentSection((prev) => (prev === active ? prev : active));
    };

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();

    return () => window.removeEventListener('scroll', updateActiveSection);
  }, []);

  return (
    <>
      {showLoader && <Loader onComplete={() => setShowLoader(false)} />}

      <FilmNoiseOverlay />

      <HeroSection
        currentSection={currentSection}
        // sidebarPhase={0}
        sidebarDismissRef={sidebarDismissRef}
      />

      <main className="relative bg-transparent text-[#EAE6DF] overflow-x-clip">
        {/* Left-stage sections paired with the docked Right Profile Sidebar */}
        <div className="main-content relative z-20 lg:pr-[375px] xl:pr-[405px]">
          <SkillsSection />
          <WorksSection onSidebarPhaseChange={setSidebarPhase} />
          <AwardsSection />
        </div>

        {/* Full-width 05 CONTACT: dismisses sidebar -> draggable poster wall -> BUG ME WITH YOUR IDEA */}
        <ContactSection sidebarDismissRef={sidebarDismissRef} />
      </main>
    </>
  );
}