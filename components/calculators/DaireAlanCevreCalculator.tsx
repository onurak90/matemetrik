'use client';

import React, { useState } from 'react';
import { Circle, Copy, Check } from 'lucide-react';

export default function DaireAlanCevreCalculator() {
  const [radius, setRadius] = useState<string>('7');
  const [angle, setAngle] = useState<string>('360');
  const [piChoice, setPiChoice] = useState<'standard' | 'three' | 'fraction'>('standard');
  const [copied, setCopied] = useState(false);

  const r = parseFloat(radius) || 0;
  const alpha = parseFloat(angle) || 360;

  const piVal = piChoice === 'three' ? 3 : piChoice === 'fraction' ? 22 / 7 : Math.PI;

  const area = piVal * r * r;
  const circumference = 2 * piVal * r;
  const sectorArea = (area * alpha) / 360;

  const copyResult = () => {
    navigator.clipboard.writeText(
      `Yarıçap r=${r} | Alan = ${area.toFixed(2)} br² | Çevre = ${circumference.toFixed(2)} br`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Yarıçap (r)</label>
          <input
            type="number"
            min="0"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            placeholder="Örn: 7"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Merkez Açı (α - Derece)</label>
          <input
            type="number"
            min="1"
            max="360"
            value={angle}
            onChange={(e) => setAngle(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            placeholder="360 (Tam daire)"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">π (Pi) Değeri</label>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setPiChoice('standard')}
              className={`py-2 text-xs font-bold rounded-lg ${
                piChoice === 'standard' ? 'bg-white text-cyan-700 shadow-sm' : 'text-slate-600'
              }`}
            >
              π ≈ 3.14
            </button>
            <button
              type="button"
              onClick={() => setPiChoice('three')}
              className={`py-2 text-xs font-bold rounded-lg ${
                piChoice === 'three' ? 'bg-white text-cyan-700 shadow-sm' : 'text-slate-600'
              }`}
            >
              π = 3
            </button>
            <button
              type="button"
              onClick={() => setPiChoice('fraction')}
              className={`py-2 text-xs font-bold rounded-lg ${
                piChoice === 'fraction' ? 'bg-white text-cyan-700 shadow-sm' : 'text-slate-600'
              }`}
            >
              22/7
            </button>
          </div>
        </div>
      </div>

      {/* Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-cyan-50/80 border border-cyan-200 rounded-2xl text-center space-y-1">
          <div className="text-xs text-cyan-800 font-bold uppercase tracking-wider">Daire Alanı (πr²)</div>
          <div className="text-3xl font-black text-cyan-900">
            {area.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} br²
          </div>
          <div className="text-xs text-slate-500 font-mono">Çap (2r) = {2 * r} br</div>
        </div>

        <div className="p-5 bg-blue-50/80 border border-blue-200 rounded-2xl text-center space-y-1">
          <div className="text-xs text-blue-800 font-bold uppercase tracking-wider">Çevre Uzunluğu (2πr)</div>
          <div className="text-3xl font-black text-blue-900">
            {circumference.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} br
          </div>
          <div className="text-xs text-slate-500 font-mono">Çember hattı uzunluğu</div>
        </div>

        <div className="p-5 bg-purple-50/80 border border-purple-200 rounded-2xl text-center space-y-1">
          <div className="text-xs text-purple-800 font-bold uppercase tracking-wider">Dilim Alanı ({alpha}°)</div>
          <div className="text-3xl font-black text-purple-900">
            {sectorArea.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} br²
          </div>
          <div className="text-xs text-slate-500 font-mono">(Alan × {alpha}) / 360</div>
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
