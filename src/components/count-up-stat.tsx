"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import type { CaseStudy } from "@/content/case-studies";

gsap.registerPlugin(ScrollTrigger);

// The stat display value. Server render is the final value, so no-JS and
// reduced-motion visitors always see the true number. Numeric stats tween
// up once on scroll into view; non-numeric displays ("days → hours",
// "2nd") never animate.
export function CountUpStat({ stat }: { stat: CaseStudy["stat"] }) {
  const ref = useRef<HTMLSpanElement>(null);
  const countTo = "countTo" in stat ? stat.countTo : undefined;
  const suffix = ("suffix" in stat ? stat.suffix : undefined) ?? "";

  useEffect(() => {
    const el = ref.current;
    if (!el || countTo === undefined) return;
    const mm = gsap.matchMedia();

    // Motion is opt-in: outside this context the final value just stays.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const counter = { value: 0 };
      gsap.to(counter, {
        value: countTo,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%" },
        onUpdate: () => {
          el.textContent = `${Math.round(counter.value)}${suffix}`;
        },
      });
    });

    return () => mm.revert();
  }, [countTo, suffix]);

  return (
    <span ref={ref} data-stat>
      {stat.display}
    </span>
  );
}
