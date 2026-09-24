# -*- coding: utf-8 -*-
"""
High-Fidelity Pedagogical Content Generator Engine for Matemetrik Konu Anlatımları.
Strictly produces:
1. Grade- and Subject-appropriate pedagogical theory written directly to students as a classroom teacher:
   - Türkçe/Edebiyat -> Gramer, anlam bilgisi, edebi akımlar, tahliller (ZERO math!).
   - Fen Bilimleri/Fizik -> Bilimsel deneyler, bağımlı/bağımsız değişkenler, doğa yasaları.
   - Kimya -> Mol, periyodik sistem, kimyasal bağlar, reaksiyonlar.
   - Biyoloji -> Hücre, genetik, fotosentez, insan sistemleri.
   - Tarih/Sosyal/İnkılap -> Kronoloji, neden-sonuç, antlaşmalar, Atatürk ilkeleri (ZERO math!).
   - Matematik -> Sınıf düzeyine uygun sayılar, işlemler, cebir, geometri, analiz.
2. 20 authentic multiple-choice questions matching the subject and topic.
3. 20 step-by-step detailed solution walk-throughs.
4. Educational video references, MEB book links, and FAQPage schemas.
"""

from scripts.curriculum_gen.theory_generator import generate_deep_theory_html
from scripts.curriculum_gen.subject_questions import get_questions_for_topic

def generate_deep_textbook_theory(spec):
    return generate_deep_theory_html(spec)

def generate_20_questions(spec):
    return get_questions_for_topic(spec["slug"], spec["grade_num"], spec["subject"], spec["topic"])

def generate_topic_package(spec):
    g_str = spec["grade_str"]
    subj = spec["subject"]
    topic = spec["topic"]
    slug = spec["slug"]
    
    theory = generate_deep_textbook_theory(spec)
    questions = generate_20_questions(spec)
    
    faqs = [
        {
            "q": f"{g_str} {subj} {topic} konusu sınavlarda kaç soru getirir?",
            "a": f"MEB ortak yazılı sınavlarında ve merkezi sınavlarda {topic} konusundan her sınav döneminde ortalama 2 ila 4 soru sorulmaktadır."
        },
        {
            "q": f"{topic} konusunu en iyi nasıl pekiştirebilirim?",
            "a": f"Sayfamızdaki sınıf düzeyine özel hazırlanmış pratik konu anlatımını çalıştıktan sonra 20 soruluk yeni nesil testi süre tutarak çözmeli ve yapamadığınız soruların çözümlerini incelemelisiniz."
        },
        {
            "q": f"{g_str} {subj} {topic} PDF test çıktısı alabilir miyim?",
            "a": f"Evet, sayfamızdaki 'PDF Test Olarak Yazdır / İndir' butonuna tıklayarak cevap anahtarlı ve çözümlü test belgesini ücretsiz olarak indirebilir veya yazıcıdan bastırabilirsiniz."
        }
    ]
    
    meb_links = [
        {"title": f"{g_str} {subj} MEB Ders Kitabı Çözümleri 1. Kitap", "url": f"/kategori/{spec['category_slug']}"},
        {"title": f"{g_str} {subj} MEB Ders Kitabı Çözümleri 2. Kitap", "url": f"/kategori/{spec['category_slug']}"}
    ]
    
    related = [
        {"title": f"{g_str} {subj} Konu Anlatımları ve Testler", "url": "/konu-anlatimlari"},
        {"title": f"{g_str} Sınav Hazırlama Robotu", "url": "/sinav-hazirlama-robotu"},
        {"title": f"{g_str} Puan Hesaplama Robotu", "url": "/puan-hesaplama-robotu"}
    ]
    
    return {
        "grade_num": spec["grade_num"],
        "grade_str": spec["grade_str"],
        "subject": spec["subject"],
        "topic": spec["topic"],
        "title": spec["title"],
        "slug": spec["slug"],
        "excerpt": spec["excerpt"],
        "category_slug": spec["category_slug"],
        "theory_html": theory,
        "questions": questions,
        "video_embed_id": "s7z41u5mB-4",
        "video_title": f"{g_str} {subj} {topic} Konu Anlatımı",
        "video_desc": f"{g_str} müfredatına tam uyumlu video dersi izleyerek {topic} konusunun püf noktalarını pekiştirin.",
        "meb_book_links": meb_links,
        "related_topics": related,
        "faqs": faqs,
        "tags": spec.get("tags", [f"{g_str} {subj}", topic, "Konu Anlatımı", "20 Soruluk Test"])
    }
