# -*- coding: utf-8 -*-
import json

def get_g9_data():
    # We will assemble all 38 pages
    pages = {}
    
    # 19
    pages[19] = {
        "tema": "1. Tema: Sözün İnceliği",
        "ptype": "Söz Varlığımız",
        "title": "Faruk Nafiz Çamlıbel - San'at Şiiri Söz Varlığı ve Sözlük Anlamı",
        "questions": [
            {
                "num": 1,
                "title": "Kelimelerin Sözlük ve Şiirdeki Bağlamsal Anlamı",
                "question": "Okuduğunuz San'at adlı şiirde geçen bazı kelimelerin sözlük anlamları tabloda verilmiştir. Bu kelimelerin sözlük anlamları ile okuduğunuz şiirde kazandığı anlamları karşılaştırınız. Farklı anlamda kullanılan kelimeleri işaretleyiniz.",
                "steps": "<p><strong>1. İnceleme:</strong> Şiirdeki anahtar sözcükler tahlil edilir: <em>san'at, bağbân, kubbe, mûsikî, heykeltıraş, çini, zeybek</em>.</p><p><strong>2. Edebî Tahlil:</strong> Şair bu kelimeleri salt lügat anlamıyla değil, 'Memleket Edebiyatı' akımının sembolleri olarak kullanmıştır. 'Bahar' uyanışı ve yerli ruhu, 'çiçekli sahne' Batı taklitçiliğini, 'dağ gibi zeybek' ise Anadolu insanının vakar ve yiğitliğini imgelemektedir.</p><p><strong>3. Sonuç:</strong> Kelimelerin kazandığı yeni anlam katmanları belirlenmiştir.</p>",
                "answer": "Kelimeler metinde yan ve mecaz anlamlarıyla kullanılmıştır. Örneğin 'mabet' yalnız ibadethane değil millî mimarinin şaheserlerini, 'beyaz kelebek' Batı'nın salon sanatını (bale), 'dağ gibi zeybek' ise millî heyecanı ve halkın öz gücünü temsil etmektedir."
            },
            {
                "num": 2,
                "title": "Şairin Kelimelere Farklı Anlam Yükleme Gerekçesi",
                "question": "Sizce şair, San'at adlı şiirde kelimelere neden farklı anlamlar yüklemiştir? Söyleyiniz.",
                "steps": "<p><strong>1. İnceleme:</strong> Şiirin estetik işlevi ve şairin poetikası ele alınır.</p><p><strong>2. Edebî Tahlil:</strong> Şiir düz yazı gibi sadece bilgi aktarmaz; duyguyu yoğunlaştırır, çağrışım yaratır. Faruk Nafiz, Batı hayranlığına karşı yerli ve millî değerlerin büyüklüğünü okuyucunun ruhuna nakşetmek için kelimelere sembolik değerler yüklemiştir.</p>",
                "answer": "Şair, okuyucuda derin bir estetik ve millî duygu uyandırmak, sanatsal tezatı (Batı-Doğu, saray-halk, salon sanatı-Anadolu gerçeği) somutlaştırarak şiirsel etkiyi doruğa ulaştırmak amacıyla kelimelere çok katmanlı simgesel anlamlar yüklemiştir."
            },
            {
                "num": 3,
                "title": "TDK Güncel İmla ve Tarihsel Yazım Karşılaştırması",
                "question": "Okuduğunuz San'at adlı şiirde geçen 'san'at, bahâr, mûsikî, mozayik' kelimelerinin güncel yazım şekillerini TDK Güncel Türkçe Sözlük'ten kontrol ediniz. Bu sözcüklerin metnin aslındaki yazılışı ile günümüzdeki yazılışını karşılaştırınız.",
                "steps": "<p><strong>1. İnceleme:</strong> Cumhuriyet'in ilk dönemlerindeki Osmanlıcadan Türkçeye geçiş imlası (ayn işareti ve şapkalı ünlüler) kontrol edilir.</p><p><strong>2. Çözüm:</strong> Güncel TDK kılavuzunda kesme işaretiyle hece bölme kalkmış, ses sadeleşmesi sağlanmıştır: san'at -> sanat, bahâr -> bahar, mûsikî -> musiki, mozayik -> mozaik.</p>",
                "answer": "Güncel TDK yazımları sırasıyla: <strong>sanat, bahar, musiki, mozaik</strong> şeklindedir. Zamanla dilde yalınlaşma sağlanmış ve gereksiz kesme ve uzatma işaretleri kaldırılmıştır."
            }
        ]
    }

    # 20
    pages[20] = {
        "tema": "1. Tema: Sözün İnceliği",
        "ptype": "Metin Anlama ve Çözümleme",
        "title": "Faruk Nafiz Çamlıbel - San'at Şiiri Anlama ve Çözümleme",
        "questions": [
            {
                "num": 3,
                "title": "Mabetlerin Süslemeleri ve Ruhsal Etkisi",
                "question": "Okuduğunuz San'at adlı şiire göre mabetleri süslemek için neler kullanılmaktadır ve bu süslemeler insanları nasıl etkilemektedir? Söyleyiniz.",
                "steps": "<p><strong>1. İnceleme:</strong> Şiirdeki mimari ve tezyinat ögeleri: çiniler, hat sanatları, kubbe nakışları ve sülüs yazılar tahlil edilir.</p><p><strong>2. Edebî Tahlil:</strong> Bu tezyinatlar insanda geçici dünyevi zevklerin ötesinde sonsuzluk, uhrevi sükûnet ve estetik bir huşu duygusu meydana getirir.</p>",
                "answer": "Mabetleri süslemek için yeşil çiniler, ince hat yazıları, tezhip ve nakışlar kullanılmaktadır. Bu süslemeler insanı derinden sarsmakta, ruhuna manevi bir sükûnet, huşu ve derin bir vecd hali kazandırmaktadır."
            },
            {
                "num": 4,
                "title": "Bale ile Zeybek Oyununun Karşılaştırılması",
                "question": "Şair, üçüncü dörtlükte bale ve zeybek oyununu neden karşılaştırmış olabilir? Söyleyiniz.",
                "steps": "<p><strong>1. İnceleme:</strong> Dörtlükteki tezat sanatı: 'çiçekli sahnede beyaz kelebek' (bale) ile 'toprağa diz vuruşu dağ gibi zeybeğin' (halk oyunu) incelenir.</p><p><strong>2. Edebî Tahlil:</strong> Şair kozmopolit, yapay Batı salon estetiği karşısında Anadolu halkının topraktan güç alan doğal, cesur ve vakur gücünü zeybek oyunu üzerinden yüceltmiştir.</p>",
                "answer": "Şair; Batı'nın narin, yapay salon gösterisi olan bale ile Türk milletinin mertliğini, toprağa bağlılığını ve sarsılmaz gücünü yansıtan zeybek oyununu karşılaştırarak yerli ve millî sanatın coşkusunun kendi ruhumuza daha uygun olduğunu göstermek için bu tezatı kurmuştur."
            },
            {
                "num": 5,
                "title": "'Köylünün Kıvrılmayan Beli' İfadesinin Tahlili",
                "question": "Şiirde geçen 'köylünün kıvrılmayan beli' ifadesi, Anadolu insanının özellikleri hakkında size neler düşündürmektedir? Düşüncelerinizi gerekçeleriyle söyleyiniz.",
                "steps": "<p><strong>1. İnceleme:</strong> İfade mecaz ve sembolik yönüyle çözümlenir.</p><p><strong>2. Edebî Tahlil:</strong> Kıvrılmayan bel; ağır tarım şartlarına rağmen çalışkanlığı, aynı zamanda hiçbir güç ve esaret karşısında eğilmeyen başı dik, gururlu, asil ve onurlu karakteri simgeler.</p>",
                "answer": "Bu ifade, Anadolu köylüsünün bütün ekonomik zorluklara ve çetin hayat şartlarına rağmen onurundan taviz vermeyen, başı dik, gururlu, vatanına sadık ve asla boyun eğmeyen sağlam karakterini simgelemektedir."
            },
            {
                "num": 6,
                "title": "Yazılmamış Bir Destan Olarak Anadolu",
                "question": "a) Okuduğunuz şiirde söylenmemiş bir destana benzetilen Anadolu'nun özellikleri nelerdir? Yazınız. b) Sizce günümüzde Anadolu'nun bu özellikleri hâlâ yaşatılmakta mıdır?",
                "steps": "<p><strong>1. İnceleme:</strong> Şiirin sonundaki 'Yazılmamış bir destan gibi Anadolu'muz' mısrası incelenir.</p><p><strong>2. Edebî Tahlil:</strong> Anadolu; asırlar boyu nice kahramanlıklara, acılara, aşklara sahne olmuş ama tam anlamıyla edebiyata aktarılamamış zengin bir hazinedir.</p>",
                "answer": "a) Anadolu; keşfedilmeyi bekleyen köklü bir tarihe, halk hikâyelerine, zengin türkülere, mert ve çilekeş insanlara sahip yaşayan bir destandır. b) Evet, günümüzde de Anadolu insanının misafirperverliği, dayanışma bilinci, kültürel zenginliği ve vatan sevgisi canlı bir şekilde yaşatılmaktadır."
            }
        ]
    }

    # 21
    pages[21] = {
        "tema": "1. Tema: Sözün İnceliği",
        "ptype": "Grup Çalışması ve Edebî Görüşler",
        "title": "Faruk Nafiz Çamlıbel - San'at Şiiri Takım Çalışması ve Sanat Bildirisi",
        "questions": [
            {
                "num": 1,
                "title": "San'at Şiirinin Bildiri (Manifesto) Niteliği",
                "question": "Takım sözcüleri olarak yazdığınız maddeleri sırayla okuyunuz. Şairin sanata ve Anadolu'ya bakış açısını maddeler hâlinde özetleyiniz.",
                "steps": "<p><strong>1. İnceleme:</strong> Memleketçi Edebiyat'ın ilkeleri maddeler halinde listelenir.</p><p><strong>2. Çözüm:</strong> 1) Gerçek sanat halkın bağrında ve Anadolu'dadır. 2) Yabancı taklitçiliği bırakılmalıdır. 3) Dil sade ve hece ölçüsü esas olmalıdır. 4) Sanatçı halkın dertlerini dile getirmelidir.</p>",
                "answer": "1. Gerçek sanatın tükenmez kaynağı Anadolu toprağı, halkı ve folklorudur.<br/>2. Batı öykünmeciliği ve taklitçilik terk edilmeli, millî öz ve değerler işlenmelidir.<br/>3. Şiirde halkın konuştuğu arı Türkçe ve millî ölçümüz olan hece vezni kullanılmalıdır.<br/>4. Sanat toplum için yapılmalı, milletin değerleriyle bütünleşmelidir."
            }
        ]
    }

    # 22
    pages[22] = {
        "tema": "1. Tema: Sözün İnceliği",
        "ptype": "Sanatçıyı Tanıyalım",
        "title": "Faruk Nafiz Çamlıbel Hayatı, Eserleri ve Şiir Anlayışı",
        "questions": [
            {
                "num": 1,
                "title": "Faruk Nafiz Çamlıbel'in Edebî Kişiliği ve Eserleri",
                "question": "Faruk Nafiz Çamlıbel'in edebî kişiliğini, mensubu olduğu topluluğu ve öne çıkan eserlerini metinden hareketle tahlil ediniz.",
                "steps": "<p><strong>1. Hayatı:</strong> 1898-1973 yılları arasında yaşamış, edebiyat öğretmeni ve milletvekilliği yapmıştır.</p><p><strong>2. Edebî Topluluğu:</strong> Beş Hececiler'in en lirik ve güçlü şairidir. Aruzla başladığı şiire hece ile devam etmiş, 'Han Duvarları' ve 'San'at' şiirleriyle çığır açmıştır.</p><p><strong>3. Eserleri:</strong> Şiir: Han Duvarları, Çoban Çeşmesi, Dinle Neyden, Gönülden Gönüle. Tiyatro: Canavar, Akın, Özyurt, Kahraman.</p>",
                "answer": "Faruk Nafiz Çamlıbel, Beş Hececiler topluluğunun en önemli şairidir. Hece veznini büyük bir ustalıkla işlemiş, Anadolu insanını ve coğrafyasını samimi ve lirik bir dille edebiyatımıza kazandırmıştır. 'San'at' şiiriyle Memleketçi Edebiyat'ın manifestosunu oluşturmuştur."
            }
        ]
    }

    print("Pages 19-22 processed.")
    return pages

print("G9 helper ready.")
