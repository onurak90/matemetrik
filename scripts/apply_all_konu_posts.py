# -*- coding: utf-8 -*-
"""
Generate and apply all 55+ Konu Anlatımı posts to SQLite database.
Generates cover images, HTML content, FAQ schema, tags, and writes the JSON catalog.
Safe SQLite operations with retry to prevent any lock contention with ongoing solvers.
"""

import os
import sys
import json
import sqlite3
import time
from datetime import datetime, timezone

sys.path.insert(0, ".")
from scripts.render_topic_post import build_topic_post_html
from scripts.build_konu_anlatimlari import generate_cover_image
from scripts.build_full_curriculum_data import get_full_curriculum_catalog

DB_PATH = "data/matemetrik.db"
CATALOG_PATH = "data/konu_anlatimlari_catalog.json"
NOW_ISO = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")

def safe_db_op(func):
    for attempt in range(15):
        try:
            conn = sqlite3.connect(DB_PATH, timeout=60.0)
            c = conn.cursor()
            res = func(conn, c)
            conn.commit()
            conn.close()
            return res
        except sqlite3.OperationalError as e:
            if "locked" in str(e).lower() or "busy" in str(e).lower():
                time.sleep(0.5 * (attempt + 1))
            else:
                raise
    raise RuntimeError("Database locked after multiple retries.")

def main():
    print(f"[{datetime.now().strftime('%H:%M:%S')}] Starting Konu Anlatımları post generation...")
    all_topics = get_full_curriculum_catalog()
    print(f"Total topics to process: {len(all_topics)}")

    catalog_data = []

    for idx, t in enumerate(all_topics, 1):
        g_num = t["grade_num"]
        g_str = t["grade_str"]
        subj = t["subject"]
        topic = t["topic"]
        slug = t["slug"]
        title = t["title"]
        excerpt = t["excerpt"]
        cat_slug = t["category_slug"]
        cat_name = f"{g_num}. Sınıf"

        # 1. Generate Cover Image
        img_filename = f"cover-{slug}.webp"
        cover_url = generate_cover_image(g_str, subj, topic, img_filename)

        # 2. Render Full HTML
        html_content = build_topic_post_html(t)

        # 3. Tags
        tags = json.dumps([
            f"{g_str} {subj}",
            topic,
            "Konu Anlatımı",
            "20 Soruluk Test",
            "MEB Çözümleri",
            "2026-2027 Maarif Modeli"
        ], ensure_ascii=False)

        # 4. Upsert into database
        def upsert_post(conn, c):
            c.execute("SELECT id FROM posts WHERE slug = ?", (slug,))
            row = c.fetchone()
            if row:
                post_id = row[0]
                c.execute("""
                    UPDATE posts SET
                        title = ?,
                        excerpt = ?,
                        content = ?,
                        featured_image = ?,
                        category = ?,
                        category_slug = ?,
                        tags = ?,
                        author = 'Cavenaghi',
                        is_published = 1,
                        updated_at = ?
                    WHERE id = ?
                """, (title, excerpt, html_content, cover_url, cat_name, cat_slug, tags, NOW_ISO, post_id))
            else:
                c.execute("""
                    INSERT INTO posts (
                        title, slug, excerpt, content, featured_image,
                        category, category_slug, tags, author, views,
                        is_published, created_at, updated_at
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Cavenaghi', 150, 1, ?, ?)
                """, (title, slug, excerpt, html_content, cover_url, cat_name, cat_slug, tags, NOW_ISO, NOW_ISO))
            return True

        safe_db_op(upsert_post)
        print(f"[{idx}/{len(all_topics)}] Saved: {g_str} {subj} - {topic}")

        # Add to catalog
        catalog_data.append({
            "grade_num": g_num,
            "grade_str": g_str,
            "subject": subj,
            "topic": topic,
            "slug": slug,
            "title": title,
            "excerpt": excerpt,
            "featured_image": cover_url,
            "category_slug": cat_slug,
            "category_name": cat_name,
            "question_count": len(t["questions"])
        })

    # Save Catalog JSON
    os.makedirs(os.path.dirname(CATALOG_PATH), exist_ok=True)
    with open(CATALOG_PATH, "w", encoding="utf-8") as f:
        json.dump(catalog_data, f, ensure_ascii=False, indent=2)

    print(f"\n[SUCCESS] All {len(all_topics)} topics applied to DB and saved to {CATALOG_PATH}.")

if __name__ == "__main__":
    main()
