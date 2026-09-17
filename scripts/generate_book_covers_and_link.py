# -*- coding: utf-8 -*-
"""
Extract page 0 of each textbook PDF as a clean, low-file-size WebP cover (width 720px, ~30-40 KB),
save to public/uploads/cover-book-{book_id}.webp,
and update posts in data/matemetrik.db so ALL pages of a book link to that single cover image!
"""

import os
import fitz
import sqlite3
from PIL import Image

DB_PATH = "data/matemetrik.db"

BOOKS_CONFIG = [
    # 6. Sınıf
    {
        "id": "matematik-6-1",
        "file": "kitaplar/matematik6-1.pdf",
        "grade": "6. Sınıf",
        "cat": "6-sinif",
        "slug_pattern": "%matematik%6%",
        "master_slug": "2026-2027-meb-matematik-ders-kitabi-cevaplari-6-sinif-1-kitap"
    },
    # 7. Sınıf
    {
        "id": "matematik-7-1",
        "file": "kitaplar/matematik7-1.pdf",
        "grade": "7. Sınıf",
        "cat": "7-sinif",
        "slug_pattern": "%matematik%7%",
        "master_slug": "2026-2027-meb-matematik-ders-kitabi-cevaplari-7-sinif-1-kitap"
    },
    # 9. Sınıf
    {
        "id": "fizik-9",
        "file": "kitaplar/fizik-dersi-9-sinif-ders-kitabi.pdf",
        "grade": "9. Sınıf",
        "cat": "9-sinif",
        "slug_pattern": "9-sinif-fizik-9-%",
        "master_slug": "2026-2027-meb-fizik-ders-kitabi-cevaplari-9-sinif"
    },
    {
        "id": "kimya-9",
        "file": "kitaplar/kimya-9sinif-ders-kitabi_20260908_105401_981.pdf",
        "grade": "9. Sınıf",
        "cat": "9-sinif",
        "slug_pattern": "9-sinif-kimya-9-%",
        "master_slug": "2026-2027-meb-kimya-ders-kitabi-cevaplari-9-sinif"
    },
    {
        "id": "biyoloji-9",
        "file": "kitaplar/biyoloji-9-sinif-ders-kitabi.pdf",
        "grade": "9. Sınıf",
        "cat": "9-sinif",
        "slug_pattern": "9-sinif-biyoloji-9-%",
        "master_slug": "2026-2027-meb-biyoloji-ders-kitabi-cevaplari-9-sinif"
    },
    {
        "id": "cografya-9",
        "file": "kitaplar/cografya-dersi-sinif-9-ders-kitabi.pdf",
        "grade": "9. Sınıf",
        "cat": "9-sinif",
        "slug_pattern": "9-sinif-cografya-9-%",
        "master_slug": "2026-2027-meb-cografya-ders-kitabi-cevaplari-9-sinif"
    },
    {
        "id": "ingilizce-9",
        "file": "kitaplar/ingilizce-dersi-9sinif-calisma-kitabi_20260908_000334_688.pdf",
        "grade": "9. Sınıf",
        "cat": "9-sinif",
        "slug_pattern": "9-sinif-ingilizce-9-%",
        "master_slug": "2026-2027-meb-ingilizce-calisma-kitabi-cevaplari-9-sinif"
    },
    {
        "id": "matematik-9-k1",
        "file": "kitaplar/matematik-9sinif-ders-kitabi-1kitap_20260908_111051_343.pdf",
        "grade": "9. Sınıf",
        "cat": "9-sinif",
        "slug_pattern": "9-sinif-matematik-%",
        "master_slug": "2026-2027-meb-matematik-ders-kitabi-cevaplari"
    },
    {
        "id": "matematik-9-k2",
        "file": "kitaplar/matematik-9sinif-ders-kitabi-2kitap_20260908_111224_539.pdf",
        "grade": "9. Sınıf",
        "cat": "9-sinif",
        "slug_pattern": "9-sinif-matematik-9-k2-%",
        "master_slug": "2026-2027-meb-matematik-ders-kitabi-cevaplari-9-sinif-2-kitap"
    },
    # 10. Sınıf
    {
        "id": "matematik-10",
        "file": "kitaplar/matematik 10 sınıf.pdf",
        "grade": "10. Sınıf",
        "cat": "10-sinif",
        "slug_pattern": "10-sinif-matematik-%",
        "master_slug": "10-sinif-matematik-ders-kitabi-cevaplari-meb"
    },
    {
        "id": "fizik-10",
        "file": "kitaplar/fizik-dersi-10-sinif-ders-kitabi.pdf",
        "grade": "10. Sınıf",
        "cat": "10-sinif",
        "slug_pattern": "10-sinif-fizik-10-%",
        "master_slug": "2026-2027-meb-fizik-ders-kitabi-cevaplari-10-sinif"
    },
    {
        "id": "kimya-10",
        "file": "kitaplar/kimya-10sinif-ders-kitabi_20260908_105608_516.pdf",
        "grade": "10. Sınıf",
        "cat": "10-sinif",
        "slug_pattern": "10-sinif-kimya-10-%",
        "master_slug": "2026-2027-meb-kimya-ders-kitabi-cevaplari-10-sinif"
    },
    {
        "id": "biyoloji-10",
        "file": "kitaplar/biyoloji-dersi-10-sinif-ders-kitabi.pdf",
        "grade": "10. Sınıf",
        "cat": "10-sinif",
        "slug_pattern": "10-sinif-biyoloji-10-%",
        "master_slug": "2026-2027-meb-biyoloji-ders-kitabi-cevaplari-10-sinif"
    },
    {
        "id": "cografya-10",
        "file": "kitaplar/cografya-dersi-sinif-10-ders-kitabi.pdf",
        "grade": "10. Sınıf",
        "cat": "10-sinif",
        "slug_pattern": "10-sinif-cografya-10-%",
        "master_slug": "2026-2027-meb-cografya-ders-kitabi-cevaplari-10-sinif"
    },
    {
        "id": "ingilizce-10",
        "file": "kitaplar/ingilizce-dersi-10-sinif-calisma-kitabi.pdf",
        "grade": "10. Sınıf",
        "cat": "10-sinif",
        "slug_pattern": "10-sinif-ingilizce-10-%",
        "master_slug": "2026-2027-meb-ingilizce-calisma-kitabi-cevaplari-10-sinif"
    },
    # 11. Sınıf
    {
        "id": "matematik-11",
        "file": "kitaplar/matematik 11 sınıf.pdf",
        "grade": "11. Sınıf",
        "cat": "11-sinif",
        "slug_pattern": "11-sinif-matematik-11-%",
        "master_slug": "2026-2027-meb-matematik-ders-kitabi-cevaplari-11-sinif"
    },
    {
        "id": "temel-mat-11",
        "file": "kitaplar/temel-matematik-11sinif-ders-kitabi_20260908_185752_993.pdf",
        "grade": "11. Sınıf",
        "cat": "11-sinif",
        "slug_pattern": "11-sinif-temel-matematik-%",
        "master_slug": "2026-2027-meb-temel-matematik-ders-kitabi-cevaplari-11-sinif"
    },
    {
        "id": "fizik-11",
        "file": "kitaplar/fizik-dersi-11-sinif-ders-kitabi.pdf",
        "grade": "11. Sınıf",
        "cat": "11-sinif",
        "slug_pattern": "11-sinif-fizik-11-%",
        "master_slug": "2026-2027-meb-fizik-ders-kitabi-cevaplari-11-sinif"
    },
    {
        "id": "kimya-11",
        "file": "kitaplar/kimya-11sinif-ders-kitabi_20260908_105854_643.pdf",
        "grade": "11. Sınıf",
        "cat": "11-sinif",
        "slug_pattern": "11-sinif-kimya-11-%",
        "master_slug": "2026-2027-meb-kimya-ders-kitabi-cevaplari-11-sinif"
    },
    {
        "id": "biyoloji-11",
        "file": "kitaplar/biyoloji-dersi-11-sinif-ders-kitabi.pdf",
        "grade": "11. Sınıf",
        "cat": "11-sinif",
        "slug_pattern": "11-sinif-biyoloji-11-%",
        "master_slug": "2026-2027-meb-biyoloji-ders-kitabi-cevaplari-11-sinif"
    },
    {
        "id": "cografya-11",
        "file": "kitaplar/cografya-dersi-sinif-11-ders-kitabi.pdf",
        "grade": "11. Sınıf",
        "cat": "11-sinif",
        "slug_pattern": "11-sinif-cografya-11-%",
        "master_slug": "2026-2027-meb-cografya-ders-kitabi-cevaplari-11-sinif"
    },
]

