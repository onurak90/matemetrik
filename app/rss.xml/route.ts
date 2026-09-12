import { NextResponse } from 'next/server';
import { getPosts, getSettings } from '@/lib/db';

export const dynamic = 'force-dynamic';

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const baseUrl = 'https://www.matemetrik.com';
  const settings = getSettings();
  const { posts } = getPosts({ page: 1, limit: 50, publishedOnly: true });

  const buildDate = new Date().toUTCString();

  const itemsXml = posts
    .map((post) => {
      const pubDate = post.created_at
        ? new Date(post.created_at).toUTCString()
        : new Date().toUTCString();
      const postUrl = `${baseUrl}/post/${post.slug}`;
      const title = escapeXml(post.title);
      const excerpt = escapeXml(post.excerpt || post.title);
      const category = escapeXml(post.category || 'Matematik');
      const author = escapeXml(post.author || 'Cavenaghi');

      return `
    <item>
      <title>${title}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${excerpt}</description>
      <category>${category}</category>
      <author>${author}</author>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(settings.site_name || 'Matemetrik')} - Matematik ve Eğitim Portalı</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(settings.site_description || 'MEB matematik ders kitabı çözümleri ve eğitim rehberliği')}</description>
    <language>tr-TR</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
