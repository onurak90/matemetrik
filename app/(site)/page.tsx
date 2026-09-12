import React from 'react';
import Link from 'next/link';
import {
  Search, BookOpen, Sparkles, GraduationCap,
  FileText, Award, ArrowRight, CheckCircle2,
  TrendingUp, Compass, ArrowUpRight
} from 'lucide-react';
import { getPosts, getCategories, getTopPosts } from '@/lib/db';
import PostCard from '@/components/blog/PostCard';
import PostSlider from '@/components/home/PostSlider';
import FaqSection from '@/components/home/FaqSection';
import DynamicMathHero from '@/components/home/DynamicMathHero';

export const revalidate = 60; // ISR cache for blazing fast performance

export default function HomePage({
  searchParams,
}: {
  searchParams: { page?: string; q?: string; cat?: string };
}) {
  const currentPage = parseInt(searchParams.page || '1', 10);
  const searchQuery = searchParams.q || undefined;
  const categoryFilter = searchParams.cat || undefined;

  const { posts, total, totalPages } = getPosts({
    page: currentPage,
    limit: 12,
    search: searchQuery,
    category: categoryFilter,
    publishedOnly: true,
  });

  const categories = getCategories();
  // Fetch latest posts for slider (Son Yazılar)
  const { posts: sliderPosts } = getPosts({ page: 1, limit: 6, publishedOnly: true });

  const gradeCards = [
    { title: '1. Sınıf', slug: '1-sinif', level: 'İlkokul', color: 'from-amber-500 to-orange-500' },
    { title: '2. Sınıf', slug: '2-sinif', level: 'İlkokul', color: 'from-amber-500 to-orange-500' },
    { title: '3. Sınıf', slug: '3-sinif', level: 'İlkokul', color: 'from-amber-500 to-orange-500' },
    { title: '4. Sınıf', slug: '4-sinif', level: 'İlkokul', color: 'from-amber-500 to-orange-500' },
    { title: '5. Sınıf', slug: '5-sinif', level: 'Ortaokul', color: 'from-blue-500 to-cyan-600' },
    { title: '6. Sınıf', slug: '6-sinif', level: 'Ortaokul', color: 'from-blue-500 to-cyan-600' },
    { title: '7. Sınıf', slug: '7-sinif', level: 'Ortaokul', color: 'from-blue-500 to-cyan-600' },
    { title: '8. Sınıf', slug: '8-sinif', level: 'Ortaokul & LGS', color: 'from-blue-600 to-indigo-600' },
    { title: '9. Sınıf', slug: '9-sinif', level: 'Lise', color: 'from-indigo-600 to-purple-600' },
    { title: '10. Sınıf', slug: '10-sinif', level: 'Lise', color: 'from-indigo-600 to-purple-600' },
    { title: '11. Sınıf', slug: '11-sinif', level: 'Lise', color: 'from-indigo-600 to-purple-600' },
    { title: '12. Sınıf', slug: '12-sinif', level: 'AYT & YKS', color: 'from-purple-600 to-pink-600' },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Dynamic 3D Math Hero Section */}
      <DynamicMathHero searchQuery={searchQuery} />

      {/* Grade Level Cards (1. Sınıf - 12. Sınıf) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-10">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/5 border border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Sınıf Seviyesine Göre İçerikler
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Kendi sınıf düzeyinizdeki MEB müfredatına ve soru çözümlerine doğrudan erişin
              </p>
            </div>
            <Link
              href="/kategori/meb-ders-kitabi-cevaplari"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              Tüm MEB Çözümleri &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {gradeCards.map((grade) => (
              <Link
                key={grade.slug}
                href={`/kategori/${grade.slug}`}
                className="group p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-200/70 hover:border-indigo-300 transition-all text-center flex flex-col items-center justify-center space-y-1.5"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${grade.color} text-white font-black text-sm flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  {grade.title.split('.')[0]}
                </div>
                <div className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {grade.title}
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  {grade.level}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tools Showcase Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Karne Görüşü Tool */}
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 text-white flex flex-col justify-between shadow-lg shadow-indigo-950/20 group">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/30">
                <Sparkles className="w-3.5 h-3.5" /> e-Okul Uyumlu Öğretmen Asistanı
              </div>
              <h3 className="text-2xl font-bold tracking-tight">
                Karne Görüşü Robotu
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Dönem sonlarında e-Okul karne yükünü sıfıra indirin. Öğrencinin gelişim düzeyine ve karakterine uygun pedagojik, imla korumalı sonsuz varyasyonlu karne görüşü oluşturun.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/karne-gorusu-ureticisi"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-indigo-950 font-bold text-xs rounded-xl hover:bg-indigo-50 transition-colors shadow-md"
              >
                Karne Görüşü Üret &rarr;
              </Link>
            </div>
          </div>

          {/* Sınav Hazırlama Robotu Tool */}
          <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 to-slate-900 rounded-3xl p-8 text-white flex flex-col justify-between shadow-lg shadow-purple-950/20 group">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-400/30">
                <FileText className="w-3.5 h-3.5" /> Resmi MEB Formatında
              </div>
              <h3 className="text-2xl font-bold tracking-tight">
                Sınav Hazırlama Robotu
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Soru fotoğraflarınızı veya metinlerinizi peş peşe yükleyin, çift sütunlu MEB ortak sınav standartlarına %100 uyumlu hazır PDF yazılı kağıdınızı tek tıkla indirin.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/sinav-hazirlama-robotu"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-purple-950 font-bold text-xs rounded-xl hover:bg-purple-50 transition-colors shadow-md"
              >
                Sınav Kağıdı Oluştur &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            Son Yazılar
          </h2>
          <span className="text-xs text-slate-500 hidden sm:inline">
            En son eklenen güncel ders çözümleri ve makaleler
          </span>
        </div>
        <PostSlider posts={sliderPosts} />
      </section>

      {/* Blog Posts Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header with Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
              En Güncel İçerikler
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {searchQuery ? `"${searchQuery}" için Arama Sonuçları` : 'Blog Yazıları & Ders Çözümleri'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Toplam <strong className="text-slate-800">{total}</strong> içerik mevcut
            </p>
          </div>

          {/* Quick Category Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <Link
              href="/"
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
                !categoryFilter && !searchQuery
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Tümü
            </Link>
            {[
              { name: '10. Sınıf', slug: '10-sinif' },
              { name: '9. Sınıf', slug: '9-sinif' },
              { name: 'Kitap Özetleri', slug: 'kitap-ozet' },
              { name: 'Matematik Blog', slug: 'matematik-blog' },
              { name: 'Rehberlik', slug: 'egitim-rehberligi' },
              { name: 'YKS & Sınavlar', slug: 'yks' },
            ].map((cat) => (
              <Link
                key={cat.slug}
                href={`/?cat=${cat.slug}`}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
                  categoryFilter === cat.slug
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <p className="text-base text-slate-600 font-medium">
              Aramanıza uygun içerik bulunamadı.
            </p>
            <Link
              href="/"
              className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold"
            >
              Tüm Yazıları Görüntüle
            </Link>
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
                href={`/?page=${currentPage - 1}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ''}${categoryFilter ? `&cat=${categoryFilter}` : ''}`}
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
                href={`/?page=${currentPage + 1}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ''}${categoryFilter ? `&cat=${categoryFilter}` : ''}`}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Sonraki &rarr;
              </Link>
            )}
          </div>
        )}
      </section>

      {/* Sıkça Sorulan Sorular (FAQ Section with Schema.org) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <FaqSection />
      </div>
    </div>
  );
}
