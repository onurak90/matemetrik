'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Save, Upload, Eye, Search,
  CheckCircle, Globe, Image as ImageIcon, Sparkles
} from 'lucide-react';
import WpEditor from '@/components/admin/WpEditor';
import SeoScoreAudit from '@/components/admin/SeoScoreAudit';
import AiQuickAssist from '@/components/admin/AiQuickAssist';
import { Category } from '@/lib/types';
import { slugify } from '@/lib/utils';

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [customSlug, setCustomSlug] = useState(false);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [category, setCategory] = useState('Matematik Blog');
  const [tags, setTags] = useState('');
  const [author, setAuthor] = useState('Onur AK');
  const [isPublished, setIsPublished] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data || []))
      .catch(console.error);
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!customSlug) {
      setSlug(slugify(val));
    }
  };

  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setFeaturedImage(data.url);
      }
    } catch (err) {
      alert('Görsel yüklenirken hata oluştu');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Lütfen bir başlık girin');
      return;
    }
    if (!content.trim()) {
      alert('Lütfen içerik girin');
      return;
    }

    try {
      setIsSubmitting(true);
      const postSlug = slug.trim() || slugify(title);
      const selectedCatObj = categories.find((c) => c.name === category);

      const parsedTags = tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          slug: postSlug,
          excerpt: excerpt.trim(),
          content,
          featured_image: featuredImage,
          category,
          category_slug: selectedCatObj?.slug || slugify(category),
          tags: parsedTags,
          author,
          is_published: isPublished,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Yazı kaydedilemedi');
      }

      router.push('/admin/posts');
    } catch (err: any) {
      alert(err.message || 'Bir hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts"
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Yeni Blog Yazısı
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              WordPress tarzı zengin editör ile yeni bir içerik oluşturun
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={isPublished}
            onChange={(e) => setIsPublished(Number(e.target.value))}
            className="px-3 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
          >
            <option value={1}>Yayında</option>
            <option value={0}>Taslak</option>
          </select>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm shadow-indigo-600/30 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? 'Kaydediliyor...' : 'Yazıyı Yayınla'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left main column (Editor) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title Input */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Yazı Başlığı *
              </label>
              <input
                type="text"
                placeholder="Örn: 10. Sınıf Matematik 2. Dönem Yazılı Soruları ve Çözümleri"
                value={title}
                onChange={handleTitleChange}
                required
                className="w-full px-4 py-3 text-lg font-semibold text-slate-900 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-300"
              />
            </div>

            {/* URL Slug Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Kalıcı Bağlantı (URL Slug)
              </label>
              <div className="flex items-center text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-500">
                <span className="text-slate-400 select-none">/post/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setCustomSlug(true);
                  }}
                  placeholder="yazi-basligi"
                  className="flex-1 bg-transparent text-slate-800 font-semibold focus:outline-none ml-1"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                SEO için Türkçe karakterler otomatik olarak standart URL formatına çevrilir.
              </p>
            </div>
          </div>

          {/* Live SEO Score Audit Widget */}
          <SeoScoreAudit
            title={title}
            slug={slug}
            excerpt={excerpt}
            content={content}
            featuredImage={featuredImage}
          />

          {/* AI Quick Assistant Toolbar */}
          <AiQuickAssist
            title={title}
            content={content}
            onApplyMeta={(newMeta) => setExcerpt(newMeta)}
            onAppendContent={(extraHtml) => setContent((prev) => prev + '\n' + extraHtml)}
          />

          {/* WordPress Rich Text Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Yazı İçeriği *
              </label>
              <span className="text-xs text-indigo-600 font-medium">
                Görsel, tablo, başlık ve liste destekli
              </span>
            </div>
            <WpEditor content={content} onChange={setContent} />
          </div>

          {/* Excerpt / Meta Description */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Yazı Özeti (Meta Açıklaması)
            </label>
            <textarea
              rows={3}
              placeholder="Yazının kısa bir özeti. Arama motorlarında (Google) snippet olarak görüntülenir..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full p-3 text-sm text-slate-800 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Live Google Search Preview */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Globe className="w-4 h-4 text-indigo-600" />
              Google SERP Canlı Önizleme
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1 font-sans">
              <div className="text-xs text-slate-600 truncate flex items-center gap-1">
                <span>https://www.matemetrik.com</span>
                <span className="text-slate-400">&gt;</span>
                <span>post</span>
                <span className="text-slate-400">&gt;</span>
                <span className="font-semibold text-slate-700 truncate">{slug || 'yazi-url'}</span>
              </div>
              <div className="text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer line-clamp-1">
                {title || 'Yazı Başlığı | Matemetrik'}
              </div>
              <div className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {excerpt || content.replace(/<[^>]+>/g, ' ').slice(0, 150) || 'Matemetrik üzerinde matematik dersleri, MEB ders kitabı cevapları ve sınav hazırlık rehberleri...'}
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar options */}
        <div className="space-y-6">
          {/* Category Selector */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Kategori
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 text-sm font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map((c) => (
                <option key={c.slug} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Featured Image */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Öne Çıkan Görsel
            </label>

            {featuredImage ? (
              <div className="space-y-3">
                <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100">
                  <img
                    src={featuredImage}
                    alt="Öne çıkan görsel"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setFeaturedImage('')}
                  className="text-xs text-rose-600 hover:underline font-medium block"
                >
                  Görseli Kaldır
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <label className="border-2 border-dashed border-slate-200 hover:border-indigo-500 rounded-xl p-6 text-center cursor-pointer block transition-colors bg-slate-50/50">
                  <ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <span className="text-xs font-semibold text-slate-600 block">
                    {isUploadingImage ? 'Yükleniyor...' : 'Görsel Seç veya Yükle'}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    PNG, JPG, WEBP formatları
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFeaturedImageUpload}
                    disabled={isUploadingImage}
                  />
                </label>

                <div>
                  <input
                    type="url"
                    placeholder="Veya görsel URL adresi yapıştırın"
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Etiketler (Virgülle Ayırın)
            </label>
            <input
              type="text"
              placeholder="matematik, meb, 10. sınıf, sınav"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Author */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Yazar
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
