#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate remaining comprehensive, human-crafted, SEO-rich book summaries for Google Trends rising queries.
Includes Charlie'nin Çikolata Fabrikası, Matilda, Semerkant, Sadako, Hachiko, Sefiller, Yaban, Son Ayı, Sol Ayağım, Martı, and the Ultimate Book Summary Guide.
"""

import sqlite3
import datetime
import json

now_str = datetime.datetime.now().isoformat()

conn = sqlite3.connect('data/matemetrik.db')
c = conn.cursor()

MORE_BOOKS_DATA = [
    {
        "title": "Charlie'nin Çikolata Fabrikası – Roald Dahl | Kitap Özeti, Karakterleri ve Konusu",
        "slug": "charlienin-cikolata-fabrikasi-kitap-ozeti",
        "excerpt": "Roald Dahl'ın unutulmaz eseri Charlie'nin Çikolata Fabrikası kitap özeti. Charlie Bucket, Willy Wonka, Altın Bilet, Oompa Loompa'lar ve fabrikada yaşanan ders niteliğindeki macera.",
        "cover": "https://covers.openlibrary.org/b/id/12459564-L.jpg",
        "tags": ["Charlie'nin Çikolata Fabrikası", "Roald Dahl", "Kitap Özeti", "Willy Wonka", "Altın Bilet", "Çocuk Edebiyatı", "Roman Özeti"],
        "author": "Roald Dahl",
        "original_title": "Charlie and the Chocolate Factory",
        "year": "1964",
        "pages": "208 Sayfa",
        "quick_summary": "Aşırı yoksul bir ailede yaşayan Charlie Bucket, yılda yalnızca doğum gününde bir adet çikolata alabilmektedir. Dünyanın en esrarengiz çikolata üreticisi Bay Willy Wonka, ürettiği milyonlarca çikolatanın içine gizlediği 5 Altın Bilet ile kapılarını yıllardır kimseye açmadığı fabrikasını 5 şanslı çocuğa gezdireceğini duyurur. Açgözlü, şımarık ve televizyon bağımlısı diğer dört çocuğun elenmesinin ardından dürüst ve alçakgönüllü Charlie, hem Wonka'nın sınavını geçer hem de fabrikanın gelecekteki tek sahibi olur.",
        "full_plot": """
<p>20. yüzyıl çocuk ve gençlik edebiyatının en neşeli fakat bir o kadar da ahlaki dersler barındıran başyapıtı olan <strong>Charlie'nin Çikolata Fabrikası</strong>, tüketim çılgınlığı ve kötü çocuk yetiştirme tarzlarına karşı yazılmış harika bir taşlamadır.</p>
<h3>Giriş: Yoksul Kulübe ve 5 Altın Bilet Heyecanı</h3>
<p>Charlie Bucket; annesi, babası ve yatalak dört büyükanne ve büyükbabasıyla birlikte derme çatma ahşap bir kulübede büyük bir yoksulluk içinde yaşamaktadır. Evin penceresinden, gizemli şekerlemeci Bay Willy Wonka’nın devasa çikolata fabrikasının bacaları görünmektedir. Yıllar önce casus rakipler yüzünden kapılarını kapatan Wonka, bir gün gazetelere inanılmaz bir ilan verir: Normal çikolataların ambalajları arasına 5 adet <em>Altın Bilet</em> gizlemiştir. Bu bileti bulan beş çocuk, bir refakatçiyle fabrikayı gezecek ve ömür boyu yetecek şekerleme kazanacaktır.</p>
<h3>Gelişme: Dört Kusurlu Çocuk ve Fabrika Turu</h3>
<p>İlk dört bilet modern çağın aşırılıklarını temsil eden çocuklara çıkar: Açgözlü ve obur Augustus Gloop; her istediği babası tarafından satın alınan şımarık Veruca Salt; sürekli sakız çiğneyen saygısız Violet Beauregarde; ve gözünü televizyon ekranından ayırmayan tembel Mike Teavee. Son bileti ise yerde bulduğu bozuk parayla bakkaldan çikolata alan şanslı Charlie bulur. Charlie, bilge büyükbabası Joe ile fabrikaya girer. Fabrika, çikolatadan nehirleri, şekerden çimenleri ve Oompa Loompa adlı neşeli cüce çalışanlarıyla bir rüya alemi gibidir. Ancak kurallara uymayan her çocuk tek tek başına gelen komik ve ibretlik felaketlerle elenir: Augustus çikolata nehrine düşüp boruya sıkışır, Violet deneysel sakızı çiğneyip dev bir yaban mersinine dönüşür, Veruca ceviz ayıklayan sincaplar tarafından çöp bacasına atılır, Mike ise televizyon dalgalarıyla küçültülür.</p>
<h3>Sonuç: Wonka'nın Gerçek Amacı ve Büyük Miras</h3>
<p>Geriye yalnızca kurallara saygılı, alçakgönüllü ve sevgi dolu Charlie kalır. Willy Wonka, Charlie'yi ve Joe Büyükbaba'yı uçan cam asansöre bindirir ve asıl niyetini açıklar: Wonka yaşlanmıştır ve fabrikasını açgözlü yetişkinlere değil, saf kalpli ve dürüst bir çocuğa miras bırakmak için bu yarışmayı düzenlemiştir. Charlie ve tüm Bucket ailesi sonsuza kadar fabrikada yaşamak ve çikolata üretmek üzere davet edilir; sefalet sona erer.</p>
""",
        "characters": [
            ("Charlie Bucket", "Romanın erdemli kahramanı. Yoksulluğa rağmen şükretmeyi bilen, ailesine derinden bağlı ve dürüst küçük çocuk."),
            ("Willy Wonka", "Dahi, eksantrik, muzip ve çocukların ahlaki zayıflıklarına tahammülü olmayan esrarengiz fabrika sahibi."),
            ("Joe Büyükbaba", "Charlie'nin hayal gücünü besleyen, yıllardır yataktan çıkamazken bilet haberiyle ayağa kalkan neşeli ihtiyar."),
            ("Augustus Gloop", "Doymak bilmez açgözlülüğün ve oburluğun simgesi olan Alman çocuk."),
            ("Veruca Salt", "Sınırsız zenginliğin şımarttığı, 'hemen istiyorum' sendromunun edebiyattaki en net temsilcisi."),
            ("Violet & Mike", "Kibir, saygısızlık ve teknoloji bağımlılığının kurbanı olan çocuklar.")
        ],
        "themes": "Açgözlülüğün cezalandırılması, alçakgönüllülük ve dürüstlüğün ödülü, aile sevgisinin maddi zenginlikten üstünlüğü.",
        "quotes": [
            "Gözlerini dört aç, çünkü en büyük sırlar her zaman en beklenmedik yerlerde saklıdır.",
            "Biraz saçmalık, en bilge insanların bile zaman zaman hoşuna gider.",
            "Para dünyada çok bulunur Charlie; ama o biletlerden sadece beş tane var."
        ]
    },
    {
        "title": "Matilda – Roald Dahl | Kitap Özeti, Karakter Tahlilleri ve Teması",
        "slug": "matilda-kitap-ozeti",
        "excerpt": "Roald Dahl'ın dünya klasiği Matilda kitap özeti. Dahi küçük kız Matilda, kitapların büyülü dünyası, zalim Bayan Trunchbull, sevecen Bayan Honey ve telekinezi gücü.",
        "cover": "https://covers.openlibrary.org/b/id/12889769-L.jpg",
        "tags": ["Matilda", "Roald Dahl", "Kitap Özeti", "Matilda Wormwood", "Bayan Honey", "Bayan Trunchbull", "Çocuk Edebiyatı"],
        "author": "Roald Dahl",
        "original_title": "Matilda",
        "year": "1988",
        "pages": "240 Sayfa",
        "quick_summary": "Matilda Wormwood, henüz beş yaşındayken okumayı söken, kütüphanedeki tüm klasikleri bitiren ve inanılmaz bir matematik zekasına sahip olan dahi bir kız çocuğudur. Ancak ailesi televizyon bağımlısı, cahil ve sahtekar insanlardır; Matilda'yı sürekli aşağılarlar. Okula başladığında melek kalpli öğretmeni Bayan Honey onun dehasını fark eder; fakat okul müdiresi Bayan Trunchbull çocuklardan nefret eden acımasız bir zorbadır. Matilda, zihninin gücüyle telekinezi (nesneleri uzaktan hareket ettirme) yeteneğini keşfeder ve zekasını hem arkadaşlarını korumak hem de zalimleri alt etmek için kullanır.",
        "full_plot": """
