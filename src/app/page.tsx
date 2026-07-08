import { About } from "@/components/about";
import { CareerTimeline } from "@/components/career-timeline";
import { Contact } from "@/components/contact";
import { FeaturedProjects } from "@/components/featured-projects";
import { Hero } from "@/components/hero";
import { Skills } from "@/components/skills";
import { profile } from "@/content/profile";
import { siteUrl } from "@/content/site";

// JSON-LD Person schema so Jan ranks for his own name (PRD user story 22).
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: `${profile.role} (${profile.focus})`,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  sameAs: [profile.githubUrl, profile.linkedinUrl],
};

export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 scroll-mt-16 focus:outline-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <About />
      <FeaturedProjects />
      <Skills />
      <CareerTimeline />
      <Contact />
    </main>
  );
}
