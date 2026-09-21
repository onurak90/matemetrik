import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/yonetim'],
    },
    sitemap: [
      'https://www.matemetrik.com/sitemap.xml',
      'https://www.matemetrik.com/sitemap/0.xml',
      'https://www.matemetrik.com/sitemap/1.xml',
      'https://www.matemetrik.com/sitemap/2.xml',
      'https://www.matemetrik.com/sitemap/3.xml',
      'https://www.matemetrik.com/sitemap/4.xml',
    ],
    host: 'https://www.matemetrik.com',
  };
}
