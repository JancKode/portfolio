---
name: verify
description: Build, launch, and drive this portfolio app for runtime verification. Use when verifying a slice end-to-end before committing.
---

# Verifying jckfrigillana.dev

Surface: rendered pages in a browser (GUI). Port **3100** — port 3000 is
occupied by an unrelated dev server; never kill it.

## Build & launch (production)

```bash
npm run build
npm run start -- --port 3100 &   # serves in ~2s; curl http://localhost:3100/ to confirm
```

For fast red→green iteration use `npm run dev -- --port 3100` instead;
Playwright's config reuses whatever is on 3100. Always do the final
verification pass against the production build.

## Drive

Script Playwright directly (not the test suite — that's CI's job).
Gotcha: a standalone `.mjs` script must resolve `@playwright/test` via
`createRequire("<repo>/package.json")` — plain imports fail outside the repo.

Flows worth driving: hero entrance settles (~1.5s wait before screenshots),
sticky nav after full scroll (`boundingBox().y === 0`), anchor clicks land
sections in viewport, CV download via `waitForEvent("download")` (check
`%PDF-` magic bytes), contact link hrefs, deep-link `/#contact`,
`reducedMotion: "reduce"` context, 390px viewport.

## Known gotchas

- Hero content is server-rendered at `opacity: 0` (motion entrance);
  no-JS visitors see a blank hero. Playwright's `isVisible()` returns
  true anyway — check computed opacity when this matters.
- Next 16 refuses to start a second `next dev` for this directory
  ("Another next dev server is already running" + PID). Kill the PID it
  names — that one is ours; the port-3000 server is a different app.
- Never add `data-scroll-behavior="smooth"` to `<html>`: Next 16 then
  forces instant scrolling on hash Link clicks, killing the nav glide.
  To observe the glide, sample `window.scrollY` every ~60ms after a nav
  click — expect eased intermediate values (instant under
  `reducedMotion: "reduce"`).
