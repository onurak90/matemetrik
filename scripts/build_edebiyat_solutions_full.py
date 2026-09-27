# -*- coding: utf-8 -*-
"""
High-School Türk Dili ve Edebiyatı (Grades 9, 10, 11) Textbook Solution Generator.
Reads the authentic 2026-2027 Türkiye Yüzyılı Maarif Modeli textbooks from /Users/saadetaydemir/Desktop/edebiyat
and creates SEO-optimized Master Book Posts and Detailed Page Solution Posts in data/matemetrik.db.
"""

import os
import sys
import re
import json
import sqlite3
from datetime import datetime, timezone

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

DB_PATH = "data/matemetrik.db"
NOW_STR = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")

def render_page_post_html(grade_label, grade_slug, subject_name, tema_title, page_num, ptype, questions_data, prev_slug, next_slug, master_slug):
    disclaimer = """<div class="my-4 p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 flex items-start gap-3 not-prose shadow-sm">
  <span class="text-xl shrink-0">⚠️</span>
  <div class="text-xs sm:text-sm leading-relaxed">
    <strong class="font-bold text-amber-900">Eğitsel Uyarı ve Bilgilendirme:</strong> Bu sayfada yer alan ders kitabı cevapları ve çözümleri yalnızca öğrencilerin kendi yaptıkları çalışmaları kontrol etmeleri, karşılaştırma yapmaları ve eksiklerini öğrenmeleri amacıyla hazırlanmıştır. Akademik gelişiminiz açısından alıştırma ve soruları öncelikle kendi başınıza çözmeniz esastır.
  </div>
</div>"""

    badge_bar = f"""<div class="my-4 flex flex-wrap items-center gap-2 not-prose">
  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-200/60">
    📘 {grade_label} {subject_name}
  </span>
  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-800 border border-cyan-200/60">
    📍 {tema_title}
  </span>
  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200/60">
    📝 {ptype} • Sayfa {page_num}
  </span>
  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200/60">
    ✓ 2026-2027 MEB Yayınları
  </span>
</div>"""

    guide_box = f"""<div class="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-indigo-950 text-sm leading-relaxed not-prose">
  <strong class="font-bold text-indigo-900">Konu ve Kazanım Rehberi:</strong> 2026-2027 MEB {grade_label} {subject_name} ders kitabı <em>{tema_title}</em> ünitesi kapsamında sayfa {page_num} alıştırmalarının, metin anlama-çözümleme, paragraf tahlilleri ve dil bilgisi sorularının adım adım doğrulanmış ayrıntılı çözümleri yer almaktadır.
</div>"""

    q_cards = []
    for q_idx, q_item in enumerate(questions_data, start=1):
        q_num = q_item.get("num", q_idx)
        q_title = q_item.get("title", f"Soru {q_num}")
        q_text = q_item.get("question", "")
        q_steps = q_item.get("steps", "")
        q_ans = q_item.get("answer", "")

        card_html = f"""<div class="my-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm overflow-hidden not-prose">
  <div class="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-6 py-4 text-white flex items-center justify-between">
    <h3 class="text-lg font-bold flex items-center gap-2 tracking-tight">
      <span class="w-8 h-8 rounded-lg bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center text-sm font-black text-indigo-300">
        {q_num}
      </span>
      {q_title}
    </h3>
    <span class="text-xs font-medium px-2.5 py-1 rounded-md bg-white/10 text-indigo-200 border border-white/10">
      MEB Sayfa {page_num}
    </span>
  </div>

  <div class="p-6 space-y-6">
    <div class="p-4 rounded-xl bg-amber-50/50 border border-amber-200/70 text-slate-800">
      <div class="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1.5 flex items-center gap-1.5">
        <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        Soru Metni
      </div>
      <div class="text-base leading-relaxed font-medium text-slate-900">
        {q_text}
      </div>
    </div>

    <div class="space-y-3">
      <div class="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
        Ayrıntılı Adım Adım Çözüm &amp; Edebî Tahlil
      </div>
      <div class="p-5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-base leading-relaxed space-y-3 font-normal">
        {q_steps}
      </div>
    </div>

    <div class="p-4 rounded-xl bg-emerald-50 border-2 border-emerald-500/40 text-emerald-950 flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black shrink-0 text-lg shadow-sm">
        ✓
      </div>
      <div>
        <div class="text-xs font-black uppercase tracking-wider text-emerald-800">Doğru Cevap / Sonuç</div>
        <div class="text-base md:text-lg font-extrabold text-emerald-950">{q_ans}</div>
      </div>
    </div>
  </div>
</div>"""
        q_cards.append(card_html)

    prev_button = (
        f'<a href="/post/{prev_slug}" class="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 transition-all border border-slate-200">← Önceki Sayfa Çözümleri</a>'
        if prev_slug
        else '<span class="text-slate-400 text-sm italic">İlk Sayfa</span>'
    )
    next_button = (
        f'<a href="/post/{next_slug}" class="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 transition-all border border-slate-200">Sonraki Sayfa Çözümleri →</a>'
        if next_slug
        else '<span class="text-slate-400 text-sm italic">Son Sayfa</span>'
    )
    hub_button = f'<a href="/post/{master_slug}" class="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all">📚 {grade_label} {subject_name} Tüm Cevaplar</a>'

    nav_bar = f"""<div class="my-6 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 not-prose shadow-sm">
  <div>{prev_button}</div>
  <div>{hub_button}</div>
  <div>{next_button}</div>
</div>"""

    full_html = f"""
{disclaimer}

{badge_bar}

{guide_box}

<div class="my-6">
{''.join(q_cards)}
</div>

{disclaimer}

{nav_bar}
"""
    return full_html.strip()


