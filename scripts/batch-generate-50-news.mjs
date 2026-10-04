import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

// 1. Read API Key
const envContent = fs.readFileSync('.env.local', 'utf8');
const apiKeyMatch = envContent.match(/GEMINI_API_KEY="([^"]+)"/);
if (!apiKeyMatch) {
  console.error('GEMINI_API_KEY not found in .env.local');
  process.exit(1);
}
const GEMINI_API_KEY = apiKeyMatch[1].trim();

// 2. Open SQLite Database
const dbPath = path.join(process.cwd(), 'data', 'matemetrik.db');
const db = new Database(dbPath);

console.log('Connected to database at:', dbPath);

const SOURCES = [
  { name: 'MEB Personel', url: 'https://www.mebpersonel.com/feed' },
  { name: 'Kamudan Haber', url: 'https://www.kamudanhaber.net/rss' },
  { name: 'Kamu Personeli', url: 'https://www.kamupersoneli.net/rss' },
  { name: 'Ajans Kamu', url: 'https://www.ajanskamu.net/rss' },
  { name: 'Google Haberler (Öğretmen)', url: 'https://news.google.com/rss/search?q=%C3%B6%C4%9Fretmen&hl=tr&gl=TR&ceid=TR:tr' },
  { name: 'Google Haberler (Milli Eğitim Bakanlığı)', url: 'https://news.google.com/rss/search?q=milli+e%C4%9Fitim+bakanl%C4%B1%C4%9F%C4%B1&hl=tr&gl=TR&ceid=TR:tr' },
  { name: 'Google Haberler (MEB Okul Tatil)', url: 'https://news.google.com/rss/search?q=meb+okul+tatil&hl=tr&gl=TR&ceid=TR:tr' },
  { name: 'Google Haberler (Öğretmen Atama)', url: 'https://news.google.com/rss/search?q=%C3%B6%C4%9Fretmen+atama&hl=tr&gl=TR&ceid=TR:tr' },
  { name: 'Google Haberler (Öğretmenlik Meslek Kanunu)', url: 'https://news.google.com/rss/search?q=%C3%B6%C4%9Fretmenlik+meslek+kanunu&hl=tr&gl=TR&ceid=TR:tr' },
  { name: 'Google Haberler (MEB Maarif Modeli)', url: 'https://news.google.com/rss/search?q=meb+maarif+modeli+m%C3%BCfredat&hl=tr&gl=TR&ceid=TR:tr' },
  { name: 'Google Haberler (Uzman Öğretmenlik)', url: 'https://news.google.com/rss/search?q=uzman+%C3%B6%C4%9Fretmenlik+ba%C5%9F%C3%B6%C4%9Fretmenlik&hl=tr&gl=TR&ceid=TR:tr' },
  { name: 'Google Haberler (Öğretmen Ek Ders)', url: 'https://news.google.com/rss/search?q=%C3%B6%C4%9Fretmen+ek+ders+seminer&hl=tr&gl=TR&ceid=TR:tr' },
  { name: 'Google Haberler (Öğretmen Tayin)', url: 'https://news.google.com/rss/search?q=%C3%B6%C4%9Fretmen+tayin+il+i%C3%A7i+il+d%C4%B1%C5%9F%C4%B1&hl=tr&gl=TR&ceid=TR:tr' }
];

const TEACHER_KEYWORDS = [
  'öğretmen', 'ogretmen', 'öğretmenler', 'okul', 'okullar', 'meb', 'milli eğitim',
  'müfredat', 'tatil', 'ara tatil', 'yarıyıl', 'sınav', 'yazılı', 'atama',
  'ücretli öğretmen', 'uzman öğretmen', 'başöğretmen', 'ömk', 'ders',
  'seminer', 'dyk', 'idareci', 'müdür', 'ek ders', 'norm', 'maaş', 'tayin',
  'il içi', 'il dışı', 'kpss', 'ags', 'eğitim', 'öğrenci', 'lgs', 'yks', 'bursluluk'
];

const FALLBACK_EDUCATION_IMAGES = [
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop'
];

