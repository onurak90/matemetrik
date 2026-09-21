'use client';

import React, { useState } from 'react';
import { Superscript, Copy, Check } from 'lucide-react';

export default function UsluSayiCalculator() {
  const [base, setBase] = useState<string>('2');
  const [exponent, setExponent] = useState<string>('8');
  const [copied, setCopied] = useState(false);

  const numBase = parseFloat(base) || 0;
  const numExp = parseFloat(exponent) || 0;

  const result = Math.pow(numBase, numExp);

  const copyResult = () => {
    navigator.clipboard.writeText(`${numBase}^${numExp} = ${result}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate expansion if exponent is a small integer (1..10)
  const isSmallIntExp = Number.isInteger(numExp) && numExp > 0 && numExp <= 10;
  const expansion = isSmallIntExp ? Array(numExp).fill(numBase).join(' × ') : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Taban Sayı (a)</label>
          <input
            type="number"
            value={base}
            onChange={(e) => setBase(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
            placeholder="Örn: 2"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Üs / Kuvvet (n)</label>
          <input
            type="number"
            value={exponent}
            onChange={(e) => setExponent(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
            placeholder="Örn: 8"
          />
        </div>
      </div>

      {/* Quick exponent presets */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold">
        <span className="text-slate-400">Hızlı Kuvvet:</span>
        {[2, 3, 4, 5, 10, -1].map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setExponent(p.toString())}
            className="px-2.5 py-1 bg-slate-100 hover:bg-amber-50 hover:text-amber-600 rounded-lg border border-slate-200"
          >
            ⁿ = {p}
          </button>
        ))}
      </div>

      {/* Result Card */}
      <div className="p-6 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-transparent border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs text-amber-700 font-bold uppercase tracking-wider">İşlem Sonucu</div>
          <div className="text-3xl font-black text-slate-900 mt-1">
            {numBase}<sup>{numExp}</sup> = <span className="text-amber-600 font-black">{isNaN(result) ? 'Tanımsız' : result.toLocaleString('tr-TR')}</span>
          </div>
          {expansion && (
            <div className="text-xs text-slate-500 mt-1 font-mono">
              Açılım: {expansion}
            </div>
          )}
        </div>
        <button
          onClick={copyResult}
          className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl border shadow-sm transition-colors flex items-center gap-1.5 shrink-0"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Kopyalandı' : 'Sonucu Kopyala'}</span>
        </button>
      </div>

      {/* Formül & Kurallar */}
      <div className="p-4 bg-slate-50 rounded-2xl border text-xs text-slate-700 space-y-1.5 font-mono">
        <div className="font-bold text-slate-900">Üslü Sayı Özellikleri:</div>
        <div>• a⁰ = 1 (0⁰ hariç, sıfırıncı kuvvet daima 1’dir)</div>
        <div>• a¹ = a (Her sayının 1. kuvveti kendisine eşittir)</div>
        <div>• a⁻ⁿ = 1 / aⁿ (Negatif üs kesirli ifadeye dönüşür)</div>
      </div>
    </div>
  );
}