<p><strong>Matilda</strong>, okuma tutkusunun, zihinsel gücün ve adaletin cehalet ile zorbalığa karşı kazandığı muhteşem zaferi anlatan çağdaş bir masaldır.</p>
<h3>Giriş: Wormwood Ailesi ve Matilda'nın Dehası</h3>
<p>Matilda Wormwood, dolandırıcı bir ikinci el araba satıcısı olan babası Bay Wormwood ve vaktini bingo oynayarak geçiren yüzeysel annesinin yanında büyür. Ailesi onun üstün zekasını fark etmez, hatta kitap okuduğu için onu azarlar. Matilda dört yaşında kendi kendine okumayı öğrenir, yerel halk kütüphanesine giderek Hemingway, Dickens ve Jane Austen gibi dev yazarların eserlerini bitirir. Anne ve babasının haksız cezalarına karşı küçük ve zekice şakalarla (babasının saçına boya karıştırmak, şapkasına yapıştırıcı sürmek) direnir.</p>
<h3>Gelişme: Krunchem Hall ve Bayan Trunchbull'un Terörü</h3>
<p>Matilda nihayet Crunchem Hall İlkokulu'na gönderilir. Sınıf öğretmeni Bayan Jennifer Honey, Matilda'nın üniversite düzeyindeki zekasını görünce hayran kalır. Ancak okulun baş müdiresi, eski gülle atma şampiyonu dev cüsseli Bayan Trunchbull tam bir kabustur. Çocukları kulaklarından tutup fırlatır, çivili dar dolaplara ('Boğucu') kilitler. Matilda okulda Lavender gibi cesur dostlar edinir. Bu sırada Bayan Honey'nin acı gerçeğini öğrenir: Honey, Trunchbull'un yeğenidir ve Trunchbull, Honey'nin babasının mirasına ve evine zorla el koymuştur; genç öğretmeni yoksulluğa mahkum etmiştir.</p>
<h3>Sonuç: Telekinezi Gücü ve Mutlu Son</h3>
<p>Haksızlık karşısında duyduğu yoğun öfke, Matilda'da olağanüstü bir gücü tetikler: Gözleriyle tebeşiri hareket ettirebilmektedir. Trunchbull sınıftayken Matilda telekineziyle tahtaya tebeşirle yazı yazdırır; sanki Honey'nin merhum babası Magnus mezardan sesleniyormuş gibi Trunchbull'a evi terk etmesini ve miras hakkını Honey'e vermesini emreder. Dehşete düşen Trunchbull kasabayı terk eder ve bir daha dönmez. Matilda'nın dolandırıcı ailesi ise polisten kaçmak için İspanya'ya taşınma kararı alır. Matilda ailesiyle gitmeyi reddeder; ailesi de zaten onu umursamadığı için velayetini severek Bayan Honey'e bırakır. Matilda, kendisini gerçekten seven ve anlayan öğretmeniyle huzurlu bir hayata kavuşur.</p>
""",
        "characters": [
            ("Matilda Wormwood", "Kitapların rehberliğinde kendi gücünü ve ahlaki pusulasını inşa eden dahi küçük kız."),
            ("Bayan Jennifer Honey", "Şefkatin, inceliğin ve idealist öğretmenliğin simgesi. Matilda'nın ruh ikizi."),
            ("Bayan Trunchbull", "Okul müdiresi. Yetişkin otoritesinin ve kurumsal zorbalığın karikatürize edilmiş korkunç figürü."),
            ("Bay ve Bayan Wormwood", "Maddi çıkarları ve ekran bağımlılığını kültürel gelişimin üstünde tutan yozlaşmış ebeveynler.")
        ],
        "themes": "Kitap okumanın zihni özgürleştirmesi, cehaletle mücadele, çocuk hakları ve zorbalığa karşı dayanışma.",
        "quotes": [
            "Kitaplar onu bambaşka dünyalara götürdü ve heyecan verici hayatlar yaşayan şaşırtıcı insanlarla tanıştırdı.",
            "Eğer hayatında iyi bir şeyler yapmak istiyorsan, asla yarım yamalak yapma. Sonuna kadar git!",
            "Tüm dünyada okumaktan daha büyük bir macera yoktur."
        ]
    },
    {
        "title": "Semerkant – Amin Maalouf | Kitap Özeti, Ömer Hayyam ve Rubaiyat Tarihi",
        "slug": "semerkant-kitap-ozeti",
        "excerpt": "Amin Maalouf'un başyapıtı Semerkant kitap özeti. Ömer Hayyam'ın kayıp Rubaiyat elyazması, Hasan Sabbah ve Alamut Kalesi, Nizamülmülk ve Titanik'e uzanan sürükleyici Doğu-Batı serüveni.",
        "cover": "https://covers.openlibrary.org/b/id/14369347-L.jpg",
        "tags": ["Semerkant", "Amin Maalouf", "Kitap Özeti", "Ömer Hayyam", "Hasan Sabbah", "Rubaiyat", "Tarihi Roman"],
        "author": "Amin Maalouf",
        "original_title": "Samarcande",
        "year": "1988",
        "pages": "318 Sayfa",
        "quick_summary": "Roman iki büyük zaman dilimine bölünmüştür: İlk yarıda 11. yüzyıl Semerkant ve İsfahan'ında bilgin ve şair Ömer Hayyam, Selçuklu veziri Nizamülmülk ve Haşhaşilerin lideri Hasan Sabbah arasındaki kader ortaklığı ve Hayyam'ın efsanevi Rubaiyat yazmasının doğuşu anlatılır. İkinci yarıda ise 20. yüzyılın başında Amerikalı araştırmacı Benjamin O. Lesage'ın bu kayıp elyazmasının peşinden İran Meşrutiyet Devrimi'ne karışması ve yazmanın batmaz denilen Titanik gemisiyle okyanusun dibine gömülüşü konu edilir.",
        "full_plot": """
