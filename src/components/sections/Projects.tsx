"use client";

import { motion } from "motion/react";
import GlassCard from "@/components/ui/GlassCard";
import { projects } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

const accentMap: Record<string, string> = {
  cyan: "bg-neon shadow-glow",
  violet: "bg-violet shadow-glow-violet",
  magenta: "bg-magenta shadow-[0_0_24px_rgba(232,121,249,0.4)]",
};

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <p className="font-mono text-sm text-neon">{"// selected projects"}</p>
        <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
          Things I&apos;ve <span className="text-gradient">built</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => {
          const accent = accentMap[project.accent] ?? accentMap.cyan;
          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            >
              <GlassCard mode="view" className="group flex h-full flex-col p-6">
                <div className={`h-2 w-16 rounded-full ${accent}`} aria-hidden />

                <div className="mt-6 flex items-start justify-between">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">
                    {project.category}
                  </p>
                  <p className="font-mono text-xs text-muted">{project.year}</p>
                </div>

                <h3 className="mt-3 font-display text-2xl font-bold transition-colors group-hover:text-neon">
                  {project.title}
                </h3>

                <p className="mt-3 flex-1 text-muted">{project.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="glass rounded-full px-3 py-1 text-xs text-foreground/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href="#"
                  data-hover
                  aria-label={`View project ${project.title}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-neon transition-transform group-hover:translate-x-1"
                >
                  View case study <span aria-hidden>→</span>
                </a>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
