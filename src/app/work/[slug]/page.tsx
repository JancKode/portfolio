import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "@/content/case-studies";
import { BrandMark } from "@/components/brand-marks";
import { InstantScrollTop } from "@/components/instant-scroll-top";
import { BrandMotif } from "@/components/motifs";

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
    <main
      id="main"
      tabIndex={-1}
      className="flex-1 scroll-mt-16 focus:outline-none"
      data-brand={slug}
    >
      <InstantScrollTop />
      <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <Link
          href="/#projects"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          ← All projects
        </Link>
        {/* Abstract visual only — no product screenshots (working agreement). */}
        <div className="mt-8 h-32 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-stop-1/20 via-brand-stop-2/8 to-transparent sm:h-40">
          <BrandMotif slug={slug} variant="hero" />
        </div>
        <div className="mt-8 flex items-center gap-3 text-brand">
          <BrandMark slug={slug} className="size-7 shrink-0" />
          <p className="text-xs font-medium tracking-widest uppercase">
            {study.period}
          </p>
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {study.title}
        </h1>
        <p className="mt-3 text-lg text-muted">{study.tagline}</p>
        <a
          href={study.landing.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-edge bg-brand-surface px-4 py-2 text-sm font-medium text-brand transition-colors hover:text-brand-strong"
        >
          {study.landing.label}
          <span aria-hidden>↗</span>
        </a>
        <div className="mt-4">
          <Study />
        </div>
      </article>
    </main>
  );
}