function cleanText(text) {
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

function slugify(text) {
  const trMap = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', Ç: 'c', Ğ: 'g', İ: 'i', Ö: 'o', Ş: 's', Ü: 'u' };
  let str = text || '';
  for (const [key, val] of Object.entries(trMap)) {
    str = str.replace(new RegExp(key, 'g'), val);
  }
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function extractImageFromXml(itemXml) {
  let m = itemXml.match(/<media:content[^>]+url=["']([^"']+)["']/i);
  if (m && m[1]) return m[1].trim();

  m = itemXml.match(/<enclosure[^>]+url=["']([^"']+)["'][^>]+type=["']image\/[^"']+["']/i) ||
      itemXml.match(/<enclosure[^>]+type=["']image\/[^"']+["'][^>]+url=["']([^"']+)["']/i) ||
      itemXml.match(/<enclosure[^>]+url=["']([^"']+)["']/i);
  if (m && m[1]) return m[1].trim();

  m = itemXml.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (m && m[1]) return m[1].trim();

  return '';
}

async function fetchFeed(source) {
  try {
    const res = await fetch(source.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const itemRegex = /<item[\s\S]*?<\/item>/gi;
    const matches = xml.match(itemRegex) || [];
    const items = [];

    for (const itemXml of matches) {
      const titleMatch = itemXml.match(/<title>([\s\S]*?)<\/title>/i);
      const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/i);
      const descMatch = itemXml.match(/<description>([\s\S]*?)<\/description>/i);
      const pubDateMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);

      const title = cleanText(titleMatch ? titleMatch[1] : '');
      const link = cleanText(linkMatch ? linkMatch[1] : '');
      const description = cleanText(descMatch ? descMatch[1] : '');
      const imageUrl = extractImageFromXml(itemXml);

      if (title && link) {
        items.push({
          title,
          link,
          source: source.name,
          pubDate: pubDateMatch ? pubDateMatch[1].trim() : '',
          description,
          imageUrl
        });
      }
    }
    return items;
  } catch (err) {
    console.error(`Feed fetch error for ${source.name}:`, err.message);
    return [];
  }
}

async function resolveArticleImage(link, fallbackUrl = '') {
  if (fallbackUrl && fallbackUrl.startsWith('http')) return fallbackUrl;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);
    const res = await fetch(link, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
      }
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

  const hash = Math.abs(link.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0));
  return FALLBACK_EDUCATION_IMAGES[hash % FALLBACK_EDUCATION_IMAGES.length];
}

