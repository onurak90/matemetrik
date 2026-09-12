import os
import re
import sys
import json
import sqlite3
import hashlib
import time
import urllib.request
import urllib.parse
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor, as_completed

DB_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'matemetrik.db')
UPLOADS_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'uploads')
os.makedirs(UPLOADS_DIR, exist_ok=True)
os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute('''
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
        author TEXT DEFAULT 'Matemetrik',
        views INTEGER DEFAULT 0,
        is_published INTEGER DEFAULT 1,
        created_at TEXT,
        updated_at TEXT
    )
    ''')
    cur.execute('''
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        icon TEXT,
        color TEXT
    )
    ''')
    cur.execute('''
    CREATE TABLE IF NOT EXISTS redirects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        source_path TEXT UNIQUE NOT NULL,
        target_path TEXT NOT NULL,
        status_code INTEGER DEFAULT 301
    )
    ''')
    cur.execute('''
    CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT
    )
    ''')
    conn.commit()
    return conn

def make_clean_slug(s):
    # Wix specific fixes like i-lk -> ilk, i-cin -> icin, i-fadeler -> ifadeler
    s = re.sub(r'i-([a-zğüşıöç])', r'i\1', s)
    tr_map = str.maketrans("çğıöşüÇĞİÖŞÜ", "cgiosuCGIOSU")
    s = s.translate(tr_map)
    s = s.lower()
    s = re.sub(r'[^a-z0-9\s-]', '', s)
    s = re.sub(r'[\s-]+', '-', s).strip('-')
    return s or 'post'

def download_image(img_url):
    if not img_url or not img_url.startswith('http'):
        return img_url
    
    # Strip Wix resizing query/params if present to get high res original
    clean_wix_url = img_url
    if 'static.wixstatic.com/media/' in img_url:
        m = re.search(r'(https://static\.wixstatic\.com/media/[^/\s\?]+)', img_url)
        if m:
            clean_wix_url = m.group(1)

    ext = 'jpg'
    lower_url = clean_wix_url.lower()
    if '.png' in lower_url:
        ext = 'png'
    elif '.webp' in lower_url:
        ext = 'webp'
    elif '.svg' in lower_url:
        ext = 'svg'
    elif '.jpeg' in lower_url:
        ext = 'jpeg'

    url_hash = hashlib.md5(clean_wix_url.encode('utf-8')).hexdigest()[:12]
    filename = f"{url_hash}.{ext}"
    local_path = os.path.join(UPLOADS_DIR, filename)
    public_url = f"/uploads/{filename}"

    if os.path.exists(local_path) and os.path.getsize(local_path) > 500:
        return public_url

    try:
        req = urllib.request.Request(clean_wix_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=12) as resp:
            content = resp.read()
            if len(content) > 200:
                with open(local_path, 'wb') as f:
                    f.write(content)
                return public_url
    except Exception:
        pass
    return clean_wix_url

