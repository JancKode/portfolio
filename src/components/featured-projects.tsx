"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { projectGradient } from "@/components/project-gradients";
import { caseStudies } from "@/content/case-studies";

export function FeaturedProjects() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-5xl scroll-mt-16 px-6 py-24"
    >
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Featured Projects
      </h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {caseStudies.map((study, i) => (
          <motion.div
            key={study.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
            whileHover={{ y: -6 }}
            className="h-full"
          >
            <Link
              href={`/work/${study.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-edge p-6 transition-colors hover:border-edge-strong"
            >
              <div
                aria-hidden
                className={`h-28 rounded-xl bg-gradient-to-br transition-transform duration-300 group-hover:scale-[1.02] ${projectGradient(study.slug)}`}
              />
              <h3 className="mt-5 font-semibold">{study.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{study.tagline}</p>
              <p className="mt-4 text-xs text-faint">
                {study.stack.join(" · ")}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
