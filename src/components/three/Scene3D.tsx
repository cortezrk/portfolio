"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTheme, type Theme } from "@/components/ThemeProvider";

const COUNT = 1800;

// Generated once at module scope (outside render) so color/math helpers
// don't run during render (React Compiler / lint safe).
type Points = { positions: Float32Array; colors: Float32Array };

function makePoints(palette: THREE.Color[]): Points {
  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);

  for (let i = 0; i < COUNT; i++) {
    const i3 = i * 3;
    const radius = 14 + Math.random() * 18;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);

    const c = palette[Math.floor(Math.random() * palette.length)];
    const sparkle = 0.5 + Math.random() * 0.5;
    colors[i3] = c.r * sparkle;
    colors[i3 + 1] = c.g * sparkle;
    colors[i3 + 2] = c.b * sparkle;
  }

  return { positions, colors };
}

const DARK_PALETTE = [
  new THREE.Color("#22d3ee"),
  new THREE.Color("#a78bfa"),
  new THREE.Color("#e879f9"),
  new THREE.Color("#5eead4"),
];

const LIGHT_PALETTE = [
  new THREE.Color("#0e7490"),
  new THREE.Color("#7c3aed"),
  new THREE.Color("#c026d3"),
  new THREE.Color("#0d9488"),
];

const P: Record<Theme, Points> = {
  dark: makePoints(DARK_PALETTE),
  light: makePoints(LIGHT_PALETTE),
};

function Particles({ dark }: { dark: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPointer({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    const points = pointsRef.current;
    if (!points) return;

    points.rotation.y += delta * 0.04;
    points.rotation.x += delta * 0.01;

    points.position.x += (pointer.x * 0.6 - points.position.x) * 0.04;
    points.position.y += (pointer.y * 0.4 - points.position.y) * 0.04;
  });

  const data = P[dark ? "dark" : "light"];

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[data.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={dark ? 0.9 : 0.55}
        sizeAttenuation
        depthWrite={false}
        blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

export default function Scene3D() {
  const reduce = useReducedMotion();
  const { theme } = useTheme();

  return (
    <div className="absolute inset-0" aria-hidden style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 22], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        frameloop={reduce ? "demand" : "always"}
      >
        <Particles dark={theme === "dark"} />
      </Canvas>
    </div>
  );
}
