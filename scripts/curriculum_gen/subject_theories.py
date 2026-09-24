# -*- coding: utf-8 -*-
"""
Subject-Specific Pedagogical Theory Generator for Matemetrik.
Strictly adapts tone, pedagogical approach, examples, common traps, and terminology by subject:
1. Türkçe & Türk Dili ve Edebiyatı:
   - Gramer, anlam bilgisi, sözcük tahlili, metin türleri, edebiyat dönemleri, nazım biçimleri.
   - ZERO math formulas or math examples!
2. Fen Bilimleri & Fizik:
   - Deney tasarımları, hipotezler, bağımlı/bağımsız değişkenler, fiziksel yasalar (F=ma vb.).
   - ZERO irrelevant math polynomials!
3. Kimya:
   - Maddenin yapısı, periyodik sistem, kimyasal bağlar, tepkimeler, mol hesaplamaları, çözeltiler, organik kimya.
4. Biyoloji:
   - Hücre, organeller, mitoz/mayoz, Mendel genetiği, insan sistemleri, fotosentez/solunum, ekoloji.
5. Tarih, T.C. İnkılap Tarihi & Sosyal Bilgiler:
   - Tarihsel kronoloji, neden-sonuç zinciri, antlaşmalar, Atatürk ilkeleri ve inkılapları, harita bilgisi.
   - ZERO math!
6. Matematik:
   - Sınıf düzeyine uygun sayılar, cebir, geometri, fonksiyonlar, analiz, problem çözme stratejileri.
"""

