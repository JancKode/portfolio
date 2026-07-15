// Content layer: CV-derived career history, reverse-chronological.
// Presentation components read from here; no CV fact is hardcoded in a
// component.
export const careerRoles = [
  {
    company: 'Storyline',
    title: 'Senior Full Stack Developer',
    period: 'Jul 2025 – Present',
    summary:
      'AI-native SEO & AEO platform. Architected multi-step Mastra AI agent workflows, built the BullMQ background pipeline, and set up blue-green deploys with GitHub Actions CI/CD on AWS.',
  },
  {
    company: 'Cloud Employee, Data Lighthouse (akeno.ai)',
    title: 'Senior Full Stack Developer',
    period: 'Sep 2021 – Sep 2025',
    summary:
      'Supply chain traceability platform. Built the AI assistant with OpenAI and LangChain, real-time Hasura GraphQL subscriptions, and complex AG Grid & Bryntum scheduling views.',
  },
  {
    company: 'Accenture',
    title: 'Application Development Team Lead',
    period: 'Feb 2021 – Sep 2021',
    summary:
      'Led a team of 5+ developers on the AICPA Spanish Hub in a SAFe Agile setup, running sprint planning, client updates, and code and performance reviews.',
  },
  {
    company: 'Outliant',
    title: 'React Native Developer',
    period: 'Jun 2020 – Feb 2021',
    summary:
      "Built The Sandlot's mobile UI in React Native from Figma designs, consistent across iOS and Android, with AWS service integrations.",
  },
  {
    company: '4Loop',
    title: 'R&D Engineer / Senior Software Engineer',
    period: 'Sep 2019 – Jun 2020',
    summary:
      'Full-stack e-commerce features across a React frontend and Flask/PostgreSQL backend, with documented R&D phases.',
  },
  {
    company: 'Four13',
    title: 'Full Stack Developer',
    period: 'Jan 2019 – Jan 2020',
    summary:
      'Reusable React component libraries for the COI Tracker insurance SaaS, with Jest unit tests covering the core logic.',
  },
  {
    company: 'DXC Technologies, Emirates Group',
    title: 'Professional Program Analyst (Software Engineer)',
    period: 'Nov 2014 – Sep 2018',
    summary:
      'Emirates Group revenue accounting: interline sales, tax computation, proration, and cargo processing. Multiple Najm Awards; 2nd place, Emirates Big Data Hackathon 2017.',
  },
] as const;
