import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText, Sparkles, CheckCircle2, ChevronRight, HelpCircle,
  Printer, Camera, ShieldCheck, Layers, BookOpen, ArrowRight,
  School, Zap, Award
} from 'lucide-react';
import ExamMakerTool from '@/components/tools/ExamMakerTool';

export const metadata: Metadata = {
  title: 'MEB Sınav Hazırlama Robotu | Online Yazılı Kağıdı Oluşturucu & PDF İndir',
  description:
    'Öğretmenler için soru fotoğraflarını resmi MEB formatında çift sütunlu yazılı kağıdına dönüştüren ücretsiz akıllı robot. Cevap satır boşluklarını belirleyin, okul antetini düzenleyin, tek tıkla A4 PDF indirin.',
  keywords: [
    'sınav hazırlama robotu',
    'meb yazılı kağıdı hazırlama',
    'çift sütunlu sınav kağıdı',
    'online yazılı hazırlama programı',
    'açık uçlu sınav kağıdı oluşturucu',
    'matematik sınav kağıdı hazırlama',
    'yazılı soruları pdf indir',
    'öğretmen sınav robotu',
  ],
  alternates: {
    canonical: 'https://www.matemetrik.com/sinav-hazirlama-robotu',
  },
  openGraph: {
    title: 'MEB Sınav Hazırlama Robotu | Online Yazılı Kağıdı Oluşturucu',
    description:
      'Öğretmenler için soru fotoğraflarını çift sütunlu MEB ortak sınav kağıdına dönüştüren akıllı robot. Tek tıkla yazdırılabilir PDF oluşturun.',
    url: 'https://www.matemetrik.com/sinav-hazirlama-robotu',
    type: 'website',
    images: [
      {
        url: 'https://www.matemetrik.com/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Matemetrik MEB Sınav Hazırlama Robotu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MEB Sınav Hazırlama Robotu | Online Yazılı Kağıdı Oluşturucu',
    description:
      'Soru fotoğraflarını yükleyin, çift sütunlu MEB sınav kağıdınızı tek tıkla PDF olarak indirin.',
    images: ['https://www.matemetrik.com/og.jpg'],
  },
};

const examFaqs = [
  {
    question: 'Sınav Hazırlama Robotu hangi resim ve soru formatlarını destekler?',
    answer:
      'Robotumuz cep telefonuyla çekilmiş soru fotoğrafları, ekran görüntüleri (screenshot), taranmış sorular ve PNG, JPG, JPEG, WEBP gibi tüm popüler görsel formatlarını destekler. Bilgisayarınızdan veya telefonunuzdan aynı anda çok sayıda soruyu topluca seçip yükleyebilirsiniz.',
  },
  {
    question: 'MEB 2025-2026 ortak sınav ve açık uçlu soru standartlarına uygun mudur?',
    answer:
      'Evet. Sistemimiz Milli Eğitim Bakanlığı (MEB) tarafından yayınlanan ortak sınav kılavuzlarındaki resmi antet yapısı (Okul Adı, Sınav Dönemi, Öğrenci Ad-Soyad-Numara tablosu) ve açık uçlu sorular için ayrılan çizgili/çözümlü boşluk düzenine %100 uygundur.',
  },
  {
    question: 'Çift sütun ve tek sütun düzeni nasıl çalışır, kağıt tasarrufu sağlar mı?',
    answer:
      'Çift sütun düzeni, standart A4 sayfasını gazete veya ÖSYM/MEB kitapçığı formatında yan yana 2 kolona böler. Bu sayede soru fotoğrafları ve cevap alanları en ideal ölçekte yerleşir; 4 sayfalık klasik bir sınav 1 veya 2 A4 sayfasına sığarak %50’ye varan fotokopi ve kağıt tasarrufu sağlar.',
  },
  {
    question: 'Sarı çerçeveli hatırlatıcı alanlar çıktıda veya PDF’te görünür mü?',
    answer:
      'Hayır. Ekranda öğretmenlerimize kolaylık sağlamak amacıyla gösterilen sarı ve kesikli uyarı çerçeveleri sadece düzenleme esnasında ekranda görünür. Yazdır veya PDF İndir butonuna bastığınızda bu çerçeveler tamamen kaybolur ve resmi, tertemiz bir yazılı kağıdı basılır.',
  },
  {
    question: 'Sınav Hazırlama Robotu ücretli midir veya üyelik gerektirir mi?',
    answer:
      'Hayır, Matemetrik platformundaki Sınav Hazırlama Robotu öğretmenlerimiz ve eğitimcilerimiz için tamamen ücretsizdir. Herhangi bir üyelik, kayıt veya giriş şartı olmadan dilediğiniz kadar sınav kağıdı hazırlayabilir ve PDF olarak indirebilirsiniz.',
  },
];

export default function SinavHazirlamaPage() {
  // Schema.org WebApplication & BreadcrumbList & FAQPage
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Matemetrik Sınav Hazırlama Robotu',
    url: 'https://www.matemetrik.com/sinav-hazirlama-robotu',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description:
      'Öğretmenler için soru fotoğraflarını resmi MEB formatında çift sütunlu yazılı kağıdına dönüştüren akıllı robot.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'TRY',
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
        name: 'Sınav Hazırlama Robotu',
        item: 'https://www.matemetrik.com/sinav-hazirlama-robotu',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: examFaqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <div className="py-8 sm:py-12 pb-24 space-y-12">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumbs (Hidden in Print) */}
        <nav className="ekran-gizle flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Ana Sayfa
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-900 font-semibold truncate">
            Sınav Hazırlama Robotu
          </span>
        </nav>

        {/* Hero Banner Header (Hidden in Print) */}
        <div className="ekran-gizle bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-indigo-900/50">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Resmi MEB Uyumlu Öğretmen Asistanı
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              MEB Sınav Hazırlama Robotu &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">Yazılı Kağıdı Oluşturucu</span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Sorularınızın fotoğraflarını yükleyin, çift sütunlu veya tek sütunlu sayfa düzeninizi seçin, cevap satır boşluklarını saniyeler içinde ayarlayıp <strong>resmi A4 sınav kağıdınızı tek tıkla PDF olarak indirin</strong>.
            </p>
          </div>
        </div>

        {/* THE INTERACTIVE EXAM MAKER TOOL COMPONENT */}
        <ExamMakerTool />

        {/* RICH SEO & INFORMATIVE SECTION (Hidden in Print) */}
        <section className="ekran-gizle pt-12 border-t border-slate-200 space-y-12">
          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Toplu Fotoğraf Yükleme
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kitaplardan çektiğiniz soru fotoğraflarını tek tek kırpmakla uğraşmayın. Çoklu seçimle sorularınızı yükleyin, robot otomatik sıralasın.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Çift Sütun &amp; Kağıt Tasarrufu
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                MEB ve ÖSYM sınav kitapçığı standartlarında çift sütunlu yerleşim ile soru ve cevap alanları mükemmel dengelenir; fotokopi masrafı %50 azalır.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Akıllı Hatırlatıcı Sistem
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Okul adı, öğretmen ismi veya tarih bilgilerini unutmaya son! Değiştirilmeyen alanlar sarı renkle uyarır ve yazdırmadan önce sizi teyit eder.
              </p>
            </div>
          </div>

          {/* Detailed SEO Explanation */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                MEB Uyumlu Sınav Kağıdı Nasıl Hazırlanır? 4 Kolay Adım
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Milli Eğitim Bakanlığı’nın getirdiği ortak sınav senaryoları ve açık uçlu soru standartları doğrultusunda sınav hazırlamak artık saatler sürmüyor. Matemetrik Sınav Hazırlama Robotu ile şu adımları izleyebilirsiniz:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  1
                </div>
                <h4 className="font-bold text-xs text-slate-900">Fotoğrafları Seçin</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Telefonunuzdan veya bilgisayarınızdan hazırladığınız soru fotoğraflarını topluca yükleyin.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  2
                </div>
                <h4 className="font-bold text-xs text-slate-900">Düzeni Belirleyin</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Çift sütun veya tek sütun seçeneğiyle sorularınızın sayfadaki yerleşimini belirleyin.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  3
                </div>
                <h4 className="font-bold text-xs text-slate-900">Cevap Boşlukları</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Sorunun zorluğuna göre 3, 5, 7 veya 10 satırlık çözüm alanını tek tıkla tanımlayın.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  4
                </div>
                <h4 className="font-bold text-xs text-slate-900">Tek Tıkla PDF</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Okul antetini doldurup "PDF Olarak Kaydet / Yazdır" butonuna basarak anında hazır çıktınızı alın.
                </p>
              </div>
            </div>

            {/* Internal links to other tools & categories */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="text-slate-600">
                Diğer öğretmen araçlarımızı denediniz mi?
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/karne-gorusu-ureticisi"
                  className="inline-flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-800"
                >
                  Karne Görüşü Robotu &rarr;
                </Link>
                <Link
                  href="/kategori/meb-ders-kitabi-cevaplari"
                  className="inline-flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-800"
                >
                  MEB Ders Kitabı Cevapları &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* SSS Accordion Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Sıkça Sorulan Sorular (SSS)
              </h2>
            </div>

            <div className="divide-y divide-slate-100">
              {examFaqs.map((faq, idx) => (
                <div key={idx} className="py-4 space-y-2">
                  <h3 className="text-sm font-bold text-slate-900">
                    {faq.question}
                  </h3>
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
  );
}
