"use client";

import { motion } from "motion/react";
import { skillIcon } from "@/components/skill-icons";
import { skillCategories } from "@/content/skills";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl scroll-mt-16 px-6 py-24">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Skills
      </h2>
      <div className="mt-10 space-y-10">
        {skillCategories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className={
              category.highlighted
                ? "rounded-2xl border border-indigo-500/40 bg-indigo-500/10 p-6"
                : undefined
            }
          >
            <h3
              className={`text-sm font-medium uppercase tracking-widest ${
                category.highlighted ? "text-indigo-300" : "text-zinc-500"
              }`}
            >
              {category.title}
            </h3>
            <motion.ul
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ staggerChildren: 0.04 }}
              className="mt-4 flex flex-wrap gap-2"
            >
              {category.skills.map((skill) => {
                const icon = skillIcon(skill);
                return (
                  <motion.li
                    key={skill}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      shown: { opacity: 1, y: 0 },
                    }}
                    className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm ${
                      category.highlighted
                        ? "border-indigo-400/40 text-indigo-100"
                        : "border-zinc-700 text-zinc-300"
                    }`}
                  >
                    {icon && (
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden
                        className="size-4 shrink-0"
                        fill={icon.color}
                      >
                        <path d={icon.path} />
                      </svg>
                    )}
                    {skill}
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
