const Database = require('better-sqlite3');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const db = new Database(path.join(__dirname, '../data/matemetrik.db'));

const uploadsDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

function escapeXml(unsafe) {
  return (unsafe || '').replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function wrapText(text, maxCharsPerLine = 32, maxLines = 3) {
  const words = text.split(/\s+/);
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (candidate.length <= maxCharsPerLine) {
      currentLine = candidate;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
    if (lines.length >= maxLines) break;
  }

  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }

  if (lines.length === maxLines && words.length > lines.join(' ').split(/\s+/).length) {
    lines[maxLines - 1] = lines[maxLines - 1].slice(0, maxCharsPerLine - 3) + '...';
  }

  return lines;
}

async function createCoverImage(title, category, slug) {
  const cleanSlug = slug.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
  const filename = `cover-${cleanSlug}.webp`;
  const filePath = path.join(uploadsDir, filename);

  const lines = wrapText(title, 32, 3);
  const tspans = lines
    .map((line, idx) => `<tspan x="100" dy="${idx === 0 ? '0' : '1.28em'}">${escapeXml(line)}</tspan>`)
    .join('');

  const displayCategory = category.toUpperCase();
  const badgeWidth = Math.max(140, displayCategory.length * 10.5 + 40);

  const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090d16" />
      <stop offset="45%" stop-color="#111827" />
      <stop offset="100%" stop-color="#1e1b4b" />
    </linearGradient>

    <radialGradient id="radialIndigo" cx="85%" cy="20%" r="55%">
      <stop offset="0%" stop-color="#4f46e5" stop-opacity="0.32" />
      <stop offset="100%" stop-color="#4f46e5" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="radialCyan" cx="15%" cy="85%" r="45%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.22" />
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0" />
    </radialGradient>

    <linearGradient id="bottomAccent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4f46e5" />
      <stop offset="40%" stop-color="#818cf8" />
      <stop offset="70%" stop-color="#ec4899" />
      <stop offset="100%" stop-color="#f59e0b" />
    </linearGradient>

    <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366f1" />
      <stop offset="100%" stop-color="#4338ca" />
    </linearGradient>

    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.5" />
    </filter>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)" />
  <rect width="1200" height="630" fill="url(#radialIndigo)" />
  <rect width="1200" height="630" fill="url(#radialCyan)" />

  <g opacity="0.04" stroke="#ffffff" stroke-width="1">
    <line x1="100" y1="0" x2="100" y2="630" />
    <line x1="300" y1="0" x2="300" y2="630" />
    <line x1="500" y1="0" x2="500" y2="630" />
    <line x1="700" y1="0" x2="700" y2="630" />
    <line x1="900" y1="0" x2="900" y2="630" />
    <line x1="1100" y1="0" x2="1100" y2="630" />
    <line x1="0" y1="150" x2="1200" y2="150" />
    <line x1="0" y1="315" x2="1200" y2="315" />
    <line x1="0" y1="480" x2="1200" y2="480" />
  </g>

  <g font-family="system-ui, -apple-system, sans-serif" font-weight="900" fill="#ffffff" opacity="0.05">
    <text x="860" y="240" font-size="180">π</text>
    <text x="960" y="440" font-size="140">∑</text>
    <text x="740" y="550" font-size="130">√x</text>
    <text x="1060" y="160" font-size="100">∞</text>
  </g>

  <g transform="translate(100, 105)" filter="url(#shadow)">
    <rect width="${badgeWidth}" height="38" rx="19" fill="url(#badgeGrad)" stroke="#818cf8" stroke-width="1.5" />
    <text x="20" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="bold" fill="#ffffff" letter-spacing="1">
      ${escapeXml(displayCategory)}
    </text>
  </g>

  <text x="100" y="235" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="900" fill="#ffffff" letter-spacing="-0.8" filter="url(#shadow)">
    ${tspans}
  </text>

  <g transform="translate(100, 510)">
    <rect width="44" height="44" rx="12" fill="#4f46e5" filter="url(#shadow)" />
    <text x="14" y="31" font-family="serif" font-size="26" font-weight="bold" fill="#ffffff">π</text>
    <text x="56" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="bold" fill="#ffffff">matemetrik<tspan fill="#818cf8">.com</tspan></text>
    <text x="56" y="42" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="bold" fill="#94a3b8" letter-spacing="1.2">ÖĞRETMEN ARAÇLARI &amp; EĞİTİM PORTALI</text>
  </g>

  <g transform="translate(900, 522)">
    <rect width="200" height="32" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1" opacity="0.9" />
    <text x="16" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="bold" fill="#38bdf8">✓ 2026-2027 MEB UYUMLU</text>
  </g>

  <rect x="0" y="622" width="1200" height="8" fill="url(#bottomAccent)" />
