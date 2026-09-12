'use client';

import React, { useState } from 'react';
import { Mail, Copy, Check, ExternalLink } from 'lucide-react';

export default function ContactEmailBox() {
  const [copied, setCopied] = useState(false);
  const email = 'matemetrik@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
            <Mail className="w-3.5 h-3.5" /> Resmi İletişim Kanalı
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Doğrudan E-Posta Gönderin
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-md leading-relaxed">
            Platformumuz hakkında merak ettiğiniz her şeyi, telif bildirimlerini veya iş birliği taleplerinizi doğrudan bu adrese iletebilirsiniz.
          </p>
          <div className="pt-2">
            <span className="text-lg sm:text-2xl font-black font-mono text-indigo-300 select-all tracking-wide">
              {email}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <a
            href={`mailto:${email}?subject=Matemetrik%20%C4%B0leti%C5%9Fim`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Mail className="w-4 h-4" />
            E-posta Gönder
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm rounded-2xl transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Adresi Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
