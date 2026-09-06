import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import GeometricPattern from '@/components/GeometricPattern';
import IslamicMotifs from '@/components/IslamicMotifs';
import { MapPinIcon } from '@/components/icons';
import { siteConfig } from '@/lib/site-config';
import { breadcrumbJsonLd } from '@/lib/breadcrumbs';
import { buildMetadata } from '@/lib/metadata';

const breadcrumbs = breadcrumbJsonLd([
  { name: 'الرئيسية', path: '/' },
  { name: 'المدينة المنورة', path: '/madinah' }
]);

export const metadata = buildMetadata({
  title: 'المدينة المنورة: أهم المعالم والمعلومات للحاج والمعتمر',
  description: 'دليل تعريفي بأبرز المعالم في المدينة المنورة: المسجد النبوي الشريف، مسجد قباء، مسجد القبلتين، وأهم النصائح العملية لزيارتها.',
  path: '/madinah',
  image: '/images/external/nabawi-dome-sunrise-unsplash.jpg'
});

const landmarks = [
  {
    title: 'المسجد النبوي الشريف',
    text: 'ثاني أقدس مسجد عند المسلمين، ويضم الروضة الشريفة وحجرة النبي محمد صلى الله عليه وسلم. يقصده معظم الحجاج والمعتمرين ضمن برنامج زيارتهم للمدينة المنورة.'
  },
  {
    title: 'الروضة الشريفة',
    text: 'بقعة داخل المسجد النبوي ورد في الحديث الشريف وصفها بأنها "روضة من رياض الجنة"، ويحرص الزائرون على الصلاة فيها، مع مراعاة الأنظمة المعمول بها لتنظيم الدخول إليها.'
  },
  {
    title: 'مسجد قباء',
    text: 'أول مسجد بُني في الإسلام، ومن السنة المؤكدة زيارته وأداء ركعتين فيه، وهو من أقرب المعالم التاريخية إلى المسجد النبوي.'
  },
  {
    title: 'مسجد القبلتين',
    text: 'موقع تاريخي تحول فيه اتجاه القبلة من بيت المقدس إلى الكعبة المشرفة أثناء الصلاة، ويحمل اسمه لهذا السبب.'
  },
  {
    title: 'جبل أحد ومقبرة الشهداء',
    text: 'موقع غزوة أحد التاريخية، ويضم مقبرة عدد من الصحابة الذين استشهدوا فيها، ويقصده الزائرون للتعرف على تاريخ الغزوة.'
  },
  {
    title: 'مقبرة البقيع',
    text: 'مقبرة تاريخية قريبة من المسجد النبوي، تضم رفات عدد كبير من الصحابة وأهل بيت النبي صلى الله عليه وسلم.'
  }
];

const tips = [
  'أجواء المدينة المنورة أهدأ عادة من مكة المكرمة، لذا تُعد فرصة جيدة للزيارة بروية والصلاة في المسجد النبوي بأوقات متعددة.',
  'تحقق من الإجراءات المعمول بها حاليًا لدخول الروضة الشريفة، فقد تتطلب تصريحًا مسبقًا حسب الأنظمة المتبعة وقت الزيارة.',
  'يُفضل تخصيص وقت كافٍ لزيارة قباء وأحد والبقيع ضمن برنامج الرحلة دون استعجال.',
  'حافظ على الهدوء والسكينة أثناء التواجد في المسجد النبوي، خاصة في المناطق القريبة من الروضة الشريفة.'
];

export default function MadinahPage() {
  const placeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: 'المسجد النبوي الشريف',
    address: { '@type': 'PostalAddress', addressLocality: 'المدينة المنورة', addressCountry: 'SA' },
    description: 'ثاني أقدس مسجد عند المسلمين، ويضم الروضة الشريفة وحجرة النبي محمد صلى الله عليه وسلم.'
  };

  return (
    <main id="main-content">
      <section className="relative overflow-hidden py-24 text-white lg:py-32">
        <Image
          src="/images/external/nabawi-dome-sunrise-unsplash.jpg"
          alt="قبة المسجد النبوي الشريف عند شروق الشمس في المدينة المنورة"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(8,50,38,0.95),rgba(11,59,44,0.88)_50%,rgba(8,50,38,0.96))]" />
        <GeometricPattern id="madinah-hero-geo" className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.06]" />
        <IslamicMotifs tone="light" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

        <div className="container-shell relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              <MapPinIcon className="h-4 w-4 text-[color:var(--color-gold-soft)]" />
              المدن المقدسة
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.3] sm:text-5xl">المدينة المنورة: أهم المعالم والمعلومات</h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/80">
              نظرة تعريفية على أبرز المعالم الدينية والتاريخية في المدينة المنورة، مع نصائح عملية تساعدك على تنظيم زيارتك بهدوء واطمئنان.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[color:var(--color-background)] py-20 lg:py-28">
        <div className="container-shell">
          <StaggerGroup className="grid gap-4 md:grid-cols-2">
            {landmarks.map((item) => (
              <StaggerItem key={item.title}>
                <div className="flex h-full flex-col gap-2 rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                  <h2 className="text-lg font-semibold text-[color:var(--color-primary)]">{item.title}</h2>
                  <p className="text-sm leading-8 text-[color:var(--color-muted)]">{item.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-10 max-w-3xl rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-ivory)] p-6">
              <h2 className="text-lg font-semibold text-[color:var(--color-primary)]">نصائح عملية أثناء زيارة المدينة المنورة</h2>
              <ul className="mt-4 space-y-3">
                {tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-3 text-sm leading-8 text-[color:var(--color-muted)]">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[color:var(--color-gold)]" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mx-auto mt-6 max-w-3xl rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 text-sm leading-8 text-[color:var(--color-muted)] shadow-sm">
              هذه المعلومات للتعريف العام بمعالم المدينة المنورة، ولا تغني عن إرشادات فريق {siteConfig.shortName} الميدانية أثناء الرحلة بخصوص أفضل التوقيتات والتنظيم اليومي.
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
              <Link href="/umrah/guide" className="rounded-full bg-[color:var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[color:var(--color-primary-dark)]">
                دليل مناسك العمرة
              </Link>
              <Link href="/makkah" className="rounded-full border border-[color:var(--color-border)] px-5 py-2.5 text-sm font-semibold text-[color:var(--color-primary)] transition hover:bg-[color:var(--color-ivory)]">
                تعرف على مكة المكرمة
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
