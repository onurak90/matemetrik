import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '..', 'data', 'matemetrik.db');

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

// 1. Ensure tracking table exists
db.exec(`
  CREATE TABLE IF NOT EXISTS imported_birincisinifim (
    wp_id INTEGER PRIMARY KEY,
    post_id INTEGER,
    title TEXT,
    slug TEXT,
    pdf_url TEXT,
    created_at TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_imported_wp_id ON imported_birincisinifim(wp_id);
`);

/**
 * Turkish lowercase and title casing
 */
function toTurkishTitleCase(str) {
  if (!str) return '';
  const lowerWords = ['ve', 'ile', 'veya', 'de', 'da', 'ki', 'mi', 'mu', 'mü', 'mı', 'için', 'ne', 'göre'];
  return str
    .toLocaleLowerCase('tr-TR')
    .split(/\s+/)
    .map((word, index) => {
      if (index > 0 && lowerWords.includes(word)) return word;
      return word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1);
    })
    .join(' ');
}

/**
 * Clean raw title from abbreviations, week markers, and entities
 */
function cleanRawTitle(raw) {
  if (!raw) return '';
  let t = raw
    .replace(/&amp;/g, '&')
    .replace(/&#8211;/g, '-')
    .replace(/&#8217;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&#038;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/^(\d+[\.\s]?[hH]\b|\d+\.SIN\s*\d+[\.\s]*HAF\s*|\d+\.\s*Hafta\s*|\d+\.H\s*)/i, '')
    .replace(/-\s*Hafta\s*\d+/i, '')
    .trim();

  // If ends with truncated abbreviations like 'İŞ' or 'ETK'
  t = t.replace(/\bİŞ$/i, 'İşlemi');
  t = t.replace(/\bETK$/i, 'Etkinliği');
  t = t.replace(/\bHAF$/i, 'Hafta');

  // Convert to Turkish title case
  return toTurkishTitleCase(t);
}

/**
 * Generate clean URL slug
 */
function slugify(text) {
  return text
    .toString()
    .replace(/ğ/g, 'g')
    .replace(/Ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/Ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/Ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/Ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/Ç/g, 'c')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Grade & Subject resolution
 */
function resolveGradeAndSubject(post, rawTitle, cleanTitle) {
  const catIds = post.categories || [];
  let grade = '1. Sınıf';
  let gradeSlug = '1-sinif';

  const isGrade4 = catIds.some((id) => [17, 29, 30, 31, 32, 33].includes(id)) || /4\.\s*sınıf|4h\b|4\.sin/i.test(rawTitle);
  const isGrade3 = catIds.some((id) => [20, 24, 26, 27, 28, 34].includes(id)) || /3\.\s*sınıf|3h\b|3\.sin/i.test(rawTitle);
  const isGrade2 = catIds.some((id) => [19, 21, 22, 23, 25].includes(id)) || /2\.\s*sınıf|2h\b|2\.sin/i.test(rawTitle);

  if (isGrade4) {
    grade = '4. Sınıf';
    gradeSlug = '4-sinif';
  } else if (isGrade3) {
    grade = '3. Sınıf';
    gradeSlug = '3-sinif';
  } else if (isGrade2) {
    grade = '2. Sınıf';
    gradeSlug = '2-sinif';
  } else {
    grade = '1. Sınıf';
    gradeSlug = '1-sinif';
  }

  let subject = 'Etkinlik';
  if (
    catIds.some((id) => [14, 22, 26, 30].includes(id)) ||
    /matematik|toplama|çıkarma|çarpma|bölme|geometrik|sayı|örüntü|basamak|grafik|kesir/i.test(cleanTitle)
  ) {
    subject = 'Matematik';
  } else if (
    catIds.some((id) => [31, 28].includes(id)) ||
    /fen|kuvvet|madde|ışık|ses|dünya|fosil|besin|mikroskobik|elektrik/i.test(cleanTitle)
  ) {
    subject = 'Fen Bilimleri';
  } else if (
    catIds.some((id) => [15, 23, 27].includes(id)) ||
    /hayat bilgisi|arkadaşlık|okul|trafik|sağlık|güvenlik|aile|akraba|özenli/i.test(cleanTitle)
  ) {
    subject = 'Hayat Bilgisi';
  } else if (
    catIds.some((id) => [32].includes(id)) ||
    /sosyal|kültür|milli mücadele|harita|kroki|haklar|birey|toplum|sorumluluk/i.test(cleanTitle)
  ) {
    subject = 'Sosyal Bilgiler';
  } else if (
    catIds.some((id) => [7, 8, 9, 10, 13, 21, 24, 29].includes(id)) ||
    /okuma|yazma|türkçe|harf|hece|kelime|cümle|noktalama|eş anlam|zıt anlam|metin|hikaye|karesel|hızlı okuma|masal|tekerleme/i.test(cleanTitle)
  ) {
    subject = grade === '1. Sınıf' ? 'Okuma Yazma' : 'Türkçe';
  } else {
    subject = 'Temel Dersler';
  }

  return { grade, gradeSlug, subject };
}

/**
 * Extract PDF URL
 */
function extractPdfUrl(contentHtml) {
  if (!contentHtml) return '';
  const matches = [...contentHtml.matchAll(/href=["'](https?:\/\/[^"']+\.pdf)["']/gi)];
  if (matches.length > 0) return matches[0][1];

  const dataMatches = [...contentHtml.matchAll(/data=["'](https?:\/\/[^"']+\.pdf)["']/gi)];
  if (dataMatches.length > 0) return dataMatches[0][1];

  const anyPdf = contentHtml.match(/(https?:\/\/[^\s"'<>]+\.pdf)/i);
  if (anyPdf) return anyPdf[1];

  return '';
}

/**
 * Extract Image URL
 */
function extractImageUrl(post) {
  const mediaUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  if (mediaUrl) return mediaUrl;

  const imgMatch = post.content?.rendered?.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch && imgMatch[1]) return imgMatch[1];

  return 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop';
}

/**
 * Generate rich SEO content HTML
 */
function generateSeoHtml(post, displayTitle, grade, gradeSlug, subject, pdfUrl, imageUrl) {
  const downloadButtonHtml = pdfUrl
    ? `
    <div class="not-prose my-8 p-6 sm:p-8 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl text-white shadow-xl shadow-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-6 border border-amber-300/30">
      <div class="space-y-1.5 text-center sm:text-left">
        <span class="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-100 bg-black/10 px-3 py-1 rounded-full">
          📄 Ücretsiz MEB Maarif Modeli Çalışma Kağıdı
        </span>
        <h3 class="text-xl sm:text-2xl font-black text-white">
          ${displayTitle} PDF İndir
        </h3>
        <p class="text-xs text-amber-100 max-w-lg leading-relaxed">
          A4 kağıt boyutunda, doğrudan sınıfta dağıtmaya veya evde ödev olarak çözmeye uygun yüksek çözünürlüklü özgün etkinlik dokümanı.
        </p>
      </div>
      <a
        href="${pdfUrl}"
        target="_blank"
        rel="noopener noreferrer"
        download
        class="px-8 py-4 bg-white hover:bg-amber-50 text-amber-800 font-black rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2.5 shrink-0 text-sm"
      >
        <span>📥 Ücretsiz PDF İndir</span>
      </a>
    </div>
    `
    : `
    <div class="not-prose my-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-xs font-semibold">
      ℹ️ Bu etkinlik çalışma kağıdı doğrudan görsel üzerinden incelenebilir ve sınıf ortamında uygulanabilir.
    </div>
    `;

  return `
<div class="ilkokul-etkinlik-container space-y-8">
  <!-- 1. Header Badges & Quick Info -->
  <div class="not-prose p-5 bg-slate-50 border border-slate-200/90 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
    <div class="flex flex-wrap items-center gap-2">
      <span class="px-3 py-1 bg-amber-100 text-amber-800 font-extrabold rounded-lg">
        ${grade}
      </span>
      <span class="px-3 py-1 bg-indigo-100 text-indigo-800 font-extrabold rounded-lg">
        ${subject}
      </span>
      <span class="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg">
        MEB 2026-2027 Müfredat Uyumlu
      </span>
    </div>
    <span class="text-slate-500 font-medium">
      Yazdırılabilir A4 &bull; Çözümlü Pekiştirme
    </span>
  </div>

  <!-- 2. Featured Preview Image with Semantic SEO Figure -->
  <figure class="my-6 text-center">
    <img
      src="${imageUrl}"
      alt="${displayTitle} - ${grade} ${subject} Etkinlik ve Çalışma Kağıdı Matemetrik"
      title="${displayTitle} - ${grade} ${subject} Çalışma Kağıdı Önizlemesi"
      class="w-full max-h-[640px] object-contain rounded-2xl shadow-md border border-slate-200 mx-auto bg-white"
      loading="lazy"
    />
    <figcaption class="text-xs text-slate-500 mt-2 font-medium">
      ${grade} ${subject}: ${displayTitle} Çalışma Kağıdı A4 Önizleme Sayfası
    </figcaption>
  </figure>

  <!-- 3. Primary Download CTA Box -->
  ${downloadButtonHtml}

  <!-- 4. Pedagogical and Curricular Content -->
  <div class="prose max-w-none text-slate-700 leading-relaxed space-y-6">
    <h2>${displayTitle} Etkinliğinin Amacı ve Pedagojik Kazanımları</h2>
    <p>
      İlkokul <strong>${grade}</strong> seviyesinde yer alan <strong>${displayTitle}</strong> etkinliği, öğrencilerin <em>${subject}</em> dersindeki temel kavramları somutlaştırarak kalıcı bir şekilde öğrenmelerini sağlamak amacıyla geliştirilmiştir. Milli Eğitim Bakanlığı (MEB) Talim ve Terbiye Kurulu Başkanlığı tarafından yayımlanan güncel <strong>Türkiye Yüzyılı Maarif Modeli</strong> öğretim programındaki hedefler doğrultusunda hazırlanmıştır.
    </p>

    <div class="p-5 my-4 bg-indigo-50/70 border-l-4 border-indigo-600 rounded-r-2xl">
      <strong class="text-indigo-900 block font-bold mb-1">🎯 Hedeflenen Temel Beceriler:</strong>
      <ul class="list-disc list-inside space-y-1 text-xs text-indigo-950 mt-1">
        <li>Konuya dair analitik düşünme ve neden-sonuç bağı kurma becerisi</li>
        <li>Bilişsel odaklanma, okuduğunu anlama ve görsel dikkat pekiştirme</li>
        <li>Kendi başına problem çözebilme ve bağımsız çalışma alışkanlığı kazanma</li>
        <li>Müfredat kazanımlarına uygun işlem ve kavram doğrulaması yapabilme</li>
      </ul>
    </div>

    <h2>Öğretmenler ve Veliler İçin Etkinlik Uygulama Yönergesi</h2>
    <p>
      Bu çalışma kağıdından en yüksek verimi elde edebilmek için aşağıdaki adımların izlenmesi önerilir:
    </p>
    <ol class="list-decimal list-inside space-y-2 text-sm">
      <li><strong>Ön Hazırlık:</strong> Çalışma kağıdını yukarıdaki "PDF İndir" butonuna tıklayarak A4 boyutunda beyaz kağıda net bir şekilde yazdırın.</li>
      <li><strong>Açıklama Aşaması:</strong> Çocuğunuza veya öğrencilerinize etkinliğin başlığını okuyun, yönergeleri anlamalarını sağlayın ancak doğrudan cevabı söylemek yerine düşünmelerine fırsat tanıyın.</li>
      <li><strong>Bireysel Uygulama:</strong> Öğrencinin soruları ve etkinlik adımlarını kendi hızında tamamlamasına olanak tanıyın.</li>
      <li><strong>Geri Bildirim ve Değerlendirme:</strong> Tamamlanan çalışma kağıdını birlikte kontrol ederek doğru yapılan kısımları takdir edin, eksik veya hatalı yerleri birlikte analiz edin.</li>
    </ol>

    <h2>${grade} ${subject} Dersi Kapsamında Bu Konunun Önemi</h2>
    <p>
      İlkokul çağındaki çocukların zihinsel gelişimi, görsel materyaller ve uygulamalı alıştırmalarla desteklendiğinde çok daha hızlı ve kalıcı olur. <strong>${displayTitle}</strong> çalışması, soyut kavramları somutlaştırarak öğrencinin derse olan ilgisini ve özgüvenini artırır.
    </p>

    <!-- 5. Interactive FAQ Details Section for Google FAQ Rich Snippets -->
    <h2>Merak Edilenler & Sıkça Sorulan Sorular (SSS)</h2>
    <div class="space-y-3 not-prose">
      <details class="group p-4 bg-slate-50 rounded-xl border border-slate-200">
        <summary class="font-bold text-sm text-slate-900 cursor-pointer flex items-center justify-between">
          <span>Bu çalışma kağıdı güncel MEB müfredatına uygun mu?</span>
          <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <p class="mt-2 text-xs text-slate-600 leading-relaxed">
          Evet, hazırlanan bu ${displayTitle} etkinlik kağıdı Millî Eğitim Bakanlığı'nın en güncel öğretim programına ve Türkiye Yüzyılı Maarif Modeli kazanımlarına tam uyumludur.
        </p>
      </details>

      <details class="group p-4 bg-slate-50 rounded-xl border border-slate-200">
        <summary class="font-bold text-sm text-slate-900 cursor-pointer flex items-center justify-between">
          <span>PDF dosyasını indirmek ve yazdırmak tamamen ücretsiz midir?</span>
          <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <p class="mt-2 text-xs text-slate-600 leading-relaxed">
          Evet, Matemetrik eğitim portalı üzerinden bu çalışma kağıdını hiçbir ücret ödemeden ve üye olmadan doğrudan PDF formatında indirebilir ve A4 yazıcınızdan çıktı alabilirsiniz.
        </p>
      </details>

      <details class="group p-4 bg-slate-50 rounded-xl border border-slate-200">
        <summary class="font-bold text-sm text-slate-900 cursor-pointer flex items-center justify-between">
          <span>Etkinlik ev ödevi veya sınıf içi grup çalışması olarak kullanılabilir mi?</span>
          <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <p class="mt-2 text-xs text-slate-600 leading-relaxed">
          Kesinlikle. Öğretmenlerimiz sınıf içi pekiştirme veya değerlendirme testi olarak kullanabileceği gibi, velilerimiz de evde okul derslerine destek amacıyla çocuklarıyla birlikte uygulayabilir.
        </p>
      </details>
    </div>

    <!-- 6. Internal Linking Card to Matemetrik Robots -->
    <div class="not-prose my-8 p-6 bg-slate-100/70 border border-slate-200 rounded-3xl space-y-3">
      <h4 class="font-black text-slate-900 text-sm">
        💡 İlgili Eğitim Robotları ve Diğer Seviyeler:
      </h4>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        <a href="/kategori/${gradeSlug}" class="p-2.5 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
          📚 Tüm ${grade} İçerikleri &rarr;
        </a>
        <a href="/karne-gorusu-ureticisi" class="p-2.5 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
          🎓 Karne Görüşü Robotu &rarr;
        </a>
        <a href="/sinav-hazirlama-robotu" class="p-2.5 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
          📝 MEB Sınav Robotu &rarr;
        </a>
        <a href="/yillik-plan-hazirlama" class="p-2.5 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
          📅 Yıllık Plan Robotu &rarr;
        </a>
      </div>
    </div>
  </div>
</div>
  `.trim();
}

/**
 * Main importer loop
 */
async function runImporter() {
  console.log('🚀 BirinciSinifim.com Etkinlik & Çalışma Kağıdı İçe Aktarma Başlatıldı...');

  let page = 1;
  let totalImported = 0;
  let totalSkipped = 0;
  let totalPages = 1;

  const countByGrade = {
    '1. Sınıf': 0,
    '2. Sınıf': 0,
    '3. Sınıf': 0,
    '4. Sınıf': 0,
  };

  const insertPostStmt = db.prepare(`
    INSERT INTO posts (
      title, slug, excerpt, content, featured_image,
      category, category_slug, tags, author, views,
      is_published, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const recordImportStmt = db.prepare(`
    INSERT INTO imported_birincisinifim (wp_id, post_id, title, slug, pdf_url, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const checkImportStmt = db.prepare('SELECT wp_id FROM imported_birincisinifim WHERE wp_id = ?');
  const checkSlugStmt = db.prepare('SELECT id FROM posts WHERE slug = ?');

  while (page <= totalPages) {
    console.log(`\n📄 [Sayfa ${page}/${totalPages}] Birincisinifim.com API'den 100 içerik çekiliyor...`);

    const apiUrl = `https://birincisinifim.com/wp-json/wp/v2/posts?_embed=1&per_page=100&page=${page}`;
    let res;
    try {
      res = await fetch(apiUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        },
      });
    } catch (fetchErr) {
      console.error(`❌ Sayfa ${page} çekilemedi:`, fetchErr.message);
      break;
    }

    if (!res.ok) {
      console.warn(`⚠️ Sayfa ${page} yanıt vermedi: HTTP ${res.status}`);
      break;
    }

    if (page === 1) {
      const totalHeader = res.headers.get('x-wp-total');
      const totalPagesHeader = res.headers.get('x-wp-totalpages');
      if (totalPagesHeader) {
        totalPages = parseInt(totalPagesHeader, 10);
      }
      console.log(`🎯 Toplam Bulunan İçerik: ${totalHeader} adet (Toplam ${totalPages} sayfa).`);
    }

    const posts = await res.json();
    if (!Array.isArray(posts) || posts.length === 0) {
      break;
    }

    db.transaction(() => {
      for (const p of posts) {
        const wpId = p.id;

        // Skip if already imported
        const existing = checkImportStmt.get(wpId);
        if (existing) {
          totalSkipped++;
          continue;
        }

        const rawTitle = p.title?.rendered || 'Etkinlik';
        const cleanTitle = cleanRawTitle(rawTitle);
        const { grade, gradeSlug, subject } = resolveGradeAndSubject(p, rawTitle, cleanTitle);

        const pdfUrl = extractPdfUrl(p.content?.rendered);
        const imageUrl = extractImageUrl(p);

        // Full SEO title
        const postTitle = `${grade} ${subject}: ${cleanTitle} Etkinliği ve Çalışma Kağıdı (Ücretsiz PDF)`;

        // Clean SEO Slug
        let baseSlug = slugify(`${gradeSlug}-${cleanTitle}-calisma-kagidi-pdf`);
        if (!baseSlug || baseSlug.length < 5) {
          baseSlug = `etkinlik-${gradeSlug}-${wpId}`;
        }
        let finalSlug = baseSlug;
        let counter = 1;
        while (checkSlugStmt.get(finalSlug)) {
          finalSlug = `${baseSlug}-${counter++}`;
        }

        // 150-160 char Excerpt
        const excerpt = `İlkokul ${grade} ${subject} dersi ${cleanTitle} konusu için MEB güncel müfredatına uygun, yazdırılabilir A4 formatında ücretsiz PDF etkinlik ve çalışma kağıdı indirin.`;

        // Rich HTML Content
        const content = generateSeoHtml(p, cleanTitle, grade, gradeSlug, subject, pdfUrl, imageUrl);

        // Tags
        const tags = JSON.stringify([
          'ilkokul etkinlikleri',
          grade.toLowerCase(),
          subject.toLowerCase(),
          'çalışma kağıdı',
          'pdf indir',
          'meb müfredatı',
          cleanTitle.toLowerCase(),
        ]);

        const createdAt = p.date ? new Date(p.date).toISOString() : new Date().toISOString();

        // Insert into posts table
        const insertRes = insertPostStmt.run(
          postTitle,
          finalSlug,
          excerpt,
          content,
          imageUrl,
          grade,
          gradeSlug,
          tags,
          'Matemetrik İlkokul Eğitim Zümresi',
          Math.floor(Math.random() * 40) + 10,
          1, // is_published = 1
          createdAt,
          createdAt
        );

        const newPostId = Number(insertRes.lastInsertRowid);

        // Record in tracking table
        recordImportStmt.run(wpId, newPostId, postTitle, finalSlug, pdfUrl, createdAt);

        totalImported++;
        countByGrade[grade] = (countByGrade[grade] || 0) + 1;
      }
    })();

    console.log(`✓ Sayfa ${page} işlendi. Şu ana kadar aktarılan: ${totalImported}, Atlanan: ${totalSkipped}`);
    page++;
  }

  console.log('\n========================================');
  console.log('🎉 İÇE AKTARMA TAMAMLANDI!');
  console.log(`Toplam Aktarılan Yeni İçerik: ${totalImported}`);
  console.log(`Önceden Aktarılmış (Atlanan): ${totalSkipped}`);
  console.log('Sınıflara Göre Dağılım:');
  console.table(countByGrade);
  console.log('========================================\n');
}

runImporter()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Fatal Error during import:', err);
    process.exit(1);
  });
