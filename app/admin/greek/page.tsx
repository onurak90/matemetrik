'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Globe, BookOpen, Newspaper, RefreshCw, ExternalLink,
  CheckCircle2, AlertCircle, ArrowUpRight, Search, FileText,
  Layers, Sparkles
} from 'lucide-react';
import { GREEK_BOOKS, GREEK_LEVELS } from '@/lib/greekEducationData';

interface GreekNews {
  id: number;
  title: string;
  slug: string;
  source_site: string;
  pub_date: string;
  category: string;
  views: number;
}

export default function AdminGreekDashboardPage() {
  const [news, setNews] = useState<GreekNews[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoadingNews(true);
    try {
      const res = await fetch('/api/gr/news?limit=25');
      const data = await res.json();
      if (data.success && Array.isArray(data.news)) {
        setNews(data.news);
      }
    } catch {
      // ignore
    } finally {
      setLoadingNews(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSyncNow = async () => {
    setSyncing(true);
    setSyncStatus('Yunanistan haber kaynakları (esos.gr & alfavita.gr) taranıyor...');
    try {
      const res = await fetch('/api/gr/news?sync=1');
      const data = await res.json();
      if (data.success) {
        setSyncStatus(`Başarıyla tamamlandı! ${data.syncResult?.added || 0} yeni haber eklendi.`);
        await fetchNews();
      } else {
        setSyncStatus(`Hata: ${data.error || 'Tarama başarısız'}`);
      }
    } catch {
      setSyncStatus('Bağlantı hatası oluştu.');
    } finally {
      setSyncing(false);
      setTimeout(() => setSyncStatus(null), 5000);
    }
  };

  const totalPagesCount = GREEK_BOOKS.reduce((acc, b) => acc + b.pages.length, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 mb-1">
            <Globe className="w-3.5 h-3.5" />
            <span>Yunanistan Eğitim Platformu (matemetrik.gr / /gr)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            🇬🇷 Yunanistan Kitapları &amp; Haber Masası
          </h1>
          <p className="text-slate-500 text-sm">
            Yunanistan ders kitapları, sayfa çözümleri ve 2 saatte bir otomatik güncellenen okul haberleri bu panelden izlenir.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/gr"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            <span>/gr Canlı Önizle</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleSyncNow}
            disabled={syncing}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold transition-all disabled:opacity-50 shadow-md shadow-blue-600/20"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Taranıyor...' : 'Haberleri Şimdi Tara (2 Saatlik Robot)'}</span>
          </button>
        </div>
      </div>

      {syncStatus && (
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{syncStatus}</span>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="text-slate-400 text-xs font-bold uppercase">Toplam Kitap</div>
          <div className="text-2xl font-black text-slate-900">{GREEK_BOOKS.length} Ders Kitabı</div>
          <div className="text-[11px] text-emerald-600 font-bold">Δημοτικό &bull; Γυμνάσιο &bull; Λύκειο</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="text-slate-400 text-xs font-bold uppercase">Hazır Sayfa Çözümü</div>
          <div className="text-2xl font-black text-blue-600">{totalPagesCount} Sayfa</div>
          <div className="text-[11px] text-slate-500">Adım adım doğrulanmış çözüm</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="text-slate-400 text-xs font-bold uppercase">Çekilen Yunanistan Haberi</div>
          <div className="text-2xl font-black text-amber-600">{news.length} Haber</div>
          <div className="text-[11px] text-slate-500">esos.gr &amp; alfavita.gr</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="text-slate-400 text-xs font-bold uppercase">Dil İzolasyonu</div>
          <div className="text-2xl font-black text-purple-600">%100 Yunanca</div>
          <div className="text-[11px] text-slate-500">TR listelerinde görünmez</div>
        </div>
      </div>

      {/* Quick Level Links */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-extrabold text-slate-900">
          Yunanistan Kademeleri &amp; Canlı Bağlantılar
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-black text-blue-700 uppercase">ΔΗΜΟΤΙΚΟ (İLKOKUL)</div>
            <p className="text-xs text-slate-600">Α' - ΣΤ' Δημοτικού: Μαθηματικά, Γλώσσα, Φυσικά, Ιστορία.</p>
            <Link
              href="/gr/dimotiko"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline pt-1"
            >
              <span>/gr/dimotiko</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-black text-indigo-700 uppercase">ΓΥΜΝΑΣΙΟ (ORTAOKUL)</div>
            <p className="text-xs text-slate-600">Α' - Γ' Γυμνασίου: Μαθηματικά, Αρχαία, Φυσική, Χημεία.</p>
            <Link
              href="/gr/gymnasio"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline pt-1"
            >
              <span>/gr/gymnasio</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-black text-purple-700 uppercase">ΛΥΚΕΙΟ (LİSE)</div>
            <p className="text-xs text-slate-600">Α' - Γ' Λυκείου: Άλγεβρα, Γεωμετρία &amp; Πανελλαδικές.</p>
            <Link
              href="/gr/lykeio"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 hover:underline pt-1"
            >
              <span>/gr/lykeio</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Crawled Greek News List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              Son Çekilen Yunanistan Haberleri
            </h2>
            <p className="text-xs text-slate-500">
              Bu haberler /gr anasayfasındaki slider ve haberler bölümünde 2 saatte bir otomatik gösterilir.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-400">
            {news.length} Kayıt
          </span>
        </div>

        {loadingNews ? (
          <div className="py-12 text-center text-slate-400 text-xs">Haberler yükleniyor...</div>
        ) : news.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            Henüz haber kaydedilmemiş. Yukarıdaki &quot;Haberleri Şimdi Tara&quot; butonuna basabilirsiniz.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold">
                  <th className="py-2.5 px-3">Kaynak</th>
                  <th className="py-2.5 px-3">Başlık</th>
                  <th className="py-2.5 px-3">Kategori</th>
                  <th className="py-2.5 px-3">Tarih</th>
                  <th className="py-2.5 px-3 text-right">Görüntüle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {news.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-blue-600">{item.source_site}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900 max-w-md truncate">
                      {item.title}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500">{item.category}</td>
                    <td className="py-2.5 px-3 text-slate-400">{item.pub_date}</td>
                    <td className="py-2.5 px-3 text-right">
                      <Link
                        href={`/gr/eidiseis/${item.slug}`}
                        target="_blank"
                        className="text-blue-600 font-bold hover:underline"
                      >
                        Oku &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
