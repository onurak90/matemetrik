# -*- coding: utf-8 -*-
"""
Teacher-grade, classroom-style detailed lecture notes for High School Math (Grades 9-12).
Comprehensive theorems, formulas, proofs, exam shortcuts, pitfalls, and fully worked model examples.
"""

THEORY_HIGH_MATH = {
    # 9. Sınıf: Mantık ve Önermeler
    "9-sinif-matematik-mantik-ve-onermeler-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🏫 <strong>Öğretmenimizin Dersi:</strong> Sevgili gençler, matematiksel düşüncenin temeli mantıktır. Doğru ile yanlışı kesin hükümlerle ayırt etmek, bileşik önermeleri kurmak ve totoloji/çelişki kavramlarını kavramak hem TYT/AYT'de hem de bilgisayar bilimlerinde (algoritmalar, boolean cebri) karşınıza çıkacak en temel konudur!
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Önerme Kavramı ve Doğruluk Değerleri</h3>
        <p>Doğru ya da yanlış kesin bir hüküm bildiren ifadelere <strong>önerme</strong> denir. Soru, emir, istek veya duygu bildiren cümleler önerme değildir (Örn: "Bugün hava çok güzel mi?" önerme değildir; fakat "Türkiye'nin başkenti Ankara'dır" doğru bir önermedir). Önermeler genellikle <code>p, q, r, s</code> küçük harfleriyle gösterilir.</p>
        <p>Bir önerme doğru ise doğruluk değeri <strong>1</strong>, yanlış ise <strong>0</strong> ile gösterilir. <code>n</code> tane bağımsız önermenin <code>2ⁿ</code> farklı doğruluk durumu vardır.</p>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">2. Mantık Bağlaçları ve Doğruluk Tabloları</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div class="font-bold text-indigo-900 text-sm mb-1">VE Bağlacı (∧) - Çarpma Mantığı</div>
                <p class="text-slate-600">Her iki önerme de 1 iken sonuç 1'dir. Biri bile 0 olsa sonuç 0 olur. <br><code>1 ∧ 1 = 1</code> &emsp; <code>1 ∧ 0 = 0</code> &emsp; <code>0 ∧ 0 = 0</code></p>
            </div>
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div class="font-bold text-indigo-900 text-sm mb-1">VEYA Bağlacı (∨) - Toplama Mantığı</div>
                <p class="text-slate-600">En az biri 1 iken sonuç 1'dir. Yalnızca her ikisi de 0 iken sonuç 0 olur. <br><code>1 ∨ 0 = 1</code> &emsp; <code>0 ∨ 1 = 1</code> &emsp; <code>0 ∨ 0 = 0</code></p>
            </div>
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div class="font-bold text-indigo-900 text-sm mb-1">İSE Bağlacı (Koşullu Önerme: p &rarr; q)</div>
                <p class="text-slate-600"><strong>100 Kuralı:</strong> Sadece <code>1 &rarr; 0 &equiv; 0</code> durumunda yanlıştır! Diğer tüm durumlarda doğrudur (1). <br><em>Denklik Kuralı: <code>p &rarr; q &equiv; p' ∨ q</code></em></p>
            </div>
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div class="font-bold text-indigo-900 text-sm mb-1">ANCAK VE ANCAK (&harr;) - İki Yönlü Koşul</div>
                <p class="text-slate-600">Doğruluk değerleri AYNI iken sonuç 1, FARKLI iken sonuç 0'dır. <br><code>1 &harr; 1 &equiv; 1</code>, <code>0 &harr; 0 &equiv; 1</code>, <code>1 &harr; 0 &equiv; 0</code></p>
            </div>
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">3. De Morgan Kuralları ve Totoloji</h3>
        <p>Bileşik önermelerin değili (olumsuzu) alınırken:</p>
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 font-mono text-center font-bold text-indigo-950 text-sm">
            (p ∧ q)' &equiv; p' ∨ q' &emsp;&emsp;&emsp; (p ∨ q)' &equiv; p' ∧ q'
        </div>
        <p>Tüm doğruluk değerleri daima 1 çıkan önermelere <strong>totoloji</strong>, daima 0 çıkan önermelere <strong>çelişki</strong> denir.</p>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">4. Çözümlü Model Sorular</h3>
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div class="font-bold text-slate-900 text-sm">Model Soru: <code>(p' ∨ q) ∧ p</code> bileşik önermesinin en sade halini bulunuz.</div>
            <div class="text-xs sm:text-sm text-slate-700">
                <p><strong>Çözüm:</strong> Dağılma özelliğini sağdan uygulayalım: <code>(p' ∧ p) ∨ (q ∧ p)</code>.</p>
                <p><code>p' ∧ p &equiv; 0</code> olduğundan ifade: <code>0 ∨ (q ∧ p)</code> haline gelir.</p>
                <p>0 ile veya işlemine giren ifade kendisine eşittir: Sonuç <code><strong>p ∧ q</strong></code> bulunur.</p>
            </div>
        </div>
    </div>
    """,

    # 10. Sınıf: Fonksiyonlar ve Fonksiyon Türleri
    "10-sinif-matematik-fonksiyonlar-ve-turleri-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🏫 <strong>Öğretmenimizin Dersi:</strong> Fonksiyonlar AYT matematiğinin omurgasıdır; limit, türev ve integral tamamen fonksiyonlar üzerine inşa edilmiştir. Bir bağıntının fonksiyon olma kurallarını, birebirlik-örtenlik şartlarını ve ters fonksiyon alma taktiklerini bu derste eksiksiz öğreniyoruz!
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Fonksiyon Olma Şartı (Anne - Çocuk Modeli)</h3>
        <p>A ve B boş olmayan iki küme olmak üzere; A'nın her bir elemanını B'nin bir ve yalnız bir elemanıyla eşleyen bağıntıya <strong>A'dan B'ye tanımlı fonksiyon</strong> denir (<code>f: A &rarr; B</code>). Burada A <strong>Tanım Kümesi</strong>, B <strong>Değer Kümesi</strong>, eşleşen elemanların kümesi <code>f(A)</code> ise <strong>Görüntü Kümesi</strong>dir.</p>
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <strong>2 Temel Fonksiyon Kuralı:</strong>
            <ol class="list-decimal pl-5 text-xs sm:text-sm mt-2 space-y-1">
                <li>Tanım kümesinde (A) <strong>açıkta hiçbir eleman kalamaz</strong> (Her çocuğun mutlaka bir annesi olmalıdır).</li>
                <li>Tanım kümesindeki bir eleman, değer kümesinden <strong>birden fazla elemanla eşleşemez</strong> (Bir çocuğun iki farklı biyolojik annesi olamaz; fakat bir annenin birden çok çocuğu olabilir).</li>
            </ol>
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">2. Temel Fonksiyon Türleri</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 my-3 text-xs">
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong>Bire Bir Fonksiyon:</strong> Tanım kümesindeki farklı elemanların görüntüleri de daima farklıdır: <code>x₁ ≠ x₂ &rArr; f(x₁) ≠ f(x₂)</code>.
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong>Örten Fonksiyon:</strong> Değer kümesinde açıkta hiçbir eleman kalmaz. Değer kümesi görüntü kümesine eşittir: <code>f(A) = B</code>.
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong>İçine Fonksiyon:</strong> Değer kümesinde en az bir eleman açıkta kalıyorsa fonksiyona içine fonksiyon denir.
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong>Birim Fonksiyon (I):</strong> Her elemanı kendisine götürür: <code>f(x) = x</code>. İçi neyse dışı odur!
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong>Sabit Fonksiyon:</strong> Tanım kümesindeki tüm elemanları aynı sabit değere götürür: <code>f(x) = c</code>.
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong>Doğrusal Fonksiyon:</strong> Grafiği bir doğru belirten fonksiyonlardır: <code>f(x) = ax + b</code> (a ≠ 0).
            </div>
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">3. Ters Fonksiyon ve Pratik Kısayol Formülü</h3>
        <p>Bir fonksiyonun tersinin olabilmesi için fonksiyonun <strong>bire bir ve örten</strong> olması şarttır! <code>f(x) = y &hArr; f⁻¹(y) = x</code>.</p>
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-center font-mono text-xs sm:text-sm font-bold text-indigo-950">
            f(x) = (ax + b) / (cx + d) &emsp;&rArr;&emsp; f⁻¹(x) = (-dx + b) / (cx - a)
        </div>
        <p class="text-xs text-slate-600 text-center">Yukarıdaki x'in katsayısı (a) ile aşağıdaki sabit sayı (d) hem yer hem de işaret değiştirir!</p>
    </div>
    """,

    # 10. Sınıf: Polinomlar ve Bölme-Kalan
    "10-sinif-matematik-polinomlar-ve-bolme-kalan-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🏫 <strong>Öğretmenimizin Dersi:</strong> Polinomlar özel tanımlı cebirsel ifadelerdir. Bir ifadenin polinom olup olmadığını belirlemek, katsayılar toplamı P(1) ve sabit terim P(0) hesapları ile uzun bölme yapmadan kalan bulma teoremini bu derste adım adım uyguluyoruz!
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Polinom Olma Koşulu</h3>
        <p><code>P(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₁x + a₀</code> ifadesinin polinom olabilmesi için değişken olan x'in tüm kuvvetlerinin (n) mutlaka bir <strong>DOĞAL SAYI (N = {0, 1, 2, 3...})</strong> olması gerekir!</p>
        <ul class="list-disc pl-5 text-xs sm:text-sm space-y-1">
            <li>Katsayılar reel sayı olabilir (örneğin √3, -5, 2/7 katsayı olabilir).</li>
            <li>Fakat <code>1/x = x⁻¹</code> veya <code>√x = x^(1/2)</code> ifadeleri doğal sayı kuvvet taşımadığı için polinom belirtmez!</li>
        </ul>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">2. Katsayılar Toplamı ve Sabit Terim</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div class="font-bold text-indigo-900 text-sm">Katsayılar Toplamı: x yerine 1 yazılır</div>
                <p class="text-xs text-slate-600 mt-1">P(x) için katsayılar toplamı <code>P(1)</code> dir. <br>P(x + 2) polinomunun katsayılar toplamı için de x yerine 1 yazılır: <code>P(1+2) = P(3)</code> olur.</p>
            </div>
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div class="font-bold text-indigo-900 text-sm">Sabit Terim: x yerine 0 yazılır</div>
                <p class="text-xs text-slate-600 mt-1">P(x) için sabit terim <code>P(0)</code> dır. <br>P(2x - 1) polinomunun sabit terimi için x yerine 0 yazılır: <code>P(2·0 - 1) = P(-1)</code> olur.</p>
            </div>
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">3. Bölme Yapmadan Kalan Bulma Teoremi</h3>
        <p>P(x) polinomunun <code>(ax + b)</code> birinci dereceden terimi ile bölümünden kalanı bulmak için:</p>
        <ol class="list-decimal pl-5 text-xs sm:text-sm space-y-1 font-semibold text-slate-800">
            <li>Bölen sıfıra eşitlenir: <code>ax + b = 0 &rArr; x = -b/a</code></li>
            <li>Bulunan x değeri bölünen polinomda yerine yazılır: <strong>Kalan = P(-b/a)</strong></li>
        </ol>
    </div>
    """,

    # 11. Sınıf: Trigonometri
    "11-sinif-matematik-trigonometri-birim-cember-ve-teoremler-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🏫 <strong>Öğretmenimizin Dersi:</strong> Trigonometri AYT'nin en yüksek soru ağırlığına sahip konusudur (her yıl 4-5 soru!). Birim çember üzerindeki koordinat mantığını, indirgeme formüllerini, Sinüs ve Kosinüs teoremlerini tam hakimiyetle öğrenelim!
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Birim Çember ve Trigonometrik Eksenler</h3>
        <p>Merkezi orijin (0, 0) ve yarıçapı 1 birim olan çembere <strong>birim çember</strong> denir. Denklemi: <strong>x² + y² = 1</strong> dir.</p>
        <ul class="list-disc pl-5 text-xs sm:text-sm space-y-1">
            <li>Birim çember üzerindeki herhangi bir P noktasının apsisi <strong>kosinüs</strong> (x ekseni = cos ekseni), ordinatı <strong>sinüs</strong>tür (y ekseni = sin ekseni): <code>P(cosα, sinα)</code>.</li>
            <li>Pisagor bağıntısından: <strong>sin²α + cos²α = 1</strong> daima geçerlidir!</li>
            <li>Tanjant ve Kotanjant bağıntıları: <code>tanα = sinα / cosα</code>, <code>cotα = cosα / sinα</code> ve <code>tanα · cotα = 1</code>.</li>
        </ul>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">2. Bölgelere Göre İşaret Kodlaması</h3>
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-center font-bold text-indigo-950 text-xs sm:text-sm">
            "Bütün Sınıf Kara Tahtada Coşar"
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 my-2 text-center text-xs">
            <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200"><strong>1. Bölge (Bütün):</strong> Hepsi (+)</div>
            <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200"><strong>2. Bölge (Sınıf):</strong> Yalnızca Sinüs (+)</div>
            <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200"><strong>3. Bölge (Kara Tahta):</strong> Tan ve Cot (+)</div>
            <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200"><strong>4. Bölge (Coşar):</strong> Yalnızca Kosinüs (+)</div>
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">3. Kosinüs ve Sinüs Teoremleri</h3>
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-2">
            <div><strong>Kosinüs Teoremi:</strong> Üç kenar ve bir açı verildiğinde uygulanır: <br><code>a² = b² + c² - 2·b·c·cos(A)</code></div>
            <div><strong>Sinüs Teoremi:</strong> Kenarlar ile karşılarındaki açıların sinüsleri orantılıdır: <br><code>a / sin(A) = b / sin(B) = c / sin(C) = 2R</code> (R: Çevrel çemberin yarıçapı)</div>
        </div>
    </div>
    """,

    # 12. Sınıf: Türev ve Uygulamaları
    "12-sinif-matematik-turev-ve-uygulamalari-maksimum-minimum-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🏫 <strong>Öğretmenimizin Dersi:</strong> Türev, bir eğrinin anlık değişim oranı ve teğetinin eğimidir. Fonksiyonun artan-azalan olduğu aralıklar, yerel ekstremum noktaları ve günlük hayattaki karı maksimize / maliyeti minimize etme problemleri türevin en büyüleyici uygulamalarıdır!
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Türevin Geometrik Anlamı</h3>
        <p>Bir <code>y = f(x)</code> eğrisine üzerindeki <code>(x₀, y₀)</code> noktasından çizilen teğet doğrusunun eğimi, o fonksiyonun <code>x₀</code> noktasındaki birinci türevine eşittir:</p>
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-center font-mono text-base font-bold text-indigo-950">
            m_teğet = f'(x₀) = tan(α)
        </div>
        <p>Teğet denklemi: <code>y - y₀ = m_teğet · (x - x₀)</code> formülü ile yazılır.</p>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">2. Temel Türev Alma Kuralları</h3>
        <ul class="list-disc pl-5 text-xs sm:text-sm space-y-1">
            <li>Sabit Fonksiyon: <code>[c]' = 0</code></li>
            <li>Kuvvet Kuralı: <code>[xⁿ]' = n · xⁿ⁻¹</code> (Örn: [x³]' = 3x²)</li>
            <li>Çarpım Kuralı: <code>[f · g]' = f' · g + f · g'</code></li>
            <li>Bölüm Kuralı: <code>[f / g]' = (f' · g - f · g') / g²</code></li>
            <li>Bileşke Fonksiyon (Zincir Kuralı): <code>[f(g(x))]' = f'(g(x)) · g'(x)</code></li>
        </ul>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">3. Maksimum - Minimum Problemleri Çözüm Stratejisi</h3>
        <ol class="list-decimal pl-5 text-xs sm:text-sm space-y-1 font-semibold text-slate-800">
            <li>En büyük veya en küçük olması istenen büyüklük tek bir değişken cinsinden <code>f(x)</code> fonksiyonu olarak modellenir.</li>
            <li>Oluşturulan fonksiyonun birinci türevi alınır: <code>f'(x)</code>.</li>
            <li>Türev sıfıra eşitlenerek kritik noktalar bulunur: <code>f'(x) = 0</code>.</li>
            <li>Bulunan kritik değer fonksiyonda yerine yazılarak maksimum veya minimum değer hesaplanır.</li>
        </ol>
    </div>
    """,

    # 12. Sınıf: Limit ve Süreklilik
    "12-sinif-matematik-limit-ve-sureklilik-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🏫 <strong>Öğretmenimizin Dersi:</strong> Limit, bir fonksiyonda bağımsız değişken bir noktaya sonsuz yaklaştığında görüntülerin nereye yaklaştığını incelemektir. Fonksiyonun o noktada tanımlı olması şart DEĞİLDİR! Sağdan ve soldan limit eşitliği ve süreklilik şartlarını bu derste netleştiriyoruz!
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Limitin Varlık Şartı</h3>
        <p>Bir <code>f(x)</code> fonksiyonunun <code>x = a</code> noktasında limitinin olabilmesi için:</p>
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-center font-mono text-base font-bold text-indigo-950">
            lim_{x &rarr; a⁺} f(x) = lim_{x &rarr; a⁻} f(x) = L &emsp;&hArr;&emsp; lim_{x &rarr; a} f(x) = L
        </div>
        <p>Sağdan limit ile soldan limit birbirine eşit değilse, o noktada <strong>limit YOKTUR!</strong></p>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">2. Süreklilik Şartları (3 Adım)</h3>
        <p>Bir fonksiyonun bir noktada sürekli olması için grafik el kaldırılmadan çizilebilmelidir. Matematiksel olarak 3 şart:</p>
        <ul class="list-disc pl-5 text-xs sm:text-sm space-y-1">
            <li>1. <code>x = a</code> noktasında <strong>f(a) tanımlı olmalıdır.</strong></li>
            <li>2. <code>x = a</code> noktasında <strong>limit var olmalıdır.</strong></li>
            <li>3. <strong>Limit değeri fonksiyonun o noktadaki değerine eşit olmalıdır:</strong> <code>lim_{x&rarr;a} f(x) = f(a)</code>.</li>
        </ul>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">3. 0/0 Belirsizliği Nasıl Giderilir?</h3>
        <p>Limitte yerine yazıldığında <code>0 / 0</code> elde edilirse belirsizlik vardır. Gidermek için pay ve payda <strong>çarpanlarına ayrılır</strong>, ortak çarpanlar <strong>sadeleştirilir</strong> ve x değeri sadeleşmiş ifadede tekrar yerine yazılır.</p>
    </div>
    """,

    # 12. Sınıf: İntegral ve Alan Hesabı
    "12-sinif-matematik-integral-ve-alan-hesabi-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🏫 <strong>Öğretmenimizin Dersi:</strong> İntegral türevin ters işlemidir (belirsiz integral) ve eğri altındaki sonsuz küçük alanların toplamıdır (belirli integral). Analizin Temel Teoremi ve eğriler arasında kalan alan hesabı AYT'nin zirve konusudur!
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Belirsiz İntegral ve Temel Formüller</h3>
        <p>Türevi <code>f(x)</code> olan <code>F(x)</code> fonksiyonunu bulma işlemine <strong>belirsiz integral</strong> denir. Belirsiz integralde sabit sayı bilinmediğinden daima <strong>+ c integral sabiti</strong> eklenir:</p>
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-center font-mono text-base font-bold text-indigo-950">
            ∫ xⁿ dx = (xⁿ⁺¹) / (n + 1) + c &emsp; [n ≠ -1]
        </div>
        <p class="text-xs text-slate-600">Örnek: <code>∫ 3x² dx = 3 · (x³/3) + c = x³ + c</code></p>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">2. Belirli İntegral (Newton - Leibniz Teoremi)</h3>
        <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center font-mono text-base font-bold text-emerald-950">
            ∫ₐᵇ f(x) dx = F(b) - F(a) &emsp; (Üst sınır yazılır - Alt sınır yazılır)
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">3. İntegral ile Alan Hesabı</h3>
        <ul class="list-disc pl-5 text-xs sm:text-sm space-y-1">
            <li>Eğri x ekseninin <strong>üstünde ise alan pozitiftir:</strong> <code>Alan = ∫ₐᵇ f(x) dx</code>.</li>
            <li>Eğri x ekseninin <strong>altında ise integral negatiftir, alan için önüne eksi konur:</strong> <code>Alan = - ∫ₐᵇ f(x) dx</code> (Alan asla negatif olamaz!).</li>
            <li>İki eğri arasında kalan alan: <code>Alan = ∫ₐᵇ [f(x)_üst - g(x)_alt] dx</code> formülüyle hesaplanır.</li>
        </ul>
    </div>
    """
}

def get_high_math_theory(slug):
    return THEORY_HIGH_MATH.get(slug)
