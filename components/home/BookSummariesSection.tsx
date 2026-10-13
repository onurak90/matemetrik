'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { Post } from '@/lib/types';

interface BookSummariesSectionProps {
  books: Post[];
}

export default function BookSummariesSection({ books }: BookSummariesSectionProps) {
  if (!books || books.length === 0) return null;

  // Clean title helper: extracts the main book name and author
  const formatBookTitle = (rawTitle: string) => {
    // If format like "Martı Jonathan Livingston – Richard Bach | Kitap Özeti..."
    const parts = rawTitle.split(/\||–|-/);
    const mainTitle = parts[0]?.trim() || rawTitle;
    const author = parts[1]?.trim() || '';
    return { mainTitle, author };
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-200/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center shadow-sm shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Son Eklenen Kitap Özetleri
              </h2>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                GÜNCEL &bull; KLASİKLER
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
              Dünya klasikleri, romanlar ve MEB 100 temel eserlerin karakter tahlilli detaylı özetleri
            </p>
          </div>
        </div>

        <Link
          href="/kategori/kitap-ozet"
          className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 group self-start sm:self-auto shrink-0"
        >
          <span>Tüm Kitap Özetleri ({books.length}+)</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Book Covers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {books.slice(0, 12).map((book) => {
          const { mainTitle, author } = formatBookTitle(book.title);
          const coverImg = book.featured_image && book.featured_image.trim() !== ''
            ? book.featured_image
            : 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';

          return (
            <Link
              key={book.id || book.slug}
              href={`/post/${book.slug}`}
              className="group flex flex-col bg-white rounded-2xl p-2.5 sm:p-3 border border-slate-200/80 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300"
              title={book.title}
            >
              {/* Cover Image Container */}
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-100 shadow-sm mb-2.5">
                <img
                  src={coverImg}
                  alt={book.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to stylized cover if external image fails
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <div className="absolute top-1.5 left-1.5">
                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-slate-900/80 text-white backdrop-blur-sm shadow-sm">
                    Özet
                  </span>
                </div>
              </div>

              {/* Book Info */}
              <div className="flex-1 flex flex-col justify-between space-y-1">
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                  {mainTitle}
                </h3>
                {author && (
                  <p className="text-[11px] text-slate-500 truncate font-medium">
                    {author}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
