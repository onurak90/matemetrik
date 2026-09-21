import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Calculator, GraduationCap, Award, BookOpen, Sparkles, CheckCircle2,
  ChevronRight, HelpCircle, School, Layers, ShieldCheck,
  TrendingUp, Percent, Trophy, Calendar, Users, FileText
} from 'lucide-react';
import ScoreCalculatorTool from '@/components/tools/ScoreCalculatorTool';

export const metadata: Metadata = {
  title: '2026-2027 LGS & YKS Puan Hesaplama Robotu | TYT, AYT, LGS Net ve Sıralama - Matemetrik',
  description:
    '2026-2027 güncel ÖSYM ve MEB katsayılarıyla LGS ve YKS (TYT, AYT Sayısal, Eşit Ağırlık, Sözel, YDT) puan ve tahmini yüzdelik dilim hesaplama robotu. OBP, kırık OBP ve hedef lise/üniversite başarı analizi tek ekranda.',
  keywords: [
    'lgs puan hesaplama',
    'yks puan hesaplama',
    'tyt puan hesaplama',
    'ayt puan hesaplama',
    'lgs net hesaplama',
    'yks net hesaplama',
    'obp hesaplama',
    'kırık obp hesaplama',
    'lgs yüzdelik dilim hesaplama',
    '2026 lgs puan hesaplama robotu',
    '2026 yks puan hesaplama robotu',
    'ayt sayısal puan hesaplama',
    'ayt eşit ağırlık puan hesaplama',
    'ayt sözel puan hesaplama',
    'ydt dil puan hesaplama',
    'öğretmen rehberlik araçları',
    'lgs tercih robotu',
  ],
  alternates: {
    canonical: 'https://www.matemetrik.com/puan-hesaplama-robotu',
  },
  openGraph: {
    title: '2026-2027 LGS & YKS Puan Hesaplama Robotu | Matemetrik',
    description:
      'MEB ve ÖSYM güncel verileriyle hazırlanmış en hassas LGS ve YKS (TYT-AYT-YDT) net ve puan hesaplama motoru. Diploma notu, OBP, kırık OBP ve hedef analizi.',
    url: 'https://www.matemetrik.com/puan-hesaplama-robotu',
    type: 'website',
    images: [
      {
        url: 'https://www.matemetrik.com/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Matemetrik LGS ve YKS Puan Hesaplama Robotu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026-2027 LGS & YKS Puan Hesaplama Robotu | Matemetrik',
    description:
      'TYT, AYT, YDT ve LGS netlerinizi girin; güncel katsayılarla anında yerleştirme puanınızı ve tahmini yüzdelik diliminizi hesaplayın.',
    images: ['https://www.matemetrik.com/og.jpg'],
  },
};

const calculatorFaqs = [
  {
    question: 'LGS puanı nasıl hesaplanır ve 3 yanlış 1 doğruyu götürür mü?',
    answer:
      'Evet. Millî Eğitim Bakanlığı (MEB) Liselere Geçiş Sistemi (LGS) sınavında 3 yanlış cevap 1 doğru cevabı götürür. Net puanınız "Doğru Sayısı - (Yanlış Sayısı / 3)" formülüyle hesaplanır. Türkçe, Matematik ve Fen Bilimleri testlerinin katsayısı 4.00; T.C. İnkılap Tarihi, Din Kültürü ve Yabancı Dil testlerinin katsayısı ise 1.00\'dir. Elde edilen ağırlıklı standart puanlara MEB taban puanı (yaklaşık 194.75) eklenerek 500 tam puan üzerinden LGS yerleştirme puanı hesaplanır.',
  },
  {
    question: 'YKS\'de (TYT ve AYT) 4 yanlış 1 doğru kuralı nasıl uygulanır?',
    answer:
      'Yükseköğretim Kurumları Sınavı\'nda (YKS) hem Temel Yeterlilik Testi (TYT) hem de Alan Yeterlilik Testleri (AYT) ve YDT için 4 yanlış 1 doğruyu götürür. Netler "Doğru - (Yanlış / 4)" formülüyle bulunur. Boş bırakılan sorular net sayısını düşürmez veya etkilemez.',
  },
  {
    question: 'OBP (Ortaöğretim Başarı Puanı) YKS puanına nasıl etki eder?',
    answer:
      'Ortaöğretim Başarı Puanı (OBP), lise mezuniyet diploma notunuzun (100 üzerinden) 5 ile çarpılmasıyla hesaplanır (en düşük 250, en yüksek 500). Bu puanın %12\'si (0.12 katsayısı) ham YKS puanınıza eklenir. Böylece diploma notu 100 olan bir aday sınava +60 puan, diploma notu 50 olan bir aday ise +30 yerleştirme puanı katkısı alır.',
  },
  {
    question: 'Kırık OBP nedir ve kimlere uygulanır?',
    answer:
      'Önceki yıl YKS merkezi yerleştirmeyle bir önlisans veya lisans programına yerleşen (açıköğretim kontenjansız bölümleri hariç) adaylar, sonraki yıl tekrar sınava girdiklerinde OBP katsayıları yarı yarıya düşürülür (0.12 yerine 0.06 ile çarpılır). Buna "Kırık OBP" denir. Kırık OBP durumunda adaya eklenecek okul puanı 15 ile 30 puan arasına iner. Bir yıl sonraki sınavda ise OBP tekrar normal katsayısına döner.',
  },
  {
    question: 'YKS yerleştirme puanında TYT ve AYT\'nin ağırlıkları nedir?',
    answer:
      '4 yıllık bir lisans programına yerleşmek için gereken Sayısal (SAY), Eşit Ağırlık (EA), Sözel (SÖZ) veya Dil puanının hesaplanmasında TYT\'nin ağırlığı %40, AYT\'nin ağırlığı ise %60\'tır. 2 yıllık önlisans programlarında ise yalnızca TYT puanı ve OBP esas alınır.',
  },
  {
    question: 'TYT\'de 0.5 net kuralı nedir?',
    answer:
      'ÖSYM kurallarına göre bir adayın TYT puanının hesaplanabilmesi için Türkçe veya Temel Matematik testlerinin en az birinden 0.5 veya daha fazla ham net çıkarması zorunludur. İki testten de 0.5 netin altında kalan adayların TYT ve dolayısıyla AYT puanları hesaplanmaz.',
  },
  {
    question: 'LGS yüzdelik dilim tahmini neye göre yapılır?',
    answer:
      'LGS yüzdelik dilimi, sınava giren yaklaşık 1 milyon adayın net ortalamaları, standart sapmaları ve geçmiş yılların (2022-2025) resmi MEB LGS sayısal verileri dikkate alınarak simüle edilir. Puanlar yıldan yıla sınavın zorluğuna göre değişse de yüzdelik dilimler lise tercihlerinde en güvenilir referans metriğidir.',
  },
];

export default function PuanHesaplamaPage() {
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Matemetrik 2026-2027 LGS & YKS Puan Hesaplama Robotu',
    url: 'https://www.matemetrik.com/puan-hesaplama-robotu',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description:
      '2026-2027 güncel ÖSYM ve MEB katsayılarıyla LGS ve YKS (TYT, AYT Sayısal, Eşit Ağırlık, Sözel, YDT) puan, net ve yüzdelik dilim hesaplama motoru.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'TRY',
    },
    author: {
      '@type': 'Organization',
      name: 'Matemetrik',
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
        item: 'https://www.matemetrik.com',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'LGS & YKS Puan Hesaplama Robotu',
        item: 'https://www.matemetrik.com/puan-hesaplama-robotu',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: calculatorFaqs.map((f) => ({
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
      {/* Schema Injection */}
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
        {/* Breadcrumb Header */}
        <div className="bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Link href="/" className="hover:text-indigo-600 transition-colors">
                Ana Sayfa
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-600 font-semibold">Öğretmen &amp; Rehberlik Araçları</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-indigo-600 font-bold truncate">
                LGS &amp; YKS Puan Hesaplama Robotu
              </span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-indigo-50/30 to-slate-50/50 border-b border-slate-200/80 pt-10 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold border border-indigo-200">
                <Calculator className="w-3.5 h-3.5 text-indigo-600" />
                <span>2026-2027 MEB &amp; ÖSYM Güncel Katsayıları</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                LGS &amp; YKS Puan Hesaplama Robotu
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Öğretmenler, rehberlik uzmanları ve öğrenciler için geliştirilmiş resmi katsayılı puanlama motoru. LGS ve YKS (TYT, AYT Sayısal, Eşit Ağırlık, Sözel, YDT) netlerinizi girin; ham puan, OBP yerleştirme puanı ve tahmini yüzdelik diliminizi anında görüntüleyin.
              </p>

              {/* Quick Feature Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs text-slate-600">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 font-medium shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> LGS 3 Yanlış 1 Doğru
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 font-medium shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> YKS 4 Yanlış 1 Doğru
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 font-medium shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> OBP &amp; Kırık OBP Desteği
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 font-medium shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Hedef Lise &amp; Bölüm Önerileri
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Calculator Tool Component */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <ScoreCalculatorTool />
        </section>

        {/* In-depth Educational & SEO Content Guide */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-12">
          {/* Section 1: LGS Calculation Details */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  2026-2027 LGS Puanı Nasıl Hesaplanır?
                </h2>
                <p className="text-xs text-slate-500">
                  Millî Eğitim Bakanlığı Merkezi Sınav Puanı (MSP) Formülü ve Katsayı Esasları
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              LGS (Liselere Geçiş Sistemi), 8. sınıf öğrencilerinin nitelikli fen liseleri, Anadolu liseleri, sosyal bilimler liseleri ve proje okullarına yerleşmesini sağlayan merkezi bir sınavdır. Sınavda toplam <strong>90 soru</strong> yöneltilir ve iki oturum halinde uygulanır (Sözel 50 soru / 75 dakika, Sayısal 40 soru / 80 dakika).
            </p>

            {/* LGS Coefficients Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                    <th className="py-3 px-4 rounded-tl-xl">Alt Test / Ders Adı</th>
                    <th className="py-3 px-4">Soru Sayısı</th>
                    <th className="py-3 px-4">Ağırlık Katsayısı</th>
                    <th className="py-3 px-4">1 Netin Puan Değeri (Yaklaşık)</th>
                    <th className="py-3 px-4 rounded-tr-xl">3 Yanlışın Götürdüğü Puan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr className="hover:bg-indigo-50/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">Türkçe</td>
                    <td className="py-3 px-4 font-semibold">20 Soru</td>
                    <td className="py-3 px-4 font-black text-indigo-600">4.00</td>
                    <td className="py-3 px-4 font-semibold text-emerald-600">~3.67 Puan</td>
                    <td className="py-3 px-4 text-rose-600 font-semibold">-3.67 Puan (1 Net Kaybı)</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">Matematik</td>
                    <td className="py-3 px-4 font-semibold">20 Soru</td>
                    <td className="py-3 px-4 font-black text-indigo-600">4.00</td>
                    <td className="py-3 px-4 font-semibold text-emerald-600">~4.95 Puan *</td>
                    <td className="py-3 px-4 text-rose-600 font-semibold">-4.95 Puan</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">Fen Bilimleri</td>
                    <td className="py-3 px-4 font-semibold">20 Soru</td>
                    <td className="py-3 px-4 font-black text-indigo-600">4.00</td>
                    <td className="py-3 px-4 font-semibold text-emerald-600">~3.80 Puan</td>
                    <td className="py-3 px-4 text-rose-600 font-semibold">-3.80 Puan</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">T.C. İnkılap Tarihi ve Atatürkçülük</td>
                    <td className="py-3 px-4 font-semibold">10 Soru</td>
                    <td className="py-3 px-4 font-black text-slate-700">1.00</td>
                    <td className="py-3 px-4 font-semibold text-emerald-600">~1.45 Puan</td>
                    <td className="py-3 px-4 text-rose-600 font-semibold">-1.45 Puan</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">Din Kültürü ve Ahlak Bilgisi</td>
                    <td className="py-3 px-4 font-semibold">10 Soru</td>
                    <td className="py-3 px-4 font-black text-slate-700">1.00</td>
                    <td className="py-3 px-4 font-semibold text-emerald-600">~1.55 Puan</td>
                    <td className="py-3 px-4 text-rose-600 font-semibold">-1.55 Puan</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">Yabancı Dil (İngilizce)</td>
                    <td className="py-3 px-4 font-semibold">10 Soru</td>
                    <td className="py-3 px-4 font-black text-slate-700">1.00</td>
                    <td className="py-3 px-4 font-semibold text-emerald-600">~1.40 Puan</td>
                    <td className="py-3 px-4 text-rose-600 font-semibold">-1.40 Puan</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 italic">
              * Not: Matematik testinin Türkiye ortalaması görece daha düşük olduğundan standart sapma çarpanı ile puan getirisi diğer derslere oranla daha yüksek olabilmektedir.
            </p>
          </div>

          {/* Section 2: YKS Calculation Details */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  2026-2027 YKS (TYT, AYT, YDT) Puan Türleri ve Ağırlıklar
                </h2>
                <p className="text-xs text-slate-500">
                  ÖSYM Yükseköğretim Kurumları Sınavı Yerleştirme Puanı Hesaplama Prensipleri
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              YKS, 3 oturumdan meydana gelir: 1. Oturum <strong>TYT (Temel Yeterlilik Testi)</strong> 120 soru (165 dk); 2. Oturum <strong>AYT (Alan Yeterlilik Testleri)</strong> 160 soru (180 dk); 3. Oturum <strong>YDT (Yabancı Dil Testi)</strong> 80 soru (120 dk). Üniversiteye yerleştirme puanınız hesaplanırken <strong>TYT %40, AYT ise %60</strong> etkiye sahiptir.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2">
                <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                  Sayısal (SAY) Puanı
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  Tıp, Mühendislik, Mimarlık, Diş Hekimliği, Yazılım
                </div>
                <div className="text-xs text-slate-600 pt-1 space-y-1">
                  <div>• TYT: %40 (Tüm Testler)</div>
                  <div>• AYT Matematik: %30</div>
                  <div>• AYT Fizik: %10</div>
                  <div>• AYT Kimya: %10</div>
                  <div>• AYT Biyoloji: %10</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
                <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Eşit Ağırlık (EA) Puanı
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  Hukuk, Psikoloji, İşletme, İktisat, PDR, YBS
                </div>
                <div className="text-xs text-slate-600 pt-1 space-y-1">
                  <div>• TYT: %40 (Tüm Testler)</div>
                  <div>• AYT Matematik: %30</div>
                  <div>• AYT Türk Dili ve Edebiyatı: %18</div>
                  <div>• AYT Tarih-1: %7</div>
                  <div>• AYT Coğrafya-1: %5</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-2">
                <div className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  Sözel (SÖZ) Puanı
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  İletişim, Tarih, Coğrafya, Türkçe Öğr., Gastronomi
                </div>
                <div className="text-xs text-slate-600 pt-1 space-y-1">
                  <div>• TYT: %40 (Tüm Testler)</div>
                  <div>• AYT Edebiyat-Sosyal-1: %30</div>
                  <div>• AYT Tarih-2: %10</div>
                  <div>• AYT Coğrafya-2: %10</div>
                  <div>• AYT Felsefe Grubu &amp; Din: %10</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-50/60 border border-cyan-100 space-y-2">
                <div className="text-xs font-bold text-cyan-700 uppercase tracking-wider">
                  Yabancı Dil (DİL) Puanı
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  İngiliz Dili ve Edebiyatı, Çeviribilim, Mütercim-Tercümanlık
                </div>
                <div className="text-xs text-slate-600 pt-1 space-y-1">
                  <div>• TYT: %40 (Tüm Testler)</div>
                  <div>• YDT (Yabancı Dil 80 Soru): %60</div>
                  <div>• 4 Yanlış 1 Doğruyu Götürür</div>
                  <div>• OBP Doğrudan Eklenir (+30 - +60)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: OBP & Broken OBP Details */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Percent className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  OBP ve Kırık OBP Nedir? Yerleştirme Puanını Nasıl Etkiler?
                </h2>
                <p className="text-xs text-slate-500">
                  Lise Diploma Notunun Üniversite Yerleştirmesindeki Kritik Rolü
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-slate-600">
              <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Standart OBP Hesaplaması
                </h3>
                <p className="leading-relaxed">
                  Lise diploma notunuz (örneğin 85.00), 5 ile çarpılarak 250 ile 500 arasında bir OBP değerine dönüştürülür: <br />
                  <code className="bg-white px-2 py-1 rounded text-indigo-600 font-mono text-xs border border-slate-200 inline-block mt-1">
                    OBP = Diploma Notu × 5 (Örn: 85 × 5 = 425)
                  </code>
                </p>
                <p className="leading-relaxed">
                  Yerleştirme puanınıza eklenecek okul katkısı ise OBP&apos;nin 0.12 ile çarpılmasıyla bulunur: <br />
                  <code className="bg-white px-2 py-1 rounded text-emerald-700 font-mono text-xs border border-slate-200 inline-block mt-1">
                    Okul Katkısı = OBP × 0.12 (Örn: 425 × 0.12 = +51.0 Puan)
                  </code>
                </p>
              </div>

              <div className="space-y-3 p-5 rounded-2xl bg-rose-50/50 border border-rose-200/80">
                <h3 className="font-bold text-rose-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  Kırık OBP Durumu ve Cezası
                </h3>
                <p className="leading-relaxed text-slate-700">
                  Bir önceki yıl YKS ile merkezi olarak bir lisans veya önlisans programına yerleştirilen adaylar (kayıt yaptırsın veya yaptırmasın), bir sonraki yıl sınava girdiklerinde OBP katsayıları <strong>yarı yarıya (0.12 yerine 0.06)</strong> düşer.
                </p>
                <p className="leading-relaxed text-slate-700">
                  Örneğin 85 diploma notuna sahip adayın okul puanı <strong>+51 puandan +25.5 puana</strong> düşer. Yaklaşık 25 puanlık bu kayıp, adayın sıralamasında 20.000 ila 80.000 kişilik gerilemeye yol açabilmektedir.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Teacher & Guidance Counseling Recommendations */}
          <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 rounded-3xl p-6 sm:p-10 text-white space-y-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-indigo-300 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Öğretmenler &amp; Rehberlik Servisi İçin Tercih Tavsiyeleri
                </h2>
                <p className="text-xs text-indigo-200">
                  LGS ve YKS Deneme Sınavı Analizlerinde Dikkat Edilecek Unsurlar
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="text-base font-bold text-indigo-300 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> 1. Puana Değil, Sıraya Bakın
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Sınavların zorluk derecesi her yıl değişir. Çok zor bir sınavda 430 puanla fen lisesine girilebilirken, kolay bir sınavda 460 puan dahi yetmeyebilir. Bu nedenle deneme takiplerinde ve tercihlerde temel referans <strong>yüzdelik dilim ve başarı sıralaması</strong> olmalıdır.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="text-base font-bold text-purple-300 flex items-center gap-2">
                  <Layers className="w-4 h-4" /> 2. Yanlış Sayısını Azaltın
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  LGS&apos;de 3 yanlış, YKS&apos;de ise 4 yanlış bir doğruyu yok eder. Bilinmeyen veya emin olunmayan sorularda tahminde bulunmak net ortalamasını hızla aşağı çeker. Boş bırakma kültürü denemelerde erken kazandırılmalıdır.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="text-base font-bold text-pink-300 flex items-center gap-2">
                  <Award className="w-4 h-4" /> 3. Matematik Faktörü
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Gerek LGS gerekse TYT ve AYT&apos;de Matematik testinin standart sapması en yüksek seviyededir. Matematikten kazanılan 1 net, standart sapma çarpanıyla öğrenciyi binlerce adayın önüne geçirebilmektedir.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: FAQs Accordion / Cards */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Sıkça Sorulan Sorular (SSS)
                </h2>
                <p className="text-xs text-slate-500">
                  LGS ve YKS Puan Hesaplama ile İlgili En Çok Merak Edilen Konular
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {calculatorFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2 hover:bg-white hover:shadow-md transition-all"
                >
                  <h3 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                    <span className="text-indigo-600 font-extrabold">{idx + 1}.</span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed pl-4">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Related Teacher Tools & Books */}
          <div className="bg-slate-100/70 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Diğer Öğretmen ve Eğitimci Araçlarımız
                </h3>
                <p className="text-xs text-slate-500">
                  Tüm eğitim araçlarımız MEB standartlarında ve tamamen ücretsizdir.
                </p>
              </div>
              <Link
                href="/kategori/meb-ders-kitabi-cevaplari"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1"
              >
                1-12. Sınıf MEB Çözümleri &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/yillik-plan-hazirlama"
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Yıllık Plan Hazırlama
                </div>
                <div className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                  2026-2027 Maarif Modeli Excel ve yatay A4 PDF çıktısı
                </div>
              </Link>

              <Link
                href="/kulup-toplanti-tutanaklari"
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-2.5">
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                  Kulüp Toplantı Tutanakları
                </div>
                <div className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                  38 resmi okul kulübü evrakları, tüzük ve planları
                </div>
              </Link>

              <Link
                href="/karne-gorusu-ureticisi"
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-2.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                  Karne Görüşü Üreticisi
                </div>
                <div className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                  e-Okul uyumlu pedagojik ve imla korumalı öğretmen görüşleri
                </div>
              </Link>

              <Link
                href="/sinav-hazirlama-robotu"
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mb-2.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                  Sınav Hazırlama Robotu
                </div>
                <div className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                  MEB çift sütun yazılı ve test kağıdı PDF oluşturucu
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