def generate_turkish_subject_theory(spec):
    g_str = spec["grade_str"]
    topic = spec["topic"]
    slug = spec["slug"]
    
    return f"""
    <div class="space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <!-- 👩‍🏫 Türkçe & Edebiyat Öğretmeni Girişi -->
        <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-2 border-amber-300 text-amber-950 font-medium space-y-4 shadow-sm">
            <div class="flex items-center gap-3 font-black text-lg sm:text-2xl text-amber-900">
                <span class="text-3xl sm:text-4xl">📚</span>
                <span>Türkçe Öğretmenimiz Anlatıyor: <strong>{g_str} {topic}</strong></span>
            </div>
            <p class="text-xs sm:text-sm text-amber-950/90 leading-relaxed">
                Değerli öğrencilerimiz, bu dersimizde {g_str} müfredatının en önemli ve sınavlarda en çok soru getiren konularından biri olan <strong>{topic}</strong> konusunu A'dan Z'ye inceliyoruz. Ezbere dayalı kuralları bir kenara bırakıp dilimizin mantığını, cümle ve metin içerisindeki kullanım inceliklerini ve MEB / ÖSYM sınavlarında puan kazandıran pratik taktikleri adım adım öğreneceğiz.
            </p>
            <div class="flex flex-wrap items-center gap-2.5 pt-2 text-xs font-bold text-amber-900">
                <span class="px-3 py-1 rounded-full bg-amber-100 border border-amber-300">📖 Anlam &amp; Dil Bilgisi Odaklı</span>
                <span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">💡 Çözümlü Cümle ve Metin Örnekleri</span>
                <span class="px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300">📝 20 Soruluk Özgün Test</span>
                <span class="px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300">📥 Ücretsiz PDF Test İndir</span>
            </div>
        </div>

        <!-- BÖLÜM 1: Konunun Özü ve Temel Kavramlar -->
        <section class="space-y-4" id="bolum-1-ozet">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-amber-500">
                <span class="w-9 h-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-sm shadow">1</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    {topic} Konusunun Özü ve Temel Kavramlar
                </h3>
            </div>
            <p>
                Türkçede sözcüklerin anlamları ve görevleri tek başına değil, <strong>cümle ve metin içerisindeki bağlama</strong> göre değer kazanır. <strong>{topic}</strong> konusu, okuduğunu doğru anlama, düşünceyi etkili aktarma ve metinlerdeki dil bilgisel bağıntıları çözme becerisinin temelidir.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                <div class="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-2">
                    <div class="font-bold text-amber-950 flex items-center gap-2 text-sm sm:text-base">
                        <span>🔍</span> Temel Anlam ve Yapı Özellikleri
                    </div>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Kelimeler kök ve eklerden meydana gelir. Cümle içerisindeki eklerin işlevi, sözcüğün türünü (isim, sıfat, fiil, zamir, zarf) ve anlam yönünü doğrudan belirler.
                    </p>
                </div>
                <div class="p-5 rounded-2xl bg-white border border-orange-200 shadow-sm space-y-2">
                    <div class="font-bold text-orange-950 flex items-center gap-2 text-sm sm:text-base">
                        <span>🎯</span> Sınavlardaki Soru Tarzı ve Ağırlığı
                    </div>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        LGS, TYT ve MEB ortak yazılı sınavlarında {topic} soruları genellikle 'altı çizili sözün anlamı', 'cümle tahlili' veya 'paragrafta akışı bozan ifade' şeklinde karşımıza çıkar.
                    </p>
                </div>
            </div>
        </section>

        <!-- BÖLÜM 2: Altın Kurallar ve Püf Noktaları -->
        <section class="space-y-4" id="bolum-2-kurallar">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-amber-500">
                <span class="w-9 h-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-sm shadow">2</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    Öğretmenin Altın Kuralları (Bunu Bilen Asla Yanılmaz!)
                </h3>
            </div>
            <div class="space-y-3">
                <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                    <span class="font-black text-amber-900 text-sm sm:text-base flex items-center gap-2">
                        <span>📌 1. Kural:</span> Cümlenin Tamamını Okumadan Karar Verme!
                    </span>
                    <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        Türkçede sözcüğün anlamı cümlenin sonundaki yükleme göre değişir. Örneğin 'yüz' sözcüğü bir sayıda, bir çehrede veya yüzme eyleminde bambaşka anlamlara gelir. Cümlenin bağlamı esastır!
                    </p>
                </div>
                <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                    <span class="font-black text-amber-900 text-sm sm:text-base flex items-center gap-2">
                        <span>📌 2. Kural:</span> Eklerin Görevini Doğru Ayırt Et
                    </span>
                    <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        Yapım ekleri sözcüğün anlamını ve türünü değiştirir; çekim ekleri ise sözcüğü cümleye bağlar. Ekleri kökten ayırırken sözcüğün kökü ile türeyen anlam arasındaki mantıksal bağı kontrol ediniz.
                    </p>
                </div>
                <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                    <span class="font-black text-amber-900 text-sm sm:text-base flex items-center gap-2">
                        <span>📌 3. Kural:</span> Yüklemi Doğru Bul, Soruları Yükleme Sor!
                    </span>
                    <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        Cümle ögeleri veya anlam sorularında ilk adım daima çekimli fiil ya da ek-fiil almış isim olan 'YÜKLEM'i bulmaktır. 'Kim, Ne, Neyi, Kimi, Nereye, Nasıl, Ne zaman?' soruları mutlaka yükleme yöneltilmelidir.
                    </p>
                </div>
            </div>
        </section>

        <!-- BÖLÜM 3: Çözümlü Model Cümle ve Metin İncelemeleri -->
        <section class="space-y-5" id="bolum-3-cozumlu-ornekler">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-amber-500">
                <span class="w-9 h-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-sm shadow">3</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    Birlikte Çözelim: 3 Model Cümle ve Soru Tahlili
                </h3>
            </div>

            <div class="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span class="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-black">Model Örnek 1 (Anlam &amp; Yapı)</span>
                    <span class="text-xs text-slate-400 font-semibold">MEB Formatı</span>
                </div>
                <div class="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    <em>"Yağmurdan sonra ıslanan toprak, etrafa mis gibi taze bir koku yayıyordu."</em> cümlesinde altı çizili sözcüklerin anlam ve öge tahlilini yapınız.
                </div>
                <div class="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-2">
                    <div class="font-bold text-amber-900 flex items-center gap-1.5">
                        <span>✅</span> Adım Adım Öğretmen Tahlili:
                    </div>
                    <p><strong>1. Adım (Yüklem):</strong> 'Yayıyordu' iş, oluş bildiren çekimli fiildir ve cümlenin yüklemidir.</p>
                    <p><strong>2. Adım (Özne):</strong> Yayan ne? 'Yağmurdan sonra ıslanan toprak' &rarr; Gerçek özne (sıfat tamlaması).</p>
                    <p><strong>3. Adım (Nesne):</strong> Ne yayıyordu? 'Mis gibi taze bir koku' &rarr; Belirtisiz nesne.</p>
                </div>
            </div>

            <div class="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span class="px-2.5 py-1 rounded-lg bg-orange-100 text-orange-900 text-xs font-black">Model Örnek 2 (Kavram Ayrımı)</span>
                    <span class="text-xs text-slate-400 font-semibold">Sınav Tipi</span>
                </div>
                <div class="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    <em>"Çocuğun sıcacık gülümsemesi odadaki tüm soğuk havayı bir anda dağıttı."</em> cümlesindeki 'sıcak' ve 'soğuk' sözcüklerinin anlam özelliklerini açıklayınız.
                </div>
                <div class="p-4 rounded-xl bg-orange-50/70 border border-orange-200 text-xs sm:text-sm text-orange-950 space-y-2">
                    <div class="font-bold text-orange-900 flex items-center gap-1.5">
                        <span>✅</span> Adım Adım Öğretmen Tahlili:
                    </div>
                    <p><strong>1. Tahlil:</strong> 'Sıcak gülümseme' ifadesindeki sıcaklık termometreyle ölçülen ısı değildir; 'samimi, içten' anlamında kullanıldığı için <strong>mecaz anlamdır</strong>.</p>
                    <p><strong>2. Tahlil:</strong> 'Soğuk hava' ifadesindeki soğuk ise havanın düşük sıcaklığını ifade ettiği için <strong>gerçek anlamdır</strong>.</p>
                </div>
            </div>
        </section>

        <!-- BÖLÜM 4: Sınavlarda En Çok Puan Kaybettiren Hatalar -->
        <section class="space-y-4" id="bolum-4-hatalar">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-rose-500">
                <span class="w-9 h-9 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-black text-sm shadow">4</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    Aman Dikkat! Sınavlarda En Sık Yapılan 3 Hata
                </h3>
            </div>
            <div class="space-y-3">
                <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                    <span class="font-bold text-rose-950 text-sm">❌ 1. 'de / da' ve 'ki' Bağlaçlarını Ek Olanlarla Karıştırmak</span>
                    <p class="text-xs sm:text-sm text-rose-900">
                        Cümleden çıkarıldığında anlam tamamen bozulmuyorsa bağlaçtır ve ayrı yazılır. Anlam tamamen çöküyorsa bulunma hal ekidir ve bitişik yazılır!
                    </p>
                </div>
                <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                    <span class="font-bold text-rose-950 text-sm">❌ 2. Kalıcı İsimleri Fiilimsi Sanmak</span>
                    <p class="text-xs sm:text-sm text-rose-900">
                        'Ekmek, dondurma, dolma, çakmak' gibi sözcükler -ma, -mak eki alsa bile bir nesnenin kalıcı adı haline gelmiştir, artık fiilimsi değildir!
                    </p>
                </div>
                <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                    <span class="font-bold text-rose-950 text-sm">❌ 3. Paragraf Sorularında Kendi Fikrini Metne Eklemek</span>
                    <p class="text-xs sm:text-sm text-rose-900">
                        Paragrafta ana fikir sorulduğunda sizin ne düşündüğünüz değil, yazarın neyi savunduğu önemlidir. Yalnızca metne bağlı kalınız.
                    </p>
                </div>
            </div>
        </section>

        <!-- BÖLÜM 5: 60 Saniyede Sınav Özeti -->
        <section class="space-y-4" id="bolum-5-ozet">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-amber-500">
                <span class="w-9 h-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-sm shadow">5</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    60 Saniyede Sınav Özeti &amp; Şimdi Sıra Sende!
                </h3>
            </div>
            <div class="p-6 rounded-3xl bg-amber-50 border border-amber-200 space-y-3 text-xs sm:text-sm text-amber-950">
                <div class="font-black text-amber-900 text-base">🎉 Tebrikler! {topic} Konusunun Püf Noktalarını Öğrendiniz!</div>
                <p>
                    Konu anlatımını tamamladınız. Şimdi bilgilerinizi pekiştirmek için hemen aşağıda yer alan <strong>20 soruluk yeni nesil Türkçe testini</strong> çözün. Çözemediğiniz soruların ayrıntılı adımlarını tek tıkla inceleyebilirsiniz!
                </p>
            </div>
        </section>
    </div>
    """

