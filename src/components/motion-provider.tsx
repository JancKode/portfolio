"use client";

import { MotionConfig } from "motion/react";

// Site-wide reduced-motion compliance for Motion-driven animation: transform
// and layout animations are disabled for motion-sensitive visitors, while
// fades are kept as the simplified reveal. (GSAP handles its own compliance
// via gsap.matchMedia; the CSS transform guard in globals.css covers the
// pre-hydration markup.)
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