def render_master_post_html(grade_label, grade_slug, subject_name, units_data, pages_index_data, faqs_data):
    hero = f"""<div class="master-book-content space-y-8">
  <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl not-prose border border-indigo-900/40">
    <div class="flex flex-wrap items-center gap-2 mb-3">
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
        2026-2027 GÜNCEL MEB MÜFREDATI
      </span>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
        {grade_label} {subject_name}
      </span>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-400/30">
        TÜRKİYE YÜZYILI MAARİF MODELİ
      </span>
    </div>
    <h1 class="text-2xl sm:text-4xl font-black tracking-tight text-white mb-3">
      2026-2027 MEB {grade_label} {subject_name} Ders Kitabı Cevapları
    </h1>
    <p class="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
      Millî Eğitim Bakanlığı {grade_label} {subject_name} ders kitabında yer alan tüm hazırlık soruları, metin anlama ve tahlil çalışmaları, söz varlığı etkinlikleri, dil bilgisi ve ünite ölçme değerlendirme testlerinin alanında uzman Türk Dili ve Edebiyatı öğretmenleri tarafından hazırlanmış adım adım doğrulanmış tam çözümleri.
    </p>
  </div>

  <div class="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 flex items-start gap-3.5 not-prose shadow-sm">
    <span class="text-2xl shrink-0">💡</span>
    <div class="text-xs sm:text-sm leading-relaxed">
      <strong class="font-bold text-amber-900">Eğitsel Rehberlik ve Öneri:</strong> Bu sayfada yer alan kitap çözümleri, öğrencilerin kendi çözümlerini kontrol etmeleri, edebî metin tahlili mantığını kavramaları ve okul yazılılarına etkin biçimde hazırlanmaları için derlenmiştir. Konuları daha iyi pekiştirmek için <a href="/kategori/{grade_slug}" class="font-bold text-indigo-700 underline hover:text-indigo-900">{grade_label} Türk Dili ve Edebiyatı konu anlatımları</a> ve online testleri de mutlaka inceleyiniz.
    </div>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
    <a href="/kategori/{grade_slug}" class="flex items-center justify-between p-4 rounded-2xl bg-indigo-50 border border-indigo-200/80 hover:bg-indigo-100/80 transition-all group">
      <div class="flex items-center gap-3">
        <span class="text-2xl">📚</span>
        <div>
          <div class="text-xs font-bold text-indigo-900">{grade_label} Tüm Dersler &amp; Çözümler</div>
          <div class="text-[11px] text-indigo-700">{grade_label} kategorisindeki tüm materyallere göz atın</div>
        </div>
      </div>
      <span class="text-indigo-600 group-hover:translate-x-1 transition-transform font-bold">&rarr;</span>
    </a>
    <a href="/konu-anlatimlari" class="flex items-center justify-between p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 hover:bg-emerald-100/80 transition-all group">
      <div class="flex items-center gap-3">
        <span class="text-2xl">📝</span>
        <div>
          <div class="text-xs font-bold text-emerald-900">Konu Anlatımları &amp; 20 Soruluk Testler</div>
          <div class="text-[11px] text-emerald-700">İnteraktif test çöz, anında doğru/yanlış kontrolü yap</div>
        </div>
      </div>
      <span class="text-emerald-600 group-hover:translate-x-1 transition-transform font-bold">&rarr;</span>
    </a>
  </div>"""

    # Unit Cards
    unit_cards = []
    for u in units_data:
        unit_cards.append(f"""<div class="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-indigo-300 transition-all space-y-2.5">
  <div class="flex items-center justify-between">
    <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">{u['pages']}</span>
    <span class="text-xs font-semibold text-slate-400">{u['unit_num']}</span>
  </div>
  <h3 class="text-base font-bold text-slate-900 leading-snug">{u['title']}</h3>
  <p class="text-xs text-slate-600 leading-relaxed">{u['desc']}</p>
</div>""")

    units_html = f"""<div class="space-y-4">
  <div class="flex items-center justify-between pb-2 border-b border-slate-200">
    <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
      {grade_label} {subject_name} Tema ve Ünite Dağılımı
    </h2>
    <span class="text-xs font-bold text-slate-500">4 Tema • Maarif Modeli</span>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 not-prose">
    {''.join(unit_cards)}
  </div>
</div>"""

    # Table of Pages
    table_rows = []
    for p in pages_index_data:
        table_rows.append(f"""<tr class="hover:bg-indigo-50/40 transition-colors border-b border-slate-100">
  <td class="py-3 px-4 font-mono font-bold text-indigo-700 whitespace-nowrap">Sayfa {p['page']}</td>
  <td class="py-3 px-4 font-semibold text-slate-800 text-xs sm:text-sm">{p['title']}</td>
  <td class="py-3 px-4 text-slate-600 hidden sm:table-cell text-xs">{p['tema']}</td>
  <td class="py-3 px-4 text-right">
    <a href="/post/{p['slug']}" class="inline-flex items-center px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white font-bold text-xs transition-all">
      Çözümleri Gör &rarr;
    </a>
  </td>
</tr>""")

    index_table = f"""<div class="space-y-4">
  <div class="flex items-center justify-between pb-2 border-b border-slate-200">
    <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
      Sayfa Sayfa Alıştırma ve Soru Çözüm Rehberi
    </h2>
    <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
      {len(pages_index_data)} Sayfa İndeksi
    </span>
  </div>

  <div class="overflow-x-auto not-prose rounded-2xl border border-slate-200 shadow-sm bg-white">
    <table class="w-full text-left text-sm">
      <thead class="bg-slate-900 text-white text-xs uppercase tracking-wider">
        <tr>
          <th class="py-3.5 px-4 font-bold">Sayfa No</th>
          <th class="py-3.5 px-4 font-bold">Metin / Etkinlik Grubu</th>
          <th class="py-3.5 px-4 font-bold hidden sm:table-cell">Tema Bilgisi</th>
          <th class="py-3.5 px-4 text-right font-bold">İşlem</th>
        </tr>
      </thead>
      <tbody>
        {''.join(table_rows)}
      </tbody>
    </table>
  </div>
</div>"""

    # FAQ Section
    faq_items = []
    for f in faqs_data:
        faq_items.append(f"""<div class="p-4 rounded-xl bg-white border border-slate-200" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
  <h4 class="text-sm font-bold text-slate-900 mb-1" itemprop="name">{f['q']}</h4>
  <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
    <p class="text-xs text-slate-600 leading-relaxed" itemprop="text">{f['a']}</p>
  </div>
</div>""")

    faq_html = f"""<div class="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 not-prose" itemscope itemtype="https://schema.org/FAQPage">
  <h3 class="text-lg font-bold text-slate-900">Sıkça Sorulan Sorular ({grade_label} {subject_name} Ders Kitabı Cevapları)</h3>
  <div class="space-y-3">
    {''.join(faq_items)}
  </div>
</div>
</div>"""

    return f"{hero}\n{units_html}\n{index_table}\n{faq_html}".strip()


