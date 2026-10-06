// 2026-2027 MEB Resmi Çalışma Takvimi ve Plan Robotu Veri Altyapısı

export interface AcademicWeekInfo {
  weekNum: number;
  dates: string;
  month: string;
  period: '1. Dönem' | '2. Dönem';
  specialDays?: string;
  isExamWeek?: boolean;
  isHolidayWeek?: boolean;
}

export const ACADEMIC_WEEKS_2026_2027: AcademicWeekInfo[] = [
  // 1. DÖNEM
  { weekNum: 1, dates: '14 - 18 Eylül 2026', month: 'EYLÜL', period: '1. Dönem', specialDays: 'Eğitim-Öğretim Başlangıcı & İlköğretim Haftası' },
  { weekNum: 2, dates: '21 - 25 Eylül 2026', month: 'EYLÜL', period: '1. Dönem', specialDays: '15 Temmuz Demokrasi ve Millî Birlik Günü' },
  { weekNum: 3, dates: '28 Eylül - 02 Ekim 2026', month: 'EYLÜL-EKİM', period: '1. Dönem' },
  { weekNum: 4, dates: '05 - 09 Ekim 2026', month: 'EKİM', period: '1. Dönem', specialDays: 'Hayvanları Koruma Günü' },
  { weekNum: 5, dates: '12 - 16 Ekim 2026', month: 'EKİM', period: '1. Dönem', specialDays: 'Dünya Afet Azaltma Günü' },
  { weekNum: 6, dates: '19 - 23 Ekim 2026', month: 'EKİM', period: '1. Dönem', specialDays: 'Birleşmiş Milletler Günü' },
  { weekNum: 7, dates: '26 - 30 Ekim 2026', month: 'EKİM', period: '1. Dönem', specialDays: '29 Ekim Cumhuriyet Bayramı' },
  { weekNum: 8, dates: '02 - 06 Kasım 2026', month: 'KASIM', period: '1. Dönem', isExamWeek: true, specialDays: '1. Dönem 1. Ortak Yazılı Sınavlar & Kızılay Haftası' },
  { weekNum: 9, dates: '09 - 13 Kasım 2026', month: 'KASIM', period: '1. Dönem', specialDays: '10 Kasım Atatürk’ü Anma Günü ve Atatürk Haftası' },
  // (16 - 20 Kasım: 1. Dönem Ara Tatil)
  { weekNum: 10, dates: '23 - 27 Kasım 2026', month: 'KASIM', period: '1. Dönem', specialDays: '24 Kasım Öğretmenler Günü' },
  { weekNum: 11, dates: '30 Kasım - 04 Aralık 2026', month: 'KASIM-ARALIK', period: '1. Dönem', specialDays: '3 Aralık Dünya Engelliler Günü' },
  { weekNum: 12, dates: '07 - 11 Aralık 2026', month: 'ARALIK', period: '1. Dönem', specialDays: 'İnsan Hakları ve Demokrasi Haftası' },
  { weekNum: 13, dates: '14 - 18 Aralık 2026', month: 'ARALIK', period: '1. Dönem', specialDays: 'Tutum, Yatırım ve Türk Malları Haftası' },
  { weekNum: 14, dates: '21 - 25 Aralık 2026', month: 'ARALIK', period: '1. Dönem' },
  { weekNum: 15, dates: '28 Aralık 2026 - 01 Ocak 2027', month: 'ARALIK-OCAK', period: '1. Dönem', specialDays: '1 Ocak Yılbaşı Tatili' },
  { weekNum: 16, dates: '04 - 08 Ocak 2027', month: 'OCAK', period: '1. Dönem', isExamWeek: true, specialDays: '1. Dönem 2. Ortak Yazılı Sınavlar' },
  { weekNum: 17, dates: '11 - 15 Ocak 2027', month: 'OCAK', period: '1. Dönem', specialDays: 'Dönem Sonu Sosyal Etkinlikler Haftası' },
  { weekNum: 18, dates: '18 - 22 Ocak 2027', month: 'OCAK', period: '1. Dönem', isHolidayWeek: true, specialDays: '1. Dönem Sonu - 22 Ocak Karne Günü' },
  // (25 Ocak - 05 Şubat 2027: Yarıyıl Tatili)

  // 2. DÖNEM
  { weekNum: 19, dates: '08 - 12 Şubat 2027', month: 'ŞUBAT', period: '2. Dönem', specialDays: '2. Dönem Eğitim-Öğretim Başlangıcı' },
  { weekNum: 20, dates: '15 - 19 Şubat 2027', month: 'ŞUBAT', period: '2. Dönem' },
  { weekNum: 21, dates: '22 - 26 Şubat 2027', month: 'ŞUBAT', period: '2. Dönem', specialDays: 'Vergi Haftası' },
  { weekNum: 22, dates: '01 - 05 Mart 2027', month: 'MART', period: '2. Dönem', specialDays: 'Yeşilay Haftası & Girişimcilik Haftası' },
  { weekNum: 23, dates: '08 - 12 Mart 2027', month: 'MART', period: '2. Dönem', specialDays: '12 Mart İstiklâl Marşı’nın Kabulü ve M. Âkif Ersoy’u Anma' },
  { weekNum: 24, dates: '15 - 19 Mart 2027', month: 'MART', period: '2. Dönem', specialDays: '18 Mart Çanakkale Zaferi ve Şehitleri Anma Günü' },
  { weekNum: 25, dates: '22 - 26 Mart 2027', month: 'MART', period: '2. Dönem', specialDays: 'Orman Haftası & Dünya Su Günü' },
  { weekNum: 26, dates: '29 Mart - 02 Nisan 2027', month: 'MART-NİSAN', period: '2. Dönem', specialDays: 'Kütüphaneler Haftası' },
  // (05 - 09 Nisan 2027: 2. Dönem Ara Tatil)
  { weekNum: 27, dates: '12 - 16 Nisan 2027', month: 'NİSAN', period: '2. Dönem', isExamWeek: true, specialDays: '2. Dönem 1. Ortak Yazılı Sınavlar' },
  { weekNum: 28, dates: '19 - 23 Nisan 2027', month: 'NİSAN', period: '2. Dönem', specialDays: '23 Nisan Ulusal Egemenlik ve Çocuk Bayramı' },
  { weekNum: 29, dates: '26 - 30 Nisan 2027', month: 'NİSAN', period: '2. Dönem' },
  { weekNum: 30, dates: '03 - 07 Mayıs 2027', month: 'MAYIS', period: '2. Dönem', specialDays: 'Bilişim Haftası & Trafik ve İlkyardım Haftası' },
  { weekNum: 31, dates: '10 - 14 Mayıs 2027', month: 'MAYIS', period: '2. Dönem', specialDays: 'Engelliler Haftası & Anneler Günü' },
  { weekNum: 32, dates: '17 - 21 Mayıs 2027', month: 'MAYIS', period: '2. Dönem', specialDays: '19 Mayıs Atatürk’ü Anma, Gençlik ve Spor Bayramı' },
  { weekNum: 33, dates: '24 - 28 Mayıs 2027', month: 'MAYIS', period: '2. Dönem', isExamWeek: true, specialDays: '2. Dönem 2. Ortak Yazılı Sınavlar' },
  { weekNum: 34, dates: '31 Mayıs - 04 Haziran 2027', month: 'MAYIS-HAZİRAN', period: '2. Dönem', specialDays: 'Çevre Koruma Haftası' },
  { weekNum: 35, dates: '07 - 11 Haziran 2027', month: 'HAZİRAN', period: '2. Dönem', specialDays: 'Yıl Sonu Sosyal Etkinlikler ve Değerlendirme Haftası' },
  { weekNum: 36, dates: '14 - 18 Haziran 2027', month: 'HAZİRAN', period: '2. Dönem', isHolidayWeek: true, specialDays: 'Ders Yılı Sonu - 18 Haziran Karne Günü' },
];

