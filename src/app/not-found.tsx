import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import GeometricPattern from '@/components/GeometricPattern';
import IslamicMotifs from '@/components/IslamicMotifs';
import { KaabaIcon, CompassIcon } from '@/components/icons';
import { routes } from '@/lib/site-config';

const shortcuts = [
  { label: 'برامج الحج', href: routes.hajjPrograms },
  { label: 'برامج العمرة', href: routes.umrahPrograms },
  { label: 'الأسئلة الشائعة', href: routes.faq },
  { label: 'تواصل معنا', href: routes.contact }
];

export default function NotFound() {
  return (
    <main id="main-content" className="relative flex min-h-[85vh] items-center overflow-hidden py-20 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(8,50,38,0.98),rgba(11,59,44,0.95)_55%,rgba(6,42,32,0.98))]" />
      <GeometricPattern id="notfound-geo" className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]" />
      <IslamicMotifs tone="light" />

      <div className="container-shell relative mx-auto max-w-2xl text-center">
        <Reveal>
          <KaabaIcon className="mx-auto h-12 w-12 text-[color:var(--color-gold-soft)]" />
          <p className="mt-6 text-8xl font-bold text-white/10 sm:text-9xl">404</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="-mt-8 text-3xl font-semibold sm:text-4xl">يبدو أنك ضللت الطريق</h1>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-8 text-white/75">
            الصفحة التي تبحث عنها غير متاحة أو تم نقلها. لا بأس، إليك بعض الوجهات التي قد تساعدك في إكمال رحلتك على الموقع.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <Link
            href="/"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-gold)] px-6 py-3 font-semibold text-[color:var(--color-primary-dark)] transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20"
          >
            <CompassIcon className="h-4 w-4" />
            العودة إلى الرئيسية
          </Link>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {shortcuts.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:border-white/40 hover:bg-white/15 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </main>
  );
}
