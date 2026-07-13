"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

// Emirates Group: flight arcs rising over a ledger grid — interline sales
// crossing the revenue books. The server frame shows all routes drawn.
const arcs = [
  { d: "M20 108 Q 90 18 240 30", stroke: "var(--brand-stop-1)", width: 2 },
  { d: "M48 108 Q 150 34 292 52", stroke: "var(--brand-stop-2)", width: 1.8 },
  { d: "M84 108 Q 190 58 306 78", stroke: "var(--brand)", width: 1.4 },
];

export function EmiratesMotif({ variant }: { variant: "card" | "hero" }) {
  const rootRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      for (const [i, path] of [
        ...root.querySelectorAll<SVGPathElement>("[data-arc]"),
      ].entries()) {
        const length = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 5,
            ease: "power1.inOut",
            repeat: -1,
            repeatDelay: 3,
            delay: i * 0.9,
          },
        );
      }
      gsap.to(root.querySelectorAll("[data-arrival]"), {
        opacity: 0.3,
        duration: 1.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.5,
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
      data-brand-motif="emirates-group"
      className={`h-full w-full ${variant === "hero" ? "opacity-90" : ""}`}
    >
      {/* Ledger grid */}
      <g data-motif-piece stroke="var(--brand-edge)" strokeWidth="0.75">
        {[32, 57, 82, 107].map((y) => (
          <line key={y} x1="8" y1={y} x2="312" y2={y} opacity="0.35" />
        ))}
        {[64, 128, 192, 256].map((x) => (
          <line key={x} x1={x} y1="20" x2={x} y2="108" opacity="0.2" />
        ))}
      </g>
      <g data-motif-piece fill="none" strokeLinecap="round">
        {arcs.map((arc) => (
          <path
            key={arc.d}
            data-arc
            d={arc.d}
            stroke={arc.stroke}
            strokeWidth={arc.width}
          />
        ))}
      </g>
      <g data-motif-piece fill="var(--brand)">
        <circle data-arrival cx="240" cy="30" r="3.5" />
        <circle data-arrival cx="292" cy="52" r="3" fill="var(--brand-stop-2)" />
        <circle data-arrival cx="306" cy="78" r="2.5" />
      </g>
    </svg>
  );
}
