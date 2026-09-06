import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import GeometricPattern from "@/components/GeometricPattern";
import IslamicMotifs from "@/components/IslamicMotifs";
import { KaabaIcon } from "@/components/icons";
import { getProgramsByType } from "@/lib/programs-store";
import { routes } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/breadcrumbs";
import { buildMetadata } from "@/lib/metadata";

const breadcrumbs = breadcrumbJsonLd([
  { name: "الرئيسية", path: "/" },
  { name: "الحج", path: "/hajj" },
  { name: "برامج الحج", path: "/hajj/programs" },
]);

// Refresh periodically when an external content manifest is available.
export const revalidate = 300;

export const metadata = buildMetadata({
  title: "برامج الحج",
  description:
    "فئات برامج الحج المتاحة من مصر مع الشيخ حسن عوض، تواصل معنا للحصول على التفاصيل الكاملة والمواعيد والأسعار المحدثة.",
  path: "/hajj/programs",
  image: "/images/sections/hajj-programs-group-kaaba.jpg",
});

const featuredSlug = "comfort";

export default async function HajjProgramsPage() {
  const hajjPrograms = await getProgramsByType("hajj");

  return (
    <main id="main-content">
      <section className="relative overflow-hidden py-24 text-white lg:py-32">
        <Image
          src="/images/sections/hajj-programs-group-kaaba.jpg"
          alt="مجموعة من الحجاج مع فريق الإشراف أمام الكعبة المشرفة"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(8,50,38,0.95),rgba(11,59,44,0.88)_50%,rgba(8,50,38,0.96))]" />
        <GeometricPattern
          id="hajj-programs-geo"
          className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.06]"
        />
        <IslamicMotifs tone="light" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
        />

        <div className="container-shell relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              <KaabaIcon className="h-4 w-4 text-[color:var(--color-gold-soft)]" />
              برامج
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.3] sm:text-5xl">
              برامج الحج
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/80">
              نقدم أكثر من فئة لبرامج الحج تناسب احتياجات وميزانيات مختلفة.
              تواصل معنا لمعرفة المواعيد والأسعار والتفاصيل الكاملة للموسم
              الحالي.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[color:var(--color-background)] py-20 lg:py-28">
        <div className="container-shell">
          <StaggerGroup className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
            {hajjPrograms.map((program) => {
              const isFeatured = program.slug === featuredSlug;
              return (
                <StaggerItem key={program.slug} className="h-full">
                  <div
                    className={`relative flex h-full flex-col rounded-[1.75rem] border p-8 shadow-sm transition hover:-translate-y-1.5 hover:shadow-soft ${
                      isFeatured
                        ? "border-[color:var(--color-gold)] bg-[color:var(--color-surface)] shadow-soft"
                        : "border-[color:var(--color-border)] bg-[color:var(--color-surface)]"
                    }`}
                  >
                    {isFeatured ? (
                      <span className="absolute -top-3.5 right-1/2 translate-x-1/2 whitespace-nowrap rounded-full bg-[color:var(--color-gold)] px-4 py-1.5 text-xs font-semibold text-[color:var(--color-primary-dark)] shadow-sm">
                        الأكثر طلبًا
                      </span>
                    ) : null}

                    <h2 className="text-xl font-semibold text-[color:var(--color-primary)]">
                      {program.name}
                    </h2>
                    <p className="mt-3 text-sm leading-8 text-[color:var(--color-muted)]">
                      {program.summary}
                    </p>

                    <ul className="mt-6 flex-1 space-y-3">
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

                    <div className="mt-6 rounded-xl bg-[color:var(--color-ivory)] p-4 text-xs leading-6 text-[color:var(--color-muted)]">
                      <span className="font-semibold text-[color:var(--color-primary)]">
                        الأنسب لمن:{" "}
                      </span>
                      {program.idealFor}
                    </div>

                    <Link
                      href={`/hajj/programs/${program.slug}`}
                      className={`mt-6 inline-flex items-center justify-center gap-1.5 rounded-full px-6 py-3 text-sm font-semibold transition ${
                        isFeatured
                          ? "bg-[color:var(--color-gold)] text-[color:var(--color-primary-dark)] hover:shadow-lg hover:shadow-black/10"
                          : "border border-[color:var(--color-border)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-ivory)]"
                      }`}
                    >
                      عرض التفاصيل الكاملة
                    </Link>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>

          <Reveal delay={0.15} className="mt-14">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-ivory)] p-6 text-center sm:text-right">
              <p className="text-sm leading-8 text-[color:var(--color-muted)]">
                الأسعار والمواعيد وتفاصيل الإقامة تختلف من موسم لآخر. تواصل معنا
                للحصول على أحدث البيانات المتاحة حاليًا.
              </p>
              <Link
                href={routes.contact}
                className="mx-auto whitespace-nowrap rounded-full bg-[color:var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--color-primary-dark)] sm:mx-0"
              >
                تواصل معنا الآن
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
