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
  { name: 'العمرة', path: '/umrah' },
  { name: 'الأوراق المطلوبة', path: '/umrah/documents' }
]);

export const metadata = buildMetadata({
  title: 'الأوراق والمستندات المطلوبة للعمرة',
  description: 'قائمة إرشادية بالأوراق والمستندات التي يحتاجها المعتمر المصري قبل السفر: جواز السفر، التأشيرة، والصور الشخصية.',
  path: '/umrah/documents',
  image: '/images/sections/umrah-documents-prophets-mosque.jpg'
});

const documents = [
  {
    title: 'جواز سفر ساري المفعول',
    text: 'يُفضل أن يكون جواز السفر ساري الصلاحية لمدة لا تقل عن 6 أشهر من تاريخ السفر، مع وجود صفحات فارغة كافية للتأشيرة.'
  },
  {
    title: 'تأشيرة العمرة',
    text: 'تُصدر تأشيرة العمرة إلكترونيًا عادة عبر المنصات والجهات المرخصة، وتحدد مدة الإقامة المسموح بها داخل المملكة العربية السعودية.'
  },
  {
    title: 'شهادة التطعيمات',
    text: 'قد تُشترط بعض التطعيمات الموسمية بحسب تعليمات الجهات الصحية في مصر والسعودية وقت السفر، خاصة في مواسم الازدحام كشهر رمضان.'
  },
  {
    title: 'صور شخصية حديثة',
    text: 'عدد من الصور الشخصية بخلفية بيضاء بالمواصفات المطلوبة لاستخراج التأشيرة.'
  },
  {
    title: 'بطاقة الرقم القومي',
    text: 'نسخة من بطاقة الرقم القومي سارية الصلاحية لاستخدامها في إجراءات التسجيل والحجز.'
  }
];

export default function UmrahDocumentsPage() {
  return (
    <main id="main-content">
      <section className="relative overflow-hidden py-24 text-white lg:py-32">
        <Image
          src="/images/sections/umrah-documents-prophets-mosque.jpg"
          alt="معتمرون أمام باحات المسجد النبوي الشريف"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(8,50,38,0.95),rgba(11,59,44,0.88)_50%,rgba(8,50,38,0.96))]" />
        <GeometricPattern id="umrah-documents-geo" className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.06]" />
        <IslamicMotifs tone="light" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

        <div className="container-shell relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              <DocumentIcon className="h-4 w-4 text-[color:var(--color-gold-soft)]" />
              العمرة
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.3] sm:text-5xl">الأوراق والمستندات المطلوبة للعمرة</h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/80">
              قائمة إرشادية بأهم الأوراق التي يحتاجها المعتمر المصري عادة قبل السفر، مع نصيحة بالتأكد من آخر التحديثات الرسمية قبل الحجز.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[color:var(--color-background)] py-20 lg:py-28">
        <div className="container-shell">
          <Reveal>
            <p className="mx-auto max-w-2xl text-center text-sm leading-8 text-[color:var(--color-muted)]">
              العمرة قد تكون رحلة أقصر من الحج، لكن التجهيز الجيد للأوراق يوفر عليك وقتًا وجهدًا كبيرين قبل السفر. إليك أهم المستندات التي يحتاجها المعتمر المصري عادة.
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
              تتغير بعض الاشتراطات من فترة لأخرى بقرار من الجهات الرسمية في مصر والسعودية، لذلك يُنصح دائمًا بالتواصل معنا للتأكد من آخر المستجدات قبل استكمال إجراءات السفر.
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
