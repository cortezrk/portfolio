"use client";

import { motion } from "motion/react";
import { experience } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-4xl px-6 py-24">
      <Reveal>
        <p className="font-mono text-sm text-neon">{"// experience"}</p>
        <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
          My <span className="text-gradient">journey</span>
        </h2>
      </Reveal>

      <div className="relative mt-14 border-l border-line pl-8 ml-2">
        {experience.map((exp) => (
          <motion.div
            key={`${exp.role}-${exp.company}`}
            className="relative pb-12 last:pb-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span
              aria-hidden
              className="absolute -left-[37px] top-1 h-4 w-4 rounded-full bg-neon shadow-glow"
            />
            <div className="glass rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-xl font-bold">{exp.role}</h3>
                <span className="font-mono text-xs text-muted">{exp.period}</span>
              </div>
              <p className="mt-1 text-sm text-neon">{exp.company}</p>
              <p className="mt-3 text-muted">{exp.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
