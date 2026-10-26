import sqlite3
import json
from datetime import datetime

DB_PATH = 'data/matemetrik.db'

now_iso = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.000Z')

posts = [
    {
        "title": "MEB Ortak Yazılı Sınav Sistemi (OYSS) Nedir? 2026-2027 Uygulama Rehberi ve Sıkça Sorulan Sorular",
        "slug": "meb-oyss-nedir-ortak-yazili-sinav-sistemi-rehberi",
        "excerpt": "Milli Eğitim Bakanlığı ÖDSGM tarafından duyurulan Ortak Yazılı Sınav Sistemi (OYSS) nedir? Hangi sınıflarda uygulanacak, soruları kim hazırlayacak? İşte 2026-2027 OYSS hakkında tüm merak edilenler.",
        "category": "Öğretmen",
        "category_slug": "ogretmen",
        "featured_image": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
        "tags": ["MEB OYSS", "Ortak Yazılı Sınav Sistemi", "ÖDSGM", "Türkiye Yüzyılı Maarif Modeli", "Açık Uçlu Sınavlar", "MEB Ortak Sınav", "Öğretmen"],
        "content": """
<div class="space-y-8">
  <!-- Giriş Özeti Banner -->
  <div class="p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white rounded-3xl shadow-xl not-prose border border-indigo-500/20">
    <div class="flex items-center gap-2 mb-3">
      <span class="px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-400/30">
        📢 MEB ÖDSGM Resmi Kılavuzu
      </span>
      <span class="text-xs text-slate-400">2026-2027 Eğitim Öğretim Yılı</span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-white tracking-tight">
      Ortak Yazılı Sınav Sistemi (OYSS): Okullarda Yeni Sınav Dönemi Başlıyor
    </h2>
    <p class="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
      Milli Eğitim Bakanlığı Ölçme, Değerlendirme ve Sınav Hizmetleri Genel Müdürlüğü (ÖDSGM), okul geneli ortak sınav süreçlerini dijitalleştiren ve Türkiye Yüzyılı Maarif Modeli ile tam entegre çalışan <strong>Ortak Yazılı Sınav Sistemi (OYSS)</strong> sıkça sorulan sorular kılavuzunu yayımladı. İşte veli, öğrenci ve öğretmenlerin bilmesi gereken tüm kritik detaylar.
    </p>
  </div>

  <div class="prose max-w-none text-slate-800 space-y-6">
    <h2>1. Ortak Yazılı Sınav Sistemi (OYSS) Nedir ve Amacı Ne?</h2>
    <p>
      <strong>Ortak Yazılı Sınav Sistemi (OYSS)</strong>; ülke genelindeki tüm resmi ve özel okullarda okul geneli ortak yazılı sınavların hazırlanması, uygulanması ve değerlendirilmesi süreçlerini tek bir dijital platform üzerinden yürütmek üzere MEB tarafından hayata geçirilmiş merkezi bir ölçme altyapısıdır.
    </p>
    <p>
      Sistemin temel amacı; sınavların öğretim programlarındaki öğrenme çıktılarıyla uyumlu, geçerli ve güvenilir bir şekilde hazırlanmasını sağlamak, sınav analizlerini öğrenci ve şube bazında objektif verilerle raporlamaktır.
    </p>

    <!-- Öne Çıkan Özellikler Kartı -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
      <div class="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
        <div class="flex items-center gap-2 text-indigo-700 font-bold text-sm mb-1">
          <span>🎯</span> Maarif Modeli ile Tam Uyum
        </div>
        <p class="text-xs text-slate-600 leading-relaxed">
          Ezberci çoktan seçmeli testler yerine; açık uçlu, analitik düşünmeyi ve beceri temelli öğrenmeyi ölçen biçimlendirici değerlendirme yaklaşımı.
        </p>
      </div>
      <div class="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
        <div class="flex items-center gap-2 text-indigo-700 font-bold text-sm mb-1">
          <span>⚖️</span> Fırsat Eşitliği ve Ortak Standart
        </div>
        <p class="text-xs text-slate-600 leading-relaxed">
          Tüm okulların ortak beceri temelli soru havuzuna ve detaylı analitik puanlama anahtarlarına erişim sağlamasıyla ölçmede adalet.
        </p>
      </div>
      <div class="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
        <div class="flex items-center gap-2 text-indigo-700 font-bold text-sm mb-1">
          <span>📊</span> Otomatik Öğrenme Çıktısı Analizi
        </div>
        <p class="text-xs text-slate-600 leading-relaxed">
          Soru bazında girilen notlar sayesinde hangi öğrencinin veya sınıfın hangi kazanımda eksik kaldığı sistem tarafından otomatik raporlanır.
        </p>
      </div>
      <div class="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
        <div class="flex items-center gap-2 text-indigo-700 font-bold text-sm mb-1">
          <span>👨‍🏫</span> Öğretmenin Karar Verici Rolü
        </div>
        <p class="text-xs text-slate-600 leading-relaxed">
          Sınavı MEB hazırlayıp göndermiyor! Senaryo seçimi, güçlük seviyesi ve soruların 2 tanesinin bizzat alan zümre öğretmenlerince yazılması esastır.
        </p>
      </div>
    </div>

    <h2>2. OYSS Hangi Sınıf ve Derslerde Uygulanacak?</h2>
    <p>
      2026-2027 eğitim öğretim yılı itibarıyla OYSS, Bakanlık kılavuzunda belirtilen zorunlu ve seçmeli dersler kapsamında şu kademelerde uygulanacaktır:
    </p>
    <div class="overflow-x-auto not-prose my-4">
      <table class="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
        <thead class="bg-indigo-50 text-indigo-950 font-bold">
          <tr>
            <th class="p-3 border-b border-slate-200">Kademe</th>
            <th class="p-3 border-b border-slate-200">Sınıf Düzeyleri</th>
            <th class="p-3 border-b border-slate-200">Dahil Olan Dersler</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 bg-white">
          <tr>
            <td class="p-3 font-bold text-slate-900">Ortaokul</td>
            <td class="p-3">5, 6 ve 7. Sınıflar</td>
            <td class="p-3 text-slate-700">Türkçe, Matematik, Fen Bilimleri, Sosyal Bilgiler, Din Kültürü ve Ahlak Bilgisi, İngilizce</td>
          </tr>
          <tr>
            <td class="p-3 font-bold text-slate-900">Lise (Ortaöğretim)</td>
            <td class="p-3">9, 10 ve 11. Sınıflar</td>
            <td class="p-3 text-slate-700">Türk Dili ve Edebiyatı, Matematik, Fizik, Kimya, Biyoloji, Tarih, Coğrafya, Felsefe, Din Kültürü ve Ahlak Bilgisi, İngilizce</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>3. Yazılı Sınavları MEB mi Yoksa Öğretmenler mi Hazırlayacak?</h2>
    <p>
      Kamuoyunda en çok merak edilen konulardan biri de <em>"Sınavları doğrudan Bakanlık mı gönderecek?"</em> sorusuydu. ÖDSGM yayımladığı kılavuzla bu konuya kesin bir açıklık getirdi:
    </p>
    <blockquote class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-xs sm:text-sm text-amber-900 font-medium not-prose">
      <strong>MEB Açıklaması:</strong> "Yazılı sınavlar doğrudan Bakanlıkça hazırlanmayacaktır. Öğretmenlerin sınav hazırlama, uygulama ve değerlendirme sürecindeki belirleyici rolü devam etmektedir. Senaryo seçimi, soru hazırlama, güçlük düzeyine karar verme ve puan değerlerini belirleme işlemleri bizzat öğretmenler tarafından yürütülecektir."
    </blockquote>
    <p>
      Bir sınavda öğrencilere ortalama <strong>6 ile 8 adet açık uçlu soru</strong> yöneltilmektedir. Bu sınav oluşturulurken alan zümre öğretmenleri:
    </p>
    <ul class="list-disc list-inside space-y-2 text-slate-700">
      <li>Seçilen senaryodaki öğrenme çıktılarına uygun <strong>2 açık uçlu soruyu ve ayrıntılı puanlama anahtarını bizzat kendileri hazırlar.</strong></li>
      <li>Bakanlığın soru havuzundan çekilen sorulardan <strong>2 tanesini değiştirme hakkına sahiptir.</strong></li>
      <li>Sınavın kolay, orta veya zor güçlük seviyesini ve her sorunun puan ağırlığını kendi sınıfının seviyesine göre zümre belirler.</li>
    </ul>

    <h2>4. Sınav Sonuçları ve Geri Bildirim Süreci</h2>
    <p>
      Sınav sonuçları açıklandıktan sonra, öğrencilerin eksik öğrenmelerini tespit edebilmeleri amacıyla sınav soruları ve cevap anahtarları ders öğretmeni tarafından sınıf ortamında öğrencilerle birlikte analiz edilebilecektir.
    </p>
    <div class="p-4 bg-rose-50 border border-rose-200 rounded-2xl not-prose my-4">
      <div class="flex items-center gap-2 text-rose-800 font-bold text-xs sm:text-sm">
        <span>⚠️</span> ÖNEMLİ YASAL UYARI:
      </div>
      <p class="text-xs text-rose-700 mt-1 leading-relaxed">
        Sınav sorularının ve puanlama anahtarlarının okul dışına çıkarılması, internet sitelerinde, sosyal medya platformlarında (WhatsApp, Telegram, Instagram vb.) paylaşılması ve yayımlanması <strong>Bakanlıkça kesin olarak yasaklanmıştır.</strong>
      </p>
    </div>

    <h2>5. Sıkça Sorulan Sorularla OYSS Özeti</h2>
    <div class="space-y-4 not-prose my-6">
      <details class="p-4 bg-slate-50 border border-slate-200 rounded-2xl group cursor-pointer">
        <summary class="font-bold text-slate-900 text-sm flex justify-between items-center">
          <span>Sabahçı ve öğlenci şubelere aynı sorular mı sorulacak?</span>
          <span class="text-indigo-600 group-open:rotate-180 transition-transform">&darr;</span>
        </summary>
        <p class="text-xs text-slate-600 mt-3 pt-3 border-t border-slate-200 leading-relaxed">
          Hayır. İkili öğretim yapan okullarda sabahçı ve öğlenci gruplar için OYSS üzerinden tamamen farklı soru kombinasyonlarından oluşan sınavlar üretilebilmektedir.
        </p>
      </details>

      <details class="p-4 bg-slate-50 border border-slate-200 rounded-2xl group cursor-pointer">
        <summary class="font-bold text-slate-900 text-sm flex justify-between items-center">
          <span>Mazeret sınavları ne zaman ve nasıl yapılacak?</span>
          <span class="text-indigo-600 group-open:rotate-180 transition-transform">&darr;</span>
        </summary>
        <p class="text-xs text-slate-600 mt-3 pt-3 border-t border-slate-200 leading-relaxed">
          Geçerli mazereti bulunan öğrenciler için mazeret sınavları <strong>23-27 Kasım 2026</strong> tarihleri arasında yine OYSS üzerinden seçilen senaryoya uygun olarak zümre öğretmenlerince yapılacaktır.
        </p>
      </details>

      <details class="p-4 bg-slate-50 border border-slate-200 rounded-2xl group cursor-pointer">
        <summary class="font-bold text-slate-900 text-sm flex justify-between items-center">
          <span>Öğretmenlerin iş yükü artacak mı?</span>
          <span class="text-indigo-600 group-open:rotate-180 transition-transform">&darr;</span>
        </summary>
        <p class="text-xs text-slate-600 mt-3 pt-3 border-t border-slate-200 leading-relaxed">
          Mevzuata göre sınav analizi yapma zorunluluğu zaten bulunmaktadır. OYSS, girilen soru puanlarıyla sınıf ve kazanım analizlerini otomatik üreterek öğretmenleri manuel Excel çizelgeleri ve evrak yükünden kurtarmayı amaçlamaktadır.
        </p>
      </details>
    </div>

    <!-- İlgili İçerikler ve Öğretmen Araçları Linkleri -->
    <div class="p-5 bg-indigo-50/70 border border-indigo-100 rounded-3xl not-prose mt-8 space-y-3">
      <h4 class="font-bold text-indigo-950 text-sm flex items-center gap-2">
        <span>🔗</span> İlgili Öğretmen ve Sınav Araçları:
      </h4>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        <a href="/sinav-hazirlama-robotu" class="p-3 bg-white rounded-xl border border-indigo-100 font-bold text-indigo-600 hover:text-indigo-800 transition-colors shadow-sm block">
          📝 Sınav Hazırlama Robotu &rarr;
        </a>
        <a href="/kategori/ogretmen" class="p-3 bg-white rounded-xl border border-indigo-100 font-bold text-indigo-600 hover:text-indigo-800 transition-colors shadow-sm block">
          📂 Öğretmen Evrak ve Planları &rarr;
        </a>
        <a href="/puan-hesaplama-robotu" class="p-3 bg-white rounded-xl border border-indigo-100 font-bold text-indigo-600 hover:text-indigo-800 transition-colors shadow-sm block">
          🧮 LGS &amp; YKS Puan Robotu &rarr;
        </a>
      </div>
    </div>
  </div>
</div>
"""
    },
    {
        "title": "OYSS Zümre Başkanı Sınav Hazırlama, EBA Giriş ve Mazeret Sınavları Rehberi",
        "slug": "oyss-ogretmen-zumre-baskani-sinav-hazirlama-eba-giris-rehberi",
        "excerpt": "Zümre başkanları EBA üzerinden OYSS modülüne nasıl erişecek? MEBBİS zümre modülü yetkilendirmesi, 2 soru ekleme kuralı, sabahçı-öğlenci şubeler ve 23-27 Kasım mazeret sınavı takvimi.",
        "category": "Öğretmen",
        "category_slug": "ogretmen",
        "featured_image": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
        "tags": ["OYSS EBA Giriş", "Zümre Başkanı OYSS", "MEBBİS Zümre Modülü", "Mazeret Sınavları", "Soru Hazırlama", "Öğretmen Kılavuzu"],
        "content": """
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white rounded-3xl shadow-xl not-prose border border-emerald-500/20">
    <div class="flex items-center gap-2 mb-3">
      <span class="px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
        👨‍🏫 Öğretmen ve Zümre Kılavuzu
      </span>
      <span class="text-xs text-slate-400">MEB OYSS Uygulama Esasları</span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-white tracking-tight">
      Zümre Başkanları İçin Adım Adım OYSS Sınav Oluşturma ve EBA Süreci
    </h2>
    <p class="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
      Ortak Yazılı Sınav Sistemi'nde sınav oluşturma yetkisi eğitim kurumu alan zümre başkanlarına verilmiştir. EBA giriş yetkilerinden 2 özgün soru girişine, ikili eğitimden mazeret sınavlarına kadar tüm teknik adımları derledik.
    </p>
  </div>

  <div class="prose max-w-none text-slate-800 space-y-6">
    <h2>1. Sınavları Neden Zümre Başkanı Oluşturuyor?</h2>
    <p>
      ÖDSGM kılavuzuna göre sınav sorularının hazırlanması, kayıt altına alınması ve muhafaza edilmesine ilişkin iş ve işlemler <strong>alan zümre öğretmenleri tarafından birlikte (ortaklaşa)</strong> yürütülür.
    </p>
    <p>
      Eğitim kurumu alan zümre başkanı ise bu süreçte <strong>sisteme veri girişinden ve sınavın onaylanmasından sorumlu koordinatördür</strong>. Yani sınav kararları tek bir öğretmenin değil, zümre toplantısında alınan ortak kararın dijitale aktarılmasıdır.
    </p>

    <h2>2. EBA Üzerinden OYSS Modülüne Erişemeyen Öğretmen Ne Yapmalı?</h2>
    <p>
      EBA'ya giriş yapıldığı halde OYSS modülünü göremeyen zümre başkanlarının izlemesi gereken adımlar:
    </p>
    <ol class="list-decimal list-inside space-y-2 text-slate-700">
      <li><strong>MEBBİS Zümre Modülü Kontrolü:</strong> Okul idaresi tarafından öğretmenin ilgili derse ait zümre başkanı olarak MEBBİS Zümre Modülü'ne eksiksiz işlenmiş olması şarttır.</li>
      <li><strong>Görevlendirme Güncelliği:</strong> Zümre başkanlığı görevlendirme tarihinin 2026-2027 eğitim yılı için aktif olup olmadığı kontrol edilmelidir.</li>
      <li><strong>Giriş Yöntemleri:</strong> Öğretmenler EBA'ya EBA şifresi, MEBBİS kullanıcı bilgileri veya e-Devlet kapısı üzerinden giriş yapabilirler.</li>
      <li><strong>İdareci Yetkisi:</strong> Sistemsel bir aksaklık yaşanması halinde, okul müdürlüğü yetkisiyle de zümre adına sisteme giriş yapılıp sınav tanımlanabilmektedir.</li>
      <li>Sorun çözülemezse okul idaresi kanalıyla İl/İlçe Milli Eğitim Müdürlüğü Ölçme Değerlendirme Merkezi (ÖDM) teknik masasından destek alınacaktır.</li>
    </ol>

    <h2>3. Sınav Oluşturma Kuralları: 6-8 Soru ve 2 Özgün Soru Şartı</h2>
    <p>
      OYSS modülünde sınav oluştururken öğretmenlere geniş bir pedagojik inisiyatif alanı tanınmıştır:
    </p>
    <div class="p-5 bg-slate-50 border border-slate-200 rounded-2xl not-prose my-4 space-y-3">
      <div class="flex items-center gap-3">
        <span class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">1</span>
        <div class="text-xs sm:text-sm text-slate-800">
          <strong>Senaryo Seçimi:</strong> Zümre, MEB tarafından yayımlanan konu soru dağılım tablolarındaki senaryolardan okulun öğrenme hızına ve imkanlarına en uygun olanını seçer.
        </div>
      </div>
      <div class="flex items-center gap-3">
        <span class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">2</span>
        <div class="text-xs sm:text-sm text-slate-800">
          <strong>2 Soruyu Öğretmen Yazar:</strong> Seçilen senaryodaki kazanımlara yönelik <strong>2 açık uçlu soruyu ve ayrıntılı puanlama anahtarını</strong> zümre öğretmenleri bizzat sisteme girer.
        </div>
      </div>
      <div class="flex items-center gap-3">
        <span class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">3</span>
        <div class="text-xs sm:text-sm text-slate-800">
          <strong>Havuzdan 2 Soru Değiştirme:</strong> Bakanlık soru havuzundan gelen sorular beğenilmez veya sınıfa uygun görülmezse zümre <strong>2 soruyu havuzdan başka sorularla değiştirme</strong> hakkına sahiptir.
        </div>
      </div>
      <div class="flex items-center gap-3">
        <span class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">4</span>
        <div class="text-xs sm:text-sm text-slate-800">
          <strong>Güçlük Düzeyi:</strong> Soruların kolay, orta veya zor düzeyde olmasını ve soru puan değerlerini zümre belirler.
        </div>
      </div>
    </div>

    <h2>4. Sabahçı ve Öğlenci Şubeler İçin Sınav Güvenliği</h2>
    <p>
      İkili eğitim veren okullarda sabah sınav olan şubelerin soruları öğlencilere sızdırmasını önlemek amacıyla; OYSS sistemi aynı sınıf düzeyi için <strong>sabahçı ve öğlenci şubelere ayrı ayrı farklı sınavlar üretme</strong> imkânı sağlamaktadır. Zümre başkanı iki farklı grup için ayrı sınav çıktısı alabilir.
    </p>

    <h2>5. Mazeret Sınavları Takvimi ve Uygulama Esasları</h2>
    <p>
      Geçerli sağlık raporu veya resmi mazereti nedeniyle ortak yazılı sınava katılamayan öğrenciler için mazeret sınav süreci şu esaslara göre işletilecektir:
    </p>
    <div class="p-4 bg-teal-50 border-l-4 border-teal-600 rounded-r-xl not-prose text-xs sm:text-sm text-teal-950 font-medium my-4">
      📅 <strong>Mazeret Sınavı Tarihleri:</strong> Okul müdürlüklerinin planlaması doğrultusunda <strong>23-27 Kasım 2026</strong> tarihleri arasında alan zümre öğretmenlerince OYSS üzerinden yapılacaktır.
    </div>
    <ul class="list-disc list-inside space-y-2 text-slate-700">
      <li>Mazeret sınavı, asıl sınav için seçilen aynı senaryoya sadık kalınarak oluşturulacaktır.</li>
      <li>Mazeret sınavında da 2 soru zümre öğretmenleri tarafından hazırlanacak, kalan sorular OYSS havuzundan seçilecektir.</li>
    </ul>

    <h2>6. e-Okul Not Girişi ve Otomatik Analiz Avantajı</h2>
    <p>
      MEB Ölçme ve Değerlendirme Yönetmeliği gereği öğretmenlerin her sınavdan sonra detaylı sınav analizi yapması zorunludur. OYSS, soru bazında girilen puanları alarak:
    </p>
    <ul class="list-disc list-inside space-y-2 text-slate-700">
      <li>Öğrenci bazında hangi konunun anlaşıldığını,</li>
      <li>Şube genelinde hangi öğrenme çıktısında başarı oranının düşük kaldığını,</li>
      <li>Geliştirici (biçimlendirici) geri bildirim raporlarını saniyeler içinde otomatik üretir.</li>
    </ul>

    <!-- İlgili İçerikler ve Öğretmen Araçları Linkleri -->
    <div class="p-5 bg-slate-50 border border-slate-200 rounded-3xl not-prose mt-8 space-y-3">
      <h4 class="font-bold text-slate-900 text-sm flex items-center gap-2">
        <span>🔗</span> İlgili Öğretmen ve Sınav Araçları:
      </h4>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        <a href="/sinav-hazirlama-robotu" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-emerald-700 hover:text-emerald-900 transition-colors shadow-sm block">
          📝 Sınav Hazırlama Robotu &rarr;
        </a>
        <a href="/kategori/ogretmen" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-emerald-700 hover:text-emerald-900 transition-colors shadow-sm block">
          📂 Zümre Toplantı Tutanakları &rarr;
        </a>
        <a href="/kategori/meb-ders-kitabi-cevaplari" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-emerald-700 hover:text-emerald-900 transition-colors shadow-sm block">
          📚 MEB Kitap Soru Çözümleri &rarr;
        </a>
      </div>
    </div>
  </div>
</div>
"""
    },
    {
        "title": "OYSS Hangi Okul ve Derslerde Uygulanmayacak? Kapsam Dışı Kurumlar ve İstisnalar Listesi",
        "slug": "oyss-hangi-okul-ve-derslerde-uygulanmayacak-muafiyetler",
        "excerpt": "Milletlerarası okullar, akşam liseleri, MESEM, hazırlık sınıfları ve yabancı dille fen-matematik okutan okullarda OYSS uygulanacak mı? BEP'li öğrenciler için not girişi nasıl yapılacak? İşte resmi istisna listesi.",
        "category": "Öğretmen",
        "category_slug": "ogretmen",
        "featured_image": "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80",
        "tags": ["OYSS Kapsam Dışı Okullar", "MESEM OYSS", "Özel Eğitim BEP Sınav", "Hazırlık Sınıfları OYSS", "Yabancı Dil Sınavları", "MEB İstisnalar"],
        "content": """
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-amber-950 via-slate-900 to-rose-950 text-white rounded-3xl shadow-xl not-prose border border-amber-500/20">
    <div class="flex items-center gap-2 mb-3">
      <span class="px-3 py-1 rounded-full bg-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
        ⚖️ Mevzuat &amp; İstisnalar Rehberi
      </span>
      <span class="text-xs text-slate-400">MEB ÖDSGM Resmi Hükümleri</span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-white tracking-tight">
      OYSS Muafiyetleri: Hangi Okullarda ve Sınıflarda Ortak Sınav Yapılmayacak?
    </h2>
    <p class="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
      Milli Eğitim Bakanlığı Ortak Yazılı Sınav Sistemi (OYSS) her okul türünü ve dersi kapsamamaktadır. Kılavuzda yer alan muafiyetler, meslek liseleri, yabancı dilde eğitim yapan kurumlar, BEP'li öğrenciler ve hazırlık sınıfları için özel düzenlemeleri inceledik.
    </p>
  </div>

  <div class="prose max-w-none text-slate-800 space-y-6">
    <h2>1. OYSS’nin Kesinlikle Uygulanmayacağı Okul ve Kurumlar</h2>
    <p>
      MEB kılavuzunun 8. maddesi uyarınca, aşağıdaki eğitim kurumları ve programlarında OYSS ortak yazılı sınavları <strong>uygulanmayacaktır:</strong>
    </p>
    <ul class="list-disc list-inside space-y-2 text-slate-700">
      <li><strong>Milletlerarası özel öğretim kurumları,</strong></li>
      <li><strong>Akşam liseleri,</strong></li>
      <li><strong>Mesleki eğitim merkezleri (MESEM),</strong></li>
      <li><strong>Özel eğitim meslek okulları ve özel eğitim uygulama okulları</strong> (I, II ve III. kademe),</li>
      <li>Bu özel eğitim okullarının programlarının uygulandığı <strong>özel eğitim sınıfları.</strong></li>
    </ul>

    <h2>2. OYSS Kapsamı Dışında Bırakılan Dersler ve Sınıflar</h2>
    <p>
      Genel ortaokul ve liselerde dahi bazı sınıf ve dersler OYSS ortak sınav kapsamının dışında tutulmuştur:
    </p>
    <div class="p-4 bg-slate-50 border border-slate-200 rounded-2xl not-prose my-4 space-y-2 text-xs sm:text-sm text-slate-800">
      <div class="flex items-start gap-2">
        <span class="text-amber-600 font-bold">🚫</span>
        <div><strong>7 ve 11. Sınıf İngilizce Dersleri:</strong> 7 ve 11. sınıflardaki İngilizce sınavları OYSS üzerinden değil, okul zümre öğretmenlerince yapılacaktır.</div>
      </div>
      <div class="flex items-start gap-2">
        <span class="text-amber-600 font-bold">🚫</span>
        <div><strong>Hazırlık Sınıfları:</strong> Hazırlık sınıfı uygulayan tüm okulların hazırlık sınıflarındaki hiçbir ders OYSS kapsamında değildir.</div>
      </div>
      <div class="flex items-start gap-2">
        <span class="text-amber-600 font-bold">🚫</span>
        <div><strong>Çoklu Yabancı Dil Sınıfları:</strong> Ortaokul düzeyinde çoklu yabancı dil programı uygulayan şubelerin yabancı dil sınavları OYSS dışındadır (Diğer dersleri OYSS'ye dahildir).</div>
      </div>
      <div class="flex items-start gap-2">
        <span class="text-amber-600 font-bold">🚫</span>
        <div><strong>Azınlık Okulları Din Kültürü:</strong> Azınlık okullarındaki Din Kültürü ve Ahlak Bilgisi dersleri OYSS kapsamı dışındadır.</div>
      </div>
      <div class="flex items-start gap-2">
        <span class="text-amber-600 font-bold">🚫</span>
        <div><strong>Uluslararası Anadolu İHL Yabancı Uyruklu Şubeler:</strong> Yabancı uyruklu öğrencilerin eğitim gördüğü sınıflarda sınavlar zümrece hazırlanır.</div>
      </div>
    </div>

    <h2>3. Mesleki Eğitim (Meslek Liseleri) ve Yoğunlaştırılmış Eğitim Durumu</h2>
    <p>
      Mesleki ve teknik ortaöğretim kurumlarında yoğunlaştırılmış eğitim programı uygulanan sınıflar ile işletmelerde mesleki eğitime (staja) öğrenci gönderilen sınıflarda Ortaöğretim Kurumları Yönetmeliği’nin 45. maddesi gereği ortak sınav yapılmaz.
    </p>
    <blockquote class="p-4 bg-blue-50 border-l-4 border-blue-600 rounded-r-xl not-prose text-xs sm:text-sm text-blue-950 font-medium">
      <strong>Kritik Kural:</strong> Yoğunlaştırılmış eğitim programı uygulayan mesleki ortaöğretim kurumlarında <strong>yalnızca 9. sınıf düzeyinde OYSS uygulanacaktır.</strong> Üst sınıflar işletme ve staj nedeniyle muaftır.
    </blockquote>

    <h2>4. Yabancı Dilde Fen ve Matematik Okutan Okullar Ne Yapacak?</h2>
    <p>
      Ortaöğretim Kurumları Yönetmeliği’nin 10. maddesi doğrultusunda bazı proje okulları ve Anadolu liselerinde matematik ve fen bilimleri grubu dersleri yabancı dille (İngilizce/Almanca/Fransızca) okutulmaktadır.
    </p>
    <p>
      Bu okullarda sınavlar <strong>OYSS kapsamında gerçekleştirilecektir.</strong> Ancak okul alan zümre öğretmenlerince karar alınması halinde, OYSS sistemi üzerinden oluşturulan Türkçe sorular <strong>dersin öğretim dili olan yabancı dile çevrilerek</strong> öğrencilere uygulanabilecektir.
    </p>

    <h2>5. Uluslararası Sertifika ve Diploma Programları (IB, AP vb.)</h2>
    <p>
      Uluslararası diploma veya sertifika programı uygulanan sınıflarda:
    </p>
    <ul class="list-disc list-inside space-y-2 text-slate-700">
      <li><strong>9 ve 10. sınıflarda</strong> sınavlar OYSS üzerinden yapılacaktır.</li>
      <li><strong>11. sınıflarda</strong> Türk Dili ve Edebiyatı, Matematik, Tarih ve Din Kültürü dersleri OYSS kapsamındadır.</li>
      <li>Eğer matematik dersi seçmeli ders kapsamında okutuluyor ve uluslararası program uygulanıyorsa matematik sınavı OYSS kapsamı dışında tutulacaktır.</li>
    </ul>

    <h2>6. BEP Kapsamındaki (Kaynaştırma) Öğrenciler İçin Not Girişi</h2>
    <p>
      Kaynaştırma/bütünleştirme yoluyla eğitim gören Bireyselleştirilmiş Eğitim Programı (BEP) kapsamındaki öğrencilerin sınavları, kendi gelişim düzeylerine ve BEP planlarına uygun olarak zümre öğretmenlerince yapılacaktır.
    </p>
    <p>
      Bu öğrencilerin sınav sonuçları, <strong>öğrencinin almış olduğu toplam puan üzerinden doğrudan e-Okul sistemine</strong> işlenecektir.
    </p>

    <!-- İlgili İçerikler ve Öğretmen Araçları Linkleri -->
    <div class="p-5 bg-slate-50 border border-slate-200 rounded-3xl not-prose mt-8 space-y-3">
      <h4 class="font-bold text-slate-900 text-sm flex items-center gap-2">
        <span>🔗</span> İlgili Öğretmen ve Sınav Araçları:
      </h4>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        <a href="/sinav-hazirlama-robotu" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-amber-700 hover:text-amber-900 transition-colors shadow-sm block">
          📝 Sınav Hazırlama Robotu &rarr;
        </a>
        <a href="/kategori/ogretmen" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-amber-700 hover:text-amber-900 transition-colors shadow-sm block">
          📂 BEP ve Yıllık Ders Planları &rarr;
        </a>
        <a href="/puan-hesaplama-robotu" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-amber-700 hover:text-amber-900 transition-colors shadow-sm block">
          🧮 LGS &amp; YKS Puan Robotu &rarr;
        </a>
      </div>
    </div>
  </div>
</div>
"""
    },
    {
        "title": "MEB Ortak Sınavlarında Yeni Senaryolar, Dinleme-Konuşma Sınavları ve Gizlilik Kuralları",
        "slug": "meb-ortak-yazili-sinav-yeni-senaryolar-dinleme-konusma-sinavlari",
        "excerpt": "ÖDSGM konu soru dağılım tablolarına eklenen yeni senaryolar açıklandı! Türkçe ve İngilizce dinleme-konuşma sınavları OYSS'de nasıl yapılacak? Sınav sorularının sosyal medyada paylaşılma yasağı.",
        "category": "Öğretmen",
        "category_slug": "ogretmen",
        "featured_image": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
        "tags": ["MEB Yeni Senaryolar", "Konu Soru Dağılım Tabloları", "Dinleme Konuşma Sınavı", "OYSS Gizlilik Yasağı", "Açık Uçlu Sınav Kuralları"],
        "content": """
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-violet-950 via-slate-900 to-purple-950 text-white rounded-3xl shadow-xl not-prose border border-violet-500/20">
    <div class="flex items-center gap-2 mb-3">
      <span class="px-3 py-1 rounded-full bg-violet-500/30 text-violet-300 text-xs font-bold uppercase tracking-wider border border-violet-400/30">
        📚 Yeni Senaryolar &amp; Uygulama
      </span>
      <span class="text-xs text-slate-400">MEB ÖDSGM Güncellemesi</span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-white tracking-tight">
      Ortak Sınavlara Eklenen Yeni Senaryolar ve Dil Sınavı Uygulama Esasları
    </h2>
    <p class="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
      Milli Eğitim Bakanlığı, ortak yazılı sınav konu soru dağılım tablolarına yeni senaryolar ekledi. Türkçe ve yabancı dil derslerindeki dinleme/konuşma sınavlarının OYSS ile ilişkisi ve soru paylaşım yasağı netleşti.
    </p>
  </div>

  <div class="prose max-w-none text-slate-800 space-y-6">
    <h2>1. Konu Soru Dağılım Tablolarına Eklenen Yeni Senaryolar</h2>
    <p>
      Bakanlıkça yayımlanan konu soru dağılım tablolarında zümre öğretmenlerine daha fazla seçenek sunmak amacıyla bazı derslerin senaryo sayıları artırılmıştır. İşte güncellenen yeni senaryolar:
    </p>
    <div class="overflow-x-auto not-prose my-4">
      <table class="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
        <thead class="bg-violet-50 text-violet-950 font-bold">
          <tr>
            <th class="p-3 border-b border-slate-200">Ders Adı</th>
            <th class="p-3 border-b border-slate-200">Sınıf ve Sınav</th>
            <th class="p-3 border-b border-slate-200">Eklenen Yeni Senaryo</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 bg-white">
          <tr>
            <td class="p-3 font-bold text-slate-900">Din Kültürü ve Ahlak Bilgisi</td>
            <td class="p-3">6. Sınıf &bull; 1. Yazılı Sınav</td>
            <td class="p-3 font-semibold text-violet-700">5. Senaryo Eklendi</td>
          </tr>
          <tr>
            <td class="p-3 font-bold text-slate-900">Felsefe</td>
            <td class="p-3">10. Sınıf &bull; 1. Yazılı Sınav</td>
            <td class="p-3 font-semibold text-violet-700">5. Senaryo Eklendi</td>
          </tr>
          <tr>
            <td class="p-3 font-bold text-slate-900">Kimya</td>
            <td class="p-3">10. Sınıf &bull; 1. Yazılı Sınav</td>
            <td class="p-3 font-semibold text-violet-700">6. Senaryo Eklendi</td>
          </tr>
          <tr>
            <td class="p-3 font-bold text-slate-900">Biyoloji</td>
            <td class="p-3">9. Sınıf 1 ve 2. Yazılılar &bull; 10. Sınıf 1. Yazılı</td>
            <td class="p-3 font-semibold text-violet-700">Her biri için 4. Senaryo Eklendi</td>
          </tr>
          <tr>
            <td class="p-3 font-bold text-slate-900">Coğrafya</td>
            <td class="p-3">9. Sınıf &bull; 2. Yazılı Sınav</td>
            <td class="p-3 font-semibold text-violet-700">7. Senaryo Eklendi</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>2. Türkçe, Edebiyat ve İngilizce'de Dinleme-Konuşma Sınavları Nasıl Yapılacak?</h2>
    <p>
      MEB Ölçme ve Değerlendirme Yönetmeliği gereği Türkçe, Türk Dili ve Edebiyatı ile yabancı dil derslerinde sınavlar <strong>dört temel dil becerisini (okuma, yazma, dinleme, konuşma)</strong> ölçecek şekilde iki aşamalı yapılmaktadır.
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-4">
      <div class="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
        <h4 class="font-bold text-slate-900 text-sm mb-1">📝 Yazılı Bölümü (Okuma &amp; Yazma)</h4>
        <p class="text-xs text-slate-600 leading-relaxed">
          OYSS üzerinden sistem soruları ve zümre sorularıyla okul geneli ortak yazılı olarak gerçekleştirilecektir.
        </p>
      </div>
      <div class="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
        <h4 class="font-bold text-slate-900 text-sm mb-1">🎙️ Dinleme &amp; Konuşma Sınavı</h4>
        <p class="text-xs text-slate-600 leading-relaxed">
          OYSS üzerinden yapılmayacak! İlgili alan zümre öğretmenleri tarafından ders saatlerinde uygulama esaslarına göre yüz yüze yürütülecektir.
        </p>
      </div>
    </div>

    <h2>3. Sınav Sorularını Sınıfta Çözmek Serbest, Sosyal Medyada Paylaşmak Yasak!</h2>
    <p>
      Sınav sonuçları açıklandıktan sonra öğrencilerin güçlü ve zayıf yönlerini fark edebilmeleri, eksik kazanımların telafi edilebilmesi amacıyla öğretmenler sınav sorularını ve cevap anahtarlarını <strong>sınıf içerisinde öğrencilerle birlikte çözebilecek ve değerlendirebilecektir.</strong>
    </p>
    <blockquote class="p-4 bg-rose-50 border-l-4 border-rose-600 rounded-r-xl not-prose text-xs sm:text-sm text-rose-950 font-medium my-4">
      <strong>MEB Yasal Uyarısı:</strong> Soru ve cevap anahtarlarının okul dışına çıkarılması, fotokopilerinin çoğaltılarak dağıtılması, WhatsApp gruplarında, Telegram kanallarında veya sosyal medyada yayımlanması yasal olarak suç teşkil etmektedir ve kesinlikle yasaktır.
    </blockquote>

    <h2>4. Sağlık Özrü Olan veya Uzun Süre Görevde Olmayan Öğretmenlerin Durumu</h2>
    <p>
      Sağlık özrü veya mazereti sebebiyle uzun süre görev yapamayan ya da eğitim yılı başladıktan sonra okula yeni atanan öğretmenlerin sınıflarında belirlenen senaryonun işlenmesi aksamış olabilir.
    </p>
    <p>
      Böyle durumlarda okul idaresi mazeret bilgilerini sisteme işleyecektir. İlgili dersin ortak sınavı, işlenen kazanımlara uygun olarak <strong>alan zümre öğretmenleri tarafından bağımsız hazırlanarak</strong> uygulanabilecektir.
    </p>

    <!-- İlgili İçerikler ve Öğretmen Araçları Linkleri -->
    <div class="p-5 bg-slate-50 border border-slate-200 rounded-3xl not-prose mt-8 space-y-3">
      <h4 class="font-bold text-slate-900 text-sm flex items-center gap-2">
        <span>🔗</span> İlgili Öğretmen ve Sınav Araçları:
      </h4>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        <a href="/sinav-hazirlama-robotu" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-violet-700 hover:text-violet-900 transition-colors shadow-sm block">
          📝 Sınav Hazırlama Robotu &rarr;
        </a>
        <a href="/kategori/ogretmen" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-violet-700 hover:text-violet-900 transition-colors shadow-sm block">
          📂 2026-2027 Yıllık Planlar &rarr;
        </a>
        <a href="/puan-hesaplama-robotu" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-violet-700 hover:text-violet-900 transition-colors shadow-sm block">
          🧮 LGS &amp; YKS Puan Robotu &rarr;
        </a>
      </div>
    </div>
  </div>
</div>
"""
    }
]

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

for p in posts:
    tags_json = json.dumps(p['tags'], ensure_ascii=False)
    cursor.execute("""
        INSERT OR REPLACE INTO posts 
        (title, slug, excerpt, content, featured_image, category, category_slug, tags, author, is_published, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Matemetrik Eğitim & Sınav Zümresi', 1, ?, ?)
    """, (
        p['title'],
        p['slug'],
        p['excerpt'],
        p['content'].strip(),
        p['featured_image'],
        p['category'],
        p['category_slug'],
        tags_json,
        now_iso,
        now_iso
    ))
    print(f"Post eklendi/güncellendi: {p['slug']}")

conn.commit()
conn.close()
print("Tüm 4 yazı başarıyla matemetrik.db veritabanına eklendi!")
