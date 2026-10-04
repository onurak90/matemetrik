import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  BookOpen, ChevronRight, Search, Sparkles, Filter,
  GraduationCap, FileText, Layers, Compass, Award
} from 'lucide-react';
import { getDb, getPosts, getCategories } from '@/lib/db';
import { syncBlobPostsIntoDb } from '@/lib/blobSync';
import PostCard from '@/components/blog/PostCard';

interface PostIndexPageProps {
  searchParams: { page?: string; cat?: string; q?: string };
}

export const revalidate = 3600; // 1 hour edge cache

export async function generateMetadata({ searchParams }: PostIndexPageProps): Promise<Metadata> {
  const cat = searchParams.cat;
  let title = 'Tüm Blog Yazıları, Makaleler ve Sınav Rehberi | Matemetrik';
  let description = 'Matemetrik blog ve makaleler arşivi: Matematik dünyası, MEB ortak sınav takvimi, YKS-LGS rehberliği, öğretmen kaynakları ve güncel eğitim yazıları.';

  if (cat === 'matematik-blog') {
    title = 'Matematik Blog ve Popüler Bilim Makaleleri | Matemetrik';
    description = 'Matematik dünyasından ilgi çekici makaleler, matematiksel ispatlar, tarihteki matematikçiler ve bilim yazıları.';
  } else if (cat === 'sinavlar') {
    title = 'MEB Ortak Sınavlar ve YKS-LGS Rehberlik Makaleleri | Matemetrik';
    description = '2026-2027 MEB ülke geneli ortak yazılı sınav takvimi, konu-soru dağılım tabloları ve sınav hazırlık kılavuzları.';
  } else if (cat === 'ogretmen') {
    title = 'Öğretmenler İçin Kaynaklar, Yıllık Planlar ve Yazılı Rehberi | Matemetrik';
    description = 'Zümre öğretmenleri için açık uçlu sınav hazırlama rehberi, analitik puanlama anahtarı (rubrik) ve eğitim materyalleri.';
  } else if (cat === 'kitap-ozet') {
    title = 'Dünya ve Türk Klasikleri Kitap Özetleri | Matemetrik';
    description = 'Edebiyat dersleri ve genel kültür için kapsamlı kitap özetleri, karakter tahlilleri ve ana fikir analizleri.';
  }

  return {
    title,
    description,
    alternates: {
      canonical: 'https://www.matemetrik.com/post',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.matemetrik.com/post',
      type: 'website',
    },
  };
}

