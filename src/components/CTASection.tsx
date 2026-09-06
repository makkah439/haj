import Link from 'next/link';
import { routes, siteConfig, phoneInternational } from '@/lib/site-config';
import GeometricPattern from '@/components/GeometricPattern';
import Reveal from '@/components/motion/Reveal';
import { PhoneIcon } from '@/components/icons';
import IslamicMotifs from '@/components/IslamicMotifs';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(15,77,58,0.95),rgba(8,50,38,0.93))] py-20 text-white">
      <GeometricPattern id="cta-geo" className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
      <IslamicMotifs tone="light" />
      <Reveal className="container-shell relative">
        <div className="flex flex-col items-center gap-6 rounded-[2rem] border border-white/15 bg-white/10 p-10 text-center shadow-soft backdrop-blur lg:flex-row lg:items-center lg:justify-between lg:text-right">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[color:var(--color-gold-soft)]">استفسار سريع</p>
            <h2 className="mt-3 text-3xl font-semibold">ابدأ رحلتك مع معلومات واضحة قبل أي قرار</h2>
            <p className="mt-4 text-lg leading-8 text-white/75">
              يمكن التواصل معنا للاستفسار عن البرامج والمحتوى الأساسي حول الحج أو العمرة.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
            <a
              href={`tel:${phoneInternational}`}
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-gold)] px-6 py-3 font-semibold text-[color:var(--color-primary-dark)] transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20"
            >
              {siteConfig.phone}
              <PhoneIcon className="h-4 w-4" />
            </a>
            <Link href={routes.contact} className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
              تواصل معنا
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
