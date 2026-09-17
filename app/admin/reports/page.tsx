'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BarChart3, Eye, TrendingUp, Download, ExternalLink,
  Users, Smartphone, Monitor, Tablet, Globe, Search,
  RefreshCw, Clock, Sparkles, FileText, Wrench, ShieldCheck,
  Compass, ArrowUpRight
} from 'lucide-react';

interface AnalyticsData {
  timeRange: string;
  totalHits: number;
  uniqueVisitors: number;
  blogHits: number;
  toolHits: number;
  pageHits: number;
  totalPostsCount: number;
  sources: Array<{ source: string; label: string; count: number; percentage: number }>;
  devices: Array<{ device: string; label: string; count: number; percentage: number }>;
  topBlogPosts: Array<{
    id: number;
    title: string;
    slug: string;
    category: string;
    views: number;
    topSource: string;
  }>;
  topPagesAndTools: Array<{
    path: string;
    title: string;
    entity_type: string;
    views: number;
    topSource: string;
  }>;
  timeline: Array<{ date: string; hits: number }>;
  recentHits: Array<{
    id: number;
    path: string;
    title: string;
    source: string;
    device: string;
    created_at: string;
  }>;
}

const RANGES = [
  { key: 'today', label: 'Bugün (24 Saat)' },
  { key: '7days', label: 'Son 7 Gün (Haftalık)' },
  { key: '30days', label: 'Son 30 Gün (Aylık)' },
  { key: '180days', label: 'Son 6 Ay' },
  { key: '365days', label: 'Son 1 Yıl' },
  { key: 'all', label: 'Tüm Zamanlar' },
];

const SOURCE_COLORS: Record<string, { bg: string; text: string; bar: string }> = {
  google: { bg: 'bg-blue-50 text-blue-700', text: 'text-blue-600', bar: 'bg-blue-600' },
  bing: { bg: 'bg-teal-50 text-teal-700', text: 'text-teal-600', bar: 'bg-teal-600' },
  yandex: { bg: 'bg-amber-50 text-amber-700', text: 'text-amber-600', bar: 'bg-amber-600' },
  yahoo: { bg: 'bg-purple-50 text-purple-700', text: 'text-purple-600', bar: 'bg-purple-600' },
  direct: { bg: 'bg-slate-100 text-slate-800', text: 'text-slate-600', bar: 'bg-slate-700' },
  instagram: { bg: 'bg-pink-50 text-pink-700', text: 'text-pink-600', bar: 'bg-gradient-to-r from-purple-500 to-pink-500' },
  twitter: { bg: 'bg-sky-50 text-sky-700', text: 'text-sky-600', bar: 'bg-sky-500' },
  facebook: { bg: 'bg-indigo-50 text-indigo-700', text: 'text-indigo-600', bar: 'bg-indigo-600' },
  tiktok: { bg: 'bg-stone-100 text-stone-900', text: 'text-stone-700', bar: 'bg-black' },
  youtube: { bg: 'bg-red-50 text-red-700', text: 'text-red-600', bar: 'bg-red-600' },
  linkedin: { bg: 'bg-cyan-50 text-cyan-700', text: 'text-cyan-600', bar: 'bg-cyan-600' },
  pinterest: { bg: 'bg-rose-50 text-rose-700', text: 'text-rose-600', bar: 'bg-rose-600' },
  referral: { bg: 'bg-emerald-50 text-emerald-700', text: 'text-emerald-600', bar: 'bg-emerald-600' },
};

