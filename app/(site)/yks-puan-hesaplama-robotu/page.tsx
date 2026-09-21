import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap, Calculator, Award, BookOpen, Sparkles, CheckCircle2,
  ChevronRight, HelpCircle, School, Layers, ShieldCheck,
  TrendingUp, Percent, Trophy, Calendar, Users, FileText, Check, ArrowRight
} from 'lucide-react';
import ScoreCalculatorTool from '@/components/tools/ScoreCalculatorTool';

export const metadata: Metadata = {
  title: '2026 YKS Puan Hesaplama Robotu | TYT, AYT, YDT ve Sıralama Hesaplama - Matemetrik',
  description:
    '2026-2027 güncel ÖSYM katsayılarıyla YKS puan hesaplama robotu. TYT, AYT Sayısal, Eşit Ağırlık, Sözel, YDT Dil puanları, OBP, kırık OBP ve tahmini başarı sıralamanızı tek ekranda hesaplayın.',
  keywords: [
    'yks puan hesaplama',
    'yks puan hesaplama robotu',
    'tyt puan hesaplama',
    'ayt puan hesaplama',
    'yks net hesaplama',
    'ayt sayısal puan hesaplama',
    'ayt eşit ağırlık hesaplama',
    'ayt sözel hesaplama',
    'ydt dil puan hesaplama',
    'obp hesaplama',
    'kırık obp hesaplama',
    'yks sıralama hesaplama 2026',
    'öğretmen yks hesaplama robotu',
    'üniversite puan hesaplama',
  ],
  alternates: {
    canonical: 'https://www.matemetrik.com/yks-puan-hesaplama-robotu',
  },
  openGraph: {
    title: '2026 YKS Puan Hesaplama Robotu | Matemetrik',
    description:
      'ÖSYM 2026 güncel katsayılarıyla TYT, AYT ve YDT netlerinizi girin; yerleştirme puanınızı ve tahmini başarı sıranızı anında görün.',
    url: 'https://www.matemetrik.com/yks-puan-hesaplama-robotu',
    type: 'website',
    images: [
      {
        url: 'https://www.matemetrik.com/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Matemetrik 2026 YKS Puan Hesaplama Robotu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026 YKS Puan Hesaplama Robotu | Matemetrik',
    description:
      'TYT, AYT Sayısal, Eşit Ağırlık, Sözel ve YDT netlerinizi girin; anında katsayılarla yerleştirme puanınızı ve başarı sıranızı hesaplayın.',
    images: ['https://www.matemetrik.com/og.jpg'],
  },
};

const yksFaqs = [
  {
    question: 'YKS Puanı hesaplanırken TYT ve AYT testlerinin katkı oranı nedir?',
    answer:
      'YKS yerleştirme puanında Temel Yeterlilik Testi (TYT) %40, Alan Yeterlilik Testi (AYT) veya Yabancı Dil Testi (YDT) ise %60 ağırlığa sahiptir. Sayısal, Eşit Ağırlık, Sözel veya Dil puanınız hesaplanırken TYT puanınızın %40’ı ile ilgili alanın AYT puanının %60’ı toplanır.',
  },
  {
    question: 'OBP (Ortaöğretim Başarı Puanı) YKS puanına nasıl eklenir?',
    answer:
      'Lise mezuniyet diploma notunuz (100 üzerinden) 5 ile çarpılarak en fazla 500 olan OBP elde edilir. Bu puan genel adaylar için 0,12 katsayısı ile çarpılarak ham YKS puanınıza 30 ila 60 puan arasında yerleştirme katkısı sağlar.',
  },
  {
    question: 'Kırık OBP nedir ve puanı ne kadar düşürür?',
    answer:
      'Bir önceki yıl YKS ile bir yükseköğretim programına (önlisans, lisans veya açıköğretim kontenjanlı) yerleşip kayıt yaptırsanız da yaptırmasanız da bir sonraki yıl OBP katsayınız yarı yarıya düşer (0,12 yerine 0,06 ile çarpılır). Bu durum adayın yerleştirme puanında yaklaşık 15 ila 30 puanlık kayba yol açar.',
  },
  {
    question: 'YKS’de 4 yanlış 1 doğruyu götürür mü?',
    answer:
      'Evet. YKS’nin tüm oturumlarında (TYT, AYT, YDT) her bir test için 4 yanlış cevap 1 doğru cevabı götürür. Net hesabı: Doğru Sayısı - (Yanlış Sayısı / 4) formülüyle yapılır.',
  },
  {
    question: 'YKS tercih barajı var mı? Hangi bölümlerde sıralama barajı uygulanır?',
    answer:
      'ÖSYM genel tercih baraj puanını kaldırmıştır; ancak belirli meslek programları için başarı sıralaması barajı devam etmektedir: Tıp Fakültesi (ilk 50.000), Diş Hekimliği (ilk 80.000), Eczacılık (ilk 100.000), Hukuk (ilk 125.000), Mimarlık (ilk 250.000), Mühendislik (ilk 300.000) ve Öğretmenlik programları (ilk 300.000).',
  },
];

export default function YksPuanHesaplamaPage() {
  const jsonLdApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Matemetrik 2026 YKS Puan Hesaplama Robotu',
    description:
      'ÖSYM güncel katsayılarıyla TYT, AYT Sayısal, Eşit Ağırlık, Sözel ve YDT puanı ile OBP sıralama hesaplama motoru.',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    url: 'https://www.matemetrik.com/yks-puan-hesaplama-robotu',
    author: {
      '@type': 'Organization',
      name: 'Matemetrik',
      url: 'https://www.matemetrik.com',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'TRY',
    },
  };

  const jsonLdBreadcrumbs = {
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
        name: 'Öğretmen ve Sınav Araçları',
        item: 'https://www.matemetrik.com/kategori/yks',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'YKS Puan Hesaplama Robotu',
        item: 'https://www.matemetrik.com/yks-puan-hesaplama-robotu',
      },
    ],
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: yksFaqs.map((faq) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
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
              <Link href="/kategori/yks" className="hover:text-indigo-600 transition-colors">
                YKS &amp; Sınavlar
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-purple-600 font-bold truncate">
                YKS Puan Hesaplama Robotu
              </span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-purple-50/25 to-slate-50/50 border-b border-slate-200/80 pt-12 pb-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold border border-purple-200">
                <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
                <span>2026-2027 ÖSYM Yükseköğretim Kurumları Sınavı Robotu</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                2026 YKS Puan Hesaplama Robotu
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                ÖSYM güncel katsayıları ve standart sapma dağılımı esas alınarak geliştirilmiş en kapsamlı <strong>YKS (TYT, AYT Sayısal, Eşit Ağırlık, Sözel ve YDT Dil)</strong> puan ve başarı sırası hesaplayıcısı. Diploma notu, OBP, kırık OBP ve hedef bölüm analizini anında yapın.
              </p>

              {/* Badges Bar */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs text-slate-600">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 font-medium shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> TYT (120 Soru) &amp; AYT (160 Soru)
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 font-medium shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Sayısal, EA, Sözel, Dil Puanları
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 font-medium shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> OBP &amp; Kırık OBP Desteği
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 font-medium shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> %100 Ücretsiz &amp; Kayıtsız
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Global Statistics Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-purple-600">TYT &amp; AYT</div>
              <div className="text-xs font-semibold text-slate-500 mt-1">Tüm Oturumlar</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-emerald-600">%40 / %60</div>
              <div className="text-xs font-semibold text-slate-500 mt-1">ÖSYM Katsayı Dağılımı</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-indigo-600">30 - 60</div>
              <div className="text-xs font-semibold text-slate-500 mt-1">OBP Ek Puan Katkısı</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-600">7 Alan</div>
              <div className="text-xs font-semibold text-slate-500 mt-1">Başarı Sıralaması Barajı</div>
            </div>
          </div>
        </section>

        {/* Interactive Calculator Engine (Defaulting to YKS) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <ScoreCalculatorTool initialTab="yks" />
        </section>

        {/* Switch Link to LGS Robot */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-indigo-50/80 border border-indigo-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-slate-900 text-sm">8. Sınıf LGS Puanı mı hesaplamak istiyorsunuz?</div>
                <div className="text-xs text-slate-600">MEB merkezi sınav katsayılarıyla LGS ve yüzdelik dilim hesaplama motoru</div>
              </div>
            </div>
            <Link
              href="/lgs-puan-hesaplama-robotu"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
            >
              LGS Robotuna Git <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Educational Content & Guidelines */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 space-y-12">
          {/* Section 1: YKS Score Structure Table */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  2026 YKS Puan Türleri ve Testlerin Yüzdelik Ağırlıkları
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  ÖSYM kılavuzuna göre YKS puan hesaplama formülünde kullanılan katsayılar
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 text-xs font-extrabold uppercase">
                    <th className="py-3 px-4 rounded-l-xl">Puan Türü</th>
                    <th className="py-3 px-4">TYT Katkısı</th>
                    <th className="py-3 px-4">AYT Matematik</th>
                    <th className="py-3 px-4">AYT Fen Bilimleri</th>
                    <th className="py-3 px-4">AYT Edebiyat - Sosyal 1</th>
                    <th className="py-3 px-4 rounded-r-xl">Hedef Bölümler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="hover:bg-slate-50/60 font-medium">
                    <td className="py-3 px-4 font-bold text-slate-900">TYT</td>
                    <td className="py-3 px-4 text-purple-600 font-bold">%100</td>
                    <td className="py-3 px-4 text-slate-400">-</td>
                    <td className="py-3 px-4 text-slate-400">-</td>
                    <td className="py-3 px-4 text-slate-400">-</td>
                    <td className="py-3 px-4">2 Yıllık Önlisans, Polislik (PMYO), Astsubaylık (MYO)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 font-medium">
                    <td className="py-3 px-4 font-bold text-indigo-900">SAYISAL (SAY)</td>
                    <td className="py-3 px-4 text-purple-600 font-bold">%40</td>
                    <td className="py-3 px-4 text-indigo-600 font-bold">%30</td>
                    <td className="py-3 px-4 text-indigo-600 font-bold">%30</td>
                    <td className="py-3 px-4 text-slate-400">-</td>
                    <td className="py-3 px-4">Tıp, Diş Hekimliği, Mühendislik, Eczacılık, Mimarlık</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 font-medium">
                    <td className="py-3 px-4 font-bold text-emerald-900">EŞİT AĞIRLIK (EA)</td>
                    <td className="py-3 px-4 text-purple-600 font-bold">%40</td>
                    <td className="py-3 px-4 text-indigo-600 font-bold">%30</td>
                    <td className="py-3 px-4 text-slate-400">-</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">%30</td>
                    <td className="py-3 px-4">Hukuk, Psikoloji, İktisat, İşletme, PDR, Kamu Yönetimi</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 font-medium">
                    <td className="py-3 px-4 font-bold text-amber-900">SÖZEL (SÖZ)</td>
                    <td className="py-3 px-4 text-purple-600 font-bold">%40</td>
                    <td className="py-3 px-4 text-slate-400">-</td>
                    <td className="py-3 px-4 text-slate-400">-</td>
                    <td className="py-3 px-4 text-amber-600 font-bold">%50 (Sos-1 + Sos-2)</td>
                    <td className="py-3 px-4">İletişim, Gazetecilik, Tarih, Coğrafya, Gastronomi, Reklamcılık</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 font-medium">
                    <td className="py-3 px-4 font-bold text-rose-900">DİL (YDT)</td>
                    <td className="py-3 px-4 text-purple-600 font-bold">%40</td>
                    <td className="py-3 px-4 text-slate-400">-</td>
                    <td className="py-3 px-4 text-slate-400">-</td>
                    <td className="py-3 px-4 text-rose-600 font-bold">%60 (YDT Yabancı Dil)</td>
                    <td className="py-3 px-4">İngilizce Öğretmenliği, Mütercim Tercümanlık, Çeviribilim</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: OBP & Broken OBP Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Normal OBP Hesaplama (0,12 Katsayısı)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Ortaöğretim Başarı Puanı (OBP), lise mezuniyet notunuzun 5 ile çarpılmasıyla hesaplanır.
                Örneğin liseden <strong>85,00</strong> diploma notuyla mezun olan bir adayın OBP&apos;si:
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-800">
                85 × 5 = 425 OBP<br />
                425 × 0,12 = <strong>+51,00 Yerleştirme Puanı Katkısı</strong>
              </div>
              <p className="text-xs text-slate-500">
                Maksimum diploma notu (100) için eklenecek en yüksek puan 60 puandır.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Kırık OBP Nedir? (0,06 Katsayısı)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Bir önceki yıl ÖSYM merkezi yerleştirmeyle bir üniversite programına yerleşen adayların diploma notu katsayısı yarı yarıya düşürülür:
              </p>
              <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-200 text-xs font-mono text-rose-900">
                85 × 5 = 425 OBP<br />
                425 × 0,06 = <strong>+25,50 Yerleştirme Puanı Katkısı</strong> (25,5 puan kayıp)
              </div>
              <p className="text-xs text-slate-500">
                Yerleşilen yılın üzerinden 1 yıl geçtikten sonra (2. yıl ve sonrasında) OBP tekrar tam katsayıyla (0,12) hesaplanır.
              </p>
            </div>
          </div>

          {/* Section 3: Professional Ranking Thresholds */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <School className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  2026 YKS Başarı Sıralaması Barajları (ÖSYM &amp; YÖK Kriterleri)
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  YÖK tarafından belirlenen ve tercih yapabilmek için aşılması zorunlu olan en düşük sıralama şartları
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-center">
                <div className="text-xs text-slate-500 font-bold uppercase">Tıp Fakültesi</div>
                <div className="text-2xl font-black text-purple-600">İlk 50.000</div>
                <div className="text-[11px] text-slate-400">Sayısal Puan Türü</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-center">
                <div className="text-xs text-slate-500 font-bold uppercase">Diş Hekimliği</div>
                <div className="text-2xl font-black text-purple-600">İlk 80.000</div>
                <div className="text-[11px] text-slate-400">Sayısal Puan Türü</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-center">
                <div className="text-xs text-slate-500 font-bold uppercase">Hukuk Fakültesi</div>
                <div className="text-2xl font-black text-emerald-600">İlk 125.000</div>
                <div className="text-[11px] text-slate-400">Eşit Ağırlık Puan Türü</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-center">
                <div className="text-xs text-slate-500 font-bold uppercase">Mühendislik &amp; Öğretmenlik</div>
                <div className="text-2xl font-black text-indigo-600">İlk 300.000</div>
                <div className="text-[11px] text-slate-400">Sayısal / İlgili Alan</div>
              </div>
            </div>
          </div>

          {/* Section 4: FAQs Accordion */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  YKS Puan Hesaplama Hakkında Sıkça Sorulan Sorular
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Adayların ve rehber öğretmenlerin en çok merak ettiği konular
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-2">
              {yksFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50/60 border border-slate-200/70 space-y-2"
                >
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 text-xs flex items-center justify-center shrink-0 font-extrabold">
                      {idx + 1}
                    </span>
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-8">
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
