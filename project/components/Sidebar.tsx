'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const sidebarImages = [
  'https://danielkiss.hu/img/sidebar-1.webp',
  'https://danielkiss.hu/img/sidebar-2.webp',
  'https://danielkiss.hu/img/sidebar-3.webp',
  'https://danielkiss.hu/img/sidebar-4.webp',
  'https://danielkiss.hu/img/sidebar-5.webp',
  'https://danielkiss.hu/img/sidebar-6.webp',
];

const navItems = [
  { label: 'Introduce', target: 'Introduce' },
  { label: 'Make', target: 'Make' },
  { label: 'Stats', target: 'Stats' },
  { label: 'Skills', target: 'Skills' },
  { label: 'WPKoi', target: 'WPKoi' },
  { label: 'Experience', target: 'Experience' },
  { label: 'Awards', target: 'Awards' },
  { label: 'Contact', target: 'Contact' },
];

const SIDEBAR_WIDTH = 280;

export default function Sidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('Introduce');
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      const sections = document.querySelectorAll('[data-section-name]');

      const onScroll = () => {
        let current = 'Introduce';
        const viewportCenter = window.innerHeight / 2;
        sections.forEach((s) => {
          const rect = s.getBoundingClientRect();
          if (rect.top < viewportCenter && rect.bottom > 0) {
            current = s.getAttribute('data-section-name') || current;
          }
        });
        setActiveSection(current);

        const idx = navItems.findIndex((n) => n.target === current);
        if (idx >= 0 && idx < sidebarImages.length) {
          setCurrentImage(idx % sidebarImages.length);
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      const heroSection = document.querySelector('.hero-section');
      const mainContent = document.querySelector('.main-content');
      if (!heroSection || !mainContent || !sidebarRef.current) return;

      const triggers: ScrollTrigger[] = [];

      if (prefersReducedMotion) {
        // In reduced-motion mode, sidebar is always visible on desktop
        const isDesktop = window.innerWidth >= 1024;
        gsap.set(sidebarRef.current, { xPercent: 0, opacity: 1 });
        if (isDesktop) {
          gsap.set(mainContent, { marginLeft: SIDEBAR_WIDTH });
        }
        return;
      }

      // Animate sidebar sliding in as hero scrolls past
      gsap.set(sidebarRef.current, { xPercent: -100, opacity: 0 });

      const sidebarST = ScrollTrigger.create({
        trigger: heroSection,
        start: 'bottom 90%',
        end: 'bottom 40%',
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(sidebarRef.current, {
            xPercent: -100 + p * 100,
            opacity: p,
          });
          const isDesktop = window.innerWidth >= 1024;
          if (isDesktop) {
            gsap.set(mainContent, { marginLeft: p * SIDEBAR_WIDTH });
          }
        },
        onEnter: () => {
          gsap.set(sidebarRef.current, { xPercent: 0, opacity: 1 });
          const isDesktop = window.innerWidth >= 1024;
          if (isDesktop) {
            gsap.set(mainContent, { marginLeft: SIDEBAR_WIDTH });
          }
        },
        onLeave: () => {
          gsap.set(sidebarRef.current, { xPercent: 0, opacity: 1 });
          const isDesktop = window.innerWidth >= 1024;
          if (isDesktop) {
            gsap.set(mainContent, { marginLeft: SIDEBAR_WIDTH });
          }
        },
        onLeaveBack: () => {
          gsap.set(sidebarRef.current, { xPercent: -100, opacity: 0 });
          gsap.set(mainContent, { marginLeft: 0 });
        },
      });
      triggers.push(sidebarST);

      // Handle resize: recalculate margin if crossing the desktop breakpoint
      const onResize = () => {
        const isDesktop = window.innerWidth >= 1024;
        const st = sidebarST;
        if (!isDesktop) {
          gsap.set(mainContent, { marginLeft: 0 });
        } else {
          // Re-apply based on current scroll position
          const heroRect = (heroSection as HTMLElement).getBoundingClientRect();
          const heroBottom = heroRect.bottom;
          if (heroBottom <= 0) {
            gsap.set(mainContent, { marginLeft: SIDEBAR_WIDTH });
          } else if (heroBottom < window.innerHeight) {
            const progress = 1 - heroBottom / (window.innerHeight * 0.5);
            gsap.set(mainContent, { marginLeft: Math.max(0, progress) * SIDEBAR_WIDTH });
          }
        }
        st.refresh();
      };
      window.addEventListener('resize', onResize);

      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
        triggers.forEach((t) => t.kill());
      };
    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = (target: string) => {
    const el = document.querySelector(`[data-section-name="${target}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside
      ref={sidebarRef}
      className="sidebar-container fixed top-0 left-0 z-[80] h-screen w-[280px] hidden lg:flex flex-col border-r border-border/50 bg-background/95 backdrop-blur-sm"
    >
      {/* Portrait image — cross-fades between sidebar images */}
      <div className="relative w-full aspect-[4/5] overflow-hidden border-b border-border/50 bg-secondary">
        {sidebarImages.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt="Daniel Kiss"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: currentImage === i ? 0.85 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 pointer-events-none" />
        <div className="absolute bottom-3 left-3 text-[10px] tracking-widest uppercase text-foreground/70">
          Daniel Kiss
        </div>
      </div>

      {/* Navigation list */}
      <nav className="flex-1 flex flex-col py-3 overflow-y-auto">
        {navItems.map((item, i) => (
          <button
            key={item.target}
            onClick={() => scrollToSection(item.target)}
            className={`nav-item-hover group flex items-center gap-3 px-5 py-2.5 text-xs tracking-widest uppercase transition-all duration-300 ${
              activeSection === item.target
                ? 'text-foreground bg-secondary/50'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'
            }`}
            data-bg-video={i % 6}
          >
            <span className="tabular-nums text-[10px] opacity-50">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              {item.label}
            </span>
            {activeSection === item.target && (
              <span className="ml-auto text-foreground text-[8px]">●</span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer links */}
      <div className="border-t border-border/50 p-4 flex flex-col gap-2 text-[10px] tracking-widest uppercase text-muted-foreground">
        <a
          href="https://www.linkedin.com/in/danielkiss-web-development/"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-item-hover hover:text-foreground transition-colors duration-300"
          data-bg-video="5"
        >
          LinkedIn ↗
        </a>
        <a
          href="https://wpkoi.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-item-hover hover:text-foreground transition-colors duration-300"
          data-bg-video="4"
        >
          WPKoi ↗
        </a>
        <a
          href="https://www.behance.net/wpkoi"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-item-hover hover:text-foreground transition-colors duration-300"
          data-bg-video="3"
        >
          Behance ↗
        </a>
      </div>
    </aside>
  );
}
