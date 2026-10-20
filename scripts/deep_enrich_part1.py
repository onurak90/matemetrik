import sqlite3
from bs4 import BeautifulSoup

conn = sqlite3.connect('data/matemetrik.db')
cursor = conn.cursor()

# ---------------------------------------------------------------------------
# 1. FRAKTAL AĞACI VE DOĞADAKİ GEOMETRİ (Tam, derin, zengin metin + çoklu görsel)
# ---------------------------------------------------------------------------
content_fraktal = """
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-emerald-50/90 via-slate-50 to-teal-50/80 rounded-3xl border border-emerald-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-emerald-600 text-white text-xs font-black tracking-wide uppercase">
        🌿 Fraktal Geometri &amp; Doğanın Kodları
      </span>
      <span class="text-xs font-semibold text-slate-500">
        Eğlenmatik Matematik Atölyesi
      </span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-slate-900">
      Fraktal Ağacı ve Doğadaki Geometri: Kendine Benzerlik, Örüntüler ve Kaosun Düzeni
    </h2>
    <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
      Geleneksel Öklid geometrisi dünyayı pürüzsüz daireler, kusursuz üçgenler ve düz çizgilerle tarif eder. Oysa doğaya baktığınızda bulutlar küre değildir, dağlar koni değildir, şimşekler doğru boyunca ilerlemez ve bir ağacın kabuğu asla pürüzsüz değildir. Matematikçi <strong>Benoit Mandelbrot</strong> 1975 yılında ortaya koyduğu <strong>Fraktal Geometri</strong> ile doğanın bu pürüzlü, karmaşık ve sonsuz detay içeren dilini çözmeyi başarmıştır.
    </p>

    <div class="mt-4 pt-4 border-t border-emerald-200/60 flex flex-wrap items-center justify-between gap-3">
      <div class="text-xs text-slate-600">
        📄 Doküman: <strong>Fraktal Geometri ve Örüntü İnceleme Notu (PDF)</strong> &bull; Boyut: <strong>3.0 KB</strong>
      </div>
      <a href="/uploads/tasinan-kanepe-problemi-geometri-notu.pdf" download="Fraktal-Geometri-ve-Oruntu-Notu.pdf" class="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all shrink-0">
        📥 Geometri Notunu (PDF) İndir
      </a>
    </div>
  </div>

  <figure class="my-6 not-prose">
    <img src="https://eglenmatik.com/uploads/articles/articles-3bdb8cde-3b30-4690-97d6-3530dc5f7e66.jpg" alt="Eğlenmatik Fraktal Ağacı İnteraktif Çalışması" class="w-full rounded-3xl shadow-lg border border-slate-200 object-cover max-h-[500px]" />
    <figcaption class="text-xs text-center text-slate-500 mt-2 font-medium">
      Görsel 1: Eğlenmatik interaktif atölyesinde adım adım inşa edilen fraktal ağacı ve dallanma örüntüsü.
    </figcaption>
  </figure>

  <div class="prose prose-slate max-w-none space-y-6">
    <h2>1. Fraktal Nedir? Kendine Benzerlik (Self-Similarity) Kavramı</h2>
    <p>
      Bir geometrik şekli veya nesneyi aldığınızda, onun küçük bir parçasını büyüttüğünüzde karşınıza şeklin tamamına benzeyen hatta onunla birebir aynı bir desen çıkıyorsa bu yapı bir <strong>fraktaldır</strong>. Matematik dilinde bu özelliğe <em>öz benzerlik (kendine benzerlik / self-similarity)</em> adı verilir.
    </p>
    <p>
      Klasik geometrideki bir çembere mikroskopla baktığınızda eğrilik kaybolur ve çember düz bir çizgiye dönüşür. Bir karenin kenarına yaklaştığınızda da sadece düz bir hat görürsünüz. Ancak bir fraktala ne kadar yaklaşırsanız yaklaşın, detaylar asla kaybolmaz; her ölçekte aynı büyüleyici karmaşıklık kendini yeniden üretir. Mandelbrot'un ünlü sözüyle: <em>"Bulutlar küre değildir, dağlar koni değildir, kıyı şeritleri çember yayları değildir."</em>
    </p>

    <h2>2. Fraktal Ağacı Algoritması ve Adım Adım İnşa Aşamaları</h2>
    <p>
      Fraktal ağacı, bilgisayar bilimlerinde ve matematik derslerinde rekürsif (özyinelemeli) algoritmaları somutlaştırmak için kullanılan en temel modeldir. İnşa mantığı son derece basit kurallara dayanır:
    </p>
    <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
      <h3 class="text-base font-bold text-slate-900">Adım Adım Fraktal Ağacı Çizim Basamakları:</h3>
      <ol class="text-xs sm:text-sm text-slate-700 list-decimal list-inside space-y-2">
        <li><strong>Başlangıç (Gövde / Adım 0):</strong> Kağıdın altından başlayarak dikey bir doğru parçası çizin. Bu ağacın ana gövdesidir ($L$ uzunluğunda).</li>
        <li><strong>Birinci Dallanma (Adım 1):</strong> Gövdenin tepe noktasından sağa ve sola belirli bir açıyla (örneğin $\theta = 25^\circ$ veya $30^\circ$) uzanan iki yeni dal çizin. Bu yeni dalların uzunluğu ana gövdenin belli bir oranı (örneğin $0.7 \times L$) kadar olmalıdır.</li>
        <li><strong>İkinci Dallanma (Adım 2):</strong> Oluşan 2 yeni dalın her birinin ucuna, aynı açıyla ve aynı oranda küçülen ikişer dal daha ekleyin. Bu adımda ağaçta toplam $4$ yeni uç dal meydana gelir.</li>
        <li><strong>Yineleme (Adım 3, 4, 5... n):</strong> Her yeni dalın ucuna aynı kuralı uygulayarak dallanmayı sürdürün. $n$. adımda dallanan yeni uç sayısı $2^n$ formülüyle katlanarak artar.</li>
      </ol>
      <p class="text-xs text-slate-600 pt-1">
        Dallanma açısı değiştirildiğinde ($\theta = 15^\circ$ dar açıda kavak ağacı, $\theta = 45^\circ$ geniş açıda ise meşe veya çınar ağacı) ortaya çıkan desen tamamen değişir. Doğa da genetik kodundaki basit kimyasal kurallarla devasa ormanları tam olarak bu algoritmayla inşa eder.
      </p>
    </div>

    <h2>3. Matematiksel Paradoks: Koch Kar Tanesi (Sonsuz Çevre, Sonlu Alan)</h2>
    <p>
      Fraktal geometrinin en akıl almaz sonuçlarından biri 1904 yılında İsveçli matematikçi Helge von Koch tarafından keşfedilen <strong>Koch Kar Tanesi (Koch Snowflake)</strong> eğrisidir.
    </p>
    <p>
      Bir eşkenar üçgenle başlanır. Her kenarın orta üçte birlik kısmı çıkarılıp yerine dışa doğru bakan yeni bir eşkenar üçgen oturtulur. Bu işlem her yeni kenara sonsuza kadar uygulandığında:
    </p>
    <ul>
      <li><strong>Çevre Uzunluğu:</strong> Her adımda kenar sayısı $4$ katına çıkarken uzunluk $\frac{1}{3}$'e iner. Toplam çevre her adımda $\frac{4}{3}$ kat uzar. Adım sayısı sonsuza giderken ($n \to \infty$) çevre uzunluğu <strong>sonsuzluğa ulaşır</strong>!</li>
      <li><strong>Alan:</strong> Kar tanesi başlangıçtaki üçgeni çevreleyen sınırlı bir dairenin dışına asla taşamaz. Yani alanı <strong>sonludur ve sınırlıdır</strong>!</li>
    </ul>
    <p>
      Bu durum akıllara durgunluk veren bir gerçeği kanıtlar: <em>Sonlu bir yüzey alanının etrafı, sonsuz uzunlukta bir sınır çizgisiyle sarılabilir!</em>
    </p>

    <h2>4. Doğanın Fraktal Mimarisi: Neden Canlılar Fraktalları Seçer?</h2>
    <p>
      Doğada fraktalların bu kadar yaygın olmasının sebebi estetik değil, kusursuz bir <strong>enerji ve kaynak optimizasyonudur</strong>:
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
      <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <h3 class="text-sm font-bold text-emerald-800">🥦 Romanesco Brokolisi</h3>
        <p class="text-xs text-slate-700 leading-relaxed">
          Doğadaki en kusursuz fraktal örneğidir. Brokolinin üzerindeki her bir sivri konik tomurcuk, tüm brokolinin birebir kopyasıdır. Her tomurcuğun üzerindeki küçük kabartılar da yine aynı konik spirali çizer. Logaritmik Fibonacci spiraliyle dallanır.
        </p>
      </div>
      <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <h3 class="text-sm font-bold text-emerald-800">🫁 İnsan Akciğeri ve Bronşlar</h3>
        <p class="text-xs text-slate-700 leading-relaxed">
          İnsan göğüs kafesi yalnızca birkaç litrelik bir hacme sahiptir. Ancak kandaki karbondioksiti oksijenle değiştirmek için devasa bir yüzey alanı gerekir. Akciğer bronşları fraktal olarak 23 kez art arda ikiye bölünerek küçücük bir göğüs kafesinde tam bir tenis kortu büyüklüğünde ($70\text{ m}^2$) gaz değişim yüzeyi oluşturur!
        </p>
      </div>
      <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <h3 class="text-sm font-bold text-emerald-800">⚡ Şimşekler ve Nehir Havzaları</h3>
        <p class="text-xs text-slate-700 leading-relaxed">
          Bulutlardaki elektrik yükü toprağa boşalırken veya yüksek dağlardaki su damlaları denize akarken en az dirençli yolu ararlar. Ortaya çıkan şimşek çatallanmaları ile Amazon nehir yatağının haritası aynı fraktal ağaç geometrisini paylaşır.
        </p>
      </div>
      <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <h3 class="text-sm font-bold text-emerald-800">🌿 Barnsley Eğrelti Otu</h3>
        <p class="text-xs text-slate-700 leading-relaxed">
          Michael Barnsley tarafından matematiksel olarak modellenen bu bitkide, tek bir yaprakçık tüm dalın minyatür kopyasıdır. Dört basit afin dönüşüm matrisi kullanılarak bilgisayarda gerçeğinden farksız eğrelti otu yaprakları çizilebilir.
        </p>
      </div>
    </div>

    <h2>5. Fraktal Boyut (Fractal Dimension) Nedir?</h2>
    <p>
      Öklid geometrisinde nokta $0$ boyutlu, doğru $1$ boyutlu, düzlem $2$ boyutlu, küp ise $3$ boyutludur. Ancak fraktallar kesirli boyutlara (fractal dimension) sahiptir! Örneğin bir çizgi kağıt üzerinde o kadar çok kıvrılır ve boşluğu doldurur ki, artık $1$ boyutlu bir çizgi olmaktan çıkıp $2$ boyutlu bir alana yaklaşır.
    </p>
    <p>
      Hausdorff boyutu formülüyle hesaplandığında:
    </p>
    <div class="p-4 bg-slate-900 text-white font-mono text-sm rounded-2xl text-center shadow-inner">
      D = log(N) / log(1 / s)
    </div>
    <p>
      Koch kar tanesinin fraktal boyutu $D = \frac{\log 4}{\log 3} \approx 1.2618$'dir. Yani Koch eğrisi bir doğrudan fazlası, bir alandan ise azıdır! Sierpinski üçgeninin boyutu ise $D = \frac{\log 3}{\log 2} \approx 1.585$'tir.
    </p>

    <h2>6. Sınıfta ve Evde Uygulanabilecek Fraktal Etkinlikleri</h2>
    <ul>
      <li><strong>Kareli Kağıtta Sierpinski Üçgeni:</strong> Bir eşkenar üçgen çizin, kenarların orta noktalarını birleştirerek ortadaki üçgeni siyaha boyayın. Kalan 3 beyaz üçgende işlemi tekrarlayın.</li>
      <li><strong>Katlama ve Kesme ile Fraktal Pop-Up Kart:</strong> Bir A4 kağıdını ortadan ikiye katlayıp orta kısmından iki dik kesik atarak basamak oluşturun. Oluşan her basamağın köşesine aynı kesiği yarım ölçekle tekrar uygulayarak 3 boyutlu fraktal merdiven kartı üretin.</li>
      <li><strong>Doğa Avı (Fraktal Keşfi):</strong> Bahçeye çıkıp çam kozalakları, karnabahar tomurcukları, yaprak damarları ve salyangoz kabuklarındaki fraktal örüntüleri büyüteçle fotoğraflayın.</li>
    </ul>

    <div class="p-5 bg-emerald-50/80 rounded-2xl border border-emerald-200 mt-6 space-y-3">
      <h3 class="text-sm font-bold text-emerald-900">🔗 İlgili Geometri Kaynakları &amp; Platform İçi Okumalar</h3>
      <p class="text-xs text-slate-700">
        Matematiksel örüntüler ve somut geometri konularında sitemizdeki diğer zengin rehberleri inceleyin:
      </p>
      <ul class="text-xs space-y-1.5 list-disc list-inside text-emerald-700 font-medium">
        <li><a href="/post/meshur-matematik-problemi-tasinan-kanepe-problemi-cozuldu" class="underline hover:text-emerald-900">Taşınan Kanepe Problemi: Geometrik Şekiller ve Koridor Dönüş Sınırı</a></li>
        <li><a href="/post/pergel-kullanimi-ve-geometrik-insa-temel-cizim-becerileri-calisma-kagidi" class="underline hover:text-emerald-900">Pergel Kullanımı ve Geometrik İnşa Rehberi (A4 Çalışma Kağıdı)</a></li>
        <li><a href="/post/6-sinif-matematik-alan-ve-cember-hesaplama-interaktif-etkinligi" class="underline hover:text-emerald-900">6. Sınıf Alan ve Çember Hesaplama: Pi Sayısı ve Pizza Modeli</a></li>
        <li><a href="/post/biyotaklit-biyomimikri-nedir-dogadan-ilham-alan-muhendislik-ve-mimari-tasarimlar" class="underline hover:text-emerald-900">Biyotaklit (Biyomimikri) Nedir? Doğadan İlham Alan Mühendislik</a></li>
      </ul>
    </div>
  </div>
</div>
"""