def main():
    os.makedirs("public/uploads", exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    total_images = 0
    total_posts_updated = 0

    for b in BOOKS_CONFIG:
        fpath = b["file"]
        if not os.path.exists(fpath):
            print(f"File not found: {fpath}")
            continue

        doc = fitz.open(fpath)
        # Extract page 0 (cover)
        page0 = doc[0]
        pix = page0.get_pixmap(dpi=120)
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

        if img.width > 720:
            ratio = 720.0 / img.width
            img = img.resize((720, int(img.height * ratio)), Image.Resampling.LANCZOS)

        out_rel_path = f"/uploads/cover-book-{b['id']}.webp"
        out_disk_path = f"public/uploads/cover-book-{b['id']}.webp"
        img.save(out_disk_path, "WEBP", quality=75, method=6)
        size_kb = os.path.getsize(out_disk_path) / 1024
        total_images += 1
        print(f"[{b['grade']} {b['id']}] Saved cover {out_disk_path} ({size_kb:.1f} KB)")

        # Update in database: both master post and all page posts for this book
        # 1. Master post
        cur.execute("UPDATE posts SET featured_image = ? WHERE slug = ?", (out_rel_path, b["master_slug"]))
        
        # 2. Individual page posts
        cur.execute("UPDATE posts SET featured_image = ? WHERE slug LIKE ? AND category_slug = ?",
                    (out_rel_path, b["slug_pattern"], b["cat"]))
        updated_rows = cur.rowcount
        total_posts_updated += updated_rows
        print(f"  -> Updated {updated_rows} posts in DB with {out_rel_path}")

    conn.commit()
    cur.execute("PRAGMA wal_checkpoint(TRUNCATE);")
    conn.close()
    print(f"\nCOMPLETED: Generated {total_images} book covers, updated {total_posts_updated} posts in database!")

if __name__ == "__main__":
    main()
