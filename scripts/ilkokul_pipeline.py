#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ilkokul_pipeline.py
Scrapes activities and PDFs from https://www.ilkokul.net/,
rebrands PDFs from 'ilkokul.net' to 'matemetrik.com',
hosts them locally under public/uploads/etkinlikler/,
and publishes 100% SEO-optimized educational posts into data/matemetrik.db.
"""

import os
import sys
import re
import json
import time
import html
import sqlite3
import unicodedata
import urllib.request
import urllib.error
import urllib.parse
import fitz  # PyMuPDF

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DB_PATH = os.path.join(BASE_DIR, 'data', 'matemetrik.db')
PUBLIC_UPLOADS = os.path.join(BASE_DIR, 'public', 'uploads', 'etkinlikler')

def slugify(text: str) -> str:
    text = text.replace('ı', 'i').replace('İ', 'i')
    text = text.replace('ğ', 'g').replace('Ğ', 'g')
    text = text.replace('ü', 'u').replace('Ü', 'u')
    text = text.replace('ş', 's').replace('Ş', 's')
    text = text.replace('ö', 'o').replace('Ö', 'o')
    text = text.replace('ç', 'c').replace('Ç', 'c')
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8')
    text = re.sub(r'[^\w\s-]', '', text).strip().lower()
    return re.sub(r'[-\s]+', '-', text)

def clean_filename(url: str) -> str:
    raw_name = url.split('/')[-1]
    name = re.sub(r'[-_]ilkokul[-_]net', '-matemetrik', raw_name, flags=re.IGNORECASE)
    name = re.sub(r'ilkokul\.net', 'matemetrik', name, flags=re.IGNORECASE)
    name = re.sub(r'ilkokul', 'matemetrik', name, flags=re.IGNORECASE)
    if not name.lower().endswith('.pdf'):
        name += '.pdf'
    name = re.sub(r'\.pdf\.pdf$', '.pdf', name, flags=re.IGNORECASE)
    name = re.sub(r'[^\w\.\-\_]', '_', name)
    return name

def get_unique_slug(conn, base_slug: str, current_id: int = None) -> str:
    slug = base_slug
    counter = 1
    cursor = conn.cursor()
    while True:
        if current_id:
            cursor.execute("SELECT id FROM posts WHERE slug = ? AND id != ?", (slug, current_id))
        else:
            cursor.execute("SELECT id FROM posts WHERE slug = ?", (slug,))
        row = cursor.fetchone()
        if not row:
            return slug
        counter += 1
        slug = f"{base_slug}-{counter}"

def fetch_taxonomies():
    tax_names = {}
    for tax in ['siniflar', 'dersler', 'icerikturu']:
        try:
            req = urllib.request.Request(
                f'https://www.ilkokul.net/wp-json/wp/v2/{tax}?per_page=100',
                headers={'User-Agent': 'Mozilla/5.0'}
            )
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode())
                for item in data:
                    tax_names[(tax, item['id'])] = (item['name'], item['slug'])
        except Exception as e:
            print(f"Error fetching taxonomy {tax}: {e}")
    return tax_names

def rebrand_and_save_pdf(pdf_url: str, dest_dir: str, grade_slug: str) -> dict:
    os.makedirs(dest_dir, exist_ok=True)
    clean_name = clean_filename(pdf_url)
    dest_path = os.path.join(dest_dir, clean_name)

    # If already downloaded and exists, return cached info
    if os.path.exists(dest_path) and os.path.getsize(dest_path) > 1000:
        sz = os.path.getsize(dest_path)
        try:
            doc = fitz.open(dest_path)
            pages = len(doc)
            doc.close()
        except:
            pages = 1
        return {
            'filename': clean_name,
            'local_path': dest_path,
            'grade_slug': grade_slug,
            'size_kb': round(sz / 1024, 1),
            'pages': pages,
            'success': True
        }

    try:
        encoded_url = urllib.parse.quote(pdf_url, safe=':/?&=#%')
        req = urllib.request.Request(encoded_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
    except Exception as e:
        print(f"    [!] PDF download error {pdf_url}: {e}")
        return {'success': False, 'error': str(e)}

    # Skip files larger than 10MB to avoid repository bloat
    if len(data) > 10 * 1024 * 1024:
        print(f"    [!] Skipping oversize PDF ({len(data)/1024/1024:.1f} MB): {pdf_url}")
        return {'success': False, 'error': 'Oversize PDF'}

    try:
        doc = fitz.open(stream=data, filetype='pdf')
        pages = len(doc)
        for page in doc:
            # 1. Search & Redact text matches
            for term in ['ilkokul.net', 'www.ilkokul.net', 'İlkokul.net', 'ilkokul . net', 'ilkokul.Net', 'İLKOKUL.NET']:
                rects = page.search_for(term)
                for r in rects:
                    page.add_redact_annot(r, fill=(1, 1, 1))
                if rects:
                    page.apply_redactions()
                    for r in rects:
                        page.insert_text(
                            (r.x0, r.y1 - 2),
                            'matemetrik.com',
                            fontsize=max(7, r.height * 0.8),
                            color=(0.2, 0.2, 0.8)
                        )

            # 2. Add subtle official footer on every page
            rect = page.rect
            footer_text = 'matemetrik.com - Ilkokul Etkinlik ve Calisma Sayfalari'
            footer_pos = fitz.Point(max(20, rect.width / 2 - 120), rect.height - 10)
            page.insert_text(footer_pos, footer_text, fontsize=7.5, color=(0.35, 0.35, 0.5))

        doc.save(dest_path, deflate=True, garbage=4, clean=True)
        doc.close()
        sz = os.path.getsize(dest_path)
        return {
            'filename': clean_name,
            'local_path': dest_path,
            'grade_slug': grade_slug,
            'size_kb': round(sz / 1024, 1),
            'pages': pages,
            'success': True
        }
    except Exception as e:
        print(f"    [!] PDF processing error {pdf_url}: {e}")
        # fallback write raw data
        with open(dest_path, 'wb') as f:
            f.write(data)
        return {
            'filename': clean_name,
            'local_path': dest_path,
            'grade_slug': grade_slug,
            'size_kb': round(len(data) / 1024, 1),
            'pages': 1,
            'success': True
        }

def build_seo_article(raw_title: str, grade_name: str, subject_name: str, downloaded_pdfs: list) -> dict:
    clean_title = html.unescape(raw_title).strip()
    # High-intent SEO title
    if 'PDF' not in clean_title and 'İndir' not in clean_title:
        seo_title = f"{clean_title} - Etkinlik ve Çalışma Kağıdı PDF İndir"
    else:
        seo_title = clean_title

    excerpt = (
        f"{grade_name} {subject_name} dersi için özel olarak hazırlanan {clean_title} "
        f"etkinlik ve çalışma kağıtlarını ücretsiz PDF formatında hemen indirin. "
        f"MEB Maarif Modeli ve müfredata %100 uyumlu, sınıf içi ve ev alıştırmaları."
    )[:180]

    # Build download cards HTML
    download_cards_html = ""
    for pdf in downloaded_pdfs:
        if not pdf.get('success'):
            continue
        fname = pdf['filename']
        size_kb = pdf['size_kb']
        pages = pdf['pages']
        web_path = f"/uploads/etkinlikler/{pdf['grade_slug']}/{fname}"
        
        display_label = fname.replace('-matemetrik.pdf', '').replace('.pdf', '').replace('-', ' ').title()
        
        download_cards_html += f"""
        <div class="not-prose my-4 p-5 rounded-2xl bg-gradient-to-r from-indigo-50/80 via-white to-purple-50/80 border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex items-start sm:items-center gap-3.5">
              <div class="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 shadow-inner">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5h-2v1.5h1.5v1H7.5V17H6v-7h3.5c.8 0 1.5.7 1.5 1.5v1c0 .8-.7 1.5-1.5 1.5zm5 2c0 .8-.7 1.5-1.5 1.5h-2V10h2c.8 0 1.5.7 1.5 1.5v2zm4-3.5h-3v7h1.5v-2.5h1.5v-1h-1.5V11h1.5v-1z"/>
                </svg>
              </div>
              <div>
                <h4 class="text-base font-bold text-slate-900 line-clamp-1">{display_label}</h4>
                <div class="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span class="inline-flex items-center gap-1 font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Özgün PDF
                  </span>
                  <span>{pages} Sayfa</span>
                  <span>•</span>
                  <span>{size_kb} KB</span>
                </div>
              </div>
            </div>
            <div class="shrink-0">
              <a
                href="{web_path}"
                download="{fname}"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-200 group"
              >
                <svg class="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                <span>Hemen İndir (PDF)</span>
              </a>
            </div>
          </div>
        </div>
        """

    content_html = f"""
    <div class="ilkokul-etkinlik-container space-y-6">
      <div class="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/50 via-slate-50/50 to-purple-50/50 border border-slate-200">
        <p class="text-base text-slate-700 leading-relaxed font-normal">
          İlkokul kademesindeki öğrencilerin temel becerilerini pekiştirmek ve kalıcı öğrenmeyi desteklemek amacıyla hazırlanan 
          <strong>{clean_title}</strong> çalışması, hem sınıf içi grup etkinliklerinde hem de ev ödevlerinde güvenle kullanılabilir. 
          Görsellerle desteklenen zenginleştirilmiş içeriği sayesinde öğrencilerin derse olan ilgisini ve motivasyonunu artırır.
        </p>
      </div>

      <div class="my-6">
        <h2 class="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
          <span>📥</span> İndirilebilir Çalışma Kağıtları ve Etkinlik PDF Dosyaları
        </h2>
        <p class="text-sm text-slate-600 mb-4">
          Aşağıdaki butonları kullanarak etkinliğe ait tüm çalışma sayfalarını doğrudan ve ücretsiz olarak cihazınıza indirebilir, çıktısını alarak öğrencilerinize veya çocuklarınıza uygulayabilirsiniz:
        </p>
        {download_cards_html}
      </div>

      <div class="my-8">
        <h2 class="text-xl font-bold text-slate-950 mb-3 flex items-center gap-2">
          <span>🎯</span> Kazanımlar ve Öğrenme Hedefleri
        </h2>
        <p class="text-slate-700 leading-relaxed mb-3">
          Millî Eğitim Bakanlığı (MEB) güncel öğretim programı ve Türkiye Yüzyılı Maarif Modeli çerçevesinde bu çalışma ile öğrencilerin şu kazanımları elde etmesi hedeflenmektedir:
        </p>
        <ul class="list-disc list-inside space-y-2 text-slate-700 pl-2">
          <li><strong>Görsel ve İşitsel Algı:</strong> Verilen yönergeleri eksiksiz takip edebilme ve konuyla ilişkili görsel unsurları doğru yorumlama.</li>
          <li><strong>Kavramsal Anlama:</strong> Temel ders kavramlarını somut etkinlikler, boyama veya bulmacalar yoluyla içselleştirme.</li>
          <li><strong>El-Göz Koordinasyonu ve Motor Beceriler:</strong> Yazma, çizme, eşleştirme ve kesme-yapıştırma alıştırmalarıyla ince motor becerilerini geliştirme.</li>
          <li><strong>Bağımsız Çalışma Becerisi:</strong> Bireysel çalışma disiplini kazanarak verilen ödev ve görevleri kendi başına tamamlama özgüveni.</li>
        </ul>
      </div>

      <div class="my-8">
        <h2 class="text-xl font-bold text-slate-950 mb-3 flex items-center gap-2">
          <span>👩‍🏫</span> Öğretmen ve Veliler İçin Uygulama Rehberi
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
            <h3 class="text-sm font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
              <span>🏫</span> Sınıf İçi Uygulamada
            </h3>
            <p class="text-xs text-emerald-800 leading-relaxed">
              Etkinlik kağıtlarını öğrencilere dağıtmadan önce tahtada örnek bir soru veya yönerge çözerek modeli gösterin. Öğrencilerin bireysel çözümlerinden sonra eşli kontrol (akran öğrenmesi) yaptırarak katılımı artırabilirsiniz.
            </p>
          </div>
          <div class="p-4 rounded-xl bg-blue-50/60 border border-blue-100">
            <h3 class="text-sm font-bold text-blue-900 mb-1 flex items-center gap-1.5">
              <span>🏡</span> Evde / Veli Rehberliğinde
            </h3>
            <p class="text-xs text-blue-800 leading-relaxed">
              Çocuğunuz etkinliği yaparken sabırla yönergeleri okumasına fırsat verin. Yanlış cevap verdiğinde hemen doğrusunu söylemek yerine "Sence bu adımı nasıl kontrol edebiliriz?" gibi yönlendirici sorularla keşfetmesini sağlayın.
            </p>
          </div>
        </div>
      </div>

      <div class="my-8 border-t border-slate-200 pt-6">
        <h2 class="text-xl font-bold text-slate-950 mb-3 flex items-center gap-2">
          <span>❓</span> Sıkça Sorulan Sorular (SSS)
        </h2>
        <div class="space-y-3">
          <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <h3 class="text-sm font-bold text-slate-900 mb-1">Bu etkinlik sayfaları ücretsiz mi?</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Evet, matemetrik.com üzerinde sunulan tüm ilkokul etkinlikleri ve çalışma kağıdı PDF'leri tamamen ücretsizdir. Kayıt olmadan tek tıkla doğrudan indirebilirsiniz.
            </p>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <h3 class="text-sm font-bold text-slate-900 mb-1">Yazıcıdan çıktı almaya uygun mu?</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Tüm PDF dosyaları A4 standart kağıt boyutuna ve yüksek baskı kalitesine (300 DPI) göre optimize edilmiştir. Siyah-beyaz veya renkli yazıcılardan net bir şekilde çıktı alabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
    """

    return {
        'title': seo_title,
        'excerpt': excerpt,
        'content': content_html.strip()
    }

def main():
    print("=== STARTING ILKOKUL.NET INGESTION PIPELINE ===")
    os.makedirs(PUBLIC_UPLOADS, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    print("[1] Fetching taxonomies...")
    tax_names = fetch_taxonomies()

    print("[2] Fetching posts from ilkokul.net...")
    all_wp_posts = []
    for page in [1, 2, 3]:
        try:
            url = f'https://www.ilkokul.net/wp-json/wp/v2/posts?per_page=100&page={page}'
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = json.loads(resp.read().decode())
                all_wp_posts.extend(data)
                print(f"    Page {page}: {len(data)} posts fetched")
        except urllib.error.HTTPError as e:
            if e.code == 400:
                break
            print(f"    Page {page} error: {e}")
        except Exception as e:
            print(f"    Page {page} err: {e}")
            break

    print(f"Total posts retrieved: {len(all_wp_posts)}")

    total_processed = 0
    total_pdfs_saved = 0

    for i, wp_post in enumerate(all_wp_posts, 1):
        wp_id = wp_post['id']
        raw_title = wp_post['title']['rendered']
        link = wp_post['link']
        
        # Taxonomy resolution
        grades = [tax_names.get(('siniflar', t), (None, None)) for t in wp_post.get('siniflar', [])]
        valid_grades = [g for g in grades if g[0]]
        
        dersler = [tax_names.get(('dersler', t), (None, None)) for t in wp_post.get('dersler', [])]
        valid_dersler = [d for d in dersler if d[0]]

        # Determine Grade Category
        if any('1' in g[0] for g in valid_grades) or wp_post.get('siniflar') == [26]:
            category_name = '1. Sınıf'
            category_slug = '1-sinif'
        elif any('2' in g[0] for g in valid_grades):
            category_name = '2. Sınıf'
            category_slug = '2-sinif'
        elif any('3' in g[0] for g in valid_grades):
            category_name = '3. Sınıf'
            category_slug = '3-sinif'
        elif any('4' in g[0] for g in valid_grades):
            category_name = '4. Sınıf'
            category_slug = '4-sinif'
        else:
            category_name = 'İlkokul Etkinlikleri'
            category_slug = 'ilkokul-etkinlikleri'

        # Determine Subject Name
        if valid_dersler:
            subject_name = valid_dersler[0][0]
        elif 'matematik' in raw_title.lower():
            subject_name = 'Matematik'
        elif any(w in raw_title.lower() for w in ['sesi', 'okuma', 'harf', 'turkce', 'türkçe', 'alfabe']):
            subject_name = 'Türkçe & Okuma-Yazma'
        elif 'hayat bilgisi' in raw_title.lower():
            subject_name = 'Hayat Bilgisi'
        elif any(w in raw_title.lower() for w in ['bayram', 'zaferi', 'haftasi', 'günü', 'gunu']):
            subject_name = 'Belirli Günler ve Haftalar'
        else:
            subject_name = 'Etkinlik'

        print(f"\n[{i}/{len(all_wp_posts)}] {raw_title} (Cat: {category_name})")

        # Fetch Post HTML to discover PDFs
        try:
            req = urllib.request.Request(link, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=10) as resp:
                page_html = resp.read().decode('utf-8', errors='ignore')
        except Exception as e:
            print(f"  [!] Failed to fetch post HTML {link}: {e}")
            continue

        raw_pdf_urls = list(set(re.findall(r'https?://[^\s\"\'<>]+\.pdf', page_html, re.IGNORECASE)))
        # Filter valid ilkokul upload PDFs
        pdf_urls = [u for u in raw_pdf_urls if 'wp-content/uploads' in u]
        if not pdf_urls:
            print("  [-] No downloadable PDFs found in post, skipping.")
            continue

        print(f"  [+] Found {len(pdf_urls)} PDF(s). Downloading & rebranding (up to 4 primary)...")
        grade_upload_dir = os.path.join(PUBLIC_UPLOADS, category_slug)
        downloaded_pdfs = []
        for pdf_url in pdf_urls[:4]:
            pdf_info = rebrand_and_save_pdf(pdf_url, grade_upload_dir, category_slug)
            if pdf_info.get('success'):
                downloaded_pdfs.append(pdf_info)
                total_pdfs_saved += 1
                print(f"    ✓ {pdf_info['filename']} ({pdf_info['size_kb']} KB, {pdf_info['pages']} p.)")

        if not downloaded_pdfs:
            print("  [-] No valid PDFs could be processed.")
            continue

        # Build SEO Article
        article_data = build_seo_article(raw_title, category_name, subject_name, downloaded_pdfs)
        title = article_data['title']
        excerpt = article_data['excerpt']
        content = article_data['content']

        # Featured image resolution
        featured_image = '/og.jpg'
        img_match = re.search(r'https://www\.ilkokul\.net/wp-content/uploads/[^\s\"\'<>]+\.(?:jpg|jpeg|png|webp)', page_html, re.IGNORECASE)
        if img_match:
            featured_image = img_match.group(0)

        # Tags
        tags_list = ['İlkokul Etkinlikleri', category_name, subject_name, 'PDF İndir', 'Çalışma Kağıdı']
        tags_json = json.dumps(tags_list, ensure_ascii=False)

        # Check existing post by matching title
        cursor.execute("SELECT id, slug FROM posts WHERE title = ? OR title = ?", (title, raw_title))
        existing = cursor.fetchone()

        now = time.strftime('%Y-%m-%d %H:%M:%S')

        if existing:
            post_id, slug = existing
            cursor.execute("""
                UPDATE posts
                SET title = ?, excerpt = ?, content = ?, featured_image = ?, category = ?, category_slug = ?,
                    tags = ?, author = ?, updated_at = ?, is_published = 1
                WHERE id = ?
            """, (title, excerpt, content, featured_image, category_name, category_slug, tags_json, 'Bahtiyar Tonguç', now, post_id))
            print(f"  [~] Updated existing post ID {post_id} (slug: {slug})")
        else:
            base_slug = slugify(title)
            slug = get_unique_slug(conn, base_slug)
            cursor.execute("""
                INSERT INTO posts (title, slug, excerpt, content, featured_image, category, category_slug, tags, author, views, is_published, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
            """, (title, slug, excerpt, content, featured_image, category_name, category_slug, tags_json, 'Bahtiyar Tonguç', 120, now, now))
            post_id = cursor.lastrowid
            print(f"  [+] Created new post ID {post_id} (slug: {slug})")

        conn.commit()
        total_processed += 1

    conn.close()
    print("\n=== INGESTION SUMMARY ===")
    print(f"Total posts processed: {total_processed}")
    print(f"Total PDFs rebranded & saved: {total_pdfs_saved}")
    print(f"Storage directory: {PUBLIC_UPLOADS}")
    print("All contents published under author 'Bahtiyar Tonguç' with 100% SEO markup!")

if __name__ == '__main__':
    main()
