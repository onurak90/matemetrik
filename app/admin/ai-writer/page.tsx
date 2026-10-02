'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Sparkles, TrendingUp, Cpu, Globe, CheckCircle2,
  AlertCircle, ArrowRight, ExternalLink, Edit3, Image as ImageIcon,
  Check, Layers, FileText, Hash, Link as LinkIcon, RefreshCw,
  Plus, Eye, BookOpen, Clock, ShieldCheck, ChevronRight,
  Activity, Zap, Compass, CheckCircle, Timer, Upload, Trash2, FolderOpen
} from 'lucide-react';
import { Category } from '@/lib/types';

interface TrendTopic {
  title: string;
  keyword: string;
  intent: string;
  volume: string;
  category: string;
}

interface GeneratedPostData {
  post: {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string;
    category: string;
    category_slug: string;
    tags: string[];
    is_published: number;
  };
  seoScore: number;
  wordCount: number;
  internalLinksCount: number;
  externalLinksCount: number;
  coverImage: string;
  feedback: string[];
}

export default function AiWriterPage() {
  // Config & Form States
  const [categories, setCategories] = useState<Category[]>([]);
  const [topicsInput, setTopicsInput] = useState('');
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [tone, setTone] = useState('Öğretici ve Pedagojik');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('');
  const [customInstructions, setCustomInstructions] = useState('');

  // Trends Explorer States
  const [trendKeyword, setTrendKeyword] = useState('');
  const [isSearchingTrends, setIsSearchingTrends] = useState(false);
  const [trendResults, setTrendResults] = useState<TrendTopic[]>([]);

  // Generation & Progress States
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(1);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentTopicTitle, setCurrentTopicTitle] = useState('');
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [latestGenerated, setLatestGenerated] = useState<GeneratedPostData | null>(null);
  const [batchResults, setBatchResults] = useState<GeneratedPostData[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successPublishId, setSuccessPublishId] = useState<number | null>(null);

  // Persistent Drafts & Cover Editing States
  const [draftPosts, setDraftPosts] = useState<any[]>([]);
  const [isLoadingDrafts, setIsLoadingDrafts] = useState(false);
  const [isEditingCover, setIsEditingCover] = useState(false);
  const [newCoverUrl, setNewCoverUrl] = useState('');
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [editingModalPost, setEditingModalPost] = useState<any | null>(null);
  const [modalCoverUrl, setModalCoverUrl] = useState('');
  const [isModalUploading, setIsModalUploading] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const loadDrafts = async () => {
    try {
      setIsLoadingDrafts(true);
      const res = await fetch('/api/posts?drafts=true&limit=50');
      const data = await res.json();
      setDraftPosts(data.posts || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingDrafts(false);
    }
  };

  const handleUpdateCover = async (postId: number, imageUrl: string, targetPost?: any) => {
    if (!imageUrl.trim()) {
      alert('Lütfen geçerli bir görsel bağlantısı girin.');
      return;
    }
    const cleanUrl = imageUrl.trim();
    try {
      const activePost = (latestGenerated && latestGenerated.post.id === postId) 
        ? latestGenerated.post 
        : (targetPost || draftPosts.find((p) => p.id === postId));

      let updatedContent = activePost?.content || '';
      const safeTitle = (activePost?.title || 'Yazı Görseli').replace(/"/g, '&quot;');
      const figureHtml = `<figure class="my-6 text-center"><img src="${cleanUrl}" alt="${safeTitle}" class="w-full max-h-[480px] object-cover rounded-2xl shadow-lg mx-auto" /><figcaption class="text-xs text-slate-500 mt-2">${safeTitle} - Matemetrik</figcaption></figure>`;

      if (updatedContent) {
        const imgRegex = /<figure[^>]*>[\s\S]*?<img[^>]+src=["'][^"']+["'][^>]*>[\s\S]*?<\/figure>|<img[^>]+src=["'][^"']+["'][^>]*>/i;
        if (imgRegex.test(updatedContent)) {
          updatedContent = updatedContent.replace(imgRegex, figureHtml);
        } else {
          updatedContent = `${figureHtml}\n${updatedContent}`;
        }
      } else {
        updatedContent = figureHtml;
      }

      const payload: any = {
        featured_image: cleanUrl,
        content: updatedContent,
      };

      if (activePost) {
        payload.title = activePost.title;
        payload.slug = activePost.slug;
        payload.excerpt = activePost.excerpt;
        payload.category = activePost.category;
        payload.category_slug = activePost.category_slug;
        payload.tags = activePost.tags;
        payload.is_published = activePost.is_published !== undefined ? activePost.is_published : 0;
      }

      const res = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Sunucu hatası: ${res.status}`);
      }

      if (latestGenerated && latestGenerated.post.id === postId) {
        setLatestGenerated({
          ...latestGenerated,
          coverImage: cleanUrl,
          post: {
            ...latestGenerated.post,
            featured_image: cleanUrl,
            content: updatedContent,
          },
        });
      }
      setDraftPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, featured_image: cleanUrl, content: updatedContent } : p
        )
      );
      setIsEditingCover(false);
      setEditingModalPost(null);
      alert('✓ Görsel başarıyla güncellendi ve yazıya eklendi!');
    } catch (err: any) {
      alert(`Görsel güncellenirken hata oluştu: ${err.message || 'Bilinmeyen hata'}`);
    }
  };

  const handleUploadCover = async (postId: number, file: File, isModal = false) => {
    try {
      if (isModal) setIsModalUploading(true);
      else setIsUploadingCover(true);

      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        await handleUpdateCover(postId, data.url);
      } else {
        alert(data.error || 'Yükleme başarısız');
      }
    } catch (err: any) {
      alert(`Görsel yüklenirken hata oluştu: ${err.message || 'Bilinmeyen hata'}`);
    } finally {
      if (isModal) setIsModalUploading(false);
      else setIsUploadingCover(false);
    }
  };

  const handleDeleteDraft = async (postId: number) => {
    if (!confirm('Bu taslağı silmek istediğinizden emin misiniz?')) return;
    try {
      const res = await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
      if (res.ok) {
        setDraftPosts((prev) => prev.filter((p) => p.id !== postId));
        if (latestGenerated && latestGenerated.post.id === postId) {
          setLatestGenerated(null);
        }
      }
    } catch {
      alert('Silinirken hata oluştu');
    }
  };

  // Load categories and initial drafts
  useEffect(() => {
    loadDrafts();
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data || []);
        if (data && data.length > 0) {
          setSelectedCategorySlug(data[0].slug);
        }
      })
      .catch(console.error);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Handle Google Trends Search
  const handleTrendsSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!trendKeyword.trim()) return;

    setIsSearchingTrends(true);
    setErrorMessage('');
    try {
      const res = await fetch('/api/ai-writer/trends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: trendKeyword.trim() }),
      });
      const text = await res.text();
      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Sunucu hatası (${res.status}): Lütfen birkaç saniye sonra tekrar deneyin.`);
      }
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Trend konular alınamadı');
      }
      setTrendResults(data.topics || []);
    } catch (err: any) {
      setErrorMessage(err.message || 'Google Trends aranırken hata oluştu');
    } finally {
      setIsSearchingTrends(false);
    }
  };

  // Add single trend topic to queue
  const handleAddTrendTopic = (topic: TrendTopic) => {
    setTopicsInput((prev) => {
      const cleanPrev = prev.trim();
      return cleanPrev ? `${cleanPrev}\n${topic.title}` : topic.title;
    });
  };

  // Add all 10 trend topics to queue
  const handleAddAllTrends = () => {
    if (trendResults.length === 0) return;
    const allTitles = trendResults.map((t) => t.title).join('\n');
    setTopicsInput((prev) => {
      const cleanPrev = prev.trim();
      return cleanPrev ? `${cleanPrev}\n${allTitles}` : allTitles;
    });
  };

  // Parse topics from textarea (one per line)
  const queueTopics = topicsInput
    .split('\n')
    .map((t) => t.trim())
    .filter(Boolean);

  // Sequentially generate articles
  const handleGenerate = async () => {
    if (queueTopics.length === 0) {
      setErrorMessage('Lütfen en az bir konu satırı girin veya trendlerden ekleyin.');
      return;
    }

    setIsGenerating(true);
    setErrorMessage('');
    setProgress({ current: 0, total: queueTopics.length });
    setElapsedSeconds(0);
    setActiveStepIndex(1);

    // Start live elapsed timer
    if (timerRef.current) clearInterval(timerRef.current);
    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      const seconds = Math.floor((Date.now() - startTime) / 1000);
      setElapsedSeconds(seconds);

      // Dynamically advance step visuals based on progress
      if (seconds < 2) {
        setActiveStepIndex(1);
      } else if (seconds < 5) {
        setActiveStepIndex(2);
      } else if (seconds < 8) {
        setActiveStepIndex(3);
      } else {
        setActiveStepIndex(4);
      }
    }, 500);

    const newlyGenerated: GeneratedPostData[] = [];

    for (let i = 0; i < queueTopics.length; i++) {
      const topic = queueTopics[i];
      setCurrentTopicTitle(topic);
      setProgress({ current: i + 1, total: queueTopics.length });

      try {
        const res = await fetch('/api/ai-writer/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            topic,
            competitorUrl: competitorUrl.trim() || undefined,
            tone,
            length,
            categorySlug: selectedCategorySlug || undefined,
            customInstructions: customInstructions.trim() || undefined,
          }),
        });

        const text = await res.text();
        let data: any;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error(`Sunucu hatası (${res.status}): Yanıt alınamadı, lütfen tekrar deneyin.`);
        }

        if (!res.ok || data.error) {
          throw new Error(data.error || 'Üretim hatası');
        }

        newlyGenerated.unshift(data.data);
        setLatestGenerated(data.data);
        setBatchResults((prev) => [data.data, ...prev]);
      } catch (err: any) {
        setErrorMessage(`"${topic}" üretilirken hata oluştu: ${err.message}`);
        break;
      }
    }

    if (timerRef.current) clearInterval(timerRef.current);
    await loadDrafts();
    setIsGenerating(false);
  };

  const [isPublishingAction, setIsPublishingAction] = useState(false);

  // Set Publish status: 1 = Yayında, 0 = Taslak
  const handleSetPublishStatus = async (id: number, status: number) => {
    try {
      setIsPublishingAction(true);
      const activePost = (latestGenerated && latestGenerated.post.id === id)
        ? latestGenerated.post
        : draftPosts.find((p) => p.id === id);

      const payload: any = {
        is_published: status,
      };

      if (activePost) {
        payload.title = activePost.title;
        payload.slug = activePost.slug;
        payload.excerpt = activePost.excerpt;
        payload.content = activePost.content;
        payload.featured_image = activePost.featured_image;
        payload.category = activePost.category;
        payload.category_slug = activePost.category_slug;
        payload.tags = activePost.tags;
      }

      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Sunucu hatası: ${res.status}`);
      }

      if (status === 1) {
        setSuccessPublishId(id);
      } else {
        setSuccessPublishId(null);
      }

      if (latestGenerated && latestGenerated.post.id === id) {
        setLatestGenerated({
          ...latestGenerated,
          post: { ...latestGenerated.post, is_published: status },
        });
      }

      await loadDrafts();

      if (status === 1) {
        alert('✓ Yazı başarıyla CANLIYA YAYINLANDI! Artık sitede ve arama motorlarında yayında.');
      } else {
        alert('✓ Yazı başarıyla TASLAK olarak kaydedildi! "Tüm Blog Yazıları" ve alttaki "Bekleyen Taslaklar" listesinden erişebilirsiniz.');
      }
    } catch (err: any) {
      alert(`İşlem sırasında hata oluştu: ${err.message || 'Bilinmeyen hata'}`);
    } finally {
      setIsPublishingAction(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-indigo-900/50">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Matemetrik Pro AI Stüdyosu
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Yapay Zeka Blog Yazısı &amp; Otomatik Kapak Fabrikası
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Google Trends araması yapın, rakip URL analiz edin; %100 SEO uyumlu makale, URL slug, meta açıklama, iç/dış linkler ve otomatik başlıklı kapak görseliyle taslak olarak oluşturun.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Ultra Hızlı Gemini Motoru Aktif
            </div>
            <Link
              href="/admin/posts"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-colors"
            >
              Taslak Yazıları Gör &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Controls | Right Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Trends & Production Queue (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Box 1: Google Trends & Keyword Finder */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                Google Trends &amp; Anahtar Kelime Analizi
              </h2>
              <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                10 Trend Konu
              </span>
            </div>

            <form onSubmit={handleTrendsSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Örn: 10. Sınıf Matematik, LGS 2026, Karne..."
                value={trendKeyword}
                onChange={(e) => setTrendKeyword(e.target.value)}
                className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
              <button
                type="submit"
                disabled={isSearchingTrends || !trendKeyword.trim()}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 shrink-0"
              >
                {isSearchingTrends ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <TrendingUp className="w-4 h-4" />
                )}
                {isSearchingTrends ? 'Analiz...' : 'Trend Bul'}
              </button>
            </form>

            {/* Trends Results List */}
            {trendResults.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-slate-100 animate-fadeIn">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Bulunan 10 Trend Konu:</span>
                  <button
                    type="button"
                    onClick={handleAddAllTrends}
                    className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tümünü Ekle
                  </button>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {trendResults.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/60 border border-slate-200/80 transition-all flex items-start justify-between gap-3 group"
                    >
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 line-clamp-1">
                          {item.title}
                        </div>
                        <div className="flex items-center gap-2 text-[10px]">
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium border border-emerald-200">
                            {item.volume}
                          </span>
                          <span className="text-slate-400 font-mono">
                            #{item.keyword}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddTrendTopic(item)}
                        className="px-2.5 py-1 bg-white hover:bg-indigo-600 hover:text-white text-slate-700 border border-slate-200 hover:border-indigo-600 rounded-lg text-[11px] font-bold transition-colors shrink-0 flex items-center gap-1 shadow-2xs"
                        title="Kuyruğa Ekle"
                      >
                        <Plus className="w-3 h-3" /> Ekle
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Box 2: Production Queue Form */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-600" />
                Üretim Kuyruğu &amp; Ayarlar
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                {queueTopics.length} Konu Hazır
              </span>
            </div>

            {/* Topics Textarea */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <label>Konular (Her satıra bir konu girin)</label>
                {topicsInput && (
                  <button
                    type="button"
                    onClick={() => setTopicsInput('')}
                    className="text-slate-400 hover:text-rose-600 text-[11px]"
                  >
                    Temizle
                  </button>
                )}
              </div>
              <textarea
                rows={5}
                value={topicsInput}
                onChange={(e) => setTopicsInput(e.target.value)}
                placeholder="10. Sınıf Fonksiyonlar Konu Anlatımı ve MEB Çözümleri&#10;LGS 2026 Matematik Soru Dağılımı ve Taktikler&#10;Karne Görüşü Yazarken Dikkat Edilmesi Gerekenler"
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-sans leading-relaxed resize-y"
              />
            </div>

            {/* Competitor URL */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Rakip URL Analizi (Opsiyonel)
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="url"
                  placeholder="https://rakipsite.com/ornek-matematik-yazisi"
                  value={competitorUrl}
                  onChange={(e) => setCompetitorUrl(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
              </div>
              <p className="text-[10px] text-slate-400">
                Rakip içerik taranıp eksikleri analiz edilerek %100 özgün ve daha üstün içerik üretilir.
              </p>
            </div>

            {/* Tone & Length */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Yazım Tarzı
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Öğretici ve Pedagojik">Öğretici &amp; Pedagojik</option>
                  <option value="Samimi ve Akıcı">Samimi &amp; Anlaşılır</option>
                  <option value="Rehber ve Sınav Stratejisi">Sınav Taktikleri</option>
                  <option value="Resmi MEB Dili">Resmi MEB Dili</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Yazı Uzunluğu
                </label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="short">Kısa (~500 kelime)</option>
                  <option value="medium">Orta (~1000 kelime)</option>
                  <option value="long">Kapsamlı (1600+ kelime)</option>
                </select>
              </div>
            </div>

            {/* Target Category */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Hedef Blog Kategorisi
              </label>
              <select
                value={selectedCategorySlug}
                onChange={(e) => setSelectedCategorySlug(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Instructions */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Özel Ek Talimatlar (Opsiyonel)
              </label>
              <input
                type="text"
                placeholder="Örn: 5 adet çözümlü örnek soru tablosu ekle..."
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Error Display */}
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Generate Action Button */}
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating || queueTopics.length === 0}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 hover:opacity-95 disabled:opacity-50 text-white font-bold text-sm rounded-2xl transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Sırayla Taslak Olarak Üretiliyor ({progress.current}/{progress.total})...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Sırayla Taslak Olarak Üret ({queueTopics.length} Konu) 🚀
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Live Output / Preview / SEO Audit (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* STATE 1: ACTIVE GENERATION IN PROGRESS SCREEN */}
          {isGenerating ? (
            <div className="bg-white rounded-3xl border-2 border-indigo-200 shadow-xl p-8 sm:p-10 space-y-8 animate-fadeIn text-slate-800">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center">
                    <span className="w-4 h-4 rounded-full bg-indigo-600 animate-ping absolute" />
                    <span className="w-3 h-3 rounded-full bg-indigo-600 relative" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">
                      Yapay Zeka Makalenizi Hazırlıyor...
                    </h3>
                    <p className="text-xs text-slate-500">
                      Konu {progress.current} / {progress.total}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-mono font-bold">
                  <Timer className="w-3.5 h-3.5 animate-spin" />
                  {elapsedSeconds} sn
                </div>
              </div>

              {/* Current Topic Title */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Şu Anda İşlenen Konu:
                </div>
                <div className="font-bold text-slate-900 text-sm sm:text-base line-clamp-2">
                  "{currentTopicTitle}"
                </div>
              </div>

              {/* 4-Step Animated Progress Indicator */}
              <div className="space-y-3">
                <div className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                  activeStepIndex >= 1
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    activeStepIndex > 1 ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white'
                  }`}>
                    {activeStepIndex > 1 ? '✓' : '1'}
                  </div>
                  <span className="text-xs sm:text-sm">
                    🔍 Google Trends ve Semantik Anahtar Kelime Haritası Çıkarılıyor
                  </span>
                </div>

                <div className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                  activeStepIndex >= 2
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    activeStepIndex > 2 ? 'bg-emerald-600 text-white' : activeStepIndex === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {activeStepIndex > 2 ? '✓' : '2'}
                  </div>
                  <span className="text-xs sm:text-sm">
                    ✍️ MEB Müfredatına Uygun Zengin İçerik, Tablolar ve İç Linkler Yazılıyor
                  </span>
                </div>

                <div className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                  activeStepIndex >= 3
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    activeStepIndex > 3 ? 'bg-emerald-600 text-white' : activeStepIndex === 3 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {activeStepIndex > 3 ? '✓' : '3'}
                  </div>
                  <span className="text-xs sm:text-sm">
                    🎨 1200x630 Başlıklı Özel Kapak Görseli Çiziliyor
                  </span>
                </div>

                <div className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                  activeStepIndex >= 4
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    activeStepIndex >= 4 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    4
                  </div>
                  <span className="text-xs sm:text-sm">
                    💾 Veritabanına Taslak Olarak Kaydediliyor
                  </span>
                </div>
              </div>

              <div className="text-center text-xs text-slate-400">
                Lütfen pencereyi kapatmayın, içerik hazırlandığında otomatik olarak ekranda belirecektir.
              </div>
            </div>
          ) : latestGenerated ? (
            /* STATE 2: LATEST COMPLETED POST PREVIEW */
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 animate-fadeIn">
              {/* Top Meta Header & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                      Taslak Olarak Kaydedildi
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">
                      {latestGenerated.post.category}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    /post/{latestGenerated.post.slug}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {latestGenerated.post.is_published === 0 ? (
                    <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1.5 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      Taslak Olarak Kayıtlı
                    </span>
                  ) : (
                    <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1.5 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Canlıda Yayında
                    </span>
                  )}

                  {/* Taslak Olarak Kaydet / Yayınla Button */}
                  <button
                    type="button"
                    disabled={isPublishingAction}
                    onClick={() => handleSetPublishStatus(latestGenerated.post.id, 0)}
                    className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-50"
                    title="Yazıyı taslak olarak sakla ve tüm yazılar taslak deposuna ekle"
                  >
                    <span>📝</span>
                    <span>Taslak Olarak Kaydet</span>
                  </button>

                  {/* Canlıya Yayınla Button */}
                  <button
                    type="button"
                    disabled={isPublishingAction}
                    onClick={() => handleSetPublishStatus(latestGenerated.post.id, 1)}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <span>🚀</span>
                    <span>{latestGenerated.post.is_published === 1 ? 'Yayında (Güncelle)' : 'Canlıya Yayınla'}</span>
                  </button>

                  <Link
                    href={`/admin/posts/${latestGenerated.post.id}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors shadow-sm"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    WordPress Editör &rarr;
                  </Link>

                  {latestGenerated.post.is_published === 1 && (
                    <Link
                      href={`/post/${latestGenerated.post.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Sitede Gör
                    </Link>
                  )}
                </div>
              </div>

              {/* Cover Image Preview & Changer */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-indigo-600" />
                    Kapak Görseli (1200x630)
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingCover(!isEditingCover);
                      setNewCoverUrl(latestGenerated.coverImage || '');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-semibold transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    {isEditingCover ? 'Kapat' : 'Görseli Değiştir'}
                  </button>
                </div>

                {isEditingCover && (
                  <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl space-y-3 animate-fadeIn">
                    <div className="text-xs font-bold text-indigo-900">
                      Yeni Kapak Görseli Belirle
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={newCoverUrl}
                        onChange={(e) => setNewCoverUrl(e.target.value)}
                        placeholder="Örn: https://... veya /uploads/resim.webp"
                        className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleUpdateCover(latestGenerated.post.id, newCoverUrl)}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shrink-0 transition-colors"
                      >
                        Kaydet
                      </button>
                    </div>

                    <div className="flex items-center gap-2 pt-1 border-t border-indigo-100">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold cursor-pointer transition-colors">
                        <Upload className="w-3.5 h-3.5 text-indigo-600" />
                        {isUploadingCover ? 'Yükleniyor...' : 'Bilgisayardan Yükle'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleUploadCover(latestGenerated.post.id, file);
                          }}
                        />
                      </label>
                      <span className="text-[11px] text-slate-500">
                        PNG, JPG veya WebP formatında görsel yükleyebilirsiniz.
                      </span>
                    </div>
                  </div>
                )}

                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-900 aspect-[1200/630] relative group">
                  <img
                    src={latestGenerated.coverImage}
                    alt={latestGenerated.post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-white text-[11px] font-mono">
                    {latestGenerated.coverImage}
                  </div>
                </div>
              </div>

              {/* SEO Score Card */}
              <div className="p-5 bg-gradient-to-br from-slate-50 to-indigo-50/40 rounded-2xl border border-indigo-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-md ${
                        latestGenerated.seoScore >= 85
                          ? 'bg-emerald-500'
                          : latestGenerated.seoScore >= 70
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                    >
                      {latestGenerated.seoScore}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">
                        {latestGenerated.seoScore >= 85
                          ? 'Mükemmel SEO Skoru'
                          : latestGenerated.seoScore >= 70
                          ? 'İyi SEO Skoru'
                          : 'Geliştirilebilir SEO'}
                      </div>
                      <div className="text-xs text-slate-500">
                        {latestGenerated.wordCount} Kelime &bull; {latestGenerated.internalLinksCount} İç Bağlantı &bull; {latestGenerated.externalLinksCount} Dış Bağlantı
                      </div>
                    </div>
                  </div>

                  <div className="text-right text-xs text-slate-500">
                    <span className="font-bold text-indigo-600">%100 MEB Uyumlu</span>
                  </div>
                </div>

                {/* Feedback items */}
                <div className="space-y-1 text-xs text-slate-600 pt-1">
                  {latestGenerated.feedback.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Title & Meta Description */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    SEO Başlığı (H1)
                  </label>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {latestGenerated.post.title}
                  </h2>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Meta Açıklama (Google Snippet)
                  </label>
                  <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/80 leading-relaxed">
                    {latestGenerated.post.excerpt}
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Etiketler (Tags)
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {latestGenerated.post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Rendered Article Content */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Oluşturulan Zengin İçerik Önizlemesi
                </label>
                <div className="max-h-96 overflow-y-auto p-5 bg-slate-50/70 rounded-2xl border border-slate-200 prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-table:border prose-table:border-slate-200">
                  <div dangerouslySetInnerHTML={{ __html: latestGenerated.post.content }} />
                </div>
              </div>
            </div>
          ) : (
            /* STATE 3: IDLE AWAITING COMMAND SCREEN */
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10 min-h-[500px] flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl shadow-inner">
                ✨
              </div>
              <div className="space-y-1.5 max-w-md">
                <h3 className="text-lg font-bold text-slate-800">
                  Komuta Merkezi Beklemede
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Sol panelden dilediğiniz kelimeyle Google Trends analizi yapıp 10 konuyu kuyruğa ekleyin veya kendi konu listenizi girerek <strong>Sırayla Taslak Olarak Üret</strong> butonuna basın.
                </p>
              </div>

              <div className="pt-4 grid grid-cols-2 gap-3 w-full max-w-md text-left text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-800 mb-0.5">🖼️ Otomatik Kapak</div>
                  <div className="text-slate-500 text-[11px]">Başlığı içeren 1200x630 görsel çizilir</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-800 mb-0.5">🔗 Akıllı Linkleme</div>
                  <div className="text-slate-500 text-[11px]">Doğal iç ve dış kaynak linkleri eklenir</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-800 mb-0.5">📝 Taslak Olarak Düşer</div>
                  <div className="text-slate-500 text-[11px]">Admin &gt; Tüm Yazılar'dan düzenlenebilir</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-800 mb-0.5">🎯 Canlı SEO Skoru</div>
                  <div className="text-slate-500 text-[11px]">Başlık, slug, kelime ve başlık analizi</div>
                </div>
              </div>
            </div>
          )}

          {/* Batch History List */}
          {batchResults.length > 1 && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4 animate-fadeIn">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-600" />
                Bu Oturumda Üretilen Taslaklar ({batchResults.length})
              </h3>

              <div className="divide-y divide-slate-100">
                {batchResults.map((item, idx) => (
                  <div
                    key={idx}
                    className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/80 px-2 rounded-xl transition-colors"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {item.post.title}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {item.post.category} &bull; {item.wordCount} Kelime &bull; SEO Skoru: {item.seoScore}/100
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setLatestGenerated(item)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                      >
                        İncele
                      </button>
                      <Link
                        href={`/admin/posts/${item.post.id}`}
                        className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold"
                      >
                        Düzenle &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full Width Persistent Drafts Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
              <FolderOpen className="w-3.5 h-3.5" />
              Bekleyen Taslaklar Deposu
            </div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              Yapay Zeka ve Sistem Taslakları ({draftPosts.length})
            </h2>
            <p className="text-xs text-slate-500">
              Burada üretilen veya henüz yayınlanmamış tüm taslak yazıları görebilir, kapak görselini değiştirebilir veya tek tıkla canlıya alabilirsiniz.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={loadDrafts}
              disabled={isLoadingDrafts}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingDrafts ? 'animate-spin' : ''}`} />
              Yenile
            </button>
            <Link
              href="/admin/posts"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Tüm Yazıları Gör &rarr;
            </Link>
          </div>
        </div>

        {isLoadingDrafts ? (
          <div className="py-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />
            Taslaklar yükleniyor...
          </div>
        ) : draftPosts.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <div className="text-3xl">📭</div>
            <div className="text-sm font-bold text-slate-700">Şu anda bekleyen taslak yazı bulunmuyor.</div>
            <div className="text-xs text-slate-400">Yukarıdaki stüdyoyu kullanarak yeni konular üretmeye başlayabilirsiniz.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {draftPosts.map((post) => (
              <div
                key={post.id}
                className="bg-slate-50/80 rounded-2xl border border-slate-200 p-4 space-y-3 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-2.5">
                  {/* Thumbnail & Change Cover Trigger */}
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-800 group">
                    <img
                      src={post.featured_image || '/og.jpg'}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setEditingModalPost(post);
                        setModalCoverUrl(post.featured_image || '');
                      }}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-bold"
                    >
                      <Edit3 className="w-4 h-4" />
                      Kapağı Değiştir
                    </button>
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-semibold">
                      {post.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {post.excerpt || 'Özet bulunmuyor.'}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={isPublishingAction}
                      onClick={() => handleSetPublishStatus(post.id, 1)}
                      className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
                    >
                      Yayınla 🚀
                    </button>
                    <Link
                      href={`/admin/posts/${post.id}`}
                      className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold transition-colors"
                    >
                      Düzenle
                    </Link>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingModalPost(post);
                        setModalCoverUrl(post.featured_image || '');
                      }}
                      title="Kapak Görselini Değiştir"
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteDraft(post.id)}
                      title="Taslağı Sil"
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cover Edit Modal for Drafts */}
      {editingModalPost && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-slate-900">Kapak Görselini Değiştir</h3>
                <p className="text-xs text-slate-500 line-clamp-1">{editingModalPost.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingModalPost(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">
                Görsel URL'si Girin veya Bilgisayardan Yükleyin
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={modalCoverUrl}
                  onChange={(e) => setModalCoverUrl(e.target.value)}
                  placeholder="https://... veya /uploads/resim.webp"
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleUpdateCover(editingModalPost.id, modalCoverUrl, editingModalPost)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Uygula
                </button>
              </div>

              <div className="pt-2 border-t flex items-center gap-3">
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer transition-colors">
                  <Upload className="w-4 h-4 text-indigo-600" />
                  {isModalUploading ? 'Yükleniyor...' : 'Dosya Seç & Yükle'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUploadCover(editingModalPost.id, file, true);
                    }}
                  />
                </label>
                <span className="text-xs text-slate-400">WebP, PNG, JPG</span>
              </div>
            </div>

            {modalCoverUrl && (
              <div className="aspect-[16/9] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                <img
                  src={modalCoverUrl}
                  alt="Önizleme"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
