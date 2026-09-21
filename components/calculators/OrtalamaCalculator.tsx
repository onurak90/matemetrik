'use client';

import React, { useState } from 'react';
import { BarChart2, Copy, Check } from 'lucide-react';

export default function OrtalamaCalculator() {
  const [inputStr, setInputStr] = useState<string>('70, 85, 90, 85, 100');
  const [copied, setCopied] = useState(false);

  // Parse numbers
  const nums = inputStr
    .split(/[\s,;]+/)
    .map((s) => parseFloat(s.trim()))
    .filter((n) => !isNaN(n));

  const n = nums.length;

  let sum = 0;
  let mean = 0;
  let median = 0;
  let modeStr = 'Yok';
  let geoMean = 0;
  let minVal = 0;
  let maxVal = 0;

  if (n > 0) {
    sum = nums.reduce((acc, curr) => acc + curr, 0);
    mean = sum / n;
    minVal = Math.min(...nums);
    maxVal = Math.max(...nums);

    // Median
    const sorted = [...nums].sort((a, b) => a - b);
    const mid = Math.floor(n / 2);
    median = n % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

    // Mode
    const freq: Record<number, number> = {};
    let maxFreq = 0;
    nums.forEach((val) => {
      freq[val] = (freq[val] || 0) + 1;
      if (freq[val] > maxFreq) maxFreq = freq[val];
    });
    if (maxFreq > 1) {
      const modes = Object.keys(freq).filter((k) => freq[parseFloat(k)] === maxFreq);
      modeStr = modes.join(', ');
    }

    // Geometric Mean (for positive numbers)
    const allPositive = nums.every((x) => x > 0);
    if (allPositive) {
      const logSum = nums.reduce((acc, curr) => acc + Math.log(curr), 0);
      geoMean = Math.exp(logSum / n);
    }
  }

  const copyResult = () => {
    navigator.clipboard.writeText(
      `Aritmetik Ortalama = ${mean.toFixed(2)} | Medyan = ${median} | Mod = ${modeStr}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">
          Sayıları Girin <span className="text-slate-400 font-normal">(Virgül veya boşluk ile ayırın)</span>
        </label>
        <textarea
          rows={3}
          value={inputStr}
          onChange={(e) => setInputStr(e.target.value)}
          className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          placeholder="Örn: 70, 85, 90, 85, 100"
        />
      </div>

      {/* Quick Presets */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold">
        <span className="text-slate-400">Örnekler:</span>
        <button
          type="button"
          onClick={() => setInputStr('50, 60, 70, 80, 90')}
          className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 rounded-lg border"
        >
          Notlar: 50, 60, 70, 80, 90
        </button>
        <button
          type="button"
          onClick={() => setInputStr('2, 4, 8, 16, 32')}
          className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 rounded-lg border"
        >
          Geometrik Dizi: 2, 4, 8, 16, 32
        </button>
      </div>

      {n === 0 ? (
        <div className="p-4 bg-slate-100 text-slate-500 rounded-2xl text-xs text-center">
          Lütfen hesaplama için en az bir geçerli sayı giriniz.
        </div>
      ) : (
        <div className="space-y-4">
          {/* Main 3 Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-emerald-50/90 border border-emerald-200 rounded-2xl text-center space-y-1">
              <div className="text-xs text-emerald-800 font-bold uppercase tracking-wider">Aritmetik Ortalama</div>
              <div className="text-3xl font-black text-emerald-900">
                {mean.toLocaleString('tr-TR', { maximumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-slate-500 font-mono">Toplam: {sum} / {n}</div>
            </div>

            <div className="p-5 bg-indigo-50/90 border border-indigo-200 rounded-2xl text-center space-y-1">
              <div className="text-xs text-indigo-800 font-bold uppercase tracking-wider">Medyan (Ortanca)</div>
              <div className="text-3xl font-black text-indigo-900">
                {median.toLocaleString('tr-TR', { maximumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-slate-500 font-mono">Sıralı dizinin ortası</div>
            </div>

            <div className="p-5 bg-purple-50/90 border border-purple-200 rounded-2xl text-center space-y-1">
              <div className="text-xs text-purple-800 font-bold uppercase tracking-wider">Mod (Tepe Değer)</div>
              <div className="text-3xl font-black text-purple-900">
                {modeStr}
              </div>
              <div className="text-xs text-slate-500 font-mono">En çok tekrar eden</div>
            </div>
          </div>

          {/* Secondary Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-700">
            <div className="p-3 bg-slate-50 rounded-xl border text-center">
              <div className="text-slate-400 font-bold">Eleman Sayısı (n)</div>
              <div className="text-lg font-black text-slate-900">{n}</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border text-center">
              <div className="text-slate-400 font-bold">Toplam (∑)</div>
              <div className="text-lg font-black text-slate-900">{sum}</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border text-center">
              <div className="text-slate-400 font-bold">Min - Max</div>
              <div className="text-lg font-black text-slate-900">{minVal} - {maxVal}</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border text-center">
              <div className="text-slate-400 font-bold">Geometrik Ortalama</div>
              <div className="text-lg font-black text-slate-900">{geoMean > 0 ? geoMean.toFixed(2) : '-'}</div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={copyResult}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl border shadow-sm transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Kopyalandı' : 'Ortalamayı Kopyala'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
