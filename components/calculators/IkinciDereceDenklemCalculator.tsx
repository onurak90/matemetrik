'use client';

import React, { useState } from 'react';
import { FunctionSquare, Copy, Check } from 'lucide-react';

export default function IkinciDereceDenklemCalculator() {
  const [valA, setValA] = useState<string>('1');
  const [valB, setValB] = useState<string>('-5');
  const [valC, setValC] = useState<string>('6');
  const [copied, setCopied] = useState(false);

  const a = parseFloat(valA) || 0;
  const b = parseFloat(valB) || 0;
  const c = parseFloat(valC) || 0;

  if (a === 0) {
    return (
      <div className="p-4 bg-amber-50 text-amber-800 border border-amber-200 rounded-2xl text-xs font-bold">
        İkinci dereceden denklem olabilmesi için x² katsayısı (a) sıfırdan farklı olmalıdır. (a ≠ 0)
      </div>
    );
  }

  const delta = b * b - 4 * a * c;
  let root1: number | null = null;
  let root2: number | null = null;
  let complexRoot = '';

  if (delta > 0) {
    root1 = (-b + Math.sqrt(delta)) / (2 * a);
    root2 = (-b - Math.sqrt(delta)) / (2 * a);
  } else if (delta === 0) {
    root1 = -b / (2 * a);
    root2 = root1;
  } else {
    const realPart = (-b / (2 * a)).toFixed(2);
    const imagPart = (Math.sqrt(Math.abs(delta)) / (2 * a)).toFixed(2);
    complexRoot = `${realPart} ± ${imagPart}i`;
  }

  // Tepe noktası
  const r = -b / (2 * a);
  const k = a * r * r + b * r + c;

  const copyResult = () => {
    const text = delta >= 0
      ? `Δ = ${delta} | Kökler: x₁ = ${root1?.toFixed(2)}, x₂ = ${root2?.toFixed(2)}`
      : `Δ = ${delta} (Reel kök yok) | Karmaşık kökler: ${complexRoot}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Visual Equation Banner */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl text-center space-y-2">
        <div className="text-xs text-purple-400 font-bold uppercase tracking-wider">İkinci Dereceden Denklem</div>
        <div className="text-3xl sm:text-4xl font-mono font-black">
          <span className="text-purple-400">{a}x²</span> {b >= 0 ? `+ ${b}x` : `- ${Math.abs(b)}x`} {c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`} = 0
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">a (x² Katsayısı)</label>
          <input
            type="number"
            value={valA}
            onChange={(e) => setValA(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
            placeholder="a (≠ 0)"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">b (x Katsayısı)</label>
          <input
            type="number"
            value={valB}
            onChange={(e) => setValB(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
            placeholder="b"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">c (Sabit Terim)</label>
          <input
            type="number"
            value={valC}
            onChange={(e) => setValC(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
            placeholder="c"
          />
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-purple-50 rounded-2xl border border-purple-200 text-center space-y-1">
          <div className="text-xs text-purple-700 font-bold uppercase tracking-wider">Diskriminant (Delta Δ)</div>
          <div className="text-3xl font-black text-purple-900">Δ = {delta}</div>
          <div className="text-[11px] text-purple-600 font-semibold">
            {delta > 0 ? 'İki Farklı Reel Kök' : delta === 0 ? 'Çift Katlı (Eşit) Kök' : 'Reel Kök Yok (Karmaşık)'}
          </div>
        </div>

        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">1. Kök (x₁)</div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {delta >= 0 && root1 !== null ? root1.toLocaleString('tr-TR', { maximumFractionDigits: 4 }) : 'Karmaşık'}
          </div>
          <div className="text-xs text-slate-500 font-mono">(-b + √Δ) / 2a</div>
        </div>

        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">2. Kök (x₂)</div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {delta >= 0 && root2 !== null ? root2.toLocaleString('tr-TR', { maximumFractionDigits: 4 }) : 'Karmaşık'}
          </div>
          <div className="text-xs text-slate-500 font-mono">(-b - √Δ) / 2a</div>
        </div>
      </div>

      {/* Tepe Noktası & Ek Bilgiler */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
        <div className="p-3 bg-slate-50 rounded-xl border">
          <span className="font-bold text-slate-500">Kökler Toplamı (-b/a):</span>{' '}
          <strong className="text-indigo-600 font-bold">{(-b / a).toFixed(2)}</strong>
        </div>
        <div className="p-3 bg-slate-50 rounded-xl border">
          <span className="font-bold text-slate-500">Kökler Çarpımı (c/a):</span>{' '}
          <strong className="text-indigo-600 font-bold">{(c / a).toFixed(2)}</strong>
        </div>
        <div className="p-3 bg-slate-50 rounded-xl border">
          <span className="font-bold text-slate-500">Parabol Tepe Noktası T(r,k):</span>{' '}
          <strong className="text-purple-600 font-bold">({r.toFixed(2)}, {k.toFixed(2)})</strong>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={copyResult}
          className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl border shadow-sm transition-colors flex items-center gap-1.5"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Kopyalandı' : 'Kökleri Kopyala'}</span>
        </button>
      </div>
    </div>
  );
}
