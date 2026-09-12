import React from 'react';
import Link from 'next/link';
import { Search, Home, BookOpen, Sparkles, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto space-y-6">
        {/* Math Badge */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 font-black text-4xl flex items-center justify-center shadow-2xl">
          &pi;
        </div>

        <div className="space-y-2">
          <div className="text-7xl sm:text-9xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
            404
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Aradığınız Sayfa Koordinat Düzleminde Bulunamadı!
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
            Ulaşmaya çalıştığınız sayfa taşınmış, silinmiş veya kalıcı bağlantısı güncellenmiş olabilir.
          </p>
        </div>

        {/* Quick Search */}
        <form action="/" method="GET" className="relative max-w-md mx-auto">
          <input
            type="text"
            name="q"
            placeholder="Ders kitabı, sınıf veya konu ara..."
            className="w-full pl-4 pr-24 py-3 bg-slate-800/90 border border-slate-700 text-white rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors"
          >
            Ara
          </button>
        </form>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors shadow-lg"
          >
            <Home className="w-4 h-4 text-indigo-600" />
            Ana Sayfaya Dön
          </Link>
          <Link
            href="/karne-gorusu-ureticisi"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 font-bold text-xs rounded-xl transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Karne Görüşü Robotu
          </Link>
          <Link
            href="/kategori/10-sinif"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-colors"
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            10. Sınıf Çözümleri
          </Link>
        </div>
      </div>
    </div>
  );
}
