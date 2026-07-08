import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";
import { posts } from "@/content/posts";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1 },
    ...caseStudies.map(({ slug }) => ({
      url: `${siteUrl}/work/${slug}`,
      priority: 0.8,
    })),
    { url: `${siteUrl}/blog`, priority: 0.6 },
    ...posts.map(({ slug, date }) => ({
      url: `${siteUrl}/blog/${slug}`,
      lastModified: new Date(date),
      priority: 0.6,
    })),
  ];
}
