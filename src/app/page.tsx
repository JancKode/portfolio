import { About } from "@/components/about";
import { CareerTimeline } from "@/components/career-timeline";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Skills } from "@/components/skills";
import { sections } from "@/content/sections";

// Placeholder for Sections still awaiting their slice.
function SectionStub({ id }: { id: (typeof sections)[number]["id"] }) {
  const section = sections.find((s) => s.id === id)!;
  return (
    <section id={id} className="mx-auto max-w-5xl scroll-mt-16 px-6 py-24">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {section.title}
      </h2>
      <p className="mt-4 text-zinc-500">Coming soon.</p>
    </section>
  );
}

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <About />
      <SectionStub id="projects" />
      <Skills />
      <CareerTimeline />
      <Contact />
    </main>
  );
}
