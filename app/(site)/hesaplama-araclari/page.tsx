'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calculator, Search, Sparkles, ArrowRight, Percent, Receipt,
  Tag, Scale, Superscript, SquareDot, Divide, ShieldCheck,
  Binary, Shuffle, Dice5, EqualNot, FunctionSquare, Variable,
  Triangle, Circle, Spline, BarChart2, CheckCircle2, BookOpen
} from 'lucide-react';
import { CALCULATORS_REGISTRY, CALCULATOR_CATEGORIES } from '@/lib/calculatorsData';

const iconMap: Record<string, any> = {
  Percent,
  Receipt,
  Tag,
  Scale,
  Superscript,
  SquareDot,
  Divide,
  ShieldCheck,
  Binary,
  Shuffle,
  Dice5,
  EqualNot,
  FunctionSquare,
  Variable,
  Triangle,
  Circle,
  Spline,
  BarChart2,
};

export default function HesaplamaAraclariHubPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const allTools = Object.values(CALCULATORS_REGISTRY);

  const filteredTools = useMemo(() => {
    return allTools.filter((tool) => {
      if (selectedCat !== 'all' && tool.category !== selectedCat) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchName = tool.name.toLowerCase().includes(q);
        const matchDesc = tool.shortDesc.toLowerCase().includes(q);
        const matchCat = tool.categoryName.toLowerCase().includes(q);
        const matchKeywords = tool.keywords.some((k) => k.toLowerCase().includes(q));
        return matchName || matchDesc || matchCat || matchKeywords;
      }
      return true;
    });
  }, [allTools, selectedCat, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.25),transparent_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Matemetrik Akıllı Matematik ve Geometri Robotları</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Matematik ve Geometri <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">Hesaplama Araçları</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Öğrenciler ve öğretmenler için adım adım açıklamalı, formüllü ve %100 doğru sonuç veren online matematik motorları. Yüzdeden integrale, Pisagordan ikinci dereceden denklemlere kadar tüm araçlar bir arada.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">{allTools.length}</div>
                <div className="text-[11px] text-slate-300 font-medium">Aktif Hesaplayıcı</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-black text-indigo-400">Adım Adım</div>
                <div className="text-[11px] text-slate-300 font-medium">Çözüm Basamakları</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-black text-purple-400">Sitene Ekle</div>
                <div className="text-[11px] text-slate-300 font-medium">Ücretsiz İframe Kodu</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">%100 Doğru</div>
                <div className="text-[11px] text-slate-300 font-medium">Öğrenci Dostu Tasarım</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Directory Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-8">
        {/* Search & Category Filter Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-md space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Live Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Hesaplamak istediğiniz konuyu arayın (Örn: Yüzde, EBOB, KDV, İkinci Dereceden Denklem, Pisagor)..."
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 px-2 py-1 bg-slate-200/60 rounded-lg"
                >
                  Temizle
                </button>
              )}
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl w-full md:w-auto overflow-x-auto">
              {CALCULATOR_CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCat(cat.key)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    selectedCat === cat.key
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Banner: Takdir Teşekkür Hesaplama */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500 via-yellow-500 to-indigo-600 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full text-white inline-block">
              ⭐ En Çok Aranan Okul Aracı
            </span>
            <h2 className="text-xl sm:text-2xl font-black">
              2024-2025 Takdir Teşekkür Hesaplama Robotu
            </h2>
            <p className="text-xs text-amber-100 max-w-xl">
              4, 5, 6, 7, 8, 9, 10, 11 ve 12. sınıf MEB haftalık ders saatleri ve ağırlıklı ortalamayla karne notunuzu anında hesaplayın.
            </p>
          </div>
          <Link
            href="/takdir-tesekkur-hesaplama"
            className="px-6 py-3 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-black text-xs transition-all shadow-md shrink-0 flex items-center gap-1.5"
          >
            <span>Hemen Hesapla</span>
            <ArrowRight className="w-4 h-4 text-indigo-600" />
          </Link>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between px-1">
          <div className="text-sm font-bold text-slate-700">
            Toplam <span className="text-indigo-600 font-black">{filteredTools.length}</span> Hesaplama Aracı Listeleniyor
          </div>
        </div>

        {/* Tools Grid */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-8 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <Calculator className="w-6 h-6" />
            </div>
            <div className="text-base font-bold text-slate-800">Aramanızla Eşleşen Hesaplama Aracı Bulunamadı</div>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Lütfen arama teriminizi kontrol edin veya filtreleri sıfırlayın.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCat('all');
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors"
            >
              Filtreleri Sıfırla
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => {
              const Icon = iconMap[tool.icon] || Calculator;
              return (
                <Link
                  key={tool.slug}
                  href={`/${tool.slug}`}
                  className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white flex items-center justify-center shadow-sm transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {tool.badge}
                      </span>
                    </div>

                    <div>
                      <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-1">
                        {tool.categoryName}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                        {tool.shortDesc}
                      </p>
                    </div>

                    {/* Formula snippet */}
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 font-mono text-[11px] text-slate-600 truncate">
                      {tool.formula}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700">
                    <span>Hemen Hesapla</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Bottom Educational Banner */}
        <section className="mt-16 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Öğrenciler İçin Matematik Hesaplama Rehberi
              </h2>
              <p className="text-xs text-slate-500">
                LGS, YKS, KPSS ve okul sınavlarında hız kazandıran pratik hesaplama stratejileri
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Formülü Anlayarak Uygulayın</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Her hesaplama aracımızın altında yer alan "Adım Adım Çözüm" adımlarını inceleyerek işlemlerin mantığını kavrayın.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Özel Üçgenler ve Sayı Kuralları</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pisagor bağıntısında 3-4-5, 5-12-13 gibi özel üçgenleri ezberlemek sınavda soru başına 45 saniye kazandırır.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Sitene Ekle Widget Desteği</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kendi blogunuzda veya eğitim sitenizde bu hesaplayıcıları ücretsiz iframe koduyla ziyaretçilerinize sunabilirsiniz.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
