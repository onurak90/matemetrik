import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET() {
  const baseUrl = 'https://www.matemetrik.com';
  const db = getDb();
  const row = db.prepare('SELECT COUNT(*) as count FROM posts WHERE is_published = 1').get() as { count: number };
  const totalPosts = row?.count || 0;
  const postSitemapsCount = Math.ceil(totalPosts / 1000);

  const now = new Date().toISOString();

  let sitemapsXml = `  <sitemap>
    <loc>${baseUrl}/sitemap/0.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>\n`;

  for (let i = 1; i <= postSitemapsCount; i++) {
    sitemapsXml += `  <sitemap>
    <loc>${baseUrl}/sitemap/${i}.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>\n`;
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapsXml}</sitemapindex>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
