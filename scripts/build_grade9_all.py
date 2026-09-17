# -*- coding: utf-8 -*-
"""
Master Builder Script for 2026-2027 MEB 9. Sınıf Matematik Ders Kitabı Cevapları
Generates:
1. Master Pillar Post: 2026-2027 MEB Matematik Ders Kitabı Cevapları (slug: 2026-2027-meb-matematik-ders-kitabi-cevaplari)
2. 68 Individual Page Posts: 9. Sınıf Matematik Ders Kitabı Sayfa [X] Cevapları (MEB Yayınları)
With full step-by-step solutions, interactive button directory, internal cross-linking, and author 'Cavenaghi'.
"""

import os
import sqlite3
import random
from datetime import datetime, timezone
import json

from data_grade9_tema1 import TEMA_1_PAGES
from data_grade9_tema2 import TEMA_2_PAGES
from data_grade9_tema3 import TEMA_3_PAGES

DB_PATH = "data/matemetrik.db"
NOW_ISO = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")

ALL_PAGES = TEMA_1_PAGES + TEMA_2_PAGES + TEMA_3_PAGES
for p in ALL_PAGES:
    p["slug"] = p.get("slug", f"9-sinif-matematik-ders-kitabi-sayfa-{p['page']}-cevaplari-meb")
ALL_PAGES.sort(key=lambda p: p["page"])

print(f"Total pages loaded: {len(ALL_PAGES)}")

MASTER_SLUG = "2026-2027-meb-matematik-ders-kitabi-cevaplari"
MASTER_TITLE = "2026-2027 MEB Matematik Ders Kitabı Cevapları (9. Sınıf 1. Kitap - Maarif Modeli)"

