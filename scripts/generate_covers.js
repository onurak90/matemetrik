const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const Database = require('better-sqlite3');

const uploadsDir = path.join(process.cwd(), 'public/uploads');
const publicDir = path.join(process.cwd(), 'public');

// 1. Generate og-image.png (1200x630)
async function generateOgImage() {
  const svg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f172a" />
        <stop offset="50%" stop-color="#1e1b4b" />
        <stop offset="100%" stop-color="#020617" />
      </linearGradient>
      <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#6366f1" />
        <stop offset="50%" stop-color="#a855f7" />
        <stop offset="100%" stop-color="#ec4899" />
      </linearGradient>
      <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38bdf8" />
        <stop offset="100%" stop-color="#818cf8" />
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1" />
      </pattern>
    </defs>

    <!-- Background -->
    <rect width="1200" height="630" fill="url(#bg)" />
    <rect width="1200" height="630" fill="url(#grid)" />

    <!-- Ambient Glow Orbs -->
    <circle cx="1000" cy="150" r="320" fill="#4f46e5" opacity="0.25" filter="blur(80px)" />
    <circle cx="200" cy="500" r="280" fill="#9333ea" opacity="0.2" filter="blur(80px)" />

    <!-- Border Glow Card -->
    <rect x="50" y="50" width="1100" height="530" rx="32" fill="rgba(15, 23, 42, 0.6)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="2" />

    <!-- Brand Header -->
    <g transform="translate(100, 110)">
      <!-- Logo Mark -->
      <rect x="0" y="0" width="56" height="56" rx="16" fill="url(#glow)" />
      <text x="28" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">π</text>
      
      <!-- Brand Name -->
      <text x="76" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="900" fill="#ffffff" letter-spacing="1">MATEMETRİK</text>
      <text x="325" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" fill="#818cf8" letter-spacing="2">.COM</text>
    </g>

    <!-- Pill Badge -->
    <g transform="translate(100, 205)">
      <rect x="0" y="0" width="360" height="40" rx="20" fill="rgba(99, 102, 241, 0.2)" stroke="rgba(129, 140, 248, 0.4)" stroke-width="1.5" />
      <text x="180" y="25" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" fill="#c7d2fe" text-anchor="middle" letter-spacing="1">
        2026 - 2027 MEB MÜFREDATI &amp; ÖSYM
      </text>
    </g>

    <!-- Main Title -->
    <g transform="translate(100, 290)">
      <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="900" fill="#ffffff" letter-spacing="-0.5">
        MEB Ders Kitabı Çözümleri
      </text>
      <text x="0" y="60" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="800" fill="url(#accent)">
        &amp; Sınav Hazırlık Robotu
      </text>
    </g>

    <!-- Subtitle -->
    <text x="100" y="415" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="500" fill="#94a3b8">
      1-12. Sınıf Tüm Dersler • LGS &amp; YKS Puan Hesaplama • YDS Hazırlık • Öğretmen Araçları
    </text>

    <!-- Category Tags Row -->
    <g transform="translate(100, 475)">
      <!-- Tag 1 -->
      <rect x="0" y="0" width="170" height="44" rx="14" fill="rgba(255, 255, 255, 0.07)" stroke="rgba(255, 255, 255, 0.15)" />
      <text x="85" y="27" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="700" fill="#e2e8f0" text-anchor="middle">📚 Ders Kitapları</text>
      
      <!-- Tag 2 -->
      <rect x="185" y="0" width="160" height="44" rx="14" fill="rgba(255, 255, 255, 0.07)" stroke="rgba(255, 255, 255, 0.15)" />
      <text x="265" y="27" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="700" fill="#e2e8f0" text-anchor="middle">🎯 LGS &amp; YKS Robotu</text>

      <!-- Tag 3 -->
      <rect x="360" y="0" width="150" height="44" rx="14" fill="rgba(255, 255, 255, 0.07)" stroke="rgba(255, 255, 255, 0.15)" />
      <text x="435" y="27" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="700" fill="#e2e8f0" text-anchor="middle">⚡ YDS Çalışma</text>

      <!-- Tag 4 -->
      <rect x="525" y="0" width="175" height="44" rx="14" fill="rgba(255, 255, 255, 0.07)" stroke="rgba(255, 255, 255, 0.15)" />
      <text x="612" y="27" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="700" fill="#e2e8f0" text-anchor="middle">📝 Sınav Hazırlama</text>
    </g>
  </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('Generated public/og-image.png');
}

