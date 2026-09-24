import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const revalidate = 7200; // 2 hours edge cache

export async function GET() {
  const baseUrl = 'https://www.matemetrik.com';
  const db = getDb();

  const rows = db.prepare(`
    SELECT slug, updated_at, created_at
    FROM posts
    WHERE slug LIKE '%sayfa%' AND is_published = 1
    ORDER BY id DESC
  `).all() as Array<{ slug: string; updated_at: string | null; created_at: string | null }>;

  const urls = rows.map((r) => {
    const date = (r.updated_at || r.created_at || new Date().toISOString()).split('T')[0];
    return `  <url>
    <loc>${baseUrl}/post/${r.slug}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.75</priority>
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=7200, s-maxage=86400, stale-while-revalidate=86400',
    },
  });
}