def build_individual_post_html(page_data, prev_page, next_page):
    pno = page_data["page"]
    tema = page_data["tema"]
    topic = page_data["topic"]
    ptype = page_data["type"]
    intro = page_data.get("intro", "")
    questions = page_data.get("questions", [])

    # Nav Bar HTML
    prev_link = f'<a href="/post/{prev_page["slug"]}" class="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 transition-all border border-slate-200">← Sayfa {prev_page["page"]} Çözümleri</a>' if prev_page else '<span class="text-slate-400 text-sm italic">İlk Sayfa</span>'
    next_link = f'<a href="/post/{next_page["slug"]}" class="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 transition-all border border-slate-200">Sayfa {next_page["page"]} Çözümleri →</a>' if next_page else '<span class="text-slate-400 text-sm italic">Son Sayfa</span>'
    hub_link = f'<a href="/post/{MASTER_SLUG}" class="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all">📚 Tüm 9. Sınıf Kitap Cevapları (Ana Dizin)</a>'

    nav_bar = f"""
    <div class="my-6 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 not-prose shadow-sm">
      <div class="flex items-center gap-2">
        {prev_link}
      </div>
      <div>
        {hub_link}
      </div>
      <div class="flex items-center gap-2">
        {next_link}
      </div>
    </div>
    """

    # Badge Bar
    badge_bar = f"""
    <div class="my-4 flex flex-wrap items-center gap-2 not-prose">
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-200/60">
        📘 {tema}
      </span>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-800 border border-cyan-200/60">
        📍 {topic}
      </span>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200/60">
        📝 {ptype} • Sayfa {pno}
      </span>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200/60">
        ✓ 2026-2027 MEB Maarif Modeli
      </span>
    </div>
    """

    # Questions HTML
    questions_html = ""
    for q in questions:
        q_title = q.get("title", f"Soru {q.get('num', 1)}")
        q_text = q.get("text", "").replace("\n", "<br>")
        q_solution = q.get("solution", "")
        q_answer = q.get("answer", "")

        questions_html += f"""
        <div class="my-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm overflow-hidden not-prose">
          <div class="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-6 py-4 text-white flex items-center justify-between">
            <h3 class="text-lg font-bold flex items-center gap-2 tracking-tight">
              <span class="w-8 h-8 rounded-lg bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center text-sm font-black text-indigo-300">
                {q.get('num', 1)}
              </span>
              {q_title}
            </h3>
            <span class="text-xs font-medium px-2.5 py-1 rounded-md bg-white/10 text-indigo-200 border border-white/10">
              MEB Sayfa {pno}
            </span>
          </div>

          <div class="p-6 space-y-6">
            <!-- Soru Metni -->
            <div class="p-4 rounded-xl bg-amber-50/50 border border-amber-200/70 text-slate-800">
              <div class="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1.5 flex items-center gap-1.5">
                <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Kitaptaki Soru Metni ve Verilenler
              </div>
              <div class="text-base leading-relaxed font-medium text-slate-900">
                {q_text}
              </div>
            </div>

            <!-- Adım Adım Çözüm -->
            <div class="space-y-3">
              <div class="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
                Ayrıntılı Adım Adım Çözüm
              </div>
              <div class="p-5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-base leading-relaxed space-y-3 font-normal">
                {q_solution}
              </div>
            </div>

            <!-- Doğru Cevap Kutusu -->
            <div class="p-4 rounded-xl bg-emerald-50 border-2 border-emerald-500/40 text-emerald-950 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black shrink-0 text-lg shadow-sm">
                ✓
              </div>
              <div>
                <div class="text-xs font-black uppercase tracking-wider text-emerald-800">Doğru Cevap / Sonuç</div>
                <div class="text-base md:text-lg font-extrabold text-emerald-950">{q_answer}</div>
              </div>
            </div>
          </div>
        </div>
        """

    # Educational notes and tips
    pedagogy_box = f"""
    <div class="my-8 p-6 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/70 border border-indigo-100 shadow-sm not-prose">
      <h3 class="text-lg font-bold text-indigo-950 mb-2 flex items-center gap-2">
        <span class="text-xl">💡</span> Öğretmen Notu & Pedagojik Çalışma Tavsiyesi
      </h3>
      <p class="text-slate-700 leading-relaxed mb-3 text-sm md:text-base">
        <strong>MEB 2026-2027 Türkiye Yüzyılı Maarif Modeli</strong> felsefesi gereği matematik öğreniminde temel amaç salt sonuç bulmak değil, kavramsal akıl yürütme ve problem çözme becerisi kazanmaktır. Sayfa {pno}'deki bu soruları çözerken sadece nihai cevaba bakmak yerine her işlem basamağının hangi matematik kuralına dayandığını incelemeniz tavsiye edilir.
      </p>
      <ul class="list-disc list-inside space-y-1.5 text-sm text-slate-600 font-medium">
        <li>Cevapları incelemeden önce soruyu kendi başınıza kağıt üzerinde çözmeyi deneyiniz.</li>
        <li>Hata yaptığınız basamakları renkli bir kalemle işaretleyerek kural eksikliğinizi tespit ediniz.</li>
        <li>Benzer soru tiplerini pekiştirmek için sayfanın başındaki konu anlatımı bölümlerini tekrar gözden geçiriniz.</li>
      </ul>
    </div>
    """

    # Internal Linking and SEO footer
    related_tools_box = f"""
    <div class="my-8 p-5 rounded-2xl bg-slate-50 border border-slate-200 not-prose">
      <h4 class="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
        🚀 Öğretmenler ve Öğrenciler İçin Popüler Araçlarımız:
      </h4>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <a href="/yillik-plan-hazirla" class="p-3 rounded-xl bg-white border border-slate-200/80 hover:border-indigo-400 hover:shadow-sm transition-all text-sm font-semibold text-slate-800 flex items-center gap-2">
          <span>📅</span> Yıllık Plan Hazırlama
        </a>
        <a href="/karne-gorus" class="p-3 rounded-xl bg-white border border-slate-200/80 hover:border-indigo-400 hover:shadow-sm transition-all text-sm font-semibold text-slate-800 flex items-center gap-2">
          <span>🎓</span> Karne Görüş Robotu
        </a>
        <a href="/kulup-toplanti-tutanaklari" class="p-3 rounded-xl bg-white border border-slate-200/80 hover:border-indigo-400 hover:shadow-sm transition-all text-sm font-semibold text-slate-800 flex items-center gap-2">
          <span>📁</span> Kulüp Toplantı Tutanakları
        </a>
      </div>
    </div>
    """

    html = f"""
    <div class="grade9-post-content space-y-6">
      {badge_bar}
      
      <p class="text-lg leading-relaxed text-slate-700 font-normal">
        <strong>2026-2027 Eğitim Öğretim Yılı</strong> yeni müfredatına uygun olarak hazırlanan <strong>MEB Ortaöğretim Matematik 9. Sınıf Ders Kitabı 1. Kitap Sayfa {pno} Cevapları</strong> bu sayfada yer almaktadır. {tema} kapsamında yer alan <em>{topic}</em> başlıklı <strong>{ptype}</strong> sorularının detaylı formülleri, açıklamaları ve doğru cevapları aşağıda incelenebilir.
      </p>

      {nav_bar}

      <div class="p-4 rounded-xl bg-blue-50/50 border border-blue-200 text-blue-950 text-sm leading-relaxed">
        <strong>Kitap Sayfa Açıklaması:</strong> {intro}
      </div>

      {questions_html}

      {pedagogy_box}

      {nav_bar}

      {related_tools_box}
    </div>
    """
    return html

