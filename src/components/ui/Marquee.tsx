"use client";

import { useRef, type CSSProperties } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

type MarqueeProps = {
  items: string[];
  reverse?: boolean;
  speed?: number;
};

export default function Marquee({ items, reverse = false, speed = 30 }: MarqueeProps) {
  const reduce = useReducedMotion();
  const rowRef = useRef<HTMLDivElement>(null);

  const row = [...items, ...items];
  const animationStyle: CSSProperties = reduce
    ? {}
    : {
        animation: `marquee ${speed}s linear infinite`,
        animationDirection: reverse ? "reverse" : "normal",
      };

  return (
    <div
      className="group/marquee relative flex overflow-hidden py-3"
      data-hover
      onMouseEnter={() => {
        if (rowRef.current) rowRef.current.style.animationPlayState = "paused";
      }}
      onMouseLeave={() => {
        if (rowRef.current) rowRef.current.style.animationPlayState = "running";
      }}
    >
      {reduce ? (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {items.map((item) => (
            <SkillChip key={item} label={item} />
          ))}
        </div>
      ) : (
        <>
          <div
            ref={rowRef}
            className="flex shrink-0 items-center gap-4 pr-4"
            style={animationStyle}
            aria-hidden
          >
            {row.map((item, i) => (
              <SkillChip key={`${i}-${item}`} label={item} />
            ))}
          </div>
        </>
      )}
      {!reduce && (
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }`}</style>
      )}
    </div>
  );
}

function SkillChip({ label }: { label: string }) {
  return (
    <span className="group/chip flex shrink-0 cursor-default items-center gap-3 whitespace-nowrap rounded-full border border-line bg-surface/60 px-5 py-2.5 text-lg font-medium text-foreground/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-neon/40 hover:bg-neon/5 hover:text-neon hover:shadow-glow sm:text-xl">
      {label}
      <span className="text-neon" aria-hidden>
        ✦
      </span>
    </span>
  );
}
