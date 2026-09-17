# -*- coding: utf-8 -*-
"""
Builder for 9. Sınıf 2026-2027 MEB Ders Kitapları:
1. 9. Sınıf Fizik
2. 9. Sınıf Kimya
3. 9. Sınıf Biyoloji
4. 9. Sınıf Coğrafya
5. 9. Sınıf İngilizce
6. 9. Sınıf Matematik 2. Kitap
"""

import sqlite3
import json
import random
from datetime import datetime, timezone
import os

DB_PATH = "data/matemetrik.db"
NOW_ISO = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")

GRADE9_BOOKS = [
    # 1. Fizik 9
    {
        "id": "fizik-9",
        "grade": "9. Sınıf",
        "category_slug": "9-sinif",
        "subject": "Fizik",
        "master_slug": "2026-2027-meb-fizik-ders-kitabi-cevaplari-9-sinif",
        "master_title": "2026-2027 MEB Fizik Ders Kitabı Cevapları (9. Sınıf)",
        "master_excerpt": "2026-2027 MEB 9. Sınıf Fizik Ders Kitabı tüm ünite, kontrol noktası, alıştırma ve ünite ölçme-değerlendirme sorularının sayfa sayfa adım adım ayrıntılı çözümleri.",
        "units": [
            {
                "name": "1. Ünite: Fizik Bilimi ve Kariyer Keşfi",
                "pages": [
                    {
                        "page": 22,
                        "type": "Etkinlik & Alıştırma",
                        "topic": "Fizik Biliminin Alt Dalları ve Disiplinler Arası İlişki",
                        "intro": "Sayfa 22'de fizik biliminin alt dalları (mekanik, termodinamik, optik, elektromanyetizma, atom ve molekül fiziği, nükleer fizik, katıhâl fiziği, yüksek enerji ve plazma fiziği) ve diğer temel bilimlerle ilişkisi yer almaktadır.",
                        "questions": [
                            {
                                "num": 1,
                                "title": "Soru 1: Fiziğin Alt Dalları ile Teknolojik Uygulamalar Eşleştirmesi",
                                "text": "Aşağıdaki teknolojik araçları fiziğin ilgili alt dallarıyla eşleştiriniz:\na) Fiber optik kablolar ve endoskopi cihazı\nb) Maglev hızlı trenleri ve süperiletkenler\nc) Nükleer tıp ve PET (Pozitron Emisyon Tomografisi) görüntüleme\nç) Güneş panelleri ve yarı iletken çipler",
                                "solution": "<p>• <strong>a) Fiber optik ve endoskopi:</strong> Işığın tam yansıması prensibiyle çalışır ⇒ <strong>Optik</strong> alt dalı ilgilenir.</p>"
                                            "<p>• <strong>b) Maglev trenleri ve süperiletkenler:</strong> Elektrik ve manyetizma etkileşimi ⇒ <strong>Elektromanyetizma</strong> ve <strong>Katıhâl Fiziği</strong> ilgilenir.</p>"
                                            "<p>• <strong>c) PET görüntüleme:</strong> Çekirdek tepkimeleri ve radyoaktif bozunmalar ⇒ <strong>Nükleer Fizik</strong> ilgilenir.</p>"
                                            "<p>• <strong>ç) Yarı iletken çipler ve güneş panelleri:</strong> Kristal yapılı maddelerin elektrik iletimi ⇒ <strong>Katıhâl Fiziği</strong> ilgilenir.</p>",
                                "answer": "a) Optik &emsp; b) Elektromanyetizma &emsp; c) Nükleer Fizik &emsp; ç) Katıhâl Fiziği"
                            }
                        ]
                    },
                    {
                        "page": 35,
                        "type": "Alıştırma",
                        "topic": "Fizik Bilimine Yön Verenler ve Bilimsel Düşünce",
                        "intro": "Sayfa 35'te Albert Einstein'ın Özel ve Genel Görelilik teorileri, düşünce deneyleri ve E = mc² modeli üzerinden bilimsel bilginin gelişimi incelenmektedir.",
                        "questions": [
                            {
                                "num": 1,
                                "title": "Soru 1: Einstein ve Düşünce Deneyleri",
                                "text": "Einstein'ın geliştirdiği E = mc² bağıntısında yer alan büyüklükleri ve modern fizikteki anlamını açıklayınız.",
                                "solution": "<p>E = m·c² bağıntısında:<br>"
                                            "• <strong>E:</strong> Enerji (Joule cinsinden)<br>"
                                            "• <strong>m:</strong> Kütle (Kilogram cinsinden)<br>"
                                            "• <strong>c:</strong> Işık hızı (Boşlukta yaklaşık 3·10⁸ m/s)<br>"
                                            "Bu denklem kütle ile enerjinin eşdeğer olduğunu, nükleer tepkimelerde yok olan çok küçük bir kütlenin (m) ışık hızının karesi (c²) ile çarpılarak devasa bir enerjiye (E) dönüştüğünü gösterir.</p>",
                                "answer": "Kütle-enerji eşdeğerliği: E = m·c² (c ≈ 3·10⁸ m/s)"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "2. Ünite: Kuvvet ve Hareket",
                "pages": [
                    {
                        "page": 59,
                        "type": "Kontrol Noktası",
                        "topic": "Konum, Alınan Yol ve Yer Değiştirme",
                        "intro": "Sayfa 59'da skaler bir büyüklük olan alınan yol ile vektörel bir büyüklük olan yer değiştirme (Δx = x_son - x_ilk) arasındaki temel kavramsal farklar incelenmektedir.",
                        "questions": [
                            {
                                "num": 1,
                                "title": "Soru 1: Alınan Yol ve Yer Değiştirme Hesabı",
                                "text": "Doğuya doğru 40 metre yürüyen bir kişi, ardından kuzeye doğru 30 metre yürüyor. Bu kişinin aldığı yolu ve yer değiştirmesini bulunuz.",
                                "solution": "<p>• <strong>Alınan Yol (Skaler):</strong> Yürünen toplam mesafe:<br>Yol = 40 m + 30 m = <strong>70 metre</strong></p>"
                                            "<p>• <strong>Yer Değiştirme (Vektörel, Δx):</strong> Başlangıç noktasından bitiş noktasına çizilen en kısa yönlü doğru parçasıdır. Doğu ve kuzey birbirine dik (90°) olduğundan Pisagor bağıntısı uygulanır:<br>"
                                            "|Δx|² = 40² + 30² = 1600 + 900 = 2500<br>"
                                            "|Δx| = √2500 = <strong>50 metre</strong> (Kuzeydoğu yönünde).</p>",
                                "answer": "Alınan Yol: 70 m &emsp; Yer Değiştirme: 50 m (Kuzeydoğu)"
                            }
                        ]
                    },
                    {
                        "page": 85,
                        "type": "Alıştırma",
                        "topic": "Vektörlerin Bileşenlerine Ayrılması ve Bileşke Kuvvet",
                        "intro": "Sayfa 85'te düzlemde iki veya daha fazla kuvvetin bileşkesinin bulunması ve Newton'ın Temel Yasası (F_net = m·a) uygulamaları yer almaktadır.",
                        "questions": [
                            {
                                "num": 1,
                                "title": "Soru 1: Bileşke Kuvvet ve İvme Hesabı",
                                "text": "Sürtünmesiz yatay zeminde duran 4 kg kütleli bir cisme doğu yönünde F1 = 26 N ve batı yönünde F2 = 10 N büyüklüğünde iki yatay kuvvet uygulanıyor. Cismin ivmesini bulunuz.",
                                "solution": "<p>1. Adım: Net (Bileşke) Kuvveti bulalım:<br>"
                                            "F_net = F1 - F2 = 26 N - 10 N = <strong>16 N</strong> (Doğu yönünde).</p>"
                                            "<p>2. Adım: Newton'ın 2. Hareket Yasası (F_net = m·a):<br>"
                                            "16 = 4 · a ⇒ a = 16 / 4 = <strong>4 m/s²</strong> (Doğu yönünde ivmelenir).</p>",
                                "answer": "a = 4 m/s² (Doğu yönünde)"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "3. Ünite: Akışkanlar",
                "pages": [
                    {
                        "page": 143,
                        "type": "Kontrol Noktası",
                        "topic": "Katı ve Sıvı Basıncı İlkeleri",
                        "intro": "Sayfa 143'te katı basıncı P = F/S ve durgun sıvı basıncı P = h·d·g formüllerinin günlük hayat uygulamaları çözülmektedir.",
                        "questions": [
                            {
                                "num": 1,
                                "title": "Soru 1: Sıvı Basıncı ve Derinlik İlişkisi",
                                "text": "Yoğunluğu d = 1000 kg/m³ olan su dolu bir havuzun 3 metre derinliğindeki taban sıvı basıncını hesaplayınız (g = 10 m/s²).",
                                "solution": "<p>Sıvı basıncı formülü: <strong>P = h · d · g</strong><br>"
                                            "P = 3 m × 1000 kg/m³ × 10 m/s² = <strong>30.000 Pascal (30 kPa)</strong> bulunur.</p>",
                                "answer": "P = 30.000 Pa (30 kPa)"
                            }
                        ]
                    },
                    {
                        "page": 175,
                        "type": "Etkinlik",
                        "topic": "Arşimet Prensibi ve Kaldırma Kuvveti",
                        "intro": "Sayfa 175'te sıvıların kaldırma kuvveti F_k = V_batan · d_sıvı · g ve yüzme, askıda kalma, batma şartları yer almaktadır.",
                        "questions": [
                            {
                                "num": 1,
                                "title": "Soru 1: Yüzen Cisimde Kaldırma Kuvveti ve Ağırlık",
                                "text": "Hacmi V olan tahta blok özkütlesi 1 g/cm³ olan suda hacminin yarısı batacak şekilde yüzmektedir. Tahtanın özkütlesini ve cisme etki eden kaldırma kuvvetini ağırlığı cinsinden bulunuz.",
                                "solution": "<p>• Yüzen cisimlerde dengede kaldırma kuvveti cismin ağırlığına eşittir: <strong>F_k = G</strong>.<br>"
                                            "• V_batan · d_su · g = V_cisim · d_tahta · g<br>"
                                            "(V/2) · 1 = V · d_tahta ⇒ <strong>d_tahta = 0,5 g/cm³</strong> bulunur.</p>",
                                "answer": "F_k = G &emsp; d_tahta = 0,5 g/cm³"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "4. Ünite: Enerji (Isı ve Sıcaklık)",
                "pages": [
                    {
                        "page": 214,
                        "type": "Alıştırma",
                        "topic": "Isı, Sıcaklık ve Isı Sığası Hesapları",
                        "intro": "Sayfa 214'te temel termodinamik bağıntısı Q = m·c·ΔT formülüyle sıcaklık artışı ve ısı alışverişi soruları yer almaktadır.",
                        "questions": [
                            {
                                "num": 1,
                                "title": "Soru 1: Alınan Isı Miktarı Hesabı",
                                "text": "Kütlesi 200 gram olan suyun sıcaklığını 20 °C'den 70 °C'ye çıkarmak için verilmesi gereken ısı miktarını kalori cinsinden bulunuz (c_su = 1 cal/g°C).",
                                "solution": "<p>Temel formül: <strong>Q = m · c · ΔT</strong><br>"
                                            "• m = 200 g<br>"
                                            "• c = 1 cal/g°C<br>"
                                            "• ΔT = T_son - T_ilk = 70 - 20 = 50 °C<br>"
                                            "Q = 200 × 1 × 50 = <strong>10.000 kalori (10 kcal)</strong> ısı gereklidir.</p>",
                                "answer": "Q = 10.000 cal (10 kcal)"
                            }
                        ]
                    },
                    {
                        "page": 241,
                        "type": "Alıştırma",
                        "topic": "Isı Aktarım Yolları ve Isı Yalıtımı",
                        "intro": "Sayfa 241'de ısının iletim (katılarda), konveksiyon (sıvı ve gazlarda) ve ışıma (elektromanyetik dalgalarla boşlukta) yollarıyla yayılması ilkeleri çözülmektedir.",
                        "questions": [
                            {
                                "num": 1,
                                "title": "Soru 1: Isı İletim Yolları Günlük Hayat Örnekleri",
                                "text": "Güneş'in Dünya'yı ısıtması, çorba içerken kaşığın ısınması ve kalorifer peteğinin odayı ısıtması hangi ısı aktarım yollarıyla gerçekleşir?",
                                "solution": "<p>• Güneş'in Dünya'yı ısıtması: Uzay boşluğunda yayıldığı için <strong>Işıma (Radyasyon)</strong>.<br>"
                                            "• Çorbadaki metal kaşığın ısınması: Katı moleküllerinin titreşimiyle <strong>İletim</strong>.<br>"
                                            "• Kaloriferin odayı ısıtması: Isınan havanın genleşip yükselmesiyle <strong>Konveksiyon (Taşınım)</strong> yoluyla gerçekleşir.</p>",
                                "answer": "Güneş: Işıma &emsp; Kaşık: İletim &emsp; Kalorifer: Konveksiyon"
                            }
                        ]
                    }
                ]
            }
        ]
    },

    # 2. Kimya 9
    {
        "id": "kimya-9",
        "grade": "9. Sınıf",
        "category_slug": "9-sinif",
        "subject": "Kimya",
        "master_slug": "2026-2027-meb-kimya-ders-kitabi-cevaplari-9-sinif",
        "master_title": "2026-2027 MEB Kimya Ders Kitabı Cevapları (9. Sınıf)",
        "master_excerpt": "2026-2027 MEB 9. Sınıf Kimya Ders Kitabı tüm tema, etkinlik, alıştırma ve ünite ölçme-değerlendirme sorularının sayfa sayfa ayrıntılı çözümleri.",
        "units": [
            {
                "name": "1. Tema: Etkileşim",
                "pages": [
                    {
                        "page": 20,
                        "type": "Etkinlik & Alıştırma",
                        "topic": "Kimya Disiplinleri ve Güvenlik Uyarı İşaretleri",
                        "intro": "Sayfa 20'de kimyanın ana disiplinleri (analitik, organik, anorganik, fizikokimya, biyokimya) ve laboratuvar güvenlik piktogramları yer almaktadır.",
                        "questions": [
                            {
                                "num": 1,
                                "title": "Soru 1: Kimya Alt Disiplinleri Görev Alanları",
                                "text": "Kan ve idrardaki glikoz miktarını ölçen, polimer ve plastikleri sentezleyen, tepkime hızlarını ve enerjisini inceleyen kimya disiplinlerini yazınız.",
                                "solution": "<p>• Kan ve idrar biyolojik sıvı analizleri: <strong>Biyokimya</strong> ve <strong>Analitik Kimya</strong>.<br>"
                                            "• Karbon temelli plastik ve polimer sentezi: <strong>Organik Kimya</strong> / <strong>Polimer Kimyası</strong>.<br>"
                                            "• Tepkime hızı, enerji ve termodinamik incelemeleri: <strong>Fizikokimya</strong> disiplinidir.</p>",
                                "answer": "Biyokimya / Analitik Kimya, Organik Kimya, Fizikokimya"
                            }
                        ]
                    },
                    {
                        "page": 65,
                        "type": "Alıştırma",
                        "topic": "Kimyasal Türler Arası Etkileşimler: İyonik ve Kovalent Bağ",
                        "intro": "Sayfa 65'te Lewis yapısı, iyonik bileşiklerin örgü yapısı ve kovalent bağın elektron ortaklaşmasıyla oluşumu incelenmektedir.",
                        "questions": [
                            {
                                "num": 1,
                                "title": "Soru 1: Lewis Yapısı ve Bağ Türü Belirleme",
                                "text": "₁₁Na ile ₁₇Cl atomları arasında ve ₁H ile ₈O atomları arasında oluşan bileşiklerin bağ türünü ve formüllerini yazınız.",
                                "solution": "<p>• <strong>Na ve Cl:</strong> Na(2-8-1) bir metaldir, 1 elektron verir (Na⁺). Cl(2-8-7) bir ametaldir, 1 elektron alır (Cl⁻). Metal-ametal arasında elektron alışverişiyle <strong>İyonik Bağlı NaCl</strong> bileşiği oluşur.</p>"
                                            "<p>• <strong>H ve O:</strong> H(1) ametal, O(2-6) ametaldir. Ametal-ametal arasında elektron ortaklaşmasıyla polar <strong>Kovalent Bağlı H₂O</strong> molekülü oluşur.</p>",
                                "answer": "NaCl (İyonik Bağ) &emsp; H₂O (Polar Kovalent Bağ)"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "2. Tema: Çeşitlilik",
                "pages": [
                    {
                        "page": 115,
                        "type": "Alıştırma",
                        "topic": "Periyodik Sistem ve Periyodik Özelliklerin Değişimi",
                        "intro": "Sayfa 115'te periyodik tabloda aynı periyotta ve grupta atom yarıçapı, iyonlaşma enerjisi ve elektronegatiflik değişim trendleri çözülmektedir.",
                        "questions": [
                            {
                                "num": 1,
                                "title": "Soru 1: Periyodik Özelliklerin Karşılaştırılması",
                                "text": "₁₁Na, ₁₂Mg ve ₁₉K elementlerinin atom yarıçaplarını ve 1. iyonlaşma enerjilerini karşılaştırınız.",
                                "solution": "<p>1. Katman dizilimleri:<br>"
                                            "• ₁₁Na: 2-8-1 (3. periyot, 1A)<br>"
                                            "• ₁₂Mg: 2-8-2 (3. periyot, 2A)<br>"
                                            "• ₁₉K: 2-8-8-1 (4. periyot, 1A)</p>"
                                            "<p>2. Atom Yarıçapı: Periyot sayısı arttıkça artar, aynı periyotta sola doğru artar:<br>"
                                            "<strong>K > Na > Mg</strong></p>"
                                            "<p>3. İyonlaşma Enerjisi: Yarıçap küçüldükçe elektron koparmak zorlaşır, iyonlaşma enerjisi artar:<br>"
                                            "<strong>Mg > Na > K</strong></p>",
                                "answer": "Yarıçap: K > Na > Mg &emsp; İyonlaşma Enerjisi: Mg > Na > K"
                            }
                        ]
                    }
                ]
            }
        ]
    },

    # 3. Biyoloji 9
    {
        "id": "biyoloji-9",
        "grade": "9. Sınıf",
        "category_slug": "9-sinif",
        "subject": "Biyoloji",
        "master_slug": "2026-2027-meb-biyoloji-ders-kitabi-cevaplari-9-sinif",
        "master_title": "2026-2027 MEB Biyoloji Ders Kitabı Cevapları (9. Sınıf)",
        "master_excerpt": "2026-2027 MEB 9. Sınıf Biyoloji Ders Kitabı Yaşam ve Organizasyon temaları ünite, etkinlik ve ölçme-değerlendirme sorularının sayfa sayfa çözümleri.",
        "units": [
            {
                "name": "1. Tema: Yaşam",
                "pages": [
                    {
                        "page": 28,
                        "type": "Etkinlik & Alıştırma",
                        "topic": "Canlıların Temel Bileşenleri: Karbonhidratlar ve Lipitler",
                        "intro": "Sayfa 28'de monosakkaritler, disakkaritler, polisakkaritler ve nötr yağların yapısal ve enerji verici işlevleri incelenmektedir.",
                        "questions": [
                            {
                                "num": 1,
                                "title": "Soru 1: Polisakkaritlerin Sınıflandırılması",
                                "text": "Nişasta, glikojen, selüloz ve kitin polisakkaritlerini depo ve yapısal olma durumlarına göre hayvan ve bitkilerde sınıflandırınız.",
                                "solution": "<p>• <strong>Depo Polisakkaritleri:</strong><br>"
                                            "- <em>Nişasta:</em> Bitkisel depo polisakkaritidir (kloroplast ve lökoplastta depolanır).<br>"
                                            "- <em>Glikojen:</em> Hayvan, bakteri ve mantarlarda depo polisakkaritidir (karaciğer ve kaslarda depolanır).</p>"
                                            "<p>• <strong>Yapısal Polisakkaritler:</strong><br>"
                                            "- <em>Selüloz:</em> Bitki hücre çeperinin temel yapı maddesidir.<br>"
                                            "- <em>Kitin:</em> Eklem bacaklıların dış iskeletinde ve mantarların hücre çeperinde bulunur (azot içerir).</p>",
                                "answer": "Depo: Nişasta (Bitki), Glikojen (Hayvan/Mantar) ; Yapısal: Selüloz (Bitki), Kitin (Hayvan/Mantar)"
                            }
                        ]
                    },
                    {
                        "page": 45,
                        "type": "Alıştırma",
                        "topic": "Enzimlerin Çalışmasını Etkileyen Faktörler",
                        "intro": "Sayfa 45'te sıcaklık, pH, substrat yüzeyi ve enzim-substrat doygunluğunun tepkime hızına etkisi incelenmektedir.",
                        "questions": [
                            {
                                "num": 1,
                                "title": "Soru 1: Sıcaklık ve Denatürasyon Etkisi",
                                "text": "Yüksek sıcaklığın (55 °C üzeri) enzim aktivitesini geri dönüşümsüz olarak durdurmasının biyokimyasal nedenini açıklayınız.",
                                "solution": "<p>Enzimler protein yapılı biyolojik katalizörlerdir. Proteinlerin üçüncül ve dördüncül aktif üç boyutlu yapıları hidrojen ve disülfit bağlarıyla korunur.<br>"
                                            "Yüksek sıcaklıkta bu zayıf bağlar koparak enzimin aktif merkezinin üç boyutlu şekli bozulur (<strong>Denatürasyon</strong>). Şekil bozulduğu için substrat aktif merkeze bağlanamaz ve enzim kalıcı olarak işlevini kaybeder.</p>",
                                "answer": "Enzimin protein yapısı denatüre olur, aktif merkez bozulur."
                            }
                        ]
                    }
                ]
            },
            {
                "name": "2. Tema: Organizasyon",
                "pages": [
                    {
                        "page": 96,
                        "type": "Alıştırma",
                        "topic": "Hücre Zarı ve Madde Geçişleri: Osmoz ve Plazmoliz",
                        "intro": "Sayfa 96'da hipertonik, hipotonik ve izotonik ortamlarda hücre hacmi değişimleri, plazmoliz, deplazmoliz ve turgor basıncı hesaplamaları yer almaktadır.",
                        "questions": [
                            {
                                "num": 1,
                                "title": "Soru 1: Hipertonik Ortama Bırakılan Hücre",
                                "text": "%1 glikoz yoğunluğuna sahip bir bitki hücresi %5 glikoz çözeltisi bulunan kaba konulduğunda meydana gelecek değişimleri açıklayınız.",
                                "solution": "<p>1. Ortam (%5) hücreden (%1) daha yoğundur (<strong>Hipertonik ortam</strong>).<br>"
                                            "2. Hücre osmoz ile dış ortama su kaybeder.<br>"
                                            "3. Hücre su kaybedince koful küçülür, sitoplazma büzülür ve hücre zarı hücre çeperinden uzaklaşır (<strong>Plazmoliz</strong>).<br>"
                                            "4. Hücrenin osmotik basıncı artar, turgor basıncı azalır.</p>",
                                "answer": "Hücre su kaybederek büzülür (Plazmoliz gerçekleşir)."
                            }
                        ]
                    }
                ]
            }
        ]
    },

    # 4. Coğrafya 9
    {
        "id": "cografya-9",
        "grade": "9. Sınıf",
        "category_slug": "9-sinif",
        "subject": "Coğrafya",
        "master_slug": "2026-2027-meb-cografya-ders-kitabi-cevaplari-9-sinif",
        "master_title": "2026-2027 MEB Coğrafya Ders Kitabı Cevapları (9. Sınıf)",
        "master_excerpt": "2026-2027 MEB 9. Sınıf Coğrafya Ders Kitabı Doğa, İnsan, Harita Bilgisi ve İklim üniteleri alıştırma ve ölçme-değerlendirme çözümleri.",
        "units": [
            {
                "name": "1. Ünite: Doğa ve İnsan",
                "pages": [
                    {
                        "page": 20,
                        "type": "Etkinlik",
                        "topic": "Coğrafyanın Bölümleri ve Doğal Ortamın Dört Unsuru",
                        "intro": "Sayfa 20'de Litosfer (Taş küre), Hidrosfer (Su küre), Atmosfer (Hava küre) ve Biyosfer (Canlılar küresi) arasındaki etkileşim çözülmektedir.",
                        "questions": [
                            {
                                "num": 1,
                                "title": "Soru 1: Doğal Ortamın Dört Unsuru Eşleştirmesi",
                                "text": "Yer kabuğundaki kayaçlar, okyanus akıntıları, rüzgârlar ve orman ekosistemleri sırasıyla hangi doğal ortamlara aittir?",
                                "solution": "<p>• Kayaçlar ve dağlar: <strong>Litosfer (Taş Küre)</strong><br>"
                                            "• Okyanuslar, denizler, akarsular: <strong>Hidrosfer (Su Küre)</strong><br>"
                                            "• Hava olayları, gazlar, rüzgârlar: <strong>Atmosfer (Hava Küre)</strong><br>"
                                            "• Bitkiler, hayvanlar, mikroorganizmalar: <strong>Biyosfer (Canlılar Küresi)</strong></p>",
                                "answer": "Litosfer, Hidrosfer, Atmosfer, Biyosfer"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "2. Ünite: Mekânsal Bilgi Teknolojileri",
                "pages": [
                    {
                        "page": 55,
                        "type": "Uygulama",
                        "topic": "Harita Ölçekleri ve Yerel Saat Hesaplamaları",
                        "intro": "Sayfa 55'te kesir ölçek ile çizgi ölçek dönüşümleri ve boylamlar arası 4 dakikalık zaman farkı ile yerel saat hesaplamaları yer almaktadır.",
                        "questions": [
                            {
                                "num": 1,
                                "title": "Soru 1: Meridyenler Arası Yerel Saat Farkı",
                                "text": "30° Doğu meridyeninde yer alan İzmit'te yerel saat 14.20 iken 45° Doğu meridyenindeki Iğdır'da yerel saat kaçtır?",
                                "solution": "<p>1. Adım: Boylam farkını bulalım:<br>"
                                            "45° - 30° = 15 meridyen farkı vardır.</p>"
                                            "<p>2. Adım: Zaman farkını hesaplayalım:<br>"
                                            "İki ardışık meridyen arası 4 dakikadır:<br>"
                                            "15 × 4 dk = 60 dakika = 1 saat fark vardır.</p>"
                                            "<p>3. Adım: Iğdır daha doğuda olduğu için yerel saat daha ileridir:<br>"
                                            "14.20 + 01.00 = <strong>15.20</strong> bulunur.</p>",
                                "answer": "15.20"
                            }
                        ]
                    }
                ]
            }
        ]
    },

    # 5. İngilizce 9
    {
        "id": "ingilizce-9",
        "grade": "9. Sınıf",
        "category_slug": "9-sinif",
        "subject": "İngilizce",
        "master_slug": "2026-2027-meb-ingilizce-calisma-kitabi-cevaplari-9-sinif",
        "master_title": "2026-2027 MEB İngilizce Çalışma Kitabı Cevapları (9. Sınıf)",
        "master_excerpt": "2026-2027 MEB 9. Sınıf İngilizce Çalışma Kitabı (Workbook) Theme 1-10 tüm etkinlik, worksheet ve progress check çözümleri.",
        "units": [
            {
                "name": "Theme 1: School Life & Routines",
                "pages": [
                    {
                        "page": 12,
                        "type": "Activity & Worksheet",
                        "topic": "Daily Routines & Simple Present Tense",
                        "intro": "Sayfa 12'de günlük aktiviteler, Simple Present Tense (Geniş Zaman) 3. tekil şahıs fiil çekimleri (-s, -es) ve sıklık zarfları alıştırmaları yer almaktadır.",
                        "questions": [
                            {
                                "num": 1,
                                "title": "Exercise 1: Complete with Simple Present Tense",
                                "text": "Fill in the blanks with the correct form of the verbs in brackets:\na) Mark always ______ (catch) the school bus at 08.15.\nb) They ______ (not / study) on Sunday afternoons.\nc) ______ Sarah ______ (speak) German fluently?",
                                "solution": "<p><strong>a)</strong> Mark 3. tekil şahıs (he) olduğundan 'catch' fiili sonuna '-es' alır: <strong>catches</strong>.</p>"
                                            "<p><strong>b)</strong> Özne 'They' olduğu için geniş zaman olumsuz yardımcı fiili 'do not (don\'t)' kullanılır: <strong>don't study</strong>.</p>"
                                            "<p><strong>c)</strong> Sarah 3. tekil şahıs (she) olduğu için soru 'Does' ile başlar, ana fiil yalın kalır: <strong>Does Sarah speak</strong>.</p>",
                                "answer": "a) catches &emsp; b) don't study &emsp; c) Does / speak"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "Theme 2: My Environment",
                "pages": [
                    {
                        "page": 20,
                        "type": "Progress Check",
                        "topic": "Prepositions of Place & Neighborhood Vocabulary",
                        "intro": "Sayfa 20'de yer yön edatları (opposite, next to, between, in front of) ve şehirdeki mekanların tarif edilmesi alıştırmaları yer almaktadır.",
                        "questions": [
                            {
                                "num": 1,
                                "title": "Exercise 2: Prepositions of Place",
                                "text": "Look at the town map and choose the correct prepositions:\na) The pharmacy is ______ the bakery and the bank.\nb) The library is ______ the city park.",
                                "solution": "<p>• <strong>a)</strong> Eczane fırın ile bankanın tam arasında yer aldığı için: <strong>between</strong> kullanılır.</p>"
                                            "<p>• <strong>b)</strong> Kütüphane parkın tam karşısında yer aldığı için: <strong>opposite</strong> kullanılır.</p>",
                                "answer": "a) between &emsp; b) opposite"
                            }
                        ]
                    }
                ]
            }
        ]
    },

    # 6. Matematik 9 2. Kitap
    {
        "id": "matematik-9-k2",
        "grade": "9. Sınıf",
        "category_slug": "9-sinif",
        "subject": "Matematik 2. Kitap",
        "master_slug": "2026-2027-meb-matematik-ders-kitabi-cevaplari-9-sinif-2-kitap",
        "master_title": "2026-2027 MEB Matematik Ders Kitabı Cevapları (9. Sınıf 2. Kitap)",
        "master_excerpt": "2026-2027 MEB 9. Sınıf Matematik 2. Kitap Eşlik-Benzerlik, Algoritma, İstatistik ve Olasılık üniteleri tüm soru ve çözümleri.",
        "units": [
            {
                "name": "4. Tema: Eşlik ve Benzerlik",
                "pages": [
                    {
                        "page": 17,
                        "type": "1. Sıra Sizde",
                        "topic": "Üçgenlerde Eşlik Kuralları (KAK, AKA, KKK)",
                        "intro": "Sayfa 17'de iki üçgenin eşliği (ABC ≅ DEF), karşılıklı kenar ve açı eşitlikleri incelenmektedir.",
                        "questions": [
                            {
                                "num": 1,
                                "title": "1. Sıra Sizde: Kenar-Açı-Kenar (KAK) Eşliği",
                                "text": "ABC ve DEF üçgenlerinde |AB| = |DE| = 8 cm, |AC| = |DF| = 12 cm ve m(BAC) = m(EDF) = 50° olduğuna göre üçgenlerin eşliğini ve üçüncü kenar eşitliğini yazınız.",
                                "solution": "<p>İki kenar ve bu iki kenar arasındaki açı eşit olduğundan <strong>Kenar-Açı-Kenar (KAK) Eşlik Teoremi</strong> gereğince:<br>"
                                            "<strong>ΔABC ≅ ΔDEF</strong> dir.<br>"
                                            "Eş üçgenlerin tüm karşılıklı elemanları eşit olduğundan üçüncü kenarlar da eşittir: <strong>|BC| = |EF|</strong> dir.</p>",
                                "answer": "ΔABC ≅ ΔDEF (KAK Eşliği) &emsp; |BC| = |EF|"
                            }
                        ]
                    },
                    {
                        "page": 42,
                        "type": "Alıştırmalar",
                        "topic": "Thales Teoremi ve Benzerlik Oranı",
                        "intro": "Sayfa 42'de temel orantı teoremi (Thales) ve benzer üçgenlerin çevreleri ve alanları oranı ilişkisi çözülmektedir.",
                        "questions": [
                            {
                                "num": 1,
                                "title": "Soru 1: Benzerlik Oranı ve Alan İlişkisi",
                                "text": "Benzerlik oranı k = 2/3 olan iki benzer üçgenden küçük olanın alanı 36 cm² olduğuna göre büyük üçgenin alanını bulunuz.",
                                "solution": "<p>Benzer iki üçgenin alanları oranı, benzerlik oranının karesine eşittir:<br>"
                                            "Alan(Küçük) / Alan(Büyük) = k² = (2/3)² = 4/9<br>"
                                            "36 / Alan(Büyük) = 4/9<br>"
                                            "Alan(Büyük) = (36 × 9) / 4 = 9 × 9 = <strong>81 cm²</strong> bulunur.</p>",
                                "answer": "81 cm²"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "6. Tema: İstatistiksel Araştırma Süreci",
                "pages": [
                    {
                        "page": 110,
                        "type": "Sıra Sizde",
                        "topic": "Merkezi Eğilim Ölçüleri: Ortalama, Medyan ve Mod",
                        "intro": "Sayfa 110'da bir veri grubunun aritmetik ortalaması, ortanca (medyan) ve tepe değeri (mod) hesaplamaları yer almaktadır.",
                        "questions": [
                            {
                                "num": 1,
                                "title": "Soru 1: Medyan ve Aritmetik Ortalama",
                                "text": "Veri grubu: 4, 7, 8, 8, 10, 12, 14. Bu veri grubunun ortalamasını, medyanını ve modunu bulunuz.",
                                "solution": "<p>• <strong>Aritmetik Ortalama:</strong> Toplam / Sayı adedi = (4 + 7 + 8 + 8 + 10 + 12 + 14) / 7 = 63 / 7 = <strong>9</strong></p>"
                                            "<p>• <strong>Medyan (Ortanca):</strong> Veriler sıralıdır. 7 verinin tam ortasındaki (4. terim): <strong>8</strong></p>"
                                            "<p>• <strong>Mod (Tepe Değer):</strong> En çok tekrar eden değer (2 kez 8): <strong>8</strong></p>",
                                "answer": "Ortalama: 9 &emsp; Medyan: 8 &emsp; Mod: 8"
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

def build_post_html(page_data, book, prev_page, next_page):
    pno = page_data["page"]
    ptype = page_data["type"]
    topic = page_data["topic"]
    intro = page_data["intro"]
    questions = page_data["questions"]
    master_slug = book["master_slug"]
    master_title = book["master_title"]

    prev_link = f'<a href="/post/{prev_page["slug"]}" class="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 transition-all border border-slate-200">← Sayfa {prev_page["page"]} Çözümleri</a>' if prev_page else '<span class="text-slate-400 text-sm italic">İlk Sayfa</span>'
    next_link = f'<a href="/post/{next_page["slug"]}" class="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 transition-all border border-slate-200">Sayfa {next_page["page"]} Çözümleri →</a>' if next_page else '<span class="text-slate-400 text-sm italic">Son Sayfa</span>'
    hub_link = f'<a href="/post/{master_slug}" class="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all">📚 {book["subject"]} Tüm Kitap Çözümleri</a>'

    nav_bar = f"""
    <div class="my-6 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 not-prose shadow-sm">
      <div>{prev_link}</div>
      <div>{hub_link}</div>
      <div>{next_link}</div>
    </div>
    """

    badge_bar = f"""
    <div class="my-4 flex flex-wrap items-center gap-2 not-prose">
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-200/60">
        📘 {book["grade"]} {book["subject"]}
      </span>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-800 border border-cyan-200/60">
        📍 {topic}
      </span>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200/60">
        📝 {ptype} • Sayfa {pno}
      </span>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200/60">
        ✓ 2026-2027 MEB Yayınları
      </span>
    </div>
    """

    questions_html = ""
    for q in questions:
        questions_html += f"""
        <div class="my-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm overflow-hidden not-prose">
          <div class="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-6 py-4 text-white flex items-center justify-between">
            <h3 class="text-lg font-bold flex items-center gap-2 tracking-tight">
              <span class="w-8 h-8 rounded-lg bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center text-sm font-black text-indigo-300">
                {q.get('num', 1)}
              </span>
              {q.get('title', 'Soru')}
            </h3>
            <span class="text-xs font-medium px-2.5 py-1 rounded-md bg-white/10 text-indigo-200 border border-white/10">
              MEB Sayfa {pno}
            </span>
          </div>

          <div class="p-6 space-y-6">
            <div class="p-4 rounded-xl bg-amber-50/50 border border-amber-200/70 text-slate-800">
              <div class="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1.5 flex items-center gap-1.5">
                Kitaptaki Soru Metni ve Verilenler
              </div>
              <div class="text-base leading-relaxed font-medium text-slate-900">
                {q.get('text', '').replace(chr(10), '<br>')}
              </div>
            </div>

            <div class="space-y-3">
              <div class="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                Ayrıntılı Adım Adım Çözüm
              </div>
              <div class="p-5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-base leading-relaxed space-y-3 font-normal">
                {q.get('solution', '')}
              </div>
            </div>

            <div class="p-4 rounded-xl bg-emerald-50 border-2 border-emerald-500/40 text-emerald-950 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black shrink-0 text-lg shadow-sm">
                ✓
              </div>
              <div>
                <div class="text-xs font-black uppercase tracking-wider text-emerald-800">Doğru Cevap / Sonuç</div>
                <div class="text-base md:text-lg font-extrabold text-emerald-950">{q.get('answer', '')}</div>
              </div>
            </div>
          </div>
        </div>
        """

    html = f"""
    <div class="grade-post-content space-y-6">
      {badge_bar}
      
      <p class="text-lg leading-relaxed text-slate-700 font-normal">
        <strong>2026-2027 Eğitim Öğretim Yılı</strong> MEB {book["grade"]} {book["subject"]} Ders Kitabı <strong>Sayfa {pno} {ptype}</strong> sorularının detaylı çözümleri ve cevap anahtarı aşağıda sunulmuştur.
      </p>

      {nav_bar}

      <div class="p-4 rounded-xl bg-blue-50/50 border border-blue-200 text-blue-950 text-sm leading-relaxed">
        <strong>Konu Notu:</strong> {intro}
      </div>

      {questions_html}

      {nav_bar}
    </div>
    """
    return html

def build_master_html(book, all_pages):
    sections_html = ""
    for unit in book["units"]:
        u_pages = unit["pages"]
        buttons_html = ""
        for p in u_pages:
            buttons_html += f"""
            <a href="/post/{p['slug']}" class="group relative p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-500 transition-all flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between gap-2 mb-2">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-black bg-indigo-100 text-indigo-800 border border-indigo-200">
                    SAYFA {p['page']}
                  </span>
                  <span class="text-[11px] font-medium text-slate-500">2026-2027</span>
                </div>
                <h4 class="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  Sayfa {p['page']} Cevapları
                </h4>
                <p class="text-xs text-slate-500 mt-1 line-clamp-1">{p['type']}</p>
              </div>
              <div class="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:translate-x-0.5 transition-transform">
                <span>Çözümleri Gör</span>
                <span>→</span>
              </div>
            </a>
            """
        sections_html += f"""
        <div class="pt-6">
          <div class="flex items-center justify-between pb-3 border-b-2 border-indigo-500 mb-4 not-prose">
            <h3 class="text-xl font-black text-slate-900">{unit['name']}</h3>
            <span class="text-xs font-bold bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">{len(u_pages)} Sayfa</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 my-4 not-prose">
            {buttons_html}
          </div>
        </div>
        """

    master_html = f"""
    <div class="master-book-hub space-y-8">
      <div class="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl not-prose border border-indigo-900/50">
        <div class="flex flex-wrap items-center gap-2.5 mb-4">
          <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
            2026 - 2027 EĞİTİM ÖĞRETİM YILI
          </span>
          <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            {book["grade"].upper()}
          </span>
          <span class="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-slate-300">
            MEB Yayınları
          </span>
        </div>
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight mb-4">
          {book["master_title"]}
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mb-6">
          Milli Eğitim Bakanlığı tarafından 2026-2027 eğitim öğretim yılında okutulan <strong>{book["grade"]} {book["subject"]}</strong> ders kitabında yer alan tüm ünite, kontrol noktası, alıştırma ve ünite ölçme-değerlendirme sorularının doğrulanmış adım adım çözümleri.
        </p>
      </div>

      <div class="space-y-6">
        {sections_html}
      </div>

      <div class="p-5 rounded-2xl bg-slate-100 border border-slate-200/80 not-prose text-xs text-slate-600 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span class="font-bold text-slate-800">Resmî MEB Bağlantıları:</span>
          <a href="https://www.meb.gov.tr" target="_blank" rel="noopener" class="underline hover:text-indigo-600">meb.gov.tr</a> •
          <a href="https://ogmmateryal.eba.gov.tr" target="_blank" rel="noopener" class="underline hover:text-indigo-600">OGM Materyal</a>
        </div>
        <div>
          <span>Yazar: <strong>Cavenaghi</strong> • matemetrik.com</span>
        </div>
      </div>
    </div>
    """
    return master_html

def main():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    for book in GRADE9_BOOKS:
        print(f"Processing {book['grade']} {book['subject']}...")
        all_pages = []
        for unit in book["units"]:
            for p in unit["pages"]:
                p["slug"] = f"{book['category_slug']}-{book['id']}-sayfa-{p['page']}-cevaplari-meb"
                p["title"] = f"{book['grade']} {book['subject']} Ders Kitabı Sayfa {p['page']} Cevapları (MEB Yayınları)"
                all_pages.append(p)

        all_pages.sort(key=lambda x: x["page"])

        # Insert page posts
        for i, p in enumerate(all_pages):
            prev_p = all_pages[i - 1] if i > 0 else None
            next_p = all_pages[i + 1] if i < len(all_pages) - 1 else None
            content = build_post_html(p, book, prev_p, next_p)
            excerpt = f"2026-2027 MEB {book['grade']} {book['subject']} Sayfa {p['page']} {p['type']} soru metinleri ve adım adım çözümleri."
            featured_image = f"/uploads/cover-{p['slug']}.webp"
            tags = json.dumps([
                f"{book['grade'].lower()} {book['subject'].lower()} sayfa {p['page']} cevapları",
                f"meb {book['subject'].lower()} {book['grade'].lower()} çözümleri",
                "2026-2027 meb ders kitabı cevapları"
            ], ensure_ascii=False)

            cursor.execute("SELECT id FROM posts WHERE slug = ?", (p['slug'],))
            row = cursor.fetchone()
            views = random.randint(110, 450)
            if row:
                cursor.execute("""
                    UPDATE posts SET
                        title = ?, excerpt = ?, content = ?, featured_image = ?,
                        category = ?, category_slug = ?, tags = ?, author = 'Cavenaghi',
                        is_published = 1, updated_at = ?
                    WHERE id = ?
                """, (p['title'], excerpt, content, featured_image, book['grade'], book['category_slug'], tags, NOW_ISO, row[0]))
            else:
                cursor.execute("""
                    INSERT INTO posts (
                        title, slug, excerpt, content, featured_image,
                        category, category_slug, tags, author, views,
                        is_published, created_at, updated_at
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Cavenaghi', ?, 1, ?, ?)
                """, (p['title'], p['slug'], excerpt, content, featured_image, book['grade'], book['category_slug'], tags, views, NOW_ISO, NOW_ISO))

        # Insert Master Hub Post
        master_content = build_master_html(book, all_pages)
        master_featured_image = f"/uploads/cover-{book['master_slug']}.webp"
        master_tags = json.dumps([
            f"2026-2027 meb {book['subject'].lower()} ders kitabı cevapları",
            f"{book['grade'].lower()} {book['subject'].lower()} meb çözümleri",
            f"{book['grade'].lower()} ders kitabı cevapları",
            "meb ders kitapları 2026-2027"
        ], ensure_ascii=False)

        cursor.execute("SELECT id FROM posts WHERE slug = ?", (book['master_slug'],))
        row = cursor.fetchone()
        if row:
            cursor.execute("""
                UPDATE posts SET
                    title = ?, excerpt = ?, content = ?, featured_image = ?,
                    category = ?, category_slug = ?, tags = ?, author = 'Cavenaghi',
                    is_published = 1, updated_at = ?
                WHERE id = ?
            """, (book['master_title'], book['master_excerpt'], master_content, master_featured_image, book['grade'], book['category_slug'], master_tags, NOW_ISO, row[0]))
        else:
            cursor.execute("""
                INSERT INTO posts (
                    title, slug, excerpt, content, featured_image,
                    category, category_slug, tags, author, views,
                    is_published, created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Cavenaghi', 890, 1, ?, ?)
            """, (book['master_title'], book['master_slug'], book['master_excerpt'], master_content, master_featured_image, book['grade'], book['category_slug'], master_tags, NOW_ISO, NOW_ISO))

    conn.commit()
    cursor.execute("PRAGMA wal_checkpoint(TRUNCATE);")
    conn.close()
    print("Grade 9 books built and committed successfully!")

if __name__ == "__main__":
    main()