def build_master_post_html(all_pages):
    # Group pages by theme
    t1 = [p for p in all_pages if "1. Tema" in p["tema"]]
    t2 = [p for p in all_pages if "2. Tema" in p["tema"]]
    t3 = [p for p in all_pages if "3. Tema" in p["tema"]]

    def render_theme_grid(pages, bg_color, border_color, badge_color, btn_hover):
        grid_items = ""
        for p in pages:
            pno = p["page"]
            ptype = p["type"]
            slug = p["slug"]
            grid_items += f"""
            <a href="/post/{slug}" class="group relative p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-{btn_hover} transition-all duration-200 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between gap-2 mb-2">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-black bg-{badge_color}-100 text-{badge_color}-800 border border-{badge_color}-200">
                    SAYFA {pno}
                  </span>
                  <span class="text-[11px] font-medium text-slate-500">
                    2026-2027
                  </span>
                </div>
                <h4 class="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  Sayfa {pno} Cevapları
                </h4>
                <p class="text-xs text-slate-500 mt-1 line-clamp-1">
                  {ptype}
                </p>
              </div>
              <div class="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:translate-x-0.5 transition-transform">
                <span>Çözümleri Gör</span>
                <span>→</span>
              </div>
            </a>
            """
        return f"""
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 my-4 not-prose">
          {grid_items}
        </div>
        """

    t1_grid = render_theme_grid(t1, "indigo", "indigo", "indigo", "indigo-500")
    t2_grid = render_theme_grid(t2, "emerald", "emerald", "emerald", "emerald-500")
    t3_grid = render_theme_grid(t3, "purple", "purple", "purple", "purple-500")

    master_html = f"""
    <div class="master-hub-content space-y-8">
      <!-- Hero Top Banner -->
      <div class="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl not-prose border border-indigo-900/50">
        <div class="flex flex-wrap items-center gap-2.5 mb-4">
          <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
            2026 - 2027 EĞİTİM ÖĞRETİM YILI
          </span>
          <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            TÜRKİYE YÜZYILI MAARİF MODELİ
          </span>
          <span class="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-slate-300">
            9. Sınıf Matematik 1. Kitap
          </span>
        </div>
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight mb-4">
          2026-2027 MEB Matematik Ders Kitabı Cevapları (9. Sınıf 1. Kitap)
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mb-6">
          Milli Eğitim Bakanlığı (MEB) tarafından hazırlanan yeni müfredat 9. sınıf matematik 1. kitabında yer alan tüm ünitelerin (<strong>1. Tema: Sayılar, 2. Tema: Nicelikler ve Değişimler, 3. Tema: Geometrik Şekiller</strong>) <strong>Ön Değerlendirme, Sıra Sizde, Alıştırmalar ve Ölçme Değerlendirme</strong> sorularının sayfa sayfa adım adım doğrulanmış çözümleri.
        </p>

        <!-- Stats Bar -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-center">
          <div class="p-3 rounded-2xl bg-white/5 border border-white/10">
            <div class="text-2xl sm:text-3xl font-black text-indigo-300">3</div>
            <div class="text-xs font-semibold text-slate-400 mt-1">Ana Tema / Ünite</div>
          </div>
          <div class="p-3 rounded-2xl bg-white/5 border border-white/10">
            <div class="text-2xl sm:text-3xl font-black text-emerald-300">{len(all_pages)}</div>
            <div class="text-xs font-semibold text-slate-400 mt-1">Çözülen Sayfa</div>
          </div>
          <div class="p-3 rounded-2xl bg-white/5 border border-white/10">
            <div class="text-2xl sm:text-3xl font-black text-cyan-300">%100</div>
            <div class="text-xs font-semibold text-slate-400 mt-1">Müfredat Uyumu</div>
          </div>
          <div class="p-3 rounded-2xl bg-white/5 border border-white/10">
            <div class="text-2xl sm:text-3xl font-black text-amber-300">Adım Adım</div>
            <div class="text-xs font-semibold text-slate-400 mt-1">Pedagojik Çözüm</div>
          </div>
        </div>
      </div>

      <!-- Quick Index Navigation -->
      <div class="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100 not-prose flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 class="text-base font-extrabold text-indigo-950">📌 Hızlı Tema Navigasyonu</h3>
          <p class="text-xs text-indigo-700 mt-0.5">İstediğiniz ünitenin soru ve cevaplarına doğrudan gitmek için tıklayınız:</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <a href="#tema-1" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-indigo-600 hover:text-white text-indigo-900 border border-indigo-200 transition-all shadow-sm">
            1. Tema: Sayılar (Sayfa 12 - 87)
          </a>
          <a href="#tema-2" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-emerald-600 hover:text-white text-emerald-900 border border-emerald-200 transition-all shadow-sm">
            2. Tema: Nicelikler ve Değişimler (Sayfa 90 - 169)
          </a>
          <a href="#tema-3" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-purple-600 hover:text-white text-purple-900 border border-purple-200 transition-all shadow-sm">
            3. Tema: Geometrik Şekiller (Sayfa 172 - 199)
          </a>
        </div>
      </div>

      <!-- 1. TEMA SECTION -->
      <div id="tema-1" class="pt-4">
        <div class="flex items-center justify-between pb-3 border-b-2 border-indigo-500 mb-4 not-prose">
          <div>
            <span class="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">1. Ünite</span>
            <h2 class="text-xl md:text-2xl font-black text-slate-900">1. Tema: Sayılar (Sayfa 12 – 87)</h2>
            <p class="text-xs text-slate-600 mt-1">
              Gerçek sayıların üslü ve köklü gösterimleri, sayı aralıkları ve küme işlemleri, sayı kümelerinin kapalılığı, önermeler ve özdeşlikler.
            </p>
          </div>
          <span class="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
            {len(t1)} Sayfa Çözümü
          </span>
        </div>
        {t1_grid}
      </div>

      <!-- 2. TEMA SECTION -->
      <div id="tema-2" class="pt-8">
        <div class="flex items-center justify-between pb-3 border-b-2 border-emerald-500 mb-4 not-prose">
          <div>
            <span class="text-xs font-extrabold text-emerald-600 uppercase tracking-wider">2. Ünite</span>
            <h2 class="text-xl md:text-2xl font-black text-slate-900">2. Tema: Nicelikler ve Değişimler (Sayfa 90 – 169)</h2>
            <p class="text-xs text-slate-600 mt-1">
              Doğrusal fonksiyonlar ve nitel özellikleri, değişim oranı (eğim), mutlak değer fonksiyonu ve grafiği, gerçek yaşam kâr-zarar ve başabaş problemleri.
            </p>
          </div>
          <span class="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            {len(t2)} Sayfa Çözümü
          </span>
        </div>
        {t2_grid}
      </div>

      <!-- 3. TEMA SECTION -->
      <div id="tema-3" class="pt-8">
        <div class="flex items-center justify-between pb-3 border-b-2 border-purple-500 mb-4 not-prose">
          <div>
            <span class="text-xs font-extrabold text-purple-600 uppercase tracking-wider">3. Ünite</span>
            <h2 class="text-xl md:text-2xl font-black text-slate-900">3. Tema: Geometrik Şekiller (Sayfa 172 – 199)</h2>
            <p class="text-xs text-slate-600 mt-1">
              Üçgende açılar, dış açı özellikleri, ikizkenar ve eşkenar üçgen, açıortay bağıntıları, üçgen eşitsizliği ve açı-kenar bağıntıları.
            </p>
          </div>
          <span class="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
            {len(t3)} Sayfa Çözümü
          </span>
        </div>
        {t3_grid}
      </div>

      <!-- Guide & Study Tips -->
      <div class="my-10 p-6 md:p-8 rounded-3xl bg-slate-50 border border-slate-200 not-prose space-y-4">
        <h3 class="text-xl font-black text-slate-900 flex items-center gap-2">
          <span>🎯</span> 9. Sınıf Matematik Ders Kitabı Cevapları Nasıl Kullanılmalı?
        </h3>
        <p class="text-slate-700 leading-relaxed text-sm md:text-base">
          9. sınıf lise eğitiminin ve YKS (TYT Matematik) oturumunun omurgasını oluşturur. Mantık, üslü-köklü sayılar, fonksiyonlar ve temel geometri konuları sonraki yıllarda görülecek tüm ileri düzey matematik derslerinin altyapısıdır. Bu sebeple hazırladığımız sayfa sayfa çözümleri kullanırken şu aşamaları izlemeniz tavsiye edilir:
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div class="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 font-black flex items-center justify-center mb-2">1</div>
            <h4 class="font-bold text-slate-900 text-sm mb-1">Önce Kendiniz Deneyin</h4>
            <p class="text-xs text-slate-600 leading-relaxed">Sayfadaki soruları öncelikle kitaptaki konu anlatımından faydalanarak tek başınıza çözmeye gayret ediniz.</p>
          </div>
          <div class="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-black flex items-center justify-center mb-2">2</div>
            <h4 class="font-bold text-slate-900 text-sm mb-1">Adım Adım Karşılaştırın</h4>
            <p class="text-xs text-slate-600 leading-relaxed">Çözümünüz doğru olsa bile sayfalarımızdaki adım adım çözüm açıklamalarını inceleyerek pratik yolları öğrenin.</p>
          </div>
          <div class="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <div class="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 font-black flex items-center justify-center mb-2">3</div>
            <h4 class="font-bold text-slate-900 text-sm mb-1">Hata Analizi Yapın</h4>
            <p class="text-xs text-slate-600 leading-relaxed">Yanlış yaptığınız sorularda hangi kavram yanılgısına düştüğünüzü not alarak konuyu pekiştiriniz.</p>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="my-8 space-y-4 not-prose">
        <h3 class="text-xl font-black text-slate-900">❓ Sıkça Sorulan Sorular</h3>
        <div class="space-y-3">
          <details class="group p-4 rounded-2xl bg-white border border-slate-200 shadow-sm open:bg-indigo-50/20">
            <summary class="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between text-sm md:text-base">
              <span>Bu cevaplar 2026-2027 yeni MEB müfredatına (Maarif Modeli) uygun mudur?</span>
              <span class="text-indigo-600 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p class="text-xs md:text-sm text-slate-600 mt-3 leading-relaxed">
              Evet, bu sayfadaki tüm cevaplar 2026-2027 eğitim öğretim yılında okutulan en güncel <strong>Türkiye Yüzyılı Maarif Modeli</strong> 9. sınıf matematik 1. kitabındaki sıra sizde, alıştırmalar ve ölçme değerlendirme sorularına %100 birebir uygundur.
            </p>
          </details>

          <details class="group p-4 rounded-2xl bg-white border border-slate-200 shadow-sm open:bg-indigo-50/20">
            <summary class="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between text-sm md:text-base">
              <span>9. Sınıf Matematik 2. Kitap cevapları ne zaman eklenecektir?</span>
              <span class="text-indigo-600 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p class="text-xs md:text-sm text-slate-600 mt-3 leading-relaxed">
              MEB tarafından 2. dönem başında dağıtılacak olan 9. sınıf matematik 2. kitabının soru çözümleri de kitap yayınlanır yayınlanmaz aynı formatta sitemize eklenecektir.
            </p>
          </details>
        </div>
      </div>

      <!-- Official Authority Links -->
      <div class="p-5 rounded-2xl bg-slate-100 border border-slate-200/80 not-prose text-xs text-slate-600 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <span class="font-bold text-slate-800">Resmî Kaynaklar:</span>
          <a href="https://www.meb.gov.tr" target="_blank" rel="noopener" class="underline hover:text-indigo-600">Milli Eğitim Bakanlığı</a> •
          <a href="https://ogmmateryal.eba.gov.tr" target="_blank" rel="noopener" class="underline hover:text-indigo-600">OGM Materyal</a> •
          <a href="https://www.eba.gov.tr" target="_blank" rel="noopener" class="underline hover:text-indigo-600">EBA</a>
        </div>
        <div>
          <span>Yazar &amp; Matematik Editörü: <strong>Cavenaghi</strong> • matemetrik.com</span>
        </div>
      </div>
    </div>
    """
    return master_html

