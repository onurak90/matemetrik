import React from 'react';
import Link from 'next/link';
import { BookOpen, Sparkles, Shield, Heart, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
                &pi;
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">
                matemetrik<span className="text-indigo-400">.com</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Matemetrik; 1. sınıftan 12. sınıfa kadar tüm kademeler için matematik konu anlatımları, yeni nesil soru çözümleri, öğretmen karne görüşü robotu ve sınav hazırlık araçları sunan Türkiye’nin öncü eğitim platformudur.
            </p>
          </div>

          {/* Col 2: Sınıflar (1'den 12'ye kadar) */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Sınıflar
            </h3>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
                <Link
                  key={grade}
                  href={`/kategori/${grade}-sinif`}
                  className="hover:text-white hover:underline transition-colors"
                >
                  {grade}. Sınıf
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3: Popüler Kategoriler & Araçlar */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Araçlar &amp; Çözümler
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/karne-gorusu-ureticisi" className="hover:text-white transition-colors flex items-center gap-1.5 text-indigo-400">
                  <Sparkles className="w-3 h-3" /> Karne Görüşü Üreticisi
                </Link>
              </li>
              <li>
                <Link href="/sinav-hazirlama-robotu" className="hover:text-white transition-colors flex items-center gap-1.5 text-amber-400">
                  <Sparkles className="w-3 h-3" /> Sınav Hazırlama Robotu
                </Link>
              </li>
              <li>
                <Link href="/kategori/kitap-ozet" className="hover:text-white transition-colors">
                  Kitap Özetleri
                </Link>
              </li>
              <li>
                <Link href="/kategori/matematik-blog" className="hover:text-white transition-colors">
                  Matematik Tarihi ve Makaleler
                </Link>
              </li>
              <li>
                <Link href="/kategori/egitim-rehberligi" className="hover:text-white transition-colors">
                  Eğitim &amp; Sınav Rehberliği
                </Link>
              </li>
              <li>
                <Link href="/vaka-calismalari" className="hover:text-white transition-colors">
                  Vaka Çalışmaları
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Kurumsal */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Kurumsal
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/hakkimizda" className="hover:text-white transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/kullanim-sartlari" className="hover:text-white transition-colors">
                  Kullanım Şartları
                </Link>
              </li>
              <li>
                <Link href="/gizlilik-politikasi" className="hover:text-white transition-colors">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-white transition-colors">
                  Site Haritası (sitemap.xml)
                </Link>
              </li>
              <li>
                <Link href="/robots.txt" className="hover:text-white transition-colors">
                  Robots.txt
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            2020 - {new Date().getFullYear()} matemetrik.com &bull; Tüm Hakları Saklıdır.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            Matematik &amp; Eğitim Portalı
          </div>
        </div>
      </div>
    </footer>
  );
}
