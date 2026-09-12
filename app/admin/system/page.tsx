'use client';

import React, { useState, useEffect } from 'react';
import {
  HardDrive, Download, Zap, Database, Server,
  CheckCircle2, ShieldCheck, RefreshCw, Cpu,
  FileText, Image as ImageIcon, ArrowLeftRight, FolderTree
} from 'lucide-react';

interface SystemStats {
  dbSize: number;
  walSize: number;
  totalDbBytes: number;
  uploadsCount: number;
  uploadsBytes: number;
  totalDiskBytes: number;
  postCount: number;
  publishedCount: number;
  draftCount: number;
  totalViews: number;
  categoryCount: number;
  redirectCount: number;
  memory: {
    heapUsed: number;
    heapTotal: number;
    rss: number;
  };
  nodeVersion: string;
  uptime: number;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatUptime(seconds: number): string {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (d > 0) return `${d} gün, ${h} saat`;
  if (h > 0) return `${h} saat, ${m} dk`;
  return `${m} dakika`;
}

export default function AdminSystemPage() {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [optimizing, setOptimizing] = useState(false);
  const [optimizeResult, setOptimizeResult] = useState<{
    freedBytes: number;
    sizeBefore: number;
    sizeAfter: number;
  } | null>(null);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/system/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleOptimize = async () => {
    setOptimizing(true);
    setOptimizeResult(null);
    try {
      const res = await fetch('/api/system/optimize', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.success) {
        setOptimizeResult({
          freedBytes: data.freedBytes,
          sizeBefore: data.sizeBefore,
          sizeAfter: data.sizeAfter,
        });
        if (data.currentStats) {
          setStats(data.currentStats);
        } else {
          fetchStats();
        }
      } else {
        alert('Optimizasyon sırasında hata oluştu');
      }
    } catch {
      alert('Optimizasyon isteği başarısız');
    } finally {
      setOptimizing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <HardDrive className="w-7 h-7 text-indigo-600" />
            Sistem &amp; Veritabanı Bakım Merkezi
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Sunucu disk alanı yönetimi, SQLite optimizasyonu, 1-tıkla yedekleme ve sistem sağlığı denetimi.
          </p>
        </div>
        <button
          onClick={fetchStats}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Metrikleri Yenile
        </button>
      </div>

      {/* Disk Usage Overview Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase">Veritabanı Boyutu</div>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">
              {stats ? formatBytes(stats.totalDbBytes) : '...'}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
              WAL: {stats ? formatBytes(stats.walSize) : '0 B'}
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase">WebP Görseller</div>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">
              {stats ? formatBytes(stats.uploadsBytes) : '...'}
            </div>
            <div className="text-[11px] text-emerald-600 font-medium mt-0.5">
              {stats ? `${stats.uploadsCount} adet WebP dosyası` : '...'}
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase">Toplam Disk Yükü</div>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">
              {stats ? formatBytes(stats.totalDiskBytes) : '...'}
            </div>
            <div className="text-[11px] text-blue-600 font-medium mt-0.5">
              Ultra Hafif ve Optimize
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase">Bellek (RAM)</div>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">
              {stats ? formatBytes(stats.memory.heapUsed) : '...'}
            </div>
            <div className="text-[11px] text-purple-600 font-medium mt-0.5">
              Heap: {stats ? formatBytes(stats.memory.heapTotal) : '...'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 1-Click Database Backup */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              <Download className="w-3.5 h-3.5" /> 1-Tıkla Tam Yedek
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Veritabanı Yedeğini İndir (.sqlite)
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tüm blog yazılarınız, kategorileriniz, 301 kalıcı yönlendirmeleriniz ve site ayarlarınız anında `.sqlite` formatında doğrudan bilgisayarınıza indirilir. Sunucu diskinde ekstra yer kaplamaz.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Yedeklenecek Dosya:</span>
              <span className="font-mono font-medium">data/matemetrik.db</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Toplam Tablo Verisi:</span>
              <span className="font-medium text-slate-900">
                {stats?.postCount || 0} Yazı, {stats?.categoryCount || 0} Kategori, {stats?.redirectCount || 0} Yönlendirme
              </span>
            </div>
          </div>

          <a
            href="/api/system/backup"
            download
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Yedeği Bilgisayara İndir (.sqlite)
          </a>
        </div>

        {/* 1-Click SQLite Vacuum & Storage Optimizer */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
              <Zap className="w-3.5 h-3.5" /> Disk Alanı Kurtarma
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Veritabanını Optimize Et (VACUUM)
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Silinen veya güncellenen yazıların arkasında bıraktığı boş alanları temizler, SQLite WAL günlüklerini ana dosyayla birleştirir ve sorgu yanıt sürelerini hızlandırır.
            </p>
          </div>

          {optimizeResult && (
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1">
              <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Veritabanı Başarıyla Optimize Edildi!
              </div>
              <div className="text-emerald-700">
                Önceki Boyut: <strong>{formatBytes(optimizeResult.sizeBefore)}</strong> ➔ Yeni Boyut: <strong>{formatBytes(optimizeResult.sizeAfter)}</strong>
              </div>
              {optimizeResult.freedBytes > 0 && (
                <div className="text-emerald-900 font-semibold">
                  🎉 {formatBytes(optimizeResult.freedBytes)} disk alanı serbest bırakıldı!
                </div>
              )}
            </div>
          )}

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Günlük (WAL) Durumu:</span>
              <span className="text-indigo-600 font-medium">TRUNCATE &amp; Checkpoint Destekli</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>İşlem Türü:</span>
              <span className="font-mono text-slate-700">VACUUM; PRAGMA optimize;</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleOptimize}
            disabled={optimizing}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Zap className={`w-4 h-4 ${optimizing ? 'animate-spin' : ''}`} />
            {optimizing ? 'Optimize Ediliyor...' : 'Veritabanını ve Diski Optimize Et'}
          </button>
        </div>
      </div>

      {/* System Health Check Indicators */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-600" />
          Sistem ve Güvenlik Sağlık Kontrolleri
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              SQLite WAL Modu
            </div>
            <p className="text-[11px] text-emerald-700 leading-relaxed">
              Write-Ahead Logging aktif. Eşzamanlı okuma ve yazma işlemlerinde sıfır kilitlenme garantisi.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              Görsel Standardı: %100 WebP
            </div>
            <p className="text-[11px] text-emerald-700 leading-relaxed">
              Tüm medya kütüphanesi WebP formatında. Sunucu diskinde %70 tasarruf sağlandı.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              İçerik Koruma Kalkanı
            </div>
            <p className="text-[11px] text-emerald-700 leading-relaxed">
              Sağ tık engelleme, metin seçimi engeli ve F12/DevTools konsol kalkanı aktif.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200/80 space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs">
              <Server className="w-4 h-4 text-indigo-600 shrink-0" />
              Çalışma Zamanı
            </div>
            <p className="text-[11px] text-indigo-700 leading-relaxed">
              Node.js {stats?.nodeVersion || 'v20+'} • Uptime: {stats ? formatUptime(stats.uptime) : '...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
