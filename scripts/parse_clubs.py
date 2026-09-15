import os
import re
import json
import zipfile
import xml.etree.ElementTree as ET

klub_dir = 'klub'

# Map filename to club key & clean name
club_meta = {
    '7c6bee7bef.docx': {'id': 'kizilay', 'name': 'Kızılay Kulübü'},
    '557e4a98ae.docx': {'id': 'hayvanlari-sevme-ve-koruma', 'name': 'Hayvanları Sevme ve Koruma Kulübü'},
    '77db9ef734.docx': {'id': 'halk-oyunlari', 'name': 'Halk Oyunları Kulübü'},
    '9c6b0c6a5b.docx': {'id': 'gorsel-sanatlar', 'name': 'Görsel Sanatlar Kulübü'},
    '9518a732e8.docx': {'id': 'gezi-tanitma-ve-turizm', 'name': 'Gezi Tanıtma ve Turizm Kulübü'},
    '56843154c1.docx': {'id': 'geri-donusum-ve-sifir-atik', 'name': 'Geri Dönüşüm ve Sıfır Atık Kulübü'},
    'fed0346a0e.docx': {'id': 'etwinning', 'name': 'eTwinning Kulübü'},
    'b3185753d2.docx': {'id': 'drama', 'name': 'Drama Kulübü'},
    '2a5f8a8bfc.docx': {'id': 'cocuk-haklari', 'name': 'Çocuk Hakları Kulübü'},
    '7d28bc0a3b.docx': {'id': 'demokrasi-insan-haklari', 'name': 'Demokrasi İnsan Hakları ve Yurttaşlık Kulübü'},
    '91ba0349a2.docx': {'id': 'degerler', 'name': 'Değerler Kulübü'},
    '3cbb5e283c.docx': {'id': 'cevre-koruma', 'name': 'Çevre Koruma Kulübü'},
    'bea9fa078f.docx': {'id': 'bilisim-ve-internet', 'name': 'Bilişim ve İnternet Kulübü'},
    'b59fe2ae8d.docx': {'id': 'bilincli-tuketici', 'name': 'Bilinçli Tüketici Kulübü'},
    '4a73e6b2a6.docx': {'id': 'bilim-fen-ve-teknoloji', 'name': 'Bilim-Fen ve Teknoloji Kulübü'},
    '2fc4eb7aa6.docx': {'id': 'afete-hazirlik', 'name': 'Afete Hazırlık Kulübü'},
    'a36227331d.docx': {'id': 'kutuphanecilik', 'name': 'Kütüphanecilik Kulübü'},
    '371bfa2aeak.doc': {'id': 'zeka-oyunlari', 'name': 'Zeka Oyunları Kulübü'},
    'd887d20499.docx': {'id': 'kisisel-verileri-koruma', 'name': 'Kişisel Verileri Koruma Kulübü'},
}

def parse_docx(filename):
    path = os.path.join(klub_dir, filename)
    with zipfile.ZipFile(path) as z:
        xml_content = z.read('word/document.xml')
        root = ET.fromstring(xml_content)
        paras = [''.join(p.itertext()).strip() for p in root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p')]
        paras = [p for p in paras if p]

        # extract tables
        tables = []
        for tbl in root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}tbl'):
            t_rows = []
            for tr in tbl.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}tr'):
                cells = [''.join(tc.itertext()).strip() for tc in tr.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}tc')]
                t_rows.append(cells)
            tables.append(t_rows)

    return paras, tables

clubs_data = []

