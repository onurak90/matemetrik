import { put, del } from '@vercel/blob';
import { Post } from './types';
import Database from 'better-sqlite3';

const BLOB_BASE_URL = 'https://vdencxgfxh4vdom8.public.blob.vercel-storage.com';
const DYNAMIC_POSTS_PATH = 'posts-store/dynamic-posts.json';

// In-memory sync throttle (per container)
let lastSyncTimestamp = 0;
const SYNC_INTERVAL_MS = 15_000; // 15 seconds

/**
 * Upsert a post object into a local SQLite database instance.
 */
export function upsertPostIntoDb(post: Post, db: Database.Database): boolean {
  try {
    const stmt = db.prepare(`
      INSERT INTO posts (
        id, title, slug, old_slug, excerpt, content, featured_image,
        category, category_slug, tags, author, views, is_published,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(slug) DO UPDATE SET
        title = excluded.title,
        old_slug = excluded.old_slug,
        excerpt = excluded.excerpt,
        content = excluded.content,
        featured_image = excluded.featured_image,
        category = excluded.category,
        category_slug = excluded.category_slug,
        tags = excluded.tags,
        author = excluded.author,
        views = excluded.views,
        is_published = excluded.is_published,
        created_at = excluded.created_at,
        updated_at = excluded.updated_at
    `);

    const tagsStr = Array.isArray(post.tags) ? JSON.stringify(post.tags) : String(post.tags || '[]');
    stmt.run(
      post.id,
      post.title,
      post.slug,
      post.old_slug || null,
      post.excerpt || '',
      post.content || '',
      post.featured_image || '',
      post.category || 'Genel',
      post.category_slug || 'genel',
      tagsStr,
      post.author || 'Matemetrik Eğitim & Matematik Zümresi',
      post.views || 0,
      post.is_published !== undefined ? post.is_published : 1,
      post.created_at || new Date().toISOString(),
      post.updated_at || new Date().toISOString()
    );
    return true;
  } catch (err) {
    console.error(`[BlobSync] Failed to upsert post ${post.slug} into DB:`, err);
    return false;
  }
}

/**
 * Fetch a single dynamic post directly from Vercel Blob by its slug.
 */
export async function fetchDynamicPostFromBlob(slug: string): Promise<Post | null> {
  if (!slug) return null;
  const url = `${BLOB_BASE_URL}/posts-store/${encodeURIComponent(slug)}.json`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      if (res.status !== 404) {
        console.warn(`[BlobSync] Failed fetching ${url} - HTTP ${res.status}`);
      }
      return null;
    }
    const data = await res.json();
    if (data && data.slug) {
      if (typeof data.tags === 'string') {
        try {
          data.tags = JSON.parse(data.tags);
        } catch {
          data.tags = [];
        }
      }
      return data as Post;
    }
    return null;
  } catch (err) {
    console.error(`[BlobSync] Error fetching post from blob (${slug}):`, err);
    return null;
  }
}

/**
 * Fetch all dynamic posts from Vercel Blob.
 */
export async function fetchAllDynamicPostsFromBlob(): Promise<Post[]> {
  const url = `${BLOB_BASE_URL}/${DYNAMIC_POSTS_PATH}`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      return [];
    }
    const list = await res.json();
    if (Array.isArray(list)) {
      return list.map((item) => {
        if (typeof item.tags === 'string') {
          try {
            item.tags = JSON.parse(item.tags);
          } catch {
            item.tags = [];
          }
        }
        return item as Post;
      });
    }
    return [];
  } catch (err) {
    console.error('[BlobSync] Error fetching all dynamic posts from blob:', err);
    return [];
  }
}

/**
 * Save / Update a post in Vercel Blob.
 * 1. Saves posts-store/${post.slug}.json
 * 2. Updates posts-store/dynamic-posts.json
 */
export async function saveDynamicPostToBlob(post: Post): Promise<boolean> {
  try {
    const postPayload = {
      ...post,
      tags: Array.isArray(post.tags) ? post.tags : [],
    };
    const jsonStr = JSON.stringify(postPayload, null, 2);

    // 1. Upload individual slug JSON
    await put(`posts-store/${post.slug}.json`, jsonStr, {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'application/json',
    });

    // 2. Fetch current list, update, and upload back
    let allPosts = await fetchAllDynamicPostsFromBlob();
    const existingIndex = allPosts.findIndex((p) => p.id === post.id || p.slug === post.slug);
    if (existingIndex >= 0) {
      allPosts[existingIndex] = postPayload;
    } else {
      allPosts.unshift(postPayload);
    }

    await put(DYNAMIC_POSTS_PATH, JSON.stringify(allPosts, null, 2), {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'application/json',
    });

    console.log(`[BlobSync] Successfully saved post "${post.title}" (${post.slug}) to Vercel Blob.`);
    return true;
  } catch (err) {
    console.error(`[BlobSync] Error saving post ${post.slug} to blob:`, err);
    return false;
  }
}

