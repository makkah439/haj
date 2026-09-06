import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { getFaqs } from "@/lib/faqs-store";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import GeometricPattern from "@/components/GeometricPattern";
import IslamicMotifs from "@/components/IslamicMotifs";
import { StarTagIcon, MosqueIcon } from "@/components/icons";
import { buildMetadata } from "@/lib/metadata";

// Refresh periodically when an external FAQ manifest is available.
export const revalidate = 300;

export const metadata = buildMetadata({
  title: "الأسئلة الشائعة",
  description: "إجابات واضحة حول الحج والعمرة والاستعداد قبل الرحلة.",
  path: "/faq",
  image: "/images/gallery/medina-mosque-group-03.jpg",
});

export default async function FaqPage() {
  const faqs = await getFaqs();
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="relative overflow-hidden py-24 text-white lg:py-32">
        <Image
          src="/images/gallery/medina-mosque-group-03.jpg"
          alt="مجموعة حجاج وسط ساحات المسجد النبوي"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(8,50,38,0.95),rgba(11,59,44,0.88)_50%,rgba(8,50,38,0.96))]" />
        <GeometricPattern
          id="faq-hero-geo"
          className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.06]"
        />
        <IslamicMotifs tone="light" />

        <div className="container-shell relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              <StarTagIcon className="h-4 w-4 text-[color:var(--color-gold-soft)]" />
              أسئلة شائعة
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.3] sm:text-5xl">
              الأسئلة الشائعة
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/80">
              إجابات مبسطة ومركزة على الأسئلة الأكثر شيوعًا حول الحج والعمرة.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[color:var(--color-background)] py-20 lg:py-28">
        <div className="container-shell">
          <StaggerGroup className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-2 lg:items-stretch">
            {faqs.map((faq) => (
              <StaggerItem key={faq.id} className="h-full">
                <div className="flex h-full flex-col rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-sm transition hover:-translate-y-1 hover:border-[color:var(--color-gold-soft)] hover:shadow-soft">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--color-primary)]/10">
                      <StarTagIcon className="h-4 w-4 text-[color:var(--color-gold)]" />
                    </span>
                    <h2 className="text-lg font-semibold text-[color:var(--color-primary)]">
                      {faq.question}
                    </h2>
                  </div>
                  <div className="mt-3 flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--color-gold)]/10">
                      <MosqueIcon className="h-3.5 w-3.5 text-[color:var(--color-primary)]" />
                    </span>
                    <p className="text-sm leading-8 text-[color:var(--color-muted)]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </main>
  );
}
