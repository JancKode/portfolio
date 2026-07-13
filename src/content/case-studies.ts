// Content layer: the four flagship Case Studies, CV-derived. Card copy and
// page headers read from here; the long-form body lives in the matching
// MDX file under case-studies/<slug>.mdx. Landing links appear only on
// Case Study pages, never on the cards (working agreement).
export const caseStudies = [
  {
    slug: "storyline",
    title: "Storyline",
    tagline:
      "An agentic marketing engine that writes, fact-checks, and publishes SEO content for the AI-answer era.",
    period: "2025 – Present",
    stack: ["Next.js", "Mastra AI", "Vercel AI SDK", "OpenAI", "BullMQ", "AWS"],
    stat: { display: "days → hours", label: "content pipeline turnaround" },
    landing: { href: "https://withstoryline.com", label: "withstoryline.com" },
  },
  {
    slug: "akeno-ai",
    title: "akeno.ai",
    tagline:
      "A supply chain traceability platform with an AI assistant that answers questions over live operational data.",
    period: "2021 – 2025",
    stack: ["Next.js", "GraphQL", "Hasura", "OpenAI", "LangChain", "Azure"],
    stat: {
      display: "4 years",
      countTo: 4,
      suffix: " years",
      label: "in production",
    },
    landing: { href: "https://akeno.ai", label: "akeno.ai" },
  },
  {
    slug: "emirates-group",
    title: "Emirates Group",
    tagline:
      "Revenue accounting at airline scale — interline sales, tax computation, and proration.",
    period: "2014 – 2018",
    stack: ["React", "Node.js", "REST & SOAP", "Jenkins", "Big Data"],
    stat: { display: "revenue accounting", label: "at airline scale" },
    // Internal product — the link is the company site, labeled as such.
    landing: {
      href: "https://www.emirates.com",
      label: "Company site — emirates.com",
    },
  },
  {
    slug: "aicpa",
    title: "AICPA Spanish Hub",
    tagline:
      "Leading a 5+ developer team delivering AICPA's Spanish-language member platform.",
    period: "2021",
    stack: ["React Native", "GraphQL", "AWS", "Salesforce"],
    stat: { display: "5+", countTo: 5, suffix: "+", label: "developers led" },
    landing: { href: "https://www.aicpa-cima.com", label: "aicpa-cima.com" },
  },
] as const;

export type CaseStudy = (typeof caseStudies)[number];
