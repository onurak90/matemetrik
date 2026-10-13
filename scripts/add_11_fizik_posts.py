import sqlite3
import json
from datetime import datetime

conn = sqlite3.connect('data/matemetrik.db')
cursor = conn.cursor()
now_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

smart_link = 'https://araplhn.org/4/102a74e644a5d32555e92e2872366185'
pdf_path = '/uploads/11-sinif-fizik-ders-kitabi-cevaplari-meb.pdf'

# 1. PILLAR POST: 11. Sınıf Fizik Ders Kitabı Cevapları MEB PDF
pillar_slug = '11-sinif-fizik-ders-kitabi-cevaplari-meb-pdf'
pillar_title = '11. Sınıf Fizik Ders Kitabı Cevapları (MEB - Türkiye Yüzyılı Maarif Modeli) PDF İndir'
pillar_excerpt = '2024-2025 ve 2026-2027 MEB güncel müfredatına uygun 11. sınıf fizik ders kitabı cevapları, 1, 2 ve 3. ünite alıştırma çözümleri, yazılı hazırlık soruları ve ölçme değerlendirme cevap anahtarı tek parça PDF.'
pillar_img = 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=1200&q=80'

pillar_content = f'''
<div class="space-y-8">
  <div class="p-6 bg-gradient-to-br from-indigo-50 via-slate-50 to-blue-50 rounded-3xl border border-indigo-100 shadow-sm not-prose">
    <div class="flex items-center justify-between flex-wrap gap-2">
      <span class="px-3.5 py-1 rounded-full bg-indigo-600 text-white text-xs font-black tracking-wide uppercase">
        MEB &amp; Türkiye Yüzyılı Maarif Modeli
      </span>
      <span class="text-xs font-semibold text-slate-500">
        67 Sayfalık Tam Metin Çözüm Kitapçığı
      </span>
    </div>
    <h2 class="text-xl sm:text-2xl font-black text-slate-900 mt-3">
      11. Sınıf Fizik Ders Kitabı Çözümleri ve Resmi Cevap Anahtarı
    </h2>
    <p class="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
      Millî Eğitim Bakanlığı (MEB) Talim ve Terbiye Kurulu Başkanlığı tarafından yayımlanan güncel <strong>11. Sınıf Fizik Ders Kitabı</strong> için hazırlanmış resmi ve ayrıntılı çözüm rehberine hoş geldiniz. Bu sayfada kitaptaki tüm ünitelerin alıştırmalarını, etkinliklerini, ünite sonu değerlendirme ve yazılı çalışma sorularının adımlı cevaplarını bulabilir, 67 sayfalık orijinal cevap anahtarını PDF olarak indirebilirsiniz.
    </p>
  </div>

  <div class="my-6 text-center not-prose">
    <div class="p-6 bg-slate-900 text-white rounded-3xl shadow-xl border border-indigo-500/30 flex flex-col items-center justify-center gap-4">
      <div class="space-y-1 text-center">
        <span class="text-xs font-bold uppercase tracking-wider text-indigo-400">Tek Tıkla Doğrudan İndirme</span>
        <h3 class="text-lg sm:text-xl font-bold">11. Sınıf Fizik Ders Kitabı Cevap Anahtarı (Tam Metin PDF)</h3>
        <p class="text-xs text-slate-300 max-w-lg mx-auto">
          3 Ünite, tüm alıştırmalar (1-47, 1-48, 1-27) ve ölçme-değerlendirme testlerinin grafikli ve formüllü ayrıntılı çözümlerini içeren 67 sayfalık A4 doküman.
        </p>
      </div>
      <a href="{pdf_path}" download="11-Sinif-Fizik-Ders-Kitabi-Cevaplari-MEB.pdf" onclick="window.open('{smart_link}', '_blank');" class="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-black text-base shadow-lg shadow-indigo-600/30 transition-all transform hover:scale-105 active:scale-95">
        <span>📥 11. Sınıf Fizik Cevap Anahtarını PDF Olarak İndir (3.4 MB)</span>
      </a>
      <span class="text-[11px] text-slate-400">Ücretsiz ve doğrudan indirme &bull; MEB Müfredatına tam uyumlu</span>
    </div>
  </div>

  <h2 class="text-2xl font-black text-slate-900 pt-4 border-b border-slate-200 pb-2">
    11. Sınıf Fizik Ders Kitabında Hangi Üniteler Yer Alıyor?
  </h2>
  <p>
    Türkiye Yüzyılı Maarif Modeli kapsamında 11. sınıf fizik müfredatı <strong>3 ana ünite</strong> üzerine yapılandırılmıştır. Her ünitede kavramsal anlama, serbest cisim diyagramları çizme, vektörel analizler ve matematiksel modellemeler ön plandadır:
  </p>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose">
    <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-indigo-400 transition-colors">
      <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-black text-sm flex items-center justify-center">1</div>
      <h3 class="font-bold text-slate-900 text-base">1. Ünite: Kuvvet ve Hareket</h3>
      <p class="text-xs text-slate-600 leading-relaxed">
        Serbest düşme, düşey atış, yatay ve eğik atış, Newton hareket yasaları, serbest cisim diyagramı, sürtünme kuvveti, limit hız ve düzgün çembersel hareket.
      </p>
      <a href="/post/11-sinif-fizik-1-unite-kuvvet-ve-hareket-cevaplari-meb" class="inline-block text-xs font-bold text-indigo-600 hover:underline pt-1">
        1. Ünite Çözümlerini İncele &rarr;
      </a>
    </div>

    <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-indigo-400 transition-colors">
      <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-black text-sm flex items-center justify-center">2</div>
      <h3 class="font-bold text-slate-900 text-base">2. Ünite: Elektrik ve Manyetizma</h3>
      <p class="text-xs text-slate-600 leading-relaxed">
        Coulomb kuvveti, elektrik alanı, potansiyel enerji, paralel levhalar, sığaçlar, manyetik alan, manyetik kuvvet, indüksiyon, alternatif akım (AC) ve transformatörler.
      </p>
      <a href="/post/11-sinif-fizik-2-unite-elektrik-ve-manyetizma-cevaplari-meb" class="inline-block text-xs font-bold text-indigo-600 hover:underline pt-1">
        2. Ünite Çözümlerini İncele &rarr;
      </a>
    </div>

    <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-indigo-400 transition-colors">
      <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-black text-sm flex items-center justify-center">3</div>
      <h3 class="font-bold text-slate-900 text-base">3. Ünite: Optik</h3>
      <p class="text-xs text-slate-600 leading-relaxed">
        Işık şiddeti, ışık akısı ve aydınlanma; düzlem ve küresel aynalarda görüntü, kırılma indisleri, Snell yasası, tam yansıma, prizmalar, renkler ve mercek sistemleri.
      </p>
      <a href="/post/11-sinif-fizik-3-unite-optik-cevaplari-meb" class="inline-block text-xs font-bold text-indigo-600 hover:underline pt-1">
        3. Ünite Çözümlerini İncele &rarr;
      </a>
    </div>
  </div>

  <h2 class="text-2xl font-black text-slate-900 pt-6 border-b border-slate-200 pb-2">
    Fizik Sorularını Kontrol Ederken Dikkat Edilmesi Gereken 4 Temel Adım
  </h2>
  <div class="space-y-3 not-prose">
    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
      <span class="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">1</span>
      <div>
        <h4 class="font-bold text-slate-900 text-sm">Vektörel Büyüklüklerde Yön ve İşaret Kontrolü</h4>
        <p class="text-xs text-slate-600 mt-0.5">Kuvvet, hız, ivme ve elektrik/manyetik alan vektörel büyüklüklerdir. Sadece sayısal büyüklüğü değil, seçilen referans sistemine göre artı (+) veya eksi (-) yönü mutlaka kontrol ediniz.</p>
      </div>
    </div>
    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
      <span class="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">2</span>
      <div>
        <h4 class="font-bold text-slate-900 text-sm">SI Birim Sistemine Uygunluk</h4>
        <p class="text-xs text-slate-600 mt-0.5">Uzaklıkların metre (m), kütlelerin kilogram (kg), zamanın saniye (s) ve elektriksel yüklerin Coulomb (C) cinsinden alındığından emin olunuz.</p>
      </div>
    </div>
    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
      <span class="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">3</span>
      <div>
        <h4 class="font-bold text-slate-900 text-sm">Serbest Cisim Diyagramı (SCD) Doğrulaması</h4>
        <p class="text-xs text-slate-600 mt-0.5">Dinamik ve tork sorularında cisme etki eden kuvvetlerin tamamını (yerçekimi, normal kuvvet, sürtünme, ip gerilmesi) eksiksiz çizip net kuvveti belirleyiniz.</p>
      </div>
    </div>
    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
      <span class="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">4</span>
      <div>
        <h4 class="font-bold text-slate-900 text-sm">Enerjinin Korunumu ile Sağlama Yapma</h4>
        <p class="text-xs text-slate-600 mt-0.5">Atış hareketleri ve mekanik sistemlerde sürtünmesiz ortam varsayımı varsa, kinematik denklemlerle bulduğunuz hız ve yükseklik değerlerini mekanik enerjinin korunumu (Emek = Ep + Ek) ile sağlamasını yapınız.</p>
      </div>
    </div>
  </div>

  <h2 class="text-2xl font-black text-slate-900 pt-6 border-b border-slate-200 pb-2">
    Sıkça Sorulan Sorular (SSS)
  </h2>
  <div class="space-y-3 not-prose text-sm">
    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
      <h3 class="font-bold text-slate-900">Bu cevap anahtarı 2024-2025 ve 2026-2027 MEB müfredatına uygun mu?</h3>
      <p class="text-slate-600 text-xs mt-1">Evet, paylaşılan doküman Millî Eğitim Bakanlığı Talim ve Terbiye Kurulu Başkanlığı tarafından onaylanan Türkiye Yüzyılı Maarif Modeli 11. Sınıf Fizik Ders Kitabı ile birebir örtüşmektedir.</p>
    </div>
    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
      <h3 class="font-bold text-slate-900">Grafik çizimleri ve şekilli sorular dosyada mevcut mu?</h3>
      <p class="text-slate-600 text-xs mt-1">Evet, PDF içerisinde hız-zaman, konum-zaman, serbest cisim diyagramları, manyetik alan sağ el kuralı ve ışın kırılma şemalarının tümü çizimli olarak verilmiştir.</p>
    </div>
    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
      <h3 class="font-bold text-slate-900">PDF dosyasını indirmek ücretli mi?</h3>
      <p class="text-slate-600 text-xs mt-1">Hayır, Matemetrik üzerinden tüm MEB ders kitabı cevap anahtarları ve çalışma notları öğrencilere ve öğretmenlere tamamen ücretsiz sunulmaktadır.</p>
    </div>
  </div>

  <div class="my-6 p-6 bg-slate-100 rounded-3xl border border-slate-200 not-prose space-y-3">
    <h4 class="font-bold text-slate-900 text-sm">🔗 11. Sınıf İlgili Ders Materyalleri &amp; Araçlar:</h4>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
      <a href="/post/11-sinif-fizik-1-unite-kuvvet-ve-hareket-cevaplari-meb" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
        🎯 1. Ünite Kuvvet ve Hareket Çözümleri &rarr;
      </a>
      <a href="/post/11-sinif-fizik-2-unite-elektrik-ve-manyetizma-cevaplari-meb" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
        ⚡ 2. Ünite Elektrik ve Manyetizma Çözümleri &rarr;
      </a>
      <a href="/post/11-sinif-fizik-3-unite-optik-cevaplari-meb" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
        💡 3. Ünite Optik Çözümleri &rarr;
      </a>
      <a href="/sinav-hazirlama-robotu" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
        📝 11. Sınıf Fizik Yazılı Soruları Üret &rarr;
      </a>
      <a href="/hesaplama-araclari" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
        🧮 Vektörel &amp; Matematiksel Hesaplama Robotu &rarr;
      </a>
      <a href="/kategori/11-sinif" class="p-3 bg-white rounded-xl border border-slate-200 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
        📚 Tüm 11. Sınıf Ders Notları &rarr;
      </a>
    </div>
  </div>
</div>
'''

