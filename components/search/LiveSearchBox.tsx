'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  Loader2,
  BookOpen,
  FolderTree,
  Sparkles,
  ArrowRight,
  ChevronRight,
  FileText,
  Wrench,
  Eye,
  TrendingUp,
  CornerDownLeft,
} from 'lucide-react';

interface LiveSearchPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  category: string;
  category_slug: string;
  views: number;
  created_at: string;
}

interface LiveSearchCategory {
  name: string;
  slug: string;
  post_count: number;
}

interface LiveSearchTool {
  title: string;
  slug: string;
  description: string;
  badge: string;
}

interface LiveSearchData {
  posts: LiveSearchPost[];
  categories: LiveSearchCategory[];
  tools: LiveSearchTool[];
  totalCount: number;
}

interface LiveSearchBoxProps {
  variant?: 'hero' | 'navbar' | 'compact' | 'default';
  placeholder?: string;
  defaultValue?: string;
  onSelectResult?: () => void;
  className?: string;
  autoFocus?: boolean;
}

const POPULAR_SUGGESTIONS = [
  '10. Sınıf Ders Kitabı',
  '9. Sınıf Mantık & Kümeler',
  'Karne Görüşü Robotu',
  'Sınav Hazırlama Robotu',
  'Kitap Özetleri',
  'Pi Sayısı',
];

