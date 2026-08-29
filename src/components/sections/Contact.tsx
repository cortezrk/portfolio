"use client";

import { useState, type FormEvent } from "react";
import {
  GithubLogo,
  DribbbleLogo,
  LinkedinLogo,
  TwitterLogo,
  EnvelopeSimple,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import Magnetic from "@/components/ui/Magnetic";
import Reveal from "@/components/ui/Reveal";
import { profile } from "@/lib/data";

const socialIcons: Record<string, React.ReactNode> = {
  github: <GithubLogo size={22} weight="duotone" />,
  dribbble: <DribbbleLogo size={22} weight="duotone" />,
  linkedin: <LinkedinLogo size={22} weight="duotone" />,
  twitter: <TwitterLogo size={22} weight="duotone" />,
};

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sent");
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-violet/20 blur-[120px]"
      />

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <Reveal>
          <p className="font-mono text-sm text-neon">{"// contact"}</p>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-6xl">
            Let&apos;s build something{" "}
            <span className="text-gradient neon-text">extraordinary</span>
          </h2>
          <p className="mt-6 text-muted">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </Reveal>

        <div className="mt-10 flex justify-center gap-4">
          {profile.socials.map((s) => (
            <Magnetic key={s.label} strength={0.4}>
              <a
                href={s.href}
                aria-label={s.label}
                data-hover
                className="glass flex h-12 w-12 items-center justify-center rounded-full text-foreground transition-colors hover:border-neon/60 hover:text-neon"
              >
                {socialIcons[s.icon]}
              </a>
            </Magnetic>
          ))}
        </div>

        {status === "sent" ? (
          <div className="glass mt-12 rounded-2xl p-10">
            <EnvelopeSimple size={40} className="mx-auto text-neon" weight="duotone" />
            <h3 className="mt-4 font-display text-2xl font-bold">
              Message received!
            </h3>
            <p className="mt-2 text-muted">
              Thanks for reaching out. I&apos;ll get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-12 space-y-4 text-left">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm text-muted">
                  Name
                </label>
                <input
                  id="name"
                  required
                  className="glass w-full rounded-xl px-4 py-3 text-foreground outline-none transition-colors focus:border-neon/60 placeholder:text-muted/50"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm text-muted">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="glass w-full rounded-xl px-4 py-3 text-foreground outline-none transition-colors focus:border-neon/60 placeholder:text-muted/50"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="mb-1 block text-sm text-muted">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                className="glass w-full resize-none rounded-xl px-4 py-3 text-foreground outline-none transition-colors focus:border-neon/60 placeholder:text-muted/50"
                placeholder="Tell me about your project..."
              />
            </div>
            <Magnetic>
              <button
                type="submit"
                data-hover
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-neon px-8 py-4 font-medium text-[var(--on-accent)] transition-opacity hover:opacity-90"
              >
                Send message <PaperPlaneTilt size={20} weight="fill" aria-hidden />
              </button>
            </Magnetic>
          </form>
        )}
      </div>
    </section>
  );
}
