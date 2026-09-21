import { MetadataRoute } from 'next';
import { getDb, getCategories } from '@/lib/db';

export const revalidate = 3600; // revalidate hourly

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.matemetrik.com';

  // 1. Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/yillik-plan-hazirlama`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kulup-toplanti-tutanaklari`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/karne-gorusu-ureticisi`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sinav-hazirlama-robotu`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/konu-anlatimlari`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kullanim-sartlari`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/gizlilik-politikasi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/cerez-politikasi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  // 2. Categories
  const categories = getCategories();
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/kategori/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  // 3. All Published Posts & MEB Answer Pages
  const db = getDb();
  const posts = db
    .prepare(`
      SELECT slug, updated_at, created_at 
      FROM posts 
      WHERE is_published = 1 
      ORDER BY id DESC
    `)
    .all() as Array<{
      slug: string;
      updated_at: string | null;
      created_at: string | null;
    }>;

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => {
    let lastMod = new Date();
    try {
      const dateStr = post.updated_at || post.created_at;
      if (dateStr) {
        lastMod = new Date(dateStr);
      }
    } catch {}

    const isMasterBook = post.slug.includes('-ders-kitabi-cevaplari') && !post.slug.includes('-sayfa-');
    return {
      url: `${baseUrl}/post/${post.slug}`,
      lastModified: lastMod,
      changeFrequency: isMasterBook ? 'daily' : 'weekly',
      priority: isMasterBook ? 0.9 : 0.7,
    };
  });

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
