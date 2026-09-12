'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MessageCircle, Phone, Sparkles, X, ChevronUp } from 'lucide-react';

export default function StickyContactCta() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Expanded Popup Menu */}
      {open && (
        <div className="mb-3 bg-white p-4 rounded-2xl shadow-2xl border border-slate-200 w-72 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Matemetrik Destek &amp; Araçlar
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <a
              href="https://api.whatsapp.com/send?phone=905550000000&text=Merhaba%2C%20Matemetrik%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors font-semibold"
            >
              <div className="w-7 h-7 rounded-lg bg-[#25D366] text-white flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold">WhatsApp İletişim Hattı</div>
                <div className="text-[10px] text-emerald-600 font-normal">Hızlı yanıt &amp; Soru paylaşımı</div>
              </div>
            </a>

            <Link
              href="/karne-gorusu-ureticisi"
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-indigo-50 text-indigo-800 hover:bg-indigo-100 transition-colors font-semibold"
            >
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold">Karne Görüşü Robotu</div>
                <div className="text-[10px] text-indigo-600 font-normal">e-Okul için saniyeler içinde üret</div>
              </div>
            </Link>

            <Link
              href="/sinav-hazirlama-robotu"
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-amber-50 text-amber-900 hover:bg-amber-100 transition-colors font-semibold"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold">Sınav Hazırlama Robotu</div>
                <div className="text-[10px] text-amber-700 font-normal">MEB uyumlu yazılı kağıdı çıkar</div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs rounded-full shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all group"
      >
        <MessageCircle className="w-5 h-5 text-white animate-pulse" />
        <span className="hidden sm:inline">Hızlı İletişim &amp; Yardım</span>
      </button>
    </div>
  );
}
