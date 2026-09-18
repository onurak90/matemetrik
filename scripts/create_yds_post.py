import sqlite3
import datetime

def get_db():
    return sqlite3.connect('data/matemetrik.db')

now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

faq_items = [
    {
        "question": "YDS çıkmış soruları nereden ve nasıl indirebilirim?",
        "answer": "YDS ve e-YDS çıkmış soru kitapçıkları ÖSYM (Ölçme, Seçme ve Yerleştirme Merkezi) resmî web sitesi (osym.gov.tr) üzerinde her sınav sonrası %10'luk temel soru kitapçığı olarak kamuoyuna açılmaktadır. Sınava başvuran adaylar ise ÖSYM AİS (Aday İşlemleri Sistemi) üzerinden sınav sorularının tamamına 10 gün boyunca erişebilmektedir. Sitemizdeki arşiv butonlarından geçmiş yıllara ait yayımlanmış kitapçıklara tek tıkla ulaşabilirsiniz."
    },
    {
        "question": "YDS'de toplam kaç soru var ve sınav süresi ne kadardır?",
        "answer": "YDS (Yabancı Dil Bilgisi Seviye Tespit Sınavı) toplam 80 çoktan seçmeli sorudan oluşur. Sınav süresi 180 dakika (3 saattir). Sınavda yanlış cevaplar doğru cevapları götürmez (net hesabı yapılmaz; her doğru soru 1.25 puan değerindedir)."
    },
    {
        "question": "YDS puan baremleri ve seviyeleri nelerdir?",
        "answer": "YDS'de alınan puanlar 5 seviyede değerlendirilir: 90-100 puan arası (A Seviyesi), 80-89 puan arası (B Seviyesi), 70-79 puan arası (C Seviyesi), 60-69 puan arası (D Seviyesi), 50-59 puan arası (E Seviyesi). Akademik kadro başvurularında (doçentlik vb.) genellikle en az 65 veya 70 (C seviyesi) şartı aranmaktadır."
    },
    {
        "question": "e-YDS ile basılı YDS sorularının zorluğu aynı mıdır?",
        "answer": "Evet. e-YDS (Elektronik Yabancı Dil Sınavı) ile basılı YDS sınavları aynı soru havuzundan, eşdeğer zorluk ve kapsam standartlarına göre hazırlanır. Her iki sınavın geçerliliği ve puan karşılığı tamamen eşittir."
    },
    {
        "question": "YDS çıkmış soruları çözmek puanı ne kadar artırır?",
        "answer": "ÖSYM'nin soru hazırlama metodolojisi, belirli akademik kelime aileleri (collocations, academic word list) ve cümle bağlaç kalıpları üzerine kuruludur. Son 5 yılın YDS sorularını analiz ederek, bilmediğiniz kelimeleri çıkartıp zaman tutarak çözmek puanınızı ortalama 15-25 puan arasında yukarı taşır."
    },
    {
        "question": "YDS puanı kaç yıl geçerlidir?",
        "answer": "ÖSYM mevzuatına göre YDS sonuçları, sınav tarihinden itibaren 5 yıl süreyle geçerlidir. Ancak kurumlar ve üniversiteler kendi mevzuatlarında daha kısa bir geçerlilik süresi (örneğin 2 veya 3 yıl) belirleyebilir."
    }
]

faq_schema_json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": item["question"],
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item["answer"]
            }
        } for item in faq_items
    ]
}

import json
faq_script_tag = f'<script type="application/ld+json">{json.dumps(faq_schema_json, ensure_ascii=False)}</script>'

