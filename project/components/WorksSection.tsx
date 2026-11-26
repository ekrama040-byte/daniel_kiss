'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface ThemeCard {
  id: string;
  name: string;
  url: string;
  variant:
    | 'kalpita'
    | 'hrasva'
    | 'madhura'
    | 'pluta'
    | 'prakata'
    | 'tripti'
    | 'sugupta'
    | 'kripa'
    | 'sahasa'
    | 'veda'
    | 'artha'
    | 'chaya'
    | 'dharma'
    | 'kala';
}

const themeCards: ThemeCard[] = [
  { id: '01', name: 'KALPITA', url: 'https://wpkoi.com/', variant: 'kalpita' },
  { id: '02', name: 'HRASVA', url: 'https://wpkoi.com/', variant: 'hrasva' },
  { id: '03', name: 'MADHURA', url: 'https://wpkoi.com/', variant: 'madhura' },
  { id: '04', name: 'PLUTA', url: 'https://wpkoi.com/', variant: 'pluta' },
  { id: '05', name: 'PRAKATA', url: 'https://wpkoi.com/', variant: 'prakata' },
  { id: '06', name: 'TRIPTI', url: 'https://wpkoi.com/', variant: 'tripti' },
  { id: '07', name: 'SUGUPTA', url: 'https://wpkoi.com/', variant: 'sugupta' },
  { id: '08', name: 'KRIPA', url: 'https://wpkoi.com/', variant: 'kripa' },
  { id: '09', name: 'SAHASA', url: 'https://wpkoi.com/', variant: 'sahasa' },
  { id: '10', name: 'VEDA', url: 'https://wpkoi.com/', variant: 'veda' },
  { id: '11', name: 'ARTHA', url: 'https://wpkoi.com/', variant: 'artha' },
  { id: '12', name: 'CHAYA', url: 'https://wpkoi.com/', variant: 'chaya' },
  { id: '13', name: 'DHARMA', url: 'https://wpkoi.com/', variant: 'dharma' },
  { id: '14', name: 'KALA', url: 'https://wpkoi.com/', variant: 'kala' },
];

const loopedCards = [...themeCards, ...themeCards];

const wpkoiShowcaseSlides = [
  { num: '01', variant: 'trending' as const },
  { num: '02', variant: 'catalog' as const },
  { num: '03', variant: 'toolkit' as const },
  { num: '04', variant: 'color' as const },
  { num: '05', variant: 'dark' as const },
];

const experienceItems = [
  { period: '2022 → NOW', title: 'WWWOWS.COM', desc: 'WORDPRESS BLOCK THEME DEVELOPER' },
  { period: '2015 → 2017', title: 'WEBZAKT', desc: 'WORDPRESS THEME DEVELOPER' },
  { period: '2012 → 2019', title: 'FREELANCE WORKS', desc: 'WEB DEVELOPMENT & CLIENT PROJECTS' },
  { period: '2009 → 2012', title: 'FILMMAKER', desc: 'VIDEO EDITING' },
];

