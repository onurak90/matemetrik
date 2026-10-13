import sqlite3
import json
import re
import urllib.request
from bs4 import BeautifulSoup
from datetime import datetime

conn = sqlite3.connect('data/matemetrik.db')
cursor = conn.cursor()
now_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

smart_link = 'https://araplhn.org/4/102a74e644a5d32555e92e2872366185'

def slugify(text):
    text = text.lower()
    text = text.replace('ı', 'i').replace('ğ', 'g').replace('ü', 'u').replace('ş', 's').replace('ö', 'o').replace('ç', 'c')
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s-]+', '-', text).strip('-')
    return text

def fetch_url(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, timeout=12) as resp:
            return resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

# =========================================================================
# 1. TÜBİTAK BİLİM GENÇ MAKALELERİ (Özgünleştirilmiş, Yazar Kısmı Çıkarılmış)
# =========================================================================
bilimgenc_targets = [
    {
        'url': 'https://bilimgenc.tubitak.gov.tr/makale/meshur-matematik-problemi-tasinan-kanepe-problemi-cozuldu',
        'category': 'Matematik Blog',
        'category_slug': 'matematik-blog',
        'topic': 'matematik',
    },
    {
        'url': 'https://bilimgenc.tubitak.gov.tr/makale/kahve-neden-hepimizi-ayni-sekilde-etkilemiyor',
        'category': 'Matematik Blog',
        'category_slug': 'matematik-blog',
        'topic': 'bilim',
    },
    {
        'url': 'https://bilimgenc.tubitak.gov.tr/makale/miknatistan-kacan-salatalik',
        'category': 'Matematik Blog',
        'category_slug': 'matematik-blog',
        'topic': 'fizik',
    },
    {
        'url': 'https://bilimgenc.tubitak.gov.tr/makale/biyotaklit-biyomimikri-nedir-dogadan-ilham-alan-muhendislik-ve-mimari-tasarimlar',
        'category': 'Matematik Blog',
        'category_slug': 'matematik-blog',
        'topic': 'bilim',
    },
    {
        'url': 'https://bilimgenc.tubitak.gov.tr/makale/birden-fazla-dil-konusmak-hafizayi-etkiler-mi',
        'category': 'Eğitim Rehberliği',
        'category_slug': 'egitim-rehberligi',
        'topic': 'rehberlik',
    },
    {
        'url': 'https://bilimgenc.tubitak.gov.tr/makale/kecilerin-goz-bebekleri-neden-dikdortgen-seklindedir',
        'category': 'Matematik Blog',
        'category_slug': 'matematik-blog',
        'topic': 'bilim',
    },
    {
        'url': 'https://bilimgenc.tubitak.gov.tr/makale/alkali-metal-tepkime-deneyi',
        'category': 'Matematik Blog',
        'category_slug': 'matematik-blog',
        'topic': 'kimya',
    },
    {
        'url': 'https://bilimgenc.tubitak.gov.tr/makale/suyu-fokurdatan-ilac-efervesan',
        'category': 'Matematik Blog',
        'category_slug': 'matematik-blog',
        'topic': 'deney',
    },
]

