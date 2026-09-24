import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/yonetim'],
      },
      {
        // Block aggressive AI scrapers and crawlers that burn through edge requests
        userAgent: [
          'Bytespider',
          'PetalBot',
          'MJ12bot',
          'DotBot',
          'AhrefsBot',
          'SemrushBot',
          'CCBot',
          'ClaudeBot',
          'GPTBot',
          'Amazonbot',
        ],
        disallow: '/',
      },
    ],
    sitemap: 'https://www.matemetrik.com/sitemap.xml',
    host: 'https://www.matemetrik.com',
  };
}
