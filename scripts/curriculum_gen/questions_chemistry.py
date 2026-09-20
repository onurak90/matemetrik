# -*- coding: utf-8 -*-
"""
Authentic Chemistry Question Generator for High School (5 options: A, B, C, D, E):
- 9. Sınıf: Kimya Bilimi, Atom Modelleri & Periyodik Sistem
- 10. Sınıf: Mol Kavramı & Kimyasal Hesaplamalar
- 11. Sınıf: Modern Atom Teorisi & Gaz Yasaları
- 12. Sınıf: Elektrokimya (Redoks & Piller)
"""

def get_chemistry_questions(slug):
    raw = []
    if "9-sinif-kimya" in slug:
        raw = [
            ("Simya ile kimya bilimi arasındaki en temel fark nedir?", ["A) Simyanın teorik temellerinin olmaması ve deneme-yanılmaya dayanması", "B) Simyanın sadece altın üretmesi", "C) Kimyanın deney yapmaması", "D) Simyacıların laboratuvar aletleri geliştirmemesi", "E) Hiçbir fark yoktur"], "A", "Simya bir bilim değildir; sistematik bilgi birikimi ve teorik temelleri yoktur, deneme yanılmaya dayanır."),
            ("Kütlenin Korunumu Kanunu'nu bulan ve modern kimyanın babası sayılan bilim insanı kimdir?", ["A) John Dalton", "B) Antoine Lavoisier", "C) Robert Boyle", "D) J.J. Thomson", "E) Mendeleyev"], "B", "Antoine Lavoisier kapalı kapta yaptığı deneylerle kütlenin korunduğunu ispatlamıştır."),
            ("Proton ve nötron sayılarının toplamı atomda neye eşittir?", ["A) Atom numarası (Z)", "B) Kütle numarası (A)", "C) İyon yükü", "D) Değerlik elektron sayısı", "E) Periyot numarası"], "B", "Kütle numarası A = Proton sayısı (p) + Nötron sayısı (n)."),
            ("₁₁Na (Sodyum) atomunun katman elektron dizilimi nasıldır?", ["A) 2 - 8 - 1", "B) 2 - 8 - 2", "C) 2 - 9", "D) 8 - 2 - 1", "E) 1 - 8 - 2"], "A", "11 elektron katmanlara: 1. katman: 2, 2. katman: 8, 3. katman: 1 olarak dağılır (2 - 8 - 1)."),
            ("Katman elektron dizilimi 2 - 8 - 7 olan element periyodik sistemde nerede bulunur?", ["A) 2. periyot 7A", "B) 3. periyot 7A", "C) 3. periyot 8A", "D) 7. periyot 3A", "E) 1. periyot 7A"], "B", "3 katmanı vardır (3. periyot), son katmanda 7 elektron vardır (7A grubu - Halojen)."),
            ("Aynı elementin proton sayıları aynı, nötron sayıları farklı atomlarına ne ad verilir?", ["A) İzotop", "B) İzoton", "C) İzobar", "D) İzoelektronik", "E) Allotrop"], "A", "Proton sayıları aynı nötronları farklı atomlar izotoptur (örn: ¹H, ²H, ³H)."),
            ("Proton sayısı elektron sayısından fazla olan pozitif yüklü iyonlara ne denir?", ["A) Anyon", "B) Katyon", "C) Nötr atom", "D) Molekül", "E) Radikal"], "B", "Elektron vererek pozitif (+) yüklenen iyonlara katyon denir."),
            ("Periyodik tabloda soldan sağa doğru gidildikçe genellikle hangisi artar?", ["A) Atom yarıçapı", "B) Metalik özellik", "C) Elektronegatiflik ve iyonlaşma enerjisi", "D) Katman sayısı", "E) Hacim"], "C", "Aynı periyotta sağa gidildikçe çekirdek çekim gücü artar; iyonlaşma enerjisi ve elektronegatiflik artar."),
            ("Periyodik cetvelde aynı grupta (yukarıdan aşağıya) inildikçe atom yarıçapı nasıl değişir?", ["A) Azalır", "B) Artar (Katman sayısı arttığı için)", "C) Değişmez", "D) Önce artar sonra azalır", "E) Sıfır olur"], "B", "Aşağı inildikçe yeni elektron katmanları eklenir ve atom yarıçapı belirgin şekilde artar."),
            ("8A grubunda yer alan asal gazların (Soygazlar) en belirgin özelliği nedir?", ["A) Çok aktif olmaları", "B) Kararlı elektron dizilimine sahip olmaları ve bileşik oluşturmaya isteksiz olmaları", "C) Metal olmaları", "D) Elektriği çok iyi iletmeleri", "E) Sıvı olmaları"], "B", "Son katmanları tam dolu (He için 2, diğerleri 8) olduğu için kararlıdırlar."),
            ("Bir atom elektron aldığında yarıçapı nasıl değişir?", ["A) Küçülür", "B) Büyür (Elektron başına düşen çekim azaldığı için)", "C) Değişmez", "D) Yarıya iner", "E) Sıfır olur"], "B", "Elektron alan atom anyon oluşturur ve elektronlar arası itmeden dolayı yarıçap genişler."),
            ("₁₇Cl atomu 1 elektron alarak Cl⁻ iyonuna dönüştüğünde elektron sayısı kaç olur?", ["A) 16", "B) 17", "C) 18", "D) 19", "E) 20"], "C", "17 + 1 = 18 elektron olur (Argon soygaz dizilimine ulaşır)."),
            ("Atomu 'üzümlü keke' benzeten ve elektronu keşfeden bilim insanı kimdir?", ["A) Dalton", "B) Thomson", "C) Rutherford", "D) Bohr", "E) Chadwick"], "B", "J.J. Thomson üzümlü kek modelinde keki pozitif yüke, üzümleri elektronlara benzetmiştir."),
            ("Altın levha deneyi ile atomun merkezinde pozitif yüklü küçük bir 'çekirdek' olduğunu keşfeden kimdir?", ["A) Rutherford", "B) Dalton", "C) Thomson", "D) Bohr", "E) Avogadro"], "A", "Ernest Rutherford alfa saçılması deneyi ile çekirdekli atom modelini ortaya koymuştur."),
            ("Elektronların çekirdek etrafında belirli dairesel 'yörüngelerde' (enerji düzeylerinde) dolandığını öne süren model kimindir?", ["A) Bohr Atom Modeli", "B) Dalton Modeli", "C) Thomson Modeli", "D) Modern Teori", "E) Lavoisier"], "A", "Niels Bohr kuantumlu yörünge modelini geliştirmiştir."),
            ("Metal ve ametal atomları arasında elektron alışverişiyle oluşan kimyasal bağ türü nedir?", ["A) Kovalent bağ", "B) İyonik bağ", "C) Metalik bağ", "D) Hidrojen bağı", "E) Van der Waals"], "B", "Metaller elektron verir, ametaller alır; zıt yüklerin elektrostatik çekimiyle iyonik bağ oluşur."),
            ("Ametal atomlarının elektronları ortaklaşa kullanmasıyla oluşan bağ türü nedir?", ["A) İyonik bağ", "B) Kovalent bağ", "C) Metalik bağ", "D) Dipol-dipol", "E) İyon-dipol"], "B", "Ametaller arasında elektron ortaklaşması kovalent bağı meydana getirir."),
            ("Su (H₂O) molekülünde molekül içi bağlar kovalent iken su moleküllerini bir arada tutan güçlü zayıf etkileşim hangisidir?", ["A) Dipol-dipol", "B) Hidrojen bağı", "C) London kuvvetleri", "D) Kovalent", "E) İyonik"], "B", "FON (Flor, Oksijen, Azot) atomlarına bağlı hidrojen atomlarının komşu moleküllerle yaptığı bağ hidrojen bağıdır."),
            ("₂He (Helyum) elementinin değerlik elektron sayısı 2 olmasına rağmen hangi gruptadır?", ["A) 2A grubu", "B) 8A grubu (Soygaz)", "C) 1A grubu", "D) 7A grubu", "E) 3B grubu"], "B", "Helyum tek katmanlıdır ve katmanı tam dolu olduğu için soygazdır (8A grubundadır)."),
            ("H₂SO₄ (Sülfürik asit) bileşiğinin yaygın geleneksel adı nedir?", ["A) Tuz ruhu", "B) Kezzap", "C) Zaç yağı", "D) Sudkostik", "E) Kireç taşı"], "C", "H₂SO₄ simyacılardan beri zaç yağı olarak bilinir (Tuz ruhu HCl, Kezzap HNO₃'tür).")
        ]
    elif "10-sinif-kimya" in slug:
        raw = [
            ("1 mol tanecik (Avogadro sayısı, N_A) yaklaşık kaç tanedir?", ["A) 6,02 × 10²²", "B) 6,02 × 10²³", "C) 6,02 × 10²⁴", "D) 1,66 × 10⁻²⁴", "E) 12 × 10²³"], "B", "1 mol = 6,022 × 10²³ adet taneciktir (N_A)."),
            ("Mol sayısı (n), kütle (m) ve mol kütlesi (M_A) arasındaki temel formül nedir?", ["A) n = m · M_A", "B) n = m / M_A", "C) n = M_A / m", "D) m = n / M_A", "E) M_A = n · m"], "B", "Mol sayısı = Kütle / Mol kütlesi (n = m / M_A)."),
            ("Normal koşullarda (NK: 0 °C ve 1 atm) 1 mol ideal gaz kaç litre hacim kaplar?", ["A) 22,4 L", "B) 24,5 L", "C) 11,2 L", "D) 44,8 L", "E) 1 L"], "A", "Normal şartlar altında tüm gazların 1 molü 22,4 litre hacim kaplar."),
            ("Oda koşullarında (25 °C ve 1 atm) 1 mol gaz kaç litre hacim kaplar?", ["A) 22,4 L", "B) 24,5 L", "C) 11,2 L", "D) 44,8 L", "E) 18 L"], "B", "Oda koşullarında (standart şartlarda) 1 mol gaz 24,5 litredir."),
            ("H = 1 g/mol ve O = 16 g/mol olduğuna göre suyun (H₂O) mol kütlesi kaç g/mol'dür?", ["A) 17", "B) 18", "C) 32", "D) 34", "E) 20"], "B", "M_A(H₂O) = 2(1) + 16 = 18 g/mol."),
            ("36 gram H₂O (su) kaç moldür?", ["A) 1 mol", "B) 2 mol", "C) 3 mol", "D) 0,5 mol", "E) 4 mol"], "B", "n = m / M_A = 36 / 18 = 2 mol."),
            ("0,5 mol CH₄ (Metan) gazı normal koşullarda kaç litre hacim kaplar (NK)?", ["A) 5,6 L", "B) 11,2 L", "C) 22,4 L", "D) 44,8 L", "E) 1,12 L"], "B", "V = n × 22,4 = 0,5 × 22,4 = 11,2 L."),
            ("N₂ + 3H₂ → 2NH₃ tepkimesinde 1 mol N₂ gazı tamamen harcandığında kaç mol NH₃ oluşur?", ["A) 1 mol", "B) 2 mol", "C) 3 mol", "D) 4 mol", "E) 0,5 mol"], "B", "Katsayılar oranına göre 1 mol N₂'den 2 mol NH₃ gazı oluşur."),
            ("Bir kimyasal tepkimede tamamen tükenerek ürün miktarını belirleyen maddeye ne ad verilir?", ["A) Katalizör", "B) Sınırlayıcı bileşen", "C) Aşırı madde", "D) İndikatör", "E) Çözücü"], "B", "Tepkimede ilk biten ve reaksiyonu durduran madde sınırlayıcı bileşendir."),
            ("C = 12 g/mol ve O = 16 g/mol olduğuna göre 44 gram CO₂ gazı kaç moldür?", ["A) 0,5 mol", "B) 1 mol", "C) 1,5 mol", "D) 2 mol", "E) 4 mol"], "B", "M_A = 12 + 2(16) = 44 g/mol. n = 44 / 44 = 1 mol."),
            ("3,01 × 10²³ tane atom içeren helyum (He) gazı kaç moldür?", ["A) 0,25 mol", "B) 0,5 mol", "C) 1 mol", "D) 2 mol", "E) 0,1 mol"], "B", "n = N / N_A = (3,01 × 10²³) / (6,02 × 10²³) = 0,5 mol."),
            ("Katlı Oranlar Kanunu'nu ortaya koyan bilim insanı kimdir?", ["A) Dalton", "B) Proust", "C) Lavoisier", "D) Avogadro", "E) Gay-Lussac"], "A", "Aynı elementlerden oluşan iki farklı bileşikteki oranları açıklayan John Dalton'dur."),
            ("Sabit Oranlar Kanunu'nu bulan bilim insanı kimdir?", ["A) Joseph Proust", "B) Dalton", "C) Lavoisier", "D) Thomson", "E) Rutherford"], "A", "Bir bileşiği oluşturan elementlerin kütleleri arasındaki oranın sabit olduğunu Proust bulmuştur."),
            ("0,2 mol C₃H₈ gazında kaç mol hidrojen (H) atomu bulunur?", ["A) 0,8 mol", "B) 1,6 mol", "C) 2,4 mol", "D) 0,6 mol", "E) 8 mol"], "B", "1 molde 8 mol H varsa; 0,2 × 8 = 1,6 mol H atomu bulunur."),
            ("2H₂ + O₂ → 2H₂O tepkimesinde 4 mol H₂ ile 3 mol O₂ karıştırılırsa hangi maddeden kaç mol artar?", ["A) 1 mol H₂ artar", "B) 1 mol O₂ artar", "C) 2 mol O₂ artar", "D) Artan olmaz", "E) 0,5 mol H₂ artar"], "B", "4 mol H₂ için 2 mol O₂ gerekir. 3 - 2 = 1 mol O₂ gazı artar (H₂ sınırlayıcı bileşendir)."),
            ("Kütlece %20'lik 200 gram tuzlu su çözeltisinde kaç gram tuz çözünmüştür?", ["A) 20 g", "B) 40 g", "C) 50 g", "D) 60 g", "E) 80 g"], "B", "m_tuz = 200 × (20 / 100) = 40 gram tuz (160 g su)."),
            ("Aşağıdakilerden hangisi bir homojen karışımdır (çözelti)?", ["A) Ayran", "B) Çamurlu su", "C) Şekerli su", "D) Zeytinyağı-su", "E) Sis"], "C", "Şeker suda moleküler düzeyde homojen dağılarak çözelti oluşturur."),
            ("Tuzlu suyun kaynamaya başlama sıcaklığı saf suya göre nasıldır?", ["A) Daha düşüktür", "B) Daha yüksektir (> 100 °C)", "C) Aynıdır (100 °C)", "D) Sıfırdır", "E) Belirsizdir"], "B", "Uçucu olmayan katı çözünenler buhar basıncını düşürür ve kaynama noktasını yükseltir (koligatif özellik)."),
            ("Asitler ile bazların tepkimeye girerek tuz ve su oluşturduğu tepkimelere ne denir?", ["A) Yanma", "B) Nötralleşme", "C) Çökelme", "D) Analiz", "E) Sentez"], "B", "Asit + Baz → Tuz + Su tepkimelerine nötralleşme tepkimesi denir."),
            ("pH değeri 2 olan bir çözelti nasıldır?", ["A) Kuvvetli asidiktir", "B) Zayıf baziktir", "C) Nötrdür", "D) Kuvvetli baziktir", "E) Saf sudur"], "A", "pH < 7 asidiktir; 0'a yaklaştıkça asitlik kuvveti artar.")
        ]
    else: # 11, 12 chemistry fallback
        raw = [
            ("İdeal Gaz Yasası denklemi aşağıdakilerden hangisidir?", ["A) P · V = n · R · T", "B) P / V = n · R · T", "C) P · T = n · R · V", "D) V = P · n · T", "E) P · n = V · R · T"], "A", "Basınç (P) × Hacim (V) = Mol (n) × Gaz sabiti (R) × Mutlak sıcaklık Kelvin (T)."),
            ("Gaz yasalarında sıcaklık birimi mutlaka ne olmalıdır?", ["A) Celcius (°C)", "B) Kelvin (K = °C + 273)", "C) Fahrenheit (°F)", "D) Kalori", "E) Joule"], "B", "Termodinamik hesaplamalarda mutlak sıcaklık Kelvin (T = t + 273) kullanılır."),
            ("Sabit sıcaklık ve mol sayısında basınç ile hacim arasındaki ters orantıyı ifade eden yasa hangisidir?", ["A) Charles Yasası", "B) Boyle Yasası (P₁·V₁ = P₂·V₂)", "C) Gay-Lussac Yasası", "D) Avogadro Yasası", "E) Dalton Yasası"], "B", "Robert Boyle basınç ile hacmin ters orantılı olduğunu bulmuştur."),
            ("Elektronların orbitallere en düşük enerjiliden başlanarak yerleştirilmesi kuralına ne denir?", ["A) Hund Kuralı", "B) Aufbau Kuralı", "C) Pauli İlkesi", "D) Heisenberg İlkesi", "E) Le Chatelier"], "B", "Aufbau kuralına göre elektronlar önce en düşük enerjili orbitalleri doldurur (1s, 2s, 2p...)."),
            ("Bir orbitalde zıt spinli en fazla 2 elektron bulunabileceğini belirten ilke hangisidir?", ["A) Pauli İlkesi", "B) Hund Kuralı", "C) Aufbau", "D) Dalton", "E) Hess Yasası"], "A", "Pauli dışlama ilkesine göre bir atomda tüm kuantum sayıları aynı olan iki elektron bulunamaz."),
            ("Galvanik pillerde (Pil devresi) yükseltgenmenin gerçekleştiği elektrot hangisidir?", ["A) Katot (+)", "B) Anot (-)", "C) Tuz köprüsü", "D) Voltmetre", "E) İletken tel"], "B", "ANOTTA YÜKSELTGENME (elektron verme), KATOTTA İNDİRGENME (elektron alma) gerçekleşir (KİMYA kodlaması)."),
            ("Tuz köprüsünün galvanik pildeki temel görevi nedir?", ["A) Elektron iletmek", "B) Yük denkliğini sağlamak ve devreyi tamamlamak", "C) Direnç oluşturmak", "D) Gerilimi sıfırlamak", "E) Asitliği artırmak"], "B", "Anotta biriken (+) yükleri dengelemek için tuz köprüsünden anyonlar anota, katyonlar katota göç eder."),
            ("Standart pil potansiyeli E°_pil > 0 (pozitif) ise tepkime nasıldır?", ["A) İstemlidir (Kendiliğinden gerçekleşir)", "B) İstemsizdir", "C) Dengededir", "D) Endotermiktir", "E) Gerçekleşmez"], "A", "E°_pil pozitif olan redoks tepkimeleri istemlidir ve elektrik enerjisi üretir."),
            ("Faraday Elektroliz Yasası'na göre devreden 1 Faradaylık (96500 Coulomb) yük geçtiğinde elektrotta kaç mol elektron aktarılmış olur?", ["A) 0,5 mol", "B) 1 mol elektron", "C) 2 mol", "D) 96500 mol", "E) 0,1 mol"], "B", "1 Faraday = 1 mol elektron yükü = 96485 ≈ 96500 C."),
            ("p orbitalleri en fazla kaç elektron alabilir?", ["A) 2", "B) 6", "C) 10", "D) 14", "E) 8"], "B", "p alt kabuğu 3 orbitalden oluşur ve her biri 2 elektrondan toplam 6 elektron alır."),
            ("d orbitalleri en fazla kaç elektron alabilir?", ["A) 6", "B) 10", "C) 14", "D) 2", "E) 18"], "B", "d alt kabuğunda 5 orbital vardır: 5 × 2 = 10 elektron."),
            ("Elektron veren bir taneciğin yükseltgenme basamağı nasıl değişir?", ["A) Azalır", "B) Artar (Yükseltgenir)", "C) Değişmez", "D) Sıfır olur", "E) Negatifleşir"], "B", "Elektron negatif yüklü olduğundan verildiğinde atomun yükü artar (yükseltgenir)."),
            ("Zn + Cu²⁺ → Zn²⁺ + Cu tepkimesinde indirgenen madde hangisidir?", ["A) Zn", "B) Cu²⁺", "C) Zn²⁺", "D) Cu", "E) Su"], "B", "Cu²⁺ iki elektron alarak nötr Cu katısına indirgenmiştir."),
            ("Standart hidrojen elektrodunun (SHE) potansiyeli kaç Volt kabul edilmiştir?", ["A) 0,00 V", "B) 1,00 V", "C) -1,00 V", "D) 0,50 V", "E) 2,00 V"], "A", "Tüm elektrot potansiyelleri SHE'ye göre kıyaslanır ve SHE = 0,00 V kabul edilir."),
            ("Nernst Eşitliği hangi durumlarda pil potansiyelini hesaplamak için kullanılır?", ["A) Standart olmayan derişimlerde (E_pil = E° - (0,0592/n)·logQ)", "B) Yalnızca gaz pillerinde", "C) Sıcaklık 0 K iken", "D) Derişimler 1 M iken", "E) Pil bittiğinde"], "A", "İyon derişimleri 1 M'den farklı olduğunda Nernst eşitliği uygulanır."),
            ("Lityum-iyon pilleri neden modern elektronik cihazlarda çok tercih edilir?", ["A) Ağır oldukları için", "B) Hafif olmaları, yüksek enerji yoğunluğu ve şarj edilebilirlikleri", "C) Tek kullanımlık olmaları", "D) Ucuz kurşun içermeleri", "E) Sıvı akıtmaları"], "B", "Lityum en hafif metaldir ve yüksek elektrokimyasal potansiyel üretir."),
            ("Demirin paslanmasını (korozyon) önlemek için demire bağlanan daha aktif metale ne ad verilir?", ["A) Katot", "B) Kurban elektrot (Anot)", "C) İndikatör", "D) Yalıtkan", "E) Alaşım"], "B", "Demir yerine kurban elektrot (örn: Çinko veya Magnezyum) yükseltgenerek aşınır."),
            ("Sabit hacimli bir kapta sıcaklık 2 katına (Kelvin cinsinden) çıkarılırsa gaz basıncı nasıl değişir?", ["A) Yarıya iner", "B) 2 katına çıkar", "C) 4 katına çıkar", "D) Değişmez", "E) Sıfır olur"], "B", "Gay-Lussac yasasına göre sabit hacimde P ile T doğru orantılıdır: P₂ = 2P₁."),
            ("Kısmi Basınçlar Yasası'nı ortaya koyan bilim insanı kimdir?", ["A) John Dalton", "B) Charles", "C) Avogadro", "D) Graham", "E) Boyle"], "A", "Bir gaz karışımındaki toplam basınç gazların kısmi basınçları toplamına eşittir (Dalton)."),
            ("Aynı koşullarda CH₄ (M_A = 16) gazının difüzyon hızı SO₂ (M_A = 64) gazının difüzyon hızının kaç katıdır?", ["A) 2 katıdır", "B) 4 katıdır", "C) 1/2 katıdır", "D) 8 katıdır", "E) Eşittir"], "A", "Graham difüzyon yasası: v₁/v₂ = √(M₂/M₁) = √(64/16) = √4 = 2 katıdır.")
        ]

    questions = []
    for i, (q_text, opts, corr, sol) in enumerate(raw, 1):
        questions.append({
            "num": i,
            "text": q_text,
            "options": opts,
            "correct": corr,
            "solution": sol
        })
    return questions
