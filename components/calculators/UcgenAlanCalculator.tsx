'use client';

import React, { useState } from 'react';
import { Triangle, Copy, Check } from 'lucide-react';

export default function UcgenAlanCalculator() {
  const [mode, setMode] = useState<'baseHeight' | 'heron'>('baseHeight');
  const [copied, setCopied] = useState(false);

  // Mode 1: Taban & Yükseklik
  const [base, setBase] = useState<string>('12');
  const [height, setHeight] = useState<string>('8');

  // Mode 2: 3 Kenar (Heron)
  const [sideA, setSideA] = useState<string>('5');
  const [sideB, setSideB] = useState<string>('6');
  const [sideC, setSideC] = useState<string>('7');

  const b = parseFloat(base) || 0;
  const h = parseFloat(height) || 0;
  const area1 = (b * h) / 2;

  const a = parseFloat(sideA) || 0;
  const sB = parseFloat(sideB) || 0;
  const sC = parseFloat(sideC) || 0;

  // Üçgen eşitsizliği kontrolü: a+b>c, a+c>b, b+c>a
  const isTriangle = a + sB > sC && a + sC > sB && sB + sC > a && a > 0 && sB > 0 && sC > 0;
  const u = (a + sB + sC) / 2; // Yarı çevre
  const area2 = isTriangle ? Math.sqrt(u * (u - a) * (u - sB) * (u - sC)) : 0;

  const activeArea = mode === 'baseHeight' ? area1 : area2;

  const copyResult = () => {
    navigator.clipboard.writeText(`Üçgen Alanı = ${activeArea.toFixed(2)} br²`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Mode Selector */}
      <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl">
        <button
          onClick={() => setMode('baseHeight')}
          className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
            mode === 'baseHeight' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Taban ve Yükseklik ile ( (b×h)/2 )
        </button>
        <button
          onClick={() => setMode('heron')}
          className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
            mode === 'heron' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          3 Kenar Uzunluğu ile (Heron Formülü)
        </button>
      </div>

      {mode === 'baseHeight' ? (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Taban Uzunluğu (b)</label>
              <input
                type="number"
                value={base}
                onChange={(e) => setBase(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="Örn: 12"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Yükseklik (h)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="Örn: 8"
              />
            </div>
          </div>

          <div className="p-6 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-emerald-800 font-bold uppercase tracking-wider">Hesaplanan Üçgen Alanı</div>
              <div className="text-3xl font-black text-slate-900 mt-1">
                Alan = <span className="text-emerald-600">{area1.toLocaleString('tr-TR')} br²</span>
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

          <div className="p-4 bg-slate-50 rounded-2xl border text-xs text-slate-700 space-y-1.5 font-mono">
            <div className="font-bold text-slate-900">İşlem Basamakları:</div>
            <div>1. Formül: Alan = (Taban × Yükseklik) / 2</div>
            <div>2. Değerler: ({b} × {h}) / 2 = {b * h} / 2 = <strong className="text-emerald-700 font-bold">{area1} br²</strong></div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">1. Kenar (a)</label>
              <input
                type="number"
                value={sideA}
                onChange={(e) => setSideA(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="Örn: 5"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">2. Kenar (b)</label>
              <input
                type="number"
                value={sideB}
                onChange={(e) => setSideB(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="Örn: 6"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">3. Kenar (c)</label>
              <input
                type="number"
                value={sideC}
                onChange={(e) => setSideC(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="Örn: 7"
              />
            </div>
          </div>

          {!isTriangle ? (
            <div className="p-4 bg-rose-50 text-rose-800 border border-rose-200 rounded-2xl text-xs font-bold">
              Bu kenar uzunlukları ile bir üçgen oluşturulamaz! Üçgen eşitsizliğine göre herhangi iki kenarın toplamı üçüncü kenardan büyük olmalıdır.
            </div>
          ) : (
            <div className="p-6 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs text-emerald-800 font-bold uppercase tracking-wider">Heron Formülü ile Alan</div>
                <div className="text-3xl font-black text-slate-900 mt-1">
                  Alan = <span className="text-emerald-600">{area2.toFixed(2)} br²</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">Yarı Çevre (u) = {u} br</div>
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