export interface NormalizedWeek {
  weekNum: number;
  dates: string;
  month: string;
  hours: string;
  unit: string;
  topic: string;
  contentFramework?: string;
  keyConcepts?: string[];
  outcomes: string[];
  components: string[];
  assessment: string;
  values: string;
  specialDays: string;
}

export function groupPlanIntoWeeks(
  rawWeeks: any[],
  defaultHours: string = '4',
  dailyExtraWeeks: any[] = []
): NormalizedWeek[] {
  const map: { [key: number]: NormalizedWeek } = {};
  let currentWeekNum = 1;
  let currentMonth = 'EYLÜL';
  let currentDates = '14 - 18 Eylül 2026';

  for (const row of rawWeeks) {
    if (row.month && row.month.trim()) currentMonth = row.month.trim();
    if (row.week && row.week.trim()) {
      const match = row.week.match(/(\d+)\s*\.\s*Hafta/i);
      if (match) {
        currentWeekNum = parseInt(match[1], 10);
      }
    }

    const calWeek = ACADEMIC_WEEKS_2026_2027.find((w) => w.weekNum === currentWeekNum);
    if (calWeek) {
      currentDates = calWeek.dates;
    }

    if (!map[currentWeekNum]) {
      map[currentWeekNum] = {
        weekNum: currentWeekNum,
        dates: currentDates,
        month: currentMonth,
        hours: row.hours || defaultHours,
        unit: row.unit || '',
        topic: row.topic || '',
        outcomes: [],
        components: [],
        assessment: row.assessment || '',
        values: row.values || '',
        specialDays: row.specialDays || (calWeek?.specialDays || ''),
      };
    }

    const target = map[currentWeekNum];
    if (row.unit && !target.unit) target.unit = row.unit;
    if (row.topic && !target.topic) target.topic = row.topic;
    if (row.outcomes && row.outcomes.trim()) {
      const parts = row.outcomes.split('\n').map((s: string) => s.trim()).filter(Boolean);
      parts.forEach((p: string) => {
        if (!target.outcomes.includes(p)) target.outcomes.push(p);
      });
    }
    if (row.components && row.components.trim()) {
      const parts = row.components.split('\n').map((s: string) => s.trim()).filter(Boolean);
      parts.forEach((p: string) => {
        if (!target.components.includes(p)) target.components.push(p);
      });
    }
    if (row.assessment && !target.assessment) target.assessment = row.assessment;
    if (row.values && !target.values) target.values = row.values;
    if (row.specialDays && !target.specialDays) target.specialDays = row.specialDays;
  }

  // Merge extra daily plan weeks from KazanımCepte if available
  if (Array.isArray(dailyExtraWeeks) && dailyExtraWeeks.length > 0) {
    for (const ew of dailyExtraWeeks) {
      const idx = ew.weekIndex;
      if (idx && map[idx] && ew.extraction) {
        if (ew.extraction.key_concepts && Array.isArray(ew.extraction.key_concepts)) {
          map[idx].keyConcepts = ew.extraction.key_concepts;
        }
        if (ew.extraction.content_framework) {
          map[idx].contentFramework = ew.extraction.content_framework;
        }
        if (ew.extraction.learning_outcomes && Array.isArray(ew.extraction.learning_outcomes) && map[idx].outcomes.length === 0) {
          map[idx].outcomes = ew.extraction.learning_outcomes;
        }
        if (ew.extraction.process_skills && Array.isArray(ew.extraction.process_skills) && map[idx].components.length === 0) {
          map[idx].components = ew.extraction.process_skills;
        }
      }
    }
  }

  // Ensure 1..36 sequence exists
  const result: NormalizedWeek[] = [];
  for (let w = 1; w <= 36; w++) {
    if (map[w]) {
      result.push(map[w]);
    } else {
      const cal = ACADEMIC_WEEKS_2026_2027.find((x) => x.weekNum === w);
      result.push({
        weekNum: w,
        dates: cal?.dates || `${w}. Hafta`,
        month: cal?.month || '',
        hours: defaultHours,
        unit: 'Genel Değerlendirme ve Pekiştirme',
        topic: 'Konu Tekrarı ve Kazanım İzleme',
        outcomes: ['Öğrenilen kazanımların pekiştirilmesi ve izleme değerlendirmesi.'],
        components: ['Öğrenciler dönem boyunca edindikleri becerileri pekiştirir.'],
        assessment: 'İzleme testi, gözlem formu',
        values: 'Çalışkanlık, Sorumluluk',
        specialDays: cal?.specialDays || '',
      });
    }
  }

  return result;
}