<p>Lübnan asıllı Fransız yazar Amin Maalouf’un en çok okunan tarihi romanı <strong>Semerkant</strong>, Doğu'nun şiiri, bilimi ve siyasi entrikalarıyla Batı'nın modern arayışını büyüleyici bir kurguyla birleştirir.</p>
<h3>1. Kısım: Üç Okul Arkadaşı Efsanesi ve Alamut'un Gölgesi</h3>
<p>Yıl 1072. Genç gökbilimci ve şair Ömer Hayyam Semerkant'a gelir. Şehrin kadısı Ebu Tahir, Hayyam’ın keskin aklına ve serbest düşüncelerine hayran kalır; dedikodulardan korunması için ona boş bir defter hediye ederek rubailerini bu deftere yazmasını öğütler. Bu defter, tarihin en meşhur yazması olacaktır. Hayyam, kadın şair Cihan ile tutkulu bir aşk yaşar. Selçuklu Sarayı'nda kudretli vezir Nizamülmülk, Hayyam'ı başkente çağırır ve ona devlet görevi teklif eder; ancak Hayyam saray entrikalarından uzak kalıp gözlemevinde takvim düzenlemeyi seçer. Hayyam, arkadaşı Hasan Sabbah’ı vezire tanıtır. Ancak ihtiraslı Hasan Sabbah, Nizamülmülk'ü devirmeye kalkıp başarısız olunca kaçar ve Alamut Kalesi'nde intihar fedaileriyle Haşhaşiler tarikatını kurar. Nizamülmülk Sabbah'ın fedaileri tarafından hançerlenir; Hayyam ise yazmasını koruyarak Semerkant'a çekilir.</p>
<h3>2. Kısım: Titanik ve Kayıp Yazmanın Laneti</h3>
<p>Aradan sekiz yüz yıl geçer. 1890'larda Amerikalı Benjamin O. Lesage, ailesindeki bir mektuptan yola çıkarak Hayyam’ın kayıp yazmasının peşine düşer. İzler onu 1900'lerin başında şahlık diktasına karşı özgürlük savaşı veren İran'a (Tebriz ve Tahran) götürür. Benjamin burada hem İran Meşrutiyet Devrimi'nin heyecanını yaşar hem de şahın yeğeni Şirin ile büyük bir aşk yaşar. Yazma nihayet bulunur. Benjamin ve Şirin, yazmayı Amerika'ya götürüp sergilemek üzere Nisan 1912'de Southampton limanından dünyanın en lüks transatlantiğine binerler: <strong>Titanic</strong>. Gemi bir buzdağına çarpıp sulara gömülürken, Ömer Hayyam'ın bin yıllık sırları barındıran eşsiz yazması da atlas okyanusunun karanlık sularına gömülür; geriye yalnızca insanın faniliği ve aşka dair dizeler kalır.</p>
""",
        "characters": [
            ("Ömer Hayyam", "Şarap, aşk ve kainatın sırları üzerine düşünen; iktidar hırsından arınmış dahi filozof ve şair."),
            ("Hasan Sabbah", "Zekasını mutlak itaate ve kanlı bir inanç tarikatına adayan 'Dağın Şeyhi'."),
            ("Nizamülmülk", "Büyük Selçuklu İmparatorluğu'nun düzenini ve medreselerini kuran, reel politiğin mimarı başvezir."),
            ("Benjamin O. Lesage", "Kayıp bir doğu masalının izinde kendi kimliğini ve aşkını bulan 20. yüzyıl modern seyyahı."),
            ("Cihan & Şirin", "Farklı çağlarda Hayyam'ın dizelerine ve yazmasına ilham veren güçlü Doğu kadınları.")
        ],
        "themes": "Zamanın akışı, kader, din ile akıl arasındaki çatışma, iktidar hırsının trajedisi ve Doğu ile Batı'nın ortak kültürel mirası.",
        "quotes": [
            "Gözünü yıldızlara diken adam ayağının altındaki çukurları göremez.",
            "Dünya üç beş bilgisizin elinde; onlarca her bilgiye sahip olmak kendileri gibi düşünmektir.",
            "Zamanın iki yüzü vardır: İki boyutu. Birincisi uzay gibi kederle uzanır; ikincisi ise anın sonsuzluğudur."
        ]
    },
    {
        "title": "Sadako ve Bin Beyaz Turna Kuşu – Eleanor Coerr | Kitap Özeti ve Konusu",
        "slug": "sadako-kitap-ozeti",
        "excerpt": "Eleanor Coerr'in gerçek bir hikayeden uyarladığı Sadako ve Bin Beyaz Turna Kuşu kitap özeti. Hiroşima'nın atom bombası, origami turnalar ve dünya barışının sembolü Sadako Sasaki.",
        "cover": "https://covers.openlibrary.org/b/id/10870775-L.jpg",
        "tags": ["Sadako", "Eleanor Coerr", "Kitap Özeti", "Hiroşima", "Origami", "Barış Kuşları", "Dünya Edebiyatı"],
        "author": "Eleanor Coerr",
        "original_title": "Sadako and the Thousand Paper Cranes",
        "year": "1977",
        "pages": "80 Sayfa",
        "quick_summary": "1945'te Hiroşima'ya atılan atom bombasından iki yaşındayken sağ kurtulan Sadako Sasaki, 11 yaşına geldiğinde okulun en hızlı ve neşeli koşucusudur. Ancak bombanın yaydığı radyasyon nedeniyle lösemiye (atom bombası hastalığı) yakalanır. En yakın arkadaşı Chizuko, ona eski bir Japon efsanesini hatırlatır: Kağıttan bin adet turna kuşu katlayan kişinin bir dileği kabul olur. Sadako hastane yatağında yaşamak ve dünya barışı için ilaç kutularının ambalajlarından turnalar katlamaya başlar. 644 turna katlamışken hayata gözlerini yumar; kalan turnaları sınıf arkadaşları tamamlar ve Sadako bugün dünya barış parklarında bir anıt olarak yaşamaktadır.",
        "full_plot": """
<p><strong>Sadako ve Bin Beyaz Turna Kuşu</strong>, savaşın masum çocuklar üzerindeki acımasız etkisini ve insanın yaşama tutunma iradesini anlatan gerçek bir tarihsel dramadır.</p>
<h3>Giriş: Hiroşima'nın Yıldönümü ve Koşu Sevgisi</h3>
<p>Sadako Sasaki, Hiroşima'da ailesiyle yaşayan enerji dolu bir kız çocuğudur. 6 Ağustos 1945'te şehre atılan atom bombası patladığında o henüz bir bebektir; fakat aile görünürde zarar görmeden kurtulmuştur. Sadako 11 yaşına geldiğinde okulun bayrak yarışında birinci olur ve en büyük hayali ortaokulda atletizm takımına girmektir. Ancak bir gün yarışma sonrasında şiddetli baş dönmeleri ve yorgunluk nöbetleri başlar.</p>
<h3>Gelişme: Atom Bombası Hastalığı ve Turna Efsanesi</h3>
<p>Sadako hastaneye kaldırılır ve doktorlar acı teşhisi koyar: Lösemi. O dönem Hiroşima'da radyasyon zehirlenmesine 'atom bombası hastalığı' denmektedir. Hastanede tecrit edilen Sadako büyük bir korku yaşar. Ziyaretine gelen en yakın arkadaşı Chizuko, ona altın renkli bir kağıt ve eski bir Japon inancını getirir: Turna kuşları bin yıl yaşar; bu yüzden kağıttan 1000 turna kuşu katlayan hasta bir insanın sağlığına kavuşacağına inanılır. Sadako derhal işe koyulur. İlaç ambalajları, şeker kağıtları ve gazete parçalarından sabırla turnalar katlar. Her turna onun yaşama ve koşma arzusunun birer yakarışıdır.</p>
<h3>Sonuç: 644 Turna ve Ölümsüz Barış Mesajı</h3>
<p>Sadako'nun hastalığı hızla ilerler, elleri titremeye ve gücü tükenmeye başlar. 644. turnayı katladıktan sonra 25 Ekim 1955'te ailesinin kollarında huzurla yaşama veda eder. Sadako'nun cesaretinden ilham alan sınıf arkadaşları ve tüm Japon çocukları, eksik kalan 356 turnayı tamamlar ve Sadako bin turnayla birlikte gömülür. Çocukların başlattığı kampanya ile Hiroşima Barış Parkı'na Sadako'nun elinde altın bir turna kuşu tutan bronz heykeli dikilir. Anıtın kaidesinde şu tarihi cümle kazılıdır: <em>"Bu bizim haykırışımız, bu bizim duamız: Dünyada barış olsun."</em></p>
""",
        "characters": [
            ("Sadako Sasaki", "Yaşam sevinciyle dolu, son nefesine kadar umudunu ve gülümsemesini kaybetmeyen küçük barış elçisi."),
            ("Chizuko", "Sadako'nun en yakın dostu; ona turna efsanesini getirerek umut aşılayan fedakar arkadaş."),
            ("Bayan Sasaki (Anne)", "Evladının acısıyla kahrolan ancak ona güç vermek için geleneksel kimono dikmeye çalışan sevgi dolu anne.")
        ],
        "themes": "Savaşın yıkıcılığı, nükleer silahların dehşeti, çocuk masumiyeti, umut ve barış arzusu.",
        "quotes": [
            "Bu bizim haykırışımız, bu bizim duamız: Dünyada barış olsun!",
            "Kanatlarına barış yazacağım ve sen tüm dünyayı uçarak dolaşacaksın.",
            "Gökyüzü mavi olduğu sürece umut her zaman vardır."
        ]
    },
    {
        "title": "Hachiko: Bir Sadakat Efsanesi – Lluís Prats | Kitap Özeti ve Konusu",
        "slug": "hachiko-kitap-ozeti",
        "excerpt": "Lluís Prats'ın ödüllü romanı Hachiko kitap özeti. Akita cinsi sadık köpek Hachiko, Tokyo Üniversitesi profesörü Ueno ve Shibuya Tren İstasyonu'nda 10 yıl süren efsanevi bekleyiş.",
        "cover": "https://covers.openlibrary.org/b/id/6827209-L.jpg",
        "tags": ["Hachiko", "Lluís Prats", "Kitap Özeti", "Shibuya", "Profesör Ueno", "Sadakat", "Japon Edebiyatı"],
        "author": "Lluís Prats",
        "original_title": "Hachiko: El gos que esperava",
        "year": "2015",
        "pages": "144 Sayfa",
        "quick_summary": "1920'lerin Tokyo'sunda geçen gerçek bir olaydan esinlenen roman, Akita cinsi bir yavru olan Hachiko ile Tokyo Üniversitesi ziraat profesörü Hidesaburo Ueno arasındaki sarsılmaz sevgi bağını anlatır. Hachiko her sabah sahibini Shibuya İstasyonu'na kadar uğurlar ve her akşam saat beşte aynı noktada onun trenden inişini bekler. Bir gün profesör üniversitede beyin kanaması geçirerek aniden vefat eder. Ancak Hachiko, sahibinin öldüğünü bilmeksizin tam 10 yıl boyunca karda, yağmurda aynı istasyon kapısında profesörün dönüşünü beklemeye devam eder.",
        "full_plot": """
