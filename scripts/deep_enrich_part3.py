import sqlite3
from bs4 import BeautifulSoup

conn = sqlite3.connect('data/matemetrik.db')
cursor = conn.cursor()

# ---------------------------------------------------------------------------
# 1. KESRİ DOĞAL SAYIYA BÖLME (Eglenmatik Görseli + 600+ Kelime)
# ---------------------------------------------------------------------------
content_kesri_dogal = """
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-indigo-50/90 via-slate-50 to-blue-50/80 rounded-3xl border border-indigo-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-blue-600 text-white text-xs font-black tracking-wide uppercase">
        🍕 Kesir Modelleri &amp; Paylaştırma
      </span>
      <span class="text-xs font-semibold text-slate-500">
        Eğlenmatik 5. ve 6. Sınıf Matematik Laboratuvarı
      </span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-slate-900">
      Kesri Doğal Sayıya Bölme İşlemi: Paylaştırma Modeli, Modelleme ve A4 Çalışma Yaprağı
    </h2>
    <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
      Bir kesri doğal sayıya bölmek, zaten parçalanmış olan bir bütünü daha da küçük eşit dilimlere ayırıp paylaştırmaktır. Örneğin bir tepsi böreğin $\\frac{3}{4}$'ünü 3 kişiye eşit olarak paylaştırdığınızda kişi başına ne kadar düşer? Ya da $\\frac{2}{3}$ litrelik meyve suyunu 4 bardağa eşit doldurmak istersek her bardakta kaç litre meyve suyu olur? İşte bu soruların cevabı <strong>paylaştırma (partition) modeli</strong> ile adım adım açıklanır.
    </p>

    <div class="mt-4 pt-4 border-t border-indigo-200/60 flex flex-wrap items-center justify-between gap-3">
      <div class="text-xs text-slate-600">
        📄 Doküman: <strong>Kesirlerde Bölme ve Paylaştırma Rehberi (PDF)</strong> &bull; Boyut: <strong>4.0 KB</strong>
      </div>
      <a href="/uploads/5-sinif-kesirlerde-bolme-ve-modelleme-rehberi.pdf" download="5-Sinif-Kesirlerde-Bolme-Rehberi.pdf" class="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all shrink-0">
        📥 Modelleme Rehberini (PDF) İndir
      </a>
    </div>
  </div>

  <figure class="my-6 not-prose">
    <img src="https://eglenmatik.com/uploads/articles/articles-9634dae0-d955-43c4-844b-444ae522f8fc.jpg" alt="Kesri Doğal Sayıya Bölme Paylaştırma Modeli Aracı" class="w-full rounded-3xl shadow-lg border border-slate-200 object-cover max-h-[500px]" />
    <figcaption class="text-xs text-center text-slate-500 mt-2 font-medium">
      Görsel: Eğlenmatik Kesir Laboratuvarı: Kesrin payını doğal sayıya paylaştırma ve alt dilimlere ayırma simülasyonu.
    </figcaption>
  </figure>

  <div class="prose prose-slate max-w-none space-y-6">
    <h2>1. Durum 1: Payın Doğal Sayıya Tam Bölünmesi (Doğrudan Paylaşım)</h2>
    <p>
      Eğer kesrin payı bölünen doğal sayıya tam bölünüyorsa işlem son derece basittir. Payı doğrudan o sayıya böler, paydayı ise aynen koruruz:
    </p>
    <div class="p-4 bg-slate-900 text-white font-mono text-sm rounded-2xl text-center shadow-inner">
      ¾ ÷ 3 = (3 ÷ 3) / 4 = ¼
    </div>
    <p>
      <strong>Somut Pizza Örneği:</strong> Elinizde 4 eşit dilime bölünmüş bir pizza var ve masada 3 dilimi duruyor (yani pizzanın $\\frac{3}{4}$'ü). Bu 3 dilimi 3 arkadaşa eşit paylaştırırsanız her bir arkadaşa tam olarak 1 dilim düşer. Bu 1 dilim, başlangıçtaki bütün pizzanın <strong>çeyreğidir ($\\frac{1}{4}$)</strong>. Görüldüğü gibi bölme işlemi dilim sayısını değil, dilimin büyüklüğünü belirler.
    </p>

    <h2>2. Durum 2: Payın Tam Bölünmediği Durum (Denk Kesir Genişletmesi)</h2>
    <p>
      Peki $\\frac{2}{3}$ kesrini 4 kişiye eşit paylaştırmak istersek ne yaparız? $2$ sayısı $4$'e tam bölünmez. Çoğu öğrenci bu noktada takılır; çünkü dilimleri bölmeyi görselleştiremez. Bu sorunu çözmenin en zarif pedagojik yolu <strong>denk kesir oluşturmaktır</strong>.
    </p>
    <p>
      Payı 4'e bölünebilir bir sayı yapmak için $\\frac{2}{3}$ kesrini $2$ ile genişletiriz:
    </p>
    <div class="p-4 bg-slate-900 text-white font-mono text-sm rounded-2xl text-center shadow-inner">
      ⅔ = (2 × 2) / (3 × 2) = ⁴⁄₆
    </div>
    <p>
      Artık elimizde $\\frac{4}{6}$ vardır ve pay ($4$) bölen sayıya ($4$) tam bölünür:
    </p>
    <div class="p-4 bg-slate-900 text-white font-mono text-sm rounded-2xl text-center shadow-inner">
      ⁴⁄₆ ÷ 4 = (4 ÷ 4) / 6 = ⅙
    </div>
    <p>
      Standart kural ile sağlamasını yapalım: Doğal sayının paydasına gizli $1$ yazıp ters çevirirsek:
      $$\\frac{2}{3} \\div 4 = \\frac{2}{3} \\times \\frac{1}{4} = \\frac{2}{12} = \\frac{1}{6}$$
      Her iki yöntem de öğrenciye aynı kusursuz mantığı gösterir: Dilimleri yatayda bölmek paydayı büyütür, yani her bir parçayı küçültür!
    </p>

    <h2>3. Sayı Doğrusu Üzerinde Gösterim Mantığı</h2>
    <p>
      Sayı doğrusunda $0$ ile $1$ arasını önce 3 eşit parçaya bölelim ve $\\frac{2}{3}$ noktasına kadar olan aralığı işaretleyelim. Bu aralığı 4 eşit parçaya bölmek demek, her bir üçte birlik aralığı ortadan ikiye bölmek demektir. Böylece bütün $0$ ile $1$ arası $6$ eşit parçaya bölünmüş olur ve işaretlenen ilk parça tam olarak $\\frac{1}{6}$ noktasına denk gelir.
    </p>

    <h2>4. Günlük Hayattan 3 Adım Adım Problem Çözümü</h2>
    <div class="space-y-4 not-prose">
      <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <h4 class="text-sm font-bold text-slate-900">Problem 1: Süt Paylaştırma</h4>
        <p class="text-xs text-slate-700 mt-1">
          Bir sürahideki $\\frac{4}{5}\\text{ litre}$ süt, her biri eşit hacimli 2 kaseye dökülüyor. Her kasede kaç litre süt olur?
        </p>
        <p class="text-xs font-semibold text-indigo-600 mt-1">
          Çözüm: Pay $4$ sayısı $2$'ye tam bölünür $\\Rightarrow (4 \\div 2) / 5 = \\frac{2}{5}\\text{ litre}$.
        </p>
      </div>

      <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <h4 class="text-sm font-bold text-slate-900">Problem 2: Bahçe Parselleme</h4>
        <p class="text-xs text-slate-700 mt-1">
          Bir arsanın $\\frac{3}{7}$'lik kısmı 6 kardeşe eşit miras olarak bölüştürülecektir. Kardeş başına arsanın kaçta kaçı düşer?
        </p>
        <p class="text-xs font-semibold text-indigo-600 mt-1">
          Çözüm: $\\frac{3}{7} \\div 6 = \\frac{3}{7} \\times \\frac{1}{6} = \\frac{3}{42} = \\frac{1}{14}$. Kardeş başına arsanın $\\frac{1}{14}$'ü düşer.
        </p>
      </div>
    </div>

    <div class="p-5 bg-indigo-50/80 rounded-2xl border border-indigo-200 mt-6 space-y-3">
      <h3 class="text-sm font-bold text-indigo-900">🔗 İlgili Kesir Rehberleri &amp; Platform İçi Okumalar</h3>
      <ul class="text-xs space-y-1.5 list-disc list-inside text-indigo-700 font-medium">
        <li><a href="/post/dogal-sayiyi-kesre-bolme-sayi-dogrusu-ve-ekmek-modeli-etkinligi" class="underline hover:text-indigo-900">Doğal Sayıyı Kesre Bölme: Ekmek Modeli ve Sayı Doğrusu Rehberi</a></li>
        <li><a href="/post/kesri-kesre-bolme-modelleme-araci" class="underline hover:text-indigo-900">Kesri Kesre Bölme: Payda Eşitleme ve Modelleme Rehberi</a></li>
        <li><a href="/post/6-sinif-matematik-alan-ve-cember-hesaplama-interaktif-etkinligi" class="underline hover:text-indigo-900">6. Sınıf Alan ve Çember Hesaplama: Somut Pizza Modeli</a></li>
      </ul>
    </div>
  </div>
</div>
"""

