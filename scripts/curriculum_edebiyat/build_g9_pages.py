# -*- coding: utf-8 -*-
import json

# Read base data
from scripts.curriculum_edebiyat.data_grade9 import UNITS, FAQS

pages_dict = {}

# Page 19
pages_dict[19] = {
    "tema": "1. Tema: Sözün İnceliği",
    "ptype": "Söz Varlığımız",
    "title": "Faruk Nafiz Çamlıbel - San'at Şiiri Söz Varlığı ve Sözlük Anlamı",
    "questions": [
        {
            "num": 1,
            "title": "Şiirde Geçen Kelimelerin Sözlük ve Bağlamsal Anlamı",
            "question": "Okuduğunuz San'at adlı şiirde geçen bazı kelimelerin sözlük anlamları tabloda verilmiştir. Bu kelimelerin sözlük anlamları ile okuduğunuz şiirde kazandığı anlamları karşılaştırınız. Farklı anlamda kullanılan kelimeleri işaretleyiniz.",
            "steps": "<p><strong>1. Adım:</strong> Şiirde geçen temel kelimeler tahlil edilir: <em>san'at, bağbân, kubbe, mûsikî, heykeltıraş, çini, zeybek</em>.</p><p><strong>2. Adım:</strong> Bu kelimeler şiirin bağlamında doğrudan ilk sözlük anlamlarının ötesinde, millî ve yerli sanat ile Batı öykünmeciliği arasındaki tezatı vurgulamak üzere mecaz ve yan anlamlar kazanmıştır. Örneğin 'bahâr' kelimesi yalnızca bir mevsimi değil, Anadolu'nun uyanan kültürel canlılığını; 'mabet' ise sadece ibadethane değil, bin yıllık Türk-İslam mimari hafızasını simgeler.</p><p><strong>3. Adım:</strong> Sözcüklerin metindeki bağlamsal zenginliği ve imgesel gücü tespit edilmiştir.</p>",
            "answer": "Kelimeler şiirde salt ilk sözlük anlamlarıyla değil; Anadolu kültürünü, milli estetiği ve folklorik değerleri temsil eden zengin yan ve mecaz anlamlarıyla (örneğin 'çiçekli sahne' Batı sanatını, 'dağ gibi zeybek' Anadolu'nun asalet ve cesaretini simgeleyecek şekilde) kullanılmıştır."
        },
        {
            "num": 2,
            "title": "Şairin Kelimelere Farklı Anlamlar Yükleme Sebebi",
            "question": "Sizce şair, San'at adlı şiirde kelimelere neden farklı anlamlar yüklemiştir? Söyleyiniz.",
            "steps": "<p><strong>1. Adım:</strong> Şiir türünün doğası ve estetik işlevi göz önüne alınır. Şiir, düz yazıdan farklı olarak dilde yeni çağrışımlar ve duygu yoğunluğu yaratma sanatıdır.</p><p><strong>2. Adım:</strong> Faruk Nafiz Çamlıbel, Memleketçi Edebiyat anlayışının manifestosu niteliğindeki bu şiirde, Türk milletinin kendi öz değerlerini keşfetmesini amaçlar. Bu nedenle kelimelere millî kimlik, tarihî derinlik ve görsel canlılık katan yeni anlam katmanları yüklemiştir.</p>",
            "answer": "Şair; şiirsel etkiyi artırmak, imgeler yoluyla okuyucuda estetik bir heyecan uyandırmak ve Anadolu kültürünün derinliğini kuru bir anlatım yerine canlı, duygu yüklü sembollerle hissettirmek amacıyla kelimelere çağrışımsal ve simgesel anlamlar yüklemiştir."
        },
        {
            "num": 3,
            "title": "Eski ve Güncel Yazım Şekillerinin Karşılaştırılması",
            "question": "Okuduğunuz San'at adlı şiirde geçen 'san'at, bahâr, mûsikî, mozayik' kelimelerinin güncel yazım şekillerini TDK Güncel Türkçe Sözlük'ten kontrol ediniz. Bu sözcüklerin metnin aslındaki yazılışı ile günümüzdeki yazılışını karşılaştırınız.",
            "steps": "<p><strong>1. Adım:</strong> Metnin yazıldığı dönemin (Cumhuriyet'in ilk yılları) imla kuralları incelenir. O dönemde kesme işaretiyle hece ayrımı (ayn harfi karşılığı) ve uzun ünlüler için düzeltme işareti (şapka) yaygın olarak kullanılıyordu.</p><p><strong>2. Adım:</strong> TDK Güncel Türkçe Sözlük kuralları uygulanır: san'at &rarr; sanat, bahâr &rarr; bahar, mûsikî &rarr; musiki, mozayik &rarr; mozaik biçimine evrilmiştir.</p>",
            "answer": "Güncel TDK yazımları sırasıyla: <strong>sanat, bahar, musiki, mozaik</strong> şeklindedir. Metnin aslındaki kesme işaretleri ve gereksiz uzatma işaretleri zamanla dilde sadeleşme ve alfabe uyumu prensipleri gereğince kaldırılmıştır."
        }
    ]
}

