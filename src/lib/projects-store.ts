import { put, del, head } from "@vercel/blob";

export type ProjectMedia = {
  id: string;
  type: "image" | "video";
  url: string;
  caption: string;
  createdAt: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  createdAt: string;
  media: ProjectMedia[];
};

/** The pre-2026-08-31 flat-media shape, kept only so old manifests migrate cleanly. */
type LegacyProjectItem = {
  id: string;
  type: "image" | "video";
  url: string;
  caption: string;
  createdAt: string;
};

const MANIFEST_KEY = "projects/manifest.json";

function slugify(title: string, existingSlugs: string[]): string {
  const base =
    title
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\p{L}\p{N}-]/gu, "")
      .toLowerCase() || "project";

  let slug = base;
  let attempt = 2;
  while (existingSlugs.includes(slug)) {
    slug = `${base}-${attempt}`;
    attempt += 1;
  }
  return slug;
}

/**
 * There is no database in this project. The manifest itself is one small JSON
 * file stored in the same Vercel Blob store as the media, and it's the single
 * source of truth for what appears on the public /projects pages. This is a
 * suitable for occasional content updates — it would not be safe under
 * concurrent writes from multiple editors at once.
 */
async function readManifest(): Promise<Project[]> {
  try {
    const info = await head(MANIFEST_KEY);
    const response = await fetch(info.url, { cache: "no-store" });
    if (!response.ok) return [];
    const data = await response.json();
    if (!Array.isArray(data)) return [];

    // Migrate a legacy flat-media manifest (no "media" field) into one
    // project so nothing uploaded before this restructuring is lost.
    const isLegacyShape = data.length > 0 && !("media" in data[0]);
    if (isLegacyShape) {
      const legacyItems = data as LegacyProjectItem[];
      const migrated: Project = {
        slug: "صور-سابقة",
        title: "صور سابقة",
        description: "صور أُضيفت قبل تنظيم المشاريع، تم نقلها هنا تلقائيًا.",
        createdAt: legacyItems[0]?.createdAt ?? new Date().toISOString(),
        media: legacyItems.map((item) => ({
          id: item.id,
          type: item.type,
          url: item.url,
          caption: item.caption,
          createdAt: item.createdAt,
        })),
      };
      await writeManifest([migrated]);
      return [migrated];
    }

    return data as Project[];
  } catch {
    // No manifest yet (first-ever use) — start from an empty list.
    return [];
  }
}

async function writeManifest(projects: Project[]) {
  await put(MANIFEST_KEY, JSON.stringify(projects, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function getProjects(): Promise<Project[]> {
  const projects = await readManifest();
  return projects.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function getProjectBySlug(
  slug: string,
): Promise<Project | undefined> {
  const projects = await readManifest();
  return projects.find((project) => project.slug === slug);
}

export async function createProject(params: {
  title: string;
  description: string;
}): Promise<Project> {
  const projects = await readManifest();
  const slug = slugify(
    params.title,
    projects.map((p) => p.slug),
  );

  const project: Project = {
    slug,
    title: params.title,
    description: params.description,
    createdAt: new Date().toISOString(),
    media: [],
  };

  projects.push(project);
  await writeManifest(projects);
  return project;
}

export async function updateProject(
  slug: string,
  params: { title: string; description: string },
): Promise<void> {
  const projects = await readManifest();
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error("المشروع غير موجود.");
  project.title = params.title;
  project.description = params.description;
  await writeManifest(projects);
}

export async function deleteProject(slug: string): Promise<void> {
  const projects = await readManifest();
  const target = projects.find((p) => p.slug === slug);
  const remaining = projects.filter((p) => p.slug !== slug);
  await writeManifest(remaining);

  if (target) {
    await Promise.all(
      target.media.map((media) => del(media.url).catch(() => {})),
    );
  }
}

/**
 * The actual file bytes are uploaded straight from the browser to Blob storage
 * so large media never needs to pass through a serverless function's body
 * limit. This records finished uploads against the right project.
 */
export async function addMediaToProject(
  slug: string,
  params: {
    url: string;
    pathname: string;
    caption: string;
    type: ProjectMedia["type"];
  },
): Promise<ProjectMedia> {
  const projects = await readManifest();
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error("المشروع غير موجود.");

  const media: ProjectMedia = {
    id: params.pathname,
    type: params.type,
    url: params.url,
    caption: params.caption,
    createdAt: new Date().toISOString(),
  };

  project.media.push(media);
  await writeManifest(projects);
  return media;
}

export async function deleteMediaFromProject(
  slug: string,
  mediaId: string,
): Promise<void> {
  const projects = await readManifest();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return;

  const target = project.media.find((m) => m.id === mediaId);
  project.media = project.media.filter((m) => m.id !== mediaId);
  await writeManifest(projects);

  if (target) {
    await del(target.url).catch(() => {
      // Manifest is already updated; a leftover blob file is harmless clutter.
    });
  }
}
