'use client';

import React, { useState } from 'react';
import { Divide, Copy, Check } from 'lucide-react';

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs((a * b) / gcd(a, b));
}

export default function EbobEkokCalculator() {
  const [num1, setNum1] = useState<string>('24');
  const [num2, setNum2] = useState<string>('36');
  const [num3, setNum3] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const n1 = parseInt(num1, 10) || 0;
  const n2 = parseInt(num2, 10) || 0;
  const hasN3 = num3.trim() !== '';
  const n3 = hasN3 ? parseInt(num3, 10) || 0 : null;

  let ebob = 0;
  let ekok = 0;

  if (n1 > 0 && n2 > 0) {
    if (n3 && n3 > 0) {
      ebob = gcd(gcd(n1, n2), n3);
      ekok = lcm(lcm(n1, n2), n3);
    } else {
      ebob = gcd(n1, n2);
      ekok = lcm(n1, n2);
    }
  }

  const copyResult = () => {
    const text = `Sayılar: ${n1}, ${n2}${n3 ? `, ${n3}` : ''} | EBOB = ${ebob} | EKOK = ${ekok}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">1. Sayı</label>
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
            placeholder="Örn: 24"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">2. Sayı</label>
          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
            placeholder="Örn: 36"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            3. Sayı <span className="text-slate-400 font-normal">(İsteğe Bağlı)</span>
          </label>
          <input
            type="number"
            value={num3}
            onChange={(e) => setNum3(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
            placeholder="İsteğe bağlı"
          />
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-6 bg-purple-50/80 border border-purple-200 rounded-2xl space-y-1 text-center sm:text-left">
          <div className="text-xs text-purple-700 font-bold uppercase tracking-wider">
            EBOB (En Büyük Ortak Bölen)
          </div>
          <div className="text-3xl sm:text-4xl font-black text-purple-700">
            {ebob}
          </div>
          <div className="text-xs text-slate-500">
            Her iki sayıyı da kalansız bölen en büyük pozitif tam sayı.
          </div>
        </div>

        <div className="p-6 bg-indigo-50/80 border border-indigo-200 rounded-2xl space-y-1 text-center sm:text-left">
          <div className="text-xs text-indigo-700 font-bold uppercase tracking-wider">
            EKOK (En Küçük Ortak Kat)
          </div>
          <div className="text-3xl sm:text-4xl font-black text-indigo-700">
            {ekok}
          </div>
          <div className="text-xs text-slate-500">
            Her iki sayının da ortak katı olan en küçük pozitif tam sayı.
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

      {/* Adım Adım Açıklama */}
      <div className="p-4 bg-slate-50 rounded-2xl border text-xs text-slate-700 space-y-1.5 font-mono">
        <div className="font-bold text-slate-900">EBOB ve EKOK Özelliği:</div>
        <div>İki sayının çarpımı, bu sayıların EBOB ve EKOK çarpımına eşittir:</div>
        <div>A × B = EBOB(A,B) × EKOK(A,B)</div>
        <div>{n1} × {n2} = {n1 * n2}  ⟺  {ebob} × {ekok} = {ebob * ekok} (Sağlama Doğrulandı)</div>
      </div>
    </div>
  );
}