// -------------------------------------------------------------
// Sınıf Defteri Doldurma Cümleleri Üretici (Defter Dolum Modülü)
// -------------------------------------------------------------
export interface DailyDefterEntry {
  dayName: 'Pazartesi' | 'Salı' | 'Çarşamba' | 'Perşembe' | 'Cuma';
  periodLabel: string;
  entryText: string;
}

export function generateWeeklyDefterEntries(
  subject: string,
  grade: number,
  week: NormalizedWeek
): DailyDefterEntry[] {
  const days: Array<'Pazartesi' | 'Salı' | 'Çarşamba' | 'Perşembe' | 'Cuma'> = [
    'Pazartesi',
    'Salı',
    'Çarşamba',
    'Perşembe',
    'Cuma',
  ];

  const outcomes = week.outcomes.length > 0 ? week.outcomes : [week.topic || 'Kazanım pekiştirme'];
  const components = week.components.length > 0 ? week.components : ['Etkinlik ve alıştırma yapıldı.'];

  // Map to 5 school days
  return days.map((day, idx) => {
    let outcomeRef = outcomes[idx % outcomes.length];
    // Clean outcome code if starts with code
    let code = '';
    const codeMatch = outcomeRef.match(/^([A-ZÇĞİÖŞÜ0-9\.]+)\s*[-:]?\s*(.*)$/);
    if (codeMatch) {
      code = codeMatch[1];
      outcomeRef = codeMatch[2] || outcomeRef;
    }

    let comp = components[idx % components.length] || 'Öğrenme etkinlikleri ve soru çözümleri yapıldı.';
    comp = comp.replace(/^[a-zçğıöşü]\)\s*/i, '').trim();

    let text = '';
    if (code) {
      text = `${code} - ${outcomeRef.slice(0, 75)}. ${comp.slice(0, 80)}.`;
    } else {
      text = `${week.topic || subject}: ${outcomeRef.slice(0, 80)}. ${comp.slice(0, 70)}.`;
    }

    if (week.specialDays && idx === 4) {
      text += ` (${week.specialDays.split('\n')[0]} anıldı.)`;
    }

    return {
      dayName: day,
      periodLabel: `${idx + 1}. Günlük Ders`,
      entryText: text,
    };
  });
}

// -------------------------------------------------------------
// MEB Resmi Günlük Ders Planı Metni Üretici
// -------------------------------------------------------------
export interface DailyPlanFullDocument {
  schoolName: string;
  teacherName: string;
  academicYear: string;
  grade: number;
  classBranch: string;
  subject: string;
  weekNum: number;
  dates: string;
  hours: string;
  unit: string;
  topic: string;
  contentFramework?: string;
  keyConcepts?: string[];
  outcomes: string[];
  components: string[];
  values: string;
  methods: string[];
  toolsMaterials: string[];
  specialDays: string;
  steps: {
    giris: string;
    kesfetme: string;
    derinlestirme: string;
    ozet: string;
  };
  assessment: string;
  homework: string;
}

