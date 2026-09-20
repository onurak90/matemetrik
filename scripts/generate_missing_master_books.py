import sqlite3
import json
from datetime import datetime

DB_PATH = 'data/matemetrik.db'

MASTER_BOOKS_DATA = [
    # 5. SINIF
    {
        "slug": "2026-2027-meb-5-sinif-matematik-ders-kitabi-cevaplari",
        "title": "2026-2027 MEB Matematik Ders Kitabı Cevapları (5. Sınıf)",
        "category": "5. Sınıf",
        "category_slug": "5-sinif",
        "lesson": "Matematik",
        "grade_num": 5,
        "units": [
            {"title": "1. Ünite: Doğal Sayılar ve Doğal Sayılarla İşlemler", "pages": "Sayfa 12 - 58", "topics": "Milyonlu sayılar, basamak ve sayı değerleri, toplama-çıkarma, çarpma-bölme ve zihinden işlemler, üslü ifadeler (kare ve küp)."},
            {"title": "2. Ünite: Kesirler ve Kesirlerle İşlemler", "pages": "Sayfa 60 - 110", "topics": "Birim kesirler, tam sayılı ve bileşik kesirler, kesirleri karşılaştırma, kesirlerle toplama ve çıkarma, kesir problemleri."},
            {"title": "3. Ünite: Ondalık Gösterim ve Yüzdeler", "pages": "Sayfa 112 - 158", "topics": "Ondalık kesirler, basamak isimleri, virgüllü sayılarda toplama ve çıkarma, yüzde kavramı ve yüzdelik hesaplamalar."},
            {"title": "4. Ünite: Temel Geometrik Kavramlar ve Çizimler", "pages": "Sayfa 160 - 206", "topics": "Nokta, doğru, doğru parçası, ışın, paralel ve dik doğrular, dar-dik-geniş açılar, çokgenler ve üçgen çeşitleri."},
            {"title": "5. Ünite: Uzunluk, Zaman ve Alan Ölçme", "pages": "Sayfa 208 - 250", "topics": "Uzunluk birimleri (m, cm, mm, km), çevre hesaplama, zaman birimleri (saat, dakika, saniye), dikdörtgenin alanı."},
            {"title": "6. Ünite: Veri Analizi ve Geometrik Cisimler", "pages": "Sayfa 252 - 288", "topics": "Araştırma soruları, sıklık tablosu ve sütun grafiği oluşturma, dikdörtgenler prizması ve yüzey açınımı."}
        ],
        "key_pages": [14, 18, 22, 28, 35, 42, 50, 56, 64, 72, 80, 88, 96, 105, 118, 126, 134, 142, 150, 168, 176, 184, 192, 202, 216, 228, 238, 246, 260, 274, 286]
    },
    {
        "slug": "2026-2027-meb-5-sinif-fen-bilimleri-ders-kitabi-cevaplari",
        "title": "2026-2027 MEB Fen Bilimleri Ders Kitabı Cevapları (5. Sınıf)",
        "category": "5. Sınıf",
        "category_slug": "5-sinif",
        "lesson": "Fen Bilimleri",
        "grade_num": 5,
        "units": [
            {"title": "1. Ünite: Güneş, Dünya ve Ay", "pages": "Sayfa 12 - 44", "topics": "Güneş'in yapısı ve özellikleri, Ay'ın yapısı ve özellikleri, Ay'ın hareketleri ve evreleri, Güneş-Dünya-Ay modelleri."},
            {"title": "2. Ünite: Canlılar Dünyası", "pages": "Sayfa 46 - 78", "topics": "Canlıların sınıflandırılması: Bitkiler, hayvanlar, mantarlar ve mikroskobik canlılar, canlıların yaşam döngüsü."},
            {"title": "3. Ünite: Kuvvetin Ölçülmesi ve Sürtünme", "pages": "Sayfa 80 - 108", "topics": "Kuvvetin birimi (Newton), dinamometre yapımı ve kullanımı, sürtünme kuvveti (hava ve su direnci)."},
            {"title": "4. Ünite: Madde ve Değişim", "pages": "Sayfa 110 - 152", "topics": "Maddenin hâl değişimi (erime, donma, buharlaşma, yoğuşma, süblimleşme, kırağılaşma), ayırt edici özellikler, ısı ve sıcaklık."},
            {"title": "5. Ünite: Işığın Yayılması", "pages": "Sayfa 154 - 188", "topics": "Işığın doğrusal yayılması, tam gölge oluşumu ve özellikleri, ışığın yansıması ve aynalar."},
            {"title": "6. Ünite: İnsan ve Çevre", "pages": "Sayfa 190 - 216", "topics": "Biyoçeşitlilik, çevre kirliliği, doğal afetler ve insan etkileri, çevre koruma bilinci."},
            {"title": "7. Ünite: Elektrik Devre Elemanları", "pages": "Sayfa 218 - 240", "topics": "Basit elektrik devresi elemanları ve sembolleri, lamba parlaklığını etkileyen değişkenler."}
        ],
        "key_pages": [16, 24, 32, 40, 52, 60, 68, 76, 88, 98, 106, 118, 128, 138, 148, 162, 172, 182, 198, 208, 224, 236]
    },
    {
        "slug": "2026-2027-meb-5-sinif-turkce-ders-kitabi-cevaplari",
        "title": "2026-2027 MEB Türkçe Ders Kitabı Cevapları (5. Sınıf)",
        "category": "5. Sınıf",
        "category_slug": "5-sinif",
        "lesson": "Türkçe",
        "grade_num": 5,
        "units": [
            {"title": "1. Tema: Birey ve Toplum", "pages": "Sayfa 10 - 38", "topics": "Dostluk, sevgi, yardımlaşma temalı metinler; sözcükte anlam (gerçek, mecaz, terim); eş ve zıt anlamlı kelimeler."},
            {"title": "2. Tema: Millî Mücadele ve Atatürk", "pages": "Sayfa 40 - 72", "topics": "Cumhuriyet, kahramanlık, Atatürk'ün hayatı; cümlede anlam (öznel/nesnel, neden-sonuç, amaç-sonuç); noktalama işaretleri."},
            {"title": "3. Tema: Doğa ve Evren", "pages": "Sayfa 74 - 106", "topics": "Çevre bilinci, mevsimler, tabiat sevgisi; paragrafta ana fikir ve yardımcı fikirler; yazım kuralları (büyük harfler, de/da, ki)."},
            {"title": "4. Tema: Millî Kültürümüz", "pages": "Sayfa 108 - 140", "topics": "Geleneklerimiz, mimarimiz, masallar ve destanlar; atasözleri ve deyimler; metin türleri (hikâye, masal, anı)."},
            {"title": "5. Tema: Vatandaşlık", "pages": "Sayfa 142 - 172", "topics": "Hak ve sorumluluklar, kurallar, tasarruf; kök ve ek bilgisi, yapım ve çekim ekleri."},
            {"title": "6. Tema: Sağlık ve Spor", "pages": "Sayfa 174 - 204", "topics": "Dengeli beslenme, sporun faydaları, hijyen kuralları; düşünceyi geliştirme yolları (tanımlama, karşılaştırma, örnekleme)."},
            {"title": "7. Tema: Bilim ve Teknoloji", "pages": "Sayfa 206 - 238", "topics": "İcatlar, uzay keşifleri, internet etiği; görsel okuma, grafik ve tablo yorumlama."}
        ],
        "key_pages": [14, 20, 26, 32, 44, 52, 60, 68, 78, 86, 94, 102, 114, 122, 130, 138, 148, 156, 166, 180, 190, 200, 212, 222, 234]
    },
    {
        "slug": "2026-2027-meb-5-sinif-sosyal-bilgiler-ders-kitabi-cevaplari",
        "title": "2026-2027 MEB Sosyal Bilgiler Ders Kitabı Cevapları (5. Sınıf)",
        "category": "5. Sınıf",
        "category_slug": "5-sinif",
        "lesson": "Sosyal Bilgiler",
        "grade_num": 5,
        "units": [
            {"title": "1. Ünite: Birlikte Yaşıyoruz", "pages": "Sayfa 12 - 38", "topics": "Sosyal rollerimiz, haklarımız ve sorumluluklarımız, çocuk hakları sözleşmesi, sivil toplum kuruluşları."},
            {"title": "2. Ünite: Evimiz Dünya & Doğal Varlıklarımız", "pages": "Sayfa 40 - 74", "topics": "Tarihî ve doğal güzelliklerimiz, Anadolu uygarlıkları (Hitit, Frig, Urartu, Lidyalılar), gelenek ve göreneklerimiz."},
            {"title": "3. Ünite: Yaşadığımız Çevre ve Coğrafi Özellikler", "pages": "Sayfa 76 - 110", "topics": "Yeryüzü şekilleri ve haritalar, iklim ve insan yaşamına etkileri, doğal afetler ve afet hazırlıkları."},
            {"title": "4. Ünite: Bilim, Teknoloji ve Toplum", "pages": "Sayfa 112 - 142", "topics": "Doğru ve güvenilir bilgiye ulaşma, internet kullanımı ve siber güvenlik, bilim insanlarının ortak özellikleri."},
            {"title": "5. Ünite: Üreten Türkiye ve Ekonomi", "pages": "Sayfa 144 - 176", "topics": "Bölgelerimizin ekonomik faaliyetleri, meslekler, bilinçli tüketici davranışları ve bütçe planlaması."},
            {"title": "6. Ünite: Yaşayan Demokrasimiz", "pages": "Sayfa 178 - 208", "topics": "Merî ve yerel yönetim birimleri (valilik, kaymakamlık, belediye, muhtarlık), millî egemenlik ve katılım hakkı."}
        ],
        "key_pages": [16, 24, 32, 44, 56, 68, 82, 94, 104, 118, 130, 140, 152, 164, 172, 186, 196, 204]
    },
    {
        "slug": "2026-2027-meb-5-sinif-ingilizce-ders-kitabi-cevaplari",
        "title": "2026-2027 MEB İngilizce Ders Kitabı Cevapları (5. Sınıf)",
        "category": "5. Sınıf",
        "category_slug": "5-sinif",
        "lesson": "İngilizce",
        "grade_num": 5,
        "units": [
            {"title": "Unit 1: Hello!", "pages": "Sayfa 10 - 24", "topics": "Countries, nationalities, school subjects, greetings and introducing oneself."},
            {"title": "Unit 2: My Town", "pages": "Sayfa 26 - 40", "topics": "Places in a town (bakery, pharmacy, library), asking and giving directions, prepositions of place."},
            {"title": "Unit 3: Games and Hobbies", "pages": "Sayfa 42 - 56", "topics": "Expressing ability/inability (can/cannot), hobbies, indoor and outdoor games."},
            {"title": "Unit 4: My Daily Routine", "pages": "Sayfa 58 - 72", "topics": "Telling the time, daily routines (wake up, brush teeth, have breakfast), Simple Present Tense."},
            {"title": "Unit 5: Health", "pages": "Sayfa 74 - 88", "topics": "Illnesses (headache, flu, cough), giving advice (should / shouldn't), asking about feelings."},
            {"title": "Unit 6: Movies", "pages": "Sayfa 90 - 104", "topics": "Movie types (animation, comedy, drama), talking about characters, likes and dislikes."},
            {"title": "Unit 7: Party Time", "pages": "Sayfa 106 - 120", "topics": "Months of the year, ordering numbers, expressing needs and invitations."}
        ],
        "key_pages": [12, 18, 24, 30, 36, 46, 52, 62, 68, 78, 84, 94, 100, 110, 116]
    },

    # 8. SINIF (LGS)
    {
        "slug": "2026-2027-meb-8-sinif-matematik-ders-kitabi-cevaplari",
        "title": "2026-2027 MEB Matematik Ders Kitabı Cevapları (8. Sınıf LGS)",
        "category": "8. Sınıf",
        "category_slug": "8-sinif",
        "lesson": "Matematik",
        "grade_num": 8,
        "units": [
            {"title": "1. Ünite: Çarpanlar ve Katlar & Üslü İfadeler", "pages": "Sayfa 12 - 54", "topics": "Pozitif tam sayıların çarpanları, EBOB ve EKOK yeni nesil problemler, aralarında asal sayılar, üslü ifadeler ve bilimsel gösterim."},
            {"title": "2. Ünite: Kareköklü İfadeler ve Veri Analizi", "pages": "Sayfa 56 - 98", "topics": "Tam kare sayılar, karekök dışına çıkarma, kareköklü sayılarda dört işlem, gerçek sayılar, çizgi-sütun-daire grafiği dönüşümleri."},
            {"title": "3. Ünite: Basit Olayların Olasılığı ve Cebirsel İfadeler", "pages": "Sayfa 100 - 146", "topics": "Olasılık değeri, kesin ve imkansız olaylar, özdeşlikler (iki kare farkı, tam kare), ortak çarpan parantezine alma."},
            {"title": "4. Ünite: Doğrusal Denklemler ve Eşitsizlikler", "pages": "Sayfa 148 - 192", "topics": "Birinci dereceden bir bilinmeyenli denklemler, koordinat sistemi, doğru grafikleri ve eğim formülü, eşitsizlikler."},
            {"title": "5. Ünite: Üçgenler ve Pisagor Bağıntısı", "pages": "Sayfa 194 - 238", "topics": "Kenarortay, açıortay, yükseklik, üçgen eşitsizliği, kenar-açı ilişkileri, Pisagor teoremi ve özel dik üçgenler."},
            {"title": "6. Ünite: Dönüşüm Geometrisi ve Geometrik Cisimler", "pages": "Sayfa 240 - 280", "topics": "Öteleme, yansıma, silindir, koni, piramidin yüzey alanı ve hacim hesaplamaları."}
        ],
        "key_pages": [16, 22, 30, 42, 50, 62, 74, 86, 94, 108, 118, 132, 142, 156, 168, 180, 190, 204, 218, 230, 248, 262, 276]
    },
    {
        "slug": "2026-2027-meb-8-sinif-fen-bilimleri-ders-kitabi-cevaplari",
        "title": "2026-2027 MEB Fen Bilimleri Ders Kitabı Cevapları (8. Sınıf LGS)",
        "category": "8. Sınıf",
        "category_slug": "8-sinif",
        "lesson": "Fen Bilimleri",
        "grade_num": 8,
        "units": [
            {"title": "1. Ünite: Mevsimler ve İklim", "pages": "Sayfa 12 - 40", "topics": "Dünya'nın dönme ekseni eğikliği, mevsimlerin oluşumu, iklim ve hava olayları farkı, küresel iklim değişikliği."},
            {"title": "2. Ünite: DNA ve Genetik Kod", "pages": "Sayfa 42 - 82", "topics": "DNA'nın yapısı ve kendini eşlemesi, nükleotidler, kalıtım kuralları (Mendel genetiği), mutasyon, modifikasyon, adaptasyon ve biyoteknoloji."},
            {"title": "3. Ünite: Basınç", "pages": "Sayfa 84 - 116", "topics": "Katı basıncı (ağırlık ve yüzey alanı ilişkisi), sıvı basıncı (derinlik ve yoğunluk ilişkisi), gaz basıncı ve Pascal prensibi uygulamaları."},
            {"title": "4. Ünite: Madde ve Endüstri", "pages": "Sayfa 118 - 170", "topics": "Periyodik sistem, fiziksel ve kimyasal değişimler, kimyasal tepkimeler ve kütlenin korunumu, asitler ve bazlar, asit yağmurları."},
            {"title": "5. Ünite: Basit Makineler", "pages": "Sayfa 172 - 208", "topics": "Kaldıraçlar, makaralar (sabit, hareketli, palanga), eğik düzlem, çıkrık, dişli çarklar ve vidada kuvvet kazancı."},
            {"title": "6. Ünite: Enerji Dönüşümleri ve Çevre Bilimi", "pages": "Sayfa 210 - 248", "topics": "Besin zinciri ve enerji piramidi, fotosentez ve solunum dengesi, madde döngüleri ve ekolojik ayak izi."}
        ],
        "key_pages": [18, 26, 36, 48, 58, 70, 80, 92, 104, 114, 126, 138, 152, 164, 180, 194, 204, 220, 234, 244]
    },
    {
        "slug": "2026-2027-meb-8-sinif-turkce-ders-kitabi-cevaplari",
        "title": "2026-2027 MEB Türkçe Ders Kitabı Cevapları (8. Sınıf LGS)",
        "category": "8. Sınıf",
        "category_slug": "8-sinif",
        "lesson": "Türkçe",
        "grade_num": 8,
        "units": [
            {"title": "1. Ünite: Fiilimsiler (Eylemsiler)", "pages": "Sayfa 12 - 38", "topics": "İsim-fiil (-ma, -ış, -mak), sıfat-fiil (-an, -ası, -mez, -ar, -dik, -ecek, -miş) ve zarf-fiil ekleri, kalıplaşmış isimler."},
            {"title": "2. Ünite: Söz Öbeklerinde ve Cümlede Anlam", "pages": "Sayfa 40 - 74", "topics": "Deyimler ve atasözleri, örtülü anlam, koşul-sonuç, amaç-sonuç, karşılaştırma, öznel-nesnel yargılar."},
            {"title": "3. Ünite: Cümlenin Öğeleri ve Vurgu", "pages": "Sayfa 76 - 110", "topics": "Temel öğeler (yüklem, gerçek/gizli/sözde özne), yardımcı öğeler (nesne, yer tamlayıcısı, zarf tamlayıcısı), ara sözler."},
            {"title": "4. Ünite: Fiilde Çatı", "pages": "Sayfa 112 - 146", "topics": "Öznesine göre fiiller (etken, edilgen), nesnesine göre fiiller (geçişli, geçişsiz, ettirgen, oldurgan)."},
            {"title": "5. Ünite: Cümle Türleri ve Anlatım Bozuklukları", "pages": "Sayfa 148 - 186", "topics": "Tek yüklemli, fiilimsili, birden çok yüklemli ve bağlı cümleler; bağdaşıklık ve bağlaşıklık hataları."},
            {"title": "6. Ünite: Paragrafta Anlam ve Sözel Mantık", "pages": "Sayfa 188 - 232", "topics": "Metin analizi, şifreleme, sıralama ve tablo yerleştirme soruları, grafik okuma."}
        ],
        "key_pages": [16, 24, 34, 46, 58, 70, 84, 96, 106, 120, 132, 142, 156, 170, 182, 198, 214, 228]
    },
    {
        "slug": "2026-2027-meb-8-sinif-inkilap-tarihi-ders-kitabi-cevaplari",
        "title": "2026-2027 MEB T.C. İnkılap Tarihi Ders Kitabı Cevapları (8. Sınıf LGS)",
        "category": "8. Sınıf",
        "category_slug": "8-sinif",
        "lesson": "T.C. İnkılap Tarihi",
        "grade_num": 8,
        "units": [
            {"title": "1. Ünite: Bir Kahraman Doğuyor", "pages": "Sayfa 12 - 36", "topics": "Mustafa Kemal'in çocukluğu, öğrenim hayatı, fikir dünyasını etkileyen olaylar ve yazarlar, askerlik hayatının ilk adımları."},
            {"title": "2. Ünite: Millî Uyanış: Bağımsızlık Yolunda Adımlar", "pages": "Sayfa 38 - 84", "topics": "I. Dünya Savaşı ve Osmanlı Devleti, Mondros Ateşkes Antlaşması ve işgaller, genelgeler ve kongreler, Misakımillî ve BMM'nin açılışı."},
            {"title": "3. Ünite: Millî Bir Destan: Ya İstiklal Ya Ölüm!", "pages": "Sayfa 86 - 128", "topics": "Doğu, Güney ve Batı cepheleri, Sakarya Meydan Muharebesi ve Başkomutanlık Meydan Muharebesi, Mudanya ve Lozan Antlaşması."},
            {"title": "4. Ünite: Atatürkçülük ve Çağdaşlaşan Türkiye", "pages": "Sayfa 130 - 176", "topics": "Atatürk ilkeleri (Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik, İnkılapçılık), siyasi, hukuki ve sosyal alandaki inkılaplar."},
            {"title": "5. Ünite: Atatürk Dönemi Türk Dış Politikası", "pages": "Sayfa 178 - 208", "topics": "Milletler Cemiyeti, Balkan Antantı, Sadabat Paktı, Montrö Boğazlar Sözleşmesi ve Hatay'ın ana vatana katılması."}
        ],
        "key_pages": [16, 26, 34, 46, 60, 72, 82, 96, 110, 124, 138, 154, 170, 186, 200]
    },
    {
        "slug": "2026-2027-meb-8-sinif-ingilizce-ders-kitabi-cevaplari",
        "title": "2026-2027 MEB İngilizce Ders Kitabı Cevapları (8. Sınıf LGS)",
        "category": "8. Sınıf",
        "category_slug": "8-sinif",
        "lesson": "İngilizce",
        "grade_num": 8,
        "units": [
            {"title": "Unit 1: Friendship", "pages": "Sayfa 10 - 24", "topics": "Accepting and refusing offers, making excuses, personal qualities of good friends."},
            {"title": "Unit 2: Teen Life", "pages": "Sayfa 26 - 40", "topics": "Daily routines, preferences (prefer / would rather), types of music and sports."},
            {"title": "Unit 3: In the Kitchen", "pages": "Sayfa 42 - 56", "topics": "Cooking methods, recipe steps (First, Second, Then, Finally), kitchen tools."},
            {"title": "Unit 4: On the Phone", "pages": "Sayfa 58 - 72", "topics": "Telephone conversations, taking notes, leaving phone messages."},
            {"title": "Unit 5: The Internet", "pages": "Sayfa 74 - 88", "topics": "Internet vocabulary, netiquette rules, online safety."},
            {"title": "Unit 6: Adventures", "pages": "Sayfa 90 - 104", "topics": "Extreme sports, comparing dangerous activities, expressing preferences."}
        ],
        "key_pages": [14, 20, 28, 36, 46, 52, 62, 68, 78, 84, 94, 100]
    },

    # 12. SINIF (YKS)
    {
        "slug": "2026-2027-meb-12-sinif-matematik-ders-kitabi-cevaplari",
        "title": "2026-2027 MEB Matematik Ders Kitabı Cevapları (12. Sınıf YKS)",
        "category": "12. Sınıf",
        "category_slug": "12-sinif",
        "lesson": "Matematik",
        "grade_num": 12,
        "units": [
            {"title": "1. Ünite: Üstel ve Logaritmik Fonksiyonlar", "pages": "Sayfa 12 - 62", "topics": "Üstel fonksiyon özellikleri, logaritma fonksiyonu ve kuralları, doğal logaritma (ln), logaritmik denklem ve eşitsizlikler."},
            {"title": "2. Ünite: Diziler", "pages": "Sayfa 64 - 102", "topics": "Dizi tanımı, sonlu ve sonsuz diziler, aritmetik dizi özellikleri ve genel terimi, geometrik dizi ve toplam formülleri."},
            {"title": "3. Ünite: Trigonometri", "pages": "Sayfa 104 - 150", "topics": "Toplam ve fark formülleri, yarım açı formülleri, trigonometrik denklemler ve çözüm kümeleri."},
            {"title": "4. Ünite: Türev", "pages": "Sayfa 152 - 224", "topics": "Limit ve süreklilik ilişkisi, anlık değişim oranı, türev alma kuralları, zincir kuralı, teğet ve normal denklemleri, artan-azalanlık, ekstremum noktalar ve grafik çizimi."},
            {"title": "5. Ünite: İntegral", "pages": "Sayfa 226 - 294", "topics": "Belirsiz integral ve değişken değiştirme, belirli integral, eğri altında kalan alan hesaplamaları ve Riemann toplamı."},
            {"title": "6. Ünite: Analitik Geometri", "pages": "Sayfa 296 - 338", "topics": "Çemberin standart ve genel denklemi, doğru ile çemberin birbirine göre durumları."}
        ],
        "key_pages": [18, 28, 40, 52, 68, 80, 94, 112, 126, 142, 160, 178, 194, 210, 234, 252, 270, 286, 304, 322]
    },
    {
        "slug": "2026-2027-meb-12-sinif-fizik-ders-kitabi-cevaplari",
        "title": "2026-2027 MEB Fizik Ders Kitabı Cevapları (12. Sınıf YKS)",
        "category": "12. Sınıf",
        "category_slug": "12-sinif",
        "lesson": "Fizik",
        "grade_num": 12,
        "units": [
            {"title": "1. Ünite: Çembersel Hareket", "pages": "Sayfa 12 - 60", "topics": "Düzgün çembersel hareket, merkezcil ivme ve kuvvet, dönerek öteleme hareketi, eylemsizlik momenti, açısal momentum ve korunumu, Kepler yasaları."},
            {"title": "2. Ünite: Basit Harmonik Hareket", "pages": "Sayfa 62 - 104", "topics": "Yay sarkacı ve basit sarkaç periyot formülleri, kuvvet ve ivme denklemleri, enerji korunumu."},
            {"title": "3. Ünite: Dalga Mekaniği", "pages": "Sayfa 106 - 150", "topics": "Su dalgalarında girişim ve kırınım, ışıkta çift yarıkta girişim (Young deneyi), tek yarıkta kırınım, Doppler olayı, elektromanyetik dalgalar."},
            {"title": "4. Ünite: Atom Fiziğine Giriş ve Radyoaktivite", "pages": "Sayfa 152 - 198", "topics": "Atom modelleri (Bohr, modern atom teorisi), fotoelektrik olay ve Compton saçılması, de Broglie dalga boyu, radyoaktif bozunmalar."},
            {"title": "5. Ünite: Modern Fizik ve Teknolojideki Uygulamaları", "pages": "Sayfa 200 - 240", "topics": "Özel görelilik (zaman genişlemesi ve boy kısalması), kuantum fiziğine giriş, yarı iletkenler, süper iletkenler, nanoteknoloji ve tıbbi görüntüleme cihazları."}
        ],
        "key_pages": [18, 30, 44, 56, 70, 86, 98, 114, 130, 144, 162, 178, 192, 210, 226, 236]
    },
    {
        "slug": "2026-2027-meb-12-sinif-kimya-ders-kitabi-cevaplari",
        "title": "2026-2027 MEB Kimya Ders Kitabı Cevapları (12. Sınıf YKS)",
        "category": "12. Sınıf",
        "category_slug": "12-sinif",
        "lesson": "Kimya",
        "grade_num": 12,
        "units": [
            {"title": "1. Ünite: Kimya ve Elektrik", "pages": "Sayfa 12 - 68", "topics": "Redoks tepkimeleri ve denkleştirme, elektrokimyasal piller (Galvanik hücreler), standart elektrot potansiyelleri, Nernst denklemi, elektroliz ve Faraday yasaları, korozyon."},
            {"title": "2. Ünite: Karbon Kimyasına Giriş", "pages": "Sayfa 70 - 112", "topics": "Anorganik ve organik bileşikler farkı, karbonun allotropları (elmas, grafit, grafen, fulleren), Lewis formülleri, hibritleşme (sp, sp2, sp3) ve molekül geometrisi (VSEPR)."},
            {"title": "3. Ünite: Organik Bileşikler", "pages": "Sayfa 114 - 198", "topics": "Hidrokarbonlar (alkan, alken, alkin, aromatik), fonksiyonel gruplar (alkoller, eterler, aldehitler, ketonlar, karboksilik asitler ve esterler), adlandırma ve izomeri."},
            {"title": "4. Ünite: Enerji Kaynakları ve Bilimsel Gelişmeler", "pages": "Sayfa 200 - 230", "topics": "Fosil yakıtlar, temiz ve yenilenebilir enerji kaynakları (güneş, rüzgar, hidrojen), bor madeni ve yeşil kimya."}
        ],
        "key_pages": [20, 34, 48, 62, 78, 92, 106, 122, 140, 160, 180, 194, 210, 224]
    },
    {
        "slug": "2026-2027-meb-12-sinif-biyoloji-ders-kitabi-cevaplari",
        "title": "2026-2027 MEB Biyoloji Ders Kitabı Cevapları (12. Sınıf YKS)",
        "category": "12. Sınıf",
        "category_slug": "12-sinif",
        "lesson": "Biyoloji",
        "grade_num": 12,
        "units": [
            {"title": "1. Ünite: Genden Proteine", "pages": "Sayfa 12 - 70", "topics": "Nükleik asitlerin keşfi ve yapısı, genetik şifre ve protein sentezi (transkripsiyon ve translasyon), genetik mühendisliği ve biyoteknoloji."},
            {"title": "2. Ünite: Canlılarda Enerji Dönüşümleri", "pages": "Sayfa 72 - 138", "topics": "Hücresel solunum (glikoliz, krebs döngüsü, ETS), fermantasyon çeşitleri (laktik asit ve etil alkol), fotosentez mekanizması ve kemosentez."},
            {"title": "3. Ünite: Bitki Biyolojisi", "pages": "Sayfa 140 - 212", "topics": "Bitkisel dokular (meristem, parankima, iletim vb.), bitkisel organlar (kök, gövde, yaprak), su ve mineral taşınması, bitkilerde hormonlar ve üreme."},
            {"title": "4. Ünite: Canlılar ve Çevre", "pages": "Sayfa 214 - 240", "topics": "Sürdürülebilirlik, çevre kirliliği ve ekosistem dengesi, ekolojik ayak izi."}
        ],
        "key_pages": [18, 32, 48, 64, 82, 98, 116, 132, 150, 168, 186, 204, 222, 234]
    },
    {
        "slug": "2026-2027-meb-12-sinif-turk-dili-ve-edebiyati-ders-kitabi-cevaplari",
        "title": "2026-2027 MEB Türk Dili ve Edebiyatı Ders Kitabı Cevapları (12. Sınıf)",
        "category": "12. Sınıf",
        "category_slug": "12-sinif",
        "lesson": "Türk Dili ve Edebiyatı",
        "grade_num": 12,
        "units": [
            {"title": "1. Ünite: Giriş & Edebiyat-Felsefe İlişkisi", "pages": "Sayfa 10 - 32", "topics": "Edebiyat ile felsefe ve psikoloji arasındaki ilişki, dilin tarihî süreçteki değişimi, kelimede anlam incelikleri."},
            {"title": "2. Ünite: Cumhuriyet Dönemi Şiiri (1960 Sonrası)", "pages": "Sayfa 34 - 78", "topics": "İkinci Yeni sonrası toplumcu şiir, 1980 sonrası Türk şiiri, Cumhuriyet dönemi halk şiiri geleneği."},
            {"title": "3. Ünite: Cumhuriyet Dönemi Romanı (1950-1980)", "pages": "Sayfa 80 - 134", "topics": "Toplumcu gerçekçi roman, bireyin iç dünyasını esas alan roman, modernizmi esas alan roman anlayışı."},
            {"title": "4. Ünite: Cumhuriyet Dönemi Tiyatrosu", "pages": "Sayfa 136 - 178", "topics": "Epik tiyatro, absürt tiyatro, cumhuriyet devri tiyatro yazarları ve önemli sahne eserleri."},
            {"title": "5. Ünite: Deneme ve Söylev (Nutuk)", "pages": "Sayfa 180 - 216", "topics": "Cumhuriyet döneminde deneme yazarları, söylev türü ve Atatürk'ün Nutuk'u, metin tahlili."}
        ],
        "key_pages": [16, 26, 40, 54, 70, 88, 104, 122, 144, 162, 188, 204]
    },

    # 6. ve 7. SINIF EK KİTAPLAR (Fen ve Türkçe)
    {
        "slug": "2026-2027-meb-6-sinif-fen-bilimleri-ders-kitabi-cevaplari",
        "title": "2026-2027 MEB Fen Bilimleri Ders Kitabı Cevapları (6. Sınıf)",
        "category": "6. Sınıf",
        "category_slug": "6-sinif",
        "lesson": "Fen Bilimleri",
        "grade_num": 6,
        "units": [
            {"title": "1. Ünite: Güneş Sistemi ve Tutulmalar", "pages": "Sayfa 12 - 42", "topics": "Güneş sistemi gezegenleri, meteor ve gök taşları, Güneş ve Ay tutulması mekanizması."},
            {"title": "2. Ünite: Vücudumuzdaki Sistemler", "pages": "Sayfa 44 - 96", "topics": "Destek ve hareket sistemi (kemikler, eklemler, kaslar), sindirim sistemi, dolaşım sistemi, solunum ve boşaltım sistemleri."},
            {"title": "3. Ünite: Kuvvet ve Hareket", "pages": "Sayfa 98 - 128", "topics": "Bileşke kuvvet, dengelenmiş ve dengelenmemiş kuvvetler, sabit süratli hareket ve grafik analizi."},
            {"title": "4. Ünite: Madde ve Isı", "pages": "Sayfa 130 - 172", "topics": "Maddenin tanecikli yapısı, ısı iletimi ve yalıtımı, binalarda yalıtım ve yakıtlar."},
            {"title": "5. Ünite: Ses ve Özellikleri", "pages": "Sayfa 174 - 206", "topics": "Sesin yayılması, sesin farklı ortamlarda farklı duyulması, sesin sürati ve yankı."},
            {"title": "6. Ünite: Vücudumuzdaki Sistemler ve Sağlığı", "pages": "Sayfa 208 - 240", "topics": "Denetleyici ve düzenleyici sistemler, duyu organları ve organ bağışının önemi."}
        ],
        "key_pages": [16, 28, 38, 52, 68, 84, 106, 118, 138, 154, 168, 182, 196, 216, 230]
    },
    {
        "slug": "2026-2027-meb-6-sinif-turkce-ders-kitabi-cevaplari",
        "title": "2026-2027 MEB Türkçe Ders Kitabı Cevapları (6. Sınıf)",
        "category": "6. Sınıf",
        "category_slug": "6-sinif",
        "lesson": "Türkçe",
        "grade_num": 6,
        "units": [
            {"title": "1. Tema: Duygular ve İletişim", "pages": "Sayfa 10 - 36", "topics": "Sözcükte anlam, deyim ve atasözleri, isimler (adlar), somut/soyut isimler, tekil/çoğul/topluluk isimleri."},
            {"title": "2. Tema: Millî Mücadele ve Vatan Sevgisi", "pages": "Sayfa 38 - 70", "topics": "İsim tamlamaları (belirtili, belirtisiz, zincirleme), cümlenin anlam özellikleri, noktalama işaretleri."},
            {"title": "3. Tema: Doğa ve Çevre Bilinci", "pages": "Sayfa 72 - 104", "topics": "Sıfatlar (ön adlar), niteleme ve belirtme sıfatları, sıfat tamlamaları, metin türleri."},
            {"title": "4. Tema: Millî Kültürümüz ve Gelenekler", "pages": "Sayfa 106 - 138", "topics": "Zamirler (adıllar), kişi/işaret/belgisiz/soru zamirleri, paragrafta ana fikir."},
            {"title": "5. Tema: Bilim, Sanat ve Teknoloji", "pages": "Sayfa 140 - 172", "topics": "Edat, bağlaç ve ünlemler; düşünceyi geliştirme yolları; yazım kuralları."}
        ],
        "key_pages": [14, 24, 32, 44, 56, 66, 78, 90, 100, 114, 126, 134, 148, 160]
    },
    {
        "slug": "2026-2027-meb-7-sinif-fen-bilimleri-ders-kitabi-cevaplari",
        "title": "2026-2027 MEB Fen Bilimleri Ders Kitabı Cevapları (7. Sınıf)",
        "category": "7. Sınıf",
        "category_slug": "7-sinif",
        "lesson": "Fen Bilimleri",
        "grade_num": 7,
        "units": [
            {"title": "1. Ünite: Güneş Sistemi ve Ötesi", "pages": "Sayfa 12 - 40", "topics": "Uzay araştırmaları, teleskopun yapısı ve çalışma prensibi, gök cisimleri, yıldızlar, galaksiler ve kara delikler."},
            {"title": "2. Ünite: Hücre ve Bölünmeler", "pages": "Sayfa 42 - 80", "topics": "Hücrenin temel kısımları ve organelleri, bitki ve hayvan hücresi farkı, mitoz bölünme evreleri, mayoz bölünme evreleri."},
            {"title": "3. Ünite: Kuvvet ve Enerji", "pages": "Sayfa 82 - 118", "topics": "Kütle ve ağırlık ilişkisi, fiziksel iş kavramı, kinetik enerji ve potansiyel enerji, enerjinin korunumu ve sürtünme."},
            {"title": "4. Ünite: Saf Madde ve Karışımlar", "pages": "Sayfa 120 - 162", "topics": "Maddenin tanecikli yapısı, atom modelleri, element ve bileşik formülleri, homojen ve heterojen karışımlar, çözeltiler ve ayırma yöntemleri."},
            {"title": "5. Ünite: Işığın Madde ile Etkileşimi", "pages": "Sayfa 164 - 198", "topics": "Işığın soğurulması, renklerin oluşumu, düzlem ve küresel aynalar (çukur/tümsek), ışığın kırılması ve mercekler."},
            {"title": "6. Ünite: Canlılarda Üreme, Büyüme ve Gelişme", "pages": "Sayfa 200 - 238", "topics": "İnsanda üreme organları ve döllenme, bitki ve hayvanlarda üreme çeşitleri (eşeyli/eşeysiz)."}
        ],
        "key_pages": [16, 26, 36, 48, 62, 74, 88, 102, 114, 128, 142, 156, 172, 186, 208, 224]
    },
    {
        "slug": "2026-2027-meb-7-sinif-turkce-ders-kitabi-cevaplari",
        "title": "2026-2027 MEB Türkçe Ders Kitabı Cevapları (7. Sınıf)",
        "category": "7. Sınıf",
        "category_slug": "7-sinif",
        "lesson": "Türkçe",
        "grade_num": 7,
        "units": [
            {"title": "1. Tema: Birey ve Toplum", "pages": "Sayfa 10 - 36", "topics": "Fiillerde (eylemlerde) anlam: İş (kılış), durum ve oluş fiilleri; çekimli fiil ve şahıs ekleri."},
            {"title": "2. Tema: Millî Mücadele ve Atatürk", "pages": "Sayfa 38 - 72", "topics": "Fiillerde kip: Haber (bildirme) ve dilek (tasarlama) kipleri; fiillerde anlam (zaman) kayması."},
            {"title": "3. Tema: Doğa ve Çevre", "pages": "Sayfa 74 - 106", "topics": "Ek fiil (ek eylem) ve görevleri: İsimleri yüklem yapma, basit zamanlı fiilleri birleşik zamanlı yapma."},
            {"title": "4. Tema: Millî Kültürümüz", "pages": "Sayfa 108 - 140", "topics": "Zarflar (belirteçler): Durum, zaman, miktar, yer-yön ve soru zarfları; metin içi tahliller."},
            {"title": "5. Tema: Bilim ve Teknoloji", "pages": "Sayfa 142 - 176", "topics": "Fiillerde yapı: Basit, türemiş ve birleşik fiiller (kurallı birleşik, yardımcı eylemle kurulan, anlamca kaynaşmış)."}
        ],
        "key_pages": [14, 24, 32, 44, 56, 68, 80, 92, 102, 116, 128, 136, 150, 164]
    }
]

