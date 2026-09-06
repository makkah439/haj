import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/lib/blog-store";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import GeometricPattern from "@/components/GeometricPattern";
import IslamicMotifs from "@/components/IslamicMotifs";
import { CalendarIcon } from "@/components/icons";
import { buildMetadata } from "@/lib/metadata";

// Refresh periodically when an external content manifest is available.
export const revalidate = 300;

export const metadata = buildMetadata({
  title: "المدونة",
  description:
    "مقالات ودلائل موثوقة حول الحج والعمرة، مناسك الأداء، والاستعداد للسفر من مصر.",
  path: "/blog",
  image: "/images/gallery/trip-guides-07.jpg",
});

const categoryIds: Record<string, string> = {
  "التحضير والاستعداد": "preparation",
  "المناسك والأحكام": "rituals",
  "الأوراق والإجراءات": "documents",
  "الصحة والسفر": "health",
  "الأماكن المقدسة": "holy-sites",
  "التكلفة والميزانية": "costs",
  "فئات خاصة": "special-groups",
  "الفضل والأحكام العامة": "virtue-and-rulings",
};

function categorySlug(category: string) {
  return categoryIds[category] ?? "category";
}

export default async function BlogPage() {
  const posts = await getPosts();
  const [featuredPost, ...restPosts] = posts;
  const categories = Array.from(
    new Set(restPosts.map((post) => post.category)),
  );
  const groupedByCategory = categories.map((category) => ({
    category,
    items: restPosts.filter((post) => post.category === category),
  }));

  return (
    <main id="main-content">
      <section className="relative overflow-hidden py-24 text-white lg:py-32">
        <Image
          src="/images/gallery/trip-guides-07.jpg"
          alt="فريق الإشراف والمتابعة أثناء رحلة الحج والعمرة"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(8,50,38,0.95),rgba(11,59,44,0.88)_50%,rgba(8,50,38,0.96))]" />
        <GeometricPattern
          id="blog-hero-geo"
          className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.06]"
        />
        <IslamicMotifs tone="light" />

        <div className="container-shell relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              <CalendarIcon className="h-4 w-4 text-[color:var(--color-gold-soft)]" />
              المدونة
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.3] sm:text-5xl">
              دليلك الكامل لرحلة الحج والعمرة
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/80">
              مقالات ودلائل عملية تساعدك على الاستعداد لرحلة الحج أو العمرة، من
              المناسك خطوة بخطوة إلى النصائح العملية قبل السفر.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[color:var(--color-background)] py-20 lg:py-28">
        <div className="container-shell">
          {featuredPost ? (
            <Reveal>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group grid overflow-hidden rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-sm transition hover:-translate-y-1 hover:shadow-soft lg:grid-cols-2"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden lg:aspect-auto">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.imageAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                  <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--color-primary)] backdrop-blur">
                    {featuredPost.category}
                  </span>
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-10">
                  <p className="eyebrow">أحدث مقال</p>
                  <h2 className="mt-2 text-2xl font-semibold text-[color:var(--color-primary)] sm:text-3xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-4 text-sm leading-8 text-[color:var(--color-muted)]">
                    {featuredPost.excerpt}
                  </p>
                  <span className="group mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[color:var(--color-gold)]">
                    اقرأ المقال كاملًا
                    <span
                      className="inline-block transition-transform group-hover:-translate-x-1"
                      aria-hidden="true"
                    >
                      ←
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ) : null}

          <nav
            aria-label="أقسام المدونة"
            className="mt-10 flex flex-wrap justify-center gap-2 lg:justify-start"
          >
            {groupedByCategory.map(({ category }) => (
              <a
                key={category}
                href={`#${categorySlug(category)}`}
                className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-2 text-sm font-medium text-[color:var(--color-primary)] transition hover:border-[color:var(--color-gold-soft)] hover:bg-[color:var(--color-ivory)]"
              >
                {category}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {groupedByCategory.map(({ category, items }) => (
        <section
          key={category}
          id={categorySlug(category)}
          className="scroll-mt-24 border-t border-[color:var(--color-border)] py-16 lg:py-20 odd:bg-[color:var(--color-surface)] even:bg-[color:var(--color-background)]"
        >
          <div className="container-shell">
            <Reveal>
              <p className="eyebrow">{category}</p>
            </Reveal>
            <StaggerGroup className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((post) => (
                <StaggerItem key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block h-full overflow-hidden rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-[color:var(--color-primary)]">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-sm leading-8 text-[color:var(--color-muted)]">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      ))}
    </main>
  );
}
