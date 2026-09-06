import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import GeometricPattern from '@/components/GeometricPattern';
import IslamicMotifs from '@/components/IslamicMotifs';
import VideoEmbed from '@/components/VideoEmbed';
import Gallery from '@/components/Gallery';
import { getProjects } from '@/lib/projects-store';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbJsonLd } from '@/lib/breadcrumbs';

export const dynamic = 'force-dynamic';

export const metadata = buildMetadata({
  title: 'معرض الرحلات',
  description: 'صور وفيديوهات من رحلات الحج والعمرة السابقة مع الشيخ حسن عوض، كل رحلة في قسم مستقل.',
  path: '/projects',
  image: '/images/gallery/trip-guides-07.jpg'
});

const breadcrumbs = breadcrumbJsonLd([
  { name: 'الرئيسية', path: '/' },
  { name: 'معرض الرحلات', path: '/projects' }
]);

export default async function ProjectsPage() {
  const projects = await getProjects().catch(() => []);

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <section className="relative overflow-hidden py-24 text-white lg:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(8,50,38,0.97),rgba(11,59,44,0.9)_55%,rgba(8,50,38,0.98))]" />
        <GeometricPattern id="projects-hero-geo" className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.06]" />
        <IslamicMotifs tone="light" />

        <div className="container-shell relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              معرض الرحلات
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.6] sm:text-5xl">رحلاتنا، رحلة برحلة</h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/80">
              كل رحلة حج أو عمرة نظّمناها لها قسمها الخاص هنا، بصورها وفيديوهاتها الحقيقية.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[color:var(--color-surface)] py-16 lg:py-24">
        <div className="container-shell">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">تصفح حسب الرحلة</p>
              <h2 className="section-title mt-2">رحلاتنا المنظّمة</h2>
            </div>
          </Reveal>
          {projects.length > 0 ? (
            <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <StaggerItem key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group block h-full overflow-hidden rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-[color:var(--color-ivory)]">
                      {project.media[0] ? (
                        project.media[0].type === 'image' ? (
                          // eslint-disable-next-line @next/next/no-img-element -- may be an arbitrary external URL
                          <img
                            src={project.media[0].url}
                            alt={project.title}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <VideoEmbed url={project.media[0].url} mode="thumbnail" />
                        )
                      ) : null}
                      <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--color-primary)] backdrop-blur">
                        {project.media.length} عنصر
                      </span>
                    </div>
                    <div className="p-6">
                      <h2 className="text-lg font-semibold text-[color:var(--color-primary)]">{project.title}</h2>
                      {project.description ? (
                        <p className="mt-2 text-sm leading-7 text-[color:var(--color-muted)]">{project.description}</p>
                      ) : null}
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          ) : (
            <p className="mt-10 text-center text-[color:var(--color-muted)]">
              لم تُضَف أي مشاريع بعد. تابعونا قريبًا لمشاهدة رحلاتنا.
            </p>
          )}
        </div>
      </section>

      <Gallery />
    </main>
  );
}