<p><strong>Hachiko: Bir Sadakat Efsanesi</strong>, insan ile hayvan arasındaki saf dostluğun zamanı, ölümü ve koşulları aşan ebedi gücünü anlatan dünyanın en dokunaklı eserlerinden biridir.</p>
<h3>Giriş: Tren Vagonundaki Yavru ve Profesör Ueno</h3>
<p>Tokyo Üniversitesi'nde saygın bir akademisyen olan Profesör Eisaburo Ueno, Akita eyaletinden gelen sevimli bir köpek yavrusunu sahiplenir. Japoncada sekiz anlamına gelen ve şans getirdiğine inanılan 'Hachi' adını verir. Kısa sürede profesör ile Hachiko arasında kopmaz bir bağ kurulur. Hachiko büyüdükçe her sabah profesörle birlikte Shibuya İstasyonu'na kadar yürür, efendisi işe giderken onu uğurlar; her akşam saat 17.00 treni geldiğinde ise kapının önünde bekleyip onunla eve döner.</p>
<h3>Gelişme: Trenin Boş İnişi ve On Yıllık Bekleyiş</h3>
<p>21 Mayıs 1925 günü profesör derste aniden fenalaşır ve hayatını kaybeder. O akşam saat beşte tren gelir, yolcular iner ancak profesör yoktur. Hachiko yerinden kıpırdamaz. Profesörün ailesi taşınır ve köpeği başkalarına emanet etmek ister; ancak Hachiko ne yapar eder kaçar ve her gün saat 17.00'de Shibuya İstasyonu'ndaki o köşesine geri döner. İstasyon şefi, gazete satıcıları ve sokak esnafı önce onu kovar; fakat köpeğin azmini gördükçe onu beslemeye, korumaya başlarlar. Kışın dondurucu karında, yazın kavurucu sıcağında Hachiko bir gün bile görevini aksatmaz.</p>
<h3>Sonuç: Shibuya'da Bir Heykel ve Ebedi Buluşma</h3>
<p>Hachiko'nun bu inanılmaz sadakati gazetelere haber olur ve tüm Japonya'da bir ulusal erdem simgesi haline gelir. Yaşlanan, tüyleri dökülen ve romatizmadan yürümekte zorlanan Hachiko, Mart 1935'te karlı bir kış gecesi, Shibuya İstasyonu'nun yakınlarındaki bir sokakta son nefesini verir. Ölüm anında rüyasında profesörünün trenden inip kollarını açtığını görür; iki dost sonunda kavuşmuştur. Bugün Shibuya İstasyonu'nun çıkışında Hachiko'nun bronz heykeli dikilidir ve orası Tokyo'nun en popüler buluşma noktasıdır.</p>
""",
        "characters": [
            ("Hachiko", "Karşılıksız sevginin, sabrın ve tükenmeyen sadakatin canlı simgesi olan Akita cinsi köpek."),
            ("Profesör Eisaburo Ueno", "Doğaya ve hayvanlara sonsuz saygı duyan, nezaket sahibi Japon bilim insanı."),
            ("İstasyon Çalışanları ve Esnaf", "Zamanla Hachiko'nun asaletini anlayarak onu sahiplenen ve koruyan halk.")
        ],
        "themes": "Sadakat, karşılıksız sevgi, ölümün ayıramadığı bağlar ve hayvanların iç dünyasındaki derinlik.",
        "quotes": [
            "Bazı dostluklar kelimelerle değil, sessiz bir bekleyişle ifade edilir.",
            "O sadece bir köpek değildi; o sevmenin ve beklemenin ne demek olduğunu insanlara hatırlatan bir ruhtu.",
            "Zaman geçer, mevsimler değişir; fakat gerçek bir kalbin bekleyişi asla sona ermez."
        ]
    },
    {
        "title": "Sefiller – Victor Hugo | Kitap Özeti, Karakter Tahlilleri ve Konusu",
        "slug": "sefiller-kitap-ozeti",
        "excerpt": "Victor Hugo'nun dünya klasiği Sefiller kitap özeti. Jean Valjean'ın kürek cezasından kurtuluşu, Müfettiş Javert'in amansız takibi, Cosette, Fantine ve 1832 Paris Barikatları.",
        "cover": "https://covers.openlibrary.org/b/id/12721865-L.jpg",
        "tags": ["Sefiller", "Victor Hugo", "Kitap Özeti", "Jean Valjean", "Javert", "Cosette", "Dünya Klasikleri", "Fransız Edebiyatı"],
        "author": "Victor Hugo",
        "original_title": "Les Misérables",
        "year": "1862",
        "pages": "1400 Sayfa",
        "quick_summary": "Aç kalan yeğenleri için bir somun ekmek çaldığı için 19 yıl kürek cezası çeken Jean Valjean, şartlı tahliyeyle salındığında toplum tarafından dışlanır. Piskopos Myriel'in ona gösterdiği inanılmaz merhamet sayesinde ahlaki olarak yeniden doğar; kimliğini gizleyerek zengin bir fabrikatör ve halk dostu bir belediye başkanı olur. Yoksulluk yüzünden kızını geride bırakan Fantine'e yardım eder ve onun yetim kızı Cosette'i zalim Thénardier ailesinden kurtararak evlat edinir. Ancak kanunları katı bir bağnazlıkla uygulayan Müfettiş Javert, Valjean'ın peşini ömrü boyunca bırakmaz. 1832 Paris ayaklanmasında tüm yollar kesişir.",
        "full_plot": """
