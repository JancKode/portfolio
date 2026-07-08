// Content layer: published blog posts, newest first. Index copy and post
// headers read from here; the long-form body lives in the matching MDX file
// under posts/<slug>.mdx.
export const posts = [
  {
    slug: "human-led-ai-assisted-development",
    title: "Human-Led, AI-Assisted: How I Ship Production Code with Agents",
    summary:
      "The working agreement behind my daily AI-assisted workflow: planning, architecture, and review stay human-led while agents handle implementation.",
    date: "2026-07-09",
  },
] as const;

export type Post = (typeof posts)[number];
