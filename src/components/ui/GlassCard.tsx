"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  mode?: "view" | "link" | "default";
};

export default function GlassCard({
  children,
  className,
  tilt = true,
  mode = "default",
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    // spotlight highlight follows cursor
    ref.current.style.setProperty("--mx", `${px * 100}%`);
    ref.current.style.setProperty("--my", `${py * 100}%`);

    if (tilt) {
      const rotX = (py - 0.5) * -10;
      const rotY = (px - 0.5) * 10;
      ref.current.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    }
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-hover
      data-mode={mode}
      className={`glass-soft group/card relative overflow-hidden rounded-2xl transition-transform duration-300 ease-out ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
