import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getPrograms } from "@/lib/programs-store";
import { getPosts } from "@/lib/blog-store";
import { getProjects } from "@/lib/projects-store";

// Content is refreshed periodically so externally stored content remains
// visible in the sitemap without requiring a new deployment.
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const lastModified = new Date();
  const [projects, posts, programs] = await Promise.all([
    getProjects().catch(() => []),
    getPosts().catch(() => []),
    getPrograms().catch(() => []),
  ]);
  const hajjPrograms = programs.filter((p) => p.type === "hajj");
  const umrahPrograms = programs.filter((p) => p.type === "umrah");

  const paths = [
    "",
    "/about",
    "/services",
    "/hajj",
    "/hajj/programs",
    ...hajjPrograms.map((program) => `/hajj/programs/${program.slug}`),
    "/hajj/guide",
    "/hajj/documents",
    "/umrah",
    "/umrah/programs",
    ...umrahPrograms.map((program) => `/umrah/programs/${program.slug}`),
    "/umrah/guide",
    "/umrah/documents",
    "/makkah",
    "/madinah",
    "/blog",
    ...posts.map((post) => `/blog/${post.slug}`),
    "/projects",
    ...projects.map((project) => `/projects/${project.slug}`),
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
    "/cancellation",
  ];

  return paths.map((path) => ({ url: `${baseUrl}${path}`, lastModified }));
}