// 2. Generate Book Covers (1200x675 WebP)
const colorSchemes = {
  matematik: {
    bg1: '#0f172a',
    bg2: '#1e1b4b',
    accent1: '#38bdf8',
    accent2: '#818cf8',
    glow: '#4f46e5',
    icon: '📐',
    badge: 'MATEMATİK DERS KİTABI'
  },
  fen: {
    bg1: '#062820',
    bg2: '#064e3b',
    accent1: '#34d399',
    accent2: '#10b981',
    glow: '#059669',
    icon: '🔬',
    badge: 'FEN BİLİMLERİ DERS KİTABI'
  },
  fizik: {
    bg1: '#082f49',
    bg2: '#0369a1',
    accent1: '#38bdf8',
    accent2: '#0284c7',
    glow: '#0ea5e9',
    icon: '⚡',
    badge: 'FİZİK DERS KİTABI'
  },
  kimya: {
    bg1: '#2e1065',
    bg2: '#581c87',
    accent1: '#c084fc',
    accent2: '#a855f7',
    glow: '#7c3aed',
    icon: '⚗️',
    badge: 'KİMYA DERS KİTABI'
  },
  biyoloji: {
    bg1: '#14332b',
    bg2: '#115e59',
    accent1: '#2dd4bf',
    accent2: '#14b8a6',
    glow: '#0d9488',
    icon: '🧬',
    badge: 'BİYOLOJİ DERS KİTABI'
  },
  turkce: {
    bg1: '#4a044e',
    bg2: '#701a75',
    accent1: '#f472b6',
    accent2: '#ec4899',
    glow: '#db2777',
    icon: '📖',
    badge: 'TÜRKÇE DERS KİTABI'
  },
  edebiyat: {
    bg1: '#4a044e',
    bg2: '#831843',
    accent1: '#fb7185',
    accent2: '#e11d48',
    glow: '#be123c',
    icon: '📚',
    badge: 'TÜRK DİLİ VE EDEBİYATI'
  },
  sosyal: {
    bg1: '#451a03',
    bg2: '#78350f',
    accent1: '#fbbf24',
    accent2: '#f59e0b',
    glow: '#d97706',
    icon: '🌍',
    badge: 'SOSYAL BİLGİLER DERS KİTABI'
  },
  inkilap: {
    bg1: '#450a0a',
    bg2: '#7f1d1d',
    accent1: '#f87171',
    accent2: '#ef4444',
    glow: '#dc2626',
    icon: '🇹🇷',
    badge: 'T.C. İNKILAP TARİHİ'
  },
  ingilizce: {
    bg1: '#082f49',
    bg2: '#0f766e',
    accent1: '#2dd4bf',
    accent2: '#38bdf8',
    glow: '#0284c7',
    icon: '🇬🇧',
    badge: 'İNGİLİZCE DERS KİTABI'
  }
};

