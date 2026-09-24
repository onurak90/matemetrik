import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const revalidate = 3600; // 1 hour edge cache

export async function GET() {
  const baseUrl = 'https://www.matemetrik.com';
  const db = getDb();

  const rows = db.prepare(`
    SELECT slug, updated_at, created_at
    FROM posts
    WHERE slug LIKE '%konu-anlatimi%' AND is_published = 1
    ORDER BY id DESC
  `).all() as Array<{ slug: string; updated_at: string | null; created_at: string | null }>;

  const urls = [
    `  <url>
    <loc>${baseUrl}/konu-anlatimlari</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`,
    ...rows.map((r) => {
      const date = (r.updated_at || r.created_at || new Date().toISOString()).split('T')[0];
      return `  <url>
    <loc>${baseUrl}/post/${r.slug}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
    }),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
    },
  });
}