</svg>
`;

  await sharp(Buffer.from(svg)).webp({ quality: 85, effort: 6 }).toFile(filePath);
  return `/uploads/${filename}`;
}

// 20 Clubs
const clubPosts = [
  {
    name: 'Kızılay Kulübü',
    slug: '2026-2027-kizilay-kulubu-evraklari-toplanti-tutanagi-ve-yillik-plani',
    title: '2026-2027 Kızılay Kulübü Evrakları, Toplantı Tutanakları ve Yıllık Çalışma Planı (Word & PDF)',
    desc: 'MEB Sosyal Etkinlikler Yönetmeliğine tam uyumlu 2026-2027 Kızılay Kulübü iç tüzüğü, 1. ve 2. dönem genel kurul toplantı tutanağı, yıllık çalışma programı ve faaliyet raporu.',
  },
  {
    name: 'Afete Hazırlık Kulübü',
    slug: '2026-2027-afete-hazirlik-kulubu-toplanti-tutanaklari-ve-yillik-plani',
    title: '2026-2027 Afete Hazırlık Kulübü Toplantı Tutanakları ve Yıllık Çalışma Planı',
    desc: 'Okul afet ve acil durum tatbikatları, deprem bilinci, ilk yardım panosu ve MEB uyumlu Afete Hazırlık Kulübü tüm resmi toplantı evrakları.',
  },
  {
    name: 'Çevre Koruma Kulübü',
    slug: '2026-2027-cevre-koruma-kulubu-evraklari-ve-yillik-plani',
    title: '2026-2027 Çevre Koruma Kulübü Evrakları, Tüzük ve Toplantı Tutanakları',
    desc: 'Sıfır atık, çevre bilinci, fidan dikimi ve doğa koruma temalı 2026-2027 MEB Çevre Koruma Kulübü dosyasının tüm resmi evrakları.',
  },
  {
    name: 'Hayvanları Sevme ve Koruma Kulübü',
    slug: '2026-2027-hayvanlari-sevme-ve-koruma-kulubu-evraklari-ve-plani',
    title: '2026-2027 Hayvanları Sevme ve Koruma Kulübü Evrakları ve Yıllık Planı',
    desc: 'Sokak hayvanları besleme etkinlikleri, barınak ziyaretleri ve hayvan hakları haftası panoları için eksiksiz kulüp evrak seti.',
  },
  {
    name: 'Bilişim ve İnternet Kulübü',
    slug: '2026-2027-bilisim-ve-internet-kulubu-toplanti-tutanaklari-ve-plani',
    title: '2026-2027 Bilişim ve İnternet Kulübü Toplantı Tutanakları ve Yıllık Çalışma Planı',
    desc: 'Güvenli internet kullanımı, siber zorbalıkla mücadele, kodlama ve yapay zeka atölyeleri için Bilişim Kulübü resmi evrakları.',
  },
  {
    name: 'Zeka Oyunları Kulübü',
    slug: '2026-2027-zeka-oyunlari-kulubu-evraklari-ve-toplanti-tutanaklari',
    title: '2026-2027 Zeka Oyunları Kulübü Evrakları, Tüzük ve Toplantı Tutanakları',
    desc: 'Akıl ve zeka oyunları turnuvaları, mangala, satranç, sudoku etkinlikleri ve 2026-2027 Zeka Oyunları Kulübü resmi toplantı tutanakları.',
  },
  {
    name: 'Görsel Sanatlar Kulübü',
    slug: '2026-2027-gorsel-sanatlar-kulubu-evraklari-ve-yillik-plani',
    title: '2026-2027 Görsel Sanatlar Kulübü Evrakları, Sergi Planı ve Toplantı Tutanakları',
    desc: 'Okul resim sergileri, atölye çalışmaları ve sanatsal yarışmalar için Görsel Sanatlar Kulübü resmi evrakları.',
  },
  {
    name: 'Halk Oyunları Kulübü',
    slug: '2026-2027-halk-oyunlari-kulubu-evraklari-ve-toplanti-tutanaklari',
    title: '2026-2027 Halk Oyunları Kulübü Evrakları ve Toplantı Tutanakları',
    desc: 'Yöresel halk dansları gösterileri, milli bayram koreografileri ve MEB Halk Oyunları Kulübü resmi çalışma programı.',
  },
  {
    name: 'Gezi Tanıtma ve Turizm Kulübü',
    slug: '2026-2027-gezi-tanitma-ve-turizm-kulubu-evraklari-ve-gezi-plani',
    title: '2026-2027 Gezi Tanıtma ve Turizm Kulübü Evrakları ve Yıllık Gezi Planı',
    desc: 'Tarihi ve kültürel okul gezileri, veli izin dilekçeleri, gezi planları ve toplantı tutanakları.',
  },
  {
    name: 'Geri Dönüşüm ve Sıfır Atık Kulübü',
    slug: '2026-2027-geri-donusum-ve-sifir-atik-kulubu-evraklari',
    title: '2026-2027 Geri Dönüşüm ve Sıfır Atık Kulübü Evrakları ve Yıllık Planı',
    desc: 'Mavi kapak, atık pil, kağıt ve plastik geri dönüşüm projeleri için Sıfır Atık Kulübü MEB onaylı evrak dosyası.',
  },
  {
    name: 'eTwinning Kulübü',
    slug: '2026-2027-etwinning-kulubu-toplanti-tutanaklari-ve-yillik-plani',
    title: '2026-2027 eTwinning Kulübü Toplantı Tutanakları ve Yıllık Çalışma Planı',
    desc: 'Uluslararası okul ortaklıkları, eTwinning projeleri ve dijital iş birliği faaliyetleri için resmi kulüp evrakları.',
  },
  {
    name: 'Drama Kulübü',
    slug: '2026-2027-drama-kulubu-evraklari-ve-tiyatro-calisma-plani',
    title: '2026-2027 Drama Kulübü Evrakları, Tiyatro Çalışma Planı ve Toplantı Tutanakları',
    desc: 'Yıl sonu tiyatro gösterisi, skeçler ve yaratıcı drama etkinlikleri için MEB onaylı Drama Kulübü evrakları.',
  },
  {
    name: 'Çocuk Hakları Kulübü',
    slug: '2026-2027-cocuk-haklari-kulubu-evraklari-ve-toplanti-tutanagi',
    title: '2026-2027 Çocuk Hakları Kulübü Evrakları ve Toplantı Tutanağı',
    desc: 'Dünya Çocuk Hakları Günü etkinlikleri, akran dayanışması ve çocuk hakları sözleşmesi bilgilendirme dosyası.',
  },
  {
    name: 'Demokrasi İnsan Hakları ve Yurttaşlık Kulübü',
    slug: '2026-2027-demokrasi-insan-haklari-kulubu-evraklari-ve-plani',
    title: '2026-2027 Demokrasi, İnsan Hakları ve Yurttaşlık Kulübü Evrakları ve Yıllık Planı',
    desc: 'Öğrenci meclisi seçimleri, insan hakları haftası panosu ve demokratik katılım etkinlikleri resmi evrakları.',
  },
  {
    name: 'Değerler Kulübü',
    slug: '2026-2027-degerler-kulubu-evraklari-ve-yillik-calisma-plani',
    title: '2026-2027 Değerler Kulübü Evrakları ve Yıllık Çalışma Planı (ÇEDES Uyumlu)',
    desc: 'Sevgi, saygı, dürüstlük, vatanseverlik ve yardımseverlik temalı ÇEDES ve MEB Değerler Kulübü resmi evrak seti.',
  },
  {
    name: 'Bilinçli Tüketici Kulübü',
    slug: '2026-2027-bilincli-tuketici-kulubu-evraklari-ve-toplanti-tutanaklari',
    title: '2026-2027 Bilinçli Tüketici Kulübü Evrakları ve Toplantı Tutanakları',
    desc: 'Tutum, yatırım ve yerli malı haftası, bütçe yönetimi ve tüketici hakları bilgilendirme kulüp dosyası.',
  },
  {
    name: 'Bilim-Fen ve Teknoloji Kulübü',
    slug: '2026-2027-bilim-fen-ve-teknoloji-kulubu-evraklari-ve-plani',
    title: '2026-2027 Bilim-Fen ve Teknoloji Kulübü Evrakları ve Yıllık Çalışma Planı',
    desc: 'TÜBİTAK 4006 bilim fuarı, TEKNOFEST hazırlıkları ve fen deneyleri için Bilim ve Teknoloji Kulübü dosyası.',
  },
  {
    name: 'Kütüphanecilik Kulübü',
    slug: '2026-2027-kutuphanecilik-kulubu-evraklari-ve-yillik-plani',
    title: '2026-2027 Kütüphanecilik Kulübü Evrakları, Kitap Okuma Planı ve Tutanakları',
    desc: 'Kütüphaneler haftası, kitap okuma halkaları ve okul kütüphanesi nöbet çizelgeleri için resmi evraklar.',
  },
  {
    name: 'Model Birleşmiş Milletler (MUN) Kulübü',
    slug: '2026-2027-mun-model-birlesmis-milletler-kulubu-evraklari-ve-plani',
    title: '2026-2027 Model Birleşmiş Milletler (MUN) Kulübü Evrakları ve Yıllık Planı',
    desc: 'İngilizce ve Türkçe münazara oturumları, diplomasi simülasyonları ve MUN konferans hazırlığı resmi kulüp evrakları.',
  },
  {
    name: 'Kişisel Verileri Koruma Kulübü',
    slug: '2026-2027-kisisel-verileri-koruma-kulubu-evraklari-ve-tutanaklari',
    title: '2026-2027 Kişisel Verileri Koruma Kulübü Evrakları ve Toplantı Tutanakları',
    desc: 'KVKK farkındalığı, dijital gizlilik ve sosyal medya güvenliği temalı kulüp toplantı tutanakları ve çalışma planı.',
  },
];

// Core Annual Plans
const annualPlanPosts = [
  {
    grade: 1,
    subject: 'Matematik',
    slug: '2026-2027-1-sinif-matematik-maarif-modeli-yillik-plani',
    title: '2026-2027 1. Sınıf Matematik Maarif Modeli Taslak Çerçeve Yıllık Planı (Excel & PDF)',
    desc: 'MEB Türkiye Yüzyılı Maarif Modeli yeni 1. sınıf matematik öğretim programına uygun yıllık çerçeve planı.',
  },
  {
    grade: 2,
    subject: 'Matematik',
    slug: '2026-2027-2-sinif-matematik-maarif-modeli-yillik-plani',
    title: '2026-2027 2. Sınıf Matematik Maarif Modeli Taslak Çerçeve Yıllık Planı (Excel & PDF)',
    desc: '2. sınıf matematik dersi 2026-2027 eğitim öğretim yılı haftalık kazanım ve süreç bileşenleri yıllık planı.',
  },
  {
    grade: 3,
    subject: 'Matematik',
    slug: '2026-2027-3-sinif-matematik-yillik-plani',
    title: '2026-2027 3. Sınıf Matematik Yıllık Çerçeve Planı (Excel & PDF İndir)',
    desc: '3. sınıf matematik dersi yeni müfredat öğrenme çıktıları ve okul temelli planlama haftalarını içeren yıllık plan.',
  },
  {
    grade: 4,
    subject: 'Matematik',
    slug: '2026-2027-4-sinif-matematik-yillik-plani',
    title: '2026-2027 4. Sınıf Matematik Yıllık Çerçeve Planı (Excel & PDF İndir)',
    desc: '4. sınıf matematik dersi için MEB formatında hazırlanmış, resmi onay ve antetli yıllık çalışma planı.',
  },
  {
    grade: 5,
    subject: 'Matematik',
    slug: '2026-2027-5-sinif-matematik-maarif-modeli-yillik-plani',
    title: '2026-2027 5. Sınıf Matematik Maarif Modeli Yıllık Çerçeve Planı (Excel & PDF İndir)',
    desc: 'Türkiye Yüzyılı Maarif Modeli 5. sınıf matematik öğretim programı temaları, süreç bileşenleri ve ölçme kanıtları.',
  },
  {
    grade: 6,
    subject: 'Matematik',
    slug: '2026-2027-6-sinif-matematik-yillik-plani',
    title: '2026-2027 6. Sınıf Matematik Yıllık Çerçeve Planı (Excel & PDF İndir)',
    desc: '6. sınıf matematik dersi haftalık ders planı, üniteler, kazanımlar ve belirli günler ve haftalar tablosu.',
  },
  {
    grade: 7,
    subject: 'Matematik',
    slug: '2026-2027-7-sinif-matematik-yillik-plani',
    title: '2026-2027 7. Sınıf Matematik Yıllık Çerçeve Planı (Excel & PDF İndir)',
    desc: '7. sınıf matematik dersi için rasyonel sayılar, cebirsel ifadeler ve geometri konularını kapsayan yıllık plan.',
  },
  {
    grade: 8,
    subject: 'Matematik',
    slug: '2026-2027-8-sinif-matematik-lgs-yillik-plani',
    title: '2026-2027 8. Sınıf Matematik LGS Uyumlu Yıllık Çerçeve Planı (Excel & PDF)',
    desc: '8. sınıf LGS hazırlık odaklı, çarpanlar ve katlar, üslü ifadeler ve veri analizi temalı resmi MEB yıllık planı.',
  },
  {
    grade: 5,
    subject: 'Türkçe',
    slug: '2026-2027-5-sinif-turkce-maarif-modeli-yillik-plani',
    title: '2026-2027 5. Sınıf Türkçe Maarif Modeli Taslak Çerçeve Yıllık Planı (Excel & PDF)',
    desc: '5. sınıf Türkçe dersi okuma, yazma, dinleme/izleme ve konuşma becerilerini kapsayan yeni maarif modeli yıllık planı.',
  },
  {
    grade: 6,
    subject: 'Türkçe',
    slug: '2026-2027-6-sinif-turkce-yillik-plani',
    title: '2026-2027 6. Sınıf Türkçe Yıllık Çerçeve Planı (Excel & PDF İndir)',
    desc: '6. sınıf Türkçe dersi temaları, metin türleri ve dil bilgisi kazanımları resmi MEB formatında yıllık plan.',
  },
  {
    grade: 7,
    subject: 'Türkçe',
    slug: '2026-2027-7-sinif-turkce-yillik-plani',
    title: '2026-2027 7. Sınıf Türkçe Yıllık Çerçeve Planı (Excel & PDF İndir)',
    desc: '7. sınıf Türkçe dersi için fiiller, anlam bilgisi ve yazılı anlatım çalışmaları yıllık çalışma programı.',
  },
  {
    grade: 8,
    subject: 'Türkçe',
    slug: '2026-2027-8-sinif-turkce-lgs-yillik-plani',
    title: '2026-2027 8. Sınıf LGS Türkçe Yıllık Çerçeve Planı (Excel & PDF İndir)',
    desc: '8. sınıf LGS sınav formatına uygun paragrafta anlam, fiilimsiler ve sözel mantık yıllık ders planı.',
  },
  {
    grade: 5,
    subject: 'Fen Bilimleri',
    slug: '2026-2027-5-sinif-fen-bilimleri-maarif-modeli-yillik-plani',
    title: '2026-2027 5. Sınıf Fen Bilimleri Maarif Modeli Yıllık Çerçeve Planı (Excel & PDF)',
    desc: '5. sınıf Fen Bilimleri laboratuvar güvenliği, bilimsel sorgulama ve güneş sistemi ünitelerini kapsayan yıllık plan.',
  },
  {
    grade: 6,
    subject: 'Fen Bilimleri',
    slug: '2026-2027-6-sinif-fen-bilimleri-yillik-plani',
    title: '2026-2027 6. Sınıf Fen Bilimleri Yıllık Çerçeve Planı (Excel & PDF İndir)',
    desc: '6. sınıf Fen Bilimleri dersi vücudumuzdaki sistemler, kuvvet ve hareket temalı MEB yıllık çalışma planı.',
  },
  {
    grade: 7,
    subject: 'Fen Bilimleri',
    slug: '2026-2027-7-sinif-fen-bilimleri-yillik-plani',
    title: '2026-2027 7. Sınıf Fen Bilimleri Yıllık Çerçeve Planı (Excel & PDF İndir)',
    desc: '7. sınıf Fen Bilimleri uzay araştırmaları, hücre ve bölünmeler, kuvvet ve enerji konuları yıllık planı.',
  },
  {
    grade: 8,
    subject: 'Fen Bilimleri',
    slug: '2026-2027-8-sinif-fen-bilimleri-lgs-yillik-plani',
    title: '2026-2027 8. Sınıf LGS Fen Bilimleri Yıllık Çerçeve Planı (Excel & PDF)',
    desc: '8. sınıf LGS mevsimler ve iklim, DNA ve genetik kod, basınç ve asit-baz üniteleri yıllık ders planı.',
  },
  {
    grade: 5,
    subject: 'Sosyal Bilgiler',
    slug: '2026-2027-5-sinif-sosyal-bilgiler-maarif-modeli-yillik-plani',
    title: '2026-2027 5. Sınıf Sosyal Bilgiler Maarif Modeli Yıllık Çerçeve Planı (Excel & PDF)',
    desc: '5. sınıf Sosyal Bilgiler birey ve toplum, kültür ve miras, üretim ve tüketim temalı yeni maarif modeli yıllık planı.',
  },
  {
    grade: 6,
    subject: 'Sosyal Bilgiler',
    slug: '2026-2027-6-sinif-sosyal-bilgiler-yillik-plani',
    title: '2026-2027 6. Sınıf Sosyal Bilgiler Yıllık Çerçeve Planı (Excel & PDF İndir)',
    desc: '6. sınıf Sosyal Bilgiler tarihi ve coğrafi kazanımları içeren, MEB uyumlu yıllık çalışma takvimi.',
  },
  {
    grade: 7,
    subject: 'Sosyal Bilgiler',
    slug: '2026-2027-7-sinif-sosyal-bilgiler-yillik-plani',
    title: '2026-2027 7. Sınıf Sosyal Bilgiler Yıllık Çerçeve Planı (Excel & PDF İndir)',
    desc: '7. sınıf Sosyal Bilgiler Osmanlı tarihi, nüfus ve yerleşme, küresel bağlantılar temalı yıllık plan.',
  },
  {
    grade: 8,
    subject: 'T.C. İnkılap Tarihi ve Atatürkçülük',
    slug: '2026-2027-8-sinif-inkilap-tarihi-lgs-yillik-plani',
    title: '2026-2027 8. Sınıf T.C. İnkılap Tarihi ve Atatürkçülük LGS Yıllık Planı (Excel & PDF)',
    desc: '8. sınıf LGS Bir Kahraman Doğuyor, Milli Uyanış ve Atatürkçülük ünitelerini kapsayan resmi yıllık plan.',
  },
  {
    grade: 5,
    subject: 'İngilizce',
    slug: '2026-2027-5-sinif-ingilizce-maarif-modeli-yillik-plani',
    title: '2026-2027 5. Sınıf İngilizce Maarif Modeli Taslak Çerçeve Yıllık Planı (Excel & PDF)',
    desc: '5. sınıf İngilizce dersi için 4 temel dil becerisi ve uluslararası iletişim temalarını içeren yıllık çerçeve planı.',
  },
  {
    grade: 6,
    subject: 'İngilizce',
    slug: '2026-2027-6-sinif-ingilizce-yillik-plani',
    title: '2026-2027 6. Sınıf İngilizce Yıllık Çerçeve Planı (Excel & PDF İndir)',
    desc: '6. sınıf İngilizce dersi Life, Yummy Breakfast, Downtown üniteleri resmi MEB yıllık çalışma planı.',
  },
  {
    grade: 7,
    subject: 'İngilizce',
    slug: '2026-2027-7-sinif-ingilizce-yillik-plani',
    title: '2026-2027 7. Sınıf İngilizce Yıllık Çerçeve Planı (Excel & PDF İndir)',
    desc: '7. sınıf İngilizce Appearance and Personality, Biographies, Wild Animals temalı yıllık ders planı.',
  },
  {
    grade: 8,
    subject: 'İngilizce',
    slug: '2026-2027-8-sinif-ingilizce-lgs-yillik-plani',
    title: '2026-2027 8. Sınıf LGS İngilizce Yıllık Çerçeve Planı (Excel & PDF İndir)',
    desc: '8. sınıf LGS Friendship, Teen Life, In The Kitchen ünitelerini kapsayan sınav uyumlu yıllık plan.',
  },
  {
    grade: 5,
    subject: 'Bilişim Teknolojileri ve Yazılım',
    slug: '2026-2027-5-sinif-bilisim-teknolojileri-yillik-plani',
    title: '2026-2027 5. Sınıf Bilişim Teknolojileri ve Yazılım Yıllık Planı (Excel & PDF)',
    desc: '5. sınıf Bilişim dersi algoritma, blok tabanlı kodlama ve dijital vatandaşlık yıllık çerçeve planı.',
  },
  {
    grade: 6,
    subject: 'Bilişim Teknolojileri ve Yazılım',
    slug: '2026-2027-6-sinif-bilisim-teknolojileri-yillik-plani',
    title: '2026-2027 6. Sınıf Bilişim Teknolojileri ve Yazılım Yıllık Planı (Excel & PDF)',
    desc: '6. sınıf Bilişim dersi problem çözme, programlama ve siber güvenlik konularını kapsayan yıllık çalışma planı.',
  },
];

async function main() {
  console.log('Starting batch generation of SEO blog posts with custom cover images...');

  const insertStmt = db.prepare(`
    INSERT INTO posts (
      title, slug, old_slug, excerpt, content, featured_image,
      category, category_slug, tags, author, is_published,
      created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const checkSlugStmt = db.prepare('SELECT id FROM posts WHERE slug = ?');

  let clubCount = 0;
  let annualCount = 0;
  const now = new Date().toISOString();

  // Process Club Posts
  for (const item of clubPosts) {
    const existing = checkSlugStmt.get(item.slug);
    if (existing) {
      console.log(`Skipping already existing slug: ${item.slug}`);
      continue;
    }

    const coverUrl = await createCoverImage(item.title, 'Sosyal Kulüpler', item.slug);

    const contentHtml = `
<p class="lead text-lg text-slate-700 leading-relaxed font-medium">
  <strong>2026-2027 Eğitim Öğretim Yılı</strong> MEB İlköğretim ve Ortaöğretim Kurumları Sosyal Etkinlikler Yönetmeliği esas alınarak hazırlanan <strong>${item.name}</strong> resmi evrakları, toplantı tutanakları, yıllık çalışma planı ve faaliyet raporu dosyası kullanıma sunulmuştur.
</p>

<!-- CTA CARD DIRECT LINK -->
<div class="p-6 my-8 rounded-3xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-200 shadow-sm">
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <span class="inline-block px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider mb-2">
        Online Belge Oluşturucu
      </span>
      <h3 class="text-xl font-black text-slate-900">
        ${item.name} Evraklarını Hemen Oluşturun
      </h3>
      <p class="text-sm text-slate-600 mt-1">
        Okul ve öğretmen adınızı girin; iç tüzük, toplantı tutanağı ve yıllık planınızı tek tıkla <strong>Word (.docx)</strong> veya <strong>resmi PDF</strong> olarak indirin.
      </p>
    </div>
    <a
      href="/kulup-toplanti-tutanaklari"
      class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all shrink-0"
    >
      Kulüp Evraklarını İndir &rarr;
    </a>
  </div>
</div>

<h2>${item.name} Dosyasında Bulunması Zorunlu Evraklar</h2>
<p>
  Eğitim kurumlarında sosyal kulüplerin işleyişi danışman öğretmenlerin rehberliğinde öğrenciler tarafından yürütülür. Yıl başında oluşturulan ve sene sonuna kadar muhafaza edilen kulüp dosyasında şu resmi belgeler yer almalıdır:
</p>
<ul>
  <li><strong>Kulüp İç Tüzüğü:</strong> Kulübün amacı, ilkeleri, çalışma esasları ve kulüp organlarının görev tanımlarını içeren ana sözleşmedir.</li>
  <li><strong>1. Dönem Genel Kurul Toplantı Tutanağı &amp; Kararları:</strong> Sene başı genel kurulunda yapılan yoklama, divan seçimi, kulüp başkanı ve kurulların belirlendiği resmi tutanaktır.</li>
  <li><strong>2026-2027 Yıllık Çalışma Programı:</strong> Eylül ayından Haziran ayına kadar ay ay planlanan pano hazırlıkları, yarışmalar, anma günleri ve toplum hizmeti hedefleridir.</li>
  <li><strong>2. Dönem Toplantı Tutanağı:</strong> İkinci yarıyıl başında gerçekleştirilen ara değerlendirme ve faaliyet revizyon tutanağıdır.</li>
  <li><strong>Kurul ve Görevli Öğrenci Listesi:</strong> Yönetim Kurulu Başkanı, Başkan Yardımcısı, Yazman, Sayman ve Denetim Kurulu üyelerinin sınıf ve numara listesidir.</li>
  <li><strong>Yıl Sonu Faaliyet Raporu:</strong> Eğitim öğretim yılı boyunca gerçekleştirilen çalışmaların değerlendirildiği ve okul müdürlüğüne sunulan rapordur.</li>
  <li><strong>MEB Ek-5 Sosyal Etkinlik Veli İzin Belgesi:</strong> Okul dışı gezi, sosyal sorumluluk ve yarışma faaliyetlerine katılan öğrenciler için veli onay formudur.</li>
</ul>

<h2>Toplantı Tutanakları Düzenlenirken Dikkat Edilecek Hususlar</h2>
<p>
  Toplantı tutanağında toplantı tarihi, başlangıç ve bitiş saati ile toplantı yerinin (örneğin Öğretmenler Odası veya Konferans Salonu) açıkça belirtilmesi gerekir. Alınan kararlar madde madde yazılmalı; kulüp başkanı, danışman öğretmen ve okul müdürünün imza ve onay blokları mevzuata uygun şekilde yerleştirilmelidir.
</p>
<p>
  Resmi mevzuat hakkında detaylı bilgi almak için <a href="https://www.meb.gov.tr" target="_blank" rel="noopener noreferrer" class="text-indigo-600 font-semibold underline">Millî Eğitim Bakanlığı Resmi Web Sitesi</a> ve <a href="https://mevzuat.gov.tr" target="_blank" rel="noopener noreferrer" class="text-indigo-600 font-semibold underline">Mevzuat Bilgi Sistemi</a> sayfalarını inceleyebilirsiniz.
</p>

<h2>e-Okul Sosyal Etkinlik Modülü Veri Girişi</h2>
<p>
  Kulüpte görev alan tüm öğrencilerin ve sene içinde yapılan sosyal sorumluluk projelerinin <a href="https://mufredat.meb.gov.tr" target="_blank" rel="noopener noreferrer" class="text-indigo-600 font-semibold underline">MEB Talim ve Terbiye Kurulu</a> standartlarına göre <strong>e-Okul Sosyal Etkinlik Modülü</strong>ne işlenmesi zorunludur. Sitemizdeki yıllık plan şablonları e-Okul kategorileriyle tam uyumludur.
</p>

<h2>Sıkça Sorulan Sorular</h2>
<h3>Kulüp evrakları Word (.docx) olarak indirilebilir mi?</h3>
<p>
  Evet, Matemetrik Kulüp Evrakları Robotu üzerinden hem resmi A4 PDF çıktısı alabilir hem de Microsoft Word (.docx) formatında indirip bilgisayarınızda dilediğiniz gibi düzenleyebilirsiniz.
</p>

<h3>Kulüp tüzüğü ve planı okul müdürüne ne zaman onaylatılmalıdır?</h3>
<p>
  MEB Sosyal Etkinlikler Takvimine göre kulüp tüzüğü ve yıllık çalışma planının ders yılının başlamasını takip eden ilk ay içerisinde (Eylül - Ekim) okul müdürlüğüne onaylatılması tavsiye edilir.
</p>
`;

    insertStmt.run(
      item.title,
      item.slug,
      null,
      item.desc,
      contentHtml,
      coverUrl,
      'Öğretmen',
      'ogretmen',
      JSON.stringify([item.name, 'kulüp evrakları', 'toplantı tutanağı', 'yıllık plan', '2026-2027']),
      'Cavenaghi',
      1,
      now,
      now
    );
    clubCount++;
    console.log(`[+CLUB] Generated & Published: ${item.title}`);
  }

  // Process Annual Plan Posts
  for (const item of annualPlanPosts) {
    const existing = checkSlugStmt.get(item.slug);
    if (existing) {
      console.log(`Skipping already existing slug: ${item.slug}`);
      continue;
    }

    const coverUrl = await createCoverImage(item.title, `${item.grade}. Sınıf ${item.subject}`, item.slug);

    const contentHtml = `
<p class="lead text-lg text-slate-700 leading-relaxed font-medium">
  <strong>2026-2027 Eğitim Öğretim Yılı</strong> için Millî Eğitim Bakanlığı Talim ve Terbiye Kurulu Başkanlığı tarafından yayımlanan <strong>Türkiye Yüzyılı Maarif Modeli</strong> yeni müfredatına tam uyumlu <strong>${item.grade}. Sınıf ${item.subject} Dersi Taslak Çerçeve Yıllık Planı</strong> kullanıma açılmıştır.
</p>

<!-- CTA CARD DIRECT LINK -->
<div class="p-6 my-8 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border border-emerald-200 shadow-sm">
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <span class="inline-block px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider mb-2">
        Online Yıllık Plan Robotu
      </span>
      <h3 class="text-xl font-black text-slate-900">
        ${item.grade}. Sınıf ${item.subject} Yıllık Planını Hemen İndirin
      </h3>
      <p class="text-sm text-slate-600 mt-1">
        Okul ve zümre öğretmen bilgilerinizi girin, haftalık kazanımları inceleyin; planınızı tek tıkla <strong>Excel (.xlsx)</strong> ve <strong>resmi A4 PDF</strong> formatında kaydedin.
      </p>
    </div>
    <a
      href="/yillik-plan-hazirlama"
      class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all shrink-0"
    >
      Yıllık Planı İndir &rarr;
    </a>
  </div>
</div>

<h2>2026-2027 Maarif Modeli Yıllık Planda Neler Değişti?</h2>
<p>
  Millî Eğitim Bakanlığı tarafından uygulamaya konulan yeni maarif modeli çerçevesinde ders planları yeniden yapılandırılmıştır:
</p>
<ul>
  <li><strong>Öğrenme Çıktıları ve Süreç Bileşenleri:</strong> Bilgi yüklemek yerine beceri, anlama ve uygulama adımlarını içeren süreç bileşenleri planlara entegre edilmiştir.</li>
  <li><strong>Okul Temelli Planlama Haftaları:</strong> Zümre öğretmenler kurulunun yerel çevre, sosyal etkinlik, gözlem ve proje çalışmaları için ayırdığı özel planlama haftaları belirlenmiştir.</li>
  <li><strong>Değerler ve Okuryazarlık Becerileri:</strong> Dijital, finansal, bilgi ve sürdürülebilirlik okuryazarlıkları gibi çağdaş yeterlilikler ders kazanımlarıyla eşleştirilmiştir.</li>
  <li><strong>Farklılaştırma (Zenginleştirme ve Destekleme):</strong> Farklı öğrenme hızına sahip öğrenciler için uyarlanmış öğretim yöntemleri plana eklenmiştir.</li>
</ul>

<h2>Yasal Dayanak ve Mevzuat Referansları</h2>
<p>
  Hazırlanan bu yıllık çerçeve plan; 19.09.2022 tarih ve 58168473 sayılı <em>"Millî Eğitim Bakanlığı Eğitim Öğretim Çalışmalarının Planlı Yürütülmesine İlişkin Yönerge"</em>, 2104 sayılı Tebliğler Dergisi ve <a href="https://mufredat.meb.gov.tr" target="_blank" rel="noopener noreferrer" class="text-indigo-600 font-semibold underline">MEB Talim ve Terbiye Kurulu</a> kararları esas alınarak oluşturulmuştur.
</p>
<p>
  Resmi çalışma takvimi ve duyurular için <a href="https://www.meb.gov.tr" target="_blank" rel="noopener noreferrer" class="text-indigo-600 font-semibold underline">Millî Eğitim Bakanlığı Portalı</a> ve <a href="https://mevzuat.gov.tr" target="_blank" rel="noopener noreferrer" class="text-indigo-600 font-semibold underline">Mevzuat Bilgi Sistemi</a> adreslerinden teyit sağlayabilirsiniz.
</p>

<h2>Excel ve PDF Çıktısı Nasıl Alınır?</h2>
<p>
  <a href="/yillik-plan-hazirlama" class="text-indigo-600 font-bold underline">Yıllık Plan Hazırlama Robotu</a> sayfamıza giderek ${item.grade}. Sınıf ve ${item.subject} dersini seçiniz. Okul adı, ders öğretmeni ve onay tarihi alanlarını doldurduktan sonra <strong>"Excel (.xlsx) İndir"</strong> butonuna basarak düzenlenebilir Excel dosyanızı, <strong>"PDF / Resmi Baskı"</strong> butonuna basarak da A4 yatay resmi çıktınızı anında alabilirsiniz.
</p>
`;

    insertStmt.run(
      item.title,
      item.slug,
      null,
      item.desc,
      contentHtml,
      coverUrl,
      `${item.grade}. Sınıf`,
      `${item.grade}-sinif`,
      JSON.stringify([`${item.grade}. sınıf`, item.subject, 'yıllık plan', 'maarif modeli', '2026-2027']),
      'Cavenaghi',
      1,
      now,
      now
    );
    annualCount++;
    console.log(`[+PLAN] Generated & Published: ${item.title}`);
  }

  console.log(`\n🎉 Completed! Generated and auto-published ${clubCount} club posts and ${annualCount} annual plan posts.`);
}

main().catch(err => {
  console.error('Error generating posts:', err);
  process.exit(1);
});
