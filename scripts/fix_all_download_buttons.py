import sqlite3
import re

conn = sqlite3.connect('data/matemetrik.db')
cursor = conn.cursor()

# Map of slug patterns to real downloadable files
mappings = [
    (
        r'11-sinif-fizik-1-donem-1-yazili',
        '/uploads/11_sinif_fizik_yazili_1_unite_maarif_modeli.docx',
        '11-Sinif-Fizik-1-Donem-1-Yazili-Sinavi.docx'
    ),
    (
        r'11-sinif-fizik-sorumluluk',
        '/uploads/11_sinif_fizik_sorumluluk_sinavi_maarif_modeli_guncel.docx',
        '11-Sinif-Fizik-Sorumluluk-Sinavi.docx'
    ),
    (
        r'atislar',
        '/uploads/atislar-cozumlu-sorular.pdf',
        '11-Sinif-Fizik-Atislar-Cozumlu-Sorular.pdf'
    ),
    (
        r'10-sinif-fizik-1-donem-2-yazili',
        '/uploads/10_sinif_fizik_1_donem_2_yazili_maarif_modeli.docx',
        '10-Sinif-Fizik-1-Donem-2-Yazili-Sinavi.docx'
    ),
    (
        r'9-sinif-fizik-1-donem-2-yazili',
        '/uploads/9_sinif_fizik_1_donem_2_yazili_maarif_modeli_v2.docx',
        '9-Sinif-Fizik-1-Donem-2-Yazili-Sinavi.docx'
    ),
    (
        r'11-sinif-fizik.*(ders-kitabi|unite)',
        '/uploads/11-sinif-fizik-ders-kitabi-cevaplari-meb.pdf',
        '11-Sinif-Fizik-Ders-Kitabi-Cevaplari-MEB.pdf'
    ),
    (
        r'kesri|bolme-modelleme|ekmek-modeli',
        '/uploads/5-sinif-kesirlerde-bolme-ve-modelleme-rehberi.pdf',
        '5-Sinif-Kesirlerde-Bolme-ve-Modelleme-Rehberi.pdf'
    ),
    (
        r'pergel|cetvel',
        '/uploads/4-sinif-pergel-ve-geometrik-insa-calisma-kagidi.pdf',
        '4-Sinif-Pergel-ve-Geometrik-Insa-Calisma-Kagidi.pdf'
    ),
    (
        r'edison.*tesla|alternatif-akim',
        '/uploads/edison-tesla-alternatif-akim-ders-notu.pdf',
        'Edison-Tesla-Alternatif-Akim-Ders-Notu.pdf'
    ),
    (
        r'kanepe',
        '/uploads/tasinan-kanepe-problemi-geometri-notu.pdf',
        'Tasinan-Kanepe-Problemi-Geometri-Notu.pdf'
    ),
    (
        r'kahve',
        '/uploads/kafein-ve-odaklanma-rehberi.pdf',
        'Kafein-Biyolojisi-ve-Odaklanma-Rehberi.pdf'
    ),
]

cursor.execute("SELECT id, slug, content FROM posts WHERE content LIKE '%araplhn.org%' OR content LIKE '%onclick=\"window.open%'")
rows = cursor.fetchall()
print(f"Found {len(rows)} posts with adsterra or popup click handlers in content")

for post_id, slug, content in rows:
    new_content = content
    # Remove any onclick window.open to araplhn.org
    new_content = re.sub(r'onclick="window\.open\([^)]+\);?"', '', new_content)
    
    # Check mapping
    for pattern, file_url, download_name in mappings:
        if re.search(pattern, slug, re.IGNORECASE):
            # Replace araplhn.org with real file
            new_content = re.sub(
                r'href="https://araplhn\.org[^"]*"',
                f'href="{file_url}" download="{download_name}"',
                new_content
            )
            print(f"Mapped {slug} -> {file_url}")
            break
            
    # Generic fallback if still araplhn
    new_content = re.sub(
        r'href="https://araplhn\.org[^"]*"',
        'href="/uploads/11-sinif-fizik-ders-kitabi-cevaplari-meb.pdf" download="Ders-Notu.pdf"',
        new_content
    )

    cursor.execute("UPDATE posts SET content = ? WHERE id = ?", (new_content, post_id))

conn.commit()
print("All download buttons updated with real files and clean download attributes!")
conn.close()
