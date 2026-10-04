import { getDb, createPost, getSettings, isSourceUrlCrawled, saveCrawledNews } from './db';
import { Post } from './types';
import { saveDynamicPostToBlob } from './blobSync';
import { callGeminiApi } from './gemini';
import { slugify } from './utils';
import { revalidatePath } from 'next/cache';

export interface NewsSource {
  name: string;
  url: string;
}

export const NEWS_SOURCES: NewsSource[] = [
  { name: 'MEB Personel', url: 'https://www.mebpersonel.com/feed' },
  { name: 'Kamudan Haber', url: 'https://www.kamudanhaber.net/rss' },
  { name: 'Kamu Personeli', url: 'https://www.kamupersoneli.net/rss' },
  { name: 'Ajans Kamu', url: 'https://www.ajanskamu.net/rss' },
  { name: 'Google Haberler (Öğretmen & MEB)', url: 'https://news.google.com/rss/search?q=%C3%B6%C4%9Fretmen+OR+MEB+OR+okul&hl=tr&gl=TR&ceid=TR:tr' },
];

export const TEACHER_KEYWORDS = [
  'öğretmen', 'ogretmen', 'öğretmenler', 'okul', 'okullar', 'meb', 'milli eğitim',
  'müfredat', 'tatil', 'ara tatil', 'yarıyıl', 'sınav', 'yazılı', 'atama',
  'ücretli öğretmen', 'uzman öğretmen', 'başöğretmen', 'ömk', 'ders',
  'seminer', 'dyk', 'idareci', 'müdür', 'ek ders', 'norm', 'maaş', 'tayin',
  'il içi', 'il dışı', 'kpss', 'ags', 'eğitim', 'öğrenci', 'lgs', 'yks', 'bursluluk'
];

export interface FeedItem {
  title: string;
  link: string;
  source: string;
  pubDate: string;
  description: string;
  imageUrl: string;
}

/**
 * Clean and normalize text from CDATA or HTML
 */
function cleanText(text: string): string {
  if (!text) return '';
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extract image URL from XML item
 */
function extractImageFromXml(itemXml: string): string {
  // 1. media:content url="..."
  const mediaMatch = itemXml.match(/<media:content[^>]+url=["']([^"']+)["']/i);
  if (mediaMatch && mediaMatch[1]) return mediaMatch[1].trim();

  // 2. enclosure url="..." type="image/..."
  const enclosureMatch = itemXml.match(/<enclosure[^>]+url=["']([^"']+)["']/i);
  if (enclosureMatch && enclosureMatch[1]) return enclosureMatch[1].trim();

  // 3. media:thumbnail url="..."
  const thumbMatch = itemXml.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i);
  if (thumbMatch && thumbMatch[1]) return thumbMatch[1].trim();

  // 4. img src="..." inside description or content
  const imgMatch = itemXml.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch && imgMatch[1]) return imgMatch[1].trim();

  return '';
}

/**
 * Fetch and parse an RSS feed
 */
export async function fetchFeedItems(source: NewsSource): Promise<FeedItem[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(source.url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
    });
    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`[NewsBot] Feed error for ${source.name}: HTTP ${res.status}`);
      return [];
    }

    const xml = await res.text();
    const itemMatches = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
    const items: FeedItem[] = [];

    for (const itemXml of itemMatches) {
      const titleMatch = itemXml.match(/<title>([\s\S]*?)<\/title>/i);
      const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/i) || itemXml.match(/<guid[^>]*>([\s\S]*?)<\/guid>/i);
      const descMatch = itemXml.match(/<description>([\s\S]*?)<\/description>/i) || itemXml.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/i);
      const pubDateMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);

      const rawTitle = titleMatch ? titleMatch[1] : '';
      const rawLink = linkMatch ? linkMatch[1] : '';
      const rawDesc = descMatch ? descMatch[1] : '';
      const pubDate = pubDateMatch ? pubDateMatch[1].trim() : '';

      const title = cleanText(rawTitle);
      const link = cleanText(rawLink);
      const description = cleanText(rawDesc);
      const imageUrl = extractImageFromXml(itemXml);

      if (title && link) {
        items.push({
          title,
          link,
          source: source.name,
          pubDate,
          description,
          imageUrl,
        });
      }
    }

    return items;
  } catch (err: any) {
    console.error(`[NewsBot] Error fetching feed ${source.name}:`, err.message);
    return [];
  }
}

/**
 * Filter news items matching teacher / school keywords
 */
export function isRelevantNews(item: FeedItem): boolean {
  const combined = `${item.title.toLowerCase()} ${item.description.toLowerCase()}`;
  return TEACHER_KEYWORDS.some((kw) => combined.includes(kw));
}

/**
 * Check if a news article is duplicate based on URL or title similarity
 */