content_html = f'''{faq_script_tag}
<p class="lead text-lg text-slate-700 leading-relaxed font-medium">
  <strong>Yabancı Dil Bilgisi Seviye Tespit Sınavı (YDS)</strong> ve elektronik ortamda uygulanan <strong>e-YDS</strong>, akademik kariyer hedefleyen lisansüstü adayları, doçent adayları, TUS/DUS hekimleri ve kamu personeli için en kritik dil yeterlilik ölçütüdür. ÖSYM sınav mantığını kavramanın, soru tiplerine aşina olmanın ve hedeflediğiniz (70+, 80+, 90+) puana ulaşmanın en kesin yolu <strong>YDS çıkmış sorularını detaylı analiz ederek çözmektir</strong>.
</p>

<!-- HIGHLIGHT ALERT CARD -->
<div class="p-6 my-8 rounded-3xl bg-gradient-to-r from-teal-50 via-emerald-50 to-cyan-50 border border-teal-200 shadow-sm">
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div class="space-y-1">
      <span class="inline-block px-3 py-1 rounded-full bg-teal-600 text-white text-xs font-bold uppercase tracking-wider">
        ÖSYM Resmî YDS Arşivi
      </span>
      <h3 class="text-xl font-black text-slate-900">
        YDS Çıkmış Sorular ve Cevap Anahtarları PDF Arşivi
      </h3>
      <p class="text-xs sm:text-sm text-slate-600">
        2013-2024 yılları arasında ÖSYM tarafından uygulanan tüm YDS/1, YDS/2, YDS/3 ve e-YDS temel soru kitapçıklarına ve cevaplarına aşağıdaki interaktif panelden doğrudan erişebilirsiniz.
      </p>
    </div>
    <a
      href="https://www.osym.gov.tr"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md shadow-teal-600/20 transition-all shrink-0"
    >
      ÖSYM Resmî Sayfası &rarr;
    </a>
  </div>
</div>

<h2>Yıllara Göre YDS Çıkmış Sorular ve Temel Soru Kitapçıkları (PDF)</h2>
<p>
  Aşağıdaki butonları kullanarak sınava girdiğiniz veya hazırlandığınız döneme ait yayımlanmış resmi soru kitapçıklarını inceleyebilirsiniz:
</p>

<!-- YEARS GRID -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">

  <!-- 2024 -->
  <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
    <div class="flex items-center justify-between pb-2 border-b border-slate-100">
      <span class="text-lg font-black text-slate-900">2024 YDS Soruları</span>
      <span class="text-[11px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold">En Güncel</span>
    </div>
    <p class="text-xs text-slate-500">2024 İlkbahar & Sonbahar oturumları ve e-YDS örnekleri.</p>
    <div class="flex flex-col gap-2 pt-1">
      <a href="https://www.osym.gov.tr" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-400 text-xs font-bold text-slate-800 hover:text-teal-700 transition-colors">
        <span>📄 2024 YDS / 1 Soru Kitapçığı</span>
        <span class="text-teal-600">ÖSYM &rarr;</span>
      </a>
      <a href="https://www.osym.gov.tr" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-400 text-xs font-bold text-slate-800 hover:text-teal-700 transition-colors">
        <span>📄 2024 YDS / 2 Soru Kitapçığı</span>
        <span class="text-teal-600">ÖSYM &rarr;</span>
      </a>
    </div>
  </div>

  <!-- 2023 -->
  <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
    <div class="flex items-center justify-between pb-2 border-b border-slate-100">
      <span class="text-lg font-black text-slate-900">2023 YDS Soruları</span>
      <span class="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">ÖSYM</span>
    </div>
    <p class="text-xs text-slate-500">2023 YDS/1 ve YDS/2 temel soru kitapçığı ve çözümleri.</p>
    <div class="flex flex-col gap-2 pt-1">
      <a href="https://www.osym.gov.tr" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-400 text-xs font-bold text-slate-800 hover:text-teal-700 transition-colors">
        <span>📄 2023 YDS / 1 Soru Kitapçığı</span>
        <span class="text-teal-600">ÖSYM &rarr;</span>
      </a>
      <a href="https://www.osym.gov.tr" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-400 text-xs font-bold text-slate-800 hover:text-teal-700 transition-colors">
        <span>📄 2023 YDS / 2 Soru Kitapçığı</span>
        <span class="text-teal-600">ÖSYM &rarr;</span>
      </a>
    </div>
  </div>

  <!-- 2022 -->
  <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
    <div class="flex items-center justify-between pb-2 border-b border-slate-100">
      <span class="text-lg font-black text-slate-900">2022 YDS Soruları</span>
      <span class="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">ÖSYM</span>
    </div>
    <p class="text-xs text-slate-500">2022 YDS/1 ve YDS/2 soru dağılımları ve cevap anahtarı.</p>
    <div class="flex flex-col gap-2 pt-1">
      <a href="https://www.osym.gov.tr" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-400 text-xs font-bold text-slate-800 hover:text-teal-700 transition-colors">
        <span>📄 2022 YDS / 1 Kitapçığı</span>
        <span class="text-teal-600">ÖSYM &rarr;</span>
      </a>
      <a href="https://www.osym.gov.tr" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-400 text-xs font-bold text-slate-800 hover:text-teal-700 transition-colors">
        <span>📄 2022 YDS / 2 Kitapçığı</span>
        <span class="text-teal-600">ÖSYM &rarr;</span>
      </a>
    </div>
  </div>

  <!-- 2021 -->
  <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
    <div class="flex items-center justify-between pb-2 border-b border-slate-100">
      <span class="text-lg font-black text-slate-900">2021 YDS Soruları</span>
      <span class="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">ÖSYM</span>
    </div>
    <p class="text-xs text-slate-500">2021 YDS/1 ve YDS/2 İngilizce sınav soruları arşivi.</p>
    <div class="flex flex-col gap-2 pt-1">
      <a href="https://www.osym.gov.tr" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-400 text-xs font-bold text-slate-800 hover:text-teal-700 transition-colors">
        <span>📄 2021 YDS / 1 Kitapçığı</span>
        <span class="text-teal-600">ÖSYM &rarr;</span>
      </a>
      <a href="https://www.osym.gov.tr" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-400 text-xs font-bold text-slate-800 hover:text-teal-700 transition-colors">
        <span>📄 2021 YDS / 2 Kitapçığı</span>
        <span class="text-teal-600">ÖSYM &rarr;</span>
      </a>
    </div>
  </div>

  <!-- 2020 -->
  <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
    <div class="flex items-center justify-between pb-2 border-b border-slate-100">
      <span class="text-lg font-black text-slate-900">2020 YDS Soruları</span>
      <span class="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">ÖSYM</span>
    </div>
    <p class="text-xs text-slate-500">2020 yılı YDS oturumları ve e-YDS deneme soruları.</p>
    <div class="flex flex-col gap-2 pt-1">
      <a href="https://www.osym.gov.tr" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-400 text-xs font-bold text-slate-800 hover:text-teal-700 transition-colors">
        <span>📄 2020 YDS Soru Kitapçığı</span>
        <span class="text-teal-600">ÖSYM &rarr;</span>
      </a>
    </div>
  </div>

  <!-- 2019-2013 Arşivi -->
  <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
    <div class="flex items-center justify-between pb-2 border-b border-slate-100">
      <span class="text-lg font-black text-slate-900">2013 - 2019 Arşivi</span>
      <span class="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">Klasik Dönem</span>
    </div>
    <p class="text-xs text-slate-500">YDS'nin ilk başladığı 2013 yılından 2019'a kadar tüm oturumlar.</p>
    <div class="flex flex-col gap-2 pt-1">
      <a href="https://www.osym.gov.tr" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-400 text-xs font-bold text-slate-800 hover:text-teal-700 transition-colors">
        <span>📚 Tüm Arşiv Kitapçıkları</span>
        <span class="text-teal-600">ÖSYM &rarr;</span>
      </a>
    </div>
  </div>

</div>

<h2>YDS Soru Tipleri ve 80 Sorunun Tam Analizi</h2>
<p>
  YDS sınavı 80 çoktan seçmeli sorudan meydana gelir. Her soru tipi adayların farklı bir dil becerisini (kelime bilgisi, dilbilgisi, okuma-anlama, mantıksal akış kurma) ölçmeyi amaçlar:
</p>

<div class="overflow-x-auto my-6">
  <table class="min-w-full text-sm text-left text-slate-700 border border-slate-200 rounded-xl overflow-hidden">
    <thead class="bg-slate-100 text-slate-900 font-bold text-xs uppercase border-b border-slate-200">
      <tr>
        <th class="py-3 px-4">Soru Tipi</th>
        <th class="py-3 px-4">Soru Sayısı</th>
        <th class="py-3 px-4">Ölçülen Beceriler ve Konu Kapsamı</th>
        <th class="py-3 px-4">Kritik Taktik &amp; Püf Noktası</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-100">
      <tr>
        <td class="py-3 px-4 font-bold text-teal-700">1. Kelime Bilgisi (Vocabulary)</td>
        <td class="py-3 px-4 font-semibold">6 Soru</td>
        <td class="py-3 px-4">1 İsim, 1 Sıfat, 1 Zarf, 2 Fiil ve 1 Phrasal Verb (Deyimsel Fiil).</td>
        <td class="py-3 px-4">Kelimeleri tek başına değil eşdizimlilikleriyle (collocations) öğrenin.</td>
      </tr>
      <tr>
        <td class="py-3 px-4 font-bold text-teal-700">2. Dilbilgisi (Grammar)</td>
        <td class="py-3 px-4 font-semibold">10 Soru</td>
        <td class="py-3 px-4">Zamanlar (Tenses), Edatlar (Prepositions), Bağlaçlar (Conjunctions), Modals, Passive.</td>
        <td class="py-3 px-4">Zaman uyumu kurallarına ve zıtlık/sebep bağlaçlarının anlamlarına odaklanın.</td>
      </tr>
      <tr>
        <td class="py-3 px-4 font-bold text-teal-700">3. Cloze Test</td>
        <td class="py-3 px-4 font-semibold">10 Soru</td>
        <td class="py-3 px-4">2 farklı paragraf metni; her birinde 5 boşluk (Gramer + Kelime + Edat).</td>
        <td class="py-3 px-4">Boşluğun öncesi ve sonrasındaki cümlenin bağlamını bütüncül değerlendirin.</td>
      </tr>
      <tr>
        <td class="py-3 px-4 font-bold text-teal-700">4. Cümle Tamamlama</td>
        <td class="py-3 px-4 font-semibold">10 Soru</td>
        <td class="py-3 px-4">Yarım bırakılmış cümlenin mantıksal, zamansal ve anlamsal olarak tamamlanması.</td>
        <td class="py-3 px-4">Özne uyumuna (referent pronoun) ve bağlacın pozitif/negatif yönüne dikkat edin.</td>
      </tr>
      <tr>
        <td class="py-3 px-4 font-bold text-teal-700">5. Çeviri Soruları</td>
        <td class="py-3 px-4 font-semibold">6 Soru</td>
        <td class="py-3 px-4">3 İngilizce &rarr; Türkçe, 3 Türkçe &rarr; İngilizce çeviri.</td>
        <td class="py-3 px-4">Cümlenin ana yüklemini ve öznesini bularak seçenekleri hızla eleyin.</td>
      </tr>
      <tr>
        <td class="py-3 px-4 font-bold text-teal-700">6. Paragraf Okuma-Anlama</td>
        <td class="py-3 px-4 font-semibold">20 Soru</td>
        <td class="py-3 px-4">5 farklı akademik metin; her metin için 4 soru (Toplam 20 soru - puanın %25'i).</td>
        <td class="py-3 px-4">Önce soruları okuyup anahtar kelimeleri belirleyin, ardından metni tarayın.</td>
      </tr>
      <tr>
        <td class="py-3 px-4 font-bold text-teal-700">7. Diyalog Tamamlama</td>
        <td class="py-3 px-4 font-semibold">5 Soru</td>
        <td class="py-3 px-4">İki kişi arasında geçen konuşmada boş bırakılan ifadenin tespiti.</td>
        <td class="py-3 px-4">Boşluktan hemen önceki soruya ve hemen sonraki cevaba odaklanın.</td>
      </tr>
      <tr>
        <td class="py-3 px-4 font-bold text-teal-700">8. Anlamca En Yakın Cümle</td>
        <td class="py-3 px-4 font-semibold">4 Soru</td>
        <td class="py-3 px-4">Restatement: Verilen cümlenin aynı anlamı farklı yapıyla ifade eden karşılığı.</td>
        <td class="py-3 px-4">Zaman kalıbı, kesinlik/olasılık derecesi (must/might) ve karşılaştırma eşleştirmesi yapın.</td>
      </tr>
      <tr>
        <td class="py-3 px-4 font-bold text-teal-700">9. Duruma Uygun Düşen İfade</td>
        <td class="py-3 px-4 font-semibold">4 Soru</td>
        <td class="py-3 px-4">Senaryo bazlı durumsal iletişim soruları.</td>
        <td class="py-3 px-4">Muhatabın statüsüne (arkadaş, profesör, yabancı) ve üslup inceliğine dikkat edin.</td>
      </tr>
      <tr>
        <td class="py-3 px-4 font-bold text-teal-700">10. Akışı Bozan Cümle</td>
        <td class="py-3 px-4 font-semibold">5 Soru</td>
        <td class="py-3 px-4">Paragrafın ana fikrinden ve genel tonundan sapan ilgisiz cümlenin bulunması.</td>
        <td class="py-3 px-4">Özne ve zamir takibi (he, this process, these results) yaparak kopukluğu yakalayın.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>YDS Çıkmış Soruları Çözerken Hangi Strateji İzlenmeli?</h2>
<ul class="space-y-3 my-4">
  <li><strong>1. Sondan Başa Doğru İlerleyin:</strong> Sınav dilinin güncelliğini yakalamak adına önce 2024, ardından 2023 ve 2022 yıllarının sorularını çözün. ÖSYM'nin son yıllardaki soru tarzı ile 10 yıl önceki soru tarzı arasında farklar bulunmaktadır.</li>
  <li><strong>2. Süre Tutarak Gerçek Sınav Simülasyonu Yapın:</strong> Soruları parça parça değil, 180 dakikalık blok oturumlar halinde çözün. 80 soru zihinsel olarak ciddi odaklanma gerektirir.</li>
  <li><strong>3. Bilinmeyen Akademik Kelimeleri Deftere Not Edin:</strong> YDS kelime sorularında ve paragraflarda çıkan kelimeler rastgele değildir; Academic Word List (AWL) temellidir. Çıkmış sorulardaki tüm şıkları inceleyin; bir yıl şıklarda çeldirici olan kelime, ertesi yıl doğru cevap olabilmektedir.</li>
  <li><strong>4. Yanlış Analiz Defteri Tutun:</strong> Bir soruyu neden yanlış yaptığınızı (kelime eksikliği mi, dikkat hatası mı, zaman uyuşmazlığı mı) belirlemeden bir sonraki denemeye geçmeyin.</li>
</ul>

<h2>YDS Puan Baremleri ve Seviye Dağılımı</h2>
<div class="grid grid-cols-2 sm:grid-cols-5 gap-3 my-6">
  <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
    <div class="text-2xl font-black text-emerald-700">A Düzeyi</div>
    <div class="text-xs font-bold text-slate-700 mt-1">90 - 100 Puan</div>
    <div class="text-[10px] text-slate-500 mt-0.5">Üst Düzey Yeterlilik</div>
  </div>
  <div class="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-center">
    <div class="text-2xl font-black text-teal-700">B Düzeyi</div>
    <div class="text-xs font-bold text-slate-700 mt-1">80 - 89 Puan</div>
    <div class="text-[10px] text-slate-500 mt-0.5">İleri Düzey Yeterlilik</div>
  </div>
  <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-center">
    <div class="text-2xl font-black text-indigo-700">C Düzeyi</div>
    <div class="text-xs font-bold text-slate-700 mt-1">70 - 79 Puan</div>
    <div class="text-[10px] text-slate-500 mt-0.5">Akademik Baraj</div>
  </div>
  <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
    <div class="text-2xl font-black text-amber-700">D Düzeyi</div>
    <div class="text-xs font-bold text-slate-700 mt-1">60 - 69 Puan</div>
    <div class="text-[10px] text-slate-500 mt-0.5">Orta Düzey Yeterlilik</div>
  </div>
  <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-center">
    <div class="text-2xl font-black text-rose-700">E Düzeyi</div>
    <div class="text-xs font-bold text-slate-700 mt-1">50 - 59 Puan</div>
    <div class="text-[10px] text-slate-500 mt-0.5">Temel Düzey Yeterlilik</div>
  </div>
</div>

<h2>Sıkça Sorulan Sorular (SSS)</h2>
<div class="divide-y divide-slate-100 my-6">
  <div class="py-4 space-y-1.5">
    <h3 class="text-base font-bold text-slate-900">YDS çıkmış soruları nereden ve nasıl indirebilirim?</h3>
    <p class="text-sm text-slate-600 leading-relaxed">
      YDS ve e-YDS çıkmış soru kitapçıkları ÖSYM resmî web sitesi (osym.gov.tr) üzerinde her sınav sonrası yayımlanmaktadır. Sayfamızdaki butonlar doğrudan ÖSYM resmî arşiv kaynaklarına yönlendirmektedir.
    </p>
  </div>
  <div class="py-4 space-y-1.5">
    <h3 class="text-base font-bold text-slate-900">YDS'de toplam kaç soru var ve sınav süresi ne kadardır?</h3>
    <p class="text-sm text-slate-600 leading-relaxed">
      YDS sınavı toplam 80 çoktan seçmeli sorudan oluşur ve sınav süresi 180 dakikadır. Yanlış cevaplar doğruyu götürmez; her doğru yanıt 1.25 puan kazandırır.
    </p>
  </div>
  <div class="py-4 space-y-1.5">
    <h3 class="text-base font-bold text-slate-900">e-YDS ile basılı YDS sınavı arasında fark var mıdır?</h3>
    <p class="text-sm text-slate-600 leading-relaxed">
      Hayır, sınavın zorluk derecesi, soru tipi dağılımı, süresi ve geçerliliği tamamen aynıdır. Tek fark e-YDS'nin ÖSYM elektronik sınav merkezlerinde bilgisayar başında yapılmasıdır.
    </p>
  </div>
  <div class="py-4 space-y-1.5">
    <h3 class="text-base font-bold text-slate-900">YDS puanının geçerlilik süresi kaç yıldır?</h3>
    <p class="text-sm text-slate-600 leading-relaxed">
      YDS sonuçları ÖSYM mevzuatına göre 5 yıl geçerlidir. Ancak bazı kurumlar ve üniversiteler kendi yönetmeliklerinde bu süreyi 2 veya 3 yıl olarak sınırlandırabilir.
    </p>
  </div>
</div>

<h2>İlgili Sınavlar ve Öğretmen Araçlarımız</h2>
<ul class="space-y-2 my-4">
  <li>
    🎓 <a href="/post/ales-cikmis-sorular-2025-pdf" class="text-teal-600 font-bold hover:underline">ALES Çıkmış Sorular ve Çözüm Videoları</a>: Akademik kadro ve lisansüstü eğitim için ALES sayısal &amp; sözel çıkmış soruları.
  </li>
  <li>
    🗂️ <a href="/kategori/ales" class="text-teal-600 font-bold hover:underline">ALES Kategorisindeki Tüm İçerikler</a>: ALES matematik, sayısal mantık ve sınav hazırlık rehberleri.
  </li>
  <li>
    📄 <a href="/sinav-hazirlama-robotu" class="text-teal-600 font-bold hover:underline">MEB Sınav Hazırlama Robotu</a>: Kendi test ve yazılı sınav kağıtlarınızı çift sütunlu A4 PDF olarak dizin.
  </li>
  <li>
    📅 <a href="/yillik-plan-hazirlama" class="text-teal-600 font-bold hover:underline">Yıllık Plan Hazırlama Robotu</a>: Tüm kademeler için 2026-2027 MEB taslak çerçeve planları.
  </li>
</ul>
'''

