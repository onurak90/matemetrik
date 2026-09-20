'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen, Search, Menu, X, ChevronDown,
  GraduationCap, Sparkles, Award, FileText,
  Compass, ArrowRight, Shield, Calendar, Users
} from 'lucide-react';

import TopCtaBanner from './TopCtaBanner';
import LiveSearchBox from '@/components/search/LiveSearchBox';
import ThemeToggle from '@/components/theme/ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const grades = [
    { label: 'İlkokul', items: [
      { name: '1. Sınıf', href: '/kategori/1-sinif' },
      { name: '2. Sınıf', href: '/kategori/2-sinif' },
      { name: '3. Sınıf', href: '/kategori/3-sinif' },
      { name: '4. Sınıf', href: '/kategori/4-sinif' },
    ]},
    { label: 'Ortaokul', items: [
      { name: '5. Sınıf', href: '/kategori/5-sinif' },
      { name: '6. Sınıf', href: '/kategori/6-sinif' },
      { name: '7. Sınıf', href: '/kategori/7-sinif' },
      { name: '8. Sınıf', href: '/kategori/8-sinif' },
    ]},
    { label: 'Lise', items: [
      { name: '9. Sınıf', href: '/kategori/9-sinif' },
      { name: '10. Sınıf', href: '/kategori/10-sinif' },
      { name: '11. Sınıf', href: '/kategori/11-sinif' },
      { name: '12. Sınıf', href: '/kategori/12-sinif' },
    ]},
    { label: 'Sınavlar', items: [
      { name: 'ALES', href: '/kategori/ales' },
      { name: 'YDS', href: '/kategori/yds' },
      { name: 'YKS & Sınav', href: '/kategori/yks' },
    ]},
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200'
          : 'bg-white border-b border-slate-100'
      }`}
    >
      <TopCtaBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
              <span className="font-black text-xl">M</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                matemetrik<span className="text-indigo-600">.</span>
              </span>
              <span className="text-[10px] -mt-1 font-semibold text-slate-500 uppercase tracking-widest">
                Akıllı Eğitim
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              href="/"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                pathname === '/'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
              }`}
            >
              Ana Sayfa
            </Link>

            {/* Sınıflar Mega Dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
              >
                Sınıflar &amp; Sınavlar
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full left-0 w-[440px] bg-white rounded-2xl shadow-xl border border-slate-200 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                <div className="grid grid-cols-4 gap-3">
                  {grades.map((group) => (
                    <div key={group.label} className="space-y-1.5">
                      <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider px-2">
                        {group.label}
                      </div>
                      {group.items.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-2 py-1.5 text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* MEB Çözümleri Dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
              >
                MEB Çözümleri
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 space-y-1">
                <Link
                  href="/kategori/meb-ders-kitabi-cevaplari"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50 text-xs font-bold text-indigo-900 transition-colors"
                >
                  <span>📚 Tüm Ders Kitabı Çözümleri</span>
                  <span>&rarr;</span>
                </Link>
                <div className="pt-2 border-t border-slate-100 space-y-1">
                  <Link
                    href="/kategori/9-sinif"
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    <span>9. Sınıf MEB Çözümleri</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold">2026-2027</span>
                  </Link>
                  <Link
                    href="/kategori/10-sinif"
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    <span>10. Sınıf MEB Çözümleri</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold">Güncel</span>
                  </Link>
                  <Link
                    href="/kategori/11-sinif"
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    <span>11. Sınıf MEB Çözümleri</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold">Güncel</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Öğretmen Araçları Dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
              >
                Öğretmen Araçları
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                <Link
                  href="/yillik-plan-hazirlama"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-indigo-50 transition-colors group/item"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 group-hover/item:text-indigo-600 flex items-center gap-1.5">
                      Yıllık Plan Hazırlama
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-extrabold border border-emerald-200">
                        2026-2027
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">
                      Maarif Modeli Excel &amp; PDF çıktısı
                    </div>
                  </div>
                </Link>

                <Link
                  href="/kulup-toplanti-tutanaklari"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-indigo-50 transition-colors group/item"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 group-hover/item:text-indigo-600 flex items-center gap-1.5">
                      Kulüp Toplantı Tutanakları
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-extrabold border border-indigo-200">
                        38 Kulüp
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">
                      Tüzük, tutanak ve planları PDF indir
                    </div>
                  </div>
                </Link>

                <Link
                  href="/karne-gorusu-ureticisi"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-indigo-50 transition-colors group/item"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 group-hover/item:text-indigo-600">
                      Karne Görüşü Üretici
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">
                      Yapay zeka destekli pedagojik görüşler
                    </div>
                  </div>
                </Link>

                <Link
                  href="/sinav-hazirlama-robotu"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-indigo-50 transition-colors group/item"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 group-hover/item:text-indigo-600">
                      Sınav Hazırlama Robotu
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">
                      MEB uyumlu yazılı ve test çıktısı
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <Link
              href="/kategori/kitap-ozet"
              className="px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
            >
              Kitap Özetleri
            </Link>

            <Link
              href="/kategori/matematik-blog"
              className="px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
            >
              Blog &amp; Makaleler
            </Link>

            <Link
              href="/konu-anlatimlari"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                pathname === '/konu-anlatimlari' || pathname?.startsWith('/konu-anlatimlari')
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
              }`}
            >
              Konu Anlatımları
            </Link>

            <Link
              href="/hakkimizda"
              className="px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
            >
              Hakkımızda
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
              title="Arama Yap"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle (Açık / Karanlık Tema) */}
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Live Search Bar Dropdown */}
        {searchOpen && (
          <div className="py-4 border-t border-slate-100 animate-fadeIn">
            <div className="relative max-w-2xl mx-auto">
              <LiveSearchBox
                variant="navbar"
                autoFocus
                onSelectResult={() => setSearchOpen(false)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Mobile Live Search */}
          <div className="pb-3 border-b border-slate-100">
            <LiveSearchBox
              variant="navbar"
              placeholder="Sitede anında ara..."
              onSelectResult={() => setIsOpen(false)}
            />
          </div>

          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block py-2 font-semibold text-slate-900 border-b border-slate-100"
          >
            Ana Sayfa
          </Link>

          <div className="py-2 border-b border-slate-100 space-y-2">
            <Link
              href="/kategori/meb-ders-kitabi-cevaplari"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between py-1 text-sm font-bold text-indigo-700 hover:text-indigo-900"
            >
              <span>📚 MEB Ders Kitabı Çözümleri</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-extrabold">2026-2027</span>
            </Link>
            <div className="grid grid-cols-2 gap-2 text-sm text-slate-700">
              <Link href="/kategori/1-sinif" className="p-1 hover:text-indigo-600">1. Sınıf</Link>
              <Link href="/kategori/2-sinif" className="p-1 hover:text-indigo-600">2. Sınıf</Link>
              <Link href="/kategori/3-sinif" className="p-1 hover:text-indigo-600">3. Sınıf</Link>
              <Link href="/kategori/4-sinif" className="p-1 hover:text-indigo-600">4. Sınıf</Link>
              <Link href="/kategori/5-sinif" className="p-1 hover:text-indigo-600">5. Sınıf</Link>
              <Link href="/kategori/6-sinif" className="p-1 hover:text-indigo-600">6. Sınıf</Link>
              <Link href="/kategori/7-sinif" className="p-1 hover:text-indigo-600">7. Sınıf</Link>
              <Link href="/kategori/8-sinif" className="p-1 hover:text-indigo-600">8. Sınıf</Link>
              <Link href="/kategori/9-sinif" className="p-1 hover:text-indigo-600">9. Sınıf MEB</Link>
              <Link href="/kategori/10-sinif" className="p-1 hover:text-indigo-600">10. Sınıf MEB</Link>
              <Link href="/kategori/11-sinif" className="p-1 hover:text-indigo-600">11. Sınıf MEB</Link>
              <Link href="/kategori/12-sinif" className="p-1 hover:text-indigo-600">12. Sınıf MEB</Link>
              <Link href="/kategori/ales" className="p-1 font-bold text-violet-700 hover:text-violet-900">ALES Hazırlık</Link>
              <Link href="/kategori/yds" className="p-1 font-bold text-teal-700 hover:text-teal-900">YDS Çıkmış Sorular</Link>
            </div>
          </div>

          <div className="py-2 border-b border-slate-100 space-y-2">
            <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Öğretmen Araçları
            </div>
            <Link href="/yillik-plan-hazirlama" className="block py-1 text-sm font-medium text-slate-700 hover:text-indigo-600 flex items-center justify-between">
              <span>Yıllık Plan Hazırlama</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">2026-2027</span>
            </Link>
            <Link href="/kulup-toplanti-tutanaklari" className="block py-1 text-sm font-medium text-slate-700 hover:text-indigo-600 flex items-center justify-between">
              <span>Kulüp Toplantı Tutanakları</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">38 Kulüp</span>
            </Link>
            <Link href="/karne-gorusu-ureticisi" className="block py-1 text-sm font-medium text-slate-700 hover:text-indigo-600">
              Karne Görüşü Üreticisi
            </Link>
            <Link href="/sinav-hazirlama-robotu" className="block py-1 text-sm font-medium text-slate-700 hover:text-indigo-600">
              Sınav Hazırlama Robotu
            </Link>
          </div>

          <Link
            href="/kategori/kitap-ozet"
            className="block py-2 font-semibold text-slate-900 border-b border-slate-100"
          >
            Kitap Özetleri
          </Link>

          <Link
            href="/kategori/matematik-blog"
            className="block py-2 font-semibold text-slate-900 border-b border-slate-100"
          >
            Blog &amp; Makaleler
          </Link>

          <Link
            href="/konu-anlatimlari"
            onClick={() => setIsOpen(false)}
            className="block py-2 font-semibold text-indigo-700 hover:text-indigo-900 border-b border-slate-100 flex items-center justify-between"
          >
            <span>📖 Konu Anlatımları</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-extrabold">1-12. Sınıf</span>
          </Link>

          <Link
            href="/hakkimizda"
            className="block py-2 font-semibold text-slate-900 border-b border-slate-100"
          >
            Hakkımızda
          </Link>

          <div className="pt-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Görünüm Teması:</span>
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
