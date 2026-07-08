import {
  siClaudecode,
  siCss,
  siCursor,
  siCypress,
  siDocker,
  siExpress,
  siFlask,
  siGithubactions,
  siGithubcopilot,
  siGooglecloud,
  siGraphql,
  siHasura,
  siHtml5,
  siJavascript,
  siJenkins,
  siJest,
  siLangchain,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siPm2,
  siPostgresql,
  siPrisma,
  siPuppeteer,
  siPython,
  siReact,
  siRedux,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVitest,
  siWebpack,
  type SimpleIcon,
} from "simple-icons";

// Presentation-only mapping from content-layer skill names to brand icons.
// Skills without an entry render as text-only badges (some brands were
// removed from simple-icons for trademark reasons: OpenAI, AWS, Azure,
// Oracle; others simply have no logo).
const iconsBySkill: Record<string, SimpleIcon> = {
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  Python: siPython,
  ReactJS: siReact,
  "Next.js": siNextdotjs,
  "React Native": siReact,
  Redux: siRedux,
  HTML5: siHtml5,
  CSS3: siCss,
  "Tailwind CSS": siTailwindcss,
  Webpack: siWebpack,
  "Node.js": siNodedotjs,
  GraphQL: siGraphql,
  Hasura: siHasura,
  Express: siExpress,
  Flask: siFlask,
  Prisma: siPrisma,
  PostgreSQL: siPostgresql,
  LangChain: siLangchain,
  "Vercel AI SDK": siVercel,
  "Claude Code": siClaudecode,
  Cursor: siCursor,
  "GitHub Copilot": siGithubcopilot,
  "Google Cloud": siGooglecloud,
  Nginx: siNginx,
  PM2: siPm2,
  Jenkins: siJenkins,
  "GitHub Actions": siGithubactions,
  Docker: siDocker,
  Cypress: siCypress,
  Vitest: siVitest,
  Jest: siJest,
  Puppeteer: siPuppeteer,
};

function relativeLuminance(hex: string): number {
  const [r, g, b] = [0, 2, 4].map((i) =>
    parseInt(hex.slice(i, i + 2), 16) / 255,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function skillIcon(
  skill: string,
): { path: string; color: string } | null {
  const icon = iconsBySkill[skill];
  if (!icon) return null;
  // Near-black brand marks (Vercel, Express, Cursor…) vanish on the dark
  // theme; tint those with the badge text color instead.
  return {
    path: icon.path,
    color: relativeLuminance(icon.hex) < 0.15 ? "currentColor" : `#${icon.hex}`,
  };
}
