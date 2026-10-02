import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen, Sparkles, CheckCircle2, ChevronRight,
  GraduationCap, Download, Star, HelpCircle, Layers
} from 'lucide-react';
import { getPosts } from '@/lib/db';
import IlkokulEtkinlikleriClient from '@/components/ilkokul/IlkokulEtkinlikleriClient';

export const metadata: Metadata = {
  title: 'İlkokul Etkinlikleri ve Çalışma Kağıtları (1, 2, 3, 4. Sınıf PDF İndir) - Matemetrik',
  description:
    '1. sınıf, 2. sınıf, 3. sınıf ve 4. sınıf Türkçe, Matematik, Hayat Bilgisi, Okuma-Yazma harf grupları ve belirli günler için MEB uyumlu ücretsiz PDF etkinlik ve çalışma kağıtları.',
  keywords: [
    'ilkokul etkinlikleri',
    'ilkokul çalışma kağıtları',
    '1 sınıf etkinlikleri pdf',
    '2 sınıf matematik etkinlikleri',
    '3 sınıf çalışma kağıdı',
    '4 sınıf etkinlikleri',
    'okuma yazma etkinlikleri',
    'harf çalışmaları pdf',
    'ritmik sayma çalışma kağıdı',
    'toplama işlemi etkinlikleri',
    'meb ilkokul etkinlik',
  ],
  alternates: {
    canonical: 'https://www.matemetrik.com/ilkokul-etkinlikleri',
  },
  openGraph: {
    title: 'İlkokul Etkinlikleri ve Çalışma Kağıtları (PDF İndir) | Matemetrik',
    description:
      '1, 2, 3 ve 4. sınıf öğrencileri için özenle hazırlanan eğitici ve eğlenceli çalışma kağıtları, interaktif boyama sayfaları ve PDF materyalleri.',
    url: 'https://www.matemetrik.com/ilkokul-etkinlikleri',
    type: 'website',
    images: [
      {
        url: 'https://www.matemetrik.com/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Matemetrik İlkokul Etkinlikleri ve Çalışma Kağıtları',
      },
    ],
  },
};

const faqs = [
  {
    question: 'İlkokul etkinlik kağıtları MEB Maarif Modeli ile uyumlu mu?',
    answer:
      'Evet. Matemetrik üzerinde paylaşılan tüm 1, 2, 3 ve 4. sınıf etkinlikleri, Millî Eğitim Bakanlığı güncel müfredat kazanımları ve Türkiye Yüzyılı Maarif Modeli öğretim ilkelerine %100 uyumlu olarak hazırlanmaktadır.',
  },
  {
    question: 'PDF çalışma kağıtlarını indirmek için üyelik veya ücret gerekiyor mu?',
    answer:
      'Hayır. Matemetrik platformundaki tüm ilkokul etkinlik kağıtları, boyama sayfaları, dikte bulmacaları ve konu testleri tamamen ücretsizdir. Hiçbir kayıt gerekmeden doğrudan indirebilirsiniz.',
  },
  {
    question: 'Çalışma kağıtları yazıcı çıktısına uygun mu?',
    answer:
      'Tüm dosyalar standart A4 kağıt ölçüsünde ve yüksek çözünürlüklü vektör/baskı kalitesinde PDF olarak optimize edilmiştir. Okulda veya evde yazıcınızdan net çıktılar alabilirsiniz.',
  },
  {
    question: 'Öğretmenler bu dokümanları sınıfta fotokopi ile çoğaltabilir mi?',
    answer:
      'Evet, sınıf öğretmenlerimiz ve velilerimiz eğitim amaçlı olarak çalışma kağıtlarını diledikleri kadar çoğaltarak öğrencilerine uygulayabilirler.',
  },
];

export const dynamic = 'force-dynamic';

export default async function IlkokulEtkinlikleriPage() {
  const result = getPosts({
    category: ['1-sinif', '2-sinif', '3-sinif', '4-sinif', 'ilkokul-etkinlikleri'],
    limit: 300,
  });

  const posts = result.posts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt || '',
    category: p.category,
    category_slug: p.category_slug,
    tags: p.tags,
    created_at: p.created_at,
    views: p.views,
  }));

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'İlkokul Etkinlikleri ve Çalışma Kağıtları (PDF İndir)',
    description: '1-4. Sınıf tüm dersler için MEB uyumlu ücretsiz PDF etkinlik arşivi.',
    url: 'https://www.matemetrik.com/ilkokul-etkinlikleri',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.slice(0, 30).map((post, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `https://www.matemetrik.com/post/${post.slug}`,
        name: post.title,
      })),
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-900 text-white pt-12 pb-16 sm:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-indigo-200 mb-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Ana Sayfa
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">İlkokul Etkinlikleri</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-amber-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MEB Maarif Modeli &amp; 2026-2027 Müfredatına Uygun</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              İlkokul Etkinlikleri ve{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-indigo-300">
                Çalışma Kağıtları
              </span>
            </h1>

            <p className="text-base sm:text-lg text-indigo-100/90 leading-relaxed font-normal">
              1, 2, 3 ve 4. sınıf öğrencileri için Matematik, Türkçe, Okuma-Yazma harf setleri,
              Hayat Bilgisi ve Belirli Günler alıştırmaları. Tamamı A4 baskıya uygun, özgün ve ücretsiz
              indirilebilir PDF arşivi.
            </p>

            {/* Quick stats banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-black text-amber-300">100+</div>
                <div className="text-xs text-indigo-200">Özgün Etkinlik</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-black text-emerald-400">%100</div>
                <div className="text-xs text-indigo-200">Ücretsiz İndirme</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-black text-pink-400">1-4. Sınıf</div>
                <div className="text-xs text-indigo-200">Tüm Kademeler</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-black text-cyan-300">A4 Baskı</div>
                <div className="text-xs text-indigo-200">300 DPI Kalite</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <IlkokulEtkinlikleriClient posts={posts} />

        {/* Informative Educational Guide Section */}
        <section className="mt-16 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span>🌟</span> İlkokulda Çalışma Kağıtlarının ve Etkinliklerin Önemi
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              İlkokul dönemi, çocukların soyut kavramları henüz tam olarak zihinlerinde yapılandıramadığı,
              somuttan soyuta geçiş evresidir. Bu yaş grubundaki çocuklarda okuma-yazma, dört işlem becerisi,
              problem çözme ve analitik düşünme gibi temel yetkinlikler ancak dokunarak, boyayarak, çizerek ve
              etkileşimli alıştırmalar yaparak kalıcı hale gelir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base">Okuma-Yazma ve Harf Algısı</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                1. sınıf öğrencileri için ses gruplarına özel fasiküller, dikte bulmacaları ve piramit
                okuma kartları ile hece birleştirme ve akıcı okuma becerisi hızla kazanılır.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base">Matematiksel Düşünme</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ritmik saymalar, eldeli toplama, çıkarma ve çarpma tuzlukları gibi oyunlaştırılmış materyallerle
                matematik korkusu yerini merak ve başarı hissine bırakır.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base">Öz Denetim ve Odaklanma</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yönerge takibi gerektiren zenginleştirilmiş çalışma yaprakları, çocukların dikkat süresini
                uzatır ve bireysel çalışma disiplinini geliştirir.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-12 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Sıkça Sorulan Sorular</h2>
              <p className="text-xs text-slate-500">İlkokul etkinlikleri ve PDF indirme hakkında merak edilenler</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {faqs.map((faq, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2">
                <h3 className="font-bold text-slate-900 text-sm">{faq.question}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