export default function LiveSearchBox({
  variant = 'default',
  placeholder,
  defaultValue = '',
  onSelectResult,
  className = '',
  autoFocus = false,
}: LiveSearchBoxProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<LiveSearchData>({
    posts: [],
    categories: [],
    tools: [],
    totalCount: 0,
  });
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Default placeholder text based on variant
  const defaultPlaceholder =
    placeholder ||
    (variant === 'hero'
      ? 'Örn: 10. sınıf ders kitabı çözümleri, pi sayısı, karne görüşü...'
      : variant === 'navbar'
      ? '468+ blog yazısı, konu anlatımı veya MEB cevaplarında ara...'
      : 'Ders kitabı, sınıf veya konu ara...');

  // Flattened list of navigable items for keyboard navigation
  const allNavigableItems = [
    ...data.tools.map((t) => ({ type: 'tool', url: t.slug })),
    ...data.categories.map((c) => ({ type: 'category', url: `/kategori/${c.slug}` })),
    ...data.posts.map((p) => ({ type: 'post', url: `/post/${p.slug}` })),
  ];

  // Fetch search results with debouncing
  useEffect(() => {
    const trimmed = query.trim();

    if (trimmed.length < 2) {
      setData({ posts: [], categories: [], tools: [], totalCount: 0 });
      setLoading(false);
      return;
    }

    setLoading(true);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}&limit=6`, {
          signal: controller.signal,
        });
        if (res.ok) {
          const result = await res.json();
          setData(result);
          setIsOpen(true);
          setActiveIndex(-1);
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Search fetch error:', err);
        }
      } finally {
        setLoading(false);
      }
    }, 180);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Handle Form Submit
  const handleFormSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    // If an item is actively highlighted with keyboard, navigate directly to it
    if (activeIndex >= 0 && activeIndex < allNavigableItems.length) {
      const target = allNavigableItems[activeIndex];
      setIsOpen(false);
      if (onSelectResult) onSelectResult();
      router.push(target.url);
      return;
    }

    setIsOpen(false);
    if (onSelectResult) onSelectResult();
    router.push(`/?q=${encodeURIComponent(trimmed)}`);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
      return;
    }

    if (!isOpen || allNavigableItems.length === 0) {
      if (e.key === 'Enter') {
        handleFormSubmit(e);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1 < allNavigableItems.length ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 >= 0 ? prev - 1 : allNavigableItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleFormSubmit();
    }
  };

  const handleSelectLink = () => {
    setIsOpen(false);
    if (onSelectResult) onSelectResult();
  };

  const handleClear = () => {
    setQuery('');
    setData({ posts: [], categories: [], tools: [], totalCount: 0 });
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (keyword: string) => {
    setQuery(keyword);
    inputRef.current?.focus();
  };

  // Helper to highlight search match
  const highlightMatch = (text: string, term: string) => {
    if (!term.trim()) return text;
    const regex = new RegExp(`(${term.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-indigo-100 text-indigo-900 font-bold px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Check if dropdown should show
  const showDropdown = isOpen && (query.trim().length >= 2 || loading);

  // Variant Styling Configs
  const isHero = variant === 'hero';
  const isNavbar = variant === 'navbar';
  const isCompact = variant === 'compact';

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Search Input Form */}
      <form onSubmit={handleFormSubmit} className="relative w-full">
        <div className="relative flex items-center">
          {/* Leading Icon */}
          <div className="absolute left-4 pointer-events-none flex items-center justify-center text-indigo-500">
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
            ) : (
              <Search className={`w-5 h-5 ${isHero ? 'text-indigo-500' : 'text-slate-400'}`} />
            )}
          </div>

          {/* Input field */}
          <input
            ref={inputRef}
            type="text"
            name="q"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.trim().length >= 2) {
                setIsOpen(true);
              }
            }}
            onFocus={() => {
              if (query.trim().length >= 2) {
                setIsOpen(true);
              }
            }}
            onKeyDown={handleKeyDown}
            autoFocus={autoFocus}
            autoComplete="off"
            placeholder={defaultPlaceholder}
            className={`w-full transition-all focus:outline-none ${
              isHero
                ? 'pl-12 pr-28 py-4 bg-white text-slate-900 rounded-2xl text-sm sm:text-base font-medium shadow-2xl focus:ring-4 focus:ring-indigo-500/40 placeholder:text-slate-400'
                : isNavbar
                ? 'pl-12 pr-24 py-3.5 bg-slate-50 text-slate-900 border border-slate-200 rounded-2xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-slate-400 shadow-inner'
                : isCompact
                ? 'pl-11 pr-24 py-3 bg-slate-800/90 text-white border border-slate-700 rounded-2xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400'
                : 'pl-12 pr-24 py-3.5 bg-white text-slate-900 border border-slate-200 rounded-2xl text-sm font-medium shadow-sm focus:ring-2 focus:ring-indigo-500'
            }`}
          />

          {/* Trailing actions (Clear + Submit) */}
          <div className="absolute right-2 flex items-center gap-1.5">
            {query.trim().length > 0 && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                title="Temizle"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              type="submit"
              className={`font-bold transition-all shadow-md flex items-center gap-1 ${
                isHero
                  ? 'px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm rounded-xl shadow-indigo-600/30'
                  : isNavbar
                  ? 'px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded-xl'
                  : 'px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded-xl'
              }`}
            >
              <span>Ara</span>
              <CornerDownLeft className="w-3 h-3 opacity-70 hidden sm:inline" />
            </button>
          </div>
        </div>
      </form>

      {/* Floating Dropdown Results */}
      {showDropdown && (
        <div className="absolute left-0 right-0 top-full mt-2.5 z-50 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-2xl shadow-slate-900/15 overflow-hidden divide-y divide-slate-100 animate-in fade-in slide-in-from-top-2 duration-150 text-left">
          {/* Loading Indicator */}
          {loading && (
            <div className="px-4 py-2.5 bg-indigo-50/50 flex items-center justify-between text-xs text-indigo-700 font-medium">
              <span className="flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Matemetrik arşivi taranıyor...
              </span>
              <span className="text-[11px] text-indigo-500 font-mono">468+ yazı</span>
            </div>
          )}

          {/* Results Container */}
          <div className="max-h-[68vh] overflow-y-auto divide-y divide-slate-100">
            {/* 1. SITE TOOLS / ROBOTS */}
            {data.tools.length > 0 && (
              <div className="p-2 bg-indigo-50/30">
                <div className="px-3 py-1 text-[11px] font-bold text-indigo-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-indigo-600" />
                  Özel Eğitim Araçları &amp; Robotlar
                </div>
                <div className="space-y-1 mt-1">
                  {data.tools.map((tool) => {
                    const itemGlobalIndex = data.tools.indexOf(tool);
                    const isActive = activeIndex === itemGlobalIndex;
                    return (
                      <Link
                        key={tool.slug}
                        href={tool.slug}
                        onClick={handleSelectLink}
                        className={`flex items-center justify-between p-2.5 rounded-xl transition-all ${
                          isActive
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'hover:bg-indigo-100/70 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                              isActive ? 'bg-white/20 text-white' : 'bg-indigo-600 text-white'
                            }`}
                          >
                            <Wrench className="w-4 h-4" />
                          </div>
                          <div className="truncate">
                            <div className="text-xs sm:text-sm font-bold truncate">
                              {tool.title}
                            </div>
                            <div
                              className={`text-[11px] truncate ${
                                isActive ? 'text-indigo-100' : 'text-slate-500'
                              }`}
                            >
                              {tool.description}
                            </div>
                          </div>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ml-2 ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-indigo-100 text-indigo-700'
                          }`}
                        >
                          {tool.badge}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. MATCHING CATEGORIES */}
            {data.categories.length > 0 && (
              <div className="p-2 bg-slate-50/50">
                <div className="px-3 py-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <FolderTree className="w-3 h-3 text-slate-400" />
                  Kategoriler &amp; Sınıf Seviyeleri
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-1">
                  {data.categories.map((cat) => {
                    const itemGlobalIndex = data.tools.length + data.categories.indexOf(cat);
                    const isActive = activeIndex === itemGlobalIndex;
                    return (
                      <Link
                        key={cat.slug}
                        href={`/kategori/${cat.slug}`}
                        onClick={handleSelectLink}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                          isActive
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'hover:bg-slate-100 text-slate-800'
                        }`}
                      >
                        <span className="text-xs font-semibold truncate">
                          {highlightMatch(cat.name, query)}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ml-2 shrink-0 ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-200/80 text-slate-600'
                          }`}
                        >
                          {cat.post_count} yazı
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. MATCHING POSTS */}
            {data.posts.length > 0 && (
              <div className="p-2">
                <div className="px-3 py-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3 h-3 text-slate-400" />
                    Bulunan Ders Çözümleri &amp; Yazılar
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    {data.totalCount} sonuçtan ilk {data.posts.length} tanesi
                  </span>
                </div>

                <div className="space-y-1 mt-1">
                  {data.posts.map((post) => {
                    const itemGlobalIndex =
                      data.tools.length + data.categories.length + data.posts.indexOf(post);
                    const isActive = activeIndex === itemGlobalIndex;

                    return (
                      <Link
                        key={post.id}
                        href={`/post/${post.slug}`}
                        onClick={handleSelectLink}
                        className={`flex items-center gap-3 p-2.5 rounded-xl transition-all group ${
                          isActive
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        {/* Thumbnail or Fallback */}
                        <div
                          className={`w-11 h-11 rounded-lg overflow-hidden shrink-0 flex items-center justify-center border ${
                            isActive
                              ? 'border-indigo-400 bg-indigo-700 text-white'
                              : 'border-slate-200 bg-slate-100 text-slate-400'
                          }`}
                        >
                          {post.featured_image ? (
                            <img
                              src={post.featured_image}
                              alt={post.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <FileText className="w-5 h-5" />
                          )}
                        </div>

                        {/* Text details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                                isActive
                                  ? 'bg-white/20 text-white'
                                  : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                              }`}
                            >
                              {post.category}
                            </span>
                            {post.views > 0 && (
                              <span
                                className={`text-[10px] flex items-center gap-0.5 ${
                                  isActive ? 'text-indigo-200' : 'text-slate-400'
                                }`}
                              >
                                <Eye className="w-2.5 h-2.5" />
                                {post.views}
                              </span>
                            )}
                          </div>
                          <div className="text-xs sm:text-sm font-semibold truncate leading-snug">
                            {highlightMatch(post.title, query)}
                          </div>
                          {post.excerpt && (
                            <div
                              className={`text-[11px] truncate mt-0.5 ${
                                isActive ? 'text-indigo-100' : 'text-slate-500'
                              }`}
                            >
                              {post.excerpt}
                            </div>
                          )}
                        </div>

                        {/* Arrow icon */}
                        <ChevronRight
                          className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                            isActive ? 'text-white' : 'text-slate-300'
                          }`}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. NO RESULTS STATE */}
            {!loading &&
              data.posts.length === 0 &&
              data.categories.length === 0 &&
              data.tools.length === 0 &&
              query.trim().length >= 2 && (
                <div className="p-6 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800">
                      "{query}" ile eşleşen sonuç bulunamadı
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Yazım hatası olup olmadığını kontrol edebilir veya aşağıdaki popüler konulardan birini deneyebilirsiniz:
                    </div>
                  </div>

                  {/* Suggestion tags */}
                  <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
                    {POPULAR_SUGGESTIONS.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleSuggestionClick(tag)}
                        className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-lg transition-colors border border-slate-200"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* Footer Bar: View All Results */}
          {query.trim().length >= 2 && (
            <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">
                {data.totalCount > 0 ? (
                  <span>
                    Toplam <strong className="text-slate-900">{data.totalCount}</strong> içerik bulundu
                  </span>
                ) : (
                  <span>Arama sonuçları</span>
                )}
              </span>

              <button
                type="button"
                onClick={() => handleFormSubmit()}
                className="inline-flex items-center gap-1.5 font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                <span>Tüm sonuçları gör</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
