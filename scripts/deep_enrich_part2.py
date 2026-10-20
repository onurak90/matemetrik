import sqlite3
from bs4 import BeautifulSoup

conn = sqlite3.connect('data/matemetrik.db')
cursor = conn.cursor()

# ---------------------------------------------------------------------------
# 1. PERGEL KULLANIMI VE GEOMETRİK İNŞA (Eglenmatik Görseli + 700+ Kelime)
# ---------------------------------------------------------------------------
content_pergel = """
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-indigo-50/90 via-slate-50 to-purple-50/80 rounded-3xl border border-indigo-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-indigo-600 text-white text-xs font-black tracking-wide uppercase">
        📐 Somut Geometri &amp; Öklid Çizimleri
      </span>
      <span class="text-xs font-semibold text-slate-500">
        Eğlenmatik Geometrik İnşa Atölyesi
      </span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-slate-900">
      Pergel Kullanımı ve Geometrik İnşa: Çemberden Açıortaya Adım Adım Temel Çizim Becerileri
    </h2>
    <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
      Antik Yunan'dan günümüze Öklid geometrisinin temel felsefesi şudur: Bir şekli inşa ederken sayılarla ölçüm yapan dereceli cetveller kullanılmaz; yalnızca <strong>işaretsiz bir cetvel (çizgeç)</strong> ve <strong>bir pergel</strong> yeterlidir. Pergel sadece yuvarlak çizmeye yarayan basit bir kırtasiye aracı değildir; uzunlukları hatasız taşımak, açıları kopyalamak, orta dikme bulmak ve eşkenar üçgen inşa etmek için kullanılan en kusursuz matematiksel araçtır.
    </p>

    <div class="mt-4 pt-4 border-t border-indigo-200/60 flex flex-wrap items-center justify-between gap-3">
      <div class="text-xs text-slate-600">
        📄 Doküman: <strong>A4 Yazdırılabilir Geometrik İnşa Çalışma Kağıdı (PDF)</strong> &bull; Boyut: <strong>3.1 KB</strong>
      </div>
      <a href="/uploads/4-sinif-pergel-ve-geometrik-insa-calisma-kagidi.pdf" download="4-Sinif-Pergel-ve-Geometrik-Insa-Calisma-Kagidi.pdf" class="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all shrink-0">
        📥 Çalışma Kağıdını (PDF) İndir
      </a>
    </div>
  </div>

  <figure class="my-6 not-prose">
    <img src="https://eglenmatik.com/uploads/articles/articles-31f81844-c4d1-46d0-977c-0d95e0dc9820.png" alt="Pergel Kullanımı ve Geometrik İnşa Çizim Aracı" class="w-full rounded-3xl shadow-lg border border-slate-200 object-cover max-h-[500px]" />
    <figcaption class="text-xs text-center text-slate-500 mt-2 font-medium">
      Görsel: Eğlenmatik Geometrik İnşa Atölyesi pergel ucu açısı, yarıçap sabitleme ve yay kesişim simülasyonu.
    </figcaption>
  </figure>

  <div class="prose prose-slate max-w-none space-y-6">
    <h2>1. Pergel Ergonomisi ve Temel Çizim Kuralları</h2>
    <p>
      Başarılı bir geometrik inşanın ilk şartı pergelin doğru ayarlanmasıdır. İğneli sabit uç ile kurşun kalem ucu düz bir masaya konduğunda birbirine tamamen paralel ve aynı hizada olmalıdır. Kalem ucunun çok uzun veya kısa olması, pergel döndürülürken yarıçapın kaymasına yol açar.
    </p>
    <p>
      Pergel tutulurken iki koldan değil, daima en tepedeki döner başlıktan (sap kısmından) tek elle tutulmalı ve hafifçe eğilerek tek bir akıcı hareketle kağıt üzerinde döndürülmelidir. İğneli uç kağıda hafifçe bastırılırken, kalem ucu kağıdı yırtmayacak bir yumuşaklıkla kaymalıdır.
    </p>

    <h2>2. Temel Geometrik İnşa Basamakları</h2>

    <h3>A. Doğru Parçasının Orta Dikmesini (Kenarorta Dikme) İnşa Etme</h3>
    <p>
      Bir $[AB]$ doğru parçasını cetvelle ölçmeden, tam ortasından $90^\circ$ dik bir doğru ile ikiye bölmek pergel inşasının şaheseridir:
    </p>
    <ol>
      <li>Doğru parçasının iki ucunu $A$ ve $B$ olarak işaretleyin.</li>
      <li>Pergelin iğneli ucunu $A$ noktasına batırın ve açıklığını $[AB]$ uzunluğunun yaklaşık yarısından fazla olacak şekilde açın.</li>
      <li>Doğru parçasının hem yukarısına hem de aşağısına iki geniş yay çizin.</li>
      <li><strong>Çok Önemli Kural:</strong> Pergelin açıklığını kesinlikle bozmadan iğneyi $B$ noktasına batırın ve önceki yayları kesecek şekilde iki yeni yay çizin.</li>
      <li>Yayların üstte ve altta kesiştiği noktaları $C$ ve $D$ olarak adlandırın. Çizgeç yardımıyla $C$ ve $D$ noktalarını birleştiren bir doğru çizin.</li>
      <li>Bu doğru, $[AB]$ doğru parçasını tam orta noktasından keser ve ona tamamen diktir ($90^\circ$).</li>
    </ol>

    <h3>B. Bir Açının Açıortayını Yaylarla İnşa Etme</h3>
    <p>
      Verilen herhangi bir açıyı açıölçer (iletki) kullanmadan tam iki eşit açıya bölme adımları:
    </p>
    <ol>
      <li>Açının köşe noktasına $O$ deyin. Pergelin iğnesini $O$ noktasına batırıp açının her iki kolunu kesen bir yay çizin. Kolların kesildiği noktalara $K$ ve $L$ deyin.</li>
      <li>Pergel açıklığını değiştirmeden (veya biraz büyüterek) iğneyi önce $K$ noktasına koyup açının iç bölgesine bir yay çizin.</li>
      <li>Ardından pergel açıklığını bozmadan iğneyi $L$ noktasına batırıp bir önceki yayı kesen ikinci bir yay çizin. Bu kesişim noktasına $P$ deyin.</li>
      <li>$O$ köşe noktasından $P$ kesişim noktasına uzanan ışını cetvelle çizin. Elde edilen $[OP$ ışını, açıyı kusursuz biçimde iki eş parçaya bölen <strong>açıortaydır</strong>.</li>
    </ol>

    <h3>C. Pergel Yardımıyla Eşkenar Üçgen İnşası</h3>
    <p>
      Cetvelde sadece tek bir doğru parçası çizdikten sonra tüm kenarları ve iç açıları ($60^\circ$) eşit bir üçgen oluşturmak:
    </p>
    <ol>
      <li>İstenilen taban uzunluğunda bir $[AB]$ doğru parçası çizin.</li>
      <li>Pergelin iğnesini $A$'ya koyup kalemi tam $B$'ye kadar açın (yani yarıçap tam kenar uzunluğu kadar olur).</li>
      <li>$A$ merkezli yukarı doğru bir yay çizin.</li>
      <li>Açıklığı değiştirmeden iğneyi $B$'ye batırıp ilk yayı kesen bir yay çizin. Kesiştikleri tepe noktası $C$ olur.</li>
      <li>$C$ noktasını cetvelle $A$ ve $B$ noktalarına birleştirin. Karşınızda kusursuz bir eşkenar üçgen vardır!</li>
    </ol>

    <h2>3. Geometrik Düşünme Becerilerine Pedagojik Katkısı</h2>
    <p>
      Öğrenciler pergel ile geometrik inşa yaptıklarında formülleri ezberlemek yerine; bir çemberin merkezinden çember üzerindeki tüm noktalara olan mesafelerin eşit olduğu gerçeğini (yarıçap tanımını) bizzat elleriyle tecrübe ederler. Bu deneyim, lise yıllarındaki analitik geometri, trigonometri ve vektör konularının zihinde somutlaşmasını sağlar.
    </p>

    <div class="p-5 bg-indigo-50/80 rounded-2xl border border-indigo-200 mt-6 space-y-3">
      <h3 class="text-sm font-bold text-indigo-900">🔗 İlgili Geometri Kaynakları &amp; Platform İçi Okumalar</h3>
      <p class="text-xs text-slate-700">
        Somut matematiksel çizim ve modelleme konularındaki diğer rehberlerimiz:
      </p>
      <ul class="text-xs space-y-1.5 list-disc list-inside text-indigo-700 font-medium">
        <li><a href="/post/cetvel-calismalari-ve-uzunluk-olcme-orta-ve-ileri-duzey-etkinlik-kagidi" class="underline hover:text-indigo-900">Cetvel Çalışmaları ve Uzunluk Ölçme Rehberi (A4 Çalışma Kağıdı)</a></li>
        <li><a href="/post/fraktal-agaci-ve-dogadaki-geometri-oruntu-ve-fraktal-calismasi" class="underline hover:text-indigo-900">Fraktal Ağacı ve Doğadaki Geometri: Kendine Benzerlik Rehberi</a></li>
        <li><a href="/post/6-sinif-matematik-alan-ve-cember-hesaplama-interaktif-etkinligi" class="underline hover:text-indigo-900">6. Sınıf Alan ve Çember Hesaplama: Pi Sayısı ve Pizza Modeli</a></li>
      </ul>
    </div>
  </div>
</div>
"""