export function buildOfficialDailyLessonPlan(params: {
  schoolName: string;
  teacherName: string;
  academicYear: string;
  grade: number;
  classBranch: string;
  subject: string;
  week: NormalizedWeek;
}): DailyPlanFullDocument {
  const { schoolName, teacherName, academicYear, grade, classBranch, subject, week } = params;

  // Determine methods according to subject
  const subLower = subject.toLowerCase();
  let methods = ['Soru-Cevap', 'Görselleştirme', 'Model Olma', 'İşbirlikli Öğrenme'];
  if (subLower.includes('türkçe')) {
    methods = ['Ses Temelli Cümle Yöntemi', 'Model Okuma', 'Güdümlü Konuşma', 'Görsel Okuma', 'Dikte Çalışması'];
  } else if (subLower.includes('matematik')) {
    methods = ['Somut Materyalle Modelleme', 'Problem Çözme', 'Keşfederek Öğrenme', 'Tümevarım', 'Oyunlaştırma'];
  } else if (subLower.includes('fen')) {
    methods = ['5E Öğrenme Modeli', 'Deney ve Gözlem', 'Soru-Cevap', 'Tümdengelim', 'Tahmin Et-Gözle-Açıkla'];
  } else if (subLower.includes('hayat') || subLower.includes('sosyal')) {
    methods = ['Örnek Olay İncelemesi', 'Beyin Fırtınası', 'Grup Tartışması', 'Rol Oynama', 'Gözlem'];
  } else if (subLower.includes('ingilizce') || subLower.includes('dil')) {
    methods = ['İletişimsel Yaklaşım (CLT)', 'Total Physical Response (TPR)', 'Rol Oynama', 'Kelime Oyunları'];
  }

  const toolsMaterials = [
    'MEB Ders Kitabı',
    'EBA (Eğitim Bilişim Ağı) Dijital İçerikleri',
    'Etkileşimli Akıllı Tahta',
    'Kazanım Kavrama Çalışma Kağıdı',
    'Somut Ders Materyalleri ve Görseller',
  ];

  const primaryTopic = week.topic || week.unit || subject;

  return {
    schoolName,
    teacherName,
    academicYear,
    grade,
    classBranch,
    subject,
    weekNum: week.weekNum,
    dates: week.dates,
    hours: week.hours,
    unit: week.unit || `${subject} Temel Öğrenme Alanı`,
    topic: primaryTopic,
    contentFramework: week.contentFramework,
    keyConcepts: week.keyConcepts,
    outcomes: week.outcomes.length > 0 ? week.outcomes : [`${primaryTopic} konusuna ait temel kazanımlar kavranır.`],
    components:
      week.components.length > 0
        ? week.components
        : ['Öğrenciler sürece aktif katılarak beceri ve bilgi düzeylerini sergiler.'],
    values: week.values || 'D3. Çalışkanlık, D14. Saygı, D16. Sorumluluk',
    methods,
    toolsMaterials,
    specialDays: week.specialDays || '',
    steps: {
      giris: `Derse "${primaryTopic}" ile ilgili ilgi çekici bir soru, görsel veya günlük hayat örneği sorularak başlanır. Öğrencilerin ön bilgileri yoklanır ve derse güdülenmeleri sağlanır. Günün hedef kazanımı ve yapılacak etkinlikler kısaca tanıtılır.`,
      kesfetme: `Öğrencilerle birlikte ders kitabındaki temel materyal ve EBA içerikleri incelenir. Öğretmen model olarak konunun ana hatlarını açıklar. Öğrenciler bireysel veya küçük gruplar halinde konuyu keşfedici alıştırmaları yürütür.`,
      derinlestirme: `Kazanımın kavranmasını pekiştirmek için farklı zorluk seviyelerinde çalışma kağıdı soruları ve problem çözme etkinlikleri uygulanır. Öğrencilerin takıldıkları noktalarda dönüt ve düzeltmeler anında verilir.`,
      ozet: `Dersin son 10 dakikasında gün boyunca öğrenilen anahtar kavramlar soru-cevap tekniğiyle toparlanır. Öğrencilerin kazanımı ne derece edindiği hızlı bir kontrol listesi/çıkış kartı ile kontrol edilir.`,
    },
    assessment:
      week.assessment ||
      'Ders içi gözlem formu, çalışma kağıdı değerlendirmesi, kontrol listesi ve açık uçlu soru-cevap.',
    homework: `Ders kitabında yer alan "${primaryTopic}" değerlendirme alıştırmalarının tamamlanması ve konunun evde pekiştirilmesi.`,
  };
}

// -------------------------------------------------------------
// Sınıf Rehberlik Planı (Özel Eğitim & Rehberlik MEB Standartları)
// -------------------------------------------------------------
export interface GuidancePlanItem {
  weekNum: number;
  dates: string;
  topic: string;
  aim: string;
  methods: string;
}

