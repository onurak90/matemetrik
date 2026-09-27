# -*- coding: utf-8 -*-
"""
Full generator for Grade 9 Türk Dili ve Edebiyatı (38 pages).
"""
import json

def generate_g9():
    with open('/tmp/grade9_extracted.json', 'r', encoding='utf-8') as f:
        extracted = json.load(f)

    # Unit meta
    units = [
        {
            "unit_num": "1. Tema",
            "title": "Sözün İnceliği",
            "pages": "Sayfa 14 - 71",
            "desc": "Edebiyatın güzel sanatlar içindeki yeri, dilin işlevleri, Faruk Nafiz Çamlıbel'in San'at şiiri, Nurullah Ataç'ın Picasso'nun Hatları denemesi ve edebî metin tahlilleri."
        },
        {
            "unit_num": "2. Tema",
            "title": "Anlam Arayışı",
            "pages": "Sayfa 72 - 147",
            "desc": "Hikâye ve anı türleri, Cahit Sıtkı Tarancı'nın Bir Kavak ve İnsanlar hikâyesi, Halide Nusret Zorlutuna'nın Nihayet Beklediğimiz Büyük Gün anısı ve metin karşılaştırmaları."
        },
        {
            "unit_num": "3. Tema",
            "title": "Anlamın Yapı Taşları",
            "pages": "Sayfa 148 - 211",
            "desc": "Refik Halid Karay'ın Eskici hikâyesi, Falih Rıfkı Atay'ın Bizim Akdeniz'den gezi yazısı, gezi yazısının tür özellikleri ve edebî metinlerde yapı unsurları."
        },
        {
            "unit_num": "4. Tema",
            "title": "Dilin Zenginliği",
            "pages": "Sayfa 212 - 301",
            "desc": "Reşat Nuri Güntekin'in Çalıkuşu romanı, Füruzan'ın Parasız Yatılı hikâyesi ve Mehmet Kaplan'ın eleştirisi, roman ve hikâye türlerinin derinlemesine incelenmesi."
        }
    ]

    faqs = [
        {
            "q": "9. Sınıf Türk Dili ve Edebiyatı ders kitabı cevapları 2026-2027 müfredatına uygun mu?",
            "a": "Evet, sitemizde yer alan 9. sınıf Türk Dili ve Edebiyatı çözümleri, MEB Talim ve Terbiye Kurulu tarafından onaylanan 2026-2027 Türkiye Yüzyılı Maarif Modeli güncel ders kitabına birebir uyumludur."
        },
        {
            "q": "Edebiyat ders kitabı sayfa çözümlerinde paragraf ve metin analizleri nasıl yapıldı?",
            "a": "Tüm metin anlama ve çözümleme sorularında paragrafın konusu, ana fikri, yardımcı düşünceleri, anlatım biçimleri (öyküleme, betimleme, açıklama, tartışma) ve düşünceyi geliştirme yolları edebiyat öğretmenleri tarafından adım adım incelenerek sunulmuştur."
        },
        {
            "q": "San'at şiiri, Eskici ve Çalıkuşu gibi klasik metinlerin çözümleri mevcut mu?",
            "a": "Evet, Faruk Nafiz Çamlıbel'in San'at şiiri, Refik Halid Karay'ın Eskici hikâyesi ve Reşat Nuri Güntekin'in Çalıkuşu romanı gibi temel metinlerin tüm söz varlığı, tahlil ve değerlendirme soruları eksiksiz yer almaktadır."
        },
        {
            "q": "Tema sonu ölçme ve değerlendirme testlerinin cevap anahtarları doğru mu?",
            "a": "Kitaptaki 1, 2, 3 ve 4. tema sonu ölçme ve değerlendirme bölümlerinde yer alan tüm açık uçlu, eşleştirme, boşluk doldurma ve çoktan seçmeli sorular gerekçeli açıklamalarıyla birlikte doğrulanmıştır."
        }
    ]

    print("Meta ready. Preparing pages...")
    return units, faqs