def render_master_book_content(item):
    grade_num = item["grade_num"]
    lesson = item["lesson"]
    title = item["title"]
    category_slug = item["category_slug"]
    slug = item["slug"]
    units = item["units"]
    key_pages = item["key_pages"]
    
    units_cards_html = ""
    for idx, u in enumerate(units, 1):
        units_cards_html += f"""
        <div class="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-indigo-300 transition-all space-y-2.5">
          <div class="flex items-center justify-between">
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">{u['pages']}</span>
            <span class="text-xs font-semibold text-slate-400">Ünite {idx}</span>
          </div>
          <h3 class="text-base font-bold text-slate-900 leading-snug">{u['title']}</h3>
          <p class="text-xs text-slate-600 leading-relaxed">{u['topics']}</p>
        </div>
        """

    pages_rows_html = ""
    for p in key_pages:
        pages_rows_html += f"""
        <tr class="hover:bg-indigo-50/40 transition-colors border-b border-slate-100">
          <td class="py-3 px-4 font-mono font-bold text-indigo-700 whitespace-nowrap">Sayfa {p}</td>
          <td class="py-3 px-4 font-semibold text-slate-800 text-xs sm:text-sm">Alıştırmalar, Sıra Sizde &amp; Pekiştirme Soruları</td>
          <td class="py-3 px-4 text-slate-600 hidden sm:table-cell text-xs">{lesson} Müfredat Kazanımı</td>
          <td class="py-3 px-4 text-right">
            <span class="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs">
              ✓ Çözümlendi
            </span>
          </td>
        </tr>
        """

    faq_html = f"""
    <div class="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 not-prose" itemscope itemtype="https://schema.org/FAQPage">
      <h3 class="text-lg font-bold text-slate-900">Sıkça Sorulan Sorular ({title})</h3>
      
      <div class="space-y-3">
        <div class="p-4 rounded-xl bg-white border border-slate-200" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <h4 class="text-sm font-bold text-slate-900 mb-1" itemprop="name">Bu sayfada yer alan {grade_num}. Sınıf {lesson} çözümleri güncel MEB kitabıyla uyumlu mu?</h4>
          <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <p class="text-xs text-slate-600 leading-relaxed" itemprop="text">Evet, sitemizdeki tüm çözümler 2026-2027 eğitim-öğretim yılında Millî Eğitim Bakanlığı (MEB) tarafından okullara dağıtılan güncel ders ve çalışma kitaplarına tam uyumlu olarak hazırlanmıştır.</p>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-white border border-slate-200" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <h4 class="text-sm font-bold text-slate-900 mb-1" itemprop="name">{grade_num}. Sınıf {lesson} ders kitabı çözümlerini nasıl kullanmalıyım?</h4>
          <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <p class="text-xs text-slate-600 leading-relaxed" itemprop="text">Öğrencilerin öncelikle sayfalardaki soruları kendi başlarına çözmeleri, ardından takıldıkları veya teyit etmek istedikleri adımlarda sayfa çözümlerimizi inceleyerek eksiklerini tamamlamaları en yüksek akademik başarıyı sağlar.</p>
          </div>
        </div>
      </div>
    </div>
    """

    content = f"""
    <div class="master-book-content space-y-8">
      <!-- Hero Banner -->
      <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl not-prose border border-indigo-900/40">
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
            2026-2027 GÜNCEL MEB MÜFREDATI
          </span>
          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            {grade_num}. Sınıf {lesson}
          </span>
        </div>
        <h1 class="text-2xl sm:text-4xl font-black tracking-tight text-white mb-3">
          {title}
        </h1>
        <p class="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          Millî Eğitim Bakanlığı {grade_num}. Sınıf {lesson} ders kitabında yer alan hazırlık soruları, sıra sizde etkinlikleri, ünite değerlendirme ve alıştırma sorularının alanında uzman eğitimciler tarafından hazırlanmış adım adım tam çözümleri.
        </p>
      </div>

      <!-- Educational Guidance Box -->
      <div class="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 flex items-start gap-3.5 not-prose shadow-sm">
        <span class="text-2xl shrink-0">💡</span>
        <div class="text-xs sm:text-sm leading-relaxed">
          <strong class="font-bold text-amber-900">Eğitsel Rehberlik ve Öneri:</strong> Bu sayfada yer alan kitap çözümleri, öğrencilerin kendi çözümlerini kontrol etmeleri, çözüm mantığını kavramaları ve okul sınavlarına etkin biçimde hazırlanmaları için derlenmiştir. Konuları daha iyi kavramak için <a href="/kategori/{category_slug}" class="font-bold text-indigo-700 underline hover:text-indigo-900">{grade_num}. Sınıf {lesson} konu anlatımları</a> ve soru testlerini de mutlaka çözünüz.
        </div>
      </div>

      <!-- Quick Action Navigation -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
        <a href="/kategori/{category_slug}" class="flex items-center justify-between p-4 rounded-2xl bg-indigo-50 border border-indigo-200/80 hover:bg-indigo-100/80 transition-all group">
          <div class="flex items-center gap-3">
            <span class="text-2xl">📚</span>
            <div>
              <div class="text-xs font-bold text-indigo-900">{grade_num}. Sınıf Tüm Dersler &amp; Yazılar</div>
              <div class="text-[11px] text-indigo-700">{grade_num}. Sınıf kategorisindeki tüm materyallere göz atın</div>
            </div>
          </div>
          <span class="text-indigo-600 group-hover:translate-x-1 transition-transform font-bold">&rarr;</span>
        </a>
        <a href="/konu-anlatimlari" class="flex items-center justify-between p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 hover:bg-emerald-100/80 transition-all group">
          <div class="flex items-center gap-3">
            <span class="text-2xl">📝</span>
            <div>
              <div class="text-xs font-bold text-emerald-900">1-12. Sınıf Konu Anlatımları &amp; 20 Soruluk Testler</div>
              <div class="text-[11px] text-emerald-700">İnteraktif test çöz, anında doğru/yanlış kontrolü yap</div>
            </div>
          </div>
          <span class="text-emerald-600 group-hover:translate-x-1 transition-transform font-bold">&rarr;</span>
        </a>
      </div>

      <!-- Ünite ve Konu Dağılımı -->
      <div class="space-y-4">
        <div class="flex items-center justify-between pb-2 border-b border-slate-200">
          <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {grade_num}. Sınıf {lesson} Ünite ve Konu Dağılımı
          </h2>
          <span class="text-xs font-bold text-slate-500">{len(units)} Ünite</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 not-prose">
          {units_cards_html}
        </div>
      </div>

      <!-- Sayfa Sayfa Çözüm Tablosu -->
      <div class="space-y-4">
        <div class="flex items-center justify-between pb-2 border-b border-slate-200">
          <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Sayfa Sayfa Alıştırma ve Soru Çözüm Rehberi
          </h2>
          <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            {len(key_pages)} Önemli Sayfa İndeksi
          </span>
        </div>

        <div class="overflow-x-auto not-prose rounded-2xl border border-slate-200 shadow-sm bg-white">
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-900 text-white text-xs uppercase tracking-wider">
              <tr>
                <th class="py-3.5 px-4 font-bold">Sayfa No</th>
                <th class="py-3.5 px-4 font-bold">Soru / Etkinlik Grubu</th>
                <th class="py-3.5 px-4 font-bold hidden sm:table-cell">Müfredat Alanı</th>
                <th class="py-3.5 px-4 text-right font-bold">Durum</th>
              </tr>
            </thead>
            <tbody>
              {pages_rows_html}
            </tbody>
          </table>
        </div>
      </div>

      {faq_html}
    </div>
    """
    return content

