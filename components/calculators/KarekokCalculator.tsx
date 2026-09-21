'use client';

import React, { useState } from 'react';
import { SquareDot, Copy, Check } from 'lucide-react';

export default function KarekokCalculator() {
  const [value, setValue] = useState<string>('72');
  const [copied, setCopied] = useState(false);

  const num = parseFloat(value) || 0;
  const isNegative = num < 0;
  const sqrtVal = !isNegative ? Math.sqrt(num) : NaN;
  const isInteger = !isNegative && Number.isInteger(num);

  // a√b simplification for positive integers
  let simplifiedA = 1;
  let simplifiedB = num;
  let isPerfectSquare = false;

  if (isInteger && num > 0) {
    let intNum = Math.floor(num);
    for (let i = Math.floor(Math.sqrt(intNum)); i >= 2; i--) {
      if (intNum % (i * i) === 0) {
        simplifiedA = i;
        simplifiedB = intNum / (i * i);
        break;
      }
    }
    if (simplifiedB === 1) {
      isPerfectSquare = true;
    }
  }

  const copyResult = () => {
    const text = isPerfectSquare
      ? `√${num} = ${sqrtVal}`
      : `√${num} = ${simplifiedA > 1 ? `${simplifiedA}√${simplifiedB} ≈ ` : ''}${sqrtVal.toFixed(4)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">Karekökü Alınacak Sayı</label>
        <div className="relative max-w-md">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            placeholder="Örn: 72"
          />
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-600 font-black text-lg">√</span>
        </div>
      </div>

      {/* Quick presets */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold">
        <span className="text-slate-400">Tam Kareler:</span>
        {[16, 25, 49, 64, 72, 100, 144, 200].map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setValue(p.toString())}
            className="px-2.5 py-1 bg-slate-100 hover:bg-cyan-50 hover:text-cyan-600 rounded-lg border border-slate-200"
          >
            √{p}
          </button>
        ))}
      </div>

      {/* Result Cards */}
      {isNegative ? (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-2xl">
          Negatif sayıların reel sayılar kümesinde karekökü tanımsızdır (karmaşık sayılara girer).
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Ondalık Değer */}
          <div className="p-6 bg-cyan-50/70 border border-cyan-200 rounded-2xl space-y-2">
            <div className="text-xs text-cyan-700 font-bold uppercase tracking-wider">Karekök Değeri</div>
            <div className="text-3xl font-black text-slate-900">
              √{num} = <span className="text-cyan-600">{sqrtVal % 1 === 0 ? sqrtVal : sqrtVal.toFixed(4)}</span>
            </div>
            {sqrtVal % 1 !== 0 && (
              <div className="text-xs text-slate-500 font-mono">
                Tam değer: {sqrtVal}
              </div>
            )}
          </div>

          {/* a√b Sadeleştirme */}
          <div className="p-6 bg-slate-900 text-white border border-slate-800 rounded-2xl space-y-2">
            <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Kök Dışına Çıkarma (a√b)</div>
            <div className="text-3xl font-black text-white">
              {isPerfectSquare ? (
                <span>Tam Kare: <span className="text-emerald-400">{sqrtVal}</span></span>
              ) : simplifiedA > 1 ? (
                <span>√{num} = <span className="text-amber-400">{simplifiedA}√{simplifiedB}</span></span>
              ) : (
                <span className="text-slate-300 text-xl">Sadeleşmez (√{num})</span>
              )}
            </div>
            <div className="text-xs text-slate-400 font-mono">
              {simplifiedA > 1 && `Çarpanlar: √(${simplifiedA * simplifiedA} × ${simplifiedB})`}
            </div>
          </div>
        </div>
      )}

      {!isNegative && (
        <div className="flex justify-end">
          <button
            onClick={copyResult}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl border shadow-sm transition-colors flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Kopyalandı' : 'Sonucu Kopyala'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
