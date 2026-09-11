import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { FolderTree, ChevronRight, BookOpen } from 'lucide-react';
import { getCategoryBySlug, getPosts, getCategories } from '@/lib/db';
import PostCard from '@/components/blog/PostCard';

interface CategoryPageProps {
  params: { slug: string };
  searchParams: { page?: string };
}

export const revalidate = 60; // ISR

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const cat = getCategoryBySlug(params.slug);
  const name = cat ? cat.name : params.slug.replace('-', ' ').toUpperCase();

  return {
    title: `${name} Ders Notları, Çözümler ve Konu Anlatımları`,
    description: cat?.description || `${name} kategorisine ait tüm MEB ders kitabı cevapları ve matematik çözümleri.`,
    alternates: {
      canonical: `https://www.matemetrik.com/kategori/${params.slug}`,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const cat = getCategoryBySlug(params.slug);
  const currentPage = parseInt(searchParams.page || '1', 10);

  const { posts, total, totalPages } = getPosts({
    page: currentPage,
    limit: 12,
    category: params.slug,
    publishedOnly: true,
  });

  const allCategories = getCategories();
  const categoryName = cat ? cat.name : params.slug;

  return (
    <div className="py-12 pb-24 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Ana Sayfa
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">{categoryName}</span>
        </nav>

        {/* Category Header */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
              <FolderTree className="w-3.5 h-3.5" />
              Kategori &bull; {total} Yazı
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {categoryName}
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {cat?.description || `${categoryName} kategorisinde yer alan tüm MEB ders kitabı sayfa çözümleri, kazanım testleri, konu özetleri ve online çalışma materyalleri.`}
            </p>
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="p-16 bg-white rounded-3xl border border-slate-200 text-center text-slate-500">
            Bu kategoride henüz yazı bulunmamaktadır.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-8">
            {currentPage > 1 && (
              <Link
                href={`/kategori/${params.slug}?page=${currentPage - 1}`}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                &larr; Önceki
              </Link>
            )}

            <span className="px-4 py-2 text-xs font-medium text-slate-500">
              Sayfa <strong className="text-slate-900">{currentPage}</strong> / {totalPages}
            </span>

            {currentPage < totalPages && (
              <Link
                href={`/kategori/${params.slug}?page=${currentPage + 1}`}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Sonraki &rarr;
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
