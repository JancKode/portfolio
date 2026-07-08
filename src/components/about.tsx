"use client";

import { motion } from "motion/react";
import { profile } from "@/content/profile";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl scroll-mt-16 px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          About
        </h2>
        <div className="mt-6 max-w-3xl space-y-4 text-muted">
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
