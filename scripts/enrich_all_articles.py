import sqlite3

conn = sqlite3.connect('data/matemetrik.db')
cursor = conn.cursor()

articles = [
    # -------------------------------------------------------------
    # 1. KEÇİLERİN GÖZ BEBEKLERİ
    # -------------------------------------------------------------
    {
        'slug': 'kecilerin-goz-bebekleri-neden-dikdortgen-seklindedir',
        'title': 'Keçilerin Göz Bebekleri Neden Dikdörtgen Şeklindedir? Yatay Yarık Optiği ve Panoramik Görüş Bilimi',
        'category_id': 54, # Blog
        'featured_image': 'https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/keci.jpg?itok=SmehPuqB',
        'content': '''
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-indigo-50/90 via-slate-50 to-emerald-50/80 rounded-3xl border border-indigo-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-emerald-600 text-white text-xs font-black tracking-wide uppercase">
        🌿 Evrimsel Biyoloji &amp; Optik Bilimi
      </span>
      <span class="text-xs font-semibold text-slate-500">
        Doğa Araştırmaları Masası
      </span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-slate-900">
      Doğanın Panoramik Aynası: Keçilerde Yatay Dikdörtgen Göz Bebeklerinin Evrimsel Mantığı
    </h2>
    <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
      Bir keçinin gözlerine yakından baktığınızda, insanlardaki yuvarlak veya kedilerdeki dikey yarık göz bebeklerinden tamamen farklı bir yapıyla karşılaşırsınız: <strong>Yatay, dikdörtgen prizmasını andıran bir açıklık</strong>. Kaliforniya Üniversitesi Berkeley ve Durham Üniversitesi araştırmacılarının optik modellemeleri, bu geometrinin avcı tehditlerine karşı geliştirilmiş kusursuz bir panoramik savunma sistemi olduğunu ortaya koymuştur.
    </p>
  </div>

  <figure class="my-6 not-prose">
    <img src="https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/keci.jpg?itok=SmehPuqB" alt="Keçilerin Dikdörtgen Göz Bebekleri" class="w-full rounded-3xl shadow-lg border border-slate-200 object-cover max-h-[500px]" />
    <figcaption class="text-xs text-center text-slate-500 mt-2 font-medium">
      Görsel: Keçilerin yatay dikdörtgen pupillası, zemindeki ve ufuktaki ışık dalgalarını panoramik olarak retinaya odaklar.
    </figcaption>
  </figure>

  <div class="prose prose-slate max-w-none space-y-6">
    <h2>1. 270 Derecelik Kesintisiz Panoramik Görüş Alanı</h2>
    <p>
      İnsan gözü başını çevirmeden yaklaşık 180 derecelik bir görme açısına sahiptir ve bunun yalnızca merkezdeki 30-40 derecelik kısmı yüksek çözünürlüklü derinlik algısı sunar. Buna karşılık keçiler, koyunlar, atlar ve geyikler gibi otobur (av) memeliler, yatay göz bebekleri sayesinde <strong>başlarını hiçbir şekilde hareket ettirmeden 270 ila 320 derecelik</strong> bir alanı net bir şekilde görebilirler.
    </p>
    <p>
      Bu anatomik adaptasyon, arkalarından veya yan açıdan yaklaşan yırtıcı kurt, çakal ya da pars gibi tehlikeleri anında fark etmelerini sağlar. Yatay yarık şeklindeki açıklık, yatay düzlemdeki ışık miktarını maksimize ederken, gökyüzünden gelen ve retinayı kör edebilecek dik güneş ışınlarını doğal bir perde gibi süzer.
    </p>

    <h2>2. Sikloverjans (Cyclovergence) Mekanizması: Göz Yuvarlağının Bağımsız Dönüşü</h2>
    <p>
      Keçilerin göz yapısındaki en büyüleyici mühendislik harikası, başın pozisyonuna bağlı olarak göz bebeklerinin daima yer düzlemine (ufuk çizgisine) paralel kalmasıdır. Bir keçi sarp kayalıklarda otlarken başını 45 derece, 90 derece ya da tamamen aşağıya eğdiğinde, göz yuvarlağı göz çukurunun içinde <strong>50 dereceye varan açılarla bağımsız olarak döner (sikloverjans)</strong>.
    </p>
    <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
      <h3 class="text-base font-bold text-slate-900">💡 Neden Ufka Paralel Kalmak Zorundadır?</h3>
      <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
        Eğer göz bebeği başın eğimiyle birlikte dönseydi, dikdörtgen yarık dikey hale gelir ve yatay panoramik görüş sıfırlanırdı. Keçi ot yerken başı yerdeyken bile gözleri ufka paralel kaldığı için, ufuk çizgisinde beliren bir kurdu veya gökyüzündeki yırtıcı kartalı anında tespit edebilir. Bu yetenek, sarp kayalık arazilerde dengelerini kaybetmeden kaçabilmelerinin anahtarıdır.
      </p>
    </div>

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
'''
    },

    # -------------------------------------------------------------
    # 2. BİRDEN FAZLA DİL KONUŞMAK VE HAFIZA
    # -------------------------------------------------------------
    {
        'slug': 'birden-fazla-dil-konusmak-hafizayi-etkiler-mi',
        'title': 'Birden Fazla Dil Konuşmak Hafızayı ve Beyin Yapısını Nasıl Etkiler? Bilişsel Rezerv ve Nöroplastisite',
        'category_id': 54, # Blog
        'featured_image': 'https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/birden-fazla-dil-konusmak.jpg?itok=pP0AmAwe',
        'content': '''
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-indigo-50/90 via-slate-50 to-purple-50/80 rounded-3xl border border-indigo-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-purple-600 text-white text-xs font-black tracking-wide uppercase">
        🧠 Nörobilim &amp; Bilişsel Psikoloji
      </span>
      <span class="text-xs font-semibold text-slate-500">
        Beyin Araştırmaları Masası
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
      Görsel: İki dilli beyinde sol inferior parietal korteks ve dorsolateral prefrontal alanlarda sinirsel aktivite artışı gözlemlenir.
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
'''
    },

    # -------------------------------------------------------------
    # 3. MIKNATISTAN KAÇAN SALATALIK
    # -------------------------------------------------------------
    {
        'slug': 'miknatistan-kacan-salatalik',
        'title': 'Mıknatıstan Kaçan Salatalık Deneyi: Diyamanyetizma, Neodimyum Mıknatıslar ve Manyetik İtme Fiziği',
        'category_id': 54, # Blog
        'featured_image': 'https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/m%C4%B1knat%C4%B1stan%20ka%C3%A7an%20salatal%C4%B1k.jpg?itok=abWwGmPA',
        'content': '''
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-indigo-50/90 via-slate-50 to-blue-50/80 rounded-3xl border border-indigo-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-blue-600 text-white text-xs font-black tracking-wide uppercase">
        🧲 Uygulamalı Fizik &amp; Manyetizma
      </span>
      <span class="text-xs font-semibold text-slate-500">
        STEM Laboratuvarı
      </span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-slate-900">
      Mıknatıstan Kaçan Salatalık: Diyamanyetizmanın Görsel İspatı ve Lenz Kanunu
    </h2>
    <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
      Mıknatısların yalnızca demir, nikel ve kobalt gibi metalleri çektiğini düşünüyorsanız yanılıyorsunuz! Süper güçlü bir <strong>N52 neodimyum mıknatısı</strong> ince bir iple asılmış taze bir salatalığa yaklaştırdığınızda, salatalığın mıknatıstan gözle görülür biçimde kaçtığını fark edersiniz. Bu şaşırtıcı fizik fenomeninin arkasında yatan ilke <strong>diyamanyetizmadır</strong>.
    </p>
  </div>

  <figure class="my-6 not-prose">
    <img src="https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/m%C4%B1knat%C4%B1stan%20ka%C3%A7an%20salatal%C4%B1k.jpg?itok=abWwGmPA" alt="Mıknatıstan Kaçan Salatalık Deneyi" class="w-full rounded-3xl shadow-lg border border-slate-200 object-cover max-h-[500px]" />
    <figcaption class="text-xs text-center text-slate-500 mt-2 font-medium">
      Görsel: Güçlü manyetik alan gradyanı altında salatalık dokusundaki su moleküllerinin itilme deneyi.
    </figcaption>
  </figure>

  <div class="prose prose-slate max-w-none space-y-6">
    <h2>1. Manyetik Sınıflandırma: Ferromanyetik, Paramanyetik ve Diyamanyetik</h2>
    <p>
      Doğadaki tüm maddeler dış bir manyetik alana maruz kaldıklarında mikroskobik düzeyde farklı tepkiler verirler:
    </p>
    <ul>
      <li><strong>Ferromanyetik Maddeler:</strong> Demir, nikel ve kobalt gibi maddeler güçlü şekilde çekilir ve manyetik alanı korurlar.</li>
      <li><strong>Paramanyetik Maddeler:</strong> Alüminyum, oksijen ve platin gibi maddeler manyetik alana doğru çok zayıf bir çekim kuvveti hissederler.</li>
      <li><strong>Diyamanyetik Maddeler:</strong> Su, bakır, bizmut, altın ve karbon gibi maddeler <strong>dış manyetik alana tamamen zıt yönde</strong> zayıf bir manyetik alan üreterek mıknatıs tarafından itilirler!</li>
    </ul>

    <h2>2. Salatalık Neden İtiliyor? Suyun Gizli Gücü</h2>
    <p>
      Salatalığın yaklaşık <strong>%96'sı sudan</strong> oluşur. Su molekülündeki ($H_2O$) hidrojen ve oksijen atomlarının elektronları eşleşmiş (paired) durumdadır. Eşleşmiş elektronlara sahip atomlar harici bir manyetik alana girdiklerinde, <strong>Lenz Kanunu</strong> uyarınca elektronların yörüngesel hareketinde küçük bir kayma meydana gelir.
    </p>
    <p>
      Bu kayma, dış manyetik alana kesinlikle karşı koyan ters yönlü bir manyetik moment yaratır. Manyetik duyarlılık katsayısı ($\chi_m$) negatif olan su molekülleri, neodimyum mıknatısın güçlü manyetik alanından dışarıya doğru itilir. Salatalık kütlesinin ezici çoğunluğu su olduğu için, salatalığın tamamı mıknatıstan kaçar!
    </p>

    <h2>3. Adım Adım Deney Düzeneği ve Malzemeler</h2>
    <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
      <h3 class="text-base font-bold text-slate-900">Gerekli Malzemeler:</h3>
      <ul class="text-xs sm:text-sm text-slate-700 list-disc list-inside space-y-1">
        <li>1 adet taze, düzgün şekilli çengel salatalık (yaklaşık 10-15 cm)</li>
        <li>1 adet güçlü N50 veya N52 Neodimyum (NdFeB) blok mıknatıs</li>
        <li>İnce dikiş ipliği veya misina</li>
        <li>Destek çubuğu veya askılık</li>
        <li>Hava akımını kesmek için şeffaf bir fanus veya plastik kutu</li>
      </ul>
      <h3 class="text-base font-bold text-slate-900 pt-2">Uygulama Basamakları:</h3>
      <ol class="text-xs sm:text-sm text-slate-700 list-decimal list-inside space-y-1.5">
        <li>Salatalığı ağırlık merkezinden dikkatlice iple bağlayın ve yatay olarak dengede asılı kalmasını sağlayın.</li>
        <li>Havadaki en ufak bir esinti deneyi bozabileceği için salatalığın tamamen hareketsizleşmesini bekleyin.</li>
        <li>Neodimyum mıknatısı salatalığın ucuna <strong>kesinlikle dokundurmadan</strong> 2-3 mm yaklaştırın.</li>
        <li>Mıknatısı sabit tuttuğunuzda salatalığın yavaşça mıknatıstan uzaklaşarak dönmeye başladığını gözlemleyin! Mıknatısı takip ettirdikçe salatalık ters yönde hızlanacaktır.</li>
      </ol>
    </div>

    <h2>4. Kurbağayı Havada Uçuran Nobel Ödüllü Deney</h2>
    <p>
      Diyamanyetizma yalnızca salatalıkla sınırlı değildir. 2000 yılında Andre Geim ve Michael Berry, 16 Tesla gücünde devasa bir süperiletken mıknatıs kullanarak yaşayan bir kurbağayı havada asılı tutmayı (manyetik levitasyon) başardılar. Kurbağa da tıpkı salatalık gibi yüksek oranda sudan oluştuğu için, suyun oluşturduğu diyamanyetik itme kuvveti yerçekimi kuvvetini ($F_k = m \cdot g$) tam olarak sıfırladı. Bu çalışma, Andre Geim'e meşhur Ig Nobel Ödülü'nü kazandırmıştır (Geim daha sonra grafeni keşfederek gerçek Nobel Fizik Ödülü'nü de almıştır).
    </p>

    <div class="p-5 bg-blue-50/80 rounded-2xl border border-blue-200 mt-6 space-y-3">
      <h3 class="text-sm font-bold text-blue-900">🔗 İlgili Fizik Kaynakları &amp; Platform İçi Okumalar</h3>
      <p class="text-xs text-slate-700">
        Manyetizma ve modern fizik konularında derinleşmek için bağlantıları takip edebilirsiniz:
      </p>
      <ul class="text-xs space-y-1.5 list-disc list-inside text-blue-700 font-medium">
        <li><a href="https://bilimgenc.tubitak.gov.tr" target="_blank" rel="noopener noreferrer" class="underline hover:text-blue-900">TÜBİTAK Bilim Genç: Mıknatısların Manyetik Alan Etkileri</a></li>
        <li><a href="https://aapt.scitation.org/journal/ajp" target="_blank" rel="noopener noreferrer" class="underline hover:text-blue-900">American Journal of Physics: Diamagnetic levitation demonstrations</a></li>
        <li><a href="/post/11-sinif-fizik-2-unite-elektrik-ve-manyetizma-cevaplari-meb" class="underline hover:text-blue-900">Sitemizden: 11. Sınıf Fizik Elektrik ve Manyetizma Sayfa Çözümleri</a></li>
        <li><a href="/post/edison-ve-teslanin-alternatif-akim-ve-dogru-akim-karsilastirmasi" class="underline hover:text-blue-900">Sitemizden: Edison ve Tesla'nın Akım Savaşları: AC ve DC Manyetik İndüksiyon</a></li>
      </ul>
    </div>
  </div>
</div>
'''
    },

    # -------------------------------------------------------------
    # 4. ALKALİ METAL TEPKİME DENEYİ
    # -------------------------------------------------------------
    {
        'slug': 'alkali-metal-tepkime-deneyi',
        'title': 'Alkali Metallerin Su ile Şiddetli Tepkimesi: Periyodik Tablo 1A Grubu, Ekzotermik Reaksiyonlar ve Deney Analizi',
        'category_id': 54, # Blog
        'featured_image': 'https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/periyodik_tablo_2.jpg?itok=eXCQnaXc',
        'content': '''
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-amber-50/90 via-slate-50 to-orange-50/80 rounded-3xl border border-amber-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-amber-600 text-white text-xs font-black tracking-wide uppercase">
        ⚗️ Kimyasal Tepkimeler &amp; İnorganik Kimya
      </span>
      <span class="text-xs font-semibold text-slate-500">
        Kimya Laboratuvarı İncelemesi
      </span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-slate-900">
      1A Grubunun Patlayıcı Dansı: Alkali Metallerin Su ile Reaksiyon Mekanizması
    </h2>
    <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
      Periyodik tablonun en sol sütununda yer alan <strong>1A grubu alkali metalleri (Lityum, Sodyum, Potasyum, Rubidyum, Sezyum)</strong> kimya dünyasının en reaktif elementleridir. Bir parça saf sodyum veya potasyum metali suya bırakıldığında, anında eriyerek küre haline gelir, suyun üzerinde hızla kayar, parlak alevler saçar ve şiddetli bir patlamayla hidrojen gazı açığa çıkarır.
    </p>
  </div>

  <figure class="my-6 not-prose">
    <img src="https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/periyodik_tablo_2.jpg?itok=eXCQnaXc" alt="Alkali Metal ve Periyodik Tablo" class="w-full rounded-3xl shadow-lg border border-slate-200 object-cover max-h-[500px]" />
    <figcaption class="text-xs text-center text-slate-500 mt-2 font-medium">
      Görsel: Periyodik tabloda grupta yukarıdan aşağıya inildikçe iyonlaşma enerjisi düşer ve reaktiflik katlanarak artar.
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
'''
    },

    # -------------------------------------------------------------
    # 5. SUYU FOKURDATAN İLAÇ EFERVESAN
    # -------------------------------------------------------------
    {
        'slug': 'suyu-fokurdatan-ilac-efervesan',
        'title': 'Suyu Fokurdatan Efervesan Tablet Deneyi: Asit-Baz Tepkimesi, Karbondioksit Gazı ve Reaksiyon Hızı Faktörleri',
        'category_id': 54, # Blog
        'featured_image': 'https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/efervasan%20tablet%20deneyi.jpg?itok=vIskGRgT',
        'content': '''
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-teal-50/90 via-slate-50 to-emerald-50/80 rounded-3xl border border-teal-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-teal-600 text-white text-xs font-black tracking-wide uppercase">
        🫧 Kimyasal Kinetik &amp; Gaz Çıkışı
      </span>
      <span class="text-xs font-semibold text-slate-500">
        Eğlenceli Fen Deneyleri
      </span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-slate-900">
      Efervesan Tabletin Kimyası: Katı Halde Suskun, Suda Coşkulu Asit-Baz Tepkimesi
    </h2>
    <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
      C vitamini veya ağrı kesici efervesan tabletleri ambalajında kuru bir şekilde aylarca hiçbir tepkimeye girmeden saklanabilir. Ancak bir bardak suya attığınız anda ortam birdenbire kaynıyormuş gibi fokurdamaya başlar. Katı halde yan yana dururken tepki vermeyen bu maddeleri suya girince canlandıran mekanizma nedir?
    </p>
  </div>

  <figure class="my-6 not-prose">
    <img src="https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/efervasan%20tablet%20deneyi.jpg?itok=vIskGRgT" alt="Efervesan Tablet Deneyi" class="w-full rounded-3xl shadow-lg border border-slate-200 object-cover max-h-[500px]" />
    <figcaption class="text-xs text-center text-slate-500 mt-2 font-medium">
      Görsel: Çözünen efervesan tabletten ayrışan karbondioksit (CO2) mikro kabarcıklarının yükselişi.
    </figcaption>
  </figure>

  <div class="prose prose-slate max-w-none space-y-6">
    <h2>1. Reaksiyonun Kimyasal Formülü: Bikarbonat ve Sitrik Asit</h2>
    <p>
      Efervesan tabletlerin temelini iki ana bileşen oluşturur: <strong>Sodyum bikarbonat ($NaHCO_3$)</strong> (bazik bileşen) ve <strong>sitrik asit ($C_6H_8O_7$)</strong> (asidik bileşen).
    </p>
    <p>
      Katı fazda iyonlar kristal kafes yapılarına sıkı sıkıya bağlıdır ve hareket edemezler. Su eklendiğinde ise suyun polar yapısı bu molekülleri çözer, iyonlar serbest kalır ve klasik asit-baz nötrleşme tepkimesi tetiklenir:
    </p>
    <div class="p-4 bg-slate-900 text-white font-mono text-sm rounded-2xl text-center shadow-inner">
      3 NaHCO₃(suda) + C₆H₈O₇(suda) ➔ Na₃C₆H₅O₇(suda) + 3 H₂O(s) + 3 CO₂(g) ↑
    </div>
    <p>
      Açığa çıkan <strong>Karbondioksit ($CO_2$) gazı</strong>, suda doymuşluk sınırını hızla aşarak binlerce küçük mikro-kabarcık halinde yüzeye doğru hücum eder ve fokurdama sesini oluşturur.
    </p>

    <h2>2. Tepkime Hızını Etkileyen Faktörlerin Test Edilmesi</h2>
    <p>
      Efervesan tablet deneyi, lise ve ortaokul kimya derslerindeki <em>kimyasal tepkime hızı faktörlerini</em> anlamak için en mükemmel pratik laboratuvar aracıdır:
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
      <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <h3 class="text-sm font-bold text-slate-900">🌡️ Sıcaklığın Etkisi</h3>
        <p class="text-xs text-slate-700">
          Sıcak suda taneciklerin kinetik enerjisi ($E_k = \frac{3}{2}kT$) yüksektir. Çarpışma teorisine göre etkin çarpışma sayısı katlandığı için sıcak sudaki tablet 15 saniyede tükenirken, soğuk sudaki tabletin çözünmesi 60 saniyeden uzun sürer.
        </p>
      </div>
      <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <h3 class="text-sm font-bold text-slate-900">🧱 Temas Yüzeyinin Etkisi</h3>
        <p class="text-xs text-slate-700">
          Bir tableti bütün halinde, diğer tableti ise havanda toz haline getirip attığınızda; toz halindeki tabletin suyla temas eden yüzey alanı devasa oranda arttığı için anlık bir gaz patlamasıyla çok daha hızlı çözünür.
        </p>
      </div>
    </div>

    <h2>3. Eğlenceli STEM Deneyi: Ev Yapımı Lav Lambası</h2>
    <p>
      Efervesan tablet kullanarak evde büyüleyici bir lav lambası yapabilirsiniz:
    </p>
    <ol>
      <li>Şeffaf bir şişenin 1/4'ünü suyla, kalan 3/4'ünü ise sıvı yağ (zeytinyağı veya ayçiçek yağı) ile doldurun. Yağın yoğunluğu sudan küçük olduğu için yağ üstte kalacaktır.</li>
      <li>Suya birkaç damla gıda boyası damlatın (boya yağda çözünmez, doğrudan suya geçerek renklendirir).</li>
      <li>Bir adet efervesan tableti kırarak şişenin içine atın.</li>
      <li>Tablet dipteki suyla tepkimeye girip $CO_2$ gazı üretir. Gaz kabarcıkları renkli su damlalarına tutunarak yoğunluklarını düşürür ve onları yağın üstüne taşır. Yüzeyde gaz havaya karışınca ağırlaşan renkli damlalar tekrar dibe çöker!</li>
    </ol>

    <div class="p-5 bg-teal-50/80 rounded-2xl border border-teal-200 mt-6 space-y-3">
      <h3 class="text-sm font-bold text-teal-900">🔗 İlgili Kimya Kaynakları &amp; Platform İçi Okumalar</h3>
      <p class="text-xs text-slate-700">
        Reaksiyon kinetiği ve eğlenceli deneyler hakkında faydalı bağlantılar:
      </p>
      <ul class="text-xs space-y-1.5 list-disc list-inside text-teal-700 font-medium">
        <li><a href="https://bilimgenc.tubitak.gov.tr" target="_blank" rel="noopener noreferrer" class="underline hover:text-teal-900">TÜBİTAK Bilim Genç: Gaz Basıncı ve Asit-Baz Deneyleri</a></li>
        <li><a href="/post/alkali-metal-tepkime-deneyi" class="underline hover:text-teal-900">Sitemizden: Alkali Metal Tepkime Deneyi: Ekzotermik Reaksiyonlar</a></li>
        <li><a href="/post/gunes-firini-yapalim" class="underline hover:text-teal-900">Sitemizden: Evde Güneş Fırını Yapımı: Sera Etkisi ve Termal Enerji</a></li>
      </ul>
    </div>
  </div>
</div>
'''
    },

    # -------------------------------------------------------------
    # 6. GÜNEŞ FIRINI YAPALIM
    # -------------------------------------------------------------
    {
        'slug': 'gunes-firini-yapalim',
        'title': 'Evde Güneş Fırını Yapımı: Sera Etkisi, Yansıtıcı Yüzeyler ve Güneş Enerjisini Isıya Dönüştüren STEM Projesi',
        'category_id': 54, # Blog
        'featured_image': 'https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/g%C3%BCne%C5%9F%20f%C4%B1r%C4%B1n%C4%B1_0.jpg?itok=pmvHwVnA',
        'content': '''
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-amber-50/90 via-slate-50 to-yellow-50/80 rounded-3xl border border-amber-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-amber-600 text-white text-xs font-black tracking-wide uppercase">
        ☀️ Yenilenebilir Enerji &amp; STEM Tasarımı
      </span>
      <span class="text-xs font-semibold text-slate-500">
        Tasarla ve Yap Köşesi
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
      Görsel: Yansıtıcı kanatlar ve siyah tabanlı ısı tutucu hazne ile tasarlanan güneş fırını prototipi.
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
'''
    },

    # -------------------------------------------------------------
    # 7. RÜZGÂR TÜRBİNİ NASIL YAPILIR
    # -------------------------------------------------------------
    {
        'slug': 'ruzgar-turbini-nasil-yapilir',
        'title': 'Rüzgâr Türbini Nasıl Yapılır? Kinetik Enerjiden Elektriğe Dönüşüm, Aerodinamik Kanat Tasarımı ve STEM Projesi',
        'category_id': 54, # Blog
        'featured_image': 'https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/ETK%C4%B0NL%C4%B0K%20G%C3%96RSEL%202_0.jpg?itok=YZEqfWqE',
        'content': '''
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-cyan-50/90 via-slate-50 to-blue-50/80 rounded-3xl border border-cyan-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-cyan-600 text-white text-xs font-black tracking-wide uppercase">
        💨 Temiz Enerji &amp; Elektromekanik
      </span>
      <span class="text-xs font-semibold text-slate-500">
        Mühendislik ve STEM Masası
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
      Görsel: Aerodinamik kanat profili ve DC jeneratör miline bağlı rüzgâr türbini test prototipi.
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
'''
    },

    # -------------------------------------------------------------
    # 8. BİYOTAKLİT (BİYOMİMİKRİ)
    # -------------------------------------------------------------
    {
        'slug': 'biyotaklit-biyomimikri-nedir-dogadan-ilham-alan-muhendislik-ve-mimari-tasarimlar',
        'title': 'Biyotaklit (Biyomimikri) Nedir? Doğadan İlham Alan Çığır Açıcı Mühendislik, Mimari ve Teknoloji Tasarımları',
        'category_id': 54, # Blog
        'featured_image': 'https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/biyotaklit.jpg?itok=bvy0T4gK',
        'content': '''
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-emerald-50/90 via-slate-50 to-teal-50/80 rounded-3xl border border-emerald-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-emerald-600 text-white text-xs font-black tracking-wide uppercase">
        🌱 Doğa &amp; İleri Mühendislik
      </span>
      <span class="text-xs font-semibold text-slate-500">
        Biyomimikri Dosyası
      </span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-slate-900">
      Doğanın 3.8 Milyar Yıllık Ar-Ge Arşivi: Biyotaklit Teknolojiyi Nasıl Dönüştürüyor?
    </h2>
    <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
      Canlılar dünyası, 3.8 milyar yıllık evrim süreci boyunca aşırı soğuklar, su kıtlığı, aerodinamik sürtünme ve malzeme mukavemeti gibi tüm mühendislik problemlerini en az enerjiyle çözen olağanüstü tasarımlar geliştirmiştir. <strong>Biyotaklit (Biyomimikri)</strong>, doğanın bu kusursuz patentlerini inceleyerek insan yapımı teknolojilere uyarlayan modern bilim dalıdır.
    </p>
  </div>

  <figure class="my-6 not-prose">
    <img src="https://bilimgenc.tubitak.gov.tr/sites/default/files/styles/bp-770px-custom_user_desktop_1x/public/biyotaklit.jpg?itok=bvy0T4gK" alt="Biyotaklit Doğadan Mühendisliğe" class="w-full rounded-3xl shadow-lg border border-slate-200 object-cover max-h-[500px]" />
    <figcaption class="text-xs text-center text-slate-500 mt-2 font-medium">
      Görsel: Yalıçapkını kuşunun gagasından ilham alan Şinkansen hızlı tren burun tasarımı.
    </figcaption>
  </figure>

  <div class="prose prose-slate max-w-none space-y-6">
    <h2>1. Şinkansen Hızlı Treni ve Yalıçapkını Gagası</h2>
    <p>
      1990'larda Japon mühendisler, saatte 300 km hızla giden Şinkansen hızlı trenlerinin tünellerden çıkarken oluşturduğu şiddetli patlama sesinden (tünel bomu) muzdaripti. Tren dar tünele girdiğinde önündeki havayı sıkıştırarak bir şok dalgası yaratıyor ve tünel çıkışında 400 metre ötedeki evlerin camlarını titretiyordu.
    </p>
    <p>
      Genel mühendis Eiji Nakatsu (aynı zamanda bir kuş gözlemcisiydi), <strong>yalıçapkını (kingfisher)</strong> kuşunun havadan suya dalarken neredeyse tek bir damla bile sıçratmadığını fark etti. Kuşun gagasının aerodinamik konik geometrisi incelenerek trenin burnu bu şekilde yeniden tasarlandı. Sonuç: Tünel patlama sesi tamamen yok oldu, hava sürtünmesi %30 azaldı ve tren %10 daha az elektrik tüketmeye başladı!
    </p>

    <h2>2. Pıtrak Otu ve Cırt Cırt Bant (Velcro)</h2>
    <p>
      1941 yılında İsviçreli mühendis George de Mestral, köpeğiyle yaptığı doğa yürüyüşünden sonra köpeğinin tüylerine ve pantolonuna yapışan pıtrak otu tohumlarını mikroskop altında inceledi. Tohumların uçlarında binlerce minik elastik kanca (çengel) olduğunu gördü. Bu kancalar kumaşın liflerine tutunuyordu.
    </p>
    <p>
      Mestral bu ilkeyi naylon kumaş üzerinde uygulayarak bir tarafı minik kancalardan, diğer tarafı minik ilmeklerden oluşan <strong>Velcro (Cırt Cırt)</strong> bandı icat etti. Günümüzde astronot giysilerinden spor ayakkabılara kadar milyarlarca üründe kullanılmaktadır.
    </p>

    <h2>3. Lotus Yaprağı Etkisi ve Kendini Temizleyen Nanoteknoloji</h2>
    <p>
      Çamurlu bataklıklarda yetişen Lotus (Nilüfer) çiçeği yapraklarının daima tertemiz ve kuru kaldığı bilinir. Elektron mikroskobuyla incelendiğinde, yaprak yüzeyinde mikroskobik balmumu tepecikleri (nanoyapılar) olduğu keşfedilmiştir.
    </p>
    <p>
      Bu tepecikler su damlalarının yaprağa yayılmasını engeller; su damlası mükemmel bir küre oluşturarak yüzeyde yuvarlanır. Yuvarlanırken yaprak üzerindeki tüm toz ve kir taneciklerini de beraberinde süpürür. Bilim insanları bu <em>süperhidrofobik</em> yapıyı kopyalayarak leke tutmayan kumaşlar, kendini temizleyen bina boyaları ve yağmurda buğu yapmayan araba camları geliştirdiler.
    </p>

    <h2>4. Termit Yuvaları ve Doğal Klimalı Binalar</h2>
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
'''
    },

    # -------------------------------------------------------------
    # 9. 11. SINIF FİZİK SORUMLULUK SINAVI
    # -------------------------------------------------------------
    {
        'slug': '11-sinif-fizik-sorumluluk-sinavi-sorulari-ve-cevap-anahtari-word-indir',
        'title': '11. Sınıf Fizik Sorumluluk Sınavı Soruları ve Çözümlü Cevap Anahtarı (2024-2025 Maarif Modeli Word & PDF)',
        'category_id': 11, # 11. Sınıf
        'featured_image': 'https://www.etkinlikpaylas.com/wp-content/uploads/2026/09/fiz11cevapan_970E24FF-9962-477F-8E12-99E81184069F-compressed.pdf',
        'content': '''
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-indigo-50/90 via-slate-50 to-blue-50/80 rounded-3xl border border-indigo-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-indigo-600 text-white text-xs font-black tracking-wide uppercase">
        🎓 11. Sınıf Fizik Sorumluluk Sınavı
      </span>
      <span class="text-xs font-semibold text-slate-500">
        MEB &amp; Maarif Modeli Tam Uyumlu
      </span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-slate-900">
      11. Sınıf Fizik Dersi Sorumluluk ve Telafi Sınavı Soruları ile Ayrıntılı Cevap Anahtarı
    </h2>
    <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
      Millî Eğitim Bakanlığı Ortaöğretim Kurumları Yönetmeliği uyarınca düzenlenen 11. sınıf fizik sorumluluk sınavı için hazırlanmış 10 açık uçlu klasik soru, adım adım işlem basamakları, formülleri ve puan baremi aşağıda sunulmuştur.
    </p>

    <div class="mt-4 pt-4 border-t border-indigo-200/60 flex flex-wrap items-center justify-between gap-3">
      <div class="text-xs text-slate-600">
        📄 Format: <strong>Microsoft Word (.docx) &amp; A4 Yazdırılabilir</strong> &bull; Boyut: <strong>188 KB</strong>
      </div>
      <a href="/uploads/11_sinif_fizik_sorumluluk_sinavi_maarif_modeli_guncel.docx" download="11-Sinif-Fizik-Sorumluluk-Sinavi.docx" class="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all shrink-0">
        📥 Sınav Kağıdını Word (.docx) Olarak İndir
      </a>
    </div>
  </div>

  <div class="prose prose-slate max-w-none space-y-6">
    <h2>Sınav Soru Metinleri ve Adım Adım Çözümleri</h2>

    <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
      <h3 class="text-base font-bold text-slate-900">Soru 1 (Vektörler - 10 Puan)</h3>
      <p class="text-xs sm:text-sm text-slate-700">
        Aynı düzlemde bulunan $\vec{A}$ ve $\vec{B}$ vektörlerinin büyüklükleri sırasıyla $6\text{ N}$ ve $8\text{ N}$ olup aralarındaki açı $90^\circ$'dir. Bileşke vektörün büyüklüğünü bulunuz.
      </p>
      <div class="p-3 bg-slate-50 rounded-xl text-xs sm:text-sm text-slate-800 border-l-4 border-indigo-500 space-y-1">
        <strong>Çözüm:</strong> Pisagor bağıntısından $R = \sqrt{A^2 + B^2} = \sqrt{6^2 + 8^2} = \sqrt{36 + 64} = \sqrt{100} = 10\text{ N}$.<br>
        <strong>Puanlama:</strong> Formül (4 puan), İşlem (4 puan), Birim (2 puan).
      </div>
    </div>

    <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
      <h3 class="text-base font-bold text-slate-900">Soru 2 (Bağıl Hareket - 10 Puan)</h3>
      <p class="text-xs sm:text-sm text-slate-700">
        Akıntı hızının doğu yönünde $v_a = 3\text{ m/s}$ olduğu bir nehirde, suya göre hızı kuzey yönünde $v_y = 4\text{ m/s}$ olan bir yüzücünün yere göre hızının büyüklüğünü ve yönünü bulunuz.
      </p>
      <div class="p-3 bg-slate-50 rounded-xl text-xs sm:text-sm text-slate-800 border-l-4 border-indigo-500 space-y-1">
        <strong>Çözüm:</strong> $\vec{v}_{\text{yer}} = \vec{v}_y + \vec{v}_a$. Vektörler dik olduğundan $v_{\text{yer}} = \sqrt{3^2 + 4^2} = 5\text{ m/s}$. Yön: Kuzeydoğu yönünde $\tan\theta = \frac{4}{3}$ açısıyla.<br>
        <strong>Puanlama:</strong> Vektörel toplama kuralı (5 puan), Sonuç (5 puan).
      </div>
    </div>

    <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
      <h3 class="text-base font-bold text-slate-900">Soru 3 (Newton'ın Hareket Yasaları - 10 Puan)</h3>
      <p class="text-xs sm:text-sm text-slate-700">
        Kütlesi $m = 4\text{ kg}$ olan bir cisme yatay sürtünmesiz düzlemde $F = 20\text{ N}$'luk yatay kuvvet uygulanıyor. Cismin kazanacağı ivmeyi bulunuz.
      </p>
      <div class="p-3 bg-slate-50 rounded-xl text-xs sm:text-sm text-slate-800 border-l-4 border-indigo-500 space-y-1">
        <strong>Çözüm:</strong> $F_{\text{net}} = m \cdot a \Rightarrow 20 = 4 \cdot a \Rightarrow a = 5\text{ m/s}^2$.<br>
        <strong>Puanlama:</strong> $F=m \cdot a$ formülü (4 puan), İşlem ve birim (6 puan).
      </div>
    </div>

    <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
      <h3 class="text-base font-bold text-slate-900">Soru 4 (İki Boyutta Hareket / Atışlar - 10 Puan)</h3>
      <p class="text-xs sm:text-sm text-slate-700">
        $h = 80\text{ m}$ yüksekliğindeki bir uçurumdan yatay olarak $v_0 = 30\text{ m/s}$ hızla atılan bir cismin yere düşme süresini ve yatayda alacağı yolu (menzil) hesaplayınız ($g = 10\text{ m/s}^2$).
      </p>
      <div class="p-3 bg-slate-50 rounded-xl text-xs sm:text-sm text-slate-800 border-l-4 border-indigo-500 space-y-1">
        <strong>Çözüm:</strong> Düşeyde serbest düşme yapar: $h = \frac{1}{2}gt^2 \Rightarrow 80 = 5t^2 \Rightarrow t^2 = 16 \Rightarrow t = 4\text{ saniye}$.<br>
        Yatayda sabit hızlı hareket yapar: $x = v_0 \cdot t = 30 \cdot 4 = 120\text{ metre}$.<br>
        <strong>Puanlama:</strong> Süre hesabı (5 puan), Menzil hesabı (5 puan).
      </div>
    </div>

    <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
      <h3 class="text-base font-bold text-slate-900">Soru 5 (İtme ve Çizgisel Momentum - 10 Puan)</h3>
      <p class="text-xs sm:text-sm text-slate-700">
        $m = 2\text{ kg}$ kütleli bir cisim $v_1 = 10\text{ m/s}$ hızla giderken duvara çarpıp aynı doğrultuda $v_2 = -8\text{ m/s}$ hızla geri dönüyor. Duvarın cisme uyguladığı itmeyi ($I$) bulunuz.
      </p>
      <div class="p-3 bg-slate-50 rounded-xl text-xs sm:text-sm text-slate-800 border-l-4 border-indigo-500 space-y-1">
        <strong>Çözüm:</strong> $I = \Delta P = P_{\text{son}} - P_{\text{ilk}} = m \cdot v_2 - m \cdot v_1 = 2 \cdot (-8) - 2 \cdot 10 = -16 - 20 = -36\text{ N}\cdot\text{s}$. Büyüklüğü $36\text{ N}\cdot\text{s}$'dir.<br>
        <strong>Puanlama:</strong> Momentum değişimi formülü (5 puan), İşaret ve büyüklük (5 puan).
      </div>
    </div>

    <div class="p-5 bg-indigo-50/80 rounded-2xl border border-indigo-200 mt-6 space-y-3">
      <h3 class="text-sm font-bold text-indigo-900">🔗 İlgili Kaynaklar &amp; Platform İçi Okumalar</h3>
      <ul class="text-xs space-y-1.5 list-disc list-inside text-indigo-700 font-medium">
        <li><a href="/post/11-sinif-fizik-ders-kitabi-cevaplari-meb-pdf" class="underline hover:text-indigo-900">11. Sınıf Fizik MEB Ders Kitabı Tam Cevap Anahtarı (67 Sayfa PDF)</a></li>
        <li><a href="/post/11-sinif-fizik-atislar-konusu-cozumlu-sorular-ve-test-dokumani-pdf" class="underline hover:text-indigo-900">11. Sınıf Fizik Atışlar Konusu Çözümlü Soru Bankası</a></li>
        <li><a href="/post/11-sinif-fizik-1-unite-kuvvet-ve-hareket-cevaplari-meb" class="underline hover:text-indigo-900">11. Sınıf Fizik 1. Ünite Kuvvet ve Hareket Detaylı Sayfa Çözümleri</a></li>
      </ul>
    </div>
  </div>
</div>
'''
    },

    # -------------------------------------------------------------
    # 10. 11. SINIF FİZİK ATIŞLAR KONUSU
    # -------------------------------------------------------------
    {
        'slug': '11-sinif-fizik-atislar-konusu-cozumlu-sorular-ve-test-dokumani-pdf',
        'title': '11. Sınıf Fizik Atış Hareketleri: Serbest Düşme, Yatay ve Eğik Atış Çözümlü Soru Bankası ve Formül Kağıdı (PDF)',
        'category_id': 11, # 11. Sınıf
        'featured_image': 'https://www.etkinlikpaylas.com/wp-content/uploads/2026/09/fiz11cevapan_970E24FF-9962-477F-8E12-99E81184069F-compressed.pdf',
        'content': '''
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-indigo-50/90 via-slate-50 to-blue-50/80 rounded-3xl border border-indigo-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-blue-600 text-white text-xs font-black tracking-wide uppercase">
        🎯 11. Sınıf Fizik &amp; YKS AYT Hazırlık
      </span>
      <span class="text-xs font-semibold text-slate-500">
        Konu Özeti ve Test Arşivi
      </span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-slate-900">
      İki Boyutta Sabit İvmeli Hareket: Atış Hareketleri Formül Tablosu ve Detaylı Çözümlü Sorular
    </h2>
    <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
      Yerçekimi ivmesi ($g \approx 10\text{ m/s}^2$) etkisinde sürtünmesiz ortamda gerçekleşen serbest düşme, düşey atış, yatay atış ve eğik atış hareketlerinin tüm matematiksel denklemleri ve adım adım soru çözümleri.
    </p>

    <div class="mt-4 pt-4 border-t border-indigo-200/60 flex flex-wrap items-center justify-between gap-3">
      <div class="text-xs text-slate-600">
        📄 Doküman: <strong>Çözümlü Test Dokümanı (PDF)</strong> &bull; Boyut: <strong>3.0 MB</strong>
      </div>
      <a href="/uploads/atislar-cozumlu-sorular.pdf" download="11-Sinif-Fizik-Atislar-Cozumlu-Sorular.pdf" class="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all shrink-0">
        📥 Çözümlü Test Dokümanını (PDF) İndir
      </a>
    </div>
  </div>

  <div class="prose prose-slate max-w-none space-y-6">
    <h2>1. Atış Hareketleri Formül Kartı</h2>
    <div class="overflow-x-auto not-prose">
      <table class="w-full text-left border-collapse bg-white rounded-2xl shadow-sm border border-slate-200">
        <thead>
          <tr class="bg-slate-100 text-slate-800 text-xs font-bold uppercase">
            <th class="p-3 border-b">Hareket Türü</th>
            <th class="p-3 border-b">Hız Denklemi</th>
            <th class="p-3 border-b">Konum / Yükseklik Denklemi</th>
            <th class="p-3 border-b">Zamansız Hız Denklemi</th>
          </tr>
        </thead>
        <tbody class="text-xs sm:text-sm text-slate-700 divide-y divide-slate-100 font-mono">
          <tr>
            <td class="p-3 font-semibold font-sans text-slate-900">Serbest Düşme</td>
            <td class="p-3">v = g · t</td>
            <td class="p-3">h = ½ · g · t² (h, 3h, 5h, 7h)</td>
            <td class="p-3">v² = 2 · g · h</td>
          </tr>
          <tr>
            <td class="p-3 font-semibold font-sans text-slate-900">Aşağı Düşey Atış</td>
            <td class="p-3">v = v₀ + g · t</td>
            <td class="p-3">h = v₀ · t + ½ · g · t²</td>
            <td class="p-3">v² = v₀² + 2 · g · h</td>
          </tr>
          <tr>
            <td class="p-3 font-semibold font-sans text-slate-900">Yukarı Düşey Atış</td>
            <td class="p-3">v = v₀ - g · t</td>
            <td class="p-3">h = v₀ · t - ½ · g · t²</td>
            <td class="p-3">v² = v₀² - 2 · g · h</td>
          </tr>
          <tr>
            <td class="p-3 font-semibold font-sans text-slate-900">Yatay Atış</td>
            <td class="p-3">v_x = v₀ (sabit), v_y = g · t</td>
            <td class="p-3">x = v₀ · t, h = ½ · g · t²</td>
            <td class="p-3">v = √(v_x² + v_y²)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>2. Çözümlü Örnek Sorular</h2>
    <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
      <h3 class="text-base font-bold text-slate-900">Örnek Soru 1 (Yatay Atış Hız Vektörü)</h3>
      <p class="text-xs sm:text-sm text-slate-700">
        Yerden $45\text{ m}$ yükseklikten $v_0 = 40\text{ m/s}$ hızla yatay atılan bir cismin yere çarpma anındaki hızının büyüklüğünü hesaplayınız ($g = 10\text{ m/s}^2$).
      </p>
      <div class="p-3 bg-slate-50 rounded-xl text-xs sm:text-sm text-slate-800 border-l-4 border-indigo-500 space-y-1">
        <strong>Çözüm:</strong><br>
        1. Düşeyde serbest düşme süresi: $h = \frac{1}{2}gt^2 \Rightarrow 45 = 5t^2 \Rightarrow t^2 = 9 \Rightarrow t = 3\text{ s}$.<br>
        2. Düşey hız bileşeni: $v_y = g \cdot t = 10 \cdot 3 = 30\text{ m/s}$.<br>
        3. Yatay hız bileşeni değişmez: $v_x = 40\text{ m/s}$.<br>
        4. Yere çarpma hızı: $v = \sqrt{v_x^2 + v_y^2} = \sqrt{40^2 + 30^2} = \sqrt{1600 + 900} = \sqrt{2500} = 50\text{ m/s}$.
      </div>
    </div>

    <div class="p-5 bg-indigo-50/80 rounded-2xl border border-indigo-200 mt-6 space-y-3">
      <h3 class="text-sm font-bold text-indigo-900">🔗 İlgili Kaynaklar &amp; Platform İçi Okumalar</h3>
      <ul class="text-xs space-y-1.5 list-disc list-inside text-indigo-700 font-medium">
        <li><a href="/post/11-sinif-fizik-sorumluluk-sinavi-sorulari-ve-cevap-anahtari-word-indir" class="underline hover:text-indigo-900">11. Sınıf Fizik Sorumluluk Sınavı Word Dokümanı</a></li>
        <li><a href="/post/11-sinif-fizik-1-unite-kuvvet-ve-hareket-cevaplari-meb" class="underline hover:text-indigo-900">11. Sınıf Fizik 1. Ünite Kuvvet ve Hareket Sayfa Çözümleri</a></li>
      </ul>
    </div>
  </div>
</div>
'''
    },

    # -------------------------------------------------------------
    # 11. 10. SINIF FİZİK 1. DÖNEM 2. YAZILI
    # -------------------------------------------------------------
    {
        'slug': '10-sinif-fizik-1-donem-2-yazili-sorulari-ve-cevap-anahtari-word-pdf',
        'title': '10. Sınıf Fizik 1. Dönem 2. Yazılı Soruları ve Cevap Anahtarı (2024-2025 MEB Maarif Modeli Word İndir)',
        'category_id': 10, # 10. Sınıf
        'featured_image': 'https://www.etkinlikpaylas.com/wp-content/uploads/2026/09/fiz11cevapan_970E24FF-9962-477F-8E12-99E81184069F-compressed.pdf',
        'content': '''
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-indigo-50/90 via-slate-50 to-blue-50/80 rounded-3xl border border-indigo-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-indigo-600 text-white text-xs font-black tracking-wide uppercase">
        📝 10. Sınıf Fizik Ortak Yazılı
      </span>
      <span class="text-xs font-semibold text-slate-500">
        MEB Maarif Modeli 1. Dönem 2. Sınav
      </span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-slate-900">
      10. Sınıf Fizik 1. Dönem 2. Yazılı Sınavı Hazırlık Dokümanı ve Cevap Anahtarı
    </h2>
    <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
      Elektrik devreleri, dirençlerin bağlanması, Ohm kanunu, üreteçler, lambaların parlaklığı, katı-sıvı-gaz basıncı ve kaldırma kuvveti kazanımlarını kapsayan 10 açık uçlu soru ve ayrıntılı çözüm basamakları.
    </p>

    <div class="mt-4 pt-4 border-t border-indigo-200/60 flex flex-wrap items-center justify-between gap-3">
      <div class="text-xs text-slate-600">
        📄 Format: <strong>Microsoft Word (.docx) &amp; Düzenlenebilir</strong> &bull; Boyut: <strong>61 KB</strong>
      </div>
      <a href="/uploads/10_sinif_fizik_1_donem_2_yazili_maarif_modeli.docx" download="10-Sinif-Fizik-1-Donem-2-Yazili-Sinavi.docx" class="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all shrink-0">
        📥 Sınav Kağıdını Word (.docx) Olarak İndir
      </a>
    </div>
  </div>

  <div class="prose prose-slate max-w-none space-y-6">
    <h2>Yazılı Sınav Soruları ve Adım Adım Çözüm Anahtarı</h2>

    <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
      <h3 class="text-base font-bold text-slate-900">Soru 1 (Ohm Yasası ve Eşdeğer Direnç - 10 Puan)</h3>
      <p class="text-xs sm:text-sm text-slate-700">
        $R_1 = 6\,\Omega$ ve $R_2 = 3\,\Omega$'luk iki direnç birbirine paralel bağlanıp, bu gruba seri olarak $R_3 = 4\,\Omega$'luk bir direnç ekleniyor. Devrenin toplam eşdeğer direnci ($R_{\text{eş}}$) kaç $\Omega$'dur?
      </p>
      <div class="p-3 bg-slate-50 rounded-xl text-xs sm:text-sm text-slate-800 border-l-4 border-indigo-500 space-y-1">
        <strong>Çözüm:</strong><br>
        1. Paralel kol: $R_p = \frac{R_1 \cdot R_2}{R_1 + R_2} = \frac{6 \cdot 3}{6 + 3} = \frac{18}{9} = 2\,\Omega$.<br>
        2. Seri kol ile toplam: $R_{\text{eş}} = R_p + R_3 = 2 + 4 = 6\,\Omega$.<br>
        <strong>Puan Baremi:</strong> Paralel hesaplama (5 puan), Seri toplam (5 puan).
      </div>
    </div>

    <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
      <h3 class="text-base font-bold text-slate-900">Soru 2 (Elektriksel Güç ve Enerji - 10 Puan)</h3>
      <p class="text-xs sm:text-sm text-slate-700">
        Üzerinden $2\text{ A}$ akım geçen $10\,\Omega$'luk bir ısıtıcı $5\text{ dakika}$ çalıştırıldığında etrafa kaç Joule ısı enerjisi yayar?
      </p>
      <div class="p-3 bg-slate-50 rounded-xl text-xs sm:text-sm text-slate-800 border-l-4 border-indigo-500 space-y-1">
        <strong>Çözüm:</strong><br>
        $t = 5\text{ dakika} = 5 \times 60 = 300\text{ saniye}$.<br>
        $E = I^2 \cdot R \cdot t = (2)^2 \cdot 10 \cdot 300 = 4 \cdot 10 \cdot 300 = 12.000\text{ Joule} = 12\text{ kJ}$.<br>
        <strong>Puan Baremi:</strong> Süreyi saniyeye çevirme (3 puan), Formül (3 puan), Sonuç (4 puan).
      </div>
    </div>

    <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
      <h3 class="text-base font-bold text-slate-900">Soru 3 (Sıvı Basıncı - 10 Puan)</h3>
      <p class="text-xs sm:text-sm text-slate-700">
        Yoğunluğu $d = 2\text{ g/cm}^3$ olan sıvı dolu bir kabın tabanından $h = 50\text{ cm}$ yükseklikteki sıvı basıncını bulunuz ($g = 10\text{ m/s}^2$).
      </p>
      <div class="p-3 bg-slate-50 rounded-xl text-xs sm:text-sm text-slate-800 border-l-4 border-indigo-500 space-y-1">
        <strong>Çözüm:</strong> SI birimlerine dönüştürme: $d = 2000\text{ kg/m}^3$, $h = 0.5\text{ m}$.<br>
        $P = h \cdot d \cdot g = 0.5 \cdot 2000 \cdot 10 = 10.000\text{ Pascal (N/m}^2)$.<br>
        <strong>Puan Baremi:</strong> Birim dönüşümü (4 puan), Formül ve sonuç (6 puan).
      </div>
    </div>

    <div class="p-5 bg-indigo-50/80 rounded-2xl border border-indigo-200 mt-6 space-y-3">
      <h3 class="text-sm font-bold text-indigo-900">🔗 İlgili Kaynaklar &amp; Platform İçi Okumalar</h3>
      <ul class="text-xs space-y-1.5 list-disc list-inside text-indigo-700 font-medium">
        <li><a href="/post/9-sinif-fizik-1-donem-2-yazili-sinavi-sorulari-ve-cozumleri-word-pdf" class="underline hover:text-indigo-900">9. Sınıf Fizik 1. Dönem 2. Yazılı Hazırlık Soruları</a></li>
        <li><a href="/post/11-sinif-fizik-1-donem-1-yazili-sinav-sorulari-ve-cevaplari-word-indir" class="underline hover:text-indigo-900">11. Sınıf Fizik 1. Dönem 1. Yazılı Dokümanı</a></li>
      </ul>
    </div>
  </div>
</div>
'''
    },

    # -------------------------------------------------------------
    # 12. 9. SINIF FİZİK 1. DÖNEM 2. YAZILI
    # -------------------------------------------------------------
    {
        'slug': '9-sinif-fizik-1-donem-2-yazili-sinavi-sorulari-ve-cozumleri-word-pdf',
        'title': '9. Sınıf Fizik 1. Dönem 2. Yazılı Sınavı Soruları ve Çözümleri (2024-2025 MEB Ortak Sınav Formatı Word İndir)',
        'category_id': 9, # 9. Sınıf
        'featured_image': 'https://www.etkinlikpaylas.com/wp-content/uploads/2026/09/fiz11cevapan_970E24FF-9962-477F-8E12-99E81184069F-compressed.pdf',
        'content': '''
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-indigo-50/90 via-slate-50 to-blue-50/80 rounded-3xl border border-indigo-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-indigo-600 text-white text-xs font-black tracking-wide uppercase">
        📝 9. Sınıf Fizik Ortak Yazılı
      </span>
      <span class="text-xs font-semibold text-slate-500">
        MEB Maarif Modeli 1. Dönem 2. Sınav
      </span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-slate-900">
      9. Sınıf Fizik 1. Dönem 2. Yazılı Sınavı Hazırlık Dokümanı ve Çözüm Anahtarı
    </h2>
    <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
      Madde ve özkütle, katılarda dayanıklılık, adezyon ve kohezyon kuvvetleri, yüzey gerilimi, kılcallık, bir boyutta hareket (konum, alınan yol, yer değiştirme, sürat ve hız) ünitelerini kapsayan 10 açık uçlu sınav sorusu.
    </p>

    <div class="mt-4 pt-4 border-t border-indigo-200/60 flex flex-wrap items-center justify-between gap-3">
      <div class="text-xs text-slate-600">
        📄 Format: <strong>Microsoft Word (.docx) &amp; Düzenlenebilir</strong> &bull; Boyut: <strong>158 KB</strong>
      </div>
      <a href="/uploads/9_sinif_fizik_1_donem_2_yazili_maarif_modeli_v2.docx" download="9-Sinif-Fizik-1-Donem-2-Yazili-Sinavi.docx" class="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all shrink-0">
        📥 Sınav Kağıdını Word (.docx) Olarak İndir
      </a>
    </div>
  </div>

  <div class="prose prose-slate max-w-none space-y-6">
    <h2>Yazılı Sınav Soruları ve Detaylı Çözümleri</h2>

    <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
      <h3 class="text-base font-bold text-slate-900">Soru 1 (Özkütle Hesabı - 10 Puan)</h3>
      <p class="text-xs sm:text-sm text-slate-700">
        Kütlesi $m = 240\text{ g}$ olan bir taş parçası, içinde $150\text{ cm}^3$ su bulunan dereceli silindire atıldığında su seviyesi $210\text{ cm}^3$'e çıkıyor. Taşın özkütlesini ($d$) bulunuz.
      </p>
      <div class="p-3 bg-slate-50 rounded-xl text-xs sm:text-sm text-slate-800 border-l-4 border-indigo-500 space-y-1">
        <strong>Çözüm:</strong> Taşın hacmi: $V = 210 - 150 = 60\text{ cm}^3$.<br>
        Özkütle: $d = \frac{m}{V} = \frac{240}{60} = 4\text{ g/cm}^3$.<br>
        <strong>Puan Baremi:</strong> Hacim bulma (4 puan), Özkütle formülü ve sonuç (6 puan).
      </div>
    </div>

    <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
      <h3 class="text-base font-bold text-slate-900">Soru 2 (Adezyon ve Kohezyon - 10 Puan)</h3>
      <p class="text-xs sm:text-sm text-slate-700">
        Adezyon ve kohezyon kuvvetlerini tanımlayınız. Suyun cam bardağın kenarlarına yapışması ve cıvanın küresel damla oluşturması durumlarının hangi kuvvetlerle ilişkili olduğunu belirtiniz.
      </p>
      <div class="p-3 bg-slate-50 rounded-xl text-xs sm:text-sm text-slate-800 border-l-4 border-indigo-500 space-y-1">
        <strong>Çözüm:</strong><br>
        - <em>Adezyon (Yapışma):</em> Farklı tür moleküller arasındaki çekim kuvvetidir. Suyun cama yapışması adezyon kuvveti ile açıklanır ($Adezyon > Kohezyon$).<br>
        - <em>Kohezyon (Tutunma):</em> Aynı tür moleküllerin birbirini çekmesidir. Cıvanın dağılmayıp küre oluşturması kohezyon kuvvetinin baskın olması ile açıklanır ($Kohezyon > Adezyon$).
      </div>
    </div>

    <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
      <h3 class="text-base font-bold text-slate-900">Soru 3 (Yer Değiştirme vs. Alınan Yol - 10 Puan)</h3>
      <p class="text-xs sm:text-sm text-slate-700">
        Bir hareketli $O$ noktasından başlayarak önce doğuya doğru $30\text{ m}$, ardından kuzeye doğru $40\text{ m}$ yürüyor. Bu hareketlinin aldığı yolu ve yaptığı yer değiştirmeyi ($\Delta \vec{x}$) hesaplayınız.
      </p>
      <div class="p-3 bg-slate-50 rounded-xl text-xs sm:text-sm text-slate-800 border-l-4 border-indigo-500 space-y-1">
        <strong>Çözüm:</strong><br>
        - Alınan Yol: Skaler büyüklüktür, yörünge uzunluğudur $\Rightarrow 30 + 40 = 70\text{ metre}$.<br>
        - Yer Değiştirme: Başlangıç ve bitiş arasındaki en kısa yönlü uzaklıktır. Pisagor teoreminden $\Delta x = \sqrt{30^2 + 40^2} = 50\text{ metre}$ (Kuzeydoğu yönünde).
      </div>
    </div>

    <div class="p-5 bg-indigo-50/80 rounded-2xl border border-indigo-200 mt-6 space-y-3">
      <h3 class="text-sm font-bold text-indigo-900">🔗 İlgili Kaynaklar &amp; Platform İçi Okumalar</h3>
      <ul class="text-xs space-y-1.5 list-disc list-inside text-indigo-700 font-medium">
        <li><a href="/post/10-sinif-fizik-1-donem-2-yazili-sorulari-ve-cevap-anahtari-word-pdf" class="underline hover:text-indigo-900">10. Sınıf Fizik 1. Dönem 2. Yazılı Dokümanı</a></li>
        <li><a href="/post/11-sinif-fizik-1-unite-kuvvet-ve-hareket-cevaplari-meb" class="underline hover:text-indigo-900">11. Sınıf Fizik Vektörler ve Bağıl Hareket Çözümleri</a></li>
      </ul>
    </div>
  </div>
</div>
'''
    },

    # -------------------------------------------------------------
    # 13. EĞLENMATİK - PERGEL KULLANIMI VE GEOMETRİK İNŞA
    # -------------------------------------------------------------
    {
        'slug': 'pergel-kullanimi-ve-geometrik-insa-temel-cizim-becerileri-calisma-kagidi',
        'title': 'Pergel Kullanımı ve Geometrik İnşa: Açıortay, Kenarortay ve Eşkenar Üçgen Çizim Rehberi (A4 PDF)',
        'category_id': 21, # İlkokul Etkinlikleri
        'featured_image': 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=1200',
        'content': '''
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-indigo-50/90 via-slate-50 to-purple-50/80 rounded-3xl border border-indigo-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-indigo-600 text-white text-xs font-black tracking-wide uppercase">
        📐 Somut Geometri &amp; Öklid Çizimleri
      </span>
      <span class="text-xs font-semibold text-slate-500">
        Geometrik Çizim ve İnşa Atölyesi
      </span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-slate-900">
      Pergel ve Cetvel ile Geometrik İnşa: Çemberden Açıortaya Adım Adım Çizim Rehberi
    </h2>
    <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
      Klasik Öklid geometrisinin temel kuralı şudur: Bir şekli inşa ederken yalnızca <strong>işaretsiz bir cetvel (çizgeç)</strong> ve <strong>bir pergel</strong> kullanabilirsiniz. Pergel yalnızca çember çizmeye yaramaz; uzunluk taşımak, açıları kopyalamak, orta dikme ve açıortay bulmak için en kusursuz matematiksel araçtır.
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

  <div class="prose prose-slate max-w-none space-y-6">
    <h2>1. Temel Geometrik İnşa Basamakları</h2>

    <h3>A. Doğru Parçasının Orta Dikmesini Bulma</h3>
    <ol>
      <li>Bir doğru parçası ($[AB]$) çizin.</li>
      <li>Pergelin iğneli ucunu $A$ noktasına koyun ve pergel açıklığını doğru parçasının yaklaşık yarısından fazla olacak şekilde açın.</li>
      <li>Doğru parçasının hem üstüne hem de altına birer yay çizin.</li>
      <li>Pergelin açıklığını <strong>kesinlikle bozmadan</strong> iğneyi $B$ noktasına koyun ve önceki yayları kesecek iki yeni yay çizin.</li>
      <li>Yayların kesiştiği iki noktayı cetvelle birleştirin. Elde ettiğiniz doğru, $[AB]$ doğru parçasını tam ortadan ikiye böler ve dik keser!</li>
    </ol>

    <h3>B. Açının Açıortayını İnşa Etme</h3>
    <ol>
      <li>Köşesi $O$ olan herhangi bir dar açı çizin.</li>
      <li>Pergelin ucunu $O$ noktasına batırıp açının iki kolunu kesen bir yay çizin. Kollar üzerindeki kesim noktalarına $K$ ve $L$ deyin.</li>
      <li>Pergelin ucunu sırasıyla $K$ ve $L$ noktalarına koyarak açının iç bölgesinde kesişen iki yay çizin.</li>
      <li>Kesişim noktası ile $O$ noktasını birleştiren doğru, açıyı tam iki eşit parçaya bölen <em>açıortay doğrusudur</em>.</li>
    </ol>

    <div class="p-5 bg-indigo-50/80 rounded-2xl border border-indigo-200 mt-6 space-y-3">
      <h3 class="text-sm font-bold text-indigo-900">🔗 İlgili Geometri Kaynakları</h3>
      <ul class="text-xs space-y-1.5 list-disc list-inside text-indigo-700 font-medium">
        <li><a href="/post/cetvel-calismalari-ve-uzunluk-olcme-orta-ve-ileri-duzey-etkinlik-kagidi" class="underline hover:text-indigo-900">Cetvel Çalışmaları ve Uzunluk Ölçme Etkinlik Kağıdı (PDF)</a></li>
        <li><a href="/post/kesri-kesre-bolme-modelleme-araci" class="underline hover:text-indigo-900">Kesirlerde Modelleme ve Görsel Bölme Rehberi</a></li>
      </ul>
    </div>
  </div>
</div>
'''
    },

    # -------------------------------------------------------------
    # 14. EĞLENMATİK - CETVEL ÇALIŞMALARI
    # -------------------------------------------------------------
    {
        'slug': 'cetvel-calismalari-ve-uzunluk-olcme-orta-ve-ileri-duzey-etkinlik-kagidi',
        'title': 'Cetvel Çalışmaları ve Uzunluk Ölçme: Milimetrik Hassasiyet ve Geometrik Çizim Alıştırmaları (A4 PDF)',
        'category_id': 21, # İlkokul Etkinlikleri
        'featured_image': 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=1200',
        'content': '''
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-indigo-50/90 via-slate-50 to-blue-50/80 rounded-3xl border border-indigo-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-blue-600 text-white text-xs font-black tracking-wide uppercase">
        📏 Ölçme Becerisi &amp; Teknik Çizim
      </span>
      <span class="text-xs font-semibold text-slate-500">
        Uygulamalı Matematik
      </span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-slate-900">
      Cetvel ile Hassas Ölçme ve Çizim: Sıfır Hatasından Milimetrik Doğruluğa
    </h2>
    <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
      Uzunluk ölçme becerisi, geometrinin ve fen bilimlerinin en temel taşıdır. Öğrencilerin en sık yaptığı hatalardan biri ölçüme cetvelin en başından başlamaktır; oysa cetvel üzerindeki <strong>0 (sıfır) çizgisi</strong> ölçümün gerçek başlangıç noktasıdır.
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

  <div class="prose prose-slate max-w-none space-y-6">
    <h2>1. Cetvel Kullanımında En Sık Yapılan 3 Hata</h2>
    <ul>
      <li><strong>1. Sıfır Noktası Hatası:</strong> Cetvelin fiziksel kenarı ile $0$ çizgisi arasında genellikle 2-3 mm'lik bir boşluk bulunur. Ölçüme fiziksel uçtan başlamak tüm ölçümleri yanlış kılar.</li>
      <li><strong>2. Bakış Açısı (Paralaks) Hatası:</strong> Cetvele dik bakılmadığında (açılı bakıldığında) milimetre çizgisi 1-2 mm kaymış gibi görünür. Daima göz hizası çizgiye dik olmalıdır.</li>
      <li><strong>3. Kırık / Aşınmış Cetvel Kullanımı:</strong> Eğer cetvelin sıfır ucu aşınmışsa, ölçüm $1\text{ cm}$ veya $2\text{ cm}$ çizgisinden başlatılmalı ve sonuçtan bu başlangıç değeri çıkarılmalıdır.</li>
    </ul>

    <div class="p-5 bg-indigo-50/80 rounded-2xl border border-indigo-200 mt-6 space-y-3">
      <h3 class="text-sm font-bold text-indigo-900">🔗 İlgili Geometri Kaynakları</h3>
      <ul class="text-xs space-y-1.5 list-disc list-inside text-indigo-700 font-medium">
        <li><a href="/post/pergel-kullanimi-ve-geometrik-insa-temel-cizim-becerileri-calisma-kagidi" class="underline hover:text-indigo-900">Pergel Kullanımı ve Geometrik İnşa Rehberi</a></li>
        <li><a href="/post/kesri-kesre-bolme-modelleme-araci" class="underline hover:text-indigo-900">Kesirlerde Modelleme ve Sayı Doğrusu Etkinliği</a></li>
      </ul>
    </div>
  </div>
</div>
'''
    },

    # -------------------------------------------------------------
    # 15. EĞLENMATİK - DOĞAL SAYIYI KESRE BÖLME
    # -------------------------------------------------------------
    {
        'slug': 'dogal-sayiyi-kesre-bolme-sayi-dogrusu-ve-ekmek-modeli-etkinligi',
        'title': 'Doğal Sayıyı Kesre Bölme İşlemi: Sayı Doğrusu, Ekmek Modeli ve İnteraktif Modelleme Rehberi',
        'category_id': 5, # 5. Sınıf
        'featured_image': 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=1200',
        'content': '''
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-indigo-50/90 via-slate-50 to-emerald-50/80 rounded-3xl border border-indigo-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-emerald-600 text-white text-xs font-black tracking-wide uppercase">
        🍞 Somut Modelleme &amp; Kesir Becerileri
      </span>
      <span class="text-xs font-semibold text-slate-500">
        5. ve 6. Sınıf Matematik
      </span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-slate-900">
      Doğal Sayıyı Kesre Bölmek Neden Büyütür? Ekmek Modeli ile Adım Adım Mantıksal Açıklama
    </h2>
    <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
      Öğrencilerin matematikte en çok şaşırdığı kavramlardan biri şudur: <em>"Bölme işlemi bir şeyi küçültmez mi? Nasıl olur da $4 \div \frac{1}{2} = 8$ olur?"</em> Bu sorunun cevabı, bölme işleminin ezberlenmiş bir algoritma değil, bir <strong>parçalama ve sayma eylemi</strong> olduğunu anlamakta yatar.
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

  <div class="prose prose-slate max-w-none space-y-6">
    <h2>1. Ekmek Modeli Mantığı: Bölmenin Anlamı Nedir?</h2>
    <p>
      Elinizde <strong>3 tam ekmek</strong> olduğunu hayal edin. Soru şu: <em>"Bu 3 tam ekmeği her biri yarım ($\frac{1}{2}$) ekmek olan porsiyonlara ayırırsanız kaç porsiyon elde edersiniz?"</em>
    </p>
    <ul>
      <li>1. ekmekten 2 yarım ekmek çıkar.</li>
      <li>2. ekmekten 2 yarım ekmek çıkar.</li>
      <li>3. ekmekten 2 yarım ekmek çıkar.</li>
    </ul>
    <p>
      Toplamda tam <strong>6 yarım ekmek</strong> elde edersiniz! İşte bu nedenle işlem:
    </p>
    <div class="p-4 bg-slate-900 text-white font-mono text-sm rounded-2xl text-center shadow-inner">
      3 ÷ ½ = 3 × 2 = 6
    </div>
    <p>
      Bir sayıyı basit kesre bölmek, o sayının içine o küçük parçalardan kaç tanesinin sığdığını bulmaktır. Parçalar bütünden küçük olduğu için parça sayısı her zaman artar!
    </p>

    <div class="p-5 bg-indigo-50/80 rounded-2xl border border-indigo-200 mt-6 space-y-3">
      <h3 class="text-sm font-bold text-indigo-900">🔗 İlgili Kaynaklar &amp; Platform İçi Okumalar</h3>
      <ul class="text-xs space-y-1.5 list-disc list-inside text-indigo-700 font-medium">
        <li><a href="/post/kesri-kesre-bolme-modelleme-araci" class="underline hover:text-indigo-900">Kesri Kesre Bölme: Payda Eşitleme ve Modelleme Rehberi</a></li>
        <li><a href="/post/kesri-dogal-sayiya-bolme-paylastirma-modeli-ile-gorsellestirme" class="underline hover:text-indigo-900">Kesri Doğal Sayıya Bölme: Paylaştırma Modeli</a></li>
      </ul>
    </div>
  </div>
</div>
'''
    },

    # -------------------------------------------------------------
    # 16. EĞLENMATİK - KESRİ DOĞAL SAYIYA BÖLME
    # -------------------------------------------------------------
    {
        'slug': 'kesri-dogal-sayiya-bolme-paylastirma-modeli-ile-gorsellestirme',
        'title': 'Kesri Doğal Sayıya Bölme İşlemi: Paylaştırma Modeli, Modelleme ve A4 Çalışma Yaprağı',
        'category_id': 5, # 5. Sınıf
        'featured_image': 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=1200',
        'content': '''
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-indigo-50/90 via-slate-50 to-blue-50/80 rounded-3xl border border-indigo-200 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
      <span class="px-3.5 py-1 rounded-full bg-blue-600 text-white text-xs font-black tracking-wide uppercase">
        🍕 Kesir Modelleri &amp; Paylaştırma
      </span>
      <span class="text-xs font-semibold text-slate-500">
        5. ve 6. Sınıf MEB Kazanımları
      </span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-slate-900">
      Kesri Doğal Sayıya Bölme: Paylaştırma Modeli ile Görselleştirme Rehberi
    </h2>
    <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
      Bir kesri doğal sayıya bölmek, zaten parçalanmış olan bir bütünü daha da küçük dilimlere ayırıp paylaştırmaktır. Örneğin bir tepsi böreğin $\frac{3}{4}$'ünü 3 kişiye eşit olarak paylaştırdığınızda kişi başına ne kadar düşer?
    </p>

    <div class="mt-4 pt-4 border-t border-indigo-200/60 flex flex-wrap items-center justify-between gap-3">
      <div class="text-xs text-slate-600">
        📄 Doküman: <strong>Kesirlerde Bölme ve Modelleme Rehberi (PDF)</strong> &bull; Boyut: <strong>4.0 KB</strong>
      </div>
      <a href="/uploads/5-sinif-kesirlerde-bolme-ve-modelleme-rehberi.pdf" download="5-Sinif-Kesirlerde-Bolme-Rehberi.pdf" class="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all shrink-0">
        📥 Modelleme Rehberini (PDF) İndir
      </a>
    </div>
  </div>

  <div class="prose prose-slate max-w-none space-y-6">
    <h2>1. Durum 1: Payın Doğal Sayıya Tam Bölünmesi</h2>
    <p>
      Eğer kesrin payı bölünen sayıya tam bölünüyorsa işlem son derece basittir:
    </p>
    <div class="p-4 bg-slate-900 text-white font-mono text-sm rounded-2xl text-center shadow-inner">
      ¾ ÷ 3 = (3 ÷ 3) / 4 = ¼
    </div>
    <p>
      Somut model: Elinizde 4 eşit parçaya bölünmüş bir pizza var ve 3 dilimi duruyor. Bu 3 dilimi 3 arkadaşa dağıtırsanız, her birine pizzanın $\frac{1}{4}$'i (çeyreği) düşer.
    </p>

    <h2>2. Durum 2: Payın Tam Bölünmediği Durum (Denk Kesir Yardımı)</h2>
    <p>
      Peki $\frac{2}{3}$ kesrini 4 kişiye paylaştırmak istersek ne olur? 2 sayısı 4'e tam bölünmez. Bu durumda kesri denk kesir kuralıyla genişletiriz:
    </p>
    <div class="p-4 bg-slate-900 text-white font-mono text-sm rounded-2xl text-center shadow-inner">
      ⅔ = ⁴⁄₆ ➔ ⁴⁄₆ ÷ 4 = (4 ÷ 4) / 6 = ⅙
    </div>
    <p>
      Veya standart ters çevirip çarpma kuralı ile: $\frac{2}{3} \times \frac{1}{4} = \frac{2}{12} = \frac{1}{6}$. Her iki yöntem de çocuğun aynı mantıksal sonuca ulaştığını kanıtlar.
    </p>

    <div class="p-5 bg-indigo-50/80 rounded-2xl border border-indigo-200 mt-6 space-y-3">
      <h3 class="text-sm font-bold text-indigo-900">🔗 İlgili Kaynaklar &amp; Platform İçi Okumalar</h3>
      <ul class="text-xs space-y-1.5 list-disc list-inside text-indigo-700 font-medium">
        <li><a href="/post/kesri-kesre-bolme-modelleme-araci" class="underline hover:text-indigo-900">Kesri Kesre Bölme: Payda Eşitleme ve Modelleme Rehberi</a></li>
        <li><a href="/post/dogal-sayiyi-kesre-bolme-sayi-dogrusu-ve-ekmek-modeli-etkinligi" class="underline hover:text-indigo-900">Doğal Sayıyı Kesre Bölme: Ekmek Modeli</a></li>
      </ul>
    </div>
  </div>
</div>
'''
    }
]

