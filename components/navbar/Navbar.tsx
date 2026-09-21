'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen, Search, Menu, X, ChevronDown,
  GraduationCap, Sparkles, Award, FileText,
  Compass, ArrowRight, Shield, Calendar, Users, Calculator
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
      { name: '🎯 YDS Hazırlık', href: '/yds-calisma-bolumu' },
      { name: 'YDS Blog & Materyal', href: '/kategori/yds' },
      { name: 'ALES Çıkmış Sorular', href: '/kategori/ales' },
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

            {/* MEB Çözümleri Mega Dropdown (1-12. Sınıf Tüm Kademeler) */}
            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
              >
                MEB Çözümleri
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[560px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 space-y-3">
                {/* Header Banner */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-base">📚</span>
                    <div>
                      <div className="text-xs font-bold text-slate-900">MEB Ders Kitabı Çözümleri</div>
                      <div className="text-[10px] text-slate-500">1-12. Sınıf güncel ve doğrulanmış sayfa çözümleri</div>
                    </div>
                  </div>
                  <Link
                    href="/kategori/meb-ders-kitabi-cevaplari"
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1"
                  >
                    Tüm Kitaplar &rarr;
                  </Link>
                </div>

                {/* 3 Kademe Columns (İlkokul, Ortaokul, Lise) */}
                <div className="grid grid-cols-3 gap-3">
                  {/* İlkokul */}
                  <div className="space-y-1 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 px-1 mb-1">
                      İlkokul
                    </div>
                    {[1, 2, 3, 4].map((g) => (
                      <Link
                        key={g}
                        href={`/kategori/${g}-sinif`}
                        className="flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-emerald-700 hover:bg-white transition-colors"
                      >
                        <span>{g}. Sınıf MEB</span>
                        <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">Çözüm</span>
                      </Link>
                    ))}
                  </div>

                  {/* Ortaokul */}
                  <div className="space-y-1 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 px-1 mb-1">
                      Ortaokul
                    </div>
                    {[5, 6, 7, 8].map((g) => (
                      <Link
                        key={g}
                        href={`/kategori/${g}-sinif`}
                        className="flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-blue-700 hover:bg-white transition-colors"
                      >
                        <span>{g}. Sınıf MEB</span>
                        {g === 8 ? (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-800 font-black">LGS</span>
                        ) : (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-blue-100 text-blue-800 font-bold">Çözüm</span>
                        )}
                      </Link>
                    ))}
                  </div>

                  {/* Lise */}
                  <div className="space-y-1 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 px-1 mb-1">
                      Lise
                    </div>
                    {[9, 10, 11, 12].map((g) => (
                      <Link
                        key={g}
                        href={`/kategori/${g}-sinif`}
                        className="flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-purple-700 hover:bg-white transition-colors"
                      >
                        <span>{g}. Sınıf MEB</span>
                        {g === 12 ? (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-indigo-100 text-indigo-800 font-black">YKS</span>
                        ) : (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-purple-100 text-purple-800 font-bold">Çözüm</span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Footer Link */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Adım adım işlem basamakları ve formüller</span>
                  <Link href="/konu-anlatimlari" className="text-indigo-600 font-bold hover:underline flex items-center gap-1">
                    📖 1-12. Sınıf Konu Anlatımları &rarr;
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

                <Link
                  href="/puan-hesaplama-robotu"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-indigo-50 transition-colors group/item"
                >
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 group-hover/item:text-indigo-600 flex items-center gap-1.5">
                      Puan Hesaplama Robotu
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-extrabold border border-rose-200">
                        LGS &amp; YKS
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">
                      TYT, AYT, LGS net &amp; OBP sıralama
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
              href="/yds-calisma-bolumu"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                pathname?.startsWith('/yds-calisma-bolumu')
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
              }`}
            >
              <span>🎯 YDS Hazırlık</span>
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
            <div className="space-y-3 pt-1">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">İlkokul (1-4. Sınıf)</span>
                <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-700">
                  <Link href="/kategori/1-sinif" onClick={() => setIsOpen(false)} className="p-1.5 rounded-md hover:bg-slate-50 hover:text-emerald-700">1. Sınıf Çözümleri</Link>
                  <Link href="/kategori/2-sinif" onClick={() => setIsOpen(false)} className="p-1.5 rounded-md hover:bg-slate-50 hover:text-emerald-700">2. Sınıf Çözümleri</Link>
                  <Link href="/kategori/3-sinif" onClick={() => setIsOpen(false)} className="p-1.5 rounded-md hover:bg-slate-50 hover:text-emerald-700">3. Sınıf Çözümleri</Link>
                  <Link href="/kategori/4-sinif" onClick={() => setIsOpen(false)} className="p-1.5 rounded-md hover:bg-slate-50 hover:text-emerald-700">4. Sınıf Çözümleri</Link>
                </div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block mb-1">Ortaokul (5-8. Sınıf & LGS)</span>
                <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-700">
                  <Link href="/kategori/5-sinif" onClick={() => setIsOpen(false)} className="p-1.5 rounded-md hover:bg-slate-50 hover:text-blue-700">5. Sınıf Çözümleri</Link>
                  <Link href="/kategori/6-sinif" onClick={() => setIsOpen(false)} className="p-1.5 rounded-md hover:bg-slate-50 hover:text-blue-700">6. Sınıf Çözümleri</Link>
                  <Link href="/kategori/7-sinif" onClick={() => setIsOpen(false)} className="p-1.5 rounded-md hover:bg-slate-50 hover:text-blue-700">7. Sınıf Çözümleri</Link>
                  <Link href="/kategori/8-sinif" onClick={() => setIsOpen(false)} className="p-1.5 rounded-md hover:bg-slate-50 hover:text-blue-700 font-semibold text-blue-900">8. Sınıf (LGS)</Link>
                </div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block mb-1">Lise (9-12. Sınıf & YKS)</span>
                <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-700">
                  <Link href="/kategori/9-sinif" onClick={() => setIsOpen(false)} className="p-1.5 rounded-md hover:bg-slate-50 hover:text-purple-700">9. Sınıf MEB</Link>
                  <Link href="/kategori/10-sinif" onClick={() => setIsOpen(false)} className="p-1.5 rounded-md hover:bg-slate-50 hover:text-purple-700">10. Sınıf MEB</Link>
                  <Link href="/kategori/11-sinif" onClick={() => setIsOpen(false)} className="p-1.5 rounded-md hover:bg-slate-50 hover:text-purple-700">11. Sınıf MEB</Link>
                  <Link href="/kategori/12-sinif" onClick={() => setIsOpen(false)} className="p-1.5 rounded-md hover:bg-slate-50 hover:text-purple-700 font-semibold text-purple-900">12. Sınıf (YKS)</Link>
                </div>
              </div>
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
            <Link href="/puan-hesaplama-robotu" className="block py-1 text-sm font-medium text-slate-700 hover:text-indigo-600 flex items-center justify-between">
              <span>Puan Hesaplama Robotu</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold border border-rose-200">LGS &amp; YKS</span>
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
            href="/yds-calisma-bolumu"
            onClick={() => setIsOpen(false)}
            className="block py-2 font-bold text-emerald-700 hover:text-emerald-900 border-b border-slate-100 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <span>🎯</span> YDS Hazırlık &amp; Çalışma
            </span>
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