for filename, meta in club_meta.items():
    club_id = meta['id']
    club_name = meta['name']
    
    if filename.endswith('.docx'):
        paras, tables = parse_docx(filename)
    else:
        # 371bfa2aeak.doc -> Zeka Oyunları
        paras = []
        tables = []
        with open(os.path.join(klub_dir, filename), 'rb') as f:
            content = f.read()
        try:
            decoded = content.decode('utf-16le', errors='ignore')
            paras = [l.strip() for l in decoded.splitlines() if len(l.strip()) > 3]
        except Exception:
            paras = []

    # Let's inspect sections in paras
    tuzuk_paras = []
    toplanti_paras = []
    plan_paras = []
    ogrenci_paras = []
    veli_paras = []
    rapor_paras = []

    current_sec = 'tuzuk'
    for p in paras:
        p_up = p.upper()
        if 'TOPLANTI TUTANAĞI' in p_up or 'TOPLANTI KARARLARI' in p_up or 'KARAR TUTANAĞI' in p_up:
            current_sec = 'toplanti'
        elif 'YILLIK ÇALIŞMA PLANI' in p_up or 'YILLIK ÇALIŞMA PROGRAMI' in p_up:
            current_sec = 'plan'
        elif 'GÖREVLİ ÖĞRENCİ' in p_up or 'ÖĞRENCİ LİSTESİDİR' in p_up:
            current_sec = 'ogrenci'
        elif 'VELİ İZİN BELGESİ' in p_up or 'EK-5' in p_up:
            current_sec = 'veli'
        elif 'FAALİYET RAPORU' in p_up:
            current_sec = 'rapor'

        if current_sec == 'tuzuk': tuzuk_paras.append(p)
        elif current_sec == 'toplanti': toplanti_paras.append(p)
        elif current_sec == 'plan': plan_paras.append(p)
        elif current_sec == 'ogrenci': ogrenci_paras.append(p)
        elif current_sec == 'veli': veli_paras.append(p)
        elif current_sec == 'rapor': rapor_paras.append(p)

    # Activity report from tables if available
    faaliyet_table = []
    if tables and len(tables) > 0:
        for r in tables[0]:
            if len(r) >= 2:
                faaliyet_table.append({'aylar': r[0], 'faaliyetler': r[1]})

    clubs_data.append({
        'id': club_id,
        'name': club_name,
        'filename': filename,
        'tuzukParas': tuzuk_paras,
        'toplantiParas': toplanti_paras,
        'planParas': plan_paras,
        'ogrenciParas': ogrenci_paras,
        'veliParas': veli_paras,
        'raporParas': rapor_paras,
        'faaliyetTable': faaliyet_table
    })