print(f"Enriching {len(articles)} articles with deep, pedagogical, and full-length content...")

for art in articles:
    cid = art.get('category_id', 54)
    if cid == 11:
        cat_name, cat_slug = '11. Sınıf', '11-sinif'
    elif cid == 10:
        cat_name, cat_slug = '10. Sınıf', '10-sinif'
    elif cid == 9:
        cat_name, cat_slug = '9. Sınıf', '9-sinif'
    elif cid == 5:
        cat_name, cat_slug = '5. Sınıf', '5-sinif'
    elif cid == 21:
        cat_name, cat_slug = 'İlkokul Etkinlikleri', 'ilkokul-etkinlikleri'
    else:
        cat_name, cat_slug = 'Blog', 'blog'

    cursor.execute("SELECT id FROM posts WHERE slug = ?", (art['slug'],))
    row = cursor.fetchone()
    if row:
        cursor.execute("""
            UPDATE posts 
            SET title = ?, content = ?, category = ?, category_slug = ?, featured_image = ?, author = 'Matemetrik Eğitim Masası', updated_at = datetime('now')
            WHERE slug = ?
        """, (art['title'], art['content'], cat_name, cat_slug, art['featured_image'], art['slug']))
        print(f"Updated: {art['slug']}")
    else:
        cursor.execute("""
            INSERT INTO posts (title, slug, content, category, category_slug, featured_image, author, is_published, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, 'Matemetrik Eğitim Masası', 1, datetime('now'), datetime('now'))
        """, (art['title'], art['slug'], art['content'], cat_name, cat_slug, art['featured_image']))
        print(f"Inserted: {art['slug']}")

conn.commit()
print("All target articles enriched successfully!")
conn.close()
