import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import {
  BookOpen, Sparkles, CheckCircle2, ChevronRight,
  GraduationCap, Layers, Video, FileText, ArrowRight
} from 'lucide-react';
import KonuAnlatimlariClient, { TopicItem } from '@/components/konu-anlatimlari/KonuAnlatimlariClient';

export const revalidate = 3600; // 1 hour edge cache

export const metadata: Metadata = {
  title: 'MEB Konu Anlatımları (1-12. Sınıf) | Tüm Dersler, 20 Soruluk Testler ve MEB Çözümleri',
  description: '1. sınıftan 12. sınıfa kadar tüm kademeler için 2026-2027 MEB Maarif Modeli uyumlu konu anlatımları, 20 soruluk yeni nesil tarama testleri, adım adım çözümler ve video dersler.',
  alternates: {
    canonical: 'https://www.matemetrik.com/konu-anlatimlari',
  },
  openGraph: {
    title: 'MEB Konu Anlatımları (1-12. Sınıf) - Matemetrik',
    description: '1. sınıftan 12. sınıfa kadar matematik, türkçe ve fen dersi konu anlatımları, 20 soruluk testler ve MEB kitap çözümleri.',
    url: 'https://www.matemetrik.com/konu-anlatimlari',
    type: 'website',
  },
};

function loadCatalog(): TopicItem[] {
  const catalogPath = path.join(process.cwd(), 'data', 'konu_anlatimlari_catalog.json');
  if (fs.existsSync(catalogPath)) {
    try {
      const raw = fs.readFileSync(catalogPath, 'utf-8');
      return JSON.parse(raw);
    } catch (e) {
      console.error('Failed to parse catalog JSON:', e);
    }
  }
  return [];
}

