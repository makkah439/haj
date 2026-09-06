import PageShell from '@/components/PageShell';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'الشروط والأحكام',
  description: 'الشروط القانونية لاستخدام الموقع والمحتوى المعروض عليه.',
  path: '/terms'
});

const sections = [
  {
    title: 'طبيعة المحتوى',
    text: 'المحتوى المنشور على هذا الموقع (بما في ذلك أدلة المناسك وقوائم المستندات) مُقدَّم لأغراض المعلومات العامة، ولا يغني عن استشارة الجهات الرسمية أو أهل العلم في الحالات الفردية والتفاصيل الفقهية الدقيقة.'
  },
  {
    title: 'البرامج والأسعار',
    text: 'تفاصيل برامج الحج والعمرة (المدة، الإقامة، الأسعار) قابلة للتغيير من موسم لآخر، ولا تُعد الصفحات التعريفية على الموقع عرضًا نهائيًا وملزمًا إلا بعد التأكيد المباشر معنا.'
  },
  {
    title: 'الملكية الفكرية',
    text: 'جميع النصوص والصور والشعار الخاصة بالموقع مملوكة لشركة الشيخ حسن عوض للحج والعمرة، ولا يجوز إعادة استخدامها دون إذن مسبق.'
  },
  {
    title: 'الروابط الخارجية',
    text: 'قد يتضمن الموقع روابط لمواقع أو جهات خارجية لأغراض توضيحية، ولسنا مسؤولين عن محتوى هذه المواقع أو سياساتها.'
  },
  {
    title: 'التعديل على الشروط',
    text: 'يجوز تحديث هذه الشروط من وقت لآخر لمواكبة التغييرات في الخدمات المقدمة، ويُنصح بمراجعة هذه الصفحة بشكل دوري.'
  }
];

export default function TermsPage() {
  return (
    <PageShell title="الشروط والأحكام" eyebrow="السياسات" description="يرجى قراءة الشروط قبل استخدام الموقع أو التواصل من خلاله.">
      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.title} className="rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[color:var(--color-primary)]">{section.title}</h2>
            <p className="mt-3 text-sm leading-8 text-[color:var(--color-muted)]">{section.text}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
