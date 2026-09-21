'use client';

import React, { useState } from 'react';
import { Variable, Copy, Check } from 'lucide-react';

export default function FonksiyonCalculator() {
  const [valA, setValA] = useState<string>('2');
  const [valB, setValB] = useState<string>('-3');
  const [valC, setValC] = useState<string>('5');
  const [valX, setValX] = useState<string>('4');
  const [copied, setCopied] = useState(false);

  const a = parseFloat(valA) || 0;
  const b = parseFloat(valB) || 0;
  const c = parseFloat(valC) || 0;
  const x = parseFloat(valX) || 0;

  // f(x) = ax² + bx + c
  const term1 = a * x * x;
  const term2 = b * x;
  const term3 = c;
  const result = term1 + term2 + term3;

  const copyResult = () => {
    navigator.clipboard.writeText(`f(${x}) = ${result}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Visual Function Banner */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl text-center space-y-2">
        <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Fonksiyon Kuralı</div>
        <div className="text-2xl sm:text-3xl font-mono font-black">
          f(x) = <span className="text-cyan-400">{a !== 0 ? `${a}x²` : ''}</span>{' '}
          {b !== 0 ? (b > 0 ? `+ ${b}x` : `- ${Math.abs(b)}x`) : ''}{' '}
          {c !== 0 ? (c > 0 ? `+ ${c}` : `- ${Math.abs(c)}`) : ''}
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">a (x² Katsayısı)</label>
          <input
            type="number"
            value={valA}
            onChange={(e) => setValA(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            placeholder="a"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">b (x Katsayısı)</label>
          <input
            type="number"
            value={valB}
            onChange={(e) => setValB(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            placeholder="b"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">c (Sabit Terim)</label>
          <input
            type="number"
            value={valC}
            onChange={(e) => setValC(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            placeholder="c"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">x Değeri</label>
          <input
            type="number"
            value={valX}
            onChange={(e) => setValX(e.target.value)}
            className="w-full px-4 py-3 bg-cyan-50 border border-cyan-300 rounded-xl text-cyan-900 font-black focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            placeholder="x"
          />
        </div>
      </div>

      {/* Result Card */}
      <div className="p-6 bg-cyan-50/90 border border-cyan-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs text-cyan-800 font-bold uppercase tracking-wider">Fonksiyon Değeri</div>
          <div className="text-3xl font-black text-slate-900 mt-1">
            f({x}) = <span className="text-cyan-700">{result.toLocaleString('tr-TR')}</span>
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
      <div className="p-4 bg-slate-50 rounded-2xl border text-xs text-slate-700 space-y-1.5 font-mono">
        <div className="font-bold text-slate-900">İşlem Basamakları:</div>
        <div>1. x yerine {x} yazılır: f({x}) = {a} × ({x})² {b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`} × ({x}) {c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`}</div>
        <div>2. Kuvvet Alma: ({x})² = {x * x} ➔ {a} × {x * x} = {term1}</div>
        <div>3. Çarpma: {b} × {x} = {term2}</div>
        <div>4. Toplama: {term1} {term2 >= 0 ? `+ ${term2}` : `- ${Math.abs(term2)}`} {term3 >= 0 ? `+ ${term3}` : `- ${Math.abs(term3)}`} = <strong className="text-cyan-700 font-bold">{result}</strong></div>
      </div>
    </div>
  );
}
