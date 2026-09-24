import { NextResponse } from 'next/server';

export const revalidate = 86400; // 24 hours edge cache

export async function GET() {
  const baseUrl = 'https://www.matemetrik.com';

  const toolPaths = [
    '/hesaplama-araclari',
    '/takdir-tesekkur-hesaplama',
    '/lgs-puan-hesaplama-robotu',
    '/tyt-puan-hesaplama-robotu',
    '/yks-puan-hesaplama-robotu',
    '/puan-hesaplama-robotu',
    '/ogretmen-araclari',
    '/karne-gorusu-ureticisi',
    '/yillik-plan-hazirlama',
    '/kulup-toplanti-tutanaklari',
    '/sinav-hazirlama-robotu',
    '/meb-cozumleri',
    '/yds-calisma-bolumu',
    '/yuzde-hesaplama',
    '/kdv-hesaplama',
    '/indirim-hesaplama',
    '/oran-oranti-hesaplama',
    '/uslu-sayi-hesaplama',
    '/karekok-hesaplama',
    '/ebob-ekok-hesaplama',
    '/asal-sayi-hesaplama',
    '/faktoriyel-hesaplama',
    '/permutasyon-kombinasyon-hesaplama',
    '/olasilik-hesaplama',
    '/denklem-cozucu',
    '/ikinci-dereceden-denklem-hesaplama',
    '/fonksiyon-hesaplama',
    '/ucgen-alan-hesaplama',
    '/daire-alan-cevre-hesaplama',
    '/pisagor-hipotenus-hesaplama',
    '/ortalama-hesaplama',
  ];

  const now = new Date().toISOString().split('T')[0];

  const urls = toolPaths.map((path) => `  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${path === '/takdir-tesekkur-hesaplama' || path === '/hesaplama-araclari' ? '1.0' : '0.9'}</priority>
  </url>`);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
    },
  });
}
