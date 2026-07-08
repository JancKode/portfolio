import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/content/posts";
import { InstantScrollTop } from "@/components/instant-scroll-top";

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

const dateFormat = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug)!;
  return {
    title: `${post.title} — Jan Cyngynn Kristoffer Frigillana`,
    description: post.summary,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug)!;
  const { default: Body } = await import(`@/content/posts/${slug}.mdx`);

  return (
    <main id="main" tabIndex={-1} className="flex-1 scroll-mt-16 focus:outline-none">
      <InstantScrollTop />
      <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <Link
          href="/blog"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          ← All posts
        </Link>
        <p className="mt-8 text-xs font-medium tracking-widest text-faint uppercase">
          <time dateTime={post.date}>
            {dateFormat.format(new Date(post.date))}
          </time>
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-lg text-muted">{post.summary}</p>
        <div className="mt-4">
          <Body />
        </div>
      </article>
    </main>
  );
}