export default function AdminReportsPage() {
  const [selectedRange, setSelectedRange] = useState('30days');
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'posts' | 'tools' | 'live'>('posts');
  const [searchFilter, setSearchFilter] = useState('');

  const fetchReports = (range: string) => {
    setIsLoading(true);
    fetch(`/api/reports?range=${range}`)
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchReports(selectedRange);
  }, [selectedRange]);

  const downloadCsv = () => {
    if (!data) return;
    const headers = ['Tür', 'Başlık / Yol', 'Görüntülenme / Hit', 'En Çok Gelen Kaynak', 'Bağlantı'];
    
    const postRows = (data.topBlogPosts || []).map((p) => [
      'Blog Yazısı',
      `"${(p.title || '').replace(/"/g, '""')}"`,
      p.views,
      p.topSource || 'Doğrudan',
      `https://www.matemetrik.com/blog/${p.slug}`,
    ]);

    const pageRows = (data.topPagesAndTools || []).map((t) => [
      'Sayfa / Araç',
      `"${(t.title || t.path).replace(/"/g, '""')}"`,
      t.views,
      t.topSource || 'Doğrudan',
      `https://www.matemetrik.com${t.path}`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...postRows.map((r) => r.join(',')), ...pageRows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `matemetrik_analiz_${selectedRange}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredPosts = (data?.topBlogPosts || []).filter((p) =>
    (p.title || '').toLowerCase().includes(searchFilter.toLowerCase()) ||
    (p.category || '').toLowerCase().includes(searchFilter.toLowerCase())
  );

  const filteredPages = (data?.topPagesAndTools || []).filter((t) =>
    (t.title || '').toLowerCase().includes(searchFilter.toLowerCase()) ||
    (t.path || '').toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Top Header & Range Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-600" />
            Trafik Analizi &amp; Hit Raporları
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Sayfa ve blog okunmaları, trafik kaynakları (Google, Doğrudan, Sosyal Medya vb.) ve cihaz dağılımı
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => fetchReports(selectedRange)}
            className="p-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors shadow-sm"
            title="Verileri Yenile"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-indigo-600' : ''}`} />
          </button>

          <button
            type="button"
            onClick={downloadCsv}
            disabled={!data}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-indigo-600" />
            CSV Olarak İndir
          </button>
        </div>
      </div>

      {/* Time Range Selector Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200 scrollbar-none">
        {RANGES.map((r) => (
          <button
            key={r.key}
            type="button"
            onClick={() => setSelectedRange(r.key)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              selectedRange === r.key
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {isLoading && !data ? (
        <div className="p-20 text-center text-slate-400 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent mb-3" />
          <div className="text-sm font-medium">Analiz verileri yükleniyor...</div>
        </div>
      ) : data ? (
        <>
          {/* Main KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Total Hits */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Toplam Hit / Okunma
                </div>
                <div className="text-3xl font-black text-slate-900 mt-1">
                  {data.totalHits.toLocaleString('tr-TR')}
                </div>
                <div className="text-xs text-indigo-600 mt-1 flex items-center gap-1 font-medium">
                  <TrendingUp className="w-3.5 h-3.5" /> Seçili Dönem Trafiği
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
            </div>

            {/* Unique Visitors */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Tekil Ziyaretçi
                </div>
                <div className="text-3xl font-black text-slate-900 mt-1">
                  {data.uniqueVisitors.toLocaleString('tr-TR')}
                </div>
                <div className="text-xs text-emerald-600 mt-1 flex items-center gap-1 font-medium">
                  <Users className="w-3.5 h-3.5" /> Gerçek Kullanıcı
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>

            {/* Blog Hits */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Blog Okunmaları
                </div>
                <div className="text-3xl font-black text-slate-900 mt-1">
                  {data.blogHits.toLocaleString('tr-TR')}
                </div>
                <div className="text-xs text-purple-600 mt-1 flex items-center gap-1 font-medium">
                  <FileText className="w-3.5 h-3.5" />
                  {data.totalHits > 0 ? `%${Math.round((data.blogHits / data.totalHits) * 100)} Pay` : 'Blog Yazıları'}
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
            </div>

            {/* Tool Hits */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Öğretmen Araçları
                </div>
                <div className="text-3xl font-black text-slate-900 mt-1">
                  {data.toolHits.toLocaleString('tr-TR')}
                </div>
                <div className="text-xs text-amber-600 mt-1 flex items-center gap-1 font-medium">
                  <Wrench className="w-3.5 h-3.5" /> Sınav &amp; Yıllık Plan &amp; Kulüp
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Wrench className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Traffic Sources & Device Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Traffic Sources */}
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-indigo-600" />
                    Trafik Kaynakları Dağılımı
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Kullanıcıların sitenize hangi kanaldan geldiği (Arama motorları, doğrudan, sosyal ağlar)
                  </p>
                </div>
              </div>

              {data.sources.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  Bu dönem için henüz trafik kaynağı kaydı bulunmuyor. Ziyaretler başladıkça burada otomatik görünecektir.
                </div>
              ) : (
                <div className="space-y-3.5 pt-2">
                  {data.sources.map((src) => {
                    const color = SOURCE_COLORS[src.source] || SOURCE_COLORS.referral;
                    return (
                      <div key={src.source} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-medium">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${color.bg}`}>
                              {src.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{src.count.toLocaleString('tr-TR')} hit</span>
                            <span className="text-slate-400 font-mono text-[11px]">({src.percentage}%)</span>
                          </div>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${color.bar}`}
                            style={{ width: `${Math.max(src.percentage, 2)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Device Breakdown */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  Cihaz Dağılımı
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Mobil ve masaüstü kullanıcı oranları
                </p>

                {data.devices.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">
                    Henüz cihaz verisi toplanmadı.
                  </div>
                ) : (
                  <div className="space-y-4 pt-4">
                    {data.devices.map((dev) => {
                      const Icon = dev.device === 'mobile' ? Smartphone : dev.device === 'tablet' ? Tablet : Monitor;
                      return (
                        <div key={dev.device} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900">{dev.label}</div>
                              <div className="text-[11px] text-slate-500">{dev.count.toLocaleString('tr-TR')} Ziyaret</div>
                            </div>
                          </div>
                          <div className="text-base font-black text-indigo-600">
                            %{dev.percentage}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Google Analytics Status Note */}
              <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-2xl text-[11px] text-indigo-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Google Analytics Entegrasyonu:</span> Sitenizde GA4 ve Matemetrik yerel hit takip motoru birlikte çalışarak sıfır veri kaybı sağlar.
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Chart (If Available) */}
          {data.timeline && data.timeline.length > 0 && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                Günlük Hit Eğilimi ({selectedRange === 'today' ? 'Saatlik / Günlük' : 'Günlük Grafiği'})
              </h2>

              <div className="flex items-end gap-2 h-40 pt-4 overflow-x-auto">
                {data.timeline.map((item) => {
                  const maxHit = Math.max(...data.timeline.map((t) => t.hits), 1);
                  const barHeight = Math.max(12, Math.round((item.hits / maxHit) * 100));
                  return (
                    <div key={item.date} className="flex-1 min-w-[28px] flex flex-col items-center gap-1 group">
                      <div className="text-[10px] font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {item.hits}
                      </div>
                      <div
                        className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg transition-all group-hover:from-indigo-700 group-hover:to-indigo-500"
                        style={{ height: `${barHeight}%` }}
                      />
                      <div className="text-[9px] text-slate-400 truncate w-full text-center">
                        {item.date.slice(5)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Detailed Content Tables */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-0">
            {/* Table Header & Tabs */}
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('posts')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === 'posts'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  📝 En Çok Okunan Blog Yazıları
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('tools')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === 'tools'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  🛠️ Sayfalar &amp; Öğretmen Araçları
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('live')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'live'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Canlı Ziyaretler
                </button>
              </div>

              {/* Search filter */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Başlık veya yolda ara..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Tab 1: Blog Posts */}
            {activeTab === 'posts' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/80 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="py-3 px-5">Blog Başlığı</th>
                      <th className="py-3 px-4">Kategori</th>
                      <th className="py-3 px-4 text-right">Okunma / Hit</th>
                      <th className="py-3 px-4">En Çok Gelen Kaynak</th>
                      <th className="py-3 px-4 text-right">İşlem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPosts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                          Eşleşen blog yazısı bulunamadı.
                        </td>
                      </tr>
                    ) : (
                      filteredPosts.map((p) => {
                        const sourceColor = SOURCE_COLORS[p.topSource?.toLowerCase()] || SOURCE_COLORS.direct;
                        return (
                          <tr key={p.id} className="hover:bg-indigo-50/30 transition-colors">
                            <td className="py-3.5 px-5 font-semibold text-slate-900 max-w-md truncate">
                              <span title={p.title}>{p.title}</span>
                            </td>
                            <td className="py-3.5 px-4 text-slate-600">
                              <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px] font-medium">
                                {p.category || 'Genel'}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right font-bold text-slate-900 font-mono">
                              {p.views.toLocaleString('tr-TR')}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${sourceColor.bg}`}>
                                {p.topSource || 'Doğrudan'}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <Link
                                href={`/blog/${p.slug}`}
                                target="_blank"
                                className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold"
                              >
                                Görüntüle <ExternalLink className="w-3 h-3" />
                              </Link>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tab 2: Pages and Tools */}
            {activeTab === 'tools' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/80 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="py-3 px-5">Sayfa / Araç Adı</th>
                      <th className="py-3 px-4">Yol (URL Path)</th>
                      <th className="py-3 px-4">Tür</th>
                      <th className="py-3 px-4 text-right">Ziyaret Sayısı</th>
                      <th className="py-3 px-4 text-right">İşlem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPages.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                          Eşleşen sayfa bulunamadı.
                        </td>
                      </tr>
                    ) : (
                      filteredPages.map((item, idx) => (
                        <tr key={idx} className="hover:bg-indigo-50/30 transition-colors">
                          <td className="py-3.5 px-5 font-bold text-slate-900">
                            {item.title || item.path}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                            {item.path}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.entity_type === 'tool'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}>
                              {item.entity_type === 'tool' ? 'Öğretmen Aracı' : 'Sabit Sayfa'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right font-bold text-slate-900 font-mono">
                            {item.views.toLocaleString('tr-TR')}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <Link
                              href={item.path}
                              target="_blank"
                              className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold"
                            >
                              Aç <ArrowUpRight className="w-3 h-3" />
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tab 3: Live Hits Stream */}
            {activeTab === 'live' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/80 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="py-3 px-5">Zaman</th>
                      <th className="py-3 px-4">Ziyaret Edilen Sayfa</th>
                      <th className="py-3 px-4">Trafik Kaynağı</th>
                      <th className="py-3 px-4">Cihaz</th>
                      <th className="py-3 px-4 text-right">Bağlantı</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(data.recentHits || []).length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                          Henüz canlı hit kaydedilmedi. Sitede sayfalar açıldıkça burada anlık görünecektir.
                        </td>
                      </tr>
                    ) : (
                      data.recentHits.map((hit) => {
                        const sourceColor = SOURCE_COLORS[hit.source?.toLowerCase()] || SOURCE_COLORS.direct;
                        const dateFormatted = new Date(hit.created_at).toLocaleString('tr-TR', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        });
                        return (
                          <tr key={hit.id} className="hover:bg-indigo-50/30 transition-colors">
                            <td className="py-3.5 px-5 font-mono text-[11px] text-slate-500 flex items-center gap-1.5">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {dateFormatted}
                            </td>
                            <td className="py-3.5 px-4 font-semibold text-slate-900 max-w-sm truncate">
                              <span title={hit.title || hit.path}>{hit.title || hit.path}</span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${sourceColor.bg}`}>
                                {hit.source}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 capitalize text-slate-600">
                              {hit.device === 'mobile' ? '📱 Mobil' : hit.device === 'tablet' ? '📟 Tablet' : '💻 Masaüstü'}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <Link
                                href={hit.path}
                                target="_blank"
                                className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold"
                              >
                                Git <ExternalLink className="w-3 h-3" />
                              </Link>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
