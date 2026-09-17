# -*- coding: utf-8 -*-
"""9. Sınıf Matematik 2. Tema: Nicelikler ve Değişimler (21 Sayfa Tam Veri Seti)"""

TEMA_2_PAGES = [
  {
    "page": 90,
    "tema": "2. Tema: Nicelikler ve Değişimler",
    "topic": "Ön Değerlendirme",
    "type": "Ön Değerlendirme",
    "intro": "9. sınıf matematik 2. tema 'Nicelikler ve Değişimler' ünitesi öncesinde yer alan Ön Değerlendirme bölümünde; doğrusal ilişki içeren gerçek yaşam durumları, koordinat düzlemi, eğim kavramı ve basit fonksiyon bağıntıları yer almaktadır.",
    "questions": [
      {
        "num": 1,
        "title": "Soru 1: Gerçek Yaşamda Doğrusal İlişkiler",
        "text": "Aşağıdaki durumların hangilerinde doğrusal bir ilişki olduğunu açıklayınız:\n• Sabit hızla yürüyen bir kişinin zamana bağlı aldığı yol\n• Bir mumun zamana bağlı eriyen boyu\n• Dairenin yarıçapına bağlı alanı",
        "solution": "<p><strong>• Sabit Hızla Yol Alma:</strong> Yol = Hız × Zaman (x = v·t). Hız sabit olduğundan yol ile zaman arasında <strong>doğrusal ilişki vardır</strong> (değişim oranı sabittir).</p><p><strong>• Mumun Boyu:</strong> Sabit hızla eriyen bir mumun boyu Boy(t) = h0 - k·t şeklinde birinci dereceden bir polinomdur. Dolayısıyla <strong>doğrusal bir ilişkidir</strong>.</p><p><strong>• Dairenin Alanı:</strong> Alan = π·r^2 dir. Yarıçapın karesiyle orantılı olduğundan doğrusal değil, <strong>karesel (ikinci dereceden) ilişkidir</strong>.</p>",
        "answer": "Yol-zaman ve mum boyu doğrusal; daire alanı doğrusal değildir."
      },
      {
        "num": 2,
        "title": "Soru 2: Koordinat Düzleminde Eğim Hesabı",
        "text": "A(2, 5) ve B(6, 13) noktalarından geçen doğrunun eğimini bulunuz.",
        "solution": "<p>Eğim formülü: m = (y2 - y1) / (x2 - x1)<br>m = (13 - 5) / (6 - 2) = 8 / 4 = <strong>2</strong> bulunur.</p>",
        "answer": "m = 2"
      }
    ]
  },
  {
    "page": 106,
    "tema": "2. Tema: Nicelikler ve Değişimler",
    "topic": "2.1. Doğrusal Fonksiyonlar ve Nitel Özellikleri",
    "type": "1. Sıra Sizde",
    "intro": "Sayfa 106'da referans fonksiyonu f(x) = x üzerinden g(x) = x + 2 ve h(x) = x - 2 fonksiyonlarının ötelenmesi, eğimleri, sıfırları, artan-azalanlık ve bire-birlik incelemesi yer almaktadır.",
    "questions": [
      {
        "num": 1,
        "title": "1. Sıra Sizde: g(x) = x + 2 ve h(x) = x - 2 Fonksiyon Analizi",
        "text": "g(x) = x + 2 ve h(x) = x - 2 fonksiyonları için:\na) Grafiklerini çiziniz.\nb) Eğimlerini karşılaştırınız.\nc) Maksimum, minimum, sıfırlarını ve y-kesişimlerini bulunuz.\nç) Artan/azalanlık aralıklarını belirleyiniz.\nd) Bire bir olup olmadıklarını inceleyiniz.",
        "solution": "<p><strong>a) Grafikler:</strong> f(x) = x doğrusu 2 birim yukarı ötelenerek g(x), 2 birim aşağı ötelenerek h(x) grafiği elde edilir.</p><p><strong>b) Eğimler:</strong> m_f = 1, m_g = 1, m_h = 1 dir. Eğimleri eşit olduğundan üç doğru birbirine paraleldir.</p><p><strong>c) Nitel Noktalar:</strong> Tanım kümesi R olduğundan yerel/mutlak max ve min noktaları yoktur. Sıfırları: g(x) = 0 ⇒ x = -2 (kesişim: (-2, 0)); h(x) = 0 ⇒ x = 2 (kesişim: (2, 0)). y-eksenini kesim: g(0) = 2 ⇒ (0, 2); h(0) = -2 ⇒ (0, -2).</p><p><strong>ç) Artan/Azalanlık:</strong> Eğim m = 1 > 0 olduğundan her iki fonksiyon tüm gerçek sayılarda (R) <strong>daima artandır</strong>.</p><p><strong>d) Bire Birlik:</strong> Her x1 ≠ x2 için x1 + 2 ≠ x2 + 2 dir (yatay doğru testi tek noktada keser). Dolayısıyla her iki fonksiyon da <strong>bire birdir</strong>.</p>",
        "answer": "Eğimler eşit (m=1), paralel; sıfırlar: g için -2, h için 2; R'de daima artan ve bire bir."
      }
    ]
  },
  {
    "page": 109,
    "tema": "2. Tema: Nicelikler ve Değişimler",
    "topic": "2.1. Doğrusal Fonksiyonlar ve Nitel Özellikleri",
    "type": "2. Sıra Sizde",
    "intro": "Sayfa 109'da sıfır atık projesi bağlamında ofiste plastik şişe kullanımının azaltılması, su sebili kullanımı ve değişim oranının doğrusal modellenmesi işlenmektedir.",
    "questions": [
      {
        "num": 1,
        "title": "2. Sıra Sizde: Sıfır Atık ve Doğrusal Değişim Modeli",
        "text": "Bir ofiste çalışanlar su arıtma sebili kullanarak günde ortalama 45 adet plastik şişe kullanımını önlemektedir. x günde engellenen plastik şişe sayısını veren fonksiyonu ve değişim oranını bulunuz.",
        "solution": "<p><strong>Fonksiyon:</strong> f(x) = 45x (Burada x gün sayısı, f(x) engellenen plastik şişe sayısıdır).<br><strong>Değişim Oranı (Eğim):</strong> Gün başına sabit <strong>45 adet/gün</strong>dür.<br>Örneğin 30 günde: f(30) = 45 × 30 = 1350 adet plastik şişe doğaya atılmaktan kurtarılır.</p>",
        "answer": "f(x) = 45x &emsp; Değişim Oranı: 45 adet/gün"
      }
    ]
  },
  {
    "page": 110,
    "tema": "2. Tema: Nicelikler ve Değişimler",
    "topic": "2.1. Doğrusal Fonksiyonlar ve Nitel Özellikleri",
    "type": "3. Sıra Sizde",
    "intro": "Sayfa 110'da sabit fonksiyon g(x) = k (k ∈ R) kavramı, grafiğin x eksenine paralelliği ve nitel özellikleri incelenmektedir.",
    "questions": [
      {
        "num": 1,
        "title": "3. Sıra Sizde: Sabit Fonksiyon g(x) = k Özellikleri",
        "text": "Gerçek sayılarda tanımlı g(x) = k (k ∈ R) sabit fonksiyonunun eğimini, artan-azalanlık durumunu ve bire-birlik özelliğini açıklayınız.",
        "solution": "<p>• <strong>Eğim:</strong> y değerleri değişmediğinden Δy = 0 dır. Eğim m = 0 / Δx = <strong>0</strong> dır. Grafik x-eksenine paralel bir doğrudur.</p><p>• <strong>Artan/Azalanlık:</strong> Değerler ne artar ne de azalır. Sabit fonksiyondur.</p><p>• <strong>Bire Birlik:</strong> Farklı x değerleri (örneğin x=1 ve x=2) aynı k sonucunu verir: g(1) = g(2) = k. Yatay doğru testi sonsuz noktada kesişir. Dolayısıyla <strong>bire bir DEĞİLDİR</strong>.</p>",
        "answer": "Eğim: 0, ne artan ne azalan (sabit), bire bir değildir."
      }
    ]
  },
  {
    "page": 114,
    "tema": "2. Tema: Nicelikler ve Değişimler",
    "topic": "2.1. Doğrusal Fonksiyonlar ve Nitel Özellikleri",
    "type": "4. Sıra Sizde",
    "intro": "Sayfa 114'te un fabrikası buğday stoğunun 12 günlük hedefe göre zamana bağlı doğrusal fonksiyon grafiği ve parçalı doğrusal analizi yer almaktadır.",
    "questions": [
      {
        "num": 1,
        "title": "4. Sıra Sizde: Un Fabrikası Buğday Stoğu Analizi",
        "text": "Depoda 200 ton buğday varken alım yapılarak 12. gün sonunda 1800 tona ulaşılmıştır. Fonksiyon tek bir cebirsel kural ile ifade edilebilir mi? Gün başına depodaki buğday miktarını bulunuz.",
        "solution": "<p><strong>a)</strong> Grafik doğrusal parçalardan oluşmakla birlikte farklı gün aralıklarında alım hızı farklılık gösterebileceğinden genel olarak parçalı doğrusal fonksiyonla ifade edilir. Ancak başlangıç ve bitiş doğrusal kabul edilirse tek bir kural yazılabilir.</p><p><strong>b) Gün Başına Artış (Ortalama Değişim Hızı):</strong><br>Başlangıç (0. gün): 200 ton<br>Bitiş (12. gün): 1800 ton<br>Toplam artış = 1800 - 200 = 1600 ton<br>Değişim hızı = 1600 / 12 = <strong>400 / 3 ≈ 133,33 ton/gün</strong> buğday alınmıştır.</p>",
        "answer": "Günlük ortalama artış hızı: 400/3 ≈ 133,33 ton/gün"
      }
    ]
  },
  {
    "page": 116,
    "tema": "2. Tema: Nicelikler ve Değişimler",
    "topic": "2.1. Doğrusal Fonksiyonlar ve Nitel Özellikleri",
    "type": "Alıştırmalar",
    "intro": "Sayfa 116'da doğrusal fonksiyonların cebirsel gösterimleri, eksenleri kestiği noktalar, eğimleri ve artan-azalanlık aralıkları alıştırmaları yer almaktadır.",
    "questions": [
      {
        "num": 1,
        "title": "Soru 1: Doğrusal Fonksiyon Eksen Kesişimleri ve Eğim",
        "text": "f: R → R, f(x) = -2x + 6 fonksiyonunun eğimini, eksenleri kestiği noktaları ve artan/azalanlık durumunu bulunuz.",
        "solution": "<p>• <strong>Eğim:</strong> x'in katsayısı m = <strong>-2</strong> dir.<br>• <strong>y-kesişimi:</strong> x = 0 için y = -2(0) + 6 = 6 ⇒ <strong>(0, 6)</strong><br>• <strong>x-kesişimi (Sıfırı):</strong> y = 0 ⇒ -2x + 6 = 0 ⇒ 2x = 6 ⇒ x = 3 ⇒ <strong>(3, 0)</strong><br>• <strong>Artan/Azalanlık:</strong> Eğim m = -2 < 0 olduğundan fonksiyon tüm gerçek sayılarda <strong>daima azalandır</strong>.</p>",
        "answer": "Eğim: -2; y-kesişimi: (0, 6); x-kesişimi: (3, 0); R'de daima azalandır."
      }
    ]
  },
  {
    "page": 117,
    "tema": "2. Tema: Nicelikler ve Değişimler",
    "topic": "2.1. Doğrusal Fonksiyonlar ve Nitel Özellikleri",
    "type": "Alıştırmalar (Devam)",
    "intro": "Sayfa 117'de sıvı temizlik maddesi üreten şirketin günlük sabit ve birim üretim maliyeti üzerinden başabaş noktası ve kâr-zarar analizi yer almaktadır.",
    "questions": [
      {
        "num": 3,
        "title": "Soru 3: Sıvı Temizlik Maddesi Maliyet ve Gelir Analizi",
        "text": "Şirketin günlük sabit maliyeti 4000 TL, litre başına üretim maliyeti 15 TL'dir. Litresi 25 TL'den satıldığına göre başabaş noktası kaç litredir?",
        "solution": "<p>• Maliyet Fonksiyonu: M(x) = 4000 + 15x<br>• Gelir Fonksiyonu: G(x) = 25x<br>• Başabaş Noktası (Gelir = Maliyet):<br>25x = 4000 + 15x ⇒ 10x = 4000 ⇒ <strong>x = 400 litre</strong> satılmalıdır.<br>400 litreden sonraki her satışta litre başına (25 - 15 = 10 TL) kâr elde edilir.</p>",
        "answer": "Başabaş noktası: 400 litre (400 litreden sonra kâra geçilir)"
      }
    ]
  },
  {
    "page": 132,
    "tema": "2. Tema: Nicelikler ve Değişimler",
    "topic": "2.2. Mutlak Değer Fonksiyonu ve Nitel Özellikleri",
    "type": "5. Sıra Sizde",
    "intro": "Sayfa 132'de mutlak değer fonksiyonu grafiği, tepe (kırılma) noktası, artan/azalan aralıkları ve bire-birlik incelemesi yer almaktadır.",
    "questions": [
      {
        "num": 1,
        "title": "5. Sıra Sizde: f(x) = |x - 4| + 3 ve g(x) Fonksiyon Analizi",
        "text": "f(x) = |x - 4| + 3 ve g(x) = f(x + 3) için g fonksiyonunun görüntü kümesini, artan/azalan aralıklarını ve ekstremum değerlerini bulunuz.",
        "solution": "<p>g(x) = f(x + 3) = |(x + 3) - 4| + 3 = <strong>|x - 1| + 3</strong> tür.<br><strong>a) Görüntü Kümesi:</strong> |x - 1| ≥ 0 olduğundan g(x) ≥ 3 tür. Görüntü kümesi: <strong>[3, ∞)</strong>.<br><strong>b) Artan/Azalan Aralıklar:</strong> x = 1 kırılma noktasıdır. x ∈ (-∞, 1] aralığında <strong>azalan</strong>, x ∈ [1, ∞) aralığında <strong>artandır</strong>.<br><strong>c) Min/Max:</strong> Minimum noktası (1, 3) olup minimum değeri <strong>3</strong> tür. Maksimum değeri yoktur (sonsuza uzanır).</p>",
        "answer": "Görüntü kümesi: [3, ∞); Azalan: (-∞, 1]; Artan: [1, ∞); Minimum: 3 (x=1)"
      }
    ]
  },
  {
    "page": 135,
    "tema": "2. Tema: Nicelikler ve Değişimler",
    "topic": "2.2. Mutlak Değer Fonksiyonu ve Nitel Özellikleri",
    "type": "Alıştırmalar",
    "intro": "Sayfa 135'te elektrik devre elemanı olan dirençlerin nominal değer ve tolerans sınırlarının mutlak değerli fonksiyonlarla modellenmesi yer almaktadır.",
    "questions": [
      {
        "num": 1,
        "title": "Soru 1: Direnç Toleransı Mutlak Değer Modeli",
        "text": "Nominal değeri 220 Ω ve toleransı %10 olan bir direncin kabul edilebilir direnç aralığını mutlak değerli eşitsizlik olarak ifade ediniz.",
        "solution": "<p>Tolerans miktarı = 220 × 0,10 = 22 Ω dur.<br>Nominal değerden sapma en fazla 22 Ω olabilir:<br><strong>|R - 220| ≤ 22</strong><br>Aralık: 220 - 22 ≤ R ≤ 220 + 22 ⇒ <strong>[198, 242] Ω</strong></p>",
        "answer": "|R - 220| ≤ 22 (Aralık: [198, 242] Ω)"
      }
    ]
  },
  {
    "page": 150,
    "tema": "2. Tema: Nicelikler ve Değişimler",
    "topic": "2.3. Doğrusal Fonksiyon Problemleri",
    "type": "6. Sıra Sizde",
    "intro": "Sayfa 150'de spor ayakkabı üreten firmanın sabit maliyet, birim üretim maliyeti ve satış fiyatı üzerinden başabaş analizi yer almaktadır.",
    "questions": [
      {
        "num": 1,
        "title": "6. Sıra Sizde: Spor Ayakkabı Maliyet-Gelir Analizi",
        "text": "Kurulum maliyeti 200.000 TL, çift başına maliyet 1400 TL, satış fiyatı 1800 TL dir:\na) Maliyet fonksiyonu\nb) Gelir fonksiyonu\nc) Başabaş satış adedi\nç) Kâr etmek için gereken en az satış adedi",
        "solution": "<p><strong>a)</strong> Maliyet Fonksiyonu: <strong>M(x) = 200.000 + 1400x</strong></p><p><strong>b)</strong> Gelir Fonksiyonu: <strong>G(x) = 1800x</strong></p><p><strong>c)</strong> Başabaş Noktası (M(x) = G(x)):<br>200.000 + 1400x = 1800x ⇒ 400x = 200.000 ⇒ <strong>x = 500 çift</strong>.</p><p><strong>ç)</strong> Kâr için G(x) > M(x) olmalıdır:<br>x > 500 ⇒ En az <strong>501 çift</strong> ayakkabı satılmalıdır.</p>",
        "answer": "a) M(x)=200.000+1400x &emsp; b) G(x)=1800x &emsp; c) 500 çift &emsp; ç) En az 501 çift"
      }
    ]
  },
  {
    "page": 159,
    "tema": "2. Tema: Nicelikler ve Değişimler",
    "topic": "2.3. Doğrusal Fonksiyon Problemleri",
    "type": "Alıştırmalar",
    "intro": "Sayfa 159'da doğrusal fonksiyonlarla modellenen taksi ücreti, telefon tarifesi ve su tüketim maliyeti problemleri yer almaktadır.",
    "questions": [
      {
        "num": 1,
        "title": "Soru 1: Taksi Ücret Tarifesi",
        "text": "Taksici açılış ücreti olarak 30 TL ve gidilen her km için 12 TL almaktadır. x km yolculuk yapan müşterinin ödeyeceği ücreti veren fonksiyonu ve 15 km yol için ödenecek ücreti bulunuz.",
        "solution": "<p>• Ücret Fonksiyonu: <strong>f(x) = 30 + 12x</strong><br>• 15 km yol için: f(15) = 30 + 12 × 15 = 30 + 180 = <strong>210 TL</strong> ödenir.</p>",
        "answer": "f(x) = 30 + 12x &emsp; 15 km için: 210 TL"
      },
      {
        "num": 2,
        "title": "Soru 2: İki Tarife Karşılaştırması",
        "text": "Tarife 1: 50 TL sabit + 5 TL/saat. Tarife 2: Sabit ücret yok, 10 TL/saat. Kaçıncı saatten sonra Tarife 1 daha ekonomiktir?",
        "solution": "<p>Tarife 1 < Tarife 2 ⇒ 50 + 5t < 10t ⇒ 5t > 50 ⇒ <strong>t > 10 saat</strong>.<br>10 saatten sonra 1. tarife daha ekonomiktir.</p>",
        "answer": "10 saatten sonra"
      }
    ]
  },
  {
    "page": 160,
    "tema": "2. Tema: Nicelikler ve Değişimler",
    "topic": "2.3. Doğrusal Fonksiyon Problemleri",
    "type": "Alıştırmalar (Devam)",
    "intro": "Sayfa 160'ta Doruk'un evden okula yürüyüşünde zamana bağlı kalan mesafe fonksiyonu ve hız-zaman analizi alıştırmaları yer almaktadır.",
    "questions": [
      {
        "num": 7,
        "title": "Soru 7: Doruk'un Okul Yolu Doğrusal Modeli",
        "text": "Doruk saat 08.00'de evden çıkıp 1,2 km (1200 m) uzaklıktaki okuluna 16 dakikada sabit hızla yürüyor. t dakikaya bağlı kalan mesafeyi (metre) modelleyiniz.",
        "solution": "<p>• Doruk'un yürüme hızı: v = 1200 m / 16 dk = <strong>75 m/dk</strong> dır.<br>• Başlangıçta kalan yol 1200 m dir. Her dakika 75 m azalır:<br><strong>k(t) = 1200 - 75t</strong> (0 ≤ t ≤ 16)<br>Örneğin 8. dakikada: k(8) = 1200 - 75×8 = 1200 - 600 = 600 metre yolu kalır.</p>",
        "answer": "k(t) = 1200 - 75t (0 ≤ t ≤ 16 dk)"
      }
    ]
  },
  {
    "page": 161,
    "tema": "2. Tema: Nicelikler ve Değişimler",
    "topic": "2. Tema Ölçme ve Değerlendirme",
    "type": "Ölçme ve Değerlendirme (1-2. Sorular)",
    "intro": "2. Tema Ölçme ve Değerlendirme testinin ilk sayfasında silindir su tankının dolum ve boşalım hızları doğrusal fonksiyonlarla modellenmektedir.",
    "questions": [
      {
        "num": 1,
        "title": "Soru 1: Su Tankı Dolum Fonksiyonu",
        "text": "Yüksekliği 200 cm olan boş su tankına dakikada 5 cm su doldurulmaktadır. Su yüksekliğinin zamana (dakika) bağlı fonksiyonunu ve dolma süresini bulunuz.",
        "solution": "<p>• Yükseklik fonksiyonu: <strong>h(t) = 5t</strong> (cm)<br>• Deponun dolması: 5t = 200 ⇒ <strong>t = 40 dakika</strong>da depo tamamen dolar.</p>",
        "answer": "h(t) = 5t &emsp; Dolma süresi: 40 dakika"
      },
      {
        "num": 2,
        "title": "Soru 2: Eşzamanlı Dolum ve Boşalım",
        "text": "Depo dolarken aynı anda alttaki musluktan dakikada 2 cm su boşalırsa tank kaç dakikada dolar?",
        "solution": "<p>Net dolum hızı = 5 - 2 = 3 cm/dk dır.<br>Net yükseklik: h(t) = 3t.<br>3t = 200 ⇒ t = 200 / 3 = <strong>66,67 dakika (66 dakika 40 saniye)</strong>de dolar.</p>",
        "answer": "200/3 dk ≈ 66,67 dakika"
      }
    ]
  },
  {
    "page": 162,
    "tema": "2. Tema: Nicelikler ve Değişimler",
    "topic": "2. Tema Ölçme ve Değerlendirme",
    "type": "Ölçme ve Değerlendirme (3-5. Sorular)",
    "intro": "Sayfa 162'de baraj su depolama kapasitesi ve kuraklık-yağış periyotlarında doğrusal su miktarı değişimleri incelenmektedir.",
    "questions": [
      {
        "num": 3,
        "title": "Soru 3: Baraj Doluluk Oranı Değişimi",
        "text": "100 milyon m^3 kapasiteli barajda ilkbaharda 60 milyon m^3 su vardır. Yazın ayda 8 milyon m^3 azalırsa su miktarı fonksiyonunu yazınız.",
        "solution": "<p>Fonksiyon: <strong>V(t) = 60 - 8t</strong> (milyon m^3, t ay cinsinden).<br>Örneğin 3 ay sonra: V(3) = 60 - 24 = 36 milyon m^3 su kalır.</p>",
        "answer": "V(t) = 60 - 8t"
      },
      {
        "num": 4,
        "title": "Soru 4: Kritik Su Eşiği",
        "text": "Barajdaki suyun 20 milyon m^3 kritik eşiğine kaç ay sonra ulaşacağını bulunuz.",
        "solution": "<p>60 - 8t = 20 ⇒ 8t = 40 ⇒ <strong>t = 5 ay</strong> sonra kritik seviyeye iner.</p>",
        "answer": "5 ay sonra"
      }
    ]
  },
  {
    "page": 163,
    "tema": "2. Tema: Nicelikler ve Değişimler",
    "topic": "2. Tema Ölçme ve Değerlendirme",
    "type": "Ölçme ve Değerlendirme (6-8. Sorular)",
    "intro": "Sayfa 163'te güneş paneli enerji üretimi (kWh) zamana bağlı grafiği ve mevsimsel değişim oranları incelenmektedir.",
    "questions": [
      {
        "num": 6,
        "title": "Soru 6: Güneş Paneli Aylık Üretim Artışı",
        "text": "Ocak ayında 400 kWh olan üretim Haziran ayında 1400 kWh'e yükselmiştir. Aylık ortalama artış hızını bulunuz.",
        "solution": "<p>Zaman farkı: Haziran (6. ay) - Ocak (1. ay) = 5 ay.<br>Üretim artışı = 1400 - 400 = 1000 kWh.<br>Aylık artış hızı = 1000 / 5 = <strong>200 kWh/ay</strong>dır.</p>",
        "answer": "200 kWh/ay"
      },
      {
        "num": 7,
        "title": "Soru 7: 4. Ay Üretim Tahmini",
        "text": "Doğrusal modele göre Nisan (4. ay) üretim miktarını hesaplayınız.",
        "solution": "<p>Ü(t) = 400 + 200(t - 1). t = 4 için:<br>Ü(4) = 400 + 200 × 3 = 400 + 600 = <strong>1000 kWh</strong> dir.</p>",
        "answer": "1000 kWh"
      }
    ]
  },
  {
    "page": 164,
    "tema": "2. Tema: Nicelikler ve Değişimler",
    "topic": "2. Tema Ölçme ve Değerlendirme",
    "type": "Ölçme ve Değerlendirme (9-10. Sorular)",
    "intro": "Sayfa 164'te aralarında 36 m bulunan Ayhan ve Bilge'nin doğrusal hareketleri ve mutlak değerli aralarındaki mesafe modeli işlenmektedir.",
    "questions": [
      {
        "num": 9,
        "title": "Soru 9: Ayhan ve Bilge Buluşma Süresi",
        "text": "Aralarında 36 m mesafe olan Ayhan (2 m/s) ve Bilge (1 m/s) birbirine doğru aynı anda yürümeye başlıyor. Kaç saniye sonra karşılaşırlar?",
        "solution": "<p>Birbirlerine yaklaşma hızları = v1 + v2 = 2 + 1 = 3 m/s.<br>Buluşma süresi: t = 36 / 3 = <strong>12 saniye</strong>dir.</p>",
        "answer": "12 saniye sonra"
      },
      {
        "num": 10,
        "title": "Soru 10: Aralarındaki Mesafe Fonksiyonu",
        "text": "Hareket başladıktan sonraki t saniyede aralarındaki mesafeyi veren fonksiyonu yazınız.",
        "solution": "<p>Aralarındaki mesafe mutlak değerle modellenir:<br><strong>d(t) = |36 - 3t|</strong> (metre)<br>t = 12 sn'de d(12) = 0 olur; t > 12 sn'de birbirlerini geçip uzaklaşırlar.</p>",
        "answer": "d(t) = |36 - 3t|"
      }
    ]
  },
  {
    "page": 165,
    "tema": "2. Tema: Nicelikler ve Değişimler",
    "topic": "2. Tema Ölçme ve Değerlendirme",
    "type": "Ölçme ve Değerlendirme (11-12. Sorular)",
    "intro": "Sayfa 165'te iktisat biliminde piyasa denge fiyatı, talep fonksiyonu ve arz fonksiyonu kesişim noktaları incelenmektedir.",
    "questions": [
      {
        "num": 11,
        "title": "Soru 11: Piyasa Denge Fiyatı",
        "text": "Talep fonksiyonu T(p) = 120 - 4p ve Arz fonksiyonu A(p) = 20 + 6p olduğuna göre piyasa denge fiyatını bulunuz.",
        "solution": "<p>Piyasa dengesinde Arz = Talep olur:<br>120 - 4p = 20 + 6p ⇒ 10p = 100 ⇒ <strong>p = 10 TL</strong> (Denge Fiyatı).</p>",
        "answer": "p = 10 TL"
      },
      {
        "num": 12,
        "title": "Soru 12: Denge Miktarı",
        "text": "Denge fiyatında piyasada alınıp satılan ürün miktarını bulunuz.",
        "solution": "<p>p = 10 değerini fonksiyonlardan birinde yazalım:<br>T(10) = 120 - 4(10) = 120 - 40 = <strong>80 adet</strong> ürün işlem görür.</p>",
        "answer": "80 adet"
      }
    ]
  },
  {
    "page": 166,
    "tema": "2. Tema: Nicelikler ve Değişimler",
    "topic": "2. Tema Ölçme ve Değerlendirme",
    "type": "Ölçme ve Değerlendirme (13-15. Sorular)",
    "intro": "Sayfa 166'da fotokopi makinesi kiralama alternatifleri üzerinden sabit ve birim maliyet optimizasyonu yer almaktadır.",
    "questions": [
      {
        "num": 13,
        "title": "Soru 13: Fotokopi Makinesi Maliyet Eşitliği",
        "text": "A makinesi: 1200 TL sabit + 0,25 TL/sayfa. B makinesi: 600 TL sabit + 0,45 TL/sayfa. Kaç sayfa çekildiğinde iki makinenin toplam maliyeti eşit olur?",
        "solution": "<p>1200 + 0,25x = 600 + 0,45x ⇒ 0,20x = 600 ⇒ <strong>x = 3000 sayfa</strong>.</p>",
        "answer": "3000 sayfa"
      },
      {
        "num": 14,
        "title": "Soru 14: Yoğun Kullanım Tercihi",
        "text": "Ayda 5000 sayfa fotokopi çeken bir kırtasiye hangi makineyi tercih etmelidir?",
        "solution": "<p>• A Makinesi: 1200 + 0,25 × 5000 = 1200 + 1250 = 2450 TL<br>• B Makinesi: 600 + 0,45 × 5000 = 600 + 2250 = 2850 TL<br>A makinesi (2450 < 2850) 400 TL daha ekonomiktir. <strong>A makinesi</strong> tercih edilmelidir.</p>",
        "answer": "A makinesi (400 TL tasarruf sağlar)"
      }
    ]
  },
  {
    "page": 167,
    "tema": "2. Tema: Nicelikler ve Değişimler",
    "topic": "2. Tema Ölçme ve Değerlendirme",
    "type": "Ölçme ve Değerlendirme (16-17. Sorular)",
    "intro": "Sayfa 167'de internet tarifeleri kota aşımı ve parça başı ücret fonksiyonlarının karşılaştırılması yer almaktadır.",
    "questions": [
      {
        "num": 16,
        "title": "Soru 16: İnternet Tarifesi Kota Aşım Analizi",
        "text": "50 GB kotalı pakette kota aşımında her ek GB için 15 TL alınmaktadır. x GB (x > 50) internet kullanan abonenin faturasını modelleyiniz.",
        "solution": "<p>Sabit ücret 180 TL olsun:<br><strong>F(x) = 180 + 15(x - 50)</strong> (x > 50 için)</p>",
        "answer": "F(x) = 180 + 15(x - 50)"
      }
    ]
  },
  {
    "page": 168,
    "tema": "2. Tema: Nicelikler ve Değişimler",
    "topic": "2. Tema Ölçme ve Değerlendirme",
    "type": "Ölçme ve Değerlendirme (18-19. Sorular)",
    "intro": "Sayfa 168'de kayak merkezi telesiyej ve teleferik kart sisteminde biniş başı ve sınırsız kart modelleri incelenmektedir.",
    "questions": [
      {
        "num": 18,
        "title": "Soru 18: Telesiyej Bilet Tercihi",
        "text": "Sınırsız günlük kart 650 TL, tek binişlik bilet 60 TL dir. Bir günde en az kaç biniş yapan kayakçı için sınırsız kart daha ekonomiktir?",
        "solution": "<p>60n > 650 ⇒ n > 650 / 60 ≈ 10,83.<br>En az <strong>11 biniş</strong> yapacak olan kayakçı için sınırsız kart daha avantajlıdır.</p>",
        "answer": "En az 11 biniş"
      }
    ]
  },
  {
    "page": 169,
    "tema": "2. Tema: Nicelikler ve Değişimler",
    "topic": "2. Tema Ölçme ve Değerlendirme",
    "type": "Ölçme ve Değerlendirme (20-21. Sorular)",
    "intro": "Sayfa 169'da otoyol haritası üzerinde sayı doğrusu koordinatları ve mutlak değerli mesafe optimizasyonu soruları yer almaktadır.",
    "questions": [
      {
        "num": 20,
        "title": "Soru 20: Sayı Doğrusunda Mesafe ve Benzinlik Konumu",
        "text": "A(-20) ve B(80) km noktalarındaki iki kasabanın tam ortasına kurulacak dinlenme tesisinin konumunu bulunuz.",
        "solution": "<p>Orta nokta formülü: x_orta = (xA + xB) / 2 = (-20 + 80) / 2 = 60 / 2 = <strong>30. km</strong> noktasıdır.</p>",
        "answer": "30. km noktası"
      },
      {
        "num": 21,
        "title": "Soru 21: Toplam Mesafe Eşitliği",
        "text": "Bir aracın A ve B noktalarına uzaklıkları toplamı en fazla 120 km olan noktaların aralığını mutlak değerle ifade ediniz.",
        "solution": "<p>Orta nokta 30 km olduğuna göre |x - 30| ≤ 60 aralığıdır:<br>-60 ≤ x - 30 ≤ 60 ⇒ <strong>-30 ≤ x ≤ 90 km</strong> aralığındaki noktalardır.</p>",
        "answer": "|x - 30| ≤ 60 ([-30, 90] km)"
      }
    ]
  }
]
