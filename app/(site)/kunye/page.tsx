import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Users, Mail, MapPin, Globe, Award, BookOpen, ChevronRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Künye & Yayın Kurulu | Matemetrik',
  description: 'Matemetrik.com kurumsal künyesi, imtiyaz sahibi, sorumlu yazı işleri müdürü, matematik zümresi ve iletişim bilgileri.',
  alternates: {
    canonical: 'https://www.matemetrik.com/kunye',
  },
};

export default function KunyePage() {
  return (
    <div className="py-12 pb-24 space-y-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Ana Sayfa</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Künye &amp; Yayın Kurulu</span>
        </nav>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
            <ShieldCheck className="w-3.5 h-3.5" /> Şeffaflık &amp; Kurumsal Kimlik
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Künye ve Yayın Kurulu
          </h1>
          <p className="text-indigo-200 text-sm sm:text-base max-w-2xl leading-relaxed">
            Matemetrik; 5651 sayılı kanun ve basın-yayın ilkelerine uygun olarak eğitimde şeffaflık, güvenilirlik ve pedagojik kalite standartlarını benimser.
          </p>
        </div>

        {/* Team & Masthead Grid */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-10">
          {/* Executive Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
              <Award className="w-5 h-5 text-indigo-600" /> Yönetim &amp; İmtiyaz Sahibi
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">İmtiyaz Sahibi &amp; Kurucu</span>
                <h3 className="text-base font-bold text-slate-900">Bahtiyar Tonguç</h3>
                <p className="text-xs text-slate-600">Eğitim Teknolojisti, Matematik Araştırmacısı</p>
                <p className="text-[11px] text-slate-400">E-posta: bahtiyartonguc@matemetrik.com</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Genel Yayın Yönetmeni (Editor-in-Chief)</span>
                <h3 className="text-base font-bold text-slate-900">Bahtiyar Tonguç</h3>
                <p className="text-xs text-slate-600">Pedagojik İçerik ve Müfredat Uyumluluğu</p>
                <p className="text-[11px] text-slate-400">E-posta: editor@matemetrik.com</p>
              </div>
            </div>
          </div>

          {/* Academic & Pedagogical Board */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
              <BookOpen className="w-5 h-5 text-indigo-600" /> Matematik Zümresi ve Akademik Danışma Kurulu
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[11px] font-bold text-indigo-600">Lise Matematik Zümresi</span>
                <h4 className="text-sm font-bold text-slate-900">Matemetrik Ortaöğretim Kurulu</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  9, 10, 11 ve 12. sınıf MEB ders kitapları, YKS (TYT-AYT) soru analizleri ve ileri matematik modellemeleri.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[11px] font-bold text-indigo-600">Ortaokul Matematik Zümresi</span>
                <h4 className="text-sm font-bold text-slate-900">Matemetrik İlköğretim Kurulu</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  5, 6, 7 ve 8. sınıf LGS hazırlık, yeni nesil beceri temelli soru çözümleri ve kavram haritaları.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[11px] font-bold text-indigo-600">Ölçme &amp; Değerlendirme</span>
                <h4 className="text-sm font-bold text-slate-900">Öğretmen Araçları Komisyonu</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  MEB ortak yazılı sınav senaryoları, yıllık çerçeve planlar ve e-Okul karne görüşü algoritma danışmanlığı.
                </p>
              </div>
            </div>
          </div>

          {/* Technical, Legal & Hosting */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
              <Users className="w-5 h-5 text-indigo-600" /> Teknik Altyapı ve Yasal Bilgiler
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <strong className="text-slate-900 block font-bold">Yazılım &amp; Altyapı</strong>
                <p className="text-slate-600 leading-relaxed">
                  Next.js App Router, React, Tailwind CSS, TypeScript mimarisi ile küresel CDN üzerinden yüksek hız ve erişilebilirlik.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <strong className="text-slate-900 block font-bold">Yer Sağlayıcı (Hosting Provider)</strong>
                <p className="text-slate-600 leading-relaxed">
                  Vercel Inc. (440 N Barranca Ave #4133 Covina, CA 91723 - USA)
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <strong className="text-slate-900 block font-bold">Hukuk ve Telif Müşavirliği</strong>
                <p className="text-slate-600 leading-relaxed">
                  5846 Sayılı FSEK (Fikir ve Sanat Eserleri Kanunu) ve 6698 Sayılı KVKK Uyum Danışmanlığı.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <strong className="text-slate-900 block font-bold">Yayın İlkeleri</strong>
                <p className="text-slate-600 leading-relaxed">
                  <Link href="/yayin-ilkeleri" className="text-indigo-600 font-bold hover:underline">
                    Yayın İlkelerimizi ve Pedagojik Standartlarımızı inceleyin &rarr;
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Contact & Address */}
          <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-600" /> Resmi İletişim &amp; Yazışma
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Basın bültenleri, içerik önerileri, soru/hata bildirimleri veya reklam iş birlikleri için aşağıdaki kanallardan bize ulaşabilirsiniz:
            </p>
            <div className="text-xs text-slate-800 space-y-1 pt-1">
              <p>• <strong>Resmi E-Posta:</strong> <a href="mailto:matemetrikcom@gmail.com" className="text-indigo-600 font-bold hover:underline">matemetrikcom@gmail.com</a></p>
              <p>• <strong>Web Sitesi:</strong> <a href="https://www.matemetrik.com" className="text-indigo-600 font-bold hover:underline">https://www.matemetrik.com</a></p>
              <p>• <strong>İletişim Formu:</strong> <Link href="/iletisim" className="text-indigo-600 font-bold hover:underline">matemetrik.com/iletisim</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