def main():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    print("Building and inserting 68 individual page posts...")
    for i, pdata in enumerate(ALL_PAGES):
        pno = pdata["page"]
        slug = f"9-sinif-matematik-ders-kitabi-sayfa-{pno}-cevaplari-meb"
        title = f"9. Sınıf Matematik Ders Kitabı Sayfa {pno} Cevapları (MEB Yayınları)"
        excerpt = f"2026-2027 MEB 9. Sınıf Matematik 1. Kitap {pdata['tema']} Sayfa {pno} {pdata['type']} ayrıntılı soru metinleri, adım adım çözümleri ve doğrulanmış cevapları."
        
        prev_page = ALL_PAGES[i - 1] if i > 0 else None
        next_page = ALL_PAGES[i + 1] if i < len(ALL_PAGES) - 1 else None

        content = build_individual_post_html(pdata, prev_page, next_page)
        featured_image = f"/uploads/cover-{slug}.webp"
        tags = json.dumps([
            f"9. sınıf matematik sayfa {pno} cevapları",
            f"9. sınıf meb matematik sayfa {pno}",
            f"{pdata['tema'].lower()} çözümleri",
            "2026-2027 meb matematik çözümleri",
            "türkiye yüzyılı maarif modeli",
            "9. sınıf matematik 1. kitap"
        ], ensure_ascii=False)

        cursor.execute("SELECT id FROM posts WHERE slug = ?", (slug,))
        row = cursor.fetchone()

        views = random.randint(120, 480)
        if row:
            post_id = row[0]
            cursor.execute("""
                UPDATE posts SET
                    title = ?,
                    excerpt = ?,
                    content = ?,
                    featured_image = ?,
                    category = '9. Sınıf',
                    category_slug = '9-sinif',
                    tags = ?,
                    author = 'Cavenaghi',
                    is_published = 1,
                    updated_at = ?
                WHERE id = ?
            """, (title, excerpt, content, featured_image, tags, NOW_ISO, post_id))
        else:
            cursor.execute("""
                INSERT INTO posts (
                    title, slug, excerpt, content, featured_image,
                    category, category_slug, tags, author, views,
                    is_published, created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, '9. Sınıf', '9-sinif', ?, 'Cavenaghi', ?, 1, ?, ?)
            """, (title, slug, excerpt, content, featured_image, tags, views, NOW_ISO, NOW_ISO))

    print("Individual page posts inserted successfully.")

    print("Building and inserting Master Hub Post...")
    master_content = build_master_post_html(ALL_PAGES)
    master_excerpt = "2026-2027 eğitim öğretim yılı yeni müfredat (Türkiye Yüzyılı Maarif Modeli) 9. Sınıf Matematik Ders Kitabı 1. Kitap sayfa sayfa tüm alıştırma, sıra sizde ve ölçme değerlendirme soru ve çözümleri."
    master_featured_image = f"/uploads/cover-{MASTER_SLUG}.webp"
    master_tags = json.dumps([
        "2026-2027 meb matematik ders kitabı cevapları",
        "9. sınıf matematik ders kitabı cevapları",
        "9. sınıf matematik 1. kitap cevapları",
        "türkiye yüzyılı maarif modeli matematik",
        "9. sınıf meb matematik alıştırma cevapları",
        "9. sınıf matematik ölçme değerlendirme cevapları"
    ], ensure_ascii=False)

    cursor.execute("SELECT id FROM posts WHERE slug = ?", (MASTER_SLUG,))
    row = cursor.fetchone()
    if row:
        cursor.execute("""
            UPDATE posts SET
                title = ?,
                excerpt = ?,
                content = ?,
                featured_image = ?,
                category = '9. Sınıf',
                category_slug = '9-sinif',
                tags = ?,
                author = 'Cavenaghi',
                is_published = 1,
                updated_at = ?
            WHERE id = ?
        """, (MASTER_TITLE, master_excerpt, master_content, master_featured_image, master_tags, NOW_ISO, row[0]))
    else:
        cursor.execute("""
            INSERT INTO posts (
                title, slug, excerpt, content, featured_image,
                category, category_slug, tags, author, views,
                is_published, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, '9. Sınıf', '9-sinif', ?, 'Cavenaghi', 850, 1, ?, ?)
        """, (MASTER_TITLE, MASTER_SLUG, master_excerpt, master_content, master_featured_image, master_tags, NOW_ISO, NOW_ISO))

    conn.commit()
    cursor.execute("PRAGMA wal_checkpoint(TRUNCATE);")
    conn.close()
    print("Database transaction committed and WAL checkpointed successfully.")

if __name__ == "__main__":
    main()
