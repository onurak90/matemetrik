#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Extract text from each target question page in 9kitap.pdf
and prepare clean metadata for blog post generation.
"""

import fitz
import json
import re

doc = fitz.open("9kitap.pdf")

# Definition of the 67 question pages with their metadata
PAGES_META = [
    # Tema 1: Sayılar
    {"page": 12, "tema": "1. Tema: Sayılar", "topic": "Ön Değerlendirme", "type": "Ön Değerlendirme"},
    {"page": 15, "tema": "1. Tema: Sayılar", "topic": "1.1. Gerçek Sayıların Üslü ve Köklü Gösterimleri", "type": "1. Sıra Sizde"},
    {"page": 22, "tema": "1. Tema: Sayılar", "topic": "1.1. Gerçek Sayıların Üslü ve Köklü Gösterimleri", "type": "2. Sıra Sizde"},
    {"page": 24, "tema": "1. Tema: Sayılar", "topic": "1.1. Gerçek Sayıların Üslü ve Köklü Gösterimleri", "type": "3. Sıra Sizde"},
    {"page": 28, "tema": "1. Tema: Sayılar", "topic": "1.1. Gerçek Sayıların Üslü ve Köklü Gösterimleri", "type": "4. Sıra Sizde"},
    {"page": 29, "tema": "1. Tema: Sayılar", "topic": "1.1. Gerçek Sayıların Üslü ve Köklü Gösterimleri", "type": "5. Sıra Sizde"},
    {"page": 32, "tema": "1. Tema: Sayılar", "topic": "1.1. Gerçek Sayıların Üslü ve Köklü Gösterimleri", "type": "6. Sıra Sizde"},
    {"page": 34, "tema": "1. Tema: Sayılar", "topic": "1.1. Gerçek Sayıların Üslü ve Köklü Gösterimleri", "type": "7. Sıra Sizde"},
    {"page": 36, "tema": "1. Tema: Sayılar", "topic": "1.1. Gerçek Sayıların Üslü ve Köklü Gösterimleri", "type": "Alıştırmalar"},
    {"page": 40, "tema": "1. Tema: Sayılar", "topic": "1.2. Gerçek Sayı Aralıkları ve Küme İşlemleri", "type": "8. Sıra Sizde"},
    {"page": 44, "tema": "1. Tema: Sayılar", "topic": "1.2. Gerçek Sayı Aralıkları ve Küme İşlemleri", "type": "9. Sıra Sizde"},
    {"page": 46, "tema": "1. Tema: Sayılar", "topic": "1.2. Gerçek Sayı Aralıkları ve Küme İşlemleri", "type": "10. Sıra Sizde"},
    {"page": 49, "tema": "1. Tema: Sayılar", "topic": "1.2. Gerçek Sayı Aralıkları ve Küme İşlemleri", "type": "11. Sıra Sizde"},
    {"page": 52, "tema": "1. Tema: Sayılar", "topic": "1.2. Gerçek Sayı Aralıkları ve Küme İşlemleri", "type": "12. Sıra Sizde"},
    {"page": 55, "tema": "1. Tema: Sayılar", "topic": "1.2. Gerçek Sayı Aralıkları ve Küme İşlemleri", "type": "Alıştırmalar"},
    {"page": 56, "tema": "1. Tema: Sayılar", "topic": "1.2. Gerçek Sayı Aralıkları ve Küme İşlemleri", "type": "Alıştırmalar (Devam)"},
    {"page": 61, "tema": "1. Tema: Sayılar", "topic": "1.3. Sayı Kümeleri ve İşlem Özellikleri", "type": "13. Sıra Sizde"},
    {"page": 65, "tema": "1. Tema: Sayılar", "topic": "1.3. Sayı Kümeleri ve İşlem Özellikleri", "type": "14. Sıra Sizde"},
    {"page": 66, "tema": "1. Tema: Sayılar", "topic": "1.3. Sayı Kümeleri ve İşlem Özellikleri", "type": "Alıştırmalar"},
    {"page": 74, "tema": "1. Tema: Sayılar", "topic": "1.4. Gerçek Sayıların İşlem Özelliklerini Cebirsel Olarak İfade Etme", "type": "15. Sıra Sizde"},
    {"page": 76, "tema": "1. Tema: Sayılar", "topic": "1.4. Gerçek Sayıların İşlem Özelliklerini Cebirsel Olarak İfade Etme", "type": "16. Sıra Sizde"},
    {"page": 80, "tema": "1. Tema: Sayılar", "topic": "1.4. Gerçek Sayıların İşlem Özelliklerini Cebirsel Olarak İfade Etme", "type": "Alıştırmalar"},
    {"page": 81, "tema": "1. Tema: Sayılar", "topic": "1.4. Gerçek Sayıların İşlem Özelliklerini Cebirsel Olarak İfade Etme", "type": "Alıştırmalar (Devam)"},
    {"page": 82, "tema": "1. Tema: Sayılar", "topic": "1. Tema Ölçme ve Değerlendirme", "type": "Ölçme ve Değerlendirme (1-2. Sorular)"},
    {"page": 83, "tema": "1. Tema: Sayılar", "topic": "1. Tema Ölçme ve Değerlendirme", "type": "Ölçme ve Değerlendirme (3-4. Sorular)"},
    {"page": 84, "tema": "1. Tema: Sayılar", "topic": "1. Tema Ölçme ve Değerlendirme", "type": "Ölçme ve Değerlendirme (5-6. Sorular)"},
    {"page": 85, "tema": "1. Tema: Sayılar", "topic": "1. Tema Ölçme ve Değerlendirme", "type": "Ölçme ve Değerlendirme (7-8. Sorular)"},
    {"page": 86, "tema": "1. Tema: Sayılar", "topic": "1. Tema Ölçme ve Değerlendirme", "type": "Ölçme ve Değerlendirme (9-11. Sorular)"},
    {"page": 87, "tema": "1. Tema: Sayılar", "topic": "1. Tema Ölçme ve Değerlendirme", "type": "Ölçme ve Değerlendirme (12-13. Sorular)"},

    # Tema 2: Nicelikler ve Değişimler
    {"page": 90, "tema": "2. Tema: Nicelikler ve Değişimler", "topic": "Ön Değerlendirme", "type": "Ön Değerlendirme"},
    {"page": 106, "tema": "2. Tema: Nicelikler ve Değişimler", "topic": "2.1. Doğrusal Fonksiyonlar ve Nitel Özellikleri", "type": "1. Sıra Sizde"},
    {"page": 109, "tema": "2. Tema: Nicelikler ve Değişimler", "topic": "2.1. Doğrusal Fonksiyonlar ve Nitel Özellikleri", "type": "2. Sıra Sizde"},
    {"page": 110, "tema": "2. Tema: Nicelikler ve Değişimler", "topic": "2.1. Doğrusal Fonksiyonlar ve Nitel Özellikleri", "type": "3. Sıra Sizde"},
    {"page": 114, "tema": "2. Tema: Nicelikler ve Değişimler", "topic": "2.1. Doğrusal Fonksiyonlar ve Nitel Özellikleri", "type": "4. Sıra Sizde"},
    {"page": 116, "tema": "2. Tema: Nicelikler ve Değişimler", "topic": "2.1. Doğrusal Fonksiyonlar ve Nitel Özellikleri", "type": "Alıştırmalar"},
    {"page": 117, "tema": "2. Tema: Nicelikler ve Değişimler", "topic": "2.1. Doğrusal Fonksiyonlar ve Nitel Özellikleri", "type": "Alıştırmalar (Devam)"},
    {"page": 132, "tema": "2. Tema: Nicelikler ve Değişimler", "topic": "2.2. Mutlak Değer Fonksiyonu ve Nitel Özellikleri", "type": "5. Sıra Sizde"},
    {"page": 135, "tema": "2. Tema: Nicelikler ve Değişimler", "topic": "2.2. Mutlak Değer Fonksiyonu ve Nitel Özellikleri", "type": "Alıştırmalar"},
    {"page": 150, "tema": "2. Tema: Nicelikler ve Değişimler", "topic": "2.3. Doğrusal Fonksiyon Problemleri", "type": "6. Sıra Sizde"},
    {"page": 159, "tema": "2. Tema: Nicelikler ve Değişimler", "topic": "2.3. Doğrusal Fonksiyon Problemleri", "type": "Alıştırmalar"},
    {"page": 160, "tema": "2. Tema: Nicelikler ve Değişimler", "topic": "2.3. Doğrusal Fonksiyon Problemleri", "type": "Alıştırmalar (Devam)"},
    {"page": 161, "tema": "2. Tema: Nicelikler ve Değişimler", "topic": "2. Tema Ölçme ve Değerlendirme", "type": "Ölçme ve Değerlendirme (1-2. Sorular)"},
    {"page": 162, "tema": "2. Tema: Nicelikler ve Değişimler", "topic": "2. Tema Ölçme ve Değerlendirme", "type": "Ölçme ve Değerlendirme (3-5. Sorular)"},
    {"page": 163, "tema": "2. Tema: Nicelikler ve Değişimler", "topic": "2. Tema Ölçme ve Değerlendirme", "type": "Ölçme ve Değerlendirme (6-8. Sorular)"},
    {"page": 164, "tema": "2. Tema: Nicelikler ve Değişimler", "topic": "2. Tema Ölçme ve Değerlendirme", "type": "Ölçme ve Değerlendirme (9-10. Sorular)"},
    {"page": 165, "tema": "2. Tema: Nicelikler ve Değişimler", "topic": "2. Tema Ölçme ve Değerlendirme", "type": "Ölçme ve Değerlendirme (11-12. Sorular)"},
    {"page": 166, "tema": "2. Tema: Nicelikler ve Değişimler", "topic": "2. Tema Ölçme ve Değerlendirme", "type": "Ölçme ve Değerlendirme (13-15. Sorular)"},
    {"page": 167, "tema": "2. Tema: Nicelikler ve Değişimler", "topic": "2. Tema Ölçme ve Değerlendirme", "type": "Ölçme ve Değerlendirme (16-17. Sorular)"},
    {"page": 168, "tema": "2. Tema: Nicelikler ve Değişimler", "topic": "2. Tema Ölçme ve Değerlendirme", "type": "Ölçme ve Değerlendirme (18-19. Sorular)"},
    {"page": 169, "tema": "2. Tema: Nicelikler ve Değişimler", "topic": "2. Tema Ölçme ve Değerlendirme", "type": "Ölçme ve Değerlendirme (20-21. Sorular)"},

    # Tema 3: Geometrik Şekiller
    {"page": 172, "tema": "3. Tema: Geometrik Şekiller", "topic": "Ön Değerlendirme", "type": "Ön Değerlendirme (1-3. Sorular)"},
    {"page": 173, "tema": "3. Tema: Geometrik Şekiller", "topic": "Ön Değerlendirme", "type": "Ön Değerlendirme (4-6. Sorular)"},
    {"page": 176, "tema": "3. Tema: Geometrik Şekiller", "topic": "3.1. Üçgende Açı ve Kenar Bağıntıları", "type": "1. Sıra Sizde"},
    {"page": 179, "tema": "3. Tema: Geometrik Şekiller", "topic": "3.1. Üçgende Açı ve Kenar Bağıntıları", "type": "2. Sıra Sizde"},
    {"page": 180, "tema": "3. Tema: Geometrik Şekiller", "topic": "3.1. Üçgende Açı ve Kenar Bağıntıları", "type": "3. Sıra Sizde"},
    {"page": 181, "tema": "3. Tema: Geometrik Şekiller", "topic": "3.1. Üçgende Açı ve Kenar Bağıntıları", "type": "4. Sıra Sizde"},
    {"page": 183, "tema": "3. Tema: Geometrik Şekiller", "topic": "3.1. Üçgende Açı ve Kenar Bağıntıları", "type": "5. Sıra Sizde"},
    {"page": 186, "tema": "3. Tema: Geometrik Şekiller", "topic": "3.1. Üçgende Açı ve Kenar Bağıntıları", "type": "6. Sıra Sizde"},
    {"page": 188, "tema": "3. Tema: Geometrik Şekiller", "topic": "3.1. Üçgende Açı ve Kenar Bağıntıları", "type": "7. Sıra Sizde"},
    {"page": 190, "tema": "3. Tema: Geometrik Şekiller", "topic": "3.1. Üçgende Açı ve Kenar Bağıntıları", "type": "8. Sıra Sizde"},
    {"page": 192, "tema": "3. Tema: Geometrik Şekiller", "topic": "3.1. Üçgende Açı ve Kenar Bağıntıları", "type": "Alıştırmalar (1-3. Sorular)"},
    {"page": 193, "tema": "3. Tema: Geometrik Şekiller", "topic": "3.1. Üçgende Açı ve Kenar Bağıntıları", "type": "Alıştırmalar (4-6. Sorular)"},
    {"page": 194, "tema": "3. Tema: Geometrik Şekiller", "topic": "3.1. Üçgende Açı ve Kenar Bağıntıları", "type": "Alıştırmalar (7-8. Sorular)"},
    {"page": 195, "tema": "3. Tema: Geometrik Şekiller", "topic": "3. Tema Ölçme ve Değerlendirme", "type": "Ölçme ve Değerlendirme (1-3. Sorular)"},
    {"page": 196, "tema": "3. Tema: Geometrik Şekiller", "topic": "3. Tema Ölçme ve Değerlendirme", "type": "Ölçme ve Değerlendirme (4-6. Sorular)"},
    {"page": 197, "tema": "3. Tema: Geometrik Şekiller", "topic": "3. Tema Ölçme ve Değerlendirme", "type": "Ölçme ve Değerlendirme (7-8. Sorular)"},
    {"page": 198, "tema": "3. Tema: Geometrik Şekiller", "topic": "3. Tema Ölçme ve Değerlendirme", "type": "Ölçme ve Değerlendirme (9-11. Sorular)"},
    {"page": 199, "tema": "3. Tema: Geometrik Şekiller", "topic": "3. Tema Ölçme ve Değerlendirme", "type": "Ölçme ve Değerlendirme (12-14. Sorular)"},
]

for item in PAGES_META:
    pno = item["page"]
    # The pdf page for printed page N is doc[N] (since doc[12] has page 12)
    raw_text = doc[pno].get_text().strip()
    item["raw_text"] = raw_text
    item["slug"] = f"9-sinif-matematik-ders-kitabi-sayfa-{pno}-cevaplari-meb"
    item["title"] = f"9. Sınıf Matematik Ders Kitabı Sayfa {pno} Cevapları (MEB Yayınları)"

output_json = "data/grade9_pages_extracted.json"
with open(output_json, "w", encoding="utf-8") as f:
    json.dump(PAGES_META, f, ensure_ascii=False, indent=2)

print(f"Extracted {len(PAGES_META)} pages successfully into {output_json}")
