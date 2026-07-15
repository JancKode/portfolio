"use client";

import { useLayoutEffect } from "react";

// The home page's CSS scroll-behavior: smooth also applies to the router's
// scroll-to-top on route transitions, so a Case Study opened from the
// Projects Section visibly glides up from the old scroll offset. Jump to
// the top instantly, before first paint, instead.
export function InstantScrollTop() {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    // A smooth anchor glide from the Projects Section can still be in flight
    // during the soft navigation, and the router's own scroll-to-top runs
    // after this effect. Reaffirm on the next frame so a Case Study opened
    // from a lower card never settles mid-glide.
    const id = requestAnimationFrame(() =>
      window.scrollTo({ top: 0, behavior: "instant" }),
    );
    return () => cancelAnimationFrame(id);
  }, []);
  return null;
}
