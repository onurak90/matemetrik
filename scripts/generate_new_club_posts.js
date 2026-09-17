const Database = require('better-sqlite3');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../data/matemetrik.db');
const uploadsDir = path.join(__dirname, '../public/uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const db = new Database(DB_PATH);

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
    <line x1="0" y1="126" x2="1200" y2="126" />
    <line x1="0" y1="252" x2="1200" y2="252" />
    <line x1="0" y1="378" x2="1200" y2="378" />
    <line x1="0" y1="504" x2="1200" y2="504" />
    <line x1="240" y1="0" x2="240" y2="630" />
    <line x1="480" y1="0" x2="480" y2="630" />
    <line x1="720" y1="0" x2="720" y2="630" />
    <line x1="960" y1="0" x2="960" y2="630" />
  </g>

  <g transform="translate(100, 110)">
    <rect width="${badgeWidth}" height="38" rx="19" fill="url(#badgeGrad)" filter="url(#shadow)" />
    <text x="${badgeWidth / 2}" y="24" text-anchor="middle" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" letter-spacing="1.2">
      ${escapeXml(displayCategory)}
    </text>
  </g>

  <g transform="translate(0, 210)">
    <text x="100" y="0" fill="#f8fafc" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-size="44" font-weight="800" line-height="1.28">
      ${tspans}
    </text>
  </g>

  <g transform="translate(100, 500)">
    <rect width="48" height="48" rx="14" fill="#4f46e5" />
    <text x="24" y="32" text-anchor="middle" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="24" font-weight="900">M</text>

    <text x="64" y="24" fill="#f8fafc" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="18" font-weight="700">
      Matemetrik.com
    </text>
    <text x="64" y="44" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="13" font-weight="500">
      Öğretmen ve Eğitim İçerikleri &#8226; 2026-2027
    </text>
  </g>

  <g transform="translate(1060, 510)">
    <rect x="-60" y="-12" width="100" height="34" rx="17" fill="#1e293b" stroke="#334155" stroke-width="1" />
    <text x="-10" y="10" text-anchor="middle" fill="#38bdf8" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="13" font-weight="600">
      Word &amp; PDF
    </text>
  </g>

  <rect y="622" width="1200" height="8" fill="url(#bottomAccent)" />
</svg>
`;

  await sharp(Buffer.from(svg)).webp({ quality: 85, effort: 6 }).toFile(filePath);
  return `/uploads/${filename}`;
}

const newClubPosts = [
  {
    name: 'Engellilerle Dayanışma Kulübü',
    slug: '2026-2027-engellilerle-dayanisma-kulubu-evraklari-toplanti-tutanaklari-ve-plani',
    title: '2026-2027 Engellilerle Dayanışma Kulübü Evrakları, Toplantı Tutanakları ve Yıllık Planı',
    desc: 'Engelsiz okul bilinci, 3 Aralık Dünya Engelliler Günü, empati parkuru ve işaret dili farkındalığı için MEB onaylı Engellilerle Dayanışma Kulübü resmi evrakları.',
    highlights: '3 Aralık Dünya Engelliler Günü, 10-16 Mayıs Engelliler Haftası, okul erişilebilirlik denetimi, işaret dili atölyesi ve tekerlekli sandalye desteği.'
  },
  {
    name: 'Müzik Kulübü',
    slug: '2026-2027-muzik-kulubu-evraklari-koro-calisma-plani-ve-toplanti-tutanaklari',
    title: '2026-2027 Müzik Kulübü Evrakları, Koro Çalışma Planı ve Toplantı Tutanakları',
    desc: 'Okul korosu ve enstrüman çalışmaları, milli bayram dinletileri, ritim atölyeleri ve MEB uyumlu Müzik Kulübü yıllık çalışma programı.',
    highlights: 'Okul korosu ses taramaları, 29 Ekim ve 10 Kasım anma marşları, ritim eğitimi, enstrüman dinletileri ve büyük yıl sonu müzik şenliği.'
  },
  {
    name: 'Kültür ve Edebiyat Kulübü',
    slug: '2026-2027-kultur-ve-edebiyat-kulubu-evraklari-ve-yillik-plani',
    title: '2026-2027 Kültür ve Edebiyat Kulübü Evrakları, Şiir Dinletisi ve Yıllık Planı',
    desc: 'Dilimizin Zenginlikleri projesi, şiir dinletisi, okul edebiyat bülteni ve MEB Kültür ve Edebiyat Kulübü resmi iç tüzük ve toplantı tutanakları.',
    highlights: 'Dilimizin Zenginlikleri sergisi, 21 Mart Dünya Şiir Günü büyük dinletisi, okul edebiyat dergisi, kitap tahlilleri ve yazar söyleşileri.'
  },
  {
    name: 'Uzay ve Havacılık Kulübü',
    slug: '2026-2027-uzay-ve-havacilik-kulubu-evraklari-ve-calisma-plani',
    title: '2026-2027 Uzay ve Havacılık Kulübü Evrakları, Çalışma Planı ve Tutanakları',
    desc: 'Dünya Uzay Haftası, gökyüzü gözlem günü, model uçak ve roket atölyeleri için MEB onaylı Uzay ve Havacılık Kulübü resmi evrak seti.',
    highlights: '4-10 Ekim Dünya Uzay Haftası, su roketi ve model uçak atölyesi, teleskopla Ay ve gezegen gözlem günü, TEKNOFEST havacılık hazırlıkları.'
  },
  {
    name: 'Girişimcilik Kulübü',
    slug: '2026-2027-girisimcilik-kulubu-evraklari-toplanti-tutanaklari-ve-plani',
    title: '2026-2027 Girişimcilik Kulübü Evrakları, Toplantı Tutanakları ve Yıllık Planı',
    desc: 'İş modeli kanvası, sosyal girişimcilik, okul kermesi ve inovatif fikir maratonu için MEB uyumlu Girişimcilik Kulübü evrakları.',
    highlights: 'Küresel Girişimcilik Haftası, İş Modeli Kanvası (BMC) eğitimi, sosyal girişimcilik burs projesi ve okul içi mini hackathon fikir maratonu.'
  },
  {
    name: 'Enerji Verimliliği Kulübü',
    slug: '2026-2027-enerji-verimliligi-kulubu-evraklari-ve-yillik-plani',
    title: '2026-2027 Enerji Verimliliği Kulübü Evrakları, Tüzük ve Toplantı Tutanakları',
    desc: 'Enerji Tasarrufu Haftası, okul enerji denetimi (enerji avcıları), karbon ayak izi ve MEB uyumlu Enerji Verimliliği Kulübü dosyası.',
    highlights: '11-17 Ocak Enerji Tasarrufu Haftası, Enerji Avcıları timi, okul elektrik-su fatura analizi, güneş fırını deneyi ve veli tasarruf bülteni.'
  },
  {
    name: 'Satranç Kulübü',
    slug: '2026-2027-satranc-kulubu-evraklari-turnuva-hazirlik-plani-ve-tutanaklari',
    title: '2026-2027 Satranç Kulübü Evrakları, Turnuva Hazırlık Planı ve Tutanakları',
    desc: 'TSF ve Okul Sporları satranç şampiyonaları hazırlığı, okul turnuvaları ve MEB Satranç Kulübü iç tüzük ve toplantı tutanakları.',
    highlights: 'Temel açılış ve taktik motifler, MEB Okul Sporları turnuvası okul takımı, geleneksel okul satranç şampiyonası ve açık hava bahçe satrancı.'
  },
  {
    name: 'İzcilik Kulübü',
    slug: '2026-2027-izcilik-kulubu-evraklari-doga-kampi-plani-ve-tutanaklari',
    title: '2026-2027 İzcilik Kulübü Evrakları, Doğa Kampı Planı ve Toplantı Tutanakları',
    desc: 'İzci andı, pusula ve düğüm atölyeleri, doğa yürüyüşü ve günübirlik kamp etkinlikleri için MEB İzcilik Kulübü resmi evrak seti.',
    highlights: 'İzci Türesi ve Andı, temel düğümler, harita-pusula kerteriz eğitimi, çadır kurma, doğa yürüyüşü ve okul kamp ateşi gecesi.'
  },
  {
    name: 'İş Sağlığı ve Güvenliği Kulübü',
    slug: '2026-2027-is-sagligi-ve-guvenligi-kulubu-evraklari-ve-risk-plani',
    title: '2026-2027 İş Sağlığı ve Güvenliği Kulübü Evrakları, Risk Planı ve Tutanakları',
    desc: '6331 sayılı İSG Kanunu uyumlu okul risk değerlendirmesi, acil durum tahliye tatbikatları ve İSG Kulübü resmi belgeleri.',
    highlights: '6331 sayılı İSG mevzuatı, okul fiziksel risk denetimi, 1-7 Mart deprem ve tahliye tatbikatı, 4-10 Mayıs İSG Haftası okul sergisi.'
  },
  {
    name: 'Meslek Tanıtma Kulübü',
    slug: '2026-2027-meslek-tanitma-kulubu-evraklari-ve-kariyer-gunleri-plani',
    title: '2026-2027 Meslek Tanıtma Kulübü Evrakları, Kariyer Günleri Planı ve Tutanakları',
    desc: 'Kariyer günleri panelleri, meslek uzmanı söyleşileri, üniversite ve lise gezileri için MEB Meslek Tanıtma Kulübü resmi evrakları.',
    highlights: 'Geleceğin yapay zeka ve mühendislik meslekleri, tıp ve adalet panelleri, okul kariyer fuarı ve 8./12. sınıflar için meslek tercih rehberi.'
  },
  {
    name: 'Tiyatro Kulübü',
    slug: '2026-2027-tiyatro-kulubu-evraklari-oyun-sahneleme-plani-ve-tutanaklari',
    title: '2026-2027 Tiyatro Kulübü Evrakları, Oyun Sahneleme Planı ve Toplantı Tutanakları',
    desc: '27 Mart Dünya Tiyatro Günü etkinlikleri, diksiyon ve doğaçlama provaları, yıl sonu tiyatro gala oyunu için MEB onaylı evrak seti.',
    highlights: 'Diksiyon ve diyafram çalışmaları, rol dağılımı ve metin tahlili, 27 Mart Dünya Tiyatro Günü ve konferans salonunda büyük tiyatro galası.'
  },
  {
    name: 'Medya ve İletişim Kulübü',
    slug: '2026-2027-medya-ve-iletisim-kulubu-evraklari-ve-yillik-plani',
    title: '2026-2027 Medya ve İletişim Kulübü Evrakları, Okul Gazetesi ve Tutanakları',
    desc: 'Medya okuryazarlığı, dijital okul gazetesi ve bülten yayını, röportaj ve fotoğrafçılık için MEB Medya Kulübü resmi evrakları.',
    highlights: '5N1K haber yazım tekniği, dezenformasyon ve sosyal medya etiği, podcast-röportaj atölyesi ve dijital Okul Postası gazetesi yayını.'
  },
  {
    name: 'Yabancı Diller Kulübü',
    slug: '2026-2027-yabanci-diller-kulubu-evraklari-ve-dil-senligi-plani',
    title: '2026-2027 Yabancı Diller Kulübü Evrakları, Dil Şenliği Planı ve Tutanakları',
    desc: '26 Eylül Avrupa Diller Günü, Speaking Corner atölyeleri, Spelling Bee kelime yarışması ve MEB Yabancı Diller Kulübü evrakları.',
    highlights: '26 Eylül Avrupa Diller Günü, English Speaking Corner, İngilizce münazara, Spelling Bee kelime yarışması ve Yabancı Diller Festivali.'
  },
  {
    name: 'Su Elçileri Kulübü',
    slug: '2026-2027-su-elcileri-kulubu-evraklari-tasarruf-plani-ve-tutanaklari',
    title: '2026-2027 Su Elçileri Kulübü Evrakları, Su Tasarrufu Planı ve Tutanakları',
    desc: '22 Mart Dünya Su Günü, kuraklıkla mücadele, su ayak izi ve okul armatür tasarruf denetimleri için Su Elçileri Kulübü dosyası.',
    highlights: 'Tatlı su kaynakları ve kuraklık panosu, lavabo perlatör denetimi, 22 Mart Dünya Su Günü töreni, yağmur suyu hasadı maketi ve su arıtma gezisi.'
  },
  {
    name: 'STEM Eğitimi Kulübü',
    slug: '2026-2027-stem-egitimi-kulubu-evraklari-robotik-proje-plani-ve-tutanaklari',
    title: '2026-2027 STEM Eğitimi Kulübü Evrakları, Robotik Proje Planı ve Tutanakları',
    desc: 'Arduino devreleri, 3D modelleme ve baskı, TÜBİTAK ve TEKNOFEST robotik projeleri için MEB STEM Kulübü resmi evrak seti.',
    highlights: 'Mühendislik tasarım süreci, Arduino sensör kodlama, 3D Tinkercad modelleme, TÜBİTAK 2204 proje posterleri ve okul STEM şenliği.'
  },
  {
    name: 'Sosyal Dayanışma ve Yardımlaşma Kulübü',
    slug: '2026-2027-sosyal-dayanisma-ve-yardimlasma-kulubu-evraklari-ve-yillik-plani',
    title: '2026-2027 Sosyal Dayanışma ve Yardımlaşma Kulübü Evrakları ve Yıllık Planı',
    desc: 'Kardeş okul kırtasiye kampanyası, kışlık giysi yardımı, huzurevi ziyareti ve MEB Sosyal Dayanışma Kulübü resmi evrakları.',
    highlights: 'Kış Üşütür Sevgi Isıtır mont-bot kampanyası, huzurevi moral ziyareti, Ramazan gıda kolisi dağıtımı ve okul dayanışma kermesi.'
  },
  {
    name: 'Sağlık, Temizlik ve Beslenme Kulübü',
    slug: '2026-2027-saglik-temizlik-ve-beslenme-kulubu-evraklari-ve-tutanaklari',
    title: '2026-2027 Sağlık, Temizlik ve Beslenme Kulübü Evrakları ve Toplantı Tutanakları',
    desc: 'Okul kantini hijyen denetimleri, sağlıklı beslenme çantası rehberi, kişisel hijyen ve obeziteyle mücadele resmi kulüp dosyası.',
    highlights: 'Dünya Gıda Günü, okul kantini sağlıklı reyon denetimi, doğru el yıkama ve diş sağlığı semineri, sabah spor egzersizleri ve Meyve Günü.'
  },
  {
    name: 'Yeşilay Kulübü',
    slug: '2026-2027-yesilay-kulubu-evraklari-bagimlilikla-mucadele-plani-ve-tutanaklari',
    title: '2026-2027 Yeşilay Kulübü Evrakları, Bağımlılıkla Mücadele Planı ve Tutanakları',
    desc: '1-7 Mart Yeşilay Haftası kutlamaları, tütün ve ekran bağımlılığıyla mücadele, sağlıklı yaşam afişleri ve resmi Yeşilay Kulübü belgeleri.',
    highlights: '1-7 Mart Yeşilay Haftası okul töreni, dumansız hava sahası, ekran-teknoloji bağımlılığı detoksu, akran baskısına karşı Hayır eğitimi ve bisiklet turu.'
  }
];

async function run() {
  const insertStmt = db.prepare(`
    INSERT INTO posts (
      title, slug, old_slug, excerpt, content, featured_image,
      category, category_slug, tags, author, is_published, views,
      created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const checkSlugStmt = db.prepare('SELECT id FROM posts WHERE slug = ?');

  let count = 0;
  const now = new Date().toISOString();

  for (const item of newClubPosts) {
    const existing = checkSlugStmt.get(item.slug);
    if (existing) {
      console.log(`Zaten mevcut, atlanıyor: ${item.slug}`);
      continue;
    }

    const coverUrl = await createCoverImage(item.title, 'Sosyal Kulüpler', item.slug);

    const contentHtml = `
<p class="lead text-lg text-slate-700 leading-relaxed font-medium">
  <strong>2026-2027 Eğitim Öğretim Yılı</strong> MEB İlköğretim ve Ortaöğretim Kurumları Sosyal Etkinlikler Yönetmeliği standartlarına tam uygun olarak hazırlanan <strong>${item.name}</strong> resmi iç tüzüğü, 1. ve 2. dönem genel kurul toplantı tutanakları, yıllık çalışma planı ve faaliyet raporu dosyası kullanıma sunulmuştur.
</p>

<!-- CTA CARD DIRECT LINK -->
<div class="p-6 my-8 rounded-3xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-200 shadow-sm">
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <span class="inline-block px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider mb-2">
        Online Belge Oluşturucu
      </span>
      <h3 class="text-xl font-black text-slate-900">
        ${item.name} Evraklarını Hemen İndirin
      </h3>
      <p class="text-sm text-slate-600 mt-1">
        Okul ve danışman öğretmen bilgilerinizi girin; iç tüzük, toplantı tutanağı ve yıllık planınızı tek tıkla <strong>Word (.docx)</strong> veya <strong>resmi PDF</strong> formatında indirin.
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
  Millî Eğitim Bakanlığı Sosyal Etkinlikler Yönetmeliği hükümleri uyarınca kulüp danışman öğretmenlerinin hazırlamakla ve sene boyunca muhafaza etmekle yükümlü olduğu temel evraklar şunlardır:
</p>
<ul>
  <li><strong>Kulüp İç Tüzüğü:</strong> Kulübün adı, amaçları, faaliyet kapsamı, organları ve çalışma esaslarını belirleyen resmi sözleşmedir.</li>
  <li><strong>1. Dönem Genel Kurul Toplantı Tutanağı &amp; Kararları:</strong> Sene başı genel kurulunda yapılan yoklama, divan teşekkülü, kulüp başkanı ve kurulların seçildiği onaylı toplantı tutanağıdır.</li>
  <li><strong>2026-2027 Yıllık Çalışma Programı:</strong> Eylül ayından Haziran ayına kadar 10 ayı kapsayan belirli günler ve haftalar, pano çalışmaları ve toplum hizmeti takvimidir.</li>
  <li><strong>2. Dönem Genel Kurul Toplantı Tutanağı:</strong> İkinci yarıyıl başında gerçekleştirilen çalışma değerlendirme ve dönem revizyon tutanağıdır.</li>
  <li><strong>Kurul ve Görevli Öğrenci Listesi:</strong> Yönetim Kurulu Başkanı, Başkan Yardımcısı, Yazman, Sayman ve Denetleme Kurulu üyelerinin sınıf ve numara dökümüdür.</li>
  <li><strong>Yıl Sonu Faaliyet Raporu:</strong> Eğitim öğretim yılı sonunda gerçekleştirilen tüm etkinliklerin başarı durumunu özetleyen ve idareye sunulan resmi rapordur.</li>
  <li><strong>MEB Ek-5 Sosyal Etkinlik Veli İzin Belgesi:</strong> Okul dışı gezi, sosyal sorumluluk ve toplum hizmeti projelerine katılan öğrenciler için yasal veli onay formudur.</li>
</ul>

<h2>2026-2027 Yıllık Çalışma Planı ve Önemli Faaliyetler</h2>
<p>
  ${item.name} kapsamında yıl boyunca yürütülecek ana faaliyet başlıkları şunları içermektedir:
</p>
<div class="p-5 my-6 rounded-2xl bg-slate-50 border border-slate-200">
  <p class="text-slate-800 font-medium">
    <strong>Öne Çıkan Kulüp Etkinlikleri:</strong> ${item.highlights}
  </p>
</div>
<p>
  Tüm bu etkinlikler öğrencilerin sorumluluk alma, özgüven kazanma, takım halinde çalışma ve toplumsal duyarlılık edinme becerilerini en üst seviyeye çıkarmaktadır.
</p>

<h2>Toplantı Tutanakları Düzenlenirken Dikkat Edilecek Hususlar</h2>
<p>
  Toplantı tutanaklarında toplantı tarihi, saati, toplantı salonu bilgileri eksiksiz belirtilmeli; alınan kararlar madde madde resmi bir dille kaleme alınmalıdır. Toplantı bitiminde divan başkanı, kulüp başkanı ve danışman öğretmen imzaları tamamlanmalı; nihai onay okul müdürlüğü tarafından verilmelidir.
</p>
<p>
  Konu hakkında daha fazla resmi bilgi ve mevzuat detayları için <a href="https://www.meb.gov.tr" target="_blank" rel="noopener noreferrer" class="text-indigo-600 font-semibold underline">Millî Eğitim Bakanlığı Resmi Portalı</a> ve <a href="https://mevzuat.gov.tr" target="_blank" rel="noopener noreferrer" class="text-indigo-600 font-semibold underline">Cumhurbaşkanlığı Mevzuat Bilgi Sistemi</a> adreslerini ziyaret edebilirsiniz.
</p>

<h2>e-Okul Sosyal Etkinlik Modülü Veri Girişi</h2>
<p>
  Sosyal kulüp çalışmaları kapsamında icra edilen tüm toplum hizmeti ve kulüp faaliyetlerinin <a href="https://mufredat.meb.gov.tr" target="_blank" rel="noopener noreferrer" class="text-indigo-600 font-semibold underline">MEB Müfredat ve Sosyal Etkinlik Portalı</a> standartlarına uygun olarak <strong>e-Okul Sosyal Etkinlik Modülü</strong>ne işlenmesi gerekmektedir. Matemetrik robotu ile üretilen belgeler modül alanları ile %100 örtüşmektedir.
</p>

<h2>Sıkça Sorulan Sorular</h2>
<h3>Kulüp evraklarını Word (.docx) olarak bilgisayarıma indirebilir miyim?</h3>
<p>
  Evet, Matemetrik Kulüp Toplantı Tutanakları Robotu üzerinden hem A4 resmi PDF çıktısı alabilir hem de Microsoft Word (.docx) formatında indirip dilediğiniz düzenlemeyi yapabilirsiniz.
</p>

<h3>Yıllık çalışma planı ne zaman okul müdürlüğüne onaylatılmalıdır?</h3>
<p>
  MEB Sosyal Etkinlikler Takvimine göre kulüp iç tüzüğü ve yıllık çalışma planının ders yılının başlamasını takip eden ilk ay içerisinde (Eylül - Ekim) okul müdürünün onayına sunulması gerekmektedir.
</p>
`;

    insertStmt.run(
      item.title,
      item.slug,
      null,
      item.desc,
      contentHtml.trim(),
      coverUrl,
      'Rehberlik ve Öğretmen',
      'rehberlik-ve-ogretmen',
      `MEB,Sosyal Kulüpler,Kulüp Evrakları,Toplantı Tutanağı,${item.name}`,
      'Cavenaghi',
      1,
      0,
      now,
      now
    );

    count++;
    console.log(`[${count}/${newClubPosts.length}] Blog yazısı ve kapak üretildi: ${item.title}`);
  }

  // Checkpoint SQLite WAL to ensure disk persistence
  db.pragma('wal_checkpoint(TRUNCATE)');
  db.close();

  console.log(`\nİşlem başarıyla tamamlandı! Toplam eklenen blog yazısı: ${count}`);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
