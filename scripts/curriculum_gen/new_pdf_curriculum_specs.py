# -*- coding: utf-8 -*-
"""
Specification of all 53 new topics derived from:
- 7. sınıf.pdf
- 8 sınıf .pdf (LGS)
- 9. Sınıf dersler.pdf
- 10 sınıf.pdf
- 11.-Sinif-konulari.pdf
- 12 ders konuları .pdf
"""

NEW_PDF_SPECS = [
    # 7. Sınıf (from 7. sınıf.pdf)
    {
        "grade_num": 7,
        "grade_str": "7. Sınıf",
        "subject": "Matematik",
        "topic": "Oran ve Orantı",
        "slug": "7-sinif-matematik-oran-ve-oranti-konu-anlatimi-20-soruluk-test",
        "title": "7. Sınıf Matematik Oran ve Orantı Konu Anlatımı, 20 Soruluk Test ve MEB Çözümleri",
        "excerpt": "7. sınıf oran ve orantı, doğru orantı, ters orantı, orantı sabiti (k), içler dışlar çarpımı ve problem çözme stratejileri konu anlatımı ve 20 soruluk test.",
        "category_slug": "7-sinif",
        "tags": ["7. Sınıf Matematik", "Oran ve Orantı", "Doğru Orantı", "Ters Orantı", "Konu Anlatımı", "20 Soruluk Test", "MEB Çözümleri"]
    },
    {
        "grade_num": 7,
        "grade_str": "7. Sınıf",
        "subject": "Matematik",
        "topic": "Yüzdeler ve Yüzde Problemleri",
        "slug": "7-sinif-matematik-yuzdeler-konu-anlatimi-20-soruluk-test",
        "title": "7. Sınıf Matematik Yüzdeler ve Yüzde Problemleri Konu Anlatımı, 20 Soruluk Test ve MEB Çözümleri",
        "excerpt": "7. sınıf bir çokluğun yüzdesini bulma, yüzdesi verilen çokluğu hesaplama, yüzde artış-azalış, KDV ve kâr-zarar problemleri konu anlatımı ve 20 soruluk test.",
        "category_slug": "7-sinif",
        "tags": ["7. Sınıf Matematik", "Yüzdeler", "Kâr Zarar Problemleri", "KDV Hesaplama", "Konu Anlatımı", "20 Soruluk Test"]
    },
    {
        "grade_num": 7,
        "grade_str": "7. Sınıf",
        "subject": "Matematik",
        "topic": "Doğrular ve Açılar",
        "slug": "7-sinif-matematik-dogrular-ve-acilar-konu-anlatimi-20-soruluk-test",
        "title": "7. Sınıf Matematik Doğrular ve Açılar Konu Anlatımı, 20 Soruluk Test ve MEB Çözümleri",
        "excerpt": "7. sınıf açıortay, paralel iki doğrunun bir kesenle yaptığı açılar (yöndeş, iç ters, dış ters, karşı durumlu açılar), Z-M-U kuralları konu anlatımı ve 20 soruluk test.",
        "category_slug": "7-sinif",
        "tags": ["7. Sınıf Matematik", "Doğrular ve Açılar", "Açıortay", "Z Kuralı", "M Kuralı", "Konu Anlatımı", "20 Soruluk Test"]
    },
    {
        "grade_num": 7,
        "grade_str": "7. Sınıf",
        "subject": "Fen Bilimleri",
        "topic": "Kuvvet ve Enerji & Saf Madde ve Karışımlar",
        "slug": "7-sinif-fen-bilimleri-kuvvet-ve-enerji-konu-anlatimi-20-soruluk-test",
        "title": "7. Sınıf Fen Bilimleri Kuvvet ve Enerji & Saf Madde Karışımlar Konu Anlatımı, 20 Soruluk Test ve MEB Çözümleri",
        "excerpt": "7. sınıf kütle ve ağırlık ilişkisi, fiziksel iş (W=F.x), kinetik ve potansiyel enerji, enerjinin korunumu, homojen-heterojen karışımlar ve ayırma teknikleri.",
        "category_slug": "7-sinif",
        "tags": ["7. Sınıf Fen Bilimleri", "Kuvvet ve Enerji", "İş ve Enerji", "Saf Madde", "Karışımlar", "Konu Anlatımı", "20 Soruluk Test"]
    },
    {
        "grade_num": 7,
        "grade_str": "7. Sınıf",
        "subject": "Fen Bilimleri",
        "topic": "Işığın Madde ile Etkileşimi ve Aynalar",
        "slug": "7-sinif-fen-bilimleri-isigin-madde-ile-etkilesimi-konu-anlatimi-20-soruluk-test",
        "title": "7. Sınıf Fen Bilimleri Işığın Madde ile Etkileşimi ve Aynalar Konu Anlatımı, 20 Soruluk Test ve MEB Çözümleri",
        "excerpt": "7. sınıf ışığın soğurulması, beyaz ışığın renklerine ayrılması, düzlem, çukur ve tümsek aynalarda görüntü özellikleri, kırılma ve mercekler konu anlatımı ve test.",
        "category_slug": "7-sinif",
        "tags": ["7. Sınıf Fen Bilimleri", "Işığın Madde ile Etkileşimi", "Aynalar", "Işığın Kırılması", "Mercekler", "Konu Anlatımı", "20 Soruluk Test"]
    },
    {
        "grade_num": 7,
        "grade_str": "7. Sınıf",
        "subject": "Türkçe",
        "topic": "Fiiller (Eylemler), Ek-Fiil ve Zarflar",
        "slug": "7-sinif-turkce-fiiller-ve-ek-fiil-konu-anlatimi-20-soruluk-test",
        "title": "7. Sınıf Türkçe Fiiller (Eylemler), Ek-Fiil ve Zarflar Konu Anlatımı, 20 Soruluk Test ve MEB Çözümleri",
        "excerpt": "7. sınıf fiilde anlam (iş, oluş, durum), haber ve dilek kipleri, kişi ekleri, ek-fiil görevleri (idi, imiş, ise, -dir), zarf (belirteç) türleri ve 20 soruluk test.",
        "category_slug": "7-sinif",
        "tags": ["7. Sınıf Türkçe", "Fiiller", "Ek-Fiil", "Zarflar", "Kip Ekleri", "Konu Anlatımı", "20 Soruluk Test"]
    },
    {
        "grade_num": 7,
        "grade_str": "7. Sınıf",
        "subject": "Türkçe",
        "topic": "Sözcükte, Cümlede ve Parçada Anlam",
        "slug": "7-sinif-turkce-sozcukte-ve-cumlede-anlam-konu-anlatimi-20-soruluk-test",
        "title": "7. Sınıf Türkçe Sözcükte, Cümlede ve Parçada Anlam Konu Anlatımı, 20 Soruluk Test ve MEB Çözümleri",
        "excerpt": "7. sınıf gerçek, mecaz, terim anlam, deyimler, atasözleri; neden-sonuç, amaç-sonuç, koşul cümleleri; paragrafta ana fikir, yardımcı fikir ve anlatım teknikleri.",
        "category_slug": "7-sinif",
        "tags": ["7. Sınıf Türkçe", "Sözcükte Anlam", "Cümlede Anlam", "Paragrafta Anlam", "Konu Anlatımı", "20 Soruluk Test"]
    },
    {
        "grade_num": 7,
        "grade_str": "7. Sınıf",
        "subject": "Sosyal Bilgiler",
        "topic": "Birey ve Toplum & Kültür ve Miras (Osmanlı Devleti)",
        "slug": "7-sinif-sosyal-bilgiler-birey-toplum-ve-kultur-miras-konu-anlatimi-20-soruluk-test",
        "title": "7. Sınıf Sosyal Bilgiler Birey ve Toplum & Kültür ve Miras Konu Anlatımı, 20 Soruluk Test ve MEB Çözümleri",
        "excerpt": "7. sınıf etkili iletişim, medya okuryazarlığı; Osmanlı Devleti'nin kuruluşu, fetih siyaseti, istimalet politikası, denizlerde fetihler ve divan teşkilatı konu anlatımı.",
        "category_slug": "7-sinif",
        "tags": ["7. Sınıf Sosyal Bilgiler", "Birey ve Toplum", "Kültür ve Miras", "Osmanlı Devleti", "Konu Anlatımı", "20 Soruluk Test"]
    },

    # 8. Sınıf (LGS - from 8 sınıf .pdf)
    {
        "grade_num": 8,
        "grade_str": "8. Sınıf",
        "subject": "Matematik",
        "topic": "Veri Analizi ve Basit Olayların Olma Olasılığı",
        "slug": "8-sinif-matematik-veri-analizi-ve-olasilik-konu-anlatimi-20-soruluk-test",
        "title": "8. Sınıf LGS Matematik Veri Analizi ve Basit Olayların Olma Olasılığı Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "8. sınıf LGS çizgi, sütun ve daire grafikleri arası dönüşümler, eş olasılıklı olaylar, basit olayların olma olasılığı formülü ve 20 soruluk yeni nesil deneme testi.",
        "category_slug": "8-sinif",
        "tags": ["8. Sınıf Matematik", "LGS Matematik", "Veri Analizi", "Olasılık", "Daire Grafiği", "Konu Anlatımı", "20 Soruluk Test"]
    },
    {
        "grade_num": 8,
        "grade_str": "8. Sınıf",
        "subject": "Matematik",
        "topic": "Cebirsel İfadeler, Özdeşlikler ve Doğrusal Denklemler",
        "slug": "8-sinif-matematik-cebirsel-ifadeler-ve-denklemler-konu-anlatimi-20-soruluk-test",
        "title": "8. Sınıf LGS Matematik Cebirsel İfadeler, Özdeşlikler ve Doğrusal Denklemler Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "8. sınıf cebirsel çarpma, tam kare ve iki kare farkı özdeşlikleri, ortak çarpan parantezine alma, koordinat sistemi ve doğru grafiğinde eğim konu anlatımı ve test.",
        "category_slug": "8-sinif",
        "tags": ["8. Sınıf Matematik", "LGS Cebirsel İfadeler", "Özdeşlikler", "Doğrusal Denklemler", "Eğim", "20 Soruluk Test"]
    },
    {
        "grade_num": 8,
        "grade_str": "8. Sınıf",
        "subject": "Matematik",
        "topic": "Eşitsizlikler ve Üçgenler (Pisagor & Benzerlik)",
        "slug": "8-sinif-matematik-esitsizlikler-ve-ucgenler-konu-anlatimi-20-soruluk-test",
        "title": "8. Sınıf LGS Matematik Eşitsizlikler ve Üçgenler (Pisagor & Benzerlik) Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "8. sınıf birinci dereceden eşitsizlikler, üçgen eşitsizliği, açı-kenar bağıntıları, kenarortay, açıortay, Pisagor bağıntısı (a²+b²=c²) ve benzerlik oranı testi.",
        "category_slug": "8-sinif",
        "tags": ["8. Sınıf Matematik", "LGS Üçgenler", "Pisagor Bağıntısı", "Benzerlik", "Eşitsizlikler", "20 Soruluk Test"]
    },
    {
        "grade_num": 8,
        "grade_str": "8. Sınıf",
        "subject": "Matematik",
        "topic": "Dönüşüm Geometrisi ve Geometrik Cisimler",
        "slug": "8-sinif-matematik-donusum-geometrisi-ve-geometrik-cisimler-konu-anlatimi-20-soruluk-test",
        "title": "8. Sınıf LGS Matematik Dönüşüm Geometrisi ve Geometrik Cisimler Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "8. sınıf öteleme, yansıma simetrisi, dik prizmalar, dik dairesel silindirin alanı ve hacmi, dik piramit ve dik koni açınımı konu anlatımı ve 20 soruluk çözümlü test.",
        "category_slug": "8-sinif",
        "tags": ["8. Sınıf Matematik", "LGS Dönüşüm Geometrisi", "Geometrik Cisimler", "Silindir Hacmi", "Piramit ve Koni", "20 Soruluk Test"]
    },
    {
        "grade_num": 8,
        "grade_str": "8. Sınıf",
        "subject": "Türkçe",
        "topic": "Fiil Çatısı ve Cümle Çeşitleri",
        "slug": "8-sinif-turkce-fiil-catisi-ve-cumle-turleri-konu-anlatimi-20-soruluk-test",
        "title": "8. Sınıf LGS Türkçe Fiil Çatısı ve Cümle Çeşitleri Konu Anlatımı, 20 Soruluk Test ve MEB Çözümleri",
        "excerpt": "8. sınıf LGS özneye göre (etken, edilgen) ve nesneye göre (geçişli, geçişsiz) fiil çatıları; yüklemin türüne, yerine, anlamına ve yapısına (fiilimsili) göre cümleler.",
        "category_slug": "8-sinif",
        "tags": ["8. Sınıf Türkçe", "LGS Türkçe", "Fiil Çatısı", "Cümle Çeşitleri", "Etken Edilgen", "20 Soruluk Test"]
    },
    {
        "grade_num": 8,
        "grade_str": "8. Sınıf",
        "subject": "Türkçe",
        "topic": "Paragrafta Anlam, Yazım Kuralları ve Noktalama",
        "slug": "8-sinif-turkce-paragrafta-anlam-yazim-ve-noktalama-konu-anlatimi-20-soruluk-test",
        "title": "8. Sınıf LGS Türkçe Paragrafta Anlam, Yazım ve Noktalama Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "8. sınıf LGS paragrafta ana fikir, yardımcı fikirler, akışı bozan cümle; de, ki ve mi'nin yazımı, büyük harfler; noktalama işaretleri konu anlatımı ve 20 soruluk deneme.",
        "category_slug": "8-sinif",
        "tags": ["8. Sınıf Türkçe", "LGS Paragraf", "Yazım Kuralları", "Noktalama İşaretleri", "Konu Anlatımı", "20 Soruluk Test"]
    },
    {
        "grade_num": 8,
        "grade_str": "8. Sınıf",
        "subject": "Fen Bilimleri",
        "topic": "Basınç, Madde ve Endüstri (Periyodik Tablo & Asit-Baz)",
        "slug": "8-sinif-fen-bilimleri-basinc-madde-ve-endustri-konu-anlatimi-20-soruluk-test",
        "title": "8. Sınıf LGS Fen Bilimleri Basınç, Madde ve Endüstri Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "8. sınıf katı ve sıvı basıncı (Pascal prensibi), açık hava basıncı, periyodik sistem özellikleri, fiziksel-kimyasal değişimler, asitler, bazlar ve asit yağmurları testi.",
        "category_slug": "8-sinif",
        "tags": ["8. Sınıf Fen Bilimleri", "LGS Basınç", "Periyodik Sistem", "Asitler ve Bazlar", "Madde ve Endüstri", "20 Soruluk Test"]
    },
    {
        "grade_num": 8,
        "grade_str": "8. Sınıf",
        "subject": "Fen Bilimleri",
        "topic": "Basit Makineler, Enerji Dönüşümleri ve Elektrik",
        "slug": "8-sinif-fen-bilimleri-basit-makineler-ve-enerji-donusumleri-konu-anlatimi-20-soruluk-test",
        "title": "8. Sınıf LGS Fen Bilimleri Basit Makineler, Enerji Dönüşümleri ve Elektrik Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "8. sınıf LGS makaralar, kaldıraçlar, eğik düzlem, çıkrık; besin zinciri, fotosentez, hücresel solunum, madde döngüleri; elektrik yükleri ve elektroskop konu anlatımı.",
        "category_slug": "8-sinif",
        "tags": ["8. Sınıf Fen Bilimleri", "LGS Basit Makineler", "Enerji Dönüşümleri", "Fotosentez", "Elektrik Yükleri", "20 Soruluk Test"]
    },
    {
        "grade_num": 8,
        "grade_str": "8. Sınıf",
        "subject": "T.C. İnkılap Tarihi",
        "topic": "Bir Kahraman Doğuyor ve Milli Uyanış",
        "slug": "8-sinif-tc-inkilap-tarihi-bir-kahraman-doguyor-ve-milli-uyanis-konu-anlatimi-20-soruluk-test",
        "title": "8. Sınıf LGS T.C. İnkılap Tarihi Bir Kahraman Doğuyor ve Milli Uyanış Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "8. sınıf LGS Atatürk'ün çocukluğu ve askerlik hayatı, 1. Dünya Savaşı ve Osmanlı cepheleri, Mondros Ateşkesi, Kuvâ-yı Millîye, genelgeler ve kongreler konu anlatımı.",
        "category_slug": "8-sinif",
        "tags": ["8. Sınıf İnkılap Tarihi", "LGS İnkılap", "Bir Kahraman Doğuyor", "Milli Uyanış", "Amasya Genelgesi", "20 Soruluk Test"]
    },
    {
        "grade_num": 8,
        "grade_str": "8. Sınıf",
        "subject": "T.C. İnkılap Tarihi",
        "topic": "Milli Bir Destan (Ya İstiklal Ya Ölüm) ve Atatürkçülük",
        "slug": "8-sinif-tc-inkilap-tarihi-milli-destan-ve-ataturkculuk-konu-anlatimi-20-soruluk-test",
        "title": "8. Sınıf LGS T.C. İnkılap Tarihi Milli Bir Destan ve Atatürkçülük Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "8. sınıf LGS Doğu, Güney, Batı cepheleri (İnönü, Sakarya, Büyük Taarruz), Mudanya ve Lozan Barış Antlaşması, Atatürk ilkeleri ve inkılapları konu anlatımı ve test.",
        "category_slug": "8-sinif",
        "tags": ["8. Sınıf İnkılap Tarihi", "LGS İnkılap", "Kurtuluş Savaşı Cepheleri", "Lozan Antlaşması", "Atatürk İlkeleri", "20 Soruluk Test"]
    },

    # 9. Sınıf (from 9. Sınıf dersler.pdf)
    {
        "grade_num": 9,
        "grade_str": "9. Sınıf",
        "subject": "Matematik",
        "topic": "Sayı Kümeleri, Bölünebilme Kuralları ve EBOB-EKOK",
        "slug": "9-sinif-matematik-sayi-kumeleri-ve-bolunebilme-kurallari-konu-anlatimi-20-soruluk-test",
        "title": "9. Sınıf Matematik Sayı Kümeleri, Bölünebilme Kuralları ve EBOB-EKOK Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "9. sınıf sayı kümeleri (N, Z, Q, R), 2, 3, 4, 5, 8, 9, 10, 11 ile bölünebilme kuralları, asal çarpanlara ayırma, EBOB-EKOK ve periyodik problemler konu anlatımı.",
        "category_slug": "9-sinif",
        "tags": ["9. Sınıf Matematik", "TYT Matematik", "Bölünebilme Kuralları", "EBOB EKOK", "Sayı Kümeleri", "20 Soruluk Test"]
    },
    {
        "grade_num": 9,
        "grade_str": "9. Sınıf",
        "subject": "Matematik",
        "topic": "Üçgenler, Eşlik-Benzerlik ve Trigonometri",
        "slug": "9-sinif-matematik-ucgenler-ve-trigonometri-konu-anlatimi-20-soruluk-test",
        "title": "9. Sınıf Matematik Üçgenler, Eşlik-Benzerlik ve Trigonometri Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "9. sınıf üçgende açılar, açıortay ve kenarortay teoremleri, üçgenlerin benzerliği (A.A, K.A.K), dik üçgende Pisagor-Öklid ve dar açıların trigonometrik oranları.",
        "category_slug": "9-sinif",
        "tags": ["9. Sınıf Matematik", "Üçgenler", "Benzerlik Teoremleri", "Öklid Bağıntıları", "Trigonometriye Giriş", "20 Soruluk Test"]
    },
    {
        "grade_num": 9,
        "grade_str": "9. Sınıf",
        "subject": "Matematik",
        "topic": "Veri, İstatistik ve Grafikler",
        "slug": "9-sinif-matematik-veri-ve-istatistik-konu-anlatimi-20-soruluk-test",
        "title": "9. Sınıf Matematik Veri, İstatistik ve Grafikler Konu Anlatımı, 20 Soruluk Test ve MEB Çözümleri",
        "excerpt": "9. sınıf merkezi eğilim ölçüleri (aritmetik ortalama, medyan, mod), merkezi yayılım ölçüleri (açıklık, standart sapma) ve histogram grafikleri konu anlatımı.",
        "category_slug": "9-sinif",
        "tags": ["9. Sınıf Matematik", "İstatistik", "Aritmetik Ortalama", "Medyan Mod", "Standart Sapma", "20 Soruluk Test"]
    },
    {
        "grade_num": 9,
        "grade_str": "9. Sınıf",
        "subject": "Fizik",
        "topic": "İş, Güç, Enerji, Isı-Sıcaklık ve Elektrostatik",
        "slug": "9-sinif-fizik-is-guc-enerji-isi-ve-sicaklik-konu-anlatimi-20-soruluk-test",
        "title": "9. Sınıf Fizik İş, Güç, Enerji, Isı-Sıcaklık ve Elektrostatik Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "9. sınıf mekanik iş ve güç, kinetik ve potansiyel enerji, enerjinin korunumu, verim, ısı ve sıcaklık farkı, öz ısı, hal değişimi ve durgun elektrik elektrostatik.",
        "category_slug": "9-sinif",
        "tags": ["9. Sınıf Fizik", "TYT Fizik", "İş Güç Enerji", "Isı ve Sıcaklık", "Elektrostatik", "20 Soruluk Test"]
    },
    {
        "grade_num": 9,
        "grade_str": "9. Sınıf",
        "subject": "Kimya",
        "topic": "Kimyasal Türler Arası Etkileşimler ve Maddenin Halleri",
        "slug": "9-sinif-kimya-turler-arasi-etkilesimler-ve-maddenin-halleri-konu-anlatimi-20-soruluk-test",
        "title": "9. Sınıf Kimya Kimyasal Türler Arası Etkileşimler ve Maddenin Halleri Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "9. sınıf güçlü etkileşimler (iyonik, kovalent, metalik bağ), Lewis yapıları, zayıf etkileşimler (hidrojen bağı, Van der Waals), katılar, sıvılarda viskozite ve gazlar.",
        "category_slug": "9-sinif",
        "tags": ["9. Sınıf Kimya", "TYT Kimya", "Kimyasal Bağlar", "Lewis Yapısı", "Maddenin Halleri", "20 Soruluk Test"]
    },
    {
        "grade_num": 9,
        "grade_str": "9. Sınıf",
        "subject": "Biyoloji",
        "topic": "Canlılar Dünyası, Biyoçeşitlilik ve Sınıflandırma",
        "slug": "9-sinif-biyoloji-canlilar-dunyasi-ve-siniflandirma-konu-anlatimi-20-soruluk-test",
        "title": "9. Sınıf Biyoloji Canlılar Dünyası, Biyoçeşitlilik ve Sınıflandırma Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "9. sınıf canlıların sınıflandırılması (binominal adlandırma, tür kavramı), bakteriler, arkeler, protistler, mantarlar, bitkiler ve hayvanlar alemleri konu anlatımı.",
        "category_slug": "9-sinif",
        "tags": ["9. Sınıf Biyoloji", "TYT Biyoloji", "Canlılar Dünyası", "Sınıflandırma Basamakları", "Canlı Alemleri", "20 Soruluk Test"]
    },
    {
        "grade_num": 9,
        "grade_str": "9. Sınıf",
        "subject": "Türk Dili ve Edebiyatı",
        "topic": "Edebiyata Giriş, Hikaye, Şiir ve Dil Bilgisi (Sözcük Türleri)",
        "slug": "9-sinif-turk-dili-ve-edebiyati-hikaye-siir-ve-dil-bilgisi-konu-anlatimi-20-soruluk-test",
        "title": "9. Sınıf Türk Dili ve Edebiyatı Hikaye, Şiir ve Dil Bilgisi Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "9. sınıf edebiyatın tanımı ve güzel sanatlarla ilişkisi, olay ve durum hikayesi, nazım birimi, kafiye ve redif; isim, sıfat, zamir ve zarf konu anlatımı ve test.",
        "category_slug": "9-sinif",
        "tags": ["9. Sınıf Edebiyat", "Hikaye Türleri", "Şiir Bilgisi", "Sözcük Türleri", "İsim Sıfat Zamir", "20 Soruluk Test"]
    },
    {
        "grade_num": 9,
        "grade_str": "9. Sınıf",
        "subject": "Tarih",
        "topic": "Tarih ve Zaman, İlk Çağ Medeniyetleri ve İlk Türk Dünyası",
        "slug": "9-sinif-tarih-ilk-cag-uygarliklari-ve-turk-dunyasi-konu-anlatimi-20-soruluk-test",
        "title": "9. Sınıf Tarih Tarih ve Zaman, İlk Çağ Medeniyetleri ve İlk Türk Dünyası Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "9. sınıf tarihin tanımı, yöntemi ve kaynakları, takvim sistemleri; Mezopotamya, Anadolu, Mısır uygarlıkları; Orta Asya ilk Türk devletleri ve Türk töresi konu anlatımı.",
        "category_slug": "9-sinif",
        "tags": ["9. Sınıf Tarih", "TYT Tarih", "Tarih ve Zaman", "İlk Çağ Uygarlıkları", "İlk Türk Devletleri", "20 Soruluk Test"]
    },

    # 10. Sınıf (from 10 sınıf.pdf)
    {
        "grade_num": 10,
        "grade_str": "10. Sınıf",
        "subject": "Matematik",
        "topic": "İkinci Dereceden Bir Bilinmeyenli Denklemler ve Karmaşık Sayılar",
        "slug": "10-sinif-matematik-ikinci-dereceden-denklemler-konu-anlatimi-20-soruluk-test",
        "title": "10. Sınıf Matematik İkinci Dereceden Denklemler ve Karmaşık Sayılar Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "10. sınıf ax²+bx+c=0 denkleminin diskriminantı (Δ=b²-4ac), kök bulma formülleri, kökler ve katsayılar bağıntısı, sanal birim i ve karmaşık sayılar konu anlatımı.",
        "category_slug": "10-sinif",
        "tags": ["10. Sınıf Matematik", "İkinci Dereceden Denklemler", "Diskriminant Delta", "Kökler Bağıntısı", "Karmaşık Sayılar", "20 Soruluk Test"]
    },
    {
        "grade_num": 10,
        "grade_str": "10. Sınıf",
        "subject": "Matematik",
        "topic": "Çokgenler, Özel Dörtgenler ve Katı Cisimler",
        "slug": "10-sinif-matematik-dortgenler-cokgenler-ve-kati-cisimler-konu-anlatimi-20-soruluk-test",
        "title": "10. Sınıf Matematik Çokgenler, Özel Dörtgenler ve Katı Cisimler Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "10. sınıf dışbükey çokgenler, yamuk, paralelkenar, eşkenar dörtgen, dikdörtgen, kare, deltoid alan ve kenar bağıntıları; dik prizma ve piramit alan-hacim formülleri.",
        "category_slug": "10-sinif",
        "tags": ["10. Sınıf Matematik", "Çokgenler", "Özel Dörtgenler", "Yamuk ve Paralelkenar", "Katı Cisimler", "20 Soruluk Test"]
    },
    {
        "grade_num": 10,
        "grade_str": "10. Sınıf",
        "subject": "Fizik",
        "topic": "Dalgalar (Yay, Su, Ses, Deprem) ve Optik",
        "slug": "10-sinif-fizik-dalgalar-ve-optik-konu-anlatimi-20-soruluk-test",
        "title": "10. Sınıf Fizik Dalgalar ve Optik Konu Anlatımı, 20 Soruluk Test ve MEB Çözümleri",
        "excerpt": "10. sınıf dalga boyu, periyot, frekans, yay ve su dalgalarında yansıma; ses ve deprem dalgaları; ışık şiddeti, aydınlanma, düzlem ve küresel aynalar, kırılma ve mercekler.",
        "category_slug": "10-sinif",
        "tags": ["10. Sınıf Fizik", "TYT Fizik", "Dalgalar", "Optik", "Aydınlanma ve Aynalar", "Mercekler", "20 Soruluk Test"]
    },
    {
        "grade_num": 10,
        "grade_str": "10. Sınıf",
        "subject": "Kimya",
        "topic": "Karışımlar, Asitler, Bazlar ve Tuzlar",
        "slug": "10-sinif-kimya-karisimlar-asitler-bazlar-ve-tuzlar-konu-anlatimi-20-soruluk-test",
        "title": "10. Sınıf Kimya Karışımlar, Asitler, Bazlar ve Tuzlar Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "10. sınıf homojen-heterojen karışımlar, kütlece yüzde derişim, ayırma teknikleri, asit ve bazların genel özellikleri, pH kavramı, nötralleşme tepkimeleri ve yaygın tuzlar.",
        "category_slug": "10-sinif",
        "tags": ["10. Sınıf Kimya", "TYT Kimya", "Karışımlar", "Asitler ve Bazlar", "pH Kavramı", "Nötralleşme", "20 Soruluk Test"]
    },
    {
        "grade_num": 10,
        "grade_str": "10. Sınıf",
        "subject": "Biyoloji",
        "topic": "Ekosistem Ekolojisi, Çevre Sorunları ve Biyolojik Çeşitlilik",
        "slug": "10-sinif-biyoloji-ekosistem-ekolojisi-ve-cevre-sorunlari-konu-anlatimi-20-soruluk-test",
        "title": "10. Sınıf Biyoloji Ekosistem Ekolojisi ve Güncel Çevre Sorunları Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "10. sınıf ekosistemin yapısı (biyotik ve abiyotik faktörler), besin piramidi, madde döngüleri (karbon, azot, su), sera etkisi, küresel ısınma ve biyoçeşitliliğin korunması.",
        "category_slug": "10-sinif",
        "tags": ["10. Sınıf Biyoloji", "TYT Biyoloji", "Ekosistem Ekolojisi", "Madde Döngüleri", "Besin Piramidi", "20 Soruluk Test"]
    },
    {
        "grade_num": 10,
        "grade_str": "10. Sınıf",
        "subject": "Türk Dili ve Edebiyatı",
        "topic": "Türk Edebiyatının Dönemleri, Destan, Divan Şiiri ve Roman",
        "slug": "10-sinif-turk-dili-ve-edebiyati-destan-divan-siiri-ve-roman-konu-anlatimi-20-soruluk-test",
        "title": "10. Sınıf Türk Dili ve Edebiyatı Destan, Divan Şiiri ve Roman Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "10. sınıf Dede Korkut hikayeleri, halk hikayesi ve mesnevi; koşma, gazel, kaside nazım biçimleri; İslamiyet öncesi destanlar; Tanzimat ve Milli Edebiyat roman özellikleri.",
        "category_slug": "10-sinif",
        "tags": ["10. Sınıf Edebiyat", "Dede Korkut", "Divan Şiiri", "Halk Edebiyatı", "Destan Türleri", "20 Soruluk Test"]
    },
    {
        "grade_num": 10,
        "grade_str": "10. Sınıf",
        "subject": "Tarih",
        "topic": "Beylikten Devlete Osmanlı Siyaseti ve Dünya Gücü Osmanlı",
        "slug": "10-sinif-tarih-beylikten-devlete-ve-dunya-gucu-osmanli-konu-anlatimi-20-soruluk-test",
        "title": "10. Sınıf Tarih Beylikten Devlete ve Dünya Gücü Osmanlı Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "10. sınıf Anadolu Selçuklu Devleti'nin dağılışı, Osmanlı Devleti'nin kuruluşu ve fetihleri, İstanbul'un fethi, Yavuz ve Kanuni dönemleri, divan teşkilatı ve tımar sistemi.",
        "category_slug": "10-sinif",
        "tags": ["10. Sınıf Tarih", "Osmanlı Kuruluş Dönemi", "İstanbul'un Fethi", "Dünya Gücü Osmanlı", "Tımar Sistemi", "20 Soruluk Test"]
    },

    # 11. Sınıf (from 11.-Sinif-konulari.pdf)
    {
        "grade_num": 11,
        "grade_str": "11. Sınıf",
        "subject": "Matematik",
        "topic": "İkinci Dereceden Denklem ve Eşitsizlik Sistemleri",
        "slug": "11-sinif-matematik-esitsizlik-sistemleri-ve-uygulamalar-konu-anlatimi-20-soruluk-test",
        "title": "11. Sınıf AYT Matematik İkinci Dereceden Eşitsizlik Sistemleri Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "11. sınıf ikinci dereceden bir ve iki bilinmeyenli eşitsizlikler, işaret tablosu oluşturma kuralları, eşitsizlik sistemleri çözüm kümesi ve grafik yorumlama testi.",
        "category_slug": "11-sinif",
        "tags": ["11. Sınıf Matematik", "AYT Matematik", "Eşitsizlik Sistemleri", "İşaret Tablosu", "Parabol Eşitsizlik", "20 Soruluk Test"]
    },
    {
        "grade_num": 11,
        "grade_str": "11. Sınıf",
        "subject": "Matematik",
        "topic": "Çember ve Daire (Açılar, Uzunluk ve Alan)",
        "slug": "11-sinif-matematik-cember-ve-daire-konu-anlatimi-20-soruluk-test",
        "title": "11. Sınıf Matematik Çember ve Daire Konu Anlatımı, 20 Soruluk Test ve MEB Çözümleri",
        "excerpt": "11. sınıf çemberde merkez, çevre, teğet-kiriş, iç ve dış açılar; kiriş özellikleri ve teğet parçaları; dairenin çevresi, daire dilimi ve parçasının alan hesapları.",
        "category_slug": "11-sinif",
        "tags": ["11. Sınıf Matematik", "AYT Geometri", "Çemberde Açılar", "Çemberde Uzunluk", "Dairenin Alanı", "20 Soruluk Test"]
    },
    {
        "grade_num": 11,
        "grade_str": "11. Sınıf",
        "subject": "Matematik",
        "topic": "Uzay Geometri ve Koşullu Olasılık",
        "slug": "11-sinif-matematik-uzay-geometri-ve-olasilik-konu-anlatimi-20-soruluk-test",
        "title": "11. Sınıf Matematik Uzay Geometri ve Koşullu Olasılık Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "11. sınıf dik prizmalar, silindir, dik piramit, koni ve kürenin alan ve hacim hesapları; koşullu olasılık P(A|B), bağımlı ve bağımsız olaylar konu anlatımı ve test.",
        "category_slug": "11-sinif",
        "tags": ["11. Sınıf Matematik", "Uzay Geometri", "Katı Cisimler Hacim", "Koşullu Olasılık", "Bağımsız Olaylar", "20 Soruluk Test"]
    },
    {
        "grade_num": 11,
        "grade_str": "11. Sınıf",
        "subject": "Fizik",
        "topic": "İtme, Çizgisel Momentum, Tork, Denge ve Basit Makineler",
        "slug": "11-sinif-fizik-itme-momentum-tork-ve-denge-konu-anlatimi-20-soruluk-test",
        "title": "11. Sınıf AYT Fizik İtme, Momentum, Tork ve Denge Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "11. sınıf itme (I=F.Δt), momentum değişimi (ΔP), esnek ve esnek olmayan çarpışmalar, tork formülü (τ=F.d), denge şartları, ağırlık merkezi ve basit makineler.",
        "category_slug": "11-sinif",
        "tags": ["11. Sınıf Fizik", "AYT Fizik", "İtme ve Momentum", "Momentum Korunumu", "Tork ve Denge", "20 Soruluk Test"]
    },
    {
        "grade_num": 11,
        "grade_str": "11. Sınıf",
        "subject": "Fizik",
        "topic": "Elektrik ve Manyetizma (İndüksiyon & Alternatif Akım)",
        "slug": "11-sinif-fizik-elektrik-ve-manyetizma-alternatif-akim-konu-anlatimi-20-soruluk-test",
        "title": "11. Sınıf AYT Fizik Elektrik ve Manyetizma (İndüksiyon & Alternatif Akım) Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "11. sınıf Coulomb yasası, elektriksel potansiyel enerji, düzgün elektrik alan ve sığa (kondansatör); manyetik alan, Faraday-Lenz indüksiyon yasası ve transformatörler.",
        "category_slug": "11-sinif",
        "tags": ["11. Sınıf Fizik", "AYT Fizik", "Elektriksel Potansiyel", "Manyetik Alan", "İndüksiyon Akımı", "Alternatif Akım", "20 Soruluk Test"]
    },
    {
        "grade_num": 11,
        "grade_str": "11. Sınıf",
        "subject": "Kimya",
        "topic": "Sıvı Çözeltiler ve Çözünürlük (Koligatif Özellikler)",
        "slug": "11-sinif-kimya-sivi-cozeltiler-ve-cozunurluk-konu-anlatimi-20-soruluk-test",
        "title": "11. Sınıf AYT Kimya Sıvı Çözeltiler ve Çözünürlük Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "11. sınıf molarite, molalite, mol kesri ve ppm derişim birimleri, buhar basıncı düşmesi, kaynama noktası yükselmesi (ebülyoskopi), donma noktası alçalması ve çözünürlük.",
        "category_slug": "11-sinif",
        "tags": ["11. Sınıf Kimya", "AYT Kimya", "Sıvı Çözeltiler", "Molarite Molalite", "Koligatif Özellikler", "20 Soruluk Test"]
    },
    {
        "grade_num": 11,
        "grade_str": "11. Sınıf",
        "subject": "Kimya",
        "topic": "Kimyasal Tepkimelerde Enerji, Hız ve Denge",
        "slug": "11-sinif-kimya-tepkimelerde-enerji-hiz-ve-denge-konu-anlatimi-20-soruluk-test",
        "title": "11. Sınıf AYT Kimya Tepkimelerde Enerji, Hız ve Denge Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "11. sınıf standart oluşum entalpisi, bağ enerjileri, Hess yasası; çarpışma teorisi ve reaksiyon hızı; kimyasal denge bağıntısı (Kc, Kp), Le Chatelier ilkesi ve Kçç.",
        "category_slug": "11-sinif",
        "tags": ["11. Sınıf Kimya", "AYT Kimya", "Entalpi Hess Yasası", "Tepkime Hızı", "Kimyasal Denge", "Le Chatelier", "20 Soruluk Test"]
    },
    {
        "grade_num": 11,
        "grade_str": "11. Sınıf",
        "subject": "Biyoloji",
        "topic": "Destek-Hareket, Sindirim ve Dolaşım Sistemleri",
        "slug": "11-sinif-biyoloji-dolasim-sindirim-ve-destek-hareket-konu-anlatimi-20-soruluk-test",
        "title": "11. Sınıf AYT Biyoloji Destek-Hareket, Sindirim ve Dolaşım Sistemleri Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "11. sınıf kemik ve kas çeşitleri (Huxley kayan iplikler modeli), sindirim organları ve enzimler, kalp yapısı, kan ve lenf dolaşımı, bağışıklık sistemi konu anlatımı.",
        "category_slug": "11-sinif",
        "tags": ["11. Sınıf Biyoloji", "AYT Biyoloji", "Destek ve Hareket", "Sindirim Sistemi", "Dolaşım Sistemi", "Bağışıklık", "20 Soruluk Test"]
    },
    {
        "grade_num": 11,
        "grade_str": "11. Sınıf",
        "subject": "Biyoloji",
        "topic": "Solunum, Üriner Sistem ve Komünite Ekolojisi",
        "slug": "11-sinif-biyoloji-solunum-uriner-ureme-sistemi-ve-ekoloji-konu-anlatimi-20-soruluk-test",
        "title": "11. Sınıf AYT Biyoloji Solunum, Üriner Sistem ve Komünite Ekolojisi Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "11. sınıf solunum organları, alveoller, kanda oksijen ve karbondioksit taşınması; böbreğin yapısı, nefronlar ve idrar oluşumu; komünite ve popülasyon ekolojisi testi.",
        "category_slug": "11-sinif",
        "tags": ["11. Sınıf Biyoloji", "AYT Biyoloji", "Solunum Sistemi", "Üriner Boşaltım", "Nefron Yapısı", "Komünite Ekolojisi", "20 Soruluk Test"]
    },
    {
        "grade_num": 11,
        "grade_str": "11. Sınıf",
        "subject": "Türk Dili ve Edebiyatı",
        "topic": "Tanzimat'tan Cumhuriyet'e Türk Edebiyatı",
        "slug": "11-sinif-turk-dili-ve-edebiyati-tanzimattan-cumhuriyete-edebiyat-konu-anlatimi-20-soruluk-test",
        "title": "11. Sınıf Türk Dili ve Edebiyatı Tanzimat'tan Cumhuriyet'e Edebiyat Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "11. sınıf Tanzimat 1. ve 2. Dönem özellikleri, Servetifünun ve Fecriati toplulukları, Milli Edebiyat akımı; makale, sohbet, fıkra ve eleştiri türleri konu anlatımı.",
        "category_slug": "11-sinif",
        "tags": ["11. Sınıf Edebiyat", "AYT Edebiyat", "Tanzimat Edebiyatı", "Servetifünun", "Milli Edebiyat", "20 Soruluk Test"]
    },

    # 12. Sınıf (from 12 ders konuları .pdf)
    {
        "grade_num": 12,
        "grade_str": "12. Sınıf",
        "subject": "Matematik",
        "topic": "Trigonometrik Toplam-Fark ve İki Kat Açı Formülleri",
        "slug": "12-sinif-matematik-toplam-fark-ve-yarim-aci-formulleri-konu-anlatimi-20-soruluk-test",
        "title": "12. Sınıf AYT Matematik Toplam-Fark ve İki Kat Açı Formülleri Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "12. sınıf sin(a±b), cos(a±b), tan(a±b) toplam-fark formülleri, sin(2a), cos(2a) iki kat açı formülleri ve trigonometrik denklem çözümleri konu anlatımı ve test.",
        "category_slug": "12-sinif",
        "tags": ["12. Sınıf Matematik", "AYT Matematik", "Toplam Fark Formülleri", "İki Kat Açı", "Trigonometrik Denklemler", "20 Soruluk Test"]
    },
    {
        "grade_num": 12,
        "grade_str": "12. Sınıf",
        "subject": "Matematik",
        "topic": "Çemberin Analitik İncelenmesi",
        "slug": "12-sinif-matematik-cemberin-analitik-incelenmesi-konu-anlatimi-20-soruluk-test",
        "title": "12. Sınıf AYT Matematik Çemberin Analitik İncelenmesi Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "12. sınıf çemberin standart denklemi (x-a)²+(y-b)²=r², genel denklem x²+y²+Dx+Ey+F=0, merkez ve yarıçap bulma, doğru ile çemberin birbirine göre durumları testi.",
        "category_slug": "12-sinif",
        "tags": ["12. Sınıf Matematik", "AYT Geometri", "Çember Analitiği", "Standart Çember Denklemi", "Çemberde Teğet", "20 Soruluk Test"]
    },
    {
        "grade_num": 12,
        "grade_str": "12. Sınıf",
        "subject": "Fizik",
        "topic": "Dalga Mekaniği, Kırınım, Girişim ve Doppler Olayı",
        "slug": "12-sinif-fizik-dalga-mekanigi-girisim-ve-doppler-konu-anlatimi-20-soruluk-test",
        "title": "12. Sınıf AYT Fizik Dalga Mekaniği, Girişim ve Doppler Olayı Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "12. sınıf su dalgalarında girişim ve kırınım, ışıkta çift yarıkta girişim (Young deneyi), tek yarıkta kırınım, saçak genişliği formülü ve Doppler etkisi konu anlatımı.",
        "category_slug": "12-sinif",
        "tags": ["12. Sınıf Fizik", "AYT Fizik", "Dalga Mekaniği", "Young Deneyi", "Kırınım ve Girişim", "Doppler Olayı", "20 Soruluk Test"]
    },
    {
        "grade_num": 12,
        "grade_str": "12. Sınıf",
        "subject": "Fizik",
        "topic": "Atom Fiziğine Giriş, Radyoaktivite ve Modern Fizik",
        "slug": "12-sinif-fizik-atom-fizigi-ve-modern-fizik-konu-anlatimi-20-soruluk-test",
        "title": "12. Sınıf AYT Fizik Atom Fiziği, Radyoaktivite ve Modern Fizik Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "12. sınıf Bohr atom modeli, fotoelektrik olay, Compton saçılması, de Broglie dalga boyu, radyoaktif bozunmalar (alfa, beta, gama), özel görelilik ve süperiletkenlik.",
        "category_slug": "12-sinif",
        "tags": ["12. Sınıf Fizik", "AYT Fizik", "Atom Fiziği", "Fotoelektrik Olay", "Compton Saçılması", "Radyoaktivite", "Modern Fizik", "20 Soruluk Test"]
    },
    {
        "grade_num": 12,
        "grade_str": "12. Sınıf",
        "subject": "Kimya",
        "topic": "Karbon Kimyası ve Hidrokarbonlar (Organik Kimya)",
        "slug": "12-sinif-kimya-karbon-kimyasi-ve-organik-bilesikler-konu-anlatimi-20-soruluk-test",
        "title": "12. Sınıf AYT Kimya Karbon Kimyası ve Hidrokarbonlar Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "12. sınıf karbonun hibritleşmesi (sp, sp², sp³), molekül geometrisi ve VSEPR; alkanlar, alkenler, alkinler (IUPAC adlandırma) ve aromatik hidrokarbonlar (benzen).",
        "category_slug": "12-sinif",
        "tags": ["12. Sınıf Kimya", "AYT Kimya", "Organik Kimya", "Hibritleşme", "Alkanlar Alkenler Alkinler", "Benzen", "20 Soruluk Test"]
    },
    {
        "grade_num": 12,
        "grade_str": "12. Sınıf",
        "subject": "Kimya",
        "topic": "Organik Fonksiyonel Gruplar ve Enerji Kaynakları",
        "slug": "12-sinif-kimya-organik-fonksiyonel-gruplar-ve-enerji-konu-anlatimi-20-soruluk-test",
        "title": "12. Sınıf AYT Kimya Organik Fonksiyonel Gruplar ve Enerji Kaynakları Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "12. sınıf alkoller, eterler, aldehitler, ketonlar, karboksilik asitler ve esterler; fosil yakıtlar, biyoetanol ve temiz yenilenebilir enerji kaynakları konu anlatımı.",
        "category_slug": "12-sinif",
        "tags": ["12. Sınıf Kimya", "AYT Kimya", "Fonksiyonel Gruplar", "Alkoller ve Eterler", "Aldehit ve Keton", "Karboksilik Asit", "20 Soruluk Test"]
    },
    {
        "grade_num": 12,
        "grade_str": "12. Sınıf",
        "subject": "Biyoloji",
        "topic": "Bitki Biyolojisi, Dokular ve Bitkilerde Üreme",
        "slug": "12-sinif-biyoloji-bitki-biyolojisi-ve-ureme-konu-anlatimi-20-soruluk-test",
        "title": "12. Sınıf AYT Biyoloji Bitki Biyolojisi ve Bitkilerde Üreme Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "12. sınıf bitkisel dokular (meristem, parankima, iletim doku ksilem-floem), su ve mineral taşınımı (kohezyon-gerilim), bitkisel hormonlar, çiçek yapısı ve döllenme.",
        "category_slug": "12-sinif",
        "tags": ["12. Sınıf Biyoloji", "AYT Biyoloji", "Bitki Biyolojisi", "Ksilem Floem", "Bitkisel Hormonlar", "Çiçek ve Tohum", "20 Soruluk Test"]
    },
    {
        "grade_num": 12,
        "grade_str": "12. Sınıf",
        "subject": "Biyoloji",
        "topic": "Canlılar ve Çevre (Adaptasyon ve Sürdürülebilirlik)",
        "slug": "12-sinif-biyoloji-canlilar-ve-cevre-adaptasyon-konu-anlatimi-20-soruluk-test",
        "title": "12. Sınıf AYT Biyoloji Canlılar ve Çevre (Adaptasyon ve Sürdürülebilirlik) Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "12. sınıf genetik varyasyon, mutasyonlar, doğal ve yapay seçilim, adaptasyon mekanizmaları, türleşme, ekolojik ayak izi ve çevresel sürdürülebilirlik konu anlatımı.",
        "category_slug": "12-sinif",
        "tags": ["12. Sınıf Biyoloji", "AYT Biyoloji", "Canlılar ve Çevre", "Doğal Seçilim", "Adaptasyon", "Ekolojik Ayak İzi", "20 Soruluk Test"]
    },
    {
        "grade_num": 12,
        "grade_str": "12. Sınıf",
        "subject": "Türk Dili ve Edebiyatı",
        "topic": "Cumhuriyet Dönemi Türk Edebiyatı ve Edebi Akımlar",
        "slug": "12-sinif-turk-dili-ve-edebiyati-cumhuriyet-donemi-edebiyati-konu-anlatimi-20-soruluk-test",
        "title": "12. Sınıf Türk Dili ve Edebiyatı Cumhuriyet Dönemi Edebiyatı Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "12. sınıf Saf (Öz) Şiir, Toplumcu Gerçekçiler, Garip Akımı (1. Yeni), İkinci Yeni şiiri; Cumhuriyet romanı (Milli duyarlık, bireyin iç dünyası, modernizm) ve edebi akımlar.",
        "category_slug": "12-sinif",
        "tags": ["12. Sınıf Edebiyat", "AYT Edebiyat", "Cumhuriyet Şiiri", "İkinci Yeni", "Toplumcu Gerçekçiler", "Edebi Akımlar", "20 Soruluk Test"]
    },
    {
        "grade_num": 12,
        "grade_str": "12. Sınıf",
        "subject": "Tarih",
        "topic": "Kurtuluş Savaşı Muharebeleri ve Çağdaş Dünya Tarihi",
        "slug": "12-sinif-tarih-kurtulus-savasi-ve-cagdas-turk-dunya-tarihi-konu-anlatimi-20-soruluk-test",
        "title": "12. Sınıf Tarih Kurtuluş Savaşı Muharebeleri ve Çağdaş Dünya Tarihi Konu Anlatımı, 20 Soruluk Test",
        "excerpt": "12. sınıf İnönü Savaşları, Sakarya Meydan Muharebesi, Büyük Taarruz, Mudanya ve Lozan Barış Antlaşması; Atatürk dönemi dış politikası, 2. Dünya Savaşı ve Soğuk Savaş dönemi.",
        "category_slug": "12-sinif",
        "tags": ["12. Sınıf Tarih", "AYT Tarih", "Kurtuluş Savaşı", "Sakarya Meydan Muharebesi", "Lozan Barış Antlaşması", "Çağdaş Dünya Tarihi", "20 Soruluk Test"]
    }
]