async function rewriteNewsWithGemini(item, resolvedImageUrl) {
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
Bu haberi alıp 750 - 1000 kelimelik, son derece zengin, pedagojik, resmi MEB mevzuatına ve kanunlarına dayanan, arama motorlarında 1. sıraya oynayacak %100 ÖZGÜN bir eğitim makalesine dönüştürmek.

YAZIM KURALLARI:
1. Kesinlikle clickbait yapma. Doğrudan net bilgiler, resmi tebliğ ve yönetmelik maddeleriyle destekle.
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
5. Metin içinde uygun yerlerde sitemizdeki araçlara doğal iç linkler ver:
   - <a href="/karne-gorusu-ureticisi" class="text-indigo-600 font-medium underline">Akıllı Karne Görüşü Robotu</a>
   - <a href="/sinav-hazirlama-robotu" class="text-indigo-600 font-medium underline">Resmi MEB Sınav Hazırlama Robotu</a>
   - <a href="/takdir-tesekkur-hesaplama" class="text-indigo-600 font-medium underline">Takdir Teşekkür Hesaplama</a>
   - <a href="/ogretmen-araclari" class="text-indigo-600 font-medium underline">Öğretmen Evrak ve Araçları</a>
   - <a href="/kategori/ogretmen" class="text-indigo-600 font-medium underline">Öğretmen Haberleri ve Rehberi</a>

ÇIKTI FORMATI:
Sadece ve sadece geçerli bir JSON objesi döndür:
{
  "title": "Arama hacmi yüksek, profesyonel SEO başlığı (50-65 karakter)",
  "slug": "temiz-turkce-karaktersiz-seo-url-slugi",
  "excerpt": "Google sonuçları için 150-160 karakterlik çarpıcı meta açıklaması.",
  "content": "Yukarıdaki kurallara göre hazırlanmış zengin HTML makalesi.",
  "tags": ["öğretmen haberleri", "meb", "okul", "eğitim", "gündem"]
}
`;

  const models = ['gemini-3.5-flash-lite', 'gemini-3.5-flash', 'gemini-flash-latest'];
  for (const m of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${GEMINI_API_KEY}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      });
      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const clean = text.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
          return JSON.parse(clean);
        }
      }
    } catch (err) {
      console.warn(`Model ${m} failed:`, err.message);
    }
  }
  return null;
}

function ensureUniqueSlug(baseSlug) {
  let slug = baseSlug;
  let counter = 1;
  while (true) {
    const existing = db.prepare('SELECT id FROM posts WHERE slug = ?').get(slug);
    if (!existing) break;
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  return slug;
}

async function main() {
  console.log('🚀 50 Adet Güncel Öğretmen ve Okul Haberi Toplama & Üretme Başlatılıyor...');

  // 1. Gather all feeds
  const allItems = [];
  for (const src of SOURCES) {
    process.stdout.write(`Taranyor: ${src.name}... `);
    const items = await fetchFeed(src);
    console.log(`(${items.length} haber bulundu)`);
    allItems.push(...items);
  }

  console.log(`\nToplam taranan haber: ${allItems.length}`);

  // 2. Filter for teacher / school keywords
  const relevant = allItems.filter((item) => {
    const text = `${item.title.toLowerCase()} ${item.description.toLowerCase()}`;
    return TEACHER_KEYWORDS.some((kw) => text.includes(kw));
  });

  console.log(`Öğretmen/Okul/MEB anahtar kelimesi içeren adaylar: ${relevant.length}`);

  // 3. Deduplicate among candidates
  const seenUrls = new Set();
  const uniqueCandidates = [];
  for (const item of relevant) {
    if (!seenUrls.has(item.link)) {
      seenUrls.add(item.link);
      uniqueCandidates.push(item);
    }
  }

  // 4. Deduplicate against existing posts & crawled_news
  const existingCrawled = new Set(
    db.prepare('SELECT source_url FROM crawled_news').all().map((r) => r.source_url)
  );

  const freshCandidates = uniqueCandidates.filter((item) => {
    if (existingCrawled.has(item.link)) return false;
    const testSlug = slugify(item.title);
    const existingPost = db.prepare('SELECT id FROM posts WHERE slug = ?').get(testSlug);
    if (existingPost) return false;
    return true;
  });

  console.log(`Sitede daha önce bulunmayan yeni taze adaylar: ${freshCandidates.length}`);

  const targetCount = 10;
  const toProcess = freshCandidates.slice(0, targetCount);

  if (toProcess.length === 0) {
    console.log('Üretilecek yeni aday bulunamadı.');
    return;
  }

  console.log(`\n======================================================`);
  console.log(`Hedeflenen ${toProcess.length} adet haber üretilmeye başlanıyor...`);
  console.log(`======================================================\n`);

  let createdCount = 0;

  for (let i = 0; i < toProcess.length; i++) {
    const item = toProcess[i];
    const index = i + 1;
    console.log(`\n[${index}/${toProcess.length}] İşleniyor: "${item.title}" (${item.source})`);

    try {
      const resolvedImage = await resolveArticleImage(item.link, item.imageUrl);
      const rewritten = await rewriteNewsWithGemini(item, resolvedImage);

      if (!rewritten || !rewritten.title || !rewritten.content) {
        console.warn(`  ⚠️ Gemini içerik üretemedi, atlanıyor.`);
        continue;
      }

      const finalSlug = ensureUniqueSlug(slugify(rewritten.slug || rewritten.title));
      const now = new Date().toISOString();
      const tagsStr = JSON.stringify(Array.isArray(rewritten.tags) ? rewritten.tags : ['öğretmen haberleri', 'meb', 'okul']);

      // Insert into posts
      const insertPostStmt = db.prepare(`
        INSERT INTO posts (
          title, slug, excerpt, content, featured_image,
          category, category_slug, tags, author, is_published,
          created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const info = insertPostStmt.run(
        rewritten.title,
        finalSlug,
        rewritten.excerpt || '',
        rewritten.content,
        resolvedImage,
        'Öğretmen',
        'ogretmen',
        tagsStr,
        'Matemetrik Eğitim & Matematik Zümresi',
        1,
        now,
        now
      );

      const postId = Number(info.lastInsertRowid);

      // Insert into crawled_news
      db.prepare(`
        INSERT INTO crawled_news (
          source_url, source_title, source_site, source_image,
          post_id, post_slug, status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        item.link,
        item.title,
        item.source,
        resolvedImage,
        postId,
        finalSlug,
        'published',
        now
      );

      createdCount++;
      console.log(`  ✓ Başarıyla Oluşturuldu (#${postId}): "${rewritten.title}"`);
      console.log(`    URL: /post/${finalSlug}`);

      // Small delay between calls
      await new Promise((r) => setTimeout(r, 700));
    } catch (err) {
      console.error(`  ❌ Hata: ${err.message}`);
    }
  }

  console.log(`\n======================================================`);
  console.log(`🎉 Tamamlandı! Toplam ${createdCount} adet güncel öğretmen haberi başarıyla oluşturuldu ve veritabanına eklendi!`);
  console.log(`======================================================\n`);
}

main().catch(console.error);
