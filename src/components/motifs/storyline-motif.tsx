"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

// Storyline: an agentic pipeline — brief → draft → fact-check → publish.
// Nodes light up as a pulse travels the pipeline. The server frame is the
// finished run: every stage lit, the pulse resting at publish.
const stages = [44, 122, 200, 278];
const Y = 64;

export function StorylineMotif({ variant }: { variant: "card" | "hero" }) {
  const rootRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6 });
      // The pulse retraces the whole pipeline, each stage glowing as it
      // arrives. Transforms and opacity only.
      tl.fromTo(
        root.querySelector("[data-pulse]"),
        { x: stages[0] - stages[3] },
        { x: 0, duration: 6, ease: "power1.inOut" },
        0,
      );
      for (const [i, halo] of [
        ...root.querySelectorAll("[data-halo]"),
      ].entries()) {
        tl.fromTo(
          halo,
          { opacity: 0.15, scale: 1, transformOrigin: "center" },
          {
            opacity: 0.6,
            scale: 1.5,
            duration: 0.9,
            yoyo: true,
            repeat: 1,
            ease: "sine.inOut",
          },
          i * 1.7,
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <svg
      ref={rootRef}
      viewBox="0 0 320 128"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
      data-brand-motif="storyline"
      className={`h-full w-full ${variant === "hero" ? "opacity-90" : ""}`}
    >
      <g data-motif-piece stroke="var(--brand-edge)" strokeWidth="1.5">
        {stages.slice(0, -1).map((x, i) => (
          <line key={x} x1={x + 14} y1={Y} x2={stages[i + 1] - 14} y2={Y} />
        ))}
      </g>
      {stages.map((x, i) => (
        <g key={x} data-motif-piece>
          <circle
            data-halo
            cx={x}
            cy={Y}
            r="18"
            fill="var(--brand-glow)"
            opacity="0.15"
          />
          <circle
            cx={x}
            cy={Y}
            r="10"
            fill="none"
            stroke="var(--brand)"
            strokeWidth="2"
          />
          <circle cx={x} cy={Y} r="3.5" fill={i === 3 ? "var(--brand-strong)" : "var(--brand-stop-1)"} />
        </g>
      ))}
      {/* The traveling pulse; rests at publish in the static frame. */}
      <circle
        data-pulse
        cx={stages[3]}
        cy={Y}
        r="5"
        fill="var(--brand-strong)"
        opacity="0.9"
      />
    </svg>
  );
}
