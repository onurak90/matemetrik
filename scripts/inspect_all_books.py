# -*- coding: utf-8 -*-
import os
import fitz

books = [
    ("fizik-9", "kitaplar/fizik-dersi-9-sinif-ders-kitabi.pdf", "9. Sınıf", "Fizik"),
    ("kimya-9", "kitaplar/kimya-9sinif-ders-kitabi_20260908_105401_981.pdf", "9. Sınıf", "Kimya"),
    ("biyoloji-9", "kitaplar/biyoloji-9-sinif-ders-kitabi.pdf", "9. Sınıf", "Biyoloji"),
    ("cografya-9", "kitaplar/cografya-dersi-sinif-9-ders-kitabi.pdf", "9. Sınıf", "Coğrafya"),
    ("ingilizce-9", "kitaplar/ingilizce-dersi-9sinif-calisma-kitabi_20260908_000334_688.pdf", "9. Sınıf", "İngilizce"),
    ("matematik-9-k2", "kitaplar/matematik-9sinif-ders-kitabi-2kitap_20260908_111224_539.pdf", "9. Sınıf", "Matematik 2. Kitap"),
    ("matematik-10", "kitaplar/matematik 10 sınıf.pdf", "10. Sınıf", "Matematik"),
    ("fizik-10", "kitaplar/fizik-dersi-10-sinif-ders-kitabi.pdf", "10. Sınıf", "Fizik"),
    ("kimya-10", "kitaplar/kimya-10sinif-ders-kitabi_20260908_105608_516.pdf", "10. Sınıf", "Kimya"),
    ("biyoloji-10", "kitaplar/biyoloji-dersi-10-sinif-ders-kitabi.pdf", "10. Sınıf", "Biyoloji"),
    ("cografya-10", "kitaplar/cografya-dersi-sinif-10-ders-kitabi.pdf", "10. Sınıf", "Coğrafya"),
    ("ingilizce-10", "kitaplar/ingilizce-dersi-10-sinif-calisma-kitabi.pdf", "10. Sınıf", "İngilizce"),
    ("matematik-11", "kitaplar/matematik 11 sınıf.pdf", "11. Sınıf", "Matematik"),
    ("temel-mat-11", "kitaplar/temel-matematik-11sinif-ders-kitabi_20260908_185752_993.pdf", "11. Sınıf", "Temel Matematik"),
    ("fizik-11", "kitaplar/fizik-dersi-11-sinif-ders-kitabi.pdf", "11. Sınıf", "Fizik"),
    ("kimya-11", "kitaplar/kimya-11sinif-ders-kitabi_20260908_105854_643.pdf", "11. Sınıf", "Kimya"),
    ("biyoloji-11", "kitaplar/biyoloji-dersi-11-sinif-ders-kitabi.pdf", "11. Sınıf", "Biyoloji"),
    ("cografya-11", "kitaplar/cografya-dersi-sinif-11-ders-kitabi.pdf", "11. Sınıf", "Coğrafya"),
]

for bid, fpath, grade, subj in books:
    doc = fitz.open(fpath)
    toc = doc.get_toc()
    print(f"=== {grade} {subj} ({len(doc)} pages) ===")
    if toc:
        print(f"TOC items: {len(toc)}")
        for item in toc[:8]:
            print(f"  Level {item[0]}: {item[1]} (p. {item[2]})")
    else:
        # Search first 10 pages for table of contents
        found_toc = False
        for p in range(min(12, len(doc))):
            text = doc[p].get_text().lower()
            if "i̇çi̇ndeki̇ler" in text or "içindekiler" in text:
                print(f"  TOC text on page {p}:")
                lines = [l.strip() for l in doc[p].get_text().split('\n') if l.strip()][:8]
                print("   ", " // ".join(lines))
                found_toc = True
                break
        if not found_toc:
            print("  No TOC found in first 12 pages")
    print()
