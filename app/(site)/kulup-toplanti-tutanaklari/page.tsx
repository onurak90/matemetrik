import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Users, FileText, Printer, Sparkles, CheckCircle2,
  ChevronRight, HelpCircle, School, Award, Layers, ShieldCheck,
  BookOpen, ArrowRight, Shield
} from 'lucide-react';
import ClubDocumentsMakerTool from '@/components/tools/ClubDocumentsMakerTool';

export const metadata: Metadata = {
  title: '2026-2027 Kulüp Toplantı Tutanakları & Sosyal Kulüp Evrakları | PDF İndir',
  description:
    'MEB Sosyal Etkinlikler Yönetmeliğine %100 uygun 2026-2027 kulüp evrakları hazırlama robotu. Kızılay, Afete Hazırlık, Çevre, Bilişim, Zeka Oyunları, MUN ve 20 farklı kulüp için iç tüzük, toplantı tutanakları, yıllık çalışma planı ve faaliyet raporunu tek tıkla PDF olarak oluşturun ve indirin.',
  keywords: [
    'kulüp toplantı tutanakları',
    'sosyal kulüp evrakları indir',
    'meb kulüp yıllık planı',
    'kızılay kulübü evrakları',
    'afete hazırlık kulübü evrakları',
    'zeka oyunları kulübü evrakları',
    'çevre koruma kulübü evrakları',
    'bilişim kulübü evrakları',
    'mun kulübü evrakları',
    'kulüp tüzüğü indir',
    'sosyal etkinlik veli izin belgesi',
    '2026 2027 kulüp evrakları',
    'öğrenci kulübü toplantı tutanağı pdf',
  ],
  alternates: {
    canonical: 'https://www.matemetrik.com/kulup-toplanti-tutanaklari',
  },
  openGraph: {
    title: '2026-2027 Kulüp Toplantı Tutanakları & Sosyal Kulüp Evrakları Hazırlama',
    description:
      'Öğretmenler için 2026-2027 MEB sosyal kulüp evrakları hazırlama robotu. 20 branşta tüzük, tutanak, yıllık plan ve faaliyet raporunu tek tıkla resmi PDF olarak indirin.',
    url: 'https://www.matemetrik.com/kulup-toplanti-tutanaklari',
    type: 'website',
    images: [
      {
        url: 'https://www.matemetrik.com/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Matemetrik Kulüp Toplantı Tutanakları Robotu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026-2027 Kulüp Toplantı Tutanakları | MEB Sosyal Kulüp Evrakları',
    description:
      '20 farklı sosyal kulüp için toplantı tutanakları, iç tüzük ve yıllık planları tek tıkla PDF olarak indirin.',
    images: ['https://www.matemetrik.com/og.jpg'],
  },
};

const clubFaqs = [
  {
    question: 'Kulüp evrakları 2026-2027 MEB Sosyal Etkinlikler Yönetmeliğine uygun mudur?',
    answer:
      'Evet. Sistemimizdeki tüm evraklar Millî Eğitim Bakanlığı Eğitim Kurumları Sosyal Etkinlikler Yönetmeliği esas alınarak hazırlanmıştır. Kulüp iç tüzüğü, genel kurul toplantı tutanağı, yıllık çalışma programı, görevli öğrenci listesi, yıl sonu faaliyet raporu ve MEB Ek-5 veli izin belgesi eksiksiz yer almaktadır.',
  },
  {
    question: 'Hangi kulüplerin evrakları sistemde yer almaktadır?',
    answer:
      'Sistemimizde öğretmenlerimizin en çok görev aldığı 20 farklı kulüp mevcuttur: Kızılay, Afete Hazırlık, Çevre Koruma, Hayvanları Sevme ve Koruma, Halk Oyunları, Görsel Sanatlar, Gezi Tanıtma ve Turizm, Geri Dönüşüm ve Sıfır Atık, eTwinning, Drama, Çocuk Hakları, Demokrasi İnsan Hakları ve Yurttaşlık, Değerler, Bilişim ve İnternet, Bilinçli Tüketici, Bilim-Fen ve Teknoloji, Kütüphanecilik, Zeka Oyunları, MUN (Model Birleşmiş Milletler) ve Kişisel Verileri Koruma Kulübü.',
  },
  {
    question: 'Bir kulübün tüm evraklarını tek bir PDF dosyası olarak alabilir miyim?',
    answer:
      'Evet. "Tüm Evrakları PDF İndir / Yazdır" butonuna bastığınızda Kulüp İç Tüzüğü, 1. Dönem Toplantı Tutanağı, Yıllık Çalışma Planı, Kurul ve Öğrenci Listesi, Yıl Sonu Faaliyet Raporu ve Ek-5 Veli İzin Belgesi her biri ayrı bir A4 sayfasına denk gelecek şekilde sıralı ve imzaya hazır olarak tek seferde basılır.',
  },
  {
    question: 'Sosyal Etkinlik Modülü (e-Okul) veri girişlerinde kullanılabilir mi?',
    answer:
      'Evet. Yıllık plandaki faaliyetler ve öğrenci görev dağılımları e-Okul Sosyal Etkinlik Modülündeki standart kategori ve faaliyet kodlarıyla birebir uyumludur. Hazırladığınız evraklara dayanarak e-Okul sistemine öğrenci tanımlamalarını saniyeler içinde yapabilirsiniz.',
  },
  {
    question: 'Kulüp evrakları robotu ücretsiz midir?',
    answer:
      'Evet, Matemetrik platformundaki Kulüp Toplantı Tutanakları ve Evrakları Robotu tüm öğretmenlerimiz için tamamen ücretsizdir ve üyelik şartı yoktur.',
  },
];

export default function KulupToplantiTutanaklariPage() {
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Matemetrik 2026-2027 Kulüp Toplantı Tutanakları Robotu',
    url: 'https://www.matemetrik.com/kulup-toplanti-tutanaklari',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description:
      'MEB Sosyal Etkinlikler Yönetmeliğine %100 uygun 2026-2027 kulüp evrakları hazırlama robotu. 20 farklı kulüp için tüzük, toplantı tutanağı ve yıllık plan PDF indir.',
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
        name: 'Kulüp Toplantı Tutanakları',
        item: 'https://www.matemetrik.com/kulup-toplanti-tutanaklari',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: clubFaqs.map((f) => ({
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
                <span className="font-semibold text-slate-800">Kulüp Toplantı Tutanakları</span>
              </li>
            </ol>
          </nav>

          {/* Hero Section */}
          <header className="space-y-4 no-print">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-wide">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              2026-2027 Eğitim Öğretim Yılı MEB Sosyal Etkinlikler Yönetmeliği Uyumlu
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Kulüp Toplantı Tutanakları &amp;{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Sosyal Kulüp Dosyası Robotu
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
              Öğretmenlerimiz için 20 farklı sosyal kulübün <strong>İç Tüzüğü</strong>, <strong>Genel Kurul Toplantı Tutanakları</strong>, <strong>Yıllık Çalışma Planı</strong>, <strong>Görevli Öğrenci Listesi</strong>, <strong>Faaliyet Raporu</strong> ve <strong>Ek-5 Veli İzin Belgeleri</strong> tek ekranda. Bilgilerinizi girin, resmi antetli kulüp dosyanızı saniyeler içinde PDF olarak indirin.
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-800">20 Farklı Kulüp</div>
                  <div className="text-slate-500">Tüm branşlar hazır</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-800">Tam Kulüp Dosyası</div>
                  <div className="text-slate-500">6 resmi evrak tek tıkla</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Printer className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-800">Resmi A4 Çıktı</div>
                  <div className="text-slate-500">İmza ve mühürlü antet</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-800">%100 MEB Uyumlu</div>
                  <div className="text-slate-500">Yönetmeliğe tam uygun</div>
                </div>
              </div>
            </div>
          </header>

          {/* Interactive Tool Component */}
          <main>
            <ClubDocumentsMakerTool />
          </main>

          {/* Educational SEO & Guide Section */}
          <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 no-print">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
                MEB Sosyal Kulüp Dosyasında Bulunması Gereken Resmi Evraklar Nelerdir?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Milli Eğitim Bakanlığı İlköğretim ve Ortaöğretim Kurumları Sosyal Etkinlikler Yönetmeliği uyarınca her eğitim-öğretim yılı başında danışman öğretmenler tarafından bir <strong>Öğrenci Kulübü Dosyası</strong> hazırlanarak okul müdürlüğüne onaylatılır ve teftişlerde ibraz edilir. Dosyada bulunması zorunlu ana belgeler şunlardır:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h3 className="font-bold text-slate-900 text-base">Kulüp İç Tüzüğü &amp; İlkeler</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Kulübün adını, amaçlarını, kapsamını, çalışma esaslarını, yönetim ve denetim organlarının görev ve sorumluluklarını düzenleyen ana sözleşmedir.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h3 className="font-bold text-slate-900 text-base">Genel Kurul Toplantı Tutanakları</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  1. ve 2. Dönem başında yapılan toplantılarda divan seçimi, kulüp başkanı ve kurulların belirlenmesi ile alınan kararları içeren resmi tutanaktır.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h3 className="font-bold text-slate-900 text-base">Yıllık Çalışma Planı &amp; Rapor</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Eylül ayından Haziran ayına kadar ay ay gerçekleştirilecek pano çalışmaları, toplum hizmeti, anma günleri ve sene sonu faaliyet raporunu içerir.
                </p>
              </div>
            </div>

            {/* Cross-Link Promotion */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-sm font-bold text-indigo-950">
                  Ders Yıllık Çerçeve Planlarınızı da Hazırlamak İster misiniz?
                </div>
                <div className="text-xs text-slate-600">
                  2026-2027 Türkiye Yüzyılı Maarif Modeli uyumlu tüm derslerin yıllık planlarını Excel ve PDF olarak oluşturun.
                </div>
              </div>
              <Link
                href="/yillik-plan-hazirlama"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shrink-0 transition-colors shadow-sm"
              >
                Yıllık Plan Robotu
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
                {clubFaqs.map((faq, i) => (
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
