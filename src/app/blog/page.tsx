import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Blog — Jan Cyngynn Kristoffer Frigillana",
  description:
    "Writing on AI engineering: agentic systems, AI-assisted development, and production web applications.",
};

const dateFormat = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function BlogIndexPage() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 scroll-mt-16 focus:outline-none">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Blog
        </h1>
        <p className="mt-3 text-lg text-muted">
          Writing on AI engineering and building production software.
        </p>
        <ul className="mt-12 space-y-10">
          {posts.map((post) => (
            <li key={post.slug}>
              <p className="text-xs font-medium tracking-widest text-faint uppercase">
                <time dateTime={post.date}>
                  {dateFormat.format(new Date(post.date))}
                </time>
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                <Link
                  href={`/blog/${post.slug}`}
                  className="transition-colors hover:text-muted"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-muted">{post.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
