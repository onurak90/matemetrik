'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, BookOpen, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';

interface Slide {
  id: number;
  tag: string;
  tagColor: string;
  title: string;
  subtitle: string;
  href: string;
  ctaText: string;
  bgGradient: string;
  badge: string;
}

const slides: Slide[] = [
  {
    id: 1,
    tag: 'ΣΤ\' ΔΗΜΟΤΙΚΟΥ • ΜΑΘΗΜΑΤΙΚΑ',
    tagColor: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
    title: 'Μαθηματικά ΣΤ\' Δημοτικού — Λύσεις & Απαντήσεις',
    subtitle: 'Αναλυτικές επεξηγήσεις βήμα-βήμα για όλες τις ασκήσεις του Βιβλίου Μαθητή και του Τετραδίου Εργασιών. Πλήρης κάλυψη του επίσημου προγράμματος του ΥΠΑΙΘΑ.',
    href: '/gr/vivlia/st-dimotikou/mathimatika',
    ctaText: 'Δείτε τις Λύσεις ανά Σελίδα',
    bgGradient: 'from-blue-950 via-slate-900 to-indigo-950',
    badge: '★ Δημοφιλέστερο',
  },
  {
    id: 2,
    tag: 'Α\' ΛΥΚΕΙΟΥ • ΑΛΓΕΒΡΑ & ΓΕΩΜΕΤΡΙΑ',
    tagColor: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
    title: 'Άλγεβρα Α\' Λυκείου — Εξισώσεις & Ανισώσεις 2ου Βαθμού',
    subtitle: 'Μεθοδολογία εύρεσης ριζών με διακρίνουσα, τύποι Vieta, πρόσημο τριωνύμου και αναλυτικά λυμένες ασκήσεις Τράπεζας Θεμάτων.',
    href: '/gr/vivlia/a-lykeiou/algebra',
    ctaText: 'Μελέτη Θεμάτων & Ασκήσεων',
    bgGradient: 'from-purple-950 via-slate-900 to-slate-950',
    badge: 'Τράπεζα Θεμάτων',
  },
  {
    id: 3,
    tag: 'ΨΗΦΙΑΚΟ ΣΧΟΛΕΙΟ • EBOOKS.EDU.GR',
    tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
    title: 'Όλα τα Σχολικά Βιβλία σε Ψηφιακή Μορφή (PDF)',
    subtitle: 'Άμεση πρόσβαση στα επίσημα διδακτικά πακέτα του ΙΤΥΕ «Διόφαντος» και του Υπουργείου Παιδείας. Κατεβάστε ή διαβάστε online.',
    href: '/gr/pdf-vivlia',
    ctaText: 'Κατάλογος Βιβλίων PDF',
    bgGradient: 'from-emerald-950 via-slate-900 to-teal-950',
    badge: '100% Δωρεάν',
  },
  {
    id: 4,
    tag: 'Α\' ΓΥΜΝΑΣΙΟΥ • ΜΑΘΗΜΑΤΙΚΑ & ΦΥΣΙΚΗ',
    tagColor: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
    title: 'Μαθηματικά & Φυσική Α\' Γυμνασίου',
    subtitle: 'Κλάσματα, δεκαδικοί, εξισώσεις και μετρήσεις φυσικών μεγεθών. Κατανοήστε τη θεωρία μέσα από πρακτικά παραδείγματα.',
    href: '/gr/vivlia/a-gymnasiou/mathimatika',
    ctaText: 'Εξερευνήστε τις Λύσεις',
    bgGradient: 'from-amber-950 via-slate-900 to-slate-950',
    badge: 'Νέα Ύλη',
  },
];

export default function GreekHeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl font-sans">
      <div className={`p-8 sm:p-14 bg-gradient-to-br ${slide.bgGradient} text-white min-h-[380px] sm:min-h-[440px] flex flex-col justify-between transition-all duration-700`}>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-3">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black border backdrop-blur-md ${slide.tagColor}`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>{slide.tag}</span>
          </div>

          <span className="px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-extrabold border border-white/20">
            {slide.badge}
          </span>
        </div>

        {/* Center Content */}
        <div className="space-y-4 my-6 max-w-3xl">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {slide.title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
            {slide.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href={slide.href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-blue-600/30 transition-all hover:scale-102"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="http://ebooks.edu.gr/ebooks/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all"
            >
              <span>Επίσημο PDF ebooks.edu.gr</span>
              <ExternalLink className="w-4 h-4 text-slate-300" />
            </a>
          </div>
        </div>

        {/* Bottom Pagination & Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrent(idx)}
                aria-label={`Μετάβαση στη διαφάνεια ${idx + 1}`}
                className={`transition-all ${
                  idx === current
                    ? 'w-8 h-2.5 bg-blue-500 rounded-full'
                    : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/50 rounded-full'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
              aria-label="Προηγούμενη διαφάνεια"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
              aria-label="Επόμενη διαφάνεια"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