<p>Dünya edebiyat tarihinin en görkemli destanlarından biri olan <strong>Sefiller</strong>, adaletin mekanik katılığını ilahi merhametle sorgulayan ve toplumun ezilen sınıflarını baş tacı eden anıtsal bir eserdir.</p>
<h3>Giriş: Bir Somun Ekmek ve Gümüş Şamdanlar</h3>
<p>Jean Valjean, fakirlikten ölmek üzere olan ailesi için bir fırın camını kırıp ekmek çaldığı için kürek cezasına çarptırılır; kaçma teşebbüsleriyle bu ceza 19 yıla uzar. Serbest kaldığında taşıdığı sarı pasaport yüzünden hiçbir han ona yatak vermez. Yalnızca iyi kalpli Piskopos Myriel onu evine alır. Valjean gece piskoposun gümüş takımlarını çalarak kaçar ancak jandarma tarafından yakalanır. Piskopos jandarmaya gümüşleri Valjean'a hediye ettiğini söyler, hatta ona gümüş şamdanları da uzatarak bu parayla namuslu bir adam olacağına söz vermesini ister. Bu sarsıcı merhamet Valjean'ın taşlaşmış kalbini paramparça eder; o andan itibaren hayatını iyiliğe adar.</p>
<h3>Gelişme: Madeleine Baba, Cosette ve Javert'in Takibi</h3>
<p>Valjean adını 'Madeleine Baba' olarak değiştirir, kuzeyde siyah cam boncuk fabrikası kurarak tüm kasabayı zengin eder ve belediye başkanı seçilir. Fabrikasından haksızca kovulan ve fuhşa sürüklenen Fantine'in ölüm döşeğindeki son arzusunu yerine getirmek için kızı Cosette'i kurtarmaya söz verir. Ancak eski kürek gardiyanı ve yeni polis müfettişi Javert, Valjean'ın gerçek kimliğini sezer. Valjean, kendi yerine başka bir masumun küreğe gönderilmesini engellemek için mahkemede kimliğini itiraf eder ve kaçar. Cosette'i para gözlü Thénardier'lerin elinden yüklü bir fidye ödeyerek kurtarır ve Paris'te bir manastırda saklanarak büyütür.</p>
<h3>Sonuç: Barikatlar, Lağımlar ve Vicdan Zaferi</h3>
<p>Cosette büyür ve cumhuriyetçi genç devrimci Marius Pontmercy'e aşık olur. 1832 Paris Haziran Ayaklanması patlak verdiğinde Marius barikatlarda savaşır. Jean Valjean, Cosette'in mutluluğu için barikatlara gider. Orada devrimcilerin esir aldığı Müfettiş Javert'i öldürmek yerine gizlice serbest bırakır. Barikat düştüğünde yaralı Marius'u sırtına alarak Paris'in labirent gibi lağımlarından geçirip ölümden kurtarır. Lağım çıkışında Javert onu yakalar; ancak Valjean'ın bu eşsiz büyüklüğü karşısında Javert'in tüm hayatını adadığı 'katı yasa' inancı çöker. Bir suçluya borçlu kalmayı ve göreviyle vicdanı arasındaki çelişkiyi kaldıramayan Javert, kendini Sen Nehri'ne atarak intihar eder. Marius ile Cosette evlenir. Jean Valjean ise piskoposun şamdanlarının ışığında, huzur içinde ruhunu teslim eder.</p>
""",
        "characters": [
            ("Jean Valjean", "Günahkar bir kürek mahkumundan azizlik mertebesine yükselen, fedakarlığın ete kemiğe bürünmüş hali."),
            ("Müfettiş Javert", "Kanunlara körü körüne bağlı, merhametsiz adaletin simgesi; vicdanı ile görevi arasındaki çatışmaya yenilen trajik figür."),
            ("Cosette", "Çocukluğu eziyetle geçen, Valjean'ın sevgisiyle hayata tutunan saflığın simgesi genç kız."),
            ("Fantine", "Toplumun ikiyüzlülüğü ve sefaleti yüzünden kurban edilen talihsiz anne."),
            ("Marius Pontmercy", "İdealist, vatansever ve Cosette'e tutkuyla bağlı genç hukukçu devrimci."),
            ("Gavroche", "Paris sokaklarının neşeli, cesur ve barikatlarda mermi toplarken türkü söyleyerek can veren efsanevi sokak çocuğu.")
        ],
        "themes": "Yoksulluğun suça ittiği masumlar, merhametin cezalandırmadan üstünlüğü, toplumsal adalet ve sevginin kurtarıcılığı.",
        "quotes": [
            "Gözler karanlığa nasıl alışırsa, ruh da cehalete öyle alışır.",
            "Sevmek, Tanrı'nın yüzünü görmektir.",
            "Bir insanın ruhu karanlıktaysa suç oradadır; ama asıl suç, o karanlığı yaratanlardadır."
        ]
    },
    {
        "title": "Yaban – Yakup Kadri Karaosmanoğlu | Kitap Özeti ve Aydın-Köylü Çatışması",
        "slug": "yaban-kitap-ozeti",
        "excerpt": "Yakup Kadri Karaosmanoğlu'nun başyapıtı Yaban kitap özeti. Ahmet Celal, Çanakkale gazisi, Kurtuluş Savaşı günlerinde bir Orta Anadolu köyü ve aydın ile köylü arasındaki derin uçurum.",
        "cover": "https://covers.openlibrary.org/b/id/6954272-L.jpg",
        "tags": ["Yaban", "Yakup Kadri Karaosmanoğlu", "Kitap Özeti", "Ahmet Celal", "Kurtuluş Savaşı", "Milli Edebiyat", "Türk Edebiyatı"],
        "author": "Yakup Kadri Karaosmanoğlu",
        "original_title": "Yaban",
        "year": "1932",
        "pages": "240 Sayfa",
        "quick_summary": "Birinci Dünya Savaşı'nda (Çanakkale'de) sağ kolunu kaybeden İstanbullu yedek subay Ahmet Celal, işgal altındaki başkentten kaçarak emir eri Mehmet Ali'nin Porsuk Çayı kıyısındaki Orta Anadolu köyüne yerleşir. Amacı köylülerle kaynaşmak ve Kurtuluş Savaşı bilincini aşılamaktır. Ancak asırlarca ihmal edilmiş, cahil bırakılmış ve kaderine terk edilmiş köylüler onu bir yabancı, bir düşman gibi görerek 'Yaban' diye dışlarlar. Yunan ordusu köyü işgal edip yakıp yıktığında hem köylünün trajedisi hem de aydının derin özeleştirisi doruk noktasına ulaşır.",
        "full_plot": """
<p>Milli Edebiyat döneminin en cesur ve sarsıcı romanı olan <strong>Yaban</strong>, Türk aydını ile Anadolu köylüsü arasındaki tarihsel yabancılaşmayı acımasız bir dürüstlükle ele alır.</p>
<h3>Giriş: Kolunu Kaybeden Subay ve Porsuk Köyü</h3>
<p>Ahmet Celal, iyi eğitimli, vatansever bir Osmanlı subayıdır. Çanakkale Cephesi'nde sağ kolunu kaybetmiştir. İstanbul İtilaf devletlerince işgal edilince, emir eri Mehmet Ali'nin davetini kabul ederek onun Haymana ovasındaki köyüne yerleşir. Ahmet Celal burada saf, temiz ve kucaklayıcı bir yurt köşesi bulacağını ummaktadır. Oysa karşılaştığı manzara çoraklık, sefalet, yoksulluk ve derin bir taassuptur. Köylüler Ahmet Celal'in pantolonundan, kitap okumasından ve diş fırçalamasından bile şüphelenir; ona hemen 'Yaban' adını takarlar.</p>
<h3>Gelişme: Dışlanmışlık, Emine ve Milli Mücadele Haberleri</h3>
<p>Ahmet Celal köylüleri Mustafa Kemal Paşa'nın başlattığı bağımsızlık mücadelesine ikna etmeye çalışır. Ancak köylüler savaşı 'padişaha karşı bir asilik' sanmakta, köyün zengini Salih Ağa ve yobaz Şeyh Yusuf'un etkisiyle Kuvayı Milliyecilere düşmanlık beslemektedir. Ahmet Celal köyde Emine adlı genç kıza gizliden sevdalanır; ancak köylüler Emine'yi sakat bir yabancıya vermek yerine Mehmet Ali'nin yozlaşmış kardeşi İsmail ile evlendirirler. Ahmet Celal yapayalnız kalır ve günlüğüne bu derin yalnızlığını ve aydın sorumluluğunu yazar.</p>
<h3>Sonuç: Yunan İşgali, Katliam ve Kaçış</h3>
<p>Yunan ordusu Anadolu içlerine doğru ilerler ve sonunda bu zavallı köye de girer. Köylüler düşmanın kendilerine dokunmayacağını zanneder; fakat işgalciler köyü ateşe verir, kadınlara saldırır ve ahaliyi meydanda kurşuna dizer. Ahmet Celal, yaralı halde bulduğu Emine'yi yanına alarak gece karanlığında köyden kaçmaya çalışır. Düşman kurşunları arkalarından yağar; Emine vurulur ve daha fazla yürüyemez. Ahmet Celal, aşkını ve günlüğünü geride bırakıp meçhule doğru adım atarken Türk aydınının yüzyıllık gecikmişliğinin hesabını verir.</p>
""",
        "characters": [
            ("Ahmet Celal", "Vatan sevgisiyle yanan, kolunu cephede bırakmış ancak asıl yarasını kendi milletinin yabancılığıyla alan trajik Türk aydını."),
            ("Mehmet Ali", "Ahmet Celal'in emir eri; cephede can yoldaşıyken köye dönünce eski köylü kalıplarına ve kayıtsızlığına bürünen genç."),
            ("Emine", "Köyün gelenekleri içinde ezilen, Ahmet Celal'in platonik sevgisine konu olan köylü kızı."),
            ("Salih Ağa & Şeyh Yusuf", "Köylünün cehaletini ve korkusunu kullanarak kendi çıkarlarını koruyan yozlaşmış yerel otorite.")
        ],
        "themes": "Aydın ile köylü arasındaki iletişimsizlik, Anadolu'nun ihmal edilmişliği, Kurtuluş Savaşı gerçekliği ve cehaletin bedeli.",
        "quotes": [
            "Bunun hesabı sorulmalıdır. Bu millet neden bu halde? Çünkü biz ona hiçbir şey vermedik!",
            "Ben onların gözünde bir ecnebiydim; bir Yaban'dım.",
            "Anadolu insanı bir tohumdur; ama ona su verecek, ışık verecek olan bizdik."
        ]
    },
    {
        "title": "Son Ayı – Hannah Gold | Kitap Özeti, İklim Krizi ve Dostluk",
        "slug": "son-ayi-kitap-ozeti",
        "excerpt": "Hannah Gold'un ödüllü çevre romanı Son Ayı kitap özeti. April Wood, Kuzey Kutbu Ayı Adası, eriyen buzullar ve yaralı bir kutup ayısıyla kurulan mucizevi bağ.",
        "cover": "https://covers.openlibrary.org/b/id/12926552-L.jpg",
        "tags": ["Son Ayı", "Hannah Gold", "Kitap Özeti", "Kutup Ayısı", "İklim Değişikliği", "Çocuk Edebiyatı", "Çevre Bilinci"],
        "author": "Hannah Gold",
        "original_title": "The Last Bear",
        "year": "2021",
        "pages": "304 Sayfa",
        "quick_summary": "Annesini kaybettikten sonra içine kapanan bilim insanı babasıyla yaşayan 11 yaşındaki April Wood, babasının meteorolojik araştırma görevi nedeniyle Norveç açıklarındaki ıssız Ayı Adası'na gider. Adada eriyen buzullar yüzünden artık kutup ayısı kalmadığı söylenmektedir. Ancak April, adanın vahşi kayalıklarında buzulların erimesiyle mahsur kalmış, aç ve ayağına plastik atık dolanmış yaralı bir kutup ayısıyla karşılaşır. İkili arasında güvene dayalı derin bir bağ kurulur ve April, Ayı'yı hayatta tutabilmek ve onu gerçek buzullara (Svalbard) ulaştırabilmek için hayatını tehlikeye atan destansı bir kurtarma operasyonuna girişir.",
        "full_plot": """
