import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { Post, Category, Redirect, DashboardStats } from './types';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'matemetrik.db');

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Singleton connection
let dbInstance: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!dbInstance) {
    dbInstance = new Database(DB_PATH);
    dbInstance.pragma('journal_mode = WAL');
    dbInstance.pragma('synchronous = NORMAL');
    initTables(dbInstance);
  }
  return dbInstance;
}

function initTables(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      old_slug TEXT,
      excerpt TEXT,
      content TEXT NOT NULL,
      featured_image TEXT,
      category TEXT DEFAULT 'Genel',
      category_slug TEXT DEFAULT 'genel',
      tags TEXT DEFAULT '[]',
      author TEXT DEFAULT 'Matemetrik',
      views INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1,
      created_at TEXT,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      icon TEXT,
      color TEXT
    );

    CREATE TABLE IF NOT EXISTS redirects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source_path TEXT UNIQUE NOT NULL,
      target_path TEXT NOT NULL,
      status_code INTEGER DEFAULT 301
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
    CREATE INDEX IF NOT EXISTS idx_posts_old_slug ON posts(old_slug);
    CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category_slug);
    CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(is_published);
    CREATE INDEX IF NOT EXISTS idx_posts_title ON posts(title);
  `);
}

function formatPostRow(row: any): Post {
  let parsedTags: string[] = [];
  try {
    parsedTags = JSON.parse(row.tags || '[]');
  } catch {
    parsedTags = row.tags ? row.tags.split(',').map((t: string) => t.trim()) : [];
  }

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    old_slug: row.old_slug,
    excerpt: row.excerpt || '',
    content: row.content || '',
    featured_image: row.featured_image || '',
    category: row.category || 'Genel',
    category_slug: row.category_slug || 'genel',
    tags: parsedTags,
    author: row.author || 'Matemetrik',
    views: row.views || 0,
    is_published: row.is_published,
    created_at: row.created_at || new Date().toISOString(),
    updated_at: row.updated_at || new Date().toISOString(),
  };
}

export function getPosts(options: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  publishedOnly?: boolean;
} = {}): { posts: Post[]; total: number; totalPages: number } {
  const db = getDb();
  const page = Math.max(1, options.page || 1);
  const limit = Math.max(1, options.limit || 12);
  const offset = (page - 1) * limit;

  const conditions: string[] = [];
  const params: any[] = [];

  if (options.publishedOnly !== false) {
    conditions.push('is_published = 1');
  }

  if (options.category) {
    conditions.push('(category_slug = ? OR category = ?)');
    params.push(options.category, options.category);
  }

  if (options.search) {
    conditions.push('(title LIKE ? OR content LIKE ? OR excerpt LIKE ?)');
    const searchTerm = `%${options.search}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const countRow = db.prepare(`SELECT COUNT(*) as count FROM posts ${whereClause}`).get(...params) as { count: number };
  const total = countRow ? countRow.count : 0;

  const rows = db.prepare(`
    SELECT * FROM posts 
    ${whereClause}
    ORDER BY created_at DESC, id DESC 
    LIMIT ? OFFSET ?
  `).all(...params, limit, offset);

  return {
    posts: rows.map(formatPostRow),
    total,
    totalPages: Math.ceil(total / limit),
  };
}

export function getPostBySlug(slugOrOldSlug: string): { post: Post | null; isOldSlug: boolean } {
  const db = getDb();
  
  // 1. Try exact match on clean slug
  const cleanRow = db.prepare('SELECT * FROM posts WHERE slug = ?').get(slugOrOldSlug);
  if (cleanRow) {
    return { post: formatPostRow(cleanRow), isOldSlug: false };
  }

  // 2. Try match on old_slug
  const oldRow = db.prepare('SELECT * FROM posts WHERE old_slug = ?').get(slugOrOldSlug);
  if (oldRow) {
    return { post: formatPostRow(oldRow), isOldSlug: true };
  }

  // 3. Try URL-decoded match on old_slug
  try {
    const decoded = decodeURIComponent(slugOrOldSlug);
    if (decoded !== slugOrOldSlug) {
      const decodedRow = db.prepare('SELECT * FROM posts WHERE slug = ? OR old_slug = ?').get(decoded, decoded);
      if (decodedRow) {
        return { post: formatPostRow(decodedRow), isOldSlug: true };
      }
    }
  } catch {}

  return { post: null, isOldSlug: false };
}

