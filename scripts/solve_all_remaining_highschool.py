# -*- coding: utf-8 -*-
"""
Batch High-School Textbook Solver for all remaining pages.
Solves 3 pages per request using high-speed, high-reasoning Gemini models.
Directly updates SQLite database and syncs cache.
"""

import os
import re
import json
import time
import socket
import sqlite3
import subprocess
from datetime import datetime, timezone

# Force IPv4 to avoid macOS IPv6 connection stalls
orig_getaddrinfo = socket.getaddrinfo
def getaddrinfo_ipv4(host, port, family=0, type=0, proto=0, flags=0):
    return orig_getaddrinfo(host, port, socket.AF_INET, type, proto, flags)
socket.getaddrinfo = getaddrinfo_ipv4
socket.setdefaulttimeout(30)

DB_PATH = "data/matemetrik.db"
CACHE_PATH = "data/solutions_highschool_cache.json"
NOW_ISO = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")
KEY = "AQ.Ab8RN6KcT_ST0wgHMOZx5Y2wWDvQFIr2troUzVes2YaQ3_wFLA"

MODELS = [
    "gemini-3.7-flash",
    "gemini-robotics-er-2-preview",
]

import sys
sys.path.insert(0, ".")
from scripts.solve_real_highschool_questions import BOOKS, is_generic_solution, build_post_html, clean_text

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

def solve_batch(grade, subject, batch_items, model_idx=0):
    """
    Solves a batch of up to 3 pages in a single prompt.
    batch_items is a list of dicts:
    [{"page": page_num, "topic": topic, "questions": [...]}, ...]
    """
    pages_prompt = ""
    for item in batch_items:
        pno = item["page"]
        qs = item["questions"]
        pages_prompt += f"\n[SAYFA {pno} - {item['topic']}]\n"
        for i, q in enumerate(qs, 1):
            pages_prompt += f"Soru {i}: {q}\n"

    prompt = f"""Sen MEB lise müfredatına son derece hakim uzman bir {grade} {subject} öğretmenisin.
Aşağıda MEB {grade} {subject} ders kitabına ait sayfalar ve sorulacak sorular verilmiştir:
{pages_prompt}

GÖREV:
Her bir sayfanın sorularını TEK TEK, gerçek sayılarla, formüllerle, bilimsel kurallarla veya metin analiziyle adım adım çöz.
ÖNEMLİ KURALLAR:
1. Kesinlikle "incelenir", "doğrulanır", "yürütülür" gibi şablon cümleler KURMA! Soruyu doğrudan fiilen çöz!
2. Her sorunun adım adım çözümünde (steps):
   - 1. Adım: Verilenleri ve sorulan büyüklüğü net yaz.
   - 2. Adım: Formülü/bağıntıyı yaz ve sayısal değerleri yerine koyarak işlemi yap (veya kuralı açıkla).
   - 3. Adım: Sonucu net olarak bul ve sadeleştir.
3. Her sorunun "result" alanına:
   - Kesinlikle "tamamlanmıştır" YAZMA!
   - Sorunun KESİN, NET cevabını yaz (Örn: "x = 4", "f(x) örtendir", "Cevap: 45 Joule", "Doğru seçenek C (Mitokondri)", "Cevap: Karasal İklim").

Döndürülecek JSON array formatı:
[
  {{
    "page": {batch_items[0]["page"]},
    "solutions": [
      {{
        "question_index": 1,
        "steps": ["1. Adım: ...", "2. Adım: ...", "3. Adım: ..."],
        "result": "Net doğru cevap / sayısal veya kavramsal sonuç"
      }}
    ]
  }}
]
Sadece ve sadece geçerli bir JSON array döndür.
"""

    payload_str = json.dumps({"contents": [{"parts": [{"text": prompt}]}]})

    for attempt in range(15):
        m = MODELS[(model_idx + attempt) % len(MODELS)]
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent?key={KEY}"
        try:
            res = subprocess.run(
                ["curl", "-4", "-s", "--max-time", "25", "-H", "Content-Type: application/json", "-d", payload_str, url],
                capture_output=True, text=True
            )
            if res.returncode == 0 and res.stdout:
                raw_data = json.loads(res.stdout)
                if "candidates" in raw_data and raw_data["candidates"]:
                    text = raw_data["candidates"][0]["content"]["parts"][0]["text"].strip()
                    if text.startswith("```"):
                        text = re.sub(r"^```(?:json)?\s*", "", text)
                        text = re.sub(r"\s*```$", "", text)
                    parsed = json.loads(text)
                    if isinstance(parsed, list) and len(parsed) > 0:
                        return parsed
                elif "error" in raw_data:
                    err_code = raw_data["error"].get("code")
                    if err_code == 429:
                        sleep_sec = min(30.0, 3.0 * (attempt + 1))
                        time.sleep(sleep_sec)
                    else:
                        time.sleep(1.5)
            else:
                time.sleep(1.5)
        except Exception:
            time.sleep(1.5)

    return None

