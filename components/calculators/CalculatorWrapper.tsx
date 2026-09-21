'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles, Code, Check, Copy, ChevronRight, BookOpen,
  ArrowRight, Share2, HelpCircle
} from 'lucide-react';
import { CALCULATORS_REGISTRY, CalculatorMeta } from '@/lib/calculatorsData';

interface CalculatorWrapperProps {
  meta: CalculatorMeta;
  children: React.ReactNode;
  stepExplanation?: React.ReactNode;
  relatedSlugs?: string[];
}

export default function CalculatorWrapper({
  meta,
  children,
  stepExplanation,
  relatedSlugs = [],
}: CalculatorWrapperProps) {
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);

  const embedCode = `<iframe src="https://www.matemetrik.com/${meta.slug}" width="100%" height="700" frameborder="0" style="border:1px solid #e2e8f0; border-radius:16px;"></iframe>\n<p style="font-size:12px; color:#64748b; margin-top:8px;">Hesaplama aracı <a href="https://www.matemetrik.com/${meta.slug}" target="_blank" style="color:#4f46e5; text-decoration:underline;">Matemetrik ${meta.name} Robotu</a> tarafından sağlanmıştır.</p>`;

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(embedCode);
    setEmbedCopied(true);
    setTimeout(() => setEmbedCopied(false), 2500);
  };

  const relatedTools = relatedSlugs.length > 0
    ? relatedSlugs.map((s) => CALCULATORS_REGISTRY[s]).filter(Boolean)
    : Object.values(CALCULATORS_REGISTRY)
        .filter((c) => c.slug !== meta.slug && c.category === meta.category)
        .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 overflow-x-auto">
            <Link href="/" className="hover:text-indigo-600 transition-colors shrink-0">
              Ana Sayfa
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link href="/hesaplama-araclari" className="hover:text-indigo-600 transition-colors shrink-0">
              Hesaplama Araçları
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-indigo-600 font-bold truncate">
              {meta.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-white via-indigo-50/20 to-slate-50/50 border-b border-slate-200/80 pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold border border-indigo-200">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>{meta.categoryName} • {meta.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {meta.name}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                {meta.shortDesc}
              </p>
            </div>

            {/* Quick Action Badges */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setShowEmbedModal(true)}
                className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 shadow-sm transition-colors flex items-center gap-2"
              >
                <Code className="w-4 h-4 text-indigo-600" />
                <span>Sitene Ekle</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-10">
        {/* The Interactive Calculator Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xl shadow-slate-200/40">
          {children}
        </div>

        {/* Step-by-Step Educational Solution Box (if provided) */}
        {stepExplanation && (
          <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-indigo-800 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Adım Adım Çözüm ve Matematiksel Mantık</h3>
                <p className="text-xs text-indigo-200">İşlem basamaklarını takip ederek formülün nasıl uygulandığını inceleyin.</p>
              </div>
            </div>
            <div className="pt-2 text-sm text-slate-200 leading-relaxed font-mono">
              {stepExplanation}
            </div>
          </div>
        )}

        {/* Formula Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
              ∑
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">{meta.name} Formülü</h2>
              <p className="text-xs text-slate-500">Kullanılan temel matematiksel bağıntı</p>
            </div>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 font-mono text-indigo-700 font-bold text-sm sm:text-base text-center">
            {meta.formula}
          </div>
        </div>

        {/* Related Calculators Grid */}
        {relatedTools.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-black text-slate-900">İlgili Hesaplama Araçları</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedTools.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${rel.slug}`}
                  className="p-5 bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-2xl transition-all shadow-sm group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                      {rel.categoryName}
                    </div>
                    <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-sm">
                      {rel.name}
                    </div>
                    <div className="text-xs text-slate-500 line-clamp-2">
                      {rel.shortDesc}
                    </div>
                  </div>
                  <div className="pt-3 flex items-center justify-end text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                    <span>Hesapla &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* FAQs */}
        {meta.faqs && meta.faqs.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-black text-slate-900">Sıkça Sorulan Sorular</h3>
            </div>
            <div className="space-y-3 pt-2">
              {meta.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">{faq.question}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Embed Modal */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">{meta.name} Aracını Sitene Ekle</h3>
                  <p className="text-xs text-slate-500">Ücretsiz ve reklamsız iframe kodu</p>
                </div>
              </div>
              <button
                onClick={() => setShowEmbedModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Aşağıdaki kodu web sitenize veya blogunuza yapıştırarak bu hesaplama aracını doğrudan ziyaretçilerinize sunabilirsiniz:
            </p>

            <div className="relative">
              <textarea
                readOnly
                rows={4}
                value={embedCode}
                className="w-full p-3 bg-slate-900 text-indigo-200 font-mono text-xs rounded-xl border border-slate-800 focus:outline-none select-all"
              />
              <button
                onClick={copyEmbedCode}
                className="absolute right-2.5 bottom-2.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
              >
                {embedCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Kopyalandı!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Kodu Kopyala</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowEmbedModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
