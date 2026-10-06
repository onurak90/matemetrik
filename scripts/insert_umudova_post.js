const db = require('better-sqlite3')('data/matemetrik.db');

const title = 'Gülnarə M. Umudova İngilis Dili | PDF İndir & Gramer Konu Anlatımı';
const slug = 'gulnare-m-umudova-ingilis-dili-pdf-indir';
const excerpt = 'Gülnarə M. Umudova İngilis Dili ders kitabı ve gramer test bankası PDF indir. İngilizce zamanlar, isimler, modal fiiller, sıfatlar ve sınavlara hazırlık testleri tek eserde.';
const featuredImage = '/uploads/gulnare-umudova-ingilis-dili-cover.jpg';
const pdfUrl = '/uploads/kitaplar/gulnare-umudova-ingilis-dili.pdf';
const now = new Date().toISOString();

const content = `
<div class="space-y-6 text-slate-800 dark:text-slate-200 leading-relaxed">
  <figure class="my-6 text-center">
    <img src="${featuredImage}" alt="Gülnarə M. Umudova İngilis Dili Kitabı PDF İndir" class="w-full max-h-[500px] object-contain rounded-2xl shadow-xl mx-auto bg-slate-900/5 p-2" />
    <figcaption class="text-xs text-slate-500 mt-2 font-medium">Gülnarə M. Umudova — İngilis Dili (Dərs Vəsaiti & Qrammatika Qaydaları)</figcaption>
  </figure>

  <p class="text-lg font-medium text-slate-700 dark:text-slate-300">
    İngilizce dil bilgisi kurallarını eksiksiz, sistematik ve bol örnekli bir şekilde öğrenmek isteyenler için <strong>Gülnarə M. Umudova İngilis Dili</strong> kitabı, alanındaki en kapsamlı başvuru kaynaklarından biridir. Üniversiteye hazırlık, magistratura sınavları, dövlət qulluğu (kamu personeli) ve YDS/YÖKDİL düzeyindeki sınavlara hazırlanan öğrenciler için hazırlanan bu 339 sayfalık dev kaynak, A1 seviyesinden C1 ileri seviyeye kadar tüm gramer yapılarını tek çatı altında toplamaktadır.
  </p>

  <div class="my-8 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
    <div>
      <h3 class="text-lg font-bold text-blue-900 dark:text-blue-200">📥 Gülnarə M. Umudova İngilis Dili Kitabını İndirin</h3>
      <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">339 Sayfa • Yüksek Çözünürlüklü Orijinal PDF • Ücretsiz ve Doğrudan Erişim</p>
    </div>
    <a href="${pdfUrl}" download="Gulnare-M-Umudova-Ingilis-Dili.pdf" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-transform hover:scale-105">
      <span>Kitabı PDF Olarak İndir (64 MB)</span>
    </a>
  </div>

  <h2 class="text-2xl font-black text-slate-900 dark:text-white pt-4 border-b border-slate-200 dark:border-slate-800 pb-2">
    Kitabın Genel Yapısı ve Kapsadığı Konular
  </h2>
  <p>
    Kitap, klasik dil bilgisi ezberciliğinin ötesine geçerek her konuyu mantıksal kuralları, istisnaları, karşılaştırma tabloları ve test sorularıyla ele alır. Gülnarə M. Umudova'nın titizlikle derlediği bu eserde öne çıkan ana üniteler şunlardır:
  </p>

  <ul class="list-disc list-inside space-y-2 pl-2 text-sm sm:text-base">
    <li><strong>The Noun (İsimler):</strong> Sayılabilen ve sayılamayan isimler (Countable & Uncountable), çoğul yapılar, isim tamlamaları ve iyelik hali ('s / of).</li>
    <li><strong>The Article (Artikıllar):</strong> Belirsiz artikıllar (A / An), belirli artikıl (The) ve artikıl kullanılmayan durumlar (Zero Article) arasındaki ince ayrımlar.</li>
    <li><strong>The Pronoun (Zamirler):</strong> Şahıs, iyelik, dönüşlü, işaret ve belgisiz zamirler (Indefinite Pronouns: somebody, anyone, nowhere vb.).</li>
    <li><strong>The Adjective & The Adverb (Sıfat ve Zarflar):</strong> Derecelendirme (Comparative & Superlative), düzensiz yapılar ve cümle içindeki sıralama kuralları.</li>
    <li><strong>Verb Tenses (Zamanlar Sistemi):</strong> Simple Present, Present Continuous, Present Perfect, Past Tenses, Future Tenses ve zaman uyumları (Sequence of Tenses).</li>
    <li><strong>Modal Verbs (Kip Belirteçleri):</strong> Can, Could, May, Might, Must, Have to, Should, Ought to ve geçmişe yönelik çıkarım kipleri (Must have V3 vb.).</li>
    <li><strong>The Passive Voice (Edilgen Çatı):</strong> Tüm zamanlarda edilgen yapıya dönüştürme ve Causative (have/get something done) kullanımları.</li>
    <li><strong>Conditionals & Wish Clauses (Şart Cümleleri):</strong> Type 0, 1, 2, 3 ve karışık şart cümleleri (Mixed Conditionals).</li>
    <li><strong>Reported Speech (Dolaylı Anlatım):</strong> Düz cümlelerin, emirlerin ve soru cümlelerinin dolaylı aktarımı.</li>
    <li><strong>Relative Clauses (İlgi Cümlecikleri):</strong> Who, Whom, Whose, Which, That kullanımları; Defining ve Non-defining ayrımları.</li>
  </ul>

  <h2 class="text-2xl font-black text-slate-900 dark:text-white pt-6 border-b border-slate-200 dark:border-slate-800 pb-2">
    Bu Kitap Kimler İçin Uygundur?
  </h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
    <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
      <h4 class="font-bold text-blue-600 dark:text-blue-400">🎓 Magistratura ve Üniversite Öğrencileri</h4>
      <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">Yüksek lisans ve lisansüstü giriş sınavlarında çıkan ileri düzey gramer ve okuma anlama sorularında tam başarı sağlar.</p>
    </div>
    <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
      <h4 class="font-bold text-emerald-600 dark:text-emerald-400">🏛️ Kamu Personeli & Dövlət Qulluğu Adayları</h4>
      <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">Devlet memurluğu yabancı dil testlerinde çıkan tuzak gramer soruları için özel ipuçları ve test çözümleri barındırır.</p>
    </div>
    <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
      <h4 class="font-bold text-indigo-600 dark:text-indigo-400">📝 YDS, YÖKDİL ve Dil Sınavlarına Girenler</h4>
      <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">Akademik dil sınavlarında zaman kazandıran pratik kurallar ve şablon soru tipleri detaylı incelenmiştir.</p>
    </div>
    <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
      <h4 class="font-bold text-amber-600 dark:text-amber-400">👩‍🏫 İngilizce Öğretmenleri ve Eğitmenler</h4>
      <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">Ders anlatımlarında kullanılabilecek zengin örnek cümleler, alıştırmalar ve test şablonları sunar.</p>
    </div>
  </div>

  <h2 class="text-2xl font-black text-slate-900 dark:text-white pt-6 border-b border-slate-200 dark:border-slate-800 pb-2">
    Kitabın Güçlü Yönleri ve Metodolojisi
  </h2>
  <p>
    Gülnarə M. Umudova'nın bu eserini diğer kaynaklardan ayıran en büyük fark, <strong>Azerbaycan ve Türk öğrencilerin İngilizce öğrenirken en sık yaptığı hatalara</strong> odaklanmasıdır. Ana dil mantığından kaynaklanan çeviri hataları, artikel karmaşaları ve zaman uyumsuzlukları her ünitenin başında "Diqqət / Dikkat Edilmesi Gereken Noktalar" başlığıyla vurgulanmıştır.
  </p>

  <blockquote class="p-4 my-4 border-l-4 border-blue-600 bg-slate-50 dark:bg-slate-800/80 rounded-r-xl italic text-sm text-slate-700 dark:text-slate-300">
    "İngilizce bir kuralı sadece bilmek yetmez; o kuralın sınav sorusunda karşınıza hangi çeldirici seçeneklerle geleceğini sezmek gerekir. Bu kitap, soru çözme refleksinizi en üst noktaya taşır."
  </blockquote>

  <h2 class="text-2xl font-black text-slate-900 dark:text-white pt-6 border-b border-slate-200 dark:border-slate-800 pb-2">
    PDF Dosyası Bilgileri ve İndirme Linki
  </h2>
  <div class="overflow-x-auto">
    <table class="w-full text-left text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden my-4">
      <thead class="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold">
        <tr>
          <th class="p-3">Özellik</th>
          <th class="p-3">Açıklama</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
        <tr>
          <td class="p-3 font-semibold">Kitap Adı</td>
          <td class="p-3">İngilis Dili (Dərs Vəsaiti)</td>
        </tr>
        <tr>
          <td class="p-3 font-semibold">Yazar</td>
          <td class="p-3">Gülnarə M. Umudova</td>
        </tr>
        <tr>
          <td class="p-3 font-semibold">Sayfa Sayısı</td>
          <td class="p-3">339 Sayfa (Tam Metin)</td>
        </tr>
        <tr>
          <td class="p-3 font-semibold">Dosya Formatı</td>
          <td class="p-3">PDF (Arama Yapılabilir & Yazdırılabilir)</td>
        </tr>
        <tr>
          <td class="p-3 font-semibold">Dosya Boyutu</td>
          <td class="p-3">64 MB</td>
        </tr>
        <tr>
          <td class="p-3 font-semibold">Erişim</td>
          <td class="p-3 text-emerald-600 font-bold">Ücretsiz Doğrudan İndirme</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="my-6 text-center">
    <a href="${pdfUrl}" download="Gulnare-M-Umudova-Ingilis-Dili.pdf" class="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-base shadow-lg transition-all hover:shadow-xl hover:scale-105">
      <span>📥 Gülnarə M. Umudova İngilis Dili PDF İndir (339 Sayfa)</span>
    </a>
  </div>

  <h2 class="text-2xl font-black text-slate-900 dark:text-white pt-6 border-b border-slate-200 dark:border-slate-800 pb-2">
    Sıkça Sorulan Sorular (SSS)
  </h2>
  <div class="space-y-4 pt-2 text-sm">
    <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
      <h3 class="font-bold text-slate-900 dark:text-white">Kitap sıfırdan başlayanlar için uygun mudur?</h3>
      <p class="text-slate-600 dark:text-slate-400 mt-1">Evet, kitap alfabeden ve temel isim/zamir yapılarından başlayarak kademeli şekilde ileri seviyeye doğru ilerlemektedir. Her seviyeden öğrenci rahatlıkla faydalanabilir.</p>
    </div>
    <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
      <h3 class="font-bold text-slate-900 dark:text-white">Kitapta alıştırma ve testlerin cevapları var mı?</h3>
      <p class="text-slate-600 dark:text-slate-400 mt-1">Evet, ünite sonlarında yer alan testler ve alıştırmaların cevap anahtarları mevcuttur; böylece kendi kendinize çalışma (self-study) için son derece elverişlidir.</p>
    </div>
    <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
      <h3 class="font-bold text-slate-900 dark:text-white">PDF dosyasını telefon ve tablette açabilir miyim?</h3>
      <p class="text-slate-600 dark:text-slate-400 mt-1">Evet, standart PDF formatında olduğu için tüm akıllı telefonlar, tabletler, e-kitap okuyucular ve bilgisayarlarda sorunsuz çalışır.</p>
    </div>
  </div>
</div>
`;

const tags = JSON.stringify([
  'Gülnarə Umudova',
  'İngilis Dili PDF',
  'İngilizce Gramer',
  'İngilis Dili Qrammatika',
  'İngilizce Ders Notları',
  'PDF İndir',
  'Magistratura İngilis Dili',
]);

const insert = db.prepare(`
  INSERT INTO posts (title, slug, excerpt, content, featured_image, category, category_slug, tags, author, views, is_published, created_at, updated_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 124, 1, ?, ?)
`);

insert.run(
  title,
  slug,
  excerpt,
  content,
  featuredImage,
  'Blog',
  'blog',
  tags,
  'Matemetrik Eğitim',
  now,
  now
);

console.log('Post inserted successfully with slug: ' + slug);
