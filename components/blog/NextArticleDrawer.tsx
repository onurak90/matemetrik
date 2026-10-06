'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, X, Sparkles, BookOpen } from 'lucide-react';
import { Post } from '@/lib/types';

interface NextArticleDrawerProps {
  nextPost?: Post | null;
}

export default function NextArticleDrawer({ nextPost }: NextArticleDrawerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (!nextPost || isDismissed) return;

    const handleScroll = () => {
      // Show when user scrolls past 55% of the page
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const scrollPercent = (scrollY / docHeight) * 100;
        if (scrollPercent >= 55) {
          setIsVisible(true);
        } else if (scrollPercent < 45) {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [nextPost, isDismissed]);

  if (!nextPost || isDismissed) return null;

  return (
    <div
      className={`fixed bottom-5 right-5 z-40 max-w-sm sm:max-w-md w-[calc(100vw-2.5rem)] transition-all duration-500 ease-out ${
        isVisible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-10 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-slate-950/95 text-white backdrop-blur-xl p-4 sm:p-5 rounded-3xl shadow-2xl border border-indigo-500/30 ring-1 ring-white/10 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-500/30 rounded-full blur-2xl pointer-events-none" />

        {/* Close / Dismiss button */}
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          aria-label="Kapat"
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="space-y-2 pr-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/30">
              <Sparkles className="w-3 h-3" /> Sıradaki Yazı
            </span>
            <span className="text-[11px] text-slate-400 truncate max-w-[150px]">
              {nextPost.category}
            </span>
          </div>

          <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug">
            {nextPost.title}
          </h4>

          <div className="pt-1 flex items-center justify-between gap-3">
            <Link
              href={`/post/${nextPost.slug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl transition-all shadow-md shadow-indigo-600/30 hover:scale-105"
            >
              <span>Okumaya Geç</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <span className="text-[10px] text-slate-400 font-medium">
              Önerilen İçerik
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
