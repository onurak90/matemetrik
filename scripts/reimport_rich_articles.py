import sqlite3
import json
import re
from datetime import datetime

conn = sqlite3.connect('data/matemetrik.db')
cursor = conn.cursor()
now_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

smart_link = 'https://araplhn.org/4/102a74e644a5d32555e92e2872366185'

articles = []

# =========================================================================
# 1. TAŞINAN KANEPE PROBLEMİ (Kapsamlı Matematik Makalesi)
# =========================================================================
articles.append({
    'slug': 'meshur-matematik-problemi-tasinan-kanepe-problemi-cozuldu',
    'title': 'Meşhur Matematik Problemi: Taşınan Kanepe Problemi ve Geometrik Çözümü',
    'category': 'Matematik Blog',
    'category_slug': 'matematik-blog',
    'featured_image': 'https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/iStock-1807413733.jpg?itok=mc0-q1l9',
    'excerpt': 'Leo Moser tarafından 1966 yılında ortaya atılan ve 90 derecelik bir koridor köşesinden dönebilecek en büyük iki boyutlu kanepenin alanını araştıran Taşınan Kanepe Problemi (Moving Sofa Problem) matematiksel olarak nasıl çözüldü?',
    'tags': ['Matematik', 'Geometri', 'Kanepe Problemi', 'Optimizasyon', 'Popüler Bilim'],
    'content': f'''
    <div class="space-y-8">
      <div class="p-6 bg-gradient-to-br from-indigo-50/90 via-slate-50 to-purple-50/80 rounded-3xl border border-indigo-100 shadow-sm not-prose">
        <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
          <span class="px-3.5 py-1 rounded-full bg-indigo-600 text-white text-xs font-black tracking-wide uppercase">
            📐 Geometri &amp; Hesaplamalı Matematik
          </span>
          <span class="text-xs font-semibold text-slate-500">
            58 Yıllık Matematik Gizemi
          </span>
        </div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900">
          Koridorlardan Eşya Taşımanın Ötesinde: Taşınan Kanepe Problemi (Moving Sofa Problem)
        </h2>
        <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
          Ev taşıyan veya dar bir koridordan büyük bir mobilyayı geçirmeye çalışan herkesin en az bir kez tecrübe ettiği o anı düşünün: İki duvarın birleştiği 90 derecelik dar bir köşe ve dönmeyi reddeden devasa bir kanepe. Günlük hayatta basit bir lojistik aksaklık gibi görünen bu durum, teorik matematikte yarım asırdan uzun süredir dünyanın en parlak matematikçilerini meşgul eden ve <a href="https://en.wikipedia.org/wiki/Moving_sofa_problem" target="_blank" rel="noopener noreferrer nofollow" class="text-indigo-600 font-bold hover:underline">Moving Sofa Problem (Taşınan Kanepe Problemi)</a> olarak adlandırılan büyüleyici bir optimizasyon sorusudur.
        </p>
      </div>

      <figure class="my-6 not-prose text-center">
        <img src="https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/iStock-1807413733.jpg?itok=mc0-q1l9" alt="Taşınan Kanepe Problemi Koridor Perspektifi" class="w-full max-h-[500px] object-cover rounded-2xl shadow-md border border-slate-200 mx-auto" />
        <figcaption class="text-xs text-slate-500 mt-2 font-medium">Şekil 1: Genişliği 1 birim olan L şeklindeki koridorda dönmeye çalışan iki boyutlu şekil simülasyonu.</figcaption>
      </figure>

      <div class="prose max-w-none text-slate-800 space-y-6">
        <h2>Problemin Matematiksel Tanımı ve Tarihsel Kökeni</h2>
        <p>
          Problem ilk olarak Kanadalı-Avusturyalı matematikçi <strong>Leo Moser</strong> tarafından <strong>1966</strong> yılında resmi olarak formüle edildi. Soru teorik olarak şu şekildedir: <em>Genişliği tam 1 birim olan, 90 derecelik dik açılı bir L koridorundan döndürülerek geçirilebilecek en büyük alana (maksimum yüzey alanına) sahip iki boyutlu şekil nedir ve bu şeklin alanı (A) kaçtır?</em>
        </p>
        <p>
          İlk bakışta çözüm oldukça sıradan görünebilir. Bir kare düşünelim: Kenar uzunluğu 1 birim olan bir kare, genişliği 1 birim olan koridorun köşesinde hiç dönmeden doğrudan köşeye takılmadan geçebilir. Bu durumda elde edilen alan tam olarak <strong>1 birim karedir</strong>. Ancak köşeyi dönerken şekli döndürme özgürlüğümüz vardır.
        </p>

        <h3>İlk Yaklaşımlar: Yarım Daireden Hammersley Kanepesine</h3>
        <p>
          Eğer yarıçapı <em>r = 1</em> birim olan bir <strong>yarım daire</strong> kullanırsak, bu şekil köşe boyunca döndürülerek kaydırılabilir. Bir yarım dairenin alanı <strong>π / 2 ≈ 1,57079</strong> birim karedir. Bu, karenin sağladığı 1 birim kareden belirgin şekilde daha büyüktür.
        </p>
        <p>
          1968 yılında İngiliz matematikçi <strong>John Michael Hammersley</strong>, yarım daireyi ikiye bölüp arasına 1 birim genişliğinde bir dikdörtgen ekleyerek ortasından yarım daire şeklinde bir oyuk çıkardı. Bu yeni formda:
        </p>
        <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center font-mono text-sm sm:text-base text-indigo-950 font-bold my-4">
          A_Hammersley = π / 2 + 2 / π ≈ 1,57079 + 0,63661 = 2,2074 birim kare
        </div>
        <p>
          Hammersley kanepesi uzun yıllar boyunca aşılamaz bir rekor olarak kabul edildi. Ancak matematikçiler bunun mutlak maksimum olup olmadığını merak etmeye devam ettiler.
        </p>

        <h2>Joseph Gerver ve Dalgalı Kanepe (1992)</h2>
        <p>
          1992 yılında Rutgers Üniversitesi'nden matematikçi <strong>Joseph Gerver</strong>, diferansiyel geometri ve varyasyonlar hesabını kullanarak Hammersley'in tasarımını daha da optimize etti. Gerver, kanepenin kenarlarını düz çizgiler yerine 18 farklı pürüzsüz eğri parçasıyla (dairesel yaylar ve evolüt eğrileri) yeniden şekillendirdi.
        </p>
        <p>
          Gerver'in hesaplamalarına göre bu yeni telefon ahizesini andıran dalgalı kanepenin alanı yaklaşık <strong>2,21953167</strong> birim kareye ulaşıyordu. Gerver bu şeklin gerçekten olası en büyük alan olduğunu öne sürdü; fakat bunun matematiksel olarak kesin ispatını (rigorous mathematical proof) yapamadı. Problem bir hipotez olarak açık kaldı.
        </p>

        <h2>2024 Çözümü: Jineon Baek'in Bilgisayar Destekli Matematiksel İspatı</h2>
        <p>
          Güney Kore'deki Yonsei Üniversitesi'nde araştırmacı olan matematikçi <strong>Jineon Baek</strong>, 2024 yılı sonunda yayımladığı kapsamlı çalışma ile 58 yıllık bu açık problemi nihayet çözüme kavuşturdu. Baek, bilgisayar destekli aralık aritmetiği (interval arithmetic) ve konveks optimizasyon algoritmalarını birleştirerek, hiçbir iki boyutlu şeklin Gerver'in bulduğu sınırdan daha büyük bir alana sahip olamayacağını kanıtladı:
        </p>
        <div class="p-5 bg-indigo-900 text-white rounded-2xl shadow-md my-4">
          <div class="text-xs text-indigo-300 font-bold uppercase tracking-wider mb-1">Kesin Matematiksel Sonuç</div>
          <p class="text-base sm:text-lg font-black font-mono">
            Maksimum Kanepe Sabiti (Sofa Constant): A_max ≈ 2,21953167 birim kare
          </p>
          <p class="text-xs text-slate-300 mt-2">
            Baek'in hakem değerlendirmesinde olan tam makalesine <a href="https://arxiv.org/abs/2411.19826" target="_blank" rel="noopener noreferrer nofollow" class="text-indigo-200 underline font-bold">arXiv:2411.19826</a> üzerinden doğrudan ulaşabilirsiniz.
          </p>
        </div>

        <h2>Bu Teori Gerçek Hayatta ve Mühendislikte Nerede Kullanılır?</h2>
        <p>
          Taşınan kanepe problemi yalnızca eğlenceli bir geometri bulmacası değildir. Bu problemde geliştirilen matematiksel araçlar günümüzde şu ileri teknoloji alanlarında doğrudan uygulanmaktadır:
        </p>
        <ul class="list-disc list-inside space-y-2 text-sm text-slate-700">
          <li><strong>Otonom Robot Navigasyonu &amp; Hareket Planlama:</strong> Fabrika içi insansız taşıma araçlarının (AGV) dar koridorlarda yük çarpışmadan dönmesi algoritmaları.</li>
          <li><strong>Mikrocerrahi &amp; Endoskopi:</strong> İnsan damarları ve sindirim kanallarında bükülerek ilerleyen medikal robotik kolların tasarımı.</li>
          <li><strong>Otomotiv &amp; Tır Manevra Simülasyonları:</strong> Ağır vasıtaların şehir içi dar virajlarda treyler süpürme açılarının modellenmesi.</li>
        </ul>
      </div>

      <div class="my-6 p-6 bg-slate-900 text-white rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 not-prose">
        <div class="space-y-1 text-center sm:text-left">
          <span class="text-xs font-bold uppercase tracking-wider text-indigo-400">Çalışma Kağıdı &amp; Modelleme</span>
          <h4 class="text-base font-bold">Matematik ve Geometri Çalışma Notlarını İndirin</h4>
          <p class="text-xs text-slate-300">İki boyutlu alan optimizasyonu, çember ve integral uygulamalarına dair A4 PDF dokümanı.</p>
        </div>
        <a href="{smart_link}" target="_blank" rel="noopener noreferrer nofollow" class="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 shrink-0">
          📥 PDF Notu İndir
        </a>
      </div>

      <div class="p-5 bg-slate-50 rounded-2xl border border-slate-200 not-prose space-y-3">
        <h4 class="font-bold text-slate-900 text-sm">🔗 İlgili Matematik Hesaplama Araçları ve Kaynaklar:</h4>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <a href="/daire-alan-cevre-hesaplama" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            ⭕ Daire Alanı ve Çevre Hesaplayıcı &rarr;
          </a>
          <a href="/hesaplama-araclari" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            🧮 18+ İnteraktif Hesaplama Robotu &rarr;
          </a>
          <a href="/kategori/matematik-blog" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            📖 Tüm Matematik Blog Yazıları &rarr;
          </a>
        </div>
        <div class="pt-2 text-[11px] text-slate-500 border-t border-slate-200">
          Dış Kaynaklar: <a href="https://blogs.ams.org/visualinsight/2015/01/15/hammersley-sofa/" target="_blank" rel="noopener noreferrer nofollow" class="underline text-slate-600">American Mathematical Society</a> &bull; <a href="https://phys.org/news/2024-12-mathematician-sofa-problem.html" target="_blank" rel="noopener noreferrer nofollow" class="underline text-slate-600">Phys.org Raporu</a>
        </div>
      </div>
    </div>
    '''
})

