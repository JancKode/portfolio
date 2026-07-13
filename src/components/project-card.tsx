import Link from "next/link";
import { BrandMark } from "@/components/brand-marks";
import { CountUpStat } from "@/components/count-up-stat";
import { HoverTilt } from "@/components/hover-tilt";
import { BrandMotif } from "@/components/motifs";
import type { CaseStudy } from "@/content/case-studies";

// One Featured Project card. data-brand scopes the study's palette to the
// card, so every brand utility below resolves per-project. Feature panels
// carry the big stat; the compact pair stays short.
export function ProjectCard({
  study,
  variant,
}: {
  study: CaseStudy;
  variant: "feature" | "compact";
}) {
  const feature = variant === "feature";

  return (
    <HoverTilt>
      <Link
        href={`/work/${study.slug}`}
        data-brand={study.slug}
        className="group relative flex h-full flex-col rounded-2xl border border-edge p-6 transition-[border-color] hover:border-brand-edge focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        {/* Pointer-driven spotlight — position comes from CSS custom
            properties written by HoverTilt, not React state. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), var(--brand-glow), transparent 60%)",
          }}
        />
        {/* Abstract visual only — no product screenshots (working agreement). */}
        <div
          className={`overflow-hidden rounded-xl bg-gradient-to-br from-brand-stop-1/15 via-brand-stop-2/5 to-transparent transition-transform duration-300 group-hover:scale-[1.02] ${
            feature ? "h-36 sm:h-44" : "h-16"
          }`}
        >
          <BrandMotif slug={study.slug} variant="card" />
        </div>
        <p
          className={`mt-5 font-semibold tracking-tight text-brand ${
            feature ? "text-4xl sm:text-5xl" : "text-2xl"
          }`}
        >
          <CountUpStat stat={study.stat} />
        </p>
        <p data-stat-label className="mt-1 text-xs text-muted">
          {study.stat.label}
        </p>
        <h3 className="mt-4 flex items-center gap-2 font-semibold">
          <BrandMark slug={study.slug} className="size-4 shrink-0" />
          {study.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted">{study.tagline}</p>
        <p className="mt-4 text-xs text-faint">{study.stack.join(" · ")}</p>
      </Link>
    </HoverTilt>
  );
}