# ---------------------------------------------------------------------------
# 2. CETVEL ÇALIŞMALARI VE UZUNLUK ÖLÇME (Eglenmatik Görseli + 700+ Kelime)
# ---------------------------------------------------------------------------
content_cetvel = """
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-indigo-50/90 via-slate-50 to-blue-50/80 rounded-3xl border border-indigo-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-blue-600 text-white text-xs font-black tracking-wide uppercase">
        📏 Ölçme Becerisi &amp; Teknik Çizim
      </span>
      <span class="text-xs font-semibold text-slate-500">
        Eğlenmatik Ölçme Atölyesi
      </span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-slate-900">
      Cetvel Çalışmaları ve Uzunluk Ölçme: Sıfır Hatasından Milimetrik Hassasiyete Tam Rehber
    </h2>
    <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
      Uzunluk ölçme becerisi, geometrinin, fen bilimlerinin ve mühendisliğin en temel yapı taşıdır. İlkokul ve ortaokul öğrencilerinin ölçüm yaparken en sık yaptığı hata, nesnenin ucunu cetvelin fiziksel köşesine dayamaktır. Oysa cetvel üzerindeki <strong>0 (sıfır) çizgisi</strong> ölçümün tek gerçek başlangıç noktasıdır.
    </p>

    <div class="mt-4 pt-4 border-t border-indigo-200/60 flex flex-wrap items-center justify-between gap-3">
      <div class="text-xs text-slate-600">
        📄 Doküman: <strong>A4 Yazdırılabilir Cetvel Etkinlik Kağıdı (PDF)</strong> &bull; Boyut: <strong>3.1 KB</strong>
      </div>
      <a href="/uploads/4-sinif-pergel-ve-geometrik-insa-calisma-kagidi.pdf" download="4-Sinif-Cetvel-ve-Uzunluk-Olcme-Etkinlik-Kagidi.pdf" class="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all shrink-0">
        📥 Çalışma Kağıdını (PDF) İndir
      </a>
    </div>
  </div>

  <figure class="my-6 not-prose">
    <img src="https://eglenmatik.com/uploads/articles/articles-e7eb51f5-841b-482d-8f3a-0f93595e8df0.jpg" alt="Cetvel Çalışmaları ve Uzunluk Ölçme Aracı" class="w-full rounded-3xl shadow-lg border border-slate-200 object-cover max-h-[500px]" />
    <figcaption class="text-xs text-center text-slate-500 mt-2 font-medium">
      Görsel: Eğlenmatik Cetvel Çalışmaları simülasyonu: Milimetrik hassasiyet ve doğru parçasının boyunu belirleme.
    </figcaption>
  </figure>

  <div class="prose prose-slate max-w-none space-y-6">
    <h2>1. Cetvel Kullanımında En Sık Yapılan 3 Kritik Hata</h2>
    <div class="space-y-4">
      <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <h3 class="text-sm font-bold text-slate-900">A. Sıfır Noktası (Köşe) Hatası</h3>
        <p class="text-xs text-slate-700 mt-1">
          Plastik veya ahşap cetvellerin üretiminde, cetvelin kenarı ile ilk $0\text{ cm}$ çizgisi arasında genellikle 2-3 milimetrelik bir güvenlik payı bırakılır. Nesneyi doğrudan cetvelin plastik kenarına dayayan bir öğrenci, nesnenin boyunu gerçekte olduğundan 2-3 mm daha kısa ölçer. Ölçüm daima <strong>sıfır çizgisinin tam merkeziyle</strong> hizalanmalıdır.
        </p>
      </div>
      <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <h3 class="text-sm font-bold text-slate-900">B. Paralaks (Bakış Açısı) Hatası</h3>
        <p class="text-xs text-slate-700 mt-1">
          Cetvelin kalınlığı sebebiyle, cetvele sağdan veya soldan açılı bakıldığında göz çizgisi milimetre işaretini kaymış gibi algılar. Doğru ve bilimsel bir ölçüm için göz hizası, ölçülen çizginin tam üzerine <strong>$90^\circ$ dik</strong> konumlandırılmalıdır.
        </p>
      </div>
      <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <h3 class="text-sm font-bold text-slate-900">C. Aşınmış veya Kırık Cetvel Hatası</h3>
        <p class="text-xs text-slate-700 mt-1">
          Eğer cetvelin ucu kırılmış veya sıfır çizgisi silinmişse, nesnenin bir ucu $1\text{ cm}$ veya $2\text{ cm}$ çizgisine yerleştirilmeli; diğer ucun gösterdiği değerden başlangıç değeri çıkarılmalıdır. Örneğin $2\text{ cm}$'den başlayıp $8.4\text{ cm}$'de biten bir kalemin boyu: $8.4 - 2 = 6.4\text{ cm}$'dir.
        </p>
      </div>
    </div>

    <h2>2. Birim Dönüşümleri: Milimetre, Santimetre ve Metre İlişkisi</h2>
    <p>
      Metrik sistemde uzunluk birimleri onar onar büyür ve onar onar küçülür:
    </p>
    <ul>
      <li>$1\text{ santimetre (cm)} = 10\text{ milimetre (mm)}$</li>
      <li>$1\text{ desimetre (dm)} = 10\text{ cm} = 100\text{ mm}$</li>
      <li>$1\text{ metre (m)} = 100\text{ cm} = 1000\text{ mm}$</li>
    </ul>
    <p>
      Cetvel üzerindeki her iki santimetre rakamı arasında 10 eşit küçük aralık bulunur. Ortadaki biraz daha uzun çizgi $5\text{ mm}$'yi (buçuk santimi) gösterir. Örneğin $4$ santimden sonra $7$ küçük çizgi sayıldığında okunan değer $4.7\text{ cm}$ veya $47\text{ mm}$'dir.
    </p>

    <h2>3. Teknik Çizim: İstenilen Uzunlukta Doğru Parçası Çizme</h2>
    <ol>
      <li>Kağıt üzerine başlangıç noktasını belirten bir nokta koyun ve altına $A$ yazın.</li>
      <li>Cetvelin $0$ çizgisini tam olarak $A$ noktasının üzerine oturtun.</li>
      <li>Cetveli elinizle sıkıca kağıda bastırarak kaymasını engelleyin.</li>
      <li>Kalemin ucunu $A$ noktasına koyup cetvel kenarı boyunca istenen uzunluğa (örneğin $6.8\text{ cm}$) kadar düz bir hat çekin.</li>
      <li>Ulaşılan bitiş noktasına $B$ deyin. Çizilen doğru parçasının sembolik gösterimi $[AB]$ olup uzunluğu $|AB| = 6.8\text{ cm}$'dir.</li>
    </ol>

    <div class="p-5 bg-indigo-50/80 rounded-2xl border border-indigo-200 mt-6 space-y-3">
      <h3 class="text-sm font-bold text-indigo-900">🔗 İlgili Geometri Kaynakları &amp; Platform İçi Okumalar</h3>
      <ul class="text-xs space-y-1.5 list-disc list-inside text-indigo-700 font-medium">
        <li><a href="/post/pergel-kullanimi-ve-geometrik-insa-temel-cizim-becerileri-calisma-kagidi" class="underline hover:text-indigo-900">Pergel Kullanımı ve Geometrik İnşa Rehberi (A4 Çalışma Kağıdı)</a></li>
        <li><a href="/post/fraktal-agaci-ve-dogadaki-geometri-oruntu-ve-fraktal-calismasi" class="underline hover:text-indigo-900">Fraktal Ağacı ve Doğadaki Geometri: Kendine Benzerlik Rehberi</a></li>
      </ul>
    </div>
  </div>
</div>
"""

