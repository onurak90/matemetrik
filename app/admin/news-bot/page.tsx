'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Newspaper, Play, CheckCircle2, AlertCircle, Clock,
  ExternalLink, Trash2, RefreshCw, Sparkles, Shield,
  ArrowUpRight, Eye, Radio, Settings, Filter, CheckSquare,
  Square, Search, Layers, Send, ChevronRight, Edit3, ListPlus
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

interface SuggestionItem {
  title: string;
  link: string;
  source: string;
  pubDate: string;
  description: string;
  imageUrl: string;
  isDuplicate: boolean;
}

interface GeneratedArticle {
  id: number;
  title: string;
  slug: string;
  source: string;
  source_url: string;
  image: string;
  status: string;
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

  // Tabs: 'auto' | 'suggestions'
  const [activeTab, setActiveTab] = useState<'auto' | 'suggestions'>('auto');

  // Suggestions state
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const [suggestionsFilter, setSuggestionsFilter] = useState<'all' | 'only_new'>('only_new');
  const [suggestionSearch, setSuggestionSearch] = useState('');
  const [selectedUrls, setSelectedUrls] = useState<Set<string>>(new Set());
  const [generatingSingleUrl, setGeneratingSingleUrl] = useState<string | null>(null);

  // Recently created articles in current session
  const [lastGeneratedArticles, setLastGeneratedArticles] = useState<GeneratedArticle[]>([]);

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

  // Fetch live suggestions from RSS feeds
  const handleFetchSuggestions = async () => {
    setIsFetchingSuggestions(true);
    try {
      const res = await fetch('/api/news-bot/suggestions?limit=40');
      const data = await res.json();
      if (data.suggestions) {
        setSuggestions(data.suggestions);
        setSelectedUrls(new Set());
      }
    } catch (err) {
      console.error(err);
      alert('Öneriler getirilirken bir hata oluştu.');
    } finally {
      setIsFetchingSuggestions(false);
    }
  };

  // Run automatic batch crawler
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

      let totalCreated = 0;
      const allProcessed: any[] = [];

