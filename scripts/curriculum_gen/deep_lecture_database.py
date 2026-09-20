# -*- coding: utf-8 -*-
"""
Teacher-grade, classroom-style detailed lecture notes covering all remaining topics.
Each topic includes teacher notes, core concepts, formula cards, exam tips, common mistakes, and 3 fully solved model examples.
"""

DEEP_LECTURE_DB = {
    # 2. Sınıf Matematik: İki Basamaklı Doğal Sayılar ve Eldeli Toplama
    "2-sinif-matematik-iki-basamakli-dogal-sayilar-ve-eldeli-toplama-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🏫 <strong>Öğretmenimizin Dersi:</strong> Sevgili öğrenciler, iki basamaklı sayıları toplarken birler basamağındaki birlikler 10 veya daha fazla olduğunda harika bir kural devreye girer: "Eldeli Toplama"! Bu derste eldeyi komşuya (onlar basamağına) nasıl devrettiğimizi eğlenceli adımlarla öğreniyoruz.
        </div>
        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Eldeli Toplama İşleminin Adımları</h3>
        <p>İki basamaklı sayıları alt alta toplarken her zaman <strong>en sağdan, yani BİRLER BASAMAĞINDAN</strong> başlarız:</p>
        <ol class="list-decimal pl-5 text-xs sm:text-sm space-y-2">
            <li><strong>1. Adım (Birlikleri Topla):</strong> Birler basamağındaki rakamları topla. Eğer toplam 10'dan küçükse (0-9) doğrudan birler basamağının altına yaz.</li>
            <li><strong>2. Adım (Elde Oluşumu):</strong> Eğer toplam 10 veya daha büyükse (Örn: 7 + 8 = 15), birler basamağındaki rakamı (5) sonuca yaz, onluğu (1) <strong>"Elde 1"</strong> olarak aklında tut veya komşunun tepesine yaz!</li>
            <li><strong>3. Adım (Onlukları Topla):</strong> Onlar basamağındaki rakamları topla ve en son eldeki 1 onluğu da bu toplama mutlaka EKLE!</li>
        </ol>
        <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-semibold">
            ⭐ <strong>Örnek İşlem (38 + 27):</strong> <br>
            • Birlikler: 8 + 7 = 15 &rarr; 5'i yaz, elde var 1 onluk. <br>
            • Onluklar: 3 + 2 = 5 &rarr; Eldeki 1'i ekle: 5 + 1 = 6. <br>
            • Sonuç: <strong>65</strong> bulunur.
        </div>
        <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 font-bold text-xs sm:text-sm">
            ⚠️ EN ÇOK YAPILAN HATA: Onlar basamağını toplarken eldeki 1'i eklemeyi unutmak! Eldeyi mutlaka küçük bir daire içine not ediniz.
        </div>
    </div>
    """,

    # 3. Sınıf Matematik: Üç Basamaklı Sayılar, Çarpma ve Kalanlı Bölme
    "3-sinif-matematik-uc-basamakli-sayilar-carpma-ve-kalanli-bolme-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🏫 <strong>Öğretmenimizin Dersi:</strong> 3. sınıfta üç basamaklı sayıların dünyasına (Yüzler Basamağı) adım atıyoruz. Eldeli çarpma kuralları ve en kritik bölme kuralı olan "Kalan daima Bölenden küçüktür" prensibini bu derste eksiksiz öğreniyoruz!
        </div>
        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Üç Basamaklı Sayıların Basamak Değerleri</h3>
        <p>Üç basamaklı bir sayı Yüzler, Onlar ve Birler basamağından oluşur. Örneğin <strong>483</strong> sayısı: 4 Yüzlük (400) + 8 Onluk (80) + 3 Birlik (3) = 400 + 80 + 3 = 483.</p>
        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">2. Kalanlı Bölme İşlemi ve Sağlama Bağıntısı</h3>
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 font-mono text-center font-bold text-indigo-950 text-sm sm:text-base">
            Bölünen = (Bölen × Bölüm) + Kalan &emsp;&emsp; [Şart: Kalan &lt; Bölen]
        </div>
        <p class="text-xs text-slate-600 mt-2"><strong>Altın Kural:</strong> Bir bölme işleminde kalan sayı hiçbir zaman bölen sayıya eşit veya ondan büyük olamaz! Bölen 6 ise kalan en fazla 5 olabilir (0, 1, 2, 3, 4, 5).</p>
    </div>
    """,

    # 3. Sınıf Matematik: Kesirler (Birim Kesir ve Çeşitleri)
    "3-sinif-matematik-kesirler-birim-kesir-ve-cesitleri-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🏫 <strong>Öğretmenimizin Dersi:</strong> Kesirler bir bütünü eşit parçalara bölüp bu parçalardan bir veya birkaçını almaktır. Birim kesir kavramını, basit, bileşik ve tam sayılı kesir çeşitlerini modelleyerek öğrenelim!
        </div>
        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Birim Kesir Nedir?</h3>
        <p>Bir bütünün eş parçalarından yalnızca <strong>BİR TANESİNİ</strong> gösteren kesre <strong>birim kesir</strong> denir. Birim kesirlerin payı daima <strong>1</strong>'dir (Örn: 1/2 [yarım], 1/4 [çeyrek], 1/6, 1/10).</p>
        <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm">
            💡 <strong>Birim Kesirleri Sıralama Kuralı:</strong> Paydası küçük olan birim kesir DAİMA DAHA BÜYÜKTÜR! Çünkü bir pastayı 2 parçaya bölerseniz her parça kocaman olur (1/2), 8 parçaya bölerseniz dilimler küçülür (1/8). Dolayısıyla: <code>1/2 &gt; 1/4 &gt; 1/8</code>.
        </div>
    </div>
    """,

    # 3. Sınıf Fen Bilimleri: Gezegenimizi Tanıyalım ve Beş Duyumuz
    "3-sinif-fen-bilimleri-gezegenimizi-taniyalim-ve-bes-duyumuz-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-medium">
            🌍 <strong>Öğretmenimizin Dersi:</strong> Üzerinde yaşadığımız mavi gezegen Dünya'nın iç içe geçmiş katmanlarını ve dünyayı algılamamızı sağlayan 5 harika duyu organımızı inceliyoruz!
        </div>
        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Dünya'mızın Katmanları</h3>
        <ul class="list-disc pl-5 text-xs sm:text-sm space-y-1">
            <li><strong>İç Katmanlar:</strong> Çekirdek (Ağır küre - en sıcak katman), Manto (Ateş küre - lavların bulunduğu katman), Yer Kabuğu (Taş küre - canlıların üzerinde yaşadığı sert katman).</li>
            <li><strong>Dış Katmanlar:</strong> Su Katmanı (Okyanuslar, denizler, göller - Dünya'nın 3/4'ü) ve Hava Katmanı (Atmosfer - soluduğumuz hava).</li>
        </ul>
        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">2. Beş Duyu Organımız ve Görevleri</h3>
        <p>Göz (Görme), Kulak (İşitme), Burun (Koklama), Dil (Tat alma) ve Deri (Dokunma/Hissetme). Duyu organlarımızın hepsi beynimizle koordineli çalışarak çevremizi algılamamızı sağlar.</p>
    </div>
    """,

    # 4. Sınıf Matematik: Dört İşlem & Zihinden İşlemler
    "4-sinif-matematik-dogal-sayilarla-dort-islem-ve-zihinden-islemler-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🏫 <strong>Öğretmenimizin Dersi:</strong> 4. sınıfta 4, 5 ve 6 basamaklı büyük doğal sayılarla çalışıyoruz. Binler bölüğü, zihinden işlem stratejileri ve tahmin yöntemlerini bu derste ustalıkla uygulayacaksınız!
        </div>
        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Zihinden Çarpma ve Bölme Stratejileri</h3>
        <ul class="list-disc pl-5 text-xs sm:text-sm space-y-1">
            <li><strong>10, 100, 1000 ile Çarpma:</strong> Sayının sağına sırasıyla bir, iki veya üç tane sıfır (0) eklenir (Örn: 48 × 100 = 4.800).</li>
            <li><strong>10, 100, 1000 ile Bölme:</strong> Sayının sonundaki sıfırlardan sırasıyla bir, iki veya üç tane silinir (Örn: 7.500 ÷ 100 = 75).</li>
            <li><strong>5 ile Çarpmada Pratik Kısayol:</strong> Sayıyı önce 10 ile çarp, sonra 2'ye böl! (Örn: 24 × 5 &rarr; 24 × 10 = 240, 240 / 2 = 120).</li>
        </ul>
    </div>
    """,

    # 4. Sınıf Fen: Yer Kabuğu ve Besinlerimiz
    "4-sinif-fen-bilimleri-yer-kabugu-kayaclar-ve-besinlerimiz-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-medium">
            🌱 <strong>Öğretmenimizin Dersi:</strong> Madenler, fosiller, yer kabuğunun zenginlikleri ve sağlıklı yaşamın temeli olan 5 temel besin içeriğini bu derste öğreniyoruz!
        </div>
        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Kayaçlar, Madenler ve Fosiller</h3>
        <p>Yer kabuğunu oluşturan kaya parçalarına <strong>kayaç</strong> denir. Ekonomik değeri olan kayaçlara <strong>maden</strong> denir (Altın, bor, demir, bakır, mermer, linyit). Milyonlarca yıl önce yaşamış canlı kalıntılarının taşlaşmış izlerine ise <strong>fosil</strong> adı verilir.</p>
        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">2. Besin İçerikleri ve Vücuttaki Görevleri</h3>
        <ul class="list-disc pl-5 text-xs sm:text-sm space-y-1">
            <li><strong>Karbonhidratlar:</strong> Vücudun 1. derece enerji kaynağıdır (Ekmek, makarna, pilav, patates).</li>
            <li><strong>Proteinler:</strong> Yapıcı ve onarıcıdır; büyüme, saç ve tırnak gelişimi, yaraların iyileşmesini sağlar (Et, süt, yumurta, balık, baklagiller).</li>
            <li><strong>Yağlar:</strong> Yedek enerji deposudur ve soğuğa karşı korur.</li>
            <li><strong>Vitaminler, Su ve Mineraller:</strong> Düzenleyicidir; bağışıklık sistemini güçlendirir ve hastalıklara karşı korur.</li>
        </ul>
    </div>
    """,

    # 5. Sınıf Matematik: Kesirlerle İşlemler
    "5-sinif-matematik-kesirler-ve-kesirlerle-islemler-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🏫 <strong>Öğretmenimizin Dersi:</strong> Kesirlerle toplama ve çıkarma yaparken "Paydalar Eşit Değilse Asla Toplayamazsın!" kuralı geçerlidir. Bu derste genişletme ve sadeleştirme ile payda eşitlemeyi öğreniyoruz!
        </div>
        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Kesirleri Genişletme ve Sadeleştirme (Denk Kesirler)</h3>
        <p>Bir kesrin pay ve paydası aynı sıfırdan farklı sayıyla çarpılırsa <strong>genişletilmiş</strong>, bölünürse <strong>sadeleştirilmiş</strong> olur. Kesrin değeri değişmez (Denk kesir kalır): <code>(2/3) × 4 = 8/12</code>.</p>
        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">2. Kesirlerle Toplama ve Çıkarma</h3>
        <p>Paydalar eşitlendikten sonra <strong>yalnızca paylar toplanır/çıkarılır</strong>; ortak payda aynen yazılır! Paydalar ASLA toplanmaz: <code>2/5 + 1/5 = 3/5</code> (Asla 3/10 etmez!).</p>
    </div>
    """,

    # 7. Sınıf Matematik: Rasyonel Sayılar
    "7-sinif-matematik-rasyonel-sayilar-ve-islemler-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🏫 <strong>Öğretmenimizin Dersi:</strong> Rasyonel sayılar kümesi (Q), tam sayılar kümesini de kapsayan geniş bir ailedir. Negatif kesirler, devirli ondalık sayılar ve merdivenli çok adımlı işlemleri bu derste adım adım çözüyoruz!
        </div>
        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Devirli Ondalık Açılımları Rasyonel Sayıya Çevirme</h3>
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 font-mono text-center font-bold text-indigo-950 text-xs sm:text-sm">
            Rasyonel Sayı = (Tüm Sayı - Devretmeyen Kısım) / (Virgülden sonra devreden kadar 9, devretmeyen kadar 0)
        </div>
        <p class="text-xs text-slate-600 mt-1">Örnek: <code>1,3̄ = (13 - 1) / 9 = 12/9 = 4/3</code> &emsp;|&emsp; <code>0,25̄ = (25 - 2) / 90 = 23/90</code></p>
    </div>
    """,

    # 8. Sınıf Fen: Mevsimler ve İklim & DNA
    "8-sinif-fen-bilimleri-mevsimler-ve-iklim-dna-ve-genetik-kod-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-medium">
            🧬 <strong>Öğretmenimizin Dersi:</strong> LGS Fen Bilimleri sınavının ilk iki ünitesi: Mevsimlerin oluşumu (eksen eğikliği) ve yaşamın yönetici molekülü DNA'nın yapısı. Her yıl en az 4-5 soru bu konulardan gelir!
        </div>
        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Mevsimlerin Oluşumunun 2 Temel Nedeni</h3>
        <ol class="list-decimal pl-5 text-xs sm:text-sm space-y-1 font-semibold text-slate-800">
            <li>Dünya'nın dönme ekseninin <strong>23° 27' (23 derece 27 dakika) eğik olması</strong>.</li>
            <li>Dünya'nın Güneş etrafında <strong>elips şeklinde dolanma hareketi</strong> yapması.</li>
        </ol>
        <p class="text-xs text-slate-600"><strong>Kritik Uyarı:</strong> Dünya'nın Güneş'e olan uzaklığının mevsimlerle HİÇBİR İLGİSİ YOKTUR! Dünya Güneş'e en yakın olduğu 3 Ocak tarihinde Kuzey Yarım Küre kış mevsimini yaşar.</p>
        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">2. DNA ve Nükleotid Eşleşmesi</h3>
        <p>DNA çift zincirli sarmal yapıdadır. Temel yapı birimi <strong>nükleotid</strong>dir. Her nükleotid: <code>Fosfat + Deoksiriboz Şekeri + Organik Baz</code>tan oluşur. Kural: <strong>Adenin (A) = Timin (T)</strong> ve <strong>Guanin (G) ≡ Sitozin (C)</strong> ile eşleşir.</p>
    </div>
    """,

    # 9. Sınıf Matematik: Kümeler
    "9-sinif-matematik-kumeler-ve-kumelerde-islemler-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🏫 <strong>Öğretmenimizin Dersi:</strong> İyi tanımlanmış nesneler topluluğuna küme denir. Birleşim, kesişim, fark, tümleme ve kartezyen çarpım kuralları ile küme problemlerini bu derste eksiksiz çözüyoruz!
        </div>
        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Alt Küme Sayısı ve Özellikleri</h3>
        <p>n elemanlı bir kümenin alt küme sayısı: <strong>2ⁿ</strong>, kendisi hariç alt kümelerine (özalt küme) sayısı: <strong>2ⁿ - 1</strong> formülüyle bulunur.</p>
        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">2. Birleşim ve Kesişim Eleman Sayısı Bağıntısı</h3>
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 font-mono text-center font-bold text-indigo-950 text-sm">
            s(A ∪ B) = s(A) + s(B) - s(A ∩ B)
        </div>
        <p class="text-xs text-slate-600 mt-1">İki kümenin birleşiminde ortak elemanlar (kesişim) iki kez sayılmaması için bir kez çıkarılır!</p>
    </div>
    """,

    # 10. Sınıf Matematik: Sayma, Permütasyon, Kombinasyon
    "10-sinif-matematik-sayma-permutasyon-kombinasyon-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🏫 <strong>Öğretmenimizin Dersi:</strong> "Sıralama mı yapıyoruz, yoksa seçim mi?" Permütasyon ile Kombinasyon arasındaki bu hayati farkı kavradığınız an TYT ve AYT olasılık sorularının tamamını doğru çözebilirsiniz!
        </div>
        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Permütasyon (Sıralama) vs Kombinasyon (Seçme)</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
            <div class="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                <div class="font-bold text-blue-900 text-sm">Permütasyon P(n, r) - SIRA ÖNEMLİ</div>
                <div class="font-mono text-xs font-bold text-blue-950 mt-1">P(n, r) = n! / (n - r)!</div>
                <p class="text-xs text-blue-800 mt-1">Kişileri yan yana dizme, fotoğraf çektirme, şifre oluşturma, derece sıralaması.</p>
            </div>
            <div class="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                <div class="font-bold text-purple-900 text-sm">Kombinasyon C(n, r) - SIRA ÖNEMSİZ</div>
                <div class="font-mono text-xs font-bold text-purple-950 mt-1">C(n, r) = n! / [r! · (n - r)!]</div>
                <p class="text-xs text-purple-800 mt-1">Ekip/takım seçme, geometri sorularında doğru/üçgen oluşturma, kitap seçme.</p>
            </div>
        </div>
    </div>
    """,

    # 11. Sınıf Matematik: Analitik Geometri
    "11-sinif-matematik-analitik-geometri-nokta-ve-dogru-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🏫 <strong>Öğretmenimizin Dersi:</strong> Geometriyi cebirle birleştiren analitik düzlemde eğim, diklik şartı, iki doğru arasındaki açı ve noktanın doğruya uzaklığı formüllerini adım adım uyguluyoruz!
        </div>
        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Temel Analitik Formülleri</h3>
        <ul class="list-disc pl-5 text-xs sm:text-sm space-y-1">
            <li><strong>İki Nokta Arası Uzaklık:</strong> <code>d = √[(x₂ - x₁)² + (y₂ - y₁)²]</code> (Pisagor teoremi).</li>
            <li><strong>Orta Nokta:</strong> <code>x_orta = (x₁ + x₂) / 2</code> , <code>y_orta = (y₁ + y₂) / 2</code>.</li>
            <li><strong>Eğim (m):</strong> <code>m = (y₂ - y₁) / (x₂ - x₁) = tanα</code>.</li>
            <li><strong>Paralellik Şartı:</strong> Paralel iki doğrunun eğimleri eşittir: <code>m₁ = m₂</code>.</li>
            <li><strong>Diklik Şartı:</strong> Birbirine dik iki doğrunun eğimleri çarpımı -1'dir: <code>m₁ · m₂ = -1</code>.</li>
        </ul>
    </div>
    """,

    # 11. Sınıf Matematik: Parabol
    "11-sinif-matematik-parabol-ve-ikinci-dereceden-fonksiyonlar-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🏫 <strong>Öğretmenimizin Dersi:</strong> İkinci dereceden fonksiyonların grafiğine parabol denir (<code>f(x) = ax² + bx + c</code>). Tepe noktası T(r, k), simetri ekseni x = r ve diskriminant ilişkisini bu derste tüm incelikleriyle inceliyoruz!
        </div>
        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Tepe Noktası T(r, k) ve Formülleri</h3>
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-center font-mono text-base font-bold text-indigo-950">
            r = -b / (2a) &emsp;&emsp; k = f(r) = (4ac - b²) / (4a)
        </div>
        <p class="text-xs text-slate-600 mt-2">Parabol <code>a &gt; 0</code> ise kollar yukarı bakar ve tepe noktasında <strong>en küçük (minimum)</strong> değerini alır. <code>a &lt; 0</code> ise kollar aşağı bakar ve tepe noktasında <strong>en büyük (maksimum)</strong> değerini alır.</p>
    </div>
    """,

    # 12. Sınıf Matematik: Diziler
    "12-sinif-matematik-diziler-aritmetik-ve-geometrik-dizi-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🏫 <strong>Öğretmenimizin Dersi:</strong> Tanım kümesi pozitif doğal sayılar kümesi (N⁺ = {1, 2, 3...}) olan fonksiyonlara dizi denir. Aritmetik dizilerde ortak fark (d), geometrik dizilerde ortak çarpan (r) ile terimler ve terim toplamları hesaplanır!
        </div>
        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Aritmetik ve Geometrik Dizi Karşılaştırması</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
            <div class="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                <div class="font-bold text-blue-900 text-sm">Aritmetik Dizi (Sabit Fark d)</div>
                <div class="font-mono text-blue-950 font-bold mt-1">aₙ = a₁ + (n - 1)·d</div>
                <div class="font-mono text-blue-950 font-bold mt-1">Sₙ = (n/2)·[a₁ + aₙ]</div>
                <p class="text-slate-600 mt-1">Örn: 3, 7, 11, 15, 19... (d = 4)</p>
            </div>
            <div class="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                <div class="font-bold text-purple-900 text-sm">Geometrik Dizi (Sabit Oran r)</div>
                <div class="font-mono text-purple-950 font-bold mt-1">aₙ = a₁ · rⁿ⁻¹</div>
                <div class="font-mono text-purple-950 font-bold mt-1">Sₙ = a₁ · (1 - rⁿ) / (1 - r)</div>
                <p class="text-slate-600 mt-1">Örn: 2, 6, 18, 54, 162... (r = 3)</p>
            </div>
        </div>
    </div>
    """
}

def get_deep_lecture(slug):
    return DEEP_LECTURE_DB.get(slug)