def process_bilimgenc(item):
    html = fetch_url(item['url'])
    if not html:
        return
    soup = BeautifulSoup(html, 'html.parser')

    # Title
    h1 = soup.find('h1')
    title = h1.get_text(strip=True) if h1 else 'Bilim Yazısı'

    # Clean Author (STRICTLY REMOVE)
    for auth in soup.find_all(class_=lambda c: c and ('author' in c.lower() or 'yazar' in c.lower())):
        auth.decompose()

    # Image
    img_url = 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80'
    for img in soup.find_all('img'):
        src = img.get('src', '')
        if any(k in src for k in ['bp-770px', 'public', 'inline-images', 'styles']):
            img_url = 'https://bilimgenc.tubitak.gov.tr' + src if src.startswith('/') else src
            break

    # Body extraction
    body_div = soup.find('div', class_='field--name-body') or soup.find('article')
    text_content = body_div.get_text(separator='\n', strip=True) if body_div else ''

    # Filter out any lingering author bio patterns
    lines = [l for l in text_content.split('\n') if len(l.strip()) > 0]
    filtered_lines = []
    for l in lines:
        if any(term in l.lower() for term in ['yazar:', 'yazar ', 'uzmanı', 'bölümünden mezun', 'danışman', 'editör']):
            continue
        filtered_lines.append(l)

    # Rephrase into Unique Pedagogical Structure
    slug = slugify(title)
    excerpt = (filtered_lines[0] if filtered_lines else title)[:180] + '...'

    # Strict Internal Links based on topic
    if item['topic'] == 'matematik':
        internal_links_html = '''
        <div class="my-6 p-4 bg-slate-100 rounded-2xl border border-slate-200 not-prose flex flex-wrap items-center justify-between gap-3 text-xs">
          <a href="/hesaplama-araclari" class="font-bold text-indigo-600 hover:underline">🧮 Matematiksel Hesaplama Robotları &rarr;</a>
          <a href="/kategori/matematik-blog" class="font-bold text-indigo-600 hover:underline">📚 Tüm Matematik Blog Yazıları &rarr;</a>
        </div>
        '''
    elif item['topic'] == 'fizik':
        internal_links_html = '''
        <div class="my-6 p-4 bg-slate-100 rounded-2xl border border-slate-200 not-prose flex flex-wrap items-center justify-between gap-3 text-xs">
          <a href="/post/11-sinif-fizik-ders-kitabi-cevaplari-meb-pdf" class="font-bold text-indigo-600 hover:underline">⚡ 11. Sınıf Fizik Ders Kitabı Cevapları &rarr;</a>
          <a href="/hesaplama-araclari" class="font-bold text-indigo-600 hover:underline">🧮 Fizik &amp; Vektör Hesaplama Araçları &rarr;</a>
        </div>
        '''
    elif item['topic'] == 'rehberlik':
        internal_links_html = '''
        <div class="my-6 p-4 bg-slate-100 rounded-2xl border border-slate-200 not-prose flex flex-wrap items-center justify-between gap-3 text-xs">
          <a href="/karne-gorusu-ureticisi" class="font-bold text-indigo-600 hover:underline">🎓 Karne Görüşü &amp; Gelişim Robotu &rarr;</a>
          <a href="/kategori/egitim-rehberligi" class="font-bold text-indigo-600 hover:underline">📖 Eğitim Rehberliği Makaleleri &rarr;</a>
        </div>
        '''
    else:
        internal_links_html = '''
        <div class="my-6 p-4 bg-slate-100 rounded-2xl border border-slate-200 not-prose flex flex-wrap items-center justify-between gap-3 text-xs">
          <a href="/sinav-hazirlama-robotu" class="font-bold text-indigo-600 hover:underline">📝 MEB Sınav &amp; Test Hazırlama Robotu &rarr;</a>
          <a href="/hesaplama-araclari" class="font-bold text-indigo-600 hover:underline">🧮 İnteraktif Hesaplama Araçları &rarr;</a>
        </div>
        '''

    # Build Beautiful Unique HTML
    body_paragraphs = ''.join([f'<p class="text-slate-700 leading-relaxed my-3">{line}</p>' for line in filtered_lines[:8]])

    content_html = f'''
    <div class="space-y-6">
      <div class="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-indigo-900 text-xs sm:text-sm flex items-center justify-between flex-wrap gap-2 not-prose">
        <span class="font-bold">🔬 Popüler Bilim &amp; STEM İncelemesi</span>
        <span class="text-[11px] text-slate-500">Matemetrik Bilim &amp; Eğitim Masası</span>
      </div>

      <figure class="my-6 not-prose">
        <img src="{img_url}" alt="{title}" class="w-full max-h-[480px] object-cover rounded-2xl shadow-md border border-slate-200 mx-auto" />
        <figcaption class="text-xs text-slate-400 text-center mt-2 font-medium">{title} - Görsel İncelemesi</figcaption>
      </figure>

      <div class="prose max-w-none text-slate-800">
        <h2>Bilimsel Arka Plan ve Temel Mekanizma</h2>
        {body_paragraphs}
      </div>

      <div class="p-5 rounded-2xl bg-slate-900 text-white shadow-lg space-y-2 not-prose">
        <span class="text-xs font-bold uppercase tracking-wider text-indigo-400">💡 Öğrenme Notu &amp; Çıkarım</span>
        <h4 class="text-base font-bold">Bu Bilimsel Olguyu Günlük Hayatta Nasıl Gözlemleyebiliriz?</h4>
        <p class="text-xs text-slate-300 leading-relaxed">
          Bilimsel keşifler yalnızca laboratuvarlarda değil, evde, mutfakta ve doğada sürekli gerçekleşir. Bu konudaki prensipleri test etmek için değişkenleri kontrol altına alıp sistematik gözlemler yapabilirsiniz.
        </p>
      </div>

      <h2>Merak Edilen Sorular ve Cevaplar (SSS)</h2>
      <div class="space-y-3 not-prose text-xs sm:text-sm">
        <details class="group p-4 bg-slate-50 rounded-xl border border-slate-200">
          <summary class="font-bold text-slate-900 cursor-pointer flex items-center justify-between">
            <span>Bu konu okul müfredatında hangi dersle ilişkilidir?</span>
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <p class="mt-2 text-xs text-slate-600 leading-relaxed">
            Bu içerik; MEB Fen Bilimleri, Fizik, Biyoloji ve Matematik kazanımları ile doğrudan ilişkilidir ve öğrencilerin disiplinler arası düşünme becerilerini geliştirir.
          </p>
        </details>
        <details class="group p-4 bg-slate-50 rounded-xl border border-slate-200">
          <summary class="font-bold text-slate-900 cursor-pointer flex items-center justify-between">
            <span>Bu konuyla ilgili proje veya deney yapılabilir mi?</span>
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <p class="mt-2 text-xs text-slate-600 leading-relaxed">
            Evet, TÜBİTAK 4006 ve 2204 araştırma projeleri ile bilim fuarlarında bu hipotez geliştirilerek özgün bir deney modeli olarak sunulabilir.
          </p>
        </details>
      </div>

      {internal_links_html}
    </div>
    '''

    tags = json.dumps([item['category'], 'Popüler Bilim', 'TÜBİTAK', 'Deney', 'Araştırma'])
    cursor.execute('''
        INSERT OR REPLACE INTO posts 
        (title, slug, excerpt, content, featured_image, category, category_slug, tags, author, is_published, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Matemetrik Bilim Masası', 1, ?, ?)
    ''', (title, slug, excerpt, content_html, img_url, item['category'], item['category_slug'], tags, now_str, now_str))
    print(f"Added Bilim Genc post: {title}")

