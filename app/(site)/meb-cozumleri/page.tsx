import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen, Sparkles, CheckCircle2, ChevronRight,
  GraduationCap, Award, School, Layers, HelpCircle
} from 'lucide-react';
import { getMebBookMasterPosts } from '@/lib/db';
import MebCozumleriHub from '@/components/meb/MebCozumleriHub';

export const metadata: Metadata = {
  title: '2026-2027 MEB Ders Kitabı Çözümleri ve Cevapları (1-12. Sınıf) - Matemetrik',
  description:
    '1. sınıftan 12. sınıfa kadar tüm MEB ders kitabı çözümleri, sayfa cevapları, alıştırmalar ve ünite sonu değerlendirme sorularının adım adım çözümleri. Türkiye Yüzyılı Maarif Modeli uyumlu.',
  keywords: [
    'meb ders kitabı cevapları',
    'meb çözümleri',
    'meb ders kitabı çözümleri',
    '1 sınıf meb cevapları',
    '2 sınıf meb cevapları',
    '3 sınıf meb cevapları',
    '4 sınıf meb cevapları',
    '5 sınıf meb cevapları',
    '6 sınıf meb cevapları',
    '7 sınıf meb cevapları',
    '8 sınıf lgs meb cevapları',
    '9 sınıf meb çözümleri',
    '10 sınıf meb çözümleri',
    '11 sınıf meb çözümleri',
    '12 sınıf yks meb çözümleri',
    'matematik ders kitabı cevapları',
    'fen bilimleri ders kitabı cevapları',
  ],
  alternates: {
    canonical: 'https://www.matemetrik.com/meb-cozumleri',
  },
  openGraph: {
    title: '2026-2027 MEB Ders Kitabı Çözümleri ve Cevapları | Matemetrik',
    description:
      'İlkokul, ortaokul ve lise kademelerinde tüm MEB ders kitabı cevapları ve sayfa çözümleri. Adım adım açıklamalı, doğrulanmış yanıtlar.',
    url: 'https://www.matemetrik.com/meb-cozumleri',
    type: 'website',
    images: [
      {
        url: 'https://www.matemetrik.com/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Matemetrik MEB Ders Kitabı Çözümleri',
      },
    ],
  },
};

const mebFaqs = [
  {
    question: 'MEB ders kitabı çözümleri 2026-2027 güncel müfredatına uygun mu?',
    answer:
      'Evet. Matemetrik üzerinde yayımlanan tüm ders kitabı çözümleri, Millî Eğitim Bakanlığı (MEB) tarafından okullara ücretsiz dağıtılan en güncel 2026-2027 ders kitapları ve Türkiye Yüzyılı Maarif Modeli programı esas alınarak hazırlanmıştır.',
  },
  {
    question: 'Sayfa çözümlerinde sadece cevap mı var yoksa işlem basamakları da gösteriliyor mu?',
    answer:
      'Özellikle matematik, geometri ve fen bilimleri gibi sayısal derslerde yalnızca sonuç değil; sorunun nasıl çözüldüğü, hangi formülün kullanıldığı ve adım adım işlem basamakları pedagojik kurallara uygun olarak ayrıntılı biçimde açıklanır.',
  },
  {
    question: 'İlkokul, ortaokul ve lise kitaplarının tamamına ulaşabilir miyim?',
    answer:
      'Evet. 1. sınıftan 12. sınıfa kadar Türkçe, Matematik, Fen Bilimleri, Sosyal Bilgiler, Hayat Bilgisi, Fizik, Kimya, Biyoloji, Tarih ve Coğrafya ders kitaplarının tüm ünite alıştırmaları ve sayfa çözümleri arşivimizde yer almaktadır.',
  },
  {
    question: 'Çözümlere ulaşmak için üyelik veya ücret gerekiyor mu?',
    answer:
      'Hayır. Matemetrik üzerindeki tüm MEB ders kitabı çözümleri ve sayfa cevapları öğrencilerimiz, velilerimiz ve öğretmenlerimiz için %100 ücretsizdir.',
  },
];

