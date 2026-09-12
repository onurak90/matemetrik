import { getSettings, createPost, getCategories } from './db';
import { generateCoverImage } from './coverGenerator';

interface TrendSuggestion {
  title: string;
  keyword: string;
  intent: string;
  volume: string;
  category: string;
}

interface GenerateArticleParams {
  topic: string;
  titleOverride?: string;
  competitorUrl?: string;
  tone?: string;
  length?: 'short' | 'medium' | 'long';
  categorySlug?: string;
  customInstructions?: string;
}

interface GeneratedArticleResult {
  post: any;
  seoScore: number;
  wordCount: number;
  internalLinksCount: number;
  externalLinksCount: number;
  coverImage: string;
  feedback: string[];
}

const CANDIDATE_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.5-flash',
  'gemini-3.6-flash',
  'gemini-flash-latest',
];

export function getGeminiApiKey(): string {
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim()) {
    return process.env.GEMINI_API_KEY.trim();
  }
  const settings = getSettings();
  if (settings.gemini_api_key && settings.gemini_api_key.trim()) {
    return settings.gemini_api_key.trim();
  }
  return 'AQ.Ab8RN6KcT_ST0wgHMOZx5Y2wWDvQFIr2troUzVes2YaQ3_wFLA';
}

async function callGeminiApi(prompt: string, expectJson: boolean = true): Promise<any> {
  const apiKey = getGeminiApiKey();
  let lastError: any = null;

  for (const model of CANDIDATE_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload: any = {
        contents: [{ parts: [{ text: prompt }] }],
      };
      if (expectJson) {
        payload.generationConfig = {
          responseMimeType: 'application/json',
          temperature: 0.7,
        };
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 16000);

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      const data = await res.json();
      if (!res.ok || data.error) {
        lastError = new Error(data.error?.message || `HTTP ${res.status}`);
        // If unavailable or rate limited, try next model immediately
        continue;
      }

      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        lastError = new Error('Boş API yanıtı döndü');
        continue;
      }

      if (expectJson) {
        try {
          return JSON.parse(rawText);
        } catch {
          const clean = rawText
            .replace(/^```[a-z]*\s*/i, '')
            .replace(/\s*```$/i, '')
            .trim();
          try {
            return JSON.parse(clean);
          } catch {
            const firstBrace = clean.indexOf('{');
            const lastBrace = clean.lastIndexOf('}');
            if (firstBrace !== -1 && lastBrace > firstBrace) {
              return JSON.parse(clean.substring(firstBrace, lastBrace + 1));
            }
            const firstBracket = clean.indexOf('[');
            const lastBracket = clean.lastIndexOf(']');
            if (firstBracket !== -1 && lastBracket > firstBracket) {
              return JSON.parse(clean.substring(firstBracket, lastBracket + 1));
            }
            throw new Error('Geçersiz JSON formatı');
          }
        }
      }

      return rawText;
    } catch (err: any) {
      lastError = err;
    }
  }

  throw lastError || new Error('Gemini API modellerine erişilemedi');
}

/**
 * Fetch Google Trends & Search Intent suggestions based on a seed keyword
 */
export async function getTrendsSuggestions(keyword: string): Promise<TrendSuggestion[]> {
  const prompt = `Sen Türkiye'nin en iyi eğitim ve matematik SEO ve Google Trends analiz uzmanısın.
Kullanıcının girdiği kök kelime: "${keyword}".
Bu kök kelimeyle ilgili olarak, Google Türkiye Trends, MEB güncel 2025-2026 müfredatı ve öğrencilerin en çok aradığı, yüksek tıklama getirecek tam 10 adet özgün blog konusu ve başlığı öner.

Aşağıdaki JSON array formatında tam 10 eleman döndür:
[
  {
    "title": "SEO uyumlu çekici makale başlığı",
    "keyword": "Hedeflenen odak arama terimi",
    "intent": "Arama amacı (örn: Sınav Hazırlık, MEB Çözümleri, Konu Anlatımı, Rehberlik)",
    "volume": "Tahmini Arama Yoğunluğu (örn: 'Patlama Yapan', 'Çok Yüksek', 'Trend', 'Yüksek')",
    "category": "Önerilen Kategori Adı"
  }
]`;

  const results = await callGeminiApi(prompt, true);
  if (Array.isArray(results)) {
    return results.slice(0, 10);
  }
  return [];
}

