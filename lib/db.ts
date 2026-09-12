import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { Post, Category, Redirect, DashboardStats } from './types';

const DB_DIR = path.join(process.cwd(), 'data');
const ORIGINAL_DB_PATH = path.join(DB_DIR, 'matemetrik.db');
const DB_PATH = ORIGINAL_DB_PATH;

if (!fs.existsSync(DB_DIR)) {
  try {
    fs.mkdirSync(DB_DIR, { recursive: true });
  } catch {}
}

function getResolvedDbPath(): string {
  // When running inside Vercel serverless environment, filesystem outside /tmp is read-only
  if (process.env.VERCEL) {
    const tmpDbPath = '/tmp/matemetrik.db';
    if (!fs.existsSync(tmpDbPath)) {
      try {
        if (fs.existsSync(ORIGINAL_DB_PATH)) {
          fs.copyFileSync(ORIGINAL_DB_PATH, tmpDbPath);
          console.log('[Vercel] Database successfully copied to /tmp/matemetrik.db');
        }
      } catch (err) {
        console.error('[Vercel] Error copying DB to /tmp:', err);
      }
    }
    return fs.existsSync(tmpDbPath) ? tmpDbPath : ORIGINAL_DB_PATH;
  }
  return ORIGINAL_DB_PATH;
}

// Singleton connection
let dbInstance: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!dbInstance) {
    const targetPath = getResolvedDbPath();
    dbInstance = new Database(targetPath);
    try {
      dbInstance.pragma('journal_mode = WAL');
      dbInstance.pragma('synchronous = NORMAL');
    } catch (e) {
      // WAL fallback
    }
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
      author TEXT DEFAULT 'Cavenaghi',
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

    CREATE TABLE IF NOT EXISTS admin_notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT,
      priority TEXT DEFAULT 'normal',
      is_completed INTEGER DEFAULT 0,
      due_date TEXT,
      created_at TEXT
    );

    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER NOT NULL,
      author_name TEXT NOT NULL,
      author_email TEXT NOT NULL,
      author_avatar TEXT,
      content TEXT NOT NULL,
      is_approved INTEGER DEFAULT 0,
      created_at TEXT,
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_comments_post ON comments(post_id);
    CREATE INDEX IF NOT EXISTS idx_comments_approved ON comments(is_approved);

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
    author: row.author || 'Cavenaghi',
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