def main():
    conn = get_db()
    c = conn.cursor()

    slug = 'yds-cikmis-sorular-ve-cevap-anahtarlari-pdf-indir'
    title = 'YDS Çıkmış Sorular ve Cevap Anahtarları (Tüm Yıllar PDF İndir & Çözümlü Rehber)'
    category = 'YDS'
    category_slug = 'yds'
    featured_image = '/uploads/cover-yds-cikmis-sorular-arsivi-pdf.webp'
    excerpt = 'ÖSYM YDS ve e-YDS tüm yıllara ait çıkmış sorular, cevap anahtarları PDF arşivi (2013-2024), 80 soru tipi analizi, kelime stratejileri ve sınav taktikleri.'
    tags = 'yds çıkmış sorular, yds çıkmış sorular pdf, yds cevap anahtarı, yds soruları indir, ösym yds, e-yds soruları, ingilizce yds hazırlık'
    author = 'Cavenaghi'

    c.execute("SELECT id FROM posts WHERE slug=?", (slug,))
    row = c.fetchone()
    if row:
        c.execute("""
            UPDATE posts 
            SET title=?, category=?, category_slug=?, featured_image=?, excerpt=?, tags=?, author=?, content=?, updated_at=?
            WHERE id=?
        """, (title, category, category_slug, featured_image, excerpt, tags, author, content_html, now, row[0]))
        print(f"Updated YDS post ID: {row[0]}")
    else:
        c.execute("""
            INSERT INTO posts (title, slug, category, category_slug, featured_image, excerpt, tags, author, content, is_published, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
        """, (title, slug, category, category_slug, featured_image, excerpt, tags, author, content_html, now, now))
        print(f"Inserted new YDS post: {slug}")

    conn.commit()
    conn.close()
    print("YDS post created successfully!")

if __name__ == '__main__':
    main()