/**
 * Scrape competitor URL content safely with timeout
 */
async function fetchCompetitorSummary(url: string): Promise<string> {
  if (!url || !url.startsWith('http')) return '';
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml',
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) return '';
    const html = await res.text();

    // Extract title and text
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';

    // Strip scripts, styles, tags
    const cleanText = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 2000);

    return `Rakip Başlık: ${title}\nRakip İçerik Özeti:\n${cleanText}`;
  } catch {
    return '';
  }
}

/**
 * Calculate detailed SEO Score (0-100) and feedback
 */
function calculateSeoScore(post: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
}): { score: number; feedback: string[]; internalLinks: number; externalLinks: number; words: number } {
  let score = 0;
  const feedback: string[] = [];

  // 1. Title (max 15 pts)
  const titleLen = post.title.length;
  if (titleLen >= 35 && titleLen <= 70) {
    score += 15;
    feedback.push('✓ Başlık uzunluğu SEO için ideal (35-70 karakter).');
  } else if (titleLen >= 20) {
    score += 10;
    feedback.push('⚠️ Başlık uzunluğu geliştirilebilir.');
  } else {
    feedback.push('❌ Başlık çok kısa.');
  }

  // 2. Slug (max 10 pts)
  const cleanSlugRegex = /^[a-z0-9-]+$/;
  if (cleanSlugRegex.test(post.slug) && !post.slug.includes('--')) {
    score += 10;
    feedback.push('✓ URL Slug yapısı standartlara ve Türkçe SEO kurallarına %100 uygun.');
  } else {
    score += 5;
    feedback.push('⚠️ URL slug yapısında iyileştirme yapılabilir.');
  }

  // 3. Meta Description / Excerpt (max 15 pts)
  const excerptLen = post.excerpt.length;
  if (excerptLen >= 120 && excerptLen <= 165) {
    score += 15;
    feedback.push('✓ Meta açıklama uzunluğu arama motorları için mükemmel (120-165 karakter).');
  } else if (excerptLen >= 60) {
    score += 10;
    feedback.push('⚠️ Meta açıklama biraz kısa veya uzun.');
  } else {
    feedback.push('❌ Meta açıklama yetersiz.');
  }

  // 4. Word Count (max 20 pts)
  const words = post.content.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
  if (words >= 700) {
    score += 20;
    feedback.push(`✓ Zengin ve doyurucu içerik (${words} kelime).`);
  } else if (words >= 400) {
    score += 15;
    feedback.push(`✓ Yeterli kelime sayısı (${words} kelime).`);
  } else {
    score += 8;
    feedback.push(`⚠️ İçerik kısa (${words} kelime).`);
  }

  // 5. Headings H2 and H3 (max 15 pts)
  const h2Count = (post.content.match(/<h2[^>]*>/gi) || []).length;
  const h3Count = (post.content.match(/<h3[^>]*>/gi) || []).length;
  if (h2Count >= 2 && h3Count >= 1) {
    score += 15;
    feedback.push(`✓ Semantik başlık hiyerarşisi kusursuz (${h2Count} adet H2, ${h3Count} adet H3).`);
  } else if (h2Count >= 1) {
    score += 10;
    feedback.push('⚠️ Daha fazla H2 veya H3 alt başlık eklenebilir.');
  } else {
    feedback.push('❌ H2 alt başlık bulunamadı.');
  }

  // 6. Internal and External Links (max 15 pts)
  const allLinks = post.content.match(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi) || [];
  let internalLinks = 0;
  let externalLinks = 0;

  allLinks.forEach((linkTag) => {
    if (linkTag.includes('href="/"') || linkTag.includes('href="/kategori') || linkTag.includes('href="/post') || linkTag.includes('href="/karne') || linkTag.includes('href="/sinav') || linkTag.includes('matemetrik.com')) {
      internalLinks++;
    } else if (linkTag.includes('http')) {
      externalLinks++;
    }
  });

  if (internalLinks >= 2 && externalLinks >= 1) {
    score += 15;
    feedback.push(`✓ İç (${internalLinks}) ve dış (${externalLinks}) bağlantılar kusursuz yerleştirildi.`);
  } else if (internalLinks >= 1 || externalLinks >= 1) {
    score += 10;
    feedback.push(`✓ Bağlantı mevcut (İç: ${internalLinks}, Dış: ${externalLinks}).`);
  } else {
    feedback.push('⚠️ İç ve dış bağlantı artırılabilir.');
  }

  // 7. Tags and Category (max 10 pts)
  if (post.tags && post.tags.length >= 3 && post.category) {
    score += 10;
    feedback.push(`✓ Kategori (${post.category}) ve etiketler (${post.tags.length} adet) eksiksiz.`);
  } else {
    score += 5;
  }

  return {
    score: Math.min(100, score),
    feedback,
    internalLinks,
    externalLinks,
    words,
  };
}

