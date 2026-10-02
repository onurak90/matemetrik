import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Trophy, Award, Calculator, School, HelpCircle,
  CheckCircle2, Sparkles, ChevronRight, BookOpen, Star,
  ShieldCheck, AlertCircle, TrendingUp, Users, ArrowRight
} from 'lucide-react';
import TakdirTesekkurTool from '@/components/tools/TakdirTesekkurTool';

export const metadata: Metadata = {
  title: 'Takdir Teşekkür Hesaplama 2024-2025 | E-Okul Karne Notu ve Ortalama Robotu',
  description:
    '4, 5, 6, 7, 8, 9, 10, 11 ve 12. sınıf takdir teşekkür hesaplama robotu. MEB güncel haftalık ders saatleri, ağırlıklı karne notu ortalaması, Türkçe barajı ve devamsızlık şartı kontrolüyle anında öğrenin.',
  keywords: [
    'takdir teşekkür hesaplama',
    'takdir teşekkür hesaplama robotu',
    'karne notu hesaplama',
    'e-okul takdir teşekkür',
    '5. sınıf takdir teşekkür hesaplama',
    '6. sınıf takdir teşekkür hesaplama',
    '7. sınıf takdir teşekkür hesaplama',
    '8. sınıf takdir teşekkür hesaplama',
    '9. sınıf takdir teşekkür hesaplama',
    '10. sınıf takdir teşekkür hesaplama',
    '11. sınıf takdir teşekkür hesaplama',
    '12. sınıf takdir teşekkür hesaplama',
    'lise takdir teşekkür hesaplama',
    'ortaokul karne ortalaması hesaplama',
    'takdir kaç puanla alınır',
    'teşekkür kaç puanla alınır',
  ],
  alternates: {
    canonical: 'https://www.matemetrik.com/takdir-tesekkur-hesaplama',
  },
  openGraph: {
    title: 'Takdir Teşekkür Hesaplama 2024-2025 | Matemetrik',
    description:
      'MEB güncel haftalık ders saatleriyle ilkokul, ortaokul ve lise takdir teşekkür hesaplama robotu. Anında karne notu analizi.',
    url: 'https://www.matemetrik.com/takdir-tesekkur-hesaplama',
    type: 'website',
    images: [
      {
        url: 'https://www.matemetrik.com/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Matemetrik Takdir Teşekkür Hesaplama Robotu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Takdir Teşekkür Hesaplama 2024-2025 | Matemetrik',
    description:
      'Ders notlarınızı girin, MEB ağırlıklı karne ortalamanızı ve Takdir/Teşekkür belgesi kazanıp kazanmadığınızı anında öğrenin.',
    images: ['https://www.matemetrik.com/og.jpg'],
  },
};

const FAQ_ITEMS = [
  {
    q: 'Takdir ve Teşekkür Belgesi Kaç Puanla Alınır?',
    a: 'Milli Eğitim Bakanlığı (MEB) mevzuatına göre dönem sonu ağırlıklı not ortalaması 70.00 – 84.99 arasında olan öğrenciler Teşekkür Belgesi, 85.00 ve üzeri olan öğrenciler ise Takdir Belgesi almaya hak kazanır.',
  },
  {
    q: 'Ortalamam 85 Üzeri Ama Bir Dersim 50 Altı, Takdir Alabilir Miyim?',
    a: 'Hayır. MEB İlköğretim ve Ortaöğretim Kurumları Yönetmeliği uyarınca öğrencinin herhangi bir dersinde 50 puanın altında (zayıf) not bulunması durumunda, genel not ortalaması 85 veya 95 olsa dahi Takdir ya da Teşekkür belgesi verilemez.',
  },
  {
    q: 'Ortaokulda Türkçe Dersi Barajı Kaçtır?',
    a: 'MEB yeni yönetmeliğine göre ortaokul kademesinde (5, 6, 7 ve 8. sınıflar) Türkçe dersinin yıl sonu veya dönem notunun en az 70.00 olması zorunludur. Türkçe notu 70’in altında olan öğrencilere başarı belgesi düzenlenmez.',
  },
  {
    q: 'Lisede Özürsüz Devamsızlık Takdir ve Teşekkür Almayı Engeller Mi?',
    a: 'Evet. MEB Ortaöğretim Kurumları Yönetmeliğine göre lise kademesinde özürsüz devamsızlık süresi 5 günü aşan öğrenciler, dönem not ortalaması ne olursa olsun takdir veya teşekkür belgesi alamazlar.',
  },
  {
    q: 'Dönem Sonu Ağırlıklı Not Ortalaması Nasıl Hesaplanır?',
    a: 'Her bir dersin dönem notu, o dersin haftalık ders saati ile çarpılarak "Ağırlıklı Puan" elde edilir. Tüm derslerin ağırlıklı puanları toplanır ve öğrencinin haftalık toplam ders saatine bölünür.',
  },
];

export default function TakdirTesekkurPage() {
  const jsonLdApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Matemetrik Takdir Teşekkür Hesaplama Robotu',
    description: 'MEB güncel kriterleriyle 4-12. sınıf takdir teşekkür ve karne notu ortalaması hesaplayıcı.',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    url: 'https://www.matemetrik.com/takdir-tesekkur-hesaplama',
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const jsonLdBreadcrumb = {
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
        name: 'Hesaplama Araçları',
        item: 'https://www.matemetrik.com/hesaplama-araclari',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Takdir Teşekkür Hesaplama',
        item: 'https://www.matemetrik.com/takdir-tesekkur-hesaplama',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-900 text-white pt-14 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.25),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10 space-y-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-indigo-300 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-white transition-colors">
              Ana Sayfa
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
            <Link href="/hesaplama-araclari" className="hover:text-white transition-colors">
              Hesaplama Araçları
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
            <span className="text-white font-bold">Takdir Teşekkür Hesaplama</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30 backdrop-blur-md">
              <Trophy className="w-3.5 h-3.5 text-yellow-400" />
              <span>2024-2025 MEB Güncel Yönetmelik Uyumlu</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Takdir Teşekkür <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-emerald-300">Hesaplama Robotu</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              İlkokul (4. sınıf), ortaokul (5, 6, 7, 8. sınıf) ve lise (9, 10, 11, 12. sınıf) kademeleri için MEB haftalık ders saatleriyle ağırlıklı karne ortalamanızı ve takdir/teşekkür belgesi durumunuzu anında hesaplayın.
            </p>
          </div>
        </div>
      </section>

      {/* Main Calculator Tool Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <TakdirTesekkurTool />
      </section>

      {/* Rehber & Kriterler Bilgi Alanı */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-12">
        {/* 3 Kilit MEB Kuralı Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-yellow-50 text-yellow-600 flex items-center justify-center font-black text-xl">
              🏆
            </div>
            <h3 className="text-lg font-bold text-slate-900">Takdir Belgesi Kriteri</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dönem sonu ağırlıklı not ortalaması <strong>85.00 ve üzerinde</strong> olan, hiçbir dersinde zayıfı (50 altı notu) bulunmayan ve disiplin cezası almamış öğrencilere verilir.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-black text-xl">
              🎖️
            </div>
            <h3 className="text-lg font-bold text-slate-900">Teşekkür Belgesi Kriteri</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dönem sonu ağırlıklı not ortalaması <strong>70.00 – 84.99 arasında</strong> olan ve tüm derslerinden başarılı sayılan öğrencilere MEB tarafından verilir.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-black text-xl">
              ⚠️
            </div>
            <h3 className="text-lg font-bold text-slate-900">Zayıf Not ve Devamsızlık</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ortalamanız 90 dahi olsa 1 dersiniz 50&apos;nin altındaysa (ortaokulda Türkçe 70 altıysa) veya lisede özürsüz devamsızlığınız 5 günü geçmişse başarı belgesi alınamaz.
            </p>
          </div>
        </div>

        {/* Sıkça Sorulan Sorular (Google FAQ Rich Snippet Uyumlu) */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-black uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" />
              Merak Edilenler &amp; Sıkça Sorulan Sorular
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Takdir Teşekkür Hesaplama Hakkında Bilmeniz Gerekenler
            </h2>
          </div>

          <div className="divide-y divide-slate-100">
            {FAQ_ITEMS.map((faq, idx) => (
              <div key={idx} className="py-4 space-y-2">
                <h3 className="text-base font-bold text-slate-900 flex items-start gap-2">
                  <span className="text-indigo-600 font-black">Q:</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* İlgili Diğer Eğitim & Sınav Robotları */}
        <div className="space-y-4">
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            İlginizi Çekebilecek Diğer Hesaplama Araçları
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/lgs-puan-hesaplama-robotu"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all group flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  LGS Puan Hesaplama Robotu
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  8. sınıf net ve yüzdelik dilim tahmini
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </Link>

            <Link
              href="/tyt-puan-hesaplama-robotu"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all group flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  TYT Puan Hesaplama Robotu
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  ÖSYM güncel katsayılarıyla üniversite net hesabı
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </Link>

            <Link
              href="/ilkokul-etkinlikleri"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all group flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  İlkokul Etkinlikleri &amp; PDF İndir
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  1-4. sınıf ders etkinlikleri, çalışma fasikülleri ve indirilebilir PDF materyalleri
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
