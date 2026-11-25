'use client';

import { useEffect, useState } from 'react';

export default function NavigationBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`nav-bar fixed top-0 left-0 right-0 z-[90] flex items-center justify-between px-4 sm:px-6 py-4 text-xs sm:text-sm tracking-widest uppercase font-mono-display transition-all duration-500 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-sm border-b border-border/30'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {/* Left: Name/logo */}
      <button
        onClick={scrollToTop}
        className="nav-item-hover text-foreground hover:opacity-60 transition-opacity duration-300"
        data-bg-video="0"
      >
        Daniel Kiss
      </button>

      {/* Right: spinning arrow + LinkedIn */}
      <div className="flex items-center gap-4 sm:gap-6">
        <a
          href="https://www.linkedin.com/in/danielkiss-web-development/"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-item-hover text-muted-foreground hover:text-foreground transition-colors duration-300 hidden sm:inline"
          data-bg-video="5"
        >
          LinkedIn ↗
        </a>
        <span className="text-muted-foreground animate-spin spin-slow text-sm">
          ▲
        </span>
      </div>
    </nav>
  );
}
