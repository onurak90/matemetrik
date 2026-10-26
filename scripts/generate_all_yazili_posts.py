import json
import sqlite3
from datetime import datetime

with open('/tmp/all_grades_detailed_links.json', 'r', encoding='utf-8') as f:
    detailed_links = json.load(f)

conn = sqlite3.connect('data/matemetrik.db')
cursor = conn.cursor()

def get_drive_button(drive_url, subj_name):
    if not drive_url:
        return ""
    return f'''
<div style="margin: 14px 0 16px 0;">
  <a href="{drive_url}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #1d4ed8, #2563eb); color: #ffffff; padding: 11px 20px; border-radius: 12px; font-weight: 700; font-size: 13px; text-decoration: none; box-shadow: 0 4px 14px rgba(37,99,235,0.3);">
    <span>📥 {subj_name} Yazılı Soruları ve Cevapları PDF İndir (Google Drive)</span>
  </a>
</div>
'''

def get_yazilideposu_link(page_url, subj_name):
    if not page_url:
        return ""
    return f'''
<p style="font-size: 12px; color: #64748b; margin-top: 6px;">
  Ek kaynak ve güncel senaryo arşivi: <a href="{page_url}" target="_blank" rel="noopener noreferrer" style="color: #4f46e5; text-decoration: underline; font-weight: 600;">Yazılı Deposu {subj_name} Dokümanları</a>
</p>
'''

def get_subject_data(grade_str, subj_keyword):
    subjs = detailed_links.get(grade_str, [])
    for s in subjs:
        if subj_keyword.lower() in s['name'].lower():
            drive_url = s['drive_links'][0] if s['drive_links'] else ''
            return s['name'], s['page_url'], drive_url
    return subj_keyword, '', ''

now_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

