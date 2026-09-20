# -*- coding: utf-8 -*-
"""
Teacher-grade, classroom-style detailed lecture notes for High School Science (Physics, Chemistry, Biology).
Contains rigorous laws, chemical reactions, biological pathways, tables, and model problems.
"""

THEORY_HIGH_SCIENCE = {
    # 9. Sınıf Fizik: Madde ve Özkütle
    "9-sinif-fizik-madde-ve-ozkutle-kuvvet-ve-hareket-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🏫 <strong>Öğretmenimizin Dersi:</strong> Fizik evreni ve doğa olaylarını anlama sanatıdır. Bu derste maddenin ortak ve ayırt edici özelliklerini, özkütle bağıntısını (d=m/V), kılcallık ve yüzey gerilimini, Newton'un hareket yasalarını gerçek deney kurgularıyla inceliyoruz!
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Özkütle (Yoğunluk) ve Ayırt Edici Özellikler</h3>
        <p>Bir maddenin birim hacminin kütlesine <strong>özkütle</strong> denir. Sabit sıcaklık ve basınç altında saf maddeler için karakteristik ve ayırt edici bir özelliktir:</p>
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-center font-mono text-base font-bold text-indigo-950">
            d = m / V &emsp; [d: Özkütle (g/cm³), m: Kütle (g), V: Hacim (cm³)]
        </div>
        <p class="text-xs text-slate-600"><strong>Kütle-Hacim Grafiğinin Eğimi:</strong> m-V grafiğinin eğimi <code>(tanα = m/V)</code> doğrudan özkütleyi verir. Eğim ne kadar dikse özkütle o kadar büyüktür.</p>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">2. Kohezyon, Adezyon ve Yüzey Gerilimi</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 my-3 text-xs">
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong>Adezyon (Yapışma):</strong> Farklı cins moleküller arasındaki çekim kuvvetidir. Yağmur damlasının cama yapışması veya boyanın duvara tutunması adezyondur.
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong>Kohezyon (Tutunma):</strong> Aynı cins sıvı moleküllerinin birbirini çekmesidir. Su damlalarının küresel durmasını sağlar. Kohezyon &gt; Adezyon ise sıvı yüzeyi ıslatmaz (cıva gibi).
            </div>
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">3. Newton'un Hareket Yasaları</h3>
        <ol class="list-decimal pl-5 text-xs sm:text-sm space-y-1">
            <li><strong>Eylemsizlik Prensibi:</strong> Bir cisme etki eden net kuvvet sıfırsa (F_net = 0), cisim duruyorsa durmaya, hareket ediyorsa sabit hızla hareketine devam eder.</li>
            <li><strong>Temel Prensip (F = m · a):</strong> Net bir kuvvet uygulanan cisim ivmeli hareket yapar. İvme uygulanan net kuvvetle doğru, kütleyle ters orantılıdır.</li>
            <li><strong>Etki - Tepki Prensibi:</strong> Her etkiye karşı eşit büyüklükte ve zıt yönde bir tepki kuvveti vardır (F_etki = -F_tepki). Bu kuvvetler farklı cisimler üzerindedir!</li>
        </ol>
    </div>
    """,

    # 10. Sınıf Kimya: Mol Kavramı
    "10-sinif-kimya-mol-kavrami-ve-kimyasal-hesaplamalar-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🔬 <strong>Öğretmenimizin Dersi:</strong> Kimyada atom ve molekülleri tek tek sayamayız; çünkü akıl almaz derecede küçüktürler. İşte bu yüzden tıpkı 1 düzine = 12 gibi kimyada da 1 Mol = Avogadro Sayısı (6,02 × 10²³) paket birimini kullanırız!
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Mol Sayısı Hesaplama Formülleri (Altın Üçgen)</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3 text-center text-xs">
            <div class="p-3 rounded-xl bg-purple-50 border border-purple-200">
                <div class="font-bold text-purple-900 text-sm">Kütleden Mole:</div>
                <div class="font-mono text-base font-bold text-purple-950 mt-1">n = m / M_A</div>
                <p class="text-slate-600 mt-1">m: Kütle (g), M_A: Mol kütlesi</p>
            </div>
            <div class="p-3 rounded-xl bg-blue-50 border border-blue-200">
                <div class="font-bold text-blue-900 text-sm">Tanecik Sayısından Mole:</div>
                <div class="font-mono text-base font-bold text-blue-950 mt-1">n = N / N_A</div>
                <p class="text-slate-600 mt-1">N_A: 6,02 × 10²³ (Avogadro)</p>
            </div>
            <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <div class="font-bold text-emerald-900 text-sm">Hacimden Mole (Gazlar - NK):</div>
                <div class="font-mono text-base font-bold text-emerald-950 mt-1">n = V / 22,4</div>
                <p class="text-slate-600 mt-1">Normal Koşullarda (0°C, 1 atm)</p>
            </div>
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">2. Kimyasal Tepkimelerde Sınırlayıcı Bileşen</h3>
        <p>Tepkimede katsayılar mol oranlarını belirtir. Reaktiflerden ilk tükenen maddeye <strong>sınırlayıcı bileşen</strong> denir. Oluşacak ürün miktarı ve tepkime verimi DAİMA sınırlayıcı bileşene göre hesaplanır!</p>
    </div>
    """,

    # 10. Sınıf Biyoloji: Mitoz - Mayoz
    "10-sinif-biyoloji-mitoz-mayoz-ve-kalitim-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-medium">
            🧬 <strong>Öğretmenimizin Dersi:</strong> Canlılığın devamı hücre bölünmelerine bağlıdır. Mitoz bölünme vücut hücrelerinde büyümeyi ve onarımı sağlarken, Mayoz bölünme üreme hücrelerini oluşturur ve krossing-over ile biyolojik çeşitliliği (varyasyonu) sağlar!
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. Mitoz ve Mayoz Karşılaştırma Tablosu</h3>
        <div class="overflow-x-auto my-3 text-xs">
            <table class="w-full border-collapse border border-slate-200 text-left">
                <thead class="bg-slate-100 text-slate-900 font-bold">
                    <tr>
                        <th class="p-2 border border-slate-200">Özellik</th>
                        <th class="p-2 border border-slate-200">Mitoz Bölünme</th>
                        <th class="p-2 border border-slate-200">Mayoz Bölünme</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-slate-700">
                    <tr>
                        <td class="p-2 border border-slate-200 font-semibold">Görüldüğü Hücreler</td>
                        <td class="p-2 border border-slate-200">Vücut (Somatik) hücreleri (n, 2n, 3n)</td>
                        <td class="p-2 border border-slate-200">2n kromozomlu üreme ana hücreleri</td>
                    </tr>
                    <tr>
                        <td class="p-2 border border-slate-200 font-semibold">Oluşan Hücre Sayısı</td>
                        <td class="p-2 border border-slate-200">2 yeni hücre</td>
                        <td class="p-2 border border-slate-200">4 yeni hücre (Gamet)</td>
                    </tr>
                    <tr>
                        <td class="p-2 border border-slate-200 font-semibold">Kromozom Sayısı</td>
                        <td class="p-2 border border-slate-200">Sabit kalır (2n &rarr; 2n)</td>
                        <td class="p-2 border border-slate-200">Yarıya iner (2n &rarr; n)</td>
                    </tr>
                    <tr>
                        <td class="p-2 border border-slate-200 font-semibold">Genetik Çeşitlilik</td>
                        <td class="p-2 border border-slate-200">Yoktur (Kalıtsal kopya)</td>
                        <td class="p-2 border border-slate-200">Vardır (Krossing-over & Homolog k. ayrılması)</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    """,

    # 11. Sınıf Kimya: Gaz Yasaları
    "11-sinif-kimya-modern-atom-teorisi-ve-gaz-yasalari-konu-anlatimi-20-soruluk-test": """
    <div class="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
            👨‍🔬 <strong>Öğretmenimizin Dersi:</strong> Gazlar maddenin en düzensiz ve en kinetik halidir. İdeal Gaz Denklemi (P·V = n·R·T) "Paran Varsa Ne Rahat" tekerlemesiyle tüm gaz yasalarını (Boyle, Charles, Gay-Lussac, Avogadro) tek bir çatıda birleştirir!
        </div>

        <h3 class="text-xl font-black text-slate-900 border-b border-indigo-100 pb-2">1. İdeal Gaz Denklemi: P · V = n · R · T</h3>
        <p>İdeal gaz tanecikleri arasında çekim kuvveti olmayan ve hacimleri toplam hacim yanında ihmal edilen varsayımsal gazdır:</p>
        <ul class="list-disc pl-5 text-xs sm:text-sm space-y-1">
            <li><strong>P (Basınç):</strong> Birimi mutlaka <strong>atm</strong> alınır (760 mmHg = 1 atm).</li>
            <li><strong>V (Hacim):</strong> Birimi mutlaka <strong>Litre (L)</strong> alınır.</li>
            <li><strong>n (Mol sayısı):</strong> Gazın mol miktarı (n = m / M_A).</li>
            <li><strong>R (Rydberg Sabiti):</strong> <code>0,082</code> veya <code>22,4 / 273</code>.</li>
            <li><strong>T (Mutlak Sıcaklık):</strong> Birimi mutlaka <strong>Kelvin (K)</strong> dir! <code>T(K) = t(°C) + 273</code>.</li>
        </ul>

        <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 font-bold text-xs sm:text-sm">
            ⚠️ EN KRİTİK UYARI: Gaz hesaplamalarında sıcaklık asla °C (Celsius) olarak kullanılamaz! Daima üzerine 273 eklenerek Kelvin'e (K) çevrilmelidir!
        </div>
    </div>
    """
}

def get_high_science_theory(slug):
    return THEORY_HIGH_SCIENCE.get(slug)
