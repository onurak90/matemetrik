'use client';

import React, { useState } from 'react';
import { Dice5, Copy, Check } from 'lucide-react';

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

export default function OlasilikCalculator() {
  const [favorable, setFavorable] = useState<string>('3');
  const [total, setTotal] = useState<string>('8');
  const [copied, setCopied] = useState(false);

  const nFav = parseFloat(favorable) || 0;
  const nTot = parseFloat(total) || 0;

  const valid = nTot > 0 && nFav >= 0 && nFav <= nTot;
  const prob = valid ? nFav / nTot : 0;
  const probPercent = prob * 100;
  const compProb = 1 - prob;

  // Fraction simplification
  let simpNum = nFav;
  let simpDen = nTot;
  if (Number.isInteger(nFav) && Number.isInteger(nTot) && nTot > 0) {
    const g = gcd(nFav, nTot);
    if (g > 1) {
      simpNum = nFav / g;
      simpDen = nTot / g;
    }
  }

  const copyResult = () => {
    navigator.clipboard.writeText(`Olasılık P(A) = ${prob.toFixed(4)} (%${probPercent.toFixed(2)})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">İstenen Durum Sayısı (s(A))</label>
          <input
            type="number"
            min="0"
            value={favorable}
            onChange={(e) => setFavorable(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Örn: 3"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Tüm Olası Durumların Sayısı (s(E))</label>
          <input
            type="number"
            min="1"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Örn: 8"
          />
        </div>
      </div>

      {!valid && (
        <div className="p-3 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl text-xs font-semibold">
          Lütfen 0 ≤ İstenen Durum ≤ Tüm Durum şartını sağlayınız (İstenen durum toplam durumdan büyük olamaz).
        </div>
      )}

      {/* Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-indigo-50/90 border border-indigo-200 rounded-2xl text-center space-y-1">
          <div className="text-xs text-indigo-700 font-bold uppercase tracking-wider">Kesir Değeri</div>
          <div className="text-3xl font-black text-indigo-900">
            {simpNum} / {simpDen}
          </div>
          {simpDen !== nTot && (
            <div className="text-xs text-slate-500 font-mono">({nFav} / {nTot} sadeleşti)</div>
          )}
        </div>

        <div className="p-5 bg-purple-50/90 border border-purple-200 rounded-2xl text-center space-y-1">
          <div className="text-xs text-purple-700 font-bold uppercase tracking-wider">Yüzde Olasılık</div>
          <div className="text-3xl font-black text-purple-900">
            %{probPercent.toFixed(2).replace('.00', '')}
          </div>
          <div className="text-xs text-slate-500 font-mono">Ondalık: {prob.toFixed(4)}</div>
        </div>

        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-1">
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Gerçekleşmeme (1 - P)</div>
          <div className="text-3xl font-black text-slate-700">
            %{(compProb * 100).toFixed(2).replace('.00', '')}
          </div>
          <div className="text-xs text-slate-500 font-mono">{simpDen - simpNum} / {simpDen}</div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={copyResult}
          className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl border shadow-sm transition-colors flex items-center gap-1.5"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Kopyalandı' : 'Sonucu Kopyala'}</span>
        </button>
      </div>

      <div className="p-4 bg-slate-50 rounded-2xl border text-xs text-slate-700 space-y-1.5 font-mono">
        <div className="font-bold text-slate-900">Olasılık Formülü ve Kuralları:</div>
        <div>1. P(A) = s(A) / s(E) = {nFav} / {nTot} = {prob.toFixed(4)}</div>
        <div>2. Olasılık değeri daima 0 ile 1 arasındadır: 0 ≤ P(A) ≤ 1</div>
        <div>3. P(A) + P(A&apos;) = 1 (Olayın olma ve olmama olasılıkları toplamı 1’dir)</div>
      </div>
    </div>
  );
}
