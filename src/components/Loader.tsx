"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Loader() {
  const [done, setDone] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          gsap.context(() => {
            const tl = gsap.timeline({
              onComplete: () => setDone(true),
            });
            tl.fromTo(
              ".loader-char",
              { yPercent: 120 },
              { yPercent: 0, duration: 0.7, stagger: 0.05, ease: "power4.out" }
            )
              .to(
                ".loader-box",
                { yPercent: -100, duration: 0.8, ease: "power4.inOut", immediateRender: false },
                "+=0.4"
              );
          }, root);
        },
        [root]
      );
      return () => mm.revert();
    },
    { scope: root }
  );

  if (done) return null;

  return (
    <div
      ref={root}
      className="loader-box fixed inset-0 z-[90] flex flex-col items-center justify-center bg-bg"
    >
      <div className="flex overflow-hidden">
        {"ARKA".split("").map((c, i) => (
          <span
            key={i}
            className="loader-char font-display text-5xl font-bold text-gradient sm:text-7xl"
          >
            {c}
          </span>
        ))}
      </div>
      <div className="loader-char mt-4 h-px w-0 bg-neon" />
    </div>
  );
}
