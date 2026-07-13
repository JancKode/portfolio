"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

// AICPA Spanish Hub: a ledger being audited row by row — the review
// discipline from the case study (routine code and performance reviews,
// coaching junior developers) rendered as an accounting ledger getting
// checked off. The server frame is the completed audit: every row checked.
const rows = [30, 54, 78, 102];
const gridLeft = 24;
const gridRight = 296;

export function AicpaMotif({ variant }: { variant: "card" | "hero" }) {
  const rootRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.8 });
      const checks = [...root.querySelectorAll("[data-check]")];
      const highlights = [...root.querySelectorAll("[data-row-highlight]")];

      // Rows land checked, top to bottom, then hold the complete audit
      // before the next pass. Opacity/scale only.
      checks.forEach((check, i) => {
        tl.fromTo(
          check,
          { opacity: 0, scale: 0.4, transformOrigin: "center" },
          { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" },
          i * 0.5,
        );
        tl.fromTo(
          highlights[i],
          { opacity: 0.5 },
          { opacity: 0, duration: 0.6, ease: "power1.out" },
          i * 0.5,
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <svg
      ref={rootRef}
      viewBox="0 0 320 128"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
      data-brand-motif="aicpa"
      className={`h-full w-full ${variant === "hero" ? "opacity-90" : ""}`}
    >
      {/* Ledger frame */}
      <g data-motif-piece stroke="var(--brand-edge)" strokeWidth="1.25">
        <rect
          x={gridLeft}
          y="20"
          width={gridRight - gridLeft}
          height="88"
          rx="4"
          fill="none"
          opacity="0.5"
        />
        <line x1="96" y1="20" x2="96" y2="108" opacity="0.35" />
      </g>
      {/* Ledger rows: a label column and a value column */}
      <g data-motif-piece stroke="var(--brand-edge)" strokeWidth="1">
        {rows.map((y) => (
          <line key={y} x1={gridLeft} y1={y} x2={gridRight} y2={y} opacity="0.3" />
        ))}
      </g>
      <g data-motif-piece fill="var(--brand-edge)">
        {rows.map((y) => (
          <rect key={y} x="40" y={y - 15} width="40" height="6" rx="2" opacity="0.6" />
        ))}
      </g>
      {/* Row highlight sweeps out as each row is checked — a transient
          animation cue, not part of the designed complete frame, so it
          sits outside data-motif-piece (that contract requires opacity 1
          at rest). */}
      <g>
        {rows.map((y) => (
          <rect
            key={y}
            data-row-highlight
            x={gridLeft + 1}
            y={y - 22}
            width={gridRight - gridLeft - 2}
            height="21"
            fill="var(--brand-glow)"
            opacity="0"
          />
        ))}
      </g>
      {/* Audit checkmarks, one per row, landed in the value column */}
      <g
        data-motif-piece
        stroke="var(--brand)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {rows.map((y) => (
          <path key={y} data-check d={`M186 ${y - 20} l7 7 13-14`} />
        ))}
      </g>
    </svg>
  );
}
