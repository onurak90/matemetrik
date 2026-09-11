'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeftRight, Plus, Trash2, Search, ExternalLink,
  CheckCircle, AlertTriangle, ShieldCheck, Globe
} from 'lucide-react';
import { Redirect } from '@/lib/types';

export default function AdminSeoPage() {
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sourcePath, setSourcePath] = useState('');
  const [targetPath, setTargetPath] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchRedirects = async () => {
    try {
      const res = await fetch('/api/redirects');
      const data = await res.json();
      setRedirects(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRedirects();
  }, []);

  const handleAddRedirect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourcePath.trim() || !targetPath.trim()) return;

    try {
      setIsSubmitting(true);
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
    } catch (err) {
      alert('Hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu yönlendirmeyi silmek istediğinizden emin misiniz?')) return;
    try {
      const res = await fetch(`/api/redirects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setRedirects((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (err) {
      alert('Hata oluştu');
    }
  };

  const filteredRedirects = redirects.filter(
    (r) =>
      r.source_path.toLowerCase().includes(search.toLowerCase()) ||
      r.target_path.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          SEO & 301 Kalıcı Yönlendirmeler
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Google sıralamalarını kaybetmemek için eski Wix URL'leri yeni Next.js URL'lerine kalıcı olarak yönlendirilir.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase">Aktif 301 Kuralı</div>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">{redirects.length}</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase">Dinamik Sitemap</div>
            <Link
              href="/sitemap.xml"
              target="_blank"
              className="text-sm font-semibold text-indigo-600 hover:underline flex items-center gap-1 mt-1"
            >
              /sitemap.xml <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase">Robots Dosyası</div>
            <Link
              href="/robots.txt"
              target="_blank"
              className="text-sm font-semibold text-amber-600 hover:underline flex items-center gap-1 mt-1"
            >
              /robots.txt <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Redirect Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit space-y-4">
          <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-600" />
            Yeni Yönlendirme Ekle
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
              disabled={isSubmitting}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Ekleniyor...' : '301 Kuralını Kaydet'}
            </button>
          </form>
        </div>

        {/* Redirects Table */}
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

          <div className="max-h-[600px] overflow-y-auto divide-y divide-slate-100">
            {isLoading ? (
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
                    onClick={() => handleDelete(r.id)}
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
  );
}
