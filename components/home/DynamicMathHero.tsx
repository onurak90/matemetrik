'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Search, Sparkles, Compass, Zap } from 'lucide-react';
import LiveSearchBox from '@/components/search/LiveSearchBox';

interface DynamicMathHeroProps {
  searchQuery?: string;
}

// Mathematical formulas and symbols orbiting in space
const ORBITING_FORMULAS = [
  { text: 'e^(iπ) + 1 = 0', label: 'Euler Özdeşliği', speed: 38, radius: 'min(460px, 46vw)', angle: 0 },
  { text: '∫ e^(-x²)dx = √π/2', label: 'Gauss İntegrali', speed: 44, radius: 'min(380px, 38vw)', angle: 45 },
  { text: 'a² + b² = c²', label: 'Pisagor Teoremi', speed: 32, radius: 'min(310px, 31vw)', angle: 120 },
  { text: 'Δ = b² - 4ac', label: 'Diskriminant', speed: 48, radius: 'min(440px, 44vw)', angle: 190 },
  { text: '∑ 1/n² = π²/6', label: 'Basel Problemi', speed: 40, radius: 'min(360px, 36vw)', angle: 240 },
  { text: 'sin²θ + cos²θ = 1', label: 'Trigonometri', speed: 35, radius: 'min(290px, 29vw)', angle: 290 },
  { text: 'lim (sin x)/x = 1', label: 'Özel Limit', speed: 42, radius: 'min(420px, 42vw)', angle: 150 },
  { text: 'φ = (1+√5)/2', label: 'Altın Oran', speed: 36, radius: 'min(340px, 34vw)', angle: 80 },
];

const ROTATING_WORDS = [
  'Hedefine Ulaş.',
  'Formülleri Keşfet.',
  'Sınavları Kazan.',
  'Zirveye Çık.',
  'Mantığını Anla.',
];

