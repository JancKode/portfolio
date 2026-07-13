# Coding Standards

These are the conventions this codebase actually follows, written down so they stay consistent as the project grows. They describe existing practice, not aspirations — if you find code that violates one of these, that's a bug in the code, not the rule.

## File naming

Kebab-case for every file: `project-card.tsx`, `case-studies.ts`, `hover-tilt.tsx`. No PascalCase or camelCase filenames.

## Component exports

Use named exports for components: `export function Hero() {}`.

The one exception is Next.js App Router files where the framework requires a default export — `page.tsx`, `layout.tsx`, route handlers. Everywhere else, named exports only.

## Prop typing

Type props inline at the function signature, not as a separate `interface Props` or `type Props`:

```tsx
export function ProjectCard({
  study,
  variant,
}: {
  study: CaseStudy;
  variant: "feature" | "compact";
}) {}
```

## Client vs. server components

Omit `"use client"` by default. Add it only when the component actually needs state, hooks, or client-side motion/interactivity (see `hero.tsx`, `theme-provider.tsx`, `career-timeline.tsx`, `theme-toggle.tsx`). Everything else stays a server component.

## Styling

Tailwind utility classes in JSX, exclusively. `globals.css` is reserved for CSS custom-property theme tokens and global resets — not component styling. No CSS Modules, no ad hoc `<style>` blocks.

## Imports

External packages first, then `@/`-aliased internal imports, alphabetized by module path within each group. Use `import type` for type-only imports.

```ts
import Link from "next/link";
import { BrandMark } from "@/components/brand-marks";
import { CountUpStat } from "@/components/count-up-stat";
import type { CaseStudy } from "@/content/case-studies";
```

## Comments

Reserve comments for non-obvious rationale: hidden constraints, workarounds, or decisions worth citing back to an ADR, issue, or working agreement. Don't restate what the code already says.

## TypeScript

`strict` mode is load-bearing — don't weaken it locally. No `as any`, no unjustified `// @ts-ignore`.

## Testing

See `CONTEXT.md`'s **Seam** definition — Playwright driving rendered pages is the only sanctioned test boundary. Never test component internals or animation state directly.

## Linting

`eslint-config-next` (`core-web-vitals` + `typescript` presets) via `npm run lint` is the enforcement source of truth. No Prettier or other formatter is configured — formatting consistency is a matter of following the conventions above, not automated tooling.
