import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { sections } from "@/content/sections";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      {sections.filter((section) => section.id !== "contact").map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="mx-auto max-w-5xl scroll-mt-16 px-6 py-24"
        >
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {section.title}
          </h2>
          <p className="mt-4 text-zinc-500">Coming soon.</p>
        </section>
      ))}
      <Contact />
    </main>
  );
}
