#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
MEB Sosyal Etkinlikler Yönetmeliği Standartlarında
Kusursuz, Hatasız ve Zengin Kulüp Belgeleri Oluşturucu
"""

import json
import os

CLUBS_DEFINITIONS = [
    {
        "id": "kizilay",
        "name": "Kızılay Kulübü",
        "short_name": "Kızılay",
        "purpose": "Öğrencilere yardımlaşma, dayanışma, karşılıksız iyilik yapma, ilk yardım ve afet bilincini aşılamak; Türk Kızılayının tarihini, ilkelerini ve toplumdaki hayati rolünü kavratmak.",
        "scope": "Kızılay Haftası etkinlikleri, kan bağışı farkındalık seminerleri, acil durum ve ilk yardım çantası eğitimleri, okul içi ve çevresindeki ihtiyaç sahibi öğrencilere yönelik sosyal sorumluluk ve yardım kampanyaları.",
        "topics": "Kızılay Haftası (29 Ekim - 4 Kasım), İlk Yardım Eğitimi, Kan Bağışı Farkındalığı, Afetlerde İnsani Yardım, Merhamet ve Yardımlaşma Kültürü.",
        "community_service": "Okul genelinde 'Kardeş Eli' yardım kolisi kampanyası düzenlenmesi ve toplanan temel ihtiyaç malzemelerinin Türk Kızılay şubesine teslim edilmesi.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp genel kurulunun toplanması, divanın oluşturulması; yönetim ve denetim kurullarının seçimi; yıllık çalışma planının hazırlanarak okul müdürlüğünün onayına sunulması; Sosyal Etkinlik Modülüne öğrenci kayıtlarının girilmesi."),
            ("EKİM", "Kulüp panosunun hazırlanması; 29 Ekim - 4 Kasım Kızılay Haftası kutlama hazırlıkları; Kızılayın kuruluş felsefesi ve ilkeleri hakkında bilgilendirme sunumunun yapılması."),
            ("KASIM", "Kızılay Haftası okul programının icra edilmesi; kan bağışının hayati önemi hakkında okul bülteni ve broşür dağıtımı; 10 Kasım Atatürk'ü Anma etkinliklerine katılım."),
            ("ARALIK", "Temel ilk yardım bilinci atölyesi düzenlenmesi; acil durumlarda yapılacak ilk müdahaleler ve 112 Acil Çağrı Merkezi kullanımının anlatılması."),
            ("OCAK", "1. Dönem kulüp faaliyetlerinin değerlendirilmesi; yapılan çalışmaların karar defterine işlenmesi; ara dönem değerlendirme raporunun hazırlanması."),
            ("ŞUBAT", "2. Dönem başı kulüp kurulunun toplanması; 2. dönem çalışma takviminin güncellenmesi; bahar dönemi toplum hizmeti projesinin kararlaştırılması."),
            ("MART", "1-7 Mart Deprem Haftası münasebetiyle Kızılayın afette beslenme ve barınma hizmetlerinin incelenmesi; okul içi 'Bir Koli İyilik' yardım kampanyasının başlatılması."),
            ("NİSAN", "23 Nisan Ulusal Egemenlik ve Çocuk Bayramı kutlamalarında kulüp standı açılması; çocuklara yönelik ilk yardım ve afet farkındalık oyunları oynatılması."),
            ("MAYIS", "Toplanan yardım malzemelerinin Türk Kızılayı yetkililerine tutanakla teslim edilmesi; Türk Kızılayı temsilcisi veya gönüllüsünün okula davet edilerek söyleşi yapılması."),
            ("HAZİRAN", "Yıl boyu yapılan kulüp etkinliklerinin raporlanması; Sosyal Etkinlik Modülü verilerinin tamamlanması; Yıl Sonu Faaliyet Raporunun hazırlanarak okul idaresine teslimi.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp kuruluşu gerçekleştirildi, yönetim kurulu seçildi, Kızılay panosu düzenlendi ve yıllık çalışma planı okul idaresine onaylatıldı."),
            ("KASIM - ARALIK", "Kızılay Haftası okul programı icra edildi, kan bağışı bilgilendirme broşürleri dağıtıldı ve temel ilk yardım farkındalık semineri verildi."),
            ("OCAK - ŞUBAT", "1. Dönem çalışmaları değerlendirildi, karar defteri işlendi ve 2. dönem toplum hizmeti yardım kampanyası planlandı."),
            ("MART - NİSAN", "Okul içi 'Bir Koli İyilik' yardım kampanyası yürütüldü, 23 Nisan şenliklerinde Kızılay tanıtım standı açıldı."),
            ("MAYIS - HAZİRAN", "Toplanan yardımlar Kızılay şubesine teslim edildi, yıl sonu faaliyet raporu düzenlendi ve e-Okul Sosyal Etkinlik Modülü tamamlandı.")
        ]
    },
    {
        "id": "hayvanlari-sevme-ve-koruma",
        "name": "Hayvanları Sevme ve Koruma Kulübü",
        "short_name": "Hayvanları Koruma",
        "purpose": "Öğrencilere hayvan sevgisi, doğadaki tüm canlıların yaşam hakkına saygı duyma, sokak hayvanlarını koruma ve besleme bilincini kazandırmak.",
        "scope": "4 Ekim Dünya Hayvanları Koruma Günü etkinlikleri, sokak hayvanları için besleme odakları oluşturma, hayvan barınağı ziyareti ve bilinçlendirme seminerleri.",
        "topics": "Can Dostlarımız, Sokak Hayvanlarının Yaşam Hakkı, Hayvan Barınakları, Kışın Kuşlara ve Kedilere Yuva Yapımı, Evcil Hayvan Bakımı ve Veterinerlik.",
        "community_service": "Okul bahçesine kuş evleri yerleştirilmesi ve sokaktaki sahipsiz kedi/köpekler için okul çevresinde kuru mama ve su odakları oluşturulması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp genel kurulu toplantısı; yönetim ve denetim kurullarının seçilmesi; yıllık planın hazırlanması; e-Okul Sosyal Etkinlik Modülü kayıtlarının tamamlanması."),
            ("EKİM", "4 Ekim Hayvanları Koruma Günü okul panosunun hazırlanması; öğrencilere sokak hayvanlarının yaşam mücadelesini anlatan belgesel gösterimi yapılması."),
            ("KASIM", "Geri dönüştürülebilir ahşap ve kutulardan kuş evleri ve kedi sığınakları atölyesi düzenlenmesi; okul bahçesindeki uygun ağaçlara kuş yuvalarının asılması."),
            ("ARALIK", "Kış aylarında sokak hayvanlarının su ve mama ihtiyacı için okul çapında 'Bir Kap Mama, Bir Kap Su' farkındalık kampanyasının başlatılması."),
            ("OCAK", "1. Dönem faaliyetlerinin gözden geçirilmesi, mama odaklarının kontrolü; 1. dönem çalışma raporunun hazırlanması."),
            ("ŞUBAT", "2. Dönem çalışma hedeflerinin belirlenmesi; belediye hayvan barınağı ziyareti için gerekli resmi izinlerin ve veli izin belgelerinin alınması."),
            ("MART", "Yerel yönetim veya sivil toplum kuruluşu hayvan bakımevine/barınağına teknik gezi düzenlenmesi; barınaktaki hayvanlara mama bağışı yapılması."),
            ("NİSAN", "23 Nisan şenlikleri kapsamında 'Doğa ve Hayvan Dostu Çocuklar' temalı resim ve şiir köşesi oluşturulması; veteriner hekim davet edilerek söyleşi yapılması."),
            ("MAYIS", "Sıcak yaz günlerinde sokak hayvanları için su kaplarının tazelenmesi projesinin yürütülmesi; okul genelinde fotoğraf sergisi açılması."),
            ("HAZİRAN", "Yıl sonu faaliyet raporunun hazırlanması, kulüp karar defterinin ve Sosyal Etkinlik Modülü kayıtlarının tamamlanarak idareye sunulması.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp yönetimi seçildi, 4 Ekim Hayvanları Koruma Günü panosu hazırlandı ve öğrencilere bilgilendirme yapıldı."),
            ("KASIM - ARALIK", "Geri dönüşüm malzemeleriyle kuş yuvaları yapılıp bahçeye yerleştirildi, kış mevsimi mama kampanyası başlatıldı."),
            ("OCAK - ŞUBAT", "1. Dönem faaliyetleri değerlendirildi, sokak hayvanları besleme odakları denetlendi ve barınak ziyareti planlandı."),
            ("MART - NİSAN", "Belediye hayvan barınağı ziyaret edilerek mama bağışı yapıldı, veteriner hekim söyleşisi organize edildi."),
            ("MAYIS - HAZİRAN", "Yaz dönemi su kapları projesi yürütüldü, yıl sonu faaliyet raporu düzenlendi ve kulüp dosyası teslim edildi.")
        ]
    },
    {
        "id": "halk-oyunlari",
        "name": "Halk Oyunları Kulübü",
        "short_name": "Halk Oyunları",
        "purpose": "Öğrencilere Türk halk danslarının zenginliğini tanıtmak; ritim, estetik ve beden koordinasyonunu geliştirmek; kültürel değerlerimize sahip çıkma bilinci aşılamak.",
        "scope": "Yöresel halk dansları (Zeybek, Halay, Horon, Teke, Bar vb.) figür eğitimleri, milli bayramlarda koreografi gösterileri ve geleneksel giysilerin tanıtımı.",
        "topics": "Kültürel Mirasımız Halk Dansları, Ritim ve Denge, Geleneksel Kostümler ve Müzikler, Sahne Disiplini ve Ekip Uyumu.",
        "community_service": "Özel günlerde huzurevleri veya kardeş okullarda halk oyunları gösterisi sergileyerek kültürel paylaşımda bulunulması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp genel kurulunun toplanması; yönetim ve denetleme kurullarının belirlenmesi; dans ekiplerinin ritim ve yetenek taramalarının yapılması."),
            ("EKİM", "Çalışılacak yörenin (Zeybek, Halay, Horon vb.) tespiti; temel duruş, adım ve ritim çalışmalarına başlanması; 29 Ekim Cumhuriyet Bayramı hazırlığı."),
            ("KASIM", "Halk oyunlarında müzik ve ritim uyumu çalışmaları; 10 Kasım Atatürk'ü Anma ve 24 Kasım Öğretmenler Günü için özel gösteri hazırlıkları."),
            ("ARALIK", "Yöresel oyunların ana figür ve dönüşlerinin çalışılması; ekip ruhu ve sahne düzeni eğitimlerinin verilmesi."),
            ("OCAK", "1. Dönem koreografi ilerleme durumunun tespiti; 1. dönem sonu kulüp değerlendirme raporunun tanzim edilmesi."),
            ("ŞUBAT", "2. Dönem çalışmalarının başlatılması; milli bayramlar için kostüm, müzik ve aksesuar planlamalarının yapılması."),
            ("MART", "18 Mart Çanakkale Zaferi anısına kahramanlık temalı halk dansları çalışması; sahne geçişleri ve koordinasyon provaları."),
            ("NİSAN", "23 Nisan Ulusal Egemenlik ve Çocuk Bayramı kutlama törenlerinde okul ekibinin sahne alması; halk oyunları okul gösterisinin başarıyla sunulması."),
            ("MAYIS", "Yıl sonu şenlikleri ve okul kermesinde kültürel halk oyunları gösterisi yapılması; geleneksel giysilerin sergilenmesi."),
            ("HAZİRAN", "Yıl sonu faaliyet raporunun düzenlenmesi; e-Okul Sosyal Etkinlik Modülüne öğrencilerin gösteri belgelerinin işlenmesi ve dosyanın teslimi.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp kurulları seçildi, dans yöresi belirlendi, ritim taramaları yapılarak temel adım çalışmalarına başlandı."),
            ("KASIM - ARALIK", "Temel figürler tamamlandı, koreografi kurgusu yapıldı ve sahne intizamı provaları gerçekleştirildi."),
            ("OCAK - ŞUBAT", "1. Dönem çalışmaları değerlendirildi, 23 Nisan gösteri müziği ve yöresel kostüm detayları kesinleştirildi."),
            ("MART - NİSAN", "Genel provalar tamamlandı, 23 Nisan kutlama programında okul halk oyunları ekibi başarıyla sahne aldı."),
            ("MAYIS - HAZİRAN", "Yıl sonu kültür şenliği gösterisi icra edildi, katılım belgeleri düzenlendi ve faaliyet raporu idareye teslim edildi.")
        ]
    },
    {
        "id": "gorsel-sanatlar",
        "name": "Görsel Sanatlar Kulübü",
        "short_name": "Görsel Sanatlar",
        "purpose": "Öğrencilerin estetik duyarlılık, sanatsal hayal gücü ve yaratıcılıklarını geliştirmek; farklı görsel sanat tekniklerini (karakalem, suluboya, akrilik, ebru, kolaj) deneyimlemelerini sağlamak.",
        "scope": "Resim atölyeleri, belirli gün ve haftalar konulu resim yarışmaları, okul koridorlarının estetik düzenlenmesi ve geleneksel yıl sonu resim sergisi.",
        "topics": "Renk Bilgisi, Perspektif, Ebru Sanatı, Karakalem Gölgelendirme, Türk Resim Sanatı Ustaları, Sergi Tasarımı ve Estetik.",
        "community_service": "Okulun veya bir kardeş köy okulunun kütüphane / ana sınıfı duvarlarına eğitici ve renkli sanatsal duvar resimleri (mural) çizilmesi.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp kurulunun toplanması, yönetim kurulunun seçimi; atölye malzemelerinin tespiti ve yıllık çalışma planının onaylatılması."),
            ("EKİM", "Cumhuriyet ve Atatürk temalı afiş ve kompozisyon çalışmaları; okul panosunun sanatsal görsel materyallerle düzenlenmesi."),
            ("KASIM", "10 Kasım Atatürk temalı karakalem çalışmaları; 24 Kasım Öğretmenler Günü için tebrik kartı ve portre tasarım atölyesi."),
            ("ARALIK", "Geleneksel Türk sanatlarından Ebru ve Hat sanatı tanıtım atölyesi; öğrencilerin ebru teknesi başında uygulama yapması."),
            ("OCAK", "1. Dönem üretilen sanatsal çalışmaların tasnifi ve arşivlenmesi; 1. dönem faaliyet raporunun hazırlanması."),
            ("ŞUBAT", "2. Dönem hedeflerinin belirlenmesi; yıl sonu büyük okul sergisinin temasının ve yerleşim planının kararlaştırılması."),
            ("MART", "Çanakkale Zaferi ve Bahar temalı tuval üzerine akrilik boya çalışmaları; renk ve doku teknikleri üzerine uygulamalar."),
            ("NİSAN", "23 Nisan Ulusal Egemenlik ve Çocuk Bayramı için 'Dünya Çocukları ve Barış' temalı kolaj ve pastel boya çalışmaları."),
            ("MAYIS", "Geleneksel Yıl Sonu Resim ve Görsel Sanatlar Sergisinin okul fuayesinde açılması; veli ve öğrencilerin beğenisine sunulması."),
            ("HAZİRAN", "Sergi sonrası eserlerin sahiplerine teslimi; yıl sonu faaliyet raporunun hazırlanması; Sosyal Etkinlik Modülü veri girişlerinin yapılması.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp kuruldu, yönetim belirlendi, Cumhuriyet Bayramı resim ve afiş çalışmaları yapılarak panoda sergilendi."),
            ("KASIM - ARALIK", "Karakalem portre ve geleneksel ebru sanatı atölyeleri düzenlendi, öğrencilerin özgün çalışmaları arşivlendi."),
            ("OCAK - ŞUBAT", "1. Dönem değerlendirildi, yıl sonu sergi teması 'Doğa ve İnsan' olarak belirlenip tuval çalışmalarına geçildi."),
            ("MART - NİSAN", "Çanakkale ve 23 Nisan temalı resimler üretildi, sergilenecek eserlerin paspartu ve çerçeveleme hazırlıkları yapıldı."),
            ("MAYIS - HAZİRAN", "Geleneksel Yıl Sonu Görsel Sanatlar Sergisi başarıyla açıldı, faaliyet raporu tamamlanıp idareye sunuldu.")
        ]
    },
    {
        "id": "gezi-tanitma-ve-turizm",
        "name": "Gezi, Tanıtma ve Turizm Kulübü",
        "short_name": "Gezi ve Turizm",
        "purpose": "Öğrencilere ülkemizin tarihi, coğrafi, doğal ve kültürel zenginliklerini tanıtmak; seyahat kültürü, gezi disiplini, çevreye saygı ve turizm bilincini kazandırmak.",
        "scope": "Tarihi mekan, müze ve ören yeri gezileri; Turizm Haftası etkinlikleri; gezi gözlem bültenleri ve tanıtım panoları.",
        "topics": "Kültür Turizmi, UNESCO Dünya Mirası Alanlarımız, Müze Eğitimi, Gezi Güvenliği ve Protokolü, Eko-Turizm ve Doğa Yürüyüşleri.",
        "community_service": "Bulunulan şehrin tarihi ve turistik değerlerini anlatan dijital şehir tanıtım rehberi hazırlanarak okul web sitesinde yayımlanması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp genel kurulu, yönetim seçimi, yıllık planın MEB Gezi Yönergesi doğrultusunda hazırlanıp okul müdürlüğüne sunulması."),
            ("EKİM", "Cumhuriyetimizin kuruluş mekanları (Ankara / Atatürk Evleri / Müzeler) konulu okul panosunun düzenlenmesi."),
            ("KASIM", "Şehirdeki bir arkeoloji veya etnografya müzesine günübirlik eğitim gezisi düzenlenmesi; müze içi rehberli gözlem çalışması."),
            ("ARALIK", "UNESCO Dünya Mirası listesindeki Türkiye varlıklarını (Kapadokya, Pamukkale, Efes vb.) tanıtan görsel sunum yapılması."),
            ("OCAK", "1. Dönem düzenlenen gezilerin değerlendirilmesi, gezi fotoğrafları bülteninin hazırlanması; 1. dönem raporunun yazılması."),
            ("ŞUBAT", "2. Dönem gezi takviminin güncellenmesi; bahar dönemi tarihi / doğal alan gezisi için resmi onay ve veli izin işlemlerinin başlatılması."),
            ("MART", "18 Mart Çanakkale Şehitlikleri ve Milli Mücadele cephelerinin sanal tur uygulamaları ile sınıflarda tanıtılması."),
            ("NİSAN", "15-22 Nisan Turizm Haftası kutlama programının icra edilmesi; okul içi 'Gezgin Gözüyle Türkiye' fotoğraf köşesinin kurulması."),
            ("MAYIS", "Bahar doğa ve kültür gezisinin (tarihi kent / milli park) gerçekleştirilmesi; öğrencilerin gezi raporlarını kaleme alması."),
            ("HAZİRAN", "Tüm gezi evraklarının arşivlenmesi; yıl sonu faaliyet raporunun hazırlanması; e-Okul Sosyal Etkinlik Modülü kayıtlarının tamamlanması.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp yönetimi seçildi, yıllık gezi planı hazırlandı, Cumhuriyet mekanları tanıtım panosu düzenlendi."),
            ("KASIM - ARALIK", "Şehir müzesine eğitim gezisi gerçekleştirildi, UNESCO miras alanları konulu bilgilendirme sunumu yapıldı."),
            ("OCAK - ŞUBAT", "1. Dönem gezileri değerlendirildi, bahar dönemi kültür ve doğa gezisinin resmi izin süreçleri tamamlandı."),
            ("MART - NİSAN", "Turizm Haftası kutlandı, Çanakkale sanal turu sınıflarda izletildi, fotoğraf sergisi açıldı."),
            ("MAYIS - HAZİRAN", "Bahar dönemi kültür gezisi başarıyla icra edildi, gezi raporları dosyalandı ve faaliyet raporu idareye teslim edildi.")
        ]
    },
    {
        "id": "geri-donusum-ve-sifir-atik",
        "name": "Geri Dönüşüm ve Sıfır Atık Kulübü",
        "short_name": "Sıfır Atık",
        "purpose": "Öğrencilere Sıfır Atık felsefesini benimsetmek; israfı önleme, doğal kaynakları verimli kullanma, atıkların kaynağında ayrıştırılması ve geri dönüşüm bilincini aşılamak.",
        "scope": "Atık pil, mavi kapak, elektronik atık, kağıt ve plastik toplama kampanyaları; kompost üretimi, ileri dönüşüm atölyeleri ve çevre denetimleri.",
        "topics": "Sıfır Atık Hiyerarşisi, Kaynağında Ayrıştırma, Kompost Gübre, İleri Dönüşüm (Upcycling), Plastik Kirliliği ile Mücadele.",
        "community_service": "Okulda toplanan geri dönüştürülebilir kağıt ve plastiklerin geri dönüşüm tesislerine gönderilerek elde edilen gelirle okul kütüphanesine kitap alınması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp genel kurulu, yönetim kurulu seçimi; sınıflara ve koridorlara 4'lü sıfır atık kutularının yerleşim planının yapılması."),
            ("EKİM", "Sıfır Atık ve İsrafı Önleme temalı okul panosu; sınıflarda kağıt, plastik, cam ve metal ayrıştırma kuralları bilgilendirmesi."),
            ("KASIM", "Atık Pil Toplama Kampanyasının başlatılması (TAP Derneği iş birliğiyle); en çok pil toplayan sınıfa ödül duyurusu yapılması."),
            ("ARALIK", "'Atıktan Sanata' ileri dönüşüm atölyesi; plastik şişe ve karton kutulardan kalemlik, saksı ve oyuncak tasarlama etkinliği."),
            ("OCAK", "1. Dönem toplanan atık miktarlarının (kg) tartılarak okul panosunda ilan edilmesi; 1. dönem faaliyet raporunun hazırlanması."),
            ("ŞUBAT", "2. Dönem çalışmaları; organik atıklardan (meyve kabukları, çay posası) okul bahçesi için kompost yapım atölyesinin kurulması."),
            ("MART", "18 Mart ve Küresel Geri Dönüşüm Günü etkinlikleri; okul kantininde tek kullanımlık plastik kullanımının azaltılması kampanyası."),
            ("NİSAN", "23 Nisan Çocuk Şenliğinde 'Geri Dönüşüm Tasarım Sergisi' açılması; atık malzemelerden üretilen kostüm ve eşyaların sergilenmesi."),
            ("MAYIS", "Toplanan atık pillerin ve kapakların ilgili kurumlara teslimi; en çevreci sınıfın ödüllendirilmesi töreni."),
            ("HAZİRAN", "Yıllık geri dönüşüm istatistiklerinin çıkarılması (kurtarılan ağaç sayısı vb.); faaliyet raporunun düzenlenip idareye teslimi.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp kuruldu, koridorlara 4'lü sıfır atık kutuları yerleştirildi, sınıflarda ayrıştırma eğitimi verildi."),
            ("KASIM - ARALIK", "Atık Pil Toplama Kampanyası başlatıldı, 'Atıktan Sanata' ileri dönüşüm atölyesi gerçekleştirildi."),
            ("OCAK - ŞUBAT", "1. Dönem toplanan atık miktarları tartılıp duyuruldu, okul bahçesinde kompost üretim süreci başlatıldı."),
            ("MART - NİSAN", "Tek kullanımlık plastik farkındalığı yapıldı, 23 Nisan şenliğinde Geri Dönüşüm Tasarım Sergisi açıldı."),
            ("MAYIS - HAZİRAN", "Piller ve kapaklar teslim edildi, çevre şampiyonu sınıf ödüllendirildi, yıl sonu raporu idareye sunuldu.")
        ]
    },
    {
        "id": "etwinning",
        "name": "eTwinning Kulübü",
        "short_name": "eTwinning",
        "purpose": "Öğrencilerin Avrupa ve Türkiye'deki akranlarıyla çevrim içi projeler üretmelerini sağlamak; yabancı dil, dijital okuryazarlık, takım çalışması ve kültürlerarası diyalog becerilerini artırmak.",
        "scope": "TwinSpace platformu kullanımı, web 2.0/3.0 araçları eğitimi, ortak okullarla çevrim içi webinarlar, işbirlikçi ürün oluşturma ve Ulusal Kalite Etiketi hazırlıkları.",
        "topics": "Avrupa Okul Ortaklıkları, Web 2.0 Araçları (Canva, Padlet, Kahoot, Genially), Dijital Vatandaşlık, Güvenli İnternet (eSafety), Kültürlerarası Etkileşim.",
        "community_service": "Kardeş Avrupa veya köy okullarıyla ortaklaşa 'Kültür Sandığı' projesi yürüterek kültürel miras tanıtım materyallerinin paylaşılması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp kuruluşu, yönetim kurulunun seçimi; eTwinning ve ESEP platformu tanıtımı; yıllık çalışma planının hazırlanması."),
            ("EKİM", "Proje ortaklarının belirlenmesi ve proje kurucu / ortaklık başvurusunun yapılması; TwinSpace öğrenci hesaplarının açılması."),
            ("KASIM", "Proje logosu ve afişi tasarlama yarışması (Canva vb. araçlarla); uluslararası anketle projenin ortak logosunun seçilmesi."),
            ("ARALIK", "Ortak okullara yeni yıl tebrik kartları gönderilmesi veya dijital Padlet duvarında kültür tanıtım mesajlarının paylaşılması."),
            ("OCAK", "1. Dönem proje çıktılarının TwinSpace sayfalarına yüklenmesi; telif hakları ve eSafety kurallarının denetlenmesi; 1. dönem raporu."),
            ("ŞUBAT", "Güvenli İnternet Günü (Safer Internet Day) etkinlikleri; ortak okullarla çevrim içi öğrenci tanışma webinarının gerçekleştirilmesi."),
            ("MART", "İşbirlikçi ortak ürün (e-kitap, ortak şarkı veya çok dilli hikaye) yazım çalışmalarının yürütülmesi."),
            ("NİSAN", "23 Nisan ve 9 Mayıs eTwinning Günü hazırlıkları; okul panosunda projenin ara değerlendirmelerinin ve fotoğraflarının sergilenmesi."),
            ("MAYIS", "9 Mayıs eTwinning Günü kutlamaları; proje final ürünlerinin sunumu; Ulusal Kalite Etiketi (Quality Label) başvuru dosyasının hazırlanması."),
            ("HAZİRAN", "Öğrenci katılım sertifikalarının dağıtılması; yıl sonu faaliyet raporunun hazırlanması; Sosyal Etkinlik Modülü kayıtlarının tamamlanması.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp organları seçildi, proje konusu belirlendi, TwinSpace öğrenci kayıtları ve eSafety izinleri tamamlandı."),
            ("KASIM - ARALIK", "Logo ve afiş tasarım yarışması yapıldı, ortak okullarla çevrim içi yeni yıl kültür paylaşımı gerçekleştirildi."),
            ("OCAK - ŞUBAT", "Güvenli İnternet Günü kutlandı, uluslararası ortak okullarla canlı öğrenci webinarı düzenlendi."),
            ("MART - NİSAN", "Ortak ürün olan çok dilli dijital hikaye kitabı yazıldı, 23 Nisan'da okul panosunda tanıtıldı."),
            ("MAYIS - HAZİRAN", "9 Mayıs eTwinning Günü kutlandı, Kalite Etiketi başvurusu yapıldı, katılım sertifikaları verilip rapor teslim edildi.")
        ]
    },
    {
        "id": "drama",
        "name": "Drama Kulübü",
        "short_name": "Drama",
        "purpose": "Öğrencilerin rol oynama, doğaçlama, empati kurma, diksiyon, beden dili ve kendini ifade edebilme becerilerini geliştirmek; tiyatro sanatını sevdirmek.",
        "scope": "Temel drama egzersizleri, pandomim, canlandırma, belirli günler ve haftalar için skeç hazırlıkları, 27 Mart Dünya Tiyatro Günü etkinlikleri ve yıl sonu oyunu sahnelenmesi.",
        "topics": "Doğaçlama, Diksiyon ve Nefes Teknikleri, Pandomim, Sahne Hareketi, Karakter Analizi, Tiyatro Tarihi ve Metin Yazımı.",
        "community_service": "Ana sınıfı ve ilkokul öğrencilerine yönelik masal canlandırması ve kukla tiyatrosu gösterisi sergilenmesi.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp genel kurulu, yönetim kurulu seçimi; yıllık planın hazırlanması; ses, nefes ve tanışma drama oyunlarının oynanması."),
            ("EKİM", "Temel drama teknikleri (buz kırıcı oyunlar, güven alıştırmaları, pandomim); 29 Ekim Cumhuriyet Bayramı oratoryo hazırlığı."),
            ("KASIM", "Duygu durum canlandırmaları ve rol oynama egzersizleri; 24 Kasım Öğretmenler Günü için kısa skeç sahnelenmesi."),
            ("ARALIK", "Yıl sonu tiyatro oyunu metninin seçilmesi; rol dağılımının yapılması ve masa başı metin okuma çalışmalarının başlatılması."),
            ("OCAK", "Metin ezber provaları; sahne giriş-çıkış ve mekan kullanımı çalışmalarının değerlendirilmesi; 1. dönem faaliyet raporu."),
            ("ŞUBAT", "2. Dönem prova takviminin başlatılması; dekor, kostüm ve ışık-ses gereksinimlerinin belirlenmesi."),
            ("MART", "27 Mart Dünya Tiyatro Günü kutlamaları; tiyatro bildirgesinin okunması ve okul genelinde skeç gösterisi sunulması."),
            ("NİSAN", "23 Nisan şenlikleri için çocuk tiyatrosu sahnelenmesi; genel kostümlü provaların sürdürülmesi."),
            ("MAYIS", "Yıl sonu tiyatro oyununun okul konferans salonunda veli, öğretmen ve öğrencilere sahnelenmesi; büyük alkış ve takdir."),
            ("HAZİRAN", "Tiyatro ekibine teşekkür belgelerinin verilmesi; dekor ve kostümlerin toplanması; faaliyet raporunun düzenlenip teslimi.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp kuruldu, beden ve diksiyon egzersizleri yapıldı, 29 Ekim Cumhuriyet oratoryosu sahnelendi."),
            ("KASIM - ARALIK", "Öğretmenler Günü skeci sunuldu, yıl sonu tiyatro oyunu belirlenip rol dağılımı yapıldı."),
            ("OCAK - ŞUBAT", "Metin okuma ve ezber provaları sürdürüldü, dekor-kostüm tasarımı planlandı ve 1. dönem değerlendirildi."),
            ("MART - NİSAN", "27 Mart Dünya Tiyatro Günü kutlandı, konferans salonunda kostümlü prova süreçleri başarıyla yürütüldü."),
            ("MAYIS - HAZİRAN", "Yıl sonu tiyatro oyunu büyük başarıyla sahnelendi, belgeler dağıtıldı ve faaliyet raporu okul idaresine teslim edildi.")
        ]
    },
    {
        "id": "cocuk-haklari",
        "name": "Çocuk Hakları Kulübü",
        "short_name": "Çocuk Hakları",
        "purpose": "Öğrencilere Birleşmiş Milletler Çocuk Haklarına Dair Sözleşme ile güvence altına alınan haklarını öğretmek; hak arama kültürü, adalet, eşitlik ve çocuk refahı bilinci kazandırmak.",
        "scope": "20 Kasım Dünya Çocuk Hakları Günü etkinlikleri, akran zorbalığıyla mücadele atölyeleri, çocuk hakları panoları, münazaralar ve anket çalışmaları.",
        "topics": "Yaşama ve Gelişme Hakkı, Eğitim Hakkı, Katılım ve Fikir Özgürlüğü, Şiddetten Korunma Hakkı, Oyun ve Dinlenme Hakkı.",
        "community_service": "Kardeş bir köy okulundaki ihtiyaç sahibi çocuklara kitap, kırtasiye ve oyuncak yardım kampanyası düzenlenmesi.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp kurulunun toplanması, yönetim ve denetim organlarının seçimi; yıllık planın hazırlanması ve onaylanması."),
            ("EKİM", "Çocuk Hakları Sözleşmesi maddelerinin incelenmesi; okul panosunun 'Haklarımı Biliyorum' başlığıyla düzenlenmesi."),
            ("KASIM", "20 Kasım Dünya Çocuk Hakları Günü okul programının icra edilmesi; çocuk hakları bildirgesinin sınıflarda okunması."),
            ("ARALIK", "Okul içi akran zorbalığı ve siber zorbalık farkındalık anketi düzenlenmesi; rehberlik servisiyle iş birliği içinde seminer yapılması."),
            ("OCAK", "1. Dönem etkinliklerinin değerlendirilmesi; anket sonuçlarının grafiklerle panoda sergilenmesi; 1. dönem raporu."),
            ("ŞUBAT", "2. Dönem çalışma planının gözden geçirilmesi; 'Çocukların Karar Alma Mekanizmalarına Katılımı' konulu çalıştay planlanması."),
            ("MART", "Okul idaresi ve okul temsilcisiyle 'Çocuk Gözüyle Okulumuz' toplantısı yapılması; öğrencilerin taleplerinin iletilmesi."),
            ("NİSAN", "23 Nisan Ulusal Egemenlik ve Çocuk Bayramı haftasında 'Dünya Çocukları Barış ve Adalet İstiyor' temalı bildiri yayımlanması."),
            ("MAYIS", "Kardeş okul çocuklarına yönelik kitap ve eğitici oyuncak kampanyasının tamamlanıp paketlerin ulaştırılması."),
            ("HAZİRAN", "Yıl boyu yapılan çalışmaların özetlenmesi; yıl sonu faaliyet raporunun hazırlanarak okul yönetimine sunulması.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp yönetimi seçildi, Çocuk Hakları Sözleşmesi incelendi ve bilgilendirme panosu hazırlandı."),
            ("KASIM - ARALIK", "20 Kasım Dünya Çocuk Hakları Günü kutlandı, akran zorbalığıyla mücadele semineri ve anketi düzenlendi."),
            ("OCAK - ŞUBAT", "1. Dönem değerlendirildi, anket bulguları panoda paylaşıldı ve 2. dönem öğrenci meclisi çalıştayı planlandı."),
            ("MART - NİSAN", "Okul idaresiyle öğrenci hak ve talepleri toplantısı yapıldı, 23 Nisan Çocuk Bildirisi okulda yayımlandı."),
            ("MAYIS - HAZİRAN", "Kardeş köy okuluna oyuncak ve kitap yardımı ulaştırıldı, yıl sonu faaliyet raporu düzenlenip idareye teslim edildi.")
        ]
    },
    {
        "id": "demokrasi-insan-haklari",
        "name": "Demokrasi, İnsan Hakları ve Yurttaşlık Kulübü",
        "short_name": "Demokrasi ve İnsan Hakları",
        "purpose": "Öğrencilere evrensel insan hakları, demokrasi kültürü, çoğulculuk, adalet, hukukun üstünlüğü, hoşgörü ve etkin yurttaşlık bilincini aşılamak.",
        "scope": "10 Aralık İnsan Hakları Günü etkinlikleri, okul meclisi ve temsilcilik seçimleri organizasyon desteği, münazara turnuvaları ve açık kürsü oturumları.",
        "topics": "İnsan Hakları Evrensel Beyannamesi, Seçme ve Seçilme Hakkı, Hukuk Devleti, Birlikte Yaşama Kültürü, Ayrımcılıkla Mücadele.",
        "community_service": "Toplumda engelli bireylerin hakları ve erişilebilirlik konusunda farkındalık yürüyüşü veya bilgilendirme broşürü hazırlanması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp genel kurulu, organların seçimi; okul öğrenci temsilciliği seçim sürecine rehberlik edilmesi ve yıllık planın onayı."),
            ("EKİM", "Cumhuriyet rejiminin ve demokrasinin kazanımları konulu okul panosu hazırlanması; 29 Ekim etkinliklerine katılım."),
            ("KASIM", "Demokrasi ve ifade özgürlüğü sınırları konulu münazara oturumu; 'Haklarım ve Sorumluluklarım' atölyesi."),
            ("ARALIK", "10 Aralık İnsan Hakları Günü ve Haftası okul programının icra edilmesi; İnsan Hakları Evrensel Beyannamesi sunumu."),
            ("OCAK", "1. Dönem boyunca yapılan tartışma ve panoların değerlendirilmesi; 1. dönem faaliyet raporunun tanzimi."),
            ("ŞUBAT", "2. Dönem çalışmaları; engelli hakları ve toplumsal erişilebilirlik üzerine farkındalık projesinin başlatılması."),
            ("MART", "Hukuk devleti ve adalet simülasyonu; okul mahkemesi / münazara şeklinde farazi dava canlandırması yapılması."),
            ("NİSAN", "23 Nisan TBMM'nin Açılışı ve Milli İrade konulu tarihsel araştırma ve panel düzenlenmesi; serbest kürsü etkinliği."),
            ("MAYIS", "Engelli bireyler için okul içi erişilebilirlik raporu hazırlanarak okul yönetimine tavsiye listesi sunulması."),
            ("HAZİRAN", "Kulüp karar defteri ve evraklarının tamamlanması; yıl sonu faaliyet raporunun hazırlanıp müdürlüğe teslimi.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp kuruluşu yapıldı, okul temsilciliği seçimlerine destek verildi, Cumhuriyet ve Demokrasi panosu hazırlandı."),
            ("KASIM - ARALIK", "10 Aralık İnsan Hakları Haftası kutlandı, Evrensel Beyanname maddeleri incelendi ve okul münazarası yapıldı."),
            ("OCAK - ŞUBAT", "1. Dönem değerlendirildi, engelli bireylerin hakları ve erişilebilirlik projesi başlatıldı."),
            ("MART - NİSAN", "Hukuk ve Adalet simülasyonu icra edildi, TBMM'nin açılışı ve milli egemenlik paneli gerçekleştirildi."),
            ("MAYIS - HAZİRAN", "Okul erişilebilirlik raporu idareye sunuldu, yıl sonu faaliyet raporu düzenlendi ve kulüp dosyası teslim edildi.")
        ]
    },
    {
        "id": "degerler",
        "name": "Değerler Kulübü",
        "short_name": "Değerler Eğitimi",
        "purpose": "Öğrencilere adalet, dostluk, dürüstlük, öz denetim, sabır, saygı, sevgi, sorumluluk, vatanseverlik ve yardımseverlik gibi temel kök değerleri kazandırmak ve davranışa dönüştürmek.",
        "scope": "Her ay bir kök değer temalı okul etkinlikleri, erdemler panosu, huzurevi ve yetimhane ziyaretleri, saygı ve nezaket kampanyaları.",
        "topics": "Kök Değerlerimiz (Saygı, Sevgi, Sorumluluk, Adalet, Dürüstlük, Vatanseverlik, Yardımseverlik, Sabır, Öz Denetim).",
        "community_service": "Huzurevi ziyareti yapılarak büyüklerimizin hatırının sorulması veya ihtiyaç sahibi ailelere erzak kolisi ulaştırılması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp genel kurulu, yönetim kurulu seçimi; yıllık değer takviminin (Eylül: Sorumluluk, Ekim: Vatanseverlik vb.) onaylatılması."),
            ("EKİM", "'Vatanseverlik ve Birlik' temalı panonun hazırlanması; şehitlik ve gazi derneği mektupları yazılması."),
            ("KASIM", "'Saygı ve Nezaket' ayı; okulda selamlaşma, büyüklere saygı ve nezaket kuralları konulu kısa videolar çekilip sınıflarda izletilmesi."),
            ("ARALIK", "'Yardımseverlik ve Cömertlik' teması; okul genelinde giysi ve erzak paylaşım sandığı kurulması."),
            ("OCAK", "'Dürüstlük ve Güvenilirlik' temalı münazara; 1. dönem değer çalışmaları değerlendirme raporunun tanzimi."),
            ("ŞUBAT", "'Öz Denetim ve Sabır' teması; dijital bağımlılıkla mücadele ve zaman yönetimi atölyesi düzenlenmesi."),
            ("MART", "'Adalet ve Merhamet' teması; Çanakkale Şehitleri anısına fedakarlık ve vatan sevgisi dinletisi yapılması."),
            ("NİSAN", "'Sevgi ve Kardeşlik' ayı; huzurevi veya sevgi evi ziyareti gerçekleştirilerek kuşaklar arası köprü kurulması."),
            ("MAYIS", "Yılın 'Örnek Değer Elçisi' seçilen öğrencilerine okul töreninde teşekkür belgelerinin takdim edilmesi."),
            ("HAZİRAN", "Yıl boyu işlenen değerlerin etki analizinin yapılması; faaliyet raporunun düzenlenip okul idaresine sunulması.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp kuruldu, aylık kök değerler takvimi ilan edildi, Vatanseverlik panosu hazırlandı."),
            ("KASIM - ARALIK", "Saygı ve Nezaket kampanyası yürütüldü, okul içi Yardımseverlik Paylaşım Sandığı kuruldu."),
            ("OCAK - ŞUBAT", "Dürüstlük münazarası yapıldı, dijital öz denetim atölyesi gerçekleştirildi ve 1. dönem değerlendirildi."),
            ("MART - NİSAN", "Merhamet ve Adalet teması işlendi, huzurevi ziyareti yapılarak yaşlılarımızla vakit geçirildi."),
            ("MAYIS - HAZİRAN", "Örnek Değer Elçileri ödüllendirildi, yıl sonu faaliyet raporu hazırlanıp kulüp dosyası teslim edildi.")
        ]
    },
    {
        "id": "cevre-koruma",
        "name": "Çevre Koruma Kulübü",
        "short_name": "Çevre Koruma",
        "purpose": "Öğrencilere çevre bilinci, doğa sevgisi, ekolojik dengenin korunması, iklim değişikliğiyle mücadele ve sürdürülebilir yaşam alışkanlıkları kazandırmak.",
        "scope": "Fidan dikimi ve yeşillendirme, okul bahçesi bakımı, su ve enerji tasarrufu denetimleri, 5 Haziran Dünya Çevre Günü etkinlikleri.",
        "topics": "Küresel İklim Krizi, Su Ayak İzi, Biyoçeşitlilik, Doğal Kaynakların Tasarruflu Kullanımı, Karbon Nötr Okul Hedefleri.",
        "community_service": "Orman Bölge Müdürlüğü veya TEMA iş birliğiyle okul korusu oluşturulması veya fidan dikim etkinliği yapılması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp genel kurulu, yönetim seçimi; yıllık planın hazırlanması; okul bahçesi bitki örtüsü envanterinin çıkarılması."),
            ("EKİM", "Küresel Isınma ve İklim Değişikliği konulu okul panosu; sınıflara enerji ve su tasarrufu uyarı etiketlerinin yapıştırılması."),
            ("KASIM", "11 Kasım Milli Ağaçlandırma Günü münasebetiyle fidan dikim etkinliğinin planlanması ve fidanların toprakla buluşturulması."),
            ("ARALIK", "Okul içi 'Su Timi' oluşturularak musluk kaçaklarının tespiti ve su israfının önlenmesi kampanyası yapılması."),
            ("OCAK", "1. Dönem çevre denetim raporunun hazırlanması, okulun elektrik ve su tüketim grafiklerinin incelenmesi; 1. dönem raporu."),
            ("ŞUBAT", "2. Dönem bahçe düzenleme planı; okul bahçesinde botanik köşesi veya organik tarım hobi bahçesi hazırlıkları."),
            ("MART", "22 Mart Dünya Su Günü ve 21-26 Mart Orman Haftası kutlamaları; su ayak izi hesaplama atölyesi düzenlenmesi."),
            ("NİSAN", "22 Nisan Dünya Günü etkinlikleri; çevre temizliği ve doğa yürüyüşü (trekking) organizasyonu."),
            ("MAYIS", "Okul bahçesinde çiçeklendirme ve ağaç bakım şenliği; kompost gübre ile bitkilerin beslenmesi."),
            ("HAZİRAN", "5 Haziran Dünya Çevre Günü okul programının sunulması; yıl sonu faaliyet raporunun hazırlanıp idareye teslimi.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp kuruldu, çevre koruma panosu düzenlendi, tasarruf etiketleri okul genelinde uygulandı."),
            ("KASIM - ARALIK", "11 Kasım Milli Ağaçlandırma Gününde fidan dikildi, Su Timi oluşturularak su tasarrufu sağlandı."),
            ("OCAK - ŞUBAT", "1. Dönem değerlendirildi, okul bahçesinde organik tarım / botanik köşesi çalışmaları başlatıldı."),
            ("MART - NİSAN", "Dünya Su Günü kutlandı, su ayak izi atölyesi yapıldı ve çevre temizliği yürüyüşü icra edildi."),
            ("MAYIS - HAZİRAN", "5 Haziran Çevre Günü şenliği yapıldı, yıl sonu faaliyet raporu düzenlenip kulüp dosyası teslim edildi.")
        ]
    },
    {
        "id": "bilisim-ve-internet",
        "name": "Bilişim ve İnternet Kulübü",
        "short_name": "Bilişim ve Kodlama",
        "purpose": "Öğrencilerin bilişim teknolojilerini üretken ve etik kullanmalarını sağlamak; kodlama, robotik, güvenli internet, siber güvenlik ve yapay zeka bilincini geliştirmek.",
        "scope": "Kodlama haftası (CodeWeek) atölyeleri, Güvenli İnternet Günü (SID), okul web sitesi içerik desteği, siber zorbalık seminerleri ve robotik projeleri.",
        "topics": "Algoritmik Düşünme, Blok Tabanlı Kodlama (Scratch), Python Temelleri, Siber Güvenlik ve Şifre Hijyeni, Yapay Zeka Etiği.",
        "community_service": "Alt sınıf öğrencilerine ve velilere yönelik 'Bilinçli ve Güvenli İnternet Kullanımı' rehberi ve semineri düzenlenmesi.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp genel kurulu, yönetim seçimi; bilişim sınıfı envanterinin çıkarılması; yıllık çalışma planının onaylanması."),
            ("EKİM", "AB Kod Haftası (CodeWeek) etkinlikleri; Scratch veya mBlock ile temel oyun ve animasyon kodlama atölyesi düzenlenmesi."),
            ("KASIM", "Siber Güvenlik ve Veri Gizliliği panosu; güçlü parola oluşturma ve oltalama (phishing) saldırılarına karşı korunma semineri."),
            ("ARALIK", "Dünya Bilgisayar Bilimleri Haftası ve 'Hour of Code' etkinliklerinin tüm okul sınıflarında uygulanması."),
            ("OCAK", "1. Dönem boyunca geliştirilen öğrenci yazılım projelerinin incelenmesi; 1. dönem faaliyet raporunun hazırlanması."),
            ("ŞUBAT", "Güvenli İnternet Günü (SID) okul programı; siber zorbalık ve dijital ayak izi farkındalık bülteni dağıtılması."),
            ("MART", "Yapay zeka araçlarının eğitimde etik kullanımı ve prompt yazımı atölyesi; basit robotik kodlama (Arduino/Microbit) uygulamaları."),
            ("NİSAN", "23 Nisan için dijital tebrik kartı kodlama yarışması; okul içi en iyi yazılım projesinin seçilmesi."),
            ("MAYIS", "Okul Bilişim ve Kodlama Şenliğinin düzenlenmesi; öğrencilerin geliştirdiği oyun ve robotik projelerin sergilenmesi."),
            ("HAZİRAN", "Bilişim laboratuvarının bakım ve yedekleme işlemleri; faaliyet raporunun düzenlenerek idareye sunulması.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp kuruldu, CodeWeek kodlama haftası etkinlikleri yürütüldü ve kodlama sertifikaları alındı."),
            ("KASIM - ARALIK", "Siber güvenlik panosu hazırlandı, Hour of Code etkinliğiyle yüzlerce öğrenciye kodlama yaptırıldı."),
            ("OCAK - ŞUBAT", "Güvenli İnternet Günü kutlandı, siber zorbalıkla mücadele broşürü okulda dağıtıldı."),
            ("MART - NİSAN", "Yapay zeka ve robotik kodlama atölyeleri tamamlandı, 23 Nisan dijital oyun yarışması düzenlendi."),
            ("MAYIS - HAZİRAN", "Okul Bilişim ve Kodlama Şenliği başarıyla gerçekleştirildi, yıl sonu raporu teslim edildi.")
        ]
    },
    {
        "id": "bilincli-tuketici",
        "name": "Bilinçli Tüketici Kulübü",
        "short_name": "Bilinçli Tüketici",
        "purpose": "Öğrencilere bütçe yönetimi, tasarruf, tüketici hakları, yerli malı kullanımının önemi, reklam okuryazarlığı ve kaliteli tüketim bilincini aşılamak.",
        "scope": "15-21 Mart Tüketiciyi Koruma Haftası, 12-18 Aralık Tutum, Yatırım ve Türk Malları Haftası etkinlikleri, etiket/fiş denetimleri ve seminerler.",
        "topics": "Tüketici Hakem Heyetleri, Ayıplı Mal ve Hizmet, Garanti Belgesi, Bütçe ve Tasarruf, Reklam Tuzakları, TSE Standartları.",
        "community_service": "Okul kantini ve yerel market ürünlerinin etiket, son kullanma tarihi ve hijyen kriterlerine göre bilinçli alışveriş gözlem rehberinin hazırlanması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp genel kurulu, yönetim seçimi; yıllık planın hazırlanması; bilinçli tüketici kavramının sınıflarda tanıtılması."),
            ("EKİM", "İhtiyaç ve İstek ayrımı atölyesi; harçlık yönetimi ve kumbarada birikim yapma alışkanlığı panosu."),
            ("KASIM", "Alışveriş tuzakları ve yanıltıcı indirim reklamları üzerine vaka incelemesi; fatura, fiş ve garanti belgesi saklama bilinci."),
            ("ARALIK", "12-18 Aralık Tutum, Yatırım ve Türk Malları Haftası programı; yerli üretimin ülke ekonomisine katkısının vurgulanması."),
            ("OCAK", "1. Dönem tüketici bilinçlendirme çalışmalarının gözden geçirilmesi; 1. dönem faaliyet raporunun tanzimi."),
            ("ŞUBAT", "2. Dönem hedefleri; gıda alışverişinde son kullanma tarihi (SKT) ve içindekiler etiketini okuma rehberinin yayımlanması."),
            ("MART", "15-21 Mart Tüketiciyi Koruma Haftası kutlamaları; Tüketici Hakem Heyetine e-Devletten başvuru simülasyonu yapılması."),
            ("NİSAN", "Okul kantini ürünlerinin fiyat ve etiket incelemesi; sağlıklı ve hesaplı beslenme önerileri panosu."),
            ("MAYIS", "Geri dönüştürülebilir ve çevre dostu tüketim (yeşil tüketici) ilkeleri üzerine sunum; bilinçli tüketici bilgi yarışması."),
            ("HAZİRAN", "Yıl boyu yapılan faaliyetlerin raporlanması; karar defterinin kapatılması ve dosyanın okul müdürlüğüne teslimi.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp organları seçildi, İhtiyaç vs İstek panosu hazırlandı, birikim ve kumbara bilinci aşılandı."),
            ("KASIM - ARALIK", "Tutum ve Türk Malları Haftası kutlandı, yerli malı tüketimi ve fatura saklama kuralları işlendi."),
            ("OCAK - ŞUBAT", "Gıda etiket okuryazarlığı rehberi hazırlandı, 1. dönem çalışmaları değerlendirildi."),
            ("MART - NİSAN", "Tüketiciyi Koruma Haftası kutlandı, e-Devlet hak arama yolları ve kantin etiket denetimi yapıldı."),
            ("MAYIS - HAZİRAN", "Bilinçli tüketici bilgi yarışması düzenlendi, yıl sonu faaliyet raporu tamamlanıp idareye sunuldu.")
        ]
    },
    {
        "id": "bilim-fen-ve-teknoloji",
        "name": "Bilim-Fen ve Teknoloji Kulübü",
        "short_name": "Bilim ve Teknoloji",
        "purpose": "Öğrencilere bilimsel düşünce, merak, sorgulama, deney ve gözlem yapma alışkanlığı kazandırmak; TÜBİTAK ve TEKNOFEST gibi bilimsel etkinliklere katılımlarını teşvik etmek.",
        "scope": "Fen deneyleri atölyeleri, Bilim Şenliği, TÜBİTAK 4006 / 2204 projeleri, bilim insanlarının hayatlarının incelenmesi ve planetaryum/müze gezileri.",
        "topics": "Bilimsel Yöntem Basamakları, Yenilenebilir Enerji, Uzay ve Astronomi, Nanoteknoloji, Biyomimikri, Çılgın ve Güvenli Fen Deneyleri.",
        "community_service": "Alt sınıf öğrencilerine fen laboratuvarında eğlenceli ve güvenli bilimsel gösteri deneyleri (volkan patlaması, fil dişi macunu vb.) sunulması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp genel kurulu, yönetim seçimi; fen laboratuvarı güvenlik kurallarının gözden geçirilmesi ve yıllık planın onayı."),
            ("EKİM", "Dünya Uzay Haftası (4-10 Ekim) etkinlikleri; teleskopla gökyüzü gözlemi ve uzay teknolojileri panosu."),
            ("KASIM", "TÜBİTAK 2204-B Ortaokul / 2204-A Lise proje çağrılarının incelenmesi; proje ekiplerinin ve araştırma konularının belirlenmesi."),
            ("ARALIK", "Laboratuvarda eğlenceli ve öğretici kimya/fizik deneyleri atölyesi; yoğunluk kulesi ve asit-baz indikatörleri uygulamaları."),
            ("OCAK", "TÜBİTAK proje başvuru metinlerinin hazırlanması; 1. dönem faaliyet raporunun tanzim edilmesi."),
            ("ŞUBAT", "2. Dönem çalışmaları; yenilenebilir enerji kaynakları (rüzgar ve güneş enerjisi prototipleri) atölyesi."),
            ("MART", "Bilim ve Teknoloji Haftası kutlamaları; Türk-İslam bilim insanları (Aziz Sancar, Ali Kuşçu, Cahit Arf) sergisi."),
            ("NİSAN", "TEKNOFEST ve bilim yarışmaları için hazırlanan prototip modellerin test edilmesi; okul içi deney gösterileri."),
            ("MAYIS", "Geleneksel Okul Bilim Şenliğinin (Science Fair) düzenlenmesi; öğrencilerin araştırma projelerini sergilemesi."),
            ("HAZİRAN", "Laboratuvar malzemelerinin sayımı ve düzenlenmesi; yıl sonu faaliyet raporunun hazırlanarak idareye teslimi.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp kuruldu, laboratuvar güvenliği işlendi, Dünya Uzay Haftası panosu ve roket maketleri yapıldı."),
            ("KASIM - ARALIK", "TÜBİTAK proje konuları belirlendi, laboratuvarda uygulamalı kimya ve fizik deneyleri yapıldı."),
            ("OCAK - ŞUBAT", "TÜBİTAK proje başvuruları tamamlandı, yenilenebilir enerji prototipleri üretildi."),
            ("MART - NİSAN", "Bilim ve Teknoloji Haftası kutlandı, Aziz Sancar ve Türk bilim insanları sergisi açıldı."),
            ("MAYIS - HAZİRAN", "Okul Bilim Şenliği büyük katılımla düzenlendi, proje sahiplerine belgeler verildi ve rapor teslim edildi.")
        ]
    },
    {
        "id": "afete-hazirlik",
        "name": "Afete Hazırlık Kulübü",
        "short_name": "Afete Hazırlık",
        "purpose": "Öğrencilere deprem, sel, yangın, çığ gibi afetler öncesinde, anında ve sonrasında yapılması gereken doğru davranış modellerini öğretmek; afet bilinci oluşturmak.",
        "scope": "1-7 Mart Deprem Haftası, 13 Ekim Dünya Afet Risklerinin Azaltılması Günü, okul tahliye tatbikatları, afet çantası hazırlığı ve AFAD iş birliği.",
        "topics": "Çök-Kapan-Tutun Kuralı, Tahliye Güzergahları, Afet Acil Durum Çantası, Yangın Söndürme Cihazı Kullanımı, AFAD Gönüllülüğü.",
        "community_service": "Ailelere yönelik 'Evimizde Afet Planı' bilgilendirme broşürü hazırlanarak tüm öğrenci velilerine ulaştırılması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp genel kurulu, organların seçimi; okul tahliye planının ve acil toplanma alanlarının incelenmesi ve yıllık planın onayı."),
            ("EKİM", "13 Ekim Dünya Afet Risklerini Azaltma Günü; afet tehlike avı (okulda devrilebilecek eşyaların sabitlenmesi denetimi)."),
            ("KASIM", "12 Kasım Afet Eğitimi Hazırlık Günü ve Düzce Depremi anısına okul genelinde eş zamanlı Çök-Kapan-Tutun tatbikatı icrası."),
            ("ARALIK", "Afet ve Acil Durum Çantası hazırlama atölyesi; çantada bulunması gereken zorunlu malzemelerin uygulamalı gösterimi."),
            ("OCAK", "1. Dönem tatbikat sonuçlarının ve tahliye sürelerinin değerlendirilmesi; 1. dönem faaliyet raporunun hazırlanması."),
            ("ŞUBAT", "2. Dönem çalışmaları; sel, çığ ve yangın afetlerine karşı alınacak tedbirlerin sınıflarda anlatılması."),
            ("MART", "1-7 Mart Deprem Haftası okul programı; itfaiye ve AFAD ekipleri davet edilerek kontrollü yangın ve tahliye tatbikatı yapılması."),
            ("NİSAN", "İlk yardım ve kurtarma çantalarının kontrolü; afet anında doğru haberleşme ve 112 Acil Çağrı kullanım semineri."),
            ("MAYIS", "Okul içi 'Afet Bilinci Bilgi Yarışması' düzenlenmesi; afet toplanma alanı tabelalarının yenilenmesi."),
            ("HAZİRAN", "Okul afet malzeme dolaplarının denetimi; yıl sonu faaliyet raporunun hazırlanarak okul idaresine teslimi.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp kuruldu, tahliye planı incelendi, tehlike avı yapılarak sınıflardaki dolap sabitlemeleri denetlendi."),
            ("KASIM - ARALIK", "12 Kasım'da tüm okulda Çök-Kapan-Tutun tatbikatı yapıldı, afet çantası hazırlama standı açıldı."),
            ("OCAK - ŞUBAT", "1. Dönem tahliye süreleri değerlendirildi, yangın ve kış afetlerine karşı önlemler panoda duyuruldu."),
            ("MART - NİSAN", "Deprem Haftasında AFAD ve İtfaiye destekli yangın-tahliye tatbikatı başarıyla gerçekleştirildi."),
            ("MAYIS - HAZİRAN", "Afet Bilinci bilgi yarışması yapıldı, yıllık faaliyet raporu hazırlanıp kulüp dosyası teslim edildi.")
        ]
    },
    {
        "id": "kutuphanecilik",
        "name": "Kütüphanecilik Kulübü",
        "short_name": "Kütüphanecilik",
        "purpose": "Öğrencilere kitap okuma sevgisi, kütüphane kültürü, araştırma becerisi kazandırmak; okul kütüphanesini etkin, canlı ve zengin bir öğrenme merkezine dönüştürmek.",
        "scope": "Kütüphaneler Haftası (Mart son haftası), kitap bağış kampanyaları, okuma saatleri, yazar söyleşileri, kitap tahlil atölyeleri ve kataloglama.",
        "topics": "Kitap Okuma Alışkanlığı, Kütüphane Tasnif Sistemleri (Dewey), Kitap İnceleme ve Tahlili, Yazar Biyografileri, Nadir Eserler.",
        "community_service": "Kütüphanesi yetersiz olan bir kardeş köy okuluna 'Bir Kitap Bir Gelecek' kampanyasıyla en az 500 kitaplık kütüphane kurulması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp genel kurulu, yönetim seçimi; okul kütüphanesinin genel temizlik, tasnif ve sayımının yapılması; yıllık planın onayı."),
            ("EKİM", "Kütüphane kullanım kuralları ve üyelik kartlarının dağıtılması; 'Ayın Kitap Kurdu' uygulamasının başlatılması."),
            ("KASIM", "Dünya Çocuk Kitapları Haftası etkinlikleri; yeni çıkan eserlerin okul panosunda tanıtılması ve kitap ayracı tasarım atölyesi."),
            ("ARALIK", "Kardeş okul için 'Bir Kitap Bir Dünya' kitap bağış kampanyasının duyurulması ve toplama kutularının yerleştirilmesi."),
            ("OCAK", "1. Dönem en çok kitap okuyan öğrencilerin belirlenip ödüllendirilmesi; 1. dönem faaliyet raporunun hazırlanması."),
            ("ŞUBAT", "2. Dönem kütüphane çalışma saatlerinin düzenlenmesi; toplanan bağış kitapların yaş seviyelerine göre ayrıştırılması."),
            ("MART", "Mart ayının son haftası Kütüphaneler Haftası kutlamaları; yerel bir yazarın okula davet edilerek söyleşi ve imza günü yapılması."),
            ("NİSAN", "23 Nisan Dünya Kitap Günü ve Telif Hakları Günü semineri; okul bahçesinde açık hava toplu okuma saati icrası."),
            ("MAYIS", "Kardeş okula toplanan kitapların ulaştırılması ve kütüphane raf kurulumuna bizzat destek verilmesi."),
            ("HAZİRAN", "Ödünç verilen kitapların toplanması ve kütüphane sayımının tamamlanması; yıl sonu raporunun teslimi.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp kuruldu, kütüphane kitapları tasnif edildi, üyelik kartları çıkarıldı ve kurallar panosu asıldı."),
            ("KASIM - ARALIK", "Çocuk Kitapları Haftası kutlandı, kardeş okul için dev kitap bağış kampanyası başlatıldı."),
            ("OCAK - ŞUBAT", "Dönemin kitap kurtları ödüllendirildi, toplanan yüzlerce kitap kataloglanıp paketlendi."),
            ("MART - NİSAN", "Kütüphaneler Haftasında yazar söyleşisi ve açık hava toplu kitap okuma etkinliği düzenlendi."),
            ("MAYIS - HAZİRAN", "Bağış kitaplar kardeş okula teslim edildi, kütüphane sayımı yapıldı ve faaliyet raporu idareye sunuldu.")
        ]
    },
    {
        "id": "zeka-oyunlari",
        "name": "Zeka Oyunları Kulübü",
        "short_name": "Zeka Oyunları",
        "purpose": "Öğrencilerin problem çözme, analitik düşünme, uzamsal algı, strateji geliştirme, odaklanma ve hızlı karar verebilme yeteneklerini zeka oyunları ile geliştirmek.",
        "scope": "Mangala, Satranç, Abalone, Koridor, Reversi, Sudoku, Pentamino ve Tangram eğitimleri; okul içi turnuvalar ve TAZOF yarışmalarına hazırlık.",
        "topics": "Akıl ve Zeka Oyunları Kategorileri (Strateji, Kutu, Mekanik, Mantık, Kelime Oyunları), Turnuva Kuralları, Centilmenlik.",
        "community_service": "Huzurevlerinde yaşlılarla veya hastane sınıflarında çocuklarla zeka oyunları oynayarak zihinsel egzersiz ve moral desteği sağlanması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp genel kurulu, organların seçimi; okul zeka oyunları atölyesi kutu ve materyallerinin sayımı; yıllık planın onayı."),
            ("EKİM", "Geleneksel Türk Zeka Oyunu Mangala kuralları ve taktikleri eğitimi; sınıflar arası mangala eleme turları."),
            ("KASIM", "Strateji oyunları (Satranç, Koridor, Abalone) temel kuralları ve hamle kombinasyonları çalıştayları."),
            ("ARALIK", "Kağıt-kalem mantık oyunları (Sudoku, Kendoku, Çit, Hazine Avı) atölyesi ve sınıf içi hız yarışması."),
            ("OCAK", "1. Dönem oyun performanslarının değerlendirilmesi; il/ilçe Akıl ve Zeka Oyunları Turnuvası okul takımının seçimi; 1. dönem raporu."),
            ("ŞUBAT", "2. Dönem turnuva hazırlık kampları; saatli maç ve turnuva ortamı simülasyonlarının yapılması."),
            ("MART", "İlçe ve İl Zeka Oyunları Şampiyonasına katılım; okul temsilcisi öğrencilerin maç analizlerinin yapılması."),
            ("NİSAN", "Geleneksel Okul İçi Büyük Bahar Akıl Oyunları Turnuvası (Mangala, Reversi, Kulami, Pentamino); madalya töreni."),
            ("MAYIS", "Okul bahçesinde dev satranç ve yer oyunları şenliği; tüm öğrencilere açık zeka bulmacaları standı kurulması."),
            ("HAZİRAN", "Oyun takımlarının bakımı ve eksik parçaların tespiti; yıl sonu faaliyet raporunun hazırlanarak okul idaresine teslimi.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp kuruldu, oyun materyalleri elden geçirildi, geleneksel Türk zeka oyunu Mangala eğitimleri verildi."),
            ("KASIM - ARALIK", "Koridor, Abalone ve Reversi strateji atölyeleri tamamlandı; Sudoku yarışması düzenlendi."),
            ("OCAK - ŞUBAT", "1. Dönem değerlendirildi, ilçe turnuvası okul takımı seçilerek zaman kontrolü maçları yapıldı."),
            ("MART - NİSAN", "İlçe Zeka Oyunları Turnuvasına katılım sağlandı, okul içi büyük turnuva düzenlenip şampiyonlar ödüllendirildi."),
            ("MAYIS - HAZİRAN", "Açık hava bahçe satranç şenliği yapıldı, takımlar sayıldı ve faaliyet raporu idareye sunuldu.")
        ]
    },
    {
        "id": "kisisel-verileri-koruma",
        "name": "Kişisel Verileri Koruma Kulübü",
        "short_name": "KVKK ve Dijital Mahremiyet",
        "purpose": "Öğrencilere 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) bilincini kazandırmak; dijital mahremiyet, sosyal medyada güvenli veri paylaşımı ve hak arama yollarını öğretmek.",
        "scope": "28 Ocak Veri Koruma Günü etkinlikleri, dijital ayak izi denetimleri, sosyal medya gizlilik ayarları atölyesi, açık rıza ve aydınlatma metni bilgilendirmeleri.",
        "topics": "Kişisel Veri Nedir, Özel Nitelikli Kişisel Veri, Dijital Ayak İzi, Sosyal Medyada Paylaşım Riskleri, KVKK Hakları, Şifre Güvenliği.",
        "community_service": "Velilere ve okul personeline yönelik 'Çocukların Dijital Mahremiyeti ve Veri Güvenliği' bilgilendirme broşürü dağıtılması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp genel kurulu, yönetim seçimi; KVKK mevzuatı temel kavramları; yıllık çalışma planının onaylanması."),
            ("EKİM", "Kişisel veri ve özel nitelikli kişisel veri farkı konulu okul panosu; T.C. kimlik no, biyometrik veri ve fotoğraf gizliliği."),
            ("KASIM", "Sosyal medyada farkında olmadan paylaşılan veriler (konum, aile bilgileri, okul forması); dijital riskler atölyesi."),
            ("ARALIK", "Güçlü parola ve iki faktörlü kimlik doğrulama (2FA) eğitimi; çevrim içi oyunlarda kişisel veri hırsızlığına karşı önlemler."),
            ("OCAK", "28 Ocak Veri Koruma Günü hazırlıkları; okul genelinde 'Verime Dokunma' afiş tasarım yarışması; 1. dönem raporu."),
            ("ŞUBAT", "28 Ocak Veri Koruma Günü okul töreni; KVKK Kurumu kamu spotlarının sınıflarda izletilmesi."),
            ("MART", "Açık rıza ve aydınlatma metni incelemesi; okulda çekilen fotoğrafların web sitesinde yayımlanma izin süreçlerinin anlatılması."),
            ("NİSAN", "Siber zorbalık ve kişisel verilerin izinsiz ifşası durumunda hukuki başvuru yolları semineri (Rehberlik servisi iş birliğiyle)."),
            ("MAYIS", "Öğrencilere yönelik 'Kendi Dijital Ayak İzini Denetle' uygulamalı atölyesi; arama motorlarında veri temizliği rehberi."),
            ("HAZİRAN", "Yıl boyu yapılan farkındalık çalışmalarının özetlenmesi; yıl sonu faaliyet raporunun hazırlanarak idareye sunulması.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp organları seçildi, kişisel verinin tanımı ve önemi üzerine bilgilendirme panosu hazırlandı."),
            ("KASIM - ARALIK", "Sosyal medyada veri güvenliği semineri verildi, iki faktörlü kimlik doğrulama uygulaması anlatıldı."),
            ("OCAK - ŞUBAT", "28 Ocak Veri Koruma Günü kutlandı, afiş yarışması düzenlendi ve kamu spotları izletildi."),
            ("MART - NİSAN", "Açık rıza ve dijital mahremiyet hakları işlendi, siber zorbalık ve hukuki haklar semineri verildi."),
            ("MAYIS - HAZİRAN", "Dijital Ayak İzi Denetim atölyesi gerçekleştirildi, yıl sonu faaliyet raporu tamamlanıp idareye sunuldu.")
        ]
    },
    {
        "id": "mun-model-birlesmis-milletler",
        "name": "Model Birleşmiş Milletler (MUN) Kulübü",
        "short_name": "MUN ve Diplomasi",
        "purpose": "Öğrencilere küresel sorunlar, uluslararası diplomasi, barışçıl müzakere, hitabet, münazara ve resmi karar metni (resolution) yazma becerilerini kazandırmak; yabancı dil yetkinliğini pekiştirmek.",
        "scope": "BM komite simülasyonları (Güvenlik Konseyi, UNESCO, UNICEF, WHO), ulusal ve uluslararası MUN konferanslarına katılım, elçilik sunumları.",
        "topics": "BM Sürdürülebilir Kalkınma Hedefleri, Diplomatik Protokol, Müzakere Teknikleri, Resolution Metni Yazımı, İngilizce Hitabet.",
        "community_service": "Küresel İklim Krizi ve Temiz Suya Erişim konusunda farkındalık konferansı düzenlenerek okul adına fidan bağışında bulunulması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp genel kurulu, delegasyon başkanı ve divanın seçimi; BM sistemi ve organlarının tanıtılması; yıllık planın onayı."),
            ("EKİM", "24 Ekim Birleşmiş Milletler Günü kutlamaları; BM Sürdürülebilir Kalkınma Hedefleri (17 Hedef) panosunun hazırlanması."),
            ("KASIM", "Parlamenter usul ve MUN prosedürleri eğitimi (Points and Motions, Speaker's List, Moderated Caucus, Resolution)."),
            ("ARALIK", "Mülteci krizi ve insan hakları temalı okul içi ilk mini MUN oturumu; öğrencilerin farklı ülke delegeleri rolünü üstlenmesi."),
            ("OCAK", "Resolution (karar taslağı) yazım atölyesi; 1. dönem simülasyonlarının değerlendirilmesi; 1. dönem faaliyet raporu."),
            ("ŞUBAT", "Ulusal ve bölgesel MUN konferanslarına başvuru süreçleri; delege temsil ülkelerinin ve komite konularının araştırılması."),
            ("MART", "Küresel İklim Krizi ve Barış temalı komite çalıştayı; İngilizce ve Türkçe diplomatik hitabet pratikleri."),
            ("NİSAN", "Okul içi 'Model BM Genel Kurulu' simülasyonunun icra edilmesi; delegelerin çözüm önergelerini oylaması."),
            ("MAYIS", "Ulusal bir MUN konferansına katılım sağlayan delegelerin deneyim sunumu; sertifika töreni ve diplomatik resepsiyon."),
            ("HAZİRAN", "Tüm oturum tutanakları ve resolution metinlerinin arşivlenmesi; yıl sonu faaliyet raporunun hazırlanarak idareye sunulması.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp kuruldu, delegasyon başkanı seçildi, 24 Ekim BM Günü ve Sürdürülebilir Hedefler panosu hazırlandı."),
            ("KASIM - ARALIK", "MUN parlamento usulü ve diplomatik hitabet eğitimleri verildi, mini komite simülasyonu yapıldı."),
            ("OCAK - ŞUBAT", "Karar taslağı (Resolution) yazım atölyesi icra edildi, 1. dönem değerlendirildi ve konferans başvuruları yapıldı."),
            ("MART - NİSAN", "Okul içi Model BM Genel Kurul Simülasyonu başarıyla gerçekleştirildi, çözüm metinleri oylandı."),
            ("MAYIS - HAZİRAN", "Delegasyonlara katılım sertifikaları takdim edildi, yıl sonu faaliyet raporu düzenlenip idareye teslim edildi.")
        ]
    }
]

def generate_tuzuk_paras(club):
    return [
        "BÖLÜM 1: GENEL ESASLAR, KURULUŞ VE AMAÇ",
        f"Madde 1 - Kulübün Adı: Bu tüzük hükümleri doğrultusunda eğitim kurumumuz bünyesinde '{club['name']}' adıyla bir sosyal kulüp kurulmuştur.",
        f"Madde 2 - Kulübün Amacı: {club['purpose']}",
        f"Madde 3 - Kulübün Faaliyet Alanı ve Kapsamı: {club['scope']}",
        f"Madde 4 - Temel Konular ve Değerler: Kulüp çalışmalarında özellikle {club['topics']} konuları esas alınır.",
        "BÖLÜM 2: ÜYELİK VE GÖREVLER",
        "Madde 5 - Üyelik ve Katılım: Okulun tüm öğrencileri ilgi, yetenek ve veli izinleri doğrultusunda kulübe üye olabilirler. Her üye kulüp faaliyetlerine etkin ve düzenli katılmakla yükümlüdür.",
        "Madde 6 - Üyelerin Sorumlulukları: Kulüp üyeleri toplantılara zamanında katılmak, alınan kararlara uymak, okulun ve kulübün araç gereçlerini korumak ve kulüp ruhuna uygun örnek davranışlar sergilemekle sorumludur.",
        "BÖLÜM 3: KULÜP ORGANLARI VE İŞLEYİŞ",
        "Madde 7 - Kulüp Organları: Kulüp şu organlardan oluşur: a) Kulüp Genel Kurulu, b) Yönetim Kurulu (Başkan, Başkan Yardımcısı, Sekreter/Yazman, Sayman), c) Denetleme Kurulu, ç) Pano ve Eser İnceleme Komisyonu.",
        "Madde 8 - Yönetim Kurulunun Görevleri: Kulüp yıllık çalışma planını hazırlar, genel kurul kararlarını uygular, toplantı gündemlerini belirler ve toplantı tutanaklarını karar defterine işler.",
        "Madde 9 - Danışman Öğretmenin Rehberliği: Danışman öğretmen, kulüp çalışmalarının mevzuata ve okul disiplinine uygunluğunu denetler, öğrencilere rehberlik eder ve okul idaresi ile koordinasyonu sağlar.",
        "BÖLÜM 4: TUTULACAK DEFTER, BELGE VE DOSYALAR",
        "Madde 10 - Kulüp Dosyası: Kulüp bünyesinde Sosyal Kulüp İç Tüzüğü, Toplantı Tutanakları, Yıllık Çalışma Planı, Karar Defteri, Öğrenci ve Kurul Listeleri, Faaliyet Raporları ve Veli İzin Belgeleri düzenli bir dosya halinde tutulur. Etkinlikler e-Okul Sosyal Etkinlik Modülüne işlenir.",
        "BÖLÜM 5: TOPLUM HİZMETİ VE YÜRÜRLÜK",
        f"Madde 11 - Toplum Hizmeti: Kulüp eğitim öğretim yılı boyunca {club['community_service']} faaliyetini toplum hizmeti çalışması olarak icra eder.",
        "Madde 12 - Yürürlük ve Onay: Bu iç tüzük, kulüp danışman öğretmenlerinin teklifi ve okul müdürünün onayı ile yürürlüğe girer."
    ]

def generate_toplanti_paras(club):
    return [
        "1. DÖNEM GENEL KURUL TOPLANTI TUTANAĞI VE ALINAN KARARLAR",
        f"Toplantı Yeri ve Zamanı: Eğitim öğretim yılı başında okul idaresince belirlenen tarihte, kulüp danışman öğretmenleri rehberliğinde ve tüm kulüp üyelerinin katılımıyla toplanılmıştır.",
        "GÜNDEM MADDELERİ:",
        "1. Açılış, yoklama ve toplantı divanının oluşturulması.",
        "2. Saygı duruşu ve İstiklal Marşı'nın okunması.",
        f"3. Millî Eğitim Bakanlığı Sosyal Etkinlikler Yönetmeliği gereğince {club['name']} amaç ve hedeflerinin üyelere okunması.",
        "4. Kulüp Yönetim Kurulu (Başkan, Başkan Yardımcısı, Sekreter/Yazman, Sayman) ve Denetleme Kurulu asil ve yedek üyelerinin seçimi.",
        "5. Pano Düzenleme Komisyonu ile Yazı/Eser İnceleme Komisyonu üyelerinin belirlenmesi.",
        "6. 2026-2027 Eğitim Öğretim Yılı Yıllık Çalışma Planı taslağının görüşülmesi, önerilerin alınması ve oy birliğiyle kabulü.",
        f"7. Yıl boyunca icra edilecek toplum hizmeti çalışmasının ({club['community_service']}) görüşülerek kararlaştırılması.",
        "8. Dilek, temenniler ve kapanış.",
        "GÖRÜŞÜLEN KONULAR VE ALINAN KARARLAR:",
        "Karar 1: Danışman öğretmen açılış konuşmasını yaparak toplantıyı başlatmış, yapılan yoklamada tüm kayıtlı üyelerin eksiksiz hazır bulunduğu tespit edilmiştir. Divan başkanlığına oy birliğiyle danışman öğretmen seçilmiştir.",
        "Karar 2: Cumhuriyetimizin kurucusu Gazi Mustafa Kemal Atatürk, silah arkadaşları ve aziz şehitlerimizin manevi huzurunda saygı duruşunda bulunulmuş, akabinde İstiklal Marşı coşkuyla okunmuştur.",
        f"Karar 3: Kulüp amaçları ve ilkeleri okunmuş, danışman öğretmen tarafından {club['name']} çalışmaları sırasında uyulması gereken okul kuralları, sosyal etkinlik esasları ve kulübün okul kültürüne katkısı ayrıntılı olarak açıklanmıştır.",
        "Karar 4: Kulüp organlarının seçimine geçilmiştir. Yapılan açık oylama / gizli oy açık sayım neticesinde Yönetim ve Denetim Kurulu asil ve yedek üyeleri demokratik bir süreçle oy birliğiyle belirlenmiştir.",
        "Karar 5: Okul panosunu haftalık ve aylık olarak düzenleyecek Pano Komisyonu ile yayımlanacak metinleri inceleyecek Eser İnceleme Komisyonuna gönüllü öğrenciler görevlendirilmiştir.",
        "Karar 6: Hazırlanan 2026-2027 Eğitim Öğretim Yılı Yıllık Çalışma Planı maddeleri tek tek okunmuş; üyelerin teklifleri doğrultusunda gerekli düzenlemeler yapılarak plan oy birliğiyle kabul edilmiş ve okul müdürlüğünün onayına sunulması kararlaştırılmıştır.",
        f"Karar 7: Kulübümüzün toplum hizmeti görevi olarak '{club['community_service']}' projesinin yürütülmesine, tüm üyelerin ve okul paydaşlarının sürece dahil edilmesine karar verilmiştir.",
        "Karar 8: Öğrenciler yeni eğitim öğretim yılının başarılı, verimli ve coşkulu geçmesi yönündeki iyi dileklerini belirtmiş; danışman öğretmenin teşekkür konuşması ile toplantı başarıyla sona ermiştir."
    ]

def generate_plan_paras(club):
    lines = [f"{club['name'].upper()} 2026-2027 EĞİTİM VE ÖĞRETİM YILI YILLIK ÇALIŞMA PLANI"]
    for ay, faaliyet in club["monthly_plan"]:
        lines.append(f"{ay}: {faaliyet}")
    return lines

def generate_student_paras(club):
    return [
        f"{club['name'].upper()} GÖREVLİ ÖĞRENCİ VE SEÇİLEN KURULLAR LİSTESİ",
        "Kulüp Yönetim Kurulu: Kulüp Başkanı, Kulüp Başkan Yardımcısı, Sekreter (Yazman), Sayman.",
        "Denetleme Kurulu ve Komisyonlar: Pano Düzenleme Komisyonu, Yazı ve Eser İnceleme Komisyonu, Toplum Hizmeti Koordinatörlüğü.",
        "Tüm üyeler Millî Eğitim Bakanlığı Sosyal Etkinlikler Yönetmeliği doğrultusunda görevlerini sorumlulukla ifa ederler."
    ]

def generate_veli_paras(club):
    return [
        "EK-5 SOSYAL ETKİNLİK VELİ İZİN BELGESİ",
        f"Velisi bulunduğum öğrencinin 2026-2027 Eğitim ve Öğretim yılında {club['name']} kapsamında yürütülecek olan sosyal, kültürel, sanatsal, sportif etkinliklere, toplum hizmeti çalışmalarına, atölye ve gezi faaliyetlerine katılmasına izin veriyorum.",
        "Gereğini bilgilerinize arz ederim."
    ]

def generate_rapor_paras(club):
    return [
        f"{club['name'].upper()} 2026-2027 EĞİTİM ÖĞRETİM YILI YIL SONU FAALİYET RAPORU",
        f"Kulübümüz 2026-2027 eğitim öğretim yılında belirlenen yıllık çalışma planına ve MEB Sosyal Etkinlikler Yönetmeliği hükümlerine tam uygun olarak çalışmalarını başarıyla tamamlamıştır.",
        "Gerçekleştirilen tüm faaliyetler öğrencilerin kişisel gelişimine, takım ruhuna ve toplumsal duyarlılık kazanmalarına büyük katkı sağlamıştır.",
        "Faaliyetlerin tamamı e-Okul Sosyal Etkinlik Modülüne işlenmiş olup yıllık çalışma dosyası okul idaresine teslim edilmiştir."
    ]

def build_catalog():
    result = []
    for c in CLUBS_DEFINITIONS:
        item = {
            "id": c["id"],
            "name": c["name"],
            "filename": f"{c['id']}.docx",
            "tuzukParas": generate_tuzuk_paras(c),
            "toplantiParas": generate_toplanti_paras(c),
            "planParas": generate_plan_paras(c),
            "monthlyPlanTable": [
                {"ay": row[0], "faaliyet": row[1]} for row in c["monthly_plan"]
            ],
            "ogrenciParas": generate_student_paras(c),
            "veliParas": generate_veli_paras(c),
            "raporParas": generate_rapor_paras(c),
            "faaliyetTable": [
                {"aylar": row[0], "faaliyetler": row[1]} for row in c["activity_table"]
            ]
        }
        result.append(item)
    return result

if __name__ == "__main__":
    catalog = build_catalog()
    output_path = "data/club-documents.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(catalog, f, ensure_ascii=False, indent=2)
    print(f"Başarıyla {len(catalog)} adet kulüp belgesi hatasız, düzenli ve zengin içerikle '{output_path}' dosyasına kaydedildi!")