# ---------------------------------------------------------------------------
# 2. KEÇİLERİN GÖZ BEBEKLERİ (3 Görsel, tam bilimsel metin)
# ---------------------------------------------------------------------------
content_keci = """
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-indigo-50/90 via-slate-50 to-emerald-50/80 rounded-3xl border border-indigo-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-emerald-600 text-white text-xs font-black tracking-wide uppercase">
        🌿 Evrimsel Biyoloji &amp; Optik Bilimi
      </span>
      <span class="text-xs font-semibold text-slate-500">
        TÜBİTAK Bilim Genç İncelemesi
      </span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-slate-900">
      Doğanın Panoramik Aynası: Keçilerin Göz Bebekleri Neden Yatay ve Dikdörtgen Şeklindedir?
    </h2>
    <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
      Bir keçinin gözlerine yakından baktığınızda, insanlardaki dairesel veya kedilerdeki dikey yarık göz bebeklerinden tamamen farklı bir optik geometriyle karşılaşırsınız: <strong>Yatay, dikdörtgen şeklinde bir açıklık</strong>. Kaliforniya Üniversitesi Berkeley ve Durham Üniversitesi araştırmacılarının bilgisayarlı optik simülasyonları, bu geometrinin avcı tehditlerine karşı geliştirilmiş kusursuz bir panoramik savunma sistemi olduğunu ortaya koymuştur.
    </p>
  </div>

  <figure class="my-6 not-prose">
    <img src="https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/keci.jpg?itok=SmehPuqB" alt="Keçilerin Dikdörtgen Göz Bebekleri" class="w-full rounded-3xl shadow-lg border border-slate-200 object-cover max-h-[500px]" />
    <figcaption class="text-xs text-center text-slate-500 mt-2 font-medium">
      Görsel 1: Keçilerin yatay dikdörtgen pupillası, zemindeki ve ufuktaki ışık dalgalarını panoramik olarak retinaya odaklar.
    </figcaption>
  </figure>

  <div class="prose prose-slate max-w-none space-y-6">
    <h2>1. 270 Derecelik Kesintisiz Panoramik Görüş Alanı</h2>
    <p>
      İnsan gözü başını hiç çevirmeden yaklaşık 180 derecelik bir görme açısına sahiptir ve bunun yalnızca merkezdeki 30-40 derecelik kısmı yüksek çözünürlüklü derinlik algısı sunar. Buna karşılık keçiler, koyunlar, atlar ve geyikler gibi otobur (av) memeliler, yatay göz bebekleri sayesinde <strong>başlarını hiçbir şekilde hareket ettirmeden 270 ila 320 derecelik</strong> bir alanı net bir şekilde görebilirler.
    </p>
    <p>
      Bu anatomik adaptasyon, arkalarından veya yan açıdan yaklaşan yırtıcı kurt, çakal ya da pars gibi tehlikeleri anında fark etmelerini sağlar. Yatay yarık şeklindeki açıklık, yatay düzlemdeki ışık miktarını maksimize ederken, gökyüzünden gelen ve retinayı kör edebilecek dik güneş ışınlarını doğal bir perde gibi süzer.
    </p>

  <figure class="my-6 not-prose">
    <img src="https://bilimgenc.tubitak.gov.tr/sites/default/files/inline-images/kecilerin_gozleri.jpg" alt="Keçilerin Göz Yapısı Yakından Görünüm" class="w-full rounded-3xl shadow-lg border border-slate-200 object-cover max-h-[450px]" />
    <figcaption class="text-xs text-center text-slate-500 mt-2 font-medium">
      Görsel 2: Dikdörtgen göz bebeğinin iris kasları tarafından yatay eksende genişletilip daraltılması.
    </figcaption>
  </figure>

    <h2>2. Sikloverjans (Cyclovergence) Mekanizması: Göz Yuvarlağının Bağımsız Dönüşü</h2>
    <p>
      Keçilerin göz yapısındaki en büyüleyici mühendislik harikası, başın pozisyonuna bağlı olarak göz bebeklerinin daima yer düzlemine (ufuk çizgisine) paralel kalmasıdır. Bir keçi sarp kayalıklarda otlarken başını 45 derece, 90 derece ya da tamamen aşağıya eğdiğinde, göz yuvarlağı göz çukurunun içinde <strong>50 dereceye varan açılarla bağımsız olarak döner (sikloverjans)</strong>.
    </p>
    <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
      <h3 class="text-base font-bold text-slate-900">💡 Neden Ufka Paralel Kalmak Zorundadır?</h3>
      <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
        Eğer göz bebeği başın eğimiyle birlikte dönseydi, dikdörtgen yarık dikey hale gelir ve yatay panoramik görüş sıfırlanırdı. Keçi ot yerken başı yerdeyken bile gözleri ufka paralel kaldığı için, ufuk çizgisinde beliren bir kurdu veya gökyüzündeki yırtıcı kartalı anında tespit edebilir. Bu yetenek, sarp dağ yamaçlarında dengelerini kaybetmeden kaçabilmelerinin anahtarıdır.
      </p>
    </div>

  <figure class="my-6 not-prose">
    <img src="https://bilimgenc.tubitak.gov.tr/sites/default/files/inline-images/kecilerin_goz_bebekleri_neden_dikd%C3%B6rtgen.jpg" alt="Keçilerin Ufuk Çizgisi ve Görüş Alanı Çizimi" class="w-full rounded-3xl shadow-lg border border-slate-200 object-cover max-h-[450px]" />
    <figcaption class="text-xs text-center text-slate-500 mt-2 font-medium">
      Görsel 3: Keçinin başı eğilse dahi göz bebeğinin yerçekimine göre yatay kalarak panoramik ufuk taramasını sürdürmesi.
    </figcaption>
  </figure>

    <h2>3. Avcı vs. Av: Doğadaki Göz Bebeği Şekillerinin Karşılaştırması</h2>
    <p>
      Evrimsel biyolojide canlıların göz bebeği morfolojisi, besin zincirindeki rollerine göre şekillenmiştir:
    </p>
    <div class="overflow-x-auto not-prose">
      <table class="w-full text-left border-collapse bg-white rounded-2xl shadow-sm border border-slate-200">
        <thead>
          <tr class="bg-slate-100 text-slate-800 text-xs font-bold uppercase">
            <th class="p-3 border-b">Göz Bebeği Biçimi</th>
            <th class="p-3 border-b">Örnek Canlılar</th>
            <th class="p-3 border-b">Ekolojik Rol</th>
            <th class="p-3 border-b">Optik Avantajı</th>
          </tr>
        </thead>
        <tbody class="text-xs sm:text-sm text-slate-700 divide-y divide-slate-100">
          <tr>
            <td class="p-3 font-semibold text-emerald-700">Yatay Dikdörtgen / Yarık</td>
            <td class="p-3">Keçi, koyun, at, geyik</td>
            <td class="p-3">Otobur (Av)</td>
            <td class="p-3">Geniş panoramik ufuk taraması, parlama önleme, kör noktasız çevre görüşü</td>
          </tr>
          <tr>
            <td class="p-3 font-semibold text-rose-700">Dikey Yarık (Vertical Slit)</td>
            <td class="p-3">Evcil kedi, tilki, çıngıraklı yılan</td>
            <td class="p-3">Pusu Kuran Avcı</td>
            <td class="p-3">Mükemmel derinlik algısı, stereoskopik odaklanma ve ani sıçrama mesafesi ölçümü</td>
          </tr>
          <tr>
            <td class="p-3 font-semibold text-indigo-700">Dairesel / Yuvarlak</td>
            <td class="p-3">İnsan, aslan, kurt, köpek</td>
            <td class="p-3">Aktif Takipçi Avcı</td>
            <td class="p-3">Her yönde dengeli ışık alımı, gündüz netliği ve uzun mesafe hedef takibi</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>4. Optik ve Işık Fiziği: Küresel Sapınç (Aberrasyon) Azaltma</h2>
    <p>
      Göz merceği optik bir lens olarak çalıştığında, kenarlardan geçen ışık ışınları merceğin merkezinden geçen ışınlarla aynı odak noktasında buluşamayabilir; bu duruma optikte <em>küresel sapınç (spherical aberration)</em> denir. Dikdörtgen yarık göz bebeği, dikey eksendeki ışık demetlerini daraltarak küresel sapıncı minimuma indirir. Böylece zemin ve ufuktaki nesneler, hayvanın retina tabakasında çok daha net ve keskin bir görüntü oluşturur.
    </p>

    <div class="p-5 bg-indigo-50/80 rounded-2xl border border-indigo-200 mt-6 space-y-3">
      <h3 class="text-sm font-bold text-indigo-900">🔗 İlgili Bilimsel Kaynaklar &amp; Platform İçi Okumalar</h3>
      <p class="text-xs text-slate-700">
        Optik fizik ilkeleri ve biyolojik sistemler hakkında daha fazla detay öğrenmek için aşağıdaki kaynakları inceleyebilirsiniz:
      </p>
      <ul class="text-xs space-y-1.5 list-disc list-inside text-indigo-700 font-medium">
        <li><a href="https://bilimgenc.tubitak.gov.tr" target="_blank" rel="noopener noreferrer" class="underline hover:text-indigo-900">TÜBİTAK Bilim Genç: Hayvanlar Âleminin Görme Sistemleri</a></li>
        <li><a href="https://www.nature.com" target="_blank" rel="noopener noreferrer" class="underline hover:text-indigo-900">Nature Research: Pupil Shape and Ecological Niche in Terrestrial Vertebrates</a></li>
        <li><a href="/post/disimiz-agrirken-beynimizde-neler-oluyor" class="underline hover:text-indigo-900">Sitemizden: Dişimiz Ağrırken Beynimizde Neler Oluyor? Sinir Sistemi İncelemesi</a></li>
        <li><a href="/post/11-sinif-fizik-3-unite-optik-cevaplari-meb" class="underline hover:text-indigo-900">Sitemizden: 11. Sınıf Fizik Optik ve Işık Kırılması Sayfa Çözümleri</a></li>
      </ul>
    </div>
  </div>
</div>
"""

