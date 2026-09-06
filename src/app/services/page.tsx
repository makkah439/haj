import Image from 'next/image';
import Reveal from '@/components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import GeometricPattern from '@/components/GeometricPattern';
import IslamicMotifs from '@/components/IslamicMotifs';
import { CompassIcon, ShieldIcon, DocumentIcon, GroupIcon } from '@/components/icons';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'خدماتنا',
  description: 'استكشف الخدمات الرئيسية التي تقدمها شركة الشيخ حسن عوض لدعم رحلة الحج والعمرة من التسجيل وحتى العودة.',
  path: '/services',
  image: '/images/sections/services-field-support.jpg'
});

const services = [
  {
    icon: CompassIcon,
    title: 'إرشاد وتوجيه قبل السفر',
    text: 'شرح مبسط لخطوات الرحلة والمناسك والأوراق المطلوبة، لضمان استعداد كامل للحاج والمعتمر قبل الانطلاق.'
  },
  {
    icon: ShieldIcon,
    title: 'متابعة ميدانية أثناء الرحلة',
    text: 'مرافقة ومتابعة على مدار الرحلة في مكة المكرمة والمدينة المنورة، لتيسير أداء المناسك بطمأنينة.'
  },
  {
    icon: DocumentIcon,
    title: 'تنظيم إجراءات السفر',
    text: 'مساعدة في استكمال الأوراق والتأشيرات والحجوزات وفق الجهات الرسمية المعتمدة.'
  },
  {
    icon: GroupIcon,
    title: 'برامج مصممة لفئات مختلفة',
    text: 'برامج حج وعمرة تراعي احتياجات كبار السن والعائلات، مع خيارات متعددة للمدة ومستوى الخدمة.'
  }
];

export default function ServicesPage() {
  return (
    <main id="main-content">
      <section className="relative overflow-hidden py-24 text-white lg:py-32">
        <Image
          src="/images/sections/services-field-support.jpg"
          alt="فريق الإشراف الميداني لشركة الشيخ حسن عوض أثناء إحدى الرحلات"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(8,50,38,0.95),rgba(11,59,44,0.88)_50%,rgba(8,50,38,0.96))]" />
        <GeometricPattern id="services-hero-geo" className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.06]" />
        <IslamicMotifs tone="light" />

        <div className="container-shell relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              <ShieldIcon className="h-4 w-4 text-[color:var(--color-gold-soft)]" />
              خدمات
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.3] sm:text-5xl">خدماتنا</h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/80">
              نقدم خدمات موجهة لتسهيل رحلة الحج والعمرة مع وضوح المعلومات وتوجيه مريح من قبل وأثناء وبعد الرحلة.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[color:var(--color-background)] py-20 lg:py-28">
        <div className="container-shell">
          <StaggerGroup className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <div className="flex h-full flex-col gap-3 rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--color-primary)]/10">
                    <service.icon className="h-5 w-5 text-[color:var(--color-primary)]" />
                  </div>
                  <h2 className="text-lg font-semibold text-[color:var(--color-primary)]">{service.title}</h2>
                  <p className="text-sm leading-8 text-[color:var(--color-muted)]">{service.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </main>
  );
}
