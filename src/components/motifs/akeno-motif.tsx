"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

// akeno.ai: a trace drawing itself through a supply-chain network. The
// server frame is the completed trace across the full network.
const nodes: Array<[number, number]> = [
  [24, 96],
  [78, 40],
  [128, 84],
  [176, 28],
  [222, 72],
  [270, 44],
  [300, 92],
];
// Which node pairs carry faint background edges.
const edges: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 3],
  [2, 4],
  [3, 5],
  [4, 5],
  [4, 6],
  [5, 6],
];
// The traced route through the chain.
const trace = [0, 2, 4, 5];

export function AkenoMotif({ variant }: { variant: "card" | "hero" }) {
  const rootRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const path = root.querySelector<SVGPathElement>("[data-trace]");
      if (!path) return;
      const length = path.getTotalLength();
      // Draw the trace, hold the complete frame, retrace. Dash only.
      gsap.fromTo(
        path,
        { strokeDasharray: length, strokeDashoffset: length },
        {
          strokeDashoffset: 0,
          duration: 4.5,
          ease: "power1.inOut",
          repeat: -1,
          repeatDelay: 2.4,
        },
      );
      gsap.to(root.querySelector("[data-trace-head]"), {
        opacity: 0.35,
        duration: 1.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    });

    return () => mm.revert();
  }, []);

  const tracePath = trace
    .map((nodeIndex, i) => {
      const [nx, ny] = nodes[nodeIndex];
      return `${i === 0 ? "M" : "L"}${nx} ${ny}`;
    })
    .join(" ");

  return (
    <svg
      ref={rootRef}
      viewBox="0 0 320 128"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
      data-brand-motif="akeno-ai"
      className={`h-full w-full ${variant === "hero" ? "opacity-90" : ""}`}
    >
      <g data-motif-piece stroke="var(--brand-edge)" strokeWidth="1" opacity="1">
        {edges.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
            opacity="0.5"
          />
        ))}
      </g>
      <g data-motif-piece>
        {nodes.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={trace.includes(i) ? 5 : 3.5}
            fill={trace.includes(i) ? "var(--brand)" : "none"}
            stroke={trace.includes(i) ? "none" : "var(--brand-stop-1)"}
            strokeWidth="1.5"
          />
        ))}
      </g>
      <path
        data-trace
        data-motif-piece
        d={tracePath}
        fill="none"
        stroke="var(--brand)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Destination marker, apricot accent from the real landing page. */}
      <circle
        data-trace-head
        cx={nodes[trace[trace.length - 1]][0]}
        cy={nodes[trace[trace.length - 1]][1]}
        r="9"
        fill="none"
        stroke="var(--brand-stop-2)"
        strokeWidth="2"
      />
    </svg>
  );
}
