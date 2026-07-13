"use client";

import { useMotionValue, useSpring, useMotionValueEvent } from "motion/react";
import { useRef } from "react";

const TILT_CLAMP_DEG = 2.5;

// Pointer-driven spotlight + tilt: the spotlight position is written
// straight to CSS custom properties via the DOM (no React state, no
// re-render per pixel) so it tracks the cursor at native pointer-event
// frequency. The tilt reuses that same pointer sample but runs it through a
// Motion spring, clamped to a subtle ±2.5°, and lands on ITS OWN element
// (data-tilt) — distinct from the reveal wrapper above it and the motif
// morph target inside it, so each transform has exactly one owner. Mouse
// pointers only; touch never fires hover and gets neither effect.
export function HoverTilt({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });

  useMotionValueEvent(rotateX, "change", (latest) => {
    tiltRef.current?.style.setProperty("--tilt-x", `${latest.toFixed(2)}deg`);
  });
  useMotionValueEvent(rotateY, "change", (latest) => {
    tiltRef.current?.style.setProperty("--tilt-y", `${latest.toFixed(2)}deg`);
  });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    el.style.setProperty("--spotlight-x", `${x * 100}%`);
    el.style.setProperty("--spotlight-y", `${y * 100}%`);

    // Spotlight is a color wash, not motion — it stays for reduced-motion
    // visitors. Tilt is rotation and is the part the PRD requires gated.
    if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      rotateX.set((0.5 - y) * 2 * TILT_CLAMP_DEG);
      rotateY.set((x - 0.5) * 2 * TILT_CLAMP_DEG);
    }
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative h-full"
      style={{ perspective: 1000 }}
    >
      <div
        ref={tiltRef}
        data-tilt
        className="h-full"
        style={{
          transform:
            "rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );
}
