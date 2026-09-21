'use client';

import React, { useState } from 'react';

interface PostCoverImageProps {
  src?: string | null;
  alt: string;
  title: string;
  category?: string;
  className?: string;
  aspectRatio?: '16/9' | '4/3' | 'video' | 'auto';
  fill?: boolean;
}

// Category and subject matching for theme gradients
function getCategoryTheme(cat?: string, title?: string) {
  const text = `${cat || ''} ${title || ''}`.toLowerCase();
  
  if (text.includes('fen') || text.includes('biyoloji') || text.includes('kimya')) {
    return {
      gradient: 'from-emerald-950 via-teal-900 to-slate-950',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
      accentColor: '#34d399',
      icon: '🔬',
    };
  }
  if (text.includes('fizik')) {
    return {
      gradient: 'from-sky-950 via-cyan-900 to-slate-950',
      badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-400/30',
      accentColor: '#38bdf8',
      icon: '⚡',
    };
  }
  if (text.includes('türkçe') || text.includes('edebiyat')) {
    return {
      gradient: 'from-rose-950 via-pink-900 to-slate-950',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-400/30',
      accentColor: '#fb7185',
      icon: '📖',
    };
  }
  if (text.includes('sosyal') || text.includes('tarih') || text.includes('cografya') || text.includes('coğrafya') || text.includes('inkılap')) {
    return {
      gradient: 'from-amber-950 via-orange-900 to-slate-950',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
      accentColor: '#fbbf24',
      icon: '🌍',
    };
  }
  if (text.includes('yds') || text.includes('ingilizce')) {
    return {
      gradient: 'from-teal-950 via-cyan-900 to-slate-950',
      badgeBg: 'bg-teal-500/20 text-teal-300 border-teal-400/30',
      accentColor: '#2dd4bf',
      icon: '🇬🇧',
    };
  }
  if (text.includes('ales') || text.includes('lgs') || text.includes('yks') || text.includes('ayt') || text.includes('tyt')) {
    return {
      gradient: 'from-purple-950 via-indigo-900 to-slate-950',
      badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
      accentColor: '#c084fc',
      icon: '🎯',
    };
  }

  // Default Matematik / Genel theme
  return {
    gradient: 'from-slate-950 via-indigo-950 to-slate-900',
    badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30',
    accentColor: '#818cf8',
    icon: '📐',
  };
}

export default function PostCoverImage({
  src,
  alt,
  title,
  category,
  className = '',
  aspectRatio = '16/9',
}: PostCoverImageProps) {
  const [hasError, setHasError] = useState(false);
  const theme = getCategoryTheme(category, title);

  // Short clean title for the cover
  const shortTitle = title
    .replace(/^2026-2027\s*MEB\s*/i, '')
    .replace(/\s*Ders Kitabı Cevapları\s*/i, '')
    .trim();

  const isAspect169 = aspectRatio === '16/9';

  if (!src || hasError) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${theme.gradient} p-5 sm:p-6 flex flex-col justify-between select-none ${
          isAspect169 ? 'aspect-[16/9]' : ''
        } ${className}`}
      >
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Ambient Glow */}
        <div
          className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: theme.accentColor }}
        />

        {/* Header: Category Badge & Icon */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider border backdrop-blur-sm ${theme.badgeBg}`}
          >
            {category || 'Ders Notu'}
          </span>
          <span className="text-xl opacity-80 select-none">{theme.icon}</span>
        </div>

        {/* Center: Topic Title */}
        <div className="relative z-10 my-auto py-2">
          <h3 className="font-black text-white text-base sm:text-lg lg:text-xl line-clamp-2 leading-snug drop-shadow-sm tracking-tight">
            {shortTitle || title}
          </h3>
          <p className="text-[11px] text-slate-300 font-semibold mt-1">
            MEB Müfredatı &bull; Sayfa Çözümleri &bull; Konu Anlatımı
          </p>
        </div>

        {/* Footer: Brand Watermark */}
        <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5 font-bold text-white tracking-wide">
            <span
              className="w-4 h-4 rounded flex items-center justify-center text-[10px] font-black text-slate-900"
              style={{ backgroundColor: theme.accentColor }}
            >
              π
            </span>
            <span>matemetrik.com</span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">Öğretmen Onaylı</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || title}
      className={className}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}