/**
 * Generate full SEO Article and save as Draft
 */
export async function generateSeoArticle(params: GenerateArticleParams): Promise<GeneratedArticleResult> {
  const {
    topic,
    titleOverride,
    competitorUrl,
    tone = 'Öğretici ve Pedagojik',
    length = 'medium',
    categorySlug,
    customInstructions = '',
  } = params;

  const categories = getCategories();
  let matchedCategory = categories.find((c) => c.slug === categorySlug);
  if (!matchedCategory && categorySlug) {
    matchedCategory = categories.find((c) => c.name.toLowerCase().includes(categorySlug.toLowerCase()));
  }

  // Word count targets
  let wordCountInstruction = 'Yaklaşık 800 - 1100 kelimelik doyurucu bir makale yaz.';
  if (length === 'short') {
    wordCountInstruction = 'Yaklaşık 450 - 600 kelimelik öz, hap bilgi ve pratik bir makale yaz.';
  } else if (length === 'long') {
    wordCountInstruction = 'Yaklaşık 1400 - 1900 kelimelik, kapsamlı, derinlemesine adım adım rehber niteliğinde dev bir makale yaz.';
  }

  // Competitor analysis if provided
  let competitorContext = '';
  if (competitorUrl) {
    const summary = await fetchCompetitorSummary(competitorUrl);
    if (summary) {
      competitorContext = `\n\n[RAKİP ANALİZİ]:\n${summary}\nBu rakip içeriği incele, eksik bıraktığı noktaları tamamla, çok daha kaliteli, pedagojik ve %100 özgün bir içerik üret.\n`;
    }
  }

  const prompt = `Sen Türkiye'nin 1 numaralı matematik eğitim portalı Matemetrik.com'un baş editörü ve kıdemli SEO uzmanısın.

GÖREV:
Aşağıdaki konu hakkında Google aramalarında ilk sıraya yerleşecek (%100 SEO Uyumlu), güncel MEB 2025-2026 müfredatına tam entegre, okuyucuyu bağlayan profesyonel bir blog makalesi oluştur.

KONU: "${topic}"
${titleOverride ? `ÖZEL BAŞLIK İSTEĞİ: "${titleOverride}"` : ''}
YAZIM TARZI: ${tone}
İÇERİK UZUNLUĞU: ${wordCountInstruction}
HEDEF KATEGORİ: ${matchedCategory ? matchedCategory.name : 'Konuya en uygun kategori seç'}
${customInstructions ? `EK TALİMATLAR: ${customInstructions}` : ''}
${competitorContext}

İÇ LİNKLEME (İÇ BAĞLANTI) KURALLARI:
İçerik içerisine doğal ve ilgili yerlere aşağıdaki Matemetrik iç linklerinden en az 2 veya 3 tanesini HTML <a href="..." class="text-indigo-600 font-medium underline">...</a> şeklinde ekle:
- /kategori/10-sinif (10. Sınıf Matematik Konuları ve Çözümleri)
- /kategori/9-sinif (9. Sınıf Matematik Konuları)
- /kategori/meb-ders-kitabi-cevaplari (MEB Ders Kitabı Cevapları ve Çözümleri)
- /karne-gorusu-ureticisi (Akıllı e-Okul Karne Görüşü Robotu)
- /sinav-hazirlama-robotu (Resmi MEB Çift Sütun Sınav Hazırlama Robotu)
- /kategori/kitap-ozet (Kitap Özetleri)
- /kategori/matematik-blog (Matematik Dünyası ve Makaleler)
- /kategori/egitim-rehberligi (YKS ve LGS Çalışma Rehberliği)

DIŞ LİNKLEME KURALLARI:
En az 1 adet güvenilir eğitim otoritesi linki ekle (örn: Milli Eğitim Bakanlığı için <a href="https://www.meb.gov.tr" target="_blank" rel="noopener noreferrer" class="text-indigo-600 underline">Milli Eğitim Bakanlığı</a> veya ÖSYM / TÜBİTAK).

İÇERİK YAPI ŞABLONU (HTML):
- <h2> ve <h3> başlıkları mantıksal hiyerarşiyle kullan.
- Konuya göre uygun yerde formül, konu kazanımları veya karşılaştırma içeren temiz bir <table> tablosu kullan.
- Önemli ipuçları veya öğretmen notları için <div class="p-4 my-4 bg-indigo-50 border-l-4 border-indigo-600 rounded-r-xl"><strong>💡 Öğretmenin Notu:</strong> ...</div> kutusu kullan.
- Madde imleri (<ul><li>...</li></ul>) ve adımlı soru çözümleri (<ol><li>...</li></ol>) ile okunabilirliği artır.
- Sonuç kısmında sıkça sorulan 2-3 soru ve yanıtı (mini SSS) ekle.

ÇIKTI FORMATI:
Sadece ve sadece aşağıdaki geçerli JSON nesnesini döndür:
{
  "seoTitle": "En fazla 60 karakterlik, tıklama oranı yüksek SEO başlığı",
  "slug": "turkce-karaktersiz-tire-ile-ayrilmis-temiz-url-slug",
  "metaDescription": "130-155 karakterlik, dikkat çekici, Google snippet uyumlu meta açıklama",
  "tags": ["etiket1", "etiket2", "etiket3", "etiket4", "etiket5"],
  "category": "${matchedCategory ? matchedCategory.name : 'Örn: 10. Sınıf'}",
  "categorySlug": "${matchedCategory ? matchedCategory.slug : '10-sinif'}",
  "content": "<p>Giriş paragrafı...</p><h2>...</h2>..."
}`;

  const generated = await callGeminiApi(prompt, true);

  const title = generated.seoTitle || topic;
  const slug = (generated.slug || topic.toLowerCase().replace(/[^a-z0-9]/g, '-')).replace(/--+/g, '-').replace(/^-|-$/g, '');
  const excerpt = generated.metaDescription || `${title} hakkında detaylı konu anlatımı ve çözümler.`;
  const content = generated.content || `<p>${topic}</p>`;
  const category = matchedCategory?.name || generated.category || 'Matematik Blog';
  const finalCategorySlug = matchedCategory?.slug || generated.categorySlug || 'matematik-blog';
  const tags = Array.isArray(generated.tags) ? generated.tags : ['matematik', 'eğitim', 'meb'];

  // Automatically generate custom Cover Image with Title
  let coverImageUrl = '';
  try {
    coverImageUrl = await generateCoverImage({
      title,
      category,
      slug,
    });
  } catch (imgErr) {
    console.error('Kapak görseli oluşturma hatası:', imgErr);
    coverImageUrl = '/uploads/test-cover.png';
  }

  // Calculate SEO score
  const seoAudit = calculateSeoScore({
    title,
    slug,
    excerpt,
    content,
    category,
    tags,
  });

  // Save to database as DRAFT (is_published = 0)
  const savedPost = createPost({
    title,
    slug,
    excerpt,
    content,
    featured_image: coverImageUrl,
    category,
    category_slug: finalCategorySlug,
    tags,
    author: 'Matemetrik AI Stüdyo',
    is_published: 0, // Saved as DRAFT so user can review and publish!
  });

  return {
    post: savedPost,
    seoScore: seoAudit.score,
    wordCount: seoAudit.words,
    internalLinksCount: seoAudit.internalLinks,
    externalLinksCount: seoAudit.externalLinks,
    coverImage: coverImageUrl,
    feedback: seoAudit.feedback,
  };
}
