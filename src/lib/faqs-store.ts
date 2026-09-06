import { put, head } from '@vercel/blob';
import { randomUUID } from 'crypto';
import { faqs as seedFaqs } from './faqs';

export type Faq = { id: string; question: string; answer: string };

const MANIFEST_KEY = 'faqs/manifest.json';

/** Same Blob-manifest pattern as blog-store.ts and projects-store.ts, seeded
 * once from the static faqs.ts array (which stays in the repo as the fallback). */
async function readManifest(): Promise<Faq[]> {
  try {
    const info = await head(MANIFEST_KEY);
    const response = await fetch(info.url, { cache: 'no-store' });
    if (!response.ok) return seedWithIds();
    const data = await response.json();
    return Array.isArray(data) && data.length > 0 ? (data as Faq[]) : seedWithIds();
  } catch {
    const seeded = seedWithIds();
    await writeManifest(seeded).catch(() => {});
    return seeded;
  }
}

function seedWithIds(): Faq[] {
  return seedFaqs.map((faq) => ({ id: randomUUID(), ...faq }));
}

async function writeManifest(faqs: Faq[]) {
  await put(MANIFEST_KEY, JSON.stringify(faqs, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true
  });
}

export async function getFaqs(): Promise<Faq[]> {
  return readManifest();
}

export async function createFaq(input: { question: string; answer: string }): Promise<Faq> {
  const faqs = await readManifest();
  const faq: Faq = { id: randomUUID(), ...input };
  faqs.push(faq);
  await writeManifest(faqs);
  return faq;
}

export async function updateFaq(id: string, input: { question: string; answer: string }): Promise<Faq> {
  const faqs = await readManifest();
  const index = faqs.findIndex((f) => f.id === id);
  if (index === -1) throw new Error('السؤال غير موجود.');
  faqs[index] = { id, ...input };
  await writeManifest(faqs);
  return faqs[index];
}

export async function deleteFaq(id: string): Promise<void> {
  const faqs = await readManifest();
  await writeManifest(faqs.filter((f) => f.id !== id));
}
