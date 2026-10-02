'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, BookOpen, Download, Filter, Sparkles,
  FileText, CheckCircle2, ChevronRight, Layers,
  GraduationCap, Calendar, Star
} from 'lucide-react';

interface PostItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  category_slug: string;
  tags?: string[] | string;
  created_at: string;
  views?: number;
}

interface Props {
  posts: PostItem[];
}

export default function IlkokulEtkinlikleriClient({ posts }: Props) {
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const gradeOptions = [
    { id: 'all', label: 'Tüm Kademeler', icon: Layers, count: posts.length },
    {
      id: '1-sinif',
      label: '1. Sınıf & Okuma-Yazma',
      icon: GraduationCap,
      count: posts.filter((p) => p.category_slug === '1-sinif').length,
    },
    {
      id: '2-sinif',
      label: '2. Sınıf',
      icon: BookOpen,
      count: posts.filter((p) => p.category_slug === '2-sinif').length,
    },
    {
      id: '3-sinif',
      label: '3. Sınıf',
      icon: BookOpen,
      count: posts.filter((p) => p.category_slug === '3-sinif').length,
    },
    {
      id: '4-sinif',
      label: '4. Sınıf',
      icon: BookOpen,
      count: posts.filter((p) => p.category_slug === '4-sinif').length,
    },
    {
      id: 'ilkokul-etkinlikleri',
      label: 'Belirli Gün & Haftalar',
      icon: Calendar,
      count: posts.filter((p) => p.category_slug === 'ilkokul-etkinlikleri').length,
    },
  ];

  const subjectOptions = [
    { id: 'all', label: 'Tüm Konular' },
    { id: 'matematik', label: '🧮 Matematik' },
    { id: 'turkce', label: '✏️ Türkçe & Harfler' },
    { id: 'hayat', label: '🏠 Hayat Bilgisi' },
    { id: 'gunler', label: '🚩 Belirli Gün ve Haftalar' },
  ];

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      // Grade filter
      if (selectedGrade !== 'all') {
        if (p.category_slug !== selectedGrade) {
          return false;
        }
      }

      // Subject filter
      if (selectedSubject !== 'all') {
        const tagStr = Array.isArray(p.tags) ? p.tags.join(' ') : (p.tags || '');
        const text = (p.title + ' ' + (p.excerpt || '') + ' ' + tagStr).toLowerCase();
        if (selectedSubject === 'matematik') {
          if (!text.includes('matematik') && !text.includes('toplama') && !text.includes('ritmik') && !text.includes('carpma') && !text.includes('çarpma')) {
            return false;
          }
        } else if (selectedSubject === 'turkce') {
          if (!text.includes('türkçe') && !text.includes('turkce') && !text.includes('sesi') && !text.includes('harf') && !text.includes('dikte') && !text.includes('okuma')) {
            return false;
          }
        } else if (selectedSubject === 'hayat') {
          if (!text.includes('hayat') && !text.includes('aile')) {
            return false;
          }
        } else if (selectedSubject === 'gunler') {
          if (!text.includes('bayram') && !text.includes('hafta') && !text.includes('zafer') && !text.includes('mart') && !text.includes('nisan') && !text.includes('mayis') && !text.includes('kasim')) {
            return false;
          }
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const fullContent = (p.title + ' ' + (p.excerpt || '')).toLowerCase();
        if (!fullContent.includes(q)) {
          return false;
        }
      }

      return true;
    });
  }, [posts, selectedGrade, selectedSubject, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Header Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Etkinlik, konu veya harf ara... (örn: 1. Sınıf Ritmik Sayma, P Sesi, Çarpma)"
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-sm sm:text-base transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-slate-400 hover:text-slate-600 font-semibold"
            >
              Temizle
            </button>
          )}
        </div>

        {/* Grade Tabs */}
        <div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-indigo-500" />
            <span>Sınıf ve Kademe Seçin</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {gradeOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = selectedGrade === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedGrade(opt.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-[1.02]'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{opt.label}</span>
                  {opt.count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                        isActive ? 'bg-indigo-800 text-indigo-100' : 'bg-white text-slate-600'
                      }`}
                    >
                      {opt.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Subject Filter Pills */}
        <div className="pt-4 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Ders ve Konu Türü</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {subjectOptions.map((subj) => {
              const isActive = selectedSubject === subj.id;
              return (
                <button
                  key={subj.id}
                  onClick={() => setSelectedSubject(subj.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {subj.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Result Status */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm font-semibold text-slate-600">
          Toplam <span className="font-extrabold text-slate-900">{filteredPosts.length}</span> etkinlik ve çalışma kağıdı listeleniyor
        </div>
        {(selectedGrade !== 'all' || selectedSubject !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedGrade('all');
              setSelectedSubject('all');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-indigo-600 hover:underline"
          >
            Filtreleri Sıfırla &times;
          </button>
        )}
      </div>

      {/* Posts Cards Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPosts.map((post) => {
            const is1Grade = post.category_slug === '1-sinif';
            const is2Grade = post.category_slug === '2-sinif';
            const is3Grade = post.category_slug === '3-sinif';
            const is4Grade = post.category_slug === '4-sinif';

            let badgeBg = 'bg-amber-50 text-amber-800 border-amber-200';
            if (is1Grade) badgeBg = 'bg-pink-50 text-pink-700 border-pink-200';
            else if (is2Grade) badgeBg = 'bg-emerald-50 text-emerald-800 border-emerald-200';
            else if (is3Grade) badgeBg = 'bg-rose-50 text-rose-700 border-rose-200';
            else if (is4Grade) badgeBg = 'bg-purple-50 text-purple-700 border-purple-200';

            return (
              <div
                key={post.id}
                className="group flex flex-col justify-between bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${badgeBg}`}
                    >
                      {post.category || 'İlkokul'}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      PDF İndir
                    </span>
                  </div>

                  {/* Title */}
                  <Link href={`/post/${post.slug}`} className="block group-hover:text-indigo-600 transition-colors">
                    <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <FileText className="w-3.5 h-3.5 text-indigo-500" />
                    <span>A4 Yazdırılabilir</span>
                  </div>
                  <Link
                    href={`/post/${post.slug}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-bold text-xs transition-colors duration-200"
                  >
                    <span>İncele &amp; İndir</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 mx-auto flex items-center justify-center">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Aramanıza uygun etkinlik bulunamadı</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Farklı bir arama terimi deneyebilir veya sınıf filtrelerini değiştirerek diğer etkinliklere göz atabilirsiniz.
          </p>
          <button
            onClick={() => {
              setSelectedGrade('all');
              setSelectedSubject('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors"
          >
            Tüm Etkinlikleri Göster
          </button>
        </div>
      )}
    </div>
  );
}
