# -*- coding: utf-8 -*-
"""
Grade-Adaptive Student Theory Generator for Matemetrik.
Strictly adapts tone, pedagogical approach, worked examples, and exam strategies based on grade level:
- Grades 1-4 (İlkokul): Friendly, colorful, playful, story-based, visual analogies, step-by-step thinking.
- Grades 5-8 (Ortaokul & LGS): Energetic, motivating, MEB kazanımları, LGS beceri temelli soru taktikleri.
- Grades 9-12 (Lise & YKS): Professional, strategic, ÖSYM soru kalıpları, formül kartları, derece taktikleri.
"""

def generate_elementary_student_theory(spec):
    g_str = spec["grade_str"]
    g_num = spec["grade_num"]
    subj = spec["subject"]
    topic = spec["topic"]
    
    html = f"""
    <div class="space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <!-- 🎒 İlkokul Öğretmen Girişi -->
        <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-2 border-emerald-300 text-emerald-950 font-medium space-y-4 shadow-sm">
            <div class="flex items-center gap-3 font-black text-lg sm:text-2xl text-emerald-900">
                <span class="text-3xl sm:text-4xl animate-bounce">🎒</span> 
                <span>Merhaba Arkadaşlar! {g_str} {subj} Dersi: <strong>{topic}</strong></span>
            </div>
            <p class="text-xs sm:text-sm text-emerald-950/90 leading-relaxed">
                Sevgili öğrenciler ve minik matematikçiler, bugün sizlerle birlikte çok eğlenceli ve günlük hayatımızda her gün kullandığımız harika bir konuyu öğreniyoruz: <strong>{topic}</strong>! Bu dersimizde karmaşık veya sıkıcı teoriler yok; oyunlarla, meyvelerle, sevimli hikayelerle ve rengarenk örneklerle konunun tüm sırlarını adım adım keşfedeceğiz. Sayfanın sonundaki <strong>20 soruluk renkli testi</strong> çözerek kendinize kocaman bir başarı yıldızı vermeyi unutmayın!
            </p>
            <div class="flex flex-wrap items-center gap-2.5 pt-2 text-xs font-bold text-emerald-800">
                <span class="px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 flex items-center gap-1">🎈 Eğlenceli ve Renkli Anlatım</span>
                <span class="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">⭐ Bol Bol Çözümlü Örnek</span>
                <span class="px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300 flex items-center gap-1">📝 20 Soruluk Tarama Testi</span>
                <span class="px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300 flex items-center gap-1">📥 Ücretsiz PDF Test İndir</span>
            </div>
        </div>

        <!-- BÖLÜM 1: {topic} Nedir ve Günlük Hayatta Nerede Karşımıza Çıkar? -->
        <section class="space-y-4" id="bolum-1-nedir">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-emerald-500">
                <span class="w-9 h-9 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm shadow">1</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    {topic} Nedir? Günlük Hayatımızda Nerede Kullanırız?
                </h3>
            </div>
            <p>
                Belki şimdiye kadar fark etmediniz ama aslında sabah uyanıp kahvaltı sofrasına oturduğunuz andan akşam uyuyana kadar <strong>{topic}</strong> konusunu her gün farkında olmadan kullanıyorsunuz! Matematik sadece defterde yazılan sayılardan ibaret değildir; etrafımızdaki dünyayı düzenleyen en tatlı oyundur.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                <div class="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
                    <div class="font-bold text-amber-950 flex items-center gap-2 text-sm sm:text-base">
                        <span>🍰</span> Doğum Günü Pastası ve Eşit Paylaşım
                    </div>
                    <p class="text-xs sm:text-sm text-amber-900 leading-relaxed">
                        Doğum gününüzde arkadaşlarınızla kocaman bir çikolatalı pastayı dilimlerken herkesin eşit parça almasını istemez misiniz? İşte bir bütünü parçalara ayırmak veya bilyelerinizi kardeşinizle eşit bölüşmek tam olarak <strong>{topic}</strong> mantığıdır.
                    </p>
                </div>
                <div class="p-5 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-2">
                    <div class="font-bold text-blue-950 flex items-center gap-2 text-sm sm:text-base">
                        <span>🛒</span> Manav ve Market Alışverişi
                    </div>
                    <p class="text-xs sm:text-sm text-blue-900 leading-relaxed">
                        Kırtasiyeden 3 deste boya kalemi alırken, bakkaldan ekmek ve süt alıp para üstünü hesaplarken veya kumbaranızdaki harçlıkları sayarken <strong>{topic}</strong> kurallarından güç alırız.
                    </p>
                </div>
            </div>
            <p>
                {g_str} seviyesinde bu konunun mantığını kavradığınızda, okulda öğretmeninizin sorduğu tüm parmak kaldırtan sorulara ilk cevabı siz vereceksiniz!
            </p>
        </section>

        <!-- BÖLÜM 2: Adım Adım Temel Bilgiler ve Kurallar -->
        <section class="space-y-4" id="bolum-2-kurallar">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-emerald-500">
                <span class="w-9 h-9 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm shadow">2</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    {topic} Konusunun Altın Kuralları (Bunu Bilen Asla Yanılmaz!)
                </h3>
            </div>
            <p>
                {topic} ile ilgili soruları çözerken aklımızda tutmamız gereken 4 sihirli kuralımız var. Bunları bir hazine haritası gibi düşünebilirsiniz:
            </p>
            <div class="space-y-3">
                <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                    <span class="font-black text-emerald-800 text-sm sm:text-base flex items-center gap-2">
                        <span>🔍 1. Kural:</span> Önce Sorunun Hikayesini Dikkatle Oku
                    </span>
                    <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        Acele etmek yok! Soruda bize kimler anlatılıyor? Kaç tane elma, kalem veya para var? Bizden neyi bulmamızı istiyor? Verilenleri yuvarlak içine alarak işe başlayın.
                    </p>
                </div>
                <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                    <span class="font-black text-emerald-800 text-sm sm:text-base flex items-center gap-2">
                        <span>🎨 2. Kural:</span> Şekil Çiz veya Gözünde Canlandır (Modelleme)
                    </span>
                    <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        Kafanız karıştığında hemen bir kenara kutucuklar, yuvarlaklar veya elma resimleri çizin. Gözümüzle gördüğümüz her şey zihnimizde 10 kat daha kolay çözülür!
                    </p>
                </div>
                <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                    <span class="font-black text-emerald-800 text-sm sm:text-base flex items-center gap-2">
                        <span>🪜 3. Kural:</span> Adım Adım İlerle (Basamakları Karıştırma)
                    </span>
                    <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        Toplama yaparken eldenizi sayının tepesine küçük bir yıldızla yazın. Çıkarma yaparken komşudan onluk aldığınızda sayının üstünü çizip yeni sayıyı yazmayı unutmayın.
                    </p>
                </div>
                <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                    <span class="font-black text-emerald-800 text-sm sm:text-base flex items-center gap-2">
                        <span>✅ 4. Kural:</span> Sağlama Yap (Sonucu Yerine Koy)
                    </span>
                    <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        Bulduğunuz sayıyı sorudaki cümleye koyarak bir kez yüksek sesle okuyun: 'Cevap mantıklı duruyor mu?' Eğer mantıklıysa tebrikler, tam puan cepte!
                    </p>
                </div>
            </div>
        </section>

        <!-- BÖLÜM 3: Soru Çözerken İzlenecek 3 Basit Adım -->
        <section class="space-y-4" id="bolum-3-yol-haritasi">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-emerald-500">
                <span class="w-9 h-9 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm shadow">3</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    Öğretmenin 3 Adımda Problem Çözme Protokolü
                </h3>
            </div>
            <div class="p-6 rounded-3xl bg-slate-900 text-white space-y-4 shadow-xl">
                <div class="flex items-center justify-between border-b border-slate-700 pb-3">
                    <span class="text-xs font-bold text-emerald-400 uppercase tracking-widest">★ Süper Kolay Çözüm Haritası</span>
                    <span class="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">MEB İlkokul</span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-200">
                    <div class="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1.5">
                        <strong class="text-yellow-300 block text-sm">1. Adım: Verilenleri Yaz</strong>
                        Neler biliyoruz? Ali'nin 15 bilyesi var, kardeşi 5 bilye verdi. Hepsini alt alta düzenli yaz.
                    </div>
                    <div class="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1.5">
                        <strong class="text-emerald-300 block text-sm">2. Adım: Hangi İşlem?</strong>
                        Sayılar artıyor mu (Toplama/Çarpma) yoksa azalıyor mu (Çıkarma/Bölme)? Doğru işlemi seç.
                    </div>
                    <div class="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1.5">
                        <strong class="text-cyan-300 block text-sm">3. Adım: Kontrol Et</strong>
                        İşlemi sakince yap. Bulduğun sayıyı kutucuğun içine yaz ve sağlamasını tamamla.
                    </div>
                </div>
            </div>
        </section>

        <!-- BÖLÜM 4: 6 Adet Eğlenceli Çözümlü Model Alıştırma -->
        <section class="space-y-5" id="bolum-4-cozumlu-ornekler">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-emerald-500">
                <span class="w-9 h-9 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm shadow">4</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    Birlikte Çözelim: 6 Eğlenceli Model Alıştırma
                </h3>
            </div>
            <p>
                Şimdi gelin, okul sınavlarında ve çalışma kağıtlarında karşınıza çıkabilecek 6 harika soru tipini adım adım birlikte çözelim:
            </p>

            <!-- Örnek 1 -->
            <div class="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span class="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-black">Örnek 1 (Temel Seviye)</span>
                    <span class="text-xs text-slate-400 font-semibold">Kolay &bull; Sayma &amp; Ekleme</span>
                </div>
                <div class="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    Ece'nin kitaplığında 24 tane masal kitabı vardır. Doğum gününde teyzesi Ece'ye 9 masal kitabı daha hediye etti. Ece bu kitaplardan 5 tanesini okuyup sınıf kitaplığına bağışladı. Buna göre Ece'nin kitaplığında en son kaç kitap kalmıştır?
                </div>
                <div class="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm text-emerald-950 space-y-2">
                    <div class="font-bold text-emerald-900 flex items-center gap-1.5">
                        <span>✅</span> Adım Adım Çözüm Basamakları:
                    </div>
                    <p><strong>1. Adım:</strong> Önce Ece'nin eline yeni kitaplar gelince toplam kitap sayısını bulalım: <code>24 + 9 = 33</code> kitap oldu.</p>
                    <p><strong>2. Adım:</strong> 5 tanesini bağışladığı için kitapları azaldı, çıkarma yapıyoruz: <code>33 - 5 = 28</code> kitap kalır.</p>
                    <p class="text-emerald-800 font-bold border-t border-emerald-200/80 pt-1.5">🌟 Harika İş! Sonuç: Kitaplıkta 28 kitap kalmıştır.</p>
                </div>
            </div>

            <!-- Örnek 2 -->
            <div class="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span class="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-black">Örnek 2 (Grup &amp; Kat)</span>
                    <span class="text-xs text-slate-400 font-semibold">Orta &bull; Eşit Paylaştırma</span>
                </div>
                <div class="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    Bir okul bahçesinde beden eğitimi dersi için 36 öğrenci toplanmıştır. Öğretmen her takımda eşit sayıda 4 öğrenci olacak şekilde takımlar kurmak istiyor. Buna göre kaç takım oluşur?
                </div>
                <div class="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs sm:text-sm text-blue-950 space-y-2">
                    <div class="font-bold text-blue-900 flex items-center gap-1.5">
                        <span>✅</span> Adım Adım Çözüm Basamakları:
                    </div>
                    <p><strong>1. Adım:</strong> Eşit paylaştırma denince aklımıza hemen bölme işlemi gelir!</p>
                    <p><strong>2. Adım:</strong> 36 öğrenciyi 4'e bölelim: <code>36 &divide; 4 = 9</code> takım oluşur.</p>
                    <p class="text-blue-800 font-bold border-t border-blue-200/80 pt-1.5">💡 Sağlama: 9 takım &times; 4 öğrenci = 36 öğrenci. Yanıtımız kesinlikle doğru!</p>
                </div>
            </div>

            <!-- Örnek 3 -->
            <div class="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span class="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 text-xs font-black">Örnek 3 (Günlük Hayat)</span>
                    <span class="text-xs text-slate-400 font-semibold">Para &amp; Kumbara Hesabı</span>
                </div>
                <div class="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    Burak her gün kumbarasına 8 TL harçlık atmaktadır. Burak 2 hafta (14 gün) boyunca hiç ara vermeden para biriktirdiğinde kumbarasından 40 TL alıp bir hikaye kitabı alıyor. Geriye kaç TL'si kalır?
                </div>
                <div class="p-4 rounded-xl bg-purple-50/70 border border-purple-200 text-xs sm:text-sm text-purple-950 space-y-2">
                    <div class="font-bold text-purple-900 flex items-center gap-1.5">
                        <span>✅</span> Adım Adım Çözüm Basamakları:
                    </div>
                    <p><strong>1. Adım:</strong> 14 gün boyunca günde 8 TL biriktirmiş: <code>14 &times; 8 = 112 TL</code> birikir.</p>
                    <p><strong>2. Adım:</strong> 40 TL harcadığı için çıkarma işlemi: <code>112 - 40 = 72 TL</code> parası kalır.</p>
                    <p class="text-purple-800 font-bold border-t border-purple-200/80 pt-1.5">🎯 Sonuç: Kumbarada kalan para 72 TL'dir.</p>
                </div>
            </div>

            <!-- Örnek 4 -->
            <div class="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span class="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 text-xs font-black">Örnek 4 (Hikayeli Problem)</span>
                    <span class="text-xs text-slate-400 font-semibold">Çift Çift Adımlar</span>
                </div>
                <div class="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    Bir çiftlikte 15 koyun ve 8 tavuk bulunmaktadır. Bu çiftlikteki tüm hayvanların ayak sayıları toplamı kaçtır?
                </div>
                <div class="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-2">
                    <div class="font-bold text-amber-900 flex items-center gap-1.5">
                        <span>✅</span> Adım Adım Çözüm Basamakları:
                    </div>
                    <p><strong>1. Adım (Koyunların Ayakları):</strong> Her koyunun 4 ayağı vardır: <code>15 &times; 4 = 60</code> ayak.</p>
                    <p><strong>2. Adım (Tavukların Ayakları):</strong> Her tavuğun 2 ayağı vardır: <code>8 &times; 2 = 16</code> ayak.</p>
                    <p><strong>3. Adım (Toplam):</strong> <code>60 + 16 = 76</code> toplam ayak sayısıdır.</p>
                </div>
            </div>

            <!-- Örnek 5 -->
            <div class="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span class="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 text-xs font-black">Örnek 5 (Basamak Değeri)</span>
                    <span class="text-xs text-slate-400 font-semibold">Büyüktür / Küçüktür</span>
                </div>
                <div class="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    Rakamları birbirinden farklı iki basamaklı en büyük sayı ile rakamları birbirinden farklı iki basamaklı en küçük sayının toplamı kaçtır?
                </div>
                <div class="p-4 rounded-xl bg-rose-50/70 border border-rose-200 text-xs sm:text-sm text-rose-950 space-y-2">
                    <div class="font-bold text-rose-900 flex items-center gap-1.5">
                        <span>✅</span> Adım Adım Çözüm Basamakları:
                    </div>
                    <p><strong>1. Adım:</strong> İki basamaklı en büyük sayı 99'dur ama rakamları farklı dediği için <strong>98</strong> olur.</p>
                    <p><strong>2. Adım:</strong> İki basamaklı en küçük sayı 10'dur (1 ve 0 rakamları zaten farklıdır), yani <strong>10</strong>'dur.</p>
                    <p><strong>3. Adım:</strong> Toplamları: <code>98 + 10 = 108</code> bulunur.</p>
                </div>
            </div>

            <!-- Örnek 6 -->
            <div class="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span class="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 text-xs font-black">Örnek 6 (Zaman &amp; Ölçme)</span>
                    <span class="text-xs text-slate-400 font-semibold">Saat &amp; Dakika</span>
                </div>
                <div class="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    Saat 14.15'te başlayan bir çizgi film 45 dakika sürmüştür. Çizgi film bittiğinde saat tam olarak kaçı gösterir?
                </div>
                <div class="p-4 rounded-xl bg-teal-50/70 border border-teal-200 text-xs sm:text-sm text-teal-950 space-y-2">
                    <div class="font-bold text-teal-900 flex items-center gap-1.5">
                        <span>✅</span> Adım Adım Çözüm Basamakları:
                    </div>
                    <p><strong>1. Adım:</strong> Dakikaları toplayalım: <code>15 + 45 = 60 dakika</code>.</p>
                    <p><strong>2. Adım:</strong> 60 dakika tam olarak 1 saate eşittir!</p>
                    <p><strong>3. Adım:</strong> 14.00'a 1 saat eklersek çizgi film saat tam <strong>15.00</strong>'te biter.</p>
                </div>
            </div>
        </section>

        <!-- BÖLÜM 5: Aman Dikkat! En Sık Yapılan Hatalar -->
        <section class="space-y-4" id="bolum-5-hatalar">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-rose-500">
                <span class="w-9 h-9 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-black text-sm shadow">5</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    Aman Dikkat! En Çok Yapılan Hatalar ve Doğruları
                </h3>
            </div>
            <p>
                Sınavlarda ve ödevlerde arkadaşlarınızın en çok düştüğü 3 tuzak noktayı öğrenelim ki siz aynı hataya düşmeyin:
            </p>
            <div class="space-y-3">
                <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                    <span class="font-bold text-rose-950 text-sm">❌ 1. Eldeyi Eklemeyi Unutmak</span>
                    <p class="text-xs sm:text-sm text-rose-900">
                        Toplama yaparken 8 + 5 = 13 bulup 3'ü yazıp 1 eldeyi hemen komşuya yazmayı unutanlar yanlış sonuca ulaşır. Eldeyi parmağınızda tutmayın, sayının üstüne minikçe yazın!
                    </p>
                </div>
                <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                    <span class="font-bold text-rose-950 text-sm">❌ 2. Onluk Bozmayı Atlayıp Tersine Çıkarmak</span>
                    <p class="text-xs sm:text-sm text-rose-900">
                        Örneğin 42'den 17 çıkarırken 2'den 7 çıkmaz. Bazı arkadaşlarımız 7'den 2'yi çıkarıp 5 yazıyor, bu çok büyük bir hatadır! Mutlaka komşu onlar basamağına gidip 1 onluk almalıyız.
                    </p>
                </div>
                <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                    <span class="font-bold text-rose-950 text-sm">❌ 3. Sorunun Sonundaki 'Kaç Kaldı?' Kelimesini Atlamak</span>
                    <p class="text-xs sm:text-sm text-rose-900">
                        Soruda kaç harcandığı mı soruluyor yoksa geriye kaç kaldığı mı? Soru kökünü daima son kelimesine kadar sabırla okuyunuz.
                    </p>
                </div>
            </div>
        </section>

        <!-- BÖLÜM 6: Zihin Haritası ve 60 Saniyede Özet -->
        <section class="space-y-4" id="bolum-6-ozet">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-emerald-500">
                <span class="w-9 h-9 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm shadow">6</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    60 Saniyede Süper Hızlı Özet &amp; Şimdi Sıra Sende!
                </h3>
            </div>
            <div class="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 space-y-3 text-xs sm:text-sm text-emerald-950">
                <div class="font-black text-emerald-900 text-base">🎉 Tebrikler! {topic} Konusunu Başarıyla Tamamladın!</div>
                <p>
                    Artık bu konunun tüm kurallarını, adım adım işlem yapmayı ve tuzak noktaları biliyorsun. Şimdi bilgilerini test etmek için hemen aşağıda yer alan <strong>20 soruluk renkli testi</strong> çözmeye başla. Takıldığın her soruda ayrıntılı çözüm sana yol gösterecek!
                </p>
            </div>
        </section>
    </div>
    """
    return html