export default function MebCozumleriPage() {
  const masterBooks = getMebBookMasterPosts();

  const jsonLdCollection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '2026-2027 MEB Ders Kitabı Çözümleri ve Cevapları',
    description:
      '1. sınıftan 12. sınıfa kadar MEB ders kitabı sayfa çözümleri ve doğrulanmış cevaplar.',
    url: 'https://www.matemetrik.com/meb-cozumleri',
    publisher: {
      '@type': 'Organization',
      name: 'Matemetrik',
      url: 'https://www.matemetrik.com',
    },
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: mebFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCollection) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      <div className="min-h-screen bg-slate-50/50 pb-20">
        {/* Breadcrumb Header */}
        <div className="bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Link href="/" className="hover:text-indigo-600 transition-colors">
                Ana Sayfa
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-indigo-600 font-bold truncate">
                MEB Ders Kitabı Çözümleri
              </span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-900 text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8 border-b border-indigo-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(129,140,248,0.25),transparent_50%)] pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>2026-2027 Millî Eğitim Bakanlığı Güncel Ders Kitapları</span>
            </div>

            <div className="max-w-3xl space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                MEB Ders Kitabı <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">Çözümleri ve Cevapları</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                1-12. Sınıf MEB ders kitaplarının tüm alıştırma, sayfa çözümleri, ünite değerlendirme ve sıra sizde soruları. İşlem basamaklarıyla adım adım doğrulanmış yanıtlar.
              </p>
            </div>

            {/* Kademe Quick Jump Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-4xl">
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center font-black">
                  1-4
                </div>
                <div>
                  <div className="text-sm font-bold text-white">İlkokul Çözümleri</div>
                  <div className="text-[11px] text-slate-300">Türkçe, Matematik, Hayat Bilgisi</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-300 flex items-center justify-center font-black">
                  5-8
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Ortaokul & LGS</div>
                  <div className="text-[11px] text-slate-300">Fen, Matematik, Türkçe, Sosyal</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/40 text-purple-300 flex items-center justify-center font-black">
                  9-12
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Lise & YKS</div>
                  <div className="text-[11px] text-slate-300">Fizik, Kimya, Biyoloji, Mat</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <MebCozumleriHub initialBooks={masterBooks} />

          {/* Educational Information Section */}
          <section className="mt-16 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold mb-2">
                <School className="w-3.5 h-3.5 text-indigo-600" />
                <span>Eğitim Metodolojisi</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                MEB Ders Kitabı Çözümlerinden Nasıl En Yüksek Verimi Alabilirsiniz?
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Ders kitabı çözümlerine bakmak, yalnızca ev ödevini tamamlamak için bir kısayol değil; konuyu pekiştirmek ve problem çözme stratejilerini kavramak için pedagojik bir rehber olmalıdır.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="text-xs font-black text-indigo-600 uppercase tracking-wider">1. Adım</div>
                <h4 className="font-bold text-slate-900 text-sm">Önce Kendi Çözümünüzü Deneyin</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Soruyu önce kendi bilgilerinizle çözmeye çalışın. Takıldığınız noktayı tespit etmek öğrenmenin en temel adımıdır.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="text-xs font-black text-indigo-600 uppercase tracking-wider">2. Adım</div>
                <h4 className="font-bold text-slate-900 text-sm">İşlem Basamaklarını Karşılaştırın</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Sitemizdeki çözüm basamaklarını takip ederek hangi formülün veya yöntemin uygulandığını mantıksal sırasıyla inceleyin.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="text-xs font-black text-indigo-600 uppercase tracking-wider">3. Adım</div>
                <h4 className="font-bold text-slate-900 text-sm">Benzer Sorularla Pekiştirin</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ünite değerlendirme testlerindeki benzer soruları çözerek kalıcı öğrenmeyi sağlayın ve sınavlara eksiksiz hazırlanın.
                </p>
              </div>
            </div>

            {/* Sıkça Sorulan Sorular */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h3 className="text-xl font-black text-slate-900">Sıkça Sorulan Sorular</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mebFaqs.map((faq, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1.5">
                    <h5 className="font-bold text-slate-900 text-sm">{faq.question}</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
