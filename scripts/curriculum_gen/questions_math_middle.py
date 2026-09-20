# -*- coding: utf-8 -*-
"""
Authentic Math Question Generator for Middle School Grades 5-8.
Covers:
- 5. Sınıf Doğal Sayılar & Üslü Sayılar
- 5. Sınıf Kesirler & Toplama Çıkarma
- 6. Sınıf Kesirlerle İşlemler (Çarpma, Bölme)
- 6. Sınıf Çarpanlar ve Katlar & Bölünebilme
- 6. Sınıf Tam Sayılar & Mutlak Değer
- 7. Sınıf Tam Sayılarla Dört İşlem
- 7. Sınıf Rasyonel Sayılar ve İşlemler
- 7. Sınıf Birinci Dereceden Denklemler
- 8. Sınıf EBOB-EKOK Yeni Nesil
- 8. Sınıf Üslü İfadeler ve Bilimsel Gösterim
- 8. Sınıf Kareköklü İfadeler ve Gerçek Sayılar
"""

def get_math_middle_questions(slug):
    raw = []
    if "5-sinif-matematik-dogal-sayilar" in slug:
        raw = [
            ("5³ (5'in küpü) üslü ifadesinin sayısal değeri kaçtır?", ["A) 15", "B) 25", "C) 125", "D) 625"], "C", "5³ = 5 × 5 × 5 = 125."),
            ("8² (8'in karesi) üslü ifadesinin sayısal değeri kaçtır?", ["A) 16", "B) 64", "C) 128", "D) 512"], "B", "8² = 8 × 8 = 64."),
            ("12 + 4 × 3 işlem önceliğine göre bu işlemin sonucu kaçtır?", ["A) 48", "B) 24", "C) 36", "D) 20"], "B", "Önce çarpma yapılır: 4 × 3 = 12. Sonra toplama: 12 + 12 = 24."),
            ("(15 - 5) × 4 işleminin sonucu kaçtır?", ["A) 35", "B) 40", "C) 45", "D) 50"], "B", "Önce parantez içi: 15 - 5 = 10. Sonra çarpma: 10 × 4 = 40."),
            ("72 054 108 sayısının milyonlar basamağındaki rakam kaçtır?", ["A) 7", "B) 2", "C) 0", "D) 5"], "B", "Milyonlar basamağındaki rakam 2'dir (7 ise on milyonlar basamağındadır)."),
            ("3⁴ üslü ifadesinin eşiti kaçtır?", ["A) 12", "B) 27", "C) 81", "D) 243"], "C", "3⁴ = 3 × 3 × 3 × 3 = 81."),
            ("10³ sayısının değeri kaçtır?", ["A) 30", "B) 100", "C) 1000", "D) 10000"], "C", "10³ = 10 × 10 × 10 = 1000."),
            ("6² + 2³ işleminin sonucu kaçtır?", ["A) 42", "B) 44", "C) 48", "D) 50"], "B", "6² = 36, 2³ = 8. 36 + 8 = 44."),
            ("48 ÷ (8 - 2) işleminin sonucu kaçtır?", ["A) 4", "B) 6", "C) 8", "D) 10"], "C", "Parantez içi: 8 - 2 = 6. 48 ÷ 6 = 8."),
            ("Bir sayının karesi 49 ise bu sayı kaçtır?", ["A) 6", "B) 7", "C) 8", "D) 9"], "B", "7 × 7 = 49 olduğundan sayı 7'dir."),
            ("25 × (14 + 6) işleminin sonucu kaçtır?", ["A) 450", "B) 500", "C) 550", "D) 600"], "B", "Parantez içi: 14 + 6 = 20. 25 × 20 = 500."),
            ("50 - 10 ÷ 2 işleminin sonucu kaçtır?", ["A) 20", "B) 45", "C) 40", "D) 25"], "B", "Önce bölme yapılır: 10 ÷ 2 = 5. 50 - 5 = 45."),
            ("9² - 4² işleminin sonucu kaçtır?", ["A) 65", "B) 25", "C) 49", "D) 75"], "A", "9² = 81, 4² = 16. 81 - 16 = 65."),
            ("Aşağıdaki eşitliklerden hangisi doğrudur?", ["A) 2³ = 6", "B) 3² = 9", "C) 4² = 8", "D) 1⁵ = 5"], "B", "3² = 3 × 3 = 9 doğrudur."),
            ("Bir çiftlikte tavuk ve koyunların ayak sayıları toplamı hesaplanırken parantezli işlem yapılıyor. 12 tavuk ve 8 koyunun toplam ayak sayısı kaçtır?", ["A) 52", "B) 56", "C) 60", "D) 64"], "B", "(12 × 2) + (8 × 4) = 24 + 32 = 56."),
            ("4³ - 2⁴ işleminin sonucu kaçtır?", ["A) 48", "B) 32", "C) 16", "D) 64"], "A", "4³ = 64, 2⁴ = 16. 64 - 16 = 48."),
            ("30 + 15 × 2 - 10 işleminin sonucu kaçtır?", ["A) 80", "B) 50", "C) 60", "D) 40"], "B", "Önce çarpma: 15 × 2 = 30. 30 + 30 - 10 = 50."),
            ("Tabanı 4, üssü 3 olan üslü ifade nasıl yazılır?", ["A) 3⁴", "B) 4³", "C) 4 × 3", "D) 34"], "B", "Taban alta, üs üste yazılır: 4³."),
            ("Sıfırdan farklı her doğal sayının 0. kuvveti kaça eşittir?", ["A) 0", "B) 1", "C) Kendisine", "D) 10"], "B", "a⁰ = 1 kuralına göre 1'e eşittir."),
            ("100 - (5² + 5) işleminin sonucu kaçtır?", ["A) 60", "B) 70", "C) 75", "D) 80"], "B", "Parantez içi: 5² + 5 = 25 + 5 = 30. 100 - 30 = 70.")
        ]
    elif "5-sinif-matematik-kesirler" in slug:
        raw = [
            ("1/3 kesrinin 4 ile genişletilmiş hali hangisidir?", ["A) 4/7", "B) 4/12", "C) 1/12", "D) 3/12"], "B", "Pay ve payda 4 ile çarpılır: (1×4)/(3×4) = 4/12."),
            ("15/20 kesrinin en sade hali aşağıdakilerden hangisidir?", ["A) 3/4", "B) 5/4", "C) 3/5", "D) 1/2"], "A", "Her iki taraf 5 ile sadeleştirilir: 15÷5 = 3, 20÷5 = 4. Sonuç: 3/4."),
            ("2/5 + 1/10 işleminin sonucu kaçtır?", ["A) 3/15", "B) 1/2", "C) 3/10", "D) 4/10"], "B", "Payda eşitlenir (2 ile genişletilir): 4/10 + 1/10 = 5/10 = 1/2."),
            ("5/6 - 1/3 işleminin sonucu kaçtır?", ["A) 4/3", "B) 1/2", "C) 3/6", "D) B ve C doğru"], "D", "1/3 = 2/6. 5/6 - 2/6 = 3/6 = 1/2."),
            ("1 tam 1/4 + 2 tam 1/2 işleminin sonucu kaçtır?", ["A) 3 tam 3/4", "B) 3 tam 2/4", "C) 4 tam 1/4", "D) 3 tam 1/6"], "A", "2 tam 1/2 = 2 tam 2/4. Toplam: 3 tam 3/4."),
            ("2/7, 5/7, 3/7 kesirlerinin küçükten büyüğe sıralanışı nasıldır?", ["A) 5/7 < 3/7 < 2/7", "B) 2/7 < 3/7 < 5/7", "C) 3/7 < 2/7 < 5/7", "D) 2/7 < 5/7 < 3/7"], "B", "Paydaları eşit kesirlerde payı küçük olan küçüktür: 2/7 < 3/7 < 5/7."),
            ("1/2, 1/4, 1/3 kesirlerinin büyükten küçüğe sıralanışı nasıldır?", ["A) 1/4 > 1/3 > 1/2", "B) 1/2 > 1/3 > 1/4", "C) 1/3 > 1/2 > 1/4", "D) 1/2 > 1/4 > 1/3"], "B", "Birim kesirlerde paydası küçük olan büyüktür: 1/2 > 1/3 > 1/4."),
            ("3 - 4/5 işleminin sonucu kaçtır?", ["A) 2 tam 1/5 (11/5)", "B) 1 tam 1/5", "C) 2 tam 4/5", "D) 7/5"], "A", "3 = 15/5. 15/5 - 4/5 = 11/5 = 2 tam 1/5."),
            ("Bir sürahideki 7/8 litre sütün 3/8 litresi içilirse kaç litre süt kalır?", ["A) 4/8 (1/2)", "B) 10/8", "C) 1/8", "D) 5/8"], "A", "7/8 - 3/8 = 4/8 = 1/2 litre kalır."),
            ("4/9 kesri hangi sayı ile genişletilirse paydası 36 olur?", ["A) 3", "B) 4", "C) 5", "D) 6"], "B", "36 ÷ 9 = 4 olduğundan 4 ile genişletilmelidir."),
            ("18/24 kesrinin pay ve paydası hangi sayıya bölünerek sadeleştirilemez?", ["A) 2", "B) 3", "C) 5", "D) 6"], "C", "18 ve 24 sayıları 5'e kalansız bölünemez."),
            ("3 tam 2/5 kesri bileşik kesir olarak nasıl ifade edilir?", ["A) 17/5", "B) 15/5", "C) 11/5", "D) 13/5"], "A", "(3 × 5 + 2)/5 = 17/5."),
            ("22/7 kesri tam sayılı kesre çevrilirse tam kısmı kaç olur?", ["A) 2", "B) 3", "C) 4", "D) 5"], "B", "22 = 7 × 3 + 1 -> 3 tam 1/7."),
            ("1/4 + 1/8 + 1/2 işleminin sonucu kaçtır?", ["A) 3/14", "B) 7/8", "C) 5/8", "D) 3/8"], "B", "Paydalar 8'de eşitlenir: 2/8 + 1/8 + 4/8 = 7/8."),
            ("Hangi iki kesir birbirine denktir?", ["A) 2/3 ve 4/6", "B) 1/2 ve 2/5", "C) 3/4 ve 6/10", "D) 2/7 ve 4/15"], "A", "2/3 kesri 2 ile genişletilirse 4/6 elde edilir."),
            ("Bir çuval unun önce 2/9'u, sonra 4/9'u satıldı. Çuvalda unun kaçta kaçı kaldı?", ["A) 6/9", "B) 3/9 (1/3)", "C) 2/9", "D) 1/9"], "B", "Satılan = 2/9 + 4/9 = 6/9. Kalan = 1 - 6/9 = 3/9 = 1/3."),
            ("2 tam 1/3 - 1 tam 2/3 işleminin sonucu kaçtır?", ["A) 1", "B) 2/3", "C) 1 tam 1/3", "D) 1/3"], "B", "7/3 - 5/3 = 2/3."),
            ("Aşağıdaki kesirlerden hangisi 1'e (bütüne) en yakındır?", ["A) 1/6", "B) 3/6", "C) 5/6", "D) 2/6"], "C", "5/6'nın bütüne uzaklığı sadece 1/6'dır, en yakındır."),
            ("Ali parasının 3/10'unu kitaba, 2/5'ini deftere harcadı. Toplam kaçta kaçını harcadı?", ["A) 5/15", "B) 7/10", "C) 1/2", "D) 6/10"], "B", "2/5 = 4/10. 3/10 + 4/10 = 7/10 harcadı."),
            ("7/12 + ? = 11/12 işleminde verilmeyen kesir kaçtır?", ["A) 3/12", "B) 4/12 (1/3)", "C) 5/12", "D) 2/12"], "B", "11/12 - 7/12 = 4/12 = 1/3.")
        ]
    elif "6-sinif-matematik-carpanlar" in slug:
        raw = [
            ("24 sayısının pozitif çarpan sayısı (bölen sayısı) kaçtır?", ["A) 6", "B) 8", "C) 10", "D) 12"], "B", "24'ün çarpanları: 1, 2, 3, 4, 6, 8, 12, 24 olmak üzere 8 tanedir."),
            ("Aşağıdakilerden hangisi bir asal sayıdır?", ["A) 1", "B) 9", "C) 15", "D) 17"], "D", "17 yalnızca 1'e ve kendisine bölündüğü için asal sayıdır."),
            ("En küçük asal sayı ve tek çift asal sayı hangisidir?", ["A) 0", "B) 1", "C) 2", "D) 3"], "C", "2 en küçük asal sayıdır ve çift olan tek asal sayıdır."),
            ("Aşağıdaki sayılardan hangisi 3 ile kalansız bölünür?", ["A) 124", "B) 235", "C) 432", "D) 511"], "C", "Rakamları toplamı: 4 + 3 + 2 = 9. 9, 3'ün katı olduğu için 432 kalansız bölünür."),
            ("Son iki basamağı 00 veya 4'ün katı olan sayılar hangi sayıya kalansız bölünür?", ["A) 3", "B) 4", "C) 5", "D) 6"], "B", "4 ile bölünebilme kuralıdır."),
            ("Birler basamağı 0 veya 5 olan tüm doğal sayılar hangi sayıya kalansız bölünür?", ["A) 2", "B) 3", "C) 4", "D) 5"], "D", "5 ile bölünebilme kuralı gereği birler basamağı 0 veya 5 olmalıdır."),
            ("Hem 2'ye hem de 3'e kalansız bölünebilen bir sayı hangi sayıya da kesinlikle kalansız bölünür?", ["A) 5", "B) 6", "C) 8", "D) 9"], "B", "2 ve 3 aralarında asaldır, dolayısıyla 6 ile kalansız bölünür."),
            ("60 sayısının asal çarpanları aşağıdakilerden hangisidir?", ["A) 2, 3 ve 5", "B) 2 ve 3", "C) 3 ve 5", "D) 2, 4 ve 6"], "A", "60 = 2² × 3 × 5. Asal çarpanlar 2, 3 ve 5'tir."),
            ("9 ile bölünebilme kuralı aşağıdakilerden hangisidir?", ["A) Son basamağı 9 olmalıdır", "B) Rakamları toplamı 9 veya 9'un katı olmalıdır", "C) Çift olmalıdır", "D) 3 ile bitmelidir"], "B", "Bir sayının 9'a kalansız bölünmesi için rakamları toplamı 9'un katı olmalıdır."),
            ("3A4 sayısı 3 ile kalansız bölünebildiğine göre A yerine yazılabilecek rakamların toplamı kaçtır?", ["A) 12", "B) 15", "C) 18", "D) 9"], "B", "3 + A + 4 = 7 + A. 7 + A'nın 3'ün katı olması için A = 2, 5, 8 olabilir. Toplam: 2 + 5 + 8 = 15."),
            ("50 sayısının çarpanlarından kaç tanesi asaldır?", ["A) 1", "B) 2", "C) 3", "D) 4"], "B", "50'nin çarpanları: 1, 2, 5, 10, 25, 50. Asal olanlar: 2 ve 5 (2 tanedir)."),
            ("Aşağıdakilerden hangisi 10 ile kalansız bölünür?", ["A) 405", "B) 530", "C) 612", "D) 725"], "B", "Birler basamağı 0 olan sayılar 10 ile kalansız bölünür."),
            ("İki basamaklı en büyük asal sayı kaçtır?", ["A) 91", "B) 93", "C) 97", "D) 99"], "C", "97 asal sayıdır. (91 = 7 × 13'tür)."),
            ("1 sayısı neden asal sayı değildir?", ["A) Çift olduğu için", "B) Yalnızca 1 pozitif böleni olduğu için (asal sayıların tam olarak 2 farklı böleni olmalıdır)", "C) Negatif olduğu için", "D) Tek olduğu için"], "B", "Asal sayılar 1 ve kendisi olmak üzere tam olarak 2 farklı pozitif bölene sahip olmalıdır."),
            ("45 sayısının asal çarpanlarına ayrılmış hali hangisidir?", ["A) 3 × 15", "B) 3² × 5", "C) 9 × 5", "D) 5² × 3"], "B", "45 = 9 × 5 = 3² × 5."),
            ("Aşağıdaki sayılardan hangisi hem 4 hem de 5 ile tam bölünür?", ["A) 125", "B) 140", "C) 155", "D) 170"], "B", "140'ın son basamağı 0 (5'e bölünür), son iki basamağı 40 (4'e bölünür)."),
            ("18 ve 24 sayılarının ortak bölenlerinden en büyüğü kaçtır?", ["A) 3", "B) 6", "C) 8", "D) 12"], "B", "18 ve 24'ün ortak bölenleri 1, 2, 3, 6'dır. En büyüğü 6'dır."),
            ("90 sayısının asal çarpan sayısı kaçtır?", ["A) 2", "B) 3", "C) 4", "D) 5"], "B", "90 = 2 × 3² × 5. Asal çarpanları 2, 3, 5 olmak üzere 3 tanedir."),
            ("7A2B dört basamaklı sayısı 10 ile tam bölünmektedir. Bu sayı 3 ile de tam bölündüğüne göre A en fazla kaç olur?", ["A) 6", "B) 7", "C) 8", "D) 9"], "D", "10 ile bölündüğü için B = 0'dır. 7 + A + 2 + 0 = 9 + A. A en fazla 9 olabilir."),
            ("Aşağıdaki sayı ikililerinden hangisinin ortak çarpanı sadece 1'dir?", ["A) 8 ve 15", "B) 9 ve 12", "C) 14 ve 21", "D) 10 ve 25"], "A", "8 ve 15'in 1 dışında ortak böleni yoktur (aralarında asaldırlar).")
        ]
    elif "6-sinif-matematik-tam-sayilar" in slug:
        raw = [
            ("Deniz seviyesinin 15 metre altı tam sayılarla nasıl ifade edilir?", ["A) +15", "B) -15", "C) 0", "D) 1/15"], "B", "Deniz seviyesinin altı negatif tam sayılarla gösterilir: -15."),
            ("Sıfır (0) sayısı nasıl bir tam sayıdır?", ["A) Pozitif tam sayıdır", "B) Negatif tam sayıdır", "C) Başlangıç noktasıdır (işareti yoktur, nötrdür)", "D) Asal sayıdır"], "C", "Sıfır ne pozitif ne negatiftir; referans (başlangıç) noktasıdır."),
            ("|-8| ( -8'in mutlak değeri) kaçtır?", ["A) -8", "B) +8", "C) 0", "D) 1/8"], "B", "Mutlak değer bir sayının başlangıç noktasına uzaklığıdır ve daima pozitif veya sıfırdır: |-8| = 8."),
            ("-12 ile +5 arasındaki tam sayılardan en büyüğü hangisidir?", ["A) +5", "B) +4", "C) 0", "D) -1"], "B", "Arasındaki dendiği için +5 dahil değildir, en büyüğü +4'tür."),
            ("Aşağıdaki sıralamalardan hangisi doğrudur?", ["A) -5 > -2", "B) -10 > +1", "C) -7 < -3 < +2", "D) 0 < -4"], "C", "Sayı doğrusunda sağdaki sayı daima büyüktür: -7 < -3 < +2."),
            ("İki basamaklı en büyük negatif tam sayı kaçtır?", ["A) -99", "B) -10", "C) -11", "D) -1"], "B", "Negatif sayılar sıfıra yaklaştıkça büyür. İki basamaklı en büyük negatif tam sayı -10'dur."),
            ("İki basamaklı en küçük negatif tam sayı kaçtır?", ["A) -10", "B) -99", "C) -90", "D) -1"], "B", "Sıfırdan en uzak iki basamaklı negatif sayı -99'dur."),
            ("Hangi sayının mutlak değeri kendisine eşittir?", ["A) Yalnız negatif sayıların", "B) Sıfır ve pozitif tam sayıların", "C) Sadece -1'in", "D) Hiçbir sayının"], "B", "|x| = x olması için x ≥ 0 olmalıdır."),
            ("Sayı doğrusunda -4 sayısının 6 birim sağındaki sayı kaçtır?", ["A) -10", "B) +2", "C) -2", "D) +10"], "B", "-4 + 6 = +2."),
            ("Bir dondurucunun sıcaklığı -18 °C'dir. Sıcaklık 5 °C artarsa yeni sıcaklık kaç °C olur?", ["A) -23 °C", "B) -13 °C", "C) +13 °C", "D) -15 °C"], "B", "-18 + 5 = -13 °C."),
            ("Mutlak değeri 7 olan tam sayılar hangileridir?", ["A) Yalnızca +7", "B) Yalnızca -7", "C) -7 ve +7", "D) 0 ve 7"], "C", "|+7| = 7 ve |-7| = 7 olduğundan iki farklı sayı vardır."),
            ("En büyük negatif tam sayı kaçtır?", ["A) 0", "B) -1", "C) -99", "D) -∞"], "B", "Sıfırdan bir önceki tam sayı olan -1, en büyük negatif tam sayıdır."),
            ("|-15| ... |+12| ifadesinde noktalı yere hangi sembol gelmelidir?", ["A) <", "B) >", "C) =", "D) ≤"], "B", "|-15| = 15, |+12| = 12. 15 > 12 olduğundan '>' gelmelidir."),
            ("Aşağıdaki ifadelerden hangisi yanlıştır?", ["A) Bütün negatif tam sayılar 0'dan küçüktür.", "B) Bütün pozitif tam sayılar negatif tam sayılardan büyüktür.", "C) Mutlak değer negatif bir sayıya eşit olabilir.", "D) Sıfırın mutlak değeri sıfırdır."], "C", "Uzaklık negatif olamayacağı için mutlak değer asla negatif olamaz."),
            ("Termometre gündüz +8 °C'yi, gece ise -4 °C'yi gösteriyor. Sıcaklık farkı kaç derecedir?", ["A) 4", "B) 8", "C) 12", "D) 16"], "C", "+8 ile -4 arasındaki fark: 8 - (-4) = 8 + 4 = 12 °C'dir."),
            ("Sayı doğrusunda -3 ile +3 arasında kaç tane tam sayı vardır?", ["A) 5", "B) 6", "C) 7", "D) 4"], "A", "-2, -1, 0, +1, +2 olmak üzere 5 tane tam sayı vardır."),
            ("Hangi sayının mutlak değeri en büyüktür?", ["A) +9", "B) -14", "C) 0", "D) -10"], "B", "|-14| = 14 en büyüktür."),
            ("Bir asansör 4. kattan 6 kat aşağı inerse hangi kata ulaşır?", ["A) -1. kat", "B) -2. kat", "C) 0. kat", "D) -3. kat"], "B", "4 - 6 = -2. kata ulaşır."),
            ("-20, +15, -3, 0, +7 sayılarından kaç tanesi negatiftir?", ["A) 1", "B) 2", "C) 3", "D) 4"], "B", "-20 ve -3 olmak üzere 2 tanesi negatiftir (0 nötrdür)."),
            ("x bir tam sayı olmak üzere |x| < 3 şartını sağlayan kaç farklı x tam sayısı vardır?", ["A) 3", "B) 4", "C) 5", "D) 6"], "C", "-2, -1, 0, 1, 2 olmak üzere 5 tam sayı sağlar.")
        ]
    elif "7-sinif-matematik-tam-sayilarla" in slug:
        raw = [
            ("(-12) + (+7) işleminin sonucu kaçtır?", ["A) -19", "B) -5", "C) +5", "D) +19"], "B", "Zıt işaretli sayılar toplanırken mutlak değeri büyük olandan küçük çıkarılır, büyüğün işareti verilir: -5."),
            ("(-8) - (-15) işleminin sonucu kaçtır?", ["A) -23", "B) +7", "C) -7", "D) +23"], "B", "İki eksi yan yana gelince artı olur: (-8) + 15 = +7."),
            ("(-6) × (-4) işleminin sonucu kaçtır?", ["A) -24", "B) +24", "C) -10", "D) +10"], "B", "Aynı işaretli iki sayının çarpımı pozitiftir: (-) × (-) = (+). Sonuç: +24."),
            ("(-36) ÷ (+9) işleminin sonucu kaçtır?", ["A) -4", "B) +4", "C) -6", "D) +6"], "A", "Zıt işaretli sayıların bölümü negatiftir: (-) ÷ (+) = (-). Sonuç: -4."),
            ("(-3)³ üslü ifadesinin değeri kaçtır?", ["A) +27", "B) -27", "C) -9", "D) +9"], "B", "Negatif sayının tek kuvveti negatiftir: (-3) × (-3) × (-3) = -27."),
            ("(-4)² üslü ifadesinin değeri kaçtır?", ["A) -16", "B) +16", "C) -8", "D) +8"], "B", "Negatif sayının çift kuvveti pozitiftir: (-4) × (-4) = +16."),
            ("-5² ifadesinin değeri kaçtır?", ["A) +25", "B) -25", "C) +10", "D) -10"], "B", "Parantez olmadığı için üs yalnızca 5'e aittir, eksiye etki etmez: -(5²) = -25."),
            ("(-2)⁴ + (-1)⁵ işleminin sonucu kaçtır?", ["A) 15", "B) 17", "C) -17", "D) -15"], "A", "(-2)⁴ = +16, (-1)⁵ = -1. 16 + (-1) = 15."),
            ("(-10) + (-5) × (+2) işlem önceliğine göre sonuç kaçtır?", ["A) -30", "B) -20", "C) 0", "D) +20"], "B", "Önce çarpma: (-5) × (+2) = -10. Toplama: (-10) + (-10) = -20."),
            ("Bir dağcı her 100 metre tırmanışta sıcaklığın 1 °C düştüğünü biliyor. Dağın eteğinde sıcaklık +6 °C iken 1200 metre zirvede sıcaklık kaç °C olur?", ["A) -4 °C", "B) -6 °C", "C) -8 °C", "D) +18 °C"], "B", "1200 ÷ 100 = 12 defa 1 °C düşer. +6 - 12 = -6 °C."),
            ("Hangi işlemin sonucu negatiftir?", ["A) (-4) × (-5)", "B) (-2)⁶", "C) (-3) × (+7)", "D) |-9|"], "C", "Zıt işaretlilerin çarpımı negatiftir: (-3) × (+7) = -21."),
            ("[(-18) ÷ (-3)] - (+4) işleminin sonucu kaçtır?", ["A) +2", "B) -2", "C) +10", "D) -10"], "A", "(-18) ÷ (-3) = +6. +6 - 4 = +2."),
            ("(-1)¹⁰⁰ + (-1)¹⁰¹ işleminin sonucu kaçtır?", ["A) 2", "B) 0", "C) -2", "D) 1"], "B", "(-1)¹⁰⁰ = +1, (-1)¹⁰¹ = -1. 1 + (-1) = 0."),
            ("a = -4 ve b = -3 olduğuna göre a × b - (a + b) işleminin sonucu kaçtır?", ["A) 5", "B) 19", "C) -19", "D) 7"], "B", "a × b = 12. a + b = -7. 12 - (-7) = 12 + 7 = 19."),
            ("Bir tüccar pazartesi günü 450 TL kâr, salı günü 600 TL zarar etmiştir. İki günün sonundaki durumu nedir?", ["A) 150 TL kâr", "B) 150 TL zarar (-150)", "C) 1050 TL kâr", "D) Başa baş"], "B", "+450 - 600 = -150 (150 TL zarar)."),
            ("(-8) - (+12) + (-5) işleminin sonucu kaçtır?", ["A) -25", "B) -9", "C) +9", "D) -15"], "A", "(-8) - 12 - 5 = -25."),
            ("(-60) ÷ [(-5) + (+2)] işleminin sonucu kaçtır?", ["A) -20", "B) +20", "C) -12", "D) +12"], "B", "Köşeli parantez: -5 + 2 = -3. (-60) ÷ (-3) = +20."),
            ("x × (-7) = +42 olduğuna göre x kaçtır?", ["A) +6", "B) -6", "C) +7", "D) -7"], "B", "x = 42 ÷ (-7) = -6."),
            ("Aşağıdakilerden hangisi yanlıştır?", ["A) (-1) × a = -a", "B) 0 ÷ (-5) = 0", "C) (-5) ÷ 0 = 0", "D) a × 1 = a"], "C", "Sıfıra bölme tanımsızdır, sıfır olamaz."),
            ("(-2)³ × (-1)⁴ işleminin sonucu kaçtır?", ["A) +8", "B) -8", "C) +16", "D) -16"], "B", "(-2)³ = -8, (-1)⁴ = +1. -8 × 1 = -8.")
        ]
    elif "7-sinif-matematik-rasyonel" in slug:
        raw = [
            ("a/b şeklinde yazılabilen sayılara rasyonel sayı denir (b ≠ 0). Buna göre hangisi rasyonel sayı değildir?", ["A) -3/4", "B) 0", "C) 5/0", "D) 2 tam 1/3"], "C", "Paydası sıfır olan ifadeler tanımsızdır, rasyonel sayı belirtmez."),
            ("-3/5 rasyonel sayısının ondalık gösterimi nedir?", ["A) -0,3", "B) -0,6", "C) -0,35", "D) -0,06"], "B", "2 ile genişletilirse: -6/10 = -0,6."),
            ("0,333... (0,3 devirli) sayısının rasyonel karşılığı nedir?", ["A) 1/3", "B) 3/10", "C) 3/100", "D) 3/4"], "A", "3/9 = 1/3."),
            ("(-2/3) + (1/4) işleminin sonucu kaçtır?", ["A) -1/12", "B) -5/12", "C) -7/12", "D) 5/12"], "B", "Payda 12'de eşitlenir: -8/12 + 3/12 = -5/12."),
            ("(-3/4) × (-8/9) işleminin sonucu kaçtır?", ["A) -2/3", "B) +2/3", "C) -6/13", "D) +3/4"], "B", "Eksiler çarpımı artı olur: (3×8)/(4×9) = 24/36 = 2/3."),
            ("(4/5) ÷ (-2/15) işleminin sonucu kaçtır?", ["A) -6", "B) +6", "C) -8/75", "D) +8/75"], "A", "(4/5) × (-15/2) = -(4×15)/(5×2) = -60/10 = -6."),
            ("(-2/3)² üslü ifadesinin sonucu kaçtır?", ["A) -4/9", "B) +4/9", "C) -4/6", "D) +4/6"], "B", "Çift kuvvet pozitiftir: (-2/3) × (-2/3) = +4/9."),
            ("(-1/2)³ üslü ifadesinin sonucu kaçtır?", ["A) -1/8", "B) +1/8", "C) -1/6", "D) +1/6"], "A", "Tek kuvvet negatiftir: -1/8."),
            ("1 / (1/3) işleminin sonucu kaçtır?", ["A) 1/3", "B) 3", "C) 1", "D) 9"], "B", "1 × 3/1 = 3."),
            ("Merdivenli işlem: 1 + 1/(1 + 1/2) işleminin sonucu kaçtır?", ["A) 3/2", "B) 5/3", "C) 4/3", "D) 2"], "B", "Payda: 1 + 1/2 = 3/2. 1 / (3/2) = 2/3. Sonuç: 1 + 2/3 = 5/3."),
            ("-4/7 mi daha büyüktür yoksa -2/7 mi?", ["A) -4/7 büyüktür", "B) -2/7 büyüktür", "C) Birbirine eşittir", "D) Kıyaslanamaz"], "B", "Negatif sayılarda sıfıra yakın olan daha büyüktür: -2/7 > -4/7."),
            ("0,45 devirli (yalnızca 5 devrediyor: 0,45̄) sayısı rasyonel olarak nasıl yazılır?", ["A) 45/99", "B) 41/90", "C) 45/90", "D) 41/99"], "B", "(Tüm sayı - Devretmeyen kısım) / (Devreden kadar 9, devretmeyen kadar 0) = (45 - 4)/90 = 41/90."),
            ("(-3/8) sayısının toplama işlemine göre tersi nedir?", ["A) -8/3", "B) +3/8", "C) +8/3", "D) 1"], "B", "Toplama işlemine göre tersi işaret değiştirmektir: +3/8."),
            ("(-3/8) sayısının çarpma işlemine göre tersi nedir?", ["A) +3/8", "B) -8/3", "C) +8/3", "D) -1"], "B", "Çarpma işlemine göre tersi pay ve paydanın yer değiştirmesidir: -8/3."),
            ("(1 - 1/2) × (1 - 1/3) × (1 - 1/4) işleminin sonucu kaçtır?", ["A) 1/2", "B) 1/4", "C) 1/8", "D) 1/12"], "B", "(1/2) × (2/3) × (3/4) = 1/4."),
            ("Hangi rasyonel sayı sayı doğrusunda -1 ile -2 arasındadır?", ["A) -1/2", "B) -3/2", "C) -5/2", "D) -2/3"], "B", "-3/2 = -1,5'tir ve -1 ile -2 arasındadır."),
            ("(-2 tam 1/4) bileşik kesir olarak nasıl yazılır?", ["A) -9/4", "B) -7/4", "C) 9/4", "D) -8/4"], "A", "-(2 × 4 + 1)/4 = -9/4."),
            ("3/4 ÷ 3 işleminin sonucu kaçtır?", ["A) 1", "B) 1/4", "C) 9/4", "D) 3/12"], "B", "3/4 × 1/3 = 1/4."),
            ("(-5/6) - (-1/2) işleminin sonucu kaçtır?", ["A) -1/3", "B) -4/6", "C) +1/3", "D) -1/6"], "A", "-5/6 + 3/6 = -2/6 = -1/3."),
            ("Bir sayının 3/5'i ile 1/2'sinin farkı 6 olduğuna göre bu sayı kaçtır?", ["A) 40", "B) 50", "C) 60", "D) 70"], "C", "3/5 - 1/2 = 6/10 - 5/10 = 1/10. Sayının 1/10'u 6 ise tamamı 6 × 10 = 60'tır.")
        ]
    elif "7-sinif-matematik-birinci-dereceden" in slug:
        raw = [
            ("3x + 5 = 26 denkleminde x kaçtır?", ["A) 5", "B) 7", "C) 8", "D) 9"], "B", "3x = 26 - 5 = 21 -> x = 21/3 = 7."),
            ("4x - 8 = 16 denkleminde x kaçtır?", ["A) 4", "B) 6", "C) 8", "D) 2"], "B", "4x = 24 -> x = 6."),
            ("2(x + 3) = 18 denkleminde x kaçtır?", ["A) 5", "B) 6", "C) 7", "D) 9"], "B", "x + 3 = 9 -> x = 6."),
            ("5x - 3 = 2x + 12 denkleminde x kaçtır?", ["A) 3", "B) 4", "C) 5", "D) 6"], "C", "5x - 2x = 12 + 3 -> 3x = 15 -> x = 5."),
            ("Hangi sayının 4 katının 6 fazlası 38 eder?", ["A) 7", "B) 8", "C) 9", "D) 10"], "B", "4x + 6 = 38 -> 4x = 32 -> x = 8."),
            ("3(2x - 1) = 27 denkleminde x kaçtır?", ["A) 4", "B) 5", "C) 6", "D) 7"], "B", "2x - 1 = 9 -> 2x = 10 -> x = 5."),
            ("x/3 + 4 = 9 denkleminde x kaçtır?", ["A) 12", "B) 15", "C) 18", "D) 21"], "B", "x/3 = 5 -> x = 15."),
            ("Bir babanın yaşı, oğlunun yaşının 3 katından 4 fazladır. İkisinin yaşları toplamı 48 olduğuna göre oğlu kaç yaşındadır?", ["A) 10", "B) 11", "C) 12", "D) 13"], "B", "Oğul = x, Baba = 3x + 4. x + 3x + 4 = 48 -> 4x = 44 -> x = 11."),
            ("7x - 15 = 3x + 9 denkleminde x kaçtır?", ["A) 4", "B) 6", "C) 8", "D) 10"], "B", "4x = 24 -> x = 6."),
            ("-(x - 4) = 9 denkleminde x kaçtır?", ["A) 5", "B) -5", "C) 13", "D) -13"], "B", "-x + 4 = 9 -> -x = 5 -> x = -5."),
            ("3x + 2(x - 4) = 22 denkleminde x kaçtır?", ["A) 5", "B) 6", "C) 7", "D) 8"], "B", "3x + 2x - 8 = 22 -> 5x = 30 -> x = 6."),
            ("Hangi sayının 3 eksiğinin 5 katı 45 eder?", ["A) 9", "B) 12", "C) 15", "D) 18"], "B", "5(x - 3) = 45 -> x - 3 = 9 -> x = 12."),
            ("(x + 2) / 4 = 5 denkleminde x kaçtır?", ["A) 18", "B) 20", "C) 22", "D) 16"], "A", "x + 2 = 20 -> x = 18."),
            ("Ardışık üç tam sayının toplamı 42 olduğuna göre en küçük sayı kaçtır?", ["A) 12", "B) 13", "C) 14", "D) 15"], "B", "x + (x+1) + (x+2) = 42 -> 3x + 3 = 42 -> 3x = 39 -> x = 13."),
            ("4x + 10 = 2(2x + 5) denkleminin çözüm kümesi nedir?", ["A) Boş küme (Ø)", "B) Tüm gerçek sayılar (Sonsuz eleman)", "C) Yalnızca x=0", "D) Yalnızca x=5"], "B", "4x + 10 = 4x + 10 eşitliği her x reel sayısı için daima doğrudur."),
            ("3x + 7 = 3x - 2 denkleminin çözüm kümesi nedir?", ["A) Boş küme (Ø)", "B) Gerçek sayılar", "C) x=0", "D) x=7"], "A", "3x'ler sadeleşirse 7 = -2 çelişkisi doğar; çözüm kümesi boş kümedir."),
            ("Bir sınıftaki öğrenciler sıralara ikişer ikişer oturursa 4 öğrenci ayakta kalıyor, üçer üçer oturursa 2 sıra boş kalıyor. Sınıfta kaç sıra vardır?", ["A) 8", "B) 10", "C) 12", "D) 14"], "B", "Sıra sayısı = x. 2x + 4 = 3(x - 2) -> 2x + 4 = 3x - 6 -> x = 10 sıra vardır."),
            ("5(x - 1) - 2(x + 3) = 10 denkleminde x kaçtır?", ["A) 6", "B) 7", "C) 8", "D) 9"], "B", "5x - 5 - 2x - 6 = 10 -> 3x - 11 = 10 -> 3x = 21 -> x = 7."),
            ("2x/5 = 8 denkleminde x kaçtır?", ["A) 16", "B) 20", "C) 24", "D) 40"], "B", "2x = 40 -> x = 20."),
            ("Ali'nin parası Veli'nin parasının 2 katıdır. Ali Veli'ye 30 TL verirse paraları eşitleniyor. Başlangıçta Ali'nin kaç TL'si vardı?", ["A) 60", "B) 120", "C) 90", "D) 150"], "B", "Veli = x, Ali = 2x. 2x - 30 = x + 30 -> x = 60 TL (Veli). Ali = 2 × 60 = 120 TL.")
        ]
    elif "8-sinif-matematik-carpanlar" in slug:
        raw = [
            ("24 ve 36 sayılarının en büyük ortak böleni (EBOB) kaçtır?", ["A) 6", "B) 12", "C) 18", "D) 24"], "B", "EBOB(24, 36): 24 = 2³ × 3, 36 = 2² × 3² -> 2² × 3 = 12."),
            ("12 ve 15 sayılarının en küçük ortak katı (EKOK) kaçtır?", ["A) 30", "B) 60", "C) 90", "D) 180"], "B", "EKOK(12, 15): 12 = 2² × 3, 15 = 3 × 5 -> 2² × 3 × 5 = 60."),
            ("Aralarında asal iki sayının EBOB'u daima kaça eşittir?", ["A) 0", "B) 1", "C) Çarpımlarına", "D) Toplamlarına"], "B", "Aralarında asal sayıların 1 dışında ortak böleni olmadığı için EBOB = 1'dir."),
            ("Aralarında asal iki sayının EKOK'u neye eşittir?", ["A) 1'e", "B) Bu iki sayının çarpımına (a × b)", "C) Toplamlarına", "D) Farklarına"], "B", "EBOB(a,b) = 1 olduğundan EKOK(a,b) = a × b'dir."),
            ("Kenar uzunlukları 48 metre ve 60 metre olan dikdörtgen şeklindeki bir bahçenin etrafına eşit aralıklarla köşelere de gelmek şartıyla ağaç dikilecektir. En az kaç ağaç gerekir?", ["A) 16", "B) 18", "C) 20", "D) 24"], "B", "Aralık = EBOB(48, 60) = 12 m. Çevre = 2 × (48 + 60) = 216 m. Ağaç sayısı = 216 ÷ 12 = 18."),
            ("İki zilden biri 15 dakikada bir, diğeri 20 dakikada bir çalmaktadır. İlk kez birlikte çaldıktan kaç dakika sonra tekrar birlikte çalarlar?", ["A) 45", "B) 60", "C) 75", "D) 120"], "B", "EKOK(15, 20) = 60 dakika (1 saat) sonra birlikte çalarlar."),
            ("Aşağıdaki sayı çiftlerinden hangisi aralarında asaldır?", ["A) 9 ve 15", "B) 8 ve 25", "C) 14 ve 21", "D) 12 ve 18"], "B", "8'in asal çarpanı 2, 25'in asal çarpanı 5'tir. Ortak bölenleri sadece 1'dir."),
            ("EBOB(a, b) × EKOK(a, b) çarpımı neye eşittir?", ["A) a + b", "B) a × b", "C) (a × b) / 2", "D) a² + b²"], "B", "İki doğal sayının EBOB'u ile EKOK'unun çarpımı bu sayıların çarpımına eşittir: EBOB × EKOK = a × b."),
            ("Bir sınıftaki öğrenciler altışar ve sekizer sayıldığında her defasında 3 öğrenci artmaktadır. Sınıf mevcudu 60'tan az olduğuna göre en fazla kaç öğrencidir?", ["A) 48", "B) 51", "C) 54", "D) 57"], "B", "EKOK(6, 8) = 24. Katları: 24, 48. 3 artıyorsa: 48 + 3 = 51 öğrenci."),
            ("40 kg pirinç ve 56 kg bulgur birbirine karıştırılmadan eşit ağırlıktaki torbalara doldurulacaktır. Bir torba en fazla kaç kg alabilir?", ["A) 4", "B) 8", "C) 10", "D) 12"], "B", "Bütünden parçaya gidildiği için EBOB alınır: EBOB(40, 56) = 8 kg."),
            ("Ardışık iki pozitif tam sayı için hangisi kesinlikle doğrudur?", ["A) Daima çift sayılardır", "B) Daima aralarında asaldırlar (EBOB'ları 1'dir)", "C) EKOK'ları çifttir", "D) Biri diğerinin katıdır"], "B", "Ardışık sayılar (örn: 14 ve 15) daima aralarında asaldır."),
            ("A = 2³ × 3² × 5 ve B = 2² × 3³ × 7 ise EBOB(A, B) kaçtır?", ["A) 2² × 3² = 36", "B) 2³ × 3³ = 216", "C) 2 × 3 = 6", "D) 2³ × 3³ × 5 × 7"], "A", "Ortak asal çarpanlardan üssü küçük olanlar alınır: 2² × 3² = 4 × 9 = 36."),
            ("A = 2³ × 3 ve B = 2 × 3² ise EKOK(A, B) kaçtır?", ["A) 24", "B) 72", "C) 12", "D) 36"], "B", "Tüm çarpanlardan üssü büyük olanlar alınır: 2³ × 3² = 8 × 9 = 72."),
            ("Boyutları 6 cm, 8 cm ve 10 cm olan dikdörtgenler prizması şeklindeki kutulardan en küçük hacimli bir küp yapılacaktır. Küpün bir kenarı kaç cm olmalıdır?", ["A) 60", "B) 120", "C) 240", "D) 480"], "B", "Parçadan bütüne gidildiğinde EKOK alınır: EKOK(6, 8, 10) = 120 cm."),
            ("Aralarında asal iki sayının EKOK'u 120'dir. Bu sayılardan biri 8 ise diğeri kaçtır?", ["A) 12", "B) 15", "C) 20", "D) 24"], "B", "a × b = 120 -> 8 × b = 120 -> b = 15."),
            ("Bir sepetteki güller 5'er ve 7'şer demetlendiğinde hiç gül artmıyor. Sepette 100'den fazla gül olduğuna göre en az kaç gül vardır?", ["A) 105", "B) 140", "C) 110", "D) 120"], "A", "EKOK(5, 7) = 35. 35'in 100'den büyük en küçük katı 35 × 3 = 105'tir."),
            ("Birbirinin tam katı olan iki doğal sayıda EBOB hangisine eşittir?", ["A) Büyük sayıya", "B) Küçük sayıya", "C) Çarpımlarına", "D) Farklarına"], "B", "Örneğin 10 ve 30 sayılarında EBOB küçük olan sayıya (10'a) eşittir."),
            ("Birbirinin tam katı olan iki doğal sayıda EKOK hangisine eşittir?", ["A) Büyük sayıya", "B) Küçük sayıya", "C) 1'e", "D) Toplamlarına"], "A", "Örneğin 10 ve 30 sayılarında EKOK büyük olan sayıya (30'a) eşittir."),
            ("90 metre ve 120 metre uzunluğundaki iki demir çubuk eşit uzunlukta en büyük parçalara kesilecektir. Toplam kaç parça elde edilir?", ["A) 5", "B) 7", "C) 9", "D) 10"], "B", "EBOB(90, 120) = 30 m. 90/30 = 3 parça, 120/30 = 4 parça. Toplam: 3 + 4 = 7 parça."),
            ("A ve B pozitif tam sayılardır. EBOB(A, B) = 6 olduğuna göre A + B toplamı en az kaç olabilir (A ≠ B)?", ["A) 12", "B) 18", "C) 24", "D) 30"], "B", "A = 6 × 1 = 6, B = 6 × 2 = 12. Toplam: 6 + 12 = 18.")
        ]
    elif "8-sinif-matematik-uslu" in slug:
        raw = [
            ("5⁻² üslü ifadesinin sayısal değeri kaçtır?", ["A) -25", "B) -10", "C) 1/25", "D) 1/10"], "C", "Negatif üs çarpmaya göre ters çevirir: 5⁻² = 1 / 5² = 1/25."),
            ("(-3)⁻³ ifadesinin eşiti kaçtır?", ["A) 1/27", "B) -1/27", "C) -27", "D) 27"], "B", "(-3)⁻³ = 1 / (-3)³ = 1 / (-27) = -1/27."),
            ("2⁵ × 2³ işleminin sonucu kaçtır?", ["A) 2¹⁵", "B) 2⁸", "C) 4⁸", "D) 4¹⁵"], "B", "Tabanlar aynı ise üsler toplanır: 2⁵⁺³ = 2⁸."),
            ("3¹⁰ ÷ 3⁴ işleminin sonucu kaçtır?", ["A) 3⁶", "B) 3¹⁴", "C) 1⁶", "D) 3²·⁵"], "A", "Tabanlar aynı ise payın üssünden paydanın üssü çıkarılır: 3¹⁰⁻⁴ = 3⁶."),
            ("(2³)² üssün üssü işleminin sonucu kaçtır?", ["A) 2⁵", "B) 2⁶", "C) 2⁹", "D) 4⁶"], "B", "Üssün üssü çarpılır: 2^(3×2) = 2⁶ = 64."),
            ("10⁷ sayısı kaç basamaklı bir sayıdır?", ["A) 7", "B) 8", "C) 9", "D) 10"], "B", "1'in yanına 7 tane sıfır gelir (10 000 000); toplam 8 basamaklıdır."),
            ("4⁵ sayısı 2 tabanında nasıl yazılır?", ["A) 2⁷", "B) 2¹⁰", "C) 2²⁰", "D) 2²⁵"], "B", "4 = 2² olduğundan (2²)⁵ = 2¹⁰."),
            ("5⁸ × 2⁸ işleminin sonucu kaçtır?", ["A) 10¹⁶", "B) 10⁸", "C) 7⁸", "D) 10⁶⁴"], "B", "Üsler aynı ise tabanlar çarpılır: (5 × 2)⁸ = 10⁸."),
            ("0,000045 sayısının bilimsel gösterimi aşağıdakilerden hangisidir?", ["A) 45 × 10⁻⁶", "B) 4,5 × 10⁻⁵", "C) 4,5 × 10⁻⁶", "D) 0,45 × 10⁻⁴"], "B", "Bilimsel gösterimde katsayı 1 ≤ |a| < 10 olmalıdır: 4,5 × 10⁻⁵."),
            ("7 800 000 sayısının bilimsel gösterimi hangisidir?", ["A) 78 × 10⁵", "B) 7,8 × 10⁶", "C) 0,78 × 10⁷", "D) 7,8 × 10⁷"], "B", "Virgül 6 basamak sola kaydırılır: 7,8 × 10⁶."),
            ("2⁻¹ + 2⁻² işleminin sonucu kaçtır?", ["A) 3/4", "B) 1/4", "C) 3/2", "D) -3/4"], "A", "1/2 + 1/4 = 2/4 + 1/4 = 3/4."),
            ("8⁴ ÷ 4⁴ işleminin sonucu kaçtır?", ["A) 2⁴", "B) 2⁸", "C) 4⁴", "D) 2¹"], "A", "Üsler aynı olduğundan tabanlar bölünür: (8/4)⁴ = 2⁴ = 16."),
            ("(-1/2)⁻⁴ işleminin sonucu kaçtır?", ["A) -16", "B) +16", "C) -1/16", "D) +1/16"], "B", "(-2)⁴ = +16."),
            ("25³ × 125² işleminin sonucu 5 tabanında kaçtır?", ["A) 5¹²", "B) 5¹⁰", "C) 5¹⁵", "D) 5⁸"], "A", "(5²)³ × (5³)² = 5⁶ × 5⁶ = 5¹²."),
            ("3ˣ = 81 olduğuna göre x kaçtır?", ["A) 3", "B) 4", "C) 5", "D) 6"], "B", "81 = 3⁴ olduğundan x = 4'tür."),
            ("Bir kenarı 2⁵ mm olan karenin alanı kaç mm²'dir?", ["A) 2⁷", "B) 2¹⁰", "C) 4¹⁰", "D) 2²⁵"], "B", "Alan = (2⁵)² = 2¹⁰ mm²."),
            ("16⁶ sayısının yarısı kaçtır?", ["A) 8⁶", "B) 16³", "C) 2²³", "D) 2²⁴"], "C", "16⁶ = (2⁴)⁶ = 2²⁴. Yarısı: 2²⁴ ÷ 2¹ = 2²³."),
            ("9⁴ × 27⁻² işleminin sonucu kaçtır?", ["A) 3²", "B) 3⁴", "C) 3⁶", "D) 1"], "A", "(3²)⁴ × (3³)⁻² = 3⁸ × 3⁻⁶ = 3² = 9."),
            ("1 ışık yılı yaklaşık 9,46 × 10¹² km'dir. Bu gösterim bilimsel gösterim midir?", ["A) Evet, çünkü 1 ≤ 9,46 < 10 şartını sağlar", "B) Hayır, 10'dan büyüktür", "C) Hayır, üs çifttir", "D) Belirsizdir"], "A", "Katsayı 9,46 sayısı 1 ile 10 arasında olduğu için tam bir bilimsel gösterimdir."),
            ("5¹² sayısı kaç basamaklıdır sorusu yerine: 2¹⁰ × 5¹⁰ sayısı kaç basamaklıdır?", ["A) 10", "B) 11", "C) 12", "D) 20"], "B", "(2 × 5)¹⁰ = 10¹⁰. 1'in yanına 10 sıfır gelir; 11 basamaklıdır.")
        ]
    else: # 8-sinif-matematik-karekoklu
        raw = [
            ("√144 kareköklü ifadesinin değeri kaçtır?", ["A) 11", "B) 12", "C) 13", "D) 14"], "B", "12² = 144 olduğundan √144 = 12."),
            ("Alanı 81 cm² olan bir karenin bir kenar uzunluğu kaç cm'dir?", ["A) 8", "B) 9", "C) 18", "D) 27"], "B", "Karenin bir kenarı a = √81 = 9 cm."),
            ("√75 sayısı a√b biçiminde nasıl yazılır?", ["A) 3√5", "B) 5√3", "C) 25√3", "D) 15√5"], "B", "75 = 25 × 3 = 5² × 3 -> 5√3."),
            ("4√2 sayısı kök içine alındığında hangi sayıya eşit olur?", ["A) √16", "B) √32", "C) √64", "D) √8"], "B", "4 içeri 4² = 16 olarak girer: √(16 × 2) = √32."),
            ("√50 sayısı hangi iki ardışık tam sayı arasındadır?", ["A) 5 ile 6", "B) 6 ile 7", "C) 7 ile 8", "D) 8 ile 9"], "C", "√49 < √50 < √64 olduğundan 7 ile 8 arasındadır (7'ye çok yakındır)."),
            ("3√5 + 4√5 işleminin sonucu kaçtır?", ["A) 7√10", "B) 7√5", "C) 12√5", "D) 12√25"], "B", "Katsayılar toplanır: (3 + 4)√5 = 7√5."),
            ("√18 + √50 işleminin sonucu kaçtır?", ["A) √68", "B) 8√2", "C) 5√2", "D) 15√2"], "B", "√18 = 3√2, √50 = 5√2. Toplam: 3√2 + 5√2 = 8√2."),
            ("√12 × √3 işleminin sonucu kaçtır?", ["A) √36 = 6", "B) √15", "C) 3√2", "D) 9"], "A", "√(12 × 3) = √36 = 6."),
            ("√48 ÷ √3 işleminin sonucu kaçtır?", ["A) 4", "B) √16 = 4", "C) 16", "D) A ve B doğru"], "D", "√(48/3) = √16 = 4."),
            ("Aşağıdaki sayılardan hangisi bir 'irrasyonel sayı'dır?", ["A) √16", "B) 0,75", "C) √7", "D) -3/5"], "C", "√7 kök dışına tam çıkamaz, devretmeyen sonsuz ondalık açılıma sahiptir, irrasyoneldir."),
            ("Bir kenarı √8 cm ve diğer kenarı √18 cm olan dikdörtgenin alanı kaç cm²'dir?", ["A) √26", "B) 12", "C) 24", "D) 6√2"], "B", "√8 = 2√2, √18 = 3√2. Alan = 2√2 × 3√2 = 6 × 2 = 12 cm²."),
            ("1 / √2 ifadesinin paydası rasyonel yapıldığında hangisi elde edilir?", ["A) √2 / 2", "B) 2 / √2", "C) √2", "D) 1/2"], "A", "Pay ve payda √2 ile çarpılır: √2 / (√2 × √2) = √2 / 2."),
            ("√0,04 kareköklü sayısının rasyonel değeri nedir?", ["A) 0,02", "B) 0,2", "C) 2", "D) 0,4"], "B", "√(4/100) = 2/10 = 0,2."),
            ("5√3 - 2√3 işleminin sonucu kaçtır?", ["A) 3", "B) 3√3", "C) √3", "D) 6√3"], "B", "(5 - 2)√3 = 3√3."),
            ("√200 sayısı aşağıdakilerden hangisine eşittir?", ["A) 20√2", "B) 10√2", "C) 2√10", "D) 100√2"], "B", "200 = 100 × 2 -> 10√2."),
            ("π (pi) sayısı hangi sayı kümesine aittir?", ["A) Doğal sayılar", "B) Rasyonel sayılar", "C) İrrasyonel sayılar", "D) Tam sayılar"], "C", "Pi sayısı virgülden sonra devretmeden sonsuza gittiği için irrasyonel bir sayıdır."),
            ("√27 sayısı hangisi ile çarpılırsa sonuç bir doğal sayı olur?", ["A) √2", "B) √3", "C) √5", "D) √6"], "B", "√27 = 3√3. 3√3 × √3 = 3 × 3 = 9 (doğal sayı)."),
            ("Alanı 108 m² olan karenin çevresi kaç metredir?", ["A) 6√3", "B) 12√3", "C) 24√3", "D) 36"], "C", "Bir kenar = √108 = 6√3 m. Çevre = 4 × 6√3 = 24√3 m."),
            ("√1,44 + √0,81 işleminin sonucu kaçtır?", ["A) 2,1", "B) 2,25", "C) 1,5", "D) 2,5"], "A", "√1,44 = 1,2 ve √0,81 = 0,9. 1,2 + 0,9 = 2,1."),
            ("√x = 7 olduğuna göre x sayısı kaçtır?", ["A) √7", "B) 14", "C) 49", "D) 343"], "C", "Her iki tarafın karesi alınır: x = 7² = 49.")
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
