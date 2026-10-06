import { MetadataRoute } from 'next';
import { getDb, getCategories } from '@/lib/db';
import { getYdsTopics } from '@/lib/yds';

export const revalidate = 3600; // revalidate hourly

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.matemetrik.com';

  // 1. Static Pages & Tools (Omit lastmod to prevent Google future date / invalid timestamp errors)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/yillik-gunluk-planlar`,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/yillik-plan-hazirlama`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kulup-toplanti-tutanaklari`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/karne-gorusu-ureticisi`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sinav-hazirlama-robotu`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/puan-hesaplama-robotu`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/yks-puan-hesaplama-robotu`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tyt-puan-hesaplama-robotu`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/takdir-tesekkur-hesaplama`,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/ogretmen-araclari`,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/meb-cozumleri`,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/hesaplama-araclari`,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/yuzde-hesaplama`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kdv-hesaplama`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/indirim-hesaplama`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/oran-oranti-hesaplama`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/uslu-sayi-hesaplama`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/karekok-hesaplama`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ebob-ekok-hesaplama`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/asal-sayi-hesaplama`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faktoriyel-hesaplama`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/permutasyon-kombinasyon-hesaplama`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/olasilik-hesaplama`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/denklem-cozucu`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ikinci-dereceden-denklem-hesaplama`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/fonksiyon-hesaplama`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ucgen-alan-hesaplama`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/daire-alan-cevre-hesaplama`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pisagor-hipotenus-hesaplama`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ortalama-hesaplama`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/yds-calisma-bolumu`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/post`,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/kunye`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/yayin-ilkeleri`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/telif-haklari-ve-yasal-uyari`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/iletisim`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kullanim-sartlari`,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/gizlilik-politikasi`,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/cerez-politikasi`,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  // 2. Categories (Filter out redirected categories like matematik-blog which redirects to /post)
  const categories = getCategories().filter((cat) => cat.slug !== 'matematik-blog');
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/kategori/${cat.slug}`,
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  // 3. All Published Posts & MEB Answer Pages
  const db = getDb();
  const posts = db
    .prepare(`
      SELECT slug 
      FROM posts 
      WHERE is_published = 1 
      ORDER BY id DESC
    `)
    .all() as Array<{
      slug: string;
    }>;

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => {
    const isMasterBook = post.slug.includes('-ders-kitabi-cevaplari') && !post.slug.includes('-sayfa-');
    return {
      url: `${baseUrl}/post/${post.slug}`,
      changeFrequency: isMasterBook ? 'daily' : 'weekly',
      priority: isMasterBook ? 0.9 : 0.7,
    };
  });

  const ydsTopics = getYdsTopics();
  const ydsTopicRoutes: MetadataRoute.Sitemap = ydsTopics.map((t) => ({
    url: `${baseUrl}/yds-calisma-bolumu/${t.id}`,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...ydsTopicRoutes, ...categoryRoutes, ...postRoutes];
}