def parse_post_html(html, original_url):
    soup = BeautifulSoup(html, 'html.parser')
    
    # LD+JSON
    ld_info = {}
    for script in soup.find_all('script', {'type': 'application/ld+json'}):
        try:
            d = json.loads(script.string)
            if d.get('@type') == 'BlogPosting':
                ld_info = d
                break
        except:
            pass

    title = ld_info.get('headline')
    if not title:
        t_el = soup.find(attrs={'data-hook': 'post-title'})
        title = t_el.get_text().strip() if t_el else (soup.title.string if soup.title else 'Başlıksız Yazı')
    
    title = re.sub(r'\s*\|\s*matemetrik\.com.*$', '', title, flags=re.IGNORECASE).strip()
    
    date_published = ld_info.get('datePublished', '')
    if not date_published:
        d_el = soup.find(attrs={'data-hook': 'time-ago'})
        date_published = d_el.get_text().strip() if d_el else time.strftime('%Y-%m-%dT%H:%M:%SZ')
        
    date_modified = ld_info.get('dateModified', date_published)
    author = 'Cavenaghi'
    if isinstance(ld_info.get('author'), dict) and ld_info.get('author').get('name'):
        author = ld_info.get('author').get('name')
        
    description = ld_info.get('description', '')
    
    featured_img_url = ''
    if isinstance(ld_info.get('image'), dict):
        featured_img_url = ld_info.get('image', {}).get('url', '')
    elif isinstance(ld_info.get('image'), str):
        featured_img_url = ld_info.get('image')

    tags = []
    tag_cloud = soup.find(attrs={'data-hook': 'tag-cloud-root'})
    if tag_cloud:
        tags = [a.get_text().strip() for a in tag_cloud.find_all('a') if a.get_text().strip()]

    content_el = soup.find(attrs={'data-hook': 'post-description'})
    clean_html_parts = []
    
    if content_el:
        for block in content_el.find_all(['h1', 'h2', 'h3', 'h4', 'p', 'table', 'figure', 'ul', 'ol', 'blockquote', 'hr']):
            if block.parent and block.parent.name in ['table', 'thead', 'tbody', 'tr', 'td', 'th', 'ul', 'ol', 'figure']:
                continue
            
            if block.name == 'figure':
                img_url = None
                alt = ''
                wow = block.find('wow-image')
                if wow and wow.get('data-image-info'):
                    try:
                        info = json.loads(wow.get('data-image-info'))
                        uri = info.get('imageData', {}).get('uri')
                        if uri:
                            img_url = f"https://static.wixstatic.com/media/{uri}"
                    except:
                        pass
                if not img_url:
                    img = block.find('img')
                    if img:
                        img_url = img.get('src') or img.get('data-src')
                        alt = img.get('alt', '')
                if img_url:
                    local_img = download_image(img_url)
                    caption = block.find('figcaption')
                    cap_text = caption.get_text().strip() if caption else ''
                    clean_html_parts.append(
                        f'<figure class="my-6 text-center">'
                        f'<img src="{local_img}" alt="{alt}" class="rounded-xl shadow-md mx-auto max-w-full h-auto" loading="lazy" />'
                        + (f'<figcaption class="text-sm text-gray-500 mt-2">{cap_text}</figcaption>' if cap_text else '')
                        + '</figure>'
                    )
            elif block.name in ['h1', 'h2']:
                text = block.get_text().strip()
                if text:
                    clean_html_parts.append(f'<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">{text}</h2>')
            elif block.name in ['h3', 'h4']:
                text = block.get_text().strip()
                if text:
                    clean_html_parts.append(f'<h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">{text}</h3>')
            elif block.name == 'p':
                text = block.get_text().strip()
                if text:
                    p_soup = BeautifulSoup(str(block), 'html.parser')
                    for a in p_soup.find_all('a'):
                        a['class'] = 'text-indigo-600 hover:text-indigo-800 underline font-medium'
                    clean_html_parts.append(f'<p class="text-gray-700 leading-relaxed mb-4">{p_soup.p.decode_contents()}</p>')
            elif block.name == 'table':
                table_soup = BeautifulSoup(str(block), 'html.parser')
                clean_html_parts.append(
                    f'<div class="overflow-x-auto my-6 border border-gray-200 rounded-lg shadow-sm">'
                    f'<table class="min-w-full divide-y divide-gray-200 text-sm text-gray-800">{table_soup.table.decode_contents()}</table>'
                    f'</div>'
                )
            elif block.name in ['ul', 'ol']:
                list_soup = BeautifulSoup(str(block), 'html.parser')
                tag = block.name
                cls = "list-disc list-inside my-4 space-y-2 text-gray-700" if tag == 'ul' else "list-decimal list-inside my-4 space-y-2 text-gray-700"
                clean_html_parts.append(f'<{tag} class="{cls}">{list_soup.find(tag).decode_contents()}</{tag}>')
            elif block.name == 'blockquote':
                text = block.get_text().strip()
                if text:
                    clean_html_parts.append(f'<blockquote class="border-l-4 border-indigo-500 pl-4 py-2 italic text-gray-600 my-4 bg-indigo-50/50 rounded-r">{text}</blockquote>')
            elif block.name == 'hr':
                clean_html_parts.append('<hr class="my-6 border-gray-200" />')

    final_content = '\n'.join(clean_html_parts)
    if not final_content and content_el:
        final_content = str(content_el)

    local_featured = download_image(featured_img_url) if featured_img_url else ''

    category = "Matematik Blog"
    category_slug = "matematik-blog"
    
    cat_rules = [
        (r'10\.\s*sınıf|10-sinif', '10. Sınıf', '10-sinif'),
        (r'9\.\s*sınıf|9-sinif', '9. Sınıf', '9-sinif'),
        (r'11\.\s*sınıf|11-sinif', '11. Sınıf', '11-sinif'),
        (r'12\.\s*sınıf|12-sinif', '12. Sınıf', '12-sinif'),
        (r'1\.\s*sınıf|1-sinif', '1. Sınıf', '1-sinif'),
        (r'2\.\s*sınıf|2-sinif', '2. Sınıf', '2-sinif'),
        (r'3\.\s*sınıf|3-sinif', '3. Sınıf', '3-sinif'),
        (r'4\.\s*sınıf|4-sinif', '4. Sınıf', '4-sinif'),
        (r'5\.\s*sınıf|5-sinif', '5. Sınıf', '5-sinif'),
        (r'6\.\s*sınıf|6-sinif', '6. Sınıf', '6-sinif'),
        (r'7\.\s*sınıf|7-sinif', '7. Sınıf', '7-sinif'),
        (r'8\.\s*sınıf|8-sinif', '8. Sınıf', '8-sinif'),
        (r'ayt|tyt|yks', 'YKS & Sınavlar', 'yks'),
        (r'ders kitabı|cevapları', 'MEB Ders Kitabı Cevapları', 'meb-ders-kitabi-cevaplari'),
        (r'kitap özeti|roman özeti', 'Kitap Özetleri', 'kitap-ozet'),
        (r'öğretmen|yıllık plan|bep planı', 'Öğretmen', 'ogretmen'),
        (r'rehberlik|çalışma planı|konsantrasyon|hafıza', 'Eğitim Rehberliği', 'egitim-rehberligi')
    ]
    
    check_text = (title + ' ' + ' '.join(tags) + ' ' + original_url).lower()
    for pattern, c_name, c_slug in cat_rules:
        if re.search(pattern, check_text):
            category = c_name
            category_slug = c_slug
            break

    old_slug = original_url.split('/post/')[-1]
    clean_slug = make_clean_slug(old_slug)

    return {
        'title': title,
        'slug': clean_slug,
        'old_slug': old_slug,
        'excerpt': description or (title + ' hakkında detaylı ve güncel bilgiler.'),
        'content': final_content,
        'featured_image': local_featured,
        'category': category,
        'category_slug': category_slug,
        'tags': json.dumps(tags, ensure_ascii=False),
        'author': author,
        'views': 120 + (len(title) * 7) % 500,
        'is_published': 1,
        'created_at': date_published,
        'updated_at': date_modified
    }

