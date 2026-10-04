'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Newspaper, Play, CheckCircle2, AlertCircle, Clock,
  ExternalLink, Trash2, RefreshCw, Sparkles, Shield,
  ArrowUpRight, Eye, Radio, Settings, Filter
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface CrawledNewsItem {
  id: number;
  source_url: string;
  source_title: string;
  source_site: string;
  source_image: string;
  post_id: number | null;
  post_slug: string | null;
  status: string;
  created_at: string;
  current_title?: string;
  post_published?: number;
  post_views?: number;
}

export default function AdminNewsBotPage() {
  const [history, setHistory] = useState<CrawledNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCrawling, setIsCrawling] = useState(false);
  const [crawlProgress, setCrawlProgress] = useState<string[]>([]);
  const [publishMode, setPublishMode] = useState<'published' | 'draft'>('published');
  const [countToGenerate, setCountToGenerate] = useState<number>(1);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [histRes, setRes] = await Promise.all([
        fetch('/api/news-bot/history?limit=100'),
        fetch('/api/news-bot/settings'),
      ]);

      const histData = await histRes.json();
      const setData = await setRes.json();

      if (histData.history) setHistory(histData.history);
      if (setData.settings) {
        setPublishMode(setData.settings.news_bot_publish_mode || 'published');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateSettings = async (mode: 'published' | 'draft') => {
    setPublishMode(mode);
    try {
      await fetch('/api/news-bot/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ news_bot_publish_mode: mode }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleRunCrawler = async () => {
    setIsCrawling(true);
    setCrawlProgress([
      '🔍 Güvenilir eğitim portallarının (MEB Personel, Kamudan Haber, Kamu Personeli, Ajans Kamu, Google News) RSS akışları taranıyor...',
    ]);

    try {
      const stepTimer1 = setTimeout(() => {
        setCrawlProgress((prev) => [
          ...prev,
          '🎯 "Öğretmen", "Okul", "MEB", "Atama", "Müfredat" anahtar kelimeleriyle haberler filtreleniyor...',
        ]);
      }, 1500);

      const stepTimer2 = setTimeout(() => {
        setCrawlProgress((prev) => [
          ...prev,
          '🛡️ Kopya kontrolü: Sitemizde daha önce yayınlanmış benzer haberler eleniyor...',
        ]);
      }, 3500);

      const stepTimer3 = setTimeout(() => {
        setCrawlProgress((prev) => [
          ...prev,
          '✍️ Gemini AI ile haber 800+ kelimelik, mevzuat ve pedagojik analizli derin bir SEO makalesine dönüştürülüyor...',
        ]);
      }, 6000);

      const res = await fetch('/api/news-bot/crawl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          count: countToGenerate,
          forcePublish: publishMode === 'published',
        }),
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Tarama sırasında hata oluştu');
      }

      const results = data.data;
      if (results.created > 0) {
        setCrawlProgress((prev) => [
          ...prev,
          `✓ Başarılı! ${results.created} adet yeni öğretmen/okul haberi yazıldı, kapak görseli eklendi ve ${publishMode === 'published' ? 'CANLIYA YAYINLANDI' : 'TASLAK OLARAK KAYDEDİLDİ'}!`,
        ]);
      } else {
        setCrawlProgress((prev) => [
          ...prev,
          'ℹ️ Taranan tüm son dakika haberleri sitemizde zaten mevcut olduğu için yeni kopya üretilmedi (Deduplication koruması devrede).',
        ]);
      }

      await loadData();
    } catch (err: any) {
      setCrawlProgress((prev) => [
        ...prev,
        `❌ Hata oluştu: ${err.message || 'Bilinmeyen hata'}`,
      ]);
    } finally {
      setIsCrawling(false);
    }
  };

  const handleDeleteItem = async (id: number, postTitle?: string) => {
    if (!confirm(`"${postTitle || 'Bu haberi'}" sitemizden tamamen kaldırmak ve silmek istediğinizden emin misiniz?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/news-bot/history?id=${id}&deletePost=true`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setHistory((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert('Silinirken hata oluştu');
      }
    } catch {
      alert('Silinirken hata oluştu');
    } finally {
      setDeletingId(null);
    }
  };

  const handleTogglePublish = async (item: CrawledNewsItem) => {
    if (!item.post_id) return;
    const currentPub = item.post_published !== undefined ? item.post_published : (item.status === 'published' ? 1 : 0);
    const nextPub = currentPub === 1 ? 0 : 1;

    setTogglingId(item.id);
    try {
      const res = await fetch(`/api/posts/${item.post_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: nextPub }),
      });
      if (res.ok) {
        setHistory((prev) =>
          prev.map((h) =>
            h.id === item.id
              ? { ...h, post_published: nextPub, status: nextPub === 1 ? 'published' : 'draft' }
              : h
          )
        );
      }
    } catch {
      alert('Durum güncellenirken hata oluştu');
    } finally {
      setTogglingId(null);
    }
  };

  const filteredHistory = history.filter((item) => {
    const isPub = item.post_published !== undefined ? item.post_published === 1 : item.status === 'published';
    if (filter === 'published') return isPub;
    if (filter === 'draft') return !isPub;
    return true;
  });

  const publishedCount = history.filter((i) =>
    i.post_published !== undefined ? i.post_published === 1 : i.status === 'published'
  ).length;
  const draftCount = history.length - publishedCount;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-indigo-900/50">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/30">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              Canlı Haber &amp; Otomasyon Motoru
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Otopilot Öğretmen &amp; Okul Haber Robotu 🤖
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              İnternetteki 5 büyük eğitim portalını anında tarar, öğretmen ve okul gündemini tespit eder.
              Sitemizde benzeri yoksa yapay zeka ile 800+ kelimelik özgün SEO makalesine dönüştürüp kapak görseliyle yayınlar.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 p-1.5 rounded-2xl">
              <button
                onClick={() => handleUpdateSettings('published')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  publishMode === 'published'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ✓ Otomatik Yayınla
              </button>
              <button
                onClick={() => handleUpdateSettings('draft')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  publishMode === 'draft'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                📝 Taslak Olarak Tut
              </button>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={countToGenerate}
                onChange={(e) => setCountToGenerate(parseInt(e.target.value, 10))}
                className="bg-slate-800 border border-slate-700 text-white text-xs font-bold px-3 py-2.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={isCrawling}
              >
                <option value={1}>1 Yeni Haber</option>
                <option value={2}>2 Yeni Haber</option>
                <option value={3}>3 Yeni Haber</option>
              </select>

              <button
                onClick={handleRunCrawler}
                disabled={isCrawling}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-2xl shadow-lg shadow-indigo-500/30 transition-all disabled:opacity-50"
              >
                {isCrawling ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    Taranıyor &amp; Yazılıyor...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    Şimdi Tara &amp; Üret
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Crawl Progress Terminal (Shows when running or just finished) */}
      {crawlProgress.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-xs font-mono space-y-2 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Robot İşlem Terminali
            </span>
            {isCrawling ? (
              <span className="text-amber-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                İşlem Yapılıyor
              </span>
            ) : (
              <button
                onClick={() => setCrawlProgress([])}
                className="text-slate-400 hover:text-white"
              >
                Temizle ✕
              </button>
            )}
          </div>
          <div className="space-y-1.5 pt-1">
            {crawlProgress.map((msg, i) => (
              <div key={i} className="text-slate-200 leading-relaxed flex items-start gap-2">
                <span className="text-indigo-400 select-none">&gt;</span>
                <span>{msg}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Taranan Portallar</span>
            <Newspaper className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">5 Aktif Portal</div>
          <p className="text-[11px] text-slate-400">MEB, KamudanHaber, AjansKamu, vb.</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Toplam Çekilen</span>
            <Radio className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">{history.length}</div>
          <p className="text-[11px] text-slate-400">Deduplication kayıtlı</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Yayındaki Haberler</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600">{publishedCount}</div>
          <p className="text-[11px] text-emerald-600/70 font-medium">Google &amp; Keşfet'e açık</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Bekleyen Taslaklar</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600">{draftCount}</div>
          <p className="text-[11px] text-slate-400">Onay bekleyen haberler</p>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Table Filter Tabs */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-indigo-600" />
              Filtrele:
            </span>
            <div className="inline-flex p-1 bg-slate-200/70 rounded-xl text-xs font-bold">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  filter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tümü ({history.length})
              </button>
              <button
                onClick={() => setFilter('published')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  filter === 'published' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Yayındakiler ({publishedCount})
              </button>
              <button
                onClick={() => setFilter('draft')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  filter === 'draft' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Taslaklar ({draftCount})
              </button>
            </div>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>Kopya koruması devrede: Aynı konudaki haberler asla mükerrer girilmez.</span>
          </div>
        </div>

        {/* News Table */}
        {isLoading ? (
          <div className="p-16 text-center text-slate-400 space-y-3">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-indigo-500" />
            <p className="text-xs font-bold">Haber geçmişi yükleniyor...</p>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <Newspaper className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-base text-slate-900">
                Henüz Taranmış Haber Bulunmuyor
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Yukarıdaki <strong>"Şimdi Tara &amp; Üret"</strong> butonuna basarak ilk öğretmen/okul haberlerinizi anında üretebilir ve yayınlayabilirsiniz.
              </p>
            </div>
            <button
              onClick={handleRunCrawler}
              disabled={isCrawling}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors shadow-md"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              İlk Taramayı Başlat
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider">
                  <th className="py-3.5 px-4 w-16">Kapak</th>
                  <th className="py-3.5 px-4">Yeniden Yazılan Başlık &amp; URL</th>
                  <th className="py-3.5 px-4">Kaynak &amp; Orijinal Başlık</th>
                  <th className="py-3.5 px-4 w-28">Tarih</th>
                  <th className="py-3.5 px-4 w-28">Durum</th>
                  <th className="py-3.5 px-4 w-40 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredHistory.map((item) => {
                  const isPub = item.post_published !== undefined ? item.post_published === 1 : item.status === 'published';
                  const title = item.current_title || item.source_title;
                  const slug = item.post_slug;

                  return (
                    <tr key={item.id} className="hover:bg-indigo-50/30 transition-colors group">
                      {/* Image Thumbnail */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="w-14 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          {item.source_image ? (
                            <img
                              src={item.source_image}
                              alt={title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              <Newspaper className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Rewritten Title & Link */}
                      <td className="py-3.5 px-4 align-top space-y-1">
                        <div className="font-extrabold text-slate-900 line-clamp-2 text-xs sm:text-sm group-hover:text-indigo-600 transition-colors">
                          {slug ? (
                            <Link href={`/post/${slug}`} target="_blank" className="hover:underline flex items-center gap-1">
                              {title}
                              <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          ) : (
                            title
                          )}
                        </div>
                        {slug && (
                          <div className="text-[11px] font-mono text-indigo-600/80">
                            /post/{slug}
                          </div>
                        )}
                      </td>

                      {/* Source & Original Title */}
                      <td className="py-3.5 px-4 align-top space-y-1">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          {item.source_site || 'Eğitim Portalı'}
                        </span>
                        <a
                          href={item.source_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-slate-500 hover:text-indigo-600 line-clamp-1 flex items-center gap-1"
                        >
                          <span className="truncate">{item.source_title}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 align-top text-slate-500 text-[11px] whitespace-nowrap">
                        {formatDate(item.created_at)}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 align-top">
                        <button
                          onClick={() => handleTogglePublish(item)}
                          disabled={togglingId === item.id || !item.post_id}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                            isPub
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                              : 'bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200'
                          }`}
                          title="Tıkla ve durumu değiştir"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isPub ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          {togglingId === item.id ? '...' : (isPub ? 'Yayında' : 'Taslak')}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 align-top text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {slug && (
                            <Link
                              href={`/post/${slug}`}
                              target="_blank"
                              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                              title="Sitede Görüntüle"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                          )}

                          <button
                            onClick={() => handleDeleteItem(item.id, title)}
                            disabled={deletingId === item.id}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Siteden ve Listeden Kaldır / Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
