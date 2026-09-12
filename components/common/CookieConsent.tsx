'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, Check, X } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('matemetrik_cookie_consent');
      if (!consent) {
        // Delay slightly for smooth entrance
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // localStorage disabled / private mode
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('matemetrik_cookie_consent', 'accepted');
    } catch (e) {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Çerez Onay Bildirimi"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-5 rounded-2xl shadow-2xl border border-slate-700/80 space-y-3.5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Cookie className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-white tracking-wide uppercase">
              Çerez Tercihleri &amp; Gizlilik
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sitemizde gezinme deneyiminizi zenginleştirmek, analitik veriler toplamak ve Google AdSense gibi reklam ortaklarımızla uyumlu çalışmak amacıyla çerezler kullanılmaktadır.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-1 text-[11px]">
          <div className="flex items-center gap-2 text-slate-400">
            <Link
              href="/cerez-politikasi"
              className="underline hover:text-white transition-colors"
            >
              Çerez Politikası
            </Link>
            <span>&bull;</span>
            <Link
              href="/gizlilik-politikasi"
              className="underline hover:text-white transition-colors"
            >
              Gizlilik
            </Link>
          </div>

          <button
            type="button"
            onClick={handleAccept}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-indigo-600/30"
          >
            <Check className="w-3.5 h-3.5" />
            Kabul Et
          </button>
        </div>
      </div>
    </aside>
  );
}