# Add 20th club: MUN (Model United Nations / Model Birleşmiş Milletler)
clubs_data.append({
    'id': 'mun-model-birlesmis-milletler',
    'name': 'Model Birleşmiş Milletler (MUN) Kulübü',
    'filename': 'mun.docx',
    'tuzukParas': [
        'T.C. MİLLÎ EĞİTİM BAKANLIĞI',
        'SOSYAL KULÜPLER YÖNETMELİĞİ',
        '2026/2027 EĞİTİM ÖĞRETİM YILI',
        'MODEL BİRLEŞMİŞ MİLLETLER (MUN) KULÜBÜ İÇ TÜZÜĞÜ',
        'Amaç: Öğrencilerin küresel sorunlar, uluslararası ilişkiler, diplomasi, insan hakları ve sürdürülebilir kalkınma hedefleri konularında bilinçlenmelerini sağlamak; yabancı dil, hitabet, ikna kabiliyeti, analitik düşünme ve müzakere becerilerini geliştirmek.',
        'Kapsam: 2026/2027 Eğitim Öğretim yılında okulumuz MUN Kulübü nün bilimsel, sosyal ve kültürel alanlardaki sosyal etkinliklerine ait usul ve esasları kapsar.',
        'Tanımlar: Danışman Öğretmen, Kulüp Başkanı, Delegasyon Temsilcisi, Komite Başkanı ve Üyeleri kapsar.',
        'Çalışma Esasları: Öğrencilerin dünya meselelerine çözüm önerileri geliştirmesi, model BM simülasyonlarına hazırlanması ve ulusal/uluslararası MUN konferanslarına katılımın teşvik edilmesi esastır.'
    ],
    'toplantiParas': [
        'TOPLANTI TUTANAĞI',
        'Model Birleşmiş Milletler (MUN) Kulübü genel kurul toplantısı 2026/2027 eğitim öğretim yılı başında saat 13.30 da Öğretmenler Odasında İstiklal Marşı ile başlamıştır.',
        '1. Kulüp yönetim ve denetim kurulunun gizli oy açık sayım usulü ile belirlenmesi.',
        '2. Birleşmiş Milletler organları (Güvenlik Konseyi, UNESCO, UNICEF, WHO) hakkında bilgilendirme yapılması.',
        '3. Okul içi MUN mini konferansı ve münazara oturumlarının planlanması.',
        '4. Yıllık çalışma programının ve toplum hizmeti hedeflerinin onaylanması.'
    ],
    'planParas': [
        'MODEL BİRLEŞMİŞ MİLLETLER (MUN) KULÜBÜ 2026-2027 YILLIK ÇALIŞMA PLANI',
        'EYLÜL - EKİM: Kulüp tüzüğünün hazırlanması, genel kurulun toplanması, yönetim ve denetim kurullarının seçimi, Sosyal Etkinlik Modülüne öğrenci kayıtlarının yapılması, BM simülasyonu temel kurallarının tanıtılması.',
        'KASIM - ARALIK: Dünya Çocuk Hakları Günü ve İnsan Hakları Haftası münasebetiyle okul panosu ve bülteni hazırlanması, komite simülasyonu çalıştaylarının yapılması.',
        'OCAK - ŞUBAT: 1. Dönem çalışmalarının değerlendirilmesi, küresel iklim krizi ve barış temalı münazara oturumu düzenlenmesi.',
        'MART - NİSAN: Ulusal MUN konferanslarına katılım hazırlığı veya okul içi mini MUN Genel Kurulu düzenlenmesi, elçilik ve diplomasi sunumları.',
        'MAYIS - HAZİRAN: Yıl sonu faaliyet raporunun hazırlanması, sertifika ve katılım belgelerinin verilmesi, okul idaresine teslimi.'
    ],
    'ogrenciParas': [
        'MODEL BİRLEŞMİŞ MİLLETLER (MUN) KULÜBÜ GÖREVLİ ÖĞRENCİ LİSTESİ'
    ],
    'veliParas': [
        'EK-5 SOSYAL ETKİNLİK VELİ İZİN BELGESİ'
    ],
    'raporParas': [
        'MODEL BİRLEŞMİŞ MİLLETLER (MUN) KULÜBÜ 2026-2027 YIL SONU FAALİYET RAPORU'
    ],
    'faaliyetTable': [
        {'aylar': 'EYLÜL - EKİM', 'faaliyetler': 'Kulübün kuruluşu, genel kurul, görev dağılımı ve BM simülasyonu rehberliği yapıldı.'},
        {'aylar': 'KASIM - ARALIK', 'faaliyetler': 'İnsan Hakları Haftası panosu, delegasyon çalışmaları ve İngilizce/Türkçe hitabet atölyeleri tamamlandı.'},
        {'aylar': 'OCAK - ŞUBAT', 'faaliyetler': 'Ara dönem değerlendirmesi, komite taslak karar metinleri (resolution) yazım eğitimi verildi.'},
        {'aylar': 'MART - NİSAN', 'faaliyetler': 'Okul içi MUN Çalıştayı gerçekleştirildi, küresel çevre ve barış sorunları tartışıldı.'},
        {'aylar': 'MAYIS - HAZİRAN', 'faaliyetler': 'Yıl sonu faaliyet raporu düzenlendi, sosyal etkinlik modülü kayıtları tamamlandı ve idareye sunuldu.'}
    ]
})

with open('data/club-documents.json', 'w', encoding='utf-8') as f:
    json.dump(clubs_data, f, ensure_ascii=False, indent=2)

print(f'Successfully parsed and saved {len(clubs_data)} clubs into data/club-documents.json!')