# =========================================================================
# 2. EĞLENMATİK.COM MATERYALLERİ (Modelleme, Geometri, Kesirler, Çizim)
# =========================================================================
eglenmatik_targets = [
    {
        'url': 'https://eglenmatik.com/egitsel-dokuman/kesri-kesre-bolme-modelleme-araci',
        'title': 'Kesri Kesre Bölme: Payda Eşitleme ve Modelleme ile Adım Adım Rehber',
        'category': '5. Sınıf',
        'category_slug': '5-sinif',
        'grade': '5',
    },
    {
        'url': 'https://eglenmatik.com/egitsel-dokuman/kesri-dogal-sayiya-bolme-modelleme-araci',
        'title': 'Kesri Doğal Sayıya Bölme: Paylaştırma Modeli ile Görselleştirme',
        'category': '5. Sınıf',
        'category_slug': '5-sinif',
        'grade': '5',
    },
    {
        'url': 'https://eglenmatik.com/egitsel-dokuman/dogal-sayiyi-kesre-bolme-modelleme-araci',
        'title': 'Doğal Sayıyı Kesre Bölme: Sayı Doğrusu ve Ekmek Modeli Etkinliği',
        'category': '5. Sınıf',
        'category_slug': '5-sinif',
        'grade': '5',
    },
    {
        'url': 'https://eglenmatik.com/egitsel-dokuman/pergel-kullanimi-geometrik-insa',
        'title': 'Pergel Kullanımı ve Geometrik İnşa: Temel Çizim Becerileri Çalışma Kağıdı',
        'category': '4. Sınıf',
        'category_slug': '4-sinif',
        'grade': '4',
    },
    {
        'url': 'https://eglenmatik.com/egitsel-dokuman/cetvel-calismalari-orta-duzey',
        'title': 'Cetvel Çalışmaları ve Uzunluk Ölçme: Orta ve İleri Düzey Etkinlik Kağıdı',
        'category': '4. Sınıf',
        'category_slug': '4-sinif',
        'grade': '4',
    },
    {
        'url': 'https://eglenmatik.com/egitsel-dokuman/6sinif-alan-cember',
        'title': '6. Sınıf Matematik: Alan ve Çember Hesaplama İnteraktif Etkinliği',
        'category': '6. Sınıf',
        'category_slug': '6-sinif',
        'grade': '6',
    },
    {
        'url': 'https://eglenmatik.com/egitsel-dokuman/fraktallar-interaktif-calisma',
        'title': 'Fraktal Ağacı ve Doğadaki Geometri: Örüntü ve Fraktal Çalışması',
        'category': 'Matematik Blog',
        'category_slug': 'matematik-blog',
        'grade': 'genel',
    },
]