def generate_science_subject_theory(spec):
    g_str = spec["grade_str"]
    topic = spec["topic"]
    subj = spec["subject"]
    
    return f"""
    <div class="space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <!-- 🔬 Fen & Fizik Öğretmeni Girişi -->
        <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-2 border-emerald-300 text-emerald-950 font-medium space-y-4 shadow-sm">
            <div class="flex items-center gap-3 font-black text-lg sm:text-2xl text-emerald-900">
                <span class="text-3xl sm:text-4xl">🔬</span>
                <span>{subj} Öğretmenimiz Anlatıyor: <strong>{g_str} {topic}</strong></span>
            </div>
            <p class="text-xs sm:text-sm text-emerald-950/90 leading-relaxed">
                Sevgili araştırmacılar ve geleceğin bilim insanları! Bu dersimizde doğanın, maddenin ve evrenin işleyiş yasalarını anlamamızı sağlayan <strong>{topic}</strong> konusunu inceliyoruz. Deney düzeneklerini, neden-sonuç bağıntılarını ve sınavlarda derece getiren analiz tekniklerini adım adım keşfedeceğiz.
            </p>
            <div class="flex flex-wrap items-center gap-2.5 pt-2 text-xs font-bold text-emerald-900">
                <span class="px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300">🧪 Deney ve Gözlem Temelli</span>
                <span class="px-3 py-1 rounded-full bg-teal-100 text-teal-900 border border-teal-300">⚡ Bilimsel Yasalar ve İlkeler</span>
                <span class="px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300">📝 20 Soruluk Yeni Nesil Test</span>
                <span class="px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300">📥 Ücretsiz PDF Test İndir</span>
            </div>
        </div>

        <!-- BÖLÜM 1: Konunun Doğası ve Bilimsel Temeli -->
        <section class="space-y-4" id="bolum-1-bilimsel-temel">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-emerald-500">
                <span class="w-9 h-9 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm shadow">1</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    {topic} Konusunun Özü ve Doğa Olaylarındaki Yeri
                </h3>
            </div>
            <p>
                Fen bilimlerinde ve fizikte amaç, doğadaki olayları tesadüflerle değil, <strong>ölçülebilir ve tekrarlanabilir yasalarla</strong> açıklamaktır. <strong>{topic}</strong> ünitesi; enerjinin korunumu, kuvvet etkileşimleri veya maddenin mikroskobik yapısı üzerinden evrenin dengesini modeller.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                <div class="p-5 rounded-2xl bg-white border border-emerald-200 shadow-sm space-y-2">
                    <div class="font-bold text-emerald-950 flex items-center gap-2 text-sm sm:text-base">
                        <span>🌍</span> Günlük Hayattaki ve Teknolojideki Somut Yeri
                    </div>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Araçların fren sistemlerinden barajlardaki hidroelektrik santrallerine, optik cihazlardan akıllı telefon sensörlerine kadar modern teknolojinin kalbinde bu bilimsel prensipler çalışır.
                    </p>
                </div>
                <div class="p-5 rounded-2xl bg-white border border-teal-200 shadow-sm space-y-2">
                    <div class="font-bold text-teal-950 flex items-center gap-2 text-sm sm:text-base">
                        <span>📊</span> Deneylerdeki Değişkenler Mantığı
                    </div>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        <strong>Bağımsız Değişken:</strong> Bizim bilerek değiştirdiğimiz etkendir. <br>
                        <strong>Bağımlı Değişken:</strong> Bu değişimden etkilenip ölçülen sonuçtur. <br>
                        <strong>Sabit Tutulan (Kontrollü):</strong> Eşit tutulan şartlardır.
                    </p>
                </div>
            </div>
        </section>

        <!-- BÖLÜM 2: Temel İlkeler ve Formüller -->
        <section class="space-y-4" id="bolum-2-ilkeler">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-emerald-500">
                <span class="w-9 h-9 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm shadow">2</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    Önemli Bilimsel İlkeler ve Formüller
                </h3>
            </div>
            <div class="p-6 rounded-3xl bg-slate-900 text-white space-y-3 shadow-xl">
                <div class="text-xs font-bold text-emerald-400 tracking-widest uppercase">
                    ★ {topic} Temel Yasa Kartı
                </div>
                <div class="py-2 text-center">
                    <div class="text-xl sm:text-2xl font-black text-yellow-300 font-mono">
                        Enerji ve Madde Korunumu: &emsp; E_toplam = Sabit &nbsp;|&nbsp; F_net = m &middot; a
                    </div>
                    <p class="text-xs text-slate-300 mt-2 max-w-xl mx-auto">
                        Kapalı bir sistemde hiçbir madde veya enerji yoktan var olamaz, vardan yok edilemez; yalnızca bir formdan diğerine dönüşür.
                    </p>
                </div>
            </div>
        </section>

        <!-- BÖLÜM 3: Çözümlü Model Örnekler -->
        <section class="space-y-5" id="bolum-3-cozumler">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-emerald-500">
                <span class="w-9 h-9 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm shadow">3</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    Öğretmenle Birlikte Çözümlü Deney &amp; Model Soru
                </h3>
            </div>
            <div class="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span class="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-black">Model Deney Sorusu</span>
                    <span class="text-xs text-slate-400 font-semibold">LGS &amp; YKS Tipi</span>
                </div>
                <div class="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    Bir öğrenci, eğik düzlemin yüksekliğini sabit tutup eğik düzlem boyunu uzattığında uygulanan kuvvetin azaldığını gözlemlemiştir. Bu deneydeki bağımsız ve bağımlı değişkenleri tespit ediniz.
                </div>
                <div class="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm text-emerald-950 space-y-2">
                    <div class="font-bold text-emerald-900 flex items-center gap-1.5">
                        <span>✅</span> Adım Adım Bilimsel Çözüm:
                    </div>
                    <p><strong>1. Bağımsız Değişken:</strong> Öğrencinin bilerek değiştirdiği parametre &rarr; <strong>Eğik düzlemin boyu (yol)</strong>.</p>
                    <p><strong>2. Bağımlı Değişken:</strong> Yola bağlı olarak değişen ve dinamometre ile ölçülen değer &rarr; <strong>Uygulanan kuvvet</strong>.</p>
                    <p><strong>3. Kontrol Edilen Değişken:</strong> Sabit tutulan değer &rarr; <strong>Eğik düzlemin yüksekliği ve cismin ağırlığı</strong>.</p>
                </div>
            </div>
        </section>

        <!-- BÖLÜM 4: Sık Yapılan Hatalar -->
        <section class="space-y-4" id="bolum-4-hatalar">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-rose-500">
                <span class="w-9 h-9 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-black text-sm shadow">4</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    Aman Dikkat! Sınavlarda En Çok Yapılan Hatalar
                </h3>
            </div>
            <div class="space-y-3">
                <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                    <span class="font-bold text-rose-950 text-sm">❌ 1. Kütle ile Ağırlığı Karıştırmak</span>
                    <p class="text-xs sm:text-sm text-rose-900">
                        Kütle (m) değişmeyen madde miktarıdır (kg), eşit kollu terazi ile ölçülür. Ağırlık (G) ise yer çekimi kuvvetidir (Newton), dinamometre ile ölçülür ve gezegene göre değişir!
                    </p>
                </div>
                <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                    <span class="font-bold text-rose-950 text-sm">❌ 2. Basit Makinelerde İşten Kazanç Olduğunu Sanmak</span>
                    <p class="text-xs sm:text-sm text-rose-900">
                        Hiçbir basit makine İŞTEN veya ENERJİDEN kazanç sağlamaz! Kuvvetten kazanç varsa aynı oranda yoldan kayıp vardır.
                    </p>
                </div>
            </div>
        </section>
    </div>
    """

