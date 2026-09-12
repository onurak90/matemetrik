'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, FileText, PlusCircle, FolderTree,
  Image, ArrowLeftRight, Settings, ExternalLink,
  Menu, X, ShieldCheck, BarChart3, Megaphone, Sparkles,
  Share2, LogOut, HardDrive, MessageSquare
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingCommentsCount, setPendingCommentsCount] = useState<number>(0);

  React.useEffect(() => {
    fetch('/api/comments?filter=pending')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPendingCommentsCount(data.length);
      })
      .catch(() => {});
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      window.location.href = '/yonetim';
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'AI Blog Stüdyosu ⚡', href: '/admin/ai-writer', icon: Sparkles },
    { name: 'Sosyal Medya Stüdyosu 📱', href: '/admin/social', icon: Share2 },
    { name: 'Tüm Yazılar', href: '/admin/posts', icon: FileText, exact: true },
    { name: 'Yeni Yazı Ekle', href: '/admin/posts/new', icon: PlusCircle },
    { name: 'Yorumlar 💬', href: '/admin/comments', icon: MessageSquare, badge: pendingCommentsCount },
    { name: 'Raporlar & Analitik', href: '/admin/reports', icon: BarChart3 },
    { name: 'Kategoriler', href: '/admin/categories', icon: FolderTree },
    { name: 'Medya Kütüphanesi', href: '/admin/media', icon: Image },
    { name: 'Reklam Yönetimi', href: '/admin/ads', icon: Megaphone },
    { name: 'SEO & 301 Yönlendirme', href: '/admin/seo', icon: ArrowLeftRight },
    { name: 'Sistem & Yedekleme 💾', href: '/admin/system', icon: HardDrive },
    { name: 'Ayarlar', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex admin-mode">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/30">
              M
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white block">
                Matemetrik
              </span>
              <span className="text-xs text-indigo-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Yönetim Paneli
              </span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action Button */}
        <div className="px-4 pt-4">
          <Link
            href="/admin/posts/new"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium text-sm transition-all shadow-md shadow-indigo-600/20"
          >
            <PlusCircle className="w-4 h-4" />
            Yeni Yazı Ekle
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
            İçerik Yönetimi
          </div>
          {navigation.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon
                  className={`w-4 h-4 ${active ? 'text-indigo-400' : 'text-slate-400'}`}
                />
                <span className="flex-1 truncate">{item.name}</span>
                {Boolean(item.badge && item.badge > 0) && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold animate-pulse">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Profile / Quick Info */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              Sitede Önizle
            </span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 border border-slate-700">
              Canlı
            </span>
          </Link>

          <div className="flex items-center justify-between gap-2 px-2 pt-2 border-t border-slate-800/80">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center font-bold text-xs text-indigo-300 shrink-0">
                OA
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white truncate">Onur AK</div>
                <div className="text-[10px] text-slate-400 truncate">Yönetici</div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
              title="Güvenli Çıkış Yap"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-sm font-medium text-slate-500">
              <span className="text-slate-900 font-semibold">Admin</span> &gt;{' '}
              {pathname === '/admin' ? 'Genel Bakış' : pathname.replace('/admin/', '').toUpperCase()}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Siteyi Ziyaret Et
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors"
              title="Oturumu Kapat"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