def generate_middle_student_theory(spec):
    g_str = spec["grade_str"]
    g_num = spec["grade_num"]
    subj = spec["subject"]
    topic = spec["topic"]
    
    html = f"""
    <div class="space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <!-- 🚀 Ortaokul & LGS Öğretmen Girişi -->
        <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 border-2 border-purple-200 text-purple-950 font-medium space-y-4 shadow-sm">
            <div class="flex items-center gap-3 font-black text-lg sm:text-2xl text-purple-950">
                <span class="text-3xl sm:text-4xl">🚀</span> 
                <span>Merhaba Arkadaşlar! {g_str} {subj}: <strong>{topic}</strong></span>
            </div>
            <p class="text-xs sm:text-sm text-purple-900/90 leading-relaxed">
                Değerli ortaokul öğrencileri ve geleceğin lise şampiyonları! Bu dersimizde <strong>{g_str} {subj}</strong> dersinin en kritik, sınavlarda ve MEB LGS oturumlarında en çok soru getiren konularından biri olan <strong>{topic}</strong> konusunu A'dan Z'ye ele alıyoruz. Ezberci kalıpları tamamen yıkarak kuralların mantığını, yeni nesil paragraf ve şekilli soruları nasıl okumanız gerektiğini ve en pratik çözüm yöntemlerini öğreneceksiniz.
            </p>
            <div class="flex flex-wrap items-center gap-2.5 pt-2 text-xs font-bold text-purple-800">
                <span class="px-3 py-1 rounded-full bg-purple-100 border border-purple-300">🎯 LGS &amp; Yazılı Odaklı Anlatım</span>
                <span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">💡 Yeni Nesil Soru Çözüm Taktikleri</span>
                <span class="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">📝 20 Soru Çözümlü Test</span>
                <span class="px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300">📥 Ücretsiz PDF Test İndir</span>
            </div>
        </div>

        <!-- BÖLÜM 1: Konunun Mantığı ve Sınavlardaki Önemi -->
        <section class="space-y-4" id="bolum-1-mantik">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-purple-600">
                <span class="w-9 h-9 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black text-sm shadow">1</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    {topic} Konusunun Mantığı ve LGS Sınavındaki Yeri
                </h3>
            </div>
            <p>
                Ortaokul müfredatında yer alan <strong>{topic}</strong> konusu, öğrencilerin soyut cebirsel ve mantıksal düşünmeye adım attığı en önemli kavşak noktalarından biridir. MEB ortak yazılı sınavlarında ve LGS'de bu konudan doğrudan sorular geldiği gibi, diğer karmaşık ünitelerin soru köklerinde de {topic} kuralları öncül adım olarak sorgulanır.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                <div class="p-5 rounded-2xl bg-white border border-purple-100 shadow-sm space-y-2">
                    <div class="font-bold text-purple-900 text-sm flex items-center gap-2">
                        <span>🎯</span> Sınavlardaki Soru Dağılımı ve Rolü
                    </div>
                    <p class="text-xs text-slate-600 leading-relaxed">
                        MEB müfredatında {topic} konusundan her dönem ortalama 2 ila 4 soru sorulur. LGS'de bu sorular genellikle uzun paragraflı, grafikli veya günlük hayat kurgulu 'beceri temelli' formatta karşımıza çıkar.
                    </p>
                </div>
                <div class="p-5 rounded-2xl bg-white border border-indigo-100 shadow-sm space-y-2">
                    <div class="font-bold text-indigo-900 text-sm flex items-center gap-2">
                        <span>🌍</span> Günlük Hayattaki Pratik Karşılığı
                    </div>
                    <p class="text-xs text-slate-600 leading-relaxed">
                        Mühendislik projelerinden akıllı telefon algoritmalarına, indirimli fiyat kıyaslamalarından hız ve rota planlamalarına kadar her yerde {topic} prensipleri kullanılır.
                    </p>
                </div>
            </div>
        </section>

        <!-- BÖLÜM 2: Temel Kurallar ve Formüller -->
        <section class="space-y-4" id="bolum-2-kurallar">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-purple-600">
                <span class="w-9 h-9 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black text-sm shadow">2</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    Temel Kurallar, Tanımlar ve Formüller
                </h3>
            </div>
            <p>
                {topic} sorularını çözerken mutlaka bilmeniz gereken kural ve ilkeleri madde madde öğrenelim:
            </p>
            <div class="space-y-3">
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span class="font-bold text-slate-900 text-sm block mb-1">1. Temel Tanım ve Değişken İlişkisi:</span>
                    <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {topic} sürecinde verilen niceliklerin birbirini nasıl etkilediğini tespit edin. Biri artarken diğeri artıyor mu (Doğru orantı) yoksa azalıyor mu (Ters orantı)?
                    </p>
                </div>
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span class="font-bold text-slate-900 text-sm block mb-1">2. İşlem Sırası ve Parantez Kuralı:</span>
                    <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        İşlem önceliğinde kuralımız nettir: Önce parantez içi, sonra üslü ifadeler, ardından çarpma/bölme ve son olarak toplama/çıkarma uygulanır.
                    </p>
                </div>
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span class="font-bold text-slate-900 text-sm block mb-1">3. Eşitliğin Dengesi:</span>
                    <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        Denklemler tıpkı dengede duran iki kefeli bir terazi gibidir. Eşitliğin bir tarafına ne yapıyorsanız diğer tarafına da aynısını yapmalısınız!
                    </p>
                </div>
            </div>
        </section>

        <!-- BÖLÜM 3: Yeni Nesil Sorularda Problem Çözme Protokolü -->
        <section class="space-y-4" id="bolum-3-yeni-nesil">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-purple-600">
                <span class="w-9 h-9 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black text-sm shadow">3</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    Yeni Nesil LGS Sorularında Nasıl Düşünmeliyiz?
                </h3>
            </div>
            <div class="p-6 rounded-3xl bg-slate-900 text-white space-y-4 shadow-xl">
                <div class="text-xs font-bold text-purple-400 uppercase tracking-widest">
                    ★ LGS Soru Çözüm Yol Haritası
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                    <div class="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                        <strong class="text-yellow-300 block">1. Şekli ve Tabloyu İncele</strong>
                        Önce verilen görseli, grafiği veya şemayı gözden geçirin.
                    </div>
                    <div class="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                        <strong class="text-emerald-300 block">2. Paragrafı Sadeleştir</strong>
                        Hikaye kısmındaki gereksiz sözcükleri eleyip sayıları not alın.
                    </div>
                    <div class="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                        <strong class="text-purple-300 block">3. Denklemi Kur</strong>
                        İstenen değere 'x' deyin ve eşitliği oluşturun.
                    </div>
                    <div class="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                        <strong class="text-cyan-300 block">4. Çöz ve Sağla</strong>
                        İşlemi sakince yapıp şıkları eleyerek cevabı işaretleyin.
                    </div>
                </div>
            </div>
        </section>

        <!-- BÖLÜM 4: 5 Adet Çözümlü Model Soru -->
        <section class="space-y-5" id="bolum-4-cozumlu-ornekler">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-purple-600">
                <span class="w-9 h-9 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black text-sm shadow">4</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    Ayrıntılı Çözümlü 5 Model Soru (Yazılı &amp; LGS Seviyelerinde)
                </h3>
            </div>
            <p>
                Konuyu pekiştirmenin en kesin yolu, farklı kalıplardaki soruların mantığını kavramaktır:
            </p>

            <!-- Model Soru 1 -->
            <div class="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span class="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-black">Model Soru 1 (Temel Kazanım)</span>
                    <span class="text-xs text-slate-400 font-semibold">Zorluk: Kolay</span>
                </div>
                <div class="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    {g_str} {subj} dersi {topic} konusu kapsamında; bir niceliğin değeri 60 iken %20 artırılıyor. Elde edilen değer üzerinden 1/4 oranında azaltma yapıldığında son sayısal değer kaç olur?
                </div>
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2">
                    <div class="font-bold text-emerald-800">✅ Adım Adım Çözüm Basamakları:</div>
                    <p><strong>1. Adım:</strong> 60 sayısının %20'si: <code>60 &times; (20/100) = 12</code> artış olur. Yeni değer: <code>60 + 12 = 72</code>.</p>
                    <p><strong>2. Adım:</strong> 72'nin 1/4'i: <code>72 / 4 = 18</code> azalma olacaktır.</p>
                    <p><strong>3. Adım:</strong> Son değer: <code>72 - 18 = 54</code> olarak bulunur.</p>
                    <p class="text-indigo-900 font-bold border-t border-slate-200 pt-1">💡 Öğretmen Notu: Yüzde artıştan sonra elde edilen yeni taban değer üzerinden işlem yapmayı unutmayın!</p>
                </div>
            </div>

            <!-- Model Soru 2 -->
            <div class="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span class="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-black">Model Soru 2 (İşlem &amp; Denklem)</span>
                    <span class="text-xs text-slate-400 font-semibold">Zorluk: Orta</span>
                </div>
                <div class="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    Bir sınıftaki öğrenciler sıralara 2'şerli oturursa 5 öğrenci ayakta kalıyor. 3'erli otururlarsa 2 sıra boş kalıyor. Buna göre bu sınıfta kaç öğrenci vardır?
                </div>
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2">
                    <div class="font-bold text-emerald-800">✅ Adım Adım Çözüm Basamakları:</div>
                    <p><strong>1. Adım:</strong> Sıra sayısına 'x' diyelim.</p>
                    <p><strong>2. Adım:</strong> 1. duruma göre öğrenci sayısı: <code>2x + 5</code>.</p>
                    <p><strong>3. Adım:</strong> 2. duruma göre öğrenci sayısı: <code>3(x - 2) = 3x - 6</code>.</p>
                    <p><strong>4. Adım:</strong> Öğrenci sayıları eşit olduğundan: <code>2x + 5 = 3x - 6 &rArr; x = 11</code> sıra vardır.</p>
                    <p><strong>Sonuç:</strong> Öğrenci sayısı = <code>2(11) + 5 = 27</code> öğrencidir.</p>
                </div>
            </div>

            <!-- Model Soru 3 -->
            <div class="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span class="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 text-xs font-black">Model Soru 3 (Yeni Nesil LGS Beceri Temelli)</span>
                    <span class="text-xs text-slate-400 font-semibold">LGS Formatında</span>
                </div>
                <div class="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    Boyutları 180 cm ve 240 cm olan dikdörtgen şeklindeki bir bahçenin etrafına ve köşelerine eşit aralıklarla en az sayıda fidan dikilecektir. İki fidan arası mesafe kaç metre olmalıdır ve toplam kaç fidan gereklidir?
                </div>
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2">
                    <div class="font-bold text-emerald-800">✅ Adım Adım Çözüm Basamakları:</div>
                    <p><strong>1. Adım:</strong> Fidan sayısının en az olması için iki fidan arasındaki mesafenin EN BÜYÜK olması gerekir. Bu da EBOB almayı gerektirir.</p>
                    <p><strong>2. Adım:</strong> <code>EBOB(180, 240) = 60 cm = 0,6 metre</code> fidanlar arası mesafedir.</p>
                    <p><strong>3. Adım:</strong> Bahçenin çevresi: <code>2 &times; (180 + 240) = 2 &times; 420 = 840 cm</code>.</p>
                    <p><strong>4. Adım:</strong> Toplam fidan: <code>840 / 60 = 14</code> fidan gereklidir.</p>
                </div>
            </div>

            <!-- Model Soru 4 -->
            <div class="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span class="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 text-xs font-black">Model Soru 4 (Grafik Analizi)</span>
                    <span class="text-xs text-slate-400 font-semibold">Görsel Yorumlama</span>
                </div>
                <div class="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    Zamana bağlı su akıtan bir musluk boş bir havuzu 12 saatte doldurmaktadır. Havuzun 2/3'ü dolduktan sonra musluğun akış hızı yarıya indirilirse kalan kısım kaç saatte dolar?
                </div>
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2">
                    <div class="font-bold text-emerald-800">✅ Adım Adım Çözüm Basamakları:</div>
                    <p><strong>1. Adım:</strong> Havuzun tamamı 12 saatte doluyorsa, 1/3'ü normal hızla <code>12 / 3 = 4</code> saatte dolar.</p>
                    <p><strong>2. Adım:</strong> Geriye kalan kısım havuzun 1/3'üdür.</p>
                    <p><strong>3. Adım:</strong> Musluğun hızı yarıya inince dolma süresi 2 KATINA çıkar: <code>4 &times; 2 = 8</code> saatte dolar.</p>
                </div>
            </div>

            <!-- Model Soru 5 -->
            <div class="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span class="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 text-xs font-black">Model Soru 5 (İleri Düzey Soru)</span>
                    <span class="text-xs text-slate-400 font-semibold">LGS Derece Sorusu</span>
                </div>
                <div class="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    a ve b aralarında asal iki pozitif tam sayıdır. <code>EBOB(a, b) + EKOK(a, b) = 73</code> olduğuna göre, a + b toplamının alabileceği en küçük değer kaçtır?
                </div>
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2">
                    <div class="font-bold text-emerald-800">✅ Adım Adım Çözüm Basamakları:</div>
                    <p><strong>1. Adım:</strong> Aralarında asal iki sayının EBOB'u daima <strong>1</strong>'e eşittir: <code>EBOB(a, b) = 1</code>.</p>
                    <p><strong>2. Adım:</strong> Eşitlikte yerine yazalım: <code>1 + EKOK(a, b) = 73 &rArr; EKOK(a, b) = 72</code>.</p>
                    <p><strong>3. Adım:</strong> Aralarında asal iki sayının EKOK'u çarpımlarına eşittir: <code>a &times; b = 72</code>.</p>
                    <p><strong>4. Adım:</strong> Çarpımları 72 olan aralarında asal sayılar: (1, 72) ve (8, 9)'dur. Toplamın en küçük olması için sayılar birbirine en yakın seçilir: <code>8 + 9 = 17</code> bulunur!</p>
                </div>
            </div>
        </section>

        <!-- BÖLÜM 5: Öğretmenin LGS Kısayolları ve Hız Taktikleri -->
        <section class="space-y-4" id="bolum-5-taktikler">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-purple-600">
                <span class="w-9 h-9 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black text-sm shadow">5</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    Öğretmenin LGS Kısayolları ve Hız Taktikleri
                </h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1.5">
                    <div class="font-bold text-amber-950 text-sm">⚡ Taktik 1: Şıklardan Eleme Yöntemi</div>
                    <p class="text-xs text-amber-900 leading-relaxed">
                        Cebirsel veya denklem kurma sorularında x yerine şıklardaki tam sayıları deneyerek 15 saniyede sonuca ulaşabilirsiniz.
                    </p>
                </div>
                <div class="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1.5">
                    <div class="font-bold text-blue-950 text-sm">⚡ Taktik 2: Birim Dönüşümlerini Hemen Yapın</div>
                    <p class="text-xs text-blue-900 leading-relaxed">
                        Metre verilip santimetre istendiğinde işlemi yapmadan önce hemen birimleri eşitleyin, son adıma bırakırsanız unutursunuz!
                    </p>
                </div>
            </div>
        </section>

        <!-- BÖLÜM 6: En Sık Yapılan 5 Hata -->
        <section class="space-y-4" id="bolum-6-hatalar">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-rose-500">
                <span class="w-9 h-9 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-black text-sm shadow">6</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    Sınavlarda En Çok Puan Kaybettiren Hatalar
                </h3>
            </div>
            <div class="space-y-3">
                <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                    <span class="font-bold text-rose-950 text-sm">❌ 1. Parantez Önündeki Eksiyi (-) Dağıtmamak</span>
                    <p class="text-xs sm:text-sm text-rose-900">
                        <code>-(2x - 6)</code> ifadesi <code>-2x - 6</code> DEĞİL, <strong>-2x + 6</strong>'dır!
                    </p>
                </div>
                <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                    <span class="font-bold text-rose-950 text-sm">❌ 2. Kesim Sayısı ile Parça Sayısını Karıştırmak</span>
                    <p class="text-xs sm:text-sm text-rose-900">
                        Bir bütünü 6 parçaya bölmek için 6 kesim değil, <strong>5 kesim</strong> yapılır!
                    </p>
                </div>
            </div>
        </section>

        <!-- BÖLÜM 7: Zihin Haritası ve Özet -->
        <section class="space-y-4" id="bolum-7-ozet">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-purple-600">
                <span class="w-9 h-9 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black text-sm shadow">7</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    Zihin Haritası ve 60 Saniyede Sınav Tekrarı
                </h3>
            </div>
            <div class="p-6 rounded-3xl bg-purple-50 border border-purple-200 space-y-3 text-xs sm:text-sm text-purple-950">
                <p>
                    <strong>Tebrikler!</strong> {topic} konusunun tüm kurallarını ve LGS çözüm taktiklerini öğrendiniz. Şimdi hemen aşağıdaki <strong>20 soruluk yeni nesil testi</strong> çözerek başarınızı pekiştirin!
                </p>
            </div>
        </section>
    </div>
    """
    return html