def generate_chemistry_subject_theory(spec):
    g_str = spec["grade_str"]
    topic = spec["topic"]
    
    return f"""
    <div class="space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <!-- 🧪 Kimya Öğretmeni Girişi -->
        <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 border-2 border-cyan-300 text-cyan-950 font-medium space-y-4 shadow-sm">
            <div class="flex items-center gap-3 font-black text-lg sm:text-2xl text-cyan-900">
                <span class="text-3xl sm:text-4xl">🧪</span>
                <span>Kimya Öğretmenimiz Anlatıyor: <strong>{g_str} {topic}</strong></span>
            </div>
            <p class="text-xs sm:text-sm text-cyan-950/90 leading-relaxed">
                Değerli kimyagerler ve üniversite adayları! Bu dersimizde modern kimyanın omurgasını oluşturan <strong>{topic}</strong> konusunu inceliyoruz. Atom altı taneciklerin etkileşiminden kimyasal dengeye, mol hesaplarından reaksiyon mekanizmalarına kadar tüm soru tiplerini tek tek çözeceğiz.
            </p>
            <div class="flex flex-wrap items-center gap-2.5 pt-2 text-xs font-bold text-cyan-900">
                <span class="px-3 py-1 rounded-full bg-cyan-100 border border-cyan-300">⚗️ Mol &amp; Reaksiyon Dengesi</span>
                <span class="px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300">📊 Periyodik Sistem &amp; Bağlar</span>
                <span class="px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-300">📝 20 Soruluk Kimya Testi</span>
                <span class="px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300">📥 Ücretsiz PDF Test İndir</span>
            </div>
        </div>

        <!-- BÖLÜM 1: Temel Kavramlar ve Kurallar -->
        <section class="space-y-4" id="bolum-1-kavramlar">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-cyan-600">
                <span class="w-9 h-9 rounded-2xl bg-cyan-600 text-white flex items-center justify-center font-black text-sm shadow">1</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    {topic} Temel İlkeleri ve Kimyasal Yasalar
                </h3>
            </div>
            <p>
                Kimyada en önemli kural: <strong>Kütlenin Korunumu Kanunu</strong> (Lavoisier) gereğince bir kimyasal tepkimeye giren maddelerin kütleleri toplamı, çıkan ürünlerin kütleleri toplamına daima eşittir. Atomların türü ve sayısı korunur.
            </p>
            <div class="p-6 rounded-3xl bg-slate-900 text-white space-y-3 shadow-xl">
                <div class="text-xs font-bold text-cyan-400 tracking-widest uppercase">
                    ★ Kimya Temel Bağıntı Kartı
                </div>
                <div class="py-2 text-center">
                    <div class="text-xl sm:text-2xl font-black text-yellow-300 font-mono">
                        Mol Bağıntısı: &emsp; n = m / M_A &nbsp;|&nbsp; Gaz Yasası: &emsp; P &middot; V = n &middot; R &middot; T
                    </div>
                    <p class="text-xs text-slate-300 mt-2 max-w-xl mx-auto">
                        Normal şartlar altında (0 &deg;C ve 1 atm) 1 mol ideal gaz tam olarak <strong>22,4 Litre</strong> hacim kaplar. Avogadro sayısı: 6,02 &times; 10&sup2;&sup3;.
                    </p>
                </div>
            </div>
        </section>

        <!-- BÖLÜM 2: Çözümlü Model Soru -->
        <section class="space-y-5" id="bolum-2-ornek">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-cyan-600">
                <span class="w-9 h-9 rounded-2xl bg-cyan-600 text-white flex items-center justify-center font-black text-sm shadow">2</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    Öğretmenle Birlikte Çözümlü Model Kimya Sorusu
                </h3>
            </div>
            <div class="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span class="px-2.5 py-1 rounded-lg bg-cyan-100 text-cyan-900 text-xs font-black">ÖSYM / TYT-AYT Tipi</span>
                    <span class="text-xs text-slate-400 font-semibold">Mol &amp; Kütle</span>
                </div>
                <div class="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    0,5 mol CH₄ (Metan) gazı tamamen yakıldığında kaç mol CO₂ gazı ve kaç mol H₂O buharı oluşur? (C:12, H:1, O:16)
                </div>
                <div class="p-4 rounded-xl bg-cyan-50/70 border border-cyan-200 text-xs sm:text-sm text-cyan-950 space-y-2">
                    <div class="font-bold text-cyan-900 flex items-center gap-1.5">
                        <span>✅</span> Adım Adım Çözüm:
                    </div>
                    <p><strong>1. Tepkimeyi Yaz ve Denkleştir:</strong> <code>CH₄ + 2O₂ &rarr; CO₂ + 2H₂O</code></p>
                    <p><strong>2. Katsayı Oranları:</strong> 1 mol CH₄ yandığında 1 mol CO₂ ve 2 mol H₂O oluşur.</p>
                    <p><strong>3. Hesaplama:</strong> 0,5 mol CH₄ için; <strong>0,5 mol CO₂</strong> ve <code>0,5 &times; 2 = </code> <strong>1 mol H₂O</strong> oluşur.</p>
                </div>
            </div>
        </section>

        <!-- BÖLÜM 3: Kimyada En Sık Yapılan Hatalar -->
        <section class="space-y-4" id="bolum-3-hatalar">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-rose-500">
                <span class="w-9 h-9 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-black text-sm shadow">3</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    Aman Dikkat! Kimyada En Sık Yapılan Hatalar
                </h3>
            </div>
            <div class="space-y-3">
                <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                    <span class="font-bold text-rose-950 text-sm">❌ 1. Mol Sayısının Korunduğunu Sanmak</span>
                    <p class="text-xs sm:text-sm text-rose-900">
                        Kimyasal tepkimelerde KÜTLE daima korunur ama MOL SAYISI veya hacim korunmak zorunda DEĞİLDİR! (Örn: N₂ + 3H₂ &rarr; 2NH₃ tepkimesinde 4 mol girip 2 mol çıkar).
                    </p>
                </div>
                <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                    <span class="font-bold text-rose-950 text-sm">❌ 2. Güçlü ve Zayıf Etkileşimleri Karıştırmak</span>
                    <p class="text-xs sm:text-sm text-rose-900">
                        Kaynama ve erime olaylarında moleküller arası ZAYIF etkileşimler (hidrojen bağı, van der Waals) kopar; atomlar arasındaki güçlü kovalent bağlar asla kopmaz!
                    </p>
                </div>
            </div>
        </section>
    </div>
    """