export function getPrevNextPosts(currentId: number, categorySlug?: string): { prev: Post | null; next: Post | null } {
  const db = getDb();
  let prevRow: any = null;
  let nextRow: any = null;

  if (categorySlug) {
    prevRow = db.prepare(`
      SELECT * FROM posts 
      WHERE category_slug = ? AND id < ? AND is_published = 1 
      ORDER BY id DESC LIMIT 1
    `).get(categorySlug, currentId);

    nextRow = db.prepare(`
      SELECT * FROM posts 
      WHERE category_slug = ? AND id > ? AND is_published = 1 
      ORDER BY id ASC LIMIT 1
    `).get(categorySlug, currentId);
  }

  if (!prevRow) {
    prevRow = db.prepare(`
      SELECT * FROM posts 
      WHERE id < ? AND is_published = 1 
      ORDER BY id DESC LIMIT 1
    `).get(currentId);
  }

  if (!nextRow) {
    nextRow = db.prepare(`
      SELECT * FROM posts 
      WHERE id > ? AND is_published = 1 
      ORDER BY id ASC LIMIT 1
    `).get(currentId);
  }

  return {
    prev: prevRow ? formatPostRow(prevRow) : null,
    next: nextRow ? formatPostRow(nextRow) : null,
  };
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
    post.author || 'Cavenaghi',
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
  const pendingCommentsRow = db.prepare('SELECT COUNT(*) as count FROM comments WHERE is_approved = 0').get() as { count: number };

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
    pendingCommentsCount: pendingCommentsRow?.count || 0,
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
    site_author: 'Cavenaghi',
    site_url: 'https://www.matemetrik.com',
    gsc_verification: '',
    bing_verification: '',
    ads_enabled: '0',
    ad_header_code: '',
    ad_in_article_code: '',
    ad_sidebar_code: '',
    ad_footer_code: '',
    ads_txt: '# Google AdSense ads.txt - Matemetrik\n# Reklam kimliğinizi (pub-xxxxxxxxxxxxxxxx) aşağıdaki formata göre ekleyebilirsiniz:\n# google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0\n',
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

// ==================== ADMIN NOTES ====================

export interface AdminNote {
  id: number;
  title: string;
  content: string;
  priority: 'urgent' | 'high' | 'normal';
  is_completed: number;
  due_date: string;
  created_at: string;
}

export function getAdminNotes(): AdminNote[] {
  const db = getDb();
  return db
    .prepare("SELECT * FROM admin_notes ORDER BY is_completed ASC, CASE priority WHEN 'urgent' THEN 1 WHEN 'high' THEN 2 ELSE 3 END ASC, id DESC")
    .all() as AdminNote[];
}

export function createAdminNote(note: {
  title: string;
  content?: string;
  priority?: 'urgent' | 'high' | 'normal';
  due_date?: string;
}): AdminNote {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO admin_notes (title, content, priority, is_completed, due_date, created_at)
    VALUES (?, ?, ?, 0, ?, ?)
  `);
  const now = new Date().toISOString();
  const info = stmt.run(
    note.title,
    note.content || '',
    note.priority || 'normal',
    note.due_date || '',
    now
  );
  return {
    id: Number(info.lastInsertRowid),
    title: note.title,
    content: note.content || '',
    priority: note.priority || 'normal',
    is_completed: 0,
    due_date: note.due_date || '',
    created_at: now,
  };
}

export function toggleAdminNote(id: number, is_completed: boolean): boolean {
  const db = getDb();
  const stmt = db.prepare('UPDATE admin_notes SET is_completed = ? WHERE id = ?');
  const info = stmt.run(is_completed ? 1 : 0, id);
  return info.changes > 0;
}

export function deleteAdminNote(id: number): boolean {
  const db = getDb();
  const stmt = db.prepare('DELETE FROM admin_notes WHERE id = ?');
  const info = stmt.run(id);
  return info.changes > 0;
}

// ==================== SYSTEM & STORAGE METRICS ====================

export function getSystemMetrics() {
  const db = getDb();
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

  let dbSize = 0;
  let walSize = 0;
  try {
    if (fs.existsSync(DB_PATH)) {
      dbSize = fs.statSync(DB_PATH).size;
    }
    const walPath = `${DB_PATH}-wal`;
    if (fs.existsSync(walPath)) {
      walSize = fs.statSync(walPath).size;
    }
  } catch {}

  let totalUploads = 0;
  let uploadsSize = 0;
  try {
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);
      totalUploads = files.filter(f => !f.startsWith('.')).length;
      for (const f of files) {
        if (!f.startsWith('.')) {
          uploadsSize += fs.statSync(path.join(uploadsDir, f)).size;
        }
      }
    }
  } catch {}

  const postCount = (db.prepare('SELECT count(*) as c FROM posts').get() as any)?.c || 0;
  const publishedCount = (db.prepare('SELECT count(*) as c FROM posts WHERE is_published = 1').get() as any)?.c || 0;
  const draftCount = (db.prepare('SELECT count(*) as c FROM posts WHERE is_published = 0').get() as any)?.c || 0;
  const totalViews = (db.prepare('SELECT sum(views) as v FROM posts').get() as any)?.v || 0;
  const catCount = (db.prepare('SELECT count(*) as c FROM categories').get() as any)?.c || 0;
  const redCount = (db.prepare('SELECT count(*) as c FROM redirects').get() as any)?.c || 0;

  const mem = process.memoryUsage();

  return {
    dbSize,
    walSize,
    totalDbBytes: dbSize + walSize,
    uploadsCount: totalUploads,
    uploadsBytes: uploadsSize,
    totalDiskBytes: dbSize + walSize + uploadsSize,
    postCount,
    publishedCount,
    draftCount,
    totalViews,
    categoryCount: catCount,
    redirectCount: redCount,
    memory: {
      heapUsed: mem.heapUsed,
      heapTotal: mem.heapTotal,
      rss: mem.rss,
    },
    nodeVersion: process.version,
    uptime: Math.floor(process.uptime()),
  };
}

export function vacuumDatabase() {
  const db = getDb();
  let sizeBefore = 0;
  try {
    sizeBefore = fs.statSync(DB_PATH).size;
    const walPath = `${DB_PATH}-wal`;
    if (fs.existsSync(walPath)) sizeBefore += fs.statSync(walPath).size;
  } catch {}

  db.exec('VACUUM;');
  db.pragma('wal_checkpoint(TRUNCATE)');

  let sizeAfter = 0;
  try {
    sizeAfter = fs.statSync(DB_PATH).size;
    const walPath = `${DB_PATH}-wal`;
    if (fs.existsSync(walPath)) sizeAfter += fs.statSync(walPath).size;
  } catch {}

  return {
    sizeBefore,
    sizeAfter,
    freedBytes: Math.max(0, sizeBefore - sizeAfter),
  };
}

// ==================== SEO AUDIT REPORT ====================

export interface SeoIssue {
  postId: number;
  title: string;
  slug: string;
  category: string;
  views: number;
  severity: 'critical' | 'warning' | 'info';
  issue: string;
  recommendation: string;
}

export function getSeoAuditReport() {
  const db = getDb();
  const posts = db.prepare(`
    SELECT id, title, slug, excerpt, content, featured_image, category, views, is_published
    FROM posts
    ORDER BY views DESC, id DESC
  `).all() as any[];

  const issues: SeoIssue[] = [];
  let totalScoreSum = 0;

  for (const p of posts) {
    let postDeductions = 0;
    const wordCount = (p.content || '').replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
    const excerptLen = (p.excerpt || '').trim().length;
    const hasImage = Boolean(p.featured_image && p.featured_image.trim());
    const hasInternalLink = (p.content || '').includes('/kategori') || (p.content || '').includes('/post') || (p.content || '').includes('matemetrik.com');
    const hasH2 = (p.content || '').includes('<h2');

    if (!p.excerpt || excerptLen < 60) {
      postDeductions += 20;
      issues.push({
        postId: p.id,
        title: p.title,
        slug: p.slug,
        category: p.category,
        views: p.views || 0,
        severity: 'critical',
        issue: 'Meta Açıklaması Eksik veya Çok Kısa',
        recommendation: 'Google aramalarında tıklama oranını artırmak için 120-155 karakterlik açıklama ekleyin.',
      });
    }

    if (!hasImage) {
      postDeductions += 15;
      issues.push({
        postId: p.id,
        title: p.title,
        slug: p.slug,
        category: p.category,
        views: p.views || 0,
        severity: 'warning',
        issue: 'Öne Çıkan Görsel Yok',
        recommendation: 'Sosyal medya ve Google Discover paylaşımları için WebP formatında kapak görseli belirleyin.',
      });
    }

    if (p.title.length < 30 || p.title.length > 70) {
      postDeductions += 10;
      issues.push({
        postId: p.id,
        title: p.title,
        slug: p.slug,
        category: p.category,
        views: p.views || 0,
        severity: 'info',
        issue: `Başlık Uzunluğu İdeal Değil (${p.title.length} karakter)`,
        recommendation: 'Google sonuçlarında tam görünmesi için 35-65 karakter aralığı önerilir.',
      });
    }

    if (wordCount < 250) {
      postDeductions += 20;
      issues.push({
        postId: p.id,
        title: p.title,
        slug: p.slug,
        category: p.category,
        views: p.views || 0,
        severity: 'warning',
        issue: `İnce İçerik - Thin Content (${wordCount} kelime)`,
        recommendation: 'Google sıralaması için içeriği en az 400-600 kelimeye zenginleştirin.',
      });
    }

    if (!hasInternalLink) {
      postDeductions += 15;
      issues.push({
        postId: p.id,
        title: p.title,
        slug: p.slug,
        category: p.category,
        views: p.views || 0,
        severity: 'warning',
        issue: 'Site İçi Bağlantı (İç Link) Yok',
        recommendation: 'Kullanıcıları sitede tutmak için ilgili sınıf kategorilerine veya araçlara link verin.',
      });
    }

    if (!hasH2) {
      postDeductions += 10;
      issues.push({
        postId: p.id,
        title: p.title,
        slug: p.slug,
        category: p.category,
        views: p.views || 0,
        severity: 'info',
        issue: 'H2 Alt Başlık Yapısı Eksik',
        recommendation: 'Okunabilirliği ve taranabilirliği artırmak için içeriği H2 başlıklarına bölün.',
      });
    }

    const postScore = Math.max(20, 100 - postDeductions);
    totalScoreSum += postScore;
  }

  const averageHealthScore = posts.length > 0 ? Math.round(totalScoreSum / posts.length) : 100;
  const criticalCount = issues.filter(i => i.severity === 'critical').length;
  const warningCount = issues.filter(i => i.severity === 'warning').length;
  const infoCount = issues.filter(i => i.severity === 'info').length;

  return {
    totalPostsAudited: posts.length,
    overallHealthScore: averageHealthScore,
    criticalCount,
    warningCount,
    infoCount,
    totalIssues: issues.length,
    issues: issues.slice(0, 100), // top 100 issues
  };
}

// ==================== COMMENTS ====================

export function getCommentsByPostId(postId: number, approvedOnly: boolean = true) {
  const db = getDb();
  let query = 'SELECT * FROM comments WHERE post_id = ?';
  if (approvedOnly) {
    query += ' AND is_approved = 1';
  }
  query += ' ORDER BY id DESC';
  return db.prepare(query).all(postId) as any[];
}

export function createComment(data: {
  postId: number;
  authorName: string;
  authorEmail: string;
  authorAvatar?: string;
  content: string;
  isApproved?: number;
}) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO comments (post_id, author_name, author_email, author_avatar, content, is_approved, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const now = new Date().toISOString();
  const res = stmt.run(
    data.postId,
    data.authorName,
    data.authorEmail,
    data.authorAvatar || '',
    data.content,
    data.isApproved !== undefined ? data.isApproved : 0,
    now
  );
  return {
    id: Number(res.lastInsertRowid),
    ...data,
    created_at: now,
  };
}

export function getAllComments(filter: 'all' | 'pending' | 'approved' = 'all') {
  const db = getDb();
  let query = `
    SELECT c.*, p.title as post_title, p.slug as post_slug
    FROM comments c
    LEFT JOIN posts p ON c.post_id = p.id
  `;
  if (filter === 'pending') {
    query += ' WHERE c.is_approved = 0';
  } else if (filter === 'approved') {
    query += ' WHERE c.is_approved = 1';
  }
  query += ' ORDER BY c.id DESC';
  return db.prepare(query).all() as any[];
}

export function getPendingCommentsCount(): number {
  const db = getDb();
  const row = db.prepare('SELECT COUNT(*) as c FROM comments WHERE is_approved = 0').get() as any;
  return row?.c || 0;
}

export function updateCommentStatus(id: number, isApproved: number): boolean {
  const db = getDb();
  const res = db.prepare('UPDATE comments SET is_approved = ? WHERE id = ?').run(isApproved, id);
  return res.changes > 0;
}

export function deleteComment(id: number): boolean {
  const db = getDb();
  const res = db.prepare('DELETE FROM comments WHERE id = ?').run(id);
  return res.changes > 0;
}



