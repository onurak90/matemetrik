# -*- coding: utf-8 -*-
"""
Authentic Science & Physics Question Generator:
- 3. Sınıf Fen: Gezegenimiz & Beş Duyumuz
- 4. Sınıf Fen: Yer Kabuğu, Kayaçlar & Besinlerimiz
- 5. Sınıf Fen: Güneş, Dünya, Ay & Canlılar
- 6. Sınıf Fen: Güneş Sistemi, Tutulmalar & Vücut
- 7. Sınıf Fen: Uzay & Hücre Bölünmeleri
- 8. Sınıf Fen: Mevsimler ve İklim & DNA
- 9. Sınıf Fizik: Madde ve Özkütle & Dinamik
- 10. Sınıf Fizik: Elektrik Devreleri & Basınç
- 11. Sınıf Fizik: Vektörler, Bağıl Hareket & Dinamik
- 12. Sınıf Fizik: Düzgün Çembersel & Basit Harmonik
"""

def get_science_physics_questions(slug):
    raw = []
    is_hs = ("fizik" in slug or "9-sinif" in slug or "10-sinif" in slug or "11-sinif" in slug or "12-sinif" in slug)
    
    if "3-sinif-fen" in slug:
        raw = [
            ("Dünya'mızın şekli aşağıdakilerden hangisine benzer?", ["A) Düz bir tepsiye", "B) Küreye (Kutuplardan basık, ekvatordan şişkin)", "C) Küpe", "D) Silindire"], "B", "Dünya'mızın şekli geoit (kutuplardan hafifçe basık küre) şeklindedir."),
            ("Dünya'mızın katmanlarından hangisi üzerinde yaşadığımız taş, toprak ve kayalardan oluşur?", ["A) Manto (Magma)", "B) Yer kabuğu (Taş küre)", "C) Çekirdek", "D) Hava küre"], "B", "Üzerinde bitkilerin yetiştiği ve canlıların yaşadığı en dış katman yer kabuğudur."),
            ("Görme olayını gerçekleştiren duyu organımız hangisidir?", ["A) Kulak", "B) Burun", "C) Göz", "D) Dil"], "C", "Işığı algılayarak görmemizi sağlayan duyu organımız gözdür."),
            ("Kokuları algılamamızı ve nefes almamızı sağlayan duyu organımız hangisidir?", ["A) Dil", "B) Deri", "C) Burun", "D) Kulak"], "C", "Burun hem koku alma hem de solunum organımızdır."),
            ("Tat alma duyumuz ile hangi duyu organımız birlikte uyum içinde çalışır?", ["A) Göz", "B) Burun (Koku alma)", "C) Kulak", "D) Deri"], "B", "Koku alma duyumuz iyi çalışmadığında (örneğin nezle iken) tatları da tam olarak algılayamayız."),
            ("Vücudumuzun dışını tamamen kaplayan dokunma duyu organımız hangisidir?", ["A) Kemik", "B) Deri", "C) Kas", "D) Akciğer"], "B", "Deri sıcaklık, soğukluk, sertlik ve yumuşaklığı algılayan en büyük duyu organımızdır."),
            ("Sesleri işitmemizi sağlayan duyu organımız hangisidir?", ["A) Burun", "B) Kulak", "C) Göz", "D) Dil"], "B", "Ses dalgalarını toplayarak beyne ileten organımız kulaktır."),
            ("Aşağıdakilerden hangisi göz sağlığımızı korumak için yapılması gereken bir davranıştır?", ["A) Televizyonu çok yakından izlemek", "B) Güneş'e doğrudan çıplak gözle bakmamak", "C) Kitabı gözümüze yapıştırarak okumak", "D) Tozlu ellerle gözlerimizi ovuşturmak"], "B", "Güneş'e doğrudan bakmak retinaya zarar verir; koruyucu gözlük kullanılmalıdır."),
            ("Dünya'mızın en sıcak katmanı hangisidir?", ["A) Yer kabuğu", "B) Çekirdek (İç çekirdek)", "C) Su küre", "D) Hava küre"], "B", "Dünya'nın merkezinde yer alan çekirdek en sıcak ve en yoğun katmandır."),
            ("Eriyen kayaların oluşturduğu kızgın sıvıya (magmaya) ev sahipliği yapan katman hangisidir?", ["A) Manto (Ateş küre)", "B) Taş küre", "C) Su küre", "D) Hava küre"], "A", "Manto yer kabuğunun altında erimiş kızgın lavlardan oluşur."),
            ("Aşağıdakilerden hangisi dilimizin görevlerinden biri değildir?", ["A) Besinlerin tadını almak", "B) Konuşmaya yardımcı olmak", "C) Sesleri duymak", "D) Besinleri yutmaya yardım etmek"], "C", "Sesleri duymak kulağın görevidir, dilin görevi değildir."),
            ("Kulak sağlığımızı korumak için hangisini yapmamalıyız?", ["A) Kulağımıza sivri cisimler sokmamalıyız", "B) Yüksek sesli ortamlarda bulunmamalıyız", "C) Kulağımıza toka, kürdan gibi yabancı cisimler sokmalıyız", "D) Kulağımızı temiz tutmalıyız"], "C", "Sivri cisimler kulak zarını patlatabilir, asla kulağa sokulmamalıdır."),
            ("Dünya'mızın yüzeyinde sular mı daha çok yer kaplar yoksa karalar mı?", ["A) Karalar", "B) Sular (Yaklaşık 3/4'ü)", "C) Eşittir", "D) Yalnızca buzullar"], "B", "Dünya yüzeyinin yaklaşık dörtte üçü (3/4) denizler, okyanuslar ve göllerden oluşur."),
            ("Deri sağlığımız için hangisi gereklidir?", ["A) Düzenli banyo yapmak", "B) Güneşte saatlerce yanmak", "C) Kirli kalmak", "D) Soğukta eldivensiz durmak"], "A", "Düzenli banyo yapmak cildimizdeki gözenekleri açar ve mikropları uzaklaştırır."),
            ("Aşağıdakilerden hangisi bir tat çeşidi değildir?", ["A) Tatlı", "B) Tuzlu", "C) Ekşi", "D) Sıcak"], "D", "Sıcaklık bir tat değil, derimizle hissettiğimiz bir dokunma duyusudur."),
            ("Dünya'yı saran hava tabakasına ne denir?", ["A) Atmosfer (Hava küre)", "B) Litosfer", "C) Hidrosfer", "D) Biyosfer"], "A", "Dünya'mızı çevreleyen ve nefes almamızı sağlayan gaz tabakası atmosferdir."),
            ("Uzaktan gelen bir geminin önce dumanı, sonra bacası, en son gövdesinin görünmesi neyi kanıtlar?", ["A) Geminin çok hızlı gittiğini", "B) Dünya'nın yuvarlak (küresel) olduğunu", "C) Denizin dalgalı olduğunu", "D) Havanın sisli olduğunu"], "B", "Bu durum Dünya'nın küresel yüzeyinden kaynaklanan ünlü bir coğrafi kanıttır."),
            ("Hangi duyu organımız olmasaydı çevremizdeki renkleri ayırt edemezdik?", ["A) Kulak", "B) Göz", "C) Burun", "D) Dil"], "B", "Renkleri algılayan duyu organımız gözdür."),
            ("Gözümüzü dış etkilerden koruyan yapılar hangileridir?", ["A) Kaşlar, kirpikler ve göz kapakları", "B) Kulak kepçesi", "C) Burun kemiği", "D) Yanaklar"], "A", "Kaşlar teri engeller, kirpikler tozu tutar, göz kapakları ise gözü korur."),
            ("Duyu organlarımızın topladığı uyarıları kim değerlendirir ve anlamlandırır?", ["A) Kalbimiz", "B) Beynimiz", "C) Midemiz", "D) Akciğerimiz"], "B", "Tüm duyu sinirleri uyarıları beyne taşır ve görme, tatma, koklama beyinde gerçekleşir.")
        ]
    elif "8-sinif-fen" in slug:
        raw = [
            ("Mevsimlerin oluşmasının temel sebebi aşağıdakilerden hangisidir?", ["A) Dünya'nın Güneş'e yaklaşıp uzaklaşması", "B) Dünya'nın dönme ekseninin eğik olması ve Güneş etrafında dolanması", "C) Ay'ın Dünya etrafında dönmesi", "D) Güneş patlamaları"], "B", "Mevsimlerin oluşmasında 23° 27'lik eksen eğikliği ve yıllık dolanma hareketi esastır."),
            ("21 Haziran tarihinde Kuzey Yarım Küre'de hangi mevsim başlar?", ["A) Kış", "B) İlkbahar", "C) Yaz", "D) Sonbahar"], "C", "21 Haziran'da Kuzey Yarım Küre Güneş ışınlarını en dik açıyla alır ve yaz mevsimi başlar."),
            ("Gece ve gündüz sürelerinin tüm dünyada eşit olduğu (ekinoks) tarihler hangileridir?", ["A) 21 Haziran ve 21 Aralık", "B) 21 Mart ve 23 Eylül", "C) 1 Ocak ve 1 Temmuz", "D) 15 Ağustos ve 15 Şubat"], "B", "21 Mart ve 23 Eylül tarihlerinde Güneş ışınları Ekvator'a dik düşer ve ekinoks (12 saat gece - 12 saat gündüz) yaşanır."),
            ("DNA'nın temel yapı birimi (monomeri) nedir?", ["A) Gen", "B) Kromozom", "C) Nükleotid", "D) Hücre"], "C", "DNA'nın yapı birimi nükleotiddir. (Görev birimi ise gendir)."),
            ("Bir nükleotidin yapısında aşağıdakilerden hangisi bulunmaz?", ["A) Fosfat grubu", "B) Deoksiriboz şekeri", "C) Organik baz (A, T, G, C)", "D) Ribozom organeli"], "D", "Nükleotid = Fosfat + 5 Karbonlu Şeker + Azotlu Organik Baz."),
            ("DNA çift zincirinde Adenin (A) bazının karşısına daima hangi baz gelir?", ["A) Guanin", "B) Timin", "C) Sitozin", "D) Urasil"], "B", "DNA'da A ile T (2'li hidrojen bağı), G ile C (3'lü hidrojen bağı) eşleşir."),
            ("Çevre şartlarının etkisiyle (sıcaklık, beslenme) genlerin işleyişinde meydana gelen kalıtsal olmayan değişikliklere ne denir?", ["A) Mutasyon", "B) Modifikasyon", "C) Adaptasyon", "D) Doğal Seçilim"], "B", "Himalaya tavşanının kürk renginin değişmesi veya spor yapanın kas geliştirmesi modifikasyondur, kalıtsal değildir."),
            ("Radyasyon, kimyasal maddeler gibi etkenlerle DNA diziliminde meydana gelen bozulmalara ne ad verilir?", ["A) Modifikasyon", "B) Mutasyon", "C) Klonlama", "D) Mayoz"], "B", "Gen yapısının değişmesine mutasyon denir; üreme hücrelerinde olursa kalıtsaldır."),
            ("Bir canlının belirli bir çevrede yaşama ve üreme şansını artıran kalıtsal özelliklerine ne denir?", ["A) Adaptasyon", "B) Mutasyon", "C) Modifikasyon", "D) Varyasyon"], "A", "Kutup ayılarının beyaz kürk ve kalın yağ tabakasına sahip olması bir adaptasyondur."),
            ("Geniş bir bölgede uzun yıllar boyunca gözlemlenen hava olaylarının ortalamasına ne ad verilir?", ["A) Hava durumu", "B) İklim", "C) Rüzgâr", "D) Nem"], "B", "En az 30-35 yıllık hava olaylarının ortalaması iklimdir (Klimatoloji inceler)."),
            ("Rüzgâr nasıl oluşur?", ["A) Yüksek basınç alanından alçak basınç alanına doğru hava hareketiyle", "B) Alçak basınçtan yüksek basınca", "C) Ay'ın çekim kuvvetiyle", "D) Yağmur yağmasıyla"], "A", "Rüzgâr daima soğuk (yüksek basınç) bölgeden sıcak (alçak basınç) bölgeye doğru eser."),
            ("Güneş ışınlarının dik (90°) açıyla geldiği bir bölgede gölge boyu ve sıcaklık nasıl olur?", ["A) Sıcaklık düşük, gölge uzun", "B) Sıcaklık yüksek, gölge boyu en kısa (sıfır)", "C) Sıcaklık değişmez", "D) Gölge daima sabittir"], "B", "Dik gelen ışınlar birim alana daha çok ısı enerjisi bırakır ve gölge boyu minimum olur."),
            ("Kalıtım biliminin kurucusu kabul edilen bilim insanı kimdir?", ["A) Darwin", "B) Gregor Mendel", "C) Pasteur", "D) Newton"], "B", "Bezelyelerle yaptığı çaprazlama deneyleriyle kalıtım ilkelerini bulan Mendel'dir."),
            ("Genotipinde iki farklı alel bulunduran (Aa) bireylere ne ad verilir?", ["A) Homozigot (Saf döl)", "B) Heterozigot (Melez döl)", "C) Resesif", "D) Fenotip"], "B", "Aa bireyler heterozigottur (melezdir)."),
            ("Çekinik (resesif) bir özelliğin fenotipte ortaya çıkabilmesi için genotip nasıl olmalıdır?", ["A) Mutlaka homozigot çekinik (aa)", "B) Heterozigot (Aa)", "C) Homozigot baskın (AA)", "D) Fark etmez"], "A", "Çekinik genler sadece saf döl (aa) durumunda etkisini gösterir."),
            ("İnsanda cinsiyeti belirleyen kromozomlardan babadan Y kromozomu gelirse doğacak çocuk ne olur?", ["A) Kız (XX)", "B) Erkek (XY)", "C) İkiz", "D) Belirsiz"], "B", "Annede XX, babada XY bulunur. Babadan Y gelirse çocuk XY (erkek) olur."),
            ("DNA kendini eşlerken sitoplazmadaki serbest nükleotid sayısı nasıl değişir?", ["A) Artar", "B) Azalır (Çekirdeğe geçer)", "C) Değişmez", "D) Sıfırlanmaz"], "B", "Sitoplazmadaki serbest nükleotidler çekirdeğe girerek yeni zincirleri oluşturur, miktarları azalır."),
            ("Bir DNA molekülünde 600 Guanin varsa Sitozin sayısı kaçtır?", ["A) 300", "B) 600", "C) 1200", "D) 150"], "B", "Guanin sayısı her zaman Sitozin sayısına eşittir: G = C = 600."),
            ("DNA'da genetik şifrenin canlıdan canlıya farklı olmasını sağlayan temel etken nedir?", ["A) Şeker çeşidi", "B) Fosfat sayısı", "C) Nükleotidlerin dizilişi ve sayısı", "D) Hücre tipi"], "C", "Tüm canlılarda nükleotid çeşitleri aynıdır; canlıları farklı kılan bu nükleotidlerin sırası ve sayısıdır."),
            ("İstenilen özelliklere sahip canlıların seçilerek çoğaltılmasına ne denir?", ["A) Doğal seçilim", "B) Yapay seçilim (Islah)", "C) Mutasyon", "D) Modifikasyon"], "B", "İnsan eliyle üstün verimli bitki veya hayvan ırklarının üretilmesi yapay seçilimdir.")
        ]
    elif "9-sinif-fizik" in slug:
        raw = [
            ("Özkütle (yoğunluk) formülü d aşağıdakilerden hangisidir?", ["A) d = m / V", "B) d = m · V", "C) d = V / m", "D) d = m · g", "E) d = F / A"], "A", "Özkütle birim hacimdeki kütledir: d = m / V (Kütle / Hacim)."),
            ("Kütlesi 120 gram ve hacmi 40 cm³ olan homojen bir maddenin özkütlesi kaç g/cm³'tür?", ["A) 2", "B) 3", "C) 4", "D) 5", "E) 8"], "B", "d = m / V = 120 / 40 = 3 g/cm³."),
            ("Aynı cins moleküllerin birbirini çekmesi sonucu oluşan kuvvete ne denir?", ["A) Adezyon (Yapışma)", "B) Kohezyon (Tutunma)", "C) Kılcallık", "D) Sürtünme", "E) Yerçekimi"], "B", "Benzer sıvı moleküllerinin birbirini çekmesine kohezyon kuvveti denir."),
            ("Farklı cins maddelerin molekülleri arasındaki çekim kuvvetine ne denir?", ["A) Kohezyon", "B) Adezyon (Yapışma)", "C) Özkütle", "D) Viskozite", "E) İvme"], "B", "Su damlasının cama yapışması adezyon kuvveti ile açıklanır."),
            ("Newton'ın 2. Hareket Yasası (Temel Prensip) formülü nedir?", ["A) F = m · a", "B) F = m / a", "C) F = m · v", "D) W = F · x", "E) E = m·c²"], "A", "Net kuvvet ivme kazandırır: F_net = m · a."),
            ("Kütlesi 4 kg olan bir cisme 20 N'luk net yatay kuvvet uygulanırsa cismin kazanacağı ivme kaç m/s² olur?", ["A) 2", "B) 5", "C) 8", "D) 10", "E) 80"], "B", "a = F / m = 20 / 4 = 5 m/s²."),
            ("Newton'ın 3. Hareket Yasası neyi ifade eder?", ["A) Eylemsizlik prensibi", "B) Etki - Tepki prensibi (Her etkiye eşit ve zıt tepki vardır)", "C) İvme hesabı", "D) Enerji korunumu", "E) Kütle çekimi"], "B", "F_etki = -F_tepki büyüklükleri eşit, yönleri zıttır."),
            ("Hız ile sürat arasındaki en temel fiziksel fark nedir?", ["A) Hız vektörel, sürat skaler büyüklüktür", "B) Sürat vektöreldir", "C) Birimleri farklıdır", "D) Hiçbir fark yoktur", "E) Hız daima sıfırdır"], "A", "Hız yer değiştirme/zaman (vektörel), sürat ise alınan yol/zaman (skaler) formülüyle bulunur."),
            ("Bir araç doğrusal yolda 10 saniyede hızını 10 m/s'den 30 m/s'ye çıkarıyor. Aracın ivmesi kaç m/s²'dir?", ["A) 1", "B) 2", "C) 3", "D) 4", "E) 5"], "B", "a = Δv / Δt = (30 - 10) / 10 = 20 / 10 = 2 m/s²."),
            ("Sıvı yüzeyinin gergin bir zar gibi davranmasına ne denir?", ["A) Adezyon", "B) Yüzey gerilimi", "C) Kılcallık", "D) Yoğunlaşma", "E) Donma"], "B", "Sıvı yüzeyindeki kohezyon kuvvetlerinin dengelenmemiş etkisi yüzey gerilimini oluşturur."),
            ("Sıvının sıcaklığı artarsa yüzey gerilimi nasıl değişir?", ["A) Artar", "B) Azalır", "C) Değişmez", "D) Önce artar sonra azalır", "E) Sıfır olur"], "B", "Sıcaklık arttıkça moleküller arası kohezyon zayıflar, yüzey gerilimi azalır."),
            ("Aşağıdakilerden hangisi türetilmiş bir büyüklüktür?", ["A) Uzunluk", "B) Kütle", "C) Zaman", "D) Kuvvet", "E) Sıcaklık"], "D", "Kuvvet (Newton = kg·m/s²) temel büyüklüklerden türetilmiştir. KISA MUZ temel büyüklüklerdir."),
            ("Aşağıdakilerden hangisi skaler bir büyüklüktür?", ["A) Hız", "B) Kuvvet", "C) İvme", "D) Enerji (İş)", "E) Yer değiştirme"], "D", "Enerji yönü olmayan skaler bir büyüklüktür."),
            ("Sürtünme katsayısı k = 0,2 olan yatay düzlemde 50 N ağırlığındaki cisme etki eden sürtünme kuvveti kaç N'dur?", ["A) 5", "B) 10", "C) 15", "D) 25", "E) 50"], "B", "F_s = k · N = 0,2 × 50 = 10 N."),
            ("Bir cismin hareket durumunu koruma eğilimine ne ad verilir?", ["A) İvme", "B) Eylemsizlik", "C) Sürtünme", "D) Ağırlık", "E) Etki"], "B", "Duran cismin durmak, hareket edenin sabit hızla hareket etmek istemesine eylemsizlik denir."),
            ("Boyutları (en, boy, yükseklik) 2 katına çıkarılan bir katı prizmanın kendi ağırlığına karşı dayanıklılığı nasıl değişir?", ["A) 2 katına çıkar", "B) Yarıya iner (1/2)", "C) 4 katına çıkar", "D) Değişmez", "E) 1/4'üne iner"], "B", "Dayanıklılık Kesit Alanı / Hacim ∝ 1/h oranına bağlıdır. Yükseklik 2 katına çıkarsa dayanıklılık yarıya iner."),
            ("Dar bir cam boruda suyun kendiliğinden yükselmesi olayına ne denir?", ["A) Viskozite", "B) Kılcallık (Kapiler etki)", "C) Basınç", "D) Akmazlık", "E) Çökme"], "B", "Adezyon kuvvetinin kohezyondan büyük olduğu durumlarda kılcallıkla sıvı yükselir."),
            ("Ağırlık ile kütle arasındaki fark nedir?", ["A) Kütle değişmeyen madde miktarıdır (skaler), ağırlık yerçekimi kuvvetidir (G = m·g, vektörel)", "B) İkisi tamamen aynıdır", "C) Kütle dinamometreyle ölçülür", "D) Ağırlık birimi kg'dır", "E) Kütle yerçekimine bağlıdır"], "A", "Kütle skalerdir (kg), ağırlık ise yerçekimine bağlı kuvvettir (N)."),
            ("Net kuvvetin sıfır olduğu (F_net = 0) bir sistemde cisim için hangisi söylenebilir?", ["A) Kesinlikle duruyordur", "B) Ya duruyordur ya da sabit hızlı doğrusal hareket yapıyordur", "C) Hızlanan hareket yapıyordur", "D) Dairesel hareket yapıyordur", "E) İvmesi sabittir"], "B", "Eylemsizlik prensibine göre F_net = 0 ise cisim duruyorsa durur, hareketliyse sabit hızla devam eder."),
            ("1 litre kaç desimetreküpe (dm³) eşittir?", ["A) 0,1 dm³", "B) 1 dm³", "C) 10 dm³", "D) 100 dm³", "E) 1000 dm³"], "B", "1 L = 1 dm³ = 1000 cm³ hacim birimidir.")
        ]
    else: # 10, 11, 12 physics fallback
        raw = [
            ("Ohm Yasası formülü aşağıdakilerden hangisidir?", ["A) V = I · R", "B) P = V · I", "C) R = V · I", "D) I = V · R", "E) V = I / R"], "A", "Gerilim, akım ve direnç ilişkisi: Potansiyel fark V = Akım (I) × Direnç (R)."),
            ("Dirençleri 6 Ω ve 3 Ω olan iki direnç paralel bağlanırsa eşdeğer direnç kaç Ω olur?", ["A) 9 Ω", "B) 2 Ω", "C) 18 Ω", "D) 1 Ω", "E) 4,5 Ω"], "B", "1/R_eş = 1/6 + 1/3 = 3/6 -> R_eş = 2 Ω (veya çarpım/toplam: 18/9 = 2 Ω)."),
            ("Durgun sıvı basıncı formülü P nedir?", ["A) P = h · d · g", "B) P = F / S", "C) P = m · g · h", "D) P = d / h", "E) P = h · S"], "A", "Sıvı basıncı derinlik (h), sıvının özkütlesi (d) ve yerçekimi ivmesine (g) bağlıdır: P = h·d·g."),
            ("Arşimet Prensibi'ne göre sıvıya batan cisme etki eden kaldırma kuvveti F_k neye eşittir?", ["A) Cismin kütlesine", "B) Cismin batan hacmi kadar sıvının ağırlığına (F_k = V_batan · d_sıvı · g)", "C) Cismin tüm hacmine", "D) Sıvının toplam kütlesine", "E) Kaptaki taban basıncına"], "B", "Kaldırma kuvveti yerini değiştirdiği sıvının ağırlığına eşittir: F_k = V_b · d_s · g."),
            ("Düzgün çembersel harekette çizgisel hız (v) ile açısal hız (ω) arasındaki bağıntı nedir?", ["A) v = ω · r", "B) v = ω / r", "C) ω = v · r", "D) v = ω² · r", "E) a = v · ω²"], "A", "Çizgisel hız çizgisel yolun zamanla değişimiyken v = ω · r bağıntısıyla açısal hıza bağlıdır."),
            ("Merkezcil ivme bağıntısı a_m nedir?", ["A) a = v² / r = ω² · r", "B) a = v · r", "C) a = ω / r", "D) a = v² · r", "E) a = 2πr / T"], "A", "Merkezcil ivme daima merkeze yöneliktir ve büyüklüğü a = v²/r = ω²r formülüyle hesaplanır."),
            ("Yaylı sarkaçta periyot T formülü nedir (Tolga formülü)?", ["A) T = 2π √(m / k)", "B) T = 2π √(l / g)", "C) T = 2π √(k / m)", "D) T = m · k", "E) T = 1/f"], "A", "Yay sarkacının periyodu kütle (m) ve yay sabiti (k)'ye bağlıdır: T = 2π√(m/k)."),
            ("Basit sarkaçta periyot T formülü nedir (Tolga - Tolga l/g)?", ["A) T = 2π √(l / g)", "B) T = 2π √(g / l)", "C) T = 2π √(m / k)", "D) T = 2π · l", "E) T = m·g·l"], "A", "Basit sarkacın periyodu ipin uzunluğu (l) ve yerçekimine (g) bağlıdır: T = 2π√(l/g)."),
            ("Düzgün dairesel harekette dönme kinetik enerjisi E_d nedir?", ["A) E_d = 1/2 I ω²", "B) E_d = 1/2 m v²", "C) E_d = m g h", "D) E_d = I · ω", "E) E_d = 1/2 k x²"], "A", "Eylemsizlik momenti I ve açısal hız ω olmak üzere dönme enerjisi E_d = 1/2 I ω²'dir."),
            ("Açısal momentum L formülü nedir?", ["A) L = I · ω", "B) L = m · v", "C) L = F · r", "D) L = I / ω", "E) L = ω / r"], "A", "Açısal momentum eylemsizlik momenti ile açısal hızın çarpımıdır: L = I·ω (veya L = m·v·r)."),
            ("Dışarıdan net bir tork etki etmeyen sistemde açısal momentum nasıl değişir?", ["A) Artar", "B) Azalır", "C) Korunur (Sabit kalır)", "D) Sıfır olur", "E) Yön değiştirir"], "C", "Net dış tork sıfır ise açısal momentum zamanla değişmez, korunur (buz patencisi kollarını kapatınca hızlanır)."),
            ("Seri bağlı iki dirençten (R₁ ve R₂) geçen akımlar nasıldır?", ["A) Akımlar birbirine eşittir (I₁ = I₂)", "B) Büyük dirençten çok akım geçer", "C) Küçük dirençten akım geçmez", "D) Gerilimler eşittir", "E) Toplam akım yarıya iner"], "A", "Seri bağlı devre elemanlarında yük akışı tek koldan sağlandığı için akım her noktada aynıdır."),
            ("Paralel bağlı kollarda hangi elektriksel büyüklük kesinlikle eşittir?", ["A) Akım", "B) Potansiyel fark (Gerilim, V)", "C) Direnç", "D) Güç", "E) Yük miktarı"], "B", "Paralel bağlı kolların uçları aynı düğüm noktalarına bağlı olduğundan voltajları eşittir."),
            ("Bir elektrik sobası 220 V gerilimde 5 A akım çekmektedir. Sobanın elektriksel gücü kaç Watt'tır?", ["A) 44 W", "B) 1100 W", "C) 2200 W", "D) 550 W", "E) 110 W"], "B", "Güç P = V · I = 220 × 5 = 1100 Watt."),
            ("Transformatörler hangi akım türü ile çalışır?", ["A) Yalnızca doğru akım (DC)", "B) Yalnızca alternatif akım (AC)", "C) Hem AC hem DC", "D) Statik elektrik", "E) Pillerle"], "B", "Transformatör indüksiyon yoluyla manyetik akı değişimi prensibiyle çalıştığından sadece AC ile çalışır."),
            ("Işık hızı boşlukta yaklaşık kaç km/s'dir?", ["A) 300 km/s", "B) 30 000 km/s", "C) 300 000 km/s", "D) 3 000 000 km/s", "E) Sonsuz"], "C", "Işık hızı c ≈ 3 × 10⁸ m/s = 300 000 km/s'dir."),
            ("Farklı yöndeki iki vektörün bileşkesinin büyüklüğü hangi aralıkta yer alır?", ["A) Daima toplamlarına eşittir", "B) |A - B| ile |A + B| aralığında", "C) Sıfır ile sonsuz", "D) Çarpımlarına eşittir", "E) Sadece 90 derecede vardır"], "B", "İki vektörün bileşkesi farkları ile toplamları arasındaki tüm değerleri alabilir."),
            ("Doğuya 12 N ve kuzeye 5 N iki dik kuvvetin bileşkesi kaç N'dur?", ["A) 7 N", "B) 13 N", "C) 17 N", "D) 60 N", "E) 25 N"], "B", "Pisagor bağıntısı: R² = 5² + 12² = 25 + 144 = 169 -> R = 13 N."),
            ("Basit harmonik harekette denge konumundan geçerken (x = 0) hız ve ivme nasıldır?", ["A) Hız maksimum, ivme sıfırdır", "B) Hız sıfır, ivme maksimumdur", "C) İkisi de sıfırdır", "D) İkisi de maksimumdur", "E) İvme sabittir"], "A", "Denge noktasında geri çağırıcı kuvvet sıfır olduğu için ivme sıfırdır; hız ise maksimumdur."),
            ("Sürtünmesiz bir virajda aracın güvenle dönebilmesi için viraj emniyet hızı v_max nelere bağlıdır?", ["A) Yalnızca aracın kütlesine", "B) Yerçekimi, sürtünme katsayısı ve viraj yarıçapına (v = √(k·g·r))", "C) Aracın beygir gücüne", "D) Depodaki yakıta", "E) Sadece yolun eğimine"], "B", "Kütle sadeleşir: m·v²/r = k·m·g -> v = √(k·g·r). Kütleye bağlı değildir!")
        ]

    questions = []
    for i, (q_text, opts, corr, sol) in enumerate(raw, 1):
        questions.append({
            "num": i,
            "text": q_text,
            "options": opts,
            "correct": corr,
            "solution": sol
        })
    return questions