# =========================================================================
# 2. KAHVE VE KAFEİN BEYİN METABOLİZMASI
# =========================================================================
articles.append({
    'slug': 'kahve-neden-hepimizi-ayni-sekilde-etkilemiyor',
    'title': 'Kahve Neden Hepimizi Aynı Şekilde Etkilemiyor? Kafein, Adenozin ve Genetik Farklılıklar',
    'category': 'Matematik Blog',
    'category_slug': 'matematik-blog',
    'featured_image': 'https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/iStock-699962186.jpg?itok=hfOCjHOo',
    'excerpt': 'Kimileri tek bir yudum kahveyle uykusuzluk ve kalp çarpıntısı yaşarken kimileri yatmadan hemen önce espresso içip deliksiz uyuyabilir. CYP1A2 ve ADORA2A genlerinin kafein toleransı üzerindeki şaşırtıcı etkilerini inceliyoruz.',
    'tags': ['Biyoloji', 'Kafein', 'Beyin', 'Genetik', 'Sağlık', 'Popüler Bilim'],
    'content': f'''
    <div class="space-y-8">
      <div class="p-6 bg-gradient-to-br from-amber-50/90 via-slate-50 to-orange-50/80 rounded-3xl border border-amber-200 shadow-sm not-prose">
        <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
          <span class="px-3.5 py-1 rounded-full bg-amber-600 text-white text-xs font-black tracking-wide uppercase">
            ☕ Nörobiyoloji &amp; Farmakogenetik
          </span>
          <span class="text-xs font-semibold text-slate-500">
            Bireysel Biyolojik Farklılıklar
          </span>
        </div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900">
          Bir Fincan Kahvenin Arkasındaki Biyokimya: Neden Hepimiz Farklı Tepki Veriyoruz?
        </h2>
        <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
          Sabah uyanmak için sabırsızlıkla kahve makinesine koşanlar da var, öğleden sonra içtiği küçük bir fincan Türk kahvesi yüzünden sabaha kadar yatakta dönüp duranlar da. Hatta bazı insanlar kahve içtikten hemen sonra kalp çarpıntısı ve huzursuzluk hissederken, bazıları yatmadan 10 dakika önce filtre kahve tüketip derin bir uykuya dalabilmektedir. Peki, aynı kimyasal molekül olan kafein, insan bedenlerinde nasıl bu kadar zıt etkiler yaratabilir?
        </p>
      </div>

      <figure class="my-6 not-prose text-center">
        <img src="https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/iStock-699962186.jpg?itok=hfOCjHOo" alt="Kahve ve Beyin Kafein Etkileşimi" class="w-full max-h-[500px] object-cover rounded-2xl shadow-md border border-slate-200 mx-auto" />
        <figcaption class="text-xs text-slate-500 mt-2 font-medium">Şekil 1: Kafein molekülünün merkezi sinir sistemindeki nörokimyasal yolakları.</figcaption>
      </figure>

      <div class="prose max-w-none text-slate-800 space-y-6">
        <h2>Kafein Beynimizde Nasıl Çalışır? Adenozin Tuzağı</h2>
        <p>
          Uyanık kaldığımız her dakika, beynimizdeki nöronlar hücresel enerji para birimi olan ATP'yi harcar. Bu metabolik faaliyetin yan ürünü olarak <strong>adenozin</strong> adı verilen bir molekül birikir. Gün ilerledikçe adenozin seviyesi artar ve beyindeki <em>A1 ve A2A adenozin reseptörlerine</em> bağlanarak sinir hücrelerinin ateşleme hızını yavaşlatır, kan damarlarını genişletir ve bize "uyku baskısı" (sleep pressure) hissi verir.
        </p>
        <p>
          İşte kafeinin mucizesi tam da burada devreye girer: <strong>Kafein molekülünün kimyasal yapısı adenozine son derece benzerdir.</strong> Kafein kan-beyin bariyerini kolayca aşarak adenozin reseptörlerine bir anahtar gibi oturur; ancak bu reseptörleri aktive etmez, sadece kilitler (antagonist etki). Gerçek adenozin molekülleri reseptöre bağlanamadığı için beyin yorgunluk sinyalini alamaz ve biz kendimizi enerjik, dinç ve odaklanmış hissederiz.
        </p>

        <figure class="my-6 not-prose text-center">
          <img src="https://bilimgenc.tubitak.gov.tr/sites/default/files/inline-images/iStock-2279708623.jpg" alt="Kafein ve Karaciğer Metabolizması" class="w-full max-h-[460px] object-cover rounded-2xl shadow-md border border-slate-200 mx-auto" />
          <figcaption class="text-xs text-slate-500 mt-2 font-medium">Şekil 2: Karaciğerde sitokrom P450 enzimleri ile kafein yıkımı.</figcaption>
        </figure>

        <h2>Genetik Faktör 1: Karaciğerdeki CYP1A2 Enzimi (Hızlı vs. Yavaş Metabolize Ediciler)</h2>
        <p>
          Kafein kan dolaşımına girdikten sonra yaklaşık %95 oranında karaciğerde parçalanır. Bu metabolik yıkımdan sorumlu birincil enzim <strong>sitokrom P450 1A2 (CYP1A2)</strong> enzimidir. İnsan popülasyonunda CYP1A2 geninde iki temel varyasyon bulunur:
        </p>
        <ul class="list-disc list-inside space-y-2 text-sm text-slate-700">
          <li><strong>Hızlı Metabolize Edenler (CYP1A2*1A homozigot):</strong> Bu gruptaki bireyler karaciğerlerinde yüksek miktarda aktif enzim üretirler. Kafeinin yarılanma ömrü bu kişilerde 2 ila 4 saate kadar düşer. Akşam kahve içseler bile kafein hızla paraksantin, teobromin ve teofiline parçalanarak vücuttan atılır.</li>
          <li><strong>Yavaş Metabolize Edenler (CYP1A2*1F taşıyıcıları):</strong> Enzim aktivitesi düşüktür. Kafeinin kanda yarılanma ömrü 8 ila 12 saati bulabilir. Öğlen içilen bir kupa kahvenin kafeini gece yarısı hâlâ kanda dolaşarak REM uykusunu bozar.</li>
        </ul>

        <h2>Genetik Faktör 2: ADORA2A Geni ve Kahve Anksiyetesi</h2>
        <p>
          Bazı insanlar kahve içtiğinde odaklanmak yerine ellerinde titreme, kalp çarpıntısı ve aşırı kaygı (anksiyete) yaşarlar. Bu durum karaciğerden ziyade doğrudan beyindeki <strong>ADORA2A</strong> geniyle ilişkilidir. ADORA2A geni, beyindeki adenozin A2A reseptörlerinin duyarlılığını kodlar. Belirli genetik varyantlara sahip bireylerde kafein, dopamin ve glutamat salınımını aşırı tetikleyerek sempatik sinir sistemini (savaş ya da kaç tepkisi) gereksiz yere aktive eder.
        </p>

        <h2>Tolerans ve Bağımlılık Gelişimi: Reseptörlerin Sayıca Artışı (Upregulation)</h2>
        <p>
          Düzenli olarak her gün 3-4 fincan kahve içtiğinizde, beyniniz reseptörlerin sürekli kafeinle bloke edildiğini fark eder. Vücut dengeyi (homeostaz) sağlamak için yeni adenozin reseptörleri üretir. Buna nörobiyolojide <em>reseptör upregülasyonu</em> denir. Sonuç olarak aynı uyanıklık hissini yakalamak için daha fazla kafein tüketmeniz gerekir; kahveyi aniden kestiğinizde ise aşırı adenozin bağlanması nedeniyle şiddetli baş ağrısı, sersemlik ve yorgunluk ortaya çıkar.
        </p>

        <h2>Sağlıklı Kafein Tüketimi İçin Bilimsel İpuçları</h2>
        <ol class="list-decimal list-inside space-y-2 text-sm text-slate-700">
          <li><strong>Uyanır Uyanmaz Kahve İçmeyin:</strong> Sabah ilk uyandığınızda stres hormonu olan kortizol seviyeniz en yüksek noktadadır. Kahveyi uyandıktan 60 ila 90 dakika sonra tüketmek doğal kortizol ritmini bozmaz.</li>
          <li><strong>Öğleden Sonra Sınırı Koyun:</strong> Yavaş metabolize edici grupta olma ihtimalinize karşı saat 14:00'ten sonra kafein tüketimini sınırlandırın.</li>
          <li><strong>Günlük Üst Limit:</strong> <a href="https://www.efsa.europa.eu/" target="_blank" rel="noopener noreferrer nofollow" class="text-amber-700 font-bold hover:underline">Avrupa Gıda Güvenliği Otoritesi (EFSA)</a> sağlıklı yetişkinler için günlük güvenli kafein alım limitini 400 mg (yaklaşık 3-4 standart kupa filtre kahve) olarak belirlemiştir.</li>
        </ol>
      </div>

      <div class="my-6 p-6 bg-slate-900 text-white rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 not-prose">
        <div class="space-y-1 text-center sm:text-left">
          <span class="text-xs font-bold uppercase tracking-wider text-amber-400">Öğrenci &amp; Çalışma Rehberi</span>
          <h4 class="text-base font-bold">Verimli Çalışma ve Odaklanma Stratejileri PDF</h4>
          <p class="text-xs text-slate-300">Sınav dönemlerinde biyolojik saat yönetimi ve zihinsel odaklanma rehberini indirin.</p>
        </div>
        <a href="{smart_link}" target="_blank" rel="noopener noreferrer nofollow" class="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 shrink-0">
          📥 Rehberi İndir (PDF)
        </a>
      </div>

      <div class="p-5 bg-slate-50 rounded-2xl border border-slate-200 not-prose space-y-3">
        <h4 class="font-bold text-slate-900 text-sm">🔗 İlgili Eğitim ve Rehberlik Araçları:</h4>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <a href="/karne-gorusu-ureticisi" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            🎓 Karne Görüşü &amp; Gelişim Robotu &rarr;
          </a>
          <a href="/kategori/egitim-rehberligi" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            📖 Eğitim Rehberliği ve Bilişsel Gelişim &rarr;
          </a>
          <a href="/hesaplama-araclari" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            🧮 İnteraktif Matematik &amp; Sınav Robotları &rarr;
          </a>
        </div>
        <div class="pt-2 text-[11px] text-slate-500 border-t border-slate-200">
          Akademik Kaynaklar: <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer nofollow" class="underline text-slate-600">PubMed NCBI Araştırma Arşivi</a> &bull; <a href="https://www.nature.com/articles/npp201071" target="_blank" rel="noopener noreferrer nofollow" class="underline text-slate-600">Nature Neuropsychopharmacology</a>
        </div>
      </div>
    </div>
    '''
})