def generate_biology_subject_theory(spec):
    g_str = spec["grade_str"]
    topic = spec["topic"]
    
    return f"""
    <div class="space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <!-- 🧬 Biyoloji Öğretmeni Girişi -->
        <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50 border-2 border-teal-300 text-teal-950 font-medium space-y-4 shadow-sm">
            <div class="flex items-center gap-3 font-black text-lg sm:text-2xl text-teal-900">
                <span class="text-3xl sm:text-4xl">🧬</span>
                <span>Biyoloji Öğretmenimiz Anlatıyor: <strong>{g_str} {topic}</strong></span>
            </div>
            <p class="text-xs sm:text-sm text-teal-950/90 leading-relaxed">
                Değerli öğrenciler, yaşamın şifrelerini ve canlılığın hücresel mekanizmalarını incelediğimiz <strong>{topic}</strong> dersine hoş geldiniz! Bu dersimizde organellerin görevlerini, genetik aktarım kurallarını, ekosistem zincirini ve insan vücudunun mükemmel sistemlerini tüm detaylarıyla öğreneceğiz.
            </p>
            <div class="flex flex-wrap items-center gap-2.5 pt-2 text-xs font-bold text-teal-900">
                <span class="px-3 py-1 rounded-full bg-teal-100 border border-teal-300">🌱 Hücre &amp; Canlılık Mekanizması</span>
                <span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">🔬 Genetik &amp; Fizyoloji</span>
                <span class="px-3 py-1 rounded-full bg-green-100 text-green-900 border border-green-300">📝 20 Soruluk Biyoloji Testi</span>
                <span class="px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300">📥 Ücretsiz PDF Test İndir</span>
            </div>
        </div>

        <!-- BÖLÜM 1: Temel Kavramlar -->
        <section class="space-y-4" id="bolum-1-biyoloji-ozet">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-teal-600">
                <span class="w-9 h-9 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-black text-sm shadow">1</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    {topic} Konusunun Biyolojik Önemi ve Mekanizması
                </h3>
            </div>
            <p>
                Canlıların en küçük yapısal ve işlevsel birimi <strong>hücredir</strong>. Hücredeki yaşamsal faaliyetler ATP enerjisi kullanılarak yürütülür. Canlılar nesillerini devam ettirebilmek için DNA'larındaki genetik bilgiyi kusursuz şekilde kopyalar ve aktarır.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                <div class="p-5 rounded-2xl bg-white border border-teal-200 shadow-sm space-y-2">
                    <div class="font-bold text-teal-950 flex items-center gap-2 text-sm sm:text-base">
                        <span>🧪</span> Hücresel Denge (Homeostazi)
                    </div>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Canlıların iç çevrelerini değişen dış koşullara rağmen kararlı ve dengede tutma yeteneğine <strong>homeostazi</strong> denir. Vücut sıcaklığı, kan şekeri ve su dengesi bu prensiple korunur.
                    </p>
                </div>
                <div class="p-5 rounded-2xl bg-white border border-emerald-200 shadow-sm space-y-2">
                    <div class="font-bold text-emerald-950 flex items-center gap-2 text-sm sm:text-base">
                        <span>🧬</span> Kalıtım ve Çeşitlilik (Varyasyon)
                    </div>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Mayoz bölünmedeki 'krossing-over' (parça değişimi) ve homolog kromozomların rastgele ayrılması tür içi genetik çeşitliliği sağlar.
                    </p>
                </div>
            </div>
        </section>

        <!-- BÖLÜM 2: Model Soru ve Çözüm -->
        <section class="space-y-5" id="bolum-2-biyo-ornek">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-teal-600">
                <span class="w-9 h-9 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-black text-sm shadow">2</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    Öğretmenle Birlikte Çözümlü Model Biyoloji Sorusu
                </h3>
            </div>
            <div class="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span class="px-2.5 py-1 rounded-lg bg-teal-100 text-teal-900 text-xs font-black">ÖSYM / TYT-AYT Tipi</span>
                    <span class="text-xs text-slate-400 font-semibold">Genetik Çaprazlama</span>
                </div>
                <div class="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    Heterozigot kahverengi gözlü iki bireyin (Aa &times; Aa) mavi gözlü (çekinik - aa) çocuklarının olma olasılığı yüzde kaçtır?
                </div>
                <div class="p-4 rounded-xl bg-teal-50/70 border border-teal-200 text-xs sm:text-sm text-teal-950 space-y-2">
                    <div class="font-bold text-teal-900 flex items-center gap-1.5">
                        <span>✅</span> Adım Adım Genetik Çözüm:
                    </div>
                    <p><strong>1. Punnett Karesi Çaprazlaması:</strong> <code>Aa &times; Aa &rarr; AA, Aa, Aa, aa</code></p>
                    <p><strong>2. Genotip Oranı:</strong> 1/4 AA (%25), 2/4 Aa (%50), 1/4 aa (%25).</p>
                    <p><strong>3. Sonuç:</strong> Mavi gözlü çocuk olma olasılığı tam olarak <strong>%25 (1/4)</strong> olarak bulunur.</p>
                </div>
            </div>
        </section>

        <!-- BÖLÜM 3: Biyolojide En Sık Yapılan Hatalar -->
        <section class="space-y-4" id="bolum-3-hatalar">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-rose-500">
                <span class="w-9 h-9 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-black text-sm shadow">3</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    Aman Dikkat! Biyolojide En Çok Yapılan Hatalar
                </h3>
            </div>
            <div class="space-y-3">
                <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                    <span class="font-bold text-rose-950 text-sm">❌ 1. Pasif Taşıma ile Aktif Taşımayı Karıştırmak</span>
                    <p class="text-xs sm:text-sm text-rose-900">
                        Difüzyon ve osmozda ATP HARCANMAZ (çok yoğun ortamdan az yoğuna kendiliğinden geçer). Aktif taşımada ise az yoğundan çok yoğuna taşıma yapıldığı için mutlaka ATP harcanır!
                    </p>
                </div>
                <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                    <span class="font-bold text-rose-950 text-sm">❌ 2. Mitoz ile Mayoz Sonucundaki Hücre Sayısını Unutmak</span>
                    <p class="text-xs sm:text-sm text-rose-900">
                        Mitoz sonucunda 2 adet 2n kromozomlu kopya hücre; Mayoz sonucunda ise kromozom sayısı yarıya inmiş (n) tam <strong>4 adet</strong> yeni hücre oluşur!
                    </p>
                </div>
            </div>
        </section>
    </div>
    """

