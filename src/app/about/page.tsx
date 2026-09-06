import Image from 'next/image';
import Reveal from '@/components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import GeometricPattern from '@/components/GeometricPattern';
import IslamicMotifs from '@/components/IslamicMotifs';
import { ShieldIcon, StarTagIcon, HeartHandIcon, CompassIcon, KaabaIcon } from '@/components/icons';
import { buildMetadata } from '@/lib/metadata';
import AnimatedCounter from '@/components/motion/AnimatedCounter';

export const metadata = buildMetadata({
  title: 'من نحن',
  description: 'الشيخ حسن عوض لتنظيم رحلات الحج والعمرة من مصر، بإشراف ميداني مباشر على كل رحلة.',
  path: '/about',
  image: '/images/sections/about-group-prophets-mosque.jpg'
});

const values = [
  { icon: ShieldIcon, title: 'الأمانة', text: 'نلتزم بالوضوح والصدق في كل معلومة نقدمها، من الحجز وحتى تفاصيل الرحلة.' },
  { icon: StarTagIcon, title: 'الإتقان', text: 'نحرص على تنظيم كل تفصيلة في الرحلة بعناية، من الإقامة إلى مواعيد المناسك.' },
  { icon: HeartHandIcon, title: 'الرعاية', text: 'نولي اهتمامًا خاصًا لكبار السن والعائلات لضمان راحتهم طوال الرحلة.' },
  { icon: CompassIcon, title: 'المتابعة', text: 'فريقنا معكم ميدانيًا في كل خطوة، من الإحرام وحتى العودة إلى أرض الوطن.' }
];

export default function AboutPage() {
  return (
    <main id="main-content">
      <section className="relative overflow-hidden py-24 text-white lg:py-32">
        <Image
          src="/images/sections/about-group-prophets-mosque.jpg"
          alt="الشيخ حسن عوض وفريقه مع مجموعة من الحجاج في المسجد النبوي الشريف"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(8,50,38,0.95),rgba(11,59,44,0.88)_50%,rgba(8,50,38,0.96))]" />
        <GeometricPattern id="about-hero-geo" className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.06]" />
        <IslamicMotifs tone="light" />

        <div className="container-shell relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              <KaabaIcon className="h-4 w-4 text-[color:var(--color-gold-soft)]" />
              من نحن
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.3] sm:text-5xl">الشيخ حسن عوض لرحلات الحج والعمرة</h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/80">
              ننظم رحلات الحج والعمرة للمسافرين من مصر بإشراف ميداني مباشر من الشيخ حسن عوض وفريقه، في مكة المكرمة والمدينة المنورة، من لحظة التسجيل وحتى العودة إلى أرض الوطن.
            </p>
          </Reveal>

          <StaggerGroup className="mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-3">
            {[
              { value: '3', label: 'فئات لبرامج الحج' },
              { value: '3', label: 'فئات لبرامج العمرة' },
              { value: 'ميداني', label: 'إشراف مباشر ومستمر' }
            ].map((stat) => (
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
              <p className="eyebrow">قيمنا</p>
              <h2 className="section-title mt-2">المبادئ التي نبني عليها كل رحلة</h2>
            </div>
          </Reveal>
          <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="flex h-full flex-col gap-3 rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--color-primary)]/10">
                    <value.icon className="h-5 w-5 text-[color:var(--color-primary)]" />
                  </div>
                  <p className="font-semibold text-[color:var(--color-primary)]">{value.title}</p>
                  <p className="text-sm leading-7 text-[color:var(--color-muted)]">{value.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-[color:var(--color-surface)] py-20 lg:py-28">
        <div className="container-shell">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">كلمة المدير</p>
            <h2 className="section-title mt-2">تعرف على الشيخ حسن عوض</h2>
          </Reveal>
          <Reveal delay={0.1} className="mx-auto mt-8 max-w-3xl">
            <div className="overflow-hidden rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-soft">
              <video controls preload="none" poster="/images/gallery/trip-highlights-poster.jpg" className="aspect-video w-full bg-black">
                <source src="/videos/trip-highlights.mp4" type="video/mp4" />
              </video>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[color:var(--color-background)] py-20 lg:py-28">
        <div className="container-shell">
          <StaggerGroup className="grid gap-6 sm:grid-cols-2">
            <StaggerItem>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] border border-[color:var(--color-border)] shadow-sm">
                <Image
                  src="/images/sections/about-team-lobby.jpg"
                  alt="فريق الشيخ حسن عوض قبل انطلاق إحدى رحلات الحج والعمرة"
                  fill
                  sizes="(min-width: 640px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex h-full flex-col justify-center gap-3 rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8 text-center shadow-sm sm:text-right">
                <p className="eyebrow">فريق العمل</p>
                <h3 className="text-xl font-semibold text-[color:var(--color-primary)]">فريق ميداني مجرّب يعرف الطريق جيدًا</h3>
                <p className="text-sm leading-8 text-[color:var(--color-muted)]">
                  يضم فريقنا مرشدين ومشرفين مروا بأنفسهم برحلات حج وعمرة عديدة، ويرافقون كل مجموعة على أرض الواقع لضمان راحة الحاج والمعتمر في كل خطوة.
                </p>
              </div>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>
    </main>
  );
}
