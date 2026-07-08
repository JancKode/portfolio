"use client";

import { useLayoutEffect } from "react";

// The home page's CSS scroll-behavior: smooth also applies to the router's
// scroll-to-top on route transitions, so a Case Study opened from the
// Projects Section visibly glides up from the old scroll offset. Jump to
// the top instantly, before first paint, instead.
export function InstantScrollTop() {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return null;
}
