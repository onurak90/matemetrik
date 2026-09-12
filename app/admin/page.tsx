import React from 'react';
import Link from 'next/link';
import {
  FileText, Eye, FolderTree, ArrowLeftRight,
  Plus, Edit, ExternalLink, TrendingUp, CheckCircle, Clock,
  Sparkles, Share2, HardDrive, Download, Send, Activity
} from 'lucide-react';
import { getStats } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import AdminNotesWidget from '@/components/admin/AdminNotesWidget';

export const revalidate = 0; // always dynamic for admin

export default function AdminDashboardPage() {
  const stats = getStats();

  return (
    <div className="space-y-8">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl shadow-indigo-950/20">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Hoş Geldiniz 👋
          </h1>
          <p className="text-indigo-200 text-sm mt-1 max-w-xl">
            Matemetrik yönetim merkezi. SEO analizi, sosyal medya üreticisi, yapay zeka blog motoru ve sistem bakımı hazır.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-indigo-900 hover:bg-indigo-50 font-semibold text-sm rounded-xl transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            Yeni Yazı Yaz
          </Link>
          <a
            href="/api/system/backup"
            download
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-700/60 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition-all border border-indigo-500/40"
            title="1-Tıkla Veritabanı Yedeğini İndir"
          >
            <Download className="w-4 h-4" />
            Yedek İndir
          </a>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          href="/admin/ai-writer"
          className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-800 truncate">AI Makale Motoru</div>
            <div className="text-[10px] text-slate-400">Trendlerden Yazı Üret</div>
          </div>
        </Link>

        <Link
          href="/admin/social"
          className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center group-hover:bg-pink-600 group-hover:text-white transition-colors shrink-0">
            <Share2 className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-800 truncate">Sosyal Medya</div>
            <div className="text-[10px] text-slate-400">Instagram &amp; Twitter</div>
          </div>
        </Link>

        <Link
          href="/admin/seo"
          className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-800 truncate">SEO Denetimi</div>
            <div className="text-[10px] text-slate-400">Sağlık Skoru &amp; Ping</div>
          </div>
        </Link>

        <Link
          href="/admin/system"
          className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
            <HardDrive className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-800 truncate">Sistem &amp; Yedek</div>
            <div className="text-[10px] text-slate-400">SQLite &amp; Disk Bakımı</div>
          </div>
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Toplam Yazı
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-1">
              {stats.totalPosts}
            </div>
            <div className="text-xs text-emerald-600 mt-1 flex items-center gap-1 font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              {stats.publishedPosts} Yayında
              {stats.draftPosts > 0 && ` (${stats.draftPosts} Taslak)`}
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Toplam Okunma
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-1">
              {stats.totalViews.toLocaleString('tr-TR')}
            </div>
            <div className="text-xs text-indigo-600 mt-1 flex items-center gap-1 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              Tüm Zamanlar
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <Eye className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Kategoriler
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-1">
              {stats.totalCategories}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              1. Sınıf - 12. Sınıf & Araçlar
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
            <FolderTree className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              301 Yönlendirme
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-1">
              {stats.totalRedirects}
            </div>
            <div className="text-xs text-emerald-600 mt-1 flex items-center gap-1 font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              SEO Kaybı Yok
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
            <ArrowLeftRight className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Posts & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Posts Table (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900 text-base">Son Eklenen / Güncellenen Yazılar</h2>
              <p className="text-xs text-slate-500 mt-0.5">En son üzerinde çalışılan içerikler</p>
            </div>
            <Link
              href="/admin/posts"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              Tümünü Gör ({stats.totalPosts}) &rarr;
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {stats.recentPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {formatDate(post.created_at)}
                    </span>
                  </div>
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="font-medium text-sm text-slate-900 hover:text-indigo-600 line-clamp-1"
                  >
                    {post.title}
                  </Link>
                  <div className="text-xs text-slate-400 mt-0.5 font-mono truncate">
                    /post/{post.slug}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                    title="Yazıyı Düzenle"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/post/${post.slug}`}
                    target="_blank"
                    className="p-2 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                    title="Sitede Görüntüle"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Admin Notes & Categories */}
        <div className="space-y-6">
          {/* Admin Notes & Tasks */}
          <AdminNotesWidget />

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-900 text-base">Kategori Dağılımı</h2>
              <Link href="/admin/categories" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                Yönet &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              {stats.categoryBreakdown.map((cat) => {
                const percentage = stats.totalPosts > 0 ? Math.round((cat.count / stats.totalPosts) * 100) : 0;
                return (
                  <div key={cat.slug} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-700">{cat.name}</span>
                      <span className="text-slate-400 font-medium">
                        {cat.count} yazı ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${Math.max(4, percentage)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SEO Health Card */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              <CheckCircle className="w-4 h-4" /> SEO Durumu Aktif
            </div>
            <h3 className="font-bold text-sm text-white">
              Google Sıralama Koruması
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Wix sitenizdeki tüm eski Türkçe karakterli ve bozuk url_slug yapıları, hem doğrudan yönlendirme hem de dinamik sitemap ile 301 standartlarına bağlandı.
            </p>
            <Link
              href="/admin/seo"
              className="inline-block text-xs font-semibold text-indigo-300 hover:text-white underline pt-1"
            >
              Yönlendirmeleri İncele &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
