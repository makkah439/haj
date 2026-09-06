import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import ReadingProgress from "@/components/ReadingProgress";
import { getPosts, getPostBySlug } from "@/lib/blog-store";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/breadcrumbs";
import { buildMetadata } from "@/lib/metadata";

// Refresh periodically when an external content manifest is available.
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {};
  }
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    type: "article",
    keywords: post.keywords,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const breadcrumbs = breadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: "المدونة", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${siteConfig.url}${post.image}`,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    inLanguage: "ar",
  };

  const posts = await getPosts();
  const sameCategory = posts.filter(
    (item) => item.slug !== post.slug && item.category === post.category,
  );
  const otherPosts = posts.filter(
    (item) => item.slug !== post.slug && item.category !== post.category,
  );
  const relatedPosts = [...sameCategory, ...otherPosts].slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <ReadingProgress />
      <main id="main-content">
        <section className="relative flex h-[52vh] min-h-[420px] w-full items-end overflow-hidden text-white">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,50,38,0.15),rgba(8,50,38,0.65)_65%,rgba(8,50,38,0.95))]" />

          <div className="container-shell relative pb-12">
            <Reveal>
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2 text-xs text-white/70"
              >
                <Link href="/" className="transition hover:text-white">
                  الرئيسية
                </Link>
                <span aria-hidden="true">/</span>
                <Link href="/blog" className="transition hover:text-white">
                  المدونة
                </Link>
              </nav>
              <span className="mt-5 inline-block rounded-full bg-[color:var(--color-gold)] px-3 py-1 text-xs font-semibold text-[color:var(--color-primary-dark)]">
                {post.category}
              </span>
              <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.3] sm:text-4xl">
                {post.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/80">
                {post.excerpt}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-[color:var(--color-background)] py-16 lg:py-24">
          <div className="container-shell">
            <div className="mx-auto max-w-2xl">
              <StaggerGroup className="space-y-10">
                {post.sections.map((section, index) => (
                  <StaggerItem key={section.heading}>
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--color-primary)] text-sm font-semibold text-white">
                        {index + 1}
                      </span>
                      <h2 className="text-lg font-semibold text-[color:var(--color-primary)]">
                        {section.heading}
                      </h2>
                    </div>
                    <div className="mt-4 space-y-4 pr-12">
                      {section.paragraphs.map((paragraph, paragraphIndex) => (
                        <p
                          key={paragraphIndex}
                          className="text-[15px] leading-8 text-[color:var(--color-text)]"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>

              {post.links.length > 0 ? (
                <Reveal delay={0.05}>
                  <div className="mt-14 rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6">
                    <p className="text-sm font-semibold text-[color:var(--color-primary)]">
                      روابط ومصادر ذات صلة
                    </p>
                    <ul className="mt-4 space-y-2">
                      {post.links.map((link) =>
                        link.external ? (
                          <li key={link.href}>
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm text-[color:var(--color-muted)] transition hover:text-[color:var(--color-primary)]"
                            >
                              <span aria-hidden="true">↗</span>
                              {link.label}
                            </a>
                          </li>
                        ) : (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="inline-flex items-center gap-2 text-sm text-[color:var(--color-muted)] transition hover:text-[color:var(--color-primary)]"
                            >
                              <span aria-hidden="true">←</span>
                              {link.label}
                            </Link>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </Reveal>
              ) : null}

              <Reveal delay={0.1}>
                <div className="mt-8 flex flex-wrap gap-3 border-t border-[color:var(--color-border)] pt-8">
                  <Link
                    href="/blog"
                    className="rounded-full bg-[color:var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[color:var(--color-primary-dark)]"
                  >
                    العودة للمدونة
                  </Link>
                  <Link
                    href="/contact"
                    className="rounded-full border border-[color:var(--color-border)] px-5 py-2.5 text-sm font-semibold text-[color:var(--color-primary)] transition hover:bg-[color:var(--color-ivory)]"
                  >
                    تواصل معنا للاستفسار
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {relatedPosts.length > 0 ? (
          <section className="bg-[color:var(--color-surface)] py-16 lg:py-24">
            <div className="container-shell">
              <Reveal>
                <div className="mx-auto max-w-2xl text-center">
                  <p className="eyebrow">تابع القراءة</p>
                  <h2 className="section-title mt-2">مقالات ذات صلة</h2>
                </div>
              </Reveal>
              <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-3">
                {relatedPosts.map((related) => (
                  <StaggerItem key={related.slug}>
                    <Link
                      href={`/blog/${related.slug}`}
                      className="group block h-full overflow-hidden rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-background)] shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
                    >
                      <div className="relative aspect-[16/9] w-full overflow-hidden">
                        <Image
                          src={related.image}
                          alt={related.imageAlt}
                          fill
                          sizes="(min-width: 768px) 30vw, 100vw"
                          className="object-cover transition duration-300 group-hover:scale-105"
                        />
                        <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--color-primary)] backdrop-blur">
                          {related.category}
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-base font-semibold text-[color:var(--color-primary)]">
                          {related.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-[color:var(--color-muted)]">
                          {related.excerpt}
                        </p>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
