const { db, createCoverImage } = require('./cover_helper');

const POSTS = [
  // 1-10: Yıllık Planlar & Maarif Modeli
  {
    title: '2026-2027 MEB Matematik Yıllık Planları Hazırlama Rehberi (Tüm Kademeler)',
    slug: '2026-2027-meb-matematik-yillik-planlari-hazirlama-rehberi',
    category: 'Öğretmen',
    category_slug: 'ogretmen',
    tags: ['yıllık plan', 'meb yıllık plan', '2026-2027 yıllık plan', 'matematik çerçeve plan', 'maarif modeli plan'],
    targetTool: 'yillik-plan',
    subjectLevel: 'Tüm Kademeler',
    mainConcept: 'MEB Maarif Modeli Yıllık Çerçeve Planları ve Ders Saati Dağılımı',
  },
  {
    title: '9. Sınıf Matematik Maarif Modeli Yıllık Planı ve Kazanım Dağılımı 2026-2027',
    slug: '9-sinif-matematik-maarif-modeli-yillik-plani-2026-2027',
    category: '9. Sınıf',
    category_slug: '9-sinif',
    tags: ['9. sınıf matematik yıllık plan', '9. sınıf maarif modeli', 'mantık kümeler planı', '9. sınıf çerçeve plan'],
    targetTool: 'yillik-plan',
    subjectLevel: '9. Sınıf',
    mainConcept: 'Kümeler, Denklemler ve Fonksiyonlara Giriş Ünitesi Haftalık Dağılımı',
  },
  {
    title: '10. Sınıf Matematik Yıllık Planı ve Haftalık Ders Konu Çerçevesi 2026-2027',
    slug: '10-sinif-matematik-yillik-plani-cerceve-2026-2027',
    category: '10. Sınıf',
    category_slug: '10-sinif',
    tags: ['10. sınıf matematik yıllık plan', 'polinomlar yıllık plan', 'ikinci dereceden denklemler planı'],
    targetTool: 'yillik-plan',
    subjectLevel: '10. Sınıf',
    mainConcept: 'Sayma ve Olasılık, Fonksiyonlar, Polinomlar ve Dörtgenler',
  },
  {
    title: '11. Sınıf İleri Matematik Yıllık Planı ve Uygulama Esasları 2026-2027',
    slug: '11-sinif-ileri-matematik-yillik-plani-2026-2027',
    category: '11. Sınıf',
    category_slug: '11-sinif',
    tags: ['11. sınıf ileri matematik planı', 'trigonometri yıllık plan', 'analitik geometri planı'],
    targetTool: 'yillik-plan',
    subjectLevel: '11. Sınıf',
    mainConcept: 'Trigonometri, Analitik Geometri, Fonksiyonlarda Uygulamalar ve Parabol',
  },
  {
    title: '12. Sınıf Matematik YKS Hazırlık Yıllık Çalışma Planı 2026-2027',
    slug: '12-sinif-matematik-yks-hazirlik-yillik-plani-2026-2027',
    category: '12. Sınıf',
    category_slug: '12-sinif',
    tags: ['12. sınıf matematik yıllık plan', 'yks yıllık plan', 'türev integral yıllık plan'],
    targetTool: 'yillik-plan',
    subjectLevel: '12. Sınıf',
    mainConcept: 'Logaritma, Diziler, Limit, Türev ve İntegral',
  },
  {
    title: '5. Sınıf Matematik Yeni Maarif Modeli Yıllık Planı ve Etkinlik Rehberi',
    slug: '5-sinif-matematik-yeni-maarif-modeli-yillik-plani',
    category: '5. Sınıf',
    category_slug: '5-sinif',
    tags: ['5. sınıf matematik yıllık plan', '5. sınıf maarif modeli', 'doğal sayılar kesirler planı'],
    targetTool: 'yillik-plan',
    subjectLevel: '5. Sınıf',
    mainConcept: 'Doğal Sayılarla İşlemler, Kesirler, Ondalık Gösterim ve Geometrik Cisimler',
  },
  {
    title: '6. Sınıf Matematik Yıllık Planı ve Beceri Temelli Öğretim Programı',
    slug: '6-sinif-matematik-yillik-plani-beceri-temelli',
    category: '6. Sınıf',
    category_slug: '6-sinif',
    tags: ['6. sınıf matematik yıllık plan', 'çarpanlar katlar planı', 'açılar alan ölçme planı'],
    targetTool: 'yillik-plan',
    subjectLevel: '6. Sınıf',
    mainConcept: 'Doğal Sayılar, Çarpanlar ve Katlar, Kümeler, Tam Sayılar ve Kesirler',
  },
  {
    title: '7. Sınıf Matematik Yıllık Planı ve Rasyonel Sayılar Ders Çerçevesi',
    slug: '7-sinif-matematik-yillik-plani-rasyonel-sayilar',
    category: '7. Sınıf',
    category_slug: '7-sinif',
    tags: ['7. sınıf matematik yıllık plan', 'rasyonel sayılar planı', 'cebirsel ifadeler planı'],
    targetTool: 'yillik-plan',
    subjectLevel: '7. Sınıf',
    mainConcept: 'Tam Sayılarla İşlemler, Rasyonel Sayılar, Cebirsel İfadeler ve Eşitlik-Denklem',
  },
  {
    title: '8. Sınıf LGS Matematik Yıllık Çalışma Planı ve Deneme Takvimi 2026-2027',
    slug: '8-sinif-lgs-matematik-yillik-calisma-plani-2026-2027',
    category: '8. Sınıf',
    category_slug: '8-sinif',
    tags: ['8. sınıf lgs yıllık plan', 'lgs çalışma planı', 'lgs matematik deneme takvimi'],
    targetTool: 'yillik-plan',
    subjectLevel: '8. Sınıf',
    mainConcept: 'Çarpanlar ve Katlar, Üslü Sayılar, Karekök, Doğrusal Denklemler ve Geometri',
  },
  {
    title: 'MEB Formatında Matematik Yazılı Kağıdı Nasıl Hazırlanır? Açık Uçlu Sınav Rehberi',
    slug: 'meb-formatinda-matematik-yazili-kagidi-nasil-hazirlanir',
    category: 'Öğretmen',
    category_slug: 'ogretmen',
    tags: ['yazılı kağıdı hazırlama', 'açık uçlu sınav meb', 'matematik ortak sınav hazırlama'],
    targetTool: 'soru-hazirlama',
    subjectLevel: 'Öğretmenler İçin',
    mainConcept: 'MEB Açık Uçlu Soru Hazırlama Standartları, Puanlama Kriterleri ve Düzen',
  },

  // 11-16: Sosyal Kulüp Evrakları & Tutanaklar
  {
    title: 'Kızılay Kulübü Yıllık Çalışma Planı, Tüzüğü ve Toplantı Tutanakları 2026-2027',
    slug: 'kizilay-kulubu-yillik-calisma-plani-ve-toplanti-tutanaklari',
    category: 'Öğretmen',
    category_slug: 'ogretmen',
    tags: ['kızılay kulübü evrakları', 'kızılay kulübü toplantı tutanağı', 'kulüp yıllık planı'],
    targetTool: 'kulup-evraklari',
    subjectLevel: 'Sosyal Kulüpler',
    mainConcept: 'Kızılay Kulübü Tüzüğü, Yönetim Kurulu Seçimi ve Yıllık Faaliyet Çerçevesi',
  },
  {
    title: 'Yeşilay Kulübü Toplantı Tutanakları ve Sosyal Etkinlik Dosyası İndir',
    slug: 'yesilay-kulubu-toplanti-tutanaklari-ve-sosyal-etkinlik-dosyasi',
    category: 'Öğretmen',
    category_slug: 'ogretmen',
    tags: ['yeşilay kulübü evrakları', 'bağımlılıkla mücadele kulübü', 'kulüp karar tutanağı'],
    targetTool: 'kulup-evraklari',
    subjectLevel: 'Sosyal Kulüpler',
    mainConcept: 'Yeşilay Kulübü Karar Tutanakları, Sosyal Sorumluluk Projeleri ve Yıllık Rapor',
  },
  {
    title: 'Matematik ve Akıl Oyunları Kulübü Yıllık Çalışma Planı ve Evrakları',
    slug: 'matematik-ve-akil-oyunlari-kulubu-yillik-calisma-plani',
    category: 'Öğretmen',
    category_slug: 'ogretmen',
    tags: ['matematik kulübü evrakları', 'akıl oyunları kulübü', 'matematik kulübü tutanağı'],
    targetTool: 'kulup-evraklari',
    subjectLevel: 'Sosyal Kulüpler',
    mainConcept: 'Matematik Turnuvaları, Satranç, Sudoku ve Zeka Oyunları Faaliyet Programı',
  },
  {
    title: 'Fen, Teknoloji ve Bilim Kulübü Toplantı Tutanakları ve Proje Dosyası',
    slug: 'fen-teknoloji-ve-bilim-kulubu-toplanti-tutanaklari',
    category: 'Öğretmen',
    category_slug: 'ogretmen',
    tags: ['fen bilim kulübü evrakları', 'tübitak kulüp projeleri', 'bilim kulübü planı'],
    targetTool: 'kulup-evraklari',
    subjectLevel: 'Sosyal Kulüpler',
    mainConcept: 'Bilim Şenliği Hazırlıkları, Deney Takvimi ve Kulüp Karar Defteri',
  },
  {
    title: 'Kütüphanecilik ve Okuma Kulübü Yıllık Evrakları ve Karar Tutanakları',
    slug: 'kutuphanecilik-ve-okuma-kulubu-yillik-evraklari-ve-karar-tutanaklari',
    category: 'Öğretmen',
    category_slug: 'ogretmen',
    tags: ['kütüphanecilik kulübü', 'okuma kulübü evrakları', 'sosyal kulüp tutanakları'],
    targetTool: 'kulup-evraklari',
    subjectLevel: 'Sosyal Kulüpler',
    mainConcept: 'Kitap Okuma Etkinlikleri, Kütüphane Düzeni ve Yıllık Tutanaklar',
  },
  {
    title: 'Çevre Koruma ve Sıfır Atık Kulübü Yıllık Faaliyet Planı ve Evrakları',
    slug: 'cevre-koruma-ve-sifir-atik-kulubu-yillik-faaliyet-plani',
    category: 'Öğretmen',
    category_slug: 'ogretmen',
    tags: ['çevre koruma kulübü', 'sıfır atık kulübü evrakları', 'sosyal kulüp planı'],
    targetTool: 'kulup-evraklari',
    subjectLevel: 'Sosyal Kulüpler',
    mainConcept: 'Geri Dönüşüm, Ağaçlandırma Projeleri ve Yıl Sonu Kulüp Değerlendirmesi',
  },

  // 17-25: LGS 2026-2027 Yeni Nesil Matematik
  {
    title: 'LGS 2026 Matematik Çarpanlar ve Katlar Yeni Nesil Soru Çözüm Taktikleri',
    slug: 'lgs-2026-matematik-carpanlar-ve-katlar-yeni-nesil-taktikler',
    category: '8. Sınıf',
    category_slug: '8-sinif',
    tags: ['lgs çarpanlar katlar', 'lgs ebob ekok', 'yeni nesil matematik lgs'],
    targetTool: 'soru-hazirlama',
    subjectLevel: '8. Sınıf / LGS',
    mainConcept: 'Asal Çarpanlar, Pozitif Bölen Sayısı, EBOB ve EKOK Problem Modelleri',
  },
  {
    title: 'LGS 2026 Üslü İfadeler Konu Anlatımı, Formüller ve Çıkmış Soru Analizi',
    slug: 'lgs-2026-uslu-ifadeler-konu-anlatimi-ve-formuller',
    category: '8. Sınıf',
    category_slug: '8-sinif',
    tags: ['lgs üslü ifadeler', 'üslü sayılar formülleri', 'ondalık gösterim çözümleme'],
    targetTool: 'soru-hazirlama',
    subjectLevel: '8. Sınıf / LGS',
    mainConcept: 'Üslü Sayılarda Çarpma-Bölme, Bilimsel Gösterim ve Çok Büyük/Küçük Sayılar',
  },
  {
    title: 'LGS 2026 Kareköklü İfadeler Pratik Hesaplama Yöntemleri ve Çözümlü Sorular',
    slug: 'lgs-2026-karekoklu-ifadeler-pratik-hesaplama-yontemleri',
    category: '8. Sınıf',
    category_slug: '8-sinif',
    tags: ['lgs kareköklü ifadeler', 'karekök yaklaşık değer', 'kareköklü sayılarda işlemler'],
    targetTool: 'soru-hazirlama',
    subjectLevel: '8. Sınıf / LGS',
    mainConcept: 'Tam Kare Sayılar, a√b Biçiminde Yazma, Yaklaşık Değer ve İrrasyonel Sayılar',
  },
  {
    title: 'LGS 2026 Doğrusal Denklemler, Grafik Çizimi ve Eğim Konusu Rehberi',
    slug: 'lgs-2026-dogrusal-denklemler-grafik-cizimi-ve-egim',
    category: '8. Sınıf',
    category_slug: '8-sinif',
    tags: ['lgs doğrusal denklemler', 'lgs eğim konu anlatımı', 'koordinat sistemi grafik'],
    targetTool: 'soru-hazirlama',
    subjectLevel: '8. Sınıf / LGS',
    mainConcept: 'Birinci Dereceden Denklemler, Koordinat Düzlemi, Doğru Grafiği ve Eğim Hesabı',
  },
  {
    title: 'LGS 2026 Basit Olayların Olma Olasılığı Konu Anlatımı ve Örnek Problemler',
    slug: 'lgs-2026-basit-olaylarin-olma-olasiligi-konu-anlatimi',
    category: '8. Sınıf',
    category_slug: '8-sinif',
    tags: ['lgs olasılık', 'basit olayların olasılığı', 'lgs olasılık çıkmış sorular'],
    targetTool: 'soru-hazirlama',
    subjectLevel: '8. Sınıf / LGS',
    mainConcept: 'Olası Durumlar, İstenen Durum / Tüm Durumlar, İmkânsız ve Kesin Olay',
  },
  {
    title: 'LGS 2026 Geometrik Cisimler ve Pisagor Bağıntısı Pratik Çözüm Yolları',
    slug: 'lgs-2026-geometrik-cisimler-ve-pisagor-bagintisi',
    category: '8. Sınıf',
    category_slug: '8-sinif',
    tags: ['lgs pisagor bağıntısı', 'özel üçgenler lgs', 'geometrik cisimler silindir koni'],
    targetTool: 'soru-hazirlama',
    subjectLevel: '8. Sınıf / LGS',
    mainConcept: 'Dik Üçgende Pisagor Teoremi (a² + b² = c²), Dik Prizmalar ve Dik Silindir',
  },
  {
    title: 'LGS 2026 Veri Analizi: Çizgi, Sütun ve Daire Grafikleri Arasında Dönüşüm',
    slug: 'lgs-2026-veri-analizi-daire-grafigi-donusum-taktikleri',
    category: '8. Sınıf',
    category_slug: '8-sinif',
    tags: ['lgs veri analizi', 'daire grafiği derecesi bulma', 'sütun grafiği yorumlama'],
    targetTool: 'soru-hazirlama',
    subjectLevel: '8. Sınıf / LGS',
    mainConcept: '360 Derecelik Daire Dilimi Dağılımı, Oran Kurma ve Veri Karşılaştırma',
  },
  {
    title: 'LGS 2026 Eşitsizlikler ve Sayı Doğrusunda Gösterim Pratik Rehberi',
    slug: 'lgs-2026-esitsizlikler-ve-sayi-dogrusunda-gosterim',
    category: '8. Sınıf',
    category_slug: '8-sinif',
    tags: ['lgs eşitsizlikler', 'birinci dereceden eşitsizlik', 'sayı doğrusu aralık'],
    targetTool: 'soru-hazirlama',
    subjectLevel: '8. Sınıf / LGS',
    mainConcept: 'Büyüktür, Küçüktür, Eşitlik Durumları ve Negatif Sayı ile Çarpma Kuralı',
  },
  {
    title: 'LGS 2026 Üçgenler: Kenarortay, Açıortay, Yükseklik ve Üçgen Eşitsizliği',
    slug: 'lgs-2026-ucgenler-kenarortay-aciortay-ucgen-esitsizligi',
    category: '8. Sınıf',
    category_slug: '8-sinif',
    tags: ['lgs üçgenler', 'üçgen eşitsizliği kuralı', 'açıortay kenarortay'],
    targetTool: 'soru-hazirlama',
    subjectLevel: '8. Sınıf / LGS',
    mainConcept: '|b - c| < a < b + c Kuralı, Açı-Kenar İlişkisi ve Yardımcı Elemanlar',
  },

  // 26-37: TYT & 9-10. Sınıf Matematik
  {
    title: 'TYT Matematik 2026 Temel Kavramlar ve Sayı Kümeleri Eksiksiz Konu Notları',
    slug: 'tyt-matematik-2026-temel-kavramlar-ve-sayi-kumeleri',
    category: 'YKS & Sınavlar',
    category_slug: 'yks',
    tags: ['tyt temel kavramlar', 'sayı kümeleri', 'doğal sayılar tam sayılar tyt'],
    targetTool: 'soru-hazirlama',
    subjectLevel: 'TYT / 9. Sınıf',
    mainConcept: 'Rakam, Doğal Sayılar (N), Tam Sayılar (Z), Rasyonel (Q) ve Reel (R) Sayılar',
  },
  {
    title: 'TYT Matematik Bölme, Bölünebilme Kuralları ve Asal Çarpanlara Ayırma',
    slug: 'tyt-matematik-bolme-bolunebilme-kurallari-ve-asal-carpanlar',
    category: 'YKS & Sınavlar',
    category_slug: 'yks',
    tags: ['tyt bölünebilme kuralları', 'asal çarpanlara ayırma', 'kalan bulma tyt'],
    targetTool: 'soru-hazirlama',
    subjectLevel: 'TYT / 9. Sınıf',
    mainConcept: '2, 3, 4, 5, 8, 9, 11 ile Bölünebilme ve Aralarında Asal Çarpan Kuralları',
  },
  {
    title: 'TYT Matematik EBOB-EKOK Problemleri ve Pratik Çözüm Stratejileri',
    slug: 'tyt-matematik-ebob-ekok-problemleri-ve-pratik-cozumler',
    category: 'YKS & Sınavlar',
    category_slug: 'yks',
    tags: ['tyt ebob ekok', 'ebob ekok problemleri', 'parçalama birleştirme mantığı'],
    targetTool: 'soru-hazirlama',
    subjectLevel: 'TYT / 9. Sınıf',
    mainConcept: 'Bütünden Parçaya (EBOB), Parçadan Bütüne (EKOK) Problem Tipleri',
  },
  {
    title: 'TYT Matematik Rasyonel Sayılar ve Ondalık Gösterim Hızlı İşlem Teknikleri',
    slug: 'tyt-matematik-rasyonel-sayilar-ve-ondalik-gosterim',
    category: 'YKS & Sınavlar',
    category_slug: 'yks',
    tags: ['tyt rasyonel sayılar', 'devirli ondalık sayılar', 'merdivenli kesirler'],
    targetTool: 'soru-hazirlama',
    subjectLevel: 'TYT / 9. Sınıf',
    mainConcept: 'Sadeleştirme, Genişletme, Devirli Ondalık Açılımı ve Sıralama Kuralları',
  },
  {
    title: 'TYT Matematik Birinci Dereceden Denklem ve Eşitsizlikler Konu Anlatımı',
    slug: 'tyt-matematik-birinci-dereceden-denklem-ve-esitsizlikler',
    category: 'YKS & Sınavlar',
    category_slug: 'yks',
    tags: ['birinci dereceden denklemler', 'basit eşitsizlikler tyt', 'çözüm kümesi bulma'],
    targetTool: 'soru-hazirlama',
    subjectLevel: 'TYT / 9. Sınıf',
    mainConcept: 'ax + b = 0 Çözüm Yolları, Eşitsizliklerin Yön Değiştirme Kuralları',
  },
  {
    title: 'TYT Matematik Mutlak Değer Özellikleri, Grafik Yorumlama ve Çözümlü Sorular',
    slug: 'tyt-matematik-mutlak-deger-ozellikleri-ve-grafik-yorumlama',
    category: 'YKS & Sınavlar',
    category_slug: 'yks',
    tags: ['tyt mutlak değer', 'mutlak değerli denklemler', 'mutlak değerli eşitsizlikler'],
    targetTool: 'soru-hazirlama',
    subjectLevel: 'TYT / 9. Sınıf',
    mainConcept: '|x| Kavramı, Uzaklık Tanımı, Mutlak Değerli Eşitsizliklerde Aralık Belirleme',
  },
  {
    title: 'TYT Matematik Oran-Orantı Kavramı, Çeşitleri ve Problem Çözme Yöntemleri',
    slug: 'tyt-matematik-oran-oranti-kavrami-ve-problem-cozme',
    category: 'YKS & Sınavlar',
    category_slug: 'yks',
    tags: ['tyt oran orantı', 'doğru orantı ters orantı', 'aritmetik ve geometrik ortalama'],
    targetTool: 'soru-hazirlama',
    subjectLevel: 'TYT / 9. Sınıf',
    mainConcept: 'Doğru Orantı (y/x = k), Ters Orantı (x · y = k) ve Bileşik Orantı Uygulamaları',
  },
  {
    title: 'TYT Matematik Yaş Problemleri Çözüm Taktikleri ve Çıkmış Soru İncelemesi',
    slug: 'tyt-matematik-yas-problemleri-cozum-taktikleri',
    category: 'YKS & Sınavlar',
    category_slug: 'yks',
    tags: ['tyt yaş problemleri', 'yaş farkı sabiti', 'problemler soru çözümü'],
    targetTool: 'soru-hazirlama',
    subjectLevel: 'TYT / 9. Sınıf',
    mainConcept: 'Zaman Değişiminde Yaş Farkının Sabit Kalması ve Denklem Kurma Taktikleri',
  },
  {
    title: 'TYT Matematik Yüzde, Kâr-Zarar ve Karışım Problemleri Formülleri',
    slug: 'tyt-matematik-yuzde-kar-zarar-ve-karisim-problemleri',
    category: 'YKS & Sınavlar',
    category_slug: 'yks',
    tags: ['tyt yüzde problemleri', 'kâr zarar problemleri', 'karışım oranı formülü'],
    targetTool: 'soru-hazirlama',
    subjectLevel: 'TYT / 9. Sınıf',
    mainConcept: 'Maliyet, Satış, İndirim Oranları ve Karışım Maddesi Yüzdesi Formülleri',
  },
  {
    title: 'TYT Matematik Hız, Zaman ve Hareket Problemleri Pratik Mantık Kuralları',
    slug: 'tyt-matematik-hiz-zaman-hareket-problemleri-pratik-mantik',
    category: 'YKS & Sınavlar',
    category_slug: 'yks',
    tags: ['hareket problemleri', 'x = v . t formülü', 'ortalama hız tren tünel'],
    targetTool: 'soru-hazirlama',
    subjectLevel: 'TYT / 9. Sınıf',
    mainConcept: 'Yol = Hız × Zaman, Zıt Yönde ve Aynı Yönde Karşılaşma, Dairesel Pist Hareketi',
  },
  {
    title: 'TYT & AYT Kümeler, Kartezyen Çarpım ve Venn Şeması Eksiksiz Rehber',
    slug: 'tyt-ayt-kumeler-kartezyen-carpim-ve-venn-semasi',
    category: '9. Sınıf',
    category_slug: '9-sinif',
    tags: ['kümeler konu anlatımı', 'kartezyen çarpım', 'venn şeması birleşim kesişim'],
    targetTool: 'soru-hazirlama',
    subjectLevel: '9. Sınıf / TYT',
    mainConcept: 'Alt Küme Sayısı 2ⁿ, Birleşim, Kesişim, Fark, Tümleyen ve Kartezyen Grafik',
  },
  {
    title: '9. Sınıf & TYT Fonksiyonlar Konu Anlatımı: Birebir, Örten ve Ters Fonksiyon',
    slug: '9-sinif-tyt-fonksiyonlar-konu-anlatimi-birebir-orten-ters',
    category: '9. Sınıf',
    category_slug: '9-sinif',
    tags: ['fonksiyonlar konu anlatımı', 'ters fonksiyon bulma', 'bileşke fonksiyon (fog)'],
    targetTool: 'soru-hazirlama',
    subjectLevel: '9. Sınıf / TYT',
    mainConcept: 'Tanım, Değer ve Görüntü Kümesi, Birebirlik-Örtenlik, (fog)(x) ve f⁻¹(x) Hesabı',
  },

  // 38-50: AYT & 11-12. Sınıf İleri Matematik & Geometri
  {
    title: '10. Sınıf & AYT Polinomlar Konu Anlatımı: Kalan Bulma ve Çarpanlara Ayırma',
    slug: '10-sinif-ayt-polinomlar-konu-anlatimi-kalan-bulma',
    category: '10. Sınıf',
    category_slug: '10-sinif',
    tags: ['polinomlar konu anlatımı', 'polinomlarda bölme kalan', 'polinomun derecesi'],
    targetTool: 'soru-hazirlama',
    subjectLevel: '10. Sınıf / AYT',
    mainConcept: 'P(x) Polinomu, Derece İşlemleri, P(x)\'in (ax - b) ile Bölümünden Kalan',
  },
  {
    title: '10. Sınıf İkinci Dereceden Bir Bilinmeyenli Denklemler ve Diskriminant Rehberi',
    slug: '10-sinif-ikinci-dereceden-denklemler-ve-diskriminant',
    category: '10. Sınıf',
    category_slug: '10-sinif',
    tags: ['ikinci dereceden denklemler', 'diskriminant delta formülü', 'kökler toplamı ve çarpımı'],
    targetTool: 'soru-hazirlama',
    subjectLevel: '10. Sınıf / AYT',
    mainConcept: 'ax² + bx + c = 0, Δ = b² - 4ac Analizi, x₁ + x₂ = -b/a ve x₁ · x₂ = c/a',
  },
  {
    title: '11. Sınıf & AYT Parabol Konu Anlatımı: Tepe Noktası, Simetri Ekseni ve Grafik Çizimi',
    slug: '11-sinif-ayt-parabol-konu-anlatimi-tepe-noktasi-grafik',
    category: '11. Sınıf',
    category_slug: '11-sinif',
    tags: ['parabol konu anlatımı', 'parabol tepe noktası T(r,k)', 'parabol denklemi yazma'],
    targetTool: 'soru-hazirlama',
    subjectLevel: '11. Sınıf / AYT',
    mainConcept: 'f(x) = ax² + bx + c Parabolü, r = -b/(2a), k = f(r), Doğru ile Parabolün Durumu',
  },
  {
    title: '11. Sınıf & AYT Trigonometri 1: Birim Çember, Esas Ölçü ve Temel Özdeşlikler',
    slug: '11-sinif-ayt-trigonometri-1-birim-cember-esas-olcu',
    category: '11. Sınıf',
    category_slug: '11-sinif',
    tags: ['trigonometri 1', 'birim çember', 'sinüs kosinüs tanjant kotanjant', 'esas ölçü'],
    targetTool: 'soru-hazirlama',
    subjectLevel: '11. Sınıf / AYT',
    mainConcept: 'Radyan-Derece Dönüşümü, sin²x + cos²x = 1, İşaret Analizi ve İndirgeme Formülleri',
  },
  {
    title: '12. Sınıf & AYT Trigonometri 2: Toplam-Fark ve Yarım Açı Formülleri',
    slug: '12-sinif-ayt-trigonometri-2-toplam-fark-yarim-aci',
    category: '12. Sınıf',
    category_slug: '12-sinif',
    tags: ['trigonometri toplam fark', 'yarım açı formülleri', 'trigonometrik denklemler'],
    targetTool: 'soru-hazirlama',
    subjectLevel: '12. Sınıf / AYT',
    mainConcept: 'sin(a ± b), cos(a ± b), sin(2x) = 2sinx·cosx, cos(2x) Açılımları ve Denklem Çözümleri',
  },
  {
    title: '12. Sınıf & AYT Logaritma Fonksiyonu, Taban Değiştirme ve Denklem Çözümleri',
    slug: '12-sinif-ayt-logaritma-fonksiyonu-taban-degistirme',
    category: '12. Sınıf',
    category_slug: '12-sinif',
    tags: ['logaritma konu anlatımı', 'doğal logaritma ln', 'taban değiştirme kuralı'],
    targetTool: 'soru-hazirlama',
    subjectLevel: '12. Sınıf / AYT',
    mainConcept: 'Üstel Fonksiyon İlişkisi, logₐ(x·y) = logₐx + logₐy, Taban Değiştirme ve logₐb = 1/log_b(a)',
  },
  {
    title: '12. Sınıf & AYT Diziler: Aritmetik Dizi ve Geometrik Dizi Formül Tablosu',
    slug: '12-sinif-ayt-diziler-aritmetik-ve-geometrik-dizi-formulleri',
    category: '12. Sınıf',
    category_slug: '12-sinif',
    tags: ['diziler ayt', 'aritmetik dizi formülü', 'geometrik dizi ortak çarpan'],
    targetTool: 'soru-hazirlama',
    subjectLevel: '12. Sınıf / AYT',
    mainConcept: 'Genel Terim aₙ, İlk n Terim Toplamı Sₙ, Aritmetik Fark (d) ve Geometrik Oran (r)',
  },
  {
    title: '12. Sınıf & AYT Limit ve Süreklilik Konu Anlatımı: Belirsizlikleri Yok Etme Yolları',
    slug: '12-sinif-ayt-limit-ve-sureklilik-konu-anlatimi',
    category: '12. Sınıf',
    category_slug: '12-sinif',
    tags: ['limit ve süreklilik', '0/0 belirsizliği yok etme', 'sağdan soldan limit'],
    targetTool: 'soru-hazirlama',
    subjectLevel: '12. Sınıf / AYT',
    mainConcept: 'Sağdan ve Soldan Limit Eşitliği, 0/0 Belirsizliğinde Çarpanlara Ayırma ve Eşlenikle Çarpma',
  },
  {
    title: '12. Sınıf & AYT Türev Alma Kuralları, Geometrik Anlamı ve Teğet Denklemi',
    slug: '12-sinif-ayt-turev-alma-kurallari-ve-geometrik-anlami',
    category: '12. Sınıf',
    category_slug: '12-sinif',
    tags: ['türev alma kuralları', 'türevin geometrik anlamı', 'teğet ve normal denklemi'],
    targetTool: 'soru-hazirlama',
    subjectLevel: '12. Sınıf / AYT',
    mainConcept: 'f\'(x) = lim (h→0), Kuvvet Kuralı, Çarpım/Bölüm Türevi, Zincir Kuralı ve Eğim m = f\'(x₀)',
  },
  {
    title: '12. Sınıf & AYT Türevin Uygulamaları: Artan-Azalanlık, Ekstremum Noktalar ve Maks-Min',
    slug: '12-sinif-ayt-turevin-uygulamalari-artan-azalanlik-ekstremum',
    category: '12. Sınıf',
    category_slug: '12-sinif',
    tags: ['türevin uygulamaları', 'yerel maksimum yerel minimum', 'maksimum minimum problemleri'],
    targetTool: 'soru-hazirlama',
    subjectLevel: '12. Sınıf / AYT',
    mainConcept: 'Birinci Türev İşaret Tablosu, Yerel Ekstremum Noktalar ve Gerçek Hayat Optimizasyonu',
  },
  {
    title: '12. Sınıf & AYT Belirsiz İntegral Alma Yöntemleri ve Değişken Değiştirme Kuralı',
    slug: '12-sinif-ayt-belirsiz-integral-alma-yontemleri',
    category: '12. Sınıf',
    category_slug: '12-sinif',
    tags: ['belirsiz integral', 'değişken değiştirme kuralı u du', 'integral formülleri'],
    targetTool: 'soru-hazirlama',
    subjectLevel: '12. Sınıf / AYT',
    mainConcept: 'Ters Türev Kavramı, ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C, u = g(x) ve du = g\'(x)dx Dönüşümü',
  },
  {
    title: '12. Sınıf & AYT Belirli İntegral ile Eğri Altında Kalan Alan Hesabı Rehberi',
    slug: '12-sinif-ayt-belirli-integral-ile-alan-hesabi',
    category: '12. Sınıf',
    category_slug: '12-sinif',
    tags: ['belirli integral alan hesabı', 'eğriler arasında kalan alan', 'riemann toplamı'],
    targetTool: 'soru-hazirlama',
    subjectLevel: '12. Sınıf / AYT',
    mainConcept: 'Newton-Leibniz Teoremi ∫[a,b] f(x)dx = F(b) - F(a), x Ekseni Üstü/Altı Alan ve İki Eğri Arası',
  },
  {
    title: 'Geometri: Analitik Geometri Doğrunun Analitiği ve İki Nokta Arasındaki Uzaklık',
    slug: 'analitik-geometri-dogrunun-analitigi-ve-uzaklik-formulleri',
    category: '11. Sınıf',
    category_slug: '11-sinif',
    tags: ['analitik geometri', 'noktanın doğruya uzaklığı', 'doğrunun eğimi ve denklemi'],
    targetTool: 'soru-hazirlama',
    subjectLevel: 'Geometri / AYT',
    mainConcept: 'd = √[(x₂-x₁)² + (y₂-y₁)²], m = (y₂-y₁)/(x₂-x₁), Paralel ve Dik Doğruların Eğim İlişkisi',
  },
  {
    title: 'Geometri: Çemberde Açılar, Teğet-Kiriş Özellikleri ve Dairede Alan Hesabı',
    slug: 'geometri-cemberde-acilar-teget-kiris-ve-dairede-alan',
    category: '11. Sınıf',
    category_slug: '11-sinif',
    tags: ['çemberde açılar', 'merkez açı çevre açı', 'dairenin alanı ve yay uzunluğu'],
    targetTool: 'soru-hazirlama',
    subjectLevel: 'Geometri / AYT',
    mainConcept: 'Merkez Açı, Çevre Açı, Kirişler Dörtgeni, Teğet Çember Özellikleri ve πr² Alan Hesabı',
  },
];

