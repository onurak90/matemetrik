'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, X } from 'lucide-react';

export default function TopCtaBanner() {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <aside aria-label="Duyuru" className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white text-xs py-2.5 px-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 text-center flex-wrap">
          <span className="inline-flex items-center gap-1 font-bold bg-white/20 px-2 py-0.5 rounded-full text-[10px] tracking-wider uppercase backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-amber-300" /> Güncel
          </span>
          <span className="font-medium text-white">
            2025-2026 MEB Müfredatına Uygun Yazılı Soruları &amp; e-Okul Karne Görüşü Robotu Yayında!
          </span>
          <Link
            href="/karne-gorusu-ureticisi"
            className="font-bold underline underline-offset-2 hover:text-indigo-200 inline-flex items-center gap-0.5"
          >
            Hemen Dene <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setClosed(true)}
          className="p-1 text-white/70 hover:text-white rounded-md hover:bg-white/10 transition-colors"
          title="Kapat"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