export default function DynamicMathHero({ searchQuery }: DynamicMathHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Rotating target word animation
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Track mouse movement for subtle 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Canvas background with orbiting math symbols & particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Math symbol particles
    const symbols = ['π', '∑', '∫', '√x', '∞', 'Δ', 'θ', 'λ', 'μ', 'α', 'β', 'f(x)', 'lim', 'd/dx', '≈', '≠', '≤', '≥', 'φ', 'Ω'];
    const particles = Array.from({ length: 45 }, (_, i) => {
      const radiusX = 140 + Math.random() * (width * 0.42);
      const radiusY = radiusX * (0.35 + Math.random() * 0.2); // Elliptical orbit
      const speed = (0.0004 + Math.random() * 0.0008) * (Math.random() > 0.5 ? 1 : -1);
      const angle = Math.random() * Math.PI * 2;
      const size = 11 + Math.random() * 9;
      const symbol = symbols[i % symbols.length];
      const opacity = 0.15 + Math.random() * 0.35;
      const color = ['#818cf8', '#a855f7', '#38bdf8', '#c084fc', '#60a5fa'][i % 5];

      return {
        radiusX,
        radiusY,
        speed,
        angle,
        size,
        symbol,
        opacity,
        color,
      };
    });

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2 - 20;

      // Draw subtle orbital rings
      [width * 0.22, width * 0.32, width * 0.42].forEach((rx, idx) => {
        const ry = rx * 0.38;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = idx === 1 ? 'rgba(99, 102, 241, 0.12)' : 'rgba(129, 140, 248, 0.06)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw and update orbiting math particles
      particles.forEach((p) => {
        p.angle += p.speed;

        // Position on ellipse
        const x = centerX + Math.cos(p.angle) * p.radiusX;
        const y = centerY + Math.sin(p.angle) * p.radiusY;

        // Depth perspective (closer elements are slightly brighter and larger)
        const depth = (Math.sin(p.angle) + 1) / 2; // 0 to 1
        const scale = 0.8 + depth * 0.4;
        const alpha = p.opacity * (0.6 + depth * 0.6);

        ctx.save();
        ctx.font = `bold ${Math.round(p.size * scale)}px 'Segoe UI', Roboto, sans-serif`;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = depth > 0.6 ? 8 : 0;
        ctx.fillText(p.symbol, x, y);
        ctx.restore();
      });

      time++;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 text-white pt-16 pb-24 sm:pt-24 sm:pb-36 select-none"
    >
      {/* Background Matrix/Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Radial Gradient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HTML5 Dynamic Orbiting Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* 3D Orbiting Math Badges Layer */}
      <div
        className="absolute inset-0 pointer-events-none z-10 hidden md:block overflow-hidden"
        style={{
          transform: `perspective(1000px) rotateY(${mousePos.x * 4}deg) rotateX(${-mousePos.y * 4}deg)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        {ORBITING_FORMULAS.map((item, idx) => {
          return (
            <div
              key={idx}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: item.radius,
                height: item.radius,
                animation: `spinOrbit ${item.speed}s linear infinite`,
                animationDelay: `-${idx * 5}s`,
              }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-indigo-500/30 text-indigo-200 text-xs font-mono shadow-lg shadow-indigo-950/50 flex items-center gap-1.5 hover:border-indigo-400 hover:text-white transition-colors"
                style={{
                  animation: `counterSpin ${item.speed}s linear infinite`,
                  animationDelay: `-${idx * 5}s`,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                <span className="font-bold tracking-tight">{item.text}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hero Content Box */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
        {/* Portal Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-xs font-semibold backdrop-blur-md shadow-lg shadow-indigo-950/30 hover:bg-indigo-500/30 transition-colors">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Yeni Nesil Matematik &amp; Eğitim Portalı</span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          <span className="text-indigo-200 font-mono text-[11px] hidden sm:inline">π = 3.14159...</span>
        </div>

        {/* Dynamic Interactive Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Matematiği Keşfet, Anla ve{' '}
          <span className="inline-block relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 animate-pulse">
              {ROTATING_WORDS[wordIndex]}
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
          1. sınıftan 12. sınıfa MEB ders kitabı çözümleri, yeni nesil soru kalıpları, karne görüşü üreticisi ve online sınav hazırlama araçları.
        </p>

        {/* Live Mathematical Formula Ticker (Visible on Mobile & Tablet) */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 md:hidden">
          {['f(x) = ax + b', 'sin²θ + cos²θ = 1', 'a² + b² = c²', 'Δ = b² - 4ac'].map((formula, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-800/60 text-indigo-300 text-[11px] font-mono shadow-sm"
            >
              {formula}
            </span>
          ))}
        </div>

        {/* Live Search Box */}
        <div className="relative max-w-2xl mx-auto shadow-2xl shadow-indigo-950/70">
          <LiveSearchBox variant="hero" defaultValue={searchQuery} />
        </div>

        {/* Quick Popular Keywords */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
          <span className="text-slate-400 font-medium">Popüler:</span>
          {['10. Sınıf', '9. Sınıf', 'Pi Sayısı', 'Karne Görüşü', 'MEB Çözümleri', '2027 AYT'].map((keyword) => (
            <Link
              key={keyword}
              href={`/?q=${encodeURIComponent(keyword)}`}
              className="px-3 py-1 rounded-lg bg-slate-900/80 hover:bg-indigo-950 hover:text-indigo-300 text-slate-300 border border-slate-800 hover:border-indigo-500/50 transition-all"
            >
              {keyword}
            </Link>
          ))}
        </div>
      </div>

      {/* Global CSS for orbiting animations */}
      <style jsx>{`
        @keyframes spinOrbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes counterSpin {
          from {
            transform: translate(-50%, 0) rotate(0deg);
          }
          to {
            transform: translate(-50%, 0) rotate(-360deg);
          }
        }
      `}</style>
    </section>
  );
}
