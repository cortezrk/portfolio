"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  GithubLogo,
  DribbbleLogo,
  LinkedinLogo,
  XLogo,
  ArrowDown,
} from "@phosphor-icons/react";
import dynamic from "next/dynamic";
import Magnetic from "@/components/ui/Magnetic";
import { profile } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Scene3D = dynamic(() => import("@/components/three/Scene3D"), {
  ssr: false,
  loading: () => null,
});

const socialIcons = {
  github: GithubLogo,
  dribbble: DribbbleLogo,
  linkedin: LinkedinLogo,
  twitter: XLogo,
};

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
          tl.fromTo(
            ".hero-line",
            { yPercent: 120 },
            { yPercent: 0, duration: 1.1, stagger: 0.1 }
          )
            .fromTo(
              ".hero-fade",
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
              "-=0.6"
            )
            .fromTo(
              ".hero-cta",
              { opacity: 0, scale: 0.94 },
              { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 },
              "-=0.5"
            );

          gsap.to(".hero-parallax", {
            yPercent: -20,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
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
      id="top"
      className="noise relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-28"
    >
      <Scene3D />

      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-neon/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-violet/20 blur-[120px]"
      />

      {/* subtle grid guide */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* vertical social rail */}
      <div className="hero-fade absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex">
        {profile.socials.map((s) => {
          const Icon = socialIcons[s.icon as keyof typeof socialIcons] ?? GithubLogo;
          return (
            <Magnetic key={s.label} strength={0.5}>
              <a
                href={s.href}
                aria-label={s.label}
                data-hover
                className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:text-neon"
              >
                <Icon size={18} weight="duotone" />
              </a>
            </Magnetic>
          );
        })}
        <span aria-hidden className="mt-2 h-24 w-px bg-gradient-to-b from-line to-transparent" />
      </div>

      <div className="hero-parallax relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="hero-line overflow-hidden font-mono text-sm text-neon">
            <span className="inline-block">{"// "}{profile.location}</span>
          </p>

          <div className="hero-line mt-6 inline-flex items-center gap-2 rounded-full border border-neon/25 bg-neon/5 px-4 py-1.5">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
            </span>
            <span className="font-mono text-xs text-neon">open to work</span>
          </div>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl md:text-8xl">
            <span className="block overflow-hidden">
              <span className="hero-line inline-block text-foreground/70">
                Hi, I&apos;m
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line inline-block">
                {profile.name.split(" ")[0]}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line inline-block text-gradient neon-text">
                {profile.name.split(" ")[1]}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line inline-block text-foreground/70">
                {profile.name.split(" ")[2]}
              </span>
            </span>
          </h1>

          <p className="hero-fade mt-8 max-w-xl text-lg text-muted sm:text-xl">
            <span className="text-foreground">{profile.role}.</span>{" "}
            {profile.tagline}
          </p>

          <div className="hero-cta mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#projects"
                data-hover
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-neon px-8 py-4 font-medium text-[var(--on-accent)] transition-shadow hover:shadow-glow"
              >
                <span className="relative z-10">See my work</span>
                <span
                  aria-hidden
                  className="relative z-10 transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                data-hover
                className="glass inline-flex items-center gap-2 rounded-full px-8 py-4 font-medium text-foreground transition-colors hover:border-neon/50 hover:text-neon"
              >
                Contact me
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      <a
        href="#about"
        data-hover
        aria-label="Scroll to about section"
        className="hero-fade group absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest group-hover:text-neon">
          scroll
        </span>
        <ArrowDown size={18} className="transition-transform group-hover:translate-y-1" />
      </a>
    </section>
  );
}
