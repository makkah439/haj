import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Reveal from '@/components/motion/Reveal';
import GeometricPattern from '@/components/GeometricPattern';
import IslamicMotifs from '@/components/IslamicMotifs';
import ProjectsGrid from '@/components/ProjectsGrid';
import { getProjectBySlug, getProjects } from '@/lib/projects-store';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbJsonLd } from '@/lib/breadcrumbs';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};

  return buildMetadata({
    title: project.title,
    description: project.description || `صور وفيديوهات من ${project.title}`,
    path: `/projects/${project.slug}`,
    image: project.media.find((m) => m.type === 'image')?.url
  });
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'الرئيسية', path: '/' },
    { name: 'معرض الرحلات', path: '/projects' },
    { name: project.title, path: `/projects/${project.slug}` }
  ]);

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <section className="relative overflow-hidden py-20 text-white lg:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(8,50,38,0.97),rgba(11,59,44,0.9)_55%,rgba(8,50,38,0.98))]" />
        <GeometricPattern id="project-detail-geo" className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.06]" />
        <IslamicMotifs tone="light" />

        <div className="container-shell relative">
          <Reveal>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/70">
              <Link href="/" className="transition hover:text-white">الرئيسية</Link>
              <span aria-hidden="true">/</span>
              <Link href="/projects" className="transition hover:text-white">معرض الرحلات</Link>
            </nav>
            <h1 className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.5] sm:text-4xl">{project.title}</h1>
            {project.description ? <p className="mt-4 max-w-xl text-lg leading-8 text-white/80">{project.description}</p> : null}
          </Reveal>
        </div>
      </section>

      <section className="bg-[color:var(--color-background)] py-16 lg:py-24">
        <div className="container-shell">
          {project.media.length > 0 ? (
            <ProjectsGrid items={project.media} />
          ) : (
            <p className="text-center text-[color:var(--color-muted)]">لا توجد صور أو فيديوهات في هذا المشروع بعد.</p>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] px-6 py-3 text-sm font-semibold text-[color:var(--color-primary)] transition hover:bg-[color:var(--color-ivory)]"
            >
              ← كل المشاريع
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
