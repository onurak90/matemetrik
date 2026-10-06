#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate comprehensive, human-crafted, SEO-rich book summaries for Google Trends breakout queries.
Includes authentic character analyses, literary depth, quotes, chapter breakdowns, and cover images.
"""

import sqlite3
import datetime
import json

now_str = datetime.datetime.now().isoformat()

conn = sqlite3.connect('data/matemetrik.db')
c = conn.cursor()

BOOKS_DATA = [
    {
        "title": "Suç ve Ceza – Fyodor Dostoyevski | Kitap Özeti, Karakter Tahlilleri ve Detaylı Analiz",
        "slug": "suc-ve-ceza-kitap-ozeti",
        "excerpt": "Dostoyevski'nin başyapıtı Suç ve Ceza kitap özeti. Raskolnikov'un vicdan muhasebesi, tefeci kadının öldürülmesi, karakter analizleri ve romanın felsefi mesajı.",
        "cover": "https://covers.openlibrary.org/b/id/9411873-L.jpg",
        "tags": ["Suç ve Ceza", "Dostoyevski", "Kitap Özeti", "Raskolnikov", "Sonya Marmeladov", "Dünya Klasikleri", "Psikolojik Roman"],
        "author": "Fyodor Mihayloviç Dostoyevski",
        "original_title": "Prestupleniye i Nakazaniye",
        "year": "1866",
        "pages": "687 Sayfa",
        "quick_summary": "Yoksul ve gururlu eski bir hukuk öğrencisi olan Rodion Romanoviç Raskolnikov, üstün insanların toplumsal kuralların ve ahlakın üzerinde olduğuna inanır. Bu teorisini kanıtlamak ve sefaletten kurtulmak için tefeci Alyona İvanovna'yı öldürür. Ancak cinayet anında kadının masum kız kardeşi Lizaveta'yı da öldürmek zorunda kalır. İşlediği suçun ardından yaşadığı derin psikolojik çöküntü, vicdan azabı ve sorgu yargıcı Porfiri Petroviç ile girdiği psikolojik satranç, onu temiz kalpli Sonya Marmeladova'nın rehberliğinde itirafa ve Sibirya'da manevi bir arınmaya götürür.",
        "full_plot": """
<p>Dostoyevski’nin 1866 yılında kaleme aldığı <strong>Suç ve Ceza</strong>, dünya edebiyatının tartışmasız en büyük psikolojik romanlarından biridir. Roman, 19. yüzyıl Saint Petersburg’unun kasvetli, dar ve yoksul sokaklarında başlar.</p>
<h3>Giriş: Teorinin Doğuşu ve Cinayet Planı</h3>
<p>Eski bir hukuk öğrencisi olan Rodion Romanoviç Raskolnikov, aşırı yoksulluk içinde küçücük bir tavan arasında yaşamaktadır. Zihninde tehlikeli bir felsefi teori geliştirmiştir: İnsanlar "sıradanlar" ve "sıradışı olanlar" olarak ikiye ayrılır. Napolyon gibi sıradışı insanlar, insanlığa fayda sağlamak uğruna var olan yasaları çiğneme, hatta kan dökme hakkına sahiptir. Raskolnikov, kendisinin de bu sınıfa ait olup olmadığını test etmek ister. Hedef olarak, yoksul insanları sömüren yaşlı ve acımasız tefeci kadın Alyona İvanovna’yı seçer. Bir balta temin ederek kadının evine gider ve onu acımasızca öldürür. Ancak beklenmedik bir şekilde eve giren kadının saf ve masum kız kardeşi Lizaveta'yı da şahit bırakmamak için öldürmek zorunda kalır.</p>
<h3>Gelişme: Vicdan Azabı ve Psikolojik Düello</h3>
<p>Cinayetin hemen ardından Raskolnikov, çaldığı rehineleri ve parayı harcayamadan bir taşın altına saklar. Beklediği "üstün insan" zaferi yerine korkunç bir delilik nöbeti, ateşli hastalık ve yalnızlık içine düşer. Polisin şüpheleri üzerine çeker. Özellikle keskin zekalı sorgu yargıcı Porfiri Petroviç, Raskolnikov’un suçlu olduğunu hissetmekte ve ona doğrudan delil sunmak yerine psikolojik bir tuzak kurarak itirafa zorlamaktadır. Bu sırada Raskolnikov, ailesine bakabilmek için fahişelik yapmak zorunda kalan ama derin bir Hristiyan inancına ve saf bir kalbe sahip olan Sonya Marmeladova ile tanışır.</p>
<h3>Sonuç: İtiraf, Ceza ve Yeniden Doğuş</h3>
<p>Raskolnikov, zihnindeki cehennemden kurtulamayacağını anlar. Sonya'nın ayaklarına kapanarak suçunu sadece ona itiraf eder. Sonya, ona polise gidip teslim olmasını ve çektiği acılarla günahlarından arınmasını söyler. Raskolnikov polise teslim olur ve Sibirya’ya kürek cezasına gönderilir. Sonya da onun peşinden Sibirya'ya gider. Orada geçirdiği zorlu yılların ardından Raskolnikov, kibrini kırarak sevgiyi ve manevi dirilişi kabul eder.</p>
""",
        "characters": [
            ("Rodion Romanoviç Raskolnikov", "Romanın başkahramanı. Zeki, gururlu ancak nihilist düşüncelerin pençesinde kıvranan genç. Kendi teorisinin kurbanı olur."),
            ("Sofya (Sonya) Semyonovna Marmeladova", "Fedakarlığın, saf sevginin ve koşulsuz affediciliğin simgesi. Raskolnikov'un ruhsal kurtarıcısı."),
            ("Porfiri Petroviç", "Cinayet masası sorgu yargıcı. Modern psikolojik sorgulama yöntemlerinin edebiyattaki en parlak temsilcisi."),
            ("Dmitri Prokofyeviç Razumihin", "Raskolnikov’un sadık, dürüst ve çalışkan dostu. Hayat dolu ve pratik aklın temsilcisi."),
            ("Arkadi İvanoviç Svidrigaylov", "Raskolnikov’un karanlık ve ahlaki sınırları tamamen yitirmiş öteki benliği. İntiharla sonlanan trajik bir figür.")
        ],
        "themes": "Vicdan azabı, ahlaki üstünlük yanılgısı, kefaret, yoksulluğun insan onuru üzerindeki yıkıcı etkisi ve sevgi yoluyla ruhsal kurtuluş.",
        "quotes": [
            "İnsan her şeye alışan bir yaratıktır; sanırım insanoğlunun en doğru tanımı da budur.",
            "Güç, yalnızca eğilip onu alma cesaretini gösterenlere verilir.",
            "Bir insanın hayatı boyunca kaç kez öldüğünü ancak kendisi bilir."
        ]
    },
    {
        "title": "Cennetin Doğusu – John Steinbeck | Kitap Özeti, Konusu ve Karakter Analizi",
        "slug": "cennetin-dogusu-kitap-ozeti",
        "excerpt": "Nobel ödüllü John Steinbeck'in en büyük eseri Cennetin Doğusu kitap özeti. Habil ile Kabil alegorisi, Salinas Vadisi, iyi ile kötünün ebedi savaşı ve Timşel kavramı.",
        "cover": "https://covers.openlibrary.org/b/id/11386937-L.jpg",
        "tags": ["Cennetin Doğusu", "John Steinbeck", "Kitap Özeti", "Dünya Edebiyatı", "Timshel", "Salinas Vadisi", "Roman Özeti"],
        "author": "John Steinbeck",
        "original_title": "East of Eden",
        "year": "1952",
        "pages": "720 Sayfa",
        "quick_summary": "Kaliforniya'nın Salinas Vadisi'nde geçen Cennetin Doğusu, Trask ve Hamilton ailelerinin nesiller boyu süren destansı hikayesini anlatır. İncil'deki Habil ve Kabil kıssasını modern zamana uyarlayan roman, babalarının sevgisini kazanmak için yarışan iki kardeşin (Adam ve Charles, daha sonra Aron ve Cal) çatışmasını ve kötülüğün somutlaşmış hali olan Cathy (Kate) karakteri etrafında şekillenen trajediyi konu alır. Romanın merkezinde İbranice 'Timşel' (Seçebilirsin) kelimesi yatar: İnsan kaderinin mahkumu değildir, iyilik ile kötülük arasında seçim yapma özgürlüğüne sahiptir.",
        "full_plot": """