# 2. UNIT 1 POST: Kuvvet ve Hareket
u1_slug = '11-sinif-fizik-1-unite-kuvvet-ve-hareket-cevaplari-meb'
u1_title = '11. Sınıf Fizik 1. Ünite Kuvvet ve Hareket Cevapları (MEB Alıştırmalar 1-47)'
u1_excerpt = '11. Sınıf Fizik 1. Ünite Kuvvet ve Hareket ders kitabı çözümleri, Alıştırma 1-47 adımlı cevapları, Yazılı Çalışması ve Ölçme Değerlendirme soruları.'
u1_img = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'
u1_content = f'''
<div class="space-y-6">
  <div class="p-5 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-950 text-xs sm:text-sm leading-relaxed">
    <strong>1. Ünite Kapsamı:</strong> Serbest Düşme, Düşey ve Yatay Atış, Newton’ın Hareket Yasaları, Sürtünme Kuvveti, Limit Hız ve Düzgün Çembersel Hareket. Bu sayfada kitaptaki Alıştırma 1’den 47’ye kadar olan tüm soruların ve ünite sonu değerlendirme testinin ayrıntılı cevapları yer almaktadır.
  </div>

  <div class="my-4 text-center not-prose">
    <a href="{pdf_path}" download="11-Sinif-Fizik-1-Unite-Cevaplari.pdf" onclick="window.open('{smart_link}', '_blank');" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105">
      <span>📥 1. Ünite Çözümlerini ve Grafiklerini PDF İndir</span>
    </a>
  </div>

  <h2>Öne Çıkan Alıştırma Çözümleri (1 - 10. Alıştırmalar)</h2>
  
  <div class="space-y-4 not-prose">
    <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>1. Alıştırma (Serbest Düşme &amp; Yer Çekimi)</span>
        <span class="text-indigo-600">MEB Kitabı</span>
      </div>
      <p class="text-xs text-slate-700"><strong>a)</strong> Her iki cisim de sadece yer çekimi kuvvetinin etkisinde hareket etmektedir. Bu nedenle kozalağa etki eden net kuvvet yeme etki eden net kuvvetten daha büyüktür.</p>
      <p class="text-xs text-slate-700"><strong>b)</strong> Kozalak ve yem arasındaki düşey mesafe sürekli artar. Bunun sebebi kozalağın yemin yanından geçerken belli bir hız büyüklüğüne ulaşmış olmasıdır.</p>
      <p class="text-xs text-slate-700"><strong>c)</strong> Yer çekimi ivmesinin daha büyük olduğu senaryoda kozalağın yere çarpma hızı daha büyük, havada kalma süresi ise daha küçük olacaktır.</p>
    </div>

    <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>2. Alıştırma (İvme &amp; Eylemsizlik)</span>
        <span class="text-indigo-600">MEB Kitabı</span>
      </div>
      <p class="text-xs text-slate-700">Bardak ve suyun ivmesi yer çekimi ivmesine eşit (g) olduğundan iki cisim de aynı zaman aralığında eşit yollar alır. Bundan dolayı düşme esnasında bardaktan su akmaz.</p>
    </div>

    <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>3. Alıştırma (Düşey Kinematik)</span>
        <span class="text-indigo-600">MEB Kitabı</span>
      </div>
      <p class="text-xs text-slate-700"><strong>a)</strong> Kaya parçasının kopma anından 2 s sonraki yerden yüksekliği <strong>120 m</strong>'dir.</p>
      <p class="text-xs text-slate-700"><strong>b)</strong> Yere ulaştığı anda kaya parçasının hız büyüklüğü <strong>60 m/s</strong>'dir.</p>
      <p class="text-xs text-slate-700"><strong>c)</strong> Hız-Zaman grafiğinde alan yer değiştirmeyi verir: Toplam düşüş süresi t = 6 s ve yer değiştirme x = -180 m'dir.</p>
    </div>

    <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>4. Alıştırma (Kuyu Derinliği)</span>
        <span class="text-indigo-600">MEB Kitabı</span>
      </div>
      <p class="text-xs text-slate-700">h = 1/2 * g * t^2 bağıntısından su yüzeyinin kuyunun ağzına olan düşey uzaklığı <strong>45 m</strong>'dir.</p>
    </div>

    <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>5. Alıştırma (Düşey Yukarı Atış)</span>
        <span class="text-indigo-600">MEB Kitabı</span>
      </div>
      <p class="text-xs text-slate-700"><strong>a)</strong> Top 2 saniye yükselirken 2 saniye de düşecektir. Toplam havada kalma süresi <strong>4 saniyedir</strong>.</p>
      <p class="text-xs text-slate-700"><strong>c)</strong> Top, hareket süresince yer çekimi ivmesi ile hareket edeceğinden görüş hatalıdır; tepe noktasında hız sıfır olsa da ivme sıfır değildir (g = 10 m/s2).</p>
      <p class="text-xs text-slate-700"><strong>ç)</strong> Top elden 5 m yukarıdaki bir noktadan <strong>10√3 m/s</strong> hızla geçer.</p>
    </div>

    <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>6. Alıştırma &amp; 10. Alıştırma (Yatay ve Eğik Atış)</span>
        <span class="text-indigo-600">MEB Kitabı</span>
      </div>
      <p class="text-xs text-slate-700">6. Alıştırma: Topun tepe noktasına ulaşma süresi 3 s, maksimum yükseklik 125 m, toplam uçuş süresi 6 s'dir.</p>
      <p class="text-xs text-slate-700">10. Alıştırma: Roketin havada kalma süresi 4 s, maksimum yüksekliği 20 m, yatay menzili 80 m'dir. Maksimum yükseklikteki hızı 20 m/s ve ivmesi 10 m/s2'dir.</p>
    </div>
  </div>

  <h2>1. Ünite Yazılı Çalışması ve Ölçme Değerlendirme Çözümleri</h2>
  <div class="space-y-2 not-prose text-xs text-slate-700">
    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
      <strong>Soru 1:</strong> Kaplan kaya tabanından 4 m uzağa düşecektir. (Yatay hız: 4 m/s, düşey hız: -10 m/s).
    </div>
    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
      <strong>Soru 2:</strong> Atlet pistten 10 m/s ilk hızla ayrılır. Hızını %10 artırırsa 11,616 m atlayış gerçekleştirir.
    </div>
    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
      <strong>Soru 3:</strong> Topun uçuş süresi 6 s, 3. saniyedeki hızı 20 m/s, atıldığı noktaya uzaklığı 120 m'dir.
    </div>
    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
      <strong>Soru 4:</strong> Yardım paketi yatay olarak 250 m uzağa düşer ve yere çarpma hızı 50√2 m/s olur.
    </div>
  </div>

  <div class="my-6 p-4 bg-slate-100 rounded-2xl border border-slate-200 not-prose flex flex-wrap items-center justify-between gap-3 text-xs">
    <a href="/post/11-sinif-fizik-ders-kitabi-cevaplari-meb-pdf" class="font-bold text-indigo-600 hover:underline">
      ← 11. Sınıf Fizik Tüm Cevaplar (Ana Sayfa)
    </a>
    <a href="/post/11-sinif-fizik-2-unite-elektrik-ve-manyetizma-cevaplari-meb" class="font-bold text-indigo-600 hover:underline">
      2. Ünite Elektrik ve Manyetizma Çözümleri →
    </a>
  </div>
</div>
'''

