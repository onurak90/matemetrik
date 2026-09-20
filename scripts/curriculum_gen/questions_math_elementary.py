# -*- coding: utf-8 -*-
"""
Authentic Math Question Generator for Elementary Grades 1-4.
Covers:
- 1. Sınıf Doğal Sayılar & Toplama-Çıkarma
- 2. Sınıf İki Basamaklı Sayılar & Eldeli Toplama
- 2. Sınıf Çarpma ve Bölmeye Giriş
- 3. Sınıf Üç Basamaklı Sayılar, Çarpma ve Kalanlı Bölme
- 3. Sınıf Kesirler (Birim Kesir & Çeşitleri)
- 4. Sınıf Dört İşlem & Zihinden İşlemler
- 4. Sınıf Kesirlerle İşlemler & Ondalık Gösterim
"""

def get_math_elementary_questions(slug):
    raw = []
    if "1-sinif-matematik-dogal-sayilar" in slug:
        raw = [
            ("7 elmanın yanına 5 elma daha koyarsak toplam kaç elma olur?", ["A) 11", "B) 12", "C) 13", "D) 14"], "B", "Toplama işlemi: 7 + 5 = 12 elma eder."),
            ("15 cevizin 6 tanesini yiyen Ali'nin geriye kaç cevizi kalır?", ["A) 8", "B) 9", "C) 10", "D) 11"], "B", "Çıkarma işlemi: 15 - 6 = 9 ceviz kalır."),
            ("1 onluk ve 4 birlikten oluşan sayı kaçtır?", ["A) 14", "B) 41", "C) 10", "D) 40"], "A", "1 onluk = 10, 4 birlik = 4. 10 + 4 = 14."),
            ("8 sayısının 4 fazlası kaçtır?", ["A) 11", "B) 12", "C) 13", "D) 14"], "B", "Fazlası dendiğinde toplama yapılır: 8 + 4 = 12."),
            ("18 sayısından bir önce gelen sayı hangisidir?", ["A) 16", "B) 17", "C) 19", "D) 20"], "B", "18'den bir önce gelen ardışık sayı 17'dir."),
            ("9 + 8 işleminin sonucu kaçtır?", ["A) 16", "B) 17", "C) 18", "D) 19"], "B", "9 + 8 = 17 olarak hesaplanır."),
            ("20'den geriye doğru ikişer sayarken 20, 18, 16, ? sıradaki sayı kaçtır?", ["A) 15", "B) 14", "C) 12", "D) 10"], "B", "16'dan 2 eksilttiğimizde 14 gelir."),
            ("Bir tabakta 10 kurabiye vardı. Kardeşimle beraber 7 tanesini yedik. Kaç kurabiye kaldı?", ["A) 2", "B) 3", "C) 4", "D) 5"], "B", "10 - 7 = 3 kurabiye kalır."),
            ("Hangi sayı 13'ten büyüktür?", ["A) 11", "B) 12", "C) 13", "D) 16"], "D", "16 sayısı 13'ten daha büyüktür."),
            ("6 + ? = 14 işleminde verilmeyen toplanan sayı kaçtır?", ["A) 6", "B) 7", "C) 8", "D) 9"], "C", "Verilmeyen toplananı bulmak için toplamdan verilen çıkarılır: 14 - 6 = 8."),
            ("Bir çiftlikte 5 inek, 6 koyun vardır. Çiftlikte toplam kaç hayvan vardır?", ["A) 10", "B) 11", "C) 12", "D) 13"], "B", "5 + 6 = 11 hayvan vardır."),
            ("16 - 7 işleminin sonucu kaçtır?", ["A) 8", "B) 9", "C) 10", "D) 11"], "B", "16'dan 7 çıktığında 9 kalır."),
            ("Deste kaç tanedir?", ["A) 10", "B) 12", "C) 15", "D) 20"], "A", "Aynı türden 10 varlığın oluşturduğu topluluğa 'deste' denir."),
            ("Düzine kaç tanedir?", ["A) 10", "B) 12", "C) 14", "D) 16"], "B", "Aynı türden 12 varlığın oluşturduğu topluluğa 'düzine' denir."),
            ("1 düzine kalemin 4 tanesini arkadaşıma verirsem kaç kalemim kalır?", ["A) 6", "B) 7", "C) 8", "D) 9"], "C", "1 düzine = 12. 12 - 4 = 8 kalem kalır."),
            ("Hangi işlemde sonuç 15 eder?", ["A) 8 + 6", "B) 9 + 6", "C) 7 + 7", "D) 10 + 4"], "B", "9 + 6 = 15 eder."),
            ("11 sayısının 5 eksiği kaçtır?", ["A) 5", "B) 6", "C) 7", "D) 8"], "B", "11 - 5 = 6 eder."),
            ("Ayşe 7 yaşındadır. Ağabeyi Ayşe'den 4 yaş büyük olduğuna göre ağabeyi kaç yaşındadır?", ["A) 10", "B) 11", "C) 12", "D) 13"], "B", "7 + 4 = 11 yaşındadır."),
            ("2 onluktan oluşan sayı kaçtır?", ["A) 10", "B) 20", "C) 12", "D) 2"], "B", "1 onluk = 10, 2 onluk = 20 eder."),
            ("19 - 9 işleminin sonucu kaçtır?", ["A) 9", "B) 10", "C) 11", "D) 1"], "B", "19 - 9 = 10 olarak hesaplanır.")
        ]
    elif "2-sinif-matematik-iki-basamakli" in slug:
        raw = [
            ("3 onluk ve 7 birlikten oluşan sayı kaçtır?", ["A) 73", "B) 37", "C) 30", "D) 10"], "B", "3 onluk = 30, 7 birlik = 7. 30 + 7 = 37."),
            ("48 sayısının basamak değerleri toplamı kaçtır?", ["A) 12", "B) 48", "C) 40", "D) 80"], "B", "Bir sayının basamak değerleri toplamı sayının kendisine eşittir: 40 + 8 = 48."),
            ("27 + 35 işleminin sonucu kaçtır?", ["A) 52", "B) 62", "C) 72", "D) 61"], "B", "Birlikler: 7 + 5 = 12 (2'si yazılır, 1 elde). Onluklar: 2 + 3 + 1 = 6. Sonuç: 62."),
            ("64 - 28 işleminin sonucu kaçtır?", ["A) 36", "B) 46", "C) 34", "D) 44"], "A", "4'ten 8 çıkmaz, onluk bozulur: 14 - 8 = 6. Onluklarda 5 kalmıştı: 5 - 2 = 3. Sonuç: 36."),
            ("5 onluk 3 birlikten oluşan sayıya 19 eklersek hangi sayıyı buluruz?", ["A) 71", "B) 72", "C) 62", "D) 82"], "B", "Sayı = 53. 53 + 19 = 72."),
            ("Hangi sayı en yakın onluğa yuvarlandığında 50 olur?", ["A) 43", "B) 47", "C) 56", "D) 39"], "B", "Birler basamağı 5, 6, 7, 8, 9 olan sayılar bir üst onluğa yuvarlanır. 47 sayısı 50'ye yuvarlanır."),
            ("45 sayısının birler basamağındaki rakamın basamak değeri kaçtır?", ["A) 4", "B) 5", "C) 40", "D) 50"], "B", "Birler basamağındaki rakam 5'tir, basamak değeri 5 × 1 = 5'tir."),
            ("38 + 44 işleminin sonucu kaçtır?", ["A) 81", "B) 82", "C) 72", "D) 84"], "B", "8 + 4 = 12 (elde 1), 3 + 4 + 1 = 8. Sonuç: 82."),
            ("Bir sınıfta 18 kız, kızlardan 7 fazla erkek öğrenci vardır. Erkek öğrenci sayısı kaçtır?", ["A) 24", "B) 25", "C) 26", "D) 27"], "B", "18 + 7 = 25 erkek öğrenci vardır."),
            ("80 - 36 işleminin sonucu kaçtır?", ["A) 44", "B) 54", "C) 46", "D) 56"], "A", "80 - 36 = 44."),
            ("73 sayısında 7 rakamının basamak değeri kaçtır?", ["A) 7", "B) 70", "C) 3", "D) 30"], "B", "7 rakamı onlar basamağındadır: 7 × 10 = 70."),
            ("2 basamaklı en büyük doğal sayı kaçtır?", ["A) 90", "B) 98", "C) 99", "D) 100"], "C", "İki basamaklı en büyük doğal sayı 99'dur."),
            ("İki basamaklı en küçük çift sayı kaçtır?", ["A) 10", "B) 11", "C) 12", "D) 0"], "A", "İki basamaklı en küçük sayı 10'dur ve çift sayıdır."),
            ("56 sayısının onlar basamağı 2 artırılırsa sayı kaç artar?", ["A) 2", "B) 20", "C) 26", "D) 76"], "B", "Onlar basamağı 1 artarsa sayı 10 artar, 2 artarsa 20 artar."),
            ("34 + 29 işleminin tahmini sonucu en yakın onluklara yuvarlanarak bulunursa kaç çıkar?", ["A) 50", "B) 60", "C) 70", "D) 80"], "B", "34 -> 30, 29 -> 30. Tahmini sonuç: 30 + 30 = 60."),
            ("Bir kitaplıktaki 92 kitabın 45 tanesi hikaye, geriye kalanlar masal kitabıdır. Masal kitabı sayısı kaçtır?", ["A) 46", "B) 47", "C) 48", "D) 57"], "B", "92 - 45 = 47 masal kitabı vardır."),
            ("Hangi sayının 15 fazlası 60 eder?", ["A) 40", "B) 45", "C) 50", "D) 75"], "B", "60 - 15 = 45."),
            ("68 sayısından hangi sayı çıkarılırsa sonuç 25 kalır?", ["A) 41", "B) 42", "C) 43", "D) 44"], "C", "68 - 25 = 43."),
            ("25 + 18 + 12 işleminin pratik zihinden sonucu kaçtır?", ["A) 54", "B) 55", "C) 56", "D) 57"], "B", "18 + 12 = 30 eder. 30 + 25 = 55 bulunur."),
            ("96 - 47 işleminin sonucu kaçtır?", ["A) 48", "B) 49", "C) 51", "D) 59"], "B", "96 - 47 = 49.")
        ]
    elif "2-sinif-matematik-carpma-ve-bolme" in slug:
        raw = [
            ("4 tane 5'in toplamı (5 + 5 + 5 + 5) çarpma işlemi olarak nasıl yazılır?", ["A) 4 + 5", "B) 4 × 5", "C) 5 × 5", "D) 4 × 4"], "B", "Tekrarlı toplamın kısa yoldan yapılışı çarpmadır: 4 × 5 = 20."),
            ("6 × 3 işleminin sonucu kaçtır?", ["A) 15", "B) 18", "C) 21", "D) 24"], "B", "6 × 3 = 18."),
            ("Bir basamaklı en büyük sayının 2 katı kaçtır?", ["A) 16", "B) 18", "C) 20", "D) 19"], "B", "Bir basamaklı en büyük sayı 9'dur. 9 × 2 = 18."),
            ("Bir günde 3 elma yiyen Mert, 1 haftada (7 günde) kaç elma yer?", ["A) 18", "B) 21", "C) 24", "D) 27"], "B", "7 × 3 = 21 elma yer."),
            ("12 fındık 3 kardeşe eşit paylaştırılırsa her birine kaç fındık düşer?", ["A) 3", "B) 4", "C) 5", "D) 6"], "B", "Bölme işlemi: 12 ÷ 3 = 4 fındık düşer."),
            ("20 ÷ 4 işleminin sonucu kaçtır?", ["A) 4", "B) 5", "C) 6", "D) 7"], "B", "20 ÷ 4 = 5."),
            ("Çarpma işleminde '0' (sıfır) nasıl bir elemandır?", ["A) Etkisiz eleman", "B) Yutan eleman", "C) Değişmeyen eleman", "D) Toplayan eleman"], "B", "Sıfır ile çarpılan herhangi bir sayının sonucu sıfır olur, bu yüzden sıfır 'yutan elemandır'."),
            ("Çarpma işleminde '1' (bir) nasıl bir elemandır?", ["A) Etkisiz eleman", "B) Yutan eleman", "C) Çift eleman", "D) Ters eleman"], "A", "1 sayısı çarpıldığı sayıyı değiştirmez (örn: 8 × 1 = 8), etkisiz elemandır."),
            ("7 × 4 işleminin sonucu kaçtır?", ["A) 24", "B) 28", "C) 32", "D) 35"], "B", "7 × 4 = 28."),
            ("Bir tavşanın 4 ayağı vardır. 5 tavşanın toplam kaç ayağı vardır?", ["A) 15", "B) 20", "C) 24", "D) 25"], "B", "5 × 4 = 20 ayak vardır."),
            ("15 çiçeği 3 vazoya eşit koyarsak her vazoda kaç çiçek olur?", ["A) 3", "B) 4", "C) 5", "D) 6"], "C", "15 ÷ 3 = 5 çiçek."),
            ("8 × 5 işleminin sonucu kaçtır?", ["A) 35", "B) 40", "C) 45", "D) 48"], "B", "8 × 5 = 40."),
            ("18 ÷ 2 işleminin sonucu kaçtır?", ["A) 8", "B) 9", "C) 10", "D) 7"], "B", "18'in yarısı 18 ÷ 2 = 9'dur."),
            ("Günde 2 saat kitap okuyan Elif, 9 günde toplam kaç saat okur?", ["A) 16", "B) 18", "C) 20", "D) 14"], "B", "9 × 2 = 18 saat okur."),
            ("16 elma dörderli gruplanırsa kaç grup oluşur?", ["A) 3", "B) 4", "C) 5", "D) 6"], "B", "16 ÷ 4 = 4 grup."),
            ("0 × 9 işleminin sonucu kaçtır?", ["A) 0", "B) 9", "C) 1", "D) 90"], "A", "Sıfır çarpmada yutan elemandır: 0 × 9 = 0."),
            ("5 × 1 işleminin sonucu kaçtır?", ["A) 0", "B) 5", "C) 6", "D) 1"], "B", "1 etkisiz elemandır: 5 × 1 = 5."),
            ("Bir deste kalemi (10 kalem) 2 kişiye eşit paylaştırırsak kişi başı kaç kalem düşer?", ["A) 4", "B) 5", "C) 6", "D) 8"], "B", "10 ÷ 2 = 5 kalem."),
            ("3 × 8 işleminin sonucu kaçtır?", ["A) 21", "B) 24", "C) 27", "D) 30"], "B", "3 × 8 = 24."),
            ("Hangi bölme işleminin sonucu 6'dır?", ["A) 15 ÷ 3", "B) 18 ÷ 3", "C) 20 ÷ 4", "D) 16 ÷ 2"], "B", "18 ÷ 3 = 6'dır.")
        ]
    elif "3-sinif-matematik-uc-basamakli" in slug:
        raw = [
            ("5 yüzlük, 4 onluk ve 2 birlikten oluşan sayı kaçtır?", ["A) 245", "B) 542", "C) 524", "D) 452"], "B", "5 yüzlük = 500, 4 onluk = 40, 2 birlik = 2. 500 + 40 + 2 = 542."),
            ("768 sayısının onlar basamağındaki rakamın basamak değeri kaçtır?", ["A) 6", "B) 60", "C) 600", "D) 70"], "B", "6 onlar basamağında olduğundan basamak değeri 6 × 10 = 60'tır."),
            ("245 + 382 işleminin sonucu kaçtır?", ["A) 617", "B) 627", "C) 637", "D) 527"], "B", "245 + 382 = 627."),
            ("700 - 346 işleminin sonucu kaçtır?", ["A) 354", "B) 364", "C) 454", "D) 464"], "A", "700 - 346 = 354."),
            ("24 × 6 işleminin sonucu kaçtır?", ["A) 134", "B) 144", "C) 154", "D) 124"], "B", "24 × 6 = (20 × 6) + (4 × 6) = 120 + 24 = 144."),
            ("35 ÷ 4 kalanlı bölme işleminde bölüm ve kalan kaçtır?", ["A) Bölüm 8, Kalan 3", "B) Bölüm 7, Kalan 4", "C) Bölüm 8, Kalan 2", "D) Bölüm 9, Kalan 1"], "A", "35 = 4 × 8 + 3. Bölüm 8, kalan 3'tür."),
            ("Bir bölme işleminde bölen 6 ise kalan sayı en fazla kaç olabilir?", ["A) 4", "B) 5", "C) 6", "D) 7"], "B", "Kalan daima bölenden küçük olmalıdır. Kalan < 6 olduğundan en fazla 5 olabilir."),
            ("125 sayısının 4 katı kaçtır?", ["A) 450", "B) 500", "C) 550", "D) 600"], "B", "125 × 4 = 500."),
            ("84 ÷ 3 işleminin sonucu kaçtır?", ["A) 26", "B) 28", "C) 31", "D) 32"], "B", "84 ÷ 3 = 28."),
            ("Üç basamaklı en küçük çift doğal sayı kaçtır?", ["A) 100", "B) 102", "C) 101", "D) 998"], "A", "Üç basamaklı en küçük sayı 100'dür ve çift sayıdır."),
            ("Rakamları farklı üç basamaklı en büyük sayı kaçtır?", ["A) 999", "B) 987", "C) 986", "D) 876"], "B", "Rakamları farklı en büyük sayı 987'dir."),
            ("428 sayısının en yakın yüzlüğe yuvarlanmış hali nedir?", ["A) 400", "B) 430", "C) 500", "D) 450"], "A", "Onlar basamağı 2 (<5) olduğu için alt yüzlüğe yuvarlanır: 400."),
            ("53 × 10 pratik çarpma işleminin sonucu kaçtır?", ["A) 53", "B) 530", "C) 5300", "D) 503"], "B", "Bir sayı 10 ile çarpılırken sağına bir sıfır eklenir: 530."),
            ("Bir manav 8 kasadaki elmaların her birinde 25 kg elma olduğunu görüyor. Toplam kaç kg elma vardır?", ["A) 180", "B) 200", "C) 220", "D) 250"], "B", "8 × 25 = 200 kg elma vardır."),
            ("72 cevizi 5 arkadaş eşit paylaşırsa kaç ceviz artar (kalan olur)?", ["A) 1", "B) 2", "C) 3", "D) 4"], "B", "72 = 5 × 14 + 2. Kalan 2'dir."),
            ("620 sayısının 145 fazlası kaçtır?", ["A) 755", "B) 765", "C) 775", "D) 865"], "B", "620 + 145 = 765."),
            ("400 - 185 işleminin sonucu kaçtır?", ["A) 215", "B) 225", "C) 315", "D) 115"], "A", "400 - 185 = 215."),
            ("16 × 5 işleminin sonucu kaçtır?", ["A) 70", "B) 80", "C) 90", "D) 85"], "B", "16 × 5 = 80."),
            ("96 ÷ 6 işleminin sonucu kaçtır?", ["A) 14", "B) 16", "C) 18", "D) 12"], "B", "96 ÷ 6 = 16."),
            ("Bölünen = (Bölen × Bölüm) + Kalan formülüne göre; Bölen = 7, Bölüm = 12, Kalan = 4 ise Bölünen sayı kaçtır?", ["A) 84", "B) 88", "C) 92", "D) 96"], "B", "(7 × 12) + 4 = 84 + 4 = 88.")
        ]
    elif "3-sinif-matematik-kesirler" in slug:
        raw = [
            ("Payı 1 olan kesirlere ne ad verilir?", ["A) Basit kesir", "B) Birim kesir", "C) Tam sayılı kesir", "D) Bileşik kesir"], "B", "Payı 1 olan kesirlere (1/2, 1/4, 1/8 gibi) 'birim kesir' denir."),
            ("Bir bütün 4 eş parçaya bölünüp 1 parçası alınırsa bu parçaya ne denir?", ["A) Yarım", "B) Çeyrek", "C) Bütün", "D) İki katı"], "B", "Bir bütünün 4 eş parçasından her birine çeyrek (1/4) denir."),
            ("Bir bütün kaç yarımdan oluşur?", ["A) 1", "B) 2", "C) 3", "D) 4"], "B", "1 bütün = 2 yarım."),
            ("1/5, 1/3, 1/8 birim kesirlerinden en büyüğü hangisidir?", ["A) 1/8", "B) 1/5", "C) 1/3", "D) Hepsi eşit"], "C", "Birim kesirlerde payda küçüldükçe parçanın büyüklüğü artar. Dolayısıyla 1/3 en büyüktür."),
            ("24 sayısının 1/4'ü (çeyreği) kaçtır?", ["A) 4", "B) 6", "C) 8", "D) 12"], "B", "24 ÷ 4 = 6."),
            ("40 sayısının 1/5'i kaçtır?", ["A) 6", "B) 8", "C) 10", "D) 12"], "B", "40 ÷ 5 = 8."),
            ("Payı 3, paydası 7 olan kesir nasıl yazılır?", ["A) 7/3", "B) 3/7", "C) 3,7", "D) 10/3"], "B", "Üste pay, alta payda yazılır: 3/7."),
            ("Payı paydasından küçük olan kesirlere ne denir?", ["A) Basit kesir", "B) Bileşik kesir", "C) Tam sayılı kesir", "D) Denk kesir"], "A", "Payı paydasından küçük olan kesirler (örn: 2/5) basit kesirdir."),
            ("Aşağıdakilerden hangisi bir basit kesirdir?", ["A) 5/3", "B) 4/4", "C) 3/8", "D) 7/2"], "C", "3/8 kesrinde 3 < 8 olduğu için basit kesirdir."),
            ("30 sayısının yarısı (1/2'si) kaçtır?", ["A) 10", "B) 15", "C) 20", "D) 25"], "B", "30 ÷ 2 = 15."),
            ("Hangi kesir 1 bütünü ifade eder?", ["A) 1/4", "B) 2/3", "C) 6/6", "D) 3/5"], "C", "Pay ve paydası eşit olan kesirler (6/6 = 1) 1 bütündür."),
            ("Bir pastanın 3/8'ini Ali, 2/8'ini Ayşe yedi. Toplam kaçta kaçı yendi?", ["A) 5/16", "B) 5/8", "C) 1/8", "D) 6/8"], "B", "Paydalar eşit: 3/8 + 2/8 = 5/8'i yendi."),
            ("Bir sınıftaki 36 öğrencinin 1/6'sı gözlüklüdür. Gözlüklü öğrenci sayısı kaçtır?", ["A) 4", "B) 6", "C) 8", "D) 10"], "B", "36 ÷ 6 = 6 öğrencidir."),
            ("8 çeyrek elma kaç bütün elma eder?", ["A) 1", "B) 2", "C) 3", "D) 4"], "B", "4 çeyrek 1 bütün ettiğinden, 8 ÷ 4 = 2 bütün elma eder."),
            ("6 yarım ekmek kaç bütün ekmek eder?", ["A) 2", "B) 3", "C) 4", "D) 5"], "B", "2 yarım 1 bütün ettiğinden, 6 ÷ 2 = 3 bütün ekmek eder."),
            ("Sayı doğrusunda 0 ile 1 arası 5 eş parçaya bölünmüştür. 2. çizgi hangi kesri gösterir?", ["A) 1/5", "B) 2/5", "C) 3/5", "D) 4/5"], "B", "2. çizgi 2/5 kesrini temsil eder."),
            ("Aşağıdaki kesirlerden hangisi en küçüktür?", ["A) 1/2", "B) 1/4", "C) 1/6", "D) 1/10"], "D", "Paydası en büyük olan birim kesir en küçüktür: 1/10."),
            ("50 TL paranın 1/5'i ile defter alan Burak kaç TL harcamıştır?", ["A) 5", "B) 10", "C) 15", "D) 20"], "B", "50 ÷ 5 = 10 TL harcamıştır."),
            ("Bir günün (24 saat) 1/3'ünü uyuyarak geçiren Can kaç saat uyumuştur?", ["A) 6", "B) 8", "C) 9", "D) 10"], "B", "24 ÷ 3 = 8 saat uyumuştur."),
            ("7/9 kesrinin birim kesri nedir?", ["A) 1/7", "B) 1/9", "C) 7/1", "D) 9/1"], "B", "Paydası 9 olan birim kesir 1/9'dur.")
        ]
    elif "4-sinif-matematik-dogal-sayilar" in slug:
        raw = [
            ("54 308 sayısının okunuşu aşağıdakilerden hangisidir?", ["A) Beş yüz kırk bin üç yüz sekiz", "B) Elli dört bin üç yüz sekiz", "C) Elli dört bin otuz sekiz", "D) Beş bin dört yüz otuz sekiz"], "B", "54 (elli dört bin) 308 (üç yüz sekiz)."),
            ("805 412 sayısında binler bölüğündeki sayı kaçtır?", ["A) 412", "B) 805", "C) 80", "D) 541"], "B", "Sağdaki 412 birler bölüğü, soldaki 805 binler bölüğüdür."),
            ("4 782 + 3 549 işleminin sonucu kaçtır?", ["A) 8 321", "B) 8 331", "C) 8 231", "D) 7 331"], "B", "4782 + 3549 = 8331."),
            ("6 000 - 2 475 işleminin sonucu kaçtır?", ["A) 3 525", "B) 3 625", "C) 4 525", "D) 3 535"], "A", "6000 - 2475 = 3525."),
            ("145 × 24 işleminin sonucu kaçtır?", ["A) 3 380", "B) 3 480", "C) 3 580", "D) 3 280"], "B", "145 × 24 = 3480."),
            ("864 ÷ 6 işleminin sonucu kaçtır?", ["A) 134", "B) 144", "C) 154", "D) 142"], "B", "864 ÷ 6 = 144."),
            ("Bir sayıyı 100 ile kısa yoldan çarpmak için sağına kaç sıfır eklenir?", ["A) 1", "B) 2", "C) 3", "D) 4"], "B", "100 ile çarpmada 2 sıfır eklenir (örn: 35 × 100 = 3500)."),
            ("4500 ÷ 100 pratik bölme işleminin sonucu kaçtır?", ["A) 45", "B) 450", "C) 4", "D) 50"], "A", "100'e bölerken sondaki 2 sıfır silinir: 45."),
            ("75 sayısını zihinden 8 ile çarpmak için hangi yöntem kullanılabilir?", ["A) Sayıyı 3 kez 2 ile çarpmak", "B) Sayıya 8 eklemek", "C) 10 ile çarpıp 8 çıkarmak", "D) Yarısını almak"], "A", "8 = 2 × 2 × 2 olduğundan sayıyı ardışık üç kez 2 ile çarpmak (75 -> 150 -> 300 -> 600) 8 ile çarpmaktır."),
            ("Bir fabrikada günde 1 250 adet maske üretilmektedir. 8 günde toplam kaç maske üretilir?", ["A) 9 000", "B) 10 000", "C) 10 500", "D) 12 000"], "B", "1250 × 8 = 10 000 maske."),
            ("En yakın binliğe yuvarlandığında 8 000 olan en küçük sayı kaçtır?", ["A) 7 499", "B) 7 500", "C) 7 999", "D) 8 499"], "B", "7 500 sayısı 8 000'e yuvarlanan en küçük doğal sayıdır."),
            ("4 850 + 2 150 işleminin sonucu kaçtır?", ["A) 6 900", "B) 7 000", "C) 7 100", "D) 6 000"], "B", "4850 + 2150 = 7000."),
            ("1 000 - 345 işleminin sonucu kaçtır?", ["A) 645", "B) 655", "C) 665", "D) 755"], "B", "1000 - 345 = 655."),
            ("32 × 25 işlemini zihinden yapmak için 32 sayısı 4'e bölünüp ne ile çarpılabilir?", ["A) 10", "B) 50", "C) 100", "D) 1000"], "C", "25 ile pratik çarpma: sayı 4'e bölünür ve 100 ile çarpılır (32/4 = 8, 8 × 100 = 800)."),
            ("9 876 sayısının rakamları toplamı kaçtır?", ["A) 28", "B) 30", "C) 32", "D) 27"], "B", "9 + 8 + 7 + 6 = 30."),
            ("Bölünen = 952, Bölen = 8 ise Bölüm kaçtır?", ["A) 117", "B) 119", "C) 121", "D) 123"], "B", "952 ÷ 8 = 119."),
            ("Hangi işlemin sonucu diğerlerinden büyüktür?", ["A) 400 × 5", "B) 250 × 8", "C) 150 × 12", "D) 100 × 25"], "D", "100 × 25 = 2500. (Diğerleri 2000 ve 1800'dür)."),
            ("Bir çıkarma işleminde Eksilen 8 450, Fark 3 200 ise Çıkan kaçtır?", ["A) 5 150", "B) 5 250", "C) 5 350", "D) 11 650"], "B", "Çıkan = Eksilen - Fark = 8450 - 3200 = 5250."),
            ("Dört basamaklı rakamları farklı en küçük çift sayı kaçtır?", ["A) 1 000", "B) 1 023", "C) 1 024", "D) 1 234"], "C", "1 024 sayısı rakamları farklı en küçük çift 4 basamaklı sayıdır."),
            ("540 ÷ 90 işleminin sonucu kaçtır?", ["A) 5", "B) 6", "C) 7", "D) 8"], "B", "Sıfırlar sadeleşir: 54 ÷ 9 = 6.")
        ]
    else: # 4-sinif-matematik-kesirlerle-islemler
        raw = [
            ("Payı paydasına eşit veya büyük olan kesirlere ne ad verilir?", ["A) Basit kesir", "B) Bileşik kesir", "C) Birim kesir", "D) Tam sayılı kesir"], "B", "Payı paydasına eşit veya büyük olan kesirler (örn: 5/5, 9/4) bileşik kesirdir."),
            ("2 tam 3/5 tam sayılı kesri bileşik kesir olarak nasıl yazılır?", ["A) 11/5", "B) 13/5", "C) 10/5", "D) 6/5"], "B", "Tam kısım ile payda çarpılır, pay eklenir: (2 × 5 + 3)/5 = 13/5."),
            ("17/4 bileşik kesri tam sayılı kesre çevrildiğinde tam kısmı kaç olur?", ["A) 3", "B) 4", "C) 5", "D) 2"], "B", "17 ÷ 4 = 4 (kalan 1). Tam kısım 4 olur (4 tam 1/4)."),
            ("3/8 + 2/8 işleminin sonucu kaçtır?", ["A) 5/16", "B) 5/8", "C) 1/8", "D) 6/8"], "B", "Paylar toplanır, payda aynen yazılır: (3+2)/8 = 5/8."),
            ("7/10 - 4/10 işleminin sonucu kaçtır?", ["A) 3/10", "B) 3/0", "C) 11/10", "D) 1/10"], "A", "7/10 - 4/10 = 3/10."),
            ("1 tam - 3/7 işleminin sonucu kaçtır?", ["A) 2/7", "B) 4/7", "C) 5/7", "D) 1/7"], "B", "1 tam = 7/7'dir. 7/7 - 3/7 = 4/7."),
            ("Ondalık gösterimi 0,6 olan kesir aşağıdakilerden hangisidir?", ["A) 1/6", "B) 6/10", "C) 6/100", "D) 60/10"], "B", "Virgülden sonra 1 basamak onda birleri gösterir: 6/10."),
            ("0,25 ondalık gösteriminin kesir olarak eşiti hangisidir?", ["A) 25/10", "B) 25/100 (veya 1/4)", "C) 2/5", "D) 1/25"], "B", "Virgülden sonra 2 basamak yüzde birlerdir: 25/100 = 1/4."),
            ("3 tam yüzde 14 ondalık olarak nasıl yazılır?", ["A) 3,14", "B) 3,014", "C) 3,140", "D) 31,4"], "A", "3 tam, virgülden sonra iki basamak: 3,14."),
            ("5,8 ondalık gösterimindeki 8 rakamının basamak adı nedir?", ["A) Birler basamağı", "B) Onda birler basamağı", "C) Yüzde birler basamağı", "D) Onlar basamağı"], "B", "Virgülden hemen sonraki ilk basamak 'onda birler basamağı'dır."),
            ("60 sayısının 3/5'i kaçtır?", ["A) 24", "B) 36", "C) 40", "D) 48"], "B", "60 ÷ 5 = 12. 12 × 3 = 36."),
            ("Hangi sayının 2/3'ü 20 eder?", ["A) 25", "B) 30", "C) 35", "D) 40"], "B", "20 ÷ 2 = 10. 10 × 3 = 30."),
            ("2/9 + 4/9 + 1/9 işleminin sonucu kaçtır?", ["A) 7/27", "B) 7/9", "C) 6/9", "D) 8/9"], "B", "(2 + 4 + 1)/9 = 7/9."),
            ("5 tam 2/7 - 2 tam 1/7 işleminin sonucu kaçtır?", ["A) 3 tam 1/7", "B) 3 tam 3/7", "C) 2 tam 1/7", "D) 7 tam 3/7"], "A", "Tamlar: 5 - 2 = 3. Kesirler: 2/7 - 1/7 = 1/7. Sonuç: 3 tam 1/7."),
            ("Aşağıdaki ondalık gösterimlerden hangisi en büyüktür?", ["A) 0,4", "B) 0,45", "C) 0,5", "D) 0,09"], "C", "0,5 = 0,50'dir. 0,50 > 0,45 > 0,40 > 0,09 olduğundan en büyük 0,5'tir."),
            ("4/100 kesrinin ondalık gösterimi nedir?", ["A) 0,4", "B) 0,04", "C) 0,004", "D) 4,00"], "B", "Yüzde 4 iki basamak gerektirir: 0,04."),
            ("12 tam onda 7 ondalık olarak nasıl yazılır?", ["A) 12,07", "B) 12,7", "C) 1,27", "D) 127,0"], "B", "12 tam onda 7 = 12,7."),
            ("Bir sürahideki 2 litrelik meyve suyunun 3/4 litresi içilirse geriye ne kadar kalır?", ["A) 1 tam 1/4 litre", "B) 1 tam 3/4 litre", "C) 1/2 litre", "D) 3/4 litre"], "A", "2 - 3/4 = 8/4 - 3/4 = 5/4 = 1 tam 1/4 litre kalır."),
            ("0,7 + 0,2 işleminin sonucu kaçtır?", ["A) 0,5", "B) 0,9", "C) 0,14", "D) 0,09"], "B", "0,7 + 0,2 = 0,9."),
            ("Aşağıdakilerden hangisi yarıma (0,5 veya 1/2) eşittir?", ["A) 2/5", "B) 5/10", "C) 3/8", "D) 4/10"], "B", "5/10 sadeleştirildiğinde 1/2 (yarım) olur.")
        ]

    questions = []
    for i, (q_text, opts, corr, sol) in enumerate(raw, 1):
        questions.append({
            "num": i,
            "text": q_text,
            "options": opts,
            "correct": corr,
            "solution": sol
        })
    return questions