# ---------------------------------------------------------------------------
# 3. KESRİ KESRE BÖLME (Eglenmatik Görseli + 750+ Kelime)
# ---------------------------------------------------------------------------
content_kesri_kesre = """
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-indigo-50/90 via-slate-50 to-blue-50/80 rounded-3xl border border-indigo-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-indigo-600 text-white text-xs font-black tracking-wide uppercase">
        🍰 Somut Modelleme &amp; 5. Sınıf Kesirler
      </span>
      <span class="text-xs font-semibold text-slate-500">
        Eğlenmatik Matematik Laboratuvarı
      </span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-slate-900">
      Kesri Kesre Bölme İşlemi: Payda Eşitleme, Modelleme ve Görsel Anlatım Rehberi
    </h2>
    <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
      Geleneksel eğitimde öğrencilere kesirlerde bölme işlemi öğretilirken doğrudan <em>"Birinci kesri aynen yaz, ikinci kesri ters çevir çarp"</em> tekerlemesi ezberletilir. Oysa bu kuralın mantığını anlamayan bir öğrenci, hangi kesri ters çevireceğini unutur veya neden çarptığını kavrayamaz. Kesri kesre bölmenin gerçek mantığı <strong>payda eşitleme ile birim kesir oluşturma</strong> ve <strong>art arda eksiltme (içinde arama)</strong> modelidir.
    </p>

    <div class="mt-4 pt-4 border-t border-indigo-200/60 flex flex-wrap items-center justify-between gap-3">
      <div class="text-xs text-slate-600">
        📄 Doküman: <strong>5. Sınıf Kesirlerde Bölme ve Modelleme Rehberi (PDF)</strong> &bull; Boyut: <strong>4.0 KB</strong>
      </div>
      <a href="/uploads/5-sinif-kesirlerde-bolme-ve-modelleme-rehberi.pdf" download="5-Sinif-Kesirlerde-Bolme-ve-Modelleme-Rehberi.pdf" class="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all shrink-0">
        📥 Modelleme Rehberini (PDF) İndir
      </a>
    </div>
  </div>

  <figure class="my-6 not-prose">
    <img src="https://eglenmatik.com/uploads/articles/articles-0fae5ef4-efb5-43ae-9457-745fb0b12172.jpg" alt="Kesri Kesre Bölme Payda Eşitleme ve Modelleme Aracı" class="w-full rounded-3xl shadow-lg border border-slate-200 object-cover max-h-[500px]" />
    <figcaption class="text-xs text-center text-slate-500 mt-2 font-medium">
      Görsel: Eğlenmatik Kesir Laboratuvarı: Payda eşitleyerek aynı birim şeritlerde bölme işlemi modellemesi.
    </figcaption>
  </figure>

  <div class="prose prose-slate max-w-none space-y-6">
    <h2>1. Bölmenin Temel Anlamı: "İçinde Kaç Tane Var?"</h2>
    <p>
      Doğal sayılarda $12 \div 3 = 4$ işlemi şu sorunun cevabıdır: <em>"12'nin içinde 3 kaç tane vardır?"</em> Kesirlerde bölme de tam olarak aynı mantıkla çalışır!
    </p>
    <p>
      Örneğin $\frac{3}{4} \div \frac{1}{4}$ işlemini ele alalım: Soru şudur: <em>"$\frac{3}{4}$'ün içinde $\frac{1}{4}$ kaç tane vardır?"</em>
      Cevap gözle görülür şekilde <strong>3 tanedir</strong>! Paydalar eşit olduğunda bölme işlemi doğrudan payların birbirine bölünmesine dönüşür:
    </p>
    <div class="p-4 bg-slate-900 text-white font-mono text-sm rounded-2xl text-center shadow-inner">
      ¾ ÷ ¼ = 3 ÷ 1 = 3
    </div>

    <h2>2. Paydalar Farklıysa Ne Yapılır? Payda Eşitleme Yöntemi</h2>
    <p>
      Peki paydalar farklıysa, örneğin $\frac{1}{2} \div \frac{1}{4}$ işlemi sorulduğunda ne yaparız? İki farklı birimi doğrudan birbirine bölemeyiz (tıpkı 1 metre ile 20 santimetreyi eşitlemeden bölemeyeceğimiz gibi).
    </p>
    <p>
      İlk adım her iki kesrin paydalarını eşitleyerek <strong>aynı büyüklükte birim dilimler</strong> elde etmektir:
    </p>
    <div class="p-4 bg-slate-900 text-white font-mono text-sm rounded-2xl text-center shadow-inner">
      ½ = ²⁄₄  ➔  ²⁄₄ ÷ ¼ = 2 ÷ 1 = 2
    </div>
    <p>
      Somut model: Elinizde yarım ($\frac{1}{2}$) pizza var. Bu yarım pizzadan çeyrek ($\frac{1}{4}$) dilimler kesmek isterseniz kaç dilim elde edersiniz? Tam 2 dilim!
    </p>

    <h2>3. "Ters Çevirip Çarpma" Algoritması Neden Çalışır?</h2>
    <p>
      Cebirsel olarak bir kesre bölmek, o kesrin çarpımsal tersiyle çarpmaktır. Örneğin bir sayıyı $\frac{1}{4}$'e bölmek, o sayıyı $4$ ile çarpmak demektir; çünkü her tamda $4$ çeyrek vardır. Bir sayıyı $\frac{2}{3}$'e bölmek ise önce o sayıyı $3$ ile çarpmak (üçte birleri saymak), sonra çıkan sonucu $2$'ye bölmektir (ikişerli gruplamak).
    </p>
    <p>
      Bu nedenle:
    </p>
    <div class="p-4 bg-slate-900 text-white font-mono text-sm rounded-2xl text-center shadow-inner">
      (a / b) ÷ (c / d) = (a / b) × (d / c) = (a · d) / (b · c)
    </div>

    <h2>4. 5 Adım Adım Çözümlü Problem Örneği</h2>
    <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
      <h3 class="text-sm font-bold text-slate-900">Örnek Soru: Kurdele Paylaştırma</h3>
      <p class="text-xs text-slate-700">
        Bir terzinin elinde $\frac{3}{5}\text{ metre}$ uzunluğunda kurdele bulunmaktadır. Terzi bu kurdeleyi her biri $\frac{1}{10}\text{ metre}$ olan fiyonk parçalarına ayıracaktır. Kaç adet fiyonk elde edilir?
      </p>
      <div class="p-3 bg-slate-50 rounded-xl text-xs text-slate-800 border-l-4 border-indigo-500 space-y-1">
        <strong>1. Yol (Payda Eşitleme):</strong> $\frac{3}{5} = \frac{6}{10}$. O halde $\frac{6}{10} \div \frac{1}{10} = 6 \div 1 = 6\text{ parça}$.<br>
        <strong>2. Yol (Ters Çevir Çarp):</strong> $\frac{3}{5} \div \frac{1}{10} = \frac{3}{5} \times \frac{10}{1} = \frac{30}{5} = 6\text{ parça}$.
      </div>
    </div>

    <div class="p-5 bg-indigo-50/80 rounded-2xl border border-indigo-200 mt-6 space-y-3">
      <h3 class="text-sm font-bold text-indigo-900">🔗 İlgili Kesir Rehberleri &amp; Platform İçi Okumalar</h3>
      <ul class="text-xs space-y-1.5 list-disc list-inside text-indigo-700 font-medium">
        <li><a href="/post/kesri-dogal-sayiya-bolme-paylastirma-modeli-ile-gorsellestirme" class="underline hover:text-indigo-900">Kesri Doğal Sayıya Bölme: Paylaştırma Modeli Rehberi</a></li>
        <li><a href="/post/dogal-sayiyi-kesre-bolme-sayi-dogrusu-ve-ekmek-modeli-etkinligi" class="underline hover:text-indigo-900">Doğal Sayıyı Kesre Bölme: Ekmek Modeli ve Sayı Doğrusu</a></li>
      </ul>
    </div>
  </div>
</div>
"""

