// Presentation-only: each Case Study's abstract visual identity. Cards and
// Case Study pages share the same gradient so the transition reads as one
// object.
const gradients: Record<string, string> = {
  storyline: "from-indigo-500/40 via-sky-500/20 to-transparent",
  "akeno-ai": "from-emerald-500/35 via-teal-500/15 to-transparent",
  "emirates-group": "from-rose-500/35 via-amber-500/15 to-transparent",
  aicpa: "from-violet-500/35 via-fuchsia-500/15 to-transparent",
};

export function projectGradient(slug: string): string {
  return gradients[slug] ?? gradients.storyline;
}
