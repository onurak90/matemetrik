import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  const sitemapUrl = 'https://www.matemetrik.com/sitemap.xml';
  const pingEndpoints = [
    {
      name: 'Google Bot Ping',
      url: `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    },
    {
      name: 'Bing / Yahoo Index Ping',
      url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    },
  ];

  const results = [];

  for (const ep of pingEndpoints) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(ep.url, {
        headers: { 'User-Agent': 'Matemetrik-Sitemap-Notifier/1.0' },
        signal: controller.signal,
      });
      clearTimeout(timeout);
      results.push({
        name: ep.name,
        status: res.status,
        ok: res.ok,
        message: res.ok ? 'Bildirim başarıyla iletildi' : `HTTP ${res.status}`,
      });
    } catch (e: any) {
      results.push({
        name: ep.name,
        status: 0,
        ok: false,
        message: e.message || 'Zaman aşımı veya ağ hatası',
      });
    }
  }

  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    sitemapUrl,
    results,
  });
}
