import type { Metadata, Viewport } from 'next';
import { Noto_Kufi_Arabic } from 'next/font/google';
import './globals.css';
import { siteConfig, phoneInternational, phoneSecondaryInternational } from '@/lib/site-config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import MotionProvider from '@/components/motion/MotionProvider';

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-kufi',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: ['حج', 'عمرة', 'برامج الحج من مصر', 'برامج العمرة من مصر'],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: 'website',
    locale: 'ar_EG',
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage }]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage]
  },
  alternates: {
    canonical: '/'
  }
};

const contactPoints = [phoneInternational, phoneSecondaryInternational]
  .filter(Boolean)
  .map((telephone) => ({
    '@type': 'ContactPoint',
    telephone,
    contactType: 'customer service',
    areaServed: 'EG',
    availableLanguage: ['ar']
  }));

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}${siteConfig.logo}`,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  telephone: phoneInternational || undefined,
  email: siteConfig.email || undefined,
  contactPoint: contactPoints.length > 0 ? contactPoints : undefined,
  areaServed: {
    '@type': 'Country',
    name: 'مصر'
  }
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  inLanguage: 'ar'
};

export const viewport: Viewport = {
  themeColor: '#0f4d3a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className={notoKufiArabic.variable}>
      <body className="min-h-screen bg-[color:var(--color-background)] font-sans text-[color:var(--color-text)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-50 focus:rounded-full focus:bg-[color:var(--color-primary)] focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          تخطَّ إلى المحتوى الرئيسي
        </a>
        <MotionProvider>
          <Header />
          {children}
          <Footer />
          <FloatingActions />
        </MotionProvider>
      </body>
    </html>
  );
}