# 3. UNIT 2 POST: Elektrik ve Manyetizma
u2_slug = '11-sinif-fizik-2-unite-elektrik-ve-manyetizma-cevaplari-meb'
u2_title = '11. Sınıf Fizik 2. Ünite Elektrik ve Manyetizma Cevapları (MEB Alıştırmalar 1-48)'
u2_excerpt = '11. Sınıf Fizik 2. Ünite Elektrik ve Manyetizma ders kitabı alıştırma çözümleri (1-48), manyetik alan, indüksiyon ve transformatör soruları.'
u2_img = 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80'
u2_content = f'''
<div class="space-y-6">
  <div class="p-5 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-950 text-xs sm:text-sm leading-relaxed">
    <strong>2. Ünite Kapsamı:</strong> Coulomb Yasası, Elektriksel Alan, Elektriksel Potansiyel Enerji, Düzgün Elektrik Alan ve Paralel Levhalar, Sığaçlar, Manyetik Alan, Akım Geçen Tele Etki Eden Manyetik Kuvvet, Manyetik Akı, Faraday ve Lenz İndüksiyon Yasası, Alternatif Akım (AC) ve Transformatörler.
  </div>

  <div class="my-4 text-center not-prose">
    <a href="{pdf_path}" download="11-Sinif-Fizik-2-Unite-Cevaplari.pdf" onclick="window.open('{smart_link}', '_blank');" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105">
      <span>📥 2. Ünite Çözümlerini ve Formül Şemalarını PDF İndir</span>
    </a>
  </div>

  <h2>Öne Çıkan Alıştırma Çözümleri (Coulomb &amp; Manyetizma)</h2>

  <div class="space-y-4 not-prose">
    <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>1. Alıştırma (Elektriksel Kuvvet &amp; Coulomb)</span>
        <span class="text-indigo-600">MEB Kitabı</span>
      </div>
      <p class="text-xs text-slate-700"><strong>a)</strong> 2F</p>
      <p class="text-xs text-slate-700"><strong>b)</strong> F / 4</p>
      <p class="text-xs text-slate-700"><strong>c)</strong> F / 80</p>
      <p class="text-xs text-slate-700"><strong>ç)</strong> Elektriksel kuvvet; yüklerin çarpımı (q1 * q2) ve Coulomb sabiti ile doğru, yükler arasındaki mesafenin karesi (d^2) ile ters orantılıdır: F = k * (q1 * q2) / d^2.</p>
    </div>

    <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>2. &amp; 3. Alıştırma (Bileşke Kuvvet &amp; Yükler)</span>
        <span class="text-indigo-600">MEB Kitabı</span>
      </div>
      <p class="text-xs text-slate-700">2. Alıştırma: X cismine uygulanan bileşke elektriksel kuvvet F büyüklüğündedir. Z cismine uygulanan bileşke elektriksel kuvvet √3 F büyüklüğündedir.</p>
      <p class="text-xs text-slate-700">3. Alıştırma: F1 = k * q^2 / d^2 ve F2 = k * q^2 / d^2 olur. Büyüklükleri birbirine eşittir, yönleri birbirine zıttır.</p>
    </div>

    <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>16. &amp; 21. Alıştırma (Manyetik Alan &amp; Sağ El Kuralı)</span>
        <span class="text-indigo-600">MEB Kitabı</span>
      </div>
      <p class="text-xs text-slate-700">Sağ el kuralına göre başparmak akım yönünü, dört parmak manyetik alanı gösterir. Telin etrafında eş merkezli dairesel manyetik alan çizgileri oluşur (B = 2ki / d).</p>
      <p class="text-xs text-slate-700">Manyetik kuvvet için F = B * i * L * sin(α) formülü kullanılır. Akım ile manyetik alan birbirine paralelse manyetik kuvvet sıfırdır.</p>
    </div>

    <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>42 - 48. Alıştırma (İndüksiyon, AC &amp; Transformatörler)</span>
        <span class="text-indigo-600">MEB Kitabı</span>
      </div>
      <p class="text-xs text-slate-700">Manyetik akı değişimi (ΔΦ) varsa iletkende indüksiyon elektromotor kuvveti (emk) oluşur: ε = - ΔΦ / Δt (Faraday &amp; Lenz Kanunu).</p>
      <p class="text-xs text-slate-700">Transformatörlerde sarım sayısı gerilimle doğru orantılıdır: Vp / Vs = Np / Ns. İdeal transformatörlerde güç kaybı olmadığından Ip * Vp = Is * Vs eşitliği geçerlidir.</p>
    </div>
  </div>

  <div class="my-6 p-4 bg-slate-100 rounded-2xl border border-slate-200 not-prose flex flex-wrap items-center justify-between gap-3 text-xs">
    <a href="/post/11-sinif-fizik-1-unite-kuvvet-ve-hareket-cevaplari-meb" class="font-bold text-indigo-600 hover:underline">
      ← 1. Ünite Kuvvet ve Hareket Çözümleri
    </a>
    <a href="/post/11-sinif-fizik-3-unite-optik-cevaplari-meb" class="font-bold text-indigo-600 hover:underline">
      3. Ünite Optik Çözümleri →
    </a>
  </div>
</div>
'''

