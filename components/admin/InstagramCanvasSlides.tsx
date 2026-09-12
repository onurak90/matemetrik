'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Download, Sparkles, Check, Copy, Palette, Eye, ArrowRight } from 'lucide-react';

export interface SlideData {
  slideNumber: number;
  tag: string;
  title: string;
  subtitle: string;
  badge: string;
  bulletPoints?: string[];
  cta?: string;
}

interface InstagramCanvasSlidesProps {
  slides: SlideData[];
  topic: string;
}

type ThemeType = 'neon-dark' | 'gradient' | 'minimal-light';

export default function InstagramCanvasSlides({ slides, topic }: InstagramCanvasSlidesProps) {
  const [theme, setTheme] = useState<ThemeType>('neon-dark');
  const [downloading, setDownloading] = useState(false);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  // Function to draw text wrapped on canvas
  const drawTextWrapped = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
    maxLines = 5
  ): number => {
    const words = text.split(' ');
    let line = '';
    let currentY = y;
    let lineCount = 0;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
        lineCount++;
        if (lineCount >= maxLines) {
          ctx.fillText(line + '...', x, currentY);
          return currentY + lineHeight;
        }
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
    return currentY + lineHeight;
  };

  // Draw 1080x1080 Slide on Canvas
  const drawSlide = (index: number, slide: SlideData) => {
    const canvas = canvasRefs.current[index];
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1080;
    const height = 1080;
    canvas.width = width;
    canvas.height = height;

    // 1. Background Theme
    if (theme === 'neon-dark') {
      // Midnight gradient
      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, '#090d16');
      bg.addColorStop(0.5, '#0f172a');
      bg.addColorStop(1, '#1e1b4b');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Radial neon glow
      const radial = ctx.createRadialGradient(width / 2, height / 2, 80, width / 2, height / 2, 540);
      radial.addColorStop(0, 'rgba(99, 102, 241, 0.22)');
      radial.addColorStop(0.7, 'rgba(168, 85, 247, 0.08)');
      radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      // Subtle grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const step = 60;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Border glow card
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.35)';
      ctx.lineWidth = 4;
      ctx.strokeRect(40, 40, width - 80, height - 80);
    } else if (theme === 'gradient') {
      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, '#4338ca');
      bg.addColorStop(0.5, '#6366f1');
      bg.addColorStop(1, '#a855f7');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Glow spots
      const radial = ctx.createRadialGradient(200, 200, 50, 200, 200, 400);
      radial.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
      radial.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);
    } else {
      // Minimal Light
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      // Subtle top banner
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, width, 140);

      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 6;
      ctx.strokeRect(30, 30, width - 60, height - 60);
    }

    // 2. Math Watermark Symbols in background
    ctx.save();
    ctx.font = 'bold 120px Georgia, serif';
    ctx.fillStyle = theme === 'minimal-light' ? 'rgba(99, 102, 241, 0.05)' : 'rgba(255, 255, 255, 0.04)';
    ctx.fillText('π', 880, 240);
    ctx.fillText('∑', 100, 880);
    ctx.fillText('∫', 880, 850);
    ctx.fillText('∞', 120, 350);
    ctx.restore();

    // 3. Header Bar: Logo & Slide Number
    const isDark = theme !== 'minimal-light';

    // Logo / Brand pill
    ctx.save();
    ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.12)' : '#eef2ff';
    ctx.beginPath();
    ctx.roundRect(80, 75, 260, 55, 28);
    ctx.fill();

    ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = isDark ? '#ffffff' : '#4338ca';
    ctx.fillText('π  matemetrik.com', 105, 111);
    ctx.restore();

    // Slide Counter (e.g. 1/3, 2/3, 3/3)
    ctx.save();
    ctx.fillStyle = isDark ? 'rgba(99, 102, 241, 0.25)' : '#e0e7ff';
    ctx.beginPath();
    ctx.roundRect(width - 190, 75, 110, 55, 28);
    ctx.fill();

    ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = isDark ? '#c7d2fe' : '#3730a3';
    ctx.textAlign = 'center';
    ctx.fillText(`${slide.slideNumber}/3`, width - 135, 111);
    ctx.restore();

    // 4. Topic Badge / Tag
    ctx.save();
    const tagText = (slide.badge || slide.tag || 'MATEMETRİK').toUpperCase();
    ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const tagMetrics = ctx.measureText(tagText);
    const tagWidth = tagMetrics.width + 40;

    ctx.fillStyle = '#6366f1';
    ctx.beginPath();
    ctx.roundRect(80, 210, tagWidth, 44, 22);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.fillText(tagText, 100, 240);
    ctx.restore();

    // 5. Main Heading (Title)
    ctx.save();
    ctx.font = '900 58px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
    ctx.textAlign = 'left';
    const nextY = drawTextWrapped(ctx, slide.title, 80, 320, 920, 72, 3);
    ctx.restore();

    // 6. Subtitle / Short Explanation
    ctx.save();
    ctx.font = '400 32px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = isDark ? '#cbd5e1' : '#475569';
    const subtitleY = drawTextWrapped(ctx, slide.subtitle, 80, nextY + 20, 920, 46, 3);
    ctx.restore();

    // 7. Bullet Points Card (if present)
    if (slide.bulletPoints && slide.bulletPoints.length > 0) {
      let cardY = Math.max(subtitleY + 30, 560);
      const cardHeight = Math.min(260, 920 - cardY);

      ctx.save();
      ctx.fillStyle = isDark ? 'rgba(15, 23, 42, 0.65)' : '#f8fafc';
      ctx.strokeStyle = isDark ? 'rgba(99, 102, 241, 0.3)' : '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(80, cardY, 920, cardHeight, 28);
      ctx.fill();
      ctx.stroke();

      // Bullets text
      slide.bulletPoints.slice(0, 3).forEach((bp, bIdx) => {
        const itemY = cardY + 60 + bIdx * 65;
        // Bullet circle
        ctx.fillStyle = '#818cf8';
        ctx.beginPath();
        ctx.arc(125, itemY - 8, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = '600 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = isDark ? '#e2e8f0' : '#1e293b';
        ctx.textAlign = 'left';
        ctx.fillText(bp, 155, itemY);
      });
      ctx.restore();
    }

    // 8. Bottom CTA Bar
    ctx.save();
    const ctaText = slide.cta || (slide.slideNumber === 3 ? 'Gönderiyi Kaydet 🔖' : 'Kaydır ➔');
    ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.1)' : '#f1f5f9';
    ctx.beginPath();
    ctx.roundRect(80, 950, 920, 65, 20);
    ctx.fill();

    ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = isDark ? '#ffffff' : '#334155';
    ctx.textAlign = 'left';
    ctx.fillText('💡 Çözümler & Soru Kalıpları', 110, 990);

    ctx.fillStyle = '#818cf8';
    ctx.textAlign = 'right';
    ctx.fillText(ctaText, 970, 990);
    ctx.restore();
  };

  // Re-render canvases when slides or theme changes
  useEffect(() => {
    if (slides && slides.length > 0) {
      slides.forEach((slide, idx) => {
        drawSlide(idx, slide);
      });
    }
  }, [slides, theme]);

  // Download individual slide
  const downloadSingleSlide = (index: number) => {
    const canvas = canvasRefs.current[index];
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `matemetrik-instagram-slide-${index + 1}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  // Download all 3 slides in sequence
  const downloadAllSlides = async () => {
    setDownloading(true);
    try {
      for (let i = 0; i < slides.length; i++) {
        downloadSingleSlide(i);
        await new Promise((r) => setTimeout(r, 400));
      }
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Theme Picker & Download All */}
      <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Palette className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Görsel Teması:
          </span>
          <div className="flex items-center gap-1.5">
            {[
              { id: 'neon-dark', label: '🌙 Gece Neon' },
              { id: 'gradient', label: '🎨 Degrade Canlı' },
              { id: 'minimal-light', label: '☀️ Minimal Beyaz' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id as ThemeType)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                  theme === t.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={downloadAllSlides}
          disabled={downloading}
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-indigo-600/30 flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>{downloading ? 'İndiriliyor...' : '3 Görseli Tek Tıkla İndir (PNG)'}</span>
        </button>
      </div>

      {/* Zero Disk Space Notice */}
      <div className="px-4 py-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs flex items-center gap-2">
        <Sparkles className="w-4 h-4 shrink-0 text-indigo-400" />
        <span>
          <strong>Sunucu Boyutu Koruma:</strong> Bu 1080x1080 görseller sunucu diskinde yer kaplamaz; tamamen tarayıcınızda canlı oluşturulur ve doğrudan cihazınıza indirilir.
        </span>
      </div>

      {/* 3 Slides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Slayt {index + 1} / 3
              </span>
              <button
                type="button"
                onClick={() => downloadSingleSlide(index)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 text-xs font-bold rounded-lg transition-colors"
                title="Görseli İndir"
              >
                <Download className="w-3.5 h-3.5" />
                <span>İndir</span>
              </button>
            </div>

            {/* Canvas Preview Container */}
            <div className="p-4 bg-slate-950 flex items-center justify-center">
              <canvas
                ref={(el) => {
                  canvasRefs.current[index] = el;
                }}
                className="w-full aspect-square rounded-xl shadow-lg border border-slate-800"
              />
            </div>

            {/* Slide Metadata */}
            <div className="p-4 space-y-2 text-xs text-slate-600">
              <div className="font-bold text-slate-900 line-clamp-1">{slide.title}</div>
              <div className="line-clamp-2 text-slate-500">{slide.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
