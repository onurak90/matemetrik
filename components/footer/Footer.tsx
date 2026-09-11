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
              Matemetrik; 1. sınıftan 12. sınıfa kadar tüm kademeler için MEB ders kitabı cevapları, matematik konu anlatımları, öğretmen karne görüşü robotu ve sınav hazırlık araçları sunan Türkiye’nin öncü eğitim platformudur.
            </p>
            <div className="pt-2">
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
              >
                <Shield className="w-3.5 h-3.5" />
                Yönetim Paneli Girişi (/admin) &rarr;
              </Link>
            </div>
          </div>

          {/* Col 2: Hızlı Kademeler */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Kademeler
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/kategori/1-sinif" className="hover:text-white transition-colors">
                  1. Sınıf Matematik
                </Link>
              </li>
              <li>
                <Link href="/kategori/2-sinif" className="hover:text-white transition-colors">
                  2. Sınıf Matematik
                </Link>
              </li>
              <li>
                <Link href="/kategori/9-sinif" className="hover:text-white transition-colors">
                  9. Sınıf Matematik
                </Link>
              </li>
              <li>
                <Link href="/kategori/10-sinif" className="hover:text-white transition-colors">
                  10. Sınıf Matematik
                </Link>
              </li>
              <li>
                <Link href="/kategori/11-sinif" className="hover:text-white transition-colors">
                  11. Sınıf Matematik
                </Link>
              </li>
              <li>
                <Link href="/kategori/12-sinif" className="hover:text-white transition-colors">
                  12. Sınıf AYT Matematik
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popüler Kategoriler & Araçlar */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Araçlar & Çözümler
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
                <Link href="/kategori/meb-ders-kitabi-cevaplari" className="hover:text-white transition-colors">
                  MEB Ders Kitabı Çözümleri
                </Link>
              </li>
              <li>
                <Link href="/kategori/matematik-blog" className="hover:text-white transition-colors">
                  Matematik Tarihi ve Makaleler
                </Link>
              </li>
              <li>
                <Link href="/kategori/kitap-ozet" className="hover:text-white transition-colors">
                  Kitap Özetleri
                </Link>
              </li>
              <li>
                <Link href="/kategori/egitim-rehberligi" className="hover:text-white transition-colors">
                  Eğitim & Sınav Rehberliği
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
            &copy; {new Date().getFullYear()} Matemetrik.com &bull; Tüm Hakları Saklıdır.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            Next.js 14 & Tailwind CSS ile yüksek performans ve SEO için optimize edildi.
          </div>
        </div>
      </div>
    </footer>
  );
}
