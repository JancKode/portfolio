"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

// MatterWorx: scattered source nodes converging into one hub. The static
// server frame is the full network of faint edges, source nodes, and the
// central hub. With motion, bright pulses travel inward along each edge and
// the hub pulses as they arrive: many disconnected tools becoming one
// platform.
const hub: [number, number] = [252, 64];
const sources: Array<[number, number]> = [
  [28, 26],
  [28, 64],
  [28, 102],
  [96, 40],
  [96, 88],
];

export function MatterworxMotif({ variant }: { variant: "card" | "hero" }) {
  const rootRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const flows = root.querySelectorAll<SVGPathElement>("[data-flow]");
      flows.forEach((flow, i) => {
        const length = flow.getTotalLength();
        // A short bright segment travelling from the source toward the hub,
        // staggered so the streams arrive out of step.
        gsap.set(flow, { opacity: 1, strokeDasharray: `14 ${length}` });
        gsap.fromTo(
          flow,
          { strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 2.2,
            ease: "power1.in",
            repeat: -1,
            repeatDelay: 1,
            delay: i * 0.35,
          },
        );
      });

      gsap.to(root.querySelector("[data-hub-ring]"), {
        opacity: 0.3,
        scale: 1.18,
        transformOrigin: "center",
        duration: 1.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
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
      data-brand-motif="matterworx"
      className={`h-full w-full ${variant === "hero" ? "opacity-90" : ""}`}
    >
      <g data-motif-piece stroke="var(--brand-edge)" strokeWidth="1">
        {sources.map(([x, y], i) => (
          <line key={i} x1={x} y1={y} x2={hub[0]} y2={hub[1]} opacity="0.5" />
        ))}
      </g>
      {/* Bright inbound pulses, hidden until motion wires them up. */}
      <g fill="none" stroke="var(--brand)" strokeWidth="2.5" strokeLinecap="round">
        {sources.map(([x, y], i) => (
          <path key={i} data-flow d={`M${x} ${y} L${hub[0]} ${hub[1]}`} opacity="0" />
        ))}
      </g>
      <g data-motif-piece>
        {sources.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="3.5"
            fill="none"
            stroke="var(--brand-stop-1)"
            strokeWidth="1.5"
          />
        ))}
      </g>
      <g data-motif-piece>
        {/* Pulsing ring around the hub, apricot-free accent from stop-2. */}
        <circle
          data-hub-ring
          cx={hub[0]}
          cy={hub[1]}
          r="12"
          fill="none"
          stroke="var(--brand-stop-2)"
          strokeWidth="2"
        />
        <circle cx={hub[0]} cy={hub[1]} r="6.5" fill="var(--brand)" />
      </g>
    </svg>
  );
}