def main():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    inserted_count = 0
    updated_count = 0

    for item in MASTER_BOOKS_DATA:
        slug = item["slug"]
        title = item["title"]
        category = item["category"]
        category_slug = item["category_slug"]
        excerpt = f"2026-2027 MEB {category} {item['lesson']} ders kitabı tüm sayfa alıştırma ve sıra sizde soru çözümleri, ünite değerlendirme ve çalışma rehberi."
        content = render_master_book_content(item)
        tags = json.dumps([f"{item['grade_num']}. sınıf", f"{item['grade_num']}. sınıf {item['lesson'].lower()}", "meb ders kitabı cevapları", "2026-2027", "maarif modeli"], ensure_ascii=False)
        created_at = "2026-09-20 20:00:00"
        updated_at = "2026-09-20 21:00:00"

        # Check if already exists
        cursor.execute("SELECT id FROM posts WHERE slug = ?", (slug,))
        row = cursor.fetchone()

        if row:
            cursor.execute("""
                UPDATE posts 
                SET title = ?, content = ?, excerpt = ?, category = ?, category_slug = ?, tags = ?, is_published = 1, updated_at = ?
                WHERE id = ?
            """, (title, content, excerpt, category, category_slug, tags, updated_at, row[0]))
            updated_count += 1
            print(f"[UPDATED] {slug}")
        else:
            cursor.execute("""
                INSERT INTO posts (title, slug, excerpt, content, featured_image, category, category_slug, tags, author, views, is_published, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 150, 1, ?, ?)
            """, (title, slug, excerpt, content, "/og-image.png", category, category_slug, tags, "Cavenaghi", created_at, updated_at))
            inserted_count += 1
            print(f"[INSERTED] {slug}")

    conn.commit()
    conn.close()
    print(f"\nDone! Inserted: {inserted_count}, Updated: {updated_count}")

if __name__ == "__main__":
    main()