export function getPostById(id: number): Post | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM posts WHERE id = ?').get(id);
  return row ? formatPostRow(row) : null;
}

export function getRelatedPosts(categorySlug: string, currentSlug: string, limit = 4): Post[] {
  const db = getDb();
  const rows = db.prepare(`
    SELECT * FROM posts 
    WHERE category_slug = ? AND slug != ? AND is_published = 1
    ORDER BY id DESC 
    LIMIT ?
  `).all(categorySlug, currentSlug, limit);
  return rows.map(formatPostRow);
}

export function createPost(post: {
  title: string;
  slug: string;
  old_slug?: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  category: string;
  category_slug: string;
  tags?: string[];
  author?: string;
  is_published?: number;
}): Post {
  const db = getDb();
  const now = new Date().toISOString();
  const tagsStr = JSON.stringify(post.tags || []);

  const stmt = db.prepare(`
    INSERT INTO posts (
      title, slug, old_slug, excerpt, content, featured_image,
      category, category_slug, tags, author, is_published,
      created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const info = stmt.run(
    post.title,
    post.slug,
    post.old_slug || null,
    post.excerpt || '',
    post.content,
    post.featured_image || '',
    post.category || 'Genel',
    post.category_slug || 'genel',
    tagsStr,
    post.author || 'Matemetrik',
    post.is_published !== undefined ? post.is_published : 1,
    now,
    now
  );

  return getPostById(Number(info.lastInsertRowid))!;
}

export function updatePost(
  id: number,
  post: {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    featured_image?: string;
    category?: string;
    category_slug?: string;
    tags?: string[];
    author?: string;
    is_published?: number;
  }
): Post | null {
  const db = getDb();
  const existing = getPostById(id);
  if (!existing) return null;

  // If slug is changing, automatically add a 301 redirect from the old slug!
  if (post.slug && post.slug !== existing.slug) {
    db.prepare(`
      INSERT OR IGNORE INTO redirects (source_path, target_path, status_code)
      VALUES (?, ?, 301)
    `).run(`/post/${existing.slug}`, `/post/${post.slug}`);
  }

  const now = new Date().toISOString();
  const fields: string[] = ['updated_at = ?'];
  const values: any[] = [now];

  if (post.title !== undefined) { fields.push('title = ?'); values.push(post.title); }
  if (post.slug !== undefined) { fields.push('slug = ?'); values.push(post.slug); }
  if (post.excerpt !== undefined) { fields.push('excerpt = ?'); values.push(post.excerpt); }
  if (post.content !== undefined) { fields.push('content = ?'); values.push(post.content); }
  if (post.featured_image !== undefined) { fields.push('featured_image = ?'); values.push(post.featured_image); }
  if (post.category !== undefined) { fields.push('category = ?'); values.push(post.category); }
  if (post.category_slug !== undefined) { fields.push('category_slug = ?'); values.push(post.category_slug); }
  if (post.tags !== undefined) { fields.push('tags = ?'); values.push(JSON.stringify(post.tags)); }
  if (post.author !== undefined) { fields.push('author = ?'); values.push(post.author); }
  if (post.is_published !== undefined) { fields.push('is_published = ?'); values.push(post.is_published); }

  values.push(id);
  db.prepare(`UPDATE posts SET ${fields.join(', ')} WHERE id = ?`).run(...values);

  return getPostById(id);
}

export function deletePost(id: number): boolean {
  const db = getDb();
  const info = db.prepare('DELETE FROM posts WHERE id = ?').run(id);
  return info.changes > 0;
}

export function incrementViews(id: number): void {
  const db = getDb();
  db.prepare('UPDATE posts SET views = views + 1 WHERE id = ?').run(id);
}

export function getCategories(): Category[] {
  const db = getDb();
  const rows = db.prepare(`
    SELECT c.*, COUNT(p.id) as post_count
    FROM categories c
    LEFT JOIN posts p ON p.category_slug = c.slug AND p.is_published = 1
    GROUP BY c.id
    ORDER BY post_count DESC, c.name ASC
  `).all();
  return rows as Category[];
}

export function getCategoryBySlug(slug: string): Category | null {
  const db = getDb();
  const row = db.prepare(`
    SELECT c.*, COUNT(p.id) as post_count
    FROM categories c
    LEFT JOIN posts p ON p.category_slug = c.slug AND p.is_published = 1
    WHERE c.slug = ?
    GROUP BY c.id
  `).get(slug);
  return (row as Category) || null;
}

export function createCategory(cat: { name: string; slug: string; description?: string; icon?: string; color?: string }): Category {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO categories (name, slug, description, icon, color)
    VALUES (?, ?, ?, ?, ?)
  `);
  const info = stmt.run(cat.name, cat.slug, cat.description || '', cat.icon || 'Folder', cat.color || 'indigo');
  return db.prepare('SELECT * FROM categories WHERE id = ?').get(info.lastInsertRowid) as Category;
}

