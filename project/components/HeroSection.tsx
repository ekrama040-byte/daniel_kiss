'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('@/components/HeroScene'), { ssr: false });

const FALLBACK_PORTRAIT =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#01X';
const TAGLINE_WORDS = ['WEBGL', 'CHAOS', 'WEIRD'];

const navItems = [
  { num: '01', label: 'INTRODUCE', href: '#introduce' },
  { num: '02', label: 'SKILLS', href: '#skills' },
  { num: '03', label: 'WORKS', href: '#works' },
  { num: '04', label: 'AWARDS', href: '#awards' },
  { num: '05', label: 'CONTACT', href: '#contact' },
];

// Order for sequential step-by-step word blinking on Page 1
const BLINK_SEQUENCE = [
  'TAGLINE',
  'INTRODUCE',
  'SKILLS',
  'WORKS',
  'AWARDS',
  'CONTACT',
  'MISBEHAVE',
  'KEEP DIGGING',
] as const;

const horizontalTicks = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300];
const verticalOffsets = [60, 160, 260, 360, 460, 560];
const CHAR_TILTS = [-14, 10, -8, 12, -11, 7, -13, 9, -7, 13, -6, 8, -12, 7, -9, 11, -13, 8, -6, 10];

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));
const seg = (p: number, start: number, end: number) => clamp((p - start) / (end - start));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function BlinkWord({
  text,
  active,
  className = '',
}: {
  text: string;
  active: boolean;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    setDisplay(text);
  }, [text]);

  useEffect(() => {
    if (!active) return;
    setGlitching(true);
    let step = 0;
    const totalSteps = 6;

    const timer = window.setInterval(() => {
      step += 1;
      if (step >= totalSteps) {
        window.clearInterval(timer);
        setDisplay(text);
        setGlitching(false);
        return;
      }
      setDisplay(
        text
          .split('')
          .map((ch) => {
            if (ch === ' ' || ch === '/') return ch;
            return Math.random() < 0.45
              ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
              : ch;
          })
          .join('')
      );
    }, 38);

    return () => window.clearInterval(timer);
  }, [active, text]);

  return (
    <span className={`inline-block ${glitching ? 'glitch-active' : ''} ${className}`}>
      {display}
    </span>
  );
}

interface RectDelta {
  x: number;
  y: number;
  scale: number;
}

