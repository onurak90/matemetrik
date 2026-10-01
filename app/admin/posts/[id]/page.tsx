'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Save, Upload, Eye, ExternalLink,
  Trash2, Globe, Image as ImageIcon, AlertCircle
} from 'lucide-react';
import WpEditor from '@/components/admin/WpEditor';
import SeoScoreAudit from '@/components/admin/SeoScoreAudit';
import AiQuickAssist from '@/components/admin/AiQuickAssist';
import { Post, Category } from '@/lib/types';
import { slugify } from '@/lib/utils';

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [category, setCategory] = useState('Matematik Blog');
  const [tags, setTags] = useState('');
  const [author, setAuthor] = useState('Matemetrik Eğitim & Matematik Zümresi');
  const [isPublished, setIsPublished] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    // Fetch categories
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data || []))
      .catch(console.error);

    // Fetch post
    fetch(`/api/posts/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Yazı bulunamadı');
        return res.json();
      })
      .then((data: Post) => {
        setPost(data);
        setTitle(data.title);
        setSlug(data.slug);
        setExcerpt(data.excerpt || '');
        setContent(data.content || '');
        setFeaturedImage(data.featured_image || '');
        setCategory(data.category || 'Matematik Blog');
        setTags(data.tags ? data.tags.join(', ') : '');
        setAuthor(data.author || 'Matemetrik Eğitim & Matematik Zümresi');
        setIsPublished(data.is_published);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params.id]);

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

    try {
      setIsSubmitting(true);
      const selectedCatObj = categories.find((c) => c.name === category);
      const parsedTags = tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const res = await fetch(`/api/posts/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug.trim(),
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
        throw new Error(error.error || 'Yazı güncellenemedi');
      }

      alert('Yazı başarıyla güncellendi!');
      router.push('/admin/posts');
    } catch (err: any) {
      alert(err.message || 'Bir hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Bu yazıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      return;
    }

    try {
      const res = await fetch(`/api/posts/${params.id}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/admin/posts');
      } else {
        alert('Yazı silinemedi');
      }
    } catch (err) {
      alert('Hata oluştu');
    }
  };

  if (isLoading) {
    return (
      <div className="p-16 text-center text-slate-400">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent mb-3" />
        <div className="text-sm font-medium">Yazı yükleniyor...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="p-16 text-center text-slate-500">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-800">Yazı Bulunamadı</h2>
        <Link href="/admin/posts" className="text-indigo-600 text-sm font-medium hover:underline mt-2 inline-block">
          &larr; Yazılar listesine dön
        </Link>
      </div>
    );
  }

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
              Yazıyı Düzenle
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              ID: #{post.id} &bull; Son Güncelleme: {new Date(post.updated_at).toLocaleDateString('tr-TR')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <Link
            href={`/post/${post.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Sitede Gör
          </Link>

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
            className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm shadow-indigo-600/30 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? 'Kaydediliyor...' : 'Güncelle'}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
            title="Yazıyı Sil"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left main column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Yazı Başlığı *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-3 text-lg font-semibold text-slate-900 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Kalıcı Bağlantı (URL Slug)
              </label>
              <div className="flex items-center text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-500">
                <span className="text-slate-400 select-none">/post/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(slugify(e.target.value))}
                  className="flex-1 bg-transparent text-slate-800 font-semibold focus:outline-none ml-1"
                />
              </div>
              {post.old_slug && post.old_slug !== slug && (
                <p className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
                  Eski Wix URL ({post.old_slug}) otomatik olarak bu adrese 301 yönlendirilmektedir.
                </p>
              )}
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
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Yazı İçeriği *
            </label>
            <WpEditor content={content} onChange={setContent} />
          </div>

          {/* Excerpt */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Yazı Özeti (Meta Açıklaması)
            </label>
            <textarea
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full p-3 text-sm text-slate-800 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Google Preview */}
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
                <span className="font-semibold text-slate-700 truncate">{slug}</span>
              </div>
              <div className="text-lg font-medium text-[#1a0dab] line-clamp-1">
                {title} | Matemetrik
              </div>
              <div className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {excerpt || content.replace(/<[^>]+>/g, ' ').slice(0, 150)}
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Category */}
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
                    alt={title}
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
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFeaturedImageUpload}
                    disabled={isUploadingImage}
                  />
                </label>
                <input
                  type="url"
                  placeholder="Görsel URL adresi"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
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
