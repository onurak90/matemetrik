import type { Metadata } from 'next';
import './globals.css';
import { getSettings } from '@/lib/db';

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return {
    metadataBase: new URL('https://www.matemetrik.com'),
    title: {
      default: `${settings.site_name || 'Matemetrik'} | Matematik, MEB Ders Kitabı Cevapları ve Öğretmen Araçları`,
      template: `%s | ${settings.site_name || 'Matemetrik'}`,
    },
    description:
      settings.site_description ||
      '1. sınıftan 12. sınıfa kadar tüm kademeler için MEB matematik ders kitabı çözümleri, konu anlatımları, karne görüşü robotu ve sınav hazırlık platformu.',
    keywords: [
      'matematik',
      'meb ders kitabı cevapları',
      '10. sınıf matematik',
      '9. sınıf matematik',
      'karne görüşü üreticisi',
      'sınav hazırlama robotu',
      'yks matematik',
      'lgs matematik',
    ],
    authors: [{ name: settings.site_author || 'Cavenaghi', url: 'https://www.matemetrik.com' }],
    creator: settings.site_name || 'Matemetrik',
    verification: settings.gsc_verification
      ? {
          google: settings.gsc_verification,
        }
      : undefined,
    openGraph: {
      type: 'website',
      locale: 'tr_TR',
      url: 'https://www.matemetrik.com',
      siteName: settings.site_name || 'Matemetrik',
      title: `${settings.site_name || 'Matemetrik'} | Matematik ve Eğitim Portalı`,
      description:
        settings.site_description ||
        'MEB ders kitabı çözümleri, konu anlatımları, öğretmen karne görüşü robotu ve sınav hazırlık platformu.',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${settings.site_name || 'Matemetrik'} | Matematik ve Eğitim Portalı`,
      description: 'MEB ders kitabı çözümleri ve matematik eğitim platformu.',
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: [
        { url: '/icon.svg', type: 'image/svg+xml' },
        { url: '/favicon.ico', sizes: 'any' },
      ],
      apple: '/apple-touch-icon.png',
    },
  };
}

function renderAdSenseHead(rawCode: string) {
  if (!rawCode) return null;
  const srcMatch = rawCode.match(/src=["']([^"']+)["']/i);
  if (srcMatch) {
    return (
      <script
        async
        src={srcMatch[1]}
        crossOrigin="anonymous"
      />
    );
  }
  const cleanInline = rawCode.replace(/<\/?script[^>]*>/gi, '').trim();
  if (cleanInline) {
    return (
      <script
        dangerouslySetInnerHTML={{ __html: cleanInline }}
      />
    );
  }
  return null;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = getSettings();
  const adsEnabled = settings.ads_enabled === '1';

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: settings.site_name || 'Matemetrik',
    url: 'https://www.matemetrik.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.matemetrik.com/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Matemetrik RSS Feed"
          href="/rss.xml"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {adsEnabled && settings.ad_header_code && renderAdSenseHead(settings.ad_header_code)}
      </head>
      <body className="antialiased bg-slate-50 text-slate-900 min-h-screen selection:bg-indigo-500 selection:text-white">
        {adsEnabled && settings.ad_header_code && (
          <div
            id="ad-header-container"
            dangerouslySetInnerHTML={{ __html: settings.ad_header_code }}
          />
        )}
        {children}
        {adsEnabled && settings.ad_footer_code && (
          <div
            id="ad-footer-container"
            dangerouslySetInnerHTML={{ __html: settings.ad_footer_code }}
          />
        )}
      </body>
    </html>
  );
}
