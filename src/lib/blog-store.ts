import { put, head } from "@vercel/blob";
import { posts as seedPosts, type BlogPost, type BlogLink } from "./blog-posts";

export type { BlogPost, BlogLink };

const MANIFEST_KEY = "blog/manifest.json";

function slugify(title: string, existingSlugs: string[]): string {
  const base =
    title
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\p{L}\p{N}-]/gu, "")
      .toLowerCase() || "article";

  let slug = base;
  let attempt = 2;
  while (existingSlugs.includes(slug)) {
    slug = `${base}-${attempt}`;
    attempt += 1;
  }
  return slug;
}

/**
 * There is no database in this project. The manifest is one JSON file in
 * Vercel Blob storage, seeded once from the 54 articles that were hand-written
 * into blog-posts.ts — that file stays in the repo untouched as the permanent
 * seed/fallback, but once the manifest exists it (not the static file) is the
 * live source every page reads from when a Blob manifest is available.
 */
async function readManifest(): Promise<BlogPost[]> {
  try {
    const info = await head(MANIFEST_KEY);
    const response = await fetch(info.url, { cache: "no-store" });
    if (!response.ok) return seedPosts;
    const data = await response.json();
    return Array.isArray(data) && data.length > 0
      ? (data as BlogPost[])
      : seedPosts;
  } catch {
    // No manifest yet — seed it from the static articles when storage is available.
    await writeManifest(seedPosts).catch(() => {});
    return seedPosts;
  }
}

async function writeManifest(posts: BlogPost[]) {
  await put(MANIFEST_KEY, JSON.stringify(posts, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function getPosts(): Promise<BlogPost[]> {
  return readManifest();
}

export async function getPostBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  const posts = await readManifest();
  return posts.find((post) => post.slug === slug);
}

export async function createPost(
  input: Omit<BlogPost, "slug"> & { slug?: string },
): Promise<BlogPost> {
  const posts = await readManifest();
  const slug =
    input.slug ||
    slugify(
      input.title,
      posts.map((p) => p.slug),
    );

  const post: BlogPost = { ...input, slug };
  posts.push(post);
  await writeManifest(posts);
  return post;
}

export async function updatePost(
  slug: string,
  input: Omit<BlogPost, "slug">,
): Promise<BlogPost> {
  const posts = await readManifest();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) throw new Error("المقال غير موجود.");

  const updated: BlogPost = { ...input, slug };
  posts[index] = updated;
  await writeManifest(posts);
  return updated;
}

export async function deletePost(slug: string): Promise<void> {
  const posts = await readManifest();
  const remaining = posts.filter((p) => p.slug !== slug);
  await writeManifest(remaining);
}

/** Validates and coerces post input into a well-shaped post body. */
export function sanitizePostInput(
  body: unknown,
): Omit<BlogPost, "slug"> | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;

  const title = typeof b.title === "string" ? b.title.trim() : "";
  const excerpt = typeof b.excerpt === "string" ? b.excerpt.trim() : "";
  if (!title || !excerpt) return null;

  return {
    title,
    excerpt,
    category: typeof b.category === "string" ? b.category : "عام",
    image: typeof b.image === "string" ? b.image : "",
    imageAlt: typeof b.imageAlt === "string" ? b.imageAlt : title,
    keywords: Array.isArray(b.keywords)
      ? b.keywords.filter((k): k is string => typeof k === "string")
      : [],
    sections: Array.isArray(b.sections)
      ? b.sections
          .filter(
            (s): s is Record<string, unknown> =>
              typeof s === "object" && s !== null,
          )
          .map((s) => ({
            heading: typeof s.heading === "string" ? s.heading : "",
            paragraphs: Array.isArray(s.paragraphs)
              ? s.paragraphs.filter((p): p is string => typeof p === "string")
              : [],
          }))
          .filter((s) => s.heading && s.paragraphs.length > 0)
      : [],
    links: Array.isArray(b.links)
      ? b.links
          .filter(
            (l): l is Record<string, unknown> =>
              typeof l === "object" && l !== null,
          )
          .map((l) => ({
            label: typeof l.label === "string" ? l.label : "",
            href: typeof l.href === "string" ? l.href : "",
            external: Boolean(l.external),
          }))
          .filter((l) => l.label && l.href)
      : [],
  };
}
