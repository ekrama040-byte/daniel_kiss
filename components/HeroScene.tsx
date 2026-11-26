'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

type SceneMode = 'home' | 'afterHome';

function getSceneMode(section: string): SceneMode {
  return section === 'INTRODUCE' ? 'home' : 'afterHome';
}

const fullscreenVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const trailFragmentShader = `
  uniform sampler2D uPrevTrail;
  uniform vec2 uMouse;
  uniform vec2 uPrevMouse;
  uniform float uTime;
  uniform float uAspect;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float sdSegment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / max(dot(ba, ba), 0.00001), 0.0, 1.0);
    return length(pa - ba * h);
  }

  void main() {
    float n1 = noise(vUv * 4.5 + vec2(uTime * 0.14, -uTime * 0.11)) - 0.5;
    float n2 = noise(vUv * 4.5 + vec2(-uTime * 0.11, uTime * 0.14) + 11.3) - 0.5;
    vec2 advectUv = vUv + vec2(n1, n2) * 0.003;

    float prev = texture2D(uPrevTrail, advectUv).r * 0.982;

    vec2 p = vec2(vUv.x * uAspect, vUv.y);
    vec2 a = vec2(uPrevMouse.x * uAspect, uPrevMouse.y);
    vec2 b = vec2(uMouse.x * uAspect, uMouse.y);

    float d = sdSegment(p, a, b);
    float edgeNoise = (noise(p * 12.0 + uTime * 0.5) - 0.5) * 0.055;
    float brush = smoothstep(0.20, 0.02, d + edgeNoise);

    float trail = clamp(max(prev, brush * 0.95), 0.0, 1.0);
    gl_FragColor = vec4(trail, 0.0, 0.0, 1.0);
  }
`;

