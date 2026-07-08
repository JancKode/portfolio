"use client";

import { motion } from "motion/react";
import { profile } from "@/content/profile";

const entrance = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Hero Accent mount point (ADR 0001): static gradient until the
          phase-2 WebGL accent mounts here. */}
      <div
        data-hero-accent
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(99,102,241,0.25),transparent_70%),radial-gradient(ellipse_60%_50%_at_70%_70%,rgba(14,165,233,0.15),transparent_70%)]"
      />
      <motion.div
        initial="hidden"
        animate="shown"
        transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
        className="flex flex-col items-center gap-6"
      >
        <motion.h1
          variants={entrance}
          className="max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl"
        >
          {profile.name}
        </motion.h1>
        <motion.p
          variants={entrance}
          className="text-lg text-zinc-400 sm:text-2xl"
        >
          {profile.role} · {profile.focus}
        </motion.p>
        <motion.div
          variants={entrance}
          className="mt-4 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="rounded-full bg-zinc-100 px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-white"
          >
            View work
          </a>
          <a
            href={profile.cvPath}
            download
            className="rounded-full border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500"
          >
            Download CV
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
