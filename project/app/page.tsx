'use client';

import { useEffect, useState, Suspense, useRef } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from '@/components/Loader';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import Marquee from '@/components/Marquee';
import Reveal from '@/components/Reveal';
import Sidebar from '@/components/Sidebar';
import NavigationBar from '@/components/NavigationBar';
import BackgroundVideo from '@/components/BackgroundVideo';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroScene = dynamic(() => import('@/components/HeroScene'), { ssr: false });

const skills = [
  {
    num: '01',
    title: 'Creative & Motion',
    tags: ['GSAP', 'Three.js', 'WebGL', 'Motion', 'HTML', 'CSS'],
  },
  {
    num: '02',
    title: 'WordPress Development',
    tags: ['WordPress', 'Themes', 'Plugins', 'Elementor', 'Gutenberg', 'WooCommerce'],
  },
  {
    num: '03',
    title: 'Web Development',
    tags: ['PHP', 'Javascript', 'NPM', 'Performance', 'Responsive Design', 'Accessibility'],
  },
  {
    num: '04',
    title: 'Design & Product',
    tags: ['UI / UX', 'Web Design', 'Motion', 'Product Development'],
  },
];

const experiences = [
  { period: '2022 → Now', title: 'wwwows.com', desc: 'WordPress Block Theme Developer' },
  { period: '2015 → 2017', title: 'Webzakt', desc: 'WordPress Theme Developer' },
  { period: '2012 → 2019', title: 'Freelance Works', desc: 'Web Development & Client Projects' },
  { period: '2009 → 2012', title: 'Filmmaker', desc: 'Video Editing' },
];

const awards = [
  { name: 'CSSDA Special Kudos (WPKoi)', url: 'https://www.cssdesignawards.com/sites/wpkoi-wordpress-themes/49813/' },
  { name: 'CSSDA Innovation Public Award (WPKoi)', url: 'https://www.cssdesignawards.com/sites/wpkoi-wordpress-themes/49813/' },
  { name: 'CSSDA UI Public Award (WPKoi)', url: 'https://www.cssdesignawards.com/sites/wpkoi-wordpress-themes/49813/' },
  { name: 'CSSDA UX Public Award (WPKoi)', url: 'https://www.cssdesignawards.com/sites/wpkoi-wordpress-themes/49813/' },
  { name: 'CSSWinner SOTD (danielkiss.hu)', url: 'https://www.csswinner.com/details/daniel-kiss-creative-development/19398' },
  { name: 'Design Nominees SOTD (danielkiss.hu)', url: 'https://www.designnominees.com/sites/daniel-kiss-creative-web-development' },
  { name: 'Design Nominees TOTD (Hrasva)', url: 'https://www.designnominees.com/themes/hrasva-wpkoi-wordpress-theme' },
  { name: 'Design Nominees TOTD (Lovebird)', url: 'https://www.designnominees.com/themes/lovebird' },
  { name: 'CSS Nectar SOTD (WPKoi)', url: 'https://cssnectar.com/css-gallery-inspiration/wpkoi-wordpress-themes/' },
];

const showcaseImages = [
  'https://danielkiss.hu/img/wpkoi/awwwards-pic-1-1024.webp',
  'https://danielkiss.hu/img/wpkoi/awwwards-pic-2-1024.webp',
  'https://danielkiss.hu/img/wpkoi/awwwards-pic-3-1024.webp',
];