export function deleteCategory(id: number): boolean {
  const db = getDb();
  const info = db.prepare('DELETE FROM categories WHERE id = ?').run(id);
  return info.changes > 0;
}

export function getRedirect(sourcePath: string): Redirect | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM redirects WHERE source_path = ?').get(sourcePath);
  return (row as Redirect) || null;
}

export function getAllRedirects(): Redirect[] {
  const db = getDb();
  return db.prepare('SELECT * FROM redirects ORDER BY id DESC').all() as Redirect[];
}

export function createRedirect(sourcePath: string, targetPath: string, statusCode = 301): Redirect {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO redirects (source_path, target_path, status_code)
    VALUES (?, ?, ?)
  `);
  const info = stmt.run(sourcePath, targetPath, statusCode);
  return db.prepare('SELECT * FROM redirects WHERE id = ?').get(info.lastInsertRowid) as Redirect;
}

export function deleteRedirect(id: number): boolean {
  const db = getDb();
  const info = db.prepare('DELETE FROM redirects WHERE id = ?').run(id);
  return info.changes > 0;
}

export function getStats(): DashboardStats {
  const db = getDb();
  const totalPostsRow = db.prepare('SELECT COUNT(*) as count FROM posts').get() as { count: number };
  const publishedRow = db.prepare('SELECT COUNT(*) as count FROM posts WHERE is_published = 1').get() as { count: number };
  const viewsRow = db.prepare('SELECT SUM(views) as total FROM posts').get() as { total: number };
  const catCountRow = db.prepare('SELECT COUNT(*) as count FROM categories').get() as { count: number };
  const redirectCountRow = db.prepare('SELECT COUNT(*) as count FROM redirects').get() as { count: number };

  const recentRows = db.prepare('SELECT * FROM posts ORDER BY id DESC LIMIT 6').all();
  const breakdownRows = db.prepare(`
    SELECT category as name, category_slug as slug, COUNT(*) as count 
    FROM posts 
    GROUP BY category 
    ORDER BY count DESC 
    LIMIT 8
  `).all() as { name: string; count: number; slug: string }[];

  return {
    totalPosts: totalPostsRow?.count || 0,
    publishedPosts: publishedRow?.count || 0,
    draftPosts: (totalPostsRow?.count || 0) - (publishedRow?.count || 0),
    totalViews: viewsRow?.total || 0,
    totalCategories: catCountRow?.count || 0,
    totalRedirects: redirectCountRow?.count || 0,
    recentPosts: recentRows.map(formatPostRow),
    categoryBreakdown: breakdownRows,
  };
}

export function getTopPosts(limit = 10): Post[] {
  const db = getDb();
  const rows = db.prepare(`
    SELECT * FROM posts 
    WHERE is_published = 1 
    ORDER BY views DESC, id DESC 
    LIMIT ?
  `).all(limit);
  return rows.map(formatPostRow);
}

export function getReports() {
  const db = getDb();
  const totalPostsRow = db.prepare('SELECT COUNT(*) as count FROM posts').get() as { count: number };
  const totalViewsRow = db.prepare('SELECT SUM(views) as total FROM posts').get() as { total: number };
  const avgViews = totalPostsRow.count > 0 ? Math.round((totalViewsRow.total || 0) / totalPostsRow.count) : 0;

  const topPosts = getTopPosts(15);
  const categoriesStats = db.prepare(`
    SELECT c.name, c.slug, COUNT(p.id) as post_count, COALESCE(SUM(p.views), 0) as total_views
    FROM categories c
    LEFT JOIN posts p ON p.category_slug = c.slug AND p.is_published = 1
    GROUP BY c.id
    ORDER BY total_views DESC, post_count DESC
  `).all();

  // SEO Health Checks
  const missingImages = db.prepare(`
    SELECT id, title, slug, category, views FROM posts 
    WHERE (featured_image IS NULL OR featured_image = '') AND is_published = 1
    LIMIT 20
  `).all().map(formatPostRow);

  const shortExcerpts = db.prepare(`
    SELECT id, title, slug, category, views FROM posts 
    WHERE (excerpt IS NULL OR LENGTH(excerpt) < 50) AND is_published = 1
    LIMIT 20
  `).all().map(formatPostRow);

  return {
    totalPosts: totalPostsRow.count,
    totalViews: totalViewsRow.total || 0,
    avgViews,
    topPosts,
    categoriesStats,
    missingImages,
    shortExcerpts,
  };
}

export function getSettings(): Record<string, string> {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM settings').all() as { key: string; value: string }[];
  const settings: Record<string, string> = {
    site_name: 'Matemetrik',
    site_description: 'Matematik, MEB ders kitabı cevapları, eğitim rehberliği ve öğretmen araçları platformu',
    site_author: 'Onur AK',
    site_url: 'https://www.matemetrik.com',
    gsc_verification: '',
    bing_verification: '',
    ads_enabled: '0',
    ad_header_code: '',
    ad_in_article_code: '',
    ad_sidebar_code: '',
    ad_footer_code: '',
    cta_top_enabled: '1',
    cta_top_text: '🎉 2025-2026 MEB Müfredatına Uygun Yazılı Soruları & Karne Görüşü Robotu Yayında!',
    cta_top_link: '/karne-gorusu-ureticisi',
    contact_phone: '+90 555 000 00 00',
    gemini_api_key: process.env.GEMINI_API_KEY || 'AQ.Ab8RN6KcT_ST0wgHMOZx5Y2wWDvQFIr2troUzVes2YaQ3_wFLA',
    openai_api_key: process.env.OPENAI_API_KEY || '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',
    ai_provider: 'gemini',
  };
  rows.forEach((r) => {
    settings[r.key] = r.value;
  });
  return settings;
}

export function updateSetting(key: string, value: string): void {
  const db = getDb();
  db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').run(key, value);
}

export interface LiveSearchResult {
  posts: Array<{
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    featured_image: string;
    category: string;
    category_slug: string;
    views: number;
    created_at: string;
  }>;
  categories: Array<{
    name: string;
    slug: string;
    post_count: number;
  }>;
  tools: Array<{
    title: string;
    slug: string;
    description: string;
    badge: string;
  }>;
  totalCount: number;
}

export function searchPostsLive(query: string, limit = 6): LiveSearchResult {
  const db = getDb();
  const trimmed = (query || '').trim();
  if (!trimmed || trimmed.length < 2) {
    return { posts: [], categories: [], tools: [], totalCount: 0 };
  }

  // Generate smart Turkish and ASCII character variants for seamless search
  const patternsSet = new Set<string>();
  const base = trimmed.toLowerCase();
  patternsSet.add(base);
  patternsSet.add(base.replace(/i/g, 'ı'));
  patternsSet.add(base.replace(/ı/g, 'i'));
  patternsSet.add(base.replace(/[cgiosu]/g, (m) => ({ c: 'ç', g: 'ğ', i: 'ı', o: 'ö', s: 'ş', u: 'ü' }[m] || m)));
  patternsSet.add(base.replace(/[cgiou]/g, (m) => ({ c: 'ç', g: 'ğ', i: 'ı', o: 'ö', u: 'ü' }[m] || m)));
  patternsSet.add(base.replace(/[çğıöşü]/g, (m) => ({ ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u' }[m] || m)));

  const patterns = Array.from(patternsSet);
  const sqlPostConditions = patterns.map(() => '(title LIKE ? OR tags LIKE ? OR excerpt LIKE ?)').join(' OR ');
  const sqlPostParams: string[] = [];
  patterns.forEach((p) => {
    const term = `%${p}%`;
    sqlPostParams.push(term, term, term);
  });

  const sqlCategoryConditions = patterns.map(() => '(name LIKE ? OR description LIKE ?)').join(' OR ');
  const sqlCategoryParams: string[] = [];
  patterns.forEach((p) => {
    const term = `%${p}%`;
    sqlCategoryParams.push(term, term);
  });

  // 1. Matching Posts (Prioritize Title matches first, then tags/excerpt)
  const primaryTerm = `%${trimmed}%`;
  const rows = db.prepare(`
    SELECT id, title, slug, excerpt, featured_image, category, category_slug, views, created_at
    FROM posts
    WHERE is_published = 1 AND (${sqlPostConditions})
    ORDER BY 
      CASE 
        WHEN title LIKE ? THEN 1
        WHEN tags LIKE ? THEN 2
        ELSE 3 
      END,
      views DESC,
      created_at DESC
    LIMIT ?
  `).all(...sqlPostParams, primaryTerm, primaryTerm, limit) as any[];

  // Total count of matching posts
  const countRow = db.prepare(`
    SELECT COUNT(*) as count 
    FROM posts 
    WHERE is_published = 1 AND (${sqlPostConditions})
  `).get(...sqlPostParams) as { count: number };

  // 2. Matching Categories
  const categoryRows = db.prepare(`
    SELECT name, slug, 
      (SELECT COUNT(*) FROM posts WHERE (category_slug = categories.slug OR category = categories.name) AND is_published = 1) as post_count
    FROM categories
    WHERE ${sqlCategoryConditions}
    ORDER BY post_count DESC
    LIMIT 3
  `).all(...sqlCategoryParams) as any[];

  // 3. Matching Tools
  const SITE_TOOLS = [
    {
      title: 'Karne Görüşü Üreticisi',
      slug: '/karne-gorusu-ureticisi',
      description: 'Pedagojik ve özgün e-Okul karne görüşleri üretin',
      badge: 'Robot & Araç',
      keywords: ['karne', 'gorus', 'görüş', 'ogretmen', 'öğretmen', 'robot', 'not', 'degerlendirme', 'değerlendirme', 'karne görüşü', 'eokul', 'e-okul'],
    },
    {
      title: 'Sınav Hazırlama Robotu',
      slug: '/sinav-hazirlama-robotu',
      description: 'MEB standartlarında çift sütunlu yazılı sınav kağıdı ve cevap anahtarı',
      badge: 'MEB Formatı',
      keywords: ['sinav', 'sınav', 'hazirlama', 'hazırlama', 'yazili', 'yazılı', 'test', 'soru', 'optik', 'kagit', 'kağıt', 'cevap anahtari', 'cevap anahtarı', 'robot'],
    },
    {
      title: 'Kitap Özetleri Arşivi',
      slug: '/kategori/kitap-ozet',
      description: 'Dünya ve Türk edebiyatından derinlemesine kitap tahlilleri',
      badge: 'Edebiyat',
      keywords: ['kitap', 'ozet', 'özet', 'tahlil', 'roman', 'hikaye', 'yazar', 'edebiyat'],
    },
    {
      title: 'Vaka Çalışmaları',
      slug: '/vaka-calismalari',
      description: 'Matemetrik başarı hikayeleri ve matematik başarı stratejileri',
      badge: 'Başarı Rehberi',
      keywords: ['vaka', 'calisma', 'çalışma', 'basari', 'başarı', 'ornek', 'örnek', 'lgs', 'yks', 'ayt'],
    },
  ];

  const lower = trimmed.toLowerCase();
  const lowerPatterns = patterns.map((p) => p.toLowerCase());
  const matchingTools = SITE_TOOLS.filter((tool) =>
    lowerPatterns.some((pat) => tool.title.toLowerCase().includes(pat)) ||
    tool.keywords.some((kw) => lowerPatterns.some((pat) => kw.includes(pat) || pat.includes(kw)))
  ).map(({ title, slug, description, badge }) => ({ title, slug, description, badge }));

  return {
    posts: rows.map(r => ({
      id: r.id,
      title: r.title,
      slug: r.slug,
      excerpt: r.excerpt ? (r.excerpt.slice(0, 95) + '...') : '',
      featured_image: r.featured_image || '',
      category: r.category || 'Genel',
      category_slug: r.category_slug || 'genel',
      views: r.views || 0,
      created_at: r.created_at || '',
    })),
    categories: categoryRows,
    tools: matchingTools,
    totalCount: countRow ? countRow.count : 0,
  };
}

