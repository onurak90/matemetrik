import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { Post, Category, Redirect, DashboardStats } from './types';
import { fetchDynamicPostFromBlob, upsertPostIntoDb, syncBlobPostsIntoDb } from './blobSync';

const DB_DIR = path.join(process.cwd(), 'data');
const ORIGINAL_DB_PATH = path.join(DB_DIR, 'matemetrik.db');
const DB_PATH = ORIGINAL_DB_PATH;

if (!fs.existsSync(DB_DIR)) {
  try {
    fs.mkdirSync(DB_DIR, { recursive: true });
  } catch {}
}

function getResolvedDbPath(): string {
  // During build phase, always use the real project database
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return ORIGINAL_DB_PATH;
  }
  // When running inside Vercel serverless environment, filesystem outside /tmp is read-only
  if (process.env.VERCEL) {
    let deploymentKey = process.env.VERCEL_DEPLOYMENT_ID || process.env.VERCEL_GIT_COMMIT_SHA;
    if (!deploymentKey && fs.existsSync(ORIGINAL_DB_PATH)) {
      try {
        const stats = fs.statSync(ORIGINAL_DB_PATH);
        deploymentKey = `v6_${stats.size}_${Math.floor(stats.mtimeMs)}`;
      } catch {
        deploymentKey = `v6_${Date.now()}`;
      }
    } else if (!deploymentKey) {
      deploymentKey = `v6_${Date.now()}`;
    }
    const tmpDbPath = `/tmp/matemetrik_${deploymentKey}.db`;
    if (!fs.existsSync(tmpDbPath) && fs.existsSync(ORIGINAL_DB_PATH)) {
      try {
        fs.copyFileSync(ORIGINAL_DB_PATH, tmpDbPath);
        const walPath = ORIGINAL_DB_PATH + '-wal';
        const shmPath = ORIGINAL_DB_PATH + '-shm';
        if (fs.existsSync(walPath)) fs.copyFileSync(walPath, tmpDbPath + '-wal');
        if (fs.existsSync(shmPath)) fs.copyFileSync(shmPath, tmpDbPath + '-shm');
        console.log(`[Vercel] Database successfully initialized at ${tmpDbPath}`);
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
      parent_id INTEGER DEFAULT NULL,
      author_name TEXT NOT NULL,
      author_email TEXT NOT NULL,
      author_avatar TEXT,
      content TEXT NOT NULL,
      is_approved INTEGER DEFAULT 0,
      is_admin INTEGER DEFAULT 0,
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

    CREATE TABLE IF NOT EXISTS page_hits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      path TEXT NOT NULL,
      title TEXT,
      entity_type TEXT DEFAULT 'page',
      post_id INTEGER,
      source TEXT DEFAULT 'direct',
      referrer TEXT,
      device TEXT DEFAULT 'desktop',
      ip_hash TEXT,
      user_agent TEXT,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_page_hits_created_at ON page_hits(created_at);
    CREATE INDEX IF NOT EXISTS idx_page_hits_path ON page_hits(path);
    CREATE INDEX IF NOT EXISTS idx_page_hits_source ON page_hits(source);
    CREATE INDEX IF NOT EXISTS idx_page_hits_post_id ON page_hits(post_id);
    CREATE INDEX IF NOT EXISTS idx_page_hits_entity_type ON page_hits(entity_type);

    CREATE TABLE IF NOT EXISTS crawled_news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source_url TEXT UNIQUE NOT NULL,
      source_title TEXT NOT NULL,
      source_site TEXT,
      source_image TEXT,
      post_id INTEGER,
      post_slug TEXT,
      status TEXT DEFAULT 'published',
      created_at TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_crawled_news_url ON crawled_news(source_url);
    CREATE INDEX IF NOT EXISTS idx_crawled_news_post_id ON crawled_news(post_id);

    INSERT OR IGNORE INTO categories (name, slug, description, icon, color)
    VALUES ('Eğitim Haberleri', 'egitim-haberleri', 'MEB, öğretmenler, okullar ve eğitim dünyasından en güncel gelişmeler ve son dakika haberleri.', 'Newspaper', '#4f46e5');
  `);

  try {
    db.exec('ALTER TABLE comments ADD COLUMN parent_id INTEGER DEFAULT NULL');
  } catch {}
  try {
    db.exec('ALTER TABLE comments ADD COLUMN is_admin INTEGER DEFAULT 0');
  } catch {}
  try {
    db.exec('CREATE INDEX IF NOT EXISTS idx_comments_parent ON comments(parent_id)');
  } catch {}
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
    author: row.author || 'Matemetrik Eğitim & Matematik Zümresi',
    views: row.views || 0,
    is_published: row.is_published,
    created_at: row.created_at || new Date().toISOString(),
    updated_at: row.updated_at || new Date().toISOString(),
  };
}

export function getPosts(options: {
  page?: number;
  limit?: number;
  category?: string | string[];
  search?: string;
  publishedOnly?: boolean;
  draftsOnly?: boolean;
  excludePageSolutions?: boolean;
  contentType?: 'etkinlik' | 'cozum' | 'all';
} = {}): { posts: Post[]; total: number; totalPages: number; counts?: { total: number; drafts: number; published: number } } {
  const db = getDb();
  const page = Math.max(1, options.page || 1);
  const limit = Math.max(1, options.limit || 12);
  const offset = (page - 1) * limit;

  const conditions: string[] = [];
  const params: any[] = [];

  if (options.draftsOnly) {
    conditions.push('is_published = 0');
  } else if (options.publishedOnly !== false) {
    conditions.push('is_published = 1');
  }

  if (options.excludePageSolutions) {
    conditions.push("slug NOT LIKE '%-sayfa-%' AND slug NOT LIKE '%sayfa-%'");
  }

  if (options.contentType === 'etkinlik') {
    conditions.push("(slug LIKE '%calisma-kagidi%' OR slug LIKE '%etkinlik%' OR tags LIKE '%çalışma kağıdı%')");
  } else if (options.contentType === 'cozum') {
    conditions.push("(slug LIKE '%ders-kitabi%' OR slug LIKE '%sayfa%')");
  }

  if (options.category) {
    if (Array.isArray(options.category)) {
      if (options.category.length > 0) {
        const placeholders = options.category.map(() => '?').join(', ');
        conditions.push(`(category_slug IN (${placeholders}) OR category IN (${placeholders}))`);
        params.push(...options.category, ...options.category);
      }
    } else {
      conditions.push('(category_slug = ? OR category = ?)');
      params.push(options.category, options.category);
    }
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

  let counts: { total: number; drafts: number; published: number } | undefined;
  try {
    const dCount = db.prepare('SELECT COUNT(*) as count FROM posts WHERE is_published = 0').get() as { count: number };
    const pCount = db.prepare('SELECT COUNT(*) as count FROM posts WHERE is_published = 1').get() as { count: number };
    counts = {
      total: (dCount?.count || 0) + (pCount?.count || 0),
      drafts: dCount?.count || 0,
      published: pCount?.count || 0,
    };
  } catch {}

  return {
    posts: rows.map(formatPostRow),
    total,
    totalPages: Math.ceil(total / limit),
    counts,
  };
}

export function getMebBookMasterPosts(): Post[] {
  const db = getDb();
  const rows = db.prepare(`
    SELECT * FROM posts 
    WHERE is_published = 1 
      AND (
        slug LIKE '%-ders-kitabi-cevaplari%' 
        OR slug LIKE '%-meb-%-cevaplari%'
        OR title LIKE '%Ders Kitabı Cevapları%'
      )
      AND slug NOT LIKE '%-sayfa-%'
      AND slug NOT LIKE '%sayfa-%'
      AND slug != '9-sinif-matematik-ders-kitabi-cevaplari'
    ORDER BY 
      CASE 
        WHEN category_slug = '1-sinif' THEN 1
        WHEN category_slug = '2-sinif' THEN 2
        WHEN category_slug = '3-sinif' THEN 3
        WHEN category_slug = '4-sinif' THEN 4
        WHEN category_slug = '5-sinif' THEN 5
        WHEN category_slug = '6-sinif' THEN 6
        WHEN category_slug = '7-sinif' THEN 7
        WHEN category_slug = '8-sinif' THEN 8
        WHEN category_slug = '9-sinif' THEN 9
        WHEN category_slug = '10-sinif' THEN 10
        WHEN category_slug = '11-sinif' THEN 11
        WHEN category_slug = '12-sinif' THEN 12
        ELSE 13
      END,
      id ASC
  `).all();
  return rows.map(formatPostRow);
}

export function getPostBySlugSync(slugOrOldSlug: string): { post: Post | null; isOldSlug: boolean } {
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

  // 4. Try match in redirects table
  try {
    const redirectRow = db.prepare(
      'SELECT target_path FROM redirects WHERE source_path = ? OR source_path = ? LIMIT 1'
    ).get(`/post/${slugOrOldSlug}`, slugOrOldSlug) as { target_path: string } | undefined;

    if (redirectRow && redirectRow.target_path) {
      const cleanTargetSlug = redirectRow.target_path.replace(/^\/post\//, '').replace(/\/$/, '');
      const targetPost = db.prepare('SELECT * FROM posts WHERE slug = ?').get(cleanTargetSlug);
      if (targetPost) {
        return { post: formatPostRow(targetPost), isOldSlug: true };
      }
    }
  } catch {}

  // 5. Try stripped slug (strip .html, trailing slash, -amp)
  const cleaned = slugOrOldSlug
    .replace(/\.(html?|php)$/i, '')
    .replace(/\/$/, '')
    .replace(/-amp$/i, '');

  if (cleaned !== slugOrOldSlug) {
    const cleanedRow = db.prepare('SELECT * FROM posts WHERE slug = ? OR old_slug = ?').get(cleaned, cleaned);
    if (cleanedRow) {
      return { post: formatPostRow(cleanedRow), isOldSlug: true };
    }
  }

  // 6. Try removing trailing duplicate suffix like -1, -2, -3, -4
  const strippedSuffix = cleaned.replace(/-\d+$/, '');
  if (strippedSuffix !== cleaned) {
    const suffixRow = db.prepare('SELECT * FROM posts WHERE slug = ? OR old_slug = ?').get(strippedSuffix, strippedSuffix);
    if (suffixRow) {
      return { post: formatPostRow(suffixRow), isOldSlug: true };
    }
  }

  return { post: null, isOldSlug: false };
}

export async function getPostBySlug(slugOrOldSlug: string): Promise<{ post: Post | null; isOldSlug: boolean }> {
  // 1. Check local SQLite fast (0ms)
  const localResult = getPostBySlugSync(slugOrOldSlug);
  if (localResult.post) {
    return localResult;
  }

  // 2. If not found in local SQLite, check Vercel Blob cloud store for newly published / dynamic articles!
  try {
    const cleanSlug = slugOrOldSlug
      .replace(/^\/post\//, '')
      .replace(/\.(html?|php)$/i, '')
      .replace(/\/$/, '')
      .replace(/-amp$/i, '');

    const blobPost = await fetchDynamicPostFromBlob(cleanSlug);
    if (blobPost) {
      const db = getDb();
      upsertPostIntoDb(blobPost, db);
      return { post: blobPost, isOldSlug: false };
    }
  } catch (err) {
    console.error('[db] Error in blob fallback for getPostBySlug:', err);
  }

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

export interface BookPageItem {
  pageNumber: number;
  slug: string;
  title: string;
}

export interface BookSequenceData {
  isBookPage: boolean;
  bookTitle?: string;
  currentPageNumber?: number;
  prevPage?: BookPageItem | null;
  nextPage?: BookPageItem | null;
  masterBookSlug?: string | null;
  nearbyPages: BookPageItem[];
  totalPages: number;
}

export function getBookPageSequence(slug: string, categorySlug?: string): BookSequenceData {
  let match = slug.match(/^(.*?)[-_]sayfa[-_](\d+)/i);
  let pNum = 0;
  let prefix = '';

  if (match) {
    prefix = match[1];
    pNum = parseInt(match[2], 10);
  } else {
    const matchAlt = slug.match(/^(.*?)[-_](\d+)(?:[-_]\d+)?[-_]sayfa/i);
    if (matchAlt) {
      prefix = matchAlt[1];
      pNum = parseInt(matchAlt[2], 10);
    }
  }

  if (!prefix || !pNum) {
    return {
      isBookPage: false,
      nearbyPages: [],
      totalPages: 0,
    };
  }

  const db = getDb();
  // Fetch all pages matching the prefix
  const rows = db.prepare(`
    SELECT slug, title FROM posts 
    WHERE slug LIKE ? AND is_published = 1
  `).all(`${prefix}%sayfa%`) as Array<{ slug: string; title: string }>;

  const pagesMap = new Map<number, { pageNumber: number; slug: string; title: string }>();

  for (const r of rows) {
    let m = r.slug.match(/sayfa[-_](\d+)/i);
    if (!m) m = r.slug.match(/(\d+)(?:[-_]\d+)?[-_]sayfa/i);
    if (m) {
      const pageNum = parseInt(m[1], 10);
      if (!pagesMap.has(pageNum)) {
        pagesMap.set(pageNum, { pageNumber: pageNum, slug: r.slug, title: r.title });
      }
    }
  }

  const allPages = Array.from(pagesMap.values()).sort((a, b) => a.pageNumber - b.pageNumber);
  if (allPages.length <= 1) {
    return {
      isBookPage: false,
      nearbyPages: [],
      totalPages: allPages.length,
    };
  }

  let prevPage: BookPageItem | null = null;
  let nextPage: BookPageItem | null = null;

  for (const p of allPages) {
    if (p.pageNumber < pNum) {
      prevPage = p;
    } else if (p.pageNumber > pNum && !nextPage) {
      nextPage = p;
      break;
    }
  }

  const currentIndex = allPages.findIndex((p) => p.pageNumber === pNum);
  const startIdx = Math.max(0, currentIndex - 3);
  const endIdx = Math.min(allPages.length, startIdx + 7);
  const nearbyPages = allPages.slice(startIdx, endIdx);

  // Check for master book hub
  const masterBookRow = db.prepare(`
    SELECT slug FROM posts 
    WHERE slug LIKE ? AND slug NOT LIKE '%sayfa%' AND is_published = 1 
    LIMIT 1
  `).get(`${prefix}%`) as { slug: string } | undefined;

  const cleanBookTitle = prefix
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return {
    isBookPage: true,
    bookTitle: cleanBookTitle,
    currentPageNumber: pNum,
    prevPage,
    nextPage,
    masterBookSlug: masterBookRow?.slug || null,
    nearbyPages,
    totalPages: allPages.length,
  };
}

export function ensureUniqueSlug(baseSlug: string, currentId?: number): string {
  const db = getDb();
  let candidate = (baseSlug || 'yazi')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '');

  if (!candidate) candidate = 'yazi';

  const checkStmt = currentId
    ? db.prepare('SELECT id FROM posts WHERE slug = ? AND id != ?')
    : db.prepare('SELECT id FROM posts WHERE slug = ?');

  let testSlug = candidate;
  let counter = 1;

  while (true) {
    const existing = currentId ? checkStmt.get(testSlug, currentId) : checkStmt.get(testSlug);
    if (!existing) {
      return testSlug;
    }
    counter++;
    const root = candidate.replace(/-\d+$/, '');
    testSlug = `${root}-${counter}`;
  }
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
  const finalSlug = ensureUniqueSlug(post.slug);

  const stmt = db.prepare(`
    INSERT INTO posts (
      title, slug, old_slug, excerpt, content, featured_image,
      category, category_slug, tags, author, is_published,
      created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const info = stmt.run(
    post.title,
    finalSlug,
    post.old_slug || null,
    post.excerpt || '',
    post.content,
    post.featured_image || '',
    post.category || 'Genel',
    post.category_slug || 'genel',
    tagsStr,
    post.author || 'Matemetrik Eğitim & Matematik Zümresi',
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
  let existing = getPostById(id);
  if (!existing) {
    if (post.title) {
      const now = new Date().toISOString();
      const finalSlug = ensureUniqueSlug(post.slug || post.title, id);
      const tagsStr = JSON.stringify(post.tags || []);
      db.prepare(`
        INSERT INTO posts (
          id, title, slug, excerpt, content, featured_image,
          category, category_slug, tags, author, is_published,
          created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        id,
        post.title,
        finalSlug,
        post.excerpt || '',
        post.content || '',
        post.featured_image || '',
        post.category || 'Genel',
        post.category_slug || 'genel',
        tagsStr,
        post.author || 'Matemetrik Eğitim & Matematik Zümresi',
        post.is_published !== undefined ? post.is_published : 0,
        now,
        now
      );
      return getPostById(id);
    }
    return null;
  }

  let finalSlug = post.slug;
  if (post.slug !== undefined) {
    finalSlug = ensureUniqueSlug(post.slug, id);
    if (finalSlug !== existing.slug) {
      db.prepare(`
        INSERT OR IGNORE INTO redirects (source_path, target_path, status_code)
        VALUES (?, ?, 301)
      `).run(`/post/${existing.slug}`, `/post/${finalSlug}`);
    }
  }

  const now = new Date().toISOString();
  const fields: string[] = ['updated_at = ?'];
  const values: any[] = [now];

  if (post.title !== undefined) { fields.push('title = ?'); values.push(post.title); }
  if (finalSlug !== undefined) { fields.push('slug = ?'); values.push(finalSlug); }
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

export interface PageHitInput {
  path: string;
  title?: string;
  referrer?: string;
  userAgent?: string;
  ip?: string;
}

export function recordPageHit(input: PageHitInput) {
  try {
    const db = getDb();
    const rawPath = (input.path || '/').split('?')[0];

    // Ignore internal system and admin routes
    if (
      rawPath.startsWith('/admin') ||
      rawPath.startsWith('/yonetim') ||
      rawPath.startsWith('/api') ||
      rawPath.startsWith('/_next') ||
      rawPath.includes('.ico') ||
      rawPath.includes('.png') ||
      rawPath.includes('.svg') ||
      rawPath.includes('.webp') ||
      rawPath.includes('.txt') ||
      rawPath.includes('.xml')
    ) {
      return;
    }

    const ref = (input.referrer || '').toLowerCase();
    let source = 'direct';

    if (ref.includes('google.')) {
      source = 'google';
    } else if (ref.includes('bing.')) {
      source = 'bing';
    } else if (ref.includes('yandex.')) {
      source = 'yandex';
    } else if (ref.includes('yahoo.')) {
      source = 'yahoo';
    } else if (ref.includes('instagram.com')) {
      source = 'instagram';
    } else if (ref.includes('twitter.com') || ref.includes('t.co') || ref.includes('x.com')) {
      source = 'twitter';
    } else if (ref.includes('facebook.com') || ref.includes('fb.com')) {
      source = 'facebook';
    } else if (ref.includes('tiktok.com')) {
      source = 'tiktok';
    } else if (ref.includes('youtube.com') || ref.includes('youtu.be')) {
      source = 'youtube';
    } else if (ref.includes('pinterest.com')) {
      source = 'pinterest';
    } else if (ref.includes('linkedin.com')) {
      source = 'linkedin';
    } else if (ref && !ref.includes('matemetrik.com') && !ref.includes('localhost')) {
      source = 'referral';
    } else {
      source = 'direct';
    }

    const ua = (input.userAgent || '').toLowerCase();
    let device = 'desktop';
    if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/i.test(ua)) {
      device = 'mobile';
    } else if (/ipad|tablet/i.test(ua)) {
      device = 'tablet';
    }

    let ipHash = '';
    if (input.ip) {
      let hash = 0;
      for (let i = 0; i < input.ip.length; i++) {
        hash = (hash << 5) - hash + input.ip.charCodeAt(i);
        hash |= 0;
      }
      ipHash = 'u_' + Math.abs(hash).toString(36);
    }

    let entityType = 'page';
    let postId: number | null = null;
    let title = input.title || '';

    if (rawPath.startsWith('/post/') || rawPath.startsWith('/blog/')) {
      entityType = 'blog';
      const slug = rawPath.replace(/^\/(blog|post)\//, '').replace(/\/$/, '');
      const post = db.prepare('SELECT id, title FROM posts WHERE slug = ?').get(slug) as { id: number; title: string } | undefined;
      if (post) {
        postId = post.id;
        if (!title) title = post.title;
        db.prepare('UPDATE posts SET views = views + 1 WHERE id = ?').run(post.id);
      }
    } else if (rawPath.startsWith('/soru-hazirlama')) {
      entityType = 'tool';
      if (!title) title = 'Soru Hazırlama Robotu';
    } else if (rawPath.startsWith('/yillik-plan-hazirlama')) {
      entityType = 'tool';
      if (!title) title = 'Yıllık Plan Hazırlama Robotu';
    } else if (rawPath.startsWith('/kulup-toplanti-tutanaklari')) {
      entityType = 'tool';
      if (!title) title = 'Kulüp Toplantı Tutanakları';
    } else if (rawPath.startsWith('/karne-gorusu-ureticisi')) {
      entityType = 'tool';
      if (!title) title = 'Karne Görüşü Üreticisi';
    } else if (rawPath === '/') {
      if (!title) title = 'Ana Sayfa';
    }

    const now = new Date().toISOString();
    db.prepare(`
      INSERT INTO page_hits (path, title, entity_type, post_id, source, referrer, device, ip_hash, user_agent, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(rawPath, title, entityType, postId, source, input.referrer || '', device, ipHash, input.userAgent || '', now);
  } catch (err) {
    console.error('recordPageHit error:', err);
  }
}

export function getAdvancedAnalytics(range: string = '30days') {
  const db = getDb();

  let dateCondition = '1=1';
  if (range === 'today') {
    dateCondition = "created_at >= datetime('now', '-1 day')";
  } else if (range === '7days') {
    dateCondition = "created_at >= datetime('now', '-7 days')";
  } else if (range === '30days') {
    dateCondition = "created_at >= datetime('now', '-30 days')";
  } else if (range === '180days') {
    dateCondition = "created_at >= datetime('now', '-180 days')";
  } else if (range === '365days') {
    dateCondition = "created_at >= datetime('now', '-365 days')";
  }

  const totalHitsRow = db.prepare(`SELECT COUNT(*) as c FROM page_hits WHERE ${dateCondition}`).get() as { c: number };
  const uniqueVisitorsRow = db.prepare(`SELECT COUNT(DISTINCT ip_hash) as c FROM page_hits WHERE ${dateCondition} AND ip_hash != ''`).get() as { c: number };
  const blogHitsRow = db.prepare(`SELECT COUNT(*) as c FROM page_hits WHERE ${dateCondition} AND entity_type = 'blog'`).get() as { c: number };
  const toolHitsRow = db.prepare(`SELECT COUNT(*) as c FROM page_hits WHERE ${dateCondition} AND entity_type = 'tool'`).get() as { c: number };
  const pageHitsRow = db.prepare(`SELECT COUNT(*) as c FROM page_hits WHERE ${dateCondition} AND entity_type = 'page'`).get() as { c: number };
  const totalPostsRow = db.prepare('SELECT COUNT(*) as count FROM posts WHERE is_published = 1').get() as { count: number };

  const totalHits = totalHitsRow?.c || 0;
  const uniqueVisitors = Math.max(uniqueVisitorsRow?.c || 0, totalHits > 0 ? 1 : 0);

  // Sources breakdown
  const sourceRows = db.prepare(`
    SELECT source, COUNT(*) as count 
    FROM page_hits 
    WHERE ${dateCondition} 
    GROUP BY source 
    ORDER BY count DESC
  `).all() as { source: string; count: number }[];

  const SOURCE_LABELS: Record<string, string> = {
    google: 'Google Arama',
    bing: 'Bing Arama',
    yandex: 'Yandex Arama',
    yahoo: 'Yahoo',
    direct: 'Doğrudan (Direct)',
    instagram: 'Instagram',
    twitter: 'X (Twitter)',
    facebook: 'Facebook',
    tiktok: 'TikTok',
    youtube: 'YouTube',
    linkedin: 'LinkedIn',
    pinterest: 'Pinterest',
    referral: 'Harici Siteler',
  };

  const sources = sourceRows.map((r) => ({
    source: r.source,
    label: SOURCE_LABELS[r.source] || r.source,
    count: r.count,
    percentage: totalHits > 0 ? Math.round((r.count / totalHits) * 100) : 0,
  }));

  // Devices breakdown
  const deviceRows = db.prepare(`
    SELECT device, COUNT(*) as count 
    FROM page_hits 
    WHERE ${dateCondition} 
    GROUP BY device 
    ORDER BY count DESC
  `).all() as { device: string; count: number }[];

  const DEVICE_LABELS: Record<string, string> = {
    desktop: 'Masaüstü (Desktop)',
    mobile: 'Mobil (Telefon)',
    tablet: 'Tablet',
  };

  const devices = deviceRows.map((r) => ({
    device: r.device,
    label: DEVICE_LABELS[r.device] || r.device,
    count: r.count,
    percentage: totalHits > 0 ? Math.round((r.count / totalHits) * 100) : 0,
  }));

  // Top Blog Posts in this period
  const topBlogRows = db.prepare(`
    SELECT 
      p.id, p.title, p.slug, p.category, 
      COUNT(h.id) as views,
      (
        SELECT h2.source 
        FROM page_hits h2 
        WHERE h2.post_id = p.id AND ${dateCondition.replace(/created_at/g, 'h2.created_at')}
        GROUP BY h2.source 
        ORDER BY COUNT(*) DESC 
        LIMIT 1
      ) as topSource
    FROM page_hits h
    JOIN posts p ON h.post_id = p.id
    WHERE ${dateCondition.replace(/created_at/g, 'h.created_at')}
    GROUP BY p.id
    ORDER BY views DESC
    LIMIT 30
  `).all() as any[];

  let topBlogPosts = topBlogRows;
  if (topBlogPosts.length === 0) {
    topBlogPosts = db.prepare(`
      SELECT id, title, slug, category, views, 'Doğrudan' as topSource
      FROM posts
      WHERE is_published = 1
      ORDER BY views DESC, id DESC
      LIMIT 15
    `).all() as any[];
  }

  // Top Tools & Pages in this period
  const topPageRows = db.prepare(`
    SELECT 
      path, title, entity_type,
      COUNT(id) as views,
      (
        SELECT h2.source 
        FROM page_hits h2 
        WHERE h2.path = page_hits.path AND ${dateCondition.replace(/created_at/g, 'h2.created_at')}
        GROUP BY h2.source 
        ORDER BY COUNT(*) DESC 
        LIMIT 1
      ) as topSource
    FROM page_hits
    WHERE ${dateCondition} AND (entity_type != 'blog' OR post_id IS NULL)
    GROUP BY path
    ORDER BY views DESC
    LIMIT 20
  `).all() as any[];

  let topPagesAndTools = topPageRows;
  if (topPagesAndTools.length === 0) {
    topPagesAndTools = [
      { path: '/', title: 'Ana Sayfa', entity_type: 'page', views: 0, topSource: 'direct' },
      { path: '/soru-hazirlama', title: 'Soru Hazırlama Robotu', entity_type: 'tool', views: 0, topSource: 'direct' },
      { path: '/yillik-plan-hazirlama', title: 'Yıllık Plan Hazırlama Robotu', entity_type: 'tool', views: 0, topSource: 'direct' },
      { path: '/kulup-toplanti-tutanaklari', title: 'Kulüp Toplantı Tutanakları', entity_type: 'tool', views: 0, topSource: 'direct' },
      { path: '/karne-gorusu-ureticisi', title: 'Karne Görüşü Üreticisi', entity_type: 'tool', views: 0, topSource: 'direct' },
    ];
  }

  // Timeline (Grouped by Day)
  const timelineRows = db.prepare(`
    SELECT SUBSTR(created_at, 1, 10) as date, COUNT(*) as hits
    FROM page_hits
    WHERE ${dateCondition}
    GROUP BY SUBSTR(created_at, 1, 10)
    ORDER BY date ASC
  `).all() as { date: string; hits: number }[];

  // Recent 20 Hits
  const recentHits = db.prepare(`
    SELECT id, path, title, source, device, created_at
    FROM page_hits
    ORDER BY id DESC
    LIMIT 20
  `).all() as any[];

  // Categories Stats
  const categoriesStats = db.prepare(`
    SELECT c.name, c.slug, COUNT(p.id) as post_count, COALESCE(SUM(p.views), 0) as total_views
    FROM categories c
    LEFT JOIN posts p ON p.category_slug = c.slug AND p.is_published = 1
    GROUP BY c.id
    ORDER BY total_views DESC, post_count DESC
  `).all();

  return {
    timeRange: range,
    totalHits,
    uniqueVisitors,
    blogHits: blogHitsRow?.c || 0,
    toolHits: toolHitsRow?.c || 0,
    pageHits: pageHitsRow?.c || 0,
    totalPostsCount: totalPostsRow?.count || 0,
    sources,
    devices,
    topBlogPosts,
    topPagesAndTools,
    timeline: timelineRows,
    recentHits,
    categoriesStats,
  };
}

export function getSettings(): Record<string, string> {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM settings').all() as { key: string; value: string }[];
  const settings: Record<string, string> = {
    site_name: 'Matemetrik',
    site_description: 'Matematik, MEB ders kitabı cevapları, eğitim rehberliği ve öğretmen araçları platformu',
    site_author: 'Matemetrik Eğitim & Matematik Zümresi',
    site_url: 'https://www.matemetrik.com',
    gsc_verification: 'googleed824f4935091493.html',
    bing_verification: 'D9C02A88877A9191E490E1CFC17C3608',
    yandex_verification: '373defaa588b50cd',
    pinterest_verification: '723bd1e107f9e043c372c3337ef846ef',
    google_analytics_id: 'G-RP0J3L0TKJ',
    custom_head_tags: '',
    ads_enabled: '0',
    ad_header_code: '',
    ad_in_article_code: '',
    ad_sidebar_code: '',
    ad_footer_code: '',
    ad_smart_link: 'https://araplhn.org/4/102a74e644a5d32555e92e2872366185',
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

export function updateSettings(settings: Record<string, string>): void {
  const db = getDb();
  const stmt = db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)');
  for (const [k, v] of Object.entries(settings)) {
    stmt.run(k, String(v));
  }
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
    issues: issues.slice(0, 500), // top 500 issues for comprehensive admin review
  };
}

// ==================== COMMENTS ====================

export function getCommentsByPostId(postId: number, approvedOnly: boolean = true) {
  const db = getDb();
  let query = 'SELECT * FROM comments WHERE post_id = ?';
  if (approvedOnly) {
    query += ' AND is_approved = 1';
  }
  query += ' ORDER BY id ASC';
  const allComments = db.prepare(query).all(postId) as any[];

  // Structure into hierarchical tree (top-level comments with nested replies)
  const commentMap = new Map<number, any>();
  const topLevelComments: any[] = [];

  for (const c of allComments) {
    c.replies = [];
    commentMap.set(c.id, c);
  }

  for (const c of allComments) {
    if (c.parent_id && commentMap.has(c.parent_id)) {
      commentMap.get(c.parent_id).replies.push(c);
    } else {
      topLevelComments.push(c);
    }
  }

  // Reverse so newest top-level discussions appear first
  topLevelComments.reverse();
  return topLevelComments;
}

export function createComment(data: {
  postId: number;
  parentId?: number | null;
  authorName: string;
  authorEmail: string;
  authorAvatar?: string;
  content: string;
  isApproved?: number;
  isAdmin?: number;
}) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO comments (post_id, parent_id, author_name, author_email, author_avatar, content, is_approved, is_admin, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const now = new Date().toISOString();
  const res = stmt.run(
    data.postId,
    data.parentId || null,
    data.authorName,
    data.authorEmail,
    data.authorAvatar || '',
    data.content,
    data.isApproved !== undefined ? data.isApproved : 1,
    data.isAdmin ? 1 : 0,
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
    SELECT c.*, p.title as post_title, p.slug as post_slug,
           parent.author_name as parent_author_name
    FROM comments c
    LEFT JOIN posts p ON c.post_id = p.id
    LEFT JOIN comments parent ON c.parent_id = parent.id
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

export interface CrawledNewsRecord {
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

export function saveCrawledNews(entry: {
  source_url: string;
  source_title: string;
  source_site?: string;
  source_image?: string;
  post_id?: number | null;
  post_slug?: string | null;
  status?: string;
}): void {
  const db = getDb();
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO crawled_news (source_url, source_title, source_site, source_image, post_id, post_slug, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(source_url) DO UPDATE SET
      post_id = excluded.post_id,
      post_slug = excluded.post_slug,
      status = excluded.status
  `).run(
    entry.source_url,
    entry.source_title,
    entry.source_site || '',
    entry.source_image || '',
    entry.post_id || null,
    entry.post_slug || null,
    entry.status || 'published',
    now
  );
}

export function isSourceUrlCrawled(sourceUrl: string): boolean {
  const db = getDb();
  const row = db.prepare('SELECT id FROM crawled_news WHERE source_url = ?').get(sourceUrl);
  return !!row;
}

export function getCrawledNews(limit = 50): CrawledNewsRecord[] {
  const db = getDb();
  const rows = db.prepare(`
    SELECT cn.*, p.title as current_title, p.is_published as post_published, p.views as post_views
    FROM crawled_news cn
    LEFT JOIN posts p ON cn.post_id = p.id
    ORDER BY cn.id DESC
    LIMIT ?
  `).all(limit) as any[];
  return rows;
}

export function deleteCrawledNewsItem(id: number, deleteAssociatedPost = false): boolean {
  const db = getDb();
  const record = db.prepare('SELECT * FROM crawled_news WHERE id = ?').get(id) as any;
  if (!record) return false;

  db.prepare('DELETE FROM crawled_news WHERE id = ?').run(id);

  if (deleteAssociatedPost && record.post_id) {
    deletePost(record.post_id);
  }
  return true;
}



