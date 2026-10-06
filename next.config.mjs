/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['better-sqlite3'],
    outputFileTracingIncludes: {
      '/api/**/*': ['./data/**/*'],
      '/**/*': ['./data/**/*'],
    },
    outputFileTracingExcludes: {
      '*': [
        './public/uploads/**',
        'public/uploads/**',
        '**/.git/**',
        '**/.DS_Store',
        '**/scripts/**',
        '**/scratch/**',
        '**/kitaplar/**',
        '**/yeniklub/**',
      ],
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'birincisinifim.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/konu-anlatimlari', destination: '/ilkokul-etkinlikleri', permanent: true },
      { source: '/konu-anlatimlari/:slug*', destination: '/ilkokul-etkinlikleri', permanent: true },
      { source: '/blog', destination: '/post', permanent: true },
      { source: '/makaleler', destination: '/post', permanent: true },
      { source: '/kategori/matematik-blog', destination: '/post', permanent: true },
      { source: '/blog/:slug*', destination: '/post/:slug*', permanent: true },
      { source: '/all-news', destination: '/', permanent: true },
      { source: '/all-news/categories/:slug*', destination: '/kategori/:slug*', permanent: true },
      { source: '/sinav-haz%C4%B1ilama-robotu', destination: '/sinav-hazirlama-robotu', permanent: true },
      { source: '/kopyas%C4%B1-matematik-blog', destination: '/post', permanent: true },
      { source: '/kopyas%C4%B1-s%C4%B1nav-haz%C4%B1rlama-robotu', destination: '/sinav-hazirlama-robotu', permanent: true },
      { source: '/kopyas%C4%B1-2-s%C4%B1n%C4%B1f', destination: '/kategori/2-sinif', permanent: true },
      { source: '/yks-b%C3%B6l%C3%BCm%C3%BC', destination: '/kategori/yks', permanent: true },
      { source: '/%C3%B6%C4%9Fretmen', destination: '/kategori/ogretmen', permanent: true },
      { source: '/1-s%C4%B1n%C4%B1f', destination: '/kategori/1-sinif', permanent: true },
      { source: '/2-s%C4%B1n%C4%B1f', destination: '/kategori/2-sinif', permanent: true },
      { source: '/3-s%C4%B1n%C4%B1f', destination: '/kategori/3-sinif', permanent: true },
      { source: '/4-s%C4%B1n%C4%B1f', destination: '/kategori/4-sinif', permanent: true },
      { source: '/5-s%C4%B1n%C4%B1f', destination: '/kategori/5-sinif', permanent: true },
      { source: '/6-s%C4%B1n%C4%B1f', destination: '/kategori/6-sinif', permanent: true },
      { source: '/7-s%C4%B1n%C4%B1f', destination: '/kategori/7-sinif', permanent: true },
      { source: '/8-s%C4%B1n%C4%B1f', destination: '/kategori/8-sinif', permanent: true },
      { source: '/9-s%C4%B1n%C4%B1f', destination: '/kategori/9-sinif', permanent: true },
      { source: '/10-s%C4%B1n%C4%B1f', destination: '/kategori/10-sinif', permanent: true },
      { source: '/11-s%C4%B1n%C4%B1f', destination: '/kategori/11-sinif', permanent: true },
      { source: '/12-s%C4%B1n%C4%B1f', destination: '/kategori/12-sinif', permanent: true },
      { source: '/i%CC%87lkokul', destination: '/kategori/ilkokul', permanent: true },
      { source: '/ortaokul', destination: '/kategori/ortaokul', permanent: true },
      { source: '/lise', destination: '/kategori/lise', permanent: true },
      { source: '/matematik-blog', destination: '/post', permanent: true },
      { source: '/lgs-yks-puan-hesaplama', destination: '/puan-hesaplama-robotu', permanent: true },
      { source: '/yds-hazirlik', destination: '/yds-calisma-bolumu', permanent: true },
      { source: '/ebob-hesaplama', destination: '/ebob-ekok-hesaplama', permanent: true },
      { source: '/ekok-hesaplama', destination: '/ebob-ekok-hesaplama', permanent: true },
      { source: '/permutasyon-hesaplama', destination: '/permutasyon-kombinasyon-hesaplama', permanent: true },
      { source: '/kombinasyon-hesaplama', destination: '/permutasyon-kombinasyon-hesaplama', permanent: true },
      { source: '/daire-alan-hesaplama', destination: '/daire-alan-cevre-hesaplama', permanent: true },
      { source: '/daire-cevre-hesaplama', destination: '/daire-alan-cevre-hesaplama', permanent: true },
      { source: '/pisagor-hesaplama', destination: '/pisagor-hipotenus-hesaplama', permanent: true },
      { source: '/hipotenus-hesaplama', destination: '/pisagor-hipotenus-hesaplama', permanent: true },
      { source: '/denklem-hesaplama', destination: '/denklem-cozucu', permanent: true },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/images/:path*',
        destination: '/uploads/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        // Next.js build assets are immutable and content-hashed
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Uploaded images and media
        source: '/uploads/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        // Public images, icons and web fonts
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