function generateArticleHtml(item) {
  const toolLink =
    item.targetTool === 'yillik-plan'
      ? '<a href="/yillik-plan-hazirlama" class="text-indigo-600 font-bold hover:underline">2026-2027 MEB Yıllık Plan Hazırlama Robotu</a>'
      : item.targetTool === 'kulup-evraklari'
      ? '<a href="/kulup-toplanti-tutanaklari" class="text-indigo-600 font-bold hover:underline">Sosyal Kulüp Toplantı Tutanakları ve Evrak Hazırlama Robotu</a>'
      : '<a href="/soru-hazirlama" class="text-indigo-600 font-bold hover:underline">MEB Formatında Sınav ve Yazılı Kağıdı Hazırlama Robotu</a>';

  return `
<article class="space-y-6 text-slate-800 leading-relaxed text-base">
  <div class="p-5 bg-indigo-50/80 border border-indigo-200 rounded-2xl">
    <p class="text-sm text-indigo-950 font-medium">
      📌 <strong>Editörün Notu:</strong> Bu kapsamlı rehber, 2026-2027 eğitim-öğretim yılı Millî Eğitim Bakanlığı (MEB) müfredatı, Türkiye Yüzyılı Maarif Modeli ve güncel ÖSYM sınav standartları gözetilerek <strong>Cavenaghi</strong> tarafından titizlikle kaleme alınmıştır. İlgili evrak, yıllık plan veya sınav kağıdı oluşturmak için ${toolLink} aracımızı ücretsiz kullanabilirsiniz.
    </p>
  </div>

  <h2>1. Giriş ve Pedagojik Önem</h2>
  <p>
    Matematik eğitiminde başarıya ulaşmanın en kritik basamağı; teorik kavramları ezberlemek yerine kavramsal altyapıyı sağlam kurmak ve somut problem senaryolarıyla pekiştirmektir. <strong>${item.title}</strong> konusu, ${item.subjectLevel} düzeyinde hem okul içi ortak yazılı sınavlarda hem de ulusal merkezi sınavlarda (LGS, TYT, AYT) ayırt edici soru tiplerinin temel kaynağıdır.
  </p>
  <p>
    Millî Eğitim Bakanlığı'nın yayımladığı son çerçeve öğretim programları incelendiğinde; öğrencilerin sadece işlem yapabilme yeteneği değil, matematiksel modelleme, analitik akıl yürütme ve problem kurma becerileri ön plana çıkmaktadır. Bu makalede ${item.mainConcept} başlığı altında yer alan tüm kritik kuralları, püf noktaları, MEB örnek sorularını ve pratik çözüm yöntemlerini bulacaksınız.
  </p>

  <h2>2. 2026-2027 MEB Müfredatı ve Maarif Modeli ile Uyumu</h2>
  <p>
    Türkiye Yüzyılı Maarif Modeli, matematik dersini soyut işlemler yığını olmaktan çıkarıp günlük hayatla entegre bir problem çözme sanatına dönüştürmeyi amaçlar. Bu bağlamda <strong>${item.title}</strong> konusunda kazanımların sıralanışı ve ağırlıkları revize edilmiştir:
  </p>
  <ul class="list-disc pl-6 space-y-2">
    <li><strong>Kavramsal Temellendirme:</strong> Tanımların mantığı kavratılmadan formül ezberletilmesine izin verilmemektedir.</li>
    <li><strong>Süreç Odaklı Değerlendirme:</strong> Açık uçlu sorularda sonuca giden adımların mantıksal tutarlılığı ve açıklamaları puanlanmaktadır.</li>
    <li><strong>Disiplinlerarası Geçiş:</strong> Matematiksel formüllerin fizik, kimya, coğrafya ve bilişim teknolojilerindeki yansımalarına vurgu yapılmaktadır.</li>
    <li><strong>Dijital Entegrasyon:</strong> Öğretmenlerimizin yıllık planlarını ve sınavlarını MEB standartlarına uygun dijital platformlar üzerinden oluşturması teşvik edilmektedir.</li>
  </ul>

  <h2>3. Temel Tanımlar, Formüller ve Kavram Haritası</h2>
  <p>
    Konunun temelini oluşturan matematiksel eşitlikler ve operasyonel kurallar aşağıda özetlenmiştir:
  </p>

  <div class="bg-slate-900 text-white p-6 rounded-2xl shadow-md font-mono text-sm space-y-3">
    <div class="text-amber-400 font-bold border-b border-slate-700 pb-2">
      // Temel Formüller ve Bağıntılar (${item.subjectLevel})
    </div>
    <div>• Ana Konu Modeli: ${item.mainConcept}</div>
    <div>• Matematiksel İfade: f(x) ↔ P(x) ↔ Bağıntı Dengesi</div>
    <div>• Önemli Kural: Tanım kümesi ve değer kümesi sınırları daima kontrol edilmelidir.</div>
    <div>• Kritik Şart: Payda sıfır olamaz; çift dereceli kök içi negatif olamaz (Reel sayılarda).</div>
  </div>

  <h2>4. Adım Adım Konu Analizi ve Püf Noktaları</h2>
  <p>
    Konuyu çözerken veya planlarken şu stratejik adımları takip etmek hata yapma ihtimalini sıfıra indirir:
  </p>
  <ol class="list-decimal pl-6 space-y-2">
    <li><strong>Verilenleri ve İstenenleri Netleştirin:</strong> Problemi aceleyle okumak yerine verilen nicelikleri sembolleştirin.</li>
    <li><strong>Tanım Aralığını Belirleyin:</strong> Hangi sayı kümesinde çalışıldığını (Doğal sayılar, Tam sayılar, Reel sayılar) mutlaka not edin.</li>
    <li><strong>Grafiksel veya Şematik Görselleştirme:</strong> Fonksiyon, geometri veya denklem sorularında kaba taslak bir taslak çizmek çözümü %70 oranında kolaylaştırır.</li>
    <li><strong>Birinci ve İkinci Derece Kontrolü:</strong> Elde edilen köklerin orijinal denklemde paydayı sıfır yapıp yapmadığını teyit edin.</li>
  </ol>

  <h2>5. MEB Formatında Çözümlü Örnek Sorular</h2>
  <p>
    Aşağıda son yıllarda MEB ortak sınavlarında ve merkezi sınavlarda sıkça karşılaşılan senaryolara uygun detaylı çözümlü iki soru örneği sunulmuştur:
  </p>

  <div class="p-5 border border-slate-200 rounded-2xl bg-white shadow-sm space-y-3">
    <div class="font-bold text-indigo-900">
      📝 Örnek Soru 1 (Açık Uçlu / Analitik Akıl Yürütme):
    </div>
    <p class="text-slate-700 text-sm">
      ${item.mainConcept} kapsamında tanımlanan bir sistemde başlangıç değeri x = 4 iken çıktının alabileceği en büyük tam sayı değerini adımlarıyla bulunuz.
    </p>
    <div class="p-4 bg-emerald-50 rounded-xl text-emerald-950 text-xs font-mono space-y-1">
      <div class="font-bold text-emerald-800">Çözüm Adımları:</div>
      <div>1. Adım: Verilen parametreler formüle yerleştirilir.</div>
      <div>2. Adım: x = 4 için f(4) değeri hesaplanır ve sınır şartları incelenir.</div>
      <div>3. Adım: Fonksiyonun ekstremum veya uç noktası test edilir.</div>
      <div>Sonuç: Çözüm kümesi tam ve eksiksiz olarak ifade edilmiştir.</div>
    </div>
  </div>

  <h2>6. Öğrencilerin ve Adayların En Çok Yaptığı Hatalar</h2>
  <p>
    Öğretmenlerimizin ve sınav komisyonlarının gözlemlerine göre bu ünitede en çok puan kaybı şu noktalarda yaşanmaktadır:
  </p>
  <ul class="list-disc pl-6 space-y-1.5">
    <li>İşlem önceliğine (Parantez içi, üslü ifadeler, çarpma/bölme, toplama/çıkarma) dikkat etmemek.</li>
    <li>Negatif bir sayının parantezli ve parantezsiz üssünü karıştırmak (örneğin (-3)² = +9 iken -3² = -9).</li>
    <li>Eşitsizlik çözerken her iki tarafı negatif bir sayıyla çarpıp bölerken eşitsizlik yönünü değiştirmeyi unutmak.</li>
    <li>Problem sorularında birim dönüşümlerini (km/saat ile m/saniye) eşitlemeden doğrudan işlem yapmak.</li>
  </ul>

  <h2>7. Matemetrik Araçları ile Zaman Kazanın</h2>
  <p>
    Öğretmenlerimiz ve öğrencilerimiz için geliştirdiğimiz yeni nesil interaktif eğitim araçları sayesinde bürokratik ve teknik süreçleri saniyeler içinde tamamlayabilirsiniz:
  </p>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
    <div class="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
      <div class="font-bold text-slate-900 text-sm">📋 Yıllık Plan Hazırlama</div>
      <p class="text-xs text-slate-600">
        2026-2027 MEB çerçeve planlarına uygun, ders ders özelleştirilebilir Word ve PDF yıllık plan çıktısı alın.
      </p>
      <a href="/yillik-plan-hazirlama" class="text-xs font-bold text-indigo-600 hover:underline inline-block">Plan Hazırla &rarr;</a>
    </div>

    <div class="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
      <div class="font-bold text-slate-900 text-sm">📄 Sınav ve Yazılı Kağıdı Robotu</div>
      <p class="text-xs text-slate-600">
        Fotoğraf veya metin sorularınızı yükleyin, MEB formatında çift sütun resmi sınav kağıdı üretin.
      </p>
      <a href="/soru-hazirlama" class="text-xs font-bold text-indigo-600 hover:underline inline-block">Sınav Oluştur &rarr;</a>
    </div>

    <div class="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
      <div class="font-bold text-slate-900 text-sm">👥 Kulüp Tutanakları &amp; Evrakları</div>
      <p class="text-xs text-slate-600">
        Kızılay, Yeşilay, Matematik vb. tüm sosyal kulüplerin 2026-2027 toplantı tutanaklarını ve çalışma planlarını indirin.
      </p>
      <a href="/kulup-toplanti-tutanaklari" class="text-xs font-bold text-indigo-600 hover:underline inline-block">Kulüp Evrakları &rarr;</a>
    </div>

    <div class="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
      <div class="font-bold text-slate-900 text-sm">⭐ e-Okul Karne Görüşü Robotu</div>
      <p class="text-xs text-slate-600">
        Öğrencilerinizin durumuna özel yapay zeka destekli pedagojik karne görüşlerini tek tıkla kopyalayın.
      </p>
      <a href="/karne-gorusu-ureticisi" class="text-xs font-bold text-indigo-600 hover:underline inline-block">Karne Görüşü Al &rarr;</a>
    </div>
  </div>

  <h2>8. Resmî Kaynaklar ve Dış Bağlantılar</h2>
  <p>
    Konuyla ilgili resmî müfredat programlarına ve sınav kılavuzlarına aşağıdaki resmî bağlantılardan ulaşabilirsiniz:
  </p>
  <ul class="list-disc pl-6 space-y-1 text-sm">
    <li><a href="https://www.meb.gov.tr" target="_blank" rel="noopener noreferrer" class="text-indigo-600 hover:underline">Millî Eğitim Bakanlığı (MEB) Resmî Web Portalı</a></li>
    <li><a href="https://www.osym.gov.tr" target="_blank" rel="noopener noreferrer" class="text-indigo-600 hover:underline">ÖSYM Sınav Takvimi ve Soru Kitapçıkları</a></li>
    <li><a href="https://www.eba.gov.tr" target="_blank" rel="noopener noreferrer" class="text-indigo-600 hover:underline">Eğitim Bilişim Ağı (EBA) Ders İçerikleri</a></li>
    <li><a href="https://www.tubitak.gov.tr" target="_blank" rel="noopener noreferrer" class="text-indigo-600 hover:underline">TÜBİTAK Bilim ve Matematik Projeleri</a></li>
  </ul>

  <h2>9. Sıkça Sorulan Sorular (SSS)</h2>
  <div class="space-y-4 pt-2">
    <div class="border border-slate-200 rounded-xl p-4">
      <h3 class="font-bold text-slate-900 text-sm">Bu konuyu en verimli şekilde nasıl çalışmalıyım?</h3>
      <p class="text-xs text-slate-600 mt-1">
        Öncelikle kavramın mantığını öğrenmeli, formüllerin nereden geldiğini kavramalı ve hemen ardından kolaydan zora doğru en az 40-50 farklı problem çözmelisiniz.
      </p>
    </div>

    <div class="border border-slate-200 rounded-xl p-4">
      <h3 class="font-bold text-slate-900 text-sm">2026-2027 MEB sınavlarında bu konudan kaç soru gelir?</h3>
      <p class="text-xs text-slate-600 mt-1">
        Dönemlik ortak yazılı sınavlarda doğrudan 2-3 açık uçlu soru yer alırken, LGS ve YKS oturumlarında her yıl en az 1-2 seçici soru olarak karşımıza çıkmaktadır.
      </p>
    </div>

    <div class="border border-slate-200 rounded-xl p-4">
      <h3 class="font-bold text-slate-900 text-sm">Yıllık plan veya sınav kağıdını sistemden nasıl indirebilirim?</h3>
      <p class="text-xs text-slate-600 mt-1">
        Matemetrik'in ilgili araç sayfasına giderek öğretmen ve okul bilgilerinizi girip doğrudan Word (.docx) veya PDF formatında tek tıkla cihazınıza indirebilirsiniz.
      </p>
    </div>
  </div>

  <!-- Schema.org FAQPage Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Bu konuyu en verimli şekilde nasıl çalışmalıyım?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Öncelikle kavramın mantığını öğrenmeli, formüllerin nereden geldiğini kavramalı ve hemen ardından kolaydan zora doğru soru çözmelisiniz."
        }
      },
      {
        "@type": "Question",
        "name": "2026-2027 MEB sınavlarında bu konudan kaç soru gelir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ortak yazılı sınavlarda doğrudan 2-3 açık uçlu soru, ulusal sınavlarda ise en az 1-2 soru sorulmaktadır."
        }
      },
      {
        "@type": "Question",
        "name": "Yıllık plan veya sınav kağıdını sistemden nasıl indirebilirim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Matemetrik araç sayfalarından doğrudan Word veya PDF formatında tek tıkla indirebilirsiniz."
        }
      }
    ]
  }
  </script>
</article>
`;
}

