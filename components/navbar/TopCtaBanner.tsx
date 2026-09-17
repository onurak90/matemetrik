'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, X, Calendar, FileQuestion, Users, Award } from 'lucide-react';

interface ToolAnnouncement {
  id: string;
  badge: string;
  title: string;
  link: string;
  cta: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

const ANNOUNCEMENTS: ToolAnnouncement[] = [
  {
    id: 'yillik-plan',
    badge: 'YENİ',
    title: '2026-2027 MEB Maarif Modeli Matematik & Tüm Dersler Yıllık Plan Hazırlama Robotu Yayında!',
    link: '/yillik-plan-hazirlama',
    cta: 'Planını Oluştur',
    icon: Calendar,
    gradient: 'from-emerald-700 via-teal-600 to-indigo-700',
  },
  {
    id: 'soru-hazirlama',
    badge: 'GÜNCEL',
    title: 'MEB Formatında Açık Uçlu Soru & Yazılı Kağıdı Hazırlama Robotu Yayında!',
    link: '/soru-hazirlama',
    cta: 'Sınav Hazırla',
    icon: FileQuestion,
    gradient: 'from-indigo-700 via-indigo-600 to-purple-700',
  },
  {
    id: 'kulup-evraklari',
    badge: 'YENİ',
    title: '2026-2027 Sosyal Kulüp Toplantı Tutanakları, Faaliyet ve Yıllık Çalışma Planları Yayında!',
    link: '/kulup-toplanti-tutanaklari',
    cta: 'Evrakları Al',
    icon: Users,
    gradient: 'from-blue-700 via-indigo-600 to-violet-700',
  },
  {
    id: 'karne-gorusu',
    badge: 'POPÜLER',
    title: 'Yapay Zeka Destekli MEB e-Okul Karne Görüşü ve Öğrenci Değerlendirme Robotu Yayında!',
    link: '/karne-gorusu-ureticisi',
    cta: 'Görüş Üret',
    icon: Award,
    gradient: 'from-purple-700 via-fuchsia-600 to-indigo-700',
  },
];

export default function TopCtaBanner() {
  const [closed, setClosed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fadeAnim, setFadeAnim] = useState(true);

  useEffect(() => {
    if (closed || isPaused) return;

    const timer = setInterval(() => {
      setFadeAnim(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
        setFadeAnim(true);
      }, 250);
    }, 4000);

    return () => clearInterval(timer);
  }, [closed, isPaused]);

  if (closed) return null;

  const current = ANNOUNCEMENTS[currentIndex];
  const Icon = current.icon;

  return (
    <aside
      aria-label="Duyuru ve Öğretmen Araçları"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`bg-gradient-to-r ${current.gradient} text-white text-xs py-2 px-4 relative z-50 transition-colors duration-500 shadow-sm`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Navigation Indicator Dots (Desktop) */}
        <div className="hidden md:flex items-center gap-1 shrink-0">
          {ANNOUNCEMENTS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setFadeAnim(false);
                setTimeout(() => {
                  setCurrentIndex(idx);
                  setFadeAnim(true);
                }, 150);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
              title={item.title}
              aria-label={`Duyuru ${idx + 1}`}
            />
          ))}
        </div>

        {/* Content */}
        <div
          className={`flex-1 flex items-center justify-center gap-2 text-center flex-wrap transition-opacity duration-300 ${
            fadeAnim ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="inline-flex items-center gap-1 font-bold bg-white/20 px-2 py-0.5 rounded-full text-[10px] tracking-wider uppercase backdrop-blur-sm shrink-0">
            <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" /> {current.badge}
          </span>

          <span className="inline-flex items-center gap-1.5 font-medium text-white text-xs sm:text-[13px]">
            <Icon className="w-3.5 h-3.5 text-white/90 hidden sm:inline-block" />
            <span>{current.title}</span>
          </span>

          <Link
            href={current.link}
            className="font-bold underline underline-offset-2 hover:text-amber-200 inline-flex items-center gap-0.5 text-xs sm:text-[13px] bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded-lg transition-colors ml-1"
          >
            {current.cta} <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={() => setClosed(true)}
          className="p-1 text-white/70 hover:text-white rounded-md hover:bg-white/10 transition-colors shrink-0"
          title="Bildirimi Kapat"
          aria-label="Kapat"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
