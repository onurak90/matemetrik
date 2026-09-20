import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen, Sparkles, CheckCircle2, Award, Target, Users,
  GraduationCap, FileText, ArrowRight, ShieldCheck, Mail, Heart
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hakkımızda | Matemetrik - Akıllı Matematik ve Eğitim Portalı',
  description:
    'Matemetrik.com; 1. sınıftan 12. sınıfa kadar MEB Maarif Modeli uyumlu konu anlatımları, 20 soruluk testler, sayfa sayfa MEB ders kitabı çözümleri ve öğretmen araçları sunan bağımsız eğitim platformudur.',
  alternates: {
    canonical: 'https://www.matemetrik.com/hakkimizda',
  },
  openGraph: {
    title: 'Hakkımızda | Matemetrik',
    description: 'Eğitimde fırsat eşitliği ve ezbersiz matematik öğrenimi için yola çıkan Matemetrik ekibini tanıyın.',
    url: 'https://www.matemetrik.com/hakkimizda',
  },
};

export default function HakkimizdaPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Hakkımızda - Matemetrik',
    url: 'https://www.matemetrik.com/hakkimizda',
    description: 'Matemetrik eğitim portalı kuruluş hikayesi, ekibi ve eğitim ilkeleri.',
    mainEntity: {
      '@type': 'EducationalOrganization',
      name: 'Matemetrik',
      url: 'https://www.matemetrik.com',
      email: 'matemetrikcom@gmail.com',
      foundingDate: '2020',
      description: '1-12. sınıf MEB müfredatı uyumlu matematik çözümleri, konu anlatımları ve öğretmen araçları platformu.',
    },
  };

  return (
    <div className="py-14 pb-28 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Kurumsal Bilgilendirme
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Matematiği Sevdiren ve Eğitimi Kolaylaştıran Platform
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Eğitimde fırsat eşitliği, ezbersiz kavramsal öğrenme ve öğretmenlerimizin bürokratik yükünü sıfırlama vizyonuyla yola çıktık.
          </p>
        </div>

        {/* Story & What We Do */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Biz Kimiz?</h2>
            <p>
              <strong>Matemetrik.com</strong>, Türkiye genelinde ilkokul 1. sınıftan lise 12. sınıfa kadar tüm kademelerdeki öğrencilerin matematik ve temel derslerdeki başarısını artırmak; velilere rehberlik etmek ve değerli öğretmenlerimizin ders ile evrak hazırlık süreçlerini dijitalleştirmek amacıyla kurulmuş <strong>bağımsız bir eğitim teknolojisi portalıdır</strong>.
            </p>
            <p>
              Geliştirdiğimiz özgün pedagojik sistem; kuru formül ezberletmek yerine, öğrencilerin matematiksel modelleme, analitik sorgulama ve problem çözme becerilerini adım adım inşa etmeyi hedefler.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 text-center">
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100">
              <div className="text-2xl font-black text-indigo-700">12 Sınıf</div>
              <div className="text-xs text-slate-600 font-medium">1'den 12'ye Müfredat</div>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
              <div className="text-2xl font-black text-emerald-700">3.500+</div>
              <div className="text-xs text-slate-600 font-medium">MEB Sayfa Çözümü</div>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100">
              <div className="text-2xl font-black text-purple-700">55+</div>
              <div className="text-xs text-slate-600 font-medium">Kapsamlı Konu Rehberi</div>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100">
              <div className="text-2xl font-black text-amber-700">%100</div>
              <div className="text-xs text-slate-600 font-medium">Ücretsiz Erişim</div>
            </div>
          </div>

          {/* Neler Sunuyoruz */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xl font-bold text-slate-900">Matemetrik&apos;te Neler Bulabilirsiniz?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  Konu Anlatımları &amp; 20 Soruluk Testler
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  2026-2027 Türkiye Yüzyılı Maarif Modeli kazanımlarına tam uyumlu ünite özetleri, 20 soruluk yeni nesil tarama testleri ve ayrıntılı adım adım işlem çözümleri.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  MEB Ders Kitabı Çözümleri
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Milli Eğitim Bakanlığı onaylı 19 farklı ders kitabının alıştırma, &quot;Konuya Başlarken&quot; ve ünite sonu değerlendirme sorularının kesin doğrulanmış cevapları.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  Sınav Hazırlama Robotu
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Öğretmenlerin resmi MEB antetli yazılı sınav kağıtlarını, çift sütun test mizanpajlarını ve cevap anahtarlarını saniyeler içinde PDF olarak ürettiği akıllı araç.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  Yıllık Plan &amp; Karne Görüşü
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  38 kulüp tutanağı, 2026-2027 çerçeve yıllık planları ve e-Okul karne döneminde öğretmenlere özel pedagojik görüş üreticisi.
                </p>
              </div>
            </div>
          </div>

          {/* Institutional Links: Vizyon & Misyon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <Link
              href="/vizyonumuz"
              className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 hover:border-indigo-300 hover:bg-indigo-50 transition-all flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">Gelecek Hedefimiz</div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Vizyonumuz &rarr;</div>
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/misyonumuz"
              className="p-5 rounded-2xl bg-purple-50/60 border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-purple-600">Temel Görevimiz</div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-purple-600 transition-colors">Misyonumuz &rarr;</div>
              </div>
              <ArrowRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Contact Box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 pt-4">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-indigo-600" /> İletişim &amp; Geri Bildirim:
            </div>
            <p className="text-slate-600">
              Her türlü soru, hata bildirimi veya iş birliği talepleriniz için bize <a href="mailto:matemetrikcom@gmail.com" className="text-indigo-600 font-bold hover:underline">matemetrikcom@gmail.com</a> adresinden veya <Link href="/iletisim" className="text-indigo-600 font-bold hover:underline">İletişim Sayfamızdan</Link> ulaşabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
