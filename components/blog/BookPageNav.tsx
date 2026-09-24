import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, BookOpen, Layers, Sparkles } from 'lucide-react';
import { BookSequenceData } from '@/lib/db';

interface BookPageNavProps {
  sequence: BookSequenceData;
  position?: 'top' | 'bottom';
  categorySlug?: string;
  categoryName?: string;
}

export default function BookPageNav({
  sequence,
  position = 'bottom',
  categorySlug,
  categoryName,
}: BookPageNavProps) {
  if (!sequence.isBookPage) return null;

  const {
    bookTitle,
    currentPageNumber,
    prevPage,
    nextPage,
    masterBookSlug,
    nearbyPages,
    totalPages,
  } = sequence;

  const hubLink = masterBookSlug
    ? `/post/${masterBookSlug}`
    : categorySlug
    ? `/kategori/${categorySlug}`
    : '/meb-cozumleri';

  return (
    <div
      className={`rounded-3xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/70 p-4 sm:p-6 shadow-sm space-y-4 ${
        position === 'top' ? 'mb-8' : 'my-8'
      }`}
    >
      {/* Üst Bilgi Başlığı */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs border border-indigo-100">
            📖
          </span>
          <span className="font-extrabold text-slate-800">
            {bookTitle || categoryName || 'MEB Ders Kitabı'} Çözüm Rehberi
          </span>
        </div>

        <Link
          href={hubLink}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Tüm Kitap Sayfaları ({totalPages} Sayfa) &rarr;</span>
        </Link>
      </div>

      {/* 3 Ana Navigasyon Butonu: Önceki - Fihrist - Sonraki */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Önceki Sayfa */}
        {prevPage ? (
          <Link
            href={`/post/${prevPage.slug}`}
            className="p-3 rounded-2xl bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 transition-all flex items-center gap-2.5 group shadow-xs"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white text-slate-700 flex items-center justify-center transition-colors shrink-0 font-bold">
              <ChevronLeft className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
                Önceki Sayfa
              </div>
              <div className="text-xs font-black text-slate-800 truncate">
                Sayfa {prevPage.pageNumber} Çözümleri
              </div>
            </div>
          </Link>
        ) : (
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/50 opacity-60 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-400 flex items-center justify-center font-bold shrink-0">
              <ChevronLeft className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Kitabın Başı</div>
              <div className="text-xs font-semibold text-slate-500">İlk Sayfadasınız</div>
            </div>
          </div>
        )}

        {/* Orta Buton: Kitap Ana Sayfası / Fihrist */}
        <Link
          href={hubLink}
          className="p-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white transition-all flex items-center justify-center gap-2 text-center shadow-md hover:shadow-lg"
        >
          <BookOpen className="w-4 h-4 shrink-0" />
          <div className="text-center">
            <div className="text-[10px] uppercase font-extrabold text-indigo-100">
              Ders Kitabı Fihristi
            </div>
            <div className="text-xs font-black">
              Şu An: Sayfa {currentPageNumber} / {totalPages}
            </div>
          </div>
        </Link>

        {/* Sonraki Sayfa */}
        {nextPage ? (
          <Link
            href={`/post/${nextPage.slug}`}
            className="p-3 rounded-2xl bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 transition-all flex items-center justify-between gap-2.5 group shadow-xs text-right"
          >
            <div className="min-w-0 flex-1">
              <div className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
                Sonraki Sayfa
              </div>
              <div className="text-xs font-black text-slate-800 truncate">
                Sayfa {nextPage.pageNumber} Çözümleri
              </div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white text-slate-700 flex items-center justify-center transition-colors shrink-0 font-bold">
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
        ) : (
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/50 opacity-60 flex items-center justify-between gap-2.5 text-right">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Kitabın Sonu</div>
              <div className="text-xs font-semibold text-slate-500">Son Sayfadasınız</div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-400 flex items-center justify-center font-bold shrink-0">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        )}
      </div>

      {/* Yakındaki Sayfalar Hızlı Atlama Çubuğu (Quick Page Jump) */}
      {nearbyPages.length > 1 && (
        <div className="pt-3 border-t border-slate-200/60 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-bold text-slate-500 shrink-0 whitespace-nowrap">
            Hızlı Sayfa Atlama:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {nearbyPages.map((p) => {
              const isCurrent = p.pageNumber === currentPageNumber;
              return isCurrent ? (
                <span
                  key={p.slug}
                  className="px-2.5 py-1 rounded-xl bg-indigo-600 text-white text-xs font-black shadow-xs whitespace-nowrap"
                >
                  Sayfa {p.pageNumber} ✓
                </span>
              ) : (
                <Link
                  key={p.slug}
                  href={`/post/${p.slug}`}
                  className="px-2.5 py-1 rounded-xl bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200 text-xs font-semibold transition-colors whitespace-nowrap"
                >
                  Sayfa {p.pageNumber}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