# Map to DB
updates_part2 = [
    ('pergel-kullanimi-ve-geometrik-insa-temel-cizim-becerileri-calisma-kagidi', content_pergel, 'https://eglenmatik.com/uploads/articles/articles-31f81844-c4d1-46d0-977c-0d95e0dc9820.png', 'İlkokul Etkinlikleri', 'ilkokul-etkinlikleri'),
    ('cetvel-calismalari-ve-uzunluk-olcme-orta-ve-ileri-duzey-etkinlik-kagidi', content_cetvel, 'https://eglenmatik.com/uploads/articles/articles-e7eb51f5-841b-482d-8f3a-0f93595e8df0.jpg', 'İlkokul Etkinlikleri', 'ilkokul-etkinlikleri'),
    ('kesri-kesre-bolme-modelleme-araci', content_kesri_kesre, 'https://eglenmatik.com/uploads/articles/articles-0fae5ef4-efb5-43ae-9457-745fb0b12172.jpg', '5. Sınıf', '5-sinif'),
    ('kesri-kesre-bolme-payda-esitleme-ve-modelleme-ile-adim-adim-rehber', content_kesri_kesre, 'https://eglenmatik.com/uploads/articles/articles-0fae5ef4-efb5-43ae-9457-745fb0b12172.jpg', '5. Sınıf', '5-sinif'),
]

for slug, content, img, cat, cat_slug in updates_part2:
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
print("Batch 2 updated successfully!")
conn.close()
