# -*- coding: utf-8 -*-
import sqlite3
import re
import json
import urllib.request
import time

GEMINI_API_KEY = "AQ.Ab8RN6KcT_ST0wgHMOZx5Y2wWDvQFIr2troUzVes2YaQ3_wFLA"
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key={GEMINI_API_KEY}"

def solve_single_q(grade, topic, q_txt):
    prompt = f"""Sen MEB {grade} Matematik öğretmenisin.
Aşağıdaki matematik sorusunu/maddesini öğrenciler için adım adım, hesaplamalarıyla ve gerekçesiyle açıkça çöz.
Konu: {topic}
Soru:
{q_txt}

Lütfen tam olarak şu JSON formatında yanıt ver:
{{
  "steps": [
    "1. Adım: ...",
    "2. Adım: ..."
  ],
  "result": "Net doğru cevap ve sonuç"
}}
Yalnızca geçerli JSON döndür. Markdown etiketi koyma.
"""
    data = json.dumps({"contents": [{"parts": [{"text": prompt}]}]}).encode("utf-8")
    req = urllib.request.Request(GEMINI_URL, data=data, headers={"Content-Type": "application/json"}, method="POST")
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=25) as resp:
                res = json.loads(resp.read().decode("utf-8"))
                raw = res["candidates"][0]["content"]["parts"][0]["text"].strip()
                if raw.startswith("```"):
                    raw = re.sub(r"^```(?:json)?\s*", "", raw)
                    raw = re.sub(r"\s*```$", "", raw)
                return json.loads(raw)
        except Exception as e:
            time.sleep(1.5)
    return None

def main():
    conn = sqlite3.connect("data/matemetrik.db")
    cur = conn.cursor()
    cur.execute("""
        SELECT id, slug, category, content
        FROM posts 
        WHERE category_slug IN ('6-sinif', '7-sinif')
          AND content LIKE '%ilkeleri doğrultusunda tespit edilir%'
    """)
    rows = cur.fetchall()
    print(f"Posts with fallback cards to refine: {len(rows)}")

    fixed_cards = 0
    removed_fragments = 0

    for post_id, slug, grade, content in rows:
        topic_m = re.search(r"📍\s*([^<\n]+)", content)
        topic = topic_m.group(1).strip() if topic_m else f"{grade} Matematik"
        
        # Regex to split question cards
        card_pattern = re.compile(r'(<div class="my-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm overflow-hidden not-prose">.*?</div>\s*</div>\s*</div>)', re.DOTALL)
        cards = card_pattern.findall(content)
        
        new_cards = []
        card_idx = 1
        for card in cards:
            if "ilkeleri doğrultusunda tespit edilir" in card:
                q_m = re.search(r'<div class="text-base leading-relaxed font-medium text-slate-900">\s*(.*?)\s*</div>', card, re.DOTALL)
                q_txt = q_m.group(1).strip() if q_m else ""
                
                # Check if junk fragment
                if len(q_txt) < 30 or any(frag in q_txt for frag in ["2. Çarpan Çarpım", "1. Çarpan", "Çarpım =", "Tablo 1", "Tablo 2"]):
                    removed_fragments += 1
                    content = content.replace(card, "")
                    continue
                    
                # Solve with Gemini
                sol = solve_single_q(grade, topic, q_txt)
                if sol and "steps" in sol:
                    steps_html = "".join([f"<p>{s}</p>" for s in sol["steps"]])
                    res_txt = sol.get("result", "Doğru sonuç belirlenmiştir.")
                    
                    new_card = re.sub(
                        r'<div class="p-5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-base leading-relaxed space-y-3 font-normal">.*?</div>',
                        f'<div class="p-5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-base leading-relaxed space-y-3 font-normal">{steps_html}</div>',
                        card, flags=re.DOTALL
                    )
                    new_card = re.sub(
                        r'<div class="text-base md:text-lg font-extrabold text-emerald-950">.*?</div>',
                        f'<div class="text-base md:text-lg font-extrabold text-emerald-950">{res_txt}</div>',
                        new_card, flags=re.DOTALL
                    )
                    content = content.replace(card, new_card)
                    fixed_cards += 1
                    print(f"   [Fixed Card] {slug}: {q_txt[:50]}...")
                    time.sleep(0.3)
                    
        cur.execute("UPDATE posts SET content = ? WHERE id = ?", (content, post_id))

    conn.commit()
    cur.execute("PRAGMA wal_checkpoint(TRUNCATE);")

    cur.execute("SELECT COUNT(*) FROM posts WHERE category_slug IN ('6-sinif', '7-sinif') AND content LIKE '%ilkeleri doğrultusunda tespit edilir%'")
    remaining = cur.fetchone()[0]
    print(f"\nDone! Fixed cards: {fixed_cards}, Removed fragments: {removed_fragments}, Remaining fallback cards: {remaining}")
    conn.close()

if __name__ == "__main__":
    main()
