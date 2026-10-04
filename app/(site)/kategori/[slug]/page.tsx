import React from 'react';
import { notFound, permanentRedirect } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { FolderTree, ChevronRight, BookOpen, ArrowRight } from 'lucide-react';
import { getDb, getCategoryBySlug, getPosts, getCategories, getMebBookMasterPosts } from '@/lib/db';
import { syncBlobPostsIntoDb } from '@/lib/blobSync';
import PostCard from '@/components/blog/PostCard';
import GradeSubjectSolutions from '@/components/category/GradeSubjectSolutions';

interface CategoryPageProps {
  params: { slug: string };
  searchParams: { page?: string; ders?: string };
}

export const revalidate = 3600; // 1 hour edge cache

export async function generateMetadata({ params, searchParams }: CategoryPageProps): Promise<Metadata> {
  if (params.slug === 'matematik-blog') {
    return {
      title: 'Tüm Blog Yazıları, Makaleler ve Sınav Rehberi | Matemetrik',
      description: 'Matemetrik blog ve makaleler arşivi.',
      alternates: {
        canonical: 'https://www.matemetrik.com/post',
      },
    };
  }

  const cat = getCategoryBySlug(params.slug);
  const name = cat ? cat.name : params.slug.replace('-', ' ').toUpperCase();
  const dersTitle = searchParams?.ders ? ` - ${searchParams.ders.toUpperCase()} Ders Çözümleri` : '';

  return {
    title: `${name}${dersTitle} Ders Notları, MEB Çözümleri ve Konu Anlatımları`,
    description: cat?.description || `${name} kategorisine ait tüm MEB ders kitabı cevapları, sayfa çözümleri ve konu testleri.`,
    alternates: {
      canonical: `https://www.matemetrik.com/kategori/${params.slug}`,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  if (params.slug === 'matematik-blog') {
    permanentRedirect('/post');
  }

  await syncBlobPostsIntoDb(getDb());

  const cat = getCategoryBySlug(params.slug);
  const currentPage = parseInt(searchParams.page || '1', 10);
  const dersFilter = searchParams.ders;
  const isGradeCategory = /^([1-9]|1[0-2])-sinif$/.test(params.slug);

  const { posts, total, totalPages } = getPosts({
    page: currentPage,
    limit: 12,
    category: params.slug,
    search: dersFilter,
    publishedOnly: true,
  });

  const totalAllPosts = isGradeCategory && dersFilter
    ? getPosts({ category: params.slug, publishedOnly: true, limit: 1 }).total
    : total;

  const allCategories = getCategories();
  const categoryName = cat ? cat.name : params.slug;
  const isMebCategory = params.slug === 'meb-ders-kitabi-cevaplari';
  const mebBooks = isMebCategory ? getMebBookMasterPosts() : [];
  const dersQuery = dersFilter ? `&ders=${encodeURIComponent(dersFilter)}` : '';

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
        name: categoryName,
        item: `https://www.matemetrik.com/kategori/${params.slug}`,
      },
    ],
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${categoryName} - Ders Notları ve MEB Çözümleri`,
    description: cat?.description || `${categoryName} kategorisine ait MEB çözümleri ve matematik ders materyalleri.`,
    url: `https://www.matemetrik.com/kategori/${params.slug}`,
  };

  return (
    <div className="py-12 pb-24 space-y-12">
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
          <span className="text-slate-900 font-semibold">{categoryName}</span>
          {dersFilter && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-indigo-600 font-bold capitalize">{dersFilter}</span>
            </>
          )}
        </nav>

        {/* Category Header */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
              <FolderTree className="w-3.5 h-3.5" />
              Kategori &bull; {isMebCategory ? `${mebBooks.length} Kitap &bull; 4.000+ Sayfa Çözümü` : `${totalAllPosts} Yazı`}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {categoryName}
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {cat?.description || `${categoryName} kategorisinde yer alan tüm MEB ders kitabı sayfa çözümleri, kazanım testleri, konu özetleri ve online çalışma materyalleri.`}
            </p>
          </div>
        </div>

        {/* YDS Özel İnteraktif Çalışma Bölümü Bannerı */}
        {params.slug === 'yds' && (
          <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-emerald-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                <span>🎯 2026-2027 ÖSYM YDS &amp; YÖKDİL Hazırlık Platformu</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                YDS Çalışma Bölümü (2.000 Çözümlü Soru)
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Kelime Bilgisi, Gramer, Cloze Test, Cümle Tamamlama, Çeviri ve Paragraf gibi 11 farklı soru türünde 2.000 açıklamalı çözümlü soru bankamızla sınava interaktif hazırlanın. Doğru cevaplar yeşil, yanlışlar kırmızı; anında Türkçe çeviri ve çözüm analizi!
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-emerald-200 pt-1">
                <span className="bg-white/10 px-2.5 py-1 rounded-lg">✓ 11 Soru Kategorisi</span>
                <span className="bg-white/10 px-2.5 py-1 rounded-lg">✓ Çözümü Göster &amp; Açıkla</span>
                <span className="bg-white/10 px-2.5 py-1 rounded-lg">✓ %100 Ücretsiz</span>
              </div>
            </div>
            <div className="shrink-0 w-full md:w-auto">
              <Link
                href="/yds-calisma-bolumu"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 text-white font-bold text-sm rounded-2xl transition-all shadow-lg shadow-emerald-600/20 group-hover:scale-105"
              >
                <span>YDS Testlerini Başlat</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Sınıf Seviyesine Özel Ders Ders Kitap Çözümleri Butonları ve Filtreleme */}
        {isGradeCategory && (
          <GradeSubjectSolutions
            gradeSlug={params.slug}
            categoryName={categoryName}
            currentDers={dersFilter}
            totalPosts={totalAllPosts}
          />
        )}

        {/* 2026-2027 MEB Ders Kitabı Cevapları Showcase Section (Tüm Sınıflar İçin) */}
        {isMebCategory && mebBooks.length > 0 && (
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
                  Tüm Sınıf ve Ders Kitapları (1-12. Sınıf)
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                  Aşağıdaki listeden sınıfınızı ve dersinizi seçerek alıştırmalar, sıra sizde ve ölçme değerlendirme sayfalarının adım adım çözümlerine ulaşabilirsiniz.
                </p>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-xs font-bold text-indigo-200 shrink-0 self-start sm:self-center">
                {mebBooks.length} Kitap &bull; 4.000+ Sayfa Çözümü
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[
                { slug: '1-sinif', name: '1. Sınıf', count: '2 Ders' },
                { slug: '2-sinif', name: '2. Sınıf', count: '2 Ders' },
                { slug: '3-sinif', name: '3. Sınıf', count: '2 Ders' },
                { slug: '4-sinif', name: '4. Sınıf', count: '3 Ders' },
                { slug: '5-sinif', name: '5. Sınıf', count: '5 Ders' },
                { slug: '6-sinif', name: '6. Sınıf', count: '5 Kitap' },
                { slug: '7-sinif', name: '7. Sınıf', count: '5 Kitap' },
                { slug: '8-sinif', name: '8. Sınıf', count: 'LGS (5 Ders)' },
                { slug: '9-sinif', name: '9. Sınıf', count: '7 Ders' },
                { slug: '10-sinif', name: '10. Sınıf', count: '6 Ders' },
                { slug: '11-sinif', name: '11. Sınıf', count: '6 Ders' },
                { slug: '12-sinif', name: '12. Sınıf', count: 'YKS (5 Ders)' },
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
        )}

        {/* ALES Özel Showcase Bölümü */}
        {params.slug === 'ales' && (
          <div className="bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-violet-900/50 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-violet-500/30 text-violet-200 border border-violet-400/30">
                    ÖSYM AKADEMİK SINAV
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/30">
                    LİSANSÜSTÜ &amp; DOKTORA
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                  ALES Sınav Formatı ve Hazırlık Rehberi
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                  Yüksek lisans, doktora ve akademik personel kadrolarına başvuracak adaylar için matematik, sayısal mantık ve sözel çıkmış soru analizleri.
                </p>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-xs font-bold text-violet-200 shrink-0 self-start sm:self-center">
                100 Soru &bull; 150 Dakika
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-xs font-bold text-violet-300">Sayısal Bölüm</div>
                <div className="text-lg font-black text-white">50 Soru</div>
                <p className="text-[11px] text-slate-300">Temel matematik, cebir, problemler, geometri ve grafik yorumlama.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-xs font-bold text-violet-300">Sayısal Mantık</div>
                <div className="text-lg font-black text-white">12 - 16 Soru</div>
                <p className="text-[11px] text-slate-300">Akıl yürütme, şifreleme, tablo okuma, dizi ve örüntü soruları.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-xs font-bold text-violet-300">Sözel Bölüm</div>
                <div className="text-lg font-black text-white">50 Soru</div>
                <p className="text-[11px] text-slate-300">Sözcükte/cümlede anlam, paragraf analizi ve sözel mantık.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-xs font-bold text-violet-300">Puan Türleri</div>
                <div className="text-lg font-black text-white">SAY / SÖZ / EA</div>
                <p className="text-[11px] text-slate-300">5 yıl geçerli ÖSYM lisansüstü ve kadro giriş puanları.</p>
              </div>
            </div>
          </div>
        )}

        {/* YDS Özel Showcase Bölümü */}
        {params.slug === 'yds' && (
          <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-teal-900/50 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-teal-500/30 text-teal-200 border border-teal-400/30">
                    ÖSYM YABANCI DİL SINAVI
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    YDS &amp; e-YDS
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                  YDS Çıkmış Sorular, Soru Tipleri ve Taktikler
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                  Akademik kariyer, TUS, DUS ve doçentlik başvuruları için tüm yılların YDS çıkmış soruları, kelime listeleri ve çözüm yöntemleri.
                </p>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-xs font-bold text-teal-200 shrink-0 self-start sm:self-center">
                80 Soru &bull; 180 Dakika
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-xs font-bold text-teal-300">Vocabulary &amp; Grammar</div>
                <div className="text-lg font-black text-white">26 Soru</div>
                <p className="text-[11px] text-slate-300">Kelime bilgisi, edatlar, bağlaçlar ve iki adet Cloze Test metni.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-xs font-bold text-teal-300">Cümle Tamamlama &amp; Çeviri</div>
                <div className="text-lg font-black text-white">16 Soru</div>
                <p className="text-[11px] text-slate-300">Mantıksal tamamlama ve İngilizce-Türkçe karşılıklı çeviriler.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-xs font-bold text-teal-300">Paragraf Okuma-Anlama</div>
                <div className="text-lg font-black text-white">20 Soru</div>
                <p className="text-[11px] text-slate-300">5 farklı akademik metin üzerinden detaylı kavrama soruları.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-xs font-bold text-teal-300">Diyalog, Anlamca Yakın &amp; Akış</div>
                <div className="text-lg font-black text-white">18 Soru</div>
                <p className="text-[11px] text-slate-300">Restatement, durumsal ifade ve anlam bütünlüğünü bozan cümle.</p>
              </div>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        {posts.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">
                  {dersFilter
                    ? `${categoryName} ${dersFilter.toUpperCase()} İçerikleri (${total})`
                    : isMebCategory
                    ? 'Diğer İlgili İçerikler ve Çözümler'
                    : `${categoryName} Konu Anlatımları, Testler ve Yazılar`}
                </h3>
              </div>
              <div className="h-px bg-slate-200 flex-1 hidden sm:block" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {!isMebCategory && posts.length === 0 && (
          <div className="p-12 sm:p-16 bg-white rounded-3xl border border-slate-200 text-center space-y-3">
            <div className="text-4xl">📚</div>
            <h3 className="text-base font-bold text-slate-800">
              {dersFilter ? `"${dersFilter}" dersine ait bağımsız blog yazısı bulunamadı.` : 'Bu kategoride henüz yazı bulunmamaktadır.'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Yukarıdaki ders kartlarında yer alan <strong className="text-indigo-600">"Kitap Çözümlerini Aç"</strong> butonunu kullanarak doğrudan MEB ders kitabı sayfa çözümlerine ulaşabilirsiniz.
            </p>
            {dersFilter && (
              <div className="pt-2">
                <Link
                  href={`/kategori/${params.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors"
                >
                  Tüm {categoryName} İçeriklerini Göster
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-8">
            {currentPage > 1 && (
              <Link
                href={`/kategori/${params.slug}?page=${currentPage - 1}${dersQuery}`}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm"
              >
                &larr; Önceki
              </Link>
            )}

            <span className="px-4 py-2 text-xs font-medium text-slate-500">
              Sayfa <strong className="text-slate-900">{currentPage}</strong> / {totalPages}
            </span>

            {currentPage < totalPages && (
              <Link
                href={`/kategori/${params.slug}?page=${currentPage + 1}${dersQuery}`}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm"
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