<p>Blue Peter Kitap Ödülü ve Waterstones Çocuk Kitabı Ödülü sahibi <strong>Son Ayı</strong>, küresel iklim krizini ve doğayla yeniden bağ kurmanın iyileştirici gücünü anlatan son yılların en dokunaklı doğa romanıdır.</p>
<h3>Giriş: Ayı Adası'na Yolculuk ve Yalnızlık</h3>
<p>April Wood, annesinin ölümünün ardından kendisini tamamen işine veren babasıyla Londra'da yalnız bir hayat sürmektedir. Bir gün babası, Kuzey Kutup Dairesi'ndeki ıssız Ayı Adası'nda (Bjørnøya) altı aylık bir hava durumu gözlem görevi alır. April bu yolculuğu babasıyla yeniden yakınlaşmak için bir fırsat olarak görür. Adada hiç insan yaşamamaktadır. Babası gün boyu bilgisayar başında veri kaydederken April adanın sert tundralarını tek başına keşfe çıkar.</p>
<h3>Gelişme: Vahşi Dost ve Fıstık Ezmesi</h3>
<p>Bölgedeki deniz buzullarının erimesi nedeniyle adada artık kutup ayılarının yaşamadığı söylenmektedir. Ancak sisli bir günde April, uzakta devasa beyaz bir siluet fark eder: Bu, anakaraya dönememiş, açlıktan bir deri bir kemik kalmış gerçek bir kutup ayısıdır. Üstelik ayının ayağına insan yapımı plastik bir ip dolanmış ve derin bir yara açmıştır. April korkmak yerine ona yardım etmeye karar verir. Sabırla, fıstık ezmesi ve yiyeceklerle ayıya yaklaşır; sonunda plastik ipi kesip yarasını temizlemeyi başarır. Ayı ile April arasında sözsüz, derin bir telepatik dostluk başlar.</p>
<h3>Sonuç: Svalbard'a Tehlikeli Yolculuk ve Babayla Yüzleşme</h3>
<p>Kutup ayısı bu adada kalırsa yazın sıcağında ve yiyeceksizlikten ölecektir; çünkü etrafında deniz buzu kalmamıştır. April onu 400 kilometre kuzeydeki buzullarla kaplı Svalbard takımadalarına götürmek için adadaki eski bir tahta sandalla denize açılır. Şiddetli bir fırtına patlak verir ve sandal batar. Ayı, boğulmak üzere olan April'i sırtına alarak dondurucu sularda saatlerce yüzdürür ve bir buz kütlesine çıkarır. Babası sahil güvenlik botuyla son anda yetişir. April'in cesareti babasını derin uykusundan uyandırır: Aile kaybın yasını geride bırakır ve yetkililer ayıyı güvenli bir helikopter operasyonuyla Svalbard'ın engin kutup buzullarına kavuşturur.</p>
""",
        "characters": [
            ("April Wood", "Doğanın sesini dinlemeyi bilen, korkusuz, empati yeteneği yüksek ve yaralı bir hayvan için canını ortaya koyan cesur kız."),
            ("Ayı (Bear)", "İklim krizinin ve yok olan kutup habitatının canlı sembolü; vahşi fakat güvenildiğinde sadık bir dev."),
            ("April'in Babası", "Eşini kaybetmenin yasıyla hayattan kopmuş, kızının çabasıyla yeniden sevgiye ve aileye dönen bilim insanı.")
        ],
        "themes": "Küresel ısınma, kutupların erimesi, plastik kirliliği, yas süreci ve doğa-insan uyumu.",
        "quotes": [
            "Bir kutup ayısı ile arkadaş olmak için tek bir kural vardır: Ona asla bir canavar gibi bakmamalısın.",
            "Bazen dünyayı kurtarmak için tek bir insanın, tek bir çocuğun inanması yeterlidir.",
            "Buzlar eriyor olabilir; ama sevgi erimeyen tek şeydir."
        ]
    },
    {
        "title": "Sol Ayağım – Christy Brown | Kitap Özeti, Azim ve İrade Zaferi",
        "slug": "sol-ayagim-kitap-ozeti",
        "excerpt": "Christy Brown'ın kendi gerçek yaşam öyküsü Sol Ayağım kitap özeti. Beyin felci (serebral palsi), konuşamayan ve hareket edemeyen bir çocuğun sol ayak parmaklarıyla dünyayı fethedişi.",
        "cover": "https://covers.openlibrary.org/b/id/10314710-L.jpg",
        "tags": ["Sol Ayağım", "Christy Brown", "Kitap Özeti", "Otobiyografi", "Azim", "İrade", "Dünya Edebiyatı"],
        "author": "Christy Brown",
        "original_title": "My Left Foot",
        "year": "1954",
        "pages": "192 Sayfa",
        "quick_summary": "1932 yılında Dublin'de yoksul bir duvar ustasının oğlu olarak dünyaya gelen Christy Brown, beyin felci (serebral palsi) ile doğar. Doktorlar onun zihinsel engelli olduğunu ve hiçbir zaman bir şey öğrenemeyeceğini söylerler. Ancak annesi buna asla inanmaz. Beş yaşına geldiğinde Christy, sol ayağının başparmağıyla kız kardeşinin elinden sarı bir tebeşir parçasını kapar ve yere titrek çizgilerle 'A' harfini çizer. Bu mucizevi an, onun hapsolduğu sessizlik zindanını yıkar. Christy zamanla sol ayağıyla resim yapmayı, daktilo kullanmayı öğrenir ve dünya çapında bir ressam ve yazar haline gelir.",
        "full_plot": """
