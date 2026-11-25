'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 3000;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3] = (Math.random() - 0.5) * 12;
      arr[i3 + 1] = (Math.random() - 0.5) * 8;
      arr[i3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.elapsedTime;
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3 + 1] += Math.sin(time + i * 0.01) * 0.0008;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#ffffff"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.15;
      meshRef.current.rotation.y = time * 0.2;
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = time * 0.15;
      wireRef.current.rotation.y = time * 0.2;
      wireRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} scale={1.6}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#1a1a1a" transparent opacity={0.6} />
      </mesh>
      <mesh ref={wireRef} scale={1.65}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <ParticleField />
      <FloatingShape />
    </Canvas>
  );
}
