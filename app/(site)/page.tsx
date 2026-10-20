import React from 'react';
import Link from 'next/link';
import {
  Search, BookOpen, Sparkles, GraduationCap,
  FileText, Award, ArrowRight, CheckCircle2,
  TrendingUp, Compass, ArrowUpRight, Calendar, Users, Calculator, Zap
} from 'lucide-react';
import { getDb, getPosts, getCategories, getTopPosts, getMebBookMasterPosts } from '@/lib/db';
import PostCard from '@/components/blog/PostCard';
import PostSlider from '@/components/home/PostSlider';
import FaqSection from '@/components/home/FaqSection';
import DynamicMathHero from '@/components/home/DynamicMathHero';
import BookSummariesSection from '@/components/home/BookSummariesSection';

export const revalidate = 3600; // 1 hour edge cache ISR

export default async function HomePage({
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
    excludePageSolutions: !searchQuery,
  });

  const categories = getCategories();
  // Fetch latest posts for slider (Son Yazılar) excluding individual page solutions
  const { posts: sliderPosts } = getPosts({ 
    page: 1, 
    limit: 10, 
    publishedOnly: true, 
    excludePageSolutions: true 
  });

  const mebBooks = getMebBookMasterPosts();
  // Fetch latest book summaries for homepage grid
  const { posts: bookSummaries } = getPosts({
    category: 'kitap-ozet',
    limit: 12,
    publishedOnly: true,
  });

  const gradeCards = [
    { title: '1. Sınıf', slug: '1-sinif', level: 'İlkokul', color: 'from-amber-500 to-orange-500', badge: '1' },
    { title: '2. Sınıf', slug: '2-sinif', level: 'İlkokul', color: 'from-amber-500 to-orange-500', badge: '2' },
    { title: '3. Sınıf', slug: '3-sinif', level: 'İlkokul', color: 'from-amber-500 to-orange-500', badge: '3' },
    { title: '4. Sınıf', slug: '4-sinif', level: 'İlkokul', color: 'from-amber-500 to-orange-500', badge: '4' },
    { title: '5. Sınıf', slug: '5-sinif', level: 'Ortaokul', color: 'from-blue-500 to-cyan-600', badge: '5' },
    { title: '6. Sınıf', slug: '6-sinif', level: 'Ortaokul', color: 'from-blue-500 to-cyan-600', badge: '6' },
    { title: '7. Sınıf', slug: '7-sinif', level: 'Ortaokul', color: 'from-blue-500 to-cyan-600', badge: '7' },
    { title: '8. Sınıf', slug: '8-sinif', level: 'Ortaokul & LGS', color: 'from-blue-600 to-indigo-600', badge: '8' },
    { title: '9. Sınıf', slug: '9-sinif', level: 'Lise', color: 'from-indigo-600 to-purple-600', badge: '9' },
    { title: '10. Sınıf', slug: '10-sinif', level: 'Lise', color: 'from-indigo-600 to-purple-600', badge: '10' },
    { title: '11. Sınıf', slug: '11-sinif', level: 'Lise', color: 'from-indigo-600 to-purple-600', badge: '11' },
    { title: '12. Sınıf', slug: '12-sinif', level: 'AYT & YKS', color: 'from-purple-600 to-pink-600', badge: '12' },
    { title: 'ALES', slug: 'ales', level: 'ÖSYM Sınavı', color: 'from-violet-600 to-indigo-700', badge: 'AL' },
    { title: 'YDS', slug: 'yds', level: 'ÖSYM Sınavı', color: 'from-emerald-600 to-teal-700', badge: 'YD' },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Dynamic 3D Math Hero Section (Animated Greeting) */}
      <DynamicMathHero searchQuery={searchQuery} />

      {/* 2. Compact Grade Level Navigation (1. Sınıf - 12. Sınıf, ALES & YDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-10">
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xl shadow-slate-900/5 border border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                Sınıf Seviyeleri ve Sınavlar
              </h2>
              <span className="text-[11px] text-slate-500 hidden md:inline">
                &bull; MEB müfredatı, ALES &amp; YDS çözümleri
              </span>
            </div>
            <Link
              href="/kategori/meb-ders-kitabi-cevaplari"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              Tüm MEB Çözümleri &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-14 gap-1.5 sm:gap-2">
            {gradeCards.map((grade) => (
              <Link
                key={grade.slug}
                href={`/kategori/${grade.slug}`}
                className="group flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl bg-slate-50 hover:bg-indigo-600 border border-slate-200/80 hover:border-indigo-600 transition-all text-center"
                title={`${grade.title} (${grade.level})`}
              >
                <span className={`w-5 h-5 rounded-md bg-gradient-to-tr ${grade.color} text-white font-black text-[9px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                  {grade.badge}
                </span>
                <span className="font-bold text-xs text-slate-800 group-hover:text-white transition-colors truncate">
                  {grade.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2b. MEB DERS KİTABI CEVAPLARI (Sınıf Seviyeleri ile Aynı Minimal Kart Yapısında, Hemen Altında) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 relative z-10">
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xl shadow-slate-900/5 border border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                MEB Ders Kitabı Cevapları
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-extrabold border border-emerald-200">
                  2026-2027 GÜNCEL
                </span>
              </h2>
              <span className="text-[11px] text-slate-500 hidden md:inline">
                &bull; Tüm sınıfların sayfa sayfa doğrulanmış çözümleri
              </span>
            </div>
            <Link
              href="/kategori/meb-ders-kitabi-cevaplari"
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
            >
              Tüm Kitap Çözümleri &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-1.5 sm:gap-2">
            {[
              { title: '1. Sınıf', slug: '1-sinif', badge: '1', color: 'from-emerald-500 to-teal-600' },
              { title: '2. Sınıf', slug: '2-sinif', badge: '2', color: 'from-emerald-500 to-teal-600' },
              { title: '3. Sınıf', slug: '3-sinif', badge: '3', color: 'from-emerald-500 to-teal-600' },
              { title: '4. Sınıf', slug: '4-sinif', badge: '4', color: 'from-emerald-500 to-teal-600' },
              { title: '5. Sınıf', slug: '5-sinif', badge: '5', color: 'from-teal-600 to-cyan-600' },
              { title: '6. Sınıf', slug: '6-sinif', badge: '6', color: 'from-teal-600 to-cyan-600' },
              { title: '7. Sınıf', slug: '7-sinif', badge: '7', color: 'from-teal-600 to-cyan-600' },
              { title: '8. Sınıf', slug: '8-sinif', badge: '8', color: 'from-cyan-600 to-blue-600' },
              { title: '9. Sınıf', slug: '9-sinif', badge: '9', color: 'from-blue-600 to-indigo-600' },
              { title: '10. Sınıf', slug: '10-sinif', badge: '10', color: 'from-indigo-600 to-purple-600' },
              { title: '11. Sınıf', slug: '11-sinif', badge: '11', color: 'from-purple-600 to-pink-600' },
              { title: '12. Sınıf', slug: '12-sinif', badge: '12', color: 'from-pink-600 to-rose-600' },
            ].map((book) => (
              <Link
                key={book.slug}
                href={`/kategori/${book.slug}`}
                className="group flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl bg-slate-50 hover:bg-emerald-600 border border-slate-200/80 hover:border-emerald-600 transition-all text-center"
                title={`${book.title} MEB Ders Kitabı Cevapları`}
              >
                <span className={`w-5 h-5 rounded-md bg-gradient-to-tr ${book.color} text-white font-black text-[9px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                  {book.badge}
                </span>
                <span className="font-bold text-xs text-slate-800 group-hover:text-white transition-colors truncate">
                  {book.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. LATEST POSTS SLIDER (Son Yazılar - Üstte) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Son Yazılar
            </h2>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
              GÜNCEL &amp; SICAK
            </span>
          </div>
          <Link
            href="/post"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group self-start sm:self-auto"
          >
            Tüm Yazıları İncele ({total})
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <PostSlider posts={sliderPosts} />
      </section>

      {/* 3b. RECENT BOOK SUMMARIES (Son Kitap Özetleri - Küçük Kapak Resimleri) */}
      <BookSummariesSection books={bookSummaries} />

      {/* 4. BLOG POSTS GRID SECTION (Son Yazıların Hemen Altında) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header with Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Eğitim Gündemi &amp; Blog
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {searchQuery ? `"${searchQuery}" için Arama Sonuçları` : 'Blog Yazıları & Rehberler'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Öğretmen haberleri, MEB ortak sınavları, rehberlik ve ders çözümleri (Toplam <strong className="text-slate-800">{total}</strong> içerik)
            </p>
          </div>

          {/* Quick Category Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <Link
              href="/"
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                !categoryFilter && !searchQuery
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50'
              }`}
            >
              Tümü
            </Link>
            {[
              { name: 'Blog', slug: 'blog' },
              { name: 'Öğretmen & MEB', slug: 'ogretmen' },
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
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  categoryFilter === cat.slug
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <p className="text-base text-slate-600 font-medium">
              Aramanıza uygun içerik bulunamadı.
            </p>
            <Link
              href="/"
              className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold"
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

      {/* 5. HESAPLAMA VE ÖĞRETMEN ROBOTLARI (Minimal & Şık 5'li Kart Izgarası) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
          <div className="space-y-0.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Akıllı Eğitim Asistanları
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Öğretmen ve Öğrenci Robotları
            </h3>
          </div>
          <Link
            href="/hesaplama-araclari"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group self-start sm:self-auto"
          >
            Tüm Hesaplama Araçları (15+)
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* 1. LGS & YKS Puan Hesaplama */}
          <Link
            href="/puan-hesaplama-robotu"
            className="group bg-white rounded-2xl p-4.5 border border-slate-200/80 hover:border-rose-400 hover:shadow-lg transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                  <Calculator className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                  LGS &amp; YKS
                </span>
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-rose-600 transition-colors">
                  Puan Hesaplama
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  Netlerinizden 2026-2027 katsayıları, OBP ve tahmini yüzdelik dilim hesaplayın.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-rose-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Puan Hesapla &rarr;
            </span>
          </Link>

          {/* 2. Karne Görüşü */}
          <Link
            href="/karne-gorusu-ureticisi"
            className="group bg-white rounded-2xl p-4.5 border border-slate-200/80 hover:border-indigo-400 hover:shadow-lg transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  e-Okul
                </span>
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Karne Görüşü Robotu
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  Öğrenci düzeyine özel pedagojik ve imla korumalı karne görüşleri oluşturun.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-indigo-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Görüş Üret &rarr;
            </span>
          </Link>

          {/* 3. Sınav Hazırlama */}
          <Link
            href="/sinav-hazirlama-robotu"
            className="group bg-white rounded-2xl p-4.5 border border-slate-200/80 hover:border-purple-400 hover:shadow-lg transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                  MEB Formatı
                </span>
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-purple-600 transition-colors">
                  Sınav Hazırlama
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  Soruları ekleyin, MEB ortak sınav standartlarında çift sütunlu PDF kağıt indirin.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-purple-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Sınav Hazırla &rarr;
            </span>
          </Link>

          {/* 4. Yıllık Plan Hazırlama */}
          <Link
            href="/yillik-plan-hazirlama"
            className="group bg-white rounded-2xl p-4.5 border border-slate-200/80 hover:border-emerald-400 hover:shadow-lg transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Maarif Modeli
                </span>
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Yıllık Plan Robotu
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  Tüm branşlarda haftalık kazanım ve çerçeve yıllık planlarını Excel ve PDF alın.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Plan Hazırla &rarr;
            </span>
          </Link>

          {/* 5. Kulüp Toplantı Tutanakları */}
          <Link
            href="/kulup-toplanti-tutanaklari"
            className="group bg-white rounded-2xl p-4.5 border border-slate-200/80 hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  38 Kulüp
                </span>
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                  Kulüp Evrakları
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  Sosyal etkinlik kulüp tüzük, genel kurul tutanağı ve çalışma planlarını indirin.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Evrakları Al &rarr;
            </span>
          </Link>
        </div>
      </section>

      {/* 7. Sıkça Sorulan Sorular (FAQ Section with Schema.org) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <FaqSection />
      </div>
    </div>
  );
}
