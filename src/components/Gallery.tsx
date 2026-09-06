import GalleryGrid from "@/components/GalleryGrid";
import Reveal from "@/components/motion/Reveal";
import { getProjects } from "@/lib/projects-store";

// These stay as a permanent baseline so the section is never empty and never
// loses the curated real trip photos it launched with.
const seedPhotos = [
  {
    src: "/images/gallery/arafat-hajj-group-05.jpg",
    alt: "مجموعة حجاج في يوم الوقوف بعرفة",
  },
  {
    src: "/images/gallery/medina-mosque-group-04.jpg",
    alt: "مجموعة معتمرين أمام المسجد النبوي الشريف",
  },
  {
    src: "/images/gallery/kaaba-group-elders-06.jpg",
    alt: "حجاج من كبار السن حول الكعبة المشرفة",
  },
  {
    src: "/images/gallery/medina-mosque-pilgrims-08.jpg",
    alt: "معتمرون أمام قبة المسجد النبوي الخضراء",
  },
  {
    src: "/images/gallery/medina-mosque-group-03.jpg",
    alt: "مجموعة حجاج وسط ساحات المسجد النبوي",
  },
  {
    src: "/images/gallery/trip-guides-07.jpg",
    alt: "فريق الإشراف والمتابعة أثناء رحلة الحج والعمرة",
  },
  {
    src: "/images/sections/hajj-guide-pilgrims-kaaba.jpg",
    alt: "حجاج يؤدون مناسك الحج أمام الكعبة المشرفة ليلًا",
  },
  {
    src: "/images/sections/madinah-prophets-mosque-dome.jpg",
    alt: "قبة المسجد النبوي الخضراء في المدينة المنورة",
  },
];

export default async function Gallery() {
  const projects = await getProjects().catch(() => []);
  const dynamicPhotos = projects
    .flatMap((project) => project.media)
    .filter((item) => item.type === "image")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .map((item) => ({ src: item.url, alt: item.caption || "صورة من رحلاتنا" }));

  // Newest externally stored photos lead, with the curated set underneath.
  const photos = [...dynamicPhotos, ...seedPhotos];

  return (
    <section className="bg-[color:var(--color-background)] py-20">
      <div className="container-shell">
        <Reveal>
          <div className="text-center sm:text-right">
            <p className="text-sm font-semibold text-[color:var(--color-gold)]">
              من رحلاتنا
            </p>
            <h2 className="section-title mt-2">
              لحظات حقيقية من رحلات الحج والعمرة السابقة
            </h2>
          </div>
        </Reveal>
        <GalleryGrid photos={photos} />
      </div>
    </section>
  );
}
