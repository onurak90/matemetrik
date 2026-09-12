'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BarChart3, Eye, TrendingUp, AlertCircle,
  Download, ExternalLink, Edit, CheckCircle,
  FileText, FolderTree, Award
} from 'lucide-react';
import { Post } from '@/lib/types';

interface ReportData {
  totalPosts: number;
  totalViews: number;
  avgViews: number;
  topPosts: Post[];
  categoriesStats: { name: string; slug: string; post_count: number; total_views: number }[];
  missingImages: Post[];
  shortExcerpts: Post[];
}

export default function AdminReportsPage() {
  const [data, setData] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reports')
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const downloadCsv = () => {
    if (!data) return;
    const headers = ['ID', 'Baslik', 'Kategori', 'Goruntulenme', 'Slug'];
    const rows = data.topPosts.map((p) => [
      p.id,
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.category}"`,
      p.views,
      p.slug,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF'
      + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `matemetrik_rapor_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading || !data) {
    return (
      <div className="p-16 text-center text-slate-400">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent mb-3" />
        <div className="text-sm font-medium">Raporlar hazırlanıyor...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Performans &amp; İçerik Raporları
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Sayfa okunma sayıları, popüler içerikler ve SEO sağlık kontrolleri
          </p>
        </div>

        <button
          type="button"
          onClick={downloadCsv}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          <Download className="w-4 h-4 text-indigo-600" />
          Raporu CSV İndir
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase">Toplam Okunma</div>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {data.totalViews.toLocaleString('tr-TR')}
            </div>
            <div className="text-xs text-emerald-600 mt-1 flex items-center gap-1 font-medium">
              <TrendingUp className="w-3.5 h-3.5" /> Tüm Zamanlar
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase">Yazı Başına Ortalama</div>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {data.avgViews.toLocaleString('tr-TR')}
            </div>
            <div className="text-xs text-indigo-600 mt-1 font-medium">
              Ortalama Görüntülenme
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <BarChart3 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase">İçerik Havuzu</div>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {data.totalPosts}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Yayındaki Blog Yazısı
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase">Kategori Sayısı</div>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {data.categoriesStats.length}
            </div>
            <div className="text-xs text-amber-600 mt-1 font-medium">
              Aktif Zümre &amp; Sınıf
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <FolderTree className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Top Viewed Posts Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
        <div className="p-6 pb-2 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              En Çok Okunan Blog Yazıları (Top 15)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              En yüksek organik trafik ve ziyaretçi çeken içerikleriniz
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-y border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-5 text-center w-12">Sıra</th>
                <th className="py-3.5 px-4">Yazı Başlığı &amp; Kategori</th>
                <th className="py-3.5 px-4 text-center">Okunma Sayısı</th>
                <th className="py-3.5 px-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.topPosts.map((post, idx) => (
                <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-5 text-center font-black text-xs">
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                        idx === 0
                          ? 'bg-amber-100 text-amber-800'
                          : idx === 1
                          ? 'bg-slate-200 text-slate-800'
                          : idx === 2
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      #{idx + 1}
                    </span>
                  </td>
                  <td className="py-4 px-4 max-w-lg">
                    <div className="font-bold text-slate-900 line-clamp-1 text-sm">
                      <Link href={`/admin/posts/${post.id}`} className="hover:text-indigo-600">
                        {post.title}
                      </Link>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {post.category}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono truncate">
                        /post/{post.slug}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-center font-black text-slate-900 text-sm">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-bold text-xs">
                      <Eye className="w-3.5 h-3.5" />
                      {post.views.toLocaleString('tr-TR')}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <Link
                        href={`/post/${post.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                        title="Sitede Gör"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                        title="Düzenle"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category Distribution Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h2 className="font-bold text-slate-900 text-base">
          Kategori Bazlı Toplam Okunma ve Dağılım
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.categoriesStats.map((c) => (
            <div
              key={c.slug}
              className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-slate-900 text-sm">{c.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{c.post_count} yazı</div>
              </div>
              <div className="text-right">
                <div className="font-black text-indigo-600 text-sm">
                  {c.total_views.toLocaleString('tr-TR')}
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">
                  okunma
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