<p><strong>Sol Ayağım</strong>, insanın fiziki sınırlarının arkasındaki sarsılmaz iradeyi ve anne sevgisinin mucizeler yaratan gücünü anlatan dünya otobiyografi edebiyatının zirve eseridir.</p>
<h3>Giriş: Sessiz Beden ve Annenin Sarsılmaz İnancı</h3>
<p>Christy Brown, yirmi iki çocuklu kalabalık ve fakir bir İrlandalı işçi ailesinde doğar. Doğumdan itibaren kaslarını kontrol edemez, başını dik tutamaz ve konuşamaz. Dönemin doktorları çocuğun 'akıl hastası bir embesil' olduğunu söyleyerek onu bir bakımevine yatırmayı önerir. Ancak annesi bu tavsiyeyi şiddetle reddeder; oğlunun gözlerinde parlayan bir zeka gördüğünü söyler ve ona her gün sabırla kitaplar okur, onunla konuşur.</p>
<h3>Gelişme: Sarı Tebeşir ve 'A' Harfi Mucizesi</h3>
<p>Bir kış günü aile şömine başında otururken kız kardeşi yere tebeşirle yazı yazmaktadır. Beş yaşındaki Christy, aniden sol ayağını uzatır ve ayak parmaklarıyla tebeşiri yakalar. Odadaki herkes donakalır. Annesi yere çöker ve tebeşirle bir 'A' harfi çizerek Christy'e bunu kopyalamasını fısıldar. Christy tüm gücünü toplayarak, ter içinde kalarak sol ayağıyla yere 'A' harfini çizmeyi başarır. Bu harf, onun dünyaya uzattığı ilk köprüdür. Artık zihninin sağlam olduğu kanıtlanmıştır. Kardeşleri onu özel bir el arabasına koyarak sokak oyunlarına dahil ederler.</p>
<h3>Sonuç: Aşk, Resim ve Daktilo Tuşları</h3>
<p>Ergenlik çağına geldiğinde Christy bedeninin engeli yüzünden derin bunalımlar ve yalnızlık çeker. Ancak Doktor Robert Collis ve uzman fizyoterapistlerle tanışması hayatını değiştirir. Christy sol ayağını fırça tutacak kadar ustalıkla kullanmaya başlar ve çarpıcı tablolar yapar. Ardından tek parmağıyla daktilo tuşlarına basarak kendi hayatını kaleme alır: <em>Sol Ayağım</em>. Kitabın yayımlandığı yardım galasında Christy kürsüye çıkar; artık o sadece engellerini aşmış bir insan değil, edebiyat dünyasına adını altın harflerle kazımış büyük bir sanatçıdır.</p>
""",
        "characters": [
            ("Christy Brown", "Felçli bir bedene hapsolmuş dehasını sadece sol ayağını kullanarak dünyaya duyuran yılmaz yazar ve ressam."),
            ("Bridget Brown (Anne)", "Doktorların umutsuzluğuna karşı duran, oğlunun ruhunu keşfeden ve onu asla terk etmeyen kahraman anne."),
            ("Doktor Robert Collis", "Christy'nin tedavisini üstlenen, onun yazarlık yeteneğini teşvik eden bilge hekim.")
        ],
        "themes": "Azim, engellilik ve toplumsal önyargılar, anne şefkatinin gücü, sanatın iyileştiriciliği.",
        "quotes": [
            "O sarı tebeşir parçası, zihnimin kapısını dünyaya açan altın bir anahtardı.",
            "Bedenim bir hapishane olabilirdi; ama ruhumun sınırları yoktu.",
            "Kaybetmek, denemekten vazgeçtiğin anda başlar."
        ]
    },
    {
        "title": "Martı Jonathan Livingston – Richard Bach | Kitap Özeti ve Felsefesi",
        "slug": "marti-kitap-ozeti",
        "excerpt": "Richard Bach'ın kült felsefi klasiği Martı Jonathan Livingston kitap özeti. Sürüden ayrılan martı, uçmanın sınırları, mükemmellik arayışı ve özgürlük felsefesi.",
        "cover": "https://covers.openlibrary.org/b/id/9381674-L.jpg",
        "tags": ["Martı", "Richard Bach", "Kitap Özeti", "Jonathan Livingston", "Özgürlük", "Kişisel Gelişim", "Felsefi Roman"],
        "author": "Richard Bach",
        "original_title": "Jonathan Livingston Seagull",
        "year": "1970",
        "pages": "150 Sayfa",
        "quick_summary": "Çoğu martı için uçmak yalnızca balıkçı teknelerinden karnını doyurmak için bir araçken, Martı Jonathan Livingston için uçmanın kendisi hayatın en yüce gayesidir. Hız rekorları kırmak, rüzgarın sırlarını çözmek ve sınırlarını aşmak istediği için sürünün yaşlıları tarafından 'sürü kurallarına uymadığı' gerekçesiyle dışlanır ve yalnızlığa sürgün edilir. Jonathan pes etmek yerine tek başına gökyüzünde kusursuzluğu öğrenir; üst boyutlara ulaşır ve sonunda kendi gibi düşünen genç martılara uçmanın ve özgürlüğün gerçek anlamını öğretmek üzere dünyaya geri döner.",
        "full_plot": """
<p>Milyonlarca insanı kendi potansiyelini keşfetmeye çağıran <strong>Martı Jonathan Livingston</strong>, bireysellik, mükemmellik arayışı ve sürü psikolojisine başkaldırının zamansız bir alegorisidir.</p>
<h3>Giriş: Kahvaltı Sürüsü ve Uçma Tutkusu</h3>
<p>Bir martı sürüsü için hayat son derece basittir: Sahilden balıkçı teknelerine uçmak, atılan balık artıklarını kapmak ve kumsala dönmek. Ancak genç Jonathan Livingston farklıdır. O, sadece karnını doyurmak için uçmayı reddeder. Gökyüzünde ne kadar hızlı uçabileceğini, kanat açılarını nasıl kullanacağını gece gündüz test eder. Anne ve babasının "Sen bir martısın, kemik ve tüyden ibaretsin; balık yakalamaya bak" uyarılarına rağmen dalış denemeleri yapar ve saatte 300 kilometre hıza ulaşarak bir martının yapabileceği en inanılmaz manevraları gerçekleştirir.</p>
<h3>Gelişme: Sürgün ve Üst Boyutlar</h3>
<p>Sürünün Yaşlılar Konseyi toplanır. Jonathan'ın bu davranışını martı geleneklerine ve doğasına hakaret sayarak onu 'Utanç Çemberi'ne çağırır ve sürüden ebediyen aforoz ederler. Jonathan Uzak Kayalıklar'a sürgüne gider. Yalnızdır ama asla mutsuz değildir; çünkü artık daha yükseğe uçabilmekte, sislerin ardındaki lezzetli balıkları yakalayabilmektedir. Bir gün yanına ışık saçan iki bilge martı gelir ve onu başka bir seviyeye, zihnin ve düşüncenin sınırlarının olmadığı bir gökyüzü boyutuna götürürler. Orada bilge martı Chiang'dan zaman ve mekanın bir yanılsama olduğunu, saf düşünce hızıyla uçmayı öğrenir.</p>
<h3>Sonuç: Geri Dönüş ve Şefkat</h3>
<p>Jonathan mükemmelliğe ulaştıktan sonra bencilce orada kalmayı reddeder; sürüdeki kendisi gibi dışlanan genç martılara yardım etmek ister. Yeryüzüne geri döner. Orada kendisi gibi sürgün edilmiş genç Martı Fletcher Lynd ile karşılaşır ve ona hocalık yapmaya başlar. Zamanla etraflarında büyük bir öğrenci grubu toplanır. Sürü onları lanetlese de Jonathan onlara kin tutmaz; sevginin ve özgürlüğün en yüce kural olduğunu anlatır. Görevini Fletcher'a devrederek yeni ufuklara doğru gözden kaybolur.</p>
""",
        "characters": [
            ("Jonathan Livingston", "Sıradanlığı reddeden, öğrenme ve mükemmelleşme tutkusuyla sınırları yıkan öncü martı."),
            ("Fletcher Lynd", "Jonathan'ın ilk öğrencisi; öfkesini sevgiye ve uçma disiplinine dönüştüren sadık halef."),
            ("Chiang", "Zaman ve mekan sınırlarını aşmış, Jonathan'a düşünce hızında uçmayı öğreten ulu bilge martı."),
            ("Sürü Yaşlıları", "Değişimden ve yenilikten korkan, geleneklerin arkasına saklanan tutucu toplum simgesi.")
        ],
        "themes": "Bireysel özgürlük, sınırları aşma cesareti, sürü psikolojisi, öğrenme tutkusu ve affedicilik.",
        "quotes": [
            "En yüksekten uçan martı, en uzağı görür.",
            "Uçmak sadece kanat çırpmak değildir; uçmak, özgür olduğunu bilmektir.",
            "Cennet bir yer ya da bir zaman değildir. Cennet, mükemmel olmanın ta kendisidir."
        ]
    },
    {
        "title": "Kitap Özeti Nasıl Çıkarılır ve Yazılır? Adım Adım Rehber ve Örnek Form",
        "slug": "kitap-ozeti-nasil-cikarilir-ve-yazilir-ornek-form",
        "excerpt": "Türkçe ve Edebiyat dersleri için kitap özeti nasıl çıkarılır? Kitap özeti yazma teknikleri, adım adım aşamalar, özet çıkarırken yapılan hatalar ve indirilebilir örnek kitap özeti formu.",
        "cover": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200&auto=format&fit=crop",
        "tags": ["Kitap Özeti Nasıl Çıkarılır", "Kitap Özeti Nasıl Yazılır", "Kitap Özeti Formu", "Kitap Özeti Örneği", "Türkçe Dersi", "Öğrenci Rehberi"],
        "author": "Matemetrik Edebiyat Kurulu",
        "original_title": "Kitap İnceleme ve Özetleme Rehberi",
        "year": "2026",
        "pages": "Rehber & Şablon",
        "quick_summary": "Kitap özeti çıkarmak; bir eseri baştan sona kopyalamak değil, kitabın ana fikrini, olay örgüsünü, karakter çatışmalarını ve temel mesajını kendi özgün cümlelerinizle yeniden yapılandırmaktır. Başarılı bir kitap özeti 5 temel aşamadan oluşur: Ön hazırlık (not alma), olay örgüsünün serim-düğüm-çözüm planına oturtulması, ana karakterlerin işlevleriyle tanıtılması, ana fikir/tema tespiti ve kişisel değerlendirme.",
        "full_plot": """
