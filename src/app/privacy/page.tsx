import PageShell from '@/components/PageShell';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'سياسة الخصوصية',
  description: 'تفاصيل سياسة الخصوصية والاستخدام للموقع.',
  path: '/privacy'
});

const sections = [
  {
    title: 'البيانات التي نجمعها',
    text: 'نجمع فقط البيانات التي تقدمها بنفسك عبر نموذج التواصل، مثل الاسم ورقم الهاتف والبريد الإلكتروني ونص الاستفسار.'
  },
  {
    title: 'كيفية استخدام البيانات',
    text: 'تُستخدم هذه البيانات فقط للرد على استفسارك والتواصل معك بخصوص برامج الحج والعمرة، ولا تُستخدم لأي غرض تسويقي دون موافقتك.'
  },
  {
    title: 'مشاركة البيانات',
    text: 'لا نقوم ببيع أو مشاركة بياناتك مع أي جهة خارجية، إلا في الحدود اللازمة لاستكمال إجراءات السفر (كالتأشيرات) وبعلمك.'
  },
  {
    title: 'حقوقك',
    text: 'يمكنك في أي وقت طلب معرفة البيانات التي نحتفظ بها عنك أو طلب حذفها، من خلال التواصل معنا مباشرة.'
  }
];

export default function PrivacyPage() {
  return (
    <PageShell title="سياسة الخصوصية" eyebrow="السياسات" description="نلتزم بحماية البيانات والخصوصية وفقًا لمبادئ الاستخدام الواضحة والشفافة.">
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
