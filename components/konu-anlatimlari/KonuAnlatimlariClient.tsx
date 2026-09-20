'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, BookOpen, Sparkles, CheckCircle2, ChevronRight,
  GraduationCap, Layers, Video, FileText, ArrowRight, X,
  Calculator, BookA, Atom, Compass, CheckCircle, HelpCircle
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
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  // Sync kademe when a specific grade is picked
  const handleGradeSelect = (grade: number | 'all') => {
    setSelectedGrade(grade);
    if (grade === 'all') {
      setSelectedKademe('all');
    } else if (grade >= 1 && grade <= 4) {
      setSelectedKademe('ilkokul');
    } else if (grade >= 5 && grade <= 8) {
      setSelectedKademe('ortaokul');
    } else if (grade >= 9 && grade <= 12) {
      setSelectedKademe('lise');
    }
  };

  const handleKademeSelect = (kademe: 'all' | 'ilkokul' | 'ortaokul' | 'lise') => {
    setSelectedKademe(kademe);
    setSelectedGrade('all');
  };

  // Filter topics
  const filteredTopics = useMemo(() => {
    return topics.filter((item) => {
      // Specific grade filter
      if (selectedGrade !== 'all' && item.grade_num !== selectedGrade) {
        return false;
      }

      // Kademe filter
      if (selectedGrade === 'all') {
        if (selectedKademe === 'ilkokul' && (item.grade_num < 1 || item.grade_num > 4)) return false;
        if (selectedKademe === 'ortaokul' && (item.grade_num < 5 || item.grade_num > 8)) return false;
        if (selectedKademe === 'lise' && (item.grade_num < 9 || item.grade_num > 12)) return false;
      }

      // Subject filter
      if (selectedSubject !== 'all') {
        if (selectedSubject === 'Matematik' && !item.subject.includes('Matematik')) return false;
        if (selectedSubject === 'Türkçe' && !item.subject.includes('Türkçe') && !item.subject.includes('Edebiyat')) return false;
        if (selectedSubject === 'Fen Bilimleri' && !item.subject.includes('Fen') && !item.subject.includes('Fizik') && !item.subject.includes('Kimya') && !item.subject.includes('Biyoloji')) return false;
        if (selectedSubject === 'Sosyal' && !item.subject.includes('Sosyal') && !item.subject.includes('Hayat') && !item.subject.includes('Tarih') && !item.subject.includes('Coğrafya')) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTopic = item.topic.toLowerCase().includes(q);
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesGrade = item.grade_str.toLowerCase().includes(q);
        const matchesSubject = item.subject.toLowerCase().includes(q);
        const matchesExcerpt = (item.excerpt || '').toLowerCase().includes(q);
        if (!matchesTopic && !matchesTitle && !matchesGrade && !matchesSubject && !matchesExcerpt) {
          return false;
        }
      }

      return true;
    });
  }, [topics, selectedKademe, selectedGrade, selectedSubject, searchQuery]);

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

    const sortedGrades = Object.keys(gradesMap)
      .map(Number)
      .sort((a, b) => a - b);

    return sortedGrades.map((gNum) => ({
      grade_num: gNum,
      grade_str: `${gNum}. Sınıf`,
      subjects: gradesMap[gNum],
    }));
  }, [filteredTopics]);

  // Subject icon helper
  const getSubjectIcon = (subj: string) => {
    if (subj.includes('Matematik')) return <Calculator className="w-4 h-4 text-indigo-600" />;
    if (subj.includes('Türkçe') || subj.includes('Edebiyat')) return <BookA className="w-4 h-4 text-amber-600" />;
    if (subj.includes('Fen') || subj.includes('Fizik') || subj.includes('Kimya') || subj.includes('Biyoloji')) return <Atom className="w-4 h-4 text-emerald-600" />;
    return <Compass className="w-4 h-4 text-rose-600" />;
  };

  // Grade color theme
  const getGradeTheme = (g: number) => {
    if (g <= 4) {
      return {
        badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        cardBorder: 'hover:border-emerald-300',
        buttonBg: 'bg-emerald-600 hover:bg-emerald-700',
        indicator: 'bg-emerald-500',
        tag: 'bg-emerald-100/70 text-emerald-800'
      };
    }
    if (g <= 8) {
      return {
        badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
        cardBorder: 'hover:border-purple-300',
        buttonBg: 'bg-purple-600 hover:bg-purple-700',
        indicator: 'bg-purple-500',
        tag: 'bg-purple-100/70 text-purple-800'
      };
    }
    return {
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      cardBorder: 'hover:border-indigo-300',
      buttonBg: 'bg-indigo-600 hover:bg-indigo-700',
      indicator: 'bg-indigo-500',
      tag: 'bg-indigo-100/70 text-indigo-800'
    };
  };

  return (
    <div className="space-y-10">
      {/* Control Panel: Search + Kademe Tabs + Grade Selector + Subject Tabs */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        {/* Search Input Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Konu, sınıf veya ders ara... (Örn: 6. Sınıf Kesirler, 8. Sınıf Özneler, Limit, Mol, Mitoz...)"
            className="w-full pl-12 pr-10 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              aria-label="Aramayı temizle"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Kademe Switcher Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
            <button
              onClick={() => handleKademeSelect('all')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                selectedKademe === 'all' && selectedGrade === 'all'
                  ? 'bg-white text-indigo-700 shadow-sm font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tüm Kademeler
            </button>
            <button
              onClick={() => handleKademeSelect('ilkokul')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                selectedKademe === 'ilkokul' && selectedGrade === 'all'
                  ? 'bg-white text-emerald-700 shadow-sm font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              İlkokul (1-4)
            </button>
            <button
              onClick={() => handleKademeSelect('ortaokul')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                selectedKademe === 'ortaokul' && selectedGrade === 'all'
                  ? 'bg-white text-purple-700 shadow-sm font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ortaokul &amp; LGS (5-8)
            </button>
            <button
              onClick={() => handleKademeSelect('lise')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                selectedKademe === 'lise' && selectedGrade === 'all'
                  ? 'bg-white text-indigo-700 shadow-sm font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lise &amp; YKS (9-12)
            </button>
          </div>

          {/* Subject Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
            {[
              { id: 'all', label: 'Tüm Dersler' },
              { id: 'Matematik', label: 'Matematik' },
              { id: 'Türkçe', label: 'Türkçe & Edebiyat' },
              { id: 'Fen Bilimleri', label: 'Fen & Fizik & Kimya & Biyo' },
              { id: 'Sosyal', label: 'Sosyal & Hayat Bilgisi' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSubject(s.id)}
                className={`px-3 py-1.5 rounded-xl border transition-all ${
                  selectedSubject === s.id
                    ? 'bg-indigo-600 border-indigo-600 text-white font-bold shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dedicated 1-12 Grade Pills */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Sınıfa Göre Hızlı Filtrele:
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleGradeSelect('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                selectedGrade === 'all'
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Tüm Sınıflar
            </button>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => {
              const isActive = selectedGrade === g;
              let activeClass = 'bg-indigo-600 border-indigo-600 text-white shadow-sm';
              if (g <= 4) activeClass = 'bg-emerald-600 border-emerald-600 text-white shadow-sm';
              else if (g <= 8) activeClass = 'bg-purple-600 border-purple-600 text-white shadow-sm';

              return (
                <button
                  key={g}
                  onClick={() => handleGradeSelect(g)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    isActive
                      ? activeClass
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  {g}. Sınıf
                </button>
              );
            })}
          </div>
        </div>

        {/* Counter and Reset Row */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>
            Toplam <strong className="text-slate-900 font-bold">{filteredTopics.length}</strong> konu anlatım rehberi bulundu
          </span>
          {(searchQuery || selectedKademe !== 'all' || selectedGrade !== 'all' || selectedSubject !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedKademe('all');
                setSelectedGrade('all');
                setSelectedSubject('all');
              }}
              className="text-indigo-600 hover:text-indigo-800 font-bold underline cursor-pointer"
            >
              Tüm Filtreleri Temizle
            </button>
          )}
        </div>
      </div>

      {/* Main Content: Grouped by Grade */}
      {groupedByGrade.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto text-2xl font-bold">
            🔍
          </div>
          <h3 className="text-lg font-bold text-slate-900">Aradığınız kriterlere uygun konu bulunamadı</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Farklı bir arama terimi deneyebilir veya filtreleri sıfırlayarak 1-12. sınıf tüm müfredatı inceleyebilirsiniz.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedKademe('all');
              setSelectedGrade('all');
              setSelectedSubject('all');
            }}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Filtreleri Sıfırla
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {groupedByGrade.map((gradeGroup) => {
            const theme = getGradeTheme(gradeGroup.grade_num);

            return (
              <section
                key={gradeGroup.grade_num}
                className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8"
                id={`sinif-${gradeGroup.grade_num}`}
              >
                {/* Grade Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-md ${
                        gradeGroup.grade_num <= 4
                          ? 'bg-gradient-to-tr from-emerald-600 to-teal-500'
                          : gradeGroup.grade_num <= 8
                          ? 'bg-gradient-to-tr from-purple-600 to-indigo-500'
                          : 'bg-gradient-to-tr from-indigo-600 to-blue-500'
                      }`}
                    >
                      {gradeGroup.grade_num}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                          {gradeGroup.grade_str} Konu Anlatımları
                        </h2>
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          MEB Uyumlu
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        2026-2027 MEB müfredatına tam uyumlu konu anlatımları, 20 soruluk yeni nesil testler ve Türkçe video dersler
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/kategori/${gradeGroup.grade_num}-sinif`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 text-xs font-bold transition-all self-start sm:self-auto border border-slate-200"
                  >
                    <span>Tüm {gradeGroup.grade_str} MEB Çözümleri</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Subjects inside this Grade */}
                <div className="space-y-8">
                  {Object.entries(gradeGroup.subjects).map(([subjName, topicItems]) => (
                    <div key={subjName} className="space-y-4">
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-slate-100">
                          {getSubjectIcon(subjName)}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                          {subjName} Dersi
                        </h3>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                          {topicItems.length} Kapsamlı Ünite
                        </span>
                      </div>

                      {/* Topic Cards Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {topicItems.map((t) => (
                          <Link
                            key={t.slug}
                            href={`/post/${t.slug}`}
                            className={`group p-6 rounded-2xl bg-slate-50/70 border border-slate-200/90 ${theme.cardBorder} hover:bg-white hover:shadow-lg transition-all flex flex-col justify-between`}
                          >
                            <div className="space-y-4">
                              {/* Top Bar: Grade Badge & Test Pill */}
                              <div className="flex items-center justify-between gap-2">
                                <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-lg border ${theme.badgeBg}`}>
                                  {t.grade_str}
                                </span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  📝 20 Soru &amp; Çözüm
                                </span>
                              </div>

                              {/* Topic Title */}
                              <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug line-clamp-2">
                                {t.topic}
                              </h4>

                              {/* Excerpt */}
                              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                                {t.excerpt}
                              </p>

                              {/* 4 Feature Checklist */}
                              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                                <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                                  <span className="text-indigo-600">📖</span> Konu Anlatımı
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                                  <span className="text-emerald-600">📝</span> 20 Soru Test
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                                  <span className="text-rose-600">🎥</span> Türkçe Video
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                                  <span className="text-amber-600">📚</span> MEB Çözümü
                                </div>
                              </div>
                            </div>

                            {/* Card Footer CTA */}
                            <div className="pt-4 mt-4 border-t border-slate-200/70 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:translate-x-0.5 transition-transform">
                              <span className="font-extrabold">Konuyu Çalış &amp; Test Çöz</span>
                              <ChevronRight className="w-4 h-4 text-indigo-600" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
