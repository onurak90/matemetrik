import sqlite3
import datetime

def get_db():
    return sqlite3.connect('data/matemetrik.db')

now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

posts_data = [
    {
        'title': '2026-2027 9. Sınıf Matematik Maarif Modeli Yıllık Çerçeve Planı (Excel & PDF İndir)',
        'slug': '2026-2027-9-sinif-matematik-maarif-modeli-yillik-plani',
        'category': '9. Sınıf',
        'category_slug': '9-sinif',
        'featured_image': '/uploads/cover-2026-2027-9-sinif-matematik-maarif-modeli-yillik-plani.webp',
        'excerpt': '2026-2027 Türkiye Yüzyılı Maarif Modeli 9. sınıf matematik haftalık temaları, süreç bileşenleri, alan becerileri ve online yıllık plan robotu ile Excel-PDF indirme rehberi.',
        'tags': '9. sınıf matematik, yıllık plan, maarif modeli, 2026-2027 yıllık plan, meb çerçeve planı, matematik yıllık plan indir, excel yıllık plan',
        'author': 'Cavenaghi',
        'content': '''
<p class="lead text-lg text-slate-700 leading-relaxed font-medium">
  <strong>2026-2027 Eğitim Öğretim Yılı</strong> Millî Eğitim Bakanlığı Talim ve Terbiye Kurulu Başkanlığı tarafından uygulamaya konulan <strong>Türkiye Yüzyılı Maarif Modeli</strong> öğretim programına tam uyumlu <strong>9. Sınıf Matematik Taslak Çerçeve Yıllık Planı</strong> öğretmenlerimizin kullanımına sunulmuştur.
</p>

<!-- CTA CARD DIRECT LINK -->
<div class="p-6 my-8 rounded-3xl bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 border border-indigo-200 shadow-sm">
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <span class="inline-block px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider mb-2">
        ⚡ Online Yıllık Plan Robotu
      </span>
      <h3 class="text-xl font-black text-slate-900">
        9. Sınıf Matematik Yıllık Planını Tek Tıkla Hazırlayın
      </h3>
      <p class="text-sm text-slate-600 mt-1">
        Okul adı ve zümre öğretmen bilgilerinizi girin, haftalık saat ve kazanımları özelleştirin; planınızı anında <strong>Excel (.xlsx)</strong> ve <strong>resmi MEB formatında A4 PDF</strong> olarak indirin.
      </p>
    </div>
    <a
      href="/yillik-plan-hazirlama?grade=9&subject=Matematik"
      class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all shrink-0"
    >
      9. Sınıf Planını Hazırla &rarr;
    </a>
  </div>
</div>

<h2>2026-2027 9. Sınıf Maarif Modeli Matematik Müfredatında Neler Değişti?</h2>
<p>
  Millî Eğitim Bakanlığı tarafından kademeli olarak hayata geçirilen <em>Türkiye Yüzyılı Maarif Modeli</em>, lise 9. sınıf düzeyinde ezberci formüller yerine matematiksel muhakeme, modelleme ve algoritmik problem çözme becerilerini merkeze almaktadır:
</p>
<ul class="space-y-2 my-4">
  <li><strong>Sayılar Teması:</strong> Gerçek sayıların üslü ve köklü gösterimleri üzerinden muhakeme yapma, sayı kümelerinin sınırlarını sorgulama ve sayı aralıklarının reel dünyadaki temsilleri.</li>
  <li><strong>Nicelikler ve Değişimler Teması:</strong> Fonksiyon kavramının analitik olarak incelenmesi, doğrusal fonksiyon modelleri ve mutlak değer içeren ilişkilerin yorumlanması.</li>
  <li><strong>Geometrik Şekiller &amp; Eşlik-Benzerlik:</strong> Üçgende açı ve kenar bağıntıları, geometrik dönüşümler, Tales, Öklid ve Pisagor teoremlerinin görsel-dinamik ispatları.</li>
  <li><strong>Algoritma ve Bilişim Teması:</strong> Algoritma temelli matematiksel yaklaşımlar, akış şemaları ve mantık bağlaçları ile niceleyicilerin bilişim dünyasındaki karşılıkları.</li>
  <li><strong>İstatistiksel Araştırma Süreci &amp; Veriden Olasılığa:</strong> Tek nicel değişkenli veri dağılımları, veri manipülasyonlarını fark etme ve deneysel-teorik olasılık gözlemleri.</li>
</ul>

<h2>9. Sınıf Matematik 39 Haftalık Yıllık Plan Konu ve Tema Dağılımı</h2>
<div class="overflow-x-auto my-6">
  <table class="min-w-full text-sm text-left text-slate-700 border border-slate-200 rounded-xl overflow-hidden">
    <thead class="bg-slate-100 text-slate-900 font-bold text-xs uppercase border-b border-slate-200">
      <tr>
        <th class="py-3 px-4">Dönem / Ay</th>
        <th class="py-3 px-4">Tema / Ünite</th>
        <th class="py-3 px-4">Haftalık Saat</th>
        <th class="py-3 px-4">Öğrenme Çıktıları &amp; Süreç</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-100">
      <tr>
        <td class="py-3 px-4 font-semibold">Eylül - Ekim</td>
        <td class="py-3 px-4 text-indigo-700 font-bold">SAYILAR</td>
        <td class="py-3 px-4">6 Saat</td>
        <td class="py-3 px-4">Gerçek sayıların üslü ve köklü gösterimleriyle işlemler, sayı aralıkları ve reel sayı kümeleri.</td>
      </tr>
      <tr>
        <td class="py-3 px-4 font-semibold">Kasım - Aralık</td>
        <td class="py-3 px-4 text-indigo-700 font-bold">NİCELİKLER VE DEĞİŞİMLER</td>
        <td class="py-3 px-4">6 Saat</td>
        <td class="py-3 px-4">Doğrusal fonksiyonlar, mutlak değer fonksiyonları ve matematiksel modelleme. (I. Dönem Ara Tatili dahil).</td>
      </tr>
      <tr>
        <td class="py-3 px-4 font-semibold">Aralık - Şubat</td>
        <td class="py-3 px-4 text-indigo-700 font-bold">GEOMETRİK ŞEKİLLER &amp; EŞLİK BENZERLİK</td>
        <td class="py-3 px-4">6 Saat</td>
        <td class="py-3 px-4">Üçgende açı ve kenar ilişkileri, dönüşümler, Tales, Öklid ve Pisagor teoremleri.</td>
      </tr>
      <tr>
        <td class="py-3 px-4 font-semibold">Mart - Nisan</td>
        <td class="py-3 px-4 text-indigo-700 font-bold">ALGORİTMA VE BİLİŞİM</td>
        <td class="py-3 px-4">6 Saat</td>
        <td class="py-3 px-4">Algoritmik yapılar, mantık bağlaçları, niceleyiciler ve akış diyagramları. (II. Dönem Ara Tatili dahil).</td>
      </tr>
      <tr>
        <td class="py-3 px-4 font-semibold">Nisan - Mayıs</td>
        <td class="py-3 px-4 text-indigo-700 font-bold">İSTATİSTİKSEL ARAŞTIRMA SÜRECİ</td>
        <td class="py-3 px-4">6 Saat</td>
        <td class="py-3 px-4">Veri toplama, merkezi eğilim ve yayılım ölçüleri, grafik okuryazarlığı.</td>
      </tr>
      <tr>
        <td class="py-3 px-4 font-semibold">Mayıs - Haziran</td>
        <td class="py-3 px-4 text-indigo-700 font-bold">VERİDEN OLASILIĞA &amp; OKUL TEMELLİ PLANLAMA</td>
        <td class="py-3 px-4">6 Saat</td>
        <td class="py-3 px-4">Olayların olasılığı, deneysel ve teorik olasılık, yıl sonu proje ve zümre değerlendirmeleri.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Yasal Dayanak ve Resmî Mevzuat</h2>
<p>
  Bu yıllık çerçeve plan; 19.09.2022 tarih ve 58168473 sayılı <em>"Millî Eğitim Bakanlığı Eğitim Öğretim Çalışmalarının Planlı Yürütülmesine İlişkin Yönerge"</em>, 2104 ve 2488 sayılı Tebliğler Dergisi <em>“İlköğretim ve Ortaöğretim Kurumlarında Atatürk İnkılap ve İlkelerinin Öğretim Esasları Yönergesi”</em> ile Talim ve Terbiye Kurulu’nun 26.05.2024 tarih ve 13 sayılı Kurul Kararı eki <em>"Türkiye Yüzyılı Maarif Modeli Matematik Dersi (9. Sınıf) Öğretim Programı"</em> esas alınarak hazırlanmıştır.
</p>
<p>
  Resmî müfredat kılavuzuna ulaşmak için <a href="https://mufredat.meb.gov.tr" target="_blank" rel="noopener noreferrer" class="text-indigo-600 font-semibold underline">MEB Müfredat Portalı</a> ve <a href="https://www.meb.gov.tr" target="_blank" rel="noopener noreferrer" class="text-indigo-600 font-semibold underline">Millî Eğitim Bakanlığı Resmî Sitesi</a> ziyaret edilebilir.
</p>

<h2>Öğretmenler İçin Diğer Faydalı Araçlarımız</h2>
<p>
  Yıllık planınızı hazırladıktan sonra eğitim öğretim sürecinizi kolaylaştıracak diğer ücretsiz araçlarımızı da kullanabilirsiniz:
</p>
<ul class="space-y-2 my-4">
  <li>
    📄 <a href="/sinav-hazirlama-robotu" class="text-indigo-600 font-bold hover:underline">MEB Sınav Hazırlama Robotu</a>: Fotoğraflarını yüklediğiniz açık uçlu matematik sorularını resmi MEB antetli çift sütunlu yazılı kağıdına anında dönüştürün.
  </li>
  <li>
    📝 <a href="/karne-gorusu-ureticisi" class="text-indigo-600 font-bold hover:underline">Karne Görüşü Robotu</a>: 9. sınıf öğrencileriniz için akademik ve sosyal becerilere uygun resmi karne görüşü metinleri üretin.
  </li>
  <li>
    📚 <a href="/kategori/9-sinif" class="text-indigo-600 font-bold hover:underline">9. Sınıf Tüm İçerikler ve Ders Notları</a>: 9. sınıf matematik ders kitapları, kazanım kavrama testleri ve yazılı soru örnekleri.
  </li>
</ul>
'''
    },
    {
        'title': '2026-2027 10. Sınıf Matematik Maarif Modeli Yıllık Çerçeve Planı (Excel & PDF İndir)',
        'slug': '2026-2027-10-sinif-matematik-maarif-modeli-yillik-plani',
        'category': '10. Sınıf',
        'category_slug': '10-sinif',
        'featured_image': '/uploads/cover-2026-2027-10-sinif-matematik-maarif-modeli-yillik-plani.webp',
        'excerpt': '2026-2027 Türkiye Yüzyılı Maarif Modeli 10. sınıf matematik dersi 39 haftalık çerçeve planı, trigonometri, fonksiyonlar ve çokgenler konu dağılımı.',
        'tags': '10. sınıf matematik, yıllık plan, maarif modeli, 2026-2027 yıllık plan, meb çerçeve planı, matematik yıllık plan indir, excel yıllık plan',
        'author': 'Cavenaghi',
        'content': '''
<p class="lead text-lg text-slate-700 leading-relaxed font-medium">
  <strong>2026-2027 Eğitim Öğretim Yılı</strong> için Millî Eğitim Bakanlığı Talim ve Terbiye Kurulu Başkanlığı tarafından hazırlanan <strong>10. Sınıf Matematik Dersi Taslak Çerçeve Yıllık Planı</strong> güncellenmiştir.
</p>

<!-- CTA CARD DIRECT LINK -->
<div class="p-6 my-8 rounded-3xl bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 border border-blue-200 shadow-sm">
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <span class="inline-block px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider mb-2">
        ⚡ Online Yıllık Plan Robotu
      </span>
      <h3 class="text-xl font-black text-slate-900">
        10. Sınıf Matematik Yıllık Planını Tek Tıkla Hazırlayın
      </h3>
      <p class="text-sm text-slate-600 mt-1">
        Okul ve zümre bilgilerinizi girin, haftalık kazanımları düzenleyin; planınızı anında <strong>Excel (.xlsx)</strong> ve <strong>resmi A4 PDF</strong> formatında kaydedin.
      </p>
    </div>
    <a
      href="/yillik-plan-hazirlama?grade=10&subject=Matematik"
      class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all shrink-0"
    >
      10. Sınıf Planını Hazırla &rarr;
    </a>
  </div>
</div>

<h2>10. Sınıf Matematik Maarif Modeli Temaları ve Yenilikler</h2>
<p>
  10. sınıf matematik müfredatı lisenin en belirleyici dönemlerinden biridir. Sayma ve olasılıktan fonksiyonlara, analitik geometriden trigonometriye kadar uzanan geniş kazanım yelpazesi yeni Maarif Modeli ile beceri odaklı yapıya kavuşturulmuştur:
</p>
<ul class="space-y-2 my-4">
  <li><strong>Geometrik Şekiller (Trigonometri):</strong> Dik üçgende trigonometrik oranlar (sinüs, kosinüs, tanjant, kotanjant), trigonometrik özdeşlikler ve üçgenin yardımcı elemanları.</li>
  <li><strong>Fonksiyonlar ve Uygulamaları:</strong> Fonksiyon grafikleri, bire bir ve örtenlik, ters fonksiyon ve bileşke fonksiyon kavramları.</li>
  <li><strong>Polinomlar ve İkinci Dereceden Denklemler:</strong> Cebirsel modelleme, çarpanlara ayırma stratejileri ve karmaşık sayılara giriş.</li>
  <li><strong>Dörtgenler ve Çokgenler:</strong> Özel dörtgenlerin (paralelkenar, eşkenar dörtgen, dikdörtgen, kare, yamuk, deltoid) alan ve uzunluk bağıntıları.</li>
  <li><strong>Uzay Geometri ve Katı Cisimler:</strong> Prizma ve piramitlerin yüzey alanları ile hacim hesaplamaları.</li>
</ul>

<h2>Yasal Dayanak ve İlgili Mevzuat</h2>
<p>
  Hazırlanan bu plan; 19.09.2022 tarih ve 58168473 sayılı <em>"Millî Eğitim Bakanlığı Eğitim Öğretim Çalışmalarının Planlı Yürütülmesine İlişkin Yönerge"</em>, 2104 ve 2488 sayılı Tebliğler Dergisi ve Talim ve Terbiye Kurulu'nun güncel Ortaöğretim Matematik Dersi Öğretim Programı doğrultusunda hazırlanmıştır.
</p>
<p>
  Daha fazla kaynak için <a href="https://ogmmateryal.eba.gov.tr" target="_blank" rel="noopener noreferrer" class="text-blue-600 font-semibold underline">OGM Materyal Portalı</a> ve <a href="https://mufredat.meb.gov.tr" target="_blank" rel="noopener noreferrer" class="text-blue-600 font-semibold underline">MEB Müfredat</a> sayfalarını inceleyebilirsiniz.
</p>

<h2>İlgili Bağlantılar ve Araçlar</h2>
<ul class="space-y-2 my-4">
  <li>
    📐 <a href="/yillik-plan-hazirlama?grade=10&subject=Matematik%20Tarihi%20ve%20Uygulamalari" class="text-blue-600 font-bold hover:underline">10. Sınıf Matematik Tarihi ve Uygulamaları Yıllık Planı</a>: Seçmeli ders yıllık planını da aynı robot üzerinden alabilirsiniz.
  </li>
  <li>
    📄 <a href="/sinav-hazirlama-robotu" class="text-blue-600 font-bold hover:underline">MEB Sınav Hazırlama Robotu</a>: 10. sınıf 1. ve 2. dönem ortak yazılı sınav kağıtlarınızı çift sütunlu olarak dizin.
  </li>
  <li>
    🔗 <a href="/2026-2027-9-sinif-matematik-maarif-modeli-yillik-plani" class="text-blue-600 font-bold hover:underline">9. Sınıf Matematik Maarif Modeli Yıllık Planı</a>: Bir önceki kademenin çerçeve planına göz atın.
  </li>
</ul>
'''
    },
    {
        'title': '2026-2027 11. Sınıf İleri Matematik Yıllık Çerçeve Planı (Excel & PDF İndir)',
        'slug': '2026-2027-11-sinif-matematik-ileri-yillik-plani',
        'category': '11. Sınıf',
        'category_slug': '11-sinif',
        'featured_image': '/uploads/cover-2026-2027-11-sinif-matematik-ileri-yillik-plani.webp',
        'excerpt': '2026-2027 11. sınıf ileri matematik ve matematik uygulamaları 39 haftalık yıllık planı, trigonometri, analitik geometri, fonksiyonlarda uygulamalar konu dağılımı.',
        'tags': '11. sınıf matematik, ileri matematik yıllık plan, 2026-2027 yıllık plan, meb çerçeve planı, matematik yıllık plan indir, excel yıllık plan',
        'author': 'Cavenaghi',
        'content': '''
<p class="lead text-lg text-slate-700 leading-relaxed font-medium">
  <strong>2026-2027 Eğitim Öğretim Yılı</strong> Millî Eğitim Bakanlığı Ortaöğretim Genel Müdürlüğü müfredatına tam uyumlu <strong>11. Sınıf İleri Matematik (6 Saat) Taslak Çerçeve Yıllık Planı</strong> ve haftalık ders programı yayımlanmıştır.
</p>

<!-- CTA CARD DIRECT LINK -->
<div class="p-6 my-8 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 border border-emerald-200 shadow-sm">
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <span class="inline-block px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider mb-2">
        ⚡ Online Yıllık Plan Robotu
      </span>
      <h3 class="text-xl font-black text-slate-900">
        11. Sınıf İleri Matematik Yıllık Planını Hemen Hazırlayın
      </h3>
      <p class="text-sm text-slate-600 mt-1">
        Haftalık 6 saatlik ileri düzey veya 2 saatlik Matematik Uygulamaları planınızı seçin; tek tıkla <strong>Excel (.xlsx)</strong> ve <strong>resmi A4 PDF</strong> olarak indirin.
      </p>
    </div>
    <a
      href="/yillik-plan-hazirlama?grade=11&subject=Matematik"
      class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all shrink-0"
    >
      11. Sınıf Planını Hazırla &rarr;
    </a>
  </div>
</div>

<h2>11. Sınıf İleri Matematik Konuları ve Kazanım Dağılımı</h2>
<p>
  AYT Matematik sınavının yaklaşık %40'ını oluşturan 11. sınıf müfredatı şu temel ünitelerden meydana gelmektedir:
</p>
<ul class="space-y-2 my-4">
  <li><strong>İstatistiksel Araştırma Süreci:</strong> İki nicel değişkenli veriler, saçılım grafikleri, regresyon doğrusu ve korelasyon katsayısı.</li>
  <li><strong>Trigonometri:</strong> Yönlü açılar, birim çember, trigonometrik fonksiyonlar, toplam-fark formülleri ve yarım açı formülleri.</li>
  <li><strong>Analitik Geometri:</strong> Doğrunun analitik incelenmesi, eğim, iki doğru arasındaki açı ve noktanın doğruya uzaklığı.</li>
  <li><strong>Fonksiyonlarda Uygulamalar:</strong> İkinci dereceden fonksiyonlar (parabol), tepe noktası, öteleme ve simetri hareketleri.</li>
  <li><strong>Denklem ve Eşitsizlik Sistemleri:</strong> İkinci dereceden iki bilinmeyenli denklem sistemleri ve işaret tablolarıyla eşitsizlik çözümleri.</li>
  <li><strong>Çember ve Daire:</strong> Çemberde açı, kiriş özellikleri, teğet bağıntıları, dairenin alanı ve daire dilimi alanı.</li>
  <li><strong>Uzay Geometri:</strong> Katı cisimlerin kesit alanları, küre ve koni hacim hesaplamaları.</li>
</ul>

<h2>Yasal Mevzuat ve Kaynaklar</h2>
<p>
  Planımız 19.09.2022 tarihli MEB Eğitim Öğretim Çalışmalarının Planlı Yürütülmesine İlişkin Yönergeye ve Talim ve Terbiye Kurulu Haftalık Ders Çizelgelerine %100 uyumludur. Detaylı bilgi için <a href="https://www.meb.gov.tr" target="_blank" rel="noopener noreferrer" class="text-emerald-600 font-semibold underline">MEB Resmi Sitesi</a> ve <a href="https://ogmmateryal.eba.gov.tr" target="_blank" rel="noopener noreferrer" class="text-emerald-600 font-semibold underline">OGM Materyal</a> adreslerini ziyaret edebilirsiniz.
</p>

<h2>İlgili Bağlantılar ve Diğer Sınıflar</h2>
<ul class="space-y-2 my-4">
  <li>
    📊 <a href="/yillik-plan-hazirlama?grade=11&subject=Matematik%20Uygulamalari" class="text-emerald-600 font-bold hover:underline">11. Sınıf Matematik Uygulamaları Yıllık Planı</a>: 2 saatlik seçmeli ders çerçeve planı.
  </li>
  <li>
    🎯 <a href="/2026-2027-12-sinif-matematik-yillik-plani" class="text-emerald-600 font-bold hover:underline">12. Sınıf İleri Matematik Yıllık Planı</a>: YKS &amp; AYT odaklı mezuniyet sınıfı planı.
  </li>
  <li>
    📝 <a href="/sinav-hazirlama-robotu" class="text-emerald-600 font-bold hover:underline">MEB Sınav Hazırlama Robotu</a>: 11. sınıf matematik yazılı sorularınızı çift sütunlu yazdırılabilir PDF yapın.
  </li>
</ul>
'''
    },
    {
        'title': '2026-2027 12. Sınıf İleri Matematik Yıllık Çerçeve Planı (Excel & PDF İndir)',
        'slug': '2026-2027-12-sinif-matematik-yillik-plani',
        'category': '12. Sınıf',
        'category_slug': '12-sinif',
        'featured_image': '/uploads/cover-2026-2027-12-sinif-matematik-yillik-plani.webp',
        'excerpt': '2026-2027 12. sınıf ileri matematik (6 saat) yıllık planı, logaritma, diziler, limit, türev, integral ve analitik geometri AYT konuları.',
        'tags': '12. sınıf matematik, ileri matematik yıllık plan, türev integral yıllık plan, 2026-2027 yıllık plan, ayt matematik planı, excel yıllık plan',
        'author': 'Cavenaghi',
        'content': '''
<p class="lead text-lg text-slate-700 leading-relaxed font-medium">
  <strong>2026-2027 Eğitim Öğretim Yılı</strong> Millî Eğitim Bakanlığı Ortaöğretim Genel Müdürlüğü müfredatına tam uyumlu <strong>12. Sınıf İleri Matematik (Haftalık 6 Saat) Taslak Çerçeve Yıllık Planı</strong> kullanıma açılmıştır.
</p>

<!-- CTA CARD DIRECT LINK -->
<div class="p-6 my-8 rounded-3xl bg-gradient-to-r from-rose-50 via-red-50 to-orange-50 border border-rose-200 shadow-sm">
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <span class="inline-block px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-bold uppercase tracking-wider mb-2">
        ⚡ Online Yıllık Plan Robotu
      </span>
      <h3 class="text-xl font-black text-slate-900">
        12. Sınıf İleri Matematik Yıllık Planını Hemen Oluşturun
      </h3>
      <p class="text-sm text-slate-600 mt-1">
        Limit, türev ve integral kazanımlarını içeren 39 haftalık planınızı kurum bilgileriyle düzenleyin; <strong>Excel (.xlsx)</strong> ve <strong>resmi A4 PDF</strong> olarak tek tıkla indirin.
      </p>
    </div>
    <a
      href="/yillik-plan-hazirlama?grade=12&subject=Matematik"
      class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md shadow-rose-600/20 transition-all shrink-0"
    >
      12. Sınıf Planını Hazırla &rarr;
    </a>
  </div>
</div>

<h2>12. Sınıf İleri Matematik 39 Haftalık Ünite Dağılımı</h2>
<div class="overflow-x-auto my-6">
  <table class="min-w-full text-sm text-left text-slate-700 border border-slate-200 rounded-xl overflow-hidden">
    <thead class="bg-slate-100 text-slate-900 font-bold text-xs uppercase border-b border-slate-200">
      <tr>
        <th class="py-3 px-4">Dönem / Ay</th>
        <th class="py-3 px-4">Ünite Adı</th>
        <th class="py-3 px-4">Haftalık Saat</th>
        <th class="py-3 px-4">Öne Çıkan AYT Konuları</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-100">
      <tr>
        <td class="py-3 px-4 font-semibold">Eylül - Ekim</td>
        <td class="py-3 px-4 text-rose-700 font-bold">Üstel ve Logaritmik Fonksiyonlar</td>
        <td class="py-3 px-4">6 Saat</td>
        <td class="py-3 px-4">Üstel fonksiyon, logaritma kuralları, logaritmik denklem ve eşitsizlikler.</td>
      </tr>
      <tr>
        <td class="py-3 px-4 font-semibold">Ekim - Kasım</td>
        <td class="py-3 px-4 text-rose-700 font-bold">Diziler</td>
        <td class="py-3 px-4">6 Saat</td>
        <td class="py-3 px-4">Aritmetik dizi, geometrik dizi, dizilerin toplam formülleri ve gerçek hayat modelleri.</td>
      </tr>
      <tr>
        <td class="py-3 px-4 font-semibold">Aralık - Ocak</td>
        <td class="py-3 px-4 text-rose-700 font-bold">Limit ve Süreklilik</td>
        <td class="py-3 px-4">6 Saat</td>
        <td class="py-3 px-4">Sağdan-soldan limit, 0/0 belirsizliği, süreklilik ve süreksizlik noktaları.</td>
      </tr>
      <tr>
        <td class="py-3 px-4 font-semibold">Şubat - Nisan</td>
        <td class="py-3 px-4 text-rose-700 font-bold">Türev ve Uygulamaları</td>
        <td class="py-3 px-4">6 Saat</td>
        <td class="py-3 px-4">Türev alma kuralları, teğet denklemi, artan-azalanlık, ekstremum noktaları, maksimum-minimum problemleri.</td>
      </tr>
      <tr>
        <td class="py-3 px-4 font-semibold">Nisan - Mayıs</td>
        <td class="py-3 px-4 text-rose-700 font-bold">İntegral ve Uygulamaları</td>
        <td class="py-3 px-4">6 Saat</td>
        <td class="py-3 px-4">Belirsiz integral, değişken değiştirme, belirli integral ve eğriler arasında kalan alan hesabı.</td>
      </tr>
      <tr>
        <td class="py-3 px-4 font-semibold">Mayıs - Haziran</td>
        <td class="py-3 px-4 text-rose-700 font-bold">Çemberin Analitiği &amp; Planlama</td>
        <td class="py-3 px-4">6 Saat</td>
        <td class="py-3 px-4">Çember denklemi, doğru ile çemberin birbirine göre durumları, okul temelli planlama haftaları.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Yasal Dayanak ve İlgili Mevzuat</h2>
<p>
  Bu yıllık plan; 19.09.2022 tarih ve 58168473 sayılı <em>"Millî Eğitim Bakanlığı Eğitim Öğretim Çalışmalarının Planlı Yürütülmesine İlişkin Yönerge"</em>, 2104 ve 2488 sayılı Tebliğler Dergisi ve Talim ve Terbiye Kurulu 12. Sınıf Matematik Dersi Öğretim Programı esas alınarak hazırlanmıştır.
</p>
<p>
  Resmî sınav takvimleri ve kılavuzlar için <a href="https://www.osym.gov.tr" target="_blank" rel="noopener noreferrer" class="text-rose-600 font-semibold underline">ÖSYM Portalı</a> ve <a href="https://www.meb.gov.tr" target="_blank" rel="noopener noreferrer" class="text-rose-600 font-semibold underline">MEB Portalı</a> incelenebilir.
</p>

<h2>İlgili 12. Sınıf Planları ve Öğretmen Araçları</h2>
<ul class="space-y-2 my-4">
  <li>
    🎯 <a href="/2026-2027-12-sinif-temel-matematik-yillik-plani" class="text-rose-600 font-bold hover:underline">12. Sınıf Temel Matematik Yıllık Planı</a>: Sözel ve dil sınıfları için haftalık 2 saatlik temel matematik planı.
  </li>
  <li>
    📚 <a href="/yillik-plan-hazirlama?grade=12&subject=Akademik%20Destek%20Matematik" class="text-rose-600 font-bold hover:underline">12. Sınıf Akademik Destek Matematik (9 Saat)</a>: İmam Hatip ve Fen liseleri için yoğunlaştırılmış YKS destek planı.
  </li>
  <li>
    📄 <a href="/sinav-hazirlama-robotu" class="text-rose-600 font-bold hover:underline">MEB Sınav Hazırlama Robotu</a>: 12. sınıf ortak yazılı sınav ve YKS deneme soru fasiküllerinizi tek tıkla oluşturun.
  </li>
</ul>
'''
    },
    {
        'title': '2026-2027 12. Sınıf Temel Matematik Yıllık Çerçeve Planı (Excel & PDF İndir)',
        'slug': '2026-2027-12-sinif-temel-matematik-yillik-plani',
        'category': '12. Sınıf',
        'category_slug': '12-sinif',
        'featured_image': '/uploads/cover-2026-2027-12-sinif-temel-matematik-yillik-plani.webp',
        'excerpt': '2026-2027 12. sınıf temel matematik (2 saat) yıllık çerçeve planı, denklem ve eşitsizlikler, veri analizi ve çevre-alan hesapları.',
        'tags': '12. sınıf temel matematik, temel matematik yıllık plan, 2026-2027 yıllık plan, meb çerçeve planı, 2 saatlik matematik planı, excel yıllık plan',
        'author': 'Cavenaghi',
        'content': '''
<p class="lead text-lg text-slate-700 leading-relaxed font-medium">
  <strong>2026-2027 Eğitim Öğretim Yılı</strong> Millî Eğitim Bakanlığı Ortaöğretim Genel Müdürlüğü haftalık ders çizelgelerine uygun olarak hazırlanan <strong>12. Sınıf Temel Matematik (Haftalık 2 Saat) Taslak Çerçeve Yıllık Planı</strong> yayımlanmıştır.
</p>

<!-- CTA CARD DIRECT LINK -->
<div class="p-6 my-8 rounded-3xl bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 border border-amber-200 shadow-sm">
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <span class="inline-block px-3 py-1 rounded-full bg-amber-600 text-white text-xs font-bold uppercase tracking-wider mb-2">
        ⚡ Online Yıllık Plan Robotu
      </span>
      <h3 class="text-xl font-black text-slate-900">
        12. Sınıf Temel Matematik Yıllık Planını Hemen Alın
      </h3>
      <p class="text-sm text-slate-600 mt-1">
        Sözel ve yabancı dil sınıflarında okutulan 2 saatlik temel matematik dersi için hazır planınızı anında <strong>Excel (.xlsx)</strong> ve <strong>resmi A4 PDF</strong> olarak indirin.
      </p>
    </div>
    <a
      href="/yillik-plan-hazirlama?grade=12&subject=Temel%20Matematik"
      class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md shadow-amber-600/20 transition-all shrink-0"
    >
      Temel Matematik Planını Hazırla &rarr;
    </a>
  </div>
</div>

<h2>12. Sınıf Temel Matematik Konuları</h2>
<p>
  Temel Matematik dersi, öğrencilerin günlük yaşamda karşılaşacakları sayısal problemleri çözebilme, finansal kararlar alabilme ve temel geometri ilkelerini uygulayabilme becerilerini hedefler:
</p>
<ul class="space-y-2 my-4">
  <li><strong>Denklem ve Eşitsizlikler:</strong> Üslü ve köklü sayılar, birinci dereceden bir ve iki bilinmeyenli denklemler, oran-orantı ve yüzde problemleri.</li>
  <li><strong>Veri ve İstatistik:</strong> Grafik türleri (çizgi, sütun, daire), aritmetik ortalama, medyan ve mod kavramları ile veri yorumlama.</li>
  <li><strong>Çevre ve Alan Hesapları:</strong> Geometrik şekillerin çevre ve alan ilişkileri, pratik ölçüm yöntemleri.</li>
  <li><strong>Katı Cisimler:</strong> Dik prizmalar ve piramitlerin günlük yaşamdaki kullanım alanları ve hacim hesapları.</li>
</ul>

<h2>Yasal Dayanak ve Resmî Kılavuzlar</h2>
<p>
  Plan, MEB Eğitim Öğretim Çalışmalarının Planlı Yürütülmesine İlişkin Yönerge ve Talim ve Terbiye Kurulu Haftalık Ders Çizelgeleri uyarınca hazırlanmıştır. Resmî belgelere <a href="https://mufredat.meb.gov.tr" target="_blank" rel="noopener noreferrer" class="text-amber-600 font-semibold underline">MEB Müfredat</a> üzerinden erişebilirsiniz.
</p>

<h2>İlgili Bağlantılar</h2>
<ul class="space-y-2 my-4">
  <li>
    📐 <a href="/2026-2027-12-sinif-matematik-yillik-plani" class="text-amber-600 font-bold hover:underline">12. Sınıf İleri Matematik Yıllık Planı</a>: Sayısal ve Eşit Ağırlık sınıfları için haftalık 6 saatlik plan.
  </li>
  <li>
    📄 <a href="/sinav-hazirlama-robotu" class="text-amber-600 font-bold hover:underline">MEB Sınav Hazırlama Robotu</a>: Temel matematik ortak sınav kağıtlarınızı çift sütunlu olarak dizin.
  </li>
</ul>
'''
    }
]

def main():
    conn = get_db()
    c = conn.cursor()

    for p in posts_data:
        c.execute("SELECT id FROM posts WHERE slug=?", (p['slug'],))
        row = c.fetchone()
        if row:
            c.execute("""
                UPDATE posts 
                SET title=?, category=?, category_slug=?, featured_image=?, excerpt=?, tags=?, author=?, content=?, updated_at=?
                WHERE id=?
            """, (p['title'], p['category'], p['category_slug'], p['featured_image'], p['excerpt'], p['tags'], p['author'], p['content'], now, row[0]))
            print(f"Updated post: {p['slug']} (ID: {row[0]})")
        else:
            c.execute("""
                INSERT INTO posts (title, slug, category, category_slug, featured_image, excerpt, tags, author, content, is_published, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
            """, (p['title'], p['slug'], p['category'], p['category_slug'], p['featured_image'], p['excerpt'], p['tags'], p['author'], p['content'], now, now))
            print(f"Inserted new post: {p['slug']}")

    conn.commit()
    conn.close()
    print("All posts processed and committed successfully!")

if __name__ == '__main__':
    main()