function getSchemeForTitle(title) {
  const t = title.toLowerCase();
  if (t.includes('matematik')) return colorSchemes.matematik;
  if (t.includes('fen bilimleri')) return colorSchemes.fen;
  if (t.includes('fizik')) return colorSchemes.fizik;
  if (t.includes('kimya')) return colorSchemes.kimya;
  if (t.includes('biyoloji')) return colorSchemes.biyoloji;
  if (t.includes('türk dili') || t.includes('edebiyat')) return colorSchemes.edebiyat;
  if (t.includes('türkçe')) return colorSchemes.turkce;
  if (t.includes('sosyal')) return colorSchemes.sosyal;
  if (t.includes('inkılap') || t.includes('inkilap')) return colorSchemes.inkilap;
  if (t.includes('ingilizce')) return colorSchemes.ingilizce;
  return colorSchemes.matematik;
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

async function generateCoverForPost(post) {
  const scheme = getSchemeForTitle(post.title);
  
  // Extract grade and subject from title
  let displayTitle = post.title
    .replace(/^2026-2027\s*MEB\s*/i, '')
    .replace(/\s*Ders Kitabı Cevapları\s*/i, '')
    .trim();

  // e.g. "8. Sınıf Matematik" or "Matematik (12. Sınıf YKS)"
  let cleanGrade = post.category || '';
  let cleanSubject = displayTitle;

  const svg = `
  <svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg_${post.id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${scheme.bg1}" />
        <stop offset="60%" stop-color="${scheme.bg2}" />
        <stop offset="100%" stop-color="#020617" />
      </linearGradient>
      <linearGradient id="textGrad_${post.id}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="100%" stop-color="${scheme.accent1}" />
      </linearGradient>
      <pattern id="pat_${post.id}" width="50" height="50" patternUnits="userSpaceOnUse">
        <circle cx="25" cy="25" r="1.5" fill="rgba(255,255,255,0.06)" />
      </pattern>
    </defs>

    <!-- Background -->
    <rect width="1200" height="675" fill="url(#bg_${post.id})" />
    <rect width="1200" height="675" fill="url(#pat_${post.id})" />

    <!-- Glow Orbs -->
    <circle cx="950" cy="200" r="300" fill="${scheme.glow}" opacity="0.3" filter="blur(70px)" />
    <circle cx="150" cy="550" r="250" fill="${scheme.glow}" opacity="0.2" filter="blur(60px)" />

    <!-- Inner Border Card -->
    <rect x="40" y="40" width="1120" height="595" rx="28" fill="rgba(0, 0, 0, 0.35)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="2" />

    <!-- Top Badge Row -->
    <g transform="translate(80, 95)">
      <!-- Year Badge -->
      <rect x="0" y="0" width="200" height="38" rx="12" fill="rgba(255, 255, 255, 0.12)" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1.5" />
      <text x="100" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="1.5">
        2026 - 2027 GÜNCEL
      </text>

      <!-- Category Pill -->
      <rect x="215" y="0" width="230" height="38" rx="12" fill="${scheme.accent1}" opacity="0.2" stroke="${scheme.accent1}" stroke-width="1.5" />
      <text x="330" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" fill="${scheme.accent1}" text-anchor="middle" letter-spacing="1">
        ${escapeXml(scheme.badge)}
      </text>
    </g>

    <!-- Subject Icon Watermark -->
    <text x="1040" y="380" font-size="180" opacity="0.2" text-anchor="middle">${scheme.icon}</text>

    <!-- Main Headings -->
    <g transform="translate(80, 230)">
      <!-- Grade Tag -->
      <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" fill="${scheme.accent1}" letter-spacing="3">
        ${escapeXml(cleanGrade.toUpperCase())}
      </text>

      <!-- Big Subject Title -->
      <text x="0" y="65" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="900" fill="#ffffff" letter-spacing="-0.5">
        ${escapeXml(displayTitle)}
      </text>

      <!-- Subtitle -->
      <text x="0" y="125" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="36" font-weight="800" fill="url(#textGrad_${post.id})">
        Ders Kitabı Cevapları
      </text>

      <!-- Feature Bullet Points -->
      <g transform="translate(0, 185)">
        <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="600" fill="#cbd5e1">
          ✓ Sayfa Sayfa Adım Adım Çözümler   •   ✓ MEB Kazanımlarına %100 Uyumlu   •   ✓ Öğretmen Onaylı
        </text>
      </g>
    </g>

    <!-- Footer Bar -->
    <g transform="translate(80, 560)">
      <line x1="0" y1="0" x2="1040" y2="0" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
      
      <!-- Brand on Bottom Left -->
      <g transform="translate(0, 28)">
        <rect x="0" y="-18" width="28" height="28" rx="8" fill="${scheme.accent1}" />
        <text x="14" y="2" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="16" font-weight="900" fill="#0f172a" text-anchor="middle">π</text>
        <text x="38" y="2" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="18" font-weight="800" fill="#ffffff" letter-spacing="0.5">matemetrik<tspan fill="${scheme.accent1}">.com</tspan></text>
      </g>

      <!-- Tagline on Bottom Right -->
      <text x="1040" y="30" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="600" fill="#94a3b8" text-anchor="end">
        Türkiye'nin En Kapsamlı Eğitim &amp; Soru Çözüm Portalı
      </text>
    </g>
  </svg>
  `;

  const fileName = `cover-book-${post.slug}.webp`;
  const filePath = path.join(uploadsDir, fileName);

  await sharp(Buffer.from(svg))
    .webp({ quality: 88 })
    .toFile(filePath);

  return `/uploads/${fileName}`;
}

async function main() {
  await generateOgImage();

  const db = new Database(path.join(process.cwd(), 'data/matemetrik.db'));
  const posts = db.prepare("SELECT id, title, slug, category, category_slug FROM posts WHERE featured_image = '/og-image.png'").all();

  console.log(`Generating cover images for ${posts.length} posts...`);
  const updateStmt = db.prepare("UPDATE posts SET featured_image = ? WHERE id = ?");

  for (const post of posts) {
    const imgPath = await generateCoverForPost(post);
    updateStmt.run(imgPath, post.id);
    console.log(`Post ID ${post.id}: "${post.title.substring(0, 45)}" -> ${imgPath}`);
  }

  console.log('All cover images generated and database updated successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
