// The Scroll Story's Sections, in story order. The sticky nav derives its
// anchors from this list; the home page renders one Section per entry.
export const sections = [
  { id: "about", label: "About", title: "About" },
  { id: "projects", label: "Projects", title: "Featured Projects" },
  { id: "skills", label: "Skills", title: "Skills" },
  { id: "career", label: "Career", title: "Career Timeline" },
  { id: "contact", label: "Contact", title: "Contact" },
] as const;