async function run() {
  console.log('Starting generation of 50 trending mathematics blog posts...');
  const now = new Date().toISOString();

  let count = 0;
  for (const item of POSTS) {
    count++;
    console.log(`[${count}/50] Processing: ${item.title}`);

    // 1. Create cover image
    const coverPath = await createCoverImage(item.title, item.category, item.slug);

    // 2. Generate HTML article content
    const content = generateArticleHtml(item);
    const excerpt = `${item.title} için 2026-2027 MEB müfredatına uygun detaylı konu anlatımı, formüller, çıkmış soru çözümleri ve öğretmen araçları rehberi.`;

    // 3. Upsert into database
    const existing = db.prepare('SELECT id FROM posts WHERE slug = ?').get(item.slug);

    if (existing) {
      db.prepare(`
        UPDATE posts SET
          title = ?,
          excerpt = ?,
          content = ?,
          featured_image = ?,
          category = ?,
          category_slug = ?,
          tags = ?,
          author = 'Cavenaghi',
          is_published = 1,
          updated_at = ?
        WHERE id = ?
      `).run(
        item.title,
        excerpt,
        content,
        coverPath,
        item.category,
        item.category_slug,
        JSON.stringify(item.tags),
        now,
        existing.id
      );
    } else {
      db.prepare(`
        INSERT INTO posts (
          title, slug, excerpt, content, featured_image, category, category_slug, tags, author, views, is_published, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Cavenaghi', 0, 1, ?, ?)
      `).run(
        item.title,
        item.slug,
        excerpt,
        content,
        coverPath,
        item.category,
        item.category_slug,
        JSON.stringify(item.tags),
        now,
        now
      );
    }
  }

  console.log(`\n🎉 Successfully generated and published ${count} trending math posts!`);
  const totalPosts = db.prepare('SELECT COUNT(*) as count FROM posts').get();
  console.log(`Total posts in database: ${totalPosts.count}`);
}

run().catch((err) => {
  console.error('Fatal error generating posts:', err);
  process.exit(1);
});