export default function HeroSection({
  currentSection = 'INTRODUCE',
}: {
  currentSection?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Static origin anchors (never transformed) + flying elements
  const nameOriginRef = useRef<HTMLDivElement>(null);
  const flyingNameRef = useRef<HTMLHeadingElement>(null);

  const codeOriginRef = useRef<HTMLDivElement>(null);
  const flyingCodeRef = useRef<HTMLDivElement>(null);

  const navOriginRef = useRef<HTMLDivElement>(null);
  const flyingNavRef = useRef<HTMLElement>(null);

  const portraitOriginRef = useRef<HTMLDivElement>(null);
  const flyingPortraitRef = useRef<HTMLDivElement>(null);

  // Stage 1-only decorative layers that fade away when walking begins
  const stage1TopMetaRef = useRef<HTMLDivElement>(null);
  const stage1MisbehaveRef = useRef<HTMLDivElement>(null);
  const stage1BottomBarRef = useRef<HTMLDivElement>(null);

  // Fixed Right Sidebar shell + crisp docked targets
  const sidebarShellRef = useRef<HTMLElement>(null);
  const targetNameRef = useRef<HTMLDivElement>(null);
  const targetCodeRef = useRef<HTMLDivElement>(null);
  const targetNavRef = useRef<HTMLDivElement>(null);
  const targetPortraitRef = useRef<HTMLDivElement>(null);
  const sidebarDetailRefs = useRef<(HTMLElement | null)[]>([]);

  // Stage 2 Left Content refs (strictly hidden at scroll = 0)
  const stage2ContainerRef = useRef<HTMLDivElement>(null);
  const scatterCharRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const stage2BrushRef = useRef<HTMLDivElement>(null);
  const stage2NoteRef = useRef<HTMLParagraphElement>(null);
  const stage2StatRefs = useRef<(HTMLElement | null)[]>([]);

  // Direct DOM refs for 60fps rulers & telemetry
  const xArrowRef = useRef<HTMLSpanElement>(null);
  const yArrowRef = useRef<HTMLSpanElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);
  const leftTickRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mousePos = useRef({ x: 760, y: 361 });

  const [activeNav, setActiveNav] = useState(currentSection);
  const [lang, setLang] = useState<'HU' | 'EN'>('HU');
  const [blinkStep, setBlinkStep] = useState(0);
  const [taglineIdx, setTaglineIdx] = useState(0);

  useEffect(() => {
    setActiveNav(currentSection);
  }, [currentSection]);

  // Step-by-step word blinking loop (one word glitches every ~1.1s in sequence)
  useEffect(() => {
    const id = window.setInterval(() => {
      setBlinkStep((prev) => {
        const next = (prev + 1) % BLINK_SEQUENCE.length;
        if (next === 0) {
          setTaglineIdx((i) => (i + 1) % TAGLINE_WORDS.length);
        }
        return next;
      });
    }, 1100);
    return () => window.clearInterval(id);
  }, []);

  // Deterministic 60fps Scroll Morph + Telemetry Loop (ZERO GSAP ScrollTrigger conflicts)
  useEffect(() => {
    const deltas: {
      name: RectDelta;
      code: RectDelta;
      nav: RectDelta;
      portrait: RectDelta;
    } = {
      name: { x: 0, y: 0, scale: 1 },
      code: { x: 0, y: 0, scale: 1 },
      nav: { x: 0, y: 0, scale: 1 },
      portrait: { x: 0, y: 0, scale: 1 },
    };

    const computeDelta = (
      fromEl: HTMLElement | null,
      toEl: HTMLElement | null
    ): RectDelta => {
      if (!fromEl || !toEl) return { x: 0, y: 0, scale: 1 };
      const r1 = fromEl.getBoundingClientRect();
      const r2 = toEl.getBoundingClientRect();
      if (r1.width === 0 || r2.width === 0) return { x: 0, y: 0, scale: 1 };
      return {
        x: r2.left - r1.left,
        y: r2.top - r1.top,
        scale: r2.width / r1.width,
      };
    };

    const measureAll = () => {
      deltas.name = computeDelta(nameOriginRef.current, targetNameRef.current);
      deltas.code = computeDelta(codeOriginRef.current, targetCodeRef.current);
      deltas.nav = computeDelta(navOriginRef.current, targetNavRef.current);
      deltas.portrait = computeDelta(portraitOriginRef.current, targetPortraitRef.current);
    };

    measureAll();
    const remeasureTimer = window.setTimeout(measureAll, 300);
    window.addEventListener('resize', measureAll);

    let smoothP = 0;
    let rafId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const cx = Math.round(e.clientX);
      const cy = Math.round(e.clientY);
      mousePos.current = { x: cx, y: cy };
      if (xArrowRef.current) {
        xArrowRef.current.style.transform = `translate3d(${Math.max(16, cx - 16)}px, 0, 0)`;
      }
      if (yArrowRef.current) {
        yArrowRef.current.style.transform = `translate3d(0, ${Math.max(16, cy - 16)}px, 0)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const applyVisualState = (p: number, rawY: number) => {
      const isDesktop = window.innerWidth >= 1024;

      // 1. Live Rulers & Right-Edge Telemetry
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const pct = Math.max(1, Math.min(100, Math.round((rawY / maxScroll) * 100) || 1));
      if (telemetryRef.current) {
        const xStr = String(mousePos.current.x).padStart(4, '0');
        const yStr = String(mousePos.current.y).padStart(4, '0');
        const pStr = String(pct).padStart(3, '0');
        const badge = pct > 5 ? '   14+ YEARS / WEB   ' : '   ';
        telemetryRef.current.textContent = `X:${xStr}  Y:${yStr}  P:${pStr}%${badge}S:${activeNav}`;
      }
      leftTickRefs.current.forEach((el, idx) => {
        if (el) el.textContent = String(Math.round(rawY) + verticalOffsets[idx]);
      });

      // 2. Stage 1 Decorative Prompts (fade out cleanly as walking starts: 0.00 -> 0.16)
      const decFade = 1 - easeOutCubic(seg(p, 0.0, 0.16));
      [stage1TopMetaRef.current, stage1MisbehaveRef.current, stage1BottomBarRef.current].forEach(
        (el) => {
          if (!el) return;
          el.style.opacity = String(decFade);
          el.style.visibility = decFade > 0.01 ? 'visible' : 'hidden';
          el.style.transform = `translate3d(0, ${(1 - decFade) * 14}px, 0)`;
        }
      );

      // 3. Flying Page 1 Elements Walking into Right Sidebar (0.00 -> 0.50)
      const walkT = easeInOutCubic(seg(p, 0.0, 0.5));
      const handoffDone = p >= 0.5;
      const flyingAlpha = handoffDone ? 0 : 1 - seg(p, 0.45, 0.5);
      const dockedAlpha = seg(p, 0.44, 0.5);

      if (flyingNameRef.current) {
        if (isDesktop) {
          const x = deltas.name.x * walkT;
          const y = deltas.name.y * walkT;
          const sc = 1 + (deltas.name.scale - 1) * walkT;
          flyingNameRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${sc})`;
        } else {
          flyingNameRef.current.style.transform = `translate3d(${-walkT * 60}px, 0, 0)`;
        }
        flyingNameRef.current.style.opacity = String(flyingAlpha);
        flyingNameRef.current.style.visibility = flyingAlpha > 0.01 ? 'visible' : 'hidden';
      }

      if (flyingCodeRef.current) {
        if (isDesktop) {
          const x = deltas.code.x * walkT;
          const y = deltas.code.y * walkT;
          const sc = 1 + (deltas.code.scale - 1) * walkT;
          flyingCodeRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${sc})`;
        }
        flyingCodeRef.current.style.opacity = String(flyingAlpha);
        flyingCodeRef.current.style.visibility = flyingAlpha > 0.01 ? 'visible' : 'hidden';
      }

      if (flyingNavRef.current) {
        const navWalk = easeInOutCubic(seg(p, 0.0, 0.42));
        const navAlpha = 1 - seg(p, 0.28, 0.44);
        if (isDesktop) {
          const x = deltas.nav.x * navWalk;
          const y = deltas.nav.y * navWalk;
          const sc = 1 - 0.18 * navWalk;
          flyingNavRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${sc})`;
        }
        flyingNavRef.current.style.opacity = String(navAlpha);
        flyingNavRef.current.style.visibility = navAlpha > 0.01 ? 'visible' : 'hidden';
      }

      if (flyingPortraitRef.current) {
        if (isDesktop) {
          const x = deltas.portrait.x * walkT;
          const y = deltas.portrait.y * walkT;
          const sc = 1 + (deltas.portrait.scale - 1) * walkT;
          flyingPortraitRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${sc})`;
        }
        flyingPortraitRef.current.style.opacity = String(flyingAlpha);
        flyingPortraitRef.current.style.visibility = flyingAlpha > 0.01 ? 'visible' : 'hidden';
      }

      // 4. Right Profile Sidebar Shell & Docked Elements (stays permanently docked once p >= 0.50)
      const shellAlpha = easeOutCubic(seg(p, 0.14, 0.46));
      if (sidebarShellRef.current) {
        sidebarShellRef.current.style.opacity = String(shellAlpha);
        sidebarShellRef.current.style.visibility = shellAlpha > 0.01 ? 'visible' : 'hidden';
      }

      [targetNameRef.current, targetCodeRef.current, targetPortraitRef.current].forEach((el) => {
        if (!el) return;
        el.style.opacity = String(dockedAlpha);
        el.style.visibility = dockedAlpha > 0.01 ? 'visible' : 'hidden';
      });

      if (targetNavRef.current) {
        const compactNavAlpha = easeOutCubic(seg(p, 0.34, 0.52));
        targetNavRef.current.style.opacity = String(compactNavAlpha);
        targetNavRef.current.style.visibility = compactNavAlpha > 0.01 ? 'visible' : 'hidden';
        targetNavRef.current.style.transform = `translate3d(0, ${(1 - compactNavAlpha) * -10}px, 0)`;
      }

      sidebarDetailRefs.current.forEach((el, idx) => {
        if (!el) return;
        const start = 0.28 + idx * 0.05;
        const t = easeOutCubic(seg(p, start, start + 0.18));
        el.style.opacity = String(t);
        el.style.visibility = t > 0.01 ? 'visible' : 'hidden';
        el.style.transform = `translate3d(0, ${(1 - t) * 12}px, 0)`;
      });

      // 5. Stage 2 Left Content (STRICTLY invisible at p < 0.14, builds letter-by-letter as Stage 1 walks right)
      const stage2Visible = p > 0.14;
      if (stage2ContainerRef.current) {
        const exitT = seg(p, 0.86, 1.0);
        stage2ContainerRef.current.style.visibility = stage2Visible ? 'visible' : 'hidden';
        stage2ContainerRef.current.style.opacity = stage2Visible ? String(1 - exitT) : '0';
        stage2ContainerRef.current.style.transform = `translate3d(0, ${-exitT * 120}px, 0)`;
      }

      // Scattered characters of "MAKE IT WORK," + "THEN MAKE IT WEIRD..." assemble sequentially
      const totalChars = scatterCharRefs.current.length;
      scatterCharRefs.current.forEach((el, idx) => {
        if (!el) return;
        if (!stage2Visible) {
          el.style.opacity = '0';
          el.style.visibility = 'hidden';
          return;
        }
        const charStart = 0.16 + (idx / Math.max(totalChars, 1)) * 0.28;
        const t = easeOutCubic(seg(p, charStart, charStart + 0.16));
        const tilt = CHAR_TILTS[idx % CHAR_TILTS.length];
        const dy = (idx % 2 === 0 ? -1 : 1) * (18 + (idx % 4) * 5);
        el.style.opacity = String(t);
        el.style.visibility = t > 0.01 ? 'visible' : 'hidden';
        el.style.transform = `translate3d(0, ${dy * (1 - t)}px, 0) rotate(${tilt * (1 - t)}deg) scale(${
          1 + 0.15 * (1 - t)
        })`;
      });

      // White brush sweeps across left-to-right (0.46 -> 0.58)
      if (stage2BrushRef.current) {
        const bt = easeOutCubic(seg(p, 0.46, 0.58));
        stage2BrushRef.current.style.opacity = String(bt);
        stage2BrushRef.current.style.visibility = bt > 0.01 ? 'visible' : 'hidden';
        stage2BrushRef.current.style.clipPath = `inset(0 ${(1 - bt) * 100}% 0 0)`;
      }

      // WordPress tagline appears (0.52 -> 0.62)
      if (stage2NoteRef.current) {
        const nt = easeOutCubic(seg(p, 0.52, 0.62));
        stage2NoteRef.current.style.opacity = String(nt);
        stage2NoteRef.current.style.visibility = nt > 0.01 ? 'visible' : 'hidden';
        stage2NoteRef.current.style.transform = `translate3d(0, ${(1 - nt) * 16}px, 0)`;
      }

      // Stats (↗, 14+, 500+, 200+) appear one by one (0.58 -> 0.78)
      stage2StatRefs.current.forEach((el, idx) => {
        if (!el) return;
        const start = 0.58 + idx * 0.045;
        const st = easeOutCubic(seg(p, start, start + 0.14));
        el.style.opacity = String(st);
        el.style.visibility = st > 0.01 ? 'visible' : 'hidden';
        el.style.transform = `translate3d(0, ${(1 - st) * 22}px, 0)`;
      });
    };

    const tick = () => {
      const wrapper = wrapperRef.current;
      const rawY = window.scrollY;
      let targetP = 0;

      if (wrapper) {
        const scrollSpan = Math.max(wrapper.offsetHeight - window.innerHeight, 1);
        targetP = clamp((rawY - wrapper.offsetTop) / scrollSpan, 0, 1);
      }

      // Smooth lerp toward actual scroll position (snaps cleanly at 0 and 1)
      smoothP += (targetP - smoothP) * 0.16;
      if (Math.abs(targetP - smoothP) < 0.0005) smoothP = targetP;

      applyVisualState(smoothP, rawY);
      rafId = requestAnimationFrame(tick);
    };

    applyVisualState(0, window.scrollY);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(remeasureTimer);
      window.removeEventListener('resize', measureAll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [activeNav]);

  const handleKeepDigging = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!wrapperRef.current) return;
    const scrollSpan = wrapperRef.current.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: wrapperRef.current.offsetTop + scrollSpan * 0.78,
      behavior: 'smooth',
    });
  };

  const currentBlinkTarget = BLINK_SEQUENCE[blinkStep];
  const currentTaglineWord = TAGLINE_WORDS[taglineIdx];

  // Prepare split characters for Stage 2 headline
  const line1Chars = 'MAKE IT WORK,'.split('');
  const line2Chars = 'THEN MAKE IT WEIRD...'.split('');
  let charCounter = 0;

  return (
    <>
      {/* === PERSISTENT FULLSCREEN WEBGL HALFTONE VIDEO BACKGROUND === */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {/* === PERSISTENT OUTER BLUEPRINT FRAME & LIVE RULERS === */}
      <div className="pointer-events-none fixed inset-3 sm:inset-4 border border-white/15 z-50">
        <span className="absolute -top-[9px] -left-[5px] text-white/40 text-xs font-mono">+</span>
        <span className="absolute -top-[9px] -right-[5px] text-white/40 text-xs font-mono">+</span>
        <span className="absolute -bottom-[9px] -left-[5px] text-white/40 text-xs font-mono">+</span>
        <span className="absolute -bottom-[9px] -right-[5px] text-white/40 text-xs font-mono">+</span>

        <div className="hidden md:block absolute -top-3.5 left-0 right-0 h-3 text-[9px] font-mono text-white/30">
          {horizontalTicks.map((tick) => (
            <span
              key={tick}
              style={{ left: `${tick}px` }}
              className="absolute -translate-x-1/2"
            >
              {tick}
            </span>
          ))}
          <span
            ref={xArrowRef}
            style={{ transform: 'translate3d(744px, 0, 0)' }}
            className="absolute left-0 top-[11px] -translate-x-1/2 text-[#FF2E17] text-[8px] leading-none will-change-transform"
          >
            ▲
          </span>
        </div>

        <div className="hidden md:block absolute top-0 bottom-0 -left-3.5 w-3 text-[9px] font-mono text-white/30">
          {verticalOffsets.map((offset, idx) => (
            <span
              key={offset}
              ref={(el) => {
                leftTickRefs.current[idx] = el;
              }}
              style={{ top: `${offset}px` }}
              className="absolute -translate-y-1/2 -rotate-90 origin-center"
            >
              {offset}
            </span>
          ))}
          <span
            ref={yArrowRef}
            style={{ transform: 'translate3d(0, 345px, 0)' }}
            className="absolute top-0 left-[11px] -translate-y-1/2 text-[#FF2E17] text-[8px] leading-none will-change-transform"
          >
            ▶
          </span>
        </div>

        <div
          ref={telemetryRef}
          className="hidden sm:block absolute right-[-96px] bottom-36 rotate-90 origin-center text-[10px] font-mono tracking-[0.14em] text-white/60 uppercase whitespace-nowrap"
        >
          X:0760  Y:0361  P:001%  S:INTRODUCE
        </div>
      </div>

      {/* === PERSISTENT RIGHT PROFILE SIDEBAR (Strictly hidden at scroll=0, docks cleanly) === */}
      <aside
        ref={sidebarShellRef}
        aria-label="Profile Sidebar"
        style={{ opacity: 0, visibility: 'hidden' }}
        className="hidden lg:flex fixed top-4 bottom-4 right-4 w-[345px] xl:w-[375px] z-30 border-l border-white/15 bg-[#0D0D0D]/80 backdrop-blur-[3px] flex-col justify-between px-6 py-6 text-[#EAE6DF]"
      >
        <div>
          {/* Crisp Docked Name */}
          <div
            ref={targetNameRef}
            style={{ opacity: 0, visibility: 'hidden' }}
            className="w-fit font-display text-[42px] xl:text-[46px] leading-[0.88] tracking-tight uppercase"
          >
            <span className="text-[#EAE6DF]">DANIEL </span>
            <span className="text-[#FF2E17]">KISS</span>
          </div>

          {/* Crisp Docked Subtitle */}
          <div
            ref={targetCodeRef}
            style={{ opacity: 0, visibility: 'hidden' }}
            className="mt-2 w-fit font-display text-sm xl:text-base tracking-wider uppercase text-[#EAE6DF]"
          >
            CODE / MOTION / {currentTaglineWord}
          </div>

          {/* 5 Circular Social Icons */}
          <div
            ref={(el) => {
              sidebarDetailRefs.current[0] = el;
            }}
            style={{ opacity: 0, visibility: 'hidden' }}
            className="mt-4 flex items-center gap-2.5"
          >
            {[
              { label: 'in', href: 'https://www.linkedin.com/in/danielkiss-web-development/' },
              { label: 'W', href: 'https://profiles.wordpress.org/wpkoithemes/' },
              { label: 'Bē', href: 'https://www.behance.net/wpkoi' },
              { label: '◎', href: 'https://dribbble.com' },
              { label: 'P', href: 'https://pinterest.com' },
            ].map((soc) => (
              <a
                key={soc.label}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-[#EAE6DF] text-[#0D0D0D] hover:bg-[#FF2E17] hover:text-white transition-colors flex items-center justify-center text-xs font-bold"
              >
                {soc.label}
              </a>
            ))}
          </div>

          {/* Bio */}
          <p
            ref={(el) => {
              sidebarDetailRefs.current[1] = el;
            }}
            style={{ opacity: 0, visibility: 'hidden' }}
            className="mt-3.5 text-[11px] xl:text-xs text-[#A09D98] leading-relaxed"
          >
            Frontend Developer | WordPress Developer
            <br />
            JavaScript, PHP, WebGL, GSAP, Three.js
          </p>

          {/* Location Meta */}
          <div
            ref={(el) => {
              sidebarDetailRefs.current[2] = el;
            }}
            style={{ opacity: 0, visibility: 'hidden' }}
            className="mt-3 flex items-center gap-3 text-[9px] xl:text-[10px] font-mono tracking-wider uppercase text-[#EAE6DF]/85"
          >
            <span className="inline-flex items-center gap-1">
              <span className="text-[#FF2E17]">●</span> BASED IN HUNGARY
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="text-[#FF2E17]">⊕</span> WORKING WORLDWIDE
            </span>
          </div>

          {/* 2-Row Compact Navigation Grid */}
          <div
            ref={targetNavRef}
            style={{ opacity: 0, visibility: 'hidden' }}
            className="mt-4 pt-3 border-t border-white/10"
          >
            <nav className="grid grid-cols-3 gap-y-1.5 gap-x-2">
              {navItems.map((item) => {
                const isCurrent = activeNav === item.label;
                return (
                  <a
                    key={item.num}
                    href={item.href}
                    onMouseEnter={() => setActiveNav(item.label)}
                    onMouseLeave={() => setActiveNav(currentSection)}
                    className={`font-display text-sm xl:text-base tracking-wide uppercase transition-colors inline-flex items-baseline gap-1 ${
                      isCurrent ? 'text-[#FF2E17]' : 'text-[#EAE6DF] hover:text-[#FF2E17]'
                    }`}
                  >
                    <span className={`text-[11px] ${isCurrent ? 'text-[#FF2E17]' : 'text-[#6E6E6E]'}`}>
                      {item.num}
                    </span>
                    <span>{item.label}</span>
                  </a>
                );
              })}
              <div>
                <button
                  type="button"
                  onClick={() => setLang((prev) => (prev === 'HU' ? 'EN' : 'HU'))}
                  className="border border-white/50 px-2 py-0.5 font-display text-xs tracking-wider uppercase hover:border-[#FF2E17] hover:text-[#FF2E17] transition-colors"
                >
                  {lang}
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Docked Portrait + Email Box */}
        <div className="mt-3 flex-1 flex flex-col justify-end gap-3 min-h-0">
          <div
            ref={targetPortraitRef}
            style={{ opacity: 0, visibility: 'hidden' }}
            className="relative w-full aspect-[4/3.6] max-h-[245px] overflow-hidden bg-[#1A1A1A] border border-white/15"
          >
            <span className="absolute top-2.5 left-2.5 z-10 font-mono text-[10px] tracking-[0.15em] uppercase text-[#EAE6DF] bg-black/55 px-1.5 py-0.5">
              PORTRAIT / 01
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/daniel.jpg"
              onError={(e) => {
                if (e.currentTarget.src !== FALLBACK_PORTRAIT) {
                  e.currentTarget.src = FALLBACK_PORTRAIT;
                }
              }}
              alt="Daniel Kiss Portrait"
              className="w-full h-full object-cover object-top grayscale contrast-125 brightness-90"
            />
          </div>

          <a
            ref={(el) => {
              sidebarDetailRefs.current[3] = el;
            }}
            href="mailto:info@danielkiss.hu"
            style={{ opacity: 0, visibility: 'hidden' }}
            className="flex items-center justify-between border border-white/25 px-3.5 py-2.5 text-xs font-mono text-[#EAE6DF] hover:border-[#FF2E17] transition-colors"
          >
            <span>info@danielkiss.hu</span>
            <span className="text-[#FF2E17] text-sm">✉</span>
          </a>
        </div>
      </aside>

      {/* === 280VH LIVE SCROLL MORPH CONTAINER === */}
      <div
        id="introduce"
        ref={wrapperRef}
        className="relative h-[280vh] w-full z-40"
        data-section-name="Introduce"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden select-none">
          {/* --- STAGE 1: PAGE 1 ELEMENTS (Walk into Right Sidebar as you scroll) --- */}
          <div className="relative z-30 h-full flex flex-col justify-between px-7 sm:px-11 py-7 sm:py-9 pointer-events-none">
            <header className="flex items-start justify-between gap-4">
              <div>
                <div ref={codeOriginRef} className="w-fit">
                  <div
                    ref={flyingCodeRef}
                    style={{ transformOrigin: '0 0' }}
                    className="font-display text-lg sm:text-2xl tracking-wide uppercase leading-none text-[#EAE6DF] will-change-transform"
                  >
                    CODE / MOTION /{' '}
                    <BlinkWord
                      text={currentTaglineWord}
                      active={currentBlinkTarget === 'TAGLINE'}
                    />
                  </div>
                </div>
                <div
                  ref={stage1TopMetaRef}
                  className="mt-1.5 font-mono text-[10px] sm:text-[11px] tracking-[0.18em] text-[#8A8A8A] uppercase"
                >
                  INDEX - PORTFOLIO / 2026
                </div>
              </div>

              <div ref={navOriginRef} className="pointer-events-auto">
                <nav
                  ref={flyingNavRef}
                  style={{ transformOrigin: '0 0' }}
                  className="flex items-center gap-4 sm:gap-7 will-change-transform"
                >
                  <ul className="hidden lg:flex items-center gap-7">
                    {navItems.map((item) => {
                      const isActive = activeNav === item.label;
                      return (
                        <li key={item.num}>
                          <a
                            href={item.href}
                            onMouseEnter={() => setActiveNav(item.label)}
                            onMouseLeave={() => setActiveNav(currentSection)}
                            className="group inline-flex items-baseline gap-1.5 font-display text-lg sm:text-xl tracking-wide uppercase transition-colors"
                          >
                            <span
                              className={`text-sm transition-colors ${
                                isActive
                                  ? 'text-[#FF2E17]'
                                  : 'text-[#6E6E6E] group-hover:text-[#FF2E17]'
                              }`}
                            >
                              {item.num}
                            </span>
                            <span
                              className={`transition-colors ${
                                isActive
                                  ? 'text-[#FF2E17]'
                                  : 'text-[#EAE6DF] group-hover:text-[#FF2E17]'
                              }`}
                            >
                              <BlinkWord
                                text={item.label}
                                active={currentBlinkTarget === item.label}
                              />
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>

                  <button
                    type="button"
                    onClick={() => setLang((prev) => (prev === 'HU' ? 'EN' : 'HU'))}
                    className="border border-white/60 px-3 py-1 font-display text-base sm:text-lg tracking-wider uppercase text-[#EAE6DF] hover:border-[#FF2E17] hover:text-[#FF2E17] transition-colors"
                  >
                    {lang}
                  </button>
                </nav>
              </div>
            </header>

            <div className="mt-auto pt-8">
              <div
                ref={stage1MisbehaveRef}
                className="flex justify-end lg:pr-[24%] mb-1 sm:mb-2"
              >
                <p className="font-marker text-[#EAE6DF] text-sm sm:text-lg md:text-xl tracking-wide -rotate-2 flex items-center gap-2">
                  <span className="text-lg sm:text-2xl">↙</span>
                  <span>
                    I MAKE THE WEB{' '}
                    <BlinkWord
                      text="MISBEHAVE"
                      active={currentBlinkTarget === 'MISBEHAVE'}
                    />
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end gap-4 lg:gap-6">
                <div ref={nameOriginRef} className="w-fit">
                  <h1
                    ref={flyingNameRef}
                    style={{ transformOrigin: '0 0' }}
                    className="font-display uppercase text-[21vw] sm:text-[18.5vw] lg:text-[15.2vw] leading-[0.82] tracking-[-0.02em] inline-flex flex-nowrap items-baseline gap-x-4 sm:gap-x-6 w-fit will-change-transform"
                  >
                    <span className="text-[#EAE6DF] drop-shadow-[0_0_24px_rgba(234,230,223,0.28)]">
                      DANIEL
                    </span>
                    <span className="text-[#FF2E17] drop-shadow-[0_0_28px_rgba(255,46,23,0.42)]">
                      KISS
                    </span>
                  </h1>
                </div>

                <div ref={portraitOriginRef} className="hidden lg:block w-[205px] xl:w-[225px]">
                  <div
                    ref={flyingPortraitRef}
                    style={{ transformOrigin: '0 0' }}
                    className="relative w-full aspect-[4/3.6] overflow-hidden bg-[#1A1A1A] border border-white/15 will-change-transform"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/daniel.jpg"
                      onError={(e) => {
                        if (e.currentTarget.src !== FALLBACK_PORTRAIT) {
                          e.currentTarget.src = FALLBACK_PORTRAIT;
                        }
                      }}
                      alt="Daniel Kiss"
                      className="w-full h-full object-cover object-top grayscale contrast-125 brightness-90"
                    />
                  </div>
                </div>
              </div>

              <div
                ref={stage1BottomBarRef}
                className="pointer-events-auto mt-4 sm:mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <a
                  href="#skills"
                  onClick={handleKeepDigging}
                  className="font-marker text-[#EAE6DF] hover:text-[#FF2E17] transition-colors text-base sm:text-xl tracking-wide flex items-center gap-2 shrink-0"
                >
                  <span>↓</span>
                  <BlinkWord
                    text="KEEP DIGGING"
                    active={currentBlinkTarget === 'KEEP DIGGING'}
                  />
                </a>

                <div className="hidden md:block flex-1 max-w-2xl px-4">
                  <svg
                    viewBox="0 0 600 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-4 text-[#EAE6DF]/85"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M4 17C145 11 380 7 596 11C490 15 210 18 18 20"
                      stroke="currentColor"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="flex items-center gap-5 sm:gap-6 font-display text-xs sm:text-sm tracking-[0.12em] uppercase text-[#EAE6DF] shrink-0">
                  <a
                    href="https://www.linkedin.com/in/danielkiss-web-development/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FF2E17] transition-colors inline-flex items-center gap-1"
                  >
                    LINKEDIN <span>↗</span>
                  </a>
                  <a
                    href="https://profiles.wordpress.org/wpkoithemes/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FF2E17] transition-colors inline-flex items-center gap-1"
                  >
                    WORDPRESS <span>↗</span>
                  </a>
                  <a
                    href="https://www.behance.net/wpkoi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FF2E17] transition-colors inline-flex items-center gap-1"
                  >
                    BEHANCE <span>↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* --- STAGE 2: PAGE 2 LEFT CONTENT (Strictly hidden at scroll=0, assembles as Stage 1 walks) --- */}
          <div
            ref={stage2ContainerRef}
            style={{ opacity: 0, visibility: 'hidden' }}
            className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-center px-8 sm:px-14 lg:pr-[390px] xl:pr-[420px]"
          >
            <div className="max-w-4xl">
              <h2 className="font-display uppercase text-[10vw] sm:text-[8vw] lg:text-[6.4vw] leading-[0.9] tracking-[-0.02em]">
                <span className="block">
                  {line1Chars.map((ch, idx) => {
                    if (ch === ' ') {
                      return (
                        <span key={`l1-${idx}`} className="inline-block w-[0.26em]">
                          &nbsp;
                        </span>
                      );
                    }
                    const refIdx = charCounter++;
                    return (
                      <span
                        key={`l1-${idx}`}
                        ref={(el) => {
                          scatterCharRefs.current[refIdx] = el;
                        }}
                        style={{ opacity: 0, visibility: 'hidden' }}
                        className="inline-block text-[#EAE6DF] drop-shadow-[0_0_20px_rgba(234,230,223,0.22)] will-change-transform"
                      >
                        {ch}
                      </span>
                    );
                  })}
                </span>
                <span className="block">
                  {line2Chars.map((ch, idx) => {
                    if (ch === ' ') {
                      return (
                        <span key={`l2-${idx}`} className="inline-block w-[0.26em]">
                          &nbsp;
                        </span>
                      );
                    }
                    const refIdx = charCounter++;
                    return (
                      <span
                        key={`l2-${idx}`}
                        ref={(el) => {
                          scatterCharRefs.current[refIdx] = el;
                        }}
                        style={{ opacity: 0, visibility: 'hidden' }}
                        className="inline-block text-[#FF2E17] drop-shadow-[0_0_24px_rgba(255,46,23,0.38)] will-change-transform"
                      >
                        {ch}
                      </span>
                    );
                  })}
                </span>
              </h2>

              <div
                ref={stage2BrushRef}
                style={{ opacity: 0, visibility: 'hidden' }}
                className="mt-3 sm:mt-4 max-w-3xl"
              >
                <svg
                  viewBox="0 0 600 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-3.5 text-[#EAE6DF]/90"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 15C160 10 410 7 597 10C480 14 195 17 14 19"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <p
                ref={stage2NoteRef}
                style={{ opacity: 0, visibility: 'hidden' }}
                className="mt-7 sm:mt-9 font-mono text-xs sm:text-sm tracking-[0.12em] uppercase text-[#A09D98]"
              >
                THEMES ON WORDPRESS.ORG SINCE 2015 — THE SOURCE IS PUBLIC.
              </p>

              <div className="mt-10 sm:mt-14 flex flex-wrap items-center gap-8 sm:gap-12">
                <span
                  ref={(el) => {
                    stage2StatRefs.current[0] = el;
                  }}
                  style={{ opacity: 0, visibility: 'hidden' }}
                  className="font-marker text-2xl sm:text-3xl text-[#EAE6DF] -rotate-12 select-none"
                >
                  ↗
                </span>

                {[
                  { num: '14+', line1: 'YEARS', line2: 'WEB' },
                  { num: '500+', line1: 'TEMPLATES', line2: 'ELEMENTOR' },
                  { num: '200+', line1: 'THEMES', line2: 'WORDPRESS' },
                ].map((item, idx) => (
                  <div
                    key={item.num}
                    ref={(el) => {
                      stage2StatRefs.current[idx + 1] = el;
                    }}
                    style={{ opacity: 0, visibility: 'hidden' }}
                    className="flex items-center gap-3"
                  >
                    <span className="font-display text-5xl sm:text-6xl xl:text-7xl text-[#FF2E17] leading-none drop-shadow-[0_0_18px_rgba(255,46,23,0.35)]">
                      {item.num}
                    </span>
                    <div className="font-mono text-[10px] sm:text-xs tracking-[0.15em] uppercase text-[#9A9792] leading-snug">
                      <div>{item.line1}</div>
                      <div>{item.line2}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}