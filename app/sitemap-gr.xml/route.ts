import { NextResponse } from 'next/server';
import { GREEK_BOOKS, GREEK_LEVELS } from '@/lib/greekEducationData';
import { getGreekNews } from '@/lib/greekNews';

export const revalidate = 3600; // 1 hour

export async function GET() {
  const baseUrl = 'https://www.matemetrik.com';

  const urls: Array<{ loc: string; changefreq: string; priority: string }> = [
    { loc: `${baseUrl}/gr`, changefreq: 'daily', priority: '1.0' },
    { loc: `${baseUrl}/gr/dimotiko`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${baseUrl}/gr/gymnasio`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${baseUrl}/gr/lykeio`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${baseUrl}/gr/pdf-vivlia`, changefreq: 'weekly', priority: '0.95' },
    { loc: `${baseUrl}/gr/eidiseis`, changefreq: 'daily', priority: '0.9' },
  ];

  // Books and page solutions
  for (const book of GREEK_BOOKS) {
    urls.push({
      loc: `${baseUrl}/gr/vivlia/${book.gradeSlug}/${book.subjectSlug}`,
      changefreq: 'weekly',
      priority: '0.9',
    });
    for (const page of book.pages) {
      urls.push({
        loc: `${baseUrl}/gr/vivlia/${book.gradeSlug}/${book.subjectSlug}/${page.slug}`,
        changefreq: 'weekly',
        priority: '0.85',
      });
    }
  }

  // Live Greek News articles
  try {
    const news = await getGreekNews(50);
    for (const item of news) {
      urls.push({
        loc: `${baseUrl}/gr/eidiseis/${item.slug}`,
        changefreq: 'daily',
        priority: '0.8',
      });
    }
  } catch {
    // ignore
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