# ---------------------------------------------------------------------------
# 3. BİYOTAKLİT (BİYOMİMİKRİ) (3 Görsel, tam metin)
# ---------------------------------------------------------------------------
content_biyotaklit = """
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-emerald-50/90 via-slate-50 to-teal-50/80 rounded-3xl border border-emerald-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-emerald-600 text-white text-xs font-black tracking-wide uppercase">
        🌱 Doğa &amp; İleri Mühendislik
      </span>
      <span class="text-xs font-semibold text-slate-500">
        TÜBİTAK Bilim Genç Dosyası
      </span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-slate-900">
      Doğanın 3.8 Milyar Yıllık Ar-Ge Arşivi: Biyotaklit (Biyomimikri) Teknolojiyi Nasıl Dönüştürüyor?
    </h2>
    <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
      Canlılar dünyası, 3.8 milyar yıllık evrim süreci boyunca aşırı soğuklar, su kıtlığı, aerodinamik sürtünme ve malzeme mukavemeti gibi tüm mühendislik problemlerini en az enerjiyle çözen olağanüstü tasarımlar geliştirmiştir. <strong>Biyotaklit (Biyomimikri)</strong>, doğanın bu kusursuz patentlerini inceleyerek insan yapımı teknolojilere uyarlayan modern bilim dalıdır.
    </p>
  </div>

  <figure class="my-6 not-prose">
    <img src="https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/biyotaklit.jpg?itok=bvy0T4gK" alt="Biyotaklit Doğadan Mühendisliğe" class="w-full rounded-3xl shadow-lg border border-slate-200 object-cover max-h-[500px]" />
    <figcaption class="text-xs text-center text-slate-500 mt-2 font-medium">
      Görsel 1: Yalıçapkını kuşunun aerodinamik gagasından ilham alan Şinkansen hızlı tren burun tasarımı.
    </figcaption>
  </figure>

  <div class="prose prose-slate max-w-none space-y-6">
    <h2>1. Şinkansen Hızlı Treni ve Yalıçapkını Gagası</h2>
    <p>
      1990'larda Japon mühendisler, saatte 300 km hızla giden Şinkansen hızlı trenlerinin dar tünellerden çıkarken oluşturduğu şiddetli patlama sesinden (tünel bomu) şikayetçiydi. Tren tünele girdiğinde önündeki havayı sıkıştırarak bir şok dalgası yaratıyor ve tünel çıkışında 400 metre ötedeki yerleşim yerlerinde camları titretiyordu.
    </p>
    <p>
      Başmühendis Eiji Nakatsu (aynı zamanda tutkulu bir kuş gözlemcisiydi), <strong>yalıçapkını (kingfisher)</strong> kuşunun havadan suya dalarken neredeyse tek bir damla bile sıçratmadığını fark etti. Kuşun gagasının hava-su direnç geçişini sıfırlayan konik geometrisi incelenerek trenin burnu bu şekilde uyarlandı. Sonuç: Tünel patlama sesi tamamen yok oldu, hava sürtünmesi %30 azaldı ve tren %10 daha az elektrik tüketmeye başladı!
    </p>

  <figure class="my-6 not-prose">
    <img src="https://bilimgenc.tubitak.gov.tr/sites/default/files/inline-images/c%C4%B1rtc%C4%B1rt.jpg" alt="Pıtrak Otu ve Cırt Cırt Bant Mekanizması" class="w-full rounded-3xl shadow-lg border border-slate-200 object-cover max-h-[450px]" />
    <figcaption class="text-xs text-center text-slate-500 mt-2 font-medium">
      Görsel 2: Pıtrak otu tohumlarının uçlarındaki mikroskobik elastik kancaların kumaş liflerine kenetlenme mekanizması.
    </figcaption>
  </figure>

    <h2>2. Pıtrak Otu ve Cırt Cırt Bant (Velcro) İcadı</h2>
    <p>
      1941 yılında İsviçreli mühendis George de Mestral, köpeğiyle Alplerde yaptığı doğa yürüyüşünden sonra köpeğinin tüylerine ve pantolonuna yapışan pıtrak otu tohumlarını mikroskop altında inceledi. Tohumların uçlarında binlerce minik elastik kanca (çengel) olduğunu gördü. Bu kancalar kumaşın halkamsı liflerine tutunuyordu.
    </p>
    <p>
      Mestral bu ilkeyi naylon şeritler üzerinde uygulayarak bir tarafı minik kancalardan, diğer tarafı minik ilmeklerden oluşan <strong>Velcro (Cırt Cırt)</strong> bandı icat etti. Günümüzde uzay yürüyüşü yapan astronot giysilerinden çocuk spor ayakkabılarına kadar milyarlarca üründe bu doğal kilit sistemi kullanılmaktadır.
    </p>

  <figure class="my-6 not-prose">
    <img src="https://bilimgenc.tubitak.gov.tr/sites/default/files/inline-images/balina-yuzgeci.jpg" alt="Kambur Balina Yüzgeci Tüberkülleri ve Türbin Kanatları" class="w-full rounded-3xl shadow-lg border border-slate-200 object-cover max-h-[450px]" />
    <figcaption class="text-xs text-center text-slate-500 mt-2 font-medium">
      Görsel 3: Kambur balinaların yüzgeçlerindeki tüberkül adı verilen yumrular, rüzgâr türbinlerinin kaldırma kuvvetini %32 artırır.
    </figcaption>
  </figure>

    <h2>3. Kambur Balina Yüzgeçleri ve Rüzgâr Türbini Kanatları</h2>
    <p>
      Kambur balinalar devasa cüsselerine (30 ton) rağmen suyun altında inanılmaz bir çeviklikle dar daireler çizebilirler. Harvard ve Duke Üniversitesi biyomekanik uzmanları, balinanın yüzgeçlerinin ön kenarında yer alan <strong>tüberkül (yumru)</strong> şeklindeki çıkıntıları incelediler.
    </p>
    <p>
      Geleneksel pürüzsüz kanatlar yerine ön kenarı tırtıklı/yumrulu kanat tasarımı, hava akımını girdaplara bölerek erken kanat kopmasını (stall) önler. Bu biyomimetik tasarım rüzgâr türbinlerine ve helikopter pervanelerine uyarlandığında, düşük rüzgâr hızlarında bile enerji verimini %32 artırmış ve çalışma gürültüsünü yarı yarıya azaltmıştır.
    </p>

    <h2>4. Lotus Yaprağı Etkisi ve Süperhidrofobik Nanoyapılar</h2>
    <p>
      Çamurlu bataklıklarda yetişen Lotus (Nilüfer) çiçeği yapraklarının daima tertemiz ve kuru kaldığı bilinir. Elektron mikroskobuyla incelendiğinde, yaprak yüzeyinde mikroskobik balmumu tepecikleri (nanoyapılar) olduğu keşfedilmiştir.
    </p>
    <p>
      Bu tepecikler su damlalarının yaprağa yayılmasını engeller; su damlası mükemmel bir küre oluşturarak yüzeyde yuvarlanır. Yuvarlanırken yaprak üzerindeki tüm toz ve kir taneciklerini de beraberinde süpürür. Bilim insanları bu <em>süperhidrofobik</em> yapıyı kopyalayarak leke tutmayan kumaşlar, kendini temizleyen bina boyaları ve yağmurda buğu yapmayan araba camları geliştirdiler.
    </p>

    <h2>5. Termit Yuvaları ve Doğal Klimalı Binalar</h2>
    <p>
      Zimbabve'nin başkenti Harare'de inşa edilen <em>Eastgate Centre</em> alışveriş ve ofis kompleksi, geleneksel hiçbir klima veya ısıtma sistemi kullanmaz. Mimar Mick Pearce, bu binayı Afrika'daki devasa termit yuvalarının havalandırma tünellerini taklit ederek tasarladı.
    </p>
    <p>
      Dışarıda sıcaklık 40°C ile gece 2°C arasında değişirken, termit yuvasının içindeki mantar tarlaları daima 30.5°C'de sabit kalır. Bina da tabandan aldığı serin gece havasını baca etkisiyle odalara dağıtıp gündüz ısınan havayı tavandaki bacalardan tahliye ederek benzer büyüklükteki binalara kıyasla %90 daha az enerji tüketmektedir.
    </p>

    <div class="p-5 bg-emerald-50/80 rounded-2xl border border-emerald-200 mt-6 space-y-3">
      <h3 class="text-sm font-bold text-emerald-900">🔗 İlgili Kaynaklar &amp; Platform İçi Okumalar</h3>
      <p class="text-xs text-slate-700">
        Biyomimikri ve doğa bilimleri alanındaki diğer yazılarımızı okuyun:
      </p>
      <ul class="text-xs space-y-1.5 list-disc list-inside text-emerald-700 font-medium">
        <li><a href="https://bilimgenc.tubitak.gov.tr" target="_blank" rel="noopener noreferrer" class="underline hover:text-emerald-900">TÜBİTAK Bilim Genç: Biyotaklit Tasarımları</a></li>
        <li><a href="https://biomimicry.org" target="_blank" rel="noopener noreferrer" class="underline hover:text-emerald-900">The Biomimicry Institute: Nature-inspired Innovation</a></li>
        <li><a href="/post/kecilerin-goz-bebekleri-neden-dikdortgen-seklindedir" class="underline hover:text-emerald-900">Sitemizden: Keçilerin Göz Bebekleri Neden Dikdörtgendir? Yatay Optik Fiziği</a></li>
        <li><a href="/post/meshur-matematik-problemi-tasinan-kanepe-problemi-cozuldu" class="underline hover:text-emerald-900">Sitemizden: Taşınan Kanepe Problemi ve Geometrik Optimizasyon</a></li>
      </ul>
    </div>
  </div>
</div>
"""