# Definitions for all 8 grades
grades_config = [
    {
        'grade': 5,
        'title': '5. Sınıf 1. Dönem 1. Yazılı Soruları ve Cevapları: MEB Maarif Modeli Senaryoları (PDF İndir)',
        'slug': '5-sinif-1-donem-1-yazili-sorulari-ve-cevaplari-meb-senaryolari',
        'category': '5. Sınıf',
        'category_slug': '5-sinif',
        'featured_image': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
        'image_alt': '5. sınıf 1. dönem 1. yazılı soruları ve meb maarif modeli senaryoları pdf',
        'excerpt': '5. sınıf 1. dönem 1. yazılı sınav soruları ve cevap anahtarları. MEB Maarif Modeli konu soru dağılım tabloları, açık uçlu örnek sorular, çözümler ve ücretsiz PDF indir.',
        'book_slug': '2026-2027-meb-5-sinif-matematik-ders-kitabi-cevaplari',
        'book_title': '5. sınıf matematik ders kitabı cevapları',
        'subjects_data': [
            {
                'name': 'Matematik',
                'topics': 'Doğal Sayılar (Milyonlu basamaklar, basamak ve sayı değerleri), Doğal Sayılarla Toplama ve Çıkarma İşlemleri, Zihinden İşlemler, Tahmin Etme ve Problem Çözme',
                'q_sample': 'Bir kütüphanede 425.680 adet kitap bulunmaktadır. Kütüphaneye yıl içinde 38.450 yeni kitap bağışlanmış, yıpranan 4.120 kitap ise arşivden çıkarılmıştır. Son durumda kütüphanedeki toplam kitap sayısını basamak basamak işlem yaparak bulunuz.',
                'solution': '1. Adım: Mevcut kitap sayısına yeni bağışlanan kitaplar eklenir: 425.680 + 38.450 = 464.130 kitap (5 Puan).\n2. Adım: Çıkarılan yıpranmış kitaplar toplamdan eksiltilir: 464.130 - 4.120 = 460.010 kitap (5 Puan).\nCevap: 460.010 kitaptır.',
                'rubrik': 'İşlem adımları tam ve doğru: 10 Puan. Sadece toplama doğru yapılmışsa: 5 Puan. Birim yazılmamışsa 1 puan kırılır.'
            },
            {
                'name': 'Türkçe',
                'topics': 'Metinde Anlam ve Çıkarım Yapma, Sözcükte Anlam (Gerçek, Mecaz, Terim Anlam), Eş ve Zıt Anlamlı Kelimeler, Deyimler ve Atasözleri, Noktalama İşaretleri',
                'q_sample': '"Köy meydanındaki ulu çınar, fırtınanın şiddetine daha fazla dayanamayarak derin bir sessizliğe gömüldü." cümlesinde mecaz anlamda kullanılan sözcükleri tespit ederek kendi kuracağınız birer cümlede gerçek anlamlarıyla kullanınız.',
                'solution': '1. Adım: Mecaz anlamlı sözcükler tespit edilir: "dayanamayarak" ve "derin bir sessizliğe gömüldü" ifadeleri ağaç için mecazdır (4 Puan).\n2. Adım: "Derin" kelimesi gerçek anlamda kullanılır: "Bahçedeki derin kuyuya düşen topu çıkardık." (3 Puan).\n3. Adım: "Dayanmak" kelimesi gerçek anlamda kullanılır: "Ağır dolap kapıya dayandığı için açılamadı." (3 Puan).',
                'rubrik': 'Doğru sözcük tespiti: 4 Puan. Gerçek anlamlı özgün cümleler: 6 Puan.'
            },
            {
                'name': 'Fen Bilimleri',
                'topics': 'Güneş, Dünya ve Ay (Güneş\'in yapısı ve özellikleri, Ay\'ın yapısı, özellikleri, dönme ve dolanma hareketleri, Ay\'ın ana ve ara evreleri)',
                'q_sample': 'Ay\'ın Dünya etrafında dolanırken gördüğümüz 4 ana evresinin isimlerini oluşum sırasına göre yazınız ve Yeni Ay evresinde Ay\'ın Dünya\'dan neden görülmediğini bilimsel olarak açıklayınız.',
                'solution': '1. Adım: 4 ana evrenin sırası: Yeni Ay -> İlk Dördün -> Dolunay -> Son Dördün (4 Puan).\n2. Adım: Yeni Ay evresinde Ay, Güneş ile Dünya arasına girer. Ay\'ın Güneş ışığı alan aydınlık yüzü Güneş\'e, karanlık yüzü ise Dünya\'ya dönüktür. Bu sebeple Dünya\'dan bakıldığında Ay gökyüzünde görünmez (6 Puan).',
                'rubrik': 'Evre sıralaması: 4 Puan. Neden görülmediğine dair Güneş-Dünya konumu açıklaması: 6 Puan.'
            },
            {
                'name': 'Sosyal Bilgiler',
                'topics': 'Birey ve Toplum (Hak, sorumluluk, çocuk hakları, gruplar ve rollerimiz), Kültür ve Miras (Uygarlıklar, somut ve somut olmayan kültürel mirasımız)',
                'q_sample': 'Okul hayatınızda ve aile ortamınızda sahip olduğunuz rolleri yazarak bu rollerin getirdiği ikişer sorumluluğu açıklayınız.',
                'solution': '1. Okul Ortamındaki Rol: Öğrenci. Sorumluluklar: Derslere zamanında girmek, ödevleri eksiksiz tamamlamak (5 Puan).\n2. Aile Ortamındaki Rol: Çocuk / Kardeş. Sorumluluklar: Kendi odasını düzenli tutmak, ev kurallarına ve aile bireylerine saygılı davranmak (5 Puan).',
                'rubrik': 'Rol tespiti: 2 Puan. Sorumluluk açıklamaları: 8 Puan.'
            },
            {
                'name': 'Din Kültürü ve Ahlak Bilgisi',
                'topics': 'Allah İnancı (Allah Vardır ve Birdir, Allah Yaradandır, Allah Görür ve İşitir, İhlas Suresi ve Anlamı)',
                'q_sample': 'Allah\'ın "Basar" ve "Sem\'i" sıfatlarının anlamlarını yazarak günlük hayattaki davranışlarımıza etkisini bir örnekle açıklayınız.',
                'solution': '1. Adım: Sem\'i, Allah\'ın her şeyi işitmesi; Basar ise Allah\'ın her şeyi görmesi anlamına gelir (5 Puan).\n2. Adım: Bu inanç insanda oto-kontrol sağlar. Kimsenin olmadığı bir yerde bile haksızlık veya gizli kötülük yapmaktan kaçınırız; çünkü Allah\'ın bizi her an gördüğünü ve fısıltılarımızı dahi işittiğini biliriz (5 Puan).',
                'rubrik': 'Sıfat tanımları: 5 Puan. Hayata yansıması ve örnek: 5 Puan.'
            },
            {
                'name': 'İngilizce',
                'topics': 'Hello! (Greetings, Countries and Nationalities), My Town (Directions, Places in Town, Giving directions)',
                'q_sample': 'Answer the questions according to yourself in full English sentences:\n1. Where are you from and what is your nationality?\n2. Where is the library in your school?',
                'solution': '1. I am from Turkey and I am Turkish (5 Puan).\n2. The library is on the second floor, next to the science lab (5 Puan).',
                'rubrik': 'Tam ve gramer açısından doğru cümle: 10 Puan. Kelime hatalarında kısmi puan verilir.'
            }
        ]
    },
    {
        'grade': 6,
        'title': '6. Sınıf 1. Dönem 1. Yazılı Soruları ve Cevapları: MEB Ülke Geneli Ortak Sınav Formatı (PDF İndir)',
        'slug': '6-sinif-1-donem-1-yazili-sorulari-ve-cevaplari-meb-senaryolari',
        'category': '6. Sınıf',
        'category_slug': '6-sinif',
        'featured_image': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
        'image_alt': '6. sınıf 1. dönem 1. yazılı soruları meb ülke geneli ortak sınav pdf',
        'excerpt': '6. sınıf 1. dönem 1. yazılı soruları ve cevap anahtarları. MEB ülke geneli ortak matematik ve Türkçe sınav kuralları, açık uçlu örnek senaryolar ve PDF indirme arşivi.',
        'book_slug': '2026-2027-meb-matematik-ders-kitabi-cevaplari-6-sinif-1-kitap',
        'book_title': '6. sınıf matematik ders kitabı çözümleri',
        'subjects_data': [
            {
                'name': 'Matematik',
                'topics': 'MEB Ülke Geneli Ortak Sınav Formatı: Doğal Sayılarla İşlemler (Üslü ifadeler, işlem önceliği, ortak çarpan parantezi ve dağılma özelliği, doğal sayı problemleri), Çarpanlar ve Katlar (Asal sayılar, bölünebilme kuralları 2, 3, 4, 5, 6, 9, 10)',
                'q_sample': 'İşlem önceliğine dikkat ederek aşağıdaki işlemin sonucunu basamak basamak gösteriniz:\n48 : (2^3 + 4) * 3 + 15 - 2 * 6',
                'solution': '1. Adım: Üslü ifade hesaplanır: 2^3 = 8 (2 Puan).\n2. Adım: Parantez içi yapılır: (8 + 4) = 12 (2 Puan).\n3. Adım: Soldan sağa bölme ve çarpma yapılır: 48 : 12 = 4; ardından 4 * 3 = 12 (3 Puan).\n4. Adım: İkinci çarpma yapılır: 2 * 6 = 12 (1 Puan).\n5. Adım: Toplama ve çıkarma soldan sağa yapılır: 12 + 15 - 12 = 15 (2 Puan).\nCevap: 15.',
                'rubrik': 'İşlem sırası ve tam çözüm: 10 Puan. İşlem önceliği hatasında adım puanı kırılır.'
            },
            {
                'name': 'Türkçe',
                'topics': 'Metin Yorumlama ve Ana Fikir, Deyimler ve Atasözleri, İsim ve Fiil Kökleri, Yapım Ekleri ve Çekim Ekleri, Metin Türleri',
                'q_sample': '"Kitaplar, insan ruhunun açılan en aydınlık pencereleridir." cümlesindeki altı çizili "aydınlık" ve "pencereleridir" kelimelerinin köklerini ve aldıkları eklerin türlerini (yapım/çekim eki) gösteriniz.',
                'solution': '1. "Aydınlık": Kökü "ay" (isim kökü) -> "aydın" (isimden isim yapım eki) -> "aydınlık" (isimden isim yapım eki) (5 Puan).\n2. "Pencereleridir": Kökü "pencere" (isim kökü) -> "-ler" (çoğul çekim eki) -> "-i" (iyelik çekim eki) -> "-dir" (ek fiil çekim eki) (5 Puan).',
                'rubrik': 'Kök tespiti: 4 Puan. Eklerin niteliği: 6 Puan.'
            },
            {
                'name': 'Fen Bilimleri',
                'topics': 'Güneş Sistemi ve Tutulmalar (Gezegenlerin özellikleri, Güneş ve Ay tutulması mekanizması), Destek ve Hareket Sistemi (Kemik çeşitleri, eklemler, kaslar)',
                'q_sample': 'Güneş Tutulması ile Ay Tutulması arasındaki temel farkları; Ay\'ın hangi evrede gerçekleştiği ve gök cisimlerinin sıralanışı bakımından maddeler halinde yazınız.',
                'solution': '1. Güneş Tutulması: Sıralama Güneş - Ay - Dünya şeklindedir. Ay, Yeni Ay evresindedir. Gündüz vakti ve Dünya\'nın dar bir bölgesinden izlenir (5 Puan).\n2. Ay Tutulması: Sıralama Güneş - Dünya - Ay şeklindedir. Ay, Dolunay evresindedir. Gece vakti ve Ay\'ın görüldüğü tüm yerlerden izlenebilir (5 Puan).',
                'rubrik': 'Sıralama ve evre bilgisi: 10 Puan.'
            },
            {
                'name': 'Sosyal Bilgiler',
                'topics': 'Biz ve Değerlerimiz (Toplumsal yardımlaşma, ön yargılar), Tarihe Yolculuk (İlk Türk Devletleri, Orta Asya Türk kültürü, İslamiyet\'in doğuşu ve Dört Halife Dönemi)',
                'q_sample': 'İlk Türk devletlerinde görülen "Kurultay" meclisinin hükümdarın yetkilerini sınırlandırması ve demokratik niteliği hakkında iki gerekçe belirtiniz.',
                'solution': '1. Gerekçe: Kurultayda boy beyleri ve hatunun da söz hakkı vardı; kararlar tek bir kişinin keyfi isteğiyle değil istişare ile alınırdı (5 Puan).\n2. Gerekçe: Hakan töreye uymak zorundaydı, töre kuralları kurultay denetiminde uygulanır ve gerektiğinde kağanın yetkileri sınırlandırılırdı (5 Puan).',
                'rubrik': 'İki gerekçenin tarihsel terimlerle açıklanması: 10 Puan.'
            },
            {
                'name': 'Din Kültürü ve Ahlak Bilgisi',
                'topics': 'Peygamber ve İlahi Kitap İnancı (Peygamberlerin sıfatları: Sıdk, Emanet, İsmet, Fetanet, Tebliğ; İlahi kitaplar ve gönderildiği peygamberler)',
                'q_sample': 'Peygamberlerin sıfatlarından "Fetanet" ve "İsmet" kavramlarını açıklayınız.',
                'solution': '1. Fetanet: Peygamberlerin üstün bir akla, güçlü bir zekaya, feraset ve kavrayış yeteneğine sahip olmaları demektir (5 Puan).\n2. İsmet: Peygamberlerin gizli ve açık her türlü günahtan, çirkin davranışlardan ve şirkten Allah tarafından korunmuş olmaları sıfatıdır (5 Puan).',
                'rubrik': 'Kavram tanımları eksiksiz: 10 Puan.'
            },
            {
                'name': 'İngilizce',
                'topics': 'Life (Daily routines, telling the time, dates), Yummy Breakfast (Food and drinks, expressing likes and dislikes)',
                'q_sample': 'Write a short paragraph (3-4 sentences) describing your daily morning routine using the time expressions (at 07:00, then, after breakfast).',
                'solution': 'I wake up at 07:00 in the morning and wash my hands and face. Then, I have a healthy breakfast with my family. After breakfast, I brush my teeth and leave home for school at 08:15.',
                'rubrik': 'Zaman ifadeleri ve geniş zaman gramer uyumu: 10 Puan.'
            }
        ]
    },
    {
        'grade': 7,
        'title': '7. Sınıf 1. Dönem 1. Yazılı Soruları ve Cevapları: MEB Maarif Modeli Senaryoları (PDF İndir)',
        'slug': '7-sinif-1-donem-1-yazili-sorulari-ve-cevaplari-meb-senaryolari',
        'category': '7. Sınıf',
        'category_slug': '7-sinif',
        'featured_image': 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
        'image_alt': '7. sınıf 1. dönem 1. yazılı soruları ve cevapları açık uçlu meb senaryoları pdf',
        'excerpt': '7. sınıf 1. dönem 1. yazılı sınav soruları ve çözümleri. Tam sayılar, rasyonel sayılar, fen ve Türkçe zümre senaryoları, açık uçlu sorular ve ücretsiz PDF dokümanları.',
        'book_slug': '2026-2027-meb-matematik-ders-kitabi-cevaplari-7-sinif-1-kitap',
        'book_title': '7. sınıf matematik ders kitabı çözümleri',
        'subjects_data': [
            {
                'name': 'Matematik',
                'topics': 'Tam Sayılarla İşlemler (Toplama, çıkarma, çarpma, bölme, modelleme ve sayı doğrusu), Tam Sayıların Kuvvetleri, Tam Sayı Problemleri, Rasyonel Sayılar (Sayı doğrusunda gösterme, ondalık gösterim ve devirli sayılar)',
                'q_sample': 'Hava sıcaklığının gece -8 °C olduğu bir şehirde gündüz sıcaklık 14 °C artmıştır. Ertesi gece ise sıcaklık gündüz ölçülen değerin 19 °C altına düşmüştür. Son durumdaki hava sıcaklığını tam sayılarla işlem adımlarını göstererek bulunuz.',
                'solution': '1. Adım: Gündüz sıcaklığı hesaplanır: (-8) + (+14) = +6 °C (5 Puan).\n2. Adım: Ertesi gece sıcaklığı hesaplanır: (+6) - (+19) = (+6) + (-19) = -13 °C (5 Puan).\nCevap: -13 °C\'dir.',
                'rubrik': 'İki adımlı işlem eksiksiz ve işaretler doğru: 10 Puan.'
            },
            {
                'name': 'Türkçe',
                'topics': 'Fiiller (Eylemler) - İş, Oluş ve Durum Fiilleri, Fiilde Kip ve Kişi Ekleri (Haber ve Dilek Kipleri), Anlam Kayması, Paragrafta Ana Düşünce',
                'q_sample': 'Aşağıdaki cümlelerde geçen fiillerin anlam özelliklerini (İş, Oluş, Durum) karşılarına yazınız:\n1. Sonbaharda bahçedeki ağaçların yaprakları sarardı.\n2. Dedem akşamları balkonda saatlerce dinlenir.\n3. Öğrenciler tahtadaki soruları defterlerine dikkatle yazdılar.',
                'solution': '1. "sarardı" -> Oluş fiili (İrade dışı, kendiliğinden zamanla gerçekleşen değişim) (3 Puan).\n2. "dinlenir" -> Durum fiili (Öznenin durumunu belirtir, nesne almaz, "neyi/kimi" sorusuna cevap vermez) (3 Puan).\n3. "yazdılar" -> İş (Kılış) fiili (Öznenin iradesiyle yapılır, nesne alır, "neyi yazdılar? - soruları") (4 Puan).',
                'rubrik': 'Her doğru fiil türü ve açıklaması: 10 Puan.'
            },
            {
                'name': 'Fen Bilimleri',
                'topics': 'Güneş Sistemi ve Ötesi (Uzay araştırmaları, yapay uydular, uzay kirliliği, teleskop türleri), Gök Cisimleri (Yıldızlar, takımyıldızları, galaksiler, kara delikler), Hücre ve Bölünmeler (Hücrenin yapısı, organeller, bitki ve hayvan hücresi farkları)',
                'q_sample': 'Bitki hücresi ile hayvan hücresi arasındaki 4 temel farkı tablo halinde yazınız.',
                'solution': '1. Hücre Duvarı: Bitki hücresinde vardır, hayvan hücresinde yoktur (2.5 Puan).\n2. Kloroplast: Bitki hücresinde bulunur, hayvan hücresinde bulunmaz (2.5 Puan).\n3. Şekil: Bitki hücresi köşeli, hayvan hücresi yuvarlak yapıdadır (2.5 Puan).\n4. Koful Yapısı: Bitkide büyük ve az sayıda; hayvanda küçük ve çok sayıdadır (2.5 Puan).',
                'rubrik': '4 temel farkın eksiksiz verilmesi: 10 Puan.'
            },
            {
                'name': 'Sosyal Bilgiler',
                'topics': 'Birey ve Toplum (İletişim, ben dili ve sen dili, kitle iletişim araçları ve haklarımız), Türk Tarihinde Yolculuk (Osmanlı Devleti\'nin kuruluşu, iskân ve istimâlet politikası)',
                'q_sample': 'Osmanlı Devleti\'nin Rumeli ve Balkanlar\'da fethettiği topraklarda uyguladığı "İskân" ve "İstimâlet" politikalarının tanımlarını yaparak fethin kalıcı olmasına katkısını açıklayınız.',
                'solution': '1. İskân Politikası: Anadolu\'daki göçebe Türkmen ailelerin fethedilen Balkan topraklarına yerleştirilmesidir. Bölgenin Türkleşmesini ve güvenliğini sağlamıştır (5 Puan).\n2. İstimâlet Politikası: Fethedilen gayrimüslim halka uygulanan hoşgörü, din ve vicdan hürriyeti sağlama politikasıdır. Bölge halkının devlete bağlılığını artırarak isyanları önlemiştir (5 Puan).',
                'rubrik': 'Politikaların tanımı ve katkısı: 10 Puan.'
            },
            {
                'name': 'Din Kültürü ve Ahlak Bilgisi',
                'topics': 'Melek ve Ahiret İnancı (Görülen ve görülmeyen varlıklar, meleklerin özellikleri ve görevleri, dört büyük melek, ahiret hayatının aşamaları)',
                'q_sample': 'Dört büyük meleğin isimlerini ve Yüce Allah tarafından verilen temel görevlerini yazınız.',
                'solution': '1. Cebrail (a.s.): Vahiy getirmekle görevlidir (2.5 Puan).\n2. Mikail (a.s.): Tabiat olaylarını ve rızıkları idare etmekle görevlidir (2.5 Puan).\n3. İsrafil (a.s.): Kıyamet vakti ve yeniden dirilişte Sûr\'a üflemekle görevlidir (2.5 Puan).\n4. Azrail (a.s.): Eceli gelenlerin ruhunu teslim almakla (ölüm) görevlidir (2.5 Puan).',
                'rubrik': 'Dört melek ve görevleri: 10 Puan.'
            },
            {
                'name': 'İngilizce',
                'topics': 'Appearance and Personality (Physical appearance, personality traits, making comparisons - comparatives), Sports (Types of sports, frequency adverbs)',
                'q_sample': 'Write 3 comparative sentences comparing two people or two sports using the following adjectives: "tall", "hardworking", "dangerous".',
                'solution': '1. Tall: Ahmet is taller than Mehmet (3 Puan).\n2. Hardworking: Ayşe is more hardworking than her brother (3.5 Puan).\n3. Dangerous: Climbing is more dangerous than swimming (3.5 Puan).',
                'rubrik': 'Doğru comparative kuralları (-er / more): 10 Puan.'
            }
        ]
    },
    {
        'grade': 8,
        'title': '8. Sınıf 1. Dönem 1. Yazılı Soruları ve Cevapları: LGS Uyumlu MEB Senaryoları (PDF İndir)',
        'slug': '8-sinif-1-donem-1-yazili-sorulari-ve-cevaplari-meb-senaryolari',
        'category': '8. Sınıf',
        'category_slug': '8-sinif',
        'featured_image': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
        'image_alt': '8. sınıf lgs 1. dönem 1. yazılı sınav soruları ve meb senaryoları pdf indir',
        'excerpt': '8. sınıf 1. dönem 1. yazılı soruları ve cevap anahtarları. LGS soru mantığıyla örtüşen açık uçlu matematik, fen, Türkçe ve İnkılap Tarihi örnek senaryoları ve PDF indir.',
        'book_slug': '2026-2027-meb-8-sinif-matematik-ders-kitabi-cevaplari',
        'book_title': '8. sınıf matematik ders kitabı cevapları',
        'subjects_data': [
            {
                'name': 'Matematik',
                'topics': 'Çarpanlar ve Katlar (Asal çarpanlara ayırma, EBOB - EKOK problemleri, aralarında asal sayılar), Üslü İfadeler (Tam sayı kuvvetleri, üslü ifadelerle çarpma ve bölme, çok büyük ve çok küçük sayılar, bilimsel gösterim)',
                'q_sample': 'Kenar uzunlukları 72 metre ve 90 metre olan dikdörtgen şeklindeki bir bahçenin etrafına, köşelere de gelmek şartıyla eşit aralıklarla fidan dikilecektir. En az kaç fidana ihtiyaç olduğunu adım adım hesaplayınız.',
                'solution': '1. Adım: Fidan sayısının en az olması için iki fidan arası mesafenin en büyük olması gerekir. EBOB(72, 90) bulunur.\n72 = 2^3 * 3^2, 90 = 2 * 3^2 * 5 -> EBOB(72, 90) = 2 * 3^2 = 18 metre (5 Puan).\n2. Adım: Bahçenin çevresi hesaplanır: Çevre = 2 * (72 + 90) = 2 * 162 = 324 metre (2 Puan).\n3. Adım: Toplam fidan sayısı: 324 / 18 = 18 fidan (3 Puan).\nCevap: 18 fidandır.',
                'rubrik': 'EBOB tespiti: 5 Puan. Çevre hesabı ve fidan sayısı: 5 Puan.'
            },
            {
                'name': 'Türkçe',
                'topics': 'Fiilimsiler (İsim-fiil, sıfat-fiil, zarf-fiil ekleri ve görevleri), Cümlenin Ögeleri (Temel ögeler: Yüklem, özne; Yardımcı ögeler: Nesne, yer tamlayıcısı, zarf tamlayıcısı), Söz Sanatları',
                'q_sample': '"Yağmur dindiğinde ıslak sokaklarda yürüyen yaşlı adamı merakla izledik." cümlesindeki fiilimsileri bularak türlerini yazınız ve cümlenin ögelerini ayırınız.',
                'solution': '1. Fiilimsiler: "dindiğinde" -> Zarf-fiil (-dığında); "yürüyen" -> Sıfat-fiil (-en) (4 Puan).\n2. Öge Ayrımı: İzledik (Yüklem) / Biz (Gizli Özne) / Yağmur dindiğinde (Zarf Tamlayıcısı) / ıslak sokaklarda yürüyen yaşlı adamı (Belirtili Nesne) / merakla (Zarf Tamlayıcısı) (6 Puan).',
                'rubrik': 'Fiilimsiler: 4 Puan. Ögelerin eksiksiz tespiti: 6 Puan.'
            },
            {
                'name': 'Fen Bilimleri',
                'topics': 'Mevsimler ve İklim (Dünya\'nın dönme ekseni eğikliği, Güneş ışınlarının geliş açısı, mevsimlerin oluşumu, iklim ve hava hareketleri, rüzgâr oluşumu, yüksek ve alçak basınç)',
                'q_sample': '21 Aralık tarihinde Güneş ışınlarının dik geldiği enlemi yazarak Kuzey Yarım Küre ve Güney Yarım Küre\'de hangi mevsimlerin başladığını ve gündüz sürelerinin durumunu açıklayınız.',
                'solution': '1. 21 Aralık\'ta Güneş ışınları Oğlak Dönencesi\'ne (Güney Yarım Küre) öğle vakti dik açıyla düşer (3 Puan).\n2. Güney Yarım Küre\'de Yaz mevsimi başlar ve yılın en uzun gündüzü yaşanır (3.5 Puan).\n3. Kuzey Yarım Küre\'de Kış mevsimi başlar ve yılın en uzun gecesi (en kısa gündüz) yaşanır (3.5 Puan).',
                'rubrik': 'Dönence ve ışın açısı: 3 Puan. Her iki yarım kürede mevsim ve gündüz süresi: 7 Puan.'
            },
            {
                'name': 'TC. İnkılap Tarihi ve Atatürkçülük',
                'topics': 'Bir Kahraman Doğuyor (Mustafa Kemal\'in çocukluğu, öğrenim hayatı, fikir hayatını etkileyen şehirler ve yazarlar), Milli Uyanış (I. Dünya Savaşı nedenleri, Osmanlı Devleti\'nin savaştığı cepheler, Mondros Ateşkesi)',
                'q_sample': 'Mustafa Kemal\'in Manastır Askeri İdadisi yıllarında fikir dünyasının gelişmesinde rol oynayan yerli ve yabancı düşünürlerden ikişer örnek vererek ona kattıkları kazanımları yazınız.',
                'solution': '1. Yerli Düşünürler: Namık Kemal (Vatan ve hürriyet sevgisi) ve Ziya Gökalp (Milliyetçilik ve Türkçülük fikirleri) (5 Puan).\n2. Yabancı Düşünürler: Jean-Jacques Rousseau ve Montesquieu (Cumhuriyet, adalet, eşitlik ve milli egemenlik kavramları) (5 Puan).',
                'rubrik': 'Düşünür isimleri ve kattığı fikir boyutları: 10 Puan.'
            },
            {
                'name': 'Din Kültürü ve Ahlak Bilgisi',
                'topics': 'Kader ve Kaza İnancı (Kader ve kaza kavramları, Allah\'ın evrene koyduğu yasalar: Fiziksel, biyolojik ve toplumsal yasalar; İnsanın iradesi ve kader)',
                'q_sample': 'Evrendeki biyolojik yasalara iki örnek vererek bu yasaların canlı yaşamının sürekliliğindeki rolünü açıklayınız.',
                'solution': '1. Örnekler: Kuşların uçabilmesi için kemiklerinin hafif ve içi boş olması; develerin çölde susuzluğa dayanıklı hörgüç yapısına sahip olması (5 Puan).\n2. Canlı yaşamındaki rolü: Canlıların çevre şartlarına uyum sağlamasını (adaptasyon) ve nesillerini sağlıklı biçimde devam ettirmesini sağlar (5 Puan).',
                'rubrik': 'Örnekler: 5 Puan. Açıklama: 5 Puan.'
            },
            {
                'name': 'İngilizce',
                'topics': 'Friendship (Personal traits of a good friend, accepting and refusing offers, making excuses), Teen Life (Daily activities, music and book preferences)',
                'q_sample': 'Your friend invities you to a cinema event on Sunday afternoon. Refuse the invitation politely and give an excuse in 2 English sentences.',
                'solution': 'I would love to come, but I can\'t because I have to study for my English exam on Sunday afternoon (5 Puan). Thank you for inviting me anyway, maybe next time (5 Puan).',
                'rubrik': 'Kibar ret ifadesi ve mantıklı mazeret cümlesi: 10 Puan.'
            }
        ]
    },
    {
        'grade': 9,
        'title': '9. Sınıf 1. Dönem 1. Yazılı Soruları ve Cevapları: Yeni Müfredat MEB Senaryoları (PDF İndir)',
        'slug': '9-sinif-1-donem-1-yazili-sorulari-ve-cevaplari-meb-senaryolari',
        'category': '9. Sınıf',
        'category_slug': '9-sinif',
        'featured_image': 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
        'image_alt': '9. sınıf 1. dönem 1. yazılı soruları ve meb maarif modeli senaryoları pdf',
        'excerpt': '9. sınıf 1. dönem 1. yazılı soruları ve cevapları. Türkiye Yüzyılı Maarif Modeli 9. sınıf müfredatına uygun açık uçlu matematik, fizik, kimya, edebiyat senaryoları ve PDF indir.',
        'book_slug': '2026-2027-meb-matematik-ders-kitabi-cevaplari',
        'book_title': '9. sınıf matematik ders kitabı cevapları',
        'subjects_data': [
            {
                'name': 'Matematik',
                'topics': 'Türkiye Yüzyılı Maarif Modeli Uyumlu: Mantık (Önerme kavramı, bileşik önermeler, ve-veya-ise-ancak ve ancak bağlaçları, koşullu önermenin karşıtı, tersi, karşıt tersi, niceleyiciler), Kümeler (Kümelerde temel kavramlar, alt küme, kartezyen çarpım, kümelerle işlemler ve problemler)',
                'q_sample': 'p ve q iki önerme olmak üzere; [(p => q) ^ p\'] => q\' önermesinin en sade halini doğruluk değerlerini ve mantık kurallarını kullanarak adım adım gösteriniz.',
                'solution': '1. Adım: p => q önermesinin dengi yazılır: p => q = p\' v q (2 Puan).\n2. Adım: İfade [(p\' v q) ^ p\'] haline gelir. Dağılma veya yutma kuralı uygulanır: p\' ^ (p\' v q) = p\' (4 Puan).\n3. Adım: Ana ifade p\' => q\' olur (2 Puan).\n4. Adım: p\' => q\' = (p\')\' v q\' = p v q\' (2 Puan).\nCevap: p v q\' (veya karşıt tersi q => p).',
                'rubrik': 'İşlem adımları ve mantık kuralları: 10 Puan.'
            },
            {
                'name': 'Türk Dili ve Edebiyatı',
                'topics': 'Giriş (Edebiyatın tanımı, güzel sanatlar içindeki yeri, edebiyatın bilim dallarıyla ilişkisi, metinlerin sınıflandırılması, iletişim ögeleri), Hikâye (Olay ve durum hikâyesi farkları, anlatıcı bakış açıları, yazım ve noktalama)',
                'q_sample': 'Olay hikâyesi (Maupassant tarzı) ile Durum hikâyesi (Çehov tarzı) arasındaki 3 temel farkı yazarak Türk edebiyatındaki en önemli temsilcilerini belirtiniz.',
                'solution': '1. Olay Hikâyesi: Belirgin bir serim, düğüm ve çözüm planı vardır; merak ve gerilim ögesi ön plandadır; olay beklenmedik bir sonla biter. Türk edebiyatındaki öncüsü: Ömer Seyfettin (5 Puan).\n2. Durum Hikâyesi: Hayatın içinden bir kesit sunulur; serim-düğüm-çözüm planına sıkı sıkıya bağlı kalınmaz; duygu, atmosfer ve psikolojik tahliller öne çıkar. Türk edebiyatındaki öncüleri: Sait Faik Abasıyanık ve Memduh Şevket Esendal (5 Puan).',
                'rubrik': 'Farklar: 6 Puan. Temsilciler: 4 Puan.'
            },
            {
                'name': 'Fizik',
                'topics': 'Fizik Bilimine Giriş (Fiziğin alt dalları: Mekanik, Elektromanyetizma, Termodinamik, Optik, vb.; Temel ve türetilmiş büyüklükler; Skaler ve vektörel büyüklükler), Madde ve Özellikleri (Kütle, hacim, özkütle, adezyon, kohezyon, yüzey gerilimi ve kılcallık)',
                'q_sample': 'Kütlesi 240 gram olan homojen bir katı cisim, içerisinde 150 cm³ seviyesine kadar su bulunan dereceli silindire bırakıldığında su seviyesi 210 cm³ çizgisine yükselmektedir. Cimin özkütlesini formülünü yazıp birimini belirterek hesaplayınız.',
                'solution': '1. Adım: Taşma/yükselme miktarından cismin hacmi bulunur:\nV_cisim = V_son - V_ilk = 210 - 150 = 60 cm³ (3 Puan).\n2. Adım: Özkütle formülü yazılır: d = m / V (2 Puan).\n3. Adım: Değerler yerine konur: d = 240 g / 60 cm³ = 4 g/cm³ (5 Puan).\nCevap: 4 g/cm³.',
                'rubrik': 'Hacim tespiti: 3 Puan. Formül: 2 Puan. Birimli doğru sonuç: 5 Puan.'
            },
            {
                'name': 'Kimya',
                'topics': 'Kimya Bilimi (Simyadan kimyaya geçiş, kimya disiplinleri: Biyokimya, analitik kimya, organik kimya vb., kimyanın sembolik dili: Element sembolleri ve bileşik formülleri, güvenlik piktogramları)',
                'q_sample': 'Aşağıdaki bileşiklerin yaygın (geleneksel) adlarını ve yapılarındaki element türlerini yazınız:\n1. HNO3\n2. CaCO3\n3. H2SO4',
                'solution': '1. HNO3: Yaygın adı Kezzap (Nitrik asit). İçerdiği elementler: Hidrojen (H), Azot (N), Oksijen (O) (3.5 Puan).\n2. CaCO3: Yaygın adı Kireç taşı (Kalsiyum karbonat). İçerdiği elementler: Kalsiyum (Ca), Karbon (C), Oksijen (O) (3 Puan).\n3. H2SO4: Yaygın adı Zaç yağı (Sülfürik asit). İçerdiği elementler: Hidrojen (H), Kükürt (S), Oksijen (O) (3.5 Puan).',
                'rubrik': 'Yaygın adlar ve elementler: 10 Puan.'
            },
            {
                'name': 'Biyoloji',
                'topics': 'Yaşam Bilimi Biyoloji (Canlıların ortak özellikleri: Hücresel yapı, beslenme, hücresel solunum, metabolizma, homeostazi, boşaltım, üreme, adaptasyon vb.), Canlıların Temel Bileşikleri (İnorganik ve organik bileşikler, suyun özellikleri, mineraller, karbonhidratlar)',
                'q_sample': 'Canlıların tümünde ortak olarak gerçekleşen "Homeostazi" kavramını tanımlayarak, insanın vücut sıcaklığını sabit tutması üzerinden bir örnekle açıklayınız.',
                'solution': '1. Tanım: Değişen çevre koşullarına rağmen canlının iç dengesini kararlı ve sabit tutabilme yeteneğidir (5 Puan).\n2. Örnek: Sıcak havada vücut ısısı yükseldiğinde terleme mekanizması devreye girer. Terin buharlaşmasıyla vücut ısı kaybeder ve iç sıcaklık 36.5 - 37 °C civarında sabit tutulur (5 Puan).',
                'rubrik': 'Tanım: 5 Puan. Biyolojik örnek ve mekanizma: 5 Puan.'
            },
            {
                'name': 'Tarih',
                'topics': 'Tarih ve Zaman (Tarihin tanımı, konusu, yöntemi; Tarihi olay ve olgu ayrımı; Kaynak türleri: Birinci ve ikinci elden kaynaklar; Takvim sistemleri)',
                'q_sample': '"Tarihi Olay" ile "Tarihi Olgu" kavramları arasındaki farkı açıklayarak Malazgirt Savaşı ve Anadolu\'nun Türkleşmesi üzerinden örneklendiriniz.',
                'solution': '1. Tarihi Olay: Başlangıcı ve bitişi belli olan, kısa süreli, somut ve biricik gelişmelerdir. Örnek: 1071 yılında gerçekleşen Malazgirt Meydan Muharebesi bir olaydır (5 Puan).\n2. Tarihi Olgu: Olayların sonucunda uzun bir zaman diliminde meydana gelen, başlangıç ve bitişi kesin sınırlarla çizilemeyen genel ve soyut süreçlerdir. Örnek: Malazgirt Zaferi sonrasında yüzyıllar süren Anadolu\'nun Türkleşmesi ve İslamlaşması süreci bir olgudur (5 Puan).',
                'rubrik': 'Kavram tanımları: 5 Puan. Doğru eşleştirme ve örnekleme: 5 Puan.'
            },
            {
                'name': 'Coğrafya',
                'topics': 'Doğa ve İnsan (Coğrafyanın konusu ve bölümleri, fiziki ve beşeri coğrafya alt dalları), Dünya\'nın Şekli ve Hareketleri (Günlük ve yıllık hareket, eksen eğikliğinin sonuçları, enlem ve boylam)',
                'q_sample': 'Dünya\'nın 23° 27\' lik eksen eğikliğine sahip olmasının getirdiği 3 önemli sonucu maddeler halinde yazınız.',
                'solution': '1. Mevsimlerin oluşmasına ve aynı anda iki yarım kürede farklı mevsimlerin yaşanmasına neden olur (3.5 Puan).\n2. Gece ve gündüz sürelerinin yıl boyunca değişmesine ve aydınlanma çemberinin yer değiştirmesine yol açar (3.5 Puan).\n3. Güneş ışınlarının yeryüzüne düşme açısının yıl içinde değişmesine ve gölge boylarının farklılaşmasına sebep olur (3 Puan).',
                'rubrik': '3 temel sonucun net yazılması: 10 Puan.'
            },
            {
                'name': 'Din Kültürü ve Ahlak Bilgisi',
                'topics': 'Bilgi ve İnanç (İslam\'da bilginin kaynakları: Selim akıl, sadık haber, salim duyular; İnançla ilgili temel kavramlar)',
                'q_sample': 'İslam\'a göre doğru bilginin üç ana kaynağını yazarak "Sadık Haber" kavramının neleri kapsadığını açıklayınız.',
                'solution': '1. Üç kaynak: Selim Akıl, Sadık Haber, Salim Duyular (4 Puan).\n2. Sadık Haber: İki kısımdan oluşur: Vahiy (Allah\'ın peygamberlerine indirdiği kutsal kitaplar) ve Mütevatir Haber (Yalan üzerine birleşmesi aklen imkansız bir topluluğun aktardığı haberler ve Peygamberimizin sünneti) (6 Puan).',
                'rubrik': 'Kaynaklar: 4 Puan. Sadık haber kapsamı: 6 Puan.'
            },
            {
                'name': 'İngilizce',
                'topics': 'Studying Abroad (Personal information, countries and nationalities, jobs, family members, asking for and giving directions)',
                'q_sample': 'You meet a new foreign student at your school. Write a 4-line dialogue asking for their country, hobbies and where they live.',
                'solution': '- You: Hello! Where are you from?\n- Student: Hi! I am from Spain.\n- You: What do you like doing in your free time?\n- Student: I love playing basketball and reading history books. I currently live near the city center.',
                'rubrik': 'Doğru soru kalıpları ve doğal diyalog akışı: 10 Puan.'
            }
        ]
    },
    {
        'grade': 10,
        'title': '10. Sınıf 1. Dönem 1. Yazılı Soruları ve Cevapları: MEB Senaryoları ve Ortak Sınav (PDF İndir)',
        'slug': '10-sinif-1-donem-1-yazili-sorulari-ve-cevaplari-meb-senaryolari',
        'category': '10. Sınıf',
        'category_slug': '10-sinif',
        'featured_image': 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80',
        'image_alt': '10. sınıf 1. dönem 1. yazılı sınav soruları ve cevapları açık uçlu meb senaryoları pdf',
        'excerpt': '10. sınıf 1. dönem 1. yazılı soruları ve çözümleri. Sayma, olasılık, elektrik ve kimya kanunları açık uçlu MEB senaryoları, puanlama rubrikleri ve ücretsiz PDF indir.',
        'book_slug': '10-sinif-matematik-ders-kitabi-cevaplari-meb',
        'book_title': '10. sınıf matematik ders kitabı çözümleri',
        'subjects_data': [
            {
                'name': 'Matematik',
                'topics': 'Sayma ve Olasılık (Toplama ve çarpma yoluyla sayma, faktöriyel, permütasyon - sıralama, kombinasyon - seçme, Pascal üçgeni ve Binom açılımı, basit olayların olasılığı)',
                'q_sample': 'A = {0, 1, 2, 3, 4, 5} kümesinin elemanları kullanılarak rakamları farklı 3 basamaklı:\na) Kaç farklı doğal sayı yazılabilir?\nb) Kaç farklı çift doğal sayı yazılabilir? Adım adım hesaplayınız.',
                'solution': 'a) Yüzler basamağına 0 gelemez (5 ihtimal: 1,2,3,4,5). Onlar basamağına 0 dahil kalan 5 rakam gelebilir. Birler basamağına kalan 4 rakam gelebilir.\nToplam = 5 * 5 * 4 = 100 sayı (5 Puan).\n\nb) Çift sayılar için birler basamağı 0 veya (2,4) olmalıdır:\nDurum 1 (Sonu 0 olanlar): Yüzler basamağına 5, onlar basamağına 4, birler basamağına 1 (0) -> 5 * 4 * 1 = 20 sayı.\nDurum 2 (Sonu 2 veya 4 olanlar): Birler basamağına 2 ihtimal. Yüzler basamağına 0 gelemez, geriye 4 ihtimal. Onlar basamağına 0 dahil 4 ihtimal -> 4 * 4 * 2 = 32 sayı.\nToplam çift sayı = 20 + 32 = 52 sayı (5 Puan).',
                'rubrik': 'a şıkkı: 5 Puan. b şıkkı (0 durumunun ayrılması): 5 Puan.'
            },
            {
                'name': 'Türk Dili ve Edebiyatı',
                'topics': 'Giriş (Türk edebiyatının dönemleri, Türkçenin tarihi gelişimi), Hikâye (Dede Korkut Hikâyeleri, Halk Hikâyeleri, Mesnevi, Tanzimat ve Milli Edebiyat hikâyeleri, fiilimsiler ve imla kuralları)',
                'q_sample': 'Dede Korkut Hikâyelerinin nazım-nesir karışık yapısı, dili ve destandan halk hikâyeciliğine geçişteki önemi hakkında 3 özellik yazınız.',
                'solution': '1. Eser, olay anlatımlarında nesir (düz yazı), kahramanların duygu, yakarış ve karşılıklı konuşmalarında ise nazım (şiir) formundadır (3.5 Puan).\n2. Destan geleneğinden halk hikâyeciliğine geçişin ilk ve en önemli köprü eseridir; olağanüstü ögelerle gerçekçi hayat iç içedir (3.5 Puan).\n3. Dili 14-15. yüzyıl Oğuz Türkçesidir; Türk milletinin töresi, aile yapısı, kahramanlığı ve İslami motifler zengin bir üslupla aktarılır (3 Puan).',
                'rubrik': '3 özelliğin edebi nitelikleriyle açıklanması: 10 Puan.'
            },
            {
                'name': 'Fizik',
                'topics': 'Elektrik ve Manyetizma (Elektrik akımı, potansiyel farkı ve direnç, Ohm Kanunu, dirençlerin seri ve paralel bağlanması, eşdeğer direnç hesabı, elektrik devrelerinde voltmetre ve ampermetre ölçümleri)',
                'q_sample': 'Bir elektrik devresinde 6 Ω ve 3 Ω\'luk iki direnç birbirine paralel, bu ikiliye seri olarak da 4 Ω\'luk bir direnç bağlanmıştır. Devreye 30 V\'luk bir üreteç bağlandığında ana koldan geçen akımı ve paralel kolların her birinden geçen akımları hesaplayınız.',
                'solution': '1. Adım: Paralel dirençlerin eşdeğeri bulunur:\n1/Rp = 1/6 + 1/3 = 3/6 -> Rp = 2 Ω (3 Puan).\n2. Adım: Devrenin toplam eşdeğer direnci hesaplanır:\nReş = Rp + Rseri = 2 + 4 = 6 Ω (2 Puan).\n3. Adım: Ana kol akımı (Ohm Kanunu): I_ana = V / Reş = 30 / 6 = 5 Amper (2 Puan).\n4. Adım: Paralel kollardaki gerilim: Vp = I_ana * Rp = 5 * 2 = 10 V.\n6 Ω\'luk koldan geçen akım: I1 = 10 / 6 = 5/3 A.\n3 Ω\'luk koldan geçen akım: I2 = 10 / 3 A (3 Puan).',
                'rubrik': 'Eşdeğer direnç: 5 Puan. Akım paylaşımları ve birimler: 5 Puan.'
            },
            {
                'name': 'Kimya',
                'topics': 'Kimyanın Temel Kanunları (Kütlenin Korunumu Kanunu - Lavoisier, Sabit Oranlar Kanunu - Proust, Katlı Oranlar Kanunu - Dalton), Mol Kavramı (Mol - kütle, mol - tane sayısı, Avogadro sayısı, mol - hacim ilişkileri)',
                'q_sample': 'XY2 bileşiğinde kütlece birleşme oranı mX / mY = 3/8\'dir. Buna göre 24 gram X elementi ile yeterli miktarda Y elementinin tam verimli tepkimesinden kaç gram XY2 bileşiği elde edilir ve bu işlemde kaç gram Y harcanır?',
                'solution': '1. Adım: Sabit orana göre 3 gram X ile 8 gram Y tepkimeye girerek 11 gram XY2 oluşturur (3 Puan).\n2. Adım: Kat oranı bulunur: X\'ten 24 gram alınmıştır. Kat = 24 / 3 = 8 kattır (3 Puan).\n3. Adım: Harcanan Y miktarı = 8 * 8 = 64 gram Y harcanır (2 Puan).\n4. Adım: Oluşan XY2 kütlesi = 24 + 64 = 88 gram XY2 oluşur (veya 11 * 8 = 88 gram) (2 Puan).\nCevap: 88 gram bileşik oluşur, 64 gram Y harcanır.',
                'rubrik': 'Oran-orantı mantığı: 6 Puan. Nihai kütlelerin bulunması: 4 Puan.'
            },
            {
                'name': 'Biyoloji',
                'topics': 'Hücre Bölünmeleri (Hücre döngüsü ve kontrolü, Mitoz bölünme evreleri: Profaz, Metafaz, Anafaz, Telofaz; Sitokinez, Eşeysiz üreme çeşitleri: Bölünerek üreme, tomurcuklanma, rejenerasyon, vejetatif üreme)',
                'q_sample': '2n = 4 kromozomlu bir hayvan hücresinin mitoz bölünmesinin Metafaz ve Anafaz evrelerini çizerek bu evrelerde gerçekleşen temel kromozom hareketlerini açıklayınız.',
                'solution': '1. Metafaz Evresi: 4 kromozom hücrenin ekvatoral düzlemine (ortasına) yan yana tek sıra halinde dizilir. Kinetokorlar iğ ipliklerine bağlıdır. Kromozomların en net görüldüğü evredir (5 Puan).\n2. Anafaz Evresi: Sentromerlerin bölünmesiyle kardeş kromatitler birbirinden ayrılır ve zıt kutuplara çekilir. Bu andan itibaren ayrılan her kromatit bağımsız bir kromozom olarak adlandırılır (Hücrede geçici olarak kromozom sayısı iki katına çıkar: 8 kromozom) (5 Puan).',
                'rubrik': 'Şematik anlatım/çizim: 4 Puan. Evre açıklamaları ve kromatit ayrılması: 6 Puan.'
            },
            {
                'name': 'Tarih',
                'topics': 'Yerleşme ve Devletleşme Sürecinde Selçuklu Türkiyesi (Anadolu\'ya Türk akınları, Pasinler ve Malazgirt Savaşları, Miryokefalon Zaferi ve Anadolu\'nun Türk yurdu oluşu, Haçlı Seferleri ve sonuçları)',
                'q_sample': '1176 Miryokefalon Zaferi\'nin Türk ve Bizans tarihi açısından taşıdığı stratejik önemi iki maddede açıklayınız.',
                'solution': '1. Bizans\'ın Türkleri Anadolu\'dan atma ümidi tamamen sona ermiş, Bizans taarruzdan savunmaya çekilmiştir (5 Puan).\n2. Anadolu\'nun kesin olarak bir Türk yurdu olduğu Avrupalı devletler tarafından kabul edilmiş, batılı kaynaklarda bu tarihten sonra Anadolu "Türkiye" adıyla anılmaya başlanmıştır (5 Puan).',
                'rubrik': 'İki tarihsel sonucun gerekçelendirilmesi: 10 Puan.'
            },
            {
                'name': 'Coğrafya',
                'topics': 'Doğal Sistemler (Dünya\'nın tektonik yapısı, yer kabuğunun katmanları: Sial, sima, manto, çekirdek; Levha tektoniği, Jeolojik zamanlar ve Türkiye\'nin jeolojik gelişimi)',
                'q_sample': 'Türkiye arazisinin büyük bir kısmının III. ve IV. jeolojik zamanlarda oluşmuş genç bir arazi olmasının ülkemizin fiziki yapısına ve depremselliğine olan iki etkisini yazınız.',
                'solution': '1. Ortalama yükseltisi fazla, engebeli ve akarsu akış hızları/hidroelektrik potansiyelleri yüksektir (5 Puan).\n2. Kırıklı fay hatları çok yaygındır; bu nedenle sismik hareketlilik (tektonik deprem riski) yüksektir ve sıcak su/jeotermal kaynaklar bakımından zengindir (5 Puan).',
                'rubrik': 'Genç arazi nitelikleri ve etkileri: 10 Puan.'
            },
            {
                'name': 'Felsefe',
                'topics': 'Felsefeyi Tanıma (Felsefenin tanımı, anlamı, doğuşu, felsefi düşüncenin özellikleri: Rasyonellik, kümülatif olma, refleksif olma, eleştirel olma, evrensellik)',
                'q_sample': 'Felsefi düşüncenin özelliklerinden "Refleksif olma" ve "Kümülatif olma" kavramlarını açıklayınız.',
                'solution': '1. Refleksif Olma: Zihnin kendi bilgi ve düşünceleri üzerine yeniden dönerek düşünmesi, bilginin bilgisini sorgulamasıdır ("Düşünce üzerine düşünme") (5 Puan).\n2. Kümülatif Olma: Felsefi bilgilerin tarihsel süreçte üst üste yığılması, farklı filozofların aynı konuda ortaya koyduğu görüşlerin birikerek zenginleşmesidir (Bilim gibi ilerlemez, yığılır) (5 Puan).',
                'rubrik': 'Her iki kavramın doğru açıklanması: 10 Puan.'
            },
            {
                'name': 'Din Kültürü ve Ahlak Bilgisi',
                'topics': 'Allah İnancı ve İbadet (İbadet kavramı, ibadetin gayesi, ibadette temel ilkeler: İhlas, sünnete uygunluk, kolaylık ve güce yetebilirlik)',
                'q_sample': 'İslam\'da ibadetlerin kabul edilmesinde vazgeçilmez iki şart olan "İhlas" ve "Sünnete Uygunluk" ilkelerini açıklayınız.',
                'solution': '1. İhlas: İbadetlerin gösterişten, riyadan ve dünyevi çıkarlardan uzak; sırf Allah rızası için samimiyetle yapılmasıdır (5 Puan).\n2. Sünnete Uygunluk: İbadetlerin Hz. Peygamber\'in (s.a.v.) gösterdiği ve uyguladığı şekil, kural ve ölçüler doğrultusunda eda edilmesidir (5 Puan).',
                'rubrik': 'Kavramların doğru tanımlanması: 10 Puan.'
            },
            {
                'name': 'İngilizce',
                'topics': 'School Life (Classroom rules, exchanging personal details), Plans (Expressing future plans, be going to, present continuous for future, making appointments)',
                'q_sample': 'Write 3 sentences about your future plans for the upcoming weekend using "be going to" and future time expressions.',
                'solution': '1. I am going to study for my physics exam on Saturday morning.\n2. My friends and I are going to play football in the park on Sunday afternoon.\n3. We are going to visit my grandparents on Sunday evening.',
                'rubrik': 'Be going to kalıbının gramer uyumu ve zaman ifadeleri: 10 Puan.'
            }
        ]
    },
    {
        'grade': 11,
        'title': '11. Sınıf 1. Dönem 1. Yazılı Soruları ve Cevapları: MEB Maarif Modeli Senaryoları (PDF İndir)',
        'slug': '11-sinif-1-donem-1-yazili-sorulari-ve-cevaplari-meb-senaryolari',
        'category': '11. Sınıf',
        'category_slug': '11-sinif',
        'featured_image': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
        'image_alt': '11. sınıf 1. dönem 1. yazılı sınav soruları ve çözümleri meb senaryoları pdf',
        'excerpt': '11. sınıf 1. dönem 1. yazılı sınav soruları ve çözümleri. Trigonometri, vektörler, bağıl hareket, modern atom teorisi açık uçlu sınav senaryoları ve PDF indirme linkleri.',
        'book_slug': '2026-2027-meb-matematik-ders-kitabi-cevaplari-11-sinif',
        'book_title': '11. sınıf matematik ders kitabı çözümleri',
        'subjects_data': [
            {
                'name': 'Matematik',
                'topics': 'Trigonometri (Yönlü açılar, açı ölçü birimleri derece-radyan, birim çember, trigonometrik fonksiyonlar: sin, cos, tan, cot, trigonometrik özdeşlikler, indirgeme formülleri, kosinüs teoremi)',
                'q_sample': 'Bir ABC üçgeninde a = 7 cm, b = 5 cm ve c = 8 cm olduğuna göre, Kosinüs Teoremini uygulayarak B açısının ölçüsünü (m(B)) derece cinsinden bulunuz.',
                'solution': '1. Adım: b kenarına ait Kosinüs Teoremi yazılır:\nb^2 = a^2 + c^2 - 2 * a * c * cos(B) (3 Puan).\n2. Adım: Değerler yerine konur:\n5^2 = 7^2 + 8^2 - 2 * 7 * 8 * cos(B)\n25 = 49 + 64 - 112 * cos(B)\n25 = 113 - 112 * cos(B) (4 Puan).\n3. Adım: cos(B) yalnız bırakılır:\n112 * cos(B) = 113 - 25 = 88\ncos(B) = 88 / 112 = 11 / 14 (veya açı sorulursa cos değeri üzerinden) (3 Puan).\nCevap: cos(B) = 11/14.',
                'rubrik': 'Teorem formülü: 3 Puan. Cebirsel çözüm: 4 Puan. Doğru sonuç: 3 Puan.'
            },
            {
                'name': 'Türk Dili ve Edebiyatı',
                'topics': 'Edebiyat ve Toplum İlişkisi, Tanzimat Dönemi Hikâye ve Romanı, Servet-i Fünun Dönemi Hikâye ve Romanı, Milli Edebiyat Dönemi, Cümlenin Ögeleri',
                'q_sample': 'Tanzimat I. Dönem romanı ile Servet-i Fünun romanını; tema, dil/üslup ve sanat anlayışı (toplum için / sanat için) bakımından karşılaştırınız.',
                'solution': '1. Tanzimat I. Dönem: Sanat toplum içindir anlayışı hakimdir; dil halkın anlayabileceği şekilde sadeleştirilmeye çalışılmıştır; temalar esaret, yanlış batılılaşma, vatan ve hak/adalet gibi toplumsal konulardır (5 Puan).\n2. Servet-i Fünun: Sanat sanat içindir anlayışı esastır; dil son derece ağır, süslü ve Farsça-Arapça tamlamalarla yüklüdür; temalar bireysel aşk, hayal-hakikat çatışması, kaçış ve karamsarlıktır (5 Puan).',
                'rubrik': 'Üç kriterin her iki dönem için karşılaştırılması: 10 Puan.'
            },
            {
                'name': 'Fizik',
                'topics': 'Kuvvet ve Hareket (Vektörler, bileşke vektör, bileşenlerine ayırma, bağıl hareket: Nehir problemleri ve iki boyutlu bağıl hareket, Newton\'ın Hareket Yasaları: Sürtünmeli eğik düzlem ve dinamik)',
                'q_sample': 'Doğuya doğru 40 km/h hızla giden bir K aracındaki sürücü, aynı doğrultuda hareket eden L aracını batıya doğru 15 km/h hızla gidiyormuş gibi görmektedir. L aracının yere göre hızının büyüklüğünü ve yönünü bağıl hız formülünü yazarak bulunuz.',
                'solution': '1. Adım: Bağıl hız bağıntısı yazılır: V_bağıl = V_gözlenen - V_gözlemci (3 Puan).\n2. Adım: Vektörel yönler belirlenir: Doğu (+), Batı (-).\nK aracı gözlemcidir: V_K = +40 km/h.\nBağıl hız batıya doğrudur: V_bağıl = -15 km/h (3 Puan).\n3. Adım: Denklemde yerine konur:\n-15 = V_L - (+40)\nV_L = -15 + 40 = +25 km/h (4 Puan).\nCevap: L aracı doğuya doğru 25 km/h hızla gitmektedir.',
                'rubrik': 'Formül ve işaret kabulü: 6 Puan. Büyüklük ve yön ile nihai sonuç: 4 Puan.'
            },
            {
                'name': 'Kimya',
                'topics': 'Modern Atom Teorisi (Bohr atom modelinin yetersizlikleri, Kuantum sayıları: n, l, ml, ms; Elektron dizilimleri, Aufbau, Pauli ve Hund kuralları, Periyodik sistemde özelliklerin değişimi, Yükseltgenme basamakları)',
                'q_sample': 'Atom numarası 26 olan Fe (Demir) atomunun temel hal elektron dizilimini yazarak:\na) Baş kuantum sayısı n = 3 ve açısal momentum kuantum sayısı l = 2 olan elektron sayısını,\nb) Manyetik kuantum sayısı ml = 0 olan toplam elektron sayısını bulunuz.',
                'solution': '1. Temel hal dizilimi: 1s2 2s2 2p6 3s2 3p6 4s2 3d6 (4 Puan).\na) n = 3 ve l = 2 (d orbitali demektir) -> 3d orbitalindeki elektron sayısıdır: 6 elektron (3 Puan).\nb) ml = 0 olan orbitaller: Her s orbitalinden 2\'şer elektron (1s, 2s, 3s, 4s: toplam 8). Her p orbitalinin 1 alt orbitalinden 2\'şer elektron (2p, 3p: toplam 4). 3d orbitalinde ml = -2,-1,0,1,2 olup 6 elektronun 2 tanesi eşleşmiştir (ml=0\'a en az 1 veya 2 elektron düşer; kurala göre 1 veya 2). Toplam: 13 veya 14 elektron (3 Puan).',
                'rubrik': 'Doğru dizilim: 4 Puan. a ve b şıkkı açıklamaları: 6 Puan.'
            },
            {
                'name': 'Biyoloji',
                'topics': 'İnsan Fizyolojisi - Denetleyici ve Düzenleyici Sistem (Nöronun yapısı, impuls oluşumu ve iletimi, elektrokimyasal iletim, sinapslarda kimyasal iletim, nörotransmitterler, Merkezi Sinir Sistemi: Beyin bölümleri ve omurilik)',
                'q_sample': 'Bir nöronda impuls iletimi sırasında gerçekleşen "Polarizasyon" ve "Depolarizasyon" durumlarında Na+ ve K+ iyonlarının hücre içi ve hücre dışı dağılımını açıklayınız.',
                'solution': '1. Polarizasyon (Dinlenme): Sodyum-Potasyum pompası aktiftir. Na+ iyonları hücre dışında, K+ iyonları hücre içinde daha yoğundur. Hücre dışı pozitif (+), hücre içi negatif (-) yüklüdür (5 Puan).\n2. Depolarizasyon (Uyarılma): Eşik değer veya üzerindeki uyarı geldiğinde Na+ voltaj kapılı kanalları açılır. Na+ iyonları difüzyonla hızla hücre içine girer. Hücre içi pozitif (+), hücre dışı negatif (-) yüklü hale gelir (5 Puan).',
                'rubrik': 'İyon pompaları ve yük dağılımı: 10 Puan.'
            },
            {
                'name': 'Tarih',
                'topics': 'Değişen Dünya Dengeleri Karşısında Osmanlı Siyaseti (1595-1774) (Osmanlı-Habsburg mücadeleleri, Zitvatorok Antlaşması ve diplomatik eşitlik, Kasr-ı Şirin Antlaşması ve bugünkü Türkiye-İran sınırı, Karlofça Antlaşması)',
                'q_sample': '1606 Zitvatorok Antlaşması\'nın 1533 İstanbul Antlaşması ile karşılaştırıldığında Osmanlı Devleti\'nin Avusturya karşısındaki üstünlüğünü kaybetmesine yol açan maddesini yazınız.',
                'solution': '1533 İstanbul Antlaşması\'nda Avusturya arşidükü protokolde Osmanlı sadrazamına eşit sayılmıştı (Osmanlı padişahından aşağıda görülmüştü) (5 Puan).\n1606 Zitvatorok Antlaşması ile Avusturya arşidükü protokolde doğrudan Osmanlı padişahına eşit (Sezar unvanıyla) kabul edilmiştir. Böylece Osmanlı Devleti\'nin diplomatik ve siyasi üstünlüğü sona ermiştir (5 Puan).',
                'rubrik': 'Her iki antlaşmanın protokol farkı: 10 Puan.'
            },
            {
                'name': 'Coğrafya',
                'topics': 'Biyoçeşitlilik (Biyoçeşitliliği etkileyen faktörler: Fiziki, paleocoğrafik ve biyolojik faktörler; Biyomlar ve özellikleri), Ekosistemlerin İşleyişi (Madde döngüleri: Karbon ve azot döngüsü, enerji akışı ve besin zinciri)',
                'q_sample': 'Atmosferdeki serbest azotun canlılar tarafından kullanılabilmesi için gerekli olan "Azot Fiksasyonu" (bağlanması) olayının biyotik ve abiyotik yollarını açıklayınız.',
                'solution': '1. Biyotik Yol: Baklagillerin kök yumrularında yaşayan azot bağlayıcı bakteriler (Rhizobium) ve toprak bakterileri havadaki azotu toprağa nitrat ve nitrite dönüştürerek bağlar (5 Puan).\n2. Abiyotik Yol: Şimşek, yıldırım ve volkanik patlamalar sırasında açığa çıkan yüksek elektrik enerjisiyle azot ve oksijen birleşir; yağışlarla toprağa nitrik asit formunda iner (5 Puan).',
                'rubrik': 'Biyotik ve abiyotik mekanizmaların açıklanması: 10 Puan.'
            },
            {
                'name': 'Felsefe',
                'topics': 'MÖ 6. Yüzyıl - MS 2. Yüzyıl Felsefesi (Felsefenin ortaya çıkış koşulları, Antik Yunan\'da doğa filozofları ve Arkhe problemi: Thales, Anaksimandros, Herakleitos, Parmenides; Sokrates ve Sofistler)',
                'q_sample': 'İlk Çağ doğa filozoflarından Herakleitos ve Parmenides\'in "Değişim ve Varlık" anlayışlarını karşılaştırarak temel savlarını yazınız.',
                'solution': '1. Herakleitos: Evrende kalıcı hiçbir şey yoktur, her şey sürekli bir akış ve değişim halindedir ("Aynı ırmakta iki kez yıkanılmaz"). Arkhe ateştir; zıtların çatışması ve uyumu (logos) evreni yönetir (5 Puan).\n2. Parmenides: Değişim bir yanılsamadır (duyuların aldatmacasıdır). "Varlık vardır, yokluk yoktur." Varlık birdir, bölünemez, ezeli ve ebedidir, değişmez ve hareketsizdir (5 Puan).',
                'rubrik': 'Her iki düşünürün tezleri ve arkhe anlayışı: 10 Puan.'
            },
            {
                'name': 'Din Kültürü',
                'topics': 'Dünya ve Ahiret (Hayatın anlamı ve amacı, Ahiret alemi aşamaları: Berzah/kabir, kıyamet, ba\'s, haşir ve mahşer, mizan, cennet ve cehennem)',
                'q_sample': 'Ahiret hayatının aşamalarından "Ba\'s" ve "Haşir" kavramlarının anlamlarını yazınız.',
                'solution': '1. Ba\'s: Kıyamet koptuktan sonra İsrafil\'in (a.s.) Sûr\'a ikinci kez üflemesiyle tüm ölülerin Allah tarafından diriltilerek kabirlerinden kalkmasıdır (5 Puan).\n2. Haşir: Diriltilen bütün insanların hesap vermek üzere "Mahşer" adı verilen büyük toplanma meydanında bir araya getirilmesidir (5 Puan).',
                'rubrik': 'Kavram tanımları tam: 10 Puan.'
            },
            {
                'name': 'İngilizce',
                'topics': 'Future Jobs (Future predictions, will / won\'t, talking about qualifications and skills), Hobbies and Skills (Talking about abilities, be able to)',
                'q_sample': 'Write 3 sentences predicting how artificial intelligence and technology will change jobs in the future using "will" or "won\'t".',
                'solution': '1. Artificial intelligence will replace many repetitive and manual jobs in factories.\n2. Doctors will use smart AI algorithms to diagnose diseases much earlier and faster.\n3. Human teachers won\'t disappear because emotional connection and empathy will always be needed.',
                'rubrik': 'Future tense ve mantıklı tahmin ifadeleri: 10 Puan.'
            }
        ]
    },
    {
        'grade': 12,
        'title': '12. Sınıf 1. Dönem 1. Yazılı Soruları ve Cevapları: YKS Odaklı MEB Senaryoları (PDF İndir)',
        'slug': '12-sinif-1-donem-1-yazili-sorulari-ve-cevaplari-meb-senaryolari',
        'category': '12. Sınıf',
        'category_slug': '12-sinif',
        'featured_image': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
        'image_alt': '12. sınıf yks 1. dönem 1. yazılı sınav soruları ve meb senaryoları pdf indir',
        'excerpt': '12. sınıf 1. dönem 1. yazılı soruları ve cevapları. Logaritma, diziler, çembersel hareket ve elektrokimya açık uçlu sınav soruları, YKS uyumlu senaryolar ve PDF indir.',
        'book_slug': '2026-2027-meb-12-sinif-matematik-ders-kitabi-cevaplari',
        'book_title': '12. sınıf matematik ders kitabı çözümleri',
        'subjects_data': [
            {
                'name': 'Matematik',
                'topics': 'Üstel ve Logaritmik Fonksiyonlar (Üstel fonksiyon ve grafiği, logaritma fonksiyonunun tanım kümesi ve özellikleri, taban değiştirme kuralı, logaritmalı denklemler ve eşitsizlikler), Gerçek Sayı Dizileri (Aritmetik ve geometrik diziler)',
                'q_sample': 'log_2 (x - 3) + log_2 (x + 1) = 5 denklemini sağlayan x gerçek sayı değerini çözüm kümesinin tanım aralığını da kontrol ederek adım adım bulunuz.',
                'solution': '1. Adım: Logaritmanın tanım aralığı incelenir:\nx - 3 > 0 => x > 3 ve x + 1 > 0 => x > -1.\nOrtak tanım kümesi: x > 3 olmalıdır (3 Puan).\n2. Adım: Logaritma toplama kuralı uygulanır:\nlog_2 [(x - 3)(x + 1)] = 5 (2 Puan).\n3. Adım: Üstel biçime dönüştürülür:\n(x - 3)(x + 1) = 2^5 = 32\nx^2 - 2x - 3 = 32 => x^2 - 2x - 35 = 0 (3 Puan).\n4. Adım: Çarpanlara ayrılır:\n(x - 7)(x + 5) = 0 => x = 7 veya x = -5.\nTanım aralığı x > 3 olduğundan x = -5 elenir. Çözüm: x = 7 (2 Puan).',
                'rubrik': 'Tanım kümesi kontrolü: 3 Puan. Denklem çözümü: 5 Puan. Kök eleme ve doğru sonuç: 2 Puan.'
            },
            {
                'name': 'Türk Dili ve Edebiyatı',
                'topics': 'Cumhuriyet Dönemi Türk Edebiyatı (1923-1960 arası hikâye ve roman, toplumcu gerçekçiler, bireyin iç dünyasını esas alanlar, milli-dini duyarlılığı yansıtanlar), Kelime Grupları ve İmla',
                'q_sample': 'Cumhuriyet Dönemi 1923-1940 arası Türk hikâye ve romanında işlenen ana temaları belirterek dönemin öne çıkan iki yazarını ve birer eserini yazınız.',
                'solution': '1. Temalar: Kurtuluş Savaşı\'nın yarattığı zorluklar ve kahramanlıklar, Atatürk ilke ve inkılaplarının halka benimsetilmesi, Doğu-Batı çatışması, Anadolu insanının yaşam mücadelesi ve bürokrasi eleştirisi (5 Puan).\n2. Yazarlar ve Eserler:\n- Yakup Kadri Karaosmanoğlu -> "Yaban" romanı (2.5 Puan).\n- Reşat Nuri Güntekin -> "Yeşil Gece" veya "Çalıkuşu" romanı (2.5 Puan).',
                'rubrik': 'Temalar: 5 Puan. Yazar ve eserler: 5 Puan.'
            },
            {
                'name': 'Fizik',
                'topics': 'Çembersel Hareket (Düzgün çembersel hareket kavramları: Periyot, frekans, çizgisel hız, açısal hız, merkezcil ivme, merkezcil kuvvet, yatay ve düşey virajlar, dönerek öteleme hareketi ve eylemsizlik momenti)',
                'q_sample': 'Yarıçapı 50 metre olan sürtünmesiz yatay bir virajda, eğim açısı θ = 37° olarak tasarlanmıştır. Bir aracın bu virajı güvenle savrulmadan dönebilmesi için sahip olması gereken maksimum hız kaç m/s olmalıdır? (g = 10 m/s², sin37° = 0.6, cos37° = 0.8 alınız).',
                'solution': '1. Adım: Eğimli virajda güvenli hız formülü yazılır:\ntan(θ) = V^2 / (g * r) (4 Puan).\n2. Adım: Değerler yerine yazılır:\ntan37° = sin37° / cos37° = 0.6 / 0.8 = 3/4 = 0.75 (2 Puan).\n3. Adım: Denklem çözülür:\n3/4 = V^2 / (10 * 50)\n3/4 = V^2 / 500 => V^2 = 375 => V = √375 = 5√15 m/s (yaklaşık 19.36 m/s) (4 Puan).\nCevap: V = 5√15 m/s.',
                'rubrik': 'Kuvvet diyagramı ve formül: 4 Puan. Sayısal işlem ve birimli sonuç: 6 Puan.'
            },
            {
                'name': 'Kimya',
                'topics': 'Kimya ve Elektrik (Redoks tepkimeleri ve denkleştirme, İstemlilik ve aktiflik, Galvanik piller / Elektrokimyasal hücreler, Standart elektrot potansiyelleri, Nernst denklemi, Derişim pilleri, Korozyon ve kurban anot)',
                'q_sample': 'Standart koşullarda hazırlanan Zn-Cu galvanik pilinde;\nZn²⁺ + 2e⁻ -> Zn (E° = -0.76 V)\nCu²⁺ + 2e⁻ -> Cu (E° = +0.34 V) yarı tepkimeleri verilmiştir.\na) Anot ve katot yarı hücrelerini belirleyiniz.\nb) Standart pil potansiyelini (E°_pil) hesaplayarak pil denklemini yazınız.',
                'solution': 'a) İndirgenme potansiyeli küçük olan metal daha aktiftir ve yükseltgenerek Anot olur:\nZn için E° = -0.76 V daha küçük olduğundan Zn elektrot ANOT\'tur. Cu elektrot KATOT\'tur (4 Puan).\n\nb) Anot yükseltgenme: Zn(k) -> Zn²⁺ + 2e⁻ (E°_yüks = +0.76 V)\nKatot indirgenme: Cu²⁺ + 2e⁻ -> Cu(k) (E°_ind = +0.34 V)\nNet Pil Denklemi: Zn(k) + Cu²⁺(suda) <=> Zn²⁺(suda) + Cu(k) (3 Puan).\nStandart Pil Potansiyeli: E°_pil = E°_yüks + E°_ind = 0.76 + 0.34 = 1.10 Volt (3 Puan).',
                'rubrik': 'Anot-katot seçimi: 4 Puan. Pil denklemi: 3 Puan. E°_pil hesabı: 3 Puan.'
            },
            {
                'name': 'Biyoloji',
                'topics': 'Genden Proteine (Nükleik asitlerin keşfi ve yapısı, DNA ve RNA çeşitleri, DNA replikasyonu ve replikasyon enzimleri: Helikaz, DNA polimeraz, DNA ligaz; Genetik şifre, Transkripsiyon ve Translasyon mekanizması)',
                'q_sample': 'DNA replikasyonunda görev alan Helikaz, DNA Polimeraz ve DNA Ligaz enzimlerinin biyolojik görevlerini maddeler halinde açıklayınız.',
                'solution': '1. Helikaz: Replikasyon orijininde çift sarmal DNA zincirleri arasındaki hidrojen bağlarını kopararak iki kolu fermuar gibi açar (3.5 Puan).\n2. DNA Polimeraz: Açılan atasal zincirlerin karşısına kalıp zincire uygun serbest deoksiribonükleotitleri (A-T, G-C) 5\' -> 3\' yönünde ekleyerek yeni DNA zincirini sentezler ve hata onarımı yapar (3.5 Puan).\n3. DNA Ligaz: Kesintili zincirde oluşan Okazaki parçacıkları arasındaki fosfodiester bağlarını kurarak DNA iplikçiklerini birbirine kesintisiz bağlar (3 Puan).',
                'rubrik': '3 enzimin görevlerinin eksiksiz açıklanması: 10 Puan.'
            },
            {
                'name': 'Tarih',
                'topics': '20. Yüzyıl Başlarında Osmanlı Devleti ve Dünya, I. Dünya Savaşı ve Sonuçları, Milli Mücadele Dönemi (Amasya Genelgesi, Erzurum ve Sivas Kongreleri, TBMM\'nin açılması, Sevr ve Lozan Barış Antlaşması)',
                'q_sample': 'Amasya Genelgesi\'nin (22 Haziran 1919) Türk inkılap tarihindeki yerini ve genelgede yer alan "Milli Mücadelenin Gerekçesi, Amacı ve Yöntemi"ni belirten maddelerini yazınız.',
                'solution': '1. Gerekçe: "Vatanın bütünlüğü, milletin bağımsızlığı tehlikededir. İstanbul Hükümeti üzerine aldığı sorumluluğu yerine getirememektedir." (4 Puan).\n2. Amaç ve Yöntem: "Milletin bağımsızlığını yine milletin azim ve kararı kurtaracaktır." Bu madde aynı zamanda üstü kapalı olarak ilk kez milli egemenlik ilkesine işaret eder (4 Puan).\n3. Önemi: Milli Mücadele\'nin ihtilal beyannamesidir ve ilk kez ulusal bir kongrenin (Sivas) toplanması çağrısı yapılmıştır (2 Puan).',
                'rubrik': 'Gerekçe maddesi: 4 Puan. Amaç-yöntem: 4 Puan. Tarihi önemi: 2 Puan.'
            },
            {
                'name': 'Coğrafya',
                'topics': 'Ekstrem Doğa Olayları (Meteorolojik, jeolojik-jeomorfolojik ve hidrolojik kökenli ekstrem olaylar), Geleceğin Dünyası (Şehirleşme, sanayi ve göç ilişkisi, Türkiye\'nin işlevsel bölgeleri ve kalkınma projeleri: GAP, DOKAP, ZBK vb.)',
                'q_sample': 'Güneydoğu Anadolu Projesi\'nin (GAP) bölgenin tarımsal yapısı, sanayisi ve istihdamı üzerindeki ekonomik etkilerini 3 maddede açıklayınız.',
                'solution': '1. Tarımda sulama imkanlarının artmasıyla nadas alanları azalmış, pamuk ve mısır gibi sanayi bitkilerinin üretimi katlanarak artmıştır (3.5 Puan).\n2. Tarıma dayalı sanayi kolları (çırçır, tekstil, un, yağ fabrikaları) gelişmiş ve bölge ekonomisine canlılık gelmiştir (3.5 Puan).\n3. Bölge dışına olan mevsimlik tarım işçisi göçü azalmış, yerel istihdam ve refah seviyesi yükselmiştir (3 Puan).',
                'rubrik': '3 ekonomik sonucun gerekçeleri: 10 Puan.'
            },
            {
                'name': 'Din Kültürü ve Ahlak Bilgisi',
                'topics': 'İslam ve Bilim (İslam medeniyetinde bilim ve düşüncenin gelişimi, Müslüman bilim insanlarının dünya bilimine katkıları: İbn-i Sina, Harezmi, Biruni, Ali Kuşçu; Kur\'an\'ın akla ve araştırmaya verdiği önem)',
                'q_sample': 'Müslüman bilim insanlarından El-Harezmi ve İbn-i Sina\'nın dünya bilim tarihine yaptıkları öncü katkıları birer eser veya buluş belirterek yazınız.',
                'solution': '1. El-Harezmi: Cebir biliminin kurucusudur. Sıfır (0) rakamını ilk kez matematiğe kazandırmış ve "El-Kitabü\'l-Muhtasar fi Hisabi\'l-Cabr ve\'l-Mukabele" adlı eseriyle Batı\'ya cebiri öğretmiştir (5 Puan).\n2. İbn-i Sina: "Avicenna" olarak bilinir, tıbbın babalarındandır. "El-Kanun fi\'t-Tıbb" (Tıbbın Kanunu) eseri yüzyıllarca Avrupa üniversitelerinde temel tıp ders kitabı olarak okutulmuştur (5 Puan).',
                'rubrik': 'Bilim insanlarının buluş ve eserleri: 10 Puan.'
            },
            {
                'name': 'İngilizce',
                'topics': 'Music (Expressing preferences, music types, musical instruments), Friendship and Human Relations (Making requests, giving advice, modal verbs: should, must, have to)',
                'q_sample': 'Your friend is extremely stressed about university entrance exams (YKS). Write 3 pieces of encouraging advice using modal verbs (should / shouldn\'t / ought to).',
                'solution': '1. You should prepare a realistic study timetable and take regular breaks to rest your mind.\n2. You shouldn\'t compare your test scores with other students because everyone learns at a different pace.\n3. You ought to get enough sleep and eat healthy food before taking mock exams.',
                'rubrik': 'Modal verbs ve anlam uyumu: 10 Puan.'
            }
        ]
    }
]

