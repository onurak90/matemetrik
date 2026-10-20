#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
deep_enrich_part4.py
Enriches all 17 educational and book summary posts that were under 500 pure text words.
Ensures:
- >= 550 pure text words (target 650-850 words)
- All original images retained with informative captions
- Educational accuracy, MEB Maarif Modeli alignment
- No author names or copyright attribution (represented by Matemetrik Eğitim Masası)
- Zero click-hijack, no target="_blank" on internal links or downloads
- Direct file download buttons for genuine public/uploads/ assets
"""

import sqlite3
import re
from bs4 import BeautifulSoup

def count_words(html):
    soup = BeautifulSoup(html or '', 'html.parser')
    return len(soup.get_text().split())

def main():
    conn = sqlite3.connect('data/matemetrik.db')
    c = conn.cursor()

    # ---------------------------------------------------------
    # 1. ID 6980: marti-kitap-ozeti
    # ---------------------------------------------------------
    c.execute("SELECT content FROM posts WHERE id = 6980")
    row = c.fetchone()
    if row:
        content_6980 = row[0]
        extra_6980 = """
  <h2>Felsefi Derinlik: Maslow İhtiyaçlar Hiyerarşisi ve Kendini Gerçekleştirme</h2>
  <p>
    Richard Bach'ın <em>Martı Jonathan Livingston</em> eseri, ilk bakışta yalın bir hayvan masalı (fabl) gibi görünse de psikoloji ve varoluşçu felsefe açısından katmanlı bir başyapıttır. Maslow’un İhtiyaçlar Hiyerarşisi merceğinden bakıldığında, sürüdeki diğer tüm martılar en alt basamakta yer alan <strong>fizyolojik ihtiyaçlar</strong> (sadece karnını doyurmak, balıkçı teknelerinin peşinde artık kapmak) seviyesine hapsolmuştur. Martı Jonathan ise bu biyolojik döngünün ötesine geçerek en tepe basamak olan <strong>kendini gerçekleştirme (self-actualization)</strong> basamağına tırmanmayı amaçlar.
  </p>
  <p>
    Jonathan için uçmak bir amaca ulaşma aracı değil; bizatihi varoluşun en saf, en estetik amacıdır. Hız rekorları kırmaya çalışırken kanatlarını martı anatomisinin elvermediği biçimlerde kıvırması, imkânsız denileni zorlaması ve sürünün yaşlı konseyi tarafından "sürünün onurunu ayaklar altına aldığı" gerekçesiyle aforoz edilmesi, tarih boyunca Galileo'dan Giordano Bruno'ya, Sokrates'ten Spinoza'ya kadar yerleşik dogmalara meydan okuyan tüm aydınların kaderiyle birebir örtüşür.
  </p>

  <h2>Alegorik Edebiyat Bağlamı: Küçük Prens ve Simyacı ile Karşılaştırma</h2>
  <p>
    Edebiyat kuramcıları <em>Martı</em>'yı sıklıkla Antoine de Saint-Exupéry'nin <em>Küçük Prens</em>'i ve Paulo Coelho'nun <em>Simyacı</em>'sı ile aynı felsefi üçgen içinde değerlendirir:
  </p>
  <ul class="list-disc pl-6 space-y-2">
    <li><strong>Küçük Prens:</strong> Gözlerin göremediğini kalple görmeyi ve yetişkinlerin sığ maddiyat dünyasından sıyrılarak hakiki bağı keşfetmeyi öğütler.</li>
    <li><strong>Simyacı:</strong> Santiago'nun "Kişisel Menkıbe"sini arama serüveni, Jonathan'ın mükemmel uçuşu arayışıyla tam olarak aynı frekanstadır. Evren, kendi kişisel menkıbesini gerçekleştirmek isteyen birey için iş birliği yapar.</li>
    <li><strong>Martı:</strong> Bireyin kendi potansiyel sınırlarını zorlamasını ve ulaştığı yüksek bilgeliği bencilce saklamak yerine, kendisini taşlayan sürüye geri dönüp yeni çıraklar yetiştirerek paylaşmasını temel alır.</li>
  </ul>

  <h2>Sınavlar ve Kompozisyonlar İçin Önemli Temalar ve Alıntılar</h2>
  <div class="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm space-y-2">
    <p><strong>Öne Çıkan Alıntı:</strong> <em>"En yüksekten uçan martı, en uzağı görür."</em></p>
    <p><strong>Kompozisyon Ana Fikri:</strong> Gerçek özgürlük, bedensel sınırlardan ziyade zihinsel sınırların aşılmasıyla başlar. Başarı, başkalarıyla yarışmak değil; dünkü kendi kapasiteni aşmaktır.</p>
    <p>Daha fazla kitap tahlili ve lise edebiyat özet formu için <a href="/post/kitap-ozeti-nasil-cikarilir-ve-yazilir-ornek-form" class="font-bold text-indigo-600 hover:underline">Kitap Özeti Nasıl Çıkarılır ve Yazılır Rehberi</a> sayfamızı inceleyebilirsiniz.</p>
  </div>
"""
        # Append before closing div
        if '</div>\n</div>' in content_6980:
            content_6980 = content_6980.replace('</div>\n</div>', extra_6980 + '\n</div>\n</div>')
        elif content_6980.endswith('</div>'):
            content_6980 = content_6980[:-6] + extra_6980 + '\n</div>'
        else:
            content_6980 += extra_6980

        c.execute("UPDATE posts SET content = ? WHERE id = 6980", (content_6980,))
        print(f"Updated 6980 (marti): {count_words(content_6980)} words")

    # ---------------------------------------------------------
    # 2. ID 6983: 11-sinif-fizik-1-unite-kuvvet-ve-hareket-cevaplari-meb
    # ---------------------------------------------------------
    c.execute("SELECT content FROM posts WHERE id = 6983")
    row = c.fetchone()
    if row:
        content_6983 = row[0]
        extra_6983 = """
  <h2>11 - 25. Alıştırmalar: Bağıl Hareket, İtme ve Çizgisel Momentum</h2>
  <div class="space-y-4 not-prose">
    <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>11. &amp; 12. Alıştırma (Nehir Problemleri ve Karşı Kıyıya Ulaşma)</span>
        <span class="text-indigo-600 font-semibold">MEB 1. Ünite</span>
      </div>
      <p class="text-xs text-slate-700 dark:text-slate-300"><strong>Çözüm Detayı:</strong> Akıntı hızının $v_a = 3\\text{ m/s}$ olduğu 40 metre genişliğindeki nehirde, suya göre $v_y = 4\\text{ m/s}$ dik hızla yüzen yüzücünün karşı kıyıya çıkış süresi sadece düşey hıza bağlıdır: $t = d / v_y = 40 / 4 = 10\\text{ saniye}$.</p>
      <p class="text-xs text-slate-700 dark:text-slate-300">Akıntı yönünde sürüklenme mesafesi ise $x = v_a \\cdot t = 3 \\cdot 10 = 30\\text{ metre}$ olarak bulunur. Yüzücünün yere göre hızı $\\vec{v}_{yer} = \\sqrt{4^2 + 3^2} = 5\\text{ m/s}$ büyüklüğündedir.</p>
    </div>

    <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>18. Alıştırma (Limit Hız ve Hava Direnç Kuvveti)</span>
        <span class="text-indigo-600 font-semibold">MEB 1. Ünite</span>
      </div>
      <p class="text-xs text-slate-700 dark:text-slate-300"><strong>Çözüm Detayı:</strong> Yüksekten serbest bırakılan $m$ kütleli yağmur damlasına etki eden hava direnç kuvveti $F_d = k \\cdot A \\cdot v^2$ bağıntısıyla ifade edilir. Net kuvvet sıfır olduğunda ($mg = k A v^2$) cisim ivmesiz hareket eder ve limit hıza ulaşır:</p>
      <p class="text-xs text-slate-700 dark:text-slate-300 font-mono text-center my-1 bg-slate-50 dark:bg-slate-800 p-2 rounded-lg">v_lim = \\sqrt{\\frac{mg}{k \\cdot A}}</p>
      <p class="text-xs text-slate-700 dark:text-slate-300">Kesit alanı $A = \\pi r^2$ olduğundan küresel bir damla için kütle hacimle ($r^3$) orantılı, alan ise $r^2$ ile orantılıdır; bu sebeple damla yarıçapı büyüdükçe limit hız artar.</p>
    </div>

    <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>24. Alıştırma (İtme - Momentum Teoremi ve Çarpışmalar)</span>
        <span class="text-indigo-600 font-semibold">MEB 1. Ünite</span>
      </div>
      <p class="text-xs text-slate-700 dark:text-slate-300"><strong>Çözüm Detayı:</strong> İtme, momentum değişimine eşittir: $\\vec{I} = \\Delta \\vec{p} = \\vec{F}_{net} \\cdot \\Delta t = m \\cdot (\\vec{v}_s - \\vec{v}_i)$. Düz duvara $20\\text{ m/s}$ hızla dik çarpıp $15\\text{ m/s}$ hızla geri seken $0.2\\text{ kg}$ kütleli topun momentum değişimi vektörel yön dikkate alınarak:</p>
      <p class="text-xs text-slate-700 dark:text-slate-300 font-mono text-center my-1 bg-slate-50 dark:bg-slate-800 p-2 rounded-lg">\\Delta p = m ((-15) - (+20)) = 0.2 \\cdot (-35) = -7\\text{ N}\\cdot\\text{s}</p>
      <p class="text-xs text-slate-700 dark:text-slate-300">Duvarın topa uyguladığı ortalama kuvvet temas süresi $\\Delta t = 0.05\\text{ s}$ ise $F = |\\Delta p| / \\Delta t = 7 / 0.05 = 140\\text{ Newton}$ olur.</p>
    </div>
  </div>

  <h2>Tork, Denge ve Kütle Merkezi Soru Taktikleri</h2>
  <p>
    Bir cismin statik dengede kalabilmesi için iki temel koşul aynı anda sağlanmalıdır:
  </p>
  <ol class="list-decimal pl-6 space-y-2 text-xs sm:text-sm">
    <li><strong>Kuvvetler Dengesi:</strong> $\\sum \\vec{F}_x = 0$ ve $\\sum \\vec{F}_y = 0$ olmalıdır. Cismin ötelenme ivmesi sıfırdır.</li>
    <li><strong>Tork Dengesi:</strong> Seçilen herhangi bir dönme eksenine göre toplam tork sıfır olmalıdır ($\\sum \\vec{\\tau} = 0$). Soru çözerken bilinmeyen kuvvetlerin çok olduğu destek veya menteşe noktasına göre tork almak işlem kolaylığı sağlar.</li>
  </ol>
  <p>
    Konu anlatımı ve çözümlü soru bankası için <a href="/post/11-sinif-fizik-atislar-konusu-cozumlu-sorular-ve-test-dokumani-pdf" class="font-bold text-indigo-600 hover:underline">11. Sınıf Fizik Atışlar Çözümlü Test Dokümanı</a> sayfamızı ziyaret edebilirsiniz.
  </p>
