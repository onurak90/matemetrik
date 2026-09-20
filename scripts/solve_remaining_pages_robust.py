# -*- coding: utf-8 -*-
"""
Robust High-School Textbook Solver for all remaining pages.
Uses curl -4 subprocess against fast models (gemini-robotics-er-2-preview, gemini-3.7-flash)
with 2 concurrent workers, thread-safe SQLite commits, and instant fallback retry.
"""

import os
import re
import json
import time
import socket
import sqlite3
import subprocess
import threading
from datetime import datetime, timezone

# Force IPv4
orig_getaddrinfo = socket.getaddrinfo
def getaddrinfo_ipv4(host, port, family=0, type=0, proto=0, flags=0):
    return orig_getaddrinfo(host, port, socket.AF_INET, type, proto, flags)
socket.getaddrinfo = getaddrinfo_ipv4

DB_PATH = "data/matemetrik.db"
CACHE_PATH = "data/solutions_highschool_cache.json"
NOW_ISO = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")
KEY = "AQ.Ab8RN6KcT_ST0wgHMOZx5Y2wWDvQFIr2troUzVes2YaQ3_wFLA"

MODELS = [
    "gemini-robotics-er-2-preview",
    "gemini-3.7-flash",
]

import sys
sys.path.insert(0, ".")
from scripts.solve_real_highschool_questions import BOOKS, is_generic_solution, build_post_html, clean_text

db_lock = threading.Lock()

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

def solve_page(grade, subject, page_num, topic, ptype, questions, worker_id=0):
    qs_str = ""
    for i, q in enumerate(questions, 1):
        qs_str += f"Soru {i}: {q}\n"

    prompt = f"""Sen MEB lise müfredatına ve ÖSYM soru tiplerine son derece hakim uzman bir {grade} {subject} öğretmenisin.
Aşağıda MEB {grade} {subject} Ders Kitabı, Sayfa {page_num} ({topic} - {ptype}) sayfasında yer alan sorular verilmiştir:

{qs_str}

GÖREV:
Soruları TEK TEK, gerçek formüllerle, sayılarla, kurallarla adım adım çöz.
ÖNEMLİ KURALLAR:
1. Kesinlikle "incelenir", "doğrulanır", "yürütülür" gibi şablon cümleler KURMA! Soruyu doğrudan fiilen çöz!
2. Her sorunun adım adım çözümünde (steps):
   - 1. Adım: Verilenleri, sorulan büyüklüğü net yaz.
   - 2. Adım: Formülü/bağıntıyı yaz ve sayısal değerleri yerine koyarak işlemi yap (veya bilimsel/coğrafi kuralı açıkla).
   - 3. Adım: Sonucu net olarak bul ve sadeleştir.
3. Her sorunun "result" (Doğru Cevap / Sonuç) alanına:
   - Kesinlikle "tamamlanmıştır" YAZMA!
   - Sorunun NET ve KESİN cevabını yaz (Örn: "x = 4", "f(x) fonksiyonu örtendir", "Cevap: 45 Joule", "Doğru seçenek C (Mitokondri)", "Cevap: Karasal İklim").

Döndürülecek JSON array formatı:
[
  {{
    "question_index": 1,
    "steps": [
      "1. Adım: ...",
      "2. Adım: ...",
      "3. Adım: ..."
    ],
    "result": "Net doğru cevap / sayısal veya kavramsal sonuç"
  }}
]
Sadece ve sadece geçerli bir JSON array döndür.
"""

    payload = json.dumps({"contents": [{"parts": [{"text": prompt}]}]})

    for attempt in range(12):
        m = MODELS[(worker_id + attempt) % len(MODELS)]
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent?key={KEY}"
        try:
            res = subprocess.run(
                ["curl", "-4", "-s", "--max-time", "30", "-H", "Content-Type: application/json", "-d", payload, url],
                capture_output=True, text=True
            )
            if res.returncode == 0 and res.stdout:
                raw_data = json.loads(res.stdout)
                if "candidates" in raw_data and raw_data["candidates"]:
                    parts = raw_data["candidates"][0]["content"]["parts"]
                    text = "".join(p.get("text", "") for p in parts if not p.get("thought", False)).strip()
                    if text.startswith("```"):
                        text = re.sub(r"^```(?:json)?\s*", "", text)
                        text = re.sub(r"\s*```$", "", text)
                    parsed = json.loads(text)
                    if isinstance(parsed, list) and len(parsed) > 0 and not is_generic_solution(parsed):
                        return parsed
                elif "error" in raw_data:
                    err_code = raw_data["error"].get("code")
                    if err_code == 429:
                        sleep_sec = min(20.0, 2.5 * (attempt + 1))
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

    tasks = []
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

        tasks.append({
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

    completed = 0
    total = len(tasks)
    start_time = time.time()

    from concurrent.futures import ThreadPoolExecutor, as_completed

    def worker(task_item, w_id):
        b = task_item["book"]
        sols = solve_page(
            b["grade"], b["subject"], task_item["page"], task_item["topic"],
            task_item["ptype"], task_item["questions"], w_id
        )
        return task_item, sols

    with ThreadPoolExecutor(max_workers=2) as executor:
        futures = {executor.submit(worker, t, i % 2): t for i, t in enumerate(tasks)}

        for f in as_completed(futures):
            t_item, sols = f.result()
            completed += 1

            if sols and not is_generic_solution(sols):
                b = t_item["book"]
                new_html = build_post_html(
                    b["grade"], b["subject"], t_item["page"], t_item["topic"],
                    t_item["ptype"], t_item["questions"], sols, t_item["prev_link"],
                    t_item["next_link"], t_item["hub_link"], b["master_title"]
                )
                with db_lock:
                    c.execute(
                        "UPDATE posts SET content = ?, updated_at = ? WHERE id = ?",
                        (new_html, NOW_ISO, t_item["post_id"])
                    )
                    conn.commit()
                    cache_key = f"{b['id']}_p{t_item['page']}_{len(t_item['questions'])}"
                    cache[cache_key] = sols

            elapsed = time.time() - start_time
            rate = completed / elapsed if elapsed > 0 else 0
            rem_s = (total - completed) / rate if rate > 0 else 0
            print(f"[{completed}/{total}] ({rate:.2f} p/s, ~{rem_s/60:.1f}m left) | Solved {t_item['book']['subject']} p.{t_item['page']}", flush=True)

            if completed % 10 == 0:
                with db_lock:
                    try:
                        with open(CACHE_PATH, "w", encoding="utf-8") as f_cache:
                            json.dump(cache, f_cache, ensure_ascii=False, indent=2)
                    except Exception:
                        pass

    with db_lock:
        conn.commit()
        c.execute("PRAGMA wal_checkpoint(TRUNCATE);")
        c.execute("SELECT count(*) FROM posts WHERE category_slug IN ('9-sinif', '10-sinif', '11-sinif') AND content LIKE '%tamamlanmıştır%'")
        final_count = c.fetchone()[0]
        conn.close()

    print(f"\n=======================================================")
    print(f"FINISHED! All {completed} posts processed.")
    print(f"Remaining posts with tamamlanmıştır: {final_count}")
    print(f"=======================================================")

if __name__ == "__main__":
    main()
