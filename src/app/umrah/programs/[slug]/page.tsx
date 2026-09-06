import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import GeometricPattern from "@/components/GeometricPattern";
import IslamicMotifs from "@/components/IslamicMotifs";
import { CrescentMoonIcon } from "@/components/icons";
import { getProgram, getProgramsByType } from "@/lib/programs-store";
import { siteConfig, routes } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/breadcrumbs";
import { buildMetadata } from "@/lib/metadata";

// Refresh periodically when an external content manifest is available.
export const revalidate = 300;

export async function generateStaticParams() {
  const programs = await getProgramsByType("umrah");
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const program = await getProgram("umrah", params.slug);
  if (!program) {
    return {};
  }
  return buildMetadata({
    title: program.name,
    description: program.summary,
    path: `/umrah/programs/${program.slug}`,
    image: "/images/external/haram-archway-umrah-unsplash.jpg",
  });
}

export default async function UmrahProgramDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const program = await getProgram("umrah", params.slug);

  if (!program) {
    notFound();
  }

  const breadcrumbs = breadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: "العمرة", path: "/umrah" },
    { name: "برامج العمرة", path: "/umrah/programs" },
    { name: program.name, path: `/umrah/programs/${program.slug}` },
  ]);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: program.name,
    description: program.summary,
    serviceType: "Umrah travel program",
    provider: { "@type": "TravelAgency", name: siteConfig.name },
    areaServed: { "@type": "Country", name: "مصر" },
  };

  return (
    <main id="main-content">
      <section className="relative overflow-hidden py-24 text-white lg:py-32">
        <Image
          src="/images/external/haram-archway-umrah-unsplash.jpg"
          alt="الكعبة المشرفة من خلال قوس معماري في المسجد الحرام"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(8,50,38,0.95),rgba(11,59,44,0.88)_50%,rgba(8,50,38,0.96))]" />
        <GeometricPattern
          id="umrah-program-geo"
          className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.06]"
        />
        <IslamicMotifs tone="light" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
        />

        <div className="container-shell relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              <CrescentMoonIcon className="h-4 w-4 text-[color:var(--color-gold-soft)]" />
              برنامج عمرة
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.3] sm:text-5xl">
              {program.name}
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/80">
              {program.summary}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[color:var(--color-background)] py-20 lg:py-28">
        <div className="container-shell">
          <Reveal className="mx-auto max-w-2xl">
            <div className="rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8 shadow-sm sm:p-10">
              <h2 className="text-lg font-semibold text-[color:var(--color-primary)]">
                ماذا يشمل هذا البرنامج؟
              </h2>
              <ul className="mt-5 space-y-3">
                {program.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-7 text-[color:var(--color-text)]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--color-gold)]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m5 13 4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-xl bg-[color:var(--color-ivory)] p-5 text-sm leading-7 text-[color:var(--color-muted)]">
                <span className="font-semibold text-[color:var(--color-primary)]">
                  الأنسب لمن:{" "}
                </span>
                {program.idealFor}
              </div>

              <div className="mt-6 rounded-[1.25rem] border border-[color:var(--color-border)] p-5 text-sm leading-7 text-[color:var(--color-muted)]">
                الأسعار والمواعيد وتفاصيل الإقامة الدقيقة تختلف من فترة لأخرى.
                تواصل معنا للحصول على أحدث البيانات المتاحة حاليًا.
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={routes.contact}
                  className="rounded-full bg-[color:var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--color-primary-dark)]"
                >
                  تواصل معنا الآن
                </Link>
                <Link
                  href={routes.umrahPrograms}
                  className="rounded-full border border-[color:var(--color-border)] px-6 py-3 text-sm font-semibold text-[color:var(--color-primary)] transition hover:bg-[color:var(--color-ivory)]"
                >
                  استعرض باقي برامج العمرة
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