const WPKOI_LETTERS = ['W', 'P', 'K', 'O', 'I'];
const WPKOI_TILTS = [-12, 9, -10, 11, -8];

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));
const seg = (p: number, start: number, end: number) => clamp((p - start) / (end - start));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function ThemeCardArtwork({ variant }: { variant: ThemeCard['variant'] }) {
  switch (variant) {
    case 'kalpita':
      return (
        <div className="relative w-full h-full bg-[#D9D6CE] text-[#141414] overflow-hidden pt-7 px-3 pb-2.5 flex flex-col justify-between">
          <div className="font-display uppercase text-4xl leading-[0.82] tracking-tight text-[#A51D24]">
            ELECTRO
          </div>
          <div className="relative flex-1 my-1 overflow-hidden border border-black/25">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=360&q=75"
              alt="Kalpita theme"
              className="w-full h-full object-cover object-top grayscale contrast-125"
            />
          </div>
          <div className="bg-[#141414] text-[#EAE6DF] text-[6px] font-mono uppercase tracking-widest px-2 py-0.5 flex justify-between">
            <span>++ VOL 01</span>
            <span>EDITION 24</span>
          </div>
        </div>
      );

    case 'hrasva':
      return (
        <div className="relative w-full h-full bg-[#D5D1C8] text-[#141414] overflow-hidden pt-7 px-3 pb-2.5 flex flex-col justify-between">
          <div className="font-display uppercase text-4xl leading-[0.82] tracking-tight text-[#C8281D]">
            NEXUS
          </div>
          <div className="grid grid-cols-[1.3fr_0.8fr] gap-2 flex-1 my-1 min-h-0">
            <div className="overflow-hidden border border-black/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=360&q=75"
                alt="Hrasva theme"
                className="w-full h-full object-cover contrast-115"
              />
            </div>
            <div className="text-[6px] font-mono uppercase leading-tight flex flex-col justify-between opacity-75">
              <span className="text-[#C8281D] font-bold">(START THE STORY)</span>
              <span>MINIMAL BLOCK THEME · TOTD</span>
            </div>
          </div>
        </div>
      );

    case 'madhura':
      return (
        <div className="relative w-full h-full bg-[#DCE619] text-[#151515] overflow-hidden pt-8 px-3 pb-2.5 flex flex-col justify-between">
          <div className="grid grid-cols-[1fr_1.05fr] gap-2 flex-1 min-h-0 items-center">
            <div className="font-display uppercase text-xl leading-[0.86] tracking-tight">
              <div>HAVE FUN!</div>
              <div className="opacity-65">HAVE FUN!</div>
              <div className="text-[#D91E63]">HAVE FUN!</div>
            </div>
            <div className="h-full border-2 border-[#151515] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=360&q=75"
                alt="Madhura theme"
                className="w-full h-full object-cover saturate-150 contrast-125"
              />
            </div>
          </div>
          <div className="mt-1 bg-[#151515] text-[#DCE619] text-[6px] font-mono uppercase px-2 py-0.5 flex justify-between">
            <span>EXPERIMENTAL</span>
            <span>50% OFF</span>
          </div>
        </div>
      );

    case 'pluta':
      return (
        <div className="relative w-full h-full bg-[#DFDDD6] text-[#141414] overflow-hidden pt-7 px-3 pb-2 flex flex-col justify-between">
          <div className="font-display uppercase text-3xl leading-[0.82] tracking-tight text-center border-b border-black/30 pb-1">
            INSPIRATION
          </div>
          <div className="grid grid-cols-[1fr_1fr] gap-2 flex-1 my-1 min-h-0">
            <div className="text-[6px] font-mono leading-tight flex flex-col justify-between">
              <div className="font-bold uppercase">GET READY FOR THE REVOLUTION!</div>
              <div>
                1. Preparation
                <br />
                2. Design
                <br />
                3. Implementation
              </div>
            </div>
            <div className="overflow-hidden border border-black/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=320&q=75"
                alt="Pluta theme"
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </div>
          </div>
          <div className="bg-[#141414] text-[#EAE6DF] text-[5.5px] font-mono uppercase text-center py-0.5 tracking-wider">
            SCROLL DOWN FOR MORE! SCROLL
          </div>
        </div>
      );

    case 'prakata':
      return (
        <div className="relative w-full h-full bg-[#C9C2B2] text-[#141414] overflow-hidden pt-8 px-3 pb-2.5 flex flex-col justify-between">
          <div className="relative flex-1 flex items-center justify-between my-0.5">
            <div className="z-10 leading-[0.86] font-display uppercase text-2xl sm:text-[26px] tracking-tight">
              <div className="text-[#181818]">MAKE</div>
              <div className="line-through decoration-[#D92B1C] decoration-[3px] text-[#2A2A2A]">
                SENSE
              </div>
              <div className="text-[#D92B1C]">NOISE</div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=360&q=75"
              alt="Prakata theme"
              className="w-[54%] h-[92%] object-cover object-top contrast-125 saturate-90 border border-black/20"
            />
          </div>
          <div className="bg-[#A6241B] text-[#F2ECE1] text-[6px] font-mono px-2 py-0.5 uppercase truncate">
            Our process is built on observation and refinement.
          </div>
        </div>
      );

    case 'tripti':
      return (
        <div className="relative w-full h-full bg-[#ECEAE4] text-[#111111] overflow-hidden flex flex-col">
          <div className="px-3 pt-8 pb-1.5">
            <div className="font-display uppercase text-3xl leading-[0.84] tracking-[-0.03em] text-center">
              MOTIVATION
            </div>
          </div>
          <div className="relative flex-1 bg-[#141414] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=75"
              alt="Tripti theme"
              className="w-full h-full object-cover object-center grayscale contrast-125 brightness-75"
            />
          </div>
        </div>
      );

    case 'sugupta':
      return (
        <div className="relative w-full h-full bg-[#D8BE3A] text-[#151515] overflow-hidden pt-8 px-3 pb-2.5 flex flex-col justify-between border-[3px] border-[#388C6B]">
          <div className="font-display uppercase text-3xl leading-[0.84] tracking-tight text-center">
            EUPHORIA
          </div>
          <div className="grid grid-cols-[1fr_1.15fr] gap-2 items-center my-1 flex-1 min-h-0">
            <div className="text-[6.5px] font-mono leading-tight space-y-1">
              <p className="font-bold">What you get by achieving your goals.</p>
              <span className="inline-block bg-[#151515] text-[#D8BE3A] px-1.5 py-0.5 text-[6px] uppercase">
                GET READY
              </span>
            </div>
            <div className="h-full max-h-[86px] bg-[#6E472B] p-1 rounded-sm border border-black/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=320&q=75"
                alt="Sugupta theme"
                className="w-full h-full object-cover contrast-110"
              />
            </div>
          </div>
          <div className="bg-[#388C6B] text-[#111] font-display text-xs tracking-wider uppercase px-2 py-0.5 text-right">
            STEP INTO
          </div>
        </div>
      );

    case 'kripa':
      return (
        <div className="relative w-full h-full bg-[#DFDDD7] text-[#141414] overflow-hidden pt-8 px-3 pb-2 flex flex-col justify-between">
          <div className="grid grid-cols-[1.2fr_1fr] gap-2 flex-1 min-h-0">
            <div className="flex flex-col justify-center">
              <div className="font-display uppercase text-lg leading-[0.9] tracking-tight">
                LET&apos;S HAVE
                <br />
                SOME FUN!
              </div>
              <p className="mt-1 text-[5.5px] font-mono leading-tight opacity-70">
                Modular Gutenberg layouts for creative studios.
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=75"
              alt="Kripa theme"
              className="w-full h-full max-h-[92px] object-cover object-top grayscale contrast-110"
            />
          </div>
          <div className="mt-1 pt-1 border-t border-black/25">
            <div className="font-display text-[10px] uppercase tracking-tight mb-0.5">
              GREAT SOLUTIONS
            </div>
            <div className="grid grid-cols-3 gap-1 text-[5px] font-mono uppercase">
              <div className="border border-black/25 p-0.5">FIRST</div>
              <div className="border border-black/25 p-0.5">SECOND</div>
              <div className="border border-black/25 p-0.5">THIRD</div>
            </div>
          </div>
        </div>
      );

    case 'sahasa':
      return (
        <div className="relative w-full h-full bg-[#C73322] text-[#F5EFE6] overflow-hidden pt-9 px-3 pb-3 flex flex-col justify-between">
          <div className="font-display uppercase text-3xl leading-[0.84]">
            SAHASA
            <span className="block text-[#141414]">KINETIC</span>
          </div>
          <div className="border-t border-black/30 pt-1.5 flex justify-between text-[6.5px] font-mono uppercase">
            <span>ELEMENTOR READY</span>
            <span>OPEN SOURCE</span>
          </div>
        </div>
      );

    case 'veda':
      return (
        <div className="relative w-full h-full bg-[#E8E5DF] text-[#141414] overflow-hidden pt-9 px-3 pb-2.5 flex flex-col justify-between">
          <div className="font-display uppercase text-2xl leading-[0.86]">
            VEDA <span className="text-[#FF2E17]">PRO</span>
          </div>
          <div className="flex-1 my-1.5 border border-black/25 bg-[#1A1A1A] p-2 flex items-end text-[#EAE6DF] font-mono text-[6.5px] uppercase">
            FULL SITE EDITING · BLOCK PATTERNS
          </div>
          <div className="flex justify-between text-[6px] font-mono uppercase opacity-70">
            <span>WORDPRESS.ORG</span>
            <span>FREE DOWNLOAD</span>
          </div>
        </div>
      );

    case 'artha':
      return (
        <div className="relative w-full h-full bg-[#0E1621] text-[#DCE4EE] overflow-hidden pt-9 px-3 pb-3 flex flex-col justify-between">
          <div className="font-display uppercase text-3xl leading-[0.86]">
            ARTHA
            <span className="block text-[#48C9B0] text-xl">DIGITAL LAB</span>
          </div>
          <div className="grid grid-cols-3 gap-1 text-[6px] font-mono uppercase">
            <div className="bg-white/10 p-1.5">UI KIT</div>
            <div className="bg-white/10 p-1.5">MOTION</div>
            <div className="bg-[#48C9B0] text-[#0E1621] p-1.5 font-bold">PRO</div>
          </div>
        </div>
      );

    case 'chaya':
      return (
        <div className="relative w-full h-full bg-[#EFECE6] text-[#111] overflow-hidden pt-8 px-3 pb-2.5 flex flex-col justify-between">
          <div className="grid grid-cols-[1fr_1.1fr] gap-2 flex-1 min-h-0">
            <div className="font-display uppercase text-2xl leading-[0.86] flex flex-col justify-between">
              <span>LIGHT &amp; SHADOW</span>
              <span className="text-[7px] font-mono bg-[#111] text-white px-1.5 py-0.5 w-fit">
                PORTFOLIO
              </span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=320&q=75"
              alt="Chaya theme"
              className="w-full h-full object-cover grayscale contrast-125"
            />
          </div>
          <div className="mt-1.5 text-[6px] font-mono uppercase tracking-widest opacity-70">
            EDITORIAL BLOCK THEME
          </div>
        </div>
      );

    case 'dharma':
      return (
        <div className="relative w-full h-full bg-[#2B1F27] text-[#F4D9C6] overflow-hidden pt-9 px-3 pb-3 flex flex-col justify-between">
          <div className="font-display uppercase text-3xl leading-[0.84]">
            DHARMA
            <span className="block text-[#F26444]">ARCHIVE</span>
          </div>
          <div className="flex items-center justify-between border-t border-white/20 pt-2 text-[6.5px] font-mono uppercase">
            <span>WOOCOMMERCE</span>
            <span className="text-[#F26444]">SHOP READY →</span>
          </div>
        </div>
      );

    default:
      return (
        <div className="relative w-full h-full bg-[#D8D3C8] text-[#141414] overflow-hidden pt-8 px-3 pb-2.5 flex flex-col justify-between">
          <div className="flex items-end justify-between border-b border-black/30 pb-1">
            <span className="font-display uppercase text-3xl leading-[0.82]">KALA</span>
            <span className="font-mono text-[6.5px] uppercase">EDITION 14</span>
          </div>
          <div className="flex-1 my-1.5 bg-[#191919] text-[#EAE6DF] p-2 flex flex-col justify-between font-mono text-[6.5px] uppercase">
            <span className="text-[#FF2E17]">● LIVE PREVIEW</span>
            <span>CREATIVE AGENCY · ELEMENTOR</span>
          </div>
        </div>
      );
  }
}

