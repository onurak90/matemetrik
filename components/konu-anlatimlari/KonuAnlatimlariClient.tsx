'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, BookOpen, Sparkles, CheckCircle2, ChevronRight,
  GraduationCap, Layers, Video, FileText, ArrowRight, X,
  Calculator, BookA, Atom, Compass, Download, Printer, Filter,
  Award, Flame, Zap, ArrowUpRight, Star, Heart, Rocket
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

  // Handle Kademe selection
  const handleKademeSelect = (kademe: 'all' | 'ilkokul' | 'ortaokul' | 'lise') => {
    setSelectedKademe(kademe);
    setSelectedGrade('all');
  };

  // Handle Grade selection
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

  // Grade count map
  const gradeCountMap = useMemo(() => {
    const map: { [grade: number]: number } = {};
    for (const t of topics) {
      map[t.grade_num] = (map[t.grade_num] || 0) + 1;
    }
    return map;
  }, [topics]);

  // Kademe count map
  const kademeCountMap = useMemo(() => {
    let ilkokul = 0;
    let ortaokul = 0;
    let lise = 0;
    for (const t of topics) {
      if (t.grade_num <= 4) ilkokul++;
      else if (t.grade_num <= 8) ortaokul++;
      else lise++;
    }
    return { all: topics.length, ilkokul, ortaokul, lise };
  }, [topics]);

  // Filter topics
  const filteredTopics = useMemo(() => {
    return topics.filter((item) => {
      // Grade filter
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
        if (selectedSubject === 'Sosyal' && !item.subject.includes('Sosyal') && !item.subject.includes('Hayat') && !item.subject.includes('Tarih') && !item.subject.includes('Coğrafya') && !item.subject.includes('İnkılap')) return false;
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

  // Group by Grade
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

  // Subject icon & color styles
  const getSubjectStyle = (subj: string) => {
    if (subj.includes('Matematik')) {
      return {
        icon: <Calculator className="w-4 h-4 text-blue-600" />,
        badge: 'bg-blue-100 text-blue-800 border-blue-200',
        cardGlow: 'hover:border-blue-400 hover:shadow-blue-500/15',
        buttonGradient: 'from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500',
      };
    }
    if (subj.includes('Türkçe') || subj.includes('Edebiyat')) {
      return {
        icon: <BookA className="w-4 h-4 text-amber-600" />,
        badge: 'bg-amber-100 text-amber-900 border-amber-200',
        cardGlow: 'hover:border-amber-400 hover:shadow-amber-500/15',
        buttonGradient: 'from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500',
      };
    }
    if (subj.includes('Fen') || subj.includes('Fizik') || subj.includes('Kimya') || subj.includes('Biyoloji')) {
      return {
        icon: <Atom className="w-4 h-4 text-emerald-600" />,
        badge: 'bg-emerald-100 text-emerald-900 border-emerald-200',
        cardGlow: 'hover:border-emerald-400 hover:shadow-emerald-500/15',
        buttonGradient: 'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500',
      };
    }
    return {
      icon: <Compass className="w-4 h-4 text-rose-600" />,
      badge: 'bg-rose-100 text-rose-900 border-rose-200',
      cardGlow: 'hover:border-rose-400 hover:shadow-rose-500/15',
      buttonGradient: 'from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500',
    };
  };

  // Grade color theme
  const getGradeTheme = (g: number) => {
    if (g <= 4) {
      return {
        avatar: 'bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-emerald-500/30',
        kademeBadge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        accentBorder: 'border-emerald-500',
        titleColor: 'text-emerald-950',
        pillActive: 'bg-emerald-600 border-emerald-600 text-white shadow-emerald-500/40 shadow-lg',
      };
    }
    if (g <= 8) {
      return {
        avatar: 'bg-gradient-to-tr from-violet-600 via-purple-600 to-fuchsia-600 text-white shadow-purple-500/30',
        kademeBadge: 'bg-purple-100 text-purple-900 border-purple-300',
        accentBorder: 'border-purple-500',
        titleColor: 'text-purple-950',
        pillActive: 'bg-purple-600 border-purple-600 text-white shadow-purple-500/40 shadow-lg',
      };
    }
    return {
      avatar: 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-pink-600 text-white shadow-indigo-500/30',
      kademeBadge: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      accentBorder: 'border-indigo-500',
      titleColor: 'text-indigo-950',
      pillActive: 'bg-indigo-600 border-indigo-600 text-white shadow-indigo-500/40 shadow-lg',
    };
  };

  return (
    <div className="space-y-10">
      {/* 🌟 3 BÜYÜK RENKLİ & EFEKTLİ KADEME VİTRİNİ (INTERACTIVE HUB) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* İlkokul Vitrini */}
        <button
          onClick={() => handleKademeSelect('ilkokul')}
          className={`text-left p-6 sm:p-7 rounded-3xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden group cursor-pointer border-2 ${
            selectedKademe === 'ilkokul' && selectedGrade === 'all'
              ? 'bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white border-white shadow-xl shadow-emerald-500/25 ring-4 ring-emerald-300'
              : 'bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 text-slate-900 border-emerald-200 hover:border-emerald-400 shadow-md'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl sm:text-5xl group-hover:scale-125 transition-transform duration-300 drop-shadow">
              🎒
            </span>
            <span
              className={`text-xs font-black px-3 py-1 rounded-full border shadow-sm ${
                selectedKademe === 'ilkokul' && selectedGrade === 'all'
                  ? 'bg-white/20 text-white border-white/30'
                  : 'bg-emerald-600 text-white border-emerald-700'
              }`}
            >
              {kademeCountMap.ilkokul} Konu Anlatımı
            </span>
          </div>
          <h3
            className={`text-xl sm:text-2xl font-black tracking-tight mb-1.5 ${
              selectedKademe === 'ilkokul' && selectedGrade === 'all' ? 'text-white' : 'text-emerald-950'
            }`}
          >
            İlkokul (1 - 4. Sınıf)
          </h3>
          <p
            className={`text-xs sm:text-sm leading-relaxed mb-4 ${
              selectedKademe === 'ilkokul' && selectedGrade === 'all' ? 'text-emerald-100' : 'text-slate-600'
            }`}
          >
            Renkli çizimler, eğlenceli hikayeler, sevimli modellemeler ve adım adım çözümlerle temel oluşturun!
          </p>
          <div className="flex items-center gap-1.5 text-xs font-extrabold">
            <span>İlkokul Konularını Keşfet</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </button>

        {/* Ortaokul & LGS Vitrini */}
        <button
          onClick={() => handleKademeSelect('ortaokul')}
          className={`text-left p-6 sm:p-7 rounded-3xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden group cursor-pointer border-2 ${
            selectedKademe === 'ortaokul' && selectedGrade === 'all'
              ? 'bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-700 text-white border-white shadow-xl shadow-purple-500/25 ring-4 ring-purple-300'
              : 'bg-gradient-to-br from-purple-50 via-fuchsia-50 to-indigo-50 text-slate-900 border-purple-200 hover:border-purple-400 shadow-md'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl sm:text-5xl group-hover:scale-125 transition-transform duration-300 drop-shadow">
              🚀
            </span>
            <span
              className={`text-xs font-black px-3 py-1 rounded-full border shadow-sm ${
                selectedKademe === 'ortaokul' && selectedGrade === 'all'
                  ? 'bg-white/20 text-white border-white/30'
                  : 'bg-purple-600 text-white border-purple-700'
              }`}
            >
              {kademeCountMap.ortaokul} Konu &bull; LGS
            </span>
          </div>
          <h3
            className={`text-xl sm:text-2xl font-black tracking-tight mb-1.5 ${
              selectedKademe === 'ortaokul' && selectedGrade === 'all' ? 'text-white' : 'text-purple-950'
            }`}
          >
            Ortaokul &amp; LGS (5 - 8. Sınıf)
          </h3>
          <p
            className={`text-xs sm:text-sm leading-relaxed mb-4 ${
              selectedKademe === 'ortaokul' && selectedGrade === 'all' ? 'text-purple-100' : 'text-slate-600'
            }`}
          >
            MEB LGS yeni nesil beceri temelli sorular, paragraf analizleri, formüller ve öğretmen taktikleri!
          </p>
          <div className="flex items-center gap-1.5 text-xs font-extrabold">
            <span>LGS Konularını Keşfet</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </button>

        {/* Lise & YKS Vitrini */}
        <button
          onClick={() => handleKademeSelect('lise')}
          className={`text-left p-6 sm:p-7 rounded-3xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden group cursor-pointer border-2 ${
            selectedKademe === 'lise' && selectedGrade === 'all'
              ? 'bg-gradient-to-br from-blue-600 via-indigo-600 to-rose-700 text-white border-white shadow-xl shadow-indigo-500/25 ring-4 ring-indigo-300'
              : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-pink-50 text-slate-900 border-indigo-200 hover:border-indigo-400 shadow-md'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl sm:text-5xl group-hover:scale-125 transition-transform duration-300 drop-shadow">
              🎓
            </span>
            <span
              className={`text-xs font-black px-3 py-1 rounded-full border shadow-sm ${
                selectedKademe === 'lise' && selectedGrade === 'all'
                  ? 'bg-white/20 text-white border-white/30'
                  : 'bg-indigo-600 text-white border-indigo-700'
              }`}
            >
              {kademeCountMap.lise} Konu &bull; TYT/AYT
            </span>
          </div>
          <h3
            className={`text-xl sm:text-2xl font-black tracking-tight mb-1.5 ${
              selectedKademe === 'lise' && selectedGrade === 'all' ? 'text-white' : 'text-indigo-950'
            }`}
          >
            Lise &amp; YKS (9 - 12. Sınıf)
          </h3>
          <p
            className={`text-xs sm:text-sm leading-relaxed mb-4 ${
              selectedKademe === 'lise' && selectedGrade === 'all' ? 'text-indigo-100' : 'text-slate-600'
            }`}
          >
            ÖSYM sınav kalıpları, formül kartları, grafik analizleri, derece soru çözümleri ve hızlı kısayollar!
          </p>
          <div className="flex items-center gap-1.5 text-xs font-extrabold">
            <span>YKS Konularını Keşfet</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </button>
      </div>

      {/* 🌈 RENKLİ VE DİNAMİK FİLTRELEME & ARAMA PANELİ */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
        {/* Dynamic Search Bar with Gradient Accent */}
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-indigo-500" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Konu veya ders ara... (Örn: 8. Sınıf EBOB-EKOK, 6. Sınıf Kesirler, Türev, Mol Kavramı, Fiilimsiler...)"
            className="w-full pl-12 pr-10 py-4 bg-slate-50 border-2 border-slate-200 hover:border-indigo-300 focus:border-indigo-600 rounded-2xl text-sm sm:text-base font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/15 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-200"
              aria-label="Aramayı temizle"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* 1'den 12'ye Renkli Sınıf Hapları */}
        <div className="space-y-2.5 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              Sınıfını Seç ve Hemen Başla:
            </span>
            {(selectedGrade !== 'all' || selectedKademe !== 'all' || selectedSubject !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedGrade('all');
                  setSelectedKademe('all');
                  setSelectedSubject('all');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-rose-600 hover:text-rose-800 underline cursor-pointer"
              >
                Filtreleri Temizle
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={() => handleGradeSelect('all')}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all border-2 cursor-pointer ${
                selectedGrade === 'all' && selectedKademe === 'all'
                  ? 'bg-slate-900 border-slate-900 text-white shadow-lg'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
              }`}
            >
              Tüm Sınıflar ({topics.length})
            </button>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => {
              const count = gradeCountMap[g] || 0;
              const isActive = selectedGrade === g;
              const theme = getGradeTheme(g);

              return (
                <button
                  key={g}
                  onClick={() => handleGradeSelect(g)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all border-2 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? theme.pillActive
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <span>{g}. Sınıf</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                      isActive ? 'bg-white/30 text-white font-black' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Renkli Ders Alanı Filtreleri */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-1">Ders:</span>
            {[
              { id: 'all', label: 'Tüm Dersler', icon: <Layers className="w-3.5 h-3.5" />, color: 'bg-slate-900' },
              { id: 'Matematik', label: 'Matematik', icon: <Calculator className="w-3.5 h-3.5" />, color: 'bg-blue-600' },
              { id: 'Fen Bilimleri', label: 'Fen & Fizik & Kimya & Biyo', icon: <Atom className="w-3.5 h-3.5" />, color: 'bg-emerald-600' },
              { id: 'Türkçe', label: 'Türkçe & Edebiyat', icon: <BookA className="w-3.5 h-3.5" />, color: 'bg-amber-600' },
              { id: 'Sosyal', label: 'Sosyal & Tarih & İnkılap', icon: <Compass className="w-3.5 h-3.5" />, color: 'bg-rose-600' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSubject(s.id)}
                className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  selectedSubject === s.id
                    ? `${s.color} text-white border-transparent shadow-md scale-105`
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {s.icon}
                <span>{s.label}</span>
              </button>
            ))}
          </div>

          <div className="text-xs font-bold text-slate-500">
            <span>Toplam </span>
            <strong className="text-indigo-600 text-sm font-black">{filteredTopics.length}</strong>
            <span> Konu Rehberi Listeleniyor</span>
          </div>
        </div>
      </div>

      {/* 📚 DİNAMİK VE RENKLİ KONU KARTLARI LİSTESİ */}
      {groupedByGrade.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-3xl border-2 border-slate-200 space-y-4 shadow-sm">
          <div className="w-20 h-20 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto text-3xl font-black">
            🔍
          </div>
          <h3 className="text-xl font-black text-slate-900">Aradığınız kriterlere uygun konu bulunamadı</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Arama sözcüğünüzü kısaltabilir veya filtreleri sıfırlayarak 1-12. sınıf tüm müfredatı görüntüleyebilirsiniz.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedKademe('all');
              setSelectedGrade('all');
              setSelectedSubject('all');
            }}
            className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-lg cursor-pointer"
          >
            Tüm Konuları Göster
          </button>
        </div>
      ) : (
        <div className="space-y-16">
          {groupedByGrade.map((gradeGroup) => {
            const theme = getGradeTheme(gradeGroup.grade_num);
            let totalGradeTopics = 0;
            Object.values(gradeGroup.subjects).forEach((arr) => {
              totalGradeTopics += arr.length;
            });

            return (
              <section
                key={gradeGroup.grade_num}
                className="bg-white p-6 sm:p-10 rounded-3xl border-2 border-slate-200 shadow-sm space-y-8 relative overflow-hidden"
                id={`sinif-${gradeGroup.grade_num}`}
              >
                {/* Decorative colored top strip */}
                <div
                  className={`absolute top-0 left-0 right-0 h-2 ${
                    gradeGroup.grade_num <= 4
                      ? 'bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500'
                      : gradeGroup.grade_num <= 8
                      ? 'bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500'
                      : 'bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500'
                  }`}
                />

                {/* Grade Section Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 pt-2">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 rounded-3xl flex items-center justify-center font-black text-2xl sm:text-3xl shadow-xl transform group-hover:rotate-6 transition-transform ${theme.avatar}`}
                    >
                      {gradeGroup.grade_num}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                          {gradeGroup.grade_str} Konu Anlatımları
                        </h2>
                        <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${theme.kademeBadge}`}>
                          {gradeGroup.grade_num <= 4 ? 'İlkokul' : gradeGroup.grade_num <= 8 ? 'Ortaokul • LGS' : 'Lise • YKS'}
                        </span>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {totalGradeTopics} Ünite
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Sınıf düzeyine tam uyumlu, bol çözümlü örnekli ve 20 soruluk deneme testli ders rehberi
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/kategori/${gradeGroup.grade_num}-sinif`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 text-xs font-extrabold transition-all self-start sm:self-auto border border-slate-200 hover:border-indigo-200 shadow-sm"
                  >
                    <span>{gradeGroup.grade_str} MEB Kitap Çözümleri</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Subjects Grid */}
                <div className="space-y-8">
                  {Object.entries(gradeGroup.subjects).map(([subjName, topicItems]) => {
                    const subjStyle = getSubjectStyle(subjName);

                    return (
                      <div key={subjName} className="space-y-4">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-xl bg-slate-100 shadow-sm">
                            {subjStyle.icon}
                          </div>
                          <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                            {subjName} Dersi
                          </h3>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-extrabold border border-slate-200">
                            {topicItems.length} Konu
                          </span>
                        </div>

                        {/* Modern Colorful Topic Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                          {topicItems.map((t) => (
                            <div
                              key={t.slug}
                              className={`group p-6 rounded-3xl bg-white border-2 border-slate-200/90 ${subjStyle.cardGlow} hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden`}
                            >
                              <div className="space-y-3.5">
                                {/* Top Badges Row */}
                                <div className="flex items-center justify-between gap-2 flex-wrap">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[11px] font-black px-2.5 py-1 rounded-xl bg-slate-900 text-white">
                                      {t.grade_str}
                                    </span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${subjStyle.badge}`}>
                                      {t.subject}
                                    </span>
                                  </div>
                                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-300 flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> MEB Uyumlu
                                  </span>
                                </div>

                                {/* Title */}
                                <Link href={`/post/${t.slug}`}>
                                  <h4 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug line-clamp-2 cursor-pointer pt-1">
                                    {t.topic}
                                  </h4>
                                </Link>

                                {/* Excerpt */}
                                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                                  {t.excerpt}
                                </p>

                                {/* 4 Feature Pills */}
                                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px] font-bold text-slate-700">
                                  <div className="flex items-center gap-1.5 text-blue-700">
                                    <span>📖</span> Konu Anlatımı
                                  </div>
                                  <div className="flex items-center gap-1.5 text-emerald-700">
                                    <span>📝</span> 20 Soru &amp; Çözüm
                                  </div>
                                  <div className="flex items-center gap-1.5 text-rose-700">
                                    <span>🎥</span> Video Anlatım
                                  </div>
                                  <div className="flex items-center gap-1.5 text-amber-700">
                                    <span>📥</span> PDF Test İndir
                                  </div>
                                </div>
                              </div>

                              {/* Two Action Buttons Footer */}
                              <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
                                <Link
                                  href={`/post/${t.slug}`}
                                  className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-md hover:shadow-lg"
                                >
                                  <span>Dersi Çalış &amp; Soruları Gör</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </Link>

                                <Link
                                  href={`/post/${t.slug}#pdf-test-indir`}
                                  className="w-full py-2 px-3 rounded-2xl bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white text-[11px] font-extrabold flex items-center justify-center gap-1.5 transition-all border border-emerald-300"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                  <span>PDF Test Olarak İndir / Yazdır</span>
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