export default async function PostIndexPage({ searchParams }: PostIndexPageProps) {
  await syncBlobPostsIntoDb(getDb());
  const currentPage = Math.max(1, parseInt(searchParams.page || '1', 10));
  const activeCat = searchParams.cat || 'tumu';
  const searchQuery = searchParams.q?.trim() || '';

  // Resolve category filter mapping
  let categoryFilter: string | string[] | undefined = undefined;
  if (activeCat === 'matematik-blog') {
    categoryFilter = 'matematik-blog';
  } else if (activeCat === 'sinavlar') {
    categoryFilter = ['egitim-rehberligi', 'yks', 'ales', 'yds'];
  } else if (activeCat === 'ogretmen') {
    categoryFilter = ['ogretmen', 'rehberlik-ve-ogretmen'];
  } else if (activeCat === 'ders-kitaplari') {
    categoryFilter = 'meb-ders-kitabi-cevaplari';
  } else if (activeCat === 'kitap-ozet') {
    categoryFilter = 'kitap-ozet';
  }

  // Fetch posts with excludePageSolutions: true (so 3,500 raw single page exercises don't flood the blog)
  const { posts, total, totalPages } = getPosts({
    page: currentPage,
    limit: 12,
    category: categoryFilter,
    search: searchQuery || undefined,
    publishedOnly: true,
    excludePageSolutions: true,
  });

  const filterTabs = [
    { key: 'tumu', label: 'Tüm Yazılar', icon: '📚' },
    { key: 'matematik-blog', label: 'Matematik Blog', icon: '📐' },
    { key: 'sinavlar', label: 'MEB & Sınavlar', icon: '📢' },
    { key: 'ogretmen', label: 'Öğretmen & Rehberlik', icon: '🎓' },
    { key: 'ders-kitaplari', label: 'Ders Kitabı Rehberleri', icon: '📖' },
    { key: 'kitap-ozet', label: 'Kitap Özetleri', icon: '📑' },
  ];

  const buildQueryUrl = (newCat: string, newPage = 1, newQ = searchQuery) => {
    const params = new URLSearchParams();
    if (newCat && newCat !== 'tumu') params.set('cat', newCat);
    if (newPage > 1) params.set('page', newPage.toString());
    if (newQ) params.set('q', newQ);
    const qs = params.toString();
    return qs ? `/post?${qs}` : '/post';
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ana Sayfa',
        item: 'https://www.matemetrik.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog & Makaleler',
        item: 'https://www.matemetrik.com/post',
      },
    ],
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Matemetrik Blog, Makaleler ve Eğitim Rehberi',
    description: 'Matematik, MEB sınavları, YKS rehberliği ve eğitim içeriklerinin tamamı.',
    url: 'https://www.matemetrik.com/post',
  };

  return (
    <div className="py-10 pb-24 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Ana Sayfa
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Blog &amp; Makaleler</span>
          {activeCat !== 'tumu' && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-indigo-600 font-bold capitalize">
                {filterTabs.find((t) => t.key === activeCat)?.label || activeCat}
              </span>
            </>
          )}
          {searchQuery && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-700 italic">"{searchQuery}" araması</span>
            </>
          )}
        </nav>

        {/* Hero Header */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-indigo-200 text-xs font-bold border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>Blog &bull; Makaleler &bull; Sınav ve Eğitim Rehberi</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Tüm Blog Yazıları ve Makaleler
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Matematik dünyasından popüler bilim makaleleri, 2026-2027 MEB ülke geneli ortak yazılı sınav takvimi, konu-soru dağılım senaryoları, öğretmen rehberleri ve ders içeriklerinin tümü tek çatı altında.
            </p>

            {/* Search Input Box */}
            <form action="/post" method="GET" className="pt-2 max-w-md">
              {activeCat !== 'tumu' && <input type="hidden" name="cat" value={activeCat} />}
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  name="q"
                  defaultValue={searchQuery}
                  placeholder="Yazılarda ve makalelerde ara..."
                  className="w-full pl-11 pr-24 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  Ara
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = activeCat === tab.key;
            return (
              <Link
                key={tab.key}
                href={buildQueryUrl(tab.key, 1, searchQuery)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-xs ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Results Counter & Search Reset */}
        <div className="flex items-center justify-between gap-4 pt-2 border-b border-slate-100 pb-4">
          <div className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-2">
            <span>Toplam</span>
            <span className="px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 font-black border border-indigo-100">
              {total} İçerik
            </span>
            <span>bulundu</span>
            {searchQuery && (
              <span className="text-slate-400 font-normal">
                (Arama: <strong className="text-slate-700">"{searchQuery}"</strong>)
              </span>
            )}
          </div>

          {searchQuery && (
            <Link
              href={buildQueryUrl(activeCat, 1, '')}
              className="text-xs text-rose-600 hover:underline font-bold"
            >
              ✕ Aramayı Temizle
            </Link>
          )}
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="p-12 sm:p-16 bg-white rounded-3xl border border-slate-200 text-center space-y-4 shadow-xs">
            <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-3xl mx-auto shadow-inner">
              🔍
            </div>
            <h3 className="text-lg font-bold text-slate-900">Aradığınız kriterlere uygun yazı bulunamadı.</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Farklı bir arama terimi deneyebilir veya kategoriler arasında geçiş yaparak diğer blog ve makaleleri inceleyebilirsiniz.
            </p>
            <div className="pt-2">
              <Link
                href="/post"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors shadow-md"
              >
                Tüm Yazıları Göster
              </Link>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-8">
            {currentPage > 1 && (
              <Link
                href={buildQueryUrl(activeCat, currentPage - 1, searchQuery)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
              >
                &larr; Önceki
              </Link>
            )}

            <span className="px-4 py-2 text-xs font-medium text-slate-500">
              Sayfa <strong className="text-slate-900">{currentPage}</strong> / {totalPages}
            </span>

            {currentPage < totalPages && (
              <Link
                href={buildQueryUrl(activeCat, currentPage + 1, searchQuery)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
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
