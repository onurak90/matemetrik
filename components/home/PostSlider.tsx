'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ChevronLeft, ChevronRight, Calendar, Clock,
  ArrowUpRight, Sparkles, BookOpen
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
  const sliderPosts = posts.slice(0, 6); // Top 6 latest posts

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % sliderPosts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + sliderPosts.length) % sliderPosts.length);
  };

  useEffect(() => {
    if (isPaused || sliderPosts.length <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, sliderPosts.length]);

  if (!sliderPosts || sliderPosts.length === 0) return null;

  const current = sliderPosts[currentIndex];
  const readingTime = estimateReadingTime(current.content || '');

  return (
    <div
      className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image / Overlay */}
      <div className="relative min-h-[380px] sm:min-h-[460px] flex flex-col justify-end p-6 sm:p-10 lg:p-14 text-white">
        {current.featured_image && !sliderImgError[current.id] ? (
          <>
            <img
              key={current.id}
              src={current.featured_image}
              alt={current.title ? `${current.title} - Matemetrik` : 'Matemetrik Öne Çıkan Yazı'}
              onError={() => setSliderImgError((prev) => ({ ...prev, [current.id]: true }))}
              className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/30" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950">
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: `radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)`,
                backgroundSize: '24px 24px',
              }}
            />
          </div>
        )}

        {/* Content Box */}
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-600/90 text-white backdrop-blur-md shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              {current.category}
            </span>
            <span className="text-xs text-slate-300 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              {readingTime}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-white hover:text-indigo-300 transition-colors">
            <Link href={`/post/${current.slug}`}>
              {current.title}
            </Link>
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm line-clamp-2 leading-relaxed max-w-2xl">
            {current.excerpt || current.content.replace(/<[^>]+>/g, ' ').slice(0, 160)}
          </p>

          <div className="pt-2 flex items-center gap-4">
            <Link
              href={`/post/${current.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-indigo-600/30"
            >
              Yazıyı Oku
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              {formatDate(current.created_at)}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Önceki Yazı"
            className="p-2.5 rounded-full bg-slate-900/70 hover:bg-indigo-600 text-white backdrop-blur-md border border-slate-700 hover:border-indigo-500 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Sonraki Yazı"
            className="p-2.5 rounded-full bg-slate-900/70 hover:bg-indigo-600 text-white backdrop-blur-md border border-slate-700 hover:border-indigo-500 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Indicator Dots */}
        <div className="absolute bottom-6 right-6 sm:right-10 z-20 flex items-center gap-1.5">
          {sliderPosts.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-600 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