# ---------------------------------------------------------------------------
# 4. ALKALİ METAL TEPKİMESİ (3 Görsel, tam metin)
# ---------------------------------------------------------------------------
content_alkali = """
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-amber-50/90 via-slate-50 to-orange-50/80 rounded-3xl border border-amber-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-amber-600 text-white text-xs font-black tracking-wide uppercase">
        ⚗️ Kimyasal Tepkimeler &amp; İnorganik Kimya
      </span>
      <span class="text-xs font-semibold text-slate-500">
        TÜBİTAK Bilim Genç Deneyleri
      </span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-slate-900">
      1A Grubunun Patlayıcı Dansı: Alkali Metallerin Su ile Şiddetli Tepkime Mekanizması
    </h2>
    <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
      Periyodik tablonun en sol sütununda yer alan <strong>1A grubu alkali metalleri (Lityum, Sodyum, Potasyum, Rubidyum, Sezyum)</strong> kimya dünyasının en reaktif elementleridir. Bir parça saf sodyum veya potasyum metali suya bırakıldığında, anında eriyerek küre haline gelir, suyun üzerinde hızla kayar, parlak alevler saçar ve şiddetli bir patlamayla hidrojen gazı açığa çıkarır.
    </p>
  </div>

  <figure class="my-6 not-prose">
    <img src="https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/periyodik_tablo_2.jpg?itok=eXCQnaXc" alt="Alkali Metal ve Periyodik Tablo" class="w-full rounded-3xl shadow-lg border border-slate-200 object-cover max-h-[500px]" />
    <figcaption class="text-xs text-center text-slate-500 mt-2 font-medium">
      Görsel 1: Periyodik tablonun 1A grubunda yukarıdan aşağıya inildikçe metalik aktiflik ve suyla tepkime şiddeti katlanır.
    </figcaption>
  </figure>

  <div class="prose prose-slate max-w-none space-y-6">
    <h2>1. Kimyasal Reaksiyon Denklemi ve Termodinamik</h2>
    <p>
      Tüm alkali metaller ($M$), su ile temas ettiklerinde metal hidroksit (kuvvetli baz) ve serbest hidrojen gazı ($H_2$) oluştururlar. Bu tepkime aşırı derecede ekzotermiktir (yüksek ısı açığa çıkarır):
    </p>
    <div class="p-4 bg-slate-900 text-white font-mono text-sm rounded-2xl text-center shadow-inner">
      2 M(k) + 2 H₂O(s) ➔ 2 MOH(suda) + H₂(g) + Isı (ΔH &lt; 0)
    </div>
    <p>
      Açığa çıkan devasa ısı enerjisi, ortamdaki hidrojen gazının havayla (oksijenle) temas ettiği anda kendiliğinden tutuşmasına yol açar:
    </p>
    <div class="p-4 bg-slate-900 text-white font-mono text-sm rounded-2xl text-center shadow-inner">
      2 H₂(g) + O₂(g) ➔ 2 H₂O(g) + Yüksek Isı &amp; Işık
    </div>

  <figure class="my-6 not-prose">
    <img src="https://bilimgenc.tubitak.gov.tr/sites/default/files/inline-images/Periyodik%20Tablo.jpg" alt="Periyodik Tablo 1A Grubu Elementleri" class="w-full rounded-3xl shadow-lg border border-slate-200 object-cover max-h-[450px]" />
    <figcaption class="text-xs text-center text-slate-500 mt-2 font-medium">
      Görsel 2: Lityum (Li), Sodyum (Na), Potasyum (K), Rubidyum (Rb) ve Sezyum (Cs) elementlerinin elektron dizilimleri.
    </figcaption>
  </figure>

    <h2>2. Grupta Aşağı İnildikçe Neden Reaksiyon Şiddetlenir?</h2>
    <p>
      Alkali metallerin en dış katmanında yalnızca <strong>1 adet değerlik elektronu</strong> bulunur. Kararlı oktet yapısına ulaşmak için bu tek elektronu vermek isterler.
    </p>
    <div class="overflow-x-auto not-prose">
      <table class="w-full text-left border-collapse bg-white rounded-2xl shadow-sm border border-slate-200">
        <thead>
          <tr class="bg-slate-100 text-slate-800 text-xs font-bold uppercase">
            <th class="p-3 border-b">Element</th>
            <th class="p-3 border-b">Atom Numarası</th>
            <th class="p-3 border-b">1. İyonlaşma Enerjisi</th>
            <th class="p-3 border-b">Su ile Tepkime Karakteri</th>
          </tr>
        </thead>
        <tbody class="text-xs sm:text-sm text-slate-700 divide-y divide-slate-100">
          <tr>
            <td class="p-3 font-semibold text-slate-800">Lityum (Li)</td>
            <td class="p-3">3</td>
            <td class="p-3">520 kJ/mol</td>
            <td class="p-3">Hızlı köpürme, su üstünde hareket, alevsiz gaz çıkışı</td>
          </tr>
          <tr>
            <td class="p-3 font-semibold text-amber-700">Sodyum (Na)</td>
            <td class="p-3">11</td>
            <td class="p-3">496 kJ/mol</td>
            <td class="p-3">Küreleşerek erir, sarı/turuncu alevle yanar, hafif patlama</td>
          </tr>
          <tr>
            <td class="p-3 font-semibold text-purple-700">Potasyum (K)</td>
            <td class="p-3">19</td>
            <td class="p-3">419 kJ/mol</td>
            <td class="p-3">Anında leylak/mor alev, çok şiddetli hidrojen patlaması</td>
          </tr>
          <tr>
            <td class="p-3 font-semibold text-rose-700">Rubidyum (Rb)</td>
            <td class="p-3">37</td>
            <td class="p-3">403 kJ/mol</td>
            <td class="p-3">Cam kabı parçalayan ani patlama ve alev dalgası</td>
          </tr>
          <tr>
            <td class="p-3 font-semibold text-red-800">Sezyum (Cs)</td>
            <td class="p-3">55</td>
            <td class="p-3">376 kJ/mol</td>
            <td class="p-3">Saliseler içinde su tankını havaya uçuran patlama</td>
          </tr>
        </tbody>
      </table>
    </div>

  <figure class="my-6 not-prose">
    <img src="https://bilimgenc.tubitak.gov.tr/sites/default/files/inline-images/rubidium_periyodik_table.jpg" alt="Rubidyum ve Ağır Alkali Metaller" class="w-full rounded-3xl shadow-lg border border-slate-200 object-cover max-h-[450px]" />
    <figcaption class="text-xs text-center text-slate-500 mt-2 font-medium">
      Görsel 3: Rubidyum ve Sezyum gibi ağır alkali metaller hava ve suyla temas ettiklerinde patlayıcı reaksiyon verir.
    </figcaption>
  </figure>

    <h2>3. Coulomb Patlaması Hipotezi: Patlamanın Gerçek Nedeni</h2>
    <p>
      Uzun yıllar boyunca bu patlamaların sadece hidrojen gazının yanmasından kaynaklandığı sanılıyordu. Ancak 2015 yılında Nature Chemistry'de yayımlanan ultra yüksek hızlı kamera kayıtları (saniyede 10.000 kare), reaksiyonun başında bir <strong>Coulomb Patlaması (Coulomb Explosion)</strong> gerçekleştiğini kanıtladı.
    </p>
    <p>
      Alkali metal suya değdiği anda elektronlarını piko-saniyeler içinde suya aktarır. Elektronlarını kaybeden metal parçası aniden devasa miktarda pozitif (+) yükle yüklenir. Aynı yükler birbirini şiddetle ittiği için, metal parçası mikroskobik sivri iğneler şeklinde dışarıya doğru parçalanır ve yüzey alanı milyonlarca kat artarak tepkimeyi kontrol edilemez bir patlamaya dönüştürür!
    </p>

    <h2>4. Fenolftalein Belirteci ile Baz Oluşumunun Kanıtlanması</h2>
    <p>
      Deney ortamındaki suya birkaç damla fenolftalein indikatörü damlatıldığında, berrak olan su reaksiyon ilerledikçe koyu pembe/mor renge bürünür. Bu renk değişimi, ortamda güçlü bir baz olan sodyum hidroksitin ($NaOH$) oluştuğunu ve $pH$'ın 12-14 seviyelerine tırmandığını somut olarak gösterir.
    </p>

    <div class="p-5 bg-amber-50/80 rounded-2xl border border-amber-200 mt-6 space-y-3">
      <h3 class="text-sm font-bold text-amber-900">🔗 İlgili Kimya Kaynakları &amp; Platform İçi Okumalar</h3>
      <p class="text-xs text-slate-700">
        Kimyasal tepkimeler ve periyodik sistem konuları hakkında faydalı bağlantılar:
      </p>
      <ul class="text-xs space-y-1.5 list-disc list-inside text-amber-700 font-medium">
        <li><a href="https://bilimgenc.tubitak.gov.tr" target="_blank" rel="noopener noreferrer" class="underline hover:text-amber-900">TÜBİTAK Bilim Genç: Alkali Metallerin Su Deneyleri</a></li>
        <li><a href="https://www.rsc.org" target="_blank" rel="noopener noreferrer" class="underline hover:text-amber-900">Royal Society of Chemistry: Alkali Metals Group 1 Trends</a></li>
        <li><a href="/post/suyu-fokurdatan-ilac-efervesan" class="underline hover:text-amber-900">Sitemizden: Suyu Fokurdatan Efervesan Tablet Deneyi: Asit-Baz Tepkimesi</a></li>
        <li><a href="/post/11-sinif-fizik-1-unite-kuvvet-ve-hareket-cevaplari-meb" class="underline hover:text-amber-900">Sitemizden: 11. Sınıf Fizik İtme, Çizgisel Momentum ve Enerji Korunumu</a></li>
      </ul>
    </div>
  </div>
</div>
"""

