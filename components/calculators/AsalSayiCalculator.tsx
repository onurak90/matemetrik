'use client';

import React, { useState } from 'react';
import { ShieldCheck, Copy, Check } from 'lucide-react';

function isPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

function getDivisors(n: number): number[] {
  if (n <= 0) return [];
  const divisors: number[] = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      divisors.push(i);
      if (i * i !== n) divisors.push(n / i);
    }
  }
  return divisors.sort((a, b) => a - b);
}

export default function AsalSayiCalculator() {
  const [value, setValue] = useState<string>('97');
  const [copied, setCopied] = useState(false);

  const num = parseInt(value, 10) || 0;
  const prime = isPrime(num);
  const divisors = getDivisors(num);

  const copyResult = () => {
    navigator.clipboard.writeText(
      `${num} sayısı ${prime ? 'bir ASAL SAYIDIR' : 'ASAL DEĞİLDİR'}. Bölenleri: ${divisors.join(', ')}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">Kontrol Edilecek Sayı</label>
        <div className="relative max-w-md">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            placeholder="Örn: 97"
          />
        </div>
      </div>

      {/* Quick Presets */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold">
        <span className="text-slate-400">Deneyin:</span>
        {[2, 7, 13, 29, 51, 97, 101, 143].map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setValue(p.toString())}
            className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg border border-slate-200"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Result Card */}
      <div className={`p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
        prime
          ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
          : 'bg-rose-50/90 border-rose-300 text-rose-950'
      }`}>
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-bold uppercase tracking-wider">
            {prime ? '✨ Asallık Durumu: ASAL' : '❌ Asallık Durumu: BİLEŞİK (ASAL DEĞİL)'}
          </div>
          <div className="text-2xl sm:text-3xl font-black">
            {num} sayısı {prime ? 'bir Asal Sayıdır!' : 'bir Asal Sayı Değildir.'}
          </div>
          <p className="text-xs text-slate-600">
            {prime
              ? `Yalnızca 1'e ve kendisine (${num}) kalansız bölünür.`
              : num <= 1
              ? 'Asal sayılar 1’den büyük pozitif tam sayılardır.'
              : `${divisors.length} adet pozitif böleni vardır.`}
          </p>
        </div>

        <button
          onClick={copyResult}
          className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl border shadow-sm transition-colors flex items-center gap-1.5 shrink-0"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Kopyalandı' : 'Sonucu Kopyala'}</span>
        </button>
      </div>

      {/* Bölenler Listesi */}
      {divisors.length > 0 && (
        <div className="p-4 bg-slate-50 rounded-2xl border text-xs text-slate-700 space-y-2">
          <div className="font-bold text-slate-900">Pozitif Tam Bölenleri ({divisors.length} adet):</div>
          <div className="flex flex-wrap gap-1.5">
            {divisors.map((d) => (
              <span
                key={d}
                className={`px-2.5 py-1 rounded-lg border font-mono font-bold ${
                  d === 1 || d === num ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
