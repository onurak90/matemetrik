'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeftRight, Plus, Trash2, Search, ExternalLink,
  CheckCircle, AlertTriangle, ShieldCheck, Globe,
  Activity, Send, Eye, Smartphone, Monitor, AlertCircle, Edit
} from 'lucide-react';
import { Redirect } from '@/lib/types';

interface SeoIssue {
  postId: number;
  title: string;
  slug: string;
  category: string;
  views: number;
  severity: 'critical' | 'warning' | 'info';
  issue: string;
  recommendation: string;
}

interface SeoAuditReport {
  totalPostsAudited: number;
  overallHealthScore: number;
  criticalCount: number;
  warningCount: number;
  infoCount: number;
  totalIssues: number;
  issues: SeoIssue[];
}

export default function AdminSeoPage() {
  const [activeTab, setActiveTab] = useState<'audit' | 'redirects' | 'ping' | 'serp' | 'verification'>('audit');

  // Redirects state
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [isLoadingRedirects, setIsLoadingRedirects] = useState(true);
  const [search, setSearch] = useState('');
  const [sourcePath, setSourcePath] = useState('');
  const [targetPath, setTargetPath] = useState('');
  const [isSubmittingRedirect, setIsSubmittingRedirect] = useState(false);

  // SEO Audit state
  const [auditReport, setAuditReport] = useState<SeoAuditReport | null>(null);
  const [isLoadingAudit, setIsLoadingAudit] = useState(true);
  const [auditFilter, setAuditFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
  const [issueSearch, setIssueSearch] = useState('');

  // Ping state
  const [isPinging, setIsPinging] = useState(false);
  const [pingResult, setPingResult] = useState<any>(null);

  // SERP simulator state
  const [serpTitle, setSerpTitle] = useState('10. Sınıf Matematik Konu Anlatımı ve MEB Çözümleri');
  const [serpDescription, setSerpDescription] = useState('10. sınıf matematik ders kitabı çözümleri, fonksiyonlar, polinomlar ve sınavlara hazırlık için ücretsiz PDF ders notları.');
  const [serpSlug, setSerpSlug] = useState('10-sinif-matematik-konu-anlatimi-meb-cozumleri');
  const [serpDevice, setSerpDevice] = useState<'desktop' | 'mobile'>('desktop');

  const fetchRedirects = async () => {
    try {
      const res = await fetch('/api/redirects');
      const data = await res.json();
      setRedirects(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingRedirects(false);
    }
  };

  const fetchAudit = async () => {
    setIsLoadingAudit(true);
    try {
      const res = await fetch('/api/seo/audit');
      if (res.ok) {
        const data = await res.json();
        setAuditReport(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingAudit(false);
    }
  };

  useEffect(() => {
    fetchRedirects();
    fetchAudit();
  }, []);

  const handleAddRedirect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourcePath.trim() || !targetPath.trim()) return;

    try {
      setIsSubmittingRedirect(true);
      const res = await fetch('/api/redirects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_path: sourcePath.trim().startsWith('/') ? sourcePath.trim() : `/${sourcePath.trim()}`,
          target_path: targetPath.trim().startsWith('/') ? targetPath.trim() : `/${targetPath.trim()}`,
          status_code: 301,
        }),
      });

      if (res.ok) {
        setSourcePath('');
        setTargetPath('');
        fetchRedirects();
      } else {
        alert('Yönlendirme eklenemedi');
      }
    } catch {
      alert('Hata oluştu');
    } finally {
      setIsSubmittingRedirect(false);
    }
  };

  const handleDeleteRedirect = async (id: number) => {
    if (!confirm('Bu yönlendirmeyi silmek istediğinizden emin misiniz?')) return;
    try {
      const res = await fetch(`/api/redirects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setRedirects((prev) => prev.filter((r) => r.id !== id));
      }
    } catch {
      alert('Hata oluştu');
    }
  };

  const handlePingSearchEngines = async () => {
    setIsPinging(true);
    setPingResult(null);
    try {
      const res = await fetch('/api/seo/ping', { method: 'POST' });
      const data = await res.json();
      setPingResult(data);
    } catch {
      alert('Ping isteği başarısız oldu');
    } finally {
      setIsPinging(false);
    }
  };

  const filteredRedirects = redirects.filter(
    (r) =>
      r.source_path.toLowerCase().includes(search.toLowerCase()) ||
      r.target_path.toLowerCase().includes(search.toLowerCase())
  );

  const filteredIssues = (auditReport?.issues || []).filter((item) => {
    const matchesFilter = auditFilter === 'all' || item.severity === auditFilter;
    const matchesSearch =
      !issueSearch.trim() ||
      item.title.toLowerCase().includes(issueSearch.toLowerCase()) ||
      item.issue.toLowerCase().includes(issueSearch.toLowerCase()) ||
      item.slug.toLowerCase().includes(issueSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          SEO &amp; Arama Motoru Optimizasyon Merkezi
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Google sıralamalarını zirveye taşımak için site çapı SEO denetimi, 301 kalıcı yönlendirmeler ve anlık site haritası bildirimi.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'audit'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Activity className="w-4 h-4" />
          Site Çapı SEO Sağlık Denetimi
          {auditReport && (
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-white/20 text-[10px]">
              %{auditReport.overallHealthScore}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('redirects')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'redirects'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <ArrowLeftRight className="w-4 h-4" />
          301 Kalıcı Yönlendirmeler ({redirects.length})
        </button>

        <button
          onClick={() => setActiveTab('ping')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'ping'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Send className="w-4 h-4" />
          Arama Motorlarına Bildir (Ping)
        </button>

        <button
          onClick={() => setActiveTab('serp')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'serp'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Eye className="w-4 h-4" />
          Google SERP Simülatörü
        </button>

        <button
          onClick={() => setActiveTab('verification')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'verification'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          Arama Motorları ve Doğrulama Rehberi
        </button>
      </div>

      {/* TAB 1: SEO AUDIT */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          {/* Health Score Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 uppercase">Genel SEO Skoru</div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-indigo-600">
                  %{auditReport ? auditReport.overallHealthScore : '...'}
                </span>
                <span className="text-xs text-slate-500">/ 100</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all ${
                    (auditReport?.overallHealthScore || 0) >= 80
                      ? 'bg-emerald-500'
                      : (auditReport?.overallHealthScore || 0) >= 60
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${auditReport?.overallHealthScore || 0}%` }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setAuditFilter('all');
                document.getElementById('seo-issues-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`text-left p-5 rounded-2xl border transition-all shadow-sm group cursor-pointer ${
                auditFilter === 'all'
                  ? 'bg-slate-50 border-slate-400 ring-2 ring-slate-400'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div className="text-xs font-semibold text-slate-500 uppercase flex items-center justify-between">
                <span>Taranan Yazı</span>
                <span className="text-[10px] text-indigo-600 font-bold group-hover:underline">Tümünü Gör &darr;</span>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 mt-1">
                {auditReport ? auditReport.totalPostsAudited : '...'}
              </div>
              <div className="text-xs text-slate-400 mt-2">Tüm veritabanı denetlendi</div>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuditFilter('critical');
                document.getElementById('seo-issues-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`text-left p-5 rounded-2xl border transition-all shadow-sm group cursor-pointer ${
                auditFilter === 'critical'
                  ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-400'
                  : 'bg-white border-slate-200 hover:border-rose-300 hover:shadow-md'
              }`}
            >
              <div className="text-xs font-semibold text-rose-600 uppercase flex items-center justify-between">
                <span>Kritik Eksikler</span>
                <span className="text-[10px] text-rose-600 font-bold group-hover:underline">Sorunlu Yazıları Gör &darr;</span>
              </div>
              <div className="text-3xl font-extrabold text-rose-600 mt-1">
                {auditReport ? auditReport.criticalCount : '...'}
              </div>
              <div className="text-xs text-rose-500 mt-2 font-medium">Tıkla ve sorunlu yazıları listele</div>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuditFilter('warning');
                document.getElementById('seo-issues-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`text-left p-5 rounded-2xl border transition-all shadow-sm group cursor-pointer ${
                auditFilter === 'warning'
                  ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-400'
                  : 'bg-white border-slate-200 hover:border-amber-300 hover:shadow-md'
              }`}
            >
              <div className="text-xs font-semibold text-amber-600 uppercase flex items-center justify-between">
                <span>Geliştirilebilir</span>
                <span className="text-[10px] text-amber-600 font-bold group-hover:underline">İyileştirmeleri Gör &darr;</span>
              </div>
              <div className="text-3xl font-extrabold text-amber-600 mt-1">
                {auditReport ? auditReport.warningCount : '...'}
              </div>
              <div className="text-xs text-amber-600 mt-2 font-medium">Tıkla ve geliştirilecek yazıları listele</div>
            </button>
          </div>

          {/* Audit Issues List */}
          <div id="seo-issues-section" className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col scroll-mt-20">
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-bold text-slate-900 text-base">
                  SEO İyileştirme Önerileri ve Hatalar
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Her yazıyı tek tıkla düzenleyerek Google'da üst sıralara tırmanabilirsiniz.
                </p>
              </div>

              {/* Search & Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <input
                  type="text"
                  placeholder="Yazı ara (başlık veya kusur)..."
                  value={issueSearch}
                  onChange={(e) => setIssueSearch(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48 sm:w-56"
                />
                <button
                  onClick={() => setAuditFilter('all')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    auditFilter === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Tümü ({auditReport?.issues.length || 0})
                </button>
                <button
                  onClick={() => setAuditFilter('critical')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    auditFilter === 'critical'
                      ? 'bg-rose-600 text-white'
                      : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                  }`}
                >
                  Kritik ({auditReport?.criticalCount || 0})
                </button>
                <button
                  onClick={() => setAuditFilter('warning')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    auditFilter === 'warning'
                      ? 'bg-amber-600 text-white'
                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                  }`}
                >
                  Uyarı ({auditReport?.warningCount || 0})
                </button>
              </div>
            </div>

            <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
              {isLoadingAudit ? (
                <div className="p-12 text-center text-slate-400 text-xs">SEO denetimi yapılıyor...</div>
              ) : filteredIssues.length === 0 ? (
                <div className="p-12 text-center text-emerald-600 text-xs font-semibold">
                  🎉 Tebrikler! Seçilen kategoride hiçbir SEO kusuru bulunamadı.
                </div>
              ) : (
                filteredIssues.map((item, idx) => (
                  <div
                    key={`${item.postId}-${idx}`}
                    className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        {item.severity === 'critical' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                            🚨 Kritik Eksik
                          </span>
                        )}
                        {item.severity === 'warning' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            ⚠️ Uyarı
                          </span>
                        )}
                        {item.severity === 'info' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            ℹ️ İpucu
                          </span>
                        )}
                        <span className="text-xs font-bold text-slate-800">
                          {item.issue}
                        </span>
                      </div>

                      <div className="text-xs font-medium text-slate-900 truncate">
                        {item.title}
                      </div>

                      <p className="text-[11px] text-slate-500">
                        {item.recommendation}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/admin/posts/${item.postId}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs rounded-lg transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" /> Düzenle
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REDIRECTS (Existing 301 manager) */}
      {activeTab === 'redirects' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Form */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit space-y-4">
              <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-600" />
                Yeni 301 Yönlendirme Ekle
              </h2>
              <form onSubmit={handleAddRedirect} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Eski / Kaynak Yol (Source)
                  </label>
                  <input
                    type="text"
                    placeholder="/post/eski-baslik-wix"
                    value={sourcePath}
                    onChange={(e) => setSourcePath(e.target.value)}
                    required
                    className="w-full p-2.5 text-xs font-mono border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Yeni Hedef Yol (Target)
                  </label>
                  <input
                    type="text"
                    placeholder="/post/yeni-seo-uyumlu-baslik"
                    value={targetPath}
                    onChange={(e) => setTargetPath(e.target.value)}
                    required
                    className="w-full p-2.5 text-xs font-mono border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmittingRedirect}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-50"
                >
                  {isSubmittingRedirect ? 'Ekleniyor...' : '301 Kuralını Kaydet'}
                </button>
              </form>
            </div>

            {/* List */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Yönlendirme ara..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <span className="text-xs text-slate-400">
                  {filteredRedirects.length} kayıt
                </span>
              </div>

              <div className="max-h-[500px] overflow-y-auto divide-y divide-slate-100">
                {isLoadingRedirects ? (
                  <div className="p-12 text-center text-slate-400">Yükleniyor...</div>
                ) : filteredRedirects.length === 0 ? (
                  <div className="p-12 text-center text-slate-400">Yönlendirme bulunamadı.</div>
                ) : (
                  filteredRedirects.map((r) => (
                    <div
                      key={r.id}
                      className="p-3.5 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4 text-xs font-mono"
                    >
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="text-rose-600 truncate flex items-center gap-1.5">
                          <span className="px-1.5 py-0.5 bg-rose-50 rounded text-[10px] font-bold border border-rose-200">
                            {r.status_code}
                          </span>
                          <span className="truncate">{r.source_path}</span>
                        </div>
                        <div className="text-emerald-700 truncate pl-6">
                          &rarr; {r.target_path}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteRedirect(r.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Kuralı Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PING SEARCH ENGINES */}
      {activeTab === 'ping' && (
        <div className="space-y-6 max-w-3xl">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                <Send className="w-3.5 h-3.5" /> Anlık İndeksleme Sinyali
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Arama Motorlarına Site Haritasını Gönder (Ping)
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Yeni blog yazısı eklediğinizde veya önemli değişiklikler yaptığınızda, Google Bot ve Bing örümceklerine sitenizin güncellendiğini resmi API protokolüyle bildirir.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Bildirilecek Harita:</span>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  className="font-mono text-indigo-600 font-semibold hover:underline flex items-center gap-1"
                >
                  https://www.matemetrik.com/sitemap.xml <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Hedef Arama Motorları:</span>
                <span className="font-medium text-slate-900">Google Bot, Bing &amp; Yahoo</span>
              </div>
            </div>

            {pingResult && (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-2">
                <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" /> Bildirim Tamamlandı ({pingResult.timestamp.slice(11, 19)})
                </div>
                <div className="space-y-1">
                  {pingResult.results?.map((res: any, i: number) => (
                    <div key={i} className="flex items-center justify-between text-[11px] text-emerald-700">
                      <span>{res.name}</span>
                      <span className="font-semibold">{res.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handlePingSearchEngines}
              disabled={isPinging}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className={`w-4 h-4 ${isPinging ? 'animate-spin' : ''}`} />
              {isPinging ? 'Arama Motorları Uyarılıyor...' : 'Site Haritasını Google ve Bing\'e Gönder'}
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: GOOGLE SERP SIMULATOR */}
      {activeTab === 'serp' && (
        <div className="space-y-6 max-w-4xl">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Eye className="w-5 h-5 text-indigo-600" />
                Google Arama Sonuçları Simülatörü (SERP Preview)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Başlık ve meta açıklamanızın Google masaüstü ve mobil sonuçlarında nasıl görüneceğini canlı test edin.
              </p>
            </div>

            {/* Form Inputs */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>SEO Başlığı ({serpTitle.length} karakter - İdeal: 45-60)</span>
                  <span className={serpTitle.length > 60 ? 'text-rose-600 font-bold' : 'text-emerald-600'}>
                    {serpTitle.length > 60 ? '⚠️ Uzun (Kırpılabilir)' : '✓ İdeal'}
                  </span>
                </div>
                <input
                  type="text"
                  value={serpTitle}
                  onChange={(e) => setSerpTitle(e.target.value)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Meta Açıklama ({serpDescription.length} karakter - İdeal: 120-155)</span>
                  <span className={serpDescription.length > 155 ? 'text-rose-600 font-bold' : 'text-emerald-600'}>
                    {serpDescription.length > 155 ? '⚠️ Uzun' : serpDescription.length < 100 ? '⚠️ Kısa' : '✓ İdeal'}
                  </span>
                </div>
                <textarea
                  rows={2}
                  value={serpDescription}
                  onChange={(e) => setSerpDescription(e.target.value)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  URL Slug
                </label>
                <div className="flex items-center text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                  <span>https://www.matemetrik.com/post/</span>
                  <input
                    type="text"
                    value={serpSlug}
                    onChange={(e) => setSerpSlug(e.target.value)}
                    className="flex-1 bg-transparent font-mono outline-none text-slate-800 ml-1"
                  />
                </div>
              </div>
            </div>

            {/* Device Switcher */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-semibold text-slate-500">Görünüm Modu:</span>
              <button
                onClick={() => setSerpDevice('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  serpDevice === 'desktop'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" /> Masaüstü
              </button>
              <button
                onClick={() => setSerpDevice('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  serpDevice === 'mobile'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" /> Mobil
              </button>
            </div>

            {/* Google Result Preview Box */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                Canlı Google Arama Önizlemesi ({serpDevice === 'desktop' ? 'Masaüstü' : 'Mobil'})
              </div>

              <div
                className={`bg-white p-5 rounded-xl border border-slate-200 shadow-sm font-sans space-y-1 ${
                  serpDevice === 'mobile' ? 'max-w-sm rounded-2xl border-2 border-slate-300' : 'max-w-xl'
                }`}
              >
                {/* Google URL Line */}
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[9px] font-bold">
                    π
                  </div>
                  <div className="truncate">
                    <span className="text-slate-900 font-medium">matemetrik.com</span>
                    <span className="text-slate-500 font-normal"> › post › {serpSlug}</span>
                  </div>
                </div>

                {/* Google Title */}
                <div className="text-[#1a0dab] hover:underline cursor-pointer font-medium text-lg leading-snug truncate pt-0.5">
                  {serpTitle || 'Başlık Yazınız...'}
                </div>

                {/* Google Description */}
                <p className="text-[#4d5156] text-xs leading-relaxed line-clamp-2">
                  {serpDescription || 'Meta açıklama giriniz...'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SEARCH ENGINE VERIFICATION & INTEGRATION GUIDE */}
      {activeTab === 'verification' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                Arama Motorları ve Doğrulama Adımları
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Google, Bing, Yandex ve Google Analytics entegrasyonlarınızı tamamlayarak sitenizi arama motorlarında zirveye taşıyın.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Google Search Console */}
              <div className="p-5 rounded-2xl border border-blue-100 bg-blue-50/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-blue-900 text-sm">
                    <Globe className="w-4 h-4 text-blue-600" />
                    Google Search Console
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-200/60 text-blue-800">
                    Öncelik: Kritik
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Google'da organik sıralama almak ve içeriklerin hızlıca dizine eklenmesi için birincil araçtır.
                </p>
                <div className="text-[11px] text-slate-700 space-y-1.5 pt-1">
                  <div>1. <strong>search.google.com/search-console</strong> adresine gidin.</div>
                  <div>2. "URL ön eki" seçeneğine <code>https://www.matemetrik.com</code> yazın.</div>
                  <div>3. "HTML Etiketi" yöntemini seçip kodu kopyalayın.</div>
                  <div>4. <Link href="/admin/settings" className="text-indigo-600 font-bold underline">Site Ayarları</Link> sayfasındaki Google Search Console alanına yapıştırın.</div>
                  <div>5. "Site Haritaları" sekmesinden <code>sitemap.xml</code> adresini gönderin.</div>
                </div>
              </div>

              {/* Google Analytics 4 */}
              <div className="p-5 rounded-2xl border border-amber-100 bg-amber-50/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
                    <Activity className="w-4 h-4 text-amber-600" />
                    Google Analytics 4 (GA4)
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200/60 text-amber-800">
                    Ziyaretçi Takibi
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Sitenizi ziyaret eden kullanıcıların hangi şehirlerden, hangi cihazlarla ve hangi sayfalara geldiğini anlık izleyin.
                </p>
                <div className="text-[11px] text-slate-700 space-y-1.5 pt-1">
                  <div>1. <strong>analytics.google.com</strong> adresine gidin.</div>
                  <div>2. Yönetici &gt; Veri Akışları &gt; Web Akışınızı seçin.</div>
                  <div>3. <strong>G-XXXXXXXXXX</strong> formatındaki Ölçüm Kimliğini kopyalayın.</div>
                  <div>4. <Link href="/admin/settings" className="text-indigo-600 font-bold underline">Site Ayarları</Link> sayfasındaki Google Analytics alanına kaydedin.</div>
                </div>
              </div>

              {/* Bing Webmaster Tools */}
              <div className="p-5 rounded-2xl border border-teal-100 bg-teal-50/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-teal-900 text-sm">
                    <Globe className="w-4 h-4 text-teal-600" />
                    Bing Webmaster &amp; IndexNow
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-200/60 text-teal-800">
                    Bing &amp; Yahoo
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bing, Yahoo ve DuckDuckGo gibi arama motorlarında indekslenmeyi ve IndexNow anlık bildirimlerini sağlar.
                </p>
                <div className="text-[11px] text-slate-700 space-y-1.5 pt-1">
                  <div>1. <strong>bing.com/webmasters</strong> adresine giriş yapın.</div>
                  <div>2. İster Google Search Console'dan tek tıkla içe aktarın, isterseniz HTML Meta etiketini alın.</div>
                  <div>3. Doğrulama kodunu Site Ayarları &gt; Bing alanına ekleyin.</div>
                </div>
              </div>

              {/* Yandex Webmaster */}
              <div className="p-5 rounded-2xl border border-rose-100 bg-rose-50/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-rose-900 text-sm">
                    <Globe className="w-4 h-4 text-rose-600" />
                    Yandex Webmaster
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-200/60 text-rose-800">
                    Yandex Arama
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Yandex arama motoru üzerinden gelen eğitim ve matematik aramalarını yakalamanızı sağlar.
                </p>
                <div className="text-[11px] text-slate-700 space-y-1.5 pt-1">
                  <div>1. <strong>webmaster.yandex.com</strong> adresine siteyi ekleyin.</div>
                  <div>2. Meta tag doğrulama kodunu kopyalayın.</div>
                  <div>3. Site Ayarları &gt; Yandex alanına yapıştırıp kaydedin.</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Doğrulama kodlarını hemen girmek için Site Ayarları sayfasına geçebilirsiniz:
              </span>
              <Link
                href="/admin/settings"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
              >
                Site Ayarlarına Git &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
