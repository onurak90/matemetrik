'use client';

import React, { useState } from 'react';
import { Receipt, Copy, Check } from 'lucide-react';

export default function KdvCalculator() {
  const [type, setType] = useState<'haric' | 'dahil'>('haric');
  const [amount, setAmount] = useState<string>('1000');
  const [rate, setRate] = useState<number>(20);
  const [customRate, setCustomRate] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const activeRate = customRate !== '' ? parseFloat(customRate) || 0 : rate;
  const numAmount = parseFloat(amount) || 0;

  let matrah = 0;
  let kdvAmount = 0;
  let totalAmount = 0;

  if (type === 'haric') {
    matrah = numAmount;
    kdvAmount = (matrah * activeRate) / 100;
    totalAmount = matrah + kdvAmount;
  } else {
    totalAmount = numAmount;
    matrah = totalAmount / (1 + activeRate / 100);
    kdvAmount = totalAmount - matrah;
  }

  const copyResult = () => {
    const text = `Matrah: ${matrah.toFixed(2)} TL | KDV (%${activeRate}): ${kdvAmount.toFixed(2)} TL | Toplam: ${totalAmount.toFixed(2)} TL`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Type Toggle */}
      <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl">
        <button
          onClick={() => setType('haric')}
          className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
            type === 'haric' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          KDV Hariç ➔ KDV Dahil Hesapla
        </button>
        <button
          onClick={() => setType('dahil')}
          className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
            type === 'dahil' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          KDV Dahil ➔ KDV Ayıkla (Hariç Bul)
        </button>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            {type === 'haric' ? 'KDV Hariç Tutar (Matrah - TL)' : 'KDV Dahil Tutar (Toplam - TL)'}
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="Örn: 1000"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">TL</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">KDV Oranı (%)</label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 10, 20].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setRate(r);
                  setCustomRate('');
                }}
                className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                  activeRate === r && customRate === ''
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                %{r}
              </button>
            ))}
            <input
              type="number"
              value={customRate}
              onChange={(e) => setCustomRate(e.target.value)}
              placeholder="Özel"
              className={`px-2 py-3 text-center text-xs font-bold border rounded-xl focus:outline-none ${
                customRate !== ''
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-slate-50 text-slate-700 border-slate-200'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500 font-bold">KDV Hariç (Matrah)</div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {matrah.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL
          </div>
        </div>

        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
          <div className="text-xs text-emerald-700 font-bold">Hesaplanan KDV Tutarı (%{activeRate})</div>
          <div className="text-xl sm:text-2xl font-black text-emerald-700 mt-1">
            +{kdvAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL
          </div>
        </div>

        <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 text-center">
          <div className="text-xs text-slate-300 font-bold">Genel Toplam (KDV Dahil)</div>
          <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
            {totalAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={copyResult}
          className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border shadow-sm transition-colors flex items-center gap-1.5"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Kopyalandı' : 'Detayları Kopyala'}</span>
        </button>
      </div>

      {/* Formül Adımları */}
      <div className="p-4 bg-slate-50 rounded-2xl border text-xs text-slate-700 space-y-1.5 font-mono">
        <div className="font-bold text-slate-900">İşlem Basamakları:</div>
        {type === 'haric' ? (
          <>
            <div>1. KDV Tutarı = Matrah × (Oran / 100) = {matrah.toFixed(2)} × ({activeRate} / 100) = {kdvAmount.toFixed(2)} TL</div>
            <div>2. KDV Dahil Tutar = Matrah + KDV Tutarı = {matrah.toFixed(2)} + {kdvAmount.toFixed(2)} = <strong className="text-emerald-700 font-bold">{totalAmount.toFixed(2)} TL</strong></div>
          </>
        ) : (
          <>
            <div>1. Matrah = KDV Dahil / (1 + Oran / 100) = {totalAmount.toFixed(2)} / {(1 + activeRate / 100).toFixed(2)} = <strong className="text-emerald-700 font-bold">{matrah.toFixed(2)} TL</strong></div>
            <div>2. KDV Tutarı = KDV Dahil - Matrah = {totalAmount.toFixed(2)} - {matrah.toFixed(2)} = {kdvAmount.toFixed(2)} TL</div>
          </>
        )}
      </div>
    </div>
  );
}
