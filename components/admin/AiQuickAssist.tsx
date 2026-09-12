'use client';

import React, { useState } from 'react';
import { Sparkles, HelpCircle, Lightbulb, FileText, Check, Loader2 } from 'lucide-react';

interface AiQuickAssistProps {
  title: string;
  content: string;
  onApplyMeta: (meta: string) => void;
  onAppendContent: (html: string) => void;
}

export default function AiQuickAssist({
  title,
  content,
  onApplyMeta,
  onAppendContent,
}: AiQuickAssistProps) {
  const [loadingType, setLoadingType] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleAction = async (type: 'meta' | 'faq' | 'tips') => {
    if (!title.trim()) {
      alert('Lütfen önce bir yazı başlığı girin.');
      return;
    }

    setLoadingType(type);
    setSuccessMsg(null);
    try {
      const res = await fetch('/api/ai/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, title, content }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (type === 'meta' && data.metaDescription) {
          onApplyMeta(data.metaDescription);
          setSuccessMsg('✓ Meta açıklama başarıyla üretildi ve uygulandı!');
        } else if ((type === 'faq' || type === 'tips') && data.html) {
          onAppendContent(data.html);
          setSuccessMsg(type === 'faq' ? '✓ SSS bölümü editörün sonuna eklendi!' : '✓ Öğretmen notu kutusu eklendi!');
        }
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        alert(data.error || 'İşlem gerçekleştirilemedi');
      }
    } catch {
      alert('İstek sırasında bağlantı hatası oluştu');
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <div className="p-4 bg-gradient-to-br from-indigo-50/80 via-purple-50/50 to-white rounded-2xl border border-indigo-100 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900">Yapay Zeka İçerik Asistanı</h3>
            <p className="text-[10px] text-slate-500">Google SEO ve pedagojik zenginleştirme araçları</p>
          </div>
        </div>

        {successMsg && (
          <span className="text-[11px] font-semibold text-emerald-600 animate-in fade-in">
            {successMsg}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button
          type="button"
          onClick={() => handleAction('meta')}
          disabled={Boolean(loadingType)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-700 font-semibold text-xs rounded-xl transition-colors shadow-sm disabled:opacity-50"
        >
          {loadingType === 'meta' ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
          ) : (
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
          )}
          Meta Açıklama Üret
        </button>

        <button
          type="button"
          onClick={() => handleAction('faq')}
          disabled={Boolean(loadingType)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-700 font-semibold text-xs rounded-xl transition-colors shadow-sm disabled:opacity-50"
        >
          {loadingType === 'faq' ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
          ) : (
            <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
          )}
          3'lü SSS Bloğu Ekle
        </button>

        <button
          type="button"
          onClick={() => handleAction('tips')}
          disabled={Boolean(loadingType)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-700 font-semibold text-xs rounded-xl transition-colors shadow-sm disabled:opacity-50"
        >
          {loadingType === 'tips' ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
          ) : (
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          )}
          Altın İpuçları Kutusu Ekle
        </button>
      </div>
    </div>
  );
}
