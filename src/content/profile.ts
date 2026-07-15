// Content layer: CV-derived profile facts. Presentation components read from
// here; no CV fact is hardcoded in a component.
export const profile = {
  name: "Jan Cyngynn Kristoffer Frigillana",
  role: "Senior Software Engineer",
  focus: "AI Systems & Automation",
  email: "rso.janc@gmail.com",
  githubUrl: "https://github.com/JancKode",
  linkedinUrl: "https://www.linkedin.com/in/jan-cyngynn-frigillana-299582143",
  cvPath: "/JCKFrigillana_CV.pdf",
  about: [
    "Full Stack Senior Software Engineer with 9+ years building production web applications across aviation, fintech, SaaS, supply chain, and workforce management.",
    "Works in AI-assisted development daily with Claude Code, Cursor, and GitHub Copilot, keeping planning, architecture, and code review human-led while delegating implementation to AI for fast, reviewable output without sacrificing quality.",
    "Has shipped AI-powered features in real products with OpenAI, LangChain, Vercel AI SDK, and Mastra AI. Four years at Emirates Group set the standard: clean code, rigorous reviews, structured testing.",
  ],
} as const;
