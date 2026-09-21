import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen, Layers, FileSpreadsheet, Sparkles, Languages,
  ArrowRightLeft, GraduationCap, MessageSquare, Repeat,
  FileText, FilterX, ArrowRight, Award, CheckCircle2,
  HelpCircle, ChevronRight, Compass, ShieldCheck, Trophy,
  Clock, TrendingUp, Search
} from 'lucide-react';
import { getYdsTopics, getYdsSummary } from '@/lib/yds';

export const metadata: Metadata = {
  title: '2026-2027 YDS Hazırlık & Çalışma Bölümü | 1.000 Çözümlü Soru & Konu Testleri - Matemetrik',
  description:
    'ÖSYM YDS ve YÖKDİL İngilizce sınavlarına hazırlık için 11 temel soru türünde 1.000 çözümlü soru bankası, konu anlatımları ve soru çözüm teknikleri. Kelime, gramer, cloze test, çeviri ve paragraf sorularını anında dönütlü interaktif testlerle çözün.',
  keywords: [
    'yds hazırlık',
    'yds çalışma bölümü',
    'yds soru bankası',
    'yds çıkmış sorular',
    'yds kelime testi',
    'yds gramer soruları',
    'yds cloze test',
    'yds cümle tamamlama',
    'yds çeviri soruları',
    'yds okuma parçaları',
    'yds taktikleri',
    'yökdil hazırlık',
    'yökdil ingilizce test çöz',
    'yds ücretsiz test çöz',
    'online yds deneme',
  ],
  alternates: {
    canonical: 'https://www.matemetrik.com/yds-calisma-bolumu',
  },
  openGraph: {
    title: '2026-2027 YDS Hazırlık & Çalışma Bölümü | Matemetrik',
    description:
      'ÖSYM standartlarında 1.000 adet Türkçe açıklamalı soru, 11 soru türü ve anında dönütlü interaktif test platformu.',
    url: 'https://www.matemetrik.com/yds-calisma-bolumu',
    type: 'website',
    images: [
      {
        url: 'https://www.matemetrik.com/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Matemetrik YDS Hazırlık & Çalışma Bölümü',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026-2027 YDS Hazırlık & Çalışma Bölümü | Matemetrik',
    description:
      'YDS ve YÖKDİL için 1.000 adet açıklamalı soru ve konu testleri. Yeşil/kırmızı anında kontrol ve çözüm analizi.',
    images: ['https://www.matemetrik.com/og.jpg'],
  },
};

const ydsFaqs = [
  {
    question: 'YDS Çalışma Bölümü soru havuzunda kaç soru bulunmaktadır?',
    answer:
      'Matemetrik YDS Hazırlık platformumuzda ÖSYM YDS ve YÖKDİL standartlarında hazırlanmış, 11 temel soru kategorisine ayrılmış tam 1.000 adet çözümlü soru bulunmaktadır. Sorular çıkmış soru kalıpları, akademik soru bankaları ve özgün YDS formatı esas alınarak titizlikle oluşturulmuştur.',
  },
  {
    question: 'İnteraktif test sisteminde doğru ve yanlış cevaplar nasıl gösterilir?',
    answer:
      'Test formatında bir şıkka tıkladığınızda doğru seçenek anında canlı yeşil renkle, yanlış seçtiğiniz şık ise kırmızı renkle işaretlenir. Hemen ardından "Çözümü Göster & Açıkla" butonuna tıklayarak sorunun doğru cevabının nedenini, cümlenin Türkçe çevirisini, çeldiricilerin elenme sebeplerini ve önemli kelimeleri adım adım inceleyebilirsiniz.',
  },
  {
    question: 'Gerçek YDS sınavında soru dağılımı nasıldır?',
    answer:
      'Resmi ÖSYM YDS sınavı 80 çoktan seçmeli sorudan oluşur ve sınav süresi 180 dakikadır (3 saat). Soru dağılımı şu şekildedir: Kelime Bilgisi (6), Dilbilgisi & Gramer (10), Cloze Test (10), Cümle Tamamlama (10), İngilizce-Türkçe Çeviri (3), Türkçe-İngilizce Çeviri (3), Okuma Parçaları (20 soru / 5 metin), Diyalog Tamamlama (5), Anlamca En Yakın Cümle (4), Paragraf Tamamlama (4) ve Anlamı Bozan Cümle (5).',
  },
  {
    question: 'YDS\'de yanlış cevaplar doğru cevapları götürür mü?',
    answer:
      'Hayır. ÖSYM YDS (Yabancı Dil Bilgisi Seviye Tespit Sınavı) ve YÖKDİL sınavlarında 4 yanlış 1 doğru kuralı uygulanmaz; yani yanlış cevaplar doğru sayısını düşürmez. Her doğru cevap 1.25 puan değerindedir ve toplam 80 doğru ile 100 tam puan elde edilir. Bu nedenle adayların hiçbir soruyu boş bırakmaması önerilir.',
  },
  {
    question: 'YDS ve YÖKDİL hazırlığı için bu platform nasıl kullanılmalıdır?',
    answer:
      'Öncelikle güçlü ve zayıf olduğunuz soru tiplerini belirlemek için konulara ayrılmış testleri çözmeniz önerilir. Özellikle en çok soru çıkan Okuma Parçaları (20 soru), Gramer ve Bağlaçlar (10 soru) ve Cümle Tamamlama (10 soru) bölümlerine ağırlık verip, çözdüğünüz her sorunun Türkçe çevirisi ve çözüm mantığını okuyarak kelime dağarcığınızı zenginleştirebilirsiniz.',
  },
];

export default function YdsHubPage() {
  const topics = getYdsTopics();
  const summary = getYdsSummary();

  // Map icon names
  const getIcon = (name: string) => {
    switch (name) {
      case 'BookOpen':
        return <BookOpen className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Languages':
        return <Languages className="w-5 h-5" />;
      case 'ArrowRightLeft':
        return <ArrowRightLeft className="w-5 h-5" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5" />;
      case 'Repeat':
        return <Repeat className="w-5 h-5" />;
      case 'FileText':
        return <FileText className="w-5 h-5" />;
      case 'FilterX':
        return <FilterX className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  // Structured Data Schemas
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Matemetrik 2026-2027 YDS & YÖKDİL Hazırlık ve Çalışma Platformu',
    description:
      '11 soru türünde 1.000 çözümlü soru, akademik kelime listeleri, gramer ve okuma teknikleri sunan kapsamlı YDS eğitim programı.',
    provider: {
      '@type': 'Organization',
      name: 'Matemetrik',
      url: 'https://www.matemetrik.com',
    },
    educationalLevel: 'Advanced',
    inLanguage: ['tr', 'en'],
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
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
        name: 'Sınavlar & Hazırlık',
        item: 'https://www.matemetrik.com/kategori/yds',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'YDS Çalışma Bölümü',
        item: 'https://www.matemetrik.com/yds-calisma-bolumu',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ydsFaqs.map((f) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
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
              <Link href="/kategori/yds" className="hover:text-indigo-600 transition-colors">
                YDS &amp; YÖKDİL
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-indigo-600 font-bold truncate">
                YDS Çalışma &amp; Hazırlık Bölümü
              </span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-indigo-50/20 to-slate-50/50 border-b border-slate-200/80 pt-12 pb-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold border border-indigo-200">
                <Trophy className="w-3.5 h-3.5 text-indigo-600" />
                <span>2026-2027 ÖSYM YDS &amp; YÖKDİL Eğitim Platformu</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                YDS Hazırlık &amp; Çalışma Bölümü
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                ÖSYM YDS ve YÖKDİL sınavlarında çıkan tüm soru türleri için özel olarak geliştirilmiş interaktif test ve çalışma platformu. Konulara göre ayrılmış <strong>1.000 çözümlü soru</strong>, anında doğru (yeşil) ve yanlış (kırmızı) kontrolü, Türkçe çeviriler ve çözüm teknikleri ile hedefinize ulaşın.
              </p>

              {/* Badges Bar */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs text-slate-600">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 font-medium shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 1.000 Açıklamalı Soru
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 font-medium shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 11 Ayrı Soru Türü
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 font-medium shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Anında Yeşil / Kırmızı Dönüt
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
              <div className="text-2xl sm:text-3xl font-black text-indigo-600">1.000</div>
              <div className="text-xs font-semibold text-slate-500 mt-1">ÖSYM Standart Soru</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-emerald-600">11</div>
              <div className="text-xs font-semibold text-slate-500 mt-1">Temel Soru Türü</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-purple-600">%100</div>
              <div className="text-xs font-semibold text-slate-500 mt-1">Açıklamalı &amp; Çevirili</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-600">80</div>
              <div className="text-xs font-semibold text-slate-500 mt-1">Gerçek Sınav Soru Sayısı</div>
            </div>
          </div>
        </section>

        {/* Interactive Topic Cards Grid (11 Modules) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                YDS Çalışma Konuları &amp; Test Modülleri
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Çalışmak istediğiniz konuyu seçin; interaktif test ekranında soruları çözün ve çözümlerini inceleyin.
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-600 self-start sm:self-auto">
              Toplam 11 Konu Modülü
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((t, idx) => (
              <div
                key={t.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Topic Header: Icon, Number, Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold border border-indigo-100 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      {getIcon(t.icon)}
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {t.badge}
                    </span>
                  </div>

                  {/* Title & English Subtitle */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {t.title}
                    </h3>
                    <div className="text-xs text-slate-400 font-medium">
                      {t.englishTitle}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {t.description}
                  </p>

                  {/* Tactical Hint */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 flex items-start gap-2">
                    <Compass className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{t.tacticalOverview}</span>
                  </div>
                </div>

                {/* Footer: Question count & Start Button */}
                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-500">
                    <span className="text-slate-900 text-sm font-extrabold">{t.questionCount}</span> Soru
                  </div>
                  <Link
                    href={`/yds-calisma-bolumu/${t.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-indigo-600/20 group-hover:translate-x-0.5"
                  >
                    <span>Konuyu Çalış &amp; Test Çöz</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* In-depth Educational & SEO Guide: YDS Exam Structure */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-12">
          {/* Section: Official Exam Distribution Table */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  ÖSYM YDS Soru Dağılımı ve Sınav Formatı (80 Soru / 180 Dk)
                </h2>
                <p className="text-xs text-slate-500">
                  Yabancı Dil Bilgisi Seviye Tespit Sınavı resmi soru tipi ve puanlama tablosu
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                    <th className="py-3 px-4 rounded-tl-xl">Soru Numarası</th>
                    <th className="py-3 px-4">Soru Tipi / Bölüm Adı</th>
                    <th className="py-3 px-4">Soru Sayısı</th>
                    <th className="py-3 px-4">Puan Değeri</th>
                    <th className="py-3 px-4">Platform Soru Havuzumuz</th>
                    <th className="py-3 px-4 rounded-tr-xl">Önerilen Çözüm Süresi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr className="hover:bg-indigo-50/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-indigo-600">1 - 6</td>
                    <td className="py-3 px-4 font-bold text-slate-900">Kelime Bilgisi (Vocabulary)</td>
                    <td className="py-3 px-4 font-semibold">6 Soru</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">7.5 Puan</td>
                    <td className="py-3 px-4 font-bold text-indigo-700">100 Çözümlü Soru</td>
                    <td className="py-3 px-4">6 - 8 Dakika</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-indigo-600">7 - 16</td>
                    <td className="py-3 px-4 font-bold text-slate-900">Dilbilgisi &amp; Gramer (Tenses, Prepositions, Bağlaçlar)</td>
                    <td className="py-3 px-4 font-semibold">10 Soru</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">12.5 Puan</td>
                    <td className="py-3 px-4 font-bold text-indigo-700">120 Çözümlü Soru</td>
                    <td className="py-3 px-4">12 - 15 Dakika</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-indigo-600">17 - 26</td>
                    <td className="py-3 px-4 font-bold text-slate-900">Cloze Test (2 Paragraf x 5 Soru)</td>
                    <td className="py-3 px-4 font-semibold">10 Soru</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">12.5 Puan</td>
                    <td className="py-3 px-4 font-bold text-indigo-700">80 Çözümlü Soru (16 Paragraf)</td>
                    <td className="py-3 px-4">15 - 18 Dakika</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-indigo-600">27 - 36</td>
                    <td className="py-3 px-4 font-bold text-slate-900">Cümle Tamamlama (Sentence Completion)</td>
                    <td className="py-3 px-4 font-semibold">10 Soru</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">12.5 Puan</td>
                    <td className="py-3 px-4 font-bold text-indigo-700">120 Çözümlü Soru</td>
                    <td className="py-3 px-4">18 - 20 Dakika</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-indigo-600">37 - 39</td>
                    <td className="py-3 px-4 font-bold text-slate-900">İngilizce - Türkçe Çeviri</td>
                    <td className="py-3 px-4 font-semibold">3 Soru</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">3.75 Puan</td>
                    <td className="py-3 px-4 font-bold text-indigo-700">80 Çözümlü Soru</td>
                    <td className="py-3 px-4">3 - 5 Dakika</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-indigo-600">40 - 42</td>
                    <td className="py-3 px-4 font-bold text-slate-900">Türkçe - İngilizce Çeviri</td>
                    <td className="py-3 px-4 font-semibold">3 Soru</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">3.75 Puan</td>
                    <td className="py-3 px-4 font-bold text-indigo-700">80 Çözümlü Soru</td>
                    <td className="py-3 px-4">3 - 5 Dakika</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-indigo-600">43 - 62</td>
                    <td className="py-3 px-4 font-bold text-slate-900">Okuma Parçaları (5 Metin x 4 Soru)</td>
                    <td className="py-3 px-4 font-semibold">20 Soru</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">25.0 Puan</td>
                    <td className="py-3 px-4 font-bold text-indigo-700">120 Çözümlü Soru (30 Metin)</td>
                    <td className="py-3 px-4">50 - 60 Dakika</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-indigo-600">63 - 67</td>
                    <td className="py-3 px-4 font-bold text-slate-900">Diyalog Tamamlama</td>
                    <td className="py-3 px-4 font-semibold">5 Soru</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">6.25 Puan</td>
                    <td className="py-3 px-4 font-bold text-indigo-700">75 Çözümlü Soru</td>
                    <td className="py-3 px-4">8 - 10 Dakika</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-indigo-600">68 - 71</td>
                    <td className="py-3 px-4 font-bold text-slate-900">Anlamca En Yakın Cümle (Restatement)</td>
                    <td className="py-3 px-4 font-semibold">4 Soru</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">5.0 Puan</td>
                    <td className="py-3 px-4 font-bold text-indigo-700">75 Çözümlü Soru</td>
                    <td className="py-3 px-4">8 - 10 Dakika</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-indigo-600">72 - 75</td>
                    <td className="py-3 px-4 font-bold text-slate-900">Paragraf Tamamlama</td>
                    <td className="py-3 px-4 font-semibold">4 Soru</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">5.0 Puan</td>
                    <td className="py-3 px-4 font-bold text-indigo-700">75 Çözümlü Soru</td>
                    <td className="py-3 px-4">8 - 10 Dakika</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-indigo-600">76 - 80</td>
                    <td className="py-3 px-4 font-bold text-slate-900">Anlatım Bütünlüğünü Bozan Cümle (Irrelevant)</td>
                    <td className="py-3 px-4 font-semibold">5 Soru</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">6.25 Puan</td>
                    <td className="py-3 px-4 font-bold text-indigo-700">75 Çözümlü Soru</td>
                    <td className="py-3 px-4">8 - 10 Dakika</td>
                  </tr>
                  <tr className="bg-slate-50 font-black text-slate-900">
                    <td className="py-3 px-4">TOPLAM</td>
                    <td className="py-3 px-4">11 Temel Kategori</td>
                    <td className="py-3 px-4 text-indigo-600">80 Soru</td>
                    <td className="py-3 px-4 text-emerald-600">100 Puan</td>
                    <td className="py-3 px-4 text-indigo-600">1.000 Soru Bankası</td>
                    <td className="py-3 px-4">180 Dakika (3 Saat)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section: Tactical Guide Cards */}
          <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 rounded-3xl p-6 sm:p-10 text-white space-y-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-indigo-300 flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  YDS ve YÖKDİL Yüksek Puan Stratejileri
                </h2>
                <p className="text-xs text-indigo-200">
                  80+ ve 90+ puan hedefleyen adaylar için denenmiş çözüm prensipleri
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="text-base font-bold text-indigo-300 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> 1. Çeviri Sorularından Başlayın
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  İngilizce-Türkçe ve Türkçe-İngilizce çeviri soruları (37-42. sorular), sınavın en az fire verilen ve en hızlı çözülen bölümüdür. Ana fiili bularak 5 dakikada 6 net cebe atılabilir ve sınava yüksek moralle başlanabilir.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="text-base font-bold text-purple-300 flex items-center gap-2">
                  <Layers className="w-4 h-4" /> 2. Bağlaçların Gücü
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  YDS&apos;nin en az 30 sorusu doğrudan veya dolaylı olarak bağlaç bilgisine dayanır. Zıtlık (Although, Whereas), Sebep (Because, Since), Koşul (Unless) ve Ek bilgi (Furthermore) bağlaçlarını soru köklerinde (+ / -) kutuplaşmasıyla test edin.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="text-base font-bold text-pink-300 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> 3. Paragrafı Sona Bırakmayın
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  20 soruluk okuma parçalarını son yarım saate bırakmak zihinsel yorgunluk ve panik yaratır. İlk 36 sorudan sonra paragraflara geçmek veya paragrafları zamana yayarak çözmek odaklanmayı korur.
                </p>
              </div>
            </div>
          </div>

          {/* Section: FAQs Accordion / Cards */}
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
                  YDS Çalışma Bölümü ve Sınav Formatı Hakkında Merak Edilenler
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ydsFaqs.map((faq, idx) => (
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
        </section>
      </div>
    </>
  );
}
