import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import GeometricPattern from '@/components/GeometricPattern';
import IslamicMotifs from '@/components/IslamicMotifs';
import { CrescentMoonIcon } from '@/components/icons';
import { breadcrumbJsonLd } from '@/lib/breadcrumbs';
import { buildMetadata } from '@/lib/metadata';

const breadcrumbs = breadcrumbJsonLd([
  { name: 'الرئيسية', path: '/' },
  { name: 'العمرة', path: '/umrah' },
  { name: 'دليل مناسك العمرة', path: '/umrah/guide' }
]);

export const metadata = buildMetadata({
  title: 'دليل مناسك العمرة خطوة بخطوة',
  description: 'دليل شامل لمناسك العمرة بالترتيب: الإحرام، الطواف، السعي بين الصفا والمروة، والحلق أو التقصير، بشرح مبسط للمعتمر القادم من مصر.',
  path: '/umrah/guide',
  image: '/images/sections/umrah-guide-prophets-mosque.jpg'
});

const rituals = [
  {
    title: 'الإحرام من الميقات',
    text: 'يبدأ المعتمر إحرامه من الميقات المحدد بحسب خط رحلته، بنية العمرة ولبس ملابس الإحرام، مع الإكثار من التلبية حتى الوصول إلى مكة المكرمة.'
  },
  {
    title: 'الطواف بالبيت',
    text: 'عند الوصول إلى المسجد الحرام، يبدأ المعتمر بطواف سبعة أشواط حول الكعبة المشرفة، ابتداءً من الحجر الأسود.'
  },
  {
    title: 'صلاة ركعتين خلف مقام إبراهيم',
    text: 'بعد إتمام الطواف يُستحب صلاة ركعتين خلف مقام إبراهيم إن أمكن، أو في أي مكان مناسب من المسجد الحرام.'
  },
  {
    title: 'السعي بين الصفا والمروة',
    text: 'يؤدي المعتمر سبعة أشواط بين جبلي الصفا والمروة، بدءًا من الصفا وانتهاءً بالمروة.'
  },
  {
    title: 'الحلق أو التقصير',
    text: 'يختم المعتمر عمرته بحلق شعر رأسه أو تقصيره، وبذلك يتم التحلل من الإحرام وتكتمل مناسك العمرة.'
  }
];

export default function UmrahGuidePage() {
  return (
    <main id="main-content">
      <section className="relative overflow-hidden py-24 text-white lg:py-32">
        <Image
          src="/images/sections/umrah-guide-prophets-mosque.jpg"
          alt="معتمرون في ساحات المسجد النبوي الشريف نهارًا"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(8,50,38,0.95),rgba(11,59,44,0.88)_50%,rgba(8,50,38,0.96))]" />
        <GeometricPattern id="umrah-guide-geo" className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.06]" />
        <IslamicMotifs tone="light" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

        <div className="container-shell relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              <CrescentMoonIcon className="h-4 w-4 text-[color:var(--color-gold-soft)]" />
              دليل العمرة
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.3] sm:text-5xl">دليل مناسك العمرة خطوة بخطوة</h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/80">
              ترتيب مبسط لمناسك العمرة من الإحرام حتى الحلق أو التقصير، ليكون مرجعًا سريعًا للمعتمر قبل السفر وأثناء الأداء.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[color:var(--color-background)] py-20 lg:py-28">
        <div className="container-shell">
          <div className="mx-auto max-w-2xl">
            <StaggerGroup className="space-y-5">
              {rituals.map((step, index) => (
                <StaggerItem key={step.title}>
                  <div className="rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--color-primary)] text-sm font-semibold text-white">
                        {index + 1}
                      </span>
                      <h2 className="text-lg font-semibold text-[color:var(--color-primary)]">{step.title}</h2>
                    </div>
                    <p className="mt-3 text-sm leading-8 text-[color:var(--color-muted)]">{step.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <Reveal delay={0.1}>
              <div className="mt-10 rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-ivory)] p-6 text-sm leading-8 text-[color:var(--color-muted)]">
                هذا الدليل للتعريف العام بترتيب مناسك العمرة، ولا يغني عن استشارة أهل العلم أو المرشدين المرافقين بخصوص التفاصيل الفقهية والحالات الخاصة.
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/umrah/documents" className="rounded-full bg-[color:var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[color:var(--color-primary-dark)]">
                  الأوراق المطلوبة للعمرة
                </Link>
                <Link href="/umrah/programs" className="rounded-full border border-[color:var(--color-border)] px-5 py-2.5 text-sm font-semibold text-[color:var(--color-primary)] transition hover:bg-[color:var(--color-ivory)]">
                  استعرض برامج العمرة
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
