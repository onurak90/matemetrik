import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Award, Calculator, GraduationCap, BookOpen, Sparkles, CheckCircle2,
  ChevronRight, HelpCircle, School, Layers, ShieldCheck,
  TrendingUp, Percent, Trophy, Calendar, Users, FileText, Check, ArrowRight
} from 'lucide-react';
import ScoreCalculatorTool from '@/components/tools/ScoreCalculatorTool';

export const metadata: Metadata = {
  title: '2026 LGS Puan Hesaplama Robotu | 8. Sınıf Net ve Yüzdelik Dilim - Matemetrik',
  description:
    '2026-2027 MEB güncel katsayılarıyla 8. sınıf LGS puan hesaplama robotu. Türkçe (4), Matematik (4), Fen (4), İnkılap (1), Din (1) ve İngilizce (1) katsayılarıyla LGS puanınızı ve tahmini yüzdelik diliminizi anında hesaplayın.',
  keywords: [
    'lgs puan hesaplama',
    'lgs puan hesaplama robotu',
    'lgs net hesaplama',
    'lgs yüzdelik dilim hesaplama',
    '2026 lgs puan hesaplama',
    '8 sınıf lgs puan hesaplama',
    'meb lgs hesaplama motoru',
    'lgs katsayıları 2026',
    'öğretmen lgs robotu',
  ],
  alternates: {
    canonical: 'https://www.matemetrik.com/lgs-puan-hesaplama-robotu',
  },
  openGraph: {
    title: '2026 LGS Puan Hesaplama Robotu | Matemetrik',
    description:
      'MEB güncel katsayılarıyla LGS puanı ve tahmini yüzdelik dilim hesaplama aracı.',
    url: 'https://www.matemetrik.com/lgs-puan-hesaplama-robotu',
    type: 'website',
    images: [
      {
        url: 'https://www.matemetrik.com/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Matemetrik 2026 LGS Puan Hesaplama Robotu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026 LGS Puan Hesaplama Robotu | Matemetrik',
    description:
      'LGS netlerinizi girin, 500 tam puan üzerinden MEB standart sapmalı LGS puanınızı ve yüzdelik diliminizi hesaplayın.',
    images: ['https://www.matemetrik.com/og.jpg'],
  },
};

export default function LgsPuanHesaplamaPage() {
  const jsonLdApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Matemetrik 2026 LGS Puan Hesaplama Robotu',
    description: 'MEB güncel katsayılarıyla 8. sınıf LGS puanı ve yüzdelik dilim hesaplama aracı.',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    url: 'https://www.matemetrik.com/lgs-puan-hesaplama-robotu',
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
              <Link href="/puan-hesaplama-robotu" className="hover:text-indigo-600 transition-colors">
                Puan Hesaplama
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-indigo-600 font-bold truncate">
                LGS Puan Hesaplama Robotu
              </span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-indigo-50/25 to-slate-50/50 border-b border-slate-200/80 pt-12 pb-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold border border-indigo-200">
                <Award className="w-3.5 h-3.5 text-indigo-600" />
                <span>2026 MEB Liselere Geçiş Sistemi (LGS) Hesaplayıcı</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                2026 LGS Puan Hesaplama Robotu
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                MEB güncel katsayıları ve standart sapma formülü ile 8. sınıf LGS puanınızı ve tahmini yüzdelik diliminizi anında hesaplayın.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Engine (Preselected LGS tab) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <ScoreCalculatorTool initialTab="lgs" />
        </section>

        {/* Switch Link to YKS Robot */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-purple-50/80 border border-purple-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-slate-900 text-sm">YKS (TYT, AYT, YDT) Puanı mı hesaplamak istiyorsunuz?</div>
                <div className="text-xs text-slate-600">ÖSYM güncel katsayılarıyla YKS Sayısal, Eşit Ağırlık, Sözel ve Dil puanı hesaplayıcı</div>
              </div>
            </div>
            <Link
              href="/yks-puan-hesaplama-robotu"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
            >
              YKS Robotuna Git <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
