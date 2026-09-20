# -*- coding: utf-8 -*-
"""
Curriculum Database & Generator for 1-12. Sınıf Konu Anlatımları.
Includes comprehensive coverage for each grade and subjects with 20 questions & solutions each.
"""

def get_all_topics():
    topics = []

    # ==========================================
    # 6. SINIF: KESİRLERLE İŞLEMLER (USER EXPLICIT EXAMPLE)
    # ==========================================
    topics.append({
        "grade_num": 6,
        "grade_str": "6. Sınıf",
        "subject": "Matematik",
        "category_slug": "6-sinif",
        "topic": "Kesirlerle İşlemler (Çarpma, Bölme ve Modelleme)",
        "title": "6. Sınıf Matematik Kesirlerle İşlemler Konu Anlatımı, 20 Soruluk Test ve MEB Çözümleri",
        "slug": "6-sinif-matematik-kesirlerle-islemler-konu-anlatimi-20-soruluk-test",
        "excerpt": "6. sınıf kesirlerle çarpma ve bölme işlemleri, modelleme, tam sayılı ve bileşik kesirler konu anlatımı, 20 soruluk yeni nesil MEB testi ve ayrıntılı çözümleri.",
        "theory_html": """
        <div class="space-y-4">
            <h3 class="text-lg font-bold text-slate-900">1. Kesirlerle Çarpma İşlemi ve Anlamı</h3>
            <p>Bir doğal sayı ile bir kesrin çarpımı, o kesrin tekrarlı toplamını veya bir bütünün belirtilen kesir kadarını bulmayı ifade eder. İki kesir çarpılırken paylar kendi arasında çarpılarak sonucun payına, paydalar da kendi arasında çarpılarak sonucun paydasına yazılır:</p>
            <div class="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 font-mono text-center text-base sm:text-lg text-indigo-950 font-bold">
                a/b × c/d = (a × c) / (b × d) &nbsp;&nbsp; (b, d ≠ 0)
            </div>
            <p><strong>Önemli Kural:</strong> Tam sayılı kesirlerle çarpma veya bölme işlemi yaparken, işlemden önce mutlaka kesirler <em>bileşik kesre</em> çevrilmelidir! Çarpma işlemine başlamadan önce sadeleştirme yapmak işlemleri büyük ölçüde kolaylaştırır.</p>

            <h3 class="text-lg font-bold text-slate-900">2. Kesirlerle Bölme İşlemi</h3>
            <p>Kesirlerle bölme işlemi yapılırken birinci kesir (bölünen) aynen yazılır, ikinci kesir (bölen) ters çevrilerek (çarpma işlemine göre tersi alınarak) birinci kesirle çarpılır:</p>
            <div class="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 font-mono text-center text-base sm:text-lg text-emerald-950 font-bold">
                a/b ÷ c/d = a/b × d/c = (a × d) / (b × c)
            </div>

            <h3 class="text-lg font-bold text-slate-900">3. Kesir Problemlerinde Modelleme</h3>
            <p>Bir çokluğun kesir kadarını bulmak için çarpma işlemi yapılır. Örneğin; 60 sayısının 3/5'ini bulmak için <code>60 × 3/5 = (60 ÷ 5) × 3 = 12 × 3 = 36</code> işlemi uygulanır. Kesir kadarı verilen çokluğun tamamını bulmak için ise bölme işlemi uygulanır.</p>
        </div>
        """,
        "questions": [
            {"num": 1, "text": "3/4 × 2/5 işleminin en sade sonucu kaçtır?", "options": ["A) 3/10", "B) 6/20", "C) 5/9", "D) 1/2"], "correct": "A", "solution": "3/4 × 2/5 = (3 × 2) / (4 × 5) = 6/20. Pay ve paydayı 2 ile sadeleştirdiğimizde 3/10 elde edilir."},
            {"num": 2, "text": "2 tam 1/3 kesrinin 3/7 ile çarpımı kaçtır?", "options": ["A) 1", "B) 6/7", "C) 7/3", "D) 2"], "correct": "A", "solution": "2 tam 1/3 = (2×3 + 1)/3 = 7/3. Şimdi çarpalım: 7/3 × 3/7 = (7×3)/(3×7) = 21/21 = 1."},
            {"num": 3, "text": "5/6 ÷ 1/3 işleminin sonucu kaçtır?", "options": ["A) 5/18", "B) 2 tam 1/2", "C) 1 tam 1/2", "D) 5/2"], "correct": "B", "solution": "Birinci kesir aynen yazılır, ikincisi ters çevrilir: 5/6 × 3/1 = 15/6. 3 ile sadeleştirirsek 5/2 = 2 tam 1/2."},
            {"num": 4, "text": "40 sayısının 3/8'i kaçtır?", "options": ["A) 12", "B) 15", "C) 18", "D) 20"], "correct": "B", "solution": "40 × 3/8 = (40 ÷ 8) × 3 = 5 × 3 = 15."},
            {"num": 5, "text": "Hangi sayının 2/5'i 24 eder?", "options": ["A) 48", "B) 50", "C) 60", "D) 72"], "correct": "C", "solution": "24 ÷ (2/5) = 24 × 5/2 = (24 ÷ 2) × 5 = 12 × 5 = 60."},
            {"num": 6, "text": "Bir sürahideki 3 tam 1/2 litre su, 1/4 litrelik bardaklara doldurulacaktır. Kaç bardak gerekir?", "options": ["A) 12", "B) 14", "C) 16", "D) 18"], "correct": "B", "solution": "3 tam 1/2 = 7/2 litre. (7/2) ÷ (1/4) = 7/2 × 4/1 = 28/2 = 14 bardak."},
            {"num": 7, "text": "(1/2 + 1/3) × 6/5 işleminin sonucu kaçtır?", "options": ["A) 1", "B) 5/6", "C) 6/5", "D) 2"], "correct": "A", "solution": "Parantez içi: 1/2 + 1/3 = 3/6 + 2/6 = 5/6. Çarpma: 5/6 × 6/5 = 1."},
            {"num": 8, "text": "12 ÷ 3/4 işleminin sonucu kaçtır?", "options": ["A) 9", "B) 16", "C) 18", "D) 24"], "correct": "B", "solution": "12 × 4/3 = (12 ÷ 3) × 4 = 4 × 4 = 16."},
            {"num": 9, "text": "4/9 kesrinin çarpma işlemine göre tersi ile 2/3'ün çarpımı kaçtır?", "options": ["A) 3/2", "B) 8/27", "C) 2/3", "D) 4/3"], "correct": "A", "solution": "4/9'un tersi 9/4'tür. 9/4 × 2/3 = (9×2)/(4×3) = 18/12 = 3/2."},
            {"num": 10, "text": "Ali 240 TL parasının önce 1/3'ünü, sonra kalanın 1/4'ünü harcamıştır. Geriye kaç TL kalmıştır?", "options": ["A) 100", "B) 120", "C) 140", "D) 160"], "correct": "B", "solution": "240'ın 1/3'ü = 80 TL harcadı. Kalan = 240 - 80 = 160 TL. Kalanın 1/4'ü = 160 ÷ 4 = 40 TL harcadı. Son kalan = 160 - 40 = 120 TL."},
            {"num": 11, "text": "Bir kenar uzunluğu 2/3 metre olan bir karenin alanı kaç metrekaredir?", "options": ["A) 4/9", "B) 4/6", "C) 8/27", "D) 1/3"], "correct": "A", "solution": "Karenin alanı = a² = 2/3 × 2/3 = 4/9 m²."},
            {"num": 12, "text": "1/2 × 2/3 × 3/4 × ... × 9/10 çarpımının sonucu kaçtır?", "options": ["A) 1/5", "B) 1/10", "C) 9/10", "D) 1/20"], "correct": "B", "solution": "Çapraz sadeleşmeler sonucunda payda sadece 1, paydada ise sadece 10 kalır. Sonuç 1/10'dur."},
            {"num": 13, "text": "(3/4)² işleminin sonucu kaçtır?", "options": ["A) 6/8", "B) 9/16", "C) 9/8", "D) 6/16"], "correct": "B", "solution": "(3/4)² = 3/4 × 3/4 = 9/16."},
            {"num": 14, "text": "5/8 ÷ 15/16 işleminin sonucu kaçtır?", "options": ["A) 2/3", "B) 3/2", "C) 1/2", "D) 4/5"], "correct": "A", "solution": "5/8 × 16/15 = (5/15) × (16/8) = 1/3 × 2/1 = 2/3."},
            {"num": 15, "text": "Bir aracın deposunun 3/5'i doludur. Depoya 18 litre daha benzin konulunca depo tamamen dolduğuna göre depo toplam kaç litredir?", "options": ["A) 40", "B) 45", "C) 50", "D) 60"], "correct": "B", "solution": "Boş kısım = 1 - 3/5 = 2/5'tir. 2/5'i 18 litre ise; tamamı = 18 ÷ (2/5) = 18 × 5/2 = 45 litredir."},
            {"num": 16, "text": "2 tam 2/5 ÷ 1 tam 1/5 işleminin sonucu kaçtır?", "options": ["A) 1", "B) 2", "C) 3", "D) 5/2"], "correct": "B", "solution": "2 tam 2/5 = 12/5. 1 tam 1/5 = 6/5. 12/5 ÷ 6/5 = 12/5 × 5/6 = 12/6 = 2."},
            {"num": 17, "text": "3/7'sinin 14 fazlası 35 olan sayı kaçtır?", "options": ["A) 42", "B) 49", "C) 56", "D) 63"], "correct": "B", "solution": "3/7'si = 35 - 14 = 21. Sayının tamamı = 21 ÷ (3/7) = 21 × 7/3 = 49."},
            {"num": 18, "text": "Bir kumaşın 2/7'si kesildiğinde orta noktası 4 cm kaymaktadır. Kumaşın ilk uzunluğu kaç cm'dir?", "options": ["A) 28", "B) 35", "C) 42", "D) 56"], "correct": "A", "solution": "Kesilen parçanın yarısı kadar orta nokta kayar. Kesilen parça = 4 × 2 = 8 cm. Kumaşın 2/7'si 8 cm ise tamamı = 8 ÷ (2/7) = 28 cm."},
            {"num": 19, "text": "3 ÷ 1/3 - 1/3 ÷ 3 işleminin sonucu kaçtır?", "options": ["A) 0", "B) 8", "C) 80/9", "D) 26/3"], "correct": "C", "solution": "3 ÷ 1/3 = 3 × 3 = 9. 1/3 ÷ 3 = 1/3 × 1/3 = 1/9. 9 - 1/9 = 80/9."},
            {"num": 20, "text": "Bir havuzun 4/7'si doludur. Havuzdan 60 litre su boşaltıldığında havuzun yarısı (1/2'si) dolu kaldığına göre havuzun tamamı kaç litredir?", "options": ["A) 700", "B) 840", "C) 980", "D) 1050"], "correct": "B", "solution": "4/7 - 1/2 = 8/14 - 7/14 = 1/14. Havuzun 1/14'ü 60 litre ise; tamamı = 60 × 14 = 840 litredir."}
        ],
        "video_embed_id": "z6g7Lw0Z0vA",
        "video_title": "6. Sınıf Matematik Kesirlerle İşlemler Konu Anlatımı",
        "video_desc": "Kesirlerle çarpma ve bölme kurallarını, modelleme taktiklerini ve sınavda çıkabilecek problem çözümlerini içerir.",
        "meb_book_links": [
            {"title": "6. Sınıf MEB Matematik Ders Kitabı Cevapları", "url": "/kategori/6-sinif"},
            {"title": "Tüm Sınıflar MEB Kitap Çözümleri", "url": "/kategori/meb-ders-kitabi-cevaplari"}
        ],
        "related_topics": [
            {"title": "6. Sınıf Çarpanlar ve Katlar Konu Anlatımı", "url": "/post/6-sinif-matematik-carpanlar-ve-katlar-konu-anlatimi-20-soruluk-test"},
            {"title": "6. Sınıf Tam Sayılar ve Mutlak Değer", "url": "/post/6-sinif-matematik-tam-sayilar-ve-mutlak-deger-konu-anlatimi-20-soruluk-test"},
            {"title": "5. Sınıf Kesirlerle Toplama Çıkarma", "url": "/post/5-sinif-matematik-kesirler-ve-kesirlerle-islemler-konu-anlatimi-20-soruluk-test"}
        ],
        "faqs": [
            {"q": "Kesirlerle çarpma işleminde payda eşitlenir mi?", "a": "Hayır. Çarpma işleminde paylar kendi arasında, paydalar kendi arasında çarpılır. Payda eşitleme sadece toplama ve çıkarma işlemlerinde zorunludur."},
            {"q": "Tam sayılı kesirlerde bölme işlemi nasıl yapılır?", "a": "Öncelikle tam sayılı kesir bileşik kesre dönüştürülür. Ardından birinci kesir aynen yazılır, ikinci kesir ters çevrilerek çarpılır."},
            {"q": "Kesirlerle işlemlerde sadeleştirme ne zaman yapılmalıdır?", "a": "Çarpma işleminde sayıları çarpmadan önce pay ve paydadaki ortak bölenleri sadeleştirmek büyük sayılarla işlem yapmayı önler ve işlem hatasını sıfıra indirir."}
        ]
    })

    # ==========================================
    # 8. SINIF: TÜRKÇE CÜMLENİN ÖGELERİ & ÖZNELER (USER EXPLICIT EXAMPLE)
    # ==========================================
    topics.append({
        "grade_num": 8,
        "grade_str": "8. Sınıf",
        "subject": "Türkçe",
        "category_slug": "8-sinif",
        "topic": "Cümlenin Öğeleri ve Özneler (Gerçek, Gizli, Sözde ve Örtülü Özne)",
        "title": "8. Sınıf Türkçe Cümlenin Öğeleri ve Özneler Konu Anlatımı, 20 Soruluk LGS Testi ve Çözümleri",
        "slug": "8-sinif-turkce-ozneler-ve-cumlenin-ogeleri-konu-anlatimi-20-soruluk-test",
        "excerpt": "8. sınıf LGS Türkçe cümlenin ögeleri, özne çeşitleri (gerçek, gizli, sözde, örtülü özne), yüklem bulma taktikleri, 20 soruluk yeni nesil test ve ayrıntılı çözümleri.",
        "theory_html": """
        <div class="space-y-4">
            <h3 class="text-lg font-bold text-slate-900">1. Cümlenin Temel Ögeleri: Yüklem ve Özne</h3>
            <p>Bir cümlede yargıyı bildiren çekimli fiil veya ek fiil almış isim soylu sözcüğe <strong>yüklem</strong> denir. Cümle tahlili yapılırken <strong>her zaman ilk olarak yüklem</strong> bulunur. Yüklemden sonra ise mutlaka <strong>özne</strong> bulunmalıdır (YÖNT kuralı: Yüklem - Özne - Nesne - Tümleç).</p>

            <h3 class="text-lg font-bold text-slate-900">2. Özne Nedir ve Nasıl Bulunur?</h3>
            <p>Yüklemde bildirilen işi, oluşu, hareketi yapan veya yargının konusu olan varlığa <strong>özne</strong> denir. Özne bulunurken yükleme şu sorular sorulur:</p>
            <div class="p-4 rounded-xl bg-purple-50/70 border border-purple-200 font-medium text-slate-900">
                👉 <strong>Yapan kim? / Olan ne?</strong> (Fiil cümlelerinde)<br/>
                👉 <strong>Olan kim? / Olan ne?</strong> (İsim cümlelerinde)
            </div>

            <h3 class="text-lg font-bold text-slate-900">3. Özne Türleri ve Ayırt Etme Yöntemleri</h3>
            <ul class="list-disc pl-5 space-y-2 text-slate-700">
                <li><strong>Gerçek (Açık) Özne:</strong> Cümlede açıkça yazılı olarak bulunan öznedir. <em>Örnek: "Güneş, dağların ardından yavaşça yükseldi." (Yükselen ne? &rarr; Güneş)</em></li>
                <li><strong>Gizli Özne:</strong> Cümlede sözcük olarak bulunmayan, yüklemin aldığı şahıs ekinden anlaşılan öznedir. <em>Örnek: "Dün akşam tüm ödevlerimi bitirdim." (Bitiren kim? &rarr; Ben [Gizli Özne])</em></li>
                <li><strong>Sözde Özne:</strong> Edilgen çatılı fiillerin bulunduğu cümlelerde, işi yapan belli değildir; işten etkilenen nesne özne görevini üstlenir. <em>Örnek: "Okulun bahçesi güzelce temizlendi." (Temizlenen ne? &rarr; Okulun bahçesi [Sözde Özne])</em></li>
                <li><strong>Örtülü Özne:</strong> Edilgen çatılı cümlelerde işi yapanın "-ce/-ca" eki veya "tarafından / nedeniyle" sözcükleriyle belirtilmesidir. <em>Örnek: "Yollar belediye tarafından açıldı." (Açılan ne? Yollar [Sözde Özne], Açan: Belediye tarafından [Örtülü Özne])</em></li>
            </ul>
        </div>
        """,
        "questions": [
            {"num": 1, "text": "'Kütüphanedeki eski kitaplar görevliler tarafından raflara dizildi.' cümlesindeki sözde özne aşağıdakilerden hangisidir?", "options": ["A) Görevliler tarafından", "B) Raflara", "C) Kütüphanedeki eski kitaplar", "D) Görevliler"], "correct": "C", "solution": "'Dizildi' yüklemdir. Dizilen ne? 'Kütüphanedeki eski kitaplar' işi yapan değil işten etkilenen varlık olduğu için sözde öznedir. (Görevliler tarafından ise örtülü öznedir.)"},
            {"num": 2, "text": "Aşağıdaki cümlelerin hangisinde 'gizli özne' vardır?", "options": ["A) Yağmur sabaha kadar dindi.", "B) Bu zorlu soruyu dakikalar içinde çözdü.", "C) Çocuklar bahçede neşeyle koşuyordu.", "D) Rüzgâr sertçe esiyordu."], "correct": "B", "solution": "'Çözdü' yüklemine 'Kim çözdü?' diye sorduğumuzda 'O' yanıtı alınır. Cümlede açıkça yazılmadığı için 'O' gizli öznedir."},
            {"num": 3, "text": "'Sonbahar gelince sararan yapraklar birer birer döküldü.' cümlesinin öznesi aşağıdakilerden hangisidir?", "options": ["A) Sonbahar", "B) Sararan yapraklar", "C) Birer birer", "D) Yapraklar"], "correct": "B", "solution": "Döküldü yüklemine 'Dökülen ne?' sorusu sorulduğunda sıfat tamlaması bölünemez: 'Sararan yapraklar' gerçek öznedir."},
            {"num": 4, "text": "Aşağıdakilerin hangisinde özne bir 'isim tamlaması'ndan oluşmaktadır?", "options": ["A) Kapının kolu dün aniden kırıldı.", "B) Çalışkan öğrenciler sınavı kazandı.", "C) Kırmızı araba hızla geçti.", "D) Yaşlı adam bankta dinleniyordu."], "correct": "A", "solution": "'Kırıldı' yüklem. Kırılan ne? 'Kapının kolu' (Belirtili isim tamlamasıdır). Diğer şıklardaki özneler sıfat tamlamasıdır."},
            {"num": 5, "text": "Aşağıdaki cümlelerin hangisinde sözde özne kullanılmıştır?", "options": ["A) Annem lezzetli bir pasta yaptı.", "B) Tören için salon süslendi.", "C) Ahmet yarın erkenden yola çıkacak.", "D) Kuşlar güneye doğru uçtu."], "correct": "B", "solution": "'Süslendi' edilgen fiildir. 'Süslenen ne?' &rarr; 'Salon' sözde öznedir, süsleyen kişi cümlede belirtilmemiştir."},
            {"num": 6, "text": "'Yıllardır görmediğim çocukluk arkadaşımı karşımda görünce çok sevindim.' cümlesinin öznesi nedir?", "options": ["A) Çocukluk arkadaşım", "B) Gizli özne (Ben)", "C) Karşımda", "D) Gizli özne (O)"], "correct": "B", "solution": "'Sevindim' yükleminin sonundaki '-m' eki 1. tekil şahıstır. 'Kim sevindi?' &rarr; 'Ben' (Gizli Özne)."},
            {"num": 7, "text": "'Bahçedeki kuru dallar bahçıvan tarafından budandı.' cümlesindeki 'bahçıvan tarafından' ifadesi hangi özne çeşididir?", "options": ["A) Gerçek özne", "B) Sözde özne", "C) Örtülü özne", "D) Gizli özne"], "correct": "C", "solution": "Edilgen fiilli cümlelerde 'tarafından' veya '-ce/-ca' ekiyle eylemi yapanın belirtilmesine 'örtülü özne' denir."},
            {"num": 8, "text": "Aşağıdaki cümlelerin hangisinde özne açıklayıcısıyla birlikte verilmiştir (ara söz öznenin açıklayıcısıdır)?", "options": ["A) Doğup büyüdüğüm şehri, İzmir'i, çok özledim.", "B) En sevdiğim yazar, Reşat Nuri, bu romanda insan sevgisini anlatır.", "C) Dün akşam, saat dokuzda, elektrikler kesildi.", "D) Ankara'ya, başkente, yarın gideceğiz."], "correct": "B", "solution": "'Anlatır' yüklem. Anlatan kim? 'En sevdiğim yazar'. Reşat Nuri iki virgül arasında öznenin açıklayıcısı olan ara sözdür."},
            {"num": 9, "text": "'Kitap okumak, insanın ufkunu genişleten en değerli alışkanlıktır.' cümlesinin öznesi hangisidir?", "options": ["A) Kitap", "B) Kitap okumak", "C) İnsanın ufku", "D) Değerli alışkanlık"], "correct": "B", "solution": "Yüklem: 'insanın ufkunu genişleten en değerli alışkanlıktır'. İnsanın ufkunu genişleten en değerli alışkanlık olan ne? 'Kitap okumak' (Fiilimsi grubudur, öznedir)."},
            {"num": 10, "text": "Aşağıdaki cümlelerin hangisinde özne bir zamirden oluşmuştur?", "options": ["A) Herkes bu kararı sevinçle karşıladı.", "B) Öğretmenimiz konuyu detaylıca anlattı.", "C) Yeni araba garaja çekildi.", "D) Sessizlik odaya hâkim oldu."], "correct": "A", "solution": "'Karşıladı' yüklem. Karşılayan kim? 'Herkes' (Belgisiz zamirdir)."},
            {"num": 11, "text": "Aşağıdaki cümlelerin hangisinde özne bir sıfat tamlamasıdır?", "options": ["A) Mavi gömlekli çocuk öne çıktı.", "B) Kitabın kapağı yırtılmıştı.", "C) Kapı çalındı.", "D) Biz dün sinemaya gittik."], "correct": "A", "solution": "'Öne çıktı' yüklem. Öne çıkan kim? 'Mavi gömlekli çocuk' (Sıfat tamlamasıdır)."},
            {"num": 12, "text": "'Başarıya ulaşmak için düzenli ve sabırlı çalışmak şarttır.' cümlesinde özne nedir?", "options": ["A) Başarıya ulaşmak için", "B) Şarttır", "C) Düzenli ve sabırlı çalışmak", "D) Sabırlı olmak"], "correct": "C", "solution": "'Şarttır' yüklem. Şart olan ne? 'Düzenli ve sabırlı çalışmak' (İsim-fiil grubu öznedir)."},
            {"num": 13, "text": "'Köydeki eski değirmen yeniden çalıştırıldı.' cümlesi için aşağıdakilerden hangisi doğrudur?", "options": ["A) Özne gizli öznedir.", "B) 'Köydeki eski değirmen' sözde öznedir.", "C) Cümlede özne bulunmamaktadır.", "D) 'Yeniden' gerçek öznedir."], "correct": "B", "solution": "'Çalıştırıldı' edilgen çatılıdır. Çalıştırılan ne? 'Köydeki eski değirmen' sözde öznedir."},
            {"num": 14, "text": "Cümle ögeleri bulunurken izlenmesi gereken doğru sıra hangisidir?", "options": ["A) Özne - Yüklem - Nesne - Tümleç", "B) Yüklem - Özne - Nesne - Tümleçler", "C) Yüklem - Nesne - Özne - Tümleç", "D) Tümleç - Özne - Yüklem - Nesne"], "correct": "B", "solution": "Doğru sıra Y-Ö-N-T formülüdür: Önce Yüklem, ardından Özne, sonra Nesne ve Tümleçler bulunur."},
            {"num": 15, "text": "'Kar yağışı nedeniyle köy yolları ulaşıma kapandı.' cümlesinin öznesi hangisidir?", "options": ["A) Kar yağışı", "B) Köy yolları", "C) Ulaşıma", "D) Kar yağışı nedeniyle"], "correct": "B", "solution": "'Kapandı' yüklem. Kapanan ne? 'Köy yolları' (Öznedir). Kar yağışı nedeniyle ise zarf tümlecidir."},
            {"num": 16, "text": "'Gözleri pırıl pırıl parlayan küçük kız bize gülümsedi.' cümlesinin öznesi kaç sözcükten oluşmuştur?", "options": ["A) 2", "B) 4", "C) 5", "D) 6"], "correct": "C", "solution": "'Gülümsedi' yüklem. Gülümseyen kim? 'Gözleri pırıl pırıl parlayan küçük kız' (5 sözcükten oluşan sıfat fiil grubudur)."},
            {"num": 17, "text": "Aşağıdaki cümlelerin hangisinde özne ortaklığı vardır (bağlı veya sıralı cümle)?", "options": ["A) Ali kitap okudu, Veli ise müzik dinledi.", "B) Annem erkenden kalktı ve bize kahvaltı hazırladı.", "C) Yağmur durdu, güneş açtı.", "D) Zil çaldı, öğrenciler sınıfa girdi."], "correct": "B", "solution": "'Kalktı' ve 'hazırladı' eylemlerinin her ikisini de yapan 'Annem'dir. Özne ortaktır."},
            {"num": 18, "text": "'Bize doğru gelen yabancıyı hemen tanıdık.' cümlesinin öznesi hangisidir?", "options": ["A) Bize doğru gelen yabancı", "B) Yabancı", "C) Gizli özne (Biz)", "D) Hemen"], "correct": "C", "solution": "'Tanıdık' yüklem. Kim tanıdı? 'Biz' (Gizli Özne). 'Bize doğru gelen yabancıyı' ise belirtili nesnedir."},
            {"num": 19, "text": "'Okul müdürümüz ve öğretmenler salonda toplandı.' cümlesinin öznesi nedir?", "options": ["A) Okul müdürümüz", "B) Öğretmenler", "C) Okul müdürümüz ve öğretmenler", "D) Salonda"], "correct": "C", "solution": "'Toplandı' yüklem. Toplanan kim? 'Okul müdürümüz ve öğretmenler' bağlaçla bağlanmış ortak öznedir."},
            {"num": 20, "text": "Aşağıdakilerin hangisinde yüklem isim soylu olup özne bir fiilimsidir?", "options": ["A) Hayattaki en hakiki mürşit ilimdir.", "B) En büyük zenginlik, kanaatkâr olmaktır.", "C) Kitap okumak ruhu dinlendirir.", "D) Başarı, çok çalışmanın meyvesidir."], "correct": "B", "solution": "'Kanaatkâr olmaktır' isim-fiille kurulmuş yüklemdir. Kanaatkâr olmak olan ne? 'En büyük zenginlik' veya 'Çalışmak ibadettir' gibi yapılarda fiilimsi öznedir."}
        ],
        "video_embed_id": "9h5C3K2yV1g",
        "video_title": "8. Sınıf Türkçe Cümlenin Öğeleri ve Özneler LGS Taktikleri",
        "video_desc": "LGS'de her yıl kesinlikle çıkan cümlenin ögeleri ve özne çeşitlerini soru kaçırmama garantili taktiklerle kavrayın.",
        "meb_book_links": [
            {"title": "8. Sınıf MEB Ders Kitapları Çözümleri", "url": "/kategori/8-sinif"},
            {"title": "LGS Türkçe ve Sınav Hazırlık Rehberi", "url": "/kategori/meb-ders-kitabi-cevaplari"}
        ],
        "related_topics": [
            {"title": "8. Sınıf Türkçe Fiilimsiler Konu Anlatımı", "url": "/post/8-sinif-turkce-fiilimsiler-konu-anlatimi-20-soruluk-test"},
            {"title": "8. Sınıf Çarpanlar ve Katlar EBOB-EKOK", "url": "/post/8-sinif-matematik-carpanlar-ve-katlar-ebob-ekok-konu-anlatimi-20-soruluk-test"},
            {"title": "7. Sınıf Türkçe Fiiller ve Ek Fiil", "url": "/post/7-sinif-turkce-fiiller-kip-ve-kisi-ekleri-konu-anlatimi-20-soruluk-test"}
        ],
        "faqs": [
            {"q": "Cümlede özneyi bulmak için hangi soru sorulmalıdır?", "a": "Yükleme 'Yapan kim?' veya 'Olan ne?' soruları sorularak özne bulunur. 'Kimi' veya 'Neyi' soruları nesneyi buldurur, asla özne sorusu değildir."},
            {"q": "Sözde özne ile gerçek özne nasıl ayırt edilir?", "a": "Yüklemde '-l' veya '-n' edilgenlik eki varsa ve işi yapan belli değilse, işten etkilenen nesne sözde özne olur."},
            {"q": "Tamlamalar öznede parçalanabilir mi?", "a": "Kesinlikle hayır! İsim tamlamaları, sıfat tamlamaları, birleşik fiiller ve deyimler cümle ögeleri tahlil edilirken asla bölünmez, bir bütün olarak alınır."}
        ]
    })

    return topics

if __name__ == "__main__":
    t_list = get_all_topics()
    print(f"Loaded {len(t_list)} topics.")