export const REHBERLIK_PLAN_36_HAFTA: GuidancePlanItem[] = [
  { weekNum: 1, dates: '14 - 18 Eylül', topic: 'Okula Uyum ve Tanışma', aim: 'Sınıf içi güven ortamını oluşturma ve arkadaşları tanıma', methods: 'Tanışma oyunu, çember etkinliği' },
  { weekNum: 2, dates: '21 - 25 Eylül', topic: 'Sınıf Kurallarını Belirleme', aim: 'Demokratik bir biçimde sınıf yaşam kurallarını oluşturma', methods: 'Beyin fırtınası, afiş hazırlama' },
  { weekNum: 3, dates: '28 Eylül - 02 Ekim', topic: 'Hak ve Sorumluluklarım', aim: 'Okulda ve evde sahip olunan sorumlulukları fark etme', methods: 'Örnek olay incelemesi' },
  { weekNum: 4, dates: '05 - 09 Ekim', topic: 'Etkili Dinleme Becerisi', aim: 'İletişimde karşısındakini dikkatle dinleme kuralını benimseme', methods: 'Rol oynama, drama' },
  { weekNum: 5, dates: '12 - 16 Ekim', topic: 'Arkadaşlık ve Paylaşma', aim: 'Sağlıklı arkadaşlık bağları kurabilme ve yardımlaşma', methods: 'Hikâye tamamlama' },
  { weekNum: 6, dates: '19 - 23 Ekim', topic: 'Duygularımı Tanıyorum', aim: 'Temel duyguları (sevinç, öfke, üzüntü, korku) ayırt etme', methods: 'Duygu kartları' },
  { weekNum: 7, dates: '26 - 30 Ekim', topic: 'Cumhuriyet ve Birlik Bilinci', aim: 'Milli değerlere saygı ve birlikte yaşama kültürü', methods: 'Grup sohbeti' },
  { weekNum: 8, dates: '02 - 06 Kasım', topic: 'Sınav Kaygısıyla Başa Çıkma', aim: 'Sınav döneminde stres ve heyecanı doğru yönetme', methods: 'Gevşeme egzersizi' },
  { weekNum: 9, dates: '09 - 13 Kasım', topic: 'Atatürk’ün Eğitime Verdiği Değer', aim: 'Bilimsel düşünme ve vatan sevgisi kazanma', methods: 'Belgesel izleme ve tartışma' },
  { weekNum: 10, dates: '23 - 27 Kasım', topic: 'Öğretmene Saygı ve Nezaket', aim: 'Okul çalışanlarına karşı nezaket dilini kullanma', methods: 'Mektup yazma etkinliği' },
  { weekNum: 11, dates: '30 Kasım - 04 Aralık', topic: 'Bireysel Farklılıklara Saygı', aim: 'Özel gereksinimli bireylerin haklarına saygı gösterme', methods: 'Empati parkuru' },
  { weekNum: 12, dates: '07 - 11 Aralık', topic: 'İnsan Hakları ve Eşitlik', aim: 'Her insanın değerli ve eşit olduğunu kavrama', methods: 'Afiş ve slogan bulma' },
  { weekNum: 13, dates: '14 - 18 Aralık', topic: 'Tutumlu Yaşam ve Tüketici Bilinci', aim: 'Kaynakları israf etmeden bilinçli kullanma', methods: 'Kumbaram etkinliği' },
  { weekNum: 14, dates: '21 - 25 Aralık', topic: 'Akran Zorbalığına Dur De', aim: 'Zorbalık türlerini tanıma ve "hayır" diyebilme', methods: 'Vaka analizi' },
  { weekNum: 15, dates: '28 Aralık - 01 Ocak', topic: 'Zamanı Doğru Planlama', aim: 'Ders, oyun ve dinlenme sürelerini dengeleme', methods: 'Haftalık program tablosu' },
  { weekNum: 16, dates: '04 - 08 Ocak', topic: 'Başarı ve Hedef Belirleme', aim: 'Kendine gerçekçi akademik hedefler koyabilme', methods: 'Hedef ağacı çizimi' },
  { weekNum: 17, dates: '11 - 15 Ocak', topic: '1. Dönem Öz Değerlendirmesi', aim: 'Güçlü yönlerini ve geliştirilmesi gerekenleri fark etme', methods: 'Öz değerlendirme formu' },
  { weekNum: 18, dates: '18 - 22 Ocak', topic: 'Verimli Yarıyıl Tatili Rehberi', aim: 'Tatili dinlenerek ve kitap okuyarak değerlendirme', methods: 'Tatil sözleşmesi' },
  { weekNum: 19, dates: '08 - 12 Şubat', topic: '2. Döneme Hazırlık ve Motivasyon', aim: 'Yeni döneme taze hedeflerle başlama kararlılığı', methods: 'Sınıf motivasyon çemberi' },
  { weekNum: 20, dates: '15 - 19 Şubat', topic: 'Problem Çözme Basamakları', aim: 'Karşılaştığı günlük sorunlara akılcı çözümler üretme', methods: '6 şapkalı düşünme tekniği' },
  { weekNum: 21, dates: '22 - 26 Şubat', topic: 'Toplumsal Kurallar ve Vergi Bilinci', aim: 'Toplum yararına olan sorumlulukları anlama', methods: 'Tartışma' },
  { weekNum: 22, dates: '01 - 05 Mart', topic: 'Bağımlılıklardan Korunma (Yeşilay)', aim: 'Zararlı alışkanlıklara ve ekran bağımlılığına karşı bilinç', methods: 'Soru-cevap ve video' },
  { weekNum: 23, dates: '08 - 12 Mart', topic: 'Milli Marşımız ve Bağımsızlık', aim: 'Milli marşımızın değerini ve şairini anlama', methods: 'Şiir analizi' },
  { weekNum: 24, dates: '15 - 19 Mart', topic: 'Çanakkale Ruhu ve Vatan Sevgisi', aim: 'Şehitlerimize minnet ve birlik ruhu', methods: 'Anı dinletisi' },
  { weekNum: 25, dates: '22 - 26 Mart', topic: 'Doğayı ve Ormanları Koruma', aim: 'Çevre bilinci ve fidan dikme sevgisi', methods: 'Doğa günlüğü' },
  { weekNum: 26, dates: '29 Mart - 02 Nisan', topic: 'Kitap Okuma Alışkanlığı', aim: 'Okuma kültürünü hayat tarzı haline getirme', methods: 'Kitap tanıtım çemberi' },
  { weekNum: 27, dates: '12 - 16 Nisan', topic: 'Dikkat ve Odaklanma Teknikleri', aim: 'Ders esnasında dikkat dağıtıcıları engelleme', methods: 'Dikkat oyunları' },
  { weekNum: 28, dates: '19 - 23 Nisan', topic: 'Çocuk Hakları ve Dünya Barışı', aim: '23 Nisan ruhu ile çocuk haklarını savunma', methods: 'Resim ve kompozisyon' },
  { weekNum: 29, dates: '26 - 30 Nisan', topic: 'Kişisel Sınırlar ve Beden Güvenliği', aim: 'İyi dokunuş - kötü dokunuş ayrımı ve yardım isteme', methods: 'Güvenlik çemberi' },
  { weekNum: 30, dates: '03 - 07 Mayıs', topic: 'Trafik Kurallarına Uyum', aim: 'Yaya ve yolcu olarak güvenli trafik davranışı sergileme', methods: 'Trafik simülasyonu' },
  { weekNum: 31, dates: '10 - 14 Mayıs', topic: 'Engelleri Kaldıralım', aim: 'Engelli bireylerin hayatını kolaylaştırıcı empati', methods: 'Engelsiz dünya projesi' },
  { weekNum: 32, dates: '17 - 21 Mayıs', topic: 'Gençlik, Spor ve Sağlıklı Yaşam', aim: 'Düzenli sporun fiziksel ve zihinsel faydalarını kavrama', methods: 'Spor sohbeti' },
  { weekNum: 33, dates: '24 - 28 Mayıs', topic: 'Yıl Sonu Sınav Stratejileri', aim: 'Sınav öncesi ve anı doğru stratejiler geliştirme', methods: 'İpuçları listesi' },
  { weekNum: 34, dates: '31 Mayıs - 04 Haziran', topic: 'Sıfır Atık ve Geri Dönüşüm', aim: 'Plastik ve kağıt atıkların ayrıştırılması bilinci', methods: 'Atölye çalışması' },
  { weekNum: 35, dates: '07 - 11 Haziran', topic: 'Yıl Sonu Veda ve Başarı Kutlaması', aim: 'Birlikte geçirilen bir yılın kazanımlarını kutlama', methods: 'Teşekkür mektupları' },
  { weekNum: 36, dates: '14 - 18 Haziran', topic: 'Yaz Tatili Planı ve Gelecek Yıl', aim: 'Yeni sınıf düzeyine zihnen hazırlanma ve yaz tatili', methods: 'Gelecek hedefleri panosu' },
];