export function isDuplicate(item: FeedItem): boolean {
  // 1. Check crawled_news table by source URL
  if (isSourceUrlCrawled(item.link)) {
    return true;
  }

  const db = getDb();

  // 2. Check posts table by slugify title
  const candidateSlug = slugify(item.title);
  const exactPost = db.prepare('SELECT id FROM posts WHERE slug = ? LIMIT 1').get(candidateSlug);
  if (exactPost) return true;

  // 3. Word overlap check against posts created in the last 14 days
  const recentPosts = db.prepare(`
    SELECT title FROM posts 
    WHERE created_at >= datetime('now', '-14 days')
    LIMIT 100
  `).all() as Array<{ title: string }>;

  const itemWords = new Set(
    item.title
      .toLowerCase()
      .replace(/[^a-z0-9ğüşıöç ]/gi, '')
      .split(/\s+/)
      .filter((w) => w.length > 3)
  );

  if (itemWords.size === 0) return false;

  for (const p of recentPosts) {
    const postWords = new Set(
      p.title
        .toLowerCase()
        .replace(/[^a-z0-9ğüşıöç ]/gi, '')
        .split(/\s+/)
        .filter((w) => w.length > 3)
    );

    let matchCount = 0;
    itemWords.forEach((w) => {
      if (postWords.has(w)) matchCount++;
    });

    const similarity = matchCount / Math.min(itemWords.size, postWords.size);
    if (similarity > 0.65) {
      return true;
    }
  }

  return false;
}

/**
 * If feed had no image, attempt to fetch og:image from the source link
 */
export async function resolveArticleImage(link: string, fallbackUrl = ''): Promise<string> {
  if (fallbackUrl && fallbackUrl.startsWith('http')) {
    return fallbackUrl;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(link, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      },
    });
    clearTimeout(timeout);

    if (res.ok) {
      const html = await res.text();
      const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
                      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i) ||
                      html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i);
      if (ogMatch && ogMatch[1] && ogMatch[1].startsWith('http')) {
        return ogMatch[1].trim();
      }
    }
  } catch {}

  // Fallback to high-quality educational cover if source site provided no image
  return 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop';
}

/**
 * Rewrite news with Gemini into a comprehensive 700-1000 word educational article
 */
export async function rewriteNewsWithGemini(item: FeedItem, resolvedImageUrl: string): Promise<any> {
  const prompt = `
Sen Türkiye'nin en köklü eğitim portalı Matemetrik.com'un Kıdemli Eğitim Editörü ve Kıdemli SEO Uzmanısın.
Aşağıda internetten taranmış sıcak bir eğitim/öğretmen haberi bulunmaktadır.

KAYNAK BİLGİLERİ:
- Başlık: ${item.title}
- Kaynak: ${item.source}
- Özet / Açıklama: ${item.description || 'Detay belirtilmemiş'}
- Kaynak Linki: ${item.link}
- Kapak Görseli: ${resolvedImageUrl}

GÖREVİN:
Bu haberi alıp 700 - 1000 kelimelik, son derece zengin, pedagojik, resmi MEB mevzuatına ve kanunlarına dayanan, arama motorlarında (Google Haberler & Keşfet) 1. sıraya oynayacak %100 ÖZGÜN bir makaleye dönüştürmek.

YAZIM KURALLARI:
1. Kesinlikle clickbait (tıklama tuzağı) veya boş laf kalabalığı yapma. Doğrudan net bilgiler, resmi tebliğ ve yönetmelik maddeleriyle destekle.
2. Yazının en başına şu HTML görsel etiketini yerleştir:
   <figure class="my-6 text-center"><img src="${resolvedImageUrl}" alt="${item.title} - Matemetrik" class="w-full max-h-[480px] object-cover rounded-2xl shadow-lg mx-auto" /><figcaption class="text-xs text-slate-500 mt-2">${item.title} - Matemetrik</figcaption></figure>
3. Makalede şu H2 ve H3 başlıklarını kullan:
   - <h2>Gelişmenin Detayları ve Alınan Kararlar</h2>
   - <h2>Öğretmenler, İdareciler ve Okul Yönetimleri İçin Ne Anlama Geliyor?</h2>
   - <h2>Mevzuat, Yasal Haklar ve Uygulama Takvimi</h2>
   - <h2>Süreçte İzlenmesi Gereken Adımlar ve Öneriler</h2>
   - <h2>Merak Edilenler & Sıkça Sorulan Sorular (SSS)</h2> (Burada en az 3 adet soru ve cevap <details class="py-3 border-b"><summary class="font-bold cursor-pointer">Soru?</summary><p class="mt-2 text-slate-600">Cevap...</p></details> formatında olsun).
4. Makalenin uygun bir yerine şu bilgi kutusunu ekle:
   <div class="p-4 my-4 bg-indigo-50 border-l-4 border-indigo-600 rounded-r-xl"><strong>💡 Uzman Notu:</strong> ...</div>
5. Metin içinde uygun yerlerde sitemizdeki araçlara ve sayfalara doğal iç linkler ver:
   - <a href="/karne-gorusu-ureticisi" class="text-indigo-600 font-medium underline">Akıllı Karne Görüşü Robotu</a>
   - <a href="/sinav-hazirlama-robotu" class="text-indigo-600 font-medium underline">Resmi MEB Sınav Hazırlama Robotu</a>
   - <a href="/takdir-tesekkur-hesaplama" class="text-indigo-600 font-medium underline">Takdir Teşekkür Hesaplama</a>
   - <a href="/ogretmen-araclari" class="text-indigo-600 font-medium underline">Öğretmen Evrak ve Araçları</a>
   - <a href="/kategori/ogretmen" class="text-indigo-600 font-medium underline">Öğretmen Haberleri ve Rehberi</a>

ÇIKTI FORMATI:
Sadece ve sadece geçerli bir JSON objesi döndür. Kod bloğu (\`\`\`json) kullanma veya içine JSON koy:
{
  "title": "Arama hacmi yüksek, merak uyandıran, profesyonel SEO başlığı (50-65 karakter)",
  "slug": "temiz-turkce-karaktersiz-seo-url-slugi",
  "excerpt": "Google arama motoru sonuçları için 150-160 karakterlik çarpıcı meta açıklaması.",
  "content": "Yukarıdaki kurallara göre hazırlanmış zengin HTML makalesi.",
  "tags": ["öğretmen haberleri", "meb", "okul", "eğitim", "gündem"],
  "category": "Öğretmen",
  "category_slug": "ogretmen"
}
`;

  const parsed = await callGeminiApi(prompt, true);
  return parsed;
}

