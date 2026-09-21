export interface CalculatorMeta {
  slug: string;
  name: string;
  shortDesc: string;
  category: 'temel' | 'cebir' | 'geometri' | 'finans';
  categoryName: string;
  icon: string;
  badge: string;
  color: string;
  formula: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  faqs: { question: string; answer: string }[];
}

export const CALCULATORS_REGISTRY: Record<string, CalculatorMeta> = {
  'yuzde-hesaplama': {
    slug: 'yuzde-hesaplama',
    name: 'Yüzde Hesaplama',
    shortDesc: 'A sayısının %B’si, yüzde artış ve azalış oranlarını adım adım hesaplayın.',
    category: 'finans',
    categoryName: 'Finans & Günlük Hayat',
    icon: 'Percent',
    badge: 'En Çok Kullanılan',
    color: 'from-blue-500 to-indigo-600',
    formula: 'Sonuç = (A × B) / 100',
    seoTitle: 'Yüzde Hesaplama Robotu | Yüzde Artış, Azalış ve Oran Bulma - Matemetrik',
    seoDescription:
      'A sayısının %B’sini bulma, bir sayının diğerine oranını hesaplama ve yüzde değişim (artış/azalış) hesaplayıcı. Adım adım formüllü ve öğrencilere özel pratik çözümler.',
    keywords: [
      'yüzde hesaplama',
      'yüzde hesaplama robotu',
      'yüzde nasıl hesaplanır',
      'yüzde artış hesaplama',
      'yüzde indirim hesaplama',
      'sayının yüzdesini bulma',
      'pratik yüzde hesaplama',
    ],
    faqs: [
      {
        question: 'Bir sayının yüzdesi nasıl hesaplanır?',
        answer:
          'Bir A sayısının %B’sini hesaplamak için sayı önce B ile çarpılır, ardından 100’e bölünür. Örneğin 200’ün %15’i = (200 × 15) / 100 = 3000 / 100 = 30’dur.',
      },
      {
        question: 'Yüzde artış veya azalış oranı nasıl bulunur?',
        answer:
          'Yeni değerden eski değer çıkarılır, fark eski değere bölünür ve 100 ile çarpılır: Değişim % = ((Yeni - Eski) / Eski) × 100.',
      },
    ],
  },
  'kdv-hesaplama': {
    slug: 'kdv-hesaplama',
    name: 'KDV Hesaplama',
    shortDesc: 'KDV Dahil ve KDV Hariç tutarları %1, %10 ve %20 güncel oranlarıyla anında bulun.',
    category: 'finans',
    categoryName: 'Finans & Günlük Hayat',
    icon: 'Receipt',
    badge: 'Güncel Oranlar',
    color: 'from-emerald-500 to-teal-600',
    formula: 'KDV Dahil = Matrah × (1 + Oran/100)',
    seoTitle: '2026 KDV Hesaplama | KDV Dahil ve KDV Hariç Hesaplayıcı (%1, %10, %20) - Matemetrik',
    seoDescription:
      'Güncel %1, %10 ve %20 KDV oranlarıyla KDV dahil ve hariç fiyat hesaplama motoru. Matrah, KDV tutarı ve genel toplam dökümü.',
    keywords: [
      'kdv hesaplama',
      'kdv dahil hesaplama',
      'kdv hariç hesaplama',
      'yüzde 20 kdv hesaplama',
      'yüzde 10 kdv hesaplama',
      'kdv tutarı bulma',
    ],
    faqs: [
      {
        question: 'KDV Hariç fiyattan KDV Dahil fiyat nasıl bulunur?',
        answer:
          'KDV hariç tutar (matrah), KDV oranı ile çarpılıp 100’e bölünerek KDV tutarı bulunur ve matraha eklenir. Pratik olarak %20 KDV için tutar 1,20 ile çarpılır.',
      },
      {
        question: 'KDV Dahil fiyattan KDV nasıl ayrıştırılır?',
        answer:
          'KDV dahil tutar, (1 + KDV Oranı/100) sayısına bölünür. Örneğin %20 KDV dahil bir tutar 1,20’ye bölünerek KDV hariç ana para (matrah) elde edilir.',
      },
    ],
  },
  'indirim-hesaplama': {
    slug: 'indirim-hesaplama',
    name: 'İndirim Hesaplama',
    shortDesc: 'Etiket fiyatı üzerinden indirim tutarı, indirimli fiyat ve tasarruf edilen tutarı hesaplayın.',
    category: 'finans',
    categoryName: 'Finans & Günlük Hayat',
    icon: 'Tag',
    badge: 'Alışveriş Dostu',
    color: 'from-rose-500 to-pink-600',
    formula: 'İndirimli Fiyat = Fiyat - (Fiyat × İndirim / 100)',
    seoTitle: 'İndirim Hesaplama Robotu | İndirim Oranı ve İndirimli Fiyat Hesaplayıcı - Matemetrik',
    seoDescription:
      'Alışveriş ve etiket indirimlerini hesaplayın. İndirim yüzdesi girerek yeni fiyatı ve ne kadar kar ettiğinizi anında görün.',
    keywords: [
      'indirim hesaplama',
      'yüzde indirim hesaplama',
      'indirimli fiyat hesaplama',
      'indirim tutarı bulma',
      'etiket fiyatı indirimi',
    ],
    faqs: [
      {
        question: 'İndirimli fiyat nasıl hesaplanır?',
        answer:
          'Orijinal fiyattan indirim miktarı çıkarılarak bulunur. İndirim miktarı = (Orijinal Fiyat × İndirim Oranı) / 100 formülü ile hesaplanır.',
      },
    ],
  },
  'oran-oranti-hesaplama': {
    slug: 'oran-oranti-hesaplama',
    name: 'Oran Orantı Hesaplama',
    shortDesc: 'Doğru ve ters orantı problemlerini adım adım çapraz çarpım ile çözün.',
    category: 'temel',
    categoryName: 'Temel Matematik',
    icon: 'Scale',
    badge: 'Adım Adım',
    color: 'from-indigo-500 to-violet-600',
    formula: 'A / B = C / X ⇒ X = (B × C) / A',
    seoTitle: 'Oran Orantı Hesaplama Robotu | Doğru ve Ters Orantı Çözücü - Matemetrik',
    seoDescription:
      'Doğru orantı ve ters orantı hesaplama aracı. A/B = C/x bilinmeyen x değerini çapraz çarpım adımlarıyla bulun.',
    keywords: [
      'oran orantı hesaplama',
      'doğru orantı hesaplama',
      'ters orantı hesaplama',
      'içler dışlar çarpımı hesaplama',
      'oran bulma',
    ],
    faqs: [
      {
        question: 'Doğru orantı ile ters orantı arasındaki fark nedir?',
        answer:
          'Doğru orantıda bir çokluk artarken diğeri de aynı oranda artar (çapraz çarpım yapılır: A·x = B·C). Ters orantıda ise biri artarken diğeri azalır (karşılıklı çarpım yapılır: A·B = C·x).',
      },
    ],
  },
  'uslu-sayi-hesaplama': {
    slug: 'uslu-sayi-hesaplama',
    name: 'Üslü Sayı Hesaplama',
    shortDesc: 'Taban ve üs (kuvvet) girerek pozitif, negatif ve rasyonel üslü ifadeleri çözün.',
    category: 'temel',
    categoryName: 'Temel Matematik',
    icon: 'Superscript',
    badge: 'Kuvvet Alma',
    color: 'from-amber-500 to-orange-600',
    formula: 'aⁿ = a × a × ... × a (n defa)',
    seoTitle: 'Üslü Sayı Hesaplama Robotu | Kuvvet Alma ve Üslü İfade Çözücü - Matemetrik',
    seoDescription:
      'Taban ve üs değerlerini girerek anında sonucu bulun. Negatif üsler, sıfırıncı kuvvet ve üslü sayı çarpım açılımları.',
    keywords: [
      'üslü sayı hesaplama',
      'kuvvet alma hesaplama',
      'üslü ifadeler hesaplama',
      'negatif üs hesaplama',
      '2 üzeri hesaplama',
    ],
    faqs: [
      {
        question: 'Negatif bir üs nasıl hesaplanır?',
        answer:
          'a⁻ⁿ ifadesi 1 / aⁿ şeklinde kesre dönüştürülür. Örneğin 2⁻³ = 1 / 2³ = 1 / 8 = 0.125’tir.',
      },
      {
        question: 'Herhangi bir sayının sıfırıncı kuvveti kaça eşittir?',
        answer: 'Sıfır hariç tüm reel sayıların sıfırıncı kuvveti 1’e eşittir (a⁰ = 1). 0⁰ ise matematikte belirsizdir.',
      },
    ],
  },
  'karekok-hesaplama': {
    slug: 'karekok-hesaplama',
    name: 'Karekök Hesaplama',
    shortDesc: 'Karekök alma, kök dışına çıkarma (a√b) ve tam kare analizi.',
    category: 'temel',
    categoryName: 'Temel Matematik',
    icon: 'SquareDot',
    badge: 'Kök Dışına Çıkarma',
    color: 'from-cyan-500 to-blue-600',
    formula: '√x = y (y² = x)',
    seoTitle: 'Karekök Hesaplama Robotu | Kök Bulma ve Kök Dışına Çıkarma (a√b) - Matemetrik',
    seoDescription:
      'Bir sayının karekökünü anında hesaplayın. Tam kare olmayan sayıları a√b biçiminde en sade kök haline getirin.',
    keywords: [
      'karekök hesaplama',
      'kök alma',
      'kök dışına çıkarma',
      'a kök b hesaplama',
      'tam kare sayılar',
      'karekök bulma robotu',
    ],
    faqs: [
      {
        question: 'Kök dışına çıkarma (a√b) nasıl yapılır?',
        answer:
          'Kök içindeki sayı, biri tam kare olan iki sayının çarpımı şeklinde yazılır. Tam kare olan çarpan kök dışına karekökü olarak çıkarılır. Örneğin: √72 = √(36 × 2) = 6√2.',
      },
    ],
  },
  'ebob-ekok-hesaplama': {
    slug: 'ebob-ekok-hesaplama',
    name: 'EBOB & EKOK Hesaplama',
    shortDesc: 'İki veya üç sayının En Büyük Ortak Bölen ve En Küçük Ortak Katını bulun.',
    category: 'temel',
    categoryName: 'Temel Matematik',
    icon: 'Divide',
    badge: 'Asal Bölen Tablosu',
    color: 'from-purple-500 to-indigo-600',
    formula: 'EBOB(a,b) × EKOK(a,b) = a × b',
    seoTitle: 'EBOB EKOK Hesaplama Robotu | En Büyük Ortak Bölen ve En Küçük Ortak Kat - Matemetrik',
    seoDescription:
      'İki veya üç sayının EBOB ve EKOK değerlerini asal çarpanlar algoritması ve bölen listesi adımlarıyla anında hesaplayın.',
    keywords: [
      'ebob ekok hesaplama',
      'ebob hesaplama',
      'ekok hesaplama',
      'en büyük ortak bölen',
      'en küçük ortak kat',
      'asal çarpan algoritması',
    ],
    faqs: [
      {
        question: 'EBOB ve EKOK nasıl bulunur?',
        answer:
          'Sayılar yan yana yazılarak ortak asal bölen çizgisi çekilir. Her iki sayıyı da bölen asal sayılar işaretlenir. İşaretli asalların çarpımı EBOB’u; sütundaki tüm asal sayıların çarpımı ise EKOK’u verir.',
      },
    ],
  },
  'asal-sayi-hesaplama': {
    slug: 'asal-sayi-hesaplama',
    name: 'Asal Sayı Hesaplama & Testi',
    shortDesc: 'Sayının asal olup olmadığını kontrol edin, tüm bölenlerini ve aralıktaki asalları listeleyin.',
    category: 'temel',
    categoryName: 'Temel Matematik',
    icon: 'ShieldCheck',
    badge: 'Asallık Testi',
    color: 'from-emerald-500 to-green-600',
    formula: 'Yalnızca 1 ve kendisine bölünebilen sayılar (p > 1)',
    seoTitle: 'Asal Sayı Hesaplama ve Kontrol Robotu | Asal Sayı Bulucu - Matemetrik',
    seoDescription:
      'Girilen sayının asal sayı olup olmadığını anında öğrenin. Sayının pozitif tam bölenleri ve iki sayı arasındaki tüm asal sayılar listesi.',
    keywords: [
      'asal sayı hesaplama',
      'asal sayı testi',
      'sayı asal mı',
      'asal sayılar listesi',
      'pozitif bölenleri bulma',
    ],
    faqs: [
      {
        question: 'En küçük asal sayı kaçtır ve 1 asal mıdır?',
        answer:
          'En küçük asal sayı 2’dir ve aynı zamanda tek çift asal sayıdır. 1 sayısı yalnızca tek bir pozitif bölene (1) sahip olduğu için asal sayı kabul edilmez.',
      },
    ],
  },
  'faktoriyel-hesaplama': {
    slug: 'faktoriyel-hesaplama',
    name: 'Faktöriyel Hesaplama',
    shortDesc: 'n! faktöriyel değerini ve ardışık çarpım basamaklarını adım adım görüntüleyin.',
    category: 'cebir',
    categoryName: 'Cebir & Denklemler',
    icon: 'Binary',
    badge: 'Kombinatorik',
    color: 'from-violet-500 to-purple-600',
    formula: 'n! = n × (n-1) × (n-2) × ... × 1',
    seoTitle: 'Faktöriyel Hesaplama Robotu | n! Çarpım Basamakları ve Değer Bulma - Matemetrik',
    seoDescription:
      'Girilen n sayısının faktöriyelini (n!) hesaplayın. 0! = 1 kuralı, ardışık açılım basamakları ve kombinatorik açıklamalar.',
    keywords: [
      'faktöriyel hesaplama',
      'faktöriyel bulma',
      'n faktöriyel hesaplama',
      'sıfır faktöriyel kaç',
      'ardışık çarpım',
    ],
    faqs: [
      {
        question: '0 faktöriyel (0!) neden 1’e eşittir?',
        answer:
          'Matematikte kombinasyon ve permütasyon formüllerinin tutarlılığı ile n! = (n+1)! / (n+1) kuralı gereğince 0! = 1 olarak tanımlanmıştır.',
      },
    ],
  },
  'permutasyon-kombinasyon-hesaplama': {
    slug: 'permutasyon-kombinasyon-hesaplama',
    name: 'Permütasyon & Kombinasyon Hesaplama',
    shortDesc: 'P(n,r) sıralama ve C(n,r) seçim sayılarını formül adımlarıyla hesaplayın.',
    category: 'cebir',
    categoryName: 'Cebir & Denklemler',
    icon: 'Shuffle',
    badge: 'Sıralama & Seçme',
    color: 'from-pink-500 to-rose-600',
    formula: 'P(n,r) = n! / (n-r)!  |  C(n,r) = n! / (r! × (n-r)!)',
    seoTitle: 'Permütasyon ve Kombinasyon Hesaplama Robotu | P(n,r) ve C(n,r) - Matemetrik',
    seoDescription:
      'n elemanlı bir kümenin r’li permütasyon (sıralama) ve kombinasyon (seçim) değerlerini adım adım hesaplayıcı.',
    keywords: [
      'permütasyon hesaplama',
      'kombinasyon hesaplama',
      'p n r hesaplama',
      'c n r hesaplama',
      'kombinasyon formülü',
      'sıralama ve seçme',
    ],
    faqs: [
      {
        question: 'Permütasyon ile kombinasyon arasındaki fark nedir?',
        answer:
          'Permütasyonda sıralama ve diziliş önemlidir (Örn: bir sıraya oturma veya şifre oluşturma). Kombinasyonda ise yalnızca elemanların seçilmesi önemlidir, sıralama fark etmez (Örn: takım veya komite seçimi).',
      },
    ],
  },
  'olasilik-hesaplama': {
    slug: 'olasilik-hesaplama',
    name: 'Olasılık Hesaplama',
    shortDesc: 'Basit ve bileşik olayların gerçekleşme olasılığını kesir, ondalık ve yüzde olarak bulun.',
    category: 'cebir',
    categoryName: 'Cebir & Denklemler',
    icon: 'Dice5',
    badge: 'İstenen / Tüm Durumlar',
    color: 'from-indigo-500 to-blue-600',
    formula: 'P(A) = İstenen Durum Sayısı / Tüm Olası Durumların Sayısı',
    seoTitle: 'Olasılık Hesaplama Robotu | Basit Olayların Olasılığı Hesaplayıcı - Matemetrik',
    seoDescription:
      'İstenen olay sayısı ve tüm durum sayısını girerek teorik olasılık değerini yüzde, ondalık ve en sade kesir biçiminde hesaplayın.',
    keywords: [
      'olasılık hesaplama',
      'olayların olasılığı',
      'istenen durum bölü tüm durum',
      'zar atma olasılığı',
      'olasılık yüzdesi bulma',
    ],
    faqs: [
      {
        question: 'Olasılık değeri hangi aralıkta yer alır?',
        answer:
          'Bir olayın gerçekleşme olasılığı daima 0 ile 1 arasındadır (0 ≤ P(A) ≤ 1). 0 imkansız olayı, 1 ise kesin olayı temsil eder.',
      },
    ],
  },
  'denklem-cozucu': {
    slug: 'denklem-cozucu',
    name: 'Birinci Dereceden Denklem Çözücü',
    shortDesc: 'ax + b = c biçimindeki doğrusal denklemleri x’i yalnız bırakarak adım adım çözün.',
    category: 'cebir',
    categoryName: 'Cebir & Denklemler',
    icon: 'EqualNot',
    badge: 'Doğrusal Denklem',
    color: 'from-amber-500 to-yellow-600',
    formula: 'ax + b = c ⇒ x = (c - b) / a',
    seoTitle: '1. Dereceden Denklem Çözücü Robotu | x’i Bulma ve Adım Adım Çözüm - Matemetrik',
    seoDescription:
      'Birinci dereceden bir bilinmeyenli denklemleri çözün. Terimleri karşıya atma, işaret değiştirme ve x değerini adım adım bulma.',
    keywords: [
      'denklem çözme',
      'birinci dereceden denklem çözücü',
      'x bulma robotu',
      'doğrusal denklem çözümü',
      'matematik denklem çözme',
    ],
    faqs: [
      {
        question: 'Birinci dereceden denklem nasıl çözülür?',
        answer:
          'Bilinmeyenli terimler eşitliğin bir tarafında, sabit sayılar diğer tarafında toplanır. Terimler karşıya geçerken işaret değiştirir. Son olarak her iki taraf bilinmeyenin katsayısına bölünür.',
      },
    ],
  },
  'ikinci-dereceden-denklem-hesaplama': {
    slug: 'ikinci-dereceden-denklem-hesaplama',
    name: 'İkinci Dereceden Denklem Çözücü',
    shortDesc: 'ax² + bx + c = 0 denklemlerinde Diskriminant (Delta Δ) ve kökleri (x₁, x₂) bulun.',
    category: 'cebir',
    categoryName: 'Cebir & Denklemler',
    icon: 'FunctionSquare',
    badge: 'Delta (Δ) & Kökler',
    color: 'from-purple-500 to-rose-600',
    formula: 'Δ = b² - 4ac  |  x₁,₂ = (-b ± √Δ) / 2a',
    seoTitle: 'İkinci Dereceden Denklem Çözücü | Delta (Δ) ve Kök Hesaplama - Matemetrik',
    seoDescription:
      'ax² + bx + c = 0 denkleminin diskriminantı (delta) ve reel köklerini adım adım hesaplayıcı. Tepe noktası ve kökler toplamı analizi.',
    keywords: [
      'ikinci dereceden denklem çözücü',
      'delta hesaplama',
      'diskriminant hesaplama',
      'kök bulma robotu',
      'ax2 bx c 0 çözümü',
      'reel kökler',
    ],
    faqs: [
      {
        question: 'Delta (Δ) durumlarına göre kökler nasıl yorumlanır?',
        answer:
          'Δ > 0 ise denklemin iki farklı reel kökü vardır. Δ = 0 ise birbirine eşit (çift katlı) tek bir reel kök vardır. Δ < 0 ise reel sayılarda kök yoktur (karmaşık kök vardır).',
      },
    ],
  },
  'fonksiyon-hesaplama': {
    slug: 'fonksiyon-hesaplama',
    name: 'Fonksiyon Değer Hesaplama',
    shortDesc: 'f(x) fonksiyonunda x yerine değer koyarak f(a) sonucunu adım adım hesaplayın.',
    category: 'cebir',
    categoryName: 'Cebir & Denklemler',
    icon: 'Variable',
    badge: 'f(x) Değer Bulucu',
    color: 'from-blue-600 to-teal-600',
    formula: 'f(a) için fonksiyondaki her x yerine a yazılır',
    seoTitle: 'Fonksiyon Hesaplama Robotu | f(x) Değer Bulma ve Çözüm - Matemetrik',
    seoDescription:
      'Polinom ve doğrusal fonksiyonlarda x yerine verilen değeri koyarak f(a) sonucunu adım adım işlem adımlarıyla bulun.',
    keywords: [
      'fonksiyon hesaplama',
      'f x hesaplama',
      'fonksiyon değeri bulma',
      'fonksiyonda x yerine koyma',
      'matematik fonksiyonlar',
    ],
    faqs: [
      {
        question: 'Fonksiyonda f(a) değeri nasıl bulunur?',
        answer:
          'Fonksiyon kuralında görülen tüm "x" harflerinin yerine istenen "a" sayısı parantez içinde yazılır ve işlem önceliği (kuvvet, çarpma, toplama) takip edilir.',
      },
    ],
  },
  'ucgen-alan-hesaplama': {
    slug: 'ucgen-alan-hesaplama',
    name: 'Üçgen Alan Hesaplama',
    shortDesc: 'Taban-yükseklik, dik üçgen veya 3 kenar uzunluğuyla (Heron) üçgen alanını bulun.',
    category: 'geometri',
    categoryName: 'Geometri',
    icon: 'Triangle',
    badge: 'Heron & Taban-Yükseklik',
    color: 'from-emerald-500 to-teal-600',
    formula: 'Alan = (Taban × Yükseklik) / 2  veya  √(u(u-a)(u-b)(u-c))',
    seoTitle: 'Üçgen Alan Hesaplama Robotu | Dik Üçgen ve Heron Formülü - Matemetrik',
    seoDescription:
      'Taban ve yükseklik ile veya 3 kenar uzunluğu girerek (Heron formülü) üçgenin alanını adım adım hesaplayın.',
    keywords: [
      'üçgen alan hesaplama',
      'üçgenin alanı nasıl bulunur',
      'dik üçgen alan hesaplama',
      'heron formülü hesaplama',
      'kenarları bilinen üçgenin alanı',
    ],
    faqs: [
      {
        question: '3 kenarı bilinen üçgenin alanı (Heron Formülü) nasıl hesaplanır?',
        answer:
          'Önce yarı çevre u = (a+b+c)/2 hesaplanır. Ardından Alan = √(u × (u-a) × (u-b) × (u-c)) formülü uygulanır.',
      },
    ],
  },
  'daire-alan-cevre-hesaplama': {
    slug: 'daire-alan-cevre-hesaplama',
    name: 'Daire Alan ve Çevre Hesaplama',
    shortDesc: 'Yarıçap (r) veya çap (R) ile dairenin alanını, çevresini ve dilim alanını hesaplayın.',
    category: 'geometri',
    categoryName: 'Geometri',
    icon: 'Circle',
    badge: 'Alan πr² & Çevre 2πr',
    color: 'from-cyan-500 to-blue-600',
    formula: 'Alan = π × r²  |  Çevre = 2 × π × r',
    seoTitle: 'Daire Alan ve Çevre Hesaplama Robotu | Çember Çevresi Hesaplayıcı - Matemetrik',
    seoDescription:
      'Yarıçapı girilen dairenin alanını ve çemberin çevre uzunluğunu π sayısı ile adım adım hesaplayıcı.',
    keywords: [
      'daire alan hesaplama',
      'daire çevre hesaplama',
      'çemberin çevresi',
      'pi r kare formülü',
      'daire dilimi alanı',
    ],
    faqs: [
      {
        question: 'Dairenin alanı ile çemberin çevresi arasındaki fark nedir?',
        answer:
          'Çevre, çember çizgisinin toplam uzunluğudur (2πr). Alan ise dairenin düzlemde kapladığı iki boyutlu yüzey bölgesidir (πr²).',
      },
    ],
  },
  'pisagor-hipotenus-hesaplama': {
    slug: 'pisagor-hipotenus-hesaplama',
    name: 'Pisagor & Hipotenüs Hesaplama',
    shortDesc: 'a² + b² = c² Pisagor bağıntısı ile hipotenüs veya dik kenar uzunluğunu bulun.',
    category: 'geometri',
    categoryName: 'Geometri',
    icon: 'Spline',
    badge: 'Özel Dik Üçgenler',
    color: 'from-indigo-600 to-purple-600',
    formula: 'c² = a² + b² ⇒ c = √(a² + b²)',
    seoTitle: 'Pisagor ve Hipotenüs Hesaplama Robotu | a² + b² = c² Çözücü - Matemetrik',
    seoDescription:
      'Dik üçgende iki dik kenarı girerek hipotenüsü bulun veya bir dik kenar ile hipotenüsü girerek diğer dik kenarı hesaplayın. 3-4-5, 5-12-13 özel üçgen tespiti.',
    keywords: [
      'pisagor hesaplama',
      'hipotenüs hesaplama',
      'pisagor teoremi',
      'dik üçgen hipotenüs bulma',
      'özel üçgenler',
      'a2 b2 c2 hesaplama',
    ],
    faqs: [
      {
        question: 'Pisagor bağıntısı nedir?',
        answer:
          'Bir dik üçgende dik kenarların uzunluklarının kareleri toplamı, 90 derecelik açının karşısındaki en uzun kenar olan hipotenüsün karesine eşittir (a² + b² = c²).',
      },
      {
        question: 'En yaygın özel dik üçgenler hangileridir?',
        answer:
          '3-4-5, 5-12-13, 8-15-17 ve 7-24-25 üçgenleri ile bunların katları (örneğin 6-8-10) en çok karşılaşılan özel tam sayılı dik üçgenlerdir.',
      },
    ],
  },
  'ortalama-hesaplama': {
    slug: 'ortalama-hesaplama',
    name: 'Ortalama Hesaplama',
    shortDesc: 'Sayı dizisinin Aritmetik, Geometrik, Harmonik ortalamasını, medyan ve modunu bulun.',
    category: 'temel',
    categoryName: 'Temel Matematik',
    icon: 'BarChart2',
    badge: 'Aritmetik & Medyan',
    color: 'from-emerald-600 to-teal-700',
    formula: 'Aritmetik Ortalama = (x₁ + x₂ + ... + xₙ) / n',
    seoTitle: 'Ortalama Hesaplama Robotu | Aritmetik, Geometrik Ortalama ve Medyan - Matemetrik',
    seoDescription:
      'Girilen sayıların aritmetik ortalamasını, medyanını (ortanca), modunu (tepe değer) ve geometrik ortalamasını adım adım hesaplayın.',
    keywords: [
      'ortalama hesaplama',
      'aritmetik ortalama hesaplama',
      'geometrik ortalama',
      'medyan hesaplama',
      'mod bulma',
      'not ortalaması hesaplayıcı',
    ],
    faqs: [
      {
        question: 'Aritmetik ortalama ile medyan arasındaki fark nedir?',
        answer:
          'Aritmetik ortalama tüm verilerin toplanıp eleman sayısına bölünmesiyle bulunur. Medyan ise veriler küçükten büyüğe sıralandığında tam ortadaki değerdir; uç değerlerden (aşırı yüksek veya düşük puanlardan) etkilenmez.',
      },
    ],
  },
};

export const CALCULATOR_CATEGORIES = [
  { key: 'all', name: 'Tüm Araçlar' },
  { key: 'temel', name: 'Temel Matematik' },
  { key: 'cebir', name: 'Cebir & Denklemler' },
  { key: 'geometri', name: 'Geometri' },
  { key: 'finans', name: 'Finans & Günlük Hayat' },
] as const;