/**
 * Delete a post from Vercel Blob.
 */
export async function deleteDynamicPostFromBlob(id: number, slug?: string): Promise<boolean> {
  try {
    let allPosts = await fetchAllDynamicPostsFromBlob();
    const targetPost = allPosts.find((p) => p.id === id || (slug && p.slug === slug));
    const targetSlug = slug || targetPost?.slug;

    allPosts = allPosts.filter((p) => p.id !== id && (!targetSlug || p.slug !== targetSlug));

    await put(DYNAMIC_POSTS_PATH, JSON.stringify(allPosts, null, 2), {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'application/json',
    });

    if (targetSlug) {
      try {
        await del(`${BLOB_BASE_URL}/posts-store/${targetSlug}.json`);
      } catch {}
    }

    console.log(`[BlobSync] Successfully deleted post ID ${id} (${targetSlug}) from Vercel Blob.`);
    return true;
  } catch (err) {
    console.error(`[BlobSync] Error deleting post ${id} from blob:`, err);
    return false;
  }
}

/**
 * Synchronize all dynamic posts from Vercel Blob into the local SQLite database.
 * Throttled to once every 15 seconds per container unless force is true.
 */
export async function syncBlobPostsIntoDb(db: Database.Database, force = false): Promise<number> {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return 0;
  }

  const now = Date.now();
  if (!force && now - lastSyncTimestamp < SYNC_INTERVAL_MS) {
    return 0;
  }
  lastSyncTimestamp = now;

  try {
    const dynamicPosts = await fetchAllDynamicPostsFromBlob();
    if (!dynamicPosts || dynamicPosts.length === 0) {
      return 0;
    }

    let count = 0;
    for (const post of dynamicPosts) {
      if (upsertPostIntoDb(post, db)) {
        count++;
      }
    }

    if (count > 0) {
      console.log(`[BlobSync] Synchronized ${count} dynamic posts from Vercel Blob into local SQLite.`);
    }
    return count;
  } catch (err) {
    console.error('[BlobSync] Error syncing blob posts to DB:', err);
    return 0;
  }
}

const CRAWLED_NEWS_PATH = 'posts-store/crawled-news.json';

export interface CrawledNewsBlobItem {
  id: number;
  source_url: string;
  source_title: string;
  source_site: string;
  source_image: string;
  post_id: number | null;
  post_slug: string | null;
  status: string;
  created_at: string;
  current_title?: string;
  post_published?: number;
  post_views?: number;
}

export async function fetchCrawledNewsFromBlob(): Promise<CrawledNewsBlobItem[]> {
  const url = `${BLOB_BASE_URL}/${CRAWLED_NEWS_PATH}`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function saveCrawledNewsToBlob(entry: CrawledNewsBlobItem): Promise<boolean> {
  try {
    let all = await fetchCrawledNewsFromBlob();
    const existingIndex = all.findIndex((i) => i.source_url === entry.source_url);
    if (existingIndex >= 0) {
      all[existingIndex] = { ...all[existingIndex], ...entry };
    } else {
      all.unshift(entry);
    }
    if (all.length > 200) all = all.slice(0, 200);

    await put(CRAWLED_NEWS_PATH, JSON.stringify(all, null, 2), {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'application/json',
    });
    return true;
  } catch (err) {
    console.error('[BlobSync] Error saving crawled news to blob:', err);
    return false;
  }
}

export async function deleteCrawledNewsFromBlob(id: number): Promise<boolean> {
  try {
    let all = await fetchCrawledNewsFromBlob();
    all = all.filter((i) => i.id !== id);
    await put(CRAWLED_NEWS_PATH, JSON.stringify(all, null, 2), {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'application/json',
    });
    return true;
  } catch (err) {
    console.error('[BlobSync] Error deleting crawled news from blob:', err);
    return false;
  }
}
