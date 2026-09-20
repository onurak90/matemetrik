# -*- coding: utf-8 -*-
"""
Authentic Full Curriculum Generator for Grades 1-12 across Matematik, Fen/Fizik/Kimya/Biyoloji, Türkçe, Hayat Bilgisi.
Each topic includes:
1. 📖 Uzun Uzun Konu Anlatımı (Textbook quality, conceptual foundations, subheadings, tips, common errors, 3-4 model examples)
2. 📝 20 Soruluk Özgün Test (100% authentic questions specific to the topic)
3. ✅ Test Cevapları (Adım adım detaylı çözümler)
4. 🎥 Video Çözüm (100% Türkçe MEB uyumlu eğitim videosu)
5. 📚 MEB Kitabı Çözümleri
6. 🔗 Benzer Konular
7. ❓ SSS + Schema.org FAQPage
"""

import sys
import os
import json
from datetime import datetime, timezone

sys.path.insert(0, ".")
from scripts.curriculum_gen.theory_generator import generate_deep_theory_html
from scripts.curriculum_gen.question_dispatcher import dispatch_questions
from scripts.curriculum_gen.video_map import get_video_info_for_slug

def get_full_curriculum_catalog():
    # Specifications for all 55 topics across grades 1-12
    specs = [
        # 1. Sınıf
        (1, "1. Sınıf", "Matematik", "Doğal Sayılar ve Toplama-Çıkarma İşlemleri", "1-sinif-matematik-dogal-sayilar-ve-toplama-cikarma-konu-anlatimi-20-soruluk-test", "1. sınıf doğal sayılar, 20'ye kadar sayma, onluk-birlik kavramı, eldeli olmayan toplama ve çıkarma konu anlatımı, 20 soruluk özgün test ve çözümleri."),
        (1, "1. Sınıf", "Türkçe", "Harfler, Heceler ve Okuma-Anlama (5N1K)", "1-sinif-turkce-harfler-heceler-ve-okuma-anlama-konu-anlatimi-20-soruluk-test", "1. sınıf ses bilgisi, harfler, ünlü-ünsüz harf ayrımı, doğru heceleme kuralları ve 5N1K okuduğunu anlama konu anlatımı ve 20 soruluk test."),
        (1, "1. Sınıf", "Hayat Bilgisi", "Okulumuzda Hayat ve Sağlıklı Yaşam", "1-sinif-hayat-bilgisi-okulumuzda-hayat-ve-saglikli-yasam-konu-anlatimi-20-soruluk-test", "1. sınıf okulumuzda hayat, sınıf kuralları, nezaket sözcükleri, kişisel bakım, sağlıklı beslenme ve trafik güvenliği konu anlatımı ve 20 soruluk test."),
        
        # 2. Sınıf
        (2, "2. Sınıf", "Matematik", "İki Basamaklı Doğal Sayılar ve Eldeli Toplama", "2-sinif-matematik-iki-basamakli-dogal-sayilar-ve-eldeli-toplama-konu-anlatimi-20-soruluk-test", "2. sınıf iki basamaklı sayılar, basamak değerleri, onluğa yuvarlama ve eldeli toplama-çıkarma konu anlatımı ve 20 soruluk çözümlü test."),
        (2, "2. Sınıf", "Matematik", "Çarpma ve Bölme İşlemine Giriş", "2-sinif-matematik-carpma-ve-bolme-islemine-giris-konu-anlatimi-20-soruluk-test", "2. sınıf çarpma işleminde kat anlamı, ritmik sayma, çarpım tablosu ve eşit paylaştırma yöntemiyle bölme konu anlatımı ve 20 soruluk test."),
        (2, "2. Sınıf", "Türkçe", "Eş Anlamlı ve Zıt Anlamlı Kelimeler", "2-sinif-turkce-es-ve-zit-anlamli-kelimeler-konu-anlatimi-20-soruluk-test", "2. sınıf eş anlamlı (anlamdaş) ve zıt (karşıt) anlamlı sözcükler, eş sesli kelimeler konu anlatımı, 20 soruluk tarama testi ve çözümleri."),
        
        # 3. Sınıf
        (3, "3. Sınıf", "Matematik", "Üç Basamaklı Sayılar, Çarpma ve Kalanlı Bölme", "3-sinif-matematik-uc-basamakli-sayilar-carpma-ve-kalanli-bolme-konu-anlatimi-20-soruluk-test", "3. sınıf basamak değeri çözümlemesi, üç basamaklı sayılarla çarpma ve kalanlı bölme işlem kuralları konu anlatımı ve 20 soruluk test."),
        (3, "3. Sınıf", "Matematik", "Kesirler (Birim Kesir ve Kesir Çeşitleri)", "3-sinif-matematik-kesirler-birim-kesir-ve-cesitleri-konu-anlatimi-20-soruluk-test", "3. sınıf kesir kavramı, birim kesirler, pay ve payda ilişkisi, basit kesirler konu anlatımı ve 20 soruluk adım adım çözümlü test."),
        (3, "3. Sınıf", "Fen Bilimleri", "Gezegenimizi Tanıyalım ve Beş Duyumuz", "3-sinif-fen-bilimleri-gezegenimizi-taniyalim-ve-bes-duyumuz-konu-anlatimi-20-soruluk-test", "3. sınıf Dünya'nın katmanları (yer kabuğu, manto, çekirdek), beş duyu organımız ve görevleri konu anlatımı ve 20 soruluk test."),
        
        # 4. Sınıf
        (4, "4. Sınıf", "Matematik", "Doğal Sayılarla Dört İşlem ve Zihinden İşlemler", "4-sinif-matematik-dogal-sayilarla-dort-islem-ve-zihinden-islemler-konu-anlatimi-20-soruluk-test", "4. sınıf 4, 5 ve 6 basamaklı sayılar, bölük kavramı, çarpma, bölme ve pratik zihinden işlem stratejileri konu anlatımı ve 20 soruluk test."),
        (4, "4. Sınıf", "Matematik", "Kesirlerle İşlemler ve Ondalık Gösterim", "4-sinif-matematik-kesirlerle-islemler-ve-ondalik-gosterim-konu-anlatimi-20-soruluk-test", "4. sınıf basit, bileşik ve tam sayılı kesirler, kesirlerle toplama-çıkarma ve virgüllü ondalık gösterim konu anlatımı ve 20 soruluk test."),
        (4, "4. Sınıf", "Fen Bilimleri", "Yer Kabuğu, Kayaçlar ve Besinlerimiz", "4-sinif-fen-bilimleri-yer-kabugu-kayaclar-ve-besinlerimiz-konu-anlatimi-20-soruluk-test", "4. sınıf fosiller, kayaçlar, madenler; karbonhidrat, protein, yağ, vitamin içeren besin grupları konu anlatımı ve 20 soruluk test."),
        
        # 5. Sınıf
        (5, "5. Sınıf", "Matematik", "Doğal Sayılarla İşlemler ve Üslü Sayılar", "5-sinif-matematik-dogal-sayilarla-islemler-ve-uslu-sayilar-konu-anlatimi-20-soruluk-test", "5. sınıf milyonlar basamağı, bir sayının karesi ve küpü, parantezli işlemler ve işlem önceliği konu anlatımı ve 20 soruluk test."),
        (5, "5. Sınıf", "Matematik", "Kesirler ve Kesirlerle Toplama Çıkarma", "5-sinif-matematik-kesirler-ve-kesirlerle-islemler-konu-anlatimi-20-soruluk-test", "5. sınıf denk kesirler, sadeleştirme, genişletme, payda eşitleyerek toplama ve çıkarma konu anlatımı ve 20 soruluk test."),
        (5, "5. Sınıf", "Fen Bilimleri", "Güneş, Dünya ve Ay & Canlılar Dünyası", "5-sinif-fen-bilimleri-gunes-dunya-ve-ay-canlilar-dunyasi-konu-anlatimi-20-soruluk-test", "5. sınıf Güneş ve Ay'ın yapısı, Ay'ın evreleri, mikroskobik canlılar, mantarlar, bitkiler ve hayvanlar konu anlatımı ve 20 soruluk test."),
        
        # 6. Sınıf
        (6, "6. Sınıf", "Matematik", "Kesirlerle İşlemler (Çarpma, Bölme ve Modelleme)", "6-sinif-matematik-kesirlerle-islemler-konu-anlatimi-20-soruluk-test", "6. sınıf kesirlerle çarpma ve bölme işlemleri, ters çevirip çarpma kuralı, modelleme, 20 soruluk yeni nesil MEB testi ve ayrıntılı çözümleri."),
        (6, "6. Sınıf", "Matematik", "Çarpanlar ve Katlar & Bölünebilme Kuralları", "6-sinif-matematik-carpanlar-ve-katlar-bolunebilme-kurallari-konu-anlatimi-20-soruluk-test", "6. sınıf 2, 3, 4, 5, 6, 9 ve 10 ile bölünebilme, asal sayılar ve çarpan ağacı konu anlatımı ve 20 soruluk test."),
        (6, "6. Sınıf", "Matematik", "Tam Sayılar ve Mutlak Değer", "6-sinif-matematik-tam-sayilar-ve-mutlak-deger-konu-anlatimi-20-soruluk-test", "6. sınıf negatif ve pozitif tam sayılar, yönlü sayılar, sayı doğrusunda sıralama ve mutlak değer konu anlatımı ve 20 soruluk test."),
        (6, "6. Sınıf", "Fen Bilimleri", "Güneş Sistemi, Tutulmalar ve Vücut Sistemleri", "6-sinif-fen-bilimleri-gunes-sistemi-tutulmalar-ve-vucut-sistemleri-konu-anlatimi-20-soruluk-test", "6. sınıf gezegenler, Güneş ve Ay tutulması, kemik ve kaslar, dolaşım ve solunum sistemleri konu anlatımı ve 20 soruluk test."),

        # 7. Sınıf
        (7, "7. Sınıf", "Matematik", "Tam Sayılarla Dört İşlem ve Problemler", "7-sinif-matematik-tam-sayilarla-dort-islem-ve-problemler-konu-anlatimi-20-soruluk-test", "7. sınıf tam sayılarda toplama, çıkarma, çarpma ve bölme işaret kuralları, üslü tam sayılar konu anlatımı ve 20 soruluk test."),
        (7, "7. Sınıf", "Matematik", "Rasyonel Sayılar ve Rasyonel Sayılarla İşlemler", "7-sinif-matematik-rasyonel-sayilar-ve-islemler-konu-anlatimi-20-soruluk-test", "7. sınıf rasyonel sayılar, devirli ondalık açılımlar, çok adımlı işlemler ve merdivenli kesirler konu anlatımı ve 20 soruluk test."),
        (7, "7. Sınıf", "Matematik", "Birinci Dereceden Bir Bilinmeyenli Denklemler", "7-sinif-matematik-birinci-dereceden-denklemler-konu-anlatimi-20-soruluk-test", "7. sınıf eşitliğin korunumu, bilinmeyeni yalnız bırakma, denklem kurma problemleri konu anlatımı ve 20 soruluk test."),
        (7, "7. Sınıf", "Fen Bilimleri", "Uzay Araştırmaları ve Hücre Bölünmeleri", "7-sinif-fen-bilimleri-uzay-arastirmalari-ve-hucre-bolunmeleri-konu-anlatimi-20-soruluk-test", "7. sınıf teleskoplar, galaksiler, mitoz ve mayoz bölünme karşılaştırması konu anlatımı ve 20 soruluk test."),

        # 8. Sınıf
        (8, "8. Sınıf", "Türkçe", "Cümlenin Öğeleri ve Özneler (Gerçek, Gizli, Sözde ve Örtülü Özne)", "8-sinif-turkce-ozneler-ve-cumlenin-ogeleri-konu-anlatimi-20-soruluk-test", "8. sınıf LGS Türkçe cümlenin ögeleri, özne çeşitleri (gerçek, gizli, sözde, örtülü özne), YÖNT kuralı, 20 soruluk yeni nesil LGS testi ve çözümleri."),
        (8, "8. Sınıf", "Matematik", "Çarpanlar ve Katlar (EBOB - EKOK Yeni Nesil)", "8-sinif-matematik-carpanlar-ve-katlar-ebob-ekok-konu-anlatimi-20-soruluk-test", "8. sınıf LGS çarpanlar ve katlar, EBOB-EKOK problemleri, aralarında asal sayılar konu anlatımı ve 20 soruluk yeni nesil test."),
        (8, "8. Sınıf", "Matematik", "Üslü İfadeler ve Bilimsel Gösterim", "8-sinif-matematik-uslu-ifadeler-ve-bilimsel-gosterim-konu-anlatimi-20-soruluk-test", "8. sınıf LGS üslü sayılar kuralları, negatif üs, çok büyük-küçük sayılar ve bilimsel gösterim konu anlatımı ve 20 soruluk test."),
        (8, "8. Sınıf", "Matematik", "Kareköklü İfadeler ve Gerçek Sayılar", "8-sinif-matematik-karekoklu-ifadeler-ve-gercek-sayilar-konu-anlatimi-20-soruluk-test", "8. sınıf tam kare sayılar, kök dışına çıkarma, kareköklü sayılarda işlemler ve irrasyonel sayılar konu anlatımı ve 20 soruluk test."),
        (8, "8. Sınıf", "Türkçe", "Fiilimsiler (İsim-Fiil, Sıfat-Fiil, Zarf-Fiil)", "8-sinif-turkce-fiilimsiler-konu-anlatimi-20-soruluk-test", "8. sınıf LGS Türkçe fiilimsi ekleri (Mayışmak, Anası mezar dikecekmiş, Ken-yalı-asiye), kalıcı isimler konu anlatımı ve 20 soruluk test."),
        (8, "8. Sınıf", "Fen Bilimleri", "Mevsimler ve İklim & DNA ve Genetik Kod", "8-sinif-fen-bilimleri-mevsimler-ve-iklim-dna-ve-genetik-kod-konu-anlatimi-20-soruluk-test", "8. sınıf LGS Dünya'nın dönme ekseni, nükleotidler, mutasyon, modifikasyon ve biyoteknoloji konu anlatımı ve 20 soruluk test."),

        # 9. Sınıf
        (9, "9. Sınıf", "Matematik", "Mantık ve Önermeler", "9-sinif-matematik-mantik-ve-onermeler-konu-anlatimi-20-soruluk-test", "9. sınıf önermeler, ve, veya, ise, ancak ve ancak bağlaçları, totoloji, çelişki ve doğruluk tablosu konu anlatımı ve 20 soruluk test."),
        (9, "9. Sınıf", "Matematik", "Kümeler ve Kümelerde İşlemler", "9-sinif-matematik-kumeler-ve-kumelerde-islemler-konu-anlatimi-20-soruluk-test", "9. sınıf alt küme, birleşim, kesişim, fark, tümleme ve kartezyen çarpım konu anlatımı ve 20 soruluk test."),
        (9, "9. Sınıf", "Matematik", "Birinci Dereceden Denklem ve Eşitsizlikler", "9-sinif-matematik-denklem-ve-esitsizlikler-konu-anlatimi-20-soruluk-test", "9. sınıf reel sayılar aralık kavramı, eşitsizlik çözümleri ve mutlak değer konu anlatımı ve 20 soruluk test."),
        (9, "9. Sınıf", "Fizik", "Madde ve Özkütle & Kuvvet ve Hareket", "9-sinif-fizik-madde-ve-ozkutle-kuvvet-ve-hareket-konu-anlatimi-20-soruluk-test", "9. sınıf özkütle formülü, dayanıklılık, adezyon-kohezyon ve Newton'ın hareket yasaları konu anlatımı ve 20 soruluk test."),
        (9, "9. Sınıf", "Kimya", "Kimya Bilimi, Atom ve Periyodik Sistem", "9-sinif-kimya-kimya-bilimi-atom-ve-periyodik-sistem-konu-anlatimi-20-soruluk-test", "9. sınıf simyadan kimyaya, atom modelleri, periyodik cetvel özellikleri ve elektron dizilimi konu anlatımı ve 20 soruluk test."),
        (9, "9. Sınıf", "Biyoloji", "Canlıların Temel Bileşenleri ve Hücre", "9-sinif-biyoloji-canlilarin-temel-bilesenleri-ve-hucre-konu-anlatimi-20-soruluk-test", "9. sınıf inorganik ve organik bileşikler, hücre zarı, organeller ve madde geçişleri konu anlatımı ve 20 soruluk test."),

        # 10. Sınıf
        (10, "10. Sınıf", "Matematik", "Sayma Yöntemleri, Permütasyon ve Kombinasyon", "10-sinif-matematik-sayma-permutasyon-kombinasyon-konu-anlatimi-20-soruluk-test", "10. sınıf çarpma yoluyla sayma, faktöriyel, permütasyon formülü, kombinasyon ve binom açılımı konu anlatımı ve 20 soruluk test."),
        (10, "10. Sınıf", "Matematik", "Fonksiyonlar ve Fonksiyon Türleri", "10-sinif-matematik-fonksiyonlar-ve-turleri-konu-anlatimi-20-soruluk-test", "10. sınıf fonksiyon tanımı, birebir ve örtenlik, bileşke fonksiyon ve fonksiyonun tersi konu anlatımı ve 20 soruluk test."),
        (10, "10. Sınıf", "Matematik", "Polinomlar ve Bölme-Kalan Bulma", "10-sinif-matematik-polinomlar-ve-bolme-kalan-konu-anlatimi-20-soruluk-test", "10. sınıf polinom derecesi, katsayılar toplamı, sabit terim ve P(x)'in (x-a) ile bölümünden kalan konu anlatımı ve 20 soruluk test."),
        (10, "10. Sınıf", "Fizik", "Elektrik Devreleri ve Basınç-Kaldırma Kuvveti", "10-sinif-fizik-elektrik-devreleri-ve-basinc-kaldirma-kuvveti-konu-anlatimi-20-soruluk-test", "10. sınıf Ohm yasası, eşdeğer direnç, sıvı basıncı ve Arşimet kaldırma kuvveti konu anlatımı ve 20 soruluk test."),
        (10, "10. Sınıf", "Kimya", "Mol Kavramı ve Kimyasal Hesaplamalar", "10-sinif-kimya-mol-kavrami-ve-kimyasal-hesaplamalar-konu-anlatimi-20-soruluk-test", "10. sınıf Avogadro sayısı, mol kütlesi, gazlarda hacim ilişkisi ve tepkime denkleştirme konu anlatımı ve 20 soruluk test."),
        (10, "10. Sınıf", "Biyoloji", "Mitoz ve Mayoz Bölünme Karşılaştırması & Kalıtım", "10-sinif-biyoloji-mitoz-mayoz-ve-kalitim-konu-anlatimi-20-soruluk-test", "10. sınıf hücre döngüsü, krossing-over, Mendel genetiği, kan grupları ve soyağaçları konu anlatımı ve 20 soruluk test."),

        # 11. Sınıf
        (11, "11. Sınıf", "Matematik", "Trigonometri (Birim Çember ve Teoremler)", "11-sinif-matematik-trigonometri-birim-cember-ve-teoremler-konu-anlatimi-20-soruluk-test", "11. sınıf yönlü açılar, sinüs-kosinüs teoremleri, trigonometrik fonksiyon grafikleri ve periyot konu anlatımı ve 20 soruluk test."),
        (11, "11. Sınıf", "Matematik", "Analitik Geometri (Nokta ve Doğrunun Analitiği)", "11-sinif-matematik-analitik-geometri-nokta-ve-dogru-konu-anlatimi-20-soruluk-test", "11. sınıf iki nokta arası uzaklık, doğru denklemi, doğrunun eğimi ve noktanın doğruya uzaklığı konu anlatımı ve 20 soruluk test."),
        (11, "11. Sınıf", "Matematik", "İkinci Dereceden Fonksiyonlar ve Parabol", "11-sinif-matematik-parabol-ve-ikinci-dereceden-fonksiyonlar-konu-anlatimi-20-soruluk-test", "11. sınıf parabolün tepe noktası, simetri ekseni, kökler ve eksenleri kestiği noktalar konu anlatımı ve 20 soruluk test."),
        (11, "11. Sınıf", "Fizik", "Vektörler, Bağıl Hareket ve Newton Yasaları", "11-sinif-fizik-vektorler-bagil-hareket-ve-dinamik-konu-anlatimi-20-soruluk-test", "11. sınıf bileşke vektör, nehir problemleri, sürtünmeli eğik düzlem ve etki-tepki kuvveti konu anlatımı ve 20 soruluk test."),
        (11, "11. Sınıf", "Kimya", "Modern Atom Teorisi ve Gaz Yasaları", "11-sinif-kimya-modern-atom-teorisi-ve-gaz-yasalari-konu-anlatimi-20-soruluk-test", "11. sınıf kuantum sayıları, Hund kuralı, Pauli ilkesi, İdeal Gaz Yasası P.V=n.R.T konu anlatımı ve 20 soruluk test."),
        (11, "11. Sınıf", "Biyoloji", "İnsan Fizyolojisi ve Sinir Sistemi", "11-sinif-biyoloji-insan-fizyolojisi-ve-sinir-sistemi-konu-anlatimi-20-soruluk-test", "11. sınıf nöronlar, impuls iletimi, merkezi ve çevresel sinir sistemi, duyu organları konu anlatımı ve 20 soruluk test."),

        # 12. Sınıf
        (12, "12. Sınıf", "Matematik", "Üstel ve Logaritmik Fonksiyonlar", "12-sinif-matematik-ustel-ve-logaritmik-fonksiyonlar-konu-anlatimi-20-soruluk-test", "12. sınıf logaritma kuralları, taban değiştirme, doğal logaritma (ln) ve logaritmik denklemler konu anlatımı ve 20 soruluk test."),
        (12, "12. Sınıf", "Matematik", "Diziler (Aritmetik ve Geometrik Dizi)", "12-sinif-matematik-diziler-aritmetik-ve-geometrik-dizi-konu-anlatimi-20-soruluk-test", "12. sınıf dizilerde genel terim, aritmetik dizi toplam formülü, geometrik dizi ve Fibonacci konu anlatımı ve 20 soruluk test."),
        (12, "12. Sınıf", "Matematik", "Limit ve Süreklilik", "12-sinif-matematik-limit-ve-sureklilik-konu-anlatimi-20-soruluk-test", "12. sınıf sağdan-soldan limit, 0/0 belirsizliği, çarpanlara ayırma ve fonksiyonun süreklilik şartı konu anlatımı ve 20 soruluk test."),
        (12, "12. Sınıf", "Matematik", "Türev ve Uygulamaları (Maksimum-Minimum)", "12-sinif-matematik-turev-ve-uygulamalari-maksimum-minimum-konu-anlatimi-20-soruluk-test", "12. sınıf türev alma kuralları, zincir kuralı, teğet eğimi, artan-azalan aralıklar ve ekstremum noktaları konu anlatımı ve 20 soruluk test."),
        (12, "12. Sınıf", "Matematik", "İntegral ve Alan Hesabı", "12-sinif-matematik-integral-ve-alan-hesabi-konu-anlatimi-20-soruluk-test", "12. sınıf belirsiz integral, değişken değiştirme, Riemann toplamı, belirli integral ve eğri altındaki alan konu anlatımı ve 20 soruluk test."),
        (12, "12. Sınıf", "Fizik", "Düzgün Çembersel Hareket ve Harmonik Hareket", "12-sinif-fizik-duzgun-cembersel-hareket-ve-harmonik-hareket-konu-anlatimi-20-soruluk-test", "12. sınıf çizgisel ve açısal hız, merkezcil kuvvet, viraj güvenliği ve yaylı sarkaç periyodu konu anlatımı ve 20 soruluk test."),
        (12, "12. Sınıf", "Kimya", "Elektrokimya (Redoks, Galvanik Piller ve Elektroliz)", "12-sinif-kimya-elektrokimya-ve-galvanik-piller-konu-anlatimi-20-soruluk-test", "12. sınıf redoks denkleştirme, aktiflik sırası, standart pil potansiyeli ve Faraday elektroliz yasası konu anlatımı ve 20 soruluk test."),
        (12, "12. Sınıf", "Biyoloji", "Genden Proteine & Fotosentez ve Solunum", "12-sinif-biyoloji-genden-proteine-fotosentez-ve-solunum-konu-anlatimi-20-soruluk-test", "12. sınıf DNA replikasyonu, transkripsiyon, translasyon (protein sentezi), glikoliz ve Krebs döngüsü konu anlatımı ve 20 soruluk test.")
    ]

    topics = []
    for g_num, g_str, subj, top, slug, excerpt in specs:
        # Build topic item dict
        item = {
            "grade_num": g_num,
            "grade_str": g_str,
            "subject": subj,
            "category_slug": f"{g_num}-sinif",
            "topic": top,
            "title": f"{g_str} {subj} {top} Konu Anlatımı, 20 Soruluk Test ve MEB Çözümleri",
            "slug": slug,
            "excerpt": excerpt,
        }

        # 1. Extensive Theory (Uzun Uzun)
        item["theory_html"] = generate_deep_theory_html(item)

        # 2. 20 Authentic Questions & Solutions
        item["questions"] = dispatch_questions(slug, g_num, subj)

        # 3. Verified Turkish Educational YouTube Video
        v_id, v_title, v_desc = get_video_info_for_slug(slug, g_str, subj, top)
        item["video_embed_id"] = v_id
        item["video_title"] = v_title
        item["video_desc"] = v_desc

        # 4. MEB and Related links
        item["meb_book_links"] = [
            {"title": f"{g_str} MEB {subj} Ders Kitabı Çözümleri", "url": f"/kategori/{g_num}-sinif"},
            {"title": "Tüm Sınıflar MEB Kitap Çözümleri", "url": "/kategori/meb-ders-kitabi-cevaplari"}
        ]
        item["related_topics"] = [
            {"title": f"{g_str} Dersleri ve Konu Anlatımları", "url": f"/kategori/{g_num}-sinif"},
            {"title": "MEB Sınav Hazırlama Robotu", "url": "/sinav-hazirlama-robotu"}
        ]
        item["faqs"] = [
            {"q": f"{g_str} {subj} {top} konusu sınavlarda kaç soru getirir?", "a": f"MEB ortak yazılı sınavlarında ve merkezi sınavlarda {top} konusundan her dönem ortalama 2 ila 4 soru sorulmaktadır."},
            {"q": f"{top} konusunu en iyi nasıl pekiştirebilirim?", "a": f"Sayfamızdaki derinlemesine konu anlatımını okuduktan sonra 20 soruluk testi süre tutarak çözmeli ve yanlış yaptığınız soruların adım adım çözümlerini incelemelisiniz."},
            {"q": f"MEB ders kitabı alıştırmalarına nasıl ulaşabilirim?", "a": f"Sayfamızdaki MEB Kitabı Çözümleri bölümünden ilgili sınıf ve sayfa çözümlerine doğrudan tek tıkla ulaşabilirsiniz."}
        ]

        topics.append(item)

    return topics

if __name__ == "__main__":
    t_all = get_full_curriculum_catalog()
    print(f"Total topics generated: {len(t_all)}")
    for t in t_all[:3]:
        print(f"Slug: {t['slug']} | Questions: {len(t['questions'])} | Video: {t['video_embed_id']}")