"""
        content_6983 = content_6983.replace('</div>\n</div>', extra_6983 + '\n</div>\n</div>') if '</div>\n</div>' in content_6983 else content_6983 + extra_6983
        c.execute("UPDATE posts SET content = ? WHERE id = 6983", (content_6983,))
        print(f"Updated 6983 (fizik 1. unite): {count_words(content_6983)} words")

    # ---------------------------------------------------------
    # 3. ID 6984: 11-sinif-fizik-2-unite-elektrik-ve-manyetizma-cevaplari-meb
    # ---------------------------------------------------------
    c.execute("SELECT content FROM posts WHERE id = 6984")
    row = c.fetchone()
    if row:
        content_6984 = row[0]
        extra_6984 = """
  <h2>Genişletilmiş Alıştırma Çözümleri: Elektriksel Potansiyel, Sığaçlar ve Manyetik Alan</h2>
  <div class="space-y-4 not-prose">
    <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>5. - 8. Alıştırma (Elektriksel Potansiyel Enerji ve İş)</span>
        <span class="text-indigo-600 font-semibold">MEB 2. Ünite</span>
      </div>
      <p class="text-xs text-slate-700 dark:text-slate-300"><strong>Formül ve İlke:</strong> Noktasal yük sisteminin elektriksel potansiyel enerjisi $E_p = k \\frac{q_1 q_2}{d}$ formülüyle hesaplanır. İki aynı işaretli yük birbirine yaklaştırıldığında elektriksel kuvvetlere karşı iş yapılır ve sistemin potansiyel enerjisi artar.</p>
      <p class="text-xs text-slate-700 dark:text-slate-300">Bir $q$ yükünü $A$ noktasından $B$ noktasına taşımak için elektriksel kuvvetlere karşı yapılan iş $W_{AB} = q \\cdot (V_B - V_A) = q \\cdot \\Delta V$ bağıntısıyla bulunur. Eğer $\\Delta V = 0$ ise (eş potansiyel çizgisi üzerinde hareket ediliyorsa) elektriksel iş sıfırdır.</p>
    </div>

    <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>12. - 15. Alıştırma (Yüklü Paralel Levhalar ve Sığaçlar)</span>
        <span class="text-indigo-600 font-semibold">MEB 2. Ünite</span>
      </div>
      <p class="text-xs text-slate-700 dark:text-slate-300"><strong>Çözüm Detayı:</strong> Birbirinden $d$ uzaklıkta bulunan paralel iletken levhalara $V$ potansiyel farkı uygulandığında levhalar arasında homojen bir elektrik alan oluşur: $E = \\frac{V}{d}$.</p>
      <p class="text-xs text-slate-700 dark:text-slate-300">Bu alana bırakılan $q$ yüklü, $m$ kütleli parçacığa etki eden kuvvet $F = q \\cdot E = \\frac{qV}{d}$ ve parçacığın ivmesi $a = \\frac{qV}{m \\cdot d}$ olur. Sığaçların yük depolama kapasitesi $C = \\varepsilon \\frac{A}{d}$ olup depolanan elektrostatik enerji $E = \\frac{1}{2} C V^2 = \\frac{Q^2}{2C}$ formülleriyle hesaplanır.</p>
    </div>

    <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>28. - 34. Alıştırma (Manyetik Alanda Yüklü Parçacık Hareketi &amp; Lorentz)</span>
        <span class="text-indigo-600 font-semibold">MEB 2. Ünite</span>
      </div>
      <p class="text-xs text-slate-700 dark:text-slate-300"><strong>Çözüm Detayı:</strong> Düzgün bir $\\vec{B}$ manyetik alanına dik $v$ hızıyla giren $q$ yüklü parçacığa etki eden manyetik kuvvet $F_m = q \\cdot v \\cdot B$ değerindedir. Bu kuvvet her an hız vektörüne dik olduğu için iş yapmaz, yalnızca hızın doğrultusunu değiştirerek dairesel hareket yaptırır.</p>
      <p class="text-xs text-slate-700 dark:text-slate-300">Merkezcil kuvvet ile manyetik kuvvet eşitlendiğinde ($m v^2 / r = q v B$), dairesel yörüngenin yarıçapı $r = \\frac{m \\cdot v}{q \\cdot B}$ ("Mavi Bakba") olarak elde edilir. Dolanım periyodu ise $T = \\frac{2\\pi m}{q B}$ olup hızdan bağımsızdır.</p>
    </div>

    <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>50. - 55. Alıştırma (Alternatif Akım Devreleri ve Rezonans)</span>
        <span class="text-indigo-600 font-semibold">MEB 2. Ünite</span>
      </div>
      <p class="text-xs text-slate-700 dark:text-slate-300"><strong>Çözüm Detayı:</strong> Alternatif akımda bobinin akıma karşı gösterdiği zorluk indüktif reaktans $X_L = \\omega L = 2\\pi f L$, sığacın gösterdiği zorluk kapasitif reaktans $X_C = \\frac{1}{\\omega C} = \\frac{1}{2\\pi f C}$ olarak tanımlanır.</p>
      <p class="text-xs text-slate-700 dark:text-slate-300">Devrede $X_L = X_C$ olduğunda empedans minimum ($Z = R$), devreden geçen akım maksimum olur. Bu duruma <strong>elektriksel rezonans</strong> adı verilir ve rezonans frekansı $f_0 = \\frac{1}{2\\pi \\sqrt{LC}}$ formülüyle bulunur. Radyo alıcılarının istasyon frekansını yakalaması rezonans ilkesine dayanır.</p>
    </div>
  </div>

  <h2>Sınava Hazırlık Notu ve Kritik Formül Tablosu</h2>
  <p>
    Elektrik ve Manyetizma ünitesinde sağ el kuralları hayati önem taşır: düz tel için başparmak akımı, bükülen dört parmak manyetik alanı gösterir. Manyetik kuvvette ise dört parmak manyetik alanı, başparmak hız/akım yönünü, avuç içi pozitif yüke etki eden kuvveti, avuç dışı ise negatif yüke etki eden kuvveti gösterir.
  </p>
  <p>
    Tüm konuyu pekiştirmek için <a href="/post/edison-ve-teslanin-alternatif-akim-ve-dogru-akim-karsilastirmasi" class="font-bold text-indigo-600 hover:underline">Edison ve Tesla'nın Akım Savaşları Makalesi</a> ile kavramsal temelleri güçlendirebilirsiniz.
  </p>
