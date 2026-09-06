import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import GeometricPattern from '@/components/GeometricPattern';
import IslamicMotifs from '@/components/IslamicMotifs';
import { CompassIcon } from '@/components/icons';
import { breadcrumbJsonLd } from '@/lib/breadcrumbs';
import { buildMetadata } from '@/lib/metadata';

const breadcrumbs = breadcrumbJsonLd([
  { name: 'الرئيسية', path: '/' },
  { name: 'الحج', path: '/hajj' },
  { name: 'دليل مناسك الحج', path: '/hajj/guide' }
]);

export const metadata = buildMetadata({
  title: 'دليل مناسك الحج خطوة بخطوة',
  description: 'دليل شامل لمناسك الحج بالترتيب: الإحرام، الطواف، السعي، يوم عرفة، مزدلفة، رمي الجمرات، والتحلل، بشرح مبسط للحاج القادم من مصر.',
  path: '/hajj/guide',
  image: '/images/external/haram-archway-umrah-unsplash.jpg'
});

const rituals = [
  {
    title: 'الإحرام',
    day: 'اليوم الأول (8 ذو الحجة - يوم التروية)',
    text: 'يبدأ الحاج إحرامه من الميقات، بنية الحج ولبس ملابس الإحرام، ثم يتوجه إلى منى للمبيت بها استعدادًا ليوم عرفة، مع الإكثار من التلبية.'
  },
  {
    title: 'يوم عرفة',
    day: 'اليوم الثاني (9 ذو الحجة)',
    text: 'الوقوف بعرفة هو ركن الحج الأعظم، ويكون من زوال شمس يوم عرفة حتى فجر يوم النحر، ويُستحب الإكثار من الدعاء والذكر خلاله.'
  },
  {
    title: 'مزدلفة',
    day: 'ليلة اليوم الثالث',
    text: 'بعد الدفع من عرفة يتوجه الحاج إلى مزدلفة للمبيت بها وجمع الحصى اللازم لرمي الجمرات في الأيام التالية.'
  },
  {
    title: 'رمي جمرة العقبة والنحر والحلق',
    day: 'يوم النحر (10 ذو الحجة)',
    text: 'يبدأ اليوم برمي جمرة العقبة الكبرى، يليه ذبح الهدي، ثم الحلق أو التقصير، وبذلك يحل التحلل الأول للحاج.'
  },
  {
    title: 'طواف الإفاضة والسعي',
    day: 'يوم النحر أو ما بعده',
    text: 'التوجه إلى مكة المكرمة لأداء طواف الإفاضة (ركن الحج) والسعي بين الصفا والمروة لمن لم يكن قد سعى مسبقًا، ويحل بعده التحلل الكامل.'
  },
  {
    title: 'أيام التشريق ورمي الجمرات',
    day: '11، 12، (و13) ذو الحجة',
    text: 'المبيت في منى ورمي الجمرات الثلاث (الصغرى والوسطى والكبرى) في كل يوم من أيام التشريق، مع جواز التعجل بيومين لمن أراد.'
  },
  {
    title: 'طواف الوداع',
    day: 'قبل مغادرة مكة',
    text: 'آخر مناسك الحج، حيث يودع الحاج البيت الحرام بطواف قبل التوجه للسفر، وهو واجب على غير الحائض والنفساء.'
  }
];

export default function HajjGuidePage() {
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
        <GeometricPattern id="hajj-guide-geo" className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.06]" />
        <IslamicMotifs tone="light" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

        <div className="container-shell relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              <CompassIcon className="h-4 w-4 text-[color:var(--color-gold-soft)]" />
              دليل الحج
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.3] sm:text-5xl">دليل مناسك الحج خطوة بخطوة</h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/80">
              ترتيب مبسط لمناسك الحج من الإحرام حتى طواف الوداع، ليكون مرجعًا سريعًا للحاج قبل السفر وأثناء أداء المناسك.
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
                      <span className="text-xs font-semibold text-[color:var(--color-gold)]">{step.day}</span>
                    </div>
                    <p className="mt-3 text-sm leading-8 text-[color:var(--color-muted)]">{step.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <Reveal delay={0.1}>
              <div className="mt-10 rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-ivory)] p-6 text-sm leading-8 text-[color:var(--color-muted)]">
                هذا الدليل للتعريف العام بترتيب المناسك، ولا يغني عن استشارة أهل العلم أو المرشدين المرافقين للبعثة بخصوص التفاصيل الفقهية والحالات الخاصة.
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/hajj/documents" className="rounded-full bg-[color:var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[color:var(--color-primary-dark)]">
                  الأوراق المطلوبة للحج
                </Link>
                <Link href="/hajj/programs" className="rounded-full border border-[color:var(--color-border)] px-5 py-2.5 text-sm font-semibold text-[color:var(--color-primary)] transition hover:bg-[color:var(--color-ivory)]">
                  استعرض برامج الحج
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