<p>John Steinbeck’in <em>"Bu kitaptan önce yazdığım her şey sadece bir hazırlıktı"</em> dediği <strong>Cennetin Doğusu</strong>, 1. Dünya Savaşı öncesinden başlayarak Amerikan topraklarında iyi ve kötünün köklerini araştırır.</p>
<h3>Giriş: Trask Ailesinin Laneti</h3>
<p>Hikaye, Connecticut'ta otoriter bir baba olan Cyrus Trask ve oğulları Adam ile Charles ile başlar. Adam sakin ve hayalperestken, Charles güçlü, öfkeli ve babasının sevgisini kazanmaya takıntılıdır. Charles, babasının Adam'a hediye edilen bir köpeği kendi pahalı çakısına tercih etmesi üzerine kardeşini öldürmeye kalkar (Habil ile Kabil'in ilk tezahürü). Adam daha sonra orduya katılır, yıllar sonra Salinas Vadisi'ne yerleşme kararı alır.</p>
<h3>Gelişme: Cathy Ames ve İkizlerin Doğuşu</h3>
<p>Yol boyunca Adam, yaralı halde kapısına sığınan güzel ama doğuştan vicdansız ve manipülatif bir kadın olan Cathy ile evlenir. Salinas'a yerleşirler. Cathy ikiz erkek çocuk doğurur: Aron ve Caleb (Cal). Doğumun hemen ardından Cathy, Adam'ı omzundan vurarak terk eder ve kasabada genelev işletmecisi Kate olarak karanlık bir hayata başlar. Yıkılan Adam, çocukları bilge Çinli uşağı Lee ve neşeli komşusu Samuel Hamilton'ın yardımıyla büyütür.</p>
<h3>Sonuç: Cal'in Mücadelesi ve Timşel</h3>
<p>Büyüyen ikizlerden Aron saf, yakışıklı ve herkesin sevdiği çocukken; Cal karanlık içgüdüleri olan, annesinin kötülüğünü taşıdığından korkan ama babasının onayına can atan bir gençtir. Cal, babasının iflasını önlemek için fasulye ticaretinden kazandığı parayı babasına hediye eder; ancak Adam bu savaş karını reddeder ve Aron'un üniversite başarısını över. Kalbi kırılan Cal, Aron'a annelerinin bir genelev patroniçesi olduğunu gösterir. Şoka giren Aron orduya yazılır ve savaşta ölür. Felç geçiren Adam ölüm döşeğindeyken, bilge Lee'nin yalvarması üzerine Cal'i affeder ve ona son sözü olarak fısıldar: <strong>"Timşel!"</strong> (Sen seçebilirsin).</p>
""",
        "characters": [
            ("Adam Trask", "İyiliğe ve saflığa körü körüne inanan, gerçeklerin sertliği karşısında kırılan dürüst bir baba."),
            ("Caleb (Cal) Trask", "Modern Kabil. İçindeki kötülük tohumlarıyla savaşan, reddedilmişliğin acısını çeken ama nihayetinde ahlaki seçimi başaran trajik kahraman."),
            ("Aron Trask", "Modern Habil. Saf, idealist ancak gerçek dünyanın karanlığıyla yüzleşemeyecek kadar kırılgan."),
            ("Cathy Ames (Kate)", "Saf kötülüğün romandaki simgesi. Vicdan ve empati duygusundan tamamen yoksun bir anti-kahraman."),
            ("Lee", "Trask ailesinin bilge Çinli uşağı. Felsefi derinliğiyle romanın vicdanı ve 'Timşel' kavramının taşıyıcısı.")
        ],
        "themes": "Özgür irade, baba sevgisi için rekabet, aile travmalarının nesilden nesile aktarımı ve iyiyi seçme gücü (Timşel).",
        "quotes": [
            "Ve sen ona hükmedebilirsin... İşte bu insanın büyüklüğüdür: Seçebilirsin!",
            "Bazen bana öyle geliyor ki, sevgi eksikliği dünyadaki bütün kötülüklerin anasıdır.",
            "İnsan iyilikle kötülük arasındaki savaş alanıdır."
        ]
    },
    {
        "title": "Aşk-ı Memnu – Halid Ziya Uşaklıgil | Kitap Özeti, Karakter Tahlili ve Konusu",
        "slug": "aski-memnu-kitap-ozeti",
        "excerpt": "Türk edebiyatının ilk modern romanı Aşk-ı Memnu kitap özeti. Bihter ve Behlül'ün yasak aşkı, Adnan Bey, Nihal, Matmazel ve Boğaziçi yalısındaki trajik çöküş.",
        "cover": "https://covers.openlibrary.org/b/id/10849165-L.jpg",
        "tags": ["Aşk-ı Memnu", "Halid Ziya Uşaklıgil", "Kitap Özeti", "Türk Edebiyatı", "Servet-i Fünun", "Bihter Ziyagil", "Behlül"],
        "author": "Halid Ziya Uşaklıgil",
        "original_title": "Aşk-ı Memnû",
        "year": "1900",
        "pages": "520 Sayfa",
        "quick_summary": "Zengin ve dul Adnan Bey ile evlenen genç ve güzel Bihter'in, yalıdaki lüks hayata rağmen hissettiği derin tatminsizlik ve Adnan Bey'in çapkın yeğeni Behlül ile yaşadığı yasak aşkın hikayesidir. Bu yasak ilişki, Adnan Bey'in kızı Nihal'in büyümesi ve Behlül'ün Nihal ile evlenmeye karar vermesiyle trajediye dönüşür. İhanetin ortaya çıkmasıyla Bihter intihar ederken, yalı sakinlerinin hayatı paramparça olur.",
        "full_plot": """
<p>Servet-i Fünun döneminin başyapıtı olan <strong>Aşk-ı Memnu</strong> (Yasak Aşk), Batılı anlamda Türk romanının ilk kusursuz örneği kabul edilir.</p>
<h3>Giriş: Melih Bey Takımı ve Evlilik</h3>
<p>Firdevs Hanım, kocasının ölümünden sonra iki kızı Bihter ve Peyker ile birlikte gösterişli ama borç içinde bir hayat sürmektedir. Yaşlı ve zengin Adnan Bey, Firdevs Hanım yerine genç kızı Bihter’e talip olur. Bihter, hem annesinin hırsından kaçmak hem de zengin bir yalı hayatına kavuşmak için yaş farkına rağmen Adnan Bey ile evlenmeyi kabul eder.</p>
<h3>Gelişme: Yasak Aşkın Başlaması</h3>
<p>Yalıya taşınan Bihter, Adnan Bey'in çocukları Nihal ve Bülent ile Fransız mürebbiye Matmazel de Courton'un bulunduğu mesafeli ortamda aradığı mutluluğu bulamaz. Adnan Bey'in yeğeni, sorumsuz ve çapkın Behlül yalıya sık sık gelip gitmektedir. Zamanla Behlül ile Bihter arasında gizli ve tutkulu bir yasak aşk başlar. Ancak bu ilişki vicdan azabı, kıskançlık ve korkuyla zehirlenir.</p>
<h3>Sonuç: İhanet, Yüzleşme ve İntihar</h3>
<p>Behlül, ilişkinin tehlikesinden korkarak Bihter'den uzaklaşmaya başlar. Firdevs Hanım'ın kurnazca yönlendirmesiyle Behlül, masum Nihal ile nişanlanmayı kabul eder. Bihter, sevdiği erkeğin üvey kızıyla evlenecek olmasını gururuna yediremez. Düğün sabahı Adnan Bey her şeyi öğrenir. Kapı çalındığı anda Bihter göğsüne dayadığı tabancayı ateşleyerek intihar eder. Behlül kaçar, Adnan Bey ve çocukları ise kırık kalpleriyle yalıdan ayrılır.</p>
""",
        "characters": [
            ("Bihter Ziyagil", "Tutkulu, gururlu, annesinin kaderini yaşamaktan korkarken tam da onun hatalarına sürüklenen trajik kadın kahraman."),
            ("Behlül", "Zevk düşkünü, cesaretsiz, sorumluluk almaktan kaçan alafranga bir genç."),
            ("Adnan Bey", "İyi niyetli, kibar, ailesini korumaya çalışan olgun ve varlıklı bir beyefendi."),
            ("Nihal", "Hassas, içe dönük, babasına aşırı bağlı, piyano çalan masum genç kız."),
            ("Firdevs Hanım", "Hırslı, gösteriş budalası, entrikacı ve kızının hayatını mahveden anne figürü.")
        ],
        "themes": "Yasak aşk, kuşak çatışması, alafrangalık özentisi, aile kurumunun sarsılması ve kibrin bedeli.",
        "quotes": [
            "Ölüyorum kederimden... Kimse beni anlamadı!",
            "İnsan kalbinin derinliklerinde öyle arzular vardır ki, uyandıkları an felaket başlar.",
            "Bir yalanın içinde yaşamak, hakikatin acısıyla ölmekten daha zordur."
        ]
    },
    {
        "title": "1984 – George Orwell | Kitap Özeti, Karakterleri ve Distopya Analizi",
        "slug": "1984-kitap-ozeti",
        "excerpt": "George Orwell'in kült distopyası 1984 kitap özeti. Büyük Birader, Tele-ekranlar, Düşünce Polisi, Winston Smith ve totalitarizmin korkutucu yüzü.",
        "cover": "https://covers.openlibrary.org/b/id/9267242-L.jpg",
        "tags": ["1984", "George Orwell", "Kitap Özeti", "Distopya", "Büyük Birader", "Winston Smith", "Çifte Düşün"],
        "author": "George Orwell",
        "original_title": "Nineteen Eighty-Four",
        "year": "1949",
        "pages": "352 Sayfa",
        "quick_summary": "Totaliter bir rejim olan Okyanusya'da geçen romanda, 'Büyük Birader' adlı görünmez bir lider toplumu tele-ekranlar ve Düşünce Polisi ile 24 saat gözetler. Gerçek Bakanlığı'nda geçmişi partinin isteklerine göre yeniden yazan Winston Smith, partinin yalanlarına ve baskısına gizlice isyan eder. Julia ile yasak bir aşk yaşar ve partiyi devirmeyi hayal eder. Ancak parti yöneticisi O'Brien tarafından tuzağa düşürülür. Sevgi Bakanlığı'ndaki korkunç işkenceler (101 Numaralı Oda) sonucu Winston, kendi benliğini ve Julia'ya olan sevgisini kaybederek Büyük Birader'i sevmeyi öğrenir.",
        "full_plot": """
<p><strong>1984</strong>, insan zihninin, dilinin ve özgürlüğünün mutlak bir devlet mekanizması tarafından nasıl yok edilebileceğini anlatan en etkileyici distopik eserdir.</p>
<h3>Giriş: Gözetleme Toplumu ve Winston'ın Günlüğü</h3>
<p>Winston Smith, Londra'da (Hava Sahası Bir) Gerçek Bakanlığı'nda çalışan sıradan bir parti üyesidir. Görevi, gazete arşivlerini partinin değişen politikalarına göre geriye dönük olarak değiştirmektir. Toplum üç slogana şartlandırılmıştır: <em>"Savaş Barıştır, Özgürlük Köleliktir, Cahil Güçtür."</em> Winston, tele-ekranların görmediği kör bir köşede gizlice bir günlük tutmaya başlar. Bu, rejime göre ölümle cezalandırılan bir 'Düşünce Suçu'dur.</p>
<h3>Gelişme: Julia ve Yasak Aşk</h3>
<p>Winston, kendisini takip ettiğini sandığı genç parti üyesi Julia'dan bir not alır: "Seni seviyorum". İkili, tele-ekranlardan uzakta kırlarda ve eski bir antika dükkanının üst katındaki odada gizlice buluşmaya başlar. Parti içindeki yüksek rütbeli O'Brien'ın da rejime karşı gizli 'Kardeşlik' örgütüne mensup olduğuna inanırlar. O'Brien onları evine davet eder ve yasak kitabı (Goldstein'ın Kitabı) verir.</p>
<h3>Sonuç: 101 Numaralı Oda ve Teslimiyet</h3>
<p>Kiraladıkları odadaki tablonun arkasına gizlenmiş bir tele-ekran ortaya çıkar; antika dükkanı sahibi meğer Düşünce Polisi ajanıdır. Winston ve Julia tutuklanır. Winston, Sevgi Bakanlığı'na götürülür. İşkencecisi bizzat O'Brien'dır. O'Brien ona partinin amacının güç uğruna güç olduğunu öğretir: <em>"Geleceğin bir resmini görmek istiyorsan, sonsuza dek bir insan yüzüne basan bir postal hayal et."</em> En büyük korkusu olan farelerle yüzleştiği 101 Numaralı Oda'da Winston, canını kurtarmak için Julia'yı ele verir: "Bana yapmayın, Julia'ya yapın!". Ruhsal olarak tamamen kırılan Winston serbest bırakılır. Artık rejimle savaşacak gücü kalmamıştır. Romanın son cümlesi insanlığın yenilgisini ilan eder: <strong>"Büyük Birader'i seviyordu."</strong></p>
""",
        "characters": [
            ("Winston Smith", "39 yaşında, zayıf, rejimin yalanlarını sorgulayan ve bireyselliğini korumaya çalışan başkahraman."),
            ("Julia", "Pratik zekalı, siyasi ideolojilerden ziyade kendi yaşam zevkleri için kuralları çiğneyen genç kadın."),
            ("O'Brien", "Parti İç Çember üyesi. Entelektüel, acımasız ve beyni yıkama sürecinin mimarı olan sorgucu."),
            ("Büyük Birader (Big Brother)", "Okyanusya'nın ebedi lideri. Gerçekte var olup olmadığı belirsiz, mutlak otoritenin simgesi."),
            ("Emmanuel Goldstein", "Partinin bir numaralı düşmanı ve Kardeşlik örgütünün lideri olarak sunulan figür.")
        ],
        "themes": "Totalitarizm, zihin kontrolü, tarihin tahrif edilmesi, dilin daraltılması (Yenisöylem) ve bireysel özgürlüğün yok edilişi.",
        "quotes": [
            "Büyük Birader seni izliyor.",
            "Geçmişi kontrol eden geleceği kontrol eder; şimdiyi kontrol eden geçmişi kontrol eder.",
            "Özgürlük, iki kere ikinin dört ettiğini söyleyebilmektir. Buna izin verilirse, gerisi kendiliğinden gelir."
        ]
    },
    {
        "title": "Satranç – Stefan Zweig | Kitap Özeti, Konusu ve Psikolojik Çözümlemesi",
        "slug": "satranc-kitap-ozeti",
        "excerpt": "Stefan Zweig'ın intiharından önce yazdığı başyapıtı Satranç kitap özeti. Dr. B'nin Gestapo hücresinde satrançla delirmesi, Czentovic ve zihinsel tecrit.",
        "cover": "https://covers.openlibrary.org/b/id/5548285-L.jpg",
        "tags": ["Satranç", "Stefan Zweig", "Kitap Özeti", "Schachnovelle", "Dr. B", "Czentovic", "Dünya Klasikleri"],
        "author": "Stefan Zweig",
        "original_title": "Schachnovelle",
        "year": "1942",
        "pages": "84 Sayfa",
        "quick_summary": "New York'tan Buenos Aires'e giden bir yolcu gemisinde, kaba ve eğitimsiz dünya satranç şampiyonu Mirko Czentovic ile Gestapo tarafından bir otel odasında tam bir tecrit altında tutulan Avusturyalı Dr. B. karşılaşır. Dr. B, aylar süren mutlak yalnızlık sırasında çaldığı bir satranç kitabındaki 150 oyunu ezberlemiş ve ardından kendi zihnini ikiye bölerek kendine karşı satranç oynamaktan deliliğin eşiğine gelmiştir. Gemideki maç, kaba zeka ile entelektüel travmanın trajik bir hesaplaşmasına dönüşür.",
        "full_plot": """
<p>Stefan Zweig’ın 1942 yılında Brezilya’da sürgündeyken yazdığı ve intihar etmeden önce tamamladığı son eseri olan <strong>Satranç</strong>, Nazi totalitarizminin insan ruhunda açtığı derin yaraları simgeler.</p>
<h3>Giriş: Vapur Yolculuğu ve Dünya Şampiyonu</h3>
<p>Anlatıcı, New York'tan Buenos Aires'e giden lüks bir transatlantiktedir. Gemide dünya satranç şampiyonu Mirko Czentovic de bulunmaktadır. Czentovic, kültürsüz, açgözlü ve kaba biridir; satranç tahtası dışında hiçbir alanda varlık gösteremez. Zengin bir petrolcü olan McConnor, parayla Czentovic'i bir maça ikna eder ancak şampiyon karşısında hezimete uğrar.</p>
<h3>Gelişme: Dr. B'nin Ortaya Çıkışı ve Hücre Hikayesi</h3>
<p>İkinci maçta Czentovic tam kazanmak üzereyken gizemli bir yolcu (Dr. B.) müdahale eder ve maçı beraberliğe taşır. Anlatıcı bu gizemli adamla tanışır ve hikayesini dinler: Dr. B., Viyana'da kilise ve kraliyet ailesinin mallarını yöneten bir avukattır. Naziler Avusturya'yı işgal ettiğinde tutuklanır ve fiziksel işkence yerine mutlak bir duyusal tecride tabi tutulur: Dört duvar arasında saat, kitap, kağıt olmadan aylarca bekletilir. Sorgu öncesi bir montun cebinden çaldığı satranç kitabı sayesinde hayata tutunur. Kitaptaki 150 şampiyonluk oyununu zihninde oynar. Ancak kitap bitince, beynini 'Beyaz' ve 'Siyah' olarak ikiye bölüp kendine karşı oynamaya başlar; bu durum onda 'satranç zehirlenmesi' denilen bir sinir krizine yol açar.</p>
<h3>Sonuç: Şampiyonla Düello ve Krizin Nüksedişi</h3>
<p>Dr. B., sadece tek bir gerçek tahta üzerinde oynayıp oynamayacağını görmek için Czentovic ile maça oturur. İlk oyunu muhteşem bir stratejiyle kazanır. Ancak Czentovic rakibinin sabırsız ve sinirli yapısını fark eder; ikinci oyunda hamlelerini bilerek dakikalarca uzatır. Dr. B. beklerken zihninde gelecekteki yüzlerce hamleyi oynamaya başlar, eski hücresindeki delilik nöbeti geri döner. Anlatıcının uyarısıyla tahtadan çekilir ve bir daha asla satranç oynamayacağını belirterek masayı terk eder.</p>
""",
        "characters": [
            ("Dr. B.", "Entelektüel, Nazi tecridinin zihninde açtığı yaraları satranç tutkusuyla sarmaya çalışan ama bu tutkunun kurbanı olan Avusturyalı hukukçu."),
            ("Mirko Czentovic", "Eğitimsiz, duygusuz, mekanik ve kibirli dünya satranç şampiyonu. Totaliter zihniyetin kaba gücünü temsil eder."),
            ("Anlatıcı", "Olayları tarafsızca gözlemleyen, Dr. B.'nin psikolojik derinliğini keşfeden yazar figürü."),
            ("McConnor", "Parasıyla her şeyi satın alabileceğini düşünen hırslı İskoç maden mühendisi.")
        ],
        "themes": "Zihinsel tecrit, delilik ve deha sınırı, faşizmin entelektüel dünya üzerindeki yıkıcı etkisi ve psikolojik takıntı.",
        "quotes": [
            "Hiçbir şey ruhu 'hiçlik' kadar yoramaz.",
            "İnsan beyni kendi kendisiyle satranç oynayamaz; çünkü bir hamleyi yaparken öteki hamleyi önceden bilmemesi imkansızdır.",
            "Bizi hiçbir şeye maruz bırakmadılar; sadece bir hiçliğin ortasına terk ettiler."
        ]
    },
    {
        "title": "Momo – Michael Ende | Kitap Özeti, Zaman Hırsızları ve Felsefi Mesajı",
        "slug": "momo-kitap-ozeti",
        "excerpt": "Michael Ende'nin unutulmaz masalsı romanı Momo kitap özeti. Duman adamlar, zaman tasarruf şirketi, dinleme sanatı, Kassiopeia ve Hora Usta.",
        "cover": "https://covers.openlibrary.org/b/id/8574580-L.jpg",
        "tags": ["Momo", "Michael Ende", "Kitap Özeti", "Zaman Felsefesi", "Duman Adamlar", "Çocuk Edebiyatı", "Dünya Edebiyatı"],
        "author": "Michael Ende",
        "original_title": "Momo",
        "year": "1973",
        "pages": "304 Sayfa",
        "quick_summary": "Eski bir amfitiyatronun kalıntılarında yaşayan küçük bir kız olan Momo, insanları gerçekten dinleme yeteneğiyle herkesin sevgisini kazanır. Ancak şehre 'Duman Adamlar' (Zaman Hırsızları) gelir. İnsanlara zamanlarını tasarruf etmelerini söyleyerek hayatın neşesini, sevgiyi ve dostluğu çalarlar. Zamanı donan şehri kurtarmak için Momo, kaplumbağa Kassiopeia ve Zamanın Efendisi Hora Usta ile birlikte duman adamlarla amansız bir mücadeleye girişir.",
        "full_plot": """
<p>Michael Ende’nin kaleme aldığı <strong>Momo</strong>, modern insanın sürekli bir yerlere yetişme telaşı içinde asıl hayatı nasıl kaçırdığını anlatan zamansız bir başyapıttır.</p>
<h3>Giriş: Amfitiyatro ve Dinlemenin Büyüsü</h3>
<p>Büyük bir kentin kenarındaki harabe amfitiyatroda kimsesiz bir kız çocuğu yaşamaktadır: Momo. Kimse nereden geldiğini bilmez. Momo'nun süper güçleri yoktur; tek bir özel yeteneği vardır: İnsanları tüm kalbiyle dinlemek. İnsanlar Momo’ya içlerini döktüklerinde dertlerine çözüm bulur, küsler barışır, çocuklar hayal güçleriyle harika oyunlar kurar. Momo'nun en yakın dostları yaşlı çöpçü Beppo ve hayalperest rehber Gigi'dir.</p>
<h3>Gelişme: Duman Adamlar ve Çalınan Zaman</h3>
<p>Kente gri takım elbiseli, kül rengi yüzlü, ağızlarında puro tüten 'Duman Adamlar' sızar. Kendilerini 'Zaman Tasarruf Şirketi' temsilcileri olarak tanıtırlar. İnsanları ikna ederler: Yaşlı anneni ziyaret etme, çiçek yetiştirme, sohbet etme, tasarruf et ki gelecekte zengin olasın! İnsanlar zaman tasarrufu yaptıkça daha hızlı çalışır ama daha mutsuz, sevgisiz ve tahammülsüz hale gelirler. Gerçekte ise tasarruf edilen zaman bankada birikmez; duman adamlar insanların çalınan zaman çiçeklerini kurutup içtikleri purolarla beslenmektedir.</p>
<h3>Sonuç: Zaman Çiçekleri ve Kurtuluş</h3>
<p>Duman adamlar Momo'nun dinleme gücünün kendi sistemlerini bozduğunu fark edip onu ortadan kaldırmak ister. Momo, geleceği yarım saat önceden gören kaplumbağa Kassiopeia sayesinde 'Hiçbir Yer Evi'ne ve Zamanın Efendisi Hora Usta'ya sığınır. Hora Usta, evrenin zamanını durdurur. Elinde tek bir saat çiçeği kalan Momo, duman adamların puro depolarını kapatarak onların yok olmasını sağlar. İnsanlara çalınan zamanları geri verilir; sokaklar yeniden kahkahalarla, sevgiyle ve neşeyle dolar.</p>
""",
        "characters": [
            ("Momo", "Kocaman ceketli, kıvırcık saçlı küçük kız. Sabırla ve sevgiyle dinlemenin gücünü temsil eder."),
            ("Duman Adamlar (Gri Adamlar)", "Tüketim toplumunun, yabancılaşmanın ve zamanı metalaştıran kapitalist düzenin alegorik temsilcileri."),
            ("Beppo (Çöpçü)", "Adım adım, nefes nefes çalışmanın bilgeliğini bilen sabırlı ihtiyar."),
            ("Gigi (Girolamo)", "Harika hikayeler uyduran, duman adamların tuzağına düşüp ünlü olunca mutsuzlaşan hayalperest genç."),
            ("Hora Usta & Kassiopeia", "Zamanın koruyucusu bilge yaşlı ve kabuğunda harfler beliren gizemli kaplumbağa.")
        ],
        "themes": "Zamanın gerçek değeri, samimi dinleme sanatı, modern hayatın hızı ve tüketim çılgınlığına karşı çocuksu masumiyet.",
        "quotes": [
            "Zaman yaşamın ta kendisidir ve yaşamın yeri yürektir.",
            "İnsanlar zaman tasarruf ettikçe, aslında hayatlarından tasarruf ettiklerinin farkında değildiler.",
            "Dinlemek, bir başkasına verilebilecek en büyük armağandır."
        ]
    },
    {
        "title": "Kürk Mantolu Madonna – Sabahattin Ali | Kitap Özeti ve Raif Efendi Analizi",
        "slug": "kurk-mantolu-madonna-kitap-ozeti",
        "excerpt": "Sabahattin Ali'nin unutulmaz aşk romanı Kürk Mantolu Madonna kitap özeti. Raif Efendi, Maria Puder, Ankara-Berlin hattında tutku, sessizlik ve hüzün.",
        "cover": "https://covers.openlibrary.org/b/id/12762238-L.jpg",
        "tags": ["Kürk Mantolu Madonna", "Sabahattin Ali", "Kitap Özeti", "Raif Efendi", "Maria Puder", "Türk Klasikleri", "Aşk Romanı"],
        "author": "Sabahattin Ali",
        "original_title": "Kürk Mantolu Madonna",
        "year": "1943",
        "pages": "160 Sayfa",
        "quick_summary": "Ankara'da bir şirkette içine kapanık, herkesin hor gördüğü sessiz memur Raif Efendi'nin vefatından önce iş arkadaşına bıraktığı siyah kaplı defter aracılığıyla, gençliğinde Berlin'de yaşadığı büyük ve sarsıcı aşkın öyküsü anlatılır. Bir sanat galerisinde gördüğü otoportre tablosuna aşık olan Raif Efendi, tablonun ressamı Maria Puder ile tanışır. Birbirlerine derin bir bağla bağlanan iki yalnız ruhun hikayesi, yanlış anlaşılmalar ve trajik bir kaderle noktalanır.",
        "full_plot": """
<p>Sabahattin Ali’nin 1943 yılında yayımlanan <strong>Kürk Mantolu Madonna</strong> romanı, dışarıdan silik ve önemsiz görünen bir insanın iç dünyasındaki devasa fırtınaları gözler önüne seren bir başyapıttır.</p>
<h3>Giriş: Ankara'daki Sessiz Memur</h3>
<p>İşsiz bir genç olan anlatıcı, eski bir okul arkadaşının aracılığıyla bir şirkette işe başlar. Aynı odada çevirmenlik yapan Raif Efendi, kimseye karışmayan, ailesi dahil herkesin ezdiği, sessiz ve içine kapanık bir adamdır. Anlatıcı, bu silik adamın içindeki gizemi merak eder ve aralarında sessiz bir dostluk başlar. Raif Efendi ağır hastalanınca, ölüm döşeğinde anlatıcıdan çekmecesindeki siyah kaplı defteri yakmasını ister. Ancak anlatıcı defteri okumak için izin alır.</p>
<h3>Gelişme: Berlin Yılları ve Tablodaki Kadın</h3>
<p>Defter, Raif Efendi'nin 1920'lerde babası tarafından sabunculuk öğrenmesi için gönderildiği Berlin günlerini anlatır. Raif, fabrikalardan ziyade müzeleri ve galerileri gezmektedir. Bir sergide, Andrea del Sarto'nun Madonna tablosunu andıran kürk mantolu bir kadın otoportresine vurulur. Günlerce tablonun karşısında saatlerce oturur. Bir akşam tablonun ressamı olan Yahudi kökenli Maria Puder yanına gelir. İkili arasında alışılmışın dışında, dostlukla başlayıp büyük bir tutkuya dönüşen bir bağ kurulur. Maria bağımsız, erkeklere güvenmeyen bir kadındır ancak Raif'in samimiyeti kalbini eritir.</p>
<h3>Sonuç: Ayrılık, Yanılgı ve Geç Gelen Gerçek</h3>
<p>Babasının ölümü üzerine Raif Efendi Türkiye'ye dönmek zorunda kalır. Mektuplaşırlar; Maria da Türkiye'ye gelecektir. Ancak aniden mektuplar kesilir. Raif, Maria'nın kendisini unuttuğunu ve terk ettiğini düşünerek derin bir küskünlüğe gömülür, sevmediği biriyle evlenip ruhunu öldürür. Yıllar sonra Ankara garında Maria'nın bir akrabasıyla karşılaşır ve acı gerçeği öğrenir: Maria, doğum yaparken ağır hastalanmış ve ölmüştür; yanındaki küçük kız çocuğu ise Raif'in kendi kızıdır! Raif Efendi, Maria'nın ona hiç ihanet etmediğini, kendisinin ise sevdiği kadına haksızlık ettiğini anlayarak ömrünün geri kalanını vicdan azabıyla tüketmiştir.</p>
""",
        "characters": [
            ("Raif Efendi", "Hassas, hayalperest, insanlardan incinmekten korktuğu için kabuğuna çekilmiş hüzünlü kahraman."),
            ("Maria Puder", "Özgürlüğüne düşkün, dürüst, erkek egemen dünyaya öfkeli ancak gerçek sevgiyi bulunca kendini adayan ressam."),
            ("Anlatıcı", "Raif Efendi'yi yargılamadan anlamaya çalışan, onun içindeki cevheri keşfeden genç memur.")
        ],
        "themes": "Yalnızlık, iletişimsizlik, aşkın dönüştürücü gücü, önyargılar ve dış görünüşün aldatıcılığı.",
        "quotes": [
            "Dünyanın en fena şeyi, bir insanın bir insana haksız yere güven duyması değil, o güveni boşa çıkarmasıdır.",
            "İçimizde şeytan var... Can kırıkları var, nefret var, yalan var.",
            "Kimi tutkular vardır ki, bir ömür boyu sürer ve insanı içten içe kemirir."
        ]
    },
    {
        "title": "Simyacı – Paulo Coelho | Kitap Özeti, Kişisel Menkıbe ve Temaları",
        "slug": "simyaci-kitap-ozeti",
        "excerpt": "Paulo Coelho'nun dünyaca ünlü romanı Simyacı kitap özeti. Endülüslü çoban Santiago'nun Mısır Piramitleri'ne uzanan Kişisel Menkıbe ve hazine arayışı.",
        "cover": "https://covers.openlibrary.org/b/id/7414780-L.jpg",
        "tags": ["Simyacı", "Paulo Coelho", "Kitap Özeti", "Kişisel Menkıbe", "Santiago", "Felsefi Roman", "Dünya Edebiyatı"],
        "author": "Paulo Coelho",
        "original_title": "O Alquimista",
        "year": "1988",
        "pages": "188 Sayfa",
        "quick_summary": "Endülüslü bir çoban olan Santiago, rüyasında Mısır Piramitleri'nde gizli bir hazine olduğunu görür. Salem Kralı Melkisedek ile tanıştıktan sonra koyunlarını satar ve hayallerinin peşinden gitmeye karar verir. Kuzey Afrika çöllerini aşarken soyulur, kristal dükkanında çalışır, çölde Fatima'ya aşık olur ve gerçek bir Simyacı ile karşılaşır. Yolculuğun sonunda piramitlere ulaşır ancak aradığı asıl hazinenin yola çıktığı kilisenin bahçesinde gömülü olduğunu anlar.",
        "full_plot": """
<p><strong>Simyacı</strong>, insanın kendi kaderini ('Kişisel Menkıbe') gerçekleştirme cesaretini ve evrenin dilini dinlemeyi anlatan büyüleyici bir felsefi masaldır.</p>
<h3>Giriş: Rüyalar ve Karar</h3>
<p>Santiago, İspanya'nın Endülüs bölgesinde koyunlarıyla dolaşan genç bir çobandır. Terk edilmiş bir kilisenin yıkıntılarında uyurken iki kez aynı rüyayı görür: Bir çocuk elinden tutarak onu Mısır Piramitleri'ndeki bir hazineye götürmektedir. Tarifa kasabasında bir falcıya ve ardından gizemli Salem Kralı Melkisedek'e danışır. Kral ona 'Kişisel Menkıbe' kavramını anlatır: <em>"Bir şeyi gerçekten istediğin zaman, bütün evren o arzunun gerçekleşmesi için iş birliği yapar."</em> Santiago koyunlarını satıp Afrika'ya geçer.</p>
<h3>Gelişme: Çöl Yolculuğu ve Fatima</h3>
<p>Tanca'ya vardığında tüm parasını bir hırsıza kaptırır. Bir kristal tüccarının yanında çalışarak para biriktirir ve dükkanı zenginleştirir. Ardından Sahra Çölü'nü aşacak bir kervana katılır. Kervanda simya kitapları okuyan bir İngiliz ile dost olur. Vahada kabile savaşları nedeniyle mahsur kaldıklarında, kuyu başında karşılaştığı Fatima'ya aşık olur. Fatima ona yoluna devam etmesi gerektiğini, gerçek aşkın asla erkeğin menkıbesine engel olmayacağını söyler. Santiago, çölde rüzgarı ve güneşi dinleyen gerçek bir Simyacı ile tanışır ve piramitlere doğru yolculuğa devam eder.</p>
<h3>Sonuç: Hazinenin Yeri</h3>
<p>Piramitlere ulaştığında gözyaşlarının düştüğü yeri kazmaya başlar. Ancak çöl haydutları onu yakalar, döver ve paralarını alır. Haydutların lideri gülerek ona bir rüyasından bahseder: Endülüs'te terk edilmiş bir kilisenin bahçesindeki çınar ağacının altında hazine olduğunu görmüş ama böyle aptalca bir rüya için yola çıkmayacak kadar akıllıymış! Santiago gülümser; hazinenin yerini öğrenmiştir. Endülüs'e döner, kilisedeki çınarın altını kazar ve altın dolu sandığı bulur. Ardından rüzgara seslenerek Fatima'sına döneceğini fısıldar.</p>
""",
        "characters": [
            ("Santiago", "Hayallerinin peşinden gitme cesaretini gösteren, evrenin işaretlerini okumayı öğrenen Endülüslü çoban."),
            ("Simyacı", "Kurşunu altına dönüştürmenin ötesinde, insanın ruhsal olgunlaşmasını sağlayan çöl bilgesi."),
            ("Melkisedek", "Salem Kralı. İnsanlara kendi menkıbelerini hatırlatan gizemli rehber."),
            ("Fatima", "Çöl kadını. Koşulsuz sevginin ve fedakarlığın simgesi."),
            ("Kristal Tüccarı", "Hayali olan Mekke'ye gitmekten korkan; çünkü hayali gerçekleşirse yaşamak için sebebi kalmayacağını düşünen adam.")
        ],
        "themes": "Kişisel menkıbe, evrenin ruhu, işaretleri okuma sanatı ve yolculuğun hedeften daha değerli oluşu.",
        "quotes": [
            "Bir şeyi gerçekten istersen, bütün evren onu gerçekleştirmen için iş birliği yapar.",
            "Korku, acının kendisinden daha çok acı verir.",
            "Gözün gördüğü hazine, yüreğin katlandığı yolculuğun ödülüdür."
        ]
    },
    {
        "title": "Küçük Prens – Antoine de Saint-Exupéry | Kitap Özeti ve Felsefi İncelemesi",
        "slug": "kucuk-prens-kitap-ozeti",
        "excerpt": "Dünyanın en çok okunan başyapıtı Küçük Prens kitap özeti. B-612 Gezegeni, Gül, Tilki ve 'Gerçeğin mayası gözle görülmez' öğretisi.",
        "cover": "https://covers.openlibrary.org/b/id/10708272-L.jpg",
        "tags": ["Küçük Prens", "Saint-Exupery", "Kitap Özeti", "B-612", "Felsefe", "Çocuk Edebiyatı", "Dünya Klasikleri"],
        "author": "Antoine de Saint-Exupéry",
        "original_title": "Le Petit Prince",
        "year": "1943",
        "pages": "112 Sayfa",
        "quick_summary": "Uçağı Sahra Çölü'ne düşen bir pilot, başka bir gezegenden gelen altın sarısı saçlı Küçük Prens ile karşılaşır. Küçük Prens, B-612 adlı minik asteroitinde tek bir kibirli güle baktığını, baobab ağaçlarıyla mücadele ettiğini ve evrende çıktığı yolculukta krallar, kibirliler, sarhoşlar ve fenercilerle tanıştığını anlatır. Dünya'da karşılaştığı tilkiden 'evcilleştirme'nin ve sevginin sırrını öğrenen Küçük Prens, gülüne dönmek için bedenini çölde bırakır.",
        "full_plot": """
<p><strong>Küçük Prens</strong>, görünüşte bir çocuk masalı gibi dursa da, yetişkinlerin anlamsız hırslarını, kaybettikleri masumiyeti ve sevginin derinliğini sorgulayan evrensel bir felsefe kitabıdır.</p>
<h3>Giriş: Çölde Karşılaşma ve Koyun Çizimi</h3>
<p>Pilot anlatıcı, çocukken çizdiği 'fil yutmuş boğa yılanı' resmini yetişkinlerin 'şapka' sanması yüzünden ressamlıktan vazgeçmiştir. Yıllar sonra uçağı Sahra Çölü'nde arızalanır. Issızlığın ortasında karşısına küçük bir çocuk çıkar ve ondan bir koyun çizmesini ister. Birkaç denemeden sonra pilot delikli bir kutu çizer: "İstediğin koyun bu kutunun içinde." Küçük Prens sevinçle kutunun içine bakar ve dost olurlar.</p>
<h3>Gelişme: Gezegenler Arası Yolculuk</h3>
<p>Küçük Prens, minik gezegeni Asteroit B-612'den gelmektedir. Orada üç yanardağ, zararlı baobab filizleri ve aşık olduğu kibirli, kaprisli tek bir gül vardır. Gülün kaprislerinden bunalarak gezegeninden ayrılmıştır. Yol boyunca tek bir kişinin yaşadığı gezegenleri ziyaret eder: Sadece buyurmayı bilen bir Kral, alkış bekleyen bir Kibirli, içtiğini unutmak için içen bir Sarhoş, gökteki yıldızları sayıp tapulayan bir İş Adamı ve emirlere körü körüne uyan bir Fenerci. Yetişkinlerin dünyasını son derece tuhaf bulur.</p>
<h3>Sonuç: Tilkinin Sırrı ve Gülün Eşsizliği</h3>
<p>Dünya'ya geldiğinde binlerce gülün bulunduğu bir bahçe görür ve kendi gülünün 'tek' olmadığını sanarak ağlar. Ancak bir tilki ile karşılaşır. Tilki ona 'evcilleştirmek' (bağ kurmak) kavramını öğretir: <em>"Sen benim için dünyadaki yüz binlerce çocuktan birisin. Ama beni evcilleştirirsen birbirimize muhtaç oluruz."</em> Küçük Prens anlar ki, kendi gülü için harcadığı emek onu diğer bütün güllerden eşsiz kılmıştır. Tilki ona büyük sırrı verir: <strong>"İnsan ancak yüreğiyle baktığı zaman doğruyu görebilir. Gerçeğin mayası gözle görülmez."</strong> Küçük Prens, gülüne geri dönmek için zehirli sarı yılanın kendisini sokmasına izin vererek bedeninden sıyrılır.</p>
""",
        "characters": [
            ("Küçük Prens", "Masumiyetin, çocuksu merakın ve saf sevginin simgesi."),
            ("Pilot", "Yetişkinlerin dünyasında çocuk ruhunu kaybetmemeye çalışan anlatıcı."),
            ("Gül", "Kırılgan, kaprisli, gururlu ama içten içe derin sevgi besleyen sevgili."),
            ("Tilki", "Dostluğun, sorumluluğun ve sevginin bilgeliğini taşıyan rehber."),
            ("Yılan", "Ölümün ve maddeden kurtulup ruha dönüşün gizemli aracısı.")
        ],
        "themes": "Sevgi, emek, sorumluluk, yetişkinlerin materyalist yanılgıları ve yürekle görme sanatı.",
        "quotes": [
            "İnsan ancak yüreğiyle baktığı zaman doğruyu görebilir. Gerçeğin mayası gözle görülmez.",
            "Gülünü senin için bunca önemli kılan, uğrunda harcadığın zamandır.",
            "Bütün yetişkinler bir zamanlar çocuktu... Ama pek azı bunu hatırlar."
        ]
    },
    {
        "title": "Yaprak Dökümü – Reşat Nuri Güntekin | Kitap Özeti ve Aile Çöküşü Analizi",
        "slug": "yaprak-dokumu-kitap-ozeti",
        "excerpt": "Reşat Nuri Güntekin'in ölümsüz eseri Yaprak Dökümü kitap özeti. Ali Rıza Bey'in dürüstlüğü, modernleşme sancısı, Şevket, Ferhunde ve dağılan aile.",
        "cover": "https://covers.openlibrary.org/b/id/12299291-L.jpg",
        "tags": ["Yaprak Dökümü", "Reşat Nuri Güntekin", "Kitap Özeti", "Ali Rıza Bey", "Türk Edebiyatı Klasikleri", "Toplumsal Değişim"],
        "author": "Reşat Nuri Güntekin",
        "original_title": "Yaprak Dökümü",
        "year": "1930",
        "pages": "168 Sayfa",
        "quick_summary": "Geleneksel ahlak değerlerine sıkı sıkıya bağlı eski bir memur olan Ali Rıza Bey'in, ailesini İstanbul'un lüks ve gösteriş düşkünü tüketim çılgınlığından koruma mücadelesidir. Oğlu Şevket'in hırslı Ferhunde ile evlenmesi, kızları Leyla ve Necla'nın Batılı hayat tarzı özentisiyle savrulması aileyi bir ağacın yaprakları gibi tek tek döker. Gururu yıkılan Ali Rıza Bey, sonunda ahlakını kaybettiği için evden kovduğu kızının yanına sığınmak zorunda kalır.",
        "full_plot": """
<p>Cumhuriyet dönemi Türk edebiyatının en sarsıcı toplumsal romanlarından biri olan <strong>Yaprak Dökümü</strong>, yanlış Batılılaşmanın ve tüketim hırsının bir aileyi nasıl yok ettiğini anlatır.</p>
<h3>Giriş: Namuslu Bir Memur ve Prensipleri</h3>
<p>Ali Rıza Bey, emekli olmuş, namuslu ve prensiplerinden asla taviz vermeyen bir devlet memurudur. Karısı Hayriye Hanım, oğlu Şevket ve kızları Fikret, Leyla, Necla ve küçük Ayşe ile İstanbul Bağlarbaşı’ndaki konaklarında mütevazı bir hayat sürmektedirler. Şevket bir bankada memur olarak çalışmaya başlayınca evin yükü hafifler gibi olur.</p>
<h3>Gelişme: Ferhunde ve Eğlence Hayatı</h3>
<p>Şevket, çalıştığı bankadaki hafifmeşrep ve lüks tutkunu Ferhunde ile evlenir. Ferhunde eve gelir gelmez konakta partiler, danslar ve eğlenceler başlatır. Leyla ve Necla da bu eğlenceli hayata kapılarak pahalı elbiseler ve gösterişli yaşam isterler. Evin bütçesi açık verir. Şevket borç batağına saplanır ve bankadan para zimmetine geçirerek hapse düşer. Bu ilk büyük yaprak dökümüdür. Ardından evin en aklı başında kızı Fikret, bu cehennemden kaçmak için Adapazarı'nda dul ve çocuklu bir adamla evlenip gider.</p>
<h3>Sonuç: Ağacın Bütün Yaprakları Dökülür</h3>
<p>Ferhunde Şevket'i hapisteyken terk eder. Leyla ve Necla lüks hayat uğruna zengin erkeklerle uygunsuz ilişkilere girerler. Ali Rıza Bey felç geçirir. Kızlarını evden kovar ancak yoksulluk karşısında çaresiz kalır. Romanın sonunda gururu yerle bir olan ihtiyar Ali Rıza Bey, metres hayatı yaşayan kızı Leyla'nın konağına sığınmak zorunda kalır; artık köşede bastonuna yaslanıp sessizce ölmeyi bekleyen kırık bir yapraktır.</p>
""",
        "characters": [
            ("Ali Rıza Bey", "Eski Osmanlı bürokrasisinin dürüst, namuslu ama değişen çağın acımasız gerçeklerine ayak uyduramayan trajik babası."),
            ("Hayriye Hanım", "Kızlarının lüks isteklerine göz yuman, zayıf karakterli anne."),
            ("Şevket", "Ailenin umudu iken karısının hırslarına boyun eğip hapse düşen zayıf iradeli oğul."),
            ("Ferhunde", "Modernleşmeyi tüketim ve ahlaksızlık olarak algılayan hırslı gelin."),
            ("Fikret", "Ailenin en fedakar ve onurlu kızı; çareyi mutsuz bir evlilikle kaçmakta bulur.")
        ],
        "themes": "Yanlış Batılılaşma, ahlaki çözülme, tüketim hırsı ve ataerkil aile yapısının çöküşü.",
        "quotes": [
            "Ağacımızdan bir yaprak daha koptu...",
            "İnsan namusuyla yaşamak istedi mi, dünya ona dar geliyor.",
            "Evimiz bir tiyatro sahnesine döndü; ama oynanan oyun bir komedi değil, felaketti."
        ]
    },
    {
        "title": "Çalıkuşu – Reşat Nuri Güntekin | Kitap Özeti, Feride ve Anadolu Gerçeği",
        "slug": "calikusu-kitap-ozeti",
        "excerpt": "Reşat Nuri Güntekin'in klasikleşen eseri Çalıkuşu kitap özeti. Feride'nin Kamran'a duyduğu aşk, Anadolu öğretmenliği, Zeyniler Köyü ve Munise.",
        "cover": "https://covers.openlibrary.org/b/id/12958080-L.jpg",
        "tags": ["Çalıkuşu", "Reşat Nuri Güntekin", "Kitap Özeti", "Feride", "Kamran", "Anadolu Öğretmeni", "Türk Romanı"],
        "author": "Reşat Nuri Güntekin",
        "original_title": "Çalıkuşu",
        "year": "1922",
        "pages": "540 Sayfa",
        "quick_summary": "İstanbul'da Dame de Sion Fransız mektebinde okuyan yaramaz, hayat dolu Feride (Çalıkuşu), teyzesinin oğlu Kamran'a aşıktır. Düğünden bir gün önce Kamran'ın İsviçre'de kendisini aldattığını öğrenince evden kaçar. Anadolu'nun en ücra köşelerinde (Zeyniler, Bursa, Çanakkale) idealist bir öğretmen olarak görev yapar. Karşılaştığı dedikodular ve zorluklar karşısında onurunu koruyan Feride, evlat edindiği Munise'nin ölümüyle sarsılır. Yıllar sonra Kamran'la yeniden yüzleşir.",
        "full_plot": """
<p><strong>Çalıkuşu</strong>, hem büyüleyici bir aşk romanı hem de Osmanlı'nın son döneminde Anadolu'nun cehalet, yoksulluk ve bürokrasiyle boğuşan gerçekliğini gözler önüne seren sosyolojik bir belgedir.</p>
<h3>Giriş: Erenköy Köşkü ve İhanet</h3>
<p>Küçük yaşta anne ve babasını kaybeden Feride, Erenköy'deki teyzesinin yanında büyür. Fransız okulunda okurken neşesi ve ağaçlara tırmanması yüzünden ona "Çalıkuşu" lakabı takılır. Büyüdükçe yakışıklı kuzeni Kamran ile aralarında derin bir aşk doğar ve nişanlanırlar. Ancak düğünden bir gün önce gizemli bir kadın Feride'ye Kamran'ın Avrupa'da Münevver adında başka bir kadınla aşk yaşadığını kanıtlayan mektuplar verir. Gururu kırılan Feride, gizlice köşkten kaçar.</p>
<h3>Gelişme: Anadolu Yollarında Bir Genç Kız</h3>
<p>Feride, Maarif Nezareti'ne başvurarak Anadolu'da öğretmenlik ister. Bursa'nın en ücra ve yoksul köyü Zeyniler'e tayin edilir. Burada köylülerin bağnazlığına karşı okul açar, sevgisiz bırakılmış küçük bir yetim kız olan Munise'yi evlat edinir. Feride'nin güzelliği gittiği her yerde başına dert olur; dedikodular ve iftiralar yüzünden Zeyniler'den Bursa'ya, oradan Çanakkale'ye tayin istemek zorunda kalır. Çanakkale'de hastanede yaralı askerlere bakar. Bu sırada Munise difteriden ölür ve Feride derin bir yasa boğulur.</p>
<h3>Sonuç: Hayrullah Bey ve Büyük Kavuşma</h3>
<p>Dedikodulardan kurtulmak için kendisini koruyan yaşlı ve saygın bir askeri doktor olan Hayrullah Bey ile kağıt üzerinde evlenir. Hayrullah Bey baba şefkatiyle yaklaşır, Feride'nin günlüğünü bulup okur ve onun hala Kamran'ı sevdiğini anlar. Ölmeden önce günlüğü paketleyip Feride'ye Kamran'a vermesini vasiyet eder. Hayrullah Bey ölünce Feride ailesiyle barışmak için Tekirdağ'a gider. Kamran günlüğü okur; Feride'nin onu hiç unutmadığını öğrenir. Feride tam tekrar kaçacakken kapıyı kilitler ve aşklarına sahip çıkarlar.</p>
""",
        "characters": [
            ("Feride (Çalıkuşu)", "Gururlu, zeki, sevecen, güzelliğiyle dikkat çeken ancak onurundan asla taviz vermeyen idealist kadın öğretmen."),
            ("Kamran", "Zayıf iradeli, kibar ama Feride'ye aşık olan genç."),
            ("Doktor Hayrullah Bey", "Feride'yi kızı gibi koruyan, fedakar ve babacan askeri hekim."),
            ("Munise", "Feride'nin evlat edindiği, sevgiye muhtaç masum köy kızı.")
        ],
        "themes": "Aşk ve gurur çatışması, Anadolu'nun aydınlanma ihtiyacı, kadın öğretmenlerin karşılaştığı zorluklar ve fedakarlık.",
        "quotes": [
            "İnsan en çok sevdiklerine kırılır; çünkü en derin yaraları onlar açabilir.",
            "Gözler kalbin aynasıdır derler; ama benim gözlerim sadece seni aradı.",
            "Anadolu bana hem acıyı hem de gerçek hayatın ne olduğunu öğretti."
        ]
    },
    {
        "title": "Don Kişot – Miguel de Cervantes | Kitap Özeti, Karakterleri ve Teması",
        "slug": "don-kisot-kitap-ozeti",
        "excerpt": "Modern romanın babası sayılan Don Kişot kitap özeti. Şövalye romanlarıyla aklını yitiren Alonso Quijano, Sanço Panza, yel değirmenleri ve Dulcinea.",
        "cover": "https://covers.openlibrary.org/b/id/14428305-L.jpg",
        "tags": ["Don Kişot", "Cervantes", "Kitap Özeti", "Sancho Panza", "Dünya Klasikleri", "Şövalyelik", "Edebiyat Tarihi"],
        "author": "Miguel de Cervantes Saavedra",
        "original_title": "Don Quixote de la Mancha",
        "year": "1605",
        "pages": "880 Sayfa",
        "quick_summary": "İspanya'nın La Mancha bölgesinde yaşayan yaşlı asilzade Alonso Quijano, okuduğu şövalye romanlarının etkisiyle aklını yitirir. Kendisini gezgin şövalye 'Don Kişot' ilan eder; cılız atı Rosinante, sadık ve köylü seyisi Sanço Panza ile birlikte dünyadaki haksızlıkları düzeltmek için yola çıkar. Yel değirmenlerini dev sanıp saldıran, hanları şato sanan Don Kişot'un trajikomik maceraları, idealizm ile acımasız gerçeklik arasındaki ebedi çatışmayı simgeler.",
        "full_plot": """
<p>1605 yılında Cervantes tarafından yazılan <strong>Don Kişot</strong>, tarihin ilk modern romanı ve edebiyat tarihinin en etkileyici parodisidir.</p>
<h3>Giriş: Şövalyelik Rüyası ve Yola Çıkış</h3>
<p>La Mancha’da yaşayan 50 yaşlarındaki yoksul soylu Alonso Quijano, gece gündüz şövalye maceraları okumaktan aklını kaçırır. Paslı dede yadigarı zırhlarını kuşanır, sıska atına 'Rosinante' adını verir ve komşu köydeki köylü kızı Aldonza Lorenzo'yu hayalinde soylu prenses 'Toboso'lu Dulcinea' yapar. Kendisine bir ada valiliği vadettiği şişman ve kurnaz köylü Sanço Panza’yı eşeğiyle birlikte seyis olarak yanına alır.</p>
<h3>Gelişme: Yel Değirmenleri ve Yanılsamalar</h3>
<p>Don Kişot'un dünyasında her şey yüce bir şövalyelik destanıdır: Ovada gördüğü yel değirmenlerini azgın devler sanarak mızrağıyla saldırır ve kanatlara takılıp savrulur; büyücülerin devleri değirmene çevirdiğini iddia eder. Koyun sürülerini düşman orduları sanıp kılıçtan geçirir, sıradan hanları şato, berber tasını ise büyülü 'Mambrino Miğferi' zanneder. Sanço Panza sık sık efendisini gerçekler konusunda uyarsa da onun hayal gücüne ve vaatlerine kapılmaktan kendini alamaz.</p>
<h3>Sonuç: Aynalar Şövalyesi ve Ölüm</h3>
<p>Dostları (Papaz ve Berber) onu eve döndürmek için planlar yaparlar. Sonunda kasabanın öğrencisi Samson Carrasco, 'Beyaz Ay Şövalyesi' kılığına girerek Don Kişot ile düello yapar ve onu yener. Şövalyelik yasası gereği Don Kişot silahlarını bir yıllığına bırakıp köyüne dönmek zorundadır. Köyüne dönen Don Kişot hastalanır, aklı başına gelir ve şövalyelik saçmalıklarını lanetler. Ancak ironik bir şekilde Sanço Panza şimdi ağlayarak ona şövalye olarak kırlara dönmeyi yalvarmaktadır. Don Kişot tövbe ederek huzur içinde can verir.</p>
""",
        "characters": [
            ("Don Kişot (Alonso Quijano)", "Hayalperest, saf, adaletsizliğe tahammülü olmayan trajikomik idealist."),
            ("Sanço Panza", "Pratik zekalı, açgözlü ama efendisine sadık, halk sağduyusunun temsilcisi."),
            ("Dulcinea del Toboso", "Don Kişot'un idealleştirdiği, hiçbir zaman görmediği platonik aşk simgesi."),
            ("Rosinante", "Şövalye atı sanılan sıska ve yaşlı beygir.")
        ],
        "themes": "İdealizm ve realizm çatışması, delilik ile bilgelik, edebiyatın insan zihni üzerindeki etkisi.",
        "quotes": [
            "Bugünün deliliği, yarının bilgeliğidir.",
            "Dünyayı olduğu gibi değil, olması gerektiği gibi gören bir adam deli midir?",
            "Özgürlük, Sanço, göklerin insanlara bağışladığı en değerli armağanlardan biridir."
        ]
    },
    {
        "title": "Dedemin Bakkalı – Şermin Yaşar | Kitap Özeti, Konusu ve Çıkarılacak Dersler",
        "slug": "dedemin-bakkali-kitap-ozeti",
        "excerpt": "Şermin Yaşar'ın çok satan çocuk edebiyatı eseri Dedemin Bakkalı kitap özeti. Girişimci küçük kızın bakkal maceraları ve yetişkin dünyasının eleştirisi.",
        "cover": "https://covers.openlibrary.org/b/id/10848617-L.jpg",
        "tags": ["Dedemin Bakkalı", "Şermin Yaşar", "Kitap Özeti", "Çocuk Edebiyatı", "Girişimcilik", "Eğitici Kitaplar"],
        "author": "Şermin Yaşar",
        "original_title": "Dedemin Bakkalı",
        "year": "2016",
        "pages": "200 Sayfa",
        "quick_summary": "Yazar Şermin Yaşar'ın kendi çocukluk anılarından yola çıkarak yazdığı kitapta, dedesinin bakkalında çıraklık yapan zeki ve yaratıcı bir kız çocuğunun hikayesi anlatılır. Ticarete ve hayata dair büyük fikirleri olan küçük kız; bakkala gelen müşterilere modern pazarlama taktikleri uygulamaya, bayat bisküvileri kremayla birleştirip satmaya ve inovatif çözümler üretmeye çalışır. Ancak her seferinde büyüklerin kalıplaşmış kurallarına çarpar.",
        "full_plot": """
<p><strong>Dedemin Bakkalı</strong>, çocukların gözünden yetişkinlerin sıkıcı ve kurallarla dolu dünyasını mizahi bir dille eleştiren sıcacık bir kitaptır.</p>
<h3>Giriş: Bakkal Çırağı Olma Kararı</h3>
<p>Kahramanımız, yaz tatilinde sokakta boş gezmek yerine dedesinin bakkalında çırak olarak çalışmaya karar verir. Amacı para kazanmak, büyüdüğünü kanıtlamak ve kendi fikirlerini hayata geçirmektir. Ancak dedesi eski usul, sert mizaçlı ve yeniliklere kapalı bir bakkaldır.</p>
<h3>Gelişme: İnovatif Fikirler ve Komik Felaketler</h3>
<p>Küçük kız ticareti hareketlendirmek için akıl almaz parlak fikirler bulur: Müşterilere daha çok satmak için dondurmaya zeytinyağı dökmeyi dener, kırık bisküvileri ezerek yeni tatlılar üretir, veresiye defterini düzenlemeye kalkar ve promosyon kampanyaları başlatır. Ancak dedesi bu yaratıcı fikirleri her seferinde 'yaramazlık' olarak görür ve ona bakkalı süpürmesini söyler. Küçük kahramanımız her başarısızlıkta yeni bir ders çıkarır ve hayal kurmaktan asla vazgeçmez.</p>
<h3>Sonuç: Çocuk Aklı ve Hayat Bilgisi</h3>
<p>Kitap, çocukların yaratıcılığının yetişkinlerin dar kalıpları tarafından nasıl törpülendiğini gösterirken, okurlara ticaret, dürüstlük, insan ilişkileri ve empati üzerine harika hayat dersleri sunar. Büyümek bazen hayallerden taviz vermektir ama çocuk kalabilmek asıl zenginliktir.</p>
""",
        "characters": [
            ("Küçük Kız (Şermin)", "Girişimci ruhlu, zeki, yenilikçi ve asla pes etmeyen sevimli kahraman."),
            ("Dede", "Geleneksel esnaf ahlakına bağlı, sert ama torununu içten seven bakkal sahibi."),
            ("Müşteriler", "Mahallenin dedikoducu teyzeleri, cimri amcaları ve sabırsız çocukları.")
        ],
        "themes": "Çocuk girişimciliği, hayal gücü, kuşak çatışması, esnaflık kültürü ve yaratıcı düşünce.",
        "quotes": [
            "Büyükler bazen o kadar çok düşünüyorlar ki, düşünmekten yaşamaya vakit bulamıyorlar.",
            "Ticaret sadece mal satmak değil, insanları mutlu etme sanatıdır.",
            "Çocukken kurduğumuz hayaller, büyüyünce bizi kurtaracak tek şeydir."
        ]
    },
    {
        "title": "İnsan Ne İle Yaşar? – Lev Tolstoy | Kitap Özeti ve Ahlaki Mesajları",
        "slug": "insan-ne-ile-yasar-kitap-ozeti",
        "excerpt": "Tolstoy'un ölümsüz felsefi klasiği İnsan Ne İle Yaşar? kitap özeti. Kunduracı Semyon, Tanrı'nın Meleği Mihail ve insanın içindeki sevgi sırrı.",
        "cover": "https://covers.openlibrary.org/b/id/11725468-L.jpg",
        "tags": ["İnsan Ne İle Yaşar", "Lev Tolstoy", "Kitap Özeti", "Dünya Klasikleri", "Felsefi Hikaye", "Ahlak ve Sevgi"],
        "author": "Lev Nikolayeviç Tolstoy",
        "original_title": "Chem Lyudi Zhivy",
        "year": "1885",
        "pages": "96 Sayfa",
        "quick_summary": "Yoksul kunduracı Semyon, kış günü sokakta çıplak ve donmak üzere olan gizemli bir genci (Mihail) evine alır. Aslında Mihail, Tanrı'ya itaatsizlik ettiği için yeryüzüne sürülen bir melektir ve cennete dönmek için üç gerçeği öğrenmesi gerekmektedir: 1) İnsanın içinde ne var? (Sevgi), 2) İnsana ne verilmemiştir? (Kendi geleceğini bilme yetisi), 3) İnsan ne ile yaşar? (İnsan kendisi için kaygılanarak değil, diğer insanlara duyduğu sevgiyle yaşar).",
        "full_plot": """
<p>Büyük Rus yazar Tolstoy’un Hristiyan ahlakını ve evrensel insani değerleri masalsı bir dille anlattığı <strong>İnsan Ne İle Yaşar?</strong>, insan varoluşunun anlamına dair en sade ve derin metinlerden biridir.</p>
<h3>Giriş: Soğukta Donan Yabancı</h3>
<p>Yoksul ayakkabıcı Semyon ve karısı Matriyona zar zor geçinmektedirler. Semyon, koyun postu almak için kasabaya gider ancak parası yetmez. Dönüşte bir kilise duvarının dibinde çıplak ve titreyen bir genç görür. Önce korkup uzaklaşsa da vicdanı elvermez, ceketini gence giydirir ve onu evine getirir. Karısı Matriyona önce kızar ama gencin çaresizliğini görünce yumuşar ve son ekmeğini onunla paylaşır. Bu sırada gencin yüzüne ilk kez ilahi bir tebessüm yayılır.</p>
<h3>Gelişme: Meleğin Üç Gerçeği Öğrenmesi</h3>
<p>Adının Mihail olduğunu söyleyen genç, Semyon'un yanında kunduracılık öğrenir ve kasabanın en usta ayakkabıcısı olur. Bir gün zengin ve kibirli bir beyefendi gelir; pahalı bir deriyi uzatarak bir yıl dayanacak sağlam çizmeler yapmalarını emreder. Ancak Mihail çizme yerine terlik (ölü giysisi) diker. Semyon dehşete düşerken, az sonra beyefendinin arabada kalp krizi geçirip öldüğü haberi gelir. Mihail ikinci kez gülümser.</p>
<h3>Sonuç: İnsan Ne İle Yaşar?</h3>
<p>Yıllar sonra bir kadın, evlat edindiği iki yetim kız çocuğuyla gelir ve onlara ayakkabı yaptırmak ister. Bu kızlar, yıllar önce Mihail'in canını almaya kıyamadığı kadının ikizleridir; başka bir kadın onlara annelik etmiştir. Mihail üçüncü kez güler ve sırtında melek kanatları belirmeye başlar. Semyon ve ailesine gerçeği açıklar: Tanrı onu üç sorunun cevabını bulması için göndermiştir: 1. İnsanda ne vardır? (Sevgi). 2. İnsana ne verilmemiştir? (Kendi geleceğini ve neye ihtiyacı olduğunu bilme bilgisi). 3. İnsan ne ile yaşar? <strong>İnsanlar kendilerine gösterdikleri özenden değil, başkalarına duydukları sevgiden ötürü yaşarlar.</strong></p>
""",
        "characters": [
            ("Mihail", "Yeryüzüne sürgün edilen, insanların içindeki ilahi sevgiyi keşfeden melek."),
            ("Semyon", "Yoksul ama merhametli ayakkabıcı."),
            ("Matriyona", "Önce öfkelenen ama kalbindeki şefkatle yabancıya kucak açan anne figürü.")
        ],
        "themes": "Merhamet, kader, insan sevgisi, kibir ve ölüm karşısında çaresizlik.",
        "quotes": [
            "Anladım ki insan, kendi hayatı için kaygılanarak değil, içinde taşıdığı sevgiyle yaşar.",
            "Her insanın içinde Tanrı'dan bir parça vardır.",
            "Yarın için bir çift çizme sipariş eden adam, akşama tabutuna gireceğini bilmez."
        ]
    },
    {
        "title": "Serenad – Zülfü Livaneli | Kitap Özeti, Struma Faciası ve Nadia",
        "slug": "serenad-kitap-ozeti",
        "excerpt": "Zülfü Livaneli'nin çok okunan tarihi aşk romanı Serenad kitap özeti. Maya Duran, Prof. Maximilian Wagner, Struma faciası ve Şile sahilinde hüzünlü keman sesi.",
        "cover": "https://covers.openlibrary.org/b/id/10461167-L.jpg",
        "tags": ["Serenad", "Zülfü Livaneli", "Kitap Özeti", "Struma Faciası", "Maximilian Wagner", "Maya Duran", "Tarihi Roman"],
        "author": "Zülfü Livaneli",
        "original_title": "Serenad",
        "year": "2011",
        "pages": "484 Sayfa",
        "quick_summary": "İstanbul Üniversitesi'nde halkla ilişkiler görevlisi olan Maya Duran, 1930'lu yıllarda Nazi Almanyası'ndan kaçıp Türkiye'ye sığınan profesörlerden biri olan 87 yaşındaki Alman asıllı Amerikalı Prof. Maximilian Wagner'i ağırlamakla görevlendirilir. Profesörün dondurucu kış soğuğunda Şile sahiline gidip denize çelenk bırakması ve kemanıyla 'Serenad Für Nadia' adlı besteyi çalmasıyla başlayan süreç, 1942'de 768 Yahudi mülteciyle birlikte batırılan Struma gemisinin ve yarım kalmış efsanevi bir aşkın trajik sırlarını açığa çıkarır.",
        "full_plot": """
<p>Zülfü Livaneli’nin belgesel tadındaki romanı <strong>Serenad</strong>, 2. Dünya Savaşı’nın karanlık sayfalarından Struma faciasını unutulmaz bir aşk hikayesiyle harmanlar.</p>
<h3>Giriş: Şile Sahilindeki Yaşlı Profesör</h3>
<p>36 yaşındaki bekar anne Maya Duran, İstanbul Üniversitesi Rektörlüğü'nde çalışmaktadır. Üniversitenin davetlisi olarak gelen 87 yaşındaki Prof. Maximilian Wagner’i karşılar. Profesör, 1930'larda Atatürk'ün reformlarıyla Türkiye'ye davet edilen Yahudi ve muhalif bilim insanlarından biridir. Maya, profesörün gizemli tavırlarından etkilenir. Profesör dondurucu bir fırtınada Şile kıyısına gitmek ister; buz gibi denize karşı kemanıyla hüzünlü bir melodi çalar ve suya düşüp zatürre olur.</p>
<h3>Gelişme: Nadia ve Struma Gemisi</h3>
<p>Maya, profesörün geçmişini araştırdıkça hem devlet istihbaratının takibine uğrar hem de tarihin karanlık sayfalarıyla yüzleşir. Maximilian, 1930'larda Berlin'de Yahudi bir kadın olan Nadia ile evlenmiştir. Nazilerin iktidara gelmesiyle Maximilian Türkiye'ye kaçabilmiş ancak hamile olan Nadia Almanya'da kalmıştır. Nadia, 1942 yılında Romanya'dan kalkan ve Filistin'e gitmeye çalışan döküntü bir kömür gemisi olan <em>Struma</em>'ya binmeyi başarır. Gemi motoru bozulunca 769 yolcusuyla Sarayburnu açıklarında 70 gün boyunca tecrit altında bekletilir. Ne Türkiye yolcuları karaya kabul eder ne de İngiltere vize verir. Sonunda Karadeniz'e çekilen gemi, bir Sovyet denizaltısı tarafından torpillenerek batırılır; Nadia ve doğmamış bebeği sulara gömülür.</p>
<h3>Sonuç: Veda ve Serenadın Yankısı</h3>
<p>Maya, profesörün hikayesini dinledikçe kendi ailesinin de gizli kalmış acılarıyla (Ermeni ninesi, Kırım Türkü kökenleri) yüzleşir. Profesör ABD'ye geri döner ancak hastalığı ilerlemiştir. Maya onun yanına gider. Profesör son nefesini verirken küllerinin Şile açıklarında Nadia'nın yattığı sulara serpilmesini vasiyet eder. Maya bu vasiyeti yerine getirir; aşk ve adalet denizin dalgalarında ebediyen birleşir.</p>
""",
        "characters": [
            ("Maya Duran", "Modern, kendi köklerini ve kimliğini keşfeden bağımsız Türk kadını."),
            ("Prof. Maximilian Wagner", "Aşkına 60 yıl boyunca sadık kalan, suçluluk ve kederle yaşayan Alman bilim insanı."),
            ("Nadia", "Struma gemisinde bebeğiyle birlikte sulara gömülen masum Yahudi kadın."),
            ("Süleyman", "Maya'nın eski kocası ve bürokrasinin duyarsız yüzü.")
        ],
        "themes": "Savaşın masum insanlar üzerindeki yıkımı, siyasi ikiyüzlülük, Struma faciası ve ölümsüz aşk.",
        "quotes": [
            "İnsanlar neden birbirlerini öldürürler? Çünkü onları birbirine bağlayan şeylerin, ayıran şeylerden çok daha fazla olduğunu unuturlar.",
            "Müzik, kelimelerin bittiği yerde başlar.",
            "Tarih dediğin şey, acı çeken masumların kanıyla yazılır."
        ]
    },
    {
        "title": "Çizgili Pijamalı Çocuk – John Boyne | Kitap Özeti ve Holokost Analizi",
        "slug": "cizgili-pijamali-cocuk-kitap-ozeti",
        "excerpt": "John Boyne'un dünyayı sarsan romanı Çizgili Pijamalı Çocuk kitap özeti. Bruno ve Shmuel'in dikenli teller arkasındaki dostluğu, Auschwitz ve trajik son.",
        "cover": "https://covers.openlibrary.org/b/id/12720687-L.jpg",
        "tags": ["Çizgili Pijamalı Çocuk", "John Boyne", "Kitap Özeti", "Holokost", "Auschwitz", "Bruno", "Shmuel", "İkinci Dünya Savaşı"],
        "author": "John Boyne",
        "original_title": "The Boy in the Striped Pyjamas",
        "year": "2006",
        "pages": "208 Sayfa",
        "quick_summary": "Nazi Almanyası'nda bir toplama kampı komutanının 9 yaşındaki oğlu Bruno, babasının terfisi nedeniyle 'Out-With' (Auschwitz) kampının yanındaki eve taşınır. Çitlerin ardında çizgili pijama giyen insanları çiftçi sanan Bruno, keşfe çıktığında dikenli tellerin arkasında kendisiyle aynı gün doğmuş Yahudi çocuk Shmuel ile tanışır. İki çocuğun masum dostluğu, Bruno'nun tel örgünün altına kazdığı delikten içeri sızmasıyla trajik bir ölüm yürüyüşüne dönüşür.",
        "full_plot": """
<p><strong>Çizgili Pijamalı Çocuk</strong>, insanlık tarihinin en büyük vahşeti olan Yahudi Soykırımı'nı (Holokost) dokuz yaşındaki masum bir çocuğun gözünden anlatan yürek burkan bir eserdir.</p>
<h3>Giriş: Berlin'den Dış-Yer'e Taşınma</h3>
<p>Bruno, Berlin’de büyük bir konakta mutlu bir hayat sürmektedir. Ancak babası ("Komutan") Hitler ("Führer") tarafından önemli bir göreve atanır ve ailece 'Dış-Yer' (Auschwitz) dedikleri ıssız bir yere taşınırlar. Bruno burada arkadaşsız ve yapayalnızdır. Yatak odasının penceresinden baktığında uzakta tel örgüler ve o tellerin arkasında hep aynı çizgili pijamaları giyen mutsuz insanlar görür.</p>
<h3>Gelişme: Tel Örgünün İki Tarafı</h3>
<p>Gezgin bir kaşif olmak isteyen Bruno, tellerin boyunca yürür ve sonunda tel örgünün dibinde oturan solgun yüzlü, tıraşlı kafalı Shmuel ile karşılaşır. Shmuel Polonyalı bir Yahudi'dir ve Bruno ile aynı gün doğmuştur. Bruno her gün gizlice tel örgülerin yanına gelerek Shmuel’e yemek taşır. İki çocuk saatlerce sohbet eder; Bruno kampı bir oyun alanı, telleri ise anlamsız bir engel sanmaktadır.</p>
<h3>Sonuç: Çizgili Pijama ve Gaz Odası</h3>
<p>Bruno'nun annesi buranın bir ölüm kampı olduğunu öğrenince çocukları Berlin'e geri götürmeye karar verir. Ayrılmadan önceki son gün Bruno, Shmuel'in kaybolan babasını bulmasına yardım etmek ister. Shmuel ona telin altından çizgili bir pijama verir. Bruno kendi kıyafetlerini çıkarıp pijamaları giyer ve telin altından kampa sızar. O anda gardiyanlar mahkumları toplar ve yağmurdan korunma bahanesiyle onları hava geçirmez bir odaya ("duşlara") kilitlerler. Karanlıkta iki çocuk el ele tutuşur. Bruno babasının komuta ettiği gaz odasında kurbanlarla birlikte can verir. Ailesi günlerce Bruno'yu arar; kıyafetleri tel örgünün dibinde bulunur ama artık çok geçtir.</p>
""",
        "characters": [
            ("Bruno", "9 yaşında, savaştan ve önyargılardan bihaber, masumiyetin simgesi olan Alman çocuk."),
            ("Shmuel", "Toplama kampında acı çeken, açlık ve korku içinde yaşayan Yahudi çocuk."),
            ("Ralf (Baba)", "Ailesini seven ama devletine körü körüne itaat eden acımasız Auschwitz komutanı."),
            ("Gretel", "Bruno'nun 12 yaşındaki ablası; propaganda afişleriyle beyni yıkanan Nazi gençliği simgesi.")
        ],
        "themes": "Savaşın anlamsızlığı, çocuk masumiyeti, önyargıların yıkıcılığı ve faşizmin bumerang gibi yaratıcısını vurması.",
        "quotes": [
            "Çitler insanları ayırmak için yapılır; ama çocukların kalpleri tellerden daha geniştir.",
            "Bütün bu insanların suçu neydi? Tek suçları çizgili pijama giymeleri miydi?",
            "Elini sımsıkı tuttu ve bir daha asla bırakmadı."
        ]
    }
]

# Insert all posts into DB
for b in BOOKS_DATA:
    # Check if already exists
    existing = c.execute("SELECT id FROM posts WHERE slug = ?", (b["slug"],)).fetchone()
    
    # Format rich HTML content
    char_html = "".join([f"<li><strong>{name}:</strong> {desc}</li>" for name, desc in b["characters"]])
    quotes_html = "".join([f"<blockquote class='p-3 my-2 border-l-4 border-indigo-500 bg-slate-50 dark:bg-slate-800 italic text-sm text-slate-700 dark:text-slate-300'>“{q}”</blockquote>" for q in b["quotes"]])
    
    html = f"""
<div class="space-y-6 text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
  <figure class="my-6 text-center">
    <img src="{b['cover']}" alt="{b['title']}" class="w-full max-h-[480px] object-contain rounded-2xl shadow-xl mx-auto bg-slate-900/5 p-2" />
    <figcaption class="text-xs text-slate-500 mt-2 font-medium">{b['title']} — Orijinal Kapak Görseli</figcaption>
  </figure>

  <!-- Quick Info Box -->
  <div class="p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50/30 dark:from-slate-800/80 dark:to-indigo-950/30 border border-slate-200 dark:border-slate-700 space-y-3">
    <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
      <span>📖 Kitap Künyesi</span>
    </h3>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
      <div><span class="text-slate-500 block">Yazar:</span><strong class="text-slate-900 dark:text-white">{b['author']}</strong></div>
      <div><span class="text-slate-500 block">Orijinal Adı:</span><strong class="text-slate-900 dark:text-white">{b['original_title']}</strong></div>
      <div><span class="text-slate-500 block">İlk Baskı:</span><strong class="text-slate-900 dark:text-white">{b['year']}</strong></div>
      <div><span class="text-slate-500 block">Sayfa Sayısı:</span><strong class="text-slate-900 dark:text-white">{b['pages']}</strong></div>
    </div>
  </div>

  <!-- 1 Minute Summary -->
  <div class="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
    <h3 class="text-sm font-bold text-amber-700 dark:text-amber-400">⚡ 1 Dakikada Hızlı Özet (TL;DR)</h3>
    <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
      {b['quick_summary']}
    </p>
  </div>

  <h2 class="text-2xl font-black text-slate-900 dark:text-white pt-4 border-b border-slate-200 dark:border-slate-800 pb-2">
    Detaylı Olay Örgüsü ve Konusu
  </h2>
  {b['full_plot']}

  <h2 class="text-2xl font-black text-slate-900 dark:text-white pt-6 border-b border-slate-200 dark:border-slate-800 pb-2">
    Karakter Tahlilleri ve Rolleri
  </h2>
  <ul class="list-disc list-inside space-y-2 pl-2 text-sm sm:text-base">
    {char_html}
  </ul>

  <h2 class="text-2xl font-black text-slate-900 dark:text-white pt-6 border-b border-slate-200 dark:border-slate-800 pb-2">
    Ana Fikir ve Temalar
  </h2>
  <p class="text-sm sm:text-base">
    {b['themes']}
  </p>

  <h2 class="text-2xl font-black text-slate-900 dark:text-white pt-6 border-b border-slate-200 dark:border-slate-800 pb-2">
    Kitaptan Çarpıcı Alıntılar
  </h2>
  <div class="space-y-2">
    {quotes_html}
  </div>
</div>
"""
    
    tags_json = json.dumps(b["tags"], ensure_ascii=False)
    
    if existing:
        c.execute("""
            UPDATE posts 
            SET title = ?, excerpt = ?, content = ?, featured_image = ?, category = 'Kitap Özetleri', category_slug = 'kitap-ozet', tags = ?, updated_at = ?
            WHERE slug = ?
        """, (b["title"], b["excerpt"], html, b["cover"], tags_json, now_str, b["slug"]))
        print(f"Updated existing: {b['slug']}")
    else:
        c.execute("""
            INSERT INTO posts (title, slug, excerpt, content, featured_image, category, category_slug, tags, author, views, is_published, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, 'Kitap Özetleri', 'kitap-ozet', ?, 'Matemetrik Edebiyat', 150, 1, ?, ?)
        """, (b["title"], b["slug"], b["excerpt"], html, b["cover"], tags_json, now_str, now_str))
        print(f"Inserted new: {b['slug']}")

conn.commit()
conn.close()
print("All book summaries processed successfully!")
