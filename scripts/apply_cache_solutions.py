# -*- coding: utf-8 -*-
"""
Apply verified clean solutions from data/solutions_highschool_cache.json
directly to posts with accurate book matching and proper HTML formatting.
"""

import json
import sqlite3
import re
import sys
from datetime import datetime, timezone

sys.path.insert(0, ".")
from scripts.solve_real_highschool_questions import BOOKS, is_generic_solution, build_post_html, clean_text

CACHE_PATH = "data/solutions_highschool_cache.json"
DB_PATH = "data/matemetrik.db"
NOW_ISO = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")

def get_correct_book(slug, title, cat_slug):
    for b in BOOKS:
        if b["id"] in slug:
            return b
    for b in BOOKS:
        if b["grade"] in title:
            if "2. kitap" in b["subject"].lower() or "2.kitap" in b["subject"].lower():
                if "2. kitap" in title.lower() or "2.kitap" in title.lower() or "k2" in slug:
                    return b
            elif "1. kitap" in b["subject"].lower() or "1.kitap" in b["subject"].lower():
                if "2. kitap" not in title.lower() and "k2" not in slug:
                    return b
            elif "temel" in b["subject"].lower() and "temel" in title.lower():
                return b
            elif "temel" not in b["subject"].lower() and "temel" not in title.lower():
                subj_clean = b["subject"].split("(")[0].strip()
                if subj_clean.lower() in title.lower():
                    return b
    for b in BOOKS:
        if b["category_slug"] == cat_slug:
            return b
    return BOOKS[0]

def main():
    with open(CACHE_PATH, "r", encoding="utf-8") as f:
        cache = json.load(f)

    conn = sqlite3.connect(DB_PATH, timeout=60.0)
    c = conn.cursor()
    c.execute("""
        SELECT id, slug, title, category_slug, content FROM posts
        WHERE category_slug IN ('9-sinif', '10-sinif', '11-sinif')
          AND (content LIKE '%tamamlanmıştır%' OR content LIKE '%yürütülür ve sadeleştirme%')
    """)
    rows = c.fetchall()
    print(f"Loaded {len(rows)} posts needing clean solutions.")

    updated_count = 0
    for post_id, slug, title, cat_slug, content in rows:
        b = get_correct_book(slug, title, cat_slug)
        m_page = re.search(r"sayfa-(\d+)", slug)
        page_num = int(m_page.group(1)) if m_page else 1

        b_id = b["id"]
        prefix = f"{b_id}_p{page_num}_"
        matched_solutions = None
        for k, v in cache.items():
            if k.startswith(prefix):
                if not is_generic_solution(v):
                    matched_solutions = v
                    break

        if matched_solutions:
            m_topic = re.search(r"📍\s*([^<\n]+)", content)
            topic = m_topic.group(1).strip() if m_topic else f"{b['grade']} {b['subject']}"
            m_ptype = re.search(r"📝\s*([^•<\n]+)", content)
            ptype = m_ptype.group(1).strip() if m_ptype else "Etkinlik & Alıştırmalar"

            qs = re.findall(r'<div class="text-base leading-relaxed font-medium text-slate-900">\s*(.*?)\s*</div>', content, re.DOTALL)
            qs = [clean_text(q) for q in qs if len(clean_text(q)) > 15]
            if not qs:
                qs = [f"{b['grade']} {b['subject']} Sayfa {page_num} {ptype} sorusu."]

            m_prev = re.search(r'(<a href="/post/[^"]+"[^>]*>← Sayfa \d+ Çözümleri</a>|<span class="text-slate-400 text-sm italic">İlk Sayfa</span>)', content)
            prev_link = m_prev.group(1) if m_prev else '<span class="text-slate-400 text-sm italic">İlk Sayfa</span>'

            m_next = re.search(r'(<a href="/post/[^"]+"[^>]*>Sayfa \d+ Çözümleri →</a>|<span class="text-slate-400 text-sm italic">Son Sayfa</span>)', content)
            next_link = m_next.group(1) if m_next else '<span class="text-slate-400 text-sm italic">Son Sayfa</span>'

            hub_link = f'<a href="/post/{b["master_slug"]}" class="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all">📚 {b["grade"]} {b["subject"]} Tüm Cevaplar</a>'

            new_html = build_post_html(
                b["grade"], b["subject"], page_num, topic, ptype, qs,
                matched_solutions, prev_link, next_link, hub_link, b["master_title"]
            )

            c.execute("UPDATE posts SET content = ?, updated_at = ? WHERE id = ?", (new_html, NOW_ISO, post_id))
            updated_count += 1

    conn.commit()
    c.execute("PRAGMA wal_checkpoint(TRUNCATE);")
    print(f"Applied verified clean solutions to {updated_count} posts from cache.")

    c.execute("SELECT count(*) FROM posts WHERE category_slug IN ('9-sinif', '10-sinif', '11-sinif') AND content LIKE '%tamamlanmıştır%'")
    remaining = c.fetchone()[0]
    print(f"Remaining posts with tamamlanmıştır: {remaining}")
    conn.close()

if __name__ == "__main__":
    main()
