import Image from 'next/image';
import Reveal from '@/components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import GeometricPattern from '@/components/GeometricPattern';
import IslamicMotifs from '@/components/IslamicMotifs';
import { DocumentIcon } from '@/components/icons';
import { breadcrumbJsonLd } from '@/lib/breadcrumbs';
import { buildMetadata } from '@/lib/metadata';

const breadcrumbs = breadcrumbJsonLd([
  { name: 'الرئيسية', path: '/' },
  { name: 'الحج', path: '/hajj' },
  { name: 'الأوراق المطلوبة', path: '/hajj/documents' }
]);

export const metadata = buildMetadata({
  title: 'الأوراق والمستندات المطلوبة للحج',
  description: 'قائمة إرشادية بالأوراق والمستندات التي يحتاجها الحاج المصري قبل السفر: جواز السفر، التطعيمات، والصور الشخصية.',
  path: '/hajj/documents',
  image: '/images/sections/hajj-documents-elders-kaaba.jpg'
});

const documents = [
  {
    title: 'جواز سفر ساري المفعول',
    text: 'يُفضل أن يكون جواز السفر ساري الصلاحية لمدة لا تقل عن 6 أشهر من تاريخ السفر، مع التأكد من وجود صفحات فارغة كافية للتأشيرة والأختام.'
  },
  {
    title: 'تأشيرة الحج',
    text: 'تُصدر تأشيرة الحج عادة عبر الجهات والبعثات الرسمية المرخصة، وترتبط بمنظومة الحج الإلكترونية المعتمدة من الجهات السعودية.'
  },
  {
    title: 'شهادة التطعيمات',
    text: 'تشترط الجهات الصحية السعودية عادة تطعيم الحمى الشوكية (المكورات السحائية)، وقد تُطلب تطعيمات موسمية إضافية بحسب تعليمات وزارة الصحة المصرية والسعودية في موسم الحج.'
  },
  {
    title: 'صور شخصية حديثة',
    text: 'عدد من الصور الشخصية بخلفية بيضاء بالمواصفات المطلوبة لاستخراج التأشيرة والبطاقات التعريفية الخاصة بالبعثة.'
  },
  {
    title: 'بطاقة الرقم القومي',
    text: 'نسخة من بطاقة الرقم القومي سارية الصلاحية، وتُستخدم في إجراءات التسجيل مع الجهات المنظمة داخل مصر.'
  },
  {
    title: 'إثبات السداد المالي',
    text: 'ما يفيد سداد قيمة البرنامج أو الحجز مع الجهة المنظمة، وفق الآلية المعتمدة لدى شركة الحج والعمرة.'
  }
];

export default function HajjDocumentsPage() {
  return (
    <main id="main-content">
      <section className="relative overflow-hidden py-24 text-white lg:py-32">
        <Image
          src="/images/sections/hajj-documents-elders-kaaba.jpg"
          alt="حجاج من كبار السن أمام الكعبة المشرفة ليلًا"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(8,50,38,0.95),rgba(11,59,44,0.88)_50%,rgba(8,50,38,0.96))]" />
        <GeometricPattern id="hajj-documents-geo" className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.06]" />
        <IslamicMotifs tone="light" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

        <div className="container-shell relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              <DocumentIcon className="h-4 w-4 text-[color:var(--color-gold-soft)]" />
              الحج
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.3] sm:text-5xl">الأوراق والمستندات المطلوبة للحج</h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/80">
              قائمة إرشادية بأهم الأوراق التي يحتاجها الحاج المصري عادة قبل السفر، مع نصيحة بالتأكد من آخر التحديثات الرسمية قبل موسم كل حج.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[color:var(--color-background)] py-20 lg:py-28">
        <div className="container-shell">
          <Reveal>
            <p className="mx-auto max-w-2xl text-center text-sm leading-8 text-[color:var(--color-muted)]">
              تجهيز الأوراق مبكرًا هو الخطوة الأولى نحو رحلة حج مطمئنة بلا مفاجآت في اللحظات الأخيرة. هذه القائمة تجمع أهم المستندات التي يطلبها الحاج المصري عادة، مرتبة لتساعدك على المتابعة بسهولة قبل موعد السفر.
            </p>
          </Reveal>

          <StaggerGroup className="mt-12 grid gap-4 md:grid-cols-2">
            {documents.map((doc, index) => (
              <StaggerItem key={doc.title}>
                <div className="flex h-full gap-4 rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--color-primary)]/10 text-sm font-semibold text-[color:var(--color-primary)]">
                    {index + 1}
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold text-[color:var(--color-primary)]">{doc.title}</h2>
                    <p className="mt-2 text-sm leading-8 text-[color:var(--color-muted)]">{doc.text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-10 max-w-3xl rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-ivory)] p-6 text-center text-sm leading-8 text-[color:var(--color-muted)]">
              تتغير بعض الاشتراطات (خاصة الصحية منها) من موسم لآخر بقرار من الجهات الرسمية في مصر والسعودية، لذلك يُنصح دائمًا بالتواصل معنا للتأكد من آخر المستجدات قبل استكمال إجراءات السفر.
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
