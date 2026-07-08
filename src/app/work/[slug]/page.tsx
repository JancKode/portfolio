import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "@/content/case-studies";
import { InstantScrollTop } from "@/components/instant-scroll-top";
import { projectGradient } from "@/components/project-gradients";

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug)!;
  return {
    title: `${study.title} — Case Study — Jan Cyngynn Kristoffer Frigillana`,
    description: study.tagline,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug)!;
  const { default: Study } = await import(
    `@/content/case-studies/${slug}.mdx`
  );

  return (
    <main className="flex-1">
      <InstantScrollTop />
      <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <Link
          href="/#projects"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          ← All projects
        </Link>
        {/* Abstract visual only — no product screenshots (working agreement). */}
        <div
          aria-hidden
          className={`mt-8 h-32 rounded-2xl bg-gradient-to-br sm:h-40 ${projectGradient(slug)}`}
        />
        <p className="mt-8 text-xs font-medium tracking-widest text-faint uppercase">
          {study.period}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {study.title}
        </h1>
        <p className="mt-3 text-lg text-muted">{study.tagline}</p>
        <div className="mt-4">
          <Study />
        </div>
      </article>
    </main>
  );
}
