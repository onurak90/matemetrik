import type { Metadata } from 'next';
import './globals.css';
import { getSettings } from '@/lib/db';

function cleanVerificationToken(val?: string): string | undefined {
  if (!val || !val.trim()) return undefined;
  const trimmed = val.trim();
  const match = trimmed.match(/content=["']([^"']+)["']/i);
  if (match) return match[1].trim();
  return trimmed;
}

function extractGaId(raw?: string): string | null {
  if (!raw || !raw.trim()) return null;
  const match = raw.match(/G-[A-Za-z0-9]+/i);
  return match ? match[0].toUpperCase() : null;
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  const googleVer = cleanVerificationToken(settings.gsc_verification);
  const yandexVer = cleanVerificationToken(settings.yandex_verification);
  const bingVer = cleanVerificationToken(settings.bing_verification);
  const pinterestVer = cleanVerificationToken(settings.pinterest_verification);

  const otherMeta: Record<string, string> = {};
  if (bingVer) otherMeta['msvalidate.01'] = bingVer;
  if (pinterestVer) otherMeta['p:domain_verify'] = pinterestVer;

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
      'yıllık plan hazırlama',
      'kulüp evrakları',
      'yks matematik',
      'lgs matematik',
    ],
    authors: [{ name: settings.site_author || 'Cavenaghi', url: 'https://www.matemetrik.com' }],
    creator: settings.site_name || 'Matemetrik',
    verification: {
      ...(googleVer ? { google: googleVer } : {}),
      ...(yandexVer ? { yandex: yandexVer } : {}),
      ...(Object.keys(otherMeta).length > 0 ? { other: otherMeta } : {}),
    },
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
  const gaId = extractGaId(settings.google_analytics_id);

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
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('theme');
                if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
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

        {/* Search Engine Verification Tags (Google, Yandex, Bing, Pinterest) */}
        <meta name="google-site-verification" content="googleed824f4935091493" />
        <meta name="google-site-verification" content="googleed824f4935091493.html" />
        <meta name="yandex-verification" content="373defaa588b50cd" />
        <meta name="msvalidate.01" content="D9C02A88877A9191E490E1CFC17C3608" />
        <meta name="p:domain_verify" content="723bd1e107f9e043c372c3337ef846ef" />

        {/* Google Analytics 4 (gtag.js) Integration */}
        {gaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              id="google-analytics-init"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}

        {/* Custom Head Tags */}
        {settings.custom_head_tags && (
          <script
            type="text/plain"
            id="custom-head-tags-container"
            dangerouslySetInnerHTML={{ __html: settings.custom_head_tags }}
          />
        )}

        {adsEnabled && settings.ad_header_code && renderAdSenseHead(settings.ad_header_code)}
      </head>
      <body className="antialiased bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 min-h-screen selection:bg-indigo-500 selection:text-white transition-colors duration-200">
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