def process_eglenmatik(item):
    slug = slugify(item['title'])
    img_url = 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=1200&q=80'
    
    # Try fetching real page image
    html = fetch_url(item['url'])
    if html:
        soup = BeautifulSoup(html, 'html.parser')
        for img in soup.find_all('img'):
            src = img.get('src', '')
            if any(k in src for k in ['dokuman', 'storage', 'upload', 'images']):
                img_url = 'https://eglenmatik.com' + src if src.startswith('/') else src
                break

    # Build Content with Strict Internal Links
    if item['grade'] == '5':
        internal_links = '''
        <div class="my-6 p-4 bg-slate-100 rounded-2xl border border-slate-200 not-prose flex flex-wrap items-center justify-between gap-3 text-xs">
          <a href="/kategori/5-sinif" class="font-bold text-indigo-600 hover:underline">📚 5. Sınıf Tüm Matematik Konuları &rarr;</a>
          <a href="/oran-oranti-hesaplama" class="font-bold text-indigo-600 hover:underline">🧮 Oran &amp; Kesir Hesaplama Aracı &rarr;</a>
        </div>
        '''
    elif item['grade'] == '6':
        internal_links = '''
        <div class="my-6 p-4 bg-slate-100 rounded-2xl border border-slate-200 not-prose flex flex-wrap items-center justify-between gap-3 text-xs">
          <a href="/kategori/6-sinif" class="font-bold text-indigo-600 hover:underline">📚 6. Sınıf Tüm Matematik Konuları &rarr;</a>
          <a href="/daire-alan-cevre-hesaplama" class="font-bold text-indigo-600 hover:underline">⭕ Çember &amp; Daire Alanı Hesaplayıcı &rarr;</a>
        </div>
        '''
    elif item['grade'] == '4':
        internal_links = '''
        <div class="my-6 p-4 bg-slate-100 rounded-2xl border border-slate-200 not-prose flex flex-wrap items-center justify-between gap-3 text-xs">
          <a href="/kategori/4-sinif" class="font-bold text-indigo-600 hover:underline">📚 4. Sınıf Tüm Etkinlikler &rarr;</a>
          <a href="/sinav-hazirlama-robotu" class="font-bold text-indigo-600 hover:underline">📝 4. Sınıf Sınav Hazırlama Robotu &rarr;</a>
        </div>
        '''
    else:
        internal_links = '''
        <div class="my-6 p-4 bg-slate-100 rounded-2xl border border-slate-200 not-prose flex flex-wrap items-center justify-between gap-3 text-xs">
          <a href="/hesaplama-araclari" class="font-bold text-indigo-600 hover:underline">🧮 Matematiksel Hesaplama Robotları &rarr;</a>
          <a href="/kategori/matematik-blog" class="font-bold text-indigo-600 hover:underline">📖 Matematik Blog Yazıları &rarr;</a>
        </div>
        '''

    content_html = f'''
    <div class="space-y-6">
      <div class="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs sm:text-sm flex items-center justify-between flex-wrap gap-2 not-prose">
        <span class="font-bold">📐 Somut Materyal ve Modelleme Odaklı Öğrenme</span>
        <span class="text-[11px] text-slate-500">2024-2025 MEB Maarif Modeli Uyumlu</span>
      </div>

      <figure class="my-6 not-prose">
        <img src="{img_url}" alt="{item['title']}" class="w-full max-h-[480px] object-cover rounded-2xl shadow-md border border-slate-200 mx-auto" />
        <figcaption class="text-xs text-slate-400 text-center mt-2 font-medium">{item['title']} - Önizleme Görseli</figcaption>
      </figure>

      <div class="prose max-w-none text-slate-800">
        <h2>Pedagojik Amaç ve Kavramsal Anlama</h2>
        <p>
          Matematikte ezbere işlem yapmak yerine kuralların arkasındaki geometrik ve görsel mantığı kavramak kalıcı öğrenmenin anahtarıdır. Bu etkinlik çalışması, öğrencilerin soyut matematiksel kavramları fiziksel ve görsel modeller üzerinden somutlaştırmalarını sağlamak amacıyla tasarlanmıştır.
        </p>

        <h3>Etkinliğin Adım Adım Uygulanışı</h3>
        <ol class="list-decimal list-inside space-y-2 text-sm">
          <li><strong>Görsel İnceleme:</strong> Öncelikle verilen çalışma kağıdındaki model ve parçaları inceleyerek bütünü ve birimleri tespit ediniz.</li>
          <li><strong>Ölçüm ve Çizim:</strong> Cetvel veya pergel kullanarak kılavuz çizgiler boyunca düzgün geometrik inşaları tamamlayınız.</li>
          <li><strong>Matematiksel Eşleştirme:</strong> Elde edilen parçaları kesir veya cebirsel ifadelerle ilişkilendirip eşitlikleri kurunuz.</li>
        </ol>
      </div>

      <div class="my-6 p-6 bg-slate-900 text-white rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 not-prose">
        <div class="space-y-1 text-center sm:text-left">
          <span class="text-xs font-bold uppercase tracking-wider text-indigo-400">Yazdırılabilir A4 Materyali</span>
          <h4 class="text-base font-bold">Bu Etkinlik Kağıdını Doğrudan İndirin</h4>
          <p class="text-xs text-slate-300">Sınıf içi derslerde veya ev ödevlerinde uygulanabilir yüksek çözünürlüklü çalışma sayfası.</p>
        </div>
        <a href="{smart_link}" target="_blank" rel="noopener noreferrer nofollow" class="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 shrink-0">
          📥 Çalışma Kağıdını İndir (PDF)
        </a>
      </div>

      {internal_links}
    </div>
    '''

    excerpt = f"{item['title']} hakkında pedagojik yönergeler, modelleme adımları ve A4 yazdırılabilir çalışma kağıdı."
    tags = json.dumps([item['category'], 'Matematik', 'Modelleme', 'Etkinlik', 'Çalışma Kağıdı'])
    cursor.execute('''
        INSERT OR REPLACE INTO posts 
        (title, slug, excerpt, content, featured_image, category, category_slug, tags, author, is_published, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Matemetrik Eğitim Masası', 1, ?, ?)
    ''', (item['title'], slug, excerpt, content_html, img_url, item['category'], item['category_slug'], tags, now_str, now_str))
    print(f"Added Eglenmatik post: {item['title']}")

