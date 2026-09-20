# -*- coding: utf-8 -*-
"""
Curriculum definitions and generator for 1-12. Sınıf Konu Anlatımları.
Strictly adheres to:
1. 📖 Konu Anlatımı
2. 📝 20 Soruluk Test
3. ✅ Test Cevapları
4. 🎥 Video Çözüm
5. 📚 MEB Kitabı Çözümleri
6. 🔗 Benzer Konular
7. ❓ Sıkça Sorulan Sorular (SSS) + FAQPage Schema
8. High-resolution 1200x630 WebP Cover Image
"""

import os
import re
import json
import sqlite3
import time
from datetime import datetime, timezone
from PIL import Image, ImageDraw, ImageFont

DB_PATH = "data/matemetrik.db"
UPLOADS_DIR = "public/uploads"
NOW_ISO = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")

def generate_cover_image(grade_str, subject_str, topic_str, filename):
    os.makedirs(UPLOADS_DIR, exist_ok=True)
    out_path = os.path.join(UPLOADS_DIR, filename)
    if os.path.exists(out_path):
        return f"/uploads/{filename}"

    width, height = 1200, 630

    # Color themes by subject
    color_map = {
        "Matematik": ((15, 23, 42), (30, 58, 138), (59, 130, 246)),      # Dark slate to deep blue
        "Türkçe": ((30, 27, 75), (88, 28, 135), (147, 51, 234)),          # Indigo to purple
        "Türk Dili ve Edebiyatı": ((30, 27, 75), (88, 28, 135), (147, 51, 234)),
        "Fen Bilimleri": ((6, 78, 59), (13, 148, 136), (20, 184, 166)),    # Emerald to teal
        "Fizik": ((19, 78, 74), (15, 118, 110), (13, 148, 136)),         # Teal
        "Kimya": ((136, 19, 55), (190, 18, 60), (225, 29, 72)),          # Rose / Ruby
        "Biyoloji": ((20, 83, 45), (22, 101, 52), (34, 197, 94)),        # Green
        "Sosyal Bilgiler": ((120, 53, 15), (180, 83, 9), (217, 119, 6)),  # Amber / Bronze
        "Hayat Bilgisi": ((120, 53, 15), (180, 83, 9), (217, 119, 6)),
        "T.C. İnkılap Tarihi": ((127, 29, 29), (185, 28, 28), (239, 68, 68)), # Crimson
    }

    start_c, mid_c, end_c = color_map.get(subject_str, ((15, 23, 42), (30, 58, 138), (59, 130, 246)))

    img = Image.new('RGB', (width, height), start_c)
    draw = ImageDraw.Draw(img)

    for y in range(height):
        factor = y / height
        r = int(start_c[0] + (end_c[0] - start_c[0]) * factor)
        g = int(start_c[1] + (end_c[1] - start_c[1]) * factor)
        b = int(start_c[2] + (end_c[2] - start_c[2]) * factor)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    # Grid overlay
    overlay = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    ov_draw = ImageDraw.Draw(overlay)
    for x in range(0, width, 40):
        ov_draw.line([(x, 0), (x, height)], fill=(255, 255, 255, 15), width=1)
    for y in range(0, height, 40):
        ov_draw.line([(0, y), (width, y)], fill=(255, 255, 255, 15), width=1)

    ov_draw.ellipse([850, -80, 1250, 320], fill=(255, 255, 255, 22))
    ov_draw.ellipse([80, 420, 420, 760], fill=(255, 255, 255, 18))
    img.paste(Image.alpha_composite(Image.new('RGBA', (width, height), (0,0,0,0)), overlay), (0,0), overlay)

    font_path = '/Library/Fonts/Arial Unicode.ttf'
    if not os.path.exists(font_path):
        font_path = '/System/Library/Fonts/Supplemental/Arial.ttf'

    draw = ImageDraw.Draw(img)
    f_brand = ImageFont.truetype(font_path, 22)
    f_badge = ImageFont.truetype(font_path, 20)
    f_title = ImageFont.truetype(font_path, 46)
    f_sub = ImageFont.truetype(font_path, 28)
    f_features = ImageFont.truetype(font_path, 20)

    # Brand
    draw.text((70, 50), "MATEMETRİK.COM • MEB MAARİF MODELİ", font=f_brand, fill=(224, 231, 255))

    # Badge
    badge_txt = f"{grade_str} • {subject_str} • 2026-2027 GÜNCEL"
    badge_w = 420
    draw.rounded_rectangle([70, 95, 70 + badge_w, 95 + 40], radius=20, fill=(255, 255, 255, 45), outline=(255, 255, 255, 100), width=2)
    draw.text((90, 103), badge_txt, font=f_badge, fill=(255, 255, 255))

    # Topic Title (wrap if long)
    words = topic_str.split()
    line1, line2 = "", ""
    for w in words:
        if len(line1 + " " + w) < 28:
            line1 = (line1 + " " + w).strip()
        else:
            line2 = (line2 + " " + w).strip()

    draw.text((70, 175), line1, font=f_title, fill=(255, 255, 255))
    if line2:
        draw.text((70, 235), line2, font=f_title, fill=(255, 255, 255))
        y_sub = 310
    else:
        y_sub = 250

    # Subtitle
    draw.text((70, y_sub), "📖 Detaylı Konu Anlatımı & Kurallar", font=f_sub, fill=(254, 240, 138))

    # Feature boxes at bottom
    feats = [
        ("📝 20 Soruluk Test", (59, 130, 246)),
        ("✅ Adım Adım Çözümler", (16, 185, 129)),
        ("🎥 Video Çözüm", (239, 68, 68)),
        ("📚 MEB Çözümleri", (168, 85, 247)),
    ]
    bx = 70
    by = 510
    for label, bg in feats:
        draw.rounded_rectangle([bx, by, bx + 240, by + 46], radius=12, fill=(255, 255, 255, 30), outline=(255, 255, 255, 80), width=1)
        draw.text((bx + 20, by + 12), label, font=f_features, fill=(255, 255, 255))
        bx += 265

    img.save(out_path, "WEBP", quality=90)
    return f"/uploads/{filename}"

print("Cover helper initialized.")