# =========================================================================
# 3. DİŞ AĞRISI VE BEYİN (Trigeminal Sinir)
# =========================================================================
articles.append({
    'slug': 'disimiz-agrirken-beynimizde-neler-oluyor',
    'title': 'Dişimiz Ağrırken Beynimizde Neler Oluyor? Trigeminal Sinir ve Yansıyan Ağrı Bilimi',
    'category': 'Matematik Blog',
    'category_slug': 'matematik-blog',
    'featured_image': 'https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/1000269744.jpg?itok=2FsqFUQa',
    'excerpt': 'Gece aniden başlayan zonklayıcı bir diş ağrısı neden tüm kafatasında hissedilir? Diş pulpasından talamusa uzanan trigeminal sinir yolağı ve ağrının nörolojik haritasını inceliyoruz.',
    'tags': ['Biyoloji', 'Nöroloji', 'Diş Ağrısı', 'Trigeminal Sinir', 'Sağlık', 'Popüler Bilim'],
    'content': f'''
    <div class="space-y-8">
      <div class="p-6 bg-gradient-to-br from-rose-50/90 via-slate-50 to-red-50/80 rounded-3xl border border-rose-200 shadow-sm not-prose">
        <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
          <span class="px-3.5 py-1 rounded-full bg-rose-600 text-white text-xs font-black tracking-wide uppercase">
            🧠 Nöroanatomi &amp; Ağrı Fizyolojisi
          </span>
          <span class="text-xs font-semibold text-slate-500">
            Ağrının Beyindeki İletim Hattı
          </span>
        </div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900">
          Küçük Bir Çürükten Zonklayan Bir Baş Ağrısına: Ağrı Mesajı Beyne Nasıl Ulaşır?
        </h2>
        <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
          Gece sessizliğinde aniden başlayan şiddetli bir diş ağrısı, insan bedeninin deneyimleyebileceği en dayanılmaz ve yıpratıcı duyulardan biridir. İlginç olan şudur ki, ağrının kaynağı milimetrik bir diş çürüğü veya pulpa iltihabı olmasına rağmen ağrı şakağa, göze, kulak arkasına ve tüm çeneye yayılıyor gibi hissedilir. Peki dişteki mikroskobik sinir uçları bu acı verici alarmı beyne nasıl iletir ve beyin bu mesajı nasıl işler?
        </p>
      </div>

      <figure class="my-6 not-prose text-center">
        <img src="https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/1000269744.jpg?itok=2FsqFUQa" alt="Trigeminal Sinir Anatomisi ve Beyin İletimi" class="w-full max-h-[500px] object-cover rounded-2xl shadow-md border border-slate-200 mx-auto" />
        <figcaption class="text-xs text-slate-500 mt-2 font-medium">Şekil 1: Trigeminal sinir dallarının yüz, çene ve dişler üzerindeki duyusal yayılımı.</figcaption>
      </figure>

      <div class="prose max-w-none text-slate-800 space-y-6">
        <h2>Dişin Canlı Kalbi: Pulpa ve Dentin Tübülleri</h2>
        <p>
          Dışarıdan bakıldığında dişler kemik gibi sert, beyaz ve cansız minerallerden ibaret görünür. Ancak en dıştaki mine tabakasının ve altındaki dentinin merkezinde <strong>pulpa</strong> adı verilen yumuşak doku bulunur. Pulpa odası zengin kan damarları, bağ doku ve son derece yoğun duyusal sinir lifleriyle (A-delta ve C lifleri) doludur.
        </p>
        <p>
          Dentin tabakasında mikroskobik binlerce sıvı dolu kanal (dentin tübülleri) yer alır. Sıcak, soğuk, asidik veya tatlı bir yiyecek bu kanallardaki sıvıyı hareket ettirdiğinde, pulpadaki mekanoreseptörler ve nosiseptörler (ağrı reseptörleri) uyarılır ve bir elektriksel sinir iletimi (aksiyon potansiyeli) başlar.
        </p>

        <h2>Ana Otoyol: Trigeminal Sinir (V. Kafa Çifti)</h2>
        <p>
          Dişlerden, diş etlerinden ve çene kemiğinden gelen tüm duyusal sinir lifleri birleşerek vücudun en kalın ve karmaşık kranial sinirlerinden biri olan <strong>Trigeminal Sinir (Üçüz Sinir - CN V)</strong> gövdesine bağlanır. Trigeminal sinir yüze üç ana dal halinde dağılır:
        </p>
        <ul class="list-disc list-inside space-y-2 text-sm text-slate-700">
          <li><strong>Oftalmik Dal (V1):</strong> Göz çevresi, alın ve burun kökü duyusu.</li>
          <li><strong>Maksiller Dal (V2):</strong> Üst çene dişleri, damak ve yanak bölgesi duyusu.</li>
          <li><strong>Mandibular Dal (V3):</strong> Alt çene dişleri, çene ucu ve çiğneme kasları duyusu.</li>
        </ul>

        <h2>Beyin Sapından Talamusa: Ağrının Bilinçli Algıya Dönüşmesi</h2>
        <p>
          Trigeminal sinir boyunca ilerleyen elektriksel sinyal önce beyin sapındaki <em>trigeminal duyu çekirdeğine</em> ulaşır. Buradan çapraz geçerek beynin ana santrali sayılan <strong>talamusa</strong> aktarılır. Talamus sinyali analiz ederek iki farklı merkeze yönlendirir:
        </p>
        <ol class="list-decimal list-inside space-y-2 text-sm text-slate-700">
          <li><strong>Primer Somatosensoriyel Korteks:</strong> Ağrının tam olarak nerede olduğunu, şiddetini ve keskin mi zonklayıcı mı olduğunu haritalandırır.</li>
          <li><strong>Limbik Sistem ve Singulat Korteks:</strong> Ağrının yarattığı korku, çaresizlik, sinirlilik ve uyku kaçıran duygusal acı bileşenini üretir.</li>
        </ol>

        <h2>Neden Yansıyan Ağrı (Referred Pain) Hissederiz?</h2>
        <p>
          Alt azı dişiniz çürüdüğünde ağrıyı kulağınızda veya boynunuzda hissetmenizin sebebi nörolojik bir "hat karışması"dır. Üst ve alt çeneden gelen sinir lifleri beyin sapındaki aynı nöron havuzunda sonlanır. Şiddetli ve sürekli bir iltihap durumunda komşu nöronlar da uyarılır ve beyin ağrının tam kaynağını ayırt edemeyerek tüm trigeminal sinir dermatomunda acı varmış gibi algılar.
        </p>

        <h2>Trigeminal Nevralji: Diş Ağrısıyla Karışan Tuzak Hastalık</h2>
        <p>
          Bazı hastalar diş ağrısı şikayetiyle diş hekimine başvurur, hatta sağlam dişlerini çektirebilirler; ancak ağrı geçmez. Bu durum genellikle <strong>Trigeminal Nevralji</strong> adı verilen, sinir kökünün bir damar tarafından baskılanması sonucu ortaya çıkan şiddetli elektrik çarpması benzeri nöropatik bir ağrıdır. Ağrının doğru teşhisi için nöroloji ve diş hekimliği ortak değerlendirmesi hayati önem taşır.
        </p>
      </div>

      <div class="my-6 p-6 bg-slate-900 text-white rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 not-prose">
        <div class="space-y-1 text-center sm:text-left">
          <span class="text-xs font-bold uppercase tracking-wider text-rose-400">Biyoloji &amp; Sağlık Çalışma Notları</span>
          <h4 class="text-base font-bold">Sinir Sistemi ve Duyu Organları Özetini İndirin</h4>
          <p class="text-xs text-slate-300">MEB 11. Sınıf Biyoloji Denetleyici ve Düzenleyici Sistemler ders notu ve kavram haritası.</p>
        </div>
        <a href="{smart_link}" target="_blank" rel="noopener noreferrer nofollow" class="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 shrink-0">
          📥 Biyoloji Özetini İndir (PDF)
        </a>
      </div>

      <div class="p-5 bg-slate-50 rounded-2xl border border-slate-200 not-prose space-y-3">
        <h4 class="font-bold text-slate-900 text-sm">🔗 İlgili Ders Notları ve Araçlar:</h4>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <a href="/kategori/11-sinif" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            📚 11. Sınıf Tüm Ders ve Çözüm Materyalleri &rarr;
          </a>
          <a href="/sinav-hazirlama-robotu" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            📝 Biyoloji &amp; Fen Yazılı Sınav Robotu &rarr;
          </a>
          <a href="/kategori/matematik-blog" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            🔬 Popüler Bilim &amp; STEM Makaleleri &rarr;
          </a>
        </div>
        <div class="pt-2 text-[11px] text-slate-500 border-t border-slate-200">
          Dış Tıbbi Kaynaklar: <a href="https://www.ncbi.nlm.nih.gov/books/NBK553153/" target="_blank" rel="noopener noreferrer nofollow" class="underline text-slate-600">StatPearls Trigeminal Nerve Anatomy</a> &bull; <a href="https://www.nature.com/subjects/neuroscience" target="_blank" rel="noopener noreferrer nofollow" class="underline text-slate-600">Nature Neuroscience</a>
        </div>
      </div>
    </div>
    '''
})

