'use client';

import React, { useEffect } from 'react';
import { Download, Sparkles, FileText, CheckCircle2 } from 'lucide-react';

interface AdsterraSmartLinkCtaProps {
  smartLink?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  buttonText?: string;
  className?: string;
}

export default function AdsterraSmartLinkCta({
  smartLink = 'https://araplhn.org/4/102a74e644a5d32555e92e2872366185',
  title = 'Konu Özeti, Formül Kağıdı & PDF Test Materyalleri',
  subtitle = '2024-2025 MEB müfredatına tam uyumlu kazanım testlerini, ders özetlerini ve A4 yazdırılabilir çalışma yapraklarını tek tıkla cihazınıza indirebilirsiniz.',
  badge = 'Ücretsiz Eğitim Materyali (PDF)',
  buttonText = 'Hemen İndir (PDF & Çalışma Notu)',
  className = '',
}: AdsterraSmartLinkCtaProps) {

  // Auto-monetize any existing PDF download buttons inside the article
  useEffect(() => {
    if (!smartLink) return;

    const handleDownloadClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const link = target.closest('a') as HTMLAnchorElement | null;
      if (!link) return;

      // Check if it is a download link or points to a pdf
      const href = link.getAttribute('href') || '';
      const hasDownloadAttr = link.hasAttribute('download');
      const isPdfLink = href.toLowerCase().endsWith('.pdf') || href.toLowerCase().includes('/uploads/');

      // If it's a real download link and not the ad smartlink itself
      if ((hasDownloadAttr || isPdfLink) && !href.includes('araplhn.org')) {
        // Open the smartlink in background/new tab while letting the real file download!
        try {
          window.open(smartLink, '_blank', 'noopener,noreferrer');
        } catch {
          // ignore popup blocker
        }
      }
    };

    document.addEventListener('click', handleDownloadClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleDownloadClick, { capture: true });
    };
  }, [smartLink]);

  if (!smartLink) return null;

  return (
    <div
      className={`not-prose my-8 p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-indigo-500/20 relative overflow-hidden ${className}`}
    >
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            {badge}
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            MEB Müfredatı &bull; Doğrudan Erişim
          </span>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400 shrink-0" />
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300 pt-1">
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>A4 Yazdırılabilir PDF</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>Kazanım Odaklı Sorular</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Ücretsiz &amp; Hızlı İndir</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <a
            href={smartLink}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all transform hover:scale-[1.02] active:scale-[0.99]"
          >
            <Download className="w-4 h-4 animate-bounce" />
            <span>{buttonText}</span>
          </a>
          <span className="text-[11px] text-slate-400 text-center sm:text-left">
            Dosya yeni sekmede güvenle açılacaktır.
          </span>
        </div>
      </div>
    </div>
  );
}