function GlitchCardFrame({ children }: { children: ReactNode }) {
  return (
    <div className="glitch-card-inner">
      <div className="w-full h-full">{children}</div>
      <div className="glitch-layer-cyan" aria-hidden="true">
        {children}
      </div>
      <div className="glitch-layer-red" aria-hidden="true">
        {children}
      </div>
      <div className="glitch-layer-yellow" aria-hidden="true" />
    </div>
  );
}

function WpkoiShowcaseArtwork({
  variant,
}: {
  variant: (typeof wpkoiShowcaseSlides)[number]['variant'];
}) {
  switch (variant) {
    case 'trending':
      return (
        <div className="relative w-full h-full bg-[#111111] text-[#EAE6DF] overflow-hidden flex flex-col justify-between">
          <div className="relative flex-1 p-5 flex flex-col justify-between bg-gradient-to-br from-[#1B1918] via-[#121212] to-[#1A1512]">
            <div className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/55">
              WEBGL EFFECTS.
              <br />
              WITHOUT CODE.
            </div>
            <div className="font-display uppercase text-4xl sm:text-5xl leading-[0.85] tracking-tight">
              <span className="text-[#FF2E17]">WPKOI.</span>
              <span className="text-[#EAE6DF]">THEMES</span>
            </div>
          </div>
          <div className="bg-[#D9C826] text-[#111] font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-3 py-1 truncate">
            Premium versions come with lifetime updates! Don&apos;t miss! · Check our discounted bundles
          </div>
          <div className="bg-[#0E0E0E] px-5 py-4 flex items-baseline justify-between">
            <span className="font-display uppercase text-3xl sm:text-4xl tracking-tight text-[#EAE6DF]">
              TRENDING
            </span>
            <span className="font-mono text-[8px] text-white/45 uppercase">
              200+ THEMES · 1M+ DOWNLOADS
            </span>
          </div>
        </div>
      );

    case 'catalog':
      return (
        <div className="relative w-full h-full bg-[#151515] text-[#EAE6DF] p-4 grid grid-cols-2 gap-3 overflow-hidden">
          <div className="bg-[#C9C2B2] text-[#141414] p-3 flex flex-col justify-between">
            <span className="font-display text-xl uppercase">LALITA</span>
            <div className="grid grid-cols-2 gap-1.5 my-2 flex-1">
              <div className="bg-[#141414] text-[#D8BE3A] p-1.5 font-mono text-[7px]">
                51 DESIGNS
              </div>
              <div className="bg-[#ECEAE4] p-1.5 font-display text-xs">EMOTION</div>
            </div>
            <span className="font-mono text-[7px] uppercase opacity-70">MULTIDESIGN PACK</span>
          </div>
          <div className="bg-[#1F1F1F] border border-white/15 p-3 flex flex-col justify-between">
            <span className="font-display text-xl uppercase text-[#EAE6DF]">ABHEDA</span>
            <div className="my-2 flex-1 bg-[#D5D1C8] text-[#141414] p-2 font-display text-lg uppercase flex items-center justify-center">
              MOMENTUM
            </div>
            <span className="font-mono text-[7px] uppercase text-[#FF2E17]">BLOCK PATTERNS →</span>
          </div>
        </div>
      );

    case 'toolkit':
      return (
        <div className="relative w-full h-full bg-[#0E0E0E] text-[#EAE6DF] p-5 flex flex-col justify-between border border-white/10">
          <div className="flex justify-between font-mono text-[8px] uppercase tracking-widest text-white/50">
            <span>EXPLORE THE TOOLKIT</span>
            <span className="text-[#FF2E17]">FSE · GUTENBERG</span>
          </div>
          <div className="grid grid-cols-3 gap-2.5 my-3 flex-1">
            <div className="border border-white/15 bg-[#191919] p-2.5 flex flex-col justify-between">
              <span className="font-display text-lg text-[#FF2E17]">500+</span>
              <span className="font-mono text-[7px] text-white/65">ELEMENTOR TEMPLATES</span>
            </div>
            <div className="border border-white/15 bg-[#EAE6DF] text-[#141414] p-2.5 flex flex-col justify-between">
              <span className="font-display text-lg">200+</span>
              <span className="font-mono text-[7px] opacity-75">WORDPRESS THEMES</span>
            </div>
            <div className="border border-white/15 bg-[#191919] p-2.5 flex flex-col justify-between">
              <span className="font-display text-lg text-[#EAE6DF]">1M+</span>
              <span className="font-mono text-[7px] text-white/65">ACTIVE DOWNLOADS</span>
            </div>
          </div>
          <div className="font-display uppercase text-2xl tracking-tight">
            BUILT SOLO. <span className="text-[#FF2E17]">USED WORLDWIDE.</span>
          </div>
        </div>
      );

    case 'color':
      return (
        <div className="relative w-full h-full bg-[#161616] text-[#EAE6DF] p-5 flex flex-col justify-between overflow-hidden">
          <div>
            <div className="font-display uppercase text-3xl sm:text-4xl leading-[0.86] text-center">
              THEMES BY
            </div>
            <div className="font-mono text-[8px] text-center text-white/50 mt-1">
              Browse the themes by categories
            </div>
          </div>
          <div className="my-3 grid grid-cols-[1.5fr_0.55fr] gap-2.5 flex-1">
            <div className="bg-[#1C1C1C] border border-white/15 p-3 flex flex-col justify-between">
              <span className="font-mono text-[9px] text-white/60">001</span>
              <div className="bg-[#D5D1C8] text-[#C8281D] font-display text-3xl text-center py-3 uppercase">
                NEXUS
              </div>
              <span className="font-display text-3xl tracking-tight uppercase">COLOR</span>
            </div>
            <div className="bg-[#ECEAE4] text-[#141414] p-2 flex flex-col justify-between">
              <span className="font-mono text-[8px]">002</span>
              <span className="font-display text-sm uppercase">DARK</span>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="relative w-full h-full bg-[#141414] text-[#EAE6DF] p-5 flex flex-col justify-between overflow-hidden">
          <div>
            <div className="font-display uppercase text-3xl sm:text-4xl leading-[0.86] text-center">
              THEMES BY
            </div>
            <div className="font-mono text-[8px] text-center text-white/50 mt-1">
              Browse the themes by categories
            </div>
          </div>
          <div className="my-3 grid grid-cols-2 gap-2.5 flex-1">
            <div className="bg-[#1B1B1B] border border-white/15 p-3 flex flex-col justify-between">
              <div className="bg-[#D5D1C8] text-[#C8281D] font-display text-2xl text-center py-3 uppercase">
                NEXUS
              </div>
              <span className="font-display text-2xl uppercase">COLOR</span>
            </div>
            <div className="bg-[#EAE6DF] text-[#141414] p-3 flex flex-col justify-between">
              <span className="font-mono text-[8px]">002</span>
              <div className="bg-[#191919] text-[#EAE6DF] p-2 font-mono text-[7px] uppercase">
                don&apos;t limit yourself
              </div>
              <span className="font-display text-2xl uppercase">DARK</span>
            </div>
          </div>
        </div>
      );
  }
}

