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

          {/* Col 2: Sınıflar & Sınavlar */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Sınıflar &amp; Sınavlar
            </h3>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
                <Link
                  prefetch={false}
                  key={grade}
                  href={`/kategori/${grade}-sinif`}
                  className="hover:text-white hover:underline transition-colors"
                >
                  {grade}. Sınıf
                </Link>
              ))}
              <Link
                prefetch={false}
                href="/kategori/ales"
                className="hover:text-white hover:underline transition-colors font-semibold text-violet-400"
              >
                ALES
              </Link>
              <Link
                prefetch={false}
                href="/kategori/yds"
                className="hover:text-white hover:underline transition-colors font-semibold text-teal-400"
              >
                YDS
              </Link>
            </div>
          </div>

          {/* Col 3: Popüler Kategoriler & Araçlar */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Araçlar &amp; Çözümler
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link prefetch={false} href="/ogretmen-araclari" className="hover:text-white transition-colors flex items-center gap-1.5 text-indigo-400 font-bold">
                  <Sparkles className="w-3 h-3" /> 🧑‍🏫 MEB Öğretmen Araçları Merkezi
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/meb-cozumleri" className="hover:text-white transition-colors flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Sparkles className="w-3 h-3" /> 📚 MEB Ders Kitabı Çözümleri (1-12)
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/hesaplama-araclari" className="hover:text-white transition-colors flex items-center gap-1.5 text-purple-400 font-bold">
                  <Sparkles className="w-3 h-3" /> 🧮 Matematik Hesaplama Araçları (18+)
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/yillik-plan-hazirlama" className="hover:text-white transition-colors flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Sparkles className="w-3 h-3" /> Yıllık Plan Hazırlama (2026-2027)
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/kulup-toplanti-tutanaklari" className="hover:text-white transition-colors flex items-center gap-1.5 text-indigo-400 font-semibold">
                  <Sparkles className="w-3 h-3" /> Kulüp Toplantı Tutanakları
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/karne-gorusu-ureticisi" className="hover:text-white transition-colors flex items-center gap-1.5 text-purple-400">
                  <Sparkles className="w-3 h-3" /> Karne Görüşü Üreticisi
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/sinav-hazirlama-robotu" className="hover:text-white transition-colors flex items-center gap-1.5 text-amber-400">
                  <Sparkles className="w-3 h-3" /> Sınav Hazırlama Robotu
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/puan-hesaplama-robotu" className="hover:text-white transition-colors flex items-center gap-1.5 text-rose-400 font-semibold">
                  <Sparkles className="w-3 h-3" /> Puan Hesaplama Robotu (LGS &amp; YKS)
                </Link>
              </li>
              <li className="pl-4">
                <Link prefetch={false} href="/yks-puan-hesaplama-robotu" className="hover:text-white transition-colors flex items-center gap-1 text-slate-300 hover:text-purple-300">
                  &rarr; 📊 2026 YKS Puan Hesaplama
                </Link>
              </li>
              <li className="pl-4">
                <Link prefetch={false} href="/lgs-puan-hesaplama-robotu" className="hover:text-white transition-colors flex items-center gap-1 text-slate-300 hover:text-indigo-300">
                  &rarr; 🎯 2026 LGS Puan Hesaplama
                </Link>
              </li>
              <li className="pl-4">
                <Link prefetch={false} href="/takdir-tesekkur-hesaplama" className="hover:text-white transition-colors flex items-center gap-1 text-yellow-300 hover:text-yellow-200 font-bold">
                  &rarr; 🏆 Takdir Teşekkür Hesaplama
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/yds-calisma-bolumu" className="hover:text-white transition-colors flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Sparkles className="w-3 h-3" /> 🎯 YDS Hazırlık &amp; Çalışma
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/konu-anlatimlari" className="hover:text-white transition-colors flex items-center gap-1.5 text-cyan-400 font-semibold">
                  <Sparkles className="w-3 h-3" /> 📖 Konu Anlatımları (1-12. Sınıf)
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/kategori/kitap-ozet" className="hover:text-white transition-colors">
                  Kitap Özetleri
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/post" className="hover:text-white transition-colors">
                  Blog, Makaleler ve Sınav Rehberi
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/post?cat=sinavlar" className="hover:text-white transition-colors">
                  Eğitim &amp; Sınav Rehberliği
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/vaka-calismalari" className="hover:text-white transition-colors">
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
                <Link prefetch={false} href="/kunye" className="hover:text-white transition-colors text-indigo-300 font-semibold flex items-center gap-1">
                  Künye &amp; Yayın Kurulu
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/yayin-ilkeleri" className="hover:text-white transition-colors text-slate-300 flex items-center gap-1">
                  Yayın İlkeleri
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/telif-haklari-ve-yasal-uyari" className="hover:text-white transition-colors text-amber-300 flex items-center gap-1">
                  Telif Hakları &amp; Yasal Uyarı
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/hakkimizda" className="hover:text-white transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/iletisim" className="hover:text-white transition-colors text-indigo-400 font-semibold">
                  İletişim (matemetrikcom@gmail.com)
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/vizyonumuz" className="hover:text-white transition-colors text-indigo-300">
                  Vizyonumuz
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/misyonumuz" className="hover:text-white transition-colors text-purple-300">
                  Misyonumuz
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/kullanim-sartlari" className="hover:text-white transition-colors">
                  Kullanım Şartları
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/gizlilik-politikasi" className="hover:text-white transition-colors">
                  Gizlilik Politikası (KVKK)
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/cerez-politikasi" className="hover:text-white transition-colors">
                  Çerez Politikası
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer for AdSense / Copyright Protection */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 text-[11px] text-slate-500 leading-relaxed text-center sm:text-left">
          <strong>Yasal Uyarı &amp; Sorumluluk Reddi:</strong> Matemetrik.com, öğrencilere ve öğretmenlere destek olmak amacıyla kurulmuş bağımsız bir eğitim portalıdır. Millî Eğitim Bakanlığı (MEB) veya Talim Terbiye Kurulu ile doğrudan resmi/kurumsal bir bağı bulunmamaktadır. Sitede yer alan ders çözümleri ve rehberlik içerikleri eğitimde fırsat eşitliği ve ev ödevi kontrolü amacıyla hazırlanmıştır.
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            2020 - {new Date().getFullYear()} matemetrik.com &bull; Tüm Hakları Saklıdır.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            Matematik &amp; Eğitim Portalı &bull; İletişim: matemetrikcom@gmail.com
          </div>
        </div>
      </div>
    </footer>
  );
}
