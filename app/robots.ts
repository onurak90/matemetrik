import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/yonetim'],
    },
    sitemap: 'https://www.matemetrik.com/sitemap.xml',
    host: 'https://www.matemetrik.com',
  };
}
