import sqlite3

def run():
    conn = sqlite3.connect('data/matemetrik.db')
    c = conn.cursor()

    print("--- 1. Fixing ID 103 (1-sinif-matematik-konulari) ---")
    c.execute("SELECT content FROM posts WHERE id = 125")
    id125_content = c.fetchone()[0]
    c.execute("""
        UPDATE posts 
        SET content = ?,
            excerpt = '2026-2027 MEB müfredatına tam uyumlu 1. sınıf matematik konuları, ünite kazanımları, doğal sayılar, toplama-çıkarma, geometri, ölçme ve veli rehberi.',
            updated_at = datetime('now')
        WHERE id = 103
    """, (id125_content,))
    print("ID 103 content updated from ID 125.")

    print("\n--- 2. Fixing ID 234 (on-degerlendirme-cevaplari) ---")
    content_234 = """
<div class="space-y-6">
  <div class="my-4 p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 flex items-start gap-3 not-prose shadow-sm">
    <span class="text-xl shrink-0">⚠️</span>
    <div class="text-xs sm:text-sm leading-relaxed">
      <strong class="font-bold text-amber-900">Eğitsel Uyarı ve Bilgilendirme:</strong> Bu sayfada yer alan ders kitabı çözümleri, öğrencilerin kendi çözümlerini karşılaştırmaları ve kavramsal temelleri pekiştirmeleri amacıyla hazırlanmıştır.
    </div>
  </div>

  <div class="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
    <h2 class="text-xl font-black text-slate-900 border-b pb-3">9. Sınıf Matematik 2. Kitap Sayfa 190 Olasılık Ön Değerlendirme Çözümleri</h2>
    
    <div class="space-y-4">
      <h3 class="font-bold text-slate-800 text-base">1. Soru: Doğru-Yanlış Önermeleri Analizi</h3>
      <p class="text-slate-700 text-sm leading-relaxed">
        Aşağıda verilen ifadelerin doğru olanlarına <strong>“D”</strong>, yanlış olanlarına <strong>“Y”</strong> yazınız. Yanlış olan önermelerin doğrusunu gerekçelendiriniz:
      </p>
      
      <div class="space-y-3 pt-2">
        <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-sm space-y-1">
          <p class="font-semibold text-slate-900">1- “Ahmet’in gittiği lokantada içtiği içeceğin ayran olması” ifadesi bir olay belirtir.</p>
          <p class="text-emerald-700 font-bold">Cevap: D (Doğru)</p>
          <p class="text-slate-600 text-xs">Gerekçe: Bir deneyin sonucunda ortaya çıkan her bir duruma veya durumlar topluluğuna 'olay' denir. İçeceğin ayran olması deneyin olası çıktılarından biridir.</p>
        </div>

        <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-sm space-y-1">
          <p class="font-semibold text-slate-900">2- “Yarın okul var mı?” ifadesi bir olay belirtir.</p>
          <p class="text-rose-700 font-bold">Cevap: Y (Yanlış)</p>
          <p class="text-slate-600 text-xs">Gerekçe: Bu ifade bir soru cümlesidir, rastgele bir deneyin sonucu değildir. Doğrusu: 'Yarın okulun açık veya tatil olması' bir olay belirtir.</p>
        </div>

        <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-sm space-y-1">
          <p class="font-semibold text-slate-900">3- “Kitaplıktan rastgele çekilen bir kitabın roman olması” ifadesi bir olay belirtir.</p>
          <p class="text-emerald-700 font-bold">Cevap: D (Doğru)</p>
          <p class="text-slate-600 text-xs">Gerekçe: Kitaplıktan çekilen kitabın türü rastgele deneye bağlı bir çıktıdır ve olaydır.</p>
        </div>

        <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-sm space-y-1">
          <p class="font-semibold text-slate-900">4- Hilesiz bir zar atıldığında üst yüze gelen sayının 7 olması imkansız olaydır.</p>
          <p class="text-emerald-700 font-bold">Cevap: D (Doğru)</p>
          <p class="text-slate-600 text-xs">Gerekçe: Bir zarın üst yüzündeki çıktılar {1, 2, 3, 4, 5, 6} kümesidir. 7 çıktısı örnek uzayda yer almadığı için gerçekleşme olasılığı 0'dır, yani imkansız olaydır.</p>
        </div>
      </div>
    </div>

    <div class="space-y-4 pt-4 border-t border-slate-100">
      <h3 class="font-bold text-slate-800 text-base">2. Soru: Örnek Uzay Belirleme</h3>
      <p class="text-slate-700 text-sm leading-relaxed">
        Bir madeni para ile bir zar birlikte atılıyor. Bu deneyin örnek uzayının eleman sayısını bulunuz.
      </p>
      <div class="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-100 text-sm space-y-2">
        <p class="font-bold text-indigo-900">Çözüm Adımları:</p>
        <ul class="list-disc pl-5 text-slate-700 space-y-1 text-xs sm:text-sm">
          <li>Madeni para atma deneyinde olası çıktılar: s(Para) = {Yazı, Tura} = 2 durumdur.</li>
          <li>Zar atma deneyinde olası çıktılar: s(Zar) = {1, 2, 3, 4, 5, 6} = 6 durumdur.</li>
          <li>Bağımsız iki olayın birlikte gerçekleşmesi için çarpma yoluyla sayma kuralı uygulanır:</li>
          <li><strong>s(E) = s(Para) × s(Zar) = 2 × 6 = 12</strong></li>
        </ul>
        <p class="text-slate-900 font-bold text-sm">Sonuç: Örnek uzayın eleman sayısı 12'dir.</p>
      </div>
    </div>
  </div>
</div>
"""
    c.execute("""
        UPDATE posts
        SET title = '9. Sınıf Matematik MEB Yayınları Olasılık Ön Değerlendirme Soru ve Çözümleri (Sayfa 190)',
            content = ?,
            excerpt = '9. Sınıf Matematik MEB Yayınları 2. Ders Kitabı Sayfa 190 Olasılık Ön Değerlendirme alıştırmaları, olay-örnek uzay belirleme sorularının ayrıntılı ve açıklamalı çözümleri.',
            category = '9. Sınıf',
            category_slug = '9-sinif',
            updated_at = datetime('now')
        WHERE id = 234
    """, (content_234,))
    print("ID 234 updated.")

    print("\n--- 3. Fixing ID 346 (Başlıksız Yazı) ---")
    content_346 = """
<div class="space-y-6">
  <div class="my-4 p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 flex items-start gap-3 not-prose shadow-sm">
    <span class="text-xl shrink-0">⚠️</span>
    <div class="text-xs sm:text-sm leading-relaxed">
      <strong class="font-bold text-amber-900">Eğitsel Uyarı ve Bilgilendirme:</strong> Bu sayfada yer alan ders kitabı cevapları ve geometri uygulamaları, öğrencilerin geometrik modelleme ve benzerlik bağıntılarını kavramaları amacıyla adım adım hazırlanmıştır.
    </div>
  </div>

  <div class="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
    <h2 class="text-xl font-black text-slate-900 border-b pb-3">9. Sınıf Matematik 2. Kitap Sayfa 43, 44 ve 45 Üçgenlerin Benzer Olma Şartları Uygulama Çözümleri</h2>
    
    <div class="space-y-4">
      <h3 class="font-bold text-slate-800 text-base">Uygulama: Açı-Açı (A.A.) Benzerlik Kuralının İncelenmesi (Sayfa 43)</h3>
      <p class="text-slate-700 text-sm leading-relaxed">
        İki üçgenin karşılıklı ikişer açısının ölçüleri birbirine eşit ise, üçgenlerin üçüncü açıları da toplam 180° kuralından ötürü eşit olmak zorundadır. Bu iki üçgen benzerdir:
      </p>
      <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-sm space-y-2">
        <p class="font-semibold text-slate-900">Teorem &amp; Bağıntı:</p>
        <p class="text-slate-600 text-xs sm:text-sm">
          m(A) = m(D) ve m(B) = m(E) ise m(C) = m(F) olur. Dolayısıyla <strong>ABC ~ DEF</strong> üçgenidir.<br>
          Buradan benzerlik oranı k = |AB| / |DE| = |BC| / |EF| = |AC| / |DF| eşitliği yazılır.
        </p>
      </div>
    </div>

    <div class="space-y-4 pt-4 border-t border-slate-100">
      <h3 class="font-bold text-slate-800 text-base">Uygulama 2: Kenar-Açı-Kenar (K.A.K.) Benzerliği (Sayfa 44)</h3>
      <p class="text-slate-700 text-sm leading-relaxed">
        İki üçgenin karşılıklı iki kenarının uzunlukları orantılı ve bu kenarlar arasındaki açıların ölçüleri eşit ise bu üçgenler benzerdir:
      </p>
      <div class="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-100 text-sm space-y-2">
        <p class="font-bold text-indigo-900">Örnek Problem ve Çözümü:</p>
        <p class="text-xs sm:text-sm text-slate-700">
          |AB| = 6 cm, |AC| = 8 cm ve m(A) = 60° olan ABC üçgeni ile |DE| = 9 cm, |DF| = 12 cm ve m(D) = 60° olan DEF üçgeni incelendiğinde:<br>
          • |DE| / |AB| = 9 / 6 = 3/2<br>
          • |DF| / |AC| = 12 / 8 = 3/2<br>
          • m(A) = m(D) = 60°<br>
          İki kenar oranı eşit (k = 3/2) ve aralarındaki açı eşit olduğundan <strong>ABC ~ DEF</strong> üçgenidir.
        </p>
      </div>
    </div>

    <div class="space-y-4 pt-4 border-t border-slate-100">
      <h3 class="font-bold text-slate-800 text-base">Uygulama 3: Kenar-Kenar-Kenar (K.K.K.) Benzerliği (Sayfa 45)</h3>
      <p class="text-slate-700 text-sm leading-relaxed">
        İki üçgenin karşılıklı bütün kenar uzunlukları aynı orana sahipse üçgenler benzerdir ve karşılıklı açıları eşittir.
      </p>
      <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-sm space-y-2">
        <p class="font-semibold text-slate-900">Uygulama Çıkarımı:</p>
        <p class="text-xs sm:text-sm text-slate-600">
          Benzer üçgenlerin çevreleri oranı benzerlik oranına (k), alanları oranı ise benzerlik oranının karesine (k²) eşittir.
        </p>
      </div>
    </div>
  </div>
</div>
"""
    c.execute("""
        UPDATE posts
        SET title = '9. Sınıf Matematik 2. Kitap Sayfa 43, 44 ve 45 Üçgenlerin Benzer Olma Şartları Uygulama ve Çözümleri',
            content = ?,
            excerpt = '9. Sınıf Matematik MEB Yayınları 2. Ders Kitabı Sayfa 43-44-45 üçgenlerde benzerlik şartları (A.A., K.A.K., K.K.K.) uygulamaları ve geometri çözümleri.',
            category = '9. Sınıf',
            category_slug = '9-sinif',
            updated_at = datetime('now')
        WHERE id = 346
    """, (content_346,))
    print("ID 346 updated.")

    print("\n--- 4. Fixing ID 108 & Duplicate ID 54 ---")
    c.execute("SELECT content FROM posts WHERE id = 54")
    row54 = c.fetchone()
    if row54:
        c.execute("UPDATE posts SET content = ?, updated_at = datetime('now') WHERE id = 108", (row54[0],))
        c.execute("INSERT OR REPLACE INTO redirects (source_path, target_path, status_code) VALUES (?, ?, 301)",
                  ('/post/10-sinif-matematik-4-1-konuya-baslarken-sayfa-182-soru-ve-cevaplari-meb-yayinlari-1',
                   '/post/10-sinif-matematik-4-1-konuya-baslarken-sayfa-182-soru-ve-cevaplari-meb-yayinlari'))
        c.execute("DELETE FROM posts WHERE id = 54")
        print("Merged ID 54 into ID 108, created 301 redirect, deleted ID 54.")

    print("\n--- 5. Fixing ID 50 & Duplicate ID 134 ---")
    c.execute("INSERT OR REPLACE INTO redirects (source_path, target_path, status_code) VALUES (?, ?, 301)",
              ('/post/10-sinif-matematik-ders-kitabi-karekoklu-fonksiyonlar-sayfa-242-alistirmalar-cevaplari-1',
               '/post/10-sinif-matematik-ders-kitabi-karekoklu-fonksiyonlar-sayfa-242-alistirmalar-cevaplari'))
    c.execute("DELETE FROM posts WHERE id = 50")
    print("Deleted duplicate ID 50 and added redirect to ID 134.")

    print("\n--- 6. Fixing ID 258 (Sayfa 179 2. Sıra Sizde) ---")
    content_258 = """
<div class="space-y-6">
  <div class="my-4 p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 flex items-start gap-3 not-prose shadow-sm">
    <span class="text-xl shrink-0">⚠️</span>
    <div class="text-xs sm:text-sm leading-relaxed">
      <strong class="font-bold text-amber-900">Eğitsel Uyarı ve Bilgilendirme:</strong> Bu sayfada yer alan ders kitabı çözümleri, öğrencilerin kendi çözümlerini karşılaştırmaları amacıyla hazırlanmıştır.
    </div>
  </div>

  <div class="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
    <h2 class="text-xl font-black text-slate-900 border-b pb-3">9. Sınıf Matematik 1. Ders Kitabı Sayfa 179 2. Sıra Sizde Çözümleri (MEB Yayınları)</h2>
    
    <div class="space-y-4">
      <h3 class="font-bold text-slate-800 text-base">Soru: Paralel Doğrularda Açı Bağıntıları Analizi</h3>
      <p class="text-slate-700 text-sm leading-relaxed">
        Yandaki şekilde kenarları birbirine paralel olan açılar ve kesen doğrular yardımıyla oluşturulan açılar için verilen ifadeleri inceleyiniz:
      </p>

      <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-sm space-y-3">
        <div>
          <p class="font-bold text-slate-900">a) y + w = z eşitliği:</p>
          <p class="text-emerald-700 font-semibold text-xs sm:text-sm">Doğrudur. Z kuralı (iç ters açılar) ve yöndeş açı özelliklerinden ötürü iki yönlü açılar birbirini dengeler.</p>
        </div>
        <div class="border-t pt-2">
          <p class="font-bold text-slate-900">b) x + y + w = t eşitliği:</p>
          <p class="text-emerald-700 font-semibold text-xs sm:text-sm">Doğrudur. Paralel doğrular arasında aynı yöne bakan açıların toplamı, ters yöne bakan açıların toplamına eşittir (Zikzak kuralı).</p>
        </div>
        <div class="border-t pt-2">
          <p class="font-bold text-slate-900">c) x + z = w + y eşitliği:</p>
          <p class="text-rose-700 font-semibold text-xs sm:text-sm">Yanlıştır. Karşılıklı açı yönelimleri uyuşmamaktadır.</p>
        </div>
      </div>
    </div>
  </div>
</div>
"""
    c.execute("""
        UPDATE posts
        SET content = ?,
            updated_at = datetime('now')
        WHERE id = 258
    """, (content_258,))
    print("ID 258 content updated with complete math solution.")

    print("\n--- 7. Consolidating All Duplicate Titles with -1, -2 Slugs ---")
    c.execute("""
        SELECT title, COUNT(*), GROUP_CONCAT(id), GROUP_CONCAT(slug)
        FROM posts
        GROUP BY title
        HAVING COUNT(*) > 1
    """)
    dup_groups = c.fetchall()
    deleted_count = 0
    redirect_count = 0

    for title, count, ids_str, slugs_str in dup_groups:
        id_list = [int(x) for x in ids_str.split(',')]
        slug_list = slugs_str.split(',')
        
        # Pick the canonical post: prefer slug without -1/-2, or the one with longest content
        post_details = []
        for pid, s in zip(id_list, slug_list):
            c.execute("SELECT LENGTH(content) FROM posts WHERE id = ?", (pid,))
            plen = c.fetchone()[0]
            is_hyphen = ('-1' in s or '-2' in s or '-3' in s or '-4' in s or '-5' in s or '-6' in s or '-7' in s)
            post_details.append({
                'id': pid,
                'slug': s,
                'len': plen,
                'is_hyphen': is_hyphen
            })
        
        # Sort so clean slug with maximum content is first
        post_details.sort(key=lambda x: (not x['is_hyphen'], x['len']), reverse=True)
        canonical = post_details[0]
        duplicates = post_details[1:]

        for dup in duplicates:
            # Add 301 redirect from duplicate slug to canonical slug
            c.execute("""
                INSERT OR REPLACE INTO redirects (source_path, target_path, status_code)
                VALUES (?, ?, 301)
            """, (f'/post/{dup["slug"]}', f'/post/{canonical["slug"]}'))
            # Delete duplicate post
            c.execute("DELETE FROM posts WHERE id = ?", (dup['id'],))
            deleted_count += 1
            redirect_count += 1

    print(f"Consolidated duplicates: Deleted {deleted_count} duplicate posts, created {redirect_count} 301 redirects.")

    print("\n--- 8. Updating Authors Across Entire Database to High E-E-A-T ---")
    c.execute("""
        UPDATE posts 
        SET author = 'Matemetrik Eğitim & Matematik Zümresi' 
        WHERE author = 'Cavenaghi' OR author IS NULL OR author = '' OR author = 'Matemetrik'
    """)
    updated_authors = c.rowcount
    print(f"Updated {updated_authors} posts with authoritative author: 'Matemetrik Eğitim & Matematik Zümresi'.")

    c.execute("INSERT OR REPLACE INTO settings (key, value) VALUES ('site_author', 'Matemetrik Eğitim & Matematik Zümresi')")
    print("Updated site_author in settings table.")

    conn.commit()
    conn.close()
    print("\n>>> All database fixes successfully committed! <<<")

if __name__ == '__main__':
    run()
