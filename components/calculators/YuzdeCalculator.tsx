'use client';

import React, { useState } from 'react';
import { Percent, ArrowRight, Copy, Check, Sparkles } from 'lucide-react';

export default function YuzdeCalculator() {
  const [mode, setMode] = useState<'part' | 'ratio' | 'change'>('part');
  const [copied, setCopied] = useState(false);

  // Mode 1: A sayısının %B'si
  const [valA1, setValA1] = useState<string>('200');
  const [valB1, setValB1] = useState<string>('15');

  // Mode 2: A sayısı B sayısının yüzde kaçı
  const [valA2, setValA2] = useState<string>('40');
  const [valB2, setValB2] = useState<string>('160');

  // Mode 3: A'dan B'ye artış/azalış
  const [valA3, setValA3] = useState<string>('500');
  const [valB3, setValB3] = useState<string>('650');

  const copyResult = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculations
  const numA1 = parseFloat(valA1) || 0;
  const numB1 = parseFloat(valB1) || 0;
  const res1 = (numA1 * numB1) / 100;

  const numA2 = parseFloat(valA2) || 0;
  const numB2 = parseFloat(valB2) || 0;
  const res2 = numB2 !== 0 ? (numA2 / numB2) * 100 : 0;

  const numA3 = parseFloat(valA3) || 0;
  const numB3 = parseFloat(valB3) || 0;
  const changeDiff = numB3 - numA3;
  const changePct = numA3 !== 0 ? (changeDiff / numA3) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Mode Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl">
        <button
          onClick={() => setMode('part')}
          className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
            mode === 'part' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          A sayısının %B’si
        </button>
        <button
          onClick={() => setMode('ratio')}
          className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
            mode === 'ratio' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          A, B’nin yüzde kaçıdır?
        </button>
        <button
          onClick={() => setMode('change')}
          className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
            mode === 'change' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Yüzde Değişim (Artış/Azalış)
        </button>
      </div>

      {/* Mode 1 */}
      {mode === 'part' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Sayı (A)</label>
              <input
                type="number"
                value={valA1}
                onChange={(e) => setValA1(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Örn: 200"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Yüzde Oranı (%B)</label>
              <div className="relative">
                <input
                  type="number"
                  value={valB1}
                  onChange={(e) => setValB1(e.target.value)}
                  className="w-full pl-4 pr-9 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Örn: 15"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-indigo-50/70 border border-indigo-200/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-indigo-600 font-bold uppercase tracking-wider">Hesaplama Sonucu</div>
              <div className="text-3xl font-black text-slate-900 mt-1">
                {numA1} sayısının %{numB1}’i = <span className="text-indigo-600">{res1.toLocaleString('tr-TR')}</span>
              </div>
            </div>
            <button
              onClick={() => copyResult(`${numA1} sayısının %${numB1}'i = ${res1}`)}
              className="px-4 py-2 bg-white hover:bg-indigo-50 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-200 shadow-sm transition-colors flex items-center gap-1.5 shrink-0"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Kopyalandı' : 'Sonucu Kopyala'}</span>
            </button>
          </div>

          {/* Adım Adım Açıklama */}
          <div className="p-4 bg-slate-50 rounded-2xl border text-xs text-slate-700 space-y-1.5 font-mono">
            <div className="font-bold text-slate-900">İşlem Basamakları:</div>
            <div>1. Formül: (A × B) / 100</div>
            <div>2. Çarpım: {numA1} × {numB1} = {(numA1 * numB1).toLocaleString('tr-TR')}</div>
            <div>3. Bölme: {(numA1 * numB1).toLocaleString('tr-TR')} / 100 = <strong className="text-indigo-600 font-bold">{res1.toLocaleString('tr-TR')}</strong></div>
          </div>
        </div>
      )}

      {/* Mode 2 */}
      {mode === 'ratio' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Pay Sayısı (A)</label>
              <input
                type="number"
                value={valA2}
                onChange={(e) => setValA2(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Örn: 40"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Payda / Toplam Sayı (B)</label>
              <input
                type="number"
                value={valB2}
                onChange={(e) => setValB2(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Örn: 160"
              />
            </div>
          </div>

          <div className="p-6 bg-indigo-50/70 border border-indigo-200/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-indigo-600 font-bold uppercase tracking-wider">Yüzde Oranı</div>
              <div className="text-3xl font-black text-slate-900 mt-1">
                {numA2} sayısı {numB2}’nin <span className="text-indigo-600">%{res2.toFixed(2).replace('.00', '')}</span>’idir
              </div>
            </div>
            <button
              onClick={() => copyResult(`${numA2} sayısı ${numB2}'nin %${res2.toFixed(2)}'idir.`)}
              className="px-4 py-2 bg-white hover:bg-indigo-50 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-200 shadow-sm transition-colors flex items-center gap-1.5 shrink-0"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Kopyalandı' : 'Sonucu Kopyala'}</span>
            </button>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border text-xs text-slate-700 space-y-1.5 font-mono">
            <div className="font-bold text-slate-900">İşlem Basamakları:</div>
            <div>1. Formül: (A / B) × 100</div>
            <div>2. Oran: {numA2} / {numB2} = {(numB2 !== 0 ? numA2 / numB2 : 0).toFixed(4)}</div>
            <div>3. Yüzdeye Çevirme: {(numB2 !== 0 ? numA2 / numB2 : 0).toFixed(4)} × 100 = <strong className="text-indigo-600">%{res2.toFixed(2).replace('.00', '')}</strong></div>
          </div>
        </div>
      )}

      {/* Mode 3 */}
      {mode === 'change' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Eski / İlk Değer (A)</label>
              <input
                type="number"
                value={valA3}
                onChange={(e) => setValA3(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Örn: 500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Yeni / Son Değer (B)</label>
              <input
                type="number"
                value={valB3}
                onChange={(e) => setValB3(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Örn: 650"
              />
            </div>
          </div>

          <div className={`p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
            changeDiff >= 0 ? 'bg-emerald-50/80 border-emerald-200' : 'bg-rose-50/80 border-rose-200'
          }`}>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
                {changeDiff >= 0 ? '📈 Yüzde Artış' : '📉 Yüzde Azalış'}
              </div>
              <div className="text-3xl font-black text-slate-900 mt-1">
                {changeDiff >= 0 ? '+' : ''}{changePct.toFixed(2).replace('.00', '')}% {changeDiff >= 0 ? 'Artış' : 'Azalış'}
                <span className="text-sm font-semibold text-slate-500 ml-2">
                  (Fark: {changeDiff > 0 ? '+' : ''}{changeDiff})
                </span>
              </div>
            </div>
            <button
              onClick={() => copyResult(`Değişim Oranı: %${changePct.toFixed(2)} (${changeDiff > 0 ? 'Artış' : 'Azalış'})`)}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl border shadow-sm transition-colors flex items-center gap-1.5 shrink-0"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Kopyalandı' : 'Sonucu Kopyala'}</span>
            </button>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border text-xs text-slate-700 space-y-1.5 font-mono">
            <div className="font-bold text-slate-900">İşlem Basamakları:</div>
            <div>1. Değişim Miktarı (Fark): Son Değer ({numB3}) - İlk Değer ({numA3}) = {changeDiff}</div>
            <div>2. Oranlama: {changeDiff} / {numA3} = {(numA3 !== 0 ? changeDiff / numA3 : 0).toFixed(4)}</div>
            <div>3. Yüzde: {(numA3 !== 0 ? changeDiff / numA3 : 0).toFixed(4)} × 100 = <strong className="text-indigo-600">%{changePct.toFixed(2)}</strong></div>
          </div>
        </div>
      )}
    </div>
  );
}
