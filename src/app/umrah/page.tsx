import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import GeometricPattern from '@/components/GeometricPattern';
import IslamicMotifs from '@/components/IslamicMotifs';
import { StarTagIcon, DocumentIcon, CompassIcon, HeartHandIcon, MapPinIcon, CrescentMoonIcon } from '@/components/icons';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbJsonLd } from '@/lib/breadcrumbs';
import AnimatedCounter from '@/components/motion/AnimatedCounter';

export const metadata = buildMetadata({
  title: 'العمرة',
  description: 'صفحة عمرة موجهة للمسافرين من مصر، مع محتوى واضح حول الخطوات والوثائق والاستعداد.',
  path: '/umrah',
  image: '/images/external/haram-archway-umrah-unsplash.jpg'
});

const breadcrumbs = breadcrumbJsonLd([
  { name: 'الرئيسية', path: '/' },
  { name: 'العمرة', path: '/umrah' }
]);

const stats = [
  { value: '3', label: 'فئات لبرامج العمرة' },
  { value: '4', label: 'خطوات لأداء المناسك' },
  { value: 'طوال العام', label: 'يمكن أداؤها في أي وقت' }
];

const sections = [
  { icon: CrescentMoonIcon, title: 'برامج العمرة', href: '/umrah/programs', text: 'تعرف على فئات برامج العمرة المتاحة وتواصل معنا لمعرفة المواعيد والأسعار.' },
  { icon: DocumentIcon, title: 'الأوراق المطلوبة', href: '/umrah/documents', text: 'قائمة إرشادية بالمستندات التي يحتاجها المعتمر المصري قبل السفر.' },
  { icon: CompassIcon, title: 'مناسك العمرة', href: '/umrah/guide', text: 'دليل مرتب خطوة بخطوة لمناسك العمرة من الإحرام حتى الحلق أو التقصير.' },
  { icon: MapPinIcon, title: 'مكة المكرمة', href: '/makkah', text: 'أبرز المعالم المقدسة والتاريخية في مكة المكرمة ونصائح عملية للمعتمر.' },
  { icon: MapPinIcon, title: 'المدينة المنورة', href: '/madinah', text: 'المسجد النبوي وأبرز معالم المدينة المنورة ونصائح عملية للزيارة.' },
  { icon: StarTagIcon, title: 'الأسئلة الشائعة', href: '/faq', text: 'إجابات سريعة على أكثر الأسئلة تكرارًا حول الحج والعمرة.' }
];

export default function UmrahPage() {
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
        <GeometricPattern id="umrah-hero-geo" className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.06]" />
        <IslamicMotifs tone="light" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

        <div className="container-shell relative">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
                <CrescentMoonIcon className="h-4 w-4 text-[color:var(--color-gold-soft)]" />
                العمرة
              </p>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.3] sm:text-5xl">
                العمرة من مصر: معلومات عملية ومباشرة
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80">
                يركز هذا القسم على توضيح خطوات العمرة، الاستعدادات اللازمة، والتفاصيل الأساسية التي يحتاجها المعتمر قبل السفر. يمكن أداء العمرة في أي وقت من العام، وتتكون من أربع خطوات رئيسية: الإحرام من الميقات، الطواف بالبيت، السعي بين الصفا والمروة، ثم الحلق أو التقصير.
              </p>
            </div>
          </Reveal>

          <StaggerGroup className="mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-5 text-center backdrop-blur">
                  <p className="text-2xl font-semibold text-[color:var(--color-gold-soft)]">
                    <AnimatedCounter value={stat.value} />
                  </p>
                  <p className="mt-1 text-sm text-white/75">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-[color:var(--color-background)] py-20 lg:py-28">
        <div className="container-shell">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">ابدأ من هنا</p>
              <h2 className="section-title mt-2">كل ما يخص رحلة العمرة في مكان واحد</h2>
            </div>
          </Reveal>

          <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((section, index) => (
              <StaggerItem key={section.href}>
                <Link
                  href={section.href}
                  className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-7 shadow-sm transition hover:-translate-y-1.5 hover:border-[color:var(--color-gold-soft)] hover:shadow-soft"
                >
                  <span
                    className="absolute left-5 top-5 text-4xl font-bold text-[color:var(--color-ivory)] transition-colors duration-300 group-hover:text-[color:var(--color-gold)]/20"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--color-ivory)] transition group-hover:bg-[color:var(--color-gold)]/15">
                    <section.icon className="h-5 w-5 text-[color:var(--color-gold)]" />
                  </div>
                  <h3 className="relative text-lg font-semibold text-[color:var(--color-primary)]">{section.title}</h3>
                  <p className="relative text-sm leading-8 text-[color:var(--color-muted)]">{section.text}</p>
                  <span className="relative mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-[color:var(--color-gold)]">
                    اعرف أكثر
                    <span className="inline-block transition-transform group-hover:-translate-x-1" aria-hidden="true">←</span>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </main>
  );
}