/**
 * Run a full crawl cycle:
 * Scans sources, filters news, rewrites the best unvisited article, and publishes it.
 */
export async function runNewsCrawlCycle(options: { maxArticles?: number; forcePublish?: boolean } = {}) {
  const maxToProcess = options.maxArticles || 1;
  const settings = getSettings();
  const publishMode = options.forcePublish !== undefined
    ? (options.forcePublish ? 1 : 0)
    : (settings.news_bot_publish_mode === 'draft' ? 0 : 1);

  const results = {
    scanned: 0,
    matched: 0,
    created: 0,
    skipped: 0,
    processedArticles: [] as any[],
  };

  console.log('[NewsBot] Starting automated teacher & school news crawl cycle...');

  // 1. Gather all feeds
  const allItems: FeedItem[] = [];
  for (const source of NEWS_SOURCES) {
    const items = await fetchFeedItems(source);
    results.scanned += items.length;
    allItems.push(...items);
  }

  // 2. Filter relevant items (containing teacher, school, MEB keywords)
  const candidateItems = allItems.filter(isRelevantNews);
  results.matched = candidateItems.length;

  console.log(`[NewsBot] Scanned ${results.scanned} items, found ${results.matched} candidates matching teacher/school topics.`);

  // 3. Process candidate items up to limit
  for (const item of candidateItems) {
    if (results.created >= maxToProcess) {
      break;
    }

    if (isDuplicate(item)) {
      results.skipped++;
      continue;
    }

    try {
      console.log(`[NewsBot] Processing candidate: "${item.title}" (${item.source})`);

      // Resolve high-resolution image from source site
      const resolvedImage = await resolveArticleImage(item.link, item.imageUrl);

      // Rewrite with Gemini
      const rewritten = await rewriteNewsWithGemini(item, resolvedImage);
      if (!rewritten || !rewritten.title || !rewritten.content) {
        console.warn('[NewsBot] Gemini returned incomplete article for:', item.title);
        continue;
      }

      const finalSlug = slugify(rewritten.slug || rewritten.title);

      // Create Post in SQLite
      const newPost = createPost({
        title: rewritten.title,
        slug: finalSlug,
        excerpt: rewritten.excerpt || '',
        content: rewritten.content,
        featured_image: resolvedImage,
        category: rewritten.category || 'Öğretmen',
        category_slug: rewritten.category_slug || 'ogretmen',
        tags: Array.isArray(rewritten.tags) ? rewritten.tags : ['öğretmen haberleri', 'meb', 'okul'],
        author: 'Matemetrik Eğitim & Matematik Zümresi',
        is_published: publishMode,
      });

      // Save to Vercel Blob Persistent Cloud Store!
      try {
        await saveDynamicPostToBlob(newPost);
      } catch (blobErr) {
        console.error('[NewsBot] Failed to save post to Vercel Blob:', blobErr);
      }

      // Record in crawled_news table to guarantee deduplication
      saveCrawledNews({
        source_url: item.link,
        source_title: item.title,
        source_site: item.source,
        source_image: resolvedImage,
        post_id: newPost.id,
        post_slug: newPost.slug,
        status: publishMode === 1 ? 'published' : 'draft',
      });

      // Invalidate edge caches
      try {
        revalidatePath(`/post/${newPost.slug}`);
        revalidatePath('/');
        revalidatePath('/post');
        revalidatePath('/kategori/ogretmen');
        revalidatePath('/admin/posts');
      } catch {}

      results.created++;
      results.processedArticles.push({
        id: newPost.id,
        title: newPost.title,
        slug: newPost.slug,
        source: item.source,
        source_url: item.link,
        image: resolvedImage,
        status: publishMode === 1 ? 'Yayında' : 'Taslak',
      });

      console.log(`[NewsBot] Successfully created article #${newPost.id}: "${newPost.title}" -> /post/${newPost.slug}`);
    } catch (err: any) {
      console.error(`[NewsBot] Failed processing item "${item.title}":`, err.message);
    }
  }

  return results;
}
