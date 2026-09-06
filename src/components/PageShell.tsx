import Image from 'next/image';
import Reveal from '@/components/motion/Reveal';

export default function PageShell({
  title,
  eyebrow,
  description,
  image,
  children
}: {
  title: string;
  eyebrow?: string;
  description?: string;
  image?: { src: string; alt: string };
  children: React.ReactNode;
}) {
  return (
    <main id="main-content" className="container-shell py-20">
      <Reveal className="mx-auto max-w-4xl text-center sm:mx-0 sm:text-right">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="mt-4 text-4xl font-semibold text-[color:var(--color-primary)]">{title}</h1>
        {description ? <p className="mt-6 text-lg leading-8 text-[color:var(--color-muted)]">{description}</p> : null}
      </Reveal>
      {image ? (
        <Reveal delay={0.06} className="mt-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.75rem] border border-[color:var(--color-border)] shadow-sm sm:aspect-[21/8]">
            <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
          </div>
        </Reveal>
      ) : null}
      <Reveal delay={0.1} className="mt-10">{children}</Reveal>
    </main>
  );
}
