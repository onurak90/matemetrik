#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
MEB Sosyal Etkinlikler Yönetmeliği Standartlarında
Tüm 38 Sosyal Kulüp İçin Eksiksiz ve Zengin Belgeler Üreteci
"""

import json
import os

# 18 New Club Definitions
NEW_CLUBS_DEFINITIONS = [
    {
        "id": "engellilerle-dayanisma",
        "name": "Engellilerle Dayanışma Kulübü",
        "short_name": "Engellilerle Dayanışma",
        "purpose": "Öğrencilerde özel gereksinimli bireylere karşı empati, toplumsal duyarlılık ve engelsiz yaşam bilinci oluşturmak; engelli bireylerin haklarına saygı duymayı ve onların hayatını kolaylaştırıcı çözümler üretmeyi sağlamak.",
        "scope": "3 Aralık Dünya Engelliler Günü, 10-16 Mayıs Engelliler Haftası, okul içi erişilebilirlik incelemeleri, işaret dili temel eğitimi, empati parkurları ve farkındalık seminerleri.",
        "topics": "Engelli Hakları, Braille Alfabesi ve İşaret Dili, Erişilebilirlik ve Evrensel Tasarım, Empati ve Dayanışma, Sosyal Yaşama Eşit Katılım.",
        "community_service": "Okul giriş ve rampalarının engelli kullanımına uygunluğunun denetlenmesi ve yerel engelliler derneğine tekerlekli sandalye veya beyaz baston desteği sağlanması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp genel kurulunun toplanması; yönetim ve denetim kurullarının seçimi; yıllık çalışma planının hazırlanarak okul müdürünün onayına sunulması; Sosyal Etkinlik Modülüne üye kayıtlarının yapılması."),
            ("EKİM", "Okul genelinde engellilik ve erişilebilirlik farkındalık panosunun hazırlanması; 'Farklılıklarımız Zenginliğimizdir' temalı bilgilendirme sunumu yapılması."),
            ("KASIM", "3 Aralık Dünya Engelliler Günü hazırlıklarının başlatılması; okul koridorları ve rampalarının engelli erişilebilirliği açısından incelenmesi."),
            ("ARALIK", "3 Aralık Dünya Engelliler Günü okul programının icra edilmesi; empati parkuru kurulması; Braille alfabesi ve Türk İşaret Dili tanıtım atölyesi."),
            ("OCAK", "1. Dönem kulüp etkinliklerinin değerlendirilmesi; karar defterinin işlenmesi ve 1. dönem faaliyet raporunun hazırlanması."),
            ("ŞUBAT", "2. Dönem başı kurul toplantısı; 10-16 Mayıs Engelliler Haftası için toplum hizmeti projesinin planlanması."),
            ("MART", "Özel eğitim sınıfları veya özel gereksinimli bireyler derneği ile kardeşlik köprüsü kurulması; ortak resim ve sanat etkinliği düzenlenmesi."),
            ("NİSAN", "23 Nisan Çocuk Bayramı şenliklerinde tüm çocukların birlikte oynayabileceği kapsayıcı oyun istasyonlarının kurulması."),
            ("MAYIS", "10-16 Mayıs Engelliler Haftası münasebetiyle panel düzenlenmesi; paralimpik sporcularla söyleşi yapılması; tekerlekli sandalye desteği teslimi."),
            ("HAZİRAN", "Yıl sonu faaliyet raporunun hazırlanması; e-Okul Sosyal Etkinlik Modülünün tamamlanması ve kulüp evrak dosyasının idareye teslim edilmesi.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp yönetimi oluşturuldu, yıllık plan onaylandı, okul panosunda erişilebilirlik farkındalığı başlatıldı."),
            ("KASIM - ARALIK", "3 Aralık Dünya Engelliler Günü programı icra edildi, empati parkuru ve işaret dili atölyesi düzenlendi."),
            ("OCAK - ŞUBAT", "1. Dönem çalışmaları değerlendirildi, 2. dönem toplum hizmeti yardım kampanyası kararlaştırıldı."),
            ("MART - NİSAN", "Özel eğitim öğrencileriyle kaynaşma atölyesi yapıldı, 23 Nisan kapsayıcı oyun etkinlikleri organize edildi."),
            ("MAYIS - HAZİRAN", "Engelliler Haftası paneli ve bağış teslimi tamamlandı, yıl sonu faaliyet raporu okul idaresine sunuldu.")
        ]
    },
    {
        "id": "muzik",
        "name": "Müzik Kulübü",
        "short_name": "Müzik",
        "purpose": "Öğrencilere müzik sevgisi, ritim algısı, ses ve enstrüman estetiği kazandırmak; Türk ve dünya müzik kültürünü tanıtarak çok sesli koro ve enstrüman toplulukları oluşturmak.",
        "scope": "Okul korosu çalışmaları, solo ve enstrümantal dinletiler, milli bayram ve anma günleri müzik icraları, ritim atölyeleri ve konser etkinlikleri.",
        "topics": "Ritim Eğitimi, Koro Şarkıları, Türk Halk ve Sanat Müziği, Klasik Müzik Eserleri, Enstrüman Bakımı ve Sahne Duruşu.",
        "community_service": "Okul genelinde ve kardeş okullarda moral dinletileri düzenlenmesi, müzik aletlerinin korunması ve bakımının yapılması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp genel kurulunun toplanması; yönetim ve denetim organlarının seçimi; koro ve orkestra seçmelerinin yapılması; yıllık planın idareye sunulması."),
            ("EKİM", "29 Ekim Cumhuriyet Bayramı koro provası çalışmalarına başlanması; marşlar ve ritim eğitimlerinin verilmesi; müzik odası düzeni."),
            ("KASIM", "10 Kasım Atatürk'ü Anma ve 24 Kasım Öğretmenler Günü için özel solo ve koro müzik dinletisi hazırlanması ve sahnelenmesi."),
            ("ARALIK", "Türk Halk Müziği ve Türk Sanat Müziği makam ve çalgılarının tanıtımı; okul içi mini enstrüman dinletileri serisi."),
            ("OCAK", "1. Dönem müzik çalışmalarının ve koro performanslarının değerlendirilmesi; 1. dönem faaliyet raporunun düzenlenmesi."),
            ("ŞUBAT", "2. Dönem çalışma takviminin güncellenmesi; bahar dönemi okul müzik konseri repertuvarının belirlenmesi."),
            ("MART", "12 Mart İstiklal Marşı'nın Kabulü ve 18 Mart Çanakkale Zaferi anısına kahramanlık türküleri korosunun sahnelenmesi."),
            ("NİSAN", "23 Nisan Ulusal Egemenlik ve Çocuk Bayramı kutlamalarında çocuk şarkıları korosunun gösteri sunması; ritim atölyesi."),
            ("MAYIS", "Yıl sonu okul müzik şenliği ve büyük konser icrası; kardeş okul veya huzurevinde müzikal moral konseri verilmesi."),
            ("HAZİRAN", "Yıl sonu faaliyet raporunun hazırlanması; e-Okul Sosyal Etkinlik Modülü veri girişlerinin tamamlanarak dosyanın idareye sunulması.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp organları seçildi, koro ses taramaları yapıldı, 29 Ekim Cumhuriyet Bayramı marş provaları tamamlandı."),
            ("KASIM - ARALIK", "10 Kasım ve Öğretmenler Günü dinletileri icra edildi, geleneksel müzik aletleri atölyesi düzenlendi."),
            ("OCAK - ŞUBAT", "1. Dönem çalışmaları değerlendirildi, bahar dönemi koro repertuvarı ve konser hazırlıkları başlatıldı."),
            ("MART - NİSAN", "Çanakkale anma korosu ve 23 Nisan çocuk şarkıları konseri başarıyla sahnelendi."),
            ("MAYIS - HAZİRAN", "Okul büyük yıl sonu müzik şenliği yapıldı, moral dinletisi icra edildi ve faaliyet raporu teslim edildi.")
        ]
    },
    {
        "id": "kultur-ve-edebiyat",
        "name": "Kültür ve Edebiyat Kulübü",
        "short_name": "Kültür ve Edebiyat",
        "purpose": "Türk dili ve edebiyatının seçkin eserlerini öğrencilere tanıtmak; okuma sevgisi, yaratıcı yazarlık, güzel ve etkili konuşma (diksiyon ve hitabet) yeteneklerini geliştirmek.",
        "scope": "Şiir dinletileri, edebiyat dergisi / okul bülteni yayını, kitap tahlilleri, yazar söyleşileri ve münazara etkinlikleri.",
        "topics": "Türk ve Dünya Edebiyatı Klasikleri, Şiir ve Diksiyon, Yaratıcı Yazarlık, Eleştirel Okuma, Dilimizin Zenginlikleri.",
        "community_service": "Okul kütüphanesine edebiyat köşesi kazandırılması ve ilkokul sınıflarına masal anlatıcılığı seansları yapılması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp genel kurulunun toplanması; yönetim ve denetim kurullarının seçilmesi; yıllık çalışma planının onaylanması; okul panosunun edebiyat köşesi olarak düzenlenmesi."),
            ("EKİM", "'Dilimizin Zenginlikleri' projesi kapsamında deyimler ve atasözleri sergisinin açılması; 29 Ekim Cumhuriyet Bayramı şiir yarışması düzenlenmesi."),
            ("KASIM", "10 Kasım ve 24 Kasım münasebetiyle okul içi kompozisyon ve şiir yarışması organize edilmesi; dereceye giren eserlerin panoda sergilenmesi."),
            ("ARALIK", "Ayın Kitabı tahlil atölyesi; Türk edebiyatından seçme bir klasik eserin (Örn: Ömer Seyfettin, Sait Faik) incelenmesi ve münazara etkinliği."),
            ("OCAK", "1. Dönem edebiyat bülteninin basılması veya dijital ortamda yayımlanması; 1. dönem faaliyet raporunun hazırlanması."),
            ("ŞUBAT", "2. Dönem çalışmaları; 21 Mart Dünya Şiir Günü hazırlıklarının başlatılması; şiir dinletisi metinlerinin ve fon müziklerinin seçimi."),
            ("MART", "12 Mart İstiklal Marşı ve Mehmet Akif Ersoy'u anma programı; 21 Mart Dünya Şiir Günü okul içi büyük şiir dinletisi icrası."),
            ("NİSAN", "23 Nisan Dünya Kitap Günü ve Kütüphaneler Haftası etkinlikleri; yazar veya şair davet edilerek imza ve söyleşi günü düzenlenmesi."),
            ("MAYIS", "Okul edebiyat dergisinin yıl sonu sayısının yayımlanması; 'Genç Kalemler' öykü yarışması ödül töreni; kardeş okula kitap bağışı."),
            ("HAZİRAN", "Yıl sonu faaliyet raporunun hazırlanması; e-Okul Sosyal Etkinlik Modülüne verilerin kaydedilmesi ve kulüp dosyasının teslimi.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp organları belirlendi, Dilimizin Zenginlikleri sergisi ve Cumhuriyet konulu şiir yarışması açıldı."),
            ("KASIM - ARALIK", "Atatürk ve Öğretmenler Günü yarışmaları sonuçlandırıldı, kitap tahlili ve münazara oturumu yapıldı."),
            ("OCAK - ŞUBAT", "1. Dönem edebiyat bülteni çıkarıldı, 2. dönem şiir dinletisi hazırlıklarına başlandı."),
            ("MART - NİSAN", "Mehmet Akif Ersoy anma programı ve 21 Mart Dünya Şiir Günü dinletisi gerçekleştirildi, yazar söyleşisi yapıldı."),
            ("MAYIS - HAZİRAN", "Okul edebiyat dergisi yayımlandı, kardeş okula kitap bağışı yapıldı ve faaliyet raporu tamamlandı.")
        ]
    },
    {
        "id": "uzay-ve-havacilik",
        "name": "Uzay ve Havacılık Kulübü",
        "short_name": "Uzay ve Havacılık",
        "purpose": "Öğrencilere uzay bilimleri, astronomi, havacılık ve roket teknolojilerine ilgi uyandırmak; gökyüzü gözlemleri, model uçak yapımı ve bilimsel merakı geliştirmek.",
        "scope": "Güneş sistemi ve derin uzay araştırmaları, teleskopla gece/gündüz gözlemleri, model uçak ve roket atölyeleri, TEKNOFEST havacılık projeleri.",
        "topics": "Astronomi ve Gezegenler, Havacılık Tarihi, İHA ve Dron Teknolojileri, Roket Dinamiği, Türk Havacılık Öncüleri (Vecihi Hürkuş, Nuri Demirağ).",
        "community_service": "Okul bahçesinde tüm öğrencilere açık 'Gökyüzü Gözlem Günü' düzenlenerek teleskopla ay ve gezegen gözlemi yaptırılması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp organlarının seçimi, çalışma planının onaylanması; astronomi ve havacılık ilgi gruplarının (roket, dron, gökyüzü gözlemi) oluşturulması."),
            ("EKİM", "4-10 Ekim Dünya Uzay Haftası kutlama programı; uzay araştırmaları tarihi ve yapay uydular konulu okul panosu hazırlanması."),
            ("KASIM", "Model roket ve serbest uçuş model uçak yapım atölyesi; aerodinamik ve kaldırma kuvveti ilkelerinin deneysel incelenmesi."),
            ("ARALIK", "Güneş Sistemi gezegenleri ve derin uzay teleskopları (Hubble, James Webb) belgesel gösterimi ve soru-cevap çalıştayı."),
            ("OCAK", "1. Dönem roket ve model uçak tasarımlarının test edilmesi; 1. dönem değerlendirme raporunun tanzimi."),
            ("ŞUBAT", "2. Dönem TEKNOFEST veya bölgesel model uçak yarışmaları hazırlıkları; simülasyon ve dron kodlama çalışmaları."),
            ("MART", "Ay ve yıldız haritası okuma atölyesi; ilkbahar ekinoksu ve mevsimlerin oluşumu üzerine bilimsel modelleme sunumu."),
            ("NİSAN", "Okul bahçesinde 'Büyük Gökyüzü Gözlem Günü'; teleskop ile Güneş lekeleri, Ay kraterleri ve gezegen gözlemi yaptırılması."),
            ("MAYIS", "Okul bahçesinde fırlatma şenliği; basınçlı su roketleri ve model uçak yarışması icrası; katılım sertifikaları takdimi."),
            ("HAZİRAN", "Yıl sonu uzay sergisi düzenlenmesi; e-Okul Sosyal Etkinlik Modülünün işlenmesi ve yıl sonu faaliyet raporunun teslimi.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp yönetimi belirlendi, 4-10 Ekim Dünya Uzay Haftası panosu ve etkinlikleri gerçekleştirildi."),
            ("KASIM - ARALIK", "Model uçak ve roket atölyesi yapıldı, derin uzay teleskopları bilgilendirme sunumu yapıldı."),
            ("OCAK - ŞUBAT", "1. Dönem çalışmaları değerlendirildi, havacılık ve dron simülasyon eğitimleri planlandı."),
            ("MART - NİSAN", "Teleskopla gökyüzü gözlem günü düzenlendi, Ay ve gezegen gözlemleri tüm okula sunuldu."),
            ("MAYIS - HAZİRAN", "Su roketi ve model uçak yarışması yapıldı, yıl sonu uzay sergisi ve faaliyet raporu tamamlandı.")
        ]
    },
    {
        "id": "girisimcilik",
        "name": "Girişimcilik Kulübü",
        "short_name": "Girişimcilik",
        "purpose": "Öğrencilere yenilikçi düşünme, problem çözme, iş fikri geliştirme, finansal okuryazarlık ve ekip çalışması liderliği becerileri kazandırmak.",
        "scope": "İş modeli kanvası hazırlama, sosyal girişimcilik projeleri, girişimci davet söyleşileri, okul içi fikir maratonu (hackathon) ve mini iş planı yarışmaları.",
        "topics": "Fikir Üretimi (Brainstorming), Finansal Okuryazarlık ve Bütçe, Sosyal Girişimcilik, Sunum Becerileri (Pitching), Pazarlama ve İnovasyon.",
        "community_service": "Okul içi sürdürülebilir bir sosyal girişim projesi tasarlayarak gelirini ihtiyaç sahibi öğrencilere eğitim bursu olarak aktarmak.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp genel kurulunun toplanması; yönetim ve denetim kurullarının seçilmesi; yıllık çalışma planının hazırlanarak onaylanması."),
            ("EKİM", "Girişimcilik nedir, inovasyon ve problem çözme temelleri; beyin fırtınası yöntemiyle okul ve çevre sorunlarına iş fikirleri geliştirme."),
            ("KASIM", "Küresel Girişimcilik Haftası etkinlikleri; başarılı Türk girişimcilerin başarı hikayelerinin incelenmesi ve panoda sergilenmesi."),
            ("ARALIK", "İş Modeli Kanvası (Business Model Canvas) eğitimi; öğrencilerin takımlar halinde mini iş fikri tasarlaması ve bütçelemesi."),
            ("OCAK", "1. Dönem takımlarının iş fikirleri ön sunumları; 1. dönem kulüp faaliyet raporunun hazırlanması."),
            ("ŞUBAT", "2. Dönem çalışma planı; sosyal girişimcilik nedir, kâr amacı gütmeyen toplumsal fayda projeleri nasıl kurgulanır eğitimi."),
            ("MART", "Yerel bir kadın kooperatifi veya teknoloji girişimcisiyle çevrim içi ya da yüz yüze söyleşi; girişimcilik ekosistemi tanıtımı."),
            ("NİSAN", "Okul içi 'Fikir Maratonu (Mini Hackathon)'; sürdürülebilirlik odaklı çevre ve eğitim projeleri yarışması."),
            ("MAYIS", "Okul kermesinde öğrencilerin kendi ürettikleri el emeği veya geri dönüştürülmüş ürünleri pazarladıkları 'Girişimci Çocuklar Standı' açılması; gelirin bağışlanması."),
            ("HAZİRAN", "Yıl sonu girişimcilik değerlendirme raporunun düzenlenmesi; Sosyal Etkinlik Modülüne işlenmesi ve idareye teslimi.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp kuruldu, yönetim belirlendi, inovasyon ve iş fikri geliştirme yöntemleri işlendi."),
            ("KASIM - ARALIK", "Küresel Girişimcilik Haftası kutlandı, İş Modeli Kanvası atölyesi tamamlandı."),
            ("OCAK - ŞUBAT", "1. Dönem fikirleri değerlendirildi, sosyal girişimcilik ve toplumsal fayda modelleri incelendi."),
            ("MART - NİSAN", "Girişimci söyleşisi organize edildi, okul içi mini fikir maratonu icra edildi."),
            ("MAYIS - HAZİRAN", "Girişimci çocuklar standı açılıp geliri bağışlandı, yıl sonu faaliyet raporu teslim edildi.")
        ]
    },
    {
        "id": "enerji-verimliligi",
        "name": "Enerji Verimliliği Kulübü",
        "short_name": "Enerji Verimliliği",
        "purpose": "Enerjinin akılcı ve verimli kullanımı bilincini yerleştirmek; fosil yakıtların yerine yenilenebilir enerji kaynaklarının önemini kavramak ve okulda enerji tasarrufu denetimleri yapmak.",
        "scope": "11-17 Ocak Enerji Tasarrufu Haftası etkinlikleri, okul enerji denetimi (enerji avcıları), güneş ve rüzgar enerjisi deneyleri, su ve elektrik tasarrufu afişleri.",
        "topics": "Yenilenebilir Enerji (Güneş, Rüzgar, Jeotermal), Karbon Ayak İzi, Isı Yalıtımı ve LED Aydınlatma, Akıllı Şebekeler, Evde ve Okulda Enerji Tasarrufu.",
        "community_service": "Okul genelinde 'Gereksizse Söndür' enerji nöbetçileri sistemi kurularak okul elektrik ve su tüketiminin aylık takibinin yapılması ve raporlanması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp organlarının seçimi; yıllık çalışma planının onaylanması; okul enerji denetçileri (Enerji Avcıları) grubunun kurulması."),
            ("EKİM", "Enerji kaynakları (yenilenebilir ve fosil kaynaklar) bilgilendirme panosu; okul elektrik ve su sayaçlarının başlangıç ölçümlerinin alınması."),
            ("KASIM", "Isı yalıtımı, pencere/kapı sızdırmazlıkları ve LED aydınlatmanın enerji tasarrufundaki yeri; sınıflara 'Gereksizse Söndür' uyarı etiketlerinin asılması."),
            ("ARALIK", "Enerji Verimliliği Haftası (Ocak ayı) hazırlıkları; okul çapında afiş ve slogan yarışması duyurusu; karbon ayak izi hesaplama atölyesi."),
            ("OCAK", "11-17 Ocak Enerji Verimliliği Haftası kutlamaları; afiş sergisi ve kazanan öğrencilere ödül verilmesi; 1. dönem faaliyet raporu."),
            ("ŞUBAT", "2. Dönem çalışma planı; güneş enerjili şarj aleti veya rüzgar türbini mini maket atölyesi başlatılması."),
            ("MART", "Okul içi enerji tasarruf denetim raporunun incelenmesi; 1. dönem elektrik ve su faturalarının karşılaştırmalı analizi."),
            ("NİSAN", "Dünya Günü (22 Nisan) kapsamında 'Karbon Ayak İzini Küçült' semineri; çevreye duyarlı enerji tüketim alışkanlıkları sunumu."),
            ("MAYIS", "Okul bahçesinde güneş enerjisiyle su ısıtma ve fırın deneyi yapılması; velilere yönelik evde enerji tasarrufu kılavuzunun dağıtılması."),
            ("HAZİRAN", "Yıl sonu enerji tasarruf bilançosunun çıkarılması; okul idaresine tasarruf önerileri raporu ve yıl sonu dosyasının sunulması.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp yönetimi seçildi, Enerji Avcıları timi kuruldu ve okul panosu hazırlandı."),
            ("KASIM - ARALIK", "Tasarruf etiketleri asıldı, karbon ayak izi hesaplama atölyesi ve afiş yarışması düzenlendi."),
            ("OCAK - ŞUBAT", "Enerji Verimliliği Haftası kutlandı, ödüller verildi ve mini yenilenebilir enerji maketleri yapıldı."),
            ("MART - NİSAN", "Tüketim faturaları analiz edildi, 22 Nisan Dünya Günü enerji tasarrufu semineri verildi."),
            ("MAYIS - HAZİRAN", "Güneş fırını deneyi yapıldı, veli tasarruf bülteni dağıtıldı ve yıl sonu raporu teslim edildi.")
        ]
    },
    {
        "id": "satranc",
        "name": "Satranç Kulübü",
        "short_name": "Satranç",
        "purpose": "Öğrencilerin mantıksal ve stratejik düşünme, odaklanma, öngörü, sabır ve sportmence rekabet yeteneklerini satranç sporu aracılığıyla en üst düzeye çıkarmak.",
        "scope": "Satranç açılış teorileri, taktik motifler (çatal, şiş, açmaz), mat kalıpları, okul içi turnuvalar ve MEB/TSF okul sporları il/ilçe şampiyonalarına katılım.",
        "topics": "Açılış Prensipleri, Taktik Hücum ve Savunma, Oyun Sonu Stratejileri, Saatli Maç Yönetimi, Fair-Play ve Sporcu Ahlakı.",
        "community_service": "Okul bahçesinde zemin üzerine dev satranç alanı boyanması ve teneffüslerde açık satranç istasyonları kurulması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp organlarının seçimi; satranç odası materyallerinin (takım, saat, demonstrasyon tahtası) kontrolü; yıllık planın idareye sunulması."),
            ("EKİM", "Temel açılış prensipleri (merkeze hakimiyet, hafif taşların gelişimi, rok atma güvenliği); taktik hücum motifleri (çatal, şiş, açmaz)."),
            ("KASIM", "Kombinezon çözme pratikleri; savunma teknikleri ve taş fedaları analizi; 24 Kasım Öğretmenler Günü hızlı satranç gösteri maçı."),
            ("ARALIK", "Oyun sonu stratejileri (piyon finalleri, kale finalleri, temel mat kalıpları); dijital satranç platformları ve analiz yazılımları eğitimi."),
            ("OCAK", "1. Dönem sınıf içi mini satranç turnuvaları; okul satranç takımı aday kadrosunun belirlenmesi; 1. dönem raporu."),
            ("ŞUBAT", "2. Dönem çalışmaları; satranç saati kullanımı, notasyon tutma kuralları ve turnuva psikolojisi semineri."),
            ("MART", "MEB Okul Sporları ve TSF İl/İlçe Satranç Turnuvasına okul takımıyla katılım sağlanması; maç analizleri oturumu."),
            ("NİSAN", "Geleneksel Okul İçi Büyük Bahar Satranç Turnuvası organizasyonu (İsviçre Sistemi 5 tur); final maçları ve kupa töreni."),
            ("MAYIS", "Okul bahçesinde dev zemin satrancı gösteri maçı; usta oyuncu davet edilerek eş zamanlı (simültane) maç gösterisi yapılması."),
            ("HAZİRAN", "Yıl boyu elde edilen turnuva başarılarının okul bülteninde paylaşılması; yıl sonu faaliyet raporunun idareye teslimi.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp kuruldu, malzeme sayımı yapıldı, açılış ve temel taktik prensipleri işlendi."),
            ("KASIM - ARALIK", "Oyun sonu ve mat analizleri yapıldı, analiz yazılımları ile kombinezon çalışmaları tamamlandı."),
            ("OCAK - ŞUBAT", "Sınıf turnuvaları yapıldı, okul takımı seçildi ve saatli notasyon kuralları öğretildi."),
            ("MART - NİSAN", "İlçe Okul Sporları Satranç Şampiyonasına katılım sağlandı, okul içi büyük turnuva düzenlendi."),
            ("MAYIS - HAZİRAN", "Bahçe satrancı ve simültane gösteri maçı yapıldı, madalyalar verildi ve faaliyet raporu sunuldu.")
        ]
    },
    {
        "id": "izcilik",
        "name": "İzcilik Kulübü",
        "short_name": "İzcilik",
        "purpose": "Öğrencilere doğada bağımsız yaşam becerileri, ekip çalışması, karakter gelişimi, çevreye saygı ve ilk yardım yeteneklerini izcilik türe ve töresi çerçevesinde kazandırmak.",
        "scope": "İzci düğümleri, yön bulma ve pusula kullanımı, çadır kurma, doğa yürüyüşü (trekking), kampçılık ve açık hava hayatta kalma atölyeleri.",
        "topics": "İzci Andı ve Türesi, Harita ve Pusula Okuma, Düğüm ve Bağlar, Doğada İlkyardım ve Barınma, Ateş Yakma ve Güvenlik.",
        "community_service": "Okul çevresindeki ormanlık ve park alanlarında çevre temizliği yürüyüşü ve kuş yemlikleri montajı yapılması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp genel kurulu, oba ve ünite liderlerinin seçimi; izcilik felsefesi ve İzci Türesi ve Andının okunması; yıllık planın onaylanması."),
            ("EKİM", "Temel izci düğümleri atölyesi (camadan, sancak, kazık, balıkçı düğümleri); izci selamı, marşları ve tören nizamı eğitimi."),
            ("KASIM", "Yön bulma ve doğada iz sürme; pusula kullanımı ve kerteriz alma; gök cisimleri ve doğa işaretleriyle yön tayini."),
            ("ARALIK", "Çadır çeşitleri, çadır kurma ve toplama teknikleri; sırt çantası hazırlama ve mat-uyku tulumu düzeni uygulaması."),
            ("OCAK", "Doğada ilk yardım bilinci; hipotermi, burkulma, kesik ve yanıklarda ilkyardım çantası kullanımı; 1. dönem değerlendirme raporu."),
            ("ŞUBAT", "2. Dönem izci çalışma takviminin netleştirilmesi; doğa yürüyüşü (trekking) ve günübirlik kamp hazırlıkları; izin belgelerinin toplanması."),
            ("MART", "Doğa yürüyüşü ve doğayı tanıma parkuru faaliyeti; çevre temizliği ve doğada ayak izi bırakmama (Leave No Trace) ilkesi uygulaması."),
            ("NİSAN", "Ateş çeşitleri (piramit, avcı ateşi), güvenlik önlemleri ve doğada ilkel barınak (bivak) yapımı atölyesi."),
            ("MAYIS", "Okul bahçesinde veya uygun kamp alanında 'Günübirlik İzci Kampı' düzenlenmesi; istasyon oyunları, kamp ateşi ve marşlar gecesi."),
            ("HAZİRAN", "İzci üniformaları ve kamp teçhizatının bakımı; yıl sonu faaliyet raporunun hazırlanarak okul idaresine teslim edilmesi.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Oba liderleri belirlendi, izci andı ve temel düğüm atölyeleri gerçekleştirildi."),
            ("KASIM - ARALIK", "Pusula ve yön bulma pratikleri yapıldı, çadır kurma ve çanta hazırlama eğitimi verildi."),
            ("OCAK - ŞUBAT", "Doğada ilkyardım ve hipotermi önlemleri işlendi, 2. dönem doğa yürüyüşü planlandı."),
            ("MART - NİSAN", "Doğa yürüyüşü ve çevre temizliği yapıldı, barınak ve güvenli ateş teknikleri öğretildi."),
            ("MAYIS - HAZİRAN", "Okul günübirlik izci kampı ve kamp ateşi programı başarıyla yapıldı, faaliyet raporu teslim edildi.")
        ]
    },
    {
        "id": "is-sagligi-ve-guvenligi",
        "name": "İş Sağlığı ve Güvenliği Kulübü",
        "short_name": "İş Sağlığı ve Güvenliği",
        "purpose": "6331 sayılı İş Sağlığı ve Güvenliği Kanunu kapsamında okul ortamındaki fiziksel riskleri tespit etmek; güvenli okul kültürü, kaza önleme ve acil durum tahliye bilincini aşılamak.",
        "scope": "4-10 Mayıs İş Sağlığı ve Güvenliği Haftası etkinlikleri, okul risk değerlendirme haritası çıkarma, kayma/düşme tehlikelerine karşı uyarı levhaları asma, yangın ve acil durum tatbikatları.",
        "topics": "İş Güvenliği Levha ve İşaretleri, Kişisel Koruyucu Donanımlar (KKD), Ergonomi, Okul Kazalarını Önleme, Acil Durum Tahliye Planı.",
        "community_service": "Okul atölyeleri, laboratuvarları ve spor salonunda risk değerlendirme kontrol listesi uygulanması ve idareye iyileştirme raporu sunulması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp genel kurulunun toplanması; yönetim ve denetim kurullarının seçimi; yıllık planın hazırlanması; okul İSG sorumlusu ile koordinasyon."),
            ("EKİM", "6331 sayılı İSG Kanunu ve okul güvenliği kavramları; acil çıkış yönlendirmeleri, yangın tüpleri ve ilk yardım dolaplarının kontrolü."),
            ("KASIM", "Okulda düşme, kayma, çarpma riskleri ve ergonomik oturma düzeni; sınıflara ve merdivenlere uyarı şeritleri ve güvenlik levhaları yerleştirilmesi."),
            ("ARALIK", "Doğal afet ve acil durum tahliye planı incelemesi; okul tahliye tatbikatı öncesi sınıf temsilcilerine acil durum toplanma alanı eğitimi."),
            ("OCAK", "1. Dönem risk değerlendirme kontrol formlarının doldurulması; okul idaresine önlem tavsiye raporu sunulması; 1. dönem raporu."),
            ("ŞUBAT", "2. Dönem çalışma planı; laboratuvarlar, atölyeler ve spor salonunda kimyasal ve fiziksel güvenlik kuralları atölyesi."),
            ("MART", "1-7 Mart Deprem Haftası kapsamında okul genelinde 'Çök-Kapan-Tutun' ve Acil Tahliye Tatbikatının başarıyla organize edilmesi."),
            ("NİSAN", "Elektrik güvenliği, ıslak zemin riskleri ve kişisel koruyucu donanımlar (baret, eldiven, koruyucu gözlük) tanıtım standı açılması."),
            ("MAYIS", "4-10 Mayıs İş Sağlığı ve Güvenliği Haftası kutlamaları; 'Güvenli Okul, Sağlıklı Gelecek' resim ve afiş sergisi düzenlenmesi."),
            ("HAZİRAN", "Okul İSG yıllık değerlendirme raporunun tamamlanması; e-Okul Sosyal Etkinlik Modülünün işlenmesi ve dosyanın teslimi.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp kuruldu, acil durum levhaları ve yangın tüpleri kontrol edildi, İSG panosu hazırlandı."),
            ("KASIM - ARALIK", "Merdiven kaydırmaz bantları denetlendi, acil tahliye planı bilgilendirmesi yapıldı."),
            ("OCAK - ŞUBAT", "1. Dönem risk formları değerlendirildi, fen laboratuvarı güvenlik kuralları incelendi."),
            ("MART - NİSAN", "Deprem ve yangın tahliye tatbikatı icra edildi, elektrik ve kişisel donanım güvenliği anlatıldı."),
            ("MAYIS - HAZİRAN", "İSG Haftası etkinlikleri ve afiş sergisi yapıldı, yıl sonu faaliyet raporu idareye sunuldu.")
        ]
    },
    {
        "id": "meslek-tanitma",
        "name": "Meslek Tanıtma Kulübü",
        "short_name": "Meslek Tanıtma",
        "purpose": "Öğrencilerin geleceğin mesleklerini, kariyer alanlarını ve eğitim yollarını tanımasını sağlamak; yetenek ve ilgilerine uygun bilinçli lise ve üniversite tercihi yapmalarına rehberlik etmek.",
        "scope": "Meslek erbapları ve uzman söyleşileri, kariyer günleri paneli, üniversite ve meslek lisesi tanıtım gezileri, mesleki kişilik envanteri uygulamaları.",
        "topics": "Geleceğin Meslekleri (Yapay Zeka Uzmanlığı, Yazılım, Biyoteknoloji), Geleneksel ve Sanatsal Meslekler, Kariyer Planlama, Girişimcilik ve Staj İmkânları.",
        "community_service": "Okul kütüphanesine 'Kariyer ve Meslekler Rehberi' bülteni kazandırılarak 8. ve 12. sınıf öğrencilerine meslek tercih kılavuzu dağıtılması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp organlarının seçimi; yıllık çalışma planının hazırlanması; öğrencilerin ilgi duyduğu meslek alanlarına yönelik anket çalışması."),
            ("EKİM", "Sağlık sektörü meslekleri (Tıp, Diş Hekimliği, Eczacılık, Hemşirelik, Fizyoterapi) tanıtımı; okul panosunun düzenlenmesi."),
            ("KASIM", "Mühendislik ve teknoloji meslekleri (Yazılım, Yapay Zeka, Elektrik-Elektronik, Makine, Havacılık Mühendisliği) sunumu ve söyleşi."),
            ("ARALIK", "Hukuk, adalet ve kamu yönetimi meslekleri (Hâkimlik, Savcılık, Avukatlık, Noterlik, Kaymakamlık) tanıtım oturumu."),
            ("OCAK", "1. Dönem meslek tanıtım etkinliklerinin değerlendirilmesi; öğrencilerin mesleki eğilim profillerinin gözden geçirilmesi; 1. dönem raporu."),
            ("ŞUBAT", "2. Dönem kariyer günleri takviminin netleştirilmesi; mezun öğrencilerin ve alanında başarılı uzmanların panele davet edilmesi."),
            ("MART", "Sanat, tasarım ve iletişim meslekleri (Grafik Tasarım, Mimarlık, Çizgi Film/Animasyon, Gazetecilik, Sinema-TV) atölyesi."),
            ("NİSAN", "Geleneksel ve zanaat meslekleri (Ahi Evran kültürü, el sanatları, gastronomi ve şeflik) tanıtımı; meslek lisesi/atölye gezisi."),
            ("MAYIS", "Okul 'Büyük Kariyer ve Meslekler Günü Fuarı'; farklı meslek temsilcilerinin stant açarak öğrencilerle birebir buluşması."),
            ("HAZİRAN", "Meslek Tanıtma Bülteninin basılarak 8. ve 12. sınıf öğrencilerine dağıtılması; yıl sonu faaliyet raporunun teslimi.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp yönetimi belirlendi, mesleki ilgi anketi yapıldı ve sağlık meslekleri tanıtıldı."),
            ("KASIM - ARALIK", "Mühendislik, yazılım ve hukuk alanlarında uzman konuklarla söyleşiler gerçekleştirildi."),
            ("OCAK - ŞUBAT", "1. Dönem çalışmaları değerlendirildi, 2. dönem kariyer günleri davetlileri organize edildi."),
            ("MART - NİSAN", "Mimarlık, sanat ve gastronomi meslekleri tanıtıldı, meslek atölyesi teknik gezisi yapıldı."),
            ("MAYIS - HAZİRAN", "Okul Kariyer Günü Fuarı başarıyla tamamlandı, meslek rehberi bülteni dağıtıldı ve rapor teslim edildi.")
        ]
    },
    {
        "id": "tiyatro",
        "name": "Tiyatro Kulübü",
        "short_name": "Tiyatro",
        "purpose": "Öğrencilerin rol oynama, empati, beden dili, sahne hakimiyeti ve diksiyon becerilerini geliştirmek; Türk tiyatrosunun seçkin oyunlarını sahneye koyarak sanatsal ifade güçlerini artırmak.",
        "scope": "27 Mart Dünya Tiyatro Günü etkinlikleri, doğaçlama atölyeleri, tiyatro metni okuma ve ezber çalışmaları, kostüm ve dekor tasarımı, yıl sonu tiyatro oyunu temsili.",
        "topics": "Temel Oyunculuk ve Diksiyon, Sahne Bilgisi ve Mimik, Geleneksel Türk Tiyatrosu (Karagöz-Hacivat, Meddah, Orta Oyunu), Dramatik Yazarlık.",
        "community_service": "Özel eğitim sınıfları veya yakın bir ilkokula Hacivat-Karagöz gölge oyunu gösterisi sergilenmesi.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp genel kurulu, yönetim seçimi; yıllık planın onaylanması; sahneye konulacak tiyatro oyunu metninin seçimi."),
            ("EKİM", "Temel oyunculuk, diksiyon, doğru nefes (diyafram) ve ses tonlama egzersizleri; beden dili ve mimik çalışmaları."),
            ("KASIM", "Doğaçlama (tuluat) atölyesi; canlandırma oyunları; seçilen tiyatro eserinin karakter analizleri ve rol dağılımının yapılması."),
            ("ARALIK", "Tiyatro metninin masa başı okuma provaları; telaffuz, durak ve duygu aktarımı çalışmaları; dekor ve kostüm komisyonu teşkili."),
            ("OCAK", "Sahne üstü yerleşim ve mizansen provalarının başlatılması; 1. dönem değerlendirme raporunun hazırlanması."),
            ("ŞUBAT", "2. Dönem sahne provalarının hızlandırılması; suflör, ışık ve ses efektlerinin provaya dahil edilmesi."),
            ("MART", "27 Mart Dünya Tiyatro Günü kutlama programı; tiyatro tarihi konulu okul panosu; Geleneksel Türk Tiyatrosu (Karagöz) gösterisi."),
            ("NİSAN", "Kostümlü ve dekorlu ana prova çalışmaları; sahne hakimiyeti ve replik akıcılığı denetimleri."),
            ("MAYIS", "Okul Büyük Tiyatro Oyununun konferans salonunda tüm veli ve öğrencilere başarıyla sahnelenmesi (Gala temsili)."),
            ("HAZİRAN", "Oyun ekibine teşekkür belgelerinin verilmesi; dekor ve kostümlerin tasnifi; yıl sonu faaliyet raporunun okul idaresine sunulması.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp kuruldu, oyun metni seçildi, diksiyon ve beden dili eğitimlerine başlandı."),
            ("KASIM - ARALIK", "Rol dağılımı yapıldı, masa başı okuma provaları ve karakter analizleri tamamlandı."),
            ("OCAK - ŞUBAT", "Sahne mizansen çalışmaları başlatıldı, ses ve ışık efektleri entegre edildi."),
            ("MART - NİSAN", "27 Mart Dünya Tiyatro Günü kutlandı, kostümlü genel provalar tamamlandı."),
            ("MAYIS - HAZİRAN", "Büyük tiyatro oyunu başarıyla sahnelendi, gala yapıldı ve faaliyet raporu idareye sunuldu.")
        ]
    },
    {
        "id": "medya-ve-iletisim",
        "name": "Medya ve İletişim Kulübü",
        "short_name": "Medya ve İletişim",
        "purpose": "Öğrencilere medya okuryazarlığı, eleştirel haber değerlendirme, dijital gazetecilik, fotoğrafçılık ve video prodüksiyonu becerilerini kazandırmak; dezenformasyona karşı bilinçli medya tüketicisi ve üreticisi yetiştirmek.",
        "scope": "Okul bülteni ve e-dergi çıkarma, okul etkinliklerinin haberleştirilmesi, röportaj ve fotoğraf çekimleri, sosyal medya etiği seminerleri.",
        "topics": "Medya Okuryazarlığı ve Haber Analizi, Dijital Fotoğrafçılık ve Video Kurgu, Dezenformasyon ve Yalan Haberle Mücadele, Basın Ahlakı ve Gazetecilik.",
        "community_service": "Okul içi faaliyetleri tarafsız ve düzenli biçimde duyuran dijital 'Okul Postası' haber bülteninin aylık olarak yayımlanması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp organlarının seçimi; yıllık çalışma planının hazırlanması; okul basın ve yayın ekibinin (muhabir, fotoğrafçı, editör) kurulması."),
            ("EKİM", "Medya okuryazarlığı nedir, haber yazım teknikleri (5N1K kuralı); okul web sitesi ve panosu için haber derleme atölyesi."),
            ("KASIM", "Temel fotoğrafçılık ve video çekim ilkeleri; kompozisyon, ışık ve açı kuralları; okul etkinliklerinin fotoğraf arşivinin oluşturulması."),
            ("ARALIK", "Sosyal medya etiği ve siber dezenformasyonla mücadele semineri; doğru bilgiye ulaşma ve teyit platformlarının tanıtımı."),
            ("OCAK", "Okul gazetesinin / e-dergisinin 1. Dönem sayısının tasarlanması ve yayımlanması; 1. dönem kulüp raporu."),
            ("ŞUBAT", "2. Dönem çalışma hedefleri; dijital ses kaydı, podcast ve röportaj teknikleri atölyesi başlatılması."),
            ("MART", "Okul müdürü, öğretmenler ve başarılı öğrencilerle video röportaj serisinin çekilmesi ve okul ekranlarında yayımlanması."),
            ("NİSAN", "23 Nisan Çocuk Şenlikleri basın masası kurularak gün boyu anlık canlı yayın metinleri ve fotoğraf bülteni hazırlanması."),
            ("MAYIS", "'Genç Muhabirler' okul haber fotoğrafı yarışması ve sergisi; yerel bir gazeteci davet edilerek medya söyleşisi düzenlenmesi."),
            ("HAZİRAN", "Okul yıllık bülteninin basılması; e-Okul Sosyal Etkinlik Modülünün tamamlanması ve yıl sonu faaliyet raporunun teslimi.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp kuruldu, yayın ekibi seçildi, 5N1K haber yazım eğitimi verildi."),
            ("KASIM - ARALIK", "Fotoğrafçılık teknikleri uygulandı, medya okuryazarlığı ve dezenformasyon semineri verildi."),
            ("OCAK - ŞUBAT", "1. Dönem e-dergisi yayımlandı, podcast ve röportaj atölyesi başlatıldı."),
            ("MART - NİSAN", "Okul içi röportaj serisi çekildi, 23 Nisan basın bülteni hazırlandı."),
            ("MAYIS - HAZİRAN", "Basın fotoğraf sergisi açıldı, yıl sonu okul gazetesi basıldı ve rapor teslim edildi.")
        ]
    },
    {
        "id": "yabanci-diller",
        "name": "Yabancı Diller Kulübü",
        "short_name": "Yabancı Diller",
        "purpose": "Öğrencilerin yabancı dil (İngilizce/Almanca) dinleme, konuşma ve yazma yetkinliklerini geliştirmek; dünya kültürlerini tanımak ve küresel iletişim özgüvenini artırmak.",
        "scope": "26 Eylül Avrupa Diller Günü kutlamaları, İngilizce konuşma (Speaking Cafe) kulübü, yabancı dilde kısa tiyatro skeçleri, kelime bilgi yarışmaları ve mektup arkadaşlığı.",
        "topics": "İletişimsel Yabancı Dil Becerileri, Kültürlerarası Etkileşim, Yabancı Dilde Münazara, Şarkı ve Şiir Çevirileri, Uluslararası Değişim Programları.",
        "community_service": "Okul koridorlarına İngilizce bilgilendirici yönlendirme ve kelime panoları hazırlanması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp organlarının seçimi; yıllık planın onaylanması; yabancı dil konuşma köşesi (English Speaking Corner) oluşturulması."),
            ("EKİM", "26 Eylül Avrupa Diller Günü kutlamaları; farklı dillerde selamlama ve temel ifadeler konulu okul panosu hazırlanması."),
            ("KASIM", "Yabancı dilde kelime hazinesi geliştirme oyunları (Taboo, Scrabble, Word Chain); şarkı sözleri çeviri atölyesi."),
            ("ARALIK", "İngilizce kısa skeçler ve diyalog çalışmaları; telaffuz (pronunciation) ve tonlama geliştirme pratikleri."),
            ("OCAK", "1. Dönem yabancı dil münazara oturumu; 'Teknolojinin İletişime Etkisi' temalı İngilizce münazara; 1. dönem raporu."),
            ("ŞUBAT", "2. Dönem çalışmaları; uluslararası kültürleri tanıma sunumları (İngiltere, Almanya, Kanada, Japonya kültür günleri)."),
            ("MART", "Dünya Masalları İngilizce canlandırma atölyesi; ilkokul öğrencilerine yönelik İngilizce masal saati düzenlenmesi."),
            ("NİSAN", "Okul içi İngilizce Kelime ve Heceleme Yarışması (Spelling Bee); kazanan öğrencilere sertifika ve yabancı dilde kitap ödülü."),
            ("MAYIS", "Yabancı Diller Şenliği (Language Festival); öğrencilerin hazırladığı İngilizce şarkı, şiir ve tiyatro gösterisinin sahnelenmesi."),
            ("HAZİRAN", "Yabancı dil kulübü yıl sonu bülteninin çıkarılması; Sosyal Etkinlik Modülü veri girişleri ve faaliyet raporunun teslimi.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp kuruldu, Speaking Corner oluşturuldu, 26 Eylül Avrupa Diller Günü panosu hazırlandı."),
            ("KASIM - ARALIK", "Kelime oyunları ve şarkı çevirileri yapıldı, telaffuz atölyesi tamamlandı."),
            ("OCAK - ŞUBAT", "İngilizce münazara oturumu yapıldı, dünya kültürleri tanıtım günleri organize edildi."),
            ("MART - NİSAN", "İlkokula İngilizce masal saati yapıldı, okul geneli Spelling Bee yarışması düzenlendi."),
            ("MAYIS - HAZİRAN", "Yabancı Diller Şenliği başarıyla icra edildi, kulüp bülteni dağıtıldı ve rapor teslim edildi.")
        ]
    },
    {
        "id": "su-elcileri",
        "name": "Su Elçileri Kulübü",
        "short_name": "Su Elçileri",
        "purpose": "Su kaynaklarının korunması, kuraklıkla mücadele, su ayak izi ve bilinçli su tüketimi konularında okulda ve çevrede öncü su elçileri yetiştirmek.",
        "scope": "22 Mart Dünya Su Günü kutlamaları, okul lavabolarındaki su tüketim denetimleri, yağmur suyu hasadı modeli kurma, su tasarrufu aparatı (perlatör) tanıtımı.",
        "topics": "Tatlı Su Kaynakları ve Kuraklık Riski, Su Ayak İzi Hesaplama, Evde ve Tarımda Su Tasarrufu, Su Kirliliği ve Arıtma Teknolojileri.",
        "community_service": "Okul lavabolarındaki tüm muslukların sızıntı kontrolünün yapılması ve perlatör tasarruf aparatlarının montajı için okul yönetimiyle iş birliği yapılması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp genel kurulunun toplanması; Su Elçileri timi ve yönetiminin seçimi; yıllık çalışma planının hazırlanarak onaylanması."),
            ("EKİM", "Dünyada ve ülkemizde tatlı su kaynakları durumu; kuraklık riski ve su ayak izi kavramı bilgilendirme panosu."),
            ("KASIM", "Okul lavabolarındaki armatürlerin kaçak/damlatma kontrolünün yapılması; su tasarrufu sağlayan perlatör kullanımının yaygınlaştırılması."),
            ("ARALIK", "Evde ve okulda su tasarrufu rehberinin hazırlanması; diş fırçalarken ve el yıkarken suyun boşa akıtılmaması farkındalık afişleri."),
            ("OCAK", "1. Dönem okul su sayacı tüketim verilerinin incelenmesi; tasarruf oranlarının hesaplanması ve 1. dönem raporu."),
            ("ŞUBAT", "2. Dönem çalışma planı; yağmur suyu hasadı modeli ve damla sulama sistemleri maket atölyesi başlatılması."),
            ("MART", "22 Mart Dünya Su Günü kutlamaları; 'Bir Damla da Sen Ol' okul resim, şiir ve afiş yarışması sergisi; uzman hidrolog söyleşisi."),
            ("NİSAN", "Okul bahçesindeki bitkilerin sulanmasında sabah erken veya akşam geç saat sulama kuralı uygulanması; su ayak izi hesaplama standı."),
            ("MAYIS", "Yerel su arıtma tesisine veya baraja teknik inceleme gezisi düzenlenmesi; temiz suya erişim hakkı bildirisi dağıtımı."),
            ("HAZİRAN", "Okul Su Tasarrufu Karnesi raporunun hazırlanması; e-Okul Sosyal Etkinlik Modülü verilerinin girilmesi ve dosyanın teslimi.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Su Elçileri timi kuruldu, su ayak izi ve küresel kuraklık farkındalık panosu açıldı."),
            ("KASIM - ARALIK", "Lavabo armatürleri denetlendi, su tasarrufu afişleri ve perlatör bilgilendirmesi yapıldı."),
            ("OCAK - ŞUBAT", "Su tüketim sayaçları analiz edildi, yağmur suyu hasadı maketleri hazırlandı."),
            ("MART - NİSAN", "22 Mart Dünya Su Günü töreni icra edildi, su yarışması sergisi açıldı ve hidrolog söyleşisi yapıldı."),
            ("MAYIS - HAZİRAN", "Su arıtma tesisi teknik gezisi gerçekleştirildi, okul su tasarruf karnesi çıkarıldı ve rapor teslim edildi.")
        ]
    },
    {
        "id": "stem-egitimi",
        "name": "STEM Eğitimi Kulübü",
        "short_name": "STEM Eğitimi",
        "purpose": "Bilim (Science), Teknoloji (Technology), Mühendislik (Engineering) ve Matematik (Mathematics) disiplinlerini bütünleştirerek öğrencilere tasarım odaklı düşünme, robotik kodlama ve problem çözme becerileri kazandırmak.",
        "scope": "STEM projeleri geliştirme, Arduino ve sensör atölyeleri, 3D modelleme ve baskı, bilim şenlikleri ve TÜBİTAK yarışmalarına hazırlık.",
        "topics": "Mühendislik Tasarım Süreci, Algoritmik Düşünme ve Robotik, Yenilikçi Malzeme Bilimi, Veri Analizi ve Modelleme.",
        "community_service": "Okulda düşük maliyetli STEM eğitim setleri üreterek ilkokul kademesindeki kardeş sınıflara deney atölyeleri düzenlenmesi.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp organlarının seçimi; yıllık planın onaylanması; STEM atölyesi çalışma gruplarının (kodlama, elektronik, mekanik tasarım) kurulması."),
            ("EKİM", "STEM yaklaşımı ve mühendislik tasarım süreci basamakları eğitimi; problem tanımlama, prototip üretme ve test etme metodolojisi."),
            ("KASIM", "Arduino ve temel sensör (ısı, ışık, mesafe sensörleri) atölyesi; basit devre kurulumu ve blok tabanlı kodlama pratikleri."),
            ("ARALIK", "Akıllı şehir ve akıllı ev sistemleri prototip tasarımı; öğrencilerin sensörlü sokak lambası veya otomatik sulama sistemi geliştirmesi."),
            ("OCAK", "1. Dönem STEM projelerinin sunumu ve çalışırlık testleri; 1. dönem kulüp faaliyet raporunun tanzim edilmesi."),
            ("ŞUBAT", "2. Dönem çalışmaları; 3D modelleme (Tinkercad) eğitimi ve 3D yazıcıdan tasarım parçalarının basılması."),
            ("MART", "Yenilenebilir enerji ve hidrolik sistemler atölyesi; hidrolik kepçe veya rüzgar jeneratörü mühendislik projeleri."),
            ("NİSAN", "TÜBİTAK 2204-B Ortaokul veya 2204-A Lise Araştırma Projeleri yarışmalarına hazırlık; proje posterlerinin oluşturulması."),
            ("MAYIS", "Okul Bilim ve STEM Şenliği; kulüp öğrencilerinin geliştirdiği robotik ve mühendislik projelerinin sergilenmesi."),
            ("HAZİRAN", "Atölye envanterinin bakımı; e-Okul Sosyal Etkinlik Modülüne katılım belgelerinin işlenmesi ve faaliyet raporunun teslimi.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp kuruldu, STEM mühendislik tasarım süreci ilkeleri anlatıldı, takımlar belirlendi."),
            ("KASIM - ARALIK", "Arduino sensör eğitimi verildi, akıllı sulama ve akıllı lamba prototipleri tamamlandı."),
            ("OCAK - ŞUBAT", "1. Dönem projeleri test edildi, 3D modelleme ve yazıcı atölyeleri uygulandı."),
            ("MART - NİSAN", "Hidrolik mekanik sistemler ve TÜBİTAK proje posterleri hazırlandı."),
            ("MAYIS - HAZİRAN", "Okul STEM Şenliği icra edildi, prototipler sergilendi ve yıl sonu raporu teslim edildi.")
        ]
    },
    {
        "id": "sosyal-dayanisma",
        "name": "Sosyal Dayanışma ve Yardımlaşma Kulübü",
        "short_name": "Sosyal Dayanışma",
        "purpose": "Toplumsal birlik, beraberlik, kardeşlik, muhtaçlara el uzatma ve gönüllülük duygularını yüceltmek; okul ve çevre toplumunda sosyal adalet ve yardımlaşma ağları kurmak.",
        "scope": "Sevgi ve dayanışma kermesleri, kırtasiye ve giyim yardım kampanyaları, yaşlı ve hasta ziyaretleri, huzurevi ve kimsesizler yurdu sosyal sorumluluk projeleri.",
        "topics": "İmece ve Gönüllülük Kültürü, İyilikte Yarışma, Toplumsal Empati, Sosyal Yardımlaşma Sandığı ve Sivil Toplum Örgütleri.",
        "community_service": "İhtiyaç sahibi köy okulları için 'Bir Kalem, Bir Gelecek' kırtasiye ve kitap toplama kampanyası düzenlenerek kolilerin kardeş okula ulaştırılması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp genel kurulunun toplanması; yönetim ve denetim kurullarının seçilmesi; yıllık planın hazırlanarak idareye sunulması."),
            ("EKİM", "Yardımlaşma, cömertlik ve empati temalı okul panosunun düzenlenmesi; okul içi ihtiyaç haritasının rehberlik servisiyle tespiti."),
            ("KASIM", "'Kış Üşütür, Sevgi Isıtır' kışlık mont, bot ve atkı-bere yardım kampanyasının başlatılması; duyuruların sınıflara yapılması."),
            ("ARALIK", "Toplanan kışlık giysi ve ayakkabıların tasnifi, paketlenmesi ve ihtiyaç sahibi köy okullarına ulaştırılmak üzere teslim edilmesi."),
            ("OCAK", "1. Dönem yardım kampanyalarının değerlendirilmesi; karar defterine işlenmesi ve 1. dönem faaliyet raporunun hazırlanması."),
            ("ŞUBAT", "2. Dönem çalışmaları; 'Bir Kitap Bir Defter' kırtasiye ve kaynak kitap toplama kampanyasının planlanması."),
            ("MART", "Yaşlılar Haftası (18-24 Mart) münasebetiyle yerel bir huzurevine nezaket ve moral ziyareti gerçekleştirilmesi; çiçek takdimi."),
            ("NİSAN", "Ramazan ayı / bahar dönemi 'Dayanışma Kolisi' gıda yardımı kampanyası düzenlenmesi ve erzak kolilerinin dağıtımı."),
            ("MAYIS", "Okul Sevgi ve Dayanışma Kermesi düzenlenmesi; elde edilen gelirin SMA'lı çocuklar veya eğitim vakıflarına bağışlanması."),
            ("HAZİRAN", "Teşekkür belgelerinin dağıtılması; e-Okul Sosyal Etkinlik Modülü verilerinin tamamlanması ve yıl sonu raporunun teslimi.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp yönetimi belirlendi, okul içi ihtiyaç tespiti yapıldı ve panolar hazırlandı."),
            ("KASIM - ARALIK", "Kışlık giysi yardım kampanyası yürütüldü, malzemeler paketlenip kardeş okula gönderildi."),
            ("OCAK - ŞUBAT", "1. Dönem yardımları raporlandı, bahar dönemi kırtasiye kampanyası başlatıldı."),
            ("MART - NİSAN", "Huzurevi ziyareti yapıldı, gıda dayanışma kolileri ihtiyaç sahiplerine ulaştırıldı."),
            ("MAYIS - HAZİRAN", "Okul dayanışma kermesi yapıldı, bağışlar ulaştırıldı ve faaliyet raporu tamamlandı.")
        ]
    },
    {
        "id": "saglik-ve-beslenme",
        "name": "Sağlık, Temizlik ve Beslenme Kulübü",
        "short_name": "Sağlık ve Beslenme",
        "purpose": "Öğrencilere kişisel hijyen, sağlıklı ve dengeli beslenme, hareketli yaşam ve obeziteyle mücadele alışkanlıkları kazandırmak; okul kantini ve yemekhane hijyen bilincini artırmak.",
        "scope": "Okul Sağlığı Haftası, diş sağlığı kontrolleri, kantin denetim komisyonu çalışmaları, obezite ve diyabet farkındalık seminerleri, sabah egzersizi etkinlikleri.",
        "topics": "Dengeli Beslenme Piramidi, Kişisel Hijyen ve El Yıkama, Obezite ve Fiziksel Aktivite, Gıda Güvenliği ve Katkı Maddeleri, Diş ve Ağız Sağlığı.",
        "community_service": "Okul kantinindeki sağlıklı ürün reyonunun denetlenmesi ve tüm sınıflara 'Sağlıklı Beslenme ve Beslenme Çantası Rehberi' dağıtılması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp organlarının seçimi; yıllık planın hazırlanması; okul kantin ve yemekhane hijyen denetim komisyonunun belirlenmesi."),
            ("EKİM", "16 Ekim Dünya Gıda Günü; sağlıklı beslenme piramidi, ambalajlı gıdalarda etiket okuma ve katkı maddeleri farkındalık panosu."),
            ("KASIM", "Doğru el yıkama ve kişisel hijyen atölyesi; sınıflarda sabun kullanımı ve bulaşıcı hastalıklardan korunma sunumları."),
            ("ARALIK", "14 Kasım Dünya Diyabet Günü ve aşırı şeker tüketiminin zararları; okul kantinindeki sağlıklı atıştırmalıkların teşviki."),
            ("OCAK", "1. Dönem okul boy-kilo taramaları verilerinin analizi; obeziteyle mücadele tavsiyeleri; 1. dönem faaliyet raporu."),
            ("ŞUBAT", "2. Dönem çalışma planı; su tüketimi, paketli meyve suları yerine taze meyve tüketiminin önemi eğitimi."),
            ("MART", "Ağız ve Diş Sağlığı haftası hazırlıkları; diş hekimi davet edilerek doğru diş fırçalama teknikleri uygulamalı semineri."),
            ("NİSAN", "'Hareketli Yaşam, Sağlıklı Beden' bahar yürüyüşü ve okul bahçesinde müzik eşliğinde sabah kültür-fizik egzersizleri."),
            ("MAYIS", "Okul Meyve Günü şenliği; tüm öğrencilere mevsim meyveleri ikramı; sağlıklı beslenme çantası hazırlama rehberi dağıtımı."),
            ("HAZİRAN", "Yıl boyu yapılan hijyen ve beslenme çalışmalarının özetlenmesi; yıl sonu faaliyet raporunun okul idaresine sunulması.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp kuruldu, Dünya Gıda Günü panosu hazırlandı, kantin denetim ekibi görevlendirildi."),
            ("KASIM - ARALIK", "Kişisel hijyen ve el yıkama seminerleri verildi, diyabet farkındalığı işlendi."),
            ("OCAK - ŞUBAT", "Boy-kilo ölçümleri değerlendirildi, sağlıklı ara öğün rehberi hazırlandı."),
            ("MART - NİSAN", "Diş hekimi söyleşisi yapıldı, okul bahçesinde sabah egzersizleri başlatıldı."),
            ("MAYIS - HAZİRAN", "Okul Meyve Günü şenliği yapıldı, beslenme rehberi dağıtıldı ve faaliyet raporu teslim edildi.")
        ]
    },
    {
        "id": "yesilay",
        "name": "Yeşilay Kulübü",
        "short_name": "Yeşilay",
        "purpose": "Öğrencileri tütün, alkol, madde ve çağımızın tehlikesi ekran/teknoloji bağımlılıklarına karşı korumak; sağlıklı yaşam bilinci ve bağımsız, iradeli bireyler yetiştirmek.",
        "scope": "1-7 Mart Yeşilay Haftası kutlamaları, 'Bağımsız Ol, Sağlıklı Yaşa' afiş ve karikatür yarışması, teknoloji detoksu atölyesi, Yeşilay gönüllüsü söyleşileri.",
        "topics": "Yeşilayın Tarihi ve Misyonu, Tütün ve Dumansız Hava Sahası, Teknoloji ve Sosyal Medya Bağımlılığı, Akran Baskısına Karşı 'Hayır' Diyebilme Becerisi.",
        "community_service": "Okulda velilere ve öğrencilere yönelik 'Teknoloji Bağımlılığı ve Dijital Detoks' bilgilendirme broşürü hazırlanıp dağıtılması.",
        "monthly_plan": [
            ("EYLÜL", "Kulüp genel kurulu, yönetim seçimi; yıllık çalışma planının onaylanması; Yeşilay kulüp panosunun düzenlenmesi."),
            ("EKİM", "Yeşilay'ın kuruluş felsefesi (Hilal-i Ahdar), tarihi ve misyonu; bağımlılık türleri (tütün, alkol, kumar, teknoloji) bilgilendirmesi."),
            ("KASIM", "Dumansız Hava Sahası ve pasif içiciliğin zararları; sigaranın akciğer ve kalp sağlığına tahribatı deney modelleri sunumu."),
            ("ARALIK", "Ekran ve sosyal medya bağımlılığı atölyesi; günde kaç saat ekrana bakıyoruz anketi ve 'Ekranı Kapat, Hayata Bak' sloganı."),
            ("OCAK", "1. Dönem faaliyetlerinin gözden geçirilmesi; 1-7 Mart Yeşilay Haftası okul programı komisyonunun kurulması; 1. dönem raporu."),
            ("ŞUBAT", "2. Dönem Yeşilay Haftası hazırlıkları; okul çapında 'Sağlıklı Nesil, Sağlıklı Gelecek' resim, şiir ve kompozisyon yarışması duyurusu."),
            ("MART", "1-7 Mart Yeşilay Haftası okul töreninin icrası; yarışmada dereceye giren öğrencilere ödül verilmesi; Yeşilay gönüllüsü söyleşisi."),
            ("NİSAN", "Akran baskısına karşı 'Hayır' diyebilme becerisi atölyesi; rehberlik servisi iş birliğiyle özgüven ve irade semineri."),
            ("MAYIS", "Okul bahçesinde 'Sağlıklı Yaşam ve Bisiklet Turu' / spor şenliği; velilere yönelik çocuklarda ekran bağımlılığı broşürü dağıtımı."),
            ("HAZİRAN", "Yıl boyu bağımlılıkla mücadele çalışmalarının raporlanması; Sosyal Etkinlik Modülü verilerinin tamamlanarak dosyanın idareye sunulması.")
        ],
        "activity_table": [
            ("EYLÜL - EKİM", "Kulüp kuruldu, Yeşilay panosu hazırlandı, Hilal-i Ahdar tarihi ve bağımlılık türleri anlatıldı."),
            ("KASIM - ARALIK", "Tütünün zararları ve ekran bağımlılığı atölyeleri gerçekleştirildi."),
            ("OCAK - ŞUBAT", "1. Dönem değerlendirildi, Yeşilay Haftası okul yarışmaları başlatıldı."),
            ("MART - NİSAN", "1-7 Mart Yeşilay Haftası töreni yapıldı, ödüller dağıtıldı ve 'Hayır' diyebilme semineri verildi."),
            ("MAYIS - HAZİRAN", "Sağlıklı yaşam spor şenliği yapıldı, veli broşürü dağıtıldı ve faaliyet raporu teslim edildi.")
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

def main():
    json_path = "data/club-documents.json"
    with open(json_path, "r", encoding="utf-8") as f:
        existing_catalog = json.load(f)

    existing_ids = {c["id"] for c in existing_catalog}
    print(f"Mevcut kulüp sayısı: {len(existing_catalog)}")

    added_count = 0
    for c in NEW_CLUBS_DEFINITIONS:
        if c["id"] in existing_ids:
            print(f"Kulüp zaten mevcut, atlanıyor: {c['id']}")
            continue

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
        existing_catalog.append(item)
        existing_ids.add(c["id"])
        added_count += 1
        print(f"Yeni kulüp eklendi: {c['name']} ({c['id']})")

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(existing_catalog, f, ensure_ascii=False, indent=2)

    print(f"\nİşlem tamamlandı! Toplam kulüp sayısı: {len(existing_catalog)} (Yeni eklenen: {added_count})")

if __name__ == "__main__":
    main()
