import { NextResponse } from 'next/server';
import { getDb, getSettings } from '@/lib/db';

export const dynamic = 'force-dynamic';

function escapeXml(unsafe: string): string {
  return (unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const baseUrl = 'https://www.matemetrik.com';
  const settings = getSettings();
  const db = getDb();

  // Fetch recent published posts (including master books and latest page answers)
  const posts = db
    .prepare(`
      SELECT title, slug, excerpt, featured_image, category, author, created_at 
      FROM posts 
      WHERE is_published = 1 
      ORDER BY id DESC 
      LIMIT 250
    `)
    .all() as Array<{
      title: string;
      slug: string;
      excerpt: string | null;
      featured_image: string | null;
      category: string | null;
      author: string | null;
      created_at: string | null;
    }>;

  const buildDate = new Date().toUTCString();

  const itemsXml = posts
    .map((post) => {
      const pubDate = post.created_at
        ? new Date(post.created_at).toUTCString()
        : new Date().toUTCString();
      const postUrl = `${baseUrl}/post/${post.slug}`;
      const title = post.title;
      const excerpt = post.excerpt || post.title;
      const category = post.category || 'MEB Ders Kitabı Cevapları';
      const author = post.author || 'Matemetrik Eğitim & Matematik Zümresi';

      // Ensure absolute image URL for Pinterest Pin creation
      let imageUrl = `${baseUrl}/og.jpg`;
      let imageType = 'image/jpeg';
      if (post.featured_image) {
        imageUrl = post.featured_image.startsWith('http')
          ? post.featured_image
          : `${baseUrl}${post.featured_image.startsWith('/') ? '' : '/'}${post.featured_image}`;
        if (imageUrl.endsWith('.webp')) imageType = 'image/webp';
        else if (imageUrl.endsWith('.png')) imageType = 'image/png';
      }

      return `
    <item>
      <title><![CDATA[${title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <dc:creator><![CDATA[${author}]]></dc:creator>
      <category><![CDATA[${category}]]></category>
      <description><![CDATA[<p><img src="${imageUrl}" alt="${title}" style="max-width:100%;height:auto;" /></p><p>${excerpt}</p>]]></description>
      <content:encoded><![CDATA[<p><img src="${imageUrl}" alt="${title}" style="max-width:100%;height:auto;" /></p><p>${excerpt}</p>]]></content:encoded>
      <enclosure url="${imageUrl}" type="${imageType}" length="35000" />
      <media:content url="${imageUrl}" medium="image" type="${imageType}">
        <media:title type="html"><![CDATA[${title}]]></media:title>
      </media:content>
      <media:thumbnail url="${imageUrl}" />
    </item>`;
    })
    .join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:media="http://search.yahoo.com/mrss/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(settings.site_name || 'Matemetrik')} - MEB Ders Kitabı Çözümleri ve Eğitim Portalı</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(settings.site_description || '2026-2027 MEB Ders Kitabı Cevapları, sayfa sayfa çözümler ve eğitim materyalleri.')}</description>
    <language>tr-TR</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/icon.svg</url>
      <title>${escapeXml(settings.site_name || 'Matemetrik')}</title>
      <link>${baseUrl}</link>
    </image>
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=1800, stale-while-revalidate=86400',
    },
  });
}