def main():
    with open(CACHE_PATH, "r", encoding="utf-8") as f:
        cache = json.load(f)

    conn = sqlite3.connect(DB_PATH, timeout=60.0)
    c = conn.cursor()
    c.execute("""
        SELECT id, slug, title, category_slug, content FROM posts
        WHERE category_slug IN ('9-sinif', '10-sinif', '11-sinif')
          AND (content LIKE '%tamamlanmıştır%' OR content LIKE '%yürütülür ve sadeleştirme%')
        ORDER BY id ASC
    """)
    rows = c.fetchall()
    print(f"[{datetime.now().strftime('%H:%M:%S')}] Found {len(rows)} remaining posts to solve.")

    # Group by (grade, subject, book_id)
    by_book = {}
    for post_id, slug, title, cat_slug, content in rows:
        b = get_correct_book(slug, title, cat_slug)
        m_page = re.search(r"sayfa-(\d+)", slug)
        page_num = int(m_page.group(1)) if m_page else 1

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

        book_key = (b["id"], b["grade"], b["subject"], b["master_slug"], b["master_title"])
        if book_key not in by_book:
            by_book[book_key] = []

        by_book[book_key].append({
            "post_id": post_id,
            "slug": slug,
            "page": page_num,
            "topic": topic,
            "ptype": ptype,
            "questions": qs,
            "prev_link": prev_link,
            "next_link": next_link,
            "hub_link": hub_link,
            "book": b
        })

    total_solved = 0
    total_to_solve = len(rows)
    start_time = time.time()
    call_idx = 0

    for (b_id, grade, subject, m_slug, m_title), pages_list in by_book.items():
        print(f"\n>>> Solving {grade} {subject} ({len(pages_list)} pages)...")
        # Split pages_list into chunks of 3
        chunk_size = 3
        for i in range(0, len(pages_list), chunk_size):
            chunk = pages_list[i:i+chunk_size]
            batch_result = solve_batch(grade, subject, chunk, call_idx)
            call_idx += 1

            if batch_result:
                # Map results by page number
                res_by_page = {}
                for p_res in batch_result:
                    p_num = p_res.get("page")
                    sols = p_res.get("solutions", [])
                    if p_num and sols and not is_generic_solution(sols):
                        res_by_page[int(p_num)] = sols

                for page_item in chunk:
                    p_num = page_item["page"]
                    sols = res_by_page.get(p_num)
                    if not sols and len(batch_result) == 1 and "solutions" in batch_result[0]:
                        sols = batch_result[0]["solutions"]

                    if sols and not is_generic_solution(sols):
                        new_html = build_post_html(
                            grade, subject, p_num, page_item["topic"], page_item["ptype"],
                            page_item["questions"], sols, page_item["prev_link"],
                            page_item["next_link"], page_item["hub_link"], m_title
                        )
                        c.execute(
                            "UPDATE posts SET content = ?, updated_at = ? WHERE id = ?",
                            (new_html, NOW_ISO, page_item["post_id"])
                        )
                        cache_key = f"{b_id}_p{p_num}_{len(page_item['questions'])}"
                        cache[cache_key] = sols
                        total_solved += 1

                conn.commit()
                # Persist cache
                try:
                    with open(CACHE_PATH, "w", encoding="utf-8") as f:
                        json.dump(cache, f, ensure_ascii=False, indent=2)
                except Exception:
                    pass

                elapsed = time.time() - start_time
                rate = total_solved / elapsed if elapsed > 0 else 0
                rem_time = (total_to_solve - total_solved) / rate if rate > 0 else 0
                print(f"[{total_solved}/{total_to_solve}] Processed ({rate:.2f} p/s, ~{rem_time/60:.1f}m left) | Solved p.{chunk[0]['page']}-{chunk[-1]['page']} of {subject}", flush=True)
            else:
                print(f"Warning: Batch failed for {subject} pages {[p['page'] for p in chunk]}", flush=True)

            # Small polite pause to respect rate limits
            time.sleep(2.0)

    conn.commit()
    c.execute("PRAGMA wal_checkpoint(TRUNCATE);")
    c.execute("SELECT count(*) FROM posts WHERE category_slug IN ('9-sinif', '10-sinif', '11-sinif') AND content LIKE '%tamamlanmıştır%'")
    final_remaining = c.fetchone()[0]
    conn.close()

    print(f"\n=======================================================")
    print(f"COMPLETED! Solved {total_solved} posts.")
    print(f"Final remaining posts with tamamlanmıştır: {final_remaining}")
    print(f"=======================================================")

if __name__ == "__main__":
    main()