export default function WorksSection() {
  // Single master scroll track for all 3 in-place stages
  const masterZoneRef = useRef<HTMLDivElement>(null);

  // Stage 1: MADE SOME. BROKE SOME... + Continuous Inward-Curved Carousel
  const stage1LayerRef = useRef<HTMLDivElement>(null);
  const stage1HeadRef = useRef<HTMLDivElement>(null);
  const stage1CarouselWrapRef = useRef<HTMLDivElement>(null);
  const stage1BottomRef = useRef<HTMLDivElement>(null);
  const carouselViewportRef = useRef<HTMLDivElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const carouselCardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const isCarouselHoveredRef = useRef(false);

  // Stage 2: EXPERIENCE / 2012 -> NOW + Giant WPKOI
  const stage2LayerRef = useRef<HTMLDivElement>(null);
  const stage2ExpRef = useRef<HTMLDivElement>(null);
  const wpkoiLetterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const wpkoiArrowRef = useRef<HTMLSpanElement>(null);
  const wpkoiBrushRef = useRef<HTMLDivElement>(null);
  const wpkoiSubRef = useRef<HTMLDivElement>(null);
  const wpkoiMetaRef = useRef<HTMLDivElement>(null);

  // Stage 3: IT TOOK MY TIME. + Horizontal 01/05 -> 05/05 Showcase
  const stage3LayerRef = useRef<HTMLDivElement>(null);
  const showcaseViewportRef = useRef<HTMLDivElement>(null);
  const showcaseTrackRef = useRef<HTMLDivElement>(null);
  const showcaseSlideRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const showcaseCounterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let smoothP = 0;
    let carouselOffset = 0;
    let carouselScrollBoost = 0;
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let rafId = 0;

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastScrollY;
      lastScrollY = y;
      carouselScrollBoost = clamp(carouselScrollBoost + dy * 0.55, -420, 420);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const zone = masterZoneRef.current;
      const vh = window.innerHeight || 1;

      if (zone) {
        const scrollSpan = Math.max(zone.offsetHeight - vh, 1);
        const rawP = clamp((window.scrollY - zone.offsetTop) / scrollSpan, 0, 1);
        smoothP += (rawP - smoothP) * 0.14;
        if (Math.abs(rawP - smoothP) < 0.0004) smoothP = rawP;
      }

      const p = smoothP;

      // =======================================================================
      // STAGE 1 (p: 0.00 -> 0.28): MADE SOME. BROKE SOME... + Curved Carousel
      // =======================================================================
      const s1Exit = easeOutCubic(seg(p, 0.16, 0.28));
      const s1Visible = s1Exit < 0.99;

      if (stage1LayerRef.current) {
        stage1LayerRef.current.style.visibility = s1Visible ? 'visible' : 'hidden';
        stage1LayerRef.current.style.pointerEvents = s1Exit < 0.35 ? 'auto' : 'none';
      }

      if (s1Visible) {
        if (stage1HeadRef.current) {
          stage1HeadRef.current.style.opacity = String(1 - s1Exit);
          stage1HeadRef.current.style.transform = `translate3d(0, ${-s1Exit * 42}px, 0) rotate(${
            -s1Exit * 4.5
          }deg)`;
        }
        if (stage1CarouselWrapRef.current) {
          stage1CarouselWrapRef.current.style.opacity = String(1 - s1Exit);
          stage1CarouselWrapRef.current.style.transform = `scale(${1 - s1Exit * 0.08})`;
        }
        if (stage1BottomRef.current) {
          stage1BottomRef.current.style.opacity = String(1 - s1Exit);
          stage1BottomRef.current.style.transform = `translate3d(0, ${s1Exit * 34}px, 0)`;
        }

        // Autonomous inward-curved 3D carousel motion
        const vp = carouselViewportRef.current;
        const track = carouselTrackRef.current;
        if (vp && track) {
          const halfTrack = track.scrollWidth / 2;
          if (halfTrack > 0) {
            const baseSpeed = isCarouselHoveredRef.current ? 16 : 66;
            carouselScrollBoost *= 0.92;
            carouselOffset += (baseSpeed + carouselScrollBoost) * dt;
            if (carouselOffset >= halfTrack) carouselOffset -= halfTrack;
            if (carouselOffset < 0) carouselOffset += halfTrack;

            track.style.transform = `translate3d(${-carouselOffset}px, 0, 0)`;

            const vpRect = vp.getBoundingClientRect();
            const vpCenter = vpRect.left + vpRect.width * 0.5;
            const halfW = Math.max(vpRect.width * 0.5, 1);

            carouselCardRefs.current.forEach((cardEl) => {
              if (!cardEl) return;
              const rect = cardEl.getBoundingClientRect();
              if (rect.right < vpRect.left - 160 || rect.left > vpRect.right + 160) return;

              const cardCenter = rect.left + rect.width * 0.5;
              const norm = clamp((cardCenter - vpCenter) / halfW, -1.35, 1.35);

              // Deep inward concave curve
              const rotateY = -norm * 35;
              const translateZ = norm * norm * 88 - 44;
              const scale = 0.92 + Math.abs(norm) * 0.08;
              const opacity = clamp(1.18 - Math.abs(norm) * 0.44, 0.2, 1);

              cardEl.style.transform = `perspective(680px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
              cardEl.style.opacity = String(opacity);
            });
          }
        }
      }

      // =======================================================================
      // STAGE 2 (p: 0.20 -> 0.60): EXPERIENCE / 2012 -> NOW + Giant WPKOI
      // =======================================================================
      const s2In = seg(p, 0.2, 0.3);
      const s2Exit = easeOutCubic(seg(p, 0.52, 0.6));
      const s2Visible = p > 0.19 && p < 0.61;

      if (stage2LayerRef.current) {
        stage2LayerRef.current.style.visibility = s2Visible ? 'visible' : 'hidden';
        stage2LayerRef.current.style.opacity = String(1 - s2Exit);
        stage2LayerRef.current.style.transform = `translate3d(0, ${-s2Exit * 48}px, 0) scale(${
          1 - s2Exit * 0.05
        })`;
        stage2LayerRef.current.style.pointerEvents =
          s2In > 0.5 && s2Exit < 0.35 ? 'auto' : 'none';
      }

      if (s2Visible) {
        if (stage2ExpRef.current) {
          stage2ExpRef.current.style.opacity = String(easeOutCubic(s2In));
          stage2ExpRef.current.style.transform = `translate3d(0, ${(1 - s2In) * 16}px, 0)`;
        }

        // Giant red W P K O I letters arrive tilted & snap straight upright
        const letterReveal = easeOutCubic(seg(p, 0.23, 0.38));
        wpkoiLetterRefs.current.forEach((el, idx) => {
          if (!el) return;
          const tilt = WPKOI_TILTS[idx % WPKOI_TILTS.length] * (1 - letterReveal);
          const dy = (idx % 2 === 0 ? -1 : 1) * 24 * (1 - letterReveal);
          const dx = (idx - 2) * 18 * (1 - letterReveal);
          el.style.opacity = String(clamp(seg(p, 0.21 + idx * 0.015, 0.32 + idx * 0.015), 0, 1));
          el.style.transform = `translate3d(${dx}px, ${dy}px, 0) rotate(${tilt}deg) scale(${
            0.92 + 0.08 * letterReveal
          })`;
        });

        const detailT = easeOutCubic(seg(p, 0.34, 0.45));
        if (wpkoiArrowRef.current) {
          wpkoiArrowRef.current.style.opacity = String(detailT);
          wpkoiArrowRef.current.style.transform = `translate3d(${(1 - detailT) * -24}px, 0, 0)`;
        }
        if (wpkoiBrushRef.current) {
          wpkoiBrushRef.current.style.opacity = String(detailT);
          wpkoiBrushRef.current.style.clipPath = `inset(0 ${(1 - detailT) * 100}% 0 0)`;
        }
        if (wpkoiSubRef.current) {
          wpkoiSubRef.current.style.opacity = String(detailT);
          wpkoiSubRef.current.style.transform = `translate3d(0, ${(1 - detailT) * 20}px, 0)`;
        }
        if (wpkoiMetaRef.current) {
          const metaT = easeOutCubic(seg(p, 0.39, 0.48));
          wpkoiMetaRef.current.style.opacity = String(metaT);
          wpkoiMetaRef.current.style.transform = `translate3d(0, ${(1 - metaT) * 18}px, 0)`;
        }
      }

      // =======================================================================
      // STAGE 3 (p: 0.56 -> 1.00): IT TOOK MY TIME. + 01/05 -> 05/05 Showcase
      // Only releases down to 04 AWARDS after finishing card 05 / 05
      // =======================================================================
      const s3In = easeOutCubic(seg(p, 0.56, 0.64));
      const s3Visible = p > 0.55;

      if (stage3LayerRef.current) {
        stage3LayerRef.current.style.visibility = s3Visible ? 'visible' : 'hidden';
        stage3LayerRef.current.style.opacity = String(s3In);
        stage3LayerRef.current.style.transform = `translate3d(0, ${(1 - s3In) * 32}px, 0)`;
        stage3LayerRef.current.style.pointerEvents = s3In > 0.5 ? 'auto' : 'none';
      }

      if (s3Visible) {
        const scVp = showcaseViewportRef.current;
        const scTrack = showcaseTrackRef.current;
        const slideProgress = seg(p, 0.64, 0.96);

        if (scVp && scTrack) {
          const maxShift = Math.max(scTrack.scrollWidth - scVp.clientWidth + 60, 0);
          scTrack.style.transform = `translate3d(${-slideProgress * maxShift}px, 0, 0)`;
        }

        const activeSlideIdx = Math.min(
          wpkoiShowcaseSlides.length - 1,
          Math.max(0, Math.round(slideProgress * (wpkoiShowcaseSlides.length - 1)))
        );

        if (showcaseCounterRef.current) {
          showcaseCounterRef.current.textContent = String(activeSlideIdx + 1).padStart(2, '0');
        }

        showcaseSlideRefs.current.forEach((slideEl, idx) => {
          if (!slideEl) return;
          const dist = Math.abs(slideProgress * (wpkoiShowcaseSlides.length - 1) - idx);
          const scale = clamp(1 - dist * 0.12, 0.84, 1);
          const opacity = clamp(1 - dist * 0.55, 0.28, 1);
          slideEl.style.transform = `scale(${scale})`;
          slideEl.style.opacity = String(opacity);
        });
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section id="works" className="relative select-none" data-section-name="Works">
      {/* Single 560vh scroll track driving all 3 stages IN PLACE inside one locked viewport */}
      <div ref={masterZoneRef} className="relative h-[560vh] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* ================================================================= */}
          {/* LAYER 1: MADE SOME. BROKE SOME... + INWARD 3D GLITCH CAROUSEL     */}
          {/* ================================================================= */}
          <div
            ref={stage1LayerRef}
            className="absolute inset-0 z-10 flex flex-col justify-between py-12 sm:py-16"
          >
            {/* Top Headline */}
            <div ref={stage1HeadRef} className="px-8 sm:px-14 pt-2 will-change-transform">
              <h2 className="boil-subtle font-display uppercase text-[10.5vw] sm:text-[7.2vw] lg:text-[5.4vw] xl:text-[5.1vw] leading-[0.88] tracking-[-0.02em] flex flex-wrap items-baseline gap-x-4 sm:gap-x-6">
                <span className="text-[#EAE6DF] drop-shadow-[0_0_20px_rgba(234,230,223,0.18)]">
                  MADE SOME.
                </span>

                <span className="inline-flex flex-col">
                  <span className="kinetic-blink text-[#FF2E17] drop-shadow-[0_0_24px_rgba(255,46,23,0.38)]">
                    BROKE SOME...
                  </span>
                  <svg
                    viewBox="0 0 420 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="boil-fast w-full h-3 sm:h-3.5 mt-1 text-[#EAE6DF]/90"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M3 13C115 8 285 6 417 9C325 13 145 14 14 16"
                      stroke="currentColor"
                      strokeWidth="5.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>
            </div>

            {/* Inward-Curved 3D Carousel */}
            <div ref={stage1CarouselWrapRef} className="w-full will-change-transform">
              <div
                ref={carouselViewportRef}
                onMouseEnter={() => {
                  isCarouselHoveredRef.current = true;
                }}
                onMouseLeave={() => {
                  isCarouselHoveredRef.current = false;
                }}
                className="relative w-full py-6 overflow-hidden"
                style={{
                  WebkitMaskImage:
                    'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
                  maskImage:
                    'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
                }}
              >
                <div
                  ref={carouselTrackRef}
                  className="flex items-center gap-6 sm:gap-7 w-max will-change-transform"
                >
                  {loopedCards.map((card, idx) => (
                    <a
                      key={`${card.id}-${idx}`}
                      ref={(el) => {
                        carouselCardRefs.current[idx] = el;
                      }}
                      href={card.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block shrink-0 w-[225px] sm:w-[245px] xl:w-[265px] aspect-[4/3.1] bg-[#161616] border border-white/15 overflow-hidden shadow-[0_20px_44px_rgba(0,0,0,0.72)] will-change-transform"
                    >
                      <div className="absolute top-2 left-2.5 z-30 inline-flex items-center gap-1.5 bg-[#EAE6DF]/92 px-2.5 py-0.5 text-[10px] font-mono tracking-[0.14em] uppercase text-[#141414]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E17] shrink-0" />
                        <span className="font-semibold">
                          {card.name} / {card.id}
                        </span>
                      </div>

                      <GlitchCardFrame>
                        <ThemeCardArtwork variant={card.variant} />
                      </GlitchCardFrame>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row: WPKOI ↗ + AND SOMEHOW, 1M+ DOWNLOADS */}
            <div
              ref={stage1BottomRef}
              className="px-8 sm:px-14 pb-2 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 will-change-transform"
            >
              <div className="boil-fast font-marker text-2xl sm:text-3xl text-[#EAE6DF] -rotate-6 inline-flex items-center gap-2 mb-2">
                <span>WPKOI</span>
                <span className="text-3xl">↗</span>
              </div>

              <div className="flex flex-col items-end text-right ml-auto">
                <div className="boil-subtle font-display uppercase text-[8vw] sm:text-[5vw] lg:text-[3.5vw] leading-[0.9] tracking-[-0.015em] flex flex-wrap justify-end items-baseline gap-x-3 sm:gap-x-4">
                  <span className="text-[#EAE6DF]">AND SOMEHOW,</span>
                  <span className="inline-flex flex-col">
                    <span className="kinetic-blink text-[#FF2E17] drop-shadow-[0_0_20px_rgba(255,46,23,0.38)]">
                      1M+ DOWNLOADS
                    </span>
                    <svg
                      viewBox="0 0 340 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-2.5 sm:h-3 mt-1 text-[#EAE6DF]/90"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M3 11C95 7 235 5 337 8C260 11 115 12 12 14"
                        stroke="currentColor"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>
                <p className="mt-3.5 font-mono text-[10px] sm:text-xs tracking-[0.18em] uppercase text-[#9A9792]">
                  DESIGNED. CODED. SHIPPED. BY ME.
                </p>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* LAYER 2: EXPERIENCE / 2012 -> NOW + GIANT WPKOI (MORPHS IN PLACE) */}
          {/* ================================================================= */}
          <div
            ref={stage2LayerRef}
            style={{ opacity: 0, visibility: 'hidden' }}
            className="absolute inset-0 z-20 flex flex-col justify-between px-8 sm:px-14 py-14 sm:py-16 will-change-transform"
          >
            {/* Top Label */}
            <div ref={stage2ExpRef} style={{ opacity: 0 }} className="pt-4 will-change-transform">
              <div className="inline-flex flex-col">
                <div className="flex items-baseline gap-2.5 font-mono text-xs sm:text-sm tracking-[0.18em] uppercase text-[#9A9792]">
                  <span>EXPERIENCE / 2012 →</span>
                  <span className="boil-fast font-marker text-2xl sm:text-3xl text-[#FF2E17] leading-none">
                    NOW
                  </span>
                </div>
                <div className="mt-1 h-[1.5px] w-full bg-[#EAE6DF]/70" />
              </div>
            </div>

            {/* Giant Red WPKOI */}
            <div className="my-auto">
              <div className="flex items-center gap-4 sm:gap-6">
                <span
                  ref={wpkoiArrowRef}
                  style={{ opacity: 0 }}
                  className="boil-fast font-marker text-4xl sm:text-6xl text-[#EAE6DF] -rotate-12 shrink-0 will-change-transform"
                >
                  ↗
                </span>

                <div className="inline-flex flex-col">
                  <h3 className="boil-subtle font-display uppercase text-[20vw] sm:text-[16vw] lg:text-[13.5vw] leading-[0.82] tracking-[-0.02em] text-[#FF2E17] drop-shadow-[0_0_32px_rgba(255,46,23,0.42)] flex">
                    {WPKOI_LETTERS.map((ch, idx) => (
                      <span
                        key={ch}
                        ref={(el) => {
                          wpkoiLetterRefs.current[idx] = el;
                        }}
                        style={{ opacity: 0 }}
                        className="inline-block will-change-transform"
                      >
                        {ch}
                      </span>
                    ))}
                  </h3>

                  <div
                    ref={wpkoiBrushRef}
                    style={{ opacity: 0 }}
                    className="mt-2 sm:mt-3 w-full"
                  >
                    <svg
                      viewBox="0 0 600 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-3.5 text-[#EAE6DF]/90"
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

              <div
                ref={wpkoiSubRef}
                style={{ opacity: 0 }}
                className="mt-6 sm:mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-2 will-change-transform"
              >
                <span className="font-display uppercase text-3xl sm:text-5xl tracking-tight text-[#EAE6DF]">
                  THIS ONE GOT SERIOUS.
                </span>
                <span className="font-mono text-xs sm:text-sm tracking-[0.16em] uppercase text-[#8A8A8A]">
                  BUILT SOLO. USED WORLDWIDE.
                </span>
              </div>
            </div>

            {/* Bottom Metadata Row + SHOWCASE ↓ */}
            <div
              ref={wpkoiMetaRef}
              style={{ opacity: 0 }}
              className="flex flex-wrap items-end justify-between gap-6 will-change-transform"
            >
              <div className="flex flex-wrap items-center gap-6 sm:gap-9 font-mono text-[10px] sm:text-xs tracking-[0.14em] uppercase">
                <div>
                  <div className="text-[#FF2E17] font-bold">FOUNDED</div>
                  <div className="text-[#EAE6DF]">AUG 2018</div>
                </div>
                <div className="flex items-center gap-2.5 text-[#EAE6DF]">
                  <span className="text-xl text-white/80">⊕</span>
                  <div className="leading-tight">
                    <div>CUSTOMERS</div>
                    <div className="text-[#9A9792]">WORLDWIDE</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-[#EAE6DF]">
                  <span className="w-6 h-6 rounded-full border border-white/70 flex items-center justify-center text-xs font-bold">
                    W
                  </span>
                  <div className="leading-tight">
                    <div>BUILT FOR</div>
                    <div className="text-[#9A9792]">WORDPRESS</div>
                  </div>
                </div>
              </div>

              <div className="boil-fast font-marker text-2xl sm:text-4xl text-[#9A9792] flex items-center gap-2 -rotate-2">
                <span>SHOWCASE</span>
                <span>↓</span>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* LAYER 3: IT TOOK MY TIME. + 01/05 -> 05/05 SHOWCASE (IN PLACE)    */}
          {/* ================================================================= */}
          <div
            ref={stage3LayerRef}
            style={{ opacity: 0, visibility: 'hidden' }}
            className="absolute inset-0 z-30 flex flex-col justify-between px-8 sm:px-14 py-10 sm:py-12 will-change-transform"
          >
            {/* Top Row */}
            <div className="flex flex-wrap items-start justify-between gap-4 pt-2">
              <div>
                <div className="inline-flex flex-col">
                  <div className="flex items-baseline gap-2 font-mono text-xs tracking-[0.16em] uppercase text-[#9A9792]">
                    <span>WPKOI / 2018 →</span>
                    <span className="boil-fast font-marker text-xl sm:text-2xl text-[#FF2E17] leading-none">
                      NOW
                    </span>
                  </div>
                  <div className="mt-0.5 h-[1.5px] w-full bg-[#EAE6DF]/70" />
                </div>

                <h3 className="boil-subtle mt-1.5 font-display uppercase text-4xl sm:text-5xl lg:text-6xl leading-[0.88] tracking-tight">
                  <span className="text-[#EAE6DF]">IT TOOK </span>
                  <span className="kinetic-blink text-[#FF2E17]">MY TIME.</span>
                </h3>
              </div>

              <a
                href="https://wpkoi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="boil-fast group relative inline-flex items-center gap-2 px-7 py-2.5 font-marker text-lg sm:text-2xl text-[#EAE6DF] hover:text-[#FF2E17] transition-colors -rotate-2"
              >
                <svg
                  viewBox="0 0 240 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="pointer-events-none absolute inset-0 w-full h-full text-[#EAE6DF]/85 group-hover:text-[#FF2E17] transition-colors"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M14 34C10 14 78 5 138 7C204 9 236 22 228 40C220 56 154 61 92 58C30 55 8 44 18 26"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                </svg>
                <span>ENTER WPKOI</span>
                <span>↗</span>
              </a>
            </div>

            {/* Middle Row: 01 / 05 Counter + Scroll-Gated Showcase Track */}
            <div className="my-auto grid grid-cols-1 md:grid-cols-[120px_1fr] items-center gap-6 py-4">
              <div className="flex md:flex-col items-center md:items-start justify-between md:h-[260px]">
                <div className="kinetic-blink font-display text-2xl sm:text-3xl tracking-wider tabular-nums">
                  <span ref={showcaseCounterRef} className="text-[#FF2E17]">
                    01
                  </span>
                  <span className="text-[#787570]"> / 05</span>
                </div>

                <div className="boil-fast font-marker text-lg sm:text-xl text-[#EAE6DF] -rotate-3">
                  SCROLL →
                </div>
              </div>

              <div ref={showcaseViewportRef} className="relative w-full overflow-hidden">
                <div
                  ref={showcaseTrackRef}
                  className="flex items-center gap-8 pr-16 w-max will-change-transform py-2"
                >
                  {wpkoiShowcaseSlides.map((slide, idx) => (
                    <a
                      key={slide.num}
                      ref={(el) => {
                        showcaseSlideRefs.current[idx] = el;
                      }}
                      href="https://wpkoi.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block shrink-0 w-[300px] sm:w-[400px] lg:w-[440px] aspect-[16/11] bg-[#141414] border border-white/15 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.75)] will-change-transform"
                    >
                      <div className="absolute top-3 left-3 z-30 inline-flex items-center gap-1.5 bg-[#EAE6DF]/92 px-2 py-0.5 text-[10px] font-mono font-bold text-[#141414]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E17]" />
                        <span>{slide.num}</span>
                      </div>

                      <GlitchCardFrame>
                        <WpkoiShowcaseArtwork variant={slide.variant} />
                      </GlitchCardFrame>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row: 4-Column Experience Bar + VIEW FULL EXPERIENCE ↗ */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-end justify-between gap-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3">
                {experienceItems.map((exp) => (
                  <div key={exp.title} className="space-y-0.5">
                    <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[#8A8A8A]">
                      {exp.period.split('→')[0]}
                      <span className="text-[#FF2E17] mx-1">→</span>
                      {exp.period.split('→')[1]}
                    </div>
                    <div className="font-display uppercase text-base sm:text-lg tracking-tight text-[#EAE6DF]">
                      {exp.title}
                    </div>
                    <div className="font-mono text-[8.5px] leading-tight uppercase text-[#7C7974]">
                      {exp.desc}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://www.linkedin.com/in/danielkiss-web-development/"
                target="_blank"
                rel="noopener noreferrer"
                className="boil-fast group relative inline-flex items-center gap-2 px-6 py-2 font-marker text-base sm:text-lg text-[#EAE6DF] hover:text-[#FF2E17] transition-colors shrink-0"
              >
                <svg
                  viewBox="0 0 280 54"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="pointer-events-none absolute inset-0 w-full h-full text-[#EAE6DF]/85 group-hover:text-[#FF2E17] transition-colors"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M12 28C10 11 86 5 152 6C228 8 274 17 268 33C262 47 184 51 112 49C36 47 8 38 16 22"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span>VIEW FULL EXPERIENCE</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}