export default function KonuAnlatimlariPage() {
  const topics = loadCatalog();

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
        name: 'Konu Anlatımları',
        item: 'https://www.matemetrik.com/konu-anlatimlari',
      },
    ],
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '1-12. Sınıf MEB Konu Anlatımları ve Testler',
    description: 'Tüm kademeler için ders ders konu anlatımları, 20 soruluk yeni nesil testler ve adım adım çözümler.',
    url: 'https://www.matemetrik.com/konu-anlatimlari',
  };

  const faqs = [
    {
      q: 'Konu anlatımları hangi eğitim-öğretim yılı müfredatına uygundur?',
      a: 'Matemetrik üzerindeki tüm konu anlatımları, Milli Eğitim Bakanlığı (MEB) tarafından uygulamaya alınan Türkiye Yüzyılı Maarif Modeli ve 2026-2027 güncel müfredatına %100 uyumludur.',
    },
    {
      q: 'Her konu anlatımında test ve çözümleri bulunuyor mu?',
      a: 'Evet! Hazırladığımız her konu anlatımı rehberinde istisnasız 20 soruluk orijinal tarama testi ve bu 20 sorunun tamamının adım adım detaylı çözümleri yer almaktadır.',
    },
    {
      q: 'Video çözümler ve MEB kitap cevaplarına nasıl ulaşabilirim?',
      a: 'Her konunun içerisinde ilgili ünitenin YouTube video konu anlatımı yerleştirilmiştir. Ayrıca sayfanın altındaki bağlantılardan ilgili sınıfın resmi MEB ders kitabı sayfa sayfa çözümlerine doğrudan ulaşabilirsiniz.',
    },
    {
      q: 'Öğretmenler sınav hazırlığı veya yıllık plan için bu içerikleri kullanabilir mi?',
      a: 'Kesinlikle! Öğretmenlerimiz web sitemizin Sınav Hazırlama Robotu ve Yıllık Plan Hazırlama araçlarını kullanarak MEB formatında sınav kağıtları ve resmi çerçeve planlar üretebilirler.',
    },
    {
      q: 'Konu anlatımı sayfaları ücretsiz midir?',
      a: 'Evet, Matemetrik bünyesindeki tüm konu anlatımları, testler, çözümler ve MEB ders kitabı cevapları öğrencilere ve öğretmenlere tamamen ücretsiz olarak sunulmaktadır.',
    },
  ];

  const faqSchemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <div className="py-10 pb-24 space-y-12">
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Ana Sayfa
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Konu Anlatımları</span>
        </nav>

        {/* Hero Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white p-8 sm:p-14 rounded-3xl shadow-2xl border border-indigo-500/30 space-y-6">
          {/* Animated colorful background glow orbs */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-indigo-500/25 blur-3xl pointer-events-none animate-pulse"></div>
          <div className="absolute right-1/3 -top-24 w-80 h-80 rounded-full bg-fuchsia-500/20 blur-3xl pointer-events-none"></div>
          <div className="absolute left-10 -bottom-20 w-60 h-60 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-indigo-500/20 text-yellow-300 text-xs font-black border border-yellow-400/40 shadow-sm backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
              2026-2027 MEB &amp; Türkiye Yüzyılı Maarif Modeli
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              MEB Konu Anlatımları <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300 drop-shadow">
                1 - 12. Sınıf Tüm Dersler
              </span>
            </h1>

            <p className="text-sm sm:text-base text-indigo-100/90 leading-relaxed font-normal">
              İlkokul, ortaokul ve lise kademelerinde her sınıfın düzeyine özel, öğretmen anlatımlı pratik konu özetleri; her konuya özel <strong>20 soruluk yeni nesil deneme testleri</strong>, ayrıntılı işlem adımlarıyla <strong>çözüm anahtarları</strong>, <strong>video dersler</strong> ve <strong>tek tıkla indirilebilir PDF test çıktıları</strong>!
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-center">
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-cyan-400/30 hover:border-cyan-400/60 transition-all hover:scale-105">
                <div className="text-xl sm:text-2xl font-black text-cyan-300">108 Ünite</div>
                <div className="text-[11px] text-cyan-100 font-semibold">1-12. Sınıf Tüm Dersler</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-amber-400/30 hover:border-amber-400/60 transition-all hover:scale-105">
                <div className="text-xl sm:text-2xl font-black text-yellow-300">Sınıfa Özel</div>
                <div className="text-[11px] text-amber-100 font-semibold">Öğrenci Diliyle Anlatım</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-fuchsia-400/30 hover:border-fuchsia-400/60 transition-all hover:scale-105">
                <div className="text-xl sm:text-2xl font-black text-fuchsia-300">2.160+ Soru</div>
                <div className="text-[11px] text-fuchsia-100 font-semibold">Çözümlü &amp; PDF Test</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-emerald-400/30 hover:border-emerald-400/60 transition-all hover:scale-105">
                <div className="text-xl sm:text-2xl font-black text-emerald-300">%100 MEB</div>
                <div className="text-[11px] text-emerald-100 font-semibold">Maarif Modeli Uyumlu</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Matemetrik Topic Guides */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-gradient-to-br from-purple-50/80 to-white border border-purple-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all space-y-2">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-purple-500/20">
              📖
            </div>
            <h3 className="font-black text-purple-950 text-sm">1. Sınıfa Özel Pratik Anlatım</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              İlkokulda eğlenceli ve hikayeli, ortaokulda LGS odaklı, lisede ÖSYM formül ve taktikleriyle anlatım.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-gradient-to-br from-blue-50/80 to-white border border-blue-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all space-y-2">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-blue-500/20">
              📝
            </div>
            <h3 className="font-black text-blue-950 text-sm">2. 20 Soruluk Tarama Testi</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Her konunun sonunda MEB yazılı ve merkezi sınav kalıplarına uygun 20 özgün soru ve test modülü.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-50/80 to-white border border-emerald-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all space-y-2">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-emerald-500/20">
              ✅
            </div>
            <h3 className="font-black text-emerald-950 text-sm">3. Adım Adım Çözümler</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              20 sorunun tamamı için işlem basamaklarını ve doğru seçeneği gösteren ayrıntılı çözümler.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-gradient-to-br from-rose-50/80 to-white border border-rose-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all space-y-2">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-rose-500/20">
              📥
            </div>
            <h3 className="font-black text-rose-950 text-sm">4. Ücretsiz PDF Test İndir</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tek tıkla resmi MEB sınav formatında cevap anahtarlı PDF test çıktısı alın veya yazıcıdan basın.
            </p>
          </div>
        </div>

        {/* Interactive Topic Directory (Class by Class, Subject by Subject) */}
        <KonuAnlatimlariClient topics={topics} />

        {/* Frequently Asked Questions */}
        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
              <Sparkles className="w-3.5 h-3.5" /> Merak Edilenler
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Sıkça Sorulan Sorular (SSS)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Matemetrik konu anlatımları ve test materyalleri hakkında en çok merak edilen hususlar
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer font-bold text-slate-900 text-sm sm:text-base hover:text-indigo-600 transition-colors">
                  <span>{faq.q}</span>
                  <span className="ml-4 shrink-0 text-slate-400 group-open:rotate-180 transition-transform">
                    &darr;
                  </span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Bottom CTA to Teacher Tools & MEB Solutions */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">
              Öğretmenler İçin MEB Uyumlu Akıllı Araçlar
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Yıllık plan hazırlama, kulüp toplantı tutanakları indirme ve resmi antetli sınav kağıdı hazırlama robotumuzu keşfedin.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/sinav-hazirlama-robotu"
              className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-lg"
            >
              Sınav Hazırlama Robotu
            </Link>
            <Link
              href="/kategori/meb-ders-kitabi-cevaplari"
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors border border-white/20"
            >
              Tüm MEB Çözümleri
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
