'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Share2,
  Sparkles,
  Copy,
  Check,
  Download,
  Key,
  Layers,
  FileText,
  AlertCircle,
  Loader2,
  Settings,
  ExternalLink,
} from 'lucide-react';
import { Post } from '@/lib/types';
import InstagramCanvasSlides, { SlideData } from '@/components/admin/InstagramCanvasSlides';

function InstagramIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TwitterIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface SocialResponseData {
  topic: string;
  category: string;
  instagram: {
    caption: string;
    hashtags: string;
    slides: SlideData[];
  };
  twitter: {
    mainTweet: string;
    threadTweets: string[];
  };
}

export default function AdminSocialPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string>('');
  const [customTopic, setCustomTopic] = useState('');
  const [sourceMode, setSourceMode] = useState<'post' | 'custom'>('post');

  // Provider & API Keys state
  const [activeProvider, setActiveProvider] = useState<'gemini' | 'openai'>('gemini');
  const [geminiKey, setGeminiKey] = useState('');
  const [openaiKey, setOpenaiKey] = useState('');
  const [showKeySettings, setShowKeySettings] = useState(false);
  const [keysSaved, setKeysSaved] = useState(false);

  // Generation state
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<SocialResponseData | null>(null);
  const [usedProviderName, setUsedProviderName] = useState('');

  // Copy state
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Load posts and current API settings
  useEffect(() => {
    // Fetch posts for dropdown
    fetch('/api/posts?limit=100&all=true')
      .then((res) => res.json())
      .then((data) => {
        if (data.posts) {
          setPosts(data.posts);
          if (data.posts.length > 0) {
            setSelectedPostId(data.posts[0].id.toString());
          }
        }
      })
      .catch(console.error);

    // Fetch settings for API keys
    fetch('/api/settings')
      .then((res) => res.json())
      .then((settings) => {
        if (settings.gemini_api_key) setGeminiKey(settings.gemini_api_key);
        if (settings.openai_api_key) setOpenaiKey(settings.openai_api_key);
        if (settings.ai_provider) setActiveProvider(settings.ai_provider);
      })
      .catch(console.error);
  }, []);

  const handleSaveKeys = async () => {
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gemini_api_key: geminiKey,
          openai_api_key: openaiKey,
          ai_provider: activeProvider,
        }),
      });
      setKeysSaved(true);
      setTimeout(() => setKeysSaved(false), 3000);
    } catch {
      alert('Ayarlar kaydedilemedi.');
    }
  };

  const handleGenerate = async () => {
    setError('');
    setGenerating(true);

    try {
      const res = await fetch('/api/social/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: sourceMode === 'post' ? selectedPostId : undefined,
          customTopic: sourceMode === 'custom' ? customTopic : undefined,
          provider: activeProvider,
          geminiKey: geminiKey || undefined,
          openaiKey: openaiKey || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setResult(data.data);
        setUsedProviderName(data.provider);
      } else {
        setError(data.error || 'İçerik üretilirken bir hata oluştu.');
      }
    } catch (err: any) {
      setError('Bağlantı hatası oluştu: ' + (err.message || ''));
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 text-white rounded-xl shadow-md">
              <Share2 className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Sosyal Medya Stüdyosu
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Yazılarınızdan tek tıkla Instagram 3'lü kaydırmalı (carousel) görsel serisi, Instagram açıklaması ve Twitter (X) serisi üretin.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowKeySettings(!showKeySettings)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Key className="w-4 h-4 text-indigo-600" />
          <span>API Anahtarları &amp; AI Sağlayıcı</span>
        </button>
      </div>

      {/* API Keys Configuration Panel (Collapsible) */}
      {showKeySettings && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-900">
                AI Üretim Motoru &amp; API Anahtarı Yönetimi
              </h2>
            </div>
            {keysSaved && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Anahtarlar Kaydedildi
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Active Provider Selector */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Aktif AI Motoru:
              </label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:border-indigo-400 text-xs font-semibold">
                  <input
                    type="radio"
                    name="provider"
                    value="gemini"
                    checked={activeProvider === 'gemini'}
                    onChange={() => setActiveProvider('gemini')}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Google Gemini (3.5 Flash)</span>
                </label>
                <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:border-indigo-400 text-xs font-semibold">
                  <input
                    type="radio"
                    name="provider"
                    value="openai"
                    checked={activeProvider === 'openai'}
                    onChange={() => setActiveProvider('openai')}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>OpenAI ChatGPT (GPT-4o Mini)</span>
                </label>
              </div>
            </div>

            {/* Gemini Key Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Google Gemini API Key</label>
              <input
                type="password"
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="AQ.Ab8..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-[11px] text-slate-400">Ücretsiz ve hızlı Türkçe içerik üretimi.</p>
            </div>

            {/* OpenAI Key Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">OpenAI ChatGPT API Key</label>
              <input
                type="password"
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                placeholder="sk-proj-..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-[11px] text-slate-400">Yedek veya alternatif gelişmiş sosyal medya yazarı.</p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleSaveKeys}
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              API Ayarlarını Kaydet
            </button>
          </div>
        </div>
      )}

      {/* Source Selection Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-4">
          <button
            type="button"
            onClick={() => setSourceMode('post')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              sourceMode === 'post'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Sitedeki Yazılardan Seç ({posts.length})
            </span>
          </button>
          <button
            type="button"
            onClick={() => setSourceMode('custom')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              sourceMode === 'custom'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Özel Konu / Soru Gir
            </span>
          </button>
        </div>

        {sourceMode === 'post' ? (
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Sosyal Medyaya Uyarlanacak Blog Yazısı:
            </label>
            <select
              value={selectedPostId}
              onChange={(e) => setSelectedPostId(e.target.value)}
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-800"
            >
              {posts.map((post) => (
                <option key={post.id} value={post.id}>
                  [{post.category}] {post.title}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Konu Başlığı veya Matematik Püf Noktası:
            </label>
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="Örn: 10. Sınıf Fonksiyonlarda En Çok Karıştırılan 3 Kural"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-800"
            />
          </div>
        )}

        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Generate Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={generating}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2.5 disabled:opacity-50"
          >
            {generating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>3'lü Instagram &amp; Twitter Gönderisi Oluşturuluyor...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>3'lü Instagram Kaydırmalı Gönderi &amp; Twitter Tweetlerini Üret</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Display */}
      {result && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Status badge */}
          <div className="flex items-center justify-between p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-indigo-900">
                Konu: "{result.topic}"
              </span>
            </div>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-200 text-indigo-800 font-bold uppercase">
              Motor: {usedProviderName}
            </span>
          </div>

          {/* 1. INSTAGRAM CAROUSEL SLIDES (ZERO DISK USAGE CANVAS) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <InstagramIcon className="w-5 h-5 text-pink-600" />
                Instagram 3'lü Kaydırmalı Görsel Serisi (1080x1080 HD)
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                Doğrudan cihazınıza indirin, Instagram'da seri olarak paylaşın
              </span>
            </div>

            <InstagramCanvasSlides
              slides={result.instagram.slides}
              topic={result.topic}
            />
          </div>

          {/* 2. INSTAGRAM CAPTION & HASHTAGS */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <InstagramIcon className="w-4 h-4 text-pink-600" />
                Instagram Gönderi Açıklama Metni &amp; Etiketler
              </h3>
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(
                    `${result.instagram.caption}\n\n${result.instagram.hashtags}`,
                    'instagram'
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-bold rounded-xl transition-colors"
              >
                {copiedSection === 'instagram' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Kopyalandı!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Metni Kopyala</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed font-sans">
              {result.instagram.caption}
            </div>

            <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 text-xs text-indigo-700 font-mono">
              {result.instagram.hashtags}
            </div>
          </div>

          {/* 3. TWITTER (X) THREAD */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <TwitterIcon className="w-4 h-4 text-sky-500" />
                Twitter (X) Gönderi Dizisi &amp; Tweet Thread
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const fullTweet = `${result.twitter.mainTweet}\n\n${result.twitter.threadTweets.join('\n\n')}`;
                    copyToClipboard(fullTweet, 'twitter');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                >
                  {copiedSection === 'twitter' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Kopyalandı!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Thread'i Kopyala</span>
                    </>
                  )}
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(result.twitter.mainTweet)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                >
                  <span>X'te Paylaş</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Main tweet */}
            <div className="p-4 bg-sky-50/50 rounded-2xl border border-sky-200/80 text-xs sm:text-sm text-slate-900 leading-relaxed font-sans">
              <div className="text-[11px] font-bold text-sky-700 uppercase tracking-wider mb-1">
                Ana Tweet ({result.twitter.mainTweet.length} karakter)
              </div>
              {result.twitter.mainTweet}
            </div>

            {/* Thread tweets */}
            {result.twitter.threadTweets && result.twitter.threadTweets.length > 0 && (
              <div className="space-y-2 pt-1">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Devam Tweetleri (Thread):
                </div>
                {result.twitter.threadTweets.map((t, tIdx) => (
                  <div
                    key={tIdx}
                    className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed"
                  >
                    {t}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
