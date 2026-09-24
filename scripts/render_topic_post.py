# -*- coding: utf-8 -*-
"""
HTML Renderer for Konu Anlatımı posts.
Renders all 6 required sections + FAQ Schema with rich modern UI styling.
"""

import json

def build_topic_post_html(topic_data):
    """
    topic_data: {
        "grade_num": 6,
        "grade_str": "6. Sınıf",
        "subject": "Matematik",
        "topic": "Kesirlerle İşlemler",
        "title": "...",
        "slug": "...",
        "excerpt": "...",
        "theory_html": "...",
        "questions": [
            {
                "num": 1,
                "text": "...",
                "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
                "correct": "B",
                "solution": "..."
            }, ... 20 questions
        ],
        "video_embed_id": "...",
        "video_title": "...",
        "video_desc": "...",
        "meb_book_links": [
            {"title": "...", "url": "..."}
        ],
        "related_topics": [
            {"title": "...", "url": "..."}
        ],
        "faqs": [
            {"q": "...", "a": "..."}
        ]
    }
    """
    g_str = topic_data["grade_str"]
    subj = topic_data["subject"]
    topic = topic_data["topic"]
    slug = topic_data["slug"]
    
    # 1. Answer Key Summary Table
    ans_grid_html = '<div class="grid grid-cols-4 sm:grid-cols-10 gap-2 mb-6 text-center text-xs font-bold">'
    for q in topic_data["questions"]:
        ans_grid_html += f'''
        <div class="p-2 rounded-xl bg-slate-100 border border-slate-200">
            <span class="text-slate-500 block text-[10px] font-normal">Soru {q["num"]}</span>
            <span class="text-indigo-600 text-sm">{q["correct"]}</span>
        </div>'''
    ans_grid_html += '</div>'

    # 2. Questions Section HTML (Interactive Live Test with Instant Green/Red Feedback)
    questions_html = ""
    for q in topic_data["questions"]:
        opts_html = ""
        for opt in q["options"]:
            opt_letter = opt[0] if len(opt) > 0 and opt[0] in "ABCDE" else ""
            opt_text = opt[3:].strip() if len(opt) > 2 and opt[1] == ")" else opt
            opts_html += f'''
            <button type="button" 
                    class="quiz-option w-full text-left p-3.5 rounded-xl bg-slate-50 hover:bg-indigo-50/70 border border-slate-200 hover:border-indigo-300 text-sm font-medium text-slate-800 transition-all flex items-center justify-between cursor-pointer group select-none"
                    data-q="{q['num']}" 
                    data-opt="{opt_letter}">
                <span class="flex items-center gap-2.5 flex-1 pr-2">
                    <span class="opt-badge w-7 h-7 rounded-lg bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">{opt_letter}</span>
                    <span class="opt-text text-slate-900 font-medium">{opt_text}</span>
                </span>
                <span class="opt-feedback hidden text-xs font-black"></span>
            </button>'''
        
        questions_html += f'''
        <div class="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 quiz-card" id="soru-{q['num']}" data-quiz-q="{q['num']}" data-correct="{q['correct']}">
            <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                <span class="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700">Soru {q['num']}</span>
                <span class="text-xs text-indigo-600 font-semibold bg-indigo-50/80 px-2 py-0.5 rounded flex items-center gap-1">
                    <span>⚡ Canlı İnteraktif Test</span>
                </span>
            </div>
            <div class="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                {q['text']}
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {opts_html}
            </div>
            <!-- Feedback / Solution Hint (revealed after clicking an option) -->
            <div class="quiz-solution-hint hidden pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div class="font-bold text-slate-800 hint-text"></div>
                <a href="#cozum-{q['num']}" class="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold transition-colors">
                    🔍 Ayrıntılı Çözümü İncele &darr;
                </a>
            </div>
        </div>'''

    # 3. Solutions Section HTML
    solutions_html = ""
    for q in topic_data["questions"]:
        solutions_html += f'''
        <div class="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2 scroll-mt-24" id="cozum-{q['num']}">
            <div class="flex items-center justify-between">
                <h4 class="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-extrabold">{q['num']}</span>
                    Soru {q['num']} Ayrıntılı Çözümü
                </h4>
                <span class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">Doğru Seçenek: {q['correct']}</span>
            </div>
            <div class="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1 border-t border-slate-100">
                {q['solution']}
            </div>
        </div>'''

    # 4. Video Embed HTML
    video_id = topic_data.get("video_embed_id") or "s7z41u5mB-4"
    v_title = topic_data.get("video_title", f"{g_str} {subj} {topic} Video Konu Anlatımı")
    v_desc = topic_data.get("video_desc", "Müfredata uygun video dersi izleyerek püf noktalarını öğrenin ve soruları hocamızla birlikte çözün.")

    # 5. MEB Book Links HTML
    meb_links_html = ""
    for b in topic_data.get("meb_book_links", []):
        meb_links_html += f'''
        <a href="{b['url']}" class="p-4 rounded-xl bg-white border border-indigo-100 hover:border-indigo-400 hover:shadow-md transition-all flex items-center justify-between group">
            <div class="space-y-1">
                <div class="text-xs font-bold text-indigo-900 group-hover:text-indigo-600 transition-colors">{b['title']}</div>
                <div class="text-[11px] text-slate-500">Sayfa sayfa adım adım MEB ders kitabı çözümleri &rarr;</div>
            </div>
            <span class="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">İncele</span>
        </a>'''

    # 6. Related Topics HTML
    related_links_html = ""
    for r in topic_data.get("related_topics", []):
        related_links_html += f'''
        <a href="{r['url']}" class="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:bg-white hover:shadow-sm transition-all group">
            <div class="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{r['title']}</div>
            <div class="text-[11px] text-slate-500 mt-1">Konu anlatımı, 20 soru test ve video &rarr;</div>
        </a>'''

    # 7. FAQs HTML & FAQ Schema
    faqs = topic_data.get("faqs", [])
    faqs_html = ""
    faq_schema_items = []
    for f in faqs:
        faqs_html += f'''
        <details class="group p-4 rounded-2xl bg-white border border-slate-200 [&_summary::-webkit-details-marker]:hidden">
            <summary class="flex items-center justify-between cursor-pointer font-bold text-slate-900 text-sm hover:text-indigo-600 transition-colors">
                <span>{f['q']}</span>
                <span class="ml-4 shrink-0 text-slate-400 group-open:rotate-180 transition-transform">&darr;</span>
            </summary>
            <p class="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {f['a']}
            </p>
        </details>'''
        faq_schema_items.append({
            "@type": "Question",
            "name": f["q"],
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f["a"]
            }
        })

    faq_schema_json = json.dumps({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faq_schema_items
    }, ensure_ascii=False)

    # Master Content Assembly
    full_html = f'''
<article class="space-y-10 text-slate-800 leading-relaxed">
  <!-- Educational Warning & Maarif Badge -->
  <div class="p-5 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl flex items-start gap-3">
    <div class="text-xl">📌</div>
    <div class="text-xs sm:text-sm text-indigo-950 font-medium leading-relaxed">
      <strong>2026-2027 MEB &amp; Türkiye Yüzyılı Maarif Modeli Uyumlu Rehber:</strong> Bu sayfa <strong>{g_str} {subj}</strong> dersinin <strong>{topic}</strong> konusunu eksiksiz öğrenmeniz için hazırlanmıştır. Sayfa içerisinde; kapsamlı konu anlatımı, 20 soruluk yeni nesil deneme testi, tüm soruların adım adım çözümleri, video konu anlatımı ve resmi MEB ders kitabı çözümleri yer almaktadır.
    </div>
  </div>

  <!-- BÖLÜM 1: 📖 KONU ANLATIMI -->
  <section class="space-y-6" id="konu-anlatimi">
    <div class="flex items-center gap-3 pb-3 border-b-2 border-indigo-600">
      <div class="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md">📖</div>
      <div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">1. {topic} Konu Anlatımı</h2>
        <p class="text-xs text-slate-500 m-0">Kavramlar, temel kurallar, formüller ve çözümlü örnekler</p>
      </div>
    </div>

    <div class="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
      {topic_data['theory_html']}
    </div>
  </section>

  <!-- BÖLÜM 2: 📝 20 SORULUK TEST -->
  <section class="space-y-6 pt-6 border-t border-slate-200" id="20-soruluk-test">
    <div class="flex items-center gap-3 pb-3 border-b-2 border-blue-600">
      <div class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-md">📝</div>
      <div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">2. 20 Soruluk {topic} Tarama Testi</h2>
        <p class="text-xs text-slate-500 m-0">MEB kazanımlarına ve yeni nesil sınav formatına tam uyumlu 20 soru</p>
      </div>
    </div>

    <div class="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs sm:text-sm text-blue-900 font-medium">
      💡 <strong>Öğrenci Tavsiyesi:</strong> Soruları çözmeden önce bir kağıt-kalem alarak süre tutunuz. 20 soruyu tamamladıktan sonra bir alt kısımdaki ayrıntılı çözüm basamaklarından yanıtlarınızı kontrol edebilirsiniz.
    </div>

    <div class="space-y-5">
      {questions_html}
    </div>

    <!-- BÖLÜM 2.5: 📥 PDF TEST İNDİR & YAZDIR (SEO HEDEFİ) -->
    <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-xl space-y-5 border border-indigo-700/50 print:hidden" id="pdf-test-indir">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div class="space-y-2">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
            📥 2026-2027 MEB Formatı PDF Test &amp; Çıktı
          </div>
          <h3 class="text-xl sm:text-2xl font-black tracking-tight text-white m-0">
            {g_str} {subj} {topic} PDF Test İndir
          </h3>
          <p class="text-xs sm:text-sm text-indigo-200/90 leading-relaxed max-w-2xl m-0">
            <strong>{g_str} {subj} {topic} 20 soruluk yeni nesil tarama testi</strong>ni, MEB kazanım kavrama formatındaki cevap anahtarlı ve çözümlü PDF belgesini ücretsiz indirebilir veya tarayıcınızdan doğrudan tek tıkla yazdırarak kağıt üzerinde çözebilirsiniz.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
          <button
            type="button"
            onclick="window.print()"
            class="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            🖨️ PDF Test Olarak Yazdır / İndir
          </button>
          <a
            href="/sinav-hazirlama-robotu"
            class="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-white/20 transition-all text-center"
          >
            ✨ Sınav Kağıdı Formatında Düzenle
          </a>
        </div>
      </div>

      <!-- SEO Keywords & Related Search Tags -->
      <div class="pt-4 border-t border-indigo-800/60 flex flex-wrap items-center gap-2 text-[11px] text-indigo-300">
        <span class="font-bold text-white">Google Popüler Aramalar:</span>
        <span class="px-2.5 py-1 rounded-lg bg-indigo-800/40 border border-indigo-700/50">{g_str} {subj} {topic} pdf test indir</span>
        <span class="px-2.5 py-1 rounded-lg bg-indigo-800/40 border border-indigo-700/50">{g_str} {topic} test çöz pdf</span>
        <span class="px-2.5 py-1 rounded-lg bg-indigo-800/40 border border-indigo-700/50">{g_str} {subj} {topic} cevap anahtarlı test</span>
        <span class="px-2.5 py-1 rounded-lg bg-indigo-800/40 border border-indigo-700/50">2026-2027 meb {g_str} {topic} deneme</span>
      </div>
    </div>
  </section>

  <!-- BÖLÜM 3: ✅ TEST CEVAPLARI -->
  <section class="space-y-6 pt-6 border-t border-slate-200" id="test-cevaplari">
    <div class="flex items-center gap-3 pb-3 border-b-2 border-emerald-600">
      <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-md">✅</div>
      <div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">3. Test Cevap Anahtarı &amp; Adım Adım Çözümler</h2>
        <p class="text-xs text-slate-500 m-0">20 sorunun tamamının ayrıntılı işlem basamakları ve açıklamaları</p>
      </div>
    </div>

    {ans_grid_html}

    <div class="space-y-4">
      {solutions_html}
    </div>
  </section>

  <!-- BÖLÜM 4: 🎥 VİDEO ÇÖZÜM -->
  <section class="space-y-6 pt-6 border-t border-slate-200" id="video-cozum">
    <div class="flex items-center gap-3 pb-3 border-b-2 border-rose-600">
      <div class="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold text-lg shadow-md">🎥</div>
      <div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">4. Video Konu Anlatımı &amp; Çözüm Rehberi</h2>
        <p class="text-xs text-slate-500 m-0">Görsel ve sesli pekiştirme için özenle seçilmiş YouTube ders anlatımı</p>
      </div>
    </div>

    <div class="space-y-3">
      <div class="rounded-2xl overflow-hidden border border-slate-200 shadow-md aspect-video bg-black">
        <iframe
          class="w-full h-full"
          src="https://www.youtube.com/embed/{video_id}"
          title="{v_title}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
        <strong>Özet &amp; İzleme Rehberi:</strong> {v_desc}
      </div>
    </div>
  </section>

  <!-- BÖLÜM 5: 📚 MEB KİTABI ÇÖZÜMLERİ -->
  <section class="space-y-6 pt-6 border-t border-slate-200" id="meb-cozumleri">
    <div class="flex items-center gap-3 pb-3 border-b-2 border-amber-600">
      <div class="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-lg shadow-md">📚</div>
      <div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">5. Resmi MEB Ders Kitabı Çözümleri</h2>
        <p class="text-xs text-slate-500 m-0">Milli Eğitim Bakanlığı {g_str} ders kitaplarının sayfa sayfa çözümleri</p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {meb_links_html}
    </div>
  </section>

  <!-- BÖLÜM 6: 🔗 BENZER KONULAR -->
  <section class="space-y-6 pt-6 border-t border-slate-200" id="benzer-konular">
    <div class="flex items-center gap-3 pb-3 border-b-2 border-purple-600">
      <div class="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-md">🔗</div>
      <div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">6. İlgili ve Benzer Konu Anlatımları</h2>
        <p class="text-xs text-slate-500 m-0">Öğrenme zincirini tamamlayacak öncül ve ardıl konular</p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {related_links_html}
    </div>
  </section>

  <!-- BÖLÜM 7: ❓ SSS (FAQ) -->
  <section class="space-y-6 pt-6 border-t border-slate-200" id="sikca-sorulan-sorular">
    <div class="flex items-center gap-3 pb-3 border-b-2 border-teal-600">
      <div class="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-lg shadow-md">❓</div>
      <div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">Sıkça Sorulan Sorular (SSS)</h2>
        <p class="text-xs text-slate-500 m-0">{topic} konusu hakkında öğrencilerin en çok merak ettiği sorular</p>
      </div>
    </div>

    <div class="space-y-3">
      {faqs_html}
    </div>
  </section>

  <!-- Google Rich Snippet Schema Script -->
  <script type="application/ld+json">
  {faq_schema_json}
  </script>
</article>
'''
    return full_html