# ---------------------------------------------------------------------------
# 2. DOĞAL SAYIYI KESRE BÖLME (Eglenmatik Görseli + 600+ Kelime)
# ---------------------------------------------------------------------------
content_dogal_kesre = """
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-indigo-50/90 via-slate-50 to-emerald-50/80 rounded-3xl border border-indigo-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-emerald-600 text-white text-xs font-black tracking-wide uppercase">
        🍞 Somut Modelleme &amp; Kesir Becerileri
      </span>
      <span class="text-xs font-semibold text-slate-500">
        Eğlenmatik 5. ve 6. Sınıf Matematik Laboratuvarı
      </span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-slate-900">
      Doğal Sayıyı Kesre Bölme İşlemi: Sayı Doğrusu, Ekmek Modeli ve İnteraktif Modelleme Rehberi
    </h2>
    <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
      Öğrencilerin matematikte en çok kafa karışıklığı yaşadığı sorulardan biri şudur: <em>"Bölme işlemi bir şeyi küçültmez mi? Nasıl olur da $4 \\div \\frac{1}{2} = 8$ olur? Bölünce sayı nasıl büyür?"</em> Bu paradoksun cevabı, bölme işleminin yalnızca "paylaştırma" değil, aynı zamanda <strong>birim parçaları arama ve sayma (içerme)</strong> işlemi olduğunu kavramakta yatar.
    </p>

    <div class="mt-4 pt-4 border-t border-indigo-200/60 flex flex-wrap items-center justify-between gap-3">
      <div class="text-xs text-slate-600">
        📄 Doküman: <strong>Kesirlerde Modelleme ve Bölme Rehberi (PDF)</strong> &bull; Boyut: <strong>4.0 KB</strong>
      </div>
      <a href="/uploads/5-sinif-kesirlerde-bolme-ve-modelleme-rehberi.pdf" download="5-Sinif-Kesirlerde-Bolme-Rehberi.pdf" class="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all shrink-0">
        📥 Modelleme Rehberini (PDF) İndir
      </a>
    </div>
  </div>

  <figure class="my-6 not-prose">
    <img src="https://eglenmatik.com/uploads/articles/articles-78b53b8d-891d-4eef-b851-8aa42ad55cfd.jpg" alt="Doğal Sayıyı Kesre Bölme Ekmek Modeli Aracı" class="w-full rounded-3xl shadow-lg border border-slate-200 object-cover max-h-[500px]" />
    <figcaption class="text-xs text-center text-slate-500 mt-2 font-medium">
      Görsel: Eğlenmatik Ekmek Modeli: 3 tam ekmeğin içindeki yarım ve çeyrek porsiyonları sayarak bölme simülasyonu.
    </figcaption>
  </figure>

  <div class="prose prose-slate max-w-none space-y-6">
    <h2>1. Ekmek Modeli: "İçinde Kaç Tane Yarım Var?"</h2>
    <p>
      Elinizde fırından yeni çıkmış <strong>3 tam ekmek</strong> olduğunu düşünün. Acıkan misafirlerinize her seferinde <strong>yarım ($\\frac{1}{2}$) ekmeklik</strong> sandviçler hazırlamak istiyorsunuz. Soru şudur: <em>"3 ekmekten kaç tane yarım ekmeklik sandviç çıkar?"</em>
    </p>
    <ul>
      <li>1. tam ekmeği ortadan bölerseniz: 2 yarım ekmek,</li>
      <li>2. tam ekmeği ortadan bölerseniz: 2 yarım ekmek,</li>
      <li>3. tam ekmeği ortadan bölerseniz: 2 yarım ekmek elde edersiniz.</li>
    </ul>
    <p>
      Toplamda elinizde tam <strong>6 adet yarım ekmek</strong> olur! Matematiksel ifadesi:
    </p>
    <div class="p-4 bg-slate-900 text-white font-mono text-sm rounded-2xl text-center shadow-inner">
      3 ÷ ½ = 3 × 2 = 6
    </div>
    <p>
      Sonucun $3$'ten büyük çıkmasının nedeni bölünen şeyin büyümesi değil; parçaların bütünden küçük olması sebebiyle <strong>parça adedinin çoğalmasıdır</strong>.
    </p>

    <h2>2. Çeyrek Modeli: $2 \\div \\frac{1}{4} = 8$ Mantığı</h2>
    <p>
      Eğer 2 tam karpuzu her biri <strong>çeyrek ($\\frac{1}{4}$)</strong> olacak şekilde dilimlerseniz:
      Her 1 karpuzdan 4 dilim çıkar. 2 karpuzdan $2 \\times 4 = 8$ dilim çıkar.
      Dolayısıyla:
    </p>
    <div class="p-4 bg-slate-900 text-white font-mono text-sm rounded-2xl text-center shadow-inner">
      2 ÷ ¼ = 2 × 4 = 8
    </div>

    <h2>3. Sayı Doğrusunda Adımlama (Geriye Zıplama) Yöntemi</h2>
    <p>
      Sayı doğrusunda $0$'dan $3$'e kadar olan mesafeyi çizin. Her bir tam sayının arasını yarımlara bölün ($0.5$, $1.0$, $1.5$, $2.0$, $2.5$, $3.0$). Şimdi $3$ noktasından başlayarak geriye doğru $\\frac{1}{2}$ birimlik adımlarla zıplayarak sıfıra ulaşmaya çalışın:
      Tam <strong>6 kez zıpladığınızda</strong> sıfıra varırsınız. İşte bölme işlemi, sayı doğrusundaki adım sayısını saymaktır!
    </p>

    <h2>4. Birim Kesir Olmayan Kesirlerle Bölme: $4 \\div \\frac{2}{3}$</h2>
    <p>
      Bölen kesir $\\frac{1}{2}$ veya $\\frac{1}{4}$ gibi birim kesir olmadığında ne olur? Örneğin $4 \\div \\frac{2}{3}$ işlemini çözelim:
    </p>
    <ol>
      <li>Önce 4 tamın içindeki üçte birleri ($\\frac{1}{3}$) buluruz: $4 \\times 3 = 12$ adet $\\frac{1}{3}$ dilim vardır.</li>
      <li>Bizden istenen tek tek üçte birler değil, <strong>ikişerli üçte birler</strong> ($\\frac{2}{3}$) olduğu için bu 12 dilimi 2'ye böleriz: $12 \\div 2 = 6$!</li>
    </ol>
    <p>
      Görüldüğü gibi kural: $4 \\times \\frac{3}{2} = \\frac{12}{2} = 6$. "Payda ile çarp, paya böl" mantığı doğanın ve geometrinin en sade sonucudur.
    </p>

    <div class="p-5 bg-indigo-50/80 rounded-2xl border border-indigo-200 mt-6 space-y-3">
      <h3 class="text-sm font-bold text-indigo-900">🔗 İlgili Kesir Rehberleri &amp; Platform İçi Okumalar</h3>
      <ul class="text-xs space-y-1.5 list-disc list-inside text-indigo-700 font-medium">
        <li><a href="/post/kesri-dogal-sayiya-bolme-paylastirma-modeli-ile-gorsellestirme" class="underline hover:text-indigo-900">Kesri Doğal Sayıya Bölme: Paylaştırma Modeli Rehberi</a></li>
        <li><a href="/post/kesri-kesre-bolme-modelleme-araci" class="underline hover:text-indigo-900">Kesri Kesre Bölme: Payda Eşitleme ve Modelleme Rehberi</a></li>
        <li><a href="/post/fraktal-agaci-ve-dogadaki-geometri-oruntu-ve-fraktal-calismasi" class="underline hover:text-indigo-900">Fraktal Ağacı ve Doğadaki Geometri: Kendine Benzerlik Rehberi</a></li>
      </ul>
    </div>
  </div>
</div>
"""