const socialLinks = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/danielkiss-web-development/' },
  { label: 'WordPress', url: 'https://profiles.wordpress.org/wpkoithemes/' },
  { label: 'Behance', url: 'https://www.behance.net/wpkoi' },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading) return;

    // Hero entrance animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from('.hero-line', {
        yPercent: 110,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power4.out',
      })
        .from('.hero-meta', { opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.4')
        .from('.hero-scene', { opacity: 0, scale: 0.8, duration: 1.5, ease: 'power2.out' }, '-=1');

      // Parallax on scroll for hero
      gsap.to('.hero-scene', {
        yPercent: 30,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to('.hero-text-block', {
        yPercent: -20,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Stats counter animation
      gsap.utils.toArray<HTMLElement>('.stat-number').forEach((el) => {
        const text = el.dataset.value || '';
        const target = parseInt(text);
        const suffix = text.replace(/[0-9]/g, '');
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val) + suffix;
          },
        });
      });

      // Showcase horizontal scroll
      if (showcaseRef.current) {
        const panels = showcaseRef.current.querySelectorAll('.showcase-panel');
        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: showcaseRef.current,
            pin: true,
            scrub: 1,
            end: () => '+=' + showcaseRef.current!.offsetWidth,
          },
        });
      }

      // Section markers animation
      gsap.utils.toArray<HTMLElement>('.section-marker').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [loading]);

  if (loading) {
    return (
      <>
        <Loader onComplete={() => setLoading(false)} />
        <CustomCursor />
      </>
    );
  }

  return (
    <SmoothScroll>
      <CustomCursor />
      <NavigationBar />
      <Sidebar />
      <BackgroundVideo />
      <main className="relative bg-background text-foreground overflow-x-hidden">
        {/* === HERO === */}
        <section
          className="hero-section relative min-h-screen flex flex-col justify-between overflow-hidden z-20"
          data-section-name="Introduce"
        >
          {/* WebGL Background */}
          <div className="hero-scene absolute inset-0 z-0">
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </div>

          {/* Top bar */}
          <div className="relative z-10 flex items-start justify-between p-4 sm:p-6">
            <div className="hero-meta text-xs sm:text-sm tracking-widest text-muted-foreground">
              DANIEL KISS
            </div>
            <div className="hero-meta text-xs sm:text-sm tracking-widest text-muted-foreground animate-spin spin-slow">
              ▲
            </div>
          </div>

          {/* Center text */}
          <div className="hero-text-block relative z-10 flex-1 flex flex-col items-center justify-center px-4">
            <div className="hero-meta text-xs sm:text-sm text-muted-foreground tracking-widest uppercase mb-4 sm:mb-6">
              CODE / MOTION / WEBGL — WEIRD CHAOS UNUSUAL
            </div>
            <h1 className="text-center text-[8vw] sm:text-[6vw] md:text-[5vw] font-bold leading-[0.9] tracking-tighter overflow-hidden">
              <span className="block overflow-hidden">
                <span className="hero-line inline-block">Make It Work,</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-line inline-block text-muted-foreground">Then Make It Weird…</span>
              </span>
            </h1>
            <div className="hero-meta mt-6 text-xs sm:text-sm text-muted-foreground max-w-md text-center">
              Themes on wordpress.org since 2015 — the source is public.
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative z-10 flex items-end justify-between p-4 sm:p-6">
            <div className="hero-meta text-xs text-muted-foreground tracking-widest">
              14+ Years Web
            </div>
            <div className="hero-meta text-xs text-muted-foreground tracking-widest hidden sm:block">
              ↓ Scroll
            </div>
            <div className="hero-meta text-xs text-muted-foreground tracking-widest">
              I MAKE THE WEB MISBEHAVE
            </div>
          </div>
        </section>

        {/* === MAIN CONTENT (shifts right when sidebar activates) === */}
        <div className="main-content relative z-20 transition-[margin-left] duration-100">
        {/* === MARQUEE === */}
        <section className="relative py-8 border-y border-border/50" data-section-name="Make">
          <Marquee text="Daniel Kiss" separator="/" />
        </section>

        {/* === STATS === */}
        <section className="relative py-20 sm:py-32 px-4 sm:px-6" data-section-name="Stats">
          <div className="max-w-6xl mx-auto">
            <Reveal className="mb-16">
              <p className="text-sm text-muted-foreground tracking-widest uppercase mb-4">↓ Numbers</p>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
                Made Some. Broke Some…
              </h2>
              <p className="mt-4 text-muted-foreground text-sm sm:text-base">
                And somehow, 1M+ downloads
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4">
              {[
                { value: '14+', label: 'Years Web', sub: 'Coding since 2009' },
                { value: '500+', label: 'Templates', sub: 'Elementor' },
                { value: '200+', label: 'Themes', sub: 'WordPress' },
              ].map((stat, i) => (
                <Reveal key={i} delay={i * 0.1} className="border-t border-border pt-6">
                  <div
                    className="stat-number text-5xl sm:text-7xl font-bold tracking-tighter tabular-nums"
                    data-value={stat.value}
                  >
                    0+
                  </div>
                  <div className="mt-3 text-lg font-medium">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.sub}</div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-16 text-center">
              <p className="text-sm text-muted-foreground tracking-widest uppercase">
                Designed. Coded. Shipped. By me.
              </p>
              <p className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight">
                WPKOI →
              </p>
            </Reveal>
          </div>
        </section>

        {/* === SKILLS === */}
        <section className="relative py-20 sm:py-32 px-4 sm:px-6 border-t border-border/50" data-section-name="Skills">
          <div className="max-w-6xl mx-auto">
            <Reveal className="mb-16">
              <p className="text-sm text-muted-foreground tracking-widest uppercase mb-4">↓ What I Do</p>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
                This is the fun part!
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/50">
              {skills.map((skill, i) => (
                <div
                  key={i}
                  className="group bg-background p-8 sm:p-10 transition-colors hover:bg-secondary cursor-pointer"
                  data-cursor="view"
                >
                  <div className="section-marker flex items-center gap-4 mb-6">
                    <span className="text-sm text-muted-foreground tabular-nums">{skill.num}</span>
                    <div className="h-px flex-1 bg-border group-hover:bg-foreground/30 transition-colors" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 group-hover:translate-x-2 transition-transform duration-300">
                    {skill.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 border border-border rounded-full text-muted-foreground group-hover:border-foreground/30 group-hover:text-foreground transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === WPKOI SHOWCASE === */}
        <section className="relative" data-section-name="WPKoi">
          {/* Intro */}
          <div className="py-20 sm:py-32 px-4 sm:px-6 border-t border-border/50">
            <div className="max-w-6xl mx-auto">
              <Reveal>
                <p className="text-sm text-muted-foreground tracking-widest uppercase mb-4">
                  Experience / 2012 → Now
                </p>
                <h2 className="text-3xl sm:text-6xl font-bold tracking-tighter mb-8">
                  WPKoi
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-6">
                  This one got serious. Built solo. Used worldwide.
                </p>
                <div className="flex flex-wrap gap-8 text-sm text-muted-foreground">
                  <span>Founded Aug 2018</span>
                  <span>Customers Worldwide</span>
                  <span>Built for WordPress</span>
                </div>
                <div className="mt-8">
                  <span className="text-sm tracking-widest uppercase text-muted-foreground">
                    Showcase →
                  </span>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Horizontal scroll showcase */}
          <div ref={showcaseRef} className="relative h-screen overflow-hidden flex">
            {showcaseImages.map((img, i) => (
              <div
                key={i}
                className="showcase-panel relative min-w-full h-full flex items-center justify-center p-8 sm:p-16"
              >
                <div className="relative w-full max-w-4xl aspect-video overflow-hidden rounded-lg border border-border/30 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`WPKoi showcase ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 text-xs sm:text-sm text-foreground/80 bg-background/60 backdrop-blur px-3 py-1 rounded">
                    {String(i + 1).padStart(2, '0')} / 0{showcaseImages.length}
                  </div>
                </div>
                <div className="absolute top-8 right-8 text-xs text-muted-foreground tracking-widest">
                  Scroll →
                </div>
              </div>
            ))}
            <div className="showcase-panel relative min-w-full h-full flex flex-col items-center justify-center p-8 sm:p-16">
              <h3 className="text-4xl sm:text-6xl font-bold tracking-tighter mb-4">It Took My Time.</h3>
              <a
                href="https://wpkoi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-lg sm:text-xl border-b border-foreground pb-1 hover:gap-6 transition-all"
              >
                Enter WPKoi
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* === EXPERIENCE === */}
        <section className="relative py-20 sm:py-32 px-4 sm:px-6 border-t border-border/50" data-section-name="Experience">
          <div className="max-w-4xl mx-auto">
            <Reveal className="mb-16">
              <p className="text-sm text-muted-foreground tracking-widest uppercase mb-4">↓ Timeline</p>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
                The Journey
              </h2>
            </Reveal>

            <div className="space-y-0">
              {experiences.map((exp, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="group grid grid-cols-[auto_1fr] sm:grid-cols-[200px_1fr] gap-4 sm:gap-8 py-8 border-t border-border hover:bg-secondary/30 transition-colors cursor-pointer px-2 sm:px-4" data-cursor="view">
                    <span className="text-xs sm:text-sm text-muted-foreground tabular-nums pt-1">
                      {exp.period}
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight group-hover:translate-x-2 transition-transform">
                        {exp.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{exp.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12 text-center">
              <a
                href="https://www.linkedin.com/in/danielkiss-web-development/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-sm sm:text-base border-b border-foreground pb-1 hover:gap-6 transition-all"
              >
                View Full Experience
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Reveal>
          </div>
        </section>

        {/* === AWARDS === */}
        <section className="relative py-20 sm:py-32 px-4 sm:px-6 border-t border-border/50" data-section-name="Awards">
          <div className="max-w-5xl mx-auto">
            <Reveal className="mb-16">
              <p className="text-sm text-muted-foreground tracking-widest uppercase mb-4">↓ Recognition</p>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
                I Wanted To Know How Far…
              </h2>
              <p className="mt-4 text-muted-foreground text-sm">Worth the try</p>
              <p className="mt-2 text-xs text-muted-foreground tracking-widest uppercase">
                Selected Recognitions
              </p>
            </Reveal>

            <div className="space-y-0">
              {awards.map((award, i) => (
                <Reveal key={i} delay={i * 0.03}>
                  <a
                    href={award.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-4 border-t border-border hover:border-foreground/30 transition-colors"
                    data-cursor="link"
                  >
                    <span className="text-xs text-muted-foreground tabular-nums w-8">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 text-sm sm:text-lg group-hover:translate-x-2 transition-transform">
                      {award.name}
                    </span>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">↗</span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* === CONTACT === */}
        <section className="relative py-20 sm:py-40 px-4 sm:px-6 border-t border-border/50" data-section-name="Contact">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <p className="text-sm text-muted-foreground tracking-widest uppercase mb-6">
                So… Would You Make Something Weird Together?
              </p>
              <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter mb-8">
                Bug Me With Your Idea
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mb-12">
                Available for selected projects
              </p>

              {/* Draggable email button */}
              <a
                href="mailto:hello@danielkiss.hu"
                className="draggable inline-flex items-center gap-3 text-lg sm:text-2xl border border-foreground/30 rounded-full px-8 py-4 hover:bg-foreground hover:text-background transition-colors group"
                data-cursor="drag"
              >
                Drag me →
              </a>
            </Reveal>

            <Reveal className="mt-20" delay={0.2}>
              <div className="flex flex-wrap items-center justify-center gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors group inline-flex items-center gap-1"
                    data-cursor="link"
                  >
                    {link.label}
                    <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* === FOOTER === */}
        <footer className="relative py-8 px-4 sm:px-6 border-t border-border/50" data-section-name="Footer">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="tracking-widest uppercase">Daniel Kiss</div>
            <div className="tracking-widest">© 2026 — Keep Digging</div>
            <div className="tracking-widest uppercase">Daniel Kiss ↗</div>
          </div>
        </footer>
        </div>
      </main>
    </SmoothScroll>
  );
}
