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
  title: '2026 TYT Puan Hesaplama Robotu | 120 Soru Net ve Sıralama Hesaplama - Matemetrik',
  description:
    '2026-2027 ÖSYM güncel katsayılarıyla TYT puan hesaplama robotu. Türkçe (40), Matematik (40), Sosyal (20) ve Fen (20) netlerinizi girin, TYT puanınızı ve tahmini sıralamanızı anında görün.',
  keywords: [
    'tyt puan hesaplama',
    'tyt net hesaplama',
    '2026 tyt puan hesaplama robotu',
    'tyt sıralama hesaplama',
    'tyt baraj puanı',
    'önlisans puan hesaplama',
    'polislik pmyo puan hesaplama',
    'tyt türkçe net hesaplama',
    'tyt matematik net hesaplama',
    'öğretmen tyt robotu',
  ],
  alternates: {
    canonical: 'https://www.matemetrik.com/tyt-puan-hesaplama-robotu',
  },
  openGraph: {
    title: '2026 TYT Puan Hesaplama Robotu | Matemetrik',
    description:
      '120 soru üzerinden güncel ÖSYM katsayılarıyla TYT ham puan, yerleştirme puanı ve başarı sırası hesaplayıcı.',
    url: 'https://www.matemetrik.com/tyt-puan-hesaplama-robotu',
    type: 'website',
    images: [
      {
        url: 'https://www.matemetrik.com/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Matemetrik 2026 TYT Puan Hesaplama Robotu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026 TYT Puan Hesaplama Robotu | Matemetrik',
    description:
      'TYT netlerinizi girin; 165 dakikalık sınav formatında puanınızı ve sıralamanızı anında görün.',
    images: ['https://www.matemetrik.com/og.jpg'],
  },
};

const tytFaqs = [
  {
    question: 'TYT sınavında kaç soru sorulur ve sınav süresi kaç dakikadır?',
    answer:
      'TYT’de toplam 120 soru sorulur: Türkçe (40 soru), Temel Matematik (40 soru), Sosyal Bilimler (Tarih 5, Coğrafya 5, Felsefe 5, Din Kültürü 5 olmak üzere 20 soru) ve Fen Bilimleri (Fizik 7, Kimya 7, Biyoloji 6 olmak üzere 20 soru). Sınav süresi 165 dakikadır.',
  },
  {
    question: 'TYT puanıyla hangi bölümlere yerleşilebilir?',
    answer:
      'TYT puanı ile 2 yıllık meslek yüksekokulu (önlisans) programlarına, Polis Meslek Yüksekokulları’na (PMYO), Astsubay Meslek Yüksekokulları’na (MYO) ve özel yetenek sınavıyla öğrenci alan beden eğitimi, resim, müzik gibi lisans programlarına tercih yapılabilir.',
  },
  {
    question: 'TYT’nin 4 yıllık lisans (AYT) yerleştirmesine etkisi nedir?',
    answer:
      '4 yıllık lisans programlarına yerleşirken TYT puanınızın %40’ı, AYT (Alan Yeterlilik Testi) puanınızın ise %60’ı alınır. Bu nedenle TYT, AYT puanınızın neredeyse yarısını oluşturacak kadar kritik bir etkiye sahiptir.',
  },
];

export default function TytPuanHesaplamaPage() {
  const jsonLdApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Matemetrik 2026 TYT Puan Hesaplama Robotu',
    description: '120 soru üzerinden güncel ÖSYM katsayılarıyla TYT puan ve sıralama hesaplama aracı.',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    url: 'https://www.matemetrik.com/tyt-puan-hesaplama-robotu',
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdApp) }}
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
              <Link href="/yks-puan-hesaplama-robotu" className="hover:text-indigo-600 transition-colors">
                YKS &amp; TYT
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-indigo-600 font-bold truncate">
                TYT Puan Hesaplama Robotu
              </span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-indigo-50/25 to-slate-50/50 border-b border-slate-200/80 pt-12 pb-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold border border-indigo-200">
                <Calculator className="w-3.5 h-3.5 text-indigo-600" />
                <span>2026 ÖSYM Temel Yeterlilik Testi Hesaplama Aracı</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                2026 TYT Puan Hesaplama Robotu
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                ÖSYM güncel katsayılarına göre 120 soruluk Temel Yeterlilik Testi netlerinizi girin; 100-500 arası ham puanınızı, OBP katkısını ve tahmini TYT başarı sıralamanızı anında hesaplayın.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Engine (Preselected YKS tab) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <ScoreCalculatorTool initialTab="yks" />
        </section>

        {/* Educational Info */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 space-y-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-black text-slate-900">TYT Test ve Soru Dağılımı</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-2xl border text-center">
                <div className="text-xs text-slate-500 font-bold">Türkçe</div>
                <div className="text-2xl font-black text-indigo-600">40 Soru</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border text-center">
                <div className="text-xs text-slate-500 font-bold">Matematik</div>
                <div className="text-2xl font-black text-indigo-600">40 Soru</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border text-center">
                <div className="text-xs text-slate-500 font-bold">Sosyal Bilimler</div>
                <div className="text-2xl font-black text-emerald-600">20 Soru</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border text-center">
                <div className="text-xs text-slate-500 font-bold">Fen Bilimleri</div>
                <div className="text-2xl font-black text-purple-600">20 Soru</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-black text-slate-900">TYT Sıkça Sorulan Sorular</h2>
            <div className="space-y-3 pt-2">
              {tytFaqs.map((f, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                  <div className="font-bold text-slate-900 text-sm">{f.question}</div>
                  <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">{f.answer}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
