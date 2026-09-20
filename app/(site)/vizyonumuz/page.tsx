import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Compass, Sparkles, CheckCircle2, ChevronRight,
  TrendingUp, Lightbulb, Users, ArrowRight, ShieldCheck, Mail
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Vizyonumuz | Matemetrik - Eğitimin Geleceğine Yön Veren Platform',
  description:
    'Matemetrik vizyonu; Türkiye genelinde her öğrencinin kaliteli matematik eğitimine ücretsiz ulaşabildiği, ezbersiz ve analitik düşünceyi merkezine alan dijital bir eğitim ekosistemi inşa etmektir.',
  alternates: {
    canonical: 'https://www.matemetrik.com/vizyonumuz',
  },
  openGraph: {
    title: 'Vizyonumuz | Matemetrik',
    description: 'Eğitimin geleceğinde fırsat eşitliği ve yenilikçi matematik öğretimi vizyonumuz.',
    url: 'https://www.matemetrik.com/vizyonumuz',
  },
};

export default function VizyonumuzPage() {
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
        name: 'Vizyonumuz',
        item: 'https://www.matemetrik.com/vizyonumuz',
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
          <span className="text-slate-900 font-semibold">Vizyonumuz</span>
        </nav>

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
            <Compass className="w-3.5 h-3.5 text-indigo-600" /> Gelecek Hedefimiz
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Eğitimde Fırsat Eşitliği ve Analitik Gelecek Vizyonumuz
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Türkiye&apos;de matematiği bir korku unsuru olmaktan çıkarıp, her öğrencinin severek keşfettiği evrensel bir düşünce dili haline getirmeyi hedefliyoruz.
          </p>
        </div>

        {/* Vision Content Card */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Geleceğe Dair Bakış Açımız</h2>
            <p>
              <strong>Matemetrik</strong> olarak vizyonumuz; Türkiye&apos;nin dört bir yanındaki tüm öğrencilerin sosyoekonomik durumuna veya coğrafi konumuna bakılmaksızın, en yüksek standartlardaki matematik konu anlatımlarına, yeni nesil soru çözümlerine ve pedagojik eğitim araçlarına <strong>tamamen ücretsiz ve kesintisiz</strong> olarak ulaşabilmesidir.
            </p>
            <p>
              21. yüzyıl becerileriyle donatılmış, problem çözme kabiliyeti yüksek, eleştirel düşünebilen ve verileri doğru yorumlayabilen bir neslin yetişmesinde Türkiye&apos;nin en güvenilir dijital öğrenme merkezi olmayı amaçlıyoruz.
            </p>
          </div>

          {/* 4 Pillars of Vision */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
            <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">1. Ezber Değil, Kavramsal Öğrenme</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Matematik formüllerini kuru kuruya ezberletmek yerine, &quot;neden&quot; ve &quot;nasıl&quot; sorularına cevap veren modellemeler ve günlük hayat senaryoları sunmak.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">2. 100% Ücretsiz ve Erişilebilir</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Özel ders veya pahalı kaynak kitaplara bağımlılığı azaltarak, her haneye kaliteli bir matematik öğretmeninin rehberliğini ücretsiz ulaştırmak.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">3. Öğretmenlerimize Güç Katmak</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sınav kağıdı mizanpajı, yıllık plan hazırlama ve karne görüşü gibi zaman alıcı bürokratik yükleri akıllı yazılımlarımızla hafifletip, öğretmenlerin asıl odağını sınıfına yöneltmesini sağlamak.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">4. 2026-2027 Maarif Modeli Öncülüğü</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Milli Eğitim Bakanlığı&apos;nın hayata geçirdiği Türkiye Yüzyılı Maarif Modeli&apos;ne ilk ve en hızlı adapte olan platform olarak müfredat güncellemelerini anında öğrencilere aktarmak.
              </p>
            </div>
          </div>

          {/* Navigation to Misyon & Hakkımızda */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100">
            <Link
              href="/misyonumuz"
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:bg-white hover:shadow-sm transition-all flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Temel Görevimiz</div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Misyonumuzu Keşfedin &rarr;</div>
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/hakkimizda"
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:bg-white hover:shadow-sm transition-all flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Kurumsal Hikayemiz</div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Hakkımızda &rarr;</div>
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Contact Box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1 pt-4">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-indigo-600" /> Vizyonumuza Katkı Sunun:
            </div>
            <p className="text-slate-600">
              Eğitim vizyonumuzu geliştirecek fikirlerinizi ve iş birliği önerilerinizi <a href="mailto:matemetrikcom@gmail.com" className="text-indigo-600 font-bold hover:underline">matemetrikcom@gmail.com</a> adresinden bizimle paylaşabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