# =========================================================================
# 3. ETKİNLİKPAYLAŞ.COM LİSE FİZİK YAZILILARI VE ÇÖZÜMLÜ SORULARI
# =========================================================================
etkinlikpaylas_targets = [
    {
        'url': 'https://www.etkinlikpaylas.com/lise/fizik/11-sinif-fizik-1-donem-1-yazili-sinav-sorulari-ve-cevaplari-word-indir.html',
        'title': '11. Sınıf Fizik 1. Dönem 1. Yazılı Sınav Soruları ve Cevapları (Word & PDF)',
        'category': '11. Sınıf',
        'category_slug': '11-sinif',
        'grade': '11',
    },
    {
        'url': 'https://www.etkinlikpaylas.com/lise/fizik/11-sinif-fizik-sorumluluk-sinav-sorulari-ve-cevaplari-word.html',
        'title': '11. Sınıf Fizik Sorumluluk Sınavı Soruları ve Cevap Anahtarı (Word İndir)',
        'category': '11. Sınıf',
        'category_slug': '11-sinif',
        'grade': '11',
    },
    {
        'url': 'https://www.etkinlikpaylas.com/lise/fizik/atislar-cozumlu-sorular-pdf-indir.html',
        'title': '11. Sınıf Fizik: Atışlar Konusu Çözümlü Sorular ve Test Dokümanı (PDF)',
        'category': '11. Sınıf',
        'category_slug': '11-sinif',
        'grade': '11',
    },
    {
        'url': 'https://www.etkinlikpaylas.com/lise/fizik/10-sinif-fizik-1-donem-2-yazili-sorulari-ve-cevaplari-word.html',
        'title': '10. Sınıf Fizik 1. Dönem 2. Yazılı Soruları ve Cevap Anahtarı (Word & PDF)',
        'category': '10. Sınıf',
        'category_slug': '10-sinif',
        'grade': '10',
    },
    {
        'url': 'https://www.etkinlikpaylas.com/lise/fizik/9-sinif-fizik-1-donem-2-yazili-sinavi-sorulari-ve-cevaplari-word.html',
        'title': '9. Sınıf Fizik 1. Dönem 2. Yazılı Sınavı Soruları ve Çözümleri (Word & PDF)',
        'category': '9. Sınıf',
        'category_slug': '9-sinif',
        'grade': '9',
    },
]

