import { PhoneIcon, DocumentIcon, CrescentMoonIcon, KaabaIcon, HeartHandIcon } from '@/components/icons';
import Reveal from '@/components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import IslamicMotifs from '@/components/IslamicMotifs';

const steps = [
  { icon: PhoneIcon, title: 'التواصل والاستشارة', text: 'تتواصل معنا وتختار فئة البرنامج المناسبة لاحتياجك وميزانيتك.' },
  { icon: DocumentIcon, title: 'استكمال الأوراق', text: 'نساعدك في تجهيز المستندات والتأشيرة والتطعيمات المطلوبة.' },
  { icon: CrescentMoonIcon, title: 'السفر والإحرام', text: 'تبدأ رحلتك من الميقات بنية الحج أو العمرة بتوجيه من فريقنا.' },
  { icon: KaabaIcon, title: 'أداء المناسك', text: 'متابعة ميدانية مباشرة معك في كل خطوة داخل الحرمين الشريفين.' },
  { icon: HeartHandIcon, title: 'العودة بأمان', text: 'نرافقك حتى العودة إلى أرض الوطن بذكريات إيمانية لا تُنسى.' }
];

export default function JourneyTimeline() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-background)] py-20 lg:py-28">
      <IslamicMotifs tone="dark" />
      <div className="container-shell relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">كيف تبدأ رحلتك؟</p>
            <h2 className="section-title mt-2">خمس خطوات تفصلك عن بيت الله الحرام</h2>
          </div>
        </Reveal>

        <StaggerGroup className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="pointer-events-none absolute top-[26px] right-0 hidden h-px w-full bg-[color:var(--color-border)] lg:block" aria-hidden="true" />
          {steps.map((step, index) => (
            <StaggerItem key={step.title}>
              <div className="group relative flex cursor-default flex-col items-center text-center">
                <div className="relative">
                  <span className="absolute inset-0 -z-10 scale-90 rounded-full bg-[color:var(--color-gold)]/25 opacity-0 blur-lg transition-all duration-300 group-hover:scale-150 group-hover:opacity-100" aria-hidden="true" />
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[color:var(--color-gold)] bg-[color:var(--color-surface)] shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:scale-110 group-hover:bg-[color:var(--color-gold)] group-hover:shadow-lg">
                    <step.icon className="h-6 w-6 text-[color:var(--color-primary)] transition-colors duration-300 group-hover:text-white" />
                    <span className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--color-primary)] text-xs font-semibold text-white transition-transform duration-300 group-hover:scale-110">
                      {index + 1}
                    </span>
                  </div>
                </div>
                <p className="mt-4 font-semibold text-[color:var(--color-primary)] transition-colors duration-300 group-hover:text-[color:var(--color-gold)]">{step.title}</p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--color-muted)]">{step.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
