# -*- coding: utf-8 -*-
"""
Authentic Question Generator for:
1-sinif-hayat-bilgisi-okulumuzda-hayat-ve-saglikli-yasam-konu-anlatimi-20-soruluk-test
"""

def get_hayat_bilgisi_questions():
    raw = [
        ("Sınıfta söz alarak konuşmak isteyen bir öğrenci ne yapmalıdır?", ["A) Bağırmalıdır", "B) Parmak kaldırmalıdır", "C) Ayağa fırlamalıdır", "D) Arkadaşını dürtmelidir"], "B", "Sınıf kurallarına göre öğretmenimizden veya arkadaşlarımızdan söz istemek için parmak kaldırılır."),
        ("Aşağıdakilerden hangisi kişisel bakımımızla ilgili doğru bir davranıştır?", ["A) Yemeklerden önce ellerimizi yıkamak", "B) Dişlerimizi fırçalamamak", "C) Tırnaklarımızı uzatmak", "D) Kirli kıyafetler giymek"], "A", "Yemeklerden önce ve sonra elleri sabun ve suyla yıkamak mikroplardan korunmamızı sağlar."),
        ("Arkadaşımız bize bir hediye verdiğinde ona ne söylemeliyiz?", ["A) Özür dilerim", "B) Teşekkür ederim", "C) Hoşça kal", "D) Lütfen"], "B", "Bize iyilik yapan veya hediye veren kişilere nezaket kuralı gereğince 'Teşekkür ederim' deriz."),
        ("Sabah okula geldiğimizde öğretmenimize ve arkadaşlarımıza ne deriz?", ["A) İyi geceler", "B) Günaydın", "C) Afiyet olsun", "D) Geçmiş olsun"], "B", "Sabah karşılaştığımız kişileri 'Günaydın' diyerek selamlarız."),
        ("Aşağıdaki besinlerden hangisi sağlığımız için daha faydalıdır?", ["A) Cips ve kola", "B) Şeker ve çikolata", "C) Taze elma ve süt", "D) Gazlı içecekler"], "C", "Taze meyveler ve süt sağlıklı büyümemiz için gerekli vitamin ve kalsiyumu sağlar."),
        ("Teneffüste okul koridorlarında nasıl yürümeliyiz?", ["A) Koşarak ve bağırarak", "B) Sakin ve dikkatli adımlarla", "C) Gözlerimizi kapatarak", "D) Arkadaşımızı iterek"], "B", "Kazaları ve çarpışmaları önlemek için koridorda koşmadan, sakin yürünmelidir."),
        ("Yanlışlıkla arkadaşımızın ayağına bastığımızda ne demeliyiz?", ["A) Özür dilerim", "B) Tebrik ederim", "C) Günaydın", "D) Rica ederim"], "A", "İstemeden birine zarar verdiğimizde veya hata yaptığımızda 'Özür dilerim' deriz."),
        ("Okulda çöpleri nereye atmalıyız?", ["A) Sıranın altına", "B) Bahçeye", "C) Çöp kutusuna", "D) Pencereden dışarı"], "C", "Çevremizi ve okulumuzu temiz tutmak için çöpleri mutlaka çöp kutusuna atmalıyız."),
        ("Karşıdan karşıya geçerken nereden geçmeliyiz?", ["A) Yolun ortasından", "B) Yaya geçidinden", "C) Arabaların arasından", "D) Köşeden"], "B", "Yaya geçidi ve trafik ışıklarının bulunduğu güvenli yerlerden geçilmelidir."),
        ("Trafik ışıklarında kırmızı ışık yandığında yayalar ne yapmalıdır?", ["A) Hızlıca koşmalıdır", "B) Durup beklemelidir", "C) Karşıya geçmelidir", "D) Dans etmelidir"], "B", "Kırmızı ışık 'DUR', sarı ışık 'HAZIRLAN', yeşil ışık 'GEÇ' anlamına gelir."),
        ("Günde en az kaç defa dişlerimizi fırçalamalıyız?", ["A) 1", "B) 2", "C) Hiç fırçalamamalıyız", "D) Haftada bir"], "B", "Diş sağlığımızı korumak için günde en az iki defa (sabah ve gece yatmadan önce) dişler fırçalanmalıdır."),
        ("Ders araç gereçlerimizi nasıl kullanmalıyız?", ["A) Özenli ve temiz", "B) Kırarak", "C) Karalayarak", "D) Kaybederek"], "A", "Kitap, defter ve kalemlerimizi özenli ve temiz kullanarak kaynaklarımızı koruruz."),
        ("Hapşırırken veya öksürürken ne yapmalıyız?", ["A) Arkadaşımızın yüzüne doğru dönmeliyiz", "B) Ağzımızı dirseğimizin içiyle veya mendille kapatmalıyız", "C) Bağırmalıyız", "D) Ağzımızı hiç kapatmamalıyız"], "B", "Mikropların yayılmasını engellemek için ağız ve burnumuzu tek kullanımlık mendille veya dirsek içiyle kapatmalıyız."),
        ("Hangisi dengeli beslenmeye uygun bir kahvaltıdır?", ["A) Yumurta, peynir, zeytin, süt", "B) Şekerleme ve gazoz", "C) Cips ve bisküvi", "D) Sadece dondurma"], "A", "Yumurta, peynir, zeytin ve süt büyüme çağındaki çocukların güne enerjik başlamasını sağlar."),
        ("Okul kaynaklarını (elektrik, su) nasıl kullanmalıyız?", ["A) Gereksiz yere açık bırakmalıyız", "B) Tasarruflu ve ihtiyacımız kadar", "C) Suları boşa akıtarak", "D) Lambaları hep açık tutarak"], "B", "Suyu ve elektriği tasarruflu kullanmak hem okul hem de ülkemiz kaynakları için çok önemlidir."),
        ("Okul çantamızı hazırlarken neye dikkat etmeliyiz?", ["A) Ders programına göre gerekli kitap ve defterleri koymaya", "B) Tüm oyuncaklarımızı doldurmaya", "C) Çantayı boş bırakmaya", "D) Ağır taşlar koymaya"], "A", "Ders programına göre çanta hazırlamak gereksiz ağırlık taşımamızı önler."),
        ("Oyun oynarken arkadaşlarımıza karşı nasıl davranmalıyız?", ["A) Mızıkçılık yapmalıyız", "B) Kurallara uymalı ve dürüst olmalıyız", "C) Kaybedince öfkelenmeliyiz", "D) Oyun alanından kaçmalıyız"], "B", "Oyun kurallarına uymak ve adil olmak sağlıklı arkadaşlık ilişkileri kurmamızı sağlar."),
        ("Vücudumuzun sağlıklı ve dinç kalması için günde kaç saat uyumalıyız?", ["A) 2 saat", "B) 4 saat", "C) 9-10 saat", "D) 20 saat"], "C", "Gelişme çağındaki 1. sınıf çocukları için 9-10 saatlik düzenli gece uykusu esastır."),
        ("Aşağıdakilerden hangisi acil durumlarda aranması gereken tek numaradır?", ["A) 112", "B) 155", "C) 110", "D) 156"], "A", "Türkiye'de tüm acil yardım hizmetleri (ambulans, polis, itfaiye) tek numara olan 112 Acil Çağrı Merkezinde toplanmıştır."),
        ("Okul servisindeyken ne yapmalıyız?", ["A) Ayakta dolaşmalıyız", "B) Emniyet kemerimizi bağlayıp yerimizde oturmalıyız", "C) Camdan sarkmalıyız", "D) Şoförün dikkatini dağıtmalıyız"], "B", "Servis güvenliği için araç hareket halindeyken mutlaka emniyet kemeri takılı olmalı ve yerimizden kalkılmamalıdır.")
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
