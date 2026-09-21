'use client';

import React, { useState } from 'react';
import { Spline, Copy, Check } from 'lucide-react';

export default function PisagorHipotenusCalculator() {
  const [mode, setMode] = useState<'findHypotenuse' | 'findLeg'>('findHypotenuse');
  const [valA, setValA] = useState<string>('3');
  const [valB, setValB] = useState<string>('4');
  const [valC, setValC] = useState<string>('5');
  const [copied, setCopied] = useState(false);

  const a = parseFloat(valA) || 0;
  const b = parseFloat(valB) || 0;
  const c = parseFloat(valC) || 0;

  let result = 0;
  let specialTriangle = '';

  if (mode === 'findHypotenuse') {
    result = Math.sqrt(a * a + b * b);
    const minSide = Math.min(a, b);
    const maxSide = Math.max(a, b);
    if (minSide === 3 && maxSide === 4) specialTriangle = '3 - 4 - 5 Özel Dik Üçgeni';
    else if (minSide === 6 && maxSide === 8) specialTriangle = '6 - 8 - 10 (3-4-5 Katı) Özel Üçgeni';
    else if (minSide === 5 && maxSide === 12) specialTriangle = '5 - 12 - 13 Özel Dik Üçgeni';
    else if (minSide === 8 && maxSide === 15) specialTriangle = '8 - 15 - 17 Özel Dik Üçgeni';
    else if (minSide === 7 && maxSide === 24) specialTriangle = '7 - 24 - 25 Özel Dik Üçgeni';
  } else {
    // b = √(c² - a²)
    if (c > a && a > 0) {
      result = Math.sqrt(c * c - a * a);
    }
  }

  const copyResult = () => {
    navigator.clipboard.writeText(
      mode === 'findHypotenuse'
        ? `a=${a}, b=${b} için Hipotenüs c = ${result.toFixed(2)}`
        : `a=${a}, c=${c} için Diğer Dik Kenar b = ${result.toFixed(2)}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl">
        <button
          onClick={() => setMode('findHypotenuse')}
          className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
            mode === 'findHypotenuse' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Hipotenüs Bul (a ve b ➔ c)
        </button>
        <button
          onClick={() => setMode('findLeg')}
          className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
            mode === 'findLeg' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Dik Kenar Bul (a ve c ➔ b)
        </button>
      </div>

      {mode === 'findHypotenuse' ? (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">1. Dik Kenar (a)</label>
              <input
                type="number"
                min="0"
                value={valA}
                onChange={(e) => setValA(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Örn: 3"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">2. Dik Kenar (b)</label>
              <input
                type="number"
                min="0"
                value={valB}
                onChange={(e) => setValB(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Örn: 4"
              />
            </div>
          </div>

          <div className="p-6 bg-indigo-50/80 border border-indigo-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-indigo-700 font-bold uppercase tracking-wider">Hesaplanan Hipotenüs (c)</div>
              <div className="text-3xl sm:text-4xl font-black text-indigo-900 mt-1">
                c = {result.toLocaleString('tr-TR', { maximumFractionDigits: 4 })}
              </div>
              {specialTriangle && (
                <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold">
                  ⭐ {specialTriangle}
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
            <div className="font-bold text-slate-900">İşlem Basamakları:</div>
            <div>1. Formül: c² = a² + b² ➔ c = √(a² + b²)</div>
            <div>2. Kareler Toplamı: {a}² + {b}² = {a * a} + {b * b} = {a * a + b * b}</div>
            <div>3. Karekök: √({a * a + b * b}) = <strong className="text-indigo-700 font-bold">{result.toFixed(4).replace(/\.?0+$/, '')}</strong></div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Bilinen Dik Kenar (a)</label>
              <input
                type="number"
                min="0"
                value={valA}
                onChange={(e) => setValA(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Örn: 3"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Hipotenüs (c)</label>
              <input
                type="number"
                min="0"
                value={valC}
                onChange={(e) => setValC(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Örn: 5"
              />
            </div>
          </div>

          {c <= a ? (
            <div className="p-4 bg-rose-50 text-rose-800 border border-rose-200 rounded-2xl text-xs font-bold">
              Hipotenüs uzunluğu (c) daima dik kenardan (a) büyük olmalıdır (c &gt; a).
            </div>
          ) : (
            <div className="p-6 bg-indigo-50/80 border border-indigo-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs text-indigo-700 font-bold uppercase tracking-wider">Bilinmeyen Dik Kenar (b)</div>
                <div className="text-3xl sm:text-4xl font-black text-indigo-900 mt-1">
                  b = {result.toLocaleString('tr-TR', { maximumFractionDigits: 4 })}
                </div>
              </div>
              <button
                onClick={copyResult}
                className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl border shadow-sm transition-colors flex items-center gap-1.5 shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Kopyalandı' : 'Sonucu Kopyala'}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
