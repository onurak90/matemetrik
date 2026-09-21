'use client';

import React, { useState } from 'react';
import { Tag, Copy, Check } from 'lucide-react';

export default function IndirimCalculator() {
  const [price, setPrice] = useState<string>('800');
  const [discountRate, setDiscountRate] = useState<string>('25');
  const [copied, setCopied] = useState(false);

  const numPrice = parseFloat(price) || 0;
  const numRate = parseFloat(discountRate) || 0;

  const discountAmount = (numPrice * numRate) / 100;
  const finalPrice = Math.max(0, numPrice - discountAmount);

  const copyResult = () => {
    navigator.clipboard.writeText(
      `Orijinal Fiyat: ${numPrice} TL | İndirim: %${numRate} (${discountAmount.toFixed(2)} TL) | Ödenecek Tutar: ${finalPrice.toFixed(2)} TL`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Orijinal Etiket Fiyatı (TL)</label>
          <div className="relative">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
              placeholder="Örn: 800"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">TL</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">İndirim Oranı (%)</label>
          <div className="relative">
            <input
              type="number"
              value={discountRate}
              onChange={(e) => setDiscountRate(e.target.value)}
              className="w-full pl-4 pr-9 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
              placeholder="Örn: 25"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
          </div>
        </div>
      </div>

      {/* Quick % buttons */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold">
        <span className="text-slate-400">Popüler İndirimler:</span>
        {[10, 20, 25, 30, 40, 50, 70].map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setDiscountRate(p.toString())}
            className="px-2.5 py-1 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 rounded-lg border border-slate-200"
          >
            %{p}
          </button>
        ))}
      </div>

      {/* Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border text-center">
          <div className="text-xs text-slate-500 font-bold">Orijinal Fiyat</div>
          <div className="text-xl sm:text-2xl font-black text-slate-700 mt-1 line-through">
            {numPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL
          </div>
        </div>

        <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-center">
          <div className="text-xs text-rose-700 font-bold">Tasarrufunuz (İndirim)</div>
          <div className="text-xl sm:text-2xl font-black text-rose-700 mt-1">
            -{discountAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL
          </div>
        </div>

        <div className="p-4 bg-emerald-600 text-white rounded-2xl border border-emerald-700 text-center">
          <div className="text-xs text-emerald-100 font-bold">İndirimli Son Fiyat</div>
          <div className="text-xl sm:text-2xl font-black text-white mt-1">
            {finalPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={copyResult}
          className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border shadow-sm transition-colors flex items-center gap-1.5"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Kopyalandı' : 'Sonucu Kopyala'}</span>
        </button>
      </div>

      {/* Adım Adım Açıklama */}
      <div className="p-4 bg-slate-50 rounded-2xl border text-xs text-slate-700 space-y-1.5 font-mono">
        <div className="font-bold text-slate-900">İşlem Basamakları:</div>
        <div>1. İndirim Tutarı: {numPrice} × ({numRate} / 100) = {discountAmount.toFixed(2)} TL</div>
        <div>2. Yeni Fiyat: {numPrice} - {discountAmount.toFixed(2)} = <strong className="text-emerald-700 font-bold">{finalPrice.toFixed(2)} TL</strong></div>
      </div>
    </div>
  );
}
