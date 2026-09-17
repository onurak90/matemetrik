import os
from PIL import Image, ImageDraw, ImageFont

def create_plan_cover(grade_text, title_sub, badge_text, filename, bg_gradient_start, bg_gradient_end):
    width = 1200
    height = 630
    img = Image.new('RGB', (width, height), bg_gradient_start)
    draw = ImageDraw.Draw(img)

    # Vertical gradient
    r1, g1, b1 = bg_gradient_start
    r2, g2, b2 = bg_gradient_end
    for y in range(height):
        factor = y / height
        r = int(r1 + (r2 - r1) * factor)
        g = int(g1 + (g2 - g1) * factor)
        b = int(b1 + (b2 - b1) * factor)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    # Grid decorative pattern
    grid_color = (255, 255, 255, 12)
    overlay = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    ov_draw = ImageDraw.Draw(overlay)
    for x in range(0, width, 40):
        ov_draw.line([(x, 0), (x, height)], fill=(255, 255, 255, 15), width=1)
    for y in range(0, height, 40):
        ov_draw.line([(0, y), (width, y)], fill=(255, 255, 255, 15), width=1)

    # Decorative shapes / glow circles
    ov_draw.ellipse([850, -100, 1300, 350], fill=(255, 255, 255, 25))
    ov_draw.ellipse([50, 450, 350, 750], fill=(255, 255, 255, 20))
    img.paste(Image.alpha_composite(Image.new('RGBA', (width, height), (0,0,0,0)), overlay), (0,0), overlay)

    # Fonts
    font_path = '/Library/Fonts/Arial Unicode.ttf'
    if not os.path.exists(font_path):
        font_path = '/System/Library/Fonts/Supplemental/Arial.ttf'
    
    font_badge = ImageFont.truetype(font_path, 22)
    font_main = ImageFont.truetype(font_path, 54)
    font_sub = ImageFont.truetype(font_path, 32)
    font_year = ImageFont.truetype(font_path, 26)
    font_brand = ImageFont.truetype(font_path, 24)

    draw = ImageDraw.Draw(img)

    # Top Brand
    draw.text((80, 60), "MATEMETRİK.COM • RESMÎ MEB ÇERÇEVE PLANI", font=font_brand, fill=(224, 231, 255))

    # Badge Pill
    badge_w = 360
    badge_h = 44
    draw.rounded_rectangle([80, 120, 80 + badge_w, 120 + badge_h], radius=22, fill=(255, 255, 255, 50), outline=(255, 255, 255, 120), width=2)
    draw.text((105, 128), badge_text, font=font_badge, fill=(255, 255, 255))

    # Main Grade Title
    draw.text((80, 195), grade_text, font=font_main, fill=(255, 255, 255))
    
    # Subtitle
    draw.text((80, 275), title_sub, font=font_sub, fill=(254, 240, 138))

    # Feature checklist pills
    features = [
        "✓ 39 Haftalık Tam Kazanım Dağılımı",
        "✓ Türkiye Yüzyılı Maarif Modeli",
        "✓ Excel (.xlsx) ve PDF İndir",
        "✓ Okul & Öğretmen Otomatik Antet"
    ]
    y_pos = 360
    for f in features:
        draw.text((80, y_pos), f, font=font_year, fill=(241, 245, 249))
        y_pos += 44

    # Bottom footer card
    draw.rounded_rectangle([80, 540, 1120, 595], radius=16, fill=(15, 23, 42, 180), outline=(255, 255, 255, 60), width=1)
    draw.text((105, 555), "⚡ Matemetrik Yıllık Plan Robotu ile Ücretsiz Oluşturun ve Düzenleyin", font=font_badge, fill=(56, 189, 248))

    os.makedirs('public/uploads', exist_ok=True)
    out_path = os.path.join('public/uploads', filename)
    img.save(out_path, 'WEBP', quality=90)
    print(f"Generated: {out_path}")

covers = [
    ("9. Sınıf Matematik Yıllık Planı", "2026-2027 Türkiye Yüzyılı Maarif Modeli", "★ YENİ MÜFREDAT TAM UYUMLU", "cover-2026-2027-9-sinif-matematik-maarif-modeli-yillik-plani.webp", (30, 27, 75), (67, 56, 202)),
    ("10. Sınıf Matematik Yıllık Planı", "2026-2027 Türkiye Yüzyılı Maarif Modeli", "★ YENİ MÜFREDAT TAM UYUMLU", "cover-2026-2027-10-sinif-matematik-maarif-modeli-yillik-plani.webp", (15, 23, 42), (30, 58, 138)),
    ("11. Sınıf İleri Matematik Planı", "2026-2027 Yıllık Çerçeve Ders Planı", "★ MEB ÇERÇEVE PLANI & EXCEL", "cover-2026-2027-11-sinif-matematik-ileri-yillik-plani.webp", (6, 78, 59), (4, 120, 87)),
    ("12. Sınıf İleri Matematik Planı", "2026-2027 AYT & YKS Odaklı Yıllık Plan", "★ LİSE MEZUNİYET & YKS", "cover-2026-2027-12-sinif-matematik-yillik-plani.webp", (136, 19, 55), (190, 18, 60)),
    ("12. Sınıf Temel Matematik Planı", "2026-2027 2 Saatlik Haftalık Ders Planı", "★ TEMEL DÜZEY MATEMATİK", "cover-2026-2027-12-sinif-temel-matematik-yillik-plani.webp", (67, 20, 7), (154, 52, 18)),
]

for c in covers:
    create_plan_cover(c[0], c[1], c[2], c[3], c[4], c[5])
