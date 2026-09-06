import { put, head } from "@vercel/blob";
import { hajjPrograms, umrahPrograms, type ProgramTier } from "./programs";

export type { ProgramTier };

const MANIFEST_KEY = "programs/manifest.json";
const seedPrograms: ProgramTier[] = [...hajjPrograms, ...umrahPrograms];

function slugify(
  name: string,
  type: "hajj" | "umrah",
  existing: ProgramTier[],
): string {
  const base =
    name
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\p{L}\p{N}-]/gu, "")
      .toLowerCase() || "program";

  let slug = base;
  let attempt = 2;
  while (existing.some((p) => p.type === type && p.slug === slug)) {
    slug = `${base}-${attempt}`;
    attempt += 1;
  }
  return slug;
}

/** Same Blob-manifest pattern as the other content sections, seeded once from
 * the static hajjPrograms/umrahPrograms arrays in programs.ts. */
async function readManifest(): Promise<ProgramTier[]> {
  try {
    const info = await head(MANIFEST_KEY);
    const response = await fetch(info.url, { cache: "no-store" });
    if (!response.ok) return seedPrograms;
    const data = await response.json();
    return Array.isArray(data) && data.length > 0
      ? (data as ProgramTier[])
      : seedPrograms;
  } catch {
    await writeManifest(seedPrograms).catch(() => {});
    return seedPrograms;
  }
}

async function writeManifest(programs: ProgramTier[]) {
  await put(MANIFEST_KEY, JSON.stringify(programs, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function getPrograms(): Promise<ProgramTier[]> {
  return readManifest();
}

export async function getProgramsByType(
  type: "hajj" | "umrah",
): Promise<ProgramTier[]> {
  const programs = await readManifest();
  return programs.filter((p) => p.type === type);
}

export async function getProgram(
  type: "hajj" | "umrah",
  slug: string,
): Promise<ProgramTier | undefined> {
  const programs = await readManifest();
  return programs.find((p) => p.type === type && p.slug === slug);
}

export async function createProgram(
  input: Omit<ProgramTier, "slug"> & { slug?: string },
): Promise<ProgramTier> {
  const programs = await readManifest();
  const slug = input.slug || slugify(input.name, input.type, programs);
  const program: ProgramTier = { ...input, slug };
  programs.push(program);
  await writeManifest(programs);
  return program;
}

export async function updateProgram(
  type: "hajj" | "umrah",
  slug: string,
  input: Omit<ProgramTier, "slug" | "type">,
): Promise<ProgramTier> {
  const programs = await readManifest();
  const index = programs.findIndex((p) => p.type === type && p.slug === slug);
  if (index === -1) throw new Error("البرنامج غير موجود.");
  const updated: ProgramTier = { ...input, type, slug };
  programs[index] = updated;
  await writeManifest(programs);
  return updated;
}

export async function deleteProgram(
  type: "hajj" | "umrah",
  slug: string,
): Promise<void> {
  const programs = await readManifest();
  await writeManifest(
    programs.filter((p) => !(p.type === type && p.slug === slug)),
  );
}

export function sanitizeProgramInput(
  body: unknown,
): Omit<ProgramTier, "slug"> | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;

  const name = typeof b.name === "string" ? b.name.trim() : "";
  const type = b.type === "hajj" || b.type === "umrah" ? b.type : null;
  if (!name || !type) return null;

  return {
    type,
    name,
    summary: typeof b.summary === "string" ? b.summary.trim() : "",
    highlights: Array.isArray(b.highlights)
      ? b.highlights.filter(
          (h): h is string => typeof h === "string" && h.trim().length > 0,
        )
      : [],
    idealFor: typeof b.idealFor === "string" ? b.idealFor.trim() : "",
  };
}