<p>İlkokuldan üniversiteye kadar tüm öğrencilerin en sık karşılaştığı ödevlerden biri <strong>kitap özeti hazırlamaktır</strong>. Çoğu öğrenci internetten kopyala-yapıştır yaparak veya kitabı gelişigüzel kısaltarak düşük not alma tehlikesiyle karşılaşır. Oysa doğru bir yöntemle hazırlanan kitap özeti, hem okuma anlama kabiliyetinizi geliştirir hem de tam puan almanızı sağlar.</p>

<h3>1. Aşama: Okuma Sırasında Not Alma (Aktif Okuma)</h3>
<p>Kitap bittikten sonra oturup sıfırdan hatırlamaya çalışmak en büyük hatadır. Okurken yanınızda mutlaka yapışkanlı not kağıtları (post-it) veya bir defter bulundurun:</p>
<ul class="list-disc list-inside space-y-1 pl-4 my-2">
  <li>Hikayenin yönünü değiştiren kırılma anlarını işaretleyin.</li>
  <li>Yeni bir ana karakter sahneye girdiğinde onun belirgin fiziksel ve ruhsal özelliklerini not edin.</li>
  <li>Eserin geçtiği zaman dilimi ve mekan değişikliklerini kaydedin.</li>
  <li>Sizi derinden etkileyen ve kitabın ana fikrini özetleyen 1-2 vurucu alıntıyı kenara yazın.</li>
</ul>

<h3>2. Aşama: Serim, Düğüm ve Çözüm Planı Çıkarma</h3>
<p>Bir roman veya hikaye özetlenirken kronolojik düzen bozulmamalıdır. Özetinizi üç ana paragrafa bölün:</p>
<ul class="list-disc list-inside space-y-1 pl-4 my-2">
  <li><strong>Giriş (Serim):</strong> Olay nerede ve ne zaman geçiyor? Başkahraman kimdir ve içinde bulunduğu durum nedir?</li>
  <li><strong>Gelişme (Düğüm):</strong> Kahramanın karşısına çıkan ana engel, çatışma veya gizem nedir? Bu engeli aşmak için ne yaptı?</li>
  <li><strong>Sonuç (Çözüm):</strong> Olaylar nasıl bir sonuca bağlandı? Kahraman değişti mi? Eser nasıl bitti?</li>
</ul>

<h3>3. Aşama: Karakterleri Fonksiyonlarıyla Tanıtma</h3>
<p>Karakterleri sadece isim listesi olarak vermek özetin değerini düşürür. Her karakterin hikayedeki rolünü birer cümleyle açıklayın: Örneğin; <em>"Raskolnikov: Toplumsal kuralların üzerinde olduğuna inanarak cinayet işleyen ancak vicdan azabıyla çöken eski hukuk öğrencisi."</em></p>

<h3>4. Aşama: Ana Fikir ve Temayı Belirleme</h3>
<p>Konu ile ana fikir birbirine karıştırılmamalıdır. Konu <em>"kitapta ne anlatılıyor?"</em> sorusunun cevabıyken (örneğin: bir çocuğun yoksulluk mücadelesi), ana fikir <em>"yazarın okuyucuya iletmek istediği asıl mesaj nedir?"</em> sorusudur (örneğin: dürüstlük ve erdem, tüm maddi zenginliklerden daha kıymetlidir).</p>

<h3>Kitap Özeti Çıkarırken Asla Yapmamanız Gereken 4 Hata</h3>
<ol class="list-decimal list-inside space-y-1 pl-4 my-2">
  <li><strong>Yapay zeka veya internet kopyacılığı:</strong> Öğretmenler ve arama motorları kalıp cümleleri hemen fark eder. Kendi kelimelerinizi kullanın.</li>
  <li><strong>Gereksiz detaylara boğulmak:</strong> Yan karakterlerin küçük diyaloglarını veya önemsiz detayları özete dahil etmeyin.</li>
  <li><strong>Kişisel görüşü olay örgüsüne karıştırmak:</strong> Olayları anlatırken tarafsız olun; kendi düşüncelerinizi en sondaki 'Kişisel Değerlendirme' bölümüne saklayın.</li>
  <li><strong>Geniş zaman veya geçmiş zaman kipine sadık kalmamak:</strong> Anlatımı tek bir zaman kipinde (genellikle şimdiki zaman veya geniş zaman) tutarlı sürdürün.</li>
</ol>
""",
        "characters": [
            ("Kitabın Adı ve Yazarı", "Eserin tam başlığı, yazarı, çevirmeni ve yayınevi bilgileri."),
            ("Sayfa Sayısı ve Basım Yılı", "Kitabın fiziksel hacmi ve ilk yayımlanma tarihi."),
            ("Tür ve Kategori", "Roman, öykü, biyografi, fabl, distopya veya tarihi kurgu."),
            ("Mekan ve Zaman Dilimi", "Olayların cereyan ettiği coğrafi bölge ve tarihsel dönem.")
        ],
        "themes": "Metin analizi, eleştirel okuma becerisi, sentez yapabilme ve yazılı anlatım yetkinliği.",
        "quotes": [
            "İyi bir özet, bir kitabın bedeninden ruhunu çekip çıkarmak gibidir.",
            "Okumak bir eylem, özetlemek ise o eylemi kalıcı kılma sanatıdır.",
            "Kelimeleri azaltırken anlamı çoğaltabiliyorsanız, başarılı bir özet yazmışsınız demektir."
        ]
    }
]

# Insert or update
for b in MORE_BOOKS_DATA:
    existing = c.execute("SELECT id FROM posts WHERE slug = ?", (b["slug"],)).fetchone()
    
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
            VALUES (?, ?, ?, ?, ?, 'Kitap Özetleri', 'kitap-ozet', ?, 'Matemetrik Edebiyat', 180, 1, ?, ?)
        """, (b["title"], b["slug"], b["excerpt"], html, b["cover"], tags_json, now_str, now_str))
        print(f"Inserted new: {b['slug']}")

conn.commit()
conn.close()
print("All remaining books processed successfully!")