# ---------------------------------------------------------------------------
# 5. GÜNEŞ FIRINI YAPALIM (2 Görsel, tam metin)
# ---------------------------------------------------------------------------
content_gunes_firini = """
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-amber-50/90 via-slate-50 to-yellow-50/80 rounded-3xl border border-amber-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-amber-600 text-white text-xs font-black tracking-wide uppercase">
        ☀️ Yenilenebilir Enerji &amp; STEM Tasarımı
      </span>
      <span class="text-xs font-semibold text-slate-500">
        TÜBİTAK Bilim Genç Tasarla ve Yap
      </span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-slate-900">
      Güneş Işığını Fırına Dönüştürmek: Karton Kutu ve Alüminyum Folyo ile Güneş Fırını Yapımı
    </h2>
    <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
      Güneş'ten Dünya'ya saniyede trilyonlarca joule elektromanyetik ışınım ulaşır. Bu tükenmez ve temiz enerji kaynağını kullanarak hiçbir elektrik, gaz veya odun harcamadan su kaynatmak, yemek pişirmek veya çikolata eritmek mümkündür. <strong>Güneş Fırını (Solar Oven)</strong> projesi, termodinamik yasalarını somut bir tasarımda birleştiren en popüler STEM etkinliklerinden biridir.
    </p>
  </div>

  <figure class="my-6 not-prose">
    <img src="https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/g%C3%BCne%C5%9F%20f%C4%B1r%C4%B1n%C4%B1_0.jpg?itok=pmvHwVnA" alt="Güneş Fırını STEM Projesi" class="w-full rounded-3xl shadow-lg border border-slate-200 object-cover max-h-[500px]" />
    <figcaption class="text-xs text-center text-slate-500 mt-2 font-medium">
      Görsel 1: Yansıtıcı kanatlar ve siyah tabanlı ısı tutucu hazne ile tasarlanan güneş fırını prototipi.
    </figcaption>
  </figure>

  <div class="prose prose-slate max-w-none space-y-6">
    <h2>1. Güneş Fırınının Çalışma Prensipleri: 3 Temel Termodinamik Kural</h2>
    <p>
      Başarılı bir güneş fırını tasarımı, üç temel fiziksel ilkenin kusursuz senkronizasyonuna dayanır:
    </p>
    <ul>
      <li><strong>1. Yansıtma (Konsantrasyon):</strong> Güneş ışınları alüminyum folyo veya ayna gibi yansıtıcı yüzeylerle tek bir odak noktasına (fırın haznesine) yönlendirilir. Yansıtıcı yüzey alanı ne kadar büyükse, toplanan foton miktarı o kadar artar.</li>
      <li><strong>2. Soğurma (Absorpsiyon):</strong> Fırının tabanı ve tencere mat siyaha boyanır. Koyu renkler görünür ışıktaki tüm dalga boylarını soğurarak foton enerjisini termal titreşim enerjisine (ısıya) dönüştürür.</li>
      <li><strong>3. Isı Yalıtımı ve Sera Etkisi:</strong> Fırının üstü şeffaf cam veya streç film ile kapatılır. Görünür ışık şeffaf örtüyü kolayca geçerek içeri girer; ancak sıcak cisimlerin yaydığı uzun dalga boylu kızılötesi (infrared) ışınlar bu engeli aşamaz ve içeride hapsolur. Fırın içi sıcaklık 120°C - 150°C seviyelerine kadar çıkabilir.</li>
    </ul>

  <figure class="my-6 not-prose">
    <img src="https://bilimgenc.tubitak.gov.tr/sites/default/files/inline-images/nelere%20ihtiyac%C4%B1m%C4%B1z%20var.png" alt="Güneş Fırını İçin Gerekli Malzemeler" class="w-full rounded-3xl shadow-lg border border-slate-200 object-cover max-h-[450px]" />
    <figcaption class="text-xs text-center text-slate-500 mt-2 font-medium">
      Görsel 2: Güneş fırını inşasında kullanılan karton kutu, folyo, asetat, bant ve yalıtım malzemeleri.
    </figcaption>
  </figure>

    <h2>2. Adım Adım Güneş Fırını Yapım Aşamaları</h2>
    <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
      <h3 class="text-base font-bold text-slate-900">Gerekli Malzemeler:</h3>
      <ul class="text-xs sm:text-sm text-slate-700 list-disc list-inside space-y-1">
        <li>1 adet pizza kutusu veya birbirinin içine geçebilen iki adet karton koli</li>
        <li>Alüminyum folyo ve yapıştırıcı bant</li>
        <li>Isı yalıtımı için buruşturulmuş gazete kağıtları veya strafor köpük</li>
        <li>Mat siyah karton veya sprey boya</li>
        <li>Şeffaf asetat kağıdı, streç film veya cam plaka</li>
        <li>Kapağı açık tutmak için tahta çubuk veya cetvel</li>
      </ul>
      <h3 class="text-base font-bold text-slate-900 pt-2">Montaj Basamakları:</h3>
      <ol class="text-xs sm:text-sm text-slate-700 list-decimal list-inside space-y-1.5">
        <li>Kutunun kapağının üç kenarından 3 cm pay bırakarak bir pencere kapağı kesin ve yukarı doğru kıvırın.</li>
        <li>Kestiğiniz kapağın iç yüzeyini pürüzsüzce alüminyum folyo ile kaplayın (bu sizin reflektörünüz olacaktır).</li>
        <li>Kapağın altındaki boşluğu şeffaf streç film veya asetat ile hava sızdırmayacak şekilde çift kat kaplayın (sera etkisi haznesi).</li>
        <li>Kutunun tabanına siyah karton yerleştirin ve kutu kenarlarını buruşuk gazetelerle izole edin.</li>
        <li>Fırını güneş ışınlarının dik geldiği açık bir alana koyun, kapağın açısını ışığı içeri yansıtacak şekilde tahta çubukla sabitleyin.</li>
      </ol>
    </div>

    <h2>3. Performans Testi ve Sıcaklık Ölçümleri</h2>
    <p>
      Fırınınızın içine bir adet fırın termometresi ve küçük bir metal tabakta marshmallow veya rendelenmiş kaşar peyniri yerleştirin. Güneşli bir günde 20-30 dakika içinde kutu içindeki sıcaklığın 80°C'yi aştığını ve peynirin tamamen eridiğini görebilirsiniz.
    </p>

    <div class="p-5 bg-amber-50/80 rounded-2xl border border-amber-200 mt-6 space-y-3">
      <h3 class="text-sm font-bold text-amber-900">🔗 İlgili STEM Kaynakları &amp; Platform İçi Okumalar</h3>
      <p class="text-xs text-slate-700">
        Yenilenebilir enerji ve termal fizik alanındaki diğer projelerimiz:
      </p>
      <ul class="text-xs space-y-1.5 list-disc list-inside text-amber-700 font-medium">
        <li><a href="https://bilimgenc.tubitak.gov.tr" target="_blank" rel="noopener noreferrer" class="underline hover:text-amber-900">TÜBİTAK Bilim Genç: Güneş Fırını Tasarımı</a></li>
        <li><a href="/post/ruzgar-turbini-nasil-yapilir" class="underline hover:text-amber-900">Sitemizden: Rüzgâr Türbini Nasıl Yapılır? Kinetik Enerjiden Elektriğe Dönüşüm</a></li>
        <li><a href="/post/11-sinif-fizik-3-unite-optik-cevaplari-meb" class="underline hover:text-amber-900">Sitemizden: 11. Sınıf Fizik Optik, Işık Yansıması ve Aynalar</a></li>
      </ul>
    </div>
  </div>
</div>
"""

