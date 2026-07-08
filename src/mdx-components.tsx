import type { MDXComponents } from "mdx/types";

// Global MDX styling for Case Study bodies, on the site's semantic tokens.
const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mt-12 text-xl font-semibold tracking-tight text-foreground">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 font-semibold text-foreground">{children}</h3>
  ),
  p: ({ children }) => <p className="mt-4 text-muted">{children}</p>,
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">{children}</ul>
  ),
  strong: ({ children }) => (
    <strong className="font-medium text-foreground">{children}</strong>
  ),
  a: ({ children, ...props }) => (
    <a
      {...props}
      className="text-foreground underline decoration-edge-strong underline-offset-4 transition-colors hover:decoration-foreground"
    >
      {children}
    </a>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