def generate_high_student_theory(spec):
    g_str = spec["grade_str"]
    g_num = spec["grade_num"]
    subj = spec["subject"]
    topic = spec["topic"]
    
    html = f"""
    <div class="space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <!-- 🎓 Lise & YKS Öğretmen Girişi -->
        <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-50 via-blue-50 to-slate-50 border-2 border-indigo-200 text-indigo-950 font-medium space-y-4 shadow-sm">
            <div class="flex items-center gap-3 font-black text-lg sm:text-2xl text-indigo-950">
                <span class="text-3xl sm:text-4xl">🎓</span> 
                <span>Merhaba Üniversite Adayları! {g_str} {subj}: <strong>{topic}</strong></span>
            </div>
            <p class="text-xs sm:text-sm text-indigo-900/90 leading-relaxed">
                Değerli {g_str} öğrencileri ve YKS (TYT - AYT) sınavına hazırlanan adaylar! Bu kapsamlı ders rehberinde, hem okul ortak yazılı sınavlarında hem de ÖSYM'nin merkezi sınavlarında en çok soru getiren <strong>{topic}</strong> konusunu doğrudan soru çözdüren formülleri, grafiksel analizleri ve ÖSYM'nin çeldirici soru kalıplarıyla inceliyoruz. Ezbere dayalı bilgi yerine fonksiyonel ve analitik akıl yürütme stratejileriyle konuyu %100 kavrayacaksınız.
            </p>
            <div class="flex flex-wrap items-center gap-2.5 pt-2 text-xs font-bold text-indigo-800">
                <span class="px-3 py-1 rounded-full bg-indigo-100 border border-indigo-300">🎯 YKS (TYT-AYT) Odaklı</span>
                <span class="px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300">📊 Formül Kartları &amp; Analitik Çıkarımlar</span>
                <span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">📝 20 Soru Çözümlü Test</span>
                <span class="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">📥 Ücretsiz PDF Test İndir</span>
            </div>
        </div>

        <!-- BÖLÜM 1: Konunun Önemi ve ÖSYM Soru Analizi -->
        <section class="space-y-4" id="bolum-1-osym">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-indigo-600">
                <span class="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow">1</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    {topic} Konusunun Önemi ve ÖSYM Trendleri
                </h3>
            </div>
            <p>
                Lise düzeyinde {topic}, salt sayısal işlem becerisinin ötesine geçerek cebirsel bağıntı kurma, değişkenler arasındaki fonksiyonel ilişkiyi okuma ve grafiksel eğilimleri yorumlama gücü kazandırır.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                <div class="p-5 rounded-2xl bg-white border border-indigo-100 shadow-sm space-y-2">
                    <div class="font-bold text-indigo-900 text-sm flex items-center gap-2">
                        <span>🎯</span> TYT &amp; AYT Sınavlarındaki Yeri
                    </div>
                    <p class="text-xs text-slate-600 leading-relaxed">
                        ÖSYM'nin son yıllardaki soru tarzı doğrudan formül sormak yerine, konunun temel mantığını modelleyen yeni nesil senaryolar üzerine kuruludur. Bu üniteden gelen sorular sınavda belirleyici ve eleyici nitelik taşır.
                    </p>
                </div>
                <div class="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-2">
                    <div class="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <span>📐</span> Analitik ve İleri Konularla Bağlantısı
                    </div>
                    <p class="text-xs text-slate-600 leading-relaxed">
                        Türev, integral, analitik geometri, trigonometri veya ileri fen derslerinin (fizik-kimya) sorularında {topic} kazanımları öncül şart olarak karşımıza çıkar.
                    </p>
                </div>
            </div>
        </section>

        <!-- BÖLÜM 2: Formül Kartları ve Kurallar -->
        <section class="space-y-4" id="bolum-2-formuller">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-indigo-600">
                <span class="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow">2</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    Önemli Kurallar, Formül Kartları ve Özellikler
                </h3>
            </div>
            <div class="p-6 rounded-3xl bg-slate-900 text-white space-y-4 shadow-xl">
                <div class="flex items-center justify-between border-b border-slate-700 pb-3">
                    <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest">★ ÖSYM Formül Kartı</span>
                    <span class="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">MEB 2026-2027</span>
                </div>
                <div class="space-y-2 text-center py-3">
                    <div class="text-lg sm:text-2xl font-black text-yellow-300 font-mono tracking-wide">
                        {topic} Temel Analiz Bağıntısı: &emsp; f(x) = k &middot; g(x) &plusmn; C
                    </div>
                    <p class="text-xs text-slate-300 max-w-xl mx-auto">
                        Burada <strong>k</strong> orantı/değişim katsayısını, <strong>g(x)</strong> bağımsız değişken fonksiyonunu, <strong>C</strong> ise sınır referans sabitini simgeler.
                    </p>
                </div>
            </div>
        </section>

        <!-- BÖLÜM 3: 5 Adet Çözümlü Model Soru -->
        <section class="space-y-5" id="bolum-3-cozumlu-ornekler">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-indigo-600">
                <span class="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow">3</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    Ayrıntılı Çözümlü 5 Model Soru (ÖSYM &amp; Sınav Tipi)
                </h3>
            </div>

            <!-- Model Soru 1 -->
            <div class="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span class="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-black">Model Soru 1 (Temel Kavrama)</span>
                    <span class="text-xs text-slate-400 font-semibold">TYT Seviyesi</span>
                </div>
                <div class="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    {g_str} {subj} dersi {topic} kapsamında; f(x) = 2x + 5 fonksiyonu için f(3a - 1) = 25 olduğuna göre 'a' gerçel sayısı kaçtır?
                </div>
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2">
                    <div class="font-bold text-emerald-800">✅ Çözüm Adımları:</div>
                    <p><strong>1. Adım:</strong> x yerine (3a - 1) yazalım: <code>f(3a - 1) = 2(3a - 1) + 5 = 6a - 2 + 5 = 6a + 3</code>.</p>
                    <p><strong>2. Adım:</strong> 25'e eşitleyelim: <code>6a + 3 = 25 &rArr; 6a = 22 &rArr; a = 22/6 = 11/3</code> olarak bulunur.</p>
                </div>
            </div>

            <!-- Model Soru 2 -->
            <div class="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span class="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-black">Model Soru 2 (Grafik &amp; Eğim)</span>
                    <span class="text-xs text-slate-400 font-semibold">Analitik Yorumlama</span>
                </div>
                <div class="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    Doğrusal bir f(x) fonksiyonunun grafiği (2, 7) ve (4, 15) noktalarından geçmektedir. Buna göre f(10) değeri kaçtır?
                </div>
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2">
                    <div class="font-bold text-emerald-800">✅ Çözüm Adımları:</div>
                    <p><strong>1. Adım (Eğim m):</strong> <code>m = (15 - 7) / (4 - 2) = 8 / 2 = 4</code>.</p>
                    <p><strong>2. Adım (Fonksiyon Kuralı):</strong> <code>f(x) = 4x + n</code>. (2, 7) noktası için: <code>7 = 4(2) + n &rArr; n = -1</code>.</p>
                    <p><strong>3. Adım:</strong> <code>f(x) = 4x - 1 &rArr; f(10) = 4(10) - 1 = 39</code> bulunur.</p>
                </div>
            </div>

            <!-- Model Soru 3 -->
            <div class="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span class="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 text-xs font-black">Model Soru 3 (Yeni Nesil ÖSYM)</span>
                    <span class="text-xs text-slate-400 font-semibold">TYT / AYT Tipi</span>
                </div>
                <div class="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    Bir fabrikada {topic} ilkeleri kullanılarak üretilen x adet ürünün toplam maliyeti <code>C(x) = x&sup2; - 40x + 500</code> TL'dir. Buna göre maliyetin en az olması için kaç adet ürün üretilmelidir?
                </div>
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2">
                    <div class="font-bold text-emerald-800">✅ Çözüm Adımları:</div>
                    <p><strong>1. Adım:</strong> Bu bir ikinci dereceden fonksiyondur (kolları yukarı bakan parabol).</p>
                    <p><strong>2. Adım:</strong> En küçük değer parabolün tepe noktasında (r) gerçekleşir: <code>r = -b / (2a) = -(-40) / (2 &times; 1) = 40 / 2 = 20</code>.</p>
                    <p><strong>Sonuç:</strong> En düşük maliyet için <strong>20 adet</strong> ürün üretilmelidir.</p>
                </div>
            </div>

            <!-- Model Soru 4 -->
            <div class="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span class="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 text-xs font-black">Model Soru 4 (Eşitsizlik &amp; Aralık)</span>
                    <span class="text-xs text-slate-400 font-semibold">Kök Analizi</span>
                </div>
                <div class="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    <code>(x - 3)(x + 5) &le; 0</code> eşitsizliğini sağlayan x tam sayılarının toplamı kaçtır?
                </div>
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2">
                    <div class="font-bold text-emerald-800">✅ Çözüm Adımları:</div>
                    <p><strong>1. Adım:</strong> Kökler: x = 3 ve x = -5'tir.</p>
                    <p><strong>2. Adım:</strong> İşaret tablosunda çözüm aralığı: <code>[-5, 3]</code> kapalı aralığıdır.</p>
                    <p><strong>3. Adım:</strong> Toplam: <code>-5 + (-4) + (-3) + (-2) + (-1) + 0 + 1 + 2 + 3 = -9</code> bulunur.</p>
                </div>
            </div>

            <!-- Model Soru 5 -->
            <div class="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span class="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 text-xs font-black">Model Soru 5 (Derece Sorusu)</span>
                    <span class="text-xs text-slate-400 font-semibold">AYT Seviyesi</span>
                </div>
                <div class="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    f(x) birebir ve örten bir fonksiyon olmak üzere <code>f(x) = (3x + 1) / (x - 2)</code> olduğuna göre f⁻¹(5) değeri kaçtır?
                </div>
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2">
                    <div class="font-bold text-emerald-800">✅ Çözüm Adımları:</div>
                    <p><strong>1. Adım:</strong> <code>f⁻¹(5) = k &rArr; f(k) = 5</code> kuralı uygulanır.</p>
                    <p><strong>2. Adım:</strong> <code>(3k + 1) / (k - 2) = 5 &rArr; 3k + 1 = 5k - 10 &rArr; 2k = 11 &rArr; k = 11/2</code> bulunur.</p>
                </div>
            </div>
        </section>

        <!-- BÖLÜM 4: ÖSYM Çeldiricileri ve En Sık Yapılan Hatalar -->
        <section class="space-y-4" id="bolum-4-hatalar">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-rose-600">
                <span class="w-9 h-9 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-black text-sm shadow">4</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    ÖSYM Sınavlarında En Sık Yapılan 3 Hata
                </h3>
            </div>
            <div class="space-y-3">
                <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                    <span class="font-bold text-rose-950 text-sm">❌ 1. Tanım Kümesini İhmal Etmek (Paydayı Sıfır Yapan Kökler)</span>
                    <p class="text-xs sm:text-sm text-rose-900">
                        Rasyonel ifadelerde paydayı sıfır yapan kökler çözüm kümesine asla dahil edilemez.
                    </p>
                </div>
                <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                    <span class="font-bold text-rose-950 text-sm">❌ 2. Sadeleştirme Yaparken Kök Kaybetmek</span>
                    <p class="text-xs sm:text-sm text-rose-900">
                        Denklemin her iki tarafındaki x çarpanını doğrudan sadeleştirirken x = 0 kökünü yok saymak net kaybettirir!
                    </p>
                </div>
            </div>
        </section>

        <!-- BÖLÜM 5: Sınav Öncesi 60 Saniyede Özet -->
        <section class="space-y-4" id="bolum-5-ozet">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-indigo-600">
                <span class="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow">5</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    Sınav Öncesi 60 Saniyede Hızlı Tekrar
                </h3>
            </div>
            <div class="p-6 rounded-3xl bg-indigo-50 border border-indigo-200 space-y-3 text-xs sm:text-sm text-indigo-950">
                <p>
                    <strong>Tebrikler!</strong> {topic} konusunun sınav mantığını ve soru tiplerini öğrendiniz. Şimdi aşağıdaki <strong>20 soruluk yeni nesil testi</strong> çözerek bilgilerinizi pekiştirin!
                </p>
            </div>
        </section>
    </div>
    """
    return html
