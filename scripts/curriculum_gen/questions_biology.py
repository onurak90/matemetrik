# -*- coding: utf-8 -*-
"""
Authentic Biology Question Generator for High School (5 options: A, B, C, D, E):
- 9. Sınıf: Canlıların Temel Bileşenleri & Hücre
- 10. Sınıf: Mitoz-Mayoz & Kalıtım
- 11. Sınıf: Sinir Sistemi & İnsan Fizyolojisi
- 12. Sınıf: Genden Proteine, Fotosentez & Solunum
"""

def get_biology_questions(slug):
    raw = []
    if "9-sinif-biyoloji" in slug:
        raw = [
            ("Hücrede protein sentezinin gerçekleştiği zarsız organel hangisidir?", ["A) Mitokondri", "B) Ribozom", "C) Lizozom", "D) Golgi aygıtı", "E) Kloroplast"], "B", "Ribozom tüm canlı hücrelerde bulunan evrensel zarsız organeldir ve protein sentezler."),
            ("Hücrenin enerji santrali olarak bilinen ve oksijenli solunumla ATP üreten çift zarlı organel nedir?", ["A) Ribozom", "B) Mitokondri", "C) Koful", "D) Sentrozom", "E) Peroksizom"], "B", "Mitokondri çift zarlıdır (krista ve matriks) ve hücresel solunumla ATP üretir."),
            ("Bitki hücrelerinde fotosentez yaparak organik besin ve oksijen üreten organel hangisidir?", ["A) Kloroplast", "B) Mitokondri", "C) Lökoplast", "D) Kromoplast", "E) Golgi"], "A", "Kloroplast klorofil pigmenti içerir ve ışık enerjisini kimyasal bağ enerjisine çevirir."),
            ("Hücre zarının yapısını açıklayan güncel model hangisidir?", ["A) Sandviç modeli", "B) Akıcı Mozaik Zar Modeli", "C) Çift katlı protein modeli", "D) Selüloz modeli", "E) Bohr modeli"], "B", "Singer ve Nicolson tarafından önerilen Akıcı Mozaik Zar Modeli (çift katlı fosfolipit ve proteinler)."),
            ("Moleküllerin çok yoğun ortamdan az yoğun ortama enerji (ATP) harcamadan kendiliğinden geçmesine ne denir?", ["A) Aktif taşıma", "B) Difüzyon", "C) Endositoz", "D) Fagositoz", "E) Pinositoz"], "B", "Difüzyon derişim farkına bağlı pasif bir geçiştir, ATP harcanmaz."),
            ("Suyun yarı geçirgen bir zardan çok yoğun ortama doğru pasif geçişine ne ad verilir?", ["A) Difüzyon", "B) Ozmoz", "C) Diyaliz", "D) Aktif taşıma", "E) Ekzositoz"], "B", "Suyun özel difüzyonuna ozmoz denir."),
            ("Maddelerin az yoğun ortamdan çok yoğun ortama ATP harcanarak ve taşıyıcı proteinler kullanılarak taşınmasına ne denir?", ["A) Kolaylaştırılmış difüzyon", "B) Basit difüzyon", "C) Aktif taşıma", "D) Ozmoz", "E) Plazmoliz"], "C", "Aktif taşımada derişim gradyanına karşı taşıma yapılır ve ATP tüketilir."),
            ("Enzimlerin etki ettiği maddeye ne ad verilir?", ["A) Ürün", "B) Substrat", "C) Koenzim", "D) Kofaktör", "E) İnhibitör"], "B", "Enzim ile substrat arasında anahtar-kilit uyumu vardır."),
            ("Enzimler biyolojik reaksiyonlarda neyi düşürerek tepkimeyi hızlandırır?", ["A) Sıcaklığı", "B) Aktivasyon enerjisini", "C) pH değerini", "D) Ürün miktarını", "E) Basıncı"], "B", "Enzimler tepkimenin başlaması için gereken aktivasyon enerjisini düşürür."),
            ("Aşağıdakilerden hangisi bir monosakkarittir (tek şeker)?", ["A) Sakkaroz (Sükroz)", "B) Glikoz", "C) Maltoz", "D) Laktoz", "E) Nişasta"], "B", "Glikoz, fruktoz ve galaktoz 6 karbonlu monosakkaritlerdir."),
            ("Bitkilerde lökoplastlarda depolanan depo polisakkarit hangisidir?", ["A) Glikojen", "B) Nişasta", "C) Selüloz", "D) Kitin", "E) Maltoz"], "B", "Bitkilerin glikoz deposu nişastadır (Hayvanlarda ve mantarlarda ise glikojendir)."),
            ("Bitki hücre çeperinin temel yapı maddesi olan yapısal polisakkarit hangisidir?", ["A) Nişasta", "B) Selüloz", "C) Glikojen", "D) Kitin", "E) Kolesterol"], "B", "Selüloz bitki hücre duvarına mekanik dayanıklılık sağlar; insanlar tarafından sindirilemez."),
            ("Böceklerin dış iskeletinde ve mantarların hücre çeperinde bulunan azotlu polisakkarit nedir?", ["A) Selüloz", "B) Kitin", "C) Kolajen", "D) Keratin", "E) Elastin"], "B", "Kitin yapısında azot (N) atomu bulunan tek polisakkarittir."),
            ("Proteinlerin yapı taşları (monomerleri) aşağıdakilerden hangisidir?", ["A) Yağ asitleri", "B) Amino asitler", "C) Glikoz", "D) Nükleotidler", "E) Gliserol"], "B", "Proteinler amino asitlerin peptit bağlarıyla birbirine bağlanmasıyla oluşur."),
            ("Hücre içi sindirimi gerçekleştiren, içinde hidroliz enzimleri bulunan organel hangisidir?", ["A) Ribozom", "B) Lizozom", "C) Sentrozom", "D) Koful", "E) Golgi"], "B", "Lizozom fagositozla alınan maddeleri veya yaşlanan organelleri (otofaji) parçalar."),
            ("Salgı maddelerinin paketlenmesi ve modifikasyonundan sorumlu organel hangisidir?", ["A) Ribozom", "B) Golgi aygıtı", "C) Lizozom", "D) Mitokondri", "E) Sentrozom"], "B", "Golgi aygıtı salgı bezlerinde (örn: tükürük bezi) çok gelişmiştir."),
            ("Hücre bölünmesi sırasında iğ ipliklerini oluşturan hayvan hücresi organeli nedir?", ["A) Sentrozom (Sentriyoller)", "B) Kloroplast", "C) Ribozom", "D) Çekirdekçik", "E) Lizozom"], "A", "Sentrozom sentriyol çiftlerinden oluşur ve iğ ipliklerini organize eder."),
            ("Büyük katı moleküllerin hücre zarından yalancı ayaklarla içeri alınmasına ne denir?", ["A) Pinositoz", "B) Fagositoz", "C) Ekzositoz", "D) Kolaylaştırılmış difüzyon", "E) Hemoliz"], "B", "Bakteri veya katı besinlerin hücre içine yutulması fagositozdur."),
            ("Hücrenin su kaybederek büzülmesine ne ad verilir?", ["A) Deplazmoliz", "B) Plazmoliz", "C) Turgor", "D) Hemoliz", "E) Lizozom"], "B", "Hipertonik (çok yoğun) ortama konan hücre su kaybederek büzülür (plazmoliz)."),
            ("Aşağıdakilerden hangisi inorganik bir bileşiktir?", ["A) Protein", "B) Su (H₂O)", "C) Lipit", "D) Vitamin", "E) Karbonhidrat"], "B", "Su, mineraller, asitler, bazlar ve tuzlar inorganik maddelerdir; canlılar tarafından sentezlenemez.")
        ]
    elif "10-sinif-biyoloji" in slug:
        raw = [
            ("Mitoz bölünme sonucu oluşan 2 yeni hücrenin kromozom sayısı ve genetik yapısı nasıldır?", ["A) Yarıya iner", "B) Ana hücre ile tamamen aynıdır (2n -> 2n)", "C) 4 katına çıkar", "D) Değişir", "E) Rastgeledir"], "B", "Mitoz bölünmede kalıtsal çeşitlilik olmaz, kromozom sayısı ve DNA dizilimi korunur."),
            ("Hücre döngüsünde DNA'nın kendini kopyaladığı (replikasyon) hazırlık evresi hangisidir?", ["A) Profaz", "B) İnterfaz (S evresi)", "C) Metafaz", "D) Anafaz", "E) Telofaz"], "B", "İnterfazın G₁, S, G₂ evrelerinden S evresinde DNA replikasyonu gerçekleşir."),
            ("Kromozomların ekvatoral düzlemde tek sıra halinde dizildiği ve karyotip analizinin yapıldığı evre hangisidir?", ["A) Profaz", "B) Metafaz", "C) Anafaz", "D) Telofaz", "E) Sitokinez"], "B", "Metafazda kromozomlar en belirgin haldedir ve hücrenin ortasında yan yana dizilir."),
            ("Kardeş kromatitlerin iğ iplikleri tarafından zıt kutuplara çekildiği mitoz evresi hangisidir?", ["A) Profaz", "B) Metafaz", "C) Anafaz", "D) Telofaz", "E) İnterfaz"], "C", "Anafaz evresinde sentromerler bölünür ve kardeş kromatitler zıt kutuplara çekilir."),
            ("Mayoz bölünmenin hangi evresinde homolog kromozomlar arasında krossing-over (parça değişimi) gerçekleşir?", ["A) Profaz I", "B) Metafaz I", "C) Anafaz II", "D) Profaz II", "E) Telofaz II"], "A", "Profaz I'de tetrat ve sinapsis oluşur, kardeş olmayan kromatitler arasında krossing-over olur."),
            ("Mayoz bölünme sonucunda kaç tane haploit (n) kromozomlu yeni hücre oluşur?", ["A) 2", "B) 4", "C) 6", "D) 8", "E) 1"], "B", "2n kromozomlu üreme ana hücresinden mayoz sonucunda 4 adet n kromozomlu gamet oluşur."),
            ("Kromozom sayısının 2n'den n'e inmesi mayozun hangi evresinde gerçekleşir?", ["A) Mayoz I", "B) Mayoz II", "C) İnterfaz", "D) Döllenme", "E) Mitoz"], "A", "Mayoz I'de homolog kromozomlar ayrıldığı için kromozom sayısı yarıya iner."),
            ("Heterozigot sarı tohumlu (Aa) iki bezelyenin çaprazlanması sonucu genotip ayrışım oranı nedir?", ["A) 1 AA : 2 Aa : 1 aa (1:2:1)", "B) 3:1", "C) 1:1", "D) 9:3:3:1", "E) 4:0"], "A", "Aa × Aa çaprazlamasında: 1/4 AA, 2/4 Aa, 1/4 aa genotipleri oluşur."),
            ("İnsanlarda hemofili ve kırmızı-yeşil renk körlüğü nasıl kalıtılır?", ["A) Y kromozomuna bağlı baskın", "B) X kromozomuna bağlı çekinik (resesif)", "C) Otozomal baskın", "D) Sitoplazmik", "E) Y kromozomuna bağlı çekinik"], "B", "X kromozomunun Y ile homolog olmayan bölgesinde çekinik alellerle taşınır (Erkeklerde daha sık görülür)."),
            ("ABO kan grubu sisteminde hangi aleller birbirine eş baskındır (kodominant)?", ["A) A ve O", "B) A ve B", "C) B ve O", "D) Rh pozitif ve negatif", "E) Yalnızca O"], "B", "A ve B alelleri birbirine eş baskındır (AB genotipi); O aleli ise ikisine karşı çekiniktir."),
            ("0 Rh(-) kan grubuna sahip bir bireyin genotipi nedir?", ["A) OO rr", "B) AO Rr", "C) BO rr", "D) AB rr", "E) OO RR"], "A", "0 kan grubu çekinik OO, Rh(-) ise çekinik rr genotipine sahiptir."),
            ("Anne ve babanın her ikisi de melez kahverengi gözlü (Aa) ise mavi gözlü (aa) çocuklarının olma ihtimali kaçtır?", ["A) %100", "B) %75", "C) %50", "D) %25", "E) %0"], "D", "Aa × Aa çaprazlamasında çekinik fenotip (aa) ihtimali 1/4 (%25)'tir."),
            ("Bir karakter bakımından homozigot baskın (AA) ve homozigot çekinik (aa) bireyler çaprazlandığında F₁ dölü nasıl olur?", ["A) Tamamı heterozigot baskın (%100 Aa)", "B) %50 AA, %50 aa", "C) Tamamı çekinik", "D) %25 Aa", "E) Belirsiz"], "A", "AA × aa çaprazlamasından sadece Aa genotipli bireyler doğar (Mendel Benzerlik Kanunu)."),
            ("Bitki hücrelerinde sitoplazma bölünmesi (sitokinez) hayvan hücrelerinden farklı olarak nasıl gerçekleşir?", ["A) Boğumlanma ile", "B) Ara lamel (orta plak) oluşumu ile", "C) Krossing-over ile", "D) Sentrozomla", "E) Endositozla"], "B", "Bitki hücrelerinde sert selüloz çeper bulunduğu için boğumlanma olamaz, Golgi'den ara lamel oluşur."),
            ("Kanser hücrelerinin en belirgin özelliği nedir?", ["A) Mitoz geçirememeleri", "B) Hücre döngüsü kontrolünü kaybederek kontrolsüzce sürekli bölünmeleri", "C) Fotosentez yapmaları", "D) DNA taşımamaları", "E) Küçülmeleri"], "B", "Kanser, hücre döngüsünü kontrol eden kontrol noktalarının (G₁, G₂, M) bozulması sonucu kontrolsüz bölünmedir."),
            ("Homolog kromozomların yan yana gelerek oluşturduğu 4 kromatitli yapıya ne denir?", ["A) Sinapsis", "B) Tetrat", "C) Krossing-over", "D) Kinetokor", "E) Sentromer"], "B", "2 homolog kromozom = 4 kromatit = 1 tetrat."),
            ("Mayoz II bölünmesi mekanik olarak hangi bölünmeye benzer?", ["A) Mitoz bölünmeye (Kardeş kromatitler ayrılır)", "B) Mayoz I'e", "C) Amitoza", "D) Tomurcuklanmaya", "E) Döllenmeye"], "A", "Mayoz II'de DNA eşlenmez ve kardeş kromatitler ayrılır; mitoz bölünmeyle aynı prensiptedir."),
            ("Alel genler hakkında hangisi doğrudur?", ["A) Biri anneden biri babadan gelen ve aynı karakteri kontrol eden gen çiftidir", "B) Yalnızca erkeklerde bulunur", "C) Mutasyonla yok olurlar", "D) Farklı kromozomlardadır", "E) Tek bir gendir"], "A", "Homolog kromozomların karşılıklı lokuslarında yer alan gen çiftleridir."),
            ("Alyuvar zarında A ve B antijenleri bulunduran bir insanın kan grubu fenotipi nedir?", ["A) A grubu", "B) B grubu", "C) AB grubu", "D) 0 grubu", "E) Rh grubu"], "C", "Hem A hem B antijeni taşıyan birey AB grubudur; plazmasında antikor bulunmaz."),
            ("Akraba evliliklerinin genetik açıdan en tehlikeli yönü nedir?", ["A) Mutasyon yapması", "B) Zararlı çekinik genlerin bir araya gelerek fenotipte hastalık ortaya çıkarma olasılığını artırması", "C) Kan uyuşmazlığı yapması", "D) Cinsiyeti değiştirmesi", "E) Kromozom sayısını artırması"], "B", "Çekinik genetik hastalıkların taşıyıcısı olma riski akrabalar arasında yüksek olduğundan hastalık riski katlanır.")
        ]
    else: # 11, 12 biology fallback
        raw = [
            ("Sinir hücresine verilen ad aşağıdakilerden hangisidir?", ["A) Nefron", "B) Nöron", "C) Alyuvar", "D) Osteosit", "E) Kondrosit"], "B", "Sinir sisteminin temel yapı ve görev birimi nörondur."),
            ("Nöronda impulsun (uyartının) iletim yönü hücre içinde nasıldır?", ["A) Akson ucundan dendrite", "B) Dendritten akson ucuna doğru", "C) Çekirdekten miyeline", "D) Sinapstan gövdeye", "E) Çift yönlü"], "B", "Uyartı dendritlerle alınır, hücre gövdesinden geçerek akson ucuna iletilir."),
            ("İki nöron arasındaki veya nöron ile efektör organ arasındaki bağlantı bölgesine ne denir?", ["A) Ranvier boğumu", "B) Sinaps", "C) Akson tepesi", "D) Miyelin kılıf", "E) Schwann hücresi"], "B", "Sinaps boşluğunda nörotransmitter maddelerle kimyasal iletim gerçekleşir."),
            ("Merkezi sinir sisteminde istemli kas hareketlerini, hafızayı, öğrenmeyi ve zekayı kontrol eden merkez neresidir?", ["A) Beyincik", "B) Uç beyin (Beyin kabuğu / Korteks)", "C) Omurilik soğanı", "D) Hipotalamus", "E) Talamus"], "B", "Bilinçli düşünme, yazma, konuşma ve hafıza uç beyin tarafından kontrol edilir."),
            ("Vücudun dengesini sağlayan ve çizgili kasların koordineli çalışmasını düzenleyen beyin bölümü hangisidir?", ["A) Beyincik (Hayat ağacı)", "B) Omurilik", "C) Talamus", "D) Hipofiz", "E) Orta beyin"], "A", "İç kulaktaki yarım daire kanalları ve gözden gelen verilerle dengeyi beyincik sağlar."),
            ("Yutma, kusma, öksürme, hapşırma gibi hayati refleksleri ve solunum-dolaşımı yöneten merkez neresidir?", ["A) Omurilik soğanı (Hayat düğümü)", "B) Beyincik", "C) Hipotalamus", "D) Uç beyin", "E) Pons"], "A", "Hayati sistemlerin çalışmasını omurilik soğanı yönetir; hasarı ölüme yol açar."),
            ("Vücut sıcaklığını, su dengesini, açlık-tokluk hissini ve homeostasiyi ayarlayan merkez hangisidir?", ["A) Talamus", "B) Hipotalamus", "C) Beyincik", "D) Omurilik", "E) Uç beyin"], "B", "İç dengenin (homeostasi) ana kontrol merkezi hipotalamustur."),
            ("DNA'daki genetik bilginin mRNA molekülüne kopyalanması olayına ne ad verilir?", ["A) Replikasyon", "B) Transkripsiyon (Yazılma)", "C) Translasyon (Okunma)", "D) Transformasyon", "E) Mutasyon"], "B", "RNA polimeraz enzimi ile DNA kalıbından mRNA sentezlenmesine transkripsiyon denir."),
            ("mRNA'daki şifreye uygun olarak ribozomda amino asitlerin birleştirilip protein üretilmesi olayına ne denir?", ["A) Transkripsiyon", "B) Translasyon (Okunma / Tercüme)", "C) Replikasyon", "D) Hidroliz", "E) Sentrifüj"], "B", "Ribozomda tRNA'ların yardımıyla polipeptit sentezlenmesi translasyondur."),
            ("mRNA üzerindeki 3 nükleotidden oluşan ve bir amino asidi şifreleyen birimlere ne ad verilir?", ["A) Antikodon", "B) Kodon", "C) Gen", "D) Ekzon", "E) İntron"], "B", "mRNA'daki üçlü baz dizilerine kodon denir (Başlangıç kodonu AUG'dir)."),
            ("Fotosentezin ışığa bağımlı reaksiyonları kloroplastın hangi bölgesinde gerçekleşir?", ["A) Stroma", "B) Tilakoit zar (Granumlar)", "C) Dış zar", "D) Ribozom", "E) Sitoplazma"], "B", "Klorofiller tilakoit zarda bulunur ve ışık reaksiyonları burada gerçekleşir."),
            ("Fotosentezde suyun (H₂O) ışıkla parçalanarak hidrojen ve oksijene ayrışması olayına ne denir?", ["A) Fotoliz", "B) Fosforilasyon", "C) Hidroliz", "D) Glikoliz", "E) Dehidrasyon"], "A", "Işık enerjisiyle suyun parçalanmasına fotoliz denir; açığa çıkan O₂ atmosfere verilir."),
            ("Fotosentezin ışıktan bağımsız reaksiyonları (Calvin Döngüsü) kloroplastın neresinde gerçekleşir?", ["A) Tilakoit zar", "B) Stroma sıvısı", "C) Çekirdek", "D) Mitokondri", "E) Matriks"], "B", "CO₂ tutulumu ve glikoz sentezi stromada gerçekleşir."),
            ("Hücresel solunumun tüm canlılarda sitoplazmada gerçekleşen ve glikozun piruvata yıkıldığı ilk evresi hangisidir?", ["A) Krebs döngüsü", "B) Glikoliz", "C) ETS (Elektron Taşıma Sistemi)", "D) Fermantasyon", "E) Oksidatif fosforilasyon"], "B", "Glikoliz reaksiyonları evrenseldir ve sitoplazmada enzimatik olarak gerçekleşir."),
            ("Oksijenli solunumda en fazla ATP'nin üretildiği evre hangisidir?", ["A) Glikoliz", "B) Krebs döngüsü", "C) ETS (Elektron Taşıma Sistemi / Oksidatif Fosforilasyon)", "D) Piruvat oksidasyonu", "E) Laktik asit evresi"], "C", "ETS'de kemiozmotik mekanizma ve ATP sentaz enzimiyle en yüksek ATP hasılatı elde edilir."),
            ("Çizgili kaslar yoğun egzersiz sırasında oksijensiz kaldığında hangi fermantasyon türünü yapar?", ["A) Etil alkol fermantasyonu", "B) Laktik asit fermantasyonu", "C) Asetik asit fermantasyonu", "D) Bütirik asit", "E) Yalnızca fotosentez"], "B", "Çizgili kas hücreleri geçici olarak laktik asit üreterek yorgunluk hissi oluşturur."),
            ("Hamurun mayalanmasını ve ekmek kabarmasını sağlayan maya mantarlarının yaptığı solunum türü nedir?", ["A) Laktik asit fermantasyonu", "B) Etil alkol fermantasyonu (CO₂ gazı açığa çıkar)", "C) Oksijenli solunum", "D) Fotosentez", "E) Kemosentez"], "B", "Etil alkol fermantasyonunda CO₂ gazı kabarmayı sağlar."),
            ("Işık enerjisi yerine inorganik maddelerin kimyasal enerjisini kullanarak organik besin üreten bakterilere ne denir?", ["A) Fotosentetik", "B) Kemosentetik (Kemosentez)", "C) Parazit", "D) Saprofit (Ayrıştırıcı)", "E) Tüketici"], "B", "Nitrit ve nitrat bakterileri kemosentez yapar; ışığa ve klorofile ihtiyaç duymazlar."),
            ("Gözün renkleri algılamasını sağlayan görme reseptörleri hangileridir?", ["A) Çubuk (Basil) reseptörleri", "B) Koni reseptörleri", "C) Mekanoreseptörler", "D) Kemoreseptörler", "E) Termoreseptörler"], "B", "Koni hücreleri aydınlıkta kırmızı, yeşil, mavi renkleri algılar (Çubuklar ise alacakaranlıkta siyah-beyazı algılar)."),
            ("İmpuls iletimi sırasında nöron zarında gerçekleşen Na⁺ kapılarının açılıp içeri girmesi olayına ne denir?", ["A) Polarizasyon (Dinlenme)", "B) Depolarizasyon", "C) Repolarizasyon", "D) Hiperpolarizasyon", "E) Sinaps"], "B", "Hücre içine Na⁺ girişi zardaki elektriksel yükü tersine çevirir (depolarizasyon).")
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
