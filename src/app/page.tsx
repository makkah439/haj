import Link from "next/link";
import Image from "next/image";
import TrustStrip from "@/components/TrustStrip";
import JourneyTimeline from "@/components/JourneyTimeline";
import Gallery from "@/components/Gallery";
import CTASection from "@/components/CTASection";
import GeometricPattern from "@/components/GeometricPattern";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import {
  CompassIcon,
  DocumentIcon,
  ShieldIcon,
  GroupIcon,
  HeartHandIcon,
  CalendarIcon,
  KaabaIcon,
  CrescentMoonIcon,
  StarTagIcon,
  MosqueIcon,
} from "@/components/icons";
import { routes } from "@/lib/site-config";
import { getPrograms } from "@/lib/programs-store";
import { getPosts } from "@/lib/blog-store";
import { getFaqs } from "@/lib/faqs-store";
import HeroAnimated from "@/components/HeroAnimated";
import IslamicMotifs from "@/components/IslamicMotifs";

// The gallery section can include externally stored project media, so the
// otherwise-static homepage is revalidated periodically.
export const revalidate = 300;

const trustItems = [
  "إرشاد قبل السفر",
  "معلومات واضحة ومحدثة",
  "متابعة رحلة مريحة",
  "خدمة متخصصة للحاج والمعتمر",
];

const quickLinks = [
  {
    icon: KaabaIcon,
    title: "دليل الحج",
    href: "/hajj/guide",
    text: "مناسك الحج مرتبة خطوة بخطوة، من الإحرام حتى طواف الوداع.",
    category: "حج",
  },
  {
    icon: CrescentMoonIcon,
    title: "دليل العمرة",
    href: "/umrah/guide",
    text: "خطوات العمرة والاحتياطات اللازمة قبل أداء المناسك.",
    category: "عمرة",
  },
  {
    icon: DocumentIcon,
    title: "الأوراق المطلوبة",
    href: "/hajj/documents",
    text: "كل مستند تحتاجه قبل السفر، في قائمة واضحة ومباشرة.",
    category: "وثائق",
  },
];

const whyUs = [
  { icon: ShieldIcon, title: "إشراف ميداني مباشر" },
  { icon: GroupIcon, title: "مجموعات منظمة لكل رحلة" },
  { icon: CompassIcon, title: "دعم وتواصل مستمر" },
  { icon: HeartHandIcon, title: "برامج تناسب جميع الفئات" },
];

