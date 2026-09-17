import React from 'react';
import Link from 'next/link';
import {
  Search, BookOpen, Sparkles, GraduationCap,
  FileText, Award, ArrowRight, CheckCircle2,
  TrendingUp, Compass, ArrowUpRight, Calendar, Users
} from 'lucide-react';
import { getPosts, getCategories, getTopPosts, getMebBookMasterPosts } from '@/lib/db';
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
    excludePageSolutions: !searchQuery,
  });

  const categories = getCategories();
  // Fetch latest posts for slider (Son Yazılar) excluding individual page solutions
  const { posts: sliderPosts } = getPosts({ 
    page: 1, 
    limit: 6, 
    publishedOnly: true, 
    excludePageSolutions: true 
  });

  const mebBooks = getMebBookMasterPosts();

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

      {/* Compact Grade Level Navigation (1. Sınıf - 12. Sınıf) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-10">
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xl shadow-slate-900/5 border border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                Sınıf Seviyesine Göre İçerikler
              </h2>
              <span className="text-[11px] text-slate-500 hidden md:inline">
                &bull; MEB müfredatı ve çözümler
              </span>
            </div>
            <Link
              href="/kategori/meb-ders-kitabi-cevaplari"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              Tüm MEB Çözümleri &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-1.5 sm:gap-2">
            {gradeCards.map((grade) => (
              <Link
                key={grade.slug}
                href={`/kategori/${grade.slug}`}
                className="group flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-xl bg-slate-50 hover:bg-indigo-600 border border-slate-200/80 hover:border-indigo-600 transition-all text-center"
                title={`${grade.title} (${grade.level})`}
              >
                <span className={`w-5 h-5 rounded-md bg-gradient-to-tr ${grade.color} text-white font-black text-[10px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                  {grade.title.split('.')[0]}
                </span>
                <span className="font-bold text-xs text-slate-800 group-hover:text-white transition-colors truncate">
                  {grade.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2026-2027 MEB Ders Kitabı Cevapları Showcase Section */}
      {mebBooks.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-900/50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                    2026 - 2027 GÜNCEL
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    MEB DERS KİTAPLARI
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                  MEB Ders Kitabı Cevapları (Tüm Sınıf ve Dersler)
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                  Milli Eğitim Bakanlığı ders kitaplarında yer alan tüm ünite, alıştırma, sıra sizde ve ölçme değerlendirme sorularının sayfa sayfa adım adım doğrulanmış çözümleri.
                </p>
              </div>
              <Link
                href="/kategori/meb-ders-kitabi-cevaplari"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-indigo-950 text-xs font-bold hover:bg-indigo-50 transition-colors shrink-0 shadow-sm"
              >
                Tüm Kitapları İncele &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { slug: '9-sinif', name: '9. Sınıf', count: '7 Ders' },
                { slug: '10-sinif', name: '10. Sınıf', count: '6 Ders' },
                { slug: '11-sinif', name: '11. Sınıf', count: '6 Ders' },
              ].map((g) => {
                const groupBooks = mebBooks.filter((b) => b.category_slug === g.slug);
                if (groupBooks.length === 0) return null;

                return (
                  <div key={g.slug} className="bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/10 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
                          <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                            {g.name} Kitapları
                          </h3>
                        </div>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/20">
                          {g.count}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {groupBooks.map((book) => {
                          let shortName = book.title
                            .replace(/^2026-2027\s*MEB\s*/i, '')
                            .replace(/\s*Ders Kitabı Cevapları\s*/i, '')
                            .replace(/\s*Çalışma Kitabı Cevapları\s*/i, '')
                            .trim();
                          
                          if (book.title.includes('9. Sınıf 1. Kitap') || (book.category_slug === '9-sinif' && shortName.startsWith('Matematik') && !book.title.includes('2. Kitap'))) {
                            shortName = '9. Sınıf Matematik (1. Kitap)';
                          } else if (book.title.includes('9. Sınıf 2. Kitap')) {
                            shortName = '9. Sınıf Matematik (2. Kitap)';
                          } else if (book.title.includes('Temel Matematik')) {
                            shortName = '11. Sınıf Temel Matematik';
                          } else {
                            const m = shortName.match(/^(.*?)\s*\((.*?)\)$/);
                            if (m) {
                              shortName = `${m[2]} ${m[1]}`;
                            }
                          }

                          return (
                            <Link
                              key={book.id}
                              href={`/post/${book.slug}`}
                              className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/5 hover:bg-indigo-600 border border-white/10 hover:border-indigo-400 text-xs sm:text-sm font-medium text-slate-200 hover:text-white transition-all group shadow-sm"
                            >
                              <span className="truncate">{shortName}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-indigo-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform shrink-0 ml-2" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/kategori/${g.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 hover:text-white transition-colors"
                      >
                        Tüm {g.name} Çözümleri &rarr;
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

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

          {/* Yıllık Plan Hazırlama Tool */}
          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 to-slate-900 rounded-3xl p-8 text-white flex flex-col justify-between shadow-lg shadow-emerald-950/20 group">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
                <Calendar className="w-3.5 h-3.5" /> Maarif Modeli &amp; LGS Uyumlu
              </div>
              <h3 className="text-2xl font-bold tracking-tight">
                Yıllık Plan Hazırlama Robotu
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                1&apos;den 8&apos;e tüm sınıf ve branşlarda MEB çerçeve yıllık planları. Okul ve öğretmen bilgilerinizi girin, haftalık kazanım ve farklılaştırma tablolarınızı Excel ve yatay A4 PDF formatında anında indirin.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/yillik-plan-hazirlama"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-emerald-950 font-bold text-xs rounded-xl hover:bg-emerald-50 transition-colors shadow-md"
              >
                Yıllık Plan Hazırla &rarr;
              </Link>
            </div>
          </div>

          {/* Kulüp Evrakları & Toplantı Tutanakları Tool */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-slate-900 rounded-3xl p-8 text-white flex flex-col justify-between shadow-lg shadow-blue-950/20 group">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
                <Users className="w-3.5 h-3.5" /> MEB Sosyal Etkinlikler Yönetmeliği
              </div>
              <h3 className="text-2xl font-bold tracking-tight">
                Kulüp Toplantı Tutanakları Robotu
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                38 resmi kulüp için İç Tüzük, 1. Dönem Genel Kurul Tutanağı, Yıllık Çalışma Planı, Görevli Öğrenci Listesi, Faaliyet Raporu ve Ek-5 Veli İzin Belgesi. Tek tıkla Word (.docx) ve PDF olarak alın.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/kulup-toplanti-tutanaklari"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-950 font-bold text-xs rounded-xl hover:bg-blue-50 transition-colors shadow-md"
              >
                Kulüp Evraklarını Al &rarr;
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