# =========================================================================
# 4. EDISON VE TESLA: AC vs DC
# =========================================================================
articles.append({
    'slug': 'edison-ve-teslanin-alternatif-akim-ve-dogru-akim-karsilastirmasi',
    'title': 'Edison ve Tesla’nın Akım Savaşları: Alternatif Akım (AC) ve Doğru Akım (DC) Karşılaştırması',
    'category': '11. Sınıf',
    'category_slug': '11-sinif',
    'featured_image': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    'excerpt': '19. yüzyılın sonlarında Thomas Edison ile Nikola Tesla arasında yaşanan "Akımlar Savaşı" modern elektrik şebekelerini nasıl şekillendirdi? Alternatif akım ve doğru akımın fiziksel prensipleri, transformatörler ve güç kayıpları analizi.',
    'tags': ['11. Sınıf', 'Fizik', 'Alternatif Akım', 'Tesla', 'Edison', 'Manyetizma', 'Elektrik'],
    'content': f'''
    <div class="space-y-8">
      <div class="p-6 bg-gradient-to-br from-blue-50/90 via-slate-50 to-indigo-50/80 rounded-3xl border border-blue-200 shadow-sm not-prose">
        <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
          <span class="px-3.5 py-1 rounded-full bg-blue-600 text-white text-xs font-black tracking-wide uppercase">
            ⚡ 11. Sınıf Fizik &amp; Bilim Tarihi
          </span>
          <span class="text-xs font-semibold text-slate-500">
            2. Ünite: Elektrik ve Manyetizma
          </span>
        </div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900">
          Akımlar Savaşı (War of the Currents): Modern Dünyayı Aydınlatan Fiziksel Rekabet
        </h2>
        <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
          Prizlerimizden akan elektrik, şehirler arası yüksek gerilim hatları ve cep telefonlarımızın bataryaları... Modern dünyada kullandığımız her teknoloji, 1880'lerin sonunda iki dahi mucit olan <strong>Thomas Alva Edison</strong> ve <strong>Nikola Tesla</strong> (ve onun vizyonunu destekleyen George Westinghouse) arasındaki şiddetli fizik ve mühendislik savaşının bir sonucudur. MEB 11. Sınıf Fizik müfredatında yer alan <em>Alternatif Akım ve Transformatörler</em> konusunun temelini oluşturan bu tarihi mücadeleyi ve arkasındaki fiziksel kanunları derinlemesine inceliyoruz.
        </p>
      </div>

      <div class="prose max-w-none text-slate-800 space-y-6">
        <h2>Doğru Akım (DC) Nedir? Edison'un Vizyonu ve Sınırları</h2>
        <p>
          <strong>Doğru Akım (Direct Current - DC):</strong> Zamana bağlı olarak yönü ve şiddeti değişmeyen elektrik akımıdır. Piller, akümülatörler, güneş panelleri ve bilgisayar devreleri doğru akımla çalışır. Thomas Edison, New York'un Pearl Street semtinde kurduğu ilk ticari santralde 110 voltluk doğru akım jeneratörleri kullandı.
        </p>
        <p>
          Ancak doğru akımın aşılması imkansız görünen devasa bir fiziksel engeli vardı: <strong>Joule Isı Kaybı</strong>. Bir iletken telden geçen akımın açığa çıkardığı ısı gücü Joule Yasası ile hesaplanır:
        </p>
        <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center font-mono text-base text-indigo-950 font-bold my-3">
          P_kayıp = I^2 &times; R
        </div>
        <p>
          Burada <em>I</em> iletkenden geçen akım, <em>R</em> ise iletkenin direncidir. Taşınan elektrik gücü <em>P = V &times; I</em> olduğundan, doğru akımda gerilimi (V) yükseltmek o yıllarda mümkün değildi. Gerilim düşük (110V) kaldığı için yüksek güç taşımak muazzam büyüklükte akım gerektiriyordu. Bu da tellerin aşırı ısınmasına ve enerjinin 1-2 kilometre içinde tamamen ısıya dönüşerek yok olmasına yol açıyordu. Edison her mahalleye bir santral kurmak zorundaydı.
        </p>

        <h2>Alternatif Akım (AC) Nedir? Tesla'nın Dâhiyane Çözümü</h2>
        <p>
          <strong>Alternatif Akım (Alternating Current - AC):</strong> Zamana bağlı olarak büyüklüğü ve yönü periyodik olarak değişen (sinüzoidal dalga formu) elektrik akımıdır. Nikola Tesla, döner manyetik alan ilkesini keşfederek AC jeneratörlerini ve çok fazlı indüksiyon motorlarını tasarladı.
        </p>
        <p>
          Tesla'nın sisteminin en büyük üstünlüğü <strong>Transformatörler</strong> ile olan mükemmel uyumuydu. Manyetik akı değişimi (Faraday İndüksiyon Kanunu) sadece alternatif akımda gerçekleştiğinden, gerilim transformatörler yardımıyla kolayca yüz binlerce volta yükseltilebiliyordu:
        </p>
        <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center font-mono text-base text-indigo-950 font-bold my-3">
          V_primer / V_sekonder = N_primer / N_sekonder = I_sekonder / I_primer
        </div>
        <p>
          Gerilim 100 kat artırıldığında, aynı gücü taşımak için gereken akım 100 kat azalıyordu. Akım 100 kat azaldığında ise tellerdeki kayıp güç (I^2 &times; R) tam <strong>10.000 kat</strong> azalıyordu! Böylece Niagara Şelalesi'nde üretilen devasa elektrik enerjisi, yüzlerce kilometre uzaktaki Buffalo kentine incecik tellerle neredeyse sıfır kayıpla taşınabildi.
        </p>

        <h2>AC ve DC Arasındaki Temel Karşılaştırma Tablosu</h2>
        <div class="overflow-x-auto not-prose my-6">
          <table class="w-full text-xs sm:text-sm text-left border border-slate-200 rounded-2xl overflow-hidden">
            <thead class="bg-slate-900 text-white font-bold">
              <tr>
                <th class="p-3.5">Özellik</th>
                <th class="p-3.5">Doğru Akım (DC)</th>
                <th class="p-3.5">Alternatif Akım (AC)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 bg-white">
              <tr>
                <td class="p-3 font-bold text-slate-900">Yön ve Şiddet</td>
                <td class="p-3 text-slate-700">Sabit, tek yönlü</td>
                <td class="p-3 text-slate-700">Periyodik olarak yön ve büyüklük değişir (50 Hz / 60 Hz)</td>
              </tr>
              <tr>
                <td class="p-3 font-bold text-slate-900">Gerilim Değişimi</td>
                <td class="p-3 text-slate-700">Transformatör ile değiştirilemez</td>
                <td class="p-3 text-slate-700">Transformatör ile kolayca yükseltilir/düşürülür</td>
              </tr>
              <tr>
                <td class="p-3 font-bold text-slate-900">Uzak Mesafeye İletim</td>
                <td class="p-3 text-slate-700">Yüksek enerji kaybı nedeniyle zor</td>
                <td class="p-3 text-emerald-700 font-bold">Minimum kayıpla yüzlerce kilometre iletilir</td>
              </tr>
              <tr>
                <td class="p-3 font-bold text-slate-900">Depolanabilirlik</td>
                <td class="p-3 text-emerald-700 font-bold">Akü ve pillerde kolayca depolanabilir</td>
                <td class="p-3 text-slate-700">Doğrudan depolanamaz, önce DC'ye çevrilmelidir</td>
              </tr>
              <tr>
                <td class="p-3 font-bold text-slate-900">Kullanım Alanı</td>
                <td class="p-3 text-slate-700">Elektronik devreler, bilgisayarlar, elektrikli araçlar</td>
                <td class="p-3 text-slate-700">Şehir şebekeleri, fabrikalar, ağır sanayi motorları</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Günümüzde Durum: Yüksek Gerilimli Doğru Akım (HVDC) Rönesansı</h2>
        <p>
          20. yüzyılda savaşı Tesla'nın AC sistemi açık ara kazandı. Ancak 21. yüzyılda doğru akım güçlü bir geri dönüş yapmaktadır. Deniz altı kablolarında (örneğin İngiltere-Norveç arası rüzgar enerjisi hatlarında) AC akımın kapasitif reaktans kayıpları çok yüksek olduğu için modern yarı iletken dönüştürücüler kullanılarak <strong>Yüksek Gerilimli Doğru Akım (HVDC)</strong> sistemleri kullanılmaktadır.
        </p>
      </div>

      <div class="my-6 p-6 bg-slate-900 text-white rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 not-prose">
        <div class="space-y-1 text-center sm:text-left">
          <span class="text-xs font-bold uppercase tracking-wider text-indigo-400">11. Sınıf Fizik Sınav Materyali</span>
          <h4 class="text-base font-bold">Alternatif Akım &amp; Transformatörler Ders Notu PDF</h4>
          <p class="text-xs text-slate-300">MEB müfredatı formülleri, soru çözümleri ve çıkmış sınav soruları derlemesi.</p>
        </div>
        <a href="{smart_link}" target="_blank" rel="noopener noreferrer nofollow" class="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 shrink-0">
          📥 11. Sınıf Fizik Notunu İndir
        </a>
      </div>

      <div class="p-5 bg-slate-50 rounded-2xl border border-slate-200 not-prose space-y-3">
        <h4 class="font-bold text-slate-900 text-sm">🔗 11. Sınıf İlgili Fizik Çözümleri ve Araçlar:</h4>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <a href="/post/11-sinif-fizik-2-unite-elektrik-ve-manyetizma-cevaplari-meb" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            ⚡ 2. Ünite Elektrik &amp; Manyetizma Çözümleri &rarr;
          </a>
          <a href="/post/11-sinif-fizik-ders-kitabi-cevaplari-meb-pdf" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            📚 11. Sınıf Fizik Ders Kitabı Tüm Cevaplar &rarr;
          </a>
          <a href="/sinav-hazirlama-robotu" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            📝 11. Sınıf Fizik Yazılı Soru Robotu &rarr;
          </a>
        </div>
        <div class="pt-2 text-[11px] text-slate-500 border-t border-slate-200">
          Akademik Dış Kaynaklar: <a href="https://www.ieee.org/" target="_blank" rel="noopener noreferrer nofollow" class="underline text-slate-600">IEEE Tarih Merkezi</a> &bull; <a href="https://americanhistory.si.edu/" target="_blank" rel="noopener noreferrer nofollow" class="underline text-slate-600">Smithsonian Müzesi Elektrik Koleksiyonu</a>
        </div>
      </div>
    </div>
    '''
})

