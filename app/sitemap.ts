import { MetadataRoute } from 'next';
import { getPosts, getCategories } from '@/lib/db';

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

  // 3. All Blog Posts (all 468+)
  const { posts } = getPosts({ limit: 1000, publishedOnly: true });
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => {
    let lastMod = new Date();
    try {
      if (post.updated_at) {
        lastMod = new Date(post.updated_at);
      }
    } catch {}

    return {
      url: `${baseUrl}/post/${post.slug}`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  });

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