# Page 20
pages_dict[20] = {
    "tema": "1. Tema: Sözün İnceliği",
    "ptype": "Metin Anlama ve Çözümleme",
    "title": "Faruk Nafiz Çamlıbel - San'at Şiiri Anlama ve Çözümleme",
    "questions": [
        {
            "num": 3,
            "title": "Mabetlerin Süslemeleri ve İnsanlar Üzerindeki Etkisi",
            "question": "Okuduğunuz San'at adlı şiire göre mabetleri süslemek için neler kullanılmaktadır ve bu süslemeler insanları nasıl etkilemektedir? Söyleyiniz.",
            "steps": "<p><strong>1. Adım:</strong> Şiirin ilgili dörtlüğü tahlil edilir: <em>'Bir bağban ebru ile süsler mabetleri... Yeşil çiniler, hatlar ve kubbedeki sülüsler'</em>.</p><p><strong>2. Adım:</strong> Türk-İslam mimarisinde mabetler çiniler, hat sanatı yazıları, oymalar ve nakışlarla süslenir. Bu süslemeler insan ruhunda derin bir sükûnet, huşu, sonsuzluk ve manevi hayranlık duygusu uyandırır.</p>",
            "answer": "Mabetleri süslemek için yeşil çiniler, hat yazıları, nakışlar ve ince taş işçilikleri kullanılmaktadır. Bu süslemeler insana derin bir huşu, ruhani huzur ve millî bir sanat zevki aşılamaktadır."
        },
        {
            "num": 4,
            "title": "Bale ve Zeybek Karşılaştırması",
            "question": "Şair, üçüncü dörtlükte bale ve zeybek oyununu neden karşılaştırmış olabilir? Söyleyiniz.",
            "steps": "<p><strong>1. Adım:</strong> Dörtlük incelenir: <em>'Sen raksına dalarken için titrer derinden / Çiçekli bir sahnede bir beyaz kelebeğin / Bizim de kalbimizi kımıldatır yerinden / Toprağa diz vuruşu dağ gibi zeybeğin'</em>.</p><p><strong>2. Adım:</strong> Şair burada Batı sanat zevkini (bale) simgeleyen naif, kırılgan kelebek figürü ile Türk millî kültürünü ve Anadolu ruhunu simgeleyen zeybeğin heybetli diz vuruşunu karşılaştırır. Amaç Batı'yı kötülemek değil, kendi insanımızın coşkusunun kendi öz kültüründe yattığını tezat sanatı yoluyla somutlaştırmaktır.</p>",
            "answer": "Şair, Batı'ya ait salon sanatları (bale) ile Anadolu'nun yiğitlik, cesaret ve vakarını simgeleyen millî halk oyunlarını (zeybek) karşılaştırarak Türk sanatçısının ilham kaynağının kendi öz yurdu ve halk kültürü olduğunu göstermek istemiştir."
        },
        {
            "num": 5,
            "title": "Köylünün Kıvrılmayan Beli İfadesinin Tahlili",
            "question": "Şiirde geçen 'köylünün kıvrılmayan beli' ifadesi, Anadolu insanının özellikleri hakkında size neler düşündürmektedir? Düşüncelerinizi gerekçeleriyle söyleyiniz.",
            "steps": "<p><strong>1. Adım:</strong> İfade bağlam içinde ele alınır: Anadolu köylüsünün çalışkanlığı, dik duruşu, onuru ve eğilmez karakteri kastedilmektedir.</p><p><strong>2. Adım:</strong> Mecazımürsel ve istiare çağrışımları değerlendirilir. Belin bükülmemesi; hem ağır tarım işlerine rağmen fiziki dayanıklılığı hem de düşmana ve zorluklara boyun eğmeyen ahlaki erdemi ve asaleti simgeler.</p>",
            "answer": "Bu ifade, Anadolu insanının her türlü çileye, yoksulluğa ve zorluğa rağmen başı dik, onurlu, gururlu, vatanına bağlı ve asla esaret veya boyun eğmeyi kabul etmeyen sarsılmaz karakterini ifade eder."
        },
        {
            "num": 6,
            "title": "Yazılmamış Bir Destan Olarak Anadolu",
            "question": "a) Okuduğunuz şiirde söylenmemiş bir destana benzetilen Anadolu'nun özellikleri nelerdir? b) Sizce günümüzde Anadolu'nun bu özellikleri hâlâ yaşatılmakta mıdır?",
            "steps": "<p><strong>1. Adım:</strong> Şiirin son dizeleri tahlil edilir: <em>'Başka san'at bilmeyiz, karşımızda dururken / Yazılmamış bir destan gibi Anadolu'muz'</em>. Anadolu; henüz keşfedilmemiş güzelliklerle dolu, tarihî zenginliği, efsaneleri, masalları, türküleri ve keşfedilmeyi bekleyen cevherleriyle yaşayan bir destandır.</p><p><strong>2. Adım:</strong> Günümüz perspektifinden değerlendirme yapılır: Anadolu'nun misafirperverliği, imece kültürü, türküleri ve zanaatları kültürel miras olarak devam etmektedir.</p>",
            "answer": "a) Anadolu; işlenmemiş zengin bir folklora, köklü bir tarihe, keşfedilmeyi bekleyen kahramanlıklara ve samimi bir ruh dünyasına sahiptir. b) Evet, günümüzde modernleşmeye rağmen Anadolu'nun dayanışma ruhu, geleneksel el sanatları, samimiyeti ve türküleri canlı bir şekilde yaşatılmaktadır."
        }
    ]
}