// -------------------------------------------------------------
// İYEP (İlkokullarda Yetiştirme Programı) Planları
// -------------------------------------------------------------
export interface IyepModulePlan {
  moduleCode: string;
  moduleName: string;
  subject: string;
  hours: number;
  outcomes: string[];
  activities: string;
}

export const IYEP_CATALOG: IyepModulePlan[] = [
  {
    moduleCode: 'İYEP-T1',
    subject: 'Türkçe',
    moduleName: 'Modül 1: Dinleme ve Konuşma Becerileri',
    hours: 20,
    outcomes: [
      'T.1.1. Dinlediği sesin kaynağını tahmin eder.',
      'T.1.2. Dinledikleriyle ilgili basit sorulara cevap verir.',
      'T.1.3. Kelimeleri anlaşılır bir telaffuzla söyler.',
    ],
    activities: 'Ses kartları, dinleme tekerlemeleri, görsel kartlardan hikaye kurma.',
  },
  {
    moduleCode: 'İYEP-T2',
    subject: 'Türkçe',
    moduleName: 'Modül 2: İlk Okuma ve Yazma Becerileri',
    hours: 40,
    outcomes: [
      'T.2.1. Seslere karşılık gelen harfleri tanır ve seslendirir.',
      'T.2.2. Hece ve basit kelimeleri birleştirerek okur.',
      'T.2.3. Harfleri temel formuna uygun olarak yazar.',
    ],
    activities: 'Hece tablosu çalışmaları, kelime tombalası, dikte alıştırmaları.',
  },
  {
    moduleCode: 'İYEP-T3',
    subject: 'Türkçe',
    moduleName: 'Modül 3: Okuduğunu Anlama ve Metin Çözümleme',
    hours: 30,
    outcomes: [
      'T.3.1. Kısa metinleri akıcı ve noktalama işaretlerine uygun okur.',
      'T.3.2. Metindeki 5N1K sorularını doğru yanıtlar.',
      'T.3.3. Metnin ana fikrini ve konusunu belirler.',
    ],
    activities: 'Paragraf okuma kartları, anlama soruları, hikaye haritası doldurma.',
  },
  {
    moduleCode: 'İYEP-M1',
    subject: 'Matematik',
    moduleName: 'Modül 1: Doğal Sayılar ve Basamak Kavramı',
    hours: 25,
    outcomes: [
      'M.1.1. 100’e kadar olan doğal sayıları ileriye/geriye ritmik sayar.',
      'M.1.2. İki basamaklı sayıların onluk ve birliklerini modeller.',
      'M.1.3. Sayı örüntülerini fark eder ve devam ettirir.',
    ],
    activities: 'Onluk taban blokları, sayı doğrusu, abaküs alıştırmaları.',
  },
  {
    moduleCode: 'İYEP-M2',
    subject: 'Matematik',
    moduleName: 'Modül 2: Toplama ve Çıkarma İşlemleri',
    hours: 35,
    outcomes: [
      'M.2.1. Eldeli toplama işlemini basamak mantığıyla yapar.',
      'M.2.2. Onluk bozmayı gerektiren çıkarma işlemini modeller.',
      'M.2.3. Toplama ve çıkarma ile ilgili tek işlemli günlük hayat problemlerini çözer.',
    ],
    activities: 'Para modelleri, problem kartları, somut nesnelerle işlem yapma.',
  },
  {
    moduleCode: 'İYEP-M3',
    subject: 'Matematik',
    moduleName: 'Modül 3: Çarpma, Bölme ve Temel Ölçmeler',
    hours: 30,
    outcomes: [
      'M.3.1. Çarpmanın ardışık toplama anlamını kavrar ve çarpım tablosunu ezberler.',
      'M.3.2. Eşit paylaştırma ve bölme işlemini yapar.',
      'M.3.3. Yarım, çeyrek ve bütün kesir ilişkisini modeller.',
    ],
    activities: 'Çarpım tablosu çarkı, kesir takımı, paylaştırma oyunları.',
  },
];

