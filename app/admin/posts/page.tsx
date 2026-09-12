'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search, Filter, Plus, Edit, Trash2, ExternalLink,
  Eye, Calendar, ChevronLeft, ChevronRight, AlertCircle, Sparkles
} from 'lucide-react';
import { Post, Category } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [bulkLoading, setBulkLoading] = useState(false);

  const toggleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === posts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(posts.map((p) => p.id));
    }
  };

  const handleBulkAction = async (action: 'publish' | 'draft' | 'delete') => {
    if (selectedIds.length === 0) return;
    if (action === 'delete') {
      if (!confirm(`Seçilen ${selectedIds.length} yazıyı kalıcı olarak silmek istediğinizden emin misiniz?`)) {
        return;
      }
    }
    setBulkLoading(true);
    try {
      const res = await fetch('/api/posts/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds, action }),
      });
      if (res.ok) {
        setSelectedIds([]);
        fetchPosts();
      } else {
        alert('Toplu işlem gerçekleştirilemedi.');
      }
    } catch {
      alert('Bir hata oluştu.');
    } finally {
      setBulkLoading(false);
    }
  };

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '15',
        all: 'true',
      });
      if (search) params.append('search', search);
      if (selectedCategory) params.append('category', selectedCategory);

      const res = await fetch(`/api/posts?${params.toString()}`);
      const data = await res.json();
      setPosts(data.posts || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data || []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPosts();
    }, 200);
    return () => clearTimeout(timer);
  }, [page, search, selectedCategory]);

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`"${title}" başlıklı yazıyı silmek istediğinizden emin misiniz?`)) {
      return;
    }

    try {
      setDeletingId(id);
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        setTotal((prev) => prev - 1);
      } else {
        alert('Yazı silinemedi');
      }
    } catch (err) {
      alert('Bir hata oluştu');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Tüm Blog Yazıları
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Toplam <strong className="text-slate-800">{total}</strong> blog yazısı mevcut
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/ai-writer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-indigo-600/20"
          >
            <Sparkles className="w-4 h-4" />
            AI ile Yazı Üret ⚡
          </Link>
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Manuel Yazı Ekle
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Başlık veya içerikte ara..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
        </div>

        <div className="w-full md:w-64">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(1);
            }}
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-700 font-medium"
          >
            <option value="">Tüm Kategoriler</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name} ({c.post_count || 0})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bulk Actions Toolbar */}
      {selectedIds.length > 0 && (
        <div className="bg-indigo-900 text-white px-5 py-3 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold">
              {selectedIds.length} yazı seçildi
            </span>
            <button
              onClick={() => setSelectedIds([])}
              className="text-xs text-indigo-300 hover:text-white underline ml-1"
            >
              Seçimi Temizle
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={bulkLoading}
              onClick={() => handleBulkAction('publish')}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
            >
              <span>✓ Yayına Al</span>
            </button>
            <button
              disabled={bulkLoading}
              onClick={() => handleBulkAction('draft')}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
            >
              <span>⏸ Taslağa Çevir</span>
            </button>
            <button
              disabled={bulkLoading}
              onClick={() => handleBulkAction('delete')}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Sil</span>
            </button>
          </div>
        </div>
      )}

      {/* Posts Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-slate-400">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent mb-3" />
            <div className="text-sm font-medium">Yazılar yükleniyor...</div>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <div className="text-sm font-medium">Aramanıza uygun yazı bulunamadı.</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={posts.length > 0 && selectedIds.length === posts.length}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      title="Tümünü Seç"
                    />
                  </th>
                  <th className="py-3.5 px-4">Başlık &amp; URL</th>
                  <th className="py-3.5 px-4">Kategori</th>
                  <th className="py-3.5 px-4 text-center">Görüntülenme</th>
                  <th className="py-3.5 px-4">Tarih</th>
                  <th className="py-3.5 px-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {posts.map((post) => {
                  const isSelected = selectedIds.includes(post.id);
                  return (
                    <tr
                      key={post.id}
                      className={`transition-colors ${
                        isSelected ? 'bg-indigo-50/60' : 'hover:bg-slate-50/80'
                      }`}
                    >
                      <td className="py-3.5 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectOne(post.id)}
                          className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                      </td>
                      <td className="py-3.5 px-4 max-w-md">
                      <div className="flex items-center gap-2">
                        {post.is_published === 0 ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 shrink-0">
                            Taslak
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                            Yayında
                          </span>
                        )}
                        <div className="font-semibold text-slate-900 line-clamp-1">
                          <Link
                            href={`/admin/posts/${post.id}`}
                            className="hover:text-indigo-600 transition-colors"
                          >
                            {post.title}
                          </Link>
                        </div>
                      </div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5 truncate">
                        /post/{post.slug}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {post.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-xs text-slate-600 font-medium">
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        {post.views}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-xs text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {formatDate(post.created_at)}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
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
                        <button
                          type="button"
                          onClick={() => handleDelete(post.id, post.title)}
                          disabled={deletingId === post.id}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors disabled:opacity-50"
                          title="Sil"
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

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Sayfa <strong className="text-slate-800">{page}</strong> / {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Önceki
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1"
            >
              Sonraki <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
