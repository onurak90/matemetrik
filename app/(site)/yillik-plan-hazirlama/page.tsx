import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Calendar, FileSpreadsheet, Printer, Sparkles, CheckCircle2,
  ChevronRight, HelpCircle, School, Award, Layers, ShieldCheck,
  BookOpen, ArrowRight, Download, FileText
} from 'lucide-react';
import AnnualPlanMakerTool from '@/components/tools/AnnualPlanMakerTool';

export const metadata: Metadata = {
  title: '2026-2027 Yıllık Plan Hazırlama Robotu | MEB Maarif Modeli Excel & PDF İndir',
  description:
    'MEB 2026-2027 Türkiye Yüzyılı Maarif Modeli yeni müfredatına %100 uyumlu tüm ilkokul ve ortaokul dersleri için yıllık çerçeve plan hazırlama robotu. Okul ve öğretmen bilgilerinizi girin; Matematik, Türkçe, Fen, Sosyal yıllık planınızı tek tıkla Excel ve PDF formatında indirin.',
  keywords: [
    'yıllık plan hazırlama robotu',
    '2026 2027 yıllık planlar',
    'maarif modeli yıllık plan indir',
    'meb yıllık çerçeve plan',
    'matematik yıllık plan 2026',
    'türkçe yıllık plan meb',
    'fen bilimleri yıllık plan',
    'sosyal bilgiler yıllık plan',
    'ilkokul ortaokul yıllık plan hazırlama',
    'yıllık plan excel indir',
    'yıllık plan pdf oluşturucu',
    'türkiye yüzyılı maarif modeli planları',
  ],
  alternates: {
    canonical: 'https://www.matemetrik.com/yillik-plan-hazirlama',
  },
  openGraph: {
    title: '2026-2027 Yıllık Plan Hazırlama Robotu | MEB Maarif Modeli Excel & PDF İndir',
    description:
      'Öğretmenler için Türkiye Yüzyılı Maarif Modeli uyumlu yıllık plan hazırlama aracı. Tüm sınıf ve dersler tek ekranda; anında Excel ve PDF çıktısı alın.',
    url: 'https://www.matemetrik.com/yillik-plan-hazirlama',
    type: 'website',
    images: [
      {
        url: 'https://www.matemetrik.com/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Matemetrik 2026-2027 Yıllık Plan Hazırlama Robotu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026-2027 Yıllık Plan Hazırlama Robotu | MEB Maarif Modeli',
    description:
      'Tüm kademeler için MEB yeni maarif modeli uyumlu yıllık planlarınızı hazırlayın, tek tıkla Excel veya PDF olarak indirin.',
    images: ['https://www.matemetrik.com/og.jpg'],
  },
};

const annualPlanFaqs = [
  {
    question: 'Yıllık planlar 2026-2027 Türkiye Yüzyılı Maarif Modeli ile uyumlu mudur?',
    answer:
      'Evet. Sistemimizdeki tüm çerçeve yıllık planlar Millî Eğitim Bakanlığı (MEB) Talim ve Terbiye Kurulu Başkanlığı tarafından onaylanan en güncel Türkiye Yüzyılı Maarif Modeli öğretim programları esas alınarak hazırlanmıştır. Öğrenme çıktıları, süreç bileşenleri, sosyal-duygusal öğrenme becerileri ve okul temelli planlama haftaları eksiksiz yer almaktadır.',
  },
  {
    question: 'Excel (.xlsx) ve PDF çıktıları resmi imzaya ve teftişe uygun mudur?',
    answer:
      'Evet. Oluşturulan Excel ve PDF belgeleri; T.C. İl/İlçe Milli Eğitim Müdürlüğü anteti, Okul Adı, Dersi Okutan Öğretmen, Sınıf/Şube, Haftalık Ders Saati, Onay Tarihi, Yasal Dayanak metni ve Okul Müdürü Onay/İmza bloğunu resmi MEB standartlarında barındırır. Çıktıyı doğrudan yazdırıp imzalayarak idareye teslim edebilirsiniz.',
  },
  {
    question: 'Hangi derslerin ve sınıfların yıllık planları sistemde mevcuttur?',
    answer:
      'İlkokul ve ortaokul düzeyinde 1, 2, 3, 4, 5, 6, 7 ve 8. sınıflara ait Matematik, Türkçe, Fen Bilimleri, Sosyal Bilgiler, T.C. İnkılap Tarihi ve Atatürkçülük, İngilizce, Hayat Bilgisi, Beden Eğitimi ve Oyun/Spor, Bilişim Teknolojileri ve Yazılım, Müzik, Görsel Sanatlar, Teknoloji ve Tasarım, Almanca ve Çoklu Yabancı Dil dahil 70’in üzerinde ders çerçeve planı sistemde yer almaktadır.',
  },
  {
    question: 'Tablodaki haftalık konu veya kazanımları kendime göre düzenleyebilir miyim?',
    answer:
      'Kesinlikle. İnteraktif tablo editörü sayesinde dilediğiniz haftanın ünite, konu, kazanım, ölçme değerlendirme veya belirli gün ve haftalar hücresine tıklayarak okulunuzun ve zümrenizin kararlarına göre metinleri anında değiştirebilir, ardından düzenlenmiş halini Excel veya PDF olarak indirebilirsiniz.',
  },
  {
    question: 'Yıllık plan hazırlama robotu ücretli midir veya üyelik gerektirir mi?',
    answer:
      'Hayır. Matemetrik platformundaki tüm öğretmen araçları gibi Yıllık Plan Hazırlama Robotu da eğitimcilerimiz için %100 ücretsizdir. Hiçbir üyelik, kayıt veya giriş şartı aranmaz.',
  },
];

export default function YillikPlanHazirlamaPage() {
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Matemetrik 2026-2027 Yıllık Plan Hazırlama Robotu',
    url: 'https://www.matemetrik.com/yillik-plan-hazirlama',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description:
      'MEB 2026-2027 Türkiye Yüzyılı Maarif Modeli müfredatına %100 uyumlu tüm dersler için ücretsiz yıllık plan hazırlama robotu.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'TRY',
    },
    author: {
      '@type': 'Person',
      name: 'Cavenaghi',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ana Sayfa',
        item: 'https://www.matemetrik.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Öğretmen Araçları',
        item: 'https://www.matemetrik.com',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Yıllık Plan Hazırlama',
        item: 'https://www.matemetrik.com/yillik-plan-hazirlama',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: annualPlanFaqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="py-8 sm:py-12 pb-24 space-y-12 bg-slate-50/50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb Nav */}
          <nav aria-label="Breadcrumb" className="no-print">
            <ol className="flex items-center gap-1.5 text-xs text-slate-500">
              <li>
                <Link href="/" className="hover:text-indigo-600 transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </li>
              <li>
                <span className="text-slate-400">Öğretmen Araçları</span>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </li>
              <li>
                <span className="font-semibold text-slate-800">Yıllık Plan Hazırlama</span>
              </li>
            </ol>
          </nav>

          {/* Hero Section */}
          <header className="space-y-4 no-print">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-wide">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              2026-2027 MEB Maarif Modeli Yeni Müfredat Uyumlu
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Yıllık Plan Hazırlama Robotu{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                (Excel &amp; PDF)
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
              İlkokul ve ortaokul tüm kademeler için Türkiye Yüzyılı Maarif Modeli taslak çerçeve planları parmaklarınızın ucunda. Sınıfınızı ve dersinizi seçin, okul ve öğretmen bilgilerinizi ekleyin; resmi antetli yıllık planınızı tek tıkla <strong>Excel (.xlsx)</strong> ve <strong>resmi A4 PDF</strong> olarak indirin.
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-800">Excel (.xlsx) Çıktı</div>
                  <div className="text-slate-500">Düzenlenebilir format</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                  <Printer className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-800">Resmi A4 PDF</div>
                  <div className="text-slate-500">İmzaya hazır antet</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-800">70+ Ders Planı</div>
                  <div className="text-slate-500">1. - 8. Sınıf tüm dersler</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-800">%100 MEB Uyumlu</div>
                  <div className="text-slate-500">Güncel mevzuat dayanağı</div>
                </div>
              </div>
            </div>
          </header>

          {/* Interactive Tool Component */}
          <main>
            <AnnualPlanMakerTool />
          </main>

          {/* Educational SEO & Guide Section */}
          <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 no-print">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
                2026-2027 MEB Yıllık Plan Hazırlama Rehberi &amp; Maarif Modeli Yenilikleri
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Milli Eğitim Bakanlığı tarafından uygulamaya konulan <strong>Türkiye Yüzyılı Maarif Modeli</strong>, ders planlama süreçlerinde köklü yenilikler getirmiştir. Geleneksel konu bazlı planlamanın yerini; beceri temelli, süreç odaklı, değerler ve okuryazarlık bileşenleriyle harmanlanmış bütüncül bir yaklaşım almıştır. Matemetrik Yıllık Plan Robotu, öğretmenlerimizin mevzuata uygun evrak hazırlama yükünü saniyelere indirir.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h3 className="font-bold text-slate-900 text-base">Öğrenme Çıktıları &amp; Süreç Bileşenleri</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Yeni Maarif Modelinde klasik kazanım ifadeleri yerine öğrencinin yapabilirlik düzeyini gösteren öğrenme çıktıları ve bunların aşamalarını tanımlayan süreç bileşenleri yer alır.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h3 className="font-bold text-slate-900 text-base">Okul Temelli Planlama Haftaları</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Zümre öğretmenler kurulunca okul dışı öğrenme, araştırma, gözlem, sosyal sorumluluk ve yerel çalışmalar için ayrılan okul temelli planlama haftaları plana otomatik işlenmiştir.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h3 className="font-bold text-slate-900 text-base">Resmi Antet ve Yasal Dayanaklar</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  19.09.2022 tarih ve 58168473 sayılı MEB Eğitim Öğretim Çalışmalarının Planlı Yürütülmesine İlişkin Yönerge ile 2104 sayılı Tebliğler Dergisi yasal dayanakları eksiksiz yer alır.
                </p>
              </div>
            </div>

            {/* Related Tools Promotion */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-sm font-bold text-indigo-950">
                  Sosyal Kulüp Toplantı Tutanakları ve Evraklarını da Hazırlamak İster misiniz?
                </div>
                <div className="text-xs text-slate-600">
                  Kızılay, Afete Hazırlık, Çevre, Bilişim ve 20 farklı kulübün tüm yıllık evraklarını tek tıkla PDF olarak indirin.
                </div>
              </div>
              <Link
                href="/kulup-toplanti-tutanaklari"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shrink-0 transition-colors shadow-sm"
              >
                Kulüp Evrakları Robotu
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* FAQ Section */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                Sıkça Sorulan Sorular (SSS)
              </h3>
              <div className="divide-y divide-slate-100">
                {annualPlanFaqs.map((faq, i) => (
                  <div key={i} className="py-4 space-y-1.5">
                    <h4 className="text-sm font-bold text-slate-900">{faq.question}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