# Page 21
pages_dict[21] = {
    "tema": "1. Tema: Sözün İnceliği",
    "ptype": "Grup Çalışması ve Edebî Görüşler",
    "title": "Faruk Nafiz Çamlıbel - San'at Şiiri Takım Çalışması ve Sanat Bildirisi",
    "questions": [
        {
            "num": 1,
            "title": "Memleket Edebiyatı Bildirisi Olarak Şiirin Maddeleri",
            "question": "Takım sözcüleri olarak yazdığınız maddeleri sırayla okuyunuz. Şairin sanata ve Anadolu'ya bakış açısını maddeler hâlinde özetleyiniz.",
            "steps": "<p><strong>1. Adım:</strong> Şiirin iletileri gruplanır: 1) Sanatçının yönünü Batı'nın yapay taklitçiliğine değil, kendi memleketine dönmesi gerekir. 2) Anadolu'nun folkloru, dili ve insanı en zengin estetik kaynaktır. 3) Sanat halktan kopuk fildişi kulelerde değil, milletin içinde yapılmalıdır.</p><p><strong>2. Adım:</strong> Şiirin sonundaki 'Sana uğurlar olsun... Ayrılıyor yolumuz!' dizesi, kozmopolit sanat anlayışından millî edebiyat anlayışına kesin bir yol ayrımını ilan eder.</p>",
            "answer": "Özet Maddeler: 1) Gerçek sanatın kaynağı Anadolu toprağı ve halk kültürüdür. 2) Sanatçı taklitçilikten uzak durmalı, yerli motifleri işlemelidir. 3) Şiirde halkın anlayacağı sade Türkçe ve hece vezni esas alınmalıdır. 4) Batı öykünmeciliği ile millî sanat anlayışı arasındaki yol ayrımı kesinleşmiştir."
        }
    ]
}

# Page 22
pages_dict[22] = {
    "tema": "1. Tema: Sözün İnceliği",
    "ptype": "Sanatçıyı Tanıyalım",
    "title": "Faruk Nafiz Çamlıbel Hayatı, Eserleri ve Şiir Anlayışı",
    "questions": [
        {
            "num": 1,
            "title": "Faruk Nafiz Çamlıbel'in Edebî Kişiliği ve Eserleri",
            "question": "Faruk Nafiz Çamlıbel'in edebî kişiliğini, mensubu olduğu topluluğu ve öne çıkan eserlerini metinden hareketle tahlil ediniz.",
            "steps": "<p><strong>1. Adım:</strong> Biyografik bilgiler incelenir: 1898-1973 yılları arasında yaşamış, Türk edebiyatında Beş Hececiler topluluğunun en önemli ve güçlü temsilcisidir.</p><p><strong>2. Adım:</strong> Aruz ölçüsüyle başladığı şiir serüvenine hece veznini ustalıkla kullanarak devam etmiş, Anadolu insanının çilesini, aşklarını ve tabiatını 'Han Duvarları' gibi başyapıtlarla lirik bir dille aktarmıştır.</p><p><strong>3. Adım:</strong> Eserleri: Şiir: <em>Han Duvarları, Çoban Çeşmesi, Dinle Neyden, Gönülden Gönüle, Şarkın Sultanları</em>. Tiyatro: <em>Canavar, Akın, Özyurt, Yayla Kartalı</em>.</p>",
            "answer": "Faruk Nafiz Çamlıbel, Beş Hececiler topluluğunun önde gelen şairidir. Şiirlerinde hece veznini kusursuz bir ahenkle kullanmış, 'San'at' şiiriyle Memleket Edebiyatı akımının manifestosunu yazmıştır. Başlıca eserleri Han Duvarları, Çoban Çeşmesi ve Canavar tiyatrosudur."
        }
    ]
}

print('Group 1 ready')
