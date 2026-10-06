import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Calendar, FileText, Sparkles, CheckCircle2, ChevronRight,
  HelpCircle, School, Award, Layers, ShieldCheck, Download,
  BookOpen, BookmarkCheck, Clock, HeartHandshake, ArrowRight
} from 'lucide-react';
import DailyAndAnnualPlanRobot from '@/components/tools/DailyAndAnnualPlanRobot';

export const metadata: Metadata = {
  title: '2026-2027 MEB Yıllık ve Günlük Planlar | Sınıf Sınıf Hafta Hafta Defter Doldurma Robotu - Matemetrik',
  description:
    'MEB 2026-2027 Türkiye Yüzyılı Maarif Modeli yeni müfredatına %100 uyumlu tüm ilkokul ve ortaokul sınıfları için yıllık ve günlük plan hazırlama robotu. Hafta hafta günlük ders planı, sınıf defteri doldurma çizelgesi, İYEP ve rehberlik planlarını tek tıkla Word (.docx), Excel ve A4 PDF olarak indirin.',
  keywords: [
    'yıllık ve günlük planlar',
    'yıllık günlük planlar meb',
    'günlük plan hazırlama robotu',
    '1. sınıf günlük planları hafta hafta',
    '2. sınıf günlük planları',
    '3. sınıf günlük planları',
    '4. sınıf günlük planları',
    'sınıf defteri doldurma planı 2026',
    'maarif modeli günlük ders planı',
    'iyep kurs planları indir',
    'sınıf rehberlik yıllık planı',
    'meb ders işleme çizelgesi',
    'günlük plan word indir',
    'öğretmen ders planı robotu',
  ],
  alternates: {
    canonical: 'https://www.matemetrik.com/yillik-gunluk-planlar',
  },
  openGraph: {
    title: '2026-2027 MEB Yıllık ve Günlük Planlar & Defter Doldurma Robotu | Matemetrik',
    description:
      'Öğretmenler için Maarif Modeli uyumlu interaktif yıllık-günlük plan hazırlama ve sınıf defteri doldurma asistanı. 1-8. sınıf tüm dersler tek ekranda.',
    url: 'https://www.matemetrik.com/yillik-gunluk-planlar',
    type: 'website',
    images: [
      {
        url: 'https://www.matemetrik.com/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Matemetrik MEB Yıllık ve Günlük Plan Robotu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026-2027 MEB Yıllık ve Günlük Planlar | Matemetrik',
    description:
      'Tüm kademeler için MEB maarif modeli uyumlu haftalık günlük planlar ve sınıf defteri doldurma metinleri.',
    images: ['https://www.matemetrik.com/og.jpg'],
  },
};

const planFaqs = [
  {
    question: 'Günlük ders planı hazırlamak tüm öğretmenler için yasal olarak zorunlu mudur?',
    answer:
      'Millî Eğitim Bakanlığı Eğitim ve Öğretim Çalışmalarının Planlı Yürütülmesine İlişkin Yönerge uyarınca; öğretmenlerin derslerine hazırlıklı girmeleri esastır. Maarif Modeli ve güncel teftiş rehberlerine göre, zümre öğretmenlerince hazırlanan ünitelendirilmiş yıllık planların yanı sıra, dersin öğrenme çıktılarına, süreç bileşenlerine ve ölçme değerlendirme kriterlerine uygun haftalık/günlük ders işleniş akışının oluşturulması gerekmektedir. Robotumuz, müfettiş ve okul idaresi denetimlerine %100 uygun resmi MEB formatında çıktı üretir.',
  },
  {
    question: 'Sınıf defteri doldururken kazanım kodlarını yazmak şart mıdır?',
    answer:
      'Evet. MEB Okul Öncesi Eğitim ve İlköğretim Kurumları ile Ortaöğretim Kurumları Yönetmeliklerine göre sınıf defterine her ders saati sonunda o derste işlenen konunun ana başlığı ve müfredattaki öğrenme çıktısı (örn: T.D.1.1 veya MAT.3.1.2) açıkça yazılmalı ve dersi okutan öğretmen tarafından ıslak veya e-imza ile imzalanmalıdır. Sitemizdeki Sınıf Defteri Doldurma Asistanı, her gün ve saat için resmi metni tek tıkla kopyalamanızı sağlar.',
  },
  {
    question: 'Robot tarafından oluşturulan günlük ve yıllık planlar Word (.docx) olarak indirilebilir mi?',
    answer:
      'Evet. Sistemimizdeki tüm günlük planlar, sınıf defteri çizelgeleri, İYEP kurs planları ve rehberlik evrakları tek tıkla Microsoft Word (.docx) formatında indirilebilir. Böylece bilgisayarınızda okulunuza ve zümrenize göre dilediğiniz ekleme ve değişiklikleri kolayca yapabilirsiniz. Yıllık planlar ise formüllü ve hücre hizalı Excel (.xlsx) formatında teslim edilir.',
  },
  {
    question: '2026-2027 Türkiye Yüzyılı Maarif Modeli ile uyumluluk nasıl sağlanmıştır?',
    answer:
      'Planlarımız, Talim ve Terbiye Kurulu Başkanlığı tarafından onaylanan en güncel Türkiye Yüzyılı Maarif Modeli öğretim programları esas alınarak kodlanmıştır. Klasik kazanım ezberciliği yerine erdem-değer-eylem çerçevesi, kavramsal beceriler, eğilimler, sosyal-duygusal öğrenme becerileri, okul temelli planlama ve zenginleştirme-destekleme farklılaştırma adımları eksiksiz yer almaktadır.',
  },
  {
    question: 'İYEP ve Rehberlik planları hangi standartlara göre düzenlenmiştir?',
    answer:
      'İYEP (İlkokullarda Yetiştirme Programı) planları; 3. ve 4. sınıflar için Türkçe ve Matematik modül kazanımlarına ve 12 haftalık resmi uygulama takvimine göre tanzim edilmiştir. Sınıf Rehberlik Planları ise MEB Özel Eğitim ve Rehberlik Hizmetleri Genel Müdürlüğü (ÖRGM) 36 haftalık güncel çerçeve programına birebir uygundur.',
  },
];

export default function YillikGunlukPlanlarPage() {
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Matemetrik 2026-2027 MEB Yıllık ve Günlük Plan Robotu',
    url: 'https://www.matemetrik.com/yillik-gunluk-planlar',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description:
      '1-8. sınıf tüm dersler için MEB Türkiye Yüzyılı Maarif Modeli uyumlu yıllık ve günlük ders planları, sınıf defteri doldurma çizelgesi, İYEP ve rehberlik planları.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'TRY',
    },
    author: {
      '@type': 'Organization',
      name: 'Matemetrik Öğretmen Araçları Zümresi',
      url: 'https://www.matemetrik.com',
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
        item: 'https://www.matemetrik.com/ogretmen-araclari',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Yıllık ve Günlük Planlar',
        item: 'https://www.matemetrik.com/yillik-gunluk-planlar',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: planFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
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

      <div className="min-h-screen bg-slate-50/50 pb-20">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b border-slate-200 no-print print:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-xs text-slate-500">
              <Link href="/" className="hover:text-indigo-600 transition-colors">
                Ana Sayfa
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link href="/ogretmen-araclari" className="hover:text-indigo-600 transition-colors">
                Öğretmen Araçları
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 font-semibold">Yıllık &amp; Günlük Planlar</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 no-print print:hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.22),transparent_50%)] pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>MEB 2026-2027 Resmî Çalışma Takvimi &bull; 36 Hafta Plan Sistemi</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              MEB Yıllık &amp; Günlük Planlar ve{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Sınıf Defteri Doldurma Robotu
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl font-normal">
              1-8. sınıf tüm kademeler ve dersler için Türkiye Yüzyılı Maarif Modeli ile tam uyumlu haftalık günlük planlar oluşturun. Sınıf defterine yazılacak günlük kazanım metinlerini tek tıkla kopyalayın, A4 resmi PDF veya Word (.docx) olarak anında indirin.
            </p>

            <div className="flex flex-wrap gap-2 pt-2 text-xs">
              <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/10">✓ 1-8. Sınıf Tüm Branşlar</span>
              <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/10">✓ 36 Hafta Günlük Ders İşlenişi</span>
              <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/10">✓ Sınıf Defteri Kazanım Metinleri</span>
              <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/10">✓ Word (.docx) &amp; Excel Çıktısı</span>
              <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/10">✓ İYEP &amp; Rehberlik Planları</span>
            </div>
          </div>
        </section>

        {/* Main Interactive Robot Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <DailyAndAnnualPlanRobot />
        </main>

        {/* Informative Pedagogical SEO Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-12 no-print print:hidden">
          {/* 3 Pillars Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                1. Maarif Modeli Günlük Ders Planı
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Klasik plan şablonlarının ötesinde, Türkiye Yüzyılı Maarif Modeli’nin öngördüğü <strong>öğrenme çıktıları, kavramsal beceriler, erdem-değer-eylem çerçevesi</strong> ve <strong>zenginleştirme/destekleme farklılaştırma adımlarını</strong> eksiksiz içerir.
              </p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <BookmarkCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                2. Sınıf Defteri Doldurma Asistanı
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Öğretmenlerin her gün ders bitiminde yaşadığı <em>"Bugün deftere hangi kazanım yazılacak?"</em> karmaşasına son verir. Pazartesi’den Cuma’ya resmi kazanım kodları ve ders etkinlik özetleri tek tıkla panoya kopyalanabilir.
              </p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                3. İYEP &amp; Sınıf Rehberlik Desteği
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                3. ve 4. sınıflar için İlkokul Yetiştirme Programı (İYEP) modül planları ile MEB ÖRGM güncel müfredatına uygun 36 haftalık Sınıf Rehberlik Çalışma Planı tek çatı altında sunulur.
              </p>
            </div>
          </div>

          {/* Guide / How-To Banner */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-slate-800 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              2026-2027 Resmî Çalışma Takvimi ile %100 Senkronize
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
              Tüm planlarımız MEB Talim ve Terbiye Kurulu Başkanlığı’nın yayımladığı 2026-2027 iş günü takvimine göre tarihlendirilmiştir. 1. Dönem Ara Tatil (16-20 Kasım), 1. Ortak Yazılı Sınavlar (2-6 Kasım), Yarıyıl Tatili (25 Ocak-5 Şubat) ve 23 Nisan, 29 Ekim, 10 Kasım gibi belirli gün ve haftalar plana otomatik işlenmiştir.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold">
              <Link
                href="/yillik-plan-hazirlama"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
              >
                <span>Yıllık Plan Hazırlama Robotu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/ogretmen-araclari"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
              >
                <span>Tüm Öğretmen Araçlarını Gör</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* FAQ Accordion Section */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Sıkça Sorulan Sorular</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                MEB Yıllık ve Günlük Planlar Hakkında Merak Edilenler
              </h2>
            </div>

            <div className="divide-y divide-slate-100">
              {planFaqs.map((faq, idx) => (
                <div key={idx} className="py-4 space-y-2">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-extrabold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 pl-7 leading-relaxed font-normal">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
