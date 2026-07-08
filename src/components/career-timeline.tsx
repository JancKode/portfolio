"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { careerRoles } from "@/content/career";

gsap.registerPlugin(ScrollTrigger);

export function CareerTimeline() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mm = gsap.matchMedia();

    // Motion is opt-in: outside this context (reduced motion, no JS) the
    // server-rendered timeline stays fully visible and static.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        root.querySelector("[data-timeline-line]"),
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            end: "bottom 70%",
            scrub: true,
          },
        },
      );

      for (const entry of root.querySelectorAll("[data-timeline-entry]")) {
        gsap.fromTo(
          entry,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: entry, start: "top 85%" },
          },
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="career" className="mx-auto max-w-5xl scroll-mt-16 px-6 py-24">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Career Timeline
      </h2>
      <div ref={rootRef} className="relative mt-12">
        <div
          data-timeline-line
          aria-hidden
          className="absolute top-1 bottom-1 left-[5px] w-px origin-top bg-edge"
        />
        <ol className="space-y-12">
          {careerRoles.map((role) => (
            <li
              key={role.company}
              data-timeline-entry
              className="relative pl-8"
            >
              <span
                aria-hidden
                className="absolute top-1 left-0 size-[11px] rounded-full border-2 border-accent-edge bg-background"
              />
              <p className="text-xs font-medium tracking-widest text-faint uppercase">
                {role.period}
              </p>
              <h3 className="mt-1.5 font-semibold">{role.title}</h3>
              <p className="text-muted">{role.company}</p>
              <p className="mt-2 max-w-2xl text-sm text-muted">
                {role.summary}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
