const canonicalSiteUrl = "https://hassanhaj.com";

export const siteConfig = {
  name: "الشيخ حسن عوض للحج والعمرة",
  shortName: "الشيخ حسن عوض",
  description:
    "شركة الشيخ حسن عوض لتنظيم رحلات الحج والعمرة من مصر، بإشراف ميداني مباشر وبرامج موثوقة لمختلف الفئات.",
  url: canonicalSiteUrl,
  logo: "/images/logo.jpg",
  ogImage: "/images/hero-banner.jpg",
  phone: "01025050898",
  phoneSecondary: "01004734146",
  whatsappNumber: "201025050898",
  whatsappNumberSecondary: "201004734146",
  isWhatsAppEnabled: true,
  email: "",
  address: "",
  city: "مصر",
  country: "مصر",
  googleMaps: "",
  socialLinks: {
    facebook: "",
    instagram: "",
    tiktok: "https://www.tiktok.com/@hawadhaj",
    twitter: "",
    youtube: "",
  },
  businessHours: "",
  defaultWhatsAppMessage:
    "السلام عليكم ورحمة الله، أرغب في الاستفسار عن برامج الحج والعمرة لديكم.",
};

function toEgyptInternational(localNumber: string) {
  return localNumber ? `+20${localNumber.replace(/^0/, "")}` : "";
}

export const phoneInternational = toEgyptInternational(siteConfig.phone);
export const phoneSecondaryInternational = toEgyptInternational(
  siteConfig.phoneSecondary,
);

export const whatsappLink =
  siteConfig.isWhatsAppEnabled && siteConfig.whatsappNumber
    ? `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.defaultWhatsAppMessage)}`
    : "";

export const whatsappLinkSecondary =
  siteConfig.isWhatsAppEnabled && siteConfig.whatsappNumberSecondary
    ? `https://wa.me/${siteConfig.whatsappNumberSecondary}?text=${encodeURIComponent(siteConfig.defaultWhatsAppMessage)}`
    : "";

/** The contact form uses this flag to decide whether to offer WhatsApp contact. */
export const isFormDeliveryConfigured = Boolean(siteConfig.email);

export const routes = {
  home: "/",
  about: "/about",
  services: "/services",
  hajj: "/hajj",
  hajjPrograms: "/hajj/programs",
  umrah: "/umrah",
  umrahPrograms: "/umrah/programs",
  makkah: "/makkah",
  madinah: "/madinah",
  blog: "/blog",
  projects: "/projects",
  contact: "/contact",
  faq: "/faq",
  privacy: "/privacy",
  terms: "/terms",
  cancellation: "/cancellation",
};