# ---------------------------------------------------------------------------
# 6. RÜZGÂR TÜRBİNİ NASIL YAPILIR (2 Görsel, tam metin)
# ---------------------------------------------------------------------------
content_ruzgar = """
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-cyan-50/90 via-slate-50 to-blue-50/80 rounded-3xl border border-cyan-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-cyan-600 text-white text-xs font-black tracking-wide uppercase">
        💨 Temiz Enerji &amp; Elektromekanik
      </span>
      <span class="text-xs font-semibold text-slate-500">
        TÜBİTAK Bilim Genç Tasarla ve Yap
      </span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-slate-900">
      Havanın Gücünden Elektrik Üretmek: Minyatür Rüzgâr Türbini Tasarımı ve Jeneratör Fiziği
    </h2>
    <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
      Rüzgâr, Güneş'in Dünya atmosferini farklı bölgelerde eşit olmayan biçimde ısıtması sonucu oluşan devasa bir akışkan hareketidir. Bu hareket enerjisini (kinetik enerji) elektriğe dönüştürmek, küresel ısınmayla mücadelenin en kritik sütunudur. Kendi rüzgâr türbininizi yaparak bir LED diyotu yakabilir ve aerodinamik kaldırma kuvveti ile Faraday elektromanyetik indüksiyon kanununu uygulamalı olarak görebilirsiniz.
    </p>
  </div>

  <figure class="my-6 not-prose">
    <img src="https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/ETK%C4%B0NL%C4%B0K%20G%C3%96RSEL%202_0.jpg?itok=YZEqfWqE" alt="Rüzgar Türbini STEM Projesi" class="w-full rounded-3xl shadow-lg border border-slate-200 object-cover max-h-[500px]" />
    <figcaption class="text-xs text-center text-slate-500 mt-2 font-medium">
      Görsel 1: Aerodinamik kanat profili ve DC jeneratör miline bağlı rüzgâr türbini test prototipi.
    </figcaption>
  </figure>

  <div class="prose prose-slate max-w-none space-y-6">
    <h2>1. Kinetik Enerjiden Elektriğe: Enerji Dönüşüm Formülü</h2>
    <p>
      Rüzgârın taşıdığı güç, rüzgâr hızının küpüyle ($v^3$) doğru orantılıdır:
    </p>
    <div class="p-4 bg-slate-900 text-white font-mono text-sm rounded-2xl text-center shadow-inner">
      P = ½ · ρ · A · v³ · Cp
    </div>
    <p>
      Burada $\rho$ havanın yoğunluğunu, $A$ kanatların süpürdüğü daire alanını ($\pi r^2$), $v$ rüzgâr hızını ve $C_p$ türbinin güç katsayısını temsil eder. <strong>Betz Yasası'na</strong> göre, bir rüzgâr türbininin havadan çekebileceği maksimum teorik enerji verimi <strong>%59.3'tür (Betz Limiti)</strong>.
    </p>

  <figure class="my-6 not-prose">
    <img src="https://bilimgenc.tubitak.gov.tr/sites/default/files/inline-images/G%C3%96RSEL%200%20NELERE%20%C4%B0HT%C4%B0YACIMIZ%20VAR.jpg" alt="Rüzgar Türbini İçin Gerekli Malzemeler" class="w-full rounded-3xl shadow-lg border border-slate-200 object-cover max-h-[450px]" />
    <figcaption class="text-xs text-center text-slate-500 mt-2 font-medium">
      Görsel 2: Rüzgâr türbini montajında kullanılan DC motor, LED, kanat malzemeleri ve taşıyıcı kule gövdesi.
    </figcaption>
  </figure>

    <h2>2. Aerodinamik Kanat Fiziği: Sürükleme (Drag) vs. Kaldırma (Lift)</h2>
    <p>
      Eski yel değirmenleri rüzgârın doğrudan kanada çarpıp itmesiyle (sürükleme kuvveti) çalışırken, modern türbinler uçak kanatlarına benzeyen kavisli <em>aerofoil</em> profiller kullanırlar.
    </p>
    <p>
      Hava kanadın üst yüzeyinden geçerken daha uzun yol kat eder ve hızı artar; <strong>Bernoulli İlkesi</strong> gereği üst yüzeydeki basınç düşer. Kanadın altındaki yüksek basınç ile üstündeki alçak basınç farkı bir <strong>kaldırma kuvveti (lift force)</strong> doğurur. Bu kuvvet türbin milini rüzgâr hızından çok daha süratli döndürür.
    </p>

    <h2>3. Adım Adım Rüzgâr Türbini Yapımı</h2>
    <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
      <h3 class="text-base font-bold text-slate-900">Malzeme Listesi:</h3>
      <ul class="text-xs sm:text-sm text-slate-700 list-disc list-inside space-y-1">
        <li>1 adet küçük DC motor (3V - 12V aralığında, oyuncak arabalardan veya yazıcılardan temin edilebilir)</li>
        <li>1 adet 5 mm parlak LED diyot</li>
        <li>Kanatlar için PVC boru parçası, plastik şişe veya sert mukavva</li>
        <li>Motoru monte etmek için kule gövdesi (ahşap çıta veya plastik boru)</li>
        <li>Kablo, sıcak silikon tabancası ve multimetre</li>
      </ul>
      <h3 class="text-base font-bold text-slate-900 pt-2">Yapım Basamakları:</h3>
      <ol class="text-xs sm:text-sm text-slate-700 list-decimal list-inside space-y-1.5">
        <li>Plastik bir şişeden eşit boyutlarda 3 adet hafif kavisli kanat kesin. Üç kanatlı tasarım hem dinamik dengeyi sağlar hem de titreşimi minimize eder.</li>
        <li>Kanatları motor miline bağlanacak dairesel bir göbeğe 120 derecelik açılarla ve yaklaşık 15-20 derecelik hücum açısıyla (açılı) silikonlayın.</li>
        <li>DC motorun (+) ve (-) çıkış kutuplarına LED diyotun bacaklarını lehimleyin veya sıkıca bağlayın.</li>
        <li>Türbin düzeneğini sağlam bir taban üzerine sabitleyin ve saç kurutma makinesiyle rüzgâr uygulayın.</li>
        <li>Pervane hızla dönmeye başladığında motorun içindeki bakır bobinler sabit mıknatısların manyetik alanını keserek elektrik üretir ve LED ışıl ışıl yanar!</li>
      </ol>
    </div>

    <div class="p-5 bg-cyan-50/80 rounded-2xl border border-cyan-200 mt-6 space-y-3">
      <h3 class="text-sm font-bold text-cyan-900">🔗 İlgili Kaynaklar &amp; Platform İçi Okumalar</h3>
      <p class="text-xs text-slate-700">
        Mühendislik ve elektrik projeleri hakkında ilginizi çekebilecek bağlantılar:
      </p>
      <ul class="text-xs space-y-1.5 list-disc list-inside text-cyan-700 font-medium">
        <li><a href="https://bilimgenc.tubitak.gov.tr" target="_blank" rel="noopener noreferrer" class="underline hover:text-cyan-900">TÜBİTAK Bilim Genç: Rüzgâr Türbini Yapım Rehberi</a></li>
        <li><a href="/post/edison-ve-teslanin-alternatif-akim-ve-dogru-akim-karsilastirmasi" class="underline hover:text-cyan-900">Sitemizden: Edison ve Tesla Karşılaştırması: AC Alternatif Akım Jeneratörleri</a></li>
        <li><a href="/post/gunes-firini-yapalim" class="underline hover:text-cyan-900">Sitemizden: Evde Güneş Fırını Yapımı ve Temiz Enerji Dönüşümü</a></li>
      </ul>
    </div>
  </div>
</div>
"""