def fetch_and_process_url(url, sitemap_featured_img=None):
    parts = urllib.parse.urlsplit(url)
    enc = urllib.parse.urlunsplit((parts.scheme, parts.netloc, urllib.parse.quote(parts.path), parts.query, parts.fragment))
    req = urllib.request.Request(enc, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'})
    
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=12) as resp:
                html = resp.read().decode('utf-8', errors='ignore')
                res = parse_post_html(html, url)
                if not res.get('featured_image') and sitemap_featured_img:
                    res['featured_image'] = download_image(sitemap_featured_img)
                return res
        except Exception:
            time.sleep(1)
    return None

def main():
    print("=== Matemetrik Wix -> Next.js Migration Starting ===")
    conn = init_db()
    
    categories_data = [
        ('1. Sınıf', '1-sinif', '1. sınıf matematik dersleri, etkinlikler ve MEB yıllık planları', 'BookOpen', 'amber'),
        ('2. Sınıf', '2-sinif', '2. sınıf matematik kazanımları, konu anlatımları ve testler', 'BookOpen', 'amber'),
        ('3. Sınıf', '3-sinif', '3. sınıf matematik müfredatı ve çözümlü alıştırmalar', 'BookOpen', 'amber'),
        ('4. Sınıf', '4-sinif', '4. sınıf matematik ders kitabı cevapları ve sınav hazırlık', 'BookOpen', 'amber'),
        ('5. Sınıf', '5-sinif', '5. sınıf ortaokul matematik temel kavramlar ve sorular', 'Compass', 'blue'),
        ('6. Sınıf', '6-sinif', '6. sınıf matematik konu anlatımı ve yeni nesil testler', 'Compass', 'blue'),
        ('7. Sınıf', '7-sinif', '7. sınıf rasyonel sayılar, cebir ve denklemler', 'Compass', 'blue'),
        ('8. Sınıf', '8-sinif', '8. sınıf LGS matematik hazırlık ve çıkmış soru analizleri', 'Compass', 'blue'),
        ('9. Sınıf', '9-sinif', '9. sınıf lise matematik mantık, kümeler ve denklemler', 'GraduationCap', 'indigo'),
        ('10. Sınıf', '10-sinif', '10. sınıf MEB matematik ders kitabı çözümleri ve yazılı soruları', 'GraduationCap', 'indigo'),
        ('11. Sınıf', '11-sinif', '11. sınıf trigonometri, fonksiyonlar ve analitik geometri', 'GraduationCap', 'indigo'),
        ('12. Sınıf', '12-sinif', '12. sınıf AYT matematik, logaritma, diziler ve limit', 'GraduationCap', 'indigo'),
        ('MEB Ders Kitabı Cevapları', 'meb-ders-kitabi-cevaplari', 'Tüm sınıflar için güncel MEB matematik ders kitabı sayfa sayfa çözümleri', 'CheckCircle', 'emerald'),
        ('Matematik Blog', 'matematik-blog', 'Matematik tarihi, ünlü matematikçiler, ilginç teoremler ve makaleler', 'Sparkles', 'purple'),
        ('Eğitim Rehberliği', 'egitim-rehberligi', 'Verimli ders çalışma teknikleri, motivasyon ve sınav taktikleri', 'Target', 'rose'),
        ('Kitap Özetleri', 'kitap-ozet', 'Edebiyat ve eğitim dünyasından özenle hazırlanmış kitap özetleri', 'FileText', 'cyan'),
        ('Öğretmen', 'ogretmen', 'Öğretmenler için yıllık planlar, BEP şablonları ve dijital araçlar', 'Award', 'orange'),
        ('YKS & Sınavlar', 'yks', 'TYT, AYT, LGS hazırlık rehberleri ve konu dağılımları', 'TrendingUp', 'red')
    ]
    
    cur = conn.cursor()
    for name, slug, desc, icon, color in categories_data:
        cur.execute('''
            INSERT INTO categories (name, slug, description, icon, color)
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT(slug) DO UPDATE SET
                name=excluded.name,
                description=excluded.description,
                icon=excluded.icon,
                color=excluded.color
        ''', (name, slug, desc, icon, color))
    conn.commit()
    print("Categories initialized.")

    cur.execute("INSERT OR REPLACE INTO settings (key, value) VALUES ('site_name', 'Matemetrik')")
    cur.execute("INSERT OR REPLACE INTO settings (key, value) VALUES ('site_description', 'Matematik, MEB ders kitabı cevapları, eğitim rehberliği ve öğretmen araçları platformu')")
    cur.execute("INSERT OR REPLACE INTO settings (key, value) VALUES ('site_author', 'Cavenaghi')")
    conn.commit()

    sitemap_url = 'https://www.matemetrik.com/blog-posts-sitemap.xml'
    print(f"Fetching sitemap: {sitemap_url}")
    req = urllib.request.Request(sitemap_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp:
        xml_data = resp.read()
    
    root = BeautifulSoup(xml_data, 'xml')
    items = []
    for u in root.find_all('url'):
        loc = u.find('loc')
        if loc and loc.text:
            img = u.find('image:loc')
            img_url = img.text if img else None
            items.append((loc.text.strip(), img_url))
            
    print(f"Found {len(items)} blog post URLs in sitemap.")

    inserted_count = 0
    redirect_count = 0
    seen_slugs = set()

    def process_item(item):
        post_url, img_url = item
        return fetch_and_process_url(post_url, img_url)

    print("Crawling and downloading posts (16 threads)...")
    batch_size = 25
    with ThreadPoolExecutor(max_workers=16) as executor:
        futures = {executor.submit(process_item, item): item for item in items}
        for idx, future in enumerate(as_completed(futures), 1):
            res = future.result()
            if not res:
                continue
            
            slug = res['slug']
            if slug in seen_slugs:
                slug = f"{slug}-{idx}"
                res['slug'] = slug
            seen_slugs.add(slug)

            try:
                cur.execute('''
                INSERT INTO posts (
                    title, slug, old_slug, excerpt, content, featured_image,
                    category, category_slug, tags, author, views, is_published,
                    created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(slug) DO UPDATE SET
                    title=excluded.title,
                    excerpt=excluded.excerpt,
                    content=excluded.content,
                    featured_image=excluded.featured_image,
                    category=excluded.category,
                    category_slug=excluded.category_slug,
                    tags=excluded.tags,
                    updated_at=excluded.updated_at
                ''', (
                    res['title'], res['slug'], res['old_slug'], res['excerpt'],
                    res['content'], res['featured_image'], res['category'],
                    res['category_slug'], res['tags'], res['author'],
                    res['views'], res['is_published'], res['created_at'], res['updated_at']
                ))
                inserted_count += 1
                
                if res['old_slug'] and res['old_slug'] != res['slug']:
                    old_path = f"/post/{res['old_slug']}"
                    new_path = f"/post/{res['slug']}"
                    cur.execute('''
                    INSERT OR IGNORE INTO redirects (source_path, target_path, status_code)
                    VALUES (?, ?, 301)
                    ''', (old_path, new_path))
                    redirect_count += 1
            except Exception as e:
                print(f"Error inserting {slug}: {e}")

            if idx % batch_size == 0 or idx == len(items):
                conn.commit()
                print(f"Progress: {idx}/{len(items)} posts processed ({inserted_count} inserted, {redirect_count} redirects mapped)...")

    conn.commit()
    conn.close()
    print(f"=== Migration complete! {inserted_count} posts inserted, {redirect_count} redirects configured. ===")

if __name__ == '__main__':
    main()