"""
        content_6984 = content_6984.replace('</div>\n</div>', extra_6984 + '\n</div>\n</div>') if '</div>\n</div>' in content_6984 else content_6984 + extra_6984
        c.execute("UPDATE posts SET content = ? WHERE id = 6984", (content_6984,))
        print(f"Updated 6984 (fizik 2. unite): {count_words(content_6984)} words")

    # ---------------------------------------------------------
    # 4. ID 6985: 11-sinif-fizik-3-unite-optik-cevaplari-meb
    # ---------------------------------------------------------
    c.execute("SELECT content FROM posts WHERE id = 6985")
    row = c.fetchone()
    if row:
        content_6985 = row[0]
        extra_6985 = """
  <h2>Ayrıntılı Alıştırma Çözümleri: Aynalar, Snell Yasası ve Mercekler</h2>
  <div class="space-y-4 not-prose">
    <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>1. - 6. Alıştırma (Aydınlanma Şiddeti ve Işık Akısı)</span>
        <span class="text-indigo-600 font-semibold">MEB 3. Ünite</span>
      </div>
      <p class="text-xs text-slate-700 dark:text-slate-300"><strong>Çözüm Detayı:</strong> Işık şiddeti $I$ olan noktasal bir kaynaktan $d$ kadar uzakta ve yüzey normaliyle $\\alpha$ açısı yapan yüzeydeki aydınlanma şiddeti $E = \\frac{I}{d^2} \\cos\\alpha$ bağıntısıyla bulunur.</p>
      <p class="text-xs text-slate-700 dark:text-slate-300">Küre merkezindeki bir kaynağın tüm iç yüzeyde oluşturduğu toplam ışık akısı $\\Phi = 4\\pi I$ bağıntısıyla hesaplanır ve küre yarıçapından tamamen bağımsızdır. Fotometre dengesinde ise $\\frac{I_1}{d_1^2} = \\frac{I_2}{d_2^2}$ eşitliği kullanılır.</p>
    </div>

    <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>10. - 15. Alıştırma (Küresel Aynalar - Çukur ve Tümsek Ayna)</span>
        <span class="text-indigo-600 font-semibold">MEB 3. Ünite</span>
      </div>
      <p class="text-xs text-slate-700 dark:text-slate-300"><strong>Çözüm Detayı:</strong> Eğrilik yarıçapı $R$ olan küresel aynaların odak uzaklığı $f = R/2$ kadardır. Çukur aynada asal eksene paralel gelen ışın odaktan geçer; merkezden gelen ışın kendi üzerinden geri yansır.</p>
      <p class="text-xs text-slate-700 dark:text-slate-300">Çukur aynada merkezin dışındaki bir cismin görüntüsü odak ile merkez arasında, ters, gerçek ve cisimden küçük oluşur. Cisim odak ile ayna arasına girdiğinde ise görüntü aynanın arkasında, düz, sanal ve cisimden büyük olur (makyaj ve dişçi aynası prensibi). Tümsek aynada ise tüm görüntüler daima ayna arkasında, odak ile tepe noktası arasında, sanal, düz ve küçüktür.</p>
    </div>

    <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>18. - 22. Alıştırma (Kırılma, Snell Bağıntısı ve Sınır Açısı)</span>
        <span class="text-indigo-600 font-semibold">MEB 3. Ünite</span>
      </div>
      <p class="text-xs text-slate-700 dark:text-slate-300"><strong>Çözüm Detayı:</strong> Işık az yoğun ortamdan çok yoğun ortama geçerken normale yaklaşarak kırılır, hızı ve dalga boyu azalır, frekansı değişmez. Kırılma kanunu Snell bağıntısı ile verilir:</p>
      <p class="text-xs text-slate-700 dark:text-slate-300 font-mono text-center my-1 bg-slate-50 dark:bg-slate-800 p-2 rounded-lg">n_1 \\cdot \\sin\\theta_1 = n_2 \\cdot \\sin\\theta_2</p>
      <p class="text-xs text-slate-700 dark:text-slate-300">Çok yoğundan az yoğuna geçerken kırılma açısının $90^\\circ$ olduğu gelme açısına <strong>sınır açısı ($\\theta_s$)</strong> denir: $\\sin\\theta_s = \\frac{n_{az}}{n_{cok}}$. Gelme açısı sınır açısından büyükse ışın diğer ortama geçemez ve tam yansımaya uğrar. Fiber optik kablolar ve serap olayı tam yansıma ilkesiyle çalışır.</p>
    </div>

    <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>25. - 27. Alıştırma (Prizmalarda Renk Ayrışması ve Mercekler)</span>
        <span class="text-indigo-600 font-semibold">MEB 3. Ünite</span>
      </div>
      <p class="text-xs text-slate-700 dark:text-slate-300"><strong>Çözüm Detayı:</strong> Beyaz ışık cam prizmaya girdiğinde dalga boyuna göre farklı indislerle kırılır (dispersiyon). Frekansı en yüksek olan mor ışık en çok kırılırken, frekansı en düşük kırmızı ışık en az kırılır (Kırmızı, Turuncu, Sarı, Yeşil, Mavi, Mor sıralaması).</p>
      <p class="text-xs text-slate-700 dark:text-slate-300">İnce kenarlı (yakınsak) mercekler ışığı toplarken, kalın kenarlı (ıraksak) mercekler ışığı dağıtır. Göz kusurlarından miyop kalın kenarlı mercekle, hipermetrop ise ince kenarlı mercekle düzeltilir.</p>
    </div>
  </div>

  <h2>Ünite Sonu Değerlendirme Çözüm İpuçları</h2>
  <p>
    Optik sorularında ışın çizgilerini doğru çizmek ve normal doğrusunu daima kırıcı yüzeye dik almak kritik kuraldır. Görünür derinlik hesaplarında sudaki balığa yukarıdan bakan gözlemci balığı yüzeye daha yakın görürken ($h' = h \\cdot \\frac{n_{hava}}{n_{su}}$), suyun içindeki balık havadaki kuşu olduğundan daha uzakta algılar.
  </p>
  <p>
    Tüm 11. sınıf fizik konularına ait eksiksiz çözümlü PDF arşivini indirmek için üst kısımdaki yeşil indirme butonunu kullanabilirsiniz.
  </p>
"""
        content_6985 = content_6985.replace('</div>\n</div>', extra_6985 + '\n</div>\n</div>') if '</div>\n</div>' in content_6985 else content_6985 + extra_6985
        c.execute("UPDATE posts SET content = ? WHERE id = 6985", (content_6985,))
        print(f"Updated 6985 (fizik 3. unite): {count_words(content_6985)} words")

    # ---------------------------------------------------------
    # 5. ID 6988: miknatistan-kacan-salatalik
    # ---------------------------------------------------------
    c.execute("SELECT content FROM posts WHERE id = 6988")
    row = c.fetchone()
    if row:
        content_6988 = row[0]
        extra_6988 = """
  <h2>Diyamanyetizmanın Atomik Mekanizması: Eşlenmiş Elektronlar ve Zıt Moment</h2>
  <p>
    Diyamanyetik maddelerin dış manyetik alana karşı gösterdiği bu itme davranışı, kuantum düzeyinde incelendiğinde son derece zarif bir fizik kuralına dayanır. Atom veya moleküllerdeki tüm elektronlar çiftler halinde (eşlenmiş spinlerle) bulunuyorsa, bu elektronların net manyetik dipol momenti normal şartlarda sıfırdır. Ancak bu madde güçlü bir dış manyetik alan içerisine sokulduğunda, elektronların yörünge hareketleri <strong>Lenz Kanunu</strong> gereğince dış alana zıt yönde minik bir indüklenmiş manyetik moment meydana getirecek şekilde modüle olur.
  </p>
  <p>
    Oluşan bu indüklenmiş manyetik alan, dış manyetik alanın kutbu ne olursa olsun (kuzey N kutbu veya güney S kutbu fark etmeksizin) daima dış alanı zayıflatacak yöndedir. İşte bu nedenle diyamanyetik bir cisim, güçlü mıknatısın hem kuzey hem de güney kutbu tarafından zayıfça da olsa <strong>itilir</strong>.
  </p>

  <h2>Pirolitik Karbon, Bizmut ve Manyetik Levitasyon</h2>
  <p>
    Salatalığın %96'sı su olduğu için diyamanyetizmanın varlığını ispatlamak için harika bir mutfak nesnesidir; fakat doğada diyamanyetik hassasiyeti (manyetik duyarlılık katsayısı $\chi_m$) sudan çok daha güçlü malzemeler de bulunur:
  </p>
  <ul class="list-disc pl-6 space-y-2">
    <li><strong>Bizmut (Bi):</strong> Metaller arasında en yüksek diyamanyetik itme katsayısına sahiptir ($\chi_m \approx -1.66 \times 10^{-4}$).</li>
    <li><strong>Pirolitik Grafit (Karbon):</strong> Grafit tabakalarının özel dizilimi sayesinde oda sıcaklığında güçlü neodimyum mıknatısların üzerinde hiçbir harici enerji kaynağı olmadan havada asılı kalabilen (manyetik levitasyon) nadir malzemelerdendir.</li>
    <li><strong>Sıvı Azotla Soğutulmuş Süperiletkenler:</strong> Meissner etkisi sayesinde içlerindeki manyetik alanı tamamen dışarı atarak ($\chi_m = -1$) mükemmel bir diyamanyetizma sergiler ve manyetik trenlerin (Maglev) raylar üzerinde sürtünmesiz süzülmesini sağlar.</li>
  </ul>

  <h2>Sınıf İçi Deney İçin Kritik İpuçları ve Değişkenler</h2>
  <p>
    Bu deneyi okulda veya evde gerçekleştirirken başarının anahtarı <strong>sürtünmeyi ve hava türbülansını sıfıra indirmektir</strong>. İnce dikiş ipliğinin burulma esnekliği çok düşük olmalı, deney düzeneği mümkünse şeffaf bir fanus, büyük bir kavanoz veya akvaryum içerisine yerleştirilmelidir. Böylece ortamdaki nefes alma veya pencereden gelen hava cereyanları elenir ve salatalığın neodimyum mıknatısın hareketine göre nasıl zarifçe yön değiştirdiği net biçimde kaydedilebilir.
  </p>
  <p>
    Benzer bilimsel laboratuvar etkinlikleri ve fen deneyleri için <a href="/post/alkali-metal-tepkime-deneyi" class="font-bold text-indigo-600 hover:underline">Alkali Metallerin Su ile Tepkimesi Deney Rehberi</a> makalemizi de inceleyebilirsiniz.
  </p>
"""
        content_6988 = content_6988.replace('</div>\n</div>', extra_6988 + '\n</div>\n</div>') if '</div>\n</div>' in content_6988 else content_6988 + extra_6988
        c.execute("UPDATE posts SET content = ? WHERE id = 6988", (content_6988,))
        print(f"Updated 6988 (salatalik): {count_words(content_6988)} words")

    # ---------------------------------------------------------
    # 6. ID 6992: alkali-metal-tepkime-deneyi
    # ---------------------------------------------------------
    c.execute("SELECT content FROM posts WHERE id = 6992")
    row = c.fetchone()
    if row:
        content_6992 = row[0]
        extra_6992 = """
  <h2>Periyodik Özelliklerin Değişimi: İyonlaşma Enerjisi ve Atom Yarıçapı İlişkisi</h2>
  <p>
    Periyodik sistemin 1A grubunda lityumdan sezyuma doğru inildikçe her periyotta yeni bir ana enerji düzeyi (elektron kabuğu) eklenir. Kabuk sayısının artması iki kritik sonuca yol açar:
  </p>
  <ul class="list-disc pl-6 space-y-2">
    <li><strong>Atom Yarıçapının Büyümesi:</strong> En dış kabuktaki değerlik (valans) elektronu çekirdeğin pozitif proton çekiminden giderek uzaklaşır.</li>
    <li><strong>Perdeleme (Shielding) Etkisinin Güçlenmesi:</strong> İç kabuklardaki elektronlar, çekirdeğin çekim gücünü perdeleyerek en dıştaki elektronun çekirdeğe olan bağını zayıflatır.</li>
  </ul>
  <p>
    Bu iki faktörün birleşimi sonucunda atomun <strong>1. İyonlaşma Enerjisi</strong> grupta aşağıya doğru dramatik şekilde azalır ($Li: 520\text{ kJ/mol} \to Cs: 376\text{ kJ/mol}$). Elektronunu çok daha kolay feda edebilen sezyum, su molekülüyle temas ettiği anda mikro saniyeler içinde elektronunu suya fırlatarak patlama dalgası yaratır.
  </p>

  <h2>Laboratuvar Güvenlik Protokolü ve Tehlike İkazları</h2>
  <div class="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 text-xs sm:text-sm space-y-2">
    <p><strong>⚠️ Zorunlu Güvenlik Kuralları:</strong></p>
    <ul class="list-disc pl-5 space-y-1">
      <li><strong>Asla Elle Temas Edilmez:</strong> Derideki nem alkali metalin anında reaksiyona girerek yanık oluşturmasına sebep olur. Yalnızca kuru metal pens (cımbız) ve bisturi kullanılmalıdır.</li>
      <li><strong>Parafin Yağı Altında Saklama:</strong> Alkali metaller havadaki oksijen ve nem ile kendiliğinden paslanıp oksitlendiği için daima mineral yağ veya gaz yağı içinde muhafaza edilir.</li>
      <li><strong>Pirinç Tanesi Büyüklüğü:</strong> Okul gösterilerinde kullanılacak sodyum veya potasyum parçası bir pirinç tanesinden (yaklaşık 2-3 mm) daha büyük olmamalıdır.</li>
      <li><strong>Çeker Ocak ve Koruyucu Siperlik:</strong> Deney mutlaka çeker ocak (fume hood) altında, göz koruyucu gözlük ve patlama siperliği arkasında gerçekleştirilmelidir.</li>
    </ul>
  </div>
  <p>
    Daha fazla kimya laboratuvarı ve reaksiyon dinamiği incelemesi için <a href="/post/suyu-fokurdatan-ilac-efervesan" class="font-bold text-indigo-600 hover:underline">Efervesan Tabletlerin Reaksiyon Kinetiği Deneyi</a> sayfamızı ziyaret edebilirsiniz.
  </p>
"""
        content_6992 = content_6992.replace('</div>\n</div>', extra_6992 + '\n</div>\n</div>') if '</div>\n</div>' in content_6992 else content_6992 + extra_6992
        c.execute("UPDATE posts SET content = ? WHERE id = 6992", (content_6992,))
        print(f"Updated 6992 (alkali metal): {count_words(content_6992)} words")

    # ---------------------------------------------------------
    # 7. ID 6993: suyu-fokurdatan-ilac-efervesan
    # ---------------------------------------------------------
    c.execute("SELECT content FROM posts WHERE id = 6993")
    row = c.fetchone()
    if row:
        content_6993 = row[0]
        extra_6993 = """
  <h2>Kimyasal Kinetik ve Çarpışma Teorisi: Reaksiyon Hızının Sırrı</h2>
  <p>
    Efervesan tabletin suda çözünmesi sırasında gerçekleşen gaz çıkışı, lise kimya müfredatındaki <strong>Tepkime Hızları ve Çarpışma Teorisi</strong> ünitesini somutlaştırmak için mükemmel bir modeldir. Bir kimyasal reaksiyonun meydana gelebilmesi için reaksiyona giren taneciklerin:
  </p>
  <ol class="list-decimal pl-6 space-y-2 text-xs sm:text-sm">
    <li>Uygun geometrik doğrultuda çarpışması,</li>
    <li>Eşik enerjisi (Aktivasyon Enerjisi, $E_a$) adı verilen minimum kinetik enerjiye sahip olması gerekir.</li>
  </ol>
  <p>
    <strong>Arrhenius Bağıntısı</strong> ($k = A \cdot e^{-E_a / RT}$), sıcaklık arttıkça hız sabiti $k$'nin üstel olarak arttığını gösterir. Sıcak su içerisindeki su moleküllerinin ortalama kinetik enerjisi çok daha yüksektir; bu sayede sitrik asit ve bikarbonat iyonları saniyede milyarlarca kez eşik enerjisini aşan etkin çarpışmalar yaparak karbondioksit baloncuklarını fırtınaya dönüştürür.
  </p>

  <h2>Gaz Yasaları ve Hacim Ölçüm Düzeneği Tasarımı</h2>
  <p>
    Öğrencilerle birlikte bu reaksiyonu kantitatif (sayısal) bir deneye dönüştürmek son derece kolaydır. Bir erlenmayerin ağzına tek delikli tıpa ve hortum takılarak, hortumun diğer ucu su dolu ters çevrilmiş bir dereceli silindire (bürete) uzatılır. Tablet suya atılıp tıpa kapatıldığında:
  </p>
  <ul class="list-disc pl-6 space-y-2">
    <li>Açığa çıkan $CO_2$ gazı silindirdeki suyu aşağıya doğru iter (suyun yerini alma yöntemi).</li>
    <li>Kronometre ile her 5 saniyede bir biriken gaz hacmi ($V$) kaydedilir.</li>
    <li>İdeal Gaz Yasası ($P \cdot V = n \cdot R \cdot T$) kullanılarak açığa çıkan gazın mol sayısı ve reaksiyonun ortalama hızı grafiğe dökülür.</li>
  </ul>

  <h2>Neden İlaçlar Efervesan Formda Üretilir? Farmasötik Avantajlar</h2>
  <p>
    İlaç sanayisinde efervesan tabletlerin tercih edilmesinin çok somut biyomedikal sebepleri vardır:
  </p>
  <ul class="list-disc pl-6 space-y-2">
    <li><strong>Hızlı Biyoyararlanım:</strong> İlaç etken maddesi mideye varmadan önce sıvı içinde tamamen çözünmüş ve homojen dağılmış olduğu için sindirim kanalından kana geçiş süresi klasik tabletlere göre %40 daha hızlıdır.</li>
    <li><strong>Mide Koruma:</strong> Bazı ağrı kesici ve asidik etken maddeler (örneğin asetilsalisilik asit) katı halde mide zarına yapışırsa lokal tahriş ve ülser yapabilir; efervesan formdaki sodyum sitrat tamponu mide pH'ını dengeler.</li>
  </ul>
  <p>
    Farklı bilimsel deneyler için <a href="/post/gunes-firini-yapalim" class="font-bold text-indigo-600 hover:underline">Güneş Fırını Yapımı ve Termodinamik Rehberi</a> yazımızı inceleyebilirsiniz.
  </p>
"""
        content_6993 = content_6993.replace('</div>\n</div>', extra_6993 + '\n</div>\n</div>') if '</div>\n</div>' in content_6993 else content_6993 + extra_6993
        c.execute("UPDATE posts SET content = ? WHERE id = 6993", (content_6993,))
        print(f"Updated 6993 (efervesan): {count_words(content_6993)} words")

    # ---------------------------------------------------------
    # 8. ID 6994 & 7011: kesri-kesre-bolme-...
    # ---------------------------------------------------------
    for pid in [6994, 7011]:
        c.execute("SELECT content FROM posts WHERE id = ?", (pid,))
        row = c.fetchone()
        if row:
            content_pid = row[0]
            extra_pid = """
  <h2>"Ters Çevirip Çarpma" Algoritması Neden Çalışır? Cebirsel İspat</h2>
  <p>
    Matematik öğretiminde öğrencilerin en sık sorduğu ve çoğu zaman ezber cevaplar aldığı soru şudur: <em>"Neden ikinci kesri ters çevirip çarpıyoruz?"</em> Bu kural sihirli bir formül değil; kesirlerin temel genişletme prensibine dayanan kesin bir cebirsel ispattır.
  </p>
  <p>
    İki kesrin bölümünü katlı kesir formunda yazalım: $\\frac{\\frac{a}{b}}{\\frac{c}{d}}$. Bir bölme işleminde paydayı $1$ yapabilirsek işlem doğrudan payın değerine eşitlenir. Paydadaki $\\frac{c}{d}$ sayısını $1$ yapmanın tek yolu, onu çarpımsal tersi olan $\\frac{d}{c}$ ile çarpmaktır. Bir kesrin değerinin değişmemesi için pay ve paydasını aynı sayıyla çarparız:
  </p>
  <div class="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-center font-mono text-xs sm:text-sm my-3">
    \\frac{\\frac{a}{b}}{\\frac{c}{d}} = \\frac{\\frac{a}{b} \\times \\frac{d}{c}}{\\frac{c}{d} \\times \\frac{d}{c}} = \\frac{\\frac{a}{b} \\times \\frac{d}{c}}{1} = \\frac{a}{b} \\times \\frac{d}{c}
  </div>
  <p>
    Görüldüğü gibi algoritma, paydayı $1$'e normalize etme işleminden başka bir şey değildir!
  </p>

  <h2>2 Adet Yeni Nesil Çözümlü Problem</h2>
  <div class="space-y-3 not-prose">
    <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
      <strong>Problem 1 (Kumaş Kesimi):</strong> Bir terzinin elinde $\\frac{3}{4}$ metre uzunluğunda kumaş vardır. Terzi bu kumaştan $\\frac{1}{8}$ metre boyunda mendiller kesecektir. Kaç adet mendil elde eder?
      <p class="text-slate-600 dark:text-slate-400 mt-1"><strong>Çözüm:</strong> $\\frac{3}{4} \\div \\frac{1}{8} = \\frac{3}{4} \\times \\frac{8}{1} = \\frac{24}{4} = 6$ adet mendil elde edilir. (Modelleme: $\\frac{3}{4} = \\frac{6}{8}$ olduğu için 6 adet sekizlik parça çıkar).</p>
    </div>
    <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
      <strong>Problem 2 (Meyve Suyu Dağıtımı):</strong> $\\frac{5}{6}$ litrelik konsantre meyve suyu, her biri $\\frac{1}{3}$ litre alan şişelere doldurulacaktır. Kaç şişe dolar ve ne kadar artar?
      <p class="text-slate-600 dark:text-slate-400 mt-1"><strong>Çözüm:</strong> $\\frac{5}{6} \\div \\frac{1}{3} = \\frac{5}{6} \\times \\frac{3}{1} = \\frac{15}{6} = 2.5$ şişe. Yani 2 tam şişe dolar, 3. şişenin ise yarısı dolar.</p>
    </div>
  </div>
  <p>
    Benzer modelleme çalışmaları için <a href="/post/dogal-sayiyi-kesre-bolme-sayi-dogrusu-ve-ekmek-modeli-etkinligi" class="font-bold text-indigo-600 hover:underline">Doğal Sayıyı Kesre Bölme ve Ekmek Modeli Etkinliği</a> sayfamızı inceleyebilirsiniz.
  </p>
"""
            content_pid = content_pid.replace('</div>\n</div>', extra_pid + '\n</div>\n</div>') if '</div>\n</div>' in content_pid else content_pid + extra_pid
            c.execute("UPDATE posts SET content = ? WHERE id = ?", (content_pid, pid))
            print(f"Updated {pid} (kesir bolme): {count_words(content_pid)} words")

    # ---------------------------------------------------------
    # 9. ID 6996: dogal-sayiyi-kesre-bolme-sayi-dogrusu-ve-ekmek-modeli-etkinligi
    # ---------------------------------------------------------
    c.execute("SELECT content FROM posts WHERE id = 6996")
    row = c.fetchone()
    if row:
        content_6996 = row[0]
        extra_6996 = """
  <h2>Kavram Yanılgısı Analizi: "Bölme İşlemi Sayıyı Daima Küçültür mü?"</h2>
  <p>
    İlkokuldan itibaren öğrencilerin zihninde yerleşen en katı ön yargılardan biri "çarpma büyütür, bölme küçültür" kuralıdır. $12 \\div 3 = 4$ işleminde sonuç küçülür. Ancak bir doğal sayıyı $0$ ile $1$ arasındaki basit bir kesre böldüğümüzde tam tersi gerçekleşir: sonuç bölünenden daha büyük çıkar ($4 \\div \\frac{1}{2} = 8$).
  </p>
  <p>
    Bunun mantığı son derece berraktır: Elinizdeki nesneyi bütün parçalara değil, bütünden daha küçük parçalara ayırıyorsunuz. Parçalar ufaldıkça adet artmak zorundadır! Bir pastayı 1 kişilik dev dilimlere bölerseniz az tabak çıkar; çatal ucuyla tadımlık küçük dilimlere bölerseniz onlarca tabak çıkar.
  </p>

  <h2>3 Adet Günlük Yaşam Problemi ve Sayı Doğrusu Çözümleri</h2>
  <div class="space-y-3 not-prose">
    <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
      <strong>Senaryo 1 (Pizzacı Paylaşımı):</strong> 3 büyük boy pizza, her biri çeyrek ($\\frac{1}{4}$) dilim tüketen çocuklara dağıtılacaktır. Kaç çocuğa pizza yeter?
      <p class="text-slate-600 dark:text-slate-400 mt-1"><strong>Çözüm:</strong> $3 \\div \\frac{1}{4} = 3 \\times 4 = 12$ dilim oluşur, 12 çocuğa yeter.</p>
    </div>
    <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
      <strong>Senaryo 2 (Kurdele Kesimi):</strong> 6 metre uzunluğundaki kurdele, her biri $\\frac{2}{3}$ metre boyunda fiyonklar yapmak üzere kesilecektir. Kaç fiyonk elde edilir?
      <p class="text-slate-600 dark:text-slate-400 mt-1"><strong>Çözüm:</strong> $6 \\div \\frac{2}{3} = 6 \\times \\frac{3}{2} = \\frac{18}{2} = 9$ adet fiyonk elde edilir.</p>
    </div>
    <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
      <strong>Senaryo 3 (İlaç Dozu):</strong> Bir şişede 5 ölçek şurup vardır. Her gün yarım ($\\frac{1}{2}$) ölçek içmesi gereken hasta şurubu kaç günde bitirir?
      <p class="text-slate-600 dark:text-slate-400 mt-1"><strong>Çözüm:</strong> $5 \\div \\frac{1}{2} = 5 \\times 2 = 10$ gün.</p>
    </div>
  </div>
  <p>
    Kesir modellemeleri için <a href="/post/kesri-dogal-sayiya-bolme-paylastirma-modeli-ile-gorsellestirme" class="font-bold text-indigo-600 hover:underline">Kesri Doğal Sayıya Bölme Paylaştırma Rehberi</a> yazımızı inceleyebilirsiniz.
  </p>
"""
        content_6996 = content_6996.replace('</div>\n</div>', extra_6996 + '\n</div>\n</div>') if '</div>\n</div>' in content_6996 else content_6996 + extra_6996
        c.execute("UPDATE posts SET content = ? WHERE id = 6996", (content_6996,))
        print(f"Updated 6996 (dogal sayiyi kesre bolme): {count_words(content_6996)} words")

    # ---------------------------------------------------------
    # 10. ID 6998: cetvel-calismalari-ve-uzunluk-olcme-orta-ve-ileri-duzey-etkinlik-kagidi
    # ---------------------------------------------------------
    c.execute("SELECT content FROM posts WHERE id = 6998")
    row = c.fetchone()
    if row:
        content_6998 = row[0]
        extra_6998 = """
  <h2>Ölçümde Hata ve Belirsizlik Analizi: Duyarlılık ve Tolerans</h2>
  <p>
    Fizik ve mühendislikte hiçbir ölçüm mutlak kesinlikle yapılamaz; her ölçüm aletinin bir duyarlılık (hassasiyet) limiti vardır. Standart bir okul cetvelinde en küçük bölüntü çizgisi $1\\text{ mm}$ ($0.1\\text{ cm}$)'dir. Bilimsel ölçüm kurallarına göre bir aletle yapılan ölçümün belirsizliği, aletin en küçük bölüntüsünün yarısı kabul edilir:
  </p>
  <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-mono text-center my-2">
    \\text{Ölçüm Belirsizliği} = \\pm \\frac{1\\text{ mm}}{2} = \\pm 0.5\\text{ mm}
  </div>
  <p>
    Örneğin cetvelle bir kurşun kalemi $14.3\\text{ cm}$ olarak okuduysanız, bu ölçümün bilimsel ifadesi $14.30 \\pm 0.05\\text{ cm}$ şeklindedir.
  </p>

  <h2>Kumpas ve Mikrometreye Giriş: Neden Cetvel Her Zaman Yetmez?</h2>
  <p>
    Sanayide, torna tesviyede ve hassas makine üretiminde milimetrenin onda biri hatta yüzde biri hayati önem taşır:
  </p>
  <ul class="list-disc pl-6 space-y-2">
    <li><strong>Kumpas (Vernier Caliper):</strong> Ana cetvel üzerindeki bölüntülere ek olarak hareketli çene üzerindeki Vernier skalası sayesinde $0.1\\text{ mm}$ ve $0.05\\text{ mm}$ hassasiyetle iç çap, dış çap ve derinlik ölçebilir.</li>
    <li><strong>Mikrometre:</strong> Vida adımı mekanizmasıyla $0.01\\text{ mm}$ (10 mikrometre) hassasiyetle saç teli, kağıt kalınlığı veya milimetrik sac levha ölçümlerinde kullanılır.</li>
  </ul>

  <h2>Sınıf İçi Dolaylı Ölçüm Laboratuvarı Etkinliği</h2>
  <p>
    Cetvelle tek bir kağıt sayfasının kalınlığını doğrudan ölçmek imkânsızdır çünkü kağıt kalınlığı yaklaşık $0.08\\text{ mm}$'dir. Ancak <strong>dolaylı ölçüm</strong> yöntemiyle öğrenciler bu engeli kolayca aşar: 500 sayfalık bir ders kitabı cetvelle ölçülür (örneğin $4.0\\text{ cm} = 40\\text{ mm}$), ardından toplam kalınlık sayfa adedine bölünür ($40 / 500 = 0.08\\text{ mm}$). Bu yöntem öğrencilere makro verilerden mikro gerçekliğe ulaşma bilimsel düşünce pratiğini kazandırır.
  </p>
  <p>
    Geometrik inşa ve hassas çizim becerileri için <a href="/post/pergel-kullanimi-ve-geometrik-insa-temel-cizim-becerileri-calisma-kagidi" class="font-bold text-indigo-600 hover:underline">Pergel Kullanımı ve Geometrik İnşa Rehberi</a> dokümanımızı inceleyebilirsiniz.
  </p>
"""
        content_6998 = content_6998.replace('</div>\n</div>', extra_6998 + '\n</div>\n</div>') if '</div>\n</div>' in content_6998 else content_6998 + extra_6998
        c.execute("UPDATE posts SET content = ? WHERE id = 6998", (content_6998,))
        print(f"Updated 6998 (cetvel): {count_words(content_6998)} words")

    # ---------------------------------------------------------
    # 11. ID 6999: 6-sinif-matematik-alan-ve-cember-hesaplama-interaktif-etkinligi
    # ---------------------------------------------------------
    c.execute("SELECT content FROM posts WHERE id = 6999")
    row = c.fetchone()
    if row:
        content_6999 = row[0]
        extra_6999 = """
  <h2>Arşimet'in Poligon Yaklaşımı: Pi Sayısının Geometrik Sıkıştırılması</h2>
  <p>
    Antik Yunan’ın en büyük matematikçisi Arşimet (M.Ö. 287 - 212), bir çemberin içine ve dışına çizilen düzgün çokgenlerin çevrelerini hesaplayarak Pi sayısını tarihte ilk kez matematiksel bir aralığa hapsetmiştir. Arşimet, 6 kenarlı düzgün çokgenle başlayıp kenar sayısını her adımda iki katına çıkararak 12, 24, 48 ve nihayetinde <strong>96 kenarlı düzgün çokgene</strong> kadar ulaşmıştır.
  </p>
  <p>
    Çemberin çevresi, içe çizilen çokgenin çevresinden büyük, dışa teğet çizilen çokgenin çevresinden küçük olmak zorundadır. Arşimet bu dâhice yöntemle Pi sayısının şu iki kesir arasında olduğunu ispatlamıştır:
  </p>
  <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-mono text-center my-2">
    3 \\frac{10}{71} < \\pi < 3 \\frac{1}{7} \\quad \\implies \\quad 3.1408 < \\pi < 3.1428
  </div>

  <h2>3 Adet Yeni Nesil Çözümlü Sınav Sorusu</h2>
  <div class="space-y-3 not-prose">
    <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
      <strong>Soru 1 (Tekerlek Dönüşü):</strong> Yarıçapı $r = 35\\text{ cm}$ olan bir bisiklet tekerleği 200 tam tur attığında bisiklet kaç metre yol alır? ($\\pi = \\frac{22}{7}$ alınız).
      <p class="text-slate-600 dark:text-slate-400 mt-1"><strong>Çözüm:</strong> Tekerleğin çevresi $Ç = 2 \\cdot \\pi \\cdot r = 2 \\cdot \\frac{22}{7} \\cdot 35 = 220\\text{ cm} = 2.2\\text{ m}$. 200 turda alınan yol: $200 \\times 2.2 = 440\\text{ metre}$.</p>
    </div>
    <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
      <strong>Soru 2 (Bahçedeki Fıskiye Alanı):</strong> Bir fıskiye en fazla 4 metre uzağa su püskürterek dairesel bir bölgeyi sulamaktadır. Sulanan yeşil alan kaç metrekaredir? ($\\pi = 3$ alınız).
      <p class="text-slate-600 dark:text-slate-400 mt-1"><strong>Çözüm:</strong> Alan formülü $A = \\pi \\cdot r^2 = 3 \\cdot 4^2 = 3 \\cdot 16 = 48\\text{ m}^2$.</p>
    </div>
    <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
      <strong>Soru 3 (Daire Halkası - Simit Alanı):</strong> Dış yarıçapı $R = 5\\text{ cm}$, iç yarıçapı $r = 3\\text{ cm}$ olan halkanın alanı kaç $\\text{cm}^2$'dir? ($\\pi = 3$ alınız).
      <p class="text-slate-600 dark:text-slate-400 mt-1"><strong>Çözüm:</strong> $A = \\pi (R^2 - r^2) = 3 \\cdot (25 - 9) = 3 \\cdot 16 = 48\\text{ cm}^2$.</p>
    </div>
  </div>
  <p>
    Geometri ve fraktal desenlerin matematiği için <a href="/post/fraktal-agaci-ve-dogadaki-geometri-oruntu-ve-fraktal-calismasi" class="font-bold text-indigo-600 hover:underline">Fraktal Ağacı ve Doğadaki Geometri Etkinliği</a> makalemizi de mutlaka okuyun.
  </p>
"""
        content_6999 = content_6999.replace('</div>\n</div>', extra_6999 + '\n</div>\n</div>') if '</div>\n</div>' in content_6999 else content_6999 + extra_6999
        c.execute("UPDATE posts SET content = ? WHERE id = 6999", (content_6999,))
        print(f"Updated 6999 (6. sinif alan cember): {count_words(content_6999)} words")

    # ---------------------------------------------------------
    # 12. ID 7003: 11-sinif-fizik-atislar-konusu-cozumlu-sorular-ve-test-dokumani-pdf
    # ---------------------------------------------------------
    c.execute("SELECT content FROM posts WHERE id = 7003")
    row = c.fetchone()
    if row:
        content_7003 = row[0]
        extra_7003 = """
    <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>Örnek Soru 5 (Eğik Atışta Tepe Noktası ve Menzil Orantısı)</span>
        <span class="text-indigo-600 font-semibold">15 Puan</span>
      </div>
      <p class="text-xs text-slate-800 dark:text-slate-200 font-medium">Yerle $45^\circ$ açı yapacak şekilde $v_0 = 20\sqrt{2}\text{ m/s}$ ilk hızla atılan cismin maksimum yüksekliği $H_{max}$ ve menzili $X_{menzil}$ kaç metredir? ($g = 10\text{ m/s}^2$)</p>
      <div class="text-xs text-slate-600 dark:text-slate-400 space-y-1 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
        <p><strong>Çözüm:</strong> Hız bileşenleri: $v_{0x} = v_0 \cdot \cos 45^\circ = 20\text{ m/s}$, $v_{0y} = v_0 \cdot \sin 45^\circ = 20\text{ m/s}$.</p>
        <p>Çıkış süresi: $t_{cik} = v_{0y} / g = 20 / 10 = 2\text{ s}$. Toplam uçuş süresi $t_{uc} = 2 \cdot t_{cik} = 4\text{ s}$.</p>
        <p>Maksimum yükseklik: $H_{max} = \frac{v_{0y}^2}{2g} = \frac{20^2}{20} = 20\text{ metre}$.</p>
        <p>Menzil: $X = v_{0x} \cdot t_{uc} = 20 \cdot 4 = 80\text{ metre}$. ($H_{max} / X = 1/4$ genel kuralı $45^\circ$ için ispatlanmış olur).</p>
      </div>
    </div>

    <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>Örnek Soru 6 (Aşağıdan Yukarıya Düşey Atış ve Hız-Zaman Analizi)</span>
        <span class="text-indigo-600 font-semibold">15 Puan</span>
      </div>
      <p class="text-xs text-slate-800 dark:text-slate-200 font-medium">Yerden yukarı doğru $30\text{ m/s}$ hızla fırlatılan bir cismin 2. saniyedeki ve 4. saniyedeki anlık hızlarını ve yerden yüksekliklerini bulunuz. ($g = 10\text{ m/s}^2$)</p>
      <div class="text-xs text-slate-600 dark:text-slate-400 space-y-1 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
        <p><strong>Çözüm:</strong> Anlık hız denklemi: $v(t) = v_0 - g \cdot t = 30 - 10t$.</p>
        <p>2. saniyede: $v(2) = 30 - 20 = +10\text{ m/s}$ (yukarı yönde). Yükseklik: $h(2) = 30 \cdot 2 - \frac{1}{2} \cdot 10 \cdot 4 = 60 - 20 = 40\text{ metre}$.</p>
        <p>4. saniyede: $v(4) = 30 - 40 = -10\text{ m/s}$ (aşağı yönde inişte). Yükseklik: $h(4) = 30 \cdot 4 - \frac{1}{2} \cdot 10 \cdot 16 = 120 - 80 = 40\text{ metre}$. Cisim aynı irtifadan eşit süratle zıt yönde geçmektedir.</p>
      </div>
    </div>

    <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>Örnek Soru 7 (İki Cismin Karşılaşma Problemi)</span>
        <span class="text-indigo-600 font-semibold">15 Puan</span>
      </div>
      <p class="text-xs text-slate-800 dark:text-slate-200 font-medium">80 metre yüksekliğindeki kuleden bir taş serbest bırakıldığı anda, kulenin dibinden başka bir taş $40\text{ m/s}$ hızla düşey yukarı fırlatılıyor. Taşlar kaç saniye sonra ve yerden kaç metre yükseklikte karşılaşır?</p>
      <div class="text-xs text-slate-600 dark:text-slate-400 space-y-1 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
        <p><strong>Çözüm:</strong> Serbest düşen taş: $h_1 = \frac{1}{2} g t^2 = 5t^2$. Yukarı atılan taş: $h_2 = v_0 t - \frac{1}{2} g t^2 = 40t - 5t^2$.</p>
        <p>Toplam yol kule yüksekliğine eşittir: $h_1 + h_2 = 5t^2 + (40t - 5t^2) = 40t = 80 \implies t = 2\text{ saniye}$.</p>
        <p>Karşılaşma yüksekliği (yerden): $h_2 = 40 \cdot 2 - 5 \cdot 4 = 80 - 20 = 60\text{ metre}$.</p>
      </div>
    </div>
"""
        # Replace the sample questions section by inserting before closing div
        content_7003 = content_7003.replace('</div>\n</div>', extra_7003 + '\n</div>\n</div>') if '</div>\n</div>' in content_7003 else content_7003 + extra_7003
        c.execute("UPDATE posts SET content = ?, featured_image = 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80' WHERE id = 7003", (content_7003,))
        print(f"Updated 7003 (atislar): {count_words(content_7003)} words")

    # ---------------------------------------------------------
    # 13. ID 7004: 10-sinif-fizik-1-donem-2-yazili-sorulari-ve-cevap-anahtari-word-pdf
    # ---------------------------------------------------------
    c.execute("SELECT content FROM posts WHERE id = 7004")
    row = c.fetchone()
    if row:
        content_7004 = row[0]
        extra_7004 = """
    <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>Soru 6 (Katı Basıncı ve Ters Çevrilen Prizma)</span>
        <span class="text-indigo-600 font-semibold">10 Puan</span>
      </div>
      <p class="text-xs text-slate-800 dark:text-slate-200 font-medium">Taban alanları $S$ ve $4S$, ağırlığı $G$ olan kesik koni biçimindeki katı cisim $S$ tabanı üzerindeyken zemine yaptığı basınç $P_1$, $4S$ tabanı üzerine çevrildiğinde $P_2$ oluyor. $P_1 / P_2$ oranını ve zemine uygulanan basınç kuvvetlerinin oranını bulunuz.</p>
      <div class="text-xs text-slate-600 dark:text-slate-400 space-y-1 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
        <p><strong>Çözüm:</strong> Katı basıncı formülü $P = G / A$'dır. $P_1 = G / S$, $P_2 = G / 4S$ olur. Buradan $P_1 / P_2 = 4$ bulunur.</p>
        <p>Katı cisimlerde zemine uygulanan toplam <strong>basınç kuvveti</strong> ise cismin ağırlığına eşittir ($F = G$). Cisim ters çevrildiğinde ağırlığı değişmediği için basınç kuvvetleri oranı $F_1 / F_2 = 1$'dir.</p>
      </div>
    </div>

    <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>Soru 7 (Sıvı Basıncı ve U Borusu Dengesi)</span>
        <span class="text-indigo-600 font-semibold">10 Puan</span>
      </div>
      <p class="text-xs text-slate-800 dark:text-slate-200 font-medium">Bir U borusunda birbirine karışmayan $d_1 = 1\text{ g/cm}^3$ ve $d_2 = 3\text{ g/cm}^3$ özkütleli sıvılar dengededir. $d_2$ sıvısının yüksekliği $h_2 = 4\text{ cm}$ olduğuna göre diğer koldaki $h_1$ sıvı sütunu kaç santimetredir?</p>
      <div class="text-xs text-slate-600 dark:text-slate-400 space-y-1 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
        <p><strong>Çözüm:</strong> U borusunda aynı sıvı seviyesindeki noktaların toplam basınçları eşittir: $h_1 \cdot d_1 \cdot g = h_2 \cdot d_2 \cdot g$.</p>
        <p>$h_1 \cdot 1 = 4 \cdot 3 \implies h_1 = 12\text{ cm}$ olarak hesaplanır.</p>
      </div>
    </div>

    <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>Soru 8 (Pascal Prensibi ve Hidrolik Lift)</span>
        <span class="text-indigo-600 font-semibold">10 Puan</span>
      </div>
      <p class="text-xs text-slate-800 dark:text-slate-200 font-medium">Piston alanları $S_1 = 10\text{ cm}^2$ ve $S_2 = 500\text{ cm}^2$ olan su cenderesinde küçük pistona $50\text{ N}$ kuvvet uygulanmaktadır. Büyük pistonda dengelenebilecek yükün kütlesi en fazla kaç kg olur? ($g = 10\text{ m/s}^2$)</p>
      <div class="text-xs text-slate-600 dark:text-slate-400 space-y-1 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
        <p><strong>Çözüm:</strong> Sıvılar basıncı her doğrultuda aynen iletir (Pascal Prensibi): $F_1 / S_1 = F_2 / S_2$.</p>
        <p>$50 / 10 = F_2 / 500 \implies F_2 = 5 \times 500 = 2500\text{ N}$.</p>
        <p>Kaldırılabilecek kütle: $m = F_2 / g = 2500 / 10 = 250\text{ kg}$ olarak bulunur.</p>
      </div>
    </div>

    <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>Soru 9 (Arşimet Prensibi ve Kaldırma Kuvveti)</span>
        <span class="text-indigo-600 font-semibold">10 Puan</span>
      </div>
      <p class="text-xs text-slate-800 dark:text-slate-200 font-medium">Özkütlesi $d_c = 0.6\text{ g/cm}^3$ ve hacmi $V = 500\text{ cm}^3$ olan tahta blok özkütlesi $1\text{ g/cm}^3$ olan su içerisine bırakılıyor. Tahtanın batan hacmi kaç $\text{cm}^3$'tür?</p>
      <div class="text-xs text-slate-600 dark:text-slate-400 space-y-1 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
        <p><strong>Çözüm:</strong> Yüzen cisimlerde kaldırma kuvveti cismin ağırlığına eşittir: $V_{batan} \cdot d_{sivi} \cdot g = V_{toplam} \cdot d_{cisim} \cdot g$.</p>
        <p>$V_{batan} \cdot 1 = 500 \cdot 0.6 \implies V_{batan} = 300\text{ cm}^3$ suya batar, $200\text{ cm}^3$'ü su üstünde kalır.</p>
      </div>
    </div>
"""
        content_7004 = content_7004.replace('</div>\n</div>', extra_7004 + '\n</div>\n</div>') if '</div>\n</div>' in content_7004 else content_7004 + extra_7004
        c.execute("UPDATE posts SET content = ?, featured_image = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80' WHERE id = 7004", (content_7004,))
        print(f"Updated 7004 (10. sinif fizik): {count_words(content_7004)} words")

    # ---------------------------------------------------------
    # 14. ID 7005: 9-sinif-fizik-1-donem-2-yazili-sinavi-sorulari-ve-cozumleri-word-pdf
    # ---------------------------------------------------------
    c.execute("SELECT content FROM posts WHERE id = 7005")
    row = c.fetchone()
    if row:
        content_7005 = row[0]
        extra_7005 = """
    <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>Soru 6 (Kılcallık ve Yüzey Gerilimi - 10 Puan)</span>
        <span class="text-indigo-600 font-semibold">MEB Maarif</span>
      </div>
      <p class="text-xs text-slate-800 dark:text-slate-200 font-medium">Günlük yaşamda karşılaştığımız (a) Ağaçların köklerinden yapraklarına su iletmesi, (b) Cıva damlasının küresel kalması, (c) Gaz lambası fitilinin gaz yağını çekmesi olaylarını adezyon, kohezyon ve kılcallık kavramlarıyla açıklayınız.</p>
      <div class="text-xs text-slate-600 dark:text-slate-400 space-y-1 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
        <p><strong>Çözüm:</strong></p>
        <p><strong>(a) ve (c):</strong> Sıvı molekülleri ile ince boru/fitil çeperleri arasındaki adezyon kuvvetinin kohezyondan büyük olması ve yerçekimine karşı sıvının dar kanallarda yükselmesi <strong>kılcallık (kapilarite)</strong> olayıdır.</p>
        <p><strong>(b):</strong> Cıva atomları arasındaki çekim kuvveti (<strong>kohezyon</strong>), cıva ile zemin arasındaki adezyondan çok daha güçlü olduğu için cıva dağılmayıp yüzey gerilimi nedeniyle küresel biçim alır.</p>
      </div>
    </div>

    <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>Soru 7 (Ortalama Hız ve Ortalama Sürat Ayrımı - 10 Puan)</span>
        <span class="text-indigo-600 font-semibold">MEB Maarif</span>
      </div>
      <p class="text-xs text-slate-800 dark:text-slate-200 font-medium">Bir koşucu $400\text{ m}$ çevreli dairesel bir pist etrafında koşarak bir tam turunu 80 saniyede tamamlamıştır. Koşucunun bu turdaki ortalama süratini ve ortalama hızını bulunuz.</p>
      <div class="text-xs text-slate-600 dark:text-slate-400 space-y-1 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
        <p><strong>Çözüm:</strong></p>
        <p><strong>Ortalama Sürat (Skaler):</strong> Alınan toplam yol bölü zamandır: $v_{surat} = \frac{\text{Toplam Yol}}{\Delta t} = \frac{400}{80} = 5\text{ m/s}$.</p>
        <p><strong>Ortalama Hız (Vektörel):</strong> Toplam yer değiştirme bölü zamandır: $\vec{v}_{ort} = \frac{\Delta \vec{x}}{\Delta t}$. Koşucu başladığı noktaya geri döndüğü için net yer değiştirmesi sıfırdır ($\Delta \vec{x} = 0$). Dolayısıyla <strong>ortalama hızı 0 m/s</strong>'dir.</p>
      </div>
    </div>

    <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>Soru 8 (Düzgün Hızlanan Hareket ve Hız-Zaman Grafiği - 10 Puan)</span>
        <span class="text-indigo-600 font-semibold">MEB Maarif</span>
      </div>
      <p class="text-xs text-slate-800 dark:text-slate-200 font-medium">Durgun halden harekete başlayan bir araç $3\text{ m/s}^2$ sabit ivmeyle 6 saniye boyunca hızlanıyor. Aracın 6. saniyedeki son hızını ve bu sürede aldığı toplam yolu hesaplayınız.</p>
      <div class="text-xs text-slate-600 dark:text-slate-400 space-y-1 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
        <p><strong>Çözüm:</strong> Son hız: $v = a \cdot t = 3 \cdot 6 = 18\text{ m/s}$.</p>
        <p>Alınan yol: Hız-Zaman grafiğinin altındaki üçgenin alanından $x = \frac{v \cdot t}{2} = \frac{18 \cdot 6}{2} = 54\text{ metre}$ bulunur. Formülle: $x = \frac{1}{2} a t^2 = \frac{1}{2} \cdot 3 \cdot 36 = 54\text{ m}$.</p>
      </div>
    </div>
"""
        content_7005 = content_7005.replace('</div>\n</div>', extra_7005 + '\n</div>\n</div>') if '</div>\n</div>' in content_7005 else content_7005 + extra_7005
        c.execute("UPDATE posts SET content = ?, featured_image = 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=1200&q=80' WHERE id = 7005", (content_7005,))
        print(f"Updated 7005 (9. sinif fizik): {count_words(content_7005)} words")

    # ---------------------------------------------------------
    # 15. ID 7012: gunes-firini-yapalim
    # ---------------------------------------------------------
    c.execute("SELECT content FROM posts WHERE id = 7012")
    row = c.fetchone()
    if row:
        content_7012 = row[0]
        extra_7012 = """
  <h2>Sera Etkisi ve Isı Transferi Mekanizmaları: İletim, Taşınım, Işıma</h2>
  <p>
    Güneş fırınının iç haznesinde $120^\circ\text{C}$ ve üzeri sıcaklıklara ulaşılabilmesi, doğadaki sera etkisinin ve üç temel ısı transfer mekanizmasının hassas dengesine dayanır:
  </p>
  <ul class="list-disc pl-6 space-y-2">
    <li><strong>Işıma (Radyasyon):</strong> Güneşten gelen görünür ışık ve ultraviyole ışınları şeffaf streç filmden/camdan geçerek siyah karton hazneye çarpar. Siyah yüzey ışığı absorbe ederek ısı enerjisine (uzun dalga boylu kızılötesi ışımaya) dönüştürür. Cam/streç film uzun dalga boylu kızılötesi ışımayı geri geçirmez ve ısı içeride hapsolur.</li>
    <li><strong>İletim (Kondüksiyon):</strong> Kutunun dış katmanına yerleştirilen gazete kağıdı, strafor veya yün parçaları, haznedeki ısının dış havaya iletimle kaçmasını önleyen mükemmel bir yalıtım bariyeridir.</li>
    <li><strong>Taşınım (Konveksiyon):</strong> Kutunun ağzı hava sızdırmaz şekilde streç filmle kapatıldığında, içeride ısınan havanın yükselip dışarı kaçması engellenir.</li>
  </ul>

  <h2>Optimum Açı ve Güneş Takip Protokolü</h2>
  <p>
    Fırının verimini en üst seviyeye çıkarmak için folyo kaplı kapağın açısı güneşin geliş açısına göre ayarlanmalıdır. Reflektör kapağın güneş ışınlarını doğrudan cam pencereye yansıtması için kapağın yaklaşık $60^\circ - 75^\circ$ eğimle sabitlenmesi gerekir. Ayrıca güneş gökyüzünde hareket ettikçe her 25-30 dakikada bir kutunun güneşe doğru döndürülmesi (manuel güneş takip sistemi) iç sıcaklığın düşmesini engeller.
  </p>
  <p>
    Yenilenebilir enerji projeleri için <a href="/post/ruzgar-turbini-nasil-yapilir" class="font-bold text-indigo-600 hover:underline">Minyatür Rüzgâr Türbini Yapımı ve Aerodinamik Rehberi</a> sayfamıza da göz atabilirsiniz.
  </p>
"""
        content_7012 = content_7012.replace('</div>\n</div>', extra_7012 + '\n</div>\n</div>') if '</div>\n</div>' in content_7012 else content_7012 + extra_7012
        c.execute("UPDATE posts SET content = ? WHERE id = 7012", (content_7012,))
        print(f"Updated 7012 (gunes firini): {count_words(content_7012)} words")

    # ---------------------------------------------------------
    # 16. ID 7013: ruzgar-turbini-nasil-yapilir
    # ---------------------------------------------------------
    c.execute("SELECT content FROM posts WHERE id = 7013")
    row = c.fetchone()
    if row:
        content_7013 = row[0]
        extra_7013 = """
  <h2>Betz Limiti ve Teorik Maksimum Verim (%59.3) Fiziği</h2>
  <p>
    Alman fizikçi Albert Betz tarafından 1919 yılında formüle edilen <strong>Betz Yasası</strong>, rüzgâr enerjisinin mekanik enerjiye dönüştürülmesindeki nihai fiziksel sınırı açıklar. Akışkanlar mekaniğine göre, bir rüzgâr türbini rüzgârın taşıdığı kinetik enerjinin en fazla <strong>%59.3'ünü ($\frac{16}{27}$)</strong> mekanik enerjiye dönüştürebilir.
  </p>
  <p>
    Bunun sebebi şudur: Eğer türbin rüzgârın tüm kinetik enerjisini (%100) soğursaydı, havanın kanatları geçtikten sonraki hızı sıfır olurdu. Hızı sıfır olan hava kanatların arkasında birikerek türbini tıkar ve arkadan gelen yeni rüzgâr akımının türbine çarpmasını engellerdi. Dolayısıyla arkadan hava tahliyesinin sürmesi için rüzgârın enerjisinin en az üçte birini koruyarak türbini terk etmesi zorunludur.
  </p>

  <h2>Multimetre ile Elektrik Üretimi Ölçümü ve Güç Hesabı</h2>
  <p>
    Yapılan model rüzgâr türbininin performansını test etmek için DC motorun kutuplarına dijital bir multimetre bağlanır:
  </p>
  <ul class="list-disc pl-6 space-y-2">
    <li>Multimetre DC Volt (V) kademesine getirilir. Bir saç kurutma makinesi türbine 30 cm mesafeden tutularak üretilen açık devre voltajı ($V_{oc}$) ölçülür.</li>
    <li>Devreye küçük bir LED veya $100\,\Omega$ direnç bağlanarak devreden geçen akım ($I$) amper kademesinde ölçülür.</li>
    <li>Elektriksel güç $P = V \cdot I$ formülüyle hesaplanır (örneğin $2.5\text{ V} \times 0.02\text{ A} = 0.05\text{ Watt}$). Kanat açısı değiştirilerek maksimum gücü veren hücum açısı (optimum pitch angle) deneysel olarak belirlenir.</li>
  </ul>
  <p>
    Tüm mühendislik ve fizik projelerimiz için <a href="/post/edison-ve-teslanin-alternatif-akim-ve-dogru-akim-karsilastirmasi" class="font-bold text-indigo-600 hover:underline">Alternatif Akım ve Doğru Akım Karşılaştırma Rehberi</a> yazımızı inceleyebilirsiniz.
  </p>
"""
        content_7013 = content_7013.replace('</div>\n</div>', extra_7013 + '\n</div>\n</div>') if '</div>\n</div>' in content_7013 else content_7013 + extra_7013
        c.execute("UPDATE posts SET content = ? WHERE id = 7013", (content_7013,))
        print(f"Updated 7013 (ruzgar turbini): {count_words(content_7013)} words")

    conn.commit()
    conn.close()
    print("\n--- ALL ENRICHMENTS COMPLETED SUCCESSFULLY ---")

if __name__ == '__main__':
    main()
