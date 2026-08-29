"use client";

import Marquee from "@/components/ui/Marquee";
import Reveal from "@/components/ui/Reveal";
import { skills } from "@/lib/data";

export default function Skills() {
  const first = skills.slice(0, 6);
  const second = skills.slice(6);

  return (
    <section id="skills" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 pb-12">
        <Reveal>
          <p className="font-mono text-sm text-neon">{"// skills"}</p>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            Tools I <span className="text-gradient">wield</span>
          </h2>
        </Reveal>
      </div>

      <div className="space-y-6">
        <div className="border-y border-line py-6">
          <Marquee items={first} speed={26} />
        </div>
        <div className="border-b border-line py-6">
          <Marquee items={second} reverse speed={22} />
        </div>
      </div>
    </section>
  );
}
