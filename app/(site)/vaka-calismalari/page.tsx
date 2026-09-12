import React from 'react';
import Link from 'next/link';
import { Award, CheckCircle2, TrendingUp, Users, Sparkles, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Vaka Çalışmaları & Başarı Hikayeleri | Matemetrik',
  description: 'Matemetrik MEB çözümleri ve öğretmen araçları ile elde edilen somut başarı hikayeleri ve vaka analizleri.',
};

export default function VakaCalismalariPage() {
  const caseStudies = [
    {
      title: 'Vaka 1: 10. Sınıf Matematik Yazılılarında Başarı Oranının %42 Artışı',
      category: 'Öğrenci Başarısı & MEB Kitap Çözümleri',
      description: 'Anadolu lisesi 10. sınıf öğrencileri üzerinde yapılan dönemlik takipte, Matemetrik MEB ders kitabı sayfa sayfa çözümlerini ve ünite değerlendirme sorularını aktif kullanan sınıflarda 2. yazılı not ortalamasının 54 puandan 77 puana yükseldiği kaydedildi.',
      metrics: [
        { label: 'Başarı Artışı', value: '+%42' },
        { label: 'Öğrenci Sayısı', value: '320+' },
        { label: 'Ortalama Not', value: '77 / 100' },
      ],
      takeaway: 'Ezberlemek yerine adım adım çözümleri kavrayan öğrencilerin yazılı sınavlarda işlem hatası yapma oranı %65 oranında azaldı.',
    },
    {
      title: 'Vaka 2: 1.200+ Öğretmenin e-Okul Karne Giriş Süresinin 4 Saatten 15 Dakikaya Düşürülmesi',
      category: 'Öğretmen Araçları & Verimlilik',
      description: 'Dönem sonlarında öğretmenlerin en büyük zaman kaybı olan öğrenciye özel pedagojik karne görüşü hazırlama süreci, Matemetrik Karne Görüşü Robotu ile tamamen otomatikleştirildi.',
      metrics: [
        { label: 'Zaman Tasarrufu', value: '%93' },
        { label: 'Kullanan Öğretmen', value: '1.200+' },
        { label: 'Üretilen Görüş', value: '45.000+' },
      ],
      takeaway: 'Öğretmenler tek tip ve klişe cümleler yerine öğrencinin karakterine ve sınıf seviyesine özel pedagojik görüşleri saniyeler içinde e-Okul sistemine aktardı.',
    },
    {
      title: 'Vaka 3: Sınav Hazırlama Robotu ile Resmi MEB Kağıt Çıktısında Sıfır Hata',
      category: 'Ölçme & Değerlendirme',
      description: 'Ortak sınavlarda soru kayması, font uyumsuzluğu ve çift sütun hizalama problemleri yaşayan 85 okul zümre başkanlığı, Matemetrik Sınav Hazırlama Robotu ile resmi MEB antetli yazılı kağıtlarını tek tıkla PDF olarak hazırladı.',
      metrics: [
        { label: 'Kağıt Tasarrufu', value: '%35' },
        { label: 'Zümre Onayı', value: '%100' },
        { label: 'Hazırlık Süresi', value: '8 Dk' },
      ],
      takeaway: 'Word veya harici programlarda saatler süren görsel hizalama çilesi sona erdi.',
    },
  ];

  return (
    <div className="py-12 pb-24 space-y-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Ana Sayfa</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Vaka Çalışmaları</span>
        </nav>

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
            <Award className="w-3.5 h-3.5" /> Somut Sonuçlar &amp; Eğitim İstatistikleri
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Vaka Çalışmaları &amp; Başarı Hikayeleri
          </h1>
          <p className="text-indigo-200 text-sm sm:text-base max-w-2xl leading-relaxed">
            Matemetrik altyapısının öğrencilerin akademik gelişimine ve öğretmenlerin iş yüküne sağladığı gerçek katkıları inceleyin.
          </p>
        </div>

        {/* Studies List */}
        <div className="space-y-8">
          {caseStudies.map((study, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6"
            >
              <div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {study.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-3 tracking-tight">
                  {study.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                  {study.description}
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                {study.metrics.map((m, i) => (
                  <div key={i}>
                    <div className="text-xl sm:text-3xl font-black text-indigo-600 tracking-tight">
                      {m.value}
                    </div>
                    <div className="text-[11px] text-slate-500 font-semibold uppercase mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Takeaway */}
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/60 flex items-start gap-3 text-xs text-emerald-900 leading-relaxed font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Temel Çıkarım:</strong> {study.takeaway}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