const compositeFragmentShader = `
  uniform sampler2D uTrail;
  uniform sampler2D uHomeTex;
  uniform sampler2D uAfterTex;
  uniform float uHasHome;
  uniform float uHasAfter;
  uniform float uBlend;
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);

    float smoke = noise(vec2(uv.x * aspect, uv.y) * 3.2 + uTime * 0.02);
    float dust = smoothstep(0.72, 0.96, noise(vec2(uv.x * aspect, uv.y) * 11.0));
    vec3 darkBase = vec3(0.045, 0.045, 0.045) + vec3(0.024) * smoke + vec3(0.026) * dust;

    vec3 color = darkBase;

    vec3 homeCol = uHasHome > 0.5 ? texture2D(uHomeTex, uv).rgb : darkBase;
    vec3 afterCol = uHasAfter > 0.5 ? texture2D(uAfterTex, uv).rgb : homeCol;

    if (uHasHome > 0.5 || uHasAfter > 0.5) {
      vec3 rawVideo = mix(homeCol, afterCol, clamp(uBlend, 0.0, 1.0));

      // Slightly darker, subtle monochrome-tinted grade for the WPKoi walkthrough video
      float afterLum = dot(rawVideo, vec3(0.299, 0.587, 0.114));
      vec3 mutedAfter = mix(vec3(afterLum), rawVideo, 0.35) * 0.52;
      vec3 gradedHome = pow(max(rawVideo, vec3(0.0)), vec3(1.12)) * vec3(1.08, 0.98, 0.90);
      vec3 gradedVideo = mix(gradedHome, mutedAfter, clamp(uBlend, 0.0, 1.0));

      float lum = dot(gradedVideo, vec3(0.299, 0.587, 0.114));
      vec2 cell = fract(gl_FragCoord.xy / 4.2) - 0.5;
      float dotRadius = mix(0.12, 0.46, clamp(lum * 1.5, 0.0, 1.0));
      float dotMask = smoothstep(dotRadius + 0.06, dotRadius - 0.06, length(cell));
      vec3 halftoneVideo = mix(gradedVideo * 0.14, gradedVideo * 1.15, dotMask);

      float trailAmt = smoothstep(0.05, 0.48, texture2D(uTrail, uv).r);
      // Keep a faint ambient visibility of the WPKoi video after home, boosted strongly under cursor
      float ambientVisibility = mix(0.0, 0.16, clamp(uBlend, 0.0, 1.0));
      float reveal = clamp(max(ambientVisibility, trailAmt * 0.78), 0.0, 0.82);

      color = mix(darkBase, halftoneVideo, reveal);
    }

    float grain = (hash(gl_FragCoord.xy + fract(uTime) * 100.0) - 0.5) * 0.024;
    color += grain;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function loadLoopingVideo(
  src: string,
  onReady: (tex: THREE.VideoTexture, video: HTMLVideoElement) => void
) {
  const video = document.createElement('video');
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.preload = 'auto';
  video.src = src;

  let tex: THREE.VideoTexture | null = null;
  const handleReady = () => {
    video.play().catch(() => {});
    if (!tex) {
      tex = new THREE.VideoTexture(video);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      onReady(tex, video);
    }
  };

  video.addEventListener('loadeddata', handleReady);
  video.addEventListener('canplay', handleReady);
  video.load();

  return {
    video,
    cleanup: () => {
      video.removeEventListener('loadeddata', handleReady);
      video.removeEventListener('canplay', handleReady);
      video.pause();
      tex?.dispose();
    },
  };
}

function FluidVideoReveal({ mode }: { mode: SceneMode }) {
  const { gl } = useThree();
  const mouse = useRef(new THREE.Vector2(0.32, 0.55));
  const prevMouse = useRef(new THREE.Vector2(0.32, 0.55));
  const targetMouse = useRef(new THREE.Vector2(0.32, 0.55));
  const hasMoved = useRef(false);

  const homeTexRef = useRef<THREE.Texture | null>(null);
  const afterTexRef = useRef<THREE.Texture | null>(null);
  const homeVideoRef = useRef<HTMLVideoElement | null>(null);
  const afterVideoRef = useRef<HTMLVideoElement | null>(null);
  const blendRef = useRef(mode === 'afterHome' ? 1 : 0);
  const targetModeRef = useRef<SceneMode>(mode);

  useEffect(() => {
    targetModeRef.current = mode;
    if (mode === 'afterHome' && afterVideoRef.current?.paused) {
      afterVideoRef.current.play().catch(() => {});
    }
  }, [mode]);

  const fbo = useMemo(() => {
    const opts: THREE.RenderTargetOptions = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.UnsignedByteType,
      depthBuffer: false,
      stencilBuffer: false,
    };
    return {
      read: new THREE.WebGLRenderTarget(256, 256, opts),
      write: new THREE.WebGLRenderTarget(256, 256, opts),
    };
  }, []);

  const trailScene = useMemo(() => new THREE.Scene(), []);
  const orthoCam = useMemo(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), []);

  const trailMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: fullscreenVertex,
        fragmentShader: trailFragmentShader,
        uniforms: {
          uPrevTrail: { value: null },
          uMouse: { value: new THREE.Vector2(0.32, 0.55) },
          uPrevMouse: { value: new THREE.Vector2(0.32, 0.55) },
          uTime: { value: 0 },
          uAspect: { value: 1.77 },
        },
        depthWrite: false,
      }),
    []
  );

  const compositeMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: fullscreenVertex,
        fragmentShader: compositeFragmentShader,
        uniforms: {
          uTrail: { value: null },
          uHomeTex: { value: null },
          uAfterTex: { value: null },
          uHasHome: { value: 0 },
          uHasAfter: { value: 0 },
          uBlend: { value: 0 },
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(1, 1) },
        },
        depthWrite: false,
      }),
    []
  );

  useEffect(() => {
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), trailMaterial);
    trailScene.add(quad);

    // 1. Homepage night-street traffic video
    const homeLoader = loadLoopingVideo('/traffic.mp4', (vTex, vid) => {
      homeTexRef.current = vTex;
      homeVideoRef.current = vid;
    });

    // 2. Post-homepage WPKoi showcase walkthrough video (drop video_2.mp4 into public/wpkoi-bg.mp4)
    const afterLoader = loadLoopingVideo('/wpkoi-bg.mp4', (vTex, vid) => {
      afterTexRef.current = vTex;
      afterVideoRef.current = vid;
    });

    const onPointerMove = (e: PointerEvent) => {
      hasMoved.current = true;
      if (homeVideoRef.current?.paused) homeVideoRef.current.play().catch(() => {});
      if (afterVideoRef.current?.paused) afterVideoRef.current.play().catch(() => {});
      targetMouse.current.set(
        e.clientX / window.innerWidth,
        1.0 - e.clientY / window.innerHeight
      );
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      homeLoader.cleanup();
      afterLoader.cleanup();
      fbo.read.dispose();
      fbo.write.dispose();
      trailMaterial.dispose();
      compositeMaterial.dispose();
    };
  }, [compositeMaterial, fbo, trailMaterial, trailScene]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const buf = new THREE.Vector2();
    gl.getDrawingBufferSize(buf);

    if (!hasMoved.current) {
      targetMouse.current.set(
        0.38 + Math.sin(t * 0.55) * 0.14,
        0.42 + Math.cos(t * 0.45) * 0.08
      );
    }

    prevMouse.current.copy(mouse.current);
    mouse.current.lerp(targetMouse.current, 0.16);

    // Smooth crossfade between home (/traffic.mp4) and after-home (/wpkoi-bg.mp4)
    const targetBlend = targetModeRef.current === 'afterHome' ? 1 : 0;
    blendRef.current += (targetBlend - blendRef.current) * Math.min(1, delta * 3.5);

    trailMaterial.uniforms.uPrevTrail.value = fbo.read.texture;
    trailMaterial.uniforms.uPrevMouse.value.copy(prevMouse.current);
    trailMaterial.uniforms.uMouse.value.copy(mouse.current);
    trailMaterial.uniforms.uTime.value = t;
    trailMaterial.uniforms.uAspect.value = buf.x / Math.max(buf.y, 1);

    const prevTarget = gl.getRenderTarget();
    gl.setRenderTarget(fbo.write);
    gl.render(trailScene, orthoCam);
    gl.setRenderTarget(prevTarget);

    const temp = fbo.read;
    fbo.read = fbo.write;
    fbo.write = temp;

    compositeMaterial.uniforms.uTrail.value = fbo.read.texture;
    compositeMaterial.uniforms.uHomeTex.value = homeTexRef.current;
    compositeMaterial.uniforms.uAfterTex.value = afterTexRef.current;
    compositeMaterial.uniforms.uHasHome.value = homeTexRef.current ? 1 : 0;
    compositeMaterial.uniforms.uHasAfter.value = afterTexRef.current ? 1 : 0;
    compositeMaterial.uniforms.uBlend.value = blendRef.current;
    compositeMaterial.uniforms.uTime.value = t;
    compositeMaterial.uniforms.uResolution.value.copy(buf);
  });

  return (
    <mesh material={compositeMaterial}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
}

class WebGLErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <div className="w-full h-full bg-[#0D0D0D]" />;
    }
    return this.props.children;
  }
}

export default function HeroScene({
  currentSection = 'INTRODUCE',
}: {
  currentSection?: string;
}) {
  const mode = getSceneMode(currentSection);

  return (
    <WebGLErrorBoundary>
      <Canvas
        dpr={1}
        gl={{ antialias: false, failIfMajorPerformanceCaveat: false }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <FluidVideoReveal mode={mode} />
      </Canvas>
    </WebGLErrorBoundary>
  );
}