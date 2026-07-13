"use client";

import { motion } from "motion/react";
import { ProjectCard } from "@/components/project-card";
import { caseStudies } from "@/content/case-studies";

// Asymmetric 12-column showcase: Storyline and akeno.ai are large feature
// panels, Emirates Group and AICPA the compact pair below; single column on
// mobile. The reveal wrapper owns this element's only transform.
const layout: Record<string, { variant: "feature" | "compact"; span: string }> =
  {
    storyline: { variant: "feature", span: "lg:col-span-7" },
    "akeno-ai": { variant: "feature", span: "lg:col-span-5" },
    "emirates-group": { variant: "compact", span: "lg:col-span-6" },
    aicpa: { variant: "compact", span: "lg:col-span-6" },
  };

export function FeaturedProjects() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-5xl scroll-mt-16 px-6 py-24"
    >
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Featured Projects
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {caseStudies.map((study, i) => (
          // motion-reveal: a no-JS fallback (globals.css) forces this back
          // to opacity 1 / no transform, since Motion bakes the hidden
          // `initial` state into the server HTML and only its own runtime
          // ever un-hides it — issue #12 requires cards fully rendered
          // server-side even without hydration.
          <motion.div
            key={study.slug}
            data-motion-reveal
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
            className={`h-full ${layout[study.slug].span}`}
          >
            <ProjectCard study={study} variant={layout[study.slug].variant} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
