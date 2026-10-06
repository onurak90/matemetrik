'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronLeft, ChevronRight, Calendar, Clock,
  ArrowUpRight, Sparkles
} from 'lucide-react';
import { Post } from '@/lib/types';
import { formatDate, estimateReadingTime } from '@/lib/utils';

interface PostSliderProps {
  posts: Post[];
}

export default function PostSlider({ posts }: PostSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [sliderImgError, setSliderImgError] = useState<Record<string, boolean>>({});
  
  // Show up to 10 latest articles
  const sliderPosts = posts.slice(0, 10);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % sliderPosts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + sliderPosts.length) % sliderPosts.length);
  };

  useEffect(() => {
    if (isPaused || sliderPosts.length <= 1) return;
    const interval = setInterval(nextSlide, 5500);
    return () => clearInterval(interval);
  }, [isPaused, sliderPosts.length]);

  if (!sliderPosts || sliderPosts.length === 0) return null;

  const current = sliderPosts[currentIndex];
  const readingTime = estimateReadingTime(current.content || '');

  return (
    <div
      className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image / Overlay - Clearer & Sharper */}
      <div className="relative min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] flex flex-col justify-end p-5 sm:p-8 lg:p-12 text-white">
        {current.featured_image && !sliderImgError[current.id] ? (
          <>
            <img
              key={current.id}
              src={current.featured_image}
              alt={current.title ? `${current.title} - Matemetrik` : 'Matemetrik Öne Çıkan Yazı'}
              onError={() => setSliderImgError((prev) => ({ ...prev, [current.id]: true }))}
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Soft dark vignette to ensure text contrast while keeping image sharp and visible */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)`,
                backgroundSize: '24px 24px',
              }}
            />
          </div>
        )}

        {/* Content Box with Dedicated High-Readability Frosted Backdrop */}
        <div className="relative z-10 max-w-2xl bg-slate-950/85 backdrop-blur-md p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl space-y-3.5">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-indigo-600 text-white shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              {current.category || 'Blog'}
            </span>
            <span className="text-xs text-slate-300 font-medium flex items-center gap-1 bg-white/10 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              {readingTime}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {formatDate(current.created_at)}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-snug text-white hover:text-indigo-300 transition-colors drop-shadow-sm">
            <Link href={`/post/${current.slug}`}>
              {current.title}
            </Link>
          </h2>

          <p className="text-slate-200 text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {current.excerpt || current.content.replace(/<[^>]+>/g, ' ').slice(0, 150)}
          </p>

          <div className="pt-1 flex items-center justify-between gap-3">
            <Link
              href={`/post/${current.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-indigo-600/30 hover:scale-105"
            >
              Yazıyı Oku
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <span className="text-xs text-slate-400 font-bold hidden sm:inline">
              Haber {currentIndex + 1} / {sliderPosts.length}
            </span>
          </div>
        </div>

        {/* Top-Right Arrows Controls */}
        <div className="absolute top-5 right-5 sm:top-6 sm:right-6 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Önceki Yazı"
            className="p-2 sm:p-2.5 rounded-xl bg-slate-950/80 hover:bg-indigo-600 text-white backdrop-blur-md border border-white/10 hover:border-indigo-500 transition-all shadow-lg active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Sonraki Yazı"
            className="p-2 sm:p-2.5 rounded-xl bg-slate-950/80 hover:bg-indigo-600 text-white backdrop-blur-md border border-white/10 hover:border-indigo-500 transition-all shadow-lg active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Numbered Navigation (1 - 10) */}
        <div className="relative z-20 pt-4 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            {sliderPosts.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Yazı ${idx + 1}`}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl font-black text-xs flex items-center justify-center transition-all ${
                  currentIndex === idx
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/50 scale-105 ring-2 ring-white/60'
                    : 'bg-slate-950/80 hover:bg-slate-800 text-slate-300 border border-white/10 hover:text-white hover:border-white/30'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <span className="text-[11px] text-slate-300 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10 font-medium hidden md:inline">
            Otomatik Geçiş &bull; Durdurmak için üzerine gelin
          </span>
        </div>
      </div>
    </div>
  );
}