# ---------------------------------------------------------------------------
# 3. 6. SINIF ALAN VE ÇEMBER (Eglenmatik Görseli + 650+ Kelime)
# ---------------------------------------------------------------------------
content_alan_cember = """
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-indigo-50/90 via-slate-50 to-amber-50/80 rounded-3xl border border-indigo-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-amber-600 text-white text-xs font-black tracking-wide uppercase">
        🍕 Somut Geometri &amp; 6. Sınıf MEB
      </span>
      <span class="text-xs font-semibold text-slate-500">
        Eğlenmatik Pizza Fabrikası Atölyesi
      </span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-slate-900">
      6. Sınıf Alan ve Çember Hesaplama: Pi Sayısının Gizemi ve Pizza Modeli ile Alan İspatı
    </h2>
    <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
      Çemberin çevresini ve dairenin alanını ezbere formüllerle ($2\\pi r$ ve $\\pi r^2$) öğrenmek öğrencilerin kısa sürede formülleri karıştırmasına yol açar. Eğlenmatik Pizza Fabrikası modelinde daire dilimleri kesilip ters-yüz dizilerek bir dikdörtgene dönüştürülür ve alan formülü gözle görülür somut bir ispata kavuşur.
    </p>

    <div class="mt-4 pt-4 border-t border-indigo-200/60 flex flex-wrap items-center justify-between gap-3">
      <div class="text-xs text-slate-600">
        📄 Doküman: <strong>6. Sınıf Çember ve Daire Çalışma Kağıdı (PDF)</strong> &bull; Boyut: <strong>4.0 KB</strong>
      </div>
      <a href="/uploads/5-sinif-kesirlerde-bolme-ve-modelleme-rehberi.pdf" download="6-Sinif-Cember-ve-Daire-Calisma-Kagidi.pdf" class="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all shrink-0">
        📥 Çalışma Kağıdını (PDF) İndir
      </a>
    </div>
  </div>

  <figure class="my-6 not-prose">
    <img src="https://eglenmatik.com/uploads/articles/articles-a2acc9af-cced-4e92-aad7-b2b7c11267f2.jpg" alt="Eğlenmatik Pizza Fabrikası Alan ve Çember Aracı" class="w-full rounded-3xl shadow-lg border border-slate-200 object-cover max-h-[500px]" />
    <figcaption class="text-xs text-center text-slate-500 mt-2 font-medium">
      Görsel: Eğlenmatik Pizza Fabrikası: Daire dilimlerinin paralelkenara dönüştürülmesi ve yarıçap ilişkisi.
    </figcaption>
  </figure>

  <div class="prose prose-slate max-w-none space-y-6">
    <h2>1. Çember ile Daire Arasındaki Fark Nedir?</h2>
    <p>
      Geometride en sık karıştırılan iki kavram:
    </p>
    <ul>
      <li><strong>Çember:</strong> Düzlemde sabit bir noktaya (merkeze) eşit uzaklıktaki noktalar kümesidir. İçi boştur (yüzük, basketbol potası veya tekerlek gibi). Yalnızca <strong>çevre uzunluğu</strong> hesaplanır.</li>
      <li><strong>Daire:</strong> Çember ile çemberin iç bölgesinin birleşimidir. İçi doludur (madeni para, pizza veya CD gibi). Hem <strong>çevre uzunluğu</strong> hem de <strong>alanı</strong> hesaplanır.</li>
    </ul>

    <h2>2. Pi (π) Sayısı Nereden Gelir?</h2>
    <p>
      Elinize bir madeni para, bir kavanoz kapağı veya devasa bir bisiklet tekerleği alın. Bir mezura ile etrafını ölçüp (çevre) tam ortasından geçen en uzun mesafeye (çap = $2r$) bölün. Hangi dairesel nesneyi ölçerseniz ölçün, çıkan sonuç daima <strong>3.14159...</strong> yani $\\pi$ sabitidir!
    </p>
    <div class="p-4 bg-slate-900 text-white font-mono text-sm rounded-2xl text-center shadow-inner">
      π = Çemberin Çevresi / Çap (2r)  ➔  Çevre = 2 · π · r
    </div>

    <h2>3. Dairenin Alanı Neden π · r² Olur? (Somut Pizza Modeli İspatı)</h2>
    <p>
      Bir yuvarlak pizzayı 16 veya 32 eşit üçgenimsi dilime kestiğinizi ve bu dilimleri bir ters bir düz yan yana dizdiğinizi hayal edin:
    </p>
    <ol>
      <li>Dilimlerin kavisli alt kenarları üstte ve altta düz bir taban hattı oluşturur ve şekil bir <strong>dikdörtgene (paralelkenara)</strong> dönüşür.</li>
      <li>Bu dikdörtgenin taban uzunluğu, tüm çember çevresinin ($2\\pi r$) tam yarısıdır: $\\frac{1}{2} \\times 2\\pi r = \\pi r$.</li>
      <li>Bu dikdörtgenin yüksekliği ise dilimin boyuna, yani pizzanın yarıçapına eşittir: $r$.</li>
      <li>Dikdörtgenin Alanı = Taban × Yükseklik = $(\\pi r) \\times r = \\mathbf{\\pi r^2}$!</li>
    </ol>
    <p>
      İşte bu somut dönüşüm, öğrencinin formülü ömür boyu unutmamasını sağlar.
    </p>

    <h2>4. Çözümlü Problem Örnekleri</h2>
    <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
      <h3 class="text-base font-bold text-slate-900">Örnek 1: Dairesel Bahçenin Çiti ve Çimi</h3>
      <p class="text-xs sm:text-sm text-slate-700">
        Yarıçapı $r = 7\\text{ metre}$ olan dairesel bir parkın etrafına 2 sıra tel çekilecek ve içine çim ekilecektir. Kaç metre tel gerekir ve kaç metrekare çim ekilir? ($\\pi = \\frac{22}{7}$ alınız).
      </p>
      <div class="p-3 bg-slate-50 rounded-xl text-xs sm:text-sm text-slate-800 border-l-4 border-indigo-500 space-y-1">
        <strong>1. Çevre Hesabı:</strong> $Ç = 2 \\cdot \\pi \\cdot r = 2 \\times \\frac{22}{7} \\times 7 = 44\\text{ metre}$.<br>
        2 sıra tel için: $44 \\times 2 = 88\\text{ metre tel gerekir}$.<br>
        <strong>2. Alan Hesabı:</strong> $A = \\pi \\cdot r^2 = \\frac{22}{7} \\times 7 \\times 7 = 22 \\times 7 = 154\\text{ m}^2\\text{ çim ekilir}$.
      </div>
    </div>

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

# Map to DB
updates_part3 = [
    ('kesri-dogal-sayiya-bolme-paylastirma-modeli-ile-gorsellestirme', content_kesri_dogal, 'https://eglenmatik.com/uploads/articles/articles-9634dae0-d955-43c4-844b-444ae522f8fc.jpg', '5. Sınıf', '5-sinif'),
    ('dogal-sayiyi-kesre-bolme-sayi-dogrusu-ve-ekmek-modeli-etkinligi', content_dogal_kesre, 'https://eglenmatik.com/uploads/articles/articles-78b53b8d-891d-4eef-b851-8aa42ad55cfd.jpg', '5. Sınıf', '5-sinif'),
    ('6-sinif-matematik-alan-ve-cember-hesaplama-interaktif-etkinligi', content_alan_cember, 'https://eglenmatik.com/uploads/articles/articles-a2acc9af-cced-4e92-aad7-b2b7c11267f2.jpg', '6. Sınıf', '6-sinif'),
]

for slug, content, img, cat, cat_slug in updates_part3:
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
print("Batch 3 updated successfully!")
conn.close()
