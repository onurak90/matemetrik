'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, BookOpen, ChevronRight, Sparkles, Filter, CheckCircle2, ArrowRight } from 'lucide-react';
import type { Post } from '@/lib/types';

interface MebCozumleriHubProps {
  initialBooks: Post[];
}

export default function MebCozumleriHub({ initialBooks }: MebCozumleriHubProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGradeTab, setSelectedGradeTab] = useState<'all' | 'ilkokul' | 'ortaokul' | 'lise'>('all');

  const gradeCategories: Record<'ilkokul' | 'ortaokul' | 'lise', string[]> = {
    ilkokul: ['1-sinif', '2-sinif', '3-sinif', '4-sinif'],
    ortaokul: ['5-sinif', '6-sinif', '7-sinif', '8-sinif'],
    lise: ['9-sinif', '10-sinif', '11-sinif', '12-sinif'],
  };

  const filteredBooks = useMemo(() => {
    return initialBooks.filter((book) => {
      // Grade filter
      if (selectedGradeTab !== 'all') {
        const allowed = gradeCategories[selectedGradeTab];
        if (!allowed.includes(book.category_slug)) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = book.title.toLowerCase().includes(q);
        const matchCat = (book.category || '').toLowerCase().includes(q);
        const matchExcerpt = (book.excerpt || '').toLowerCase().includes(q);
        return matchTitle || matchCat || matchExcerpt;
      }

      return true;
    });
  }, [initialBooks, selectedGradeTab, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-md space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Live Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ders kitabı adı, sınıf veya ders ara (Örn: 8. Sınıf Matematik, 10. Sınıf Biyoloji)..."
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 px-2 py-1 bg-slate-200/60 rounded-lg"
              >
                Temizle
              </button>
            )}
          </div>

          {/* Kademe Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl w-full md:w-auto overflow-x-auto">
            <button
              onClick={() => setSelectedGradeTab('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedGradeTab === 'all'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tüm Kademeler
            </button>
            <button
              onClick={() => setSelectedGradeTab('ilkokul')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedGradeTab === 'ilkokul'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              İlkokul (1-4)
            </button>
            <button
              onClick={() => setSelectedGradeTab('ortaokul')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedGradeTab === 'ortaokul'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-blue-700'
              }`}
            >
              Ortaokul (5-8 & LGS)
            </button>
            <button
              onClick={() => setSelectedGradeTab('lise')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedGradeTab === 'lise'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-purple-700'
              }`}
            >
              Lise (9-12 & YKS)
            </button>
          </div>
        </div>

        {/* Quick Kademe Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-semibold flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Hızlı Sınıf Seçimi:
          </span>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
            <Link
              key={g}
              href={`/kategori/${g}-sinif`}
              className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 font-bold border border-slate-200 hover:border-indigo-200 transition-colors"
            >
              {g}. Sınıf
            </Link>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-1">
        <div className="text-sm font-bold text-slate-700">
          Toplam <span className="text-indigo-600 font-black">{filteredBooks.length}</span> MEB Ders Kitabı Listeleniyor
        </div>
        <div className="text-xs text-slate-500 font-medium">
          2026-2027 Müfredatına Uygun
        </div>
      </div>

      {/* Books Grid */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-8 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="text-base font-bold text-slate-800">Aramanızla Eşleşen Kitap Bulunamadı</div>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Lütfen arama teriminizi değiştirin veya yukarıdaki sınıf butonlarına tıklayarak doğrudan sınıf sayfasına gidin.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedGradeTab('all');
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors"
          >
            Filtreleri Sıfırla
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => {
            const isLise = ['9-sinif', '10-sinif', '11-sinif', '12-sinif'].includes(book.category_slug);
            const isOrta = ['5-sinif', '6-sinif', '7-sinif', '8-sinif'].includes(book.category_slug);
            const badgeTheme = isLise
              ? 'bg-purple-50 text-purple-700 border-purple-200'
              : isOrta
              ? 'bg-blue-50 text-blue-700 border-blue-200'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200';

            return (
              <Link
                key={book.id}
                href={`/post/${book.slug}`}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-indigo-400 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  {/* Book Image */}
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    {book.featured_image ? (
                      <Image
                        src={book.featured_image}
                        alt={book.title ? `${book.title} MEB Ders Kitabı Çözümleri` : 'MEB Ders Kitabı Çözümleri'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-4 text-center">
                        <span className="font-extrabold text-sm line-clamp-2">{book.title}</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border shadow-sm backdrop-blur-md bg-white/95 ${badgeTheme}`}>
                        {book.category}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-2.5">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {book.excerpt || `${book.title} tüm sayfa çözümleri, soru cevapları ve konu değerlendirme adımları.`}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700">
                    <span>Çözümleri Gör</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
