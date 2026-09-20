# -*- coding: utf-8 -*-
"""
Authentic Turkish & Literature Question Generator for:
1. 1-sinif-turkce-harfler-heceler-ve-okuma-anlama-konu-anlatimi-20-soruluk-test
2. 2-sinif-turkce-es-ve-zit-anlamli-kelimeler-konu-anlatimi-20-soruluk-test
3. 8-sinif-turkce-ozneler-ve-cumlenin-ogeleri-konu-anlatimi-20-soruluk-test
4. 8-sinif-turkce-fiilimsiler-konu-anlatimi-20-soruluk-test
"""

def get_turkish_questions(slug):
    if "1-sinif-turkce-harfler" in slug:
        raw_items = [
            ("Alfabemizde toplam kaç harf bulunmaktadır?", ["A) 27", "B) 28", "C) 29", "D) 30"], "C", "Türk alfabesinde 29 harf bulunur. Bunların 8'i ünlü (sesli), 21'i ünsüz (sessiz) harftir."),
            ("Aşağıdakilerden hangisi bir 'ünlü (sesli)' harftir?", ["A) B", "B) M", "C) E", "D) K"], "C", "Türkçede ünlü harfler: a, e, ı, i, o, ö, u, ü olmak üzere 8 tanedir. 'E' ünlü bir harftir."),
            ("Aşağıdaki sözcüklerden hangisi tek hecelidir?", ["A) Okul", "B) Kuş", "C) Kalem", "D) Masa"], "B", "Bir kelimede kaç ünlü harf varsa o kadar hece vardır. 'Kuş' kelimesinde tek 'u' harfi olduğu için tek hecelidir."),
            ("'Kİ-TAP-LIK' sözcüğü kaç heceden oluşmaktadır?", ["A) 2", "B) 3", "C) 4", "D) 5"], "B", "Ki-tap-lık sözcüğü 3 heceden oluşur: ki (1), tap (2), lık (3)."),
            ("Aşağıdaki sözcüklerden hangisi yanlış hecelenmiştir?", ["A) O-kul", "B) Ka-lem-lik", "C) O-to-b-üs", "D) Ço-cuk"], "C", "Otobüs kelimesi 'o-to-büs' şeklinde hecelenir. C şıkkındaki heceleme yanlıştır."),
            ("'Ali bahçede top oynuyor.' cümlesinde 'KİM' sorusunun cevabı hangisidir?", ["A) Bahçede", "B) Top", "C) Ali", "D) Oynuyor"], "C", "Cümlede top oynayan kişi Ali'dir. 'Kim oynuyor?' sorusunun cevabı 'Ali'dir."),
            ("'Zeynep dün kütüphaneye gitti.' cümlesinde Zeynep 'NE ZAMAN' gitmiştir?", ["A) Kütüphaneye", "B) Dün", "C) Gitti", "D) Zeynep"], "B", "'Ne zaman gitti?' sorusunun cevabı 'Dün' sözcüğüdür."),
            ("Aşağıdaki harflerden hangisi büyük harfle yazılmıştır?", ["A) m", "B) A", "C) t", "D) r"], "B", "'A' harfi büyük harftir, diğerleri küçük harfle yazılmıştır."),
            ("Özel isimlerin (Ahmet, Ankara, Pamuk) ilk harfi nasıl yazılır?", ["A) Küçük harfle", "B) Sayıyla", "C) Büyük harfle", "D) İtalik"], "C", "Türkçe yazım kurallarına göre kişi, şehir ve hayvanlara verilen özel isimlerin ilk harfi daima büyük yazılır."),
            ("Cümlelerin sonuna hangi noktalama işareti konur?", ["A) Virgül", "B) Nokta", "C) Soru işareti", "D) Ünlem"], "B", "Tamamlanmış, bitmiş kurallı cümlelerin sonuna nokta (.) konur."),
            ("'Ayşe pazardan elma aldı.' cümlesinde 'NEREDEN' sorusunun yanıtı nedir?", ["A) Ayşe", "B) Pazardan", "C) Elma", "D) Aldı"], "B", "'Nereden aldı?' sorusunun yanıtı 'Pazardan' sözcüğüdür."),
            ("Hangi kelimede diğerlerinden daha fazla hece vardır?", ["A) Masa (2)", "B) Çiçek (2)", "C) Bilgisayar (4)", "D) Defter (2)"], "C", "Bil-gi-sa-yar 4 hecelidir."),
            ("Aşağıdaki kelimelerden hangisi 'a' harfi ile başlar?", ["A) Armut", "B) Balık", "C) Ceket", "D) Çilek"], "A", "'Armut' kelimesi 'a' harfi ile başlar."),
            ("'Güneş doğdu.' cümlesi kaç sözcükten oluşmuştur?", ["A) 1", "B) 2", "C) 3", "D) 4"], "B", "'Güneş' ve 'doğdu' olmak üzere 2 kelimeden oluşmuştur."),
            ("Aşağıdaki kelimelerden hangisi sadece ünsüz harflerden oluşamaz?", ["A) Türkçede her hecede mutlaka bir ünlü harf bulunur", "B) Ünlü olmadan kelime olmaz", "C) A ve B seçenekleri doğrudur", "D) Yalnızca harfler"], "C", "Türkçede her hecede mutlaka en az bir ünlü (sesli) harf bulunmak zorundadır."),
            ("Soru bildiren 'Bugün okula geldin mi' cümlesinin sonuna ne konur?", ["A) Nokta", "B) Soru işareti (?)", "C) Virgül", "D) Ünlem"], "B", "Soru anlamı taşıyan cümlelerin sonuna soru işareti (?) konur."),
            ("Aşağıdaki hayvan isimlerinden hangisi 2 hecelidir?", ["A) As-lan", "B) Kuş", "C) Ka-rın-ca", "D) Fi-il"], "A", "As-lan iki hecelidir."),
            ("'Okul' kelimesinin ilk harfi hangisidir?", ["A) K", "B) U", "C) O", "D) L"], "C", "Okul kelimesi 'O' harfi ile başlar."),
            ("Bir kelimede 3 tane ünlü harf varsa, bu kelime kaç hecelidir?", ["A) 2", "B) 3", "C) 4", "D) 5"], "B", "Kelimenin hece sayısı, içerisindeki ünlü (sesli) harf sayısına eşittir. Dolayısıyla 3 hecelidir."),
            ("Aşağıdakilerden hangisi bir nezaket sözcüğüdür?", ["A) Çabuk", "B) Git", "C) Lütfen", "D) Sus"], "C", "'Lütfen', 'teşekkür ederim', 'özür dilerim' nezaket sözcükleridir.")
        ]
    elif "2-sinif-turkce-es-ve-zit" in slug:
        raw_items = [
            ("'Al' sözcüğünün eş anlamlısı (anlamdaşı) aşağıdakilerden hangisidir?", ["A) Beyaz", "B) Kırmızı", "C) Sarı", "D) Kara"], "B", "'Al' ve 'kırmızı' aynı anlama gelen eş anlamlı sözcüklerdir."),
            ("'Büyük' sözcüğünün zıt (karşıt) anlamlısı hangisidir?", ["A) İri", "B) Küçük", "C) Uzun", "D) Geniş"], "B", "Büyük sözcüğünün zıt anlamlısı 'küçük'tür."),
            ("'Ak' sözcüğü ile 'Beyaz' arasındaki anlam ilişkisi hangisinde vardır?", ["A) Sıcak - Soğuk", "B) Yaşlı - İhtiyar", "C) Uzun - Kısa", "D) Gece - Gündüz"], "B", "Ak ve beyaz eş anlamlıdır. Yaşlı ve ihtiyar da birbiriyle eş anlamlıdır."),
            ("'Hızlı' kelimesinin zıt anlamlısı aşağıdakilerden hangisidir?", ["A) Çabuk", "B) Yavaş", "C) Süratli", "D) Koşmak"], "B", "Hızlı kelimesinin karşıtı (zıttı) 'yavaş'tır."),
            ("'Güz' sözcüğünün eş anlamlısı aşağıdakilerden hangisidir?", ["A) Bahar", "B) Yaz", "C) Sonbahar", "D) Kış"], "C", "'Güz' ve 'sonbahar' eş anlamlı sözcüklerdir."),
            ("'Zengin' sözcüğünün zıt anlamlısı hangisidir?", ["A) Varlıklı", "B) Fakir (Yoksul)", "C) Cömert", "D) Cimri"], "B", "Zengin sözcüğünün karşıtı fakirdir."),
            ("Aşağıdaki ikililerden hangisi 'zıt anlamlı' değildir?", ["A) Aşağı - Yukarı", "B) İleri - Geri", "C) Konuk - Misafir", "D) Acı - Tatlı"], "C", "Konuk ve misafir eş anlamlıdır, zıt anlamlı değildir."),
            ("'Öğrenci' sözcüğünün eş anlamlısı aşağıdakilerden hangisidir?", ["A) Öğretmen", "B) Talebe", "C) Okul", "D) Sınıf"], "B", "Öğrenci ve talebe eş anlamlı sözcüklerdir."),
            ("'Siyah' sözcüğünün eş anlamlısı hangisidir?", ["A) Kara", "B) Beyaz", "C) Koyu", "D) Gri"], "A", "Siyah ve kara anlamdaş (eş anlamlı) kelimelerdir."),
            ("'Ağır' sözcüğünün zıt anlamlısı aşağıdakilerden hangisidir?", ["A) Yavaş", "B) Hafif", "C) Kolay", "D) İnce"], "B", "Ağır nesnelerin karşıt durumu 'hafif'tir."),
            ("'Cevap' kelimesinin eş anlamlısı hangisidir?", ["A) Soru", "B) Yanıt", "C) Cümle", "D) Söz"], "B", "Cevap ve yanıt eş anlamlı sözcüklerdir."),
            ("'Zor' kelimesinin zıt anlamlısı hangisidir?", ["A) Güç", "B) Kolay", "C) Basitçe", "D) Sert"], "B", "Zor kelimesinin karşıtı kolaydır."),
            ("'Barış' sözcüğünün zıt anlamlısı hangisidir?", ["A) Savaş", "B) Sevgi", "C) Dostluk", "D) Huzur"], "A", "Barış sözcüğünün zıt anlamlısı savaştır."),
            ("'Doktor' sözcüğünün eş anlamlısı hangisidir?", ["A) Hemşire", "B) Hekim", "C) Hasta", "D) Eczacı"], "B", "Doktor ve hekim aynı anlama gelir."),
            ("'Dolu' bardağın zıt anlamlısı nedir?", ["A) Taşan", "B) Boş", "C) Yarım", "D) Kırık"], "B", "Dolu kelimesinin karşıtı boştur."),
            ("'Yaş' (ıslak) kelimesinin zıt anlamlısı hangisidir?", ["A) Kuru", "B) Nemli", "C) Sıcak", "D) Soğuk"], "A", "Islak/yaş durumun zıttı kurudur."),
            ("'Yıl' sözcüğünün eş anlamlısı hangisidir?", ["A) Ay", "B) Sene", "C) Gün", "D) Hafta"], "B", "Yıl ve sene eş anlamlıdır."),
            ("'Tembel' sözcüğünün zıt anlamlısı nedir?", ["A) Uykucu", "B) Çalışkan", "C) Yavaş", "D) Neşeli"], "B", "Tembel kelimesinin karşıtı çalışkandır."),
            ("'Kalp' sözcüğünün eş anlamlısı hangisidir?", ["A) Yürek", "B) Can", "C) Akıl", "D) Göğüs"], "A", "Kalp ve yürek eş anlamlıdır."),
            ("'Cesur' sözcüğünün zıt anlamlısı hangisidir?", ["A) Yiğit", "B) Korkak", "C) Güçlü", "D) Kahraman"], "B", "Cesur kelimesinin zıttı korkaktır.")
        ]
    elif "8-sinif-turkce-ozneler" in slug:
        raw_items = [
            ("'Kütüphanedeki eski kitaplar görevliler tarafından raflara dizildi.' cümlesindeki sözde özne aşağıdakilerden hangisidir?", ["A) Görevliler tarafından", "B) Raflara", "C) Kütüphanedeki eski kitaplar", "D) Görevliler"], "C", "'Dizildi' yüklemdir. Dizilen ne? 'Kütüphanedeki eski kitaplar' işi yapan değil işten etkilenen varlık olduğu için sözde öznedir."),
            ("Aşağıdaki cümlelerin hangisinde 'gizli özne' vardır?", ["A) Yağmur sabaha kadar dindi.", "B) Bu zorlu soruyu dakikalar içinde çözdü.", "C) Çocuklar bahçede neşeyle koşuyordu.", "D) Rüzgâr sertçe esiyordu."], "B", "'Çözdü' yüklemine 'Kim çözdü?' diye sorduğumuzda 'O' yanıtı alınır. Cümlede açıkça yazılmadığı için 'O' gizli öznedir."),
            ("'Sonbahar gelince sararan yapraklar birer birer döküldü.' cümlesinin öznesi aşağıdakilerden hangisidir?", ["A) Sonbahar", "B) Sararan yapraklar", "C) Birer birer", "D) Yapraklar"], "B", "Döküldü yüklemine 'Dökülen ne?' sorusu sorulduğunda sıfat tamlaması bölünemez: 'Sararan yapraklar' gerçek öznedir."),
            ("Aşağıdakilerin hangisinde özne bir 'isim tamlaması'ndan oluşmaktadır?", ["A) Kapının kolu dün aniden kırıldı.", "B) Çalışkan öğrenciler sınavı kazandı.", "C) Kırmızı araba hızla geçti.", "D) Yaşlı adam bankta dinleniyordu."], "A", "'Kırıldı' yüklem. Kırılan ne? 'Kapının kolu' (Belirtili isim tamlamasıdır). Diğer şıklardaki özneler sıfat tamlamasıdır."),
            ("Aşağıdaki cümlelerin hangisinde sözde özne kullanılmıştır?", ["A) Annem lezzetli bir pasta yaptı.", "B) Tören için salon süslendi.", "C) Ahmet yarın erkenden yola çıkacak.", "D) Kuşlar güneye doğru uçtu."], "B", "'Süslendi' edilgen fiildir. 'Süslenen ne?' -> 'Salon' sözde öznedir, süsleyen kişi cümlede belirtilmemiştir."),
            ("'Yıllardır görmediğim çocukluk arkadaşımı karşımda görünce çok sevindim.' cümlesinin öznesi nedir?", ["A) Çocukluk arkadaşım", "B) Gizli özne (Ben)", "C) Karşımda", "D) Gizli özne (O)"], "B", "'Sevindim' yükleminin sonundaki '-m' eki 1. tekil şahıstır. 'Kim sevindi?' -> 'Ben' (Gizli Özne)."),
            ("'Bahçedeki kuru dallar bahçıvan tarafından budandı.' cümlesindeki 'bahçıvan tarafından' ifadesi hangi özne çeşididir?", ["A) Gerçek özne", "B) Sözde özne", "C) Örtülü özne", "D) Gizli özne"], "C", "Edilgen fiilli cümlelerde 'tarafından' veya '-ce/-ca' ekiyle eylemi yapanın belirtilmesine 'örtülü özne' denir."),
            ("Aşağıdaki cümlelerin hangisinde özne açıklayıcısıyla birlikte verilmiştir (ara söz öznenin açıklayıcısıdır)?", ["A) Doğup büyüdüğüm şehri, İzmir'i, çok özledim.", "B) En sevdiğim yazar, Reşat Nuri, bu romanda insan sevgisini anlatır.", "C) Dün akşam, saat dokuzda, elektrikler kesildi.", "D) Ankara'ya, başkente, yarın gideceğiz."], "B", "'Anlatır' yüklem. Anlatan kim? 'En sevdiğim yazar'. Reşat Nuri iki virgül arasında öznenin açıklayıcısı olan ara sözdür."),
            ("'Kitap okumak, insanın ufkunu genişleten en değerli alışkanlıktır.' cümlesinin öznesi hangisidir?", ["A) Kitap", "B) Kitap okumak", "C) İnsanın ufku", "D) Değerli alışkanlık"], "B", "Yüklem: 'insanın ufkunu genişleten en değerli alışkanlıktır'. İnsanın ufkunu genişleten en değerli alışkanlık olan ne? 'Kitap okumak' (Fiilimsi grubudur, öznedir)."),
            ("Aşağıdaki cümlelerin hangisinde özne bir zamirden oluşmuştur?", ["A) Herkes bu kararı sevinçle karşıladı.", "B) Öğretmenimiz konuyu detaylıca anlattı.", "C) Yeni araba garaja çekildi.", "D) Sessizlik odaya hâkim oldu."], "A", "'Karşıladı' yüklem. Karşılayan kim? 'Herkes' (Belgisiz zamirdir)."),
            ("Aşağıdaki cümlelerin hangisinde özne bir sıfat tamlamasıdır?", ["A) Mavi gömlekli çocuk öne çıktı.", "B) Kitabın kapağı yırtılmıştı.", "C) Kapı çalındı.", "D) Biz dün sinemaya gittik."], "A", "'Öne çıktı' yüklem. Öne çıkan kim? 'Mavi gömlekli çocuk' (Sıfat tamlamasıdır)."),
            ("'Başarıya ulaşmak için düzenli ve sabırlı çalışmak şarttır.' cümlesinde özne nedir?", ["A) Başarıya ulaşmak için", "B) Şarttır", "C) Düzenli ve sabırlı çalışmak", "D) Sabırlı olmak"], "C", "'Şarttır' yüklem. Şart olan ne? 'Düzenli ve sabırlı çalışmak' (İsim-fiil grubu öznedir)."),
            ("'Köydeki eski değirmen yeniden çalıştırıldı.' cümlesi için aşağıdakilerden hangisi doğrudur?", ["A) Özne gizli öznedir.", "B) 'Köydeki eski değirmen' sözde öznedir.", "C) Cümlede özne bulunmamaktadır.", "D) 'Yeniden' gerçek öznedir."], "B", "'Çalıştırıldı' edilgen çatılıdır. Çalıştırılan ne? 'Köydeki eski değirmen' sözde öznedir."),
            ("Cümle ögeleri bulunurken izlenmesi gereken doğru sıra hangisidir?", ["A) Özne - Yüklem - Nesne - Tümleç", "B) Yüklem - Özne - Nesne - Tümleçler", "C) Yüklem - Nesne - Özne - Tümleç", "D) Tümleç - Özne - Yüklem - Nesne"], "B", "Doğru sıra Y-Ö-N-T formülüdür: Önce Yüklem, ardından Özne, sonra Nesne ve Tümleçler bulunur."),
            ("'Kar yağışı nedeniyle köy yolları ulaşıma kapandı.' cümlesinin öznesi hangisidir?", ["A) Kar yağışı", "B) Köy yolları", "C) Ulaşıma", "D) Kar yağışı nedeniyle"], "B", "'Kapandı' yüklem. Kapanan ne? 'Köy yolları' (Öznedir). Kar yağışı nedeniyle ise zarf tümlecidir."),
            ("'Gözleri pırıl pırıl parlayan küçük kız bize gülümsedi.' cümlesinin öznesi kaç sözcükten oluşmuştur?", ["A) 2", "B) 4", "C) 5", "D) 6"], "C", "'Gülümsedi' yüklem. Gülümseyen kim? 'Gözleri pırıl pırıl parlayan küçük kız' (5 sözcükten oluşan sıfat fiil grubudur)."),
            ("Aşağıdaki cümlelerin hangisinde özne ortaklığı vardır (bağlı veya sıralı cümle)?", ["A) Ali kitap okudu, Veli ise müzik dinledi.", "B) Annem erkenden kalktı ve bize kahvaltı hazırladı.", "C) Yağmur durdu, güneş açtı.", "D) Zil çaldı, öğrenciler sınıfa girdi."], "B", "'Kalktı' ve 'hazırladı' eylemlerinin her ikisini de yapan 'Annem'dir. Özne ortaktır."),
            ("'Bize doğru gelen yabancıyı hemen tanıdık.' cümlesinin öznesi hangisidir?", ["A) Bize doğru gelen yabancı", "B) Yabancı", "C) Gizli özne (Biz)", "D) Hemen"], "C", "'Tanıdık' yüklem. Kim tanıdı? 'Biz' (Gizli Özne). 'Bize doğru gelen yabancıyı' ise belirtili nesnedir."),
            ("'Okul müdürümüz ve öğretmenler salonda toplandı.' cümlesinin öznesi nedir?", ["A) Okul müdürümüz", "B) Öğretmenler", "C) Okul müdürümüz ve öğretmenler", "D) Salonda"], "C", "'Toplandı' yüklem. Toplanan kim? 'Okul müdürümüz ve öğretmenler' bağlaçla bağlanmış ortak öznedir."),
            ("Aşağıdakilerin hangisinde yüklem isim soylu olup özne bir fiilimsidir?", ["A) Hayattaki en hakiki mürşit ilimdir.", "B) En büyük zenginlik, kanaatkâr olmaktır.", "C) Kitap okumak ruhu dinlendirir.", "D) Başarı, çok çalışmanın meyvesidir."], "B", "'Kanaatkâr olmaktır' isim-fiille kurulmuş yüklemdir. Kanaatkâr olmak olan ne? 'En büyük zenginlik'. Cümlede özne ile yüklem yer değiştirilebilir.")
        ]
    else: # 8-sinif-turkce-fiilimsiler
        raw_items = [
            ("Aşağıdaki cümlelerin hangisinde bir 'isim-fiil (mastar)' kullanılmıştır?", ["A) Koşan çocuk aniden durdu.", "B) Kitap okumak en güzel alışkanlıktır.", "C) Gülen gözlerle bize baktı.", "D) Eve varınca beni ara."], "B", "'Okumak' sözcüğü -mak isim-fiil ekini almıştır. İsim-fiil ekleri: -ma, -ış, -mak (Mayışmak)."),
            ("Aşağıdakilerin hangisinde altı çizili sözcük fiilimsi özelliğini yitirerek 'kalıcı isim' olmuştur?", ["A) Tarlaya tohum ekmek için gitti.", "B) Akşam yemeğinde lezzetli bir sarma yedik.", "C) Ders çalışmaya erkenden başladı.", "D) Ağlamaktan gözleri kızarmıştı."], "B", "'Sarma' sözcüğü bir yemek adı haline gelerek kalıcı isim olmuştur, artık fiilimsi değildir."),
            ("Aşağıdaki cümlelerin hangisinde 'sıfat-fiil (ortaç)' kullanılmıştır?", ["A) Tanıdık simalar salonda toplanmıştı.", "B) Yağmur dindiğinde dışarı çıktık.", "C) Gülüşü herkesi etkiledi.", "D) Konuşmak için izin istedi."], "A", "'Tanıdık' sözcüğü -dık sıfat-fiil ekini almış ve 'simayı' nitelemiştir. (Anası mezar dikecekmiş)."),
            ("'Ders zili çalınca öğrenciler sınıfa koştu.' cümlesindeki fiilimsinin türü nedir?", ["A) İsim-fiil", "B) Sıfat-fiil", "C) Zarf-fiil (Bağ-fiil)", "D) Çekimli fiil"], "C", "'Çalınca' sözcüğü -ınca zarf-fiil ekini almıştır ve cümleye zaman anlamı katmıştır."),
            ("Aşağıdaki cümlelerin hangisinde birden fazla fiilimsi kullanılmıştır?", ["A) Yürüyerek gelen arkadaşını görünce gülümsedi.", "B) Sadece kitap okumayı seviyordu.", "C) Dün bize gelen misafirler erkenden gitti.", "D) Yağmur dinince yola koyulduk."], "A", "'Yürüyerek' (zarf-fiil) ve 'gelen' (sıfat-fiil) ve 'görünce' (zarf-fiil) olmak üzere üç fiilimsi vardır."),
            ("Aşağıdaki eklerden hangisi bir 'zarf-fiil' eki değildir?", ["A) -ken", "B) -erek", "C) -ası", "D) -dıkça"], "C", "'-ası / -esi' eki sıfat-fiil ekidir (Anası mezar dikecekmiş)."),
            ("Aşağıdaki cümlelerin hangisinde adlaşmış sıfat-fiil vardır?", ["A) Gelen gideni aratır.", "B) Çalışan çocuk sınavı geçer.", "C) Kırılan vazoyu çöpe attı.", "D) Okunan kitaplar rafa kondu."], "A", "'Gelen kişi' yerine 'gelen', 'giden insanı' yerine 'gideni' denilmiş; nitelediği isim düşerek adlaşmış sıfat-fiil olmuştur."),
            ("'Gözlerimin içine baka baka yalan söyledi.' cümlesindeki altı çizili fiilimsinin türü nedir?", ["A) İsim-fiil", "B) Sıfat-fiil", "C) Zarf-fiil", "D) Ek-fiil"], "C", "'-e ... -e' (baka baka) durum bildiren bir zarf-fiildir."),
            ("Aşağıdakilerin hangisinde '-miş' eki diğerlerinden farklı bir görevde kullanılmıştır?", ["A) Sararmış yapraklar yollara döküldü.", "B) Kurumuş dallar bahçeden toplandı.", "C) Yıllardır görmediğim köyüm çok değişmiş.", "D) Pişmiş aşa su katılmaz."], "C", "C şıkkındaki 'değişmiş' çekimli fiildir (öğrenilen geçmiş zaman kipi). Diğerlerindeki '-miş' ise sıfat-fiil ekidir."),
            ("Aşağıdaki cümlelerin hangisinde fiilimsi yoktur?", ["A) Yola çıkmadan önce arabayı kontrol etti.", "B) Konuşanları tahtaya tek tek yazdı.", "C) Dün akşam geç vakte kadar televizyon izledi.", "D) Koşarak yanımıza geldi."], "C", "C seçeneğinde herhangi bir isim-fiil, sıfat-fiil veya zarf-fiil bulunmamaktadır."),
            ("Aşağıdakilerden hangisi bir isim-fiil eki değildir?", ["A) -ma", "B) -ış", "C) -mak", "D) -en"], "D", "'-en' sıfat-fiil ekidir (Örn: gelen yolcu). İsim-fiil ekleri ise -ma, -ış, -mak ekleridir."),
            ("'Çıkış kapısı kilitlenmişti.' cümlesindeki 'çıkış' sözcüğü için hangisi söylenebilir?", ["A) Sıfat-fiildir.", "B) Zarf-fiildir.", "C) Kalıcı isimdir.", "D) Çekimli fiildir."], "C", "'Çıkış' bir yerin adı haline geldiği için kalıcı isimdir."),
            ("Aşağıdaki cümlelerin hangisinde zarf-fiil cümleye 'durum' anlamı katmıştır?", ["A) Eve varır varmaz uyudu.", "B) Çocuk gülerek içeri girdi.", "C) Akşam olunca rüzgâr çıktı.", "D) Sen gideli buralar sessizleşti."], "B", "'Nasıl içeri girdi?' sorusuna 'gülerek' yanıt verir; durum zarf-fiilidir."),
            ("'Gelecek yıl LGS sınavına gireceğiz.' cümlesindeki 'gelecek' sözcüğü hangi türdedir?", ["A) İsim-fiil", "B) Sıfat-fiil", "C) Zarf-fiil", "D) İsim"], "B", "'Gelecek yıl' tamlamasında 'gelecek' sıfat-fiildir (yıl ismini nitelemiştir)."),
            ("Aşağıdaki cümlelerin hangisinde üç fiilimsi türü de (isim-fiil, sıfat-fiil, zarf-fiil) bir arada kullanılmıştır?", ["A) Yaşamak, öğrenmek ve bilmek güzeldir.", "B) Gülümseyerek içeri giren adam konuşmaya başladı.", "C) Yürüyen çocuk koşmaya başladı.", "D) Eve varınca dinlendi."], "B", "'Gülümseyerek' (zarf-fiil), 'giren' (sıfat-fiil), 'konuşmaya' (isim-fiil). Üçü de mevcuttur."),
            ("Fiilimsiler hakkında aşağıda verilen bilgilerden hangisi yanlıştır?", ["A) Fiil kök veya gövdelerinden türerler.", "B) Cümlede isim, sıfat veya zarf görevinde bulunurlar.", "C) Fiil çekim eklerini (kip ve kişi eklerini) doğrudan alırlar.", "D) Yan cümlecik kurarlar."], "C", "Fiilimsiler kip ve kişi eklerini doğrudan alamazlar; alırlarsa çekimli fiil olurlar."),
            ("'Akacak kan damarda durmaz.' atasözündeki sıfat-fiil hangisidir?", ["A) Akacak", "B) Kan", "C) Damarda", "D) Durmaz"], "A", "'Akacak' sözcüğü -acak ekiyle kan ismini nitelemiştir, sıfat-fiildir."),
            ("Aşağıdaki cümlelerin hangisinde '-me / -ma' eki olumsuzluk eki olarak kullanılmıştır?", ["A) Kitap okumayı çok seviyorum.", "B) Bu soğuk havada dışarı çıkma.", "C) Yüzme sporu vücudu geliştirir.", "D) Çocuğun gülüşü ve bakışı harikaydı."], "B", "B seçeneğindeki 'çıkma' emrin olumsuzudur (olumsuzluk eki). Diğerleri ise isim-fiil ekidir."),
            ("'Bebek ağlaya ağlaya annesini aradı.' cümlesindeki zarf-fiil hangisidir?", ["A) Bebek", "B) Ağlaya ağlaya", "C) Annesini", "D) Aradı"], "B", "'-a ... -a' kalıbı ile türemiş 'ağlaya ağlaya' zarf-fiildir."),
            ("Bir cümlede kaç tane fiilimsi varsa o kadar ne bulunur?", ["A) Yüklem", "B) Yan cümlecik", "C) Temel cümle", "D) Özne"], "B", "Türkçede bir cümledeki yan cümlecik sayısı, o cümledeki fiilimsi sayısına eşittir.")
        ]

    questions = []
    for i, (q_text, opts, corr, sol) in enumerate(raw_items, 1):
        questions.append({
            "num": i,
            "text": q_text,
            "options": opts,
            "correct": corr,
            "solution": sol
        })
    return questions
