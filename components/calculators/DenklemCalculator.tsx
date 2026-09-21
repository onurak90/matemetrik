'use client';

import React, { useState } from 'react';
import { EqualNot, Copy, Check } from 'lucide-react';

export default function DenklemCalculator() {
  const [valA, setValA] = useState<string>('3');
  const [valB, setValB] = useState<string>('7');
  const [valC, setValC] = useState<string>('22');
  const [copied, setCopied] = useState(false);

  const a = parseFloat(valA) || 0;
  const b = parseFloat(valB) || 0;
  const c = parseFloat(valC) || 0;

  // ax + b = c  =>  ax = c - b  =>  x = (c - b) / a
  let solutionText = '';
  let xVal = 0;
  let hasUniqueSolution = false;

  if (a !== 0) {
    xVal = (c - b) / a;
    hasUniqueSolution = true;
    solutionText = `x = ${xVal.toLocaleString('tr-TR', { maximumFractionDigits: 4 })}`;
  } else {
    if (b === c) {
      solutionText = 'Sonsuz Çözüm (Tüm Reel Sayılar - Ç = ℝ)';
    } else {
      solutionText = 'Çözüm Yok (Boş Küme - Ç = ∅)';
    }
  }

  const copyResult = () => {
    navigator.clipboard.writeText(`${a}x + (${b}) = ${c} denkleminin çözümü: ${solutionText}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Visual Equation Banner */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl text-center space-y-2">
        <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">Doğrusal Denklem Formatı</div>
        <div className="text-3xl sm:text-4xl font-mono font-black">
          <span className="text-amber-400">{a !== 0 ? `${a}x` : '0x'}</span> {b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`} = <span className="text-cyan-400">{c}</span>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">x’in Katsayısı (a)</label>
          <input
            type="number"
            value={valA}
            onChange={(e) => setValA(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
            placeholder="a"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Sabit Terim (b)</label>
          <input
            type="number"
            value={valB}
            onChange={(e) => setValB(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
            placeholder="b"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Eşitliğin Sağ Tarafı (c)</label>
          <input
            type="number"
            value={valC}
            onChange={(e) => setValC(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
            placeholder="c"
          />
        </div>
      </div>

      {/* Result Card */}
      <div className="p-6 bg-amber-50/90 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs text-amber-800 font-bold uppercase tracking-wider">Denklem Çözümü</div>
          <div className="text-3xl font-black text-slate-900 mt-1">
            {solutionText}
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

      {/* Adım Adım Açıklama */}
      {hasUniqueSolution && (
        <div className="p-4 bg-slate-50 rounded-2xl border text-xs text-slate-700 space-y-1.5 font-mono">
          <div className="font-bold text-slate-900">Adım Adım Çözüm Basamakları:</div>
          <div>1. Verilen Denklem: {a}x {b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`} = {c}</div>
          <div>2. Sabit terim b karşıya işaret değiştirerek atılır: {a}x = {c} - ({b}) = {c - b}</div>
          <div>3. Her iki taraf x&apos;in katsayısı ({a}) ile bölünür: x = {c - b} / {a}</div>
          <div>4. Sonuç: <strong className="text-amber-700 font-bold">x = {xVal.toFixed(4).replace(/\.?0+$/, '')}</strong></div>
        </div>
      )}
    </div>
  );
}