def build_all_edebiyat_solutions():
    import scripts.curriculum_edebiyat.data_grade9 as g9
    import scripts.curriculum_edebiyat.data_grade10 as g10
    import scripts.curriculum_edebiyat.data_grade11 as g11

    grades = [
        (9, g9),
        (10, g10),
        (11, g11),
    ]

    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    total_pages_inserted = 0
    total_masters_inserted = 0

    for grade, g_data in grades:
        grade_label = f"{grade}. Sınıf"
        grade_slug = f"{grade}-sinif"
        subject_name = "Türk Dili ve Edebiyatı"
        master_slug = f"2026-2027-meb-turk-dili-ve-edebiyati-ders-kitabi-cevaplari-{grade}-sinif"
        master_title = f"2026-2027 MEB Türk Dili ve Edebiyatı Ders Kitabı Cevapları ({grade}. Sınıf)"
        cover_image = f"/uploads/cover-book-turk-dili-ve-edebiyati-{grade}.webp"

        sorted_pages = sorted(g_data.PAGES.keys())
        print(f"\nProcessing Grade {grade}: {len(sorted_pages)} pages found.")

        pages_index_data = []
        for p in sorted_pages:
            p_data = g_data.PAGES[p]
            p_slug = f"{grade}-sinif-turk-dili-ve-edebiyati-sayfa-{p}-cevaplari-meb"
            pages_index_data.append({
                "page": p,
                "title": p_data["title"],
                "tema": p_data["tema"],
                "slug": p_slug
            })

        # 1. Master Post
        master_content = render_master_post_html(
            grade_label=grade_label,
            grade_slug=grade_slug,
            subject_name=subject_name,
            units_data=g_data.UNITS,
            pages_index_data=pages_index_data,
            faqs_data=g_data.FAQS
        )
        master_excerpt = f"2026-2027 MEB {grade_label} {subject_name} ders kitabı sayfa çözümleri, metin tahlilleri, söz varlığı ve ünite ölçme değerlendirme soruları doğrulanmış cevapları."
        master_tags = json.dumps([f"{grade_label} Edebiyat", "MEB Ders Kitabı Cevapları", "Türk Dili ve Edebiyatı", "2026-2027 MEB Yayınları", "Maarif Modeli"], ensure_ascii=False)

        c.execute("""
            INSERT INTO posts (title, slug, excerpt, content, featured_image, category, category_slug, tags, author, views, is_published, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Matemetrik', 250, 1, ?, ?)
            ON CONFLICT(slug) DO UPDATE SET
              title = excluded.title,
              excerpt = excluded.excerpt,
              content = excluded.content,
              featured_image = excluded.featured_image,
              category = excluded.category,
              category_slug = excluded.category_slug,
              tags = excluded.tags,
              is_published = 1,
              updated_at = excluded.updated_at
        """, (master_title, master_slug, master_excerpt, master_content, cover_image, grade_label, grade_slug, master_tags, NOW_STR, NOW_STR))
        total_masters_inserted += 1

        # 2. Individual Page Posts
        for i, p in enumerate(sorted_pages):
            p_data = g_data.PAGES[p]
            page_slug = f"{grade}-sinif-turk-dili-ve-edebiyati-sayfa-{p}-cevaplari-meb"
            page_title = f"{grade_label} Türk Dili ve Edebiyatı Ders Kitabı Sayfa {p} Cevapları (MEB)"
            prev_slug = f"{grade}-sinif-turk-dili-ve-edebiyati-sayfa-{sorted_pages[i-1]}-cevaplari-meb" if i > 0 else None
            next_slug = f"{grade}-sinif-turk-dili-ve-edebiyati-sayfa-{sorted_pages[i+1]}-cevaplari-meb" if i < len(sorted_pages) - 1 else None

            page_content = render_page_post_html(
                grade_label=grade_label,
                grade_slug=grade_slug,
                subject_name=subject_name,
                tema_title=p_data["tema"],
                page_num=p,
                ptype=p_data["ptype"],
                questions_data=p_data["questions"],
                prev_slug=prev_slug,
                next_slug=next_slug,
                master_slug=master_slug
            )
            page_excerpt = f"2026-2027 MEB {grade_label} {subject_name} ders kitabı {p_data['tema']} ünitesi sayfa {p} etkinlik, metin anlama ve çözümleme soruları ayrıntılı cevapları."
            page_tags = json.dumps([f"{grade_label} Edebiyat", "MEB Ders Kitabı Cevapları", f"Sayfa {p} Cevapları", "Türk Dili ve Edebiyatı Çözümleri", p_data["tema"]], ensure_ascii=False)

            c.execute("""
                INSERT INTO posts (title, slug, excerpt, content, featured_image, category, category_slug, tags, author, views, is_published, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Matemetrik', 120, 1, ?, ?)
                ON CONFLICT(slug) DO UPDATE SET
                  title = excluded.title,
                  excerpt = excluded.excerpt,
                  content = excluded.content,
                  featured_image = excluded.featured_image,
                  category = excluded.category,
                  category_slug = excluded.category_slug,
                  tags = excluded.tags,
                  is_published = 1,
                  updated_at = excluded.updated_at
            """, (page_title, page_slug, page_excerpt, page_content, cover_image, grade_label, grade_slug, page_tags, NOW_STR, NOW_STR))
            total_pages_inserted += 1

    conn.commit()
    conn.close()

    print(f"\n==========================================")
    print(f"SUCCESS: {total_masters_inserted} Master Posts and {total_pages_inserted} Page Posts inserted/updated in {DB_PATH}.")
    print(f"==========================================")

if __name__ == "__main__":
    build_all_edebiyat_solutions()

