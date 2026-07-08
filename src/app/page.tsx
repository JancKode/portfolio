import { About } from "@/components/about";
import { CareerTimeline } from "@/components/career-timeline";
import { Contact } from "@/components/contact";
import { FeaturedProjects } from "@/components/featured-projects";
import { Hero } from "@/components/hero";
import { Skills } from "@/components/skills";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <About />
      <FeaturedProjects />
      <Skills />
      <CareerTimeline />
      <Contact />
    </main>
  );
}
