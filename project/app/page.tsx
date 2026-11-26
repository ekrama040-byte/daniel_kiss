'use client';

import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import WorksSection from '@/components/WorksSection';
import AwardsSection from '@/components/AwardsSection';
import FilmNoiseOverlay from '@/components/FilmNoiseOverlay';
import Reveal from '@/components/Reveal';

const socialLinks = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/danielkiss-web-development/' },
  { label: 'WordPress', url: 'https://profiles.wordpress.org/wpkoithemes/' },
  { label: 'Behance', url: 'https://www.behance.net/wpkoi' },
];

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

  // Lightweight scroll spy to keep the docked right sidebar synced
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
      {/* Curtain Loader mounts ABOVE the live Hero and slides straight up at 100% */}
      {showLoader && <Loader onComplete={() => setShowLoader(false)} />}
    
      {/* 01 INTRODUCE (Hero Stage 1 -> Stage 2 + Docked Right Sidebar + Fixed WebGL Background) */}
          <HeroSection currentSection={currentSection} sidebarPhase={sidebarPhase} />
             <FilmNoiseOverlay />
<main className="relative bg-transparent text-[#EAE6DF] overflow-x-clip">
  <div className="main-content relative z-20 lg:pr-[375px] xl:pr-[405px]">
    <SkillsSection />
    <WorksSection onSidebarPhaseChange={setSidebarPhase} />
    <AwardsSection />

          {/* === 05 CONTACT === */}
          <section
            id="contact"
            className="relative py-24 sm:py-36 px-8 sm:px-14 border-t border-white/15"
            data-section-name="Contact"
          >
            <div className="max-w-4xl">
              <Reveal>
                <p className="font-mono text-xs text-[#8A8A8A] tracking-[0.2em] uppercase mb-4">
                  <span className="text-[#FF2E17] font-bold">05 /</span> SO… WOULD YOU MAKE SOMETHING WEIRD TOGETHER?
                </p>
                <h2 className="font-display uppercase text-5xl sm:text-7xl md:text-8xl tracking-tight mb-8">
                  Bug Me With Your Idea
                </h2>
                <a
                  href="mailto:info@danielkiss.hu"
                  className="inline-flex items-center gap-3 font-display text-xl uppercase tracking-wider border border-white/30 px-8 py-4 hover:bg-[#FF2E17] hover:border-[#FF2E17] hover:text-white transition-colors"
                >
                  Drag me →
                </a>
              </Reveal>

              <Reveal className="mt-16" delay={0.2}>
                <div className="flex flex-wrap items-center gap-6">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display text-sm uppercase tracking-wider text-[#8A8A8A] hover:text-[#FF2E17] transition-colors inline-flex items-center gap-1"
                    >
                      {link.label} <span>↗</span>
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          {/* === FOOTER === */}
          <footer
            className="relative py-8 px-8 sm:px-14 border-t border-white/15"
            data-section-name="Footer"
          >
            <div className="max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#8A8A8A]">
              <div className="tracking-widest uppercase">DANIEL KISS</div>
              <div className="tracking-widest">© 2026 — KEEP DIGGING</div>
              <div className="tracking-widest uppercase">KEEP MISBEHAVING ↗</div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}