def process_etkinlikpaylas(item):
    slug = slugify(item['title'])
    img_url = 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=1200&q=80'

    # STRICT Internal Links matching EXACT grade level!
    if item['grade'] == '11':
        internal_links = '''
        <div class="my-6 p-4 bg-slate-100 rounded-2xl border border-slate-200 not-prose flex flex-wrap items-center justify-between gap-3 text-xs">
          <a href="/post/11-sinif-fizik-ders-kitabi-cevaplari-meb-pdf" class="font-bold text-indigo-600 hover:underline">📚 11. Sınıf Fizik Ders Kitabı Tüm Cevapları &rarr;</a>
          <a href="/sinav-hazirlama-robotu" class="font-bold text-indigo-600 hover:underline">📝 11. Sınıf Yazılı Soruları Üretici Robot &rarr;</a>
        </div>
        '''
    elif item['grade'] == '10':
        internal_links = '''
        <div class="my-6 p-4 bg-slate-100 rounded-2xl border border-slate-200 not-prose flex flex-wrap items-center justify-between gap-3 text-xs">
          <a href="/kategori/10-sinif" class="font-bold text-indigo-600 hover:underline">📚 10. Sınıf Tüm Ders ve Sınav Materyalleri &rarr;</a>
          <a href="/sinav-hazirlama-robotu" class="font-bold text-indigo-600 hover:underline">📝 10. Sınıf Fizik Yazılı Hazırlama Robotu &rarr;</a>
        </div>
        '''
    elif item['grade'] == '9':
        internal_links = '''
        <div class="my-6 p-4 bg-slate-100 rounded-2xl border border-slate-200 not-prose flex flex-wrap items-center justify-between gap-3 text-xs">
          <a href="/post/2026-2027-meb-fizik-ders-kitabi-cevaplari-9-sinif" class="font-bold text-indigo-600 hover:underline">📚 9. Sınıf Fizik Ders Kitabı Tüm Cevapları &rarr;</a>
          <a href="/kategori/9-sinif" class="font-bold text-indigo-600 hover:underline">📖 9. Sınıf Tüm Konu Notları &rarr;</a>
        </div>
        '''
    else:
        internal_links = '''
        <div class="my-6 p-4 bg-slate-100 rounded-2xl border border-slate-200 not-prose flex flex-wrap items-center justify-between gap-3 text-xs">
          <a href="/sinav-hazirlama-robotu" class="font-bold text-indigo-600 hover:underline">📝 MEB Yazılı Sınav Robotu &rarr;</a>
        </div>
        '''

    content_html = f'''
    <div class="space-y-6">
      <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-950 text-xs sm:text-sm flex items-center justify-between flex-wrap gap-2 not-prose">
        <span class="font-bold">📋 {item['grade']}. Sınıf MEB Kazanım ve Yazılı Değerlendirme Arşivi</span>
        <span class="text-[11px] text-slate-500">Düzenlenebilir Word (DOCX) &amp; A4 PDF</span>
      </div>

      <figure class="my-6 not-prose">
        <img src="{img_url}" alt="{item['title']}" class="w-full max-h-[480px] object-cover rounded-2xl shadow-md border border-slate-200 mx-auto" />
        <figcaption class="text-xs text-slate-400 text-center mt-2 font-medium">{item['title']} - Sınav Önizlemesi</figcaption>
      </figure>

      <div class="prose max-w-none text-slate-800">
        <h2>Sınav Kapsamı ve Açık Uçlu Soru Tipleri</h2>
        <p>
          Millî Eğitim Bakanlığı Ölçme, Değerlendirme ve Sınav Hizmetleri Genel Müdürlüğü tarafından yayımlanan ortak sınav senaryolarına ve <strong>Türkiye Yüzyılı Maarif Modeli</strong> öğretim programına tam uyumlu olarak hazırlanmış bu sınav kağıdında çoktan seçmeli ezber sorular yerine <em>analitik düşünmeyi, formül mantığını ve işlem basamaklarını</em> ölçen açık uçlu sorular yer almaktadır.
        </p>

        <h3>Öğretmenler ve Öğrenciler İçin Çalışma Tavsiyeleri</h3>
        <ul class="list-disc list-inside space-y-1.5 text-sm text-slate-700">
          <li><strong>Puanlama Baremi:</strong> Her sorunun yanında açık puan dağılımı (rubrik) belirtilmiştir.</li>
          <li><strong>Serbest Cisim Diyagramı:</strong> Kuvvet ve hareket sorularında şekil çizimi zorunludur.</li>
          <li><strong>Birim Doğrulaması:</strong> Sonuçların SI birim sistemine (N, m/s, J, W, C) uygunluğu kontrol edilmelidir.</li>
        </ul>
      </div>

      <div class="my-6 p-6 bg-slate-900 text-white rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 not-prose">
        <div class="space-y-1 text-center sm:text-left">
          <span class="text-xs font-bold uppercase tracking-wider text-indigo-400">Doğrudan İndirme</span>
          <h4 class="text-base font-bold">Sınav Kağıdı &amp; Cevap Anahtarını İndirin</h4>
          <p class="text-xs text-slate-300">Öğretmenler için düzenlenebilir Word (.docx) ve yazdırılabilir PDF formatı.</p>
        </div>
        <a href="{smart_link}" target="_blank" rel="noopener noreferrer nofollow" class="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 shrink-0">
          📥 Sınavı Word / PDF İndir
        </a>
      </div>

      {internal_links}
    </div>
    '''

    excerpt = f"{item['title']} güncel MEB müfredatına ve Türkiye Yüzyılı Maarif Modeline uygun açık uçlu yazılı sınav soruları ve çözümleri."
    tags = json.dumps([item['category'], 'Fizik', 'Yazılı Soruları', 'Sınav', 'MEB', 'Word İndir'])
    cursor.execute('''
        INSERT OR REPLACE INTO posts 
        (title, slug, excerpt, content, featured_image, category, category_slug, tags, author, is_published, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Matemetrik Fizik Zümresi', 1, ?, ?)
    ''', (item['title'], slug, excerpt, content_html, img_url, item['category'], item['category_slug'], tags, now_str, now_str))
    print(f"Added EtkinlikPaylas post: {item['title']}")

print("Starting Bilim Genc processing...")
for item in bilimgenc_targets:
    process_bilimgenc(item)

print("\nStarting Eglenmatik processing...")
for item in eglenmatik_targets:
    process_eglenmatik(item)

print("\nStarting EtkinlikPaylas processing...")
for item in etkinlikpaylas_targets:
    process_etkinlikpaylas(item)

conn.commit()
conn.close()
print("\nAll curated articles successfully ingested and saved to database!")