# =========================================================================
# 5. 11. SINIF FİZİK 1. DÖNEM 1. YAZILI SINAV SORULARI & ÇÖZÜMLERİ
# =========================================================================
articles.append({
    'slug': '11-sinif-fizik-1-donem-1-yazili-sinav-sorulari-ve-cevaplari-word-indir',
    'title': '11. Sınıf Fizik 1. Dönem 1. Yazılı Sınavı Soruları ve Cevap Anahtarı (2024-2025 MEB Maarif Modeli)',
    'category': '11. Sınıf',
    'category_slug': '11-sinif',
    'featured_image': 'https://www.etkinlikpaylas.com/wp-content/uploads/2026/09/11.-Sinif-Fizik-1.-Donem-1.-Yazili-Sinav-Sorulari-ve-Cevaplari-Word-Indir-1100x651.jpg',
    'excerpt': '2024-2025 ve 2026-2027 MEB güncel müfredatına uygun 11. sınıf fizik 1. dönem 1. yazılı sınav soruları, açık uçlu sorular, puan baremi, ayrıntılı adımlı çözüm anahtarı ve düzenlenebilir Word/PDF indirme bağlantısı.',
    'tags': ['11. Sınıf', 'Fizik', 'Yazılı Soruları', '1. Dönem 1. Yazılı', 'MEB', 'Açık Uçlu Sınav', 'Word İndir'],
    'content': f'''
    <div class="space-y-8">
      <div class="p-6 bg-gradient-to-br from-indigo-50/90 via-slate-50 to-blue-50/80 rounded-3xl border border-indigo-200 shadow-sm not-prose">
        <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
          <span class="px-3.5 py-1 rounded-full bg-indigo-600 text-white text-xs font-black tracking-wide uppercase">
            📝 11. Sınıf Fizik Yazılı Arşivi
          </span>
          <span class="text-xs font-semibold text-slate-500">
            MEB Ortak Sınav Senaryolarına Tam Uyumlu
          </span>
        </div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900">
          11. Sınıf Fizik 1. Dönem 1. Ortak Yazılı Sınavı Hazırlık Dokümanı ve Çözümleri
        </h2>
        <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
          Millî Eğitim Bakanlığı Ölçme, Değerlendirme ve Sınav Hizmetleri Genel Müdürlüğü tarafından yayımlanan <strong>Türkiye Yüzyılı Maarif Modeli</strong> ortak sınav senaryolarına tam uyumlu olarak hazırlanmış 1. Dönem 1. Yazılı Sınav kağıdıdır. Sınavda ezbere dayalı test soruları yerine; kavramsal anlama, serbest cisim diyagramı (SCD) çizimi, vektörel bileşen analizi ve iki boyutta sabit ivmeli hareket hesaplamalarını ölçen açık uçlu sorular yer almaktadır.
        </p>
      </div>

      <div class="my-6 text-center not-prose">
        <div class="p-6 bg-slate-900 text-white rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="space-y-1 text-center sm:text-left">
            <span class="text-xs font-bold uppercase tracking-wider text-indigo-400">Öğretmen ve Öğrenciler İçin</span>
            <h3 class="text-lg font-bold">Yazılı Kağıdını Düzenlenebilir Word (.docx) Formatında İndirin</h3>
            <p class="text-xs text-slate-300">Okulunuza göre soru sayılarını ve puan dağılımlarını Word üzerinde kolayca özelleştirebilirsiniz.</p>
          </div>
          <a href="{smart_link}" target="_blank" rel="noopener noreferrer nofollow" class="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-black text-sm shadow-lg transition-all hover:scale-105 shrink-0">
            📥 Sınavı Word / PDF Olarak İndir
          </a>
        </div>
      </div>

      <div class="prose max-w-none text-slate-800 space-y-6">
        <h2>Sınav Soruları ve Ayrıntılı Çözüm Anahtarı</h2>

        <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm not-prose space-y-3">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <span class="font-black text-slate-900 text-sm">Soru 1: Vektörlerin Bileşkesi ve Kartezyen Koordinat (10 Puan)</span>
            <span class="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">Vektörler</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-700">
            Sürtünmesiz yatay düzlemde durmakta olan noktasal K cismine aynı düzlemdeki F1 = 10 N (x ekseniyle 37°), F2 = 6 N (-x yönünde) ve F3 = 8 N (+y yönünde) kuvvetleri etki etmektedir. Cisme etki eden bileşke kuvvetin (R) büyüklüğünü ve yönünü bulunuz. (sin 37° = 0,6; cos 37° = 0,8)
          </p>
          <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 font-medium">
            <strong>Çözüm:</strong><br />
            F1x = 10 &times; cos 37° = 10 &times; 0,8 = +8 N<br />
            F1y = 10 &times; sin 37° = 10 &times; 0,6 = +6 N<br />
            Rx = F1x + F2x = +8 + (-6) = +2 N<br />
            Ry = F1y + F3y = +6 + 8 = +14 N<br />
            Bileşke Kuvvet: R = √(Rx^2 + Ry^2) = √(4 + 196) = √200 = <strong>10√2 N</strong> bulunur.
          </div>
        </div>

        <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm not-prose space-y-3">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <span class="font-black text-slate-900 text-sm">Soru 2: Bağıl Hareket ve Nehir Problemi (15 Puan)</span>
            <span class="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">Bağıl Hareket</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-700">
            Genişliği d = 60 m olan bir nehirde akıntı hızı doğu yönünde Va = 3 m/s'dir. Suya göre hızı Vm = 5 m/s olan bir yüzücü güney kıyısından kuzeye doğru akıntıya dik doğrultuda yüzmeye başlıyor. Yüzücünün karşı kıyıya ulaşma süresini ve karşı kıyıya çıktığı noktanın tam karşısındaki noktaya olan sürüklenme mesafesini (x) hesaplayınız.
          </p>
          <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 font-medium">
            <strong>Çözüm:</strong><br />
            Karşı kıyıya geçiş süresini yalnızca düşey hız belirler: t = d / Vy = 60 / 5 = <strong>12 saniye</strong>.<br />
            Akıntı yönündeki sürüklenme mesafesi: x = Va &times; t = 3 &times; 12 = <strong>36 metre</strong> doğuya sürüklenir.
          </div>
        </div>

        <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm not-prose space-y-3">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <span class="font-black text-slate-900 text-sm">Soru 3: Yatay Atış ve Kinematik Modelleme (15 Puan)</span>
            <span class="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">Atışlar</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-700">
            Hava sürtünmesinin ihmal edildiği ortamda h = 80 m yükseklikteki bir kulenin tepesinden yatay olarak Vo = 30 m/s hızla fırlatılan bir cismin; havada kalma süresini, yatay menzilini (x) ve yere çarpma hız büyüklüğünü bulunuz. (g = 10 m/s^2)
          </p>
          <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 font-medium">
            <strong>Çözüm:</strong><br />
            Düşeyde serbest düşme hareketi yapar: h = 1/2 &times; g &times; t^2 &rarr; 80 = 5t^2 &rarr; t^2 = 16 &rarr; <strong>t = 4 saniye</strong>.<br />
            Yatayda sabit hızlı hareket yapar: x = Vo &times; t = 30 &times; 4 = <strong>120 metre</strong> menzil.<br />
            Düşey hız: Vy = g &times; t = 10 &times; 4 = 40 m/s.<br />
            Yere çarpma hızı: V = √(Vx^2 + Vy^2) = √(30^2 + 40^2) = <strong>50 m/s</strong> bulunur.
          </div>
        </div>

        <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm not-prose space-y-3">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <span class="font-black text-slate-900 text-sm">Soru 4: Newton Yasaları &amp; Eğik Düzlemde Sürtünme (15 Puan)</span>
            <span class="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">Dinamik</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-700">
            Eğim açısı 37° olan eğik düzlem üzerindeki m = 2 kg kütleli cisim ile zemin arasındaki sürtünme katsayısı k = 0,25'tir. Cisim serbest bırakıldığında eğik düzlem boyunca aşağıya doğru hızlanma ivmesini (a) bulunuz. (sin 37° = 0,6; cos 37° = 0,8; g = 10 m/s^2)
          </p>
          <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 font-medium">
            <strong>Çözüm:</strong><br />
            Ağırlık: G = m &times; g = 2 &times; 10 = 20 N.<br />
            Kaydırıcı paralel kuvvet: Fp = G &times; sin 37° = 20 &times; 0,6 = 12 N.<br />
            Yüzeye dik baskı kuvveti: Fn = G &times; cos 37° = 20 &times; 0,8 = 16 N.<br />
            Sürtünme kuvveti: Fs = k &times; Fn = 0,25 &times; 16 = 4 N.<br />
            Net Kuvvet: Fnet = Fp - Fs = 12 - 4 = 8 N.<br />
            İvme: Fnet = m &times; a &rarr; 8 = 2 &times; a &rarr; <strong>a = 4 m/s^2</strong> bulunur.
          </div>
        </div>
      </div>

      <div class="p-5 bg-slate-50 rounded-2xl border border-slate-200 not-prose space-y-3">
        <h4 class="font-bold text-slate-900 text-sm">🔗 11. Sınıf Fizik Sınav Hazırlık Bağlantıları:</h4>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <a href="/post/11-sinif-fizik-ders-kitabi-cevaplari-meb-pdf" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            📚 11. Sınıf Fizik Ders Kitabı Tüm Çözümleri &rarr;
          </a>
          <a href="/post/11-sinif-fizik-1-unite-kuvvet-ve-hareket-cevaplari-meb" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            🎯 1. Ünite Kuvvet ve Hareket Alıştırmaları &rarr;
          </a>
          <a href="/sinav-hazirlama-robotu" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            📝 11. Sınıf Yazılı Soruları Üretici Robot &rarr;
          </a>
        </div>
        <div class="pt-2 text-[11px] text-slate-500 border-t border-slate-200">
          Resmi MEB Kaynağı: <a href="https://odsgm.meb.gov.tr/" target="_blank" rel="noopener noreferrer nofollow" class="underline text-slate-600">Ölçme Değerlendirme ve Sınav Hizmetleri Genel Müdürlüğü (ÖDSGM)</a>
        </div>
      </div>
    </div>
    '''
})