def generate_history_social_subject_theory(spec):
    g_str = spec["grade_str"]
    topic = spec["topic"]
    subj = spec["subject"]
    
    return f"""
    <div class="space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <!-- 📜 Tarih & Sosyal Öğretmeni Girişi -->
        <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-rose-50 via-red-50 to-amber-50 border-2 border-rose-300 text-rose-950 font-medium space-y-4 shadow-sm">
            <div class="flex items-center gap-3 font-black text-lg sm:text-2xl text-rose-900">
                <span class="text-3xl sm:text-4xl">🏛️</span>
                <span>{subj} Öğretmenimiz Anlatıyor: <strong>{g_str} {topic}</strong></span>
            </div>
            <p class="text-xs sm:text-sm text-rose-950/90 leading-relaxed">
                Değerli öğrencilerimiz, geçmişini bilmeyen bir milletin geleceğini inşa edemeyeceği bilinciyle hazırlanan <strong>{topic}</strong> dersimize hoş geldiniz! Bu dersimizde neden-sonuç zincirlerini, antlaşma maddelerini, Milli Mücadele kahramanlıklarını ve Atatürk'ün devrimlerini derinlemesine inceleyeceğiz.
            </p>
            <div class="flex flex-wrap items-center gap-2.5 pt-2 text-xs font-bold text-rose-900">
                <span class="px-3 py-1 rounded-full bg-rose-100 border border-rose-300">📜 Kronoloji ve Neden-Sonuç</span>
                <span class="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">🇹🇷 Milli Mücadele &amp; Atatürk İlkeleri</span>
                <span class="px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300">📝 20 Soruluk Tarih Testi</span>
                <span class="px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300">📥 Ücretsiz PDF Test İndir</span>
            </div>
        </div>

        <!-- BÖLÜM 1: Tarihsel Süreç ve Neden-Sonuç İlişkisi -->
        <section class="space-y-4" id="bolum-1-tarih-ozet">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-rose-600">
                <span class="w-9 h-9 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-black text-sm shadow">1</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    {topic} Tarihsel Süreci ve Dönemin Şartları
                </h3>
            </div>
            <p>
                Tarih biliminin en temel kuralı: <strong>Geçmişteki olaylar günümüzün değer yargılarıyla değil, olayın gerçekleştiği dönemin koşullarıyla değerlendirilmelidir</strong>. Hiçbir tarihi gelişme kendiliğinden ortaya çıkmaz; mutlaka bir önceki olayın sonucu ve bir sonraki olayın nedenidir.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                <div class="p-5 rounded-2xl bg-white border border-rose-200 shadow-sm space-y-2">
                    <div class="font-bold text-rose-950 flex items-center gap-2 text-sm sm:text-base">
                        <span>🔍</span> Neden - Sonuç Bağı
                    </div>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Örneğin Mondros Ateşkes Antlaşması'nın imzalanması ve yurdun işgal edilmesi (Neden), Kuva-yi Milliye'nin kurulmasına ve Milli Mücadele'nin başlamasına (Sonuç) zemin hazırlamıştır.
                    </p>
                </div>
                <div class="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-2">
                    <div class="font-bold text-amber-950 flex items-center gap-2 text-sm sm:text-base">
                        <span>🏛️</span> Egemenlik ve Bağımsızlık İlkesi
                    </div>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        <em>"Milletin istiklalini yine milletin azim ve kararı kurtaracaktır."</em> (Amasya Genelgesi) kararı, hem milli mücadelenin yöntemini hem de milli egemenlik ilkesini dünyaya ilan etmiştir.
                    </p>
                </div>
            </div>
        </section>

        <!-- BÖLÜM 2: Model Soru ve Çözüm -->
        <section class="space-y-5" id="bolum-2-tarih-ornek">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-rose-600">
                <span class="w-9 h-9 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-black text-sm shadow">2</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    Öğretmenle Birlikte Çözümlü Model Tarih Sorusu
                </h3>
            </div>
            <div class="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span class="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-900 text-xs font-black">LGS &amp; AYT Tarih Tipi</span>
                    <span class="text-xs text-slate-400 font-semibold">Tarihsel Yorum</span>
                </div>
                <div class="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    Erzurum Kongresi'nde alınan <em>"Manda ve himaye kabul edilemez."</em> kararı Türk milletinin hangi temel ilkeye tavizsiz bağlı olduğunu kanıtlar?
                </div>
                <div class="p-4 rounded-xl bg-rose-50/70 border border-rose-200 text-xs sm:text-sm text-rose-950 space-y-2">
                    <div class="font-bold text-rose-900 flex items-center gap-1.5">
                        <span>✅</span> Adım Adım Tarihsel Yorum:
                    </div>
                    <p><strong>1. Kavram Tahlili:</strong> Manda ve himaye, güçlü bir devletin zayıf bir ülkeyi sömürgesi altına alıp yönetmesidir.</p>
                    <p><strong>2. Çıkarım:</strong> Bu teklifi kesin bir dille reddetmek, Türk milletinin başka hiçbir devletin boyunduruğu altına girmeyeceğini gösterir.</p>
                    <p><strong>3. Yanıt:</strong> Doğrudan <strong>Tam Bağımsızlık</strong> ilkesine bağlılığı kanıtlar.</p>
                </div>
            </div>
        </section>

        <!-- BÖLÜM 3: En Sık Yapılan Hatalar -->
        <section class="space-y-4" id="bolum-3-tarih-hatalar">
            <div class="flex items-center gap-3 pb-2 border-b-2 border-rose-500">
                <span class="w-9 h-9 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-black text-sm shadow">3</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight m-0">
                    Aman Dikkat! Tarih Sınavlarında En Sık Yapılan Hatalar
                </h3>
            </div>
            <div class="space-y-3">
                <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                    <span class="font-bold text-rose-950 text-sm">❌ 1. 'Milli Bağımsızlık' ile 'Milli Egemenlik' Kavramlarını Karıştırmak</span>
                    <p class="text-xs sm:text-sm text-rose-900">
                        <strong>Milli Bağımsızlık:</strong> Yurdun dış düşmanlardan temizlenmesi, özgür yaşamaktır (Kurtuluş Savaşı). <br>
                        <strong>Milli Egemenlik:</strong> Yönetme yetkisinin halkta olması, seçim ve meclistir (TBMM'nin açılması, Cumhuriyetin ilanı).
                    </p>
                </div>
                <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                    <span class="font-bold text-rose-950 text-sm">❌ 2. Kronolojik Sıralamayı Atlamak</span>
                    <p class="text-xs sm:text-sm text-rose-900">
                        Samsun'a Çıkış &rarr; Havza Genelgesi &rarr; Amasya Genelgesi &rarr; Erzurum Kongresi &rarr; Sivas Kongresi &rarr; Amasya Görüşmeleri &rarr; TBMM'nin Açılışı sıralamasını karıştırmayınız!
                    </p>
                </div>
            </div>
        </section>
    </div>
    """

def generate_math_subject_theory(spec):
    from scripts.curriculum_gen.grade_theories import (
        generate_elementary_student_theory,
        generate_middle_student_theory,
        generate_high_student_theory,
    )
    g_num = spec.get("grade_num", 5)
    if g_num <= 4:
        return generate_elementary_student_theory(spec)
    elif g_num <= 8:
        return generate_middle_student_theory(spec)
    else:
        return generate_high_student_theory(spec)

def generate_subject_theory(spec):
    subj = spec.get("subject", "").lower()
    
    if any(x in subj for x in ["türkçe", "edebiyat"]):
        return generate_turkish_subject_theory(spec)
    elif any(x in subj for x in ["fizik"]):
        return generate_science_subject_theory(spec)
    elif any(x in subj for x in ["kimya"]):
        return generate_chemistry_subject_theory(spec)
    elif any(x in subj for x in ["biyoloji"]):
        return generate_biology_subject_theory(spec)
    elif any(x in subj for x in ["fen"]):
        return generate_science_subject_theory(spec)
    elif any(x in subj for x in ["tarih", "inkılap", "sosyal", "hayat"]):
        return generate_history_social_subject_theory(spec)
    else:
        return generate_math_subject_theory(spec)
