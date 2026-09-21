'use client';

import React, { useState } from 'react';
import { Scale, Copy, Check } from 'lucide-react';

export default function OranOrantiCalculator() {
  const [type, setType] = useState<'dogru' | 'ters'>('dogru');
  const [valA, setValA] = useState<string>('4');
  const [valB, setValB] = useState<string>('12');
  const [valC, setValC] = useState<string>('8');
  const [copied, setCopied] = useState(false);

  const numA = parseFloat(valA) || 0;
  const numB = parseFloat(valB) || 0;
  const numC = parseFloat(valC) || 0;

  // Doğru orantı: A / B = C / x => x = (B * C) / A
  // Ters orantı: A * B = C * x => x = (A * B) / C
  let resultX = 0;
  if (type === 'dogru') {
    resultX = numA !== 0 ? (numB * numC) / numA : 0;
  } else {
    resultX = numC !== 0 ? (numA * numB) / numC : 0;
  }

  const copyResult = () => {
    navigator.clipboard.writeText(`Bilinmeyen X = ${resultX.toFixed(2)} (${type === 'dogru' ? 'Doğru Orantı' : 'Ters Orantı'})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl">
        <button
          onClick={() => setType('dogru')}
          className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
            type === 'dogru' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Doğru Orantı (A / B = C / X)
        </button>
        <button
          onClick={() => setType('ters')}
          className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
            type === 'ters' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Ters Orantı (A × B = C × X)
        </button>
      </div>

      {/* Interactive Visual Proportional Layout */}
      <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Sol Taraf (A ve B) */}
          <div className="p-4 bg-white rounded-2xl border shadow-sm space-y-3">
            <div className="text-xs font-black text-indigo-600 uppercase tracking-wider">1. Durum / Değerler</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">A Değeri</label>
                <input
                  type="number"
                  value={valA}
                  onChange={(e) => setValA(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-bold text-sm"
                  placeholder="A"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">B Değeri</label>
                <input
                  type="number"
                  value={valB}
                  onChange={(e) => setValB(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-bold text-sm"
                  placeholder="B"
                />
              </div>
            </div>
          </div>

          {/* Sağ Taraf (C ve X) */}
          <div className="p-4 bg-white rounded-2xl border shadow-sm space-y-3">
            <div className="text-xs font-black text-purple-600 uppercase tracking-wider">2. Durum / Değerler</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">C Değeri</label>
                <input
                  type="number"
                  value={valC}
                  onChange={(e) => setValC(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-bold text-sm"
                  placeholder="C"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Bilinmeyen (X)</label>
                <div className="w-full px-3 py-2 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-xl font-black text-sm text-center">
                  {resultX.toLocaleString('tr-TR', { maximumFractionDigits: 4 })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Result Highlight */}
        <div className="p-5 bg-indigo-600 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs text-indigo-200 font-bold uppercase tracking-wider">
              {type === 'dogru' ? 'Doğru Orantı Çözümü' : 'Ters Orantı Çözümü'}
            </div>
            <div className="text-2xl sm:text-3xl font-black mt-1">
              X = {resultX.toLocaleString('tr-TR', { maximumFractionDigits: 4 })}
            </div>
          </div>
          <button
            onClick={copyResult}
            className="px-4 py-2 bg-white text-indigo-900 text-xs font-bold rounded-xl shadow-sm hover:bg-indigo-50 transition-colors flex items-center gap-1.5 shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Kopyalandı' : 'X Değerini Kopyala'}</span>
          </button>
        </div>
      </div>

      {/* Adım Adım Açıklama */}
      <div className="p-4 bg-slate-50 rounded-2xl border text-xs text-slate-700 space-y-1.5 font-mono">
        <div className="font-bold text-slate-900">İşlem Basamakları:</div>
        {type === 'dogru' ? (
          <>
            <div>1. Formül (Çapraz / İçler-Dışlar Çarpımı): A × X = B × C</div>
            <div>2. Değerleri Yerine Koyma: {numA} × X = {numB} × {numC}</div>
            <div>3. Çarpım: {numA} × X = {(numB * numC).toFixed(2)}</div>
            <div>4. Bölme: X = {(numB * numC).toFixed(2)} / {numA} = <strong className="text-indigo-600">{resultX.toFixed(4).replace(/\.?0+$/, '')}</strong></div>
          </>
        ) : (
          <>
            <div>1. Formül (Ters Orantı Karşılıklı Çarpım): A × B = C × X</div>
            <div>2. Değerleri Yerine Koyma: {numA} × {numB} = {numC} × X</div>
            <div>3. Çarpım: {(numA * numB).toFixed(2)} = {numC} × X</div>
            <div>4. Bölme: X = {(numA * numB).toFixed(2)} / {numC} = <strong className="text-indigo-600">{resultX.toFixed(4).replace(/\.?0+$/, '')}</strong></div>
          </>
        )}
      </div>
    </div>
  );
}
