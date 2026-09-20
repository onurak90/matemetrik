# -*- coding: utf-8 -*-
"""
Teacher-grade, classroom-style detailed lecture notes for Middle School (Grades 5-8).
Contains authentic explanations, rules, tables, exam strategies, common pitfalls, and worked model examples.
"""

THEORY_MIDDLE = {
    # 5. Sınıf Matematik: Doğal Sayılar & Üslü Sayılar
    "5-sinif-matematik-dogal-sayilarla-islemler-ve-uslu-sayilar-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🏫 <strong>Öğretmenimizin Dersi:</strong> 5. sınıfta milyonlu basamaklara ve üslü sayıların gücüne adım atıyoruz. Bir sayının karesi ve küpünün geometrik anlamını, işlem önceliğini ve zihinden problem çözme stratejilerini bu derste tüm ayrıntılarıyla kavrayacaksınız!
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Bölükler ve Basamak Tablosu (9 Basamaklı Sayılar)</h3>
        <p>Büyük sayıları rahat okuyabilmek için sağdan sola doğru üçerli gruplara ayırırız. Bu üçerli basamak gruplarına <strong>bölük</strong> adı verilir:</p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3 text-center text-xs">
            <div class="p-3 rounded-xl bg-purple-50 border border-purple-200">
                <div class="font-bold text-purple-900 text-sm">Milyonlar Bölüğü</div>
                <p class="text-slate-600 mt-1">Yüz Milyonlar, On Milyonlar, Milyonlar</p>
            </div>
            <div class="p-3 rounded-xl bg-blue-50 border border-blue-200">
                <div class="font-bold text-blue-900 text-sm">Binler Bölüğü</div>
                <p class="text-slate-600 mt-1">Yüz Binler, On Binler, Binler</p>
            </div>
            <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <div class="font-bold text-emerald-900 text-sm">Birler Bölüğü</div>
                <p class="text-slate-600 mt-1">Yüzler, Onlar, Birler</p>
            </div>
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">2. Üslü İfadeler: Bir Sayının Karesi ve Küpü</h3>
        <p>Bir doğal sayının kendisiyle tekrarlı çarpımının kısa gösterimine <strong>üslü ifade</strong> denir:</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div class="font-bold text-indigo-700 text-sm">Bir Sayının Karesi (a²)</div>
                <p class="text-xs text-slate-600 mt-1">Sayının kendisiyle 2 defa çarpılmasıdır. <br><code>a² = a × a</code> <br><em>Örnek: 4² = 4 × 4 = 16 (4'ün karesi)</em></p>
            </div>
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div class="font-bold text-indigo-700 text-sm">Bir Sayının Küpü (a³)</div>
                <p class="text-xs text-slate-600 mt-1">Sayının kendisiyle 3 defa çarpılmasıdır. <br><code>a³ = a × a × a</code> <br><em>Örnek: 3³ = 3 × 3 × 3 = 27 (3'ün küpü)</em></p>
            </div>
        </div>

        <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 font-bold text-xs sm:text-sm">
            ⚠️ EN ÇOK YAPILAN HATA: <code>3²</code> ifadesini sakın <code>3 × 2 = 6</code> olarak hesaplamayın! Taban ile üs asla çarpılmaz! Doğrusu: <code>3 × 3 = 9</code>'dur.
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">3. Matematikte İşlem Önceliği Sırası</h3>
        <p>Birden fazla işlemin bulunduğu sorularda takip edilecek kesin sıra:</p>
        <ol class="list-decimal pl-5 text-xs sm:text-sm space-y-1 font-semibold text-slate-800">
            <li>Önce varsa <strong>Üslü İfadeler</strong> hesaplanır.</li>
            <li>İkinci olarak <strong>Parantez İçi</strong> işlemler tamamlanır.</li>
            <li>Üçüncü olarak <strong>Çarpma veya Bölme</strong> işlemleri yapılır.</li>
            <li>En son <strong>Toplama veya Çıkarma</strong> işlemleri yapılır (Aynı öncelikte soldan sağa).</li>
        </ol>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">4. Çözümlü Model Sorular</h3>
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div class="font-bold text-slate-900 text-sm">Model Soru: <code>2³ + (15 - 3 × 2)²</code> işleminin sonucu kaçtır?</div>
            <div class="text-xs sm:text-sm text-slate-700">
                <p><strong>Adım 1:</strong> Parantez içindeki çarpmayı yapalım: <code>3 × 2 = 6</code>. Parantez içi: <code>15 - 6 = 9</code> olur.</p>
                <p><strong>Adım 2:</strong> Üslü sayıları hesaplayalım: <code>2³ = 2 × 2 × 2 = 8</code> ve <code>9² = 9 × 9 = 81</code>.</p>
                <p><strong>Adım 3:</strong> Toplamayı yapalım: <code>8 + 81 = 89</code>. Doğru cevap <strong>89</strong>'dur.</p>
            </div>
        </div>
    </div>
    """,

    # 6. Sınıf Matematik: Çarpanlar ve Katlar & Bölünebilme Kuralları
    "6-sinif-matematik-carpanlar-ve-katlar-bolunebilme-kurallari-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🏫 <strong>Öğretmenimizin Dersi:</strong> Bir sayıyı kalansız bölen sayılara çarpan (bölen) denir. Bölünebilme kuralları ise uzun bölme işlemleri yapmadan bir sayının hangi sayılara tam bölündüğünü zihinden görmemizi sağlar!
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Bölünebilme Kuralları Özeti</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3 text-xs">
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong>2 ile Bölünebilme:</strong> Birler basamağı çift (0, 2, 4, 6, 8) olan sayılar tam bölünür.
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong>3 ile Bölünebilme:</strong> Rakamları toplamı 3 veya 3'ün katı olan sayılar tam bölünür.
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong>4 ile Bölünebilme:</strong> Son iki basamağı 00 veya 4'ün katı olan sayılar tam bölünür.
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong>5 ile Bölünebilme:</strong> Birler basamağı 0 veya 5 olan sayılar tam bölünür.
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong>6 ile Bölünebilme:</strong> Hem 2'ye hem de 3'e aynı anda tam bölünen sayılar 6'ya tam bölünür.
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong>9 ile Bölünebilme:</strong> Rakamları toplamı 9 veya 9'un katı olan sayılar tam bölünür.
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong>10 ile Bölünebilme:</strong> Birler basamağı 0 olan tüm sayılar 10'a tam bölünür.
            </div>
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">2. Asal Sayılar ve Asal Çarpan Algoritması</h3>
        <p>Yalnızca 1'e ve kendisine bölünebilen 1'den büyük doğal sayılara <strong>asal sayı</strong> denir. <strong>En küçük asal sayı 2'dir ve 2'den başka çift asal sayı yoktur!</strong></p>
        <p>İlk asal sayılar: <strong>2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37...</strong></p>
    </div>
    """,

    # 6. Sınıf Matematik: Tam Sayılar ve Mutlak Değer
    "6-sinif-matematik-tam-sayilar-ve-mutlak-deger-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🏫 <strong>Öğretmenimizin Dersi:</strong> Doğal sayılar günlük hayatta her durumu anlatmaya yetmez. Sıfırın altındaki sıcaklıklar, borçlar, yer altı katları için negatif sayılara ihtiyaç duyarız. İşte karşınızda Tam Sayılar kümesi (Z)!
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Sayı Doğrusu ve Tam Sayılar (Z)</h3>
        <p>Tam sayılar; Pozitif tam sayılar (Z⁺), Negatif tam sayılar (Z⁻) ve başlangıç noktası olan Sıfır (0) sayısının birleşiminden oluşur. <strong>Sıfır ne pozitif ne de negatiftir; nötr bir referans noktasıdır.</strong></p>
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center font-mono text-xs sm:text-sm text-slate-900 font-bold">
            ... -4, -3, -2, -1, [ 0 ], +1, +2, +3, +4 ... &rarr; Sağa gidildikçe sayılar BÜYÜR, sola gidildikçe KÜÇÜLÜR.
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">2. Mutlak Değer: Sayının Başlangıç Noktasına Uzaklığı</h3>
        <p>Bir sayının sayı doğrusu üzerinde 0'a olan uzaklığına <strong>mutlak değer</strong> denir ve <code>|x|</code> ile gösterilir. Uzaklık hiçbir zaman negatif olamayacağı için <strong>mutlak değer sonucu daima sıfır veya pozitiftir!</strong></p>
        <p>Örnekler: <code>|+5| = 5</code>, <code>|-7| = 7</code>, <code>|0| = 0</code>.</p>
    </div>
    """,

    # 7. Sınıf Matematik: Tam Sayılarla Dört İşlem
    "7-sinif-matematik-tam-sayilarla-dort-islem-ve-problemler-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🏫 <strong>Öğretmenimizin Dersi:</strong> 7. sınıf matematiğinin kalbi tam sayılarla dört işlemdir. İşaret çarpımları, parantezli çıkarma kuralları ve negatif üsler lise boyunca karşınıza çıkacak temel taşlardır!
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Çarpma ve Bölmede İşaret Tablosu</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3 text-center text-xs font-bold">
            <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">(+) × (+) = (+)</div>
            <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">(-) × (-) = (+)</div>
            <div class="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">(+) × (-) = (-)</div>
            <div class="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">(-) × (+) = (-)</div>
        </div>
        <p><strong>Altın Kural:</strong> Aynı işaretli iki sayının çarpımı veya bölümü daima <strong>POZİTİF (+)</strong>, zıt işaretli iki sayının çarpımı veya bölümü daima <strong>NEGATİF (-)</strong> dir.</p>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">2. Negatif Sayıların Kuvvetleri</h3>
        <ul class="list-disc pl-5 text-xs sm:text-sm space-y-1">
            <li>Negatif bir sayının <strong>ÇİFT kuvveti pozitiftir:</strong> <code>(-3)² = (-3) × (-3) = +9</code></li>
            <li>Negatif bir sayının <strong>TEK kuvveti negatiftir:</strong> <code>(-2)³ = (-2) × (-2) × (-2) = -8</code></li>
            <li><strong>Parantez Uyarısı:</strong> <code>-3² = -(3×3) = -9</code> iken, <code>(-3)² = +9</code>'dur! Parantez işareti de kapsar.</li>
        </ul>
    </div>
    """,

    # 7. Sınıf Matematik: Birinci Dereceden Denklemler
    "7-sinif-matematik-birinci-dereceden-denklemler-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🏫 <strong>Öğretmenimizin Dersi:</strong> Denklem çözümü eşit kollu bir terazidir. Eşitliğin bozulmaması için terazinin her iki kefesine aynı işlem uygulanır. Bilinenler bir tarafa, bilinmeyenler diğer tarafa toplanır!
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Denklem Çözme Adımları</h3>
        <ol class="list-decimal pl-5 text-xs sm:text-sm space-y-2">
            <li>Varsa parantezler dağılma özelliğiyle açılır: <code>2(x + 3) = 2x + 6</code>.</li>
            <li>Eşitliğin her iki tarafındaki benzer terimler toplanır.</li>
            <li><strong>Köprüden Geçme Kuralı:</strong> Bir terim eşitliğin diğer tarafına geçerken işareti değişir (+ ise -, - ise + olur).</li>
            <li>x'in başındaki katsayıya her iki taraf bölünerek x yalnız bırakılır.</li>
        </ol>
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div class="font-bold text-slate-900 text-sm">Model Soru: <code>3x - 5 = x + 11</code> denklemini çözünüz.</div>
            <div class="text-xs sm:text-sm text-slate-700">
                <p>x'i sola, -5'i sağa alalım: <code>3x - x = 11 + 5</code></p>
                <p><code>2x = 16</code> &rarr; Her iki tarafı 2'ye bölelim: <code>x = 8</code> bulunur.</p>
            </div>
        </div>
    </div>
    """,

    # 8. Sınıf Matematik: EBOB - EKOK
    "8-sinif-matematik-carpanlar-ve-katlar-ebob-ekok-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🏫 <strong>Öğretmenimizin Dersi:</strong> LGS sınavının 1 numaralı sorusu her yıl EBOB-EKOK'tan gelir. Sorunun bir EBOB sorusu mu yoksa EKOK sorusu mu olduğunu anlamanın pratik şifrelerini bu derste açığa çıkarıyoruz!
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. EBOB ve EKOK Ne Zaman Kullanılır?</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
            <div class="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                <div class="font-bold text-blue-900 text-sm flex items-center gap-1.5">
                    <span>✂️</span> <strong>EBOB (Bütünden Parçaya)</strong>
                </div>
                <ul class="list-disc pl-5 text-xs text-blue-950 mt-2 space-y-1">
                    <li>Büyük çuvallardaki un/pirinç küçük paketlere paylaştırılıyorsa,</li>
                    <li>Tarlanın etrafına eşit aralıklarla ağaç/direk dikiliyorsa,</li>
                    <li>Kumaşlar, borular eşit uzunlukta parçalara kesiliyorsa <strong>EBOB</strong> kullanılır.</li>
                </ul>
            </div>
            <div class="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                <div class="font-bold text-purple-900 text-sm flex items-center gap-1.5">
                    <span>⏰</span> <strong>EKOK (Parçadan Bütüne)</strong>
                </div>
                <ul class="list-disc pl-5 text-xs text-purple-950 mt-2 space-y-1">
                    <li>Ziller farklı sürelerde çalıp birlikte ne zaman çalacakları soruluyorsa,</li>
                    <li>Farklı günlerde nöbet tutan doktorların birlikte nöbet günleri,</li>
                    <li>Küçük tuğlalar birleştirilip küp yapılıyorsa <strong>EKOK</strong> kullanılır.</li>
                </ul>
            </div>
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">2. Önemli Özellikler ve Formüller</h3>
        <ul class="list-disc pl-5 text-xs sm:text-sm space-y-1">
            <li>Aralarında asal iki sayının <strong>EBOB'u 1'dir</strong>, <strong>EKOK'u ise sayıların çarpımıdır</strong>: <code>EKOK(a, b) = a × b</code>.</li>
            <li>Herhangi iki doğal sayının EBOB'u ile EKOK'unun çarpımı, bu sayıların çarpımına eşittir: <code>EBOB(a, b) × EKOK(a, b) = a × b</code>.</li>
        </ul>
    </div>
    """,

    # 8. Sınıf Matematik: Üslü İfadeler
    "8-sinif-matematik-uslu-ifadeler-ve-bilimsel-gosterim-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🏫 <strong>Öğretmenimizin Dersi:</strong> LGS'de üslü ifadeler; işlem özellikleri, çok büyük ve çok küçük sayılar ve bilimsel gösterim kuralları üzerinden sorgulanır. Negatif üs mantığını ve çarpma-bölme kurallarını eksiksiz öğrenelim!
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Negatif Üs Kuralı (Ters Çevirme)</h3>
        <p>Bir sayının üssünün negatif olması, sayının negatif olduğu anlamına gelmez! Negatif üs sayıyı <strong>çarpmaya göre ters çevirir</strong>:</p>
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-center font-mono text-base font-bold text-indigo-950">
            a⁻ⁿ = 1 / aⁿ &emsp; [a ≠ 0] &emsp;&emsp; (a/b)⁻ⁿ = (b/a)ⁿ
        </div>
        <p class="text-xs text-slate-600">Örnek: <code>2⁻³ = 1 / 2³ = 1/8</code> &emsp;|&emsp; <code>(2/3)⁻² = (3/2)² = 9/4</code></p>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">2. Üslü İfadelerle Çarpma ve Bölme Kuralları</h3>
        <ul class="list-disc pl-5 text-xs sm:text-sm space-y-1">
            <li><strong>Tabanlar Aynıysa Çarpmada Üsler Toplanır:</strong> <code>aˣ × aʸ = aˣ⁺ʸ</code> (Örn: 2⁵ × 2³ = 2⁸)</li>
            <li><strong>Tabanlar Aynıysa Bölmede Üsler Çıkarılır:</strong> <code>aˣ / aʸ = aˣ⁻ʸ</code> (Örn: 5⁷ / 5³ = 5⁴)</li>
            <li><strong>Üsler Aynıysa Tabanlar Çarpılır:</strong> <code>aˣ × bˣ = (a × b)ˣ</code> (Örn: 2⁴ × 5⁴ = 10⁴)</li>
            <li><strong>Üssün Üssü Çarpılır:</strong> <code>(aˣ)ʸ = aˣ·ʸ</code> (Örn: (2³)² = 2⁶)</li>
        </ul>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">3. Bilimsel Gösterim Standartı</h3>
        <p>Bilimsel gösterim: <strong>a × 10ⁿ</strong> biçiminde yazılıştır. Burada katsayı olan <code>a</code> mutlaka:</p>
        <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center font-bold text-emerald-950 text-base">
            1 &le; |a| &lt; 10 &emsp; (a bir tam sayı veya ondalık sayı, n tam sayıdır)
        </div>
        <p class="text-xs text-slate-600">Örnek: 450.000 = <code>4,5 × 10⁵</code> (Bilimseldir). <code>45 × 10⁴</code> bilimsel DEĞİLDİR çünkü 45 sayısı 10'dan büyüktür.</p>
    </div>
    """,

    # 8. Sınıf Matematik: Kareköklü İfadeler
    "8-sinif-matematik-karekoklu-ifadeler-ve-gercek-sayilar-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🏫 <strong>Öğretmenimizin Dersi:</strong> Karekök alma işlemi, alanı verilen bir karenin bir kenar uzunluğunu bulma işlemidir. Tam kare sayıları tanımak ve kök dışına çıkarma (a√b) kuralları LGS başarısının anahtarıdır!
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Tam Kare Sayılar ve Karekök Mantığı</h3>
        <p>Bir tam sayının karesi olan sayılara <strong>tam kare sayılar</strong> denir: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400...</p>
        <p>Kök dışına tam çıkarlar: <code>√144 = 12</code>, <code>√225 = 15</code>.</p>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">2. Kök Dışına Çıkarma ve Kök İçine Alma</h3>
        <p>Tam kare olmayan sayılar çarpanlarından biri tam kare olacak şekilde ayrılır: <code>√(a² · b) = a√b</code>.</p>
        <p class="text-xs text-slate-600">Örnek: <code>√72 = √(36 × 2) = 6√2</code> &emsp;|&emsp; <code>√48 = √(16 × 3) = 4√3</code></p>
        <p><strong>Kök İçine Alma:</strong> Kök dışındaki katsayının karesi alınarak içeri yazılır: <code>3√5 = √(3² × 5) = √(9 × 5) = √45</code>.</p>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">3. Kareköklü İfadelerle İşlemler</h3>
        <ul class="list-disc pl-5 text-xs sm:text-sm space-y-1">
            <li><strong>Çarpma:</strong> <code>a√b × c√d = (a × c)√(b × d)</code> &rarr; Katsayılar kendi arasında, kök içleri kendi arasında çarpılır.</li>
            <li><strong>Bölme:</strong> <code>(a√b) / (c√d) = (a/c)√(b/d)</code></li>
            <li><strong>Toplama/Çıkarma:</strong> Yalnızca <strong>kök içi ve kök derecesi aynı olan</strong> ifadeler toplanıp çıkarılabilir: <code>3√2 + 5√2 = 8√2</code>. (√2 + √3 ASLA √5 ETMEZ!).</li>
        </ul>
    </div>
    """,

    # 8. Sınıf Türkçe: Fiilimsiler
    "8-sinif-turkce-fiilimsiler-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950 font-medium">
            👩‍🏫 <strong>Öğretmenimizin Dersi:</strong> Fiilimsi (eylemsi); fiil kök veya gövdelerine özel yapım ekleri getirilerek oluşturulan, cümlede isim, sıfat veya zarf görevinde kullanılan sözcüklerdir. Eylem anlamını korurlar fakat şahıs ve zaman eki alarak çekimlenemezler!
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Fiilimsi Türleri ve Akılda Kalıcı Kodlamalar</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 my-3">
            <div class="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                <div class="font-bold text-purple-900 text-sm">1. İsim-Fiil (Mastar)</div>
                <div class="text-xs text-purple-700 font-mono font-bold mt-1">Kod: -MA -Y- IŞ -MAK ("MA-YIŞ-MAK")</div>
                <p class="text-xs text-slate-600 mt-2">Cümlede isim gibi kullanılır. <br><em>Örnek: "Kitap <strong>okumak</strong> zihni dinlendirir." / "Onun <strong>bakışı</strong> herkesi etkiledi."</em></p>
            </div>
            <div class="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                <div class="font-bold text-blue-900 text-sm">2. Sıfat-Fiil (Ortaç)</div>
                <div class="text-xs text-blue-700 font-mono font-bold mt-1">Kod: "ANASI MEZAR DİKECEKMİŞ"</div>
                <p class="text-xs text-slate-600 mt-2">İsimleri niteleyen sıfat görevindedir. <br><em>Örnek: "<strong>Yıkılası</strong> dağlar" / "<strong>Tanıdık</strong> bir sima" / "<strong>Gelen</strong> misafirler"</em></p>
            </div>
            <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div class="font-bold text-emerald-900 text-sm">3. Zarf-Fiil (Bağ-Fiil / Ulaç)</div>
                <div class="text-xs text-emerald-700 font-mono font-bold mt-1">Ekler: -ken, -alı, -asiye, -meden, -erek, -ip, -ince, -dıkça, -casına...</div>
                <p class="text-xs text-slate-600 mt-2">Eylemin zamanını ("Ne zaman?") veya durumunu ("Nasıl?") bildirir. <br><em>Örnek: "<strong>Gülerek</strong> içeri girdi." (Durum) / "Hava <strong>kararınca</strong> evlere dağıldık." (Zaman)</em></p>
            </div>
        </div>

        <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 font-bold text-xs sm:text-sm">
            ⚠️ TUZAK: Kalıcı İsimlere Dikkat Edin! <br>
            Fiilimsi ekini alıp bir nesnenin veya yiyeceğin kalıcı adı olan kelimeler ARTIK FİİLİMSİ DEĞİLDİR! <br>
            <em>Örnekler: "dondurma", "çakmak", "dolma", "ekmek", "sarma", "kavurma", "giriş", "çıkış".</em>
        </div>
    </div>
    """
}

def get_middle_theory(slug):
    return THEORY_MIDDLE.get(slug)