# ---------------------------------------------------------------------------
# 7. BİRDEN FAZLA DİL KONUŞMAK VE HAFIZA (2 Görsel, tam metin)
# ---------------------------------------------------------------------------
content_dil = """
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-indigo-50/90 via-slate-50 to-purple-50/80 rounded-3xl border border-indigo-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-purple-600 text-white text-xs font-black tracking-wide uppercase">
        🧠 Nörobilim &amp; Bilişsel Psikoloji
      </span>
      <span class="text-xs font-semibold text-slate-500">
        TÜBİTAK Bilim Genç Beyin Araştırmaları
      </span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-slate-900">
      Çok Dilliliğin Nöroplastisite Gücü: İki Dil Konuşmak Beynimizi Nasıl Yeniden Yapılandırır?
    </h2>
    <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
      Birden fazla dil konuşmak sadece yabancı ülkelerde iletişim kurmanızı sağlamaz; beyninizin sinirsel ağlarını (nöral bağlantılarını) baştan aşağı güçlendirir. Edinburgh ve Toronto Üniversiteleri tarafından yürütülen kapsamlı fMRI çalışmaları, çok dilli bireylerin beyninde <strong>yürütücü işlevlerin (executive functions)</strong> belirgin biçimde daha kuvvetli olduğunu ve demans semptomlarının ortalama <strong>4 ila 5 yıl geciktiğini</strong> kanıtlamıştır.
    </p>
  </div>

  <figure class="my-6 not-prose">
    <img src="https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/birden-fazla-dil-konusmak.jpg?itok=pP0AmAwe" alt="Çok Dillilik ve Beyin Gelişimi" class="w-full rounded-3xl shadow-lg border border-slate-200 object-cover max-h-[500px]" />
    <figcaption class="text-xs text-center text-slate-500 mt-2 font-medium">
      Görsel 1: İki dilli beyinde sol inferior parietal korteks ve dorsolateral prefrontal alanlarda sinirsel aktivite artışı gözlemlenir.
    </figcaption>
  </figure>

  <div class="prose prose-slate max-w-none space-y-6">
    <h2>1. Beynin Dil Seçim Mekanizması ve İnhibitör Kontrol</h2>
    <p>
      İki veya daha fazla dil bilen bir kişi konuştuğunda, beynindeki dillerden biri tamamen kapanmaz; aksine <em>her iki dil sistemi de arka planda sürekli olarak aktiftir</em>. Örneğin Türkçe ve İngilizce bilen biri "elma" kelimesini düşündüğünde, beyninde hem "elma" hem de "apple" sözcük temsilleri aynı anda tetiklenir.
    </p>
    <p>
      Konuşmacının o an Türkçe konuşması gerekiyorsa, beynin <strong>prefrontal korteksinde</strong> yer alan inhibitör kontrol (baskılama) devresi devreye girerek "apple" kelimesini baskılar ve doğru kelimeyi ön plana çıkarır. Bu zihinsel süreç, gün boyu durmaksızın devam eden bir zihinsel jimnastiktir. Sonuç olarak çok dilli bireyler, günlük hayatta dikkat dağıtıcı unsurları filtreleme ve odaklanma konusunda tek dilli bireylere kıyasla üstün bir performans sergilerler.
    </p>

  <figure class="my-6 not-prose">
    <img src="https://bilimgenc.tubitak.gov.tr/sites/default/files/inline-images/cok-dillilik.jpg" alt="Çok Dillilik ve Bilişsel Esneklik Şeması" class="w-full rounded-3xl shadow-lg border border-slate-200 object-cover max-h-[450px]" />
    <figcaption class="text-xs text-center text-slate-500 mt-2 font-medium">
      Görsel 2: Dil sistemleri arasında geçiş yaparken beynin ön lobunda aktive olan yönetici işlevler ağı.
    </figcaption>
  </figure>

    <h2>2. Bilişsel Rezerv (Cognitive Reserve) ve Demansın Geciktirilmesi</h2>
    <p>
      Nörolojik yaşlanma sürecinde beyin dokusunda doğal olarak hücresel kayıplar meydana gelir. Ancak <em>bilişsel rezerv</em> kavramı, beynin alternatif sinir yolları kurarak bu hasarları kompanse edebilme kapasitesini ifade eder.
    </p>
    <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
      <h3 class="text-base font-bold text-slate-900">🔬 Dr. Ellen Bialystok'un Çığır Açan Araştırması</h3>
      <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
        Toronto York Üniversitesi'nden Dr. Ellen Bialystok ve ekibinin yüzlerce Alzheimer hastası üzerinde yaptığı araştırmalarda, yaşamı boyunca iki dil konuşan bireylerin, tek dilli bireylerle aynı derecede beyin patolojisine (amiloid plak birikimine) sahip olmalarına rağmen, <strong>hastalığın hafıza kaybı ve klinik semptomlarını 4-5 yıl daha geç gösterdikleri</strong> belirlenmiştir. Bu koruyucu etki, piyasadaki hiçbir farmakolojik ilacın sağlayamadığı devasa bir kazanımdır.
    </div>

    <h2>3. Beynin Beyaz ve Gri Cevher Yapısındaki Fiziksel Değişimler</h2>
    <p>
      İleri düzey nörogörüntüleme teknikleri (DTI ve voksel tabanlı morfometri), birden fazla dil öğrenen yetişkinlerde dahi beynin fiziksel mimarisinin değiştiğini göstermektedir:
    </p>
    <ul>
      <li><strong>Gri Cevher Yoğunluğu:</strong> Dil öğrenimi, sol inferior parietal lobdaki nöron gövdelerinin ve sinaps yoğunluğunun artmasını sağlar.</li>
      <li><strong>Beyaz Cevher Bütünlüğü:</strong> Beynin iki yarımküresini birbirine bağlayan <em>korpus kallozum (corpus callosum)</em> ve dil merkezlerini bağlayan <em>arkuat fasikülüs</em> lif demetlerinde miyelin kılıf kalınlaşır; bu da sinyal iletim hızını artırır.</li>
      <li><strong>Görev Değiştirme (Task-Switching) Esnekliği:</strong> Bir problem çözerken farklı stratejiler arasında geçiş yapabilme becerisi üst düzeye tırmanır.</li>
    </ul>

    <h2>4. Yabancı Dil Öğrenimi İçin Yaş Sınırı Var mıdır?</h2>
    <p>
      Halk arasında yaygın bir inanış, dil öğreniminin yalnızca çocukluk çağında etkili olduğudur. Çocuklar aksan ve fonetik taklit konusunda biyolojik avantaja sahip olsalar da, yetişkinlerin analitik kavrama ve gramer bağlamı kurma becerileri çok daha gelişmiştir. 40, 50 hatta 60 yaşında yeni bir yabancı dil öğrenmeye başlamak bile beyinde yeni sinapsların filizlenmesini tetikleyerek bilişsel zindeliği korur.
    </p>

    <div class="p-5 bg-purple-50/80 rounded-2xl border border-purple-200 mt-6 space-y-3">
      <h3 class="text-sm font-bold text-purple-900">🔗 İlgili Bilimsel Kaynaklar &amp; Platform İçi Okumalar</h3>
      <p class="text-xs text-slate-700">
        Nöroplastisite ve beyin fonksiyonları ile ilgili bilimsel makalelerimizi keşfedin:
      </p>
      <ul class="text-xs space-y-1.5 list-disc list-inside text-purple-700 font-medium">
        <li><a href="https://bilimgenc.tubitak.gov.tr" target="_blank" rel="noopener noreferrer" class="underline hover:text-purple-900">TÜBİTAK Bilim Genç: Çok Dillilik ve Beyin Mekanizmaları</a></li>
        <li><a href="https://pubmed.ncbi.nlm.nih.gov" target="_blank" rel="noopener noreferrer" class="underline hover:text-purple-900">PubMed: Bilingualism as a neuroprotective factor in cognitive aging</a></li>
        <li><a href="/post/kahve-neden-hepimizi-ayni-sekilde-etkilemiyor" class="underline hover:text-purple-900">Sitemizden: Kahve Neden Hepimizi Aynı Şekilde Etkilemiyor? Adenozin ve Genetik Farklar</a></li>
        <li><a href="/post/disimiz-agrirken-beynimizde-neler-oluyor" class="underline hover:text-purple-900">Sitemizden: Dişimiz Ağrırken Beynimizde Neler Oluyor? Trigeminal Sinir Analizi</a></li>
      </ul>
    </div>
  </div>
</div>
"""

