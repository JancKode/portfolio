# 0001 — Scroll Story first, WebGL Hero Accent deferred

Date: 2026-07-08
Status: accepted

## Context

The portfolio targets recruiters and hiring managers first (senior full-time roles), with personal-brand visibility second. Jan wanted both an animated scroll experience and a 3D/WebGL element. A full 3D-centric site (Three.js world, 3D project panels) maximises wow but is slow to build, heavy on mobile, and risks frustrating recruiters who need to qualify a candidate in seconds.

## Decision

Build the site as a Scroll Story — clean typographic layout with scroll-triggered choreography (Motion for micro-interactions, GSAP ScrollTrigger for scroll-linked animation) — and ship it **without** WebGL. Defer 3D to a single contained **Hero Accent**: a lazy-loaded react-three-fiber element mounted in a slot reserved in the Hero from day one, rendered only on desktop with `prefers-reduced-motion: no-preference`, falling back to the static gradient elsewhere.

## Consequences

- The site is launchable, fast, and recruiter-friendly before any 3D work starts.
- The Hero must reserve a mount point now so adding the Accent later needs no restructuring.
- 3D ambition is capped at one accent; anything more (3D skills sphere, 3D project panels) needs a new ADR.
- Animation stack is fixed as Motion + GSAP; introducing another animation library needs justification.
