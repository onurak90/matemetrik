import { MetadataRoute } from 'next';
import { getDb, getCategories } from '@/lib/db';

export const revalidate = 3600; // revalidate hourly

const POSTS_PER_SITEMAP = 1000;

export async function generateSitemaps() {
  const db = getDb();
  const row = db.prepare('SELECT COUNT(*) as count FROM posts WHERE is_published = 1').get() as { count: number };
  const totalPosts = row?.count || 0;
  const postSitemapsCount = Math.ceil(totalPosts / POSTS_PER_SITEMAP);

  // id 0: Static pages & categories (well under 1,000 URLs)
  // id 1..N: Posts (strictly max 1,000 URLs per sitemap)
  const sitemaps = [{ id: 0 }];
  for (let i = 1; i <= postSitemapsCount; i++) {
    sitemaps.push({ id: i });
  }
  return sitemaps;
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.matemetrik.com';

  // 1. Sitemap 0: Static Pages & Categories
  if (id === 0) {
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

    const categories = getCategories();
    const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
      url: `${baseUrl}/kategori/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    }));

    return [...staticRoutes, ...categoryRoutes];
  }

  // 2. Post Sitemaps (id >= 1): Max 1,000 posts per sitemap
  const db = getDb();
  const offset = (id - 1) * POSTS_PER_SITEMAP;
  const posts = db
    .prepare(`
      SELECT slug, updated_at, created_at 
      FROM posts 
      WHERE is_published = 1 
      ORDER BY id DESC
      LIMIT ? OFFSET ?
    `)
    .all(POSTS_PER_SITEMAP, offset) as Array<{
      slug: string;
      updated_at: string | null;
      created_at: string | null;
    }>;

  return posts.map((post) => {
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
}
