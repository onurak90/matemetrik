import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ChevronRight, BookOpen, Layers, Sparkles, Award,
  Compass, AlertTriangle, ShieldCheck, ArrowRight, ArrowLeft
} from 'lucide-react';
import { getYdsTopics, getYdsTopic, getYdsQuestions } from '@/lib/yds';
import YdsTestEngine from '@/components/yds/YdsTestEngine';

interface Props {
  params: { topic: string };
}

export async function generateStaticParams() {
  const topics = getYdsTopics();
  return topics.map((t) => ({
    topic: t.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const topic = getYdsTopic(params.topic);
  if (!topic) {
    return {
      title: 'Konu Bulunamadı | YDS Hazırlık - Matemetrik',
    };
  }

  const title = `${topic.title} Testi & Çözümlü Sorular (${topic.questionCount} Soru) | YDS Hazırlık - Matemetrik`;
  const description = `${topic.title} (${topic.englishTitle}) için ÖSYM ve YÖKDİL standartlarında hazırlanmış ${topic.questionCount} adet açıklamalı çözümlü soru, soru çözüm taktikleri ve interaktif test.`;

  return {
    title,
    description,
    keywords: [
      `yds ${topic.id}`,
      `yds ${topic.title.toLowerCase()}`,
      `yökdil ${topic.id}`,
      `yds ${topic.englishTitle.toLowerCase()}`,
      'yds soru bankası',
      'yds çıkmış sorular',
      'yds online test çöz',
    ],
    alternates: {
      canonical: `https://www.matemetrik.com/yds-calisma-bolumu/${params.topic}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.matemetrik.com/yds-calisma-bolumu/${params.topic}`,
      type: 'article',
      images: [
        {
          url: 'https://www.matemetrik.com/og.jpg',
          width: 1200,
          height: 630,
          alt: `${topic.title} YDS Testi`,
        },
      ],
    },
  };
}

export default function YdsTopicPage({ params }: Props) {
  const topic = getYdsTopic(params.topic);
  if (!topic) {
    notFound();
  }

  const questions = getYdsQuestions(params.topic);
  const allTopics = getYdsTopics();
  const otherTopics = allTopics.filter((t) => t.id !== topic.id);

  // Schema: Quiz & Learning Resource
  const quizSchema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: `${topic.title} YDS & YÖKDİL Testi`,
    description: topic.description,
    educationalLevel: 'Advanced',
    typicalAgeRange: '18-',
    about: {
      '@type': 'Thing',
      name: topic.title,
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
        name: 'YDS Çalışma Bölümü',
        item: 'https://www.matemetrik.com/yds-calisma-bolumu',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: topic.title,
        item: `https://www.matemetrik.com/yds-calisma-bolumu/${topic.id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
              <Link
                href="/yds-calisma-bolumu"
                className="hover:text-indigo-600 transition-colors"
              >
                YDS Çalışma Bölümü
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-indigo-600 font-bold truncate">
                {topic.title}
              </span>
            </nav>
          </div>
        </div>

        {/* Topic Header Banner */}
        <section className="bg-white border-b border-slate-200/80 pt-8 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                {topic.badge}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                Sınavda {topic.totalInRealExam} Soru
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                {questions.length} Çözümlü Soru
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                {topic.title}
              </h1>
              <p className="text-sm font-medium text-slate-400">
                {topic.englishTitle}
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
              {topic.description}
            </p>
          </div>
        </section>

        {/* Tactical Overview & Strategy Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Taktik */}
            <div className="bg-white p-5 rounded-3xl border border-indigo-100 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-xs font-extrabold text-indigo-700">
                <Compass className="w-4 h-4 text-indigo-600" />
                <span>ÖSYM Soru Çözüm Taktiği</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {topic.tacticalOverview}
              </p>
            </div>

            {/* Temel Kurallar */}
            <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Temel Kurallar &amp; Formüller</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                {topic.keyRules.map((rule, rIdx) => (
                  <li key={rIdx} className="leading-relaxed">
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sık Yapılan Hatalar */}
            <div className="bg-white p-5 rounded-3xl border border-rose-100 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-xs font-extrabold text-rose-700">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Sık Yapılan Hatalar &amp; Çeldiriciler</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                {topic.frequentMistakes.map((mistake, mIdx) => (
                  <li key={mIdx} className="leading-relaxed">
                    {mistake}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Main Interactive Test Engine */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <YdsTestEngine
            topicId={topic.id}
            topicTitle={topic.title}
            questions={questions}
          />
        </section>

        {/* Other YDS Topics Footer Navigator */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              Diğer YDS Çalışma Konuları
            </h3>
            <Link
              href="/yds-calisma-bolumu"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1"
            >
              Tüm 11 Konuyu Gör &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {otherTopics.slice(0, 5).map((ot) => (
              <Link
                key={ot.id}
                href={`/yds-calisma-bolumu/${ot.id}`}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all group"
              >
                <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider mb-1">
                  {ot.badge}
                </div>
                <div className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {ot.title}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {ot.questionCount} Soru &rarr;
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
