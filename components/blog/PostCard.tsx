import React from 'react';
import Link from 'next/link';
import { Calendar, Eye, Clock, ArrowUpRight } from 'lucide-react';
import { Post } from '@/lib/types';
import { formatDate, estimateReadingTime } from '@/lib/utils';

export default function PostCard({ post }: { post: Post }) {
  const readingTime = estimateReadingTime(post.content || '');

  return (
    <article className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300 flex flex-col">
      {/* Image thumbnail if available */}
      {post.featured_image ? (
        <Link
          href={`/post/${post.slug}`}
          className="relative aspect-[16/9] overflow-hidden bg-slate-100 block"
        >
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/95 text-indigo-700 shadow-sm backdrop-blur-sm">
              {post.category}
            </span>
          </div>
        </Link>
      ) : (
        <div className="p-5 pb-0">
          <span className="inline-block text-[11px] font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
            {post.category}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.created_at)}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {readingTime}
            </span>
          </div>

          <h2 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
            <Link href={`/post/${post.slug}`}>
              {post.title}
            </Link>
          </h2>

          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
            {post.excerpt || post.content.replace(/<[^>]+>/g, ' ').slice(0, 120)}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-400 flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            {post.views} görüntülenme
          </span>

          <Link
            href={`/post/${post.slug}`}
            className="font-semibold text-indigo-600 group-hover:text-indigo-800 flex items-center gap-0.5"
          >
            İncele
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
