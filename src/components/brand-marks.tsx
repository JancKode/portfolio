import type { ReactNode } from "react";

// Server-safe brand marks, keyed by Case Study slug. Monochrome shapes in
// currentColor so they sit quietly in both themes; decorative (aria-hidden)
// since the headings carry the accessible names. No full-color logo assets
// (working agreement).
const marks: Record<string, ReactNode> = {
  // Story lines with a spark: drafts converging into published content.
  storyline: (
    <>
      <path d="M4 7h10" />
      <path d="M4 12h16" />
      <path d="M4 17h8" />
      <path d="m17.5 4 0.9 2.1L20.5 7l-2.1 0.9-0.9 2.1-0.9-2.1L14.5 7l2.1-0.9Z" />
    </>
  ),
  // A trace drawn through three supply-chain nodes.
  "akeno-ai": (
    <>
      <circle cx="5" cy="18" r="2" />
      <circle cx="12" cy="6.5" r="2" />
      <circle cx="19" cy="15.5" r="2" />
      <path d="m6 16.3 5-8" />
      <path d="m13.1 8.1 4.8 5.7" />
      <path d="M7 18.6h10" />
    </>
  ),
  // A flight arc rising off a ledger baseline.
  "emirates-group": (
    <>
      <path d="M3 19h18" />
      <path d="M7 19v-1.5M12 19v-1.5M17 19v-1.5" />
      <path d="M5 15c2-6 8-10 14-10" />
      <circle cx="19.5" cy="5" r="1.5" />
    </>
  ),
  // A reviewed ledger line: audit checkmark inside a document frame.
  aicpa: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h5M8 12h8" />
      <path d="m8.5 16 2 2 5-5" />
    </>
  ),
};

export function BrandMark({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const shape = marks[slug];
  if (!shape) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      data-brand-mark
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {shape}
    </svg>
  );
}