# 4. UNIT 3 POST: Optik
u3_slug = '11-sinif-fizik-3-unite-optik-cevaplari-meb'
u3_title = '11. Sınıf Fizik 3. Ünite Optik Cevapları (MEB Alıştırmalar 1-27)'
u3_excerpt = '11. Sınıf Fizik 3. Ünite Optik ders kitabı çözümleri, Alıştırma 1-27 cevap anahtarı, aydınlanma, aynalar, kırılma ve mercek sistemleri.'
u3_img = 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80'
u3_content = f'''
<div class="space-y-6">
  <div class="p-5 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-950 text-xs sm:text-sm leading-relaxed">
    <strong>3. Ünite Kapsamı:</strong> Işık Şiddeti, Işık Akısı, Aydınlanma Şiddeti, Düzlem ve Küresel Aynalar, Işığın Kırılması ve Snell Bağıntısı, Tam Yansıma ve Sınır Açısı, Prizmalar, Renk Ayrışması, İnce ve Kalın Kenarlı Mercekler.
  </div>

  <div class="my-4 text-center not-prose">
    <a href="{pdf_path}" download="11-Sinif-Fizik-3-Unite-Optik-Cevaplari.pdf" onclick="window.open('{smart_link}', '_blank');" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105">
      <span>📥 3. Ünite Optik Çözümlerini ve Işın Çizimlerini PDF İndir</span>
    </a>
  </div>

  <h2>Öne Çıkan Alıştırma Çözümleri (Aydınlanma, Kırılma ve Mercekler)</h2>

  <div class="space-y-4 not-prose">
    <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>1. Alıştırma (Aydınlanma &amp; Işık Akısı)</span>
        <span class="text-indigo-600">MEB Kitabı</span>
      </div>
      <p class="text-xs text-slate-700"><strong>a)</strong> Işık şiddeti (I), toplam ışık akısı (Φ = 4πI) ve halı üzerindeki bir nokta aydınlanması (E = I/d^2) artar.</p>
      <p class="text-xs text-slate-700"><strong>c)</strong> Işık şiddeti ve odadaki toplam ışık akısı değişmez; ancak mesafeye ve açıya bağlı olarak halı üzerindeki aydınlanma şiddeti artar.</p>
    </div>

    <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>13. - 18. Alıştırma (Kırılma, Snell Yasası &amp; Tam Yansıma)</span>
        <span class="text-indigo-600">MEB Kitabı</span>
      </div>
      <p class="text-xs text-slate-700">Işık çok kırıcı (yoğun) ortamdan az kırıcı ortama geçerken normalden uzaklaşır (n1 * sin(α1) = n2 * sin(α2)).</p>
      <p class="text-xs text-slate-700">Gelme açısı sınır açısından büyükse ışık diğer ortama geçemez ve tam yansıma yapar. Fiber optik teknolojisi bu ilkeye dayanır.</p>
    </div>

    <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>22. - 27. Alıştırma (Mercekler &amp; Görüntü Özellikleri)</span>
        <span class="text-indigo-600">MEB Kitabı</span>
      </div>
      <p class="text-xs text-slate-700">Yakınsak (ince kenarlı) mercek asal eksene paralel gelen ışınları odakta toplar. Gerçek ve ters ya da sanal ve düz görüntü oluşturabilir.</p>
      <p class="text-xs text-slate-700">Iraksak (kalın kenarlı) mercek ışığı dağıtır ve daima odak ile optik merkez arasında, sanal, düz ve cisimden küçük görüntü oluşturur.</p>
      <p class="text-xs text-slate-700">Odak uzaklıklarının renklere göre büyüklük sıralaması: f(kırmızı) > f(turuncu) > f(sarı) > f(yeşil) > f(mavi) > f(mor)'dur.</p>
    </div>
  </div>

  <div class="my-6 p-4 bg-slate-100 rounded-2xl border border-slate-200 not-prose flex flex-wrap items-center justify-between gap-3 text-xs">
    <a href="/post/11-sinif-fizik-2-unite-elektrik-ve-manyetizma-cevaplari-meb" class="font-bold text-indigo-600 hover:underline">
      ← 2. Ünite Elektrik ve Manyetizma Çözümleri
    </a>
    <a href="/post/11-sinif-fizik-ders-kitabi-cevaplari-meb-pdf" class="font-bold text-indigo-600 hover:underline">
      11. Sınıf Fizik Tüm Cevaplar (Ana Sayfa) →
    </a>
  </div>
</div>
'''

