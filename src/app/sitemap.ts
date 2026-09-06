import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getPrograms } from "@/lib/programs-store";
import { getPosts } from "@/lib/blog-store";

const staticPages = [
  { path: "", priority: 1 },
  { path: "/about", priority: 0.7 },
  { path: "/services", priority: 0.8 },
  { path: "/hajj", priority: 0.9 },
  { path: "/hajj/programs", priority: 0.9 },
  { path: "/hajj/guide", priority: 0.8 },
  { path: "/hajj/documents", priority: 0.7 },
  { path: "/umrah", priority: 0.9 },
  { path: "/umrah/programs", priority: 0.9 },
  { path: "/umrah/guide", priority: 0.8 },
  { path: "/umrah/documents", priority: 0.7 },
  { path: "/makkah", priority: 0.8 },
  { path: "/madinah", priority: 0.8 },
  { path: "/blog", priority: 0.8 },
  { path: "/projects", priority: 0.6 },
  { path: "/contact", priority: 0.7 },
  { path: "/faq", priority: 0.7 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
  { path: "/cancellation", priority: 0.3 },
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const [posts, programs] = await Promise.all([getPosts(), getPrograms()]);
  const hajjPrograms = programs.filter((p) => p.type === "hajj");
  const umrahPrograms = programs.filter((p) => p.type === "umrah");
  const entries = [
    ...staticPages,
    ...hajjPrograms.map((program) => ({
      path: `/hajj/programs/${program.slug}`,
      priority: 0.7,
    })),
    ...umrahPrograms.map((program) => ({
      path: `/umrah/programs/${program.slug}`,
      priority: 0.7,
    })),
    ...posts.map((post) => ({ path: `/blog/${post.slug}`, priority: 0.6 })),
  ];

  return entries.map(({ path, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency: path === "" || path === "/contact" ? "monthly" : "yearly",
    priority,
  }));
}
