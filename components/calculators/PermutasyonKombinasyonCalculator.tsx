'use client';

import React, { useState } from 'react';
import { Shuffle, Copy, Check } from 'lucide-react';

function fact(n: number): number {
  if (n <= 1) return 1;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function perm(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  return fact(n) / fact(n - r);
}

function comb(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  return fact(n) / (fact(r) * fact(n - r));
}

export default function PermutasyonKombinasyonCalculator() {
  const [valN, setValN] = useState<string>('7');
  const [valR, setValR] = useState<string>('3');
  const [copied, setCopied] = useState(false);

  const n = parseInt(valN, 10) || 0;
  const r = parseInt(valR, 10) || 0;

  const valid = n >= 0 && r >= 0 && r <= n && n <= 25;

  const pRes = valid ? perm(n, r) : 0;
  const cRes = valid ? comb(n, r) : 0;

  const copyResult = () => {
    navigator.clipboard.writeText(`P(${n}, ${r}) = ${pRes} | C(${n}, ${r}) = ${cRes}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Kümenin Eleman Sayısı (n)</label>
          <input
            type="number"
            min="0"
            max="25"
            value={valN}
            onChange={(e) => setValN(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-pink-500 focus:outline-none"
            placeholder="Örn: 7"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Seçilecek / Dizilecek Eleman Sayısı (r)</label>
          <input
            type="number"
            min="0"
            max={n}
            value={valR}
            onChange={(e) => setValR(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-pink-500 focus:outline-none"
            placeholder="Örn: 3"
          />
        </div>
      </div>

      {!valid && (
        <div className="p-3 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl text-xs font-semibold">
          Lütfen 0 ≤ r ≤ n şartını sağlayınız (r sayısı n sayısından büyük olamaz).
        </div>
      )}

      {/* Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Permütasyon */}
        <div className="p-6 bg-pink-50/80 border border-pink-200 rounded-2xl space-y-2">
          <div className="text-xs text-pink-700 font-bold uppercase tracking-wider">
            Permütasyon (Sıralama) - P(n, r)
          </div>
          <div className="text-3xl sm:text-4xl font-black text-pink-700">
            P({n}, {r}) = {pRes.toLocaleString('tr-TR')}
          </div>
          <div className="text-xs text-slate-500 font-mono">
            Formül: {n}! / ({n}-{r})! = {fact(n)} / {fact(n - r)}
          </div>
          <div className="text-[11px] text-slate-600">
            Elemanların seçilme sırası önemlidir (Örn: şifre, yarışma dereceleri).
          </div>
        </div>

        {/* Kombinasyon */}
        <div className="p-6 bg-purple-50/80 border border-purple-200 rounded-2xl space-y-2">
          <div className="text-xs text-purple-700 font-bold uppercase tracking-wider">
            Kombinasyon (Seçme / Alt Küme) - C(n, r)
          </div>
          <div className="text-3xl sm:text-4xl font-black text-purple-700">
            C({n}, {r}) = {cRes.toLocaleString('tr-TR')}
          </div>
          <div className="text-xs text-slate-500 font-mono">
            Formül: {n}! / ({r}! × ({n}-{r})!) = {fact(n)} / ({fact(r)} × {fact(n - r)})
          </div>
          <div className="text-[11px] text-slate-600">
            Sıra önemsizdir, yalnızca hangi elemanların seçildiği önemlidir (Örn: takım seçimi).
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={copyResult}
          className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl border shadow-sm transition-colors flex items-center gap-1.5"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Kopyalandı' : 'Sonuçları Kopyala'}</span>
        </button>
      </div>
    </div>
  );
}