posts_to_add = [
    (pillar_title, pillar_slug, pillar_excerpt, pillar_content, pillar_img),
    (u1_title, u1_slug, u1_excerpt, u1_content, u1_img),
    (u2_title, u2_slug, u2_excerpt, u2_content, u2_img),
    (u3_title, u3_slug, u3_excerpt, u3_content, u3_img),
]

for title, slug, excerpt, content, img in posts_to_add:
    tags_json = json.dumps(['11. Sınıf', 'Fizik', 'Ders Kitabı Cevapları', 'MEB', 'PDF İndir', 'Ödev'])
    cursor.execute('''
        INSERT OR REPLACE INTO posts 
        (title, slug, excerpt, content, featured_image, category, category_slug, tags, author, is_published, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, '11. Sınıf', '11-sinif', ?, 'Matemetrik Fizik Zümresi', 1, ?, ?)
    ''', (title, slug, excerpt, content, img, tags_json, now_str, now_str))
    print(f"Added/Updated post: {slug}")

# 3. FIX ALL INTERNAL LINKS in existing 11. Sınıf Fizik posts
# Replace:
# href="/post/2026-2027-meb-fizik-ders-kitabi-cevaplari-9-sinif" ... 📚 9. Sınıf Fizik Tüm Cevaplar
# With:
# href="/post/11-sinif-fizik-ders-kitabi-cevaplari-meb-pdf" ... 📚 11. Sınıf Fizik Tüm Cevaplar
cursor.execute('''
    UPDATE posts 
    SET content = REPLACE(
        REPLACE(
            content,
            '/post/2026-2027-meb-fizik-ders-kitabi-cevaplari-9-sinif',
            '/post/11-sinif-fizik-ders-kitabi-cevaplari-meb-pdf'
        ),
        '📚 9. Sınıf Fizik Tüm Cevaplar',
        '📚 11. Sınıf Fizik Tüm Cevaplar'
    )
    WHERE (slug LIKE '%11-sinif-fizik%' OR title LIKE '%11. Sınıf Fizik%')
    AND content LIKE '%9-sinif%';
''')
updated_count = cursor.rowcount
print(f"Fixed internal links in {updated_count} existing 11. Sınıf Fizik posts!")

conn.commit()
conn.close()
print("Database operations completed successfully!")
