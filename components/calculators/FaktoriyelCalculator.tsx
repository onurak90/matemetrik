'use client';

import React, { useState } from 'react';
import { Binary, Copy, Check } from 'lucide-react';

function factorial(n: number): bigint {
  if (n < 0) return BigInt(0);
  if (n === 0 || n === 1) return BigInt(1);
  let res = BigInt(1);
  for (let i = 2; i <= n; i++) {
    res *= BigInt(i);
  }
  return res;
}

export default function FaktoriyelCalculator() {
  const [val, setVal] = useState<string>('6');
  const [copied, setCopied] = useState(false);

  const n = parseInt(val, 10);
  const isValid = !isNaN(n) && n >= 0 && n <= 100;

  let resultStr = '';
  if (isValid) {
    try {
      resultStr = factorial(n).toString();
    } catch {
      resultStr = 'Hesaplanamadı (Çok büyük)';
    }
  }

  const copyResult = () => {
    navigator.clipboard.writeText(`${n}! = ${resultStr}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Açılım listesi
  const expansion = n > 0 && n <= 10
    ? Array.from({ length: n }, (_, i) => n - i).join(' × ')
    : null;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">Sayı (n)</label>
        <div className="relative max-w-md">
          <input
            type="number"
            min="0"
            max="100"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
            placeholder="Örn: 6"
          />
        </div>
      </div>

      {/* Quick Presets */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold">
        <span className="text-slate-400">Hızlı n:</span>
        {[0, 1, 3, 5, 6, 7, 10, 12, 15].map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setVal(p.toString())}
            className="px-2.5 py-1 bg-slate-100 hover:bg-purple-50 hover:text-purple-700 rounded-lg border border-slate-200"
          >
            {p}!
          </button>
        ))}
      </div>

      {/* Result Card */}
      <div className="p-6 bg-purple-50/80 border border-purple-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left overflow-hidden">
          <div className="text-xs text-purple-700 font-bold uppercase tracking-wider">Faktöriyel Sonucu</div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 break-all">
            {n}! = <span className="text-purple-700">{resultStr}</span>
          </div>
          {expansion && (
            <div className="text-xs text-slate-500 font-mono">
              Açılım: {expansion} = {resultStr}
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

      <div className="p-4 bg-slate-50 rounded-2xl border text-xs text-slate-700 space-y-1.5 font-mono">
        <div className="font-bold text-slate-900">Önemli Kurallar:</div>
        <div>• 0! = 1 (Tanım gereği sıfır faktöriyel 1’dir)</div>
        <div>• 1! = 1</div>
        <div>• n! = n × (n-1)!</div>
      </div>
    </div>
  );
}
