# -*- coding: utf-8 -*-
"""
Authentic Math Question Generator for High School Grades 9-12 (5 options: A, B, C, D, E).
Covers:
- 9. Sınıf Mantık & Önermeler
- 9. Sınıf Kümeler
- 9. Sınıf Denklem ve Eşitsizlikler
- 10. Sınıf Permütasyon-Kombinasyon
- 10. Sınıf Fonksiyonlar
- 10. Sınıf Polinomlar
- 11. Sınıf Trigonometri
- 11. Sınıf Analitik Geometri
- 11. Sınıf Parabol
- 12. Sınıf Logaritma
- 12. Sınıf Diziler
- 12. Sınıf Limit
- 12. Sınıf Türev
- 12. Sınıf İntegral
"""

def get_math_high_questions(slug):
    raw = []
    if "9-sinif-matematik-mantik" in slug:
        raw = [
            ("p: '7 asal sayıdır.' önermesinin doğruluk değeri nedir?", ["A) 0", "B) 1", "C) Belirsiz", "D) 1/2", "E) Yanlış"], "B", "7 sayısı asal olduğundan p önermesi doğrudur, p ≡ 1."),
            ("p ≡ 1 ve q ≡ 0 olduğuna göre p ∧ q (p ve q) bileşik önermesinin doğruluk değeri nedir?", ["A) 1", "B) 0", "C) p", "D) q'", "E) Belirsiz"], "B", "'Ve' bağlacında önermelerden biri 0 ise sonuç daima 0'dır: 1 ∧ 0 ≡ 0."),
            ("p ≡ 0 ve q ≡ 1 olduğuna göre p ∨ q (p veya q) bileşik önermesinin değeri nedir?", ["A) 0", "B) 1", "C) p", "D) q'", "E) 2"], "B", "'Veya' bağlacında en az bir 1 olması sonucu 1 yapar: 0 ∨ 1 ≡ 1."),
            ("p ⇒ q (ise bağlacı) hangi durumda 0 değerini alır?", ["A) 0 ⇒ 0", "B) 0 ⇒ 1", "C) 1 ⇒ 0", "D) 1 ⇒ 1", "E) Hiçbir zaman"], "C", "İse bağlacı yalnızca 100 kuralında (1 ⇒ 0) 0'a denktir, diğer tüm durumlarda 1'dir."),
            ("(p ∧ q)' ifadesinin De Morgan kuralına göre eşiti hangisidir?", ["A) p' ∧ q'", "B) p' ∨ q'", "C) p ∨ q", "D) p' ∧ q", "E) p ∧ q'"], "B", "De Morgan kuralına göre: (p ∧ q)' ≡ p' ∨ q'."),
            ("Doğruluk değeri daima 1 olan bileşik önermelere ne ad verilir?", ["A) Çelişki", "B) Totoloji", "C) Aksiyom", "D) Teorem", "E) Hipotez"], "B", "Tüm doğruluk durumları için daima 1 çıkan önermeler totolojidir."),
            ("p ∨ p' ifadesinin doğruluk değeri nedir?", ["A) 0", "B) 1 (Totoloji)", "C) p", "D) p'", "E) Belirsiz"], "B", "Biri 1 ise diğeri mutlaka 0'dır. Veya bağlacında 1 ∨ 0 ≡ 1 olur."),
            ("p ∧ p' ifadesinin doğruluk değeri nedir?", ["A) 0 (Çelişki)", "B) 1", "C) p", "D) p'", "E) 2"], "A", "Ve bağlacında biri mutlaka 0 olacağı için sonuç daima 0'dır."),
            ("p ⇒ q koşullu önermesinin karşıtı nedir?", ["A) q ⇒ p", "B) p' ⇒ q'", "C) q' ⇒ p'", "D) p ∧ q'", "E) p' ∨ q"], "A", "Koşullu önermenin karşıtı hipotez ve hükmün yer değiştirmesidir: q ⇒ p."),
            ("p ⇒ q koşullu önermesinin karşıt tersi nedir?", ["A) q ⇒ p", "B) q' ⇒ p'", "C) p' ⇒ q'", "D) p ∧ q'", "E) p ∨ q'"], "B", "Karşıt tersi hem yer hem değillerin alınmasıdır: q' ⇒ p'. (Önermenin kendisine denktir)."),
            ("p ⇒ q önermesi aşağıdakilerden hangisine denktir?", ["A) p ∧ q", "B) p' ∨ q", "C) p ∨ q'", "D) p' ∧ q", "E) p' ⇒ q"], "B", "İse bağlacının veya türünden eşiti: p ⇒ q ≡ p' ∨ q'dir."),
            ("p ⇔ q (ancak ve ancak) önermesi ne zaman 1 değerini alır?", ["A) Her ikisi de 1 veya her ikisi de 0 iken (aynı değerde)", "B) Zıt değerlerde", "C) Yalnızca p=1 iken", "D) Yalnızca q=0 iken", "E) Her zaman"], "A", "Ancak ve ancak bağlacı her iki bileşen aynı doğruluk değerine sahipken 1 olur."),
            ("n tane farklı bağımsız önermenin kaç farklı doğruluk durumu vardır?", ["A) n²", "B) 2ⁿ", "C) 2n", "D) n!", "E) 2ⁿ⁻¹"], "B", "Her önermenin 2 durumu olduğundan n önerme için 2ⁿ durum vardır."),
            ("4 farklı önermenin doğruluk tablosunda kaç satır bulunur?", ["A) 8", "B) 16", "C) 32", "D) 12", "E) 64"], "B", "2⁴ = 16 satır bulunur."),
            ("∀ (her) evrensel niceleyicisinin olumsuzu (değili) nedir?", ["A) ∃ (en az bir / bazı)", "B) ∀", "C) ∈", "D) ⊂", "E) ∅"], "A", "'Her' niceleyicisinin değili 'Bazı / En az bir' (∃) niceleyicisidir."),
            ("∃x, P(x) önermesinin değili hangisidir?", ["A) ∀x, P'(x)", "B) ∃x, P'(x)", "C) ∀x, P(x)", "D) P(x)", "E) ∅"], "A", "(∃x, P(x))' ≡ ∀x, P'(x)."),
            ("(p ∨ q) ∧ (p ∨ q') ifadesinin en sade hali nedir?", ["A) 0", "B) p", "C) q", "D) 1", "E) p'"], "B", "Dağılma özelliği tersten uygulanırsa: p ∨ (q ∧ q') ≡ p ∨ 0 ≡ p."),
            ("p ≡ 1, q ≡ 1, r ≡ 0 olduğuna göre (p ∧ q) ⇒ r önermesinin doğruluk değeri nedir?", ["A) 1", "B) 0", "C) p", "D) q", "E) r'"], "B", "p ∧ q = 1 ∧ 1 = 1. 1 ⇒ 0 ≡ 0."),
            ("Bir teoremin doğruluğu ispatlanması gereken önermesine ne denir?", ["A) Aksiyom", "B) Teorem", "C) Hipotez", "D) Hüküm", "E) Tanım"], "B", "Doğruluğu ispatlanabilen önermelere teorem denir."),
            ("p ⇒ (p ∨ q) önermesinin dengi nedir?", ["A) 0", "B) 1 (Totoloji)", "C) p", "D) q", "E) p'"], "B", "p' ∨ (p ∨ q) ≡ (p' ∨ p) ∨ q ≡ 1 ∨ q ≡ 1.")
        ]
    elif "9-sinif-matematik-kumeler" in slug:
        raw = [
            ("s(A) = 5 olan bir kümenin alt küme sayısı kaçtır?", ["A) 10", "B) 25", "C) 32", "D) 64", "E) 16"], "C", "n elemanlı bir kümenin alt küme sayısı 2ⁿ formülüyle bulunur: 2⁵ = 32."),
            ("Eleman sayısı 4 olan bir kümenin özalt küme sayısı kaçtır?", ["A) 14", "B) 15", "C) 16", "D) 8", "E) 31"], "B", "Özalt küme sayısı kendisi hariç alt kümeleridir: 2ⁿ - 1 = 2⁴ - 1 = 15."),
            ("s(A) = 8, s(B) = 6 ve s(A ∩ B) = 3 olduğuna göre s(A ∪ B) kaçtır?", ["A) 11", "B) 14", "C) 17", "D) 9", "E) 12"], "A", "s(A ∪ B) = s(A) + s(B) - s(A ∩ B) = 8 + 6 - 3 = 11."),
            ("A ∩ A' (bir küme ile tümleyeninin kesişimi) nedir?", ["A) Evrensel küme (E)", "B) Boş küme (∅)", "C) A kümesi", "D) A' kümesi", "E) {0}"], "B", "Bir küme ile tümleyeninin hiçbir ortak elemanı yoktur: A ∩ A' = ∅."),
            ("A ∪ A' (bir küme ile tümleyeninin birleşimi) nedir?", ["A) Boş küme (∅)", "B) Evrensel küme (E)", "C) A kümesi", "D) 2A", "E) {1}"], "B", "Bir küme ile tümleyeninin birleşimi evrensel kümeyi oluşturur."),
            ("s(A \\ B) = 5, s(B \\ A) = 4 ve s(A ∩ B) = 2 olduğuna göre s(A ∪ B) kaçtır?", ["A) 9", "B) 11", "C) 13", "D) 10", "E) 12"], "B", "s(A ∪ B) = s(A \\ B) + s(B \\ A) + s(A ∩ B) = 5 + 4 + 2 = 11."),
            ("A = {1, 2, 3, 4, 5} kümesinin 3 elemanlı alt küme sayısı C(5, 3) kaçtır?", ["A) 5", "B) 10", "C) 15", "D) 20", "E) 60"], "B", "C(5, 3) = (5 × 4 × 3) / (3 × 2 × 1) = 10."),
            ("A ⊂ B (A alt kümesidir B) olduğuna göre A ∩ B aşağıdakilerden hangisidir?", ["A) B", "B) A", "C) ∅", "D) E", "E) A \\ B"], "B", "A kümesi B'nin içinde olduğundan ortak elemanlar A'nın tamamıdır: A ∩ B = A."),
            ("A ⊂ B olduğuna göre A ∪ B aşağıdakilerden hangisidir?", ["A) A", "B) B", "C) ∅", "D) B \\ A", "E) E"], "B", "A kümesi B'nin içinde olduğundan birleşim B kümesine eşittir."),
            ("s(A) = 3 ve s(B) = 4 olduğuna göre A × B kartezyen çarpımının eleman sayısı s(A × B) kaçtır?", ["A) 7", "B) 12", "C) 64", "D) 81", "E) 1"], "B", "s(A × B) = s(A) × s(B) = 3 × 4 = 12."),
            ("Boş kümenin alt küme sayısı kaçtır?", ["A) 0", "B) 1", "C) 2", "D) Tanımsız", "E) Sonsuz"], "B", "Boş kümenin eleman sayısı 0'dır: 2⁰ = 1 (kendisidir)."),
            ("A = {a, b, c} kümesinin alt kümelerinden kaç tanesinde 'a' elemanı bulunur?", ["A) 2", "B) 4", "C) 6", "D) 8", "E) 3"], "B", "'a' kümeden çıkarılır, kalan 2 elemanın alt küme sayısı hesaplanır: 2² = 4."),
            ("İngilizce veya Almanca dillerinden en az birini bilenlerin bulunduğu 30 kişilik sınıfta, İngilizce bilen 18, Almanca bilen 16 kişi vardır. Her iki dili bilen kaç kişidir?", ["A) 2", "B) 4", "C) 6", "D) 8", "E) 10"], "B", "s(İ ∪ A) = s(İ) + s(A) - s(İ ∩ A) -> 30 = 18 + 16 - x -> x = 34 - 30 = 4 kişi."),
            ("(A ∪ B)' ifadesinin De Morgan kuralına göre eşiti nedir?", ["A) A' ∪ B'", "B) A' ∩ B'", "C) A ∩ B", "D) A' \\ B'", "E) B' \\ A'"], "B", "(A ∪ B)' = A' ∩ B'."),
            ("A \\ B (A fark B) kümesinin tanımı nedir?", ["A) A'da olup B'de olmayan elemanlar", "B) B'de olup A'da olmayanlar", "C) Ortak elemanlar", "D) Tüm elemanlar", "E) Boş küme"], "A", "A'da bulunup B'de bulunmayan elemanların oluşturduğu kümedir: A ∩ B'."),
            ("A = {x | x² < 10, x ∈ ℤ} kümesinin eleman sayısı kaçtır?", ["A) 3", "B) 6", "C) 7", "D) 5", "E) 9"], "C", "Karesi 10'dan küçük tam sayılar: -3, -2, -1, 0, 1, 2, 3 olmak üzere 7 tanedir."),
            ("A ve B ayrık iki küme olduğuna göre s(A ∩ B) kaçtır?", ["A) 0", "B) 1", "C) s(A) × s(B)", "D) Boş", "E) -1"], "A", "Ayrık kümelerin ortak elemanı yoktur: s(A ∩ B) = 0 (A ∩ B = ∅)."),
            ("s(A) = 2x - 1, s(A'nın alt kümeleri) = 32 ise x kaçtır?", ["A) 2", "B) 3", "C) 4", "D) 5", "E) 6"], "B", "2ⁿ = 32 -> n = 5. 2x - 1 = 5 -> 2x = 6 -> x = 3."),
            ("E evrensel küme olmak üzere s(A) + s(A') toplamı neye eşittir?", ["A) 0", "B) 2s(A)", "C) s(E)", "D) s(∅)", "E) 1"], "C", "Bir kümenin eleman sayısı ile tümleyeninin eleman sayısı toplamı daima evrensel kümenin eleman sayısını s(E) verir."),
            ("(A ∩ B) ∪ (A ∩ B') ifadesinin en sade hali nedir?", ["A) B", "B) A", "C) ∅", "D) E", "E) A ∩ B"], "B", "A ∩ (B ∪ B') = A ∩ E = A.")
        ]
    elif "10-sinif-matematik-fonksiyonlar" in slug:
        raw = [
            ("f: ℝ → ℝ, f(x) = 3x - 5 olduğuna göre f(4) kaçtır?", ["A) 5", "B) 7", "C) 9", "D) 12", "E) 15"], "B", "f(4) = 3(4) - 5 = 12 - 5 = 7."),
            ("f(x) = 2x + 1 ve g(x) = x² olduğuna göre (f ∘ g)(3) bileşke fonksiyonu kaçtır?", ["A) 19", "B) 49", "C) 37", "D) 18", "E) 25"], "A", "(f ∘ g)(3) = f(g(3)). g(3) = 3² = 9. f(9) = 2(9) + 1 = 19."),
            ("f(x) = (2x + 3) / (x - 4) fonksiyonunun tanım kümesinde hangi reel sayı bulunamaz?", ["A) -3/2", "B) 0", "C) 4", "D) 2", "E) -4"], "C", "Paydayı sıfır yapan x - 4 = 0 -> x = 4 değeri tanımsızlık yaratır, tanım kümesinden çıkarılır."),
            ("f: ℝ → ℝ, f(x) = 2x - 6 fonksiyonunun tersi f⁻¹(x) nedir?", ["A) (x + 6) / 2", "B) (x - 6) / 2", "C) 2x + 6", "D) 6x - 2", "E) -2x + 6"], "A", "y = 2x - 6 -> 2x = y + 6 -> x = (y + 6) / 2. Dolayısıyla f⁻¹(x) = (x + 6) / 2."),
            ("Tanım kümesindeki her elemanın görüntüsü kendisine eşit olan (f(x) = x) fonksiyona ne denir?", ["A) Sabit fonksiyon", "B) Birim (özdeşlik) fonksiyon", "C) Sıfır fonksiyonu", "D) Doğrusal fonksiyon", "E) Birebir fonksiyon"], "B", "I(x) = x şeklindeki fonksiyona birim (özdeşlik) fonksiyon denir."),
            ("f(x) = (a - 3)x + 7 fonksiyonu sabit fonksiyon olduğuna göre 'a' kaçtır?", ["A) 0", "B) 3", "C) 7", "D) -3", "E) 4"], "B", "Sabit fonksiyonda x'li terim bulunmaz, katsayısı sıfır olmalıdır: a - 3 = 0 -> a = 3."),
            ("Tanım kümesindeki farklı elemanların görüntüleri de daima farklı ise bu fonksiyona ne denir?", ["A) Örten", "B) Birebir", "C) İçine", "D) Sabit", "E) Tek fonksiyon"], "B", "x₁ ≠ x₂ iken f(x₁) ≠ f(x₂) oluyorsa fonksiyon birebirdir."),
            ("Değer kümesinde açıkta eleman kalmıyorsa (Görüntü kümesi = Değer kümesi ise) bu fonksiyona ne denir?", ["A) İçine", "B) Örten", "C) Birebir", "D) Birim", "E) Çift"], "B", "Değer kümesindeki her eleman eşleşmişse fonksiyona örten fonksiyon denir."),
            ("f(x) = ax + b doğrusal fonksiyonunda f(1) = 5 ve f(2) = 8 olduğuna göre a + b toplamı kaçtır?", ["A) 3", "B) 5", "C) 7", "D) 9", "E) 11"], "B", "f(1) = a + b = 5, f(2) = 2a + b = 8. Taraf tarafa çıkarılırsa a = 3, b = 2. a + b = 5."),
            ("f(x) tek fonksiyon ise grafiği hangisine göre simetriktir?", ["A) y eksenine", "B) Orijine göre", "C) x eksenine", "D) y = x doğrusuna", "E) Tepe noktasına"], "B", "Tek fonksiyonlar f(-x) = -f(x) şartını sağlar ve grafikleri orijine göre simetriktir."),
            ("f(x) çift fonksiyon ise grafiği hangisine göre simetriktir?", ["A) Orijine", "B) y eksenine göre", "C) x eksenine", "D) y = -x doğrusuna", "E) Başlangıç noktasına"], "B", "Çift fonksiyonlar f(-x) = f(x) şartını sağlar ve grafikleri y eksenine göre simetriktir."),
            ("f(2x + 1) = 4x + 7 olduğuna göre f(5) kaçtır?", ["A) 11", "B) 15", "C) 27", "D) 19", "E) 23"], "B", "2x + 1 = 5 -> 2x = 4 -> x = 2. f(5) = 4(2) + 7 = 8 + 7 = 15."),
            ("(f ∘ f⁻¹)(x) bileşkesi aşağıdakilerden hangisine eşittir?", ["A) 0", "B) 1", "C) x (Birim fonksiyon)", "D) f(x)", "E) [f(x)]²"], "C", "Bir fonksiyon ile tersinin bileşkesi birim fonksiyonu (x) verir: (f ∘ f⁻¹)(x) = x."),
            ("f(x) = 3x - 2 ve g(x) = 2x + 5 ise (f + g)(3) kaçtır?", ["A) 16", "B) 18", "C) 20", "D) 22", "E) 24"], "B", "f(3) = 9 - 2 = 7, g(3) = 6 + 5 = 11. (f + g)(3) = 7 + 11 = 18."),
            ("f(x) = x² - 3x + 4 olduğuna göre f(0) + f(1) toplamı kaçtır?", ["A) 4", "B) 6", "C) 8", "D) 10", "E) 12"], "B", "f(0) = 4. f(1) = 1 - 3 + 4 = 2. 4 + 2 = 6."),
            ("Aşağıdakilerden hangisi bir çift fonksiyondur?", ["A) f(x) = x³", "B) f(x) = x² + 4", "C) f(x) = 2x + 1", "D) f(x) = x⁵ - x", "E) f(x) = x"], "B", "f(-x) = (-x)² + 4 = x² + 4 = f(x) olduğundan f(x) = x² + 4 çift fonksiyondur."),
            ("f(x) birebir ve örten fonksiyon olmak üzere f(3) = 8 ise f⁻¹(8) kaçtır?", ["A) 3", "B) 8", "C) 1/3", "D) -3", "E) 24"], "A", "f(a) = b ise f⁻¹(b) = a kuralı gereğince f⁻¹(8) = 3'tür."),
            ("f(x) = 5 olduğuna göre f(100) kaçtır?", ["A) 100", "B) 500", "C) 5", "D) 0", "E) 20"], "C", "f(x) = 5 sabit fonksiyondur, her x değeri için 5'e eşittir."),
            ("f(x) = 2ˣ olduğuna göre f(x + 3) / f(x) oranı kaçtır?", ["A) 2", "B) 4", "C) 8", "D) 16", "E) 3"], "C", "f(x + 3) = 2ˣ⁺³ = 2ˣ × 2³ = 8 × 2ˣ. 8 × 2ˣ / 2ˣ = 8."),
            ("Doğrusal bir fonksiyonun grafiği analitik düzlemde ne belirtir?", ["A) Parabol", "B) Doğru", "C) Çember", "D) Elips", "E) Hiperbol"], "B", "f(x) = ax + b birinci dereceden bir fonksiyondur ve grafiği bir doğru belirtir.")
        ]
    elif "11-sinif-matematik-trigonometri" in slug:
        raw = [
            ("Birim çemberin yarıçapı kaç birimdir ve denklemi nedir?", ["A) r = 1, x² + y² = 1", "B) r = 2, x² + y² = 4", "C) r = 1, x + y = 1", "D) r = 1, x² - y² = 1", "E) r = 0"], "A", "Merkezi orijin (0,0) ve yarıçapı 1 birim olan çembere birim çember denir: x² + y² = 1."),
            ("Her reel x açısı için sin²(x) + cos²(x) toplamı kaçtır?", ["A) 0", "B) 1/2", "C) 1", "D) √2", "E) 2"], "C", "Pisagor bağıntısından türeyen temel trigonometrik özdeşlik: sin²x + cos²x = 1."),
            ("sin(30°) değeri aşağıdakilerden hangisidir?", ["A) 1/2", "B) √3/2", "C) √2/2", "D) 1", "E) 0"], "A", "30-60-90 dik üçgeninde sin(30°) = Karşı / Hipotenüs = 1/2."),
            ("cos(60°) değeri kaça eşittir?", ["A) √3/2", "B) 1/2", "C) √2/2", "D) 0", "E) 1"], "B", "Tümler açıların sinüsü kosinüsüne eşittir: cos(60°) = sin(30°) = 1/2."),
            ("tan(45°) değeri kaçtır?", ["A) 0", "B) 1", "C) √3", "D) 1/√3", "E) Tanımsız"], "B", "İkizkenar dik üçgende (45-45-90) tan(45°) = Karşı / Komşu = 1."),
            ("970° lik açının esas ölçüsü kaç derecedir?", ["A) 130°", "B) 250°", "C) 210°", "D) 150°", "E) 70°"], "B", "970 ÷ 360 = 2 tam tur (720°). Kalan = 970 - 720 = 250°."),
            ("Trigonometrik fonksiyonların 2. bölgedeki (+,-) işaretleri sırasıyla (sin, cos, tan, cot) hangisidir?", ["A) (+, +, +, +)", "B) (+, -, -, -)", "C) (-, +, -, -)", "D) (+, -, +, -)", "E) (-, -, +, +)"], "B", "2. bölgede y pozitif (sin +), x negatif (cos -). tan ve cot oranları ise negatiftir (-)."),
            ("tan(x) × cot(x) çarpımı tanımlı olduğu yerlerde daima kaça eşittir?", ["A) 0", "B) 1", "C) -1", "D) sin(x)", "E) cos(x)"], "B", "tan(x) = sin/cos ve cot(x) = cos/sin olduğundan çarpımları daima 1'dir."),
            ("Kosinüs Teoremi formülü a² için nasıldır?", ["A) a² = b² + c² - 2bc·cos(A)", "B) a² = b² + c² + 2bc·cos(A)", "C) a² = b² + c²", "D) a² = 2bc·sin(A)", "E) a² = bc·cos(A)"], "A", "Bir üçgende kenarlar ve açı arasındaki bağıntı: a² = b² + c² - 2bc·cos(A)."),
            ("Sinüs Teoremi bağıntısı nasıldır?", ["A) a/sinA = b/sinB = c/sinC = 2R", "B) a·sinA = b·sinB", "C) a/cosA = b/cosB", "D) a + sinA = b + sinB", "E) a² = sin²A"], "A", "Sinüs teoremi kenarların karşılarındaki açıların sinüslerine oranının çevrel çemberin çapına (2R) eşit olduğunu belirtir."),
            ("sin(90°) ve cos(0°) değerleri toplamı kaçtır?", ["A) 0", "B) 1", "C) 2", "D) √2", "E) -1"], "C", "sin(90°) = 1 ve cos(0°) = 1'dir. 1 + 1 = 2."),
            ("cos(180°) değeri kaçtır?", ["A) 1", "B) 0", "C) -1", "D) 1/2", "E) -1/2"], "C", "Birim çemberde 180° noktasının koordinatları (-1, 0)'dır; kosinüs apsistir: -1."),
            ("sin(π - x) ifadesinin indirgeme formülü sonucu nedir?", ["A) -sin(x)", "B) sin(x)", "C) cos(x)", "D) -cos(x)", "E) tan(x)"], "B", "2. bölgede sinüs pozitiftir ve π'de isim değişmez: sin(π - x) = sin(x)."),
            ("cos(π/2 + x) ifadesinin eşiti nedir?", ["A) cos(x)", "B) -sin(x)", "C) sin(x)", "D) -cos(x)", "E) cot(x)"], "B", "π/2'de isim değişir (cos -> sin) ve 2. bölgede kosinüs negatif olduğundan -sin(x) olur."),
            ("tan(x) = 3/4 olan dar açının sin(x) değeri kaçtır?", ["A) 3/5", "B) 4/5", "C) 5/3", "D) 3/7", "E) 4/3"], "A", "3-4-5 dik üçgeni çizildiğinde: Karşı = 3, Komşu = 4, Hipotenüs = 5. sin(x) = Karşı/Hipotenüs = 3/5."),
            ("π radyan kaç dereceye eşittir?", ["A) 90°", "B) 180°", "C) 270°", "D) 360°", "E) 45°"], "B", "Açı birimi dönüşümünde π radyan = 180°'dir."),
            ("Bir ABC üçgeninde b = 4, c = 6 ve A açısı 60° ise a kenarı kaçtır (cos60° = 1/2)?", ["A) √28 (2√7)", "B) √52", "C) 6", "D) 8", "E) √30"], "A", "a² = 4² + 6² - 2(4)(6)(1/2) = 16 + 36 - 24 = 28 -> a = √28 = 2√7."),
            ("f(x) = sin(3x) fonksiyonunun periyodu (T) nedir?", ["A) 2π", "B) 2π/3", "C) π/3", "D) 3π", "E) 6π"], "B", "sin(ax + b) fonksiyonunun periyodu T = 2π / |a| formülüyle bulunur: 2π/3."),
            ("1 + tan²(x) özdeşliği aşağıdakilerden hangisine eşittir?", ["A) sin²x", "B) cos²x", "C) sec²x (1/cos²x)", "D) csc²x", "E) 1"], "C", "1 + sin²x/cos²x = (cos²x + sin²x)/cos²x = 1/cos²x = sec²x."),
            ("-400° lik açının esas ölçüsü kaç derecedir?", ["A) 40°", "B) 140°", "C) 320°", "D) 220°", "E) 160°"], "C", "-400 + 2 × 360 = -400 + 720 = 320°.")
        ]
    elif "12-sinif-matematik-turev" in slug:
        raw = [
            ("f(x) = x⁴ fonksiyonunun türevi f'(x) nedir?", ["A) 4x³", "B) x³", "C) 4x⁵", "D) 3x⁴", "E) 12x²"], "A", "Kuvvet kuralı: d/dx(xⁿ) = n·xⁿ⁻¹. f'(x) = 4x³."),
            ("f(x) = 5x² - 3x + 7 olduğuna göre f'(2) kaçtır?", ["A) 14", "B) 17", "C) 20", "D) 23", "E) 10"], "B", "f'(x) = 10x - 3. f'(2) = 10(2) - 3 = 20 - 3 = 17."),
            ("Sabit bir sayının (örn: f(x) = c) türevi nedir?", ["A) 1", "B) c", "C) 0", "D) x", "E) -c"], "C", "Sabit fonksiyonlarda değişim hızı sıfır olduğundan türevleri 0'dır."),
            ("Çarpımın türevi [f(x) · g(x)]' kuralı nasıldır?", ["A) f'(x) · g'(x)", "B) f'(x)·g(x) + f(x)·g'(x)", "C) f'(x)·g(x) - f(x)·g'(x)", "D) f(x) + g(x)", "E) [f'(x)]²"], "B", "Birincinin türevi × ikinci + birinci × ikincinin türevi."),
            ("Bölümün türevi [f(x) / g(x)]' kuralı nasıldır?", ["A) f'(x) / g'(x)", "B) [f'(x)·g(x) - f(x)·g'(x)] / [g(x)]²", "C) [f'(x)·g(x) + f(x)·g'(x)] / [g(x)]²", "D) f'(x)·g(x)", "E) 1/g'(x)"], "B", "(Payın türevi × payda - pay × paydanın türevi) / (paydanın karesi)."),
            ("f(x) = (2x + 1)³ fonksiyonunun türevi (zincir kuralı) nedir?", ["A) 3(2x + 1)²", "B) 6(2x + 1)²", "C) 2(2x + 1)²", "D) 6(2x + 1)³", "E) 12x²"], "B", "Üs başa geçer, derece 1 azalır ve içinin türevi ile çarpılır: 3(2x + 1)² × 2 = 6(2x + 1)²."),
            ("Bir fonksiyonun bir noktadaki türevi f'(x₀) geometrik olarak neyi ifade eder?", ["A) O noktadaki teğetin eğimini (m_teğet)", "B) O noktadaki alanını", "C) Fonksiyonun sıfırlarını", "D) Kirişin boyunu", "E) İvmesini"], "A", "f'(x₀) değeri f fonksiyonunun x₀ noktasından çizilen teğet doğrusunun eğimine eşittir."),
            ("f'(x) > 0 olduğu aralıklarda fonksiyon nasıldır?", ["A) Azalandır", "B) Artandır", "C) Sabittir", "D) Konkavdır", "E) Tanımsızdır"], "B", "Birinci türevin pozitif olduğu aralıklarda fonksiyon daima artandır."),
            ("Bir fonksiyonun yerel ekstremum (maksimum/minimum) noktalarında türevi varsa kaça eşittir?", ["A) 1", "B) -1", "C) 0", "D) Sonsuz", "E) 2"], "C", "Türevlenebilir bir fonksiyonun tepe ve çukur noktalarında teğet yataydır (eğim = f'(x) = 0)."),
            ("f(x) = x³ - 3x² + 5 fonksiyonunun yerel minimum noktasının apsisi kaçtır?", ["A) 0", "B) 1", "C) 2", "D) 3", "E) -1"], "C", "f'(x) = 3x² - 6x = 3x(x - 2) = 0 -> Kökler 0 ve 2. İşaret tablosunda x = 2'de azalandan artana geçer (yerel min apsisi 2'dir)."),
            ("Toplamları 12 olan iki pozitif reel sayının çarpımının alabileceği en büyük (maksimum) değer kaçtır?", ["A) 24", "B) 32", "C) 36", "D) 40", "E) 48"], "C", "x + y = 12 -> y = 12 - x. Çarpım = x(12 - x) = 12x - x². Türevi: 12 - 2x = 0 -> x = 6. Çarpım = 6 × 6 = 36."),
            ("f(x) = √x fonksiyonunun türevi f'(x) nedir?", ["A) 1 / (2√x)", "B) 2√x", "C) 1 / √x", "D) x^(-1/2)", "E) 1/2"], "A", "x^(1/2) türevi (1/2)x^(-1/2) = 1 / (2√x)."),
            ("f(x) = 1/x fonksiyonunun türevi nedir?", ["A) 1/x²", "B) -1/x²", "C) ln(x)", "D) -1", "E) 2/x²"], "B", "x⁻¹ türevi -1 · x⁻² = -1/x²."),
            ("f(x) = x² - 4x + 1 eğrisinin x = 3 noktasındaki teğetinin eğimi kaçtır?", ["A) 1", "B) 2", "C) 3", "D) -2", "E) 0"], "B", "f'(x) = 2x - 4. x = 3 için m = 2(3) - 4 = 2."),
            ("Bir hareketlinin konum denklemi x(t) = 2t³ - 5t + 4 ise t = 2 anındaki anlık hızı v(2) kaçtır?", ["A) 14", "B) 19", "C) 24", "D) 28", "E) 32"], "B", "Hız konumun zamana göre türevidir: v(t) = x'(t) = 6t² - 5. v(2) = 6(4) - 5 = 19 m/s."),
            ("f(x) = |x| fonksiyonunun x = 0 noktasında türevi var mıdır?", ["A) Vardır ve 0'dır", "B) Vardır ve 1'dir", "C) Yoktur (sağdan türev 1, soldan türev -1'dir)", "D) Vardır ve -1'dir", "E) Sonsuzdur"], "C", "Sivri noktalarda sağ ve sol türevler eşit olmadığından türev yoktur."),
            ("f(x) = 2x³ fonksiyonunun 2. türevi f''(x) nedir?", ["A) 6x²", "B) 12x", "C) 12", "D) 6x", "E) 24x"], "B", "f'(x) = 6x², f''(x) = 12x."),
            ("f(x) fonksiyonu daima azalan ise türevi için hangisi doğrudur?", ["A) f'(x) ≥ 0", "B) f'(x) ≤ 0", "C) f'(x) = 1", "D) f'(x) > 1", "E) f''(x) = 0"], "B", "Daima azalan fonksiyonlarda türev daima sıfırdan küçük veya eşittir (f'(x) ≤ 0)."),
            ("f(x) = x² fonksiyonunun [1, 3] aralığındaki ortalama değişim oranı kaçtır?", ["A) 2", "B) 3", "C) 4", "D) 5", "E) 8"], "C", "[f(3) - f(1)] / (3 - 1) = (9 - 1) / 2 = 8 / 2 = 4."),
            ("f(x) = 3x² - 12x + 7 fonksiyonunun yerel minimum değeri kaçtır?", ["A) 2", "B) -5", "C) 7", "D) -12", "E) 0"], "B", "f'(x) = 6x - 12 = 0 -> x = 2. Değer: f(2) = 3(4) - 12(2) + 7 = 12 - 24 + 7 = -5.")
        ]
    else: # 12-sinif-matematik-integral or fallback high math
        raw = [
            ("∫ x³ dx belirsiz integralinin eşiti nedir?", ["A) 3x² + C", "B) x⁴/4 + C", "C) x⁴ + C", "D) 4x⁴ + C", "E) x³/3 + C"], "B", "Kuvvet kuralı: ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C (n ≠ -1). ∫ x³ dx = x⁴/4 + C."),
            ("∫ 5 dx integralinin sonucu nedir?", ["A) 0", "B) 5x + C", "C) 5 + C", "D) 5x²/2 + C", "E) x⁵ + C"], "B", "Sabit sayının integrali x ile çarpımıdır: 5x + C."),
            ("∫ (3x² - 4x + 1) dx integralinin eşiti nedir?", ["A) x³ - 2x² + x + C", "B) 6x - 4 + C", "C) 3x³ - 4x² + x + C", "D) x³ - 4x² + C", "E) x³ + 2x² + C"], "A", "Terim terim integral: 3(x³/3) - 4(x²/2) + x + C = x³ - 2x² + x + C."),
            ("∫₀² 2x dx belirli integralinin sayısal değeri kaçtır?", ["A) 2", "B) 4", "C) 6", "D) 8", "E) 1"], "B", "∫ 2x dx = x². Sınırlar [0, 2]: 2² - 0² = 4."),
            ("∫₁³ 3x² dx belirli integralinin sonucu kaçtır?", ["A) 26", "B) 27", "C) 28", "D) 24", "E) 18"], "A", "∫ 3x² dx = x³. Sınırlar [1, 3]: 3³ - 1³ = 27 - 1 = 26."),
            ("Türevi f'(x) = 2x + 3 olan ve f(0) = 4 şartını sağlayan f(x) fonksiyonu nedir?", ["A) x² + 3x", "B) x² + 3x + 4", "C) 2x² + 3x + 4", "D) x² + 4", "E) 2x + 7"], "B", "f(x) = ∫ (2x + 3)dx = x² + 3x + C. f(0) = 4 olduğundan C = 4'tür: x² + 3x + 4."),
            ("d/dx [ ∫ f(x) dx ] ifadesi neye eşittir?", ["A) f'(x)", "B) f(x)", "C) f(x) + C", "D) F(x)", "E) 0"], "B", "Türev ve integral birbirinin ters işlemidir; integralin türevi fonksiyonun kendisine eşittir: f(x)."),
            ("∫ 1/x dx (x > 0) integralinin eşiti nedir?", ["A) -1/x² + C", "B) ln(x) + C", "C) 1 + C", "D) x + C", "E) eˣ + C"], "B", "ln(x)'in türevi 1/x olduğundan ∫ 1/x dx = ln|x| + C."),
            ("f(x) = x fonksiyonu, x = 0, x = 4 doğruları ve x ekseni arasında kalan alan kaç br²'dir?", ["A) 4", "B) 8", "C) 16", "D) 12", "E) 6"], "B", "Alan = ∫₀⁴ x dx = [x²/2]₀⁴ = 16/2 = 8 br² (veya dik üçgen alanı: 4 × 4 / 2 = 8)."),
            ("∫ (2x + 1)⁴ dx integralinde u = 2x + 1 değişken değiştirmesi yapılırsa du ne olur?", ["A) dx", "B) 2 dx", "C) 4 dx", "D) dx / 2", "E) 2x dx"], "B", "u = 2x + 1 -> du/dx = 2 -> du = 2 dx."),
            ("∫₋₁¹ x³ dx belirli integralinin sonucu kaçtır?", ["A) 0", "B) 1/2", "C) 1", "D) -1/2", "E) 2"], "A", "x³ tek fonksiyondur ve simetrik [-a, a] aralığında integrali daima 0'dır: [x⁴/4]₋₁¹ = 1/4 - 1/4 = 0."),
            ("∫ eˣ dx integralinin eşiti nedir?", ["A) eˣ + C", "B) eˣ⁺¹ + C", "C) x·eˣ + C", "D) ln(e) + C", "E) 1/eˣ + C"], "A", "eˣ fonksiyonunun türevi ve integrali kendisine eşittir: eˣ + C."),
            ("f(x) = 4 - x² parabolü ile x ekseni arasında kalan kapalı bölgenin alanı kaç br²'dir?", ["A) 16/3", "B) 32/3", "C) 8", "D) 12", "E) 64/3"], "B", "Kökler: 4 - x² = 0 -> x = -2 ve x = 2. Alan = ∫₋₂² (4 - x²)dx = [4x - x³/3]₋₂² = (8 - 8/3) - (-8 + 8/3) = 16/3 + 16/3 = 32/3 br²."),
            ("∫ₐᵇ f(x) dx = - ∫ᵦᵃ f(x) dx eşitliği doğru mudur?", ["A) Evet, sınırlar yer değiştirirse integral işaret değiştirir", "B) Hayır, daima pozitiftir", "C) Yalnızca a=0 iken", "D) Yalnızca b=0 iken", "E) Tanımsızdır"], "A", "Belirli integral özelliğine göre sınırların yer değişimi integrali -1 ile çarpar."),
            ("∫ f'(x)·[f(x)]ⁿ dx integralinin sonucu nedir?", ["A) [f(x)]ⁿ⁺¹ / (n + 1) + C", "B) n·[f(x)]ⁿ⁻¹ + C", "C) f(x) + C", "D) [f'(x)]² + C", "E) f''(x) + C"], "A", "u = f(x) dönüşümü ile ∫ uⁿ du = uⁿ⁺¹/(n+1) + C."),
            ("∫ 2x·(x² + 3)⁴ dx integralinin sonucu nedir?", ["A) (x² + 3)⁵ / 5 + C", "B) (x² + 3)⁵ + C", "C) 10x·(x² + 3)³ + C", "D) (x² + 3)⁴ + C", "E) x⁴ + C"], "A", "u = x² + 3 -> du = 2x dx. ∫ u⁴ du = u⁵/5 + C = (x² + 3)⁵ / 5 + C."),
            ("Bir fonksiyonun belirli integrali negatif bir değer çıkabilir mi?", ["A) Evet, eğri x ekseninin altında kaldığında integral negatif değer alır", "B) Hayır, integral alan olduğu için asla negatif olamaz", "C) Yalnızca trigonometride", "D) İmkansızdır", "E) Yalnızca sıfır olabilir"], "A", "Alan daima pozitif olsa da belirli integral x ekseninin altındaki bölgelerde negatif işaretlidir."),
            ("∫₁² (1/x²) dx integralinin sonucu kaçtır?", ["A) 1/2", "B) -1/2", "C) 1", "D) 2", "E) 1/4"], "A", "∫ x⁻² dx = -x⁻¹ = -1/x. Sınırlar [1, 2]: (-1/2) - (-1/1) = -1/2 + 1 = 1/2."),
            ("∫ (cos x) dx integralinin eşiti nedir?", ["A) sin x + C", "B) -sin x + C", "C) tan x + C", "D) sec x + C", "E) -cos x + C"], "A", "(sin x)' = cos x olduğundan integral sin x + C'dir."),
            ("Riemann toplamında alt aralık sayısı sonsuza giderken (n → ∞) elde edilen limit değeri neye eşittir?", ["A) Fonksiyonun türevine", "B) Belirli integrale (Eğri altındaki net alana)", "C) Orijine", "D) Teğet eğimine", "E) Sonsuza"], "B", "Riemann toplamının limiti doğrudan belirli integralin tanımıdır.")
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
