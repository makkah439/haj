import { ShieldIcon, GroupIcon, CompassIcon, HeartHandIcon } from '@/components/icons';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';

const highlights = [
  { icon: ShieldIcon, label: 'إشراف ميداني موثوق' },
  { icon: CompassIcon, label: 'إرشاد واضح خطوة بخطوة' },
  { icon: GroupIcon, label: 'مجموعات منظمة لكل رحلة' },
  { icon: HeartHandIcon, label: 'رعاية خاصة لكبار السن' }
];

export default function TrustStrip() {
  return (
    <section className="border-y border-[color:var(--color-border)] bg-[color:var(--color-surface)]/80">
      <StaggerGroup className="container-shell flex flex-wrap items-center justify-center gap-3 py-5 sm:gap-4">
        {highlights.map(({ icon: Icon, label }) => (
          <StaggerItem key={label}>
            <span className="flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-ivory)] px-4 py-2.5 text-sm text-[color:var(--color-primary-dark)]">
              <Icon className="h-4 w-4 flex-shrink-0 text-[color:var(--color-gold)]" />
              {label}
            </span>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