export default async function HomePage() {
  const posts = await getPosts();
  const latestPosts = posts.slice(0, 3);
  const faqs = await getFaqs();
  const faqPreview = faqs.slice(0, 4);

  const programs = await getPrograms();
  const hajjPrograms = programs.filter((p) => p.type === "hajj");
  const umrahPrograms = programs.filter((p) => p.type === "umrah");
  const featuredPrograms = [
    hajjPrograms.find((p) => p.slug === "comfort") ?? hajjPrograms[0],
    umrahPrograms.find((p) => p.slug === "comfort") ?? umrahPrograms[0],
  ].filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <main id="main-content">
        <section className="relative overflow-hidden bg-[linear-gradient(150deg,rgba(11,59,44,0.97),rgba(15,77,58,0.94)_45%,rgba(8,50,38,0.98))] text-white">
          <Image
            src="/images/hero-banner.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-[0.14]"
          />
          <GeometricPattern
            id="hero-geo"
            className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.06]"
          />
          <HeroAnimated />
          <IslamicMotifs tone="light" />

          <div className="container-shell relative grid gap-10 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:py-32">
            <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-right">
              <Reveal>
                <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
                  <KaabaIcon className="h-4 w-4 text-[color:var(--color-gold-soft)]" />
                  رحلة إيمانية تبدأ بالاختيار الصحيح
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="text-4xl font-semibold leading-[1.3] sm:text-5xl sm:leading-[1.3] lg:text-6xl lg:leading-[1.3]">
                  مع الشيخ حسن عوض، رحلتك إلى بيت الله في أيدٍ أمينة.
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80 lg:mx-0">
                  برامج حج وعمرة من مصر بإشراف ميداني مباشر، ومتابعة لصيقة في كل
                  خطوة من رحلتك إلى مكة المكرمة والمدينة المنورة.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                  <Link
                    href={routes.hajjPrograms}
                    className="group rounded-full bg-[color:var(--color-gold)] px-6 py-3 font-semibold text-[color:var(--color-primary-dark)] transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20"
                  >
                    استكشف البرامج
                    <span className="mr-2 inline-block transition-transform group-hover:-translate-x-1">
                      ←
                    </span>
                  </Link>
                  <Link
                    href={routes.contact}
                    className="rounded-full border border-white/25 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
                  >
                    تواصل معنا
                  </Link>
                </div>
              </Reveal>
              <StaggerGroup className="mt-10 grid gap-3 sm:grid-cols-2">
                {trustItems.map((item) => (
                  <StaggerItem key={item}>
                    <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm backdrop-blur transition hover:border-white/30 hover:bg-white/15">
                      {item}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>

            <Reveal delay={0.3} className="relative lg:pt-4">
              <div className="relative">
                <div className="pointer-events-none absolute -top-8 -left-6 hidden h-40 w-32 -rotate-6 overflow-hidden rounded-[1.25rem] border-4 border-white/90 shadow-2xl shadow-black/40 lg:block">
                  <Image
                    src="/images/external/haram-architecture-daylight-unsplash.jpg"
                    alt="واجهة المسجد الحرام المعمارية"
                    fill
                    sizes="150px"
                    className="object-cover"
                  />
                </div>
                <div className="rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-soft backdrop-blur">
                  <div className="rounded-[1.5rem] bg-[color:var(--color-ivory)] p-6 text-[color:var(--color-text)]">
                    <p className="text-sm font-semibold text-[color:var(--color-primary)]">
                      ماذا ستجد هنا؟
                    </p>
                    <ul className="mt-4 space-y-3 text-sm leading-8 text-[color:var(--color-muted)]">
                      <li>• دليل مناسك كامل للحج والعمرة، خطوة بخطوة.</li>
                      <li>• 6 فئات برامج بين الحج والعمرة تناسب كل ميزانية.</li>
                      <li>• صور وفيديوهات حقيقية من رحلاتنا السابقة.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <TrustStrip />

        <JourneyTimeline />

        <section className="relative overflow-hidden py-24 text-white lg:py-32">
          <Image
            src="/images/external/haram-archway-umrah-unsplash.jpg"
            alt="الكعبة المشرفة من خلال قوس معماري في المسجد الحرام"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(8,50,38,0.92),rgba(11,59,44,0.82)_55%,rgba(8,50,38,0.92))]" />
          <div className="container-shell relative">
            <div className="mx-auto max-w-3xl text-center">
              <Reveal>
                <p className="text-xl font-semibold text-[color:var(--color-gold-soft)] sm:text-2xl">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <div
                  className="mx-auto mt-5 flex items-center justify-center gap-3"
                  aria-hidden="true"
                >
                  <span className="h-px w-10 bg-[color:var(--color-gold-soft)]/40 sm:w-16" />
                  <span className="h-2 w-2 rotate-45 bg-[color:var(--color-gold-soft)]" />
                  <span className="h-px w-10 bg-[color:var(--color-gold-soft)]/40 sm:w-16" />
                </div>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-8 text-2xl font-semibold leading-[2] sm:text-3xl">
                  ﴿وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ
                  إِلَيْهِ سَبِيلًا﴾
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-4 text-sm font-semibold text-[color:var(--color-gold-soft)]">
                  سورة آل عمران، الآية 97
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="bg-[color:var(--color-surface)] py-20 lg:py-28">
          <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal>
              <div className="text-center lg:text-right">
                <p className="eyebrow">كلمة المدير</p>
                <h2 className="section-title mt-2">
                  تعرف على الشيخ حسن عوض قبل أن تحجز
                </h2>
                <p className="mt-5 text-lg leading-8 text-[color:var(--color-muted)]">
                  في دقائق معدودة، يحدثك الشيخ حسن عوض بنفسه عن فلسفة الشركة في
                  تنظيم رحلات الحج والعمرة، وكيف يرافق فريقه كل مجموعة على أرض
                  الواقع في مكة المكرمة والمدينة المنورة.
                </p>
                <Link
                  href={routes.about}
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-primary)] transition hover:text-[color:var(--color-gold)]"
                >
                  تعرف أكثر على الشركة
                  <span
                    className="inline-block transition-transform group-hover:-translate-x-1"
                    aria-hidden="true"
                  >
                    ←
                  </span>
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="overflow-hidden rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-soft">
                <video
                  controls
                  preload="none"
                  poster="/images/gallery/trip-highlights-poster.jpg"
                  className="aspect-video w-full bg-black"
                >
                  <source src="/videos/trip-highlights.mp4" type="video/mp4" />
                </video>
              </div>
            </Reveal>
          </div>
        </section>

        <Gallery />

        <section className="bg-[color:var(--color-surface)] py-20 lg:py-28">
          <div className="container-shell">
            <Reveal>
              <div className="flex flex-col items-center gap-4 text-center lg:flex-row lg:items-end lg:justify-between lg:text-right">
                <div>
                  <p className="eyebrow">قبل أن تسافر</p>
                  <h2 className="section-title mt-2">
                    كل ما تحتاج معرفته قبل رحلتك
                  </h2>
                </div>
              </div>
            </Reveal>
            <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-3">
              {quickLinks.map((card) => (
                <StaggerItem key={card.href}>
                  <Link
                    href={card.href}
                    className="group block h-full rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-7 shadow-sm transition hover:-translate-y-1.5 hover:border-[color:var(--color-gold-soft)] hover:shadow-soft"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--color-ivory)] transition group-hover:bg-[color:var(--color-gold)]/15">
                      <card.icon className="h-5 w-5 text-[color:var(--color-gold)]" />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-[color:var(--color-gold)]">
                      {card.category}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold text-[color:var(--color-primary)]">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-8 text-[color:var(--color-muted)]">
                      {card.text}
                    </p>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        <section className="relative overflow-hidden py-20 lg:py-28">
          <Image
            src="/images/sections/makkah-haram-panorama.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(8,50,38,0.95),rgba(11,59,44,0.9)_45%,rgba(8,50,38,0.96))]" />
          <GeometricPattern
            id="why-geo"
            className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.07]"
          />
          <IslamicMotifs tone="light" />
          <div className="container-shell relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <Reveal>
              <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8 text-center shadow-sm sm:p-10 lg:text-right">
                <p className="eyebrow">لماذا الشيخ حسن عوض؟</p>
                <h2 className="section-title mt-3">
                  إشراف ميداني حقيقي على كل رحلة حج وعمرة
                </h2>
                <p className="mt-5 text-lg leading-8 text-[color:var(--color-muted)]">
                  نرافق حجاجنا ومعتمرينا خطوة بخطوة من التسجيل وحتى العودة، مع
                  متابعة ميدانية مباشرة في مكة المكرمة والمدينة المنورة، وبرامج
                  مصممة لتناسب مختلف الفئات والميزانيات.
                </p>
              </div>
            </Reveal>
            <StaggerGroup className="grid gap-4 sm:grid-cols-2">
              {whyUs.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="flex h-full flex-col items-center gap-3 rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--color-primary)]/10">
                      <item.icon className="h-5 w-5 text-[color:var(--color-primary)]" />
                    </div>
                    <p className="text-sm font-semibold text-[color:var(--color-primary)]">
                      {item.title}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        <section className="bg-[color:var(--color-background)] py-20 lg:py-28">
          <div className="container-shell">
            <Reveal>
              <div className="flex flex-col items-center gap-4 text-center lg:flex-row lg:items-end lg:justify-between lg:text-right">
                <div>
                  <p className="eyebrow">برامجنا</p>
                  <h2 className="section-title mt-2">
                    فئات برامج تناسب كل احتياج وميزانية
                  </h2>
                </div>
                <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                  <Link
                    href={routes.hajjPrograms}
                    className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--color-primary)] transition hover:text-[color:var(--color-gold)]"
                  >
                    كل برامج الحج
                    <span
                      className="inline-block transition-transform group-hover:-translate-x-1"
                      aria-hidden="true"
                    >
                      ←
                    </span>
                  </Link>
                  <Link
                    href={routes.umrahPrograms}
                    className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--color-primary)] transition hover:text-[color:var(--color-gold)]"
                  >
                    كل برامج العمرة
                    <span
                      className="inline-block transition-transform group-hover:-translate-x-1"
                      aria-hidden="true"
                    >
                      ←
                    </span>
                  </Link>
                </div>
              </div>
            </Reveal>
            <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-2">
              {featuredPrograms.map((program) => (
                <StaggerItem key={program.slug}>
                  <Link
                    href={`/${program.type}/programs/${program.slug}`}
                    className="group block h-full rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-7 shadow-sm transition hover:-translate-y-1.5 hover:border-[color:var(--color-gold-soft)] hover:shadow-soft"
                  >
                    <p className="text-sm font-semibold text-[color:var(--color-gold)]">
                      {program.type === "hajj" ? "برنامج حج" : "برنامج عمرة"}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-[color:var(--color-primary)]">
                      {program.name}
                    </h3>
                    <p className="mt-3 text-sm leading-8 text-[color:var(--color-muted)]">
                      {program.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--color-gold)]">
                      عرض التفاصيل
                      <span
                        className="inline-block transition-transform group-hover:-translate-x-1"
                        aria-hidden="true"
                      >
                        ←
                      </span>
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        <section className="bg-[color:var(--color-surface)] py-20 lg:py-28">
          <div className="container-shell">
            <Reveal>
              <div className="flex flex-col items-center gap-4 text-center lg:flex-row lg:items-end lg:justify-between lg:text-right">
                <div>
                  <p className="eyebrow">دليلنا</p>
                  <h2 className="section-title mt-2">
                    أحدث المقالات من مدونتنا
                  </h2>
                </div>
                <Link
                  href={routes.blog}
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--color-primary)] transition hover:text-[color:var(--color-gold)]"
                >
                  كل المقالات
                  <span
                    className="inline-block transition-transform group-hover:-translate-x-1"
                    aria-hidden="true"
                  >
                    ←
                  </span>
                </Link>
              </div>
            </Reveal>
            <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-3">
              {latestPosts.map((post) => (
                <StaggerItem key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-7 shadow-sm transition hover:-translate-y-1.5 hover:border-[color:var(--color-gold-soft)] hover:shadow-soft"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--color-ivory)] transition group-hover:bg-[color:var(--color-gold)]/15">
                      <CalendarIcon className="h-5 w-5 text-[color:var(--color-gold)]" />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-[color:var(--color-gold)]">
                      {post.category}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-[color:var(--color-primary)]">
                      {post.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-8 text-[color:var(--color-muted)]">
                      {post.excerpt}
                    </p>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        <section className="bg-[color:var(--color-background)] py-20 lg:py-28">
          <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div className="text-center lg:text-right">
                <p className="eyebrow">أسئلة شائعة</p>
                <h2 className="section-title mt-2">إجابات سريعة قبل أن تسأل</h2>
                <p className="mt-5 text-lg leading-8 text-[color:var(--color-muted)]">
                  جمعنا لك أكثر الأسئلة تكرارًا من الحجاج والمعتمرين. لو سؤالك
                  مش موجود، تواصل معنا مباشرة.
                </p>
                <Link
                  href={routes.faq}
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-primary)] transition hover:text-[color:var(--color-gold)]"
                >
                  كل الأسئلة الشائعة
                  <span
                    className="inline-block transition-transform group-hover:-translate-x-1"
                    aria-hidden="true"
                  >
                    ←
                  </span>
                </Link>
                <div className="relative mt-8 hidden aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] border border-[color:var(--color-border)] shadow-soft lg:block">
                  <Image
                    src="/images/external/haram-archway-umrah-unsplash.jpg"
                    alt="الكعبة المشرفة من خلال قوس معماري في المسجد الحرام"
                    fill
                    sizes="(min-width: 1024px) 35vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0" />
                </div>
              </div>
            </Reveal>
            <StaggerGroup className="space-y-4">
              {faqPreview.map((faq) => (
                <StaggerItem key={faq.id}>
                  <div className="rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-sm transition hover:-translate-y-1 hover:border-[color:var(--color-gold-soft)] hover:shadow-soft">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--color-primary)]/10">
                        <StarTagIcon className="h-3.5 w-3.5 text-[color:var(--color-gold)]" />
                      </span>
                      <h3 className="font-semibold text-[color:var(--color-primary)]">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="mt-2 flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--color-gold)]/10">
                        <MosqueIcon className="h-3 w-3 text-[color:var(--color-primary)]" />
                      </span>
                      <p className="text-sm leading-8 text-[color:var(--color-muted)]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      </main>
      <CTASection />
    </>
  );
}
