import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { GREEK_BOOKS } from '@/lib/greekEducationData';
import { getGreekNews } from '@/lib/greekNews';

export const dynamic = 'force-dynamic';

function generateXml(): string {
  const filePath = path.join(process.cwd(), 'public/sitemap-gr.xml');
  if (fs.existsSync(filePath)) {
    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch {
      // fallback to dynamic generation below
    }
  }

  const baseUrl = 'https://www.matemetrik.com';
  const today = new Date().toISOString().split('T')[0];

  const urls: Array<{ loc: string; changefreq: string; priority: string }> = [
    { loc: `${baseUrl}/gr`, changefreq: 'daily', priority: '1.0' },
    { loc: `${baseUrl}/gr/dimotiko`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${baseUrl}/gr/gymnasio`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${baseUrl}/gr/lykeio`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${baseUrl}/gr/pdf-vivlia`, changefreq: 'weekly', priority: '0.95' },
    { loc: `${baseUrl}/gr/eidiseis`, changefreq: 'daily', priority: '0.9' },
  ];

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

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
}

export async function GET() {
  const xml = generateXml();
  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}

export async function HEAD() {
  const xml = generateXml();
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Content-Length': Buffer.byteLength(xml, 'utf8').toString(),
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
