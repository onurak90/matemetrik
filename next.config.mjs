/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
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
    ],
  },
  async redirects() {
    return [
      { source: '/all-news', destination: '/', permanent: true },
      { source: '/all-news/categories/:slug*', destination: '/kategori/:slug*', permanent: true },
      { source: '/sinav-haz%C4%B1ilama-robotu', destination: '/sinav-hazirlama-robotu', permanent: true },
      { source: '/kopyas%C4%B1-matematik-blog', destination: '/kategori/matematik-blog', permanent: true },
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
      { source: '/matematik-blog', destination: '/kategori/matematik-blog', permanent: true },
    ];
  },
};

export default nextConfig;
