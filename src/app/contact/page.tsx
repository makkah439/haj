import Image from 'next/image';
import ContactForm from '@/components/ContactForm';
import { siteConfig, phoneInternational, phoneSecondaryInternational, whatsappLink } from '@/lib/site-config';
import Reveal from '@/components/motion/Reveal';
import GeometricPattern from '@/components/GeometricPattern';
import IslamicMotifs from '@/components/IslamicMotifs';
import { PhoneIcon } from '@/components/icons';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'تواصل معنا',
  description: 'اتصل بنا مباشرة أو استخدم نموذج التواصل للاستفسار عن برامج الحج والعمرة.',
  path: '/contact',
  image: '/images/sections/services-field-support.jpg'
});

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className={className}>
      <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.31.66 4.523 1.9 6.44L4 29l7.73-1.86A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.8c-1.94 0-3.83-.52-5.48-1.5l-.39-.23-4.59 1.1 1.13-4.47-.25-.4A9.77 9.77 0 0 1 5.2 15c0-5.96 4.85-10.8 10.8-10.8 5.96 0 10.8 4.85 10.8 10.8 0 5.96-4.85 10.8-10.8 10.8Zm5.94-8.1c-.32-.16-1.9-.94-2.2-1.05-.29-.1-.5-.16-.72.16-.21.32-.83 1.04-1.01 1.26-.19.21-.37.24-.69.08-.32-.16-1.36-.5-2.58-1.6-.95-.85-1.6-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.74-.99-2.38-.26-.62-.53-.54-.72-.55-.19-.01-.4-.01-.61-.01-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.66 0 1.57 1.14 3.09 1.3 3.3.16.21 2.24 3.42 5.43 4.79.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

export default function ContactPage() {
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
        <GeometricPattern id="contact-hero-geo" className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.06]" />
        <IslamicMotifs tone="light" />

        <div className="container-shell relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              <PhoneIcon className="h-4 w-4 text-[color:var(--color-gold-soft)]" />
              تواصل معنا
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.3] sm:text-5xl">نحن هنا للإجابة على استفساراتك</h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/80">
              يمكنك التواصل معنا للاستفسار عن البرامج أو طلب المساعدة في ترتيبات السفر.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[color:var(--color-background)] py-20 lg:py-28">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(8,50,38,0.97),rgba(11,59,44,0.93))] p-8 text-white shadow-soft sm:p-10">
              <GeometricPattern id="contact-card-geo" className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
              <IslamicMotifs tone="light" />

              <div className="relative">
                <p className="text-sm font-semibold text-[color:var(--color-gold-soft)]">طرق التواصل السريع</p>
                <p className="mt-3 leading-8 text-white/80">
                  للرد الفوري، تواصل معنا مباشرة عبر الاتصال أو واتساب.
                </p>

                <div className="mt-8 flex flex-col gap-3">
                  <a
                    href={`tel:${phoneInternational}`}
                    className="group inline-flex items-center justify-between gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
                  >
                    اتصل بنا: {siteConfig.phone}
                    <PhoneIcon className="h-4 w-4 flex-shrink-0 text-[color:var(--color-gold-soft)]" />
                  </a>
                  <a
                    href={`tel:${phoneSecondaryInternational}`}
                    className="group inline-flex items-center justify-between gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
                  >
                    رقم إضافي: {siteConfig.phoneSecondary}
                    <PhoneIcon className="h-4 w-4 flex-shrink-0 text-[color:var(--color-gold-soft)]" />
                  </a>
                  {whatsappLink ? (
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-between gap-3 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20"
                    >
                      تواصل عبر واتساب
                      <WhatsAppIcon className="h-5 w-5 flex-shrink-0" />
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="relative mt-8 overflow-hidden rounded-[1.5rem] border border-white/15">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/sections/services-field-support.jpg"
                    alt="فريق الإشراف الميداني لشركة الشيخ حسن عوض أثناء إحدى الرحلات"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0" />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div>
              <h2 className="text-2xl font-semibold text-[color:var(--color-primary)]">راسلنا مباشرة</h2>
              <p className="mt-3 text-sm leading-7 text-[color:var(--color-muted)]">
                املأ النموذج التالي وسنعاود التواصل معك في أقرب وقت ممكن، أو استخدم أرقام الاتصال وواتساب للرد الفوري.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
