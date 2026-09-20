import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Target, Sparkles, CheckCircle2, ChevronRight,
  ShieldCheck, Heart, BookOpen, Users, ArrowRight, Mail
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Misyonumuz | Matemetrik - Eğitimde Kalite ve Pedagojik Güvenilirlik',
  description:
    'Matemetrik misyonu; 1. sınıftan 12. sınıfa kadar tüm öğrencilere anlaşılır, ücretsiz ve yüksek pedagojik değer taşıyan matematik içerikleri sunmak ve öğretmenlerimizin eğitim süreçlerini güçlendirmektir.',
  alternates: {
    canonical: 'https://www.matemetrik.com/misyonumuz',
  },
  openGraph: {
    title: 'Misyonumuz | Matemetrik',
    description: 'Öğrencilerimize ve öğretmenlerimize yönelik temel eğitim misyonumuz ve ilkelerimiz.',
    url: 'https://www.matemetrik.com/misyonumuz',
  },
};

export default function MisyonumuzPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ana Sayfa',
        item: 'https://www.matemetrik.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Misyonumuz',
        item: 'https://www.matemetrik.com/misyonumuz',
      },
    ],
  };

  return (
    <div className="py-14 pb-28 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Ana Sayfa</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Misyonumuz</span>
        </nav>

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-100">
            <Target className="w-3.5 h-3.5 text-purple-600" /> Temel Görevimiz
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Her Öğrenci İçin Anlaşılır, Güvenilir ve Ücretsiz Matematik
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Eğitim yolculuğunda öğrencilere güvenilir bir rehber, öğretmenlere ise zaman kazandıran güçlü bir dijital asistan olmak için varız.
          </p>
        </div>

        {/* Mission Content Card */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Varlık Sebebi ve Temel Taahhütlerimiz</h2>
            <p>
              <strong>Matemetrik</strong>&apos;in kuruluş misyonu; matematik öğreniminde yaşanan kavram yanılgılarını gidermek, &quot;yapamıyorum&quot; ön yargısını yıkmak ve her düzeydeki öğrenciye adım adım işlem basamaklarıyla rehberlik etmektir.
            </p>
            <p>
              Bizler, bilginin paylaşıldıkça çoğaldığına inanıyoruz. Bu inançla, platformumuzdaki hiçbir konu anlatımı, ders kitabı çözümü veya öğretmen aracı için kullanıcılardan hiçbir ücret talep etmiyoruz.
            </p>
          </div>

          {/* 4 Core Mission Commitments */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
            <div className="p-6 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">1. Pedagojik Güvenilirlik &amp; Sıfır Hata</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yayımlanan her ders kitabı çözümü, 20 soruluk test ve konu özeti alanında uzman eğitimciler tarafından doğrulanır; yüzeysel veya baştan savma içeriklere asla yer verilmez.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">2. Öğrenci Motivasyonu ve Özgüven</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Karmaşık problemleri en temel basamaklarına ayırarak öğrencinin &quot;Ben de çözebiliyorum&quot; duygusunu tatmasını ve matematik dersine karşı içsel bir sevgi geliştirmesini sağlamak.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">3. Öğretmenlerimize Saygı ve Destek</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Eğitimin omurgası olan öğretmenlerimizin sınav hazırlama, kulüp tutanağı düzenleme ve karne görüşü yazma süreçlerini pratikleştirerek eğitim kalitesine dolaylı katkı sunmak.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">4. Şeffaflık ve Yasal Sorumluluk</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                5651 sayılı yer sağlayıcı kanununa, 6698 sayılı KVKK ilkelerine ve telif haklarına sonuna kadar riayet eden şeffaf ve etik bir yayıncılık anlayışını sürdürmek.
              </p>
            </div>
          </div>

          {/* Navigation to Vizyon & Hakkımızda */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100">
            <Link
              href="/vizyonumuz"
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-300 hover:bg-white hover:shadow-sm transition-all flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Gelecek Hedefimiz</div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-purple-600 transition-colors">Vizyonumuzu İnceleyin &rarr;</div>
              </div>
              <ArrowRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/hakkimizda"
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-300 hover:bg-white hover:shadow-sm transition-all flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Kurumsal Hikayemiz</div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-purple-600 transition-colors">Hakkımızda &rarr;</div>
              </div>
              <ArrowRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Contact Box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1 pt-4">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-purple-600" /> Bize Yazın:
            </div>
            <p className="text-slate-600">
              Misyonumuz doğrultusunda geri bildirimleriniz bizim için çok kıymetlidir. Öneri ve görüşlerinizi <a href="mailto:matemetrikcom@gmail.com" className="text-purple-600 font-bold hover:underline">matemetrikcom@gmail.com</a> üzerinden paylaşabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
