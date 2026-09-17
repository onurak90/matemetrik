# -*- coding: utf-8 -*-
"""
Helper to write data_grade9_tema1.py with complete questions and solutions for all 29 pages
"""

import json

pages = [
    # 12
    {
        "page": 12,
        "tema": "1. Tema: Sayılar",
        "topic": "Ön Değerlendirme",
        "type": "Ön Değerlendirme",
        "intro": "9. sınıf matematik 1. tema 'Sayılar' ünitesi öncesinde yer alan Ön Değerlendirme bölümünde; rasyonel sayılarla dört işlem, rasyonel sayıların kuvvetleri, köklü gösterimlerin kök dışına çıkarılması ve rasyonellik incelemesi, basamak değerleri, sayı doğrusunda gerçek sayı aralıkları ve temel cebirsel modelleme soruları yer almaktadır.",
        "questions": [
            {
                "num": 1,
                "title": "Soru 1: Ondalık Sayılarla Dört İşlem",
                "text": "Aşağıdaki işlemleri yapınız:\na) 0,19 + 2,01\nb) (0,219 - 0,009) / 2,1\nc) (0,2 - 0,1) / 0,004",
                "solution": "<p><strong>a)</strong> 0,19 + 2,01 = 2,20 = <strong>2,2</strong></p><p><strong>b)</strong> Pay: 0,219 - 0,009 = 0,210 = 0,21. Bölme: 0,21 / 2,1 = 21 / 210 = <strong>0,1</strong></p><p><strong>c)</strong> Parantez içi: 0,2 - 0,1 = 0,1. Bölme: 0,1 / 0,004 = (0,1 × 1000) / (0,004 × 1000) = 100 / 4 = <strong>25</strong></p>",
                "answer": "a) 2,2 &emsp; b) 0,1 &emsp; c) 25"
            },
            {
                "num": 2,
                "title": "Soru 2: Rasyonel Sayıların Kuvvetleri",
                "text": "Verilen örneklerden yararlanarak (3/4)^2 · (-1/3)^4 işleminin sonucunu bulunuz.",
                "solution": "<p>• (3/4)^2 = 3^2 / 4^2 = 9 / 16</p><p>• (-1/3)^4 = 1 / 3^4 = 1 / 81</p><p>Çarpım: (9/16) · (1/81) = 9 / (16 × 81) = 1 / (16 × 9) = <strong>1 / 144</strong></p>",
                "answer": "1 / 144"
            },
            {
                "num": 3,
                "title": "Soru 3: Köklü Sayılarda Rasyonellik",
                "text": "Aşağıdaki köklü ifadeleri kök dışına çıkararak rasyonel sayı olup olmadıklarını belirleyiniz:\na) √49\nb) √1,69\nc) -√(64/81)",
                "solution": "<p><strong>a)</strong> √49 = 7 (7 = 7/1 olduğundan <strong>Rasyonel sayıdır</strong>, 7 ∈ Q)</p><p><strong>b)</strong> √1,69 = √(169/100) = 13/10 = 1,3 (<strong>Rasyonel sayıdır</strong>, 1,3 ∈ Q)</p><p><strong>c)</strong> -√(64/81) = - (√64 / √81) = -8/9 (<strong>Rasyonel sayıdır</strong>, -8/9 ∈ Q)</p>",
                "answer": "a) 7 (Rasyonel) &emsp; b) 1,3 (Rasyonel) &emsp; c) -8/9 (Rasyonel)"
            },
            {
                "num": 4,
                "title": "Soru 4: Basamak Değerleri",
                "text": "14,076 sayısının basamak değerlerini belirleyiniz.",
                "solution": "<p>• Onlar basamağı (1): 1 × 10 = <strong>10</strong><br>• Birler basamağı (4): 4 × 1 = <strong>4</strong><br>• Onda birler basamağı (0): 0 × 0,1 = <strong>0</strong><br>• Yüzde birler basamağı (7): 7 × 0,01 = <strong>0,07</strong><br>• Binde birler basamağı (6): 6 × 0,001 = <strong>0,006</strong></p>",
                "answer": "10 + 4 + 0 + 0,07 + 0,006 = 14,076"
            },
            {
                "num": 5,
                "title": "Soru 5: Gerçek Sayı Aralıkları Tablosu",
                "text": "Verilen aralıkları sayı doğrusunda ve küme gösterimiyle ifade ediniz: (-3, 3], [1, 7), [-1, 4], [-5, 0).",
                "solution": "<p>• (-3, 3]: {x ∈ R | -3 < x ≤ 3}. Sayı doğrusunda -3 açık çember, 3 kapalı çember.<br>• [1, 7): {x ∈ R | 1 ≤ x < 7}. 1 kapalı, 7 açık.<br>• [-1, 4]: {x ∈ R | -1 ≤ x ≤ 4}. -1 ve 4 kapalı.<br>• [-5, 0): {x ∈ R | -5 ≤ x < 0}. -5 kapalı, 0 açık.</p>",
                "answer": "Açık uçlar () içi boş çemberle, kapalı uçlar [] içi dolu çemberle gösterilir."
            },
            {
                "num": 6,
                "title": "Soru 6: Köklü Sayıların Sayı Doğrusundaki Yerleri",
                "text": "Sayıların yaklaşık yerlerini gösteriniz: a) √8 &emsp; b) -√11 &emsp; c) √29",
                "solution": "<p><strong>a)</strong> √4 < √8 < √9 ⇒ 2 < √8 < 3. √8 ≈ <strong>2,83</strong> (3'e çok yakın)</p><p><strong>b)</strong> √9 < √11 < √16 ⇒ 3 < √11 < 4 ⇒ -4 < -√11 < -3. -√11 ≈ <strong>-3,32</strong></p><p><strong>c)</strong> √25 < √29 < √36 ⇒ 5 < √29 < 6. √29 ≈ <strong>5,39</strong></p>",
                "answer": "a) 2 ile 3 arasında (~2,83) &emsp; b) -4 ile -3 arasında (~ -3,32) &emsp; c) 5 ile 6 arasında (~5,39)"
            },
            {
                "num": 7,
                "title": "Soru 7: Geometrik Modelleme ve Çevre Hesabı",
                "text": "Kenar uzunlukları (2a + b) ve (2a - b) olan dikdörtgen bahçe ile kenarı 3y olan kare havuzun çevre cebirsel ifadelerini yazınız.",
                "solution": "<p><strong>Bahçenin Çevresi:</strong> 2 × [(2a + b) + (2a - b)] = 2 × [4a] = <strong>8a</strong></p><p><strong>Havuzun Çevresi:</strong> 4 × (3y) = <strong>12y</strong></p>",
                "answer": "Bahçe: 8a &emsp; Havuz: 12y"
            }
        ]
    },
    # 15
    {
        "page": 15,
        "tema": "1. Tema: Sayılar",
        "topic": "1.1. Gerçek Sayıların Üslü ve Köklü Gösterimleri",
        "type": "1. Sıra Sizde",
        "intro": "Sayfa 15'te negatif üs, sıfırıncı kuvvet, rasyonel üslü ifadeler ve biyolojik veri bağlamında (kan hücreleri) üslü sayılarla toplama-çıkarma işlemleri yer almaktadır.",
        "questions": [
            {
                "num": 1,
                "title": "1. Sıra Sizde: Üslü İşlem",
                "text": "[(1/3)^(-2) + (-4)^0] / [(1/2)^(-1) - (-2)^(-3)] işleminin sonucunu bulunuz.",
                "solution": "<p>Pay: (1/3)^(-2) = 3^2 = 9. (-4)^0 = 1. Pay = 9 + 1 = 10.</p><p>Payda: (1/2)^(-1) = 2. (-2)^(-3) = 1/(-8) = -1/8. Payda = 2 - (-1/8) = 2 + 1/8 = 17/8.</p><p>Bölme: 10 / (17/8) = 10 × (8/17) = <strong>80 / 17</strong></p>",
                "answer": "80 / 17"
            },
            {
                "num": 2,
                "title": "Uygulama: Kan Hücreleri Sayımı",
                "text": "1 litre kanda 5·10^9 alyuvar, 6·10^6 akyuvar ve 0,2·10^9 trombosit hücresi bulunmaktadır. Alyuvar ve trombosit hücrelerinin toplamını ve farkını bulunuz.",
                "solution": "<p>Toplam: 5·10^9 + 0,2·10^9 = (5 + 0,2)·10^9 = <strong>5,2 · 10^9</strong></p><p>Fark: 5·10^9 - 0,2·10^9 = (5 - 0,2)·10^9 = <strong>4,8 · 10^9</strong></p>",
                "answer": "Toplam: 5,2 · 10^9 &emsp; Fark: 4,8 · 10^9"
            },
            {
                "num": 3,
                "title": "Tablo: Ortak Çarpan Parantezi",
                "text": "-7·11^5 + 4·11^5 ; 0,4·5^7 + 2,1·5^7 ; 3·10^5 - 10^5 + 2,5·10^5 işlemlerini yapınız.",
                "solution": "<p>• (-7 + 4)·11^5 = <strong>-3 · 11^5</strong></p><p>• (0,4 + 2,1)·5^7 = <strong>2,5 · 5^7</strong></p><p>• (3 - 1 + 2,5)·10^5 = <strong>4,5 · 10^5</strong></p>",
                "answer": "-3·11^5 ; 2,5·5^7 ; 4,5·10^5"
            }
        ]
    },
    # 22
    {
        "page": 22,
        "tema": "1. Tema: Sayılar",
        "topic": "1.1. Gerçek Sayıların Üslü ve Köklü Gösterimleri",
        "type": "2. Sıra Sizde",
        "intro": "Sayfa 22'deki 2. Sıra Sizde bölümünde üslü sayıların çarpma ve bölme kuralları, değişken değiştirme ve geometrik alan modellemesi soruları yer almaktadır.",
        "questions": [
            {
                "num": 1,
                "title": "Soru 1: Üslü Sadeleştirme",
                "text": "[(18^3 · 14^5) / (7^5 · 6^3 · 3^12)] işleminin sonucunu bulunuz.",
                "solution": "<p>18 = 2·3^2 ⇒ 18^3 = 2^3·3^6<br>14 = 2·7 ⇒ 14^5 = 2^5·7^5<br>Pay = 2^8 · 3^6 · 7^5</p><p>6 = 2·3 ⇒ 6^3 = 2^3·3^3<br>Payda = 7^5 · 2^3 · 3^3 · 3^12 = 2^3 · 3^15 · 7^5</p><p>Oran = 2^(8-3) · 3^(6-15) = 2^5 · 3^(-9) = <strong>32 / 3^9 = 32 / 19683</strong></p>",
                "answer": "32 / 3^9 (32 / 19683)"
            },
            {
                "num": 2,
                "title": "Soru 2: Değişken Değiştirme",
                "text": "2^x = 3 olduğuna göre 4^(x + 1/2) ifadesinin eşitini bulunuz.",
                "solution": "<p>4^(x + 1/2) = 4^x · 4^(1/2) = (2^2)^x · √4 = (2^x)^2 · 2</p><p>2^x = 3 yerine yazılırsa: 3^2 · 2 = 9 · 2 = <strong>18</strong></p>",
                "answer": "18"
            },
            {
                "num": 3,
                "title": "Soru 3: Geometrik Alan Farkı",
                "text": "Kenarı 3^a olan karenin alanı x'tir. Kenarı 27^a olan karenin köşesinden kenarı 3 olan kare kesilip atıldığında kalan alanın x cinsinden eşitini bulunuz.",
                "solution": "<p>Şekil 1 alanı: (3^a)^2 = 3^(2a) = x.<br>Şekil 2 alanı: (27^a)^2 - 3^2 = (3^(3a))^2 - 9 = 3^(6a) - 9.</p><p>3^(6a) = (3^(2a))^3 = x^3 olduğundan alan = <strong>x^3 - 9</strong> birimkaredir.</p>",
                "answer": "x^3 - 9"
            }
        ]
    },
    # 24
    {
        "page": 24,
        "tema": "1. Tema: Sayılar",
        "topic": "1.1. Gerçek Sayıların Üslü ve Köklü Gösterimleri",
        "type": "3. Sıra Sizde",
        "intro": "Sayfa 24'te serbest düşme süresi t = √(2x/g) bağıntısı ve yer çekimi ivmesi kullanılarak köklü denklemlerin hesaplanması işlenmektedir.",
        "questions": [
            {
                "num": 1,
                "title": "3. Sıra Sizde: Serbest Düşme Hesabı",
                "text": "11,5 m yükseklikten serbest bırakılan bir cismin Dünya'da (g = 9,8 m/s^2) ve Ay'da (g = 1,62 m/s^2) yere düşme süresini hesaplayınız.",
                "solution": "<p>• Dünya: t = √(2 × 11,5 / 9,8) = √(23 / 9,8) = √2,347 ≈ <strong>1,53 saniye</strong></p><p>• Ay: t = √(2 × 11,5 / 1,62) = √(23 / 1,62) = √14,198 ≈ <strong>3,77 saniye</strong></p>",
                "answer": "Dünya: ≈ 1,53 sn &emsp; Ay: ≈ 3,77 sn"
            }
        ]
    },
    # 28
    {
        "page": 28,
        "tema": "1. Tema: Sayılar",
        "topic": "1.1. Gerçek Sayıların Üslü ve Köklü Gösterimleri",
        "type": "4. Sıra Sizde",
        "intro": "Sayfa 28'de kök dışına çıkarma ve aynı kök derecesine sahip köklü ifadelerle toplama ve çıkarma alıştırmaları yer almaktadır.",
        "questions": [
            {
                "num": 1,
                "title": "4. Sıra Sizde: Kök İçi Sadeleştirme ve Toplama",
                "text": "√75 - 2√12 + 5√27 işleminin sonucunu bulunuz.",
                "solution": "<p>• √75 = √(25·3) = 5√3<br>• 2√12 = 2·√(4·3) = 2·2√3 = 4√3<br>• 5√27 = 5·√(9·3) = 5·3√3 = 15√3</p><p>İşlem: 5√3 - 4√3 + 15√3 = (5 - 4 + 15)√3 = <strong>16√3</strong></p>",
                "answer": "16√3"
            }
        ]
    },
    # 29
    {
        "page": 29,
        "tema": "1. Tema: Sayılar",
        "topic": "1.1. Gerçek Sayıların Üslü ve Köklü Gösterimleri",
        "type": "5. Sıra Sizde",
        "intro": "Sayfa 29'da ardışık kök alma işlemi ve rasyonel üs ilişkisi Ay yüzeyinde zıplayan cisim problemi üzerinden modellenmiştir.",
        "questions": [
            {
                "num": 1,
                "title": "5. Sıra Sizde: Ardışık Kök Alma",
                "text": "a metre yükseklikten bırakılan cisim her çarpmada yüksekliğin karekökü kadar yükselmektedir. 1, 2 ve 3. çarpmalardan sonraki yükseklikleri bulunuz.",
                "solution": "<p>• 1. çarpmadan sonra: h1 = √a = <strong>a^(1/2)</strong> metre<br>• 2. çarpmadan sonra: h2 = √(h1) = √(a^(1/2)) = <strong>a^(1/4) = ∜a</strong> metre<br>• 3. çarpmadan sonra: h3 = √(h2) = √(a^(1/4)) = <strong>a^(1/8) = ⁸√a</strong> metre</p>",
                "answer": "1. Çarpma: √a &emsp; 2. Çarpma: ∜a &emsp; 3. Çarpma: ⁸√a"
            }
        ]
    },
    # 32
    {
        "page": 32,
        "tema": "1. Tema: Sayılar",
        "topic": "1.1. Gerçek Sayıların Üslü ve Köklü Gösterimleri",
        "type": "7. Sıra Sizde",
        "intro": "Sayfa 32'de farklı kök derecelerine sahip sayıların ortak kök derecesinde çarpılması ve negatif köklü sayıların sıralanması işlenmektedir.",
        "questions": [
            {
                "num": 1,
                "title": "Soru 1: Kök Derecelerini Eşitleme",
                "text": "∛6 · √2 · ∜5 işleminin sonucunu bulunuz.",
                "solution": "<p>EKOK(3, 2, 4) = 12. Kökleri 12. derecede eşitleyelim:<br>∛6 = ¹²√(6^4) = ¹²√1296<br>√2 = ¹²√(2^6) = ¹²√64<br>∜5 = ¹²√(5^3) = ¹²√125</p><p>Çarpım: ¹²√(1296 × 64 × 125) = <strong>¹²√(10.368.000) = ¹²√(2^10 · 3^4 · 5^3)</strong></p>",
                "answer": "¹²√(2^10 · 3^4 · 5^3)"
            },
            {
                "num": 2,
                "title": "Soru 2: Negatif Köklü Sayılarda Sıralama",
                "text": "x = -∜3, y = -∛4, z = -⁶√8 sayılarını küçükten büyüğe sıralayınız.",
                "solution": "<p>z = -⁶√8 = -⁶√(2^3) = -√2.<br>Pozitif hallerini 12. kuvvete alalım: (∜3)^12 = 3^3 = 27, (∛4)^12 = 4^4 = 256, (√2)^12 = 2^6 = 64.<br>Pozitif sıra: ∜3 < √2 < ∛4.<br>Negatif sayılarda eşitsizlik yön değiştirdiğinden: -∛4 < -√2 < -∜3 yani <strong>y < z < x</strong> bulunur.</p>",
                "answer": "y < z < x"
            }
        ]
    },
    # 34
    {
        "page": 34,
        "tema": "1. Tema: Sayılar",
        "topic": "1.1. Gerçek Sayıların Üslü ve Köklü Gösterimleri",
        "type": "8. Sıra Sizde",
        "intro": "Sayfa 34'te eşlenik çarpımı ile paydanın rasyonelleştirilmesi ve köklü kesirlerin toplamı yer almaktadır.",
        "questions": [
            {
                "num": 1,
                "title": "8. Sıra Sizde: Eşlenik ile Rasyonelleştirme",
                "text": "[1 / (√5 + √3)] + [1 / (√3 + 1)] - [1 / (√2 + 1)] işleminin sonucunu bulunuz.",
                "solution": "<p>• 1/(√5+√3) eşleniği ile çarpılırsa: (√5 - √3) / 2<br>• 1/(√3+1) eşleniği ile çarpılırsa: (√3 - 1) / 2<br>Toplamları: (√5 - 1) / 2<br>• 1/(√2+1) eşleniği ile çarpılırsa: (√2 - 1) / 1 = √2 - 1 = (2√2 - 2) / 2<br>Fark: [(√5 - 1) - (2√2 - 2)] / 2 = <strong>(√5 - 2√2 + 1) / 2</strong></p>",
                "answer": "(√5 - 2√2 + 1) / 2"
            }
        ]
    },
    # 36
    {
        "page": 36,
        "tema": "1. Tema: Sayılar",
        "topic": "1.1. Gerçek Sayıların Üslü ve Köklü Gösterimleri",
        "type": "Alıştırmalar",
        "intro": "Sayfa 36'da metropol şehirlerin yüz ölçümleri ve nüfusları üzerinden bilimsel gösterim ve nüfus yoğunluğu hesaplama alıştırmaları yer almaktadır.",
        "questions": [
            {
                "num": 1,
                "title": "Soru 1: Alan Farkı ve Bilimsel Gösterim",
                "text": "Pekin yüz ölçümü 1,6·10^3 km^2, Tokyo 2,2·10^2 km^2 dir. Pekin'in Tokyo'dan kaç m^2 fazla olduğunu bulunuz (1 km^2 = 10^6 m^2).",
                "solution": "<p>Fark = 1600 - 220 = 1380 km^2.<br>m^2 cinsinden: 1380 × 10^6 m^2 = <strong>1,38 · 10^9 m^2</strong></p>",
                "answer": "1,38 · 10^9 m^2"
            },
            {
                "num": 2,
                "title": "Soru 2: Nüfus Yoğunluğu",
                "text": "Tokyo, Delhi ve Pekin şehirlerinin nüfus yoğunluklarını (kişi/km^2) karşılaştırınız.",
                "solution": "<p>• Tokyo = (3,74·10^7) / (2,2·10^2) ≈ 170.000 kişi/km^2<br>• Delhi = (3,14·10^7) / (1,5·10^2) ≈ 209.333 kişi/km^2<br>• Pekin = (2,15·10^7) / (1,6·10^3) ≈ 13.437 kişi/km^2<br>Sıralama: <strong>Delhi > Tokyo > Pekin</strong></p>",
                "answer": "Delhi (~209.333) > Tokyo (~170.000) > Pekin (~13.437)"
            }
        ]
    },
    # 40
    {
        "page": 40,
        "tema": "1. Tema: Sayılar",
        "topic": "1.2. Gerçek Sayı Aralıkları ve Küme İşlemleri",
        "type": "8. Sıra Sizde",
        "intro": "Sayfa 40'ta sayı kümeleri (Doğal sayılar N, Tam sayılar Z, Rasyonel sayılar Q, İrrasyonel sayılar Q' ve Gerçek sayılar R) arasındaki kapsama ve eleman ilişkileri incelenmektedir.",
        "questions": [
            {
                "num": 1,
                "title": "Soru 1: √3 Sayısının Kümeleri",
                "text": "√3 sayısının hangi sayı kümelerine ait olduğunu sembolik olarak yazınız.",
                "solution": "<p>√3 tam kare olmayan bir sayının köküdür, virgülden sonra devretmeden sonsuza uzanır.<br>Dolayısıyla √3 ∉ Q (rasyonel değildir).<br>√3 ∈ Q' (İrrasyonel sayılar) ve √3 ∈ R (Gerçek sayılar) kümesinin elemanıdır.</p>",
                "answer": "√3 ∈ Q' ve √3 ∈ R"
            },
            {
                "num": 2,
                "title": "Soru 2: Sayı Kümeleri Alt Küme Bağıntısı",
                "text": "Doğal sayılar kümesinin diğer sayı kümeleri ile alt küme ilişkisini yazınız.",
                "solution": "<p>Her doğal sayı aynı zamanda bir tam sayı, her tam sayı bir rasyonel sayı ve her rasyonel sayı bir gerçek sayıdır:<br><strong>N ⊂ Z ⊂ Q ⊂ R</strong></p>",
                "answer": "N ⊂ Z ⊂ Q ⊂ R"
            }
        ]
    },
    # 44
    {
        "page": 44,
        "tema": "1. Tema: Sayılar",
        "topic": "1.2. Gerçek Sayı Aralıkları ve Küme İşlemleri",
        "type": "9. Sıra Sizde",
        "intro": "Sayfa 44'te gerçek sayı aralıklarının cebirsel temsili, küme gösterimi ve sayı doğrusunda geometrik temsili yer almaktadır.",
        "questions": [
            {
                "num": 1,
                "title": "9. Sıra Sizde: Aralıkların Temsili",
                "text": "a) Sıfırdan küçük veya sıfıra eşit gerçek sayılar aralığını yazınız.\nb) 90 ve 130 cm arasındaki (dahil) değerlerin aralığını yazınız.",
                "solution": "<p><strong>a)</strong> Cebirsel: {x ∈ R | x ≤ 0}. Aralık gösterimi: <strong>(-∞, 0]</strong>. Sayı doğrusunda 0 noktası dolu, sol taraf taranır.</p><p><strong>b)</strong> Cebirsel: {x ∈ R | 90 ≤ x ≤ 130}. Aralık gösterimi: <strong>[90, 130]</strong>. Sayı doğrusunda 90 ve 130 dolu çemberle gösterilir.</p>",
                "answer": "a) (-∞, 0] &emsp; b) [90, 130]"
            }
        ]
    },
    # 46
    {
        "page": 46,
        "tema": "1. Tema: Sayılar",
        "topic": "1.2. Gerçek Sayı Aralıkları ve Küme İşlemleri",
        "type": "10. Sıra Sizde",
        "intro": "Sayfa 46'da eğlence parkı aktivitelerine katılım için boy sınırları ve karayolları hız limitlerinin küme kesişimleri üzerinden modellenmesi yer almaktadır.",
        "questions": [
            {
                "num": 1,
                "title": "10. Sıra Sizde: Lunapark Boy Aralıkları ve Kümeler",
                "text": "Dönen Şato [100, 150], Nefeskesen [140, 190], Macera Odası [120, 170] boy aralıklarına göre bilet alabilecek kişileri belirleyiniz.",
                "solution": "<p>• <strong>Sadece Dönen Şato:</strong> [100, 120) boy aralığındaki bireyler sadece Dönen Şato'ya binebilir.<br>• <strong>Hem Nefeskesen Hem Macera Odası:</strong> Kesişim kümesi [140, 190] ∩ [120, 170] = <strong>[140, 170]</strong> aralığıdır.<br>• <strong>Macera Odası Biletini Alıp Nefeskesen Alamayanlar:</strong> [120, 170] \\ [140, 190] = <strong>[120, 140)</strong> aralığıdır.</p>",
                "answer": "Kesişim aralığı: [140, 170] cm &emsp; Fark aralığı: [120, 140) cm"
            },
            {
                "num": 2,
                "title": "11. Sıra Sizde: Hız Sınırları Aralıkları",
                "text": "Şehir içi hız limiti saatte en fazla 50 km, şehirlerarası çift yönlü yolda en fazla 90 km'dir. Uyulması gereken hız aralıklarını yazınız.",
                "solution": "<p>• Şehir içi hız aralığı: <strong>[0, 50]</strong> km/sa ({v ∈ R | 0 ≤ v ≤ 50})<br>• Şehir dışı çift yönlü yol hız aralığı: <strong>[0, 90]</strong> km/sa ({v ∈ R | 0 ≤ v ≤ 90})</p>",
                "answer": "Şehir içi: [0, 50] km/sa &emsp; Şehir dışı: [0, 90] km/sa"
            }
        ]
    },
    # 49
    {
        "page": 49,
        "tema": "1. Tema: Sayılar",
        "topic": "1.2. Gerçek Sayı Aralıkları ve Küme İşlemleri",
        "type": "12. Sıra Sizde",
        "intro": "Sayfa 49'da 1 aylık kız ve erkek bebeklerin ideal baş çevresi değerleri üzerinden küme birleşimi, kesişimi ve farkı modellenmektedir.",
        "questions": [
            {
                "num": 1,
                "title": "12. Sıra Sizde: Baş Çevresi Küme İşlemleri",
                "text": "Kız bebek baş çevresi A = [34,8, 39,5] ve Erkek bebek B = [35,3, 40,5] olduğuna göre A ∩ B, A ∪ B, A \\ B ve B \\ A kümelerini bulunuz.",
                "solution": "<p>• <strong>A ∩ B (Kesişim):</strong> İki aralığın ortak kısmı: <strong>[35,3, 39,5]</strong><br>• <strong>A ∪ B (Birleşim):</strong> En küçük alt sınırdan en büyük üst sınıra: <strong>[34,8, 40,5]</strong><br>• <strong>A \\ B (Kızlarda olup erkekte olmayan):</strong> <strong>[34,8, 35,3)</strong><br>• <strong>B \\ A (Erkeklerde olup kızda olmayan):</strong> <strong>(39,5, 40,5]</strong></p>",
                "answer": "A ∩ B = [35,3, 39,5] ; A ∪ B = [34,8, 40,5] ; A \\ B = [34,8, 35,3) ; B \\ A = (39,5, 40,5]"
            }
        ]
    },
    # 52
    {
        "page": 52,
        "tema": "1. Tema: Sayılar",
        "topic": "1.2. Gerçek Sayı Aralıkları ve Küme İşlemleri",
        "type": "13. Sıra Sizde",
        "intro": "Sayfa 52'de vücut sıcaklığı eşik değerleri üzerinden mutlak değerli eşitsizlik modeli (|x - a| ≤ r) kurulması işlenmektedir.",
        "questions": [
            {
                "num": 1,
                "title": "13. Sıra Sizde: Vücut Sıcaklığı Mutlak Değer Modeli",
                "text": "İdeal insan vücut sıcaklığı 37 °C'tur. 4 °C üzeri ve altındaki değerler hayati risk taşımaktadır. Hayati risk taşımayan güvenli sıcaklık aralığını mutlak değerli eşitsizlik olarak yazınız.",
                "solution": "<p>Sıcaklık T olsun. İdeal değerden sapma miktarı en fazla 4 °C olmalıdır:<br><strong>|T - 37| ≤ 4</strong></p><p>Eşitsizliği çözersek:<br>-4 ≤ T - 37 ≤ 4 ⇒ 37 - 4 ≤ T ≤ 37 + 4 ⇒ <strong>33 ≤ T ≤ 41 °C</strong> (Aralık: [33, 41])</p>",
                "answer": "|T - 37| ≤ 4 (Aralık: [33, 41] °C)"
            }
        ]
    },
    # 55
    {
        "page": 55,
        "tema": "1. Tema: Sayılar",
        "topic": "1.2. Gerçek Sayı Aralıkları ve Küme İşlemleri",
        "type": "Alıştırmalar",
        "intro": "Sayfa 55'te gerçek sayı aralıklarının sözel ifade, cebirsel gösterim, küme gösterimi ve sayı doğrusunda temsili tablosu alıştırmaları yer almaktadır.",
        "questions": [
            {
                "num": 1,
                "title": "Soru 1: Aralık Gösterim Tablosu",
                "text": "En küçük iki basamaklı negatif tam sayı (-99) ile en küçük üç basamaklı pozitif tam sayı (100) arasındaki gerçek sayıları ifade ediniz.",
                "solution": "<p>• Sözel: -99 ile 100 arasındaki gerçek sayılar.<br>• Cebirsel: {x ∈ R | -99 < x < 100}<br>• Aralık: <strong>(-99, 100)</strong><br>• Sayı doğrusu: -99 ve 100 içi boş çemberle işaretlenip araları taranır.</p>",
                "answer": "(-99, 100) açık aralığı"
            },
            {
                "num": 2,
                "title": "Soru 2: Eşitsizlikten Aralığa Dönüşüm",
                "text": "-3 ≤ (2x - 1) / 3 < 5 eşitsizliğini sağlayan x gerçek sayılarının aralığını bulunuz.",
                "solution": "<p>Her tarafı 3 ile çarpalım:<br>-9 ≤ 2x - 1 < 15<br>Her tarafa 1 ekleyelim:<br>-8 ≤ 2x < 16<br>Her tarafı 2'ye bölelim:<br><strong>-4 ≤ x < 8</strong><br>Aralık gösterimi: <strong>[-4, 8)</strong></p>",
                "answer": "[-4, 8)"
            }
        ]
    },
    # 56
    {
        "page": 56,
        "tema": "1. Tema: Sayılar",
        "topic": "1.2. Gerçek Sayı Aralıkları ve Küme İşlemleri",
        "type": "Alıştırmalar (Devam)",
        "intro": "Sayfa 56'da aralıkların mutlak değerli eşitsizlik şeklinde ifade edilmesi ve küme işlemlerinin sayı doğrusunda gösterimi yer almaktadır.",
        "questions": [
            {
                "num": 3,
                "title": "Soru 3: Aralıkları Mutlak Değerle İfade Etme",
                "text": "(11/3, 19/3) aralığını mutlak değerli eşitsizlik biçiminde yazınız.",
                "solution": "<p>Orta nokta (merkez) = (11/3 + 19/3) / 2 = (30/3) / 2 = 10 / 2 = 5.<br>Yarıçap (sapma) = (19/3 - 11/3) / 2 = (8/3) / 2 = 4/3.<br>Mutlak değerli eşitsizlik: <strong>|x - 5| < 4/3</strong></p>",
                "answer": "|x - 5| < 4/3"
            },
            {
                "num": 4,
                "title": "Soru 4: Küme Kesişim ve Birleşimleri",
                "text": "A = [-2, 13] ve B = (-4, 10] aralıkları için A ∩ B ve A ∪ B kümelerini bulunuz.",
                "solution": "<p>• <strong>A ∩ B (Kesişim):</strong> Ortak elemanlar: <strong>[-2, 10]</strong><br>• <strong>A ∪ B (Birleşim):</strong> Tüm elemanlar: <strong>(-4, 13]</strong><br>• <strong>A \\ B (Fark):</strong> (10, 13]</p>",
                "answer": "A ∩ B = [-2, 10] &emsp; A ∪ B = (-4, 13]"
            }
        ]
    },
    # 61
    {
        "page": 61,
        "tema": "1. Tema: Sayılar",
        "topic": "1.3. Sayı Kümeleri ve İşlem Özellikleri",
        "type": "13. Sıra Sizde",
        "intro": "Sayfa 61'de rasyonel sayıların yoğunluk özelliği: herhangi iki farklı rasyonel sayının aritmetik ortalamasının bu iki sayı arasında yer aldığının cebirsel ispatı işlenmektedir.",
        "questions": [
            {
                "num": 1,
                "title": "13. Sıra Sizde: Aritmetik Ortalama ve Yoğunluk İspatı",
                "text": "a, b ∈ Q ve b < a olmak üzere b < (a + b)/2 < a olduğunu cebirsel olarak ispatlayınız.",
                "solution": "<p><strong>İspat 1. Kısım: b < (a + b)/2</strong><br>b < a eşitsizliğinin her iki tarafına b ekleyelim:<br>b + b < a + b ⇒ 2b < a + b ⇒ Her iki tarafı 2'ye bölersek: <strong>b < (a + b)/2</strong> (I)</p><p><strong>İspat 2. Kısım: (a + b)/2 < a</strong><br>b < a eşitsizliğinin her iki tarafına a ekleyelim:<br>a + b < a + a ⇒ a + b < 2a ⇒ Her iki tarafı 2'ye bölersek: <strong>(a + b)/2 < a</strong> (II)</p><p>(I) ve (II) birleştirildiğinde: <strong>b < (a + b)/2 < a</strong> elde edilir. Bu özellik rasyonel sayıların sayı doğrusunda yoğun olduğunu kanıtlar.</p>",
                "answer": "b < a ⇒ b + b < a + b ⇒ b < (a+b)/2 ve a + b < a + a ⇒ (a+b)/2 < a. İspat tamamlandı."
            }
        ]
    },
    # 65
    {
        "page": 65,
        "tema": "1. Tema: Sayılar",
        "topic": "1.3. Sayı Kümeleri ve İşlem Özellikleri",
        "type": "14. Sıra Sizde",
        "intro": "Sayfa 65'te çift sayılar kümesinin toplama, çıkarma, çarpma ve bölme işlemlerine göre kapalılık özelliği karşıt örnek sunma yöntemiyle incelenmektedir.",
        "questions": [
            {
                "num": 1,
                "title": "14. Sıra Sizde: Çift Sayılar Kümesinin Kapalılığı",
                "text": "A = {x | x = 2k, k ∈ Z} çift tam sayılar kümesinin dört işleme göre kapalı olup olmadığını inceleyiniz.",
                "solution": "<p>x1 = 2a ve x2 = 2b olsun (a, b ∈ Z):<br>"
                            "• <strong>Toplama:</strong> x1 + x2 = 2a + 2b = 2(a + b) ∈ A (Kapalıdır).<br>"
                            "• <strong>Çıkarma:</strong> x1 - x2 = 2a - 2b = 2(a - b) ∈ A (Kapalıdır).<br>"
                            "• <strong>Çarpma:</strong> x1 · x2 = 2a · 2b = 2(2ab) ∈ A (Kapalıdır).<br>"
                            "• <strong>Bölme:</strong> x1 / x2 = (2a) / (2b) = a / b. Örneğin a = 1, b = 2 seçilirse 2 / 4 = 1/2 ∉ A (1/2 tam sayı değildir). Dolayısıyla A kümesi <strong>bölme işlemine göre kapalı değildir</strong>.</p>",
                "answer": "Toplama, çıkarma ve çarpmaya göre kapalı; bölmeye göre KAPALI DEĞİLDİR."
            }
        ]
    },
    # 66
    {
        "page": 66,
        "tema": "1. Tema: Sayılar",
        "topic": "1.3. Sayı Kümeleri ve İşlem Özellikleri",
        "type": "Alıştırmalar",
        "intro": "Sayfa 66'da yüzme yarışması verileri üzerinden gerçek sayıların sıralanması, yoğunluk özelliği ve tek/çift sayıların kapalılık kuralları incelenmektedir.",
        "questions": [
            {
                "num": 1,
                "title": "Soru 1: Yüzme Yarışması Süre Sıralaması",
                "text": "18-25 yaş yüzücüleri: Barış (57,32 sn), Ayşe (57,38 sn), Azra (57,67 sn). Birinci olan yüzücüyü belirleyiniz.",
                "solution": "<p>Yüzme sporunda süre ne kadar küçükse derece o kadar iyidir.<br>57,32 < 57,38 < 57,67 olduğundan yarışı en kısa sürede tamamlayan <strong>Barış</strong> birinci olmuştur.</p>",
                "answer": "1. Barış (57,32 sn)"
            },
            {
                "num": 2,
                "title": "Soru 2: Tek Sayılar Kümesinin Kapalılığı",
                "text": "Tek tam sayılar kümesi toplama ve çarpma işlemine göre kapalı mıdır?",
                "solution": "<p>• Toplama: İki tek sayının toplamı çifttir: (2k+1) + (2m+1) = 2(k+m+1) (Çift). Tek sayılar kümesinin elemanı olmadığından <strong>toplamaya göre kapalı değildir</strong>.<br>• Çarpma: (2k+1)·(2m+1) = 4km + 2k + 2m + 1 = 2(2km+k+m) + 1 (Tek). Tek sayılar kümesi <strong>çarpmaya göre kapalıdır</strong>.</p>",
                "answer": "Toplamaya göre kapalı değildir; çarpmaya göre kapalıdır."
            }
        ]
    },
    # 74
    {
        "page": 74,
        "tema": "1. Tema: Sayılar",
        "topic": "1.4. Gerçek Sayıların İşlem Özelliklerini Cebirsel Olarak İfade Etme",
        "type": "15. Sıra Sizde",
        "intro": "Sayfa 74'te 'Her çift tam sayının karesi çift tam sayıdır' önermesinin sembolik mantık gösterimi ve doğrudan cebirsel ispatı yer almaktadır.",
        "questions": [
            {
                "num": 1,
                "title": "15. Sıra Sizde: Çift Sayıların Karesi İspatı",
                "text": "'Her çift tam sayının karesi çift tam sayıdır' önermesini matematiksel sembollerle yazıp cebirsel ispatını yapınız.",
                "solution": "<p><strong>a) Sembolik Mantık Dili:</strong><br><strong>∀x ∈ Z, [x ∈ 2Z ⇒ x^2 ∈ 2Z]</strong> veya <strong>∀k ∈ Z, (2k)^2 ∈ 2Z</strong></p>"
                            "<p><strong>b) Cebirsel İspat:</strong><br>1. Adım: x herhangi bir çift tam sayı olsun. Çift sayı tanımı gereği x = 2k olacak şekilde en az bir k ∈ Z vardır.<br>"
                            "2. Adım: x'in karesi alınır:<br>x^2 = (2k)^2 = 4k^2<br>"
                            "3. Adım: 4k^2 ifadesi 2 ortak çarpanı parantezine alınır:<br>x^2 = 2 · (2k^2)<br>"
                            "4. Adım: k bir tam sayı olduğundan 2k^2 = m de bir tam sayıdır (m ∈ Z).<br>"
                            "5. Adım: x^2 = 2m şeklinde yazılabildiğinden x^2 kesinlikle bir çift tam sayıdır. İspat tamamlanmıştır.</p>",
                "answer": "∀x ∈ 2Z ⇒ x^2 ∈ 2Z. x = 2k ⇒ x^2 = 2(2k^2) = 2m ∈ 2Z."
            }
        ]
    },
    # 76
    {
        "page": 76,
        "tema": "1. Tema: Sayılar",
        "topic": "1.4. Gerçek Sayıların İşlem Özelliklerini Cebirsel Olarak İfade Etme",
        "type": "16. Sıra Sizde",
        "intro": "Sayfa 76'da kenar uzunluğu a olan bir karenin alan parçalanması üzerinden (a - b)^2 tam kare özdeşliğinin geometrik ispatı yer almaktadır.",
        "questions": [
            {
                "num": 1,
                "title": "16. Sıra Sizde: (a - b)^2 Özdeşliğinin Geometrik İspatı",
                "text": "Kenarı a olan kare 4 bölüme ayrılmıştır: 1. bölüm kenarı (a-b) kare, 2 ve 3. bölümler b ve (a-b) dikdörtgen, 4. bölüm kenarı b kare. Buradan (a-b)^2 özdeşliğini elde ediniz.",
                "solution": "<p>Büyük karenin toplam alanı = a^2 dir.<br>Büyük kare şu dört alanın toplamıdır:<br>Alan 1 = (a - b)^2<br>Alan 2 = b(a - b)<br>Alan 3 = b(a - b)<br>Alan 4 = b^2</p>"
                            "<p>Dolayısıyla: a^2 = (a - b)^2 + 2b(a - b) + b^2<br>a^2 = (a - b)^2 + 2ab - 2b^2 + b^2 = (a - b)^2 + 2ab - b^2</p>"
                            "<p>(a - b)^2 yalnız bırakıldığında:<br><strong>(a - b)^2 = a^2 - 2ab + b^2</strong> özdeşliği geometrik olarak ispatlanmış olur.</p>",
                "answer": "(a - b)^2 = a^2 - 2ab + b^2"
            }
        ]
    },
    # 80
    {
        "page": 80,
        "tema": "1. Tema: Sayılar",
        "topic": "1.4. Gerçek Sayıların İşlem Özelliklerini Cebirsel Olarak İfade Etme",
        "type": "Alıştırmalar",
        "intro": "Sayfa 80'de gerçek sayılarda geçişme özelliği, niceleyiciler ve koşullu önermelerin sembolik dille yazılması alıştırmaları yer almaktadır.",
        "questions": [
            {
                "num": 1,
                "title": "Soru 1: Geçişme Özelliği Sembolik İfadesi",
                "text": "'a, b ve c gerçek sayılar olmak üzere b, a dan büyük ve c, b den büyük ise a, c den küçüktür' önermesini sembolik dille yazınız.",
                "solution": "<p>Önermenin sembolik ifadesi:<br><strong>∀a, b, c ∈ R, [(a < b ∧ b < c) ⇒ a < c]</strong></p>",
                "answer": "∀a, b, c ∈ R, [(a < b ∧ b < c) ⇒ a < c]"
            },
            {
                "num": 2,
                "title": "Soru 2: Üslü Gösterim Önermesi",
                "text": "'Tabanı 1'den büyük gerçek sayılarda kuvvet arttıkça değer artar' önermesini sembolik dille yazınız.",
                "solution": "<p>Sembolik ifade:<br><strong>∀a ∈ R (a > 1) ve ∀x, y ∈ R, [x < y ⇒ a^x < a^y]</strong></p>",
                "answer": "∀a > 1, [x < y ⇒ a^x < a^y]"
            }
        ]
    },
    # 81
    {
        "page": 81,
        "tema": "1. Tema: Sayılar",
        "topic": "1.4. Gerçek Sayıların İşlem Özelliklerini Cebirsel Olarak İfade Etme",
        "type": "Alıştırmalar (Devam)",
        "intro": "Sayfa 81'de geometrik şekillerde alan modellemesi, özdeşlikler ve kare zemin kaplama problemleri yer almaktadır.",
        "questions": [
            {
                "num": 7,
                "title": "Soru 7: Geometrik Alan ve Özdeşlik",
                "text": "Kenarı y olan kare ile köşelerindeki kenarı x olan 4 karenin oluşturduğu şekilde |AB| = 7 cm ve x·y = 2/3 olduğuna göre toplam şeklin alanını bulunuz.",
                "solution": "<p>Pisagor veya uzunluk bağıntısından |AB|^2 = y^2 + (2x)^2 = y^2 + 4x^2 = 7^2 = 49 bulunur.<br>Toplam alan = y^2 + 4x^2 = <strong>49 cm^2</strong> dir.</p>",
                "answer": "49 cm^2"
            },
            {
                "num": 8,
                "title": "Soru 8: Kare Zemin Kaplama",
                "text": "Kenarı 256 cm olan kare zemine kenarı 64 cm olan kare fayanslar döşeniyor. Kaç adet fayans gerektiğini üslü sayılarla bulunuz.",
                "solution": "<p>• Büyük karenin alanı = 256^2 = (2^8)^2 = 2^16 cm^2<br>• Küçük fayansın alanı = 64^2 = (2^6)^2 = 2^12 cm^2<br>Fayans sayısı = 2^16 / 2^12 = 2^(16-12) = 2^4 = <strong>16 adet</strong> fayans gerekir.</p>",
                "answer": "16 adet (2^4)"
            }
        ]
    },
    # 82
    {
        "page": 82,
        "tema": "1. Tema: Sayılar",
        "topic": "1. Tema Ölçme ve Değerlendirme",
        "type": "Ölçme ve Değerlendirme (1-2. Sorular)",
        "intro": "1. Tema Ölçme ve Değerlendirme testinin ilk sayfasında gök cisimlerinin kütleleri üzerinden bilimsel gösterim ve basamak farkı hesaplama soruları yer almaktadır.",
        "questions": [
            {
                "num": 1,
                "title": "Soru 1: Gök Cisimlerinin Kütleleri",
                "text": "Dünya'nın kütlesi 5,97·10^24 kg, Mars'ın kütlesi 6,42·10^23 kg dır. Dünya'nın kütlesi Mars'tan kaç kg fazladır?",
                "solution": "<p>Her iki kütleyi 10^23 üssünde eşitleyelim:<br>• Dünya = 59,7 · 10^23 kg<br>• Mars = 6,42 · 10^23 kg<br>Fark = (59,7 - 6,42) · 10^23 = <strong>53,28 · 10^23 kg = 5,328 · 10^24 kg</strong></p>",
                "answer": "5,328 · 10^24 kg"
            },
            {
                "num": 2,
                "title": "Soru 2: Satürn ve Ay Kütle Oranı",
                "text": "Satürn'ün kütlesi (5,68·10^26 kg) Ay'ın kütlesinin (7,34·10^22 kg) yaklaşık kaç katıdır?",
                "solution": "<p>Oran = (5,68 · 10^26) / (7,34 · 10^22) = (5,68 / 7,34) · 10^4 ≈ 0,7738 · 10^4 ≈ <strong>7738 katıdır</strong>.</p>",
                "answer": "Yaklaşık 7738 katı"
            }
        ]
    },
    # 83
    {
        "page": 83,
        "tema": "1. Tema: Sayılar",
        "topic": "1. Tema Ölçme ve Değerlendirme",
        "type": "Ölçme ve Değerlendirme (3-4. Sorular)",
        "intro": "Sayfa 83'te şehir sıcaklık sapmaları üzerinden mutlak değerli eşitsizlik modelleri kurulması soruları yer almaktadır.",
        "questions": [
            {
                "num": 3,
                "title": "Soru 3: Şehir Sıcaklık Sapması",
                "text": "A şehrinde ortalama 12 °C olup en fazla 8 °C sapmaktadır. B şehrinde ise sıcaklık -2 °C ile 16 °C arasında değişmektedir. Eşitsizlik modellerini yazınız.",
                "solution": "<p>• A şehri: |T_A - 12| ≤ 8 ⇒ 12 - 8 ≤ T_A ≤ 12 + 8 ⇒ <strong>[4, 20] °C</strong><br>• B şehri: Orta nokta = (-2 + 16)/2 = 7 °C, sapma = (16 - (-2))/2 = 9 °C ⇒ <strong>|T_B - 7| ≤ 9</strong></p>",
                "answer": "A şehri: |T - 12| ≤ 8 ([4, 20]) &emsp; B şehri: |T - 7| ≤ 9 ([-2, 16])"
            },
            {
                "num": 4,
                "title": "Soru 4: İki Şehrin Ortak Sıcaklık Aralığı",
                "text": "A ve B şehirlerinde aynı anda görülebilecek sıcaklıkların kesişim kümesini bulunuz.",
                "solution": "<p>[4, 20] ∩ [-2, 16] = <strong>[4, 16] °C</strong> aralığıdır.</p>",
                "answer": "[4, 16] °C"
            }
        ]
    },
    # 84
    {
        "page": 84,
        "tema": "1. Tema: Sayılar",
        "topic": "1. Tema Ölçme ve Değerlendirme",
        "type": "Ölçme ve Değerlendirme (5-6. Sorular)",
        "intro": "Sayfa 84'te Zeynep Hanım'ın ev yapımı reçel fiyatlandırmasında aritmetik ortalama ve mutlak sapma sınırları hesaplanmaktadır.",
        "questions": [
            {
                "num": 5,
                "title": "Soru 5: Reçel Fiyatı Ortalama ve Sapma",
                "text": "Reçel fiyatları: 184, 145, 220, 175, 130, 155, 134, 225 TL. Ortalama fiyatı ve en fazla 30 TL sapan fiyat aralığını bulunuz.",
                "solution": "<p>Toplam = 184 + 145 + 220 + 175 + 130 + 155 + 134 + 225 = 1368 TL.<br>Aritmetik ortalama = 1368 / 8 = <strong>171 TL</strong>.<br>Sapma en fazla 30 TL ise: <strong>|x - 171| ≤ 30</strong><br>171 - 30 ≤ x ≤ 171 + 30 ⇒ <strong>[141, 201] TL</strong></p>",
                "answer": "Ortalama: 171 TL &emsp; Aralık: |x - 171| ≤ 30 ([141, 201] TL)"
            },
            {
                "num": 6,
                "title": "Soru 6: Uygun Fiyatlı Ürün Sayısı",
                "text": "Listelenen fiyatlardan kaç tanesi belirlenen bu [141, 201] TL aralığındadır?",
                "solution": "<p>Aralıktaki fiyatlar: 184, 145, 175, 155. Toplam <strong>4 tanesi</strong> bu aralıktadır.</p>",
                "answer": "4 adet ürün"
            }
        ]
    },
    # 85
    {
        "page": 85,
        "tema": "1. Tema: Sayılar",
        "topic": "1. Tema Ölçme ve Değerlendirme",
        "type": "Ölçme ve Değerlendirme (7-8. Sorular)",
        "intro": "Sayfa 85'te oyun kartı yüzeyindeki kare ve dikdörtgen parçalar yardımıyla köklü sayılarda alan ve özdeşlik modelleme soruları yer almaktadır.",
        "questions": [
            {
                "num": 7,
                "title": "Soru 7: Oyun Kartında Geometrik Alan ve Özdeşlik",
                "text": "Kenar uzunlukları √3 ve √2 olan parçalardan oluşan oyun kartında (√3 + √2)^2 ifadesinin geometrik açılımını bulunuz.",
                "solution": "<p>(√3 + √2)^2 = (√3)^2 + 2·(√3·√2) + (√2)^2 = 3 + 2√6 + 2 = <strong>5 + 2√6</strong> cm^2 dir.</p>",
                "answer": "5 + 2√6 cm^2"
            },
            {
                "num": 8,
                "title": "Soru 8: Alan Farkı",
                "text": "Oyun kartında A ve C parçalarının alanları farkını bulunuz.",
                "solution": "<p>Alan A = (√3)^2 = 3, Alan C = (√2)^2 = 2. Fark = 3 - 2 = <strong>1 cm^2</strong> dir.</p>",
                "answer": "1 cm^2"
            }
        ]
    },
    # 86
    {
        "page": 86,
        "tema": "1. Tema: Sayılar",
        "topic": "1. Tema Ölçme ve Değerlendirme",
        "type": "Ölçme ve Değerlendirme (9-11. Sorular)",
        "intro": "Sayfa 86'da AVM otoparkındaki engelli park levhalarının üslü koordinatlar üzerinde eşit aralıklarla konumlandırılması problemleri yer almaktadır.",
        "questions": [
            {
                "num": 9,
                "title": "Soru 9: Eşit Aralıklı Park Tabelaları Mesafesi",
                "text": "5^12 ile 5^15 noktaları arasına eşit aralıklarla 20 tabela (19 eşit aralık veya 21 parça) yerleştirildiğinde ardışık tabelalar arası mesafeyi bulunuz.",
                "solution": "<p>Toplam mesafe = 5^15 - 5^12 = 5^12 · (5^3 - 1) = 5^12 · (125 - 1) = 124 · 5^12 birimdir.<br>Aralık sayısı n = 20 aralık için: Mesafe = (124 · 5^12) / 20 = <strong>6,2 · 5^12 = 31 · 5^11</strong> birimdir.</p>",
                "answer": "31 · 5^11 birim"
            },
            {
                "num": 10,
                "title": "Soru 10: Orta Noktadaki Tabelanın Konumu",
                "text": "Başlangıç ve bitiş noktalarının tam ortasında yer alan noktanın koordinatını bulunuz.",
                "solution": "<p>Orta nokta = (5^15 + 5^12) / 2 = 5^12 · (125 + 1) / 2 = 5^12 · (126 / 2) = <strong>63 · 5^12</strong> dir.</p>",
                "answer": "63 · 5^12"
            }
        ]
    },
    # 87
    {
        "page": 87,
        "tema": "1. Tema: Sayılar",
        "topic": "1. Tema Ölçme ve Değerlendirme",
        "type": "Ölçme ve Değerlendirme (12-13. Sorular)",
        "intro": "Sayfa 87'de üst üste dizilen taburelerin yüksekliklerinin köklü ifadeler cinsinden modellenmesi ve depo tavan yüksekliği karşılaştırması yer almaktadır.",
        "questions": [
            {
                "num": 12,
                "title": "Soru 12: Üst Üste Dizilen Taburelerin Toplam Yüksekliği",
                "text": "Görsel 1'de tabure ayak yüksekliği 2√256 = 32 cm, her eklenen tabure 3√6 cm yükseltmektedir. 10 tabure dizildiğinde oluşan yüksekliği bulunuz.",
                "solution": "<p>1 tabure yüksekliği = h0 = 32 cm.<br>Geriye kalan 9 taburenin her biri 3√6 cm yükseklik ekler:<br>Toplam yükseklik = 32 + 9 × 3√6 = <strong>32 + 27√6 cm</strong> dir.</p>",
                "answer": "32 + 27√6 cm (yaklaşık 98,1 cm)"
            },
            {
                "num": 13,
                "title": "Soru 13: Depo Yüksekliği Karşılaştırması",
                "text": "Görsel 2'deki taburelerle birlikte 2,5 metrelik depoya tek sıra halinde en fazla kaç adet tabure dizilebilir?",
                "solution": "<p>2,5 metre = 250 cm.<br>h(n) = 32 + (n - 1)·3√6 ≤ 250 ⇒ (n - 1)·3√6 ≤ 218.<br>3√6 ≈ 7,35 cm. (n - 1) ≤ 218 / 7,35 ≈ 29,6 ⇒ n - 1 = 29 ⇒ <strong>n = 30 tabure</strong> dizilebilir.</p>",
                "answer": "En fazla 30 tabure"
            }
        ]
    }
]

with open("scripts/data_grade9_tema1.py", "w", encoding="utf-8") as f:
    f.write("# -*- coding: utf-8 -*-\n")
    f.write('"""9. Sınıf Matematik 1. Tema: Sayılar (29 Sayfa Tam Veri Seti)"""\n\n')
    f.write("TEMA_1_PAGES = " + json.dumps(pages, ensure_ascii=False, indent=2) + "\n")

print(f"Generated data_grade9_tema1.py with {len(pages)} pages.")
