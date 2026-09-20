'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, BookOpen, Sparkles, CheckCircle2, ChevronRight,
  GraduationCap, Layers, Video, FileText, ArrowRight, X
} from 'lucide-react';

export interface TopicItem {
  grade_num: number;
  grade_str: string;
  subject: string;
  topic: string;
  slug: string;
  title: string;
  excerpt: string;
  featured_image: string;
  category_slug: string;
  category_name: string;
  question_count: number;
}

interface Props {
  topics: TopicItem[];
}

export default function KonuAnlatimlariClient({ topics }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKademe, setSelectedKademe] = useState<'all' | 'ilkokul' | 'ortaokul' | 'lise'>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  // Filter topics
  const filteredTopics = useMemo(() => {
    return topics.filter((item) => {
      // Kademe filter
      if (selectedKademe === 'ilkokul' && (item.grade_num < 1 || item.grade_num > 4)) return false;
      if (selectedKademe === 'ortaokul' && (item.grade_num < 5 || item.grade_num > 8)) return false;
      if (selectedKademe === 'lise' && (item.grade_num < 9 || item.grade_num > 12)) return false;

      // Subject filter
      if (selectedSubject !== 'all') {
        if (selectedSubject === 'Matematik' && !item.subject.includes('Matematik')) return false;
        if (selectedSubject === 'Türkçe' && !item.subject.includes('Türkçe') && !item.subject.includes('Edebiyat')) return false;
        if (selectedSubject === 'Fen Bilimleri' && !item.subject.includes('Fen') && !item.subject.includes('Fizik') && !item.subject.includes('Kimya') && !item.subject.includes('Biyoloji')) return false;
        if (selectedSubject === 'Sosyal' && !item.subject.includes('Sosyal') && !item.subject.includes('Hayat') && !item.subject.includes('Tarih')) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTopic = item.topic.toLowerCase().includes(q);
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesGrade = item.grade_str.toLowerCase().includes(q);
        const matchesSubject = item.subject.toLowerCase().includes(q);
        if (!matchesTopic && !matchesTitle && !matchesGrade && !matchesSubject) {
          return false;
        }
      }

      return true;
    });
  }, [topics, selectedKademe, selectedSubject, searchQuery]);

  // Group by Grade -> Subject
  const groupedByGrade = useMemo(() => {
    const gradesMap: { [grade: number]: { [subject: string]: TopicItem[] } } = {};

    for (const t of filteredTopics) {
      if (!gradesMap[t.grade_num]) {
        gradesMap[t.grade_num] = {};
      }
      if (!gradesMap[t.grade_num][t.subject]) {
        gradesMap[t.grade_num][t.subject] = [];
      }
      gradesMap[t.grade_num][t.subject].push(t);
    }

    // Sort grades ascending
    const sortedGrades = Object.keys(gradesMap)
      .map(Number)
      .sort((a, b) => a - b);

    return sortedGrades.map((gNum) => ({
      grade_num: gNum,
      grade_str: `${gNum}. Sınıf`,
      subjects: gradesMap[gNum],
    }));
  }, [filteredTopics]);

  return (
    <div className="space-y-10">
      {/* Search & Filter Bar */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Örn: 6. Sınıf Kesirler, 8. Sınıf Özneler, Trigonometri, Limit, Basınç..."
            className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-2 border-t border-slate-100">
          {/* Kademe Selector */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
            <button
              onClick={() => setSelectedKademe('all')}
              className={`px-3 py-2 rounded-xl transition-colors ${
                selectedKademe === 'all'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tüm Kademeler
            </button>
            <button
              onClick={() => setSelectedKademe('ilkokul')}
              className={`px-3 py-2 rounded-xl transition-colors ${
                selectedKademe === 'ilkokul'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              İlkokul (1-4)
            </button>
            <button
              onClick={() => setSelectedKademe('ortaokul')}
              className={`px-3 py-2 rounded-xl transition-colors ${
                selectedKademe === 'ortaokul'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ortaokul &amp; LGS (5-8)
            </button>
            <button
              onClick={() => setSelectedKademe('lise')}
              className={`px-3 py-2 rounded-xl transition-colors ${
                selectedKademe === 'lise'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lise &amp; YKS (9-12)
            </button>
          </div>

          {/* Subject Selector */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
            {[
              { id: 'all', label: 'Tüm Dersler' },
              { id: 'Matematik', label: 'Matematik' },
              { id: 'Türkçe', label: 'Türkçe & Edebiyat' },
              { id: 'Fen Bilimleri', label: 'Fen & Fizik & Kimya' },
              { id: 'Sosyal', label: 'Sosyal & Hayat Bilgisi' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSubject(s.id)}
                className={`px-3 py-1.5 rounded-xl border transition-all ${
                  selectedSubject === s.id
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters & Match Count */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>Toplam <strong>{filteredTopics.length}</strong> konu anlatım rehberi listeleniyor</span>
          {(searchQuery || selectedKademe !== 'all' || selectedSubject !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedKademe('all');
                setSelectedSubject('all');
              }}
              className="text-indigo-600 hover:underline font-bold"
            >
              Filtreleri Temizle
            </button>
          )}
        </div>
      </div>

      {/* Main Content: Grouped by Grade & Subject */}
      {groupedByGrade.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto text-2xl font-bold">
            🔍
          </div>
          <h3 className="text-lg font-bold text-slate-900">Aradığınız kriterlere uygun konu bulunamadı</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Arama terimini değiştirmeyi veya filtreleri temizleyerek tüm müfredatı görüntülemeyi deneyebilirsiniz.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {groupedByGrade.map((gradeGroup) => (
            <section
              key={gradeGroup.grade_num}
              className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8"
              id={`sinif-${gradeGroup.grade_num}`}
            >
              {/* Grade Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center font-black text-xl shadow-md">
                    {gradeGroup.grade_num}
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {gradeGroup.grade_str} Konu Anlatımları
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      2026-2027 MEB müfredatına tam uyumlu ders içerikleri, 20 soruluk testler ve çözümler
                    </p>
                  </div>
                </div>

                <Link
                  href={`/kategori/${gradeGroup.grade_num}-sinif`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 text-xs font-bold transition-colors self-start sm:self-auto border border-slate-200/80"
                >
                  <span>Tüm {gradeGroup.grade_str} İçerikleri</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Subjects inside Grade */}
              <div className="space-y-8">
                {Object.entries(gradeGroup.subjects).map(([subjName, topicItems]) => (
                  <div key={subjName} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                      <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                        {subjName} Dersi
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
                        {topicItems.length} Konu
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {topicItems.map((t) => (
                        <Link
                          key={t.slug}
                          href={`/post/${t.slug}`}
                          className="group p-5 rounded-2xl bg-slate-50/70 border border-slate-200/90 hover:border-indigo-400 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
                        >
                          <div className="space-y-3">
                            {/* Badges */}
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                                📖 Konu Anlatımı
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                                📝 20 Soru Test
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-800">
                                🎥 Video
                              </span>
                            </div>

                            {/* Title */}
                            <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug line-clamp-2">
                              {t.topic}
                            </h4>

                            {/* Excerpt */}
                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                              {t.excerpt}
                            </p>
                          </div>

                          <div className="pt-4 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:translate-x-0.5 transition-transform">
                            <span>Rehberi İncele</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
