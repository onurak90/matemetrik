import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import type { Post } from '@/lib/types';

interface PrevNextNavProps {
  prev: Post | null;
  next: Post | null;
}

export default function PrevNextNav({ prev, next }: PrevNextNavProps) {
  if (!prev && !next) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-slate-200/80">
      {prev ? (
        <Link
          href={`/post/${prev.slug}`}
          className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all flex items-center gap-3 text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 text-slate-500 flex items-center justify-center shrink-0 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
              &larr; Önceki Yazı
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
              {prev.title}
            </div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/post/${next.slug}`}
          className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-3 text-right"
        >
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
              Sonraki Yazı &rarr;
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
              {next.title}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 text-slate-500 flex items-center justify-center shrink-0 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </div>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