# Map to DB
updates = [
    ('fraktal-agaci-ve-dogadaki-geometri-oruntu-ve-fraktal-calismasi', content_fraktal, 'https://eglenmatik.com/uploads/articles/articles-3bdb8cde-3b30-4690-97d6-3530dc5f7e66.jpg', 'Matematik Blog', 'matematik-blog'),
    ('kecilerin-goz-bebekleri-neden-dikdortgen-seklindedir', content_keci, 'https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/keci.jpg?itok=SmehPuqB', 'Blog', 'blog'),
    ('biyotaklit-biyomimikri-nedir-dogadan-ilham-alan-muhendislik-ve-mimari-tasarimlar', content_biyotaklit, 'https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/biyotaklit.jpg?itok=bvy0T4gK', 'Blog', 'blog'),
    ('alkali-metal-tepkime-deneyi', content_alkali, 'https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/periyodik_tablo_2.jpg?itok=eXCQnaXc', 'Blog', 'blog'),
    ('gunes-firini-yapalim', content_gunes_firini, 'https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/g%C3%BCne%C5%9F%20f%C4%B1r%C4%B1n%C4%B1_0.jpg?itok=pmvHwVnA', 'Blog', 'blog'),
    ('ruzgar-turbini-nasil-yapilir', content_ruzgar, 'https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/ETK%C4%B0NL%C4%B0K%20G%C3%96RSEL%202_0.jpg?itok=YZEqfWqE', 'Blog', 'blog'),
    ('birden-fazla-dil-konusmak-hafizayi-etkiler-mi', content_dil, 'https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/birden-fazla-dil-konusmak.jpg?itok=pP0AmAwe', 'Blog', 'blog'),
]

for slug, content, img, cat, cat_slug in updates:
    soup = BeautifulSoup(content, 'html.parser')
    word_count = len(soup.get_text().split())
    img_count = len(soup.find_all('img'))
    print(f"Updating {slug}: {word_count} words, {img_count} images")
    cursor.execute("""
        UPDATE posts 
        SET content = ?, featured_image = ?, category = ?, category_slug = ?, updated_at = datetime('now')
        WHERE slug = ?
    """, (content, img, cat, cat_slug, slug))

conn.commit()
print("Batch 1 updated successfully!")
conn.close()