created_count = 0

for cfg in grades_config:
    g = cfg['grade']
    g_str = str(g)
    title = cfg['title']
    slug = cfg['slug']
    cat = cfg['category']
    cat_slug = cfg['category_slug']
    feat_img = cfg['featured_image']
    img_alt = cfg['image_alt']
    excerpt = cfg['excerpt']
    book_slug = cfg['book_slug']
    book_title = cfg['book_title']

    # Build subjects HTML
    subjects_html = ""
    for s_item in cfg['subjects_data']:
        s_name, page_url, drive_url = get_subject_data(g_str, s_item['name'])
        drive_btn = get_drive_button(drive_url, s_item['name'])
        yp_link = get_yazilideposu_link(page_url, s_item['name'])

        subjects_html += f'''
<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 24px; margin: 24px 0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
  <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px; margin-bottom: 16px;">
    <h3 style="margin: 0; font-size: 20px; font-weight: 800; color: #0f172a;">
      📌 {g}. Sınıf {s_item['name']} 1. Dönem 1. Yazılı Senaryosu
    </h3>
    <span style="background: #e0e7ff; color: #4338ca; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 800;">
      MEB Kazanım Odaklı
    </span>
  </div>

  <div style="margin-bottom: 14px;">
    <strong style="color: #334155; font-size: 13px;">Sınavda Soru Çıkacak Konu ve Kazanım Alanları:</strong>
    <p style="color: #475569; font-size: 14px; margin: 6px 0 12px 0; line-height: 1.6;">
      {s_item['topics']}
    </p>
  </div>

  <div style="background: #f8fafc; border-left: 4px solid #3b82f6; border-radius: 8px; padding: 14px 16px; margin: 16px 0;">
    <span style="display: inline-block; background: #2563eb; color: #ffffff; font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 6px; margin-bottom: 6px;">
      Örnek Açık Uçlu Sınav Sorusu
    </span>
    <p style="font-weight: 700; color: #1e293b; margin: 4px 0 0 0; font-size: 14px; line-height: 1.6;">
      {s_item['q_sample']}
    </p>
  </div>

  <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 14px 16px; margin: 16px 0;">
    <span style="font-weight: 800; color: #15803d; font-size: 12px; display: block; margin-bottom: 6px;">
      ✓ Çözüm Adımları ve Doğru Cevap:
    </span>
    <pre style="white-space: pre-wrap; font-family: inherit; font-size: 13px; color: #166534; line-height: 1.6; margin: 0;">{s_item['solution']}</pre>
    <div style="margin-top: 10px; padding-top: 8px; border-top: 1px dashed #86efac; font-size: 12px; color: #15803d; font-weight: 600;">
      <strong>Öğretmen Puanlama Kriteri (Rubrik):</strong> {s_item['rubrik']}
    </div>
  </div>

  {drive_btn}
  {yp_link}
</div>
'''

    # Build entire content HTML
    content_html = f'''
<div class="blog-article-content" style="line-height: 1.8; color: #1e293b; font-size: 16px;">

  <div style="margin: 0 0 24px 0;">
    <img src="{feat_img}" alt="{img_alt}" style="width: 100%; max-height: 480px; object-fit: cover; border-radius: 24px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);" />
  </div>

  <p style="font-size: 17px; color: #334155; font-weight: 500;">
    Milli Eğitim Bakanlığı'nın yayımladığı Ölçme ve Değerlendirme Yönetmeliği kapsamında okullarda uygulanan 1. dönem 1. yazılı sınavlarında test usulü soru sorulması tamamen kaldırılmış, yerine öğrencilerin analiz ve problem çözme becerilerini ölçen <strong>açık uçlu ve kısa cevaplı senaryo sistemi</strong> getirilmiştir. 
  </p>

  <p>
    İl ve ilçe zümre kurullarının yayımladığı konu soru dağılım tabloları incelendiğinde öğretmenlerin MEB tarafından sunulan Senaryo 1 veya Senaryo 2 seçeneklerinden birini tercih ederek sınav kağıtlarını hazırladıkları görülmektedir. Bu kapsamda <strong>{g}. sınıf 1. dönem 1. yazılı soruları ve cevapları</strong> için tüm derslerin kazanım haritalarını, açık uçlu örnek soru ve rubrik puanlama anahtarlarını, ayrıca çıktı alıp çözebileceğiniz güvenilir PDF indirme kaynaklarını aşağıda derledik.
  </p>

  <h2 style="font-size: 24px; font-weight: 800; color: #0f172a; margin-top: 36px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
    🎯 MEB Maarif Modeli Açık Uçlu Sınavlarında Puan Kaybını Önleme Taktikleri
  </h2>

  <p>
    Sınav kağıtlarını değerlendiren zümre öğretmenleri, MEB'in yayımladığı basamaklı puanlama ölçeklerine (rubrik) göre not vermektedir. Çoktan seçmeli sınavlarda sadece doğru şıkkı işaretlemek yeterliyken, açık uçlu sınavlarda cevabın son basamağı kadar çözümün mantıksal sıralaması da puanlanmaktadır.
  </p>

  <ul style="padding-left: 20px; margin: 16px 0; color: #334155;">
    <li style="margin-bottom: 10px;">
      <strong>Formül ve Bağıntıları Mutlaka Yazın:</strong> Matematik, fen ve fizik gibi sayısal sorularda formülü doğru yazmak genellikle soru puanının %30'unu kazandırır.
    </li>
    <li style="margin-bottom: 10px;">
      <strong>Birim Belirtmeyi Unutmayın:</strong> Sayısal derslerde sonucu 15 bulup yanına "km/h", "cm²", "N" veya "Joule" yazmamak öğretmenlerin 1-2 puan kırmasına sebep olmaktadır.
    </li>
    <li style="margin-bottom: 10px;">
      <strong>Kısmi Puan Kuralı:</strong> Soru çözümünün son basamağında işlem hatası yapsanız bile ilk adımlar doğruysa kısmi puan alırsınız. Bu sebeple bilmediğinizi düşündüğünüz soruları asla tamamen boş bırakmayınız.
    </li>
    <li style="margin-bottom: 10px;">
      <strong>Sözel Derslerde Bütün Cümle Kurun:</strong> Türkçe, edebiyat ve sosyal bilimler sınavlarında tek kelimelik yanıtlar yerine sorunun kökünü kapsayan, imla ve noktalamaya dikkat eden tam cümleler kurmak puanınızı yükseltir.
    </li>
  </ul>

  <div style="background: #eef2ff; border: 1px solid #c7d2fe; border-radius: 16px; padding: 20px; margin: 28px 0;">
    <h4 style="margin: 0 0 8px 0; color: #3730a3; font-weight: 800; font-size: 16px;">
      💡 Öğretmenden Ders Çalışma Önerisi:
    </h4>
    <p style="margin: 0; color: #4338ca; font-size: 14px; line-height: 1.6;">
      Yazılı öncesinde hazırlığınızı pekiştirmek ve takıldığınız kazanımları adım adım gözden geçirmek için sitemizdeki <a href="/post/{book_slug}" style="color: #1e1b4b; font-weight: 800; text-decoration: underline;">{book_title}</a> sayfamızı inceleyebilir, ünite sonu değerlendirme ve sıra sizde çözümlerini kontrol edebilirsiniz. Kendi okulunuza özel ek açık uçlu test üretmek isterseniz <a href="/sinav-hazirlama-robotu" style="color: #1e1b4b; font-weight: 800; text-decoration: underline;">çevrim içi sınav hazırlama robotumuzdan</a> faydalanabilirsiniz.
    </p>
  </div>

  <h2 style="font-size: 24px; font-weight: 800; color: #0f172a; margin-top: 40px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
    📚 {g}. Sınıf 1. Dönem 1. Yazılı Soruları, Senaryolar ve PDF İndirme Alanı
  </h2>

  <p>
    Aşağıda {g}. sınıf müfredatında yer alan temel derslerin her biri için MEB soru dağılım senaryoları, örnek açık uçlu soru-cevap anahtarları ve doğrudan telefonunuza ya da bilgisayarınıza indirebileceğiniz PDF dokümanları sunulmuştur:
  </p>

  {subjects_html}

  <h2 style="font-size: 24px; font-weight: 800; color: #0f172a; margin-top: 40px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
    ❓ {g}. Sınıf 1. Dönem 1. Yazılı Sınavları Hakkında Sıkça Sorulan Sorular
  </h2>

  <div style="margin-top: 20px;">
    <div style="margin-bottom: 20px;">
      <h3 style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 6px;">
        1. Ortak yazılı sınav senaryosu ne anlama gelir?
      </h3>
      <p style="font-size: 14px; color: #475569; margin: 0;">
        MEB Ölçme Genel Müdürlüğü her ders için 2 ila 4 farklı senaryo yayımlar. Her senaryo, hangi kazanımdan kaç adet soru sorulacağını belirleyen resmi tablodur. Okulunuzdaki ders zümresi bu senaryolardan birini seçer ve soruları birebir o dağılıma uygun hazırlamak zorundadır.
      </p>
    </div>

    <div style="margin-bottom: 20px;">
      <h3 style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 6px;">
        2. Yazılı sınavlarda çoktan seçmeli (test) soru çıkacak mı?
      </h3>
      <p style="font-size: 14px; color: #475569; margin: 0;">
        Hayır. MEB yönetmeliği gereği okul bünyesinde yapılan ortak yazılı sınavlarda çoktan seçmeli, doğru-yanlış ve eşleştirme tipi sorular sorulamaz. Tüm sorular kısa cevaplı veya açık uçlu olmak zorundadır.
      </p>
    </div>

    <div style="margin-bottom: 20px;">
      <h3 style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 6px;">
        3. Yanlış cevaplar doğru cevapları götürür mü?
      </h3>
      <p style="font-size: 14px; color: #475569; margin: 0;">
        Yazılı sınavlarda yanlışlar doğruları götürmez. Her soru kendi puan değeri üzerinden puanlanır; öğrencinin yazdığı doğru işlem basamaklarına kısmi puan verilir.
      </p>
    </div>

    <div style="margin-bottom: 20px;">
      <h3 style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 6px;">
        4. Sınava hastalık veya geçerli mazeret sebebiyle katılamayan öğrenci ne yapmalıdır?
      </h3>
      <p style="font-size: 14px; color: #475569; margin: 0;">
        Sağlık raporu veya resmi mazeret belgesini okul idaresine en geç 5 iş günü içinde teslim eden öğrenciler için okul zümre öğretmenleri tarafından eşdeğer zorlukta mazeret sınavı düzenlenir. Detaylı yönerge ve takvim kuralları için <a href="/post/meb-oyss-nedir-ortak-yazili-sinav-sistemi-rehberi" style="color: #4f46e5; text-decoration: underline; font-weight: 600;">MEB OYSS ortak yazılı sınav kılavuzumuzu</a> inceleyebilirsiniz.
      </p>
    </div>
  </div>

</div>
'''

    # Check if exists
    cursor.execute('SELECT id FROM posts WHERE slug=?', (slug,))
    row = cursor.fetchone()

    tags_json = json.dumps([
        f'{g}. Sınıf',
        f'{g}. Sınıf 1. Dönem 1. Yazılı',
        'Yazılı Soruları',
        'MEB Senaryoları',
        'Açık Uçlu Sınav',
        'PDF İndir',
        'Yazılı Deposu'
    ], ensure_ascii=False)

    if row:
        cursor.execute('''
            UPDATE posts SET
                title = ?,
                excerpt = ?,
                content = ?,
                featured_image = ?,
                category = ?,
                category_slug = ?,
                tags = ?,
                updated_at = ?
            WHERE slug = ?
        ''', (title, excerpt, content_html, feat_img, cat, cat_slug, tags_json, now_str, slug))
        print(f"Updated Grade {g}: {slug}")
    else:
        cursor.execute('''
            INSERT INTO posts (
                title, slug, old_slug, excerpt, content, featured_image,
                category, category_slug, tags, author, views, is_published,
                created_at, updated_at
            ) VALUES (?, ?, NULL, ?, ?, ?, ?, ?, ?, 'Matemetrik Zümre Kurulu', 142, 1, ?, ?)
        ''', (title, slug, excerpt, content_html, feat_img, cat, cat_slug, tags_json, now_str, now_str))
        print(f"Inserted Grade {g}: {slug}")
    
    created_count += 1

conn.commit()
conn.close()
print(f"\nAll {created_count} articles generated and saved to database successfully!")