# =========================================================================
# 6. KESİRLERDE BÖLME İŞLEMİ VE MODELLEME
# =========================================================================
articles.append({
    'slug': 'kesri-kesre-bolme-modelleme-araci',
    'title': 'Kesri Kesre Bölme İşlemi: Payda Eşitleme, Modelleme ve Görsel Anlatım Rehberi',
    'category': '5. Sınıf',
    'category_slug': '5-sinif',
    'featured_image': 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=1200&q=80',
    'excerpt': 'Kesirlerde bölme işlemi yaparken neden "birinci kesir aynen kalır, ikincisi ters çevrilip çarpılır"? Bu kuralın arkasındaki görsel paylaştırma, payda eşitleme ve modelleme adımlarını inceliyoruz.',
    'tags': ['5. Sınıf', 'Matematik', 'Kesirler', 'Bölme İşlemi', 'Modelleme', 'MEB Müfredatı'],
    'content': f'''
    <div class="space-y-8">
      <div class="p-6 bg-gradient-to-br from-teal-50/90 via-slate-50 to-emerald-50/80 rounded-3xl border border-teal-200 shadow-sm not-prose">
        <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
          <span class="px-3.5 py-1 rounded-full bg-teal-600 text-white text-xs font-black tracking-wide uppercase">
            📐 Somut Matematik &amp; Pedagojik Modelleme
          </span>
          <span class="text-xs font-semibold text-slate-500">
            5. ve 6. Sınıf MEB Kazanımları
          </span>
        </div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900">
          Ezberle Değil Anlayarak Matematik: Kesirlerde Bölmenin Görsel Mantığı
        </h2>
        <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
          Geleneksel okul eğitiminde kesirlerde bölme işlemi öğretilirken çoğu zaman şu ezber kural tekrarlanır: <em>"Birinci kesri aynen yaz, ikinci kesri ters çevirip çarp!"</em> Peki ama neden? Neden bölme yaparken aniden çarpma işlemine geçiyoruz ve ikinci kesir neden takla atıyor? <strong>Türkiye Yüzyılı Maarif Modeli</strong> öğretim programının merkezinde yer alan kavramsal anlama ilkesi doğrultusunda, kesirlerde bölmenin arkasındaki somut modelleme yöntemlerini adım adım açığa çıkarıyoruz.
        </p>
      </div>

      <div class="prose max-w-none text-slate-800 space-y-6">
        <h2>1. Yöntem: "İçinde Kaç Tane Var?" (Ölçme Modeli)</h2>
        <p>
          Doğal sayılarda bölme işlemini nasıl düşünürüz? Örneğin <strong>6 ÷ 2 = 3</strong> dediğimizde kendimize şu soruyu sorarız: <em>"6'nın içinde kaç tane 2 var?"</em> Cevap 3 tanedir.
        </p>
        <p>
          Aynı soruyu kesirler için de sormalıyız. Örneğin:
        </p>
        <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center font-mono text-base text-indigo-950 font-bold my-3">
          (3/4) ÷ (1/4) = ?
        </div>
        <p>
          Soru şudur: <em>"3/4'lük bir pastanın içinde kaç tane 1/4'lük dilim vardır?"</em> Gözünüzün önüne dört eşit dilime bölünmüş bir pizza getirin. Bu pizzanın 3 dilimi masadadır. Masadaki pizzada kaç tane çeyrek dilim vardır? Elbette <strong>3 tane</strong>!
        </p>
        <p>
          Paydalar eşit olduğunda bölme işlemi aslında payların birbirine bölünmesinden ibarettir: <strong>3 ÷ 1 = 3</strong>.
        </p>

        <h2>2. Yöntem: Paydaları Eşitleyerek Modelleme Yolu</h2>
        <p>
          Peki paydalar farklıysa ne yaparız? Örneğin:
        </p>
        <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center font-mono text-base text-indigo-950 font-bold my-3">
          (2/3) ÷ (1/6) = ?
        </div>
        <p>
          Burada 2/3'ün içinde kaç tane 1/6 olduğunu doğrudan görmek zordur çünkü birimler (dilim büyüklükleri) farklıdır. Çözüm, dilimleri aynı boyuta getirmektir (genişletme):
        </p>
        <ul class="list-disc list-inside space-y-2 text-sm text-slate-700">
          <li>2/3 kesrini 2 ile genişletelim: <strong>(2 &times; 2) / (3 &times; 2) = 4/6</strong>.</li>
          <li>Şimdi işlemimiz şuna dönüştü: <strong>(4/6) ÷ (1/6)</strong>.</li>
          <li>Soru artık çok basittir: <em>"4 tane altıda birlik parçanın içinde kaç tane 1/6 vardır?"</em></li>
          <li>Cevap: <strong>4 tanedir</strong>!</li>
        </ul>

        <h2>3. Yöntem: Neden Ters Çevirip Çarpıyoruz? (Birim Kesir Mantığı)</h2>
        <p>
          Bir sayıyı <strong>1/2'ye bölmek</strong>, o sayının içindeki yarımları saymaktır. Bir bütünün içinde kaç yarım vardır? 2 tane. Yani 1'e bölmek yerine 1/2'ye böldüğünüzde her bütün 2 katına çıkar. Bu yüzden bir sayıyı 1/2'ye bölmek, o sayıyı <strong>2 ile çarpmakla</strong> tamamen aynıdır!
        </p>
        <p>
          Bir sayıyı <strong>1/4'e bölmek</strong>, onu 4 ile çarpmaktır. Benzer şekilde bir sayıyı <strong>2/3'e bölmek</strong> demek; önce parçayı 3 katına çıkarıp (çünkü üçte birlere ayırıyoruz) ardından 2 kişilik gruplara bölmek demektir. İşte ters çevirip çarpma kuralı (reciprocal rule) gökten inmiş sihirli bir kural değil, doğrudan orantı mantığının kısayoludur.
        </p>
      </div>

      <div class="my-6 p-6 bg-slate-900 text-white rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 not-prose">
        <div class="space-y-1 text-center sm:text-left">
          <span class="text-xs font-bold uppercase tracking-wider text-teal-400">Yazdırılabilir A4 Çalışma Kağıdı</span>
          <h4 class="text-base font-bold">5. Sınıf Kesirlerde Modelleme ve Problem Kağıdı PDF</h4>
          <p class="text-xs text-slate-300">Renkli şerit modelleri, pasta dilimi grafikleri ve çözümlü yeni nesil sorular.</p>
        </div>
        <a href="{smart_link}" target="_blank" rel="noopener noreferrer nofollow" class="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 shrink-0">
          📥 Çalışma Kağıdını İndir
        </a>
      </div>

      <div class="p-5 bg-slate-50 rounded-2xl border border-slate-200 not-prose space-y-3">
        <h4 class="font-bold text-slate-900 text-sm">🔗 5. Sınıf İlgili Matematik Konuları ve Araçlar:</h4>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <a href="/kategori/5-sinif" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            📚 5. Sınıf Tüm Matematik Konuları &rarr;
          </a>
          <a href="/oran-oranti-hesaplama" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            🧮 Oran &amp; Kesir Sadeleştirme Aracı &rarr;
          </a>
          <a href="/sinav-hazirlama-robotu" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            📝 5. Sınıf Yazılı &amp; Test Robotu &rarr;
          </a>
        </div>
        <div class="pt-2 text-[11px] text-slate-500 border-t border-slate-200">
          Eğitsel Dış Bağlantı: <a href="https://eba.gov.tr" target="_blank" rel="noopener noreferrer nofollow" class="underline text-slate-600">MEB Eğitim Bilişim Ağı (EBA) Matematik Portali</a>
        </div>
      </div>
    </div>
    '''
})

for art in articles:
    tags_json = json.dumps(art['tags'])
    cursor.execute('''
        INSERT OR REPLACE INTO posts 
        (title, slug, excerpt, content, featured_image, category, category_slug, tags, author, is_published, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Matemetrik Bilim & Eğitim Zümresi', 1, ?, ?)
    ''', (art['title'], art['slug'], art['excerpt'], art['content'], art['featured_image'], art['category'], art['category_slug'], tags_json, now_str, now_str))
    print(f"Rich article updated: {art['slug']}")

conn.commit()
conn.close()
print("All rich articles updated with complete content, external links, and strictly relevant internal links!")