      for (let i = 0; i < countToGenerate; i++) {
        if (countToGenerate > 1) {
          setCrawlProgress((prev) => [
            ...prev,
            `⏳ [${i + 1}/${countToGenerate}] Haber taranıyor ve Gemini AI ile yazılıyor...`,
          ]);
        }

        const res = await fetch('/api/news-bot/crawl', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            count: 1,
            forcePublish: publishMode === 'published',
          }),
        });

        const data = await res.json();
        if (res.ok && data.data) {
          const results = data.data;
          if (results.created > 0 && results.processedArticles?.length > 0) {
            totalCreated += results.created;
            allProcessed.push(...results.processedArticles);
            setLastGeneratedArticles((prev) => [...results.processedArticles, ...prev]);
            setCrawlProgress((prev) => [
              ...prev,
              `✓ [${i + 1}/${countToGenerate}] "${results.processedArticles[0].title.substring(0, 40)}..." oluşturuldu!`,
            ]);
          } else {
            setCrawlProgress((prev) => [
              ...prev,
              `ℹ️ [${i + 1}/${countToGenerate}] Taranan haberler zaten sitemizde mevcut (Kopya koruması).`,
            ]);
            // If already duplicate, no need to keep looping for 10
            break;
          }
        } else {
          setCrawlProgress((prev) => [
            ...prev,
            `⚠️ [${i + 1}/${countToGenerate}] Hata: ${data.error || 'Üretilemedi'}`,
          ]);
        }
      }

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);

      if (totalCreated > 0) {
        setCrawlProgress((prev) => [
          ...prev,
          `🎉 Başarılı! Toplam ${totalCreated} adet haber yazıldı, görseli eklendi ve ${publishMode === 'published' ? 'CANLIYA YAYINLANDI' : 'TASLAK OLARAK KAYDEDİLDİ'}!`,
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

  // Generate selected suggestion articles sequentially to prevent timeouts
  const handleGenerateSelected = async () => {
    const selectedItems = suggestions.filter((s) => selectedUrls.has(s.link));
    if (selectedItems.length === 0) {
      alert('Lütfen üretmek istediğiniz en az 1 haberi seçin.');
      return;
    }

    setIsCrawling(true);
    setCrawlProgress([
      `🚀 Seçilen ${selectedItems.length} haber işleniyor... (Sunucu zaman aşımını önlemek için tek tek üretiliyor)`,
    ]);

    let createdTotal = 0;
    const successfulUrls = new Set<string>();

    try {
      for (let i = 0; i < selectedItems.length; i++) {
        const item = selectedItems[i];
        setCrawlProgress((prev) => [
          ...prev,
          `⏳ [${i + 1}/${selectedItems.length}] "${item.title.substring(0, 48)}..." hazırlanıyor (Kapak görseli alınıyor & Gemini AI makale yazıyor)...`,
        ]);

        try {
          const res = await fetch('/api/news-bot/crawl', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              selectedItems: [item],
              forcePublish: publishMode === 'published',
            }),
          });

          const data = await res.json();
          if (res.ok && data.data && data.data.created > 0) {
            createdTotal += data.data.created;
            const newArticles = data.data.processedArticles || [];
            setLastGeneratedArticles((prev) => [...newArticles, ...prev]);
            successfulUrls.add(item.link);
            setCrawlProgress((prev) => [
              ...prev,
              `✓ [${i + 1}/${selectedItems.length}] Başarıyla üretildi ve ${publishMode === 'published' ? 'CANLIYA YAYINLANDI' : 'TASLAK OLARAK KAYDEDİLDİ'}!`,
            ]);
          } else if (res.ok && data.data && data.data.skipped > 0) {
            successfulUrls.add(item.link);
            setCrawlProgress((prev) => [
              ...prev,
              `ℹ️ [${i + 1}/${selectedItems.length}] Bu haber daha önce sitemize eklenmişti (Atlandı).`,
            ]);
          } else {
            setCrawlProgress((prev) => [
              ...prev,
              `⚠️ [${i + 1}/${selectedItems.length}] "${item.title.substring(0, 35)}..." atlandı: ${data.error || 'İçerik üretilemedi'}`,
            ]);
          }
        } catch (itemErr: any) {
          setCrawlProgress((prev) => [
            ...prev,
            `❌ [${i + 1}/${selectedItems.length}] Bağlantı hatası: ${itemErr.message || 'Hata'}`,
          ]);
        }
      }

      if (createdTotal > 0) {
        setCrawlProgress((prev) => [
          ...prev,
          `🎉 Toplam ${createdTotal} adet haber başarıyla oluşturuldu ve siteye eklendi!`,
        ]);
        setSuggestions((prev) =>
          prev.map((s) => (successfulUrls.has(s.link) ? { ...s, isDuplicate: true } : s))
        );
        setSelectedUrls(new Set());
      } else {
        setCrawlProgress((prev) => [
          ...prev,
          `İşlem tamamlandı. Yeni üretilen haber: 0 (Seçilen haberler önceden yayınlanmış olabilir).`,
        ]);
      }

      await loadData();
    } catch (err: any) {
      setCrawlProgress((prev) => [
        ...prev,
        `❌ Genel hata: ${err.message || 'Bilinmeyen hata'}`,
      ]);
    } finally {
      setIsCrawling(false);
    }
  };

  // Generate a single suggestion item
  const handleGenerateSingle = async (item: SuggestionItem) => {
    setGeneratingSingleUrl(item.link);
    setIsCrawling(true);
    setCrawlProgress([
      `✍️ "${item.title}" haberi Gemini AI ile 800+ kelimelik SEO makalesine dönüştürülüyor...`,
    ]);

    try {
      const res = await fetch('/api/news-bot/crawl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedItems: [item],
          forcePublish: publishMode === 'published',
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'İşlem sırasında hata oluştu');
      }

      const results = data.data;
      if (results.created > 0 && results.processedArticles?.length > 0) {
        setLastGeneratedArticles(results.processedArticles);
        setCrawlProgress((prev) => [
          ...prev,
          `✓ Başarılı! Haber üretildi ve ${publishMode === 'published' ? 'CANLIYA YAYINLANDI' : 'TASLAK OLARAK KAYDEDİLDİ'}!`,
        ]);
        setSuggestions((prev) =>
          prev.map((s) => (s.link === item.link ? { ...s, isDuplicate: true } : s))
        );
      }

      await loadData();
    } catch (err: any) {
      setCrawlProgress((prev) => [
        ...prev,
        `❌ Hata: ${err.message || 'Bilinmeyen hata'}`,
      ]);
    } finally {
      setIsCrawling(false);
      setGeneratingSingleUrl(null);
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
        setLastGeneratedArticles((prev) => prev.filter((a) => a.id !== id));
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

  // Filtered suggestions
  const filteredSuggestions = suggestions.filter((s) => {
    if (suggestionsFilter === 'only_new' && s.isDuplicate) return false;
    if (suggestionSearch.trim()) {
      const q = suggestionSearch.toLowerCase();
      return s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
    }
    return true;
  });

  const toggleSelectUrl = (url: string) => {
    const next = new Set(selectedUrls);
    if (next.has(url)) next.delete(url);
    else next.add(url);
    setSelectedUrls(next);
  };

  const toggleSelectAll = () => {
    const selectable = filteredSuggestions.filter((s) => !s.isDuplicate);
    if (selectedUrls.size === selectable.length && selectable.length > 0) {
      setSelectedUrls(new Set());
    } else {
      setSelectedUrls(new Set(selectable.map((s) => s.link)));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-indigo-900/50">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/30">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              Otomatik Kontrol: Her Gün Saat 11:00 ve 18:00
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Otopilot Öğretmen &amp; Okul Haber Robotu 🤖
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              İnternetteki büyük eğitim portallarını (MEB Personel, Kamudan Haber, Kamu Personeli, Ajans Kamu, Google News) tarar,
              öğretmen ve okul haberlerini tespit eder. Sitemizde yoksa Gemini ile 800+ kelimelik SEO makalesine dönüştürüp yayınlar.
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
          </div>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="flex border-b border-slate-200 gap-4">
        <button
          onClick={() => setActiveTab('auto')}
          className={`pb-3 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'auto'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Play className="w-4 h-4" />
          Hızlı Otomatik Üretim
        </button>
        <button
          onClick={() => {
            setActiveTab('suggestions');
            if (suggestions.length === 0) handleFetchSuggestions();
          }}
          className={`pb-3 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'suggestions'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          Canlı Haber Önerileri (Seçerek Üret)
          {suggestions.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-black">
              {suggestions.length}
            </span>
          )}
        </button>
      </div>

      {/* Tab 1: Auto Batch Generator */}
      {activeTab === 'auto' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                Otomatik Tarama &amp; Toplu Üretim
              </h3>
              <p className="text-xs text-slate-500">
                Kaç adet yeni öğretmen/okul haberi üretmek istediğinizi girin veya butonlardan seçip başlatın.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Custom Number Input & Preset Chips */}
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-2xl">
                <span className="text-xs font-bold text-slate-600">Sayı:</span>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={countToGenerate}
                  onChange={(e) => setCountToGenerate(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                  className="w-14 bg-white border border-slate-300 text-slate-900 font-extrabold text-xs px-2 py-1 rounded-xl text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={isCrawling}
                />
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 5, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setCountToGenerate(num)}
                      className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all ${
                        countToGenerate === num
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                      disabled={isCrawling}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleRunCrawler}
                disabled={isCrawling}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-2xl shadow-lg shadow-indigo-600/20 transition-all disabled:opacity-50"
              >
                {isCrawling ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    Taranıyor &amp; Yazılıyor...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    Şimdi Tara &amp; {countToGenerate} Haber Üret
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Live Suggestions */}
      {activeTab === 'suggestions' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="space-y-1">
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                İnternetteki Canlı Öğretmen &amp; Okul Haberleri
              </h3>
              <p className="text-xs text-slate-500">
                Aşağıdaki önerilerden istediklerinizi seçip tek tıkla üretebilir veya tek tek inceleyebilirsiniz.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleFetchSuggestions}
                disabled={isFetchingSuggestions || isCrawling}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded-2xl transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isFetchingSuggestions ? 'animate-spin text-indigo-600' : ''}`} />
                {isFetchingSuggestions ? 'Taranıyor...' : 'Yeniden Tara'}
              </button>

              {selectedUrls.size > 0 && (
                <button
                  onClick={handleGenerateSelected}
                  disabled={isCrawling}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-4 py-2 rounded-2xl shadow-md transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  Seçilenleri Üret ({selectedUrls.size})
                </button>
              )}
            </div>
          </div>

          {/* Filters & Search for Suggestions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Öneriler içinde ara..."
                value={suggestionSearch}
                onChange={(e) => setSuggestionSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs pl-9 pr-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setSuggestionsFilter('only_new')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    suggestionsFilter === 'only_new' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  Sadece Yeniler ({suggestions.filter((s) => !s.isDuplicate).length})
                </button>
                <button
                  onClick={() => setSuggestionsFilter('all')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    suggestionsFilter === 'all' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  Tümü ({suggestions.length})
                </button>
              </div>

              <button
                onClick={toggleSelectAll}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 px-2 py-1"
              >
                {selectedUrls.size > 0 && selectedUrls.size === filteredSuggestions.filter((s) => !s.isDuplicate).length
                  ? 'Seçimi Kaldır'
                  : 'Tümünü Seç'}
              </button>
            </div>
          </div>

          {/* Suggestions List */}
          {isFetchingSuggestions ? (
            <div className="p-16 text-center text-slate-400 space-y-3">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-indigo-500" />
              <p className="text-xs font-bold">Eğitim portalları taranıyor ve öneriler analiz ediliyor...</p>
            </div>
          ) : filteredSuggestions.length === 0 ? (
            <div className="p-12 text-center text-slate-500 space-y-2">
              <AlertCircle className="w-8 h-8 mx-auto text-amber-500" />
              <p className="text-xs font-bold">Uygun haber önerisi bulunamadı.</p>
              <button
                onClick={handleFetchSuggestions}
                className="text-indigo-600 font-bold text-xs underline"
              >
                Haberleri Yeniden Tara
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSuggestions.map((item, idx) => {
                const isSelected = selectedUrls.has(item.link);
                const isGeneratingThis = generatingSingleUrl === item.link;

                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border p-4 transition-all flex flex-col justify-between space-y-3 ${
                      item.isDuplicate
                        ? 'bg-slate-50/70 border-slate-200 opacity-70'
                        : isSelected
                        ? 'bg-indigo-50/50 border-indigo-300 shadow-sm ring-1 ring-indigo-300'
                        : 'bg-white border-slate-200 hover:border-indigo-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* Checkbox (if not duplicate) */}
                      {!item.isDuplicate && (
                        <button
                          type="button"
                          onClick={() => toggleSelectUrl(item.link)}
                          className="mt-1 text-slate-400 hover:text-indigo-600 shrink-0"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-5 h-5 text-indigo-600 fill-indigo-50" />
                          ) : (
                            <Square className="w-5 h-5" />
                          )}
                        </button>
                      )}

                      {/* Thumbnail */}
                      <div className="w-16 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <Newspaper className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                            {item.source}
                          </span>
                          {item.isDuplicate ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Sitede Yayında
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                              Yeni Fırsat
                            </span>
                          )}
                        </div>

                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 leading-snug">
                          {item.title}
                        </h4>

                        {item.description && (
                          <p className="text-[11px] text-slate-500 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-indigo-600 flex items-center gap-1 text-[11px]"
                      >
                        Kaynağı Gör <ExternalLink className="w-3 h-3" />
                      </a>

                      {!item.isDuplicate ? (
                        <button
                          type="button"
                          onClick={() => handleGenerateSingle(item)}
                          disabled={isCrawling}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all shadow-sm disabled:opacity-50"
                        >
                          {isGeneratingThis ? (
                            <>
                              <RefreshCw className="w-3 h-3 animate-spin" />
                              Yazılıyor...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3 h-3" />
                              Hemen Üret
                            </>
                          )}
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Zaten Eklendi
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Terminal Progress Log */}
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

      {/* SUCCESS BANNER: Newly Generated Articles */}
      {lastGeneratedArticles.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 border-2 border-emerald-500/30 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-emerald-800">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-600">
                ✓
              </div>
              <div>
                <h3 className="font-black text-sm sm:text-base">
                  Haber Başarıyla Üretildi ve Yayına Alındı!
                </h3>
                <p className="text-xs text-emerald-700">
                  Aşağıdaki butonlara tıklayarak doğrudan sitede canlı inceleyebilir veya düzenleyebilirsiniz:
                </p>
              </div>
            </div>
            <button
              onClick={() => setLastGeneratedArticles([])}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900"
            >
              Kapat ✕
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {lastGeneratedArticles.map((art) => (
              <div
                key={art.id}
                className="bg-white rounded-2xl p-4 border border-emerald-200 shadow-sm flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <img src={art.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800">
                      {art.status}
                    </span>
                    <h4 className="font-extrabold text-xs text-slate-900 truncate">
                      {art.title}
                    </h4>
                    <p className="text-[10px] font-mono text-indigo-600 truncate">
                      /post/{art.slug}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/post/${art.slug}`}
                    target="_blank"
                    className="flex items-center gap-1 bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    Sitede Gör <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-slate-400 text-xs font-medium flex items-center gap-1.5">
            <Newspaper className="w-4 h-4 text-indigo-500" />
            Toplam Taranan Haber
          </div>
          <div className="text-2xl font-black text-slate-900">{history.length}</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-slate-400 text-xs font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Canlıda Yayında
          </div>
          <div className="text-2xl font-black text-emerald-600">{publishedCount}</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-slate-400 text-xs font-medium flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-500" />
            Taslak Olarak Bekleyen
          </div>
          <div className="text-2xl font-black text-amber-600">{draftCount}</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-slate-400 text-xs font-medium flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-indigo-500" />
            Otomatik Yayın Modu
          </div>
          <div className="text-sm font-extrabold text-slate-800">
            {publishMode === 'published' ? 'Otomatik Yayında' : 'Taslak Modu'}
          </div>
        </div>
      </div>

      {/* News Management Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Filter Header */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-slate-900">
              Taranan &amp; Üretilen Tüm Haberler
            </h2>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  filter === 'all' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
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
                          {togglingId === item.id ? (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          ) : isPub ? (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Yayında
                            </>
                          ) : (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              Taslak
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 align-top text-right space-x-2">
                        {slug && (
                          <Link
                            href={`/post/${slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 transition-colors font-bold text-[11px]"
                            title="Sitede Görüntüle"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Gör
                          </Link>
                        )}

                        <button
                          onClick={() => handleDeleteItem(item.id, title)}
                          disabled={deletingId === item.id}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 transition-colors font-bold text-[11px] disabled:opacity-50"
                          title="Haberi ve Sitedeki Yazıyı Tamamen Sil"
                        >
                          {deletingId === item.id ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                          Sil
                        </button>
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