// -------------------------------------------------------------
// mebders.com Tarzı Kapsamlı Arşiv & İndirme Kataloğu
// -------------------------------------------------------------
export interface PlanArchiveItem {
  id: string;
  title: string;
  grade: number;
  gradeLabel: string;
  subject: string;
  planType: 'gunluk' | 'yillik' | 'defter' | 'iyep' | 'rehberlik';
  planTypeLabel: string;
  weekNum?: number;
  dates?: string;
  format: 'Word' | 'Excel' | 'PDF';
  size: string;
  downloads: number;
}

export function generatePlanArchiveCatalog(): PlanArchiveItem[] {
  const items: PlanArchiveItem[] = [];

  // 1. Sınıf - 4. Sınıf Günlük Planlar (Tüm Haftalar)
  const primaryGrades = [1, 2, 3, 4];
  const primarySubjects: { [key: number]: string[] } = {
    1: ['Türkçe', 'Matematik', 'Hayat Bilgisi', 'Müzik', 'Görsel Sanatlar', 'Beden Eğitimi ve Oyun'],
    2: ['Türkçe', 'Matematik', 'Hayat Bilgisi', 'İngilizce', 'Müzik', 'Görsel Sanatlar'],
    3: ['Türkçe', 'Matematik', 'Fen Bilimleri', 'Hayat Bilgisi', 'İngilizce', 'Müzik'],
    4: ['Türkçe', 'Matematik', 'Fen Bilimleri', 'Sosyal Bilgiler', 'İngilizce', 'Din Kültürü'],
  };

  primaryGrades.forEach((g) => {
    // Yıllık Planlar
    (primarySubjects[g] || []).forEach((sub, sIdx) => {
      items.push({
        id: `yillik-${g}-${sub.toLowerCase().replace(/\s+/g, '-')}`,
        title: `2026-2027 ${g}. Sınıf ${sub} Dersi Maarif Modeli Yıllık Çerçeve Planı`,
        grade: g,
        gradeLabel: `${g}. Sınıf`,
        subject: sub,
        planType: 'yillik',
        planTypeLabel: 'Yıllık Plan',
        format: 'Excel',
        size: '0.24 MB',
        downloads: 8400 + (g * 1100) + (sIdx * 450),
      });
    });

    // 1. Sınıf Özel: İlk Okuma Yazma Ses Veriliş Planı
    if (g === 1) {
      items.push({
        id: 'yillik-1-okuma-yazma-ses-verilis',
        title: '2026-2027 1. Sınıf İlk Okuma Yazma Öğretimi Ses Veriliş ve Harf Grupları Planı',
        grade: 1,
        gradeLabel: '1. Sınıf',
        subject: 'Türkçe',
        planType: 'yillik',
        planTypeLabel: 'Yıllık Plan',
        format: 'Word',
        size: '0.19 MB',
        downloads: 14200,
      });
    }

    // Günlük Planlar (36 Hafta)
    ACADEMIC_WEEKS_2026_2027.forEach((w) => {
      items.push({
        id: `gunluk-${g}-hafta-${w.weekNum}`,
        title: `2026-2027 Eğitim Öğretim Yılı ${g}. Sınıf Günlük Ders Planları ${w.weekNum}. Hafta`,
        grade: g,
        gradeLabel: `${g}. Sınıf`,
        subject: 'Tüm Dersler',
        planType: 'gunluk',
        planTypeLabel: 'Günlük Plan',
        weekNum: w.weekNum,
        dates: w.dates,
        format: 'Word',
        size: '0.18 MB',
        downloads: 2400 + (36 - w.weekNum) * 120,
      });

      // Defter Dolum Çizelgesi
      items.push({
        id: `defter-${g}-hafta-${w.weekNum}`,
        title: `${g}. Sınıf ${w.dates} Haftalık Ders İşleme ve Sınıf Defteri Doldurma Çizelgesi`,
        grade: g,
        gradeLabel: `${g}. Sınıf`,
        subject: 'Tüm Dersler',
        planType: 'defter',
        planTypeLabel: 'Defter Dolum',
        weekNum: w.weekNum,
        dates: w.dates,
        format: 'Word',
        size: '0.14 MB',
        downloads: 3100 + (36 - w.weekNum) * 150,
      });
    });
  });

  // Ortaokul (5-8. Sınıf) Branş Planları
  const middleGrades = [5, 6, 7, 8];
  const middleSubjects = ['Matematik', 'Türkçe', 'Fen Bilimleri', 'Sosyal Bilgiler', 'İngilizce'];
  middleGrades.forEach((g) => {
    middleSubjects.forEach((sub, sIdx) => {
      items.push({
        id: `yillik-${g}-${sub.toLowerCase().replace(/\s+/g, '-')}`,
        title: `2026-2027 ${g}. Sınıf ${sub} Dersi Maarif Modeli Yıllık Planı`,
        grade: g,
        gradeLabel: `${g}. Sınıf`,
        subject: sub,
        planType: 'yillik',
        planTypeLabel: 'Yıllık Plan',
        format: 'Excel',
        size: '0.22 MB',
        downloads: 5400 + (g * 800) + (sIdx * 320),
      });

      // Sample key weekly lesson plans for middle school
      [1, 2, 7, 8, 9, 10, 16, 23, 24, 28].forEach((wNum) => {
        const cal = ACADEMIC_WEEKS_2026_2027.find((x) => x.weekNum === wNum);
        items.push({
          id: `gunluk-${g}-${sub.toLowerCase().replace(/\s+/g, '-')}-hafta-${wNum}`,
          title: `2026-2027 ${g}. Sınıf ${sub} Dersi ${wNum}. Hafta Günlük Ders Planı`,
          grade: g,
          gradeLabel: `${g}. Sınıf`,
          subject: sub,
          planType: 'gunluk',
          planTypeLabel: 'Günlük Plan',
          weekNum: wNum,
          dates: cal?.dates,
          format: 'Word',
          size: '0.16 MB',
          downloads: 1800 + (wNum * 60),
        });
      });
    });
  });

  // İYEP Kurs Planları
  IYEP_CATALOG.forEach((mod) => {
    items.push({
      id: `iyep-${mod.moduleCode.toLowerCase()}`,
      title: `2026-2027 İYEP (${mod.subject}) ${mod.moduleName} Kurs ve Çalışma Planı`,
      grade: 3,
      gradeLabel: '3. & 4. Sınıf',
      subject: mod.subject,
      planType: 'iyep',
      planTypeLabel: 'İYEP Kurs Planı',
      format: 'Word',
      size: '0.21 MB',
      downloads: 9850,
    });
  });

  // Sınıf Rehberlik Yıllık Planları
  [1, 2, 3, 4, 5, 6, 7, 8].forEach((g) => {
    items.push({
      id: `rehberlik-${g}-sinif`,
      title: `2026-2027 ${g}. Sınıf Sınıf Rehberlik Yıllık Çalışma Planı (MEB ÖRGM Uyumlu)`,
      grade: g,
      gradeLabel: `${g}. Sınıf`,
      subject: 'Rehberlik',
      planType: 'rehberlik',
      planTypeLabel: 'Rehberlik Planı',
      format: 'Word',
      size: '0.26 MB',
      downloads: 11200 + (g * 400),
    });
  });

  return items;
}

