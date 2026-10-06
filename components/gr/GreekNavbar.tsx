'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen, ChevronDown, Menu, X, Search, Sparkles,
  GraduationCap, FileText, Newspaper, ExternalLink, Moon, Sun
} from 'lucide-react';
import ThemeToggle from '@/components/theme/ThemeToggle';

export default function GreekNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const levelsMenu = [
    {
      title: 'Δημοτικό',
      href: '/gr/dimotiko',
      grades: [
        { name: 'Α\' Δημοτικού', href: '/gr/dimotiko#a-dimotikou' },
        { name: 'Β\' Δημοτικού', href: '/gr/dimotiko#b-dimotikou' },
        { name: 'Γ\' Δημοτικού', href: '/gr/dimotiko#g-dimotikou' },
        { name: 'Δ\' Δημοτικού', href: '/gr/dimotiko#d-dimotikou' },
        { name: 'Ε\' Δημοτικού', href: '/gr/dimotiko#e-dimotikou' },
        { name: 'ΣΤ\' Δημοτικού', href: '/gr/dimotiko#st-dimotikou' },
      ],
    },
    {
      title: 'Γυμνάσιο',
      href: '/gr/gymnasio',
      grades: [
        { name: 'Α\' Γυμνασίου', href: '/gr/gymnasio#a-gymnasiou' },
        { name: 'Β\' Γυμνασίου', href: '/gr/gymnasio#b-gymnasiou' },
        { name: 'Γ\' Γυμνασίου', href: '/gr/gymnasio#g-gymnasiou' },
      ],
    },
    {
      title: 'Λύκειο',
      href: '/gr/lykeio',
      grades: [
        { name: 'Α\' Λυκείου', href: '/gr/lykeio#a-lykeiou' },
        { name: 'Β\' Λυκείου', href: '/gr/lykeio#b-lykeiou' },
        { name: 'Γ\' Λυκείου (Πανελλαδικές)', href: '/gr/lykeio#g-lykeiou' },
      ],
    },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 font-sans ${
        scrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md border-b border-slate-200 dark:border-slate-800'
          : 'bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800'
      }`}
    >
      {/* Top Banner (Greek Ministry & ebooks.edu.gr tribute) */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white text-[11px] font-semibold py-1 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.2 bg-blue-500/40 rounded text-[10px] font-bold">ΕΛΛΑΔΑ</span>
            <span>Επίσημα Σχολικά Βιβλία ebooks.edu.gr &bull; Αναλυτικές Λύσεις &amp; Απαντήσεις Ασκήσεων</span>
          </div>
          <a
            href="http://ebooks.edu.gr/ebooks/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 hover:underline text-blue-200 hover:text-white transition-colors"
          >
            <span>ebooks.edu.gr</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Greek Brand Logo */}
          <Link href="/gr" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform duration-300">
              <span className="font-black text-lg sm:text-xl">&pi;</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  matemetrik<span className="text-blue-600">.gr</span>
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  ΕΛΛΑΣ
                </span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block -mt-1">
                Ψηφιακό Σχολείο &amp; Βοηθήματα
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (100% Greek) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              href="/gr"
              className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition-colors ${
                pathname === '/gr'
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-950/50'
                  : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Αρχική
            </Link>

            {/* Σχολικές Βαθμίδες Dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs xl:text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <span>Βαθμίδες Εκπαίδευσης</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full left-0 w-[480px] bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                <div className="grid grid-cols-3 gap-3">
                  {levelsMenu.map((lvl) => (
                    <div key={lvl.title} className="space-y-1.5">
                      <Link
                        href={lvl.href}
                        className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider block hover:underline"
                      >
                        {lvl.title}
                      </Link>
                      <div className="space-y-1">
                        {lvl.grades.map((g) => (
                          <Link
                            key={g.name}
                            href={g.href}
                            className="block px-2 py-1 text-xs text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-colors font-medium"
                          >
                            {g.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/gr/dimotiko"
              className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition-colors ${
                pathname?.startsWith('/gr/dimotiko')
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-950/50'
                  : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Δημοτικό
            </Link>

            <Link
              href="/gr/gymnasio"
              className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition-colors ${
                pathname?.startsWith('/gr/gymnasio')
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-950/50'
                  : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Γυμνάσιο
            </Link>

            <Link
              href="/gr/lykeio"
              className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition-colors ${
                pathname?.startsWith('/gr/lykeio')
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-950/50'
                  : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Λύκειο
            </Link>

            <Link
              href="/gr/pdf-vivlia"
              className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition-colors flex items-center gap-1.5 ${
                pathname === '/gr/pdf-vivlia'
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-950/50'
                  : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-blue-500" />
              <span>Βιβλία PDF (ebooks)</span>
            </Link>

            <Link
              href="/gr/eidiseis"
              className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition-colors flex items-center gap-1.5 ${
                pathname?.startsWith('/gr/eidiseis')
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-950/50'
                  : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5 text-emerald-500" />
              <span>Ειδήσεις Παιδείας</span>
            </Link>
          </nav>

          {/* Right Action Icons & Language Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Country / Flag Language Selector */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold shadow-xs">
              <Link
                href="/"
                title="Τουρκία (Türkçe) - Επιστροφή στην αρχική"
                className="px-2 py-1 rounded-lg flex items-center gap-1 transition-all text-slate-500 hover:text-slate-900 dark:hover:text-white font-extrabold"
              >
                <span className="text-sm">🇹🇷</span>
                <span className="hidden sm:inline text-[11px]">TR</span>
              </Link>
              <Link
                href="/gr"
                title="Ελλάδα (Ελληνικά) - Ενεργή σελίδα"
                className="px-2 py-1 rounded-lg flex items-center gap-1 transition-all bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-xs font-extrabold"
              >
                <span className="text-sm">🇬🇷</span>
                <span className="hidden sm:inline text-[11px]">GR</span>
              </Link>
            </div>

            {/* Dark / Light Mode Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (100% Greek) */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-5 py-4 space-y-3 animate-fadeIn text-sm">
          <Link
            href="/gr"
            onClick={() => setIsOpen(false)}
            className="block py-2 font-bold text-blue-600 dark:text-blue-400 border-b border-slate-100 dark:border-slate-800"
          >
            Αρχική (Ελλάδα)
          </Link>
          <Link
            href="/gr/dimotiko"
            onClick={() => setIsOpen(false)}
            className="block py-2 font-semibold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800"
          >
            Δημοτικό (Α\' - ΣΤ\' Τάξη)
          </Link>
          <Link
            href="/gr/gymnasio"
            onClick={() => setIsOpen(false)}
            className="block py-2 font-semibold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800"
          >
            Γυμνάσιο (Α\' - Γ\' Τάξη)
          </Link>
          <Link
            href="/gr/lykeio"
            onClick={() => setIsOpen(false)}
            className="block py-2 font-semibold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800"
          >
            Λύκειο (Α\' - Γ\' Τάξη &amp; Πανελλαδικές)
          </Link>
          <Link
            href="/gr/pdf-vivlia"
            onClick={() => setIsOpen(false)}
            className="block py-2 font-semibold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between"
          >
            <span>Επίσημα Βιβλία PDF (ebooks)</span>
            <FileText className="w-4 h-4 text-blue-500" />
          </Link>
          <Link
            href="/gr/eidiseis"
            onClick={() => setIsOpen(false)}
            className="block py-2 font-semibold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between"
          >
            <span>Ειδήσεις Παιδείας &amp; Σχολεία</span>
            <Newspaper className="w-4 h-4 text-emerald-500" />
          </Link>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Επιλογή Χώρας:</span>
            <div className="flex items-center gap-2">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                🇹🇷 Türkçe (TR)
              </Link>
              <Link
                href="/gr"
                onClick={() => setIsOpen(false)}
                className="px-2 py-1 rounded bg-blue-600 text-xs font-bold text-white"
              >
                🇬🇷 Ελληνικά (GR)
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
