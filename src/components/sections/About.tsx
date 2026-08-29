"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { profile } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".about-pin",
              start: "top top",
              end: "+=250%",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          });

          tl.fromTo(
            ".about-heading",
            { opacity: 1 },
            { opacity: 0, y: -80, duration: 0.3, ease: "none" }
          )
            .fromTo(
              ".about-statement",
              { opacity: 0 },
              { opacity: 1, duration: 0.4, ease: "none" }
            );
        },
        [root]
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="about"
      className="relative mx-auto max-w-7xl px-6 py-24"
    >
      <div className="about-pin flex min-h-[80vh] items-center">
        <div className="w-full">
          <p className="font-mono text-sm text-neon">{"// about"}</p>

          <h2 className="about-heading mt-4 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl">
            A developer who treats the web as a{" "}
            <span className="text-gradient">playground</span>.
          </h2>

          <div className="about-statement mt-10 grid gap-10 md:grid-cols-2 md:opacity-0">
            <p className="text-lg leading-relaxed text-muted">{profile.about[0]}</p>
            <p className="text-lg leading-relaxed text-muted">{profile.about[1]}</p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <AboutStats />
      </div>
    </section>
  );
}

function AboutStats() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          gsap.fromTo(
            ".stat-fade",
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
            }
          );
        },
        [rootRef]
      );
      return () => mm.revert();
    },
    { scope: rootRef }
  );

  const stats = [
    { value: "8", suffix: "+", label: "Years crafting" },
    { value: "40", suffix: "+", label: "Projects shipped" },
    { value: "12", suffix: "k", label: "Hours of motion" },
    { value: "∞", suffix: "", label: "Curiosity" },
  ];

  return (
    <div ref={rootRef} className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="stat-fade glass-soft group rounded-2xl p-6 text-center"
          data-hover
        >
          <p className="font-display text-4xl font-bold text-gradient sm:text-5xl">
            {s.value}
            {s.suffix}
          </p>
          <p className="mt-2 text-sm text-muted transition-colors group-hover:text-foreground">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
