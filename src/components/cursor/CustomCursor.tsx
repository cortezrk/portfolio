"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "default" | "link" | "view";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef<Mode>("default");
  const downRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;

    let raf = 0;
    let tx = -100;
    let ty = -100;
    let rx = -100;
    let ry = -100;
    let dotVisible = false;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      dotVisible = true;
      const target = e.target as HTMLElement | null;
      let next: Mode = "default";
      if (target?.closest("[data-mode='view']")) next = "view";
      else if (target?.closest("a, button, [data-hover]")) next = "link";
      if (next !== modeRef.current) {
        modeRef.current = next;
        setMode(next);
      }
      setEnabled(true);
    };

    const onDown = () => {
      downRef.current = true;
    };
    const onUp = () => {
      downRef.current = false;
    };

    const loop = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      const m = modeRef.current;
      const d = downRef.current;
      if (dotRef.current) {
        dotRef.current.style.opacity = dotVisible ? "1" : "0";
        dotRef.current.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%) scale(${d ? 0.6 : 1})`;
      }
      if (ringRef.current) {
        const size = m === "view" ? 84 : m === "link" ? 44 : 28;
        ringRef.current.style.opacity = dotVisible ? "1" : "0";
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${d ? 0.8 : 1})`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  const ringBg =
    mode === "view"
      ? "color-mix(in srgb, var(--color-neon) 16%, transparent)"
      : mode === "link"
      ? "color-mix(in srgb, var(--color-neon) 10%, transparent)"
      : "transparent";

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[110] h-1.5 w-1.5 rounded-full bg-neon shadow-glow"
        style={{ opacity: 0 }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[109] flex items-center justify-center rounded-full border transition-colors duration-200"
        style={{
          width: 28,
          height: 28,
          opacity: 0,
          backgroundColor: ringBg,
          borderColor:
            mode === "default"
              ? "color-mix(in srgb, var(--color-neon) 50%, transparent)"
              : "color-mix(in srgb, var(--color-neon) 90%, transparent)",
        }}
      >
        {mode === "view" && (
          <span className="text-[10px] font-semibold uppercase tracking-widest text-neon">
            view
          </span>
        )}
      </div>
    </>
  );
}
